export const VERT_SRC = `#version 300 es
// Full-screen triangle; no VBO — positions derived from gl_VertexID.
void main() {
    vec2 p = vec2(
        float((gl_VertexID & 1) << 2) - 1.0,
        float((gl_VertexID & 2) << 1) - 1.0
    );
    gl_Position = vec4(p, 0.0, 1.0);
}
`;
