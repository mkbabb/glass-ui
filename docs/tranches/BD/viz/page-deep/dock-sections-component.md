# Pass-E deep audit — dock/sections COMPONENT(S)

**Page:** `dock/sections` · import label `@mkbabb/glass-ui/dock`
**Demo file:** `demo/stories/dock/sections.vue`
**Real src under audit (the actual code this page demos):**

- `src/components/custom/dock/DockSection.vue` (the protagonist — the tripartite section chassis)
- `src/components/custom/dock/DockSeparator.vue` (the divider/anchor seam it composes)
- `src/components/custom/dock/constants.ts` (`DockSectionDescriptor` / `DockSectionKind`)
- `src/styles/dock/section.css` (the zone recipe) + `src/styles/dock/shell.css` (the `.glass-dock` six-layer plate)
- `src/components/custom/dock/DockIconButton.vue` + `src/styles/dock-controls/icon-button.css` (the four-state controls hosted inside the zones)
- siblings the page does NOT use but should leverage: `DockStack.vue` (the contextual carousel/fan API), `useDockContextSilhouette.ts` (the morph-between-silhouettes API)

DESIGN NORTH STARs consulted: DESIGN.md (six-layer optical composite + 7 tiers + spring physics), motion-canon.md (P1–P6), the dock-system contextual/morph/silhouette APIs, design-idioms.md.

---

## 1. ANIMATION — HIGH animation affordance? Four-state contract + spring + entrance/exit per motion-canon

**DockSection itself: ZERO animation affordance. It is a pure structural `display: contents` grouping wrapper.**

- `section.css` carries NO `@keyframes`, NO `transition`, NO `animation`, NO stagger var — verified by grep (empty). The chassis stamps `data-kind`/`data-section-id` markers and a `gap`, nothing more.
- **Missing entrance (motion-canon P2/P3/P5).** A dock that materializes its sections is the iOS-26/27 affordance — the zones should fade-rise in reading order (rail-core → sections → nav) on a `--spring-snappy` SPATIAL leg + coupled opacity on the EFFECTS bezier, compositor-only, PRM→static terminal. Today the whole dock pops in flat. The `.scroll-cascade`/`icon-chip-reveal` register exists library-wide; DockSection composes none of it. This is the single largest gap — the chassis whose JOB is to express section hierarchy expresses zero hierarchy in TIME.
- **No inter-zone divider draw.** `<DockSeparator anchor>` snaps in at full opacity. A hairline that wipes/grows on the `--spring-snappy-duration` clock when a section mounts would read as the iOS "the rail seats itself" beat. Currently static.

**The hosted controls (`DockIconButton`) DO carry the four-state contract** — `icon-button.css` has hover (`--dock-control-hover-bg` + `scale: var(--scale-hover-dock)` + specular wake), `:active` (`--dock-control-press-bg` glass-darken + `scale: var(--scale-press-dock)` on the `--dock-press-spring` = `--spring-smooth` no-overshoot register), focus, and `data-active` (selected-reads-as-glass). The press IS spring-driven and PRM-safe. So the LEAF is correct; the SECTION CHASSIS adds no motion of its own — and critically, no per-section ENTRANCE.

**Verdict:** dead/missing entrance animation on the chassis. The four-state contract lives at the leaf only.

## 2. PROCEDURAL VIZ — adherence to PROCEDURAL-SUITE + GPU-only/Safari bar

DockSection hosts no procedural viz. The page composes `<DockStage>`, whose ONE shared `<Aurora>` field IS the suite member behind the demo (offscreen-paused via `useIntersectionPause` + `content-visibility` by construction — the one-GL-context-per-route budget held). That is correct demo composition, but it is NOT this component's surface. No PROCEDURAL-SUITE obligation lands on DockSection. The aurora itself is audited under its own page-deep.

## 3. PERFORMANCE — compositor-only? offscreen-pause? layout-thrash?

- **DockSection is layout-only and STATIC** — `display: contents` + `inline-flex` zones. No animated property at all, so trivially compositor-clean and zero thrash. It paints once and never re-flows (box-INVIOLATE / no-inflation contract is genuinely honored — `flex: 0 1 auto; min-inline-size: 0` on `--section`, `display: contents` root).
- The control hover/press are `scale`/`background` only (compositor-safe `scale`; `background` is a paint, acceptable for a discrete hover state — not a per-frame storm).
- No offscreen-pause concern (no rAF in this component).
- **One latent perf note:** when (if) an entrance is added, it MUST be transform/opacity-only (P5) — the `display: contents` root cannot itself be a transform target (a `display:contents` element has no box), so the entrance must ride the ZONE wrappers (`.dock-section-zone`, which DO have boxes), not `.dock-section`. Recorded so the AUGMENT does not regress.

## 4. SAFARI COMPATIBILITY

Clean. `display: contents` (Safari 11.1+), `inline-flex`, CSS custom-prop `gap` — all baseline. The `.glass-dock` plate it sits in uses `backdrop-filter` (the `-webkit-` companion is in shell.css). No `:has()`/container-query/`@property` dependency in DockSection's own surface. A future entrance using `@property`-registered stagger scalars would need the `initial-value` safe-fallback discipline (Safari 16.4+ for `@property`), but plain `animation-delay: calc(var(--i) * step)` is the Safari-safe path and is preferred here.

## 5. IDIOMATIC / no-legacy — workaround, dead code, dual-path, non-idiomatic?

- **DEAD SEAM (the real finding): `DockSectionDescriptor.layers`.** `constants.ts` declares `layers?: readonly DockStackItem[]` and `DockSection.vue`'s docblock says the facets "are surfaced to the consumer to feed the seam rail OUTSIDE the dock box." But the component NEVER READS `section.layers` — the slot binding exposes `:section`/`:kind` and that is all. The field is documentation-only, with no live consumer in `src/` or `demo/` (grep confirms only the docblock references it). This is exactly the substrate-without-consumer class the J-inv-10 bar forbids: either the component must surface `layers` to a `<DockStack mode="facets">` rail (the contextual-switching API the page SHOULD demo), or the field is pruned. It currently sits as a phantom API promising contextual switching the chassis does not wire.
- **The contextual-switching/morph APIs are present in the band but UNUSED by this page/component pairing.** `DockStack` (fan + facet carousel + `--glass-accent` per-instance hue + `v-model:selected`) and `useDockContextSilhouette` (the bar↔bar+pill morph) are the "leverage the dock APIs (contextual switching/animating)" mandate from the user brief — DockSection is the STATIC tripartite grouping, and nothing bridges it to the live contextual carousel. Not a bug, but the architectural gap the redesign names: the sections page should compose DockSection's `layers` into a `<DockStack mode="facets">` seam so clicking a section's facet contextually switches the dock — the whole point of "abstract this into a re-usable component for layering."
- No workaround/dual-path inside DockSection itself — it is clean, idiomatic, and the de-overload discipline (`--core` class vs `rail-core` data-attr) is honored.

## 6. The glass SIX-LAYER composite present?

On the HOST plate, yes — `.glass-dock` (shell.css) carries: backdrop blur+saturate (the `--glass-blur-dock` companion), surface tint (`--glass-bg-dock`), the directional edge-rim PAIR (`--glass-rim-top`/`--glass-rim-bottom`), the inner catch-light/specular (`.glass-material::before` via the controls' `glass-specular-track`), drop shadow (`--shadow-dock`), and the paper-grain `::after`. So the dock is a full six-layer liquid-glass surface. **DockSection contributes NONE of it** (correct — it is `display:contents` chrome). The demo correctly floats this plate over the live aurora (`tier`-less transparent `.dock-stage-tile`), so glass-cannot-sample-glass is respected (one glass plate over a non-glass field). The page-level gap (per the brief) is GLASS-DEMOS-OVER-COLORFUL-AURORA + per-subsection cards + bigger main area — those are DEMO-PAGE redesign items, not component defects.

---

## BD-tranche disposition map (cite the wave)

| # | Finding | Action | BD wave |
|---|---------|--------|---------|
| §1 | No section ENTRANCE on the chassis (flat pop-in; motion-canon P2/P3/P5 unmet) | **AUGMENT** — net-new zone-level fade-rise stagger (rail-core→sections→nav), compositor-only on the zone boxes, `--spring-snappy` + coupled opacity, PRM→static, `animation-delay`-stagger (Safari-safe) | **NET-NEW** `BD.W-DOCK-SECTION-ENTRANCE` (no dock wave exists in BD/waves; this is the one genuine add) — sits beside `BD.W-BC-COMPONENT-CANON` |
| §1 | Anchor `<DockSeparator>` snaps in static | **FOLD** into the same entrance wave (the seam wipes on the same clock) | `BD.W-DOCK-SECTION-ENTRANCE` |
| §5 | `DockSectionDescriptor.layers` is a DEAD documented-only field (no consumer) | **MODIFY or PRUNE** — wire `layers`→`<DockStack mode="facets">` seam (the contextual-switching the brief mandates) OR prune the field per J-inv-10 | candidate for `BD.W-WEAK-KEEP-REGRADE` (the overfitting-audit arm) — regrade the field |
| §5 | Contextual carousel/silhouette APIs unused by the sections page | **AUGMENT** (demo-side) — compose `DockStack`/`useDockContextSilhouette` so a section facet contextually switches the dock | demo-redesign rider on `BD.W-DOCK-SECTION-ENTRANCE` (the page's per-subsection-card + bigger-main-area + standardized import label go here too) |
| §1-leaf, §3, §4, §6 | Four-state control contract, compositor-cleanliness, Safari, host six-layer composite | **KEEP** — all correct/idiomatic | — |
