# BB.B9 — spring-crisp (`--spring-crisp`) — DELTA

**Wave:** BB.B9 — spring-crisp, CONDITIONAL.
**HEAD:** `bce1af11` (re-grounded 2026-06-17).
**Verdict: UNMET → NO-OP.** `--spring-crisp` is NOT minted in glass-ui. Consumers ride `--spring-snappy` (or their own local token). `proof:spring-crisp` LOCKS the no-op.

## The conditional

The relay (`docs/tranches/BB/coordination/cross-repo-inbound.md §5 line 114`):

> B9 spring-crisp `--spring-crisp` — NEW in-repo, CONDITIONAL — mint IFF the ≥2-consumer bar is met (5+ speedtest sites named); else consumers ride `--spring-snappy`.

The decision is a DECISION FIRST: survey whether a CRISPER-than-`--spring-snappy` register is genuinely needed by ≥2 BINARY consumers.

## The survey (speedtest tree, read-only, foreign-tree fence held)

The "5+ speedtest sites" figure traces to `speedtest/docs/tranches/AW/coordination/glass-ui-BB-ask-brief.md:244` — which itself flags the ask **"(optional)"** — and to the AS/AT audit roadmap (`docs/audits/2026-06-01-AS-*`, `2026-06-02-AT-M3-*`). That roadmap named FIVE+ speculative easter-egg consumers: AS-7 survey-pane retune, B0/B5 dock-breath, B1 needle-settle, B3 flow-tile-settle, N5 dashboard-record-tick, the DockLayerGroup morph-wink.

**At speedtest HEAD, NONE of the roadmap landed.** The ground truth:

| fact | evidence |
|---|---|
| `--spring-crisp` DEFINED in speedtest src/ | **1 file** — `src/design/animations.css:155` (scoped LOCAL to `.survey-step-pane`, NOT `:root`, NOT a glass-ui read) |
| `var(--spring-crisp)` consumed | **1 surface, 2 reads** — `animations.css:181-182` (transform + opacity of the SAME pane-slide transition) |
| host surfaces (`.survey-step-pane`) | **1** — `src/components/survey/SurveyWizard.vue` |
| dock-breath / needle-settle / flow-tile / dashboard-tick consumers | **0 — un-landed roadmap** |

The audit ALSO WEAKENED the original spec: the directive's ζ=0.92 was proved dead-flat (+0.06% overshoot, NOT the advertised 1-2% — `harden-motion-type.md:21-25`), and the survey-pane override that DID land uses a LOCAL ζ≈0.80 `linear()` it self-hosts (no library token needed).

## The decision: UNMET → NO-OP

The ≥2-genuine-binary-consumer bar (J-inv-10, visual-load-bearing) is **UNMET** — exactly ONE live consumer surface, which ALREADY self-hosts a local scoped `--spring-crisp` override. Minting a library `--spring-crisp` now would be **shelf-ware**: a token with one self-hosting consumer plus a roadmap of un-landed speculative consumers. The no-backwards-compat + visual-load-bearing discipline FORBIDS it.

Per the relay: **consumers ride `--spring-snappy`** (the existing CONTROL register, response 0.35 / ζ 0.65, the documented crisp-position-morph spring); speedtest's ONE pane keeps its self-hosted local token until the publish-gated VT path (AS-MW-VT) lands. IF the easter-egg roadmap ever lands ≥2 REAL surfaces, a FUTURE wave mints the row via `regen-spring-tokens.mjs` (the curve + the `--spring-crisp-duration` settle clock GENERATED from `(response, ζ)`, never hand-authored) + the ≥2-consumer evidence + flips this gate.

## The gate (`proof:spring-crisp`, born-RED→GREEN, device-free)

Locks the no-op HONESTLY so a future agent cannot slip the token in unaudited:

- **D1** — `SPRING_PRESETS` carries EXACTLY the five canonical rows (`smooth·snappy·bouncy·gentle·dock`); no `name: "crisp"` row; the `SpringPresetName` union does not admit `"crisp"`.
- **D2** — the emitted spring register CSS carries NO `--spring-crisp` token (curve or `-duration` clock); the five canonical curve + duration tokens ARE present (the register is intact).
- **D3** — this DELTA records the UNMET / no-op verdict + names the single live consumer surface (`survey-step-pane`).
- **SELF-TEST bite** — a synthetic scheme-motion carrying `--spring-crisp` MUST red the gate; a synthetic `name: "crisp"` preset row MUST red it. Both verified.

Born-RED (D3, DELTA absent) → GREEN (DELTA present, no token minted). No package.json line is owed for a mint; the gate is registered for the no-op lock (see the gates row). No CLAUDE / MIGRATION / PROGRESS-SPEC mint deltas — the no-op is the recorded outcome.
