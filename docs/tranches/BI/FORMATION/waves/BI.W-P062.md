# BI.W-P062 — Concrete story accessibility

**Status:** SOURCE COMPLETE — NATIVE ACCESSIBILITY REVIEW PENDING; MATRIX SUPERSEDED
**Product slices:** B · mobile reachability; E · copy feedback and touched-surface semantics
**Depends on:** P056, P059, and P060

## Owner ruling

Accessibility remains first-order product behavior, but a generated story-wide mode matrix is superseded. Repair and test the concrete surfaces changed by these slices: shell reachability, not-found semantics, specimen state, executable examples, and copy failure. Do not create mode metadata or a catalogue scanner.

## Product outcome

- Mobile navigation and footer actions remain visible, named, operable, and reachable.
- Unknown routes have a semantic heading and recovery action.
- Touched controls expose their actual state and failure, not decorative or stale readouts.
- Hidden or unmounted family content contributes no focusable descendants.
- Copy success/failure is announced without relying on icon or color alone.

## Exact files

| slice | action | path |
| --- | --- | --- |
| B | modify | `demo/shell/BottomDock.vue` |
| B | modify | `demo/shell/NotFound.vue` |
| B | modify | `tests/demo/landing.test.ts` |
| E | modify | `demo/chassis/code/CodeBlock.vue` |
| E | create | `tests/demo/code-block.test.ts` |

Other files in Slices B, D, and E must preserve native names, focus order, disabled state, and keyboard/pointer parity as part of their normal implementation; they do not need enrollment metadata.

## Required implementation

1. Keep the mobile category trigger accessible only where it is needed; a CSS-hidden desktop duplicate must not remain in the focus tree.
2. Preserve Dialog focus containment and restoration for the mobile category surface.
3. Keep footer actions visible at 390×844 and give icon-only actions precise names.
4. Keep the not-found page to one primary heading and one working recovery action.
5. Add an announced copy-status message for success and Clipboard failure.
6. Use focused unit tests for these semantics; do not infer accessibility from wrapper names or file presence.

## Superseded work

- `demo/stories/manifest/schema.ts` mode enrollment.
- A story-wide accessibility matrix.
- Story discovery scanners and fixed arm counts.
- Playwright accessibility scenarios.
- A terminal sweep that postpones obvious component semantics.

## Native-browser acceptance

At the major Slice C–E boundary, use the native in-app browser to check:

- keyboard traversal through the routed page and footer;
- open, close, Escape, and focus restoration for the mobile category dialog;
- no focusable content in hidden/unmounted family faces;
- 390×844 visibility and usable target sizes;
- reduced-motion comprehension;
- code overflow and copy success/failure announcements.

Do not use Playwright. If the native browser is unavailable, report the missing review without substituting another harness.

## Scope boundary

Unrelated components retain their owning component tests and are not reopened by this wave.
