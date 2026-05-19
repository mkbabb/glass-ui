# Q.W3 Lane C — dropdown scoped-style migration + `beec35e` dock-duplication dedup

**Lane**: Q.W3 Lane C — Q-coh-3 + Q-coh-5.
**Date**: 2026-05-18.
**Bounds**: `src/styles/dock.css`, `src/components/ui/dropdown-menu/`, `src/styles/floating-panel.css`.

---

## Charter

Two cohesion items, one cohesive commit:

- **Q-coh-3** (per Qβ-F3) — `DropdownMenuContent.vue` + `DropdownMenuSubContent.vue` carried
  a lone scoped `<style>` block (`font-family: var(--dropdown-menu-font, inherit)`) — the
  ONLY scoped style in an otherwise fully-global menu family (Context-, Select-, HoverCard-,
  Combobox- content surfaces are all 100% global CSS). Migrate the rule to the canonical
  menu-family global stylesheet so the family is uniformly global-CSS.

- **Q-coh-5** (per Qδ R2) — `beec35e` patched the inactive-layer `visibility:hidden`
  hit-test fix into TWO parallel rule-sets in `dock.css` (`.dock-layer` and
  `.dock-layer-item-host`), copy-pasting the identical paint+hit-test contract verbatim.
  The commit message called `.dock-layer` "legacy" — a Q6 (no-legacy-code) violation.
  Determine which selector is canonical; consolidate to ONE expression of the contract.

---

## Q-coh-3 — dropdown scoped-style migration

### Target stylesheet

`src/styles/floating-panel.css` — the menu-family / teleported-portal surface home
("teleported action menus, swatch popovers"; `index.css` cascade slot 8). It is the
correct global home for the `DropdownMenu*Content` surfaces, which are themselves
teleported portal menus. (`utilities.css` carries the sibling `.popover-content` recipe,
but that file is owned by a parallel W3 lane and is out of this lane's bounds; the
floating-panel stylesheet is the in-bounds, semantically-correct menu-family home.)

### What migrated

The scoped block on each SFC compiled to a per-component `.dropdown-menu-content[data-v-*]`
selector. It is replaced by one grouped global rule in `floating-panel.css`:

```css
.dropdown-menu-content,
.dropdown-sub-content {
    font-family: var(--dropdown-menu-font, inherit);
}
```

Both SFCs already apply the bare classes `dropdown-menu-content` / `dropdown-sub-content`
via their `cn(...)` class lists, so the global rule binds to the identical elements.

### Preserved token form (Qθ binding constraint)

The declaration is preserved **verbatim** — `font-family: var(--dropdown-menu-font, inherit)`.
`value.js` overrides `--dropdown-menu-font` to `var(--font-mono)`; dropping the `, inherit`
fall-through, or renaming the token, would silently revert consumers' mono-font dropdowns to
inherited serif. The token is a `var()` custom property — resolved at use-time, unaffected
by selector layer or specificity — so the override binds identically post-migration.

### Cascade equivalence

The rule is placed **unlayered** in `floating-panel.css`, matching the retired scoped block
(Vue scoped `<style>` blocks are also unlayered). The migrated selector is `0,1,0`
specificity vs the scoped block's `0,2,0` (the `[data-v-*]` attribute) — strictly lower —
but no other rule sets `font-family` on these two surfaces anywhere in `src/`, so the
cascade *effect* is identical: the rule is uncontested. The empty scoped `<style>` blocks
were deleted from both SFCs.

---

## Q-coh-5 — `beec35e` dock-duplication dedup

### Which selector is canonical

Both are live, and they are NOT duplicates of one primitive — they are two distinct
dock-layer surfaces:

- **`.dock-layer`** — GlassDock's built-in two-layer grid. `GlassDock.vue:281,287` renders
  `dock-layer dock-layer--full` and `dock-layer dock-layer--summary` with the `layer-active`
  state class. This is the default-slot + collapsed-slot crossfade documented in CLAUDE.md.
  **It is live and canonical — NOT legacy.** The `beec35e` commit message's "legacy
  `.dock-layer`" label was simply wrong; correcting that framing is itself the Q6 fix.

- **`.dock-layer-item-host`** — the `DockLayer` inside a `DockLayerGroup`. `DockLayer.vue:47`
  renders `dock-layer-item-host` with the `is-active` / `is-leaving` state classes. Also
  live; a different feature (multi-layer composition).

So neither rule-set is dead — deleting one is not the answer. The genuine duplication
`beec35e` introduced is the **identical active/inactive/leaving paint + hit-test contract**
copy-pasted into both rule-sets: same `visibility` declarations, same delayed-`visibility`
transition, same inline rationale comment twice.

### What was consolidated

The shared crossfade + hit-test contract is now expressed ONCE over both state
vocabularies via grouped selectors:

- `.dock-layer, .dock-layer-item-host` — base delayed-`visibility` transition.
- `.dock-layer:not(.layer-active), .dock-layer-item-host:not(.is-active):not(.is-leaving)`
  — the inactive state: `opacity:0; visibility:hidden; pointer-events:none` (out of paint
  AND hit-test, the dead-control fix).
- `.dock-layer.layer-active, .dock-layer-item-host.is-active` — active: visible immediately,
  no deferred `visibility`.
- `.dock-layer-item-host.is-leaving` — leaving: inactive for hit-test, still painted through
  the fade-out. (`.dock-layer` has no separate leaving state; its `:not(.layer-active)`
  rule's delayed-`visibility` transition covers its crossfade-out.)

Each rule-set retains ONLY its genuinely-distinct base layout: `.dock-layer` keeps its
`flex` + `grid-area` + `height`; `.dock-layer-item-host` keeps its `grid-area` +
`width: max-content` active-width contract. The duplicated contract — and the duplicated
multi-line rationale comment — is retired. A future change to the hit-test contract lands
once.

The DockTabButton `--dock-tab-h` comment (`dock.css:739`) was already updated by the
sibling W3 Lane A density-consolidation; no Lane C edit there.

---

## Verification

- `npm run typecheck` — the ONLY errors are `Card.test.ts` referencing `../../cartoon-card`
  + `../../scroll-pane`, which is the in-flight W3 Lane H package retirement (parallel lane,
  not Lane C's surface). Zero errors on any dropdown-menu or dock file.
- `npx vitest run` — 366 passed; the one failure (`primitives/scroll-pane` story smoke) is
  the same in-flight W3 Lane H retirement. No dock or dropdown test regressed (there are no
  dedicated dock/dropdown test files; the smoke + structural suites that exercise dock pass).
- Dropdown font rule — resolves identically: the migrated global rule binds to the same
  `.dropdown-menu-content` / `.dropdown-sub-content` elements, with the `var(--dropdown-menu-font,
  inherit)` declaration verbatim, uncontested by any other `font-family` rule. value.js's
  `--dropdown-menu-font: var(--font-mono)` override still applies.
- Dock hit-test fix — the inactive-layer `visibility:hidden` contract now applies via
  exactly ONE rule-set (the grouped `:not(.layer-active), :not(.is-active):not(.is-leaving)`
  selector). Both `.dock-layer` and `.dock-layer-item-host` consumers inherit the dead-control
  fix; the FLIP-measurement layout-flow guarantee is preserved (`visibility`, not `display`).

---

## Verdict

**PASS.** Q-coh-3: the menu family is now uniformly global-CSS — the lone scoped exception
is retired into `floating-panel.css` with the `--dropdown-menu-font` token form preserved
verbatim. Q-coh-5: the `beec35e` duplication is consolidated to one expression of the
crossfade + hit-test contract; both `.dock-layer` (live, canonical — the false "legacy"
framing corrected) and `.dock-layer-item-host` (live) share it, neither deleted, neither
mislabelled. No legacy code, no workaround, no duplicate rule-set.
