# AY.W-SB-STAGE — substrate STAGING: the StoryHero glass-erasure fix + the occasional-usage backdrop map made real

**Tranche** AY (glass-ui) · **Band** C (storybook prune + restructure) · **Kind** impl (demo-page staging + ONE chassis seam) ·
**State** OPEN · **Repo** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **HEAD** `tranche/AY`
**Spec inputs** `audit/design/FD-storybook.md` (§2 the systemic substrate-erasure finding, §6 the divined-backdrop map, §9.1 the 0×0-exposed-margin invariant, §9.2.13 the intro-void), `audit/design/FD-substrate-pages.md` (the four substrate pages as un-staged pages + §5 the staged-model under-delivers), `audit/reality/RA-flow-fields.md` (§4 the hero-consumption layer — 1-of-3 reads), `audit/reality/RA-glass-default.md` (§6 the W60 flat-backdrop confirmation — the demo undersells its own glass-first default).
**Sibling waves** `AY.W-SB1.md` (§1.5.2 OWNS the constellation zero-paint SOURCE fix — its G6b is W-SB-STAGE's PRE-REQUISITE; a 0px-tall host cannot be staged), `AY.W-COHERE.md` (OWNS the substrate-SET cohesion + the constellation `opacityCeiling` recession PROP — W-SB-STAGE CONSUMES that prop, does not author it), `AY.W-EGG.md` (the GooBlob empty-state mascot + constellation 404 — W-SB-STAGE provides the empty-states substrate seam those eggs sit on).

---

## Goal criterion

The storybook's headline design promise — **glass cards over live substrates, occasional and befitting** — is
visually TRUE on the retina, not merely declared on a manifest row. Today (FD-storybook §2, RA-flow-fields §4)
only 1 of 9 declared backdrops reaches the eye: the StoryHero glass card spans 100% of its container at
`tier="floating"` (0.8α blur(16px)), so every substrate is seen ONLY through an opacity-0.8 same-hue plate that
transmits broad colour (aurora survives) and ANNIHILATES line-work (constellation/fourier/grid/paper all
erased). W-SB-STAGE fixes the chassis so a declared substrate is PERCEIVABLE (the read-through seam), then makes
the FD-divined occasional-usage map REAL — the model-page pattern (display/card + glass-material's in-region
colour strips, FD-storybook §3 "MODEL PAGE" rows) PROPAGATED to the pages whose whole subject is glass: the
paper-glass mission-failure page rebuilt over a real backdrop, the dock/overview + dock/rail empty-cream frames
staged so the headline glass primitive has something to be glass against, and the enumerated aurora/constellation/
fourier/blob placements landed at whisper intensity. Success looks like: a storybook a first-time visitor would
call "glass-first" on the substrate + composition + dock pages (not just the aurora intro), every staged backdrop
LEGIBLE behind its glass without erasing content, restraint preserved (forms/feedback/containers STAY quiet),
and the standard's "occasional usage of aurora/constellation/fourier-field/blob" satisfied at the retina.

## Completion criterion

The hard gate (§6) verifies: (G-READTHROUGH) the StoryHero hero-card read-through seam lands and a π readback on
each declared-backdrop page finds the substrate PAINTED + PERCEIVABLE behind the card (born-RED at HEAD: 0×0
exposed margin + 0.8α erasure → substrate invisible on 4 of 5 kinds); (G-MAP) the FD §6 occasional-usage map is
REALIZED — the enumerated manifest rows carry their befitting `background` + the model-page in-region strips land
on paper-glass + the dock pages, witnessed by a source + a π capture; (G-RESTRAINT) the quiet pages stay quiet
(a source-witness asserts forms/feedback/containers declare NO backdrop — the standard's restraint is not
over-applied); (G-DELTA) the own-surface captured DELTA (`W-SB-STAGE-*.png`, light+dark) shows the staged pages
reading as glass-over-substrate, per the cardinal-lesson `proof:live-verified-ledger` contract. Both goal AND
completion hold for a clean close.

---

## 1. The verified defect (file:line, from the AY design + reality corpus)

### 1.1 The systemic finding — the substrate architecture deletes its own backdrops (FD-storybook §2, §9.1)

`StoryHero` (`demo/stories/StoryHero.vue`) is the RIGHT shape: every page body in a `Card` over a
manifest-declared backdrop (FD-storybook §2). But the chassis demonstrates glass blur and in doing so DELETES
its backdrops. Two compounding mechanisms, both at file:line:

- **The card is opaque-enough to erase.** `StoryHero.vue:147-148` mounts `<Card :tier="isHero ? 'floating' :
  'resting'">`. `floating` = 0.8α + blur(16px); `resting` = 0.65α + blur(12px) (`Card.vue:150` maps `glass-${tier}`;
  the alpha ladder is the W54 `--glass-bg-*` rungs). An 0.8α blur(16px) plate over a SAME-HUE page background
  transmits a broad colour WASH (aurora's big soft fields survive — the 1-of-9 that reads) but annihilates thin
  line-work: constellation hairlines, fourier epicycle strokes, the 7%/12% grid hairlines, the paper grain — all
  ≈ nothing behind the plate (FD-storybook §2 probe table; RA-flow-fields §4 "a thin LINE does not survive that
  filter, a full-field WASH does").
- **The card has ZERO exposed margin.** `story-hero.css:81` — `.story-hero-card > * { width: 100% }` + the card
  is the container's only child, so the card fills `.story-hero` EXACTLY. FD-storybook §9.1 hardened this into an
  invariant: **"Exposed substrate margin around the glass card: 0×0 px on EVERY page."** The substrate never
  shows AROUND the plate — no bleed, no offset, no negative space. "A glass card floating over a substrate" (the
  chassis's own header comment, `story-hero.css:2-6`) never floats.

Net: 8 of ~115 manifest rows declare a backdrop; of the 5 declared KINDS only aurora survives to the eye; 0 pages
use blob (FD-storybook §2). The headline promise renders as flat cream on 4 of 5 kinds.

### 1.2 The model already exists — display/card + glass-material PROVE the pattern (FD-storybook §3 MODEL-PAGE rows)

The fix is not invented — it is PROPAGATED. Two pages already solve substrate-read-through and are named MODEL
PAGES in the audit:

- `demo/stories/display/card.vue` — tier specimens over a teal/yellow/pink watercolor IN-REGION colour strip;
  "the wash→overlay ladder actually reads… the pattern paper-glass and dock/* should steal" (FD-storybook §3
  display/card row).
- `demo/stories/substrates/glass-material.vue` — glass chips over a vivid in-region gradient; "the only
  foundations/substrates page where glass legibly behaves as glass" (FD-storybook §3 glass-material row).

The move both make: a LOCAL colour field IN the region behind the glass specimens (not a full-page substrate
under an erasing card). W-SB-STAGE generalises this — for the substrate/dock/composition pages, the backdrop is
the page's OWN live substrate (self-demonstration); for the foundations-glass pages, the in-region colour strip.

### 1.3 The mission-failure pages (FD-storybook §3, FD-substrate-pages §1-4)

| page (route) | declared | live result (audit) | the staging owed |
|---|---|---|---|
| `foundations/paper-glass` | `paper`, hero | **mission-failure** — five glass-tier cards read as five identical white rectangles; "the page whose entire subject is the glass ladder has nothing behind the glass" (FD-storybook §3) | rebuild over a REAL in-region colour field (the display/card move) so each tier READS as a distinct plate; coordinate with W-SB1's GlassPanel→`.glass-*` re-express (W-SB1 §2.2 removes GlassPanel from this page) |
| `dock/overview` | none | **the headline primitive over a void** — every dock specimen floats in empty cream; "the dock IS glass; there is nothing behind it to vouch for that" (FD-storybook §3, §6 the #1 placement) | stage an aurora wash INSIDE the dock-specimen frames (low intensity) so the glass dock has something to be glass against |
| `dock/rail` | none | "a small rail centered in a vast empty frame — negative space without composition" (FD-storybook §3) | the same in-frame aurora wash |
| `substrates/{aurora,blob,constellation,fourier-field}` | none (the manifest asymmetry, FD-substrate-pages §0) | "not one of the four pages stages its own substrate… framed like fixtures in a QA bench" (FD-substrate-pages verdict) | each page gets its OWN substrate as a full-bleed hero backdrop (`background: <own substrate>, hero: true` — one manifest line each, FD-substrate-pages §8) |
| `compositions/auth-shell` | `fourier`, hero | fourier RUNS but 100% OCCLUDED (RA-flow-fields §4: cardFrac 1.0, 0 painted px outside the card); the orphan `purple-tomato` palette (FD-storybook §9.2.10) was DESIGNED for this panel and ships unused | the read-through seam + the `purple-tomato` aurora un-orphaned onto the brand panel |
| `compositions/hero` | `constellation`, hero | DEAD — 0px (the W-SB1 §1.5.2 source bug); even after the paint-fix, the 0.8α card erases the lattice | DEPENDS on W-SB1 G6b (paints) → the read-through seam (perceivable) |
| `data/metric-cell`, `metric-stack`, `compositions/math-paper`, `compositions/dashboard` | `grid` (4 rows) | INVISIBLE on all four — "7%/12% foreground hairlines behind an 80%-opaque blurred plate ≈ nothing" (FD-storybook §2) | the read-through seam (raised grid alpha for the behind-card role) OR an inside-card grid (the blueprint conceit deserves to land) |
| `compositions/empty-states` | none | the natural home for the GooBlob mascot (FD-storybook §6, §5.4) — zero blob placement in the whole book | the blob seam (W-SB-STAGE provides the substrate kind; W-EGG drives the mascot interaction) |

### 1.4 The 'occasional substrate usage' standard made real — the FD §6 map (verbatim, with route ids)

FD-storybook §6 divined the BEFITTING placements; restraint is part of the standard (forms/feedback/containers
STAY quiet). The enumerated map, each row a manifest `background` decision:

| route | substrate (intensity) | why befitting (FD §6) |
|---|---|---|
| `dock/overview`, `dock/rail`, `dock/layers` specimen frames | **aurora**, low intensity, INSIDE the frames | the dock is the headline glass primitive; glass needs something behind it. The display/card strip is the proven pattern |
| `foundations/paper-glass` tier ladder | **in-region colour field** (the display/card / glass-material move) | the page's subject is the glass ladder; today five identical white cards |
| `substrates/aurora` page bg | **aurora** (own substrate, whisper) | self-demonstration; kill the dead pastel bloom (`aurora.vue:~133`), let the live field be the bleed (FD-substrate-pages §1) |
| `substrates/blob` page bg | **blob** (own substrate, soft live wash) | open on the mood hero, big + edge-overlapping; the glass card has something to be glass against (FD-substrate-pages §2) |
| `substrates/constellation` page bg | **constellation** (own substrate, louder showcase alpha) | the page over its OWN drifting lattice; a showcase may shout where a background whispers (FD-substrate-pages §3) |
| `substrates/fourier-field` page bg | **fourier** (own substrate, warm-started) | the page over its OWN curve; warm-start every well so no first paint is empty (FD-substrate-pages §4) |
| `compositions/hero` | **constellation** (after the W-SB1 h=0 fix + read-through) | already declared; fix + raise read-through |
| `compositions/auth-shell` | **fourier** + the **`purple-tomato`** aurora on the brand panel | un-orphan the DESIGNED palette (FD-storybook §9.2.10) |
| `compositions/empty-states` | **blob** accent | the only blob placement in the book; mascot register (the W-EGG seam) |
| `data/metric-stack`, `compositions/dashboard`, `compositions/math-paper` | **grid**, raised alpha or inside-card | declared and invisible today; the blueprint conceit deserves to land |
| `foundations/motion`, `motion/springs` | **constellation**, whisper | motion pages over the moving lattice — quiet self-reference |
| `navigation/carousel` | **aurora** wash | a media-shaped surface over a painterly drift |

**Restraint allowlist (STAY quiet — G-RESTRAINT asserts NO backdrop):** all `forms/*`, all `feedback/*`, all
`containers/*` (FD-storybook §6 "restraint is part of the standard"). Over-applying backdrops is as much a defect
as under-applying them.

### 1.5 The W60 flat-backdrop confirmation (RA-glass-default §6) — why this is load-bearing

RA-glass-default §6: on the demo's flat-cream pages the glass default is IMPERCEPTIBLE — `default`/`glass`/
`glass-wash`/`outline` buttons are near-indistinguishable faint pills "nothing behind to blur, so the register
collapses to subtle… a visitor driving the demo would NOT say 'this library is glass-first' on most routes. Only
the few stories with rich backgrounds (intro aurora, paper-glass, hero constellation) plus the nav rail/dock let
the material speak. W60 is load-bearing for the claim being EXPERIENCED, not just measured." W-SB-STAGE IS the W60
lineage for the storybook — it makes glass-first EXPERIENCED on the substrate/dock/composition pages.

---

## 2. Objective (the gestalt — fix the seam ONCE, then place the substrates)

### 2.1 The StoryHero read-through seam (the prerequisite — fix ONCE, every placement inherits it)

The §1.1 erasure is ONE seam. FD-storybook §2 names the fix routes (any one suffices; the first two compose):
(a) hero cards take a LOWER-opacity tier over a live substrate; (b) INSET the card so the substrate rims it (the
visible-margin move — FD §9.1's prerequisite); (c) raise grid/paper alpha for the behind-card role; (d) the
constellation positioning bug (→ W-SB1 §1.5.2, already routed). W-SB-STAGE lands **(a)+(b)** as the chassis seam:

- **(a) Lower-opacity hero rung over a live substrate.** When a page declares a LIVE substrate (`aurora`/
  `constellation`/`fourier`/`blob`), the StoryHero card drops from `floating` (0.8α) toward `wash`/`quiet`
  (0.3α/0.5α — the W54 ladder rungs already exist; `CardTier` carries them, `Card.vue:20`). The substrate now
  reads THROUGH the thinner plate. Express this as a STAGING-aware tier on `StoryHero.vue:147-148` (a
  `liveBackdrop` computed selects the rung — `wash`/`quiet` over a live substrate, `floating`/`resting` over
  grid/paper/none). This is a CHASSIS edit (one demo file), NOT a library `--glass-level` change — the library
  default is correct (RA-glass-default §1-2 confirm the bare button paints real glass); the issue is the DEMO
  card tier choice over a live backdrop. Record the resolved rung in the DELTA (the π readback decides which rung
  reads legibly without dropping content contrast — coordinate with the W55 over-light legibility bucket if the
  thinner plate pushes prose below 4.5:1; see §2.4).
- **(b) Exposed substrate margin (the visible-margin move).** Inset the card inside `.story-hero` so the
  substrate RIMS it — an exposed gutter of ~1.5–2rem (FD §9.1's "1.5–2rem, or an asymmetric card offset on hero
  pages"). Express on `story-hero.css` (a `--story-hero-inset` token + the card no longer fills 100%; the
  `.story-hero-card > * { width: 100% }` rule at `:81` STAYS — it governs the card's CHILDREN, not the card's own
  fill). The inset gives the "floating over a substrate" promise a literal float. Hero pages may take an
  asymmetric offset (the composition gesture); page-variant a symmetric small gutter.

Both (a)+(b) compose: a thinner plate AND an exposed rim. Default for a NON-live backdrop (grid/paper/none) is
byte-identical to HEAD (the staging tier + inset apply ONLY when a live substrate is declared — the
default-path canary).

### 2.2 Realize the FD §6 map (the manifest backdrop decisions + the model-page strips)

Apply the §1.4 map. Two mechanisms:

- **Manifest `background` rows (the self-demonstration placements).** Add `background: <own substrate>,
  hero: true` to the four `substrates/*` rows (`manifest.ts:138-141`), the `compositions/empty-states` row
  (blob), the `foundations/motion` + `motion/springs` rows (constellation whisper), the `navigation/carousel`
  row (aurora wash). This is the FD-substrate-pages §8 "one manifest line each" move — the chassis already reads
  `background`; the rows just don't declare it for their OWN substrate. **The chassis union must gain `blob`.**
  `StoryBackgroundKind` (`aurora-hero.ts:66-72`) is `paper|grid|aurora|constellation|fourier` — NO `blob`. Add
  `blob` to the union AND the `StoryHero.vue` `v-else-if="kind === 'blob'"` branch (mount `<GooBlob>` with the
  injected colour resolver + a recession intensity, mirroring the aurora/fourier branches at `:109-133`). This
  is the ONE library-adjacent edit (a demo-chassis union + branch); the GooBlob component already ships
  (`/goo-blob`, the injected `ColorResolver` model).
- **The model-page in-region strips (the foundations-glass pages).** For `foundations/paper-glass` (and the
  dock-specimen frames), the backdrop is a LOCAL colour field IN the region (the display/card pattern), not a
  full-page substrate. Rebuild `paper-glass.vue` so each glass tier sits over a vivid in-region gradient/strip
  (coordinate with W-SB1 §2.2 — that wave removes GlassPanel from this page and re-expresses onto `.glass-*`
  rungs; W-SB-STAGE adds the colour field BEHIND those rungs so they READ). For `dock/overview` + `dock/rail`,
  stage a low-intensity aurora wash INSIDE the dock-specimen `ShowcaseFrame`s (a contained `<Aurora>` at a
  whisper intensity behind the dock, NOT a full-page hero — the dock is a specimen, not a hero).

### 2.3 The StoryHero card given substrate margin/read-through — coordinate with W-COHERE + the W60 lineage

The constellation recession PROP (`opacityCeiling`) is W-COHERE's E3 (its D3). W-SB-STAGE THREADS it (the
`StoryHero.vue` constellation branch at `:116-123` does NOT pass `:opacity-ceiling` today — aurora/fourier do at
`:112`/`:129`). When W-COHERE lands the prop, W-SB-STAGE threads `:opacity-ceiling="opacityCeiling"` onto the
constellation branch so a constellation hero recedes with its siblings (the parity W-COHERE D3 names + the
staging needs). **Scope split, explicit:** W-COHERE AUTHORS the recession prop + the set-cohesion (accent/shadow);
W-SB-STAGE THREADS it into the chassis + chooses the page-level intensity + lands the page STAGING (which pages,
what inset, what rung). W-SB-STAGE does NOT touch the blob mood-register / shadow / accent (W-COHERE) nor any
substrate ENGINE (the refit/intensity/morph are settled). The two serialize: W-COHERE's prop before
W-SB-STAGE's thread. Do NOT duplicate W-COHERE's §3 edit-sites — W-SB-STAGE's only `Constellation.vue`-adjacent
edit is the `StoryHero.vue` thread of the prop W-COHERE adds.

### 2.4 The over-light legibility coordination (W55 bucket; do NOT re-own)

Dropping the hero card to a thinner rung over a BRIGHT live substrate (a pale aurora bleed, a bright lattice) is
exactly the W55 G2 case (content over a VERY LIGHT/busy backdrop drops below 4.5:1 — RA confirms it LIVE on
`substrates/glass-material` where 18px muted prose paints ~2.5-3:1 over the cyan gradient, FD-storybook §9.2.11).
The W55 `--glass-backdrop: light` declarative bucket EXISTS for this. W-SB-STAGE SETS `--glass-backdrop: light`
on the StoryHero card region when it stages a bright live substrate behind a thinned plate (the declarative
bucket the consumer sets where it KNOWS the backdrop is bright — CLAUDE.md W55). It does NOT re-author the W55
mechanism (that is W-LEG1 / W-A11Y-PERF) — it CONSUMES the shipped bucket so the thinned-plate prose stays AA.
The G-READTHROUGH π readback (§6) binds BOTH: substrate perceivable AND prose ≥4.5:1.

---

## 3. Edit-sites (exact; the chassis seam + the demo-page staging)

| File | Edit |
|---|---|
| `demo/stories/StoryHero.vue` | (a) `:147-148` — `liveBackdrop` computed selects a LOWER tier (`wash`/`quiet`) over a live substrate, keeps `floating`/`resting` over grid/paper/none (§2.1a); thread `:opacity-ceiling="opacityCeiling"` onto the constellation branch (`:116-123`, mirroring aurora `:112`/fourier `:129`) once W-COHERE lands the prop (§2.3); add the `v-else-if="kind === 'blob'"` `<GooBlob>` branch (§2.2); set `--glass-backdrop: light` on the card region over a bright live substrate (§2.4) |
| `demo/stories/story-hero.css` | (b) `--story-hero-inset` token + the card no longer fills 100% of `.story-hero` (an exposed substrate gutter ~1.5-2rem; hero pages may take an asymmetric offset) — `.story-hero-card > * { width: 100% }` at `:81` STAYS (it governs children, not the card fill) (§2.1b); raise the behind-card grid alpha (`--story-grid-color*` at `:38-56`) for the read-behind-card role if the inset+thin-rung is insufficient (§1.4 grid rows) |
| `demo/stories/aurora-hero.ts` | `StoryBackgroundKind` union (`:66-72`) gains `"blob"`; the `StoryBackground` object form documents the blob seam (§2.2) |
| `demo/stories/manifest.ts` | ADD `background` (+ `hero` where befitting) to the FD §6 map rows: `substrates/{aurora,blob,constellation,fourier-field}` (`:138-141`, own substrate + hero), `compositions/empty-states` (blob), `foundations/motion` (constellation whisper), `motion/springs` (constellation whisper), `navigation/carousel` (aurora wash); un-orphan `purple-tomato` onto the `compositions/auth-shell` brand panel (§1.4, FD §9.2.10) |
| `demo/stories/foundations/paper-glass.vue` | REBUILD over an in-region colour field (the display/card model) so each glass tier READS as a distinct plate (§2.2); COORDINATE with W-SB1 §2.2 (GlassPanel→`.glass-*` re-express) — W-SB1 owns the rung swap, W-SB-STAGE adds the colour field behind the rungs |
| `demo/stories/dock/overview.vue` | stage a low-intensity contained `<Aurora>` INSIDE the dock-specimen frames so the glass dock has a backdrop (§2.2, FD §6 the #1 placement) |
| `demo/stories/dock/rail.vue` | same in-frame aurora wash (§2.2) |
| `demo/stories/substrates/aurora.vue` | kill the dead pastel bloom (`aurora.vue:~133`, `opacity-60 blur-2xl` — imperceptible per FD-substrate-pages §1); the page's own hero backdrop is the live field (the manifest `background: aurora, hero` row does this) |
| `demo/stories/substrates/{blob,constellation,fourier-field}.vue` | adopt the hero register the manifest row now declares; the page-shape recompose (six-box column → composed spread, warm-start the fourier wells, the blob mood-hero-first) is FD-substrate-pages §2-4 detail — land the HERO backdrop minimally here, route the full per-page recompose to W-SB2 if it exceeds the staging scope (record which in PROGRESS) |
| `scripts/proof-substrate-staging.mjs` | NEW — the staging gate (§6): a source-witness over the manifest map + the read-through π readback hook |
| `scripts/gates.mjs` | ADD the `proof:substrate-staging` row (local + ci registry; append-only) |
| `package.json` | ADD the `proof:substrate-staging` script entry |
| `.github/workflows/ci.yml` | ADD a `proof:substrate-staging` step |
| `docs/tranches/AY/audit/visual/W-SB-STAGE-DELTA.md` | NEW — the own-surface captured DELTA (§6 G-DELTA) |
| `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` | ADD `W-SB-STAGE` (the wave changes pixels) |
| `docs/tranches/AY/PROGRESS.md` | record the close + the realized backdrop map |

---

## 4. Scope fence (what W-SB-STAGE does NOT do)

- It does NOT author the constellation recession PROP (W-COHERE E3) — it THREADS it. It does NOT touch the blob
  mood-register / ambient shadow / accent (W-COHERE D1/D2/D4) nor any substrate ENGINE (refit/intensity/morph —
  all settled). Its only `Constellation`-adjacent edit is the `StoryHero.vue` thread.
- It does NOT fix the constellation zero-paint SOURCE bug (W-SB1 §1.5.2 G6b) — it DEPENDS on it (a 0px host can't
  be staged). If W-SB1 has not landed when W-SB-STAGE runs, G-READTHROUGH's constellation arm is born-RED on that
  dependency until it lands (explicit, not papered over).
- It does NOT re-author the W55 over-light legibility mechanism (W-LEG1 / W-A11Y-PERF own it) — it CONSUMES the
  shipped `--glass-backdrop: light` bucket so the thinned plate stays AA.
- It does NOT prune/fold routes (W-SB1) nor add easter eggs (W-EGG) — it provides the empty-states blob SEAM that
  the W-EGG mascot sits on; the mascot INTERACTION (pointer-lean) is W-EGG.
- It does NOT over-apply backdrops — forms/feedback/containers STAY quiet (G-RESTRAINT asserts it). Restraint is
  the standard; a backdrop on every page would be the inverse defect.
- The FULL per-substrate-page recompose (six-box column → composed spread, fourier well warm-start, blob mood-
  hero-first — FD-substrate-pages §2-4) may exceed the staging scope; W-SB-STAGE lands the HERO BACKDROP +
  read-through minimally and routes the page-layout recompose to W-SB2 if it overflows (recorded, not silently
  partial).
- It does NOT change the library `--glass-level` or any `--glass-bg-*` rung (the library default is correct —
  RA-glass-default §1-2). The tier choice is a DEMO-chassis decision over a live backdrop, not a token retune.

---

## 5. Risk ledger

1. **Thinner rung drops prose below AA over a bright substrate (the W55 G2 trap LIVE).** RA confirms it on
   `substrates/glass-material` (2.5-3:1 muted prose over the cyan gradient). MITIGATION: set `--glass-backdrop:
   light` on the staged card region (§2.4) AND bind the G-READTHROUGH π readback to BOTH axes (substrate
   perceivable AND prose ≥4.5:1). The rung that reads the substrate must not be so thin it fails contrast — the
   π readback picks the rung, not a hand-set guess.
2. **Default-path byte-identity (grid/paper/none pages).** The staging tier + inset apply ONLY when a LIVE
   substrate is declared; grid/paper/none pages stay byte-identical to HEAD. LOCKED by a default-path canary (a
   grid/paper page's rendered card tier + geometry is unchanged from HEAD).
3. **Over-staging (the restraint inverse).** Adding a backdrop to a quiet page (forms/feedback/containers) is as
   much a defect as the under-staging. LOCKED by G-RESTRAINT (a source-witness asserts those categories declare
   NO backdrop). The map in §1.4 is the EXHAUSTIVE placement set — no page outside it gets a backdrop.
4. **The blob chassis branch (the one library-adjacent edit).** Adding `blob` to `StoryBackgroundKind` + the
   `StoryHero.vue` branch is a demo-chassis change, not a library API. The GooBlob component already ships; the
   branch mirrors the aurora/fourier branches. Re-grep `StoryHero.vue:109-143` against the carved tree before
   editing (the stale-worktree-trap step-0). If a sibling wave moved the substrate branches, the blob branch
   lands beside them.
5. **Dependency-order.** W-SB-STAGE consumes W-SB1 (constellation paints), W-COHERE (recession prop), and the
   shipped W55 bucket. It runs AFTER W-SB1 + W-COHERE in the substrate/storybook band. The dependent arms are
   born-RED in the gate until their dependencies land (explicit).

---

## 6. HARD GATE (evidence-backed; born-RED at HEAD)

**Gate name:** `proof:substrate-staging` (NEW; source-witness + π readback hybrid, the `proof:glass-cohesion`
set-canary shape) + `proof:live-verified-ledger` (AY-pathed; the captured DELTA). Born-RED at HEAD. GREEN only
when ALL hold. The π readbacks run on the live demo (`:5199`, Metal-backed channel — the SwiftShader headless
renderer wedges on the aurora page, FD-storybook §0).

**G-READTHROUGH (the substrate is PERCEIVABLE behind the card — born-RED on the 0.8α erasure + 0×0 margin).**
A π readback on each declared-LIVE-backdrop page (aurora intro, constellation hero, fourier auth-shell, the
restaged substrate pages) asserts: (i) the substrate is PAINTED (canvas/`getImageData` finds non-blank substrate
pixels), AND (ii) the substrate is PERCEIVABLE — substrate pixels show in the exposed margin AROUND the card
(the §2.1b inset) OR a measurable luminance/colour delta between the card-over-substrate region and a
card-over-flat-cream control (the thinned-rung read-through), AND (iii) the card's prose stays ≥4.5:1 (the §2.4
W55 binding). **Born-RED at HEAD:** FD §9.1 measures 0×0 exposed margin on every page; RA-flow-fields §4 measures
0 painted-px-outside-card on auth-shell; the 0.8α card erases line-work. Bite-check: restore `tier="floating"` +
the 100%-fill card → the read-through delta collapses to ~0.

**G-MAP (the FD §6 occasional-usage map is REALIZED — born-RED on the un-declared rows).** A source-witness
asserts the §1.4 map rows carry their befitting `background` (the four substrate pages declare their OWN
substrate + hero; empty-states declares blob; motion/springs declare constellation; carousel declares aurora;
auth-shell un-orphans `purple-tomato`), AND `StoryBackgroundKind` carries `blob`, AND `StoryHero.vue` has a
`blob` branch. A π capture confirms the paper-glass + dock pages show their in-region colour field behind the
glass. **Born-RED at HEAD:** `manifest.ts:138-141` declare NO background (FD-substrate-pages §0 the asymmetry);
the union has no `blob`; `purple-tomato` has 0 consumers (FD §9.2.10).

**G-RESTRAINT (the quiet pages STAY quiet — the restraint standard).** A source-witness asserts NO
`forms/*`/`feedback/*`/`containers/*` manifest row declares a `background` (the §1.4 restraint allowlist). The
map is the EXHAUSTIVE placement set — staging is occasional by construction, not sprayed. **Bite-check:** declare
a backdrop on a forms row → REDs.

**G-DELTA (the own-surface captured DELTA — the cardinal lesson).** `proof:live-verified-ledger --tranche=AY`
GREENs over the `W-SB-STAGE` row: `audit/visual/W-SB-STAGE-DELTA.md` references the own-surface `W-SB-STAGE-*.png`
contact set — the staged pages (paper-glass over its colour field, dock/overview over its aurora wash, the four
substrate pages over their own substrate, the hero/auth-shell heroes reading through the thinned plate) in light
AND dark, each substrate PERCEIVABLE behind glass AND each page's content legible. The DELTA records the
read-through measurement (the substrate-vs-flat luminance delta + the prose contrast) — the falsifiable staging
numbers, not a prose "it reads now." **Born-RED at HEAD:** no `W-SB-STAGE-*.png` exist.

**G-NOREG (no default-path regression).** Grid/paper/none pages stay byte-identical to HEAD (the §2.1 staging
applies ONLY to live substrates — the default-path canary). `proof:no-orphan-demo-route` + `proof:storybook-*`
stay GREEN (the manifest `background` adds + the blob union don't break the route↔row equality or the export↔story
map).

**Why this gate, not grep-alone:** G-READTHROUGH is a born-RED π readback against the AS-BUILT erasure (the 0.8α
card + 0×0 margin the audit MEASURED) — exactly the "new evidence-backed bar the current state FAILS" the
perfection-wave discipline demands. G-DELTA is the machine-enforced captured DELTA closing the cardinal lesson
over the staged surfaces. A grep that a manifest row gained `background:` is insufficient — RA-flow-fields §4
PROVES a declared backdrop can render 0px or be 100% occluded; the π readback is the only witness that the
backdrop reaches the retina.

---

## 7. Convergence + named successors

W-SB-STAGE converges when G-READTHROUGH/G-MAP/G-RESTRAINT/G-DELTA/G-NOREG all verify. On miss:

- If the thinned rung cannot read the substrate WITHOUT dropping prose below AA even with the W55 bucket
  (risk-1), the read-through leans on the INSET (the exposed margin) over the thinned rung — the substrate shows
  AROUND the card at full plate opacity, prose stays on a firmer rung. Recorded, not silently partial.
- The FULL per-substrate-page recompose (six-box column → composed spread, fourier warm-start, blob mood-first —
  FD-substrate-pages §2-4) routes to **AY.W-SB2** if it exceeds the staging scope; W-SB-STAGE lands the hero
  backdrop + read-through, W-SB2 the page-layout composition.
- The constellation-arm of G-READTHROUGH depends on **AY.W-SB1** G6b (paints) + **AY.W-COHERE** E3 (recedes); if
  either slips, that arm stays born-RED until it lands (the dependency is in the gate).
- The empty-states blob MASCOT interaction (pointer-lean, the 404) is **AY.W-EGG** — W-SB-STAGE lands the blob
  SEAM only.

---

## 8. Cross-references

- Provenance: `audit/design/FD-storybook.md` (§2 the systemic erasure, §6 the divined map, §9.1 the 0×0 invariant,
  §9.2.10 the purple-tomato orphan, §9.2.11 the over-light prose, §9.2.13 the intro void), `audit/design/
  FD-substrate-pages.md` (the four un-staged pages + §5 the staged-model under-delivers + §8 the gap list),
  `audit/reality/RA-flow-fields.md` (§4 the hero-consumption layer 1-of-3), `audit/reality/RA-glass-default.md`
  (§6 the W60 flat-backdrop confirmation).
- Sibling waves: **W-SB1** (the constellation zero-paint SOURCE fix — G6b is the prerequisite; the
  GlassPanel→`.glass-*` re-express on paper-glass — coordinate the colour-field add), **W-COHERE** (the
  constellation recession prop + the set cohesion — W-SB-STAGE threads the prop, does not author it),
  **W-EGG** (the blob empty-state mascot + 404 — W-SB-STAGE provides the seam), **W-SB2** (the per-page recompose
  successor), **W-LEG1/W-A11Y-PERF** (the W55 bucket W-SB-STAGE consumes).
- Precepts: `TRANCHE-AND-WAVE-SPEC.md` §"Hard gate" (the π-readback kind, born-RED); the cardinal-lesson DELTA
  (`proof:live-verified-ledger`); MEMORY `feedback_architectural_approach` (gestalt — fix the seam ONCE, every
  placement inherits it); the W55 adaptive-glass-legibility canon (the `--glass-backdrop: light` bucket);
  CLAUDE.md glass-first canon (W54 — glass needs a backdrop to be EXPERIENCED, the W60 lineage).
