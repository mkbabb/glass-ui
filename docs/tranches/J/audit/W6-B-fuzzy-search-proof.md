# J.W6.B — FuzzySearch gestalt rewrite proof

**Wave**: J.W6 Lane B.
**Status**: closed.
**Author**: agent (combined Lane B + Lane C.1).

## LOC delta

| Artefact | Pre | Post | Delta |
|---|---:|---:|---:|
| `src/components/custom/search/FuzzySearch.vue` | 600 | 158 | **−442 (−73.7 %)** |

Hard gate (a): `wc -l src/components/custom/search/FuzzySearch.vue` ≤ 200 → **158 ≤ 200 PASS**.

## Public API preservation

`useFuzzySearch` composable (`src/components/custom/search/composables/useFuzzySearch.ts`) and the `FuzzySearchState` interface (`src/components/custom/search/composables/types.ts`) are unchanged. Consumer-facing FuzzySearch props/emits/exposed methods identical:

| Surface | Pre | Post | Diff |
|---|---|---|---|
| `props.state: FuzzySearchState` | yes | yes | none |
| `props.variant: "sidebar" \| "floating"` (default `"sidebar"`) | yes | yes | none |
| `props.placeholder: string` (default `"Search…"`) | yes | yes | none |
| `props.typeLabel?: (item) => string` | yes | yes | none |
| `defineExpose({ focus })` | yes | yes | none |
| `useFuzzySearch(options): FuzzySearchState<T>` | yes | yes | none |
| `UseFuzzySearchOptions<T>` shape | yes | yes | none |

**Public API diff: empty.** Consumer story `demo/stories/data/search.vue` consumes the same API surface (no consumer-side changes required for Lane B).

## Canonical primitives now composed

| Old (bespoke CSS) | New (canonical primitive) |
|---|---|
| `.fuzzy-search-input-wrap` (custom flex + border + focus-within) | `.input-bar` utility |
| `.fuzzy-search-action-btn` (raw `<button>`) | `<Button variant="ghost" size="icon">` |
| `.fuzzy-search-results` (position:absolute + backdrop-filter:blur(12px) + bespoke keyframes) | `<Popover>` + `<PopoverContent>` (consumes `.popover-animate slide-in-from-side` + `glass-floating` + `rounded-panel`); rendered with `portal={false}` to anchor inside the same DOM tree as the original inline dropdown |
| `.fuzzy-search-modal-overlay` + `.fuzzy-search-modal` (custom Teleport + position:fixed + bespoke modal-enter/leave keyframes) | `<Dialog>` + `<DialogContent variant="opaque">` (canonical scrim, dialog-scale animation, `prefers-reduced-transparency` fallback shipped by overlay component) |
| `.fuzzy-search-badge` (custom pill chrome with `[data-type]`) | `<Badge variant="secondary">` |
| `.fuzzy-search-result` (raw `<button>` with hover/selected states) | `.interactive-item` utility (canonical hover + focus-ring + active-scale) |
| Bespoke `kbd` chrome under `.fuzzy-search-modal-hint kbd` | `.kbd` utility |
| `<style scoped>` block (330 LOC) | **Deleted entirely.** Every recipe lives in canonical utilities. |

## Gestalt notes

- The modal-mode close button retired (Dialog's built-in `<DialogClose>` covers it).
- The standalone inline backdrop `<div class="fuzzy-search-backdrop">` retired (Popover's outside-pointer-down handler subsumes it).
- The `<mark>` highlight migrated from a magic `hsl(50 100% 60% / 0.35)` literal to a token-mapped reference: `bg-[hsl(var(--rainbow-pastel-yellow,50_100%_60%)/0.35)]` with the literal as the fallback (the `--rainbow-pastel-yellow` token may land in a future vocab wave).
- Backdrop-filter accessibility: the previous bespoke modal/dropdown used raw `backdrop-filter: blur(...)` with no `@supports`/`@media (prefers-reduced-transparency)` fallback. Canonical `<DialogContent>` + `glass-floating` ship the fallback in the utility.
- Focus ring: every action button now consumes the canonical `focus-ring` via `<Button>` base. The previous bespoke `border:none; background:none;` buttons had no `:focus-visible` ring at all.
- Dialog's `variant="opaque"` is used for the modal mode to keep result-row text on a stable substrate (vs. transparent glass which can wash result text out when stacked over busy backgrounds).

## Test surface update

`src/components/custom/search/__tests__/search-contracts.test.ts` highlighting test:
- before: `mount(FuzzySearch, { props: { state } })` + `wrapper.find(".fuzzy-search-label")` (subtree DOM).
- after: same mount form (now requires `attachTo: document.body` + `flushPromises()`) — `portal={false}` keeps inline-dropdown content inside the wrapper subtree, so `wrapper.find(".fuzzy-search-label")` still resolves. The `.fuzzy-search-label` + `mark` semantic class hooks survive in the rewrite as testable anchors.
- Other tests in the file (cache scoping, debounce cleanup) unchanged.

## Hard-gate verification

- (a) `wc -l` ≤ 200 → **158 PASS**
- typecheck (after Lane B + C.1) → green (`npm run typecheck` exit 0)
- test (after Lane B + C.1) → green (269/269 tests pass)
- build → green

## Brittleness window

**Not declared.** The rewrite preserved the public API; design fidelity is preserved by composing equivalents from canon. No `breaking_changes_during_wave` flag.

## Files changed (Lane B)

- `src/components/custom/search/FuzzySearch.vue` — 600 → 158 LOC, full template rewrite, `<style scoped>` block deleted.
- `src/components/custom/search/__tests__/search-contracts.test.ts` — highlighting test updated to reflect canonical `<Popover>` / `<Dialog>` composition (`attachTo: document.body` + `flushPromises`); other tests unchanged.
