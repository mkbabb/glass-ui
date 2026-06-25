# STORY-PAGE-STANDARD — DELTA-ASSAY (golden-vs-current + the UNION path)

> The deft integration of the WARM-CEL CHASSIS golden (`./GOLDEN.md`) into the SHIPPED
> `StoryPage`/`StoryHero`/`StoryHeader`/`StorySection`/`ShowcaseFrame` chassis. Survival of the
> fittest: KEEP what is fit, REFINE what is weak, RE-INVENT only what is broken. The three
> challenges (`challenge/1.md`, `2.md`, `3.md`) are FOLDED into the union below — the golden's IDEA
> survives, but its mechanism carries a correctness bug, two KISS bolt-ons, mislabeled deps, and a
> spike that de-risks a DIFFERENT construction than it specs. Tranche-dev only; build USER-gated.
> Reference implementation: `./GOLDEN.md` (with the struck claims listed in §4 below).

---

## 0 — THE LIVE DELTA (re-measured this session — Chrome `:5173`, 1440 viewport, `/display/buttons`)

Born-RED is GENUINE and re-confirmed live (`getComputedStyle` + `getBoundingClientRect` + the
`assay/buttons-light.png` screenshot read):

| invariant | live measurement (this session) | verdict |
|---|---|---|
| **φ² stage** | `.story-page-article` = **1152px @ 1440vw**, `artLeft 189.5px` → **~188px dead margin EACH side**; the body is ONE flat plate, no φ²-dominant stage | RED — the stage is article-width-capped, SMALLER not bigger |
| **colorful field behind glass** | `--field-h` **(unset)**, `.paper-field` count **0**; deepest page layer (`html`/`underpaint`) rasters **C 0.0029 @ L 0.985 H 84.6** (15× below the §3 0.045 floor) | RED — the §3 field is UNBUILT; the glass bends nothing |
| **glassy sub-cards** | the body is ONE `.story-hero-card` plate (`oklab(0.928 … / 0.664)`); the 8 sections are flat `flex flex-col` blocks delimited by a hairline | RED — "each sub-section its own GLASSY CARD" unmet |
| **one title** | 1 `<h1>` (good), BUT `assay/buttons-light.png` shows the body card ALSO hand-rolls a duplicate "DISPLAY · BUTTONS" eyebrow + "Launch the sequence" cluster (the W-PAGE-CHASSIS arm-2 double-header, 36 files) | AMBER — `<h1>` single; the in-card descriptor dup persists |
| **alive entrance** | `.scroll-build`/`.scroll-cascade` ARE wired (8 sections, `--i` index present) — the page assembles in order; the cartoon punch + per-cel squish/cast is the gap | GREEN-ish — entrance exists, no cartoon punch + no above-fold load build |
| **sub-type taxonomy** | **0** `_chassis/` dir (confirmed `ls`); `chassisProbe = story-hero` only — every page hand-rolls its arrangement | RED — conformity is by convention, not construction |
| **`--shadow-cartoon`** | **SHIPPED** (`3px 3px 0 color-mix(light-dark(…) 8%)`) — a faint NEUTRAL hairline, NOT the warm punch the spike paints | exists, but DEGRADED for the cast role (R3) |
| **`--story-header-rule`** | **(unset)**, header `border-bottom: 0px` | RED — no header→body seam (W-PAGE-CHASSIS arm-1) |

**The two-storybooks gestalt (re-confirmed in the screenshot):** `/substrates/aurora` (the HERO
`StoryHero variant="hero"` / `fullBleed` path) reads ALIVE — a full-bleed live field, an audacious
title, glass over a live ground. `/display/buttons` reads DEAD — a flat tan `bg-card` plate, the
double-descriptor, a 376px-total dead margin, a spec-sheet stack of same-weight sections, and the
one blue button band that IS over a contained field reads as a flat blue rectangle (a contained-viz
washed by the card, not a colorful field a glass surface BENDS). **The hero variant is the proof the
chassis CAN do this; the content pages never inherit it.** The job: every content page wears the
hero page's clothes — contained, calmer, per-sub-type, BY CONSTRUCTION.

**Build-DAG honesty (grep, live):** `.paper-field` / `--field-h` / `warmFieldHue` /
`--ease-cartoon-punch` / `--motion-weight` = **0 mounts in `src/` + `demo/`**. They are the
deliverables of the SIBLING greenfields (page-background → `BD.W-PAGE-FIELD` + `BD.W-FIELD-SCRIPT` +
`BD.W-FIELD-AURORA-RECONCILE`; motion-spring-register → `BD.W-CARTOON-PUNCH` + `BD.W-MOTION-WEIGHT`;
cartoon-shadow → `BD.W-CARTOON-CASTER`). This chassis CONSUMES them; it never re-mints them. The
"BYTE-UNTOUCHED library / 4 net-new artefacts" claim is true ONLY after those siblings land — a HARD
ordering edge the golden under-stated and the union states explicitly (§3).

---

## 1 — THE VERDICT TABLE (survival of the fittest — KEEP / REFINE / RE-INVENT)

| element | disposition | rationale |
|---|---|---|
| **the box-model INVERSION** (page = header cluster + free glassy cels over ONE shared field, not one monolith card with sections inside) | **KEEP** | the right gestalt; genuinely DRY-er; fixes stage/field/glassy-card in ONE move. All 3 challenges concede it survives. |
| **ONE `<DemoFrame variant>` chassis** (the five sub-types are PRESETS of one frame, not five SFCs) | **KEEP** | maximal KISS/DRY; "a page is physically incapable of rendering a flat opaque box off the allowlist" is a strong structural-conformity guarantee. |
| **the φ² stage GEOMETRY** (stage bleeds to φ² of the prose column; the prose stays measure-bound) | **KEEP** (geometry) / **RE-INVENT** (the bleed MECHANISM) | the ratio is real + live-spiked (1.691 ≈ φ). But the `margin-inline: calc(50% - 50cqw)` bleed needs a `cqw` container context the spike never exercised — and this repo REMOVED `container-type` to fix dock-collapse (MEMORY `glassui_340_published`). RE-INVENT per R4/R7: HOIST the stage variant OUT of the prose-measure wrapper (render stage cels as direct article children at `--story-stage-w`, prose cels at `--story-prose-measure`) — the spike's PROVEN fixed-width form. No `cqw`, no `container-type`, no collapse-scar revival. |
| **the five zero-logic re-exports** `(p) => h(DemoFrame, {...p})` | **RE-INVENT** | BROKEN as written (R1): a bare functional `(p) => h(Comp, {...p})` passes NO slots → `<DemoStage><ButtonDemo/></DemoStage>` renders an EMPTY stage (the demo is silently dropped — the exact silent-no-op class MEMORY `glass_ui_binding_verification` warns of; 0 precedent in the codebase). UNION fix (KISS-most): DROP the re-exports entirely; pages write `<DemoFrame variant="stage">` directly (the variant string IS the gate's S1 fingerprint). Removes a whole net-new file (`index.ts`). |
| **`ShowcaseFrame tier="field"` WRAPPING `<Card>`** (the 3-deep nest) | **RE-INVENT → COLLAPSE** | redundant bolt-on (R2): `tier="field"` makes ShowcaseFrame a transparent ghost (`border-transparent bg-transparent shadow-none`, ShowcaseFrame.vue:88) whose ONLY contribution is the caption band — while ShowcaseFrame's root ALSO hard-codes `shadow-cartoon` (line 106), then overrides it to `shadow-none`, and the inner Card carries its OWN tier shadow + the cast `::after` carries a third. THREE shadow sources on one cel (R4-watch). The spike renders a SINGLE box — its structure CONTRADICTS the golden's nest. UNION: `<DemoFrame>` = `<Card tier>` ALONE (the glass) + a sibling `<div class="demo-frame-caption">` inside DemoFrame (the caption band, reusing the `--showcase-caption-gap` rhythm token VALUE, not the component). One box, one backdrop-filter, one shadow source — matches the spike. |
| **the colorful field** (`.paper-field` + `--field-h` + `warmFieldHue`) | **KEEP as a DEPEND (do not author here)** | the field is the page-background sibling's deliverable (`BD.W-PAGE-FIELD`/`BD.W-FIELD-SCRIPT`). This chassis owns ONLY the universal per-route MOUNT (the `field`/`palette` prop wiring at `AppShell.vue:251`) + the per-sub-type transmit (`tier="field"`/`tier="quiet"`). It re-mints NOTHING. The monochrome-amber-field weakness (R5/#3-R3 — single `--field-h`, no painterly hue spread; the §3 "defined edge" unmeasured) + the warm→`transparent` gray-edge (#2-R1 — `background-color` does NOT pin gradient interp) are the FIELD wave's hardenings, already FOLDED in `page-background/WAVE-AMENDMENT.md` (the `warmFieldHue` derive + the CSS-clamp + the chroma-preserving `oklch(… / 0)` end-stops). This chassis CITES that edge, never re-litigates it. |
| **the cel-slam + lagging cast** (`view()` timeline + `--ease-cartoon-punch` + `--shadow-cartoon` cast) | **REFINE** (the mechanism is incoherent as specced) | three landing refutations: (R2/#3-R1) the cel-slam NEVER fires above-the-fold — `animation-range: entry 0%→42%` only animates as an element crosses INTO view, so the φ² protagonist (top 313px) loads STATIC; (R3/#2-R3) `view()` shipped Safari 26 (late-2025) — on most Safari today the WHOLE punch/cast/overlap block is skipped to a plain fade (NOT "PERFECT in Safari"); (#3-R1) `animation-delay: calc(var(--i) * …)` is a NO-OP on a `view()` timeline (delay is a CLOCK offset, a view timeline maps to SCROLL progress) → the "1/φ overlap stagger" cannot exist on the view mechanism it is bolted onto. UNION (the honest pick): the LOAD entrance is the SHIPPED on-mount `.scroll-build`/`.scroll-cascade` mount-clock stagger (the `--i` index — works to Safari 15, the overlap is REAL on a time clock), carrying the squash→overshoot→settle arc + the cast-lag; `view()` is the SCROLL-REVEAL enhancement for below-fold cels ONLY, `@supports`-gated. Two roles, not one. The cast `::after` offset must be a cartoon-register magnitude (scaled by `--motion-weight`), not the 4×5px @ 18% invisible stamp the spike paints. |
| **the cast carrier** (`::after` on the cel) | **RE-INVENT → consume `BD.W-CARTOON-CASTER`** | the glass-atoms delta already found `::after` is a forbidden cast carrier (a `box-shadow` translate repaints on an un-promoted child — a WebKit hole). The cast belongs on `BD.W-CARTOON-CASTER`'s inert `.cartoon-cast` child (the sibling deliverable, cross-engine-spiked there) with `will-change` + no-inherited-backdrop-filter. This chassis CONSUMES `.cartoon-cast`, it does not hand-roll an `::after { box-shadow }`. |
| **`VizStudio` → `DemoStage` fold** | **REFINE → UNION (render, don't replace)** | R8: `VizStudio` has a real prop surface (`presets`, `scrollMode`, `useConfiguratorState`) consumed by substrate pages; the generic `<slot/>`-only DemoFrame exposes none. "RE-EXPRESS as a preset" is under-specced — it either drops capability (regression) or grows the whole surface (no longer KISS). UNION: `<DemoFrame variant="stage">` RENDERS a `VizStudio` internally for the stage layout (a union — DemoStage IS the φ²-bleed + caption + cel-slam wrapper, VizStudio IS its stage-body engine), NOT a fold that deletes VizStudio. No parallel chassis, no capability loss. |
| **the one-title + header rule** (`--story-header-rule` + descriptor-fold) | **KEEP as a DEPEND** (`BD.W-PAGE-CHASSIS`) | the header rule + the 36-file double-header fold + the `label→heading` re-key are the on-disk `BD.W-PAGE-CHASSIS` wave's territory (already specced, born-RED, gated). This chassis CONSUMES that fold — `<DemoFrame>` renders only `<StorySection heading>` (the `<h2 text-subheading>`), never a 2nd `<h1>` or in-card eyebrow cluster. No double-authoring. |
| **the `.scroll-build`/`.scroll-cascade` register + `--i` index** | **KEEP** | shipped, correct, the load-entrance primitive the union RE-POINTS as PRIMARY (not fallback). |
| **`StorySection heading` → `<h2 text-subheading>`** | **KEEP** | shipped (StorySection.vue:79, AZ.W-HIERARCHY canonical rung); the named-section rung, byte-untouched. |
| **`Configurator asideSide="right"` + the `1/φ²` rail** | **KEEP** | shipped (Configurator.vue:86,102); the stage's cockpit layout, reused. |

---

## 2 — THE UNION PATH (the deft integration — KISS, reuse, no legacy, no dual path)

The golden's IDEA stands; the union RE-EXPRESSES it over the shipped seams with the challenge folds
baked in. **The net-new demo-side artefacts collapse from the golden's FOUR to THREE** (the broken
`index.ts` re-exports are EXCISED):

1. **`demo/stories/_chassis/DemoFrame.vue`** (NET-NEW, the one sub-type chassis). The single box:
   `<StorySection heading label blurb class="demo-frame story-cel" :data-variant>` →
   `<Card :tier>` (the glass) + a sibling `<div class="demo-frame-caption">` (the caption band).
   `tier = stage ? "quiet" : "wash"` (field-aware translucent — NEVER a flat opaque `bg-card`). NO
   `ShowcaseFrame` wrapper (R2 collapse). NO `::after` cast (consume `.cartoon-cast`, R4/caster). The
   ONLY per-page free content is the `<slot/>`. Pages compose `<DemoFrame variant="…">` DIRECTLY (no
   re-export indirection — R1 excise).

2. **`demo/stories/_chassis/demo-frame.css`** (NET-NEW). The φ ladder off ONE article width
   (`--story-article-w: min(96vw, 87rem)`, `--story-prose-measure: calc(… / φ)`, `--story-stage-w:
   var(--story-article-w)`); the variant internal layouts; the φ² stage escape via HOISTED stage cels
   (direct article children at `--story-stage-w`, prose cels at `--story-prose-measure` — NO `cqw`, NO
   `container-type`, R4/R7); the cel-slam on the SHIPPED `.scroll-build` mount-clock as PRIMARY (the
   `--i` 1/φ overlap stagger that ACTUALLY works on a time clock), `view()` `@supports`-gated for
   below-fold scroll-reveal ONLY (R2/R3/#3-R1); the concentric-radius matrix cells
   (`BD.W-CONCENTRIC-RADIUS`). All easing/weight/cast/shadow tokens are DEPENDS (var() with the spike
   literal as a fallback ONLY while the sibling is unlanded — a presets-in-consumer override pins the
   warm cast magnitude per `--motion-weight`, never re-mints the token).

3. **the `field`/`palette` prop wiring at `AppShell.vue:251`** (NET-NEW, ~2 lines). Grow the
   page-background sibling's `field`/`palette` prop on the ALREADY-mounted `<PaperBackdrop>`, fed
   `warmFieldHue(categoryHue(currentCategory))` (the sibling's adapter). ONE writer → all 118 routes
   inherit the warm field. **This is the demo-side host the page-background GOLDEN §2b names** — the
   per-route MOUNT (the field PRIMITIVE + the `warmFieldHue` adapter are the sibling's; this is the
   mount that consumes them).

The five sub-types as LAYOUT presets of ONE frame (the ONLY thing that differs per variant):

| sub-type | `variant` | internal layout | for |
|---|---|---|---|
| **`DemoFrame variant="stage"`** | `stage` | the φ²-bleed (HOISTED, no cqw) hosting a `VizStudio` engine (union, R8) + the `Configurator asideSide="right"` 1/φ² rail | substrates · dock overview/morph |
| **`DemoFrame variant="specimen"`** | `specimen` | a state row (rest/hover/active/disabled) in one glassy plate + caption | display · forms · feedback |
| **`DemoFrame variant="interaction"`** | `interaction` | the live control + a readout driving the real API | dock sections/cta · containers |
| **`DemoFrame variant="matrix"`** | `matrix` | a `grid` of concentric-radius glassy cells, each slamming on the `--i` overlap stagger (the grid ripples in on the MOUNT clock) | buttons/badges · data |
| **`DemoFrame variant="composition"`** | `composition` | a glassy stage composing a SERIES of glass-ui components | compositions · navigation |

**The dup-kill / reconcile (no overlap with the three on-disk page waves).** The golden proposed
FOLDING `BD.W-PAGE-CHASSIS` + `BD.W-PAGE-BACKGROUND` into `W-STORY-PAGE-STANDARD` as arms. The union
REJECTS that fold as duplicative against the on-disk 116-set: `BD.W-PAGE-CHASSIS` (header rule +
double-header fold + heading re-key — already specced + gated) and `BD.W-PAGE-BACKGROUND` (the
field-map + the `BD.W-PAGE-FIELD`/`BD.W-FIELD-SCRIPT`/`BD.W-FIELD-AURORA-RECONCILE` deliverables the
page-background sibling already authored) STAY AS THEY ARE. `W-STORY-PAGE-STANDARD` is AUGMENTED to
own ONLY its unique territory — the `<DemoFrame>` sub-type spine + the cel-slam + the universal field
MOUNT + the φ² stage — and it DEPENDS on the other two (it consumes the header fold + the field
primitive, it does not re-author them). Three disjoint waves on the same chassis, each owning one
axis — exactly the BD.W-PAGE-CHASSIS "four disjoint edits on the same chassis" precedent.

---

## 3 — THE BUILD-DAG (the HARD ordering edges the union states explicitly)

`W-STORY-PAGE-STANDARD` (the chassis) is GREEN-on-paint ONLY after these land (each grep-confirmed 0
in `src/`/`demo/` this session):

| depends on | deliverable consumed | gate clause that ERRORS-on-absence until it lands |
|---|---|---|
| `BD.W-PAGE-FIELD` (page-background) | `@utility paper-field` + `@property --field-h` (CSS-clamped warm) | S2 (field-behind-glass), S8 (dark warm) |
| `BD.W-FIELD-SCRIPT` (page-background) | `warmFieldHue(categoryHue(id))` adapter | S2, the per-route hue |
| `BD.W-FIELD-AURORA-RECONCILE` (page-background) | `<Aurora field>` reads `--field-h` (the rung-1 amplifier) | the stage substrate amplifier |
| `BD.W-CARTOON-PUNCH` (motion-spring) | `--ease-cartoon-punch` | S6 (the punch arc) |
| `BD.W-MOTION-WEIGHT` (motion-spring) | `--motion-weight` (co-scales squash/overshoot/cast lag) | S6 (the proportioned deform) |
| `BD.W-CARTOON-CASTER` (cartoon-shadow) | the inert `.cartoon-cast` child + its cross-engine fences | S6 (the lagging cast) |
| `BD.W-PAGE-CHASSIS` (on disk) | `--story-header-rule` + the 36-file double-header fold + `label→heading` | S5 (one title) |

The born-RED gate (§6 GOLDEN) MUST assert these DEPENDS EXIST before S2/S6/S8 are evaluated, else
those clauses fail-on-absence (a false-RED that hides the real RED). S6 (the punch + cast) is
CONDITIONAL on the motion-spring + caster deps; S2/S8 CONDITIONAL on the field deps. The chassis's
OWN born-RED (independent of siblings): 0 `_chassis/`, the 1152 stage cap, the `<slot>`-drop on the
re-exports (excised), the `cqw` bleed (excised). Those are RED on HEAD by THIS chassis's construction.

---

## 4 — STRUCK from `./GOLDEN.md` (folded by this assay — read this as the binding correction)

The GOLDEN's IDEA is the reference; these specific claims are SUPERSEDED by the union above:

1. **the five `(p) => h(DemoFrame, {...p})` re-exports** (§2a `index.ts`) — DROP SLOTS, broken (R1).
   EXCISED: pages write `<DemoFrame variant>` directly; `index.ts` is not authored.
2. **the `ShowcaseFrame tier="field"` → `Card` 3-deep nest** (§2a template) — redundant bolt-on the
   spike itself contradicts (R2). REPLACED by `<Card tier>` + a sibling caption div.
3. **`margin-inline: calc(50% - 50cqw)` + the `cqw`/container bleed** (§2c) — un-spiked, needs a
   `container-type` context this repo removed (R4/R7). REPLACED by the HOISTED fixed-width stage.
4. **`animation-timeline: view()` as the PRIMARY load entrance + `animation-delay` stagger on it**
   (§2d) — misses above-the-fold (R2), absent on the Safari installed base (R3), the delay is a no-op
   on a view timeline (#3-R1). REPLACED: `.scroll-build` mount-clock PRIMARY, `view()` scroll-reveal
   enhancement only.
5. **the `::after { box-shadow: var(--shadow-cartoon) }` cast carrier + the spike's re-minted warm
   `--shadow-cartoon`** (§2d) — `::after` is a forbidden WebKit-hole carrier + a re-mint of a shipped
   token (#3-R6, glass-atoms precedent). REPLACED by `BD.W-CARTOON-CASTER`'s `.cartoon-cast` consume.
6. **"`--ease-cartoon-punch`/`--motion-weight`/`--shadow-cartoon` are DEPENDS (shipped tokens)"**
   (§2d) — two are 0-in-`src/` sibling-golden deps, one is a shipped neutral hairline (R3). RELABELED
   as the explicit build-DAG in §3 above; the warm cast value is a presets-in-consumer override.
7. **"FOLD `BD.W-PAGE-CHASSIS` + `BD.W-PAGE-BACKGROUND` INTO `W-STORY-PAGE-STANDARD`"** (§3) — a
   duplicative fold against the on-disk 116-set (R8 blast-radius). REPLACED: three disjoint waves,
   `W-STORY-PAGE-STANDARD` DEPENDS on the other two.
8. **"RE-EXPRESS `VizStudio` as `DemoStage` (retire the parallel)"** (§3) — under-specced capability
   drop (R8). REPLACED: `variant="stage"` RENDERS VizStudio internally (a union, not a fold).
9. **the spike's monochrome single-`--field-h` amber field + the S2 single-hue [25,95] band** (§8,
   §6 S2) — under-delivers the §3 polychrome-field-plus-edge + codifies the weakness (R5/#3-R3).
   DEFERRED to the page-background field wave's hardening (already folded there: the `warmFieldHue`
   spread + the chroma-preserving `oklch(… / 0)` end-stops + an S-edge raster bite).

Born-RED is GENUINE (live: 0 `_chassis`, 1152 cap, 0 fields C 0.0029, double-header, header-rule
unset). The warm-cel MECHANISM is FIT. REFINE the design, RE-INVENT the broken mechanism, CITE the
sibling field/motion/caster deps — never re-mint them.

---

## 5 — CONVERGENCE

**Union verdict: REFINE-dominant** (the box-inversion + one-DemoFrame + φ²-stage + universal-field
gestalt SURVIVES intact and is DRY-er than the status quo) **with ONE RE-INVENT** (the broken
slot-dropping re-exports → direct `<DemoFrame variant>`) **and TWO mechanism RE-INVENTS** (the `cqw`
bleed → hoisted fixed-width stage; the `view()`-primary entrance → `.scroll-build` mount-clock
primary). **~72% converged.** Remaining 28% = build-time, BLOCKED on the 7 sibling DEPENDS (§3): the
`<DemoFrame>` single-box chassis + the hoisted φ² stage + the mount-clock cel-slam consuming
`.cartoon-cast` + the universal field mount consuming `warmFieldHue`/`paper-field` + the VizStudio
union-render + the per-category migration (staged, not one flip) + the painted paired-engine RASTER
π (both modes, above-fold load build, the cast-lag frame-series).
</content>
</invoke>
