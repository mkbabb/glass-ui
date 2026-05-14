/**
 * WebGL frost/refraction fragment shader for glass-ui.
 *
 * Features:
 * - Frosted glass blur (Gaussian kernel with spatial variation)
 * - Snell's law refraction displacement
 * - Fresnel-based specular highlights
 * - Chromatic aberration at glass edges
 */

/** Vertex shader — full-screen quad */
export const VERTEX_SHADER = /* glsl */ `#version 300 es
precision highp float;

in vec2 a_position;
in vec2 a_texCoord;

out vec2 v_texCoord;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
}
`;

/** Fragment shader — frosted glass with refraction and chromatic aberration */
export const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

uniform sampler2D u_background;    // Captured page content behind glass
uniform vec2 u_resolution;         // Canvas resolution (px)
uniform vec4 u_glassBounds;        // Glass panel rect (x, y, w, h) in UV space
uniform float u_blurRadius;        // Base blur radius (0-40)
uniform float u_refractionStrength; // Refraction displacement (0-1)
uniform float u_chromaticAberration; // Edge chromatic aberration (0-1)
uniform vec2 u_lightPos;           // Light source position (UV, 0-1)
uniform float u_time;              // Animation time (seconds)

in vec2 v_texCoord;
out vec4 fragColor;

// Gaussian weight for blur kernel
float gaussian(float x, float sigma) {
    return exp(-(x * x) / (2.0 * sigma * sigma));
}

// Distance from point to nearest edge of glass panel (in UV space)
float edgeDistance(vec2 uv) {
    vec2 glassMin = u_glassBounds.xy;
    vec2 glassMax = u_glassBounds.xy + u_glassBounds.zw;
    vec2 d = min(uv - glassMin, glassMax - uv);
    return min(d.x, d.y);
}

// Fresnel approximation (Schlick)
float fresnel(vec3 viewDir, vec3 normal, float ior) {
    float r0 = pow((1.0 - ior) / (1.0 + ior), 2.0);
    return r0 + (1.0 - r0) * pow(1.0 - max(dot(viewDir, normal), 0.0), 5.0);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 pixelSize = 1.0 / u_resolution;

    // Check if fragment is inside the glass panel
    vec2 glassMin = u_glassBounds.xy;
    vec2 glassMax = u_glassBounds.xy + u_glassBounds.zw;

    if (uv.x < glassMin.x || uv.x > glassMax.x ||
        uv.y < glassMin.y || uv.y > glassMax.y) {
        fragColor = texture(u_background, uv);
        return;
    }

    // Progressive blur — stronger at center, weaker at edges
    float edgeDist = edgeDistance(uv);
    float maxEdgeDist = min(u_glassBounds.z, u_glassBounds.w) * 0.5;
    float blurFactor = smoothstep(0.0, maxEdgeDist * 0.3, edgeDist);
    float effectiveBlur = u_blurRadius * (0.4 + 0.6 * blurFactor);

    // Refraction displacement (Snell's law approximation)
    vec2 center = u_glassBounds.xy + u_glassBounds.zw * 0.5;
    vec2 fromCenter = uv - center;
    vec2 refractionOffset = fromCenter * u_refractionStrength * 0.02;

    // Gaussian blur with refraction offset
    vec3 blurColor = vec3(0.0);
    float totalWeight = 0.0;

    int samples = int(min(effectiveBlur * 2.0, 20.0));
    float sigma = max(effectiveBlur * 0.5, 0.1);

    for (int x = -10; x <= 10; x++) {
        for (int y = -10; y <= 10; y++) {
            if (abs(x) > samples || abs(y) > samples) continue;

            vec2 offset = vec2(float(x), float(y)) * pixelSize * effectiveBlur * 0.1;
            float weight = gaussian(float(x), sigma) * gaussian(float(y), sigma);

            vec2 sampleUV = uv + offset + refractionOffset;
            blurColor += texture(u_background, sampleUV).rgb * weight;
            totalWeight += weight;
        }
    }
    blurColor /= totalWeight;

    // Chromatic aberration at edges
    if (u_chromaticAberration > 0.0) {
        float edgeStrength = 1.0 - smoothstep(0.0, maxEdgeDist * 0.15, edgeDist);
        vec2 aberrationDir = normalize(fromCenter) * edgeStrength * u_chromaticAberration * 0.003;

        float r = texture(u_background, uv + refractionOffset + aberrationDir).r;
        float b = texture(u_background, uv + refractionOffset - aberrationDir).b;
        blurColor.r = mix(blurColor.r, r, edgeStrength * 0.5);
        blurColor.b = mix(blurColor.b, b, edgeStrength * 0.5);
    }

    // Specular highlight (Fresnel)
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec2 normalXY = fromCenter / (u_glassBounds.zw * 0.5);
    vec3 normal = normalize(vec3(normalXY * 0.3, 1.0));
    float spec = fresnel(viewDir, normal, 1.5);

    // Light-source-aware specular
    vec2 lightDir = normalize(u_lightPos - uv);
    float lightDot = max(dot(normalXY, lightDir), 0.0);
    spec *= 0.3 + 0.7 * lightDot;

    // Combine: frosted blur + specular + slight tint
    vec3 tint = vec3(1.0, 1.0, 1.0); // neutral tint
    vec3 result = blurColor * tint + vec3(spec * 0.15);

    // Glass opacity with frosted appearance
    float alpha = 0.85 + spec * 0.1;
    fragColor = vec4(result, alpha);
}
`;

/** Shader program setup — compiles and links vertex + fragment shaders */
export function createFrostProgram(
    gl: WebGL2RenderingContext | WebGLRenderingContext,
): WebGLProgram | null {
    const vertShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return null; // caught upstream — defensive (compileShader throws on COMPILE_STATUS=false post O.W1 Lane B)

    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        // O.W1 Lane B (invariant 24) — library-owned shader source; program
        // link failure is an internal contract violation, not a browser-API
        // degradation. Fail explicitly so the bug surfaces.
        const log = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(
            `[glass-ui:frost] program link failure: ${log}`,
        );
    }

    return program;
}

function compileShader(
    gl: WebGL2RenderingContext | WebGLRenderingContext,
    type: number,
    source: string,
): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        // O.W1 Lane B (invariant 24) — library-owned shader source; compile
        // failure is an internal contract violation, not a browser-API
        // degradation. Fail explicitly so the bug surfaces.
        const log = gl.getShaderInfoLog(shader);
        const stage = type === gl.VERTEX_SHADER ? "vertex" : "fragment";
        gl.deleteShader(shader);
        throw new Error(
            `[glass-ui:frost] ${stage} shader compile failure: ${log}`,
        );
    }

    return shader;
}

/** Uniform locations cache for the frost program */
export interface FrostUniforms {
    u_background: WebGLUniformLocation | null;
    u_resolution: WebGLUniformLocation | null;
    u_glassBounds: WebGLUniformLocation | null;
    u_blurRadius: WebGLUniformLocation | null;
    u_refractionStrength: WebGLUniformLocation | null;
    u_chromaticAberration: WebGLUniformLocation | null;
    u_lightPos: WebGLUniformLocation | null;
    u_time: WebGLUniformLocation | null;
}

export function getFrostUniforms(
    gl: WebGL2RenderingContext | WebGLRenderingContext,
    program: WebGLProgram,
): FrostUniforms {
    return {
        u_background: gl.getUniformLocation(program, "u_background"),
        u_resolution: gl.getUniformLocation(program, "u_resolution"),
        u_glassBounds: gl.getUniformLocation(program, "u_glassBounds"),
        u_blurRadius: gl.getUniformLocation(program, "u_blurRadius"),
        u_refractionStrength: gl.getUniformLocation(
            program,
            "u_refractionStrength",
        ),
        u_chromaticAberration: gl.getUniformLocation(
            program,
            "u_chromaticAberration",
        ),
        u_lightPos: gl.getUniformLocation(program, "u_lightPos"),
        u_time: gl.getUniformLocation(program, "u_time"),
    };
}
