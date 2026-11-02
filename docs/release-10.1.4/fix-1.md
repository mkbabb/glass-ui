# 10.1.4 — fix 1 (round 1)

Fix seat: claude-opus-5-5. Branch `release/10.1.4` from 4b6559d00. Defect: `critique-1.md` F-1.

## F-1: a top-layer deck lost slide geometry

Root cause: a named page starts a sheet only from a block box in normal flow. A stage
inside a modal `<dialog>` is in the top layer, so it is out of flow. Its own
`page: deck` never chooses a sheet, and the document printed on the reader's paper. At
10.1.3 the unnamed `@page` gave every sheet 1280x720, so this case did not show up.

Cure (`src/components/deck/styles/capture.css`, print block): when a stage is in the
top layer, `<body>` takes the deck's page.

```css
:root:has(:modal [data-slot="deck-stage"], :popover-open [data-slot="deck-stage"])
    body {
    page: deck;
}
```

`:modal` covers a modal dialog and a fullscreen element. `:popover-open` covers an open
popover. An in-flow stage leaves `<body>` on its own page, so prose before a deck still
prints on the reader's paper. The truncation (a top-layer deck prints one sheet of its
slides, the same at 10.1.3) is unchanged. It belongs to W-E.13's print arm, and the
CHANGELOG entry says so.

## Witnesses (`tests-visual/release-10-1-4.spec.ts`, scene `print-deck-dialog`)

| cell | Chromium 4b6559d00 | Chromium fix | WebKit 2287 4b6559d00 | WebKit 2287 fix |
|---|---|---|---|---|
| modal deck: a `page: deck` print rule matches `<body>` (Chromium also reads computed `page` = `deck`) | RED | GREEN | RED | GREEN |
| in-flow deck: no `page: deck` rule matches `<body>` (control) | GREEN | GREEN | GREEN | GREEN |
| `page.pdf`: modal deck prints every sheet at 960x540 pt | RED (612x792) | GREEN | skip | skip |

WebKit does not serialize computed `page`, so the cross-engine read asks the CSSOM
instead: does some `page: deck` style rule's selector match `<body>`?

## Gates

| gate | result |
|---|---|
| `release-10-1-4.spec.ts`, Chromium | 9/9 GREEN; 2 RED at 4b6559d00 (the two dialog cells) |
| `release-10-1-4.spec.ts` + `release-10-1-3.spec.ts`, WebKit 2287 (`guarded --exclusive webkit`) | 64 passed, 5 skipped (3 page.pdf, 2 CDP swipe); 1 RED at 4b6559d00 |
| `release-10-1-3.spec.ts`, Chromium | 60/60 GREEN |
| `npm run build` (guarded) | exit 0, on the committed tree |
| `npm run typecheck` (guarded `--light`) | exit 0 |
| `npm run demo:dist:build` (guarded) | exit 0 |
| `npx vitest run --maxWorkers=2` (guarded) | 247 files, 2396 passed, 10 expected fail, 1 skipped (re-run after the demo build: the boot-graph gate refuses a dist-demo older than its sources) |
| `npm run verify:package` (guarded) | ratchet refused +99 B (2940313 > 2940214). Rebound on the committed tree, then terminal CLEAN |

No export or token moved: the change is one print-only rule in `capture.css`.

Logs are in `.claude/worktrees/10.1.4-logs/`: `f1-red-chromium.log`,
`f1-red-webkit.log`, `f1-green-chromium.log`, `f1-green-webkit.log`,
`f1-rel1013-chromium.log`, `f1-build-committed.log`, `f1-typecheck.log`,
`f1-demo-build.log`, `f1-vitest.log`, `f1-verify.log`.
