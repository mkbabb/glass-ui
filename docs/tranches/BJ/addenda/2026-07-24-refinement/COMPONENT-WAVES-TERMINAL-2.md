# COMPONENT WAVES — TERMINAL SPECS · TIER 2 (tri-fold)

**Provenance.** `wf_aaa19aee-da2`, 65 seats, 2026-07-25 — the FIRST batch under the tri-fold law:
per component, 3 Opus benches (design/library/implementation) → 2 Opus jurors → Fable foreman ∥ Opus
foreman → **Fable adjudicator** (sagacity + incredulity) → apotheosis. Cached pre-wall Opus seats served
as the Opus arm; nothing re-done.

Tier-2 set (8): drawer · dialog · carousel+deck · sortable-list · search · tags-input · fourier-field ·
constellation. With tier-1: **16 of 62 components now have terminal specs.** Cite this file; the DAG row
is the superseded prior.

---



---

# DRAWER

**DISPOSITION:** MERGE-INTO dialog — DAG merge verdict SUSTAINED, DAG home (`sheet/`) OVERTURNED on three on-disk retirement records (subpath-policy.mjs:56 · src/index.ts:107-110 · PROPORTION K22, all re-pulled this seat); `drawer/` deletes whole, the residue is one engine (detents) + two props (`detents`, `modal:false`) on `<DialogContent placement>`. Both arms agreed on disposition; the adjudication ruled the five cells where they split.

**LOC:** 2,672 → ≈1,576. Drawer 1,613 (940 code / 558 comment 34.6% / 115 blank) → 0; dialog 1,059 (700/285/74) + detents/use.ts 382 + detents/context.ts 30 − dialogStageContext.ts 15 + placement.css +88 + DialogContent.vue +27 − sheet-motion.ts −17 + src/styles/overlay.css 22 = 1,576. Δ −1,096 = −559 code (−34%) −498 comment (−59%) −39 blank. Comment share of the cut is 45.4% — said plainly — but 51% is executable deletion (8 SFCs/modules die outright), NOT a comment cull. Counts reproduced this seat with a block-comment-aware tokenizer: the Opus arm's split is EXACT; the Fable arm's adopted 874/624 and its ≈2,000 terminal are both struck (falsifiers in §REJECTED).

**COLLISIONS:** \n- src/components/dialog/DialogContent.vue — FM W7 (non-reactive springPreset :313-318) + PROPORTION A6 (44px floor); lands inside or after this wave, never beside\n- src/components/dialog/placement.css — MATERIAL W3 owns the library-wide halo adopt/decline; this fold inherits the shipped receiver, W3 may swap later\n- src/components/dialog/ModalOverlay.vue:83 — K9 wash-blur arm survives DrawerOverlay's deletion\n- src/components/_shared/axes.ts:47-48 — axes-ext fence gate claimed, nonexistent (verified ∅ this seat); mint-or-delete-claim at W-GATE-COLLAPSE\n- src/styles/index.css:211,225 — two @imports collapse to zero; one <style src> lane\n- src/index.ts:92-97 + package.json exports — ROUND-1 CT-1; the 19-subpath set shrinks by one, not discharged\n- tests/public-surface.spec.ts — hash re-pin batches at W-GATE-COLLAPSE\n- tests/components/{custom/drawer,ui/dialog}/** — tests-isomorphism wave; one tests/components/dialog/\n- demo/stories/containers/{drawer,sheet,dialog}.vue + manifest.ts — K22 strike, one merged route\n- docs .../PROPORTION.md §1.1 row 32 — one-line drafting correction (room roles leave 32; verified: pairs-with-radius cell is an em-dash)\n- precepts submodule DRAWER_SNAP — DOC-13 fork; dies with S3 but the submodule byte is not this wave's\n- src/components/index.ts — DAG §158 owns its deletion

# W-DIALOG-DETENT — TERMINAL SPEC (tri-fold adjudicated)

**Adjudicator modelId `claude-fable-5`** · arms: Fable (`claude-fable-5`) + Opus (`claude-opus-5[1m]`), benches/jurors `claude-opus-5[1m]` · HEAD `0371836d` · re-verified on disk this seat: tokenized LOC both dirs (exact match to Opus arm) · `data-stage-wrapper` grep (readers src, writers tests-only, demo **0**) · `useDrawerSnap.ts:340` clamp + `:369` dead dismiss + `:368` false comment · `constants.ts` `DRAWER_SNAP {0.32, 0.8}` / `DRAWER_FLING_VELOCITY 450` / `BOTTOM_SHEET_LADDER [0.12,0.5,1]` · `placement.css:96-98` deliberate host `backdrop-filter:none` + `:101+` halo `blur(calc(34px·--glass-level))` · `subpath-policy.mjs` "BI.W-DIALOG-PLACEMENT retired sheet" · `src/index.ts:107-110` "ui/sheet retired" · `axes.ts` sealed 5-member `PLACEMENTS` + fence claim with `grep axes-ext tests scripts` → ∅ · leaf diff: Title/Description identical modulo name, Header/Footer divergent (2 of 4, R3 confirmed) · `styles.css:105-145` `height:100%` + translate geometry + `DrawerFooter.vue:19` `mt-auto` + `×1.272/÷1.618` inline mints · PROPORTION "Room 24−20=4" pairing law + row-32 em-dash cell. Live numbers (Close bottoms, α table, fling pairs) stand on cross-arm pixel-identical reproduction atop the verified causal chain. `safari-app` OWED on every §PAINT row; not run this seat. No repo byte authored.

## 0 · ARM RULINGS — the five cells where the arms split

| cell | Fable arm | Opus arm | RULING | ground |
|---|---|---|---|---|
| LOC record | 874/624/38.7% (J1 adopted) | 940/558/34.6% | **Opus** | reproduced EXACTLY this seat by independent tokenizer; dialog 700/285/74 also exact |
| terminal LOC | ≈2,000 ("surviving styles ~340 move") | 1,576, itemized | **Opus** | Fable's ~340-line style move is impossible: `drawer/styles.css` holds 174 code lines total and Fable's own §STRIKE kills the stage apparatus, congeal falsehoods, snap rule, :root globals inside them — it double-counts what it deletes |
| frost receiver | host blur until MATERIAL W3 rules | graded halo, fold BLOCKED on W3 | **halo, NOT blocked** — strictly better than both | the fold authors zero new frost: it deletes drawer's competing receiver and inherits what ships at HEAD (`placement.css:96-98` deliberate FORM-1 `none` + resolving halo child, verified). Fable's default would port drawer's host blur INTO dialog against its shipped architecture — the exact duplication this wave deletes. Opus's hard sequencing block is unearned for the same reason: no new frost byte ⇒ no W3 dependency; W3 keeps library-wide authority to swap later |
| gates | 1 born-RED (REACH) | 3 born-RED (REACH, GESTURE, CONGEAL) | **2 born-RED** (REACH, GESTURE); CONGEAL demoted to §PAINT P3 + a material-invariant row | REACH (geometry) and GESTURE (engine logic) are distinct blockers, unit-expressible, each with a crisp mutation — one assertion cannot cover both (Opus right vs Fable). CONGEAL's assertion is a computed-α measurement — a π obligation, not a unit invariant; under the gates-abrogation budget it registers where the proportion rows do (Fable's parsimony right vs Opus) |
| ASK-33 / side detents | `detents` with placement ∉ {top,bottom} = compile error | only `center` a type error; left/right detents legal, ASK-33 closed by dissolution | **Opus** | the size-based geometry (§3.1) is axis-agnostic; `constants.ts`'s side-`[]` sentinel — the runtime lie ASK-33 was written against — dies with the file. Fable's fence re-mints the special case the geometry just dissolved |

Unanimous between arms, adopted without change: home = `dialog/` · stage STRUCK outright (no demo-mount rescue) · spring = J2's split (`DRAWER_SNAP` register dies; `bloom` open/close, `dock` detent↔detent, values read from canon on disk never a remembered literal; 465ms/0.9% acceptance band, regression retunes the canon never forks) · fling INTEGRATED (threshold + `steppedDetent` die) · pad **20** (row-32 role list is the drafting error — verified) · radius **24** room · `Dialog*` keeps its names.

## 1 · DISPOSITION

**MERGE-INTO `dialog`. `drawer/` deletes whole. `Drawer` retires as a name, `./drawer` as a subpath.** The DAG's verdict holds; its home is overturned and its ground corrected. The decisive fact is not J=0.800 and not "4 byte-identical leaves" (2 of 4 — R3): it is that the family **cannot open or close itself** — `demo/stories/containers/drawer.vue:13` imports `DialogClose, DialogTrigger` from `@glass/components/dialog` (verified), and `dist/drawer.js` exports six symbols, none a trigger or close. A component that borrows its own affordances from the component it duplicates is not a family; it is a placement plus a scalar. The residue: **`useDrawerSnap` (492 ln, the engine) and two props** (`detents`, `modal:false` — reka-native, measured-correct layer contract z = dock−1). Everything else in 1,613 lines is `<DialogContent placement="bottom">` with a struck radius (12 on the room band), a second STRUCK-C2 pad ladder, α 0.952 the ledger condemned at 0.80, a dead `stage` default, and a primary action off-screen at 3 of 4 detents. The merge is not a downgrade — trigger/close, `showClose`, the graded halo, the `--radius-ctx` relay, and `motion="off"` are five affordances drawer never had. Target: `sheet/` was deliberately retired one cut ago (three records, re-pulled); re-minting it — or the `Dialog*`→`Sheet*` rename — is churn against a sealed 5-member axis (R1/R2).

## 2 · §DEFECTS (Opus F-ids canonical; Fable SD-ids mapped: SD-1→F1 · SD-2→F2 · SD-3→F3 · SD-4→F5 · SD-5→F4 · SD-6→F13 · SD-7→F7 · SD-8→F8ʹ · SD-9→F9 · SD-10→F11 · SD-11→F12 · SD-12→F14 · SD-13→F8 · SD-14→F15/16/17)

| id | defect | evidence | sev |
|---|---|---|---|
| F1 | Primary action off-screen at 3 of 4 detents, no scroll rescues it | `styles.css:136-140` `height:100%` + `DrawerFooter.vue:20` `mt-auto` (both verified this seat); translate `(1−t)·100%` keeps the box bottom below the fold; Close bottom 1554.66/1419.66/1149.66 vs vh 900 at t=0.25/0.4/0.7; `overflow-y: visible` — nothing scrolls; default detent 0.4 | blocker |
| F2 | Drag-to-dismiss cannot fire; source asserts it can | clamp `useDrawerSnap.ts:340` `Math.max(min,…)` floors at `ladder[0]`; `:369` `target <= 0` dead for both shipped positive-floor ladders; `:368` comment says the opposite (all three verified) — −7826 px/s fling stays open | blocker |
| F3 | `stage="scale"` — the modal DEFAULT — paints zero pixels | `Drawer.vue:115`; `[data-stage-wrapper]` writers: demo **0** (grep re-run this seat), tests only; `styles.css:350` asserts a demo mount that does not exist; shipping in 7.0.0 | blocker |
| F4 | Momentum thresholded, not integrated | `:361-363` advances exactly one index past 450 px/s (verified); 1493 vs 625 px/s land identically — 2.4× energy discarded. Fable's slow-nudge repro struck (R7); claim survives on the corrected pair | high |
| F5 | Congeal inverted + cliff: most opaque at peek, min at 0.85, 0.26-α slam to opaque | α(t): 0.12→0.9221 · 0.40→0.8522 · 0.85→0.7400 · 1.0→opaque (arms pixel-identical); promise at `styles.css:154-167` is its inverse | high |
| F6 | Room-band radius/material diverge inside one band, both off-series | drawer 12/α0.952 vs dialog 16/α0.6928; PROPORTION §4 room=24; C5 "12px rung? NO"; owner `ss-23-drawer-not-rounded` | high |
| F7 | Second divergent overlay-pad ladder off the STRUCK C2 multiplier; three inline anchors; zero mobile transposition | `DrawerHeader/Footer.vue:19` `×1.272 / ÷1.618 / ÷2.618` inline (verified); measured 20.352/6.11154/12.5785; byte-identical at 390×844 | high |
| F8 | `./drawer` subpath rationale void; and (F8ʹ) the subpath ships no trigger/close | `src/index.ts:92-97` keyframes-isolation claim vs dist BFS (CT-1, cited); `dist/drawer.js` exports 6 vs dialog's 8; story imports both from dialog ×6 | high |
| F9 | Breath dead at rest; hover fires from anywhere on a 1438×44 plate | grip 36×5 α0.45 = 0.28% of its `role=slider` host; `styles.css:300` plate-wide hover moves it from 456px away; idle-1600ms four channels byte-identical | high |
| F10 | Only the grip is draggable | `:387-390` handle-only pointer attach; header/title drag → t unchanged | med |
| F11 | Three re-mints of the sealed placement/stage axes behind a fence gate that does not exist | `drawer/index.ts:7,28`, `DialogContent.vue:48` anonymous 4-union; `axes.ts:47-48` claims "proof:encapsulation's axes-ext arm greps for a re-mint" — grep ∅ (verified); BJ-4 books the first | med |
| F12 | `stage="none"` ≡ `dim` — 4-arm enum, 2 distinguishable | `DrawerOverlay.vue:50` unconditional `data-stage-scrim` vs dialog's gate at `DialogContent.vue:449`; scrim law `0.28 + t·0.44` measured CORRECT — survives | med |
| F13 | One box built twice: same 1056,0,384×900 rect, α 0.952 vs 0.6928, host blur vs deliberate none+halo, r12 vs 16, `transform` vs `translate` longhand, pad 0 vs 30.528/24 | arm table, pixel-reproduced; `DrawerContent.vue:221` bare `<slot/>` vs dialog's `data-slot=dialog-content-region` | high |
| F14 | Private 7th spring register, forked downstream | `DRAWER_SNAP {0.32, ζ0.8}` `constants.ts:11` (verified); MOTION-CANON §1 assigns room growth to `bloom`; DOC-13 | med |
| F15 | Zero-consumer stylesheet owns the modal band's `--stage-t` scalar over a global `@import` lane; 4 CSS lanes, 0 `<style>` blocks | `styles.css:61-65` `@property`; coupling only via `src/styles/index.css:211` (verified) | med |
| F16 | Dead surface: `DRAWER_SNAP_KEY`, `DrawerOverlayProps`, `BOTTOM_SHEET_LADDER` (own-file only), `.glass-drawer-snap-rule`+ink (0 consumers — DELETE not re-ink), 43-ln constants sand-file (11 code), 7 `:root` globals, `HtmlHTMLAttributes` ×12/6 files | verified on read | low |
| F17 | Module-name stripping violated; test tree non-isomorphic | `composables/{useDrawerSnap,drawerSnapContext}.ts`; `tests/components/custom/drawer/` | low |

**Not defects, recorded:** prefix trap does NOT bite — main bundle emits unprefixed first, drawer's plate resolves `blur(11px) saturate(1.6)` live (drawer is in the 38.4%). `useDrawerSnap`'s single-writer / live-element-through-`<Presence>` / PRM-jump discipline measured correct — **move it, do not rewrite it**. Title lh 1.00 is `text-subheading`, shared with DialogTitle (leaf diff verified identical) → typography wave. Plate-edge α 0.05 is library-wide → A7. Viewport caps (`6rem/97vh/min(24rem,92vw)`) are not series violations — they die with the geometry, not as off-rung mints.

## 3 · §THE DESIGN

**3.1 The gestalt fix — the detent is a size, not a translate.** `height:100%` + `translate((1−t)·100%)` is the single cause of F1 AND F2. Re-base: `[data-slot=dialog-content][data-placement=bottom] { position:fixed; inset-block-end:0; inset-inline:0; block-size:calc(var(--detent-t)*100dvh); max-block-size:100dvh; display:grid; grid-template-rows:auto minmax(0,1fr) auto; contain:layout paint; }` — `left|right` take `inline-size:calc(var(--detent-t)*100dvw)`; `top` mirrors. One geometry, four edges. Free consequences: actions on the visible edge at every rung; `0` becomes a legal rung (F2's branch goes live); the frost samples a stationary box; `sheet-motion.ts`'s translate table dies (F13 resolves by deletion); a non-detented sheet is `detents=[1]`. Honest cost: `block-size` animates on layout — one out-of-flow contained element; **P7's fps budget is the falsifier; if it misses, the wave escalates, no second path** (NO MASKING FALLBACK).

**3.2 Public surface.** `<Dialog v-model:open :modal?>` unchanged root. `<DialogContent placement="center|top|right|bottom|left" :detents?="number[]" v-model:detent backdrop="scrim|graded|immersive" surface motion springPreset showClose scroll />` + Trigger/Close/Header/Title/Description/Footer. `detents` with `placement="center"` is a **type error** (ruled cell 5: side detents legal, ASK-33 closed by dissolution — the `[]` sentinel dies; ratification must say superseded, not applied). `DrawerDirection/Mode/Stage` + the `DialogContent.vue:48` anonymous union die into `Placement` / `modal:false` / `backdrop`. Every `Drawer*` export retires; `Dialog*` keeps its names.

**3.3 On-disk (module-name stripped).** DELETE `src/components/drawer/` (12 files, 1,613 ln). MOVE `useDrawerSnap.ts` → `dialog/detents/use.ts` (whole, minus stage plumbing ≈95 + threshold; discipline preserved). MERGE `drawerSnapContext.ts` + `dialogStageContext.ts` → `dialog/detents/context.ts` (`wrapperEl`, `DRAWER_SNAP_KEY` die). FOLD surviving styles.css arms → `dialog/placement.css` re-keyed on `[data-placement]` (+≈88). RELOCATE the scrim-deepen coupling → `src/styles/overlay.css` (F15). Both `@import`s at `src/styles/index.css:211,225` die → one `<style src="./placement.css">` lane on DialogContent. `package.json` −`./drawer`; `src/index.ts:92-97` comment dies with its claim. Tests → `tests/components/dialog/` isomorphic. Demo: one route absorbs drawer + the K22-struck `/containers/sheet`.

**3.4 Tokens — all from the series, laws named.** Radius **24** room, edge arms inner-corners-only · pad **20/20** (pairing law 24−20=4, verified; C2 mints struck ×4 sites) · title↔desc gap **4** · header↔body↔footer gap **20** ⇒ **seam**: one warm ink 1px α **0.08** (gap law; `--border` retires, C10) · footer action gap **12** · plate edge 1px α **0.16** (library-wide 0.05 → A7) · grip **32×4** `--radius-pill`, handle `min-block-size` 44 (A6 floor) · mobile ≤768: 20→12 · 12→8 · 4→4 · gap 20→12 (§1.1, zero today) · `DialogTitle` on the §1.4 rung 18.608/1.50 — lands on the type token (shared), routed.

**3.5 Material — receiver named, proven, RULED.** The fold inherits dialog's shipped architecture: host `backdrop-filter:none` (deliberate FORM-1, `placement.css:96-98` verified — NOT the 61.6% dead class) + graded halo child `blur(calc(34px·--glass-level)) saturate(var(--glass-saturate-overlay))` masked per edge (`placement.css:101+`, resolving live per both arms). Drawer's flat host blur dies with its file. **No W3 sequencing block** (ruled §0): zero new frost bytes authored; MATERIAL W3 keeps library-wide swap authority. **Congeal inverts (F5):** one monotone non-decreasing lerp `--glass-opacity-sheet 0.74` at `t=ladder[0]` → `--glass-opacity-overlay 0.95` at `t=1`; the terminal opaque arm (the 0.26 cliff) DELETED; max adjacent-rung step 0.084 on the demo ladder. The peek bleeds (F-7). Scrim law `0.28 + t·0.44` survives, relocated, conditional (dialog's gate discipline, F12).

**3.6 Motion.** Open/close `springPreset("bloom")` (canon room growth); detent↔detent `springPreset("dock")` — on-disk values, never a remembered literal. `DRAWER_SNAP` register dies (F14); its measured clock (settle 465ms / band 0.9%, vs dialog's ~1040ms crawl) becomes the **acceptance budget** (P6) — regression retunes the canon, never forks. **Velocity integrated:** project release-v through `SpringProgress` to a rest point, snap to the nearest rung; projected rest below `ladder[0]/2` → `t=0` → unmount (the dead branch goes live). Drag clamp becomes `[0, max]`. `DRAWER_FLING_VELOCITY` + `steppedDetent` die. Drag attaches to handle + header + at-top content (`scrollTop === 0`). Motion channel: `translate:` longhand only; `transform: translateY()` retires.

**3.7 Breath (F9).** The grip IS the ladder: `role=slider` retained (Home/End/arrows, `aria-valuetext`), inline-size lerps across the rung range, answers pointer proximity via `@media (hover:hover)` on the handle region — never plate-wide. States: closed · open@detent (interruptible single-writer scalar) · dragging · dismissing · `modal:false` behind (z `calc(var(--z-dock) − 1)`).

## 4 · §STRIKE / §ADD

**STRIKE:** the drawer family as a name (F1-F17, subset + no trigger/close) · the entire `--stage-t` page-transform apparatus — `stage` prop, `[data-stage-wrapper|scale|flip]` arms, `ownedWrapper` lifecycle, both 15-ln wrapper lookups, `applyStageGates` wrapper arm — dead DEFAULT shipped jsdom-only ≥2 tranches, NO MASKING FALLBACK forbids a third pass; scrim-deepen coupling and `immersive` (real `blur(14px)`) survive · `height:100%`/`mt-auto`/`6rem`/`97vh`/`min(24rem,92vw)` (die with the geometry) · `DRAWER_SNAP`, `DRAWER_FLING_VELOCITY`, `steppedDetent` · the C2 pad mints ×4 authoring sites · plate-wide hover · `.glass-drawer-snap-rule`+ink (0 consumers — deleted, not re-inked) · `DrawerDirection/Mode/Stage` + the anonymous union · dead exports/sand-file/`:root` globals/`HtmlHTMLAttributes` ×12 · the global `@import` lane ×2 · the five false comments (`styles.css:154-167,350` · `use…:368` · `Drawer.vue:25-26` · `src/index.ts:92-97`) — each asserts the opposite of a measurement · `/containers/{drawer,sheet}` routes (K22).

**ADD (affordance owed):** A1 detent-as-size anchored to the edge (dissolves F1+F2) · A2 velocity projection (MOVEMENT OF MOMENTUM) · A3 the living grip carrying the ladder (BREATH OF LIFE) · A4 header + at-top-content drag (BEST iOS 27) · A5 a real scroll region — `grid-template-rows auto minmax(0,1fr) auto`, body `overflow-y:auto` + `overscroll-behavior:contain`, chained (at-top pull drags the sheet) — vs today's bare `<slot/>` · A6 mobile transposition, one rung down · A7 the five inherited-free affordances (trigger/close, `showClose`, halo, `--radius-ctx` relay, `motion="off"`) · A8 header/footer seams α 0.08 at the 20 gaps.

## 5 · §GATES — 2 born-RED + 1 routed (ruled §0)

**G-SHEET-REACH** — every declared control of an open detented sheet: `rect.bottom ≤ innerHeight` AND `elementFromPoint(centre)` IS that control, at every rung, 1440×900 + 390×844. Born-RED: 1554.66/1419.66/1149.66 vs 900, `hitIsBtn:false` ×3. Mutation that bites: any translate-based detent or `height:100%`+`mt-auto` restoration → RED; not satisfiable by scrolling.

**G-SHEET-GESTURE** — (a) release with projected rest below `ladder[0]/2` reaches `t=0` and unmounts; (b) two releases from one rung with ≥2× velocity separation land on different rungs when a boundary lies between their projected rests. Born-RED: −7826 px/s stays mounted at 0.25; 1493 and 625 px/s both land 0.7. Mutations: re-floor the clamp → (a) RED; any fixed threshold → (b) RED.

**G-NO-DEAD-REGISTER** *(routed to W-GATE-COLLAPSE — general, not drawer's)* — no `src/` CSS selector targets a data-attribute whose only writers are under `tests/`. Would have caught F3 two tranches ago.

**Struck as local gates:** G-SHEET-CONGEAL (Opus) — a computed-α measurement is a π obligation (P3) + a material-invariant row at W-GATE-COLLAPSE, not a unit gate. G-SHEET-PROPORTION (Bench 3) — a row on the tranche-wide PROPORTION invariant (gates-abrogation; the duplicated-derived-data trap). G-DETENT-FRAME — would pass on today's broken tree (the AW class); it is P7's acceptance budget.

## 6 · §PAINT — π/DELTA obligations. Route `/containers/dialog` (drawer's route dies). Chromium 149 AND real `safari-app` via `scripts/safari-probe.mjs` (`pkill -f safaridriver` first). Playwright-WebKit may not be labelled Safari. Never `getContext()` on a live canvas.

| # | selector | assertion | viewport | engines | delta owed |
|---|---|---|---|---|---|
| P1 | footer action in `[data-detents]` | `rect.bottom` ≤ innerHeight + `elementFromPoint` identity at every rung | both | both | BEFORE 1554.66/1419.66/1149.66 → AFTER ≤ vh at all 4 |
| P2 | plate | α across rungs monotone ↑, max step ≤ 0.10, α channel present at t=1 | 1440×900 | both | BEFORE 0.8896/0.8522/0.7774/opaque (paint-arm parses oklab) |
| P3 | `> [data-slot=glass-graded-halo]` | `backdrop-filter` resolves ≠ `none`, mask grades per edge, all four placements | both | both | Safari's masked-backdrop path is the risk cell — bank independently |
| P4 | plate + chrome | r24 inner-corners-only · pad/gap ∈ series · one rung down at 390 | both | both | BEFORE r12/16, 20.352/6.11154/12.5785, no mobile step |
| P5 | grip | inline-size + α vs `--detent-t`; idle-1600ms samples DIFFER across t; body hover at (720,500) must NOT move it | 1440×900 | both | BEFORE identical at rest, 36→41.39 from 456px away |
| P6 | settle trace 0.4→1 | overshoot peak + settle-to-band | 1440×900 | both | budget: ≤465ms, band ≤0.9%, else the canon preset retunes IN the canon |
| P7 | drag + settle | median ≥ 55fps, no long task > 50ms | both | both | the §3.1 size-geometry falsifier — miss ⇒ escalate, no second path |
| P8 | app root | `[data-stage-wrapper]` absent, no rule targets it | — | Chromium | S1 receipt |

## 7 · §REJECTED (falsifiers on record — do not re-raise)

| killed idea | falsifier |
|---|---|
| `components/sheet/` as home (DAG §4.2, benches) | three retirement records re-pulled this seat; sealed 5-member `PLACEMENTS` axis with `center` (`axes.ts:54-56` verified); two dirs sharing one portal/scrim/focus/register is the duplication this wave deletes |
| `Dialog*`→`Sheet*` rename | NO LEGACY licenses breaks, does not require them; renaming the PUBLISH primitive to a name retired one cut ago is churn, zero user-visible gain |
| mount a demo `[data-stage-wrapper]` to rescue `stage` | dead DEFAULT shipped jsdom-only ≥2 tranches; returns only as a photographed demo-shell wave |
| keep `DRAWER_SNAP` for its clock | the clock survives as P6's budget; the register forked the precepts (DOC-13) |
| keep threshold fling | 2.4× energy discarded, measured; projection makes the constant dead code |
| "4 leaves byte-identical" (DAG) / "identical after PROPORTION" (Fable bench) | leaf diff this seat: 2 of 4; Header/Footer grammars (grid-vs-flex, `flex-col-reverse sm:` DOM reversal, right-align) survive any pad ruling — the correction STRENGTHENS the merge |
| `./drawer` for keyframes isolation | root barrel already bears keyframes.js via button→useLiquidPress→useSpring; `libraryExternal` inlines nothing (CT-1) |
| room pad 32 | pairing law `pad = r − 4` at r=24 → 20, stated three times; row 32's pairs-with-radius cell is an em-dash (verified); 32 yields residue −8 |
| re-ink the snap rule | 0 consumers — dead facilities are deleted |
| series rungs for viewport caps | PROPORTION governs pad/gap/radius/ink; minting rungs for `97vh` overfits the series |
| `_shared/overlay` as receiver (Fable bench) | not on disk — DAG's proposal cited as fact |
| host blur as the fold's frost receiver (Fable ARM default) | would author drawer's receiver INTO dialog against the shipped deliberate FORM-1 (`placement.css:96-98` verified); two receivers for one surface is the wave's own target |
| hard W3 block on landing (Opus ARM) | the fold authors zero new frost bytes — it inherits HEAD; a dependency without a byte is a false edge |
| `detents` fenced to top/bottom (Fable ARM) | §3.1's geometry is axis-agnostic; the fence re-mints the special case whose `[]` sentinel this wave deletes |
| Fable arm's LOC record (874/624; ≈2,000 terminal; "styles ~340 move") | tokenizer this seat: 940/558/115 exact per Opus; `styles.css` holds 174 code lines — a 340-line move contradicts the arm's own §STRIKE |
| G-SHEET-CONGEAL as a unit gate (Opus ARM) | computed-α is a π measurement; registered at P2 + the material invariant |
| drawer-local proportion gate (Bench 3) | a row on the tranche invariant (gates-abrogation) |
| DR-12 "aria-orientation unreachable" | consumer-supplied side ladders reach it; only the default is empty — dies with the file, not as a dead-code claim |
| plate-edge α 0.05 as drawer's defect | measured on dialog too — library-wide (A7) |

## 8 · §LOC

Now: drawer **1,613** (940/558/115, 34.6% comment) + dialog **1,059** (700/285/74) = **2,672** — tokenized this seat, exact. After: **≈1,576** (arithmetic in the LOC field; drawer → 0, dialog gains `detents/{use,context}.ts` 412, placement.css +88, DialogContent +27, overlay.css 22, minus stageContext 15 and sheet-motion −17). Δ **−1,096**: −559 code (−34%), −498 comment (−59%). Comment share of the cut **45.4% — said plainly** — but 51% is executable deletion (8 SFCs/modules with 256+ code lines die outright, plus the stage apparatus and the engine's threshold arm): **NOT a comment cull**. Not counted (routed): `src/components/index.ts` 38 (DAG §158), tests 597 relocated not deleted.

## 9 · §ROUTED

| owner | what |
|---|---|
| MATERIAL W3 | library-wide halo adopt/decline — swap authority over the inherited receiver; NO landing block (ruled) |
| FM W7 | `DialogContent.vue:313-318` non-reactive `springPreset` — inside or after this wave, never beside |
| PROPORTION A6 / A7 / K9 | 44px ✕ floor · plate-edge α 0.05→0.16 library-wide · `ModalOverlay.vue:83` wash blur (drawer's arm absorbed by deletion) |
| PROPORTION owner | row-32 drafting correction — room roles leave 32, verified em-dash cell |
| W-GATE-COLLAPSE | public-surface hash re-pin · the `axes-ext` fence mint-or-delete-claim (verified absent) · G-NO-DEAD-REGISTER ownership · the material/proportion invariant rows |
| typography wave | `text-subheading` lh 1.00 vs §1.4 (shared with DialogTitle, leaf-verified identical) |
| DAG §158 | `src/components/index.ts` deletion |
| ROUND-1 CT-1 | 19-subpath set shrinks by one, not discharged |
| DOC-13 | precepts `DRAWER_SNAP` fork — dies with the strike, submodule byte not this wave's |
| tests-isomorphism wave | `tests/components/{custom,ui}/` phantoms → one `tests/components/dialog/` |
| F10 ship census | `./dialog` external consumers at ship-time; `./drawer` has none — consumer updates via a marked addendum in ITS tranche |


---

# DIALOG

**DISPOSITION:** SPLIT + ABSORB — both arms concur; DAG row 13 SUSTAINED on paint, not LOC (centre/side share none of backdrop-filter/isolation/radius/host-gap); confirm+gate absorb as ONE `dismiss` axis (F25 proven numerically identical in all six computed properties); dialog seeds `src/components/sheet/`; home-column `_shared/overlay/` OVERTURNED — that mint is row 8's.

**LOC:** src/components/dialog/ 1,059 → ≈505 (cloc verified this seat: 13 files, 700 code / 285 comment / 74 blank; DAG row 13's 1072·676/309 wrong on all three). Arithmetic: 1059 −298 side arm → sheet/ (placement.css 176 + sheet-motion.ts 37 + ~85 side branches) RELOCATED · −78 FORM-2 graded + backdrop prop DELETED (veil wave re-derives, receives no lines) · −146 stage (context 15 + Dialog.vue anchor 19 + Content machinery ~96 + Overlay registration ~16) DELETED · −35 Trigger/Close + index.ts:1-7 false justification DELETED · −14 showClose · −22 springPreset + ModalOverlay.scrim + 3 dead ✕ classes · −90 comment cull STATED AS SUCH · +129 (dismiss+rebuff 45, gutter/✕/proportion 29, styles.css one-lane fold 55) = 505. SAID PLAINLY: of the −554 headline, 54% is relocation (298), 16% comment cull (90); genuine deletion 295; net of adds the true shrink inside dialog/ is −88. Demo −466 (confirm-dialog 265 + gate-pattern 201, wc -l this seat). Tests: 5 retired, 2 relocated to sheet, remainder → tests/components/dialog/, dialog-spring.test.ts amended (preset clauses die, entrance clauses stay).

**COLLISIONS:** \n- src/components/dialog/placement.css — FORM-1+geometry seed src/components/sheet/styles.css (this wave); FORM-2 shape re-derived by MOTION-CANON §5/W-DISSOLVE, never relocated\n- src/components/dialog/ModalOverlay.vue:83 backdrop-filter — MOTION-CANON §9 item 1 owns the delete; dialog co-lands + contributes measurements only\n- src/components/_shared/field/field-control.css:46-48 — this wave deletes the rule; field/input wave + W-RADIUS-ROLE also claim the file\n- src/styles/theme/radius.css:22,80 — --radius-dialog/--radius-3xl die into role room=24; W-RADIUS-ROLE (O-7) owns the tokens\n- src/components/drawer/styles.css:42,78-80,350,356 — --stage-t register + false :350 claim; sheet lane (row 8) owns the file, dialog deletes its reads\n- src/components/command/{styles.css,CommandDialog.vue,dialogContext.ts} — GRAPH-RULINGS:190 + DAG row 25; this wave sets dismiss="deliberate" only\n- demo/stories/containers/dialog.vue — this wave rewrites (3 dismiss rows); rest of compositions/ (5 stories, 962 lines) is W-DAG-REDUCE's\n- scripts/gen-component-styles.mjs MEMBERS — placement.css added when it moves; CSS-lane wave / W-GATE-TRUTH\n- tests/public-surface.spec.ts subpaths (−./drawer +./sheet) — W-GATE-COLLAPSE (C-9), batched\n- tests-visual/{dialog-glass,sheet-inset,sheet-radius,config-in-sheet}.spec.ts unwired — W-GATE-TRUTH (C-13)\n- PROPORTION.md §1.1 padding-role labels shifted one rung vs the pairing law — erratum to the PROPORTION settlement; ruled here by the law\n- src/components/expandable-container/ — row 37 owns origin="element"; dialog ships the origin-rect seam only

# W-DIALOG — TERMINAL SPEC (tri-fold adjudicated)

**Adjudicator modelId `claude-fable-5`. HEAD verified this seat: `bce78c3e` (brief's `0371836d` stale — both arms' correction stands). Every contested claim below was re-verified on disk this seat: cloc 1059=700/285/74 · PROPORTION.md:56 pairing law + :52 replaces-column (30.53 at rung 20) + :79 type clamp + :233 room-binds-dialog · MOTION-CANON:181-185 breath floor + :161 scrim NO RUNG + :166 α-0.50-correct + :220 exit ruling · DialogContent.vue:44-56,375-377,439 · DialogFooter.vue:12 · field-control.css:46-48 · radius.css:22 · index.ts:1-7 · zero `data-stage-wrapper` receivers outside drawer/dialog · demo stories 265+201 · reka-ui resolves DialogTrigger/DialogClose live · dist/component-styles.css imports exactly 3 files, placement absent; dist/styles/index.css carries it. Safari: NOT RUN by any seat — never write "both engines" off this spec.**

**ADJUDICATION HEADLINE:** both arms rule SPLIT + ABSORB — no disposition conflict. On every contested sub-ruling the Opus arm wins on evidence I reproduced; Fable's losses are recorded in §7 with falsifiers. Skeleton = Opus arm; folded in from Fable: the rebuff's underdamped perceptual character, the clean-bills line, the graded-Safari-cell discharge note.

## 1 · THESIS

The dialog's plate is right and everything around it is inert, inverted, or borrowed. The entrance is genuinely ours (anisotropic squish `0.9964 0.8883` → overshoot `1.00011 1.00344` → settle; F20 re-points toast onto it) — do not re-open it. Wrong: a room plate flush to both viewport edges at 393 (that, not the token, is F48's screenshot), a mobile footer whose destructive button is the topmost zero-gap full-width target, a 16×16 dismissal that hit-tests as one, a refusal cue that is a scoped-CSS no-op and latches forever, a page-recede enum with zero receivers repo-wide, and a "backdrop" that measurably brightens the page core in light AND dark. F25's answer is arithmetic: confirm ≡ dialog in all six of blur/bg/radius/padding/gap/border. Name the dismissal grammar, delete two stories, delete the stage, seed `sheet/`, hand the veil's *problem* (not its lines) to W-DISSOLVE, and put every number on the series.

## 2 · §DEFECTS (adjudicated, deduplicated; clean bills at foot)

| id | defect | evidence | sev |
|---|---|---|---|
| DLG-01 | Mobile footer gap **0.00** — destructive action topmost, full-width, flush; `flex-col-reverse sm:flex-row sm:gap-x-2`, no base gap | `DialogFooter.vue:12` read this seat; B3+J1 | critical |
| DLG-02 | Zero viewport gutter: `x 0, w 393, innerWidth 393`; two consumers hand-roll it and disagree (`confirm-dialog.vue:97` 361@16 ✅, `gate-pattern.vue:121` 384@4.5 ❌). **This is F48's screenshot** | B1, J1 exact | high |
| DLG-03 | ✕ is 16×16, `cursor: default`, press ≡ hover byte-identical, focus `outline: 3px none` over a keyboard-only shadow ring at α.30 (1.91:1), Tab #4/4, `elementFromPoint` misses ±10px all axes | J1 A1/A2; booked PROPORTION A6:209 | high |
| DLG-04 | Gate's only refusal cue is a no-op that latches: `.gate-shake` scoped, portaled node carries zero `data-v-*` → `animation-name: none`, `@animationend` never fires, second refusal can never re-fire | B3 D-1, J1 | high |
| DLG-05 | Concentric inversion (F45): operative producer is `field-control.css:46-48` → 16px input inside 16px plate across 24px inset; `radius.css:22` "nests concentric" arithmetically inverted; `DialogContent.vue:439`'s `isCenter ? {} :` gate is a red herring — `--radius-ctx` inherits `1rem` anyway, deleting it alone is a paint no-op | read this seat; J1 D-2 binding | high |
| DLG-06 | F25 proven: confirm/gate/dialog identical in all six of `blur(11px) saturate(1.6)` · bg oklab · 16px · 30.528/24 · gap 16 · border ink; differ only by `show-close` + **7** hand-rolled guards (`gate-pattern.vue:123-125`, `confirm-dialog.vue:99,100`, `containers/dialog.vue:407,408`) | B1 D-2, J1 to the digit | high |
| DLG-07 | `backdrop="graded"` BRIGHTENS: light +5.1% core/+31.3% below-plate, far field Δ0.000; **dark +76.0%** (J1 F2 — the blur pulling neighbours, not the ink); pool fixed 416×416 vs 384×214 plate (1.94×); `--glass-halo-blur: 20px` > §5d's 15; BJ-7 DECLINE never executed | B1+B3+J1 F2 | high |
| DLG-08 | `stage` has never painted: `[data-stage-wrapper]` receivers = **0** repo-wide (grep re-run this seat); `drawer/styles.css:350` asserts a mount that doesn't exist; ~150 lines drive one attribute for nothing | grep this seat; B2 R2, B3 D-6 | high |
| DLG-09 | Off-series on 5 axes, both viewports, zero mobile transposition: pad `30.528/24` (C2's struck ×1.272), gap 16, header 6, title `20.352/lh 1.000`, desc `16.4/22.96`; radius 16 vs room 24; header alignment flips per viewport | B1 D-5, J1 (footer 8 IS rung 3) | high |
| DLG-10 | Eight boundary legs, no line: border α0.05 + spread ring + 2 drop + specular 0.30/0.18/0.25 + dark insets 0.06/0.04; crossing scan monotone `0.162→0.513→0.575`, no local minimum (C9) | J1's 8-leg dump | med |
| DLG-11 | Description AA fail: 3.92:1 at 16.4px | B1, J1 | med |
| DLG-12 | Visual/DOM/tab order disagree: Tab `[INPUT,Cancel,Save,Close]`, Save above Cancel at 393, ✕ visually first reachable last | B1 D-8, J1 | med |
| DLG-13 | Exit desync + false prose: `DialogContent.vue:375-377` claims "the two never desync" while `scrimSlideT` is `null` on the centre path (read this seat); measured scrim gone at t≈366 with plate at 0.032, `inert` scaling through t=689. Fade-led-150ms itself is NOT the defect (MOTION-CANON:220) | B3 D-8, J1 A7 | med |
| DLG-14 | springPreset captured non-reactively at setup (`:313-318`); PRM flip → no bloom AND no spring | FM W7, B3; J1 PLAUSIBLE-BY-SOURCE | med |
| DLG-15 | `index.ts:1-7` shipped false justification: argues "Vue SFCs cannot be 1-line re-exports (only .ts files can)" INSIDE a .ts file, credits `useForwardPropsEmits` neither wrapper imports (read this seat); Trigger/Close 14 lines each | this seat; B2 R9 | med |
| DLG-16 | `placement.css:12` claims the rule "ALWAYS emits in dist/glass-ui.css" — false (`data-placement` there = 0); rule actually ships via `dist/styles/index.css` (verified). Separately `dist/component-styles.css` omits placement.css by its own doctrine (`gen-component-styles.mjs:5-20`) — the rule is LIVE, the sentence false, the manifest incomplete | verified this seat | med |
| DLG-17 | CommandDialog ✕ paints 27px INSIDE the search field; a padding axis cannot fix it (pad already 0, ✕ off `--overlay-pad-*`) — settles DAG:300 | B3 D-13, J1 | med |
| DLG-18 | `ModalOverlay.scrim` axis: zero passers in src+demo, sole exerciser `ModalOverlay.test.ts:12` | B3 D-9 | low |
| DLG-19 | Breath floor unmet under MOTION-CANON:181's three-clause floor: no material pointer response, `aria-invalid` reports nothing linked, ✕ dead to focus | benches concur | med |

Clean bills, one line: centre frost resolves `blur(11px) saturate(1.6)` — NOT in the 188/305 dead-glass cohort; S0 prefix trap does not bite (`-webkit-` first, unprefixed last, all three sites); `:modal="false"` honest; focus-return watch correct.

## 3 · §THE DESIGN

### 3.1 The `dismiss` axis (absorbs F25 + F45)

| `dismiss` | ✕ | Esc | outside | is |
|---|---|---|---|---|
| `free` (default) | ✔ | ✔ | ✔ | dialog |
| `deliberate` | ✖ | ✔ | ✔ | confirm |
| `locked` | ✖ | **rebuffs** | **rebuffs** | gate |

`showClose` dies into it. No `Confirm*`/`Gate*` symbol ever minted; destructive tone stays `<Button tone="destructive">` — presets live in consumers. B1's `busy` STRUCK (`locked` under a second name). `CommandDialog` sets `dismiss="deliberate"` (closes DLG-17 — the only remedy the geometry allows; `command/styles.css` inversion stays GRAPH-RULINGS:190's).

**The rebuff — the wave's one new affordance** (ground: a refusal the user cannot perceive is no refusal, and DLG-04 proves the demo's cure never ran and can never run): lateral translate only, amplitude ≤4px decaying to 0, underdamped (~2 visible cycles) on `--spring-press` (ζ 0.80, 0.12s — G1 requires the leading channel at 90% within 150ms; the demo's 0.4s bezier misses it), rank 0. **Re-armable by construction** — driven by a monotonically-increasing `rebuffCount` key, never an `animationend` handshake (the latch class of DLG-04). `prefers-reduced-motion` → one-shot border-perimeter flash at ink α 0.48, `--spring-press-duration`, no geometry. Library primitive; never scoped CSS over a portal.

### 3.2 Proportion — two rulings both arms' benches missed, both verified this seat

**RULING P1 — pad 20/12, not 32.** PROPORTION:56 states `pad(role) = r(role) − 4` with its own arithmetic "Room 24−20=4"; :52's rung-20 pairing cell reads "room 24 → residue exactly 4" and its replaces column carries **30.53** — this component's pad-block, at no other rung; rung 32 pairs with nothing. §1.1's role labels are shifted one rung against the law — **erratum routed to the PROPORTION settlement, resolved here by the law + replaces column, which agree.**

**RULING P2 — type is viewport-invariant.** PROPORTION:79: "every **space** rung steps down exactly one… **Type keeps its own clamp and never rides `--ui-scale`**." Fable's title/desc "one rung down" REFUTED on the letter of the law.

| axis | HEAD (identical at 1440/393) | ≥769 | ≤768 | law |
|---|---|---|---|---|
| radius | 16 | **24** | 24 | §4:233 binds room=24 to "dialog, sheet, drawer" by name; `--radius-dialog`/`--radius-3xl` die. F48 is a consistency ask — `room = 1.5 × card` with `r − pad = 4` IS the consistency |
| pad (block = inline) | 30.528/24 | **20** | **12** | P1; C2 strikes ×1.272 |
| viewport gutter | 0 | n/a (`max-inline-size: 32rem`) | **20/side** → `min(100% − 40px, 32rem)` | page gutter 32 → one rung down; closes DLG-02 |
| section gap | 16 | **12** | **8** | body rung — stacked rows of ONE plate, not groups; family-20 at pad 20 would equal the inset and the frame stops reading (K20). **No divider at any gap** |
| title ↔ description | 6 | **8** | **4** | term ↔ value |
| footer peer gap | 8 / 0 mobile | **12** | **8** | peer ↔ peer; closes DLG-01 |
| title | 20.352/lh 1.000 | **23.67 (rung +2), lh 1.50** | **same** | P2; if 1.50 is wrong for a heading, the band boundary moves in PROPORTION, not here (ADJ-2) |
| description | 16.4/22.96 | **18.608 (rung 0), lh 1.50** | **same** | re-take contrast at 18.608; < 4.5:1 → ink moves to `--foreground` (closes DLG-11) |
| header align | center@393/left@1440 | **left** | **left** | a per-viewport alignment flip is on no series |
| plate edge | 8 legs | **1px warm ink α 0.16 · ONE drop leg · ONE specular top ≤ 0.12**; ring, second drop, side/second specular, dark insets STRUCK | dark ≤ light | §1.2 + C9 + K2/K3; closes DLG-10 |

**Concentricity (closes DLG-05, F45):** delete `field-control.css:46-48` + `radius.css:22`'s row — LAW B: a roled child (field → control rung 10) never takes the relay. ALSO delete the `:439` `isCenter ? {} :` gate so the relay publishes unconditionally as resolved px (LAW A) — **saying plainly the second cut alone changes nothing in paint; the operative cut is the first** (J1 D-2 binding).

### 3.3 Motion — one clock per gesture

| leg | curve | numbers | rank |
|---|---|---|---|
| plate entrance | `--spring-transient` | **UNTOUCHED** — response 0.22, ζ 1.00, settle 0.20s; birth 0.85 × shipped squish 1.06/0.945; §PAINT proves it byte-unchanged (F20 regression) | +3 |
| scrim | `--spring-world` | response 0.48, ζ 1.00 — starts early, finishes last | +2 |
| exit | fade-led 150ms | **STANDS** (MOTION-CANON:220 verified: "already correct at HEAD"); dialog mints no literal | reverse |
| rebuff | `--spring-press` | ζ 0.80, 0.12s, ≤4px lateral, ~2 cycles | 0 |
| ✕ hover/press | `--spring-press` | 0.12s, 1.05 / 0.96 | 0 |

**DLG-13's cure is co-termination, not a re-timed exit:** thread the same live scalar through both arms so `:375-377`'s claim becomes true; spring TERMINATES (no `inert` scaling past scrim unmount); assert `|Δop(plate, scrim)| ≤ 0.05` every 40ms sample.
**DLG-14's cure is deletion:** `springPreset` dies — MOTION-CANON gives MODAL one curve; the PRM-flip bug loses its substrate. Cheaper than a `watchEffect`; the KISS cut.
**Scrim: dim-only.** `ModalOverlay.vue:83` backdrop-filter delete is MOTION-CANON §9 item 1's — co-land one cut; dialog contributes measurements, **mints no α** (§7 R-F-ALPHA).
**Breath (DLG-19): discharged in-wave, zero idle loops.** MOTION-CANON:181-185 verified: breath is a floor not a loop, the one legal idle loop belongs to an **ambient** surface, and :161 puts the world scrim at NO RUNG — a scrim-breath register is refuted by canon (§7 R-F-BREATH). Floor met by: ✕'s three real pointer states, the rebuff, the A1 focus ring, `dismiss`-truthful ARIA (`aria-describedby` wired to the alert node, `dismiss` reflected as a data attribute). Gate under G5.

### 3.4 The ✕

44×44 hit box via padding (the button's own box), glyph 16, capsule on inset `::before` (PROPORTION A6's dock idiom), `--radius-pill`, `cursor: pointer`, rest ink ≥3:1. Hover: fill ink/0.05 + `--scale-hover-btn` under `@media (hover:hover)`. Press: `--scale-press` + fill ink/0.12 — **press ≠ hover**. Focus: `outline: 2px solid ink/0.48` + `outline-offset: 2px`, replacing the dead `outline: 3px none`. **DOM-first inside content** → tab `[Close, INPUT, Cancel, Save]` = visual order; footer drops `flex-col-reverse`, row at every viewport, Cancel precedes Save in all three orders — the confirm carries tone, not position. Closes DLG-03 + DLG-12.

### 3.5 Public surface + on-disk

```ts
// index.ts — no prose
export { default as Dialog, type DialogProps } from "./Dialog.vue";
export { default as DialogContent, type DialogContentProps } from "./DialogContent.vue";
export { default as DialogHeader } from "./DialogHeader.vue";
export { default as DialogTitle, type DialogTitleProps } from "./DialogTitle.vue";
export { default as DialogDescription, type DialogDescriptionProps } from "./DialogDescription.vue";
export { default as DialogFooter } from "./DialogFooter.vue";
export { DialogTrigger, DialogClose } from "reka-ui"; // verified live this seat

interface DialogContentProps {
    dismiss?: "free" | "deliberate" | "locked"; // default "free"
    surface?: Surface; motion?: Motion; scroll?: boolean;
    class?: HTMLAttributes["class"]; disableOutsidePointerEvents?: boolean;
}
// `modal` rides the reka Dialog root as today
```

DELETED props: `showClose` · `stage` (+ enum + `dialogStageContext.ts`) · `backdrop` · `springPreset` · `placement` (leaves with the split) · `ModalOverlay.scrim`. Reka's dismiss-intent emits STAY — observing is legitimate; guarding is what the gate forbids. **Seam only:** the root accepts an origin rect so row 37 lands `origin="element"` without re-cutting the entrance.

```
src/components/dialog/           9 files ≈505
  Dialog.vue ~25 · DialogContent.vue ~215 (centre only) · DialogHeader.vue ~16
  DialogTitle.vue ~19 · DialogDescription.vue ~17 · DialogFooter.vue ~20
  ModalOverlay.vue ~60 (dim-only) · styles.css ~120 (THE ONE LANE — the SFCs ship
  zero <style> blocks today and are fed by five lanes; inline structural strings fold in)
  index.ts ~13
src/components/sheet/            SEEDED BY THIS WAVE — side arm only, no drawer byte
  styles.css (placement.css minus FORM-2) ~176 · motion.ts (sheet-motion.ts, name stripped) 37
  SheetContent.vue ~85 (the 11 isCenter branches, unconditional)
tests/components/dialog/         ← tests/components/ui/dialog/ (the ui/ hop is invented)
```

**Ownership ruling:** `dialog/` PRODUCES `sheet/` as a seed — that is what row 13's SPLIT means; W-SHEET-MERGE (row 8) then folds `drawer/` incl. `useDrawerSnap` wholesale. `_shared/overlay/` is NOT minted here. Handoff numbers banked for row 8: side host radius `0 0 24 24`, region `max-block-size: calc(100dvh − 2×pad)` off 20, FORM-1 near-white gradient ink, `mask-composite` §7a BLOCKING Safari cell rides FORM-1, `.glass-floating.sheet-animate` = 0 matches, `border-l` inert, `--stage-t` register + `drawer/styles.css:350` strike. Graded §7a cell DISCHARGED by deletion. `placement.css` enters `gen-component-styles.mjs` MEMBERS when it moves (DLG-16's manifest half); its `:12` sentence rewritten to the truth, not struck (the rule is live).

Demo: DELETE `feedback/confirm-dialog.vue` (265) + `compositions/gate-pattern.vue` (201); `/containers/dialog` carries three `dismiss` rows; the locked row wires `aria-describedby` to its error text. Rest of `compositions/` → W-DAG-REDUCE (F45 says "likely", not this wave's call).

## 4 · §STRIKE / §ADD

**STRIKE:** stage in toto (~146, zero receivers, only prose about it false — B2's "documented no-op" is a masking fallback with a comment) · `backdrop="graded"` + `--glass-halo-*` out of dialog (declined at BJ-7, sign-inverted both modes) · Trigger/Close + `index.ts:1-7` (vacuous wrappers behind a self-refuting justification, verified) · `showClose`, `springPreset`, `ModalOverlay.scrim`, 3 dead ✕ classes (`data-[state=open]:*` ×2 + `disabled:pointer-events-none` — no `data-state`, never disabled) · `field-control.css:46-48` + `radius.css:22` row · scrim backdrop-filter (co-land, §9's cut) · 5 of 8 boundary legs + spread ring · `flex-col-reverse` · per-viewport alignment flip · five CSS lanes → one · two demo stories · false prose at `placement.css:12` (rewritten), `DialogContent.vue:375-377` (made true), `drawer/styles.css:350` (struck by its owner) · **comment cull ~90 lines, stated as such, earning no gate and no capture.**

**ADD (owed):** the rebuff (the one mint) · viewport gutter · mobile space transposition (space rungs only — type invariant) · 44px ✕ with three live states + real focus outline · footer gap at mobile + row at every viewport · origin-rect seam (one prop-shaped hole, no machinery) · `dismiss`-truthful ARIA. **Deliberately NOT added:** scrim idle loop (canon-refuted) · Confirm/Gate component or preset · nested-modal rank cue (routed) · page-recede (struck) · `aria-modal` (routed W-A11Y — reka owns host attributes).

## 5 · §GATES — 2 minted, 5 retired, net −3

**G-DLG-ROOM** (real browser, 1440×900 + 393×852, light+dark): open `[data-slot=dialog-content]` `border-radius === 24` · `padding-block === padding-inline ∈ {20|12}` · section `row-gap ∈ {12|8}` · header `row-gap ∈ {8|4}` · footer inter-button gap > 0 at both · at 393 `left ≥ 20 ∧ right ≤ innerWidth − 20` · `text-align` identical at both viewports · `font-size` identical at both viewports (P2). **Born-RED on every clause at HEAD:** `16 · 30.528/24 · 16 · 6 · 0 · left 0/w 393 · center@393`. Mutations that bite: drop the inline clamp → RED; restore any `sm:`-gated gap → RED; re-mint `×1.272` → RED; radius back to `--radius-card` → RED.

**G-DLG-DISMISS** (source, node, **scoped** — J1 F3: the unscoped grep returns 30 hits, 22 in five components this wave never touches, permanently RED ≠ gate): `src/components/dialog/` declares `dismiss`, none of `showClose|stage|backdrop|springPreset`; `grep -rn "escape-key-down|interact-outside|pointer-down-outside" src/components/dialog demo/` → 0. **Born-RED:** `showClose` at `:46`, `stage` at `:48`, `backdrop` at `:55`, 7 demo guard bindings. Mutation: any consumer-side guard or re-introduced knob → RED.

**Retired (census verified this seat — Fable's 4 undercounted):** `dialog-show-close.test.ts` · `dialog-stage-ownership.test.ts` · `graded-backdrop.test.ts` · `tests/styles/radius-dialog-bind.test.ts` (replays green over commented-out CSS; `radius-role-canon.test.ts` is the home) · `dialog.confirm-preset.test.ts` (subject leaves the tree). **Relocated with sheet/:** `dialog-graded-edge.test.ts` (FORM-1), `sheet-motion.test.ts`. **Amended:** `dialog-spring.test.ts` (preset clauses die, entrance clauses stay) · `ModalOverlay.test.ts` (scrim-axis clause dies).
**Struck/routed gate proposals:** `G-OVERLAY-ONE-LANE` → CSS-lane wave (G-12's heir) · `G-ROOM-PROPORTION`/`G-DLG-SERIES`/`G-DLG-GUTTER` → subsumed by G-DLG-ROOM · `G-DLG-PORTAL-SCOPE` → gate wave library-wide (its only RED subject dies here — born-green locally is not a gate) · dialog-local 44px gate → PROPORTION A6 governs library-wide.

## 6 · §PAINT — Chromium AND real safari-app (`scripts/safari-probe.mjs`, `pkill -f safaridriver` first; Playwright-WebKit under a Safari label FORBIDDEN)

| # | claim | route · capture |
|---|---|---|
| P1 | DLG-01 footer separates | `/containers/dialog` 393, light+dark: gap `0.00 → 8.00`, Cancel above Save gone, tab order printed |
| P2 | DLG-02/F48 gutter | before `x0 w393` → after `x20 w353`, four corners inside, numbers stated |
| P3 | DLG-05/F45 concentric | macro dpr≥4: field = control 10 inside plate 24/pad 20, radii stated |
| P4 | DLG-03 ✕ | 44×44 both viewports, glyph 16; 4× `elementFromPoint` ±14px all HIT; rest→hover→press→focus each Δ>0 |
| P5 | DLG-04 rebuff | 3-frame strip @60fps on wrong-key, **twice in succession** — runs, clears, re-fires |
| P6 | DLG-09 proportion | computed pad/gap/type dump 1440+393 light+dark vs `4·8·12·20·32·52` + type rungs; zero off-series; type IDENTICAL at both viewports |
| P7 | DLG-10 edge | border-crossing scan: local minimum at the border pixel, both modes (today monotone) |
| P8 | DLG-11 AA | ≥4.5:1 at 18.608 or ink → `--foreground` |
| P9 | DLG-13 exit | 40ms sampling plate vs scrim: `|Δop| ≤ 0.05` every sample, co-terminal, no post-unmount scaling |
| P10 | scrim | luminance 4 points light+dark; text behind ≥3:1 with chroma surviving; **dialog supplies measurement, the α token is §9's** — the canon's own :166 (α0.50 correct) vs :374 (~50% drop) vs measured −72.8% is that wave's conflict to settle |
| P11 | DLG-17 | `/containers/command` paired capture, ✕ rect vs input rect — DAG:300 discharged |
| P12 | DLG-06/F25 fold | one capture, three `dismiss` rows + `git rm` receipts for both stories |
| P13 | graded delete | `grep -rn glass-halo src/components/dialog` → 0 |
| P14 | **F20 regression** | `/feedback/toast` re-capture proving the entrance byte-unchanged |
| P15 | **Safari** | owed on every row; if not run at land the receipt records **"Safari NOT run"** |

## 7 · §REJECTED — every killed idea with its falsifier (Fable-arm losses marked R-F-*)

| id | idea | falsifier |
|---|---|---|
| **R-F-TYPEDOWN** | Fable arm: title/description one rung down at ≤768 | PROPORTION:79 verified this seat: "Type keeps its own clamp and never rides `--ui-scale`" — the mobile law names **space** rungs only; C13 confirms "`--ui-scale` = box only" |
| **R-F-ALPHA** | Fable arm: mint scrim α 0.30 ("lands −50.1% exactly") | Twice dead: the arithmetic reproduces from no stated base (`0.8×0.7 + L_ink×0.3 = 0.399` needs L_ink < 0 — impossible; compositing is nonlinear in sRGB), AND MOTION-CANON:166 verified: "`--overlay-scrim`… at 50% is *correct*" — the token is §9's, dialog supplies the measurement |
| **R-F-BREATH** | Fable arm: breath register with the scrim as carrier, routed to W-DISSOLVE | MOTION-CANON:181-185 verified: the one legal idle loop belongs to an **ambient** surface (aurora, shimmer, substrate); :161 puts the world scrim at NO RUNG. A modal scrim is a world treatment. Floor discharged in-wave, zero loops |
| **R-F-RELOCATE** | Fable arm: graded FORM-2 "RELOCATED to the veil wave" (−54 booked as moved lines) | J1 F2: dark brightens +76.0% via `blur(20px)` pulling neighbours, not ink — relocation preserves the defect. MOTION-CANON:168 says re-role; the veil wave **re-derives the shape and receives zero lines**. Booked as deletion |
| **R-F-LOC420** | Fable arm: →≈420 | Add-side incomplete (+45 vs the +129 the one-lane fold and full rebuff require); counts the sheet move at −300 while routing the move to another wave — either the seed is this wave's (then dialog owns the +298 relocation, honestly labelled) or the lines can't leave. 505 with the relocation/cull disclosure reconciles to cloc |
| **R-F-TESTS4** | Fable arm: retire 4 test files | Census this seat: 5 retire (`graded-backdrop.test.ts` exists and its subject dies) + 2 relocate + 2 amend |
| R-B1-EXIT | "the exit is the forbidden snap" | MOTION-CANON:220 verified: "150ms, fade-led — already correct at HEAD"; only the desync is live |
| R-B1-BUSY | `busy` prop | `locked` under a second name; a knob needing a paragraph is not a knob |
| R-B1-GATE | unscoped dismiss-grep gate | 30 hits at HEAD, 22 in untouched components — permanently RED ≠ gate |
| R-B2-CHASSIS | mint `_shared/overlay/` now, retire Drawer, fold expandable-container | rows 8/37 have owners; `useDrawerSnap` (492) imported wholesale is another wave's cut; file-ownership violation |
| R-B2-RECEDE | stage → documented no-op boolean | zero receivers + false prose = a masking fallback with a comment (NO-MASKING edict) |
| R-B2-CONTEXT | `dialogContext.ts` 0 callers | `CommandList.vue:7,:16` calls it; row 25 owns its defect |
| R-B3-16 | radius stays 16, "F48 discharged" | PROPORTION:233 verified: room=24 binds "dialog, sheet, drawer" by name; F48 is a consistency ask and `1.5 × card` IS the consistency |
| R-B3-HALO | rebuild graded as box-following | BJ-7 DECLINE unexecuted + dark brightens via blur — re-inking/re-sizing cannot fix; new machinery for a declined knob |
| R-B3-439 | the `isCenter` gate is the F45 mechanism | `--radius-ctx` inherits `1rem` anyway; `field-control.css:46-48` is the operative producer — deleting the gate alone is a paint no-op |
| R-B3-GATESTORY | keep gate-pattern post-fix | its subject becomes a prop row; keeping it preserves the duplicate F25 names |
| R-ALL-PAD32 | all benches: pad 32/32 | PROPORTION:52/56 verified: law, pairing cell, and replaces column (30.53 at rung 20) all yield 20; rung 32 pairs with nothing |
| R-ALL-GAP20 | section gap 20 | at pad 20 a family gap equals the inset and the frame stops reading (K20) |
| R-ALL-FOOTER8 | "footer 8 off-series" | 8 IS rung 3; the objection is role-fit (peer↔peer = 12), not membership |
| R-J1-NOFOCUS | "no focus indicator at all" | programmatic `.focus()` ≠ `:focus-visible`; keyboard Tab paints a shadow ring at α.30 — the dead `outline: 3px none` is the defect |
| R-B1-STRIKE12 | strike `placement.css:12` as phantom | the rule is LIVE via `dist/styles/index.css` (verified this seat, import present); the sentence is false, not the CSS — rewrite |
| R-B2-95 | DAG's 95-line Drawer-leaf saving | DrawerHeader/Footer carry their own pad ladders; only Title/Description byte-identical — accounting for row 8's ledger, not a finding |

## 8 · §LOC

See the loc field: **1059 → ≈505**, with the honesty statement the mandate requires — 54% of the headline is relocation to `sheet/`, 16% comment cull (stated as such, no gate, no capture), genuine deletion 295, true net shrink inside `dialog/` −88. Comment stock at HEAD 285/1059 = 26.9%, `DialogContent.vue` 166/503 = 33.0%.

## 9 · §ROUTED

| what | owner | dialog hands over |
|---|---|---|
| `ModalOverlay.vue:83` backdrop-filter delete + scrim α + the :166-vs-:374-vs-measured-−72.8% internal canon conflict | MOTION-CANON §9 / K9 | measurements only; the specimen named per capture; no α minted (R-F-ALPHA) |
| focus-veil re-derivation — **re-derive, not relocate** | MOTION-CANON §5 / W-DISSOLVE | J1 F2 attached: dark brightens +76.0% via blur; must not carry `--glass-bg-overlay` (L* 97.4); `--glass-halo-blur: 20px` fails §5d |
| side arm follow-on: drawer fold, `useDrawerSnap`, detents, `--stage-t` register (with a MOUNTED receiver or not at all), `drawer/styles.css:350` strike, FORM-1 §7a BLOCKING Safari cell | W-SHEET-MERGE (row 8) | the banked handoff numbers (§3.5) |
| `origin="element"` + `ExpandableContainer.vue:77,78,89` body-overflow fork | row 37 | the seam only; MOTION-CANON:208 birth 0.78→1.0, "the origin is never hidden" |
| `command/styles.css:11,31,55,102` inversion + `dialogContext.ts` defect | GRAPH-RULINGS:190 / row 25 | no longer the ✕-overlap remedy — DAG:300 settled by `dismiss="deliberate"` |
| radius role tokens, relay defaults, `class-names.ts:141` regex, stadium spellings | W-RADIUS-ROLE (O-7) | dialog consumes room 24 / control 10 / pill; widens no regex |
| `aria-modal`, `aria-hidden` 1-of-3, `.sr-only` 1-of-9 | W-A11Y (C-2) | reka owns host attributes |
| glass rungs (blur/saturate) | W-FROST | consumed; centre plate is a clean bill |
| specular ring K2 + legs >0.12 K3 | glass wave | the 8-legs-on-one-element count |
| nested-modal rank (two α-.5 scrims composite .75, depth reports nothing) | scrim/veil wave | one line of affordance owed |
| `compositions/` remainder (5 stories, 962 lines) | W-DAG-REDUCE | F45's "likely" |
| `public-surface` subpaths · `tests-visual` wiring (4 of the 176) · library-wide portal-scope gate | W-GATE-COLLAPSE (C-9) · W-GATE-TRUTH (C-13) · gate wave | portal-scope must be minted where it can bite |
| PROPORTION §1.1 padding-label erratum + ADJ-2 heading-band question | the PROPORTION settlement | the single value every category spec's table rests on; ruled here by the law, corrected once there |


---

# CAROUSEL + DECK + PAGER-DOTS (JOINTLY, F33) — WAVE W-PAGER

**DISPOSITION:** DELETE (deck — overturns DAG row 44 MOVE-TO: zero-caller members around a clamp PagerDots already computes) + KEEP-THIN (carousel — sustains row 24; GROWS on a11y+reactivity, shrinks on duplication) + GREENFIELD (the worm driver+paint — overturns row 16 "correct-as-is": the row measured LOC, not pixels). pager-dots is the survivor.

**LOC:** Raw 2,193 → ~1,700 (−493) · comment-normalised code-only −214. Arithmetic: deck 202 code + 75 README → 0 (−133 code) · Deck.contract.test.ts 55 → 0 (−45 code) · demo/stories/motion/deck.vue 186 → ~152 (−34, story KEPT per ruling R1, not Fable's −186) · pager-dots 841+79 README → ~739+~75 (−96 raw of which 70 COMMENT, plus −6 from folding constants.ts into worm.ts; code deletions 79 nearly offset by 64 added affordance) · useLeadTrail.ts 265 → ~240 (−19 code) · carousel 490 → ~494 (+4 code — it GROWS and should). SAID PLAINLY: the pager-dots line is mostly a comment cull (70 of 96); 100% of the real code reduction is the deck+test deletion. This is a physics-and-paint wave carrying one dissolution, not a reduction wave.

**COLLISIONS:** \n- src/composables/motion/spring/springPresets.ts + src/styles/tokens/scheme-spring.css (:153 dock-settle, :195 --pager-worm-max-stretch) — W-SPRING-RETUNE owns; W-PAGER reads only, lands AFTER or re-reads at land\n- src/components/pager-dots/composables/usePagerWorm.ts readPx — PERF W2's born-RED row; W-PAGER owns the file this cut and DISCHARGES it (declared to prevent double-edit)\n- src/styles/glass/material.css:55-66 --glass-cell-backdrop-filter — W-FROST owns; W-PAGER authors no byte\n- src/styles/tokens/glass-fx.css:69 --glass-specular — library-wide token wave, NOT surfaces-pager.css\n- .focus-ring shared utility (α 0.30→0.48) — A1 owns the recipe\n- src/composables/motion/morph/ shared dir with W-TABS useSelectionIndicator.ts — different files, no byte collision, declared\n- package.json:109-110,348-351 ./deck subpath + typesVersions — collides with any export-reshaping wave\n- tests/components/custom/* — W-PAGER deletes only custom/deck/; the other 15 phantom dirs belong to the test-tree isomorphism wave\n- demo/stories/motion/deck.vue --spring-smooth refs (:167-169) — W-SPRING-RETUNE consequent edit (story SURVIVES trimmed, so the refs are live, not moot)\n- src/index.ts:35-37 stale CarouselNext/Previous comment — CT-6 doc wave\n- ~/Programming/atlas/src/stage/{useStageDeck,useDeckDetent}.ts — marked addendum in atlas's tranche\n- demo/stories/navigation/carousel.vue:302-306 retinted rail — sole --pager-rail-gap migration site

# W-PAGER — TERMINAL SPEC (tri-fold adjudicated)
**Adjudicator: claude-fable-5 · arms: claude-fable-5 + claude-opus-5[1m] · HEAD 0371836d · verified on disk THIS seat:** deck = 7+20+71+104 = **202 code + 75 README** (DAG's 206 stale) · `Deck.contract.test.ts` 55 = **11 tombstones (:8-18) + a LIVE 19-line `handleDeckKey` test (:33-50)** · story 186, sole consumer of `pattern="group"` + `:ring="false"` + the sole announcer exhibit (grep: no other site) · pager-dots 841 (+79 README) · carousel 490 · `useLeadTrail.ts` 265: `LEAD 0.68/0.64` (:41-42), `TRAIL_TAU_S 0.27` (:44), `SETTLE_POS_EPS 0.3` (:48), 3-clause `isAtRest` (:164-170), exponential follower `t += (x−t)·(1−e^(−dt/τ))` (:192) · `springPresets.ts:109-113` dock **0.35/0.82**; `MOTION-CANON.md:47,65,83` retunes → **0.30/0.88** + deletes `snappy`; `:354` `filter: url()` FORBIDDEN, pager-worm the named live obligation · `PagerDots.vue`: `gap-1.5` (:292) vs `.pager-bed-layer{gap:.375rem}` (:452), `--pager-hit-target:28px`/`--pager-hit-inset:-2px`, `--pager-worm-layer-opacity:0.65`, `--pager-dot-active-dim` + `[data-active]::before` (:475-478), `--pager-dot-hover` declared with zero `:hover` rules · `useCarousel.ts:14-18` param-list destructure freezes `orientation`, `:40-49` un-retried mount guard, `CAROUSEL_WEIGHTY_DURATION=30` · `surfaces-pager.css:20-23` gap 6 / pad 10/5, `:42` consumes `--glass-cell-backdrop-filter` · `package.json:109-110,348-351` `./deck` rows · morph test: `CELL=24` IS the stub pitch (pips at `idx*CELL`), gBCR stubbed (:44-60) · F33 = `FEEDBACK-LEDGER.md:45` · DAG rows 16/24/44 · ROUND-1: A11Y-3 (:1237), PERF W2 readPx booking (:52), collapse suggestion (:278).

## 1 · DISPOSITION + THESIS
| node | DAG row | ruling |
|---|---|---|
| deck 202+75 | 44 MOVE-TO `composables/deck/` | **DELETE.** Overturned. Directory, README, test dir, `./deck` subpath, typesVersions row — gone, no alias, no `composables/deck/`. `liveMessage` alone rehomes, onto PagerDots. |
| pager-dots 841 | 16 KEEP "correct-as-is" | **KEEP the register, GREENFIELD the indicator.** Overturned — the row measured LOC, not pixels. |
| carousel 490 | 24 KEEP-THIN | **Sustained** — and it grows on a11y+reactivity while shrinking on duplication. Never gate this node on LOC. |
| the worm driver+paint | — | **GREENFIELD** (`useLeadTrail.ts` + `usePagerWorm.ts` + the layer paint). |

F33 asks two questions; both answer to a component that is neither named party. *"Deck vs carousel"* — nothing, once measured: deck is a clamped ref, four one-line delegates, a template string, and a `window` keydown listener that steals Arrow/PageUp/Dn/Home/End from focused text controls in Chromium AND real Safari 26.4 (guard consulted for Space+digits only — `useDeckKeyboard.ts:44-62`, fall-through verified this seat); carousel is a 490-line embla item-scroller missing exactly the one thing deck has, an announcer. `PagerDots.vue:101-105` already computes deck's clamp. Deck dies whole; its announcer lands on the rail that owns `count`/`active`/the accessible name; the never-asked third question — 3 keyboard contracts or 1 — collapses 3→1 on the rail, the only one measured correct. *"The dot animations need dramatic refinement"* — sustained on paint by three independent seats: one hop 1306–1721 ms against a 0.22 s dock register; ~90% of it a post-arrival hairline neck; the selected dot 2.223:1 where the sole-carrier law (PROPORTION §1.3) demands ≥3:1; the worm lands 8 px off the clicked dot on the documented retint seam (both engines); on a windowed rail, 5 of 8 forward hops paint zero indicator travel. The `01310c9c` ALREADY-AT-BAR ratification is **OVERTURNED**: it certified existence from a happy-dom trace with `getBoundingClientRect` stubbed onto a synthetic grid — it cannot see a pixel, a clock, a filter, a contrast ratio, or a stationary window. The SVG goo filter — canon's named live obligation — buys 1–2 px of waist on a 13 px body while `PAGER_NECK_GIRTH=0.7` paints the literal constant on 100% of frames; it is deleted. **The goo-morph edict survives intact on `translate`+`scale`: elongate → travel → reunite.** Nobody proposed a cross-fade; nobody may.

**Timing method correction (voids part of the record):** the hero carousel autoplays every 4200 ms (`carousel.vue:57,66-71`) and retargets hops mid-flight — all π timing rows run on `/navigation/pager-dots` and the vertical rail.

## 2 · §ADJUDICATION — the tri-fold rulings
The arms AGREE on disposition, the driver law (`trail = lead − clamp(v_lead·τ_e, ±ceil)`), the elongation band `clamp(pitch, |Δ|·0.55, 3·pitch)`, the opacity-0.65→1 cure, the filter deletion, the dock-row rebind with re-read-at-land, gap-token unification, hit-knob deletion, the 3→1 keyboard collapse, the announcer rehoming, the window policy (pointer keeps the touched dot in place; bed-body translate + compression–release at edges), `pattern` default `"group"`, τ_e≈0.08 measurement-set, the light-channel rest floor (cut-not-soften), carousel's whole-props reactivity + `watch immediate` + `inert`/tabpanel additions, `interface.ts`→`types.ts`, `arrival.ts` kept comment-culled, gCS=5 (both corrected B1's 2), clamp-fires-at-≥3 (both refuted "any ≥2"), rigid-slide 17% (both refuted 57%), specular routed to `glass-fx.css:69`, and striking the breathing-scale idle, the τ-retune palliative, the `calc()` hit-inset, the ≤2×pitch clamp, and the file-absence gate. Shared claims spot-checked this seat before adoption: 13 file:line citations, all exact (listed in the header).

**Six conflicts, ruled on evidence:**
- **R1 story fate — OPUS.** Fable deleted `demo/stories/motion/deck.vue` (−186); Opus keeps it trimmed. Grep this seat: the story is the SOLE consumer of `pattern="group"` and `:ring="false"` and the sole announcer + presentation-recipe exhibit; windowing is separately covered (pager-dots windowFit=5, carousel ex.5 windowFit=7). Deleting it leaves surviving props with zero demo sites (overfitting-audit's own bar). It survives at `/motion/deck` as the PagerDots presentation exhibit: loses `useDeck`/`useDeckKeyboard` and the window keymap, gains ~6 lines of local state, header rewritten clean (greenfield-no-meta — no reference to a deleted register). Consequence: its `--spring-smooth` refs (:167-169) stay LIVE for W-SPRING-RETUNE's census, not moot.
- **R2 intermediate-pip wake-lift — FABLE.** Opus adopted B3's pip-lift-as-the-worm-crosses; under the now-opaque worm the lift phase is fully occluded — only a decaying wake could ever paint, bought with per-pip per-frame custom-property writes inside the driver this wave takes to 0 gCS, on the geometry channel canon reserves for light. STRUCK; recorded in §REJECTED.
- **R3 deck-test record — OPUS.** Verified: 11 tombstones + a live 19-line focus-guard test. Fable's "tombstone test 55" was wrong on ~30 lines. Immaterial to deletion, material to the record; B3's CD-2 ("never touches useDeckKeyboard") stays refuted.
- **R4 morph-test constants — OPUS.** The stub places pips at `idx*CELL`: CELL is the pitch. New geometry → `DOT=12, CELL=28, ELONGATION_MIN=1.5·12=18`. Fable's "CELL=24→pitch 28" contradicts the stub it cites.
- **R5 constants.ts — FABLE.** After striking `PAGER_NECK_GIRTH` + `DEFAULT_ELONGATED_PX`, four one-line fallbacks with one importer remain; fold into `worm.ts` (DAG-RULINGS:269's own "not earned" logic).
- **R6 gates — OPUS.** Five, not four: G-PAGER-WINDOW has a named biting mutation (restore the unconditional recentre) and guards high-sev D-3, which Fable left π-only. π7's route corrects to `/navigation/carousel` ex.5 (windowFit=7 verified :251,274; the pager-dots story is fit-5).

Bench dispositions both arms carry, ratified: P-1..P-12/CD-1..CD-15/S-census per the arms' concordant tables; B2's §2b windowed-zero-travel the decisive solo find; B1's kinematic law + B3's band the composed driver; refutations of B2's S-3/S-8-as-stated/S-11/G-PG-5 and B3's ζ0.64/wake-lift/calc-inset stand. Fable's "1306" lower bound retained as range floor; canonical 1-hop HEAD figure 1350 ms (both seats).

## 3 · §DEFECTS (adjudicated, juror-corrected values)
| id | defect | evidence | sev |
|---|---|---|---|
| D-1 | Worm lands 8 px off the clicked dot on the documented retint seam — bed hardcodes `gap:.375rem` (:452), buttons ride `gap-1.5` (:292), `centerOf()` measures the bed (`usePagerWorm.ts:101-119`) | drift [+8,+4,0,−4,−8]; bed pitch 30/button 34; byte-identical real Safari 26.4 | high |
| D-2 | `useDeckKeyboard` steals Arrow/PageUp/Dn/Home/End from focused text controls, globally on `window` — guard consulted for Space+digits only (`:44-62`, fall-through verified) | `defaultPrevented:true` ×6 + deck navigated while editing; both engines. The header honestly says GLOBAL — the design is the defect | high |
| D-3 | Windowed rail: zero indicator travel on interior hops (active-pip centre + worm translate constant, hops 4–8 = 5 of 8 at 0.00 px) AND pointer-click teleports the clicked dot −90 px (`pagerWindow.ts:24-27` unconditional recentre) | carousel ex.5, 12 slides fit-7; Safari-confirmed | high |
| D-4 | One hop 1306–1721 ms vs dock 0.22 s (`scheme-spring.css:153`) — up to 6.1× over; every hop ≥3 saturates both caps (gap pinned 36.00, `--stretch` 1.2000 from t≈142 ms, 34 frames) into a rigid 49×13 lozenge | 3 seats; 2-cell 34.09/1.189 stays below caps — fires at ≥3 | high |
| D-5 | The tail is arithmetically forced: exponential follower vs ε=0.3 never arrives — settle costs `τ·ln(gap/ε)`; peak gap 16.92 → 0.95–1.09 s of hairline after the bodies land | predicted 90% neck-visible; measured 89.7–90.9% | high |
| D-6 | Active:inactive contrast 2.223:1 vs the ≥3:1 sole-carrier law (PROPORTION §1.3); fill the only carrier, three alphas deep (0.35 dim under 0.65 layer over 0.52 pip) | rgb(80,75,70)/rgb(136,128,122), two photometric seats | high |
| D-7 | Worm composites over undimmed bed pips → multi-level slug (plateaus 102/78/62 on bg 246, 2 co-resident per frame, frame-dependent); `:486-494` demands opaque masses then re-translucates them | dpr2 row scans, 2 seats | high |
| D-8 | Carousel a11y: 5 roots / 0 role / 0 tabindex → arrow handler unreachable 5/5 mounts (`Carousel.vue:64-79,86-89`); 35 items 0 `inert` 0 `aria-hidden`, 1,689 px off-snap content in tab order at opacity 0.7 behind `overflow:hidden`; 4 tablists / 0 tabpanels / 0 `aria-controls`; counter mute (`CarouselPager.vue:80-86` role:null), the route's one `[aria-live]` node EMPTY | live census, Safari-identical; ROUND-1 A11Y-3 | high |
| D-9 | SVG goo filter: canon-FORBIDDEN `filter:url()` (named live obligation), buys 1–2 px waist on a 13 px body; `PAGER_NECK_GIRTH=0.7` literal on 100% of frames — the documented "welling" does not well; `@supports not (filter:url())` Arm B unreachable (`CSS.supports` true, Chromium 149 + real Safari 26.4) | ablation + on-disk | high |
| D-10 | Dead in the hand + at rest: rest/hover/press computed byte-identical; `--pager-dot-hover` declared + README-promised, zero `:hover` rules; `.tap-squish` scales a childless transparent box; focus ring paints but composites 1.91:1; 60–121 idle frames → 1 distinct state | measured | high |
| D-11 | Embla arrives slow and dead: 1016–1242 ms travel, overshoot 0.00, from `CAROUSEL_WEIGHTY_DURATION=30` whose comment claims "arrives with weight" | measured, 2 seats | high |
| D-12 | Carousel silent-failure pair: `orientation` frozen by param-list destructure (`useCarousel.ts:14-18`, plain .ts — no transform applies); un-retried `onMounted` guard (`:40-49`) → permanently dead chevrons + `init-api` never fires (the hook autoplay hangs off) | on-disk, verified | med |
| D-13 | 5 gCS/rAF frame in `paintWorm` (readPx ×2 + 2 rem-branch documentElement reads + `maxStretchOf()` getter) vs `useLeadTrail.ts:23`'s "ZERO" claim | 1077 gCS / 205 frames = 5.25; ROUND-1 PERF W2 | med |
| D-14 | Lead-edge overshoot 7.08–7.10% (corpus ceiling 4.7%), hand-rolled `0.68/0.64` in no preset table, the retired-`bouncy` cell — QUALIFIED: silhouette midpoint overshoots 0.00 px; the bouncy-cell argument survives, "the eye sees it" does not | measured, 2 seats | med |
| D-15 | Squish inaudible: `--stretch` peaks 1.095 on a 1-hop vs the 1.2 cap; pins at 1.2000 for 34 frames on a 4-cell — no dynamic range at either end | measured | med |
| D-16 | Off-series geometry, nine values zero on `4·8·12·20·32·52`: gap 6, pad 10/5, pip 13, hit 28/−2, pitch 30, elongation 36, gutter 16; no coarse-pointer floor (A6 44); no mobile transposition | `surfaces-pager.css:20-23` + PagerDots + `CarouselItem.vue:18`/`CarouselContent.vue:124` | med |
| D-17 | Structural residue: phantom `tests/components/custom/deck/`; `interface.ts` lone deviation from 19× `types.ts`; single-file `composables/` dir; 3 embla `select` subscriptions for one number; `CAROUSEL_WEIGHTY_DURATION` exported, 0 importers; `src/index.ts:35-37` stale; `deck/index.ts:19` false pagerWindow claim; `deck/README.md:26` "24px" vs a 28×28 box; `constants.ts:12` "1.08–1.2 band" vs a single-valued token | as cited | low |
| D-18 | `.glass-pager-ring` declared glass on 5 surfaces, frosted on 3 — 2 surfaces + the whole `/navigation/pager-dots` route compute `backdrop-filter:none` (receiver `surfaces-pager.css:42` ← `--glass-cell-backdrop-filter` seeded `none` by `material.css:55-66`) | both engines | med·ROUTED |

## 4 · §THE DESIGN
**4.1 Collapse.** `src/components/deck/` deleted entire; `package.json` `"./deck"` (:348-351) + typesVersions row (:109-110) deleted; `tests/components/custom/deck/` deleted. No `composables/deck/`. Gone with no alias: `useDeck, DeckCore, progress, first, last, useDeckKeyboard, handleDeckKey, DeckMoves, DeckKeyOptions, UseDeckKeyboardOptions, CONTROL_SELECTOR`. One keeper: the announcer — `PagerDots` gains `slideLabel?: (i:number)=>string` and an owned `sr-only[role=status][aria-live=polite][aria-atomic]` reading "Slide {n} of {m}[: name]". `CarouselPager`'s counter drops its private listeners, takes `role="status"`, reads the same source.

**4.2 Keyboard 3→1.** `PagerDots.onKeydown` is the sole paging contract: existing arrows/Home/End + `PageUp`/`PageDown` + digit jump `1–9`, digits guarded on `closest("button,a,input,textarea,select,[role=button]")`. `Carousel.vue:64-79` deleted (unreachable 5/5 mounts) and with it the `:272` stopPropagation defence. **No `window`/`document` keydown authored anywhere.** Viewport (`CarouselContent.vue:113-117`) takes `tabindex="0"` unconditionally; `role`/`aria-roledescription` stay ariaLabel-gated.

**4.3 The worm — greenfield driver.** `trail = lead − clamp(v_lead·τ_e, ±ceil)` — elongation IS velocity: gap peaks at peak velocity (early, where the eye is) and is exactly 0 the frame the lead lands; the ~1 s tail cannot exist by construction. Delete `TRAIL_TAU_S`, the follower (:192), `trailTau` plumbing, the third `isAtRest` clause; interruption free (velocity carries); PRM seating + rAF park (:196-204) untouched. `ceil = clamp(pitch, |target−source|·0.55, 3·pitch)` off live bed centres — a neighbour hop bridges one pitch, an 11-hop stretches to three and reads as eleven; retire `--pager-dot-elongated` + `DEFAULT_ELONGATED_PX`. Lead binds the canonical **`dock` row — 0.35/0.82 on disk, → 0.30/0.88 per canon; bind the row, re-read from disk at land, never a remembered literal** (W-SPRING-RETUNE ordering). Hand-rolled `0.68/0.64` dies. `τ_e ≈ 0.08 s` is arithmetic (peak v≈230 px/s × 0.08 ≈ 18 px ≥ 1.5·DOT(12)) — **π1 sets it; if π misses, the number moves, not the bar.**

**4.4 The paint.** `--pager-worm-layer-opacity: 0.65 → 1` — one token closes D-6 (predicted 4.24:1) and D-7 (opaque occludes) together. Delete `[data-active]::before` + `--pager-dot-active-dim` (nothing left to dim). Delete the filter apparatus whole: `<svg><defs>` host, `wormFilterId`/`neckClipId`, the feGaussianBlur/feColorMatrix/feComposite graph (:309-329), the Bézier clipPath (:334-338), both inline `url()` writes (:285-288), `--pager-goo-filter`, `--pager-neck-clip`, `PAGER_NECK_GIRTH`, the `@supports not` arm (:550-557). With girth = body diameter the {circle, rect, circle} union IS a stadium, filterless; the 3-layer split stays (the σ8 note explains the layers, never the filter). Squish stays: `--stretch` reads travel velocity directly; cap `--pager-worm-max-stretch` (read, never written). Mint `--pager-rail-gap` on `.pager-dots`; `gap-1.5` leaves the class list; `.pager-bed-layer` reads the same token — a second gap literal cannot exist (D-1 structurally unreachable). Delete `--pager-hit-target`/`--pager-hit-inset` (target = cell → inset ≡ 0). Hover/press exist: bed pip 0.52→0.72 + one-step grow under `@media(hover:hover)`; `.tap-squish` moves off the childless button — press (0.97) lands on the pip; `place-items:center` on the childless box deletes. Perf: hoist the readPx pair into a mount/resize memo (existing `useResizeObserver`), resolve the stretch cap once per drive — 5 gCS/frame → 0; discharges PERF W2 and makes `useLeadTrail.ts:23` true. Rest floor: LIGHT channel only — a slow specular travel on a `::after` sheen, `--motion-tempo`-scaled, PRM→off, silhouette-invariant, must not re-arm the parked rAF; **if it cannot meet those constraints it is cut, not softened**; the hover/press cure ranks above it and is not optional.

**4.5 Window policy (D-3).** Keyboard/programmatic recentre; a POINTER activation slides the window the minimum keeping the activated index one cell inside the edge — the touched dot never moves from under the pointer (≤0.5 px). When the window must slide: bed pips translate one pitch as a body (same dock spring, staggered off active) while the worm compresses–releases in place on the same driver. One hop always reads as one hop.

**4.6 Tokens — series or named law:** rail gap **4** · pip **12** · hit cell **24** (WCAG 2.5.8, named law) · coarse floor **44** (`@media(pointer:coarse)`, A6) · pitch **28** (=cell+gap) · ring pad **4/8** · elongation the §4.3 clamp · carousel gutter 16→**20** (peer-item seam; per the gap law draws no line) · mobile every rung one down (PROPORTION §1.1). `surfaces-pager.css:20-23` takes the gap/pad edits; `--glass-specular` is `glass-fx.css:69`, ROUTED.

**4.7 Carousel.** `interface.ts`→`types.ts` · `useProvideCarousel` takes `props` whole, reads `props.orientation` at use · `watch(emblaApi, …, {immediate:true})` replaces the mount guard (late api binds + `init-api` fires) · `CarouselPager` drops `selectedIndex`/`slideCount`/`syncIndex` + listener pair (3 subscriptions → 1), reads the injected model (note: `onMounted(syncIndex)` was NOT redundant — restructure, not dead-code strike) · `CarouselItem` GROWS: `inert` + `aria-hidden` off-snap; `role=tabpanel` + `:id` + `aria-labelledby` when linked; per-slide name · `pattern` defaults **`"group"`** (`role=group` + `aria-current`); `"tabs"` only with `panelIds` (mis-defaulted, not dead — 4 tablists → 0 tabpanels is harm) · `CAROUSEL_WEIGHTY_DURATION` un-exported, retuned to land 420–480 ms with a settle (measured mapping 30→1130–1242 ms, expect ≈11–13; **π10 sets it, the estimate does not ship**) · `arrival.ts` kept, comment culled.

**4.8 On-disk (after):**
```
src/components/pager-dots/           src/components/carousel/
  PagerDots.vue  (−filter, −knobs,     Carousel.vue (thin) · CarouselContent.vue (+tabindex)
   −dim, +announcer, +hover/press,     CarouselItem.vue (+inert/+aria) · CarouselPager.vue
   +rail-gap, +coarse floor)           arrival.ts · types.ts (was interface.ts)
  worm.ts   (was composables/          useCarousel.ts · index.ts
   usePagerWorm.ts; the 4 surviving  src/components/deck/ — DELETED ENTIRE
   fallback constants folded in)     src/composables/motion/morph/useLeadTrail.ts
  window.ts (was pagerWindow.ts;       (greenfield trail law)
   +pointer policy)                  demo/stories/motion/deck.vue — SURVIVES trimmed:
  types.ts · index.ts · README.md      the PagerDots presentation exhibit (~6 lines local
                                       state, no window keymap, clean header)
```
Tests → isomorphic tree: `tests/components/{carousel,pager-dots}/`; only `custom/deck/` deleted here (the other 15 phantom dirs are the isomorphism wave's).

**4.9 Public surface.** `@mkbabb/glass-ui/deck` removed — atlas `src/stage/{useStageDeck.ts:2,useDeckDetent.ts:1}` re-home in ~6 lines local state via marked addendum in atlas's tranche; slides/speedtest need nothing (`slides/src/deck/deckKeys.ts:21` kept its own `CONTROL_SELECTOR`). PagerDots: −hit knobs, +`slideLabel`, `pattern` default flips; rail-gap consumers move to `--pager-rail-gap` (one site: `carousel.vue:302-306`).

## 5 · §STRIKE / §ADD
**STRIKE:** deck package + subpath + README + test (202+75+55; `progress`/`first`/`last` zero callers anywhere incl. their own story; the keyboard a live WCAG defect adopted by nobody in 4 repos) · SVG filter apparatus + Arm B (1–2 px yield vs a canon prohibition; `CSS.supports` true both engines makes the floor unreachable stock) · `TRAIL_TAU_S` + follower + third `isAtRest` clause · `--pager-dot-elongated`/`DEFAULT_ELONGATED_PX` · `--pager-hit-target`/`--pager-hit-inset` · `--pager-dot-active-dim` + `[data-active]::before` · `place-items:center` on the childless box · `Carousel.vue:64-79` handler · CarouselPager's private trio + listener pair · `CAROUSEL_WEIGHTY_DURATION` export · `constants.ts` as a file (4 survivors fold into `worm.ts`) · ~70 comment lines (the 41-line σ8 header, Arm-A/B paragraphs, 6× "DISTINCT from /carousel", the 20-line `panelIds` doc, `deck/index.ts:19`'s false claim, `README.md:26`'s "24px" vs 28×28, `constants.ts:12`'s "band" vs one value) — **stated plainly: 70 of the 96-line pager-dots reduction.**
**ADD (owed):** the announcer + `slideLabel` (the carousel route's one live region is empty — the collapse pays for itself here) · `inert`/`aria-hidden`/tabpanel linkage/per-slide names (the 24-line pass-through is under-built) · `role=status` counter · unconditional viewport tabindex · hover/press on the pip (README already promised it) · 44 px coarse floor · digit jump + PageUp/Dn on the rail · windowed-rail motion (5/8 hops paint nothing today) · rest-floor sheen (conditional, cut-not-soften) · carousel arrival weight · mobile rung transposition. **Carousel gets bigger and should.**

## 6 · §GATES — five, born-RED, mutations named
| id | assertion | RED at HEAD | biting mutation |
|---|---|---|---|
| G-PAGER-FILTERLESS | no `filter: url(`, no `<filter>`/`<clipPath>` under `src/components/pager-dots/` AND none in built CSS resolving onto `.pager-worm-layer` | graph :309-329 + clipPath :334-338 + arm :550-557 | re-add a one-node filter → RED. Discharges MOTION-CANON:354's live obligation |
| G-PAGER-PITCH | every bed-pip centre = button centre ±0.5 px across {default, retinted-size, retinted-gap, vertical} — real engine, Chromium + real Safari | 8.00 px | second gap literal in `.pager-bed-layer` → RED |
| G-PAGER-SETTLE | hop 0→1 reaches `gap ≤ 0.5` AND `|hi−target| ≤ 0.5` within 300 ms | 1350 ms | restore the exponential follower → RED |
| G-PAGER-NOSTEAL | zero `keydown` on `window`/`document` under `src/components/{carousel,pager-dots}/`; text input focused → Arrow/Home/End/Page* all `defaultPrevented===false` | global listener + 6 prevented | re-add a window listener → RED |
| G-PAGER-WINDOW | real engine: 12-slide fit-7 rail — every interior forward hop paints ≥1 pitch of indicator travel; pointer activation moves the touched dot ≤0.5 px | 0.00 px ×4 · −90 px teleport | restore `pagerWindow.ts:24-27`'s unconditional recentre → RED |

Struck as gates (abrogation mandate): state-distinctness + series-membership → π rows; file-absence → tautological with the diff AND passes on a broken tree. **Morph-test surgery** (this wave's file): `DOT=13→12`, `CELL=24→28` (the stub CELL is the PITCH — R4), `ELONGATION_MIN→18`; the `maxHi > target` overshoot arm REPLACED by a squish arm (peak `--stretch` ≥ 1.12 — at ζ0.82–0.88 the positional peak ≈0.34 px is sub-perceptual; canon: delete the claim, not the damping); `CONNECTIVE_MIN_FRAMES=6` untouched. The happy-dom rect-stub loses ratification authority; paint claims live in π.

## 7 · §PAINT — π/DELTA (captured paired artefacts, never commit-message claims; all timing on `/navigation/pager-dots` + the vertical rail — the hero autoplays at 4200 ms)
| π | route · measurement | HEAD | bar | engines |
|---|---|---|---|---|
| π1 | pager-dots · 1-cell hop first-motion→settle | 1350 ms (range 1306–1364) | ≤300 ms — **sets τ_e** | Cr + safari-app |
| π2 | 4-cell hop | 1721 ms | ≤400 ms | Cr + safari-app |
| π3 | neck-visible fraction | 89.7–90.9% | ≤60%, 0 ms post-arrival hairline | Cr |
| π4 | active:inactive photometric @dpr2 | 2.223:1 | ≥3:1 (predicted 4.24) | Cr + safari-app, **light AND dark arms — dark OWED, whole record is light** |
| π5 | mid-hop silhouette plateaus | 2–3 frame-dependent | 1 | Cr |
| π6 | `/navigation/carousel` "Hero-scale worm" · bed↔button drift | 8.00 px, both engines | 0 | Cr + safari-app |
| π7 | `/navigation/carousel` ex.5 (12 slides, fit-7) · travel per interior hop 4–8 | 0.00 px ×4 | ≥1 pitch every index | Cr + safari-app |
| π8 | idem · activated-dot displacement on pointer click | −90 px | ≤0.5 px | Cr + safari-app |
| π9 | peak `--stretch` 1-hop / 11-hop | 1.095 / 1.200 clamped | ≥1.12 AND distinguishable by hop length | Cr |
| π10 | carousel (autoplay pinned off) · embla advance travel + overshoot | 1130–1242 ms / 0.00 | 420–480 ms with a settle — **sets `CAROUSEL_WEIGHTY_DURATION`** | Cr |
| π11 | gCS per `paintWorm` frame | 5.25 | 0 | Cr |
| π12 | rest/hover/press/focus-visible computed, + coarse 393×852 | byte-identical | pairwise distinct; coarse cell ≥44 | Cr + safari-app |
| π13 | settled rail · distinct frames in 60 rAF | 1 | >1 silhouette-invariant; PRM→1 | Cr |
| π14 | every `--pager-*` length + ring pad/gap ∈ series ∪ named derivations (24, 44, 28) + mobile arm | 9 values 0 on series, no mobile | all legal, one rung down | Cr |
| π15 | carousel roots/items/counter a11y census | 5/0/0/0 · 35/0/0/0 · null/null · 1 empty live node | roles present, off-snap inert+hidden, counter announces | Cr + safari-app |
| π16 | `.pager-worm-layer` computed `filter` (3 routes) | `url("#pager-worm-filter-v-*")` | `none` — discharges PROPORTION §7a cell 3 by construction | Cr + safari-app |
| π17 | dark-arm photometry of all above | never measured | OWED | Cr + safari-app |

**safari-app posture:** DISCHARGED at HEAD for drift/frost/`CSS.supports`/key-theft/a11y census (identical both engines); **OWED on every row the greenfield mints** — translate/scale compose order + the stadium union are exactly where Safari and Playwright-WebKit gave opposite results here. `scripts/safari-probe.mjs`, `pkill -f safaridriver` first; never "Safari" from Playwright-WebKit. **Prefix trap:** nothing in this wave authors `backdrop-filter` in any form.

## 8 · §REJECTED — with falsifiers
1. **DAG row 44 MOVE-TO + any `useDeck.ts` survivor** — after zero-caller strikes ~30 lines remain; PagerDots:101-105 already computes the clamp; "consumer count is NOT sufficient either way"; a directory is not earned by one file (DAG-RULINGS:269). 2. **Collapse deck→carousel** (ROUND-1:278) — carousel is 490 lines of embla DOM, deck has zero SFCs; the union is bigger than the parts and makes four keyboard implementations of one contract. 3. **Keep the SVG filter on the σ8 rationale** — the note explains the layers, not the filter; ablation 1–2 px on 13 px; girth literal 0.7 on 100% of frames; canon prohibition + named live obligation + RED discharge + blocking Safari cell. 4. **Keep Arm B** — `CSS.supports` true both shipping engines; a floor nobody can stand on. 5. **τ 0.27→0.13 retune** — `τ·ln(gap/ε)` survives any τ; root cure is less code. 6. **Keep ζ0.64** — the retired-`bouncy` cell; 7.1% vs corpus ceiling 4.7%. 7. **≤2×pitch clamp** — still near-rigid on an 11-hop; superseded by the band. 8. **"Any hop ≥2 clamps"** — 2-cell measures 34.09/1.189, below both caps; fires at ≥3. 9. **"Rigid slide 57%"** — 292/1721 = 17%. 10. **Breathing-scale rest idle** — canon's bouncy deletion: liveliness on the LIGHT, never a geometry idle. 11. **`calc()` hit-inset** — target = cell → inset ≡ 0; zero knobs beat two. 12. **`panelIds` dead** — mis-defaulted, not dead; 4 tablists → 0 panels is harm; it becomes the tabs-register key. 13. **Intermediate-pip wake-lift** (Opus arm adopted, ADJUDICATOR STRIKES — R2) — occluded lift under the opacity-1 worm; a decay-only wake bought with per-pip per-frame writes in a driver being taken to 0 gCS; geometry channel where canon routes light. 14. **DELETE the deck story** (Fable arm — R1) — falsifier: it is the sole consumer of `pattern="group"`/`:ring="false"` and the sole announcer exhibit (grep, this seat); deletion leaves surviving props with zero demo sites. 15. **"Tombstone test 55"** (Fable arm — R3) — :33-50 is a live 19-line focus-guard test; ~30 of 55 live. 16. **Morph-test `CELL=24→pitch 28`** (Fable arm — R4) — the stub places pips at `idx*CELL`; CELL IS the pitch → 28. 17. **Keep `constants.ts`** (Opus arm — R5) — 4 one-line fallbacks, one importer; fold. 18. **Four gates only** (Fable arm — R6) — leaves D-3's policy regression ungated; G-PAGER-WINDOW has a named biting mutation. 19. **Specular fix in `surfaces-pager.css`** — the value lives at `glass-fx.css:69`, library-wide. 20. **"No focus indicator"** — a `box-shadow` ring paints; the defect is 1.91:1 under-contrast, routed to A1. 21. **gCS=2** — 5 (rem-branch + stretch getter), instrumented 5.25. 22. **Reformat carousel** — no lint config exists; no standing; buries the diff. 23. **File-absence gate** — passes on a broken tree that merely lacks the files. 24. **Any masking fallback for the unfrosted ring; any cross-fade/slide replacing the goo-morph** — standing edicts. 25. **"The deck source lies about focus-guarding"** — the header says GLOBAL verbatim; the design is the defect, a stronger finding. 26. **Wave name W-PAGED** — one wave, one name.

## 9 · §ROUTED
| finding | owner | handover |
|---|---|---|
| D-18 frost (2 surfaces + 1 route at `backdrop-filter:none`) | W-FROST | receiver named + measured: `surfaces-pager.css:42` ← `--glass-cell-backdrop-filter` seeded `none` by `material.css:55-66` (whose :53 asserts floating descendants stay independent lenses — the pager pill is the counter-example). W-PAGER authors no byte there, no fallback; no sentence in this spec claims frost it doesn't compute |
| `--glass-specular` 0.45 (3.75× the 0.12 ceiling) | glass-fx token wave | `glass-fx.css:69` (dark arm 0.30); library-wide |
| focus ring 1.91:1 → `outline 2px @ 0.48` + offset | A1 shared `.focus-ring` | `.pager-dot` is one of A1's elements; no fork here |
| dock row (0.35/0.82 disk → 0.30/0.88 canon) + `--pager-worm-max-stretch` + `snappy` deletion | W-SPRING-RETUNE | **ordering declared: W-PAGER lands AFTER, or re-reads both files from disk at land; reads only, writes neither; never a remembered literal** |
| `deck.vue:167-169` rides `--spring-smooth`, a row canon deletes — story SURVIVES (R1), so the refs are LIVE | W-SPRING-RETUNE | booked for its ref census (corrects Fable's "moot") |
| D-13 per-frame gCS | PERF W2 keeps the gate; **W-PAGER owns `usePagerWorm.ts`→`worm.ts` this cut and DISCHARGES the row** | declared to prevent a double edit |
| 15 remaining phantom `tests/components/custom/*` dirs | test-tree isomorphism wave | W-PAGER deletes only `custom/deck/` |
| `src/index.ts:35-37` stale CarouselNext/Previous doc | CT-6 doc wave | free ride |
| repo-wide formatter absence (`Carousel.vue` mixed indent/quotes) | repo-hygiene band, UNOWNED | real, out of standing |
| `./deck` removal | atlas's tranche, marked addendum | `useStageDeck.ts:2` + `useDeckDetent.ts:1` → ~6 lines local state; slides/speedtest need nothing |
| `useLeadTrail.ts` beside W-TABS's `useSelectionIndicator.ts` | — | different files, no collision; declared so it is not re-litigated |

**Open, measurement-set not spec-set:** `τ_e` (π1) · `CAROUSEL_WEIGHTY_DURATION` (π10). If a row misses, the number moves, not the bar. The rest-floor sheen is the one added surface: if it cannot avoid moving the silhouette or re-arming the parked rAF, it is cut, not softened.


---

# SORTABLE-LIST

**DISPOSITION:** KEEP + SURFACE-OWNING (internally split: KEEP the a11y transaction byte-for-byte · FLATTEN the machinery · GREENFIELD the paint+motion layer) — DAG row 12's grain call RATIFIED, its "unchanged" scope column overturned: the component is not fat, it is naked, and F13 is NOT discharged by 1be91765 (demo-story-only commit, zero src bytes, verified this seat).

**LOC:** 1128 → ~950 (excl. README 27). Strikes ≈356: transitionTiming 80 · touchGate 52 net (13 lines of targetIsHandle move) · ghostRenderer radius-hunt+prose 49 · SortableList <style> 102 · dropResolver prose 14 · dragController dead state 20 · useSortable hops 8 · types members 5 · SortableItem block 7 · SortableHandle block 19. Adds ≈180: styles.css ~85 · motion.ts ~60 · guards/bindings/local-PRM ~35. 1128 − 356 + 180 ≈ 952 → ~950 (band 920–975). Comment-normalised, SAID PLAINLY: stock is 192/1128 = 17.0% (both bench censuses struck, DAG's 17% stands); ~142 of the 356 struck lines are comments, so most of the ~178 NET reduction IS a comment cull while executable churn is a near-neutral REWRITE (~214 code lines out, ~180 in). The net figure understates the work ~2×.

**COLLISIONS:** \n- src/components/tabs/styles/drag.css — .glass-drag-* register (W-TABS/DAG row 10 owns the home move; this wave composes .glass-drag-grabbable only)\n- src/styles/ .sr-only rule (W-TIMELINE/W-A11Y-LIVE-REGIONS mints; this wave consumes, never claims)\n- focus-ring grammar — ROUND-1 A1 class, 16 elements (global wave unifies; this wave ships the A1 grammar on its own grip meanwhile)\n- demo/stories/data/sortable-list.vue (story lane; already touched by 1be91765)\n- demo/stories/substrates/aurora/OklchStopRow.vue + sections/AuroraColorSection.vue (aurora consumer lane, marked addendum per consumer-updates ruling)\n- tests/components/sortable-list.contract.test.ts — governed sortable.keyboard.transaction seat survives unchanged\n- tests/composables/sortable/drag-ring-radius.test.ts (deletes with its predicate; path segment removal → test-tree isomorphism wave)\n- src/styles/utilities/a11y-overrides.css:40-48 — PRM blanket (read-only dependency)\n- src/composables/motion/spring/springPresets.ts (read-only; bind by name)\n- src/composables/motion/morph/useDragMorph.ts (read-only; sampler pattern borrowed, primitive not consumed — it is single-axis)\n- docs/tranches/BJ/addenda/2026-07-24-refinement/MOTION-CANON.md:219 stale --spring-dock literal (canon owner)\n- src/styles/glass/ .glass-floating recipe (read-only receiver; proven resolving)

# W-SORTABLE — TERMINAL SPEC (TRI-FOLD ADJUDICATED)

**Adjudicator modelId `claude-fable-5` · HEAD `0371836d` · every load-bearing shared claim re-verified on disk this seat; live demo :4188 responding (200).** Verified personally: `begin()` stamps `SOURCE_DRAGGING_CLASS` before `beginPointer` clones (`dragController.ts:71,171`) · dist byte order `.sortable-drag-ghost{`@45637 < `.is-sortable-dragging{`@46026 (`grep -abo`) · `registerItem` cached early-return (`useSortable.ts:86-88`) · keydown unguarded vs pointer guarded (`:117` vs `:121`) · dead `dragPosition`/`pointerCaptureActive` returns + `isNonZeroRadius` re-export (`:148-157`) · synchronous `destroyGhost` in `cleanup()` (`:104`) · gold bar + 5s shimmer + `transition:none !important` (`SortableList.vue:90-172`) · `aria-label` swallow bind order (`:56-58`) · `SortableItem` style block = `user-select` only · `springPresets.ts` dock **0.35/ζ0.82**, press **0.2/ζ0.8** · `MOTION-CANON.md:334` verbatim · `MOTION-CANON.md` ENGAGED section carries the stale `(0.30, ζ0.88, 0.21s)` · `useElementMorph.ts:18` = `Extract<…,"snappy"|"bouncy">` · DAG row 12 verbatim (1140 · 17% · cons 0 · KEEP-THIN · "unchanged, flattened") · F13 ledger row verbatim · `./sortable-list` subpath (`package.json:448-450`) · `1be91765` = demo story + evidence PNGs only · component 1128 lines excl. README, per-file counts matching both arms.

## 0 · HEADLINE — where the arms split, and the rulings

The arms agree on the substance of disposition, the defect corpus (identical, differently numbered), the flatten, the strike list, the transaction-is-sacred half, and the vacancy-as-indicator. They split on **five design points**. Each ruled on document text or disk, never averaged:

| # | dispute | FABLE arm | OPUS arm | RULING · ground |
|---|---|---|---|---|
| H1 | **follow motion** | ghost springs to pointer on dock | 1:1 finger-attached, springs only at lift/release/settle | **OPUS.** `MOTION-CANON.md:334` verbatim, read this seat: *"Springs belong to entrances, exits, and releases — never between a finger and the thing it is holding."* Fable's own bench measured lag 7.82px variance-0 — that is the grab offset, already canon-correct |
| H2 | **row geometry** | continuous list: plate card-16/pad-12/edge-0.16, flush cells r0, seams 0.08, gap 0 | discrete rows r10/pad-8, gap 12, seams between rounded rows | **FABLE.** PROPORTION §1.1:51 names **"list-row inset" at pad 12 paired with card 16, residue exactly 4** — the doc's own named pairing for exactly this structure; §4:228 cell r0 is legal "where the element has no silhouette of its own" and a flush row has none. Opus misapplies "disclosure row → control 10" (a different component's role) and his own table draws 1px seams inside 12px gaps between rounded discrete boxes — a floating line his own quoted gap law (≤12 → edge) does not authorize, which he papers over by moving the edge to the plate. Bonus: cell→card ghost promotion dissolves the C2 corner-equality trap entirely — nothing contains the ghost |
| H3 | **ghost frost** | promotes to `.glass-floating`, frost proven | no frost; geometry+specular only ("blur on an opaque clone is a no-op channel") | **FABLE.** Opus's objection assumes the clone keeps its opaque bg — but the material swap IS the promotion: cell → floating glass plate. The receiver is proven resolving `blur(11px) saturate(1.6)` in both body-fixed and Card-nested positions (A22, reproduced twice). LIQUID WEIGHT and the lifted-pane identity are what a frosted promotion buys; S0 untouched (the component authors zero `backdrop-filter` bytes, it composes the class); the 61.6% disease is measured away for this one surface, and gated (G-14). Opus's receiver-proof-banked-unspent posture becomes a receiver-proof-SPENT posture |
| H4 | **source row during drag** | slot becomes the vacancy — one spatial account | source visible at fill ink/0.12 | **FABLE.** Opus's design is B1 R3, which Fable's arm had already rejected on the right ground: two simultaneous spatial markers (visible origin + travelling vacancy) and the row rendered twice. The vacancy IS the origin's slot — one account, iOS-honest |
| H5 | **keyboard lift** | in-place lift, no clone | body clone via `begin()` | **FABLE.** A clone has no pointer to follow — it would float static while rows part beneath it. The in-place promotion (same material, same scale, no clone) is the honest representation and the parsimonious one. Announcements byte-for-byte unchanged either way |

Minor corrections applied to BOTH arms: focus ring = the A1 grammar **`outline: 2px @ 0.48` + `0 0 8px @ 0.15`, `outline-offset: 2px`** (PROPORTION:204, read this seat) — Fable's 1px was off-doc, Opus left width unstated · lift scale **1.04** (canon PRESS-swell; Fable's 1.02 minted) · activation slop **8px or 400ms hold** (Opus; Fable's 4px sits inside coarse-tap jitter) · empty-list receive = **min-block-size springs to the subject's block size** (Opus, derived from the vacancy law; Fable's static 52 is a second law where one already computes) · **bind springs by NAME** (`springPreset("dock")`), never literal (Opus's three-values-one-name ruling; canon:219 stale literal routed) · drop lands with canon's **afterglow**: the landed row drains fill 0.12 → rest on the press clock ≤120ms.

## 1 · DISPOSITION

**KEEP + SURFACE-OWNING · flatten `composables/` · greenfield the paint and the motion · the transaction survives byte-for-byte.** DAG row 12 (`DAG-RULINGS.md:105`): grain RATIFIED (7 files, 1 composable; two filenames also lie), the "unchanged" scope column OVERTURNED — the DAG measured LOC and consumers and cannot see paint. What paint shows: the row stylesheet is `user-select` only, so six call sites invented four row treatments and four grips; and the one authored visual idea (the gold lift kit) has never rendered because the clone inherits `.is-sortable-dragging{opacity:.35}` — mechanism and shipped byte order both verified this seat. **F13 NOT discharged by `1be91765`**: one demo file + evidence PNGs, zero src bytes (git show this seat); row-grain waste grows with viewport after the cure (74.9% @1440 → 81.2% @1920, thrice-measured). The `md:grid-cols-2` wrapper is correct at the page grain and STAYS. DELETE not on the table: 2 live demo consumers, published `./sortable-list` subpath, 219-line contract suite.

## 2 · §DEFECTS (both arms' corpora, unified — all mechanisms disk-verified this seat where cited)

| id | defect | sev |
|---|---|---|
| D1 | Ghost paints 0.35 ≡ source — class stamped in `begin()` (`dragController.ts:71`) before clone (`:171`); equal specificity, later rule wins; SHIPS in 7.0.0 (dist bytes 45637<46026). The authored lift kit has never rendered | crit |
| D2 | Zero frames of motion anywhere: `transition:none !important` (`SortableList.vue:95,99-105`), ghost destroyed synchronously (`:104` cleanup), 95px teleport ΔY 0.00/250ms, row tops byte-identical 330ms post-drop, `transformedRows: 0` mid-drag — the list never parts, the drop never settles | crit |
| D3 | `disabled` stale across remount + unbounded `bindings` leak (`useSortable.ts:86-88` cached early-return, never evicted; `elements` IS evicted). aria-disabled true while button.disabled false — reproduced by three seats | crit |
| D4 | Empty list = invisible drop target that accepts the drop (hint is a pseudo-element on a ROW; zero container state; drop succeeds) | high |
| D5 | Drop bar off-series both values (5px @ ∓2.5px in an 8px gap), mass 9.4× the indicator rung (4.5 vs 0.48), spends the gold metal/earned register on a transient, 5s-linear shimmer advances ~15% in a 300ms lifetime | high |
| D6 | No row surface (`SortableItem.vue` block = user-select only) → 6 call sites invented 4 treatments, 4 grips, 3 radii, 3 paddings; F13's root | high |
| D7 | F13 horizontal: 74.9–76.9% of Tasks row empty @1440 → 81.2% @1920; grows with viewport (kanban 90/92.8% claims STRUCK — unreproduced; true max 57.8/68.4) | high |
| D8 | Keydown path unguarded vs pointer path guarded (`useSortable.ts:121` vs `:117`); live victim `AuroraColorSection.vue:254` — Space on a nested `<input type=color>` silently lifts (ROUND-1 A11Y-1) | high |
| D9 | Row off-series every axis: pad 10/12, r6 (the checkbox's tick rung), gap 8, `--border` tan α0.7 (retired ink, 1.28:1), 4 type sizes, split elevation | med |
| D10 | Fine-pointer grip 15.28×18.61 = 284px² vs WCAG 2.5.8's 24 minimum (no modality exemption); coarse 44 floor WORKS (15/15 verified); `README.md:24` claims 44 unconditionally | med |
| D11 | Dead at rest: hover ≡ rest byte-for-byte, `cursor:auto`, press RETURNS to rest ink (discards hover emphasis), focus = Chrome UA blue | med |
| D12 | `aria-label` silently swallowed by the `label` default (bind order, `SortableList.vue:56-58`, read this seat) | med |
| D13 | Stationary tap = completed transaction ("Dropped … position 1 of 5", no activation distance) | med |
| D14 | Dead ceremony: `axis` ×5 files 0 consumers · `dragPosition` 0 readers · `pointerCaptureActive`+warn latch 0 readers · re-export hops (ROUND-1 F2/F11) | med |
| D15 | Structure: two lying filenames (`transitionTiming` has no timing, `touchGate` gates no touch) · forked drag register vs `.glass-drag-grabbable` · 4 CSS lanes incl. library-global classes in an unscoped SFC block · displaced test through a re-export hop · static `rotate(1.5deg)` width-dependent · comment mass inverted (143 lines in 4 sand files, `dragController` 267 ln has 1) | med |
| D16 | `resolveVisibleRadius` 26-line getComputedStyle walk per lift — exists only because the component doesn't know its own corner | low |
| D17 | Keyboard drag lifts nothing (`createGhost` only from `beginPointer`) | low |

## 3 · ADJUDICATION

**Bench findings:** the two arms' per-finding adjudications agree on every bench item except where §0 rules; the union is ADOPTED as written in the arms, including jointly: B3's stale-disabled find (the corpus's one correctness bug), both arms' refutation of B3's row-drag-no-clone (clipping ancestors + contract-covered cross-list transfer), the caret refutation (cannot exist on an empty list, cannot travel), the axis-resurrection refutation (NO LEGACY cuts both ways), named-slots refusal, the reduced-motion-CSS-blanket refutation of B1 (`a11y-overrides.css:40-48`, measured 1e-05s), B1's ":4188 unusable" refutation (browser-seat singleton; :4188 responded 200 this seat), the comment-census ruling (192/1128 = 17.0%; both bench regexes miss block continuation lines; DAG's 17% stands, its 1140 total is itself slightly off vs 1128+27), the kanban-90% strike, the press-ΔRGB strike (press returns to rest ink — worse), and B2's `useElementMorph("dock")` refutation (type is `Extract<…,"snappy"|"bouncy">`, read this seat).

**Arm-vs-arm:** the five headline rulings in §0 (H1 OPUS · H2 FABLE · H3 FABLE · H4 FABLE · H5 FABLE), plus: activation 8px/400ms (OPUS) · focus ring = A1 grammar exactly (BOTH corrected) · lift scale 1.04 (OPUS, canon-cited) · empty-receive dynamic vacancy (OPUS) + armed plate fill 0.12 (FABLE) merged · `handleSelector:null` dev-throw REFUSED (OPUS — `registerItem` runs before descendants render; converts a supported configuration into a runtime error) · bind-by-name spring rule (OPUS) · LOC honesty framing (OPUS — the net is largely a comment cull and the spec SAYS SO; Fable's "not primarily a comment cull" is true only of the gross strike, both stated in §9) · Opus's real ADD that Fable missed: **a LOCAL `prefers-reduced-motion` gate on every rAF spring path** — the CSS blanket cannot stop a JS integrator · Fable's real catch that Opus missed: none material; Fable's §CLOSE ordering note ADOPTED (D1's clone-before-stamp fix lands FIRST — nothing else can be paint-verified while both copies render at 0.35). One Opus gate-hygiene ruling ADOPTED wholesale: struck standalone grep-gates that green on a deleted tree; G-NO-LINE valid only paired with G-PART.

## 4 · §THE DESIGN

**DOM (no new API):** `ul[data-sortable-container] > li.sortable-item` (grid `auto 1fr`, gap 12) with `[data-sortable-handle]` + `.sortable-item__content` (`display:flex; align-items:center; gap:12; justify-content:space-between`) wrapping the unconstrained default slot. **The `space-between` wrapper is the F13 horizontal cure at zero API cost** (OPUS): one child packs left, two become poles, three distribute. One `aria-live` region per instance (correct, context-scoped). Ghost = body-appended clone positioned by `transform: translate3d` ONLY (never `left/top` — `useDragMorph.ts` names the law; today's `ghostRenderer` violates it).

**Surface — the continuous list (every value series-derived, law named):**

| element | value | law |
|---|---|---|
| list plate | r **16** · pad-inline **12** · edge 1px warm ink/**0.16** | §4 card; §1.1:51 "list-row inset" 12 ↔ card 16, residue exactly 4 — the doc's own named pairing |
| rows | **flush cells**: r 0, gap 0, pad **12** block/inline; between rows a **seam** 1px ink/**0.08** | §4:228 cell ("no silhouette of its own"); seam = the in-content rule; the plate boundary and the in-content rule are different ladder rungs |
| row hover | fill ink/**0.05**, `@media (hover:hover)` | §1.3 hover |
| keyboard-lifted row | fill ink/**0.12** (persistent state) | §1.3 selected |
| grip | **32×32** fine (glyph 16 + 2×pad 8), **pill**, coarse 44 via existing `data-control-target` (verified working); ink 0.48 rest → 1.0 on hover, press scale 0.96 on `press` | §1.1; §4:234 binds "grip" → pill; WCAG 2.5.8 |
| focus | `outline: 2px @ ink 0.48` + `0 0 8px @ 0.15`, offset 2 | the A1 grammar EXACTLY (PROPORTION:204) so the global wave lands byte-identical |
| type | ONE size: `--text-body` n=0 (18.608 @1440); mobile one rung down (16.50, §1.4:123) | kills the 4-size split |
| mobile ≤768 | every space rung down exactly one: pad 12→8 | §1.1 transposition |
| armed empty/receiving list | plate fill ink/**0.12**; `min-block-size` springs to the SUBJECT's block size on `dock` | §1.3 selected; the vacancy law computes the size — nothing minted |
| deleted inks | `--border` tan · all `--color-gold` uses (returns to the metal/earned register) | §1.2 |

**Motion — presets bound BY NAME (`springPreset("dock")` = 0.35/ζ0.82, `("press")` = 0.2/ζ0.8, disk-verified; never a literal — three values exist for one name across canon:219/disk/memory):**

| beat | spec |
|---|---|
| activation | **8px** slop (series rung, jitter-proof) or **400ms** hold; below it the gesture is a click — zero announcements |
| lift | clone taken BEFORE any source class (kills D1 structurally); source slot becomes the **vacancy** — one spatial account, the row renders exactly once; ghost promotes cell → floating plate: r 0→**16**, scale 1→**1.04** on `press`, composing **`.glass-floating`** (frost `blur(11px) saturate(1.6)` — receiver PROVEN both DOM positions, gated G-14, screenshot-only observation, never `getContext()`); channels = geometry + material, budget met |
| follow | **1:1 finger-attached, linear, zero easing** (`MOTION-CANON:334`) via `translate3d`; a small velocity ring-buffer (the kf sampler pattern — the single-axis `useDragMorph` primitive itself is NOT consumable here) feeds release velocity + tilt; tilt velocity-derived on the shared tanh register, capped at the existing **1.5°** (no new ceiling; the static constant dies) |
| part | **the vacancy IS the indicator** — rows FLIP by the subject's block size on `dock`, compositor-only; cross-list via existing `setExternalDropIndex` (`useSortable.ts:61-63`) driving the target's OWN clock — two springs of identical response read as one, no orchestrator; empty container: armed fill + vacancy-sized min-block IS the slot. Closes D4 by construction; nothing is ever drawn |
| drop | `commit()` before `cleanup()` so the endpoint rect is measurable; ghost flies from release position WITH release velocity to the vacancy rect on `dock` (a gesture-released exit may overshoot — canon's one exception), r 16→0, scale→1, frost out; cross-fade ghost↔row; the vacancy never closes — the row lands in it; then the landed row drains fill 0.12→rest ≤120ms on `press` (canon's afterglow) |
| cancel | ghost springs BACK to the origin slot on `dock` inheriting velocity; vacancy closes on `press` (0.20 = 0.57×0.35 — G4 asymmetry by derivation) |
| keyboard | the focused row lifts **in place** — same material promotion (scale 1.04, `.glass-floating`), NO clone; displacement FLIP identical; all four announcements byte-for-byte unchanged |
| reduced motion | every rAF spring path takes a **LOCAL** `prefers-reduced-motion` gate → 1-frame cut — the `a11y-overrides.css` blanket stops CSS clocks, not a JS integrator (the scope correction) |
| rest | grip ink ramp + row hover fill + `cursor:grab` via composed `.glass-drag-grabbable` = the engagement floor; **no idle loop** (canon: breath is a floor, not a loop) |

**Public surface:** exports unchanged minus `axis`, `dragPosition`, `pointerCaptureActive`, `isNonZeroRadius` re-export. Retired class contract (`.sortable-drag-ghost`/`.is-sortable-dragging`/`.is-sortable-drop-*`) — consumers break loudly, no shim. `aria-label` passthrough wins (bind-order fix). `registerItem` stops caching; `bindings` evicts on unmount. ONE `targetIsHandle` guard on BOTH pointer and keydown paths, structurally. No `handleSelector:null` dev-throw.

**On-disk (flatten, module-name stripping):** `src/components/sortable-list/{SortableList.vue, SortableItem.vue, SortableHandle.vue, styles.css, useSortable.ts, drag.ts, ghost.ts, resolve.ts, motion.ts, context.ts, types.ts, index.ts, README.md}`. `composables/` DELETED; `transitionTiming.ts` + `touchGate.ts` DELETED (targetIsHandle's 13 lines fold into `useSortable.ts`); radius hunt DELETED (the corner is authored). ONE CSS lane: `<style src=\"./styles.css\">`. `index.ts` re-points `SortableId` to `./types`. README requalified 32 fine / 44 coarse. Tests: `tests/composables/sortable/drag-ring-radius.test.ts` deletes with its predicate; contract suite's governed `sortable.keyboard.transaction` seat unchanged; new gates in `tests/components/sortable-list/` — never colocated in src.

**Survives untouched (the good half — nobody may greenfield it):** propose/commit/cancel + four announcements + focus retention + one `reorder` emit · cross-list transfer (`dragController.ts:131-147`) · O(rows) midpoint scan · `createStrictContext` · clone id-stripping · the 1:1 finger attachment (vindicated by canon).

## 5 · §STRIKE / §ADD

**STRIKE:** gold bar + shimmer + both drop classes + `flagsFor`/`computeDropClasses` + 4 class constants (die together) · `transitionTiming.ts`, `touchGate.ts` (lying names, sand) · `axis` thread ×5 · `dragPosition` · `pointerCaptureActive` + warn latch · radius hunt + displaced test · `rotate(1.5deg)` constant · `transition:none !important` ×2 · `--border` tan on rows · binding cache · aria-label shadow · unconditional README 44 · all three SFC style blocks (102+7+19) · ~142 comment lines riding the struck files (named as such).

**ADD (affordance owed):** the row surface (hover fill, seams, press answer, cursor, two-pole content) · lift/follow/part/settle/cancel with real springs · the vacancy + armed-plate + dynamic min-block empty-list affordance · 8px/400ms activation · 32-fine grip + A1 focus ring · frosted promotion on the proven receiver · keyboard in-place lift · LOCAL PRM gate on every spring path · story redesign (trailing-pole content in the default slot, one grip, one type size — F13's receipt).

## 6 · §GATES — born-RED, mutation named

| id | assertion | RED at HEAD | mutation |
|---|---|---|---|
| G-1 LIFT-SOLE | mid-drag ghost `opacity ≥0.9` AND the source slot renders as vacancy (source not painted as a second copy) | 0.35 ≡ 0.35, source visible | stamp class before clone → RED |
| G-2 PART | mid-drag `dropIndex≠sourceIndex`: ≥1 non-clone row non-identity transform, displaced ≥0.5×rowBlockSize | transformedRows 0, tops identical | remove FLIP → RED |
| G-3 SETTLE | ghost in DOM ≥2 rAF post-`pointerup`, rect differs frame0→frame2 | destroyed at frame 0 | restore sync destroy → RED |
| G-4 RECEIVE | over an empty container: armed fill + resolved min-block ≥ subject block size; cross-list parts settle within one frame of each other | container byte-identical, drop still succeeds | delete receive state → RED |
| G-5 NO-LINE | zero `::before/::after` insertion, zero `is-sortable-drop-*`, zero `--color-gold` in component | live at `SortableList.vue:133-172` | re-add either → RED. **Valid ONLY paired with G-2 — alone it greens on a deleted tree; stated openly** |
| G-6 GRIP | every handle ≥32×32 fine (1440 AND 390), ≥44×44 coarse | 15.28×18.61 fine; coarse OK | remove floor → RED |
| G-7 REST | hover bg ≠ rest inside `(hover:hover)`; `cursor:grab`; zero `animation-name≠none` at rest | hover≡rest, cursor auto, 5s shimmer | revert hover or re-add loop → RED |
| G-8 SERIES | plate r 16px, edge ink/0.16; row pad 12px, seam ink/0.08; grip pill | 10px 12px · 6px · 8px · tan α0.7 | restore any → RED |
| G-9 GUARD | Space on a nested non-handle focusable: no lift, `defaultPrevented===false`; stationary tap: zero announcements, zero emits | prevented+lifted; "Dropped…" on tap | drop keydown guard or slop → RED |
| G-10 FRESH | remount→`disabled=true`→`button.disabled===true` AND aria agrees; `bindings.size ≤` live rows | aria true / button false; map unbounded | restore cache → RED |
| G-11 ARIA | consumer `aria-label` survives to the `ul` | swallowed to "Sortable list" | restore bind order → RED |
| G-12 SURFACE | `axis`/`dragPosition`/`pointerCaptureActive`/re-export absent; `composables/` gone; no lying filenames | all present | re-add any → RED. Structural only, explicitly not a paint gate |
| G-13 KEYS | keyboard lift: focused row carries the promotion (scale≠1 or material class) while lifted | nothing lifts | remove in-place lift → RED |
| G-14 FROST | mid-drag ghost computed `backdrop-filter` = `blur(11px) saturate(1.6)` — screenshot/computed-style only | no receiver on ghost | drop `.glass-floating` → RED. Fails LOUD if the receiver breaks — no fallback |

Struck (both arms' hygiene sustained): standalone grep-gates on deleted names · "imports springPreset" · comment-ratio gates · any gate on an unclaimed property.

## 7 · §PAINT — π/DELTA obligations, route `/data/sortable-list`, light AND dark, paired RED/GREEN same frame

| claim | measure | viewport | engine |
|---|---|---|---|
| lift sole+legible | ghost opacity ≥0.9, source slot = vacancy; RED banked 0.35≡0.35 | 1440×900 | chromium AND **safari-app** |
| ghost frosts | computed `backdrop-filter blur(11px) saturate(1.6)` mid-drag; screenshot-only, never `getContext()` | 1440×900 | chromium AND **safari-app** |
| momentum | 6-frame strip across 95px teleport + pointerup+0…330ms; RED ΔY 0.00 | 1440×900 | chromium; safari-app screenshot pair |
| the gap opens | populated list AND emptied kanban column, paired PNG; RED 0 displaced | 1440×900 | chromium AND **safari-app** |
| F13 receipt | row ink fraction ≥60% at the ROW (grid wrapper is not the cure); RED 25–42% | **1440 AND 1920** | chromium |
| targets | ≥32×32 fine / 44 coarse unchanged | 1440 fine + 390×844 coarse | chromium AND **safari-app** |
| series | plate r16/edge 0.16, pad 12, seam 0.08, one type size, PRM sweep (`animation-*` under reduce) | 1440 + 390 | chromium AND **safari-app** |

**Safari BLOCKING at cut** (both arms + jurors: zero Safari runs so far): `pkill -f safaridriver` then `scripts/safari-probe.mjs`. Unavailable ⇒ receipt reads "WebKit NOT run" — never "both engines", never "Safari" from Playwright-WebKit. S0 prefix trap untouched: the component authors zero `backdrop-filter` bytes.

## 8 · §REJECTED — with falsifiers

| idea (source) | falsifier |
|---|---|
| **spring-lag the ghost behind the pointer (FABLE arm + all 3 benches)** | `MOTION-CANON.md:334` verbatim, read this seat: springs never between a finger and the thing it holds; the 7.82px variance-0 lag is the grab offset, already correct |
| **discrete rows r10/pad-8, gap 12 (OPUS arm, J2 C2)** | §1.1:51 names "list-row inset" 12 ↔ card 16 as the doc's own pairing; "disclosure row" is a different component's role binding; his own table draws seams inside 12px gaps between rounded boxes, unauthorized by the gap law he quotes |
| **no-frost lift, specular-only (OPUS arm)** | assumes the clone keeps its opaque bg — the material swap IS the promotion; receiver proven `blur(11px) saturate(1.6)` both DOM positions, twice reproduced; gated G-14, fails loud |
| **source row visible at fill 0.12 during drag (OPUS arm = B1 R3)** | two simultaneous spatial markers + the row rendered twice; the vacancy is the one account |
| **keyboard body-clone (OPUS arm)** | no pointer to follow — a static floater over a parting list; in-place promotion is honest and cheaper |
| 4px activation slop (FABLE arm) | inside coarse-tap jitter (5–10px); 8 is the series rung that survives a tap |
| static 52 min-block on the armed empty list (FABLE arm) | the vacancy law already computes the size from the subject; a second law is minted redundancy |
| 1px focus ring (FABLE arm) | A1's cure is `2px @ 0.48 + 0 0 8px @ 0.15, offset 2` (PROPORTION:204) — ship the grammar the global wave will land |
| lift scale 1.02 (FABLE arm) | canon PRESS-swell is 1.04; 1.02 is minted |
| drag the row, no clone (B3) | cannot escape clipping/scrolling ancestors; cross-list transfer is contract-covered — kanban IS the overflow case |
| 2px@0.24 travelling caret (B2) | cannot exist on an empty list; cannot travel |
| wire `axis` (B3) | 0 consumers/stories/tests/paint; NO LEGACY cuts both ways |
| `#lead`/`#trail` slots (B1/B3) | `justify-content: space-between` buys the two-pole row for one declaration and zero API |
| row r16 (B2) / r12 (B3) | corner-equality inversion / not a role rung — both moot under flush cells |
| `useElementMorph("dock")` (B2) | `useElementMorph.ts:18` = `Extract<…,"snappy"|"bouncy">`, read this seat |
| dock 0.30/ζ0.88 (B1, canon:219) | disk 0.35/0.82 read this seat; three values one name → bind by name, stale literal routed |
| `handleSelector:null` dev-throw (B3, FABLE arm adopted) | `registerItem` runs before descendants render — unevaluable where it would throw; converts a supported config into an error |
| "reduced motion ungated" (B1) | `a11y-overrides.css:40-48` blanket, measured 1e-05s — but the blanket does NOT cover rAF springs, hence the local gate in §ADD |
| ":4188 unusable" (B1) | responded 200 this seat; nine clean contexts prior; the browser-seat singleton |
| kanban 90/92.8% (B3) · press ΔRGB 4/3/2 (B3) · comment 13.7%/16.9% (B2/B1) | unreproduced / press returns to REST ink / block-aware census 192/1128=17.0% |
| recessed track-well placeholder (B3 Q2) · cross-instance orchestrator (B3 Q1) | vacancy already expresses it / `setExternalDropIndex` already crosses; gated not architected |
| DELETE the component | 2 live consumers, published subpath, contract suite; nobody argued it — banked so nobody starts |

## 9 · §LOC

See the `loc` field. Order of work: **D1's clone-before-stamp fix lands FIRST** — nothing else is paint-verifiable while both copies render at 0.35.

## 10 · §ROUTED

| what | owner |
|---|---|
| `.glass-drag-*` register home move out of `tabs/styles/` | W-TABS (DAG row 10); this wave composes only |
| ONE `.sr-only` rule in `src/styles/` (8 consumers) | W-TIMELINE / W-A11Y-LIVE-REGIONS — whichever lands first mints; this wave consumes |
| global focus-ring grammar (A1, 16 elements) | the A1-class wave; this wave ships the A1 grammar on its own grip meanwhile |
| `--border` divider-ink retirement library-wide | the token wave; this wave stops consuming it |
| story two-pole fill + grip unification (`data/sortable-list.vue`, keep `md:grid-cols-2`) | story lane |
| `OklchStopRow.vue` + `AuroraColorSection.vue` → `<SortableHandle>` adoption | aurora consumer lane, marked addendum per the consumer-updates ruling |
| `MOTION-CANON.md:219` stale `--spring-dock` literal | canon owner; every consumer binds by name meanwhile |
| `tests/composables/sortable/` path removal (directory empties) | test-tree isomorphism wave |
| `material.css:66` subtree-inheritance defect | PROPORTION §5a owner; measured NOT to affect `.glass-floating` — no dependency |
| browser-seat singleton hygiene | orchestrator process note; no wave |


---

# SEARCH

**DISPOSITION:** SPLIT — DAG row 20 (DAG-RULINGS.md:113) upheld in verdict, LOC grain and new home (composables/search/ + components/search/); ground amended: the matcher needs REPAIR (it silently nulls present subsequences — reproduced by this adjudicator at text length 11/72/133/255 for 1/2/3/5-char queries) and the SFC needs GREENFIELD (51% of the plate dead to the pointer, two of three prop axes inert). Not DELETE (live route + dock consumer), not MERGE-INTO field-control (the fold de-glasses the one live frosted field — .field-control computes backdrop-filter: none).

**LOC:** 566 → ≈480 nonblank (−86, −15%). Baseline measured this seat: TS/SFC 486 (76+32+11+202+129+31+5, matches DAG row 20's 410 code/76 comment) + recipe 62 (utilities/components.css:6-69) + tokens 18 (sizing.css:124-141 = 17 + offsets.css:43 = 1). After: composables/search ≈323 (match 202−25−camel 8, useFuzzySearch 129−12, types 31, index 5) + components/search ≈157 (SearchBar ≈95, styles.css ≈58, index 4). Code 443 → ≈416 (−27 net: −74 dead code [variants 32 · prefix cache 17 · expand state+Escape branch 12 · camel 8 · duplicate barrel 5] + 47 owed affordance [clear+label root+status 18 · motion 14 · mobile 6 · dedupe/sort 4 · md rung 3 · focus() expose 2]); comments 123 → ≈64 (−59: token block 14 · recipe rewrite ~25 · SFC axis comment 11 · variants 8). THE MAJORITY OF THE LINE DROP IS COMMENT (−59 of −86) and this spec says so — Opus's honesty adopted, Fable's "deletions are code, not comments" overruled by the deleted blocks' own density (recipe 33/62, token block 14/18); Fable's narrower point stands: family stock 15.6% is not a cull target.

**COLLISIONS:** \n- src/styles/utilities/components.css:6-69 (recipe deletion — shared with any utilities wave)\n- src/styles/tokens/sizing.css:124-141 (all 4 --search-* tokens + comment)\n- src/styles/tokens/offsets.css:43 (--max-width-input)\n- src/components/dock/styles/search.css (re-point .input-bar/.input-bar-field → [data-search-bar]/[data-search-field]) — W-DOCK, one cut\n- src/components/dock/composables/useDockSearch.ts:53,263 (deep import + close() call site) — W-DOCK\n- demo/stories/dock/dock-search.vue:198-246 (hand-rolled .input-bar → <SearchBar>) — W-DOCK\n- demo/stories/data/search.vue (mounts, @keydown wiring, blurb fix, status prop)\n- tests/styles/radius-role-canon.test.ts:226-236 (pins floating:"" — rewrite in same cut)\n- tests-visual/w1-radius-redress.spec.ts:225-280 (clone-based — rebuild as real mounts)\n- tests-visual/search-custom.spec.ts (DELETE)\n- tests/public-surface.spec.ts:247 + tests/gates/token-hygiene.test.ts (fold rows — one owning wave each)\n- src/styles/glass/surface-axis.css + Surface veil 0px radius — ROUTED to W-SURFACE, receipt only

# W-SEARCH — TERMINAL SPEC (TRI-FOLD ADJUDICATION)

**Adjudicator modelId: `claude-fable-5`.** Arms: Fable foreman (`claude-fable-5`) + Opus foreman (`claude-opus-5[1m]`), same benches/jury. HEAD `0371836d`. Every load-bearing shared claim spot-checked on disk this seat; matcher thresholds re-derived independently (scratchpad/match-check.mjs). **`safari-app`: OWED on every row** — all seats got `fetch failed` from safaridriver (GUI-only enable); no Safari claim exists in this record and none is made.

## 1 · DISPOSITION

**SPLIT, upheld — DAG-RULINGS.md:113 row 20; ground amended in both halves.** Both arms ruled SPLIT independently; no disposition conflict. The matcher **silently discards present matches**: `fuzzySearchIndex.ts:86` `score -= (tLen−pLen)×0.1` then `:146` `best <= 0 → null` — a present subsequence drops at text length **11/72/133/255** for 1/2/3/5-char queries (re-derived by this adjudicator; the demo's own rows carry 60–110-char bodies, so a 1-char query never matches a body). The SFC (`SearchBar.vue:2` div root) puts **51.1% of its plate out of pointer reach** (field 336×24.61 in plate 384×44; coarse target 31.5px < the 44 floor while `--control-floor` inflates the *decoration* to 66), ships a 3-value `surface` with zero effect plus a comment (`:50-52`) asserting the opposite, a 3-name `variant` with `inline`≡`floating` byte-for-byte (`searchVariants.ts:14-15`, verified), and a 3-name `size` with two heights (`control-size.ts` `md:""` + recipe default `--control-h-sm`, verified — the Sizes story at `data/search.vue:555-585` ships three labelled specimens and paints two).

**F17.** The owner's square box was `<FuzzySearch variant="floating">` — deleted at `bda718ac`, not fixed; W1's `floating:""` repoint (`d7588514`) landed on a path with **zero mounts ever** (verified: no `variant=` on any demo SearchBar), and `radius-role-canon.test.ts:231` now *pins* the dead arm (verified: `expect(variants).toMatch(/floating:\s*""/)`). The surviving pill IS `9999px` — drawn in `--glass-border-floating` = **foreground 5%** (`glass.css:425`, verified), computing **1.0003:1** against its ground. The literal complaint is what an invisible stadium looks like. **F17 stays open until the perimeter reaches ≥3:1; this wave closes it.** The 1288×84 0px veil plate framing it is Surface's and ROUTES.

## 2 · §DEFECTS (unified; Fable D-ids ≡ Opus S-ids, one inventory)

| id | defect | evidence | sev |
|---|---|---|---|
| D1 | 51.1% of plate dead to pointer; coarse real target 31.5px < 44 floor while `--control-floor` inflates the div to 66 | `SearchBar.vue:2`; B3+J1+J2 to the digit | **CRIT** |
| D2 | Matcher nulls present subsequences at len 11/72/133/255 | `fuzzySearchIndex.ts:86,146`; **re-derived this seat, exact** | **CRIT** |
| D3 | Perimeter imperceptible: 1px @ α**0.05** → 1.0003:1 vs ground, 1.106:1 vs fill — F17's live content | `glass.css:425` + `components.css:21`; J1 dpr4 | **CRIT** |
| D4 | `surface` 3-value no-op — `.input-bar` (0,1,0) outranks `[data-surface]` on import order; source comment asserts the opposite | `SearchBar.vue:50-52`; bundle offsets per J1 C8 | HIGH |
| D5 | `floating`≡`inline` byte-for-byte, 0 mounts, gate-pinned | `searchVariants.ts:14-15` + `radius-role-canon.test.ts:231`, both verified | HIGH |
| D6 | `bare` keeps `blur(11px) saturate(1.6)` + height + `max-width:384px` — a hard-cornered blur rectangle; unpatchable by reset (PREFIX TRAP) | `searchVariants.ts:16` verified; 3 seats | HIGH |
| D7 | `size="md"` renders sm: 36/36/44; type 14.384/16.4/16.4 — no rung moves both axes | `control-size.ts:5` `md:""` + `components.css:33` default `--control-h-sm`, both verified | HIGH |
| D8 | Recipe fork + wrong home: `components/search/` holds 0 CSS bytes; recipe = 36% of a global utilities partial; `dock/styles/search.css` writes `.input-bar` cross-component; `dock-search.vue:201` hand-rolls the class; `.input-bar` vs `.field-control` disagree on 5/6 axes | verified all four lanes | HIGH |
| D9 | Zero motion: rest frames byte-identical, hover Δ nothing, focus monotone `cubic-bezier(.4,0,.2,1)` zero overshoot | `components.css:36-38` verified; measured 3 seats | HIGH |
| D10 | `/data/search` binds no `@keydown` — ArrowDown+Enter → nothing; the dock DOES consume the combobox half (`dock-search.vue:131-238`, verified) | J2 A2 narrowed by J1 C1 | HIGH |
| D11 | Focus mints 3 marks in 2 inks: `--focus-ring-shadow` legs + tan `--border` flip — **and the shipped ring rides `box-shadow`, the exact A1 mechanism defect (ring and fill share one property)** | `components.css:40-43` verified; PROPORTION:204 | MED |
| D12 | Two destructive clears, neither ours: UA `::-webkit-search-cancel-button` (mouse-only) + UA Escape wipe from `type="search"`; `close():87` wipes `query` on the dock path | `SearchBar.vue:14`, `useFuzzySearch.ts:87` verified; J1 C12 split | MED |
| D13 | `max-width: 384px` baked into the recipe; lg = 29.8% of a 1288px plate, placeholder truncates | `components.css:34` + `offsets.css:43` verified | MED |
| D14 | `matchIndices` violates `types.ts:18` ("positions in item.label"): duplicates, unsorted, `[]` on non-label win (`:142`) | verified on disk | MED |
| D15 | Dead matcher/state code: camel branch `:67-74` unreachable (both sides lowercased `:156-159,:190`); prefix cache `:204-220` keys on trimmed q → never fires multi-token, rebuilds `_lc` when it does; `isExpanded`/`toggleExpanded` + Escape branch `:123-124` unreachable in every shipped consumer | verified on disk | MED |
| D16 | A11y absent + false blurb (`search.vue:488` claims a live count; 0 `aria-live` on the route) + 3 reader-less `--search-*` tokens under a 14-line comment describing deleted `FuzzySearch.vue` | `sizing.css:124-141` verified | MED |
| D17 | Attr split-brain: `class` → plate, `style`/`id`/`data-*` → input | `SearchBar.vue:75-78` verified | MED |
| D18 | Both visual gates inert: `search-custom.spec.ts` targets `search-query` → **0 hits in demo** (verified), always takes the fallback — why 36≡36 was never caught; `w1-radius-redress` clones+classes, never mounts; 463 unit lines (verified), 0 mount `SearchBar.vue` | verified | MED |
| D19 | Proportion drift: glyph frozen 14×14 all rungs; inset:cap 0.722→0.591; mono `Fira Code` on a prose query via setter-less `--input-bar-font`; no ≤768 transposition | `components.css:46-52` verified | LOW-MED |
| D20 | Barrel duplication (`search/index.ts` ≡ `composables/index.ts`, verified byte-equivalent surface) + `controlSizeClass` shim (ROUND-1 F11) | verified | LOW |

## 3 · §ADJUDICATION — arm-vs-arm rulings, each on evidence pulled this seat

Shared inventory (D1–D20): **CONCUR, adopted once** — the arms converged independently on the same 20 defects and every one I spot-checked reproduces. The nine genuine disagreements, ruled:

1. **Focus mark — BOTH ARMS OVERRULED BY THE CANON.** Fable specced `2px @ ink/0.24` citing "§1.2 indicator transposition"; but PROPORTION:92's 2px@0.24 is the **selection-indicator** rung ("findable along a 1288px run"), and PROPORTION:98 pins **"control perimeter and focus ring are gap-independent — always 0.48"**. Opus specced "accent ink measured ≥3:1" — right law (1.4.11), no rung. PROPORTION:204 (A1) names the canonical cure verbatim: **`outline: 2px @ 0.48` + `0 0 8px @ 0.15`, `outline-offset: 2px`** — moved off `box-shadow` because ring and fill share one property (search's own `--focus-ring-shadow` is a box-shadow: the A1 mechanism defect, live here). Both arms' "one mark, delete the glow" struck a leg A1's cure *retains*; what dies is the third mark — the tan `--border` flip (C10 retires the ink). Adopted: A1 verbatim. |
2. **lg type — FABLE WINS.** Opus's token table sets lg = `--control-text` (= md) while its own G-RUNG demands **three distinct font sizes** — an internal contradiction. lg = `--type-body` (0.6% off the φ^(1/4) rung from md, delta stated), giving 3 real rungs. |
3. **Glyph sizing — FABLE WINS.** Opus's `--ui-glyph-sm`/`--ui-glyph` cohort (14/16/16, tokens verified at `sizing.css:92-93`) reproduces the two-rung flatness its own S-17 books as a defect. Glyph + clear glyph = **`1em` of field type** — one named law ("glyph rides the field's type"), three rungs, zero tokens restored (R11). |
4. **Hover spring — OPUS FALSIFIED ON DISK.** Opus cited `press (0.40, ζ0.71)`; disk (`spring/springPresets.ts:116-118`, verified this seat) says **press = response 0.2, ζ 0.8** — 0.40/0.71 is the `panel` row. Hover fill rides `press` at its true numbers; focus/clear/commit ride `snappy` (0.48/0.74, verified). Both arms' path `src/composables/motion/springPresets.ts` corrects to `src/composables/motion/spring/springPresets.ts`. |
5. **Rest carrier — FABLE WINS, OPUS'S DISCIPLINE ABSORBED.** Glyph-only specular (a shimmering plate around prose input is noise — B1's ruling; and a rim leg would contaminate the perimeter-contrast π row this wave lives on). Opus's timing adopted: ~7s sinusoidal loop, compositor-only, **paused on `:focus-within`**, off under `prefers-reduced-motion`, α ≤0.10. |
6. **`role="search"` on the root — OPUS WINS.** A component minting a landmark per instance is a false contract at n>1; the landmark is the consumer's `<form role="search">`. Fable's role-on-label REJECTED (R14). |
7. **Expose — OPUS WINS.** Fable deleted `defineExpose` wholesale ("0 sites"); but `dock-search.vue:137,142` focuses a raw field ref today (verified) and will mount `<SearchBar>` — `focus()` is owed. Narrow `inputRef` → `focus()`, one method. |
8. **`clear()` API — BOTH TRIMMED.** `close()` stops wiping `query` (both agree; dismissal is dismissal). Opus's new `clear()` method REJECTED (R15): `query` is already a public ref on `FuzzySearchState`; whether dock re-instates a wipe at its call site is W-DOCK's one-line decision. |
9. **LOC — OPUS WINS THE CHARACTERISATION.** See §9; Fable's "deletions are code, not comments" is falsified by the deleted blocks' own density; Fable's 15.6% family-stock point survives as the reason this is not a *cull target*. |
10. **Hook naming — MERGED.** Fable's names (`.search-bar*`, root `data-search-bar`, input `data-search-field`) + Opus's layout/plate two-hook split (base class = layout only; `.search-bar-plate` = the glass plate, present by default, **omitted** at `plate:false`). |

## 4 · §THE DESIGN

### 4.1 DOM — the root is the target
```html
<label class="search-bar" :class="plate && 'search-bar-plate'" :data-size="size" data-search-bar>
  <SearchIcon class="search-bar-glyph" aria-hidden="true"/>          <!-- 1em of field type -->
  <input class="search-bar-field" type="text" data-search-field
         v-model="model" v-bind="inputAttrs"/>                       <!-- attrs minus class/style -->
  <button v-if="model" type="button" class="search-bar-clear"
          aria-label="Clear search"><X aria-hidden="true"/></button>
  <span v-if="status" class="sr-only" aria-live="polite" aria-atomic="true">{{ status }}</span>
</label>
```
- `<label>` root: whole-plate focus, proven at HEAD by J1's `tag="label"` probe. Field takes `align-self: stretch` → block extent = plate content box. Dead area 51.1% → 0; coarse target = the plate ≥44. No `role` minted (§3.6).
- Attrs: `const { class: _c, style: _s, ...inputAttrs } = attrs` — `class` AND `style` stay on the plate, the rest (incl. `data-testid`, `aria-*`, `@keydown` listeners) reaches the input (D17). Consumer keyboard wiring needs **no new prop**: the demo binds `@keydown="fuzzy.onKeydown"` and it lands on the field (D10, consumer-side, KISS).
- `type="text"`: kills the UA ✕ AND the UA Escape wipe in one move — nothing to suppress (R3).
- `plate:false` **omits `search-bar-plate`** — class absence, never a reset (PREFIX TRAP, structural discharge).

### 4.2 Tokens — every value on the series or derived by a named law
| axis | value | law |
|---|---|---|
| radius | `--radius-control` (stadium) | W1's repoint correct and paints — not overturned |
| perimeter, rest | 1px warm ink **α0.48** | PROPORTION §1.2 perimeter rung; ≥3:1 measured — F17's actual close |
| focus | **`outline: 2px @ ink/0.48` + `0 0 8px @ 0.15`, `outline-offset: 2px`** — off `box-shadow`; tan flip dies | PROPORTION:98 (ring always 0.48) + :204 A1 verbatim; C10 retires the tan ink |
| fill | cream/0.8 + frost `blur(11px) saturate(1.6)` kept — search stays in the 38.4% that genuinely frost | R1 (merge refuted) |
| hover | +0.05 fill on `press` (0.2, ζ0.8 — disk values) | §1.3 hover rung |
| height | sm 36 / **md 40** / lg 44 via `--control-h-*`; recipe default → `--control-h-md` (matches `.input-pill`); `md:""` stays | R5 — no class whose content is the default |
| pad-inline | **8 / 12 / 12** | 8 = control-xs rung, 12 = control interior; 20 is the presented-plate rung, refused (R6) |
| gap | 8 (correct at HEAD) | control↔glyph rung |
| type | sm `--control-text-sm` / md `--control-text` / lg `--type-body` — 0.6% token delta stated; face `inherit` (`--input-bar-font` dies) | φ^(1/4) ladder; ruling 2 |
| glyph + clear glyph | `1em` of field type — rides the rung | ruling 3; kills the frozen 14px; all four `--search-*` tokens die |
| width | none in the recipe — layout is the parent's; `--max-width-input` dies | D13 |
| mobile ≤768 | pad 12→8, 8→4; gap 8→4 | PROPORTION mobile law, one rung down |
| clear button | hit box `1em`-glyph in a padded target reaching the plate's block extent; no plate at rest; hover fill 0.05; in the tab order | §1.3 + D12 |

### 4.3 Motion — real numbers (`spring/springPresets.ts`, verified), both edicts
- **Focus/blur, clear enter/exit, commit-settle**: `snappy` (0.48, ζ0.74). Overshoot **>0 and ≤10%** — the preset-table fence is the acceptance band. The `0.2s cubic-bezier(.4,0,.2,1)` transition and every `--duration-*`/`--ease-standard` pair in this component are deleted.
- **Hover fill**: `press` (0.2, ζ0.8).
- **Focus is a widening, not a darkening**: rest perimeter already 0.48; the A1 outline springs in with a settle; glyph leads the plate by one frame.
- **Breath of life**: glyph-only specular travel, one leg, α ≤0.10, ~7s loop, compositor-only, paused on `:focus-within`, off under `prefers-reduced-motion`. The plate never animates.

### 4.4 Behaviour
- `close()` (`useFuzzySearch.ts:83-91`) stops wiping `query`; no `clear()` API (ruling 8); dock call-site decision → W-DOCK.
- `status?: string` → the polite live region; demo passes `` `${resultCount} matches` `` — `search.vue:488`'s claim becomes true.
- **No combobox ARIA in the base** (R4): the dock already places it correctly consumer-side (`dock-search.vue:229-238`); `/data/search` gains `@keydown` + `aria-selected` on its cards.
- Matcher: length term becomes a divisor — `score / (1 + 0.1 × (tLen − pLen))` — de-ranks, never nulls (D2); camel branch + JSDoc `:33` deleted; prefix-narrow block `:204-220` deleted; `matchIndices` deduped + sorted; `types.ts:18` documents the empty-on-non-label-win case (D14).

### 4.5 Public surface & on-disk
```
src/composables/search/{index.ts, match.ts, useFuzzySearch.ts, types.ts}   # match.ts ← fuzzySearchIndex.ts (name-stripping, DAG:275)
src/components/search/{SearchBar.vue, styles.css, index.ts}                # variants.ts DELETED with the axis
tests/composables/search/{match.test.ts, useFuzzySearch.test.ts}           # isomorphic, never colocated; leaves the phantom tests/components/custom/ hop
tests/components/search/search.contract.test.ts · tests-visual/search.spec.ts
```
Props: `modelValue?` · `placeholder?` · `size?: "sm"|"md"|"lg"` · `plate?: boolean = true` · `status?: string`. Emits `update:modelValue`. Expose **`focus()`** only. **Deleted, no aliases**: `variant`/`SearchVariant`/`SearchVariants`/`searchFieldVariants`, `surface`, `tag` (first serves as the D1 proof, then dies as a prop — C13), `icon`, the default slot, `defineExpose(inputRef)`, `controlSizeClass` re-export (F11), `isExpanded`/`toggleExpanded`, the duplicate `composables/index.ts` barrel. `./search` keeps `SearchBar`, `useFuzzySearch`, `buildIndex`, `searchIndex`, `fuzzyMatch`, `clearSearchCache` + types. Dock's deep import becomes the composable edge (DAG:173); dock CSS re-points to `[data-search-bar]`/`[data-search-field]` (DAG:197 SEVER-VIA — search authors the hooks, dock consumes, one cut); `dock-search.vue:201` mounts `<SearchBar>`.
**Deleted from the tree**: `utilities/components.css:6-69` (recipe → `components/search/styles.css` as `.search-bar*`) · `sizing.css:124-141` (4 `--search-*` tokens + comment; note `--search-icon-size` has exactly 1 reader — the SFC — and dies with the 1em law) · `offsets.css:43` · `--input-bar-font` · the `.input-bar`/`.input-bar-field` names.

## 5 · §STRIKE / §ADD

**STRIKE**: `floating` (byte-identical twin, 0 mounts, gate-pinned) · `surface` (3 values, 1 effect, false comment) · `bare`-as-partial-reset · `tag`/`icon`/slot/`inputRef` expose · camel branch, prefix cache, expand state + Escape branch · 4 `--search-*` tokens, `--input-bar-font`, `--max-width-input` · the `box-shadow` focus mechanism + the tan flip (the third mark) · UA clear + UA Escape wipe · duplicate barrel + F11 shim · `search-custom.spec.ts` · the recipe's squat in a global partial · the `--dock-search-field-gap` orphan (0 declarations, 6px fallback off-series — receipt to W-DOCK).

**ADD**: whole-plate hit target (D1) · keyboard-reachable clear control (D12) · polite result-count live region (D16 — makes the demo's claim true) · `/data/search` `@keydown` + `aria-selected` consumer-side so the flagship route can reach a result (D10; the dock already consumes highlighting) · spring motion on focus/hover/clear/commit + the glyph rest carrier (D9) · the A1-conformant focus indicator (D11 — the shipped one fails 3:1 per PROPORTION:204) · three real size rungs, type and glyph riding (D7/D19) · mobile transposition (D19) · `focus()` (dock's live need).

## 6 · §GATES — born-RED, each with its mutation (abrogation mandate: no new gate files beyond the owned Playwright spec)

| gate | assertion | RED at HEAD | mutation that bites |
|---|---|---|---|
| **G1 · TARGET** (Playwright — `vitest.config.ts` is happy-dom, cannot see layout) | `elementFromPoint` at four 2px-inset plate corners + glyph centre → the input or its owning `<label>`; field block extent = plate content box; on `/data/search` ArrowDown+Enter changes `[aria-selected=true]` | 51.1% dead; glyph→SVG; 24.61 vs 44; Enter→nothing | revert root to `<div>`, or unbind `@keydown` |
| **G2 · MATCH** (pure node) | ∀ pattern ⊑ text: `fuzzyMatch` non-null AND `searchIndex` returns the row; `matchIndices` strictly ascending, deduped | null at 11/72/133/255; `[0,0]`; unsorted | restore the subtractive length term |
| **G3 · MOUNT** (unit + Playwright) | every union member of every prop — enumerated from the type — mounted in `demo/`; 3 mounts → **3 distinct heights (36/40/44) AND 3 distinct font sizes**; `plate:false` → root **without** `search-bar-plate` (class-list absence, never a computed reset) | `floating`/`bare` 0 mounts; 36≡36; 16.4≡16.4; bare frosts | re-add an unmounted member, or restore the sm default |
| **G4 · PERIMETER+FOCUS** (Playwright, dpr≥4 screenshot-sampled) | rest edge ≥3:1 vs own fill, light AND dark; focus = **outline** (not box-shadow) 2px@0.48 + one 8px@0.15 leg, ≥3:1, no `border-color` flip | 1.0003:1; box-shadow ring @0.30 composites <3:1 + tan flip | drop perimeter to 0.05, or move the ring back to box-shadow |
| **G5 · SPRING** (Playwright) | focus trace overshoot >0 and ≤10%; no `--ease-standard`/`--duration-*` in the component's emitted CSS | monotone, overshoot 0 | restore the bezier |
| folds | orphan-token rows → `token-hygiene.test.ts`; export shape → `public-surface.spec.ts:247` (widen the name set) | | |
| amendments, same cut | `radius-role-canon.test.ts:226-236` rewritten (it pins `floating:""` — D5's enforcement arm; the deletions cannot land past it) · `w1-radius-redress.spec.ts:225-280` rebuilt on real mounts asserting `plate` vs plateless on `backdropFilter` | | |
| **STRUCK** | `tests-visual/search-custom.spec.ts` — DELETED, not fixed: `search-query` = 0 demo hits (verified), it has never run its real branch · B2's dual-declaration gate — the S0 trap is build-level, ROUTES (R13) | | |

## 7 · §PAINT — π/DELTA obligations
Routes `/data/search` + `/forms/inputs`, light AND dark, Chromium 149 and **real `safari-app`** via `scripts/safari-probe.mjs` (`pkill -f safaridriver` first; if unreachable, write "Safari NOT run" — never Playwright-WebKit under a Safari label).

| claim | selector | property | viewport | RED (banked) → GREEN |
|---|---|---|---|---|
| **F17 closed** | `.search-bar` | edge-scan contrast, dpr4 | 1440×900 | **1.0003:1 → ≥3:1**, measured ratio, both modes, both engines |
| plate = target | `.search-bar` | elementFromPoint matrix + block extents | 1440×900 + 390×844 coarse | dead 51.1%, coarse 31.5px → dead 0%, coarse ≥44 |
| 3 rungs live | 3 mounts | height + font-size | 1440×900 | 36/36/44 · 14.384/16.4/16.4 → 36/40/44 · 3 distinct |
| plateless is bare | `plate:false` mount over aurora | class list, then computed | 1440×900 | `blur(11px)…` + 384px residue → none by class absence; both engines — frost survival is the finding |
| focus is A1 | `.search-bar:focus-within` | outline + shadow legs + border-color | dpr4 macro | box-shadow 2legs + tan → outline 2px@0.48 + 8px@0.15, no flip, ≥3:1; both engines |
| motion lives | `.search-bar` | 1.2s rest pair + focus trace + hover ΔRGB | 1440×900 | byte-identical/0/Δ0 → glyph leg differs (≤0.10α), overshoot ∈(0,10%], hover +0.05 |
| no UA ✕ + our clear | `.search-bar-field` typed | `::-webkit-search-cancel-button` absent; Tab reaches `.search-bar-clear`; `[aria-live]` announces | 1440×900 | UA ✕, Tab skips, no region → **`safari-app` mandatory** — exactly where engines diverge |
| mobile transposes | `.search-bar` | pad/gap | 390×844 | 12/8 ≡ desktop → 8/4 |
| `surface` gone | — | diff receipt only | — | the 3-value byte-identity table banked as RED; the prop no longer exists |
| veil receipt (routed) | `[data-surface="veil"]` | border-radius at 1288×84, both modes | 1440×900 | banked as **W-SURFACE's** RED baseline |

## 8 · §REJECTED — falsifiers of record (union + adjudication kills)
| # | killed idea | falsifier |
|---|---|---|
| R1 | Merge into `.field-control` (B1/B2) | target computes `backdrop-filter: none` on all 14 live instances — the fold de-glasses the owner's one frosted field; its 16px pad is itself off-series; 1.5px declared paints 1px (C7). Register verdict ROUTES. |
| R2 | Delete the combobox half of `useFuzzySearch` (B1 rider) | `dock-search.vue:131-238` consumes `matchIndices`/`onKeydown`/`selectedIndex`/`aria-selected` today — verified this seat. The premise grep was false. |
| R3 | Keep `type="search"` + `::-webkit-search-cancel-button{appearance:none}` (B3) | patches one of two UA behaviours; the UA Escape wipe survives. `type="text"` kills both, zero rules. |
| R4 | Combobox ARIA on the base (B1) | no listbox in the base; `aria-expanded`/`aria-controls` without one is a false contract. |
| R5 | Real `md` class (B1/B2) | a class whose content is the default is not a class; recipe default → `--control-h-md`, `.input-pill` precedent. |
| R6 | pad 8/12/**20** (B2) | 20 is the presented-plate rung; a control interior taking it crosses roles. |
| R7 | "Matcher is correct" (B1/B2) | thresholds re-derived **three times** now, incl. by this adjudicator; 463 blind test lines are evidence the gate never probed the boundary. |
| R8 | `seated/plate` two-member enum (B1) | one axis, two states → `plate?: boolean`. |
| R9 | Fix `bare` with a reset class | PREFIX TRAP: a `backdrop-filter` reset is forbidden; measured residue proves partial resets leak. Class absence only. |
| R10 | "F17 is closed" (B3) | 9999px is true AND invisible at 1.0003:1; the credited mechanism has zero mounts ever. Closed only when the ≥3:1 π row lands. |
| R11 | `--search-button-size` regains a reader (B3) | glyph and clear size at `1em` of field type — one law, zero tokens. |
| R12 | Comment cull as a *target* | family stock 15.6% — not the lever; but see §9: the delta's majority IS comment and is declared. |
| R13 | B2's dual-declaration gate | search's emission is measured-harmless; the S0 trap is build-level and ROUTES. |
| **R14** | `role="search"` on the component root (**Fable arm**) | a landmark minted per instance is a false contract at n>1 mounts; the consumer's `<form role="search">` owns it. |
| **R15** | New `clear()` composable API (**Opus arm**) | `query` is already a public ref on `FuzzySearchState`; a method wrapping one assignment for one prospective caller is surface without meaning. Dock's wipe-on-close choice is a W-DOCK call-site line. |
| **R16** | Focus = one 2px mark at ink/0.24 (**Fable arm**) | PROPORTION:92's 0.24 is the *selection-indicator* rung; :98 pins the focus ring at **0.48 gap-independent**; :204's A1 cure retains the 8px@0.15 leg and mandates `outline`. 0.24 would re-ship a sub-3:1 indicator — the A1 defect class. |
| **R17** | Focus/hover on `press (0.40, ζ0.71)` + lg type = md type (**Opus arm**) | disk: `press` = **0.2/ζ0.8** (0.40/0.71 is `panel`); and lg=md type contradicts Opus's own G-RUNG "three distinct font sizes". |
| **R18** | Plate-rim rest specular (**Opus arm**) | a shimmering field around prose is noise (B1 ruling) and contaminates the F17 perimeter π row; the glyph is the sole carrier. |

## 9 · §LOC + §ROUTED

**566 → ≈480 nonblank (−86, −15%)**, measured this seat: TS/SFC 486 (76+32+11+202+129+31+5; = DAG's 410 code/76 comment) + recipe 62 (`components.css:6-69`) + tokens 18. After: composables ≈323 (match 202−25, state 129−12, types 31, index 5) + components ≈157 (SearchBar ≈95, styles.css ≈58, index 4). **Code 443 → ≈416 (net −27**: −74 dead code [variants 32 · prefix cache 17 · expand state 12 · camel 8 · barrel 5] + 47 owed [clear+label+status 18 · motion 14 · mobile 6 · dedupe/sort 4 · md rung 3 · focus() 2]); **comments 123 → ≈64 (−59)**. **The line-count majority of this cut is comment and this spec says so**; the substance is two CRIT repairs, three inert axes deleted, and the owed affordance. Per DAG:378, ≈431 composable lines **cross a zone boundary — a relocation, never banked as a cut**.

**§ROUTED**: the 0px 1288×84 veil plate (receipt attached, both modes) → **W-SURFACE** · `.field-control` register verdict (`none` frost, 16px pad, 1.5px→1px) + `--control-text-sm` off-ratio (1.1402 vs 1.127838) + the `--control-floor` decoration-inflation mechanism → **control-cohort wave** · dock-side hook consumption, `dock/styles/search.css` rewrite beyond the selector re-point, `--dock-search-field-gap` orphan, `close()` call-site wipe decision → **W-DOCK** (search authors `[data-search-bar]`/`[data-search-field]`, one sequenced cut) · S0 PREFIX-TRAP build gate → **build/glass wave** · `tests/components/custom/` phantom hop (16 dirs) → **test-tree wave** · the two-stacked-fields route defect → already booked (COMPONENT-WAVES-TERMINAL O-17/D-19), not re-litigated.


---

# TAGS-INPUT

**DISPOSITION:** KEEP-THIN · grant `./tags-input` subpath · O-5 (CWT:1288 demote) STRUCK — both arms unanimous, adjudicator concurs on independently re-verified evidence; DAG-RULINGS:124 keeps its verb, loses its ground ("correct-as-is" refuted by ~30 sustained measurements). The cut is subtraction (−67 LOC) plus one motion register.

**LOC:** 308 → ~241 (−67, −21.8%; Opus arithmetic adopted, verified per-file this session: 65+52+27+29+18+8+14+95=308). TagsInput.vue 65→78 (+13 announce/at-limit/@invalid/as-child) · Input.vue 52→35 (−17 IME) · Item.vue 27→36 (+9 remove handler) · ItemDelete 29→0 · ItemText 18→0 · context.ts 8 · index.ts 14→6 · styles.css 95→78 (−49 struck, +32 motion/armed/mobile/ceilings). Comment stock 1/308 = 0.32% — the reduction is 100% code, NOT a comment cull. Demo 112→~180 (5 owed cels, additive by design). Files 8→6, SFCs 5→3. Fable's ~258 estimate REJECTED: no per-file arithmetic, superseded by the verified sum.

**COLLISIONS:** \n- package.json exports map — subpath-parity cut shared with 9 other subpath-less components (DAG-RULINGS:289)\n- src/components/chip/Chip.vue + chipVariants.ts:8 + src/styles/glass/glass-chip.css — W-CHIP owns; hard sequencing dependency for the ItemDelete fold\n- src/components/_shared/field/field-control.css:12,15,16,68 — field register wave (B-15/MID-D2)\n- src/styles/glass/material.css:66 — W-FROST owns --glass-cell-backdrop-filter: none\n- src/styles/typography/semantic.css:226 — typography wave owns the text-caption italic\n- src/styles/theme/radius.css:61 — W-RADIUS-ROLE owns --radius-field→--radius-card dissolution; @theme static must survive it\n- src/styles/tokens/sizing.css:80-84 --control-text × --ui-scale — field/type register\n- src/composables/motion/spring/springPresets.ts — W-MOTION owns orb-drop→transient rename and any dock retune\n- tests/components/ui/reka-binding-idiom.test.ts:95,119 — gate-collapse wave owns the tautologies\n- vite.style-fold.ts copyStyleAssets / dist orphan — CT-7\n- DESIGN.md:930 — docs\n- --color-accent-opaque writers — token owner

# W-TAGS-FIELD — tags-input TERMINAL SPEC (TRI-FOLD ADJUDICATED)

ADJUDICATOR · modelId `claude-fable-5` · HEAD `0371836d`. Arms: FABLE (foreman `claude-fable-5`) + OPUS (foreman `claude-opus-5[1m]`). Both arms ruled the same disposition — no headline conflict. The Opus arm is the superior skeleton (per-file LOC arithmetic, 20-row granular defect ledger, the correct inject chain, the G-T14 regression gate, richer §REJECTED falsifiers); it is adopted as base with five conflicts ruled below, one latent defect in its own handler cured, and the Fable arm's unique contributions folded. Adjudicator re-verified on disk this session: LOC 308 per-file · `springPresets.ts` dock (0.35, ζ0.82) + `orb-drop` (0.22, ζ1.0), **no `transient` row** · reka `TagsInputRoot.js:113-118` crash mechanism · `TagsInputItemDelete.js` labelledby-after-props merge · item context provided at `TagsInputItem.js:38` (our child's setup) · root context ships `onRemoveValue` + `modelValue` (`TagsInputRoot.js:120-147`) · `@theme static` at `radius.css:61` with the tree-shake comment · exports = 72, no `./tags-input`, `./chip` present · `styles.css:19,24,48` bare `box-shadow:` · coarse clone 9 declarations vs `glass-chip.css:103-121` (glass-chip has one extra `background: transparent`) · Chip `mode="removable"` native `:disabled` + `@remove` + own `aria-label` · DAG-RULINGS:124/:289, CWT:1262/:1288, DIRECTORY-SHAPE:270 all cite-checked · comment stock 1 line (`TagsInput.vue`).

## §0 · CONFLICTS RULED (the tri-fold record)

| # | conflict | ruling | evidence |
|---|---|---|---|
| R1 | Remove-handler mechanism — Fable: `@remove → injectTagsInputItemContext().onRemoveValue`; Opus: `injectTagsInputRootContext()` + `props.value` | **OPUS, with one correction.** Item context is provided at reka `TagsInputItem.js:38` — inside our `Item.vue`'s **child** in the render scope; the inject in our setup throws. Root context (ancestor-provided, `TagsInputRoot.js:120`) resolves — `TagsInputInput.vue:19` proves the chain. **Correction to Opus:** its `indexOf(props.value)` is reference-equality; reka's own delete uses `findIndex` with structural `isEqual` (`TagsInputItemDelete.js`, read this session) — object models rendered from a non-model array break `indexOf` silently. The handler mirrors reka: `findIndex` with structural equality. Same 4 lines, upstream semantics preserved | reka source, both files |
| R2 | Container height on birth — Fable interpolates `block-size` on the shared clock; Opus: FLIP only | **OPUS.** `block-size: auto` does not interpolate without `interpolate-size: allow-keywords`, unverified in Safari 26.4 at HEAD — a one-engine primary is a masking fallback. Fable's own REFLOW row says "never an animated height" two cells earlier — internal contradiction. The 7.39px empty→first growth is carried by the newborn's scale + sibling FLIP on the same frame | canon REFLOW row; masking-fallback edict |
| R3 | Rest-boundary gate — Fable G1: contrast(tag-fill, field-fill) ≥ 3.0; Opus G-T1: 1px edge + composited(border, field) ≥ 1.15 | **OPUS.** PROPORTION §1.3's 3:1 binds a **sole** carrier; the ruled design is a co-carrier (edge α0.16 at rest per the gap law: tag↔tag gap 8 ≤ 12 → edge). Fable's G1 contradicts Fable's own §3 text ("fill 0.12 + perimeter co-carries") and would force a dark capsule on an L≈93 cream field | PROPORTION §1.2/§1.3 |
| R4 | `prefers-contrast: more` arm — Fable requires it; Opus rejects | **OPUS.** After the edge/perimeter cure, rest and armed both carry ≥ the ruled mass by construction; a second code path buys nothing. KISS — a knob needing a paragraph is not a knob | arithmetic of §3.2 |
| R5 | Birth-spring carrier — Fable: local register per presets-in-consumers; Opus: consume the global pair, name follows W-MOTION | **OPUS.** The presets-in-consumers precedent (`springPresets.ts:145+`, read this session) governs rows that would be **minted**; `orb-drop` (0.22, ζ1.0) already exists as a global row. Consuming an existing token is not a fork; a local re-declaration of an existing pair is the duplication disease itself | disk |
| R6 | Root-file rename — Fable: `{Root,Input,Item}.vue`; Opus: `TagsInput.vue` stays | **OPUS.** `DIRECTORY-SHAPE.md:270` renames exactly `TagsInput{Input,Item,ItemDelete,ItemText}.vue` → `{Input,Item,ItemDelete,ItemText}.vue`; the root file is not in the set (pattern uniform across carousel/metric/number-field rows). `Root.vue` is a mint against a settled row | DIRECTORY-SHAPE:270, read this session |
| R7 | LOC — Fable ~258 (−50); Opus 241 (−67) with arithmetic | **OPUS** — the only arm that shows per-file work, and its per-file baseline matches my `wc -l` exactly | §LOC |
| R8 | T5 (Safari focus border) | **Both arms agree REFUTED** (J1's focus-verified real-Safari readback `rgb(186,183,171)` opaque, identical to Chromium; B2 read resting ink pre-focus). Carried only as paint cell P7 | juror record, sustained |

## 1 · §DISPOSITION

**KEEP-THIN · grant `./tags-input` · O-5 STRUCK.** `DAG-RULINGS.md:124` (row 31: "KEEP-THIN · correct-as-is · stays on the field register") has the verb right and the ground wrong — "correct-as-is" dies against the ledger below. `COMPONENT-WAVES-TERMINAL.md:1288`'s demote is struck on three independent grounds: (1) self-refutation at CWT:1262 — *"giving them subpaths is a fix, not a deletion"*, granted to nine subpath-less components (accordion alert avatar checkbox input radio-group skeleton table textarea) and withheld from the tenth; the rule is stateable at `DAG-RULINGS.md:289` ("one subpath per public component, no exceptions in either direction"); (2) demoting silently falsifies `REDUCTION.md:29` — chip's `mode="static"` src proof is `TagsInputItem.vue:23`, and the chip→badge fold reopens unowned; (3) tags-input is the library's only multi-value commit affordance (no combobox, no multi-select in `src/components`) and the only surface where user-authored objects are born and destroyed in place — deletion is granted on vacuity or superfluity and this is neither. **The superfluity is inside it**: a forked remove register (~68 lines) and a duplicated IME guard (17). GREENFIELD (Fable's B1) refused: root/input/item/text/delete over reka is correct, the keyboard model works (three-press Backspace verified), every defect is a value, a fork, a missing rung or a cascade order. Honest headline: **~60% of what is wrong here is chip's and ~30% is the field register's** — this file gets thin by strike, not by neglect.

## 2 · §DEFECTS (Opus ledger adopted; Fable's merged ids in parentheses; severities C/H/M/L)

| id | defect | evidence | sev |
|---|---|---|---|
| X1 (F-X1) | **Nothing ever moves.** Subtree transition census: 5 colour-only transitions, zero transform/scale/animation; add/remove = 1 distinct opacity + 1 distinct scale over 83 rAF frames / 675.8ms; hover Δ 0 of 625 px. BREATH OF LIFE + LIQUID WEIGHT both fail on the component's only gesture | 3 seats concur | **C** |
| X2 | **Tag has no boundary against its own field.** Composited fill 1.055:1 light / 1.599:1 dark, `border-top-width: 0px`, no co-carrier. Field's own border 1.109/1.144, fill 1.004:1 vs plate. **This is the real F12: the owner photographed an edge nobody can see; rounding was the symptom** | pixel-sampled ×3 seats | **C** |
| X3 (F-X6) | **`TagsInputItem` `disabled` prop corrupts the model then throws** — `TagsInputRoot.js:113-118` (adjudicator-verified): `getItems().filter(dataset.disabled !== "")` then `collection[index]` with the full-model index after mutating `modelValue`. Model 4→3 + TypeError, reproduced twice. 0 consumers, 0 paint. Root-level `disabled` reaches the same branch | reka source + live repro | **C** |
| X4 | **Focus/invalid destroy the material.** Rest 4 inset rim legs → focus 2→0 → invalid 1→0; `styles.css:19,24,48` write bare `box-shadow:` over `field-control.css:15`'s rim list (adjudicator-verified all three lines) | 2 seats + real Safari 26.4 (4→2) | **H** |
| X5 | **Delete AX name is "Vue" not "Remove Vue".** `TagsInputItemDelete.js` mergeProps puts `aria-labelledby: itemContext.textId` after props (adjudicator-verified); our `removeLabel` computed wholly dead | CDP AX tree | **H** |
| X6 | **`.tags-input__delete:disabled` can never match** — reka renders `data-disabled` only, native attr never set; disabled field advertises N `cursor:pointer` deletes that no-op. `tags-input.contract.test.ts:156` certifies the wrong attribute green | live probe + reka source | **H** |
| X7 (F-X9) | **Remove register forked, worse half used.** `Chip.vue` `mode="removable"` ships native `:disabled` + `removeLabel` + `@remove` (adjudicator-verified :112-131); tags-input passes redundant `mode="static"` and re-implements the control: 29 SFC + 19 CSS + coarse block **9 declarations byte-identical** to `glass-chip.css:103-121` (adjudicator-diffed; glass-chip adds one `background: transparent`) | diff | **H** |
| X8 | **`--ui-scale` wired exactly backwards.** `styles.css:9` padding shorthand beats `field-control.css:16` `padding-inline` by `<style src>` order; type rides the scale instead. 1→1.25: padding frozen, font 16.4→20.5; label:value 0.877→**0.580** coarse vs invariant 0.887 | 2 seats | **H** |
| X9 | **Every tag in synthesized fake italic** — `chipVariants.ts:8 sm→text-caption` (adjudicator-verified) → `semantic.css:226 font-style: italic`; no italic face in `document.fonts`, engine shears. A caption is authorial commentary; a tag is user data | both engines | **H** |
| X10 | **Three invalid grammars, two paints ~9× apart** — reka path Δ11.1% px (border only, `aria-invalid: null`), prop path Δ99.2% (border+ring+bg). Neither sets the other's attributes | dual-path repro ×2 | **H** |
| X11 | **Nothing announces.** The route's one live region is empty; rejection `<p>` has `role: null`; `max` is a declared prop with zero paint of any kind | probe | **H** |
| X12 | **No delete keyboard-reachable** — reka hard-binds `tabindex="-1"`; 16-stop Tab walk reaches 0 deletes; `.focus-ring` computes `outline: … none 3px` | probe | **M** |
| X13 | **Off-series:** container pad 8/12 (block ≠ inline; `pad(card 16)=12`, C2); chip pad-inline 10 ∉ series; tag 14.384 / draft 16.4, neither on the φ^(1/4) ladder (rungs −2=14.63, −1=16.50) | measured ×3 | **M** |
| X14 | **No mobile transposition** — 393×852 dpr3 byte-identical to 1440; PROPORTION §1.1 demands every rung down one | probe | **M** |
| X15 | **IME guard 100% redundant** — reka's input imports `useComposing`, early-returns in all 3 handlers on the identical `nextTick`; ours additionally `stopImmediatePropagation`s consumer `@input` | reka source | **M** |
| X16 | **✕ is 100% glyph** — button 24×24, svg 24×24 = 0.75× chip height; coarse box grows to 44, glyph stays 24 | probe | **M** |
| X17 | **No ceiling either axis** — 64-char tag 477.3px in a 321px field, `text-overflow: clip`, no `title`; n tags = n rows forever (3 rows at 393px) | probes ×3 | **M** |
| X18 | **Dead declarations** — `inline-flex` blockified, `outline: none` on a never-focusable node, `min-width: 0` Δ0.0px, `data-tags-input-item` 0 readers, 3× `--touch-target` fallbacks unreachable, `--control-h-md` read where `--field-control-height` is published, `min-height` binds-never-governs | toggled live | **L** |
| X19 | **No export subpath** — 72 subpaths (adjudicator-verified), `./chip` present, `./tags-input` absent; 3-hop root barrel only | disk | **M** |
| X20 | **Demo proves 3 states, owes 5** — no disabled, no max, no wrap, no long-content, no focus-within cel. Sol W1 OWED, still owed at HEAD | file read | **M** |

**Sustained as fine (not defects):** coarse 44px arm geometry (correct on 3 seats; the defect was duplication) · Backspace 3-press model · `context.ts` (8 lines — the only app-invalid→`aria-invalid` path, stays) · label vs chip fill 7.164/4.748:1 · `convertValue`/`displayValue` · **the prefix trap does not bite here** — `field-control.css:14` authors unprefixed alone, alias emitted first in dist, refuted 3-0.

**F12 (the owner's ask):** rounding CLOSED cross-engine — `@theme static` at `radius.css:61` holds at HEAD (adjudicator-verified, comment documents the tree-shake), 3 containers 16px in Chromium light/dark + real Safari 26.4. The design finding it stood in for is **X2**, which inherits the owner's row. **G-T14 keeps the cure gated — a cure with no gate is how it shipped the first time.**

## 3 · §THE DESIGN

### 3.1 DOM after the cut (3 SFCs)
```
TagsInputRoot as-child                                → .tags-input .field-control glass-defined
└ TransitionGroup name="tag" tag="div"                → one element: root behaviour + motion register
  ├ Item.vue ×n  (reka TagsInputItem, consumer-keyed) → data-state=active|inactive
  │ └ Chip mode="removable" size="sm" :remove-label :disabled @remove
  │   ├ span.glass-chip__content › reka TagsInputItemText   ← mints textId; item accname resolves
  │   └ button.glass-chip__remove.focus-ring[aria-label="Remove X"] › ×
  ├ Input.vue  (reka TagsInputInput, thin — no local IME guard)
  └ p.sr-only[role=status][aria-live=polite]          ← NEW, library-owned, stable key
```
Remove handler (R1, corrected): `const root = injectTagsInputRootContext()`; on `@remove` — guard `root.disabled.value`, then `root.onRemoveValue(root.modelValue.value.findIndex(v => structurally-equals(v, props.value)))` mirroring reka's own `isEqual` semantics (`indexOf` reference-equality REJECTED — silent no-op on object models rendered from a non-model array). Closes X3's reachable branch, and the fold closes X5/X6/X12/X16 for free (Chip's remove is a plain button: own `aria-label`, no `aria-labelledby`, native `:disabled`, real tab stop). Demo boilerplate `<TagsInputItemText/><TagsInputItemDelete/>` ×3 vanishes.

### 3.2 Tokens — canonical series only (both arms convergent; adjudicated column final)
| axis | HEAD | ruled | law |
|---|---|---|---|
| container radius | 16 | **16** ✓ | card; `--radius-field`→`--radius-card` is W-RADIUS-ROLE's; `@theme static` must survive (G-T14) |
| container pad | 8/12 | **`calc(0.75rem × --ui-scale)` both axes = 12** | C2, `pad(card)=r−4`; `--ui-scale` moves the box |
| gap | 8 | **8** ✓ | intra-plate member |
| ≤768px | frozen | pad **12→8**, gap **8→4** | §1.1 one rung down |
| tag radius | 9999 | **9999** ✓ | pill |
| tag pad | 4/10 | **4/8** — chip-owned, routed | series (10 out) |
| tag rest boundary | 0px | **1px edge rung α0.16** — chip-owned | gap law: tag↔tag 8 ≤ 12 → edge (R3) |
| tag armed | ring replaces material | **perimeter α0.48 + fill 0.12, shadow list untouched** | §1.2 perimeter = selection; §1.3 co-carried |
| tag type | 14.384 italic | **14.63 roman** rung −2 | §1.4 · X9 |
| draft type | 16.4 rides scale | **16.50** rung −1, clamp only | §1.4 type never rides `--ui-scale` |
| label:value | 0.877/0.580 | **0.887 invariant every viewport** | §1.4 |
| focus | shadow ring kills rim | **`outline: 2px α0.48; offset 2` + `0 0 8px α0.15`** | A1 · K5; retires the property collision in our own file |
| ✕ | 24 box/24 glyph | **20 fine / 44 coarse, glyph 16** — chip-owned | A6 |
| backdrop | `none` | **stays `none` until W-FROST** — this spec never says "frosted" | §5a; P10 KNOWN-RED |

### 3.3 Motion — the register the component has never had (springs verified on disk this session; the **pair is the contract, the token name follows W-MOTION** — no local fork, R5)
| rung | channel | pair (carrier at HEAD) | clock | rank |
|---|---|---|---|---|
| BIRTH | scale 0.78→1 + opacity 0→1, transform-only, `<TransitionGroup>` | (0.22, ζ1.00) — `--spring-orb-drop` | 0.20s | 0 |
| REFLOW | sibling FLIP `translate` (`move` class) — **never an animated height** (R2); leaving node `position: absolute` so siblings FLIP under it | (0.35, ζ0.82) — `--spring-dock` | 0.22s, delay 1 `--motion-beat` | +1 |
| DEATH | scale 1→0.86 + opacity→0, exit-led | same as birth | **0.14s = 0.7× entry** | 0 |
| HOVER (tag) | fill 0.05 + scale 1.02 — chip-owned, `@media (hover:hover)` | `--spring-press` (0.20, ζ0.80) | 0.12s | 0 |
| PRESS (✕) | scale 0.96 + press-drain — chip-owned | `--spring-press` | 0.12s | 0 |
| ARMED | fill 0.05→0.12 + perimeter 0.16→0.48, material preserved | `--spring-press` | 0.12s | 0 |
| REST | **no decorative idle loop** — deliberate: a field of committed user data that pulses at rest is noise, not breath; the engagement floor is the pointer answer + birth/death | — | — | — |
`prefers-reduced-motion: reduce` arm **mandatory and new** — `glass-chip.css:91-93` covers only the interactive arm. Gate-paired in G-T4(b). Canon checks G1-G5, G7 pass as specified in the Opus arm.

### 3.4 States, one grammar each
rest · focus-within (outline, shadows append never replace) · **invalid = ONE grammar**: root listens to reka's `@invalid`, folds into the `state` computed so the root always carries `aria-invalid="true"` + `data-state="invalid"` — one selector, one paint, both trigger paths (`isInvalidInput` is not injectable in the root SFC: the context is provided by its own child; **the emit is the seam**) · armed = fill+perimeter, material preserved · **at-limit** = `data-at-limit` on the root, draft placeholder becomes the count readout, ink-only — not the invalid arm; at-limit is not an error · disabled = Chip's native `:disabled`, actually inert, plus the R1 guard.

### 3.5 Public surface + layout
`exports["./tags-input"]` added. Files: `tags-input/{TagsInput.vue, Input.vue, Item.vue, context.ts, index.ts, styles.css}` — 8→6; renames per `DIRECTORY-SHAPE.md:270`, **root file keeps its name** (R6). Exports: `TagsInput`, `TagsInputInput`, `TagsInputItem` + their 3 `*Props` types; `ItemDelete`/`ItemText` + 2 prop types deleted, no alias. `TagsInputItem.disabled` deleted (X3). T9's "drop 6 dead type exports" REFUTED — three die with their files, the remaining three are the typed prop surface; zero-consumer on a subpath-less component is the same artefact that produced O-5.

## 4 · §STRIKE (110 lines, 0 comment)
| target | lines | ground |
|---|---|---|
| `TagsInputItemDelete.vue` + `.tags-input__delete` + `:disabled` arm + its coarse block | 29+28 | X7 superfluity; closes X5/X6/X12/X16. **Gated W-CHIP-first — if W-CHIP slips, keep the file and take X5/X12/X16 locally (both arms concur on the contingency)** |
| chip coarse `min-block-size` + `::after` clone | 11 | 9 declarations byte-identical to `glass-chip.css:103-121` |
| `TagsInputItemText.vue` + `min-width: 0` | 18 | Δ0.0px measured; the load-bearing atom is **reka's** textId mint, preserved by the fold — asserted in G-T5 |
| Input IME block | 17 | X15 — byte-equivalent to reka's `useComposing` + an `@input`-swallowing hazard |
| `Item.vue` `disabled` prop | 2 | X3 — vacuity + data loss; no reka patch (no masking fallback); per-item disable returns only upstream |
| ring-as-`box-shadow` at `styles.css:19,24,48` | 3 rules rewritten | X4 — outline focus retires the collision |
| lint: `.tags-input__item` rule, `data-tags-input-item`, `mode="static"`, `--touch-target` fallbacks, `--control-h-md` read | 5+ | X18, swept silently |

## 5 · §ADD (the other direction — Aristotelian both ways)
A **birth/death/reflow** (§3.3) — the one new mechanism, the reason to open the file (X1) · B **armed preserves material** (X4) · C **outline focus** (K5) · D **one invalid grammar** via `@invalid` emit (X10) · E **the component announces itself** — library-owned `role="status"`: added/removed/rejected/at-limit "N of N"; consumer cannot hook these (X11) · F **`max` gets a paint** — `data-at-limit` + count readout (X11) · G **two ceilings** — tag `max-inline-size` + ellipsis + `title`; root `max-block-size` @ 3 rows + shipped `FadingScroll` (a swap, not machinery) (X17) · H **five demo cels**: disabled, focus-within, wrap, long-content, max — three are preconditions for born-RED measurement (X20) · I **`./tags-input`** (X19).

## 6 · §GATES — born-RED against built `:4188`, each with its killing mutation (Opus table adopted; Fable's G1 struck per R3, its G4/G2/G3/G5 subsumed)
| id | invariant | HEAD | mutation that bites |
|---|---|---|---|
| G-T1 | `.tags-input__chip` `border-top-width == 1px` ∧ composited(border, field fill) ≥ 1.15, light AND dark | 0px | drop the edge rung |
| G-T2 | armed: composited(border, fill) ≥ 3.0 ∧ armed fill ≠ rest fill | ring-only, 2.143:1 | revert `[data-state=active]` |
| G-T3 | inset shadow leg count non-decreasing rest→focus→invalid→armed | 4→0→0 | any bare `box-shadow:` in a state rule |
| G-T4 | (a) during commit, distinct(scale∪opacity∪translate) > 1 on newborn AND ≥1 sibling; (b) under `prefers-reduced-motion: reduce` both == 1. **Paired deliberately — (b) alone passes on a dead tree** | (a) 1,1 | (a) delete TransitionGroup; (b) delete the reduce arm |
| G-T5 | CDP AX name on every remove matches `/^Remove\s/` ∧ item accname == tag text (textId survived the fold) | "Vue" | reinstate reka's delete or drop `removeLabel` |
| G-T6 | disabled root ⇒ every remove `disabled === true` ∧ cursor ≠ pointer | false/pointer | key CSS on `:disabled` while rendering `data-disabled` — also strikes test:156's green-over-wrong-paint |
| G-T7 | disabled root: every removal path (click, Backspace) ⇒ 0 console errors ∧ model unchanged | throws + mutates | remove the R1 guard |
| G-T8 | both invalid paths ⇒ root `aria-invalid="true"` ∧ `data-state="invalid"` ∧ byte-identical composited bg | Δ 11.1% vs 99.2% | drop the `@invalid` listener |
| G-T9 | `.tags-input__text` computes `font-style: normal` | italic | reinstate the `text-caption` italic (bites cross-wave on our route) |
| G-T10 | fs(tag)/fs(draft) == 0.887±0.02 at 1440 fine AND 393 coarse | 0.877/0.580 | let the draft ride `--ui-scale` |
| G-T11 | pad 12px both axes ≥769px, 8px ≤768px; gap 8→4 | 8/12 frozen | restore the shorthand |
| G-T12 | 64-char tag ≤ 0.6× field content box ∧ ellipsis; 8 tags @393: finite `max-block-size`, `overflow-y: auto`, mask ≠ none | 477.3px/clip/none | delete either ceiling |
| G-T13 | `./tags-input` resolves ∧ dist target exists | absent | remove the subpath |
| G-T14 | **(regression, not born-RED — stated as such)** built artefact resolves the radius alias non-zero ∧ `.tags-input` computes 16px ×3 | passes | `@theme static`→`@theme` at `radius.css:61` → 0px. **F12's own row: a cure with no gate is how it shipped the first time** |
Struck as tautologies (pass on a broken tree): the original `abs(9999−0)>100` gate · `reka-binding-idiom.test.ts` `get()`-throws-truthy seat + the no-assertion `data-state` seat (RF:200, :210 — gate-collapse wave's file, cited not restated) · any glass-class-presence assertion. The contract test's behavioural seats (delimiter/duplicate/FormData) stay.

## 7 · §PAINT — route `/data/tags-input`, built `:4188`; Chromium 149 + **safari-app** (`scripts/safari-probe.mjs`, `pkill -f safaridriver` first; **Playwright-WebKit is not Safari and may not be labelled as such**); never `getContext()` on any canvas
| # | cell | viewports | engines |
|---|---|---|---|
| P1 | radius 16px ×3 | all 3 | both |
| P2 | padding/gap | fine + coarse | both |
| P3 | chip edge composited vs field fill | light+dark | both |
| P4 | armed fill+border vs sibling | light+dark | both |
| P5 | font-size/style/ratio | fine + coarse | both |
| P6 | shadow leg+inset counts, 4 states | light+dark | both — T1 confirmed 4→2 in real Safari; the cure must be too |
| P7 | focus-within outline + screenshot delta | light+dark | **both, mandatory** — nobody has painted an outline on a 16px-radius box on either engine; formally closes refuted T5 |
| P8 | newborn rAF trace scale/opacity/translate + sibling; same under reduced-motion | fine | Chromium trace + safari-app screenshot-delta |
| P9 | remove box 44×44 coarse, glyph ≤20; AX name | coarse | Chromium CDP + safari-app geometry (Safari lacks the AX endpoint — note, not a gap) |
| P10 | `backdrop-filter` — **expected `none`, KNOWN-RED, fenced behind W-FROST**; second independent kill: `--input-on-glass` α=1 — fixing `material.css:66` alone paints nothing | light+dark | both |
| P11 | 64-char / 8-tag ceilings | fine + coarse | both |
OWED, blocking nothing but named: safari-app at coarse (no seat has run it) · max + disabled specimens (§ADD H unblocks G-T6/G-T7/G-T12) · dev arm `:5199` (all numbers are the ship surface).

## 8 · §REJECTED — falsifier attached, cannot be re-raised
| killed | falsifier |
|---|---|
| DEMOTE (O-5) | self-refuting vs CWT:1262; falsifies REDUCTION.md:29 by side effect; the affordance is unique in src/ |
| GREENFIELD (Fable B1) | composition + keyboard model measured correct; inflating the verb licenses re-litigating a right structure |
| Chip `#remove` slot (B1) | root context resolves in Item.vue's setup and Chip already emits `remove` — new public API on a shared component for one caller |
| **`injectTagsInputItemContext()` handler (FABLE ARM + J2 C4)** | item context provided at reka `TagsInputItem.js:38` — our **child's** setup; the inject throws. Adjudicator-verified. Root context + structural findIndex — R1 |
| **Opus's `indexOf(props.value)`** | reference equality; reka's own delete uses `isEqual` findIndex — object models from a non-model array silently no-op. Corrected, not adopted raw |
| **Animated container height (FABLE ARM, B3 ADD-8, J2 BUILD-1)** | `interpolate-size` unverified in Safari 26.4 — one-engine primary = masking fallback; canon REFLOW row explicit; Fable's own text contradicts itself — R2 |
| **Fable G1 (fill contrast ≥ 3.0)** | §1.3's 3:1 binds a sole carrier; the design is a co-carrier; contradicts Fable's own §3 — R3. A 3:1 fill on an L≈93 field is a dark capsule on cream |
| **`prefers-contrast: more` arm (FABLE ARM)** | co-carrier masses ≥ ruled by construction; a second code path buys nothing — R4 |
| **Local birth-spring register (FABLE ARM)** | `orb-drop` exists as a global row; re-declaring an existing pair is the duplication disease — R5 |
| **`Root.vue` rename (FABLE ARM)** | DIRECTORY-SHAPE:270 keeps the root filename; `Root.vue` is a mint against a settled row — R6 |
| Keep local delete and patch (B3) | cannot fix X5 without defeating reka's labelledby from outside; keeps 68 lines Chip ships |
| Clear-all component / persistent "3/5" numeral / "+N more" collapse (B1) | one-call-site overfit; ambient chrome; FadingScroll costs zero and a collapse hides user data behind a click |
| Render items from modelValue, kill consumer v-for | breaks the reka compound idiom library-wide; public-API greenfield inside a subtractive wave |
| Roving tabindex | Chip's native button is a real tab stop for free |
| Fork `--spring-dock` for FLIP | disk vs canon 0.6 frame apart at 60Hz |
| Darken tag fill to 3:1 (literal F-1) | sole-carrier misread — see R3 |
| Keep IME guard (B1) | reka `useComposing` byte-identical ×3 handlers; ours swallows consumer `@input` |
| Keep ItemText.vue (B3) | wrapper contributes Δ0.0px; reka mints textId — G-T5 asserts the survival |
| T5 Safari focus divergence (B2) | J1's focus-verified readback identical to Chromium; B2 read resting ink — R8 |
| "styles.css:18 dead" (T12 half) | the only rule firing in the reka path (J1 S-4) |
| F-8 coarse spacer "48.7% empty" as defect | A6-sanctioned target reservation; the real cost is cured by the ceiling |
| D18 min-height as defect | binds (40px), never governs — correct for an intrinsically taller field; one lint line |
| T14 rename as finding | ruled at DIRECTORY-SHAPE:270; rides this wave mechanically |
| Prefix-trap remediation here | alias emitted first ×2 dist files; refuted 3-0 |
| Stale spring literals (0.30, ζ0.88) / `--spring-transient` | on-disk dock (0.35, ζ0.82), no transient row — `springPresets.ts`, adjudicator-read this session |
| Fable's LOC ~258 / B1's 316 / B2's 2,476 B / F-11's span 96-131 / D19's "2 rows" | 308+arithmetic→241 · 308 · 1,851 B · 103-121 · 3 rows — all re-measured |

## 9 · §LOC
**308 → ~241 (−67, −21.8%).** Per-file: TagsInput 65→78 · Input 52→35 · Item 27→36 · ItemDelete 29→0 · ItemText 18→0 · context 8 · index 14→6 · styles 95→78. Σ=241 (±2 for the R1 findIndex line and guard). Comment stock 1/308 = 0.32% — **the reduction is 100% code, not a comment cull.** Demo 112→~180 (owed cels additive). Files 8→6.

## 10 · §ROUTED — named owner, do not touch here
| finding | owner |
|---|---|
| X9 italic (`semantic.css:226` + `chipVariants.ts:8` mapping) — G-T9 bites here | typography / W-CHIP |
| X2-rest edge, chip pad 8, ✕ A6 geometry, removable hover/press answer, `[data-disabled]`↔`:disabled` parity | **W-CHIP — hard sequencing: lands first or this wave keeps the local delete and takes X5/X12/X16 in place (68 lines it would rather delete)** |
| frost: `material.css:66` cell kill (custom property — inherits to the whole subtree) + α=1 `--input-on-glass` veil — **both must land or nothing paints**; P10 KNOWN-RED | W-FROST |
| `field-control.css:12` perimeter (α0.05, mass 6.4× short of ruled 0.48), `:15` rim mechanism, `:16` padding-inline order, `:68` invalid selector, A10 recess (field 1.004:1 vs plate) | field register (B-15, MID-D2) |
| `--control-text` × `--ui-scale` (`sizing.css:80-84`) — G-T10 bites here | field/type register |
| `--radius-field`→`--radius-card` + `@theme static` survival — G-T14 bites here | W-RADIUS-ROLE |
| `--color-accent-opaque` 0 writers / 3 readers (ours dies with the focus rule) | field register / token owner |
| dist orphan `tags-input/styles.css` 1,851 B, unreachable from all 4 published CSS entries | CT-7 (`copyStyleAssets`) |
| `DESIGN.md:930` false consumer claim | docs |
| `orb-drop`→`transient` rename + any dock retune — this wave consumes the **pair**, not the name | W-MOTION |
| O-5's row → subpath parity ×10 | W-DAG-REDUCE |
| `reka-binding-idiom.test.ts:95,119` tautologies | gate collapse |
| per-item `disabled` (reka index/collection mismatch, `TagsInputRoot.js:113-118`) | upstream — prop deleted, branch guarded, no reka patch |

**OWED at close:** safari-app coarse cells · `prefers-reduced-motion` arm (new, this wave, G-T4b) · the labelledby-defeat spike before the wave iff W-CHIP slips (as-child fallback) · max + disabled specimens · W-CHIP sequencing.


---

# FOURIER-FIELD

**DISPOSITION:** KEEP-THIN — WGPU-only, 8 corrections. Deletion DENIED: external consumer verified three times (slides feedback-coder Slide01.vue:10/Slide05.vue:23, re-read this seat — binds color/colorResolver/seed/freeze + a nonexistent `variant`) and the module is the tree's only forward DFT, so nothing exists for it to be redundant against. DAG row 4 verdict UPHELD, its ground "correct-as-is" OVERTURNED (dominant painted mark is hard-coded black at 15.06:1; headline slider 60–75% dead; parity sworn 4× and false; D11 real but fifth by consequence).

**LOC:** 2,950 incl. README (2,128 code / 757 comment by ^\s*(//|/*|*), re-measured — the DAG's 1,921 code understates by 207) → ≈2,245 (−24%). Arithmetic: −645 GL arm (glSetup 403 + glsl 242) −14 colorResolver ×5 sites −45 dead exports + FourierFieldProps + README prop table −30 speculative API −8 palette literal→resolver −35 greenfield-meta comments +35 a11y arm +14 fit maxTerms + gentle rescale +15 MAX_PHASORS storage-buffer widen +4 underglow decls +3 badge/misc = −706. ≈78% of removed lines are code; module comment stock is 26%, under the 39.4% src mean — NOT a comment cull, and this spec says so.

**COLLISIONS:** \n- src/composables/glass/webgpu/useGpuSubstrate.ts:51 — setupGL optionality is the DUAL-ENGINE BAND's file (blocking precondition for the −645 cut; Fable arm's webgl/ path was wrong, verified)\n- src/index.ts:233,238-239,245-247 + tests/public-surface.spec.ts:163-164,207 — root barrel + gate rows, shared across waves\n- src/composables/motion/pointer/pointerFieldMappings.ts:53,55,102-135 — shared pointer-mapping leaf; only the FOURIER_* arm is cut\n- package.json exports/typesVersions (./fourier-field, ./fourier-math survive) — shared map\n- demo/stories/substrates/fourier-field.vue:363 — W-TIMELINE owns the scrubber→Slider swap (COMPONENT-WAVES-TERMINAL.md:126); this wave adds celGain/squashGain knobs to the same file — coordinate\n- tests/components/custom/** phantom segment — tranche-level test-tree move owns the other 15 dirs\n- DAG-RULINGS.md:186 resolveBudgetDpr sever — booked shared graph cut; this wave only consumes BackingSize.dpr locally\n- src/components/constellation/Constellation.vue:100-102 — constellation row (role=button, no keydown)\n- src/components/labeled-field/LabeledSelect.vue:52-54 — W-LABELED-FIELD\n- src/components/handmark/** — W-HANDMARK; routed note only, no file touched\n- ~/Programming/slides feedback-coder deck — colorResolver removal + stale `variant` + 3.13.0 pin land as a marked addendum in the slides tranche\n- demo/chassis/landing/vizPreviewStill.ts:161-180 — demo chassis; this wave swaps the hand-drawn epicycle to positionsAt

# W-FOURIER — TERMINAL SPEC · TRI-FOLD ADJUDICATION
ADJUDICATOR modelId `claude-fable-5` · HEAD `0371836d` · arms: Fable foreman (`claude-fable-5`) + Opus foreman (`claude-opus-5[1m]`), each over benches B1/B2/B3 + jurors J1/J2. Both arms rule KEEP-THIN/WGPU-only — no disposition conflict. Five substantive forks ruled below (§8) on evidence this seat pulled fresh: `constants.ts`, `fourier-paths.ts`, `math.ts:113-145`, `FourierField.vue:100-140`, `useGpuSubstrate.ts:51`, `springPresets.ts` roster doctrine, `DAG-RULINGS.md:97`, and the slides consumer re-read a third time. **New fact neither arm found: the N axis lies in a FOURTH place** — `constants.ts:22-23` claims the curated ℱ/heart/star set "all sit under" `MAX_PHASORS 64`, but heart/star are 256-point (`fourier-paths.ts:143-144`) through an untruncated `dftFromPoints` (N-term return, `math.ts:113-145`). This falsifies the keep-64 position from the file's own mouth and settles fork T1.

## 1 · DISPOSITION
**KEEP-THIN, WGPU-only, 8 corrections (R1–R8) + housekeeping. Deletion DENIED. The GL arm dies, gated on the band's seam with a specified fallback. DAG row 4 (`DAG-RULINGS.md:97`) verdict upheld, ground overturned.**

Not vacuous: `slides/src/decks/feedback-coder/slides/Slide01.vue:10` + `Slide05.vue:23` import `@mkbabb/glass-ui/fourier-field` and mount it full-bleed, binding `color="var(--viz-fourier)"`, `:color-resolver`, `seed`, `freeze` — the exact ambient register B1 called forbidden (its "library ban" is demo-chassis prose at `aurora-hero.ts:215-227`, not law). Not superfluous: nothing else in the tree computes a forward DFT. Per the consumer-updates ruling the consumer preserves no API — but a live mount is dispositive against vacuity, the edict actually in play. And "correct-as-is" is unsurvivable: the dominant painted pixel is hard-coded black at 15.06:1 in light (darker than body ink, 14.34:1) and a ~2:1 smudge in dark; the headline slider has 60–75% dead travel under a lying badge; "pixel-identical parity" is asserted 4× and false by 384-vs-256 samples; a prop the live consumer passes is never read; D11 is real and fifth. Every defect is local — the argument for fixing paint, not deleting the painter.

## 2 · §DEFECTS (Opus arm's ranked table adopted as the sharper set; Fable D-1..D-15 map 1:1; severity order = J2's)
| id | defect | evidence of record | sev |
|---|---|---|---|
| FF-1 | Cel "ink": `vec4(0,0,0,m)` — no palette, no dark arm, **no age term** (trail fades on `pow(age,fadeExp)`, cel doesn't), full `halfW` width vs the trail's taper, ONE head-tangent frame applied to all 383 instances, per-capsule constant-α over-composite | `render.wgsl.ts:129-131,190-191,293-300` vs `:252,259`; measured 15.06:1 light (ground rgb(240,231,222), ink rgb(21,20,19), C 0.0026), 48% of strong marks neutral-dark; ~1.96:1 dark; tail ink 5.0px α0.322 under a 2.0px α0.313 ribbon | CRIT |
| FF-2 | N axis lies **four** ways: `MAX_PHASORS=64` vs uncapped demo `maxHarmonics = spectrum.length` (`fourier-field.vue:215`) → 60–75% dead travel; badge `N 160/160` while GPU sums 64 (`:350`); `computeFourierFit(spectrum)` has no term param + `ensureFit()` keyed on spectrum identity (`uniformBridgeWGPU.ts:102`, `useFourierField.ts:217-224`) → N=1 mark is 0.41% of stage; **and `constants.ts:22-23` falsely swears the curated set sits under the ceiling** (heart/star = 256 terms, verified this seat) | as cited + `fourier-paths.ts:143-144`, `math.ts:113-145` | CRIT |
| FF-3 | "Pixel-identical parity" asserted 4× (`glSetup.ts:9-10`, `ribbon.ts:8-10`, `render.wgsl.ts:13`, `README.md:48`) and false: 384 vs 256 samples (`constants.ts:31` vs `glSetup.ts:45`), 383 vs 255 instances (1.5×) → different ink density, over-composite depth, squash gain. A fallback silently painting a different picture while swearing parity = the NO-MASKING-FALLBACK named case. GLSL is 8,554 B = 19.3% of `dist/fourier-field.js`, eagerly loaded, zero dynamic imports (J1 S2 corrected bytes) | as cited | CRIT |
| FF-4 | `colorResolver` declared (`FourierField.vue:51`), documented 4×, **never read** (`resolveColorString` at `:128-140` uses `resolveTokenColor` only — re-read this seat) — and the live consumer binds it (`Slide01.vue:35`) | as cited | HIGH |
| FF-5 | D11: `pointer-events:auto` on `--interactive`; role/aria-label/tabindex all null; `host.focus()`→BODY; canvas `aria-hidden`; module grep for `keydown|tabindex|role=` → 0. `defineExpose` (`FourierField.vue:216-224`) omits `headT` → transport `aria-valuenow` reads "0" under a running clock | as cited, live ×2 seats | HIGH |
| FF-6 | Dark retint dead on the library path: `WARM_IDENTITY_PALETTE` (`constants.ts:157-162`) = drifted light-arm-only literal (ΔL 0.041/Δh 3.6° off `--viz-fourier`), no dark arm, watchers re-assign the same constant; demo route path works (J1 S4 split). Dark ring:ground 1.95–2.22:1 vs PROPORTION §1.2 perimeter 3.0:1. Plus `chainColorLin` pins L=0.66 and sweeps hue in radians → arm 1 paints chartreuse (93.3° measured, within 1° of arithmetic) from a warm base | `constants.ts:157-162` vs `color-radius.css:272`/`dark-arm.css:138`; `render.wgsl.ts:83-92` | HIGH |
| FF-7 | Six confusable stroke rungs 5.00/5.00/3.50/2.75/2.25/2.00px; max step 1.43× vs PROPORTION §1.1's ≥1.5× rung law | `render.wgsl.ts:252,267-272,297` at trailWidth 5 | MED |
| FF-8 | Off-roster inline spring: `SETTLE_OMEGA 8.0/SETTLE_ZETA 0.62` (response 0.785s), bespoke Euler, no `springPreset()`; roster is 8 rows, `bouncy` (0.6, ζ0.60) live and doctrinally assigned to "deliberate emphatic one-shots" (`springPresets.ts:46`, read this seat) | `useFourierField.ts:114-115,120-130` | MED |
| FF-9 | `fourierLeanMapping` root-barrel inversion + half-inert: `phaseRateMul` fixed 1 at the only call site (leanX/leanY ARE consumed — J1 S5), `FOURIER_BIAS_GAIN` dead, `constants.ts:45-49` "draws toward the cursor" false; private math public, gate-pinned | `src/index.ts:233,238-239,245-247`; `public-surface.spec.ts:207`; `pointerFieldMappings.ts:119-127` | MED |
| FF-10 | Shape wrong ×3: `composables/` is 73% not-composables (two renderer arms + a bridge); `uniformBridgeWGPU.ts` false suffix (GL imports it, `glSetup.ts:37-41`); 6 module-name-stripping offenders | `ls`/`wc` both arms | MED |
| FF-11 | 9 of 21 `index.ts` names zero-referenced; `FourierFieldProps` hand-mirror drifted + omits `rendererStatus`; speculative zero-setter API: `mode`/`frozenT`/`periodS`/`renderAt`/`reducedMotion` | `index.ts:38-53`; `useFourierField.ts:54-58,80-88` | MED |
| FF-12 | Verbatim TS-to-TS constant duplication (`glSetup.ts:46-50` re-declares 4 alphas + `GL_MAX_PHASORS` in a file importing `../constants`); mirror discipline applied to 1 of 3 shader constants — `RIBBON_UNDERGLOW_{SCALE,ALPHA}` have no TS declaration, refuting `ribbon.ts:19-22` | as cited | MED |
| FF-13 | `BackingSize.dpr` discarded — `wgpuSetup.ts:249` `resize()` empty, DPR re-read per frame; sole cause of the fourier→aurora DAG edge | `useFourierField.ts:301`; `backingSize.ts:73-86` | MED |
| FF-14 | `trailWidth` slider: 27 of 51 steps byte-identical (`RIBBON_HEAD_FLOOR_PX ≈3.62` clamps at `uniformBridgeWGPU.ts:146`); `constants.ts:120` still documents 1..6 | as cited | LOW |
| FF-15 | Head-halo bbox `ext = halfW·4.5` not derived from `squashGain` (needs ·(1+squashGain)); masked by edgeMargin today, clips at trailWidth 6 | `render.wgsl.ts:186`; `wgpuSetup.ts:285` | LOW |
| FF-16 | Housekeeping: seed double-mix (`FourierField.vue:110-111`) · dead `PI` ×2 · empty-palette throw in frame loop (`uniformBridgeWGPU.ts:203`) · `data-testid` on host not canvas · untyped `source` silent-fallback to random ellipse · `Harmonic scale` inert on 8/9 sources · greenfield-meta (`math.ts:5-6` provenance, `README.md:29-31` history, ~20 wave-ids) · `composeIntersectionPark` doc names fourier falsely (`useGpuSubstrate.ts:63-64`) | as cited | LOW |
| FF-17 | `computeFourierFit` calls `positionsAt` 720× keeping only the last element — the exact value `partialSumAt` returns allocation-free (maxDelta 0.0 benchmarked) | `uniformBridgeWGPU.ts:108-115` | LOW |

## 3 · §THE DESIGN
**3.1 DOM/a11y.** Ambient register (no `config`): unchanged, decorative, canvas `aria-hidden="true"`, no role. Interactive register (`--interactive`): host `role="slider"` (exact — NOT the sibling's `role="button"`: `Constellation.vue` serves no keydown, its Enter does nothing; `head_t` is a scrubbed 1-D scalar and `setHeadT` already exists at `useFourierField.ts:347`), `tabindex="0"`, `aria-label="Fourier reconstruction phase"`, `aria-valuemin/max/now` + `aria-valuetext` percentage. Keys: ←/→ ±1/64 · ↑/↓ ±1/8 · Home/End 0/0.999 · Space toggles pause. Quanta restated as interaction law (T7): fine = 1/64 (full traversal in 64 presses, ~2s at key-repeat), coarse = 8× fine — decoupled from `MAX_PHASORS` since the ceiling moves. Keyboard scrub calls `setHeadT` directly, never the momentum spring (`useFourierField.ts:108-110`'s own clause). `data-testid="fourier-field-canvas"` moves to the canvas.

**3.2 Marks (canvas obligations; the component ships 28 lines of scoped CSS, zero minted spacing/radius/alpha — B2's refutation sustained by all seats).**
- **Two stroke rungs**: mark = `halfW` (5.0px default) · scaffold = `RIBBON_TAIL_FRAC·halfW` (2.0px), ratio 2.5× — PROPORTION §1.1's ≥1.5× rung law, derived onto canvas mark weights by stated extension. Chain ring + arm collapse to scaffold; joint dot = mark diameter (terminal node, not a stroke). Nothing between.
- **Cel ink = one law (T3 ruling)**: `samplePaletteLin(0)` darkened in OKLab — never literal black — with **α ceiling 0.16** (PROPORTION §1.2 fill series top rung; Fable's ΔL −0.28 REJECTED as a minted value with no named law). The darkening magnitude is bounded by the gate, not a minted delta: ink:ground ≤ 12:1 both schemes, C ≥ 0.04. `α_cel(age) ≤ α_ribbon(age)` at every age; width ≤ `ribbonHalf(age)`; frame from THIS segment's tangent. Cel + trail composite as one ribbon pass (offscreen α1, blended once) — kills the speed-encoded density swing and the over-composite class. Trail head reads ramp 0.0.
- **Palette**: `WARM_IDENTITY_PALETTE` deleted; default resolves `--viz-fourier` through the cascade at mount and on the dark flip via the mechanism `resolveColorString` already implements; `refreshPalette` joins a `cfg.value.palette` watch. Dark ring:ground ≥ 3.0:1 (perimeter rung). `chainColorLin` keeps palette L (drop the 0.66 pin); hue sweep ±0.35 rad — the sweep may not exit the hue family the identity token names.

**3.3 The N axis tells the truth AND the widen lands (T1 ruling — Fable wins on this seat's evidence).** `MAX_PHASORS` 64 → **256** via the storage-buffer widen `constants.ts:19-23` itself books as cheap; law: ceiling = max shipped source term count (heart/star = 256, verified). Slider `max = min(spectrum.length, MAX_PHASORS)` (Opus's truth law — coincides with spectrum.length for every shipped source at 256); badge reports the **summed** count (`N 24 / 160`). `computeFourierFit(spectrum, maxTerms)` refits on the N edit; fit computed once (`ensureFit()` cache; second call site `wgpuSetup.ts:243` removed); inner loop uses `partialSumAt` (FF-17); fit unions curve bbox with chain-tip rings inflated by |c_k| when `showEpicycles` (centres the scene, not the curve). The false `constants.ts:22-23` comment is struck.

**3.4 Motion (roster-doctrine-confirmed this seat).** Flick→settle: `springPreset("bouncy")` (0.6, ζ0.60) — the roster's own PLAYFUL doctrine names "deliberate emphatic one-shots," which a fling release is; `gentle`'s ζ1.0 would kill the overshoot that IS the liquid weight. **Fit rescale on an N edit: `springPreset("gentle")` (ζ 1.0) on `fit.scale/center`** (Opus arm adopted — Fable's instant refit violates "nothing snaps without a settle"; the roster's own line "a calm arrival must not overshoot" is the law). Keyboard scrub: direct, no spring. Ambient: the 16s carve loop unchanged — it satisfies BREATH (continuous engagement at rest); `freeze`/PRM's single deterministic frame is mandated, not dead. Fable's ±10% glow-breath REJECTED (§7). Head squash-and-stretch + the flick clock stay — the places the liquid-weight edict is already honored.

**3.5 Public surface (clean break).** Props kept: `config · spectrum · getPalette · color · seed · freeze`. Deleted: `colorResolver` (never read; consumer's `var()` keeps resolving — removal invisible in paint). Emits: `rendererStatus`. Expose: `backend · pause · resume · wake · setHeadT · headT (NEW) · rendererStatus`; `renderAt` deleted. `index.ts` after: `FourierField`, math leaf (`dftFromPoints`, `partialSumAt`, `positionsAt`, `makeEllipticSpectrum`, `makeHarmonicFigure`, `FOURIER_FIGURES`, `BasisComponent`), `FourierFieldConfig`, `DEFAULT_FOURIER_CONFIG`, `MAX_PHASORS` (the demo's stated cap). Deleted from `index.ts`: `FourierFieldProps · useFourierField · FourierFieldHandle · UseFourierFieldOptions · WARM_IDENTITY_PALETTE · MAX_CURVE_SAMPLES · EllipticSpectrumOptions · HarmonicTerm`. Root barrel: `fourierLeanMapping` + `FOURIER_*` gains + 3 `FourierLean*` types leave `src/index.ts:233,238-239,245-247`; `public-surface.spec.ts` rows drop with them. Subpaths `./fourier-field` and `./fourier-math` both survive. `source` becomes `"elliptic" | keyof typeof FOURIER_FIGURES`, throws on unknown keys; empty palette throws at config time, not in the frame loop.

**3.6 Layout (T4 — Opus's hoist wins; module-name stripping ×6).**
```
src/components/fourier-field/
  FourierField.vue  index.ts  constants.ts  math.ts
  useFourierField.ts            ← hoisted; a one-file composables/ dir is superfluous
  renderer/wgpu.ts              ← was composables/fourierFieldWGPUSetup.ts
  renderer/uniforms.ts          ← was composables/uniformBridgeWGPU.ts (false suffix corrected)
  shaders/{compute.wgsl.ts, render.wgsl.ts, ribbon.ts}
  README.md                     ← prop table deleted, history struck (65→30)
tests/components/fourier-field/FourierField.smoke.test.ts   ← phantom custom/ dropped, OUR file only
```
`constants.ts` absorbs `PEAK_ALPHA/HEAD_GLOW_ALPHA/TRAIL_FADE_EXP/TRAIL_FLOOR/RIBBON_UNDERGLOW_{SCALE,ALPHA}`.

**3.7 GL arm DELETED — sequenced per T2 (Opus wins on file ownership).** `fourierFieldGLSetup.ts` (403) + `fourier-field.glsl.ts` (242) + the 4 parity assertions die. **BLOCKING PRECONDITION**: `setupGL` is non-optional on `createGpuSubstrate` (`src/composables/glass/webgpu/useGpuSubstrate.ts:51` — the `webgpu/` path, verified; the Fable arm's `webgl/` citation was wrong). The optionality seam is the DUAL-ENGINE BAND's file. **Fallback if the band declines**: `GL_MAX_CURVE_SAMPLES := MAX_CURVE_SAMPLES` **by import, not value**, + the 4 duplicated alphas imported from `../constants` — a −20 cut instead of −645, every other row unchanged. Both paths specified; neither leaves FF-3 open. No WebGPU + no GL arm = loud failure via `rendererStatus`, no silent black. aurora/blob/constellation untouched (~7,700 dual-engine lines stay the band's).

## 4 · §STRIKE / §ADD
**STRIKE**: GL arm + 4 parity claims (false, masking) · `colorResolver` (0 reads, 5 sites) · `FourierFieldProps` + README prop table (drifted hand-copies of `defineProps`) · 8 dead exports + 5 speculative zero-setter fields · 4 of 6 stroke rungs (<1.5× steps) · `WARM_IDENTITY_PALETTE` (drifted, armless) · black cel literal · root-barrel `FOURIER_*` lean surface · inline spring literals · `positionsAt`-in-fit (720× throwaway arrays) · the false `constants.ts:22-23` ceiling claim · `composables/` dir · greenfield-meta + wave-ids + dead `PI` ×2 + dup constants.
**ADD**: `role="slider"` arm + 4 key bindings (+35 — the largest addition the aristotelian pass demands: a pointer consumer owes a non-pointer path) · `headT` expose (a transport reading 0 under a running clock is a breath-of-life inversion) · `computeFourierFit(spectrum, maxTerms)` + `gentle` rescale (+14 — makes "watch it assemble" true and weighted) · MAX_PHASORS 256 widen (+15 — the route's named figure must render its subject) · summed-count badge · `MAX_PHASORS` as the demo's stated cap · typed `source` + config-time palette throw (no-masking-fallback in the type system) · `RIBBON_UNDERGLOW_*` declared in `constants.ts` (makes `ribbon.ts:19-22`'s mirror claim true) · `vizPreviewStill.ts:161-180` consumes `positionsAt` instead of hand-writing a 3-term epicycle (J-4 inverted — the export earns its keep) · demo knobs for `celGain`/`squashGain` (T8 — the loom's two expressive gains have never had a setter on any surface; demo file, coordinate with W-TIMELINE's line 363).

## 5 · §GATES — born-RED, mutation named (union of both arms, 8 gates)
| gate | assertion | born-RED because | mutation that must bite |
|---|---|---|---|
| G-FF-INK (π) | On `/substrates/fourier-field`, boot preset (pentafoil) AND Brand mark ℱ: no canvas pixel exceeds 12:1 vs canvas ground in light; neutral-dark share (C<0.06 ∧ ΔL≥0.06 below ground) ≤5%; darkest marked pixel C ≥ 0.04; dark epicycle-ring peak ≥3.0:1 | 15.06:1 · 48% · C 0.0026 · 1.95:1 | revert cel to `vec4(0,0,0,m)` → rows 1–3 RED; re-pin the light-arm literal → row 4 RED |
| G-FF-N (unit) | `computeFourierFit(spectrum, n)` returns strictly different `scale` for n=1 vs n=length on ℱ (|Δ|>1e-3); for every source in `FOURIER_FIGURES` ∪ demo registry, slider max `=== Math.min(spectrum.length, MAX_PHASORS)`; badge text equals the summed count; `MAX_PHASORS ≥ 256` | no `n` param (gate doesn't compile); badge 160 vs summed 64; ceiling 64 < heart/star 256 | drop `maxTerms`, restore uncapped `maxHarmonics`, or re-narrow the ceiling → RED |
| G-FF-A11Y (DOM) | `interactive` mount: `role === "slider"` (exact — "button" fails), `tabindex === "0"`, all four aria-value* present; ArrowRight moves `aria-valuenow` by 1/64 ± 1e-6; Home → 0; Space toggles pause. Ambient mount: role AND tabindex null | zero hits for role/tabindex/keydown | strip keydown, copy the sibling's button, or leak the role to ambient → RED |
| G-FF-LADDER (unit) | Mark-multiplier set the render pass may emit is exactly `{1.0, RIBBON_TAIL_FRAC}`, ratio ≥1.5, symbols cross-checked in `render.wgsl.ts` | five multipliers ship | reintroduce `0.55·halfW` → RED |
| G-FF-ARMS (unit) | No `color`/`getPalette`: two different palettes light vs dark, each within ΔL 0.01/Δh 1.0° of the matching `--viz-fourier` arm (`color-radius.css:272`/`dark-arm.css:138`) | one drifted literal, no dark arm | restore `WARM_IDENTITY_PALETTE` default → RED |
| G-FF-SURFACE (unit) | Every `index.ts` export has ≥1 outside-module reference (component + config type exempt); `colorResolver` in zero files + zero doc sites; no `fourierLean*` row in `public-surface.spec.ts` | 9 dead exports; 5 colorResolver sites; barrel rows live | re-add any dead name → census mismatch |
| G-FF-SPRING | `rg 'SETTLE_OMEGA|SETTLE_ZETA' src` empty; settle path calls `springPreset("bouncy")`; fit rescale calls `springPreset("gentle")` | literals at `useFourierField.ts:114-115`; instant refit | inline any (ω,ζ) pair or snap the refit → RED |
| G-FF-ONE-LAW | Cut path: `rg 'fourierFieldGLSetup|fourier-field\.glsl|GL_MAX_|pixel-identical|parity' src demo tests` empty AND `dist/fourier-field.js` contains no `#version 300 es` string. Band-declines path: `GL_MAX_CURVE_SAMPLES` is an import identifier of `MAX_CURVE_SAMPLES` (AST-asserted provenance, not value equality) + 4 alphas imported from `../constants` | 256≠384, 5 re-declared literals, 4 parity claims | restore `const GL_MAX_CURVE_SAMPLES = 256` → RED either path |
**Struck as unwritable**: the existing smoke test (`custom/fourier-field/…:57-72` passes `colorResolver` and asserts only a canvas mounts — structurally incapable of catching FF-4, the defect it names; replaced by G-FF-SURFACE + G-FF-A11Y) · any "route renders a canvas" gate (passes on black paint) · a parity gate on the deleted arm · a value-equality mirror gate (passes when both copies drift together) · a bundle-size gate (bytes were miscounted once already; the string probe is the finite version).

## 6 · §PAINT — π/DELTA. Every row owed on Chromium AND real `safari-app` (`scripts/safari-probe.mjs`, `pkill -f safaridriver` first) — no seat in either fleet ran Safari; Playwright-WebKit inadmissible under a Safari label. Screenshot-only on the canvas; never `getContext()` on live WebGPU. fourier-field declares no glass surface — the 61.6% backdrop-filter defect and the prefix trap are not engaged.
| # | route/preset | observation | viewport | engines |
|---|---|---|---|---|
| P1 | `/substrates/fourier-field`, pentafoil + ℱ | pixel census: max contrast vs ground · neutral-dark share · darkest oklch L/C, light+dark | 1440×900 dpr1 · 390×844 | Chromium + safari-app |
| P2 | ℱ | marked-pixel share at N∈{1, 128, 256} (fit tracks N); rescale settles, no snap | 1440×900 | both |
| P3 | dark | ring peak oklch h/L vs dark arm; ring:ground ≥3:1; no pixel with oklab hue 80–120° (chartreuse ban) | 1440×900 | both |
| P4 | interactive | computed role/tabindex/aria-valuenow before/after ArrowRight ×5 + Home; valuenow at t=0 vs t=3s differs | 1440×900 · 390×844 | Chromium (+safari-app for P4 role census) |
| P5 | per source | ink-bbox centre offset ≤4% of width (pentafoil vs ℱ) — the fit centres the scene | 1440×900 | both |
| P6 | `/substrates/{aurora,blob,constellation}` | full-page DELTA byte-stable before/after the GL cut + seam | 1440×900 | both |
| P7 | slides feedback-coder S1/S5 | ambient register paints with `color`, no `colorResolver`; `variant` fallthrough inert | 1440×900 | both — RUNS IN THE SLIDES TRANCHE (§9) |

## 7 · §REJECTED — with falsifiers (union + tri-fold additions)
| killed idea | falsifier |
|---|---|
| DEMOTE-AND-STRIP / delete 90.7% (B1) | consumer verified ×3 (`Slide01.vue:10`, `Slide05.vue:23`, this seat included); "library ban" is demo-chassis prose (`aurora-hero.ts:215-227`); the deck mounts the exact wash called forbidden |
| **keep `MAX_PHASORS = 64` (Opus arm)** | `constants.ts:22-23`'s "all sit under it" is false on disk — heart/star = 256-term (`fourier-paths.ts:143-144`, untruncated `dftFromPoints`); the same comment books the widen as cheap; honest clamping alone leaves the route's named figures 75% truncated forever |
| **cel darkening by minted ΔL −0.28 (Fable arm)** | no named law derives it; PROPORTION: minting outside the series is authoring a defect; the fill-series α 0.16 + gate-bounded contrast is the lawful form |
| **±10% ambient glow-breath (Fable arm)** | unlawed minted gain; the 16s carve already displays continuous engagement — BREATH is met, KISS forbids the knob |
| **`setupGL` seam as "this wave's first task" (Fable arm)** | `useGpuSubstrate.ts` lives at `glass/webgpu/` (Fable's collision row cites a wrong directory — verified) and is the band's file; one owning wave per file per cut; blocking-precondition + import-alias fallback is the executable form |
| **instant fit refit on N edit (Fable arm)** | "nothing snaps without a settle"; `gentle` ζ1.0 is the roster's own "calm arrival must not overshoot" row |
| **keyboard step derived from MAX_PHASORS (both arms)** | the ceiling moved to 256; 1/256 steps are unusable; quanta restated as interaction law (64 fine presses full traversal) |
| specular 7.1× breach (B1 F-10) | category error — PROPORTION's specular census governs CSS box-shadow legs; zero canvas pixels exceed threshold (J1 S3) |
| `role="button"` from the sibling / the DAG ground's "its sibling serves" | constellation serves no keydown (grep 0); Enter does nothing; `head_t` is a scalar → slider |
| "GLSL larger, 25.4%" (B2-2) | 8,554 B = 19.3% vs WGSL 13,266 B = 29.9%; the cut stands on falsity + eager load, not bytes |
| dark ring 1.33:1 (B1) | measured 1.95/2.22:1 (J1 S4); defect survives via the 3:1 floor, the number doesn't |
| "`bouncy` retired" / six-row roster | 8 rows on disk; `bouncy` (0.6, ζ0.60) live with its PLAYFUL doctrine line — read this seat |
| "math.ts has 3 external call sites" (B2) | zero library reuse — all importers in-module/demo/test; the leaf stands on sole-forward-DFT + published subpath |
| delete `positionsAt` post-swap (J-4 implication) | published chain accessor + `vizPreviewStill.ts:161-180` hand-writes exactly it; the cure is consumption |
| keep `colorResolver` for the consumer | consumer-updates ruling; never read, so removal is invisible in paint |
| route the GL cut wholly to the band (B2) | fourier's arm is the masking-fallback named case (different picture + sworn parity); the band keeps the other ~7,700 lines |
| `math.ts` relocation / route deletion / fixture-only survival | die with the DEMOTE they served |
| "9.4× density swing" as a citable number | band sweep never re-run (J1 S13); mechanism adopted into FF-1, number struck |
| divider α 0.3/0.4 as a fourier row (A15h) | demo studio chrome; the component mints zero alphas; routed |
| B2's 7 self-refutations (barrel bloat · bundle dup · CSS fork · god-file · sand-file · 61.6%-not-ours · comment-cull-carries-it) | all sustained by J1 + both arms — do not re-raise |
| `StoryBackgroundKind` four-member-family framing | union is paper|grid|aurora|constellation; blob excluded too (J1 S1) |
| the DAG's 1,921/762 split + "src → 273" | `wc -l` ×3 seats: 2,885 src + 65 README; comment 757; code understated by 207 |

## 8 · TRI-FOLD LEDGER — the forks, ruled
| fork | Fable arm | Opus arm | RULING + evidence |
|---|---|---|---|
| T1 MAX_PHASORS | widen to 256 | keep 64, clamp honestly | **FABLE** — this seat's disk pull: shipped set exceeds the ceiling and the file books the widen cheap; Opus's clamp laws retained (they coincide at 256) |
| T2 GL-cut sequencing | this wave's first task | band's file, precondition + fallback | **OPUS** — file ownership; Fable's path citation was wrong directory (`webgl/` vs `webgpu/`, verified) |
| T3 cel darkening | minted ΔL −0.28 | α 0.16 fill series, gate-bounded hue | **OPUS** — no law names −0.28; the gate is the law |
| T4 layout | keep `composables/useFourierField.ts` | hoist to root | **OPUS** — one-file dir is superfluity |
| T5 breath add | ±10% glow modulation | carve loop unchanged | **OPUS** — unlawed mint; BREATH already met |
| T6 fit-rescale spring | (unspecified/instant) | `gentle` on fit.scale/center | **OPUS** — liquid-weight edict + roster doctrine |
| T7 keyboard quanta | 1/64 from ceiling | 1/64 from ceiling | **RESTATED** — both derivations die with the widen; interaction law substituted |
| T8 demo knobs celGain/squashGain | ADD | absent | **FABLE** — advertised axis owes a knob; demo-side, coordinate W-TIMELINE |
| T9 vizPreviewStill consumes positionsAt | noted as smell | ADD | **OPUS** — the export earns its keep |
| T10 G-FF-INK preset | pentafoil | ℱ pinned | **UNION** — black cel paints on both; assert both, N gates pin ℱ |
Both arms' bench/juror adjudication ledgers (every B1/B2/B3/J1/J2 finding ruled, no silent drops) are ADOPTED BY REFERENCE where they concur — which is everywhere outside T1–T10. Findings cited by id per ROUND-1; nothing restated.

## 9 · §ROUTED
| what | owner |
|---|---|
| `setupGL` optionality on `createGpuSubstrate` (`webgpu/useGpuSubstrate.ts:51`) — BLOCKING PRECONDITION for the −645 cut; fallback specified §3.7 | DUAL-ENGINE BAND (which keeps the other ~7,700 dual-engine lines) |
| `ScrubberTimeline.vue:215,218` hard-coded aria-label + 15.3px target + demo transport→`<Slider>` (`fourier-field.vue:363`, COMPONENT-WAVES-TERMINAL.md:126) | W-TIMELINE — coordinate, do not both edit |
| `LabeledSelect.vue:52-54` renders raw values tree-wide | W-LABELED-FIELD |
| `Constellation.vue:100-102` role="button", no keydown — same D11 disease, wrong cure | constellation row |
| `resolveBudgetDpr` sever (FF-13 records; the cut is the graph wave's) | DAG-RULINGS:186 booked owner |
| phantom `tests/components/custom/**`, 15 remaining dirs | tranche test-tree move |
| CT-1: `/fourier-field` among 19 subpaths hard-failing clean install (`ROUND-1-FINDINGS.md:567`) | packaging wave — not gated here |
| harmonic-leaf note: DFT fairing (band-limited ⇒ cannot kink; parameter doubles as draw-on clock — F35/F37/F39, HM-8) | W-HANDMARK, non-blocking; `math.ts` stays put |
| slides feedback-coder: `colorResolver` removal + stale `variant` + 3.13.0 pin; P7 runs there | slides tranche, marked addendum, per the consumer-updates ruling |
| studio transport divider α 0.3/0.4 | demo-chrome owner |


---

# CONSTELLATION

**DISPOSITION:** KEEP-THIN — affirmed on verdict, overturned on "0 consumers" (slides imports 6 runtime + 3 types) and on scope (the DAG's ~130-line saving is ~2.4× short on code); the well is repaired in place (six lines), not replaced by a lens.

**LOC:** 2,442 → ~1,617 file lines (README excluded). Census at HEAD 0371836d, blank-excluded: 1,460 code · 857 comment · 125 blank · 37.0% comment share. Arithmetic: code 1,460 − 385 (deletions per §8) + 57 (additions: Opus arm's +67 minus the struck scroll lean −10) = 1,132; comment 857 → 380 (25.1%) = −477; blank ~105. Total −825, of which −477 (58%) is a COMMENT CULL and is stated as one — real code delete is −328 net. README 551 → ~170 separately. The DAG's ~130 stands corrected.

**COLLISIONS:** \n- src/composables/glass/canvas2d/useCanvas2D.ts (ROUTED R1 — Canvas2DHandle {w,h,dpr}; read-only here)\n- src/composables/motion/pointer/pointerFieldMappings.ts:253 constellationWellMapping (read-only — the well survives, the mapping stays)\n- src/index.ts:236 constellationWellMapping re-export (untouched)\n- src/styles/tokens/color-radius.css §5c + src/styles/tokens/dark-arm.css §5c (3 token deletions each: -accent, -edge-floor, -edge-accent-alpha)\n- package.json exports (ROUTED R2 — style condition, 0/72 subpaths; NOT claimed)\n- demo/stories/substrates/constellation.vue (loses 4 sections; :link 140→168, 148→178)\n- demo/chassis/hero/StoryHero.vue:116-120 + demo/chassis/hero/story-hero.css:45-47 (token overrides unchanged — the -alpha token survives)\n- demo/manifest.ts:228,380,460,931,987,996\n- tests/components/custom/constellation/constellationField.test.ts (import re-points + 2 deleted cases)\n- tests/public-surface.spec.ts (gains a ./constellation subpath row pinning 7+6)\n- tests-visual/constellation-*.spec.ts (1,631 lines, ROUTED to G-13's wave)\n- slides tranche (marked addendum R8 — ConstellationPalette narrows; verified non-biting)

# W-CONSTELLATION — TERMINAL SPEC (TRI-FOLD ADJUDICATED)

**Adjudicator:** `claude-fable-5` · HEAD `0371836d` · Arms: Fable (KEEP+REDUCE+LENS) vs Opus (KEEP-THIN, well repaired). **Base adopted: the Opus arm**, which survived every adjudicator spot-check; two Fable amendments (ripple 900 ms; scroll lean struck). Every disputed claim below was re-verified by me on disk at HEAD before ruling — agreement between arms was not treated as evidence.

## 0 · ADJUDICATION — the arms, ruled

The arms agree on the frame: KEEP (sole Canvas2D substrate, motion-band identity `manifest.ts:228`, desktop paint good); "0 consumers" in `DAG-RULINGS.md:98` is FALSE (`slides/src/decks/til-briefing/constellation.ts:29-40` imports `seedField·readPalette·kVisOf·BASE_WIDTH·warpStep·warpTo` + 3 types — re-verified by me, byte-exact, and its own comment states "The deck defines every neutral token on `.deck` … so glass-ui's flat fallbacks never fire"); B1-C1 (well never restores) is refuted; the G-band dies; the a11y surface is stripped; the layout lands at 9 name-stripped files; the comment cull is ~58% of the reduction and says so. They split on five points, each ruled on evidence I reproduced:

| # | dispute | ruling | falsifier I verified |
|---|---|---|---|
| A1 | **Well: delete + paint-only lens (Fable) vs six-line repair (Opus)** | **OPUS** | Fable's four surviving grounds each fail. (a) "structural impossibility": Opus's terminators are the structural duals of each arming path (capture→up/cancel, focusout→keydown, visibilitychange→both, button guard→arm) and each is per-row mutation-gated — the stuck class is closed. (b) "gain must be re-derived": `constellationWell.ts:88-101,116` is dt-integrated on disk (`ramp·h`, `a·h`, `cool·h`); the `14000→19000` lift (`color-radius.css:236`, read verbatim) compensated the DRIFT's frame clock (nodes escape reach faster at high refresh), so the CON-4 fix re-measures the gain against G-CON-WELL-RELEASE — no derivation cliff. (c) −150 LOC buys the deletion of a measured-working interaction plus its mapping/route/demo seams (`constellationWellMapping`, `src/index.ts:236`, ROUTE_WELL_OVERRIDE) — more collision surface. (d) "first-frame response": the pointer-proximity focus lift (`constellationField.ts:311,338`) already paints on frame 1 with no `holdMs`. The lens is 100% unmeasured; adopting it violates the measurement-beats-read principle both arms used to kill B1-C1. |
| A2 | **wander: default-on as breath (Fable) vs delete (Opus)** | **OPUS** | `constellationRender.ts` (read in full by me) contains ZERO references to `focal`/`warp` — wander re-targets the warp spring, whose position paints only via a consumer `drawOverlay`. Default-on is a zero-paint change on the bare component; it cannot discharge BREATH because it is invisible. BREATH is met by the unconditional drift (all seats). |
| A3 | **`count` scales with areal k, floored at 24 (Fable/B3/J2) vs fixed (Opus)** | **OPUS** | arithmetic: `N∝k`, `R∝k`, `A∝k²` → degree `=(N−1)πR²/A ∝ k` — NOT invariant. Fixed `count` gives degree exactly invariant (4.70/4.71 across viewports). Fable's rider breaks the very gate it cites. G-CON-DEGREE carries the mutation. |
| A4 | **Token collapse: `-alpha` deleted + edge alphas premultiplied to 0.176/0.272 (Fable) vs 20→15, alphas untouched (Opus)** | **OPUS** | `readPalette` (`constellationRender.ts:33-37`) reads `--constellation-alpha` and returns `alpha`; glass-ui's own `drawEdges:62` multiplies it into every edge; slides reads `p.alpha` (`:234`) and `p.edgeAlpha` (`:236`) as SEPARATE factors and declares both token names on `.deck` under current semantics. Fable's cut either keeps a read of a deleted token (the very D7/CON-5 phantom disease) or drops the field (contract break under a "signatures unchanged" banner). The "0.176 byte-equal" observation is numerology over two orthogonal, externally-read knobs. |
| A5 | **Ripple lifetime + scroll lean** | **FABLE both** | 900 ms stays — the curves (easeOutExpo radius, quadratic alpha) fix D17/the linear sites; no defect motivates a duration change. The scroll-momentum lean is STRUCK from this cut by the same standard that killed the lens: an unmeasured novel affordance does not enter a reduction wave — ROUTED to the precepts design-iteration loop (§9 R9). |

Everything else in the Opus arm is adopted; its counts were independently confirmed (four hsl→hex conversions land exactly on `#7f776c/#a19b91/#29231f/#b95a31`; `fireBurst`'s live internal caller at `useConstellation.ts:383`; drift `p.x += p.vx*k` + `*= -1` walls at `constellationField.ts:140-155`; the listener block `useConstellation.ts:225-266` lacking button guard/focusout/visibilitychange; the k-floor `getComputedStyle` at `:294-299`).

## 1 · DISPOSITION + THESIS

> ### KEEP-THIN — affirmed on verdict, overturned on "0 consumers" and on scope.

Slides @ `b538506` consumes 6 runtime + 3 types from `@mkbabb/glass-ui/constellation`; the "stays local" project note is stale in the way that matters — the deck keeps an 814-line bespoke red-anomaly *skin* on *our* engine. Those symbols are contract; everything else is free-fire. The lattice, desktop paint, PRM/freeze/offscreen paths and BREATH are right. Four things are wrong: **the scale law** (`k = w/BASE_WIDTH`, `useConstellation.ts:291` — a length scale on an areal density; degree −70% at 390×844), **the clock** (`p.x += p.vx*k` per frame beside dt-correct `warpStep`/`stepWell`; displacement exactly linear in refresh, 1.000/2.000/4.000/4.800 at 30–144 Hz), **the well's release** (keyup the sole keyboard terminator; any button arms it), and **~300 lines of G-band built for five asks the requester listed at `slides/…:22-27` and declined**. Plus wrong grain (5 prefixes, 5 hops, a self-declared compat shim, a one-file `composables/`) and a 37.0% comment stock inverted against need. The DAG's ~130-line saving (`DAG-RULINGS.md:355`) is 2.4× short on code.

## 2 · §DEFECTS (adjudicated ids; all bench findings dispositioned here, §7, or §9 — none dropped)

| id | defect | evidence | sev |
|---|---|---|---|
| CON-1 | Mobile disintegration: width-k on areal density; k 0.8422→0.2531, reach 124.6→37.5 px, degree 6.79→2.04 (−70%); J1: 122→35 edges, 4.36→1.25 | `useConstellation.ts:291`, measured both arms | high |
| CON-2 | Well: no release on focusout/visibilitychange; keyup sole keyboard terminator; \|v\| 0.16→1.90 @+9 s under Tab-away | `useConstellation.ts:219-266` (verified: no blur/focusout/visibilitychange/capture) | high |
| CON-3 | Any pointer button arms the well (no `button`/`isPrimary` guard); right-click displacement 0.129→0.408 | `:225-241` verified | high |
| CON-4 | Frame-clock drift beside wall-clock springs; `well-gain` 14000→19000 lift is the on-disk confession of a constant retuned to mask it | `constellationField.ts:140-141`, `color-radius.css:236` verbatim | high |
| CON-5 | Per-frame `getComputedStyle` for `--constellation-k-floor` — 0 declarations, `NaN` forever, 77.7–87.3% of route GPV traffic; contradicts `constellationInteraction.ts:42-46` | `useConstellation.ts:294-299` verified | high |
| CON-6 | Speculative G-band (`pinned·pinnedDrift·accentEdges·edgeFloor·edgeAccentAlpha·warpAutoRelease·wander`) built for the five declined asks; slides hand-reads its skin deck-locally (`:240-249`) | slides header `:13-27` verified | high |
| CON-7 | Barrel 37 runtime + 13 types; external demand = `Constellation` + `ConstellationField` (demo) + 6+3 (slides); 31 runtime names have no importer anywhere; no `/constellation` row in `tests/public-surface.spec.ts` | `index.ts:1-61` | high |
| CON-8 | 452,760 px² `role="button"` over an `aria-hidden` canvas, verified-inert keyboard (focalIndex 47×6 — hardcoded centre into `warpTo`'s no-op), 3 of 30 tab stops | `useConstellation.ts:254-256`, `constellationInteraction.ts:212-213` | high |
| CON-9 | Parallax unreachable (`DEFAULT_PARALLAX=0`, no setter) yet allocating `{x,y}` per node per frame (~21k obj/s); `node.z` dead, perturbs the RNG | `constants.ts:118`, `constellationField.ts:350-366`, `constellationRender.ts:97` verified | med |
| CON-10 | 5 module-name prefixes, 5 hops, the `export type *` self-declared compat shim (`constellationField.ts:28-35`), one-file `composables/`, `createConstellationField.ts` 117 ln/1 caller, `constellationWell.ts` 139 ln/1 export | as cited | med |
| CON-11 | `useConstellation.ts` god-file: 460 code/3 comment; 156-line render closure, 8 concerns; comment stock inverted (`types.ts` 68.4%, `constants.ts` 67.9%) | census §8 | med |
| CON-12 | `DEFAULT_PALETTE` mirrors neither arm under a comment claiming light — all four diverge (light node `#7f776c` vs fallback `#b4afa3`); B3's four values exact, B2's `line` sub-claim wrong | `constants.ts:22-24`, conversions re-run by me | med |
| CON-13 | Mount-only props under a reactive label: 0 `watch()`, 16 props destructured to `const`; post-mount `gravityWell` flip → labeled button, no listeners, `field.well` undefined | `:93-106`, `:245` | med |
| CON-14 | Phantom token cohorts documented as shipped: `-pinned-drift-*`, `-well-soften` — 0 declarations, 0 reads | `constants.ts:81`, `constellationTypes.ts:192-217` | low |
| CON-15 | `VEL_LEAN_GAIN/CAP` declared inside `stepField`'s hot branch — the one LIQUID-WEIGHT knob, the only physics outside `constants.ts` | `constellationField.ts:170-171` | low |
| CON-16 | `MAX_DEGREE` documented per-node, applied globally; `E_MAX 3072 > C(64,2) 2016` — unreachable below count≈79 | `constants.ts:99-103`, `constellationField.ts:302-305` | low |
| CON-17 | The library's sole real-mode hand-rolled focus ring, `outline-offset: 2px` off-series | `Constellation.vue:120-123` | low |
| CON-18 | `warpTo(300)` silently returns `-1` (NaN cascade) | `useConstellation.ts:461-471` | low |
| CON-19 | `useRoutePointer()` unconditional per instance (latent — demo provides once) | `Constellation.vue:68-69` | low |
| CON-20 | False statements on disk: README `speed` prop (`:143`), gain 22000-vs-19000 (`:420`), 6-vs-10 file tree, 3 dead `prng.ts` links; `contain` "paint root" vs computed `layout style`; the `sp>1e-9` guard falsifying the "nudged up" comment; `well.strength` identity self-assignment (`constellationWell.ts:91`, verified) | as cited | low |
| CON-21 | Three literal-linear motion sites: ripple alpha `(1−phase)·0.5`, radius `8+phase·130`, wall `vx *= -1` — against LIQUID WEIGHT | `constellationRender.ts:143-151`, `constellationField.ts:142-155` verified | med |
| CON-22 | Hero and first showcase byte-identical seed/count/link | `StoryHero.vue:117-119` vs `constellation.vue:301-303` | low |

**Genuinely fine — no change:** PRM exact-0 path; `freeze` raw-vnode read; `?export`; offscreen park (6/8 at 0 frames); `:where(.constellation)` sizing; `refitField`; `warpStep` ω-convention; both arms paint.

## 3 · §THE DESIGN

**3.1 Scale law.** `k = sqrt((w·h)/(BASE_WIDTH·BASE_HEIGHT))`; `BASE_HEIGHT = 720` promoted from the inline fallback (`useConstellation.ts:290`); `BASE_WIDTH 1280` unchanged (exported, slides contract). **`count` does NOT scale** (A3). `kVisOf`'s 0.72 floor stays — both viewports floor to it, mark size viewport-identical for free. Demo re-tunes `:link` 140→168, 148→178 to hold the banked desktop look (a demo choice, not a library mint).

**3.2 Clock.** `REF_HZ = 60` in `constants.ts`; `p.x += p.vx·k·dt·REF_HZ` — `speed 0.16` keeps its 60 Hz meaning byte-for-byte. `stepWell` unchanged (dt-correct on disk); `--constellation-well-gain` re-MEASURED against G-CON-WELL-RELEASE after the integrator lands, never re-guessed.

**3.3 Motion.** Wall contact: inside `WALL_MARGIN = 12` CSS px, spring return response 0.70 s / ζ 0.25 engaged on penetration; no `*= -1` survives. Ripples: radius `(8 + 130·(1 − 2^(−9p)))·kVis` (easeOutExpo), alpha `(1−p)²·0.5·opacity`, **lifetime 900 ms unchanged** (A5). Warp spring unchanged. `VEL_LEAN_GAIN/CAP` hoisted to `constants.ts` as plain consts, no token (CON-15).

**3.4 The well — six lines, each the structural dual of an arming path:** `setPointerCapture(pointerId)` on pointerdown (up/cancel always land on host) · `focusout` → `releaseWell()` · `visibilitychange` (hidden) → `releaseWell()` · `if (event.button !== 0 || !event.isPrimary) return`. `holdMs 140` bloom + brisk release kept — the release path measurably restores (\|v\|→0.1600 within 2 s, cv 0.430 @+30 s vs t0 0.452). B3's 8-listener matrix + deadman rejected (a deadman falsely releases a stationary held pointer).

**3.5 A11y — strip the promise.** Delete `role`/`tabindex`/`aria-label`/`interactive`/`interactionLabel`, both key listeners, and the bespoke outline block outright (nothing focusable remains). `warpOnClick` and `gravityWell` become pointer-only. Tab stops 30→27; a 452,760 px² lie removed is a net a11y gain.

**3.6 Public surface.** Barrel = the ONLY re-export site: runtime **37→7** (`Constellation · seedField · BASE_WIDTH · warpStep · warpTo · readPalette · kVisOf`), types **13→6** (`ConstellationNode/Palette/Warp/Field/Props/WellConfig` — WellConfig lives because the well lives). `fireBurst` leaves the barrel, survives internally (`:383`). Props **16→9**: `count · link · seed · opacityCeiling · pointerReactive · warpOnClick · gravityWell · freeze · backgroundInteractive` (+`class`, +`drawOverlay`). ONE re-seed watcher on `count/link/seed`; `freeze/backgroundInteractive/drawOverlay` mount-time AND documented as such; `pointerReactive/gravityWell` already read live. `warpTo` typed overload pair + dev throw (CON-18). `DEFAULT_PALETTE` re-derived from the light arm exactly: `node #7f776c · nodeDim #a19b91 · line #29231f · accent field deleted` (CON-12). `ConstellationPalette` narrows to `{node,nodeDim,line,alpha,edgeAlpha,edgeFocusAlpha}` — verified non-biting on slides (reads exactly those + hand-reads its skin deck-locally with fallbacks); marked addendum in slides' tranche (R8).

**3.7 Tokens 20→15, no ladder rewrite (A4).** Deleted (both arms): `-accent`, `-edge-floor` (0 both arms, 0 setters, `+0` forever), `-edge-accent-alpha` — all die with the accentEdges arm; slides reads its skin under deck-local names/declarations, non-biting. Deleted with `wander`: `-wander-idle`, `-wander-jitter`. Phantom claims struck from comments: `-k-floor`, `-pinned-drift-*`, `-well-soften`. **UNCHANGED:** `-node`, `-node-dim`, `-line`, `-alpha` (0.80/0.88), `-edge-alpha` (0.22/0.20), `-edge-focus-alpha` (0.34/0.32), the 5 `-well-*`, the 2 `-warp-*`. PROPORTION: the component declares no spacing/radius/type value; the one off-series mint (`outline-offset: 2px`) deletes with the ring; node radius/`link`/`BASE_*` are mark-field geometry, not UI space; §1.2's divider ladder does not govern a continuous-falloff hairline.

**3.8 On-disk — 9 entries, name-stripped, 0 hops.**
```
src/components/constellation/
  Constellation.vue  ~95   useConstellation.ts  ~330 (composables/ dissolves; createConstellationField folds in;
                                                      render closure → resolveGeometry·advanceRoutePointer·advanceField·paintField)
  field.ts  ~215            interaction.ts  ~300 (constellationWell.ts folds in)
  render.ts ~130            types.ts  ~185       constants.ts ~70       index.ts ~14       README.md ~170
```
The `export type *` shim dies with the rename; every importer re-points at the declaring module (dissolves the `constants↔field` cycle). Tests: `tests/components/custom/constellation/` → `tests/components/constellation/`; parallax + k-floor cases delete with their subjects.

**3.9 Deleted outright:** G-band (wander incl. `pickWanderTarget` + 2 constants, pinned/pinnedDrift + 4 constants + 3 `pinnedIndex` branches, accentEdges + accent arm + 3 palette fields, `warpAutoRelease`) · parallax machinery + `node.z` + seed roll (RNG-stream shift declared: `seed` keeps reproducibility, not values) · `MAX_DEGREE`/`E_MAX` + global sort branch · per-frame `getComputedStyle` + `field.kFloor` · `field.dpr` (write-only here AND in slides) · a11y surface + outline · identity self-assignment · 30 barrel names · 5 token declarations ×2 arms · every CON-20 false statement. `useRoutePointer()` gated behind `backgroundInteractive` (CON-19). Demo: first showcase gets a distinct seed (CON-22); story sheds 4 sections.

## 4 · §STRIKE / §ADD

**STRIKE:** G-band ≈300 LOC (declined asks — superfluity, not consumer count) · parallax (unreachable, allocating) · 30 barrel names (vacuity) · 5 tokens (dead knobs) · 5 prefixes + 5 hops + shim + `composables/` + two 1-caller files (NO LEGACY, goldilocks) · a11y promise + sole bespoke ring (a lie stripped, not redeemed) · `warpAutoRelease` (a knob needing a paragraph is not a knob) · ≈477 comment lines (tranche archaeology; **stated: a comment cull, not design reduction**) · README to ~170.

**ADD (more affordance owed):** areal k — the web owed to the most common viewport · dt-integration — the same field at every refresh · six-line well release — the cool-down invariant made defensible · soft wall + eased ripples — the last snaps removed (LIQUID WEIGHT) · live `count/link/seed` — knobs that actually turn · typed `warpTo` + dev throw — fail loudly · documented mount-only contract.

## 5 · §GATES — five, born-RED, mutation-checked

| id | assertion | RED at HEAD | mutation that bites |
|---|---|---|---|
| G-CON-DEGREE | Seeded `buildEdges` mean degree at 324×420 within 20% of 1078×420; pure, no browser | k 0.8422→0.2531, degree −70% | revert to width-k → RED; scale `count` with k → RED (degree ∝ √A) |
| G-CON-RATE | Mean node path over identical wall time within ±2% across 30/60/120/144 Hz (seed 12345) | ratios 1.000/2.000/4.000/4.800 exactly linear | drop `·dt·REF_HZ` → RED |
| G-CON-WELL-RELEASE | Arm×terminate matrix {keydown→keyup/focusout/visibilitychange, pointerdown→up(captured)/cancel/leave}: `well.target === 0` within 1 frame, \|v\| within 10% of `speed` @+1.5 s; `button!==0`/`!isPrimary` never arms | focusout + visibilitychange rows leave target 1 (\|v\| 1.90 @+9 s); right-button arms at 0.998 | remove any one terminator or the guard → that row RED |
| G-CON-TOKEN-HYGIENE | (a) every `--constellation-*` read has declarations in BOTH arms and every declaration ≥1 reader; (b) no `getComputedStyle` reachable from a `useCanvas2D` render callback | `-k-floor` read with 0 declarations; 128.4–240.4 GPV/s live | reinstate the read or add a phantom declaration → RED |
| G-CON-SURFACE-GRAIN | (a) every barrel runtime name has ≥1 external importer or is in the declared 6-symbol slides contract; (b) no `constellation`-prefixed filename; (c) no module re-exports a symbol it does not declare; plus a `./constellation` row in `tests/public-surface.spec.ts` pinning 7+6 | 31 orphan exports; 5 prefixes; 5 hops | add an orphan export, restore a prefix or hop → RED |

**Struck gates:** B1's G-CON-3(a) (metric saturates ≈3.5% on a 1.4%-ink field — cannot go green) and 3(b) (gates a lens this spec does not build); Fable's G-CONST-LENS (void with the lens, A1); a `grep -L parallaxNodePos` gate (passes with the allocation intact); any breath pixel-delta gate (breath is met).

## 6 · §PAINT — π/DELTA obligations

Route `/substrates/constellation` (+ `/` hero arm). **Safari is OWED on every cell — zero `safari-app` cells banked by any seat**; `scripts/safari-probe.mjs` (`pkill -f safaridriver` first); Playwright-WebKit may not be written into a Safari cell.

| claim | metric | viewport | baseline (RED) | after |
|---|---|---|---|---|
| mobile web survives | mean degree, edge share of ink | 390×844 dpr3, light+dark | degree 1.25, edge share 64.9% | degree within 20% of desktop, edge share ≥85% |
| desktop not regressed | ink coverage / mean α / edge count, instance 0 | 1440×900 dpr2, light+dark | 1.524% / 46.6 / 122 | within 5% (with the `:link` retune) |
| well releases on all six terminators | \|v\| timeseries @250 ms × 6 s + right-button row | 1440×900 | focusout/visibility rows RED (0.57/0.77/1.90) | all rows → speed within 10% @+1.5 s |
| ripple curves | radius + α at 0/120/360/720/900 ms | 1440×900 | linear | easeOutExpo / quadratic |
| PRM/`?export` frozen | frame hash | 1440×900 dpr1 | exact 0 (ink 6367, hash 1814560146) | still exact 0 |
| palette fallback | `DEFAULT_PALETTE` vs 4 live light tokens | computed-style | 3/3 surviving fields diverge | exact hex equality |
| a11y strip | `[role=button]` count; tab stops | 1440×900 | 3; 30 | 0; 27 |
| token closure | declaration↔reader, both arms | computed-style | `-k-floor` orphan read | closed |

## 7 · §REJECTED — with falsifiers; may not be re-raised

1. **Fable arm's lens (delete-the-well)** — A1: all four grounds fail against disk + measurement; the six-line repair closes the stuck class structurally; the lens is unmeasured and deletes live seams. The Fable arm itself conceded B1-C1's refutation and deleted anyway — grounds insufficient.
2. **Fable arm's token collapse** (`-alpha` deleted, edge alphas premultiplied 0.176/0.272, opacityCeiling as sole recession knob) — A4: `readPalette:33` + slides `:234,:236` + `drawEdges:62` falsify it three ways.
3. **wander default-on (Fable/B3)** — A2: `constellationRender.ts` paints no focal; zero paint delta on the bare component.
4. **`count` scales with k (Fable/B3/J2)** — A3: degree ∝ √A under the rider; arithmetic.
5. **Opus arm's ripple 720 ms** — no defect behind the duration change; curves carry the fix.
6. **Opus arm's scroll-momentum lean** — same unmeasured-novelty standard as the lens; routed to the precepts loop (R9), not built in a reduction wave.
7. **B1-C1** (well destroys/never restores/annulus) — `constellationWell.ts:130-137` is a direction-preserving \|v\|→speed ease (read at HEAD); J1: \|v\| 0.1600 @+2 s, cv 0.430 @+30 s vs t0 0.452; sdR rises under hold. J2's contrary code-read overruled by measurement.
8. **B1's breath-failure + speed 0.16→0.34 + curl noise** — motivating metric saturates by construction; taste on a struck premise.
9. **B1's ink-ladder remint** (0.16/0.48) — §1.2 governs 1px dividers, not a continuous `1−d²/reach²` falloff; and both knobs are externally read.
10. **B1's `fireBurst` deletion** — live caller `useConstellation.ts:383`, verified.
11. **B1's `backgroundInteractive` computed-style fold** — `pointer-events` sniffing is implicit magic; a documented prop is honest.
12. **B2/B3 barrel cures (→2, →1)** — both delete the six live slides imports.
13. **B2's draw-pass barrel adds** — zero consumers; literally the CON-6 disease.
14. **B2's `composables/` retention** — one file is not a group; consistency with a bad pattern is not an edict.
15. **B2/B3 consumer censuses** — struck by the import statement itself.
16. **B3's keyboard-redemption cure** (focal stepping + live region + arrows) — building an a11y organ for decorative chrome; strip the promise.
17. **B3's 8-terminator + deadman** — a deadman falsely releases a stationary held pointer; capture + three terminators close it exactly.
18. **B3's CN-10 fold-into-`.focus-ring`** — nothing focusable remains; deletion, not folding.
19. **DELETE / DEMOTE / GREENFIELD the component; PROMOTE the slides skin** — sole Canvas2D substrate, live consumer, band identity; the skin is deck vocabulary — stop generalising for it.
20. **Struck measurements (not quotable):** B1's 26-export/34.4%/1,351-line counts; B2's 35-export/"eleven"; B3's 172-edge/63-code/scroll-away timeseries; single-number GPV rates as invariants; B1/B3 ink fractions; B2's "`line` mirrors light" (light line = `#29231f`, verified).

## 8 · §LOC

Census at HEAD (verified identical across arms): **2,442 total · 1,460 code · 857 comment (37.0%) · 125 blank** (+README 551; the DAG's 2,452 is 10 over).
**Deletions −385:** barrel −46 · wander −55 · pinned/pinnedDrift −85 · accent skin −35 · parallax −25 · warpAutoRelease −18 · a11y strip −40 · k-floor/kFloor/dpr −10 · MAX_DEGREE/E_MAX −10 · createField fold −36 · hops −20 · misc −5.
**Additions +57:** areal k + BASE_HEIGHT +3 · dt + REF_HZ +4 · soft wall +10 · eased ripples +6 · capture/focusout/visibility/button +8 · VEL_LEAN hoist +2 · warpTo overload +6 · re-seed watcher +12 · closure decomposition net +6.
**Code 1,460→1,132. Comment 857→380 (25.1%). Total 2,442→~1,617 (−825).**
> **STATED: 477 of 825 lines (58%) are a COMMENT CULL, not design reduction; real code delete is −328 net.** Concentrated in `types.ts` 288→~90, `interaction`+well 254→~110, `constants` 76→~35, `Constellation.vue` 58→~25. Every physics derivation survives once, at its constant. README 551→~170 separately.

## 9 · §ROUTED

| # | item | owner |
|---|---|---|
| R1 | `Canvas2DHandle` exposes `{w,h,dpr}` (or `render(ctx,now,box)`) — cures the inlined-DPR duplication at root; until it lands constellation keeps the local derivation, `field.dpr` dies either way | canvas2d wave |
| R2 | `style` export condition — 0/72 subpaths; `./constellation` ships headless (300×150); also the sole reachability path for CON-12 | packaging wave |
| R3 | `tests/components/custom/` isomorphism (16 suites) | test-tree wave |
| R4 | `tests-visual/` 5 constellation specs, 1,631 lines, unwired (0/20 scripts run Playwright) — much of the deleted G-band exists to be read back by them | ROUND-1 G-13's wave |
| R5 | Route budget: 9 canvases / 59.36 MiB backing / 8 hosts mounted at 390×844; shell `aurora-canvas` 300×150 vs 1440×900 box | ROUND-1 P5/P10 + aurora `webgl/visibility.ts` |
| R6 | Demo: 5 `background:"constellation"` manifest sites render no hero; story section shed + `:link` retune; hero-vs-showcase seed split | demo wave |
| R7 | `ConstellationPalette` narrowing reaching slides (verified non-biting — deck-local reads with fallbacks) | marked addendum in slides' tranche per the consumer-updates ruling |
| R8 | (reserved — folded into R7) | — |
| R9 | scroll-velocity feeding background substrates (struck A5) | precepts design-iteration loop |

## 10 · Adjudication ledger — arms

**FABLE arm:** base REJECTED on A1–A4 (lens, token collapse, wander-default, count rider — each falsified on disk by me); ADOPTED from it: ripple 900 ms, the scroll-lean routing, the `fireBurst` refutation, the RNG-stream-shift declaration, the public-surface-row mechanism, the "particle geometry not UI space" PROPORTION note. **OPUS arm:** ADOPTED as base — every distinctive ruling (well repair, wander delete, fixed count, token floor, palette hexes, listener census, dt-form of `stepWell`, LOC arithmetic) survived independent re-verification; amended only on ripple duration and the scroll lean. Both arms' shared frame (consumer, scope, G-band, grain, a11y strip, comment cull) spot-checked and adopted.


---

# FOLD — tier-2 reconciled

**TIER-2 FOLD — batch reconciliation of 8 adjudicated terminal specs (10 components)**
modelId: `claude-fable-5` (adjudication seat; the arms/benches inside each spec were Opus 5 per model law — every spec self-declares its roster). HEAD on disk this seat: `bce78c3e` — the batch brief's `0371836d` is stale by the coordination commits; the W-DIALOG spec already flagged this, and no spec's evidence depends on the delta. No repo byte authored; disk re-verification below was read-only.

**HEADLINE RULING — the one true cross-spec contradiction in the batch.** W-DIALOG (§3.5) seeds `src/components/sheet/` and strips `placement` off `DialogContent`; W-DIALOG-DETENT deletes drawer INTO `dialog/` and rejects `sheet/` on three on-disk retirement records. **Re-verified this seat: `src/index.ts:107` reads "ui/sheet retired; Sheet's side-slide folded onto [Dialog placement]"; `axes.ts:54-56` seals the 5-member `PLACEMENTS` axis including `center`; no `src/components/sheet/` exists.** W-DIALOG's seed relies on DAG row 13's home column, which W-DIALOG-DETENT overturned with disk evidence; minting `sheet/` re-creates the two-dirs-one-portal duplication both specs war on, against a sealed axis. **RULED: no `sheet/` is minted. `placement` stays on `DialogContent`. W-DIALOG's centre-plate design (dismiss axis, rebuff, proportion, ✕, one CSS lane) stands whole; its §3.5 side-arm split-out and `SheetContent.vue` are STRUCK; its banked side-arm handoff numbers re-route to W-DIALOG-DETENT.** Cut order: W-DIALOG first (owns `DialogContent.vue` + `styles.css`), W-DIALOG-DETENT second (owns `placement.css` re-key + `detents/`). Surface conflicts resolved the same way: `showClose`/`springPreset`/`backdrop` DIE per W-DIALOG's measured defects (DLG-06/07/14; BJ-7 decline) — W-DIALOG-DETENT's §3.2 residual listing of all three is corrected; merged public surface = `<DialogContent placement dismiss detents v-model:detent surface motion scroll>`.

---

## 1 · WHAT THE CHALLENGE CHANGED

| component | DAG row (warm start) | verdict Δ | ground/cure Δ | gates Δ | arithmetic Δ |
|---|---|---|---|---|---|
| drawer | 8 MERGE-INTO **sheet** | verb kept, **home overturned** → dialog/ | ASK-33 closed by *dissolution* not application; "4 leaves byte-identical" corrected to 2 of 4 | 2 born-RED minted | 874/624 → **940/558** (tokenizer-exact); Δ −1,096 |
| dialog | 13 SPLIT → dialog+sheet+`_shared/overlay` | SPLIT+ABSORB; both DAG homes overturned (`_shared/overlay` not minted; sheet struck by this fold) | dismiss axis absorbs confirm+gate (F25 arithmetic-identical ×6); r16→24; stage/graded dead | 2 minted, 5 tests retired, net −3 | DAG 1072·676/309 **wrong on all three** (1059·700/285) |
| deck | 44 MOVE-TO `composables/deck/` | **OVERTURNED → DELETE** | zero-caller members around a clamp PagerDots computes; keyboard a live WCAG defect | — | 206 → 202+75 README |
| pager-dots | 16 KEEP "correct-as-is" | register kept, **indicator GREENFIELDED** | the `01310c9c` ratification overturned — happy-dom stub cannot see a pixel; SVG goo filter deleted (canon-forbidden) | 5 born-RED | 1350ms vs 0.22s register; drift 8px |
| carousel | 24 KEEP-THIN | **RATIFIED** — and it GROWS (+4 code) | a11y census 5/0/0 roots; reactivity freeze; never gated on LOC | shares the 5 | 490 confirmed |
| sortable-list | 12 KEEP-THIN "unchanged, flattened" | grain ratified, **"unchanged" overturned** — surface+motion greenfield | F13 NOT discharged by `1be91765` (demo-only commit, verified); lift kit never rendered (D1) | 14 minted (trimmed by this fold, §5) | 1140→1128; 17% comment stands |
| search | 20 SPLIT | **RATIFIED** (verdict + both homes) | ground amended: matcher CRIT (nulls present matches — re-derived thrice), SFC 51% dead plate | 5 minted | DAG 410/76 matched exactly |
| tags-input | 31 KEEP-THIN "correct-as-is" | verb kept, ground refuted ×20 defects; **CWT O-5 demote STRUCK** (self-refuting vs CWT:1262) | subpath granted; ItemDelete folds to Chip | 14 minted (trimmed, §5) | 308 per-file exact |
| fourier-field | 4 KEEP-THIN "correct-as-is" | verb kept; ground + "0 cons" overturned (slides ×2 mounts, verified thrice); GL arm dies | black cel 15.06:1; N lies 4 ways; parity sworn 4× false | 8 minted | DAG code understates by 207 |
| constellation | 5 KEEP-THIN "0 consumers" | verb kept; consumers overturned (slides 6+3 imports); scope 2.4× the DAG's ~130 | well repaired (6 lines) not lensed; G-band dies (declined asks) | 5 minted | 2,442 (DAG 10 over); −825 |

**The finding the table forces:** zero of ten components pure-ratified. The DAG's **verdict column survived 8/10** (deck flipped, drawer's home flipped); its **ground column survived ~1/10**. The DAG measured LOC and imports and cannot see paint — three specs state this independently and every "correct-as-is" ground died to a pixel measurement. The two near-ratifications (search, carousel) are **credible, not lazy**: search's SPLIT survived only alongside a new CRIT the DAG couldn't see, independently re-derived by the adjudicator; carousel's KEEP-THIN survived a 3-seat live a11y census that grew the component. Treat the remaining 44 DAG rows accordingly: trust the verb, re-derive the ground.

## 2 · COLLISIONS — one owning wave per file per cut

| file / seam | OWNER | others consume |
|---|---|---|
| `dialog/DialogContent.vue` + `dialog/styles.css` | **W-DIALOG** (cut 1) | W-DIALOG-DETENT lands after (detents props/engine); FM W7 + PROPORTION A6 inside/after, never beside |
| `dialog/placement.css` | **W-DIALOG-DETENT** (cut 2) — re-keyed `[data-placement]`, inherits shipped FORM-1 halo | MATERIAL/W-FROST keeps library-wide swap authority (both specs concur: no landing block) |
| `sheet/` — NOT MINTED (headline ruling) | — | W-DIALOG's SheetContent/`sheet/styles.css` struck; handoff numbers → W-DIALOG-DETENT |
| `ModalOverlay.vue:83` backdrop-filter + scrim α | **MOTION-CANON §9 / K9** | both dialog-family specs contribute measurements only, mint no α — converged |
| `springPresets.ts` + `scheme-spring.css` | **W-SPRING-RETUNE / W-MOTION** | 6 specs read-only, ALL converged on the same discipline: bind by name, re-read at land, never a remembered literal. W-PAGER lands AFTER or re-reads; deck story's `--spring-smooth` refs booked LIVE for its census |
| `chip/` (Chip.vue, chipVariants.ts:8, glass-chip.css) | **W-CHIP — NO TERMINAL SPEC EXISTS** | W-TAGS-FIELD's ItemDelete fold is hard-gated on it (contingency declared: keep local delete, take X5/X12/X16). **This is the batch's only unowned blocking dependency → rank 1 in §7** |
| `_shared/field/field-control.css` | **field-register wave (B-15/MID-D2)** | W-DIALOG surgically deletes `:46-48` only (its concentric cure — sequencing declared); W-TAGS routes `:12,15,16,68`; W-SEARCH refused the merge (would de-glass the one frosted field) and routes the register verdict |
| search↔dock (`.input-bar`, `dock/styles/search.css`, `useDockSearch.ts:53`, `dock-search.vue`) | **W-SEARCH authors `[data-search-bar]`/`[data-search-field]`**; W-DOCK consumes, one sequenced cut | `close()` wipe decision + `--dock-search-field-gap` orphan → W-DOCK |
| fourier↔constellation | **no byte collision** (checked per brief): fourier is WGPU via `webgpu/useGpuSubstrate.ts:51` (DUAL-ENGINE BAND's file, blocking precondition + fallback specified); constellation is Canvas2D (`useCanvas2D.ts` → canvas2d wave, R1) | `pointerFieldMappings.ts`: W-FOURIER is sole editor (cuts the `FOURIER_*` arm); constellation reads `:253` only — declared |
| `tests/public-surface.spec.ts` | **W-GATE-COLLAPSE (C-9)** — one batched re-pin | 6 specs contribute rows (−drawer −deck +tags-input +constellation-pin, search widen, fourier drops) — all converged on the batch-owner, no fork |
| `package.json` exports map | **W-DAG-REDUCE / packaging wave** — one reshape cut | −`./drawer` −`./deck` +`./tags-input`, subpath-parity ×10, style condition (constellation R2) |
| `tests/components/custom/**` (16 phantom dirs) | **test-tree isomorphism wave** | each spec deletes ONLY its own dir (deck, and moves for its component) — converged, no double-delete |
| A1 focus-ring grammar | **A1 global wave** | sortable, search, tags each ship the IDENTICAL grammar locally meanwhile (`outline 2px @0.48` + `0 0 8px @0.15`, offset 2) — verified no fork across the three |
| `.sr-only` mint | **W-TIMELINE / W-A11Y — whichever lands first** | sortable, tags, dialog consume; declared in all three |
| `radius.css` | **W-RADIUS-ROLE (O-7)** | W-DIALOG deletes `:22` row; W-TAGS G-T14 pins `@theme static` survival through the dissolution |
| `demo/stories/substrates/fourier-field.vue:363` | **W-TIMELINE** (scrubber→Slider) | W-FOURIER adds celGain/squashGain knobs same file — coordinate, declared |
| consumer addenda (atlas `./deck`; slides colorResolver/`variant`/palette-narrow) | **the consumers' tranches, marked addenda** | uniform compliance with the consumer-updates ruling across all specs |

Search/tags shared-field check (per brief): no collision — both stay on the field register, both route its repair to B-15, and search's refusal to fold into `.field-control` is evidence-grounded (target computes `backdrop-filter: none` ×14). Carousel/deck collapse check: refused with falsifier (ROUND-1:278 rejected), deck deleted instead — clean.

## 3 · CANONICAL-SERIES COMPLIANCE

Every spec's box values audited against `PROPORTION.md`. Lawful (law named in-spec, spot-checked): all pad/gap/radius/ink across the eight — 24/20/12/8/4 ladders, pairing law `pad = r − 4` applied identically by three specs, seam/edge/perimeter 0.08/0.16/0.48, fill 0.05/0.12/0.16, type on φ^(1/4) rungs (14.63/16.50/18.608/23.67), 44 coarse (A6), 24 hit cell (WCAG 2.5.8, named), pitch 28 (= cell+gap, derived), grip 32, lift 1.04 (canon PRESS-swell), fourier cel α 0.16 (fill rung top), stroke ratio 2.5× (≥1.5 rung law, stated extension). Canvas mark-field geometry declared exempt with reasoning (constellation §3.7, fourier) — accepted. Measurement-set values (pager τ_e, `CAROUSEL_WEIGHTY_DURATION`) declared "π sets it, the number moves not the bar" — compliant by construction.

**Minted outside the series, no named law — each a defect until lawed:**

| spec | value | disposition |
|---|---|---|
| W-SORTABLE | **400ms** activation hold | no canon rung for hold durations; law it at MOTION-CANON (long-press rung) or derive; the 8px slop half is lawful |
| W-SEARCH | glyph sheen **α ≤0.10**, **~7s** loop | 0.10 is not a fill rung — move to ≤0.12 or name the ambient-carrier law; 7s needs a tempo derivation (`--motion-tempo` multiple) |
| W-TAGS-FIELD | DEATH clock **0.7×** entry | exit-led factor has no canon name; either canon mints the exit ratio once or the value is struck to the canon exit rule |
| W-FOURIER | hue sweep **±0.35 rad** | bounded by a stated constraint ("never exits the identity hue family") but the coefficient is bare — the constraint is the law, the coefficient should be derived from it or gated not minted |
| W-DIALOG | title lh 1.50 at rung +2 | already self-routed to PROPORTION ADJ-2 — correct handling, listed for completeness |

Also ratified: the PROPORTION §1.1 row-label erratum (labels shifted one rung vs the pairing law) was independently hit by BOTH dialog-family specs and routed identically to the PROPORTION owner — one drafting correction, two witnesses.

## 4 · DELETION LEDGER

| spec | net src Δ | of which comment | whole-file deaths | ground |
|---|---|---|---|---|
| W-DIALOG-DETENT (drawer) | **−1,096** | −498 | `drawer/` entire (12 files, 1,613) | superfluity — cannot open/close itself; residue = detents engine + 2 props |
| W-DIALOG (beyond the merge; sheet-relocation −298 VOIDED by headline ruling — those lines stay in `dialog/` under placement) | **≈ −256** (−385 strikes +129 adds) | −90 | Trigger/Close, stageContext, 2 demo stories (−466 demo) | stage 0 receivers; graded sign-inverted; vacuous wrappers |
| W-PAGER | **−493** raw (−214 code-only) | −70 | `deck/` pkg+README+test, `constants.ts`, SVG filter apparatus | deck vacuity; filter canon-forbidden for 1–2px yield |
| W-SORTABLE | **−178** (−356/+180) | ~−142 | `transitionTiming.ts`, `touchGate.ts`, radius-hunt test | lying filenames, never-rendered lift kit, gold bar |
| W-SEARCH | **−86** | −59 | `searchVariants.ts`, recipe squat, 4 `--search-*` tokens, `search-custom.spec.ts` | 3 inert prop axes; dead cache/branches |
| W-TAGS-FIELD | **−67** | **0** (100% code) | `ItemDelete.vue`, `ItemText.vue` | forked remove register vs Chip |
| W-FOURIER | **−706** (fallback −20 if band declines) | ~−155 | GL arm (glSetup 403 + glsl 242), `WARM_IDENTITY_PALETTE` | masking fallback swearing false parity; dead surface |
| W-CONSTELLATION | **−825** | **−477 (58% — stated as a comment cull by the spec itself)** | `createConstellationField.ts`, `constellationWell.ts` (folded), G-band | declined asks built anyway; phantom tokens |
| **SUM (src)** | **≈ −3,707** | **≈ −1,491 (40%)** | ≈ 24 files/dirs | code deletion ≈ −2,216 |

Plus: demo ≈ −430 net (dialog −466, deck story −34, tags +68 owed cels); READMEs ≈ −415 (constellation −381, fourier −35); tests ≈ −650 retired/deleted (deck 55, dialog 5 files, search spec, sortable radius test), remainder relocated not deleted — relocations (search composables ≈431 cross a zone boundary) are booked as moves per the specs' own honesty lines, never as cuts. Honesty roll-up: **40% of the batch's line reduction is comment cull, and every spec that leans on it says so in its own LOC field** — the discipline held; no spec inflates.

## 5 · GATE BUDGET

Minted: drawer 2 · dialog 2 (−5 retired tests, net −3) · pager 5 · sortable 14 · search 5 · tags 14 · fourier 8 · constellation 5 = **55 local gates from tier-2 alone** — against the USER-MANDATED library-wide collapse to ~40–60, this batch alone consumes the whole budget. Every spec already struck its own tautologies (file-absence, comment-ratio, grep-on-deleted-names, gates that green on a broken tree) — nothing in the batch *cannot fail* as written; the problem is proportion, not validity. **FOLD RULING — four shared registers absorb the duplicated classes:**

| fold into | absorbs | Δ |
|---|---|---|
| ONE tranche-wide PROPORTION invariant (per-component rows) | sortable G-8, tags G-T11, dialog G-DLG-ROOM's series clauses (its viewport/behavioural clauses stay), pager π14's gate-shaped half | −4 |
| ONE A6 target-size gate | sortable G-6, tags P9's gate half, pager coarse-floor clause, dialog ✕-44 clause | −3 |
| W-GATE-COLLAPSE public-surface re-pin | tags G-T13, constellation G-CON-SURFACE-GRAIN clause (c), search's fold rows | −2 |
| W-FROST receiver matrix | sortable G-14, search plateless-frost row, tags P10 (already KNOWN-RED fenced) | −2 |

Post-fold: **≈ 44 local + 4 shared registers.** Additionally ratified as correctly routed, not local: G-NO-DEAD-REGISTER (drawer → W-GATE-COLLAPSE), G-SHEET-CONGEAL→π, sortable G-5 valid only paired with G-2 (spec says so itself). Tags G-T14 is regression-not-born-RED and says so — kept (F12's own row). The two spec-declared measurement-set numbers (τ_e, weighty-duration) are bars that move the number, not gates — correctly excluded from the count.

## 6 · OWNER ROWS DISCHARGED

| row | status after this batch |
|---|---|
| **F12** tags-input rounding | **CLOSED** (verified at HEAD ×3 engines) + gated G-T14; the design finding it stood for (X2 invisible boundary) cured in-wave |
| **F13** sortable horizontal | **CLOSED on land** — π receipt ≥60% row ink at 1440 AND 1920; `1be91765` demo-only discharge struck |
| **F17** search rounding | **CLOSED on land** — the pill was rounded AND invisible (1.0003:1); closes at the ≥3:1 π row |
| **F25** confirm ≡ dialog | **CLOSED** — dismiss axis; both stories deleted with git-rm receipts (P12) |
| **F33** deck vs carousel + dots | **CLOSED** — deck deleted; worm greenfielded; goo-morph edict intact on translate+scale |
| **F45** gate-pattern rounding | **CLOSED for the named artifact** (story deleted, concentric fix); compositions-section prune → W-DAG-REDUCE |
| ASK-33 (drawer side ladders) | **CLOSED by dissolution** — ratification must say superseded, not applied |
| CWT **O-5** (tags demote) | **OVERTURNED** — struck on three grounds incl. CWT's own :1262 |
| ROUND-1: D11 (fourier a11y) · A11Y-1 (sortable Space steal) · A11Y-3 (carousel) · PERF W2 (readPx) · K22 (sheet route) · DAG:300 (command ✕) | **CLOSED/discharged** by W-FOURIER · W-SORTABLE · W-PAGER · W-PAGER (owns the file this cut) · W-DIALOG-DETENT · W-DIALOG (`dismiss="deliberate"`) |
| **F48** hierarchy/blur/rounding | TOUCHED — dialog r24 = 1.5×card closes the dialog clause; framework-wide → W-FROST/W-RADIUS-ROLE |
| **F20** toast ≡ dialog | TOUCHED — dialog side protected (P14 entrance byte-unchanged regression); toast re-point is W-TOAST's (tier-1) |
| A01/A11 breath · A10 aristotelian both directions | TOUCHED — all 8 specs discharge floors locally (no idle-loop violations minted; carousel/tags GROW where owed); library-wide standing checks remain |
| A05 DAG reduction · CT-1 (19 failing subpaths) | TOUCHED — deck+drawer gone, subpath set shrinks by 2, parity ×10 routed; CT-1 not discharged |

## 7 · WHAT REMAINS — 44 of 62 without a terminal spec

Done: tier-1 (aurora, dock, timeline, handmark, tabs, alert, toast, slider) + this batch (drawer, dialog, carousel, deck, pager-dots, sortable-list, search, tags-input, fourier-field, constellation) = 18.

**Rank for tier-3** (blocking dependencies first, then LOC×defect-pressure×owner-rows):

1. **chip** — the batch's only unowned HARD BLOCKER (W-TAGS-FIELD's ItemDelete fold gates on it; X2-edge, pad 8, ✕ A6, `:disabled` parity, accent-tone move, italic mapping all routed to it).
2. **blob** (5,573) — largest unspecced; A12 greenfield edict; co-decides the DUAL-ENGINE BAND question W-FOURIER's −645 blocks on.
3. **surface** (SPLIT, fan-in 12+) — W-SEARCH banked its veil RED baseline to W-SURFACE; blocks card/header-ribbon.
4. **command** — landed-dialog consumer (`dismiss="deliberate"` set; GRAPH-RULINGS:190 CSS inversion + `dialogContext` defect open); sequence right after W-DIALOG.
5. **expandable-container** — MERGE-INTO dialog; W-DIALOG ships only the origin-rect seam; row 37 must land the fold or the seam is a dangling prop-hole.
6. **dropdown-menu→menu + popover + select** — the dock-cluster dissolution trio (`_shared/overlay`, PART_PAIRS adoption, 3-arms→1, ScrollButton dedupe); F50 experiments ride popover.
7. **control chassis: checkbox·switch·radio-group·toggle-group** — one wave (CWT §7.4's fold; D12 insufficiency: missing `size`/`invalid`).
8. **easing + configurator** — F31 (modularize curve component, EasingConfigurator delete) + F09 (cramped configurators, audited-all edict).
9. **metric + instrument-chassis + completion-seal** — F18/F26 removal asks + CFR-01 shape report; user-question-bearing (reduction questions relayed per F04).
10. **progress + scroll-progress-rim** — F21/F22/F23 dedup family against landed W-SLIDER.
11. **card + table/data-table/skeleton** — F46 double-card (surface-dependent) + table SPLIT.
12. Long tail, batch as 2–3 cluster waves: typewriter, labeled-field (SPLIT), watercolor-dot, status-dot, fading-scroll, infinite-scroll (F15 reset button), collapsible, avatar, badge, separator, label, input, textarea, number-field, button, accordion, tooltip, dark-mode-toggle, header-ribbon, animated-digit — mostly KEEP verdicts; per §1's finding, trust the verb, re-derive the ground with one paint pass each.
13. **paper-backdrop** — DELETE stands; rides W-DAG-REDUCE, needs no spec.

Composition gaps re-confirmed from CWT §8, still unowned by any cut: **W-A11Y** and **W-DISSOLVE** absent from both tiers; **W-HAIRLINE** (O-12) still a new-row orphan — schedule beside tier-3 or the routed rows in this batch (`.sr-only`, `aria-modal`, nested-modal rank) have no landing site.
