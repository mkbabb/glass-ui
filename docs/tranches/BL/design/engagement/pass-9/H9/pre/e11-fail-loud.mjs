#!/usr/bin/env node
// E-11 · CK-21: no silent degradation (E-2, the engineering law's no masking fallback; pass 2, REGISTRY §P1-6 CK-21).
// Every token, clock or registered input the engagement code reads at runtime fails loud (a console.error) when it is
// unreadable. Per scene gated "E-11", per plant in its row's `failLoud` list ({ token, value, act, on? }): the act is
// run on fresh pages, twice clean and once with the token set (and, to confirm a degradation, once more each; below),
// with the token set to the plant's value on the scene's root (`on`,
// default [data-e~=root], else the target), and the engagement read both times:
//   kbd     Tab in from the sentinel, +450 ms: the root's scale, the veil, [data-engaged] count
//   fling   E-4's drive (three 40 px moves, released at once), the body's position read for 1200 ms: its furthest point
//   commit  __e.commit(), filmed 800 ms: the face's scale peak and light rise
// fail-loud <token>  PASS when the planted run raised ≥ 1 console.error (or a page error); FAIL when the planted read
//                    differs from the clean read (a degradation) with no error: the silent answer, including a
//                    registered property's initial value; UNMEASURED when nothing degraded and nothing was raised (the
//                    code does not read the token on this path: not a pass)
// The named plants (REGISTRY §P1-6 CK-21): C-E/plant-fallback.mjs's three (--space-section and --scale-engage on the
// slider, kbd; --spring-dock-settle, fling) and C-B's unreadable crest (--scale-commit-pop: 1 on the switch, commit).
// H6 (pass 6; REGISTRY §P5-7 item 4, C-E5 §0.2): THE CLOCK CENSUS. The plants above are named by hand, and a loud read
// that followed a rename (P-A5's COMMIT_CLOCKS) left the control bit's clocks silent while every named plant still failed
// loud. So E-11 also enumerates, from the stylesheets the page LOADED (the CSSOM, nested rules resolved), every
// --engage-* custom property a transition or animation declaration reads (directly, or through custom properties that
// reference it), with the rules that read it; no list is kept here. Per scene in the index, a clean page runs the act
// (rest, Tab in from the sentinel, the commit, a pointer press on the target, a present/dismiss where the scene has
// one) and reads, for every element (and pseudo-element) a consumer rule matches, its computed transition and animation
// timing in each phase of the act. Then, per clock, on up to three scenes chosen to cover the most consumer rules (commit
// members first on a tie), the same act on a page whose <html> carries `<clock>: nonsense` from before its first script:
//   clock <token> (enumerated)  PASS when the planted page raised ≥ 1 console.error naming the clock (and the clean page
//                    none); FAIL when it raised none while the clock degrades: a consumer's computed timing changed in
//                    the same phase of the act (observed), or a rendered consumer of a rule timing on the clock reads it
//                    unreadable (reached: that rule's transition is invalid whenever its state comes, a :hover or a press
//                    the act did not enter); UNMEASURED when planting reached no consumer and raised nothing, or no scene
//                    renders a consumer. `clock census` REPORTs the clocks and their rules. Plant `e11-rename` (the
//                    fixture's loud read keeps a list a rename left behind)
//   node e11-fail-loud.mjs --build <dir> | --fixture [--fault e11-silent] [--engine webkit]
import { witness, openPage, scenesFor, center, tabKey, f } from "./lib.mjs";

const EPS_S = 0.003, EPS_PX = 1, EPS_L = 0.005;
// ── H6: the clock census, in page ─────────────────────────────────────────────────────────────────────────────
// every style rule of every loaded sheet, nested rules resolved against their parent (`&` replaced by :is(parent), a
// relative nested selector prefixed by it), with its declarations (the shorthands that hold a var() are read from the
// rule's cssText); the --engage-* tokens each timing declaration reads, through custom properties transitively
const censusFn = () => {
  const splitTop = (s) => { const out = []; let d = 0, cur = ""; for (const ch of s) { if (ch === "(") d++; else if (ch === ")") d--; if (ch === "," && !d) { out.push(cur.trim()); cur = ""; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; };
  const nest = (own, parent) => (parent == null ? own : splitTop(own).map((s) => (s.includes("&") ? s.replaceAll("&", `:is(${parent})`) : `:is(${parent}) ${s}`)).join(", "));
  const declsOf = (st) => { const d = []; for (let i = 0; i < st.length; i++) d.push([st[i], st.getPropertyValue(st[i])]); for (const m of st.cssText.matchAll(/(?:^|;)\s*([\w-]+)\s*:\s*([^;]*)/g)) d.push([m[1], m[2]]); return d; };
  const rules = [];
  const walk = (list, parent) => {
    for (const r of list) {
      if (r.styleSheet) { try { walk(r.styleSheet.cssRules, parent); } catch {} continue; }
      if (r instanceof CSSStyleRule) { const sel = nest(r.selectorText, parent); rules.push({ sel, decls: declsOf(r.style) }); if (r.cssRules?.length) walk(r.cssRules, sel); }
      else if (r.constructor?.name === "CSSNestedDeclarations" && parent != null) rules.push({ sel: parent, decls: declsOf(r.style) });
      else if (r.cssRules) walk(r.cssRules, parent);
    }
  };
  for (const s of document.styleSheets) { try { walk(s.cssRules, null); } catch {} }
  const TIMING = /^(transition|animation)(-duration|-delay)?$/;
  const refs = (v) => [...String(v).matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]);
  const defs = new Map();
  for (const r of rules) for (const [p, v] of r.decls) if (p.startsWith("--")) { const s = defs.get(p) ?? new Set(); for (const x of refs(v)) s.add(x); defs.set(p, s); }
  const resolve = (name, seen = new Set()) => { if (seen.has(name)) return []; seen.add(name); const out = name.startsWith("--engage-") ? [name] : []; for (const x of defs.get(name) ?? []) out.push(...resolve(x, seen)); return out; };
  const clocks = {};
  for (const r of rules) for (const [p, v] of r.decls) {
    if (!TIMING.test(p)) continue;
    for (const t of new Set(refs(v).flatMap((x) => resolve(x)))) { const c = (clocks[t] ??= { rules: new Set(), decls: new Set() }); c.rules.add(r.sel); c.decls.add(`${p}: ${String(v).trim().slice(0, 80)}`); }
  }
  return Object.fromEntries(Object.entries(clocks).map(([t, c]) => [t, { rules: [...c.rules], decls: [...c.decls] }]));
};
// the computed timing of every element (and pseudo-element) a consumer rule matches (user-action pseudo-classes
// stripped, so a :hover rule's element is found at rest): keyed by selector, match index and pseudo-element
const consumersFn = (clocks) => {
  const PSEUDO = /::?(before|after|backdrop|placeholder|marker|selection|-webkit-[\w-]+)(?![\w-])/g;
  const out = {};
  for (const [t, c] of Object.entries(clocks)) {
    const o = {};
    for (const sel of c.rules) {
      const pseudo = (sel.match(PSEUDO) ?? [])[0]?.replace(/^:?:?/, "::") ?? null;
      const s = sel.replace(PSEUDO, "").replace(/:(hover|active|focus-visible|focus-within|focus)\b/g, "");
      let els = []; try { els = [...document.querySelectorAll(s)]; } catch { continue; }
      els.slice(0, 6).forEach((e, i) => { const cs = getComputedStyle(e, pseudo); o[`${sel.slice(0, 140)} #${i}`] = { timing: `${cs.transitionProperty} / ${cs.transitionDuration} / ${cs.transitionDelay} / ${cs.animationName} / ${cs.animationDuration}`, tok: getComputedStyle(e).getPropertyValue(t).trim() }; });
    }
    out[t] = o;
  }
  return out;
};
await witness("E-11", "CK-21 no silent degradation", async ({ E, T, cell, guard, idx, engine }) => {
  for (const [sc, m] of scenesFor(idx, "E-11")) {
    for (const pl of m.failLoud ?? []) {
      const nm = `E-11 ${sc} fail-loud ${pl.token}${pl.value === "nonsense" ? "" : `=${pl.value}`} (${pl.act})`;
      const run = (plant) => guard(`${nm}${plant ? " plant" : ""}`, async () => {
        // H8 (C-A7's crestinput): an `html` plant is set on <html> before the first script (openPage `plant`), so a
        // mount-time read meets it; otherwise on the row's element after the page is ready
        const P = await openPage(E, T, sc, plant && pl.html ? { plant: [pl.token, pl.value] } : {});
        try {
          await P.page.waitForTimeout(150); const e0 = plant && pl.html ? 0 : P.errors.length;
          if (plant && !pl.html) await P.page.evaluate(([on, tok, v]) => { const el = document.querySelector(on ?? '[data-e~="root"]') ?? document.querySelector('[data-e~="target"]'); el?.style.setProperty(tok, v); }, [pl.on ?? null, pl.token, pl.value]);
          let read;
          if (pl.act === "kbd") {
            await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450);
            read = await P.page.evaluate(() => { const r = document.querySelector('[data-e~="root"]') ?? document.querySelector('[data-e~="target"]'); const v = [...document.querySelectorAll("[data-engaged], .glass-focus-veil, .fx-veil")].filter((e) => !r.contains(e)); return { s: window.__eff(r).s, veil: Math.max(0, ...v.map((e) => +getComputedStyle(e).opacity)), n: document.querySelectorAll("[data-engaged]").length }; });
          } else if (pl.act === "fling") {
            const c = await center(P.page, '[data-e~="thumb"]');
            const pr = P.page.evaluate(() => new Promise((ok) => { let mx = -1e9; const t0 = performance.now(); const tick = () => { const b = document.querySelector('[data-e~="body"]') ?? document.querySelector('[data-e~="thumb"]'); const r = b.getBoundingClientRect(); mx = Math.max(mx, r.right); if (performance.now() - t0 < 1700) requestAnimationFrame(tick); else ok({ x: mx }); }; requestAnimationFrame(tick); }));
            await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
            for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + 40 * k, c.y); await P.page.waitForTimeout(16); }
            await P.page.mouse.up(); read = await pr;
          } else {
            // H8: the painted face where the row names one; a stateless control is committed by its activation (E-2's
            // element.click()), never by __e.commit (C-A7b: a stateless control driven by __e.commit read ×1.0000 "intact")
            const fl = await P.page.evaluate(async (o) => { o.face = document.querySelector('[data-e~="face"]') ? '[data-e~="face"]' : o.target; const p = window.__film(o); if (o.stateless) document.querySelector(o.target).click(); else window.__e.commit(); return p; }, { target: '[data-e~="target"]', ms: 800, stateless: !!m.stateless });
            const s = fl.fr.filter((x) => x.f).map((x) => x.f.s); const L = fl.fr.map((x) => x.L).filter(Number.isFinite);
            read = { peak: Math.max(...s) - s.at(-1), rise: L.length ? Math.max(...L) - L.at(-1) : 0 };
          }
          return { read, errors: P.errors.slice(e0) };
        } finally { await P.close(); }
      }, 60000);
      // A degradation is read against the clean runs' envelope, not one clean read, and must reproduce. The clean act
      // runs twice and the planted act once; a metric degrades when the planted read lies outside the clean reads'
      // [min, max] by more than its epsilon. When the first planted read degrades with no error, a third clean run and
      // a second planted run are taken, and the cell FAILs only if both planted reads lie outside the three clean
      // reads' envelope on the same side of the same metric. Run-to-run noise is not a degradation: at HEAD, where the
      // slider carries no fling (E-4: 0.1 px), its fling end point moved 1.28 px between two clean runs at load 125
      // (pass-2/H2.md §2.1 item 2) and a single planted read fell outside a two-run spread in 2 of 3 runs at load 41-62,
      // once on each side (§2.3)
      const M = pl.act === "kbd" ? [["s", EPS_S], ["veil", 0.05], ["n", 0]] : pl.act === "fling" ? [["x", EPS_PX]] : [["peak", EPS_S], ["rise", EPS_L]];
      const side = (cleans, y, k, eps) => { const v = cleans.map((c) => c.read[k]); return y.read[k] < Math.min(...v) - eps ? -1 : y.read[k] > Math.max(...v) + eps ? 1 : 0; };
      const a = await run(false), a2 = await run(false), b = await run(true);
      if (a.crashed || a2.crashed || b.crashed) { cell(nm, "FAIL", a.line ?? a2.line ?? b.line); continue; }
      const cleans = [a, a2], planted = [b];
      let loud = b.errors.length > 0;
      let degraded = !loud && M.some(([k, eps]) => side(cleans, b, k, eps) !== 0);
      if (degraded) {
        const a3 = await run(false), b2 = await run(true);
        if (a3.crashed || b2.crashed) { cell(nm, "FAIL", a3.line ?? b2.line); continue; }
        cleans.push(a3); planted.push(b2); loud = b2.errors.length > 0;
        degraded = !loud && M.some(([k, eps]) => { const s1 = side(cleans, b, k, eps); return s1 !== 0 && s1 === side(cleans, b2, k, eps); });
      }
      const errs = planted.flatMap((p) => p.errors);
      // H8 (REGISTRY §P7-7 item 11): a commit act whose clean runs moved nothing drove nothing; its planted read cannot pass
      const still = pl.act === "commit" && cleans.every((c) => !(c.read.peak > EPS_S) && !(c.read.rise > EPS_L));
      const line = `${pl.token}: ${JSON.stringify(pl.value)} on the root · clean ${cleans.map((c) => JSON.stringify(c.read)).join(" ")} · planted ${planted.map((p) => JSON.stringify(p.read)).join(" ")} (a metric degrades outside the clean envelope plus its epsilon, reproduced when first seen) · console errors on the planted run(s) ${errs.length}${errs.length ? `: ${errs[0].slice(0, 120)}` : ""}`;
      cell(nm, still ? "UNMEASURED" : loud ? "PASS" : degraded ? "FAIL" : "UNMEASURED", `${still ? "NOT DRIVEN: the clean commit moved neither the face's scale nor its light · " : ""}${loud ? "fails loud" : degraded ? "SILENT DEGRADATION" : "no degradation, no error: the token is not read on this path"} · ${line.replace(" on the root · ", pl.html ? " on <html> before the first script · " : " on the root · ")}`);
    }
  }

  // ── H6: the clock census (CK-21; REGISTRY §P5-7 item 4) ─────────────────────────────────────────────────────
  // the act every census page runs: rest, Tab in from the sentinel, the commit (a stateless scene's click), a pointer
  // press on the target, a dismiss and a present where the scene has one; the consumers read at rest, after the Tab
  // (a veil exists only while engaged), hovered, pressed and at the end, each phase compared with its own
  const runAct = async (sc, m, plant) => {
    const P = await openPage(E, T, sc, plant ? { plant: [plant, "nonsense"] } : {});
    try {
      const { page } = P; const reads = {};
      // a read per phase of the act (a state rule's clock is read in its state: :hover, the press, the engagement)
      const take = async (clocks, phase) => { const r = await page.evaluate(consumersFn, clocks); for (const [t, o] of Object.entries(r)) for (const [k, v] of Object.entries(o)) (reads[t] ??= {})[`${phase} | ${k}`] = v; };
      await page.waitForTimeout(300);
      const clocks = await page.evaluate(censusFn);
      await take(clocks, "rest");
      await page.focus('[data-sentinel="before"]').catch(() => {}); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(350);
      await take(clocks, "tab");
      await page.evaluate(() => { const x = window.__e; const tgt = document.querySelector('[data-e~="target"]'); if (x.index?.[x.scene]?.stateless) tgt?.click(); else x.commit?.(); }).catch(() => {});
      await page.waitForTimeout(300);
      try {
        const c = await center(page, '[data-e~="target"]');
        if (c.x > 0 && c.y > 0 && c.x < 700 && c.y < 500) {
          await page.mouse.move(c.x, c.y); await page.waitForTimeout(250); await take(clocks, "hover");
          await page.mouse.down(); await page.waitForTimeout(150); await take(clocks, "press");
          await page.mouse.up(); await page.waitForTimeout(300);
        }
      } catch {}
      if (await page.evaluate(() => typeof window.__e.open === "function")) { await page.evaluate(() => window.__e.open(false)); await page.waitForTimeout(300); await page.evaluate(() => window.__e.open(true)); await page.waitForTimeout(300); }
      await take(clocks, "end");
      return { clocks, reads, errors: [...P.errors] };
    } finally { await P.close(); }
  };
  const scenes = Object.entries(idx).filter(([s]) => s !== "__index");
  const survey = {}; let clocks = {};
  for (const [sc, m] of scenes) {
    const r = await guard(`clock census survey ${sc}`, () => runAct(sc, m, null), 60000);
    if (r.crashed) { cell(`E-11 clock census survey ${sc}`, "FAIL", r.line); continue; }
    survey[sc] = r;
    for (const [t, c] of Object.entries(r.clocks)) { const x = (clocks[t] ??= { rules: new Set(), decls: new Set() }); c.rules.forEach((y) => x.rules.add(y)); c.decls.forEach((y) => x.decls.add(y)); }
  }
  const names = Object.keys(clocks).sort();
  cell("E-11 clock census", "REPORT", `${names.length} --engage-* clock(s) read by a transition or animation declaration in the loaded stylesheets: ${names.map((t) => `${t} (${clocks[t].rules.size} rule(s), e.g. ${[...clocks[t].decls][0]})`).join(" · ").slice(0, 1400)}`);
  if (!names.length) cell("E-11 clock census", "UNMEASURED", "the loaded stylesheets time no transition or animation on an --engage-* clock: nothing to plant");
  const commitFirst = (a, b) => Number((idx[b]?.gates ?? []).includes("E-2")) - Number((idx[a]?.gates ?? []).includes("E-2"));
  for (const t of names) {
    const nm = `E-11 clock ${t} (enumerated)`;
    // the homes: up to three scenes, chosen greedily to cover the most consumer rules (commit members first on a tie)
    const rulesIn = (sc) => new Set(Object.keys(survey[sc].reads[t] ?? {}).map((k) => k.split(" | ")[1].replace(/ #\d+$/, "")));
    const homes = []; const covered = new Set();
    for (const cand = Object.keys(survey).filter((sc) => rulesIn(sc).size).sort(commitFirst); homes.length < 3;) {
      let best = null, gain = 0; for (const sc of cand) { if (homes.includes(sc)) continue; const g = [...rulesIn(sc)].filter((x) => !covered.has(x)).length; if (g > gain) { gain = g; best = sc; } }
      if (!best) break; homes.push(best); rulesIn(best).forEach((x) => covered.add(x));
    }
    if (!homes.length) { cell(nm, "UNMEASURED", `no scene renders an element a rule timing on ${t} matches (${clocks[t].rules.size} rule(s): ${[...clocks[t].rules].slice(0, 3).join(" | ").slice(0, 300)}): no consumer to plant on`); continue; }
    const res = [];
    for (const sc of homes) {
      const r = await guard(`clock ${t} ${sc}`, () => runAct(sc, idx[sc], t), 60000);
      if (r.crashed) { res.push({ sc, crashed: r.line }); continue; }
      const clean = survey[sc].reads[t] ?? {}, planted = r.reads[t] ?? {};
      // observed: a consumer's computed timing changed in the same phase of the act; reached: a consumer of a rule timing
      // on the clock reads it unreadable, so that rule's transition is invalid whenever its state comes (a :hover or a
      // press rule the act did not enter)
      const changed = Object.keys(clean).filter((k) => k in planted && planted[k].timing !== clean[k].timing);
      const reached = Object.keys(planted).filter((k) => planted[k].tok === "nonsense");
      res.push({ sc, named: r.errors.filter((e) => e.includes(t)), all: r.errors.length, cleanNamed: survey[sc].errors.filter((e) => e.includes(t)).length, changed, reached, n: Object.keys(clean).length, ex: changed[0] ? `${changed[0].slice(0, 90)}: ${clean[changed[0]].timing} → ${planted[changed[0]].timing}` : "" });
    }
    if (res.some((x) => x.crashed)) { cell(nm, "FAIL", res.find((x) => x.crashed).crashed); continue; }
    const loud = res.some((x) => x.named.length), noisy = res.some((x) => x.cleanNamed), observed = res.some((x) => x.changed.length), degraded = observed || res.some((x) => x.reached.length);
    const line = res.map((x) => `${x.sc}: ${x.n} consumer read(s), ${x.reached.length} reading the clock unreadable, ${x.changed.length} with its timing changed in the act${x.ex ? ` (${x.ex})` : ""}, console errors naming the clock ${x.named.length} of ${x.all}${x.named[0] ? ` ("${x.named[0].slice(0, 110)}")` : ""}, on the clean page ${x.cleanNamed}`).join(" · ");
    if (noisy) cell(nm, "FAIL", `the clean page already raises an error naming ${t}: loud cannot be told from always-loud · ${line}`);
    else cell(nm, loud ? "PASS" : degraded ? "FAIL" : "UNMEASURED", `${t}: nonsense on <html> before the first script · ${loud ? "fails loud" : degraded ? `SILENT DEGRADATION: ${observed ? "a consumer's timing changed in the act" : "a rendered consumer of a rule timing on the clock reads it unreadable (its transition is invalid whenever that rule's state comes)"} with no error naming the clock` : "planting reached no consumer and raised nothing"} · ${line}`.slice(0, 1200));
  }
});
