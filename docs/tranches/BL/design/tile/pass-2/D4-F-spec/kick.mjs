#!/usr/bin/env node
// D4-F-spec/kick.mjs · the commit kick as a `linear()` easing: the impulse response of a damped spring,
//   f(θ) = e^(−ζθ/√(1−ζ²)) · sin θ, θ = ω_d·t ∈ [0, 2π], normalized so its first peak is 1.
// The curve starts at 0, peaks at 1, dips to −e^(−ζπ/√(1−ζ²)) and returns to 0, so a keyframe pair
// `from { scale 1 } to { scale 1 + A }` run on it is a pop of amplitude A that lands back on 1 (it ends at 0, not 1).
//   node kick.mjs [zeta=0.5] [stops=24]
const zeta = Number(process.argv[2] ?? 0.5), n = Number(process.argv[3] ?? 24);
const k = zeta / Math.sqrt(1 - zeta * zeta);
const f = (th) => Math.exp(-k * th) * Math.sin(th);
const thPeak = Math.atan(1 / k), peak = f(thPeak);
const stops = Array.from({ length: n + 1 }, (_, i) => { const th = (i / n) * 2 * Math.PI; return [f(th) / peak, (i / n) * 100]; });
stops[n][0] = 0;
console.log(`zeta ${zeta} · peak at ${(thPeak / (2 * Math.PI) * 100).toFixed(1)}% · trough ${(-Math.exp(-k * Math.PI)).toFixed(4)} at ${((thPeak + Math.PI) / (2 * Math.PI) * 100).toFixed(1)}%`);
console.log("linear(" + stops.map(([v, p], i) => i === 0 ? "0" : i === n ? "0" : `${v.toFixed(4)} ${p.toFixed(2)}%`).join(", ") + ")");
