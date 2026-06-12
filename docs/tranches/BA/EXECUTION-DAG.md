# BA — the execution DAG (the hardened roadmap)

The one sequencing artefact for the BA tranche. It expands `BA.md`'s 8-batch roster into
the dependency rationale: why the dark register is Batch 1, why the shell-hold fix is
Batch 0, the write-bound coordination seams, and the hinge gates per batch. Authored in
the AUTHORING phase — NO implementation runs until the user greenlights (BA invariant 2).

**HEAD:** glass-ui `master @ v3.13.0` (the AZ close cut, published with provenance,
`latest` on npm). slides exact-pins 3.13.0 (commit a171266, deployed). The BA branch is
`tranche/BA` off master.

**Numbering:** the `W-*` named system from `BA.md`'s 23-wave roster. The five user-domain
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

## §3 — Batch 2: the S1 redress band (4 parallel waves)

| wave | write bound (primary) |
|---|---|
| W-CONFIG-CHASSIS | src/components/custom/configurator/*, src/components/custom/labeled-field/*, demo/configurator/*, demo/stories/aurora/sections/AuroraColorSection.vue, demo/stories/aurora/presets.ts |
| W-GOO-REDRESS | src/components/custom/goo-blob/* (the wake seam + satellite envelope), demo/stories/substrates/blob.vue (STUDIO_GEO_BASE) |
| W-DOCK-GEOMETRY | src/styles/dock/{shell,overflow}.css, src/styles/dock-controls/* (geometry only), demo/layout/{BottomDock,SidebarDock}.vue (the overflow prop only) |
| W-FADING-SCROLL | src/components/custom/fading-scroll/* (create), src/styles/utilities/base.css (the .scroll-fade-* retirement), demo/stories/aurora/PresetPickerRow.vue, src/styles/segmented-tabs.css (the overflow mask re-point) |

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

## §6 — Batches 5–6: promotions, then the demo staged

W-ICON-CHIP (Batch 5) precedes W-SUFFUSE2 (Batch 6) because the pop map's vehicle is
the chip primitive. Batch 6's five waves are demo-side and parallel:

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
Batch 1:  W-DARK-MATERIAL                                   [H1]
Batch 2:  W-CONFIG-CHASSIS ‖ W-GOO-REDRESS ‖ W-DOCK-GEOMETRY ‖ W-FADING-SCROLL
Batch 3:  W-DOCK-SECTIONS → W-DOCK-MORPH-INSITU             [H3]
Batch 4:  W-SURFACE-AXIS ‖ W-FEEDBACK-TONE ‖ W-MENU-GLASS ‖ W-GLASS-CAL ‖ W-PROGRESS-GRADIENT   [H2]
Batch 5:  W-ICON-CHIP
Batch 6:  W-STAGE ‖ W-DEMO-AFFORDANCES ‖ W-FOURIER-STUDIO ‖ W-SUFFUSE2 ‖ W-ANIMATE
Batch 7:  W-REFLECT2 → W-CLOSE                              [H4][H5]
```

Close criteria: `BA.md §Completion criterion` — the gestalt roster operative-PASS, the
S1 redresses held, the battery green on a clean runner, the cut published, FINAL with
zero unnamed deferrals.
