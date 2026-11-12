#!/usr/bin/env node
// P-E15 part B, resume r3 · the cost attribution of cost14's step cell (pass-14/PE14-records/cost14.mjs, the same scene, press and round:
// a 200 px block inserted above the held slider, inside or outside a `perspective(400px) rotateX(40deg)` card, at frame 11 of a 14-frame
// round, removed at its end; here 3 rounds, each traced): every forced Layout on the renderer's main thread by the first bundle function
// on its stack, and by frame of the round (rAF rounds clustered, as cost-attr.mjs). Chromium only.
//   node cost-attr14.mjs --build <dir> [--out <dir>]   (under guarded, never --light)
import fs from "node:fs";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, scenesFor, center } = await import(`${H}/lib.mjs`);
const CATS = ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.stack"];
await witness("COST-ATTR14", "cost14's step cell, forced layouts by function and frame", async ({ a, E, T, cell, guard, idx, engine }) => {
  if (engine !== "chromium") { cell("COST-ATTR14", "REPORT", "Chromium trace only"); return; }
  const [sc, m] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && !x.clip); const R = m.root ?? '[data-e~="root"]', TH = m.thumb ?? '[role="slider"]';
  const STAGE = /\/assets\/index-[^/]*\.js/; const who = (st) => { if (!st?.length) return "(lifecycle)"; const n = st.filter((s) => STAGE.test(s.url ?? "")).map((s) => s.functionName || "anon"); return n.length ? n.slice(0, 4).join(" < ") : "(harness script)"; };
  const dump = {};
  for (const where of ["inside", "outside"]) {
    const name = `COST-ATTR14 step · ${where} a perspective(400px) rotateX(40deg) card · 200 px insert above the held slider`;
    const r = await guard(name, async () => { const P = await openPage(E, T, sc, {}); const br = P.ctx.browser();
      try { const cdp = await P.ctx.newCDPSession(P.page); await cdp.send("Performance.enable"); const met = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
        await P.page.evaluate((R) => { const root = document.querySelector(R); const C = root.parentElement; const card = document.createElement("div"); card.id = "cost-card"; card.style.cssText = "transform: perspective(400px) rotateX(40deg); padding: 8px"; C.parentElement.insertBefore(card, C); card.appendChild(C); }, R);
        await P.page.waitForTimeout(200); const c = await center(P.page, TH); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(500);
        const rounds = [];
        for (let k = 0; k < 3; k++) {
          await br.startTracing(P.page, { categories: CATS }); const m0 = await met();
          await P.page.evaluate(([where, R]) => new Promise((ok) => { let n = 0; const card = document.getElementById("cost-card"); const root = document.querySelector(R); performance.mark("round-start");
            const tick = () => { n++; if (n === 11) { performance.mark("insert"); const b = document.createElement("div"); b.className = "cost-ins"; b.style.height = "200px"; if (where === "inside") root.parentElement.insertBefore(b, root); else card.parentElement.insertBefore(b, card); }
              if (n < 14) requestAnimationFrame(tick); else { document.querySelectorAll(".cost-ins").forEach((x) => x.remove()); ok(); } }; requestAnimationFrame(tick); }), [where, R]);
          const m1 = await met(); const buf = await br.stopTracing(); rounds.push({ lay: m1.LayoutCount - m0.LayoutCount, trace: JSON.parse(buf.toString()) }); await P.page.waitForTimeout(400);
        }
        await P.page.mouse.up(); return { rounds }; } finally { await P.close(); } }, 120000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const out = [];
    for (const [ri, rd] of r.rounds.entries()) {
      const ev = rd.trace.traceEvents ?? rd.trace; const main = new Set(ev.filter((e) => e.name === "thread_name" && e.args?.name === "CrRendererMain").map((e) => `${e.pid}:${e.tid}`));
      const on = ev.filter((e) => main.has(`${e.pid}:${e.tid}`)); const fire = on.filter((e) => e.name === "FireAnimationFrame" && e.ph === "X").sort((p, q) => p.ts - q.ts);
      const st = []; for (const e of fire) if (!st.length || e.ts - st.at(-1).last > 3000) st.push({ ts: e.ts, last: e.ts + (e.dur ?? 0) }); else st.at(-1).last = Math.max(st.at(-1).last, e.ts + (e.dur ?? 0));
      const ins = on.find((e) => e.name === "insert" || e.args?.data?.name === "insert" || (e.cat ?? "").includes("blink.user_timing") && e.name === "insert"); const fOf = (ts) => { let k = -1; for (let i = 0; i < st.length; i++) if (st[i].ts <= ts) k = i; else break; return k; };
      const by = new Map(), pf = new Map(); let nl = 0;
      for (const e of on) { if (!(e.name === "Layout" && (e.ph === "X" || e.ph === "B"))) continue; nl++; const w = who(e.args?.beginData?.stackTrace); by.set(w, (by.get(w) ?? 0) + 1); if (w.startsWith("(")) continue; const fr = fOf(e.ts); const mm = pf.get(fr) ?? new Map(); mm.set(w, (mm.get(w) ?? 0) + 1); pf.set(fr, mm); }
      out.push({ lay: rd.lay, nl, by: Object.fromEntries(by), pf: Object.fromEntries([...pf].map(([k, v]) => [k, Object.fromEntries(v)])) });
      const forced = [...by].filter(([k]) => !k.startsWith("(")).reduce((s, [, v]) => s + v, 0);
      cell(`${name} · round ${ri + 1}`, "REPORT", `CDP LayoutCount ${rd.lay} · trace Layout ${nl}: stage-forced ${forced}, lifecycle ${by.get("(lifecycle)") ?? 0}, harness ${by.get("(harness script)") ?? 0} · rAF rounds ${st.length}${ins ? "" : ""}`);
      for (const [k, v] of [...by].sort((p, q) => q[1] - p[1])) console.log(`    layouts ${String(v).padStart(4)}  ${k}`);
      for (const [fr, mm] of [...pf].sort((p, q) => p[0] - q[0])) console.log(`      rAF round ${String(fr).padStart(3)}: ${[...mm].map(([k, v]) => `${v}× ${k}`).join(" · ")}`);
    }
    dump[where] = out;
  }
  if (typeof a.out === "string") { fs.mkdirSync(a.out, { recursive: true }); fs.writeFileSync(`${a.out}/cost-attr14-${Date.now()}.json`, JSON.stringify(dump, null, 1)); }
}, 1200);
