# W-I.2 · W-DOCK-KEYBOARD: one marker-based member query, the named toolbar, one owner of the selection semantic · 11.0.0

| field | value |
|---|---|
| seat | band-I wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8536f2cc` in a scratch worktree; `git diff --stat v10.1.0 HEAD -- src` prints nothing, so every reading measures the published 10.1.0 bytes. A second worktree carries HEAD + `design/dock/pass-2/floor.patch` (D2's floor, `git apply --check` clean, 38 files) so each row below says whether W-I.1's floor already cures it |
| kind | a BUILD wave on the dock W-I.1 lands. Not a loop wave: D2's floor row 1 decides the dock's seat marker (`[data-dock-seat]` at any depth); this wave makes that the one member query of the library and closes the ARIA rows the loop does not own |
| ships in | 11.0.0 |
| families | F-19 (whole), `audit/REGISTRY.md:420-444`; ledger RT-31B (BK #31's dock keyboard route, `ledger/census-register-a.md:43`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| instruments | the band-I paint probe (`W-I.1.md` appendix A), rows `I2/*`, and the demo probe `demo-aria.mjs` (appendix A here), rows `D2/*`. Both land under `scripts/probes/band-I/`; the rows then move into W-A.3's wired e2e set |
| engines | Chromium 149 headless. Playwright WebKit 26.5 headless: every dock route of the demo crashes at HEAD (`page.goto: Page crashed`, the nested translucent `color-mix()` edge, D2 PF-3); the probe's dock scenes crash likewise. W-I.1 removes the crash (floor row 6), and this wave's WebKit cells are measured on that tree. Real Safari: UNMEASURED (owner's safaridriver checkbox, OW-3) |

## 1 · What it closes

| id | what | source | state on HEAD + D2 floor |
|---|---|---|---|
| L08-05, R2-04-10 | seats resolve from `run.children`, so grouped seats collapse into one: 11 tab stops on the shell sidebar | `REGISTRY.md:424,427`; `useDockRun.ts:71-75` | cured by W-I.1 (floor row 1); held here |
| L08-06 | activating a sidebar category announces "Foundations" (the group's first button) | `REGISTRY.md:424`; `round-1/L08.md:26` | cured with L08-05; held here |
| L08-13 | the dock search has no combobox semantics | `round-1/L08.md:33`; `useDockSearch.ts` binds no ARIA | **this wave** |
| L08-16 | the collapsed summary is `role="button"` around consumer slot content (axe `nested-interactive`) | `round-1/L08.md:36`; `GlassDock.vue:476-492` | **W-I.1** (D2 Q-10, the collapsed-face contract); held here |
| L08-17 | `DockControl` stamps `aria-pressed` beside a group's `role="radio"` | `round-1/L08.md:37`; `DockControl.vue:109-114` | **this wave** |
| R3-02-14 | every dock toolbar is unnamed: the consumer's `aria-label` lands on the role-less root, the run carries `role="toolbar"` | `REGISTRY.md:429`; `GlassDock.vue:65,338,462` | **this wave** |
| R3-01-15 | the run's snap targets are its direct children (`run.css:270` `.glass-dock .dock-run > *`) | `REGISTRY.md:430` | cured by W-I.1 (floor row 1 reads the seat declaration, `FLOOR.md:57`); held here |
| R7-01-07 | a separator or foreign sibling is a seat: arrows stop, Home/End no-op | `REGISTRY.md:432` | cured by W-I.1; held here. The deferral of Home/End to an inner composite is this wave's |
| R7-01-08 | the same mechanism in Carousel and the deck: a zero-size first child makes the painted slide `inert` | `REGISTRY.md:433`; `CarouselContent.vue:39-42`, `useDeckSnap.ts:63-66` | **this wave** |
| R7-02-01 | a wrapped row is one seat: End on `/dock/overflow` lands on "Home", the focused control can sit outside the port | `REGISTRY.md:434` | **this wave** for the End result (the inner radiogroup's End must hold); W-I.1's run for reach |
| RT-31B | BK's dock keyboard model and its π-KEYBOARD capture | `ledger/census-register-a.md:43` | closed by G1-G8 and §6 |

## 2 · The defect at HEAD

**One mechanism, four member sets.** Each reads a container's element children as its members: the dock run (`src/components/dock/composables/useDockRun.ts:71-75`, `seatsOf`), its CSS snap targets (`styles/run.css:270-271`), the Carousel strip (`carousel/CarouselContent.vue:39-42`, recounted by a `childList` observer at `:81-85`) and the deck snap engine (`deck/composables/useDeckSnap.ts:63-66`). Any node the library did not mark is a member.

**Two owners of one semantic.** `DockControl` writes `aria-pressed` whenever `active` is set (`DockControl.vue:109-114`) while `useSelectionGroup.itemAttrs` spreads `role="radio"` and `aria-checked` on the same element (`/dock/overflow`).

**The name on the wrong element.** `defineOptions({ inheritAttrs: false })` with `v-bind="$attrs"` on the root (`GlassDock.vue:65`, `:338`) puts the consumer's `aria-label` on `.glass-dock`, which has no role, while the run carries `role="toolbar"` (`:462`) and no name.

Measured here (Chromium; Playwright WebKit crashes on every dock page at HEAD):

| row | HEAD | HEAD + D2 floor |
|---|---|---|
| `I2/TOOLBAR-NAME` (probe: three docks, each with `aria-label`) | **3 of 3 toolbars unnamed** | 3 of 3 unnamed (both engines) |
| `D2/UNNAMED-TOOLBARS` (demo, eight `/dock/*` routes) | **46 unnamed**: overview 12/14, layers 8/8, vertical 6/8, sections 5/5, controls 6/6, overflow 3/3, cta-receive 3/3, dock-search 3/3 | not re-run (the floor does not touch naming) |
| `I2/ARROW-SEPARATOR` (Search, Notifications, separator, Overview, Activity; ArrowRight ×4 from Search) | **visits Notifications ×4** | Notifications > Overview > Activity > Activity (PASS, both engines) |
| `I2/HOME-END-FOREIGN` (a `display:none` span first and last) | **Home → Middle, End → Middle** | First, Last (PASS, both engines) |
| `I2/GROUP-TABSTOPS` (five seats in two `div.contents[role=group]`) | **4 tab stops** | 1 (PASS, both engines) |
| `D2/SIDEBAR-TABSTOPS` (shell sidebar on `/dock/overview`) | **11 tab stops** | — (demo not rebuilt on the floor at this seat) |
| `I2/CAROUSEL-FOREIGN` (a zero-size first child, strip scrolled to the second item) | **FAIL**: the painted item is `item-0`, `data-state="prev"`, `inert`; the off-screen `item-1` is `active` | FAIL (both engines; the floor does not touch Carousel) |
| `I2/CAROUSEL-CONTROL` (no foreign child) | PASS: the painted `item-1` is `active`, not inert | PASS |
| `D2/RADIO-PRESSED` (demo) | **12** nodes with `role="radio"` and `aria-pressed`, all on `/dock/overflow` | — |
| `D2/SEARCH-COMBOBOX` (`/dock/dock-search`) | **0** `role="combobox"` | — |
| `D2/OVERFLOW-END` (390×844, focus the first seat of the radiogroup strip, End) | **focus lands on "Home"**; the last control is "Settings" | — |
| `D1/SUMMARY-NESTED` (W-I.1's row, read here) | **3** `role="button"` elements that contain a control (overview, layers, vertical) | — |

## 3 · The cure

1. **One member query.** A single helper, `membersOf(container, marker)`, returns the elements under `container` matching `marker` that are not nested inside another match, in document order. It lives in `src/components/_shared/members/` (three owners: dock, carousel, deck, so it is shared code, not a composable of one of them; W-D.1's placement seal checks it). Each family keeps its own marker: the dock `[data-dock-seat]` (W-I.1 declares it on `DockControl` and the three `DockTrigger` branches), the carousel `[data-slot="carousel-item"]` (`CarouselItem.vue:48`), the deck its slide marker (`.deck-slide`, `deck/styles/stage.css:113`). `seatsOf`, `members()` in `CarouselContent.vue` and `members()` in `useDeckSnap.ts` are deleted and call the helper. The roving stop, reach, the key map, the snap index, the count and the active state all read it. The carousel's `childList` observer counts members through the helper, so a foreign node never changes the count.
2. **Snap targets follow the marker.** `.glass-dock .dock-run > *` goes; the snap rule is `.dock-run [data-dock-seat]` (W-I.1's floor already writes it; this wave keeps it and adds the invariant). The carousel and deck snap rules already use their markers.
3. **Home and End defer.** The run's `onKeydown` returns when `event.defaultPrevented` is true, so an inner composite (a radiogroup from `useSelectionGroup`) that handled Home or End keeps its result. The run calls `preventDefault` only on keys it acted on.
4. **The toolbar carries the consumer's name.** The element with `role="toolbar"` receives the consumer's `aria-label` and `aria-labelledby`: `GlassDock` reads those two attributes out of `$attrs` and binds them on the run; every other attribute stays on the root. A dock with no name is allowed (a toolbar may be unnamed) but the demo gives every dock a name, so the demo reads 0 unnamed.
5. **One owner of the selection semantic.** When `DockControl` sits inside a selection group (it receives `role="radio"` or `role="option"` through its attributes), `active` is paint only: it writes `data-active` and no `aria-pressed`. Outside a group it keeps `aria-pressed` (the toggle case). The check is on the rendered role, not a prop, so a consumer cannot produce both.
6. **The dock search is a combobox.** `useDockSearch` returns the attribute bindings for the input (`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`), the listbox (`id`, `role="listbox"`, a name) and each option (`id`, `role="option"`, `aria-selected`). `demo/stories/dock/dock-search.vue` binds them. `demo/stories/data/search.vue` hand-writes the same combobox (`:534-540`, BK π-CURE R4, the per-site cure L08-13 names); it composes the bindings when it composes the dock search, and keeps its own only if it has no dock search (it has none at HEAD, so it keeps its own and the row records why).
7. **Activation announces the control.** With members resolved by the marker, the focus target of a seat is the seat itself, so the status node reads the activated control (L08-06).

## 4 · Files it touches

- New `src/components/_shared/members/membersOf.ts` (and its unit test under the mirrored test tree W-D.2 fixes).
- `src/components/dock/composables/useDockRun.ts` (`seatsOf` deleted; `onKeydown` defers on `defaultPrevented`), `src/components/dock/GlassDock.vue` (the name binding on the run), `src/components/dock/DockControl.vue:109-114` (`aria-pressed` only outside a group), `src/components/dock/composables/useDockSearch.ts` (the combobox bindings).
- `src/components/carousel/CarouselContent.vue:39-42,81-85`, `src/components/deck/composables/useDeckSnap.ts:63-66`.
- `demo/stories/dock/dock-search.vue` (the bindings), `demo/stories/dock/overflow.vue` (unchanged markup; its radiogroup is the fixture for G7).
- `tests/components/custom/dock/g-dock-lattice.test.ts` G-DOCK-REACH / G-DOCK-STATE: the fixture mounts grouped seats, a separator and foreign nodes (the gate at `:432-444` mounts bare buttons today).
- `scripts/probes/band-I/demo-aria.mjs` (appendix A).

## 5 · Acceptance gates

`<label>` is a band-I probe build of the candidate (`node scripts/probes/band-I/build.mjs <wt> <label>`); `<demo>` is the candidate's demo build (`npm run build:demo` output, or the dock harness's `build.mjs` demo).

In the table cells below, `\|` is the Markdown escape for `|`: the command itself uses a bare `|`.

| id | gate | passes when | HEAD reading (run here) |
|---|---|---|---|
| G1 · one member query (static) | `! git grep -nE 'Array\.from\(el\.children\)' -- src/components/carousel src/components/deck && ! git grep -n 'seatsOf' -- src/components/dock` | exit 0: no member set read from element children, and the dock's local `seatsOf` replaced by `membersOf` | **exit 1**: `CarouselContent.vue:41`, `useDeckSnap.ts:65`, `useDockRun.ts:71` (`seatsOf`, reading `run.children` at `:72`). On HEAD + floor: still exit 1 (the carousel and deck reads; the floor's `seatsOf` reads `[data-dock-seat]` but stays dock-local). The floor's `cellsOf` (`useDockRun.ts:83`), which walks `display: contents` for the run's flex items, is a layout read, not a member set, and is not matched |
| G2 · the toolbar is named | `node scripts/probes/band-I/measure.mjs <label> --rows I2`, row `I2/TOOLBAR-NAME` | 0 unnamed | **FAIL**: 3 of 3 unnamed (Chromium; also 3 of 3 on the floor in both engines) |
| G3 · demo toolbars | `node scripts/probes/band-I/demo-aria.mjs <demo>`, row `D2/UNNAMED-TOOLBARS` | 0 unnamed over all eight `/dock/*` routes, every route mounted | **FAIL**: 46 unnamed (Chromium); Playwright WebKit mounted 0 of 8 routes |
| G4 · a foreign child is not a member | row `I2/CAROUSEL-FOREIGN` (the control row `I2/CAROUSEL-CONTROL` must stay PASS) | the painted item is `item-1`, `active`, not `inert`, and `active === 1` | **FAIL** both engines: painted `item-0` `prev` `inert`; control PASS |
| G5 · one owner of the selection semantic | row `D2/RADIO-PRESSED` | 0 nodes with `role="radio"` and `aria-pressed` | **FAIL**: 12 on `/dock/overflow` |
| G6 · the search is a combobox | row `D2/SEARCH-COMBOBOX` | ≥ 1 `role="combobox"` on `/dock/dock-search`, with `aria-controls` resolving to a named listbox | **FAIL**: 0 |
| G7 · Home and End defer to an inner composite | row `D2/OVERFLOW-END` at 390×844 | End from the first seat focuses the last control ("Settings") and it lies inside the port | **FAIL**: focus lands on "Home" |
| G8 · the shell's tab stops | row `D2/SIDEBAR-TABSTOPS` | 1 tab stop for the sidebar dock | **FAIL**: 11 |
| G9 · hold lines from W-I.1's floor | rows `I2/ARROW-SEPARATOR`, `I2/HOME-END-FOREIGN`, `I2/GROUP-TABSTOPS` | PASS in both engines | RED at HEAD (Notifications ×4; Middle/Middle; 4 stops), PASS on HEAD + floor in Chromium and Playwright WebKit. W-I.1 cures them; this wave keeps them |
| G10 · snap targets are declared (static) | `! git grep -n -B1 'scroll-snap-align' -- src/components/dock/styles \| grep -q 'dock-run > \*'` | exit 0: no snap rule targets the run's children | **exit 1**: `run.css:270-271`. HEAD + floor: **exit 0** (the snap rule reads `.dock-run[data-overflowing] [data-dock-seat]`, `run.css:176`); W-I.1 cures it, and it is a hold line here |

Each G row that reads the probe or the demo exits 1 on a FAIL. The two can pass: `I2/CAROUSEL-CONTROL` passes at HEAD, and G9's three rows pass on the floor tree in both engines, so the probe distinguishes a cured tree from HEAD.

## 6 · π and DELTA obligations

Most rows here are DOM and focus reads, not paint. The visual claims are two:

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| the shell sidebar dock, Tab from the skip link to the first seat and ArrowDown through the categories (π-KEYBOARD, RT-31B) | light, dark | Chromium; Playwright WebKit labelled, once W-I.1 lands the crash-free edge | a filmstrip of the focus ring per keypress, before (11 Tab stops) and after (1 Tab stop, arrows walk every category) | G8 and the focus-ring rows of W-K.4's register |
| `/dock/overflow` at 390×844 after End | light | Chromium, Playwright WebKit | the strip with the focused control, before (focus on "Home", `scrollLeft` 0) and after ("Settings" inside the port) | G7 |

Captures under `.cache/evidence/W-I.2/`; the wave record inlines each PNG's path, sha256, command and the paired row. Real Safari: UNMEASURED (OW-3).

## 7 · MIGRATION rows (clean break, no alias)

| removed or changed | successor | wave |
|---|---|---|
| a child of `GlassDock`'s run, `CarouselContent` or the deck strip that is not a library member was counted as a seat, item or slide | only marked members count (`DockControl`, `DockTrigger`, `CarouselItem`, the deck's slide). A consumer's own element that must be a dock seat carries `data-dock-seat` | this |
| `aria-label` / `aria-labelledby` passed to `GlassDock` landed on the root `div` | they land on the `role="toolbar"` run; a consumer stylesheet or test that selected `.glass-dock[aria-label]` selects `[role="toolbar"][aria-label]` | this |
| `DockControl :active` inside a `useSelectionGroup` group wrote `aria-pressed` | inside a group `active` is paint only (`data-active`); the group's `aria-checked` or `aria-selected` is the state | this |
| `useDockSearch` returned no ARIA bindings | it returns `inputAttrs`, `listboxAttrs` and `optionAttrs(i)`; a consumer that hand-wrote combobox attributes removes them | this |

## 8 · Dependencies and ledger rows

Edges: PLAN §5. Closes F-19 (L08-05, L08-06, L08-13, L08-17, R2-04-10, R3-01-15, R3-02-14, R7-01-07, R7-01-08, R7-02-01; L08-16 through W-I.1) and RT-31B. The note on the rejected L04-F10 ("an ARIA-role arm for widgets that own arrows but do not `preventDefault`", `REGISTRY.md` §2) is met by §3 item 3: the run defers on `defaultPrevented`, and a widget that owns arrows without `preventDefault` is W-K.6's keystroke predicate.

## Appendix A · `demo-aria.mjs`

Scratch source, reproduced so a seat can replay it after a scratch wipe. It serves a demo build with a single-page fallback and reads eight `/dock/*` routes at 1440×1000 (reduced motion), the shell sidebar's tab stops on `/dock/overview`, and End on `/dock/overflow` at 390×844. A route that fails to mount is a FAIL row, and a count row passes only when every route mounted (so a crash can never read as 0 defects).

```js
// band-I demo rows (W-I.1 L08-16, W-I.2 F-19). node demo-aria.mjs <demo-dist-dir> [--engines chromium,webkit]  exits 1 on any FAIL row
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import os from "node:os"; import { pathToFileURL } from "node:url";
const NM = "<repo>/node_modules"; const { chromium, webkit } = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const root = path.resolve(process.argv[2]); const ai = process.argv.indexOf("--engines"); const ENG = (ai > 0 ? process.argv[ai + 1] : "chromium,webkit").split(",");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
const srv = http.createServer((q, s) => { let p = path.join(root, decodeURIComponent(new URL(q.url, "http://x").pathname)); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(root, "index.html"); s.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(s); });
await new Promise((r) => srv.listen(0, "127.0.0.1", r)); const base = `http://127.0.0.1:${srv.address().port}`;
let fails = 0; const row = (r) => { if (r.pass === false) fails++; console.log(`${r.pass === false ? "FAIL" : r.pass ? "PASS" : "RECORD"} ${r.gate} ${r.eng} ${JSON.stringify(Object.fromEntries(Object.entries(r).filter(([k]) => !["gate", "eng", "pass"].includes(k))))} load=${os.loadavg()[0].toFixed(1)}`); };
const ROUTES = ["/dock/overview", "/dock/layers", "/dock/vertical", "/dock/sections", "/dock/controls", "/dock/overflow", "/dock/cta-receive", "/dock/dock-search"];
for (const eng of ENG) { const bt = eng === "chromium" ? chromium : webkit; const b = await bt.launch();
  const go = async (route, vp = { width: 1440, height: 1000 }) => { const ctx = await b.newContext({ viewport: vp, reducedMotion: "reduce" }); const p = await ctx.newPage(); try { await p.goto(base + route, { waitUntil: "networkidle", timeout: 30000 }); await p.waitForSelector(".glass-dock", { state: "attached", timeout: 15000 }); await p.waitForTimeout(600); return p; } catch (e) { row({ gate: "MOUNT", eng, route, crashed: String(e.message).split("\n")[0], pass: false }); await ctx.close(); return null; } };
  const unnamed = [], radioPressed = [], nested = [], combos = []; let mounted = 0;
  for (const route of ROUTES) { const p = await go(route); if (!p) continue; mounted++;
    const r = await p.evaluate(() => { const name = (el) => (el.getAttribute("aria-label") || (el.getAttribute("aria-labelledby") ?? "").split(/\s+/).filter(Boolean).map((id) => document.getElementById(id)?.textContent ?? "").join(" ")).trim();
      const tb = [...document.querySelectorAll('[role="toolbar"]')]; const rp = [...document.querySelectorAll('[role="radio"][aria-pressed]')];
      const ns = [...document.querySelectorAll('[role="button"]')].filter((e) => e.querySelector('button, a[href], [role="button"], input, select, textarea'));
      return { toolbars: tb.length, unnamed: tb.filter((t) => !name(t)).length, radioPressed: rp.length, nestedInteractive: ns.length, combobox: document.querySelectorAll('[role="combobox"]').length }; });
    unnamed.push(`${route}:${r.unnamed}/${r.toolbars}`); radioPressed.push(`${route}:${r.radioPressed}`); nested.push(`${route}:${r.nestedInteractive}`); if (route === "/dock/dock-search") combos.push(r.combobox);
    await p.context().close(); }
  const sum = (a) => a.reduce((s, x) => s + +x.split(":")[1].split("/")[0], 0);
  row({ gate: "D2/UNNAMED-TOOLBARS", eng, total: sum(unnamed), perRoute: unnamed.join(" "), mounted, pass: mounted === ROUTES.length && sum(unnamed) === 0 });
  row({ gate: "D2/RADIO-PRESSED", eng, total: sum(radioPressed), perRoute: radioPressed.join(" "), mounted, pass: mounted === ROUTES.length && sum(radioPressed) === 0 });
  row({ gate: "D1/SUMMARY-NESTED", eng, total: sum(nested), perRoute: nested.join(" "), mounted, pass: mounted === ROUTES.length && sum(nested) === 0 });
  row({ gate: "D2/SEARCH-COMBOBOX", eng, combobox: combos[0], pass: combos[0] > 0 });
  { const p = await go("/dock/overview"); if (p) {
      await p.evaluate(() => { const b = document.createElement("button"); b.id = "__pre"; b.textContent = "pre"; document.body.prepend(b); }); await p.focus("#__pre"); let stops = 0;
      for (let i = 0; i < 60; i++) { await p.keyboard.press(eng === "webkit" ? "Alt+Tab" : "Tab"); const inDock = await p.evaluate(() => !!document.activeElement?.closest("[data-testid=sidebar-dock-collapsible]")); if (inDock) stops++; else if (stops > 0) break; }
      row({ gate: "D2/SIDEBAR-TABSTOPS", eng, stops, pass: stops === 1 }); await p.context().close(); } }
  { const p = await go("/dock/overflow", { width: 390, height: 844 }); if (p) {
      const first = p.locator('[role="radiogroup"][aria-label="Scrollable app strip"] button').first(); await first.focus(); await p.keyboard.press("End"); await p.waitForTimeout(500);
      const r = await p.evaluate(() => { const a = document.activeElement; const port = a?.closest(".dock-run"); const ar = a?.getBoundingClientRect(), pr = port?.getBoundingClientRect(); return { focused: a?.getAttribute("aria-label") ?? a?.textContent?.trim(), inside: !!(ar && pr && ar.left >= pr.left - 0.5 && ar.right <= pr.right + 0.5), last: [...document.querySelectorAll('[role="radiogroup"][aria-label="Scrollable app strip"] button')].at(-1)?.getAttribute("aria-label") }; });
      row({ gate: "D2/OVERFLOW-END", eng, ...r, pass: r.focused === r.last && r.inside }); await p.context().close(); } }
  await b.close(); }
srv.close(); console.log(`VERDICT demo: ${fails} FAIL`); process.exit(fails ? 1 : 0);
```
