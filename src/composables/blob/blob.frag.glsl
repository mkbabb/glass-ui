#version 300 es
// Metaball SDF shader: SPEC.md §6 with canonical hsl2rgb (8 lines) + Ashima/McEwan/Gustavson snoise (24 lines, MIT) inlined.
precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec3  uColor;            // hsl decomposition
uniform float uSmoothK;
uniform int   uSourceCount;
uniform vec4  uSources[8];       // x, y, radius, opacity (NDC)

uniform float uHueRange;
uniform float uSatShift;
uniform float uBrightnessShift;
uniform float uColorNoiseFreq;
uniform float uColorNoiseSpeed;
uniform float uChromaticAberration;  // 0.0..0.005

out vec4 fragColor;

float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * h * k * (1.0 / 6.0);
}

float sdSource(vec2 p, vec2 c, float r) {
    return length(p - c) - r;
}

float sdField(vec2 p) {
    float d = 1e6;
    for (int i = 0; i < uSourceCount; ++i) {
        d = smin(d, sdSource(p, uSources[i].xy, uSources[i].z), uSmoothK);
    }
    return d;
}

// canonical 8-line HSL->RGB transform.
vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(
        abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
        0.0, 1.0
    );
    float l = c.z;
    float a = c.y * min(l, 1.0 - l);
    return l + a * (rgb * 2.0 - 1.0);
}

// canonical 24-line 2D simplex noise (Ashima Arts / McEwan / Gustavson, MIT).
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                                          dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 p  = uv * 2.0 - 1.0;

    float d  = sdField(p);
    float dR = sdField(p + vec2( uChromaticAberration, 0.0));
    float dB = sdField(p - vec2( uChromaticAberration, 0.0));

    float edgeR = 1.0 - smoothstep(-0.005, 0.005, dR);
    float edgeG = 1.0 - smoothstep(-0.005, 0.005, d);
    float edgeB = 1.0 - smoothstep(-0.005, 0.005, dB);

    float n = snoise(uv * uColorNoiseFreq + uTime * uColorNoiseSpeed);
    vec3 hsl = uColor + vec3(uHueRange / 360.0 * n, uSatShift, uBrightnessShift);
    vec3 rgb = hsl2rgb(clamp(hsl, vec3(0.0), vec3(1.0)));

    fragColor = vec4(rgb * vec3(edgeR, edgeG, edgeB), max(edgeR, max(edgeG, edgeB)));
}
