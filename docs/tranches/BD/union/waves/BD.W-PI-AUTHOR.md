# BD.W-PI-AUTHOR — author the BD-union-specific binding-π specs, WIDEN the compositor scan to `demo/`, de-fang the source-only `release` gates

**Band 0 (TRUTH FOUNDATION) · depends: W-GESTALT-WIRE (T0 — the roster the π captures feed is authored first)** — the close-oracle co-owner: `W-GESTALT-WIRE` re-points the gestalt ORACLE + authors the surface roster; `W-PI-AUTHOR` authors the binding π that FEEDS it, closes the demo-shell CLS blind spot, and bars the source-only `release` gates that ship unverified pixels (`EXECUTION-DAG.md:13`, `UNIFIED-ROSTER.md:22`).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build authors `tests-visual/*.spec.ts` (the BD-union-specific specs) + the `pi-runner-manifest.mjs` enrollment + edits `scripts/proof-no-layout-animation.mjs` (the `demo/` scan widen) + re-tags the source-only `release` gates, and is user-gated. The spec is in scope now.

## The defect / the ask (Pass-D code-grounded — `PASSD-FOLD §Batch-4 [#3 MINOR]`, `passd-remaining.md H4/64`)

PASSD-FOLD's Batch-4 carries an explicit CORRECTION of an over-read: **"`W-PI-AUTHOR`'s 'absent binding-π layer' is OVERSTATED (155 specs + `pi-runner-manifest` exist) — the REAL π gap is `proof:no-layout-animation` scanning only `src/` not `demo/` (the demo-shell CLS blind spot)."** I confirmed both halves at HEAD:

1. **The π LAYER exists — the "absent layer" framing is wrong.** `tests-visual/` carries **155** non-private `*.spec.ts` + `pi-runner-manifest.mjs` (the enrollment-soundness gate + the EXCLUDE allowlist). `proof:visual-runner` asserts every committed spec is enrolled-or-excluded; `gates:pi` runs the enrolled set over both Playwright projects against `:5199`. The π infrastructure is real and load-bearing. So this wave is NOT "build the absent π layer" — it is **author the BD-union-SPECIFIC specs** (the surfaces the union paints that have no spec yet) + close the two REAL gaps.
2. **The REAL gap #1 — `proof:no-layout-animation` is `src/`-ONLY (the demo-shell CLS blind spot).** Traced: `scripts/proof-no-layout-animation.mjs:285-286` walks `resolve(ROOT, "src/styles")` (`.css`) + `resolve(ROOT, "src/components")` (`.vue`, `.css`) ONLY. `grep -c "demo/"` over the file = **0**. So a `demo/` SFC with a layout-property `@keyframes`/`transition` (a per-frame reflow storm → CLS) ESCAPES the gate. The demo SHELL is exactly where the BD union's CLS shows (the `.scroll-build` mount-entrance CLS is "a separately-attributed W-SCROLL-MOTION concern" per CLAUDE.md — but nothing GATES the demo shell's compositor-safety). The fix: WIDEN the corpus to `demo/`.
3. **The REAL gap #2 — the source-only `release` gates ship UNVERIFIED pixels.** Several dock/paint gates are `release`-tagged but their `release` arm is a device-free SOURCE regex, with the binding PAINT deferred to "the orchestrator's DELTA" (a temporally-disjoint capture that can ship after the tag). `proof:dock-stack-rail` (`:18-20,:395`) is verbatim: the gate's `release` arm is the "device-free SOURCE arm"; "the LIVE fan-out PAINT … are the ORCHESTRATOR's W-DOCK-STACK-RAIL-DELTA" — i.e. the `release` tag greens on SOURCE while the pixels are verified elsewhere, later. That is the temporally-disjoint-deferral the gestalt gate was built to kill, surviving on the `release` axis. Same shape on `proof:dock-morph-insitu`, `proof:dock-shrink-blur`, `proof:dock-vertical-clickable`, `proof:control-smooth` (all `["local","ci","release"]`, source-only `release` arm). The fix: a source-only gate must NOT carry `release` — either it gets a BINDING π capture (the pixel arm runs IN the gate, the BC.W-GESTALT-FIRST precedent) OR it is DEMOTED off `release` (a SOURCE arm cannot block a release while claiming a paint truth).

**SCOPE PARTITION (no double-coverage with `W-GATE-TRUTH-AUDIT`).** `W-GATE-TRUTH-AUDIT` owns the NUMERIC-oracle false-greens (the kuwahara splice-blind regex, the concentric/fourier name-presence round-trips, the gpu-parity authored-`{0,0}`s, the `proof:dock-context` dead-code release regex). `W-PI-AUTHOR` owns the PAINT-π axis: authoring the BD-union-specific binding-π specs, the `demo/` compositor-scan widen, and the source-only-`release`-gate demote/back. The two are disjoint — `proof:dock-context` (dead code) is GATE-TRUTH's; `proof:dock-stack-rail` (live paint, unverified-on-release) is PI-AUTHOR's.

The ask is `EXECUTION-DAG.md:13`: **author the binding-π layer (the BD-union-specific specs) + widen the compositor scan to `demo/` + de-fang the source-only `release` gates.**

## The mechanism

The BD-union-specific π specs (authored + enrolled) + the `demo/` compositor-scan widen + the source-only-`release`-gate de-fang.

### 1. Author the BD-union-specific binding-π specs

The union paints surfaces with NO spec on disk (confirmed: `tests-visual/` has no `dock-constellation`/`silhouette`/`nowplaying`/`maps-card`/`vh-compose`/`element-bloom` spec). Author the binding π for each BD-union painting surface, each enrolled in `pi-runner-manifest.mjs` (or the EXCLUDE allowlist with a one-line rationale — the `proof:visual-runner` enrollment-soundness floor), each reading the `bd-gestalt-roster.md` probe/expect band (the `W-GESTALT-WIRE` roster):

- `tests-visual/dock-constellation.spec.ts` — the three-distinct-glass-bodies + recessed-home depth + deep-vs-floating step + translucent-over-aurora (the `dock-hallmark-constellation` row, both modes).
- `tests-visual/vh-compose.spec.ts` — the continuous teardrop frame-series + grab-pull (owned by `W-VH-COMPOSE`; enrolled here in the union layer).
- `tests-visual/element-bloom.spec.ts` — the 4 bloom surfaces read frame-identical to HEAD (the `W-FLIP-SPINE` non-regression; enrolled here).
- `tests-visual/dock-nowplaying.spec.ts` — the album-reactive pill plate drinks the album hue (the `W-DOCK-NOWPLAYING-PILL` row).
- `tests-visual/maps-card.spec.ts` — the Maps Places liquid card (the `W-MAPS-CARD` row).
- `tests-visual/dock-silhouette.spec.ts` — the bar/pill/split/search morph reads as a living transition (the `W-SILHOUETTE-REALIZE` row).

Each spec runs over BOTH Playwright projects (`chromium-headless-new` desktop + `coarse-touch` mobile) against `:5199`, served-app-sentinel fail-closed, LOCAL-ONLY (a real GPU + the live demo), rides W-REFLECT3 (the binding paint flips the gestalt verdict). The painting wave OWNS each spec; `W-PI-AUTHOR` is the ENROLLMENT + the union-completeness assert (every union painting surface has a spec or an excluded rationale).

### 2. Widen `proof:no-layout-animation` to `demo/`

`scripts/proof-no-layout-animation.mjs:285-286` gains the `demo/` corpus:

```js
// HEAD: src/ only
...walk(resolve(ROOT, "src/styles"), [".css"]),
...walk(resolve(ROOT, "src/components"), [".vue", ".css"]),
// ADD: the demo shell (the CLS blind spot)
...walk(resolve(ROOT, "demo"), [".vue", ".css"]),
```

The same reflow-set scan (the layout-property `@keyframes`/`transition`/`<Transition>` corpus + the narrow named-allowlist for genuine discrete reclaim) now reaches `demo/` SFCs + CSS. The demo shell's `.scroll-build` mount-entrance (the W-SCROLL-MOTION concern) + any demo-local layout animation is now GATED — a demo `@keyframes` animating `width`/`padding`/`grid-template-*` REDs (the per-frame reflow storm the gate kills, now reaching the demo shell). The narrow allowlist gains the GENUINE demo-discrete-reclaim entries (if any — audited, rationale-bearing, the same `RATCHET`-discipline). The W4 inventory-complete assert extends: a SECOND demo layout-animation off the allowlist REDs.

### 3. De-fang the source-only `release` gates

The `release`-tagged source-only paint gates (`proof:dock-stack-rail`, `proof:dock-morph-insitu`, `proof:dock-shrink-blur`, `proof:dock-vertical-clickable`, `proof:control-smooth`) are de-fanged so a `release` tag never greens an unverified-pixel claim. Per gate, ONE of two paths (the BC.W-GESTALT-FIRST mechanism):

- **The BINDING π is folded INTO the gate's `release` arm** — the gate gains a pixel-readback arm (reading the `bd-gestalt-roster.md` probe band via the shared `reflect-capture-verify.mjs` leaf) that runs on `--run ci`/`release`, so the `release` tag greens on the PAINT, not the source regex. The "orchestrator's DELTA" deferral evaporates (the pixel arm is IN the gate). This is the preferred path for the dock-paint gates (the `dock-hallmark` surfaces own a roster row).
- **OR the gate is DEMOTED off `release`** — if a gate's claim is genuinely source-structural (not a paint truth), it re-tags `["local","ci"]` (the SOURCE arm cannot block a release while CLAIMING a paint truth). The `proof:ba-gestalt` re-pointed oracle (`W-GESTALT-WIRE`) is the ONE `release`-tagged paint oracle; the per-mechanism source gates do not duplicate the `release` paint claim.

The choice per gate is recorded as a gate fact (`facts.releaseArm: "pi-bound" | "demoted"`); the source-only-`release`-paint-claim is BARRED either way.

## The gate — `proof:pi-author` (born-RED → GREEN; the union-π-completeness + the demo-scan + the no-source-only-release-paint assert)

`scripts/proof-pi-author.mjs`, `tags: ["local","ci"]`, comment-stripped detector exported for the bites.

- **P1 — every BD-union painting surface has a binding π spec (the union-completeness assert).** The detector reads `bd-gestalt-roster.md` (the `W-GESTALT-WIRE` roster), enumerates the painting surfaces, and asserts each resolves to a `tests-visual/*.spec.ts` enrolled in `pi-runner-manifest.mjs` (or the EXCLUDE allowlist with a rationale). A union surface with no spec REDs (the BD-specific-π gap — the corrected scope). **Born-RED at HEAD** (the union-specific specs are absent).
- **P2 — `proof:no-layout-animation` scans `demo/` (the CLS blind spot closed).** The detector asserts `proof-no-layout-animation.mjs` walks `resolve(ROOT, "demo")` (the corpus includes the demo shell) AND a synthetic demo SFC with a layout-property `@keyframes` (a planted `animation: grow; @keyframes grow { from { width: 0 } }`) REDs the no-layout gate when run. A `proof-no-layout-animation.mjs` that still scans `src/` ONLY REDs P2. **Born-RED at HEAD** (`:285-286` is `src/`-only, `grep -c demo/` = 0).
- **P3 — no source-only gate carries `release` while claiming a paint truth.** The detector enumerates the `release`-tagged gates, and for each whose docstring/clauses claim a PAINT truth (a fan-out PAINT / a composited-fill / a silhouette read), asserts EITHER it carries a pixel-readback arm (a `reflect-capture-verify`/`pngRegion`/`getImageData` call reading a roster band) OR it is NOT `release`-tagged. A `release`-tagged gate claiming a paint truth with a device-free SOURCE-only `release` arm REDs (the temporally-disjoint-deferral on the release axis, barred). `facts.releaseArm` per gate records the path (pi-bound/demoted). **Born-RED at HEAD** (the 5 gates carry `release` + source-only arms).
- **P4 — the π specs read the roster band, not a hand-typed assert.** The detector asserts each authored BD-union spec reads its surface's `expect` band from `bd-gestalt-roster.md` (the operative pixel verdict — not a bare `expect(visible).toBe(true)`). A spec that greens on element-presence alone (no pixel band) REDs (the paint-blind-spec class).

**Self-test bites (each planted defect MUST red — sized to clear its own clause):**
- (a) a roster surface with no enrolled spec → P1 RED (the union-π-gap bite).
- (b) a `proof-no-layout-animation.mjs` reverted to `src/`-only → P2 RED (the demo-blind-spot bite).
- (b2) a comment-string `// scan demo/ here someday` with no live `walk(resolve(ROOT, "demo"))` → P2 must NOT green (the comment-aware no-fig-leaf bite).
- (c) a `release`-tagged paint gate with a source-only `release` arm + no pixel readback → P3 RED (the unverified-release-pixel bite).
- (d) a BD-union spec that greens on `toBeVisible()` with no roster-band read → P4 RED (the paint-blind-spec bite).

**What reds on the pre-fix tree (born-RED by construction):** P1 (the union-specific specs are absent), P2 (`no-layout-animation` is `src/`-only), P3 (the 5 source-only `release` gates ship unverified pixels). GREEN only after the specs are authored + enrolled, the `demo/` scan widens, and the `release` gates are de-fanged.

## The binding π — NONE owed of its own (the wave IS the π enrollment owner)

`W-PI-AUTHOR` is the π LAYER owner: it authors + enrolls the union-specific specs (whose surfaces are painted by their OWN waves), widens the compositor scan, and de-fangs the release gates. It paints NO new surface of its own — so it carries **NO `proof:ba-gestalt` verdict of its own** (BB inv-4). Its deliverable is the π INFRASTRUCTURE the OTHER waves' surfaces ride; the union spec set IS the binding-π layer the gestalt roster reads.

## Fences

- **The π layer EXISTS — the scope is the BD-union-SPECIFIC specs, not a from-scratch build.** 155 specs + `pi-runner-manifest` are real (the PASSD over-read corrected). The authoring is the union-NEW surfaces (constellation/silhouette/nowplaying/maps/vh/bloom); the enrollment + completeness assert is the wave's deliverable (P1).
- **The `demo/`-scan widen closes the demo-shell CLS blind spot.** `proof:no-layout-animation` is `src/`-only at HEAD (`:285-286`, `grep -c demo/` = 0); the widen reaches the demo shell where the BD union's CLS shows (P2). The narrow named-allowlist discipline extends to genuine demo-discrete-reclaim entries only.
- **No source-only gate carries `release` while claiming a paint truth (the temporally-disjoint-deferral barred on the release axis).** A `release`-tagged paint gate either folds its pixel arm IN (the BC.W-GESTALT-FIRST mechanism) or demotes off `release` (P3). The `proof:ba-gestalt` re-pointed oracle is the ONE `release` paint oracle.
- **SCOPE PARTITION with `W-GATE-TRUTH-AUDIT` (no double-coverage).** GATE-TRUTH owns the NUMERIC-oracle false-greens (kuwahara/concentric/fourier/gpu-parity + the `proof:dock-context` DEAD-CODE release regex). PI-AUTHOR owns the PAINT-π axis (the union specs + the `demo/` scan + the source-only-`release`-PAINT gates over LIVE surfaces). `proof:dock-context` (dead) is GATE-TRUTH's; `proof:dock-stack-rail` (live, unverified-on-release) is PI-AUTHOR's.
- **The π specs read the roster band, never a hand-typed assert.** Each spec reads its surface's `expect` band from `bd-gestalt-roster.md` (P4 — the operative pixel verdict; a `toBeVisible()` spec is paint-blind, the close-class lie).

## Disposition links

- **`PASSD-FOLD §Batch-4 [#3 MINOR]` + `passd-remaining.md:64`** ("`W-PI-AUTHOR`'s 'absent binding-π layer' is OVERSTATED; the demo-scan gap is REAL — `proof:no-layout-animation` scans `src/` not `demo/`") → BUILT (the corrected scope: the union-specific specs + the `demo/` widen + the release de-fang; P1-P3). CLOSED at the spec level (the build user-gated).
- **`EXECUTION-DAG.md:13`** ("author the binding-π layer + widen the compositor scan to demo/ + de-fang the source-only release gates") → BUILT (§1 the specs + §2 the demo widen + §3 the release de-fang). CLOSED.
- **depends: `W-GESTALT-WIRE` (T0)** — the union roster the π captures feed is authored first; the specs read its probe/expect bands. Backward.
- **DISJOINT FROM `W-GATE-TRUTH-AUDIT`** — GATE-TRUTH owns the numeric-oracle gates + `proof:dock-context` (dead code); PI-AUTHOR owns the paint-π axis + the source-only-`release`-PAINT gates (live surfaces). No clause overlaps. Lateral.
- **PREREQUISITE FOR** EVERY BD painting wave (the close-oracle co-owner — each painting wave's per-wave verdict needs its π spec enrolled + the `demo/` scan covering its demo surface; `EXECUTION-DAG.md:15`). Forward.
