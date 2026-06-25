# SELECT (forms) — DELTA-ASSAY: golden-vs-current + the UNION path

> The survival-of-the-fittest assay of the CURRENT Select (SelectTrigger + SelectContent +
> SelectItem + the shared `menu.css` + `.glass-reveal`) against `./GOLDEN.md`, with the three
> challenges (`challenge/1.md` correctness/KISS, `2.md` cross-engine/Safari/a11y, `3.md`
> design-fidelity) FOLDED into the hardening — they converge unanimously, so their fixes are
> binding, not optional. LIVE-MEASURED at HEAD on `:5173/forms/select`, REAL open, both modes,
> chrome-devtools + composited `getComputedStyle`. Every src seam grepped on disk.

---

## 0. THE LIVE DELTA (HEAD, measured this pass — reconciled vs the GOLDEN's §0)

| probe | HEAD light (live) | HEAD dark (live) | GOLDEN target | verdict |
|---|---|---|---|---|
| `--glass-bg-floating` (resolved) | `hsl(30 85% 96%)`/.80 | `hsl(26 22% 17%)`/.88 | warm source | **ALREADY WARM** — W-GLASS-ABROGATE-GRAY LANDED |
| `--glass-tint-strength` | **`0%`** (calm bucket) | **`0%`** | — | floor is the WHOLE at-rest lift (worse than GOLDEN's stated 4%/12%) |
| menu fill `contentBg` | `oklab(.936 .0056 .0133/.808)` | `oklab(.379 .0099 .0169/.894)` | warm-cream | warm-HUE, near-gray chroma |
| `backdrop-filter` | `blur(13px) saturate(1.6)` | `blur(13px) saturate(1.28) brightness(1.1)` | transmit | saturate ALREADY lifted (ABROGATE-GRAY FIX-D) — but **nothing live behind to transmit** |
| `transform-origin` | `0px 382.383px` (trigger lip) | same | trigger edge | **ALREADY tracks the anchor** (welling-from-anchor structurally present) |
| fields on route | **0** | 0 | ≥1 `.paper-field` | the §3 colorful-field is ABSENT — the un-gray root |
| `--field-h` | **UNSET** | UNSET | 48 (terracotta) | phantom |
| `--overlay-tint-floor` | **UNSET** | UNSET | 6%/8% | phantom |
| `--glass-accent` | `rgba(0,0,0,0)` | — | warm chip | transparent rest no-op (correct rest, dormant on highlight) |
| highlighted row bg | `oklab(.916 .0055 .0131/.52)` | — | hot lozenge | **byte-identical to a quiet row — ΔC≈0, ΔL≈0: invisible** |
| `--ease-cartoon-punch` / `--motion-weight` | **UNSET** / UNSET | — | minted | phantoms (Band-0 prerequisite) |
| `--menu-pour-t` / `--menu-row-index` | **UNSET** / UNSET | — | driven scalar | phantoms — rows are ONE slab |
| `--select-dot-color` | UNSET (`currentColor`) | — | `--glass-accent` | neutral dot |
| chevron | `transition-transform 200ms ease-standard` | — | spring clock | **the flat fork** (uncoupled from the 0.4s panel) |
| trigger edge | border 5%α, `box-shadow: none` | — | defined edge | cream-on-cream melt |
| `.glass-reveal` SPATIAL legs | `--spring-snappy`, enter-scale **0.88** | — | punch×weight | fit recipe, un-weighted |

**The screenshot is the gestalt verdict:** the menu is a **flat warm-cream wash** — it reads
warm-HUE (NOT the old gray-blue; ABROGATE-GRAY un-grayed the *source*), but it is **DEAD FLAT** —
zero internal structure, zero transmission, zero field behind, an invisible selection highlight,
a dissolved trigger edge, rows that materialize as one slab. **The Select is NOT broken — it is
STARVED + UNCOUPLED**, exactly the GOLDEN's diagnosis. This is a **REFINE (AUGMENT + COUPLE +
POUR)**, never a re-invent.

---

## 1. THE GOLDEN-VS-CURRENT DELTA — survival of the fittest

### KEEP (fit — byte-untouched or re-pointed, never rebuilt)

1. **The deft UNION architecture itself.** Every seam the GOLDEN names is real and shipped — all
   three challenges grepped this true and SURVIVE it clean. `.glass-menu-row` (`menu.css`, shared
   by 13 SFCs via `menuItemVariants`); `--glass-bg-floating-tinted` `:where()` (`surfaces.css`);
   `[data-slot="select-content"]` (`select.css`); `--glass-accent` registered axis; `.glass-reveal`
   shared by the whole reka overlay family; `--select-dot-color` default `currentColor`. ZERO new
   component, ZERO new composable, ZERO fork. This is the spine — KEEP.
2. **The reka selection engine** (roving / `aria-selected` / `data-highlighted`) — FROZEN.
3. **`.glass-reveal`'s SPATIAL/EFFECTS split** — scale/translate on the spring, opacity/blur on
   `--ease-out` (a fade never overshoots). All three challenges affirm: idiom-correct. KEEP.
4. **`transform-origin: 0px 382px`** — already tracks the popper anchor. The welling-FROM-the-lip
   is structurally present; the GOLDEN need add NOTHING here. KEEP.
5. **The collision-bound** (`select.css` `max-height: min(...)` + `overflow-y: auto`) — KEEP, the
   floor + pour fold onto the SAME rule (see R5 below for the clip interaction).
6. **W-GLASS-ABROGATE-GRAY's warm floating source** (`--glass-bg-floating` = `hsl(30 85% 96%)` /
   `hsl(26 22% 17%)`, saturate 1.6/1.28) — **ALREADY LANDED on disk.** This is the single biggest
   reconciliation: challenge #3's TOP hardening ("raise the floating-tier plate chroma at source")
   is ALREADY DONE. The Select DEPENDS on it; it must NOT re-warm the source.
7. **The KEEP-NEUTRAL floor** — `--accent`/`--neutral-0` stay neutral; the menu accent reads the
   chromatic `--glass-accent`, never the gray `--accent`. KEEP (the no-legacy break).
8. **The meatball fence + no-glass-on-glass + PRM carve** — all three challenges SURVIVE these
   clean. The welling is a plain `scale`, the field is a normal painted `::before` BEHIND. KEEP.

### REFINE (weak — evolve, do not rebuild)

1. **The warm material — but the FLOOR×FIELD framing is INVERTED.** All three challenges land the
   same refutation on painted pixels: **the floor ALONE composites C 0.009–0.013, BELOW the 0.02
   warm-floor, both modes.** Live HEAD confirms WHY: `--glass-tint-strength` is `0%` (calm bucket),
   so the floor is the entire at-rest lift, and at 0.80/0.88α over a flat page it cannot reach 0.02.
   The warm read is **100% field-dependent.** → REFINE: re-cast §2's honest claim — **the FIELD is
   the un-gray guarantee; the floor is the faint-field amplifier + the opaque-tier insurance**, NOT
   a flat-page guarantee. AND drop the menu plate α (0.80→~0.72 light) so the warmed source +
   the field actually TRANSMIT and give real L-variance (challenge #3 #1/#2/#6) — the warmed source
   from ABROGATE-GRAY is wasted behind an opaque-ish fill.
2. **The reveal welling — sub-perceptual amplitude.** The enter-scale 0.88 + a punch trough on a
   normalized 0.88→1 interp yields a ~1.4% overshoot / ~0.3% recoil — invisible (all three
   challenges measured this; live HEAD confirms `contentScale` settles to 1 with no observable
   pre-dip). → REFINE: deepen the enter-squish so the punch has range — enter-scale
   `calc(1 - 0.20·--motion-weight)` (≈0.876 effective, GOLDEN's 0.14 → 0.20) AND re-state the gate
   thresholds in ABSOLUTE scale terms (pre-dip ≥1% below closed; overshoot ≥2% above 1.0). KEEP the
   coupled chevron + the family-upgrade leverage.
3. **The warm-accent chip — too weak + WRONG-SIGNED on luminance.** Live HEAD: highlighted row =
   quiet row (ΔC≈0, ΔL≈0). The GOLDEN's 14%-into-`--menu-row-bg` recipe (challenges #2/#3 measured)
   lands ΔC≈0.02 but ΔL **NEGATIVE** (darker, not a hot pill). → REFINE: mix `--glass-accent` into a
   NEUTRAL base (not the already-tinted `--menu-row-bg`) AND lift luminance (light mode) so
   ΔL ≥ +0.05 AND ΔC ≥ 0.02 on PAINTED pixels; add the `--glass-rim-top` catch-light.
4. **The trigger edge** — 5%α cream-on-cream melt + `box-shadow: none`. → REFINE: compose
   `--glass-edge-floor` (glass-material) + `.glass-capsule-hover` (tabs) at rest/hover. DEPEND, no
   select-private border.

### RE-INVENT (broken — re-mechanize)

1. **The POUR's per-row index has NO real source.** All three challenges land this hardest: §4
   drives `--menu-row-index` "set by the viewport (or nth-child fallback)" but **NEITHER exists** —
   `SelectItem.vue` (live) sets no index, `menuItemVariants` has no index axis, the spike fakes it
   with hardcoded inline `--i`. Without a real index every row collapses to index 0 → the slab. →
   RE-MECHANIZE: a `v-for`-index `:style="{'--menu-row-index': i}"` on the items that own the
   `v-for` (the demo/consumer sets it where it iterates — the Select rows are author-iterated), OR a
   small `nth-child` index ladder in `menu.css` as the zero-JS floor (clamp beyond N → simultaneous,
   graceful). The GOLDEN must BUDGET this plumbing; "the viewport sets it" is vapor.
2. **The POUR mechanism is dead on Safari < 18.** Challenge #2 R1 (load-bearing): transitioning a
   registered custom property shipped only in **Safari 18.0**; on 16.4–17.6 `transition: --menu-pour-t`
   is a no-op → the slab the born-RED indicts → violates "identical Chrome↔Safari". →
   RE-MECHANIZE: gate the scalar form on `@supports (transition-property: --menu-pour-t)`; the
   everywhere floor is a **`transition-delay` ladder** keyed off `--menu-row-index` on a plain
   `opacity`/`translate` transition (works to Safari 9, compositor-only). The registered-scalar is
   the Chrome/Safari-18 refinement; the delay ladder is the floor.

---

## 2. THE UNION PATH — the deft integration (KISS, no legacy, no dual-path)

The path is **AUGMENT shipped seams + DEPEND on the landing Band-0 mints + RE-MECHANIZE the two
broken legs**. No new component, no fork. Concretely, in dependency order:

### Step 1 — un-gray by FIELD-first (the inverted framing the challenges force)

- **DEPEND on `BD.W-PAGE-FIELD` + `BD.W-FIELD-SCRIPT`** (page-background amendment — already
  authored): they co-mint `@utility paper-field` in `paper.css` + `@property --field-h`
  (paint-clamped `clamp(25, …, 95)`) + `warmFieldHue(category)` so forms resolves `--field-h: 48`
  terracotta. This is the un-gray GUARANTEE. The Select is a CONSUMER, never a per-route fork.
- **Portal-local field re-emit** — the §3 colorful-field the route declares but cannot reach (it
  stops at the route root; the portal escapes to `<body>`). The SelectPortal root sets
  `data-field-palette` (re-emitted `--field-h` from the category) → a clipped menu-local
  `.glass-field-portal::before` paints the SAME warm spine. **HARDEN per challenges #1/#3:**
  `inset: 0` (clipped INSIDE, not `-20%` halo) so the blur bends it THROUGH the plate as real
  L-variance, never a glow leaking around the box. A normal painted layer BEHIND, no
  `backdrop-filter` on it (glass-cannot-sample-glass avoided by construction).
- **Drop the menu plate α** (0.80→~0.72 light) on the `[data-slot=select-content]` fill so the
  warmed `--glass-bg-floating` source + the field TRANSMIT. The `--overlay-tint-floor` (raised per
  challenges to whatever clears the FILL-ONLY-over-flat ≥0.02 in BOTH modes, OR re-cast as the
  amplifier) rides the EXISTING `--glass-bg-floating-tinted` `:where()` widened to the overlay
  family. **No re-tint of `menu.css` — the floor is the shared seam.**
- **Re-cast §2 honesty:** the FIELD is the guarantee; the floor + the warmed source are the
  amplifier + the `prefers-reduced-transparency` opaque-escape needs its OWN solid warm fill (a
  warm `--glass-bg-opaque` arm), not "the floor stays."

### Step 2 — couple + weight the welling

- **DEPEND on `BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH`** (motion-spring amendment — already
  authored): they mint `--motion-weight: 0.618` + `--ease-cartoon-punch` (a `linear()` with a real
  negative leg). The Select RIDES `--spring-snappy` as the default so it is NOT blocked on the mint.
- **Re-clock `.glass-reveal` SPATIAL legs** onto `--ease-cartoon-punch × --motion-weight`; EFFECTS
  legs STAY on `--ease-out`. **HARDEN: enter-scale `calc(1 - 0.20·--motion-weight)`** (deeper than
  the GOLDEN's 0.14) so the punch reads. A FAMILY upgrade — every reka overlay inherits in ONE edit.
- **Couple the chevron** to `transition: rotate var(--spring-snappy-duration) var(--ease-cartoon-punch)`
  (kill the 200ms `transition-transform` fork). One gesture, two halves.

### Step 3 — the POUR (re-mechanized for a real index + Safari)

- **`@property --menu-pour-t`** in `property-regs.css`; the per-row windowed read on `.glass-menu-row`.
- **Real index:** the `v-for`-index `:style` on the iterated items (consumer/author owns the
  `v-for`) + a bounded `nth-child` ladder in `menu.css` as the zero-JS floor.
- **Safari floor:** `@supports (transition-property: --menu-pour-t)` gates the scalar; else a
  `transition-delay` ladder keyed off `--menu-row-index`.
- **Un-clip the top row** (challenge #2 R5): pour the arc from BELOW (positive translate → settle),
  or `scroll-padding`, or clamp row-0's arc to 0 — the `-0.4rem` from-above arc is sheared by the
  `overflow-y: auto` clip.

### Step 4 — the warm-accent chip + dot (the shared row, all 13 SFCs inherit)

- `--glass-accent` admit on `[data-highlighted]`/`[aria-selected]` mixed into a NEUTRAL base + a
  luminance lift + `--glass-rim-top` catch-light → ΔC ≥ 0.02 AND ΔL ≥ +0.05 on PAINTED pixels.
- `--select-dot-color` default → `var(--glass-accent, currentColor)`.

### Step 5 — the technicolor weight (COMPOSE shipped, no new layer)

- `--shadow-cartoon-lg` (shipped) under the soft elevation; `--paper-grain` overlay (composed, not
  re-authored). Both static, PRM-immune.

**Net:** the Select becomes the **reference consumer** of the field + floor + capsule + accent +
reveal + punch + pour union. Every artefact is a re-point of a shipped or sibling-GOLDEN seam.
ZERO new component, ZERO fork, ZERO dual-path.

---

## 3. THE DEPENDENCY RECONCILE (the GOLDEN's §6 names → the canonical landing waves)

The GOLDEN's `BD.W-PAGE-FIELD` / `BD.W-CARTOON-PUNCH` / `BD.W-MOTION-WEIGHT` are NOT phantoms —
they are the canonical wave names ALREADY AUTHORED in the sibling greenfield amendments:

| GOLDEN dependency | canonical landing wave | status on disk |
|---|---|---|
| `.paper-field` + `--field-h: 48` | `BD.W-PAGE-FIELD` + `BD.W-FIELD-SCRIPT` | authored in `page-background/WAVE-AMENDMENT.md` (co-mint `@utility paper-field`, `@property --field-h` clamped, `warmFieldHue`) |
| `--ease-cartoon-punch` | `BD.W-CARTOON-PUNCH` | authored in `motion-spring-register/WAVE-AMENDMENT.md` (`linear()` w/ negative leg) |
| `--motion-weight` | `BD.W-MOTION-WEIGHT` | authored in `motion-spring-register/WAVE-AMENDMENT.md` (`@property` 0.618, PRM→0) |
| warm floating source | `BD.W-GLASS-ABROGATE-GRAY` | **LANDED on disk** (live-confirmed `--glass-bg-floating` warmed) |
| `.glass-capsule-hover` / `--glass-edge-floor` | tabs / glass-material GOLDENs | DEPEND |

**The Select adds NOTHING to these — it CONSUMES them.** The select-forms src work is the
overlay-floor + portal-field re-emit + reveal re-clock + chevron couple + pour + accent chip —
all re-points of shipped/sibling seams.
