# W-I.4 · W-DOCK-COMPOSE-DECIDE: the dock composition facilities, decided inside D2 (loop D2) · 11.0.0

| field | value |
|---|---|
| seat | band-I wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8536f2cc` in a scratch worktree; `src` is the published 10.1.0 |
| kind | a DECIDE wave (the charter's form for a disease row: F-14's asks rode BI, BJ and BK without a terminal, `CHARTER.md:23`) and a loop D2 wave (fix-2, FA-15): the composition subjects are dock design questions, so D2 carries each as a witness row or a RETIRE question (PLAN §4 obligations), and this wave lands D2's rulings on the converged dock. The registry placed W-DOCK-COMPOSE-DECIDE "inside the dock design loop" (`audit/REGISTRY.md:339`) |
| ships in | 11.0.0 (the BUILD rows land in this wave) |
| families | F-14, the R2-06-01 split (`audit/REGISTRY.md:326`, `:334`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| ruler | the owner for every RETIRE of an owner ask (OW-9d, `ledger/CENSUS.md:233`); this seat for the FOLD and BUILD rulings, each with its gate |
| instruments | `seq-probe.mjs` (appendix A) over the demo build; it lands under `scripts/probes/band-I/` and its rows join W-A.3's wired set |

## 1 · What it closes

R2-06-01's 11 owner rows (`audit/round-2/R2-06.md:28,48`), grouped by subject. HEAD has 0 symbols for any of `useDockLink`, `DockHub`, `SubDock`, `NowPlaying`, `goo-spacing`, `dock-goo` in `src` and `demo` (`git grep -niE` run here, 0 lines).

| subject | rows | what exists at HEAD |
|---|---|---|
| S1 · the link verb ("the KISS dock LINK-API, the largest API gap") | BDU R28; BD2 A47 (its `useDockLink` half) | `DockControl` takes reka's `as` and `as-child` (`dock/DockControl.vue:62-65`, rendered through `Primitive` at `:160`), and the run reads `aria-current` as the open seat (`useDockRun.ts`). The shell docks' destinations are buttons, which F-42's "destinations are links" row names (W-K.6) |
| S2 · dock-as-hub: expand from the dock into arbitrary facilities, and the bloom to a fullscreen card | BDM B1; BDH R5.B1; BDU R20 | `DockLayerGroup` / `DockLayer` drill into another seat set inside the one dock; `shape="card"` is the dock's card rung (W1's card cells); `ExpandableContainer` is the library's expand morph for page content. No dock verb blooms into a page surface |
| S3 · the three-island constellation (home · now-playing · search) | BDU R26 | nothing; a consumer can place three docks. No consumer does (0 hits in value.js, keyframes.js, fourier-analysis, chicago for a multi-dock row, by the round-2 seat's read) |
| S4 · the floating stadium-pill shape | BDU R24 | `shape="pill"`, which rests as a lens or a D whenever the run overflows (F-18; W-I.1 §2) |
| S5 · the recessed ghost-satellite register | BDU R27 | a recessed seat register exists: `[data-tier="secondary"]` on dock tabs and icons (`dock/styles/controls/tab-button.css:144`); no detached satellite dock |
| S6 · the goo-spacing merge threshold; the small-vs-large flip | BDU R29 | no goo carrier in the dock; the small-vs-large flip is the collapsed ↔ expanded morph |
| S7 · the dock as one organism: nav → media → split → subdock → minimize → search | BD2 A44 | nav and media are layers, subdock is `DockLayerGroup`, minimize is collapse, search is `useDockSearch`; split is fission, retired in code (`GlassDock.vue:19-20`) |
| S8 · the search terminus blooms into a field | BD2 A46 | `useDockSearch` morphs a pill into a field. On its own story (`demo/stories/dock/dock-search.vue:179-196`) the pill sits in `#collapsed` of a `:collapse="false"` dock, so it never paints: `visibility: hidden` in an `inert` summary layer, and the field is always open (run here) |
| S9 · the silhouette engine wired | BD2 A47 (its silhouette half) | retired at BI (R2-06 row A47: "the silhouette half was retired at BI"); no terminal row with the ruling quoted |

## 2 · The defect at HEAD

Eleven owner asks with no terminal disposition since BD. BI's dock-retire JSON disposed eight other dock items, and BK #47's spec omitted these (L05b-06). The formation LEDGER carries the subject row (R2-06-01, LEDGER:455) and the owner docket row this wave answers (OW-9d, LEDGER §4); the per-subject rulings are this wave's, inside D2.

The two subjects that exist in code fail in paint on the demo (`seq-probe.mjs`, Chromium, run here on the HEAD demo build):

| row | HEAD |
|---|---|
| `CONTROL/CONTINUOUS` (a planted 400 ms width transition, 100 → 300 px, same sampler) | PASS: largest step 7.87 px of 200, 46 distinct extents |
| `S7/SUBDOCK-IN` (`/dock/layers`: drill into a layer) | **FAIL**: 313.31 → 395.75 px in one frame (step 82.44 of 82.44, 2 distinct extents over 106 frames) |
| `S7/SUBDOCK-OUT` (Back) | **FAIL**: 395.75 → 313.31 px in one frame (82.44 of 82.44, 2 distinct) |
| `S8/SEARCH-BLOOM` (`/dock/dock-search`: arm the search pill) | **FAIL**: the arm control never paints (`locator.click: Timeout 30000ms exceeded`; the button is `visibility: hidden` in the inert summary layer of a `collapse="false"` dock) |

Playwright WebKit crashes on every dock route at HEAD (W-I.1 §2.2); these rows run in both engines once W-I.1 lands the crash-free edge.

## 3 · The cure: one terminal per subject

Each subject gets exactly one of BUILD (with a born-RED e2e, built here), FOLD (into a named wave that already owns the mechanism, with that wave's gate) or RETIRE (with rationale; an owner ask's RETIRE carries the owner's quote through W-B.4's docket, OW-9d). The seat's rulings:

| subject | ruling | ground | gate |
|---|---|---|---|
| S1 · link verb | **FOLD into W-K.6** ("destinations are links"). The verb is `DockControl as-child` around the consumer's router link; no `useDockLink` is minted | one verb exists and is typed; a second (a composable that wraps the first) is a second path to one fact (E-1, P-3). What is missing is the shell using it, which is F-42's row | W-K.6's link row; this wave adds the dock case to it: the shell's destinations render `<a href>` with `aria-current="page"` on the current one and no `aria-pressed` |
| S2 · dock-as-hub, fullscreen bloom | **FOLD** the hub into the converged dock: `DockLayerGroup` layers are the facility slots and `shape="card"` is the bloom's rung, both riding the one spring (W-I.1 §3.3 row 1). **RETIRE** the fullscreen bloom (OW-9d) | the dock has one morph; a bloom from the dock into a page surface is a second carrier across two components with no consumer (E-5, E-7). `ExpandableContainer` owns page-content expansion | the S7 rows (the layer legs ride one extent) and W-I.1's W1 card cells |
| S3 · three islands | **RETIRE** (OW-9d) | no consumer composes three docks; three `GlassDock`s side by side need nothing the library lacks, and W-I.1's refcounted scroll binder already covers docks that share a scroller (A X-1). A library "constellation" component would have one site (E-7) | — |
| S4 · stadium pill | **FOLD into W-I.1** (the plate is a stadium at every rest) | the ask is exactly F-18's cure | W-I.1 G1 (W1 22/22, both engines) |
| S5 · ghost satellite | **RETIRE** the detached satellite (OW-9d); the recessed seat register is `[data-tier="secondary"]` | a recessed register exists and ships; a detached second dock is S3's case | — |
| S6 · goo spacing; small-vs-large flip | **RETIRE** the goo merge (OW-9d). **FOLD** the flip into W-I.1 (the collapsed ↔ expanded morph) | a goo merge is a second silhouette engine beside the plate's stadium geometry, the subject BI retired with S9; neither D2 route carries one, and D2-D's drawn silhouette is BANKED on a refuted primitive (`design/dock/REGISTRY.md:135-157`) | W-I.1 G3 (W3 warm pair) |
| S7 · one organism | **BUILD**, as a sequence e2e over the facilities that exist: nav → subdock → back → minimize → expand → search, each leg one continuous extent. The split leg is **RETIRED** with Q-9 (fission) | every leg but split is a shipped facility; the ask is that they read as one body, which W-I.1's one-spring rule makes true and this e2e holds across the sequence | G3, G4 (born RED: 82.44 px in one frame each way) |
| S8 · search terminus bloom | **BUILD** on its story: the dock-search story becomes a `collapse="closed"` dock whose summary is the search pill, and arming it blooms the field on the one spring | the mechanism exists (`useDockSearch`); its story never shows it | G5 (born RED: the arm control never paints) |
| S9 · silhouette engine | **RETIRE**, the BI ruling quoted into the ledger row | retired at BI; D2's routes keep the plate's box geometry; D2-D's `shape()` fill is refuted in Chromium (PF-4) | — |

The owner is asked once, in W-B.4's docket: one question listing S2's fullscreen bloom, S3, S5's satellite, S6's goo merge and S7's split leg, each with its source row, and the answer is quoted verbatim into each ledger row. On owner silence at W-L.8, each such row's terminal is "RETIRE recommended, OW-9d not answered", listed in FINAL.md, never re-booked. If the owner answers BUILD for a row, that row takes a born-RED from W-I.1's harness (a new scene) before its code lands, and this wave builds it.

## 4 · Files it touches

- `docs/tranches/BL/LEDGER.md` (one row per subject, OW-9d), `docs/tranches/BL/ledger/RECAP.md` (the 11 carry rows cite this wave).
- BUILD S7: `scripts/probes/band-I/seq-probe.mjs` (appendix A) extended to the full sequence on `/dock/layers` and the shell BottomDock; its rows join W-A.3's wired set.
- BUILD S8: `demo/stories/dock/dock-search.vue:179-196` (the dock collapses; the pill is its summary). No `src` change unless W-I.1's converged spec leaves the search face outside the one spring, in which case `src/components/dock/composables/useDockSearch.ts` routes the arm through the chart's `send()`.
- FOLD S1: a row added to W-K.6's gate list (the shell's destinations as links).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading (run here) |
|---|---|---|---|
| G1 · the owner has ruled the RETIREs | `! grep -qE '^\\| OW-9d \\|.*\\| pending \\|' docs/tranches/BL/LEDGER.md` | exit 0 | **exit 1** (OW-9d `pending`; fix-2) |
| G3 · S7, the subdock legs | `node scripts/probes/band-I/seq-probe.mjs <demo>` rows `S7/SUBDOCK-IN`, `S7/SUBDOCK-OUT` | the largest single-frame step ≤ 25 % of the travel and ≥ 3 distinct extents, both engines | **FAIL 2 of 2** Chromium: 82.44 of 82.44 px in one frame, 2 distinct extents; Playwright WebKit crashes on the route |
| G4 · S7, the whole sequence | the extended `seq-probe.mjs` sequence row (nav → subdock → back → minimize → expand → search on one dock) | every leg passes G3's bound | **FAIL** at its subdock legs (G3); the other legs are W-I.1 G3's warm pair, RED at HEAD (one step ×8.12 on the first expand, a 541-602 ms window) |
| G5 · S8, the bloom on its story | row `S8/SEARCH-BLOOM` | the pill paints, the click arms it, and the extent blooms under G3's bound, both engines | **FAIL**: the arm control never paints (click timeout; `visibility: hidden`, inert summary layer) |
| G6 · the carry | `node scripts/tranche/verify-recap.mjs docs/tranches/BL` (the 11 rows present, terminal W-I.4) | exit 0 | **exit 1**: `Cannot find module` (W-B.3 builds it) |

No RETIRE has a code gate: those subjects have no code at HEAD, so no code gate can be RED for them. G1, the owner's docket line, is their gate.

## 6 · π and DELTA obligations

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| `/dock/layers` drill in and back (S7) | light, dark | Chromium; Playwright WebKit once W-I.1 lands | a per-frame strip of the dock, before (one-frame jump) and after | G3 rows |
| the one-organism sequence on one dock (S7) | light, dark | Chromium, Playwright WebKit | a filmstrip of every leg | G4 per leg |
| the dock-search story's bloom (S8) | light, dark | Chromium, Playwright WebKit | the pill at rest, three in-flight frames, the field at rest | G5 |
| RETIRE and FOLD rows | — | — | none | — |
| real Safari | both | — | UNMEASURED (OW-3) | — |

Captures under `.cache/evidence/W-I.4/`; the wave record inlines each PNG's path, sha256, command and paired row.

## 7 · MIGRATION rows

None. No RETIRE removes a shipped surface (none of the retired facilities has code), the BUILD rows compose existing API, and S8 changes a demo story only.

## 8 · Dependencies and ledger rows

Its edges are PLAN §5's. Closes R2-06-01's 11 rows and OW-9d, the dock subset of OW-9d. S1's verb is a named row of W-K.6; S2's hub, S4 and S6's flip are W-I.1's gates; nothing is re-booked.

## Appendix A · `seq-probe.mjs`

Scratch source, reproduced so a seat can replay it after a scratch wipe. It serves a demo build with a single-page fallback, samples the dock plate's painted width per animation frame for 900 ms after each action, and reports the largest single-frame step against the total travel. A leg whose control never becomes clickable is a FAIL row.

```js
// W-I.4 S7/S8: the one-organism legs on the demo ride one continuous extent.
// node seq-probe.mjs <demo-dist-dir> [--engines chromium,webkit]; per leg: the dock's painted main-axis extent per rAF for 900 ms
// after the action; pass when the largest single-frame step is ≤ 25 % of the total travel and ≥ 3 distinct extents (travel ≥ 20 px)
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import os from "node:os"; import { pathToFileURL } from "node:url";
const NM = "<repo>/node_modules"; const { chromium, webkit } = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const root = path.resolve(process.argv[2]); const ai = process.argv.indexOf("--engines"); const ENG = (ai > 0 ? process.argv[ai + 1] : "chromium,webkit").split(",");
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
const srv = http.createServer((q, s) => { let p = path.join(root, decodeURIComponent(new URL(q.url, "http://x").pathname)); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(root, "index.html"); s.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(s); });
await new Promise((r) => srv.listen(0, "127.0.0.1", r)); const base = `http://127.0.0.1:${srv.address().port}`;
let fails = 0; const row = (r) => { if (r.pass === false) fails++; console.log(`${r.pass === false ? "FAIL" : "PASS"} ${r.gate} ${r.eng} ${JSON.stringify(Object.fromEntries(Object.entries(r).filter(([k]) => !["gate", "eng", "pass"].includes(k))))} load=${os.loadavg()[0].toFixed(1)}`); };
const LEGS = [
  { gate: "CONTROL/CONTINUOUS", route: "/dock/layers", control: true },
  { gate: "S7/SUBDOCK-IN", route: "/dock/layers", dock: '[data-testid="dock-layer-drill-group"]', act: '[data-testid^="dock-layer-open-"]' },
  { gate: "S7/SUBDOCK-OUT", route: "/dock/layers", dock: '[data-testid="dock-layer-drill-group"]', pre: '[data-testid^="dock-layer-open-"]', act: 'button[aria-label="Back"]' },
  { gate: "S8/SEARCH-BLOOM", route: "/dock/dock-search", dock: 'button[aria-label="Open search"]', act: 'button[aria-label="Open search"]' },
];
for (const eng of ENG) { const bt = eng === "chromium" ? chromium : webkit; const b = await bt.launch();
  for (const L of LEGS) { const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } }); const p = await ctx.newPage();
    try { await p.goto(base + L.route, { waitUntil: "networkidle", timeout: 30000 });
      if (L.control) { // the sampler on a planted continuous motion: a 400 ms width transition, 100 → 300 px
        await p.evaluate(() => { const d = document.createElement("div"); d.id = "__ctl"; d.style.cssText = "position:fixed;left:0;top:0;height:10px;width:100px;background:red;transition:width 400ms ease-in-out"; document.body.append(d); });
        await p.waitForTimeout(200); L.dock = "#__ctl"; L.act = null; }
      else await p.waitForSelector(L.act, { state: "attached", timeout: 15000 }); await p.waitForTimeout(800);
      if (L.pre) { await p.locator(L.pre).first().click(); await p.waitForTimeout(1200); }
      await p.evaluate((sel) => { const t = document.querySelector(sel); const el = t.closest(".glass-dock"); const plate = el ? (el.querySelector(".dock-plate") ?? el) : t; window.__w = []; const t0 = performance.now(); const tick = () => { const r = plate.getBoundingClientRect(); window.__w.push(+Math.max(r.width, 0).toFixed(2)); if (performance.now() - t0 < 900) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, L.dock);
      if (L.control) await p.evaluate(() => { document.getElementById("__ctl").style.width = "300px"; }); else await p.locator(L.act).first().click(); await p.waitForTimeout(1100);
      const w = await p.evaluate(() => window.__w); const travel = Math.abs(w.at(-1) - w[0]); let step = 0; for (let i = 1; i < w.length; i++) step = Math.max(step, Math.abs(w[i] - w[i - 1]));
      const distinct = new Set(w.map((x) => Math.round(x))).size;
      row({ gate: L.gate, eng, from: w[0], to: w.at(-1), travel: +travel.toFixed(2), maxStep: +step.toFixed(2), stepShare: +(travel ? step / travel : 0).toFixed(2), distinct, frames: w.length, pass: travel < 20 ? null : step <= 0.25 * travel && distinct >= 3 });
    } catch (e) { row({ gate: L.gate, eng, crashed: String(e.message).split("\n")[0], pass: false }); }
    await ctx.close(); }
  await b.close(); }
srv.close(); console.log(`VERDICT seq: ${fails} FAIL`); process.exit(fails ? 1 : 0);
```

A leg whose travel is under 20 px records `pass: null` and counts as neither PASS nor FAIL; the landing wave checks every gated leg travelled.
