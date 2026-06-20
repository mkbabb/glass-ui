# BD.W-LIVE-ARM-CI-GRACE-CANON

## (1) Band + goal

**Band 6 — Precept canon.**

Canonize the `liveArmCiGraceSkip()` π-arm CI-grace-skip pattern as a precept (extend `docs/precepts/instructions/gestalt-first-capture.md` P5 — the live-verify precept that already names the CI-ENROLLMENT/local-PAINT split but NOT the gate-side grace-skip MECHANISM): a `["local"]`-tagged live-π gate's REAL-BROWSER arm must grace-SKIP under CI (`process.env.CI` set) via the ONE single-source helper, and still RUN + hard-RED LOCALLY. The binding CI proof is the device-free union + the captured DELTA backstopped by `proof:live-verified-ledger` + the `proof:ba-gestalt` verdict (CI proves ENROLLMENT, the local close proves the PAINT).

## (2) Starting state — the exact on-disk reality

- **The helper SHIPS as a single source (VERIFIED, read in full):** `scripts/gate-output.mjs:64-91` carries `export function liveArmCiGraceSkip() { return Boolean(process.env.CI); }` (`:89-91`) under a 25-line docstring (`:64-88`) that records the FULL rationale: "The cardinal-lesson split (the `proof:dock-no-scale-pop` / `proof:dock-animation-live` / `proof:dock-tap-integrity` `!process.env.CI` precedent, generalized to a single source): a live-π gate proves the PIXELS on a real local GPU + cursor; in a CI environment the binding proof is the device-free union + the captured DELTA backstopped by `proof:live-verified-ledger` (+ the holistic `proof:ba-gestalt` verdict). … This helper closes the ONE gap that probe cannot see: `gates.mjs --run full` executed LOCALLY with `CI=true` (the release.yml-accurate emulation) on a dev box that DOES carry the browser … With CI set, the live arm SKIPs … with CI UNSET the local hard-CLOSED path is UNTOUCHED. … NOTE: this never weakens the device-free or `ci`/`release`-tagged gates (they do not call it); it only governs the live real-browser arm of a `["local"]` gate."
- **28 scripts thread it (VERIFIED):** `grep -rln 'liveArmCiGraceSkip' scripts/` = 28 files. Glass-ui commit `a021439a` (VERIFIED — the body): "(A) The π-gate CI-skip class — 27 live-π [local] gates lacked the failClosed=piPresent&&!process.env.CI guard the dock trio had. On the real release.yml runner (npm ci, no Playwright) they grace-skip via workspacePresent(); under the CI=true emulation (Playwright present) they ran the live arm + failed … Added liveArmCiGraceSkip() — ONE single-source helper in gate-output.mjs (the dock-trio !process.env.CI precedent) — threaded at each gate's live-arm decision point. Each SKIPS clean under CI (exit 0) AND still runs+hard-REDs LOCALLY (CI unset). Device-free source arms still gate under CI."
- **`gestalt-first-capture.md` P5 (VERIFIED, read in full):** `docs/precepts/instructions/gestalt-first-capture.md:59-65` — "## P5 — live-verify = a captured delta via the dev-tools MCP … The local `--run pi` GREEN on a real GPU device is the binding close-paint; CI proves ENROLLMENT (`proof:visual-runner`), the local close proves the PAINT (the cardinal-lesson split)." P5 NAMES the CI-ENROLLMENT/local-PAINT split but does NOT name the GATE-SIDE grace-skip MECHANISM (the `liveArmCiGraceSkip()` helper + the narrow-arm fence) that makes a `["local"]` live-π gate's real-browser arm skip cleanly under CI=true.

The decision: FOLD-LEDGER `→BD.W-LIVE-ARM-CI-GRACE-CANON` — "Canonize the gate-side grace-skip mechanism; narrow-arm (live real-browser arm only)."

## (3) The build — the canon edit (a submodule commit, orchestrator-owned)

**A precept-submodule doc edit. Orchestrator owns the commit + the pointer bump (named in the BD plan → ι expects it).**

Add a P5-extension paragraph (a `### P5a` subsection or an appended P5 paragraph) to `docs/precepts/instructions/gestalt-first-capture.md` after the P5 close (`:65`):

```
### P5a — the gate-side CI-grace-skip mechanism (the live real-browser arm)

The CI-ENROLLMENT/local-PAINT split (P5) is realized at the gate by ONE
single-source helper: a `["local"]`-tagged live-π gate gates its REAL-BROWSER
arm behind a CI-grace-skip — `liveArmCiGraceSkip()` (returns `Boolean(
process.env.CI)`). When CI is set, the live arm SKIPs cleanly (exit 0); when
CI is UNSET (a local close on a real GPU device), the live arm RUNS and
hard-REDs a real break.

The skip is NARROW-ARM. It governs ONLY the live real-browser arm of a
`["local"]` gate — NEVER the device-free clauses (which still gate under CI)
and NEVER a `ci`/`release`-tagged gate (those do not call the helper). The
device-free source arm of the same gate KEEPS biting under CI; only the
pixels-on-a-real-GPU arm grace-skips.

The single-source rule: every live-π gate threads the ONE helper at its
live-arm decision point, never a per-gate `!process.env.CI` re-roll (the
dock-trio precedent generalized — a divergent per-gate guard is the drift the
single source kills). The binding CI proof is then the device-free union + the
captured DELTA backstopped by `proof:live-verified-ledger` + the holistic
`proof:ba-gestalt` verdict — CI proves the gate is ENROLLED + the DELTA is on
disk; the local `--run pi` GREEN on a real GPU device proves the PAINT.

The gap this closes (the second-largest cut-blocker class): a live-π gate
that lacks the helper runs its real-browser arm under `gates.mjs --run full`
executed LOCALLY with `CI=true` (the release.yml-accurate emulation) on a dev
box that DOES carry the browser — and reads a harness artefact (a headless
route-transition DOM-detach, an oversized-canvas element-screenshot
compositing page chrome, a born-RED library-default register the shipped
surface does not paint) as a release RED. The real CI runner's `npm ci`
(no Playwright) already grace-skips via the workspace-present probe; the
helper closes the ONE gap that probe cannot see.
```

The canon NAMES the single-source helper seam (`liveArmCiGraceSkip()`) + the narrow-arm fence (live real-browser arm only, device-free + ci/release arms untouched) + the single-source rule (no per-gate `!process.env.CI` re-roll). It records the gap (the CI=true-on-a-browser-carrying-dev-box class) so a future agent threads the helper rather than re-discovering the cut-blocker.

Fences honored: NARROW-ARM (the cardinal fence — the grace-skip is for the live real-browser arm ONLY). The canon is precept-generic (it names the helper's BEHAVIOR — `Boolean(process.env.CI)` + the threading rule — as the recorded mechanism, applicable to any repo's live-π gate fleet).

## (4) The gate — born-RED → GREEN (verification, not a new build gate)

**Doc-canon wave** — the product is the P5a extension. Verification:

- **The mechanism already SHIPS** (28 scripts thread `liveArmCiGraceSkip`; the helper is the single source at `gate-output.mjs:89-91`). The canon records the gate-authoring rule so the next live-π gate threads the helper from birth.
- **NARROW-ARM FENCE (the binding correctness):** the canon must state — and the existing 28 implementations demonstrate — that the grace-skip governs ONLY the live real-browser arm; the device-free source arms + the ci/release-tagged gates KEEP biting under CI. The proof is `gate-output.mjs:86-87` ("this never weakens the device-free or `ci`/`release`-tagged gates (they do not call it); it only governs the live real-browser arm of a `["local"]` gate") + the `a021439a` body ("Device-free source arms still gate under CI").
- **The canon NAMES the single-source helper seam** (Q-chron-3: codification without a gate is insufficient) — `liveArmCiGraceSkip()` is the existing single-source machine-enforcement; the precept points at the THREADING RULE (one helper, never a per-gate re-roll).
- **CI-accurate verify:** confirm under `CI=true` that a representative live-π gate (e.g. one of the 28) grace-SKIPs its live arm (exit 0) while its device-free source arm STILL gates a planted violation — the narrow-arm proof (exactly what `a021439a` verified: "Each SKIPS clean under CI (exit 0) AND still runs+hard-REDs LOCALLY (CI unset). Device-free source arms still gate under CI.").

## (5) Paint verification

**Device-free — doc/canon wave (no paint).** NO `proof:ba-gestalt` (a precept paragraph, not a painting surface). The artefact is the P5a extension + the CI-accurate verification that a live-π gate grace-skips its live arm under CI while the device-free arm keeps biting. The BC anti-disease law is satisfied trivially.

## (6) Fences + risks

- **NARROW-ARM FENCE (the cardinal fence).** The grace-skip governs ONLY the live real-browser arm of a `["local"]` gate, NEVER the device-free clauses (which still gate under CI) and NEVER a `ci`/`release`-tagged gate (`gate-output.mjs:86-87`). The canon must state this so a future agent does not grace-skip a device-free or ci-tagged gate (which would mask a real source RED on CI).
- **SINGLE-SOURCE rule** — every live-π gate threads the ONE helper, never a per-gate `!process.env.CI` re-roll. A divergent per-gate guard is the drift the single source kills (the dock-trio precedent generalized at `a021439a`).
- **SUBMODULE-COMMIT FENCE** (as BD.W-CLOSE-DISCIPLINE-CANON). The P5a extension lands in the `docs/precepts` submodule; the orchestrator owns the commit + the pointer bump; ι expects it.
- **The helper is BEHAVIOR not a glass-ui-only edict** — the canon names `Boolean(process.env.CI)` + the threading rule as the recorded mechanism; a sibling repo's live-π fleet authors the same single-source helper.
- **No glass-ui src/ touch** — this is a precept-submodule doc edit; `gate-output.mjs` + the 28 threading scripts are byte-untouched (they already carry the helper).
