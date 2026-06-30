# PASS 1 RESEARCH — LENS: PAINT-CLAIM INTEGRITY

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `9dfe285c` · **Agent:** paint-integrity (PASS 1, device-free evidence audit)
**Method:** audit the EVIDENCE, do not re-capture. For every DONE/PAINT-PENDING row claiming paint: does an on-disk DELTA exist; do the referenced PNGs resolve (`ls`); are they dimension-real (`sips`, non-blank); is there dual-engine (Chrome+Safari) both-modes provenance (renderer strings, byte-distinct legs)?

`verify-siblings-intact.mjs --quiet` exits 0. Wrote only under `docs/tranches/BG/audit/RESPEC/`.

---

## BOTTOM LINE

**The landed paint claims are HONEST. Zero inflation found.** All 7 paint-claiming rows (0.1, 2.1, 2.2, 2.3, 2.5, 2.6, 10.25) resolve to on-disk DELTAs + dimension-real PNGs + genuine dual-engine provenance. Chrome legs decode to real **`ANGLE Metal Renderer: Apple M5 Max`** (not SwiftShader); Safari legs are genuine off-screen **WKWebView** (`wkshot-live` compiled under glass-ui, not `/tmp`) with real probe JSON. Chrome-vs-Safari and light-vs-dark captures are byte-distinct — no relabel fraud. The `PAINT-PASS-LOG.md` records a real FAIL→re-paint→PASS cycle (2.2 dark-AA) and carries honest non-blocking notes. This is the OPPOSITE of the cardinal-lesson inflation.

**The paint DEBT is the whole rest of the tranche.** Only WS1 (route/field/scroll/hero) + 10.25 are paint-verified. The `proof:ba-gestalt` close oracle (`bg-gestalt-roster.md`) is born-RED on ALL 10 surfaces, and 8 of those 10 (dock, aurora, glass-feedback, shell, dark-register, tabs-segmented, page-band, configurators-goo, motion-fourier, cross-repo) are owned by PENDING bands (WS2/WS3/WS5/WS8/etc.) — none flipped. The 5.0.0 cut requires every roster row PASS. **~16 surface-flips × dual-engine × both-modes of paint work remain unstarted.**

---

## VERIFIED — the 7 landed paint claims (all KEEP-VERIFIED)

Provenance is uniform and genuine across every pipeline JSON: `Renderer: "ANGLE (Apple ... ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)"` for Chrome; `engine:"webkit-live"` WKWebView for Safari.

| Row | Wave | PNGs claimed / on disk | Dims | DELTA | Provenance | Verdict |
|-----|------|------------------------|------|-------|-----------|---------|
| 0.1 | PAINT-IS-THE-GATE | 18 (12 Chrome + 6 Safari) / **18 in `reflect/`** | 1440×900 + 2880×1800 | ✓ honest born-RED FAIL | Metal + WKWebView | KEEP |
| 2.1 | ROUTE-TRANSITION | 20 `rt-*` / **20** | Chrome 1440×900 @1x · Safari 2880×1800 @2x | ✓ + `chrome-results.json` + `chrome-burst.json` | Metal M5 Max | KEEP |
| 2.2 | FIELD-AURORA | 16 / **16** | all 2880×1800 | ✓ FAIL→fix→PASS recorded | Metal + WKWebView | KEEP |
| 2.3 | SCROLL-PROGRESS-RAIL | 30 / **30** | full 1440/2880 + 10 `grown` rail-strips 1440×90 (by design) | ✓ + `sp-webkit-live-results.json` (real ScrollTimeline `currentTime` probes) | Metal + webkit-live | KEEP |
| 2.5 | PAPER-GRAIN-OPTIN | 16 `pg-*` / **16** (in `route-transition-pipeline/`) | Chrome @1x · Safari @2x | ✓ + `pg-chrome-results.json` | Metal + WKWebView | KEEP |
| 2.6 | HERO-FIT | 32 `hf-*` / **34** (32 + 2 badge) | per-viewport @2x (375→750×1624 … 1920→3840×2160) | ✓ + `hf-chrome-results.json` + `hf-safari-results.ndjson` | Metal + WKWebView | KEEP |
| 10.25 | CATEGORY-CARD-WARM | 12 / **12** | all 2880×1800 | ✓ + `chrome-results.json` | Metal + WKWebView | KEEP |

Anti-fraud checks (all PASS):
- **No zero-byte / no blank PNGs** across all 5 pipelines (159 PNGs total; smallest non-strip is multi-hundred-KB).
- **Engine-distinct:** `chrome-forms-light` (1.60 MB) ≠ `safari-forms-light` (2.43 MB), distinct md5; `rt-chrome-light-foundations-intro` ≠ `rt-safari-...` (distinct hash + 835 KB vs 4.04 MB). Safari is not a relabeled/upscaled Chrome.
- **Mode-distinct:** `chrome-forms-light` ≠ `chrome-forms-dark` (both modes really captured).
- **Every cited commit exists** in git — device-free landings (`89dc3dee`, `274a2a6e`, `c6f44d95`, `3f200f1d`, `e47f31ad`, `9e13965d`, `7fa3156b`) AND paint-pass/re-paint commits (`79ea26aa`, `a5f5bc1e`, `186d5743`, `ebf6e45b`, `b3d65eec`, `cb8ecdfc`, `37bec1ce`, `0ca6c9fa`).

Honesty signals (strengthen the verdict):
- **2.2 was logged FAIL first** (`PAINT-PASS-LOG.md` §"FAILED → PAINT-PENDING"): the single light palette L0.90–0.94 at `opacityCeiling 0.5` composited over the near-black dark page to a brown wash, dropping hero h1 to **2.14:1** and muted to **1.04:1** (catastrophic). The fix (`shellAuroraConfigDark`, `b3d65eec`) was re-captured by a non-authoring leg and re-logged PASS (dark h1 13.87/14.68). The agent did not hide the miss.
- **Non-blocking notes are recorded, not buried:** light hero eyebrow 4.15:1 Chrome (≈AA, flagged as polish), CATEGORY-CARD light body "warm taupe not vivid peach" honest note, grain heavier in WebKit on busy cards.
- **0.1 DELTA flags its OWN limitations:** captured over dev `:5199` not built `:5200`; Safari content-absence is a dev-server-ESM artifact (honestly localized, NOT claimed clean); TCC-blocked `screencapture`; C18 harness unbuilt at that time. The later WS1 waves re-shot over BUILT bytes via the C18 harness and CLOSED the Safari blank-shell keystone — a coherent, honest progression.

---

## TRIAGE — anomalies & paint debt

### 2.7 BG.W-VT-ROUTE-ENHANCE — status-semantic smell (AMEND)
Marked **DONE** but the cell says **"DEFERRED-NOT-BUILT — marked DONE to skip the build frontier."** A DONE row that is explicitly not built carries no paint and no code. The cell text is honest, but `DONE` is the wrong status token — it will read as "shipped" to anyone scanning the cursor. **AMEND: re-label `DEFERRED`** (the row already lives in the deferred-ledger semantics). Low risk — it is genuinely optional VT polish with a recorded route-freeze GOTCHA (shell-aurora `view-transition-name` exclusion), correctly deferred to W-REFLECT3 live paint.

### 3.1 CARTOON-INK-GAMUT · 3.6 GLASS-BLUR-PEER — paint debt, correctly labeled (HALF-BAKED)
Both **PAINT-PENDING**: device-free gate GREEN (`proof:no-gray`, `proof:glass-cal` exist on disk), dual-engine paint verdict OWED. **NOT stale** — committed `2026-06-29 15:15/15:16`, ~1.5h before HEAD (`16:48`); this is exactly the WS3 frontier where the user paused. They carry legitimate paint debt but are HONESTLY labeled (no premature DELTA exists for either — confirmed `ls`). These two are the live edge of the convergence-ceiling spine (WS3) that WS8/WS12 read; their paint must clear before the deep-glass bands build on them.

### 3.7 GLASS-IDIOM-FACTOR — [H] DONE, no paint owed (KEEP)
Class-H (device-free close); `proof:glass-idiom-factor` GREEN; no paint claim, none owed. Correct.

### 0.x ledgers / 1.x BH [C] band — device-free, no paint owed (KEEP)
Rows 0.2–0.6 (gate/ledger/disposition) and 1.1–1.12 (BH concurrent-safe: scratch-sweep, payload, value-destraddle, snap-excise, alias-codemod, regen-mechanism, carves, docs-skeleton, prompts) are `[H]`/`[C]` device-free. Row 1.7 (`bh-carves`) explicitly defers its paint to WS11/WS12 carousel/pager coverage (orch-override recorded: byte-identical refactor, zero render delta). No paint inflation in this band.

### The PENDING bulk (128 rows) through the paint lens (RESTART-class build order note)
Not re-triaged row-by-row here (that is the code-vs-spec lens's job) — but the **paint-debt structure** is the load-bearing finding: every PENDING visual band (WS2 dock, WS3 glass-spine, WS5 viz, WS6 siri, WS8 glass-deep, WS9 paper-deep, WS10 de-shadcn, WS11 storybook, WS12 coherence) owes a `bg-gestalt-roster` surface-flip + per-wave DELTA. The roster's 10 surfaces map to those bands. The build ORDER (WS3 spine → WS8/WS12) is paint-load-bearing and should be **KEPT**: WS8 glass-deep + WS12 coherence are the 480-capture dual-engine both-modes capstone, and they read the unified blur/tint/specular spine WS3 produces. Building the deep bands before the spine paints would invert the dependency.

---

## RISKS at the 5.0.0 cut (paint lens)

1. **★★★ The gestalt close oracle is 80% unflipped.** `proof:ba-gestalt` is the operative `complete`-vs-`complete_with_misses` decision and is born-RED on all 10 surfaces. Only the WS1-adjacent surfaces have any paint; the 8 band-owned surfaces (dock/aurora/glass-feedback/shell/dark-register/tabs-segmented/page-band/configurators-goo/motion-fourier/cross-repo) are unstarted. This is the bulk of remaining paint work and gates the tag. Estimate the cut against ~16 surface-flips × 2 engines × 2 modes still owed, NOT against the 7 done.

2. **★★★ C-SAFARI deep-glass divergence is untested.** The WKWebView leg is proven for WS1 flat-surface routes, but WS8 glass-deep refraction (`backdrop-filter: url(#glass-refract)` SVG `feDisplacementMap`) is the highest cross-engine divergence class and has zero paint coverage. The seed names this the biggest execution risk (M9/M10). The current harness's ability to capture a *correct* deep-glass refraction in real Safari is unproven.

3. **★★ Single-point dependency on the C18 harness.** ALL future paint flows through the C18 `?capture=` harness + `wkshot-live` WKWebView binary. It works for the WS1 surfaces, but if it mis-renders a dock-morph/live-viz/deep-glass surface the entire paint-verification machine stalls. No fallback path is evidenced.

4. **★★ Device-free gates do NOT catch composited-over-field AA.** Row 2.2 shipped device-free GREEN (`proof:no-gray`/`proof:dark-material`) yet FAILED live paint catastrophically (1.04:1 muted) because the AA collapse is a *composite over the live aurora field*, invisible to a getComputedStyle token gate. Every PENDING glass surface over the shell field carries this same latent risk; the gestalt verdict is the ONLY net that catches it. Do not trust a device-free GREEN as paint-ready for any field-composited surface.

5. **★ Chrome @1x vs Safari @2x resolution asymmetry.** Declared and consistent (Chrome desktop 1440×900, Safari 2880×1800) — not fraud, but the Chrome desktop legs are half-resolution. Confirm the `proof:ba-gestalt` G1 `pngDimensions` floor tolerates @1x desktop Chrome, or the roster captures could trip a strict dimension assert at the close.

6. **★ Cursor commit-hash drift.** The cursor rows cite the device-free build commit; `PAINT-PASS-LOG` cites the (later) paint-pass commit. Both exist, but the dual-hash-per-row is a reconciliation nit — a reader could mistake one for the canonical landing. Worth a single canonical "landed-at" column at the cut.

---

## What I did NOT find (clearing the inflation hypotheses)
- No DONE row claims paint with a missing DELTA. (All 7 claims → 7 DELTAs on disk.)
- No DELTA references a PNG that fails to resolve. (Spot-checked the named paths in every PAINT-PASS-LOG entry.)
- No blank/zero-byte/relabeled captures. No light==dark or chrome==safari byte-collisions.
- No premature paint artifact for a PAINT-PENDING row (3.1/3.6 have no DELTA — correct).
- No `/tmp` capture leakage; `wkshot-live` compiled under the repo; siblings intact before+after.

---

## ADDENDUM — re-verified at HEAD `b716b5be` (2026-06-30, after the live-fix doc commit)

Re-ran `proof:ba-gestalt` + re-inventoried at the current HEAD (the prior body was written at `9dfe285c`).
Two material updates the live-fix commits introduced:

**A · FRESHNESS NOW STALE on 4 of 10 surfaces (was all-fresh at `9dfe285c`).** `proof:ba-gestalt` reports:
```
✗ shell           FAIL  freshness:stale
✗ dark-register   FAIL  freshness:stale
✗ page-band       FAIL  freshness:stale
✗ cross-repo      FAIL  freshness:stale
(other 6 FAIL freshness:fresh)
operative result  : FAIL (0 PASS / 10 FAIL)
```
The G7 auto-revoke fired: `e40e5095` (D-2) edited `demo/stories/story-hero.css` (in the shell/page-band
paint-closure) and `8947288a` (D-3) edited `src/styles/dock/layers.css`. Per §4 these surfaces now owe a
re-capture + re-stamp before any PASS — but since they were never PASS to begin with (all born-RED), the
stale flag is currently moot. It is a PREVIEW of the per-band re-capture churn the cut will demand: every
WS3+ glass/dock/paper edit re-stales these surfaces, and the roster has to be re-shot at EACH band close,
not batched. The 3 live-fixes alone already drifted 4 surfaces.

**B · LIVE-FIX (LX.1–LX.3) Safari coverage is asymmetric vs the "dual-engine verified" LEDGER label.**
- **D-1 constellation: ZERO Safari pixel capture.** Only 4 Chrome CDP PNGs (`before/after-{A,B}`, 1066×420).
  The DELTA honestly states "real Safari off-screen WKWebView cannot snapshot the live WebGPU/WebGL2 canvas
  (known WebKit GPU-layer limitation)" — so the WebKit leg is JS-engine-level (`parallax0_offsetPx=0`), NOT
  a pixel paint. The DEFECT-LEDGER label "dual-engine verified" is imprecise; record it as Chrome-pixel +
  WebKit-JS-engine.
- **D-2 paper-grain: Safari LIGHT-only** (no `*-safari-dark`). 2 Safari PNGs, both light.
- **D-3 dock: 2 Safari PNGs** (1 dark + 1 light) — narrower than the §2 4-PNG floor.

These are discrete regression repairs, not full paint-gated wave closes, so the §2 reflect-set floor is not
strictly their bar — but they do NOT discharge any roster surface, and D-1's missing Safari capture is the
early warning that **the WKWebView harness cannot snapshot a live viz canvas** (every viz-bearing roster
surface — aurora, motion-fourier, configurators-goo — inherits this limit; the C-SAFARI WS8 capture must
solve it).

**C · The two-verdict-mechanism split confirmed structural.** The cursor DONE flips ride `PAINT-PASS-LOG.md`
(prose); `proof:ba-gestalt` reads `bg-gestalt-roster.md` (pixel, all FAIL). The roster's declared capture
paths (`reflect/dock-light-desktop-full.png`) DO NOT RESOLVE — only the 4.2.0-Metal GROUND anchors
(`dock-overview-*`, `glass-material-*`, `shell-aurora-field-*`, 3 surfaces) exist in `reflect/`. The real
WS1 captures live in `visual/route-transition-pipeline/` + `visual/BG.W-FIELD-AURORA-paint/` — paths the
gate cannot see. **The §4 roster-reconciliation (re-point capture paths off the ground anchor + re-stamp
freshness + flip the verdict) was NOT executed for any passed WS1 surface.** This is the single biggest
amend: the good WS1 paint exists but is invisible to the binding gate, so `--run ship` (which includes
ba-gestalt) cannot pass and the tag cannot fire as wired.

**Net:** the prior body's verdicts STAND (zero inflation; 7 paint claims honest). The addendum sharpens the
cut risk — it is not "16 surfaces unpainted," it is "16 surfaces un-FLIPPED-into-the-roster-the-gate-reads,"
plus the live WS1 paint that IS done is sitting at non-roster paths and must be reconciled in.
