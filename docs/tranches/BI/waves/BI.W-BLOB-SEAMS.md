# BI.W-BLOB-SEAMS — the goo-blob producer seams (GAP-L5 owned at last)

Band B5 (substrates). MINTED 2026-07-12 at the execution-time inbound-marking pass (user order:
"all must be marked and heard, analyzed") — the value.js GAP-L5 family rode PROMPT-RECAP row 314 as
a wholesale "B5" routing with NO owning wave; this wave is the owner. Sources of record:
`docs/tranches/BI/coordination/VALUEJS-T-COMMUNIQUE-2026-07-11.md` §1.4/§2.4 +
`docs/tranches/BH/coordination/valuejs-inbox-2026-07-12-u-formation.md` §2b GAP-L5.

## §Mandate

Discharges (each named, per the no-silent-drop law):
- **GAP-L5 (T-49) — the `settled` seam, BLOCKING**: the engine exposes NO quiescence seam; the
  value.js demo parks its hero at 2.7s idle while ONE fission beat is 5.2s — an armed-but-idle hero
  freezes mid-split. The engine's own `isQuiescent` knows better; the consumer cannot consult it.
- **The exported HERO preset** (the window row, T-communiqué §4).
- **`lightnessFloor`** — consumer-sizeable, the D8 ink-floor bracket **[0.12, 0.20] OKLab L,
  default 0.15**.
- **The single-WebGL2 collapse** — drain `metaball.wgsl` (the backing-store item; RP-2/L20 coupling:
  lands with the `/blob/config` subpath so the value.js eager-budget win (~−33 KiB) arrives in ONE
  window, per T-communiqué §4.2).
- **Rows A–E** (hero-scale mood-legibility floor · curvature-bounded pseudopod · containment/genesis
  update · contact-shadow register) — booked-swap priority per the communiqué: each row gets a
  TERMINAL decision here (build / DECLINE-recorded with the value.js pre-recorded "demo interim
  becomes permanent" disposition). No re-book.

## §Design

- **`settled`**: expose the existing quiescence state as a public reactive seam on the renderer
  handle (`settled: Readonly<Ref<boolean>>` derived from the engine's own `isQuiescent` + zero
  in-flight fission beat) + a `park-only-from-settled` guidance note in the README. NO new physics —
  the seam READS what the engine already knows (the no-second-engine discipline).
- **HERO preset**: export the calibrated hero configuration the demo re-derives by hand today
  (presets-in-consumers applies to CONSUMER hues; a named engine PRESET the consumer imports is the
  shipped-primitive path — the DEFAULT_AURORA_CONFIG precedent).
- **`lightnessFloor`**: a config atom clamping the derived palette floor, bracket-bounded.
- **WGSL drain**: `metaball.wgsl` (consumer-less at HEAD — the WebGL2 arm is the live path) is
  DELETED clean-break; the `useGpuSubstrate` picker keeps its aurora consumers. If a live WebGPU
  blob consumer is found at build time, record-with-rationale instead and book to the successor
  (fail-loud, never a silent keep).
- Rows A–E: assess each against the frame-diff-at-bead-box unit family the communiqué names; build
  what is config/seam-level; DECLINE-record what demands new physics (the sanctioned FSM `emerging`
  interim covers row F already — terminal).

## §Work

- `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` — the `settled` seam export.
- `src/components/custom/goo-blob/{index.ts,types.ts,presets…}` — HERO preset + `lightnessFloor` atom.
- `src/components/custom/goo-blob/shaders/metaball.wgsl*` — the drain (+ picker fallback verify).
- `docs/consumer-evidence/goo-blob-seams.md` — the per-row A–E decision record.
- Coordination: flip the roster's GAP-L5 rows to their terminal state at land.

## §Acceptance

Gate: **`proof:blob-seams`** (NEW, `local`+`ci`, born-RED at HEAD): S1 the `settled` seam is
exported + derived from the engine's own quiescence (no parallel busy-flag — the U3 single-signal
discipline); S2 the HERO preset + `lightnessFloor` exported, floor bracket-clamped [0.12,0.20];
S3 `metaball.wgsl` DEFINITION-ABSENT (or the recorded-rationale row); S4 rows A–E each carry a
terminal verdict in the decision record (build-landed / DECLINE-recorded — a bare "book" REDs);
+ a self-test bite per clause. BORN-RED PROOF at HEAD: no `settled` export exists
(grep-verified 2026-07-12); the wgsl file exists.

## §π/DELTA

The settled-seam behavioural probe (arm a fission beat, park mid-beat WITHOUT the seam → the frozen
mid-split frame is the BEFORE; park-only-from-settled → clean rest pose AFTER), Chrome + Safari,
both modes. DELTA: `docs/tranches/BI/audit/visual/W-BLOB-SEAMS-DELTA.md`.

## §Obligations

- The value.js verify-at-cut walk (their W7) consumes this at the 5.0.0 adopt — the roster rows
  reference this wave by name.
- The 390 blob perf gate (HARD) stays green through the WGSL drain.

## §Dispositions

- GAP-L5 settled seam: **BUILD** (this wave). HERO preset: **BUILD**. lightnessFloor: **BUILD**.
- Single-WebGL2 collapse: **BUILD** (drain; fail-loud rationale path recorded above).
- Rows A–E: **DECIDED-HERE** (per-row terminal verdicts in the decision record).
- Row F (body-arrival pose): **TERMINAL — DECLINED** (the FSM `emerging` state is the sanctioned
  interim per the communiqué's own pre-recorded disposition).
- PROMPT-RECAP row 314's wholesale "B5" routing: **RESOLVED** onto this wave (ADDENDUM entry).
