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
    // Soft radial wobble keeps the arc circular while giving it a fluid edge.
    float angle = atan(point.y, point.x);
    float wobble = sin(angle * 3.0 + u_time * 0.85) * 0.045
        + sin(angle * 5.0 - u_time * 0.55) * 0.028
        + sin(angle * 2.0 + u_time * 0.35) * 0.018;
    float distance = length(point) + wobble;
    // Wide feather so color bleeds into white instead of forming a hard rim.
    float feather = 0.32;
    float startRadius = -center.y - feather * 2.0;
    float endRadius = length(vec2(0.5 * aspect, 1.0 - center.y)) + feather * 2.0;
    // Color every period; white trails shortly after. Several cycles overlap so
    // the next color arrives before the previous white has finished clearing.
    float period = 2.4;
    float trail = 0.85;
    float expand = 4.2;
    vec3 background = vec3(1.0);
    vec3 inkColor = u_colors[0];
    float fill = 0.0;
    float crest = 0.0;
    float edgeDistance = 0.0;
    float edgeWidth = feather * 0.55;

    for (int i = 3; i >= 0; i--) {
        float cycle = floor(u_time / period) - float(i);
        if (cycle < 0.0) continue;
        float localT = u_time - cycle * period;
        if (localT > expand + trail + feather * 4.0) continue;

        float colorProgress = smoothstep(0.0, expand, localT);
        float colorRadius = mix(startRadius, endRadius, colorProgress);
        float colorMask = 1.0 - smoothstep(colorRadius - feather, colorRadius + feather, distance);
        vec3 waveColor = palette(cycle);
        background = mix(background, waveColor, colorMask);
        fill = mix(fill, 1.0, colorMask);
        inkColor = mix(inkColor, waveColor, colorMask);

        float colorEdge = 1.0 - smoothstep(0.0, edgeWidth, abs(distance - colorRadius));
        if (colorEdge > crest) {
            crest = colorEdge;
            edgeDistance = distance - colorRadius;
        }

        if (localT <= trail) continue;
        float whiteProgress = smoothstep(0.0, expand, localT - trail);
        float whiteRadius = mix(startRadius, endRadius, whiteProgress);
        float whiteMask = 1.0 - smoothstep(whiteRadius - feather, whiteRadius + feather, distance);
        background = mix(background, vec3(1.0), whiteMask);
        fill *= 1.0 - whiteMask;

        float whiteEdge = 1.0 - smoothstep(0.0, edgeWidth, abs(distance - whiteRadius));
        if (whiteEdge > crest) {
            crest = whiteEdge;
            edgeDistance = distance - whiteRadius;
        }
    }

    if (u_text < 0.5) {
        gl_FragColor = vec4(background, 1.0);
        return;
    }

    // Refraction and chromatic separation are confined to the passing crest.
    vec2 normal = point / max(length(point), 0.001);
    vec2 displacement = vec2(normal.x / aspect, normal.y);
    displacement *= sin(edgeDistance * 70.0) * crest * u_distortion * 0.003 / max(u_region.zw, vec2(0.001));
    vec2 sampleUV = local + displacement;
    float split = crest * u_distortion * 1.8 / u_resolution.x / max(u_region.z, 0.001);
    float red = texture2D(u_mask, sampleUV + vec2(split, 0.0)).a;
    float green = texture2D(u_mask, sampleUV).a;
    float blue = texture2D(u_mask, sampleUV - vec2(split, 0.0)).a;
    float alpha = max(red, max(green, blue));
    float lowest = min(inkColor.r, min(inkColor.g, inkColor.b));
    float chroma = max(inkColor.r, max(inkColor.g, inkColor.b)) - lowest;
    vec3 hue = (inkColor - vec3(lowest)) / max(chroma, 0.001);
    vec3 baseInk = vec3(0.09, 0.13, 0.17);
    vec3 coloredInk = mix(baseInk, hue * 0.55 + vec3(0.02), smoothstep(0.02, 0.18, chroma));
    vec3 ink = mix(baseInk, coloredInk, fill);
    float ribbon = sin(edgeDistance * 120.0) * 0.5 + 0.5;
    ink = mix(ink, mix(coloredInk, inkColor, ribbon), crest * 0.82);
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
            // Keep mediump precision stable; window covers several overlapping wave cycles.
            gl.uniform1f(timeLocation, time % 48);
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
