// slotink.mjs (D2 pass 7, B′ prototype; diagnosis only, enters no row): B2's hole at DISPLAY-frame resolution, from
// the DOM. H7-1 reads the hole from the 40 ms cast; this probe reads every rAF frame. At rest before the trigger and
// after it, each seat's glyph extent is read (a Range over its text, box-local). On every rAF frame of the move each
// seat's painted box, inline clip-path inset and mask-image ramp are read, and a glyph's ink is the mean alpha of its
// clip × mask over its own extent (the glyph's mass taken as uniform across its width). A slot is a seat painting
// whole at the end; its ink is its own glyph ink plus that of any other seat whose painted glyph centre lies inside
// the slot's painted box (a leaving unit on the same place), weighted by glyph width. A frame is a HOLE for a slot
// when the slot reads < 0.1 while its nearest final neighbour on each side reads >= 0.9 (H7-1's rule, per display
// frame). One browser per run, a fresh context per sequence, everything closed in finally.
//   node slotink.mjs --build <dir> [--engine chromium|webkit] [--seqs a,b] [--theme dark] [--runs n] [--json out]
import fs from "node:fs";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs();
const engine = args.engine ?? "chromium";
const SEQ = {
  "first-expand": ["morph", [], [["expand"]]],
  "warm-collapse": ["morph", [["expand"]], [["collapse"]]],
  "warm-expand": ["morph", [["expand"], ["collapse"]], [["expand"]]],
  "swap-long": ["swap", [], [["setFace", "long"]]],
  "swap-short": ["swap", [["setFace", "long"]], [["setFace", "short"]]],
  "content-add": ["morph", [["expand"]], [["setExtra", true]]],
};
const seqs = (args.seqs ?? Object.keys(SEQ).join(",")).split(",");
const runs = Number(args.runs ?? 1);
const target = await openTarget(args);
const browser = await launch(engine);
const out = [];
try {
  for (let k = 0; k < runs; k++) for (const seq of seqs) {
    const [scene, pre, go] = SEQ[seq];
    let s;
    try {
      s = await openScene(browser, target, scene, { theme: args.theme ?? null });
      for (const [fn, ...a] of pre) { await s.page.evaluate(([f, a]) => window.__scene[f](...a), [fn, a]); await waitRest(s.page); await s.page.waitForTimeout(400); }
      const load = loadAvg();
      const log = await s.page.evaluate(async (go) => {
        const root = document.querySelector('[data-testid="dock"]');
        const seats = () => [...root.querySelectorAll(".dock-face-content > *, .dock-layer > *, [data-dock-seat], .dock-persistent > *")]
          .filter((e, i, a) => a.indexOf(e) === i && (e.textContent || "").trim());
        const glyph = new Map();
        const readGlyphs = () => {
          for (const e of seats()) {
            const r = e.getBoundingClientRect(); const rg = document.createRange(); rg.selectNodeContents(e);
            const g = rg.getBoundingClientRect();
            if (g.width > 0 && !glyph.has(e)) glyph.set(e, [g.left - r.left, g.right - r.left]);
          }
        };
        readGlyphs();
        const id = new Map(); let n = 0;
        const frames = []; const t0 = performance.now();
        const vis = (e) => { for (let a = e; a && a !== root.parentElement; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity < 0.02) return false; } return true; };
        const snap = (t) => {
          const pr = root.getBoundingClientRect();
          frames.push({ t: +(t - t0).toFixed(1), s: seats().map((e) => {
            if (!id.has(e)) id.set(e, n++);
            const r = e.getBoundingClientRect();
            return [id.get(e), (e.textContent || "").trim().slice(0, 10), +(r.left - pr.left).toFixed(2), +r.width.toFixed(2), e.style.clipPath || "", e.style.maskImage || "", vis(e) ? 1 : 0];
          }) });
        };
        for (const [fn, ...a] of go) window.__scene[fn](...a);
        await new Promise((res) => { const f = (t) => { snap(t); if (performance.now() - t0 < 700) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); });
        readGlyphs();
        const g = {}; for (const [e, v] of glyph) if (id.has(e)) g[id.get(e)] = v;
        return { frames, glyph: g };
      }, go);
      out.push({ seq, run: k + 1, engine, theme: args.theme ?? "light", load, ...analyse(log) });
    } finally { await s?.close().catch(() => {}); }
  }
} finally { await browser.close().catch(() => {}); await target.close?.().catch(() => {}); }

function ramp(clip, mask, w) {
  // visible [l, w - r] from inset(t r b l …); the mask's stops piecewise-linear; returns alpha(x)
  let lo = 0, hi = w;
  const m = clip && clip.match(/inset\(([-\d.]+)px(?: ([-\d.]+)px)?(?: ([-\d.]+)px)?(?: ([-\d.]+)px)?/);
  if (m) { const v = m.slice(1).map((x) => (x === undefined ? undefined : +x)); const [t, r = t, b = t, l = r] = v; lo = Math.max(0, l); hi = Math.min(w, w - r); }
  const stops = [...(mask || "").matchAll(/rgba?\(([^)]*)\)\s*([-\d.]+)px/g)].map((q) => {
    const p = q[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [p.length >= 4 ? p[3] : 1, +q[2]];
  });
  return (x) => {
    if (x < lo || x > hi) return 0;
    if (!stops.length) return 1;
    if (x <= stops[0][1]) return stops[0][0];
    for (let i = 1; i < stops.length; i++) if (x <= stops[i][1]) { const [a0, x0] = stops[i - 1], [a1, x1] = stops[i]; return x1 > x0 ? a0 + ((a1 - a0) * (x - x0)) / (x1 - x0) : a1; }
    return stops[stops.length - 1][0];
  };
}
function analyse({ frames, glyph }) {
  const inkOf = (q) => { // [id, label, left, width, clip, mask, vis]
    const g = glyph[q[0]]; if (!g || !q[6]) return 0;
    const a = ramp(q[4], q[5], q[3]); let s = 0; const N = 24;
    for (let i = 0; i < N; i++) s += a(g[0] + ((i + 0.5) * (g[1] - g[0])) / N);
    return s / N;
  };
  const last = frames[frames.length - 1].s;
  const finals = last.filter((q) => inkOf(q) >= 0.9 && glyph[q[0]]).sort((a, b) => a[2] - b[2]).map((q) => q[0]);
  const rows = []; let run = 0, worst = 0, holeFrames = 0, holeMs = 0, worstAt = null;
  for (let i = 0; i < frames.length; i++) {
    const f = frames[i]; const by = new Map(f.s.map((q) => [q[0], q]));
    const ink = new Map();
    for (const fid of finals) {
      const q = by.get(fid); if (!q) { ink.set(fid, 0); continue; }
      const gw = glyph[fid][1] - glyph[fid][0];
      let v = inkOf(q);
      for (const o of f.s) {
        if (o[0] === fid || finals.includes(o[0]) || !glyph[o[0]]) continue;
        const c = o[2] + (glyph[o[0]][0] + glyph[o[0]][1]) / 2;
        if (c >= q[2] && c <= q[2] + q[3]) v += (inkOf(o) * (glyph[o[0]][1] - glyph[o[0]][0])) / gw;
      }
      ink.set(fid, Math.min(1.5, v));
    }
    // order by painted position this frame
    const order = finals.filter((fid) => by.has(fid)).sort((a, b) => by.get(a)[2] - by.get(b)[2]);
    let hole = null;
    for (let j = 1; j + 1 < order.length; j++) {
      if (ink.get(order[j]) < 0.1 && ink.get(order[j - 1]) >= 0.9 && ink.get(order[j + 1]) >= 0.9) hole = by.get(order[j])[1];
    }
    const dt = i + 1 < frames.length ? frames[i + 1].t - f.t : 0;
    if (hole) { run++; holeFrames++; holeMs += dt; if (run > worst) { worst = run; worstAt = `${hole} at +${f.t} ms`; } } else run = 0;
    rows.push(`${f.t}\t${order.map((fid) => `${by.get(fid)[1]}:${ink.get(fid).toFixed(2)}`).join(" ")}${hole ? "\tHOLE " + hole : ""}`);
  }
  const dts = frames.slice(1).map((f, i) => f.t - frames[i].t);
  return { frames: frames.length, medianDt: dts.sort((a, b) => a - b)[dts.length >> 1], holeFrames, worstRun: worst, holeMs: +holeMs.toFixed(1), worstAt, rows };
}
for (const r of out) console.log(`${r.engine} ${r.theme} ${r.seq} run ${r.run}: ${r.frames} frames (median ${r.medianDt} ms), hole frames ${r.holeFrames}, longest run ${r.worstRun}${r.worstAt ? " (" + r.worstAt + ")" : ""}, ${r.holeMs} ms in a hole  [load ${r.load}]`);
if (args.json) fs.writeFileSync(args.json, JSON.stringify(out, null, 1));
if (args.rows) for (const r of out) { console.log(`--- ${r.seq} run ${r.run}`); console.log(r.rows.slice(0, 40).join("\n")); }
