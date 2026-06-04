# AS — FINAL

**Tranche AS is CLOSED.** glass-ui made its *verification substrate* statically
sound (inv-θ), took the modern-web leverage AR specified but never ran
(re-derived against HEAD), passed a visual/design correctness review (13
reported defects), closed the gate-RED publish floor the W0b deep audit found,
and shipped it all as the **3.2.0** minor through the repaired release pipeline
with npm provenance — the end-to-end proof the #177 CI repair works.

## The headline — inv-θ

AR made a *component's* platform binding statically sound (`proof:vt-names`,
inv-η). AS is its dual one level up: the *gate fleet* is now a pure,
sibling-portable function of source + tooling.

- One `scripts/constellation.mjs` — a single PUBLISHERS/CONSUMERS membership
  list + a `resolveSibling` policy encoding the registry-default world —
  collapses the five hardcoded constellation copies (and the
  `bbnf-buddy`↔`bbnf-lang/playground` drift) and the three ad-hoc
  absent-sibling encodings into one.
- One `scripts/gates.mjs` manifest tagged `{local, ci, release, sibling}` from
  which `proof:all`, the `ci.yml` matrix, and `release.{sh,yml}` are *filters*
  — local == ci == release, structurally. `gates:verify-ci` fails closed on
  ci.yml drift (now 14 ci gates).
- Gate output routes to a gitignored `.cache/gates/` with `generatedAt`
  dropped — a gate run leaves `git status` clean (no tracked-state side effect).
- A lockfile re-drift guard (`proof:lockfile`) so a stray sibling re-link
  cannot re-poison `package-lock.json`.
- `proof:vt-names` hardened to its claim (the four evasion vectors + a per-mint
  dataflow trace) and — AS.W2b R5 — now carries a committed 10-fixture vitest
  spec, so the gate that makes inv-η structural is itself guarded.

## Success criteria — met

- **Gate-integrity class closed (W2).** Zero re-listed constellation copies;
  `git status` clean after a gate run; `release.{sh,yml}` run the binding-
  correctness floor; `proof:vt-names` covers the four vectors + dataflow. `d2d1d0b`.
- **`proof:vt-names` hardened + tested (W2 + W2b R5).** `8c0cced`, `fef1b8e`.
- **The leverage, re-derived against HEAD (W3/W4/W5).** G4 `scheduler.postTask`
  on `/motion-core` (`usePrioritizedTask`/`postTaskSafe`, reduced-motion carve,
  `MessageChannel` + `AbortSignal` fallback); G1 density `@container
  style(--density)` over the kept `[data-density]` base; G2 `@container
  scroll-state(scrollable)` retiring the overflow-fade listener; the AS-GU
  bundle at the ≥2 bar with no double-mint. `8c0cced`.
- **Visual/design correctness (W7).** 13 reported defects fixed across a
  three-wave audit → frontend-design → harden cycle; the harden wave caught a
  silent-no-op dock binding. `96858c8`, `00bd5f9`. `deriveAurora` ships (the
  user's D10b ask is the ≥2 witness).
- **The publish floor (W2b + follow-up).** R1 externalize value.js (aurora
  47.7 → 16.8 KiB); R2 strip the 68 `development` keys (proof:resolution
  glass-ui-clean); R3 the P9 `--spacing` base + `proof:components-css` gate;
  R4 useTextHighlight multiplex; R6 signal merge + the G1 style-probe; **R7
  keyframes peer `^2.2.0 || ^3.0.0`** (keyframes 3.0.0 is the published latest;
  validated). `8114bba`, `fef1b8e`, `5e2f055`.
- **Gates green + the fold (W6).** Overfitting audit clean (18/18, zero
  orphans); the gates.mjs-derived matrix green on glass-ui's own surface; the
  **3.2.0** minor published through the repaired `release.yml` on a clean-runner
  tag with provenance. `audit/W6-close.md`.

## Wave ledger

| Wave | Phase | Status | Commit |
|---|---|---|---|
| AS.W0 | DEV — 6-lens audit | DONE | (audit files) |
| AS.W1 | DEV — design slices (boundary) | DONE | AS.md |
| AS.W2 | IMPL — gate-integrity (inv-θ) | DONE | `d2d1d0b` |
| AS.W3 | IMPL — G4 postTask | DONE | `8c0cced` |
| AS.W4 | IMPL — G1/G2 container queries | DONE | `8c0cced` |
| AS.W5 | IMPL — AS-GU re-derived | DONE | `8c0cced` |
| AS.W7 | IMPL — visual/design correctness | DONE | `96858c8`, `00bd5f9` |
| AS.W2b | IMPL — gate-fix floor + follow-up | DONE | `8114bba`, `fef1b8e`, `5e2f055` |
| AS.W6 | IMPL — close + 3.2.0 publish | DONE | this FINAL + the v3.2.0 tag |

## Cross-repo posture (inv-16 / inv-27)

AS is glass-ui-internal. Every cross-repo item is NAME-FORWARD — AS records,
does not absorb. The residual local gate REDs are all sibling/handoff
conditions, CI-green when the siblings are absent:

- **value.js K.W2.5** — reverts its own `development` export key in lockstep
  with glass-ui R2 (the coordinated contract-v2 strip). Until it lands,
  `proof:resolution` is sibling-RED on value.js locally.
- **bbnf-lang/playground** — the dist-alias fossil (a `proof:resolution`
  consumer flag).
- **fourier-analysis Q.W4 Lane F** — an un-applied phantom-class patch (a
  `proof:phantom-classes` pending handoff).
- **keyframes 3.0.0** — published latest; glass-ui's peer now accepts it (R7),
  unblocking the cohort (value.js K.W4 wants keyframes 3.0.0 + glass-ui 3.2.0).

The 3.2.0 tag's `release.yml` run on the clean runner (siblings absent) is the
binding green per inv-27 — and the keystone the constellation waits on.

## Named-forward / terminal (carried, not opened here)

G3 cross-document VT (demo-or-named-forward); G5/G6/G8/`text-box-trim`
(Baseline/consumer-gated); the demo-gated pilots (graduate at Baseline Widely);
the watched conditions (inline-edit, dock panel-host, shadcn-parity —
convergence-gated, lean REJECT on shadcn-parity); value.js VAL-9 (terminal
kill). No AS successor is opened.

**AS is closed at v3.2.0.**
