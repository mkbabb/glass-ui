<script setup lang="ts">
// SiriWaveform — the Siri island's WebGL2 waveform (BG.W-SIRI-DOCK-CAPABILITY, DEMO-PRIVATE).
//
// Siri as a dock capability ships the SEAM (`useSiriDock` + `<SiriDockCapability>`); the
// waveform GL is DEMO-PRIVATE (no library WebGL, no subpath, no `api/` entry — the wave's
// ruling). ONE GLSL fullscreen pass on the shared `useWebGLCanvas` substrate (WebGL2-only —
// no `.wgsl.ts`): a warm-dominant prismatic lens-flare ribbon whose color is an in-shader
// OKLab-RECTANGULAR ramp (Ottosson OKLab → linear sRGB), so the flowing band stays warm
// amber-cream (never a cool Siri-rainbow — the warm-cream identity). The push-API is the
// `level` prop (0..1): `useSiriDock` derives it from the active form (dormant quiet →
// listening peaks) and binds it here; the ribbon amplitude + bloom track it.
//
// The substrate owns the loop (offscreen-pause + live-PRM one-static-frame + demand gate);
// this SFC threads only the program + the per-frame uniform upload. A `level` change wakes
// the parked loop (the `wake()` seam — no second rAF).

import { onMounted, onScopeDispose, ref, useTemplateRef, watch } from "vue";
import {
    createWebGLCanvas,
    type BackingSize,
    type WebGLCanvasHandle,
} from "@glass/composables/glass/webgl/useWebGLCanvas";

const props = withDefaults(defineProps<{ level?: number }>(), { level: 0 });

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
let handle: WebGLCanvasHandle | null = null;

// the live push-level the shader reads each frame (the no-own-state getter, concentric's
// getAmp precedent). The prop feeds it; a change wakes the parked loop.
const level = ref(props.level);

const VERT = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

// The fragment — a warm-dominant prismatic ribbon on an in-shader OKLab-RECTANGULAR ramp.
const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform float uTime;
uniform float uLevel;   // the push-API amplitude (0..1)
uniform float uAspect;

// Ottosson OKLab -> linear sRGB (the ONE color math — rectangular L,a,b in, linear out).
vec3 oklabToLinear(vec3 lab) {
  float l_ = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
  float m_ = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
  float s_ = lab.x - 0.0894841775 * lab.y - 1.2914855480 * lab.z;
  float l = l_ * l_ * l_;
  float m = m_ * m_ * m_;
  float s = s_ * s_ * s_;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
   -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
   -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}
vec3 linearToSrgb(vec3 c) {
  c = max(c, 0.0);
  return mix(1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, c * 12.92, step(c, vec3(0.0031308)));
}

void main() {
  vec2 uv = vUv - 0.5;
  uv.x *= uAspect;

  // the flowing ribbon — a sum of drifting sines, amplitude driven by the push level.
  float wave = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float freq = 3.0 + fi * 2.2;
    float amp = (0.10 + 0.12 * uLevel) / (1.0 + fi * 0.6);
    wave += sin(uv.x * freq + uTime * (0.9 + fi * 0.45) + fi * 1.7) * amp;
  }
  float dist = abs(uv.y - wave);
  float band = smoothstep(0.16 + 0.09 * uLevel, 0.0, dist);

  // the lens-flare — a soft warm central bloom that swells with the level.
  float flare = (0.18 + 0.30 * uLevel) * exp(-length(uv * vec2(1.0, 1.6)) * 3.2);

  float e = clamp(band + flare, 0.0, 1.0);

  // the OKLab-RECTANGULAR ramp — WARM-DOMINANT: a>0 (red axis), b>0 (yellow axis, the
  // dominant term → amber/cream); a gentle prismatic spread across the band, warm-biased.
  float L = 0.62 + 0.34 * e;
  float aWarm = 0.045 + 0.028 * sin(uv.x * 2.0 + uTime * 0.3);
  float bWarm = 0.105 + 0.030 * cos(uv.x * 1.5 - uTime * 0.2);
  vec3 lin = oklabToLinear(vec3(L, aWarm, bWarm));
  vec3 col = linearToSrgb(lin);

  fragColor = vec4(col * e, e);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh);
        gl.deleteShader(sh);
        throw new Error(`[SiriWaveform] shader compile failed: ${log}`);
    }
    return sh;
}

function makeSetup(cv: HTMLCanvasElement) {
    return (gl: WebGL2RenderingContext) => {
        const vs = compile(gl, gl.VERTEX_SHADER, VERT);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(`[SiriWaveform] link failed: ${gl.getProgramInfoLog(program)}`);
        }
        gl.deleteShader(vs);
        gl.deleteShader(fs);

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(program, "aPosition");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        gl.bindVertexArray(null);

        const uTime = gl.getUniformLocation(program, "uTime");
        const uLevel = gl.getUniformLocation(program, "uLevel");
        const uAspect = gl.getUniformLocation(program, "uAspect");

        const cv = canvasRef.value!;

        return {
            frame(timeSec: number) {
                const w = cv.width;
                const h = cv.height;
                gl.viewport(0, 0, w, h);
                gl.useProgram(program);
                gl.bindVertexArray(vao);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.uniform1f(uTime, timeSec);
                gl.uniform1f(uLevel, level.value);
                gl.uniform1f(uAspect, w / Math.max(h, 1));
                gl.drawArrays(gl.TRIANGLES, 0, 3);
                gl.bindVertexArray(null);
            },
            shouldContinue: () => true,
            resize(s?: BackingSize) {
                gl.viewport(0, 0, s?.w ?? cv.width, s?.h ?? cv.height);
            },
            teardown() {
                gl.deleteProgram(program);
                gl.deleteVertexArray(vao);
                gl.deleteBuffer(buf);
            },
        };
    };
}

// the push-API — a level change updates the getter + wakes the parked loop (no second rAF).
watch(
    () => props.level,
    (n) => {
        level.value = n;
        handle?.wake();
    },
);

onMounted(() => {
    const cv = canvasRef.value;
    if (!cv) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(cv.clientWidth * dpr) || 320;
    cv.height = Math.round(cv.clientHeight * dpr) || 96;
    handle = createWebGLCanvas(cv, {
        contextAttrs: { alpha: true, premultipliedAlpha: true, antialias: true },
        setup: makeSetup(cv),
    });
    handle.arm();
});

onScopeDispose(() => handle?.dispose());
</script>

<template>
    <canvas ref="canvasRef" class="siri-waveform-canvas" aria-hidden="true" />
</template>

<style scoped>
.siri-waveform-canvas {
    inline-size: 100%;
    block-size: 100%;
    display: block;
}
</style>
