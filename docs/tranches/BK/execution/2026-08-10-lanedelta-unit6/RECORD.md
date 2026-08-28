# LANE δ — COMMIT-UNIT 6 · D6-CURE · THE FROZEN STILLS HAVE NO DARK ARM

**Scope:** one defect, one cure, one gate arm, one π enqueue. D6 from the browser seat's
δ3-π-5 verdict (`docs/tranches/BK/execution/2026-08-25-pi-band/delta-config-fourier-scroll-story/PI-BATTERY-delta-config-fourier-scroll-story.md:1158`),
routed by the census reconciliation block in `PI-CENSUS.md` to **#58 `W-PREVIEW-CARD`**.

**Mode:** implement seat, `claude-opus-5[1m]` asserted at step 0; the assertion gated the
chain. SHARED tree — no `add`/`commit`/`stash`/`checkout` by this seat.

---

## 1 · CENSUS — the tree at step 0, and what moved under it

Baseline banked BEFORE any byte: `/tmp/bk-lanedelta-baseline-1787954860.diff` (384 lines),
porcelain **10**, untracked **6** — all of them Lane α's (`demo/stories/data/search.vue`,
four `src/components/dock/styles/*.css`, `src/styles/glass/overlay-plate.css`,
`src/styles/utilities/a11y-overrides.css`, `tests/composables/search/search-contracts.test.ts`,
`lanealpha-unit5/RECORD.md`, and the whole `lanealpha-unit8/` dir). **FOREIGN — untouched.**

**HEAD moved under this seat, mid-run.** Step 0 read `87464122` (δ unit-5). Lane α sealed
`5cd70d08` while this unit was writing, and α's dirt left the porcelain with it. This
changes nothing about the cure — `5cd70d08` is dock/search and touches no preview-still
surface — but it is stated because the born-RED mirror below is cut at **`87464122`**, which
was HEAD when the mirror was taken and is the correct uncured base for D6 either way.

The two formerly-fenced unknown-owner surfaces (`src/styles/glass/material.css`,
`tests/styles/material-css-syntax.test.ts`) were clean at step 0 and are untouched here.
Lane β's unit-β0 dirt was already absent from the tree at step 0 — it is not this seat's,
and nothing was done about it.

### The defect, as the browser seat measured it

| route | strategy | light | dark |
|---|---|---|---|
| `/substrates/aurora` | still | uniq 628 · C max 0.067 | uniq **628** |
| `/substrates/blob` | still | uniq 917 · C max 0.091 | uniq 924 |
| `/substrates/constellation` | still | uniq 1171 · C max 0.114 | uniq 903 |
| `/substrates/fourier-field` | still | uniq 477 · C max 0.101 | uniq **477** |
| `/substrates/glass-material` | still | uniq 843 (scrolled) | uniq 844 (scrolled) |
| `/substrates/glass-panel` | still | uniq 1451 (scrolled) | uniq 1452 (scrolled) |

Verbatim from the verdict: *"the six `/substrates` stills are byte-identical across themes
(aurora still `uniqueRgb 628` and `C max 0.06739` in both), so dark mode paints six L≈0.93
cream slabs over a page ground this seat measured at L 0.34–0.57. The well beneath them *is*
theme-aware (`color-mix(in srgb, var(--card) 68%, transparent)`), and the image covers it."*

**Coordinates verified on disk, not trusted from the order.** The order named
`vizPreviewStill.ts:52-53, 255-278`. At `87464122` line 52-53 is exactly the palette
one-liner and 255-278 is exactly `render` + `vizPreviewStill`. **δ unit-5 moved nothing in
this file** — the order's hedge was warranted and the answer is "unmoved".

---

## 2 · THE CURE — a second paint ARM, chosen on the bytes

`demo/chassis/landing/vizPreviewStill.ts` had **no theme input anywhere**: `warm(h, l, a)`
baked `hsla(h, 48%, l%, a)`, `warmFloor` painted L 92→86, `render(spec)` took only the
`(pattern, hue, seed)` triple, and the memo keyed on the route alone. Three candidate
mechanisms were on the table; the grounds for the pick:

| candidate | disposition |
|---|---|
| **theme-paired rasters from an arm table** | **TAKEN.** Keeps the raster a pure function of its inputs, keeps the file's own stated constraint (legacy `hsla`, canvas-safe), costs one extra raster per route per theme, and makes the theme a *declared* draw input a unit test can read. |
| paint from theme tokens at draw time | REFUSED with its reason, now written into the file: `getComputedStyle` returns **`oklch()`** for this codebase's tokens and canvas will not parse it. The file's own line 52 comment ("no oklch dependence") was already guarding against exactly this. |
| a scrim / filter over the light raster | REFUSED as the **masking-fallback class** outright — house law, and named as such in the order. A scrim hides a wrong-theme paint instead of replacing it. The battery carries a row that fails if one ever appears. |

### The arm, and why it is one rule rather than ten knobs

The generators author **one** lightness ramp and author it in light: a cream GROUND at the
top (L 96/92/88/86) and darker warm MARKS below (L 82…45). An arm declares where the ramp's
two ends land; everything between interpolates.

```ts
export const STILL_ARMS: Readonly<Record<StillTheme, StillArm>> = {
    light: { sat: 48, ground: RAMP_GROUND, mark: RAMP_MARK, specular: 0.5 },
    dark:  { sat: 62, ground: 15,          mark: 68,        specular: 0.3 },
};
```

- **The light arm is the IDENTITY by construction** — its `ground`/`mark` *are* the ramp
  ends, so the transfer maps every stop onto itself. This cure moves **no light byte**, and
  that is proved rather than asserted (§4).
- **The dark arm inverts the polarity**: `ground` becomes the darkest thing and `mark` the
  brightest. That is the luminous-dark transmissive model — on a dark ground everything
  reads by LIFTING, because there is no such thing as ink on an ember field. This is the
  `SectionPreviewCard` dark preview-field discipline named at
  `demo/chassis/hero/aurora-hero.ts:309-311`, applied to the raster the card actually shows.
- **Saturation RISES in dark, and must.** hsl saturation is relative to its own lightness, so
  holding `48` at L 19 carries far less chroma than `48` at L 92 and collapses the ember to
  charcoal — the exact failure the cited discipline names ("chroma KEPT so the field GLOWS
  amber/terracotta rather than collapsing to a charcoal slab").
- **The specular streak is the ONE off-ramp paint.** It is white because it is *light-source*
  coloured, not theme coloured, so it does not invert; only its strength moves, because the
  same `0.5` that reads as a subtle sheen on a cream plate blows out on a dark one.

### Photometry — computed, not captured

sRGB→OKLab on the arm's own output (`hue 58`, the aurora still's signature):

| authored L | dark hsl L | **light** OKLab L / C | **dark** OKLab L / C |
|---|---|---|---|
| 96 (rim) | 15.00 | 0.981 / 0.012 | 0.349 / 0.064 |
| 92 (ground top) | 19.16 | 0.962 / 0.025 | 0.410 / 0.077 |
| 86 (ground bottom) | 25.39 | 0.933 / 0.044 | 0.498 / 0.096 |
| 70 (nuclei) | 42.02 | 0.858 / 0.091 | 0.717 / 0.142 |
| 58 (blob body) | 54.49 | 0.802 / 0.122 | 0.831 / 0.155 |
| 45 (graph node) | 68.00 | 0.708 / 0.127 | 0.878 / 0.121 |

The six stills' dark ground gradients land at OKLab **L 0.36 → 0.50** — *inside* the page
ground's measured L 0.34–0.57, in place of the L≈0.93 slab. Chroma at the dark marks runs
0.12–0.16, against the light arm's own 0.12–0.14: the chroma is genuinely kept, not
collapsed.

**These figures are COMPUTED from the arm, not read off a pixel.** They say the numbers are
in band; they do not say the landing looks right. That verdict is π's and is ENQUEUED
(`PI-QUEUE.md`), claimed by nobody here.

**One figure stated against a possible objection.** `aurora-hero.ts` names a recessive leg
of "chroma ≤ 0.10" for the page-wide **shell field**. This is not that surface: a 132×82
thumbnail inside a card is a picture, not a substrate behind text, and the **light** arm
already runs C to 0.138 at the same stops. No leg is broken; the two surfaces have different
laws and this record says which one applies.

### The FLIP, which is the half a paired raster alone would miss

Theme-paired rasters are worthless if the page never asks for the second one. `theme` is
threaded as an **argument** through the ladder — `vizPreviewStill(route, theme)` →
`resolveStoryTile(id, story, theme)` → `resolveCategoryTile(category, theme)` — and the three
front doors read it from a reactive `stillTheme`:

| surface | seam |
|---|---|
| `SectionLanding.vue` | `tileFor(story)` is called from the template, so reading `stillTheme.value` inside it puts the flag in the render effect's dependency set |
| `CatalogLanding.vue` | `:tile="resolveCategoryTile(category, stillTheme)"` — the template reads it directly |
| `stories/foundations/intro.vue` | `categories` is a `computed` that depends on `stillTheme.value` |

A **hidden** read of `useGlobalDark()` inside the raster would have kept every signature
unchanged and was rejected: it makes the resolver untestable by its own signature, gives the
raster a side effect (the dark singleton writes `document.documentElement.style.colorScheme`),
and hides the very draw input this defect was about.

`theme` carries **no default**. A default is a light-arm fallback that every un-migrated call
site silently inherits — D6 restated as an API. The battery detects it by arity.

The memo key is now `` `${theme}|${route}` ``. Keying on the route alone is the defect a
second time: whichever theme asked first would freeze the answer for both, and a flip would
be served the wrong arm out of cache. Still **zero GL**, and at most 12 rasters app-wide.

---

## 3 · THE GATE ARM — draw inputs, because painted bytes are a FALSE GREEN here

The order allows "the still's painted output **(or its draw inputs)**". The disjunction is
load-bearing and this seat measured which arm is honest, rather than picking one:

```
~~happy-dom (vitest.config.ts:26)~~ [2026-08-28 · CURE 1: the repo's OWN setup stub — tests/setup.ts:127-141; happy-dom is the env, its raw getContext returns null] CanvasRenderingContext2D:
  fillRect              → function
  createLinearGradient  → function
  beginPath             → undefined
  toDataURL("image/png")→ "data:image/png;base64,AA=="   ← CONSTANT, whatever was painted
```

So a raster comparison in a unit test would report the two arms **EQUAL** and go green on the
bug. A painted-output gate here is not weak, it is *inverted*. The gate reads **draw
inputs**, and the pixel claim is ENQUEUED to the browser seat where it can actually be taken.

The file's existing comment blamed `jsdom` and said only that `beginPath` throws. That is
committed text, it is imprecise, and this seat measured the truth — so it carries a
strike-in-place dated bracket rather than a silent edit.

**12 rows, added to `tests/demo/story-preview-card.test.ts`** — the family's own close
battery. **SEATS +0**: these are `it` rows on an existing file, no `G-` name is minted, and
`node scripts/gate-register.mjs` prints byte-identical pre and post (§4).

| row | what it holds |
|---|---|
| declares two arms, and no field of one is the other's | every field differs |
| inverts the ramp's polarity | `light.ground > light.mark` **and** `dark.ground < dark.mark` — a uniform darkening keeps `ground > mark` in both arms and fails here |
| puts the ENTIRE dark arm below the light arm's ground | the arm-level statement of "no cream slab survives" |
| holds chroma instead of collapsing to charcoal | `dark.sat > light.sat` |
| anchors the light arm on the ramp the generators author | `max(stops) === light.ground`, `min(stops) === light.mark`, stops parsed from **this file's own source** — one source of record, no duplicated table |
| keeps the LIGHT arm an exact identity | `stillColor(light, 40, l, 0.5) === hsla(40, 48%, ${l}%, 0.5)` at every stop — the no-regression row |
| lets NO authored lightness escape theming | every parsed stop paints differently per arm, and the parsed count is reconciled against the raw call tally so a smuggled literal is caught |
| keeps the specular WHITE, moves only its strength | the off-ramp paint stays off-ramp |
| requires a theme at the boundary | `vizPreviewStill.length === 2` — a default param drops arity to 1 |
| carries the arm in the MEMO KEY | the flip cannot be served the wrong raster |
| re-resolves on the FLIP at every landing | all three front doors track `useGlobalDark` + `stillTheme` |
| cures by REPAINTING, never by scrimming | a **guard**, not a detector — see below |

### BORN-RED — `git archive 87464122` mirror, cwd AT the mirror

`docs/tranches/BK/execution/2026-08-10-lanedelta-unit6/born-red-D6.log`

```
Tests  11 failed | 1 passed | 55 skipped (67)

× declares two arms, and no field of one is the other's
× inverts the ramp's polarity — light grounds ABOVE its marks, dark BELOW
× puts the ENTIRE dark arm below the light arm's ground — no cream slab survives
× holds chroma in the dark band instead of collapsing to charcoal
× anchors the light arm on the ramp the generators actually author
× keeps the LIGHT arm an exact identity — the cure moves no light byte
× lets NO authored lightness escape theming
× keeps the specular streak WHITE and moves only its strength
× requires a theme at the boundary — there is no default arm to inherit
× carries the arm in the MEMO KEY, so a flip cannot be served the wrong raster
× re-resolves on the FLIP at every landing that shows a still, not only on mount

TypeError: Cannot read properties of undefined (reading 'light')          ×8
AssertionError: expected 1 to be 2 // Object.is equality
AssertionError: expected '…import { makeHa…' to contain 'const key = `${theme}|${route}`'
AssertionError: expected '<script setup lang="ts">…' to contain 'useGlobalDark'
```

**11 of 12 RED. The 12th passed, and it is reported rather than hidden:** *"cures by
REPAINTING, never by scrimming a light raster"* is green against the uncured bytes because
the uncured tree has no scrim either — the defect was a *missing dark arm*, not a wrong
overlay. It is a **guard against the wrong cure**, not a detector of this defect, and it is
labelled as one. `expected 1 to be 2` is the arity detector reading the uncured
single-parameter export.

**The first cut of the block was restructured for this.** It destructured `STILL_ARMS` at
`describe` scope, which against the uncured bytes killed collection and reported *one*
un-attributed `TypeError` for the whole file — no row-level evidence at all. The arms are now
read inside each row. That is better hygiene independent of the born-RED, and the collapsed
first transcript is what proved it.

---

## 4 · VERIFY — real exit codes, never a piped tail's

```
$ npm run typecheck                          → exit 0
  vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json   (both arms clean, zero output)

$ node scripts/gate-register.mjs             → exit 0
  seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13
  armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
  BYTE-IDENTICAL pre and post — seats +0, nothing minted.

$ npm run demo:dist:build                    → exit 0
  ✓ built in 777ms
  the arm verified IN THE EMITTED BUNDLE by grep, not assumed —
  dist-demo/assets/storyTile-D1pw13H-.js:
    light:{sat:48,ground:E,mark:D,specular:.5},dark:{sat:62,ground:15,mark:68,specular:.3}

$ npx vitest run                             → exit 1
  Test Files  1 failed | 224 passed (225)
  Tests  1 failed | 2149 passed | 10 expected fail (2160)

  ZERO δ-OWNED FAILURES. The one RED is FOREIGN and attributed:
  tests/public-surface.spec.ts > Row 8 — the built dist/ (mtime 2026-08-10 14:07,
  EIGHTEEN DAYS pre-session) ships no components/dock/styles/run.css where src/ now
  has one. run.css entered at 5cd70d08 — LANE α's seal. This unit's diff carries zero
  src/ lines and zero dist/ lines, so the row's verdict is INVARIANT under it.
  One of the two stale-dist REDs standing until the close build.

$ npm run verify:package                     → exit 1
  components/handmark/geometry.d.ts: bare declaration reference @mkbabb/pencil-boil
  requires direct dependency ownership of @mkbabb/pencil-boil
  FOREIGN (γ's surface, same stale dist/). The script throws on its FIRST failure, so
  the run never reaches the ratchet arm: G-BUNDLE-RATCHET stands RED BY ROUTE and is
  UNMEASURED this run. Stated, not papered. This seat's contribution to shipped bundle
  bytes is ZERO — the whole diff is demo/ and tests/, neither of which enters dist/.
```

### The battery figure MOVED, and the movement is accounted

Standing quiesced-class read was `2015 passed | 7 xf`; the batch has moved it since (α's
unit-8 landed +rows before this run). This seat's own line is `2149 passed | 10 xf`, of which
**+12 are this unit's** D6 rows.

**One RED was δ-CAUSED and is reported as such rather than lumped with the foreign pair.**
`tests/gates/boot-graph.test.ts > the dist-demo it measures is NEWER than every source it is
built from` was **GREEN at step 0** and went RED on this seat's first `demo/` write. It is not
a defect: the gate walks all of `demo/` + `src/` for the newest mtime, so *any* edit to either
tree REDs it until the demo is rebuilt. Measured both ways before touching it:

```
dist-demo/index.html built    : 2026-08-28T14:08:04
newest source EXCLUDING mine  : 2026-08-28T14:07:48  demo/stories/navigation/toc-tracking.vue
newest source INCLUDING mine  : 2026-08-28T18:15:09  demo/stories/foundations/intro.vue
  verdict WITHOUT δ unit-6 : GREEN
  verdict WITH    δ unit-6 : RED
```

The cure is the build, not a note — so this seat ran `npm run demo:dist:build` (exit 0,
`dist-demo/` is gitignored and enters no commit) and the row is **GREEN** in the final line
above. This is the same build unit-5's seat ran. It was safe to run here because α had
already sealed and this was the only live lane; had another lane been mid-write, the honest
move would have been to leave it RED for the close build rather than bake a half-written tree
into an artifact, and that is recorded as the rule for the next seat.

### The light arm is byte-identical — proved, not claimed

The strongest property of this cure is that it cannot regress light. Verified two ways:

1. **Arg-triple equivalence**, pre-bytes vs post-bytes, comments stripped:
   `PRE warm() paint calls: 14` · `POST stillColor() calls: 14` · **ARG-TRIPLE MISMATCHES:
   none** — every paint asks for the same `(hue, L, alpha)`. Specular: pre
   `hsla(0, 0%, 100%, 0.5)`, post `hsla(0, 0%, 100%, ${arm.specular})` with
   `light.specular = 0.5`.
2. **The identity row** in the battery, over every stop parsed from the file itself.

---

## 5 · REFUSALS AND RULINGS

| # | disposition |
|---|---|
| R1 | **Token-reading at draw time REFUSED** — `getComputedStyle` yields `oklch()`, canvas cannot parse it. Written into the file so the next author does not retry it. |
| R2 | **Scrim/filter REFUSED** — masking-fallback class. A battery row now fails if one appears. |
| R3 | **Hidden `useGlobalDark()` inside the raster REFUSED** — hides the draw input, gives the raster a document side effect, defeats signature-level testing. |
| R4 | **A default `theme` REFUSED** — it is D6 re-introduced as an API default. Arity-gated. |
| R5 | **A painted-output gate REFUSED with its measurement** — ~~happy-dom's~~ [2026-08-28 · CURE 1: the repo's own setup stub's (tests/setup.ts:140)] `toDataURL` is a constant; such a gate would be a false green. Draw inputs instead, pixels to π. The conclusion STANDS strengthened — the constant is repo-owned code. |
| R6 | **`npm run build` (the library dist) NOT run.** This diff is `demo/` + `tests/` only; nothing enters `dist/`. Rebuilding it would have cleared the foreign Row 8 RED and *disguised* a standing stale-dist fact that is not this lane's to discharge. |

**Carried, not resolved:** the metaball's L 82 spot and the glass plate's L 96 rim invert with
the ramp, so in dark they read as recessive detail rather than lifts. Both stay *within* their
figure's tonal band and both remain legible; on a dark ground the plate reads as smoked glass
over an ember field, which is a coherent dark-glass idiom rather than an artefact. This is a
judgement about pixels, so it is **named for π** rather than settled here — π-RERUN-D6's KILL
clause is written against exactly it.

---

## 6 · FENCE

```
 M demo/chassis/landing/vizPreviewStill.ts        +168 −43
 M demo/chassis/landing/storyTile.ts               +27  −9
 M demo/chassis/landing/SectionLanding.vue         +11  −1
 M demo/chassis/landing/CatalogLanding.vue          +9  −1
 M demo/stories/foundations/intro.vue               +9  −1
 M tests/demo/story-preview-card.test.ts          +221 −25
?? docs/tranches/BK/execution/2026-08-10-lanedelta-unit6/
       RECORD.md · PI-QUEUE.md · PASTE-BLOCKS.md · born-red-D6.log · green-D6.log
```

`demo/stories/foundations/intro.vue` is inside Lane δ's standing **`demo/stories/**`** fence
(ratified lane text) and is the third front door consuming `resolveCategoryTile` — a signature
change that skipped it would not typecheck. `demo/stories/data/search.vue` (α) and
`demo/stories/substrates/aurora.vue` (γ) are the two rows other lanes hold this run and
**neither was opened**.

**NOT touched:** the α π-cure quartet in every part — `demo/stories/data/search.vue`, all
`src/components/dock/styles/*`, `src/styles/glass/overlay-plate.css`,
`src/styles/utilities/a11y-overrides.css`, `tests/composables/search/search-contracts.test.ts`,
`lanealpha-unit5/` and `lanealpha-unit8/` · every γ handmark surface ·
`src/styles/glass/material.css` + `tests/styles/material-css-syntax.test.ts` (landed
attributed at `2cfc1124`, ordinary tracked files, still not lane surfaces) · all of `src/` ·
`dist/` · `PI-CENSUS.md` · the π band's banked artifacts · every other lane's record.

`dist-demo/` was rebuilt (gitignored, enters no commit). No `add`/`commit`/`stash`/`checkout`.
