# BI.W-DOCK-INTERACTION-AXIS — the consumer-owned posture axis (atlas §1 · the six-close dock disease)

Band B3 (dock). MINTED 2026-07-16 at the dock-interaction-axis triumvirate pass (BI-addenda;
RESEARCH → HARDEN, two-consecutive-clean) — atlas totality packet §1 (PA-3, the six-close dock
disease) + augment §C.1 (the residual collapsed-pole seam) had NO owning wave across the 104-wave
corpus (grep-verified: zero waves mention `interaction`, `isQuiet`, or a consumer posture axis on
`GlassDock`). Atlas 7 is registry-HELD on this seam. Sources of record:
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/dock-axis/research.md`
(RESEARCH arm) + `…/dock-axis/harden.md` (HARDEN arm, normative). The hardened contract below is the
terminal execution specification; research is lineage, not a broader license.

## §Intent — the atlas §1 blocking ask, quoted

atlas totality packet §1 (PA-3 · augment §C.1), restated precisely by the RESEARCH arm (research.md §0):

> "One consumer-controlled axis on `<GlassDock>`. In `manual`, every **internal environmental
> posture writer** — hover / focus / idle-timer / outside-click / touch — is suppressed at **both**
> poles (collapsed and expanded), while explicit `expand()` / `collapse()` stay operative.
> Consumer-agnostic: the consumer owns posture through one reducer; glass permits no consumer-side
> fallback (no watcher, CSS mask, pointer suppression, or forced pole)."

The live defect this cures (harden.md lane 4): atlas's `Dock.vue` passes **no** `interaction` prop
(AUTO mode) while its own `useDockCollapse` reducer drives posture via `expand()`/`collapse()` with
three intents `{manual, register, scroll}`. The built-in FSM (hover/focus/idle/outside-click/touch)
runs *under* the reducer and fights it — this is PA-3 / OF-5 ("randomly expands on scroll", which is
a **hover artefact**: scroll repaint drifts the cursor over the root → W6, *not* a scroll writer —
harden.md lane 1). The gap is precise: `alwaysExpanded=true` already suppresses every writer but
**force-pins** the expanded pole (`expand()`/`collapse()` no-op) — a *quiet-at-the-expanded-pole*
mode. What does not exist is a *quiet-with-a-free-pole* mode where `expand()`/`collapse()` still
write. This wave mints it as `interaction="manual"`.

## §Design — the hardened contract (normative)

The single seam: **broaden the one predicate every environmental writer already early-returns under**;
add nothing per-writer. Verbatim from harden.md §THE HARDENED CONTRACT (H1–H9).

### H1 · Prop & type

```ts
// src/components/dock/composables/useDockShellProps.ts
export type DockInteraction = "auto" | "manual";

interface DockProps {
  /**
   * Posture ownership on a COLLAPSIBLE dock.
   *   "auto"   (default) — the built-in FSM owns posture.
   *   "manual" — the consumer owns posture. Every internal environmental writer
   *              (hover, focus, idle timer, outside-click, collapsed-tap, touch)
   *              is suppressed at BOTH poles; only expand()/collapse() write.
   *              Mount pole from `startCollapsed`. Read posture via `expanded`.
   *              a11y: the consumer MUST author a focusable disclosure in a
   *              never-inert slot (#persistent/#collapsed) — glass does not
   *              auto-expand on focus in manual and provides no fallback.
   * Resolved to "auto" on an alwaysExpanded dock (that pole is force-pinned;
   * interaction is meaningless there — no dead combination reaches the FSM).
   */
  interaction?: DockInteraction;
}

// Resolution (kills the alwaysExpanded+manual dead combination at source):
const interaction = computed<DockInteraction>(() =>
    alwaysExpanded.value ? "auto" : (props.interaction ?? "auto"),
);
```

Root observability: `:data-interaction="interaction === 'manual' ? 'manual' : undefined"` on
`.glass-dock` — omitted for `auto` and for every always-expanded dock (the resolution guarantees it,
so no attribute churn on any existing dock). Default `"auto"` → today's behaviour byte-identical.

### H2 · The single guard seam

```ts
// src/components/dock/composables/useDockState.ts
const getInteraction = () => /* unwrap Ref|value */;
const isQuiet = () => getAlwaysExpanded() || getInteraction() === "manual";
```

- **Swap `getAlwaysExpanded()` → `isQuiet()`** in the six environmental writers: W3 `scheduleCollapse`
  (schedule guard, :165), W6 `onMouseEnter` (outer guard :223 **and** inner dwell guard :236),
  W7 `onMouseLeave` (:247), W8 `onFocusIn` (:273), W9 `onFocusOut` (:282), W11 `onPointerDownOutside`
  (:339). Add a top-of-fn `if (isQuiet()) return;` to W10 `onClickCollapsed` (:294).
- **KEEP `getAlwaysExpanded()`** in the pole-force guards — manual must NOT force a pole: W1 mount
  init (:97), W2 `syncDerived` (:136), W4 `collapse()` pinned branch (:194), W5 `expand()` pinned
  branch (:209), W13 `alwaysExpanded` watch (:385). In manual these fall through to the real writes
  (`expand()→"hover"`, `collapse()→"collapsed"`), so the imperative pair is operative and the pole
  is free.
- **W14/W15 hold-count writers stay unguarded** — a `keepOpen`/`release` in manual only touches
  timers already suppressed; rail (`DockLayerGroup`) / slider (`useDockHold`) / popover / search
  holds are naturally inert with **zero edits to those files**. The FSM seam absorbs every hold path.

### H3 · Flip watch — with the fire-time invariant made explicit

```ts
// src/components/dock/composables/useDockState.ts
if (typeof interaction !== "string") {
  watch(interaction, (mode) => {
    if (mode === "manual") { clearTimer(); clearHoverIntent(); }
    // leaving manual: no-op — isQuiet() guards re-arm themselves; pole preserved
  });
}
```

**Load-bearing invariant (not defensive hygiene):** `scheduleCollapse`'s `setTimeout` callback
(:168–171) writes `state="collapsed"` with **no fire-time re-guard**, so a timer armed in `auto`
would fire and collapse *after* a flip to `manual`. `clearTimer()` is the sole guarantor against a
stale idle collapse overriding the new owner; it also cancels the `release()` grace timer (shared
`collapseTimer` handle, :319). Pinned by T8/T16.

### H4 · Touch gate — merged `quiet` (mandatory, not cosmetic)

`useDockTouchGate` takes `quiet: Readonly<Ref<boolean>>` (`= alwaysExpanded.value ||
interaction.value === "manual"`) in place of `alwaysExpanded`. `shouldGateTouch()` → `!quiet.value`;
the `isActive` watch's `!alwaysExpanded.value` → `!quiet.value` (:80). **Without this, manual leaks a
`collapse()` on gate-deactivate** — in manual `isPinned` is false (manual writes `"hover"`, not
`"pinned"`) and `alwaysExpanded` is false, so the existing `!isPinned && !alwaysExpanded` gate would
fire the touch-gate collapse (harden.md lane 1). Confirmed mandatory.

### H5 · Search reroute — the one composed-writer edit

`useDockSearch.armSearch`: `dockState.onClickCollapsed()` → `dockState.expand()`. Search-arm is a
**consumer-initiated** gesture; it must use the imperative open (`expand()`, operative in manual),
not the environmental collapsed-tap (`onClickCollapsed`, which MUST early-return in manual as the
collapsed-pill `@click` handler). Beneficial side effect (fixes a **latent auto-mode bug** with a
witness): `release()`'s grace-collapse guards `state === "hover"` (:315/:321); `onClickCollapsed`
leaves `"pinned"`, so `disarmSearch` never grace-collapses back to the pill — contradicting the
search doc's "returns to a compact PERSISTENT bar." `expand()` sets `"hover"`, so the documented
return fires. Not scope creep — a bug fix that rides auto.

### H6 · `alwaysExpanded` / `startCollapsed` fate — KEEP both

**KEEP `alwaysExpanded`** on corrected merit (harden.md lane 3). It is NOT cut and NOT re-semanticized
— byte-identical. The RESEARCH-draft KEEP rationale ("cutting churns atlas's 6 imports") is fiction:
**no constellation consumer binds `alwaysExpanded=true`** (atlas deleted it, `Dock.vue:209`;
keyframes.js binds a no-op `:always-expanded="false"`; slides/sci-report never used it; glass demos
bind the raw boolean in zero templates — the only live path is `layout="grid"` auto-implication).
KEEP survives on the real objection: folding `alwaysExpanded` into `interaction="pinned"` mints a
**same-axis collision** with `layout="grid"` (which auto-implies the pinned pole, `useDockShellProps.ts:231–233`)
and re-couples `containerName` containment (`container-type: inline-size`, :100–107) to a posture
enum. `alwaysExpanded` is a **structural/layout contract** (no-morph, grid-eligible,
container-query-eligible) that the posture axis cannot express cleanly. A rename (`alwaysExpanded`→`static`)
is pure churn across 27 internal reads for no gain — rejected.

**KEEP `startCollapsed`** — reused, not extended. It is the single mount-pole authority for both
modes (`initialExpanded = !startCollapsed.value`, `GlassDock.vue:144`, passed by value, SSR-safe).
No new `defaultExpanded`/`initialPole` prop.

### H7 · Consumer addenda

- **atlas — OWED, ADOPT (additive, atlas-tranche-owned):** add `:interaction="manual"` to the
  `<GlassDock>` at `Dock.vue:226`. Cures the live §C.1 collision / PA-3 / OF-5; unblocks atlas 7.
  Nothing else in atlas changes — `useDockCollapse` already drives `expand()`/`collapse()`. This is
  **not** a break migration (no glass surface is cut); it is the additive adopt of the new axis, per
  the consumer-updates ruling (the consumer updates via a marked addendum in ITS tranche).
- **keyframes.js / slides / sci-report — NONE.** keyframes.js *wants* the auto FSM (transport nudges
  `expand()`, relies on auto idle-collapse — do NOT move it to manual); its `:always-expanded="false"`
  is a no-op under the KEEP ruling. slides stays auto (collapsed-tap-to-expand still works). sci-report
  has no dock. Optional hygiene (each in its own tranche): kf may drop the dead literal.

### H8 · a11y contract in manual (named honestly)

The trap: in `auto`, `onFocusIn` (W8) auto-expands on focus-into-dock; in `manual` W8 is suppressed,
**and** the full pane is `:inert` when collapsed (`GlassDock.vue:387`), so its controls are not in the
tab order — there is no focus event for the reducer to hook. A manual + collapsed dock whose only
focusable content is the inert full pane is **keyboard-unreachable by construction.** The resolving
seam glass already provides: `#persistent` / `#persistent-end` / `#collapsed` are **never `:inert`**
(`GlassDock.vue:354/429`). Contract:

> In `manual`, the consumer MUST author a focusable disclosure affordance in a never-inert slot
> (`#persistent`/`#collapsed`), treated as a disclosure button (`aria-expanded`, wired to `expand()`).
> Glass guarantees those slots stay keyboard-reachable in both poles; it does not auto-expand on focus
> and provides no fallback. A manual dock with an empty collapsed pole is keyboard-unreachable, and
> avoiding that is the consumer's responsibility.

atlas's `#persistent` crest is the reference implementation (the always-reachable BUTTON that expands
via `useDockCollapse`) — the stance is honest because the blocking consumer already satisfies it.
Non-posture a11y (roles, roving tabindex + Arrow/Home/End, inactive-pane `:inert` reflecting the
consumer-set pole, click-integrity `inert`) is unchanged.

## §Work — the manifest (exact files)

**Glass-ui dock source (the seam):**
- `src/components/dock/composables/useDockShellProps.ts` — `+ DockInteraction` type, `+ interaction?`
  prop, `+ interaction` resolved computed (the `alwaysExpanded ? "auto" : props.interaction ?? "auto"`
  rule, H1), export the type.
- `src/components/dock/composables/useDockState.ts` — `+ interaction` option + `getInteraction()` +
  `isQuiet()`; swap the six env guards W3/W6(outer+dwell)/W7/W8/W9/W11 to `isQuiet()`; `+` top-guard
  in W10; `+` one `interaction` flip watch (`clearTimer`/`clearHoverIntent`). Pole-force guards
  (W1/W2/W4/W5/W13) untouched.
- `src/components/dock/composables/useDockTouchGate.ts` — `alwaysExpanded` param → merged `quiet`
  ref; two `!alwaysExpanded.value` → `!quiet.value` (H4).
- `src/components/dock/GlassDock.vue` — pass `interaction` to `useDockState`; compute `fsmQuiet`
  (`= alwaysExpanded || interaction === "manual"`) + pass to `useDockTouchGate`; `+ :data-interaction`.
- `src/components/dock/composables/useDockSearch.ts` — `armSearch` `onClickCollapsed()` → `expand()`
  (H5).
- `src/components/dock/index.ts` — export `DockInteraction`.
- **Untouched (the seam absorbs them):** `DockLayerGroup`, `useDockHold`, `Slider`, `Popover`,
  `useDockClickIntegrity`, `useDockMorph`, `dockMorphMeasure`, `useDockOverflowFit`, `useScrollChrome`.
  `alwaysExpanded`/`startCollapsed` KEPT.

**Focused tests** (ordinary vitest; jsdom + fake timers; each asserts a **state outcome across a
simulated gesture**, never "the guard returned early"):
- `tests/components/custom/dock/GlassDock.interaction-manual.test.ts` (NEW) — T1–T11, T13–T17 + the
  a11y assertion (the hardened test plan: manual suppression at both poles; imperative operative;
  runtime-flip / stale-timer freeze; the release-grace-at-flip race T16; the `alwaysExpanded+manual`
  → resolves-to-`auto` dead-combination T17; search-arm operative via `expand()` T15; the
  manual+collapsed keyboard-reachability contract — inert full pane unreachable, `#persistent`
  disclosure reachable).
- `tests/components/custom/dock/GlassDock.touch-gate.test.ts` (EXTEND) — T12: `quiet=true` →
  `onTouchStart`+`onTouchEnd` on a collapsed dock calls neither `expand` nor `collapse`.

**Demo story knob:**
- `demo/stories/dock/controls.vue` — add an `interaction="manual"` exemplar: a `<GlassDock
  interaction="manual">` driven by a consumer-owned expand/collapse control pair (a `#persistent`
  disclosure button wired to `dockRef.expand()`/`.collapse()`), demonstrating the free-pole
  consumer-owned posture and the a11y-honest disclosure seam. One story block; no new route.

**MIGRATION.md rows** (`## 7.0.0 (unreleased)`):
- Add `| DockInteraction | type | /dock |` to the new-public-surface additions table (the `/dock`
  cluster, alphabetical, before `UseDockSearchOptions`).
- Add one prose line in the dock area of the 7.0.0 section: the additive `interaction` axis
  (`auto` default = today byte-identical; `manual` = consumer owns posture via `expand()`/`collapse()`,
  every environmental writer suppressed at both poles). Additive — not a break; no alias, no shim.

**Atlas consumer-update coordination** (the KEEP ruling does NOT cut or re-semanticize
`alwaysExpanded`, so no break-migration mark is owed; the ADOPT obligation is recorded as an outbound
on the established channel, and the one-line edit is atlas-tranche-owned):
- `docs/tranches/BI/coordination/atlas-outbound-2026-07-16-dock-interaction-adopt.md` (NEW, glass-ui
  side) — record the ADOPT: atlas adds `:interaction="manual"` at
  `src/platform/chrome/dock/Dock.vue:226`; cures §C.1/PA-3/OF-5; unblocks atlas 7; nothing else in
  atlas changes. (The edit itself lands in atlas's own tranche — the consumer-updates ruling; the
  foreign tree stays read-only save this new coordination mark.)

## §Acceptance

**Gate ruling (user, 2026-07-16 — binding): NO minted proof/gate script, no census tool, no CI line.**
Standing checks = the dev toolchain only. A one-time RED→GREEN differential inside the wave commit
replaces any permanent gate.

- **`vue-tsc`** — `DockInteraction` exported from `/dock`; `interaction?: DockInteraction` typed on
  `DockProps`; the resolved computed types as `ComputedRef<DockInteraction>`. Green.
- **Focused `vitest`** — the manifest's test files. **BORN-RED at HEAD** (no `interaction` prop
  exists; the manual-suppression and dead-combination assertions cannot pass), **GREEN** after the
  seam lands. The differential is quoted in the wave commit; nothing standing is minted.
- **`npm run build`** — the subpath-export policy rides the build (fail-closed); `/dock` emits
  `DockInteraction` in its `.d.ts`. Green.
- Regression floor (T13/T14): `alwaysExpanded=true` still force-pins `pinned` and suppresses
  W3/W6–W11; the existing `auto`-mode `useDockState` behaviour (hover-expand, idle-collapse,
  outside-click-collapse, pin, keepOpen grace) is unchanged.

## §π/DELTA — native-verification debt (rides the visual-sweep phase; no browser this phase)

The manual-mode arms are not fully unit-provable (exhaustive hover/focus/touch DOM suppression + the
live mid-hover flip). Recorded as debt on the visual-sweep phase, NOT counted done:
1. On an `/sci`-style page, mount a `manual` dock and scroll a full page → assert **0 unbidden
   collapsed→hover transitions** across the scroll (§C.1 π/DELTA; settles the OF-5 hover-artefact
   hypothesis from harden.md lane 1). Chrome + Safari, both modes.
2. Live-flip `interaction` auto↔manual mid-hover → assert the pole freezes and only
   `expand()`/`collapse()` move it.
3. Keyboard sweep on a manual dock with a `#persistent` disclosure button → assert Tab reaches it,
   Enter expands, controls become reachable (the H8 a11y contract).
- DELTA: `docs/tranches/BI/audit/visual/W-DOCK-INTERACTION-AXIS-DELTA.md` (filed at the sweep).

## §Obligations

- atlas 7 consumes this at its ADOPT (the outbound mark references this wave by name); the atlas-7
  registry HOLD lifts once atlas binds `:interaction="manual"` and the §C.1 scroll-π is clean.
- The dock spring/motion π obligations (Q003 / FAM-H) are unaffected — this wave adds no spring
  value and no motion retune; it only gates *who writes posture*.
- A fresh `npm run build` before any `/dock` `.d.ts` surface claim.

## §Dispositions

- The `interaction="manual"` axis: **BUILD** (this wave; the single `isQuiet` seam + flip watch +
  merged touch `quiet` + search reroute).
- `alwaysExpanded`: **KEEP — byte-identical** (structural/grid/containment contract; folding mints a
  same-axis `layout="grid"` collision — harden.md lane 3). Not cut, not re-semanticized.
- `startCollapsed`: **KEEP — reused** as the single mount-pole authority for both modes.
- `alwaysExpanded + interaction=manual`: **DEAD COMBINATION KILLED AT THE RESOLUTION POINT**
  (resolves to `"auto"` in `useDockShellProps`; no `data-interaction` stamp; nothing dead reaches the
  FSM — H1/T17).
- The `useDockSearch` `onClickCollapsed`→`expand` reroute: **BUILD** (forced by the design; also
  fixes the latent auto-mode grace-collapse-to-pill bug — H5).
- atlas ADOPT addendum: **OWED — recorded outbound** (atlas-tranche-owned one-line edit; glass-ui
  places only the coordination mark).
- keyframes.js / slides / sci-report: **NO ADDENDUM** (KEEP ruling; kf stays deliberately auto).

## §Two-challenge gate note

Converged **two-consecutive-clean** under the triumvirate dispatch (PROCESS-CODEX §5): RESEARCH
(unknown grade → read-only census of every posture writer W1–W17, the API shape, the alwaysExpanded
adjudication) → HARDEN (suspicious grade → refute-default). HARDEN **REFUTED two RESEARCH claims** and
CORRECTED them: (1) the §4.1 premise "atlas consumes `alwaysExpanded` (6 imports), no addendum owed"
is false — atlas binds it in **zero** templates; the KEEP ruling stands on the *internal* grid/
containment collision, and atlas owes an **ADOPT** addendum (the feature's whole purpose); (2) the
a11y stance was honest-but-under-specified — the manual+collapsed keyboard trap (inert full pane, no
focus event) and its resolving seam (`#persistent`/`#collapsed`) are now named. HARDEN **CONFIRMED**
the mechanism (census complete, no missed writer; the merged touch-`quiet` mandatory; the flip-time
`clearTimer` load-bearing) and added three sharpenings (the fire-time invariant; the dead-combination
killed at the resolution point; the release-grace-at-flip race T16). Net edit surface unchanged from
research except H1's resolution rule. No third challenge is owed — the second pass refuted, corrected,
and confirmed with source-line evidence; the wave is clean.
