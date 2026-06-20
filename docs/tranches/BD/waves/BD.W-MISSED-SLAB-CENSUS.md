# BD.W-MISSED-SLAB-CENSUS

## 1. Band + one-line goal

**Band 5** — Demo PAGES second-half (the M9A regex-hole close — BUILDS).

Close the two raw-opaque-slab census ESCAPES the M9A `TRIPLET_RE` misses — re-thread `data/scrolling-text.vue`'s `rounded-md border bg-card` and `data/tags-input.vue`'s `bg-card shadow-cartoon-sm` slabs onto the glass register, AND widen the M9A detector to catch the `rounded-md` + bare-`shadow-cartoon-sm` variants so a future agent cannot smuggle a dated plate past the regex gap (the anti-gameability floor). A BUILD wave (the gate widen is a `scripts/` edit); the re-thread is demo-private (zero src paint).

## 2. Starting state — the exact on-disk reality (verified by reading + a live regex check)

`scripts/proof-storybook-meta.mjs:264`:
```js
const TRIPLET_RE = /rounded-card[^"'`]*\bborder\b[^"'`]*\b(?:bg-card|shadow-cartoon)\b/;
```
The regex REQUIRES `rounded-card` first. **Verified live** (ran the regex against the real class strings):
- `scrolling-text.vue:65` `"rounded-md border border-border bg-card px-2 py-1"` → **MISS** (`rounded-md`, not `rounded-card`). Same at `:87,101`.
- `tags-input.vue:49` `"min-h-11 bg-card shadow-cartoon-sm"` → **MISS** (no `rounded-card`; the `shadow-cartoon-sm` alone doesn't trip it because the regex anchors on `rounded-card`). Same at `:78,103`.
- Control: `timeline.vue:56` (`rounded-card …bg-card …shadow-cartoon`) → **MATCH** (the regex works for `rounded-card`).

Neither `scrolling-text.vue` nor `tags-input.vue` is in `M9A_BASELINE` (`:267-292` — verified; the data slice is the 12 `rounded-card` files, these two are absent). **Genuinely uncaught dated plates** — the anti-gameability floor (the gate's stated purpose, `:255-259`) has a hole.

Live survey of the widened surface (so the widen does not false-regress):
- `scrolling-text.vue:65,87,101` — `rounded-md border border-border bg-card px-N py-N` (3 sites — the host divs wrapping `<ScrollingText>`).
- `tags-input.vue:49,78,103` — `min-h-11 bg-card shadow-cartoon-sm` (3 sites — the `<TagsInput>` class).
- **`search.vue:417`** — `rounded-md border border-border bg-card px-3 py-2` (a manual-result `<li>`). search.vue IS in M9A_BASELINE — a widened regex would route it to the census (no regression).
- **`sortable-list.vue:148`** — `rounded-md border border-border bg-card p-1.5 …` (a `<SortableHandle as="button">` drag affordance). sortable-list.vue IS in M9A_BASELINE — routes to census.

So a `rounded-md`-widened regex catches scrolling-text + tags-input (NEW, must re-thread or baseline) AND additionally search + sortable-list (already-baseline, route to census). The widen + the two re-threads must be coordinated so the widen does not flag a NEW off-baseline file unexpectedly.

## 3. The build

Two arms:

**Arm A — widen `TRIPLET_RE`.** Extend the detector to catch the two dated-plate variants the current regex misses, WITHOUT over-broadening into legitimate decoration:
- Widen the radius anchor from `rounded-card` to `rounded-(?:card|md)` (the dated-plate radii — `rounded-md` is the un-tokenized slab radius; `rounded-pill`/`rounded-button`/`rounded-full` are NOT slab radii and stay un-matched).
- Add a SECOND detector arm for the radius-less `bg-card shadow-cartoon-sm` shape (the tags-input escape): a `\bbg-card\b[^"'`]*\bshadow-cartoon(?:-sm|-md|-lg)?\b` OR `\bshadow-cartoon-sm\b[^"'`]*\bbg-card\b` clause — a `bg-card` plate carrying a cartoon-shadow decoration is the dated slab regardless of radius. (The existing `\bshadow-cartoon\b` arm already matches `shadow-cartoon-sm` via the `\b` boundary, but ONLY when `rounded-card` precedes it — the widen drops the `rounded-card` requirement for the `shadow-cartoon` arm.)
- The combined detector: `(rounded-(?:card|md) …border …bg-card|…)` OR `(bg-card …shadow-cartoon)`. Keep the `[^"'`]*` no-cross-string guard.

**Arm B — re-thread the two escape files** onto the glass register (so they don't REGRESS under the widened regex):
- `scrolling-text.vue:65,87,101` — the `rounded-md border bg-card` host divs wrap `<ScrollingText>` width specimens (80/160/200/180px). Re-thread onto `<ShowcaseFrame tier="field">` (or a `<Card>` glass tier) — the marquee reads over the warm wash, not a `bg-card` slab. (The fixed-width `:style="{width:`${w}px`}"` threads through ShowcaseFrame's forwarded style/class.)
- `tags-input.vue:49,78,103` — the `bg-card shadow-cartoon-sm` is the `<TagsInput>` component's OWN class (the input atom's plate). TagsInput is a form-control atom; re-point its decoration off the dated `bg-card shadow-cartoon-sm` onto the shipped control-surface register (`.control-surface` / `--control-surface-bg` — the BA.W-SURFACE-AXIS control REST tier, the no-gray control-family seam, OR the `surface="glass"` axis if TagsInput exposes it). The TagsInput already reads `--invalid-ring` for its error state; the rest plate joins the `--control-surface-*` register. (Verify TagsInput's surface axis on the SFC; if it has no `surface` prop, re-point the class to `.control-surface` directly — the input-pill family seam.)

After Arm B, neither file matches even the widened regex (the dated plates are gone), so they stay GREEN without a baseline entry — the ratchet shrinks, never grows.

Coordinate the widen with the already-baseline `rounded-md` hits (search.vue:417, sortable-list.vue:148): they ARE in M9A_BASELINE, so the widened regex routes them to the census (no regression). If the intent is to also drain them, that is BD.W-DATA-BAND-GLASS's slice (search) or a control-affordance KEEP (sortable-list's `SortableHandle as=button` is a control — allowlist-or-baseline). This wave's BUILD is the regex widen + the two NEW escapes; the already-baseline hits route to the census as before.

## 4. The gate — born-RED→GREEN

A BUILD wave (the gate widen):

- **The widened `TRIPLET_RE`** catches `rounded-md …border …bg-card` AND `bg-card …shadow-cartoon-sm`. Born-RED the moment the regex widens (before Arm B): `detectRawTriplet` now finds scrolling-text + tags-input as NEW off-baseline matches → `m9a-raw-triplet-measure` REGRESSES-RED. Arm B re-threads them → the matches vanish → GREEN.
- **New self-test bites** (the anti-gameability floor) added to `selfTest` (`:448+`):
  - a synthetic `rounded-md border bg-card` slab MUST red the ratchet (the rounded-md hole closed);
  - a synthetic `bg-card shadow-cartoon-sm` (no rounded-card) slab MUST red (the radius-less cartoon-shadow hole closed);
  - a legitimate `rounded-pill bg-card` (a pill chip, NOT a slab) MUST NOT red (the distinguishing bite — the widen catches slab radii, not pill/button radii);
  - the existing allowlist+baseline-stay-green bites preserved.
- **The two re-threaded files** carry no surviving widened-regex match (the dated plates folded onto ShowcaseFrame / control-surface).

Born-RED on the current tree (the widen flags the two uncaught escapes); GREEN at the build (regex widened + escapes re-threaded + the new bites flag the planted holes).

## 5. Paint verification

The BC anti-disease law: **no source-green close.** `tests-visual/storybook-meta.spec.ts` (or `proof:ba-gestalt` data-band verdict) on `:5199`, BOTH modes × desktop+mobile:
- the re-threaded `scrolling-text` width specimens read as glass / the warm wash THROUGH the card (not a `bg-card` slab);
- the re-threaded `tags-input` plate reads as the warm-cream control-surface register (the no-gray control seam), the invalid-ring error state un-regressed;
- no marquee/overflow regression (the ScrollingText `data-overflows` threshold + the masks read), no TagsInput tag-chip regression.
The captured DELTA is the binding proof. `proof:ba-gestalt` data-band verdict on the fresh capture.

## 6. Fences + risks

- **MUST NOT** over-broaden the regex into legitimate decoration — `rounded-pill`/`rounded-button`/`rounded-full` chips carrying `bg-card` are NOT slabs; the widen catches the slab radii (`rounded-card`/`rounded-md`) + the cartoon-shadow plate ONLY. The distinguishing self-test bite (`rounded-pill bg-card` stays green) enforces it.
- **MUST NOT** false-regress the already-baseline `rounded-md` hits (search.vue:417, sortable-list.vue:148) — they ARE in M9A_BASELINE; the widened regex routes them to the census, not the regression set (verify after the widen: `detectRawTriplet` census includes them, regressions excludes them).
- **MUST NOT** break the TagsInput control contract — re-point the rest plate onto `.control-surface`/`--control-surface-bg` (the shipped control-family seam), NOT a forked recipe; the `--invalid-ring` error state + the tag-chip tints (`bg-section-N/15`) stay.
- **MUST NOT** re-parent the ScrollingText host in a way that breaks the marquee width measurement (`data-overflows` keys off the fixed-width host) — ShowcaseFrame wraps the width div as a parent, the width specimen stays the marquee's measured host.
- **Coordinate with BD.W-DATA-BAND-GLASS** — that drains the `rounded-card` baseline; this closes the `rounded-md`/`shadow-cartoon-sm` regex holes. Disjoint files (scrolling-text + tags-input are NOT in the rounded-card baseline). Sequence so the regex widen lands WITH the two re-threads (the widen is born-RED until the re-threads land).
- Zero `src/` paint — the re-threads are demo-private; the regex widen + bites are `scripts/` (the BUILD arm).
