# Routed asks from speedtest/AV → glass-ui (AX), 2026-06-08

The AV coordination doc (speedtest is reader-only on glass-ui, inv-16) routes these
glass-ui-maintainer asks. Reconciled against the **3.8.0** publish (the AV doc was
written against 3.7.0). Folded into the AX convergence wave set.

## Open asks (fold into AX waves)

| Ask | Priority | Disposition in AX |
|---|---|---|
| **ASK-GU-GOLD** — promote `btn-audacious-gold` (the gold "→ Next" CTA hover the user loves) from a speedtest-side `@utility` to a documented glass-ui ROOT facility (a Button/DockTabButton variant or canonical `@utility`) | P1 (design-praise) | **Fold into the liquid-glass material wave (D19)** — it is a glassy specular/shimmer effect: both a MODEL for the realistic liquid-glass identity AND a public facility to promote. Verbatim source in the AV doc (linear-gradient gold + paper-texture overlay + `--glass-specular` shadow + `btn-gold-bg-sweep` shimmer, PRM-gated). |
| **`vt.ready` `.ready` swallow** — `useViewTransition` returns `{finished, transitioned}` but NO `.ready` | P0 (W19 consumer gate) | Library API gap. Add `.ready` to `useViewTransition` (the `startViewTransition().ready` swallow consumers need). Fold into a motion-surface micro-wave or W34's consumer-adoption leg. |
| **`demandPark` on `useRAFLoop`** | P1 | Unshipped substrate. Route to the motion/raf substrate (W34 consumer-adoption / a new micro-wave). |
| **`CompletionSeal` family** | P1 | Unshipped (dist grep = 0). W15/W16 consumer need — route to the blob/seal substrate or W34. |
| **3 a11y asks** — Toaster/ToastClose accessible name · reka FocusScope sentinel `aria-hidden-focus` · `ResponsiveTabs` aria-label | P2 | Fold into **W39** (lighthouse a11y route matrix) + **W21** (primitive recategorize). Un-exclude the speedtest `tests-e2e/a11y-axe.spec.ts` carve-outs once fixed. |

## Closed / satisfied by 3.8.0

- **AX.W22 font-register watch (BRAND-CRITICAL)** — W22 excised Fraunces; 3.8.0 ships
  Plus Jakarta Sans (text/display) + Fira Code (mono) only. The AV watch is SATISFIED;
  speedtest can bump to 3.8.0 and re-verify no Fraunces/General-Sans regression.
- ASK-GU-CARDRADIUS, ASK-GU-TOOLTIPFONT — already resolved by 3.7.0 (AV-confirmed).

## R-CONSUME (publish-gated)

speedtest bumps `@mkbabb/glass-ui` 3.6.0 → 3.8.0 (guarded `npm run check`), consumes
the canonical exports, and reverts the matching AT/AV stopgaps. The `--ease-apple-spring`
re-point (W05/W34 census) rides this same bump. No raw library root is hand-rolled in
speedtest (inv-16).
