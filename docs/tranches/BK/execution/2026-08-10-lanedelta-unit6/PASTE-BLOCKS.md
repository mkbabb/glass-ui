# LANE δ — COMMIT-UNIT 6 · PASTE BLOCKS

Literal `⊕ⁿ` / `<SHA>` — the driver fills both at the landing.

---

## 1 · COMMIT MESSAGE

```
fix(demo/chassis): give the frozen viz stills a dark arm — D6, the six cream slabs on a dark page

D6 · THE STILL HAD NO THEME INPUT ANYWHERE. `vizPreviewStill` took a
(pattern, hue, seed) triple, baked `hsla(h, 48%, l%, a)` through one palette
one-liner, and memoized on the route alone. So the six /substrates stills were
BYTE-IDENTICAL across themes — aurora `uniqueRgb 628` and `C max 0.06739` in
both arms — and a dark page carried six L≈0.93 cream slabs over a ground the
browser seat measured at L 0.34-0.57. The well beneath them is theme-aware
(`color-mix(in srgb, var(--card) 68%, transparent)`); the image covered it.

THE CURE IS A SECOND PAINT ARM, NOT A SCRIM. A scrim over a light raster hides
a wrong-theme paint instead of replacing it, which is the masking-fallback class
outright, and the battery now REDs if one appears. Reading theme tokens at draw
time was refused with its reason, written into the file: getComputedStyle hands
back oklch() for this codebase's tokens and canvas will not parse it — the
file's own "no oklch dependence" line was already guarding that.

ONE RULE, NOT TEN KNOBS. The generators author one lightness ramp and author it
in light: a cream GROUND at the top (96/92/88/86), darker warm MARKS below
(82...45). An arm says where the two ends land. The light arm's ends ARE the
ramp's, so it is the IDENTITY and this cure moves NO LIGHT BYTE — proved twice,
not claimed: 14 pre `warm()` calls vs 14 post `stillColor()` calls with zero
arg-triple mismatches, and a battery row asserting the legacy string at every
stop. The dark arm INVERTS the polarity — ground darkest, marks brightest — the
luminous-dark transmissive model, because there is no such thing as ink on an
ember field. That is the SectionPreviewCard dark preview-field discipline named
at aurora-hero.ts:309-311, applied to the raster the card actually shows.
Saturation RISES 48 -> 62 and must: hsl saturation is relative to lightness, so
holding 48 at L 19 collapses the ember to the charcoal slab that discipline
names. The specular streak is the one OFF-RAMP paint — white because it is
light-source coloured, not theme coloured — so it does not invert; only its
strength moves (0.5 -> 0.3), because the same sheen blows out on a dark plate.
Computed sRGB->OKLab: the six dark grounds land L 0.36-0.50, INSIDE the page
ground's measured band, with C 0.06-0.10 kept.

IT RE-PAINTS ON THE FLIP, which a paired raster alone would not. `theme` is
threaded as an ARGUMENT through the ladder — vizPreviewStill(route, theme) ->
resolveStoryTile(id, story, theme) -> resolveCategoryTile(category, theme) —
and all three front doors read it from a reactive `stillTheme`, so the render
effect tracks it and a dark<->light toggle re-resolves. A hidden useGlobalDark()
read inside the raster was refused: it hides the draw input, gives the raster a
document side effect, and defeats signature-level testing. `theme` carries NO
DEFAULT — a default is a light-arm fallback every un-migrated call site
inherits, D6 restated as an API — and arity gates it. The memo key is now
`${theme}|${route}`; keying on the route alone is the defect a second time,
since whichever theme asked first would freeze the answer for both. Still ZERO
GL, at most 12 rasters app-wide.

THE GATE READS DRAW INPUTS, AND THAT IS MEASURED RATHER THAN ASSUMED. The measured
2d context is the REPO'S OWN setup stub (tests/setup.ts:127-141; happy-dom the env,
raw getContext null): it carries fillRect and createLinearGradient, does NOT carry
beginPath, and returns the CONSTANT `data:image/png;base64,AA==` from its :140
toDataURL whatever was painted — so a painted-output gate here would report the two arms EQUAL and go
green on the bug. Not weak: inverted. 12 rows on the family's own close battery
hold the arm table, the polarity, the chroma, the light-arm identity, that no
authored lightness escapes theming (stops parsed from the file's own source, one
source of record), the arity, the memo key, and the flip-read at all three front
doors. The file's stale "jsdom ... beginPath throws" note carries a dated bracket
with what was actually measured. Born-RED in a `git archive 87464122` mirror:
11 failed | 1 passed. The 12th is reported, not hidden — "cures by REPAINTING,
never by scrimming" passes against the uncured bytes because the uncured tree has
no scrim either; it is a guard against the wrong cure, labelled as one.

Receipt byte-identical (seats:60 ... violations:0). +12 battery rows, all green.
One re-capture cell ENQUEUED in PI-QUEUE.md; every figure here is COMPUTED from
the arm, and nothing is claimed as painted.

⊕ⁿ
```

---

## 2 · CURSOR LINE (⊕-ledger)

```
⊕ⁿ  <SHA>  δ unit-6 D6-CURE — the frozen stills get a dark arm: one authored ramp,
    two ends, light the IDENTITY (no light byte moves, proved 14/14) and dark the
    inverted luminous-ember (L 0.36-0.50, chroma kept, sat 48→62). Threaded as an
    argument, no default, memo re-keyed `${theme}|${route}`, all three front doors
    re-resolve on the FLIP. Scrim + token-read + hidden-global REFUSED with grounds.
    Painted-output gate refused with its MEASUREMENT (the setup stub's toDataURL — tests/setup.ts:140 — is a
    constant stub → a false green); 12 draw-input rows, born-RED 11/12 at 87464122.
    Receipt unmoved, π-RERUN-D6 ENQUEUED, zero δ-owned battery failures.
```

---

## 3 · VERIFY BLOCK — verbatim, real exit codes

```
$ npm run typecheck                          → exit 0
  vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json   (both arms, zero output)

$ node scripts/gate-register.mjs             → exit 0
  seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13
  armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
  (byte-identical pre and post — seats +0, nothing minted)

$ npm run demo:dist:build                    → exit 0
  ✓ built in 777ms
  arm verified IN THE EMITTED BUNDLE by grep, not assumed —
  dist-demo/assets/storyTile-D1pw13H-.js:
    light:{sat:48,ground:E,mark:D,specular:.5},dark:{sat:62,ground:15,mark:68,specular:.3}

$ npx vitest run                             → exit 1
  Test Files  1 failed | 224 passed (225)
  Tests  1 failed | 2149 passed | 10 expected fail (2160)

  ZERO δ-OWNED FAILURES. The one RED is FOREIGN and attributed:
  tests/public-surface.spec.ts > Row 8 — the built dist/ (mtime 2026-08-10 14:07,
  eighteen days pre-session) ships no components/dock/styles/run.css where src/ now
  has one; run.css entered at 5cd70d08, LANE α's seal. This diff carries zero src/
  and zero dist/ lines, so the row's verdict is INVARIANT under it. One of the two
  stale-dist REDs standing until the close build.

  gate:boot-graph's build arm was δ-CAUSED and is CURED, not papered: it walks all of
  demo/ + src/ for the newest mtime, so ANY demo edit REDs it. Measured both ways —
  built 14:08:04 · newest source excluding mine 14:07:48 (GREEN) · including mine
  18:15:09 (RED) — then discharged by the build above. Safe here only because α had
  sealed and δ was the sole live lane; mid-write, the honest move is to leave it RED
  for the close build rather than bake a half-written tree into an artifact.

$ npm run verify:package                     → exit 1
  components/handmark/geometry.d.ts: bare declaration reference @mkbabb/pencil-boil
  requires direct dependency ownership of @mkbabb/pencil-boil
  FOREIGN (γ's surface, same stale dist/). The script throws on its FIRST failure, so
  the run NEVER REACHES the ratchet arm: G-BUNDLE-RATCHET stands RED BY ROUTE and is
  UNMEASURED this run. This seat's contribution to shipped bundle bytes is ZERO —
  the whole diff is demo/ + tests/, neither of which enters dist/.

BORN-RED, mirror at 87464122 (HEAD at step 0), cwd AT the mirror:
  Tests  11 failed | 1 passed | 55 skipped (67)
  → TypeError: Cannot read properties of undefined (reading 'light')          ×8
  → AssertionError: expected 1 to be 2 // Object.is equality      (the arity detector)
  → expected '…import { makeHa…' to contain 'const key = `${theme}|${route}`'
  → expected '<script setup lang="ts">…' to contain 'useGlobalDark'
  the 12th row PASSED and is reported as a GUARD, not born-RED: "cures by REPAINTING,
  never by scrimming a light raster" — the uncured tree has no scrim either.

LIGHT-ARM BYTE-IDENTITY, proved rather than claimed:
  PRE  warm() paint calls: 14 · POST stillColor() calls: 14
  ARG-TRIPLE MISMATCHES: none — every paint asks for the same (hue, L, alpha)
  specular: pre `hsla(0, 0%, 100%, 0.5)` · post `hsla(0, 0%, 100%, ${arm.specular})`
  with light.specular = 0.5
```

---

## 4 · FENCE BLOCK

```
 M demo/chassis/landing/vizPreviewStill.ts        +168 −43
 M demo/chassis/landing/storyTile.ts               +27  −9
 M demo/chassis/landing/SectionLanding.vue         +11  −1
 M demo/chassis/landing/CatalogLanding.vue          +9  −1
 M demo/stories/foundations/intro.vue               +9  −1
 M tests/demo/story-preview-card.test.ts          +221 −25
?? docs/tranches/BK/execution/2026-08-10-lanedelta-unit6/
       RECORD.md · PI-QUEUE.md · PASTE-BLOCKS.md · born-red-D6.log · green-D6.log

demo/stories/foundations/intro.vue is inside Lane δ's standing demo/stories/** fence
(ratified lane text) and is the THIRD front door consuming resolveCategoryTile — a
signature change that skipped it would not typecheck. demo/stories/data/search.vue (α)
and demo/stories/substrates/aurora.vue (γ) are the two rows other lanes hold this run
and NEITHER was opened.

NOT touched: the α π-cure quartet entire — demo/stories/data/search.vue, all
src/components/dock/styles/*, src/styles/glass/overlay-plate.css,
src/styles/utilities/a11y-overrides.css, tests/composables/search/search-contracts.test.ts,
lanealpha-unit5/ and lanealpha-unit8/ · every γ handmark surface ·
src/styles/glass/material.css + tests/styles/material-css-syntax.test.ts (landed
attributed at 2cfc1124 — ordinary tracked files, still not lane surfaces) · ALL of src/ ·
dist/ · PI-CENSUS.md · the π band's banked artifacts · every other lane's record.

dist-demo/ rebuilt (gitignored, enters no commit). No add/commit/stash/checkout.
```
