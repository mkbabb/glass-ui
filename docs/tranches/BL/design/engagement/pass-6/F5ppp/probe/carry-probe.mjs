#!/usr/bin/env node
// F-13's probe (D5 pass 6, F5‴; REGISTRY §P5-8.2): the slider carry's Chromium bimodality, its cause. Not a witness and
// not a CK row: E-4 `slider fling carries velocity` is the row's cell; this probe opens the mechanism under it.
// The drive is E-4's own (e4-momentum.mjs `release`): press on the thumb, 120 ms, three 40 px moves 16 ms apart, then
// the release at once (fling) or after 1000 ms still (still), on fresh pages, 700×500, light. The body is the range's
// leading edge in the page frame, filmed every frame from the press to 2000 ms past the release. Per read it prints:
//   carry      E-4's differential: fling carry minus still carry (bound ≥ 4 px)
//   v          the release velocity the release rule measures, replicated from the pointer events the page saw
//              (window capture listener, the same events `useDragVelocity` samples): the chord across the samples no
//              older than RELEASE_RULE.windowMs (100 ms) against the release, the release a sample; saturated as the
//              door does (900·tanh(v/900))
//   amp        the carry's own peak in px: the largest scale in the carry animation the door started on the range
//              (Element.prototype.animate, wrapped: F5″'s `transform: scaleX()` with composite "add", F5‴'s `scale`),
//              times the range's length
//   smear      the held fill's scaleX at the release (computed transform, read in the pointerup capture phase, before
//              the door's listener) and the inline `--atom-drag-v` on the root
//   retract    the held scaleX minus 1, times the range's length: how far the leading edge must come home when the
//              held transform is released on its own CSS transition
//   moves      the pointermove events delivered before the release, and the gap between the last move and the release
// Arms: `default` (the build as it is); `smear0` (control: `.slider-range { --atom-drag-v: 0 !important }` injected,
// so the held fill keeps no velocity smear; the carry is otherwise untouched); `carry0` (control: the door's add
// animation removed the moment it starts, so only the smear's retraction moves the edge); `preframe` (control: one
// painted frame between E-4's release stamp and the pointerup, so the reference frame is always the held frame).
//   node carry-probe.mjs --build <dir> --engine chromium|webkit --reads 10 --arms default,smear0,carry0 --out <dir>
import { witness, openPage, center, f, TRAVEL } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";

const WINDOW = 2000, REST = 200;
const SMEAR0 = ".slider-range { --atom-drag-v: 0 !important; }";

async function release(E, T, still, arm) {
  const P = await openPage(E, T, "slider", { vp: { width: 700, height: 500 } });
  try {
    await P.page.evaluate(([arm, css]) => {
      if (arm === "smear0") { const s = document.createElement("style"); s.textContent = css; document.head.append(s); }
      window.__ev = []; window.__anim = []; window.__atUp = null;
      for (const t of ["pointerdown", "pointermove", "pointerup"]) window.addEventListener(t, (e) => {
        window.__ev.push({ t, ts: e.timeStamp, x: e.clientX, co: e.getCoalescedEvents ? e.getCoalescedEvents().length : -1, now: performance.now() });
        if (t === "pointerup") { const r = document.querySelector(".slider-range"); const root = document.querySelector(".glass-slider"); const cs = getComputedStyle(r); const rc = root ? getComputedStyle(root) : null; window.__atUp = { tf: cs.transform, w: r.getBoundingClientRect().width, ow: r.offsetWidth, dv: root?.style.getPropertyValue("--atom-drag-v") ?? "", held: root?.hasAttribute("data-held"), rootScale: rc ? `${rc.scale}|${rc.transform}` : "", rootW: root?.getBoundingClientRect().width, rootOw: root?.offsetWidth, anims: document.getAnimations().map((x) => `${x.constructor.name}:${x.transitionProperty ?? x.animationName ?? "waapi"}@${x.effect?.target?.className?.toString().slice(0, 24) ?? ""}`).join(",") }; }
      }, true);
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (kf, o) {
        const a = animate.call(this, kf, o);
        // the door's carry on the range: F5″ animates `transform: scaleX()` with composite "add", F5‴ the `scale` channel
        const isCarry = this.classList?.contains("slider-range") && Array.isArray(kf) && kf.some((k) => /^scale[XY]\(/.test(String(k.transform ?? "")) || k.scale !== undefined);
        if (isCarry) {
          const sc = kf.map((k) => (k.scale !== undefined ? Math.max(...String(k.scale).split(" ").map(Number)) : Number.parseFloat(String(k.transform ?? "").replace(/^scale[XY]\(/, ""))));
          window.__anim.push({ at: performance.now(), max: Math.max(...sc), min: Math.min(...sc), dur: o.duration });
          if (arm === "carry0") a.cancel();
        }
        return a;
      };
      window.__e4 = () => { const el = document.querySelector(".slider-range"); if (!el) return null; const r = el.getBoundingClientRect(); const root = document.querySelector(".glass-slider")?.getBoundingClientRect(); return { x: r.right, rr: root ? root.right : 0, rw: root ? root.width : 0, T: performance.now() }; };
      window.__film = (ms) => new Promise((ok) => { const fr = []; const t0 = performance.now(); const tick = () => { const t = performance.now() - t0; const r = window.__e4(); if (r) fr.push({ t, ...r }); if (t < ms) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); });
    }, [arm, SMEAR0]);
    const c = await center(P.page, '[role="slider"]');
    const pr = P.page.evaluate((ms) => window.__film(ms), 120 + 48 + (still ? 1000 : 0) + WINDOW + 400);
    await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
    for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + 40 * k, c.y); await P.page.waitForTimeout(16); }
    if (still) await P.page.waitForTimeout(1000);
    const tRel = await P.page.evaluate(() => performance.now());
    // `preframe` (control): one painted frame between E-4's release stamp and the pointerup, so E-4's reference frame
    // is the held frame on every read (the side the low reads fell on)
    if (arm === "preframe") await P.page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    await P.page.mouse.up();
    const all = await pr;
    const meta = await P.page.evaluate(() => ({ ev: window.__ev, anim: window.__anim, up: window.__atUp }));
    const rel = all.filter((x) => x.T >= tRel && x.T <= tRel + WINDOW); const xs = rel.map((x) => x.x); const x0 = xs[0];
    const tail = rel.filter((x) => x.t >= rel.at(-1).t - REST).map((x) => x.x); const rest = Math.max(...tail) - Math.min(...tail) < 0.5;
    // the release rule, replicated from the events the page saw (release.ts VelocitySampler, window 100 ms, ring 8)
    const ring = meta.ev.filter((e) => e.t !== "pointerup").slice(-7); const up = meta.ev.find((e) => e.t === "pointerup");
    let v = 0; if (up) { const s = [...ring, up]; const first = s.find((e) => up.ts - e.ts <= 100); const dt = (up.ts - first.ts) / 1000; v = dt > 0 ? (up.x - first.x) / dt : 0; }
    const vs = 900 * Math.tanh(v / 900);
    const moves = meta.ev.filter((e) => e.t === "pointermove"); const lastMove = moves.at(-1);
    const m = /matrix\(([^)]+)\)/.exec(meta.up?.tf ?? ""); const sx = m ? Number(m[1].split(",")[0]) : 1;
    const len = meta.up?.ow ?? 0;
    const a = meta.anim[0];
    const trace = rel.slice(0, 14).map((x) => `${(x.T - tRel).toFixed(0)}:${(x.x - x0).toFixed(1)}/${x.rw.toFixed(1)}`).join(" ");
    const pre = all.filter((x) => x.T < tRel).slice(-2).map((x) => `${(x.T - tRel).toFixed(0)}:${(x.x - x0).toFixed(1)}/${x.rw.toFixed(1)}`).join(" ");
    return { trace: `${pre} | ${trace}`, rootScale: meta.up?.rootScale, anims: meta.up?.anims, rootW0: meta.up?.rootW, rootOw: meta.up?.rootOw, carry: Math.max(0, ...xs.map((x) => x - x0)), end: xs.at(-1) - x0, rest, v, vs, sx, len, retract: (sx - 1) * len, dv: meta.up?.dv, amp: a ? (a.max - 1) * len : 0, animAt: a ? a.at - (up?.now ?? 0) : null, nMoves: moves.length, co: moves.map((e) => e.co).join("+"), gap: up && lastMove ? up.ts - lastMove.ts : null, moveDts: moves.map((e, i) => (i ? e.ts - moves[i - 1].ts : e.ts - meta.ev[0].ts)).map((d) => d.toFixed(1)).join("/"), n: rel.length };
  } finally { await P.close(); }
}

await witness("F-13", "the slider carry's bimodality: cause and control (probe)", async ({ a, E, T, cell, guard }) => {
  const reads = Number(a.reads ?? 10); const arms = String(a.arms ?? "default,smear0,carry0").split(",");
  for (const arm of arms) {
    const ds = [];
    for (let k = 0; k < reads; k++) {
      const r = await guard(`${arm} read ${k + 1}`, async () => ({ fl: await release(E, T, false, arm), st: await release(E, T, true, arm) }), 90000);
      if (r.crashed) { cell(`F-13 ${arm} read ${k + 1}`, "FAIL", r.line); continue; }
      const d = Math.max(r.fl.carry - r.st.carry, r.fl.end - r.st.end); ds.push(d);
      cell(`F-13 ${arm} read ${k + 1}`, "REPORT", `carry ${f(d, 2)} px (fling carry ${f(r.fl.carry, 2)}, settle ${f(r.fl.end, 2)}; still carry ${f(r.st.carry, 2)}, settle ${f(r.st.end, 2)}; at rest ${r.fl.rest && r.st.rest}) · fling: v ${f(r.fl.v, 0)} px/s → ${f(r.fl.vs, 0)} saturated · amp ${f(r.fl.amp, 2)} px (anim +${f(r.fl.animAt, 1)} ms) · held scaleX ${f(r.fl.sx, 4)} (--atom-drag-v "${r.fl.dv}") → retract ${f(r.fl.retract, 2)} px on ${f(r.fl.len, 1)} px · moves ${r.fl.nMoves} (coalesced ${r.fl.co}; dts ${r.fl.moveDts} ms) · last move → up ${f(r.fl.gap, 1)} ms · still: held scaleX ${f(r.st.sx, 4)}, v ${f(r.st.v, 0)}, amp ${f(r.st.amp, 2)} px · root at up: scale ${r.fl.rootScale} width ${f(r.fl.rootW0, 1)} (layout ${r.fl.rootOw}) · running at up: ${r.fl.anims} · fling trace (ms:edge-x0/rootW) ${r.fl.trace}${a.trace ? ` · still trace ${r.st.trace}` : ""}${r.note ? ` · ${r.note}` : ""}`);
    }
    const s = [...ds].sort((p, q) => p - q);
    cell(`F-13 ${arm} distribution`, s.length && s[0] >= TRAVEL ? "PASS" : "FAIL", `${s.length} reads, sorted: [${s.map((x) => f(x, 2)).join(", ")}] px · min ${f(s[0], 2)} median ${f(s[s.length >> 1], 2)} max ${f(s.at(-1), 2)} · under ${TRAVEL} px: ${s.filter((x) => x < TRAVEL).length}`);
  }
}, 3000);
