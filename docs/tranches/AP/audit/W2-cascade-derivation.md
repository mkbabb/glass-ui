# AP.W2 — cascade-derivation audit: the reclaim premise, refuted by measurement

W2's binding question was whether `@theme` single-sourcing (T1) + tier/four-state recipes (T2)
reclaim ~7-12 KiB gzip against the 74995 resolved draw. **Direct measurement refutes the
premise.** Every form of the derive-don't-duplicate cascade refactor is byte-NEGATIVE. The
cascade ships exactly as-is at HEAD; W2's deliverable is this finding. inv ζ is retired (it was
predicated on the refuted premise). AP's headline pivots to W3 (the zero-deferral consumer
repair) + the aurora T3 control-flow derivation, both of which stand independently.

## The measurement (build is deterministic — two HEAD builds yield identical bytes)

`profile:bundle` → resolved `dist/styles/index.css` (the real consumer artifact, AO inv α):

| Variant | raw | gzip | Δgzip vs HEAD |
|---|---|---|---|
| **HEAD (baseline)** | 308758 | **74995** | — |
| Full var-indirection refactor (T1 tokens/theme + T2 glass/dock) | 313892 | 76660 | **+1665** |
| T1 surgical only (§4 radius dedup + §0 font-stack inline) | 309699 | 75351 | **+356** |
| §4 radius dedup + grain `::after` 5-selector→`:where()` collapse | 308688 | 75095 | **+100** |

Determinism control: `npm run build` twice at HEAD → 74995 / 74995 (bit-identical). The deltas
are real signal, not build noise. `proof:theme` passed on every variant (the token surface was
never broken); the refactors were CORRECT — they were simply byte-negative.

## Why every form is byte-negative — the three sub-findings

1. **The `@theme` bridge is idiomatic namespace-registration, NOT a hand-mirror.** A `var()`-reader
   census at HEAD overturns the DELTA "198-line pure duplication" framing: most bridges register a
   Tailwind v4 utility namespace (`--color-*`/`--radius-*`/`--transition-duration-*`/…) for a raw
   runtime-token that is INDEPENDENTLY CONSUMED — `--duration-fast` is read in 17 files,
   `--foreground` 15, `--muted-foreground` 13, `--spring-snappy` 11, `--primary` 4, `--z-dock` 2.
   The raw name is also the documented consumer-override surface. Collapsing it needs EITHER a
   sweeping `var(--x)`→`var(--color-x)` rename across ~40 internal CSS/SFC files (the naive total
   merge AP forbade) OR a consumer-facing override-surface rename (a cross-repo break, out of AP's
   glass-ui-internal scope, disrupting the mid-flight AQ consumers). It is not duplication to
   derive away — it is the two-layer Tailwind v4 convention.

2. **The tier/four-state copy-paste is gzip-compressed; var-indirection ADDS entropy.** The five
   `.glass-{tier}` blocks and the dock four-state arms are textually repetitive — and gzip's LZ77
   window compresses textual repetition to near-zero. Replacing the repetition with a
   `--glass-tier-*` / `--dock-control-*` var-cohort introduces NEW distinct token names (entropy
   gzip cannot fold), so the "single source" form measures **+1665 gzip** larger than the
   copy-paste it replaces. Maintainability up, bytes up — the wrong trade for a budget-gated
   shipped library where the directive is performance above all.

3. **Even genuine same-name duplication and selector-list collapse are byte-neutral-to-negative.**
   The §4 radius block is fully declared in BOTH `tokens.css` and `theme.css`'s `@theme` — but the
   `tokens.css` copy is INERT: `@theme` always wins the cascade (later) AND emits `--radius-*` to
   `:root`, so the `tokens.css` copy is shadowed dead-weight that gzip compresses to ~nothing AND
   that cannot even CAUSE drift (the live value is always `@theme`'s). Removing it drops raw 70
   bytes but nets **+100 gzip** (the removal perturbs LZ77 block boundaries upward). The grain
   `::after` 5-selector→`:where(5-tier)` collapse is part of that same +100. There is no
   gzip reclaim to be had here — the cascade is compression-saturated.

## inv ζ — retired (premise refuted)

AP introduced inv ζ ("the cascade derives from a single source") on the DELTA reclaim premise.
That premise is refuted: the cascade's existing structure is idiomatic (the `@theme` two-layer
registration) and gzip-optimal (the tier/four-state repetition compresses; the §radius dup is
inert), so there is no duplication-to-derive that improves the shipped artifact. **inv ζ is
RETIRED — AP does not introduce it.** An invariant that cannot be honored without regressing the
metric it claims to serve is not an invariant. The genuine maintainability value of
single-sourcing is real but does not warrant a measured byte regression under the budget gate.

(The control-flow derivation — the aurora suspend-source SET, T3 — is a CORRECTNESS fix, not a
byte play, and stands on its own in W3. "Derive don't duplicate applied to control flow" holds
there; it is the CSS-cascade reclaim thesis that is refuted, not the control-flow one.)

## Disposition + the AP reshaping

- **W2 ships NO cascade source change.** `tokens.css` / `theme.css` / `glass.css` / `dock.css`
  are byte-identical to HEAD. `proof:theme` green; `profile:budget` green at the unchanged 74995 /
  82500 (no re-base — the draw is unchanged). The π re-probe is trivially canon-equal (no change).
- **The W2 hard gate is RE-READ against the refutation.** Gate #3 ("reclaim ~7-12 KiB") and #1/#4
  ("the merge lands") are VACATED — there is no merge to land. Gates #2 (proof:theme byte-clean),
  #5 (visual π canon-equal), #6 (inv-α preserved) hold trivially because the cascade is unchanged.
- **AP's headline pivots to W3 + W4.** The two AP load-bearing facts: fact 1 (the under-folded
  R0G-6/R0G-7 consumer items → W3) is SOLID and is now the headline; fact 2 (the cascade reclaim →
  W2) is REFUTED. W3 (the zero-deferral consumer repair + aurora T3) and W4 (the false-witness coda
  + hygiene) carry AP's genuine value. The plan (AP.md) + PROGRESS record the pivot.

## Method note (why this is the right outcome under the directive)

The directive is "NO quick solutions, NO workarounds: idiomatic, gestalt approaches … performance
above all … verify, analyze in full." Blindly executing the DELTA reclaim plan would have shipped
a +1665 gzip regression for a maintainability story the budget gate punishes — a workaround
masquerading as a transposition. The gestalt-correct move was to MEASURE the transposition, find
it byte-negative, and decline to ship it — which is what W2 did. Declining a refuted optimization
is the optimization.
