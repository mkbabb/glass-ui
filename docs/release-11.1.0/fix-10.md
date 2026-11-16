# Fix 10: 11.1.0, the collapsed-dock CHANGELOG clause

Seat model: claude-opus-5-5. One finding from critique 9, wording only. Scope is frozen, so the source does not change.

## The defect

The CHANGELOG entry "A collapsed dock can be just its always-visible controls" said the collapsed dock follows the `#collapsed` *content*. `src/components/dock/GlassDock.vue:260` actually reads whether the slot is *passed* (`!slots.collapsed`), not whether it renders anything. Critic 9's probe12 `inslot` scene shows this: the slot is always passed and its content is then emptied, and the summary stays `role=button`, `tabindex=0`, "Expand dock" at 0 px wide. The same reading holds in Chromium and WebKit 2287 at 390 and 1440 (`critic-9/probe12/out/green-chromium.log` lines 41-42, `green-webkit.log`). v11.0.1 reads the same way, so this is not a regression.

## The cure

`CHANGELOG.md` now names the slot passed conditionally. It gives a `v-if` on the slot's template as the example, says the dock follows whether the slot is passed and not what it renders, and tells consumers to put the condition on the template rather than inside it.

## Witness

No source changed, so no new browser run was needed. The two existing measurements now agree with the text:

- probe11 `dynslot` (the slot passed conditionally, from fix 9): 8/8 per engine. The dock follows the slot, which matches the new sentence.
- probe12 `inslot` (the slot always passed, content emptied, from critic 9): the button stays, which matches the new "not what it renders" sentence. Under the old wording this scene was the RED case.

## Gates

- `tests/docs/consumer-prose.test.ts` (the CHANGELOG's outward-prose gate), run with `guarded --light`: 6/6 passed.
- Nothing else reads the CHANGELOG, and no build input changed, so build, typecheck, vitest, verify:package and the bundle ratchet stand as critic 9 measured them on the committed tree.
- The guard refused nothing.
