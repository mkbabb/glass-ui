# N.W1 Lane B — `@utility text-micro` promotion VERIFY (existing at HEAD) — proof

## Disposition

VERIFY-ONLY at HEAD. The audit's claim "promote `text-micro` to a Tailwind utility" is MOOT — the utility ALREADY EXISTS at `src/styles/typography.css:235`:

```css
@utility text-micro {
    font-size: var(--type-micro);
    line-height: 1.25;
}
```

AND the Tailwind v4 `@theme` bridge exists at `src/styles/theme.css:14`:

```css
--text-micro: var(--type-micro);
```

This makes `text-micro` available as both:
1. A `@utility text-micro` (full recipe — font-size + line-height).
2. A Tailwind v4 `text-micro` font-size class (via `--text-micro` in `@theme`).

Per N invariant 22 (audit-verdict spot-verification gate), the orchestrator spot-verified before authoring a wave-spec that absorbed Lane B as "promote a missing utility" — and surfaced that the utility was already in place. Lane B becomes a verification + downstream sweep coordination note instead of an additive action.

## Spot-verification

- `grep -n "@utility text-micro" src/styles/typography.css` → line 235 (definition).
- `grep -n "text-micro" src/styles/theme.css` → line 14 (@theme bridge).
- `rg -l "text-micro" src/ demo/` → 5 consumer sites: `LabeledSelect.vue`, `MetricBadge.vue`, `toggle-chip/index.ts`, `demo/stories/foundations/typography.vue`, plus the definition/bridge files.
- Built output (`dist/glass-ui.css`): the library bundle ships scoped component CSS only; Tailwind utilities (including `text-micro`) emit at CONSUMER build time, not in the library dist. This is by Tailwind v4 design and is correct.

## Lane C handoff

The 9 `text-[0.6875rem]` literal call-sites the audit flagged (Rγ G2 + Rδ CG4) are the actual deliverable — and they belong to Lane C's literal sweep, not Lane B. Per `audit/W1-Lane-C-typography-sweep-N4-absorb-proof.md` (Lane C close), those 9 sites swap from literal → `text-micro` semantic class.

## Canonical pattern citation

Prior precedent for "spot-verify a claim of 'missing utility' against actual @theme + @utility state": K W6 btn-audacious recipe verification (the `@utility btn-audacious` ALSO existed at HEAD before the audit's claim that it was missing landed). The pattern matches: tranche-open audits over a fast-moving substrate sometimes return false-positive "missing" verdicts; spot-verification catches them.

This Lane B (no new utility added) + N.W0 Lane B (audit-verdict spot-verification gate codified) close the loop: the same precept that hardened N.W0 against the useTouchGate retirement also catches the text-micro false-positive at N.W1.

## Verification

- `@utility text-micro` exists: PASS.
- `--text-micro` @theme bridge exists: PASS.
- 5 consumer sites already use the semantic class: PASS.
- `npm run typecheck` / `npm run build` / `npm run profile:budget` (run at Lane C close): PASS-dependent.

## Open questions for orchestrator

None.

## Worktree diff verification output

This lane was orchestrator-direct (verification only; no file edits). No agent worktree.
