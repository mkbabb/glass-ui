# BI.W-PI-IN-CLOSE — the binding-π suite becomes a tag-blocker

Band B0 (cut-blocker). Born-RED at HEAD (by design, per `proof:visual-runner` W4).

## Mandate

- **FAM-1**: the binding-π suite (161 committed `tests-visual/*.spec.ts`) is in NO close battery; `visual-runner` W4 is born-RED, its DELTA absent → the cut has no machine proof of per-mechanism paint. Disposition: W-PI-IN-CLOSE.
- **H-2 / C-PAINT / WS7-01 / GATE-1**: real-paint-verify never blocks the tag — shipped source-green/visually-broken 3× (BB/BC/BD); STILL unenforced at HEAD. TERMINAL owner: make `--run pi` (or the W4 DELTA) a release-tagged tag-blocker.
- Charter: "W-GESTALT-LEDGER + the visual-runner W4 enforcement" — this wave owns the **visual-runner W4 enforcement** leg (the gestalt-ledger leg is `BI.W-GESTALT-LEDGER-FILE`).

## Design

The two-tier paint-verification split (`proof-visual-runner.mjs` W1-W4): CI proves the suite is ENROLLED + the runner INVOKABLE (W1-W3, `ci`); the LOCAL real-device `--run pi` GREEN proves the PIXELS painted (W4, born-RED — "the suite ran nowhere"). The gap: `--run pi` is a spec-runner MODE (`gates.mjs`), NOT a gate tag, so `--run full` never spawns it (`gates.manifest.mjs:40-55`), and W4's DELTA is deliberately absent — so the cut rests on `ba-gestalt`'s 10-surface roster alone (10 surfaces vs 161 per-mechanism specs).

Mechanism (the `ship-attestation` precedent, BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION): the close ceremony (`release.sh --run ship`, on a real Mac/Metal GPU) runs `gates.mjs --run pi` over BOTH Playwright projects against `:5199`, served-app-sentinel fail-closed, and WRITES the W4 verdict ledger to a committed DELTA (`docs/tranches/BI/audit/visual/W-PI-IN-CLOSE-DELTA.md` + a `PI-ATTESTATION.json` digest). The tag-blocker (`ci`+`release`-tagged, device-free) RECOMPUTES the suite hash at HEAD and REDs on absent/stale/FAIL — so the tag-push publish path (`git tag && git push` → `release.yml` → `gates.mjs --run full`) cannot fire without a fresh, GREEN pi attestation. `--run pi` itself stays `local` (a real browser + demo + GPU); the tag-blocker is the device-free witness that the local run happened GREEN, exactly as `ship-attestation` witnesses the Mac/Metal pixel digest.

Clean: no second π runner, no re-fork — this wires the EXISTING `--run pi` mode into the close as an attested blocker.

## Work

- `scripts/proof-visual-runner.mjs` — W4 gains a real oracle: read `PI-ATTESTATION.json`, RECOMPUTE the enrolled-suite content hash at HEAD, RED on absent/stale/any-FAIL-verdict (the `ship-attestation` recompute pattern). W4 flips born-RED→GREEN only on a fresh valid attestation written by the close run.
- `scripts/release.sh` (`runShip`) — after the Mac/Metal ship gates, run `gates.mjs --run pi`, capture the per-spec verdict, write `PI-ATTESTATION.json` + the DELTA. `release.yml`'s `--run full` reaches the device-free W4 blocker on every tag-push.
- `scripts/gates.manifest.mjs` — `proof:visual-runner` stays `local`+`ci`; ADD a `ci`+`release`-tagged `proof:pi-attestation` blocker row (device-free, in `--run full`) that reads the attestation.
- `docs/tranches/BI/audit/visual/W-PI-IN-CLOSE-DELTA.md` — the per-orphan verdict ledger (born absent; written by the close run).

## Acceptance

Gate: **`proof:visual-runner` (W4) + `proof:pi-attestation`** — W4 GREEN only on a fresh GREEN attestation (BORN-RED at HEAD: no ceremony has run, W4 born-RED, DELTA absent).

Clauses:
- W1-W3 un-regressed (runner-mode exists, enrolled-orphan-free over all 147 non-private specs (161 committed − 14 private), ci enrollment-soundness).
- W4 the LOCAL `--run pi` GREEN + the per-spec verdict ledger DELTA on disk (born-RED).
- PA1 `proof:pi-attestation` (device-free, `--run full`) recomputes the enrolled-suite hash at HEAD; REDs on absent/stale/FAIL — the tag-blocker.
- Self-test bite: a synthetic committed-but-unenrolled spec REDs W2 (existing); a forged/stale `PI-ATTESTATION.json` REDs PA1 (a 7-leg structural self-test, the `ship-attestation` precedent).

## π/DELTA

This wave IS the π-enforcement mechanism. The DELTA is the **per-spec verdict ledger** (`W-PI-IN-CLOSE-DELTA.md`) written by the close run: all the enrolled set (147 non-private minus the declared reflect-* excludes; computed from disk) × {chromium-headless-new, coarse-touch} GREEN over `:5199`, both modes. No NEW capture is authored here — the wave makes the EXISTING binding suite a machine-enforced tag precondition.

## Obligations

- **Device run (close-leg)**: the binding `--run pi` GREEN runs on the orchestrator's real Mac/Metal GPU at the close (LOCAL-only — a real browser + demo + GPU); the tag-blocker witnesses it. This is a B10 close obligation this wave WIRES; the run itself is the close ceremony.

## Dispositions

- Terminalizes **H-2** (real-paint-verify never blocks the tag) — the 3-tranche source-green/visually-broken disease. No re-book: the binding suite is a tag-blocker from BI forward.
