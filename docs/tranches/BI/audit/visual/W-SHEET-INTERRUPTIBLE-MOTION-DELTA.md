# W-SHEET-INTERRUPTIBLE-MOTION — §π/DELTA discharge (V8b visual sweep)

The native-verification debt filed by `docs/tranches/BI/waves/BI.W-SHEET-INTERRUPTIBLE-MOTION.md`
§π/DELTA, discharged by the V8b sheet sweep. Repo HEAD `6950cfd4`, branch
`codex/bi-p-q-execution`, demo http://127.0.0.1:5199, Chrome via chrome-devtools MCP. Full
sweep record + numeric traces + artifacts:
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/visual-sweeps/V8b-sheet.md`.

Method: every motion arm was driven inside one `evaluate_script` with an in-page rAF sampler
(MCP latency ~5.4s ≫ the ~150ms entrance). `p` (0 mounted → 1 dismissed) is parsed per-frame from
the sheet's inline `translate` LONGHAND (`[data-slot="dialog-content"][data-placement]`); the scrim
opacity was sampled in the SAME script. The born-RED witness is the V6 sheet-reverse arm
(`tx=341 open,enter → tx=2 closed,exit`, a ~339px / Δp≈0.49 snap-to-open); the born-GREEN witness is
the frozen-frame partial pose below.

| # | §π/DELTA item | Verdict | Evidence |
|---|---|---|---|
| 1 | FAIL-1 RED→GREEN: reverse-mid-enter **and** re-open-mid-exit positionally continuous from the current position, all 4 placements, both schemes, 390 + 1440 | **GREEN** | 16/16 matrix. At interrupt `data-state` open→closed and the spring continues: p≈0.488 → next frame p≈0.457 (Δp~0.03 momentum) → min p≈0.408 → rides monotone to 1 → unmount. maxPerFrameJump ≤0.037 everywhere (RED Δp≈0.49). Re-open-mid-exit: pAtReopen 0.4595 → bounded peak 0.5474 → back to open, never unmounted. Frozen witness: right sheet held at p=0.458, ~46% off-right (V6 RED rendered fully-open here). |
| 2 | Early-interrupt (p≈0.85, high velocity) → bounded liquid excursion, not a mini-jump-to-open | **GREEN** | p=0.83/0.92 interrupts → min p 0.70–0.81 (never near open 0), excursion 0.11–0.12, reachedFullyOpen=false, per-frame Δp ≤0.039 (smooth ~130ms deceleration then reversal). |
| 3 | ~5.8px reverse momentum reads as a settle; ~5.8px anchored-edge entrance overshoot imperceptible-as-a-gap (do NOT pre-switch to gentle) | **GREEN (liquid settle, no offending gap)** | Overshoot a consistent **1.516%** (= computed 1.52% smooth ζ=0.8), = the drawer's V6-PASSED fraction. 5.82px (384px @1440), 6.93px (457px tall @1440), 4.44px (293px @390), 9.25px (610px tall bottom @390); all settle to 0. Transient (~1–2 frame peak), proportional — reads as the drawer-identical settle. `gentle` NOT taken (struck by law); `snappy` (~12px) not warranted. |
| 4 | Scrim opacity tracks the surface through an interrupt; blur-fade clean at extremes; stage-coupling stacking on a `stage!=none` side sheet acceptable (D5) | **GREEN** | scrimSyncMaxErr **0** across all interrupt traces (opacity = clamp(1−p) every frame). Clean close: scrim never vanished early (forceMount hold), opacity 0.0002 at dismiss, content+scrim unmount SAME frame. `opacity:1−p` fades the backdrop-filter blur with position — clean at both extremes. Stage-stacking: not exercised (no demo side sheet arms `stage!=none`) — remains the D5-accepted native debt, no regression observed. |
| 5 | Focus returns to trigger on interrupted close; Escape + scrim-click + Save/Cancel all interruptible; Configurator right-sheet composition intact | **GREEN** | Interrupted close → activeElement = trigger; scrim-click → dismiss+focus; Cancel → dismiss+focus; all route the one interruptible spring exit. Instrument-sheet: fixed header (top 31.52px stable while body scrolls 300px), body overflow-y auto (scrollHeight 1817 > client 657), close present; composition intact through open/interrupt/close. |
| 6 | PRM instant/in-place, no transform frames; `off` instant; `motion="reduced"`-prop keeps the full slide (D9) | **GREEN (PRM) · PENDING-HONEST (`off`)** | PRM (matchMedia reduce shim): entrance p=0 from frame 1, **0** mid-slide frames, scrim opacity 1 immediately; exit unmounts <5ms, 0 mid-slide frames. `off`: no demo sheet arms `motion="off"` → demo-unreachable; source-verified (`sideSpringLive` false → render at rest, plain reka Presence unmount). `motion="reduced"`-prop-keeps-slide is inherited D9 behavior, not separately exercised (no demo sheet sets it). |
| 7 | Center unification (R2): the center `springPreset` dialog now spring-EXITS (scale/opacity over smooth) instead of vanishing — reads correct; center closingInert (no tabbable mid-exit) | **PENDING-HONEST (source-wired, demo-unreachable) · regression floor GREEN** | No demo center `DialogContent` arms `springPreset` (grep + runtime `data-spring=null`); the setup-time `springActive.value` gate (DialogContent.vue:306) precludes a runtime retrofit, so the center spring-exit paints nowhere in the current demo — cannot be observed without a story edit (out of scope). Source-wired: `contentForceMount`/`closingInert`/center `springStyle` scale-opacity branch gate on `centerSpringActive`. **Regression floor GREEN:** the default center dialog is unbroken (data-spring null, glass-reveal, `-50% -50%` intact, glass-reveal-out exit → unmount, focus returns, inert false). Side-sheet `closingInert` verified live (inert=true every side exit). |
| 8 | Graded-edge (Q023) rides the content translate + re-samples backdrop each frame; no material regression during the slide | **GREEN** | Renders both schemes (adaptive `--glass-bg-overlay` oklab, light 0.97L / dark 0.29L), blur(40px) sat, mask 0.325→0.45→1 over 0–120px (no hard line/banding), z-index −1. Child of translated content with own `transform:none/translate:none` → inherits and rides the slide translate (no independent transform → no smearing); backdrop-filter re-samples live backdrop per frame by construction. Screenshots `v8b-sheet-03/04`. |

## Chrome + Safari, both schemes
- **Chrome:** discharged above, both schemes, 390 + 1440.
- **Safari:** PENDING-HONEST — no MCP Safari/WebKit driver in this window (Chrome-only). A parity-WebKit render never answers a stable-Safari question; not faked, not marked pass.

## Residual PENDING-HONEST (carry-forward)
- **Item 6 `off`** and **item 7 R2 center spring-exit + center closingInert** — source-wired but demo-unreachable (no story arms `motion="off"` or a center `springPreset`). To convert to GREEN a demo surface must arm them (a story edit, out of this seat's no-edit scope). R2 is currently observable nowhere (latent/defensive unification) — flag for a demo-coverage addition.
- **Safari (all items)** — awaits a WebKit driver / manual stable-Safari pass.

## Artifacts (`reports/visual-sweeps/artifacts/`)
`v8b-sheet-01-right-1440-dark-mid-interrupt-partial.png`,
`v8b-sheet-02-right-1440-light-mid-interrupt-partial.png`,
`v8b-sheet-03-left-1440-light-graded-edge-open.png`,
`v8b-sheet-04-left-1440-dark-graded-edge-open.png`,
`v8b-sheet-05-instrument-configurator-open-1440-light.png`.
