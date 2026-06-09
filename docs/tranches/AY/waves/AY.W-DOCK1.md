# AY.W-DOCK1 — Dock VERIFY-OR-FALSIFY the items-lag (capture the live frame-series)

**Tranche** AY (glass-ui) · **Batch** 1 (DOCK band; runs after W0-REGROUND + W-CARDINAL-INFRA) ·
**State** OPEN · **Repo** glass-ui · **Type** capture-harness + π frame-series DELTA (NO `src/`
behavioral edit — one demo-private deterministic-selector attribute is the only non-script touch) ·
**HEAD** `at-dock-convergence` (3.9.0 ancestor)

This wave discharges the SIGNATURE recurring complaint (PROMPT-CORPUS #5 / AUDIT-LEDGER #5,
marked CHRONIC across keyframes.js → AX → AY): *"the dock will shrink first, and THEN the items
will start shrinking a few ms later."* The hardening verdict is unambiguous — the lockstep is
**SOLVED by construction** (ONE `--dock-morph-t` scalar, `dockMorphContext.ts:121-239`) and
live-gated, but every "live-verified" dock DELTA on disk is a STILL FRAME; the TEMPORAL desync the
user reports was **never captured** (`H-dock §D6`, `H-motion-cohesion §F8`, `H-past-conversation §1`).
So this wave does NOT rebuild solved architecture (that would be the gestalt failure the lane
exists to catch). It VERIFIES-OR-FALSIFIES: capture the LIVE hover-expand frame-series on ONE
timeline (`--dock-morph-t` + box-width + LAST-entering-child opacity) at ≥2 viewports × light/dark,
for hover-expand + click-collapse + retarget-mid-flight — and the lag is captured-PRESENT (re-diagnose
at W-DOCK2) or captured-ABSENT (the perception was a pre-AX build; the chronic discharges on the artefact).

---

## Goal criterion

The temporal desync the user reports stops being PROSE and becomes a CAPTURED ARTEFACT. A fresh
auditor opening `docs/tranches/AY/audit/visual/W-DOCK1-DELTA.md` can read, FROM THE PIXELS AND THE
FRAME-SERIES alone, whether the dock shell leads its inner content over frames — and by HOW MUCH
(in ms, against the per-child stagger budget the architecture deliberately ships). The capture
samples the EXACT property the user perceives — the LAST entering `.dock-layer--full` child's
opacity onset — which the existing `proof:dock-animation-live` gate samples a LEAVING child for and
never asserts (`H-dock §D1`, `H-motion-cohesion §F9`). The wave is a VERIFY wave: it produces the
owed DELTA the cardinal lesson demands, and it routes the OUTCOME (lag present → re-diagnose at
W-DOCK2; lag absent → discharge) without pre-judging which.

## Completion criterion

The hard-gate set (§4) verifies: (1) the capture harness runs against the CORRECT, deterministic
dock route + selector and emits, per condition × viewport × theme, an on-disk frame-series JSON +
the keyframe PNGs; (2) the per-condition `lastEnteringChildOnsetMs` − `boxWidthOnsetMs` delta is
computed and recorded against the stated stagger budget; (3) `W-DOCK1-DELTA.md` carries the
verdict (lag captured-PRESENT or captured-ABSENT, with the numeric onset-delta table + the keyframe
strips for both themes at both viewports); (4) `proof:live-verified-ledger --tranche=AY` GREENs on
the `W-DOCK1` row (own-surface `W-DOCK1-*-light.png` + `W-DOCK1-*-dark.png` present, filename-matched).
The single binding condition is the DELTA artefact + the ledger-gate flip.

---

## §1 — The verified defect (file:line, source-grounded)

This wave's "defect" is a MEASUREMENT gap, not a behavioral one. Three concrete file:line facts
ground it:

**D-A — the existing live gate samples the WRONG child and asserts NOTHING about it.**
`scripts/proof-dock-animation-live.mjs:131-139` samples a "representative LEAVING child"
(`dock.querySelector(".dock-layer--summary")`) opacity; `:401-409` records
`childOpacityMovingFrames` as an explicit *"best-effort … NOTE"* with the comment *"the load-bearing
asserts are the two rising-frame counts + the single-clock onset above."* So the entering-child
onset — the property the user perceives lagging — is **never sampled and never asserted**. The one
binding "lockstep" check at `:389-399` asserts the box-width onset co-occurs with the
`--dock-morph-t` onset, but the box width IS `--dock-morph-t` by construction
(`src/styles/dock/layers.css:42-58`: `inline-size: calc(… * var(--dock-morph-t))`) — a tautology
that can never red and can never witness a box-leads-CONTENT desync (`H-dock §HEADLINE`).

**D-B — the existing gate's route is WRONG; no collapsible story dock lives there.**
`proof-dock-animation-live.mjs:65` hardcodes `DOCK_ROUTE = "/navigation/dock"` and `:204` re-mounts
via `clickLink("/navigation/dock")`. But the demo router builds routes as `/<category.id>/<story.id>`
(`demo/router.ts:32-36`); the `navigation` category (`demo/stories/manifest.ts:204-211`) contains
tabs / deck-progress / header-ribbon / carousel — **no dock story**. The collapsible dock lives at
`/dock/overview` (`manifest.ts:215-219`, the `dock` category; `demo/stories/dock/overview.vue:89`
`<GlassDock>` with no `always-expanded`). `/navigation/dock` resolves through the catch-all to a route whose ONLY
`.glass-dock` is the demo-shell `BottomDock.vue` (`demo/layout/BottomDock.vue:83-85`,
`always-expanded` — NON-collapsing) / `SidebarDock.vue` (`:65`, `variant="rail"` — its own header
declares *"the shipped GlassDock has NO collapse machinery for a vertical rail"*, `:4-6`). So the
existing gate either finds NO `.glass-dock.collapsed` (the SKIP/RED path) or samples a non-morphing
shell dock. This is WHY no live morph frame-series has ever been captured — the harness was
pointed at a page with no collapsible dock.

**D-C — the entering-child stagger is a DELIBERATE phase-shift of up to the full window, never
reconciled against "lockstep".** `src/styles/dock/layers.css:42-89`: entering children reveal via
`opacity = clamp(0, (--dock-expand-t − onset) / window, 1)`, `onset = --dock-stagger-step × (childIndex−1)`
capped at child 6, `--dock-stagger-window-size` default `0.55`. So child 1 reaches full opacity at
`expand-t ≈ window`, child 6 at `window + step×5`. The box reaches expanded size at `t≈1.0` (the
spring). The LAST controls are still ramping in AFTER the box settles — this IS "the shell expands,
items lag," intentional staggered reveal (`H-dock §D1`). The "lockstep" the architecture advertises
(box rides scalar) and the "lockstep" the user wants (items track the box tightly) are DIFFERENT
claims nobody has reconciled — and no capture has ever MEASURED the gap in ms.

These three facts together mean: the chronic cannot be discharged from the existing gate (it is
blind to the child onset AND aimed at the wrong page). It needs a PURPOSE-BUILT capture that
samples the right property on the right page and records the number.

---

## §2 — Objective

Build a CAPTURE HARNESS (not a new behavioral gate — that is W-DOCK2's job) that produces the owed
frame-series DELTA. Three moves, all in `scripts/` + `tests-visual/` + ONE demo-private attribute,
ZERO `src/` behavioral edit:

1. **Point the harness at the REAL collapsible dock with a DETERMINISTIC selector.** The capture
   navigates to `/dock/overview` (the only route with a collapsible story dock). To avoid sampling
   an ambiguous "first `.glass-dock.collapsed`" (the overview story renders several docks), add a
   plain root-forwarded `data-testid="dock-capture"` on the RELIABLY-MORPHING collapsible
   `<GlassDock>` (the slider-keep-open dock, `demo/stories/dock/overview.vue:284`, `:collapse-delay="600"`)
   — the harness selects `.glass-dock[data-testid="dock-capture"]`. **DO NOT use the GlassDock
   `container-name` prop for this** — it co-applies `container-type: inline-size`
   (`GlassDock.vue:184-189`), which CLAMPS the dock to its contained intrinsic size and FREEZES the
   collapse↔expand morph (`--dock-morph-t` stuck at 0, the FLIP measures collapsed→collapsed). This
   is the AT.W7 / 3.4.0 dock-collapse-vs-container-type interaction (`MEMORY.md`: *"dock-collapse fix
   = container-type removal"*) surfacing on the `containerName` prop. A plain `data-testid` attr has
   ZERO layout side-effect — it is the only safe deterministic-selector form on a collapsible dock.
   This is the ONLY non-script edit; it is demo-private and adds a named, stable capture target (a
   legitimate test-affordance, not a behavioral change). [Captured + recorded as the §F1
   `container-type-trap` finding in `W-DOCK1-DELTA.md`, routed to W-DOCK2.]

2. **Sample the LAST ENTERING child on ONE timeline, the property the user perceives.** The probe
   holds the named dock by `data-testid="dock-capture"`, fires the real pointer-enter, and rAF-samples on
   ONE `performance.now()` clock: (a) `getBoundingClientRect().width` of the dock root; (b)
   `getComputedStyle(root).getPropertyValue("--dock-morph-t")`; (c) the LAST entering
   `.dock-layer--full > *` child's `getComputedStyle(...).opacity` (the 6th-cap-onset child — the
   one with the largest stagger onset). For each it records `onsetTimeMs` (the
   `proof-dock-animation-live.mjs:276-282` `onsetTimeMs` helper is reused — import it, do not
   re-roll it). The harness captures THREE conditions: **hover-expand**, **click-collapse** (fire
   the collapse trigger, sample the reverse ramp), and **retarget-mid-flight** (interrupt the morph
   ~40ms in, re-expand — the `proof-dock-animation-live.mjs:224-250` retarget pattern, sampling the
   last child too).

3. **Capture the DELTA at ≥2 viewports × light/dark + emit the artefact set.** Run each condition at
   desktop (1440×900) AND mobile (390×844), in light AND dark (`.dark` class toggled). At the morph
   midpoint of each, save a keyframe PNG (`W-DOCK1-dock-<condition>-<viewport>-<theme>.png`) into
   `docs/tranches/AY/audit/visual/`; write the per-condition frame-series JSON (times / widths /
   morphTs / lastChildOpacities + the computed
   `onsetDelta = lastEnteringChildOnsetMs − boxWidthOnsetMs`) into the gate artefact. Author
   `W-DOCK1-DELTA.md` with the onset-delta table + the keyframe strips + the binding VERDICT.

The harness is a NET-NEW `scripts/proof-dock-items-lag-capture.mjs` (+ its π twin
`tests-visual/dock-items-lag-capture.spec.ts`) — it does NOT modify `proof-dock-animation-live.mjs`
(that gate's tautology fix + the entering-child ASSERTION belong to W-DOCK2). This wave's harness
is a CAPTURE instrument: it records and renders; it does not assert a pass/fail budget (a verify
wave measures; the impl wave gates). It honors the cardinal lesson (a captured live DELTA, not a
commit-message claim), root-not-consumer (it captures the library dock on the library demo, not a
slides copy), and no-workaround (it reuses the existing `onsetTimeMs` / `risingFrames` /
`maxInterFrameJump` pure helpers exported from `proof-dock-animation-live.mjs:259-297`, not a
parallel re-roll).

---

## §3 — Files + exact edit-sites

| file | edit |
|---|---|
| `demo/stories/dock/overview.vue:284` | add `data-testid="dock-capture"` to the RELIABLY-MORPHING collapsible `<GlassDock>` (the slider-keep-open dock at `:284`, `:collapse-delay="600"`, WITHOUT `always-expanded`). A plain root-forwarded data attr with ZERO layout side-effect — NOT the `container-name` prop (which co-applies `container-type: inline-size` at `GlassDock.vue:184-189` and FREEZES the morph — the §F1 container-type-trap). This is the deterministic capture selector — the only non-script edit (a demo-comment block documents why `container-name` is wrong). |
| NEW `scripts/proof-dock-items-lag-capture.mjs` | the capture harness. ROOT via `fileURLToPath(new URL("../", import.meta.url))`; `DOCK_ROUTE = "/dock/overview"` (the CORRECT route — D-B); `BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5173"`. `import { onsetTimeMs, risingFrames, maxInterFrameJump } from "./proof-dock-animation-live.mjs"` (reuse, do not re-roll). The in-page probe selects `.glass-dock[data-testid="dock-capture"]`, samples width + `--dock-morph-t` + the LAST `.dock-layer--full > *` child opacity on ONE timeline for the 3 conditions (hover-expand / click-collapse / retarget). Writes the per-condition frame-series + `childVsBoxOnsetDeltaMs` to a gate artefact via `gate-output.mjs` (the `writeGateArtifact`/`gateArtifactPath`/`snapshotStamp` trio). Uses `page.screenshot` at each morph midpoint → the PNG set. Same fail-CLOSED-when-π-present / SKIP-when-no-device shape as `proof-dock-animation-live.mjs` (the `piWorkspacePresent` helper). |
| NEW `tests-visual/dock-items-lag-capture.spec.ts` | the π twin run on the real device (the workspace runner). Drives the same 3 conditions × 2 viewports × 2 themes via Playwright's `page` + `page.emulateMedia`/`addStyleTag` for `.dark`, calls `page.screenshot({ path: "docs/tranches/AY/audit/visual/W-DOCK1-dock-<condition>-<viewport>-<theme>.png" })`, and asserts the artefact files EXIST + the onset-delta is FINITE (a captured number, not NaN) — it is a CAPTURE spec, not a budget assertion (the budget gate is W-DOCK2). |
| `package.json` (beside `:556` `proof:dock-animation-live`) | ADD `"proof:dock-items-lag-capture": "node scripts/proof-dock-items-lag-capture.mjs"` (landed at `:557`). |
| NEW `docs/tranches/AY/audit/visual/W-DOCK1-DELTA.md` | the capture write-up: the onset-delta table (3 conditions × 2 viewports × 2 themes), the keyframe PNG strips, the per-child stagger budget restated from `layers.css:213-283` (the `--dock-stagger-window-size` fallback `0.55` at `layers.css:235`; the `shell.css:51` SHIPPED default is `0.4` — the budget reconciliation W-DOCK2 owns), and the binding VERDICT (lag captured-PRESENT → name W-DOCK2 as the re-diagnosis successor; or captured-ABSENT → the chronic discharges, W-DOCK2 narrows to the tautology-retire + entering-child-assert only). PLUS the two NEW §F findings the capture surfaced (§F1 container-type-trap; §F2 first-mount `#persistent`-dock FLIP mis-seat), routed to W-DOCK2. |
| `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` | append `"W-DOCK1"` (the wave changed/captured pixels — the `proof:live-verified-ledger` own-surface bar applies, per W-CARDINAL-INFRA §2.5). |
| `docs/tranches/AY/PROGRESS.md` | add the `W-DOCK1` row referencing `W-DOCK1-DELTA.md` (so `proof:live-verified-ledger --tranche=AY` reads it). |

NOT in scope (named successors): the TAUTOLOGY retire + the entering-child ASSERTION budget + the
stagger reconciliation (tighten the `0.55` window vs document the cascade) → **AY.W-DOCK2**; the
2nd-`DOCK_SPRING`-copy + 2nd-FLIP-engine fold (`H-dock §D2/§D3`) → AY.W-DOCK2; the dock+slider live
DELTA + the missing `dock-with-slider.vue` story → **AY.W-DOCK3**; the `GlassDock.vue` 608-line
DO-NOT-SPLIT-banner reconciliation (`H-dock §D8`) → coordination note for W-GOD1/W-DOCK2 sequencing,
NOT touched here.

---

## §4 — HARD GATE (evidence-backed): `proof:live-verified-ledger`

The hard gate is the cardinal-lesson ledger gate (`proof:live-verified-ledger`, minted +
parameterized in W-CARDINAL-INFRA) flipping GREEN on the `W-DOCK1` row — which it can ONLY do when
the own-surface frame-series DELTA exists on disk. This is the evidence-backed condition (an on-disk
artefact set + a gate exit code), not a grep / "API exists" / still-frame check. Five clauses verify:

**G1 — the harness runs against the CORRECT route + selector and emits the frame-series.**
`npm run proof:dock-items-lag-capture` (with a demo dev server up + the π workspace installed)
navigates to `/dock/overview`, selects `.glass-dock[data-testid="dock-capture"]` (the plain
root-forwarded testid — NOT `data-container-name`, which freezes the morph per §F1), and writes
a gate artefact whose `facts` carry, PER condition (hover-expand / click-collapse / retarget): a
`morphTs` series that rises over ≥5 frames (a real spring, the `MIN_MORPH_FRAMES` bar), a `widths`
series, AND a `lastChildOpacities` series that MOVES over ≥3 frames (the entering child was actually
sampled — non-empty, non-frozen). If `lastChildOpacities` is empty or frozen, the harness REDS
(`no entering .dock-layer--full child sampled` — the D-A blind-spot would recur). Captured: the
artefact JSON.

**G2 — the onset-delta is COMPUTED and recorded (the number the chronic owes).** For each of the
3 conditions × 2 viewports × 2 themes (12 captures), the artefact carries
`boxWidthOnsetMs`, `morphTOnsetMs`, `lastEnteringChildOnsetMs`, and the derived
`childVsBoxOnsetDeltaMs = lastEnteringChildOnsetMs − boxWidthOnsetMs`. Every value is FINITE (a real
captured number, not NaN / null). This is the binding measurement: the temporal gap, in ms, that no
prior dock wave ever captured (`H-dock §D6`). Captured: the 12-row onset-delta table in
`W-DOCK1-DELTA.md`.

**G3 — the keyframe PNG set exists at ≥2 viewports × light/dark, own-surface + filename-matched.**
`docs/tranches/AY/audit/visual/` contains, for the hover-expand condition at minimum,
`W-DOCK1-dock-overview-hover-expand-desktop-light.png`, `…-hover-expand-desktop-dark.png`,
`…-hover-expand-mobile-light.png`, `…-hover-expand-mobile-dark.png` (the
≥2-viewport × {light,dark} floor; the click-collapse + retarget conditions add their own strips —
12 PNGs total).
Verified by `ls` + by `proof:live-verified-ledger --tranche=AY` which requires ≥1
`^W-DOCK1-.*-light\.png` AND ≥1 `^W-DOCK1-.*-dark\.png` own-surface match (W-CARDINAL-INFRA §2.3-2.4
deepened binding). A neighbor's PNG (`W18-*`, `W45-*`) does NOT satisfy it.

**G4 — the ledger gate flips GREEN on the W-DOCK1 row.** With `W-DOCK1` on
`docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` and a `W-DOCK1` row in `AY/PROGRESS.md`
referencing `W-DOCK1-DELTA.md`, `node scripts/proof-live-verified-ledger.mjs --tranche=AY` exits
**0** on the W-DOCK1 row (own-surface light+dark PNGs present + filename-matched). Born-RED witness:
BEFORE the PNGs land, the same run REDs on W-DOCK1 (`references PNGs but none own-surface` or
`own-surface PNGs lack the light+dark pair`). Captured: the before/after gate stdout + exit codes
in `W-DOCK1-DELTA.md`.

**G5 — the VERDICT is recorded and routes the successor.** `W-DOCK1-DELTA.md` states, on the
captured `childVsBoxOnsetDeltaMs` evidence against the `layers.css` stagger budget (window `0.55` ×
the morph duration ≈ the expected last-child trail), ONE binding verdict:
 - **lag captured-PRESENT** (the last-child onset trails the box onset by MORE than the deliberate
   stagger predicts, OR a second-clock artefact shows on the entering child) → the DELTA NAMES
   AY.W-DOCK2 as the re-diagnosis + re-gate successor (the chronic is real, fold the fix);
 - **lag captured-ABSENT** (the trail matches the deliberate stagger exactly — the perception was a
   pre-AX build or the intentional cascade read as lag) → the DELTA records the chronic as
   DISCHARGED-on-capture and narrows W-DOCK2 to the tautology-retire + entering-child-assert only
   (no behavioral re-tune).
The verdict cannot be "TBD" — the captured number forces one branch.

**The single binding condition:** `npm run proof:dock-items-lag-capture` emits the 12-capture
frame-series with FINITE per-condition `childVsBoxOnsetDeltaMs` (G1, G2); the own-surface light+dark
keyframe PNGs land at both viewports (G3); `proof:live-verified-ledger --tranche=AY` flips from
born-RED to GREEN on the `W-DOCK1` row (G4); and `W-DOCK1-DELTA.md` records the
captured-PRESENT / captured-ABSENT verdict with its named successor (G5). The lag is captured —
present or absent — on a real frame-series, never again a still frame.

---

## §5 — Named successors / out-of-scope edges

- **AY.W-DOCK2** (impl) — consumes this wave's VERDICT (G5). The captured verdict landed
  **lag captured-ABSENT** (box↔scalar onset Δ = 0 ms in all 12 captures; the trailing-child trail
  36.7–96.2 ms IS the deliberate per-child reveal stagger, riding the SAME scalar — not a clock
  desync). So W-DOCK2 is NARROWED on the lockstep axis: NO behavioral stagger re-tune (the
  KEEP-AND-DOCUMENT branch); it (1) DEMOTES the tautological box-vs-scalar check in
  `proof-dock-animation-live.mjs:385-399`, (2) authors the REAL entering-child onset ASSERTION
  (`childVsBoxOnsetDeltaMs ≤ the analytically-derived deliberate-stagger ceiling + ε`), and
  (3) folds the 2nd `DOCK_SPRING` copy (`useLayerTransition.ts:36` vs `dockMorphContext.ts:39`,
  `H-dock §D2`) + the 2nd FLIP engine (`H-dock §D3`) + the rail one-clock/indicator/persistence
  (`H-dock §D7`). It ALSO carries this wave's two NEW §F surface findings: §F1 (the `container-type`
  trap on `containerName` — gate or document the footgun) + §F2 (the `#persistent`-slot dock
  first-mount FLIP mis-seat — a first-mount FLIP-measurement audit).
- **AY.W-DOCK3** (impl) — the dock+slider live DELTA + the missing
  `demo/stories/compositions/dock-with-slider.vue` (`H-dock §D5`); the progress-bar-off-dock clause
  RE-HOMED to the L tranche (`H-dock §D4`).
- **W-GOD1 sequencing** — `GlassDock.vue` is 608 lines but its `:2-6` banner claims "421-line …
  DO-NOT-SPLIT" (`H-dock §D8`). This wave does NOT edit `GlassDock.vue` (only the demo story), so it
  introduces no W-GOD1 conflict; the banner-vs-carve reconciliation is W-GOD1/W-DOCK2's coordination.
- **AY.W-CARDINAL-INFRA** — this wave CONSUMES the parameterized `proof:live-verified-ledger`
  (`--tranche=AY`) + the `AY/audit/visual/` home + the `VISUAL-ALLOWLIST.json` sidecar it minted.

## §6 — Cross-references

- `docs/tranches/AY/audit/hardening/H-dock.md` (§HEADLINE tautology; §D1 stagger-by-design;
  §D6 still-frame chronic; §CONVERGENCE 1+4).
- `docs/tranches/AY/audit/hardening/H-motion-cohesion.md` (§F8 lockstep-is-solved; §F9 the gate
  samples a LEAVING child).
- `docs/tranches/AY/audit/hardening/H-past-conversation.md` (§1 the VERIFY-OR-FALSIFY re-cast; the
  cardinal-lesson recurrence).
- `scripts/proof-dock-animation-live.mjs` (`:65` wrong route; `:133` LEAVING-child sample;
  `:259-297` the reused pure helpers; `:385-399` the tautology W-DOCK2 demotes).
- `src/styles/dock/layers.css:213-283` (the deliberate entering-child stagger ramp + onset ladder);
  `src/styles/dock/shell.css:51,53` (the shipped `--dock-stagger-window-size: 0.4` / `--dock-stagger-step: 0.08`).
- `demo/stories/dock/overview.vue:284` (the collapsible slider dock — the `data-testid="dock-capture"` target).
- `demo/router.ts:32-36` + `demo/stories/manifest.ts:215-219` (the `dock` category proving
  `/dock/overview` is the real dock route, NOT `/navigation/dock`).
- `docs/tranches/AY/waves/AY.W-CARDINAL-INFRA.md` (the `proof:live-verified-ledger` engine this
  gate uses).
