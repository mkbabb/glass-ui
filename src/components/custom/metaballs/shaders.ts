export const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/**
 * Metaball fragment shader.
 *
 * Computes a density field per pixel by summing inverse-square
 * contributions from all blobs. Pixels above the threshold
 * render as colored goo with smooth edges.
 */
export const FRAGMENT_SHADER = `
precision mediump float;

#define MAX_BLOBS 16

uniform vec2 u_resolution;
uniform int u_blobCount;
uniform vec3 u_positions[MAX_BLOBS];
uniform vec3 u_colors[MAX_BLOBS];
uniform float u_threshold;
uniform float u_edgeSoftness;
uniform float u_bgAlpha;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 coord = vec2(uv.x * aspect, uv.y);

    float density = 0.0;
    vec3 color = vec3(0.0);

    for (int i = 0; i < MAX_BLOBS; i++) {
        if (i >= u_blobCount) break;

        vec2 pos = vec2(u_positions[i].x * aspect, u_positions[i].y);
        float radius = u_positions[i].z;
        float dist = distance(coord, pos);
        float contrib = (radius * radius) / (dist * dist + 0.0001);

        density += contrib;
        color += contrib * u_colors[i];
    }

    if (density > u_threshold * 0.4) {
        color /= density;
        // Gooey edge: slightly wider smoothstep for organic merge zone
        float edge = smoothstep(
            u_threshold * 0.75,
            u_threshold * 1.1,
            density
        );
        // Solid core with soft goo boundary
        gl_FragColor = vec4(color, edge * 0.30);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, u_bgAlpha);
    }
}
`;
