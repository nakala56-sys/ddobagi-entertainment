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

vec3 palette(float phase) {
    float p = mod(phase, 4.0);
    float blend = smoothstep(0.0, 1.0, fract(p));
    if (p < 1.0) return mix(u_colors[0], u_colors[1], blend);
    if (p < 2.0) return mix(u_colors[1], u_colors[2], blend);
    if (p < 3.0) return mix(u_colors[2], u_colors[3], blend);
    return mix(u_colors[3], u_colors[0], blend);
}

void main() {
    // Top-origin coordinates make the same wave descend across both canvases.
    vec2 local = vec2(v_uv.x, 1.0 - v_uv.y);
    vec2 uv = u_region.xy + local * u_region.zw;
    float curve = 0.16 * sin(uv.x * 4.4 + u_time * 0.12)
        + 0.06 * sin(uv.x * 9.0 - u_time * 0.18);
    float phase = (uv.y + curve) * 5.8 - u_time * 0.52;
    float wave = sin(phase);
    float crest = exp(-pow(wave * 5.0, 2.0));
    vec3 color = palette(u_time * 0.16 - uv.y * 0.65 + curve);
    vec3 nextColor = palette(u_time * 0.16 - uv.y * 0.65 + curve + 0.8);
    float wash = 0.42 + 0.32 * sin(phase + 0.5);
    float basin = 1.0 - smoothstep(0.25, 0.98, uv.y + 0.20 * pow(abs(uv.x - 0.5) * 2.0, 2.0));
    vec3 background = mix(vec3(0.98, 0.98, 0.995), mix(color, nextColor, wash), basin * 0.82);

    if (u_text < 0.5) {
        gl_FragColor = vec4(background, 1.0);
        return;
    }

    // Refraction and chromatic separation are confined to the passing crest.
    vec2 displacement = vec2(sin(phase * 2.0 + uv.x * 11.0), cos(phase + uv.x * 7.0));
    displacement *= crest * u_distortion * 0.003 / max(u_region.zw, vec2(0.001));
    vec2 sampleUV = local + displacement;
    float split = crest * u_distortion * 1.8 / u_resolution.x / max(u_region.z, 0.001);
    float red = texture2D(u_mask, sampleUV + vec2(split, 0.0)).a;
    float green = texture2D(u_mask, sampleUV).a;
    float blue = texture2D(u_mask, sampleUV - vec2(split, 0.0)).a;
    float alpha = max(red, max(green, blue));
    vec3 ink = mix(color * 0.34, nextColor * 0.55, 0.5 + wave * 0.5);
    float ribbon = sin(phase * 9.0) * 0.5 + 0.5;
    ink = mix(ink, mix(color * 0.48, nextColor, ribbon), crest * 0.82);
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
            gl.uniform1f(timeLocation, time);
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
