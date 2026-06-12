# BA — the execution DAG (the hardened roadmap)

The one sequencing artefact for the BA tranche. It expands `BA.md`'s 8-batch roster into
the dependency rationale: why the dark register is Batch 1, why the shell-hold fix is
Batch 0, the write-bound coordination seams, and the hinge gates per batch. Authored in
the AUTHORING phase — NO implementation runs until the user greenlights (BA invariant 2).

**HEAD:** glass-ui `master @ v3.13.0` (the AZ close cut, published with provenance,
`latest` on npm). slides exact-pins 3.13.0 (commit a171266, deployed). The BA branch is
`tranche/BA` off master.

**Numbering:** the `W-*` named system from `BA.md`'s 29-wave roster (24 at first
authoring + the R9/R10 pre-greenlight amendments W-NO-GRAY/W-TABS/W-PAGER + the
atlas-letter folds W-ATLAS-RECONCILE/W-HANDMARK). The five user-domain
hinges (H1 dark-material direction, H2 gold-CTA post-disco form, H3 rail disposition,
H4 version, H5 publish/deploy creds) gate the named batches.

---

## §0 — the user-domain hinges (the manual gates agents never execute)

- **[H1] dark-material direction** — at Batch 1 (W-DARK-MATERIAL). Recommend (a) the
  luminous-dark transmissive material: a real ΔL elevation ladder + the dark-glass
  luminosity lift + the dark tint-seam arm + chromatic dark `--primary`. Arm (b)
  (token-gap-only) is specced as the fallback; the agent does not pick.
- **[H2] gold-CTA post-disco form** — at Batch 4 (W-GLASS-CAL). Recommend (a) gold
  survives CALM (static wash + edge catch-light; every animated sweep/sparkle/grain
  retires). The user's "remove the disco effect everywhere" decides the retirement; the
  hinge is only whether gold's STATIC register survives it.
- **[H3] rail disposition** — at Batch 3 (W-DOCK-SECTIONS). Recommend (a) the rail
  persists re-seated at the divider seam with both-side overrun + the fan-out/retract
  contract — this is the user's own R8-1/R8-6 language, so (a) is near-decided; the
  hinge exists because BA-DSM-2 legitimately asks whether the section redesign absorbs
  the hairline entirely.
- **[H4] the cut's version** — at Batch 7 (W-CLOSE). Recommend (a) 4.0.0: the disco
  retirement breaks btn-audacious/gold consumers (speedtest + slides), the tone
  recompose changes feedback rendering, the scroll-fade utilities retire — an honest
  major.
- **[H5] publish + deploy creds** — at Batch 7. The v* tag publish is CI-gated; the
  slides deploy hands to the slides session per the adopt book.

Decided (no hinge): the curve-picker chip-rack direction, the global disco retirement,
the ~15–20% blur dial-back.

---

## §1 — why Batch 0 is the floor

**W-SHELL-HOLD is the single highest-priority diff in the tranche** despite being the
smallest: the shell docks' `railContext` writable-computed pushes a route on
mount/normalization, so the demo auto-navigates away from any landed story within ~1s
(FD-FS-4). Every later wave's live verification — every π readback, every gestalt
capture — silently races this bug. It lands first, alone, verified by a hold-the-page
probe (navigate → wait 3s → assert route unchanged).

**W-GESTALT-GATE mints the tranche's acceptance bar before any visual wave runs.**
`proof:ba-gestalt` is born-RED against the R8 state (the R8 captures are the RED
evidence), so the bar exists from day one and every visual wave closes against it —
the P-1 close-class fix is structural, not aspirational. The same wave clears the gate
hygiene (the 3 `:5175` defaults + `:5173` profile-aurora + the manifest-sound widening)
so live gates run against the right server for the whole tranche.

**W-HYGIENE + W-CARVE2** clear the mechanical close-debt early so the close (Batch 7)
is not a debt-flush — the AZ close surfaced ~25 latent defects precisely because debt
accumulated to the cut. All four Batch-0 waves are mutually disjoint (gates/scripts ·
shell-dock guard · docs/submodule · typography+constellation).

## §2 — why W-DARK-MATERIAL is Batch 1, alone

BG-6 names the sequencing: the dark register's flatness is the mechanical root under
R8-11/12/13/15/16/19 — more than a third of all findings. Staging waves (Batch 6)
capture over backdrops; census waves (Batch 4) π-assert composited colors; the gestalt
bar judges whole pages. ALL of that work is wasted if captured over a broken dark
register, and the token edits (page floor, card, rung α, tint seam, `--primary`,
`--surface-tint-*`) reach every downstream surface. It runs ALONE because its write
bound (the token files + the glass ladder) is the substrate every other wave reads —
nothing may race it.

The contrast-color() inversion fix rides here (not in a demo wave) because it is a
library-seam defect (the adaptive refinement layer) with systemic reach — every
muted/active pairing inside a glass card inverts today.

## §2a — Batch 1b: W-NO-GRAY (sequenced after W-DARK-MATERIAL)

The R10-5 "No gray" bar made mechanical: the warm-48 neutral ladder RESOLVES
achromatic (the census's one systemic root — C 0.002–0.016 below the ~0.020 floor).
It is Batch 1b for the same reason W-DARK-MATERIAL is Batch 1a: the token ladder is
the substrate every later capture composites over, and both waves write the token
files — SEQUENCED, never parallel (dark register first, then the light register's
chroma floor + glass-plate warm bias + border re-anchor on the rebuilt base). Batch 2
opens only after 1b's live verdict.

## §3 — Batch 2: the S1 redress band (4 parallel waves)

| wave | write bound (primary) |
|---|---|
| W-CONFIG-CHASSIS | src/components/custom/configurator/*, src/components/custom/labeled-field/*, demo/configurator/*, demo/stories/aurora/sections/AuroraColorSection.vue, demo/stories/aurora/presets.ts |
| W-GOO-REDRESS | src/components/custom/goo-blob/* (the wake seam + satellite envelope), demo/stories/substrates/blob.vue (STUDIO_GEO_BASE) |
| W-DOCK-GEOMETRY | src/styles/dock/{shell,overflow}.css, src/styles/dock-controls/* (geometry only), demo/layout/{BottomDock,SidebarDock}.vue (the overflow prop only) |
| W-FADING-SCROLL | src/components/custom/fading-scroll/* (create), src/styles/utilities/base.css (the .scroll-fade-* retirement), demo/stories/aurora/PresetPickerRow.vue, src/styles/segmented-tabs.css (the overflow mask re-point) |
| W-ATLAS-RECONCILE | src/composables/dark/* (the settle seam + reflow deletion), src/components/custom/controls/DarkModeToggle.vue + src/styles/utilities/a11y-overrides.css (the carve), src/composables/motion/useViewTransition.ts, src/components/custom/aurora/constants/presets.ts (PAPER_WASH_GROUND), the silver/chassis conditional pair |

Coordination seams (declared, not raced):
- **Configurator.vue's `.scroll-fade-y`**: W-FADING-SCROLL mints the primitive and
  retires the static utilities LAST (a final retire commit at batch close, orchestrator-
  owned); W-CONFIG-CHASSIS adopts the primitive inside its own file bound. No file is
  written by both waves.
- **The shell docks**: W-DOCK-GEOMETRY touches ONLY the `overflow` prop on
  BottomDock/SidebarDock (one attribute per file); W-SHELL-HOLD (Batch 0, already
  landed) owns the railContext guard. The Batch-3 section rebuild supersedes both
  surfaces — acceptable because Batch 2's fixes are correctness floors the rebuild
  inherits, not throwaway styling.
- **The goo "jittery" defect is split by mechanism**: the renderer half (wake seam) is
  W-GOO-REDRESS; the CSS register half (toggle-chip easing) is W-GLASS-CAL (Batch 4).
  The W-REFLECT2 goo verdict checks BOTH landed.

## §4 — Batch 3: the dock re-conceived (sequenced internally)

W-DOCK-SECTIONS → W-DOCK-MORPH-INSITU, because both write the shell docks and the morph
demo's home IS the rebuilt section chassis. W-DOCK-SECTIONS is the 4th rail attempt and
carries inv-6: the anchor topology is decided in the SPEC (divider-seam seat, both-side
overrun, flush fan-out, collapse-retract with protrusion) — the wave doc's §design is
binding, and a lane that finds the topology unimplementable triggers the triumvirate
rather than landing workaround #4. It consumes `<FadingScroll>` (Batch 2) for chip
overflow and folds the booked embla-on-overflow momentum.

## §5 — Batch 4: the glass grammar (5 parallel waves)

Write bounds are component-family-disjoint by construction: W-SURFACE-AXIS (card/
glass-panel/dialog/sheet/drawer/popover/command/expandable-container/skeleton),
W-FEEDBACK-TONE (toast/notification/alert + proof-glass-cohesion.mjs), W-MENU-GLASS
(_shared/menuItemVariants.ts + dropdown/context-menu styles), W-GLASS-CAL (tokens/
glass.css blur primitives + utilities/btn.css + dock-controls/tab-button.css +
toggle-chip), W-PROGRESS-GRADIENT (progress/*).

One declared seam: W-SURFACE-AXIS mints the shared surface mixin/prop; W-FEEDBACK-TONE
and W-MENU-GLASS CONSUME it (tone rides on the glass surface arm; menu rows expose the
axis). The mixin lands in a file only W-SURFACE-AXIS writes; consumers import. If the
mixin's shape blocks a consumer wave, that is a scope-reveal trigger (triumvirate), not
a license to fork a second axis.

W-GLASS-CAL must land BEFORE Batch 6 captures (the blur dial-back changes every glass
surface's render — captures taken pre-cal would all stale at the cal).

### §5a — the Batch-4 intra-batch edge: W-GLASS-CAL.3 → W-TABS

W-TABS (the R10-2 overhaul) joins Batch 4 with ONE declared edge: its indicator clock
consumes the `--spring-<name>-duration` vocabulary that W-GLASS-CAL's unit 3 (the
spring clock — the R10 [S1] springLinearStops-discards-response fold) mints. W-GLASS-CAL
sequences unit 3 FIRST within its wave; W-TABS opens after that unit's commit lands.
All other Batch-4 disjointness holds (W-TABS owns `custom/tabs/*` + `ui/tabs/*` +
`segmented-tabs.css` + the tabs story — no sibling writes them). Two further W-TABS
consume-seams, both cross-batch and ordered by construction: `.paper-ink-mark`
(minted by W-SURFACE-AXIS scope 8, same batch — the underline register consumes it,
a shape gap triumvirates at the minting wave) and `<FadingScroll>` (Batch 2, landed).

## §6 — Batches 5–6: promotions, then the demo staged

W-ICON-CHIP (Batch 5) precedes W-SUFFUSE2 (Batch 6) because the pop map's vehicle is
the chip primitive. W-PAGER (Batch 5, ‖ W-ICON-CHIP — disjoint bounds) carries the
R10-1 ring + the R10-3 deck-dots fold; it sits in Batch 5 because the ring is
glass-floating over the Batch-1 rebuilt registers and its `.glass-pager-ring` write
to `glass/surfaces.css` must precede W-DEMO-AFFORDANCES's Batch-6 negative-predicate
edit to the same file (sequenced by batch order — recorded in §9). Batch 6's five
waves are demo-side and parallel:

| wave | write bound (primary) |
|---|---|
| W-STAGE | demo/stories/manifest.ts, demo/stories/{StoryHero,ShowcaseFrame,StoryPage}.vue + story-hero.css, the token-tour stories, a demo dock-stage chassis (create) |
| W-DEMO-AFFORDANCES | demo/stories/motion/curve-gallery.vue, demo/stories/feedback/toaster.vue, the hand-rolled-plate stories, src/styles/glass/surfaces.css (the stack negative-predicate only) |
| W-FOURIER-STUDIO | demo/stories/substrates/fourier-field.vue (+ a studio story create), src/components/custom/fourier-field/* (the clock seam + partial-sum axis), the steps sub-editor in the gallery |
| W-SUFFUSE2 | the category eyebrow/accent stories, demo/stories/StoryPage.vue (the h1 rung — COORDINATION: StoryPage belongs to W-STAGE's bound; W-SUFFUSE2's h1 change is a one-rung token edit W-STAGE lands on its behalf) |
| W-ANIMATE | demo/layout/AppShell.vue (the Transition wrapper + scroll-progress bar), the story chassis entrance hooks (COORDINATION: StoryHero/StorySection edits land via W-STAGE's bound; W-ANIMATE owns AppShell + the data-attribute wiring) |

The chassis files (StoryHero/StorySection/StoryPage/ShowcaseFrame) have ONE writer:
W-STAGE. W-SUFFUSE2 and W-ANIMATE declare their chassis needs as literal diff blocks in
their specs; W-STAGE applies them (the AZ literal-markdown-block triumvirate idiom,
used proactively). W-DEMO-AFFORDANCES consumes ShowcaseFrame's captioned-frame
affordance, never edits it. W-FOURIER-STUDIO consumes the play register from
W-DEMO-AFFORDANCES — sequenced: W-DEMO-AFFORDANCES lands its play-control unit first
(declared as its agent-unit 1).

## §7 — Batch 7: the close

W-REFLECT2 (the gestalt reflection, triumvirate-looped until operative-PASS) →
W-CLOSE (battery → MIGRATION → version hinge H4 → tag publish hinge H5 → disposition
re-stamps → FINAL → the slides adopt/deploy book). The az-final precedent holds: the
prior close gate (`proof:az-final`) retires from the release set at this cut; the
historical retirement rides W-CLOSE.

## §8 — the full order

```
Batch 0:  W-SHELL-HOLD ‖ W-GESTALT-GATE ‖ W-HYGIENE ‖ W-CARVE2
Batch 1:  W-DARK-MATERIAL → W-NO-GRAY                       [H1]
Batch 2:  W-CONFIG-CHASSIS ‖ W-GOO-REDRESS ‖ W-DOCK-GEOMETRY ‖ W-FADING-SCROLL ‖ W-ATLAS-RECONCILE
Batch 3:  W-DOCK-SECTIONS → W-DOCK-MORPH-INSITU             [H3]
Batch 4:  W-SURFACE-AXIS ‖ W-FEEDBACK-TONE ‖ W-MENU-GLASS ‖ W-GLASS-CAL ‖ W-PROGRESS-GRADIENT ‖ W-TABS   [H2]
          (intra-batch edge §5a: W-GLASS-CAL.3 spring-clock → W-TABS)
Batch 5:  W-ICON-CHIP ‖ W-PAGER ‖ W-HANDMARK
Batch 6:  W-STAGE ‖ W-DEMO-AFFORDANCES ‖ W-FOURIER-STUDIO ‖ W-SUFFUSE2 ‖ W-ANIMATE
Batch 7:  W-REFLECT2 → W-CLOSE                              [H4 DECIDED 4.0.0][H5]
```

Close criteria: `BA.md §Completion criterion` — the gestalt roster operative-PASS, the
S1 redresses held, the battery green on a clean runner, the cut published, FINAL with
zero unnamed deferrals.

---

## §9 — post-authoring bound sharpenings (from the wave-spec fleet's DAG cross-checks)

Every spec-authoring agent cross-checked its bounds against §3–§7; the flagged seams,
folded back here as BINDING refinements (each is also recorded in the owning spec):

1. **The gate-registry surfaces (`package.json` + `scripts/gates.mjs`) are shared
   append-only registers.** Multiple waves register gates; each appends its OWN
   row/script key and the orchestrator sequences the registration commits (or lands
   them on clean shared main per WAVE_SPEC §4b). No two waves write the same row.
   `proof:ba-gestalt` ownership chain: W-GESTALT-GATE mints it `["local"]`-tagged
   born-RED → W-REFLECT2 flips verdicts + promotes the tag to the operative close set
   → W-CLOSE consumes via `proof:ba-final`, never re-writing a verdict.
2. **Batch 2 `blob.vue` region split** (the one seam §3 missed): W-GOO-REDRESS owns
   the `STUDIO_GEO_BASE` renderer-geometry constants; W-FADING-SCROLL needs the
   mood-row preset-strip template (`blob.vue:404`). Region-disjoint; the orchestrator
   sequences the two hunks (or hands the one-line mood-row wrap to W-GOO-REDRESS's
   commit per the W-FADING-SCROLL spec's declared options).
3. **W-CONFIG-CHASSIS bound sharpenings**: + `demo/stories/aurora/usePresetThumbnails.ts`
   (the preview alpha-clamp lands at the `freezeCfg` bake seam, the cleaner root than
   `presets.ts:450`), + `src/api/index.ts` and `src/subpaths/` (the new swatch-register
   package registration).
4. **W-DOCK-GEOMETRY** adds `src/styles/dock/density.css` under the "geometry only"
   umbrella (the `--dock-control-safe-inset` mint lives in the density cascade) — a
   within-bound expansion, no sibling writes any dock path in Batch 2.
5. **W-FOURIER-STUDIO's one `manifest.ts` route row** is an orchestrator-applied
   literal-diff insertion (W-STAGE owns `manifest.ts`; the regions are disjoint but
   single-writer holds).
6. **W-GLASS-CAL × `AuroraColorSection.vue`**: the file is W-CONFIG-CHASSIS's Batch-2
   bound; Batch 4 touches it ONLY-IF-forced (the calm-CTA re-point keeps the variant
   keys so demo call sites inherit with zero rename).
7. **Brief-vs-reality reconciliations recorded by the specs** (disk truth wins): the
   IconChip paste sites are icons/empty-states/`auth-shell.vue:99-100` (settings.vue
   composes the eyebrow register — W-SUFFUSE2's bound); the menuItemVariants consumer
   fan is 13 SFCs at HEAD (not the lane's 9); the CLAUDE.md custom/ enumeration omits
   FIVE dirs (underline/ included); `Constellation.vue` is 576 lines on disk vs the
   577 ratchet baseline (mechanical drift, resolved by the carve).
8a. **The atlas-fold seams** (the letter's reconciliation): (i) THE THREE-UNDERLINE
   FENCE — `.paper-ink-mark` (W-SURFACE-AXIS mints, W-TABS consumes) is the STRAIGHT
   structural hairline and is NEVER wobbled; `HandMark shape="underline"`
   (W-HANDMARK) is the hand-voice wobble and ABSORBS GlassUnderline (`/underline`
   retires, DEC-8 outcome 1); every wobble derives from the ONE seeded pencil-boil
   engine — three registers, two materials, one engine, no forks. (ii) the
   useGlobalDark seam: W-ATLAS-RECONCILE (Batch 2) rewrites the LIBRARY flip path
   (settle seam + reflow + carve) while W-CONFIG-CHASSIS (same batch) binds the
   DEMO gear row to `useGlobalDark` — different trees (`src/composables/dark` vs
   `demo/configurator`), the binding survives by construction. (iii) the silver
   quad's cool-neutral stops are W-NO-GRAY's ONE named identity exception
   (coordinated, Batch 1b lands first). (iv) the fork `feat/d6-library-3.10` is
   READ-ONLY for every wave (`git show`); the fork-close protocol (archive-tag
   `d6-lineage-archive` @2755ebbd → branch delete → npm deprecate 3.11.0–3.12.0 →
   the cut-notes retirement line) is W-CLOSE's, orchestrator-owned.
8. **The R9/R10 amendment seams** (the pre-greenlight folds): (a) `glass/surfaces.css`
   is written by W-PAGER (Batch 5, the `.glass-pager-ring` recipe) and then by
   W-DEMO-AFFORDANCES (Batch 6, the stack negative-predicate anchor only) — sequenced
   by batch order, no parallel write; (b) W-TABS's three consume-seams (the
   `--spring-snappy-duration` clock ← W-GLASS-CAL.3 same-batch §5a edge;
   `.paper-ink-mark` ← W-SURFACE-AXIS scope 8; `<FadingScroll>` ← Batch 2) — shape
   gaps triumvirate at the MINTING wave; (c) the `ui/Tabs` public-surface retirement
   re-greps the dock-rail internal consumer (`DockLayerGroup.vue:217`, Batch-3-landed
   surface) and records internal-keep vs delete — a structural DockLayerGroup edit is
   a scope-reveal, never unilateral; (d) W-DARK-MATERIAL's scope-7 self-engage
   recalibration REBASELINES `proof:adaptive-glass` + `adaptive-glass-live` (their
   structural witnesses assert the current unconditional shape — the red is the
   rebaseline signal, not a regression to revert); (e) W-NO-GRAY (Batch 1b) appends
   to `tokens/glass.css` AFTER W-DARK-MATERIAL's seam edits land (sequenced within
   Batch 1, same nothing-races-the-substrate rationale).
