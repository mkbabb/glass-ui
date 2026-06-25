# display/buttons — COMPONENT deep audit (Pass-E)

**Page:** `demo/stories/display/buttons.vue` · **Import label:** `import { Button } from "@mkbabb/glass-ui/button"` (the canonical flat subpath; the demo imports `../../../src/components/ui/button`, the demo-source convention).

**Components under audit (the REAL src):**
- `src/components/ui/button/Button.vue` + `index.ts` (the `buttonVariants` CVA) — the protagonist.
- `src/styles/glass/surfaces.css` `.btn-glass` / `.glass-btn` (the glass material + gleam + deep + lens arms) + `glass/material.css` `.glass-wash::before`.
- Composables: `useSpringPress.ts` · `useLiquidFlex.ts` · `vSpecular.ts` / `useSpecularTracking.ts` (`createSpecularWriter`).
- `.glass-btn` raw icon-button utility (also demoed on the page).

This is the LIBRARY's highest-affordance interactive primitive and the reference consumer of `useSpringPress` (#1), `useLiquidFlex`, and `vSpecular`. There is NO procedural-viz in Button itself; the page mounts `<Aurora>` as a stage backdrop (audited as a viz-CONSUMER, not the component).

---

## 1 · ANIMATION — four-state contract + spring physics + entrance/exit

**Verdict: HIGH affordance — the model the affordance-map cites (`affordance-map.md:77` Button row, all five cells `✓`).**

- **Hover-lift:** `--scale-hover-btn` on `primary-audacious`/`gold-audacious`; the surface legs (bg/border) on the §6 bezier `--ease-standard`, the scale on `--spring-smooth` via the `.btn-pill` base. Unified onto ONE register (W-MOTION-CANON — the prior `.tap-squish`-clobbers-`.btn-pill` desync is closed; both classes carry the full coherent set).
- **Gleam-track:** `v-specular="specularArmed"` AUTO-ARMS the pointer-following catch-light on the 8 glass variants (`GLASS_VARIANTS` set) with ZERO call-site wiring — wraps the ONE `createSpecularWriter` core (rAF-coalesced, single `getBoundingClientRect`/frame, cached-PRM, cleanup on unmount). The dead-centre `50%` static fallback is fixed.
- **Press-squish:** `useSpringPress()` (the `press` SPRING_PRESETS row — Apple `interactiveSpring` 0.15/ζ0.86, the sub-100ms iOS window) drives `--glass-btn-press-t` 0..1; `useLiquidFlex` projects it onto a volume-preserving X/Y reciprocal squish (cap 1.04, `linear` law). INTERRUPTIBLE (rapid re-press re-targets the spring mid-flight), single-source (inline `scale` emitted only while `t > 0.001`, yields back to the CVA hover utility at rest — no double-apply), and COUPLED: the SAME `--glass-btn-press-t` lerps the specular toward the active gleam (`surfaces.css .btn-glass:active::before`) so the glass DEFORMS-AND-BRIGHTENS, not a flat shrink (motion-canon P3, one-drive-two-legs).
- **Focus-ring:** `.focus-ring` token-first halo (`--focus-ring-shadow`) on the CVA base.
- **DEAD/JANKY/MISSING:** (a) NO entrance/exit register — Button has no mount bloom; correct by spec (`affordance-map.md:96` — a CONTROL does not bloom; the surface-bloom is the top-layer register's). (b) The `.glass-btn` raw icon utility (also on this page) is a LOWER tier: it carries hover/press scale + focus-ring + `aria-pressed`, but NO `v-specular` gleam and NO `useSpringPress` (CSS `:active scale` only) — a deliberate utility/component split, not a defect, but the page demos it beside the full `<Button>`, so the affordance asymmetry is visible. (c) The SFC comment at `Button.vue:66` is STALE (`response 0.25, ζ 0.7`) — the runtime is 0.15/0.86; cosmetic drift, no paint impact.

## 2 · PROCEDURAL VIZ

None in the component. The page stages `<Aurora :config="PRESETS.OPENAI_SKY">` as a backdrop — ONE GL context (within the one-GL-per-route budget), offscreen-paused by construction. The other glass rows use `<ShowcaseFrame tier="field">` (no GL, the paper wash reads through). No viz-spec conformance question on the BUTTON itself.

## 3 · PERFORMANCE — compositor-only / offscreen-pause / layout-thrash

**Clean.** Press path is compositor-only (`scale` + `--*-press-t` custom prop + `filter` — never a layout property; `proof:no-layout-animation` library-wide). `useLiquidFlex` `sizeStyle` is NOT bound (Button has no size span — the squish feeds `stretchStyle`/transform only, the P5 latent-footprint discipline). `createSpecularWriter` collapses 120–1000Hz pointermove to ONE batched layout read + ONE style write per frame; disposes the rAF + matchMedia on unmount. `contain: paint` on `.btn-glass` keeps the nested backdrop-filter sample inside the box (nested-backdrop-cost mitigation). No rAF leak, no thrash.

## 4 · SAFARI compatibility

**Clean.** `.btn-glass` declares the UNPREFIXED `backdrop-filter` ONLY — Lightning CSS emits the `-webkit-` companion (the single-source authorship discipline; `proof:webkit-backdrop`). The `:liquid` SVG-lens arm (`.glass-lens`) is `@supports (backdrop-filter: url(#…))`-gated with the un-gated blur+tint base as the off-Chromium floor (Safari degrades cleanly — no workaround). `contrast-color()` is `@supports`-gated progressive enhancement. PRM is respected at every leg (spring snap, gleam skip, CSS bracket). No Safari nit found on Button.

## 5 · IDIOMATIC / no-legacy

**Exemplary.** ZERO dead code, dual-path, or workaround. Single-source press (one spring table row, no per-call literal), single-source gleam (`createSpecularWriter`, two deliveries), token-substitution everywhere (`--glass-bg-*-tinted`, `--glass-blur-btn`, `--glass-btn-press-t`, `--control-h-*`/`--ui-glyph` comfort axis). Clean breaks (disco RETIRED onto calm glass-first; `glass-refract`→`glass-lens` no alias; shadcn-neutral `outline`/`secondary`/`accent` de-shadcn-reskinned onto the glass register). The `surface` axis is the cross-cutting `[data-surface]` decoration (not a duplicate recipe). One genuine drift: the stale SFC comment (§1c).

## 6 · Glass six-layer composite

**6/6 present on the glass variants** (the model the audit checks others against):
1. **Backdrop blur + saturate** — `--glass-blur-btn` (floating-tier 10–13px + saturate; deep CTAs re-point onto `--glass-blur-deep` 16px/sat 1.5).
2. **Surface tint** — `--glass-bg-*-tinted` element-level `color-mix(in oklab,…,--glass-tint-source --glass-tint-strength)` (the W55 adaptive darken reaches the LIT fill — the substitution-vs-inheritance trap closed on the button register).
3. **Edge rim** — `--glass-btn-rim` (`--glass-edge-light`) in the box-shadow.
4. **Inner catch-light** — the `.glass-wash::before` moving specular (`--specular-*`, the gleam) + the press-coupled illumination.
5. **Drop shadow** — `--glass-btn-under-shadow{,-hover}` (deepens one rung on hover, the lifted-lozenge read).
6. **Grain** — inherited from the `glass-wash` ladder rung's `.glass-material` grain `::after`.

(The opaque-atom variants `destructive`/`ai`/`link`/`ghost` are intentionally NOT six-layer — the W54 legibility allowlist / non-glass register.)

---

## BD-tranche mapping (cite the wave)

| Finding | Action | BD wave |
|---|---|---|
| Button component animation/perf/Safari/six-layer all PASS — reference implementation | **no src wave needed** | The iOS-27 press/blur/deep registers shipped (BC.W-BUTTON-GLASS-IOS); `BD.W-BUTTON-GLASS-IOS-NOTE` is the doc-track-the-code coherence wave (CLAUDE.md only). |
| Stale SFC comment `Button.vue:66` (`0.25/0.7` → `0.15/0.86`) | **MODIFY (cosmetic)** | Already FLAGGED in `BD.W-BUTTON-GLASS-IOS-NOTE.md §2` as an observation ("the orchestrator's call, SFC byte-fenced by other gates"). Fold the 1-line comment fix into that wave or a hygiene clause; no runtime impact. |
| `.glass-btn` raw utility lower affordance (no `v-specular`/`useSpringPress`) vs full `<Button>`, demoed side-by-side | **keep (deliberate split) / optional AUGMENT** | The utility/component tier split is by design (`surfaces.css` IG-A4 note). If the demo wants parity, the page should lead with `<Button size="icon">` over the raw utility — a DEMO change, fold into the page-modernization scope below. NOT a src defect. |
| Deep-glass `:liquid` lens chroma + 18–20px ceiling (already-booked deepening, Button is the hero consumer) | **AUGMENT (booked, perf-gated)** | `BD.W-DEEP-GLASS-20PX` (radius push) + `BD.W-GLASS-LENS-CHROMA` (RGB-split rim) — both re-decide-then-perf-gate; Button's `:liquid` arm consumes them for free at the LERP/knob default. No Button edit. |
| Demo user-asks: each sub-section own glassy card · BIGGER main area · leverage dock contextual-switch APIs · glass over COLORFUL aurora · standardize import label · tighten copy | **MODIFY (demo, zero src)** | The page already stages glass over `<Aurora>` + `<ShowcaseFrame tier="field">` (the BG-2 fix shipped). The RESIDUAL asks — sub-sections as discrete glassy `<Card>`s, a bigger main canvas, a dock contextual-switcher threading the variant families, and the `@mkbabb/glass-ui/button` import-label standardization + copy-tighten — are NOT covered by a button-specific wave. EXTEND `BD.W-PAGE-HEADER-FOLD` (the page-shell modernizer) / `BD.W-PAGE-OFFTOKEN-SWEEP` scope, or mint a sibling `BD.W-DISPLAY-PAGE-CARD-FOLD`, to fold display/buttons (+ siblings) onto `<Card>`-per-section + the bigger-main + dock-API contextual demo. |
| Opaque variant labels over `bg-viz-*` use `text-zinc-900` | **MODIFY (demo)** | Already in `BD.W-PAGE-OFFTOKEN-SWEEP` scope (`text-zinc-900`/`text-white` → `text-foreground` over brand-hue plates). The viz-basis row on this page is a target. |

---

## 5-LINE VERDICT
1. **Button is the LIBRARY's gold-standard interactive primitive** — full four-state contract with iOS-27 spring physics: interruptible `useSpringPress` (0.15/ζ0.86), `useLiquidFlex` volume-preserving press-squish, `v-specular` auto-arm gleam, and a one-drive-two-legs press-coupled specular illumination. No dead/janky/missing animation on the component (correctly NO entrance — a control does not bloom).
2. **Glass six-layer composite is 6/6** on the glass variants — backdrop blur+saturate, element-level oklab surface-tint (the W55 adaptive darken reaching the LIT fill), edge rim, moving catch-light, hover-deepening drop shadow, and ladder grain; the opaque atoms are intentionally off-register (W54 allowlist).
3. **Performance + Safari are clean** — compositor-only press (no layout-thrash, `proof:no-layout-animation`), rAF-coalesced single-read specular, `contain:paint` nested-backdrop mitigation, unprefixed `backdrop-filter` (Lightning emits webkit), `@supports`-gated `:liquid` lens degrading to the un-gated floor, PRM respected at every leg.
4. **Idiomatic, zero-legacy** — single-source press/gleam, token-substitution throughout, clean breaks (disco retired, glass-lens rename, de-shadcn reskin); the ONLY drift is a cosmetic stale SFC comment (`Button.vue:66`) already flagged in `BD.W-BUTTON-GLASS-IOS-NOTE`.
5. **ACTION: NO src wave needed for the component** — fold the 1-line comment fix into `BD.W-BUTTON-GLASS-IOS-NOTE`; the deep-glass deepening Button consumes for free via `BD.W-DEEP-GLASS-20PX`/`BD.W-GLASS-LENS-CHROMA`; and EXTEND a page-shell wave (`BD.W-PAGE-HEADER-FOLD`/`BD.W-PAGE-OFFTOKEN-SWEEP` or a new `BD.W-DISPLAY-PAGE-CARD-FOLD`) for the DEMO user-asks (per-section glassy cards, bigger main, dock contextual-switch, import-label standardization, copy-tighten).
