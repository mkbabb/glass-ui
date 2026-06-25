# PAGE-CHROME — WAVE-AMENDMENT (reconcile vs the extant set · no-dup · references GOLDEN.md)

> The page-chrome GOLDEN is a **UNION/reconcile, not a new fork**. Every one of the six asks already maps
> to an on-disk wave in `docs/tranches/BD/union/waves/`. The amendment's contribution is the
> **UNIFICATION** (one `--chrome-glass` register + one `--chrome-rule` seam + one corner-clip), the three
> challenge-hardened RE-INVENTs (the §2e host→backdrop-child clip, the explicit warm-tint wiring, the
> WebKit re-spike), and the buildability reconciliation against the extant set. **No new SPINE wave is
> minted; no wave is duplicated; no on-disk wave is pruned.** Each amended wave references
> `docs/tranches/BD/greenfield/page-chrome/GOLDEN.md` as its reference implementation, with a real
> born-RED gate. The DEPENDS (motion/cartoon/field deltas) are CITED, never re-minted.

---

## A — THE RECONCILE MAP (every ask → its on-disk wave → the verdict)

| ask | on-disk wave (full dev spec) | terse stub | disposition |
|---|---|---|---|
| HEADER SCALE | `BD.W-HEADER-SCALE.md` | `W-HEADER-SCALE.md` | **AUGMENT** — adopt the chrome/hero SCALE **SPLIT** (the existing `HALVED_HERO_RUNG` map currently halves ALL header forms incl. hero; the GOLDEN keeps the hero `<h1>` audacious + halves ONLY the chrome label via `--chrome-title-rung`). |
| DIVIDING RULE | `BD.W-PAGE-CHASSIS.md` (Arm 1) | (in `W-HEADER-SCALE` stub) | **AUGMENT** — RETIRE the phantom `--story-header-rule`; mint `--chrome-rule` (= `--configurator-divider`), read in THREE places (the resting rule + the bar edge + the toc edge). |
| STICKY-CONDENSE | `BD.W-STICKY-TITLE-CONDENSE.md` | `W-STICKY-TITLE-CONDENSE.md` | **AUGMENT** — the static-bar floor (paint on EVERY engine) + the REAL sibling `.story-hero-bar` div (no neg-z `::before`) + the explicit warm tint + the `--chrome-glass` register the toc shares. |
| PATH-STANDARDIZE | `W-PATH-STANDARDIZE.md` (terse only) | — | **AUGMENT** — the kind-marked stamp (CSS-drawn marker, NO Unicode glyph) + `aria-label` + the SFC-import-matches-chip + census assert. (Develop the terse stub into a full wave OR fold into `BD.W-PAGE-CHASSIS`'s census — see §C.) |
| CORNER-ALIASING | `BD.W-CORNER-AA.md` + `BD.W-CORNER-AA-WIDEN.md` | — | **UPDATE (load-bearing)** — RE-SPEC the clip: clip a backdrop-only CHILD, NEVER the shadow-bearing host (the R1 shadow-amputation kill); clip to the tier's OWN radius token; gate the shadow-SURVIVAL. |
| TOC GLASS | `BD.W-TOC-MENU-GLASS.md` (`docs/tranches/BD/waves/`) | — | **AUGMENT** — enroll onto the `--chrome-glass` register; the active marker morphs on **transform only** (`useTabIndicator`/`useScrollTracker`, no `height`/`block-size`, no 2nd scroll listener). |

**The dup-kill (the unifier — NOT a 7th wave):** the existing six waves already decompose correctly. The
UNION declares ONE `--chrome-glass` register (the `.glass-floating` recipe + the warm tint + `--chrome-rule`
+ the corner-child clip) shared by `BD.W-STICKY-TITLE-CONDENSE`'s bar AND `BD.W-TOC-MENU-GLASS`'s toc, and
ONE `--chrome-rule` seam shared by all three edges. So those waves CONSUME ONE register;
`BD.W-CORNER-AA` stays the disjoint library paint they inherit; `W-PATH-STANDARDIZE` stays the disjoint
manifest-assert. **No new wave; no duplication.**

---

## B — THE AMENDMENTS (cite by filename · each references GOLDEN.md · born-RED gate)

### B1 — AUGMENT `BD.W-HEADER-SCALE.md` (the chrome/hero SCALE SPLIT)

**Reference:** GOLDEN.md §2a.
**Change:** the existing `HALVED_HERO_RUNG` map halves the rung for ALL header forms (both `StoryHero.vue`
the hero card AND `StoryPage.vue:114` the chrome `<header>`). The GOLDEN refines this to a **SPLIT**: the
chrome `<header>` `<h1>` (`variant="page"`) reads a calm `--chrome-title-rung: var(--type-display-1)`; the
hero page's OWN `<h1>` (`variant="hero"`, a substrate-viz wordmark) KEEPS the audacious tier (the over-scale
is a SELECTION bug on the CHROME title, not a library-identity bug). Add:
- a `--chrome-title-rung` token in `story-hero.css` (`:root { --chrome-title-rung: var(--type-display-1); }`)
  read by `.story-hero[data-variant="page"] .story-hero-title`;
- the `text-display-${heroScale}` chrome-title form in `StoryPage.vue:114` re-points to the rung token;
- the `HALVED_HERO_RUNG` map's hero/marquee weights (`hero`/`mega`/`audacious`) are NO LONGER forced into
  the title band on `variant="hero"` — the audacious ladder survives there (the CEILING re-point). The
  `scale.css` √φ ladder stays byte-untouched (the existing H4 fence is PRESERVED verbatim).
**Born-RED add to `proof:header-scale`:** **H6 (split)** — the `variant="page"` chrome `<h1>` resolves
`--chrome-title-rung` (`font-size ≤ ~52px`, NOT `text-display-${heroScale≥4}`) WHILE a `variant="hero"`
page's own `<h1>` resolves the audacious tier (≥ `text-display-4`). Born-RED on HEAD: `/display/buttons`
chrome `<h1>` = **109.664px** `text-display-5` (live-verified 2026-06-24). Self-test bite: the chrome title
pinned to 109px → H6 RED; a global shrink that ALSO halves the hero `<h1>` → H6 RED (the split, not a
flatten).

### B2 — AUGMENT `BD.W-PAGE-CHASSIS.md` Arm 1 (the `--chrome-rule` seam — RETIRE the phantom `--story-header-rule`)

**Reference:** GOLDEN.md §2c.
**Change:** Arm 1 currently mints `--story-header-rule: 1px solid var(--configurator-divider)`. The GOLDEN
retires that phantom token (live-verified UNSET on `:root` 2026-06-24) in favor of **ONE `--chrome-rule`
seam read in THREE places** — the resting masthead→body rule, the condensed bar's bottom edge
(`BD.W-STICKY-TITLE-CONDENSE`), and the toc's edge (`BD.W-TOC-MENU-GLASS`). `--chrome-rule:
var(--configurator-divider)` (dark-adaptive; used ONLY as `border-color`, so the MEMORY light-dark
inset-shadow trap never fires — the prose MUST state this rather than claim "plain per-mode arms," since
`--configurator-divider` IS a `light-dark()` token: SAFE here because it is never an inset shadow).
**Born-RED:** PC1 already asserts the header rule paints (`border-bottom > 0`, resolving through
`--configurator-divider`); ADD that the SAME token is read by the bar edge + the toc edge (one-token-three-
readers) — born-RED because `--chrome-rule` is UNSET and the bar/toc edges are absent on HEAD. Self-test
bite: a second rule token minted beside `--chrome-rule` → RED (DRY single-source).

### B3 — AUGMENT `BD.W-STICKY-TITLE-CONDENSE.md` (the static-bar floor + sibling div + warm tint + the register)

**Reference:** GOLDEN.md §2b + §1 (the boldest move).
**Change:** the wave already specs the glass backing + the per-rung subsume. The GOLDEN HARDENS the
backing mechanism against the challenges:
- **(R-Safari/static)** the backing paints a STATIC warm-glass bar at the resting floor on EVERY engine;
  the `scroll()` timeline ONLY ramps opacity from the floor up — so the Safari ≤25 `@supports`-off arm
  still has a bar (the occlusion fix is NOT keyed to the one engine that least needs it). The `::before`
  arm of GOLDEN §2b is replaced by a REAL sibling `.story-hero-bar` div behind the cluster text (in
  `StoryHeader.vue`, zero new SFC) — no negative-z `::before` backdrop-root gamble (the WebKit-fragile
  pattern the MEMORY warns of).
- **(R-gray)** the bar composes the `--chrome-glass` register that EXPLICITLY sets `--glass-tint-strength`
  to a nonzero warm floor + points `--glass-tint-source` at the per-page `--hue` — NOT the bare
  `--glass-bg-floating` neutral (live-verified `--glass-tint-strength: 0%` → the recipe is a NO-OP gray
  plate on the default path; the spike was a false-positive that inlined 14%).
- **(R-nested-backdrop)** in the CONDENSED pose the bar pushes toward the opaque tier so it OCCLUDES the
  body glass rather than glass-samples-glass on scroll (the WebKit nested-`backdrop-filter` gray trap).
- **(range)** the condense REUSES the shipped `--hero-condense-range` (160px) / `--hero-condense-fade-range`
  (120px) — no re-picked 170px.
**Born-RED update to `proof:sticky-title-condense`:** **C1** strengthens — the backing carries a NON-zero
resolved bg α (`--glass-tint-strength` RESOLVED > 0, chroma ≥ 0.045 warm H∈[25,95]) at rest on the REAL
page AND the opacity ramps on `scroll()` (RED on the live `rgba(0,0,0,0)` + `0%` tint). **C-nested (new)**
— a glass body card pixel in the bar's y-band reads warm, not gray, in BOTH engines. The π adds the
webkit-no-`scroll()` project arm asserting the static bar still occludes.

### B4 — UPDATE `BD.W-CORNER-AA.md` + `BD.W-CORNER-AA-WIDEN.md` (the DECISIVE re-spec — clip the backdrop CHILD, not the host)

**Reference:** GOLDEN.md §2e + challenge/1.md R1+R2.
**Change (load-bearing — the GOLDEN's §2e as written is DESTRUCTIVE):** the WIDEN wave's §"mechanism" puts
`clip-path: inset(0 round …)` on the SAME element as `backdrop-filter` (the rung/`.glass-card` host). But
every glass tier carries an OUTER `box-shadow` (`ladder.css:49/70/82/109/124` rim+shadow; `:405-418`
`--glass-under-shadow-vivid/-default` the iOS under-shadow). `clip-path` clips the host's ENTIRE rendering
INCLUDING its outer `box-shadow` (CSS Masking spec; live data-URL probe confirmed Chrome) → it AMPUTATES
the floating lift + iOS under-shadow on every Dialog/Sheet/Popover/card library-wide — a §3
PERFECTED-glass / defined-edge regression. RE-SPEC:
- clip the **backdrop/halo SOURCE, not the host**: a nested backdrop-only child owns ONLY
  `backdrop-filter` + `clip-path: inset(0 round <tier-radius>)`; the host's `box-shadow` is UNCLIPPED. (The
  grain `::after` already `border-radius: inherit`s — corner-correct; the backdrop is the real square.)
- clip to the tier's OWN radius token (`--radius-card` for `.glass-card`, the rung radius for the ladder) —
  NOT the global `--radius` (=10px, which live-mismatches the painted 16px on `.glass-resting` → an inner
  notch). Guaranteed fallback so the clip never silently drops (the `b538dec7` lost-mechanism class).
**Born-RED update to `proof:corner-aa`:** **C1** restated — each `backdrop-filter`-bearing tier's backdrop
LAYER carries the clip to its OWN radius. **C-shadow (new)** — the floating lift + iOS under-shadow SURVIVE
the clip (raster a NON-zero shadow band BELOW the tier; a tree that deleted card shadows FAILS — the
current C6 would false-green). **C-radius (new)** — computed clip-radius ≡ visual `border-radius` per tier
on a real page (not a global token). The two-sided fission-clip fence (C4 exclusion list) is PRESERVED. Note
that the bar/stamp/toc inherit this clip because they ARE glass tiers — the page-chrome surfaces consume
the corner-AA wave, they do not re-author it.

### B5 — AUGMENT `BD.W-TOC-MENU-GLASS.md` (the register enroll + transform-only marker + single reader)

**Reference:** GOLDEN.md §2g.
**Change:** the wave already retires `.themed-card` → `.glass-quiet`/`.glass-menu-row` + the selected-glass
register. The GOLDEN HARDENS:
- enroll the `<nav>` onto the shared `--chrome-glass` register (the SAME warm plate the condensed bar
  paints — one register, two homes) with `border-color: var(--chrome-rule)` (the toc edge = the seam) + the
  corner-AA backdrop-child clip;
- the active row is ONE warm pill that morphs on **transform ONLY** — `scaleY` (height delta) + `translateY`
  (position delta) off a fixed base rect, REUSING the shipped `useTabIndicator` glide+squish (delivers the
  liquid-weight squish; a `height`/`block-size` transition is a LAYOUT property, NON-compositor — the spike
  used `height 360ms`, forbidden). Drive off the shipped `useScrollTracker` active-id — **zero new
  `addEventListener("scroll")`** (the spike's throwaway listener is the 2nd scroll engine the union forbids);
- the fill is the warm `categoryHue` tint mixed toward a warm low-α stop (`oklch(0.9 0.05 var(--hue) / 0)`),
  NOT bare `transparent` (the oklab-toward-transparent gray-midpoint trap); chroma ≥ 0.045 warm.
**Born-RED update to M13:** **M13-5 (new)** — the active marker animates `transform` only (a `height`/
`block-size`/`width` marker keyframe RED); **M13-6 (new)** — the nav reads `--chrome-glass`/`--chrome-rule`
+ the marker fill resolves chroma ≥ 0.045 warm on the REAL page (RED on the live `oklab(… C≈0.006)` gray
active row). The π adds the webkit warm-marker + transform-only-morph arms.

---

## C — `W-PATH-STANDARDIZE` (the one terse-only ask — develop OR fold)

`W-PATH-STANDARDIZE.md` is a 15-line terse stub with no full dev spec, gate clauses, or π. Two
non-duplicative routes (pick at build):
- **(preferred, DRY) FOLD** the path-standard into `BD.W-PAGE-CHASSIS`'s `proof:page-chassis` census +
  `StoryHeader.vue` (which already renders the subpath chip) — add **PC6 (new)**: every page's stamp
  carries the kind marker (`data-kind="import"`/`"route"` DERIVED from the `SUBPATHS` shape, NO new data),
  import≠route fill (the `opacity:.86` route-quieting + a CSS-drawn marker, NO Unicode `⌘` glyph — tofu
  risk + semantically wrong), an `aria-label` carrying the kind (AT-legible), AND the SFC import matches the
  chip. Born-RED: live `data-kind=null`, no marker, no aria-label (2026-06-24).
- **(alt) DEVELOP** the terse `W-PATH-STANDARDIZE.md` into a full wave referencing GOLDEN.md §2f with the
  PC6 clauses above as its own `proof:path-standardize`.

Either way: the kind is DERIVED from the manifest `SUBPATHS` single source (`@`-prefix = import, `/`-prefix
= route), NO 2nd label registry, the glyph is CSS-drawn not Unicode, the standard is conveyed visually AND
via `aria-label`.

---

## D — THE DEPENDS (cited, NEVER re-minted here — the sibling-delta build-DAG)

Live-verified `--ease-cartoon-punch`/`--motion-weight` UNSET on `:root` (2026-06-24) — the entrance
cel-slam + the `--shadow-cartoon` title cast are NOT buildable until the sibling deltas land. CITE as
DEPENDS (the same DAG the `story-page-standard` + `glass-atoms` ledger rows record):
- `BD.W-CARTOON-PUNCH` / `BD.W-MOTION-WEIGHT` (motion-spring-register delta) — `--ease-cartoon-punch`,
  `--motion-weight`, the no-overshoot settle vocabulary the condense rides.
- `BD.W-CARTOON-CASTER` (cartoon-shadow delta) — the inert `.cartoon-cast` child + `--shadow-cartoon` the
  title's layered-offset cast consumes (NEVER a re-minted `::after` cast — the WebKit-hole + re-mint the
  `glass-atoms`/`story-page-standard` rows already excised).
- `BD.W-PAGE-FIELD` / `BD.W-FIELD-SCRIPT` (page-background delta) — `warmFieldHue`/`--field-h`/`paper-field`
  the warm `--chrome-glass` tint reconciles with (the colorful field the glass samples; the §3 floor).

These are NOT files in the wave set; they are deliverables of the sibling amendments, each with its own
born-RED gate. The page-chrome gate ERRORS no-such-token until they land (the C9 cel-slam + title-cast
clauses are DEPENDS-gated; the SCALE/RULE/CONDENSE-bar/CORNER/TOC/PATH arms ship token-independent NOW).

---

## E — THE NET (what changed, what did NOT)

- **AUGMENTED (5):** `BD.W-HEADER-SCALE` (the split), `BD.W-PAGE-CHASSIS` (the `--chrome-rule` 3-reader
  seam + PC6 path-stamp fold), `BD.W-STICKY-TITLE-CONDENSE` (static-bar floor + sibling div + warm tint +
  range), `BD.W-TOC-MENU-GLASS` (register enroll + transform-only marker + single reader).
- **UPDATED (load-bearing, 1):** `BD.W-CORNER-AA` + `-WIDEN` (clip the backdrop CHILD not the host; OWN
  radius; shadow-SURVIVAL gate).
- **DEVELOP-OR-FOLD (1):** `W-PATH-STANDARDIZE` → folded into `BD.W-PAGE-CHASSIS` PC6 (preferred) or
  developed standalone.
- **THE UNIFIER (no new wave):** the `--chrome-glass` register + the `--chrome-rule` seam are declared
  ONCE and CONSUMED by the bar + toc waves; not a 7th wave.
- **PRUNED / EXCISED: NONE on-disk.** EXCISED from the GOLDEN (not the waves): the `::before`-backdrop
  backing (→ sibling div), the host `clip-path` (→ backdrop-child), the `var(--radius)` clip (→ own
  radius), the `⌘`/`▸` Unicode glyphs (→ CSS-drawn + aria-label), the `height`/`block-size` toc marker (→
  transform-only), the spike's `addEventListener('scroll')` (→ `useScrollTracker`), the 170px range (→
  160px), the "ONE `--chrome-t` scalar" framing (→ "one scroll range, three paired animations" OR a real
  `@property`), the inlined-14%-tint spike false-positive (→ explicit default-path wiring).
- **NO LEGACY, NO ALIAS, NO DUAL PATH:** `themed-card` RE-HOMED, the `≥4` chrome floor RETIRED, the phantom
  `--story-header-rule` RETIRED, the bare condense REPLACED. Reconciled against the extant 116-wave set —
  zero duplication.
