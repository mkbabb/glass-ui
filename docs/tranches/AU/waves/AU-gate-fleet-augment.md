# AU — the augmented gate fleet (W8/W8b/W9/W10), formed for execution

This is the **implementation-ready** spec for the AU gate fleet as re-scoped by `AU-AUGMENT.md`
(the dock-motion overhaul). It supersedes the gate-row sketches in `AU-AUGMENT.md §6.1` and the
`AU.W1c-color-gates.md §3` registry rows for the eight W8→W10 gates by making each one concrete:
the exact assertion, the born-RED bite-check, the script skeleton (the `cliPaths()` + `gate-output`
house idiom), the `scripts/gates.mjs` manifest entry, and the `.github/workflows/ci.yml`
registration. A coding agent executes from this file without re-deriving.

**Manifest is law (inv-θ).** `scripts/gates.mjs` is the single gate manifest; `proof:all` /
`release.sh` / `ci.yml` are filters over it, and `node scripts/gates.mjs --verify-ci` fails closed
if `ci.yml` drifts from the `ci`-tagged set. **Every new gate lands its manifest entry AND its
ci.yml step in the same commit**, or `proof:au-w1-design` (which enumerates the fleet) and
`--verify-ci` will red. House style: ESM `.mjs`, comment-strip first (false-witness discipline), a
PURE exported detector, a byte-stable JSON artefact via `scripts/gate-output.mjs`, a human summary,
`process.exit(1)` on any violation. Reference scripts: `scripts/proof-dock-opacity-lockstep.mjs`
(the gate being demoted), `scripts/proof-dock-motion-parity.mjs` (the CSS-grep + Vue-grep idiom),
`scripts/proof-dock-vocabulary.mjs` (already authored).

Precepts that govern every gate below: **no legacy** (no compat aliases in the fix or the gate),
**gestalt** (the dock fix is one timing ORIGIN, not a patch), **KISS** (a static one-token proof is
the timing instrument where a real-browser probe would flake), **value.js-free dock driver** (the
keyframes.js LIGHT surface only — `proof:vueuse-free-root`'s sibling discipline already guards it),
**isomorphic styling** (the cascade `tokens.css → theme.css → utilities.css → scoped`, enforced by
`proof:design-idiom-localization`).

---

## §0 — The fleet at a glance

| # | gate | wave | tags | kind | born | new/edit |
|---|---|---|---|---|---|---|
| 1 | `proof:dock-motion-single-source` | W8 | local,ci | static-CSS + .mjs | RED@HEAD | NEW |
| 2 | `proof:dock-opacity-lockstep` (DEMOTE) | W8 | local,ci,release | static-CSS .mjs | green (kept) | EDIT |
| 3 | `proof:dock-a11y-contract` | W8 | local,ci | vitest (mounted) | RED@HEAD | NEW |
| 4 | `proof:dock-vocabulary` | W8 | local,ci | static-MD .mjs | green | ADD-ENTRY |
| 5 | `proof:design-idiom-localization` | W8b | local,ci | grep .mjs | RED@HEAD | NEW |
| 6 | `proof:dock-css-split` | W8b | local,ci | static-CSS .mjs | RED@HEAD | NEW |
| 7 | `proof:au-w9-consumers` | W9 | local,ci | tally .mjs | RED@HEAD | NEW |
| 8 | `proof:au-final` | W10 | release | DEV-meta .mjs | DEV-meta | NEW |

**The greening edge (inv-27 — CI stays green per wave).** A gate's manifest entry + ci.yml step
land in the SAME commit as the born-green fix it guards, so CI never sees a RED gate. For the
RED@HEAD gates that means: land the fix (e.g. the single-frame sync, the reka-Tabs rail, the 12-site
Tailwind lift), THEN add the gate in that commit. The bite-checks below describe how to PROVE the
gate is real (re-inject the defect → RED) before committing; do not leave the re-injection in tree.

---

## §1 — `proof:dock-motion-single-source` (W8, NEW)

The PERCEPTUAL sibling of the string-match `proof:dock-opacity-lockstep`. The token-match gate
proves "both rules name the same easing"; it CANNOT see a frame-origin skew. This gate proves the
FLIP fallback STARTS opacity and width in the SAME animation frame — closing the async fork at
`useLayerTransition.ts:146-147` (sync ref-swap) vs `:167-169` (rAF width set).

### 1.1 The fix it guards (born-green-before-gate)

`src/components/custom/dock/composables/useLayerTransition.ts` — move the
`leavingLayer.value = oldLayer; currentLayer.value = newLayer;` ref mutations OUT of the synchronous
section (currently `:146-147`, before `nextTick`) and INTO the `requestAnimationFrame` callback
(currently `:167-169`), so class-apply (→ opacity) and `setDim(el, toSize)` (→ width) fire in one
frame. Refs still track state, deferred by one rAF (safe Vue reactivity, no public API change). This
is fix (A) of `AU-AUGMENT §2.2`. The `--spring-dock` token authoring (`AU-AUGMENT §2.3`) and the
optional keyframes.js `AnimationGroup` driver (fix B) land in the same W8 commit but are NOT what
THIS gate asserts.

### 1.2 The exact assertion

Because no headless-WebGL/real-CSS-transition harness runs reliably in CI (jsdom/happy-dom do not
run CSS transitions; a real-browser rAF probe of `getComputedStyle` is sub-frame flaky — the same
call `proof:dock-opacity-lockstep` and `proof:dock-motion-parity` made), this gate is a **STATIC
SOURCE proof over `useLayerTransition.ts`**, not a Playwright probe. `glass-ui` has NO playwright
dependency and one MUST NOT be added for a single gate (KISS + payload). The PERCEPTUAL settle-probe
the charter sketched (`container-width-stop frame == child-opacity≤0.01 frame within ±1 frame`) is
validated DOWNSTREAM by the slides deck's Playwright dock validation (F arm), which consumes the
published 3.3.0 dock — exactly as `proof:dock-opacity-lockstep` delegated its perceptual half.

The static gate asserts, by a comment-stripped scan of the FLIP fallback body in
`useLayerTransition.ts`:

1. **SAME-FRAME** — the `leavingLayer.value`/`currentLayer.value` assignments appear INSIDE the
   `requestAnimationFrame(...)` callback that also calls `setDim(el, ...toSize...)`, NOT in the
   synchronous body before `nextTick`. (Detector: locate the rAF callback's `{…}` body; assert both
   the ref-swap statements AND the `setDim` width-set are within it; assert NO ref-swap statement
   precedes the `nextTick(` call.)
2. **NO-SYNC-FORK** — between the `getSize`/`setDim` pin and the `nextTick(` call there is no
   `leavingLayer.value =` / `currentLayer.value =` assignment (the async fork's synchronous origin
   is gone).
3. **ONE-CLOCK** — the width set and the class-driving ref swap are not separated by a second
   `requestAnimationFrame` or `nextTick` (one rAF, one origin).

This is a SYNTACTIC structure proof, exact and flake-free, that the frame ORIGIN is unified —
isomorphic to how `proof:dock-opacity-lockstep` proves the token origin is unified.

### 1.3 Born-RED bite-check

Move the ref-swap back to the synchronous section (its HEAD position before the fix) → the SAME-FRAME
assertion sees the assignments outside the rAF body and NO-SYNC-FORK sees them before `nextTick` →
RED. Verify the gate reddens, then revert the re-injection (do not commit it).

### 1.4 Script skeleton — `scripts/proof-dock-motion-single-source.mjs`

```js
#!/usr/bin/env node
// AU.W8 — the dock single-frame-origin gate (proof:dock-motion-single-source).
//
// The PERCEPTUAL sibling of the string-match proof:dock-opacity-lockstep. That
// gate proves both rules name the same easing token; it cannot see a frame-origin
// skew. The FLIP fallback (useLayerTransition.ts) historically swapped the layer
// refs SYNCHRONOUSLY (→ Vue paints classes → opacity fires ~T3-5ms) but deferred
// the width set through nextTick THEN rAF (~T7-10ms) — opacity ran one frame ahead
// of the width morph (the user's "dock shrinks before elements fade" report).
//
// The W8 fix moves the ref swap INTO the rAF callback so class-apply and width-set
// share one frame ORIGIN. This static gate asserts that structure (exact, flake-free
// — a real-browser rAF settle probe is sub-frame flaky and adds a playwright dep;
// the perceptual half rides the slides deck's downstream Playwright dock validation).
//
// House style mirrors proof-dock-opacity-lockstep.mjs.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        LAYER_TS: resolve(ROOT, "src/components/custom/dock/composables/useLayerTransition.ts"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_MOTION_SINGLE_SOURCE_ARTIFACT",
            "AU-dock-motion-single-source",
        ),
    };
    return _cliPaths;
}

// Strip // line + /* block */ comments to blanks (preserve offsets/newlines) so a
// commented-out fork is never a false witness.
function stripComments(src) { /* same blank-range strip as proof-dock-opacity-lockstep.mjs */ }

// Find the `requestAnimationFrame(() => { … })` callback body that sets the width.
function rafWidthBody(src) {
    // locate `requestAnimationFrame(` whose body contains `setDim(`; return that {…} body
}

// The pure detector. Takes the comment-stripped source, returns {facts,violations}.
export function detectSingleSource(src) {
    const violations = [];
    const facts = {};

    const body = rafWidthBody(src);
    if (body === null) {
        violations.push("useLayerTransition.ts: the width-setting requestAnimationFrame callback is missing");
        return { facts, violations };
    }
    const refsInRaf =
        /leavingLayer\.value\s*=/.test(body) && /currentLayer\.value\s*=/.test(body);
    const setsWidthInRaf = /setDim\s*\(/.test(body);
    facts.refSwapInRaf = refsInRaf;
    facts.widthSetInRaf = setsWidthInRaf;
    if (!refsInRaf) violations.push("the layer ref swap (leavingLayer/currentLayer) is NOT inside the width rAF callback — the frame ORIGIN is forked");
    if (!setsWidthInRaf) violations.push("the width set (setDim) is NOT inside the rAF callback — cannot prove single-frame origin");

    // NO-SYNC-FORK: no ref-swap before the first nextTick( in the morph body.
    const beforeNextTick = src.slice(0, src.indexOf("nextTick("));
    if (/(leavingLayer|currentLayer)\.value\s*=/.test(beforeNextTick)) {
        violations.push("a synchronous leavingLayer/currentLayer assignment precedes nextTick — the async fork's sync origin survives");
    }

    facts.singleFrameOrigin = violations.length === 0;
    return { facts, violations };
}

export function detectSource(src) { return detectSingleSource(stripComments(src ?? "")); }

function run() {
    const { ROOT, LAYER_TS, ARTIFACT } = cliPaths();
    const { facts, violations } = detectSource(readFileSync(LAYER_TS, "utf8"));
    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-motion-single-source",
        facts,
        violations,
    });
    console.log("proof:dock-motion-single-source — the dock single-frame-origin gate (AU.W8)");
    console.log(`  ref swap inside width rAF : ${facts.refSwapInRaf ? "YES" : "NO"}`);
    console.log(`  width set inside rAF      : ${facts.widthSetInRaf ? "YES" : "NO"}`);
    console.log(`  single-frame origin       : ${facts.singleFrameOrigin ? "YES" : "NO"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
```

### 1.5 Registration

`package.json` scripts:
```json
"proof:dock-motion-single-source": "node scripts/proof-dock-motion-single-source.mjs"
```

`scripts/gates.mjs` manifest entry (insert immediately AFTER the `proof:dock-motion-parity` row at
`gates.mjs:43`):
```js
{ id: "proof:dock-motion-single-source", cmd: "proof:dock-motion-single-source", tags: ["local", "ci"], note: "AU.W8 — the dock FLIP single-frame-origin gate: the layer ref-swap (→opacity) and the width set (→morph) share ONE rAF origin; the perceptual sibling of the string-match proof:dock-opacity-lockstep" },
```

`.github/workflows/ci.yml` step (insert after the `proof:dock-opacity-lockstep` step, ~line 98):
```yaml
            # AU.W8 — the dock single-frame-origin gate. The PERCEPTUAL sibling of
            # the string-match proof:dock-opacity-lockstep: the FLIP fallback's layer
            # ref-swap (→ opacity) and the width set (→ morph) must share ONE rAF
            # frame origin (closing the useLayerTransition async fork). Static source
            # proof — the perceptual settle-probe rides the slides deck Playwright.
            - name: proof:dock-motion-single-source
              run: npm run proof:dock-motion-single-source
```

---

## §2 — `proof:dock-opacity-lockstep` DEMOTION (W8, EDIT)

The static token-match gate stays GREEN and KEPT (`scripts/proof-dock-opacity-lockstep.mjs`,
`gates.mjs:44`) — it is now the SYNTACTIC half. The demotion is a documentation edit only: no logic
change, the gate keeps its `local,ci,release` tags.

### 2.1 The edits

1. `scripts/gates.mjs:44` — update the `note` to mark it syntactic and point at the perceptual gate:
```js
{ id: "proof:dock-opacity-lockstep", cmd: "proof:dock-opacity-lockstep", tags: ["local", "ci", "release"], note: "AU.W2 (DEMOTED W8 → 'syntactic') — the SAME-TOKEN string-match that the dock fade opacity rides --dock-motion-resize (a 0-frame token settle). The PERCEPTUAL frame-origin sibling is proof:dock-motion-single-source (W8)." },
```
2. `scripts/proof-dock-opacity-lockstep.mjs` header (the comment block, ~lines 1-29) — append one
   line: `// DEMOTED at AU.W8 to the SYNTACTIC token-match; the frame-origin (perceptual) half is`
   `// proof:dock-motion-single-source.` No code change.
3. `.github/workflows/ci.yml` (the `proof:dock-opacity-lockstep` comment, ~lines 92-96) — append:
   `# DEMOTED W8 → syntactic; the frame-origin sibling is proof:dock-motion-single-source.`

### 2.2 Assertion / bite-check (UNCHANGED)

Keeps the AT existing assertion: `.dock-layer{,-item-host}` opacity rides `--dock-motion-resize`;
the active layer's `visibility 0s` stays immediate. Bite: revert opacity to `--dock-motion-fast` →
RED (the 100ms split). The demotion does not touch this.

---

## §3 — `proof:dock-a11y-contract` (W8, NEW)

The behavioural mounted-dock test for the reka-ui `Tabs` rail refactor (`AU-AUGMENT §2 item 4`).
The current rail is a hand-rolled `<button aria-pressed>` group (`DockLayerGroup.vue:101-119`,
defect confirmed at `:109` `:aria-pressed="activeLayer === layer.id"`). W8 refactors it to
`TabsRoot/TabsList/TabsTrigger(/TabsIndicator)` per APG-tabs.

### 3.1 The fix it guards (born-green-before-gate)

`src/components/custom/dock/DockLayerGroup.vue` — replace the `<nav>`+`<button aria-pressed>` rail
(`:101-119`) with reka-ui `<TabsList>`/`<TabsTrigger>` (reka emits `role=tablist`/`role=tab`/
`aria-selected`/roving tabindex/Arrow-Home-End). Wire `keepOpen()`/`release()` from `DockContext`
(`dockContext.ts:27-36`) on tab focus/blur so keyboard navigation does not trip idle-collapse. The
travelling indicator (`TabsIndicator` or an anchor-positioned pseudo) replaces the `.is-active`
per-button background and rides `--spring-dock`. Keyboard stays Left/Right (horizontal convention),
visual axis via CSS `flex-direction` — the cited design choice (`AU-AUGMENT` open Q; review
`dock-uiux-03`/`dock-a11y-08`).

### 3.2 The exact assertion (vitest, mounted, `@vue/test-utils`)

This is a vitest gate (like `proof:blob-color-equivalence`), NOT a `.mjs` script — it needs a real
component mount. New file `src/components/custom/dock/__tests__/GlassDock.a11y-contract.test.ts`.
Mount a `<GlassDock><DockLayerGroup>` with ≥2 `<DockLayer>`s. Assert, end-to-end:

1. **ROLES** — the rail container carries `role="tablist"`; each rail trigger carries `role="tab"`.
2. **SELECTED-NOT-PRESSED** — the active trigger has `aria-selected="true"`, inactive `="false"`;
   NO trigger carries `aria-pressed` (assert the attribute is absent across the rail).
3. **CONTROLS** — each tab's `aria-controls` resolves to the corresponding panel's `id`; the
   leaving/inactive panel carries `aria-hidden="true"` (review `dock-a11y-09`).
4. **ROVING-TABINDEX** — only the active tab has `tabindex="0"`; inactive tabs have `tabindex="-1"`.
5. **KEYBOARD** — dispatching `ArrowRight`/`ArrowLeft`/`Home`/`End` on the focused tab moves the
   roving focus + selection as APG specifies (next/prev/first/last).
6. **FOCUS-VISIBLE** — the rail trigger resolves the dock focus-ring contract (assert the
   `.dock-layer-tab`/TabsTrigger variant class is present so `dock.css:36-42` focus-ring applies;
   the structural class assertion, since jsdom paints no `:focus-visible`).
7. **KEEP-OPEN** — focusing a rail tab acquires a keep-open token (the dock does not collapse on its
   idle timer while a tab holds focus); blur releases it. Assert via the dock's exposed
   `dockHeld`/keep-open count (reachable through `defineExpose`), advancing fake timers
   (`vi.useFakeTimers()`) past the idle window and asserting `expanded` stays true while focused.

### 3.3 Born-RED bite-check

Restore `aria-pressed` (or delete the `aria-selected` binding / remove the roving-tabindex handler)
on a rail trigger → assertion 2 or 4 RED. Verify, then revert.

### 3.4 Script skeleton — `package.json` wires a vitest run

```json
"proof:dock-a11y-contract": "vitest run src/components/custom/dock/__tests__/GlassDock.a11y-contract.test.ts"
```

Test file skeleton (mirrors `GlassDock.motion-parity.test.ts`):
```ts
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import GlassDock from "../GlassDock.vue";
import DockLayerGroup from "../DockLayerGroup.vue";
import DockLayer from "../DockLayer.vue";

describe("AU.W8 — dock rail a11y contract (APG tabs)", () => {
    function mountRail() {
        return mount(GlassDock, {
            slots: { default: /* DockLayerGroup with two DockLayer panes */ },
            attachTo: document.body,
        });
    }
    it("rail is role=tablist with role=tab triggers", () => { /* ROLES */ });
    it("uses aria-selected, never aria-pressed", () => { /* SELECTED-NOT-PRESSED */ });
    it("tabs aria-controls resolve; inactive panel aria-hidden", () => { /* CONTROLS */ });
    it("roving tabindex: only active tab tabindex=0", () => { /* ROVING-TABINDEX */ });
    it("Arrow/Home/End move roving focus + selection", async () => { /* KEYBOARD */ });
    it("rail trigger carries the dock focus-ring class", () => { /* FOCUS-VISIBLE */ });
    it("tab focus holds the dock open (keepOpen/release)", async () => { /* KEEP-OPEN */ });
});
```

### 3.5 Registration

`scripts/gates.mjs` (insert after the `proof:dock-motion-single-source` row):
```js
{ id: "proof:dock-a11y-contract", cmd: "proof:dock-a11y-contract", tags: ["local", "ci"], note: "AU.W8 — the reka-Tabs dock rail APG contract: role=tablist/tab + aria-selected (NOT aria-pressed), aria-controls→panel, roving tabindex (Arrow/Home/End), focus-ring, keepOpen()/release() on tab focus" },
```
`.github/workflows/ci.yml` step (after the single-source step):
```yaml
            # AU.W8 — the reka-Tabs dock rail a11y contract. The mounted-dock vitest
            # asserts role=tablist/tab + aria-selected (NOT the hand-rolled
            # aria-pressed at DockLayerGroup.vue:109), aria-controls→panel binding,
            # roving tabindex (Arrow/Home/End), the focus-ring class, and that a
            # focused tab holds the dock open (keepOpen/release).
            - name: proof:dock-a11y-contract
              run: npm run proof:dock-a11y-contract
```

> Note: this gate runs ALSO under `npm run test` (vitest collects all `__tests__/*.test.ts`), so it
> is covered twice — once as the named `ci` step (Actions-UI visibility) and once in the test sweep.
> That is intentional and mirrors `proof:blob-color-equivalence`; `--verify-ci` requires the named
> step to exist regardless.

---

## §4 — `proof:dock-vocabulary` (W8, ADD-ENTRY)

The script is ALREADY authored and passing: `scripts/proof-dock-vocabulary.mjs` (+ the README at
`src/components/custom/dock/README.md`, both currently untracked). The ONLY registration step is the
manifest + ci.yml entry + the `package.json` script line. No script edit.

### 4.1 The assertion (as authored)

`src/components/custom/dock/README.md` enumerates the four role names (`ChromeDock`, `TransportDock`,
`CanvasDock`, `ToolDock`), the base primitives (`GlassDock`, `DockIconButton`), the canonical
composable names (`useDockState`, `useLayerTransition`, `useDockContext`), AND records the two
re-groundings (`useTouchGate` stays general; `DockTabButton` kept — it has consumers). Bite: delete a
role name from the README → RED (`proof-dock-vocabulary.mjs:55-60`).

> The W1c registry row (`AU.W1c-color-gates.md:76`) describes a STALER three-clause form
> (`useTouchGate→useDockTouchGate` rename + `DockTabButton` retire). The authored script
> RE-GROUNDED both against HEAD and REJECTED them (the rename would mis-name a general
> `composables/dom` primitive; the retire would drop a consumed component). The authored script is
> the source of truth; this spec binds to IT, not the staler registry prose.

### 4.2 Registration

`package.json`:
```json
"proof:dock-vocabulary": "node scripts/proof-dock-vocabulary.mjs"
```
`scripts/gates.mjs` (after the `proof:dock-a11y-contract` row):
```js
{ id: "proof:dock-vocabulary", cmd: "proof:dock-vocabulary", tags: ["local", "ci"], note: "AU.W8 — the <Role>Dock README is the SINGLE role-vocabulary source: the 4 role names + base primitives + canonical useDock* names + the two HEAD re-groundings (useTouchGate stays general; DockTabButton kept). Bite: delete a role → RED" },
```
`.github/workflows/ci.yml` step (after the a11y-contract step):
```yaml
            # AU.W8 — the dock role-vocabulary gate. Asserts the dock README is the
            # single source for the four <Role>Dock names + base primitives + the
            # canonical useDock* composable names, and records the two HEAD
            # re-groundings (useTouchGate stays general; DockTabButton kept). Bite:
            # delete a role from the README → RED.
            - name: proof:dock-vocabulary
              run: npm run proof:dock-vocabulary
```

> Land the README + the script as TRACKED files in the same W8 commit (they are untracked at HEAD).
> The orchestrator owns the index (the hardened agent git clause — agents never stage/commit).

---

## §5 — `proof:design-idiom-localization` (W8b, NEW)

Enforces the cascade discipline (`AU-AUGMENT §5.4`): scoped `<style>`/component class lists consume
`var(--…)` via `@theme`-generated utilities, never `text-[var(--…)]`/`shadow-[var(--…)]` arbitrary
wraps that bypass the Tailwind theme layer.

### 5.1 The fix it guards (born-green-before-gate)

The 12-site lift (`AU-AUGMENT §5.4`): `text-[var(--…)]` wraps → `@theme` utilities
(`CardDescription.vue:11`, `TabsTrigger.vue:22`); `shadow-[var(--shadow-card)]` → `shadow-card`
(`Card.vue:73`); fixed px (`ComboboxList.vue:24`) → sizing tokens; compound `transition-[…]`
(`CarouselDots.vue:62`, `AccordionContent.vue:18`) → `@utility`. No new tokens needed — the
`@theme` utilities already exist (e.g. `theme.css` already maps `--muted-foreground-strong`,
`--shadow-card`).

### 5.2 The exact assertion

Grep every `src/components/**/*.vue` (template class attributes + scoped `<style>` blocks) for the
two anti-pattern wraps and assert ZERO occurrences:

1. `text-[var(--…)]` arbitrary-value wraps — must be 0 (use the `text-<token>` utility).
2. `shadow-[var(--…)]` arbitrary-value wraps — must be 0 (use the `shadow-<token>` utility).

Scope is `src/components/**/*.vue`. **Allowlist** (to bound false-positives — the open Q4 in the
design-idiom review): a single inline `:style="{ '--x': … }"` runtime-theming binding is NOT a
`text-[var]`/`shadow-[var]` wrap and is not matched by the two regexes (they match the Tailwind
arbitrary-utility token form only). If a legitimate dynamic-binding site ever needs an exception, it
carries an inline `<!-- idiom-allow: reason -->` adjacent comment and the gate skips the next line;
seed the allowlist EMPTY (the 12 sites are all fixable, so a born-green sweep needs no exception).

### 5.3 Born-RED bite-check

Re-inject one `text-[var(--foreground)]` (or `shadow-[var(--shadow-card)]`) into any tracked SFC →
RED naming the file + line. Verify, then revert.

### 5.4 Script skeleton — `scripts/proof-design-idiom-localization.mjs`

```js
#!/usr/bin/env node
// AU.W8b — the design-idiom-localization gate (proof:design-idiom-localization).
//
// glass-ui's tokens.css → theme.css → utilities.css → scoped cascade is the GOLD
// STANDARD (slides-F adopts it byte-for-byte). The discipline leak this gate closes:
// `text-[var(--…)]` / `shadow-[var(--…)]` ARBITRARY wraps that bypass the @theme
// layer (a token reference smuggled into Tailwind arbitrary-value syntax instead of
// the @theme-generated `text-<token>` / `shadow-<token>` utility). The W8b fold lifts
// the 12 known sites (AU-AUGMENT §5.4); this gate keeps NEW ones from landing.
//
// House style mirrors proof-phantom-classes.mjs (a glob + grep over src SFCs).

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { globSync } from "node:fs"; // or fast-glob if already a dep; else a small recursive walk
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const WRAP_RES = [
    { name: "text-[var]", re: /\btext-\[var\(--[^)]+\)\]/g },
    { name: "shadow-[var]", re: /\bshadow-\[var\(--[^)]+\)\]/g },
];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SFC_GLOB: resolve(ROOT, "src/components"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DESIGN_IDIOM_LOCALIZATION_ARTIFACT",
            "AU-design-idiom-localization",
        ),
    };
    return _cliPaths;
}

// Recursively collect src/components/**/*.vue (a tiny readdir walk — no new dep).
function vueFiles(dir) { /* return absolute paths */ }

export function detectIdiom(files, readFile) {
    const violations = [];
    const facts = { scanned: files.length, hits: 0 };
    for (const f of files) {
        const text = readFile(f);
        for (const { name, re } of WRAP_RES) {
            for (const m of text.matchAll(re)) {
                // skip a line carrying `idiom-allow:` (the bounded escape hatch)
                violations.push(`${f}: ${name} arbitrary-value wrap \`${m[0]}\` — use the @theme utility (${name.replace("[var]", "<token>")})`);
                facts.hits++;
            }
        }
    }
    return { facts, violations };
}

function run() {
    const { ROOT, SFC_GLOB, ARTIFACT } = cliPaths();
    const files = vueFiles(SFC_GLOB);
    const { facts, violations } = detectIdiom(files, (f) => readFileSync(f, "utf8"));
    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, command: "npm run proof:design-idiom-localization", facts, violations });
    console.log("proof:design-idiom-localization — scoped styles consume @theme utilities, not text-[var]/shadow-[var] wraps (AU.W8b)");
    console.log(`  SFCs scanned : ${facts.scanned}`);
    console.log(`  wrap hits    : ${facts.hits}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
```

### 5.5 Registration

`package.json`:
```json
"proof:design-idiom-localization": "node scripts/proof-design-idiom-localization.mjs"
```
`scripts/gates.mjs` (group with the W8b gates, after the dock vocabulary row):
```js
{ id: "proof:design-idiom-localization", cmd: "proof:design-idiom-localization", tags: ["local", "ci"], note: "AU.W8b — scoped styles consume @theme-generated utilities, not text-[var(--…)]/shadow-[var(--…)] arbitrary wraps (the cascade discipline). Bite: re-inject one wrap → RED" },
```
`.github/workflows/ci.yml` step:
```yaml
            # AU.W8b — the design-idiom localization gate. Asserts no SFC smuggles a
            # token through a `text-[var(--…)]` / `shadow-[var(--…)]` arbitrary wrap
            # that bypasses the @theme layer (the cascade tokens.css → theme.css →
            # utilities.css → scoped is the gold standard). Bite: re-inject one → RED.
            - name: proof:design-idiom-localization
              run: npm run proof:design-idiom-localization
```

---

## §6 — `proof:dock-css-split` (W8b, NEW)

Guards the `dock.css` → `dock.css` + `dock-controls.css` monolith split (`AU-AUGMENT §5.4`). The
control family (`.dock-icon-button` at `dock.css:730`, `.dock-tab-button` at `dock.css:883`, the
select/dropdown triggers, the dark-mode-toggle) MOVES to `dock-controls.css`; `dock.css` keeps the
shell + density + layer-motion substrate.

### 6.1 The fix it guards (born-green-before-gate)

Create `src/styles/dock-controls.css`; move the control-family rules (`dock.css:730-1103` per
`AU-AUGMENT §5.4`) into it; keep the shared `:where()` four-state contract (`dock.css:36-50`) in
`dock.css` (the import root, so override hierarchy is preserved); add
`@import "./dock-controls.css";` to `src/styles/index.css` in cascade order immediately after the
`dock.css` rung. No selector or token change — a pure relocation.

### 6.2 The exact assertion

By a comment-stripped scan:
1. **MOVED** — NO `.dock-icon-button { … }` and NO `.dock-tab-button { … }` rule body survives in
   `src/styles/dock.css` (the control family left).
2. **LANDED** — both `.dock-icon-button` and `.dock-tab-button` rule bodies EXIST in
   `src/styles/dock-controls.css` (they arrived, not vanished).
3. **CONTRACT-ROOT** — the shared `:where(.dock-icon-button, .dock-tab-button, …)` four-state
   contract STAYS in `dock.css` (so the override cascade is unbroken — assert the `:where(` group
   with the focus-ring is still present in `dock.css`).
4. **IMPORTED** — `src/styles/index.css` `@import`s `dock-controls.css` (so `/styles` ships it).

### 6.3 Born-RED bite-check

Leave a `.dock-icon-button` rule in `dock.css` (don't fully move it) → MOVED RED. OR remove the
`@import "./dock-controls.css"` → IMPORTED RED. Verify, then revert.

### 6.4 Script skeleton — `scripts/proof-dock-css-split.mjs`

Same skeleton shape as `proof-dock-opacity-lockstep.mjs` (comment-strip + `matchRuleBody`):
```js
// cliPaths: DOCK_CSS, DOCK_CONTROLS_CSS, INDEX_CSS, ARTIFACT (cacheName "AU-dock-css-split")
export function detectSplit(dockCss, controlsCss, indexCss) {
    const violations = [];
    const facts = {};
    const inDock = (sel) => new RegExp(`${sel}\\s*\\{`).test(dockCss);
    const inControls = (sel) => new RegExp(`${sel}\\s*\\{`).test(controlsCss);
    facts.iconButtonInDock = inDock("\\.dock-icon-button");
    facts.tabButtonInDock = inDock("\\.dock-tab-button");
    if (facts.iconButtonInDock) violations.push("dock.css still defines .dock-icon-button — move it to dock-controls.css");
    if (facts.tabButtonInDock) violations.push("dock.css still defines .dock-tab-button — move it to dock-controls.css");
    if (!inControls("\\.dock-icon-button")) violations.push("dock-controls.css is missing .dock-icon-button (the control family did not land)");
    if (!inControls("\\.dock-tab-button")) violations.push("dock-controls.css is missing .dock-tab-button");
    if (!/:where\([^)]*\.dock-icon-button/.test(dockCss)) violations.push("the shared :where() four-state contract must STAY in dock.css (the import root)");
    if (!/@import\s+["']\.\/dock-controls\.css["']/.test(indexCss)) violations.push("src/styles/index.css does not @import ./dock-controls.css (the /styles bundle would not ship it)");
    return { facts, violations };
}
```
(`detectSource` comment-strips all three inputs; `run()` mirrors the lockstep gate.)

### 6.5 Registration

`package.json`:
```json
"proof:dock-css-split": "node scripts/proof-dock-css-split.mjs"
```
`scripts/gates.mjs` (after the design-idiom row):
```js
{ id: "proof:dock-css-split", cmd: "proof:dock-css-split", tags: ["local", "ci"], note: "AU.W8b — the dock.css monolith split: the control family (.dock-icon-button/.dock-tab-button/triggers) lives in dock-controls.css, the shared :where() four-state contract STAYS in dock.css (the import root), and index.css imports both. Bite: leave a control rule in dock.css → RED" },
```
`.github/workflows/ci.yml` step:
```yaml
            # AU.W8b — the dock.css split gate. Asserts the control family
            # (.dock-icon-button/.dock-tab-button/triggers) moved to dock-controls.css,
            # the shared :where() four-state contract STAYS in dock.css (override
            # root), and index.css @imports dock-controls.css. Bite: a surviving
            # control rule in dock.css → RED.
            - name: proof:dock-css-split
              run: npm run proof:dock-css-split
```

---

## §7 — `proof:au-w9-consumers` (W9, NEW)

The overfitting bar for the W9 lean-folds + slides-supply: each W9 item (prop / subpath /
composable) maps to ≥2 distinct consumer contexts OR carries a correctness/hygiene tag. Same
discipline as the overfitting-audit precept, machine-readable per wave.

### 7.1 The fix it guards (born-green-before-gate)

Land the W9 folds (`AU-AUGMENT §3` W9 row): the ConfiguratorLayer A-1 divider + A-2 label ladder;
`useGlobalDark({initialValue})` + `darkModeSyncScript()`; the Drawer `:native` FOLD; the
size-vocabulary FOLD; the publish-gated slides-supply (`showClose`, `/deck` lift, Card/Badge dark
arm, `useCountup`+`v-reveal`). Each item must name ≥2 real consumers OR a correctness tag.

### 7.2 The exact assertion

A small TALLY artefact (`docs/tranches/AU/audit/W9-consumers.json`, OR a literal in the script)
enumerates each W9 item with either `consumers: ["<ctx-a>", "<ctx-b>", …]` (≥2 distinct) OR
`tag: "correctness" | "hygiene"`. The gate asserts:
1. **TALLY-COVERS** — every W9 item declared in the W9 wave row has a tally entry (no silent item).
2. **BAR** — each entry has `consumers.length >= 2` XOR a `tag`. A 1-consumer entry with no tag →
   RED (the overfitting bar).
3. **RESOLVE** — each named consumer context resolves (the file/subpath/demo-story it cites exists
   at HEAD) — reuse the resolution idiom from `proof:doc-consistency` (cited paths resolve).

### 7.3 Born-RED bite-check

Add a W9 item to the tally with a single consumer and no tag (or drop a real consumer so a 2-list
becomes a 1-list) → BAR RED. Verify, then revert.

### 7.4 Script skeleton — `scripts/proof-au-w9-consumers.mjs`

```js
// cliPaths: TALLY (docs/tranches/AU/audit/W9-consumers.json), ROOT, ARTIFACT ("AU-w9-consumers")
export function detectConsumers(tally, resolves) {
    const violations = [];
    const facts = { items: tally.items.length };
    for (const it of tally.items) {
        const hasBar = Array.isArray(it.consumers) && it.consumers.length >= 2;
        const hasTag = it.tag === "correctness" || it.tag === "hygiene";
        if (!hasBar && !hasTag) violations.push(`W9 item '${it.id}' has <2 consumers and no correctness/hygiene tag (the overfitting bar)`);
        for (const c of it.consumers ?? []) if (!resolves(c)) violations.push(`W9 item '${it.id}' cites consumer '${c}' that does not resolve at HEAD`);
    }
    return { facts, violations };
}
```
(`resolves(c)` checks a file path / subpath export / demo-story exists, like `proof:doc-consistency`;
`run()` reads the tally JSON, mirrors the lockstep gate.)

### 7.5 Registration

`package.json`:
```json
"proof:au-w9-consumers": "node scripts/proof-au-w9-consumers.mjs"
```
`scripts/gates.mjs` (after the dock-css-split row):
```js
{ id: "proof:au-w9-consumers", cmd: "proof:au-w9-consumers", tags: ["local", "ci"], note: "AU.W9 — each W9 fold (prop/subpath/composable) names ≥2 distinct consumer contexts OR carries a correctness/hygiene tag (the overfitting bar), and every cited consumer resolves at HEAD. Bite: a 1-consumer untagged fold → RED" },
```
`.github/workflows/ci.yml` step:
```yaml
            # AU.W9 — the W9 overfitting bar. Asserts each W9 fold (prop/subpath/
            # composable) maps to ≥2 distinct consumer contexts OR carries a
            # correctness/hygiene tag, and every cited consumer resolves at HEAD.
            # Bite: a 1-consumer untagged fold → RED.
            - name: proof:au-w9-consumers
              run: npm run proof:au-w9-consumers
```

---

## §8 — `proof:au-final` (W10, NEW, release-only)

The close meta-gate. Release-tagged (NOT ci) — it runs in `release.sh` over the full matrix on a
clean tree at the tag boundary, the DEV-meta analogue of `proof:au-w0-reground`/`proof:au-w1-design`.

### 8.1 The exact assertion

1. **MATRIX-GREEN** — `node scripts/gates.mjs --verify-ci` passes (ci == manifest) AND the
   `release`-tagged set is enumerable (`gatesFor("release")` non-empty); the gate does NOT re-run
   the matrix (release.sh already does) — it asserts the manifest is coherent and `--verify-ci`
   green.
2. **CLEAN-TREE** — `git status --porcelain` is empty (no gate dirtied a tracked artefact — inv-θ
   guarantees byte-stable cache output, so a clean tree is the invariant).
3. **FINAL-EXISTS** — `docs/tranches/AU/AU.FINAL.md` exists and cites a green run id per wave
   (W0–W10) + the deferral register (`proof:webgl-golden` DEFERRED, `useCanvas2D` BOOK,
   `text-box-trim` BOOK — `AU-AUGMENT §3.1`).
4. **ZERO-ORPHANS** — the overfitting audit shows zero orphans (every `src/` artefact has ≥2 sites
   OR is exported OR is a demo-private helper — the standing precept; reuse/cite the audit output).
5. **STAGED-NOT-PUBLISHED** — the 3.3.0 changeset is STAGED, not auto-published (publish is
   USER-DOMAIN); assert the changeset file exists and `package.json` version is unbumped OR the
   changeset is unconsumed (no `npm publish` in the gate path).

### 8.2 Born / bite-check

DEV-meta (no born-RED@HEAD — it greens once W10's FINAL + changeset exist). Bite: drop a wave's run
id from `AU.FINAL.md`, or dirty the tree, or point the changeset at an auto-publish → RED.

### 8.3 Script skeleton — `scripts/proof-au-final.mjs`

```js
// cliPaths: ROOT, FINAL (docs/tranches/AU/AU.FINAL.md), ARTIFACT ("AU-final")
// imports gatesFor from ./gates.mjs to assert release-set coherence.
import { gatesFor } from "./gates.mjs";
export function detectFinal({ finalMd, gitPorcelain, changesetExists, releaseSet }) {
    const violations = [];
    const facts = {};
    if (!finalMd) violations.push("docs/tranches/AU/AU.FINAL.md is absent");
    else {
        for (const w of ["W0","W1","W2","W3","W4","W5","W6","W7","W8","W8b","W9","W10"])
            if (!new RegExp(`${w}\\b[\\s\\S]{0,200}(run|actions|green)`, "i").test(finalMd))
                violations.push(`AU.FINAL.md does not cite a green run id for ${w}`);
    }
    if (gitPorcelain.trim() !== "") violations.push("the working tree is dirty (a gate mutated a tracked artefact — inv-θ violated)");
    if (!releaseSet.length) violations.push("the release-tagged gate set is empty");
    if (!changesetExists) violations.push("the 3.3.0 changeset is not staged (publish is USER-DOMAIN; it must be staged, not auto-published)");
    return { facts, violations };
}
```
(`run()` reads `AU.FINAL.md`, shells `git status --porcelain` via `execSync`, checks the changeset
path, calls `gatesFor("release")`, runs `gates.mjs --verify-ci` via `execSync`, mirrors the meta-gate
shape of `proof-au-w0-reground.mjs`.)

### 8.4 Registration

`package.json`:
```json
"proof:au-final": "node scripts/proof-au-final.mjs"
```
`scripts/gates.mjs` (LAST AU row, before `proof:lockfile`/`audit:stash`):
```js
{ id: "proof:au-final", cmd: "proof:au-final", tags: ["release"], note: "AU.W10 — the close meta-gate (release-only): --verify-ci green; clean tree (inv-θ); AU.FINAL.md cites a green run id per wave + the deferral register; overfitting zero orphans; the 3.3.0 changeset STAGED not auto-published (publish USER-DOMAIN)" },
```
NOT in `ci.yml` (release-tagged only — `--verify-ci` does NOT require it in the ci step list).
`release.sh` picks it up via `gates.mjs --run release`.

---

## §9 — The four enumerated-but-absent gates (the W1c forward-reference gap)

`AU-AUGMENT §6.1` flags FOUR gates enumerated in the `AU.W1c` registry
(`AU.W1c-color-gates.md §3`) and the `AU` PROGRESS but ABSENT from `scripts/gates.mjs` at HEAD —
the forward-reference gap left when the W1c registry was authored before the W8+ scripts:

| gate | W1c row | this spec | wave it lands |
|---|---|---|---|
| `proof:dock-a11y-contract` | `W1c:75` | §3 | W8 |
| `proof:dock-vocabulary` | `W1c:76` (script EXISTS, untracked) | §4 | W8 |
| `proof:au-w9-consumers` | `W1c:77` | §7 | W9 |
| `proof:au-final` | `W1c:78` | §8 | W10 |

Plus `proof:dock-motion-single-source` (§1), `proof:design-idiom-localization` (§5), and
`proof:dock-css-split` (§6) are the AUGMENT-NEW gates beyond the original W1c registry — added by
`AU-AUGMENT §6.1`. The W1c registry must be RESYNCED at W8 to carry these three new rows so the
registry stays the registry-of-record (a `proof:au-w1-design` concern — it asserts the registry
enumerates every fleet gate). **`proof:webgl-golden`** stays KEEP-DEFERRED (documented in a
`proof-webgl-golden-DEFERRED.md`, cited in FINAL) — NOT added to the manifest (`AU-AUGMENT §3.1`).

---

## §10 — Sequencing

1. **W8 (one atomic motion+a11y+vocab commit, per `AU-AUGMENT §3` "W8 is ONE atomic pass"):**
   land fix (A) single-frame sync → author `--spring-dock` + route `--dock-resize-spring` → (opt.)
   keyframes.js `AnimationGroup` driver → reka-Tabs rail + travelling indicator + keepOpen/release →
   anchor-positioning for dock popovers. THEN in the same commit add gates §1 (single-source), §3
   (a11y-contract), §4 (vocabulary, track the README+script), and apply the §2 demotion edit. Run
   each bite-check BEFORE committing (re-inject → RED → revert). Resync the W1c registry with the
   three AUGMENT-new rows. Verify `node scripts/gates.mjs --verify-ci` green.
2. **W8b (modern-CSS + hygiene fold, lands just after W8, does NOT block the 3.3.0 contract):**
   the 12-site Tailwind lift → gate §5 (design-idiom-localization); the `dock.css`/`dock-controls.css`
   split → gate §6 (dock-css-split); `interpolate-size`/`@starting-style`/`allow-discrete` on
   `.dock-layer` (browser-test the VT double-animate caveat first); CSS-nesting; `defineModel` ×8;
   `Readonly<>` context guards. Add the two W8b gate entries + ci.yml steps; bite-check each.
3. **W9:** the lean-folds + slides-supply → the W9-consumers tally + gate §7. Add entry + ci.yml
   step; bite-check.
4. **W10 (LAST):** the polish-tier component splits, the overfitting audit, `AU.FINAL.md` + the
   deferral register, the 3.3.0 changeset (STAGED). Add gate §8 (release-only, NOT ci). Run
   `gates.mjs --run release` green; tag is USER-DOMAIN.

**Per-wave invariant (inv-27):** every gate's manifest entry + ci.yml step land in the SAME commit
as the born-green fix it guards, so CI is green at every wave boundary and `--verify-ci` never drifts.

---

## §11 — Risks

- **No playwright dependency exists** and one MUST NOT be added for `proof:dock-motion-single-source`
  (KISS + payload + a flaky sub-frame settle probe). The gate is a STATIC source-structure proof; the
  perceptual settle-probe rides the slides deck's downstream Playwright (it consumes the published
  3.3.0 dock). This mirrors how `proof:dock-opacity-lockstep` delegated its perceptual half.
- **The single-frame-sync fix defers refs by one rAF** — safe Vue reactivity, no public API change,
  but the §1 gate is SYNTACTIC (it proves the ref-swap is in the rAF body, not that the paint lands
  in one frame). The runtime A→B→A concurrency guard (`morphGeneration`,
  `GlassDock.motion-parity.test.ts`) is the orthogonal runtime instrument — do NOT regress it.
- **The visibility-semantic fork is LOAD-BEARING** (`dock.css:428` deferred vs `:449` immediate). The
  §6 split (relocation only) and any W8b `@starting-style`/`allow-discrete` rewrite MUST preserve the
  3-state (active/inactive/leaving) contract; `proof:dock-opacity-lockstep` still asserts the active
  layer's `visibility 0s` stays immediate.
- **`--dock-press-spring` must NEVER fold into the resize family** (`AU-AUGMENT §2.3` — press
  feedback is transform-only, must not touch surface fades). The `--spring-dock` author + route is a
  resize-family change ONLY; `proof:dock-motion-parity` (`gates.mjs:43`) still asserts both engines on
  one source.
- **The `proof:design-idiom-localization` grep false-positive risk** (runtime `:style` theming) is
  bounded: the two regexes match the Tailwind arbitrary-utility token form only, NOT inline
  `:style="{ '--x': … }"`; an `idiom-allow:` escape hatch exists but seeds EMPTY (all 12 sites are
  fixable).
- **The dock-vocabulary README + script are untracked at HEAD** — the orchestrator (not the agent)
  stages them in the W8 commit (the hardened agent git clause). Until then `proof:dock-vocabulary` is
  not in the manifest, so `--verify-ci` stays green.
- **inv-16 (this repo only):** every path above is under `glass-ui`. The slides-side Playwright dock
  validation and the slides token work (constellation dark arm, progress articulation) are the F arm
  — NOT touched here.
