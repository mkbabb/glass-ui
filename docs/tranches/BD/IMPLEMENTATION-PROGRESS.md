# BD GREENFIELD — IMPLEMENTATION PHASE (W-CUT) — the build cursor

> **STATUS: BUILDING.** User greenlit the implementation (W-CUT) 2026-06-24 with full
> publish/push/deploy authority. Team-lead orchestrates (core model); Opus/Sonnet fan out.
> Branch `prototype/liquid-dock`. The tranche is spec-converged (39 items, 116 union waves);
> THIS doc tracks the SRC BUILD. Source of truth for WHAT to build: each
> `docs/tranches/BD/greenfield/{slug}/{GOLDEN.md,WAVE-AMENDMENT.md,DELTA-ASSAY.md}` + the
> on-disk `docs/tranches/BD/union/waves/*.md` they amend + `GREENFIELD-HARDENING-PLAN.md`
> (§build-DAG ~line 293, the 7 CSS build-traps).

## THE BUILD-DAG (strict order on the shared critical path; fan out within a phase)

- [x] **P1 — Band-0 FOUNDATIONS** ✅ BUILT + verified (vue-tsc exit 0, vite clean, 3 adversarial verifiers):
  - [x] P1a motion tokens — `--motion-weight` @property inherits:true initial 0.618 + PRM→0 + driver/observer carve (`.liquid-stage`→1, `[data-reorder]/[data-autoplay]`→0); `--ease-cartoon-punch` linear() dip -3.8% → peak 1.22, one sign change; `--flex-vel` inherits:false; `writeVelocityWeight`+effectiveCap wired into all 4 getters (incl 1.08→1.14 dock drift fix)
  - [x] P1b glass warm-floor — `[data-paper-field]` ambient widen ≤8% + combined-hue clamp [45,88]; `--glass-key` keyed-edge re-points the shipped two-stop rim (no new layer)
  - [x] P1c cartoon register — `.cartoon-cast` INERT-child (Card.vue `<span aria-hidden>`) + `--cartoon-ink` warm cel-ink (oklch chroma-floored) + re-pointed `--shadow-cartoon-*`; press-t drive props
  - [x] P1d paper grain — coarse anisotropic tooth, multiply(light)/screen(dark), opacity 0.08→0.22 light / 0.11→0.16 dark to JND floor
- [x] **P2 — page-background `.paper-field`** ✅ BUILT + LIVE-π VERIFIED (out-of-page PNG chroma, untaintable): LIGHT C **0.0753** @ H78.6° / DARK C **0.0526** @ H67.8°, both tealFrac 0, clear §3 0.045. `<PaperBackdrop field :field-hue>` mounted AppShell.vue:251 (one writer, 118 routes); `warmFieldHue()` purges all cool category hues (substrates 222.8→71.1, forms 265.5→79.8…); anti-evasion clamp holds (teal 210→painted 125 warm-gold). Artefacts: `_verify/p2-select-{light,dark}.png`.
- [x] **P3 — tabs `.glass-capsule` extract** ✅ BUILT + LIVE-π VERIFIED. The register was inline in `.segmented-indicator` (no file to rename) → BORN as `src/styles/glass/glass-capsule.css` (clean break, zero old-name refs). Warm-floor = real `color-mix(in oklab, --glass-bg-floating-tinted, oklch(0.88 0.1 75) 16%)`. Live capsule fill (getComputedStyle, /navigation/tabs over live aurora): `oklab(0.809 0.009 0.0274)` → **chroma 0.0288 @ H72° warm** (was 0.0128 gray) — clears C6 ≥0.02. `.glass-capsule-hover`+`.glass-drag-lift` share ONE specular step. `--tab-blob` 2nd useLiquidFlex channel clamped ≤√1.14, glyph-pop on aria-pressed. Verifier PASS; vue-tsc clean, vite green (10 unit fails = pre-existing WebGPU/jsdom). Artefact: `_verify/p3-tabs-light.png`.
- [x] **P4 — CONSUMERS** ✅ BUILT (workflow w6p3gtver, 3 disjoint batches + self-healing gates) + LIVE-π. All 8 compose the shared register (final-audit: composesShared+trapsClean PASS ×8; vue-tsc+vite green). Buttons live: warm 0.0307 @ 72°, field behind, capsule+hover. Committed cf149cff. **Orchestrator register-glue** (the lane-deferred cross-cuts): `--glass-capsule-fill` indirection (quiet/loud/selected override → unblocks P6 dock parity) + `--glass-specular`→`--specular-intensity` real gleam channel (hover bloom was inert). Deferred to later phases: overlay warm-floor :where()-widen + reveal-punch tier (P9), DockIconButton capsule compose (P6), metric-badge hover (P10), carousel barbell-goo (depends BD.W-GOO-BARBELL-NECK → P5), proof gates + visual specs (P10).
- [ ] **P5 — Band-A VIZ** (FAN OUT, disjoint shaders; depends P2 field): aurora(+metal/image) · goo-morph · goo-blob · goo-dot-matrix · dot-flow-field · dot-matrix · fourier-field · concentric · paper-grid · substrate · handmark
- [x] **P6 — Band-B DOCK** ✅ BUILT + LIVE-π VERIFIED (workflow wtrn9d7ve, verifier PASS, vue-tsc+vite clean). The year-old WIDTH-SEIZURE FIXED: deleted the `--dock-root-ratio/-scale` machinery (layers.css), replaced with `--dock-live = collapsed + (expanded-collapsed)*clamp(0,t,1)` convex blend of two RO-measured-ONCE positive endpoints (rest-gated, never mid-morph) → bounded by construction. `--dock-punch-stretch` @property separate channel (3-factor scale, returns to 1, not under 1.14 cap). Kinetic `.cartoon-cast`. DockIconButton selected pill composes glass-capsule via `--glass-capsule-fill`. Fission+hub intact. **Live: all 12 docks at correct width==expandedPx (no 2451px detonation); t-sweep incl overshoot t=1.073→224 capped.** Artefact: `_verify/p6-dock-overview.png`.
- [ ] **P7 — blend-morph-engine** (big track): ONE ElementMorph API (SVG-filter Tier-S + GPU smin Tier-G), retire ~12 forks, FIX /dock/morph-showcase
- [ ] **P8 — Band-C CHASSIS** (fan out; depends P2,P3): story-page-standard(DemoFrame) · page-chrome(hero-overflow clamp + scale split) · category-landing(live previews + abrogate gray) · configurator-presentation · shell-layout
- [ ] **P9 — Band-D MOTION**: entrance-reveal(longhand scale/translate) · scroll-choreography(SpringProgress) · liquid-reveal
- [ ] **P10 — VERIFY + SHIP**: full Chrome+Safari live-π · vue-tsc + units + e2e · commit · push · publish (W-CUT) · deploy consumers (CF)

## THE 7 CSS BUILD-TRAPS (every implementer agent must heed — from §build-DAG)
(a) `@property inherits:false` on a pseudo → INITIAL on the pseudo (kills flood/caster); register `inherits:true` or drive from the element.
(b) self-referential `--x: max(var(--x),…)` = NO-OP; use a DISTINCT var (`--atom-tint-floor`).
(c) cel cast rides an INERT child, NOT ::before/::after (occupied by glass specular+grain).
(d) `color-mix(in oklab,<warm> X%, transparent)` has a WebKit premultiply-toward-BLACK hole; verify warm-not-gray on a REAL WebKit paint; use `oklch(.9 .05 60 / 0)` not bare `transparent`.
(e) keyframe `transform: scale()` SHORTHAND clobbers `translate(-50%,-50%)` centering; use independent `scale:`/`translate:` LONGHANDS.
(f) a 2nd `animation:` shorthand on a selector clobbers; AUGMENT the @keyframes.
(g) Vue `ref` on a COMPONENT = instance not element; use an asElement resolver.

## VERIFICATION LAW
Never trust a judge/mechanism pass. Orchestrator owns the live-π: chrome-devtools MCP, out-of-page
`screenshot→getImageData` (untaintable), real painted-pixel chroma/waist reads, Chrome AND Safari,
default-to-broken. Capture a DELTA artefact per phase (before/after screenshot + π).

## DEFERRED (tracked, not silent — fold into the named phase)
- **carousel-autoplay observer pin** → P4 (carousel/deck): the `[data-reorder]/[data-autoplay]` weight-0 seam exists; the carousel needs `data-autoplay` set on its markup when auto-advancing (best done with carousel context). Driver pin `.liquid-stage`→1 already landed.
- **born-RED proof gates** → P10: `proof-motion-weight-universal.mjs` (incl C8 observer / C6 dock-tab-press caps read weight), `proof-cartoon-punch.mjs`, `proof-page-background.mjs`, `proof-paper-morphism.mjs`, the paired-engine `*.spec.ts` (WebKit). Tokens shipped; orchestrator-owned live-π is the interim binding gate (P2 confirmed). Author the durable CI gates at the verify/ship consolidation.
- **useLiquidPress `el` threading** → P4 (Card/Button): thread an asElement resolver so press caps are fully weight-coupled (currently honest fallback to static rest-weight cap; the cast itself is fully CSS-driven so unaffected).
- **pre-existing proof:theme-style dock blockers** (DockExampleTile.vue:147 `:deep(*)`, DockGooFilter.vue scoped block) → P6 (dock); untouched by Band-0, not a regression.
- **.paper-field library-export path** → P10: it's a plain class in paper.css (in the demo's raw @import, not the content-scanned dist utility bundle). Confirm the library full-stylesheet export ships it for downstream consumers.

## LOG (newest first)
- 2026-06-24 — **P4 + glue COMMITTED (cf149cff, 7ba68387).** **P6 dock DISPATCHED** (workflow wtrn9d7ve): the width-seizure fix (ratio-free --dock-live convex blend, delete the layers.css ratio/scale machinery) + --dock-punch-stretch + kinetic cast + fission + hub + DockIconButton capsule-compose. In flight — idempotent guard: do NOT re-dispatch P6. Next after P6: P5 viz (11 disjoint shaders).
- 2026-06-24 — **P3 COMMITTED 43b68c33.** Critical path P1→P2→P3 done. **P4 DISPATCHED** (workflow w6p3gtver): 8 consumers in 3 disjoint batches [buttons·cards·overlays | select·atoms·timeline | toggle-chip·carousel] + self-healing build-gates. In flight — idempotent guard: do NOT re-dispatch P4.
- 2026-06-24 — **P1+P2 COMPLETE + committed.** Foundation build workflow (w8dsnro3g, 5 agents, ~656k tok): Band-0 tokens + warm field. 3 verifiers (trap-audit PASS, build PASS, fidelity DIVERGENT→2 fixes folded: driver/observer carve added; 1 deferred). Orch live-π: field warm both modes (L 0.0753/D 0.0526, tealFrac 0), gray root cause FIXED. Build clean, siblings intact.
- 2026-06-24 — Implementation phase OPENED. Infra stood up (this cursor + durable cron + task list). Build-DAG confirmed: all 5 shared primitives = 0 src files. Beginning P1.
