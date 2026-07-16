# BI.W-P114 — HeaderRibbon persistent command band

**Status:** REOPENED — source, focused suite (22), typecheck, build, and strict declaration
close are green; the left/right wide/narrow native matrix and two independent post-edit
challenges remain owed before this is genuinely terminal.
**Owner:** glass-ui

## Product ruling

Retain `HeaderRibbon` because Keyframes consumes its public
`@mkbabb/glass-ui/header-ribbon` boundary. It owns one persistent corner toolbar with an
action row and, only in collapsible mode, one disclosure anchor; no second layout wrapper,
timeout lifecycle, or styling authority survives.

## Landed contract

- Public props form one discriminated behavior contract. Omitted or
  `mode="persistent"` keeps the action row expanded from first paint;
  `mode="collapsible"` requires a non-empty `anchorLabel`. Both modes accept
  `placement?: "left" | "right"`, `ariaLabel?: string`, and `class`.
- Public slots are `items` and an optional decorative `anchor` with `{ pinned }`.
  In collapsible mode the ribbon owns the named native disclosure button; slot
  content never decides behavior or supplies the focus target.
- Semantic state: `data-placement`, `data-expanded`, and `data-pinned` on the named
  `role="toolbar"` owner.
- Pointer or focus presence reveals actions. Touch does not emulate hover; native anchor
  activation pins/unpins the row. `Escape` unpins and returns focus to the anchor; focus
  presence keeps the row revealed until focus leaves.
- Placement reverses presentation only. DOM and action order remain stable.
- One colocated stylesheet consumes the shared functional glass `Surface`, motion tokens,
  coarse-pointer geometry, forced-colors boundary, and live reduced-motion query.

## Clean breaks

- `position` remains the already-ruled 5.0 rename to `placement`; no alias is restored.
- `hideTimeoutMs` is removed. Presence owns collapse directly.
- The duplicate anchor-slot `toggled` state is removed; use `pinned`.
- The unused `left` slot is removed; compose unrelated content beside the ribbon.

## Consumer handoff

Keyframes `EditorShell.vue` keeps the subpath and `items` slot, and declares its action-only
composition as `mode="persistent" placement="right"`. It supplies no disclosure anchor.

## Verification

Focused component contracts cover toolbar semantics, placement, one action owner,
first-render and mode-transition truth, focus-presence continuity, mouse reveal, touch
pinning, inert collapsed actions, and Escape focus return. Source/demo typechecks and
iterative build are the release-boundary checks. Native browser review is required when
the in-app browser backend is available; no substitute browser harness is introduced by
this wave.

## Outstanding at handoff

- The mode-departure focus-drop (collapsible→persistent while the owned anchor holds focus)
  is fixed and covered by a dedicated contract test; a second test pins the relabel-preserves-pin
  invariant (a same-mode `anchorLabel` change keeps pin, expansion, and focus, guarding the
  deliberate emptiness-only watch source). The focused suite is 23 passing cases. Green:
  typecheck, `npm run build` (69 declaration entries), `npm run verify:package` (211 targets /
  510 declarations / 109 CSS / 69 strict imports, zero unowned roots).
- The strict package verifier now applies the same direct-dependency-ownership check to bare
  CSS `@import` specifiers that it already applies to declaration references, closing an
  asymmetric gap where a shipped `@import "unowned-pkg/x.css"` passed green yet would break a
  packed consumer. Proven fail-loud against a synthetic unowned bare `@import`; baseline
  unchanged (no bare CSS imports are currently emitted).
- Owed before terminal: the left/right, wide/narrow native browser matrix (first paint,
  hover/focus/click/touch pin, Escape return, dynamic persistent↔collapsible transitions) and
  two independent post-edit challenge passes.
