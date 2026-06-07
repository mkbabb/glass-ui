# animated-digit — KEEP-SHARED verdict

`AnimatedDigit` single-glyph numeric reel. Source: `src/components/custom/animated-digit/AnimatedDigit.vue` (96 lines) + `index.ts` barrel; subpath `@mkbabb/glass-ui/animated-digit` (`src/subpaths/animated-digit.ts`); types on `/api`.

This is NOT a repatriation candidate. The earlier audit's claim that speedtest does not consume it is confirmed — and the census finds the component has ZERO speedtest coupling at any layer (no import, no render, no domain reference in its own source). Its one genuine consumer is fourier-analysis, a non-speedtest generic app.

## Consumer census

All grepped TODAY (2026-06-07) over each repo's source tree, node_modules excluded.

| repo | file:line | symbol | render-count | class |
|------|-----------|--------|-------------|-------|
| speedtest | — (no hit in `src/`; only `DESIGN.md` doc text) | AnimatedDigit | 0 | none |
| fourier-analysis | `web/src/components/shared/CoefficientsSpectrum.vue:19` (import) + `:99-103` (render) | AnimatedDigit | 1 | **b — genuine non-speedtest app** |
| value.js | — (no hit in `demo/`) | AnimatedDigit | 0 | none |
| keyframes.js | — (no hit in `demo/`) | AnimatedDigit | 0 | none |
| muster | `frontend/src/components/verdict/WinnerHero.vue:16,88` | AnimatedDigit | 0 | d-adjacent — JSDoc comments only, both saying "NOT `<AnimatedDigit>`" (they chose `useSpring`/`SmoothProgress` for overshoot); plus ~25 `docs/` design-note mentions. No import, no render. |
| words | — (no hit in `frontend/src/`) | AnimatedDigit | 0 | none |
| glass-ui INTERNAL | `src/composables/motion/useCountup.ts:6` (comment); `src/api/index.ts:211-217` (types-only barrel re-export) | AnimatedDigit | 0 | c-NONE — no glass-ui component composes it; only a doc-comment + the `/api` types re-export |
| glass-ui demo | — (no story file; `find demo -iname "*digit*"` empty; grep empty) | AnimatedDigit | 0 | d — none |

Render evidence (fourier, the sole genuine consumer):
- `CoefficientsSpectrum.vue:19` — `import { AnimatedDigit } from "@mkbabb/glass-ui/animated-digit";` (canonical subpath, not a barrel/stale-comment).
- `CoefficientsSpectrum.vue:99-103` — `<AnimatedDigit :value="comp.amplitude" :format="fmtAmplitude" class="w-16 text-right fira-code text-muted-foreground tabular-nums" />`. Renders a Fourier-coefficient amplitude reel — a generic numeric-display use, zero speed-test semantics.

fourier pins `"@mkbabb/glass-ui": "^3.1.0"` (`fourier-analysis/web/package.json:14`) — current; the subpath resolves.

## Verdict + rationale

KEEP-SHARED. The repatriation test is SPECIFICITY: is this bespoke to the speed-test instrument domain? AnimatedDigit fails that test on both axes:

1. **No speedtest consumer.** speedtest does not import or render it anywhere in `src/` (only an inert `DESIGN.md` doc reference). There is nothing to repatriate TO — a repatriation requires speedtest to be the de-facto owner, and it is not even a user.
2. **Not domain-specific.** The source (`AnimatedDigit.vue`) is a thin generic wrapper over `useAnimatedNumber` + the `tnum/ss01/lnum` font-feature register. It carries no speed-test vocabulary — no ping/download/jitter/Mbps notion. The AC.W6d header credits a speedtest-origin pattern, but the shipped primitive is fully generic. A Fourier amplitude reel (fourier) is the natural generic use, and that is exactly what the one real consumer does.

So this is the OTHER kind of orphan flagged in the brief: not a repatriation, but a thin-consumer-count question. It currently has exactly ONE genuine generic consumer (fourier) + the family's own source. Under glass-ui's >=2-consumer overfitting invariant that is a borderline KEEP — but it is decisively NOT a repatriation, and not a prune either (it has a live external app consumer that would break on removal). It stays shared.

## Move plan

None. KEEP-SHARED — nothing leaves glass-ui. The dir, the `index.ts` barrel, the `src/subpaths/animated-digit.ts` mirror, the `/api` type re-export (`api/index.ts:216-217`), and the `package.json` `./animated-digit` export (lines 321-323) + `typesVersions` entry (139-140) all stay intact. fourier needs no import rewrite.

## Blocking coordination

The lone genuine consumer is fourier-analysis (`CoefficientsSpectrum.vue`) — a NON-speedtest app. It is not a *blocker* (nothing is being moved), but it is the reason the component cannot be pruned: any future removal of `animated-digit` from glass-ui would break fourier's coefficient-spectrum readout, which resolves the published `@mkbabb/glass-ui/animated-digit` subpath. If the AW tranche later revisits this under the overfitting (single-consumer) lens rather than the repatriation lens, fourier is the coordination cost: either keep the subpath, or move the 5-line render native into fourier and retire the subpath in lockstep. That is out of scope for THIS repatriation pass.

## Summary

- Family: animated-digit (`AnimatedDigit`) — a generic damped numeric reel over `useAnimatedNumber` + tabular-numeral font features.
- Verdict: KEEP-SHARED. Not a repatriation candidate.
- speedtest does NOT consume it (no import/render in `src/`; only a `DESIGN.md` doc mention). Zero speedtest coupling at every layer.
- The component source carries NO speed-test domain vocabulary — it is a fully generic primitive (fails the specificity test).
- Sole genuine consumer: fourier-analysis `CoefficientsSpectrum.vue:19` (import) + `:99` (render) — a non-speedtest app rendering a Fourier amplitude reel (consumer class b).
- muster references are JSDoc/doc-note text ONLY (`WinnerHero.vue:16,88` both say "NOT `<AnimatedDigit>`"); no import, no render.
- No glass-ui-internal composition (only a comment in `useCountup.ts` + the `/api` types re-export); no demo story exists.
- Nothing moves; no package.json/subpath/api change; no speedtest import rewrites.
- Coordination note: fourier is the one external consumer; it blocks a future PRUNE (not this repatriation), so a later single-consumer overfitting pass must coordinate with fourier if it removes the subpath.
- This is a thin-consumer-count orphan (1 genuine consumer), NOT a speedtest repatriation — flagged for the overfitting lane, decided KEEP here.

Digest: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/repatriation/animated-digit.md
