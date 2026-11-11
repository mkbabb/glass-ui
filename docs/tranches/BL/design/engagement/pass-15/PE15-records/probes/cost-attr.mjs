#!/usr/bin/env node
// P-E15 part B, resume r3 · the cost attribution (B-6 item 10, §S15-g rules 1 and 3). E-15's COST cells, the same scenes, setup and film
// (harness/film.mjs SETUP/FILM, harness/e15-s15.mjs COST), read with a Chromium trace beside the CDP layout count: every Layout and
// UpdateLayoutTree event on the renderer's main thread with its JS stack (a forced update carries the stack that forced it; the frame's own
// lifecycle update carries none). Each is attributed to the first stage-side function on its stack, the film's own read, or the lifecycle,
// and placed on its frame (the latest BeginMainThreadFrame before it, counted from the act's frame). Chromium only (a trace is CDP's).
//   node cost-attr.mjs --build <dir> [--only held,affine,proj] [--out <dir>]   (run under guarded, never --light)
import fs from "node:fs";
import { witness, openPage, f } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";
import { blk, SETUP, FILM, filmKit } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/film.mjs";

const CATS = ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.stack"];
await witness("COST-ATTR", "the stage's forced layouts by function and frame (B-6 item 10)", async ({ a, E, T, cell, guard, idx, engine }) => {
  if (engine !== "chromium") { cell("COST-ATTR", "REPORT", "Chromium trace only"); return; }
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const K = filmKit({ E, T, cell, guard, idx, engine }); const { sc, R, ENG, kbd } = K;
  const scenes = [["held", "held still, 30 frames", "", [], 30], ["affine", "an affine step window: a 40 px insert above the root, 14 frames", "", [[2, `C.insertBefore(${blk(40)}, root)`]], 14],
    ["proj", "a projective step window: C perspective(200px) rotateX(25deg), a 40 px insert inside C, 14 frames", "C.style.transform = 'perspective(200px) rotateX(25deg)';", [[2, `C.insertBefore(${blk(40)}, root)`]], 14],
    ["projstill", "the projective card held still (no insert), 14 frames", "C.style.transform = 'perspective(200px) rotateX(25deg)';", [], 14]];
  const dump = {};
  for (const [key, nm, setup, hooks, N] of scenes) {
    if (only && !only.has(key)) continue;
    const name = `COST-ATTR ${nm}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, sc, {}); const br = P.ctx.browser();
      try { await P.page.evaluate(SETUP, [R, setup, {}]); await P.page.waitForTimeout(200); const eng = await kbd(P);
        const cdp = await P.ctx.newCDPSession(P.page); await cdp.send("Performance.enable"); const met = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
        await br.startTracing(P.page, { categories: CATS }); const a0 = await met();
        const out = await P.page.evaluate(FILM, [R, ENG, N, hooks]); const a1 = await met(); const buf = await br.stopTracing();
        return { eng, out, lay: a1.LayoutCount - a0.LayoutCount, rec: a1.RecalcStyleCount - a0.RecalcStyleCount, trace: JSON.parse(buf.toString()) }; } finally { await P.close(); } }, 90000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const ev = r.trace.traceEvents ?? r.trace; const main = new Set(ev.filter((e) => e.name === "thread_name" && e.args?.name === "CrRendererMain").map((e) => `${e.pid}:${e.tid}`));
    const onMain = ev.filter((e) => main.has(`${e.pid}:${e.tid}`)); const frames = onMain.filter((e) => e.name === "BeginMainThreadFrame").map((e) => e.ts).sort((p, q) => p - q);
    // the film's ticks: FireAnimationFrame events whose stack/data is the film's; the act's frame is the film's hook frame (n = 2), counted from the first film tick
    const fire = onMain.filter((e) => e.name === "FireAnimationFrame" && e.ph === "X").sort((p, q) => p.ts - q.ts);
    // frames: the rAF rounds, clustered (a new round when the next FireAnimationFrame starts > 3 ms after the last); frame 0 = the film's first tick
    const starts = []; for (const e of fire) if (!starts.length || e.ts - starts.at(-1).last > 3000) starts.push({ ts: e.ts, last: e.ts + (e.dur ?? 0) }); else starts.at(-1).last = Math.max(starts.at(-1).last, e.ts + (e.dur ?? 0));
    const t0 = fire.length ? fire[0].ts : 0; const frameOf = (ts) => { let k = -1; for (let i = 0; i < starts.length; i++) if (starts[i].ts <= ts) k = i; else break; return k; }; const f0 = 0; void frames; void t0;
    const STAGE = /\/assets\/index-[^/]*\.js/; const who = (st) => { if (!st?.length) return "(lifecycle: no JS stack)"; const named = st.filter((s) => STAGE.test(s.url ?? "")).map((s) => s.functionName || "(anon)");
      if (!named.length) return /__puppeteer|pptr|^$/.test(st[0].url ?? "") || !STAGE.test(st[0].url ?? "") ? "(the film's read: harness script)" : "(anon bundle)"; return named.slice(0, 4).join(" < "); };
    const by = new Map(); const perFrame = new Map(); let nl = 0, nf = 0;
    for (const e of onMain) { if (!(e.name === "Layout" && (e.ph === "X" || e.ph === "B"))) continue; nl++; const st = e.args?.beginData?.stackTrace; const w = who(st); if (st?.length) nf++;
      by.set(w, (by.get(w) ?? 0) + 1); const fr = frameOf(e.ts) - f0; const pk = `${fr}`; const m = perFrame.get(pk) ?? new Map(); m.set(w, (m.get(w) ?? 0) + 1); perFrame.set(pk, m); }
    const rlt = onMain.filter((e) => e.name === "UpdateLayoutTree" && (e.ph === "X" || e.ph === "B")); const byR = new Map(); for (const e of rlt) { const w = who(e.args?.beginData?.stackTrace); byR.set(w, (byR.get(w) ?? 0) + 1); }
    const film = by.get("(the film's read: harness script)") ?? 0; const stage = [...by].filter(([k]) => !k.startsWith("(")).reduce((s, [, v]) => s + v, 0);
    cell(name, "REPORT", `engaged ${r.eng} · CDP LayoutCount ${r.lay} (less the film's ${N}: ${r.lay - N}), RecalcStyleCount ${r.rec} · trace Layout events ${nl} (${nf} forced, with a JS stack): stage-forced ${stage}, the film's ${film}, lifecycle ${by.get("(lifecycle: no JS stack)") ?? 0} · glides ${r.out.at(-1)?.glides}`);
    for (const [k, v] of [...by].sort((p, q) => q[1] - p[1])) console.log(`    layouts ${String(v).padStart(4)}  ${k}`);
    console.log(`    per frame (frame index from the film's first tick; the act at its frame 2), stage-forced only:`);
    for (const [fr, m] of [...perFrame].sort((p, q) => +p[0] - +q[0])) { const s = [...m].filter(([k]) => !k.startsWith("(")); if (s.length) console.log(`      frame ${fr.padStart(3)}: ${s.map(([k, v]) => `${v}× ${k}`).join(" · ")}`); }
    for (const [k, v] of [...byR].sort((p, q) => q[1] - p[1]).slice(0, 8)) console.log(`    style  ${String(v).padStart(4)}  ${k}`);
    dump[key] = { lay: r.lay, rec: r.rec, by: Object.fromEntries(by), perFrame: Object.fromEntries([...perFrame].map(([k, m]) => [k, Object.fromEntries(m)])), style: Object.fromEntries(byR) };
  }
  if (typeof a.out === "string") { fs.mkdirSync(a.out, { recursive: true }); fs.writeFileSync(`${a.out}/cost-attr-${Date.now()}.json`, JSON.stringify(dump, null, 1)); }
}, 1200);
