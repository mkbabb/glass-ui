# Constellation next-round execution plan — CI · deploy · measure + the library/remix closes

The conductor for the tranche set authored this round (the n+1 tranche per repo + the
WAVE-D remix cohort + the WAVE-C frontend-design refinements). It supersedes nothing in
`MODERN-WEB-EXECUTION-PLAN.md`/`MODERN-WEB-CLOSE.md` — that arc shipped the platform-native
substrate. **This round's job is different: not more substrate features, but making the
constellation reproducible (CI), live (deploy), and proven (measured), while closing the
library debts and standing up the CRUD/remix substrate.**

Grounded in the WAVE-A audit (`docs/constellation/next/audit/A1-A6.md`), the seven authored
tranches, and the 24 design slices.

## 1. The tranche roster (n+1, authored)

| Repo | Tranche | Binding question (one line) |
|---|---|---|
| **glass-ui** | **AR** | Make the binding silent-no-op impossible — VT/anchor-name uniqueness gate (dock fix → 3.1.1), the modern-web leverage AQ left (container/scroll-state queries, cross-doc VT, postTask), the native-drawer substrate, AS-GU ≥2-gated; close as 3.2.0. |
| **value.js** | **J** | The palette-server has fork/version/provenance but no atom-diff; spec the REMIX + atom-diff layer (the canonical pattern), ship-or-book VAL-1/VAL-9. |
| **fourier** | **J** | The viz-server has only a read-side fork count; EARN value.js's remix substrate as a shared PATTERN — atom-diff/remix/provenance, agent-legible, no DAG. |
| **keyframes** | **A** | First tranche — enter the bbnf format, repair the release CI (build:lib split), close the KF-B1 ergonomic seams, earn a modern-web baseline for the engine. |
| **words** | **A** | First tranche — Workbox PWA (retire the hand-rolled SW), content-visibility/`useYieldToMain` INP, the FastAPI security baseline. |
| **speedtest** | **AT** | Land the ratified AS design wave + the View-Transitions route re-founding + the dark-FOUC keystone against published glass-ui 3.1.0; close `ar-close` + `as-close`. |
| **muster** | **K** | A measurement-honesty CODA — clean-host Lighthouse, CLS 0.073→≤0.05, the 107-spec confirm, refute Speculation-Rules + cross-doc-VT in the record. |

## 2. The cross-cutting spine — CI → DEPLOY → MEASURE

The audit's headline: the publishes were done LOCALLY because the release CI is broken, and the
measured-AFTER numbers were honestly booked as CI-gated-not-claimed. The spine fixes that, in order:

- **M-CI (the `#177` correction).** It is two repo-local fixes, NOT one issue:
  - **glass-ui** — `release.yml`/`ci.yml` pin node 20 against `engines:>=22`; bump to 24. Resolve the
    dev-symlink↔CI-registry `npm ci` split so tags publish on a clean runner. **Lands in AR.W2.**
  - **keyframes** — split `build:lib` from the demo build so `npm ci` no longer chokes on the
    `file:../glass-ui` demo seam (keyframes already pins node 24). **Lands in keyframes A.W1.**
- **M-DEPLOY.** Converge on ONE inv-28 green-gated deploy-of-record (fourier's CF-Pages workflow is
  the reference): give **muster** a deploy target; retire **grammar.babb.dev**'s manual SSH-rsync;
  unblock the **keyframes/value** gh-pages demos (gated on M-CI). The fourier e2e is Docker-flaky —
  harden or stub the backend image so the gate is reliable.
- **M-MEASURE.** Bank the booked AFTER numbers on a representative host: muster CLS + clean-host
  Lighthouse (K.W2/W3), speedtest `ar-close`/`as-close` re-witness (AT.W-RATCHET), fourier e2e/axe
  CI evidence (J.W5).

## 3. The dependency DAG + the two gates

```
                    ┌────────────── GATE I — glass-ui 3.1.1 (AR.W2) ──────────────┐
   (un-gated,       dock useId() fix + proof:vt-names static gate + M-CI node bump
    FIRST)          → fourier CI greens + deploys  →  every consumer's next bump
                    └─────────────────────────────────────────────────────────────┘

   PARALLEL LAYER A (off GATE I / un-gated locals):
     keyframes A (CI split + EasingResolvable + proof:boundary + engine modern-web)
     value.js J  (the CANONICAL remix/atom-diff substrate — leads the WAVE-D cohort)
     words A     (Workbox PWA + content-visibility/INP + FastAPI security)
     muster K    (the coda: clean-host measure + CLS close + refute-record)

                    ┌────────────── GATE II — glass-ui 3.2.0 (AR.W3-W6) ──────────┐
                    container/scroll-state queries + cross-doc VT + postTask +
                    AS-GU bundle (≥2-gated) + the NATIVE DRAWER substrate
                    → speedtest AS-GU adoption · muster+speedtest native drawer
                    └─────────────────────────────────────────────────────────────┘

   PARALLEL LAYER B (off GATE II):
     fourier J   (MIRRORS value.js's remix pattern — the cohort's second consumer)
     speedtest AT (the AS design wave + VT re-founding + dark-FOUC + ar/as-close)
     consumer adoptions of 3.2.0 (drawer, AS-GU, container-query density)
```

**GATE I is the single highest-leverage first move** — it ships the dock VT-name fix as **3.1.1**
(the live bug fourier's e2e caught), un-breaks glass-ui's release CI, and greens fourier's
CI→deploy in one step. Everything else parallelizes off it.

**GATE II** (3.2.0) carries the modern-web leverage AQ left + the native-drawer substrate; its
consumers are muster + speedtest (the ≥2-consumer proof for the drawer + AS-GU).

## 4. The WAVE-D remix cohort (value.js J → fourier J)

The two repos share `lib/crud/atomdiff` as a **PATTERN, not a package** (inv: shared pattern over
shared dependency). **value.js J is canonical** (it already has fork+version+provenance; J adds the
atom-diff + `/diff?from=` + the CSS-Custom-Highlight diff render). **fourier J mirrors it** (the
viz-server earns fork+version+remix+atom-diff; 5 config atoms; additive migration). KISS throughout:
single-parent linear provenance, no merge/rebase/DAG/CRDT; the remix API is agent-legible (WebMCP-watched).
value.js J leads; fourier J follows the settled shape.

## 5. The WAVE-C UI refinements (fold into each tranche's impl)

24 design slices (`docs/tranches/<L>/design/WC-design-*.md` per repo; bbnf central). Recurring
themes the impl waves consume: **decouple `--font-display`** (every app collapses display+body onto
one sans — the single biggest distinctiveness lever); **one orchestrated page-load reveal** via
`useStaggerReveal`/`useSpringMount` (motion composables are at ~0 sites app-wide despite the platform
layer being adopted); **the real 5-rung glass ladder** over `cartoon-card`/`cartoon-surface` shims;
**dominant accent + per-mode hue tuning** over neutral-on-neutral; **the InstrumentChassis/Configurator
chassis** over hand-rolled control stacks. Net: most refinements REDUCE app code by reaching a
glass-ui primitive already shipped.

## 6. Net per-repo + the critical path

| Repo | Net next-round work | Gated on |
|---|---|---|
| glass-ui AR | 6 waves (the substrate hub); 3.1.1 + 3.2.0 | un-gated (W2 first) |
| value.js J | remix/atom-diff substrate + VAL ship-or-book | un-gated (canonical) |
| fourier J | mirror remix + yield + content-vis + CI evidence | GATE I (CI), value.js J (pattern) |
| keyframes A | CI split + boundary ergonomics + engine modern-web | un-gated |
| words A | PWA + INP + FastAPI security | un-gated (3.1.0 already adopted) |
| speedtest AT | AS design wave + VT + dark-FOUC + ar/as-close | GATE I (bump), GATE II (AS-GU) |
| muster K | coda: measure + CLS + refute | un-gated |

**Critical path:** `glass-ui AR.W2 (3.1.1 + M-CI) → M-DEPLOY → M-MEASURE`. Libraries (keyframes A,
value.js J) and the consumer codas (words A, muster K) parallelize off it. The remix cohort
(value.js J → fourier J) is a self-contained sub-sequence. **Immediate first action: glass-ui AR.W2**
— it is the live-bug fix, the CI repair, and the consumer unblock at once.

## 7. Carried / named-forward (still booked, not in a wave)

`@function` (G6, authoring-DRY-not-payload), `interestfor` action-previews (G8), the WebMCP frontier
(design-constraint-watched across the remix cohort), built-in-AI Summarizer (demo-or-drop), passkeys
(no credential surface), Speculation-Rules + cross-document VT (refuted-in-record where the consumer
is a single-document SPA), the speedtest standing user gates (SUM-1 deploy-freeze, cred-consolidate —
HELD, no recommendation). value.js VAL-1/VAL-9 ship only if their ≥2-consumer gate is met at J.W4,
else stay booked.

---
*This round is reproducibility, deployment, and proof — plus the library closes (dock VT-name,
native drawer, AS-GU, container queries) and the CRUD/remix substrate. The substrate is already
platform-native; the next execution makes it CI-green, babb.dev-live, and measured.*
