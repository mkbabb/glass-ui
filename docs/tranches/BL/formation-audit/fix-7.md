# BL — formation fix, seat 7

| field | value |
|---|---|
| seat | formation fix seat 7, before audit pass 7. Answers `formation-audit/pass-6.md` (FF-01 to FF-03) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8397fcae` (the pass-6 commit) for every probe. A scratch worktree at `HEAD` (`scratchpad/formation/fix-7/wt`, `node_modules` and `tests-visual/node_modules` symlinked; `npm run build` exit 0, `npm run demo:dist:build` exit 0), removed before return. `src` is the published 10.1.0. Load average 44-47 |
| engines | Chromium (Playwright's build) for the press probe. No Playwright WebKit run. Real-Safari cells stay UNMEASURED (OW-3) |
| writes | `PLAN.md`; `waves/W-0.1.md`, `W-0.2.md`, `W-0.3.md`, `W-0.4.md`, `W-0.8.md`, `W-0.9.md`, `W-B.9.md`, `W-E.8.md`, `W-E.11.md`, `W-E.12.md`, `W-F.1.md`, `W-F.2.md`, `W-G.1.md`, `W-G.2.md`, `W-G.6.md`, `W-G.7.md`, `W-H.1.md`, `W-H.2.md`, `W-H.5.md`, `W-K.5.md`, `W-K.11.md`, `W-L.3.md`, `W-L.4.md`, `W-L.8.md`; and this file. `LEDGER.md` needs no change: no terminal word moves, and no row cites a gate, file or kit this seat moved (`grep` for `G-L8-4`, `bundle-ratchet`, `verify:package`, `probes/band-0`, `current-row`, `lib.mjs` finds 0 lines). `waves/INDEX.md` has no edge column. The plan has no `MIGRATION.md`. Nothing under `design/`. No tracked source, no git write in the checkout |
| fixtures | in this seat's scratchpad, outside the checkout: the H1-G23 script (`fix-7/g23.sh`, and `g23-from-spec.sh`, extracted from the spec and `diff`-identical), the bite copy (`fix-7/bite/`), the press probe (`fix-7/probe/press-fill.mjs`, printed in appendix T), its 17 captures and `rows.json` (`fix-7/caps/`), and the DAG walk (`fix-7/dag.py`) |

## Result

All three findings are cured in the plan folder. None is refuted.

- **FF-01.** Every shared kit has one lander, named in its own §4, and every user waits on it in PLAN §5. Pass 6 named four kits. The sweep for the class found five more: band E's `lib.mjs` (W-E.8, W-E.11 and W-E.12 imported it unordered), band F's `sheetlib.mjs` (no §4 landed it), the band-G `one-engine.spec.ts` (W-B.9 and W-G.1 both landed it), W-K.5's `current-row.spec.ts` (W-K.5 and W-K.11 both landed it), and W-0.9's scene in the band-0 probe. §5 gains 11 edges and the §5 kit note is rewritten as one list.
- **FF-02.** W-L.4 builds the fork's declaration check as its fixture alone and no longer edits `scripts/verify-export-types.mjs`. G-L4-5 is removed. W-L.3 runs the fixture as its types leg and now lands after W-L.4. The same class also hit W-L.8, which read the deleted file and `.bundle-ratchet` for its datum, so that step and G-L8-4 now read W-A.5's payload invariant.
- **FF-03.** H1-G23 now reads files whole, so it sees declarations and `var()` fallbacks that span lines. It fails on any plate fallback behind any token, and its token list includes the press. It reads 9 lines at HEAD and exits 1. On fix-6's cured copy it still exits 1, where the old form exited 0. W-H.1 §3.2 item 8 and §4 name the seventh token and the second fallback. §6 gains a paired row for the press and the active icon button, with HEAD readings taken here.

After the edits, a walk of PLAN §5 (`fix-7/dag.py`, Python `graphlib`, with W-L.6's "every wave of bands C to K" expanded) reads:
- 99 rows, one per spec, with 0 dangling ids and 0 edges into a later band;
- a full topological order, so there are no cycles;
- no band-0 wave depending on a wave outside band 0, and only W-0.1 and W-0.2 naming the D3 gate.

For each of the 12 lander → user sets below, every user reaches its lander in the transitive closure (0 misses). A column-count check over every table in the 25 edited files finds 0 mismatches.

## Findings

### FF-01 · Shared kits that fix-6's rule does not reach

**Cured at the cause.** There is one rule, one lander per kit, and one list in PLAN §5.
- **The rule.** The note at `PLAN.md:383` now covers a probe library and a wired spec file as well as an app, page or directory. It says a user's §4 names the kit as the lander's and lands no second copy. It also says that where a kit's text is printed in another spec's appendix, the text stays there and the lander is still the one named. This stops both contradictions pass 6 found: `PLAN.md:385` against `W-G.6.md:55`, and `PLAN.md:377` against the band-F §4s.
- **The list.** `PLAN.md:384-391` names each lander and its users.

| kit | lander (its §4) | users now ordered after it | §5 edges added |
|---|---|---|---|
| `scripts/probes/band-0/` (text in `W-0.1.md` appendix A) | **W-0.3** (`W-0.3.md:70`, with the npm script `probe:band-0`) | W-0.1, W-0.4, W-0.8, W-0.9 directly; W-0.2, W-0.5 through W-0.1 | W-0.1, W-0.4, W-0.8, W-0.9 → W-0.3 (`PLAN.md:270,273,277,278`) |
| band-E `lib.mjs` in `tests-visual/fixtures/band-e/` | W-E.1 (unchanged) | W-E.8, W-E.11 and W-E.12 were unordered. Each imports `./lib.mjs` in the appendix that lands as its wired spec (`W-E.8.md:100`, `W-E.11.md:101`, `W-E.12.md:86`) | W-E.8, W-E.11, W-E.12 → W-E.1 (`PLAN.md:315,318,319`) |
| band-F `lib.mjs` (text in `W-F.2.md` appendix D) | **W-F.1** (`W-F.1.md:103`), at `tests-visual/fixtures/band-f/lib.mjs` | W-F.2, W-F.6, W-F.7; W-F.3 to W-F.5 through W-F.2 | W-F.7 → W-F.1 (`PLAN.md:328`); W-F.2 and W-F.6 already had it |
| band-F Sheet and drag kit (`sheetlib.mjs`, `sheet.html`, `drag.html`; `W-F.2.md` appendix E) | **W-F.2** (`W-F.2.md:76`) | W-F.3 (edge already there) | — |
| band-G `lib.mjs` (text in `W-G.1.md` appendix A) and `tests-visual/wired/one-engine.spec.ts` | **W-B.9** (`W-B.9.md:32`) | W-G.1 adds its rows (`W-G.1.md:82`); W-G.2 → W-G.1; W-G.3 to W-G.7 through W-G.1 | W-G.2 → W-G.1 (`PLAN.md:330`) |
| band-G harness app, pages `h` and `b` (`W-G.6.md` appendix D) | W-G.6 (`W-G.6.md:55`), at `tests-visual/fixtures/band-g/` | W-G.3, W-G.5, W-G.7; W-G.4 through W-G.3 | W-G.7 → W-G.6 (`PLAN.md:335`) |
| `tests-visual/wired/current-row.spec.ts` | **W-K.11** (`W-K.11.md:39`, with W-K.5 appendix A's G1 cell) | W-K.5 adds G2 and G3 (`W-K.5.md:51`); the edge W-K.5 → W-K.11 was already in §5 | — |
| `scripts/probes/band-H/`, band-K fixture app | W-H.1, W-K.1 (unchanged) | as fix-6 | — |

**Why W-0.3 lands the band-0 probe.** W-0.1 waits on the D3 gate. If W-0.1 stayed the lander, the only cure would be edges from W-0.3, W-0.4 and W-0.8 to W-0.1. That chains O-77, O-78/O-81 (4) and O-83 to D3, which is what pass 6 said row 7 forbids. W-0.3 has no dependency, and all three of its gates already run the probe. With W-0.3 as the lander, the kit waits on no loop, and D3 stays band 0's only external edge.

**W-0.9 is the same class.** Its G2 and G3 read "fix-2's probe, scene `card`". PLAN §1's rule has the owning wave move that scene into `scripts/probes/`, but W-0.9 §4 named no probe. `W-0.9.md:42` now adds the scene to the band-0 probe, and W-0.9 → W-0.3 is in §5.

**The `b` page.**
- The page's files (`pages/b.html`, `src/b.css`, `src/b.js`) are now printed once, in W-G.6 appendix D (`W-G.6.md:231-237`).
- W-G.7 appendix B cites them and keeps only its measure script (`W-G.7.md:149`).
- W-G.7 §4 no longer lands a copy (`W-G.7.md:53`).
- PLAN's old line "W-G.7's one-Button page is its own landing" is gone.

**Band G's library, and W-G.2.** W-B.9 had to land the library. Its B9-G2 row goes into `one-engine.spec.ts`, which imports `lib.mjs`, and W-B.9 lands before W-G.1 (§5: W-G.1 → W-B.9). W-G.1 had listed the same spec as "New" in its §4, so there were two landers. Now W-B.9 lands the spec and the library, and W-G.1 adds its rows.

W-G.2 now depends on W-G.1, not on W-B.9 directly, for two reasons:
- **The library.** W-G.2 reaches it through W-G.1.
- **Its cure's paths.** W-G.2's §4 edited "paths after W-G.1; if this wave lands first, `useWebGPUCanvas.ts` holds both". That was two path sets, decided by landing order. It now reads one set, "the paths W-G.1 leaves" (`W-G.2.md:52`). W-G.1 §8's matching branch ("if it lands first, step 1 keeps its one `lost` subscription") is gone too (`W-G.1.md:129`).

**Checked and not changed.**
- The other cross-spec appendix citations. A script listed every "W-x appendix Y" cite made from another spec. Of those, the following point at a wave that lands later:
  - W-I.1 → W-I.2 and W-I.3: W-I.1 lands both scripts (`W-I.1.md:186`), so they have one lander, ordered.
  - W-J.1 → W-J.2: text only. W-J.2 lands `slider.mjs`, and W-J.2 → W-J.1.
  - W-G.1 → W-G.7: a HEAD reading only.
- The W-G.4/W-G.5 pair stays unordered, as its specs state.

### FF-02 · W-L.3 deletes the script W-L.4 builds and gates on, and §5 leaves them unordered

**Cured by striking the second path.** The fork's declaration check lives in one place: W-L.4's fixture `tests/_support/declaration-floor/`, gated by G-L4-4.
- `W-L.4.md:71` (§3.5, the fork leg): BUILD as the fixture, not in `verify-export-types.mjs`.
- `W-L.4.md:94` (§3.6): the fixture is the one home. W-L.3's matrix runs it and deletes the script. W-L.4 edits neither the script nor `verify:package`.
- `W-L.4.md:98` (§4): `scripts/verify-export-types.mjs` removed.
- **G-L4-5 is removed.** It could not be green on the release commit in either order. Its reading was `npm run verify:package` exit 0 and the grep exit 1, re-run here: `grep -q "types: \[\]" scripts/verify-export-types.mjs` exits 1. Its subject, declarations closing under `types: []`, is G-L4-4's, which stays born RED: no fixture and no `typescript` peer at HEAD. No roster row, ledger row or other spec cites G-L4-5 (grep, 0 hits).
- `W-L.3.md:29` (§1): W-L.3 receives the hand-off from W-L.4 §3.6, per PLAN §1's hand-off rule. `W-L.3.md:65` (§3.8): the types leg runs W-L.2's strict fixture and W-L.4's declaration-floor fixture.
- `W-L.3.md:88` (G-L3-8) gains a third clause, `grep -q "declaration-floor" scripts/consumer-matrix.mjs`, so the hand-off is gated. It was re-run here at `8397fcae`: **exit 1**. `ci.yml` has no `consumer-matrix`, `verify:package` is at `package.json:492` and `release.yml:52`, and there is no `scripts/consumer-matrix.mjs`.
- `PLAN.md:363`: W-L.3 → W-L.4, with the reason at `PLAN.md:393`. W-L.4 depends on W-F.2 and W-E.7 only, so no cycle.

**The same class in W-L.8.** W-L.8 §3.5 step 4 read `unpackedContentBytes` from `scripts/verify-export-types.mjs` and rebound `.bundle-ratchet`. Its §4 listed `.bundle-ratchet`. G-L8-4 compared `cat .bundle-ratchet` with the registry, "(or W-A.5's invariant reading)". But:
- W-A.5 deletes `.bundle-ratchet` (`W-A.5.md:40`), W-L.3 deletes the script, and both land before W-L.8 (W-L.8 → W-L.7 → W-L.3 → W-A.5);
- W-A.5 says "W-L.8's spec cites this gate, not the deleted file" (`W-A.5.md:42`).

So the first path read deleted files, and the "or" was a dual path. The edits:
- `W-L.8.md:75` (step 4): the datum is `node scripts/payload.mjs --enforce` on the clean release commit, and its readings are recorded.
- `W-L.8.md:76` (step 5): the release steps are the ones W-A.5 and W-L.3 leave. `verify:package` is gone, and `payload.mjs --enforce` and the consumer matrix are in.
- `W-L.8.md:88` (§4): `.bundle-ratchet` dropped.
- `W-L.8.md:99` (G-L8-4) is now `git diff --quiet HEAD && node scripts/payload.mjs --enforce` after `npm run build` on the release commit. Run here at `8397fcae`, it reads **exit 1** (`Cannot find module …/scripts/payload.mjs`).

### FF-03 · H1-G23 goes green while two dock state fills still read a plate

**Cured by re-writing the gate to read across lines and by class.** H1-G23 is now a block under W-H.1 §5's table (`W-H.1.md:173-183`), and the row points to it (`:170`). The block does three things:
- it reads every tracked `.css` and `.vue` under `src` whole (`perl -0777`), with comments blanked to their newlines, so line numbers hold;
- it fails on a declaration of any of the seven state tokens whose value names `--glass-plate-`, even across lines (`[^;{}]*?`);
- it fails on any `var(--x, var(--glass-plate-…))` fallback, whatever `--x` is. So it now covers the whole class of plate fallback behind a token, which is FE-02's class, not just two names.

Readings, all in this seat's worktree or its `git archive HEAD src` copy (`fix-7/bite`, `git init`ed so `git ls-files` works):

| tree | new H1-G23 | fix-6's seven-pattern H1-G23 |
|---|---|---|
| HEAD `8397fcae` | **exit 1**, 9 lines: `menu.css:10`, `icon-button.css:200`, `layer-group.css:353`, `glass.css:257`, `scale-paper.css:106`, `sizing.css:206,207,225,261` | exit 1, 7 lines (pass 6) |
| bite 1, fix-6's cured state: six one-line declarations re-pointed at `oklch(from var(--foreground) l c h / var(--fill-selected))`, `layer-group.css:353`'s fallback dropped | **exit 1**: `icon-button.css:200`, `sizing.css:261` | **exit 0** (re-run here), the hole pass 6 found |
| bite 2: bite 1 plus the press token re-pointed and `icon-button.css:199-202`'s fallback dropped | exit 0 | exit 0 |
| bite 2 plus a planted `src/plant.css`, `.x { background: var(--foo-bg, var(--glass-plate-quiet)); }` | **exit 1** (`plant.css:1`) | exit 0 |

So the gate is born RED, can pass, and bites on both of pass 6's missed reads and on any new plate fallback. The block in the spec was extracted and run (`g23-from-spec.sh`); it is `diff`-identical to the script the table rows came from.

**The spec text.**
- `W-H.1.md:98` (§3.2 item 8) now names seven tokens and two fallbacks. The press is `--dock-control-press-bg`, at `sizing.css:261-265`, with its three readers `icon-button.css:123`, `tab-button.css:77` and `triggers.css:89`. The fallbacks are at `layer-group.css:353` and `icon-button.css:199-202`. Both go with the re-point.
- `:129` (§4) adds `icon-button.css:199-202`.
- `:134` adds `press-fill.mjs` to `scripts/probes/band-H/`.

**π for the two surfaces pass 6 said no paint row held.** `W-H.1.md:207` is a new §6 row: the press on a dock icon button and a resting dock tab, and the active icon button's capsule fill. Its HEAD readings were taken here by fix-7's probe (appendix T): `node press-fill.mjs wt/dist-demo caps`, Chromium, 1280×900, DPR 1, reduced motion, light and dark. It printed 6 rows and saved 16 PNGs:

| token | surface (`/dock/controls`) | light ΔE_OK | dark ΔE_OK |
|---|---|---:|---:|
| `--dock-control-press-bg` | icon button, press vs rest / press vs hover | 0.1034 / 0.0334 | 0.0464 / 0.0447 |
| | resting dock tab, press vs rest / press vs hover | 0.0802 / 0.0268 | 0.0339 / 0.0262 |
| `--dock-control-active-bg` (via `icon-button.css:199-202`) | active icon button vs an inactive one | 0.1981 | 0.3074 |

- **Sanity checks.** Two captures were viewed:
  - `press-dock-icon-light-press.png`: a grey-darkened compass button.
  - `active-dock-icon-dark-on.png`: the bell on a terracotta capsule.
- **What the rows show.** In dark, the icon's press and hover paints sit close together (ΔE 0.0447 between them). This row records the readings, as fix-6's row did. Which states become gates is D3's converged FL-6 list.
- **Where the probe is on record.** `PLAN.md:33` adds "fix-7's probe" (appendix T, readings at `8397fcae`) to the fixture-app rule.
- **No MIGRATION row.** The fallback and the press token are internal: no token is renamed or removed.

## Notes from pass 6 outside the checklist

- **W-H.2 §4 listed the well's lines.** Fixed at `waves/W-H.2.md:104`. §4 keeps `dark-arm.css:278-279` (the dark veil) and names `on-glass-fg.css:37` and `dark-arm.css:303` as W-H.5's. `W-H.2.md:108` and `W-H.5.md:41` now say the band-H probe directory and its npm script are W-H.1's landing. W-H.5 had said "shared with W-H.2".
- **W-L.4 and W-L.6 on `useDragMorph`.** Not changed. Pass 6 records that neither order breaks a gate.
- **D3-B still branches the plan.** Not changed, for fix-6's reason: D3 has not converged, and `design/` is fenced.

## Appendix T · the press probe (`press-fill.mjs`)

Run: `node press-fill.mjs <worktree>/dist-demo <outdir>` after `npm run demo:dist:build` in the worktree. It is fix-6's `state-fill.mjs` harness (appendix S: the server, the OKLab ΔE, the inset-box mean, `open` and `clip`) with new cells. At `8397fcae` it prints the six rows of the FF-03 table. When W-H.1 lands, it moves into `scripts/probes/band-H/` beside `state-fill.mjs`. There, the `CHECKOUT` literal becomes the repository root resolved from the script's own path, and its output root becomes `.cache/evidence/W-H.1/` (PLAN §1).

```js
// press-fill.mjs <dist-demo> <outdir> — FF-03's paired π (fix-6's state-fill.mjs harness, new cells): ΔE_OK(state, rest) on the surfaces the four FL-6
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
  // --dock-control-press-bg: a dock icon button and a resting dock tab, held pressed against rest (both read the press token: icon-button.css:123, tab-button.css:77)
  for (const [sel, k] of [[".glass-dock .dock-icon-button:not([data-active])", "dock-icon"], [".glass-dock .dock-tab-button:not([data-active])", "dock-tab"]]) {
    const { ctx, page } = await open("/dock/controls", theme); const loc = page.locator(sel).first();
    if (!(await loc.count())) { row({ pi: "H1/STATE-FILL", token: "--dock-control-press-bg", surface: k, theme, absent: true }); await ctx.close(); continue; }
    await page.mouse.move(640, 450); await page.waitForTimeout(500); const rest = await clip(page, loc, `press-${k}-${theme}-rest.png`);
    const bb = await loc.boundingBox(); await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(800);
    const hov = await clip(page, loc, `press-${k}-${theme}-hover.png`);
    await page.mouse.down(); await page.waitForTimeout(600); const prs = await clip(page, loc, `press-${k}-${theme}-press.png`); await page.mouse.up();
    row({ pi: "H1/STATE-FILL", token: "--dock-control-press-bg", surface: k, theme, press: hex(prs), hover: hex(hov), rest: hex(rest), dE_press_rest: dE(prs, rest), dE_press_hover: dE(prs, hov) }); await ctx.close(); }
  // --dock-control-active-bg through icon-button.css:199-202 (the capsule fill and its plate fallback): an active icon button against an inactive one
  { const { ctx, page } = await open("/dock/controls", theme);
    const act = page.locator(".glass-dock .dock-icon-button[data-active]").first(), off = page.locator(".glass-dock .dock-icon-button:not([data-active])").first();
    if (!(await act.count())) row({ pi: "H1/STATE-FILL", token: "--dock-control-active-bg", surface: "dock-icon-active", theme, absent: true });
    else { const a = await clip(page, act, `active-dock-icon-${theme}-on.png`), o = await clip(page, off, `active-dock-icon-${theme}-off.png`); row({ pi: "H1/STATE-FILL", token: "--dock-control-active-bg", surface: "dock-icon-active", theme, state: hex(a), rest: hex(o), dE: dE(a, o) }); }
    await ctx.close(); }
}
fs.writeFileSync(path.join(out, "rows.json"), JSON.stringify(rows, null, 1));
await b.close(); srv.close();
```
