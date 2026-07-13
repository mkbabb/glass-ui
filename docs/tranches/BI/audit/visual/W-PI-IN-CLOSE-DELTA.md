# W-PI-IN-CLOSE — the binding-π suite verdict ledger (DELTA)

**Status: BORN-RED (ground state) — no `--run pi` close ceremony has run.**

This DELTA is the per-spec verdict ledger the local real-GPU close ceremony
`gates.mjs --run pi` (Arm A) OVERWRITES. Until that ceremony runs on a real
browser + demo (`:5199`) + GPU, this doc + `docs/tranches/BI/PI-ATTESTATION.json`
are the born-RED ground state and the tag-push publish path is BLOCKED by the
device-free `proof:pi-attestation` (Arm B, `["ci","release"]`, in `--run full`).

## The mechanism (H-2 terminalized)

The 161 committed `tests-visual/*.spec.ts` are the binding painted truth — the
per-mechanism π readbacks. Before this wave they were in NO close battery:
`--run pi` is a SPEC-runner MODE (`gates.mjs`), not a gate tag, so `--run full`
never spawned it, and `proof:visual-runner`'s W4 was born-RED with its DELTA
absent — so the cut rested on `proof:ba-gestalt`'s 10-surface roster alone (10
whole-page surfaces vs 161 per-mechanism specs). glass-ui shipped
source-green/visually-broken 3× (BB/BC/BD) on exactly this gap.

The closure is the `ship-attestation` two-arm split transposed to the binding-π SUITE:

- **Arm A — the PAINT (local, real-GPU).** `gates.mjs --run pi` (`runPi()`, called
  by `release.sh` between the ship ceremony and `--run full`) runs the ENROLLED set
  (142 non-private minus the 5 declared reflect-* EXCLUDE rows; computed from disk)
  over BOTH Playwright projects `[chromium-headless-new, coarse-touch]` against
  `:5199`, served-app-sentinel fail-closed; on a GREEN run it writes the per-spec
  verdict ledger + the derived `suiteHash` into `docs/tranches/BI/PI-ATTESTATION.json`
  + this DELTA.
- **Arm B — the FRESHNESS (device-free, `["ci","release"]`, this wave's blocker).**
  `proof:pi-attestation` recomputes the enrolled-suite content hash at HEAD (the spec
  SET + each spec's content bytes) and re-applies the per-spec verdict + coverage
  grammar, REDing on absent / stale / FAIL-verdict / any-non-pass-spec /
  missing-project / count-drift. THE only device-free enforcer on the
  git-push→release.yml→npm-publish path.

## Enrolled binding-π set (at ground state)

- **enrolledCount**: 142 (147 non-private − 5 declared reflect-* EXCLUDE rows)
- **projects**: chromium-headless-new, coarse-touch
- **verdict**: PENDING (no run)
- **suiteHash**: PENDING — recomputed at HEAD by Arm B every run; the ceremony
  stamps the SAME hash it will be re-checked against.

The per-spec verdict table lands here when the ceremony runs GREEN.
