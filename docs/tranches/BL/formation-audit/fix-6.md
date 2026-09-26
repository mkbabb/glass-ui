# BL — formation fix, seat 6

| field | value |
|---|---|
| seat | formation fix seat 6, before audit pass 6. Answers `formation-audit/pass-5.md` (FE-01 to FE-03) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `958ca517` (the pass-5 commit) for every probe. A scratch worktree at `HEAD` (`scratchpad/formation/fix-6/wt`, `node_modules` and `tests-visual/node_modules` symlinked; `npm run build` exit 0, `npm run demo:dist:build` exit 0), removed before return. `src` is the published 10.1.0. Load average 41-48 |
| engines | Chromium (Playwright's build) for the state-fill probe. No Playwright WebKit run. Real-Safari cells stay UNMEASURED (OW-3) |
| writes | `PLAN.md`; `waves/W-0.1.md`, `W-D.1.md`, `W-D.2.md`, `W-E.2.md`, `W-F.1.md` to `W-F.7.md`, `W-G.1.md`, `W-G.2.md`, `W-G.3.md`, `W-G.5.md`, `W-G.6.md`, `W-G.7.md`, `W-H.1.md`, `W-H.4.md`, `W-I.2.md`, `W-I.3.md`, `W-J.1.md`, `W-K.1.md`, `W-L.1.md`; and this file. `LEDGER.md` and `waves/INDEX.md` need no change: no terminal word moves and INDEX has no edge column. The plan has no `MIGRATION.md` of its own. Nothing under `design/` (read only: `design/material/REGISTRY.md` §0 and FL-1, FL-2). No tracked source, no git write in the checkout |
| fixtures | in this seat's scratchpad, outside the checkout: the state-fill probe (`fix-6/probe/state-fill.mjs`, printed in appendix S), its captures and rows (`fix-6/caps/head/`), the H1-G23 bite copy (`fix-6/bite/src`), and the DAG walk (`fix-6/dag.py`) |

## Result

All three findings are cured in the plan folder. None is refuted.

- **FE-01.** PLAN §5 gains 15 edges. Eleven make every wave that drives a shared kit wait on the one wave that lands it (the band-E and band-K fixture apps, the band-G harness page, the band-H probe directory). Two order W-E.4 after W-E.2 and W-K.4 after W-K.5. A §5 note states the rule once. W-K.1 now lands the band-K fixture app, which no wave landed before (pass 5's note).
- **FE-02.** W-H.1 §6 gains a paired-capture row for the four state tokens that had none. It has a HEAD π reading for each surface, taken here. H1-G23 gains a seventh pattern: the switcher's plate fallback, which let the six-pattern gate pass while a plate read stayed in `src`.
- **FE-03.** The 15 specs' dependency paragraphs no longer list edges. They cite PLAN §5 and keep only hand-offs, ownership notes and the two pairs §5 leaves unordered on purpose. W-F.2 and W-F.3, which fix-5 had left with edge-naming parentheticals, get the same treatment.

After the edits, a walk of PLAN §5 (`fix-6/dag.py`, Python `graphlib`) reads 99 rows, 0 dangling ids, 0 edges into a later band, and a full topological order, so there are no cycles. Every FE-01 pair is ordered in the transitive closure (24 of 24 checks `True`, including W-E.10, W-E.13, W-E.14, W-G.4 and each band-K wave). A column-count check over every table in the edited files finds 0 mismatches.

## Findings

### FE-01 · Within-band dependencies the specs state that §5 does not carry

**Cured by adding the edges to PLAN §5**, the one record, and a note that names the class.

| pair | edit | reason |
|---|---|---|
| W-E.2, W-E.6, W-E.7, W-E.9 → W-E.1 | `PLAN.md:309,313,314,316` | W-E.1 §4 lands `tests-visual/fixtures/band-e/`. Each of the four drives it from its own wired spec. W-E.10 and W-E.14 reach W-E.1 through W-E.9, and W-E.13 through W-E.4 |
| W-G.3 → W-G.6 | `PLAN.md:331` | W-G.6 §4 lands the band-G harness page (its appendix D) in `tests-visual/fixtures/`. W-G.3 lands `dock-idle-loop.spec.ts` on that page. W-G.4 reaches W-G.6 through W-G.3 |
| W-G.5 → W-G.6 | `PLAN.md:333` | the same class, not named in pass 5: W-G.5 §4 adds `c=blob` to that harness page ("The band-G harness page gains `c=blob`"), and G5-G1 runs on it after the wave |
| W-H.2, W-H.5 → W-H.1 | `PLAN.md:337,340` | W-H.1 §4 lands `scripts/probes/band-H/` (its appendix A). W-H.2's G4, G6 and G7 read its `H2/*` rows, and W-H.2 adds two scripts to that directory. W-H.5's H5-G1 and H5-G2 read its `H2/WELL-*` rows. W-H.5 needs nothing of W-H.2's, so no W-H.5 → W-H.2 edge |
| W-E.4 → W-E.2 | `PLAN.md:311` | W-E.4 §3 item 8 is written for the tree where W-E.2 has removed the side-translate utilities (E2-G12) |
| W-K.4 → W-K.5 | `PLAN.md:353` | W-K.5 §4 lands the pointer-origin ring selector in `utilities/base.css`, and W-K.4 points every ring register at it |
| W-K.2, W-K.7, W-K.8, W-K.9, W-K.10 → W-K.1 | `PLAN.md:351,356-359` | pass 5's note: "the band-K fixture app has no landing wave". The same defect as the band-E pair, one step earlier: every band-K spec drives W-K.1 appendix B's app, and no §4 landed it. `waves/W-K.1.md:56` now lands `tests-visual/fixtures/band-k/` (appendix B's app and `lib.mjs`), as W-E.1 does for band E. W-K.3 and W-K.6 already had the edge. W-K.4, W-K.5 and W-K.11 reach W-K.1 through W-K.2 |

**Notes and citations.**
- `PLAN.md:383-389`: a §5 note, "A shared kit lands once, and its users wait on it". It names the lander of each kit and its users, plus one line each for the W-E.4 and W-K.4 pairs.
- `waves/W-G.6.md:55` now says the harness page, appendix D, is landed by this wave as the one copy.
- `waves/W-G.3.md:7,137` cited the harness as "W-G.6 appendix C", which is `g6-overlay.mjs`. They now cite appendix D, as W-G.7 already did.

**Checked and not changed.**
- **The other kits.** Band F's `lib.mjs` (W-F.2 appendix D, imported by W-F.1, W-F.6 and W-F.7) and band G's `lib.mjs` (W-G.1 appendix A, imported by W-G.2) are probe libraries with no landing in any §4. Pass 5 read them as "shared probe patterns with no landing", not as a finding, and this seat adds no landing for them. Where a band library lands is W-A.1's `tests-visual/_support/` question. The pairs W-G.1/W-G.2 and W-G.4/W-G.5 stay unordered, as their specs declare.
- **Cycles.** None: W-E.1, W-G.6, W-H.1, W-K.1 and W-K.5 name none of the waves now ordered after them in §5.

### FE-02 · Four of the six state tokens W-H.1 re-points have no paired capture

**Cured.** W-H.1 §6 has a row for the four surfaces, with a before reading measured here. H1-G23 now also reads the plate fallback those tokens' readers carry.

**The measurement.** The probe is fix-6's probe (appendix S, `state-fill.mjs`). It ran over the worktree's built demo in Chromium at 1280×900, DPR 1, reduced motion, in light and dark. The π is ΔE_OK between the state paint and the rest paint, each the mean colour of the element box inset 2 px. `node probe/state-fill.mjs wt/dist-demo caps/head` printed 16 rows and saved 32 PNGs:

| token | surface (route) | light ΔE_OK | dark ΔE_OK |
|---|---|---:|---:|
| `--control-checked-bg` | checkbox, checked vs unchecked (`/forms/checks`) | 0.1054 | 0.1058 |
| | switch | 0.1912 | 0.1799 |
| | radio | 0.0732 | 0.0754 |
| `--control-surface-bg-hover` | ToggleGroup item, hovered vs rest (`/forms/toggle`) | 0.0112 | 0.0103 |
| | disclosure trigger (`/containers/accordion`) | 0.0582 | **0.0049** |
| `--dock-control-hover-bg` | dock icon button, hovered vs rest (`/dock/controls`) | 0.0701 | **0.0042** |
| | resting dock tab | 0.0534 | 0.0569 |
| `--dock-layer-switcher-active` | switcher indicator vs an unselected tab (`/dock/layers`) | 0.0894 | 0.0504 |

- **Sanity checks.** Two captures were viewed: `bit-checkbox-dark-on.png` (a violet checked bit with its glyph) and `hover-disclosure-trigger-dark-hover.png` (the "What does Accordion own?" trigger on a dark ground).
- **What the rows show.** In dark, the disclosure hover and the dock icon hover barely move the paint. That is #84a's class on two more surfaces. This seat records the readings and does not make them gates: which state rules FL-6 lists is D3's converged spec (`W-H.1.md:98`, "this wave builds the converged spec's list").
- **SelectTrigger.** `/forms/select` mounted no `.control-surface` trigger within 2.5 s in three tries, so it is not captured here. It shares the `.control-surface:hover` rule (`glass/control-surfaces.css:84`) that the ToggleGroup item row reads.

**The gate hole.** `dock/styles/layer-group.css:353` reads `var(--dock-layer-switcher-active, var(--glass-plate-floating))`. On a copy of `src` with fix-5's six declarations re-pointed at `oklch(from var(--foreground) l c h / var(--fill-selected))`:
- fix-5's six-pattern H1-G23 finds nothing: the six are gone, and the fallback does not match `--dock-layer-switcher-active:`.
- The seventh pattern, `-e 'var(--dock-layer-switcher-active, var(--glass-plate-'`, finds line 353, and the gate exits 1.
- With the fallback dropped too, the gate exits 0.
- At HEAD in the worktree, the seven-pattern gate lists 7 lines and exits **1**.

A plate fallback behind a re-pointed token is a masking fallback, so the cure removes it.

**Edits:**
- `waves/W-H.1.md:98` (§3.2 item 8) names the fallback and removes it with the re-point.
- `:129` (§4) adds `layer-group.css:353`. `:134` adds `state-fill.mjs` to `scripts/probes/band-H/`.
- `:170` H1-G23 now has seven patterns, the HEAD reading at `958ca517` (7 lines, exit 1), and the two-step bite.
- `:193` (§6) adds the new row: surfaces, themes, engines, capture names, and `H1/STATE-FILL` with the HEAD readings above. The after capture is taken at `h1` under `.cache/evidence/W-H.1/`, per PLAN §1.
- `PLAN.md:33` adds "fix-6's probe" (appendix S, readings at `958ca517`) to the fixture-app rule, so the row names a probe on record, not a scratchpad.
- The fallback is internal: the token keeps its name, so there is no MIGRATION row.

### FE-03 · Fifteen specs restate their edges beside §5

**Cured by striking the copies.** Each paragraph now opens "PLAN §5, the one record of edges" or "Edges: PLAN §5". It keeps only non-edge matter: what the wave needs in the tree, said without wave ids; hand-offs and owners; and the two pairs §5 leaves unordered on purpose.

| spec | line | kept beside the §5 cite |
|---|---|---|
| W-D.1 | `:134` | the D1 gate with P4-R1..R4; what must be in the tree (G-42's roster entry and R-1's register retired, the demeta detector, the loop tooling's home); the move-chain note |
| W-D.2 | `:109` | what it extends and why the release workflow is edited once; `_support` is W-A.1's |
| W-F.1 | `:142` | no loop owns F-44; the constellation remainder |
| W-F.4 | `:85` | the dock crossfade extent is W-I.1's |
| W-F.5 | `:94` | the Sheet rename glance rides the W-B.2 letter |
| W-F.6 | `:81` | the dock transitions are W-I.1's |
| W-F.7 | `:82` | nothing |
| W-G.1 | `:129` | W-G.2 is unordered; if it lands first, step 1 keeps its one `lost` subscription |
| W-G.2 | `:82` | unordered against W-G.1 |
| W-G.5 | `:119` | W-G.4 is unordered against it. This is the pair pass 5 found disagreeing with §5: the paragraph listed W-G.4 as a dependency while §5 did not |
| W-G.6 | `:84` | nothing |
| W-G.7 | `:93` | nothing |
| W-H.4 | `:101` | its closes |
| W-I.2 | `:119` | its closes |
| W-I.3 | `:101` | its closes and the WebKit crash record |
| W-F.2 | `:119` | fix-5's parenthetical named W-F.1, W-E.3 and W-F.3. It now points to the §5 note for the W-F.3 order and names what it builds on without ids |
| W-F.3 | `:81` | the same: it points to the §5 note (`PLAN.md:377`) for the W-F.2 order |

**Sweep.** A script read every spec's Dependencies section and listed the wave ids left in it. What remains is ownership and hand-off text only:
- W-D.2 (W-A.1 owns `_support`);
- W-F.1 (W-B.9);
- W-F.2, W-F.4 and W-F.6 (W-I.1's rows);
- W-F.3 (W-F.5 owns direction);
- W-F.5 (the W-B.2 letter);
- W-G.1, W-G.2 and W-G.5 (the unordered pairs);
- W-H.1, W-H.2, W-H.3, W-H.4, W-I.1 to W-I.4 and W-J.2 (closes and carries).

A grep for "depends on W-", "lands first" and "first:" finds only gate-ownership cells (W-A.2 G-43, W-D.1 D1-G10) and W-I.1's move note, which cite §5 and state no edge list.

## Notes from pass 5 outside the checklist

- **G-L1-5 reads red on macOS.** Fixed at `waves/W-L.1.md:193`. The test is now `-eq 1`. In the worktree the `= 1` form exits 1 and the `-eq 1` form exits 0. On a copy of the directory with a second `.vue` holding an `<svg>`, the `-eq` form exits 1, so it is still a hold line with its bite.
- **`contain: paint` has two owners in the text.** Fixed at `waves/W-0.1.md:57`: `contain: paint` (M-7) is W-E.2's, per PLAN §2. The same sentence now lists W-H.5 for the transmissive well.
- **W-E.2's appendix still carries the G3 block.** Fixed at `waves/W-E.2.md:123`. The landed `surface-geometry.spec.ts` omits the block that emits `E2-G3`. W-H.1 lands it as H1-G21, so no red wired row sits between the two waves.
- **W-J.1's "whichever is first".** Fixed at `waves/W-J.1.md:123` and the §4 line. W-H.1 lands first (§5) and re-points the token. W-J.1's entry re-runs the WebKit hover and carries the fix only if the hang survives the re-point. The order-dependent branch is gone, and the measured condition stays.
- **The band-K fixture app has no landing wave.** Fixed under FE-01 above.
- **Not taken: D3-B still branches the plan.** `design/material/REGISTRY.md:22` reads D3-B **BANK** (40 %), not RETIRE, and D3 has not converged. So the D3-B conditionals are live text, not dead text:
  - PLAN §2 `:67`, §4 `:259` and the §5 note `:374`;
  - H1-G19 and H1-G20;
  - W-G.3's MIGRATION row.

  FL-1 deletes the sampler in every route. Whether a published field luma survives FL-1 is D3's to rule in its converged spec, and `design/` is fenced. Passes 3 and 4 noted the same, and fix-5 declined it for the same reason.

## Appendix S · the state-fill probe (`state-fill.mjs`)

Run: `node state-fill.mjs <worktree>/dist-demo <outdir>` after `npm run demo:dist:build` in the worktree. It serves `dist-demo` with an SPA fallback, drives Chromium (`--force-color-profile=srgb`) and writes `rows.json` and every PNG it reads. At `958ca517`, the 16 rows are the table under FE-02. When W-H.1 lands, it moves into `scripts/probes/band-H/`: the `CHECKOUT` literal becomes the repository root resolved from the script's own path, and its output root becomes `.cache/evidence/W-H.1/` (PLAN §1).

```js
// state-fill.mjs <dist-demo> <outdir> — FE-02's paired π: ΔE_OK(state, rest) on the surfaces the four FL-6
// state tokens paint (--control-checked-bg, --control-surface-bg-hover, --dock-control-hover-bg,
// --dock-layer-switcher-active). Chromium, 1280x900, DPR 1, reduced motion, light and dark. Prints rows; saves PNGs.
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import { createRequire } from "node:module";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const require = createRequire(`${CHECKOUT}/package.json`);
const { PNG } = require("pngjs");
const { chromium } = await import(`${CHECKOUT}/node_modules/playwright/index.mjs`);
const [dist, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json" };
const srv = http.createServer((req, res) => { const p = path.join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname)); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : path.join(dist, "index.html"); res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => srv.listen(0, r)); const base = `http://127.0.0.1:${srv.address().port}`;
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const oklab = ([r, g, b]) => { const [R, G, B] = [lin(r), lin(g), lin(b)]; const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
const dE = (p, q) => { const [a, b] = [oklab(p), oklab(q)]; return +Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]).toFixed(4); };
const hex = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const meanPng = (buf) => { const img = PNG.sync.read(buf); let s = [0, 0, 0], n = 0; for (let i = 0; i < img.data.length; i += 4) { s[0] += img.data[i]; s[1] += img.data[i + 1]; s[2] += img.data[i + 2]; n++; } return s.map((v) => v / n); };
const rows = []; const row = (o) => { rows.push(o); console.log(JSON.stringify(o)); };
const b = await chromium.launch({ args: ["--force-color-profile=srgb"] });
async function open(route, theme) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce", colorScheme: theme });
  const page = await ctx.newPage(); await page.goto(base + route); await page.waitForTimeout(2500);
  await page.evaluate((t) => { document.documentElement.classList.toggle("dark", t === "dark"); }, theme); await page.waitForTimeout(600);
  return { ctx, page };
}
const clip = async (page, loc, name) => { await loc.scrollIntoViewIfNeeded(); const bb = await loc.boundingBox(); const inset = { x: bb.x + 2, y: bb.y + 2, width: Math.max(2, bb.width - 4), height: Math.max(2, bb.height - 4) }; const buf = await page.screenshot({ clip: inset, path: path.join(out, name) }); return meanPng(buf); };
for (const theme of ["light", "dark"]) {
  // --control-checked-bg: the checked bit against the unchecked bit (checkbox, switch, radio)
  { const { ctx, page } = await open("/forms/checks", theme);
    for (const [k, role] of [["checkbox", "[role=checkbox]"], ["switch", "[role=switch]"], ["radio", "[role=radio]"]]) {
      const on = await clip(page, page.locator(`${role}[data-state=checked]`).first(), `bit-${k}-${theme}-on.png`);
      const off = await clip(page, page.locator(`${role}[data-state=unchecked]`).first(), `bit-${k}-${theme}-off.png`);
      row({ pi: "H1/STATE-FILL", token: "--control-checked-bg", surface: k, theme, state: hex(on), rest: hex(off), dE: dE(on, off) }); }
    await ctx.close(); }
  // --control-surface-bg-hover: the hovered .control-surface (ToggleGroup item; SelectTrigger shares the rule) and the disclosure trigger
  for (const [route, sel, k] of [["/forms/toggle", ".toggle-group__item[data-state=off]", "toggle-item"], ["/containers/accordion", ".disclosure-group-trigger", "disclosure-trigger"]]) {
    const { ctx, page } = await open(route, theme); const loc = page.locator(sel).first();
    await page.mouse.move(2, 2); await page.waitForTimeout(500); const rest = await clip(page, loc, `hover-${k}-${theme}-rest.png`);
    await loc.hover(); await page.waitForTimeout(800); const hov = await clip(page, loc, `hover-${k}-${theme}-hover.png`);
    row({ pi: "H1/STATE-FILL", token: "--control-surface-bg-hover", surface: k, theme, state: hex(hov), rest: hex(rest), dE: dE(hov, rest) }); await ctx.close(); }
  // --dock-control-hover-bg: a dock icon button and a resting dock tab, hovered
  for (const [sel, k] of [[".glass-dock .dock-icon-button", "dock-icon"], [".glass-dock .dock-tab-button:not([data-active])", "dock-tab"]]) {
    const { ctx, page } = await open("/dock/controls", theme); const loc = page.locator(sel).first();
    await page.mouse.move(640, 450); await page.waitForTimeout(500); const rest = await clip(page, loc, `hover-${k}-${theme}-rest.png`);
    await loc.hover(); await page.waitForTimeout(800); const hov = await clip(page, loc, `hover-${k}-${theme}-hover.png`);
    row({ pi: "H1/STATE-FILL", token: "--dock-control-hover-bg", surface: k, theme, state: hex(hov), rest: hex(rest), dE: dE(hov, rest) }); await ctx.close(); }
  // --dock-layer-switcher-active: the travelling indicator against an unselected tab of the same switcher
  { const { ctx, page } = await open("/dock/layers", theme);
    const sw = page.locator(".dock-layer-switcher").first();
    const act = await clip(page, sw.locator(".dock-layer-tab-indicator"), `switcher-${theme}-active.png`);
    const rest = await clip(page, sw.locator('.dock-layer-tab[aria-selected="false"]').first(), `switcher-${theme}-rest.png`);
    row({ pi: "H1/STATE-FILL", token: "--dock-layer-switcher-active", surface: "layer-switcher", theme, state: hex(act), rest: hex(rest), dE: dE(act, rest) }); await ctx.close(); }
}
fs.writeFileSync(path.join(out, "rows.json"), JSON.stringify(rows, null, 1));
await b.close(); srv.close();
```
