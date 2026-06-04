# AT.W0b · Lens B6 — adversarial current-state audit of the dock

The engineering counterpart to the B1–B3 design lenses. Where B1–B5 / A1–A6
argue the blob substrate forward, B6 turns the same adversarial light on the
ONE primitive the AT.W6/W7 plan already commits to touch: the **dock family**
(7 components + 5 composables + `dock.css` + 3 test files). The brief: find
every dock defect/debt at `file:line`, severity-tagged, and propose a hardened
dock-wave set with each gate — built ON the AT plan (`AT.md` §W6/W7, `AT.W1`),
not re-derived.

This audit READ IN FULL: `GlassDock.vue` (377 LOC), `DockLayerGroup.vue`,
`DockLayer.vue`, `DockIconButton.vue`, `DockTabButton.vue`,
`DockSelectTrigger.vue`, `DockDropdownTrigger.vue`, `useDockState.ts` (353 LOC),
`useLayerTransition.ts` (202 LOC), `dockContext.ts`, `dockLayerContext.ts`,
`isTeleportedTarget.ts`, the 3 `__tests__/`, `dock.css` (1155 LOC),
`useViewTransition.ts`, the prior W0 6-lens audit (L1 §W7-a is the seed), and
the cross-repo dock consumers in `bbnf-buddy`, `speedtest`, `value.js`, and the
glass-ui demo (read-only, inv-16 — recorded, not absorbed).

Two SOTA web confirmations anchor the headline findings (sources at the foot);
where a finding is knowledge-only it is tagged **[knowledge]**.

---

## §0 — TL;DR (severity-ranked)

| # | Finding | Sev | file:line | AT disposition |
|---|---|---|---|---|
| **B6-1** | The booked dock binding-guard is the WRONG gate — the silent-no-op class is catchable at TYPECHECK via `vueCompilerOptions.strictTemplates`, which glass-ui does NOT set. A demo-mount/e2e spec catches one site; `strictTemplates` catches the whole class library- AND consumer-side. | **S1** | `tsconfig*.json` (absent); W7 bug `00bd5f9` | **W6 — elevate the guard to `strictTemplates` + `proof:strict-templates`** |
| **B6-2** | The native-VT `useLayerTransition` fork is a PAGE-SINGLETON race. Multiple live docks (CategoryRail + StoryPager + …, ≥3 on the demo) calling `startViewTransition` in overlapping frames mutually SKIP — the FLIP fallback (per-element) has no such footgun. No guard. | **S2** | `useLayerTransition.ts:121-133` | **W6 — serialize-or-degrade the dock VT fork; concurrency test** |
| **B6-3** | `markTransitioning()` / `isTransitioning` is DEAD on the native-VT path. The outer width swap morphs via VT (no `transitionend` on `.dock-layers`), so `onDockTransitionDone` never fires from the VT; the click-away suppression window relies on a timer-only fallback that can mis-size. | **S2** | `GlassDock.vue:241-256, 302-307`; `useDockState.ts:277` | **W6 — reconcile the transition-flag lifecycle with the VT fork** |
| **B6-4** | The `overflow`/`wrap`/`containerName` 3-prop accretion is WORSE than booked: `wrap` has **ZERO** real attribute bindings anywhere (demo + 3 sibling repos), `containerName` has exactly **ONE** consumer context (the glass-ui demo). Both fail the ≥2-distinct-consumer bar TODAY. | **S2** | `GlassDock.vue:17-18, 70-83`; verified cross-repo | **W7 — the overflow-model collapse (already booked); HARDEN the rationale** |
| **B6-5** | `aria-label` on the role-free `<GlassDock>` root is a second silent-binding/a11y defect, present in a real consumer (`CategoryRail.vue:33`) and flagged but NOT fixed in the W7 punch-list. Same class as B6-1: it falls through to a `<div>` with no role, so SRs may ignore it / axe flags it. | **S2** | `CategoryRail.vue:33`; `GlassDock.vue:315` | **W6/W7 — the GlassDock labelling contract (mirror the AM.W0 aria contract)** |
| **B6-6** | `DockSelectTrigger.vue` imports `ChevronDown` from `@lucide/vue`; CLAUDE.md's Dependencies table + Subpath sections say `lucide-vue-next`. The import is CORRECT (the dep IS `@lucide/vue`); the DOC is stale — but a stale doc on the icon dep is exactly how a future kebab/import regression slips. | **S3** | `DockSelectTrigger.vue:4`; CLAUDE.md | **W7 — doc-correctness sweep (folds into the ι hygiene sweep)** |
| **B6-7** | CLAUDE.md still documents `src/components/custom/dock-group/` as a LIVE dir and a `/dock-group` subpath; it was RETIRED at AI.W5 (`src/index.ts:64`). The B6 prompt itself inherited the stale path. Phantom-primitive doc-rot. | **S3** | CLAUDE.md (Structure + Subpath pairs); `src/index.ts:64` | **W7 — doc-correctness sweep (same as B6-6)** |
| **B6-8** | `useLayerTransition` FLIP `nextTick` re-measure does an UNGUARDED `el.style.transition = "none"` then `""` — if a `ResizeObserver`-driven resize fires DURING the measure window, the cleared inline `width/height` reads the transient size and pins the wrong target. No resize-coalesce. | **S3** | `useLayerTransition.ts:150-185` | **W6 — note as a known FLIP edge; covered if VT path is the primary** |
| **B6-9** | `DockIconButton` (`@/utils`) vs `DockSelectTrigger`/`DockDropdownTrigger` (`../../../utils`) use INCONSISTENT cn() import paths; and `DockTabButton`'s `data-tier` is read from `useAttrs()` (string compare) — a kebab/data-attr seam with no type guard, the exact fall-through surface B6-1 covers. | **S4** | `DockIconButton.vue:9` vs `DockSelectTrigger.vue:5`; `DockTabButton.vue:33` | **W7 — import-path hygiene; `data-tier` typing folds into the `data-*` contract** |
| **B6-10** | `isTeleportedTarget` is correct but UNDERTESTED — the click-away/focus-out teleport-escape path (`useDockState.ts:202,227,280`) is the single most regression-prone dock behaviour (it's why fourier's SliderControl no-op'd) and has ZERO unit coverage. The 3 dock tests cover class-hooks + ids only, never the state machine. | **S2** | `__tests__/*` (3 files, all structural); `useDockState.ts` (0% behavioural) | **W6 — the dock state-machine spec (the REAL binding-verification gate)** |

Net: **2× S1-equivalent process holes (B6-1, B6-10)**, 4× S2 correctness/concurrency,
4× S3/S4 hygiene. The dock is FUNCTIONALLY sound at HEAD (no shipped bug found),
but the **verification fabric around it is thin** — which is precisely the class
the W7 silent-no-op proved still open.

---

## §1 — The binding-verification class (the W7 seed) — built or not?

### B6-1 (S1) — the booked guard is the wrong altitude; `strictTemplates` is the real fix

The AT plan books, in W6, "the dock binding-verification guard" as a *test*
(`AT.md:168`, `:100`; L1 §W7-a `:402` proposes "a demo-mount spec (or
Playwright assertion) that every chrome dock … ACTUALLY carries the
`.dock-scroll-{x,y}` class at runtime"). That guard would catch the EXACT
`scroll-on-overflow`→`overflow="scroll"` site that shipped dead in
`96858c8` and got fixed in `00bd5f9`. But it catches ONE site, by enumeration.

**The class is catchable categorically at typecheck.** Per the Vue language-tools
SOTA: vue-tsc ships `vueCompilerOptions.strictTemplates` (and the granular
`checkUnknownProps` / `checkUnknownComponents` / `checkUnknownEvents`), which
make an unknown attribute/prop on a component root a **compile error** instead of
a silent fallthrough. By default `checkUnknownProps` is `false` — so a kebab
prop that doesn't exist falls through as a dead DOM attribute and neither
`vue-tsc` nor a unit test complains. That default is exactly why
`scroll-on-overflow` shipped.

**Verified absent:** `grep -rn "vueCompilerOptions\|strictTemplates\|checkUnknownProps" tsconfig*.json`
returns NOTHING. glass-ui runs `vue-tsc --noEmit` (the `typecheck` script) and
`vue-tsc --project tsconfig.build.json` (the dts arm) with the **default loose
template-check** — so every `<GlassDock scroll-on-overflow>`-class typo in the
library's OWN demo + SFCs is invisible to the build.

→ **The B6-1 finding refutes the booked gate's altitude.** A demo-mount/e2e
dock-scroll spec is GOOD (it asserts the runtime DOM carries the class) but it is
a *point* gate — it covers the two known sites and nothing else. `strictTemplates`
is the *categorical* gate: enable it in `vueCompilerOptions`, and the next
`scroll-on-overflow`-class typo on ANY component (dock or otherwise, library or
demo) is a red typecheck. It also propagates to consumers who run `vue-tsc`
against glass-ui's published `.d.ts` (the W7 lesson's downstream half).

**Caveat (knowledge):** enabling `strictTemplates` on a 2415-module repo will
surface a backlog of pre-existing loose-attr sites (intentional fall-through,
`$attrs` spread, third-party components). The honest move is to enable it
**incrementally** — turn on `checkUnknownProps` first (the narrowest knob that
catches the dock class), fix the fallout, then graduate to full
`strictTemplates`. This is a deliberate W6 sub-slice, not a one-line flip.

### B6-9 (S4) — `data-tier` is the next-most-likely silent seam

`DockTabButton.vue:33` reads `attrs["data-tier"] === "primary"` to toggle the
`btn-audacious` recipe. `data-*` attributes are STRINGS with no type; a consumer
who writes `:data-tier="'primary'"` vs `data-tier="primary"` vs a typo'd
`data-teir` gets silent no-paint — `strictTemplates` does NOT catch `data-*`
typos (they're valid HTML attrs). The dock-CSS `[data-tier="primary"]` /
`[data-tier="secondary"]` selectors (`dock.css:930,990`) are the only consumers.
This is a smaller surface than B6-1 but the SAME silent class. **No defect at
HEAD** — recorded as the next seam to watch; a typed `tier?: "primary" |
"secondary"` prop on `DockTabButton`/`DockIconButton` would close it (and is a
cleaner contract than the attrs read), but it's a 1-context API change — BOOK
unless the W7 control-vocab wave wants it.

### Other kebab/stale-prop risks across the 7 components — swept

I swept every dock-prop binding in the demo + 3 sibling repos for stale/kebab
hazards:

- `bbnf-buddy/BottomDock.vue:96` — `:collapse-delay :start-collapsed :always-expanded`
  all bind real props (camelCase props, kebab attrs — Vue-correct). ✓
- `bbnf-buddy/LeftToolsDock.vue:55-56` — bare `always-expanded` `fit-content`
  boolean attrs (Vue coerces bare → `true`). ✓
- `speedtest/Dock.vue:168-171`, `SurveyResultDock.vue:32` — same, all real. ✓
- `speedtest/Dock.vue:196` — `<DockLayerGroup v-model:active="activeLayer" :show-rail="false">`
  — `active` is a real `defineModel`, `show-rail` a real prop. ✓
- value.js demo docks — all bindings resolve to real props. ✓

**No second dead-binding found at HEAD.** The class is closed by code today; the
PROCESS that lets it reopen (B6-1) is the live debt.

---

## §2 — The overflow / wrap / containerName accretion (B6-4, S2)

The AT plan already books "the GlassDock overflow-model collapse to one enum,
`wrap` retired — clean break" (W7; `AT.md:104,171`; `AT.W1` is silent on it —
it's a W6/W7 fold, not a blob slice). **B6 hardens the rationale with the
consumer-reach numbers the booking lacked**, and finds the accretion is worse
than "3 overlapping props":

**Three overlapping overflow models coexist on `<GlassDock>`:**

1. `wrap?: boolean` (`GlassDock.vue:17-18`) → `.dock-wrap` class → `flex-wrap:
   wrap` + a whole `@media` desktop-revert block (`dock.css:542-572, 1089-1112`).
2. `overflow?: "grow" | "scroll"` (`GlassDock.vue:70`) → `.dock-scroll-{x,y}`
   (the AS.W7 D2/D12 addition — the one that shipped the silent-no-op).
3. `containerName?: string` (`GlassDock.vue:83`) → lifts `overflow: hidden` to
   `overflow: visible` via the inline `containerStyle` + the
   `:not([data-container-name])` clip rule (`dock.css:85-87`).

These THREE interact in undefined ways. What is `<GlassDock wrap overflow="scroll">`?
(`.dock-wrap` sets `white-space: normal` + `flex-wrap: wrap`; `.dock-scroll-x`
wants a single scrolling row — they fight; `dock.css:506` only handles
`.dock-scroll-x:not(.dock-wrap)`, so `wrap` silently wins and `scroll` no-ops).
What is `<GlassDock containerName="x" overflow="scroll">`? (`containerName` forces
`overflow: visible` inline; `.dock-scroll-y` sets `overflow-y: auto` — the inline
style has higher specificity, so the scroll cap silently dies.) These are
unguarded, untested footguns.

**The consumer-reach numbers (the clean-break justification):**

| Prop | demo | bbnf-buddy | speedtest | value.js | distinct contexts |
|---|---|---|---|---|---|
| `wrap` | 0 | 0 (one STALE comment `DockAnimationTimeline.vue:140`) | 0 | 0 | **ZERO** |
| `containerName` | 1 (`metric-pill.vue:86`) | 0 | 0 | 0 | **ONE** |
| `overflow` | 2 (`CategoryRail`, `AuroraConfigDock`) | 0 | 0 | 0 | one context |

`wrap` has **zero real bindings anywhere** — the only `GlassDock.wrap` reference
in the whole constellation is a STALE COMMENT in
`bbnf-buddy/DockAnimationTimeline.vue:140` ("the layer claims 75% … GlassDock.wrap
… to fit the cap"), describing behaviour that file does not even bind. Per the
overfitting invariant (`feedback_overfitting_audit.md`: ≥2 distinct consumer
contexts OR exported-with-2nd-binary), `wrap` is **substrate-without-consumer** —
it should be DELETED outright, not "collapsed into an enum." `containerName` at
ONE context (the demo) is on the same edge — it survives only because it's a
genuinely different mechanism (a CSS container subject) the demo exercises, but
its ≥2 claim is THIN (the demo + the booked speedtest cluster intent, which
hasn't landed — `dock.css:50` cites it but no consumer binds it).

→ **AT-W7 (already booked) — harden to a true clean break, not a rename:**
1. **DELETE `wrap`** (zero consumers; the `.dock-wrap` CSS + the desktop-revert
   `@media` blocks go with it — ~60 LOC of `dock.css` retired). Not "fold into
   the enum" — there is no consumer to migrate.
2. **The enum is `overflow?: "grow" | "scroll" | "wrap"`** ONLY IF a wrap
   consumer materializes; at HEAD it's `"grow" | "scroll"` (2 values, the live
   pair). One model, one prop.
3. **`containerName` stays** (different axis — a container-query subject, not an
   overflow model) but its clip-lift folds into the `overflow` story: document
   that `containerName` implies `overflow: visible` and is mutually exclusive
   with `overflow: "scroll"` (assert-or-warn in dev). The W7 booking says "the
   `containerName` clip-lift folds into `"visible"`" (`L2:341`) — B6 confirms
   that's the right move and adds the mutual-exclusion guard.

**Gate (W7):** a VR + a unit asserting the three-way interaction is GONE (no
`.dock-wrap` class emitted ever; `overflow="scroll"` + `containerName` warns in
dev); `rg "\.dock-wrap\b" src/ = 0`; dock consumers re-verified; **no silent-no-op
kebab regression** (the B6-1 `strictTemplates` gate is now in place to enforce it
categorically).

---

## §3 — `useLayerTransition` / `useDockState` FLIP correctness

### B6-2 (S2) — the native-VT fork is a page-singleton race

`useLayerTransition.ts:121-133` forks on `NATIVE_VT` and wraps the layer mutation
in `startViewTransition`. The SOTA confirms the hazard: **the View Transitions
API is a per-DOCUMENT singleton** — "calling `startViewTransition()` while another
view transition is active will interrupt the current view transition, fast
forward to the end state … the same effect as calling `skipTransition()`" (MDN /
Chrome 2025). The current state of `useViewTransition.ts:91-95` even acknowledges
the skip ("A rapid re-trigger SKIPS this transition, rejecting `ready`").

**The defect:** a single page routinely mounts MULTIPLE docks. The glass-ui demo
alone has CategoryRail (1 rail dock) + StoryPager (1 horizontal dock) +
dock-with-slider story (3-4 docks); bbnf-buddy mounts LeftToolsDock + BottomDock +
DockAnimationTimeline + DockNavigation SIMULTANEOUSLY. Each `<GlassDock>`'s
outer collapsed↔expanded swap (`GlassDock.vue:190-194`) and each
`<DockLayerGroup>`'s inner swap (`DockLayerGroup.vue:56-60`) call
`useLayerTransition`, which on a supporting engine calls `startViewTransition`.
**If two docks transition in overlapping frames — e.g. one dock expands on hover
while another is mid-collapse — the second `startViewTransition` SKIPS the
first.** The first dock's width-morph fast-forwards to its end state (a visible
jump), and only the second animates. The FLIP fallback has NO such coupling —
each element pins its own inline size independently, so N docks animate in
parallel.

Worse: a SINGLE dock that hosts a `DockLayerGroup` (the documented
`<GlassDock><DockLayerGroup>` composition, CLAUDE.md "Dock orientation and
multi-layer") can fire the OUTER swap (GlassDock `.dock-layers`) and the INNER
swap (`.dock-layer-stack`) in the same tick on the same VT — two
`startViewTransition` calls, the inner skips the outer or vice versa. The
`vt-names.test.ts` proves the NAMES are distinct (good — no name collision) but
distinct names on ONE global VT don't help: it's the global transition object
that's shared, not the name.

→ **AT-W6 — serialize-or-degrade the dock VT fork.** Options, cheapest first:
- **(a) Degrade docks to the FLIP path entirely** — the dock width-morph is a
  per-element size animation that the FLIP does perfectly and the VT does NOT do
  better (VT's win is crossfading DIFFERENT DOM; the dock swaps two pre-stacked
  grid layers, which FLIP already crossfades via opacity). The native-VT fork
  buys the dock little and costs it the singleton race. **Recommended:** gate the
  VT fork to single-dock contexts, or drop it from the dock and KEEP it for the
  list-rerank case (`gl-list-item`) where it earns its keep.
- **(b) Serialize** via a module-level VT queue (await `finished` before the next)
  — but that introduces cross-dock coupling worse than the disease (dock A's
  hover waits on dock B's collapse).
- **(c) Per-dock `view-transition-types`** (CSS VT2) to scope — knowledge: not
  Baseline-Widely enough to rely on; the fallback still races.

(a) is the gestalt move: the FLIP already handles the dock case; the VT fork was
added (AQ.W6) on the assumption of a single transition at a time, which the
multi-dock reality violates. **Gate:** a concurrency test mounting ≥2 docks,
triggering overlapping swaps, asserting both reach their end size (no skipped
fast-forward) — runnable in happy-dom by stubbing `startViewTransition` and
asserting the fork is NOT taken for the dock (or is serialized).

### B6-3 (S2) — the transition-flag lifecycle is dead on the VT path

`GlassDock.vue` runs a dual transition-tracking system:
- `markTransitioning()` (`:241-250`) sets `isTransitioning = true` + a timeout
  computed from `getComputedStyle(root).transitionDuration` (`longestTransitionMs`
  `:224-232`).
- `onDockTransitionDone()` (`:252-256`) clears it on the root's `transitionend`.

`isTransitioning` feeds `useDockState`'s click-away suppression
(`useDockState.ts:277`: "During transitions, pointer-events:none on dock-layers
causes clicks to target the parent element — suppress click-away entirely").

**On the native-VT path, the width morph happens as a VT pseudo-element animation,
NOT a CSS `transition` on `.dock-layers`** — so `.dock-layers`'s `transitionend`
(`GlassDock.vue:355` → `onLayersTransitionEnd`) and the ROOT's `transitionend`
(`:339`) may never fire from the width change (the root still transitions
padding/shadow/etc. per `dock.css:185-192`, so SOME `transitionend` fires, but
NOT keyed to the width morph the VT now owns). The timer in `markTransitioning`
reads `longestTransitionMs(root)` — which no longer includes the width (width was
removed from the root transition at J.W3.A, `dock.css:183`) — so the suppression
window is sized to the SHORTER padding/shadow transition, potentially CLEARING
`isTransitioning` while the VT morph is still mid-flight. A click-away during that
gap hits the suppression-off path and can mis-collapse.

This is a latent correctness bug the AQ.W6 VT fork introduced and no test covers
(happy-dom has no `startViewTransition`, so EVERY existing dock test runs the FLIP
fallback — the VT path is **untested in CI**).

→ **AT-W6 — reconcile the transition-flag lifecycle with the VT fork.** Either
route `isTransitioning` off the VT `finished` promise (set true before
`startViewTransition`, clear in `finished.finally`) so the suppression window
tracks the ACTUAL morph, or (cleaner, pairs with B6-2(a)) drop the dock VT fork
and the flag stays FLIP-keyed as designed. **Gate:** a test that stubs
`startViewTransition` and asserts `isTransitioning` stays true across the stubbed
`finished` window.

### B6-8 (S3) — FLIP re-measure vs resize-mid-transition

`useLayerTransition.ts:150-185` (the FLIP fallback) does: pin → `nextTick` →
`transition="none"` → `clearDim` → measure `toSize` → re-pin → reflow →
`transition=""` → rAF → set `toSize`. If the `ResizeObserver`-driven host resize
(or a font swap, or a flex reflow) fires DURING the `transition="none"` measure
window, the `clearDim` reads a TRANSIENT natural size and pins the wrong
`toSize`. The `transitionId` guard (`:137,151,168`) handles a SWAP-mid-transition
(a new active layer) but NOT a RESIZE-mid-transition (the same layer, new size).
The dock has no `ResizeObserver` on the layer container (only the consumer's host
might), so this is **edge, not shipped** — but it's the known FLIP fragility the
VT fork was meant to retire. If B6-2(a) keeps the dock on FLIP, this stays a
known edge; document it. **No gate** beyond a code comment unless a consumer hits
it.

### B6-10 (S2) — the state machine has ZERO behavioural coverage (the REAL guard)

The 3 dock test files are ALL structural:
- `GlassDock.instrument-strip.test.ts` — class hooks (`variant-instrument-strip`,
  `vertical`, `fit-content`).
- `GlassDock.scroll-overflow.test.ts` — class hooks (`dock-scroll-{x,y}`).
- `GlassDock.vt-names.test.ts` — `dockId` pairwise-distinctness.

**NONE test the `useDockState` state machine.** The hover→collapse timer, the
`keepOpen`/`release` ref-count, the click-away listener, the teleport-escape
(`isTeleportedTarget` at `:202,227,280`), the `alwaysExpanded` watch, the grace
period (`:255-262`) — the 200 LOC of actual dock BEHAVIOUR — have 0% coverage.
This is the same class as B6-1: the thing most likely to silently regress
(state-machine edge + teleport DI) is the thing least verified. The fourier
`inject("dockKeepOpen", null)` silent no-op (`dock/index.ts:21-24` documents it:
"silently no-op at v1.7.0; functional regression on scrub gestures") was EXACTLY
this — a binding that compiled, typechecked, and shipped dead because no test
exercised the dock-held path through a real slider descendant.

→ **AT-W6 — the dock state-machine spec is the canonical binding-verification
gate.** It is strictly more valuable than the booked demo-mount/dock-scroll spec
(B6-1's point gate). Cover, in vitest + happy-dom:
- `collapsed → hover → collapsed` with a fake-timer collapseDelay.
- `keepOpen()` suppresses the timer; `release()` re-arms with the grace period.
- click-away collapses even with `keepOpenCount > 0` (the `:282` contract).
- `isTeleportedTarget` returns the dock-held path for a `[data-glass-dock-portal][data-glass-dock-owner=<id>]` target (the fourier regression's root cause).
- `alwaysExpanded` ref flip → pinned; ref unflip → collapsed.
**Gate:** the spec ships green; the `isTeleportedTarget` ownership branch is
asserted (the one that, untested, let fourier's slider no-op).

---

## §4 — vt-names dock minting (B6 — clean, one note)

`GlassDock.vue:205-214` and `DockLayerGroup.vue:67-77` mint `view-transition-name`
from `useId()` (app-scoped, collision-free across module-graph copies — the AR
inv-η fix, well-tested by `vt-names.test.ts`). The sanitizer
`replace(/[^a-zA-Z0-9_-]/g, "-")` is correct. **No name-collision defect** — the
names are pairwise-distinct AND distinct from the `gl-list-item` row names
(prefixed `gl-dock-stack-` / the raw `glass-dock-…`). The ONLY vt issue is the
SINGLETON race (B6-2), which is orthogonal to naming — distinct names on one
global VT don't prevent the interrupt. The `vt-names.test.ts` is a GOOD test of
the wrong worry: it proves names don't collide, but the actual hazard is the
global transition object, not the name. **Note (W6):** the concurrency test
(B6-2 gate) is the missing companion to `vt-names.test.ts`.

---

## §5 — Overfitting: is every dock subcomponent ≥2-consumed?

Cross-repo tally (demo + `bbnf-buddy` + `speedtest` + `value.js`, distinct files
binding each component):

| Component | demo | bbnf-buddy | speedtest | value.js | distinct contexts | verdict |
|---|---|---|---|---|---|---|
| `GlassDock` | 9 | 2 | 2 | 3 | 4 repos | ✓ decisive |
| `DockIconButton` | 7 | 9 | 2 | 10 | 4 repos | ✓ decisive |
| `DockTabButton` | 2 | 0 | 1 | 0 | demo + speedtest | ✓ (2 contexts) |
| `DockSelectTrigger` | 1 | 1 | 0 | 1 | demo + bbnf + value | ✓ (3 contexts) |
| `DockDropdownTrigger` | 1 | 4 | 0 | 1 | demo + bbnf + value | ✓ decisive |
| `DockLayerGroup` | 2 | 0 | 1 | 2 | demo + speedtest + value | ✓ decisive |
| `DockLayer` | 2 | 2 | 1 | 1 | 4 repos | ✓ decisive |

**Every dock SUBCOMPONENT clears ≥2 distinct consumer contexts decisively.** The
dock family itself is NOT overfit — the accretion is at the PROP level
(B6-4: `wrap` = 0, `containerName` = 1), not the component level. The two
1-context props are the overfit; the components are load-bearing.

The booked 1-consumer ledger items (`AT.md:179`):
- `DockSelectTrigger.clampLabel` — VERIFIED NOT IN SOURCE (`grep clampLabel src/ = 0`);
  correctly BOOK (value.js W-ASK, 1 consumer). ✓ The ledger is right.
- The composable-return types (`UseDockStateReturn`, etc.) are PUBLIC EXPORTS
  (`dock/index.ts:16`) — they survive the export-OR bar regardless of binding
  count. ✓

→ **No overfit COMPONENT to retire.** The overfit is `wrap` (delete, §2) and the
THIN `containerName` (keep with the mutual-exclusion guard, §2). The overfitting
audit at AT close (W8) should specifically re-run the PROP-level tally above, not
just the component level — the dock proves prop-accretion hides under
component-legitimacy.

---

## §6 — Doc-rot (B6-6, B6-7, S3) — folds into the ι hygiene sweep

Two stale-doc defects the dock surfaces, both feeding a future silent regression:

- **B6-6 — icon dep:** `DockSelectTrigger.vue:4` imports from `@lucide/vue`
  (CORRECT — `package.json:544` declares `@lucide/vue ^1.16.0`, and 30+ SFCs use
  it). CLAUDE.md's Dependencies table + Subpath sections say `lucide-vue-next
  ^0.525`. The CODE is right; the DOC is two majors + a package-rename stale. A
  contributor trusting the doc would `npm i lucide-vue-next` and import a
  NONEXISTENT-in-this-repo package — a silent-import regression seed.
- **B6-7 — phantom primitive:** CLAUDE.md Structure documents
  `src/components/custom/dock-group/` (DockGroup chassis) as a live dir, and the
  "Subpath naming pairs" section documents `/dock-group` as a canonical subpath.
  **It was RETIRED at AI.W5** (`src/index.ts:64`: "dock-group retired alongside
  …"; `find src -iname "*dock-group*"` = 0 source files). The B6 audit PROMPT
  itself inherited the stale path ("+ `src/components/custom/dock-group/`
  (DockGroup chassis)") — proving the doc-rot actively misleads. CLAUDE.md
  §Structure still lists `dock-group/` in the custom tree.

→ **AT-W7 — fold into the ι hygiene sweep** (`AT.md:106,173`): correct CLAUDE.md
to `@lucide/vue ^1.16.0` (the real dep) and DELETE the `dock-group/` Structure
entry + the `/dock-group` Subpath-pair documentation (the retired primitive).
**Gate:** a doc-vs-source consistency check — every dir CLAUDE.md §Structure
names exists; every dep the Dependencies table names matches `package.json`. This
is a cheap `proof:*` grep (the names CLAUDE.md asserts must resolve) and it
catches the NEXT phantom-primitive doc-rot categorically — the same elevation
B6-1 makes for binding-verification.

---

## §7 — The hardened dock-wave set (proposed AUGMENTED-AT)

B6 does NOT propose a new headline wave (the blob lift stays the headline). It
HARDENS the AT.W6 correctness fold and the AT.W7 slipped-ships fold with the
dock-specific gates the booking lacked. All file-disjoint from the blob waves
(W2-W5), so they parallelize as planned.

### Augment AT.W6 (correctness + gate-fleet fold) — 4 dock slices

| Slice | What | Hard gate |
|---|---|---|
| **W6-dock-a** | **`vueCompilerOptions` strictness** — enable `checkUnknownProps` (then graduate to `strictTemplates`), fixing the fallout. Supersedes the booked demo-mount dock-scroll guard with the CATEGORICAL fix (B6-1). | `proof:strict-templates` — `typecheck` runs with `checkUnknownProps:true`; a fixture `<GlassDock bogus-prop>` is a RED typecheck (fails closed). The `scroll-on-overflow` class can never silently ship again. |
| **W6-dock-b** | **The dock state-machine spec** (B6-10) — hover/collapse/keepOpen/release/grace/click-away/teleport-escape/alwaysExpanded, fake-timers. The REAL binding-verification gate (covers the fourier-class no-op). | spec green; the `isTeleportedTarget` ownership branch asserted; `useDockState` behavioural coverage > 0%. |
| **W6-dock-c** | **VT-fork concurrency reconcile** (B6-2 + B6-3) — degrade the dock to the FLIP path (recommended) OR serialize; reconcile `isTransitioning` with the chosen path. Keep the VT fork for `gl-list-item` only. | a ≥2-dock concurrency test: overlapping swaps both reach end-size (no skip fast-forward); `isTransitioning` tracks the actual morph window. |
| **W6-dock-d** | **(note-only)** FLIP resize-mid-transition edge (B6-8) documented; `data-tier` typed-prop deferred (B6-9, 1 context → BOOK). | code comment; ledger entry. |

### Augment AT.W7 (slipped ships + contract) — 2 dock slices

| Slice | What | Hard gate |
|---|---|---|
| **W7-dock-a** | **The overflow-model clean break** (B6-4, already booked — HARDENED): DELETE `wrap` outright (0 consumers, not "collapse"); `overflow` is the single enum; `containerName` keeps but gains the `overflow:"scroll"` mutual-exclusion dev-warn. | `rg "\.dock-wrap\b\|wrap\?" src/ = 0`; one overflow enum; `containerName`+`scroll` warns; consumers re-verified; **no silent kebab regression** (now enforced by W6-dock-a). |
| **W7-dock-b** | **The GlassDock labelling contract** (B6-5) + **doc-rot** (B6-6/B6-7): mirror the AM.W0 aria contract — `aria-label` belongs on a labelling child (`<nav>`/`<aside>`) or the dock exposes a labelled wrapper, NOT the role-free root; fix `CategoryRail.vue:33`; correct CLAUDE.md (`@lucide/vue`; delete `dock-group/`). | axe-clean on the dock root (no `aria-label` on a role-free div); `proof:doc-consistency` (CLAUDE.md dirs + deps resolve); the punch-list a11y item from `00bd5f9` CLOSED. |

### The single highest-leverage move

**W6-dock-a (`strictTemplates`/`checkUnknownProps`) is the keystone.** It is the
categorical answer to the W7 silent-no-op the whole AT correctness fold was
seeded by. The booked demo-mount guard catches one site; this catches the class —
library AND consumer-side — at typecheck, for free, forever. Everything else in
B6 is correctness/hygiene around the dock; this one changes the verification
fabric so the next stale binding CANNOT ship the way `scroll-on-overflow` did.

---

## §Sources

Knowledge-vs-web tags inline above. Web-confirmed:

- Vue.js — [Fallthrough Attributes](https://vuejs.org/guide/components/attrs.html)
  (the silent-fallthrough mechanism that lets a non-prop attr die as a DOM attr).
- vuejs/language-tools — [Why doesn't vue-tsc disallow unknown tags/components? (Discussion #3479)](https://github.com/vuejs/language-tools/discussions/3479)
  and [vuejs Discussion #10013 — Vue should render a compilation error for invalid prop keys](https://github.com/orgs/vuejs/discussions/10013)
  (`strictTemplates` / `checkUnknownProps` are the opt-in that turns the
  silent-no-op into a compile error; default is loose).
- MDN — [ViewTransition](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition),
  [skipTransition()](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/skipTransition),
  [finished](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/finished)
  (the page-singleton interrupt: a second `startViewTransition` skips the active one).
- Chrome for Developers — [What's new in view transitions (2025 update)](https://developer.chrome.com/blog/view-transitions-in-2025)
  (concurrent-transition handling; `view-transition-types` scoping — not yet
  Baseline-Widely).

Internal references (file:line, this repo unless noted): `GlassDock.vue`,
`useDockState.ts`, `useLayerTransition.ts`, `dock.css`, `dock/index.ts`,
`useViewTransition.ts`, `src/index.ts:64`, `tsconfig*.json` (strictness absent),
the W7 fix commit `00bd5f9` + Wave-2 `96858c8`, `docs/tranches/AT/audit/W0-L1`
§W7-a, and the cross-repo dock consumers in `~/Programming/{bbnf-buddy,speedtest,
value.js}` (read-only, inv-16).
