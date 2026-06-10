# AY.W-LIVE1 — the live-gate CI architecture DECISION

**Repo** glass-ui · **HEAD** `at-dock-convergence` · **Decided** 2026-06-10

The one open architectural question the cardinal-lesson infrastructure left: **should CI re-run the 11
π/Playwright live gates server-side, or stay local-hook + static-ledger?** This doc weighs the two branches on
the recorded axes and PICKS one. The freshness clause (§3.2 of the wave spec — the stale-DELTA residual closure)
is REQUIRED on BOTH branches and lands regardless.

## The two branches (the §3.1 axes)

| axis | Branch A (local-hook + static ledger) | Branch B (SwiftShader/Dawn CI lane) |
|---|---|---|
| CI cost | ~0 (the static ledger is a ~30 ms FS scan) | + Chromium install + a `tests-visual` `npm ci` + 2 Playwright drivers (~2-4 min) |
| fidelity | reads the SAME software-GL SwiftShader CI would — a CI π run would NOT exercise the real-Metal path the dev box does; the SOTA artistic bar (aurora painterly) explicitly needs real-GPU (`proof:aurora-painterly-statistics` note: "real-GPU readback"), so a CI lane can only re-run the DEVICE-INDEPENDENT live gates, not the artistic ones | catches a structural regression (black substrate, desynced dock clock) server-side WITHOUT a dev box; does NOT close the artistic-fidelity bar (real-GPU still owed locally) |
| residual left | the stale-DELTA residual (D2) — closed by the freshness clause (§3.2) regardless of branch | §3.2 still required (SwiftShader cannot judge artistic fidelity); a CI re-run narrows D2 to the artistic gates only |
| precedent | the `release.sh` set + the 3.9.0 publish shipped green with the live gates local-only; CI never re-ran them | NET-NEW CI surface; the first π gate in CI |

The two device-INDEPENDENT candidates Branch B would re-run server-side are FIXED by the seed:
`proof:substrate-paints-color` (the shared substrate-paints-non-black floor) + `proof:dock-animation-live` (the
single-clock dock morph). Both are structural-truth readbacks (not artistic-fidelity), so SwiftShader is a
faithful re-run for them. The artistic gates (`aurora-painterly-statistics`, `font-cascade-live`
width-fingerprint) stay local — SwiftShader cannot judge pigment-true van-Gogh.

## Decision

**Branch A — keep the local-hook + static ledger (now freshness-deepened); do NOT add a headless-GPU CI lane at
AY.**

### Defended rationale

1. **The freshness clause closes the load-bearing residual (D2) on BOTH branches.** The D2 hole was never
   "CI doesn't re-run the live gates"; it was "a regression breaking a painting surface ships CI-green over a
   present-but-STALE PNG." The freshness depth-header (git-ancestry of `capture-commit` vs `surface-paths`
   last-touch) closes that on the STATIC path — even Branch A's CI now reds a stale DELTA. A SwiftShader CI lane
   does NOT close D2 (it re-runs the structural gates, but a stale DELTA over a still-green-structural surface
   would still pass); the freshness clause is the actual fix, and it is branch-independent.

2. **A SwiftShader CI lane re-runs the SAME software-GL the dev box's `PI_ANGLE=swiftshader` already exercises —
   it adds NO fidelity over the local real-Metal path.** The cardinal lesson demands the TRUE render path
   (darwin → Metal, the dev box's default `PI_ANGLE=metal`). A CI SwiftShader run is a DIFFERENT, lower-fidelity
   path; it can catch a black-substrate / desynced-clock STRUCTURAL break, but the SOTA artistic bar (the
   painterly aurora `proof:aurora-painterly-statistics`) explicitly needs a real-GPU readback a CI runner does
   not have. So the CI lane would re-run only the 2 device-independent gates — a narrow benefit for a NET-NEW
   ~2-4 min CI surface + the first π gate in CI (a maintenance + flake liability).

3. **The local-hook + static-ledger floor is sufficient AND already battle-tested.** The `.githooks/commit-msg`
   bite runs the cardinal gate on every commit (the active `--tranche=AY` arm); the CI re-runs it (so a
   `--no-verify` bypass is still caught); the 3.9.0 publish shipped green with the live gates local-only and the
   static ledger as the CI-side proof the live-verification HAPPENED. Deepening that ledger with the freshness
   clause is the highest-leverage move; a CI-π lane is speculative substrate (the ≥2-consumer / no-overfit
   discipline applies to CI surface too).

### Residual this branch leaves + the named successor

- **The artistic-fidelity bar stays owed LOCALLY.** A real-GPU (Metal) readback for the painterly aurora is NOT
  re-run on CI under either branch — it is the local dev-box's job. Named successor: **AY.W-AUR-PAINTERLY** (the
  Metal painterly readback) — unchanged by this decision.
- **The owed re-captures (the header-less AY allowlist DELTAs + the 6 AX `complete` rows + W52).** The freshness
  clause makes the staleness MACHINE-VISIBLE (the 4 AY allowlist DELTAs flag as header-less; the AX 6-row
  backlog stays born-RED on the `:ax` tracker); it does NOT back-fill them. Named successor: **AY.W-DELTA0** (the
  owed-DELTA sweep) re-captures with the freshness headers so the `--strict-freshness` close arm goes green.
- **Branch B is RE-OPENABLE.** If the real-GPU dev-box bottleneck recurs (no local Metal box available to run the
  device-independent live gates before a publish), re-open AY.W-LIVE1's Branch B: add the `gates-pi` CI job + the
  `ci-pi` gate tag + regenerate `ci.yml`. The harness is already present
  (`tests-visual/playwright.config.ts` resolves `PI_ANGLE=swiftshader` off-darwin + self-spawns `npm run dev`
  when `CI` is set), so the re-open is wiring, not invention.

## What landed (regardless of branch)

The freshness clause (the depth-header) is LANDED in `scripts/proof-live-verified-ledger.mjs`:
- `freshnessVerdict(doc)` parses `<!-- capture-commit: -->` + `<!-- surface-paths: -->` and runs the git-ancestry
  check (`git merge-base --is-ancestor <surface-last-touch> <capture-commit>`); stale → RED, fresh → GREEN,
  header-less → grace-on-bare-arm / RED-under-`--strict-freshness`.
- Layered ON the W-CARDINAL-INFRA own-surface + light/dark `deltaSatisfied({ownSurface})` bar (so it gates the
  allowlisted pixel-changing waves, not the shallow shared-surface rows).
- The self-test gained a 4th synthetic row (a header-bearing stale DELTA via the root-commit / package.json
  deterministic pair) — the bite is un-skippable every run.
- The `CAPTURE-PROTOCOL.md` per-DELTA artefact list now MANDATES the two freshness headers going forward.
- `--strict-freshness` is the fatal opt-in (the `:ax` backlog tracker + the close-verification arm); the bare
  active `:ay` commit/CI arm graces header-less DELTAs (the W-CARDINAL-INFRA §4a un-lockout invariant — the
  active gate is not a freshness lockout) and NOTEs the staleness for the AY.W-DELTA0 backfill.

## The R1 + R6 depth-clauses (AY.W-LIVE1-FINISH — landed beside the freshness clause)

The HC-cardinal §5 mechanism residue named two more UNBUILT stopping mechanisms at the same insertion site;
both are now LANDED in `scripts/proof-live-verified-ledger.mjs`:

- **R1 — the IHDR fabricated-viewport assert.** `isRealPng` checked only the PNG magic + a >1024B floor — a
  1280×721 desktop screenshot RENAMED `-mobile-` passed untouched (the four W-CON1 fakes; HC-cardinal §1a).
  `pngDimensions()` reads the IHDR width/height (the big-endian uint32 pair at byte 16/20) and
  `viewportFidelityVerdict()` REDs a `-mobile-` basename whose IHDR width is desktop-class (≥1000px). The
  bound sits above the max real mobile (780 = 390@2×) and below the desktop floor (1280) — no false-flag. The
  four W-CON1 mobile PNGs were already re-captured to 314×421 (W-CON-FIX), so R1 finds 0 fabrications at HEAD;
  the self-test (a synthetic 1280×721 `-mobile-` row) proves the detector still bites.
- **R6 — the GREEN-on-real-surface clause.** `gateStatusVerdict()` resolves every `.cache/gates/<id>.json` a
  DELTA CITES and asserts each `status === "pass"`. A DELTA claiming GREEN in prose while the persisted
  artefact reads `fail` (the HC-cardinal §3a class — W-DOCK1 cites `AY-dock-items-lag-capture.json`, W-DOCK2
  cites `AX-dock-animation-live.json`, both `fail` at HEAD on demo-server/probe-stability harness brittleness)
  is now MACHINE-VISIBLE: a NOTE on the bare arm (graced — the green-on-real re-run is the wave's own RG job,
  the named successor), RED under `--strict-freshness`. Same grace discipline as the freshness clause.

Both carry a self-test synthetic row (`proof:live-verified-ledger` now flags 6 synthetic rows every run). A
companion robustness fix on the two dock live-gates removed false-failure modes the R6 NOTEs surfaced: the
`--spring-dock` token-peak parse in `proof-dock-animation-live.mjs` read the thin `tokens.css` `@import` root
(the W-CSS1 carve moved the token into `tokens/scheme-motion.css`) — a `readTokenCascade()` resolver now
splices the imported partials so the device-free secondary parses again; and both dock gates switched
`networkidle` → `domcontentloaded` (the live aurora/blob WebGL substrate never lets the network idle). The
green-on-real dock-animation re-run (the probe-stability against the continuously-animated live dock) remains
W-DOCK2's RG2 job (HC-mechanisms §7 landing site #2).

### The 4 allowlist DELTA freshness headers (backfilled)

The four allowlisted own-surface DELTAs (W-DOCK1 / W-CON1 / W-BLOB2 / W-DOCK2) gained the
`capture-commit` + `surface-paths` + `superseded-by` headers with their HONEST original-capture commits.
All four surfaces were re-rendered AFTER the captures (the W-DOCK-NAV dock rebuild, the W-BLOB-REBUILD blob
rebuild, the W-GOD1 carve + W-SB-REVERIFY constellation re-verify), so the captures are genuinely STALE — but
each is RE-CAPTURED by a later own-surface live-verified wave (W-DOCK1/W-DOCK2 → W-DOCK-NAV; W-CON1 →
W-SB-REVERIFY; W-BLOB2 → W-BLOB-REBUILD), declared via `superseded-by`. So the bare arm grades them
`stale-superseded` (graced + NOTEd), RED under `--strict-freshness`; the own-wave-id re-capture is AY.W-DELTA0's.

### Slides-port twin (the named successor)

The slides `slides/scripts/proof-live-verified-ledger.mjs` carries the SAME magic-byte-only `isRealPng` and
no gate-status clause — the R1 + R6 twins are owed there too (HC-mechanisms §2/§5/§7 riders). Per inv-16
(glass-ui writes glass-ui), the slides port inherits these clauses when **L.W4** re-syncs the engine — recorded
here as the cross-repo successor, not landed in this lane.

Branch B (§3.3 — the `gates-pi` CI job + the `ci-pi` re-tag + the `ci.yml` regen) is NOT executed.
