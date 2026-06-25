# Pass-E SYNTHESIS — `substrates/blob` (GooBlob demo)

**Page:** `demo/stories/substrates/blob.vue` (871 lines) · live `http://localhost:5173/substrates/blob`
**Import (canonical):** `@mkbabb/glass-ui/goo-blob`
**Inputs reconciled:** `substrates-blob-{demo,design,component}.md`
**Sibling fact (binding):** `substrates/aurora.vue` is already migrated onto the shared `VizStudio` chassis. **blob.vue is the un-converted twin** — it hand-rolls a bare `<Configurator>` and a second `<header>` masthead. Almost every page-level blob defect is a CONSEQUENCE of not riding that chassis, and so folds into the Band-16 chassis waves rather than minting blob-specific work.

---

## 0 · The three lenses reconciled (conflicts resolved first)

**CONFLICT A — does the hero paint? (the load-bearing disagreement).**
- *design* says the hero does NOT render: `.goo-blob-canvas` drawing buffer stuck at the default **300×150** while the CSS box is 768×768; `gl.readPixels` center → `[0,0,0,0]` across 3 frames; stage is a flat gray rectangle; STAGE-1 plain card is empty cream.
- *demo* says it renders but is POP-less / flat-gray in situ over the dead background.
- *component* says the SOURCE is sound — BC.W-GOOBLOB-MEATBALL cured the blob-broken base, the WGSL uniformity hoist arms the two `fwidth()` sites on Metal, the renderer/sim/pause are clean, no src bug.

**RESOLUTION:** the component lens is the authority on the SOURCE (it read the actual renderer + shaders); the page is NOT painting because of a **substrate sizing failure at the demo edge**, not a shader bug. The 300×150-stuck buffer is the canonical ResizeObserver-never-fired signature — the stage `<canvas>` is sized 0/default at mount because the **broken sticky hero overlaps the stage and/or the bare hand-rolled layout gives the canvas no resolved box** (the design lens explicitly ties the stuck buffer to the broken sticky header). This is the SAME class as F1 (sticky hero doesn't shrink, has no backplate, overlaps body). **Therefore: migrating blob onto `VizStudio` (which owns a correctly-sized `#stage` slot + the shrink/backplate) is expected to fix the render as a side-effect.** The render must be re-verified live AFTER the chassis migration — if it still reads `300×150`, it escalates to a real renderer-edge ResizeObserver bug. No src-component change is warranted yet (component lens found none).

**CONFLICT B — F1 vs F2 vs F4 are the same root.** demo-F1 (sticky doesn't shrink/no backplate → overlap), demo-F2 (double display header), demo-F4 (doesn't compose `VizStudio`), design-#2 (two titles, sticky never collapses, black mass overlaps body) all reduce to ONE cause: **blob.vue does not ride the page chassis** and hand-rolls a second masthead. ONE fix (migrate to `VizStudio`/the standardized `StoryPage`) closes all four. No duplication.

**AGREEMENT (all three lenses):** the page is over a flat `paper`/cream field with no colorful aurora (the binding "glass over COLORFUL aurora" bar is unmet); the controls out-shout the bead (the main card must be bigger); the dock APIs are unused (only `DockBackgroundToggle`); the prose is over-written; the off-brand `--motion-accent` violet masthead is a suffusion violation; the supporting sections are flat uniform cards, not φ-stepped glassy cards over the field.

---

## 1 · RANKED change-set (impact-ordered) → tranche action

| # | Change | Impact | Tranche action |
|---|--------|--------|----------------|
| **R1** | **Make the hero paint** — migrate blob onto the standardized page chassis so the `#stage` canvas gets a resolved box; re-verify the lit cream droplet + orbiting satellites paint live (kill the 300×150 stuck buffer). | **P0 — the page's reason to exist is invisible.** | **MODIFY `W-CONFIG-GALLERY-DOCK`** (route blob through the SAME `VizStudio` path aurora rides — it is the named "all 5 viz through VizStudio" owner; ADDENDUM batch-1 lists blob as a RE-FORK to converge) **+ live-verify under `W-PAGE-AUDIT-ALL`**. If the buffer is still stuck post-migration → escalate to a **NEW one-line renderer-edge ResizeObserver arm** on `W-VIZ-PARITY-METAL` (substrate-sizing, GPU-adjacent), but ONLY on evidence. |
| **R2** | **Kill the double title + fix the sticky shrink** — delete the hand-rolled `<header>Blob Studio</header>` violet masthead; let the chassis own ONE audacious title + ONE eyebrow + the condense-on-scroll sticky with a glass backing bar (no occlusion). Standardize the name to ONE (match the `@mkbabb/glass-ui/goo-blob` chip). | **P0 — two titles fight; the sticky one occludes body as a black mass.** | **FOLD into `W-PAGE-CHASSIS` + `W-STICKY-TITLE-CONDENSE` + `W-PAGE-HEADER-FOLD`** (the duplicate-hand-rolled-header collapse is exactly W-PAGE-HEADER-FOLD's 36-file fold; the sticky-occlusion → backing-bar is W-STICKY-TITLE-CONDENSE; both already exist). Zero new wave. |
| **R3** | **Put the studio + specimens over a CONTAINED colorful aurora** — one shared offscreen-paused `<Aurora>` wash behind the demo column (the `<DockStage>` precedent, one-GL-per-route honored alongside the blob's own context); the blob stays CONTAINED (not full-bleed). The §L1 six-layer composite finally has chroma to refract. | **P0 (user bar) — "glass demos over COLORFUL aurora backgrounds" is entirely unmet.** | **MODIFY `W-PAGE-BACKGROUND`** to flip the `substrates/blob` row off `background:"paper"` (`manifest.ts:565`) onto the contained-aurora staging; its rationale ("a GooBlob is CONTAINED, not a page-field") is RESPECTED by the contained-wash pattern, not by killing the field. **+ AUGMENT `W-PAPER-MORPHISM`** to surface the paper-grain where the paper register is wanted (the page is currently neither glassy nor papery). |
| **R4** | **Bigger stage, slim control rail via the dock** — give the bead the dominant φ² share; demote controls to a slim rail OR a `<DockLayerGroup>`/`<DockStack>` contextual switcher (flip Interaction ↔ Mood ↔ Geometry control-banks with morph animation). Adopt the 78vh/720px envelope (aurora's), off blob's smaller 70vh/560px. | **P1 (two user bars at once) — "main card BIGGER" + "leverage the dock APIs (contextual switching/animating)."** | **MODIFY `W-CONFIG-GALLERY-DOCK`** — it already owns "the gallery LARGER + collapse into a glass dock + the enlarged configurator." This is the exact home for the bigger-stage + dock-rail-of-facets re-proportion. The contextual-switching dock-rail satisfies the dock-API mandate without a new wave. |
| **R5** | **Each sub-section in its OWN glassy card, φ-stepped, alive** — the plain-blob / WatercolorDot grid / ghost grid / pause-seam become distinct glass-tier cards over the aurora (hero ≫ plain-blob > dot-grid, golden not uniform), each with `.scroll-cascade` entrance + glass-lift hover + tap-squish; the WatercolorDots visibly boil at rest. | **P2 — the supporting registers are flat uniform cream cards (generic-AI stack).** | **FOLD into `W-STORY-PAGE-STANDARD`** (the demo SUB-TYPE taxonomy: `<DemoStage>` for the hero bead, `<DemoSpecimen>`/`<DemoMatrix>` for the dot grids, `<DemoInteraction>` for the studio — each guaranteeing the glassy sub-card + entrance conformity) **+ `W-CARD-PAD`** (the φ-stepped golden sizing) **+ `W-LIQUID-ENTRANCE-GENERAL`** (the per-card squish/fade/settle entrance, both engines). |
| **R6** | **Dogfood the library's interactives** — replace the hand-rolled `bg-card/70 backdrop-blur-sm` Poke button + readout lozenge with `<Button variant="glass">` (gleam + spring-press) + a real glass pill. | **P2 — a glass-ui demo bypasses its own glass primitives.** | **FOLD into `W-STORY-PAGE-STANDARD`** (the `<DemoInteraction>` sub-type composes library interactives, not hand-rolled lozenges) — or a one-line note on `W-PAGE-AUDIT-ALL`'s blob row. No new wave. |
| **R7** | **Component entrance bloom** — add a compositor-only `opacity/scale(0.9→1)/blur-settle` mount bloom on `.goo-blob-wrapper` (the `.glass-reveal`/`useLiquidReveal` register, PRM-static), so the bead BLOOMS into being (motion-canon P2/P3 at the canvas edge). The ONLY net-new src change the component lens found. | **P2 — "HIGH animation affordance for EVERY component"; the bead just appears.** | **AUGMENT `W-BLOB-MOTION-TUNE`** (it already owns the two live-blob motion-honesty tunes; this is the third motion arm — additive default-on). Reconcile with `W-LIQUID-ENTRANCE-GENERAL` so the bloom rides the SAME generalized squish/settle register, not a blob-local fork. |
| **R8** | **Standardize the import-path label + tighten prose + drop the motion violet** — the SFC imports `../../../src/.../goo-blob` (the chip already shows `@mkbabb/glass-ui/goo-blob` — match it); cut "Shipped /goo-blob" short-form → full subpath; cut each blurb to ~30 words register-not-implementation; the masthead accent is the warm-aurora register, never `--motion-accent` purple. | **P3 — hygiene; one wrong color event.** | **FOLD into `W-PAGE-OFFTOKEN-SWEEP`** (the off-token/raw-Tailwind + import-label sweep already owns this) **+ a `W-PAGE-AUDIT-ALL` blob-row prose note**. The violet-drop is a suffusion-proportion restore — same sweep. |
| **R9** | **Wire accessible names** on the `hide-label` LabeledSlider/Select rows (console: 16 unlabeled fields + 9 incorrect `<label for>`). | **P1 a11y (real console errors), P3 visible.** | **FOLD into `W-CONFIG-GALLERY-DOCK`** (it rebuilds the configurator pane — wire the a11y names there) or **`W-PAGE-AUDIT-ALL`** blob row. No new wave. |

---

## 2 · Tranche-action summary (the disposition ledger)

- **NEW waves: ZERO.** Every blob finding folds/modifies/augments an existing BD wave. This is the strongest convergence signal — blob is the un-migrated twin of an already-solved page (aurora), so its defect surface is the chassis-migration the Band-16 waves already author.
- **MODIFY (3):** `W-CONFIG-GALLERY-DOCK` (R1 render-via-chassis + R4 bigger-stage/dock-rail), `W-PAGE-BACKGROUND` (R3 contained-aurora staging, flip the manifest row), `W-PAGE-OFFTOKEN-SWEEP` (R8 import-label + violet-drop).
- **FOLD (5):** R2→`W-PAGE-CHASSIS`/`W-STICKY-TITLE-CONDENSE`/`W-PAGE-HEADER-FOLD`; R5→`W-STORY-PAGE-STANDARD`/`W-CARD-PAD`; R6→`W-STORY-PAGE-STANDARD`; R8→`W-PAGE-OFFTOKEN-SWEEP`; R9→`W-CONFIG-GALLERY-DOCK`.
- **AUGMENT (2):** R3→`W-PAPER-MORPHISM` (surface grain), R7→`W-BLOB-MOTION-TUNE` (entrance bloom, third motion arm, reconciled with `W-LIQUID-ENTRANCE-GENERAL`).
- **PRUNE (0):** the component lens found no dead code / dual-path / non-idiomatic pattern in the source. The blurb verbosity (R8) is a tighten, not a prune.
- **KEEP-booked (unchanged):** F3 Metal/Safari parity (`W-VIZ-PARITY-METAL`), F4 per-satellite derived-shade (`W-GOOBLOB-SAT-SHADE`), F5 squircle-refract (`W-GOOBLOB-SQUIRCLE-REFRACT`), F6 flick-pseudopod decide (`W-BLOB-MOTION-TUNE` arm 2). None blob-page-specific.

**Conditional escalation (evidence-gated, the only path to a net-new arm):** IF R1 (render-via-chassis) does NOT make the buffer paint, mint a one-line renderer-edge ResizeObserver arm on `W-VIZ-PARITY-METAL` with the live `300×150`-stuck readback as its born-RED witness. Do NOT pre-mint it — the component lens read the source clean.

---

## 3 · Gate hooks (so the folds are machine-enforced, not prose)

- **R1/R3/R4** ride the chassis-migration gate `W-CONFIG-GALLERY-DOCK` already needs: *blob composes `VizStudio` (`hasVizStudio:true`), the `#stage` canvas paints non-transparent center pixels (litFrac > 0), and the stage gets the φ²-dominant share over a live contained-aurora* — the SAME shape as the aurora row's gate. The "all 5 viz through VizStudio" assertion (ADDENDUM batch-1) gains blob as its second concrete row.
- **R2** rides `W-STICKY-TITLE-CONDENSE`'s gate (the sticky title condenses to a backing-bar, NOT a floating mass; ONE `<h1>`, ONE eyebrow on the route) + `W-PAGE-HEADER-FOLD`'s no-37th-paste census (the hand-rolled `<header>Blob Studio</header>` is deleted, so blob drops OUT of the duplicate-header set).
- **R5/R7** ride `W-LIQUID-ENTRANCE-GENERAL`'s π frame-series (squish scale≠1 volume-preserving + coupled fade + overshoot settle, both engines) — the blob's per-card entrances + the bead mount bloom enroll as consumers.
- **R8** rides `W-PAGE-OFFTOKEN-SWEEP`'s no-`--motion-accent`-on-a-substrates-masthead + canonical-import-label assertions.

---

## 4 · Convergence assessment

**Close — ONE chassis-migration loop, then ONE live-verify loop. NOT several.**

The blob page is the textbook un-converted twin: aurora is already solved on `VizStudio`, and blob's entire defect surface (broken sticky/double-header, flat background, controls-out-shout-bead, flat supporting cards, unused dock) is the consequence of NOT riding that chassis. The Band-16 waves that migrate it ALREADY EXIST and are authored against the aurora model — so the convergence path is **execute the existing folds, do not re-spec.** ZERO new waves is the convergence proof.

The single genuine UNKNOWN is the render (CONFLICT A): the source is clean, so the chassis migration is EXPECTED to fix the 300×150 stuck buffer as a side-effect — but that is a hypothesis that needs ONE live re-verify after the migration lands. So:
- **Loop 1:** execute the chassis folds (R1–R6, R8, R9) — converges the page structurally.
- **Loop 2 (verify-only):** live-confirm the bead paints + the §L1 composite reads over the contained aurora + the entrances fire. IF the buffer is still stuck → the single evidence-gated escalation (R1's conditional ResizeObserver arm). Otherwise CONVERGED.

**Convergence estimate: ~70% now → ~95% after Loop 1 → CONVERGED after the Loop-2 live-verify.** No taste-iteration backlog; the design target is unambiguous (the aurora page is the reference render).

---

## 6-LINE VERDICT

1. **Top-3 changes:** (R1) **make the hero paint** — migrate blob onto `VizStudio` so the `#stage` canvas gets a resolved box, killing the 300×150 stuck buffer (the source is clean per the component lens; this is a demo-edge sizing failure tied to the broken sticky header); (R2) **kill the double title** — delete the hand-rolled violet `<header>Blob Studio</header>` masthead, let the chassis own ONE condensing sticky title with a backing bar; (R3) **stage over a CONTAINED colorful aurora** — flip the `paper` manifest row onto an offscreen-paused `<Aurora>` wash so the §L1 six-layer glass composite finally has chroma to refract.
2. **CONFLICT resolved:** demo+design saw a dead/flat hero, component proved the SOURCE clean → the render fails at the DEMO EDGE (substrate sizing, entangled with the broken sticky), so the chassis migration is the expected fix; re-verify live in Loop 2.
3. **MODIFY:** `W-CONFIG-GALLERY-DOCK` (render-via-chassis + bigger-stage/dock-rail + a11y names), `W-PAGE-BACKGROUND` (contained-aurora, flip the manifest row), `W-PAGE-OFFTOKEN-SWEEP` (import-label + drop the motion-violet).
4. **FOLD:** double-header→`W-PAGE-CHASSIS`/`W-STICKY-TITLE-CONDENSE`/`W-PAGE-HEADER-FOLD`; φ-stepped glassy sub-cards + dogfooded interactives→`W-STORY-PAGE-STANDARD`/`W-CARD-PAD`. **AUGMENT:** entrance bloom→`W-BLOB-MOTION-TUNE` (reconciled with `W-LIQUID-ENTRANCE-GENERAL`); paper-grain→`W-PAPER-MORPHISM`.
5. **NEW: ZERO. PRUNE: ZERO** (source clean, no dead code). The only evidence-gated escalation is a one-line renderer ResizeObserver arm on `W-VIZ-PARITY-METAL` IFF the buffer is still stuck post-migration — do NOT pre-mint.
6. **Convergence: CLOSE (~70%→~95% after one chassis-migration loop + one live-verify loop).** Blob is the un-converted twin of the already-solved aurora page; its whole defect surface is the chassis migration the Band-16 waves already author — ZERO new waves is the convergence proof.
