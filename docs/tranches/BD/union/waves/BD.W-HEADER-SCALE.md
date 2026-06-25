# BD.W-HEADER-SCALE — the demo header rung is 2× too large; HALVE it at the chassis (library √φ ladder UNTOUCHED)

**Band 16 · DEMO-CHASSIS · depends: none (a self-contained chassis rung edit; co-lands with BD.W-PAGE-CHASSIS / BD.W-STICKY-TITLE-CONDENSE on the same StoryHero/StoryPage seam but does not require them)**

## The defect / the ask

ADDENDUM-DEMO-CHASSIS §"binding asks" item 2 (verbatim intent): **"Header text 2× TOO LARGE on ALL pages. The hero `<h1>` (text-display-3+) fills the viewport (screenshot-confirmed)."** The page-audit fleet LIVE-CONFIRMED the exact rungs with `getComputedStyle` (chrome-devtools-mcp, `:5173`/`:5199`, every category):

- `/substrates/aurora` → hero `<h1>` **fontSize 244.8px** (`text-display-hero`; viewport ~895px tall — the title eats ~25% of the viewport height).
- `/substrates/dot-flow-field` → hero `<h1>` **244.8px**, "Dot Flow Field" WRAPS TO TWO LINES and fills the ENTIRE first viewport — the actual viz canvas the page exists to show sits at `top: 1224px`, two full scrolls below the fold.
- `/display/buttons` (D2 main) → hero `<h1>` **109.7px** (`text-display-5`), line-height 115px, width 1152px — a single word filling the article width.
- `/foundations/*` + every D3 sub → hero `<h1>` **86.1px** (`text-display-4`).

This is the SINGLE biggest defect on every viz page (substrates §1 note: "the title eats the whole viewport and buries the viz the page exists to show"). The instrument-chassis composition sits below `top:520px` for the same reason (compositions batch-4).

**The root, file:line.** The demo hero `<h1>` resolves `text-display-${heroScale}` in the chassis — `StoryHero.vue:92` `heroClass = computed(() => \`text-display-${props.heroScale}\`)` (and the identical chrome-header form in `StoryPage.vue:114`). `heroScale` is assigned per-route in `manifest.ts:453-455 assignDepths()`:

```ts
// manifest.ts:453-455 (HEAD)
if (!story.heroScale) {
    story.heroScale =
        depth === "D0" ? "mega" : depth === "D2" ? "5" : "4";
}
```

plus 14 explicit `heroScale: "hero"` rows + 1 `"mega"` row (the substrate/marquee live-GL pages, `manifest.ts:421,504,554,569,…`). So the over-scale enters through TWO sources — the auto depth→rung map AND the explicit per-row override — both of which feed the ONE `heroClass` computed.

**The fence (load-bearing).** This is NOT the library's audacious-type identity. The library √φ display ladder (`src/styles/typography/scale.css:120-144` `--type-display-1..5/-mega/-hero/-audacious`, the fast.com-peg 177-352px metric/number surfaces) is CORRECT as a design IDENTITY — it is the demo HEADER rung that picked too-high a ladder step. A page TITLE belongs in the heading/title band (`--type-title` 32.9px / `--type-display-2` ~44px), NOT at `text-display-4/5` (86-110px). The fix touches ONLY the demo chassis's per-depth rung SELECTION; `scale.css` is byte-untouched.

## The mechanism

ONE chassis edit: a HALVING re-key of the depth→rung map, expressed ONCE in the chassis so all 118 pages propagate (the KISS/DRY law — a per-page rung override is the anti-pattern). The cleanest single seam is a `HALVED_HERO_RUNG` map consumed by the `heroClass` computed (the SAME computed both `StoryHero.vue:92` and `StoryPage.vue:114` express) — re-keying the SELECTION leaves the `manifest.ts` `heroScale` values and the auto map UNTOUCHED (a story still declares its relative weight "hero"/"5"/"4"; the chassis maps that weight onto a HALVED ladder step).

1. **The halving map (the ONE seam).** A `HALVED_HERO_RUNG: Record<HeroScale, string>` (a demo-chassis constant beside `StoryHero.vue`, e.g. `demo/stories/hero-scale.ts`) maps each declared `heroScale` weight onto its halved `text-*` rung — the relative step PRESERVED (a "hero"/marquee page stays larger than a "4"/sub page), both anchors halved into the heading/title band:

   | declared `heroScale` | HEAD rung (px @ ~895vw) | HALVED rung | px @ ~895vw |
   |---|---|---|---|
   | `audacious` | `text-display-audacious` (352) | `text-display-3` | ~59 |
   | `mega` | `text-display-mega` (177) | `text-display-2` | ~44 |
   | `hero` | `text-display-hero` (244.8) | `text-display-2` | ~44 |
   | `5` (D2 main) | `text-display-5` (109.7) | `text-display-2` | ~44 |
   | `4` (D3 sub) | `text-display-4` (86.1) | `text-title` | 32.9 |

   The chassis `heroClass` becomes `computed(() => HALVED_HERO_RUNG[props.heroScale])` (a map READ, not a string-template — the template `text-display-${heroScale}` is RETIRED, clean break per the no-backwards-compat law). The audit's explicit guidance is honored: "D2 resolves `text-display-2` (~53px) and D3 resolves `text-title`/`text-display-1` (~33-42px) — roughly HALVING `assignDepths()`'s `5`/`4` map" (display §1). The live-GL marquee weights (`hero`/`mega`/`audacious`) collapse onto the `text-display-2`/`-3` band — a viz page title at ~44-59px reads as a marquee WITHOUT burying the viz (the viz canvas returns above the fold).

2. **BOTH header forms read the SAME map (no second seam).** `StoryHero.vue:92` (the hero-card `<h1>`) AND `StoryPage.vue:114` (the chrome `<header>` form on `variant="page"`) consume the ONE `HALVED_HERO_RUNG` map — there is NO second rung-selection site. (The BB.W-HIERARCHY2 hero-cluster suppression already shows the descriptor ONCE per page; this wave halves the rung that descriptor renders at.) `story-hero.css` `.story-hero-title` carries NO own font-size that could re-inflate (it reads the `text-display-*` utility's `font-size`); if it does, the halving map is the sole size source (the gate's fence catches a re-inflating local rule).

**The fence held in code.** `scale.css` `--type-display-*` is byte-untouched (the gate asserts byte-identity). No `manifest.ts` `heroScale` VALUE changes (a story keeps its declared relative weight; the chassis re-keys the SELECTION). The map is a demo-chassis artefact — ZERO `src/` paint, ZERO library token edit. **Compositor-irrelevant** (a font-size is a static rung, no animation). **PRM-irrelevant** (a static size). **KISS+DRY**: ONE map, ONE computed, 118 pages propagate.

## The gate — proof:header-scale (born-RED → GREEN)

A device-free SOURCE arm (`["local","ci"]`) for the MAP shape + the library-fence byte-assert, **plus a REAL `getComputedStyle` π readback** for the binding paint (the Pass-D bar — a getComputedStyle/px readback, NOT a presence-regex). NEW gate. The detector comment-strips first + exports a pure detector for the self-test bites.

- **H1 — the halving MAP is the sole rung-selection seam (the chassis-once fix).** `HALVED_HERO_RUNG` exists as a `Record<HeroScale, …>` with all 5 keys, AND both `StoryHero.vue` + `StoryPage.vue` `heroClass` READ the map (the `text-display-${heroScale}` string-template form is GONE from both — the clean break). Born-RED: HEAD has the string-template, no map. Self-test bite: a re-introduced `text-display-${heroScale}` template in either file REDS; a second independent rung-selection site (a per-page `text-display-N` on a story `<h1>` outside the chassis) REDS.
- **H2 — every mapped rung is in the HEADING/TITLE BAND, not the display-4/5/hero band (the halving is REAL).** Each `HALVED_HERO_RUNG` value resolves to a rung `≤ text-display-3` (the band ceiling) — no value is `text-display-4`/`-5`/`-mega`/`-hero`/`-audacious` (the over-scaled steps). Born-RED on the HEAD map (which would resolve `5`/`4`/`hero` directly). Self-test bite: a map value set back to `text-display-5` REDS (the halving cannot silently un-halve).
- **H3 — the relative step is PRESERVED (a marquee stays larger than a sub).** The mapped rung for `hero`/`mega`/`audacious`/`5` (the marquee/main weights) resolves to a LADDER STEP `≥` the `4`/sub weight's mapped rung (the ordering `4 ≤ 5/hero/mega ≤ audacious` holds on the halved ladder) — the halving compresses the band, it does not flatten the hierarchy. Born-RED only if the map inverts; the positive assert locks the design intent.
- **H4 — the library √φ ladder is BYTE-UNTOUCHED (the load-bearing fence).** `src/styles/typography/scale.css` `--type-display-1..5/-mega/-hero/-audacious` (and the `@utility text-display-*` bodies in `semantic.css`) are byte-identical to HEAD (a content-hash of the display-token block matches the pinned snapshot). Born-RED is N/A here (HEAD is the fence baseline); the assert REDS if a future agent "fixes" the header by shrinking the library ladder instead of the demo map. Self-test bite: a synthetic edit to a `--type-display-N` clamp REDS (the fence cannot be evaded by touching the library).
- **H5 — `manifest.ts` `heroScale` VALUES + `assignDepths()` are unchanged (the SELECTION-not-VALUE fix).** The `assignDepths()` auto map (`D2 → "5"`, `D3 → "4"`) + the explicit `heroScale: "hero"/"mega"` rows are byte-unchanged (the story keeps its declared weight; the chassis halves the rung the weight maps to). Born-RED is N/A; the positive assert records that the fix is a chassis-rung re-key, not a manifest re-tag (so the design weight semantics survive). Self-test bite: a map that reads the manifest VALUE instead of re-keying it (i.e. a no-op pass-through) REDS.

**Self-test bites (each planted defect MUST red):** (a) the `text-display-${heroScale}` string-template re-added → H1 RED; (b) a map value set to `text-display-5`/`-hero` → H2 RED; (c) a map that inverts the marquee/sub ordering → H3 RED; (d) a `--type-display-N` clamp edited in `scale.css` → H4 RED; (e) a per-page `<h1 class="text-display-4">` outside the chassis → H1 RED.

**What reds on the pre-fix tree:** H1 (no map — HEAD uses the string-template), H2 (HEAD resolves `hero`/`5`/`4` → the display-4/5/hero band directly).

## The binding π — tests-visual/header-scale.spec.ts

The painted-truth `getComputedStyle` readback, BOTH modes (light + dark) × {desktop, mobile}, served at `:5199` (the demo origin the config defaults), `reducedMotion` SAFE (a static font-size — no live field needed; capture is deterministic). The surfaces are the THREE live-confirmed over-scale exemplars — one per declared-weight class — so the π binds the actual measured defect:

- **THE HALVED RUNG RESOLVES (the headline π).** Navigate `/substrates/aurora` (declared `heroScale: "hero"`), `getComputedStyle` the hero `<h1>` `fontSize` → it resolves the HALVED `text-display-2` value (≈ 44px at the spec viewport, **NOT 244.8px**); `/display/buttons` (declared `"5"`/D2 main) → the hero `<h1>` resolves `text-display-2` (≈ 44px, **NOT 109.7px**); a `/foundations/*` D3 sub (declared `"4"`) → the hero `<h1>` resolves `text-title`/`text-display-1` (≈ 33px, **NOT 86.1px**). The assert is a px-band readback against the resolved `text-display-*` token VALUE at the capture viewport (computed from the same `scale.css` clamp — NOT a hardcoded pixel, so it survives a viewport change), with a tolerance band; born-FAIL on HEAD's 244.8/109.7/86.1px.
- **THE LIBRARY TOKENS ARE BYTE-IDENTICAL (the fence π).** `getComputedStyle(:root)` resolves `--type-display-4`/`--type-display-5`/`--type-display-hero` to their HEAD values (the library ladder is unmoved — the px the *demo* header NO LONGER uses is still resolvable on the library token). The distinguishing refutation: the header shrank because the chassis picked a LOWER rung, NOT because the library ladder shrank — a regression that "fixed" the header by editing `scale.css` would FAIL this fence (the library identity must survive).
- **THE VIZ RETURNS ABOVE THE FOLD (the gestalt consequence).** On `/substrates/dot-flow-field`, the viz `<canvas>`'s `getBoundingClientRect().top` is `< viewport height` (above the fold) — the 244.8px two-line title no longer buries it at `top:1224px`. A consequence-readback proving the halving FIXED the real complaint (the title burying the viz).
- **THE HIERARCHY HOLDS:** on a category landing, the D2 main's hero `<h1>` `fontSize` resolves `≥` a D3 sub's (the marquee stays larger than the sub — the H3 ordering, measured in pixels).

## The gestalt row

**BD-union-roster surface: `header-scale` (the demo-header-rung verdict — co-validates EVERY page's gestalt row).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture of `/substrates/aurora` + `/display/buttons` + `/substrates/dot-flow-field`, surface-hash freshness floor, 4 PNGs {light,dark}×{desktop,mobile}. The gestalt judgement: the page TITLE reads as a confident heading/title-band marquee (≈ 33-59px) that SITS ABOVE its body and LEAVES the viewport for the content the page exists to show — the viz canvas/specimen returns above the fold, the title no longer eats ~25% of the viewport nor wraps to two lines. Born-FAIL on HEAD (the 244.8px title burying the viz). GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels, never the first paint. Wired into the union roster by W-GESTALT-WIRE. (This row is the cross-cutting one — EVERY other page's gestalt row inherits the halved header by construction; this row is the single binding witness that the chassis-once fix propagated.)

## Fences

- **The library √φ ladder is INVIOLATE (the load-bearing fence — H4).** `scale.css` `--type-display-*` + the `text-display-*` utilities are byte-untouched. The audacious-type identity (the metric/number 177-352px surfaces) is the library's design signature; this wave does NOT touch it. The header shrank because the DEMO chassis picked a lower ladder step, NOT because the ladder moved. A future agent "fixing" the header by editing the library ladder is the anti-pattern the H4 fence + the π library-token assert catch.
- **No-legacy / clean break.** The `text-display-${heroScale}` string-template is DELETED from both `heroClass` computeds (no dual-read, no alias) — the map is the sole rung source. The `manifest.ts` `heroScale` VALUES stay (a story declares its relative weight; the chassis re-keys the SELECTION).
- **SELECTION-not-VALUE (H5).** `assignDepths()` + the explicit `heroScale` rows are unchanged — the design weight semantics ("hero" > "5" > "4") survive; only the rung each weight MAPS to halves. (The alternative — re-tagging 15 manifest rows + the auto map — would scatter the fix across the manifest and re-introduce the per-page anti-pattern; the chassis map is the single seam.)
- **ZERO `src/` paint.** The map is a demo-chassis artefact (`demo/stories/`). No library token, no library component, no `src/styles/` edit.
- **The anti-pattern this must NOT become:** a per-page `<h1 class="text-display-N">` override (the H1 second-seam fence — the fix is ONE map, not 118 page edits); OR a `scale.css` ladder shrink (the H4 fence — the library identity is inviolate); OR a flattened hierarchy (the H3 fence — the marquee stays larger than the sub); OR a manifest re-tag that loses the declared weight semantics (the H5 fence).

## Disposition links

- **GROUNDED in** ADDENDUM-DEMO-CHASSIS §"binding asks" item 2 + §"Page-audit fleet — batch 1" W-HEADER-SCALE (the live-measured 244.8/109.7/86.1px) + the per-category page-audit confirmations (substrates §1, display §1, compositions batch-4 — the 244.8px `mega`/`hero` title burying instrument-chassis).
- **CO-LANDS with BD.W-PAGE-CHASSIS** (the `--story-header-rule` hairline + the duplicate-header fold) + **BD.W-STICKY-TITLE-CONDENSE** (the scroll-condense register) on the SAME `StoryHero`/`StoryPage`/`story-hero.css` seam — three chassis-once edits to the header cluster, file-line-disjoint (this wave owns the rung SIZE; PAGE-CHASSIS owns the rule + the header fold; STICKY owns the scroll register). They do not import each other.
- **MINTS** `demo/stories/hero-scale.ts` (the `HALVED_HERO_RUNG` map) + the `heroClass` re-key in `StoryHero.vue` + `StoryPage.vue`.
- **ENROLLS in the demo-chassis census** — `hero-scale.ts` is a chassis artefact in the `demo/stories/` roster (beside `manifest.ts`/`StoryHero.vue`); the map cannot drift unaudited.
- **The library-fence reference** — points at CLAUDE.md §"The display ladder carries a DISPLAY-ONLY Apple-calibrated tracking + leading (BB.W-DISPLAY-TRACKING)" + `src/styles/typography/scale.css` (the √φ identity this wave is fenced AWAY from).
