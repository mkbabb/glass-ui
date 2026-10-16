// D3-crit-r4-tokens.mjs · each existing light accent-like token (oklch literals from tokens/color-radius.css) composited
// over the light menu plate #fef7f2 at the hover (0.05) and selected (0.12) fill alphas, sRGB source-over, 8-bit.
const T = { "section-0": [0.552, 0.192, 359.8], "section-1": [0.502, 0.165, 305.9], "section-2": [0.484, 0.163, 265.5], "section-3": [0.542, 0.089, 222.8],
  "section-4": [0.521, 0.088, 171.1], "section-5": [0.530, 0.124, 69.6], "section-6": [0.549, 0.201, 30.4], "section-7": [0.532, 0.180, 317.5],
  "section-8": [0.520, 0.176, 8.4], "warning": [0.635, 0.165, 70.6] };
const toLin = ([L, C, h]) => { const a = C * Math.cos((h * Math.PI) / 180), b = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s]; };
const enc = (c) => { c = Math.min(1, Math.max(0, c)); return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055; };
const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const oklab = (rgb) => { const [r, g, b] = rgb.map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
const P = [0xfe, 0xf7, 0xf2].map((x) => x / 255), Lp = oklab(P)[0];
for (const [k, v] of Object.entries(T)) { const s = toLin(v).map(enc); const row = [k];
  for (const A of [0.05, 0.12]) { const c = P.map((p, i) => Math.round((A * s[i] + (1 - A) * p) * 255) / 255); const [L, a, b] = oklab(c);
    row.push(`α${A}: #${c.map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("")} C ${Math.hypot(a, b).toFixed(4)} ΔL ${(L - Lp).toFixed(4)}`); }
  console.log(row.join(" | ")); }
