// Aurora v4.1 — vertex shader (verbatim port of bundle shader.js VERTEX_SRC).
// Full-screen triangle via VBO: three vertices at (-1,-1), (3,-1), (-1,3).
// `vUv` varies 0..1 across the visible quad.

export const VERTEX_SRC = /* glsl */ `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;
