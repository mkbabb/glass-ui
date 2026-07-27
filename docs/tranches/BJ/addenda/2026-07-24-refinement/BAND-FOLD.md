# BAND RECONCILIATION — the 8-component refinement cut

**modelId: `claude-opus-5[1m]`** (read verbatim from this seat's system context: "The exact model ID is claude-opus-5[1m]").

**Verification base:** HEAD `0371836dfeeb3b7982250d612f93b5347a1d29d4`, re-read on disk this seat. Component tree measured `57,657` (`src/components/**/*.{ts,vue,css}`) — matches the brief. Test corpus measured **1,125** `it(`/`test(` call sites across **200** files (brief said 1,095; drift noted, not material). Every ruling below carries a file:line I opened. Where a jury's fact failed re-verification it is in §8, not silently corrected.

---

## §1 — COLLISIONS

One owning wave per file per cut. Nine real collisions; two claimed ones dissolve on inspection.

### C-1 — The dock edge mask is **two** rules; W-DOCK claims one · **W-DOCK owns both**

W-DOCK deletes `src/components/dock/styles/overflow.css:88-105` (mask + `gl-fade-*` scroll timelines). But the byte-identical construct exists a second time for the **vertical** dock at `src/components/dock/styles/shell.css:286-299` — same `mask-image: linear-gradient(… transparent 0 …)`, same `gl-fade-start-in`/`gl-fade-end-out` pair, `scroll(self block)` instead of `scroll(self inline)`. The spec's change list never touches it.

This is not cosmetic: W-DOCK's own **π-REACH** cell routes `/dock/rail` (vertical), so the wave would photograph, as its proof of cure, a port that still erases its overflow evidence exactly the way D2 condemns.

**RULING.** W-DOCK owns `overflow.css` **and** `shell.css:286-299`. The evidence stack (lip + condensation) replaces **both** masks — block-axis lip and `view(block)` condensation on the vertical arm. `π-EVIDENCE` gains a `/dock/rail` cell. The Breakage line is corrected in §8 (F-1).

### C-2 — The track family: W-SLIDER × W-TIMELINE × `BJ.W-TRACK-DRY` · **W4 owns the registers; the two waves are consumers**

`BJ.W-TRACK-DRY` (BAND-MATERIAL W4, `waves/BAND-MATERIAL.md:626-696`) is the named owner of the slider/progress/scrubber track mechanics and discharges F23.

**W4 has LANDED** — verified: `src/styles/glass/track-well.css` and `src/styles/glass/value-marks.css` both exist; `Slider.vue:210` (`class="slider-track glass-track-well"`) and `Progress.vue:70` both compose it. Step 4 ("Timeline stays out until the W5 redesign rules") is the only unexecuted clause.

- **W-SLIDER S2** rewrites `.slider-range` box-shadows against `.glass-track-well { overflow: hidden }` (`track-well.css:36`). That is a consumer-side edit inside `Slider.vue` — **legal**, no W4 file touched.
- **W-SLIDER S8** strikes six `--slider-*` knobs. Verified none of the six collide with W4's `--track-bg` collapse (W4 already retired `--slider-track-bg`; `Slider.vue:290` records it). **Legal.**
- **W-TIMELINE T-4** rewrites `ScrubberTimeline`'s fill channel. `ScrubberTimeline.vue:209` carries a live `class="glass-track timeline-rail"` — the exact name W4 ruled non-colliding-by-design.

**RULING.** `src/styles/glass/track-well.css` + `value-marks.css` are **frozen** this cut — no wave edits them. W-TIMELINE **may not** rename, re-home, or shadow `.glass-track`. W-TIMELINE must additionally adopt `.glass-track-well` on `.timeline-rail` (see §7, U-2) — that is W4's owed step 4 and the third F23 consumer, and it is cheaper inside T-4 than as a separate wave.

### C-3 — `--glass-material-rim`: W-ALERT (membership) × W-SLIDER (leg) · **no conflict; slider's rationale is wrong**

W-ALERT joins the rim group by composing `.glass-quiet` (`rim.css:64-73` lists it). W-SLIDER keeps `var(--glass-material-rim)` as leg 1 on `.slider-range`, which is **not** a group member.

Verified: the token always resolves — `shadow.css:38` declares a root-level outer fallback (`0 0 0 0.5px …`), and `rim.css:90-95` re-points it inside the group to **two `inset` arms plus `var(--glass-rim-bottom)`**. On `.slider-range` it arrives by **inheritance** from whatever rim-group ancestor the slider sits in.

**RULING.** No writer collision — W-ALERT owns rim-group membership, W-SLIDER touches no rim file. Both proceed. W-SLIDER's supporting sentence "every ring is clipped" is falsified (§8, F-5); the cure survives the correction.

### C-4 — `feedback-tone`: W-ALERT × W-TOAST · **no conflict; the shared partial is frozen**

W-ALERT hoists a `TONED` const re-pointing `--feedback-tone-rung` to `var(--glass-bg-quiet)`; W-TOAST deletes `group-[.destructive]:*` from `ToastAction.vue:22` because the root emits `feedback-tone-destructive` (`Toast.vue:112-117`). Both **read** `src/components/_shared/feedback/feedback-tone.css`; neither writes it.

**RULING.** `_shared/feedback/feedback-tone.css` is **frozen** this cut. W-ALERT owns `src/components/alert/index.ts`, W-TOAST owns `src/components/toast/**`. Disjoint.

### C-5 — `useSelectionGroup.ts`: W-DOCK (forbids) × W-TABS (adjacent) · **FROZEN**

Verified the recenter call spans `useSelectionGroup.ts:183-186` (the spec's `:184-185` is drift). It is shared by `src/components/tabs/composables/useTabRovingFocus.ts` **and** four dock files (`DockLayerGroup.vue`, `DockCrossfade.vue`, `DockControl.vue`, `GlassDock.vue`).

**RULING.** W-DOCK's fence is correct and is hereby made band-wide: **no wave edits `useSelectionGroup.ts` this cut.** W-DOCK's `seat()` is additive on `dockContext`; W-TABS' `data-active` seam does not reach it.

### C-6 — `tests-visual/` claimed by three waves · **the runner is dead**

Verified `vitest.config.ts` `include: ["tests/**/*.{test,spec}.{ts,tsx}", "tests/**/*.{test,spec}.vue", "scripts/**/*.{test,spec}.{ts,tsx}"]`. No playwright config exists (`ls playwright*.*` → none). No npm script names a visual or playwright runner. **176 spec files in `tests-visual/`, zero executed.**

Three waves reach into it: W-SLIDER puts its **only** gate there; W-TABS repairs `tabs-std.spec.ts` W1; W-AURORA re-pins `substrate-paints-color.spec.ts:338` and `aurora-vibrancy.spec.ts:33`.

**RULING.** `tests-visual/` is a **capture-script tree, not a gate tree**, for this cut. No wave may place a born-RED gate there (§5). Edits that keep an unexecuted file *truthful* are still required — a rotten file that also lies is worse — so W-TABS' item 4 and W-AURORA's re-pins **stand as doc-truth maintenance, explicitly not as gates**, and neither wave may cite them as verification.

### C-7 — `demo/shell/BottomDock.vue` · **W-DOCK owns; the layout re-home is owed**

W-DOCK deletes the `<FadingScroll axis="x">` wrapper at `:183-196`. But `:279-280` states the `.demo-bottom-dock__tabs` class "is merged onto the `<FadingScroll>` root, which IS the `.fading-scroll--x` scroll port" and lays out the slotted strip through it. Deleting the wrapper orphans that rule.

**RULING.** W-DOCK owns `BottomDock.vue` this cut and must re-home `.demo-bottom-dock__tabs` onto the bare strip element in the same edit. Also W-DOCK's: `demo/stories/dock/overflow.vue:24,:93` and `GlassDock.vue:31,:80` and `useDockOverflowFit.ts:7` all narrate the FadingScroll mask — all become false on landing.

### C-8 — `demo/stories/substrates/aurora/presets.ts` · **already ruled; W-AURORA owns**

`waves/BAND-REDUCTION.md:77-78` routes the roster cut explicitly: "aurora preset cut + mediums (GF-AURORA W5/W1-W4 — RU-09 R10 executes THERE, roster 17→~11, **not here**)". Verified 17 keys on disk (`presets.ts:721-737`). No collision. Recorded so REDUCTION cannot re-claim it at its own cut.

### C-9 — `tests/demo/aurora-stage-affordance.test.ts` · **W-AURORA owns**

This is in the **executed** tree (`tests/**`). W-AURORA's renames break it and W-AURORA claims it. Sole owner. Note for sequencing: this is the one place aurora's rename lands in CI-visible red.

### C-10 — `SegmentedTimeline.vue` / `ScrubberTimeline.vue`: W-TIMELINE × BAND-REDUCTION W5 · **ruled in §3 (X-2)**

`BAND-REDUCTION.md:674-694` **deletes** `SegmentedTimeline.vue` (292 LOC) and folds the scrubber, gated on the unanswered ASK-7. W-TIMELINE's T-1 lives entirely inside the file scheduled for deletion; T-3/T-4 live in the one scheduled to fold.

### Dissolved (claimed, not real)

- **W-SLIDER deletes `useTouchGate` usage while W-DOCK depends on it.** Verified compatible: after the slider strike, `useTouchGate` retains `useDockTouchGate.ts:53`, the public export (`src/index.ts:154`, `tests/public-surface.spec.ts:94`), and `tests/composables/useTouchGate.test.ts` (4 cases). **No collision.** Recorded so it cannot be re-raised.
- **W-DOCK deletes `<FadingScroll>` while other consumers need it.** Verified 6 other live mounts (`Configurator.vue:278,:339`, `carousel.vue:155`, `blob.vue:487`, `CodeBlock.vue:117`, `PresetPickerRow.vue:47`, `AuroraConfigDock.vue:262`). The component survives; only the dock's use of it goes. **No collision.**

---

## §2 — DUPLICATED REMEDIES

**Rule applied first, every time: does it already exist on disk?** Four of six did.

### D-1 — "Extend a small pointer target to the 44px coarse floor" · **ALREADY ON DISK · strike the timeline invention**

Invented independently by W-SLIDER (S1/BAND-A11Y-F) and W-TIMELINE (T-2, minting a new `--timeline-touch-target` token and a bespoke `.glass-track::before` inset formula).

On disk: `data-control-target` → `src/styles/utilities/responsive.css:4-8` (`@media (pointer: coarse) { min-block-size: 2.75rem }`), plus the `touch-hit-area` utility in `a11y-overrides.css`. W-SLIDER **measured** the primitive already working (root 44×44 at coarse) and correctly reduced BAND-A11Y (F) to a comment strike.

**SHARED PRIMITIVE — `data-control-target` (existing, no new code).**
```
Attribute on the element that OWNS the pointer handlers (not a descendant, not a
pseudo). Coarse pointers inflate its block axis to 2.75rem via responsive.css:4-8.
Consumers: Slider root (Slider.vue:198, landed) · ScrubberTimeline `.glass-track` (NEW, T-2).
```
**RULING.** W-TIMELINE T-2 **strikes** the `--timeline-touch-target` token and the `::before` formula. `.glass-track` gains `data-control-target`. Zero new tokens, zero new CSS, one attribute — and it inherits the same cross-axis hazard W-SLIDER S1 just diagnosed, which is now covered by one gate for both (§5).

### D-2 — "A `data-*` styling seam independent of ARIA semantics" · **ALREADY ON DISK · W-TABS adopts, does not mint**

W-TABS presents `data-active` as a new seam. It is the **landed corpus idiom**: `DockControl.vue:32` documents it verbatim as "the CSS hook reading the [selectable] semantic"; `dock/styles/controls/icon-button.css:165-190` consumes it; `PagerDots.vue:351,:386` and `Configurator.vue:289` stamp it.

Further, `material.css:426-452` already ships the **selectable-state group** — `:is(.is-active, .active, [data-active], [data-dragging], [data-state="checked"], [data-state="on"], [aria-pressed="true"], [aria-selected="true"], [aria-expanded="true"], [aria-current="page"])` — the corpus's existing answer to "one selected-state seam across both semantics." (Verified it does **not** currently reach `.segmented-tab`: the rule requires membership in a disjoint first list — `.glass-overlay, .glass-specular-track, .dock-icon-button, .dock-tab-button, …` — that `.segmented-tab` does not join. No accidental paint on landing.)

**SHARED PRIMITIVE — `data-active` selectable seam (existing, prior art = dock).**
```
Stamp `data-active="true"|"false"` on the selectable element, always, independent of
whether ARIA reads aria-selected or aria-pressed. Style off [data-active] only.
Consumers: DockControl (landed) · PagerDots (landed) · Configurator (landed) · SegmentedTabs (NEW, W-TABS §1).
```
**RULING.** W-TABS' call is right and its gate arm (b) is right. It must be re-framed as **adoption with dock cited as prior art**, and must **not** duplicate the `material.css:441-451` group in `tabs/styles/`.

### D-3 — "Scroll-timeline edge scalars" · **ALREADY ON DISK · strike the new @property pair**

W-DOCK mints `--dock-edge-start` / `--dock-edge-end`, newly `@property`-registered, driven by `scroll(self inline)` with "the same `animation-range` the deleted fades used."

On disk: `src/styles/utilities/base-misc.css:95-152` defines `gl-fade-start-in` / `gl-fade-end-out` and the scalars they write are `--fade-start` / `--fade-end`. Both dock rules already reach them **by name** and both files document that discipline explicitly (`overflow.css:85-87`, `shell.css:272-274`: "reached BY NAME … ZERO new recipe").

**RULING.** **STRIKE** `--dock-edge-start` / `--dock-edge-end`. The lip consumes the existing `--fade-start` / `--fade-end`, driven by the existing keyframes on the existing timeline. W-DOCK deletes the `mask-image` declaration and **keeps** the `animation` / `animation-timeline` / `animation-range` triple in both rules — the scalars are the input the new lip needs. This turns a +240-line "F47 cure" into a materially smaller one and removes the only reason `evidence.css` would need `@property` registration at all.

### D-4 — "One RO+MO measurer over the dock's cells" · **duplicate within one wave · fold**

W-DOCK mints `src/components/dock/composables/useDockItemCensus.ts`, described as "a `useDockOverflowFit`-shaped RO+MO census." `useDockOverflowFit.ts` already observes the same element set on the same element (and W-DOCK's own §Overruled defends its correctness at `:37-41`).

**RULING.** **STRIKE the new file.** Extend `useDockOverflowFit.ts` with `visibleFraction(el: HTMLElement): number`. One measurer per element set — two ResizeObservers on one strip is the overfit class the tranche exists to kill. G-DOCK-REACH's RED-at-HEAD clause re-anchors on `dockContext.ts` having no `seat` member (still true) rather than on a missing filename.

### D-5 — "Rung membership is the product invariant for a glass surface" · **PROMOTE corpus-wide**

W-ALERT mints `G-ALERT-ROLE`, an alert-only string-intersection over `alertVariants()`. The invariant it encodes is not alert-shaped: `ladder.css:316` names 4 selectors, `rim.css:64-73` names 9, `material.css:99-104` names 4 — three separate registers keyed off the same membership fact, and a surface outside all three "cannot darken over a bright backdrop and has no rim."

**SHARED PRIMITIVE — `G-RUNG-MEMBERSHIP` (new corpus gate, replaces the alert-only one).**
```
For every CVA/variant factory that returns a glass SURFACE class string, every variant
arm contains exactly one of {glass-card, glass-resting, glass-quiet, glass-wash,
glass-material, glass-floating, glass-overlay}. Source-read; no browser.
Consumers: alert (born-RED 6/6) + every landed rung composer as the green regression lock.
```
**RULING.** `G-ALERT-ROLE` is **generalized, not duplicated**. Counts as a corpus slot, not a band slot (§5).

### D-6 — "Gate `will-change` to the active gesture" · **ALREADY ON DISK · propagate, do not invent**

W-TIMELINE T-4 gates promotion on `[data-scrubbing]`/`[data-animating]`. `ScrubberTimeline.vue:365-371` already does exactly this correctly; `SegmentedTimeline.vue:168` and `ContinuousRail.vue:132` are the two that were not brought along. The spec says this correctly and no promotion is needed — recorded so no future round mints a `useWillChange` composable for it.

---

## §3 — CONTRADICTIONS

### X-1 — **HANDMARK: `KEEP-THIN` contradicts a standing USER RULING. Re-dispositioned to GREENFIELD.**

The most serious finding in the band.

`docs/tranches/BJ/PLAN.md:122-126` carries a dated user ruling:

> "**The greenfields inherit the reduction cuts** (dock 4 dead knobs; HandMark per the USER RULING 2026-07-17 — *"handmark is keep. But greenfield and perfect from first principles. Fable."* — the greenfield carries **FULL first-principles surface authority, the census floor superseded**)"

Corroborated at `ASK.md:179-189` (ASK-18/ASK-19 marked **RESOLVED BY YOUR RULING, no answer owed**) and at `formation/greenfields/GF-HANDMARK-PASS3.md:15-18`, which is an authoritative claude-fable-5 terminal design the jury **never read**. That design's §7 states: *"~400-450 LOC replacing 2306 across 12 files. DELETED: `brush.ts`, `ink.ts`, `noise.ts`, …"* and §5 (`:110`) deletes perfect-freehand: *"No perfect-freehand (the vendored `freehand.ts`…)"*.

The W-HANDMARK spec:
- disposes **KEEP-THIN**, closing 3 internal defects and **zero** of F34–F40;
- **overrules DELETE** by citing a dated re-audit in `docs/consumer-evidence/handmark.md` — but the ruling already **superseded the census floor** by name;
- **overrules "`freehand.ts` is dead weight"** — the authoritative design deletes it;
- keeps `ink.ts` and `brush.ts`, both on the greenfield's delete list, and hardens `ink.ts` with a new domain guard.

**RULING.** W-HANDMARK is **re-dispositioned GREENFIELD**, executed against `GF-HANDMARK-PASS3.md` as the spec of record. Its three verified defects (HM-1 crash, HM-2 phantom `points`, HM-3 divergent `pathD`) are **free riders** — all three code paths are on the delete list, so they close by construction and require no separate edit. The two §Overruled rows above are **struck**; they cannot be re-raised, because they were overruled by a user ruling before the jury sat. `G-HM-SURFACE` survives, re-scoped to the greenfield's surface (§5).

### X-2 — **TIMELINE: `KEEP` contradicts F16 + an unanswered USER-GATED ASK. Re-dispositioned HOLDING.**

`FEEDBACK-LEDGER.md:28` — F16, `/data/timeline`: *"Very poorly defined, buggy, likely many facilities overfit. **Redesign from the ground up.**"*
`ASK.md:79-86` — **ASK-7**, unanswered, recommending *"COLLAPSE 5→1, redesign-in-library … delete ScrubberTimeline + SegmentedTimeline, flatten the dispatcher."*
`BAND-REDUCTION.md:674-694` — the execution: **SegmentedTimeline DELETES**, the scrubber folds, `GlassTimeline.vue` flattens.

The W-TIMELINE spec never names F16 or ASK-7. It justifies `KEEP` on "the BD greenfield landed, so the structural verdicts are already spent" — but F16 is a **2026-07-17** row, i.e. **after** BD, and it is the user looking at the landed BD result and calling it buggy and overfit.

Executing W-TIMELINE as written means: T-1 repairs a file scheduled for deletion (`SegmentedTimeline.vue`, 292 LOC); T-3 and T-4 rewrite the DOM and paint channel of a file scheduled to fold.

**RULING.** W-TIMELINE is **re-dispositioned HOLDING**, split at the ASK-7 line:
- **Lands now, unconditionally** — **T-2** (the 44px floor via D-1's existing primitive) and the `ContinuousRail.vue:132` half of **T-4** (`will-change` strike + `clip-path` window). Both live in `ContinuousRail`/the surviving continuous variant, which **survives ASK-7 under every recommended answer**.
- **PARKED on ASK-7** — **T-1** (SegmentedTimeline), **T-3** (the scrubber caret), and the scrubber half of **T-4**. On a `COLLAPSE 5→1` answer they vanish; on `KEEP-VARIANTS` they land as written.
- **Added to the now-band** — the `.glass-track-well` adoption W4 left owed (§7, U-2).

`G-TL-1` is cut on its own merits (§5), which incidentally removes the only gate that would have been orphaned by the collapse.

### X-3 — **AURORA unilaterally CUTs ASK-20 under a recorded AUTHORITY CONFLICT. Reversed.**

W-AURORA arm 3: *"The graphite/ink sub-mode is CUT."*
`ASK.md:190-205` — ASK-20 asks crayon-only vs crayon + a distinct graphite/ink mode, and carries a **[DATED BRACKET 2026-07-21 · senior-spec correction]** reading *"**AUTHORITY CONFLICT — ASK-20** … the recorded CUT **or** marks the original option."*

A wave may not self-resolve a row the ASK has flagged as a live authority conflict; that is precisely the class the ASK gate exists for.

**RULING.** The graphite/ink sub-mode is **PARKED, not CUT**. W-AURORA arm 3 ships the crayon body only and records the sub-mode as ASK-20-gated with the conflict cited. Nothing in arm 3 forecloses either answer — crayon is a body either way. No schedule cost.

### X-4 — **AURORA grants itself a "default if silent" the ASK forbids. Struck.**

W-AURORA §Open 2: *"Default if silent: harden-not-delete, slot retained."*
`ASK.md:300-311` — ASK-28's **[DATED BRACKET 2026-07-21]**: *"'Harden-not-delete' remains the recommendation **only**. Until the owner marks…"*

A recommendation is not a default; converting silence into consent is exactly how a user-gated row gets executed unanswered.

**RULING.** The "default if silent" clause is **struck**. W-AURORA's arms 1–4 (the bodies) run unconditionally — they are the CRITICAL masking-fallback cure and are not ASK-gated. Arm 5's **DUSK re-founding and DAWN hardening are ASK-28-gated** and do not land until answered. The renames and the six deletions in arm 5 proceed (BAND-REDUCTION already routed the roster cut here, C-8); only the two authored re-designs park. **Register floor this cut: 11**, unconditionally — the "9, and 8 in the compound corner" language is struck along with the self-granted default.

### X-5 — **DOCK's Breakage line is false against its own change list.** Ruled at C-1; the line is corrected in §8 (F-1).

### X-6 — **DOCK's §Open invents a wave that already exists.** W-DOCK defers the drag lens and posture choreography to "their own wave." `ASK.md:336` names it: **ASK-32 · dock lens rollout / full-refraction variant (GF-DOCK §7.1, corrected ASK-15)**. **RULING:** W-DOCK's §Open cites ASK-32 by id. Do not mint a wave for a row that already has one.

### X-7 — **ALERT's `contain: paint` §Open. RESOLVED HERE, no code change.**

W-ALERT deferred this to implementation. Read to the byte: `src/styles/glass/material.css:99-104` is `.glass-wash, .glass-quiet, .glass-resting, .glass-card { contain: paint; }` — **`.glass-quiet` IS included.** Alert gains paint containment on landing.

**RULING: non-issue, close it.** `material.css:88-90` states the register clips **descendants only** — the surface's own rim and drop-shadow are unaffected, which is the whole point of `paint` over `hidden` (`:97-98`: "`overflow: hidden` stays FORBIDDEN (it would clip the focus ring)"). Alert has no positioned or overflowing descendant (`Alert.vue`, `AlertTitle.vue`, `AlertDescription.vue` are 43/17/17 lines of grid + text). No code change; the §Open is deleted, not carried.

---

## §4 — DEPENDENCY ORDER

Strict topological order. Every edge carries its reason; edges with no reason are not edges.

```
PRE  ─ BJ.W-TRACK-DRY (MATERIAL W4)         [LANDED — verified on disk, not scheduled]

0 ── G-RUNG-MEMBERSHIP + G-COARSE-TARGET    (the two corpus gates, §5)
     └─ reason: both are born-RED against HEAD and are consumed as the
        acceptance oracle by W-ALERT, W-SLIDER and W-TIMELINE-now. A gate
        authored after its subject is a rationalization, not a gate.

1 ── W-ALERT                                (isolated; one file)
     └─ reason: no shared file, no shared token. First because it is the
        cheapest born-RED proof that G-RUNG-MEMBERSHIP discriminates.

2 ── W-SLIDER
     ← W4 (landed): S8's knob strike must run against the post-W4 knob set.
     ← G-COARSE-TARGET: S1's cross-axis invariant IS that gate's assertion.

3 ── W-TIMELINE (now-band only: T-2, ContinuousRail half of T-4, W4 adoption)
     ← W-SLIDER: T-2 consumes `data-control-target` exactly as the slider
       root does; landing slider first proves the primitive on the simpler
       geometry before the scrubber inherits it.
     ← G-COARSE-TARGET: same gate covers both.

4 ── W-TABS
     ← W-DOCK's landed `data-active` idiom (prior art, no wave edge)
     └─ reason for position: independent of 1-3, but must precede W-DOCK
        because both touch the selectable-seam vocabulary and tabs is the
        smaller blast radius — a seam regression is cheaper to find here.

5 ── W-TOAST                                (isolated)
     └─ reason: `toast/**` + one demo story; touches nothing above.

6 ── W-DOCK
     ← W-TABS: seam vocabulary settles first (edge 4).
     ← D-3 ruling: must land AFTER the decision to keep `--fade-start`/`--fade-end`,
       which changes what `evidence.css` even is.
     └─ largest blast radius in the band (overflow.css + shell.css + BottomDock.vue
        + 3 doc-truth sites + dockContext). Late, so it lands on a settled tree.

7 ── W-AURORA (arms 1-4 + arm 5 renames/deletions; DUSK/DAWN park on ASK-28)
     └─ reason: the only net-GROWTH wave and the only one with an unresolved
        module-size KILL branch. It must not be the thing that destabilizes
        seven cheaper landings. Also the only wave whose rename lands red in
        the EXECUTED test tree (C-9) — isolate that signal.

8 ── W-HANDMARK (GREENFIELD, per X-1)
     ← GF-HANDMARK-PASS3 is the spec of record; ~1,900 LOC deleted.
     └─ reason for last: largest single deletion in the band. Nothing depends
        on it, so a slip costs no other wave. Its π is a pure no-regression
        battery on a route nothing else touches.

PARKED, no position:
   W-TIMELINE T-1/T-3/scrubber-T-4     → ASK-7
   W-AURORA arm 5 DUSK/DAWN            → ASK-28
   W-AURORA graphite/ink sub-mode      → ASK-20 (authority conflict)
   W-DOCK drag lens / posture          → ASK-32
   W-DOCK "+N" tray                    → ASK-16
   Slider/alert idle-engagement        → ASK-27 (hard precondition, FM W5)
```

**No cycles.** The only near-cycle — W-SLIDER needs W4's registers, W4's step 4 needs the surviving Timeline — is broken by W4 being landed and its step 4 being re-homed into W-TIMELINE's now-band (§7, U-2).

---

## §5 — GATE BUDGET

**Proposed by the eight specs: 11 slots.**

| wave | proposed | ruling |
|---|---|---|
| W-DOCK | G-DOCK-CROSS-AXIS-DEAD, G-DOCK-REACH | **2 kept** (one trimmed) |
| W-AURORA | G-AURORA-1BODY | **1 kept** |
| W-SLIDER | G-SLIDER-INSCRIBE | **CUT** → absorbed by G-COARSE-TARGET |
| W-TABS | G-TABS-1, G-TABS-2 | **MERGED → 1** |
| W-ALERT | G-ALERT-ROLE (+1 non-slot row) | **GENERALIZED** → corpus |
| W-TOAST | G-TOAST-SWIPE-ANCHOR | **1 kept** |
| W-HANDMARK | G-HM-SURFACE | **1 kept**, re-scoped |
| W-TIMELINE | G-TL-1, G-TL-2 | **G-TL-1 CUT; G-TL-2 CUT** → absorbed |

**Ruled: 6 band slots + 2 corpus promotions = 8 executable gates, 6 charged to the band.**

### The 6 band slots

1. **G-AURORA-1BODY** — medium-id → body injectivity per backend, identical across backends. The single highest-value gate in the band: it is the machine form of the no-masking-fallback edict, it is RED five ways at HEAD, and its mutation (`|| medium == 5`) is one line. **Keep verbatim.**
2. **G-DOCK-REACH** — activation emits before the seat glide; a fully-visible item glides not at all. Guards F47b, the user's own row. jsdom + stubbed rects. **Keep**, with the RED-at-HEAD clause re-anchored on `dockContext.ts` exposing no `seat` (D-4 strikes the filename it cited).
3. **G-DOCK-CROSS-AXIS-DEAD** — **trimmed**: the source-parse arm only (every `overflow-x: auto|scroll` rule on a `.dock-layer--full` selector declares a cross axis in `{clip, hidden}`). The "paired live assert `scrollHeight === clientHeight`" half needs a browser and moves to π-F27. Scope widens to `shell.css` per C-1.
4. **G-TABS-SEAM** — the merge of G-TABS-1 and G-TABS-2, four arms, one slot: (a) `data-active` correct across all four variant×semantics combinations; (b) no `.segmented-tab[aria-*]` state selector in `tabs/styles/`; (c) exactly one `.segmented-indicator` node per variant; (d) no `position-anchor`/`anchor-name`/`anchor(`/`@supports not (position-anchor` in `tabs/styles/`. Same subject, same file, same mount — two slots was a slot-inflation.
5. **G-TOAST-SWIPE-ANCHOR** — six positions, `data-swipe-direction` names the nearest edge. Four of six RED at HEAD by reka's default. Guards the actual gesture. **Keep verbatim.**
6. **G-HM-SURFACE** — re-scoped to the greenfield surface: every member of the post-greenfield `HandShape` union mounts without throwing and emits a non-empty `d`; every declared prop claiming a geometry effect changes the rendered `d`. Arm A stays RED at HEAD (`shape:"path"` still throws at `ink.ts:167-168` until the greenfield deletes the file).

### The 2 corpus promotions (not charged to the band)

7. **G-RUNG-MEMBERSHIP** (§2 D-5) — replaces `G-ALERT-ROLE`, born-RED 6/6 on alert, green-locks every landed rung composer. Corpus-wide, one slot for a corpus-wide invariant.
8. **G-COARSE-TARGET** — absorbs both cut a11y gates into one executable source assertion:
   - arm (a), *W-SLIDER's invariant, executable*: no track or thumb rule in `Slider.vue` declares a percentage on the **cross** axis — the thumb's containing block is the coarse-inflated root. RED at HEAD on `Slider.vue:520` (`height: 100%`) and `:606`/`:612`.
   - arm (b), *W-TIMELINE's invariant, executable*: every element carrying `role="slider"` pointer handlers declares `data-control-target`. RED at HEAD — `ScrubberTimeline.vue`'s `.glass-track` does not.

### What I cut, and why

- **G-SLIDER-INSCRIBE as specced** — placed in `tests-visual/`, which **no npm script executes** (C-6). A born-RED gate in a dead runner is born rotten: it can never go green, never go red, and never be noticed. Its real invariant — the one the spec itself wrote out ("no track or thumb declaration may use a percentage on the cross axis") — is a pure source read and is now G-COARSE-TARGET arm (a). The rect measurement it wanted is a π obligation, which the spec already books.
- **G-TL-2** — `document.elementFromPoint` needs layout, so same dead-runner problem. Absorbed as G-COARSE-TARGET arm (b), which asserts the *cause* (the primitive is applied to the gesture owner) rather than the *effect* — and is therefore both executable and harder to satisfy vacuously.
- **G-TL-1** — cut outright. It asserts that `celAccentFor()` does not emit `--cel-accent: var(--cel-accent)`, on a wave whose whole change is **deleting `celAccentFor()`**. A gate guarding a deleted function can only red by someone re-authoring the deleted function; the deletion plus the π capture is the witness. Against a 40–60 library budget this does not earn a slot.
- **One of G-TABS-1/G-TABS-2** — merged, not deleted; every assertion survives.

**Band charge: 6.** Two corpus slots are net-positive against the abrogation mandate — they replace three component-scoped gates with two invariants that guard the whole library, which is the direction the mandate points.

---

## §6 — LOC LEDGER

Baselines re-measured on disk. Each spec's frame stated, because two of them differ from the naive `find`.

| wave | frame | now | expected | Δ |
|---|---|---|---|---|
| W-DOCK | `src/components/dock/**` | 8,046 ✓ | ~8,080 | **+34** |
| W-AURORA | `src/components/aurora/**/*.{ts,vue}` | 8,968 ✓ | ~9,350 | **+382** |
| W-SLIDER | `Slider.vue` | 621 ✓ | ~405 | **−216** |
| W-TABS | `src/components/tabs/**/*.{ts,vue,css}` | 1,419 ✓ | ~1,335 | **−84** |
| W-ALERT | `src/components/alert/**` | 111 ✓ | ~107 | **−4** |
| W-TOAST | `src/components/toast/**` | 560 ✓ | 572 | **+12** |
| W-TIMELINE | `src/components/timeline/**` | 2,270 ✓ | ~2,260 | **−10** |
| W-HANDMARK **as specced** | `handmark/**/*.{ts,vue}` | 2,231 ✓ | ~2,203 | **−28** |

**Band as submitted: +34 +382 −216 −84 −4 +12 −10 −28 = `+86`** against 57,657 → **+0.15%. The band grows the tree.**

That fails the parsimony edict (F03: "extreme parsimony, KISS-forward, fewer lines"), and the whole overage is one wave: **without aurora, the other seven net −296.**

**With X-1 applied**, `GF-HANDMARK-PASS3.md:185` is the authority: *"~400-450 LOC replacing 2306 across 12 files."* (Its 2,306 baseline includes `.md`; the `.ts`+`.vue` frame is 2,231. I use the greenfield's own frame and target 425.)

| | Δ |
|---|---|
| seven waves as ruled | **+56** |
| W-HANDMARK **greenfield** (2,306 → ~425) | **−1,881** |
| **BAND TOTAL** | **−1,825** |

**−1,825 against 57,657 → −3.2%. The band shrinks the tree.**

Two things follow, and both are load-bearing:

1. **The handmark re-disposition is what makes this band parsimonious.** It is required by the user ruling independently (X-1) — but note that the KEEP-THIN disposition was also the difference between a band that grows the tree and a band that cuts 3.2% of it. The jury's conservatism was expensive twice.

2. **Aurora's +382 is the only growth and it is justified — conditionally.** It buys four dedicated shader bodies closing a **CRITICAL** masking-fallback defect (A1, verified verbatim at `aurora-mediums.wgsl.ts:399-401`) plus the user's F08 and A13 rows. The retirement side is real: `oil-modes.glsl.ts` is 112 lines deleted entire, and `curvedStroke`/`bestOil`/`paintStrokeLayers`/`paintStrokeMedium`/`StrokeProfile` come out of `mediums.glsl.ts` (496) and `brush.glsl.ts` (385). **The condition:** W-AURORA's §Open 1 (WGSL `@fragment` module-size budget) is a **hard gate on the wave, declared before arm 1 lands, not after**. If the lean oil body misses the budget, the KILL arm fires (drop enum 3, register floor 11 → 10) and the delta falls accordingly. No arm of aurora ships on an undeclared budget.

**Demo tree (tracked separately, not part of 57,657):** aurora −242 · dock ~+10 (BottomDock strip re-home, C-7) · toast +6 · timeline +8 (the gradient-less segment π requires) ≈ **−218**.

---

## §7 — WHAT NO JURY OWNED

`FEEDBACK-LEDGER.md:5-6` is explicit: *"Every row must receive a terminal disposition … an owning wave, a fold, or a retire with rationale. **Silent drops forbidden.**"* Seven unowned items; each gets an owner here.

**U-1 · F16 (`FEEDBACK-LEDGER.md:28`) — "Very poorly defined, buggy, likely many facilities overfit. Redesign from the ground up."**
W-TIMELINE never names F16. → **Owner: BAND-REDUCTION W5 + ASK-7.** W-TIMELINE is re-dispositioned HOLDING (X-2) and must cite F16 and ASK-7 in its own header so the row cannot go quiet a second time.

**U-2 · F23 (`:35`) — the slider/progress/timeline DRY, third consumer.**
`BJ.W-TRACK-DRY` owns F23 and has **landed** — but its step 4 ("Timeline stays out until W5 rules") means `.timeline-rail` never adopted `.glass-track-well`, so F23's own flip condition (≥3 real consumers) is **unmet on disk**. Neither W-SLIDER nor W-TIMELINE names F23. → **Owner: W-TIMELINE now-band.** `.timeline-rail` composes `.glass-track-well`; the `--cel-accent`/fill knobs are untouched. Cheap, unblocked by ASK-7 (the continuous variant survives every answer), and it closes W4's owed clause inside a wave already editing the file.

**U-3 · F34–F40 (`:46-52`) — seven handmark rows: "looks awful" · "should be more pen-like" · "doesn't even work" · "broken and disjointed" · "should be greenfielded" · "wrong layering, awful smoothing, awful encapsulation" · "remove ALL reference to meta text (what is 'SE') — grand redesign."**
W-HANDMARK closes **zero** of them; its three defects are internal correctness rows the user never raised. → **Owner: W-HANDMARK re-dispositioned GREENFIELD (X-1)**, executing `GF-HANDMARK-PASS3.md`, which addresses all seven by name at `:24-30`. Note: I grepped `demo/stories/motion/handmark.vue` for the F40 "SE" meta text and found **zero hits** — either it was already struck or it lives in a sibling. The greenfield must confirm on the live route, not on my grep; an absent string in one file is not a discharged row.

**U-4 · A01 (`:68`) — the engagement-affordance edict, naming sliders explicitly: "modal-expansion variant on mobile + grow-on-engage variant."**
W-SLIDER never mentions it. W-ALERT correctly identifies the fence but only for itself. → **Owner: `BJ.W-IDLE-BREATH` (FEEDBACK-MOTION W5), HARD-BLOCKED on ASK-27** (`ASK.md:278-292`: "THREE bands consume the outcome and **none may pre-decide the axis while it pends**"). W-SLIDER must carry a named-and-parked line so the row is visibly held, not visibly absent. Confirmed routed at `BAND-MATERIAL.md:676`.

**U-5 · F05 (`:17`) — "Not well defined with animations; improperly shifts the screen around; why does this section not have a background aurora."**
The aurora *component* wave cannot own a story-composition row. → **Owner: BAND-STORY** (the section/tile composition band), consulted-by-Aurora. Recorded so it does not fall between the component wave and the page wave, which is exactly where it currently sits.

**U-6 · ASK-17 — dock keyboard truth-up (`ASK.md:164-178`, conditional).**
No spec in this band names it, and W-DOCK's D3 changes focus behaviour (`DockControl.vue` calls `seat()` from `focusin`) — which is squarely inside the keyboard model ASK-17 governs. → **Owner: W-DOCK**, which must record ASK-17 as touched-and-parked; the `focusin` seat is additive and forecloses no answer, but that must be *stated*, not assumed.

**U-7 · Doc-truth: `overflow.css:78-79`.**
The rule declares `scroll-padding-inline: var(--dock-scroll-gutter)` with the comment *"the recenter gutter — `scrollIntoView({inline:'nearest'})` (useSelectionGroup, on every select)."* But W-DOCK's own D3 evidence establishes that **the strip does not use `useSelectionGroup`** — the comment describes a mechanism that does not fire on this element. → **Owner: W-DOCK.** Additionally: `scroll-padding-inline` is live on the port, so `seat()`'s `scrollTo` math must account for it or the glide overshoots by one gutter. The spec's landing math does not.

---

## §8 — FALSE PREMISES

Verified wrong at HEAD. Each is a fact a jury asserted or inherited; each is corrected with the source that falsifies it.

**F-1 · W-DOCK §Breakage: "The dock no longer renders a `FadingScroll` edge mask." — FALSE.**
`src/components/dock/styles/shell.css:286-299` retains a byte-identical `mask-image` + `gl-fade-start-in`/`gl-fade-end-out` pair on `scroll(self block)` for the vertical dock, untouched by the change list. The claim is true only of the horizontal port. **Correction:** the Breakage line reads "the horizontal dock port"; the change list gains `shell.css:286-299` per C-1; `π-EVIDENCE` gains a `/dock/rail` cell.

**F-2 · W-DOCK D3: "the library's only recenter is `useSelectionGroup.ts:184-185`." — WRONG twice.**
(a) The call spans `:183-186`, not `:184-185`. (b) It is not the only recenter: `overflow.css:78-79` declares `scroll-padding-inline: var(--dock-scroll-gutter)` as a live scroll-snap-adjacent recenter on the very port `seat()` will drive. Consequence, not pedantry — the seat glide must respect that padding.

**F-3 · W-SLIDER S2: "every ring is clipped." — IMPRECISE, and the imprecision matters.**
`rim.css:90-95` resolves `--glass-material-rim` to **two `inset` arms plus one outer** (`--glass-rim-bottom`); `shadow.css:38` is the root-level all-outer fallback. On `.slider-range` the token arrives by **inheritance**. So when the slider sits inside a rim-group ancestor, the two inset arms **do** paint through `.glass-track-well { overflow: hidden }`; only the outer legs clip. **The cure survives** — the two spread rings the spec targets (`0 0 0 1px`, `0 0 0 2px`) and the `--glass-under-shadow-quiet` fallback leg are genuinely outer and genuinely clipped. But S2's stated *cause* is wrong, and a later round reading "every ring is clipped" would delete the rim leg as dead when it is not.

**F-4 · W-SLIDER S8: "Nine consumer knobs with zero setters." — COUNT ERROR.**
The row lists **six** dead (`--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-shadow`, `--slider-thumb-border-w`, `--slider-thumb-hover-ring-w`, `--slider-thumb-hover-ring-color`) plus **two** live (`--slider-range-bg`, `--slider-thumb-spring`) = eight named, six struck. **The substance is confirmed:** I ran a declaration-form census (`grep -rn -- 'TOKEN *:' src/ demo/`) and all six return **zero setter sites**; the 11–34 raw hits per token are `docs/` archaeology plus the `var(--x, fallback)` consumption sites. Strike six. Fix the count.

**F-5 · W-HANDMARK §Overruled: "0 external consumers ⇒ DELETE — overruled; the dated re-audit owns that call on 2026-09-01." — FALSE against standing authority.**
`PLAN.md:122-124` states the greenfield "carries **FULL first-principles surface authority, the census floor superseded**." The consumer-census date does not gate a ruling that explicitly superseded the census. The overrule was decided against a document the ruling had already outranked.

**F-6 · W-HANDMARK §Overruled: "the vendored `freehand.ts` (379 LOC) is dead weight — Overruled: it is the L2 body for `ribbon:'hull'`." — FALSE against the authoritative design.**
`GF-HANDMARK-PASS3.md:110` deletes perfect-freehand outright ("No perfect-freehand (the vendored `freehand.ts`…)"), and `:185` lists `brush.ts`, `ink.ts`, `noise.ts` among the deletions. The jury's reasoning ("it is mounted in the story") is true and irrelevant: the greenfield replaces the story's bodies.

**F-7 · W-HANDMARK HM-1 cite `ink.ts:167-168`. — CITE DRIFT.**
`const a = centerline[0]` is at `:163`; the deref is at `:167-168`. **The crash is confirmed** — `a` is `undefined` for an empty centerline and `a[0]` throws. The gate's RED-at-HEAD clause stands; the line number does not.

**F-8 · W-TIMELINE Jury: "the BD greenfield landed, so the structural verdicts are already spent." — FALSE as a disposition basis.**
F16 is dated **2026-07-17**, i.e. **after** BD landed. It is the user evaluating the landed BD result. A prior greenfield cannot discharge a verdict issued against its output. Compounded by the spec never naming F16 or ASK-7 at all.

**F-9 · W-AURORA LOC baseline "8,968" — CORRECT, but frame-dependent.**
`.ts`+`.vue` only = 8,968 ✓. The full `src/components/aurora` directory including `.css`/`.md` = **9,205**. The delta is honest under the stated frame; the frame must be stated in the receipt or the +382 will read as a −155 to the next reader.

**F-10 · W-AURORA: "`tests-visual/` executes in no npm script … a gate placed there is born rotten." — TRUE, and it indicts two sibling waves.**
Verified: `vitest.config.ts` includes only `tests/**` and `scripts/**`; no playwright config; no visual runner script; 176 unexecuted spec files. Aurora was the only jury to see this. It invalidates **W-SLIDER's only gate** and reduces **W-TABS' item 4** to doc-truth maintenance (C-6, §5). Aurora is right and the band adopts its finding as a standing rule.

**F-11 · Briefing: "1,095 test cases." — MEASURED 1,125** across 200 files. Drift, not error; the gate budget arithmetic is unaffected.

**F-12 · W-TOAST T4: `pointer-coarse:opacity-100`. — VALID, confirming.**
`pointer-coarse` is a built-in Tailwind v4 variant; installed version is **4.3.3** (`tailwindcss` present in `node_modules/tailwindcss/dist/lib.mjs`). Zero project-side definition needed. Flagged because a plausible jury error here would have shipped an inert class into the exact defect it claims to cure — it did not.

**F-13 · W-TABS §1: `data-active` presented as a new styling seam. — NOT NEW.**
It is the landed corpus idiom (`DockControl.vue:32`, `icon-button.css:182`, `PagerDots.vue:351,:386`, `Configurator.vue:289`) and is already a member of the selectable-state group at `material.css:441-451`. The call is **correct**; the framing is re-invention. Re-framed as adoption in §2 D-2. Verified no accidental paint on landing: `material.css:426-452` requires membership in a disjoint first selector list that `.segmented-tab` does not join.

**F-14 · W-DOCK D4: "4 tokens with ZERO setters." — CONFIRMED TRUE.**
Declaration-form census returns exactly four sites, all defaults in `density.css:53,54,61,62`. No consumer setter in `src/`, `demo/`, or the constellation. The delete is clean; the jury's census method was sound and I record it as verified so the row cannot be re-litigated.

---

## Terminal disposition table

| wave | submitted | **RULED** | gates | LOC Δ | blocked on |
|---|---|---|---|---|---|
| W-DOCK | GREENFIELD | GREENFIELD, **scope widened** (`shell.css`, `BottomDock.vue` layout, 3 doc-truth sites); `useDockItemCensus` struck → fold into `useDockOverflowFit`; `--dock-edge-*` struck → reuse `--fade-*` | 2 | +34 | ASK-16/17/32 parked |
| W-AURORA | GREENFIELD | GREENFIELD, arms 1–4 unconditional; arm 5 renames/deletions land, **DUSK/DAWN park**; graphite/ink **park not cut**; "default if silent" struck; module-budget declared before arm 1 | 1 | +382 | ASK-20, ASK-28 |
| W-SLIDER | KEEP-THIN | KEEP-THIN, unchanged; gate re-homed | 0 (→corpus) | −216 | — |
| W-TABS | KEEP-THIN | KEEP-THIN; gates merged; `data-active` = adoption | 1 | −84 | — |
| W-ALERT | KEEP-THIN | KEEP-THIN; §Open **closed** (X-7); gate generalized | 0 (→corpus) | −4 | — |
| W-TOAST | KEEP-THIN | KEEP-THIN, unchanged | 1 | +12 | — |
| W-HANDMARK | KEEP-THIN | **GREENFIELD** per user ruling (X-1); 2 §Overruled rows struck | 1 | **−1,881** | — |
| W-TIMELINE | KEEP | **HOLDING**, split at ASK-7; T-2 uses existing primitive; W4 adoption added | 0 | −10 | ASK-7 |
| corpus | — | **G-RUNG-MEMBERSHIP**, **G-COARSE-TARGET** | 2 | — | — |

**Band: 6 slots charged + 2 corpus. LOC −1,825 (−3.2%).** Every unowned row assigned. Every ASK-gated arm parked, none self-resolved.