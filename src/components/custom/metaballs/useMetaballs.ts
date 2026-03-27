import { ref, onMounted, onBeforeUnmount, watch, type Ref, type ShallowRef } from "vue";
import { VERTEX_SHADER, FRAGMENT_SHADER } from "./shaders";
import { DEFAULT_METABALL_CONFIG, type MetaballConfig } from "./types";

function hexToRgb(hex: string): [number, number, number] {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function cssColorToRgb(css: string): [number, number, number] {
    if (css.startsWith("#")) return hexToRgb(css);
    // Fallback: use a canvas to resolve any CSS color
    if (typeof document === "undefined") return [128, 128, 128];
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(`Shader compile error: ${info}`);
    }
    return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(`Program link error: ${info}`);
    }
    return program;
}

export function useMetaballs(
    canvasRef: Ref<HTMLCanvasElement | null> | ShallowRef<HTMLCanvasElement | null>,
    config?: MetaballConfig,
) {
    const cfg = { ...DEFAULT_METABALL_CONFIG, ...config };
    const isSupported = ref(true);

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let rafId: number | null = null;
    let startTime = 0;
    let observer: ResizeObserver | null = null;

    // Uniform locations
    let uResolution: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uBlobCount: WebGLUniformLocation | null = null;
    let uThreshold: WebGLUniformLocation | null = null;
    let uEdgeSoftness: WebGLUniformLocation | null = null;
    let uBgAlpha: WebGLUniformLocation | null = null;
    let uBlobPositions: WebGLUniformLocation[] = [];
    let uBlobColors: WebGLUniformLocation[] = [];

    function init() {
        const canvas = canvasRef.value;
        if (!canvas) return;

        gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
        if (!gl) {
            isSupported.value = false;
            return;
        }

        try {
            const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
            const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
            program = createProgram(gl, vs, fs);
        } catch {
            isSupported.value = false;
            return;
        }

        gl.useProgram(program);

        // Full-screen quad
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 1, -1, -1, 1,
            -1, 1, 1, -1, 1, 1,
        ]), gl.STATIC_DRAW);

        const aPosition = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        // Cache uniform locations
        uResolution = gl.getUniformLocation(program, "u_resolution");
        uTime = gl.getUniformLocation(program, "u_time");
        uBlobCount = gl.getUniformLocation(program, "u_blobCount");
        uThreshold = gl.getUniformLocation(program, "u_threshold");
        uEdgeSoftness = gl.getUniformLocation(program, "u_edgeSoftness");
        uBgAlpha = gl.getUniformLocation(program, "u_bgAlpha");

        for (let i = 0; i < 16; i++) {
            uBlobPositions.push(gl.getUniformLocation(program, `u_blobPositions[${i}]`)!);
            uBlobColors.push(gl.getUniformLocation(program, `u_blobColors[${i}]`)!);
        }

        // Set static uniforms
        gl.uniform1i(uBlobCount, cfg.blobCount);
        gl.uniform1f(uThreshold, cfg.threshold);
        gl.uniform1f(uEdgeSoftness, cfg.edgeSoftness);
        gl.uniform1f(uBgAlpha, cfg.bgAlpha);

        // Set blob colors
        const colors = cfg.colors;
        for (let i = 0; i < cfg.blobCount; i++) {
            const [r, g, b] = cssColorToRgb(colors[i % colors.length]);
            gl.uniform3f(uBlobColors[i], r / 255, g / 255, b / 255);
        }

        // Enable blending for transparency
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        resize();

        observer = new ResizeObserver(resize);
        observer.observe(canvas);

        startTime = performance.now();
        rafId = requestAnimationFrame(render);
    }

    function resize() {
        const canvas = canvasRef.value;
        if (!canvas || !gl) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
    }

    function render(now: number) {
        if (!gl || !program) return;

        const t = (now - startTime) * 0.001 * cfg.speed;
        gl.uniform1f(uTime, t);

        // Update blob positions (sinusoidal orbital motion)
        for (let i = 0; i < cfg.blobCount; i++) {
            const phase = i * ((Math.PI * 2) / cfg.blobCount);
            const freqX = 0.4 + i * 0.12;
            const freqY = 0.35 + i * 0.1;

            const x = 0.5 + Math.sin(t * freqX + phase) * cfg.orbitAmplitude
                         + Math.cos(t * 0.2 + i) * cfg.orbitAmplitude * 0.4;
            const y = 0.5 + Math.cos(t * freqY + phase) * cfg.orbitAmplitude
                         + Math.sin(t * 0.3 + i * 0.7) * cfg.orbitAmplitude * 0.3;

            const radius = cfg.baseRadius + i * 0.008;

            gl.uniform3f(uBlobPositions[i], x, y, radius);
        }

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        rafId = requestAnimationFrame(render);
    }

    function dispose() {
        if (rafId !== null) cancelAnimationFrame(rafId);
        observer?.disconnect();
        if (gl && program) {
            gl.deleteProgram(program);
            program = null;
        }
        gl = null;
    }

    onMounted(init);
    onBeforeUnmount(dispose);

    watch(canvasRef, (el) => {
        if (el) {
            dispose();
            init();
        }
    });

    return { isSupported };
}
