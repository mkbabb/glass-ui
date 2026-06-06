# AV.W15 — iOS-26 Liquid Glass design-evolution

## 2. State

**Name**: W15 — iOS-26 Liquid Glass design-evolution
**Opens after**: AV.W4 (the supply-side shadow-contract + token surface) and AV.W5 (the transposition/idiom folds). AT-disjoint with the aurora arm (AV.W1–W3); the moving-specular fold is opt-in over the dock/Button/Card glass surfaces and does NOT touch the aurora substrate. Lands before the next minor publish.
**Agents**: 3 parallel — three file-disjoint lanes (§4a): (A) the material token folds (per-rung saturate/brightness + `--glass-edge-light` + content-aware under-shadow) on `tokens.css`/`glass.css`, (B) the pointer-anchored moving specular (the `@property`-animated radial driven by `--mouse-x/--mouse-y`, reduced-motion-guarded, opt-in on dock controls + Button glass + Card hover) on a new `glass-specular-track.css` rung + its consumers, (C) the no-glass-on-glass discipline doc + the iOS-spring cross-ref (DOC-only — `dock/README.md` + `glass.css` header + the spring cross-ref to AV.W9/AV.W11). No two lanes share a `modify` path.
**Hard gate**: a NEW born-RED gate green (`proof:liquid-glass-tokens`) asserting the new tokens exist (`--glass-edge-light{,-dark}`, the per-rung saturate/brightness on wash+quiet, the `--glass-specular-track*` recipe, the content-aware under-shadow modifier), the `@supports` gating holds (the `feDisplacementMap` refraction garnish is `@supports`-gated PE-only, never the substrate), and the PRM/reduced-transparency contract survives (the moving specular paints static under `prefers-reduced-motion: reduce`; the per-rung saturate maps to the opacity-only register under `prefers-reduced-transparency: reduce`; the AA floors at `tokens.css:332/339` hold); the existing gate matrix + `typecheck` + `build` stay green with no regression.
**Status**: planned

**Type:** IMPL + doc (design-evolution; token-edit-shaped, non-publish-blocking). The user ask: "glass-ui SOTA inspired by iOS 26."
**Scope source:** `docs/tranches/AV/audit/reinvent/ios26-tailwind-font-digest.md` §(1) (the material/control/depth/color fold ledgers M1–M7, D1–D5) + `ios26-partial-digest.md` §(1) (the lens-arm folds A–E + the motion folds M1–M5). This file is the FULLY-formed, execute-without-re-deriving spec.

**Precepts in force.** The warm-cream identity is the brand — every iOS-26 adopt is a token edit or an additive fold, NEVER a hue swap and NEVER a clone (Apple's "tint adapts to content" maps onto OUR cream tinting, not iOS blue). Token-first — every visual axis stays a `var(--…)`; consumers retune by override. No backwards-compat aliases (clean breaks). Tasteful, not a clone. KISS — credit-first: glass-ui already owns most of the model (the 5-rung ladder `glass.css:20-70`, the under-shadow=thickness rungs `tokens.css:796-799`, `--glass-specular` catch-light `tokens.css:685-686`, the `--glass-curvature-overlay` `tokens.css:691-700`, the three `@property` regs `tokens.css:1593-1609`, the PRM/reduced-transparency/contrast brackets `glass.css:294-322`), so the evolution composes onto the existing tokens rather than re-architecting them.

## 2a. Goal criterion

This wave succeeds if the *portable* Liquid Glass subset lands as token edits + additive folds over the warm-cream identity, with the legibility floor shipped alongside every opacity-touching fold. Concretely: (1) the pointer-anchored MOVING specular — the "light travels around the material / illuminate under your fingertips" behavior — paints as a `@property`-animated masked radial-gradient driven by pointer-tracked `--mouse-x/--mouse-y`, opt-in on the dock controls + Button glass variants + Card hover, reduced-motion-guarded to a static paint, with a `var()` fallback; (2) the lower rungs (wash + quiet) gain `saturate`/`brightness` to match the resting+ register; (3) an explicit `--glass-edge-light` token paints a full-perimeter rim distinct from the top-only `--glass-highlight`; (4) a content-aware under-shadow modifier deepens the shadow over text and lightens it over solid-light; (5) the no-glass-on-glass discipline (glass is the navigation layer only) is DOCUMENTED as a rung-pairing rule; (6) the iOS spring physics on controls (the momentum-gated press squish) is cross-referenced to the dock-motion arm (AV.W9) + the slider arm (AV.W11), not re-authored here. The reader's test: a dock control under a pointer paints a catch-light that tracks the cursor and settles smooth; the same control under `prefers-reduced-motion: reduce` paints the catch-light static at rest position with the warm-cream tint intact; the wash/quiet rungs read with the same saturation life as resting; a glass-over-glass nesting is flagged by the documented discipline.

## 3. Scope

1. **Per-rung saturate/brightness on the lower rungs (M1).** Today only `wash` and `resting` chain `saturate(1.05)` and `floating`/`overlay` chain heavier saturate (`tokens.css:609-613`); `quiet` is bare `blur()` (`tokens.css:610`). Add a small `saturate(1.05)` + `brightness()` to the `quiet` rung so the depth ladder reads with consistent saturation life across all five rungs (Apple: Liquid Glass concentrates light, it does not desaturate). `backdrop-filter`-chained filters are mature/cross-browser; the `prefers-reduced-transparency: reduce` bracket (`glass.css:295-311`) already maps `--glass-blur-quiet: none` so the saturate drops with the blur under reduced-transparency — verify the new chain inherits that override. Token-only; no consumer change.
2. **`--glass-edge-light` — the full-perimeter rim token (M3).** The library carries a top-only highlight (`--glass-highlight: inset 0 0.5px 0 0 …`, `tokens.css:670`) and a 1.5px-tall top-edge specular (`--glass-specular`, `tokens.css:685-686`). iOS-26 glass carries a full *rim* — a catch-light around the whole silhouette, not just the top edge. Mint `--glass-edge-light{,-dark}` — a four-edge inset ring (composed via a second inset `box-shadow` layer or a 1px `border-image`) distinct from the top-only highlight — and wire it onto the dock/floating tiers as the rim that "defines the silhouette" (WWDC25 sess. 219). Pure token + rung wiring; the `-dark` companion overrides inside `.dark` mirroring the `--glass-specular-dark` precedent.
3. **Content-aware under-shadow modifier (M4).** Apple raises shadow opacity over text, drops it over solid light. The under-shadow rungs already exist (`--glass-under-shadow-{quiet,default,vivid}`, `tokens.css:796-799`). Add an attribute-driven modifier — `.glass-over-text` / `[data-over-content]` — that swaps a text-bearing glass surface to a heavier under-shadow rung (e.g. `quiet`→`default`, `default`→`vivid`), and an inverse modifier that lightens over a solid-light backdrop. Attribute-driven, no JS; reuses the existing rungs, no new shadow value unless a fourth heavier rung is needed (author `--glass-under-shadow-text` only if `vivid` is insufficient over text).
4. **Pointer-anchored MOVING specular — illuminate-from-within (M2; HEADLINE).** The single most recognizably-Liquid-Glass behavior that is fully portable and Baseline today. A `@property`-registered set of stops + a masked `radial-gradient` driven by pointer-tracked `--mouse-x/--mouse-y` paints a catch-light that travels around the material and glows under the fingertip. New `glass-specular-track.css` rung: register `@property --specular-x`/`--specular-y` (`<percentage>`, `inherits: false`) and `@property --specular-intensity` (`<number>`), compose a `radial-gradient(circle at var(--specular-x) var(--specular-y), …)` over a `mask-image` so the glow rides the surface, and animate the `@property` stops on pointer-move. Opt-in via a `.glass-specular-track` class on the dock controls, the Button glass variants, and Card hover. **Mandatory guards:** a `prefers-reduced-motion: reduce` bracket that pins the specular static at rest position (no pointer-tracking, no animation); a `var(--specular-x, 50%)` fallback so the `@property` floor still paints a centered catch-light on an engine without typed-custom-property animation. `@property` crosses Baseline 2024-07-09; CSS `mask-image` crosses Baseline 2023-12-07 — both with the `var()` fallback. The pointer-position write (`--mouse-x/--mouse-y`) is a thin consumer-side pointer-listener or the existing dock pointer seam; the CSS half is the deliverable here.
5. **The `feDisplacementMap` refraction garnish — PE-only, `@supports`-gated (DEFER-as-garnish).** True SVG `feDisplacementMap` lensing/refraction (`backdrop-filter: url(#svg)`) is Chromium-only (WebKit bug #245510, Firefox not shipping) and resize-expensive. It lands ONLY as a progressive-enhancement garnish layered OVER the blur base, never the substrate, gated `@supports (backdrop-filter: url(#…))`. The gate asserts the garnish is `@supports`-gated and the blur base paints without it. If the team elects not to ship even the garnish this wave, KEEP-BOOK it with the trigger named (it reaches Baseline).
6. **No-glass-on-glass discipline (D5; DOC).** Apple: "glass is best reserved for the navigation layer that floats above the content" — no glass-on-glass. Document the rung-pairing rule in `dock/README.md` + the `glass.css` header: glass surfaces live in the navigation band only; a glass surface nested inside another glass surface is a discipline violation (the inner surface reads as a flat tier, not glass). Name the three layer bands (content → navigation → overlay) as the existing z-index registry already encodes (`tokens.css:271-287`). Optionally a lint note in the gate.
7. **iOS spring physics on controls — cross-ref, NOT re-author (C/M cross-ref; DOC).** The momentum-gated press squish (default 100% damping for taps, bounce only on momentumed gestures — WWDC18 sess. 803) and the velocity-continuity contract (WWDC23 sess. 10158) are OWNED by the dock-motion arm (AV.W9) and the slider arm (AV.W11). W15 does NOT re-author the spring wiring; it cross-references those waves in the `glass.css` header + `dock/README.md` so the material-evolution doc and the motion-evolution doc point at one another (the lens and the spring are one Liquid Glass behavior). State that the press squish toward `--scale-press-dock`/`--scale-press-btn` is the control's "lift up temporarily on touch, quiet at rest" register.

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The per-rung saturate addition shifts a rung off its HEAD paint under reduced-transparency.** If adding `saturate`/`brightness` to the `quiet` rung does not inherit the `--glass-blur-quiet: none` override under `prefers-reduced-transparency: reduce` (i.e. the saturate survives when the blur is meant to drop), the contract is broken — halt and triumvirate to re-seat the saturate inside the same bracketed override, do not local-patch.
- **The moving specular fails the reduced-motion static-paint assert.** If the `@property`-animated specular cannot be pinned static under `prefers-reduced-motion: reduce` without losing the centered fallback paint, that is a plan defect (the guard and the fallback are coupled) — halt, do not iterate the bracket a fourth time.
- **The `--glass-edge-light` rim reduces an AA contrast floor.** If the four-edge rim, composed over a busy backdrop, drops a text surface below the AA floors at `tokens.css:332/339`, halt — the rim is decoration and must not eat legibility; triumvirate to re-weight the rim alpha or gate it off text-bearing tiers.
- **The `feDisplacementMap` garnish leaks into the substrate.** If the refraction is reachable without its `@supports` gate (i.e. a non-Chromium engine paints a broken `url(#…)` reference instead of the blur base), that is a substrate violation, not a local fix — halt and triumvirate to re-gate.
- **Any diagnostic loop reaches its third iteration** on the moving-specular browser verify — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access | Lane |
|---|---|---|
| `src/styles/tokens.css` | modify (per-rung saturate on `quiet`; `--glass-edge-light{,-dark}`; the content-aware under-shadow rung IF `vivid` insufficient; the `@property --specular-*` regs) | A |
| `src/styles/glass.css` | modify (wire `--glass-edge-light` onto floating/dock; the `.glass-over-text`/`[data-over-content]` modifier; the no-glass-on-glass header doc) | A |
| `src/styles/glass-specular-track.css` | create (the pointer-anchored moving-specular rung — `@property`-animated masked radial + the reduced-motion bracket + the `var()` fallback + the `@supports`-gated refraction garnish) | B |
| `src/styles/index.css` | modify (import the new `glass-specular-track.css` rung in cascade order) | B |
| `src/components/custom/dock/DockIconButton.vue` | modify (opt-in `.glass-specular-track` + the pointer `--mouse-x/--mouse-y` write seam) | B |
| `src/components/ui/button/index.ts` | modify (the glass variants opt into `.glass-specular-track`) | B |
| `src/components/ui/card/Card.vue` | modify (the hover `.glass-specular-track` opt-in) | B |
| `src/components/custom/dock/README.md` | modify (the no-glass-on-glass discipline + the rung-pairing rule + the spring cross-ref) | C |
| `scripts/proof-liquid-glass-tokens.mjs` | create | A |
| `scripts/gates.mjs` | modify (register, orchestrator-merged) | A |
| `package.json` | modify (the `proof:liquid-glass-tokens` script row) | A |
| `docs/tranches/AV/PROGRESS.md` | modify | all |
| `docs/tranches/AV/audit/W15-liquid-glass.json` | create (the token tally) | A |

Do NOT touch: the aurora substrate (`src/components/custom/aurora/`, `src/composables/glass/` shader assets) — the moving specular is a CSS `backdrop-filter`/mask fold, NOT a shader change · the dock-motion spring wiring (`src/components/custom/dock/composables/useLayerTransition.ts`) — owned by AV.W9, W15 only cross-references it · `src/styles/theme.css` (the @theme bridges are not in scope; the edge-light token is a glass-local recipe, not a bridged utility) · `docs/precepts/` (NEVER).

## 4a. Disjointness

No two agent units share a `modify` or `create` path:

- **Lane A (material tokens)** owns `tokens.css` + `glass.css` + the `proof-liquid-glass-tokens.mjs` gate + the `W15-liquid-glass.json` tally. It mints the per-rung saturate, `--glass-edge-light{,-dark}`, the content-aware under-shadow modifier, and the `@property --specular-*` registrations (the registrations live in `tokens.css` alongside the existing three regs at `:1593-1609`; the *consumption* lives in Lane B's `glass-specular-track.css`). Disjoint from B/C.
- **Lane B (moving specular)** owns the new `glass-specular-track.css` rung + the `index.css` import line + the three consumer opt-ins (`DockIconButton.vue`, `button/index.ts`, `Card.vue`). It READS the `@property --specular-*` regs Lane A mints but declares none. Disjoint from A/C.
- **Lane C (discipline doc)** owns `dock/README.md` only (DOC). Disjoint from A/B.
- `scripts/gates.mjs` + `package.json` + `PROGRESS.md` are orchestrator-integrated at close (append-only to disjoint regions).

Net: three parallel lanes — **(A) material tokens + gate**, **(B) moving specular + consumers**, **(C) discipline doc**.

## 4b. Worktree Plan

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — material tokens | `/Users/mkbabb/Programming/glass-ui-w15-a` | owns `tokens.css` + `glass.css` + the gate; mints the `@property` regs |
| Lane B — moving specular | `/Users/mkbabb/Programming/glass-ui-w15-b` | owns the new rung + the three consumer opt-ins; reads Lane A's regs |
| Lane C — discipline doc | `/Users/mkbabb/Programming/glass-ui-w15-c` | owns `dock/README.md` (DOC) |

No `CARGO_TARGET_DIR` (Node/Vite repo). Each lane runs `npm run typecheck` / `npm run build` / its gates against its own worktree checkout. The orchestrator runs `git worktree add` for the siblings before dispatch and owns the `gates.mjs`/`package.json`/`PROGRESS.md` integration at close. All three lanes branch from the same clean main with AV.W4/W5 committed.

## 5. Agent Units

### AV.W15.A Material token folds + the liquid-glass gate

- **Goal:** the lower rungs read with the same saturation life as resting+, an explicit full-perimeter `--glass-edge-light` rim paints distinct from the top-only highlight, and a content-aware under-shadow modifier deepens over text — all token edits over the warm-cream identity, machine-asserted.
- **Mechanism:** (1) add `saturate(1.05)` + a small `brightness()` to `--glass-blur-quiet` (`tokens.css:610`), verifying the `prefers-reduced-transparency: reduce` bracket (`glass.css:295-311`) drops it with the blur; (2) mint `--glass-edge-light{,-dark}` as a four-edge inset ring and wire it onto the floating/dock tiers in `glass.css`; (3) add the `.glass-over-text` / `[data-over-content]` under-shadow-swap modifier reusing `--glass-under-shadow-{default,vivid}` (`tokens.css:796-799`), authoring `--glass-under-shadow-text` ONLY if `vivid` is insufficient over text; (4) register `@property --specular-x`/`--specular-y` (`<percentage>`) + `--specular-intensity` (`<number>`) alongside the existing three regs (`tokens.css:1593-1609`); (5) author `proof:liquid-glass-tokens`.
- **Files:** `src/styles/tokens.css`, `src/styles/glass.css`, `scripts/proof-liquid-glass-tokens.mjs`, `scripts/gates.mjs`, `package.json`, `docs/tranches/AV/audit/W15-liquid-glass.json`.
- **Sub-gate:** `proof:liquid-glass-tokens` green — the new tokens resolve, the per-rung saturate inherits the reduced-transparency override, `--glass-edge-light` paints on the floating/dock tiers, the content-aware modifier swaps under-shadow rungs, the `@property --specular-*` regs exist; `typecheck` + `build` stay green.

### AV.W15.B Pointer-anchored moving specular + consumer opt-ins

- **Goal:** a catch-light tracks the pointer across the material and glows under the fingertip on the dock controls + Button glass + Card hover, settling smooth, with a static reduced-motion paint and a centered `var()` fallback.
- **Mechanism:** create `glass-specular-track.css` — a `.glass-specular-track` rung composing a `radial-gradient(circle at var(--specular-x, 50%) var(--specular-y, 50%), …)` over a `mask-image`, animating the `@property --specular-*` stops on pointer-move; a `prefers-reduced-motion: reduce` bracket pins it static at rest; the `feDisplacementMap` refraction garnish is `@supports (backdrop-filter: url(#…))`-gated PE-only over the blur base. Import in `index.css` cascade order. Opt the three consumers in (`DockIconButton.vue` `.glass-specular-track` + the pointer `--mouse-x/--mouse-y` write; the Button glass variants in `button/index.ts`; the Card hover in `Card.vue`).
- **Files:** `src/styles/glass-specular-track.css`, `src/styles/index.css`, `src/components/custom/dock/DockIconButton.vue`, `src/components/ui/button/index.ts`, `src/components/ui/card/Card.vue`.
- **Sub-gate:** the moving specular paints tracking the pointer; under `prefers-reduced-motion: reduce` it paints static (the reduced-motion assert in `proof:liquid-glass-tokens`); the `var()` fallback paints a centered catch-light; the refraction garnish is `@supports`-gated (the substrate paints the blur base without it); `typecheck` + `build` green.

### AV.W15.C No-glass-on-glass discipline + spring cross-ref

- **Goal:** the rung-pairing rule (glass is the navigation layer only; no glass-on-glass) and the iOS-spring-on-controls cross-ref are documented so a consumer reads the discipline from the docs, not the source.
- **Mechanism:** document in `dock/README.md` + the `glass.css` header (Lane A owns the `glass.css` header edit — Lane C drafts the prose, Lane A integrates it into its `glass.css` modify to keep the path disjoint; the canonical home is `dock/README.md`): the three layer bands (content → navigation → overlay, per `tokens.css:271-287`), the no-glass-on-glass rule, and the cross-ref to AV.W9 (dock motion / velocity continuity) + AV.W11 (slider) for the momentum-gated press squish as the control's "alive on touch, quiet at rest" register.
- **Files:** `src/components/custom/dock/README.md`.
- **Sub-gate:** `dock/README.md` carries the no-glass-on-glass discipline + the three-band model + the spring cross-ref; `proof:doc-consistency` (if present) stays green.

## 6. Hard Gate

1. **`proof:liquid-glass-tokens` born RED then green.** Asserts: (a) `--glass-edge-light` + `--glass-edge-light-dark` resolve and are wired onto the floating/dock tiers; (b) the `quiet` rung's `backdrop-filter` chains `saturate` (parity with the other rungs); (c) the `.glass-over-text` / `[data-over-content]` content-aware under-shadow modifier resolves to a heavier rung; (d) the `@property --specular-x`/`--specular-y`/`--specular-intensity` registrations exist; (e) the moving specular paints STATIC under `prefers-reduced-motion: reduce` (no pointer-tracking, no animation) AND a centered `var()` fallback paints without the typed-property animation; (f) the per-rung saturate maps to the opacity-only register under `prefers-reduced-transparency: reduce` (the saturate drops with the blur); (g) the `feDisplacementMap` refraction garnish is `@supports`-gated PE-only (the blur base paints without it); (h) the AA contrast floors at `tokens.css:332/339` survive the edge-light + moving specular over a busy backdrop.
2. **`typecheck` + `build` stay green** with no regression across the existing gate matrix.
3. **`dock/README.md` carries the no-glass-on-glass discipline** + the three-band model + the AV.W9/AV.W11 spring cross-ref (Lane C deliverable, verified by read).
4. **Visual-regression snapshot** per rung (the per-rung saturate) + the moving-specular static-vs-tracking states + the reduced-motion static paint, saved under `docs/tranches/AV/audit/`.

## 7. Format And Lint Cadence

Docs-and-CSS-and-SFC wave. Run `npm run typecheck` + `npm run build` after each lane's integration batch and before close; `npx prettier --check` on the touched `.css`/`.ts`/`.vue`; `git diff --check` for whitespace; the new `proof:liquid-glass-tokens` + the existing gate matrix at close. The CSS lint is the proof gate (it asserts token existence + the `@supports`/PRM brackets); there is no separate stylelint pass in-repo.

## 8. Verification Artefacts

- `docs/tranches/AV/audit/W15-liquid-glass.json` — the token tally (new tokens, the rung-saturate parity, the `@property` regs, the brackets).
- The per-rung + moving-specular + reduced-motion-static screenshots under `docs/tranches/AV/audit/`.
- The `proof:liquid-glass-tokens` run log.
- Integration commit hashes at close.

## 9. Commit Plan

- **Lane A** — `feat(tranche-AV): W15 (material) — per-rung saturate + --glass-edge-light rim + content-aware under-shadow + the @property specular regs + proof:liquid-glass-tokens`. Body: the token folds + the PRM/reduced-transparency contract.
- **Lane B** — `feat(tranche-AV): W15 (specular) — the pointer-anchored moving specular rung + the three consumer opt-ins + the reduced-motion static guard`.
- **Lane C** — `docs(tranche-AV): W15 — the no-glass-on-glass discipline + the iOS-spring cross-ref`.
- **Orchestrator** — gate registration + `PROGRESS.md` status at close.

## 10. Dependencies

- **Depends on**: AV.W4 (the supply-side token surface — the shadow-contract + the configurator docs land a current token surface), AV.W5 (the transposition/idiom folds). Cross-refs AV.W9 (dock motion / velocity continuity) + AV.W11 (slider) for the spring-on-controls register (no write dependency — DOC cross-ref only).
- **Blocks**: AV.W16 (modern-Tailwind) reads the W15 token surface for the `@theme` completeness assert, but the two waves are file-disjoint and may run in either order; sequence W15 first if the edge-light token wants a bridged utility (it does not — it is a glass-local recipe).

## 11. Archaeology

Not a revisit. The credit-first framing (glass-ui already owns the 5-rung ladder, the under-shadow=thickness, the catch-light, the curvature overlay, the `@property` regs, the PRM/contrast brackets) is the AL-W10 SLIM under-shadow wiring (`glass.css:28-39`) + the AQ.W5 `@starting-style`/`@property` grammar landing as the substrate this wave composes onto. The moving specular is NEW; the refraction garnish is held DEFER-as-garnish on the WebKit-bug-#245510 trigger.
