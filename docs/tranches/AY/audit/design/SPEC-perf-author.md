# SPEC-perf-author — the perf wave-spec authoring lane

Lane: **SPEC-perf-author** (AY design batch). Read-only on `src/`; doc-only spec
authoring per the TRANCHE-AND-WAVE-SPEC precept. No git, no source edits.

## Charge

Read the four Perf lane findings + the existing perf wave, then author/augment the
wave specs (evidence-backed HARD GATES, born-RED where the current state fails):

1. AUGMENT `AY.W-A11Y-PERF.md` with the measured runtime findings (substrate frame
   baselines as the gate baselines; the rAF-coalesce + contain:paint arms get their
   MEASURED before-numbers).
2. AUTHOR `AY.W-LIGHTHOUSE.md` IF the lighthouse findings warrant a dedicated wave
   (a `proof:lighthouse` gate class) — or fold into W-A11Y-PERF and say so.
3. RECORD the W-BLOB-GLASS G-PERF BASELINE numbers into `AY.W-BLOB-GLASS.md §2`.
4. APPEND a PERF section to slides `L-READINESS.md` (asset preloads, payload).
5. UPDATE `AY/PROGRESS.md` only if a new wave row is minted (append-only).

## Inputs read (the full corpus, analyzed before authoring)

- `docs/tranches/AY/audit/design/PERF-runtime-substrates.md` — the live-substrate
  frame-time audit (the ONE budget-blower is aurora painterly mediums; blob/dock/
  constellation/fourier/smooth-aurora all hold the cap at 0% dropped).
- `docs/tranches/AY/audit/design/PERF-bundle.md` — the payload story (CSS gzip budget
  FAIL +0.91%, the constellation D5 drift, the slides byte-stability).
- `docs/tranches/AY/audit/design/PERF-lighthouse-demo.md` — the 4-page × 2-form demo
  sweep (desktop ~perfect; mobile 81-92; aurora a11y 90 real defect).
- `docs/tranches/AY/audit/design/PERF-lighthouse-slides.md` — the til-briefing
  production sweep (LCP the only weak metric; eager-image defect; the `--d: 6`
  LCP-stagger; font preload).
- `docs/tranches/AY/waves/AY.W-A11Y-PERF.md` — the existing perf-bearing wave (5 gates).
- `docs/tranches/AY/waves/AY.W-BLOB-GLASS.md` — the refraction wave (G-PERF condition).
- `docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md` — the spec precept.
- `slides/docs/tranches/L/audit/L-READINESS.md` — the slides readiness doc.
- `package.json` — verified NO `proof:lighthouse` / `proof:nested-backdrop-budget` /
  `proof:webkit-backdrop` keys exist at HEAD (0 matches); the only runtime-timed gate
  is `proof:dock-animation-live` (onset-timing, not per-frame / not score-floor).

## What was authored (the 4 deliverables + the PROGRESS row)

### 1. AUGMENTED — `AY.W-A11Y-PERF.md` (new §"Measured runtime baselines")

Added a measured-runtime-baseline section (before §Non-goals) that records, with full
conditions (M5 Max / Vite DEV server / headed Chromium / 98 Hz rAF cap / 60fps budget):

- **The healthy substrate baselines** (blob/constellation/fourier/dock-morph/smooth-aurora
  all p50 10.2ms / 0% over 16.7ms, full speed AND 4× throttled) — the floor every G4
  after-number must stay inside.
- **The painterly-aurora exclusion** (oil-pastel 51ms/100%-over, van-Gogh 30.6ms — GPU-bound,
  W-AUR-PAINTERLY's surface, NOT this wave's) — recorded so G4 does NOT measure its
  nested-backdrop stack over a painterly page (that would conflate shader cost with backdrop
  cost; G4 mounts over a smooth/wispy aurora or flat substrate).
- **How the baselines bind G3/G4:**
  - **G3 before-number:** the runtime lane did NOT directly instrument the specular
    forced-layout count (whole-surface deltas sit at the cap because a single hover does not
    saturate the rAF). So G3's before-number is the static-source fact + the synthetic-sweep
    the spec already defines (~200 rect reads + ~200 matchMedia mints at HEAD → ≤ frames+1 +
    exactly 1). The baseline framing: the surfaces these reads sit ON hold the budget at REST,
    so the coalesce DEFENDS that headroom under a high-Hz sweep (a latent regression on a
    weaker device, multiplied by W54 maximal-glass), not a fix for an already-dropped frame.
  - **G4 before-number:** the contained single-surface cap (10.2ms p50 / 0% over 16.7ms) is
    the baseline; the born-RED arm records the UNCONTAINED nested p50/p95 (today only
    `.glass-card` carries `contain: layout style`, which omits `paint`), and the post-`contain:
    paint` after-number is asserted at-or-under the contained baseline + a recorded tolerance.
    Both numbers ride the DELTA; the ceiling is pinned as a NUMBER on the green run.
- **The flagged gap:** no per-frame budget gate in CI today; G4 is the FIRST runtime per-frame
  ceiling, scoped to the nested-backdrop stack; the BROADER per-substrate frame-budget gate
  (the audit's `trace.mjs` prototype) is routed to W-LIGHTHOUSE §runtime OR a named W-PERF2.
- Also added the `PERF-runtime-substrates.md` provenance to the wave's "Measured-perf inputs"
  header line.

### 2. AUTHORED — `AY.W-LIGHTHOUSE.md` (NEW wave; the findings WARRANT it)

**VERDICT: the Lighthouse findings warrant a DEDICATED wave, NOT a fold into W-A11Y-PERF.**
Rationale (recorded in the wave's §"Why a dedicated wave"):
- **Distinct protocol** — W-A11Y-PERF measures per-frame cost on a headed Metal GPU over a
  DEV server; Lighthouse measures first-paint/LCP/payload over a PRODUCTION `vite preview`
  build under simulated slow-4G + 4× CPU. No shared harness, server, or number. Folding would
  conflate "the JS is cheap, the thread idle" (TBT 0-40ms — W-A11Y-PERF) with "the eager
  stylesheet blocks first paint" (Lighthouse).
- **A `proof:lighthouse` score-floor gate is its own artefact class** — no such gate exists;
  the demo mobile perf (81-92) + slides landing (70) have a single well-understood lever; a
  per-surface floor + LCP-preload fixes are a coherent gate set distinct from the 5 W-A11Y-PERF
  gates.
- **The production preview protocol is a shared deliverable** both other perf waves cite
  (W-A11Y-PERF G4 prod-vs-dev cross-check; W-BLOB-GLASS G-PERF FBO-cost cross-check) —
  centralized here.
- **The aurora-dock a11y defects** came from the LH a11y category — they belong with the LH wave.

The wave carries goal+completion criteria (paired, per the precept), 4 evidence-backed hard
gates (LH-G1 per-surface score floor over the production preview; LH-G2 render-block/unused-JS
levers measured-down; LH-G3 aurora-dock a11y → 100; LH-G4 the slides LCP arm routed to L), the
production preview protocol as a reusable artefact, born-RED baselines (the demo + slides score
matrices), file:line-grounded root findings (LH-F1…F4), and named successors per gate. A SCOPE
NOTE records that most demo-side fixes are demo-private (not src/); the library-bearing slices
are the `/styles` shape decision + the eager-value.js reach + the score-floor gate (which gates
the demo as the library's live surface, consistent with the π lanes).

### 3. RECORDED — `AY.W-BLOB-GLASS.md §2` G-PERF BASELINE

Added a "G-PERF BASELINE" sub-block under the (G-PERF) binding condition with the full
pre-refraction frame profile from `PERF-runtime-substrates.md §F3`: conditions (M5 Max / DEV
server / headed / two live GL contexts / 98 Hz cap / 60fps budget), the 6-row table (rest/hover/
click × 1×/4× — all p50 10.2ms / 0% over 16.7ms), the rest histogram (`<=12: 541 · 12-16.7: 46
· >16.7: 0`, n=587 — zero frames over budget), the **≈6.5ms headroom** the refraction has to
spend, and the binding G-PERF GREEN criterion (FBO sample + one-tap Snell + squircle-bevel keep
rest/hover/click p50 ≤ ~12ms / 0% over 16.7ms 4× throttled on a re-run over a live aurora
backdrop; a regression over 16.7ms throttled fails the user's conditional and the greenlight
evaporates). Noted the prod-preview-protocol cross-check if dev↔prod diverges on FBO cost.

### 4. APPENDED — slides `L-READINESS.md §6 PERF`

Appended a PERF section (after the STRUCTURED SUMMARY) with the slides production Lighthouse
scores (born-RED), the 5 ranked-by-LCP-payoff PERF defects (eager-image lazy + de-prioritize;
re-encode/right-size + prune `ncbroadband.png`; lift the `--d: 6` LCP element out of the deep
stagger; preload the LCP-critical font; optional self-host/subset Google Fonts), the NOT-defects
(JS clean, CSS acceptable, CM fonts = DEC-8, CLS/TBT/A11y exemplary), and the routing (a new
**L.W-PERF** row or fold into L.W-CHR; FREE SLACK, not AY-gated; the gate is glass-ui
AY.W-LIGHTHOUSE LH-G4 against the same production preview protocol; DELTA lands in slides/L).

### 5. PROGRESS — one new wave row minted (append-only)

`AY/PROGRESS.md`: appended the **W-LIGHTHOUSE** row (after W-A11Y-PERF) as `planned (spec
authored)`, and annotated the existing W-A11Y-PERF row's status to record the runtime-baseline
augment. No other rows touched.

## Spec files touched

| File | Action |
|---|---|
| `docs/tranches/AY/waves/AY.W-A11Y-PERF.md` | AUGMENTED — new §"Measured runtime baselines" (G3/G4 before-numbers + substrate baselines) + input-header line |
| `docs/tranches/AY/waves/AY.W-LIGHTHOUSE.md` | AUTHORED — NEW dedicated wave (`proof:lighthouse` gate class + production preview protocol + 4 hard gates) |
| `docs/tranches/AY/waves/AY.W-BLOB-GLASS.md` | RECORDED — §2 G-PERF BASELINE numbers (the pre-refraction frame profile) |
| `slides/docs/tranches/L/audit/L-READINESS.md` | APPENDED — §6 PERF (asset preloads, payload, ranked defects, routing) |
| `docs/tranches/AY/PROGRESS.md` | UPDATED (append-only) — minted the W-LIGHTHOUSE row + annotated W-A11Y-PERF |
| `docs/tranches/AY/audit/design/SPEC-perf-author.md` | THIS lane report |

## Measurement honesty note

Every number carried into the specs is tagged with its CONDITIONS at the point of use (machine
= M5 Max; server = Vite DEV vs production `vite preview`; throttle = full-speed / 4× CPU / slow-4G;
the 98 Hz rAF cap that makes 10.2ms the vsync floor not substrate cost; observed-vs-simulated LCP
where they diverge by >2×). No number is presented as a user-facing measurement without its
throttle context. The production preview protocol is canonized once (in W-LIGHTHOUSE) and cited
by the other waves rather than re-derived. All authoring is doc-only; no `src/` was edited, no
build was run for this lane (the numbers are read from the four upstream audit lanes' recorded
artefacts), no git.
