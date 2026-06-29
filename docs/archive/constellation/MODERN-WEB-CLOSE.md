# Constellation modern-web close — execution complete (2026-06-02)

The companion close to `MODERN-WEB-EXECUTION-PLAN.md`. The plan reconciled the `@mkbabb`
constellation's modern-web work into one de-duplicated, dependency-ordered schedule; this
records that it executed in totality — every gate published, every consumer adopted, every
repo pushed.

## 1. The three serial gates — all published

The DAG `value.js → keyframes.js → glass-ui → { consumers }` resolved to three publish-gates;
all three are live on the npm registry:

| Gate | Artifact | What it carried |
|---|---|---|
| **GATE 0** | `@mkbabb/keyframes.js@2.2.0` | KF-B1 — the value.js static→dynamic boundary (`loadAnimationEngine()`); light engines value.js-free in the static graph, string-name easing resolved lazily (non-breaking for consumers); `sideEffects:false` |
| **GATE 1** | `@mkbabb/glass-ui@3.0.0` | the AP-closed staged cut (R0G-1..7, the AN axe redress, `useSpringOrchestrator` retirement) |
| **GATE 2** | `@mkbabb/glass-ui@3.1.0` | the AQ platform-native substrate (W2–W7) |

`@mkbabb/value.js` carried no modern-web/library item (contract-v2 already done) — it did not
gate the arc, as predicted.

> **Publish path note.** The tag-triggered release CI in keyframes + glass-ui is
> pre-existingly broken (the repos use a locally-symlinked `@mkbabb` monorepo dev setup that
> CI's registry-based `npm ci` doesn't replicate; glass-ui's release workflow also pins node
> 20 against `engines: >=22`). All three publishes were done **locally** (authenticated, the
> symlinked env builds green); the pushed `v2.2.0`/`v3.0.0`/`v3.1.0` tags are valid. CI repair
> is tracked as a follow-up (does not block the constellation).

## 2. The de-dup, validated

The plan's headline claim — *most of the consumers' "modern-web" tranches are glass-ui-substrate
work in disguise* — held in execution:

- **glass-ui AQ** became the canonical home for the substrate. The two absorbed gaps
  (`.deferred-section` content-visibility utility, `useYieldToMain`) + the coarse-pointer floor
  amendment + the `color-mix`/`--border-soft` color migration all shipped once in AQ.
- **fourier I** recorded ~65% convergence into AQ (α/β/ζ/η did not execute as fourier-local
  edits — fourier adopts them via the version bump). Net fourier-local: the P0 a11y fix + γ + θ
  + the δ/ε arms.
- **speedtest** adopted rather than re-built — its R-CONSUME is a net **deletion** of in-repo
  substrate (5 idle gates, a `.z-toast !important` override, a `-webkit-text-security` shim, the
  value.js co-location workaround, a redundant coarse-floor one-liner).
- **muster J** collapsed its 5 substrate-adoptions into AQ/keyframes consumption.

## 3. The cross-repo couplings — every AQ contract reached ≥2 consumers

The substrate-without-consumer invariant is satisfied by real adoption (not demo-only) for
every AQ public primitive:

| AQ contract (glass-ui exposes) | Confirmed consumers |
|---|---|
| `useViewTransition` / `startViewTransition` | muster (verdict reveal) · fourier (route-morph) · speedtest |
| `useUserInvalidAria` (:user-invalid → aria-invalid) | muster (forms) · speedtest (admin) |
| `.deferred-section` content-visibility | muster · fourier · speedtest |
| `useYieldToMain` (INP lever) | muster (re-rank) · speedtest (maplibre hex build) |
| `/number-field` + `/switch` subpaths | muster (sweep) |
| `--border-soft` + `color-scheme`/`light-dark()` | muster (the live-bug fix) |

The demo-gated primitives (`GlassDialogNative`, the `interestfor` HoverPopover `:native` opt-in,
`GlassNativeSelect`) satisfy the bar via their demo and did **not** leak to the public barrel —
overfitting audits across all four tranches came back clean (one cosmetic over-export flag in
fourier, non-gating).

## 4. The headline wins

- **muster**: eager-JS 200.1 → 155.0 KB gz (−45 KB); the 64-site `hsl(var(--token))` live bug
  fixed (hairlines that never painted now paint); axe 24/0; the SSR LCP hero in raw HTML.
- **speedtest**: eager keyframes chunk 130 KB → 33 KB (value.js + the animation engine moved to
  a lazy `loadAnimationEngine()` chunk).
- **words**: the ~39 KB-gz keyframes engine + value.js graph moved off the eager/preloaded graph;
  84 → 21 root-barrel import sites.
- **bbnf**: value.js off the eager entry on the Playground/Docs routes; all 11 sites swept.
- **fourier**: the keyframes 2.2.0 `Animation` static-import break surfaced + fixed via the lazy
  boundary — a **binding-verification class** break (vue-tsc passes, runtime breaks); flagged for
  every keyframes consumer.

## 5. Pushed + synced

Every repo is pushed: keyframes.js, glass-ui (with `v3.0.0`/`v3.1.0` tags), words, bbnf-lang,
fourier-analysis, speedtest, and **muster** — whose remote was created fresh
(`github.com/mkbabb/muster`, private) and pushed (144 commits). All pushes were non-destructive
fast-forwards. The only held item remains the `precepts` submodule (user-domain).

## 6. Deferred / named-forward (out of this constellation's modern-web scope)

- **The AS design wave** (speedtest AS-1..17) — Gate-2, a separate authorized design lane.
- **The AS-GU glass-ui-request bundle** (deriveAurora/OKLab-LUT aurora, whisper-heading rung,
  `--spring-crisp`, GlassDock dark-rung, AnimatedDigit/MetricBadge polish, CompletionSeal, the
  View-Transitions route re-founding) — needs a **future glass-ui design wave**; correctly NOT
  hand-rolled in speedtest.
- **The standalone `DockIconButton` coarse floor** — a real glass-ui gap (the W3 floor is
  `.glass-dock`/`[data-size=icon]`-scoped; a free-standing `DockIconButton` falls between both).
  A glass-ui follow-up, ≥2-consumer-gated.
- **CI repair** — the tag-triggered release workflows (node bump + the registry/symlink divergence).
- **Measured CI confirmations** — muster's full 107-spec Playwright + a clean-machine Lighthouse
  re-measure; fourier's e2e/axe (needs the Python backend). The structural gates landed; the
  measured AFTER numbers are CI-gated (booked honestly, not claimed green).

---
*The constellation modern-web arc is closed: one foundational boundary publish + one substrate
tranche + N consumer adoptions, exactly as the plan's de-dup predicted. Each consumer reduced to
its irreducible local surface + a two-gate R-CONSUME on the upstream publishes.*
