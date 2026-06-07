# AW.W20 - Styling assay (tokenization + Tabs pill-track + ToggleGroup re-roll)

## §0 — Disposition note: drawer-live-behind (the silently-dropped audit)

The `/compositions/drawer-live-behind` "wtf" audit (`RECAP :28`) had no `AW.md §0` row and no covering wave — it was silently dropped. It is dispositioned HERE (it is a demo-staging/styling concern, the W20 register).

**Verdict: no-defect-found OR demo-staging-only.** The `Drawer mode="live-behind"` contract is intact at HEAD (CLAUDE.md "Drawer modes" — `mode="live-behind"` bundles `modal:false` + `shouldScaleBackground:false` + `snapPoints:[0.12,0.5,1]`; the documented vaul-vue upstream limitation on re-snapping an already-open sheet is NOT a glass-ui bug, recorded at `docs/tranches/AN/audit/W3-drawer-detents.md §A.limitation`). W20's drawer obligation is therefore bounded: **render-verify the `compositions/drawer-live-behind` story over a real backdrop and confirm the live-behind surface stays interactive (the scrim does not occlude); if the "wtf" was a perception gap, it is a demo-staging fix in the same class as W12's glass-panel backdrop, not a component change.** No `src/components/ui/drawer/*` edit is in W20 scope unless the render-verify surfaces a genuine `.glass-drawer` cascade defect (which would trigger a triumvirate scope reveal). The disposition closes the dropped-audit gap; the evidence (a render-verify screenshot + a one-line verdict) lands in `audit/W20-styling-assay.md §drawer`.

The conditional `/foundations/native-top-layer` re-fold (`RECAP :24`) is dispositioned in the same ledger as a one-line re-verify: the demo relocated to Containers at AV.W10; W20 confirms the relocated route renders clean (verified-clean) or books the residual as a follow-on. No component change unless the relocated demo still misbehaves.

## State

**Name**: W20 - Styling assay (tokenization + Tabs pill-track + ToggleGroup re-roll)
**Opens after**: AW.W12 (the glass-panel/card demo stories — W20's ToggleGroup re-roll lands on the same story surface W12 staged; sequence after, do not parallelize the shared story paths)
**Agents**: 1 serial
**Hard gate**: `proof:styling-hygiene` green — no brittle magic-number survives where a token resolves (the named sites tokenized); the glass-panel/card demo controls consume `<ToggleGroup>` (grep finds no raw-`<button>` tier-force re-roll — the ToggleGroup bite); `useTokenColor` documents its public-vs-reference status.
**Status**: planned

## 2a. Goal criterion

This wave succeeds if, when work ends, the deeper styling assay the AV.W16 v4-idiom pass left is closed: the brittle calc/magic-numbers at the named sites resolve through tokens, the Tabs pill-track sizing is token-driven (not a hand-computed pixel), the demo raw-`<button>` tier-force controls are re-rolled onto `<ToggleGroup>` (the canonical single-select case per CLAUDE.md "Tabs vs ToggleGroup"), and `useTokenColor` carries its public-vs-reference documentation. The drawer-live-behind audit is dispositioned (§0). This is a hygiene assay, not a redesign — every change is a brittle-literal → token or a hand-rolled-control → shipped-primitive swap.

## 3. Scope

1. **Brittle magic-number → token.** Locate the named brittle calc/magic-number sites the assay flagged (a hardcoded pixel/`calc()` where a `--token` or a `@theme` alias already resolves); replace each with the resolving token. The assay's site list is the W20 input — each replacement is a literal→token swap, no value change to the resolved result. `proof:styling-hygiene` greps the named sites for the surviving literal.
2. **Tabs pill-track sizing.** The Tabs/BouncyTabs/UnderlineTabs pill-track (the active-indicator track geometry) uses a brittle hand-computed size where a token-driven track would self-size. Re-express the track sizing onto the existing token/`@container`-query idiom (the active-state vocab canon — V.W3) so the pill track reads from a `--token`, not a magic pixel. No visual change to the resting/active register; the track just becomes token-driven.
3. **Demo raw-`<button>` → `<ToggleGroup>` re-roll (the bite).** The glass-panel/card demo stories hand-roll a tier-force control as raw `<button class="bg-card border ...">` (frontend-convergence-digest — the glass-panel story hand-rolls a button instead of using `<ToggleGroup>`). Re-roll those raw controls onto `<ToggleGroup>` — the canonical single-select case (one surface mutated, no panel swap — CLAUDE.md "Tabs vs ToggleGroup"). The `proof:styling-hygiene` **bite**: a grep finds NO raw-`<button>` tier-force re-roll surviving in the glass-panel/card stories → a re-rolled raw control that survives reddens the gate.
4. **`useTokenColor` public-vs-reference documentation.** `useTokenColor` (the "wtf" — RECAP) is reachable but its public-vs-reference status is undocumented. Document it: name whether it is a public composable or a reference-only leaf, and document the return shape (this composes with W15's injection seam — W15 added the optional `resolver` arg; W20 adds the public-vs-reference DOC, not a second seam). One header-comment block + the `audit/W20-styling-assay.md` note; no signature change.
5. **Drawer-live-behind + native-top-layer dispositions** (§0) — the render-verify evidence + the one-line verdicts land in `audit/W20-styling-assay.md`.

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- a brittle-number tokenization reveals the literal does NOT have a resolving token (the value is genuinely bespoke, not a missing token reference) — the swap would MINT a token, which is a scope reveal beyond the assay (the assay is literal→existing-token, not new-token authoring);
- the Tabs pill-track token re-expression changes the resolved track geometry (the token does not reproduce the hand-computed size) — a non-local-recoverable visual regression on the active-indicator;
- the drawer-live-behind render-verify surfaces a genuine `.glass-drawer` cascade defect (a real component bug, not a demo-staging perception gap) — file bounds expand into `src/styles/drawer.css` or `src/components/ui/drawer/*`, escalate (the §0 verdict was no-defect; a real defect invalidates it).

## 4. File Bounds

| File | Access |
|---|---|
| `<the named brittle-magic-number sites>` (per the assay site list) | modify-carve (literal → token) |
| `src/components/custom/tabs/` (the pill-track sizing site) | modify-carve (token-driven track) |
| `demo/stories/substrates/glass-panel.vue` | modify-carve (raw-`<button>` → `<ToggleGroup>`) |
| `demo/stories/primitives/card.vue` | modify-carve (raw-`<button>` → `<ToggleGroup>`) |
| `src/composables/dom/useTokenColor.ts` | modify-carve (public-vs-reference doc header only — NO signature change) |
| `scripts/proof-styling-hygiene.mjs` | create |
| `package.json` | modify (register `proof:styling-hygiene`) |
| `docs/tranches/AW/audit/W20-styling-assay.md` | create (the assay ledger + the §0 dispositions) |

Do NOT touch: `docs/precepts/`, `src/components/ui/data-table/` (W14), `src/styles/glass.css`/`Slider.vue`/`button/index.ts` (W13), `src/components/custom/glass-panel/GlassPanel.vue` (W12 owns the component; W20 touches only the DEMO stories), `src/styles/drawer.css`/`src/components/ui/drawer/*` (the §0 verdict is no-defect; touching them needs a triumvirate scope reveal). W20's `useTokenColor` touch is the doc header ONLY — W15 owns the `resolver` arg; the two carves are disjoint (doc comment vs signature).

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W20 opens after W12 so the glass-panel/card DEMO stories are clean before W20's ToggleGroup re-roll (W12 staged the backdrop; W20 swaps the control — sequenced, not parallel, on the two shared story paths). W20's `useTokenColor.ts` touch is a doc-comment carve disjoint from W15's `resolver`-arg carve (if W15 has not yet closed, sequence W20's doc carve after W15's signature carve — they touch different regions of the same file, so do not parallelize). W20 shares no other `modify` path with W12/W13/W14/W15/W19.

## 5. Agent Units

### AW.W20.a The styling assay + ToggleGroup re-roll

- Goal: the named brittle literals tokenized, the Tabs pill-track token-driven, the demo raw-`<button>` controls re-rolled onto `<ToggleGroup>`, and `useTokenColor` documented public-vs-reference — frozen by `proof:styling-hygiene` with the ToggleGroup bite.
- Mechanism:
  - Replace each named brittle magic-number with its resolving token (literal→token, no value change).
  - Re-express the Tabs pill-track sizing onto the token/`@container` idiom.
  - Swap the glass-panel/card demo raw-`<button>` tier-force controls for `<ToggleGroup>` (single-select, one surface mutated).
  - Add the public-vs-reference doc header to `useTokenColor`.
  - `scripts/proof-styling-hygiene.mjs`: grep the named brittle sites for the surviving literal (must be 0); grep `demo/stories/substrates/glass-panel.vue` + `demo/stories/primitives/card.vue` for a raw-`<button>` tier-force control (the bite — must be 0; the controls are `<ToggleGroup>`); assert `useTokenColor.ts` carries a public-vs-reference doc block. Born RED on HEAD (the literals + the raw buttons survive; the doc is absent). Register `"proof:styling-hygiene"`.
- Files: the brittle sites, the tabs pill-track, the two demo stories, `useTokenColor.ts`, the gate script, `package.json`, the ledger.
- Sub-gate: `npm run proof:styling-hygiene` green; the demo controls render as `<ToggleGroup>` without console error; `vue-tsc --noEmit` green; `npm run build` emits the `/styles` bundle unchanged modulo the tokenized literals.

## 6. Hard Gate

1. **Tokenized literals.** `proof:styling-hygiene` greps each named brittle-magic-number site and finds the resolving token, not the literal (count of surviving literals = 0). The resolved visual result is unchanged (literal→token, not a value change).
2. **Tabs pill-track token-driven.** The pill-track sizing reads from a `--token`/`@container` query, not a hand-computed pixel; a grep finds no surviving brittle pixel on the track-geometry rule.
3. **ToggleGroup re-roll (the bite).** `grep` over `demo/stories/substrates/glass-panel.vue` + `demo/stories/primitives/card.vue` finds the tier-force control rendered as `<ToggleGroup>` and finds NO raw-`<button class="...border...">` tier-force re-roll surviving. A re-rolled raw control that survives → RED. (Born RED on HEAD: the stories hand-roll the button today.)
4. **`useTokenColor` documented.** `grep` confirms a public-vs-reference doc block in `useTokenColor.ts` (the status + the return shape); the signature is unchanged (W15's `resolver` arg is the only signature surface — W20 adds DOC, not a seam).
5. **Drawer + native-top-layer dispositions recorded.** `audit/W20-styling-assay.md §drawer` carries the drawer-live-behind render-verify verdict (no-defect | demo-staging-fix) + the native-top-layer re-verify (verified-clean | follow-on booked).
6. **Build + types green.** `npm run build` + `npm run typecheck` pass.

## 7. Format And Lint Cadence

- `npm run typecheck` after the tabs pill-track + `useTokenColor` doc carve, and before close.
- `npm run proof:styling-hygiene` after the tokenization + the ToggleGroup re-roll land.
- `npm run build` before close (the `/styles` bundle re-emits modulo the tokenized literals).
- `git diff --check` for whitespace.
- No formatter skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W20-styling-assay.md` — the brittle-site → token ledger, the Tabs pill-track before/after, the ToggleGroup re-roll diff, the `useTokenColor` public-vs-reference note, and the §0 drawer-live-behind + native-top-layer dispositions (with the render-verify screenshot refs).
- `scripts/proof-styling-hygiene.mjs` JSON artifact.
- A screenshot of the re-rolled `<ToggleGroup>` tier-force control on the glass-panel story.
- The integration commit hashes.

## 9. Commit Plan

- `refactor(styles): tokenize the named brittle magic-numbers (literal → resolving token)` — the tokenization; body lists each site + its token.
- `refactor(tabs): token-driven pill-track sizing` — the track re-expression; body cites the active-state vocab canon (V.W3).
- `refactor(demo): re-roll the tier-force controls onto ToggleGroup (single-select)` — the two story swaps; body cites CLAUDE.md "Tabs vs ToggleGroup".
- `docs(dom): document useTokenColor public-vs-reference status` — the doc header.
- `feat(gate): proof:styling-hygiene (the ToggleGroup bite)` — the `.mjs` + registration.
- `docs(AW): W20 close — styling assay ledger + drawer/native-top-layer dispositions` — the artefact + status flip.

## 10. Dependencies

- **Depends on**: AW.W12 (the glass-panel/card demo stories — W20's ToggleGroup re-roll lands on the staged story surface). Composes with W15 (the `useTokenColor` doc header is disjoint from W15's `resolver`-arg seam; sequence the two carves on the shared file).
- **Blocks**: AW.W21 (the close wave registers `proof:styling-hygiene` in `gates.mjs` and the π lane sweeps the re-rolled demo controls).

## 11. Archaeology

The AV.W16 v4-idiom pass closed the Tailwind-v4 surface but left a deeper styling assay open (brittle calc/magic-numbers, the Tabs pill-track, the demo raw-`<button>` controls). The drawer-live-behind audit (`RECAP :28`) was a "wtf" with no charter row — it is dispositioned here (§0) as no-defect/demo-staging because the `mode="live-behind"` contract is intact at HEAD and the vaul-vue re-snap limitation is a documented upstream non-bug (`docs/tranches/AN/audit/W3-drawer-detents.md`). The guardrail against a regressed control is `proof:styling-hygiene`'s ToggleGroup bite (a re-rolled raw button reddens it).
