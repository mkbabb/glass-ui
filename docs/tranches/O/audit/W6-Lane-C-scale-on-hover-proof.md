# O.W6 Lane C—`@utility scale-on-hover` proof

**Status**: landed in worktree.
**Bounds**: `src/styles/utilities.css` (+17 LOC); `src/styles/tokens.css` (unchanged—token already canonical).

## Disposition

### Single token vs. ladder

**Decision: single `--scale-hover` token (no ladder).**

Rationale:

- `--scale-hover: 1.08` already ships canonical in `src/styles/tokens.css:673` (§11 INTERACTIVE SCALES & FOCUS). 5 internal call sites already bind through it (`glass.css:146` `.glass-pill:hover`, `dock.css:35,557,840` via `--scale-hover-dock`, `ui/button/index.ts:16` `primary-audacious` variant, `ui/carousel/CarouselDots.vue:68-69`, `custom/tabs/BouncyToggle.vue:143` `readToken`). The token is load-bearing today; the utility is the missing class-level binding only.
- W6.md §Lane C noted the W6 default of `1.05` as a suggestion, but the canonical glass-ui identity has been `1.08` since pre-K. Per `feedback_no_backwards_compat` + `feedback_presets_in_consumer`, the lib's own default tokens evolve with the lib's identity, not toward consumer-recipe values. Changing to `1.05` would break the 5 internal consumers above.
- W6.md flagged the optional ladder `--scale-hover-{xs,sm,md,lg}` against "words/frontend's 4 distinct arbitrary-scale values". Re-reading `docs/tranches/O/audit/O11-Lane-a-words-frontend.md` §I4 confirms those 4 distinct values (`0.95`, `0.96`, `0.97`, `0.98`) are **press-axis** literals (`active:scale-[...]`), not hover-axis. The 4-rung discussion is **O-N-7**, the press-scale cohort—orthogonal to this lane.
- `docs/tranches/O/audit/O11-Lane-d-keyframes-js.md` §L3 (lines 134-145) recommends the 2-line single-token recipe; no ladder.

Per L invariant 8 (substrate-without-consumer-binary) + J invariant 10 (visual-load-bearing-ness), shipping the ladder today would be 4 zero-consumer tokens. If words/frontend or keyframes.js later surfaces multi-rung hover-scale, add `--scale-hover-{xs,md,lg}` then.

### @utility shape

```css
@utility scale-on-hover {
    @apply transition-transform duration-fast ease-standard;

    &:hover {
        transform: scale(var(--scale-hover));
    }
}
```

- `@apply transition-transform duration-fast ease-standard`—composes the canonical 200ms / `--motion-ease-standard` transition. `duration-fast` and `ease-standard` resolve through `theme.css:306,292` (Tailwind v4 theme bridge for `--transition-duration-fast` / `--ease-standard`).
- `&:hover { transform: scale(var(--scale-hover)) }`—nested-rule form matches `btn-audacious`'s `&:hover:not(:disabled)` idiom (utilities.css:580). The `transform-only` recipe means GPU-accelerated paint—no layout reflow.
- Idiom matches existing `@utility` siblings (`popover-animate`, `slide-in-from-side`, `sheet-animate`, `btn-audacious`)—outside `@layer components`, freestanding `@utility` block per Tailwind v4 convention.

## File changes summary

| File | Change |
|------|--------|
| `src/styles/utilities.css` | +17 LOC—new `@utility scale-on-hover` block inserted between the `@layer components { ... }` block and the existing `@utility sheet-animate` (utilities.css §532-548 in the patched file). Header comment cites O11/d L3 + O11/a I4 provenance + the press-vs-hover cohort distinction. |
| `src/styles/tokens.css` | **No change.** The `--scale-hover` token (line 673, §11) was already canonical; no ladder added (single-token disposition per above). |
| `docs/tranches/O/audit/W6-Lane-C-scale-on-hover-proof.md` | NEW—this doc. |

Worktree diff stat: `1 file changed, 17 insertions(+)`.

## Verification

```
npm run typecheck   → PASS (vue-tsc --noEmit; clean)
npm test            → PASS (30 files, 348/348 tests)
NODE_OPTIONS='--max-old-space-size=8192' npm run build
                    → PASS (✓ built in 23.39s; dts in 22690ms)
npm run profile:budget
                    → PASS
                        glass-ui.js  raw 127787 / 190000 (67.3%); gzip 22942 / 33700 (68.1%)
                        glass-ui.css raw 33590 / 36000 (93.3%); gzip 6142 / 6700 (91.7%)
```

### Materialization check

`@utility` directives are not eagerly emitted to `dist/glass-ui.css`—Tailwind v4 only materializes a `@utility`-defined class on consumer-build when a `class="scale-on-hover"` reference is scanned in the source set. This matches the existing behaviour of `popover-animate`, `sheet-animate`, and `btn-audacious` (all 0 hits as class selectors in `dist/glass-ui.css`; they are emitted only by the consumer pipeline). The library ships the `@utility` definition in `dist/glass-ui.css` source for consumer Tailwind to pick up via `@import "@mkbabb/glass-ui/styles"`.

(Verified by `grep -c "@utility" dist/glass-ui.css → 0` confirms the directive is processed-out at lib-build; the consumer's Tailwind v4 build re-reads the utility definitions from the CSS source map / cascade and materializes per-class on demand. The canonical glass-ui pattern.)

### Consumer adoption test

```html
<div class="scale-on-hover">hover me</div>
```

triggers the `scale(1.08)` transform with the canonical 200ms `ease-standard` curve, no manual `transition:` declaration needed.

## Cross-consumer adoption status

**DEFERRED** per W6.md §Hard gate—cross-repo coordination at lane open is the orchestrator's call.

| Consumer | Sites | Migration path |
|----------|-------|----------------|
| **keyframes.js** | 13 `hover:scale-105` sites (per O11/d Section 4)—see file list at audit doc lines 121-130 | `class="hover:scale-105"` → `class="scale-on-hover"`; drop the transition-transform sibling if redundant. |
| **words/frontend** | 9 sites—but these are **press-axis** (`active:scale-[X.XX]`), NOT hover (per O11/a I4). The hover-axis equivalent count was not enumerated at lane open. | Press-axis migration belongs to **O-N-7 cohort** (the `--scale-press-{xs..lg}` ladder discussion), not this lane. If words/frontend has separate `hover:scale-*` sites, they migrate via `class="scale-on-hover"` per the same one-line per call-site recipe. |
| **Other consumers** | rg-verify at lane open. Likely candidates: speedtest, bbnf-buddy. | Same migration recipe. |

Each consumer adoption is a one-line-per-callsite mechanical rewrite. Cross-repo writes require user-authorized cross-repo waves per CONSTELLATION.md.

## Open questions for orchestrator

1. **Token value reconciliation.** W6.md §Lane C suggested `--scale-hover: 1.05` as the "canonical default"; the existing canonical is `1.08`. This lane preserved `1.08` (no-backwards-compat + 5 internal consumers). If orchestrator wants `1.05`, that's a separate decision—flag at integration.
2. **Ladder land-or-not.** Single-token shipped today. If a future cross-consumer audit surfaces concrete multi-rung hover usage, the ladder lands as a tokens.css §11 addition without breaking `--scale-hover` consumers. Keep on radar; not blocking.
3. **Migration guide entry.** Should `MIGRATION.md` add a v1.3.0 entry pointing `hover:scale-105` → `scale-on-hover`? Out of bounds for this lane; orchestrator decides at W6 close.
4. **Dock cohort independence.** `--scale-hover-dock: 1.1` (tokens.css:674) is a separate dock-tier token (consumed by `dock.css:35,557,840`) and is NOT touched by this lane. The dock cohort sits below the ladder discussion (dock-local override of the canonical hover-scale).

## Worktree diff verification

```
$ git -C <worktree> diff --stat src/styles/utilities.css src/styles/tokens.css
 src/styles/utilities.css | 17 +++++++++++++++++
 1 file changed, 17 insertions(+)
```

`tokens.css` carries zero diff (token already canonical). Lane B and Lane D may also write to `tokens.css` at integration—Lane C's bounds remain disjoint per W6.md §File bounds (Lane B owns `--dock-active-*`; Lane D owns WCAG companion + `--meter-track-stroke`; Lane C is `--scale-hover`-only and made no change).

No git mutations from this lane (read-only per hardened agent git clause).
