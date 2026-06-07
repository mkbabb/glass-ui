# AW.W22 - Glass-material unify (single catch-light + rim grammar)

## State

**Name**: W22 - Glass-material unify (single catch-light + rim grammar)
**Opens after**: AW tranche open (independent of W12/W13; spine for W23. Shares no `modify` path with the W12 GlassPanel/tokens carve or the W13 affordance carve — see §4a)
**Agents**: 1 serial
**Hard gate** (`proof:glass-material-unified`): every glass surface in the floating/overlay band (floating, overlay, dock, dialog, sheet, popover) AND the card register resolves the unified moving-specular `::before` seam AND the `--glass-edge-light` rim from ONE source — a single `.glass-material` mixin/`@utility` the five rungs compose — proven by a computed-style probe over a mounted matrix of every named surface (each resolves a non-`none` specular `::before` content + a rim border/box-shadow channel); a grep asserts the per-component opt-in specular/rim wiring is gone (no surface hand-rolls `glass-specular-track` or an inline `--glass-edge-light` rim that the ladder now supplies). Born RED on HEAD — at HEAD the specular track is opt-in on three components only (Button glass, DockIconButton, Card) and the rim is composed on floating + dock tiers only, so the probe surfaces surfaces with NO specular/rim.

## 2a. Goal criterion

This wave succeeds if EVERY glass surface carries ONE consistent catch-light + rim grammar without per-component opt-in wiring. The material is already deep (AV.W15: 5-rung alpha-monotonic ladder, `@property`-typed moving specular, full-perimeter edge-light rim, content-aware under-shadow), but the SOTA folds sit on isolated opt-in classes and single tiers — floating/overlay/dock/dialog/sheet/popover do NOT uniformly carry the moving specular or the rim. This is a DRY consolidation, NOT new tech: promote the moving-specular (`glass-specular-track.css`) + the `--glass-edge-light` rim + the pointer interaction-light seam into the 5-rung ladder via a single `.glass-material` mixin the tiers compose, so a Switch thumb, a glass Button, a Dialog, and a Sheet all read as the same material. No new tokens beyond the mixin plumbing; the per-component highlight/rim literals retire onto the canonical `--glass-*` rungs (the AL-W10 under-shadow retirement discipline).

## 3. Scope

1. `src/styles/glass.css` — mint a single `.glass-material` mixin (a `@utility glass-material` or a shared selector group the five rungs `@apply`/compose) that bundles the THREE material atoms currently scattered: (a) the moving-specular `::before` seam (today only on `glass-specular-track`), (b) the `--glass-edge-light` full-perimeter rim, (c) the pointer interaction-light hooks (`--specular-x/y/intensity` `@property` channel from tokens.css §11b). The five ladder rungs (`.glass-wash`/`.glass-quiet`/`.glass-resting`/`.glass-floating`/`.glass-overlay`) compose `.glass-material` so the specular + rim ride the ladder, not a parallel opt-in class. KISS: collapse, do not add a sixth rung.
2. `src/styles/glass-specular-track.css` — fold the moving-specular `::before` body (the masked radial catch-light, the rest/hover/active intensity steps, the PRM-static reset, the `var()` fallback) INTO the `.glass-material` mixin's `::before` so there is ONE specular source. Retire `glass-specular-track` as a standalone opt-in class (it becomes the mixin's internal `::before`), OR keep `.glass-specular-track` as a thin alias that composes `.glass-material` for backwards-call sites that the same-wave carve updates — no legacy alias left dangling (no-legacy precept).
3. `src/styles/glass.css` (`.glass-floating`/`.glass-overlay` rim block) — the `--glass-edge-light` rim, today composed on the floating + dock tiers only, moves into `.glass-material` so EVERY rung resolves the rim (alpha may still step per rung via the existing `--glass-edge-light-{wash..overlay}` family if present; the rim PRESENCE is uniform). The dock tier's rim becomes a `.glass-material` inheritance, not a dock-local re-declaration.
4. `src/components/ui/button/index.ts` (`glass`/`glass-wash` variants), `src/components/custom/dock/DockIconButton.vue`, `src/components/ui/card/Card.vue` — retire the per-component `glass-specular-track` opt-in class string now that the tier-composed `.glass-material` supplies the specular. These three sites stop hand-wiring the specular; they inherit it from whichever ladder rung they already carry (a `glass`-tier Button already composes `.glass-floating`/`.glass-wash`). Pure class-string carve; zero new behaviour, the specular is now SOURCE-uniform.
5. Specular-intensity rides the press/hover state machine UNIFORMLY: the `.glass-material` `::before` intensity lift keys off the same `:hover`/`:active` rungs the ladder rung already exposes, so material-light fires in lockstep with the existing scale-press squish across every glass surface (references the AV spring wiring; does NOT re-derive a parallel state machine). This is the consolidation half of "specular as the universal interaction-light"; the spring-coupling extension proper is W23-adjacent but the press/hover intensity hook lands here as part of the unify.
6. `demo/stories/substrates/` (or the canonical glass-material story path) — a glass-material matrix story mounting every named surface (floating/overlay/dock/dialog/sheet/popover + card) over a shipped high-frequency backdrop (`Aurora` or `PaperBackdrop` from their subpaths; coordinate with W12, do NOT author a new backdrop) so the unified specular + rim is screenshot-verifiable across the whole band. Demo-private chassis, not library surface.

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- the unify requires touching the renderer seam (`src/composables/glass/useGlassRenderer.ts` or `useWebGLCanvas`) rather than the CSS ladder + the SFC class-string carves — file bounds expand beyond `glass.css` + `glass-specular-track.css` + the three SFC/CVA carves + the demo story, and the "CSS-only DRY consolidation, no renderer change" precept is implicated;
- folding the specular `::before` into `.glass-material` breaks the masked-radial mask-composite on a rung whose `::before` is already claimed (a rung that paints a grain/curvature `::after` or a content `::before` collides) — a non-local-recoverable cascade/pseudo-element conflict;
- a third diagnostic iteration on the computed-style probe still surfaces a named band surface with NO specular `::before` or NO rim channel after the mixin is composed (the rung is not inheriting the mixin) — escalate to re-derive the rung→mixin composition, not patch the failing surface inline.

## 4. File Bounds

| File | Access |
|---|---|
| `src/styles/glass.css` | modify (mint `.glass-material`; move the rim into it; the five rungs compose it) |
| `src/styles/glass-specular-track.css` | modify-carve (fold the `::before` body into the mixin; retire/alias the standalone class) |
| `src/components/ui/button/index.ts` | modify-carve (drop the `glass`/`glass-wash` per-component `glass-specular-track` opt-in only) |
| `src/components/custom/dock/DockIconButton.vue` | modify-carve (drop the per-component specular opt-in only) |
| `src/components/ui/card/Card.vue` | modify-carve (drop the per-component specular opt-in class only — NOT the dormant pointer seam, owned by W23 card work) |
| `demo/stories/substrates/glass-material.vue` | create |

Do NOT touch: `src/styles/tokens.css` (no new token; the `--glass-*`/`--specular-*`/`--glass-edge-light*` rungs already exist — if a new token is unavoidable, that is a triumvirate trigger), `src/composables/glass/` (the renderer + WebGL substrate stay; this is a CSS-ladder consolidation), the W12 GlassPanel `svg-filter`/`fallback` branches, the W13 `.input-pill` border block (W13 owns the input border alpha; W22 does not write the `.input-pill` rule).

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W22 shares no `modify` path with W12 (W12 owns `GlassPanel.vue` + `tokens.css §8` + two stories; W22 owns `glass.css` mixin + `glass-specular-track.css` + the three SFC specular-opt-in carves + a new demo story), W13 (W13 carves the `.input-pill` border + slider range + button `gold-audacious`/`primary-audacious` text — DISJOINT lines from W22's `glass`/`glass-wash` specular-opt-in drop on the same `button/index.ts`; sequence W22 after W13 or assign the same agent to `button/index.ts`), or W23 (W23 is the SOTA-fold extension and OPENS AFTER W22, consuming the `.glass-material` mixin this wave mints). The `button/index.ts` overlap with W13 is the only shared FILE (not shared lines): W13 touches the `gold-audacious`/`primary-audacious` variant text tokens; W22 touches the `glass`/`glass-wash` specular-class drop — sequence W22 after W13.

## 5. Agent Units

### AW.W22.a Glass-material mixin + ladder composition + opt-in retirement

- Goal: ONE `.glass-material` mixin carries the moving-specular + rim + interaction-light, the five ladder rungs compose it, and the three per-component specular opt-ins retire onto the ladder inheritance.
- Mechanism: mint `.glass-material` in `glass.css` bundling the specular `::before` (folded from `glass-specular-track.css`), the `--glass-edge-light` rim (moved off the floating/dock-only block), and the `--specular-*` `@property` interaction-light hooks; the five rungs compose it; carve the `glass`/`glass-wash` (Button), DockIconButton, and Card specular-opt-in class strings to inherit from the ladder rung they already carry; stage a glass-material matrix story over a shipped backdrop.
- Files: `src/styles/glass.css`, `src/styles/glass-specular-track.css`, `src/components/ui/button/index.ts`, `src/components/custom/dock/DockIconButton.vue`, `src/components/ui/card/Card.vue`, `demo/stories/substrates/glass-material.vue`.
- Sub-gate: a Vitest/Playwright `getComputedStyle` probe mounts a matrix of floating/overlay/dock/dialog/sheet/popover + card and asserts each resolves a non-`none` specular `::before` content AND a rim channel from the shared mixin; a grep asserts no surface hand-rolls `glass-specular-track` or an inline rim the ladder now supplies; `vue-tsc --noEmit` green; `npm run build` emits the `/styles` bundle.

## 6. Hard Gate

1. **Single specular source.** `grep -c` proves the moving-specular `::before` body lives in exactly ONE place (the `.glass-material` mixin); `glass-specular-track` is either gone or a thin alias composing `.glass-material` (no duplicated `::before` masked-radial block). The pre-fix repo has the body in `glass-specular-track.css` and three component opt-in sites; the post-fix repo has it once.
2. **Uniform specular across the band.** A mounted matrix of every named glass surface (floating, overlay, dock, dialog, sheet, popover, card) resolves a non-`none` specular `::before` (computed `content` + the masked-radial `background`/`mask` channel), proven by a Vitest DOM probe or a Playwright `getComputedStyle` capture saved to the artefacts path. Pre-fix the same probe surfaces band surfaces with NO `::before` specular (dialog/sheet/popover/overlay); the diff is the proof — BORN RED.
3. **Uniform rim across the band.** The same matrix resolves the `--glass-edge-light` rim channel (border/box-shadow/`::after` inset stroke) on EVERY rung, not just floating + dock. Pre-fix, wash/quiet/resting/dialog body surfaces resolve no rim; post-fix all do.
4. **Opt-in wiring retired.** `grep` over `src/components/` confirms Button (`glass`/`glass-wash`), DockIconButton, and Card no longer carry a `glass-specular-track` opt-in class string — the specular is inherited from the ladder rung. No per-component inline `--glass-edge-light` rim re-declaration survives where the mixin now supplies it.
5. **Interaction-light lockstep.** The `.glass-material` `::before` intensity steps off the rung's `:hover`/`:active` state (the same rungs the scale-press squish keys off) — a computed-style differential probe reads a higher `--specular-intensity` (or `::before` opacity) on `:hover` than at rest on a representative surface; PRM pins it static (the reduced-motion reset is reachable).
6. **Demo stages the band over a backdrop.** `demo/stories/substrates/glass-material.vue` imports a substrate from `@mkbabb/glass-ui/aurora` or `@mkbabb/glass-ui/paper-backdrop` and mounts the named-surface matrix over it; `grep` confirms the subpath import and no hand-rolled backdrop literal.
7. **Build + types green.** `npm run build` and `npm run typecheck` pass.

## 7. Format And Lint Cadence

- `npm run typecheck` after the SFC class-string carves and again before close.
- `npm run build` before close (confirms the `/styles` cascade still emits with the specular folded into the mixin and the rim moved).
- `npm run proof:phantom-classes` after the carve (the dropped `glass-specular-track` opt-in must not leave a phantom class reference the content-scan expects).
- `git diff --check` for whitespace.
- No formatter is skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W22-glass-material-probe.md` — the computed-style probe output (specular `::before` + rim channel per named surface), pre/post, proving the band is uniform.
- Playwright screenshots of the glass-material matrix (every named surface) over the staged backdrop, at 1440×900, saved under `docs/tranches/AW/audit/screens/`.
- The integration commit hash.

## 9. Commit Plan

- `refactor(glass): unify moving-specular + edge-rim into a single .glass-material mixin the ladder composes` — the `glass.css` mixin + the `glass-specular-track.css` fold; body cites the per-component-opt-in → ladder-inheritance consolidation and the single-specular-source DRY win.
- `chore(components): retire per-component glass-specular-track opt-in onto the ladder` — the Button/DockIconButton/Card class-string carves; body names the three retired opt-in sites.
- `chore(demo): stage a glass-material matrix over a shipped backdrop` — the new story; body names the consumed substrate subpath.
- `docs(AW): W22 close — glass-material uniformity probe + screens` — the artefact + status commit.

## 10. Dependencies

- **Depends on**: AW tranche open. Sequence AFTER W13 for the shared `button/index.ts` file (disjoint lines; sequence or same-agent).
- **Blocks**: W23 (the SOTA folds — refraction asset, squircle PE, chromatic dispersion, adaptive tint — all ride the `.glass-material` mixin this wave mints; W23 extends one grammar rather than N opt-in classes).

## 11. Archaeology

The moving-specular + edge-light rim were introduced as opt-in classes at AV.W15 (the material-deepening wave) and wired onto Button-glass + DockIconButton + Card only — never promoted into the ladder, so the floating/overlay/dialog/sheet/popover band carries the ladder alpha+blur but NOT the catch-light or the rim. The guardrail is the band-uniformity computed-style probe (gate 2-3), which would have caught the isolation at introduction had the material spine been ladder-composed from the start. The AL-W10 under-shadow retirement (per-component highlight literals → canonical `--glass-*` rungs) is the precedent for this consolidation discipline.
