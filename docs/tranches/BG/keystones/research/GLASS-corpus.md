# KS-GLASS — CORPUS grounding (LANE GLASS · researcher)

> The disk-true current state of every F2-wave touchpoint + what the greenfield GOLDENs already
> DECIDED, so the KS-GLASS author never re-derives. Written for KS-A. Read-only sweep; every claim
> carries a `file:line`. HEAD `fa6ed40a` (branch `tranche/BG`).
>
> **The lane's plan waves (FROZEN ids, EXECUTION-PROGRESS.md §1):**
> 3.5 `W-GLASS-REGISTER-UNIFY` (F2 tentpole) · F2.1 `W-GLASS-DEFAULT-DEFINITION` (row 3.13) ·
> F2.2 `W-GLASS-BASIS-CONSOLIDATE` (row 3.14) · F2.3 `W-DEEP-GLASS-DECIDE` (row 3.15) ·
> 13.2 `W-GLASS-REFRACT-WEBGL` (C-SAFARI Tier-1 · P) · 3.10 `W-GLASS-DYNAMICS` · 0.7 `W-DOCK-BLUR-RETIRE-CARVE`.
>
> **R9 (RULINGS-PASS2.md:57-65) is the spine of the family:** the tint-recipe home has ONE owner
> (`W-GLASS-REGISTER-UNIFY`) and ONE mechanism (the applied `@utility glass-fill`). BASIS-CONSOLIDATE
> keeps its OTHER moves and does NOT touch the recipe home; `UNIFY ∈ preconds(BASIS-CONSOLIDATE)` and
> `UNIFY ∈ preconds(DEFAULT-DEFINITION)` (both compose the factored recipe).

---

## 0. THE ONE-SCREEN SUMMARY (what the author must internalize)

1. **The gestalt disease the whole family cures (BD glass-material GOLDEN §0, RESPEC B4):** *glass is a
   RELATIONSHIP, not a color.* A warm plate over a flat cool page composites to gray. BD's three-leg
   diagnosis: **(a) warm the plate — LANDED, FROZEN** (`--card`/`--glass-saturate-*`/dark arm);
   **(b) a colorful FIELD behind the glass** — the F1 lane (`W-FIELD-AURORA` LANDED, §2.2 ledger);
   **(c) a DEFINED EDGE** — **F2.1's job** (`W-GLASS-DEFAULT-DEFINITION`, the 0.0138-chroma near-gray
   control fix). The KS-GLASS author's central design act is legs (b)+(c) reaching the CONTROL cohort.
2. **The elegance disease (B4-css-elegance.md):** the CSS is *accreted epicycles, not an orthogonal
   basis* — ONE tint recipe hand-spelled 9×, THREE overlapping "the ONE register" primitives
   (`.glass-atom`/`.glass-chip`/`.glass-capsule`) worn 2-3-at-once by single components, 39
   dead/ceremony tokens, dual-authored dark colors, a half-done goo-DRY + refract→lens rename. **F2.2
   `W-GLASS-BASIS-CONSOLIDATE` is the transposition to an orthogonal basis** (zero-pixel — any drift is
   a finding).
3. **The C-SAFARI chronic (★★★, 3-tranche):** the refraction FLOOR. The RESPEC correction re-points
   the fence onto `uChromatic`; the COHERENCE audit (F1) found the on-disk shipped uniform is
   `chromatic_aberration` (glassShader.wgsl:13). **13.2 must reconcile the two, NOT re-derive.**
4. **The 5-tranche deep-glass chronic:** ridden BB→BG on a `profile:budget` clearance nobody ran.
   **F2.3 ends it with a NUMBER — land-at-20px OR retire-at-16px-with-recorded-cost, never `booked`.**
5. **The protected set (SYNTHESIS-PASS1 §4, INVIOLABLE):** the `--glass-level`/`--glass-depth`
   composition + the six-layer composite · the warm HSL identity values, alpha ladders (0.30/0.50/0.65/
   0.80/0.95 light), dark legendre-violet, `in srgb` surface-tint fence, φ constants · `createCanvasLifecycle`.
   Byte-identical. The family PERFECTS the plumbing UNDER these, never the identity values.

---

## 1. THE AS-BUILT GLASS CASCADE (disk truth, cite line numbers)

**Scale (B4-css-elegance.md:10, re-verified this pass):** 99 CSS files · 22,334 lines · 1,069 `--token:`
definitions · 60 `@property` regs · 351 `color-mix()` (183 `in srgb` / 96 `in oklab`). `src/styles/glass/`
holds 18 files; `src/styles/tokens/glass*.css` holds 3.

### 1a. File inventory + line counts (the no-god-module bound is 500)

| file | lines | role | >500? |
|---|---|---|---|
| `glass/ladder.css` | **527** | 5-tier ladder + W55 bright bucket + content-tier tint re-point + contrast-color flip + opaque escape + under-shadow + grain `::after` | **YES — 0.7 carve target** |
| `glass/surfaces.css` | 420 | `.glass-card`/`.glass-pill`/`.glass-btn` + `.btn-glass` + `--glass-bg-*-tinted` mints + `.glass-pager-ring` + chromatic fringe | — |
| `glass/material.css` | 370 | the moving specular `::before` core + dock-control gleam + `surface="clear"` scrim | — |
| `glass/liquid-morph.css` | **850** | demo-only (import `demo/demo.css:125`) but library-consumed — the F8/A-glass-token-arch F8 smell | **YES (not our lane)** |
| `tokens/glass.css` | 424 | §8 ladder: per-tier alpha + blur + saturate + composed bg/border + control REST + the 4 `@property` fill/ambient axes | — |
| `tokens/glass-fx.css` | 458 | decorative tail: grain/specular/edge-light + `--glass-key-lit/shade-x/y` + tint-source/backdrop-luma + shadow/spine/scrim | — |
| `tokens/glass-deep.css` | 104 | the `--glass-blur-deep-*` family (F2.3 target) | — |
| `glass/glass-capsule.css` | 143 | `.glass-capsule` / `-track` / `-hover` (BD, LANDED) | — |
| `glass/glass-atom.css` | 244 | `.glass-atom` register (BD, LANDED — F2.2 merge target) | — |
| `glass/glass-chip.css` | 215 | `.glass-chip` register (BD, LANDED — F2.2 merge target) | — |
| `glass/deep.css` | 44 | `.glass-deep` decoration (token-sub) | — |
| `glass/rim.css` | 122 | `--glass-material-rim` + `--glass-border-accent` (SOLE writer) | — |
| `glass-refract.css` (top-level `src/styles/`, NOT `glass/`) | ~250 | the `#glass-refract` SVG lens (F2.2 refract→lens rename; the DEV-C path `glass/glass-refract.css` is STALE) | — |
| `dock/shell.css` | **510** | dock shell (0.7 carve → `dock/shell-regions.css`) | **YES (F3-neighbor; 0.7 owns)** |

### 1b. The `--glass-level` seam (PROTECTED — the ONE compose recipe, `tokens/glass.css:267-284`)

Each tier bg is `color-mix(in srgb, var(--card) calc((1 - (1 - <rung-α>) * --glass-level) * 100%), transparent)`
(glass.css:273-277). `level=1`→byte-identical hand-tuned α; `level=0`→solid `--card` (the `.glass-opaque`
escape, ladder.css:414); `level>1`→clearer. The blur radii scale by the same scalar (glass.css:143-158).
**This is byte-frozen** (SYNTHESIS §4). Every F2 wave threads it, none re-plumbs it.

The per-tier **alpha** (glass.css:54-58) `wash 0.30 / quiet 0.50 / resting 0.65 / floating 0.80 / overlay 0.95`
is the canonical named register (BB.W-CARD-TIER-ALPHA); the **saturate** (glass.css:124-128) `wash/quiet/
resting 1.4 · floating/overlay 1.6` is the load-bearing knob (apple.com nav rides saturate high). Both are
IDENTITY — protected.

### 1c. The FIVE chromatic tint axes (the F2.2 collapse target — A-glass-token-arch.md F4)

| axis | tokens | role | mix | disposition |
|---|---|---|---|---|
| legibility darken | `--glass-tint-source` + `--glass-tint-strength` (glass-fx.css:157-158) | whole-plate AA darken | `in oklab` | **KEEP (the ONE plate axis; R9's recipe home)** |
| rim accent | `--glass-accent` + `--glass-accent-strength` (property-regs.css) | rim + `::before` core | `in oklab` | **KEEP (the ONE rim axis)** |
| plate fill | `--glass-fill-tint` + `--glass-fill-strength` (glass.css:411-424) | plate BODY→data hue | `in oklab` | **FOLD onto plate pair (F2.2 step / DEV-C)** — 6 consumers (icon-chip, glass-atom, glass-chip, badge, selectable-chip, IconChip) |
| ambient hue | `--glass-ambient-hue` + `--glass-ambient-strength` (glass.css:391-405) | sampled backdrop bias | `in oklab` | **RETIRE — inert (F5): `--glass-ambient-strength` is WRITTEN NOWHERE** (only the `@property initial 0%`); the hue is `× 0%` → paints nothing (A-glass-token-arch F5) |
| luminance bucket | `--glass-backdrop` + `--glass-backdrop-luma` (glass-fx.css:219) | discrete/continuous trigger | — | KEEP (geometry trigger, not chroma) |

Three of these (`tint-source`, `fill-tint`, `ambient-hue`) are the SAME op `color-mix(in oklab, <plate>,
<hue> <strength>)` at three nominal layers — `liquid-morph.css:34-35` literally feeds `--glass-ambient-hue`
INTO `--glass-tint-source`, proving the collapse. **Non-chroma geometry scalars (`--glass-level`,
`--glass-depth`) are DISJOINT and PROTECTED.**

### 1d. The tint-recipe substitution trap (F2.2 step 1 / R9 — the STRUCTURAL fix)

The opacity axis is composed ONCE at `:root`; the TINT axis is applied at TWO cascade layers depending on
which `--glass-bg-*` you read (B4-css-elegance F1). Named-surface bgs bake the tint at `:root`
(`--glass-bg-dock` glass.css:283, `-dialog` :293, `-sheet` :302, `-clear` :309); the five tier bgs do NOT,
so every tinted-tier surface RE-SPELLS the oklab wrapper inline. Disk truth this pass:
- **`--glass-plate-tinted` is already factored ONCE** (ladder.css:67-72, BG.W-GLASS-IDIOM-FACTOR LANDED,
  `6ec81de`) — the 5-rung ladder reads `background: var(--glass-plate-tinted)`.
- **BUT `--glass-bg-floating-tinted`/`--glass-bg-quiet-tinted` are STILL minted separately** on the shared
  `:where(.btn-glass, .segmented-indicator, .glass-capsule)` (surfaces.css:291-297) + `.btn-glass`
  (:306-311) — these are the "`--glass-bg-*-tinted` duplicate tokens" R9 DELETES.
- Total `*-tinted` references on disk: **9** (2 declarations at surfaces.css:292/306 + 7 reads). This IS the
  "9 inline re-spells" R9 counts (the re-spells are the READS + the two duplicate decls). **CLAUDE.md
  records the fallout FOUR times** (dock morph-root, vertical dock plate, button register, on-glass-fg) —
  the tell of an inelegant basis (B4 F1).

**R9's mechanism (the STRUCTURAL kill):** an applied `@utility glass-fill` composed at the ELEMENT so
overriding a tint input on any scope re-composes automatically — there is then NO second layer to read the
wrong token from (the trap is impossible, not re-documented). Owner: `W-GLASS-REGISTER-UNIFY` (3.5).

### 1e. The `--glass-key-*` spine (BD.W-GLASS-KEY-EDGE, LANDED — a COHERENCE trap for F2.2/F4)

The library ALREADY encodes the cel key-light as a FOUR-component per-axis SIGN family:
`--glass-key-lit-x: -1px` / `--glass-key-lit-y: 1px` / `--glass-key-shade-x: 1px` / `--glass-key-shade-y: -1px`
(glass-fx.css:114-117). The rim reads them DIRECTLY (rim.css:81-93; dark-arm.css:412-416). **The
design decision is RECORDED VERBATIM (glass-fx.css:106-109):** the key is expressed as PLAIN per-axis sign
tokens, **NOT** as a `-58deg` angle with sign-inverted `cos()/sin()` trig (the glass-material sign-trap,
"banned here"). **COHERENCE F7 [HIGH]:** any wave that mints a single `--glass-key-direction` AZIMUTH
re-opens the banned trap AND desyncs the rim (which still reads the 4 tokens) — the dead-knob class. The
KS-GLASS author must NOT introduce an azimuth; the 4-token family is canonical. (This is the F4 paper lane's
GU-1 collision, but it touches the glass rim, so the KS-GLASS spec should record the fence.)

Note the BD glass-material GOLDEN §4 proposed `--glass-key: -58deg` (the angle). **That is SUPERSEDED by
the landed per-axis token family** — the GOLDEN's INTENT (rim + cast agree on one key = a 1940s cel) is
kept; its MECHANISM (the angle) was rejected on landing. The KS spec cites the landed 4-token form.

---

## 2. WHAT THE GREENFIELD GOLDENs ALREADY DECIDED (build on; never re-derive)

### 2a. glass-material GOLDEN (`BD/greenfield/glass-material/GOLDEN.md`) — THE lens

- **The relationship framing (§0):** the three-leg fix. Leg (a) LANDED+FROZEN. Leg (b) FIELD = the F1
  lane's `W-FIELD-AURORA` (LANDED). Leg (c) EDGE = **F2.1**.
- **The 7-tier / 6-layer composite (§2):** vocabulary byte-untouched. Layer-0 = the FIELD; layer-3 = the
  edge rim (REFINE→directional keyed); layer-5 = the cast (re-base on the key). The alpha/radius/tint
  ladders are byte-untouched — no new tier.
- **The `--glass-key` cel (§4):** ONE key-light → directional conic rim + coherent warm cast (rim + cast
  agree = a 1940s cel). **LANDED as the 4-token per-axis family** (§1e above) — the KS spec cites the
  landed form, not the GOLDEN's `-58deg`.
- **The transmissive read (§5):** generalize the ambient-hue sample past the dock. **On disk this axis is
  INERT (F5 — `--glass-ambient-strength` never written).** The GOLDEN's §5 generalization is UNBUILT; F2.2
  RETIRES the inert axis (DEV-C: "if a future ambient-hue is wanted, the observer writes the plate pair, no
  new axis"). The KS author decides: retire (the RESPEC ruling) vs revive-and-wire. **RESPEC ruling wins —
  retire; the transmissive read is delivered by the FIELD (leg b) + the plate saturate, not a 5th axis.**
- **Cross-engine (§6/§7):** every leg is Chrome+Safari native — `conic-gradient` border + `mask-composite:
  exclude`/`-webkit-mask-composite: xor` + `box-shadow` + `backdrop-filter: blur() saturate()`. NO
  `backdrop-filter: url()`, NO SVG goo in the MATERIAL path (the goo stays the dock-fission viz). The
  spike (`golden/spike.html`) proved paper-field + keyed rim + transmissive read + `CSS.supports`.
- **The gate (§8):** extend `proof:no-gray` to the RELATIONSHIP — F1 field-warmth, F2 composite-over-REAL-
  field ≥0.018 warm, F3 defined-edge, F4 no-flat-glass (structural). **This is the born-RED shape F2.1's
  `defined-control-floor` + the paint battery `proof:warm-identity` inherit.**

### 2b. buttons GOLDEN (`BD/greenfield/buttons/GOLDEN.md`) — the CONTROL cohort truth

- **The single golden idea:** the button system owns NO material — a `<Button>`, a `.glass-btn`, a
  `<DockIconButton>` become consumers of the ONE `.glass-capsule` + `.glass-capsule-hover`. The gray fill
  dies ONCE at the source for buttons AND tabs AND dock-tabs together.
- **The measured defect (§0):** `default` Button rest fill `oklab(0.881 0.0054 0.0127 / 0.328)` →
  **chroma 0.0138 = NEAR-GRAY** (the same disease as the tabs capsule 0.0128); root cause
  `--glass-tint-strength: 0%` at `:root` (the warm-admit seam DORMANT at rest — it is the ambient-darken
  knob, not a warmth FLOOR). **This is the F2.1 born-RED witness verbatim.**
- **The resolution:** the warm-floor `.glass-capsule` fill over a colorful field (compose the tint seam at
  a nonzero floor) + `.glass-capsule-hover` (specular bloom + 1.5% scale lift) + `.btn-punch` (the ONE new
  opt-in cartoon-punch tier, hero-only). **The spike (§9) verified GREEN both modes: rest fill meanChroma
  light 0.039 / dark 0.031 (> 0.02), hover scale 1.015 + specular 0→0.14, press area ≤1.14.**
- **What LANDED (disk):** `.glass-capsule`/`-track`/`-hover` (glass-capsule.css) all ship; `--glass-blur-btn`
  is the unified 8px resting peer (glass.css:188); the hero `.btn-glass.glass-deep` re-points to
  `--glass-blur-deep` (surfaces.css:233). **What is NOT yet landed:** the WARM-FLOOR at rest on the
  CONTROL default over a flat page — the F2.1 job. `.glass-capsule`'s fill DOES compose a warm floor
  (`--glass-capsule-warm var(--glass-capsule-warm-floor 16%)`, glass-capsule.css:56-63) but only capsule
  consumers get it; a bare `<Button>` over a flat page still reads the 0.0138 near-gray (the F2.1 gap).

### 2c. glass-atoms GOLDEN (`BD/greenfield/glass-atoms/GOLDEN.md`) — the register-merge context

- **ONE recipe, four consumers, ZERO per-atom fork** (all three lenses converged). Badge + metric-badge +
  Slider + IconChip + StackedIcons all consume ONE `.glass-atom`. **LANDED** (glass-atom.css:223-225 shows
  `.badge-atom--glass[data-variant]` binding `--glass-fill-tint`).
- **F2.2's problem it feeds:** `.glass-atom` COMPOSES `.glass-capsule` (A-glass-token-arch F6 — the capsule
  is NOT a 4th body dialect, it is a positive unification). BUT the per-instance TUNING is re-pasted per
  register: tint floor `12%/15%` in `glass-atom.css:47,76` AND `glass-chip.css:82,140`; press squash
  `scale: 1.04 0.94` in glass-atom.css:86,182 + cards.css:339; `--motion-weight:1` in 4 sites; the
  `oklch(0.9 0.05 75 / 0)` warm-zero stop re-typed in 5 sites. **F2.2's DRY job** (DEV-C step 6 / B4 FC2):
  merge the 3 registers → ONE `.glass-surface` basis with modifiers (`--atom`/`--chip`/`--capsule`).

### 2d. cards GOLDEN

Not the KS-GLASS lane's primary (F6/F7), but the `.cartoon-cast` child (cards.css:359) is R5-PROTECTED
LIVE — 3.3 `W-GLASS-CLIP-DISCIPLINE` deletes ONLY the DOCK cast (`dock/shape.css:208-249`), keeps
`cards.css:359`. The KS-GLASS author should not touch the cast.

---

## 3. PER-WAVE TOUCHPOINTS (disk-true, ready-to-spec)

### 3.5 `W-GLASS-REGISTER-UNIFY` — the F2 TENTPOLE (R9 owner)

**Absorbs** 3.4 (Safari-blur clause) + 3.8 (consumer-band) + 3.9 (dock-AA) + 3.11 (`.liquid-pill` M5a) +
the 3.6 landed seed. **Scope (AMENDED-GESTALT-PLAN:64, build-map:69-71):**
- **OWNS the tint-recipe home (R9):** mint the applied `@utility glass-fill` element-level compose;
  **DELETE `--glass-bg-floating-tinted`/`--glass-bg-quiet-tinted` (surfaces.css:292/306) + the 9
  re-spells** (clean break, no `-tinted` token register survives).
- one-8px blur register (the 3.6 blur-peer already LANDED: `--glass-blur-resting-radius: 8px` glass.css:88,
  `--glass-blur-btn` alias glass.css:188, dock reads `--glass-blur-resting` shell.css:29).
- migrate the 6 `--glass-fill-tint` consumers + the 3 chromatic pairs.
- Safari `blur(var())` webkit assert (the `blur(calc(var() * var()))` chain must survive Lightning dedup).
- **gate arm:** `proof:glass` foundation A1 + `glass-fill-single-recipe` (exactly ONE `color-mix(in oklab,
  …glass-tint…)` authoring site; born-RED on the current 9; a 2nd inline re-spell self-test → RED) +
  Safari-webkit + AA arms. Paint: glass-band 5 tiers + bright bucket, both modes.
- **preconds:** none listed (0.7 + 3.6 landed). It PRECEDES F2.1 + F2.2 (both compose the factored recipe).

**Disk state:** `--glass-plate-tinted` factored ONCE (ladder.css:67 — the 5-rung ladder) is the LANDED
half; the `-tinted` DUPLICATE tokens (surfaces.css) are the un-factored residue this wave kills. The
`@utility glass-fill` does not exist yet.

### F2.1 · row 3.13 · `W-GLASS-DEFAULT-DEFINITION` (NEW-C, CRITICAL — the co-equal-top root)

**The question (DEV-C:59-63):** AX.W54 made glass maximal but the blur is imperceptible over a FLAT page,
so a bare `<Button>`/`.input-pill` reads as a near-gray shape with NO edge (BC default rest fill oklab
chroma **0.0138**). This is the DOMINANT user frustration and no other BG wave carries it.

**Gestalt (transposition, NOT a patch, NOT a fork — DEV-C:65-84):** split glass into TWO registers on the
ONE existing `--glass-level`/edge machinery:
- **transmissive** (today's maximal glass) — DEFAULT for surfaces WITH a colorful backdrop. Unchanged.
- **defined** — a `.glass-defined` decoration (the `.glass-opaque`/`.glass-deep` token-sub precedent — NOT
  a competing `backdrop-filter`) composing three things the material already owns:
  (a) a stronger rim — a `--glass-border-defined` alpha rung (lifts the warm hairline to a read-carrying
  edge; NOT the ≤5% content hairline at glass.css:342-346);
  (b) a **`--glass-floor-fill`** warm-cream minimum backplate (`color-mix(in srgb, var(--card) ~15%,
  transparent)`) composited UNDER the transmissive fill so the plate has a floor even at
  `--glass-tint-strength: 0%` over white;
  (c) the W-BUTTON-GLASS lit register (specular + `--glass-btn-*` depth stack, surfaces.css:205-215) —
  ALREADY shipped.
- `--glass-definition` = a typed inheriting `@property <number>` (default `0`=transmissive, `1`=defined) in
  `property-regs.css`; `.glass-defined` sets the calibrated control value.

**The DEFAULT flip:** the control cohort — Button glass variants, `.input-pill` (Input/Textarea/
NumberField), `.control-surface` (Select), the chip family, `.glass-menu-row`, dropdown triggers — compose
`.glass-defined` BY DEFAULT. Content stays transmissive.

**deliverables (DEV-C:86-95):** `glass/defined.css` (new) · register `@property --glass-definition` ·
mint `--glass-floor-fill` + `--glass-border-defined` in glass.css (transmissive `--glass-bg-*` BYTE-
UNTOUCHED) · re-point the control cohort · dark arm in `dark-arm.css`.
**gate arm:** `defined-control-floor` — a default `<Button>`/`.input-pill`/`SelectTrigger` over a synthetic
FLAT white page with `--glass-tint-strength:0` resolves a floor-fill α ≥ threshold AND a rim ΔL clearing
the legibility floor; born-RED on the 0.0138 witness. **Negative arm:** a content `.glass-card` with NO
`.glass-defined` still resolves the transmissive fill unchanged (no bleed). + 3-bite self-test.
**preconds:** `W-FIELD-AURORA` LANDED (gives transmissive glass a field) + **UNIFY (3.5)** (composes the
factored recipe — R9 sequences F2.1 AFTER UNIFY so `--glass-floor-fill` composes through it).
**Disk state:** `--glass-floor-fill`/`.glass-defined`/`@property --glass-definition` = **0 declarations on
disk** (all NEW). The BD glass-material GOLDEN §4's keyed rim + §8's F3 defined-edge arm are the design
grounding; the buttons GOLDEN §0 is the born-RED witness.

### F2.2 · row 3.14 · `W-GLASS-BASIS-CONSOLIDATE` (NEW-C, CRITICAL — zero-pixel transposition)

**Gestalt (DEV-C:125-172, B4 FC1-FC6):** collapse the accreted epicycles to an orthogonal basis. **SIX
sub-moves, ONE wave** (they all touch `glass/` + `tokens/`; splitting re-fragments the concern). **Does
NOT touch the recipe home (R9 — that is UNIFY's).**

1. *(the applied-recipe half is R9/UNIFY's)* — F2.2 does NOT re-own it; DEV-C:136 lists it but R9 moved
   the recipe home to UNIFY. F2.2's role here is the DOWNSTREAM cleanup (the named-surface bgs fold onto
   the ONE recipe UNIFY minted).
2. **Merge 3 small-glass registers → ONE `.glass-surface` basis** with intent modifiers (`--atom`
   loud/opaque · `--chip` toggle-punch · `--capsule` lifted-lozenge). Retire `glass-atom.css` +
   `glass-chip.css` (clean break); re-point the ~15 consumers. A component composes EXACTLY one register +
   a modifier, never two. **Disk: 35 files reference glass-atom/chip/capsule** (grep); the OVERLAP is real
   (B4 F2: TagsInputItem = capsule+chip; Slider = capsule+atom; Badge = capsule+atom; toggle-chip/
   selectable-chip = capsule+chip).
3. **Kill the dark COLOR dual-arm** (B4 F4): delete the ~60 duplicate COLOR decls from `dark-arm.css`;
   colors resolve via `light-dark.css` ONLY. `dark-arm.css` keeps ONLY shadow/inset arms. **The rule:
   one mechanism per token TYPE** — colors→`light-dark()`; shadows/insets→`.dark {}`. **R16 MN-1: records
   the idiom REVERSAL as intentional + a no-color-feeds-inset bite** (the light-dark inset-shadow-trap
   MEMORY is the exception the split PRESERVES).
4. **Dead-token sweep** (B4 F3 — 39 tokens): the 9 goo/worm orphans (`--pager-worm-*`/`--deck-goo-*`/
   `--carousel-goo-*` in scheme-spring.css — the live worm drives via JS `--worm-t`/`--stretch`),
   `--search-result-text-secondary`, `--glass-spine-blur/-opacity`, + the ~29 gate-only tokens AFTER
   **F8.5 `W-TOKEN-MANIFEST`** confirms zero live channel. Delete the gates whose SOLE job is to assert a
   deleted token.
5. **Finish the two half-renames** (B4 F6/F7): collapse the 5 byte-identical `#*-goo` filter IDs →
   `#glass-goo` (**disk: `#glass-goo`, `#pager-goo`, `#dock-fission-goo`, `#morph-goo`, `#dock-morph-goo`
   all still referenced** — morph-field.css:79/83, fission-bridge.css:111/113, useGooMorph.ts:8/50). Complete
   `.glass-refract`→`.glass-lens`: **the file is `src/styles/glass-refract.css` (NOT `glass/glass-refract.css`
   — the DEV-C:160 path is STALE)**, the SVG id `#glass-refract` (useGlassRenderer.ts:155,
   glass-specular-track.css:22-24), the token `--glass-refract` all still live.
6. **`--goo-*` root register** (B4 FC6 half): ONE `--goo-{flow, stretch-cap, duration}` root register;
   carousel/deck/pager/dock/tab consume with per-surface overrides.

**NOTE — deliberately NOT in this wave (DEV-C:167-172, protected):** the `--glass-level`/`--glass-depth`
geometry, six-layer composite, warm HSL identity values, alpha ladder, `in srgb` fence, φ constants — all
BYTE-IDENTICAL. The single-`@layer components`→explicit-layer-stack move (B4 FC5) is **KEEP-BOOKED** (a
larger cascade-basis move; NOT zero-pixel; would over-scope).
**gate arms:** `glass-surface-single-basis` (no component composes ≥2 of {atom,chip,capsule}) ·
`dark-arm-disjoint` (`.dark{}` color ∩ `light-dark()` = ∅; born-RED on the 60-overlap) · `goo-id-single` ·
clean-break-residual (every retired token → 0 residual `var()`).
**paint:** `tests-visual/glass-basis.spec.ts` — computed colors byte-identical to the pre-wave `no-gray`/
`dark-material` π ground (any pixel drift is a finding).
**preconds:** **F8.5 `W-TOKEN-MANIFEST`** LANDED (step 4 confirm) + dead-cut LANDED (goo/worm JS sole live
path) + **UNIFY (3.5) ∈ preconds (R9)** — F2.2 lands BEFORE F2.1 in the same neighborhood (INVERTED per
F2.1's precond note, so `.glass-defined` composes the factored recipe).

### F2.3 · row 3.15 · `W-DEEP-GLASS-DECIDE` (NEW-C, MEDIUM — end the 5-tranche chronic with a number)

**Gestalt (DEV-C:209-224):** `.glass-deep`/`--glass-blur-deep` sits at 16px/saturate — the Apple 20px/1.8
ceiling "BOOKED" since BB, ridden BB→BC→BD→BE→BF→BG on a `profile:budget` clearance nobody ran. **End it
with a MEASUREMENT, not a 6th re-book.**
**deliverables (a decision + one of two outcomes):**
- RUN `profile:budget` with `--glass-blur-deep` at 20px / `saturate(1.8)` on the deep tier's REAL per-frame
  cost.
- **Clears** → land the two-token bump (glass-deep.css deep radius 16→20; the deep dark arm saturate re-checked).
- **Does NOT clear** → RETIRE-with-recorded-number (16px IS the ceiling; delete the "BOOKED" comment,
  record the measured cost). Either way the chronic TERMINATES.
**gate arm:** `deep-glass-decided` — the glass-deep.css header carries a TERMINAL verdict (`landed-20px` OR
`retired-at-16px-cost-N`), never `booked`; a synthetic `booked` REDs (the `proof:nda-decided` terminal-lock shape).
**Disk state / DOC DRIFT (COHERENCE clean-note):** glass-deep.css already reads **`--glass-saturate-deep: 1.8`
+ `-ceiling: 1.8`** (:58-64, lifted 1.5→1.8 by BD.W-GLASS-ABROGATE-GRAY) — so the SATURATE half already
landed at 1.8. **Only the BLUR RADIUS is still 16px** (glass-deep.css:54, "BUDGET CALL: stays 16px"). The
CLAUDE.md/AMENDED-plan "1.5 (the LOW end)" prose is STALE — the KS spec must say: **the decision is now
about the 16→20px BLUR bump alone** (saturate already at ceiling). `--glass-saturate-deep-ceiling` has **0
`var()` readers** (A-glass-token-arch F7 — documentation-only; F2.2's dead-token sweep or this wave should
address it). `--glass-depth` lerp (glass-deep.css:76-93) is a genuine driver only if a host animates depth;
2 static consumers (Card deep tier + button) — the lerp machinery is largely unused (F7).
**preconds:** none. **MIGRATION:** none (opt-in tier).

### 13.2 · `W-GLASS-REFRACT-WEBGL` (C-SAFARI Tier-1 WebGL2 FLOOR — PRIMARY, ★★★ chronic)

**Absorbs** 12.8 (`W-SAFARI-PARITY-GATE`) + 12.7 (`W-GATE-UNIFORM-BLUR`) + 13.4 (SOTA-ladder). C12 dark-AA-
over-bright folds in as F2. **Scope (AMENDED-GESTALT-PLAN:69, resolve-G1-csafari.md):**
- Build `src/composables/glass/webgl/shaders/glass-refract.glsl.ts` (the Tier-1 WebGL2 floor, ported from
  `docs/tranches/BG/audit/glass-field-shaders.json` — the source-of-truth prototype).
- The C-SAFARI ladder: full → drapery-dropped → flat-blur.
- **The fence operator (resolve-G1 §1):** `ca = inward · rim · uChromatic · 0.0045` (the ABSOLUTE
  rim-offset), NOT a `uDispersion` UV-fraction (the spike measured the wrong variable). Fence metric =
  `dispΔC_p99 ≤ ε` (dispersion-on vs dispersion-off differential, over the panel region on the WS1 field).
- **The full pass renders** (resolve-G1 §2): drapery (`potentialFBM`+`curlFBM`, the 2nd fbm-curl) +
  `uMetalStrength` composite + the K12 plate VALVE.
- **C12 dark-AA fold (resolve-G1 §3):** the SAME `uValveKnee`/`uPlateAlphaMax` valve firms the plate over
  bright ridge cores → assert content ≥ 4.5:1 for the lifted-to-full ink, both modes; the dim valley stays
  translucent.
- **The NEW device-free gate `proof:glass-refract-fence`** (born-RED): F1 chroma fence · F2 dark-AA fold ·
  F3 operator-is-`uChromatic` source-scan · F4 op-budget proxy · F5 on-disk-resolves + a self-test bite
  per clause. Producer `scripts/glass-refract-fence-capture.mjs` (mirrors `aurora-wgpu-parity-capture.mjs`;
  commits the C17 pair to `docs/tranches/BG/audit/visual/glass-refract-fence/`).

**CRITICAL DISK RECONCILE (COHERENCE F1 [HIGH]):** `uChromatic` exists ONLY in `glass-field-shaders.json`
(a converge-phase GLSL PROTOTYPE) + planning prose. **The genuinely-shipped refraction shader is the Tier-2
WGSL `src/composables/glass/webgpu/glassShader.wgsl`, which uses `chromatic_aberration: f32` (:13) at
`aberration_dir = … * u.chromatic_aberration * 0.003` (:130-132) — ~1.5× DIFFERENT from the planned
`uChromatic·0.0045`.** `refraction_strength` (:12) uses `* 0.02` vs the planned `·0.045`. **13.2 must
RECONCILE the two, not re-derive:** the F3 clause must ALSO scan/fence `glassShader.wgsl` (not only the new
GLSL), and reconcile 0.0045 vs 0.003 so the Tier-1 WebGL2 floor and the Tier-2 WGSL split R/B at the SAME
constant (else `proof:gpu-substrate-single`'s ΔE bar reds at build). The KS-GLASS author must name
`glassShader.wgsl:13,130-132` explicitly and decide the reconciliation (rename `chromatic_aberration`→
`uChromatic` in the WGSL + align magnitude, OR keep both with a documented mapping).

**Token-type collision (COHERENCE F2 [MED]):** `--glass-edge-dispersion` (glass-fx.css:305) is a two-inset-
ring **box-shadow** value consumed AS a box-shadow (surfaces.css:417 `.glass-chromatic`). It CANNOT drive a
shader float uniform. 13.2 must EITHER mint a NEW scalar token OR explicitly break `.glass-chromatic`. The
KS spec names this.

**The on-device residual (resolve-G1 §6, buildPhaseDeferred=TRUE):** the structural proxy (C17) de-risks
the Tier-1 floor (the leg LEAST at risk); the leg that missed 3× is the REAL Metal-Safari.app capture (C18
`?capture=` harness at `demo/main.ts`, ALREADY shipped; a non-authoring agent on the M5 Max captures real
Safari 26 + Chrome, both modes, embeds the digest in `SHIP-ATTESTATION.json`). The pipeline is PROVEN
(EXECUTION-PROGRESS §0 note: dual-engine `?capture=` validated on `/foundations/colors`; the blank-WebKit
chronic does NOT reproduce). Non-volatile evidence: `README-glass-deep-evidence.md` — `glassShader-tier2.wgsl`
(compiles Dawn+WebKit-26), `glass-field-shaders.json` (Tier-1 source-of-truth), `wkdriver.swift`+`wkshot.m`
(the WKWebView capture instrument), `webkit-report.json` (`@supports(backdrop-filter:url())` reports TRUE
while the lens displacement is a measured NO-OP — the `filter:url()` graph is UNRELIABLE; the Tier-1 WebGL2
is the floor).
**≥2 consumers (the visual-load-bearing bar):** the `sampleBG` wrapper @ 5 refracting sites — the hero
glass CTA + the dock plate + the `.glass-deep`/`--glass-depth` Card tier (glass-deep survives the 3.6
blur-peer collapse). **preconds:** none (build-INDEPENDENT, lands in `src/` NOW; F1/F2 calibrate over the
WS1 field once the keystone wires it).

### 3.10 · `W-GLASS-DYNAMICS` (the distinct read-carrier axis)

**Absorbs** 13.5 (`W-GLASS-LIQUID-TRANSITION` as a press-coupled clause). **Scope (AMENDED-GESTALT-PLAN:65,
build-map:72-73):** lensing-refraction + neutral specular hairline read-carrier; GL uniform reads
`press.value` (soft-gated by F5.1). **gate arm:** `proof:glass` read-carrier arm. **preconds:** F5.1 (the
press drive — the motion spine).
**Disk state / COHERENCE F5 [LOW-MED] fence:** the `:active` LENS-SWELL is ALREADY RETIRED (material.css:302-
314, DDR-LENS-BAKE — the `scale` is BAKED at 28; a CSS `url()` string cannot carry a substituted `var()`).
The moving specular `::before` (material.css:270-284) + the dock-control gleam are the LIVE specular path.
**F5 wasted-work risk:** 3.10 "strengthens W-LENSING" but 13.2's SOTA-ladder supersedes the CSS-SVG lens
with GL refraction. **The KS spec must disambiguate 3.10's edit target = the SURVIVING specular path
(`createSpecularWriter`/`useSpecularTracking`, material.css), NOT the to-be-superseded `glass-refract.css`
SVG lens.** The "neutral specular hairline" is the read-carrier — a hairline that reads as glass depth over
any backdrop, distinct from F2.1's floor-fill/rim (the defined-edge) and the accent's chromatic rim.

### 0.7 · `W-DOCK-BLUR-RETIRE-CARVE` (H — structural, the FRONTIER wave)

**Renamed off `W-CLOSEFIX-9SITE`** (GC-FC3 strip). **Scope (AMENDED-GESTALT-PLAN:61, build-map:62-64):**
- **Delete the `--glass-blur-dock` chain (~4-5 src).** **Disk truth: the composed `--glass-blur-dock` has
  ZERO live readers** (grep `var(--glass-blur-dock)` = 0) — the 3.6 blur-peer moved the dock onto
  `--glass-blur-resting` (shell.css:29). The surviving refs are: glass.css:166-169 (self-referential
  compose), dark-arm.css:286, bridges.css:334 (`--blur-dock` Tailwind bridge reads `--glass-blur-dock-
  radius`), `--glass-saturate-dock` (glass.css:135, read only by the dead composite), + the shell.css:26
  COMMENT. **This is a clean orphan-chain delete** (COHERENCE clean-note: "0 live readers of the composite").
- **Carve `ladder.css` 527→<500** → `glass/grain-overlay.css` (the grain `::after` block, ladder.css:462-
  525, is the natural carve — it is a self-contained `@layer components` sub-concern).
- **Carve `shell.css` 510→<500** → `dock/shell-regions.css` (F3-neighbor; 0.7 owns).
- MIGRATION row (the `--glass-blur-dock` retire).
- **KILL `proof:retired-token-consumers`** (never mint — a sibling-probe run backwards through the
  foreign-tree fence, inv-26-backwards; RULING #3). The bbnf-buddy ask re-bases on the MIGRATION row +
  `proof:crossrepo-asks:bh >=4`.
**gate arm:** `proof:glass` — `--glass-blur-dock` source-absent · dist byte-identical · `ladder.css`<500 ·
`shell.css`<500. **preconds:** STAGE-0 (3.6 landed). **This is the frontier** (EXECUTION-PROGRESS
§0/Frontier). No Fable/DesignSync (structural — the grain-tail liquid-hover π rides its own close).

---

## 4. THE FENCES + PRECEPTS THE KS-GLASS SPEC MUST HONOR

- **The protected set (SYNTHESIS §4, INVIOLABLE):** `--glass-level`/`--glass-depth` composition + six-layer
  composite · warm HSL identity values · alpha ladder (0.30/0.50/0.65/0.80/0.95 light; +0.08 dark) · dark
  legendre-violet `--primary` · `in srgb` `--surface-tint-*` fence (AW.W26) · 13-stop ramp · metal quads ·
  φ constants · `createCanvasLifecycle`. **Byte-identical.** F2.2 is a ZERO-PIXEL transposition — any drift
  is a FINDING.
- **The `in oklab` vs `in srgb` fence:** the GLASS-TINT axis is `in oklab` (perceptual); the
  `--surface-tint-*` brand-overlay family is `in srgb` (the AW.W26 house identity). F2.2's dark-arm split
  and the tint recipe stay `in oklab`; the srgb fence is NEVER touched.
- **The light-dark() inset-shadow trap (MEMORY, R16 MN-1):** an inset-shadow leg inside `light-dark()`
  computes the WHOLE box-shadow to `none`. F2.2's dark-arm split KEEPS shadows/insets in `.dark {}` (plain
  per-mode pairs); ONLY colors move to `light-dark()`. The gate carries a no-color-feeds-inset bite.
- **The `--glass-key` no-angle decision (glass-fx.css:106-109):** the cel key is 4 per-axis sign tokens,
  NEVER a `-58deg` azimuth (the banned sign-trap). F2.1's stronger rim + F4's grain both read the 4-token
  family; no wave mints `--glass-key-direction`.
- **The goo/metaball law (glass-material GOLDEN §6):** the metaball/goo stays the dock-fission viz (static-
  SVG sRGB `filter:url()`), NEVER the material floor. The MATERIAL path has ZERO goo, ZERO
  `backdrop-filter:url`. F2.1/F2.2/13.2 keep this.
- **Compositor-only + PRM (motion-canon):** every hover/press channel is `scale`/`translate`/`opacity`/
  `filter`/custom-property (never a layout property); PRM keeps the static warm floor + specular, drops the
  motion. F2.1's `.glass-defined` is a static decoration (no animation); 3.10's press-couple rides F5.1.
- **≥2-consumer (J-inv-10):** every new register clears it — F2.1's `.glass-defined` (the whole control
  cohort); F2.2's `.glass-surface` (the 15 consumers); 13.2's `sampleBG` (5 sites).
- **Clean breaks (MEMORY):** no aliases — `--glass-bg-*-tinted` DELETE, `.glass-atom`/`.glass-chip`
  DELETE, `.glass-refract`→`.glass-lens` (id/token/file), the 4 goo-alias IDs retire.
- **The paint battery:** every VISUAL ([P]) wave closes on a filed FABLE gestalt PASS (non-authoring) over
  its `designSyncSurface` + `proof:warm-identity` (the composited-whole gate, F8.2 — a dominant-hue
  histogram over a route REGION, not a mean-L box). No terminal reflect funnel — each wave closes at its
  OWN non-authoring dual-engine close.
- **The Fable arm (user directive):** frontend + complexity/novelty = FABLE agents author the specs; the
  KS-GLASS spec names `fableArm` (defined-vs-transmissive calibration for F2.1, the calm→deep arc for 13.2,
  byte-identical CONFIRM for F2.2) + `designSyncSurface` per visual wave (already in the plan rows).

---

## 5. THE GESTALT BAR (how each F2 wave's paint is judged)

From BD glass-material §10 + glass-atoms §5 + buttons §8 + the RESPEC composited-whole gate:

1. **A colorful field is visibly behind every glass surface** (leg b — F1 landed; F2.1 pairs with it).
2. **The glass TRANSMITS the field tinted warm** — composited C ≥ 0.018 over the field (born-RED on the
   flat-page ~0.009).
3. **Every control reads as a DEFINED SHAPE** — the Select trigger has a cut, lit edge + a warm cast, not
   a cream smudge (F2.1's `defined-control-floor`; the 0.0138 near-gray dies).
4. **No surface reads gray/muddy** — the headline; a single gray plate is a FAIL regardless of the metric
   (`proof:warm-identity`, warm hue H∈[45,85]).
5. **The cel coheres** — rim + cast agree on ONE key-light (the 4-token family); objects lift off the field
   with cartoon weight.
6. **Text AA holds** (landed ratios preserved; plate L unmoved — the field+edge are additive layers).
7. **Both modes read warm-luminous; dark GLOWS, never charcoal** (W-DARK-MATERIAL companions).
8. **Liquid-weight un-regressed; Safari-parity on field+rim+cast+transmission** (the ★★★ 13.2 bar — real
   WebKit-26 + Chrome dual-engine, the C18 non-authoring capture).
9. **No-legacy / DRY** — F2.2 is byte-identical (any drift = finding); the retired registers/tokens/ids are
   clean-break removed (0 residual `var()`).

**Zero-pixel discipline for F2.2 specifically:** the paint close asserts computed colors byte-identical to
the pre-wave `no-gray`/`dark-material` π ground. The transposition changes STRUCTURE (basis), never PIXELS.

---

## 6. DISK-VS-DOC DRIFTS THE AUTHOR MUST NOT INHERIT (traps)

1. **`glass-refract.css` path:** DEV-C:160/175 say `glass/glass-refract.css`; **disk is
   `src/styles/glass-refract.css`** (top-level). The refract→lens rename (F2.2 step 5) targets the
   top-level file.
2. **The C-SAFARI uniform:** the plan says `uChromatic`; **the shipped WGSL uses `chromatic_aberration`
   (glassShader.wgsl:13) at a 1.5× different magnitude.** 13.2 RECONCILES; it does not assume `uChromatic`
   is on disk (it is NOT — only in the JSON prototype + prose).
3. **Deep-glass saturate:** CLAUDE.md/AMENDED-plan say "1.5 (LOW end)"; **disk is 1.8** (glass-deep.css:58).
   F2.3's decision is the **16→20px BLUR bump alone** — the saturate already landed at the 1.8 ceiling.
4. **The `-tinted` count:** R9 says "9 re-spells"; **disk has 2 token DECLARATIONS (surfaces.css:292/306)
   + 7 reads = 9 total references.** The `@utility glass-fill` deletes all 9 (the 2 decls + the reads
   re-point).
5. **`--glass-key`:** the BD glass-material GOLDEN §4 proposed `-58deg`; **disk landed the 4 per-axis sign
   tokens** (glass-fx.css:114-117). The spec cites the landed form; the angle is banned.
6. **`--glass-ambient-*`:** the GOLDEN §5 wants it wired; **disk: `--glass-ambient-strength` is written
   NOWHERE — the axis is inert.** F2.2 RETIRES it (the RESPEC ruling: the FIELD delivers the transmissive
   read, not a 5th axis).
7. **`--glass-blur-dock`:** the composed token has ZERO live readers (0.7 is a clean orphan delete, not a
   risky migration — the dock already reads `--glass-blur-resting`).

---

## 7. THE ONE-LINE ORDER (build DAG for the family, from the plan)

`0.7` (frontier, structural) → `3.5 UNIFY` (tentpole, owns recipe home) → `3.14 BASIS-CONSOLIDATE` (composes
the factored recipe; needs F8.5 + dead-cut) → `3.13 DEFAULT-DEFINITION` (composes the factored recipe;
needs FIELD-AURORA landed) → `3.15 DEEP-GLASS-DECIDE` (independent) · `13.2 REFRACT-WEBGL` (build-independent,
lands now) · `3.10 GLASS-DYNAMICS` (needs F5.1 press drive). UNIFY ∈ preconds of BOTH F2.1 and F2.2 (R9);
F2.2 lands BEFORE F2.1 in the shared neighborhood (INVERTED, so `.glass-defined` composes the factored
recipe).
