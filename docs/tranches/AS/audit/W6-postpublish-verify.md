# AS.W6 — post-publish verification of glass-ui@3.2.0 (13-agent workflow)

After the 3.2.0 publish, a 13-agent workflow ran: 5 adversarial skeptics against
the REGISTRY-published artifact + 7 read-only constellation-readiness sweeps + a
synthesis. This records the result and classifies the surfaced follow-ups
honestly (correcting the synthesis where it over-called a contested/deferred item
as a clean defect).

## The publish is SOUND

All five adversarial probes returned `refuted: false` against the published
tarball (`mkbabb-glass-ui-3.2.0.tgz`, 667 files, version-confirmed 3.2.0). Zero
release-blockers; no 3.2.1 hotfix warranted.

| Probe | Claim challenged | Verdict | Evidence |
|---|---|---|---|
| P1 | bare consumer paints (`/styles` ships components.css + `:root` `--spacing`/`--text-*`) | not refuted | `.rounded-panel{border-radius:var(--radius-panel)}` + `--spacing:0.25rem` present; index.css @imports it |
| P2 | keyframes peer `^2.2.0 \|\| ^3.0.0` resolves vs both majors | not refuted | `--strict-peer-deps --dry-run` EXIT 0 for keyframes 3.0.0 AND 2.2.0 |
| P3 | aurora externalizes value.js | not refuted | `import {…} from "@mkbabb/value.js"`; oklab hits 2 (not 40); gzip 16.8 KiB |
| P4 | provenance + contract-v2 exports + subpaths resolve | not refuted | SLSA attestation present; 0 `development` keys; 6/6 subpaths import() OK |
| P5 | proof gates trace (not rubber-stamp) | not refuted (low) | vt-names traces the counter-collision unconditionally; components-css fails on an injected undefined var; release filter ⊇ binding gates |

P5's "low" is not a publish defect (scripts aren't even shipped in the tarball) —
two cosmetic caveats: a `useId()`-mixed-with-volatile value passes vt-names (but
it *contains* useId() so it's collision-free; the actual counter bug is caught),
and 4 release gates are `sibling:true` skip-by-policy (but vt-names/components-css/
typecheck/build/theme/lockfile run unconditionally + prepublishOnly runs the
laundering spec).

## What 3.2.0 unblocks (the constellation map)

| Repo | Now-actionable on the `^3.2.0` bump | The new critical-path edge |
|---|---|---|
| **fourier** | dock-VT `useId()` fix → clears the glass-dock-1 e2e red → **unblocks J.W6 inv-27 close**; `asideSide` (DEC-2 controls-left); `useTextHighlight`; `inert`/`role=region` a11y un-fixme | THE keystone thread |
| **value.js** | `deriveAurora` producer present (VAL-1 ≥2 gate); K.W4/K.W5 dispatch cleared (both deps published); router 4→5; dock 16-spec e2e re-verify | needs K.W2.5 (own `development` strip) + the blob lift |
| **speedtest** | AU-R2/T4 vt.ready re-founding (delete 394-LOC choreography; revert the `.ready.catch` stopgap); `deriveAurora` (named 2nd consumer); `/motion-core` tasks | gated on its own 2-gate process hold + AU-W0 |
| **muster** | R-FENCE CLS keystone (`asideWidth` + `--configurator-aside-min/max` shipped) | needs the native-drawer (own ask) |
| **words** | `useTextHighlight` (A.W5-P2b); φ-ladder headword; warm-ink; `light-dark()`; `:user-invalid` | gated on Fraunces (ASK-1, BOOKED) |
| **slides** | R46 (`as`/`asChild` → retire RouterLink workaround); C.W1 dock primitives | gated on the `/deck` subpath (future tranche, by design) |
| **bbnf-lang** | opportunistic bump (P9 free); nothing waits | — |

## Follow-up punch-list — classified honestly

The synthesis labelled four items "DO-NOW." On scrutiny against glass-ui's OWN AS
decisions + the ≥2-distinct-consumer invariant, two are **decision-needed**, not
clean defects:

### Decision-needed (do NOT unilaterally ship — contested or self-deferred)

- **P5-inner-rounding** — fourier's ADOPTION-ASK wants the INNER `ConfiguratorLayer`
  section dividers rounded at the root. **But AS.W7's visual-evidence close
  deliberately made them STRAIGHT** (the container clip owns rounding; the
  per-section radius was REMOVED because it deformed the hairline divider —
  `audit/visual/W-cmp-configurator.md`, "rounded outer + clean straight inner
  dividers"). This is a design disagreement on what "fully rounded at the root"
  means (outer-only, satisfied — vs each inner section, unsatisfied). **Needs the
  user's CANON ruling** before any change; re-rounding inner sections would
  contradict the AS.W7 confirmed decision and risk re-introducing the deformed
  hairline.
- **goo-blob + watercolor-dot + the D1 OKLCh GLSL shader** — value.js's cohort
  spec assigned these to glass-ui AS.W5→3.2.0. **But glass-ui's own AS.W0b
  deferred ledger named them P3, NAMED-FORWARD, post-v1.0.0** ("the watercolor
  medium is the live blob surface; the net-new primitive stays named-forward").
  The "9 consumers" the sweep cites are all call-sites inside value.js's ONE demo
  — the ≥2-DISTINCT-consumer bar (the binary substrate invariant) is not clearly
  met. This is a cross-repo expectation gap, not a slipped glass-ui commitment.
  Lifting them is a real wave (a WebGL Metaballs renderer + GLSL + an injected
  color-resolver seam, inv-K-3) that warrants a proper tranche plan + a confirmed
  2nd distinct consumer — NOT a reactive patch.

### BOOK (correctly named-forward — ≥2-consumer or future-tranche gated)

- `@mkbabb/glass-ui/deck` subpath (slides R33) + `--deck-pager-active` token —
  by design a separate future glass-ui tranche, after slides' C.W1 + a 2nd
  consumer (the glass-ui demo `<Deck>` story).
- Self-hosted Fraunces `@font-face` (`/styles/fonts`) — 3 converging consumers
  (value.js + words + slides); words' A.W5-P1c is the live blocked site.
- Drawer `:native` / `GlassNativeDrawer` / `/native-drawer` (+ a
  `GlassDrawerSnapController` sub-ask) — ≥2 consumers (muster + speedtest sheets);
  replaces the vaul-vue activeSnapPoint re-snap bug (AN.W3).
- `useGlobalDark({ initialValue })` + a FOUC parse-time `darkModeSyncScript()`
  primitive (speedtest dark-PRIMARY + T7).
- `GlassDock` `overflow` (3.2.0) vs the existing `wrap` prop — clarify
  supersede-vs-additive so the bbnf-lang playground (`:wrap`) migrates cleanly.
- Net-new W-ASKS (value.js): Button `size="icon-sm"`, `DockSelectTrigger`
  `clampLabel`, `TooltipContent variant="mono"`, `Select size`.
- The residual DDR-AS-RC-2 bundle (speedtest, AU-W0-confirmed): `--spring-crisp`,
  GlassDock dark rung, AnimatedDigit, MetricBadge icon, CompletionSeal,
  ContinuousTimeline marker-opt-out, LabeledField for/id, 3 a11y asks,
  DockIconButton 44px coarse floor, `useRAFLoop` demandPark, `/styles`
  critical/deferred split.
- `deriveAurora` name (cohort asked `deriveAuroraPalette`; shipped `deriveAurora`
  returning `OklchStop[]`) — informational; consumers import the as-shipped name.

## Disposition

AS is closed at v3.2.0; the publish is verified sound. The follow-up punch-list is
the candidate scope for the NEXT glass-ui tranche — authored as a proper tranche
(no shadow execution), with the two decision-needed items resolved first: the
user's P5 rounding ruling, and a confirmed 2nd distinct consumer (or the cohort's
agreement) for the blob-primitive lift. The BOOK backlog stays gated on consumer
convergence per the binary-substrate invariant. No successor tranche is opened
here unilaterally.
