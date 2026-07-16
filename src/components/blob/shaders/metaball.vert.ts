// GooBlob metaball vertex shader. A full-viewport quad: `vUv`
// varies 0..1 across the surface. glass-ui ships GLSL as a TS string export
// (the aurora `shaders/aurora.vert.ts` shape) so the dts/bundle stay raw-loader
// free.

export const METABALL_VERTEX_SRC = /* glsl */ `#version 300 es

in vec2 aPosition;
out vec2 vUv;

void main() {
    vUv = 0.5 * (aPosition + 1.0);
    gl_Position = vec4(aPosition, 0.0, 1.0);
}`;
