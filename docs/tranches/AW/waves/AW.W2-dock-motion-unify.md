# AW.W2 - Dock motion unification (clip-reveal, ONE clock)

## State

**Name**: W2 - Dock motion unification (clip-reveal one-clock)
**Opens after**: AW.W1 (the collapse morph must paint before lockstep can be measured on it)
**Agents**: 1 serial
**Hard gate**: `proof:dock-clip-reveal` (NEW, born-RED) asserts the active pane is revealed by
the clip aperture (opacity == 1 every morph frame, content box clipped by the growing/shrinking
box) rather than faded; `proof:dock-animation-live` (widened) asserts the OWN collapse↔expand
morph rises over ≥3 frames on BOTH engines + BOTH orientations with the OPACITY sampler re-pointed
to the LEAVING pane; `proof:spring-tokens-synced` (extended) asserts `DOCK_SPRING` and the
`--spring-dock` token carry the SAME `(response, ζ)` inside the iOS control band AND every quoted
doc-comment number matches the const (the doc-as-code drift catch).
**Status**: REWRITTEN (clip-reveal model — supersedes the prior two-spring companion draft)

## Goal criterion

This wave succeeds if the dock's size + content + leaving-fade settle as ONE motion with ZERO
opacity writes on the active pane, because **the box IS the reveal aperture** and content is laid
out ONCE at its natural size behind it. The growing aperture uncovers a static layout (the active
pane never reflows per frame, never fades — it is at `opacity:1` from frame 0). Opacity is a thin
polish on the LEAVING pane only — it fades the outgoing summary out as the real content is
uncovered underneath. There is NO second timeline driving content: the size spring (FLIP path)
or the View-Transition (native path) is the sole clock.

This corrects the prior W2 draft, which kept TWO timelines (a size spring + a critically-damped
opacity COMPANION spring) and spent its budget tuning them into agreement. The companion spring is
a patch for a structure that should not exist — collapse the two timelines, don't tune them.
See `docs/tranches/AW/audit/dock-perfection-plan.md` §1.

**The spring is NOT retuned in this wave.** The `(0.32, 0.7)` iOS-control retune is ALREADY LANDED
(`useLayerTransition.ts:19`, `regen-spring-tokens.mjs:56-60`, `tokens.css:163` — all carry
`(0.32, 0.7)`, overshoot ~+4.6%, the "AW.W2 retune" comment). The only token work in this wave is
the doc-drift comment fix (the comments still say the pre-retune `(0.5, 0.5)/+18.5%`).

## Scope

1. **Migrate the clip shell to a `data-morphing`-gated single-axis `overflow: clip`.** Replace
   `dock.css:104-106` (`.glass-dock { overflow: hidden }`) and the morph-START clip-lift at
   `dock.css:603` (`.glass-dock.expanded { overflow: visible }`, which lifts at frame 0 because
   `.expanded` is bound synchronously to `visualExpanded` at `GlassDock.vue:368`). The clip is now
   keyed off a `data-morphing` attribute the driver owns (set at gesture start, cleared on settle),
   so the clip PERSISTS through the morph and lifts only at rest:

   ```css
   .glass-dock:not(.vertical) { overflow-x: clip; overflow-y: visible; }
   .glass-dock.vertical       { overflow-x: visible; overflow-y: clip; }
   .glass-dock[data-morphing]:not(.vertical) { overflow-x: clip; overflow-y: visible; }
   .glass-dock[data-morphing].vertical       { overflow-x: visible; overflow-y: clip; }
   .glass-dock.expanded:not([data-morphing]),
   .glass-dock.always-expanded:not([data-morphing]) { overflow: visible; }
   ```

   `overflow:clip` is paint-only (NOT a scroll container), so it drops the `min-width:0` scroll-box
   dance for the non-scroll shell and cannot snag a scroll-driven-animation scroller. The cross
   axis is ALWAYS explicitly `visible` (the MDN single-axis-clip-degrades-to-hidden caveat). The
   legitimate scroll ports (`.dock-scroll-{x,y}`, `overflow:auto`, dock.css:642-672) STAY `auto` —
   they are NOT migrated.

2. **Delete the active-pane opacity transition; the active pane is statically `opacity:1`** (revealed
   by the aperture, never faded). The exact CSS delta at `dock.css:547-559`:

   ```css
   .dock-layer.layer-active,
   .dock-layer-item-host.is-active {
       opacity: 1;
       visibility: visible;
       pointer-events: auto;
       transition: visibility 0s;   /* DELETE the `opacity var(--dock-motion-resize)` arm */
   }
   ```

   The LEAVING pane keeps `opacity:0` + the `opacity var(--dock-motion-resize)` transition
   (`dock.css:535-536, 565-569`) — the ONLY surviving opacity animation, the thin polish. The
   AU.W8b 3-state VISIBILITY fork (`dock.css:495-582`, the a11y-006 anchor) governs `visibility`,
   NOT opacity, so this deletion does NOT touch it — it is PRESERVED VERBATIM.

3. **The driver writes SIZE ONLY and owns the `data-morphing` lifecycle.** In
   `useLayerTransition.ts`: DELETE any companion-opacity-spring plan (it was never built — the
   prior draft only proposed it). The `play()` callback writes `setDim(el, "${w}px")` and nothing
   else (no opacity). Add `el.setAttribute("data-morphing","")` at gesture start (alongside
   `setWillChange`, `:295`) and `el.removeAttribute("data-morphing")` on settle (alongside
   `clearWillChange`, `:329`), on the safety timeout (`:341`), and in `onTransitionEnd` (`:359`).
   On the native VT path set it synchronously inside the `startViewTransition` callback (`:202-205`)
   and clear on `finished.finally` (`:206-209`). The existing retarget (the live-spring re-seat at
   `:242-243` + `:316-317`) is PRESERVED — a retarget that changes the target layer re-measures
   `toSize` via the existing `getSize` after the deferred class swap (`:278`), which reads the new
   active layer's max-content, so the clip-reveal layout-behind assumption holds across a
   layer-identity-change-mid-flight with no new code.

4. **Carve the dual-driver races on the morph axis.** The `.glass-dock.vertical` transition list
   (`dock.css:290-297`) includes BOTH `height` AND `width` — a latent dual-driver race for the
   height-morphing rail (the inner stack's spring writes height, the root transitions height too).
   Carve it to NON-morph properties only (padding/shadow/transform/background/border), matching how
   `.glass-dock:not(.vertical)` (`dock.css:262-268`) already excludes `width`. Same carve on
   `.dock-layer-stack` (`dock.css:854-860`, transitions BOTH width AND height): the spring owns the
   morph axis, so carve the CSS transition to the cross axis only (the VT path owns both on the
   native engine).

5. **Carve the content-intrinsic axis per orientation.** The hardcoded
   `.dock-layer { white-space:nowrap; height: var(--dock-layer-height) }` (`dock.css:585-592`) is
   correct for horizontal but forces a one-line row on a vertical rail. Scope `white-space:nowrap`
   + the fixed `height` to `:not(.vertical)` contexts; the vertical group's active host already
   block-sizes (`dock.css:888-897`, KEPT) so the height aperture reveals an intrinsic-sized column.

6. **Fix the 5-site doc-drift.** The spring is `(0.32, 0.7)` but five comments still say the
   pre-retune `(0.5, 0.5)/+18.5%`: `useLayerTransition.ts:8-9` and `:305`, and `tokens.css:149`,
   `:1290`, `:1297`, `:1299`. Correct all five to `(0.32, 0.7)`, overshoot `~+4.6%`. The
   `proof:spring-tokens-synced` comment-match assert scans all of them (so a future retune that
   trusts a stale comment over the const cannot desync CSS from JS).

## Triumvirate Dispatch

A triumvirate is mandatory when:

- the file bounds expand beyond the listed paths — in particular if the `overflow:clip` migration
  alters paint order such that a portaled popover no longer stays above the dock during a
  collapsed:hover scale (the load-bearing stacking-context guarantee, `dock.css:62-67`), which is a
  separate owner and must be re-planned, not patched in;
- `proof:dock-clip-reveal` shows the active pane STILL fades (the active-pane opacity transition
  was not fully deleted) or the aperture does not clip (the `data-morphing` lifecycle is not wired
  on one of the two engines);
- the widened `proof:dock-animation-live` vertical inner-group timeline surfaces a pre-existing
  vertical-rail morph bug the carve (scope 4) does not close — escalate to own it as a separate
  diagnosis rather than widening the morph window to mask it.

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/dock/composables/useLayerTransition.ts` | modify (data-morphing lifecycle; size-only write; the 2-site doc-drift fix; NO companion spring; NO retune) |
| `src/styles/dock.css` | modify-carve (overflow:hidden→data-morphing-gated single-axis clip; DELETE active-pane opacity transition; carve the .vertical + .dock-layer-stack morph-axis transitions; carve the content-intrinsic axis) |
| `src/styles/tokens.css` | modify (the 3-site `(0.5,0.5)` doc-comment fix ONLY — the `--spring-*` block is generated + already correct; NOT re-run) |
| `scripts/proof-dock-clip-reveal.mjs` | create (the born-RED clip-reveal gate) |
| `scripts/proof-dock-animation-live.mjs` | modify (re-point the opacity sampler to the LEAVING pane; add the vertical inner-group height timeline) |
| `scripts/proof-spring-tokens-synced.mjs` | modify (add the BAND assert + the comment-match drift assert — both NET-NEW; the gate only does committed-vs-generated drift today) |
| `tests/components/custom/dock/dock-clip-reveal.detect.test.ts` | create (pure detectors over synthetic timelines) |

Do NOT touch: `GlassDock.vue` (W1's surface — the only band-A change to it is the `data-morphing`
attribute, which the DRIVER sets via the root ref, not the template), `regen-spring-tokens.mjs`
(the retune is landed — the PRESETS row is already `(0.32, 0.7)`; re-running it is a no-op and the
gate proves no drift), the dock visibility 3-state fork markers (`AU.W8b-visibility-fork`),
`view-transition.css` (the VT group recipe stays the native-path opacity owner — W3 touches the
typed-VT half).

## Disjointness

Single agent unit. W2 SEQUENCES after W1 (both touch `useLayerTransition.ts`); they never run in
parallel. `tokens.css`'s `--spring-*` block is written only through the regenerator and is already
correct; W2 edits ONLY the prose `(0.5,0.5)` doc comments around it (not the generated lines), and
`proof:spring-tokens-synced` confirms the generated block stays drift-free.

## Agent Units

### AW.W2.a Clip-reveal one-clock + dual-driver carve + doc-drift fix

- Goal: the box is the reveal aperture (single-axis `overflow:clip` gated on `data-morphing`); the
  active pane is statically `opacity:1`; the spring writes size only; the morph-axis dual-driver
  races are carved; the 5-site doc-drift is corrected. ZERO opacity writes on the active pane, ONE
  per-frame JS write total (size).
- Mechanism: migrate the clip shell; delete the active-pane opacity transition; wire the
  `data-morphing` set/clear lifecycle on BOTH engines; carve the `.vertical` + `.dock-layer-stack`
  morph-axis transitions to the cross axis; scope the content-intrinsic axis per orientation; fix
  the 5 doc-comment sites.
- Files: `useLayerTransition.ts`, `dock.css`, `tokens.css` (doc comments only),
  `proof-dock-clip-reveal.mjs`, `proof-dock-animation-live.mjs`, `proof-spring-tokens-synced.mjs`,
  `dock-clip-reveal.detect.test.ts`
- Sub-gate: `npm run proof:dock-clip-reveal` reports the active pane opacity == 1 across every
  morph frame and the content box clipped by the aperture (born-RED on the 3.3.0
  hidden+active-fade model); `npm run proof:dock-animation-live` reports ≥3 rising morph frames on
  BOTH engines + BOTH orientations (the vertical timeline on the inner DockLayerGroup) with the
  leaving-pane opacity falling 0; `npm run proof:spring-tokens-synced` GREEN with the band + the
  comment-match assert.

## Hard Gate

1. `npm run proof:dock-clip-reveal` (NEW Playwright gate, harness-gated SKIP) — on the
   start-collapsed two-layer dock + the demo:
   (a) across EVERY morph frame the active pane's opacity == 1 (it is REVEALED by the aperture,
   never faded);
   (b) the active pane's content box is clipped by the aperture (rendered content width tracks
   `min(natural, aperture)` — content never paints at full size past a half-collapsed box);
   (c) BOTH engines (FLIP + VT), BOTH orientations.
   BORN-RED on the 3.3.0 `overflow:hidden`+active-opacity-fade model: a frame exists where the
   active pane's opacity < 1 while the box is still wide (the "content fades, not revealed" tell).
   Captured in the MCP/dev Playwright env; born-RED + GREEN artefacts saved.
2. `npm run proof:dock-animation-live` (widened) — rAF-samples the OWN collapse↔expand morph over
   ≥3 rising frames, BOTH FLIP and VT, BOTH orientations. The horizontal timeline stays on the
   outer start-collapsed pair; the NEW vertical timeline drives an INNER `<DockLayerGroup
   orientation="vertical">` layer switch and samples the stack's `height` rising ≥3 frames (the
   outer pair is hardcoded horizontal, `GlassDock.vue:205` — the vertical morph is the inner
   group's, not the outer's). The OPACITY sampler is RE-POINTED to the LEAVING pane (the
   `.dock-layer--summary` on an expand / the inner leaving host), which falls 0 over ≥3 frames; the
   ACTIVE pane is asserted statically opacity == 1. Asserts ONE driver per axis (no CSS transition
   on the morph axis the spring writes).
3. `npm run proof:spring-tokens-synced` (extended) — the committed `--spring-*` block equals the
   generator output (the drift check it already does); EXTENDED with (a) a BAND assert:
   `DOCK_SPRING` and the `dock` PRESETS row carry the SAME `(response, ζ)`, `response∈[0.30,0.35]`,
   `ζ∈[0.70,0.80]`, derived overshoot `exp(-ζπ/√(1-ζ²))∈[0.05,0.10]`; (b) a COMMENT-MATCH assert:
   every quoted `(response, ζ)` / overshoot number in the doc comments (`useLayerTransition.ts:8`,
   `:305`; `tokens.css:149`, `:1290`, `:1297`, `:1299`) matches the const. BOTH are NET-NEW — the
   gate only checks committed-vs-generated drift today. The `(0.32, 0.7)` already passes the band
   (no retune); the comment-match is the bite (born-RED on HEAD — the comments still say
   `(0.5, 0.5)`).
4. `npm run proof:dock-opacity-lockstep` GREEN — the LEAVING-pane fade still names
   `--dock-motion-resize` (the one-token lockstep is intact).
5. `npm run proof:dock-motion-single-source` + `npm run proof:dock-motion-parity` GREEN — one rAF
   origin, one easing token; VT and FLIP share one timing source.
6. `npm run typecheck` clean; `npm run build` green (the `--spring-*` block stays committed-equal to
   the generator — only doc comments changed).

## Format And Lint Cadence

`node scripts/regen-spring-tokens.mjs` is NOT re-run (the PRESETS row is already correct; running
it is a no-op). `proof:spring-tokens-synced` confirms no drift before close. `npm run typecheck`
after the composable edit. Prettier over the new/modified `.mjs` + `.test.ts`. `git diff --check`
for whitespace. The six proof gates run before close.

## Verification Artefacts

- `docs/tranches/AW/audit/W2-clip-reveal.json` — the gate artefact (captured in the Playwright
  env): the born-RED 3.3.0 active-pane-fades timeline + the GREEN aperture-reveal timeline (active
  opacity == 1 every frame, content clipped by the aperture); the leaving-pane fade series; the
  bi-axial rising-frame counts (horizontal outer pair + vertical inner group).
- The `git diff` of the 5 doc-comment sites (the `(0.5,0.5)`→`(0.32,0.7)` correction).
- The `proof:spring-tokens-synced` band + comment-match output (the comment-match born-RED on HEAD,
  GREEN after the doc fix).

## Commit Plan

- `feat(dock): clip-reveal morph — the box is the aperture, one spring clock` — the
  `useLayerTransition.ts` (data-morphing lifecycle, size-only write) + `dock.css`
  (overflow:hidden→data-morphing-gated single-axis clip, DELETE the active-pane opacity transition)
  fold (body: WHY clip-reveal collapses the two timelines the prior draft tuned into agreement; the
  active pane is REVEALED not faded; the leaving pane is the only opacity animation; the
  data-morphing lifts the clip on settle not at morph start).
- `fix(dock): carve the vertical + layer-stack morph-axis dual-driver races` — the `.glass-dock.vertical`
  + `.dock-layer-stack` transition carve + the content-intrinsic-axis carve (body: the spring owns
  the morph axis, a CSS transition on the same axis is the AV.W9.0 dual-driver race).
- `docs(dock): correct the 5-site (0.5,0.5) spring doc-drift to (0.32,0.7)` — the comment fix
  (body: the const is already retuned; the comments lied; a future retune trusting them desyncs).
- `test(dock): proof:dock-clip-reveal + the leaving-pane opacity sampler + the band/comment-match
  asserts` — the gate fleet.
- `docs(AW): W2 close — clip-reveal artefact + status`.

## Dependencies

- **Depends on**: AW.W1 (the collapse morph must paint — clip-reveal is meaningless on a frozen box).
- **Blocks**: AW.W3 (the typed-VT directional intent + spring-keyed stagger + hover-scale layer onto
  the clip-reveal one-clock motion this wave establishes); slides H.W1.

## Archaeology

- AU.W2 moved the layer fade off `--dock-motion-fast` onto `--dock-motion-resize` so fade + morph
  shared a duration TOKEN — narrowing the reported 100ms desync. But a shared token is not the
  point: under clip-reveal the active pane has NO fade at all (it is revealed by the box), so the
  question of fade-vs-morph lockstep dissolves for the active pane. The leaving pane keeps the
  shared-token fade (`proof:dock-opacity-lockstep` records it).
- AV.W9.0 retired the native container-morph arm (a dual-driver width race); AV.W9.1 retired the
  native discrete-visibility arm (a third opacity/visibility authority). W2 completes the
  one-owner-per-concern story: the active pane has ZERO opacity authority (the aperture reveals it),
  the leaving pane has ONE (the shared-token CSS fade), visibility has ONE (the AU.W8b fork), size
  has ONE (the spring/VT).
- The spring retune `(0.5,0.5)`→`(0.32,0.7)` is ALREADY LANDED (the "AW.W2 retune" comment in
  `regen-spring-tokens.mjs:59`). The prior W2 draft scoped the retune AND a companion opacity
  spring; both are removed — the retune is done, and the companion is the wrong model. W2 is now the
  clip-reveal one-clock fold + the doc-drift the landed retune left behind.
- Corrected from the prior W2 draft: that draft kept TWO timelines (a size spring + a
  critically-damped opacity companion) and a stale-but-detailed gate around monotone-opacity. The
  apple-motion + lockstep findings are unanimous — collapse the two timelines, don't tune them. W2
  is rewritten around the aperture; the gate is `proof:dock-clip-reveal` (the active pane is
  revealed, not faded), and the existing `proof:dock-animation-live` opacity sampler — which
  REQUIRES the active opacity to rise ≥3 frames — is re-pointed to the leaving pane (the active
  pane is now statically opacity:1, so the old assert would have gone RED on the kept gate).
