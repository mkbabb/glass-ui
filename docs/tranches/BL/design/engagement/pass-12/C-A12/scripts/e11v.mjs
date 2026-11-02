// C-A12: harness/e11-fail-loud.mjs (H12, sha1 1c857bed77f2) copied, with two edits only: the lib imported by absolute path,
// and the travel's value lists read from C12_EASINGS / C12_SETTLES (JSON arrays) to drive the value family past H12's enumeration. Run with --part travel.
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
// H11 (pass 11; REGISTRY §P10-7 items 2, 5; §P10-8.3 wave 1): THE TRAVEL'S TOKENS. The census above reads only --engage-* clocks a
// CSS declaration times, so a token the lens's travel reads by SCRIPT was outside it, and `--spring-dock: nonsense` threw an uncaught
// TypeError out of the stage's observer callback with no error naming it (C-A10 §0.6). On loupe rows with a `clip`:
//   travel loud · clean · side|rerender   a clean page: a fine hold, then `side` carries the track 2 px a frame 40 px past the line
//                    (a side change) or `rerender` inserts a 40 px block before the rest box inside the scroller (the host's
//                    re-render glide); release; then a LATER HOLD on the same page. PASS when no console or page error was raised,
//                    the path was driven (side: a running animation on the lens carries a declared row's clock; rerender: a running
//                    animation on the root starts within 3 frames of the insert), and the later hold engages (the row's `engaged`)
//                    with its lens shown (opacity > 0.9) and pinned (≤ 2 px). Not driven: UNMEASURED, with the planted cells
//   travel loud · <token> nonsense|initial · side|rerender   the row the travel rides is read from the clean side page (the
//                    row whose clock its running animation carries, `--spring-<row>-duration` in the CSSOM), and its two tokens,
//                    `--spring-<row>` (the easing) and `--spring-<row>-settle` (the clock), are each set on <html> before the
//                    first script to `nonsense` and to `initial`. PASS when ≥ 1 console.error names the token, no page error
//                    (uncaught) was raised, and the later hold engages, shown and pinned: loud by name, no throw, the loop alive,
//                    on both the lens's travel and the host's glide. No masking fallback is asked of the travel: an unreadable
//                    token may leave the change instant, which E-10 reads. Plant `e11-travelthrow` (the travel checks its easing
//                    for presence, not parse: `nonsense` reaches animate(), which throws); the pass-10 candidate; control the
//                    pass-10 candidate with C-A10's `loudcure` (`../pass-11/H11.md`)
//   H12 (REGISTRY §P11-7 items 1, 3, 4; §P11-8.3 wave 1), the value family on three paths:
//   travel loud · clean · side|rerender|carry   as above, plus `carry`: 8 moves of −14 px 8 ms apart, released; driven when a WAAPI
//                    animation (no CSS transition or animation) starts on the lens, the root or under it after the mark. Every clean
//                    travel is exact: its duration equals CSS's clock for its row, `calc(var(--spring-<row>-settle) *
//                    var(--motion-tempo, 1))` read on a probe, to 1 ms.
//   travel loud · --spring-<row> <v> · side|rerender|carry   v ∈ `ease, linear`, `linear(0, 1), ease-in`, `nonsense`, `initial`,
//                    `var(--undefined)`, `steps(4)`, `cubic-bezier(0, 2, 1, -1)`; and `--spring-<row>-settle` v ∈ `210ms`, `0.21s`,
//                    `-1`, `0`, `nonsense`, each on <html> before the first script. The grammar decides the expectation: a settle
//                    CSS reads as a positive <time> is TAKEN, else REFUSED; an easing `new KeyframeEffect(null, null, {easing})`
//                    takes is TAKEN with its normal form, else REFUSED; on the carry an easing is either (the carry may take its shape
//                    from its own curve). TAKEN: every travel on CSS's clock to 1 ms, the easing the parser's, no error naming the
//                    token. REFUSED: ≥ 1 console.error naming the token and no travel. Always: 0 uncaught, the later hold engaged,
//                    shown, pinned. Verdicts name the miss: THROWS, MISREAD CLOCK, NOT EXACT, NOT TAKEN, TRAVELS ON A REFUSED TOKEN,
//                    SILENT. Plants `e11-travellist` (CSS.supports on a list-valued property), `e11-travelunit` (parseFloat × 1000);
//                    `e11-travelthrow` narrowed to `nonsense`; the pass-11 candidate (red on the lists, side and rerender, and on
//                    `210ms`, all three paths); controls C-E11's `waapicure` and `unitcure` (`../pass-12/H12.md`)
//   `--part travel` runs these alone, `--part old` the rest.
//   node e11-fail-loud.mjs --build <dir> | --fixture [--fault e11-silent] [--engine webkit]
import { witness, openPage, scenesFor, center, tabKey, f, rowsOf, rodeRow, sideFilm, sideSetup } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";

const EPS_S = 0.003, EPS_PX = 1, EPS_L = 0.005;
// ── H12: the travel's value family (REGISTRY §P11-7 items 1, 3, 4; §P11-8.3 wave 1) ──
// Every form the travel row's easing token can hold, and its settle token: lists (CSS.supports on a list-valued property takes them;
// animate() does not), a nonsense string, initial and an undefined var() (a custom property computes to nothing), steps() and a
// cubic-bezier with y past [0, 1] (both valid easings); a <time> in ms and in s, a negative and a unitless number, a nonsense string
const TRAVEL_EASINGS = JSON.parse(process.env.C12_EASINGS ?? "[]");
const TRAVEL_SETTLES = JSON.parse(process.env.C12_SETTLES ?? "[]");
// the recorder: every WAAPI animation (no CSS transition or animation) on the lens, on the root, or under the root, seen once per frame
// from before the hold to the end of the page's act, with its clock, its easing and the properties it animates
const TRAVEL_REC = ([LS, RS]) => {
  const seen = new Set(), out = []; let on = true; const isCss = (a) => (typeof CSSTransition !== "undefined" && a instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && a instanceof CSSAnimation);
  const poll = () => { if (!on) return; const lens = document.querySelector(LS), root = document.querySelector(RS);
    for (const a of document.getAnimations()) { if (seen.has(a) || isCss(a)) continue; const t = a.effect?.target; if (!t) continue;
      const where = t === lens ? "lens" : t === root ? "root" : root?.contains(t) ? "under" : null; if (!where) continue; seen.add(a);
      const tm = a.effect.getTiming(); const kf = a.effect.getKeyframes(); out.push({ where, ms: tm.duration, easing: tm.easing, props: Object.keys(kf[0] ?? {}).filter((k) => !["offset", "easing", "composite", "computedOffset"].includes(k)).join(","), at: performance.now() }); }
    requestAnimationFrame(poll); };
  requestAnimationFrame(poll); window.__h12rec = { stop: () => { on = false; return out; } };
};
// the consumers' own grammars, on the page as planted: CSS's reading of every row's settle as a <time>, in the row duration token's
// own form (calc(settle × tempo)); and whether animate() takes the planted easing (a KeyframeEffect built in a try), with its normal form
const TRAVEL_FACTS = ([names, tok]) => {
  const p = document.createElement("div"); document.body.appendChild(p); const css = {};
  for (const n of names) { const t = `--spring-${n}-settle`; p.style.cssText = ""; p.style.setProperty("transition-duration", `calc(var(${t}) * var(--motion-tempo, 1))`, "important"); const d = getComputedStyle(p).transitionDuration; const v = Number.parseFloat(d); css[t] = /ms/.test(d) ? v : v * 1000; }
  p.remove();
  let takes = null, norm = null, why = null;
  if (tok && !/-settle$/.test(tok)) { const v = getComputedStyle(document.documentElement).getPropertyValue(tok).trim(); if (!v) { takes = false; why = "the token computes to nothing"; } else { try { norm = new KeyframeEffect(null, null, { easing: v }).getTiming().easing; takes = true; } catch (e) { takes = false; why = String(e?.message ?? e); } } }
  return { css, takes, norm, why };
};
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
await witness("E-11", "CK-21 no silent degradation", async ({ a, E, T, cell, guard, idx, engine }) => {
  const part = typeof a.part === "string" ? new Set(a.part.split(",")) : null; const old = !part || part.has("old"); const wantTravel = !part || part.has("travel");
  // ── H11: the travel's tokens (lens and host), loud by name, no throw, the loop alive. H12: the value family, three paths ──
  for (const [sc, m] of wantTravel ? Object.entries(idx).filter(([s, x]) => s !== "__index" && x.loupe && x.clip) : []) {
    const L = m.loupe, thumb = m.thumb ?? '[data-e~="thumb"]', B = m.clip.box, REST = m.clip.rest, ROOT = m.root ?? '[data-e~="root"]', ENG = m.engaged ?? "[data-engaged]";
    const page1 = (path, plant) => guard(`travel ${path} ${plant ? plant.join(" ") : "clean"}`, async () => {
      const P = await openPage(E, T, sc, plant ? { plant } : {});
      try {
        await sideSetup(m, "none")(P.page, "carry"); await P.page.waitForTimeout(250);
        const rows = await P.page.evaluate(rowsOf);
        await P.page.evaluate(TRAVEL_REC, [L.lens, ROOT]);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        let film = null, mark = null, up = false;
        try {
          await P.page.waitForTimeout(900);
          if (path === "side") film = await P.page.evaluate(sideFilm, [L, "carry", B, "side", 2]);
          else if (path === "rerender") mark = await P.page.evaluate(([Q]) => new Promise((ok) => { let k = 0, at = 0; const tick = () => { k++; if (k === 3) { const d = document.createElement("div"); d.style.height = "40px"; d.setAttribute("data-t", "h11-inserted"); document.querySelector(Q).before(d); at = performance.now(); } if (k < 40) requestAnimationFrame(tick); else ok(at); }; requestAnimationFrame(tick); }), [REST]);
          else {
            // the release carry: a fling of the held thumb, 8 moves of 14 px left 8 ms apart, released at once
            for (let i = 1; i <= 8; i++) { await P.page.mouse.move(c.x - 14 * i, c.y); await P.page.waitForTimeout(8); }
            mark = await P.page.evaluate(() => performance.now()); await P.page.mouse.up(); up = true; await P.page.waitForTimeout(400);
          }
        } finally { if (!up) await P.page.mouse.up(); }
        await P.page.waitForTimeout(700);
        // the later holder: a new hold on the same page, +700 ms
        const c2 = await center(P.page, thumb); await P.page.mouse.move(c2.x, c2.y); await P.page.mouse.down();
        let later;
        try { await P.page.waitForTimeout(700); later = await P.page.evaluate(([L, R, EN]) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track), r = document.querySelector(R); const eng = !!r && (r.matches(EN) || !!r.closest(EN) || !!r.querySelector(EN)); if (!l || !t) return { eng, shown: false };
          const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const rel = a1.top + a1.height / 2 - (d.top + d.height / 2); return { eng, shown: a1.width > 0 && +getComputedStyle(l).opacity > 0.9, pin: rel < 0 ? a1.bottom - d.top : a1.top - d.bottom, op: +getComputedStyle(l).opacity }; }, [L, ROOT, ENG]); } finally { await P.page.mouse.up(); }
        const rec = await P.page.evaluate(() => window.__h12rec.stop());
        // what the consumers' own grammars say of the planted value: CSS reads the settle as a <time> (through the row's duration
        // token's own form, × the tempo); animate() takes the easing or throws
        const facts = await P.page.evaluate(TRAVEL_FACTS, [rows.map((x) => x.n), plant?.[0] ?? null]);
        return { rows, film, mark, rec, later, facts, errs: [...P.errors] };
      } finally { await P.close(); }
    }, 60000);
    const laterOk = (r) => r.later?.eng && r.later?.shown && Math.abs(r.later?.pin ?? 99) <= 2;
    const laterLine = (r) => `the later hold: engaged ${r.later?.eng}, lens shown ${r.later?.shown} (opacity ${f(r.later?.op, 2)}), pinned ${f(r.later?.pin, 1)} px`;
    const changesOf = (fl) => { const S = fl?.out ?? []; let n = 0; for (let i = 1; i < S.length; i++) if (S[i].rel > 0 !== S[i - 1].rel > 0) n++; return n; };
    const amsOf = (fl) => [...new Set((fl?.out ?? []).flatMap((x) => x.an.filter((y) => y.p !== "opacity").map((y) => y.ms)))];
    // the path's travel: a WAAPI animation (no CSS transition or animation) the recorder saw: on the lens, translating (side); on the
    // root, translating, from the insert on (rerender); under the root, from the release on (carry)
    const travelsOf = (r, path) => (r.rec ?? []).filter((x) => (path === "side" ? x.where === "lens" && /translate/.test(x.props) : path === "rerender" ? x.where === "root" && /translate/.test(x.props) && x.at >= (r.mark ?? 0) - 1 : x.where === "under" && x.at >= (r.mark ?? 0) - 1));
    const tline = (tv) => (tv.length ? tv.map((x) => `${x.where} ${x.props} ${f(x.ms, 0)} ms "${String(x.easing).slice(0, 60)}"`).join("; ") : "none");
    const clean = {}; let row = null;
    const settleOf = (rw) => (rw ? `--spring-${rw.n}-settle` : null);
    for (const path of ["side", "rerender", "carry"]) {
      const nm = `E-11 ${sc} travel loud · clean · ${path}`; const r = await page1(path, null);
      if (r.crashed) { cell(nm, "FAIL", r.line); continue; }
      const rode = path === "side" ? rodeRow(amsOf(r.film), r.rows) : null; if (rode) row = rode;
      // CSS's clock on the row the side page names (every row's settle is read on every page)
      const cssMs = row ? r.facts.css[settleOf(row)] : NaN;
      const tv = travelsOf(r, path);
      const driven = path === "side" ? !!rode && changesOf(r.film) >= 1 && tv.length >= 1 : tv.length >= 1; clean[path] = driven;
      const exact = driven && Number.isFinite(cssMs) && tv.every((x) => Math.abs(x.ms - cssMs) <= 1);
      const what = path === "side" ? `side changes ${changesOf(r.film)}, the row ${rode ? `${rode.n} (${f(rode.ms, 0)} ms)` : "none"}` : path === "rerender" ? "a 40 px block inserted before the rest box" : "a fling released";
      cell(nm, !driven ? "UNMEASURED" : !r.errs.length && laterOk(r) && exact ? "PASS" : "FAIL", `${driven ? "" : "NOT DRIVEN · "}clean page · ${what} · travel ${tline(tv)} against CSS's clock ${f(cssMs, 1)} ms (to the ms: ${exact}) · console/page errors ${r.errs.length}${r.errs[0] ? ` (${r.errs[0].slice(0, 120)})` : ""} · ${laterLine(r)}`);
    }
    if (!row) cell(`E-11 ${sc} travel loud · tokens`, "UNMEASURED", "NOT DRIVEN: the clean side page shows no running animation on the lens on a declared row's clock, so the travel's tokens cannot be read from it");
    // H12 (REGISTRY §P11-7 items 1, 3, 4; §P11-8.3 wave 1): the value family. The easing token takes every form the travel row can hold:
    // lists, a nonsense string, initial, an undefined var(), steps(), a cubic-bezier past [0, 1] on its y; the settle token a <time> in
    // ms, in s, a negative and a unitless number, a nonsense string
    const VALS = row ? [...TRAVEL_EASINGS.map((v) => [`--spring-${row.n}`, v, "easing"]), ...TRAVEL_SETTLES.map((v) => [`--spring-${row.n}-settle`, v, "settle"])] : [];
    for (const [tok, val, kind] of VALS) for (const path of ["side", "rerender", "carry"]) {
      const nm = `E-11 ${sc} travel loud · ${tok} ${val} · ${path}`;
      if (!clean[path]) { cell(nm, "UNMEASURED", `NOT DRIVEN: the clean ${path} page drove no ${path === "side" ? "travel" : path === "rerender" ? "host glide" : "release carry"}`); continue; }
      const r = await page1(path, [tok, val]);
      if (r.crashed) { cell(nm, "FAIL", r.line); continue; }
      const named = r.errs.filter((e) => !e.startsWith("pageerror") && e.includes(tok)), uncaught = r.errs.filter((e) => e.startsWith("pageerror"));
      const tv = travelsOf(r, path); const cssMs = r.facts.css[settleOf(row)];
      // what the consumer's grammar says: a settle CSS reads as a positive <time> is TAKEN on that clock, else REFUSED; an easing
      // animate() takes is TAKEN with that easing, else REFUSED; the carry takes its shape from its own curve and may not read the
      // easing at all, so on the carry an easing is either taken on the clock or refused
      const expect = kind === "settle" ? (cssMs > 0 ? "taken" : "refused") : path === "carry" ? "either" : r.facts.takes ? "taken" : "refused";
      // driven: the painted side flips, or the lens's travel started (a travel on a misread clock, 210 s, holds the paint on the old
      // side for the whole film, so the flip alone would call a misread clock NOT DRIVEN; the same drive flipped the clean page)
      const sideOk = path !== "side" || changesOf(r.film) >= 1 || tv.length >= 1;
      const takenOk = tv.length >= 1 && !named.length && tv.every((x) => Math.abs(x.ms - cssMs) <= 1) && (kind !== "easing" || path === "carry" || tv.every((x) => x.easing === r.facts.norm));
      const refusedOk = named.length >= 1 && !tv.length;
      const ok = sideOk && !uncaught.length && laterOk(r) && (expect === "taken" ? takenOk : expect === "refused" ? refusedOk : takenOk || refusedOk);
      const verdictWhy = !sideOk ? "NOT DRIVEN: no side change · " : uncaught.length ? "THROWS · " : expect === "taken" && !takenOk ? (tv.length && tv.some((x) => Math.abs(x.ms - cssMs) > 1) ? "MISREAD CLOCK · " : tv.length ? "NOT EXACT · " : "NOT TAKEN · ") : expect === "refused" && !refusedOk ? (tv.length ? "TRAVELS ON A REFUSED TOKEN · " : "SILENT · ") : "";
      cell(nm, !sideOk ? "UNMEASURED" : ok ? "PASS" : "FAIL", `${verdictWhy}${tok}: ${val} on <html> before the first script (the row ${row.n}, read from the clean travel) · the grammar: CSS reads the settle ${f(cssMs, 1)} ms${kind === "easing" ? `; animate() ${r.facts.takes ? `takes "${String(r.facts.norm).slice(0, 50)}"` : `refuses it (${String(r.facts.why).slice(0, 80)})`}` : ""} → expect ${expect} · ${path === "side" ? `side changes ${changesOf(r.film)} · ` : ""}travel ${tline(tv)} · console errors naming the token ${named.length}${named[0] ? ` ("${named[0].slice(0, 100)}")` : ""}, uncaught page errors ${uncaught.length}${uncaught[0] ? ` ("${uncaught[0].slice(0, 120)}")` : ""}, all errors ${r.errs.length} · ${laterLine(r)} (bound: taken on CSS's clock to 1 ms with the easing animate() parses and no error, or refused with ≥ 1 console.error naming the token and no travel; 0 uncaught; the later hold engaged, shown, pinned ≤ 2 px)`);
    }
  }
  for (const [sc, m] of old ? scenesFor(idx, "E-11") : []) {
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
  const scenes = old ? Object.entries(idx).filter(([s]) => s !== "__index") : [];
  const survey = {}; let clocks = {};
  for (const [sc, m] of scenes) {
    const r = await guard(`clock census survey ${sc}`, () => runAct(sc, m, null), 60000);
    if (r.crashed) { cell(`E-11 clock census survey ${sc}`, "FAIL", r.line); continue; }
    survey[sc] = r;
    for (const [t, c] of Object.entries(r.clocks)) { const x = (clocks[t] ??= { rules: new Set(), decls: new Set() }); c.rules.forEach((y) => x.rules.add(y)); c.decls.forEach((y) => x.decls.add(y)); }
  }
  const names = Object.keys(clocks).sort();
  if (old) cell("E-11 clock census", "REPORT", `${names.length} --engage-* clock(s) read by a transition or animation declaration in the loaded stylesheets: ${names.map((t) => `${t} (${clocks[t].rules.size} rule(s), e.g. ${[...clocks[t].decls][0]})`).join(" · ").slice(0, 1400)}`);
  if (old && !names.length) cell("E-11 clock census", "UNMEASURED", "the loaded stylesheets time no transition or animation on an --engage-* clock: nothing to plant");
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
