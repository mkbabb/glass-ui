// BM pass 7 (fusion and fission, first round): the numbers behind DESIGN §9, computed in Node with no browser.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-7/fuse/fuse.mjs
// Writes fuse.json beside this file. Every figure is a model of geometry or arithmetic, not a device reading.
//
// 1. necks: a dock's capsule end (cross extent 52, radius 26) and a round seat of the same size, `gap` px apart.
//    For each bridge the waist (the least height of the filled shape between the facing ends) is read at each gap:
//    - "apple": the union as rida.dev fit Apple's blend in the iOS 27 simulator, a smooth-min of the two shapes'
//      distance fields whose radius is 24 * smoothstep((7.33 - gap) / 7.33) (UNION F1, worker@74776). The smooth-min
//      family is rida's ("a polynomial smooth-min", F2); the quadratic variant used here is an assumption.
//    - "goo": the SVG filter on a layer that holds both plates: a Gaussian blur of the union's coverage, then an
//      alpha threshold at 0.5 with slope 20 (feColorMatrix alpha row 0 0 0 20 -9.5), for blur sigma 3 to 8 px.
//    - "path": R4's lane B, a neck drawn as a clip: waist 2R(1 - t)^1.2 with t = gap / 24 (pages/R4.html, `neck`).
//    - "daraksha": daraksha's neck element, waist 0.87h * 0.8 * (1 - g)^2 with g = gap / 8 (SiteDock.vue:528-560).
// 2. rest: how far the goo's edge sits from the true capsule at rest (its ends erode; its sides do not).
// 3. clocks: the fold's travel (236 -> 52 px) on the rows a fold may ride, to half a pixel, and its overshoot.
// 4. cost: what the goo filter repaints per frame while the seat splits or joins, at DPR 3.
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);

const R = 26, H = 2 * R, RES = 0.25;
const X0 = -110, X1 = 130, Y0 = -60, Y1 = 60;
const NX = Math.round((X1 - X0) / RES), NY = Math.round((Y1 - Y0) / RES);
const xs = (i) => X0 + (i + 0.5) * RES, ys = (j) => Y0 + (j + 0.5) * RES;

// Signed distance to the capsule (right end cap centred at -R, running far to the left) and to the seat's disc.
const dCaps = (x, y) => (x > -R ? Math.hypot(x + R, y) - R : Math.abs(y) - R);
const dSeat = (gap) => (x, y) => Math.hypot(x - (gap + R), y) - R;

// Coverage of the union, antialiased over one cell, as the plate layer paints it before the filter.
function coverage(gap) {
  const a = new Float32Array(NX * NY), ds = dSeat(gap);
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
    const d = Math.min(dCaps(xs(i), ys(j)), ds(xs(i), ys(j)));
    a[j * NX + i] = Math.min(1, Math.max(0, 0.5 - d / RES));
  }
  return a;
}
function blur(src, sigma) {
  const s = sigma / RES, r = Math.ceil(3 * s), k = new Float32Array(2 * r + 1);
  let sum = 0; for (let i = -r; i <= r; i++) { k[i + r] = Math.exp((-i * i) / (2 * s * s)); sum += k[i + r]; }
  for (let i = 0; i < k.length; i++) k[i] /= sum;
  const tmp = new Float32Array(src.length), out = new Float32Array(src.length);
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
    let v = 0; for (let t = -r; t <= r; t++) { const ii = i + t; if (ii >= 0 && ii < NX) v += k[t + r] * src[j * NX + ii]; else if (ii < 0) v += k[t + r] * src[j * NX]; }
    tmp[j * NX + i] = v; // the capsule runs on past the left edge, so the left boundary repeats its column
  }
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
    let v = 0; for (let t = -r; t <= r; t++) { const jj = j + t; if (jj >= 0 && jj < NY) v += k[t + r] * tmp[jj * NX + i]; }
    out[j * NX + i] = v;
  }
  return out;
}
const threshold = (a) => a.map((v) => Math.min(1, Math.max(0, 20 * v - 9.5)));
// The waist: the least filled height over the columns strictly between the capsule's end (x = 0) and the seat (x = gap).
// At gap 0 the two touch at one point, so the band is the 4 px either side of the contact.
function waist(field, gap, inside) {
  const lo = gap > 0 ? 0 : -2, hi = gap > 0 ? gap : 2;
  let least = Infinity;
  for (let i = 0; i < NX; i++) {
    const x = xs(i); if (x < lo || x > hi) continue;
    let n = 0; for (let j = 0; j < NY; j++) if (inside(field[j * NX + i])) n++;
    least = Math.min(least, n * RES);
  }
  return least === Infinity ? 0 : +least.toFixed(2);
}

// The smooth-min reference.
const smooth = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
function appleField(gap) {
  const k = 24 * smooth(0, 1, (7.33 - gap) / 7.33), ds = dSeat(gap), f = new Float32Array(NX * NY);
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
    const a = dCaps(xs(i), ys(j)), b = ds(xs(i), ys(j));
    const h = k > 0 ? Math.max(k - Math.abs(a - b), 0) / k : 0;
    f[j * NX + i] = Math.min(a, b) - h * h * k / 4;
  }
  return f;
}

const gaps = []; for (let g = 0; g <= 16; g += 1) gaps.push(g);
const sigmas = [3, 4, 5, 6, 8];
const necks = { apple: {}, path: {}, daraksha: {} };
for (const g of gaps) {
  necks.apple[g] = waist(appleField(g), g, (v) => v < 0);
  necks.path[g] = +(2 * R * Math.pow(Math.max(0, 1 - g / 24), 1.2)).toFixed(2);
  necks.daraksha[g] = +(0.87 * H * 0.8 * Math.pow(Math.max(0, 1 - g / 8), 2)).toFixed(2);
}
const goo = {};
for (const s of sigmas) {
  goo[s] = {};
  for (const g of gaps) goo[s][g] = waist(threshold(blur(coverage(g), s)), g, (v) => v >= 0.5);
}
const pinch = (row) => { const g = gaps.find((x) => row[x] === 0); return g === undefined ? ">16" : g; };
const pinchAt = { apple: pinch(necks.apple), path: pinch(necks.path), daraksha: pinch(necks.daraksha) };
for (const s of sigmas) pinchAt["goo_sigma_" + s] = pinch(goo[s]);

// 2. rest: the seat far away; the goo's 0.5 contour along the capsule's axis (its end) and across its side.
const rest = {};
for (const s of sigmas) {
  const f = threshold(blur(coverage(200), s));
  const j0 = Math.floor((0 - Y0) / RES);
  let endX = null; for (let i = 0; i < NX; i++) if (xs(i) > -R && f[j0 * NX + i] >= 0.5) endX = xs(i) + RES / 2;
  const i0 = Math.floor((-80 - X0) / RES);
  let topY = null; for (let j = 0; j < NY; j++) if (f[j * NX + i0] >= 0.5) { topY = ys(j) - RES / 2; break; }
  // largest gap between the goo's contour and the true capsule end, over the end cap's half-circle
  let worst = 0;
  for (let deg = 0; deg <= 90; deg += 5) {
    const th = (deg * Math.PI) / 180, cx = -R, dx = Math.cos(th), dy = Math.sin(th);
    let r = 0; for (let q = 0; q < 4 * R; q++) { const x = cx + dx * q * RES, y = dy * q * RES; const i = Math.floor((x - X0) / RES), j = Math.floor((y - Y0) / RES); if (f[j * NX + i] >= 0.5) r = q * RES; }
    worst = Math.max(worst, Math.abs(R - r));
  }
  rest[s] = { endErodes_px: +(0 - endX).toFixed(2), sideMoves_px: +(-R - topY).toFixed(2), worstOnTheEnd_px: +worst.toFixed(2) };
}

// 3. clocks: a fold of 184 px from rest on each row a fold may ride (SPRING_PRESETS, springPresets.ts:63-120).
const ROWS = { press: [0.2, 0.8], present: [0.22, 1.0], dock: [0.3, 0.88] };
const pos = (resp, z, t) => {
  const w = (2 * Math.PI) / resp;
  if (z >= 1) return 1 - Math.exp(-w * t) * (1 + w * t);
  const wd = w * Math.sqrt(1 - z * z), e = Math.exp(-z * w * t);
  return 1 - e * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t));
};
const clocks = {};
for (const [name, [resp, z]] of Object.entries(ROWS)) {
  const travel = 184; let last = 0, peak = 0, t90 = null;
  for (let t = 0; t < 2; t += 1 / 1000) {
    const p = pos(resp, z, t); peak = Math.max(peak, p);
    if (Math.abs(1 - p) * travel > 0.5) last = t; if (t90 === null && p >= 0.9) t90 = t;
  }
  clocks[name] = { response: resp, damping: z, to_half_px_ms: Math.round((last + 0.001) * 1000), ninety_pct_ms: Math.round(t90 * 1000), overshoot_px: +((peak - 1) * travel).toFixed(2), frames_at_30fps: +((last + 0.001) * 30).toFixed(1) };
}

// 4. cost: the plate layer of an open dock (236) beside its seat (52, 8 apart), with the filter region the goo needs
// (3 sigma each side), painted in the web process on each frame of the travel (ios27-glass.md §2.2).
const cost = {};
for (const s of [4, 5, 6]) {
  const w = 236 + 8 + 52 + 6 * s, h = 52 + 6 * s, px = Math.round(w * h * 9);
  cost["sigma_" + s] = { region_css_px: `${w} x ${h}`, device_px_dpr3: px, frames: { dock_row_at_60: Math.round(clocks.dock.to_half_px_ms / 16.7), dock_row_at_30: Math.round(clocks.dock.to_half_px_ms / 33.3) } };
}

const out = { method: "pass-7/fuse/fuse.mjs; geometry and arithmetic in Node, not a device reading", R, H, res_px: RES, necks: { ...necks, goo }, pinchAt, rest, clocks, cost };
writeFileSync(path.join(HERE, "fuse.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify({ pinchAt, rest, clocks, apple: necks.apple, goo5: goo[5], goo4: goo[4], path: necks.path, daraksha: necks.daraksha }, null, 1));
