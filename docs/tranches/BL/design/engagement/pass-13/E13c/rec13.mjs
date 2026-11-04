#!/usr/bin/env node
// P-E13-complete (D5 pass 13, wave c2): the per-record cost REGISTRY §P13-7 item 10 and §P13-2 (CK-23) name, read on a built candidate.
// Not a witness of record: every cell is REPORT. The harness's own scene app and lib (witness(), openPage(), the E-13 `slider` scene):
// one browser per run, a fresh context per cell, every page and context closed in a finally, the browser closed by witness().
//   rec · attr|text       in-page, both engines: K=200 attribute (or text) records on an element outside the held control, made in one task;
//                         the time from the task's start to a MessageChannel task posted at its end (the observer's callbacks run in the
//                         microtask checkpoint between), 15 rounds at rest and 15 held still; per record = (held − rest) / K
//   arm                   in-page, both engines: every `style` attribute record in the document from the press to +400 ms, by target, with
//                         the records whose old value carried `--engage-read-` (one per token read the stage made); then, after the release
//                         and 800 ms, each element that had no `style` attribute before the press and now carries one (the residue)
//   cdp · writer          Chromium only, CDP Performance metrics over a 3 s still hold, without and with a page loop writing 10 attribute
//                         records per frame on that outside element (C-E11's `cost` window, unchanged in method)
//   usage: node rec13.mjs --build <dir> --label <l> --engine chromium|webkit --out <dir>
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, scenesFor, center, f } = await import(`${H}/lib.mjs`);
const med = (xs) => { const s = [...xs].sort((p, q) => p - q); return s.length ? s[s.length >> 1] : NaN; };
await witness("E13c rec", "the per-record cost of the stage's observer and the token read's write (REGISTRY §P13-7 item 10), REPORT only", async ({ a, E, T, cell, guard, idx, engine }) => {
  const [sc, m] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && !x.clip);
  const TH = m.thumb ?? '[role="slider"]'; const label = typeof a.label === "string" ? a.label : "c";
  const K = 200, R = 15;
  const addX = (page) => page.evaluate(() => { const d = document.createElement("div"); d.id = "rec-x"; d.textContent = "0"; d.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden"; document.body.appendChild(d); });
  const press = async (P) => { const c = await center(P.page, TH); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); };
  const batch = (page, kind) => page.evaluate(([kind, K, R]) => new Promise((ok) => {
    const d = document.getElementById("rec-x"); const tn = d.firstChild; const out = []; const ch = new MessageChannel(); let r = 0, t0 = 0;
    const one = () => { t0 = performance.now(); for (let i = 0; i < K; i++) { if (kind === "attr") d.setAttribute("data-x", String(i)); else tn.data = String(i); } ch.port2.postMessage(0); };
    ch.port1.onmessage = () => { out.push(performance.now() - t0); if (++r < R) setTimeout(one, 25); else ok(out); };
    setTimeout(one, 25);
  }), [kind, K, R]);
  for (const kind of ["attr", "text"]) {
    const name = `rec · ${kind}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await addX(P.page); await P.page.waitForTimeout(300);
        const rest = await batch(P.page, kind);
        await press(P); await P.page.waitForTimeout(600);
        try { const held = await batch(P.page, kind); const eng = await P.page.evaluate(() => !!document.querySelector("[data-engaged]")); return { rest, held, eng }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const mr = med(r.rest), mh = med(r.held), nr = Math.min(...r.rest), nh = Math.min(...r.held);
    cell(name, "REPORT", `${label} · ${K} ${kind} records in one task, ${R} rounds · rest median ${f(mr, 3)} ms (min ${f(nr, 3)}) · held median ${f(mh, 3)} ms (min ${f(nh, 3)}) · per record held − rest: median ${f(((mh - mr) * 1000) / K, 2)} µs, min ${f(((nh - nr) * 1000) / K, 2)} µs · engaged during the held batch ${r.eng}${r.note ? ` · ${r.note}` : ""}`);
  }
  {
    const name = "arm";
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await P.page.waitForTimeout(300);
        await P.page.evaluate(() => {
          const id = (el) => `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${el.classList.length ? `.${[...el.classList].slice(0, 2).join(".")}` : ""}`;
          const before = new Set([...document.querySelectorAll("*")].filter((e) => !e.hasAttribute("style")));
          const recs = []; let t0 = 0;
          const mo = new MutationObserver((rs) => { for (const x of rs) recs.push({ t: performance.now() - t0, tgt: id(x.target), old: x.oldValue ?? null }); });
          mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style"], attributeOldValue: true, subtree: true });
          window.__rec = { recs, before, id, mo, mark: () => { t0 = performance.now(); } };
          window.addEventListener("pointerdown", () => window.__rec.mark(), { capture: true, once: true });
        });
        await press(P); await P.page.waitForTimeout(400);
        const held = await P.page.evaluate(() => { const R = window.__rec; const w = R.recs.filter((x) => x.t >= 0 && x.t <= 400); const by = {}; for (const x of w) by[x.tgt] = (by[x.tgt] ?? 0) + 1; const reads = w.filter((x) => (x.old ?? "").includes("--engage-read-")); const rby = {}; for (const x of reads) rby[x.tgt] = (rby[x.tgt] ?? 0) + 1; const first = w.filter((x) => x.t <= 34).length; return { n: w.length, first, by, reads: reads.length, rby, readT: reads.map((x) => +x.t.toFixed(1)).slice(0, 30) }; });
        await P.page.mouse.up(); await P.page.waitForTimeout(800);
        const res = await P.page.evaluate(() => { const R = window.__rec; R.mo.disconnect(); const out = []; for (const e of R.before) if (e.isConnected && e.hasAttribute("style")) out.push(`${R.id(e)}="${e.getAttribute("style").slice(0, 60)}"`); return out; });
        return { held, res };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) cell(name, "REPORT", r.line);
    else cell(name, "REPORT", `${label} · press to +400 ms: ${r.held.n} style records (${r.held.first} in the first 34 ms) by target ${JSON.stringify(r.held.by)} · token reads (a removal whose old value carried --engage-read-): ${r.held.reads} ${JSON.stringify(r.held.rby)} at ms [${r.held.readT.join(" ")}] · after the release + 800 ms, elements with no style attribute before the press that carry one now: ${r.res.length} ${r.res.slice(0, 6).join(" ")}`);
  }
  if (engine === "chromium") {
    const name = "cdp · writer";
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await addX(P.page); await P.page.waitForTimeout(400);
        const cdp = await P.ctx.newCDPSession(P.page); await cdp.send("Performance.enable");
        const M = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
        const win = async (ms, writer) => { const b0 = await M(); const fr = await P.page.evaluate(([ms, writer]) => new Promise((ok) => { const d = document.getElementById("rec-x"); let n = 0, k = 0; const t0 = performance.now(); const tick = () => { n++; if (writer) for (let i = 0; i < 10; i++) d.setAttribute("data-x", String(k++)); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok({ n, ms: performance.now() - t0 }); }; requestAnimationFrame(tick); }), [ms, writer]); const b1 = await M(); return { fr, d: Object.fromEntries(["ScriptDuration", "TaskDuration", "LayoutCount", "RecalcStyleCount"].map((k) => [k, b1[k] - b0[k]])) }; };
        const restW = await win(3000, true);
        await press(P); await P.page.waitForTimeout(600);
        try { const held = await win(3000, false); const heldW = await win(3000, true); return { restW, held, heldW }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); return; }
    const pf = (w, k) => (w.d[k] * 1000) / w.fr.n; const ps = (w, k) => w.d[k] / (w.fr.ms / 1000);
    const L = (w) => `${w.fr.n} frames, script ${f(pf(w, "ScriptDuration"), 3)} ms/frame, task ${f(pf(w, "TaskDuration"), 3)} ms/frame, layouts ${f(ps(w, "LayoutCount"), 1)}/s, recalcs ${f(ps(w, "RecalcStyleCount"), 1)}/s`;
    cell(name, "REPORT", `${label} · rest with the writer (10 attribute records a frame): ${L(r.restW)} · held still: ${L(r.held)} · held still with the writer: ${L(r.heldW)} · the writer's held − rest script ${f(pf(r.heldW, "ScriptDuration") - pf(r.restW, "ScriptDuration"), 3)} ms/frame`);
  }
});
