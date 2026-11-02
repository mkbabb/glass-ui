# 10.1.4 — fix 2 (round 2)

Fix seat: claude-opus-5-5. Branch `release/10.1.4` from 8d034c66e. Defects: `critique-2.md`
F-2 and F-3. Cure: `e5c5436a9`. Witnesses: `bcf3ae07c`. Ratchet rebind: `a7bcd1f49`.

## F-2: a deck in a fixed or absolute overlay lost slide geometry

Root cause: a named page starts a sheet only from a box in normal flow. fix-1 handed the
deck's page to `<body>` only for the top layer (`:modal`, `:popover-open`). Any other
out-of-flow ancestor takes the stage out of flow the same way: the library's own
`DialogContent` (a reka portal with a `position: fixed` plate), a consumer's fixed
presenter layer, a non-modal `<dialog open>` (UA `position: absolute`). A selector cannot
see an out-of-flow ancestor, so no list of overlays closes the class.

Cure (critique-2 option 1): the document takes the deck's page whenever a stage is
present. `page: deck` joins the gated document reset, on `:root:has([data-slot="deck-stage"])`
and its `body`. The top-layer rule is deleted. The stage keeps its own `page: deck`.

Every page with a deck prints at slide geometry whatever wraps the stage, as at 10.1.3.
A page without a deck prints on the reader's paper, which is the O-119 (f) cure. The cost
is the one critique-2 names: prose before an in-flow deck prints on slide sheets again
(as at 10.1.3, not a regression), and a hidden (`v-show`) deck now takes the page geometry
as well as the resets (critique-1 O-1, also 10.1.3's behavior for every page). The
CHANGELOG says so.

## F-3: a consumer's `@page` resized the deck's sheets

Root cause, in two parts, both measured in Chromium with `page.pdf` on `setContent` pages
(`.claude/worktrees/10.1.4-logs/f2-probe/page.mjs`):

1. `@page deck` sat in `@layer components`, and a layered page rule loses to an
   unlayered `@page` before page-selector specificity counts (the critic's cause).
2. Even unlayered, Chromium lets a later stylesheet's unnamed `@page` size beat the named
   page's specificity. In one sheet `@page deck` wins in either order. In two sheets the
   later `@page { size: A4 }` wins (`twoSheetsNoMedia`: 595x842). A consumer's sheet
   loads after the library, so moving the rule out of the layer (critique-2's proposed
   disposition) does not cure it. A first attempt did that and the page.pdf cell stayed
   RED. It also broke the repo's own gate (`orphan-css-partial`: every top-level rule sits
   in an `@layer`).

Cure: `@page deck` stays in `@layer components`, and its `size` and `margin` are
`!important`. A layered important declaration beats every normal one and an unlayered
important one. Probe: 960x540 with the consumer sheet first, last, or `!important` on its
own `size`. A page without a deck keeps the consumer's A4 (`layeredNoDeckConsumer`). The
capture block already pins the deck's print geometry with `!important` in the same layer.

## Witnesses (`tests-visual/release-10-1-4.spec.ts`, harness scenes added)

Scenes: `print-deck-glass-dialog` (`<Dialog open><DialogContent>`), `print-deck-fixed`,
`print-deck-nonmodal`, `print-deck-consumer-page`, `print-plain-consumer-page`. RED is
the spec and harness at the branch head with `capture.css` at 8d034c66e.

| cell | Chromium 8d034c66e | Chromium fix | WebKit 2287 8d034c66e | WebKit 2287 fix |
|---|---|---|---|---|
| in-flow deck: a `page: deck` rule matches `<body>` (was fix-1's control, inverted by design) | RED | GREEN | RED | GREEN |
| glass `Dialog` / fixed overlay / non-modal dialog: a `page: deck` rule matches `<body>` (Chromium also computed `page` = `deck`), resets apply | RED x3 | GREEN x3 | RED x3 | GREEN x3 |
| page.pdf: those three print every sheet at 960x540 pt | RED x3 (612x792) | GREEN x3 | skip | skip |
| `@page deck` margin priority `important` (size priority too, in Chromium) | RED | GREEN | RED | GREEN (margin) |
| page.pdf: consumer `@page { size: A4; margin: 14mm 12mm }` + deck prints 2 x 960x540 | RED (595x842) | GREEN | skip | skip |
| page.pdf: the same consumer `@page`, no deck, prints A4 (control) | GREEN | GREEN | skip | skip |

WebKit 2287 parses `size` in a page rule but reports no priority for it, and serializes
`@page deck { size: 1280px 720px; margin: 0px !important; }`
(`f2-probe/wk.mjs`). The size priority is therefore read in Chromium only, and the
cross-engine cell reads the margin priority. Whether WebKit's cascade keeps `!important`
on `size` cannot be measured without a print path (no `page.pdf`). Whether Safari applies
named pages at all is still unmeasured, as implement.md says.

## Gates (committed tree a7bcd1f49; the last WebKit amendment touches only the spec)

| gate | result |
|---|---|
| `npm run typecheck` (guarded `--light`) | exit 0 |
| `npm run build` (guarded) | exit 0 |
| `npm run demo:dist:build` (guarded) | exit 0 |
| `npx vitest run --maxWorkers=2` (guarded) | 247 files, 2396 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` (guarded) | ratchet refused a shrink (2940247 < 2940313, -66 B: the top-layer rule deleted). Rebound down on the committed tree (`a7bcd1f49`), then terminal CLEAN |
| `release-10-1-3.spec.ts` + `release-10-1-4.spec.ts`, Chromium | 78/78 GREEN (`f2-green-chromium.json`) |
| RED, `release-10-1-4.spec.ts` on 8d034c66e's `capture.css`, Chromium | 9 failed (the 9 new cells), 9 passed (`f2-red-chromium.json`) |
| RED, the same, WebKit 2287 (`guarded --exclusive webkit`) | 5 failed (the 5 non-pdf cells), 8 skipped, 5 passed (`f2-red-webkit.json`) |
| RED, the priority cell as amended for WebKit's serialization, on 8d034c66e's `capture.css` | 1 failed in Chromium, 1 failed in WebKit (`f2b-red-*.json`) |
| `release-10-1-3.spec.ts` + `release-10-1-4.spec.ts`, WebKit 2287 (`guarded --exclusive webkit`) | 68 passed, 10 skipped (8 page.pdf, 2 CDP swipe), 0 failed (`f2b-green-webkit.json`) |
| `release-10-1-4.spec.ts`, Chromium, after the WebKit amendment | 18/18 GREEN (`f2b-green-chromium.json`) |

No export or token moved. `src/` changes only the print block of `capture.css`.

Logs: `.claude/worktrees/10.1.4-logs/f2-*` and `f2b-*`.
