# LANE δ — COMMIT-UNIT 4 (δ3 · #58 W-PREVIEW-CARD · W-STORY-TAXONOMY · W-STORY-PROPORTION)

**modelId: `claude-opus-5[1m]`** — asserted at step 0; the assertion gates this chain.
Base HEAD **`8a96868d`** at open (later than the brief's `2cfc1124`; the tree advanced
through α's `407de2d3`/`8a96868d` and β2's `96f0f257`). SHARED tree, three other lanes
writing concurrently. **This seat never staged, committed, stashed or checked out** —
`git diff --cached --stat` prints nothing at close.

---

## §0 · CENSUS — banked before any byte

| datum | value |
|---|---|
| baseline diff | `/tmp/bk-lanedelta-baseline-1787666814.diff` (`git diff -U0`, 302,722 B) |
| HEAD at open / close | `8a96868d` / `8a96868d` (no lane landed during this run) |
| porcelain at open | **64** |
| porcelain at close | **71** — +1 tracked (`TERMINAL-ROSTER.md`), +1 untracked (this record dir), and **+5 FOREIGN**, written by concurrent lanes mid-run (§7) |
| index at close | EMPTY |

**Untracked at open (8 entries):** `docs/tranches/BK/execution/2026-08-10-lanealpha-unit5/`
· `src/components/dock/composables/useDockRun.ts` · `src/components/dock/styles/run.css` ·
`src/components/handmark/stroke.ts` · `tests/components/custom/dock/g-dock-lattice.test.ts` ·
`tests/components/custom/handmark/g-hm-layer.test.ts` ·
`tests/components/custom/handmark/g-hm-mark.test.ts` — **all foreign (α5/γ4)** — plus
`tests/demo/story-preview-card.test.ts`, **this lane's**.

**The formerly-fenced surfaces stay closed.** `src/styles/glass/material.css` hashes
`d383ab0166db9398022fb7f2470b38d31683bdef8c052380359ea1f13a5fbad7` at close —
**byte-identical to β1/β2's recorded hash** — and `tests/styles/material-css-syntax.test.ts`
is clean in porcelain. Neither was opened. Lane β's unit-β0 dirt is not in the tree: it
committed at `c4dbf53b` before this seat opened, exactly as β2 recorded.

---

## §1 · THE GATE — #58 is UNGATED, verified rather than accepted

The lane text opens δ3 **"ONLY after Lane β's #21 `demo`/`demo-shell` M03 acts land"**.
`96f0f257` is that landing (`refactor(dag): BK #21 W-DAG-REDUCE — M03 dissolved on one
import line`), two commits below HEAD. **Gate open.**

`after #59` re-verified on disk at this cut, the four measures the lane text pins:

| measure | on disk | line |
|---|---|---|
| `--measure-prose` | `66ch` | `layout.css:37` |
| `--measure-cel` | `21rem` | `:44` |
| `--measure-wide` | `34rem` (φ·cel = 33.979rem) | `:48` |
| `--article-max` | `96rem` | `:53` |

---

## §2 · THE PARTIALS — adopted or attributed, PER FILE, by content

Nine tracked files and one new test arrived in the tree as this lane's grown partials.
Every one was read against #58's charter before a byte moved. **Eight adopt. Two hunks
do not, and the content is what says so** — the fence is by SUBJECT, not by path (β2's
§0.1 precedent).

| file | content | verdict |
|---|---|---|
| `chassis/landing/storyTile.ts` | the `identity` rung struck for a closed `authored \| still \| none` union; `resolveCategoryTile` reads the D2 main | **ADOPT** — W-PREVIEW-CARD, ⊕² re-read executed |
| `chassis/landing/SectionPreviewCard.vue` | the media region mounts only for a declared preview; the above-fold exemption; the dead identity CSS struck | **ADOPT** |
| `chassis/landing/CatalogLanding.vue` | `identityTile()` struck for the ladder | **ADOPT + EXTEND** (§3 A-2/A-3) |
| `chassis/landing/SectionLanding.vue` | `hero-scale="4"` → `:hero-scale="landing.heroScale"` | **ADOPT** — the roster's own ⊕² clause |
| `chassis/hero/StoryHero.vue` | `heroClass` struck (the dead second font-size) | **ADOPT** — W-STORY-PROPORTION |
| `chassis/hero/story-hero.css` | the display register moved onto the fit-capped rule | **ADOPT** — layers on δ4's committed `.story-page-chrome` block, which is intact at `:160/:194/:227` |
| `stories/foundations/intro.vue` | the hand-rolled lead walk struck; the cel field replaces the breakpoint ladder | **ADOPT** |
| `stories/navigation/toc-tracking.vue` | TOC-MENU-GLASS clean break + BD T49 | **ADOPT** — ⊕⁴ U-43 |
| `stories/substrates/_frame/VizStudio.vue` | the G-ONE-NAME law stated on the `heading` prop | **ADOPT** |
| `stories/substrates/blob.vue` · `fourier-field.vue` | `heading="Blob"` / `heading="Fourier Field"` struck | **ADOPT** — the committed γ2/δ2 hunks beneath are untouched (`+5 −1` / `+4 −2`, comment + one attribute each) |
| `tests/demo/story-preview-card.test.ts` | the close battery | **ADOPT + GROW** (§4) |
| `stories/manifest.ts` — the handmark blurb hunk (−944 pre-image / +967 post-cut [2026-08-25 · C-3]) | *"one pen making four gestures over the paper grain"* | **NOT δ3's — γ4's.** #58's charter claims no story blurb. Left byte-untouched; this seat's eight measured hunks: +267 · +269 · +296-297 · +302-303 · +307-326 · +330-331 · +333-334 · +356 [2026-08-25 · C-3, completed` |
| `stories/foundations/colors.vue` | `brush`/`shape`/`overrides` → `:weight="6"` | **NOT δ3's — γ4's.** It is the **consumer spill of γ's HandMark API strike** (`brush.ts`/`ink.ts`/`texture.ts` are deleted in this tree); the tree would not typecheck without it. Left byte-untouched, hash `f547e7ab…` |

---

## §3 · THE ACT LEDGER — three files written, beyond the adoption

Nothing in `src/`. **This row mints no primitive and moves no export key.**

| # | act | file | Δ |
|---|---|---|---|
| A-1 | the stale ladder prose — *"falls through to the frozen still, body marquee, identity"* — re-authored to the union that exists | `demo/stories/manifest.ts` | comment |
| A-2 | `heroScaleForDepth(depth)` — the depth→rung ladder stated ONCE and exported; `assignDepths` and `sectionLanding` both read it | `demo/stories/manifest.ts` | +19 −6 |
| A-3 | the catalog reads its rung from that ladder; `hero-scale="4"` struck | `demo/chassis/landing/CatalogLanding.vue` | +12 −2 |
| A-4 | the catalog gains its lead card | `demo/chassis/landing/CatalogLanding.vue` | +11 −1 |
| A-5 | the battery grows: taxonomy, the corpus G-ONE-NAME arm, the catalog arms, and one HARDENED case | `tests/demo/story-preview-card.test.ts` | 39 → 55 cases |
| A-6 | the roster's four detectors re-pinned, dated strike-in-place | `TERMINAL-ROSTER.md:208` | 1 line |

### A-2/A-3 · the home page was wearing the D3 floor

`CatalogLanding` declared **`depth="D0"` and `hero-scale="4"` on the same element**. `4`
is the D3 sub-page rung. So `/` — the app's front door — carried a smaller title than
every page beneath it, and the ladder the manifest owns
(`assignDepths`' `depth === "D0" ? "mega" : depth === "D2" ? "5" : "4"`) was restated at a
call site as a literal that contradicted the tier declared beside it.

This is the same defect the adopted partials strike twice over — `SectionLanding`'s
hard-coded `"4"`, `intro.vue`'s `story.id !== "intro"` — left standing in the third front
door. The cure states the tier once:

```ts
const CATALOG_DEPTH = "D0" as const;
:hero-scale="heroScaleForDepth(CATALOG_DEPTH)"  :depth="CATALOG_DEPTH"
```

`heroScaleForDepth` is exported because the catalog is **not a manifest row** and has no
descriptor to read a rung off. Three readers: `assignDepths`, `sectionLanding` (which also
stops repeating `"D1"` twice on adjacent lines), and the catalog. The battery asserts no
site restates the ternary.

**A rung is a paint change and is declared as one.** `/` moves `--type-display-4` →
`--type-display-mega`, bounded by the fit-cap (`min(rung, (100cqi − 2·pad)/cpl,
0.62·100svh/lines)`) that `story-hero.css` already applies — so it is a rung change, not an
overflow risk, and π-1 measures it rather than this record asserting it.

### A-4 · the exemption's key, and the one landing that never produced it

The adopted partial exempts `[data-span="full"]` from `content-visibility`. `data-span` is
stamped from the `lead` prop — and **`CatalogLanding` passed no `lead`**, so `/` produced
no full-span card and the exemption could not reach the route where it matters most: the
first row of the home page is the app's first paint by construction. The other two front
doors (`SectionLanding`, `foundations/intro`) already led on `idx === 0`. All three now
agree, on one attribute, and F01's expressive sizing lands on the catalog with them.

### A-6 · the roster's own census was stale, and #58 is the row that pins detectors

`TERMINAL-ROSTER:208` pinned *"124 raw · 4 `*.tile.vue` · 87 manifest rows (PLAUSIBLE) ·
100 derived routes (PLAUSIBLE)"*. **All four re-derived this seat; three move.**

| # | instrument (verbatim detector) | reading | was |
|---|---|---|---|
| 1 | bare `git ls-files 'demo/stories/**/*.vue'` (tiles included, any depth) — [2026-08-25 · C-2: qualifiers struck; per-instrument: any-depth non-tile 106 · one-deep non-tile 90] | **110** | ~~124~~ |
| 2 | the same walk kept to `*.tile.vue` | **4** | 4, unmoved |
| 3 | `CATEGORIES.flatMap(c => c.stories).length` — the module **imported**, never text-parsed | **80** | ~~87~~, and no longer PLAUSIBLE |
| 4 | root + 11 landings + 80 stories + 404, off `demo/router.ts`'s own walk | **93** | ~~100~~ |
| 5 | `Object.keys(VIZ_PREVIEW_STILLS).length` — the fifth the row never carried, and the ladder rests on it | **6** | — |

Reading 3 was taken twice by two independent instruments — a regex over the `s(cat, id,
title …)` call sites and a live `vite-node` import of the module — and both return **80**.
The battery pins these as **RELATIONS, not literals**: a gate that hard-codes `80` fails
the day someone writes story 81 and teaches the next author to edit the gate rather than
read it.

---

## §4 · THE BATTERY — what grew, and the false green it convicted

39 cases arrived; **55 ship** (53 pass · 2 `it.fails`). **Seats +0** — `G-TILE-COVERAGE`
and `G-ONE-NAME` are doc seats carrying `binding: "none"`, and a case is not a seat (β2's
ruling). The receipt is byte-identical pre and post.

**W-STORY-TAXONOMY, made executable.** The wave's completion clause is *zero bespoke
pages*, with its own detector. Both halves are now cases:

- **GREEN, and honestly attributed:** every one of the 80 manifest rows has an SFC on
  disk, and every one mounts `StoryPage` or `VizStudio` (which composes `StoryPage`
  itself). **Zero bespoke pages — and this was already TRUE at `8a96868d`.** The case
  passes in the born-RED mirror, and it is recorded as a census this cut *measures*, never
  as a thing this cut *made* true.
- **RED, held by `it.fails`, routed:** ten complete `StoryPage` stories sit at
  `demo/stories/<cat>/<id>.vue` with **no manifest row** — the glob still bundles them,
  and no route, landing card or preview strategy reaches any of them (§6 R-1).

**G-ONE-NAME grew from a two-item list to the whole corpus.** The detector reads each
row's SFC with comments stripped and looks for the story's own manifest title in
`heading`/`label`/`title`/`eyebrow` attributes and in `<h1>`–`<h3>` text. Across all 80
rows there is **exactly one** surviving hit: `/substrates/aurora`, `heading="Aurora"` ×1 —
**lane γ's file by the ratified fence**. It is named with its owner in a
`ONE_NAME_FENCED_OUT` constant rather than quietly filtered, a third case asserts the
exclusion is **honest** (the fenced route must really fail, or it is a fence around
nothing), and an `it.fails` arm runs the corpus *without* the exclusion so the whole thing
flips green the moment γ strikes it.

### 4.1 · ONE CASE PASSED ON BYTES WHERE THE DEFECT WAS LIVE

`prints the title EXACTLY once on a 'none' card` mounted a **hand-made**
`{ kind: "none" }`. Against the pre-cut card those bytes have no branch for a kind they
have never heard of, so nothing rendered in the well and the title printed once — **green,
against a card that printed it twice for every story on every landing.** The detector could
not reach its own subject.

Hardened: the tile now comes from **`resolveStoryTile` on a real manifest row** (no
`.tile.vue`, no frozen still), so pre-cut it resolves `identity` and the card paints the
name inside the well *and* in its label beneath. The mirror moved `21 passed` → `21` with
that case flipped to RED (`expected 2 to be 1`), which is the case doing its job.

This is unit-3's lesson reproduced in a different shape, and it is why born-RED is run
rather than asserted.

---

## §5 · BORN-RED — measured in a `git archive` mirror at `8a96868d`

Mirror at `…/scratchpad/bornred-58`: `git archive 8a96868d demo | tar -x`, the post-cut
test file and `tests/setup.ts` copied in, `node_modules` and `src` symlinked, a
seven-line vitest config. **`src` is the live tree deliberately** — it is not this cut's
subject, and the mirror exists to prove the *demo* bytes are what the detectors read.
Run with the cwd **at the mirror** (unit-3's `vitest --root` trap: `--root` does not move
`process.cwd()`).

Mirror carries HEAD's demo, checked before the run:

```
$ grep -c 'kind: "none"' <mirror>/demo/chassis/landing/storyTile.ts   → 0
$ grep -c identity      <mirror>/demo/chassis/landing/storyTile.ts    → 4
```

```
MIRROR (8a96868d)   Tests  32 failed | 21 passed | 2 expected fail (55)   REAL EXIT 1
LIVE   (the cut)    Tests  53 passed | 2 expected fail (55)               REAL EXIT 0
```

Failure lines, verbatim, the load-bearing ones:

```
AssertionError: expected [ 'identity', 'identity', …(68) ] to deeply equal []
AssertionError: expected 2 to be 1 // Object.is equality
AssertionError: expected [ …(2) ] to deeply equal []
AssertionError: expected '…' to contain 'kind: "none"'
AssertionError: expected '…' to contain 'resolveCategoryTile'          (×2 — both front doors)
AssertionError: expected '…' to contain 'story.depth === "D2"'
AssertionError: expected '…' to contain 'class="story-field"'
AssertionError: expected '…' to match /\.section-preview-card\[data-span="fu…/   (×2)
AssertionError: expected '…' not to match /const\s+heroClass\s*=/
AssertionError: expected '.story-hero-title[data-hero-scale] {…' to contain 'font-family: var(--font-display)'
AssertionError: expected '…' to contain ':hero-scale="landing.heroScale"'
AssertionError: expected '…' not to contain 'heading="Blob"'
AssertionError: expected '…' to contain 'heroScaleForDepth'
AssertionError: expected '…' to match /CATALOG_DEPTH\s*=\s*"D0"/
AssertionError: expected '…' not to match /depth === "D0" \? "mega"/
AssertionError: expected '…' to contain ':lead="idx === 0"'
AssertionError: expected '…' not to match /class="[^"]*themed-card/
AssertionError: expected [] to have a length of 2 but got +0
AssertionError: expected '…' to contain 'story-stage'
AssertionError: expected '…' to match /<StorySection\s+span="full"/
AssertionError: expected '…' to contain 'var(--measure-cel)'
AssertionError: expected '…' to contain 'text-subheading'
```

**The first line is the wave's headline defect, counted:** at `8a96868d`, **70 of 80
manifest rows resolved `identity`** — a title-slab inside an empty well with the same title
printed again immediately below it. That is UF-F1 (F01/F02/F46, one defect), measured by
the resolver rather than by eye.

**The 21 that pass in the mirror were each adjudicated, not waved through.** Six are the
four-detector census (their subject is the manifest, unchanged by this cut); five assert
rungs the cut deliberately leaves standing (`still` resolution, the authored rung, the
ordinary card's `content-visibility`, the `[data-hero-scale]` stamp, the five CSS rungs);
three are anti-vacuity guards (the corpus is readable, the fenced route really fails, a
tile-free row exists); two are `it.fails` arms that are correctly RED in both trees; two
are the taxonomy census arms, green at HEAD **by design and stated as such**; three are
mount arms whose subject (the media region, its `inert`/`aria-hidden`, the section-landing
and intro `lead`) exists in both trees. Every one of them fails if its subject is removed.

---

## §6 · REFUSALS AND ROUTINGS — each stated, none silent

- **R-1 · TEN GLOBBED STORY SFCs RESOLVE TO NO TYPE — routed, held RED.**
  `data/avatar` · `display/dark-mode-toggle` · `display/separator` · `display/status-dot` ·
  `feedback/toaster` · `forms/label` · `forms/select` · `foundations/paper-texture` ·
  `motion/countup` · `motion/typewriter`. All ten are real, actively-maintained
  `StoryPage` stories (`avatar.vue` was edited by #86+#88 last week) that consolidation
  rows superseded and left on disk — `display/atoms`, `feedback/toast`, `forms/inputs`,
  `foundations/paper-glass`, `motion/text-motion` are the apparent successors.
  **Not cut here, with grounds:** the disposition is a DELETE-class act needing a
  per-file successor verification, which is #62's / the overfitting audit's cut, not a
  preview-card row's — and `display/dark-mode-toggle.vue` carries a **committed
  `[BK #47 W1 SURFACE]` edit from lane α, which is live on this tree right now**. Deleting
  a file another running lane just wrote into, on an order this lane does not hold, is the
  cross-lane hazard the fence exists to prevent. Held RED by `it.fails` so the finding is
  executable rather than a bullet in a document. → **#62 / overfitting audit.**
- **R-2 · `/substrates/aurora` `heading="Aurora"`** — the one surviving G-ONE-NAME hit
  in the corpus. `aurora.vue` is **γ's by the ratified fence** ("γ owns
  substrates/aurora.vue"). Named, fenced with its owner, held RED by `it.fails`. → **γ.**
- **R-3 · #59's WRAP ARM — NOT taken, and #58's charter does not claim it.** Unit-1
  routed it as *"buildable"*; `layout.css:126-134` is committed text ruling it **"ROUTED
  with its subject"**, and the subject is two rails — the blob mood rail (this lane's
  this run) and the **aurora preset gallery (γ's)**. It is #59's kill #18, and building
  half of a layout arm from a preview-card row, across a lane boundary, would mint a rule
  whose other half cannot be verified. → **#59's remaining half.**
- **R-4 · X6, the `--configurator-aside-{min,max}` doc-vs-CSS disagreement** (280/360 vs
  300/400). Unit-1 routed it to *"the next EXPRESS unit"*. #58 owns no configurator
  surface. → **#52 / δ1's successor.**
- **R-5 · the EC dead `surface` prop + the expanded-dialog accessible name.** Same
  answer: `ExpandableContainer` is `src/` and the configurator's; #58's charter reaches
  neither. → **#52 / #31.**
- **R-6 · the C01/M01 manifest/story SCC split.** The lane text says it **co-lands with
  #62**, which reads UNSTARTED at `EXECUTION-PROGRESS.md:5361` and is not in lane δ's
  ratified order. β2's census names M01's 15 members and its owners (#58/#56); this unit
  added **no new module edge** — and refused one it wanted (§6 R-10). → **#62.**
- **R-7 · seventy bespoke tiles — STRUCK, and the strike is the ratified reading.**
  ⊕²'s re-read of `G-TILE-COVERAGE` is *every story resolves to a declared preview
  strategy*, naming the alternatives outright. Four authored + six still + seventy `none`
  is a complete resolution, not a shortfall. Zero tiles were authored and none is owed.
- **R-8 · g11 (ℱ-as-Foundations) — NOT REACHED, so nothing is recorded here.** The ℱ
  *home control* is the shell's persistent affordance (`demo/shell/SidebarDock.vue:108`),
  and this chassis did not touch it: `intro.vue`'s ℱ is an inline **title ornament**
  (`:61-63`), untouched by this cut. The lane text's "whichever cut reaches it first
  records" therefore leaves the record with **Lane α's #47**, which this unit cites.
- **R-9 · `manifest.ts`'s handmark blurb and `colors.vue`'s HandMark props** — γ4's, by
  content (§2). Left byte-untouched.
- **R-10 · `StoryHero`'s re-declared `HeroScale`/`StoryDepth` unions.** `StoryHero.vue:22-23`
  restates the manifest's two closed vocabularies inline instead of importing them. The
  import is one line and would be free — except that `demo/chassis/hero` has **zero edges
  to `demo/stories` today**, and M01 is exactly `demo/chassis* + demo/stories*`. Minting a
  new module edge into an SCC that #21/#62 are dissolving, to save a duplicated union, is
  a bad trade taken by the wrong row. Named, measured, → **#62 (its name-token arm).**
- **R-11 · the driver's four refusals** (footage · device-matrix · Safari-GUI · physical
  classes) stand as scoped; none was reached.
- **R-12 · no mount test of `CatalogLanding`/`SectionLanding`.** The band's precedent is
  explicit (`skip-link.a11y.test.ts:1-3` — routed shells are not isolable for a rendered
  mount); the card itself IS mounted, which is where the dispatch lives. The routed
  surfaces' geometry is π's, enqueued at §8.

---

## §7 · VERIFY — real exit codes, `$?` direct, never a piped tail's

| gate | command | REAL exit | figure |
|---|---|---|---|
| typecheck (main) | `npx vue-tsc --noEmit` | **0** | clean, no output |
| typecheck (test) | `npx vue-tsc --noEmit -p tsconfig.test.json` | **0** | clean |
| battery | `npx vitest run` | **1** | `Test Files 1 failed \| 223 passed (224)` · `Tests 1 failed \| 2106 passed \| 10 expected fail (2117)` |
| gate receipt | `node scripts/gate-register.mjs` | **0** | byte-identical, below |
| package | `npm run verify:package` | **1** | γ-owned arm, §7.3 |
| demo build | `npm run demo:dist:build` | **0** | `✓ built in 998ms` |
| boot-graph, post-remedy | `npx vitest run tests/gates/boot-graph.test.ts` | **0** | `14 passed (14)` |
| this row's battery | `npx vitest run tests/demo/story-preview-card.test.ts` | **0** | `53 passed \| 2 expected fail (55)` |

**RECEIPT — byte-identical to the standing line, stated in full. SEATS +0:**

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

### 7.1 · THE BATTERY FIGURE MOVED, and the act is named

The brief's standing quiesced-class read is `2015 passed | 7 xf`. Observed here:
**`2106 passed | 10 expected fail | 1 failed` across 224 files.**

**This seat's contribution is exactly +55 rows in one new file** — 53 green, **2
`it.fails`** (R-1's ten orphans, R-2's aurora), both of which move the xf figure and both
of which are named above rather than smoothed. Subtracting them leaves the foreign
standing at `2053 passed | 8 xf | 1 failed` over 223 files: **+38 passed and +1 xf that
predate or ran concurrently with this seat**, from the landings between the driver's
reading and `8a96868d` plus the other lanes' close batteries now on disk.

### 7.2 · THE ONE RED IS FOREIGN, attributed by its own diff

```
FAIL tests/public-surface.spec.ts > Row 8 built-artifact acceptance
     > ships exactly the style closure plus the three generated members
-   "components/dock/styles/run.css"        ← expected (α's edited spec)
+   "components/dock/styles/overflow.css"   ← received (the built dist/)
```

**Lane α's**, and the diff says so without interpretation: α's uncommitted rename
(`overflow.css` → `run.css`, both visible in porcelain, with `tests/public-surface.spec.ts`
edited to match) is read against a `dist/` built before it. **Zero δ3 bytes reach `dist/`
— this unit touched `demo/` and `tests/` only.** Not cured here: `npm run build` would
write α's subject and re-take the bundle-ratchet reading mid-batch.

**`boot-graph` WAS δ3's, by measurement, and was cleared with the gate's own named
remedy.** `max(mtime)` over `src/` + `demo/` resolved to `demo/chassis/landing/CatalogLanding.vue`
(2026-08-25T14:16:08Z) against a `dist-demo/index.html` from 10:00:21Z — this seat's file,
not a foreign one, so the "zero lane-owned failure" line required clearing it.
`npm run demo:dist:build` (exit 0) writes only gitignored `dist-demo/` (`.gitignore:65`),
took no lane's surface, and the arm re-ran `14 passed (14)`. The build is also verification:
the Vue template edits compile. **The arm remains a four-lane freshness race** — α wrote
`density.css` at 14:13 and γ `HandMark.vue` at 14:12 — so it re-REDs for whichever seat
writes next, and β2's routing of the remedy to batch close (**RT-β1-E**) is unchanged.

### 7.3 · `verify:package` — RED, and the first failing arm is NOT the ratchet

```
$ npm run verify:package ; echo $?
Error: Invalid package artifact:
components/handmark/geometry.d.ts: bare declaration reference @mkbabb/pencil-boil
  requires direct dependency ownership of @mkbabb/pencil-boil
    at verifyExportTypes (scripts/verify-export-types.mjs:811:32)
1
```

**Lane γ's**, stated rather than papered: `src/components/handmark/geometry.ts` is
**deleted** in this working tree (γ4's GF-HANDMARK cut) while `dist/` still ships the
`geometry.d.ts` built from it. The script throws at `:811` — **before** `ratchetEvidence`
at `:740` (defined) / `:828` (invoked) reports [2026-08-25 · C-5: the throw at `:811` precedes the call] — so **`G-BUNDLE-RATCHET` prints no figure this run and its standing
RED-by-route is unreachable from this reading, not resolved by it.** The driver's ruling is
unchanged: the arm REDs lawfully until the single batch-close rebind carries β0's `+1215`
and the driver's `−71`. **δ3's contribution to that delta is 0 bytes** — the published
bundle is built from `src/`, and this unit wrote none.

---

## §8 · π — ENQUEUED to the singleton browser seat, none claimed

**This seat opened no browser.** C-13 is still unsatisfied (no `proof:viz*` / `test:visual`
script exists), the same block units 2, 3 and 4 all carry. The catalog rung and the lead
card are *paint*; whether the home title reads correctly at `mega` is a MEASUREMENT.

```
δ3-π-1  /  @1440×900 dpr1 + 390×844 · light AND dark
        the <h1> computes --story-hero-title-rung == var(--type-display-mega), its
        rendered box does NOT exceed .optical-bench's content box, and the fit-cap —
        not the rung — is what bounds it at 390.
δ3-π-2  /  @1440 + 390
        card 1 reports gridColumn spanning the field (data-span=full) and computed
        content-visibility "visible"; cards 2..11 report "auto". Zero horizontal
        overflow on .demo-main-scroller at both widths.
δ3-π-3  /  first paint, CDP
        no layout shift attributable to card 1 (the exemption's whole claim: an
        above-fold card must not be skipped-then-corrected).
δ3-π-4  /foundations/intro + /display + /substrates @1440 · light AND dark
        every card resolves authored | still | none; NO card paints an empty well;
        NO card prints its title twice. DELTA capture against a `git archive 8a96868d`
        tree — the 70-identity landing is the before.
δ3-π-5  /display + /substrates @1440
        the four authored tiles and six stills paint; 0 GL contexts on any landing
        (the ladder's construction claim, measured not asserted).
δ3-π-6  /navigation/toc-tracking @1440 + 390 · light AND dark
        both panes paint real glass (the `themed-card` cure); the ToC track measures
        ≤ min(21rem, 30%); the stage is --stage-block; AA on the tracked headings.
δ3-π-7  /substrates/blob + /substrates/fourier-field @1440
        the page's name appears EXACTLY once in the rendered accessibility tree
        (the source-side G-ONE-NAME arm's runtime twin).
δ3-π-8  /  @852×393 landscape
        the D0 mega title and the full-span lead card coexist without the hero eating
        the fold — the cell #59's own §4 found by three pixels.

BLOCKED ON: C-13. Every cell ENQUEUES; none is claimed.
```

---

## §9 · FENCE — what this unit wrote, hashed at `2026-08-25T14:22:50Z`

**Written (4 paths + this record):**

```
demo/stories/manifest.ts                       098457466d1563287f2d37d8f97a32cd494a28c53c9b0910def4bdfeb11cbb16
demo/chassis/landing/CatalogLanding.vue        549737e4ce995218bfe05c9137f7a8a4eef8f524461e74de11630e884a37751f
tests/demo/story-preview-card.test.ts          a522a1e41ee059575839a19de85f463113d015dcae2442e88ac50454c56a9a68   (untracked, new)
docs/tranches/BJ/…/TERMINAL-ROSTER.md          d1b6c1d370f9c121b43716c55486b53143ead4fea4e6cfc3ae3765b49fad2730   (1 line, row 58)
docs/tranches/BK/execution/2026-08-10-lanedelta-unit4/{RECORD,PASTE-BLOCKS}.md              (new, untracked)
```

Plus `dist-demo/**`, gitignored, rebuilt by the gate's own named remedy.

**ADOPTED unchanged from the partials (10 tracked files):** `chassis/hero/StoryHero.vue` ·
`chassis/hero/story-hero.css` · `chassis/landing/SectionLanding.vue` ·
`chassis/landing/SectionPreviewCard.vue` · `chassis/landing/storyTile.ts` ·
`stories/foundations/intro.vue` · `stories/navigation/toc-tracking.vue` ·
`stories/substrates/_frame/VizStudio.vue` · `stories/substrates/blob.vue` ·
`stories/substrates/fourier-field.vue`.

**NOT touched, deliberately:**

| surface | verdict |
|---|---|
| `src/**` — every byte | this row mints no primitive; `dist/` is unreachable from it |
| `src/styles/glass/material.css` | `d383ab0166db9398…` — byte-identical to β1/β2's hash, never opened |
| `tests/styles/material-css-syntax.test.ts` | `7724e3221ee6a158…`, clean, never opened |
| `demo/stories/substrates/aurora.vue` (γ) | `1074a2337672100…`, never opened — R-2 |
| `demo/stories/motion/handmark.vue` (γ4) | `be64b79ba32679db…` [2026-08-25 · C-6], never opened |
| `demo/stories/foundations/colors.vue` (γ4 spill) | `f547e7abead09a4…`, never opened — R-9 |
| `demo/shell/**` (α's #47) · `src/components/dock/**` (α) · `src/components/handmark/**` (γ) | never opened |
| δ0/δ1/δ2/δ4's landed surfaces | `typography.vue`, the configurator, `fourier-field/fourier-math`, `StoryPage.vue` — all clean at open and at close |
| no export key | `src/**/index.ts` untouched; `regen-exports` unreachable-EXACT by construction; g4's fourier seat undisturbed |

**PORCELAIN IS A SAMPLE AT AN INSTANT, NEVER A PROPERTY** — 64 at step 0, **71** at close.
Of the seven-entry rise, **two are this seat's** (`TERMINAL-ROSTER.md` + this record dir)
and **five are FOREIGN, written by concurrent lanes DURING this run**, verified by diffing
the diff against the step-0 baseline: `docs/consumer-evidence/handmark.md` ·
`docs/tranches/BJ/…/REDUCTION.md` · `docs/tranches/BK/ASK.md` ·
`docs/tranches/BK/EXECUTION-PROGRESS.md` · `src/components/dock/styles/shape.css`, plus
in-place rewrites of `src/components/dock/styles/density.css` and
`src/components/handmark/HandMark.vue`. **The index carries no staged entry.**

---

## §10 · WHAT #58 IS NOW

Seventy of eighty landing cards were a story's name printed inside an empty box with the
same name printed again beneath it. There is no `identity` rung any more — the union is
`authored | still | none`, a card with no declared preview has **no media region at all**,
and the two front doors that each hand-rolled their own resolution now call the same
function and read the marquee from the manifest's own depth assignment instead of from a
row's position. The home page stopped wearing the sub-page title rung, and its first card
stopped being hidden from the exemption written for it. Every one of the eighty rows sits
on one chassis — measured, not assumed — and the two things that are still wrong (γ's
aurora heading, ten superseded stories the glob still bundles) are RED in the suite with
their owners named, instead of true in a document nobody runs.
