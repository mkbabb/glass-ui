# Tranche AP — Audit Lane EPSILON — Keystone Analysis

**Scope: AO closed v3.0.0 (staged) as an internal-correctness + self-measurement-truth + consumer-gap tranche. It folded the speedtest-AQ R0G-1..5. This lane asks what AP's keystone is — the single most valuable next move — and whether any substrate-promotion clears the binary gate now that the constellation has had a beat to move.**

Read-only on source/git. No source mutated, no git mutation. Builds on AO's EPSILON survey (which found "no ≥2-consumer pattern clears the gate") and re-tests it at HEAD = AO close.

---

## §0 — Headline recommendation (read this first)

**AP's headline is the two unaddressed late-surfaced speedtest-AQ items — R0G-6 (DockIconButton coarse-pointer 44px floor) + R0G-7 (motion-barrel split) — fused into a "finish the AQ consumer contract" tranche, with R0G-7's barrel carve as the architectural keystone.**

These are not new wishes. They are the **two AQ items AO did not fold.** AO folded R0G-1..5 (the five surfaced at AQ-open); R0G-6 and R0G-7 were measured *during* AQ R2 implementation — confirmed on the real built edge, not speculative — and arrived after AO had already cut its W3 consumer-gap wave. AO's FINAL routes both as "publisher-gated → glass-ui" residuals (`AO/FINAL.md` cross-repo perimeter; speedtest `AQ/FINAL.md` §2 carried-ledger). **They are the literal open end of the AO→AQ handshake.** A consumer measured a 40×40 tap target and a 125 KB keyframes engine on its eager boot graph, named the upstream fix, and is waiting on the publisher. That is the strongest possible keystone signal: real, measured, single-confirmed-consumer-with-named-acceptance-gate, and already owned by glass-ui's release loop.

Of the two, **R0G-7 (the motion-barrel split) is the architectural keystone** and R0G-6 (the dock floor) is the a11y-correctness companion that rides the same cut:

- **R0G-7 is a gestalt barrel carve, not a patch.** The `@mkbabb/glass-ui/motion` subpath is a *flat* barrel: importing any symbol from it — even `useIntersectionPause`, which touches zero keyframes — statically pulls `useAnimatedNumber`/`useSpringMount`, which `import { NumericAnimation } from "@mkbabb/keyframes.js"` at module-eval. So the cheap motion utilities and the 125 KB animation engine sit in one SCC; a consumer cannot reach the former without the latter (speedtest measured exactly this: `App.vue → useAuroraPolicy → glass-ui/motion (only useIntersectionPause) → keyframes`, 125 KB on every route's eager graph). The fix is a *second carve* in the same family as the L.W1 Lane C `/dark` + `/keyboard` + `/carousel` SCC-trap closures and the prior `/motion` carve itself — separate the keyframes-FREE leaves (`useIntersectionPause`, `installDarkModeSync`, `useRAFLoop`, `useScrollProgress`, `useStagger`, `useStaggerReveal`, `useIntersectionPause`, the `DAMPING`/`SNAP_THRESHOLD` constants) from the keyframes-BEARING leaves (`useAnimatedNumber`, `useAnimatedNumberMap`, `useNumericTransition`, `useSpring`, `useSpringMount`, `useSpringPress`). The `/motion` subpath's OWN header comment (`src/motion.ts`) already calls this asymmetry "the latent oversight this subpath retires" and then *declined to make the cheap/heavy distinction*, reasoning the bundler walks the sub-tree as one SCC "anyway." speedtest's measurement proves that reasoning was load-bearing-wrong: the consumer pays 125 KB for a keyframes-free import. AP discharges it. This is a real architectural sub-budget move with a sourcemap-verifiable acceptance gate.

- **R0G-6 is the a11y-correctness companion.** It extends the AN role-contract frontier (the accessibility axis the constellation keeps surfacing) — `DockIconButton` renders at `--dock-control-size` (2.5rem = 40px at comfortable density) with NO `@media (pointer: coarse)` floor (confirmed in `src/styles/dock.css:628` — the only coarse rule in the cascade is for timeline dots, not dock controls). speedtest measured 40×40 on a real coarse pointer; its own operator-chrome could be lifted in-repo, but the shared primitive cannot. A `@media (pointer: coarse) { min-height/min-width: 44px }` (or a `::before` hit-area expansion that preserves the compact visual) clears the floor for every dock consumer by construction. Small, but a genuine correctness defect in a shipped primitive — and CSS-bound, so it lands against the honest ceiling AO just re-based (82500 gzip, currently 90.9%).

**No ≥2-consumer NEW-primitive promotion clears the binary substrate gate** (full analysis §3). The inline-edit watched condition has MOVED — a third consumer appeared (keyframes.js `EditableLabel`) since AO — but the three shapes still diverge on the load-bearing axis (controlled `<input>` vs `contenteditable`; numeric vs string; single-click vs dblclick), so promotion would still invent a union the consumers don't share. It remains a watched condition, not AP's headline. Greenfield substrate (calendar, date-picker, pagination) is rejected outright — zero consumers, the J inv 10 trap.

---

## §1 — Ranked candidate list

| Rank | Candidate | Verdict | Why |
|---|---|---|---|
| **1** | **R0G-7 — motion-barrel split** (carve keyframes-FREE leaves off the keyframes-BEARING leaves) | **HEADLINE** | The literal open end of the AO→AQ handshake. Real, measured (125 KB eager-pull on every speedtest route), single-confirmed-consumer with a named sourcemap acceptance gate, already owned by glass-ui's release loop. A gestalt barrel carve in the L.W1 SCC-trap-closure family — the `/motion` header itself flagged the asymmetry and deferred it; the consumer's measurement proves the deferral was wrong. |
| **2** | **R0G-6 — DockIconButton coarse-pointer 44px floor** | **FOLD INTO #1 (a11y-correctness companion)** | Confirmed real (40×40 measured; `dock.css` carries no dock coarse rule). Extends the AN role-contract/a11y frontier. CSS-bound → lands against AO's re-based ceiling. Alone it is a one-rule fix, too thin to headline; it rides the AQ-finish cut. |
| **3** | **Inline-edit primitive** (bbnf-buddy `EditableNumber` + keyframes.js `EditableLabel` + words `EditableField`) | **NO HEADLINE — watched condition, now 3 consumers but still divergent** | The constellation MOVED (3rd consumer appeared) but did NOT converge. The three diverge on element-strategy (`<input>` vs `contenteditable`), value-type (numeric vs string), and trigger (click vs dblclick). Promoting one union overfits. See §3.1. Realisation trigger updated: ≥2 consumers on the SAME shape. |
| **4** | **shadcn-vue parity component** (calendar / date-picker / pagination / breadcrumb / scroll-area) | **REJECTED — speculative substrate (J inv 10 trap)** | glass-ui lacks ~10 shadcn-vue families, but ZERO consumer surfaced demand for any. Pagination + virtual were already RETIRED at L.W3 for exactly this (0 consumers). Shipping any now is the overfit the binary gate exists to prevent. See §3.4. |
| **5** | **Theming / preset capability** | **REJECTED — violates the presets-in-consumers precept** | Named themed presets live in consumers per the standing memory; the library's own default tokens evolve in `src/styles/`. There is no library-side preset capability to build that doesn't import a consumer's identity. Not a glass-ui move. |

---

## §2 — Headline rationale (R0G-7 + R0G-6 fused: "finish the AQ contract")

### §2.1 — Why R0G-7 is the keystone

The AO→AQ handshake is a closed loop with two threads still hanging:

- AO folded **R0G-1..5** (the AQ-open five): Aurora demand-driven loop, InstrumentChassis breakpoint reserve, `useIdleReady` (the one promotion that cleared the gate — 5 sites), Toaster `position`, the `--surface-public-data-panel` token. All shipped in 3.0.0 (`AO/FINAL.md` §finding 7).
- **R0G-6 + R0G-7 were surfaced LATER** — during AQ R2 implementation, "measured on the real built dist / real edge — they are confirmed, not speculative" (`AO/CONSUMER-REQUEST-speedtest-AQ.md`). They post-date AO's W3 consumer-gap wave. AO's FINAL routes them as cross-repo residuals; speedtest's AQ FINAL §2 carries them as "publisher-gated → glass-ui." **Neither is in AO's resolved-findings list. They are genuinely open.**

R0G-7's evidence is unusually strong because the consumer did the upstream analysis for us (`speedtest/.../aqp4-keyframes-chunk-analysis.md`):

1. **The over-pull is internal to glass-ui's barrel, not the consumer's import surface.** speedtest's glass-ui imports are all subpath/named (`/card`, `/button`, `/motion`) — consumer-side tree-shaking is already correct. The defect is that `dist/motion.js` is a flat re-export where `useAnimatedNumber` + `useSpringMount` `import { NumericAnimation }` at eval, so any motion symbol drags the engine.
2. **The boot chain is `index (entry) → glass-ui chunk → keyframes (125 KB)`, statically, on every route** — including data-panel routes with no meter and no charts. ES `import` is hoisted, so keyframes must fully evaluate before glass-ui executes, and glass-ui executes at boot.
3. **The fix is glass-ui-upstream, not consumer-config.** speedtest prototyped deferring its own `useAuroraPolicy → glass-ui/motion` edge (typecheck 0, tests 12/12) and the built artifact *did not change* — the eager glass-ui chunk still statically imports keyframes because the keyframes-FREE `useIntersectionPause` lives in the same flat barrel as the keyframes-BEARING composables. The honest fix is the barrel carve. The consumer reverted its byte-positive workaround rather than ship a metric-neutral diff, and named the upstream move.

The headline work, concretely:

- **Carve the `/motion` subpath into two surfaces** — a keyframes-FREE leaf set (`useIntersectionPause`, `installDarkModeSync`, `useRAFLoop`, `useScrollProgress`, `useStagger`, `useStaggerReveal`, the `DAMPING`/`SNAP_THRESHOLD` constants + `RAFLoopTiming` type) reachable WITHOUT pulling keyframes, and the keyframes-BEARING engine (`useAnimatedNumber`, `useAnimatedNumberMap`, `useNumericTransition`, `useSpring`, `useSpringMount`, `useSpringPress`) on its own path. The exact subpath split (a new `/motion-core` vs `/motion`, or restructuring the sub-tree barrels so the two leaf-sets are separately importable) is the W1 design slice's call — but the SCC must break so a keyframes-free import carries no keyframes transitive.
- **Acceptance gate (consumer-named):** a consumer importing only the cheap motion utils builds a dist with keyframes (~125 KB) OFF the entry/eager graph (sourcemap-verified); the animation primitives stay available on their own path. This is R0G-7's published acceptance signal verbatim (`AO/CONSUMER-REQUEST §R0G-7`).
- **This is a clean SemVer-major-or-minor-visible barrel change** in the same family as the L.W1 carves and the original `/motion` carve. No back-compat alias (inv 4 / inv 47) — consumers migrate per one-line subpath rename, documented in MIGRATION.md/CHANGELOG.md as the prior motion carve was.

### §2.2 — Why R0G-6 folds in (the a11y companion)

R0G-6 is real, small, and shares the "finish the AQ contract" close:

- **Confirmed defect.** `src/styles/dock.css:628` — `.dock-icon-button` sizes from `--dock-control-size` (2.5rem = 40px at comfortable density, `:103`), with no `@media (pointer: coarse)` floor. The only coarse rule in the whole cascade is for timeline dots. speedtest measured 40×40 on a 390×844 `hasTouch` viewport (`AQ/FINAL.md` AQ-RE-MEASURE-F3F8: "CONFIRMED real gap (40×40) — disproves the 'dock already has a floor' assumption").
- **It extends the AN role-contract / a11y frontier** — the accessibility axis the constellation keeps surfacing (AN did StatusDot/SortableHandle/NumberField role contracts; AM did forms-a11y; the GlassDock aria contract is already canon in CLAUDE.md). A 44px coarse-pointer floor is the natural next a11y rung on the same dock family.
- **Proposed shape:** `@media (pointer: coarse) { min-height: 44px; min-width: 44px }` on `.dock-icon-button`, OR a `::before` hit-area expansion that preserves the compact visual (the W1 design slice picks — the `::before` option keeps the painted glyph compact while the tap target grows, which may be preferable for dense docks). Fine-pointer desktop visual unchanged. CSS-bound → measured against the AO-re-based 82500 gzip ceiling.
- **Why it folds rather than headlines:** alone it is one media-query rule — a hygiene fix, not a tranche. It rides R0G-7's cut as the second lane, exactly as AO's hygiene rode the CSS pass.

### §2.3 — The fused thesis

AP = **"finish the speedtest-AQ contract."** AO folded 5 of 7; AP folds the 2 that arrived after AO's consumer wave closed. R0G-7 (barrel carve) is the architectural keystone with a sourcemap acceptance gate; R0G-6 (dock 44px floor) is the a11y companion. Both are real, measured, single-confirmed-consumer-with-named-gate, and already owned by glass-ui's release loop — the cleanest possible keystone provenance. The cut is a SemVer bump (3.1.0 minor, or 3.x per the carve's break-shape) that speedtest then pins and consumes per each item's acceptance gate, closing the AQ R0G ledger to zero.

---

## §3 — ≥2-consumer primitive-promotion re-test (has the constellation moved?)

AO's EPSILON found "no ≥2-consumer pattern clears the binary gate." This lane re-runs the survey at HEAD across `bbnf-buddy`, `keyframes.js`, `words`, `fourier-analysis`, `speedtest`, `muster`.

### §3.1 — Inline click-to-edit (the watched condition — MOVED but did NOT converge)

The constellation moved: a **third** consumer appeared since AO.

- **bbnf-buddy `EditableNumber.vue`** — NUMERIC atomic cell. `<button>` (read) ↔ `<input type=text>` (edit) DOM swap, zero layout shift, **single-click** to edit, value.js `parseCSSValueUnit` parsing, caller-controlled formatter, `align`/`size`/`width`/`step`/`ariaLabel` props, blur+Enter commit / Escape cancel.
- **keyframes.js `EditableLabel.vue`** (NEW since AO) — STRING label. `<span>` ↔ `<input>` swap, **dblclick** to edit, blur+Enter commit / Escape cancel, `defineExpose({startRename})`, ~50 lines, no formatter, no parsing.
- **words `EditableField.vue`** — RICH-TEXT field. `contenteditable` span, **dblclick**, edit-mode-gated, hover-action-buttons (edit/regenerate), multiline, slot-driven display, validator, array/number/string coercion, `useMagicKeys` Cmd/Ctrl+S, global `save-all-edits` event bus.

**Verdict: still NOT promotable as a single primitive.** The 3 share a gestalt (in-place editable swap, Enter-commit/Escape-cancel) but diverge on every load-bearing axis:

| Axis | EditableNumber | EditableLabel | EditableField |
|---|---|---|---|
| Element strategy | controlled `<input>` | controlled `<input>` | `contenteditable` |
| Value type | numeric (value.js coerce) | string | string / number / array |
| Trigger | single-click | dblclick | dblclick |
| Gating | always-editable | always-editable | edit-mode-gated |
| Actions | none | none | hover buttons (edit/regen) |
| Commit | blur+Enter | blur+Enter | blur(delay)+Enter/Shift-Enter+Cmd-S |

The two `<input>`-based consumers (EditableNumber, EditableLabel) rhyme MORE closely — but one is numeric+single-click and the other string+dblclick, so even THOSE two don't share a shape; a union would need a `mode: "numeric" | "string"` + `trigger: "click" | "dblclick"` matrix that's already a configuration surface, not a primitive. words' `contenteditable` is a third architecture entirely. **Promoting any union invents a shape no consumer actually ships** — the overfitting trap (memory: overfitting-audit; J inv 10). It REMAINS a watched condition. **Updated realisation trigger: ≥2 consumers converge on the SAME (element-strategy, value-type, trigger) tuple** — e.g. two `<input>`-numeric-click consumers, or two `contenteditable`-string-dblclick consumers. The 3rd consumer made the gestalt more visible but did NOT collapse the divergence; if anything it confirms the divergence is intrinsic (three apps, three genuinely-different editing needs).

### §3.2 — Labeled slider with numeric readout (unchanged — single-consumer-equivalent)

- fourier `SliderControl.vue` — label + plain numeric `<input>` + glass `<Slider>`.
- bbnf-buddy `EditableSlider.vue` — label + glass `<Slider>` + the full `EditableNumber` cell.

glass-ui's `LabeledSlider` still has no numeric-readout cell. But (per AO's finding, re-confirmed) the two readouts diverge — fourier's plain `<input>` vs bbnf-buddy's value.js-parsing `EditableNumber`. Shared minimum is cosmetic ("show the value next to the slider"). **Disposition unchanged: minor-additive `:show-value`/readout-slot option on `LabeledSlider`, NOT a keystone.** Watched-ledger entry (AO carried "a 3rd consumer wants it") still un-cleared — no 3rd consumer appeared.

### §3.3 — Metric/stats, collapsible, glass surfaces, dock/nav (unchanged — mature)

`MetricCell`/`MetricBadge`/`MetricStack`/`MetricPill` family is mature (MetricCell was itself promoted from speedtest at AC.W8e). speedtest `StatsCards` remains a single-consumer variant. fourier `CollapsibleSection` is single-consumer (app-specific scroll-into-view). Glass surfaces + dock are consumed directly. No new ≥2-consumer shape. (The AN ARCHIVED items — interruptible MetricStack reorder, dock panel-host — remain un-triggered per `AO/FINAL.md` watched-ledger.)

### §3.4 — shadcn-vue parity gaps (REJECTED — speculative)

glass-ui's `ui/` ships 41 families but lacks ~10 shadcn-vue families: calendar, date-picker, pagination, breadcrumb, scroll-area, resizable, sonner, menubar, navigation-menu, aspect-ratio. **None has a consumer.** Pagination AND virtual were already RETIRED at L.W3 for exactly this (0 production consumers; substrate-without-consumer-binary). Shipping any "for parity" is the precise J-inv-10 overfit the binary gate forbids. **Rejected explicitly.** If a consumer surfaces a real date-picker need with ≥2 sites, it routes a future tranche; speculation does not.

### §3.5 — muster H (no glass-ui gap)

muster H is **muster-only** (`H.md` §cross-repo: "H needs no cross-repo publish and no cross-repo source change"). Its multi-voter keystone (`<VoterRoster>`, per-voter prefs, verdict breakdown, dock voter-badge) builds entirely on EXISTING glass-ui primitives (inv 41 glass-ui-FIRST: Popover/ConfirmDialog/MetricBadge over the OriginsLayer pattern). H's EPSILON confirms the F.W7 `voters?` substrate is sufficient for the solo surface and the joinable half is a muster server extension, not a glass-ui primitive. **H surfaces no new glass-ui gap** — if it finds one it routes a caret bump, not an AP wave. So the only live consumer-bound glass-ui requests are the two open AQ residuals.

### §3.6 — Promotion summary

**No NEW ≥2-consumer pattern clears the binary substrate gate at HEAD.** The inline-edit gestalt gained a 3rd consumer but its divergence is intrinsic (3 different editing architectures) — watched, not promotable. The library's substrate stays well-matched to its consumers. **The only live consumer-surfaced glass-ui work is the two open AQ residuals (R0G-6 + R0G-7)** — which are fixes-to-existing-primitives, not new promotions, so they don't need to clear the promotion gate at all.

---

## §4 — Full-tranche-vs-hygiene verdict

**AP is a FULL TRANCHE — earned by R0G-7's barrel carve.** Honest assessment:

- **R0G-6 alone** (the 44px dock floor) is a one-media-query CSS fix — a hygiene commit, not a tranche.
- **R0G-7 (the motion-barrel carve) earns the full-tranche designation.** It is a genuine architectural move: an SCC break across the `/motion` sub-tree, a new subpath surface (or barrel restructure), a sourcemap-verified acceptance gate, an inv-4/inv-47 clean break with MIGRATION.md/CHANGELOG.md documentation, and a re-run of the L.W0 subpath-publication probe (`verify-export-types`) for the new surface. It has a gestalt (carve the SCC, per the L.W1 family) over the patch (the consumer's reverted byte-positive defer), measurement (125 KB off the eager graph, sourcemap-verified), and forward-looking value (every keyframes-free motion consumer stops paying for the engine).
- **Verdict: full tranche, R0G-7-keyed, R0G-6-funded.** AP = one keystone lane (motion-barrel carve + the publication probe) + one a11y-companion lane (dock 44px floor) + the changeset cut that closes the AQ R0G ledger to zero + the carried watched-conditions (inline-edit convergence now at 3 divergent consumers; `LabeledSlider` readout; the 2 AN ARCHIVED items).
- **Why it is wanted and load-bearing, not invented:** both items are CONSUMER-MEASURED on the real edge, NAMED with acceptance gates, and ROUTED to glass-ui by the AO→AQ handshake. AO closed before they were folded; AP is the natural and only owner. This is the opposite of speculative substrate — it is the literal open work item the constellation is blocked on.

### §4.1 — If the orchestrator wants a DELTA-territory internal move instead

If AP is to be a purely internal/architectural tranche (no consumer-fold), the strongest DELTA-territory candidate is **the per-rung CSS sub-budget knob AO named but may not have fully built** (AO added "per-subpath drift enforcement"; a per-*block* sub-budget — glass-ladder vs tokens vs utilities — is the finer-grained forward infra). But this is weaker than the AQ-finish: the CSS ceiling is now honest (82500 gzip, re-based at AO), so the per-block knob is a refinement, not a binding constraint. **The AQ-finish (R0G-6 + R0G-7) is the stronger headline** because it has live consumer demand and a named acceptance gate, where the sub-budget knob is anticipatory infra with no current pressure. Recommendation: lead with the AQ-finish; the per-block knob is a candidate runner-up DELTA lane only if R0G-6/7 prove too thin in W1 design (they will not — R0G-7's carve is substantial).

---

## §5 — Authority / evidence

- AO close: `AO/FINAL.md` (folded R0G-1..5; routes R0G-6/7 as cross-repo residuals), `AO/CONSUMER-REQUEST-speedtest-AQ.md` (the 7-item handoff table; R0G-6/7 marked "surfaced during AQ R2 implementation — confirmed, not speculative"), `AO/audit/EPSILON-keystone.md` (prior "no gate-clearing pattern" survey, re-tested here).
- speedtest AQ: `AQ/FINAL.md` §2 carried-ledger (R0G-6 measured 40×40; R0G-7 motion-barrel split publisher-gated), `AQ/R0-GLASS-COORDINATION.md` §R0G-6 + §R0G-7 (WHAT/PROPOSED-SHAPE/ACCEPTANCE), `speedtest/.../persisted/aqp4-keyframes-chunk-analysis.md` (the full sourcemap chunk analysis + the named glass-ui-upstream fix).
- R0G-6 confirmation (this lane): `src/components/custom/dock/DockIconButton.vue` (`.dock-icon-button` class, no size floor); `src/styles/dock.css:628` (`.dock-icon-button` width/height from `--dock-control-size`, `:102-103` = 2.5rem = 40px comfortable; NO `@media (pointer: coarse)` dock rule in the cascade).
- R0G-7 confirmation (this lane): `src/motion.ts` (the `/motion` flat-barrel header comment that flagged the cheap/heavy asymmetry as "the latent oversight this subpath retires" and declined to carve it); `src/composables/motion/index.ts` (re-exports `useSpring*` (keyframes-bearing) + `useIntersectionPause`/`useRAFLoop`/`useScrollProgress` (keyframes-free) as one `export *` SCC); `package.json` `./motion` subpath.
- Inline-edit re-survey (this lane): `bbnf-buddy/src/components/EditableNumber.vue` (numeric, click, value.js); `keyframes.js/demo/@/components/custom/EditableLabel.vue` (NEW 3rd consumer — string, dblclick); `words/.../editing/EditableField.vue` (contenteditable, dblclick, edit-mode-gated).
- muster H (no glass-ui gap): `muster/docs/tranches/H/H.md` §cross-repo + §inheritance inv 41; `muster/docs/tranches/H/audit/EPSILON-*.md` §0 (F.W7 substrate sufficient; joinable half is a muster server extension).
- shadcn-vue parity (rejected): `src/components/ui/` (41 families; calendar/date-picker/pagination/breadcrumb/scroll-area absent, 0 consumers); pagination+virtual RETIRED at L.W3.
- Standing invariants: J inv 10 / L inv 8 (binary substrate, ≥2 consumers), L inv 4 / inv 47 (no back-compat alias), L.W1 Lane C (SCC-trap subpath carve precedent), presets-in-consumers + overfitting-audit memories.
