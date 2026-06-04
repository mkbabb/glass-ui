# AS.W7 Wave 3 — Harden + Challenge: Cluster H3 (tabs pill-scroll + sortable drag-ring)

Defects: **D8** (BouncyToggle scroll-active-into-view) · **D9** (useSortable drag-ring radius).
Files (file-disjoint): `src/components/custom/tabs/BouncyToggle.vue`, `src/composables/sortable/useSortable.ts`.
Wave-2 commit under review: `96858c8`.

Method: adversarial in-browser verification against the running demo (`localhost:5173`),
synthetic-DOM edge probing, reduced-motion + light/dark + multi-viewport sweeps, plus
new regression unit tests (the cluster shipped with ZERO tests at HEAD).

---

## Verdicts

### D8 — BouncyToggle scrolls the selected pill into view; fade no longer eats the last pill — HOLDS

Live on `/aurora` (the configurator `BouncyTabs variant="pill" overflow="scroll"`, 6 tabs, **Nuclei last**):

- At rest the rail overflows (`scrollWidth 363 > clientWidth 335`) and Nuclei is **not** fully visible (born clipped) — the reported defect.
- Clicking Nuclei scrolls it in (`scrollLeft 0 → 26`), `aria-pressed=true`, and its right edge (327) lands inside the solid band (rail 335 − 8px fade = 327). `nucleiFullyVisible: true`, `nucleiRightInsideSolidBand: true`.
- The `--mask-fade-width` re-point to `0.5rem` + matching `padding-inline-end` + `scroll-padding-inline` resolve as authored on the live element.

**Reduced-motion gate:** with `emulateMedia({reducedMotion:'reduce'})` the scroll is **instant** (`scrollLeftEarly === scrollLeftLate === 26` at +20ms, `instantScroll: true`) — `behavior: "auto"` taken. Without it, `behavior: "smooth"`. Confirmed both branches.

**Anchor-slider-under-scroll:** the single-select pill rail is CSS `position-anchor`-driven (`anchorMode: true`). Manually scrolling the rail keeps the slider glued to the active button — `dLeft 0, dWidth 0` before AND after scroll. Zero drift; no JS re-measure needed.

**Multi-viewport:** at 375×812 the rail is far more constrained (`clientW 234`, `scrollW 363`); clicking Nuclei still lands it fully visible (`scrollLeft 127`, `nucleiFullyVisible: true`).

**Light/dark:** identical behavior in `.dark` (`maskFadeWidth 0.5rem`, Nuclei fully visible) — fade is token-driven.

**Multi-select regression:** the `overflow="none"` default that multi-select toggles use makes `scrollButtonIntoView` an early-return no-op, so it cannot perturb multi-slider layout. Verified the multi-select `select()` path (toggle add, toggle remove, last-value-undeletable guard) is byte-unchanged and a multi-select `overflow="scroll"` select runs cleanly (new unit tests).

### D9 — drag ghost gold ring traces the visible corner (inner-child / PaletteLayer case) — HOLDS

`resolveVisibleRadius` reads the source's own computed `border-radius`; if all-zero, walks descendants depth-first for the first non-zero radius, and `createGhost` stamps it inline on the ghost root so the `0 0 0 2px var(--color-gold)` box-shadow ring is round.

Verified end-to-end against synthetic DOM (the PaletteLayer shape — `SortableItem as="div"` unrounded root wrapping a `rounded-panel` inner card) AND the real `/data/sortable-list` rows:

| case | resolved | correct |
|------|----------|---------|
| inner-child rounded (PaletteLayer) | `12px` | yes — ring round |
| deeply nested (root/L1/L2, only L2 rounded) | `8px` | yes |
| all-zero subtree | `null` (ghost radius untouched) | yes — ring stays square |
| asymmetric inner `12px 12px 0px 0px` | preserved verbatim | yes — ring traces asym corners |
| elliptical `… / …` | preserved verbatim | yes |
| root already rounded | self short-circuits (no walk) | yes |
| real `/data/sortable-list` row | `6px` from `self` | yes |

**`isNonZeroRadius` predicate** stress-tested: `""`/`0px`/`0px 0px 0px 0px`/`0px / 0px` → false (square, correct); `6px`/`0.5px`/asym/elliptical/`50%` → true; `auto`/`calc(...)` → true (conservative — never misses a rounded corner). `0%` → false, which is correct (a zero radius is square regardless of unit).

**Perf:** the walk is per-**row** (the dragged row's subtree only — NOT the list), **one-shot at drag start** (`createGhost` runs once in `beginDrag`, never per `pointermove`). Worst case (500 unrounded descendants, full sweep) measured **0.4ms/walk**. The "large list" concern does not apply — list size never enters the walk. No cap added (it would risk missing a legitimately deep rounded surface for zero real-world benefit).

**Light/dark:** `--color-gold` resolves in both themes (`hsl(43 74% 55%)`), so the ring paints in dark mode.

---

## Hardening applied (scoped to the 2 cluster files)

1. **`src/composables/sortable/useSortable.ts:170`** — exported `isNonZeroRadius` (was module-private) so the D9 drag-ring radius predicate is unit-testable. NOT re-exported from the package barrel (`public-surface.spec.ts` stays green); it is a pure string predicate. No behavioral change.

The fixes were already correct and conservative; the substantive hardening is **regression-locking via tests** (the cluster had none) plus the adversarial sweep above. No code-path behavior was altered.

### Tests added (15, all green; suite 574 → 597 total)

- `src/composables/sortable/__tests__/drag-ring-radius.test.ts` (9) — `isNonZeroRadius` edges: zero/asymmetric/elliptical/percent/non-length-token.
- `src/components/custom/tabs/__tests__/bouncy-toggle-scroll.test.ts` (6) — D8 select-scrolls-into-view; `behavior` smooth-vs-auto under reduced-motion; `overflow="none"` no-op; multi-select toggle + last-value-undeletable regression; multi-select `select()` clean under `overflow="scroll"`.

Verification: `npm run typecheck` clean; `npx vitest run` 597 passed (56 files). `npm run build` not run (per instruction).

---

## Regressions / punch-list

- **None in the two cluster files.** Both D8 and D9 hold under every adversarial axis tried.
- **Latent boundary (not a bug; current consumers safe; flag for future):** the D9 ring sits on the ghost ROOT and adopts the inner child's radius, which traces correctly only when the rounded inner surface is **flush** to the root edges. If a future consumer gives `.sortable-item` padding (rounded card inset from the root), the ring would be a too-large rounded rect with a gap. All current consumers (PaletteLayer, `/data/sortable-list`) are flush, so no action now; worth a comment if a padded SortableItem ever ships.
- **Environment artifact (NOT a product defect):** in the Playwright-driven session the SPA route drifts to a random story between an external `navigate` and the next tool call (stable during in-page idle polling — held on `/aurora` across an 8×150ms in-page sample). Did not reproduce via real in-page interaction; worked around by driving navigation through the in-app router inside a single `evaluate`. The demo wires `]`/`[`/`}`/`{` to story next/prev (`demo/layout/AppShell.vue`); the drift correlates with the automated-input session, not with D8's `scrollIntoView` (page/main scroll positions were unmoved by the pill select). No glass-ui src change indicated.
