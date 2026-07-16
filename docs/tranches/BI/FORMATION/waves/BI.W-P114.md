# BI.W-P114 — HeaderRibbon persistent command band

**Status:** DONE
**Owner:** glass-ui

## Product ruling

Retain `HeaderRibbon` because Keyframes consumes its public
`@mkbabb/glass-ui/header-ribbon` boundary. It owns one persistent corner toolbar with an
anchor and action row; no second layout wrapper, timeout lifecycle, or styling authority
survives.

## Landed contract

- Public props: `placement?: "left" | "right"`, `ariaLabel?: string`, and `class`.
- Public slots: `anchor` with `{ pinned }`, and `items`.
- Semantic state: `data-placement`, `data-expanded`, and `data-pinned` on the named
  `role="toolbar"` owner.
- Pointer or focus presence reveals actions. Touch does not emulate hover; native anchor
  activation pins/unpins the row. `Escape` collapses it and returns focus to the anchor.
- Placement reverses presentation only. DOM and action order remain stable.
- One colocated stylesheet consumes the shared functional glass `Surface`, motion tokens,
  coarse-pointer geometry, forced-colors boundary, and live reduced-motion query.

## Clean breaks

- `position` remains the already-ruled 5.0 rename to `placement`; no alias is restored.
- `hideTimeoutMs` is removed. Presence owns collapse directly.
- The duplicate anchor-slot `toggled` state is removed; use `pinned`.
- The unused `left` slot is removed; compose unrelated content beside the ribbon.

## Consumer handoff

Keyframes `EditorShell.vue` keeps the subpath, `items` slot, and `anchor` slot. Its exact
source migration is `position="right"` to `placement="right"` and
`#anchor="{ pinned, toggled }"` to `#anchor="{ pinned }"`.

## Verification

Focused component contracts cover toolbar semantics, placement, one action owner,
focus-presence continuity, mouse reveal, touch pinning, inert collapsed actions, and
Escape focus return. Source/demo typechecks and iterative build are the release-boundary
checks. Native browser review is required when the in-app browser backend is available;
no substitute browser harness is introduced by this wave.
