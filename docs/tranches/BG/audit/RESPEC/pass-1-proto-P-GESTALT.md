# P-GESTALT — the ba-gestalt roster reconciliation + the close-cost estimate (PASS 1, prototype-augmented spec)

**Item:** G2 — "The ba-gestalt roster reconciliation + close cost" · **Class:** spec prototype (design-heavy)
**Date:** 2026-06-30 · **HEAD:** `6369ad6e` · **Branch:** `tranche/BG` · **pkg:** 4.2.0 → cut 5.0.0
**Fence:** READ-MOSTLY. Verified every contested fact live on disk (ran `proof:ba-gestalt`, decoded PNG IHDRs, traced the paint workflow). Wrote ONLY under `RESPEC/`. `verify-siblings-intact --quiet` exit 0 before + after; tree clean (only untracked `RESPEC/`).
**feasible: TRUE** — the wiring is a workflow + device-free-gate + doc-artifact change, ZERO `src/` paint. The G1 dimension asymmetry is structurally tolerated (proven on disk). The close cost is bounded by a late-binding-sweep schedule.

---

## 0. THE ONE-PARAGRAPH TRUTH (re-verified live)

`proof:ba-gestalt` is **0/10 PASS** (4 stale: shell · dark-register · page-band · cross-repo). The keystone close oracle (`["local","ci","release"]`, blocking `--run full`/`--run ship`) is fully un-flipped, so **as wired the 5.0.0 tag cannot fire**. The root is NOT bad paint — the WS1/WS4 paint is good and on-disk. The root is a **two-artifact split that nothing reconciles**: the paint workflow `bg-paint.wf.js` flips the **cursor** (`EXECUTION-PROGRESS.md` row → DONE) off captures it writes to `docs/tranches/BG/audit/visual/<wave>-DELTA.md` + `visual/<pipeline>/*.png`, but it **never executes the real-paint-protocol §4 reconciliation** — it never (a) re-points the roster's `capture-light`/`capture-dark` off the 4.2.0 Metal ground onto the fresh warm capture, (b) flips the roster `verdict` cell FAIL→PASS, or (c) re-stamps the per-surface `<surface>.md` freshness header. So **6 paint-gated waves read DONE on the cursor while every one of their roster surfaces reads FAIL** (live-verified below). That divergence is the latent BB-class lie: the cursor (prose) and the gate (pixel) are two truths wired to two artifacts, and a wave greens its OWN cursor row while the SHARED close gate stays RED. The fix is three concrete pieces — a wave→surface map, the §4 step wired INTO the non-authoring judge (roster flip FIRST, cursor flip LAST, one commit), and a born-RED **`proof:gestalt-cursor-parity`** device-free gate that makes the biconditional `cursor-DONE(wave) ⟺ roster-PASS(surfaces(wave))` a HARD-RED. The close cost is ~14–16 surfaces × 4 dual-engine-desktop PNGs, dominated by the freshness auto-revoke re-stale treadmill, collapsed to ONE binding sweep by scheduling the binding roster flip LATE (WS12-adjacent, structurally post-integration).

---

## 1. THE LIVE LIE (re-verified on disk at `6369ad6e`)

| Fact | Verified live |
|---|---|
| `proof:ba-gestalt` operative | **0 PASS / 10 FAIL** — `dock·configurators-goo·aurora·glass-feedback·motion-fourier·tabs-segmented` FAIL+fresh; `shell·dark-register·page-band·cross-repo` FAIL+**stale** |
| Cursor rows DONE w/ "paint PASS" prose | rows **2.1 / 2.2 / 2.3 / 2.5 / 2.6 / 10.25** all read `DONE` with a verbatim "NON-AUTHORING dual-engine paint PASS" cell |
| Their roster surfaces | **all FAIL** — e.g. 2.1 ROUTE-TRANSITION paints shell/page-band/aurora (all FAIL); 2.2 FIELD-AURORA paints shell/aurora/dark-register (all FAIL); 10.25 CATEGORY-CARD-WARM paints page-band (FAIL) |
| Where the good paint lives | `visual/route-transition-pipeline/` · `visual/BG.W-FIELD-AURORA-paint/` · `visual/hero-fit-pipeline/` · `visual/BG.W-CATEGORY-CARD-WARM/` — paths the gate CANNOT see |
| Roster-declared capture paths on disk | **NONE** — `reflect/dock-light-desktop-full.png`, `reflect/shell-light-desktop-full.png`, … (surface-named) do not exist; the 18 on-disk PNGs are route-named ground anchors (`dock-overview-…`, `glass-material-…`, `shell-aurora-field-…`) |
| The workflow that flips the cursor | `bg-paint.wf.js` Verify phase: judge captures → writes DELTA → `git commit` flipping `EXECUTION-PROGRESS.md` PAINT-PENDING→DONE. **Grep-confirmed: zero touch of `reflect/bg-gestalt-roster.md`, the verdict cell, or `<surface>.md`.** |
| PAINT-PASS-LOG rule | `PAINT-PASS-LOG.md:3` — "A PASS flips the cursor row PAINT-PENDING -> DONE" (the cursor is the ONLY artifact the workflow drives) |

**Diagnosis.** The protocol (`real-paint-protocol.md §4`) DECLARES the four-step flip (resolve-on-disk → pixel-band → freshness → verdict), but the EXECUTING workflow (`bg-paint.wf.js`) implements only the cursor flip. The §4 reconciliation is documented-but-unwired. This is the exact disease lineage the protocol names (BB green-lie / BC never-built-cure / BD π-never-blocks-the-tag) re-minting one layer up: the *binding* artifact (roster) and the *driving* artifact (cursor) are decoupled, and no gate binds them, so they silently diverge.

---

## 2. G1 — THE Chrome-@1x-vs-Safari-@2x DIMENSION ASYMMETRY (resolved on disk; NO strict assert trips)

The pass-1-spec G2 asks: "Confirm `pngDimensions` tolerates Chrome-desktop @1x (1440×900) vs Safari @2x (2880×1800) or a strict dimension assert trips at the close." **Verified on real PNGs — the asymmetry is structurally tolerated; no equality assert exists.**

The capture-dimension verdict path is `proof-ba-gestalt.mjs:verifyCapture()` → `viewportFidelityVerdictBoth()` (`reflect-capture-verify.mjs:74`). The bounds:

- **Floor only, no ceiling.** A `-desktop-` basename REDs only if `dims.w < DESKTOP_FULL_WIDTH (1280)` (`reflect-capture-verify.mjs:78`). There is **no upper bound** and **no per-row width-equality check**. Empirically (ran live over the 18 on-disk PNGs + synthetic pairs):

  | basename token | dims | verdict |
  |---|---|---|
  | `…-desktop-full.png` (Chrome @1x) | 1440×900 | **OK** |
  | `…-safari-…-desktop-full.png` (Safari @2x) | 2880×1800 | **OK** |
  | synthetic desktop 1280×800 (floor-exact) | 1280×800 | **OK** |
  | synthetic desktop 1279×800 (below floor) | 1279×800 | **RED** (crop mislabeled desktop) |
  | `…-mobile-full.png` | 390×844 | **OK** (< `FABRICATED_MOBILE_WIDTH` 1000) |

- **The roster declares ONE engine (Chrome desktop).** Each roster row's `capture-light`/`capture-dark` name only `<surface>-{light,dark}-desktop-full.png` — NO `-safari-` variant. So `verifyCapture` runs only over the Chrome desktop captures; Safari's 2880-wide PNG never enters the gate's dimension path at all. The asymmetry cannot trip a gate that never reads the wider capture.

- **The global floor `MIN_CAPTURE_WIDTH/HEIGHT = 320` (`proof-ba-gestalt.mjs:83`)** is cleared by both engines trivially.

**Conclusion (G1 CLOSED):** no strict dimension assert trips at the close. Chrome @1x and Safari @2x both clear `≥1280` with no equality coupling. **The reconciliation does NOT need a dimension-normalization step.**

**The G1 caveat to RECORD (a separate gap, NOT a blocker):** because the roster declares only the Chrome leg, `proof:ba-gestalt`'s pixel-band (G5) is evaluated against the **Chrome capture ONLY**. The Safari paint is recorded in the per-surface `<surface>.md` prose / PAINT-PASS-LOG but is **NOT gate-read** by the pixel band. The Safari field-AA collapse class (the FIELD-AURORA cautionary: Chrome 1.04:1 vs Safari 1.91:1 collapsed DIFFERENTLY per engine) is therefore invisible to the operative `proof:ba-gestalt` verdict. **Recommendation:** either (a) add the Safari leg as a second declared capture column the gate pixel-reads (preferred — closes the dual-engine pixel gap), or (b) keep Safari in the per-surface `.md` and explicitly record that the operative pixel verdict is Chrome-only with the Safari band carried by `proof:safari-parity` / the C-SAFARI committed capture (§5 of the protocol). This is the SAME single-engine-pixel hole pass-1-spec G6 flags for `proof:field-aurora`; fold the decision once.

---

## 3. THE §4 RECONCILIATION — wired (the cursor flip TO the roster flip)

The reconciliation has three artifacts and one ordering rule. All are concrete and implementation-grade.

### 3.1 · The wave→surface map (NEW — the missing join)

There is no existing wave→surface map (grep-confirmed). The roster is CATEGORY-keyed (10 surfaces); the cursor/PAINT-PASS-LOG are WAVE-keyed; a wave paints onto 1..N surfaces. Author **`docs/tranches/BG/audit/reflect/wave-surface-map.md`** — a parse-stable table the §4 step + the parity gate both read:

```markdown
<!-- wave-surface-map — the join between paint-gated cursor rows and gestalt roster surfaces.
  proof:gestalt-cursor-parity reads this to bind cursor-DONE(wave) <=> roster-PASS(surfaces).
  A paint-gated [P] wave lists EVERY roster surface its diff repaints. A wave painting a
  surface NOT in the roster is a [ROSTER-ENROLL] HARD-RED (the BD/BE/BF roster-frozen-blindness
  fix — a new user-visible surface must enroll, never paint un-watched). SCHEMA: | wave | surfaces | -->

| wave | surfaces |
|---|---|
| BG.W-ROUTE-TRANSITION   | shell; page-band; aurora |
| BG.W-FIELD-AURORA       | shell; aurora; dark-register |
| BG.W-SCROLL-PROGRESS-RAIL | page-band |
| BG.W-PAPER-GRAIN-OPTIN  | page-band; aurora |
| BG.W-HERO-FIT           | page-band |
| BG.W-CATEGORY-CARD-WARM | page-band |
| BG.W-CARTOON-INK-GAMUT  | glass-feedback; page-band |
| BG.W-GLASS-BLUR-PEER    | dock; glass-feedback; dark-register |
| …(every [P] wave)       | …(its repainted roster surfaces) |
```

The mapping is AUTHORED per wave at its spec (the wave already declares its `Files:` in `bg-build-map.md`; the surface(s) are a 1-line derivation). The map is the single source the parity gate joins on.

### 3.2 · The §4 step wired INTO `bg-paint.wf.js` (the non-authoring judge does the flip)

The fix is a **4-instruction addition to the Verify-phase agent prompt** in `bg-paint.wf.js` (NOT a new workflow). On a PASS verdict, after writing the DELTA, the judge — atomic, in the SAME commit that flips the cursor — executes:

```
ON PASS for wave W (surfaces S = waveSurfaceMap[W]):
  for each surface s in S:
    1. RE-POINT CAPTURE  — copy the fresh dual-engine desktop capture to the surface-named path
       the roster declares:
         cp visual/<pipeline>/<chrome-light>.png  reflect/<s>-light-desktop-full.png
         cp visual/<pipeline>/<chrome-dark>.png   reflect/<s>-dark-desktop-full.png
       (the Safari leg lands engine-tagged: reflect/<s>-safari-light-desktop-full.png, …)
    2. PIXEL-PROVE       — run `node scripts/proof-ba-gestalt.mjs` and CONFIRM surface s's
       row would pass the field-probe expect band on the fresh capture (the judge reads the
       gate's pixelStats fact; the gate, not the judge, derives the band verdict).
    3. RE-STAMP FRESHNESS — `node scripts/reflect-stamp.mjs <s>` (§3.4) recomputes the surface
       surface-hash over the CURRENT source bytes and writes it into reflect/<s>.md.
    4. FLIP VERDICT      — edit reflect/bg-gestalt-roster.md: surface s's `verdict` cell FAIL -> PASS.
  THEN flip the cursor row W -> DONE.
  Commit ALL of {roster cell, <s>.md header(s), the reflect/ PNGs, the DELTA, the cursor} in ONE commit.
```

**The ordering is load-bearing:** roster flip + freshness re-stamp + capture re-point happen BEFORE the cursor flip, in one atomic commit, so the two artifacts can never persist diverged across a commit boundary. A judge that flips the cursor without the roster leaves the parity gate RED — caught at the next `--run ci`.

**The non-authoring discipline is preserved** (`real-paint-protocol.md §3`): the building agent still never judges its own paint; the §4 step is executed by the same FRESH judge that captures + verdicts. The §4 step is a deterministic file edit, not a judgement — the judgement is the gate's pixel-band derivation in step 2.

### 3.3 · `proof:gestalt-cursor-parity` (NEW device-free gate — the anti-lie net)

A new gate registered `["ci","release"]`, born-RED at HEAD, that makes the divergence a HARD-RED. It reads three docs (cursor, roster, wave-surface-map) and asserts the **biconditional**:

```
for every paint-gated [P] wave W with cursor status DONE:
    every surface in waveSurfaceMap[W] has roster verdict PASS          [PARITY-A: DONE ⇒ roster-PASS]
for every roster surface s with verdict PASS:
    every wave W with s ∈ waveSurfaceMap[W] has cursor status DONE      [PARITY-B: roster-PASS ⇒ DONE]
for every paint-gated [P] wave W:
    waveSurfaceMap[W] is non-empty AND every named surface ∈ roster      [PARITY-C: enrolled, no orphan]
```

**Born-RED at HEAD:** PARITY-A fires on rows 2.1/2.2/2.3/2.5/2.6/10.25 (DONE with FAIL roster surfaces). It flips GREEN surface-by-surface as the §4 step lands per band. A future wave that flips the cursor without the roster (the lie) REDs PARITY-A; a wave that flips the roster without the cursor REDs PARITY-B; a new paint surface not enrolled REDs PARITY-C (the roster-frozen-blindness fix). Sample implementation in §7.

This is the SINGLE wire the pass-1-spec calls for: *"wire the cursor flip TO the roster flip."* The biconditional IS the wire — the cursor's binding done-state and the roster's pixel-PASS are now mechanically the same truth.

### 3.4 · `reflect-stamp.mjs` (NEW helper — deterministic freshness re-stamp)

The judge must not hand-compute a sha256. Mint a thin CLI over the EXPORTED `surfaceHash` (already the ONE `createHash` in the tree — `proof-live-verified-ledger.mjs:311`, re-exported via `reflect-capture-verify.mjs:47`). It reads a surface's `<!-- surface-paths: -->` header, recomputes the hash over the current bytes, and rewrites the `<!-- surface-hash: -->` line. ~25 lines, no new dependency, single-source-honest. Sample in §7.

---

## 4. THE CLOSE COST ESTIMATE (the ~16-surface × 2-engine × 2-mode per-band re-capture)

### 4.1 · The surface count + per-surface PNG floors

| Axis | Count | Source |
|---|---|---|
| Roster surfaces NOW | 10 | live `proof:ba-gestalt` (`dock·configurators-goo·aurora·glass-feedback·shell·motion-fourier·dark-register·tabs-segmented·page-band·cross-repo`) |
| + WS4 user-visible enroll | +4 | `bg-build-map.md:398/640` ("4 WS4 user-visible surfaces MUST enroll") |
| + WS5/WS6/WS11 viz/siri/storybook | +~2 | the 480-capture capstone surfaces (estimate) |
| **Final roster** | **~14–16** | matches pass-1-spec G2 "~16 surface-flips" |

Per surface, per binding capture event:

| Set | PNGs | What it is |
|---|---|---|
| Gate-binding minimum | **2** | `capture-light` + `capture-dark` (Chrome desktop) — what `proof:ba-gestalt` actually pixel-reads |
| Protocol §2 dual-engine desktop floor | **4** | {Chrome, Safari} × {light, dark} — what the non-authoring judge produces |
| Full §2 on-disk shape (w/ mobile twins) | **8** | {Chrome, Safari} × {light, dark} × {desktop, mobile} |

### 4.2 · The freshness auto-revoke re-stale dynamic (the DOMINANT cost term)

The G7 auto-revoke (`proof-ba-gestalt.mjs:556`) reverts a surface's PASS to FAIL the moment any byte of its `surface-paths` drifts (`freshnessVerdict` content-hash). This is a **treadmill**: capturing a surface at its band does NOT settle it — every later band editing its surface-paths re-stales it.

**Live proof of the velocity:** in 2 days of build (WS1+WS3), **4 of 10 surfaces already drifted stale** (shell·dark-register·page-band·cross-repo) from direct edits to their declared single files (`AppShell.vue`, `dark-arm.css`, `StoryPage.vue`, `ladder.css`). And those are FAIL surfaces (stale is moot); a PASS surface would have auto-reverted.

The blast radius depends on a design choice the implementation must make about `surface-paths` breadth:

- **NARROW (current — single file per surface, e.g. `dock.md` → only `dock.css`):** re-stales only on a DIRECT edit to the declared file → cheap, but a **FALSE-KEEP hole**: a dock paint change in `dock/morph.css` / `dock-controls.css` does NOT revoke the dock PASS, so a stale-green dock could ship (the exact close-class lie the gate exists to kill). UNACCEPTABLE for a binding close oracle.
- **SCOPED PAINT-CLOSURE (recommended — `collectPaintClosure(surfaceSeed)` per surface):** the surface's own SFC/CSS subtree + the shared cascade files it transitively imports. No false-keep. But the shared glass cascade (`ladder.css`, `surfaces.css`, `material.css`, `glass.css`, `dark-arm.css`, `tokens/*`, `index.css`) sits in EVERY glass surface's closure, so a single edit to any of them re-stales EVERY glass surface.

The build-map confirms the shared-cascade churn after WS3: WS3 edits `dark-arm.css`/`surfaces.css`/`material.css`/`ladder.css`/`glass-fx.css`/`tokens/glass.css`; WS8 edits the glass-refract/substrate spine; WS9 paper; WS10 de-shadcn; WS12 capstone. **~5 post-WS1 bands each touch the shared glass cascade.** With scoped-closure surface-paths, each re-stales most of the ~16 surfaces.

### 4.3 · Two cost models

**Model A — naive per-band binding re-capture (the treadmill, AVOID):**
```
initial flip:   16 surfaces × 4 PNGs (dual-engine desktop)            =  64 PNGs
re-stale rounds: ~16 surfaces × ~4 shared-cascade bands × 4 PNGs       = ~256 PNGs
TOTAL                                                                  ≈ 320 PNGs (= 80 capture events)
```
At 2-concurrent browser-heavy judges (the `bg-paint.wf.js` cap) × ~10–15 min/event (build dist + serve + Chrome-CDP + WKWebView clang-once + per-route-mode capture + pixel-read + DELTA + the §4 flips + commit) → ~40 serial batches × ~12 min ≈ **8 hours of judge wall-clock**, most of it re-shooting already-correct paint that a later cosmetic edit re-staled.

**Model B — mid-tranche signal + ONE late binding sweep (RECOMMENDED):**
```
mid-tranche:  per-band captures for SIGNAL only (PAINT-PASS-LOG + DELTAs in visual/),
              the roster stays RED mid-tranche (acceptable — see §4.4)            = no binding cost
late sweep:   16 surfaces × 4 PNGs, ONCE, at WS12-adjacent (post-integration)     =  64 PNGs (16 events)
TOTAL binding                                                                     ≈ 64 PNGs (= 16 events)
```
~8 serial batches × ~12 min ≈ **~1.5–2 hours of judge wall-clock**, freshness fresh because no band edits after the sweep. With mobile twins the binding sweep is 128 PNGs (still 16 capture events — the mobile twin is captured in the same session). **Model B is ~5× cheaper and is the only schedule that does not re-shoot correct paint.**

### 4.4 · Why the roster CAN stay RED mid-tranche (the scheduling key)

`tranche/BG` is the integration branch that accretes every wave; per-push CI on `tranche/BG` is NOT the cut. The cut is `--run full`/`--run ship` siblings-absent at `BG.W-CUT`. So the roster being RED for 110 waves is EXPECTED — it is born-RED and flips at the close. `real-paint-protocol.md §4` already names the **WS12 capstone as "STRUCTURALLY post-integration"** — the binding sweep belongs there. The `proof:gestalt-cursor-parity` gate is the LATE NET (it runs at `--run ci`/`--run full`, and its PARITY-A reds tolerate mid-tranche divergence because a [P] row that is still `PAINT-LOGGED` (not yet `DONE`) is not asserted against the roster — see §4.5).

### 4.5 · The cursor two-stage paint state (the wiring that lets Model B work)

To let the binding roster flip be LATE while the per-band signal cadence stays, split the paint-done state into two cursor statuses:

- **`PAINT-LOGGED`** (NEW, mid-tranche signal): device-free GREEN + integrated + the non-authoring judge captured a PASS in `visual/` + PAINT-PASS-LOG records it. The roster is NOT yet flipped. `proof:gestalt-cursor-parity` PARITY-A does NOT assert a `PAINT-LOGGED` row against the roster.
- **`DONE`** (binding): `PAINT-LOGGED` + the §4 reconciliation executed (reflect capture re-pointed, roster verdict PASS, freshness fresh). PARITY-A asserts every `DONE` [P] row's surfaces are roster-PASS.

The cut (`BG.W-CUT`) requires **every [P] row at `DONE`, none at `PAINT-LOGGED`** — which forces the late binding sweep before the tag. This is the minimal status addition that wires the binding-done to the roster while preserving the cheap mid-tranche cadence.

**Lighter-touch alternative (if a new status is undesirable):** keep DONE as the signal state and add a SINGLE cut-gate requirement (`proof:gestalt-cursor-parity` PARITY-A) that runs ONLY at `--run full`/`--run ship` (not per-push `--run ci`). Then the binding sweep is forced at the cut, the mid-tranche cursor stays DONE-on-signal, and the parity gate is the late net. Trade-off: the cursor DONE no longer means "roster-bound" mid-tranche (weaker semantic, but one fewer status). Recommend the two-stage status for honesty; the lighter-touch is acceptable if status churn is a concern.

---

## 5. THE RECONCILIATION CHECKLIST (implementation-grade, ordered)

1. **Author `wave-surface-map.md`** (`reflect/`) — every [P] wave → its roster surface(s). (§3.1)
2. **Mint `scripts/reflect-stamp.mjs`** — the deterministic freshness re-stamp over the exported `surfaceHash`. (§3.4 / §7)
3. **Decide `surface-paths` breadth** — widen each `<surface>.md` from the narrow single file to the SCOPED paint-closure (`collectPaintClosure(surfaceSeed)`) so the auto-revoke has no false-keep hole. Record the closure per surface. (§4.2)
4. **Wire the §4 step into `bg-paint.wf.js`** — the 4-instruction addition to the Verify-phase prompt (re-point capture → pixel-prove → re-stamp → flip verdict → THEN cursor, one commit). (§3.2)
5. **Mint `proof:gestalt-cursor-parity`** (`["ci","release"]`, born-RED) + register in `gates.mjs` + `package.json` + the ci-emit. (§3.3 / §7)
6. **Add the `PAINT-LOGGED` cursor status** (or the lighter-touch cut-only parity arm) + update the cursor Legend + `engine-design.md`. (§4.5)
7. **Resolve the G1 Safari-pixel caveat** — decide whether the roster declares a Safari pixel column or records it via `proof:safari-parity`. Fold once with pass-1-spec G6. (§2 caveat)
8. **Schedule the binding sweep at WS12-adjacent** — mid-tranche captures are signal-only; the binding roster flip is ONE late sweep. (§4.4)

---

## 6. FEASIBILITY VERDICT

**feasible: TRUE.** Every piece is a doc/workflow/device-free-gate change with ZERO `src/` paint:
- The wave→surface map is an authored table.
- The §4 step is a deterministic file edit (cp + 2 line edits + 1 helper call) the judge already has the context for.
- The parity gate is a 3-doc parse + a biconditional check (the same shape as `proof:tag-parity` / the live-verified-ledger column parser) — born-RED, self-testable.
- The G1 dimension asymmetry is ALREADY tolerated on disk (no code change needed).
- The cost is bounded by the late-sweep schedule the protocol already names.

**Risks / open questions:**
- **OQ-1 (surface-paths breadth, §4.2):** narrow (false-keep) vs scoped-closure (re-stale treadmill). RECOMMEND scoped-closure + Model-B late sweep. Needs the per-surface seed chosen (the surface's entry SFC/CSS) — a 1-line decision per surface.
- **OQ-2 (Safari pixel, §2 caveat):** the operative pixel band is Chrome-only; the Safari field-AA collapse (FIELD-AURORA proof) is gate-invisible. Fold with pass-1-spec G6 — decide once whether the roster gains a Safari pixel column.
- **OQ-3 (status churn, §4.5):** two-stage `PAINT-LOGGED`/`DONE` vs cut-only parity arm. RECOMMEND the two-stage for honesty.
- **OQ-4 (the 6 already-DONE rows):** rows 2.1/2.2/2.3/2.5/2.6/10.25 are DONE-on-signal with FAIL roster surfaces. They must be re-graded to `PAINT-LOGGED` (or their roster flipped now) when the parity gate lands, or PARITY-A is born-RED against them (which is CORRECT — it surfaces the live lie). Recommend: land the gate born-RED against them, then the WS1/WS4 binding sweep (which re-captures over fresh sources) flips them GREEN. NB: their `surface-paths` already drifted (shell/dark-register/page-band stale), so a fresh re-capture is owed regardless.

---

## 7. SAMPLE CODE (implementation-grade)

### 7.1 · `scripts/reflect-stamp.mjs` — the deterministic freshness re-stamp

```js
#!/usr/bin/env node
// reflect-stamp — re-stamp a gestalt surface's <!-- surface-hash --> over the CURRENT
// source bytes, using the ONE exported surfaceHash (no second createHash). The §4
// reconciliation step the non-authoring judge runs after a fresh capture passes the band.
//   usage: node scripts/reflect-stamp.mjs <surface>          (re-stamp one)
//          node scripts/reflect-stamp.mjs --all              (re-stamp every roster surface)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, fileURLToPath } from "node:url";  // (adapt imports to repo style)
import { surfaceHash } from "./reflect-capture-verify.mjs"; // re-exports the ledger's ONE hash

const ROOT = resolve(new URL("../", import.meta.url).pathname);
const surface = process.argv[2];
const recordPath = `${ROOT}/docs/tranches/BG/audit/reflect/${surface}.md`;
if (!existsSync(recordPath)) { console.error(`no record for ${surface}`); process.exit(1); }

const doc = readFileSync(recordPath, "utf8");
const sp = doc.match(/<!--\s*surface-paths:\s*([^>]*?)\s*-->/);
if (!sp || !sp[1].trim()) { console.error(`${surface}: no surface-paths header`); process.exit(1); }
const paths = sp[1].split(",").map(s => s.trim()).filter(Boolean);
const fresh = surfaceHash(ROOT, paths);                       // the ONE createHash leaf
if (!fresh) { console.error(`${surface}: a surface-path is unreadable`); process.exit(1); }

const out = doc.replace(/(<!--\s*surface-hash:\s*)[0-9a-fA-F]{64}(\s*-->)/, `$1${fresh}$2`);
writeFileSync(recordPath, out);
console.log(`reflect-stamp: ${surface} surface-hash -> ${fresh.slice(0,12)}… (${paths.length} paths)`);
```

### 7.2 · `scripts/proof-gestalt-cursor-parity.mjs` — the biconditional net (skeleton)

```js
#!/usr/bin/env node
// proof:gestalt-cursor-parity (["ci","release"], born-RED) — wires the cursor flip TO the
// roster flip. The two-verdict split (PAINT-PASS-LOG prose drives the cursor; the roster
// pixel drives proof:ba-gestalt) is the latent BB-class lie; this gate makes the divergence
// a HARD-RED. Born-RED at HEAD: rows 2.1/2.2/2.3/2.5/2.6/10.25 are DONE with FAIL roster
// surfaces (PARITY-A). Flips GREEN surface-by-surface as the §4 reconciliation lands.
import { existsSync, readFileSync } from "node:fs";
// ... gate-output.mjs boilerplate (snapshotStamp, writeGateArtifact, gateArtifactPath) ...

const ROOT = /* repo root */;
const CURSOR = `${ROOT}/docs/tranches/BG/execution/EXECUTION-PROGRESS.md`;
const ROSTER = `${ROOT}/docs/tranches/BG/audit/reflect/bg-gestalt-roster.md`;
const MAP    = `${ROOT}/docs/tranches/BG/audit/reflect/wave-surface-map.md`;

// parseCursor → [{ row, wave, cls /* H|P|C|WSn */, status /* PENDING|BUILDING|PAINT-LOGGED|DONE|… */ }]
// parseRoster → Map(surface → verdict)  (reuse proof-ba-gestalt.mjs:parseRoster shape)
// parseMap    → Map(wave → string[] surfaces)
const cursor = parseCursor(readFileSync(CURSOR, "utf8"));
const roster = parseRoster(readFileSync(ROSTER, "utf8"));   // surface → FAIL|PASS
const map    = parseMap(readFileSync(MAP, "utf8"));          // wave → [surfaces]

const violations = [];
const paintWaves = cursor.filter(r => r.cls === "P");

// PARITY-C — every [P] wave is mapped + every named surface is a real roster surface.
for (const w of paintWaves) {
  const surfaces = map.get(w.wave);
  if (!surfaces || surfaces.length === 0)
    violations.push(`[PARITY-C] paint-gated wave ${w.wave} has no wave-surface-map entry — it paints un-watched (roster-frozen-blindness)`);
  else for (const s of surfaces)
    if (!roster.has(s))
      violations.push(`[PARITY-C] wave ${w.wave} maps surface "${s}" absent from the roster — enroll it or fix the map`);
}

// PARITY-A — cursor DONE ⇒ every mapped surface roster-PASS. (PAINT-LOGGED is exempt — mid-tranche signal.)
for (const w of paintWaves.filter(r => r.status === "DONE")) {
  for (const s of (map.get(w.wave) ?? [])) {
    if (roster.get(s) !== "PASS")
      violations.push(`[PARITY-A] cursor row ${w.row} ${w.wave} is DONE but its roster surface "${s}" is ${roster.get(s) ?? "?"} — the §4 reconciliation never flipped the roster (the two-verdict split / BB-class lie). Flip the verdict + re-stamp freshness + re-point the capture, or re-grade the row PAINT-LOGGED.`);
  }
}

// PARITY-B — roster PASS ⇒ every wave painting it is cursor DONE (no roster-ahead-of-cursor).
for (const [s, v] of roster) {
  if (v !== "PASS") continue;
  for (const w of paintWaves) {
    if ((map.get(w.wave) ?? []).includes(s) && w.status !== "DONE")
      violations.push(`[PARITY-B] roster surface "${s}" is PASS but wave ${w.wave} (row ${w.row}) painting it is ${w.status} — a roster flip without the cursor flip (the inverse divergence).`);
  }
}

// + selfTest() bites: a synthetic DONE-wave×FAIL-surface MUST flag PARITY-A; a PAINT-LOGGED
//   row × FAIL surface must NOT flag; a PASS-surface × non-DONE wave MUST flag PARITY-B; an
//   unmapped [P] wave MUST flag PARITY-C. (The RED-witness inverse, the proof:ba-gestalt pattern.)
```

### 7.3 · The `bg-paint.wf.js` Verify-phase prompt addition (the §4 wire)

Append to the Verify-phase agent prompt, after the "On PASS: flip the wave's cursor row … from PAINT-PENDING -> DONE" instruction:

```
ON PASS, BEFORE the cursor flip, execute the real-paint-protocol §4 reconciliation for EVERY
roster surface S the wave paints (read docs/tranches/BG/audit/reflect/wave-surface-map.md for
the wave -> surfaces join). For each S:
  (1) cp the fresh Chrome desktop captures to reflect/<S>-light-desktop-full.png +
      reflect/<S>-dark-desktop-full.png (the Safari leg to reflect/<S>-safari-*-desktop-full.png);
  (2) run `node scripts/proof-ba-gestalt.mjs` and CONFIRM surface S's pixelStats fall in its
      expect band on the fresh capture (the gate derives the verdict; you confirm it would pass);
  (3) run `node scripts/reflect-stamp.mjs <S>` to re-stamp reflect/<S>.md surface-hash;
  (4) edit reflect/bg-gestalt-roster.md: surface S's verdict cell FAIL -> PASS.
THEN flip the cursor row -> DONE (or -> PAINT-LOGGED if this is a mid-tranche signal pass deferring
the binding roster flip to the WS12 sweep — see real-paint-protocol §4 per-band cadence). Commit
{roster cell, <S>.md header(s), reflect/ PNGs, DELTA, cursor} in ONE commit. If proof:ba-gestalt
surface S does NOT pass the band on your fresh capture, DO NOT flip the verdict — leave it FAIL,
record the band-fail in the DELTA, leave the cursor PAINT-PENDING (a build-fix-agent owns it).
```

---

## 8. CONVERGENCE NOTE

This pass CLOSES the G1 dimension question (no strict assert trips; the asymmetry is structurally tolerated — verified on disk) and CONVERGES the wiring (wave→surface map + the §4 step in the workflow + the born-RED biconditional parity gate) and the cost (Model-B late binding sweep ≈ 64 PNGs / 16 capture events / ~2h judge wall-clock, vs the Model-A ~320-PNG treadmill the naive per-band re-capture incurs). The residual OQs (surface-paths breadth, Safari pixel column, status churn, the 6 already-DONE rows) are bounded 1-line-each decisions for the implementer, not open design. **readyToImplement: TRUE** for the wiring; the cost is a schedule choice, not an unknown.
