export const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/**
 * Metaball fragment shader.
 *
 * For each pixel, sums inverse-square density contributions from all blobs.
 * Pixels above the threshold render as a colored surface with smooth edges.
 * Color is the contribution-weighted blend of all nearby blob colors.
 *
 * MAX_BLOBS is set to 16 to stay within uniform limits on mobile GPUs.
 */
export const FRAGMENT_SHADER = `
precision mediump float;

#define MAX_BLOBS 16

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_blobCount;
uniform vec3 u_blobPositions[MAX_BLOBS];  // xy = position, z = radius
uniform vec3 u_blobColors[MAX_BLOBS];     // rgb [0,1]
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

        vec2 blobPos = vec2(u_blobPositions[i].x * aspect, u_blobPositions[i].y);
        float radius = u_blobPositions[i].z;

        float dist = distance(coord, blobPos);
        float contribution = (radius * radius) / (dist * dist + 0.001);

        density += contribution;
        color += contribution * u_blobColors[i];
    }

    if (density > u_threshold * 0.1) {
        color /= density;

        float edge = smoothstep(
            u_threshold * (1.0 - u_edgeSoftness),
            u_threshold * (1.0 + u_edgeSoftness * 0.5),
            density
        );

        float alpha = edge * 0.35;
        gl_FragColor = vec4(color, alpha);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, u_bgAlpha);
    }
}
`;
