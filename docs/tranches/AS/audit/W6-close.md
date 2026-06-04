# AS.W6 — close (overfitting audit + gate matrix + the 3.2.0 publish)

The close ceremony for tranche AS. The development half (W0 audit + W1 design)
and the implementation half (W2 gate-integrity, W3 postTask, W4 container
queries, W5 AS-GU, W7 visual/design, W2b gate-fix + follow-up) are all DONE.
This wave runs the overfitting audit, confirms the gate matrix is green on
glass-ui's own surface, and cuts the 3.2.0 minor through the repaired
`release.yml`.

## Overfitting audit — clean

Ran `docs/audits/overfitting-audit.md` against every artefact AS introduced or
materially reworked (read-only sub-agent). **All 18 artefacts PASS the
≥2-sites-OR-exported-OR-demo-private bar** — 17 `keep`, 1 `keep-current`
(`UsePrioritizedTaskReturn`, a public return-shape type), **zero**
`library-orphan` / `delete-unused` / `inline-and-remove`. inv-5 (no silent
overfitting) holds.

| Artefact | Verdict | Witness |
|---|---|---|
| `useTextHighlight` | keep | `/dom` export + FuzzySearch consumer + spec |
| `postTaskSafe`, `usePrioritizedTask`, `TaskPriority`, `PostTaskOptions` | keep | `/motion-core` exports + internal + spec |
| `UsePrioritizedTaskReturn` | keep-current | public return-shape type, 1 site + docstring |
| `supportsPostTask` | keep | root-barrel public API (`src/index.ts` → `./utils` → `platformSupport`); pure feature-detect predicate, 0 in-repo call sites by design (AT: wire into `usePrioritizedTask` for DRY, or drop) |
| `deriveAurora`, `AuroraHarmony` | keep | `/aurora` export + the W7 D10b Derive-from-color demo UI + spec |
| `oklchToLinear`/`oklchStopToHex`/`hexToOklchStop`/`cssToOklch` | keep | `/aurora` exports + internal palette use + spec/demo |
| `@container style(--density)` / `@container scroll-state(scrollable)` | keep | ConfiguratorRow + GlassCarousel/useGlassCarousel |
| `GlassDock overflow` prop + `.dock-scroll-x/.dock-scroll-y` | keep | 3 demo sites (`overflow="scroll"`) + the scroll-overflow spec |

`deriveAurora` graduates from BOOKED to SHIPPED: the user's W7 D10b ask (the
Derive-from-color UI) is the ≥2-consumer witness, superseding the P2 book.

## Gate matrix — green on glass-ui's own surface

`npm run build` green; **611 tests** (57 files) green; full footprint exactly the
intended files (no submodule, no stray). Every glass-ui-OWN gate green:

| Gate | Result |
|---|---|
| typecheck | PASS |
| test (611) | PASS |
| build | PASS |
| verify-export-types | PASS |
| profile:budget | PASS — `aurora.js` 47.7 → 16.8 KiB gzip (R1) |
| proof:package | PASS (R7 — the keyframes 3.0.0 file: link satisfies the widened peer) |
| proof:theme | PASS |
| proof:components-css | PASS (R3 — new gate; witness rule, every var(--X) resolves, 0 @layer base) |
| proof:consumers:static | PASS |
| proof:vt-names | PASS (R5 — hardened; the detector now has a committed 10-fixture spec) |
| proof:lockfile | PASS |
| gates:verify-ci | PASS (ci.yml matches the manifest — 14 ci gates) |

**Residual local REDs are all sibling/handoff conditions, name-forward under
inv-16 and CI-green when the siblings are absent (inv-27):**

- `proof:resolution` — value.js still carries the `development` export key
  (its own K.W2.5 reverts it in lockstep with glass-ui R2) + bbnf-lang's
  dist-alias fossil. glass-ui's own package.json is contract-v2-clean.
- `proof:phantom-classes` — fourier-analysis's un-applied Q.W4 Lane F patch
  (documented-pending handoff). glass-ui src/+demo/ and all non-pending
  consumers are clean.
- `proof:consumers:build` / `proof:runtime` — local-only sibling-walk gates
  (not in the ci/release sets).

## The 3.2.0 publish

Hand-cut minor (changesets configured for future PR flows; v3.0.0/v3.1.x were
likewise hand-cut). package.json + lockfile bumped to 3.2.0; CHANGELOG.md 3.2.0
entry added; a `repository` field added (npm provenance prerequisite).

`release.yml` converged to the `gates.mjs --run release` filter (it had drifted —
the prior hand list silently dropped proof:components-css, proof:lockfile,
proof:phantom-classes) + a tag↔version guard + `--provenance` (OIDC
`id-token: write`). This completes inv-θ across the publish path: local
(`release.sh`) == ci (`ci.yml` via gates:verify-ci) == release (`release.yml`)
all derive from the one manifest. The clean-runner tag publish is the
end-to-end proof the #177 repair works (3.1.1's tag predates the proof:*
CI-portability fixes; 3.2.0 is the first tag to witness the repaired pipeline
with provenance).

`release.sh` is NOT run locally for this cut: it runs `gates.mjs --run release`,
which is sibling-RED on the present value.js `development` key — fail-closed
locally. The pushed tag's `release.yml` run (clean runner, siblings absent) is
the binding green per inv-27.

## Shipped commit + the inv-27 binding green

The cut landed at **`9031972`** — `fix(gates): proof:package robust to the
gates.mjs --run sequence (inv-θ)`, one commit PAST the documented close
`ba0a117`. The sequenced `gates.mjs --run release` (which `release.yml` runs)
exposed a `proof:package` defect the standalone gate runs masked: `profile:budget`'s
`iter-build` (`vite build` with no `emit-types`) rebuilds the canonical dist
JS-only, wiping `dist/index.d.ts`; the later `proof:package` `npm pack` then
triggered `prepare`'s rebuild whose vite stdout contaminated the `--json`
capture. The fix makes `proof:package` a pure function of source (guard on the
`.d.ts` too + pack `--ignore-scripts` + robust JSON slice) — the inv-θ principle
applied within the gate fleet (a gate must not depend on a sibling gate's dist
side-effect). The annotated tag `v3.2.0` (`8903d9d`) points at `9031972`, which
equals `npm view @mkbabb/glass-ui@3.2.0 gitHead`.

The binding green per inv-27 is **`release.yml` run `26964913257`** (clean
Node-24 runner, siblings absent, the full `gates.mjs --run release` filter,
`npm publish --provenance` → SLSA `provenance/v1` attestation; companion `ci`
run `26964815843` on the same sha). Published-artifact byte-fidelity confirmed:
the registry tarball's `dist/glass-ui.js` / `aurora.js` (value.js-externalized) /
`styles/index.css` are sha256-identical to local dist; 667 files, no scratch
(`files` = `["dist","src/styles","src/fonts"]`).
