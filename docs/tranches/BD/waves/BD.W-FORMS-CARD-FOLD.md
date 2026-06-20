# BD.W-FORMS-CARD-FOLD

## 1 · Band + goal

**Band 4 — Demo PAGES first-half modernization (zero src paint).** Fold the residual hand-rolled card/section wrappers inside the forms + dialog bodies onto `<Card>` / `<ShowcaseFrame>`.

**Goal:** Fold the residual `rounded-card border bg-card p-N` (and the raw `rounded-2xl`) card/section wrappers inside the forms + containers/dialog bodies onto the shipped `<Card>` / `<ShowcaseFrame>` chassis — the switch-row, the grouped-section block, and the confirm-card — so the forms/dialog bodies speak the component-over-class discipline (Design Axis 2), not a hand-rolled triplet. Smaller surface than the token-tour fold, same discipline. Zero src paint.

---

## 2 · Starting state — the exact on-disk reality (verified by reading)

All citations read at HEAD on branch `master`.

### `demo/stories/forms/label.vue:67` — the switch-row triplet
```html
<section class="flex flex-col gap-3 max-w-sm">
    <p class="section-label">switch row</p>
    <div class="flex items-center justify-between rounded-card border border-border bg-card p-4">
        <div class="flex flex-col gap-1">
            <Label for="lbl-notify">Ship notifications</Label>
            <span class="text-small text-muted-foreground">…</span>
        </div>
        <Switch id="lbl-notify" v-model="notify" />
    </div>
</section>
```
The `rounded-card border border-border bg-card p-4` switch-row wrapper — the raw triplet `<Card>`/`<ShowcaseFrame>` own. In M9A_BASELINE (`proof-storybook-meta.mjs:284`).

### `demo/stories/forms/multi-select.vue:97` — the grouped-section triplet
```html
<div class="grid grid-cols-1 gap-4 rounded-card border border-border bg-card p-5 sm:grid-cols-2">
```
The grouped-controls section wrapper — the raw triplet. In M9A_BASELINE (`:285`).

### `demo/stories/containers/dialog.vue:122` — the confirm-card with a raw `rounded-2xl`
```html
<div class="relative isolate rounded-2xl border border-border bg-card p-6">
    <div class="flex items-center justify-between gap-4">
        <div>
            <p class="text-subheading">Delete workspace</p>
            <p class="text-sm text-muted-foreground">Anchored absolutely inside this card surface.</p>
        </div>
        <Button variant="destructive" @click="confirmOpen = true">Delete</Button>
    </div>
    <ConfirmDialog v-model:open="confirmOpen" … />
</div>
```
The confirm-card wrapper uses a RAW `rounded-2xl` (off the `--radius-card` semantic alias — `radii.vue:18` `rounded-2xl` = 16px, which `rounded-card` aliases) + the `relative isolate` anchor (the `position: relative` + `isolation: isolate` establishing the absolute-positioning context the `ConfirmDialog` inside it anchors against — "Anchored absolutely inside this card surface", `:127`). NOT in M9A_BASELINE (the `rounded-2xl` form is OFF the M9A `TRIPLET_RE` which keys on `rounded-card` — `:264` — so this raw card slipped the census; it is a genuine uncaught dated plate, related to BD.W-MISSED-SLAB-CENSUS's regex-hole but on the `rounded-2xl` variant).

### The `<Card>` idiom (verified — the fold target)
`demo/stories/data/search.vue:440-447` — `<Card class="border-l-4" :style="{…}">` with `<CardHeader>`/`<CardContent>` inside; the forwarded-class pattern. `<Card>` accepts a `class` string (so `relative isolate` threads onto a folded confirm-card), composes the glass tier, and is the canonical card chassis. `<ShowcaseFrame>` (the demo-side host) is the alternative for a pure specimen wrapper.

---

## 3 · The build — precisely what changes (idiomatic, gestalt, zero src paint)

### `label.vue:67` — the switch row → `<ShowcaseFrame pad="sm">`
The `rounded-card border bg-card p-4` switch-row wrapper → `<ShowcaseFrame pad="sm">` (the `p-4` = `pad="sm"`; the `flex items-center justify-between` content moves inside the frame slot). The raw triplet is DELETED. The file LEAVES M9A_BASELINE.

### `multi-select.vue:97` — the grouped section → `<ShowcaseFrame pad="md">`
The `rounded-card border bg-card p-5 grid grid-cols-1 …` → `<ShowcaseFrame pad="md" class="grid grid-cols-1 gap-4 sm:grid-cols-2">` (the grid layout threads via the forwarded class; the frame owns the card chrome). The raw triplet is DELETED. The file LEAVES M9A_BASELINE.

### `dialog.vue:122` — the confirm-card → `<Card class="relative isolate" surface="…">`
The raw `relative isolate rounded-2xl border bg-card p-6` → `<Card class="relative isolate">` — `<Card>` (NOT ShowcaseFrame) because it holds a live interactive ConfirmDialog anchor (a Card is the content-card chassis; ShowcaseFrame is the specimen host). The `relative isolate` anchor threads via the forwarded class (the search.vue forwarded-class precedent), the `rounded-2xl` retires onto `<Card>`'s own `rounded-card` (= the `--radius-card` alias, 16px — byte-identical radius, the semantic-alias fix), `p-6` onto Card's own padding (the BB.W-CARD-PAD golden ladder — the Card's `--card-pad-*` rungs replace the flat `p-6`). The inner `<div class="flex items-center justify-between">` + the `<ConfirmDialog>` stay inside (the anchor is preserved — the ConfirmDialog still anchors absolutely against the `relative isolate` Card). The raw `rounded-2xl` is GONE.

**The subtlety — the `relative isolate` anchor (load-bearing).** The ConfirmDialog inside the confirm-card is positioned absolutely against this wrapper's `position: relative` + `isolation: isolate`. The fold MUST preserve `relative isolate` on the folded `<Card>` (via the forwarded class) — dropping it would re-anchor the ConfirmDialog against a distant ancestor (a visual break). `<Card>` accepts the forwarded class (verified), so `<Card class="relative isolate">` preserves the anchor exactly.

**Fences respected:** foreign-tree (demo-private); GL-shader byte-fence (N/A); profile:budget (N/A — demo SFC); warm-cream identity (`<Card>`/`<ShowcaseFrame>` are the warm-cream glass chassis; no hue change); one-GL-per-route (N/A); presets-in-consumers (no token added); substitution-vs-inheritance (the `<Card>` golden padding ladder replaces the flat `p-6` literal — the canonical padding register). **Zero `src/` paint** — all three files are `demo/stories/`.

---

## 4 · The gate — born-RED → GREEN proof design

**Extend `proof:storybook-meta`** — fold into the M9A ratchet (the three files LEAVE M9A_BASELINE) + a focused **M14 — the forms/dialog card fold** clause for the `rounded-2xl` arm. Born-RED on HEAD.

**Clauses (born-RED at HEAD):**
- **M14-1 — the forms wrappers fold (ratchet-lockstep).** Assert `forms/label.vue` + `forms/multi-select.vue` compose `<ShowcaseFrame>`/`<Card>` AND the raw triplet is GONE (these LEAVE M9A_BASELINE — M9A `detectRawTriplet` reds them as NEW off-baseline if a triplet survives after removal). RED on HEAD (raw triplets, in baseline). GREEN at the fold (folded, removed from baseline).
- **M14-2 — the confirm-card retires the raw `rounded-2xl`.** Assert `dialog.vue` carries ZERO raw `rounded-2xl border bg-card` card wrapper (the `rounded-2xl` semantic-alias dodge). RED on HEAD (`:122`). GREEN at the `<Card>` fold. (This clause is the `rounded-2xl`-variant cousin of BD.W-MISSED-SLAB-CENSUS's regex-hole close — coordinate so the two waves' detectors do not double-count; this wave owns the dialog.vue `rounded-2xl` re-thread, MISSED-SLAB owns the scrolling-text/tags-input variants + the TRIPLET_RE widen.)
- **M14-3 — the anchor preserved.** Assert the folded confirm-card `<Card>` carries `relative isolate` (the ConfirmDialog anchor) — a fold that drops the anchor reds. RED would fire on a careless fold; GREEN when the anchor threads.

**Self-test bite (planted defect that MUST red):**
- a synthetic `label.vue` re-introducing the raw `rounded-card border bg-card p-4` MUST red M14-1 (the M9A ratchet bite);
- a synthetic `dialog.vue` re-adding `rounded-2xl border bg-card` MUST red M14-2 (the semantic-alias-dodge regression);
- a synthetic confirm-card fold dropping `relative isolate` MUST red M14-3 (the anchor-break);
- the good fold MUST pass all three.

**Born-RED proof:** at HEAD, M14-1 (raw triplets) + M14-2 (`rounded-2xl`) RED. At the build, all three pass. The self-test reds the gate if a bite stops biting.

---

## 5 · Paint verification — the π readback (BC anti-disease law)

This wave PAINTS, so it takes a **`proof:ba-gestalt` verdict on the `page-band` aggregate surface** (the storybook-meta chassis row in the BD-grown roster — BD.W-GESTALT-ROSTER-GROW; the folded forms/containers panes aggregate under `page-band`, the `/forms/*` + `/containers/dialog` SFCs enrolled in its BD freshness record's `surface-paths`) on a fresh capture — no source-green close.

**The binding π** (both modes × desktop+mobile, on `:5199`):
- **(a) the folded wrappers read identically** — capture `/forms/label`, `/forms/multi-select` and assert the folded ShowcaseFrame/Card wrappers read as the SAME bordered card the raw triplet did (the chassis IS the triplet — byte-near-identical gestalt; the only delta is the Card golden padding ladder replacing the flat `p-N`, a sub-perceptual rhythm refinement).
- **(b) the confirm-card anchor holds** — capture `/containers/dialog`, open the ConfirmDialog, assert it anchors absolutely INSIDE the folded `<Card>` (the `relative isolate` preserved — the dialog appears within the card surface, not re-anchored to a distant ancestor). This is the binding proof for the anchor fence.
- **(c) the radius is byte-identical** — the `rounded-2xl`→`rounded-card` retire is a no-op radius (both 16px); the confirm-card corner radius is unchanged.
- **(d) both modes** — the folded cards read the warm-cream glass tier in both modes (the Card chassis handles the dark-arm).

**The BC anti-disease law observed:** the device-free M14 clauses prove the SOURCE fold; the π proves the RENDERED card + the live anchor (a fold that drops the `relative isolate` passes the source gate's M14-3 only if the source carries it — but the LIVE anchor behaviour, the ConfirmDialog actually appearing inside the card, is the binding π Arm (b)). No "rides W-REFLECT3"; the readback runs at this wave's close.

---

## 6 · Fences + risks — what must NOT break

- **The `relative isolate` anchor (load-bearing).** The confirm-card's ConfirmDialog anchors absolutely against the wrapper's `position: relative` + `isolation: isolate`. The fold MUST thread `relative isolate` onto the folded `<Card>` (via the forwarded class). Dropping it re-anchors the dialog (a visual break). M14-3 guards the source; π Arm (b) guards the live behaviour.
- **`<Card>` for the live anchor, `<ShowcaseFrame>` for the specimen.** The confirm-card holds a LIVE interactive surface → `<Card>` (the content-card chassis). The switch-row + grouped-section are specimen wrappers → `<ShowcaseFrame>` (the demo host). Do NOT cross them (a ShowcaseFrame is not a content card; a Card is heavier than a specimen needs).
- **The `rounded-2xl`→`rounded-card` retire is byte-identical.** Both resolve to 16px (`--radius-card`). The retire is the semantic-alias fix (Design Axis: token-first), not a radius change. π Arm (c) confirms.
- **Ratchet-lockstep.** `label.vue` + `multi-select.vue` LEAVE M9A_BASELINE. Coordinate with Band-5's data-band drain + BD.W-TOKEN-TOUR-GLASS (all three touch M9A_BASELINE — each removes ONLY its own files; no collision).
- **Coordinate the `rounded-2xl` detector with BD.W-MISSED-SLAB-CENSUS.** This wave re-threads dialog.vue's `rounded-2xl`; MISSED-SLAB widens TRIPLET_RE to catch the `rounded-md`/`shadow-cartoon-sm` variants + re-threads scrolling-text/tags-input. The two detectors must not double-count dialog.vue — this wave owns it.
- **Warm-cream identity.** `<Card>`/`<ShowcaseFrame>` are the warm-cream chassis; no hue change. The fold is structural (component-over-class), not chromatic.
- **Risk — low.** Three mechanical folds onto shipped chassis, with one load-bearing subtlety (the `relative isolate` anchor, π-verified live). The smallest Band-4 surface.
