# AX convergence plan — wave-update ledger (post-3.8.0 live audit)

Synthesis of the WF1 deep audit (23 lanes, `convergence/D*.md` + `A-*.md`) against the
17-defect ledger (`USER-DEFECTS-2026-06-08.md`). Every entry is dedup-confirmed at the
source level. NO over-prescription: a defect folds into an existing planned wave wherever
one fits; a NET-NEW wave is minted only where the audit proved no wave owns it.

## Headline finding (the cardinal lesson, formalized)

`A-session-soundness` (BLOCKER): "complete" was inflated — **W09 and W05 closed on
headless-GREEN while their own audit JSONs recorded live-pending / known-jarring.** The
user's "I thought specular was fixed" (D11) and "BouncyTabs is egregious" (D3) are the
live-truth contradictions their own close protocols mandated checking. **Discipline:** a
wave whose JSON status is not unconditionally `complete` MUST carry its qualifier into
PROGRESS.md (as the W04/W05/W13/W22-band sections already do). De-mark **W09 complete →
live-pending**; surface **W05's preserved-bounce as a carry row**.

## NET-NEW waves (no existing wave owns these — minted)

| New | Title | Folds | Source finding |
|---|---|---|---|
| **W44** | dark-mode semantic-token contrast — destructive/alert AA floor | D10 | token-first dark `--destructive` lift to ≥4.6:1 (e.g. `hsl(0 80% 60%)`), both `light-dark()` + `.dark` arms in lockstep; split to `--destructive-text` if one value can't clear both floors. dependsOn W00, BEFORE W39. NOT W36 (forced-colors, dark-arm-irrelevant). |
| **W45** | dock region-model + DockSeparator + mobile scale | D13 + D15 (same files → one wave) | three-region morph `[persistent][divider][morph-region]`; `#persistent` slot on the W02 orchestrator spring (always in-flow, never crossfaded); H/V proportion parity (delete hardcoded vertical gap/pad); ONE `--dock-scale` coarse-pointer multiplier (`--dock-mobile-scale` default 1.5) threading the `[data-density]` cascade so box/pad/gap/glyph/radius grow in lockstep (subsuming both 44px floors via `max(…,44px)`); `<DockSeparator>` primitive (orientation via `useOptionalDock`); library glyph ownership (`.dock-icon-button > svg` reads `--dock-icon-glyph`). |
| **W46** | blob live-truth tune | D4 + D5 + D7 (discharges the deferred W15/W16 live π) | convert `blob-render.spec.ts` FLOORS → BANDS (domeLumaStd 9≤std≤~14, centroidShift 0.012≤Δ≤~0.06) so "louder" stops passing; re-tune lighting cohort + pointerStrength/falloff DOWN to a calm wet bead (D4 over-bright specular/rim, D5 lunging hover); generalize `excitedHoldMs` → a manual-mood latch so an imperative `setMood` survives the auto-mood arc (D7). Re-opens W15's interaction-magnitude + default-identity blocks (W16 touched neither). |
| **W47** | aurora preset-roster reconcile (demo) | D2 | repoint `OIL_VANGOGH`→`medium:"vangogh"` + `strokeOrient:"tensor"`, rename "Oil Swirl"→"Van Gogh" (clean-break key rename, no alias); name oil-pastel in the CRAYON_* labels; optional crayon hero. π-lane: the thumbnail must show atomic dabs, not the old oil smear. Falls between W13/W10/W38 (all exclude `demo/presets.ts`). |
| **W48** | glass-material demo reauthor | D8 (+ same meta-class as D7/the W20 card-story) | rewire `glass-material.vue` to the shipped seams: compose `useSpecularTracking` + bind `specularStyle`/`onPointerMove` per plate; non-zero `--glass-tint-strength`; `glass-card` + real glass `Button` (retire abused `glass-btn`); rim on/off contrast device. Zero library edits — a demo built against prior behaviour, never rewired post-W09. |
| **W49** | math-paper composes latex-paper | D16 | add `@mkbabb/latex-paper` + `katex` as glass-ui DEV/demo deps (contract-v2 sibling path like keyframes.js); rewrite `math-paper.vue` onto latex-paper `useKatex()`/`MathBlock`/`MathInline` (a Theorem for the du Bois-Reymond/Dirichlet–Jordan statement), delete the Unicode/`<sub>`/`<sup>` salad. Token-bridge the math/theorem rules into glass-ui idiom — do NOT import latex-paper's `theme.css` raw (legacy `hsl(var(--token))` double-wrap). Dedup from W43 (fourier-FIELD graphics, distinct). |
| **W50** | uniform dropdown/select/menu type-scale | D17 (not in WF1 — orchestrator-added) | the shadcn-vue family (Select/DropdownMenu/Combobox/ContextMenu items) inherits inconsistent font-size/scaling; mint ONE shared type-scale token the `menuItemVariants` CVA + the select/dropdown triggers read, overriding the shadcn default so every dropdown-family element shares one scale. Token-first. (WF3 lane must first audit D17 at source — it was added after WF1.) |
| **W51** | comfortable component sizing — library-wide `--ui-scale` | D18 (UMBRELLA) | the shadcn-vue compact defaults (h-9/h-8, text-sm/text-xs, size-4 glyphs) read too small on BOTH mobile + desktop. Mint ONE coordinated `--ui-scale` (default a modern-comfortable >1, e.g. 1.0 desktop / 1.5 coarse-pointer via the existing coarse-pointer `@media`/`@container`) threaded through the component CVA base sizing + the typography ladder, so control height, padding, gap, font-size, and glyph size all grow in lockstep — proportion preserved, no per-component hack, idiomatic + modern. **W45 (`--dock-scale`) + W50 (dropdown type-scale) become SPECIALIZATIONS that read `--ui-scale`** (the dock/dropdown scales are local overrides on the global axis — reconcile so there is ONE scale system, not three). Author `proof:ui-scale` (device-free: every interactive atom's size/font/glyph derives from `--ui-scale` via calc, no stray h-9/text-sm/size-4 literal in the CVA bases; coarse-pointer amplifies; π arm: getComputedStyle size + font parity grows 1.5x under coarse-pointer). dependsOn W00; sequence W51 BEFORE W45/W50 so they specialize the global axis. |

## RE-OPENS (de-mark complete → live-pending, augment scope)

| Wave | Was | Now | Add |
|---|---|---|---|
| **W09** | complete | live-pending | D11: 3 sibling FIXED-ANCHOR specular radials W09's moving-specular pass missed (tokens.css `--glass-curvature-overlay` + 2 more). Re-open Scope+FileBounds; the binding live-truth audit W09's own close mandated. |
| **W05** | complete | complete + carry-row | D3: BouncyToggle `animatePress` double-springs (keyframe overshoot × `--spring-bouncy`, in 200ms). Re-open MOTION-SHAPE arm — single governed overshoot, `scale(1)→--scale-press→scale(1)`, re-point press to CONTROL `--spring-snappy`, token-resolve duration. |

## AUGMENTS to existing planned waves (no new wave)

- **W38** (aurora configurator restyle) ← D1 + A-waves-aurora: promote `AuroraAtomsPanel.vue` + `config/*Layer.vue` from "do-not-touch/class-align-only" to "modify" — reauthor the 4 native `<select>` + the enum-`BouncyTabs` mis-pickers onto `LabeledSelect`, the 4 native ranges onto `LabeledSlider`, the sections onto `ConfiguratorLayer`/`ConfiguratorRow`. RATIFY: the `type=color` seed swatch (3 sites → maybe a `ColorSwatch` primitive, ≥2-consumer decision). Consider a sibling **W38b** for born-RED-gate disjointness (library-SFC gate vs demo idiom pass).
- **W18** (storybook IA) ← D6 (REVERSE its "blob trio STAYS" line → consolidate goo-blob/blob-interaction/blob-mood to ONE `substrates/blob`; updates `proof:storybook-ia` EXPECTED_TREE) + D14 (the Dock first-class category).
- **W06** (dock storybook + css split) ← D14: author the morph/animation showcase section + the variants/density axis-tour SFC content on `navigation/dock.vue`.
- **W20** (primitive fix) ← A-recap: the `hsl(var(--background))` dialog-scrim is already W20 RED-witness-1; add a scope-clarification + correct the `tokens.css:1342` blessing comment.
- **W40** (demo-shell dock-nav) ← D9: the BottomDock NCSU-red underline/pill active affordance → subtle/none (already in W40 FileBounds + Scope §3).
- **W28/W29** (speedtest native-first / repatriation) ← D12: the InstrumentChassis retire is ALREADY planned here (W29 authors the full chassis strike, pending native-first sequencing) — NOT a stale survivor, NOT a new wave. Confirm + surface the sequencing.

## STRUCTURAL refreshes (A-waves-structural — augments, never new)

All of W25a/b·W26·W27a/b·W28·W29·W33·W34·W35·W41 stay VALID + born-RED at 3.8.0; the
targets grew ~30% (refresh counts: dock.css 1227→1418, tokens 1728→1835, glass 691→750,
metaball 569→690, barrel refs 3→6 from the W37 re-home, src 878→1042). The **ci.yml drift**
(`verify-ci` RED — 14 ci-tagged gates absent from ci.yml, mostly π-lane) is a **W33 /
band-close** task needing the π-gate-in-CI infra decision (give the π gates a device-free
CI arm, OR re-tag them local-only). The **profile:budget 140k CSS budget** (lifted for the
3.8.0 cut) is forward-sized for the convergence CSS net of the trims.

## Sequencing (the convergence execution order)

1. **Live-truth re-opens first** (the user's loudest defects): W09 (D11 specular), W46 (D4/D5/D7 blob), W44 (D10 dark contrast), W05 (D3 bouncy). These are visual-truth, real-device-verified.
2. **Dock structural**: W45 (D13/D15) + W40 (D9) + W06/W18 dock section (D14).
3. **Aurora/demo idiom**: W38 + W38b (D1) + W47 (D2).
4. **Demo reauthor**: W48 (D8), W49 (D16), W50 (D17).
5. **Storybook IA**: W18 (D6 consolidation).
6. **Structural/close**: W25-W29, W33 (incl. ci.yml), W34/W35/W41.

Each closes on LIVE real-device audit (the AX cardinal lesson), not a headless gate.
