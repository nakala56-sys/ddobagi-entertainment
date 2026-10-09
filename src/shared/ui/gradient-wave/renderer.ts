export type WaveColors = readonly [string, string, string, string];

export const DEFAULT_WAVE_COLORS: WaveColors = ["#91dff2", "#c8b9f4", "#eef08b", "#f5b8bd"];

const vertexSource = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const fragmentSource = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_mask;
uniform vec4 u_region;
uniform vec2 u_resolution;
uniform vec3 u_colors[4];
uniform float u_time;
uniform float u_distortion;
uniform float u_text;

vec3 palette(float step) {
    float index = mod(step, 4.0);
    if (index < 1.0) return u_colors[0];
    if (index < 2.0) return u_colors[1];
    if (index < 3.0) return u_colors[2];
    return u_colors[3];
}

void main() {
    // Top-origin coordinates make the same wave descend across both canvases.
    vec2 local = vec2(v_uv.x, 1.0 - v_uv.y);
    vec2 uv = u_region.xy + local * u_region.zw;
    // Measure a real circle in aspect-correct coordinates, centered above the view.
    float aspect = u_resolution.x / u_resolution.y;
    vec2 center = vec2(0.5 * aspect, -0.6 * aspect);
    vec2 point = vec2(uv.x * aspect, uv.y) - center;
    float distance = length(point);
    float feather = 0.12;
    float startRadius = -center.y - feather * 2.0;
    float endRadius = length(vec2(0.5 * aspect, 1.0 - center.y)) + feather * 2.0;
    // One color per cycle. Its trailing white circle always completes before the next.
    float cycle = floor(u_time / 8.0);
    float phase = mod(u_time, 8.0);
    float colorRadius = mix(startRadius, endRadius, smoothstep(0.0, 4.5, phase));
    float whiteRadius = mix(startRadius, endRadius, smoothstep(2.5, 7.0, phase));
    float colorMask = 1.0 - smoothstep(colorRadius - feather, colorRadius + feather, distance);
    float whiteMask = 1.0 - smoothstep(whiteRadius - feather, whiteRadius + feather, distance);
    float fill = colorMask * (1.0 - whiteMask);
    vec3 color = palette(cycle);
    vec3 background = mix(vec3(1.0), color, fill);
    float edgeWidth = feather * 0.35;
    float colorEdge = 1.0 - smoothstep(0.0, edgeWidth, abs(distance - colorRadius));
    float whiteEdge = 1.0 - smoothstep(0.0, edgeWidth, abs(distance - whiteRadius));
    float crest = max(colorEdge, whiteEdge);
    float edgeDistance = colorEdge > whiteEdge ? distance - colorRadius : distance - whiteRadius;

    if (u_text < 0.5) {
        gl_FragColor = vec4(background, 1.0);
        return;
    }

    // Refraction and chromatic separation are confined to the passing crest.
    vec2 normal = point / max(distance, 0.001);
    vec2 displacement = vec2(normal.x / aspect, normal.y);
    displacement *= sin(edgeDistance * 70.0) * crest * u_distortion * 0.003 / max(u_region.zw, vec2(0.001));
    vec2 sampleUV = local + displacement;
    float split = crest * u_distortion * 1.8 / u_resolution.x / max(u_region.z, 0.001);
    float red = texture2D(u_mask, sampleUV + vec2(split, 0.0)).a;
    float green = texture2D(u_mask, sampleUV).a;
    float blue = texture2D(u_mask, sampleUV - vec2(split, 0.0)).a;
    float alpha = max(red, max(green, blue));
    float lowest = min(color.r, min(color.g, color.b));
    float chroma = max(color.r, max(color.g, color.b)) - lowest;
    vec3 hue = (color - vec3(lowest)) / max(chroma, 0.001);
    vec3 baseInk = vec3(0.09, 0.13, 0.17);
    vec3 coloredInk = mix(baseInk, hue * 0.55 + vec3(0.02), smoothstep(0.02, 0.18, chroma));
    vec3 ink = mix(baseInk, coloredInk, fill);
    float ribbon = sin(edgeDistance * 120.0) * 0.5 + 0.5;
    ink = mix(ink, mix(coloredInk, color, ribbon), crest * 0.82);
    vec3 channels = vec3(red, green, blue) / max(alpha, 0.001);
    gl_FragColor = vec4(ink * channels, alpha);
}`;

function rgb(hex: string, fallback: string) {
    const normalized = /^#[0-9a-f]{6}$/i.test(hex) ? hex : fallback;
    return [1, 3, 5].map((start) => parseInt(normalized.slice(start, start + 2), 16) / 255);
}

/** A small fullscreen shader; no scene graph or extra runtime dependency. */
export function createWaveRenderer(canvas: HTMLCanvasElement, colors: WaveColors, text: boolean, distortion: number) {
    const gl = canvas.getContext("webgl", { alpha: text, antialias: false, depth: false, stencil: false, premultipliedAlpha: false });
    if (!gl) return null;
    const shaders: WebGLShader[] = [];
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    const dispose = () => {
        shaders.forEach((shader) => gl.deleteShader(shader));
        gl.deleteProgram(program);
        gl.deleteBuffer(buffer);
        gl.deleteTexture(texture);
    };
    if (!program || !buffer || !texture) { dispose(); return null; }
    for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
        const shader = gl.createShader(type);
        if (!shader) { dispose(); return null; }
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { dispose(); return null; }
        gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return null; }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
    gl.uniform3fv(gl.getUniformLocation(program, "u_colors[0]"), colors.flatMap((color, index) => rgb(color, DEFAULT_WAVE_COLORS[index])));
    gl.uniform1f(gl.getUniformLocation(program, "u_text"), Number(text));
    gl.uniform1f(gl.getUniformLocation(program, "u_distortion"), distortion);
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const regionLocation = gl.getUniformLocation(program, "u_region");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const maxSize = Math.min(3200, gl.getParameter(gl.MAX_TEXTURE_SIZE), gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));

    return {
        dispose,
        resize(width: number, height: number, region: number[], resolution: number[]) {
            const ratio = Math.min(window.devicePixelRatio || 1, 1.5, maxSize / Math.max(width, height, 1));
            canvas.width = Math.max(1, Math.round(width * ratio));
            canvas.height = Math.max(1, Math.round(height * ratio));
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform4fv(regionLocation, region);
            gl.uniform2fv(resolutionLocation, resolution);
            return ratio;
        },
        mask(source: HTMLCanvasElement) {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        },
        render(time: number) {
            // Keep mediump shader precision stable across repeated four-color cycles.
            gl.uniform1f(timeLocation, time % 32);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        },
    };
}

/** Rasterize DOM line boxes only on layout/font changes, including wrapped text. */
export function createTextMask(heading: HTMLElement, width: number, height: number, ratio: number) {
    const mask = document.createElement("canvas");
    mask.width = Math.max(1, Math.round(width * ratio));
    mask.height = Math.max(1, Math.round(height * ratio));
    const context = mask.getContext("2d");
    if (!context) return null;
    context.scale(ratio, ratio);
    context.fillStyle = "white";
    const origin = heading.getBoundingClientRect();
    heading.querySelectorAll<HTMLElement>("[data-wave-line]").forEach((line) => {
        const node = line.firstChild;
        if (!node || node.nodeType !== Node.TEXT_NODE) return;
        const style = getComputedStyle(line);
        context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        context.letterSpacing = style.letterSpacing;
        context.textBaseline = "alphabetic";
        const metrics = context.measureText("Mg");
        const ascent = metrics.fontBoundingBoxAscent;
        const descent = metrics.fontBoundingBoxDescent;
        const range = document.createRange();
        const rows: { text: string; left: number; top: number; height: number }[] = [];
        const content = node.textContent || "";
        for (let index = 0; index < content.length;) {
            const character = String.fromCodePoint(content.codePointAt(index)!);
            range.setStart(node, index);
            index += character.length;
            range.setEnd(node, index);
            const rect = range.getBoundingClientRect();
            if (!rect.width && !rect.height) continue;
            const previous = rows[rows.length - 1];
            if (previous && Math.abs(previous.top - rect.top) < 1) previous.text += character;
            else rows.push({ text: character, left: rect.left, top: rect.top, height: rect.height });
        }
        rows.forEach((row) => context.fillText(row.text, row.left - origin.left, row.top - origin.top + (row.height - ascent - descent) / 2 + ascent));
    });
    return mask;
}
