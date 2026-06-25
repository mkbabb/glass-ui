# BD.W-PAGE-HEADER-FOLD

## 1 · Band + goal

**Band 4 — Demo PAGES first-half modernization (zero src paint).** The 36-file hand-rolled page-identity header paste (the inline `<header borderLeft>`+IconChip+span shape) folds onto the orphaned chassis primitive.

**Goal:** Fold the 36-file verbatim inline in-body page-identity header paste (`<header class="flex items-center gap-4 pl-5" :style="{borderLeft:…}">` + `<IconChip :section bloom reveal>` + `<span class="section-label--tinted text-admin-label">` + `<p class="text-small text-muted-foreground">`) onto a SINGLE demo-private chassis primitive — extend `StorySectionHeader.vue` to a heading-OPTIONAL shape (or mint an eyebrow-only `StoryPageHeader` sibling) — so each forms/containers/navigation/display/feedback/data/compositions page passes `:icon`/`:section`/`:eyebrow`/`:blurb` and gets the coherent accent-rail + IconChip + tinted eyebrow in ONE composed call, with NO 37th paste. Zero src paint (demo-private). **This wave SOLELY discharges the `StorySectionHeader` dead-mint** (J-inv-10 substrate-without-consumer): the orphan gains its ≥2 real adopters from the 36 folded page-identity headers, and this wave OWNS the M9d existence-only → ≥2-real-adopters gate-widen (the former BD.W-SECTION-HEADER-THREAD's build, folded in — see §4 M9e-3 + §6). The disk truth (VERIFIED): the EXACTLY 2 files the retired THREAD wave claimed as DISTINCT in-body adopters (`data/data-table.vue` + `data/table.vue`) carry ONLY their page-identity header (the first child of `<StoryPage>`, eyebrow-only, no `<h2>`, the verbatim PH3-safe paste — `data-table.vue:159-178`/`table.vue:51-70`, IconChip-led at the page top, the heading "Repositories" being a SEPARATE `<StorySection heading>`), so they ARE 2 of these 36 — there is NO distinct in-body IconChip-led section-header set on disk (the settings.vue 4-span / progress.vue 2-span multi-header files carry settings-group labels + a BorderProgress caption span, NOT IconChip-led accent-rail headers; settings.vue is the 37th `section-label--tinted` span-class grep match but it carries NO inline-`borderLeft` header + NO `<IconChip>`, so it is NOT in this fold's set). The "disjoint paste-set" partition the THREAD wave premised is physically false; the single fold here covers the whole 36-file set.

---

## 2 · Starting state — the exact on-disk reality (verified by reading)

All citations read at HEAD on branch `master`.

### The paste (36 files — the inline `<header borderLeft>`+IconChip page-identity paste, verified by grep)

`grep -rln "section-label--tinted text-admin-label" demo/stories/**/*.vue` returns **37 files**, but `grep -rln "borderLeft:"` returns **36** — and the 1-file delta is `compositions/settings.vue`, which is NOT a page-identity-header paste: its 4 `section-label--tinted` spans are `.settings-group` labels (a CSS `border-inline-start: 3px solid` rail in a `<style>` block, `:283`, with NO `<header>`, NO inline `borderLeft` `:style`, and NO `<IconChip>` — `grep -c IconChip settings.vue` = 0, VERIFIED). So the TRUE enrolled set — the inline `<header … borderLeft … :style>` + `<IconChip>` + `section-label--tinted` span page-identity paste — is the **36** files that carry ALL THREE markers (`borderLeft`-in-`:style` AND the span AND `<IconChip>`, verified = 36). settings.vue is a SEPARATE settings-group-label concern (a BD.W-DATA-SUFFUSE-style identity event on a non-header idiom), NOT this fold. The M9e-2 detector keys on `borderLeft:`-in-`:style` AND the span class combined, so it already matches exactly these 36 (settings.vue's span-without-inline-borderLeft never enters the enrolled set). The verbatim shape, read at `demo/stories/forms/inputs.vue:24-42`:

```html
<header
    class="flex items-center gap-4 pl-5"
    :style="{
        '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
        borderLeft:
            '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
    }"
>
    <IconChip :icon="TextCursorInput" :section="FORMS_STOP" bloom reveal />
    <div class="flex flex-col gap-1">
        <span class="section-label--tinted text-admin-label">
            Forms · Text input
        </span>
        <p class="text-small text-muted-foreground">
            Text fields, search, and password inputs — the field controls
            stay ink; the section identity is the ONE color event.
        </p>
    </div>
</header>
```

The same shape repeats verbatim at `containers/dialog.vue:42-60`, `display/badge.vue:46-64`, and 33 more. Each declares a per-page `<STOP>_STOP = N` constant (the `--section-color-N` index) above it (e.g. `inputs.vue:13` `const FORMS_STOP = 3;`, `dialog.vue` `CONTAINERS_STOP`, `badge.vue` `DISPLAY_STOP`). The 36 enrolled files (NOT `compositions/settings.vue` — it carries settings-group labels, not the page-identity paste):

```
containers/{accordion,collapsible,command,context-menu,dialog,drawer,dropdown-menu,
           expandable-container,hover-card,hover-popover,popover,sheet,tooltip}.vue
data/{data-table,table}.vue
display/badge.vue
feedback/{alert,confirm-dialog,notification,progress,skeleton,toast}.vue
forms/{checks,combobox,inputs,label,multi-select,number-field,select,slider,
       textarea,toggle-chip,toggle}.vue
navigation/{carousel,header-ribbon,tabs}.vue
```

### The chassis home (orphan, verified)

`demo/stories/StorySectionHeader.vue` (read in full): a demo-private primitive (NOT a library export). Its own docstring (`:5-14`) names this exact debt — "the `border-l-[3px]` accent-rail + `<IconChip>` + mono-eyebrow + text-small-blurb section header was pasted across the storybook with NO chassis home (storybook-dogfood.md GAP-2) … This unit is that home … The surviving genuine section headers compose THIS — no 42nd paste." `grep -rln StorySectionHeader demo/stories/**/*.vue` = **ZERO real consumers** (only its own def file — the dead-mint, confirmed).

Its props (`:29-47`): `icon` (required), `section?`/`tone?` (XOR), **`heading: string` (REQUIRED — `:39`)**, `eyebrow?`, `blurb?`, `class?`. It renders a MANDATORY `<h2 class="text-subheading text-foreground">{{ heading }}</h2>` (`:95`) inside `<header class="… border-l-[3px] pl-6">` (`:70`). The IconChip is `:size="40" :glyph-size="20" reveal` (`:80-86`).

### The page chassis already renders the page-IDENTITY descriptor (the PH3 fence root)

`demo/stories/StoryPage.vue:101-121`: on a CONTENT page (`variant === 'page'`) the chrome `<header>` ALREADY renders `<StoryHeader :eyebrow :subpath :blurb>` with the audacious display `<h1>` (the eyebrow→subpath→title→blurb cluster). So the 36 inline `<header>`s are an ADDITIONAL in-body section header BELOW the chrome page header — a NAMED in-body section identity, NOT a page-title restatement (the paste comments confirm: `inputs.vue:11-12` "PH3-safe (inline borderLeft, not the `border-l-[3px]` + `<IconChip>` double-header shape)").

**The shape mismatch the fold must reconcile (load-bearing):** the inline page-header is `border-LEFT inline-style + pl-5 + items-center` with NO `<h2>` heading — eyebrow + blurb ONLY. `StorySectionHeader` is `border-l-[3px] pl-6` with a MANDATORY `<h2>`. So a 1:1 fold onto today's `StorySectionHeader` would FORCE a heading the page header does not have — the heading must become OPTIONAL, OR a `StoryPageHeader` sibling minted for the eyebrow-only case.

### The gate (verified)

`scripts/proof-storybook-meta.mjs`:
- M9d `detectDogfoodMints` (`:394-423`): asserts `StorySectionHeader` EXISTS + composes `<IconChip>` + no chip-re-paste; **never asserts ≥2 adopters** (the dead-mint hole — THIS wave owns the ≥2-adopter clause widen, folded from the retired BD.W-SECTION-HEADER-THREAD; see §4 M9e-3).
- M1 `idiom-B` (`:568`): "second header(s) survive … collapse onto the chassis hero / `<StorySectionHeader>`" — the existing second-header detector. The fold must keep M1 green.

---

## 3 · The build — precisely what changes (idiomatic, gestalt, zero src paint)

**Step A — make the chassis heading-optional (the reconcile).** Extend `StorySectionHeader.vue` so `heading?: string | null` is OPTIONAL (`:39` `heading: string` → `heading?: string | null`) and the `<h2>` renders `v-if="heading"` (`:95`). When `heading` is absent the unit is the eyebrow-only page-identity header: the accent rail + IconChip + tinted eyebrow + blurb, NO `<h2>`. The accent-rail `border-l-[3px] pl-6` + the `--section-label-accent` bake + the `color-mix` border-color (`:70-77`) ALREADY exactly match the inline paste's intent (the inline used `pl-5` + `borderLeft` inline-style + `color-mix(in srgb … 55%)`; the chassis uses `pl-6` + `border-l-[3px]` + `color-mix(in oklab … 35%)` — a deliberate IDIOM-UNIFY, not a regression: the chassis form is the canonical accent-rail register, and the small `pl-5→pl-6`/`55%→65%-opacity` delta is the fold REPLACING 36 ad-hoc literals with the ONE canonical value).

> **Decision — extend, do NOT mint a sibling.** The eyebrow-only case is `StorySectionHeader` with `heading` absent — the SAME accent-rail + chip + eyebrow + blurb anatomy, minus one `<h2>`. A `StoryPageHeader` sibling would be a second source for the identical shape (the anti-fork bar). Extend the one home; the heading-optionality is the only delta. (The heading-PRESENT form remains valid for any genuine in-body `<StorySection heading>` usage — but the disk-true set is entirely page-identity / eyebrow-only, so the heading-absent fold covers all 36.)

**Step B — fold all 36 paste sites (clean break, no dual path).** Each enrolled page replaces its inline `<header …borderLeft…>…</header>` with a single composed call. Using `inputs.vue` as the model:

```html
<StorySectionHeader
    :icon="TextCursorInput"
    :section="FORMS_STOP"
    eyebrow="Forms · Text input"
    blurb="Text fields, search, and password inputs — the field controls stay ink; the section identity is the ONE color event."
/>
```

The per-page `<STOP>_STOP` constant is KEPT (it now feeds `:section`); the `bloom` axis (the inline used `bloom reveal`, the chassis uses `reveal` only) folds onto the chassis default — `bloom` is a hover-only axis on a static page-identity chip, dropping it is a no-op visual at rest (the IconChip `:reveal` entrance is preserved; if a page legitimately wants the hover-bloom, the chassis grows a `:bloom` pass-through prop, but the default fold drops it as visually-inert-at-rest). The IconChip import + the eyebrow text + the blurb text move into the props. The inline `<header>` + its `:style` + its `<span>`/`<p>` are DELETED at every call site (no alias, no dual path — the clean-break discipline).

**The PH3-SAFE fence (load-bearing, NON-negotiable).** The fold must NOT re-introduce a body-level page-title `<h2>` that duplicates the chrome header's display `<h1>` (BC.W-PAGE-HIERARCHY PH3 forbids the double-header). Since `StorySectionHeader` is folded with `heading` ABSENT on the page-identity sites, NO `<h2>` is emitted — PH3-safe by construction. (A page that legitimately wants a NAMED in-body section heading uses `StorySectionHeader` WITH `heading`; the heading-PRESENT path stays valid, but the disk-true 36-set is all eyebrow-only page-identity headers, so the heading-absent fold applies to every enrolled file.)

**Fences respected:** foreign-tree (demo-private, zero sibling edits); GL-shader byte-fence (N/A — no shader); profile:budget (N/A — demo SFC, not the published bundle); warm-cream identity (the `--section-color-N` ramp is the LIBRARY identity, never a demo hue — the IconChip already reads it; no raw-Tailwind chromatic utility introduced); one-GL-per-route (N/A — no GL); presets-in-consumers (the section-stop constants stay per-page demo-local); substitution-vs-inheritance (the `--section-label-accent` bake is the chassis's existing inheriting register — unchanged). **Zero `src/` paint** — `StorySectionHeader.vue` is `demo/stories/`, an explicit demo-private chassis (its docstring: "A demo-private chassis primitive — NOT a library export (zero src/ paint)").

---

## 4 · The gate — born-RED → GREEN proof design

**Extend `proof:storybook-meta`** (NOT a new gate — the M9 family owns the storybook-dogfood census; a new clause is cleaner than a parallel gate). A new **M9e — page-identity-header fold** clause + a tightened M9d existence→fold-evidence arm. Born-RED on HEAD.

**Clauses (each born-RED at HEAD's 36-paste state):**
- **M9e-1 — the chassis is heading-optional.** Assert `StorySectionHeader.vue` source carries `heading?:` (the optional marker) AND a `v-if="heading"` on the `<h2>` — proves the eyebrow-only mode exists. RED on HEAD (`heading: string` required, `<h2>` unconditional). GREEN at Step A.
- **M9e-2 — the inline page-header paste is GONE in the enrolled set.** Over the 36 enrolled files, assert ZERO surviving inline `<header … borderLeft … section-label--tinted text-admin-label …>` paste (the `INLINE_PAGE_HEADER_RE` = the combination of `borderLeft:` in a `:style` AND `section-label--tinted text-admin-label` in the same SFC). RED on HEAD (36 hits — settings.vue's span-without-inline-borderLeft never matches the combined RE). GREEN at Step B (all folded). The enrolled set is the 36-file census (computed from the combined `borderLeft:`+span grep, recorded as `PAGE_HEADER_ENROLLED` in the gate, mirroring M9A_BASELINE's recorded-set discipline). The combined RE is what makes the count 36 not 37 — settings.vue (the 37th span-class match) carries no inline `borderLeft`, so the gate set is self-consistently 36.
- **M9e-3 — ≥2 real adopters of the chassis (THE dead-mint cure, J-inv-10).** Assert `grep StorySectionHeader demo/stories/**/*.vue` (excluding its own def file) yields ≥2 real consumers — the WHOLE dead-mint cure (this is the sole arm; the former Band-5 M9d ≥2-adopter widen folded HERE, since disk proves no distinct in-body adopter set exists). RED on HEAD (0 adopters — the orphan). GREEN at Step B (36 adopters). The existing M9d `detectDogfoodMints` existence-only assert (`proof-storybook-meta.mjs:394-423`: `sshExists`/`sshComposesIconChip`/`sshNoChipRePaste`) STAYS (necessary-not-sufficient); M9e-3 adds the ≥2-real-adopters predicate that makes the dead mint impossible to ship green again. There is NO separate ≥2-adopter clause in any other wave — this clause is the single home.
- **M9e-4 — PH3-safe (no body page-title duplication).** Assert no enrolled page emits a body-level `<h2>` that restates the page title alongside the chrome `<h1>` — the folded `StorySectionHeader` calls carry NO `heading` prop on the page-identity sites (assert `<StorySectionHeader` calls in the enrolled set have no `heading=` attr). RED would fire if a fold accidentally added a heading; GREEN when the eyebrow-only fold is clean.

**Self-test bite (planted defect that MUST red):**
- a synthetic enrolled SFC re-introducing the inline `borderLeft` + `section-label--tinted text-admin-label` paste MUST red M9e-2 (the regression a future page-add could ship);
- a synthetic `StorySectionHeader.vue` reverting `heading` to required (`heading: string`, unconditional `<h2>`) MUST red M9e-1;
- a synthetic 0-adopter OR 1-adopter state (the def file only, or a single consumer) MUST red M9e-3 (the dead-mint cure's distinguishing bite — a 2-adopter state passes; folded from the former BD.W-SECTION-HEADER-THREAD's self-test);
- a synthetic folded call carrying a `heading=` on a page-identity site MUST red M9e-4 (the PH3 over-reach).

**Born-RED proof:** at HEAD, M9e-1 (required heading), M9e-2 (36 pastes), M9e-3 (0 adopters) all RED. At the build, all four pass. The self-test reds the gate if any bite stops biting (the anti-de-fang floor, `proof-storybook-meta.mjs:selfTest()` precedent at `:479-527`).

---

## 5 · Paint verification — the π readback (BC anti-disease law)

This wave PAINTS (the in-body page-identity header is a visible surface), so it takes a **`proof:ba-gestalt` verdict on the `page-band` aggregate surface** (the storybook-meta chassis row in the BD-grown roster — BD.W-GESTALT-ROSTER-GROW; the demo panes aggregate under `page-band`, NOT an invented per-file row the gate's `REQUIRED_SURFACES` has no slot for) on a FRESH capture — NO source-green close, NO "is GREEN at this wave close; W-REFLECT re-confirms on the union tree" deferral (forbidden, G8). The folded `demo/stories/StorySectionHeader.vue` + the re-threaded page SFCs are enrolled in the `page-band` BD freshness record's `surface-paths`, so this fold drifts the surface-hash → G7 auto-revokes the `page-band` PASS until this wave re-captures + re-pixel-reads + re-stamps.

**The binding π** (a `tests-visual/storybook-meta.spec.ts` arm OR the `proof:ba-gestalt` `page-band` aggregate row in the BD roster, both modes × desktop+mobile, on the `:5199` demo origin):
- **(a) the fold reads identically** — capture `/forms/inputs`, `/containers/dialog`, `/display/badge` (the three representative folded pages) and assert the page-identity header reads as the SAME accent-rail + IconChip + tinted-eyebrow + blurb gestalt over the page wash it did pre-fold (the canonical accent-rail register paints the rail, the chip POPs, the eyebrow tints the section hue, the blurb stays muted ink). The small `pl-5→pl-6`/opacity unify is sub-perceptual (a few px of inset, an opacity tweak on the rail) — the gestalt is unchanged.
- **(b) both modes** — light + dark; the `--section-color-N` ramp + the `--section-label-accent` bake are mode-adaptive (the chassis already handles this), so the dark capture reads the warm section hue over the dark glass plate.
- **(c) the one-color-event proportion holds** — `proof:suffuse` d1-d3 stays GREEN (the folded header is the SAME single color event per surface — chip + rail + eyebrow in ONE hue, body ink untinted). A second event would red suffuse.

**The BC anti-disease law observed:** the device-free M9e clauses prove the SOURCE shape (the fold landed, the paste is gone, ≥2 adopters); the π proves the RENDERED pane (a stale fold that silently mis-renders the chip/rail would pass the source gate but red the capture). The demo panes have a REAL enforcement home — the `page-band` aggregate roster surface (the storybook-meta chassis; CLAUDE.md §W-DEMO-DESIGN: "the demo panes JOIN the gestalt roster" — realized at BD.W-GESTALT-ROSTER-GROW, which enrolls the folded demo-SFC `surface-paths` in the `page-band` BD freshness record); this wave re-earns the `page-band` verdict on the fresh post-fold capture.

---

## 6 · Fences + risks — what must NOT break

- **PH3-safe (load-bearing).** The fold must NOT add a body page-title `<h2>` duplicating the chrome `<h1>` (BC.W-PAGE-HIERARCHY PH3). The eyebrow-only fold (heading ABSENT) is PH3-safe by construction; M9e-4 guards it. Do NOT "helpfully" add a heading to the folded calls.
- **Clean break — no dual path.** Every inline `<header …borderLeft…>` is DELETED at the call site (no alias, no kept-fork). A page must not carry BOTH the chassis call AND the inline paste (the no-backwards-compat law; M9e-2 reds a survivor).
- **The heading-optional extension is additive (no Band-5 collision — the THREAD wave is RETIRED).** Making `heading` optional is purely additive: a present heading renders the `<h2>` exactly as today (the StorySection in-body usage at `data-table.vue:185` "Repositories" is a SEPARATE `<StorySection heading>`, unaffected), an absent heading is the eyebrow-only page-identity fold. There is NO second wave to coordinate with: BD.W-SECTION-HEADER-THREAD was RETIRED (its 2 claimed in-body adopters are disk-proven to be 2 of THESE 36 page-identity headers — no distinct in-body IconChip-led section-header set exists on disk), and its ≥2-real-adopters M9d gate-widen + self-test folded into M9e-3 above. ONE wave, ONE M9e clause family, ONE adopter count — no M9d/M9e split, no gate-arm collision. (FOLD-LEDGER Class F carries the THREAD RETIRE-rationale row.)
- **The IconChip `bloom` axis drop is a recorded no-op.** The inline paste used `bloom reveal`; the chassis uses `reveal`. `bloom` is a hover-only smooth-glass axis — dropping it on a static page-identity chip changes ZERO at-rest pixels (the `:reveal` entrance is preserved). If a page legitimately wants the hover-bloom, the chassis grows a `:bloom` pass-through; the default fold drops it as inert-at-rest. (Verify no enrolled page DEPENDS on the bloom-on-hover for its π — none do; they are static identity headers.)
- **Warm-cream identity + presets-in-consumers.** The `--section-color-N` ramp is the LIBRARY identity (the IconChip reads it); no raw-Tailwind chromatic utility is introduced, no demo hue enters a token. M7 stray-blue stays closed.
- **The recorded-set discipline (anti-gameability).** `PAGE_HEADER_ENROLLED` is the recorded 36-file census (the combined `borderLeft:`+span grep, excluding settings.vue); a NEW page adding a fresh inline page-header paste reds M9e-2 (the ratchet — a future agent cannot smuggle a 37th hand-roll). The enrolled set is computed-from-the-grep, NOT a frozen literal that greens vacuously.
- **Risk — low-medium.** 36 mechanical call-site folds + one heading-optional chassis extension + a gate clause (now including the ≥2-real-adopters widen + self-test folded from the retired BD.W-SECTION-HEADER-THREAD). The subtlety is the shape reconcile (the inline `pl-5`/`borderLeft`/`55%` vs the chassis `pl-6`/`border-l-[3px]`/`35%`) — recorded as a deliberate idiom-unify, π-verified sub-perceptual. No cross-wave gate-arm dependency remains (the THREAD wave is retired; this wave owns the whole dead-mint cure on disjoint-free single ownership).
