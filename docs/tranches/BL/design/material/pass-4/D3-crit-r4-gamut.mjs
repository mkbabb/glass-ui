// D3-crit-r4-gamut.mjs · the critic's check of R-4's claim "at the hover alpha no in-gamut accent at this lightness
// reaches C 0.02 on the cream plate". Composites every sRGB colour (step 1/51 per channel) at alpha A over the light
// menu plate #fef7f2 in sRGB space (the browser's source-over) and prints the most chromatic composite.
//   node D3-crit-r4-gamut.mjs [alpha=0.05] [plate=fef7f2]
const A = +(process.argv[2] ?? 0.05), P = (process.argv[3] ?? "fef7f2").match(/../g).map((h) => parseInt(h, 16) / 255);
const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const oklab = ([r, g, b]) => { [r, g, b] = [r, g, b].map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
const hex = (c) => "#" + c.map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
let best = null; const N = 51;
for (let r = 0; r <= N; r++) for (let g = 0; g <= N; g++) for (let b = 0; b <= N; b++) {
  const src = [r / N, g / N, b / N], comp = P.map((p, i) => Math.round((A * src[i] + (1 - A) * p) * 255) / 255);
  const [L, a, bb] = oklab(comp), C = Math.hypot(a, bb);
  if (!best || C > best.C) best = { C, L, src: hex(src), comp: hex(comp), h: ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360 };
}
const [Lp, ap, bp] = oklab(P);
console.log(`plate #${process.argv[3] ?? "fef7f2"} L ${Lp.toFixed(4)} C ${Math.hypot(ap, bp).toFixed(4)}; alpha ${A}`);
console.log(`most chromatic composite: source ${best.src} -> ${best.comp} L ${best.L.toFixed(4)} C ${best.C.toFixed(4)} h ${best.h.toFixed(1)}; dL ${(best.L - Lp).toFixed(4)}`);
