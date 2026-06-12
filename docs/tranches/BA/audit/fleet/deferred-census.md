# BA fleet lane — deferred-census

**Lane:** deferred-census · **Date:** 2026-06-12 · **Base:** master @ HEAD (AZ close, v3.13.0
published) · **Mode:** AUDIT-ONLY (no edits, no git; doc + HEAD-verified census).

## Method

The AZ `audit/FLEET-DIGEST.md` §B1 already assembled a full deferral census (the AX
DISPOSITION-REGISTER's 30 BOOK rows + the AY deferred-ledger-manifest's 30 bookIds +
the FINAL named-successors + the live-gate / W-DELTA0 carries). This lane does the thing
that census could NOT: **re-verify every item at HEAD post-AZ-close** and re-classify, since
AZ DISCHARGED a large slice (the central-CSS carve, the dock-orchestrator route, the TS
god-module split, the tag-parity/legacy gates) and MINTED net-new deferrals (two
constellation god-modules, the MIGRATION version-skip staleness, the teardrop preview, the
luma-observer promotion). Every row below is HEAD-grepped, not inherited.

Classification: **CHRONIC** (deferred ≥ 2 tranches), **RECENT** (minted at AZ), **EXTERNALLY-OWNED**
(a consumer/supplier repo owns the fix — inv-16; never folds into a glass-ui wave).

---

## A — DISCHARGED at AZ (closed; NOT carried — recorded so the BA census is auditable)

These were live deferrals AT the AZ formation that AZ actually closed. Verified GREEN at HEAD.

| was | discharged by | HEAD evidence |
|---|---|---|
| central-CSS carve (dock-controls.css @636 + theme.css @530 — the BOOK(AY.W-CSS1) chronic) | AZ.W-CARVE | `dock-controls.css` now 74 lines, `theme.css` 33; `RATCHET_BASELINES` drained the two CENTRAL rows (proof-no-god-module.mjs:48-69); `proof:no-god-module` PASS |
| TS god-module split (useMetaballRenderer — AX W26 / AY.W17) | AY.W-COLOCATE | `goo-blob/composables/` carries `buildMetaballProgram.ts` + `uploadBlobUniforms.ts` (split landed) |
| tag-parity meta-assert (AX W27a — "NEVER written") | AY.W-LEG1 | `proof:tag-parity` registered (gates.mjs:784) |
| legacy-commentary full-tree sweep (AX W27b) | AY.W-LEG1 / barrel scrub | `proof:no-legacy-commentary` registered + green (gates.mjs:509) |
| dock-orchestrator-single STALE route (`/navigation/dock-layers`) | AZ.W-GATES | `DOCK_ROUTE = "/dock/overview"` (proof-dock-orchestrator-single.mjs:57) |
| :5173 default sweep (the live-gate hygiene chronic) — MOSTLY | AZ.W-GATES | proof-runtime/touch-target/nested-backdrop/dock-animation-live all default :5199; `proof:gate-manifest-sound` NO-5173 clause green (see C-1 for the :5175 residue the sweep MISSED) |
| directional-view-transition JS helper (B1, FOLD candidate) | AZ.W-MORPH-SHOWCASE | `useViewTransition` substrate shipped + consumed by the V↔H crossfade |
| L-tranche W-ADOPT / W-DEPLOY cross-repo arm | AZ.W-ADOPT / W-DEPLOY | slides pinned exact 3.13.0; deploy SUCCESS (PROGRESS rows complete) |
| consumer-staleness tabs ledger — partial | (still 5 open — see EXT-1) | speedtest migrated; fourier×3 + words×2 remain EXTERNALLY-OWNED |

---

## B — RECENT (minted at AZ; FOLD into BA)

### REC-1 — The two constellation god-modules [RECENT · S2]
`constellationField.ts` @586 and `Constellation.vue` @576 breach the 500-line no-god-module
bound; ratchet-grandfathered as `BOOK(AZ.W-REFLECT)` (proof-no-god-module.mjs:65-69). Grown by
AZ.W-CON-GEN (the additive default-OFF generalization). The BOOK names "a cohesion-aware split
or a justified keep, per surface" — never executed at the AZ close (the reflect triumvirate
consumed the band).
**Wave home:** a BA encapsulation/carve wave (the AX-W26 / AY-W-COLOCATE lineage). Same
treatment the dock/tabs/goo-blob feature-dirs got: carve `constellationField.ts` into the
field-build + interaction substrate it already neighbours (`constellationInteraction.ts` @488),
OR record a justified DO-NOT-SPLIT keep with the cohesion rationale. **Pairs with R8-15**
(constellation as a page background gains more consumers → more reason to make the file legible).

### REC-2 — typography.css @530 god-module [RECENT · S3]
`typography.css` is the THIRD grandfathered row (`BOOK(AZ.W-REFLECT)` — grown by
W-SUFFUSE/W-HIERARCHY's display-ladder + section-rung additions). Same carve-or-keep verdict
owed.
**Wave home:** the same BA carve wave as REC-1 (CSS arm — split `typography.css` into
`typography/{scale,semantic,utilities}.css` thin `@import` partials, the W-CARVE pattern).
**Pairs with R8** suffusion work (the type ladder is touched by nearly every R8 design item).

### REC-3 — MIGRATION.md version-skip staleness [RECENT · S3]
`MIGRATION.md` carries "**v3.11.0 (AZ, staged)**", "BREAKING (3.12.0 staged)", "ADDITIVE
(3.12.0 staged)" headers (MIGRATION.md:36,52,56,59) — but the cut SKIPPED to **v3.13.0** (the
3.11/3.12 lineage was stale-out-of-band; FINAL §5). The "staged" labels and the 3.11/3.12
version anchors are now stale-at-published: a consumer reading MIGRATION sees a version map that
does not match the registry. The taxonomy/metric/constellation/veil breaks ALL actually shipped
in 3.13.0.
**Wave home:** a BA housekeeping/close hygiene wave (or the BA close's MIGRATION reconcile
step) — re-anchor every "staged" note to the published 3.13.0 and drop the "(staged)" qualifier.
Mechanical; no code.

### REC-4 — The metaball-teardrop V↔H morph (perf-gated preview) [RECENT · S2]
W-MORPH-SHOWCASE H4 fell MECHANICALLY to the View-Transitions crossfade (arm c) because the
metaball-bridge missed the 4×-throttle budget (p50 13.7-15.1ms vs the 16.7ms cap; gperf trace in
`W-MORPH-SHOWCASE-DELTA.md`). The higher-fidelity teardrop ships only as a perf-gated PREVIEW
toggle. **R8-2 re-opens this as a USER defect:** "we should have a facility to demonstrate the
robust dock liquid glass facilities, which would smoothly interpolate and animate a vertical dock
to be horizontal and vice versa" — the user wants the morph in the SHELL/demo docks in-situ, not
just the showcase story.
**Wave home:** a BA dock-morph wave (the R8-2 cluster). Two sub-asks: (a) demonstrate the
existing crossfade morph in the shell docks (R8-2's primary), (b) advance the teardrop fidelity
toward always-on — but the §7 mechanical-fall discipline holds (the NUMBER decides; a successor
that cannot clear the budget stays a preview, no triumvirate).

### REC-5 — useGlassBackdropLuminance public-barrel promotion [RECENT · S3]
The sampled-luminance observer ships DEMO-PRIVATE (path B; `docs/consumer-evidence/use-glass-
backdrop-luminance.md`). The dock is binary consumer #1; the booked trigger is a 2nd BINARY
consumer (a content-glass library surface or a downstream binary wiring it).
**R8-11/R8-12 may TRIP the trigger:** R8-12 mandates "ALL of our components should be glassy by
default" with glass/veil variants over aurora backgrounds, and R8-11 wants card/variant/veil demos
on aurora — if a `<Card>`/`<Section>`/toast that floats over a live aurora adopts the dynamic
darken (rather than the static bucket), THAT is binary consumer #2.
**Wave home:** booked-trigger, not force-built. If the BA glass-variant-census wave (R8-12)
lands a content-glass surface over a live substrate that needs the dynamic darken, promote to a
public barrel export THAT wave (path A). Otherwise stays path B. Recorded, not folded blind.

### REC-6 — W-MOTION3: live-parameterized steppedEase(n, term) generator [RECENT · S3]
The MOTION2 G7 defer — a live `steppedEase(n, term)` control exposing n + the 7 jump-terms as a
Custom-family sub-editor (W-MOTION2 §11). Out of MOTION2 scope (a sub-editor per Steps card would
bloat the gallery). **R8-10 re-opens the motion-gallery ask:** "The fourier field component needs
better demos, a configurator, and more options… more robust, beautiful procedural fourier
animations of both epicycles AND summed harmonics." The richer motion gallery R8-10 wants is the
natural home for the live steps generator.
**Wave home:** a BA motion/fourier-field wave (the R8-10 + R8-16 + R8-17 cluster — the curve
gallery + the fourier-field demos + the play control). Fold W-MOTION3 into the gallery rebuild.

### REC-7 — embla-on-overflow rail-chip promotion [RECENT · S2]
The rail chip strip (`<DockRail>` / W-RAIL3) uses a plain `overflow-x: auto` + scroll-snap strip;
the embla `Carousel` momentum-paging fold is booked IF a real facet set overruns the inline budget
(most carry 2-4 chips). **R8-8 + R8-1 + R8-6 re-open this whole region:** R8-8 names a library
FADING-SCROLL component ("This sort of element should be a glass-ui component, like a fading
scroll list… compatible with vertical scrolling too"), R8-6 names the macOS-dock-style fan-out
contract, R8-1 names the rail mis-alignment. The deferred embla fold is one facet of a much larger
R8-mandated rail/fading-scroll redesign.
**Wave home:** a BA rail + fading-scroll-component wave (the R8-1/R8-6/R8-8 cluster). The booked
embla promotion folds in as the overflow-momentum half of the new fading-scroll primitive.

### REC-8 — SHELL-IA-N1: desktop double-carousel [RECENT · S3]
The same facet strip renders BESIDE the sidebar AND above the bottom dock (two genuine
affordances; logged S3 non-gating at the AZ close). FINAL §6 books "a successor weighs collapsing
one." **R8-1/R8-9 touch the same region** (the rail seating + the dock section model).
**Wave home:** folds into the BA rail wave (REC-7's cluster) as a sub-decision — the rail redesign
naturally resolves whether one or two carousels survive.

### REC-9 — The AY W-DELTA0 stale-hash re-captures [RECENT→CHRONIC boundary · S3]
Five AY DELTAs (W-DOCK1/W-CON1/W-DOCK2 + 2) carry capture-commit `83e1e3b2` + `superseded-by`
headers; graced on the bare freshness arm, RED under `--strict-freshness`. Booked to "the next
tranche's Batch-0 re-capture sweep" (FINAL §6). Originally an AY carry the AZ digest classified
FOLD-TO-AZ ("the AZ dock rebuild re-renders these surfaces, so the own-wave-id re-capture happens
naturally") — but the AZ waves captured under their OWN ids (W-RAIL3/W-DOCK-RAIL DELTAs), so the
AY-pathed W-DELTA0 re-shoots were NEVER done. This is sliding toward CHRONIC (AY→AZ→BA).
**Wave home:** the BA Batch-0 / W-GATES-equivalent freshness re-stamp. Either re-shoot the 5 AY
DELTAs under their own ids, OR formally RETIRE them as superseded (the surfaces no longer exist in
the AZ form — the dock rebuild changed them). Recommend RETIRE-with-rationale over re-shoot (the
captured surface is gone).

---

## C — CHRONIC (deferred ≥ 2 tranches; the few that survive AZ; FOLD into BA)

### CHR-1 — The :5175 live-gate residue (the :5173-sweep's blind spot) [CHRONIC · S2]
AZ.W-GATES swept :5173 → :5199 and authored `proof:gate-manifest-sound` with a NO-5173 clause
(proof-gate-manifest-sound.mjs:132 — regex `:5173` ONLY). But THREE dock gates still default the
OTHER legacy port **:5175**, which the sweep + the gate regex both MISS:
- `proof-dock-clip-reveal.mjs:300` — `?? "http://localhost:5175"`
- `proof-dock-big-dock.mjs:304` — `?? "http://localhost:5175"`
- `proof-dock-layering-polish.mjs:451` — `?? "http://localhost:5175"`
Plus `profile-aurora.mjs:24` still defaults `:5173` (a profile script, outside the live-gate set —
lower priority but the same class). The AZ digest flagged the :5175 trio (B1-live-gate-5173-sweep)
as FOLD-TO-AZ; the sweep landed but did NOT cover :5175 (the gate only forbids :5173, so :5175
sailed past). This is a true CHRONIC carry: AY.W-LIVE1 booked it → AZ.W-GATES partial → BA.
**Wave home:** a BA live-gate-hygiene wave (or fold into the BA close's W-GATES-equivalent).
Mechanical: re-point the 3 :5175 defaults + the profile-aurora :5173 to :5199, AND extend
`proof:gate-manifest-sound`'s NO-5173 clause to ALSO forbid :5175 / any non-:5199 default (close
the regex blind spot so a future stray port cannot recur — this is the recurrence-proofing the
chronic demands).

### CHR-2 — The AX W33 formal close (FINAL.md, overfitting, budget rebaseline) [CHRONIC · S3]
AX was never formally closed via W33 — the AX PROGRESS treats it as "a closed historical record"
(PROGRESS:45) with W25/26/27/W33 left `planned` (Task #139/#140 still pending). The SUBSTANTIVE AX
work (god-module carves, gate hardening) was ABSORBED into AY/AZ (see section A), so the close
itself is the only residue. AX's own FINAL.md does not exist.
**Wave home:** NOT folded as new work — RETIRE the AX W33/W25/W26/W27 pending rows with a one-line
"absorbed by AY.W-COLOCATE/W-LEG1 + AZ.W-CARVE; AX superseded by the AY→AZ close cadence" note in
the BA close. The orphaned Task #139/#140 should be marked superseded. No FINAL.md is owed (AX is
historical; the AY/AZ FINALs are the operative close records).

### CHR-3 — The AX/AY DISPOSITION-REGISTER long-tail (28 BOOK rows, all un-MET) [CHRONIC · S3]
The AX DISPOSITION-REGISTER's ~28 ≥2-consumer-gated BOOKs (native-drawer-as-asChild [FOUNDING
CHRONIC, 5-tranche carry], panel-host-primitive, interruptible-reorder, deck-subpath, button-icon-sm,
dock-select-clamp-label, tooltip-mono-variant, select-size, spring-crisp-token, metric-badge-icon,
completion-seal-family, labeled-field-for-id, speedtest-a11y-bundle, raf-loop-demand-park,
styles-critical-split, cross-document-vt, css-scope-state, css-at-function, interestfor-previews,
css-text-box-trim, css-interpolate-size, css-relative-color, glass-native-select-pilot,
glass-dialog-native-pilot, inline-edit-primitive, labeled-slider-readout, drawer-content-spring,
cartoon-quiet-preset) are all CORRECTLY held — each is substrate-without-a-2nd-consumer (L
invariant 8). They are NOT defects; they are the no-overfitting discipline working as designed.
**Wave home:** NONE — these do NOT fold (folding them would violate L-inv-8). The BA close
RE-STAMPS the register "all triggers re-evaluated un-MET at BA; the gate cross-check holds"
(`proof:disposition-live`). The ONE candidate worth a BA hinge:
- **`button-icon-sm` + `select-size`** pair as a "control-size-vocabulary" fold IF BA does a
  control-sizing wave (the AZ digest named this fold). R8 has no direct sizing ask, so it stays
  BOOK'd unless a BA wave touches control sizing.
- **`css-relative-color`** is named a FOLD candidate IF BA touches dock-hover/accent/scrim tint
  SFCs — and R8-3/R8-4/R8-12/R8-18 (the configurator + de-disco + glass-variant + hover work) DO
  touch those. If a BA wave re-authors a tint recipe, paying the `oklch(from …)` diff deletes a
  canvas-2d probe. Recorded as an opportunistic fold, not a forced one.

---

## D — EXTERNALLY-OWNED (consumer/supplier repos; never fold into a glass-ui wave — inv-16)

### EXT-1 — The 5 consumer tabs-migration DEFERRED rows [EXTERNALLY-OWNED · CHRONIC]
`docs/tranches/AY/audit/W-CONSUMER-ledger.md:37-41` — fourier-analysis ×3 (`UnderlineTabs` →
`SegmentedTabs variant="underline"` in EquationView/GalleryView/VisualizationView), words ×2
(`BouncyToggle` → `SegmentedTabs` in LookupControlsPanel/WordlistControlsPanel). glass-ui's surface
is FIXED (SegmentedTabs is the canonical receiver; the deleted family is no-alias). The receiver
wave is in EACH CONSUMER's own tranche (`fourier-analysis I.W-TABS-MIGRATE`, `words A.W-TABS-MIGRATE`).
**Wave home:** NONE in BA. glass-ui owns only the forcing-function gate (`proof:consumer-staleness`,
the ledger DEFERRED-with-terminal allowlist holds it from RED). BA re-stamps the ledger; the fix is
the consumers' job. Flag at the next consumer touch.

### EXT-2 — fourier-analysis phantom-classes (Q.W4 Lane-F patch) [EXTERNALLY-OWNED · CHRONIC]
`proof:phantom-classes` is RED-by-design: 8 `.glass-{subtle,medium}` refs + 3 `cartoon-card` sites
in `fourier-analysis/web` reference classes glass-ui DELETED (they render silently un-styled). The
un-applied Q.W4 patch lives at `docs/tranches/Q/audit/W4-Lane-F-fourier.patch`; the handoff
condition ("after the fourier session commits its WIP") is STILL OPEN (their tree carries live
tranche-E WIP). glass-ui src/+demo are CLEAN; `PROOF_PHANTOM_ALLOW_PENDING=1` greens the glass-ui
side (never wired into CI). FINAL §3 disposition 1.
**Wave home:** NONE in BA — the fourier-analysis repo owns the apply (inv-16). BA re-flags the
pending handoff. fourier is also badly pin-stale (`^3.1.0`) — a full re-pin would surface more
retired-class breakage (the named `fourier full 3.13.0 re-pin` successor, W-KF-CONSUMER §7).

### EXT-3 — value.js self-alias (proof:resolution pending) [EXTERNALLY-OWNED · RECENT]
`proof:resolution` logs a `[pending]` for the value.js demo's own `@mkbabb/value.js` → `dist/`
hard alias (a deliberate N.W1.C mechanism in THEIR repo; proof-resolution-contract.mjs:80). A
self-alias cannot break the cross-repo glass-ui→sibling path the gate guards; the entry is removed
when their tranche-N reconciles alias-vs-exports-map. FINAL §3 disposition 2.
**Wave home:** NONE in BA — value.js session owns it. BA re-stamps the pending log.

### EXT-4 — proof:resolution bbnf-lang consumer hard-alias [EXTERNALLY-OWNED · CHRONIC]
The bbnf-lang/playground consumer hard-alias (DOCUMENTED-EXPECTED; glass-ui-side clean; pending
AG-GU0/GU2/GU4). Skips-pass on the clean CI runner. The bbnf-lang repo owns the consumer fix
(inv-16).
**Wave home:** NONE in BA.

### EXT-5 — R5-9 / R5-10 (slides-bank lift candidates) [EXTERNALLY-OWNED→FOLD boundary · RECENT]
Two round-13 slides-bank items booked to "lift WHOLESALE on wave cadence" (FINAL §6):
- **R5-9 — deck PAGE-TURN primitive** (`[data-state]{active|prev|next}` + `--turn-*` tokens +
  mode-adaptive cast-shadow gutter; reference rides slides `src/styles/deck.css`). Gated on a 2nd
  repo importing a deck primitive (the `deck-subpath` chronic, CHR-3). Single repo-consumer
  (slides) < 2 → stays BOOK'd.
- **R5-10 — glass MENU-ROW + PANEL-SECTION recipes** (`.glass-menu-row` CVA for
  DropdownMenuItem/ContextMenuItem + `.glass-menu-section` mono-caption/hairline + roomier panel
  padding; slides `DeckSettings.vue` is the reference + first consumer). **R8-12 is the forcing
  function:** "ALL of our components should be glassy by default and consistent in their variants…
  buttons, dropdowns, popovers, toasts" — the glass MENU-ROW is exactly the dropdown/context-menu
  glass register R8-12 mandates as a LIBRARY default.
**Wave home:** R5-10 FOLDS into the BA glass-variant-census wave (R8-12 cluster) — it has a NOW
2nd consumer (the library's own dropdown/context-menu defaults the census demands + slides). R5-9
stays EXTERNALLY-gated (the deck-subpath 2-repo trigger un-MET) — recorded, not folded.

### EXT-6 — keyframes.js prune+migration DAG (AX W35 residual) [EXTERNALLY-OWNED · CHRONIC]
A CROSS-REPO supplier edge (keyframes.js is the publisher; glass-ui re-pins on publish). un-MET (no
consumer adopts a migration-DAG yet). keyframes.js CI publish is still broken (MEMORY
`project_publish_ci_broken` — keyframes publish local).
**Wave home:** NONE in BA — supplier-owned.

---

## E — Synthesis: the BA fold ledger

**FOLD into BA (chronic + recent that are glass-ui-owned):**

| id | item | proposed BA wave home | R8 forcing function |
|---|---|---|---|
| REC-1 | constellationField.ts/Constellation.vue carve (×2 god-modules) | BA encapsulation/carve wave | R8-15 (constellation backgrounds) |
| REC-2 | typography.css carve | same BA carve wave (CSS arm) | R8 suffusion (broad) |
| REC-3 | MIGRATION version-skip reconcile to 3.13.0 | BA close hygiene | — |
| REC-4 | metaball-teardrop V↔H morph in shell docks | BA dock-morph wave | **R8-2** |
| REC-5 | useGlassBackdropLuminance promotion (booked-trigger) | BA glass-variant-census (if trigger trips) | R8-11/R8-12 |
| REC-6 | W-MOTION3 live steppedEase generator | BA motion/fourier-field wave | **R8-10** |
| REC-7 | embla-on-overflow → fading-scroll primitive | BA rail + fading-scroll wave | **R8-1/R8-6/R8-8** |
| REC-8 | SHELL-IA-N1 double-carousel resolve | folds into REC-7's rail wave | R8-1/R8-9 |
| REC-9 | AY W-DELTA0 re-captures (RETIRE-superseded recommended) | BA Batch-0 freshness re-stamp | — |
| CHR-1 | :5175 live-gate residue + NO-5173 regex blind spot | BA live-gate-hygiene wave | — |
| CHR-2 | AX W33/W25/W26/W27 close (RETIRE-absorbed) | BA close (one-line supersede note) | — |
| EXT-5b | R5-10 glass MENU-ROW/PANEL-SECTION recipes | BA glass-variant-census wave | **R8-12** |

**DO NOT FOLD (held by design):**
- CHR-3 — the ~28 DISPOSITION-REGISTER ≥2-consumer BOOKs (L-inv-8; re-stamp un-MET; the
  `button-icon-sm`+`select-size` and `css-relative-color` opportunistic folds only IF a BA wave
  independently touches control-sizing / tint recipes).
- EXT-1/EXT-2/EXT-3/EXT-4/EXT-6 + R5-9 — externally-owned (consumer/supplier repos; inv-16) or
  un-MET-2nd-consumer-gated. BA re-stamps the ledgers; the fixes are not glass-ui's.

**The headline trend:** AZ DISCHARGED most of the AX→AY chronic backlog (the central-CSS carve,
the god-module split, the gate hardening, the dock-route, the :5173 sweep, the cross-repo
adopt/deploy). What survives is (1) a small RECENT crop AZ itself minted — most of which R8 has now
given an independent forcing function (R8-1/2/6/8/10/12 each re-open a deferred surface), and (2)
the durable no-overfitting BOOK long-tail that should NOT fold. The chronic count is DOWN tranche-
over-tranche — the only true new chronic is CHR-1 (the :5175 blind spot the :5173 sweep created).
