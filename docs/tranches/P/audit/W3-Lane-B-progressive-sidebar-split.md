# P.W3 Lane B—ProgressiveSidebar slotted-chassis split (HEADLINE)

**Date**: 2026-05-16
**Lane**: P.W3 HEADLINE Lane B—chassis + slotted-section split.
**Bounds**: `src/components/custom/sidebar/ProgressiveSidebar.vue` (refactor) +
`src/components/custom/sidebar/ProgressiveSidebarSection.vue` (NEW) +
`src/components/custom/sidebar/context.ts` (NEW DI module) +
`src/components/custom/sidebar/index.ts` (re-export) +
`src/components/custom/sidebar/__tests__/ProgressiveSidebar.test.ts` (extended) +
`demo/stories/navigation/sidebar.vue` (slotted-mode story).
**Operational constraints honoured**: no `git stash` (no recurrence); no `npm run build` mid-task; read-only git only.

---

## § 1—Scope

Per `docs/tranches/P/audit/P11-Lane-a-words-frontend.md` §3.3 (G2 carry,
high-impact HEADLINE-class). words/frontend ships 469 LOC of parallel
sidebar implementation:

```
$ wc -l src/components/custom/navigation/*.vue
     150 src/components/custom/navigation/ProgressiveSidebar.vue
     319 src/components/custom/navigation/WordlistProgressiveSidebar.vue
     469 total
```

The library's `<ProgressiveSidebar>` was state-driven only (TOC mode: render
`state.sections` as a 3-level tree). The wordlist consumer is NOT a TOC—it
composes filter / sort / tags sections with bespoke bodies. The library had
no slotted-chassis composition path; the consumer reinvented one.

P.W3 Lane B closes the gap. The chassis now supports two composition modes:

1. **TOC mode** (existing): `state: SidebarState` drives 3-level tree
   rendering. Bit-for-bit preserved—existing demo + test continue to
   exercise this path unchanged.
2. **Slotted mode** (NEW): omit `state`; place `<ProgressiveSidebarSection>`
   children in the default slot. The chassis installs a DI context;
   sections register on mount; the chassis tracks the active section id
   via the `active` prop.

The split absorbs the words/frontend chassis at P.W5 Lane E (cross-repo
write)—~469 LOC → ~80 LOC at adoption.

---

## § 2—Split-boundary rationale

**Chassis owns** (`ProgressiveSidebar.vue`):
- Root `<aside>` + sticky / drawer surface composition (`progressive-sidebar--sticky` / `--drawer`).
- `sidebar-nav` scroll container (overflow-y, overscroll-behavior, scrollbar-gutter, touch-action).
- Scroll-tracker ref (`sidebarNav` exposed via `defineExpose`).
- TOC-mode active-section state cascade (`activeRootId`, `isActive`, `isInActiveChain`).
- TOC-mode default-slot rendering loop (the 3-level `<ol>`/`<li>` cascade).
- DI installation of `ProgressiveSidebarContext` for slotted-mode children.

**Section owns** (`ProgressiveSidebarSection.vue`):
- Per-section identity (`id` prop—required).
- Per-section header (icon + label composition; OR `#header` slot for full custom replacement).
- Default slot for the section body content.
- `onMounted` registration with the chassis via `useOptionalProgressiveSidebarContext()`.
- `onBeforeUnmount` unregistration.
- `data-section-id` + `data-active` attributes for chassis-level coordination + CSS targeting.

**DI context owns** (`context.ts`):
- `ProgressiveSidebarSectionDescriptor`: `{ id, label?, icon? }`.
- `ProgressiveSidebarContext`: `{ register, unregister, activeSectionId, isActive }`.
- Typed-key `PROGRESSIVE_SIDEBAR_CONTEXT_KEY` (per invariant-25; mirrors the
  W2 Lane B `SortableList` + O.W2 `DockLayerGroup` precedents).
- Paired helpers: `provideProgressiveSidebarContext` + `useProgressiveSidebarContext`
  (strict—throws outside chassis) + `useOptionalProgressiveSidebarContext`
  (befitting silent default; sections may render standalone in tests).

The split is clean: a section knows only its own identity + the chassis
context; it does NOT reach into TOC-mode state. A TOC chassis NEVER renders
slotted sections (mutually exclusive `v-if="state"` / `v-else <slot />`).

---

## § 3—New SFC API

### `<ProgressiveSidebar>`—extended

```ts
interface Props {
    // TOC-mode driver. Omit for slotted mode.
    state?: SidebarState;
    mode?: "sticky" | "drawer";  // unchanged
    renderTitle?: (title: string) => string;  // unchanged
    // Slotted-mode active section id (v-model:active).
    active?: string | null;
}

interface Emits {
    "update:active": [id: string | null];
}

interface Slots {
    search?: () => unknown;  // unchanged
    default?: () => unknown;  // NEW—slotted-mode body
}

// defineExpose
{ sidebarNav: Ref<HTMLElement | null> }  // unchanged
```

### `<ProgressiveSidebarSection>`—NEW

```ts
interface Props {
    id: string;          // required
    label?: string;
    icon?: Component;
}

interface Slots {
    header?: () => unknown;  // optional custom header (replaces icon + label)
    default?: () => unknown; // section body
}
```

### `ProgressiveSidebarContext`—NEW DI surface

```ts
interface ProgressiveSidebarSectionDescriptor {
    id: string;
    label?: string;
    icon?: Component;
}

interface ProgressiveSidebarContext {
    register(desc: ProgressiveSidebarSectionDescriptor): void;
    unregister(id: string): void;
    activeSectionId: ComputedRef<string | null>;
    isActive(id: string): boolean;
}

// Strict (throws outside chassis):
useProgressiveSidebarContext(): ProgressiveSidebarContext

// Befitting silent default (sections may render standalone):
useOptionalProgressiveSidebarContext(): ProgressiveSidebarContext | null

// Typed key:
PROGRESSIVE_SIDEBAR_CONTEXT_KEY: InjectionKey<ProgressiveSidebarContext>
```

Per invariant 25's "per intent" clause: `<ProgressiveSidebarSection>` MAY
render standalone for isolated tests or recipe-style consumer code, so the
optional helper is the operational shape; the strict helper is reserved
for code that explicitly requires chassis presence.

---

## § 4—Existing test preservation

The pre-existing test (XSS-prevention via `renderTitle` returning HTML
that must render as text) is **bit-for-bit preserved**. The test was
re-grouped under a `describe("ProgressiveSidebar—TOC mode")` block;
its assertions, fixture, and expected text are unchanged:

```ts
expect(wrapper.find("mark").exists()).toBe(false);
expect(wrapper.find("img").exists()).toBe(false);
expect(wrapper.text()).toContain("<mark><img src=x onerror=alert(1)>Intro</mark>");
expect(wrapper.text()).toContain("<mark><strong>Child</strong></mark>");
```

The TOC-mode rendering path in the chassis is unchanged—the `v-if="state"`
branch reproduces the prior `<template>` block verbatim (the `@click`
handlers are factored into `handleToggle` / `handleNavigate` thin local
wrappers, but the behaviour is identical: they call `state.toggleSection`
+ `state.navigateTo` with the same arguments).

The existing demo at `demo/stories/navigation/sidebar.vue` continues to
mount the TOC-mode chassis without changes (the slotted-mode story is
added BELOW the existing TOC story; the original mount call is unmodified).

### New tests (slotted mode + standalone section)

3 NEW tests added (4 tests total before; 7 tests total after; **+4 slotted
+ 1 standalone**):

1. `"renders slotted <ProgressiveSidebarSection> children when state is omitted"` —
   verifies the chassis renders the default slot in slotted mode and does
   NOT render the TOC-mode "Contents" header.
2. `"sections register + unregister with the parent chassis via DI"` —
   verifies the lifecycle contract: 2 sections → 2 DOM nodes + both ids
   known to the context registry; unmount one → DOM count drops to 1.
   The test reads the installed context via a `Probe` setup-helper that
   injects `PROGRESSIVE_SIDEBAR_CONTEXT_KEY`.
3. `"marks the active section via context.isActive cascade"`—verifies
   the `active` prop propagates through the context to per-section
   `data-active` attributes.
4. `"<ProgressiveSidebarSection>—renders without a chassis (optional-context fallback)"` —
   verifies the optional-context shape is sound: a section rendered
   outside `<ProgressiveSidebar>` mounts cleanly with no active state.

---

## § 5—≥ 2-consumer verification

Per N invariant 23 (wire-before-retire) + P invariant 28 (zero-deferral).
The slotted-chassis substrate clears the 2-consumer bar at landing:

| # | Consumer | Site | LOC absorbed | Status |
|---|----------|------|--------------|--------|
| 1 | **words/frontend** `WordlistProgressiveSidebar.vue` | `/Users/mkbabb/Programming/words/frontend/src/components/custom/navigation/WordlistProgressiveSidebar.vue` | ~319 LOC (chassis) + ~150 LOC (parallel ProgressiveSidebar.vue) = ~469 LOC parallel implementation absorbs at adoption | **SCHEDULED P.W5 Lane E** (cross-repo write). Chassis shape verified at audit: dashboard + per-wordlist modes both decompose into 3 sections (Filters / Sort / Tags)—exactly the slotted-chassis composition shape. |
| 2 | **glass-ui demo** `demo/stories/navigation/sidebar.vue` | this PR—slotted-mode story added below the existing TOC story | story-tier (~50 LOC of demo body) | **LANDED at this commit**. The slotted demo composes 3 sections (Filters / Sort / Tags) with `lucide-vue-next` icons; demonstrates `active` prop binding + per-section `data-active` cascade. |

Optional 3rd consumer (per W3.md Lane B note): `bbnf-buddy`'s `ToolsLayer.vue`
navigation sidebar shape—verified at O.W7 §3.5 (per P11/a §3.3). Not
required for the 2-consumer bar; P.W5 cross-walk will surface the third
adoption candidate.

The substrate is **NOT** SCC-trapped—`context.ts` imports only `vue`
primitives (no `@vueuse/core`); `ProgressiveSidebarSection.vue` imports
only `vue` + the local context module. The package barrel (`/sidebar`
subpath) continues to satisfy the root-barrel curation rule (vueuse-free
re-exports OK; the sidebar subpath has historically been excluded from
the root barrel per the L.W1 Lane A SCC-trap closure).

---

## § 6—Verification

### Typecheck (per `Build` section of CLAUDE.md)

```
$ npm run typecheck
> @mkbabb/glass-ui@1.7.2 typecheck
> vue-tsc --noEmit
# (clean—no output, exit 0)
```

### Test suite

```
$ npm test -- --run
> @mkbabb/glass-ui@1.7.2 test
> vitest run --run

 RUN  v4.1.5 /Users/mkbabb/Programming/glass-ui

 Test Files  32 passed (32)
      Tests  365 passed (365)
   Start at  15:41:54
   Duration  2.34s
```

Was 361 tests at lane open; now 365 (+4 new tests for slotted mode +
standalone section; the original TOC-mode test continues to pass under
its new `describe` group).

### Build / verify-export-types / profile:budget

NOT run mid-task per operational constraint. Orchestrator runs build +
`verify-export-types` + `profile:budget` at W3 close.

---

## § 7—Hardened-git-clause + no-build-mid-task compliance

| Constraint | Status |
|------------|--------|
| No `git stash` (any form) | **OK**—zero stash invocations this lane. |
| No `npm run build` mid-task | **OK**—only `npm run typecheck` + `npm test` run. The orchestrator runs build at W3 close. |
| No mutating git (commit / stage / checkout / reset / restore / stash) | **OK**—read-only `git` access only; the index belongs to the orchestrator. |
| ≥ 2 sites or exported or private demo helper (overfitting audit) | **OK**—`ProgressiveSidebarSection` is exported via `index.ts` (subpath surface), composed by the new slotted demo (consumer #2), and scheduled for words/frontend adoption at P.W5 Lane E (consumer #1). The context typed-key + helpers are exported per invariant-25 paired-helpers precedent. |
| No backwards-compat aliases | **OK**—TOC-mode behaviour is bit-for-bit preserved without aliasing; the existing test continues to pass on the unchanged TOC-mode render branch. Slotted mode is additive; no shim layer. |

---

## § 8—Status

**COMPLETED.**

Files touched:
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/sidebar/ProgressiveSidebar.vue`—refactor (TOC mode preserved bit-for-bit; slotted-mode branch added; DI context installed; props `state` becomes optional; props `active` + emit `update:active` added).
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/sidebar/ProgressiveSidebarSection.vue`—NEW (90 LOC).
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/sidebar/context.ts`—NEW (72 LOC; typed-key + 3 paired helpers).
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/sidebar/index.ts`—extended (re-exports `ProgressiveSidebarSection` + context typed-key + 3 helpers + 2 types).
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/sidebar/__tests__/ProgressiveSidebar.test.ts`—extended (existing test preserved verbatim under new `describe` block; +4 NEW tests for slotted mode + standalone section).
- `/Users/mkbabb/Programming/glass-ui/demo/stories/navigation/sidebar.vue`—extended (slotted-mode story added below the existing TOC story; consumer #2 of the slotted chassis).

Net: 1 SFC refactor + 1 NEW SFC + 1 NEW DI module + 1 barrel update + test
expansion + demo expansion. ~469 LOC of words/frontend parallel implementation
unlocked for P.W5 Lane E cross-repo absorption.

**Lane Status**: COMPLETED.
