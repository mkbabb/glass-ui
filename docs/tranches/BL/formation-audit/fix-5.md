# BL — formation fix, seat 5

| field | value |
|---|---|
| seat | formation fix seat 5, before audit pass 5. Answers `formation-audit/pass-4.md` (FD-01 to FD-03) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `c42aee9d` (the pass-4 commit) for every probe. A scratch worktree at `HEAD` (`scratchpad/formation/fix-5/wt`, `node_modules` and `tests-visual/node_modules` symlinked), removed before return. `src` is the published 10.1.0. Load average 42-47 |
| engines | Chromium (Playwright's build) for the anchor probe. No Playwright WebKit run. Real-Safari cells stay UNMEASURED (OW-3) |
| writes | `PLAN.md`, `LEDGER.md`, `waves/INDEX.md`, `waves/W-0.10.md`, `W-E.2.md`, `W-E.6.md`, `W-F.2.md`, `W-F.3.md`, `W-G.4.md`, `W-H.1.md`, `W-J.1.md`, `W-L.1.md`, and this file. Nothing under `design/` (read only: `design/material/REGISTRY.md` FL-6, `design/engagement/`). No tracked source, no git write in the checkout. The plan has no `MIGRATION.md` of its own |
| fixtures | in this seat's scratchpad, outside the checkout: the anchor probe (`fix-5/probe/`, printed in appendix R) and a git copy of `src` with the six FL-6 state tokens re-pointed (`fix-5/bite/`) |

## Result

All three findings are cured in the plan folder. None is refuted.

- **FD-01.** G-L1-7 now reads the case that is broken: one anchor object whose rect moves in place. It exits 1 at `c42aee9d`, and a plant of reka's frame-driven update makes it exit 0.
- **FD-02.** State fills leave W-E.2 and W-E.6. W-H.1 builds them on D3's floor row FL-6, which the plan now takes in (§3.2 item 8, three gates, two MIGRATION rows). #84a moves to W-H.1 in the ledger.
- **FD-03.** PLAN §5 gains five edges: W-E.7 → W-E.2, W-F.3 → W-F.2, W-G.4 → W-G.3, W-G.4 → W-G.7 and W-H.1 → W-E.6. The W-E.6 → W-E.2 dependence goes away with FD-02's cure. Three specs that restated edges now cite §5.

After the edits, a walk of PLAN §5 reads 99 rows, 0 dangling ids, 0 edges into a later band, and 0 cycles (Python `graphlib` topological order over all 99). Each FD-03 pair is now ordered. A column-count check over every table in the 12 edited files finds 0 mismatches.

## Findings

### FD-01 · G-L1-7 passes at HEAD, and the live defect has no gate

**Cured.** The gate now reads the in-place move.

- **The reading at HEAD.** fix-5's probe (appendix R) is crit-4's scene rebuilt against this seat's worktree. It uses one `shallowRef` reference object whose `getBoundingClientRect` reads a mutable point. `node gate.mjs head` printed:
  `{"rest":{"top":414,"cx":705},"moved_in_place":{"top":414,"cx":705},"swap_300_200":{"top":214,"cx":305},"pass":false}` and exited **1**.
  The in-place move to (900, 600) leaves the content where it was. A swap to a new object re-seats it, as pass 4 read.
- **The bite.** The same scene with `update-position-strategy="always"` on `PopoverContent` (an untyped fallthrough to reka's `PopperContent`, whose `autoUpdate` takes `animationFrame` under that value, `reka-ui/dist/Popper/PopperContent.js:212-214`, reka-ui 2.10.1) printed `moved_in_place` top 614, cx 905 and exited **0**. So the gate can pass on a real mechanism.
- **Edits:**
  - `waves/W-L.1.md:88`: new §2 row B4, the in-place move, **fail** at `c42aee9d`.
  - `:118` (§3.6): the case is one reference object whose rect moves. A swap is not the case. Whatever the wave forwards to reka is a declared prop, never an untyped fallthrough, as W-0.10 did for `reference`. The plan picks no mechanism beyond reka's own update path.
  - `:194`: G-L1-7 is rewritten. It runs `node gate.mjs`, passes on top in [610, 650] and centre x within 40 px of 905, and records its HEAD reading (**exit 1**) and bite.
  - `:208`: the note no longer calls G-L1-7's static arm a hold line.
  - `:223` (§6): a π row for the moving-anchor frames.
- **Other edits.**
  - `LEDGER.md:184` (#76b) names the in-place case and its born-RED.
  - `waves/W-0.10.md:18` uses the same wording.
  - `PLAN.md:33` adds "fix-5's probe" to the fixture-app rule, so the scene is on record in appendix R and not only in a scratchpad.

### FD-02 · W-E.2 and W-E.6 route state fills onto the plate token, which D3's floor FL-6 rules out

**Cured at the cause.** PLAN §1 says a loop's floor row is built by that loop's wave. FL-6 (`design/material/REGISTRY.md:318`) is D3's floor row for every route. So the state-fill mechanism moves to W-H.1, D3's ink wave, and the band-E waves stop fixing it.

- **W-E.2.**
  - §3 item 4 is struck, with the reason (`waves/W-E.2.md:63`).
  - The #84 row in §1 (`:20`), the families field (`:9`) and E2-G3 (`:80`, struck and moved) point to W-H.1.
  - `toggle-group/styles.css` leaves §4.
  - The MIGRATION row that told consumers to set `--control-surface-bg` is deleted.
  - §6, §8 and §9 no longer name the toggle.
  - The note under the gates reads 18 of 18 rows RED without G3.
- **W-E.6.**
  - §3 item 4 (`waves/W-E.6.md:61`) keeps only the blend removal: the `::after` flood and `plus-lighter` go. The selected fill, its α < 1 and its ink are W-H.1's. The chip keeps HEAD's fill until W-H.1 lands.
  - E6-G2 (`:77`) gates the blend alone and is still RED (`plus-lighter`). Appendix A's G2 row asserts the blend only and records `alpha`.
  - The families field (`:9`) and §8 (`:114`) mark F-28 as split.
- **W-H.1.**
  - Families (`waves/W-H.1.md:10`) take the F-21 split #84a and the F-28 split for X-G1's fill.
  - §1 rows at `:28-29`.
  - §3.2 item 8 (`:98`) builds FL-6: no state fill or dim reads a plate token, and state fills read the one-ink fill register (`--fill-hover`, `--fill-selected`, which Button, Card and Configurator already read). It names the six plate-reading state tokens at HEAD and takes ToggleGroup's on state and the chip's selected fill. The full list is D3's converged spec's.
  - §4 files.
  - Three gates:
    - **H1-G21** (`:168`): W-E.2's former E2-G3, ΔE_OK(on, off) ≥ 0.02 in light, dark and PRT. The HEAD reading, 2 of 3 FAIL (dark 0.0013, PRT 0), is carried from W-E.2's seat at `4d2e3123`. This seat did not re-run it.
    - **H1-G22** (`:169`): the selected chip's `background-color` α < 1. The HEAD reading, opaque, is carried from W-E.6's seat at `4d2e3123`.
    - **H1-G23** (`:170`), a static gate this seat ran. The command has six `-e` patterns and no pipe, so the raw and rendered forms are one command. It exits **1** at `c42aee9d` with 6 lines: `menu.css:10`, `glass.css:257`, `scale-paper.css:106`, `sizing.css:206,207,225`. On a git copy of `src` with those six declarations re-pointed at `oklch(from var(--foreground) l c h / var(--fill-selected))`, it exits **0**. The unedited copy, under the equivalent `grep -rnE`, exits **1**. It reads one-line declarations only, and the row says so.
  - The π row (`:192`), two MIGRATION rows (`:203-204`) and the §8 closes line (`:212`).
- **PLAN.**
  - Amended line (`:11`).
  - Band H families (§2) take the F-21 and F-28 splits.
  - W-E.2's scope line (`:146`) loses "a state fill writes the plate token" and names W-H.1.
  - The W-E.6 and W-H.1 scope lines (`:150`, `:188`).
  - The D3 obligations (`:259`): FL-6's list, and a note that the chip's DESIGN-NOW accent band (X-G1) is to be reconciled with the one-ink register by D3's converged spec. That is the loop's to write.
  - §7: #84 leaves band E, and #84a joins band H.
- **INDEX.** Rows W-E.2, W-E.6 and W-H.1, and F-28 added to the split list.
- **LEDGER.**
  - `:200`: #84a moves to BUILD W-H.1 with H1-G21.
  - `:108`: #43 notes X-G1's fill on W-H.1.
  - The terminal words do not change, so the §9 totals stand.
- **W-J.1.** `waves/W-J.1.md:24` points P4's contrast at W-H.1.
- **Why not keep the cure in band E and re-point it at the fill register?** FL-6 is still a floor row inside a loop that has not converged. Its values and the layering over `.control-surface` belong to D3's converged spec. Building them in band E would make band E the loop's first builder, which PLAN §1 forbids for a floor row. W-H.1 already carries the sibling rows (`--dock-control-active-bg`, the menu row, state separation), so this adds one item to that wave and does not open a new mechanism.

### FD-03 · Within-band dependencies the specs state that §5 does not carry

**Cured by adding the edges to PLAN §5**, the one record, with the reasons in its notes:

| pair | edit | reason (PLAN §5 notes, `PLAN.md:375-378`) |
|---|---|---|
| W-E.7 → W-E.2 | `PLAN.md:314` | W-E.7's coarse hit areas are W-E.2 §3.6's `::after` mechanism, and its Dialog pad pairs with the 24 px corner W-E.2 restores. W-E.9 and W-E.10 reach W-E.2 through W-E.7 (checked: both `True` in the closure) |
| W-E.6 → W-E.2 | none needed | the dependence was W-E.6 §3 item 4's "plate token from W-E.2 §3.4", struck by FD-02. `grep -c W-E.2 waves/W-E.6.md` → 0 |
| W-G.4 → W-G.3, W-G.7 | `PLAN.md:332` | the field runs on W-G.3's clock, both waves edit `aurora/composables/{frameLoop,useCursorInteraction,runtime}.ts`, and the drift utility ships through W-G.7's per-subpath CSS. W-G.7 does not name W-G.4, so there is no cycle |
| W-F.3 → W-F.2 | `PLAN.md:324` | W-F.2 owns the release seat and the probe libraries W-F.3 imports. W-F.3 replaces the velocity the seat reads. `waves/W-F.2.md:72` now says W-F.2 reads the engine's velocity reader at its base, and W-F.3 replaces it, so each wave holds one half and the order is fixed |
| W-H.1 → W-E.6 | `PLAN.md:336` | added by FD-02's cure: W-H.1 builds the chip's selected fill |

**Duplicates struck.**
- W-G.4 §8 (`waves/W-G.4.md:121`) restated its edges, and now cites PLAN §5.
- W-F.3 §8 (`:81`) restated `W-F.1, W-E.12`, which went stale the moment the W-F.2 edge landed. It now cites §5 too.
- So does W-F.2 §8 (`:119`).

**Sweep for the class.** A script (`fix-5/dag.py`) reads every spec's "Dependencies" section and lists each wave it names that is unordered against it under §5's closure. What remains:
- hand-off or ownership notes ("W-I.1's", "rides the W-B.2 letter");
- cross-band pairs that band order already sequences (W-H.4 → W-G.3, W-G.6);
- two pairs the specs declare order-free: W-G.1/W-G.2 ("may land before or after") and W-G.5/W-G.4 ("either order, the rows attach when both are in").

None of these is a stated build-on dependency, so no further edge is added.

## Notes from pass 4 outside the checklist

- **PLAN §6 stale on D5.** Fixed.
  - `PLAN.md:386` ("D5, opened by formation") now records the round-0 portfolio at `43093f45`.
  - §4's W-J.2 row cites `design/engagement/REGISTRY.md` §2.1 (E-1..E-8) as the one record of the battery, and no longer restates `engage-ladder.test.ts:134` and T-6 as its start.
  - Band J (§2), §3 and INDEX drop "to open".
  - `LEDGER.md:377` and U-12 are updated.
- **W-D.2's moves outside the path map.** Fixed at the rule. PLAN §1 "Gate paths and the base re-run" (`PLAN.md:29`) now puts W-D.2's own moves (§3 items 1, 2 and 9) into the same ledger, re-pointed in W-D.2's landing commit. This covers E10-G8's `! test -e demo/stories/substrates/aurora/PresetPickerRow.vue`: the file is present at `c42aee9d`, so the gate is RED there.
- **Not taken:**
  - the hold lines with implicit bites (W-0.10 G3, W-0.3 G6, W-0.6 G5, W-0.4 G6, W-0.1 G6/G7);
  - the unlabelled sub-splits (W-B.9's R2-06-04 half, W-D.2's L14-01 execution);
  - W-G.3 against FL-1;
  - O-66 §1 after FL-11.

  None is a finding. The last two are D3's to keep true, and this seat did not widen scope to them.

## Appendix R · the moving-anchor probe (G-L1-7)

Run: `node build.mjs <worktree> head && node gate.mjs head`. Chromium 1440×900, served from the built `dist`. At `c42aee9d`: exit 1 (`moved_in_place` top 414, cx 705). The bite build (`APP=bite/App.vue node build.mjs <worktree> bite && node gate.mjs bite`) exits 0 (top 614, cx 905). When W-L.1 lands, the scene moves into `tests-visual/wired/` (PLAN §1, "fix-2's probe").

`App.vue` (the scene):

```vue
<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { Popover, PopoverTrigger, PopoverContent } from "@glass/components/popover";
const rect = (x: number, y: number) => ({ x, y, left: x, top: y, right: x + 10, bottom: y + 10, width: 10, height: 10, toJSON() {} });
const pos = { x: 700, y: 400 };
const mutable = { getBoundingClientRect: () => rect(pos.x, pos.y) };
const reference = shallowRef<any>(mutable);
(window as any).__swap = (x: number, y: number) => { reference.value = { getBoundingClientRect: () => rect(x, y) }; };
(window as any).__mutate = (x: number, y: number) => { pos.x = x; pos.y = y; };
</script>
<template>
  <div style="height:1200px;width:1400px">
    <Popover :default-open="true">
      <PopoverTrigger style="position:absolute;left:20px;top:20px">t</PopoverTrigger>
      <PopoverContent :reference="reference" side="bottom" data-probe="pc">probe content</PopoverContent>
    </Popover>
  </div>
</template>
```

`build.mjs <worktree> <label>`: fix-2 appendix P's `build.mjs` as crit-4 copied it, with the copied scene taken from `$APP` (default `App.vue`). The bite scene `bite/App.vue` is `App.vue` with `update-position-strategy="always"` added to `PopoverContent`.

```js
import fs from "node:fs"; import path from "node:path";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const [wtArg, label = "head"] = process.argv.slice(2);
const wt = path.resolve(wtArg);
const root = path.join(HERE, "builds", label), app = path.join(root, "app"), dist = path.join(root, "dist");
fs.rmSync(root, { recursive: true, force: true }); fs.mkdirSync(app, { recursive: true });
const nm = `${CHECKOUT}/node_modules`;
fs.writeFileSync(path.join(app, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>crit-4 anchor probe</title>
<script>const q=new URLSearchParams(location.search); if(q.get('theme')==='dark'){document.documentElement.classList.add('dark');}</script></head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>`);
fs.writeFileSync(path.join(app, "main.ts"), `import "./probe.css"; import { createApp } from "vue"; import App from "./App.vue"; createApp(App).mount("#app");`);
fs.writeFileSync(path.join(app, "probe.css"), `@import "${nm}/tailwindcss/index.css" source("./");
@source "${wt}/src/components/**/*.vue";
@source "${wt}/src/components/_shared/**/*.ts";
@source "${wt}/src/components/**/index.ts";
@import "${nm}/tw-animate-css/dist/tw-animate.css";
@import "${wt}/src/styles/index.css";
html,body{margin:0} body{background:var(--background);color:var(--foreground)}
`);
fs.copyFileSync(path.join(HERE, process.env.APP ?? "App.vue"), path.join(app, "App.vue"));
process.env.NODE_ENV = "production";
const { build } = await import(`${nm}/vite/dist/node/index.js`);
const vue = (await import(`${nm}/@vitejs/plugin-vue/dist/index.mjs`)).default;
const tailwindcss = (await import(`${nm}/@tailwindcss/vite/dist/index.mjs`)).default;
const { glassCssTarget } = await import(path.join(wt, "vite.targets.ts"));
await build({ configFile: false, mode: "production", root: app, base: "./", cacheDir: path.join(root, ".vite"), logLevel: "warn", publicDir: false,
  plugins: [tailwindcss(), vue()],
  resolve: { alias: [{ find: "@glass", replacement: path.join(wt, "src") }, { find: /^vue$/, replacement: `${nm}/vue/dist/vue.runtime.esm-bundler.js` }] },
  build: { outDir: dist, emptyOutDir: true, cssTarget: glassCssTarget, target: "esnext", minify: false, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 } });
console.log("built", label, "→", dist);
```

`gate.mjs [label]` (G-L1-7):

```js
// G-L1-7 (rewritten, fix-5): the anchor moves in place. The same reference object's rect
// moves from (700,400) to (900,600); no reference swap, no scroll, no resize. Within 600 ms
// the content must re-seat: top within 40 px below 610 and centre x within 40 px of 905.
import fs from "node:fs"; import path from "node:path"; import http from "node:http";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const { chromium } = await import(`${CHECKOUT}/node_modules/playwright/index.mjs`);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const dist = path.join(HERE, "builds", process.argv[2] ?? "head", "dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
const srv = http.createServer((req, res) => { const p = path.join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname)); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : path.join(dist, "index.html"); res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => srv.listen(0, r));
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
await pg.goto(`http://127.0.0.1:${srv.address().port}/`); await pg.waitForTimeout(800);
const read = () => pg.evaluate(() => { const el = document.querySelector('[data-probe="pc"]'); if (!el) return null; const r = el.getBoundingClientRect(); return { top: +r.top.toFixed(1), cx: +(r.left + r.width / 2).toFixed(1) }; });
const out = { rest: await read() };
await pg.evaluate(() => window.__mutate(900, 600)); await pg.waitForTimeout(600); out.moved_in_place = await read();
await pg.evaluate(() => window.__swap(300, 200)); await pg.waitForTimeout(600); out.swap_300_200 = await read();
const m = out.moved_in_place;
out.pass = !!m && m.top >= 610 && m.top <= 650 && Math.abs(m.cx - 905) <= 40;
console.log(JSON.stringify(out)); await b.close(); srv.close(); process.exit(out.pass ? 0 : 1);
```
