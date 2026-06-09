# AX Inventory — C-publishers (the constellation publisher deps: keyframes.js + value.js)

**Lane:** audit glass-ui's two upstream PUBLISHER deps — `@mkbabb/keyframes.js` (the spring/keyframe
runtime) + `@mkbabb/value.js` (color/value normalization) — at the SOURCE/doc level. Their tranche
state, their publish-CI state, the W35 keyframes-prune consumer-migration, the W41 publisher supplier-edge,
and what glass-ui's W34/W35/W41 actually NEED from them.

**Inventory bases (read-only, no edits):**
- glass-ui: `at-dock-convergence` HEAD (`3.8.0` published; HEAD past the dispatch `c72d2ac`).
- keyframes.js: `tranche-i-dev @ 107236d`, **version 4.1.0** (npm-latest = 4.1.0).
- value.js: `tranche-f-handoff @ fbea3e2`, **version 0.11.1** (npm-latest = 0.11.1).

**Headline finding.** The publisher supplier-edge is in MUCH better shape than the AX charter (written
against `eaba94f`/3.6.0) assumed — **several W41 + W35 cross-repo debts have already CLOSED at the
publisher source level** since the charter was authored. Both publishers publish GREEN via CI on a `v*`
tag (provenance, OIDC). The keyframes-4 `file:`-link npm-ci breaker is GONE, the E2 value-0.11 cap is
RESOLVED (keyframes 4.1.0 bumped its value dep to `^0.11.1`), and `getTimingFunction` is back in the
keyframes export surface. What REMAINS for W41 is glass-ui-INTERNAL (the `build:watch` dts arm, the
peer-devdep parity gate, the untagged `proof:peer-conformance` orphan, plus a stale 4.0.0 pin INSIDE that
gate). W35's blocker is glass-ui-side (the W19/W20 prune has not actually excised header-ribbon/glass-panel)
— the keyframes consumers (EditorShell/EasingCurveCanvas) still import them and are the live RED witnesses.

---

## §A — keyframes.js (the spring/keyframe runtime) — DEEP STATE

### Version + branch + publish CI

- **Published 4.1.0** (npm-latest), local `tranche-i-dev @ 107236d` ALSO at 4.1.0 (one commit past
  the I.W0 ship `107236d feat(tranche-I W0): kill the empty-input parse crash …`).
- **release.yml is GREEN + provenance.** `.github/workflows/release.yml` runs on `v*.*.*` tags:
  `npm ci → check:lib → build:lib → test → proof:boundary → npm publish --provenance --access public`
  (OIDC `id-token: write`, `NPM_TOKEN` secret). `cancel-in-progress: false` (no half-publish). **The MEMORY
  claim "keyframes CI publish-local" is STALE** — keyframes publishes via CI on a tag, same model as glass-ui
  (per the 2026-06-07 memory UPDATE; corroborated here: 4.0.0 then 4.1.0 both on npm with the provenance path).
- The release leg is **glass-ui-free by design**: `@mkbabb/glass-ui` is a PUBLISHED-registry
  `optionalDependency` used ONLY by the demo; the library publish (`build:lib`) never reaches the demo seam.
  So keyframes' publish does NOT race glass-ui's dist.

### keyframes glass-ui pin — RECONCILES the W35 wave-doc baseline

- keyframes pins `@mkbabb/glass-ui: ~3.5.1` as an **`optionalDependency`** (registry range — NOT a `file:`
  link). This RECONCILES the W35 wave-doc's stale `^3.4.0` baseline (the doc measured `eaba94f`): keyframes
  has since moved to `~3.5.1` per `from-keyframes-W8-specular-consume-edge.md`. The W35 RED-3 dock-spring
  consume-leg measured `+16.3%` overshoot against the `^3.4.0` `(0.5,0.5)` register; at `~3.5.1` that retune
  is published, so the dock-spring leg CLOSES on a bump (NOT a re-fix). **The W35 wave doc baseline and the
  `from-keyframes-W8` note disagree — the note is the more-recent live grounding; W34/W35 must use ~3.5.1.**
- The `proof:dock-morph-settled` gate is REGISTERED in keyframes (`package.json:88` + in `proof:all`).
  It parses the consumed glass-ui `--spring-dock: linear(…)` ramp peak, ceil = **+6%** overshoot, and the
  failure message names a **≥3.5.1** version floor. It is keyframes' born-RED token-peak gate the W35
  dock-spring leg greens on the AX pin bump (3.5.1 → 3.8.0). **Currently glass-ui is NOT resolvable from the
  keyframes tree** (`node_modules/@mkbabb/glass-ui` absent — optionalDep not installed in the worktree), so
  the gate skips-by-policy locally; it bites once the pin bumps + installs.

### W35 RED witnesses — STILL HOLD on the keyframes SOURCE

- **RED-1 (HeaderRibbon):** `demo/@/components/custom/editor-shell/EditorShell.vue:100` imports
  `{ HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon"`, mounts `<HeaderRibbon position="right">` as the
  top chrome bar (`:10`-`:44`), `useTemplateRef` on it (`:144`). **Live consumer of a W19-excised primitive.**
- **RED-2 (GlassPanel):** `demo/@/components/custom/EasingCurveCanvas.vue:107` imports
  `{ GlassPanel } from "@mkbabb/glass-ui/glass-panel"`, mounts `<GlassPanel>` (`:2`-`:102`). **Live consumer
  of a W20-retired primitive.** (`EasingSidebar.vue:28` has a comment noting GlassPanel's native-listener
  forwarding limitation — context, not a second mount.)
- `proof:off-headerribbon` / `proof:off-glasspanel` keyframes-side gates: **ABSENT** (the W35 born-RED
  cross-repo assertions not yet authored on either side).

### keyframes tranche-I state (its CURRENT dev tranche)

- **Tranche I — the gate-regime OVERHAUL / gate-blindspot closure tranche.** keyframes' ninth tranche, the
  EXACT parallel of glass-ui's AX π-lane: H shipped "ALL 97 `proof:*` gates GREEN" + a FINAL certifying four
  chronics closed — and **the live demo was DEEPLY broken** (the user drove it 2026-06-08, found 9 B1-B9
  breakages, 4 of them the EXACT chronics H certified). I's headline invariant (the gate-ORACLE precept, bound
  at t=0): a gate's oracle MUST be the running product through the same surface a human uses, error-budget 0;
  source-text/jsdom/snapshot/token-number gates are HYGIENE, not CORRECTNESS. This is keyframes' verbatim
  re-discovery of the AX cardinal lesson ("Runtime Truth Beats Source Claims") — W00 already adopts it.
- I is **TRANCHE-DEVELOPMENT** (the charter + audit docs; I.W0-I.WZ are IMPL gated on user authorization +
  keyframes' own green CI). I.W0 has already SHIPPED (`107236d` — empty-input parse crash + serialize +
  group transform; B1/B5). I touches `src/animation` (the kf PRODUCT, the singular inv-16 relaxation) and the
  demo — **NEVER patches glass-ui** (`feedback_glass_ui_root_changes`).
- **The keyframes↔glass-ui consume-edge is HANDOFF-tagged inside I (B7, inv-16).** I's B7 finding IS the
  glass-ui specular consume-edge already filed as `coordination/from-keyframes-W8-specular-consume-edge.md`:
  `<Card surface="glass">` emits `.glass-specular-track` unconditionally, `--mouse-x` never written → a static
  dead-centred warm-white bloom on stages + 9-11 dock tracks. The `specular="off"` default-off fix is tagged
  glass-ui **v3.8.0 LOCAL-only, UNPUBLISHED** at the time the note was written — so keyframes' B7 close is a
  TWO-SIDED consume-edge: (1) glass-ui publishes the specular fix (root-owned), (2) keyframes bumps the pin +
  rides the new default (zero kf CSS). keyframes KILLED its phantom-targeting `proof:specular-handoff` (it was
  born-RED against a non-existent release — the I repair of H's repair).

---

## §B — value.js (color/value normalization) — DEEP STATE

### Version + branch + publish CI

- **Published 0.11.1** (npm-latest), local `tranche-f-handoff @ fbea3e2` at 0.11.1.
  Recent: `fbea3e2 fix(parsing): parseCSSValueUnit empty-input contract`, `4c8c532 fix(pkg): drop the broken
  development export condition (0.11.1)`, `e8cc1fb chore(release): value.js 0.11.0 — the Tranche F hand-off`.
- **release.yml + ci.yml present** (`.github/workflows/`); value.js is the publish-SINK of the cohort
  (cohort-dep-free at the library level), so it publishes FIRST in any coordinated bump.
- **The `development` export condition is GONE** (W41-adjacent / contract-v2): `exports["."]` =
  `{types, import, default}` only — no `development` key (dropped in `4c8c532`). This is the precept-clean
  contract-v2 shape; matches the cross-repo-dev-resolution invariant-30 "registry consumers resolve dist."

### value.js build:watch — the W41 dts keystone applies HERE TOO

- `build:watch` = `vite build --mode production --watch` — **JS-only, no dts arm** (same shape as glass-ui's
  `build:watch`). `typecheck` is a separate `node scripts/check-types.mjs`. So value.js shares the W41
  stale-dts-on-watch class: a consumer dev-resolving value.js's `dist/*.d.ts` while value.js's watch runs gets
  STALE types. (value.js dist DOES carry `.d.ts` — `dist/{index,easing,math}.d.ts` present — but they refresh
  only on a full `build`, not on `build:watch`.) **W41 is the glass-ui-OWNED arm of this; value.js's own M.W1
  owns the value.js arm** (see below).

### The local forks W34/W35 name — ALL PRESENT, all in DEMO (not published)

value.js's `demo/` carries the local forks the §16.3 ledger routes as adoption legs (all demo-only;
value.js's PUBLISHED library imports no glass-ui — the only edge is `value.js(demo) → glass-ui(dist)`):
- **`demo/@/components/custom/dock/composables/useLayerTransition.ts`** — the FLIP-width fork (self-described
  "Local fork" per M.W3) → route to the W01/W02 `/dock`-barrel re-export.
- **`demo/@/components/custom/goo-blob/`** (GooBlob.vue + `composables/useMetaballRenderer.ts`) — the blob
  fork → `/goo-blob` (W08/W15/W16, ColorResolver seam). Also `panes/BlobPane.vue`, `visual/HeroBlob.vue`.
- **`demo/@/components/custom/watercolor-dot/`** + the `<SvgFilters>` global-singleton mount → `/watercolor-dot`.
- value.js's demo glass-ui dep is **`"@mkbabb/glass-ui": "file:../glass-ui"`** — a LOCAL file-link
  (demo-only, the demo bundler's resolution path; this is the C-DTS / stale-dist class the W41 dts-watch +
  value.js's M.W1 mechanism-C address).

### value.js tranche state — Tranche M MIRRORS W34/W35/W41 one-for-one

value.js's current planning tranche is **M — the frontend-consummation + precept-remediation + v1.0.0
tranche** (`docs/tranches/M/M.md`, opened 2026-06-04, PLANNING-ONLY at open; M.W1-W9 IMPL await user
ratification). M is the value.js-side EXECUTOR of the W34/W35 value.js adoption legs:
- **M.W1 (precept remediation + publisher compliance)** — delete the `development` key (DONE, `4c8c532`);
  retire the band-aids → mechanism-C (dist-resolution + `build:watch`); **populate
  `dev.sh SIBLING_WATCH_BUILDS=(../glass-ui)`** + **make `build:watch` dts-emit (§2.3 freshness parity)** —
  this is value.js's OWN arm of the W41 dts keystone. REPOINT (not delete) the demo self-alias to dist.
- **M.W3 (elegance transpositions)** — **adopt `useLayerTransition` off its self-described glass-ui "Local
  fork"** (the W34 value.js dock leg); collapse the CSS-color→RGB DOM-round-trip resolvers; the `parseCSSColor`
  typing root-fix that deletes the 9-site `cssToOklch` cast surface.
- **M.W5 (C2 aurora-derive)** — wire `deriveAurora` (producer shipped, consumer unwired — the oldest mandate).
- **M.W7 (C3 blob-extirpation + C1 dock)** — lift both blob dirs out of the demo onto glass-ui native;
  this is the value.js→glass-ui cohort ask: it gates on a **glass-ui 3.3.0+** cut carrying the blob primitives
  + the W-D dock fix + **dts-emitting `build:watch`**. M.md explicitly tracks the build:watch dts-emit as a
  "cohort ask" owned by glass-ui's arm (= W41).
- M's publish-spine: value.js publishes FIRST (the sink), then glass-ui bumps its value peer/devDep
  `^0.10.0 → ^0.11.0` + cuts against value `^0.11.0`, then value.js's demo consumes `^3.x` + cuts **v1.0.0**.

**The W34 value.js leg is NOT orphaned — it is value.js's own M.W1/M.W3/M.W5/M.W7. W34 records the leg;
the value.js M session executes it, gated on the AX glass-ui cut publishing.** M.md notes 3.2.0 shipped
ASYMMETRICALLY (aurora half landed, blob/dock did not), which is the exact W08/W15/W16 + W01-W06 work AX
now does — so M.W7 re-anchors on the AX cut.

---

## §C — W41 reconciliation (publisher-side supplier-edge): what's CLOSED, what HOLDS

W41's 4 sub-items, re-measured against the LIVE publisher source (NOT the `eaba94f` charter assumption):

| W41 item | Charter assumption | Live publisher truth (this audit) | Verdict |
|---|---|---|---|
| **1. `build:watch` dts-emit arm** | UNMET (JS-only) | glass-ui `build:watch = "vite build --watch"` — STILL JS-only; `emit-types` is a separate non-watched arm. value.js shares the class (its `build:watch` is JS-only too; its own M.W1 owns the value-side arm) | **HOLDS — glass-ui-internal, W41 owns it** |
| **2. devDep↔peer parity** | devDep floor lags peer range | CONFIRMED: glass-ui devDeps `keyframes ^2.2.0` / `value ^0.10.0`; peers `keyframes ^2.2.0\|\|^3.0.0\|\|^4.0.0` / `value ^0.10.0\|\|^0.11.0`. Builds/tests against the NARROWER floor. `proof:peer-devdep-parity` ABSENT | **HOLDS — glass-ui-internal** |
| **3a. keyframes-4 `file:`-link republish** | keyframes-4 tarball ships `file:../glass-ui` → breaks `npm ci` | **RESOLVED.** keyframes declares `@mkbabb/glass-ui: ~3.5.1` as an **optionalDependency** (registry range, NOT `file:`); 0 `file:../glass-ui` in keyframes; `files: ["dist"]` (glass-ui not in the tarball). 4.0.1 republish NO LONGER NEEDED | **CLOSED at publisher** |
| **3b. E2 value-0.11 cap knot** | keyframes-4 hard-deps value `^0.10.0` (<0.11), so a consumer wanting aurora `interpolateHue` (value-0.11-only) + keyframes-4 is non-resolvable | **RESOLVED.** keyframes-**4.0.0** hard-capped value `^0.10.0` (the E2 knot), but keyframes-**4.1.0** bumped its value dep to **`^0.11.1`** — a consumer holding glass-ui aurora + keyframes-4.1 resolves a single value 0.11.x. The cap is GONE at 4.1.0 | **CLOSED at publisher (4.1.0)** |
| **4. keyframes export-stability check** | a peer-range bump can drop a downstream API (the 3.6.0 `getTimingFunction` removal cascaded to bbnf-buddy) | `getTimingFunction` is BACK in keyframes src (`src/animation/utils.ts:148`, re-exported through engine.ts). The 4.x export surface restored it. The STABILITY CHECK gate is still un-authored (the FORWARD-protection mechanism) | **PARTIAL — the symptom moot at 4.x, the gate still owed** |

**The `proof:peer-conformance` orphan (W41 item 3, the gate side).** `scripts/proof-peer-conformance.mjs`
+ `package.json:552` EXIST but the script is **NOT registered in `scripts/gates.mjs`** with ci/release tags
(0 matches) — confirming W41 witness 3 (untagged orphan). It already encodes the E2 reasoning (pins
keyframes 4.0.0 + value 0.11.1, asserts the dual-instance intersection at 0.10.x dedups to one value
instance). **TWO staleness bugs INSIDE the gate W41 must fix:** (a) it pins keyframes **4.0.0** but
npm-latest is **4.1.0** (the "pinned audited latest" comment is stale by one minor); (b) its comment says
"the one non-green combo (keyframes 4 + value 0.11) is NON-RESOLVABLE" — TRUE for 4.0.0, FALSE for 4.1.0
(which deps value `^0.11.1`). The gate's audited-latest pins + its dual-instance prose are out of date with
the 4.1.0 publisher reality.

---

## §D — Status: DONE / PARTIAL / NOT-STARTED / AT-RISK (this lane)

- **DONE (at the publisher source, since the charter):**
  - keyframes-4 `file:`-link npm-ci breaker → optionalDep registry range (W41 3a closed).
  - E2 value-0.11 cap → keyframes 4.1.0 deps value `^0.11.1` (W41 3b closed).
  - `getTimingFunction` export restored in keyframes 4.x (W41 4 symptom moot).
  - value.js `development` export key deleted (`4c8c532`; contract-v2 clean).
  - Both publishers publish GREEN via CI on `v*` tag, provenance/OIDC (the MEMORY "publish-local" claim is
    stale for BOTH).
  - keyframes glass-ui pin advanced `^3.4.0 → ~3.5.1`; the dock-spring retune the W35 leg needs is published
    at 3.5.1 (the consume-leg is a bump, not a re-fix).

- **PARTIAL:**
  - W41 — `proof:peer-conformance` exists but is an untagged orphan with STALE 4.0.0 pins + stale
    dual-instance prose (must re-pin 4.1.0 + register ci/release).
  - W34 value.js leg — fully SPEC'd as value.js's own M.W1/M.W3/M.W5/M.W7, but M is planning-only (IMPL awaits
    ratification + the AX glass-ui cut publishing).
  - keyframes B7 specular consume-edge — the glass-ui-side fix (`specular="off"` default) is at HEAD but
    UNPUBLISHED; keyframes' B7 closes only on the AX publish + a kf pin bump.

- **NOT-STARTED (glass-ui-internal, W41-owned):**
  - `build:watch` dts arm (item 1), `proof:build-watch-dts`, `proof:peer-devdep-parity` (all ABSENT).
  - the keyframes export-stability check gate (item 4 forward-protection).

- **BLOCKED / AT-RISK (W35):**
  - The W19/W20 prune has NOT excised header-ribbon/glass-panel in glass-ui (per `W-close-crossrepo.md`
    finding — STILL in the tree + subpath-exported). keyframes' EditorShell/EasingCurveCanvas are the LIVE
    RED witnesses; the migration cannot be authored until glass-ui finalizes the excision AND keyframes
    migrates → local chrome / `<Card surface="glass">`. The DAG is real and hard-sequenced.

---

## §E — DEFERRED items that must FOLD INTO this tranche (this lane)

- **The `from-keyframes-W8-specular-consume-edge.md` + `from-speedtest-AV-routed-asks.md` inbound notes**
  must fold into W34's §16 receiver (the existing `CONSTELLATION.md` is the narrow W17 band-E artefact, NOT
  the §16 receiver — confirmed: it opens "AX.W17 → AX.W30/W31 (slides adoption)").
- **The keyframes B7 specular two-sided consume-edge** — record as a PUBLISH-HINGE leg in W34's receiver
  (glass-ui publishes `specular="off"` default at the AX cut; keyframes bumps + rides it).
- **The `proof:peer-conformance` 4.0.0→4.1.0 re-pin + ci/release registration** — fold into W41 (the gate
  is stale against the 4.1.0 publisher reality the AX cut now ships against).
- **value.js's M.W1 `build:watch` dts-emit cohort ask** — W41 is glass-ui's arm; record the value.js arm
  (M.W1) as the sibling-session executor in `CONSTELLATION.md` so the cross-repo dts-freshness keystone is
  met on BOTH publisher edges, not just glass-ui's.
- **value.js M's publish-spine ordering** (value first → glass-ui value-peer bump `^0.10.0→^0.11.0` → value
  demo consume → v1.0.0) — record in W34's receiver as the value.js leg's sequence; it gates on glass-ui's
  value peer/devDep bump (which W41's parity item should land at the AX cut).

---

## §F — GAPS / plan divergences (this lane)

1. **The W41 charter is STALE on 3 of its 4 supplier-edge items.** Items 3a/3b are CLOSED at the publisher
   source (file-link gone, E2 cap gone at 4.1.0); item 4's symptom is moot (getTimingFunction restored). W41's
   REMAINING real work shrank to: the dts-watch arm (item 1), the peer-devdep parity gate (item 2), the
   `proof:peer-conformance` re-pin+register, and the FORWARD export-stability gate (item 4's protection
   mechanism, distinct from the moot symptom). **W41 should be RE-SCOPED to the glass-ui-internal items + the
   gate re-pin, dropping the keyframes-4 republish handoff (already done).**

2. **The W35 dock-spring baseline is stale (`^3.4.0` vs the live `~3.5.1`).** The W35 wave doc measures
   `+16.3%` against `^3.4.0`; keyframes is actually on `~3.5.1` (retune published) per `from-keyframes-W8`.
   W34/W35 must use ~3.5.1 → the dock-spring leg is a clean 3.5.1→3.8.0 bump, and keyframes' own
   `proof:dock-morph-settled` (ceil +6%, floor ≥3.5.1) is the consumer gate.

3. **The value.js W34 leg has a HOME the charter under-credits.** value.js's tranche M (M.W1/M.W3/M.W5/M.W7)
   IS the executor of every value.js adoption leg the §16.3 ledger names (useLayerTransition fork, blob fork,
   watercolor fork, deriveAurora wire). W34 records the leg as if it were unrouted on the value.js side; in
   fact value.js has a fully-specced planning tranche awaiting the AX glass-ui cut. The coordination doc must
   point at M.W7's glass-ui-3.3.0+ cohort ask (now the AX cut) as the gating dependency.

4. **The MEMORY `project_publish_ci_broken` "keyframes publish-local" claim is STALE** (already flagged in its
   own 2026-06-07 UPDATE, re-confirmed here): keyframes' release.yml is a tag-gated provenance publish and 4.0.0
   + 4.1.0 both shipped via CI. Both publishers + glass-ui now publish via CI on a `v*` tag — one model.

5. **No publisher repo is BLOCKED on glass-ui's HEAD** (inv-16'-clean): keyframes consumes glass-ui PUBLISHED
   (~3.5.1 optionalDep); value.js's only glass-ui edge is the demo `file:../glass-ui` (unpublished, no cycle).
   Both have CLEAN-ish trees (keyframes: 3 demo edits + 2 untracked proof scripts; value.js: 3 doc deletes +
   demo/CLAUDE.md + `docs/precepts` dirty + 1 untracked `$OUT`). Capture these in the W34 sibling-baseline ritual.

---

## §G — The gestalt PATH FORWARD (planning, not code)

The publisher supplier-edge is HEALTHIER than the charter assumed — the path is RE-SCOPE + COORDINATE, not
heavy re-fix:

1. **W41 RE-SCOPE (glass-ui-internal, the real residue).** (a) Re-derive `build:watch` to co-run an
   `emit-types --watch` arm (`vue-tsc --project tsconfig.build.json --watch --emitDeclarationOnly` +
   flatten-subpath-types re-run on emit) — the contract-v2 dts-freshness keystone, the value.js C-DTS root
   cause. (b) Author `proof:build-watch-dts` + `proof:peer-devdep-parity`; bump devDeps to a representative
   point in the peer range (keyframes ^4.1.0, value ^0.11.1). (c) RE-PIN `proof:peer-conformance` to keyframes
   4.1.0 (fix the stale 4.0.0 pin + the now-false dual-instance "non-resolvable" prose), REGISTER it in
   gates.mjs with ci/release tags (W27a model). (d) Author the FORWARD keyframes export-stability check (flags
   when a glass-ui keyframes-peer-range bump drops a downstream-relied API). DROP the keyframes-4 republish
   handoff (closed) but keep the E2 reasoning as the gate's encoded invariant.

2. **W34 receiver (re-author CONSTELLATION.md).** Make the existing W17-band-E file a §-section; author the
   §16 per-consumer receiver: keyframes (pin ~3.5.1 → AX-bump leg; the B7 specular publish-hinge; the
   EditorShell/EasingCurveCanvas migration is W35), value.js (point at tranche M's M.W1/M.W3/M.W5/M.W7 as the
   leg executor, gated on the AX cut + the value peer bump). Capture both publishers' HEAD/branch/porcelain in
   the sibling-baseline ritual. Fold the 2 inbound notes.

3. **W35 DAG (the BLOCKER, glass-ui-side first).** glass-ui must ACTUALLY excise header-ribbon/glass-panel
   (currently incomplete per W-close-crossrepo) → THEN author the keyframes migration annex (EditorShell →
   local chrome bar; EasingCurveCanvas → `<Card surface="glass">`/`.glass-material`) + the born-RED
   `proof:off-headerribbon`/`proof:off-glasspanel` gates → keyframes session migrates + greens → glass-ui
   prunes + publishes. The dock-spring consume-leg is a bump-and-verify against keyframes' `proof:dock-morph-settled`.

4. **Publish-spine ordering (the cohort DAG).** value.js publishes FIRST (the sink) → glass-ui bumps value
   peer/devDep `^0.10.0→^0.11.0` + cuts the AX 3.8.0+ against value ^0.11.0 (with the W41 dts-watch arm) →
   keyframes bumps its glass-ui pin ~3.5.1→AX + rides `specular="off"` → value.js demo consumes the AX cut +
   cuts v1.0.0 (M.W7). Every consumer leg greens only on the published bump.

**Cardinal-lesson note (binds the publisher edges too).** keyframes' tranche I is the constellation's THIRD
independent re-discovery of "97 green gates certified a broken product" — the gate-ORACLE precept it binds at
t=0 is the same runtime-truth lane AX's W00 stands up. The W34/W35/W41 close must NOT re-launder a publisher
green claim: keyframes' B7 + value.js's M.W7 both close only on a LIVE consume against the PUBLISHED AX cut,
never a headless cross-repo grep over a local working tree.
