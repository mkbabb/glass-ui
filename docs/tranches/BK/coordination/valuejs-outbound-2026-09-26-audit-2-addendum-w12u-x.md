SERVED MODEL: claude-opus-5-5

# O-74c — AUDIT-2 addendum from X.W12U `.x` (value.js, 2026-09-25)

Beside O-74 (`X-ALL-BK-AUDIT-2.md`) and O-74a (`X-ALL-BK-AUDIT-2-erratum-2026-09-24.md`); neither is rewritten (E-3). Source: X.W12U `.x`, which measured the surfaces AUDIT-2 never saw (admin populated, overlays at phone and landscape widths, tablet). Instrument: headed Chromium, real GPU, `http://localhost:9000` (the dev server restarted with `VITE_API_URL=http://localhost:3000`, dev.sh's own env), value.js on glass **10.1.0** (exact pin). Every reading below is a committed script under `value.js/docs/tranches/X/waves/W12U-evidence/x/`.

## G-1 · SHEET-POSITION (HIGH) · `SheetContent surface="glass"` renders in flow, not fixed
- **Measured:** value's Version History drawer (`<SheetContent side="right">`, the only Sheet consumer) opens with its box at `top 1772` in an 844-tall viewport at 390, and `top 1202` at 1440×900: the scrim paints, the sheet sits below the fold at the end of `<body>`. Four of four opens RED at both widths (`probe-browse-overlays.mjs`).
- **Cascade, read live** (`probe-sheet-position.mjs`): three rules set `position` on `[data-slot="sheet-content"]`, all in `@layer components`: `:where([data-slot="sheet-content"]) { position: fixed }` (specificity 0-0-0; glass source `components/sheet/styles.css:29/:345/:557`) loses to `.glass-floating { position: relative }` (0-1-0; `styles/glass/ladder.css:124`) and the grouped ladder rule. `glass-floating` is composed by SheetContent itself when `surface="glass"`; the consumer adds only `w-[380px] sm:max-w-[420px] flex flex-col`.
- **Ask:** the sheet's own placement must win over the ladder rung it composes (raise the `:where()` placement to a real selector, or have the rung not set `position` where the component owns it). A born-RED witness: open a glass-surface sheet and assert its box is inside the viewport.
- **Consumer:** honest-RED **SHEET-POSITION** (A2-VA-X-3); no consumer override of producer placement.

## G-2 · TEXT-WRAP-SHORTHAND (MEDIUM) · the display/heading utilities reset `truncate`
- **Measured:** `/admin/flagged` palette titles (`span.font-display.font-medium.text-subheading.truncate`) wrap — 20/20 rows, up to 12 lines at 360 (one letter per line) and 9 at 430 (`probe-admin-rows.mjs`). Computed `white-space: normal`, `text-wrap-mode: wrap`.
- **Cause (glass half):** `@utility text-subheading { … text-wrap: balance }` (and `text-display*`, `text-title`, 10 utilities in `typography/semantic.css`) use the `text-wrap` **shorthand**, which resets `text-wrap-mode` to `wrap` and so overrides `truncate`'s `white-space: nowrap`. `text-wrap-style: balance` gives the same balance without undoing a consumer's nowrap.
- **Ask:** author the balance as `text-wrap-style`, not the shorthand.
- **Consumer half (value's own, cured in X.W12U `.m`):** the row's action group is `shrink-0` and crushes the title column to 14 px at 360 (84 px at 430); the row reflows at phone widths. Row A2-VA-X-5.

## Cited, not re-asked
- **Micro floor:** value's 11 px `text-micro` (29 sites in 13 files; served on `/palettes`, `/browse`, `/extract`, `/mix`, `/generate`, `/gradient`, the profile menu and the version drawer at 390, 768 and 1024) is O-74a **E-5** (with A2-KE-L2-14, A2-FO-L2-18); `--type-micro: 0.6875rem` is glass's (`typography/scale.css`). Held for the §11 ruling (O-74a E-2). Row A2-VA-X-8.
- **Compact seats:** the Toggle-action-bar `<DockControl compact>` is A2-KE-L2-6 (O-74a E-1). value's own 32×32 scene seats are consumer (`ActionButton.vue:15,:105-114`), cured by value. Row A2-VA-X-9.
- **Landscape dialogs:** value's Flag report dialog runs from −59.7 to 449.7 in a 390-tall viewport at 844×390 (height 509.4, `overflow: visible`, both themes, two runs; `capture-overlays.mjs`), so title and footer are off-screen. That is A2-FO-L2-8 (DialogContent caps its height only under `scroll`); the consumer half is value's. Row A2-VA-X-10.

Reply requested: confirm G-1 and G-2 at source and name the release they ride.
