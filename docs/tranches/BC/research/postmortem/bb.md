# BB post-mortem — the source-green / visually-broken tranche that NEVER CLOSED

**Forensic agent: BC iteration 1c. READ-ONLY static forensics. Tranche: BB.**
**Verdict in one line: BB shipped 7 build rounds of rich, gate-green source — and then the close batch (5/6/7) never executed, so the SINGLE wave that would have verified painted truth (W-REFLECT3) never ran. Every headline visual wave deferred its binding paint-check to that one wave. The result: ~33 commits born-RED→GREEN with master CI green, and a live demo the user calls "destroyed."**

---

## 0. The state of BB at HEAD (the smoking gun, established by artifact)

| fact | evidence |
|---|---|
| BB has NO `FINAL.md` | `ls docs/tranches/BB/FINAL.md` → absent |
| W-REFLECT3 never ran | `scripts/wf-bb-reflect.js` absent; `docs/tranches/BB/audit/reflect/` does not exist; ZERO `*-{desktop,mobile}-full.png` fresh BB captures |
| W-CLOSE never ran | `package.json` version = `4.0.1` (a BC dist-comment hotfix `2935609d`), NOT the planned BB `4.1.0` cut; no MIGRATION 4.1.0 rows; no disposition re-stamp; no `npm publish` |
| Batches 5/6/7 PENDING | TaskList #266 (Batch 5), #267 (Batch 6), #268 (Batch 7) all `[pending]` |
| Last BB commit = `c08c03d0` ("BB round 7 — W-CARVE5 + W-LINEAGE-PROBE + W-DOC-FRESHEN") | the NEXT commit `e1b4b44c` is already `BC.W-AUDIT pre-fix`; there is no W-REFLECT3 or W-CLOSE commit between them |
| The gestalt roster is FROZEN at BA's close | `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` = 9 lines (8 BA surfaces + header), verdicts `dock`/`shell` = **FAIL**, the other six **PASS** — all pointing at BA-era `*-desktop-full.png`; the BB primitives (border-progress/deck/dock-morph-family/on-glass-fg) the roster was MANDATED to grow to were NEVER added |
| The roster cells literally narrate the un-run flip | dock/shell cells end: *"W-REFLECT3 (Batch 7) re-earns the PASS on a fresh content+dimension+freshness-verified chipOverMain:false capture"* — a flip that never happened |

This is the **single-terminal-reflect deferral**, executed at the worst possible scale: an ENTIRE tranche's painted-truth verification was concentrated into ONE wave at the very end, and that wave was the one that got cut when execution stopped.

---

## 1. The architecture that made the disease inevitable (the gate-paint split)

BB's authors KNEW the lesson. Every gate note and PROGRESS row carries the correct doctrine verbatim:

- *"The PAINTED render … is the π arm … rides W-REFLECT3"* (proof:lensing note, gates.mjs:1216)
- *"per-mechanism greens do NOT close a visual wave (BB inv-4 — the AZ P-1 close-class fix)"* (proof:scroll-motion note, gates.mjs:1204)
- *"the BINDING painted truth is tests-visual/X.spec.ts + the proof:ba-gestalt verdict … rides W-REFLECT3"* (repeated across W-LENSING, W-METAL-SHIMMER, W-LIQUID-REVEAL, W-DEEP-GLASS, W-CARD-TIER-ALPHA, W-DESKTOP-RESERVE, W-BUTTON-GLASS, W-PRESS-UNIFY, W-SCROLL-MOTION, …)

They split each visual wave into TWO oracles:
1. a **device-free SOURCE gate** (`proof:X`, comment-strip pure-detector, born-RED→GREEN) — the MECHANISM is present in source.
2. a **π readback + a `proof:ba-gestalt` verdict** — the PAINT is correct on a real GPU.

Oracle (1) ran in CI on every commit and went green. Oracle (2) was **universally deferred to W-REFLECT3** — and W-REFLECT3 was the LAST wave, and it never ran. So every wave closed `complete` on oracle (1) ALONE, which the authors' own doctrine says is forbidden ("per-mechanism greens do NOT close a visual wave"). The doctrine was correct; the SEQUENCING made it unenforceable — the enforcer was downstream of where execution stopped.

### Why the gestalt gate couldn't catch it (the THREE structural blind spots)

`proof:ba-gestalt` was meant to be the safety net. It failed three ways at once:

- **It is `tags: ["release"]` only** — it NEVER runs in `--run ci` (the mid-tranche battery). So across all 7 build rounds, the close oracle was simply not invoked. It would only fire at the release cut (W-CLOSE), which never came.
- **It is a markdown-verdict gate over STALE captures.** It reads the roster ledger's `PASS`/`FAIL` cells, which are author-written prose, and (pre-W-GESTALT-GATE2) only `existsSync + size>0` the desktop PNGs. The six `PASS` surfaces (aurora, glass-feedback, dark-register, motion-fourier, configurators-goo, cross-repo) were `PASS` on **BA-era captures taken before the entire BB build batch touched their painting sources.** A tranche of source mutation flowed over six "PASS" surfaces and the gate could not see it — the captures were frozen.
- **W-REFLECT3 is the SINGLE AUTHORIZED VERDICT-FLIPPER** (per its own spec + the roster header). No other wave may flip a cell. So even if a build wave broke a surface, it was STRUCTURALLY FORBIDDEN from flipping the roster to FAIL — only the un-run terminal wave could. The verdicts were write-locked to a wave that never executed.

W-GESTALT-GATE2 (Batch 1) DID harden the gate (IHDR dimension + the 16 mobile reads + the surface-hash freshness clause). But hardening the JUDGE does nothing when the TRIAL (W-REFLECT3) never convenes. The hardened gate sat release-only, judging a frozen roster, waiting for a flipper that never came.

---

## 2. The headline visual waves — the three-way diagnosis

For each: **BUILT** (real source landed?) / **CLAIMED** (what PROGRESS/the gate asserts) / **PAINTED** (did it render right on the live demo, per BC.DEFECT-LEDGER + USER-DEFECTS + LIVE-GROUNDING).

### W-DARK-MATERIAL / the glass identity → **BUILT-NOT-PAINTED** (the flagship regression)
- **BUILT**: yes. The adaptive self-engage rules exist (`glass/ladder.css:212` `:where(.glass-floating,.glass-overlay)`, `dock/morph.css:428` `:where(.glass-dock)`), the `--glass-tint-strength-aa` (20%) and `-floor` (4%) tokens, the dark-arm companions. The mechanism is real.
- **CLAIMED**: `proof:dark-material` + `proof:adaptive-glass` GREEN; the "luminous-dark transmissive material" + "self-engage legibility floor."
- **PAINTED**: **BROKEN.** BC.LIVE-GROUNDING: `.glass-dock` resolved to `color(srgb 0.625 0.613 0.599 / 0.536)` — flat desaturated GREY, not warm cream; `.glass-floating` = `oklab(0.798 0.002 0.006 / 0.84)` — L0.80, ~zero chroma, near-opaque. ROOT: the dock+overlay band re-point `--glass-tint-strength` → `-aa` (20%) **UNCONDITIONALLY** and mix the plate `in oklab` toward the dark warm-ink → it darkens (L0.95→0.80) AND desaturates (warm→grey) over the common light backdrop. **USER-DEFECT D1: "glass too dark + grey (major regression)."**
- **THE GATE-BLINDNESS**: `proof:adaptive-glass` passes on BOTH the grey-broken state AND a fixed state — it asserts the RULES EXIST (the self-engage `:where()` selectors, the token wiring), never the COMPOSITED PIXEL. The decorative-observer is the smoking gun: `useGlassBackdropLuminance.ts:311` WRITES `--glass-backdrop-luma`, `glass-fx.css:123` DECLARES it — and **NO CSS rule READS it for tint strength** (grep confirms: 3 files touch the token, all write/declare, zero read it into the tint). The observer loop is OPEN; the "dynamic iOS-27 darkening" is decorative. The gate green'd on the wiring; the paint stayed grey.

### W-DOCK-MORPH-FAMILY + the rail → **BUILT-NOT-PAINTED** (the white-morph + Safari flash)
- **BUILT**: yes. The compositor-transform morph is real (`dock/layers.css:59-92` — `inline-size: var(--dock-morph-to)` reserves the settled footprint, `transform: scaleX(var(--dock-morph-scale))` over it, `will-change: transform`, the `to:0` guard `max(--dock-morph-to, 1px)`). `dockMorphContext.ts`/`dockMorphMeasure.ts` carved + DOCK_SPRING byte-fenced. F1-F6 + self-test.
- **CLAIMED**: `proof:dock-morph-family` born-RED 20→GREEN; *"compositor TRANSFORM over a reserved settled footprint (CDP Layout flat) + the synchronous PRM seat … the 10×74 sliver gone"*; status **complete**.
- **PAINTED**: **BROKEN.** USER-DEFECTS A: */dock/overview* "TOTALLY broken, blurry, a mess"; "ALL dock animations broken + STUTTER"; "the liquid morph turns WHITE/invisible"; "the ENTIRE vertical dock is broken + NOT CLICKABLE." BC.DEFECT-LEDGER D5: *"(a) the box-size V↔H morph goes white; (b) Safari: `WebGL: context lost` + the morph re-render churn = the flash; the morph is not compositor-stable cross-engine."* The `to:0` guard mitigates ratio div-by-zero but `inline-size: var(--dock-morph-to)` resolving to `0` (when the BA-VJS-1 nested measure mis-orders → `to:0`) still reserves a zero-width box → the white/invisible morph the user reports.
- **THE GATE-BLINDNESS**: the SOURCE gate asserts the CSS mechanism (the scale calc, the reserve, the will-change); the PROGRESS row says *"π tests-visual/dock-morph-family.spec.ts **rides W-REFLECT3**."* The CDP-Layout-flat trace, the complete-at-every-frame series, the cross-engine Safari stability — ALL deferred to the un-run wave. No gate ever opened Safari; the WebGL context-loss morph-flash (D7/H) was never in the headless CI surface.

### The liquid-glass band — W-LIQUID-REVEAL / W-LENSING / W-LIQUIDHOVER / W-BUTTON-GLASS → **BUILT-NOT-PAINTED (band-wide)**
- **BUILT**: yes, extensively. `useLiquidReveal.ts` (kf ElementMorph + springTimingFunction), `.glass-reveal` recipe, 11 overlays re-pointed off popover-animate; `.glass-lens` squircle bevel map + `useSpecularPointer`; the `createSpecularWriter` single-source + `vSpecular`; Button glass-tinted fills + `useSpringPress`→`useLiquidFlex`. All real.
- **CLAIMED**: `proof:liquid-reveal` (26→GREEN), `proof:lensing` (L1-L6 GREEN), `proof:button-glass` (12→GREEN), `proof:press-unify` (P1-P4 GREEN). All **complete**.
- **PAINTED**: **BROKEN / UNVERIFIED.** USER-DEFECTS D: *"The glass dialog is NO different + not glassy at all — GLASS must be partially transparent"*; *"Increase glass-morphism for buttons"*; *"iOS-27 = increased glass-morphism WHILE increasing legibility."* The whole band rides ON TOP of the D1 grey-glass regression — a "bloom-from-source" reveal blooming a GREY opaque plate is the wrong gestalt regardless of the spring curve. Every one of these four waves' PROGRESS rows ends *"π … rides W-REFLECT3"* and *"the proof:ba-gestalt glass/CTA verdict (BB inv-4 — per-mechanism greens do NOT close a visual wave)."* The binding verifier never ran. The §0-DRIFT notes even confess the band landed out-of-order (W-BUTTON-GLASS consumed `.glass-refract` because W-LENSING hadn't landed yet; W-LENSING then renamed it `.glass-lens` — a rename the button wave's source still had to be reconciled against, a reconciliation only a live re-walk would catch).

### W-TABS / the drag-morph → **BUILT-NOT-PAINTED** (not-liquid, not-pill)
- **BUILT**: yes. SegmentedTabs ONE-engine/TWO-materials, the `useDragMorph` pull primitive (kf Draggable + SpringProgress + useLiquidFlex), the roving-tabindex, the center-anchored indicator. `proof:tabs-std` carries a fail-CLOSED π LIVE arm (the rare wave with an in-CI live check).
- **CLAIMED**: `proof:tabs-std` GREEN, `proof:drag-morph` GREEN; the iOS-27 liquid-tab pull-morph-squish.
- **PAINTED**: **BROKEN.** USER-DEFECTS B (/navigation/tabs): *"Not to spec; NOT liquid glass at all"*; *"No proper PILL variant — must be PROPER SMALL PILLS, not squared"*; *"NOT reka/shadcn-like."* BC.DEFECT-LEDGER D4: *"the tab register paints flat … the dark-rim D2 also shows."* The tab plate reads as the grey-glass D1 register + the dark-rim D2 black-bar; the "glassy pill" is a squared flat fill. The drag-morph (the iOS-27 pull-to-current-location) is built but the user does not report it working — its π readback ("the drag frame-series follow/squish/fling") rides W-REFLECT3.

### The WebGPU-first viz suite — W-AURORA-WGPU / W-GOOBLOB-WGPU / W-FLOWFIELD / W-CONCENTRIC → **BUILT, PAINT-FRAGILE / UNVERIFIED-ON-HOST**
- **BUILT**: yes — substantially. `aurora.wgsl.ts` + `procedural-color.wgsl.ts` chunk; `metaball.wgsl.ts` (SDF + 2 fwidth + smin); `flow-field.compute.wgsl.ts` + `flowField.ts` single-math; `concentric.wgsl.ts`. `useGpuSubstrate` picker over `createCanvasLifecycle`. The parity table ΔE-0.0.
- **CLAIMED**: `proof:gpu-substrate-single` GREEN (parity rows verified, ΔE mean≤2.0/p99≤5.0); each viz wave **complete**; *"graceful WebGL2 fallback."*
- **PAINTED**: **FRAGILE + UN-PROVEN ON A REAL HOST.** BC.DEFECT-LEDGER D8: *"the WebGPU substrate ERRORS instead of falling back"* — `useWebGPUCanvas.ts:245` `throw new Error("[useWebGPUCanvas] no GPU adapter")` fires `PAGEERROR` on every adapter-less host (the common case). The honest CORRECTION in the ledger walks it back (the viz DO paint WITH a GPU + `--use-gl=angle`), but D8' stands: *"the WebGPU no-adapter path is NOISY + not-clean … the structural-proxy ΔE-0.0 parity NEVER proved the WGSL path paints on a real WebGPU host (only that the SAME CPU evaluator matches itself)."* D9': the user observed aurora as a **BLACK VOID** on real Chrome (screenshot 23.57.17). USER-DEFECTS E: */substrates/aurora* "TOTALLY broken, renders SLOW, previews NEVER render"; /blob* "does not meatball, does not render at all"; /constellation* "circles supremely LOW-RES"; /dot-flow-field* "absolutely awful — a mess of NOISE"; /concentric* "awful."
- **THE GATE-BLINDNESS** (the worst case): `proof:flow-field` asserts the FALLBACK FILE EXISTS (`scripts/proof-flow-field.mjs:134` "the fallback path exists" → checks `shaders/flow-field.glsl.ts` is present) and the parity table has a row — it NEVER asserts the viz PAINTS `meanLum > 0` on an adapter-less host. The "parity" is a structural proxy (the CPU evaluator vs itself), so ΔE-0.0 is tautological — it proves the math matches the math, NOT that the GPU emits pixels. A WGSL path that crashes the canvas passes the gate. **This is gate-paint-blindness in its purest form: the gate measures source presence + self-consistency, never the rendered surface.**

### W-PRESS-UNIFY → **BUILT-NOT-PAINTED**
- **BUILT**: yes. `useLiquidPress` factored, Button (direct) + Card (`:pressable`) the two binaries, the `--*-press-t` drive, PRM-instant. **CLAIMED** P1-P4 GREEN. **PAINTED** unverified — *"π tests-visual/press-unify.spec.ts (coupled/ABSORB/PRM/compositor … rides W-REFLECT3)."* USER-DEFECTS F: *"Controls are super laggy."* The interruptible-spring-press's binding frame-series (the mid-flight ABSORB) never ran live.

### W-CARD-COMPOSITE / W-SCROLL-CARD → **BUILT, PAINT-UNVERIFIED**
- **BUILT**: yes. The CLS-1.03 layout-animation rewrite to compositor-transform (`<CardHeader shrink>` padding→translateY, font-size→scale, grid-track→scaleY); `<ScrollCard>`/`<ScrollCardHeader>` + the `:slotted([data-slot])` idiom; `proof:no-layout-animation` extended to scan the whole keyframe + transition + `<Transition>` corpus.
- **CLAIMED**: `proof:no-layout-animation` GREEN, CLS 0 on the live demo (W-CARD-COMPOSITE), the `:slotted` source-companion clause (W-SCROLL-CARD).
- **PAINTED**: UNVERIFIED at close. USER-DEFECTS C: *"EVERY PAGE must have an audacious, LARGE, hero-like header that SHRINKS as you scroll"* + *"ALL padding items wrong across pages."* The scroll-shrink mechanism is built; whether the gestalt (a hero shrinking smoothly without CLS, with correct padding) reads right was W-REFLECT3's read. The CLS≈0 claim has a real local capture for W-CARD-COMPOSITE, so this is the LEAST-broken of the band — but the page-build gestalt it serves was never re-walked.

### W-PHASE-PALETTE / W-INVALID-RING / W-CONTROL-TOKENS / W-EYEBROW-UNION / W-ON-GLASS-FG → **BUILT, PAINT-UNVERIFIED**
- These are token-register unifications (real source, real gates) whose binding π readbacks all "ride W-REFLECT3." W-CONTROL-TOKENS is relevant to USER-DEFECTS F (*"ALL radio buttons don't work"*; *"the dropdown dot is totally wrong + occluded"*) — the role-per-type radio semantics were BUILT (`ToggleGroup` `role=radiogroup`, `ToggleGroupItem` `role=radio`+`aria-checked`) but the user reports the interaction broken, so the binding-verification (the silent-no-op reka-binding class the MEMORY warns about) never caught the live break.

---

## 3. The masked-accretion backlog (the `--run ci` reds that rode along)

`docs/tranches/BB/audit/ci-red-census.md`: **18 ci-tagged gates carried reds** at BB's start (captured siblings-absent on master @ `855d2746`), and crucially `ci ⊂ local` (156 ⊂ 195) — so the BA close's `FINAL.md §3` claim of "`--run local` green" was **substantially false**. There are 215 ci-tagged gates total; 18 red. Batch-0 (W-CI-GREEN) was MANDATED to drain them. The integrity-sweep tasks (#280 "Integrity sweep — 19 cross-wave gate-drift reds") + per-round drift fixes ("6 drift fixes", "19 cross-wave gate-drift reds") show the team chasing a CONTINUOUS accretion of gate-drift through every round. This is the **masked-accretion** class: a tranche that adds 30+ gates per round generates cross-wave drift faster than a `--run ci` close (which the BA tranche never even honestly ran) can surface — and because the close that runs the FULL deduped union (`--run full`, W-CLOSE-BATTERY) only fires at W-CLOSE, the accretion was never reconciled before BB stopped. The reds were real, ci-tagged, and invisible to the per-round `complete` claims.

---

## 4. The failure classes (the BC Band 0 gate-redesign targets)

1. **single-terminal-reflect deferral** — the cardinal class. The ENTIRE tranche's painted-truth verification (every π readback + every gestalt verdict) was funneled into ONE terminal wave (W-REFLECT3) that never ran. Cited by: literally every visual wave's PROGRESS row ("rides W-REFLECT3"). FIX: paint-verify each wave AT its own close, never defer to a terminal wave; no wave closes `complete` without its own live capture.

2. **source-mechanism-gate-not-paint-gate** — the `proof:X` gates assert the MECHANISM is present in source (comment-strip pure-detectors), never that the surface PAINTS. Cited by: `proof:adaptive-glass` (passes on grey AND fixed), `proof:flow-field` (asserts the fallback FILE exists, never meanLum>0), `proof:dark-material`, `proof:lensing`, `proof:button-glass`. FIX: every visual gate must carry a binding on-host pixel assertion that runs IN the per-wave close battery, not release-only.

3. **gestalt-gate-is-release-only-over-stale-captures** — `proof:ba-gestalt` is `tags:["release"]` (never in `--run ci`), reads author-written PASS/FAIL prose, and (pre-hardening) only `existsSync`'d desktop PNGs frozen at the PREVIOUS tranche's close. Six "PASS" surfaces had a whole BB build batch flow over their painting sources untouched. FIX: the gestalt oracle runs mid-tranche, over FRESH captures, with the verdict mechanically derived from the live render, not prose.

4. **write-locked verdict / single-authorized-flipper deadlock** — only W-REFLECT3 may flip a roster verdict, so a build wave that BREAKS a surface is structurally forbidden from marking it FAIL; the break is invisible until the one flipper runs. Cited by: the dock/shell roster cells narrating an un-run flip. FIX: any wave that touches a roster surface's painting source AUTO-REVOKES its verdict to FAIL (capture goes stale → verdict reverts), forcing a re-walk before close.

5. **per-mechanism-π-cannot-verify-gestalt** — the doctrine the authors WROTE ("per-mechanism greens do NOT close a visual wave") was correct but unenforced because the enforcer (the gestalt verdict) was downstream of where execution stopped. The grey-glass is the proof: every adaptive-glass mechanism is green, the page reads grey.

6. **decorative-observer / open-loop dead-knob** — `--glass-backdrop-luma` is written + declared but read by NO tint rule (the iOS-27 dynamic-darkening is decorative). The substitution-vs-inheritance dead-knob class, recurring: a token is wired end-to-end on paper, dead in the cascade. FIX: a gate must prove the written token is READ by the rule it is supposed to drive.

7. **structural-proxy-parity-is-tautological** — the WebGPU ΔE-0.0 "parity" compares the CPU evaluator to itself, proving the math matches the math, never that the GPU emits pixels. A crashing WGSL canvas passes. FIX: parity must be a real GPU capture vs a real GPU capture, or at minimum a meanLum>0 on the target backend.

8. **headless-green / GPU-absent false-paint** — the no-adapter throw (`useWebGPUCanvas.ts:245`) + the headless probe reading a cleared buffer as false-black; cross-engine (Safari WebKit context-loss D7/H) never in the CI surface at all. FIX: a real-GPU + Safari capture lane in the binding battery.

9. **masked-accretion backlog** — 18 ci-tagged reds rode along because the FULL-union close (`--run full`) only fires at the un-run W-CLOSE; per-round `complete` claims never ran the union. `ci ⊂ local` made "--run local green" a false claim. FIX: the full deduped union runs siblings-absent at EVERY round close, not only at the terminal cut (W-CLOSE-BATTERY's rule applied per-round).

10. **close-class-lie (inherited, recurring)** — BA closed `complete` claiming "--run local green" while ci ⊂ local carried 18 reds; BB inherited it and the SAME class recurs (every visual wave `complete` on source-green over a broken paint). The disease is generational.

---

## 5. What went RIGHT (preserve in BC — do NOT re-litigate)

1. **The build SOURCE genuinely landed.** This is not a claimed-not-built tranche. The dock-morph compositor rewrite, the liquid-glass primitives (useLiquidReveal/useLensing/useSpringPress/useLiquidFlex/useDragMorph), the WGSL viz (aurora/metaball/flow-field/concentric), the canvas-lifecycle unification (3 backends over ONE leaf), the god-module carves (RATCHET drained to ∅ twice), the token unifications (W-INVALID-RING/W-CONTROL-TOKENS/W-EYEBROW-UNION/W-ON-GLASS-FG/W-CARD-TIER-ALPHA), the card-padding golden ladder — all real, all in `src/`. BC re-paints; it does not re-build from zero. BC.DEFECT-LEDGER's own correction: *"The viz architecture is sound; the robustness + the cross-engine + the on-host-verify are the gaps."*

2. **The doctrine was correctly authored.** "per-mechanism greens do NOT close a visual wave," "the binding painted truth rides the π arm," BB inv-4. The PRINCIPLE is right; only the SEQUENCING (deferral to a terminal wave) broke it. BC keeps the doctrine, fixes the sequencing.

3. **The Batch-0 integrity diagnosis was honest + correct.** `ci-red-census.md` openly states the BA close was "substantially over-claimed" and `ci ⊂ local`. W-CLOSE-BATTERY (the `--run full` siblings-absent rule), W-LEDGER-REPAIR (the column-by-header parser fixing the silent 0-row parse), W-GESTALT-GATE2 (the IHDR + mobile + freshness hardening), W-VISUAL-RUNNER (the ~93 π-spec runner) are all the RIGHT structural fixes — they just landed upstream of a close that never ran. BC inherits these; they are load-bearing.

4. **The architecture transpositions are clean.** The canvas-lifecycle single-source (no two-copy fork), the GL-shader fence held (aurora.frag/metaball.frag byte-untouched), DOCK_SPRING byte-fenced, the no-god-module ratchet at ∅. The structural elegance is real and worth preserving.

5. **The clean-break discipline held.** No back-compat aliases (popover-animate retired, vaul-vue abrogated, `--card-spacing` gone, `.scroll-fade-*` retired, gold-shimmer-slide retired). The library's identity-evolution discipline is intact — BC builds on a clean surface, not an alias-laden one.

6. **The W-AURORA-SWRASTER fallback ground is genuinely tested on-host** — `proof:aurora-swraster` carries a REAL headless luminance band (Δmean 0.0010 vs the flat gradient's 0.1328) with no `--use-gl=angle` dependency. This is the ONE viz-band gate that actually measures painted pixels; it is the model BC should generalize to the whole viz suite.

---

## 6. The one-sentence root cause for BC Band 0

**BB proved that a tranche can be 100% source-green, gate-green, and master-CI-green while shipping a destroyed live demo — because every binding paint-verifier (π readbacks + the gestalt verdict) was deferred to a SINGLE terminal wave (W-REFLECT3) that the execution stop cut, while the gestalt gate that should have caught it was release-only, write-locked to that same un-run wave, and judging captures frozen at the previous tranche's close.** BC Band 0 must make paint-verification per-wave + mid-tranche + mechanically-derived-from-the-live-render, never a terminal-wave deferral over author-prose verdicts.
