# BI.W-GLASS-DEDUP — GlassPanel retire + the second-refraction-path kill + the dead-class deletes

Band B2 (glass taxonomy). Lands ON W-SURFACE-EXTRACT. Design: D-GLASS GLASS-A (PASS-1 §3c, FAM-10 the
mechanism-distinctness law applied source-verified).

## §Mandate

Discharges: UF-B2 ("glass-panel — this is superceded by the glass card system, no? And to be pruned?"),
UF-B1/B5/B6 (duplicate systems by multiple names — panes vs cards vs panels). Registry: FAM-10 (GlassPanel
RETIRE, the law applied), FAM-9 (floating-panel.css + `.glass-hero` zero-consumer deletes), XR-3/round-2b
fold-carry (glass-panel retire = 5 sites / 2 repos: atlas ×3, sci-report ×2).

## §Design

Decided (FAM-10, source-verified): GlassPanel owns NO distinct mechanism. Its `tier` axis is byte-
duplicative of Card's TIER_CLASS map; its `surface` axis is the same shared resolver; and its ONE distinct
thing — `useGlassRenderer`/`createGlassFilter` (a JS canvas-generated `feDisplacementMap` refraction) — is
a SECOND refraction path competing with the house `.glass-lens`/`#glass-refract` axis, with GlassPanel as
its ONLY consumer (a textbook `proof:no-dual-path` violation), and its no-`backdrop-filter` branch is a
per-rung opaque legacy ladder of the NO-MASKING-FALLBACK-condemned class + a Chromium-only
`backdrop-filter: url()` fork (deleting it is a Safari-honesty win). A slotless glass surface needs no
component — `class="glass-resting"` or `<Surface tier surface>` serves it.

Ruling: `useGlassRenderer`/`createGlassFilter` retire onto `.glass-lens` unless a case `.glass-lens`
cannot serve surfaces (default per FAM-10: retire; the pass-4b glass proto found none). Clean break, no
alias.

## §Work

- DELETE `src/components/custom/glass-panel/` (GlassPanel.vue + README.md + index.ts), the `./glass-panel`
  subpath (`package.json:534`), `GlassPanelProps` from `/api`, `scripts/proof-glass-panel-tiers.mjs`, and
  the `/glass-panel` type-version rows. (`GlassPanel.vue:71`'s `.replace()` wart dies here — the 7th site.)
- RETIRE `src/composables/glass/useGlassRenderer.ts` (`createGlassFilter:147`, `useGlassRenderer:245`,
  `destroyGlassFilter`) + the `composables/glass/index.ts:1-8` restore-comment; `.glass-lens`/`#glass-refract`
  is the ONE refraction door. (`proof:no-dual-path` re-greens — the second position-write path is absent.)
- DELETE `src/styles/floating-panel.css` (49L, 0 consumers) — move the still-live `.dropdown-menu-content`
  font/padding rules to `menu.css` FIRST (verify no other live rule).
- DELETE `.glass-hero` (`src/styles/glass/squircle.css:52`) — 0-consumer verified; fold any straggler onto
  `tier`+`deep`.
- FOLD the `.glass-card` alias onto `.glass-resting` (pure co-selector at `ladder.css:201,322,420`) — clean
  break, MIGRATION row.
- `src/styles/index.css` — drop the `floating-panel.css` `@import`.

## §Acceptance

Gate: **`proof:no-dual-path`** (single refraction) + **`proof:fold-delete`** (glass-panel clause, authored
in W-AXES-GATES) + invariant-11 registry probe.
- `proof:no-dual-path` (BORN-RED at HEAD — `useGlassRenderer`/`createGlassFilter` is a live second
  refraction path): the second `feDisplacementMap` position-write source is DEFINITION-ABSENT → GREEN.
- `proof:fold-delete` glass-panel clause (BORN-RED — dir + subpath + `GlassPanelProps` + gate live):
  `custom/glass-panel/` dir-absent, `/glass-panel` subpath-absent, no live `GlassPanel` import in `src/` →
  GREEN; survivor (`.glass-resting`/`<Surface>`) present.
- Dead-class census: `floating-panel.css` file-absent, `.glass-hero` DEFINITION-ABSENT, `.glass-card`
  DEFINITION-ABSENT (folded onto `.glass-resting`).
- Self-test bite: a synthetic re-added `createGlassFilter` REDs no-dual-path; a re-added GlassPanel dir REDs
  fold-delete.

## §π/DELTA

Byte-diff on every GlassPanel-slot demo now mounting `<Surface>`/`class="glass-resting"` (0 delta at the
shared rungs — GlassPanel's tier map ≡ Card's). Any refraction demo re-points `.glass-lens` — π that the
lens reads identically (Chrome + Safari, the SVG-filter kill is the Safari-honesty win, the un-gated
blur+tint base is the off-Chromium floor). DELTA: `W-GLASS-DEDUP-DELTA.md`. rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the close battery).

## §Obligations

- Invariant-11 registry probe (`npm view @mkbabb/glass-ui` + READ-ONLY sibling grep for
  `@mkbabb/glass-ui/glass-panel` / `useGlassRenderer` / `renderTier`, foreign-tree fence). The
  `composables/glass/index.ts` comment claims keyframes.js binds `/glass-panel` — this claim is RE-PROBED
  at execution; if a live sibling binds it, a `.glass-lens`/`<Surface>` migration ASK row is forced (never
  a silent delete). Round-2b XR evidence: 5 sites / 2 repos (atlas ×3, sci-report ×2).
- Cross-repo asks → carried by W-FACTOR-ASKS' migration ledger.

## §Dispositions

- Terminalizes FAM-10 GlassPanel-retire: **RETIRED-TERMINAL** (fold onto Card/`<Surface>`/`.glass-resting`,
  gate-locked). The `ax:panel-host-primitive` chronic is ALREADY ARCHIVED-TERMINAL (CHRONIC §5:189) — this
  wave finishes the surface-level retire it foreshadowed.
- Terminalizes the FAM-9 floating-panel.css + `.glass-hero` zero-consumer rows: **DELETED**.
- Terminalizes the second-refraction-path (`useGlassRenderer`) dual-path row: **RETIRED-TERMINAL** onto
  `.glass-lens`.


## Round-4 correction (NEW-1)
The §Acceptance label above is corrected per the formation audit: the EXISTING gate greens at HEAD;
this wave AUTHORS the feDisplacementMap-refraction-source clause (+ a createGlassFilter planted-revival
self-test bite) and flips it RED->GREEN at the delete. FAM-9's registry line inherits this correction.
