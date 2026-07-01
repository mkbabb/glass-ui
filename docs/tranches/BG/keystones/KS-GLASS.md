# KS-GLASS — glassmorphism within the bounds of CSS

**Keystone spec (KS-A · material). Author: Fable. Date: 2026-07-01. HEAD `fa6ed40a` (tranche/BG).**
**Binding for the frozen plan waves:** 0.7 `W-DOCK-BLUR-RETIRE-CARVE` · 3.5 `W-GLASS-REGISTER-UNIFY` ·
F2.2 `W-GLASS-BASIS-CONSOLIDATE` · F2.1 `W-GLASS-DEFAULT-DEFINITION` · F2.3 `W-DEEP-GLASS-DECIDE` ·
13.2 `W-GLASS-REFRACT-WEBGL` (C-SAFARI Tier-1) · 3.10 `W-GLASS-DYNAMICS`
(`docs/tranches/BG/execution/EXECUTION-PROGRESS.md:64-71`).
**Research inputs (read in full, cited throughout):** `research/GLASS-sota.md` + `research/GLASS-corpus.md`.
**This spec PERFECTS the folded rows' content. The wave SET is frozen; the protected set
(`SYNTHESIS-PASS1.md §4`) is inviolable — identity values byte-identical, the `--glass-level`/`--glass-depth`
composition and six-layer composite untouched, DOCK_SPRING frozen.**

---

## §1 — The hallmark delineated

> **glass-ui's glass is a RELATIONSHIP rendered in pure CSS.** A warm-cream plate over a colorful field,
> cut by ONE keyed edge, transmitting the room: `backdrop-filter: blur() saturate()` for the frost, ONE
> `color-mix(in oklab, …)` tint seam for the transmission, a conic keyed rim + a coherent warm cast for
> the cel, a squircle SVG lens where the engine allows and an honest floor where it doesn't. Every
> load-bearing layer is Chromium-AND-WebKit native; there is ZERO `url()` in the material path. You
> recognize glass-ui because **nothing is ever gray**: over any backdrop — flat white, live aurora,
> luminous dark — the plate stays warm, the edge stays cut, the ink stays AA. Apple renders Liquid Glass
> with a GPU; glass-ui renders the same *read* with five CSS primitives and one shader it earned.

The identity decomposes into five recognizable signatures, each with a single home:

| signature | the read | the ONE home | status |
|---|---|---|---|
| the warm plate | `--card`-alpha ladder 0.30/0.50/0.65/0.80/0.95, saturate 1.4/1.6 | `tokens/glass.css:54-58,124-128` | LANDED, **PROTECTED** |
| the transmission | ONE `color-mix(in oklab, <rung>, tint strength)` seam | 3.5's `@utility glass-fill` (this spec §3.1) | THE TENTPOLE |
| the keyed cel | 4 per-axis sign tokens `--glass-key-{lit,shade}-{x,y}` → rim + cast agree | `tokens/glass-fx.css:114-117`, `glass/rim.css` | LANDED — **no azimuth ever** |
| the defined shape | edge + warm floor on every CONTROL, over ANY backdrop | F2.1's `.glass-defined` (this spec §3.2) | NEW |
| the honest lens | squircle refraction where real, flat blur where not — never a fake | `glass-refract.css` + 13.2's WebGL2 Tier-1 (this spec §4.13.2) | NEW floor |

What it is NOT (the negative delineation, equally binding): not a gray translucent slab (the no-gray
headline — a single gray plate FAILS regardless of metric); not a `backdrop-filter: url()`-dependent
trick (WebKit 245510, four years open — `research/GLASS-sota.md §2.1`); not a copy-bend masquerading as
live lensing (samasante honesty caveat, §2.2); not goo (the metaball stays the dock-fission viz — the
material path has zero goo, `BD/greenfield/glass-material/GOLDEN.md:290`).

---

## §2 — SOTA grounding (adopted verbatim from `research/GLASS-sota.md`; the ledger is §6 there)

The five findings this spec is built on — full citations in the research file:

1. **Apple ships TWO materials, not a continuum** — Regular (default everywhere) and Clear (gated on
   media-rich backdrop + mandatory dimming + bold content). Maps: calm ladder ↔ Regular; `.glass-deep`
   ↔ Clear, opt-in only. F2.3 measures deep ONLY at Clear-eligible surfaces (hero/dock/CTA over media).
   ([conorluddy/LiquidGlassReference](https://github.com/conorluddy/LiquidGlassReference))
2. **iOS 27 REDUCED default transparency** — the frontier walked toward legibility. glass-ui's
   `--glass-level` brackets + F2.1's defined tier are AHEAD of the leader, not chasing it.
   ([Wikipedia · Liquid Glass](https://en.wikipedia.org/wiki/Liquid_Glass))
3. **Apple's legibility answer is a floor + an edge + adaptive tint — NOT more blur.** F2.1 is the
   exact transposition. ([letsdev a11y analysis](https://letsdev.de/en/blog/ios-26-in-detail-liquid-glass-ui-between-usability-and-accessibility.php))
4. **`backdrop-filter: url()` is Chromium-only, permanently** (WebKit 245510 NEW as of 2026-06); the
   cross-engine `filter:url()` alternative bends a COPY, not the live backdrop. Hence 13.2's WebGL2
   Tier-1 floor over the library-owned field. ([webkit.org/245510](https://bugs.webkit.org/show_bug.cgi?id=245510),
   [samasante/liquid-glass](https://github.com/samasante/liquid-glass), [kube.io](https://kube.io/blog/liquid-glass-css-svg/))
5. **Every frontier implementation composes ONE `color-mix` tint seam** — glass-ui's ~10 re-spells are
   the documented substitution-trap fallout ×4 (CLAUDE.md W55/W-BUTTON-GLASS/W-MENU-GLASS/W-DARK-MATERIAL).
   3.5's `@utility glass-fill` is the structural kill.

The convex squircle profile `f(x)=⁴√(1−(1−x)⁴)` already baked at `src/styles/glass-refract.css:11` IS
Apple's preferred profile (kube.io) — SOTA-confirmed, untouched. DDR-LENS-BAKE
(`glass-refract.css:32-40`) — a `@property` can never be substituted inside a `url()` data-URI —
remains binding; material scalars drive compositor channels only.

---

## §3 — First-principles design (the greenfield loop on the CONTESTED questions)

The material's identity is settled by the BD glass-material GOLDEN (field + keyed rim + coherent cast)
and is protected. Four questions remained genuinely contested; each ran the mandatory loop.

### §3.1 — The tint-recipe home (3.5): where does the ONE seam live?

**Directions (≥3):**
- **(a) A pre-composed `:root` custom property** (`--glass-bg-*-tinted` at `:root`). REJECTED — a
  custom property substitutes at its DECLARING element; a `:root` compose freezes the tint inputs and
  a descendant override never re-composes. This is the exact trap the codebase documents four times
  (CLAUDE.md W55 §substitution-vs-inheritance; `GLASS-corpus.md §1d`).
- **(b) A build-time mixin/preprocessor include.** REJECTED — glass-ui is token-first + Tailwind-first
  (MEMORY: tailwind-first); build-time indirection hides the seam from the cascade and from consumers.
- **(c) An applied `@utility glass-fill`** — the recipe authored ONCE as a Tailwind v4 `@utility`,
  composed AT THE ELEMENT everywhere it paints, parameterized on input custom properties. **GOLDEN.**
  The `color-mix` evaluates at the element, so any scope-level re-point of an input re-composes
  automatically — the trap becomes structurally impossible, not re-documented. This is R9's ruling
  verbatim (`RULINGS-PASS2.md §R9`).

**The GOLDEN's precise mechanism (the grammar: states write INPUTS, never fills):**

```css
/* src/styles/glass/fill.css — the ONE authoring site (NEW file, glass @import order) */
@utility glass-fill {
    /* input: --glass-bg-rung (the landed BG.W-GLASS-IDIOM-FACTOR seam name, ladder.css:60-72 —
       reused, zero rename churn). output: --glass-plate-tinted (the landed name, kept). */
    --glass-plate-tinted: color-mix(
        in oklab,
        var(--glass-bg-rung, var(--glass-bg-resting)),
        var(--glass-tint-source) var(--glass-tint-strength)
    );
    background: var(--glass-plate-tinted);
}
```

- A state variant re-points the INPUT, never the fill: `.btn-glass:hover { --glass-bg-rung:
  var(--glass-bg-floating) }` — the background re-composes at the element, the W55 darken/lift reaches
  every state for free.
- A NESTED compose (the capsule's warm floor, `glass/glass-capsule.css:56-63`) reads the OUTPUT:
  `color-mix(in oklab, var(--glass-plate-tinted), var(--glass-capsule-warm)
  var(--glass-capsule-warm-floor))` — one authoring site of the oklab tint wrapper survives; the
  capsule's warm-floor leg is a DIFFERENT compose (a warmth floor, not the tint seam) and stays.
- The 5-rung ladder's existing `:where()` mint (`ladder.css:60-72`) re-expresses as the rungs composing
  `glass-fill` (each rung already declares `--glass-bg-rung`); the two duplicate declarations
  `--glass-bg-floating-tinted` (`surfaces.css:292`) + `--glass-bg-quiet-tinted` (`surfaces.css:306`)
  and all reads DELETE — clean break, no `-tinted` token register survives.

**Self-challenge:** (1) Does an `@utility` reach `data-state`/`:hover` fills? Yes — the utility sets the
base + the output token; states re-point inputs (above). (2) Does `@apply glass-fill` inside `@layer
components` files compile? Yes — one Tailwind compile over `src/styles/` (the `@utility
cartoon-surface` precedent, `cards.css`). (3) Contrived? No — it is the minimal expression of the one
recipe every frontier implementation uses, and the ONLY direction that closes the trap structurally.

### §3.2 — The defined-control-tier mechanism (F2.1): edge vs floor vs vibrancy vs hybrid

**The disease (the born-RED witness):** a default `<Button>` at rest over a flat page composites to
`oklab(0.881 0.0054 0.0127 / 0.328)` → **chroma 0.0138 = near-gray, no edge** (buttons GOLDEN §0,
`GLASS-corpus.md §2b`). Root cause: `--glass-tint-strength: 0%` at `:root` — the tint seam is the
ambient-darken knob, not a warmth floor; and blur over a FLAT page bends nothing.

**Directions (4):**
- **(a) EDGE only** — lift the rim alpha to a read-carrying `--glass-border-defined`. Breaks: the
  silhouette cuts but the INTERIOR still composites near-gray; a defined gray shape still fails the
  no-gray headline.
- **(b) FLOOR-FILL only** — a warm-cream minimum backplate under the transmissive fill. Breaks: a
  floor without an edge is a warm SMUDGE; over a same-tier host (card-on-card, reduce-transparency)
  the control has no cut boundary — the GOLDEN §4 "structural insurance" demands the shape.
- **(c) VIBRANCY** — push saturate/brightness higher on controls (the apple.com-nav move). Breaks:
  over a FLAT page there is nothing behind to saturate — vibrancy amplifies a backdrop that isn't
  there. It is the same failure restated. (Kept as the existing per-rung saturate companion; rejected
  as THE mechanism.)
- **(d) HYBRID — edge + floor + the shipped lit register, engaged as one decoration on one scalar.**
  **GOLDEN.** This is Apple's own Clear-variant answer transposed (floor + edge + adaptive tint,
  `GLASS-sota.md §1.2`), and it composes ONLY machinery the material already owns: the rim family
  (rim.css), the `--card`-alpha compose idiom (glass.css:273), the W-BUTTON-GLASS specular/depth stack
  (surfaces.css:205-215).

**The GOLDEN's precise form** (deliverables in §4.F2.1): `.glass-defined` is a TOKEN-SUBSTITUTION
decoration on a base rung (the `.glass-opaque`/`.glass-deep` precedent — never a competing
`backdrop-filter`, never a parallel recipe), driven by ONE typed inheriting `@property
--glass-definition <number>` (0 = transmissive, 1 = defined). BOTH legs read the scalar — the floor
alpha `calc(var(--glass-definition) * var(--glass-floor-fill-max))` and the rim alpha in
`--glass-border-defined` — so the scalar is genuinely load-bearing (dead-knob-proof by construction;
R8's dead-knob class) and a host can dial definition continuously on any ancestor.
`prefers-contrast: more` lifts `--glass-definition: 1` library-wide (joining the existing
`--glass-level: 0.3` bracket — definition is the mid rung of the same accessibility ladder).

**Self-challenge:** (1) Doesn't the landed FIELD (W-FIELD-AURORA) already give every control an edge by
contrast? Over the field, yes — F2.1 is the FLAT-PAGE + reduce-transparency INSURANCE; the floor at
≤15% `--card` is sub-perceptual over the field's own chroma (the negative π arm asserts the field read
unchanged). (2) Double-darkening under the W55 bright bucket? No — the floor is an alpha-of-`--card`
leg UNDER the tinted plate; the bucket darkens the tint leg above it; the composite stays bounded (π
asserts AA + plate-L within tolerance over the bright fixture). (3) Contrived? No — it is the
reduce-transparency anchor doing double duty, matching iOS 27's own retreat from maximal transparency.

**Decided sub-question (menu rows):** the popover PANEL is the defined surface (`glass-floating` +
`.glass-defined`); `.glass-menu-row` fills stay transmissive INSIDE it — a row inside an
already-defined panel needs state fills, not its own floor. The builder verifies against the 0.0138
witness set; if a bare menu row over flat still reads gray, the row joins the cohort (recorded
decision, one-line flip).

### §3.3 — The deep-glass decide framing (F2.3): land 20px, retire 16px, or measure?

**Directions (3):**
- **(a) Land 20px unconditionally** (the Apple ceiling; deep should be maximal). Breaks: the
  5-tranche chronic exists BECAUSE the budget was never run — an unconditional land repeats the sin
  inverted.
- **(b) Retire at 16px unconditionally** (iOS 27 walked transparency back; 16px already reads deep).
  Breaks: same no-number decision; and the deepest BLUR is the "more glass" carrier (CLAUDE.md
  W-DEEP-GLASS) — retiring without measuring forfeits the read the tier exists for.
- **(c) MEASURE, then a TERMINAL verdict.** **GOLDEN** — the audit's own ruling (SYNTHESIS §2 #10)
  made executable, sharpened two ways by this spec: (i) the decision is the **16→20px BLUR bump
  ALONE** — the saturate already landed at the 1.8 ceiling (`tokens/glass-deep.css:58-64`,
  BD.W-GLASS-ABROGATE-GRAY; the CLAUDE.md "1.5 LOW end" prose is STALE — trap #3, `GLASS-corpus.md
  §6`); (ii) the measurement context is the **Clear-eligible surfaces only** (hero CTA, dock plate,
  `.glass-deep` Card over the live field — Apple's own gating, §2 finding 1), never library-wide.

**Self-challenge:** `profile:budget` is a BUNDLE gate — a token value change is bundle-free, so the
bundle arm alone would green vacuously (the vacuous-green class). The honest instrument is DUAL:
(a) **runtime** — a CDP 4×-throttle frame trace over the deep-bearing route (the AZ morph-showcase §7
discipline; bar: p95 frame ≤ 16.7ms, no regression vs the 16px baseline beyond tolerance);
(b) **perceptual** — 20px must read DISTINCTLY deeper than 16px in the paired π capture (measurable
blur-spread delta over the field). *Free but imperceptible = retire too.* Either outcome TERMINATES
the chronic with the number recorded in the `glass-deep.css` header.

### §3.4 — The refraction ladder (13.2): what is the honest cross-engine floor?

**Directions (3):**
- **(a) CSS-first ladder** — Chromium `backdrop-filter:url()` → samasante `filter:url()` copy-bend
  cross-engine → flat blur. REJECTED: the copy-bend doubles DOM and bends a COPY, not the live
  backdrop (the honesty caveat, `GLASS-sota.md §2.2`); worse, the C18 evidence measured the
  `filter:url()` displacement a NO-OP on real WebKit-26 while `@supports` reports TRUE
  (`README-glass-deep-evidence.md` `webkit-report.json` — a false-capability engine). A floor that
  lies about itself cannot be the floor.
- **(b) WebGL2 everywhere** — retire the CSS lens; one GL shader is the only refraction path.
  REJECTED: costs a GL context per refracting surface (the 1-GL-per-route budget), and the shipped
  Chromium CSS lens is free where it works.
- **(c) The honest capability ladder** — **GOLDEN:** a WebGL2 Tier-1 pass is the PRIMARY refraction
  floor at the 5 library-owned refracting sites; within it, `full → drapery-dropped → flat-blur`;
  the Chromium `backdrop-filter:url()` CSS lens stays a progressive enhancement on non-GL surfaces;
  the un-gated `blur() saturate()` base is ALWAYS painted beneath (WebKit never sees a broken ref).

**The honesty statement (SOTA flag #2, now closed — quotable):** the Tier-1 floor is faithful because
**the backdrop it samples IS the field the library renders** — `sampleBG` reads the library-owned
layer-0 (the W-FIELD-AURORA field / the route's known GL scene), never an arbitrary-DOM readback (no
web API exists for that; pretending otherwise is the copy-bend lie). Where a refracting surface sits
over a NOT-library-owned backdrop, it stays on the CSS base (+ the Chromium lens enhancement). The
named sites (≥3 — the ≥2-consumer bar cleared at birth): the hero glass CTA · the dock plate · the
`.glass-deep` Card tier. The corpus's "5 refracting sites" count (`GLASS-corpus.md §3/13.2`) names
only these three; the COUNT yields to the ENUMERATION (critic m2) — a 4th/5th site enrolls only where
the honesty clause holds (a library-owned backdrop), recorded by the builder as a named addition,
never a phantom count.

**Ladder-rung keying (decided):** `full` = default on hardware GL (drapery `potentialFBM`+`curlFBM`
second pass + `uMetalStrength` composite + the K12 plate valve); `drapery-dropped` = the
`prefers-reduced-motion` arm (the drapery is the ANIMATED cloth — motion drops, the static refraction
STAYS; principled per motion-canon P6) + an explicit consumer opt-down; `flat-blur` = no-GL /
`isSoftwareWebGLRenderer` (the W-AURORA-SWRASTER guard, reused not re-derived) / init-error. No
flaky mid-tier perf heuristic.

**Self-challenge:** is a GL refract worth a context on a card? No — hence the site scoping (Apple's
Clear gating again). Does the WGSL Tier-2 already shipped conflict? Yes — the reconcile is §4.13.2's
first deliverable (COHERENCE F1), not a re-derivation.

---

## §4 — Wave binding (per-wave perfected specs, in DAG order)

**The family DAG (`GLASS-corpus.md §7`):** `0.7` (frontier, structural) → `3.5 UNIFY` (tentpole, owns
the recipe home) → `F2.2 BASIS-CONSOLIDATE` (composes the factored recipe; needs F8.5 + dead-cut) →
`F2.1 DEFAULT-DEFINITION` (composes the factored recipe; FIELD-AURORA landed) → `F2.3 DEEP-DECIDE`
(independent) · `13.2 REFRACT-WEBGL` (build-independent, lands now) · `3.10 DYNAMICS` (needs 3.5; press
clause soft-gated on F5.1). R9: UNIFY ∈ preconds of BOTH F2.1 and F2.2.

### 0.7 · `W-DOCK-BLUR-RETIRE-CARVE` (H — the frontier; structural, no paint)

**What the perfected spec ADDS vs the folded row:** the exact orphan-chain enumeration + carve
boundaries, so the builder executes a checklist, not a search.

- **Retire the `--glass-blur-dock` chain (a clean orphan delete — the composed token has ZERO live
  readers;** the 3.6 blur-peer moved the dock onto `--glass-blur-resting`, `dock/shell.css:29`).
  Delete: the self-referential compose `tokens/glass.css:166-169` + `--glass-saturate-dock`
  (`glass.css:135`, read only by the dead composite) · the dark companion `tokens/dark-arm.css:286` ·
  the `--blur-dock` Tailwind bridge (`bridges.css:334`) · the `shell.css:26` comment. Post-delete
  assert: `grep -r 'glass-blur-dock\|glass-saturate-dock\|--blur-dock' src/` = 0.
- **Carve `glass/ladder.css` 527→~470:** the grain `::after` block (`ladder.css:462-525`, a
  self-contained `@layer components` sub-concern) → NEW `src/styles/glass/grain-overlay.css`.
  Position-preserving, dist BYTE-IDENTICAL (the AX.W06/W-CARVE3 discipline); `index.css` glass order
  gains `grain-overlay` immediately after `ladder`.
- **Carve `dock/shell.css` 510→~459** → NEW `src/styles/dock/shell-regions.css`; `dock.css` `@import`
  order re-pointed. (F3-neighbor; 0.7 owns the carve.)
- **MIGRATION.md row:** `--glass-blur-dock` retired — a consumer override re-points to
  `--glass-blur-resting-radius` (the primitive, per the doc-override idiom).
- **NEVER mint `proof:retired-token-consumers`** — a sibling-probe run backwards through the
  foreign-tree fence (inv-26-backwards; RULING #3). The bbnf-buddy ask re-bases on the MIGRATION row +
  `proof:crossrepo-asks:bh >=4`.
- **Gate (`proof:glass` clauses):** `--glass-blur-dock` source-absent · dist byte-identical ·
  `ladder.css` < 500 · `shell.css` < 500. **No Fable/DesignSync** (structural; the grain-tail
  liquid-hover π rides its own non-authoring close).

### 3.5 · `W-GLASS-REGISTER-UNIFY` (P — the F2 tentpole; owns the tint-recipe home, R9)

**Absorbs** 3.4 Safari-blur clause + 3.8 consumer-band + 3.9 dock-AA + 3.11 `.liquid-pill` M5a + the
3.6 landed seed. **Preconds:** 0.7, 3.6 (landed).

**Deliverables:**
1. **NEW `src/styles/glass/fill.css`** — the `@utility glass-fill` per §3.1 (input `--glass-bg-rung`,
   output `--glass-plate-tinted`, `in oklab`, the tint pair `--glass-tint-source`/`--glass-tint-strength`
   read at the element). This file is the ONLY authoring site of the glass-tint `color-mix` wrapper in
   `src/styles/`.
2. **Re-point the 5-rung ladder** (`ladder.css:60-72`) onto the utility (the landed `:where()` mint
   re-expresses; `--glass-plate-tinted` reads byte-identical at defaults).
3. **DELETE the duplicate tokens + re-spells (clean break, 9 total refs):** `--glass-bg-floating-tinted`
   (`glass/surfaces.css:292`) + `--glass-bg-quiet-tinted` (`surfaces.css:306`) declarations + all 7
   reads. `.btn-glass`/`.segmented-indicator`/`.glass-capsule` states re-point `--glass-bg-rung` per
   state (§3.1 grammar: states write inputs, never fills); each state's CURRENT effective rung mapping
   preserved exactly (byte-identical composed values at defaults — the π asserts parity).
4. **Migrate the 6 `--glass-fill-tint` consumers + the 3 chromatic pairs** (icon-chip, glass-atom,
   glass-chip, badge, selectable-chip, IconChip) onto the utility's compose path — the per-instance
   plate-fill tint (`glass.css:407-424`) becomes a bias INPUT to the one recipe, not a second mix site.
5. **Dock-AA witness (absorbed 3.9):** the dock plate composes the utility at the element (the
   baked-`:root` `--glass-bg-dock` read is F2.2's fold; this wave lands the dock's element-level
   compose so the bright-bucket darken reaches it) — the no-gray dock witnesses join `proof:glass`.
6. **Safari-blur clause (absorbed 3.4):** every `backdrop-filter` site carries the `-webkit-` twin;
   the `blur(calc(var() * var()))` chain survives Lightning-CSS dedup (a source-scan + built-dist
   assert).
7. **MIGRATION.md rows** for the `-tinted` token deletes.

**Gate arm (`proof:glass`):** `glass-fill-single-recipe` — exactly ONE `color-mix(in oklab,
…--glass-tint-source…)` authoring site in `src/styles/` (born-RED on the current multi-site; a planted
2nd inline re-spell self-test → RED) · Safari-webkit twin assert · dock-AA / no-gray witnesses · AA
re-ratify. **Fable arm / DesignSync:** UNIFY calibration — the glass-band 5 tiers + the bright bucket,
both modes, both engines; a non-authoring Fable instance files the gestalt PASS. **Paint close:** the
glass-band capture (5 rungs over the live field + the synthetic bright fixture), byte-parity with the
pre-wave `no-gray`/`dark-material` π ground at defaults (the recipe move is zero-pixel; only the
STRUCTURE changes).

### F2.2 · `W-GLASS-BASIS-CONSOLIDATE` (P — zero-pixel elegance transposition)

**Preconds:** 3.5 UNIFY (R9) · F8.5 `W-TOKEN-MANIFEST` · dead-cut (10.5). **Does NOT touch the recipe
home** — that is 3.5's. Any pixel drift is a FINDING, not a consolidation. Six sub-moves, one wave:

1. **Named-surface bg fold (the downstream of 3.5):** the baked-at-`:root` tinted bgs —
   `--glass-bg-dock` (`glass.css:283`), `-dialog` (:293), `-sheet` (:302), `-clear` (:309) — re-express
   as element-level `glass-fill` composes (rung + bias inputs); the `:root` bakes delete. The last
   pre-substituted reads die; the trap class is EXTINCT in `src/styles/`.
2. **Merge the 3 small-glass registers → ONE `.glass-surface` basis** with intent modifiers
   (`--atom` loud/opaque · `--chip` toggle-punch · `--capsule` lifted-lozenge). Retire
   `glass/glass-atom.css` + `glass/glass-chip.css` (clean break); re-point the ~15 consumers (35 files
   reference the trio — the overlap is real: TagsInputItem = capsule+chip; Slider = capsule+atom;
   Badge = capsule+atom). A component composes EXACTLY one register + one modifier, never two. The
   per-register re-pastes DRY: the `12%/15%` tint floors, the `scale: 1.04 0.94` press squash, the
   `--motion-weight:1` ×4, the `oklch(0.9 0.05 75 / 0)` warm-zero stop ×5 — each becomes ONE token/rule
   in the basis.
3. **Kill the dark COLOR dual-arm:** delete the ~60 duplicate color decls from `dark-arm.css`; colors
   resolve via `light-dark.css` ONLY; `dark-arm.css` keeps ONLY shadow/inset arms. **The rule — ONE
   mechanism per token TYPE:** colors → `light-dark()`; shadows/insets → `.dark{}` (the light-dark()
   inset-shadow trap is the preserved exception — MEMORY + R16 MN-1; the gate carries a
   no-color-feeds-inset bite).
4. **Dead-token sweep (post-F8.5 confirm):** the 9 goo/worm orphans (`--pager-worm-*`/`--deck-goo-*`/
   `--carousel-goo-*`) · `--search-result-text-secondary` · `--glass-spine-blur/-opacity` ·
   `--glass-saturate-deep-ceiling` (0 `var()` readers — the bound lives in the comment; F2.3 notes it,
   this wave deletes it). Delete the gates whose sole job asserts a deleted token.
   **The ambient axis is NOT in the sweep — it is LIVE (critic C1; the inherited corpus §1c/§2a
   "written nowhere" reading was stale):** `--glass-ambient-hue` + `--glass-ambient-strength`
   (`glass.css:391-405`) are written at runtime by the shipped BE.W-AMBIENT-TINT bloom-up leaf —
   `bloomUpField.ts:71/76` (ramped by `useBloomUp.ts:49`) + `useGlassBackdropLuminance.ts:440` — and
   LIVE-READ into the tint seam at `liquid-morph.css:34-35` and `:64-69` (the field-warm ceiling).
   `useBloomUp`/`bloomUpField` sit in NO dead-cut (10.5 names them nowhere) and were carved DONE at
   row 1.7 (`6daf7ef3`). The axis KEEPS: the RESPEC "the FIELD delivers the transmissive read, not a
   5th axis" premise is refuted by this live consumer. Note the liquid-morph read is ALREADY the §3.1
   grammar — it writes the tint INPUTS (`--glass-tint-source`/`--glass-tint-strength`), never a second
   `color-mix` authoring site, so it survives 3.5's `glass-fill-single-recipe` arm by construction.
   **Fold-candidate note to the orchestrator (out of KS-GLASS's frozen scope):** IF the ambient axis
   is still wanted gone, `useBloomUp` + `bloomUpField` + the `useGlassBackdropLuminance:440` write
   must retire FIRST — a motion-lane retirement decision; this wave never asserts "zero writers" over
   a surviving writer.
5. **Finish the two half-renames:** collapse the 5 byte-identical goo filter ids →
   `#glass-goo` (`#pager-goo`/`#dock-fission-goo`/`#morph-goo`/`#dock-morph-goo` retire —
   `morph-field.css:79,83`, `fission-bridge.css:111,113`, `useGooMorph.ts:8,50`). Complete
   `.glass-refract`→`.glass-lens`: **the file is top-level `src/styles/glass-refract.css`** (the
   DEV-C `glass/glass-refract.css` path is STALE — trap #1), the SVG id `#glass-refract`
   (`useGlassRenderer.ts:155`, `glass-specular-track.css:22-24`), the `--glass-refract` token — id,
   token, file all rename, no alias.
6. **`--goo-*` root register:** ONE `--goo-{flow,stretch-cap,duration}` root; carousel/deck/pager/
   dock/tab consume with per-surface overrides.

**Gate arms (`proof:glass`):** `glass-surface-single-basis` (no component composes ≥2 of
{atom,chip,capsule}) · `dark-arm-disjoint` (`.dark{}` color ∩ `light-dark()` = ∅; born-RED on the
60-overlap; + the no-color-feeds-inset bite) · `goo-id-single` · `refract→lens complete` ·
`clean-break-residual` (every retired token/id → 0 residual refs, JS included). **Fable arm:** Fable
CONFIRMS byte-identical darken/lift over the glass band, both modes — the confirm is the wave's
verdict (any drift = FAIL-PAINT → finding). **Paint close:** `tests-visual/glass-basis.spec.ts` —
computed colors byte-identical to the pre-wave `no-gray`/`dark-material` π ground.
**NOT in this wave (protected/booked):** the `--glass-level`/`--glass-depth` geometry, six-layer
composite, alpha ladder, `in srgb` fence, φ constants (byte-identical); the `@layer` explicit-stack
move stays KEEP-BOOKED.

### F2.1 · `W-GLASS-DEFAULT-DEFINITION` (P — CRITICAL; the defined control tier)

**Preconds:** 3.5 UNIFY (composes the factored recipe — `--glass-floor-fill` layers under
`--glass-plate-tinted`) · FIELD-AURORA (landed). Sequenced AFTER F2.2 in the shared neighborhood.

**Deliverables (all-new on disk — 0 declarations exist):**
1. **`@property --glass-definition`** (`tokens/property-regs.css`): `syntax: "<number>"`,
   `inherits: true`, `initial-value: 0`. The one engage scalar (§3.2).
2. **Tokens in `tokens/glass.css`** (transmissive `--glass-bg-*` BYTE-UNTOUCHED):
   - `--glass-floor-fill-max: 15%` (the calibration knob; Fable arm owns the final value) and
     `--glass-floor-fill: color-mix(in srgb, var(--card) calc(var(--glass-definition) *
     var(--glass-floor-fill-max)), transparent)` — **`in srgb` is CORRECT here:** this is an
     alpha-of-`--card` plate leg (the ladder's own compose idiom, `glass.css:273`), NOT a chroma tint;
     the oklab/srgb fence is about tint vs plate, and this is plate.
   - `--glass-border-defined` — the read-carrying warm rim rung (a lifted alpha of the warm hairline,
     scaled by `var(--glass-definition)`; NOT the ≤5% content hairline at `glass.css:342-346`).
3. **NEW `src/styles/glass/defined.css`** — `.glass-defined { --glass-definition: 1; }` + the floor
   layered UNDER the transmissive fill via two image layers:
   `background-image: linear-gradient(var(--glass-plate-tinted), var(--glass-plate-tinted)),
   linear-gradient(var(--glass-floor-fill), var(--glass-floor-fill)); background-color: transparent;`
   + `border-color: var(--glass-border-defined)`.
   **The `background-color: transparent` is LOAD-BEARING (critic M1 — zero interpretation):** the base
   rung's `glass-fill` utility paints the plate via the `background:` SHORTHAND (§3.1 →
   background-COLOR), and CSS image layers always paint OVER the background-color, so the two-image
   form is the ONLY way to order plate-over-floor — but left un-zeroed the composite would be
   plate(image) ⊕ floor(image) ⊕ plate(color), the plate counted TWICE. `.glass-defined` therefore
   zeroes the base background-color; the final stack is exactly ONE plate over ONE floor (the §3.2
   prose), and Fable's `--glass-floor-fill-max` calibration is against this single-plate composite.
   A token-substitution decoration on a base rung — NO competing `backdrop-filter`, NO parallel
   recipe. The lit register (specular + `--glass-btn-*` depth stack) is already shipped and composes
   unchanged.
4. **The DEFAULT flip (the control cohort):** Button glass variants · `.input-pill`
   (Input/Textarea/NumberField) · `.control-surface` (SelectTrigger) · the chip family
   (toggle-chip/selectable-chip) · dropdown/select triggers compose `.glass-defined` by default.
   Content tiers stay transmissive. Menu rows: panel-defined, rows transmissive (§3.2 decided
   sub-question).
5. **Dark arm:** color tokens ride `light-dark()` (post-F2.2 one-mechanism rule); any inset/shadow leg
   of the defined depth stack rides `.dark{}` plain per-mode pairs (the inset trap).
6. **`prefers-contrast: more { :root { --glass-definition: 1 } }`** joins the a11y bracket family.
7. **MIGRATION.md:** none required (additive decoration + default flip with byte-bounded delta; the
   flip is the wave's PURPOSE and rides the π, not a migration).

**Gate arm (`proof:glass`):** `defined-control-floor` — a default `<Button>`/`.input-pill`/
`SelectTrigger` over a synthetic FLAT white page at `--glass-tint-strength: 0%` resolves floor-fill
α ≥ threshold AND a rim ΔL clearing the legibility floor; **born-RED on the 0.0138-chroma witness.**
**Negative arm:** a content `.glass-card` with no `.glass-defined` resolves the transmissive fill
unchanged (no bleed); the field read over the live aurora unchanged (the floor is sub-perceptual
there). + 3-bite self-test (planted: cohort member missing the class · floor at 0 · rim at hairline).
**Fable arm / DesignSync:** defined-vs-transmissive calibration — the control cohort over flat AND
live field, both modes; Fable owns the `--glass-floor-fill-max` + rim-alpha final calibration (the
complexity/novelty routing). **Paint close:** the cohort π (composited chroma ≥ 0.02 both modes over
flat — the buttons-GOLDEN spike bar; AA held; plate L within tolerance) + the non-authoring dual-engine
capture, both modes.

### F2.3 · `W-DEEP-GLASS-DECIDE` (P-cond — end the 5-tranche chronic with a number)

**Preconds:** none. **The decision is the 16→20px BLUR bump ALONE** (saturate landed at 1.8,
`glass-deep.css:58-64`; trap #3). Per §3.3:

1. **Measure (dual instrument):** (a) CDP 4×-throttle frame trace over the deep-bearing route — the
   Clear-eligible surfaces ONLY: hero CTA + dock plate + `.glass-deep` Card over the live field
   (`--glass-blur-deep-radius` flipped 16→20px in the run); bar p95 ≤ 16.7ms, no regression vs the
   16px baseline beyond tolerance. (b) The perceptual delta — paired π captures at 16 vs 20px; 20px
   must read DISTINCTLY deeper (measurable blur-spread delta over the field). `profile:budget` runs
   unchanged as the bundle-side no-regression backstop.
2. **TERMINAL verdict, one of two:** **clears both** → land `--glass-blur-deep-radius: 20px`
   (`glass-deep.css:54`) + the dark deep arm re-checked; **misses either** → RETIRE-at-16px with the
   measured number recorded (delete the "BOOKED" comment). Either way the header carries the verdict.
3. **Gate arm (`proof:glass`):** `deep-glass-decided` — the `glass-deep.css` header carries a TERMINAL
   verdict token (`landed-20px` OR `retired-at-16px-cost-N`), never `booked`; a synthetic `booked`
   REDs (the `proof:nda-decided` terminal-lock shape).
4. **Fable arm / DesignSync (IF landed):** "deeper reads warm-cream" — hero+dock deep glass, both
   modes; the deep read must stay the warm identity, never a hue shift. **Paint close:** the paired
   16-vs-20 capture is the wave's DELTA artefact either way (the retire outcome commits the evidence
   too — the number IS the deliverable).
5. `--glass-saturate-deep-ceiling` (0 readers) dies in F2.2's sweep; this wave's comment update
   removes its last mention.

### 13.2 · `W-GLASS-REFRACT-WEBGL` (P — C-SAFARI Tier-1 WebGL2 FLOOR, ★★★ chronic)

**Preconds:** 3.5 (plan row); build-INDEPENDENT — lands in `src/` now; F1/F2 calibrate over the WS1
field once wired. **Absorbs** 12.8 `W-SAFARI-PARITY-GATE` + 13.4 SOTA-ladder (per the frozen cursor
row's source column `13.2+12.8; 13.1/13.4/13.5 fold`, `EXECUTION-PROGRESS.md:68`; 13.5's press-couple
clause rides 3.10 — §4.3.10); C12 dark-AA folds in as clause F2. The prior `12.7 W-GATE-UNIFORM-BLUR`
absorption claim is DROPPED — the id appears nowhere in the frozen cursor (critic m1).

**Deliverables:**
1. **THE RECONCILE FIRST (COHERENCE F1 — the shipped-vs-planned uniform):** the shipped Tier-2 WGSL
   (`src/composables/glass/webgpu/glassShader.wgsl:13`) uses `chromatic_aberration` at
   `* 0.003` (`:130-132`) and `refraction_strength * 0.02` (`:12`); the plan says `uChromatic · 0.0045`.
   **Decision:** mint ONE single-source constants module —
   `src/composables/glass/webgl/refractConstants.ts` exporting `CHROMATIC_RIM_OFFSET = 0.003` (adopt
   the SHIPPED, measured-working value as the anchor; the never-on-disk 0.0045 yields) +
   `REFRACTION_STRENGTH_SCALE = 0.02`. The Tier-1 GLSL template SPLICES the constants; the WGSL keeps
   its baked literals BUT the gate's F3 clause string-scans BOTH files against the JS export — the
   three can only move in lockstep (one commit) or the gate reds. Uniform NAMES stay per-language
   convention (GLSL `uChromatic`, WGSL `chromatic_aberration`) with a 1:1 mapping table in both shader
   headers. Calibration (F1's ε fence) may move the constant — through the one module only.
2. **NEW `src/composables/glass/webgl/shaders/glass-refract.glsl.ts`** — the Tier-1 WebGL2 floor,
   ported from the source-of-truth prototype `docs/tranches/BG/audit/glass-field-shaders.json`. The
   full pass renders: the squircle-profile refraction (single-channel displacement — the
   chromatic-SPLIT stays the booked 13.3 successor) + drapery (`potentialFBM` + `curlFBM`, the shared
   `flow.glsl.ts` chunk consumed, never re-derived) + `uMetalStrength` composite + the K12 plate valve.
3. **The ladder wiring (§3.4):** `full` (hardware GL default) → `drapery-dropped` (the PRM arm +
   explicit opt-down; static refraction stays) → `flat-blur` (no-GL / `isSoftwareWebGLRenderer` via
   the W-AURORA-SWRASTER shared predicate / init-error; the CSS `blur() saturate()` base is always
   painted beneath — WebKit NEVER sees a broken reference). The Chromium `backdrop-filter:url()` CSS
   lens stays the progressive enhancement on non-GL surfaces (`@supports`-gated, untouched).
4. **The backdrop honesty clause (quotable, binding):** `sampleBG` samples the LIBRARY-OWNED field
   render (layer-0), never an arbitrary-DOM readback; a site without a library-owned backdrop stays on
   the CSS base. The refracting sites named in §3.4 (≥3 named, the bar cleared; the 5-count
   dropped — critic m2).
5. **C12 dark-AA fold (clause F2):** the SAME `uValveKnee`/`uPlateAlphaMax` valve firms the plate over
   bright ridge cores → content ≥ 4.5:1 for the lifted-to-full ink, BOTH modes; the dim valley stays
   translucent.
6. **The `--glass-edge-dispersion` collision (COHERENCE F2) — decided:** that token is a two-inset-ring
   BOX-SHADOW value (`glass-fx.css:305`, consumed by `.glass-chromatic` at `surfaces.css:417`) and
   CANNOT drive a shader float. It stays UNTOUCHED; **no CSS scalar token is minted for the shader
   strength** (uniform set via composable options — a CSS knob with no second consumer is a dead knob,
   R8's class). `.glass-chromatic` survives as-is.
7. **Producer:** `scripts/glass-refract-fence-capture.mjs` (mirrors `aurora-wgpu-parity-capture.mjs`);
   commits the C17 pair to `docs/tranches/BG/audit/visual/glass-refract-fence/`.

**Gate (`proof:glass-refract-fence`, NEW device-free, born-RED):** F1 chroma fence — `dispΔC_p99 ≤ ε`
(dispersion-on vs -off differential over the panel region on the WS1 field) · F2 the dark-AA fold ·
F3 operator-is-`uChromatic` source-scan over BOTH `glass-refract.glsl.ts` AND `glassShader.wgsl` + the
constant-parity assert against `refractConstants.ts` · F4 op-budget proxy · F5 on-disk-resolves; + a
self-test bite per clause. **Fable arm / DesignSync:** glass/CTA refraction — hero CTA + dock plate;
the calm→deep refraction arc, both engines. **Paint close (the ★★★ bar):** the C18 REAL-device capture
— a non-authoring agent on the M5 Max captures real Safari 26 + Chrome via the PROVEN `?capture=`
harness (both modes, 2880×1800, in-pixel engine badge), digest embedded in `SHIP-ATTESTATION.json`.
The structural proxy (C17) de-risks; the Metal-Safari capture is the leg that missed 3× and is the
binding close.

### 3.10 · `W-GLASS-DYNAMICS` (P — the distinct read-carrier axis)

**Preconds:** 3.5 (hard); F5.1 press spine (SOFT — the press-couple clause waits if F5.1 slips; the
pointer-only carrier ships regardless). **Absorbs** 13.5 `W-GLASS-LIQUID-TRANSITION` as the
press-coupled clause.

**THE DISAMBIGUATION (COHERENCE F5 — the wasted-work fence, binding):** 3.10's edit target is the
**SURVIVING specular path** — `createSpecularWriter`/`useSpecularTracking`/`useSpecularPointer` + the
moving specular `::before` (`glass/material.css:270-284`) + the dock-control gleam — **NOT
`glass-refract.css`'s SVG lens** (superseded by 13.2's ladder; its `:active` lens-swell is ALREADY
RETIRED per DDR-LENS-BAKE, `material.css:302-314` — do not resurrect a `var()`-in-`url()` attempt).

**Deliverables:**
1. **The neutral specular hairline** — the read-carrier: an angle-keyed hairline glint on the rim band
   riding the EXISTING `--specular-*` cohort + `--glass-edge-glint-band` (W-LENSING's geometry),
   NEUTRAL warm-cream ONLY (chroma belongs to the `--glass-accent` axis — never a chromatic fork).
   Rest = the static keyed rim (landed, W45-TUNE rest-specular stays 0); dynamics = the
   pointer-following glint through the ONE `createSpecularWriter` source (a forked `--mouse-x/y`
   writer reds `proof:glass-cohesion`'s existing clause).
2. **The press-couple (soft-gated clause):** F5.1's `press.value` feeds (a) the 13.2 GL refract
   uniform where the surface is GL (the glass DEFORMS under press — uniform-side, never a map
   re-bake), and (b) `--glass-btn-press-t` on CSS surfaces — ONE press drive, two backends
   (W-MOTION-CANON P3: one drive, both legs, on the spring's own clock).
3. PRM: pointer channel event-gated + cached `matchMedia` (the AV.W7 pattern); press snaps
   deterministic; the static rim survives (P6 — fade/static keeps, motion drops).

**Gate arm (`proof:glass` read-carrier):** single-writer holds (no forked position source) · the glint
rides the existing intensity cohort (no second blend/color fork) · PRM-static · compositor-only ·
press-couple parity (GL uniform == CSS drive at sampled t, when F5.1 lands). **Fable arm / DesignSync:**
glass read-carrier over `/foundations` glass — the hairline carries the glass read over flat AND field,
both modes. **Paint close:** the pointer frame-series π (glint tracks, neutral hue asserted, PRM
single-paint) at its own non-authoring dual-engine close.

---

## §5 — Precepts conformance (explicit checks)

- **The protected set (SYNTHESIS §4):** the `--glass-level`/`--glass-depth` composition + six-layer
  composite, alpha ladders, warm HSL identity, dark legendre-violet, `in srgb` surface-tint fence,
  13-stop ramp, φ constants, `createCanvasLifecycle` — BYTE-IDENTICAL across all seven waves. F2.2 is
  zero-pixel by contract; 3.5 is zero-pixel at defaults; F2.1/F2.3/13.2 change paint ONLY where their
  born-RED witness lives. ✔
- **motion-canon P1-P7:** depth lerp + press-swell are SPATIAL → spring (`--spring-snappy` family, per-
  spring clocks — P1/P4); tint/hue cross-fades are EFFECTS → bezier `--ease-*` (P1). **The GOLDEN §6
  "a spring, never a hard swap" wording is reconciled here:** the intent is *eased, never a hard swap*;
  the mechanism for a color effect is a bezier — and the LIVE ambient axis (kept per critic C1)
  conforms already: `useBloomUp` RAMPS `--glass-ambient-strength` (an eased percentage write,
  `useBloomUp.ts:49`), never a hard swap, so the reconcile stands against the live axis. P5 compositor-only: every dynamic channel is `transform`/`opacity`/`filter`/
  `backdrop-filter`/custom scalar; `proof:no-layout-animation` untouched. P6 PRM: floor + rim + static
  refraction stay, motion drops (13.2's drapery-dropped rung, 3.10's PRM snap). ✔
- **design-idioms / token-first:** every new axis is a custom property (`--glass-definition`,
  `--glass-floor-fill{,-max}`, `--glass-border-defined`, `--goo-*`); consumers retune via `:root`
  overrides of PRIMITIVES (the doc-override idiom); no consumer edits source. ✔
- **tunable-anim:** the one press drive (`--glass-btn-press-t`/`press.value`) + per-spring settle
  clocks; no generic `--duration-*` on a spring channel. ✔
- **Clean breaks (no legacy):** `-tinted` tokens DELETE (3.5) · atom/chip registers DELETE, goo ids
  collapse, refract→lens completes (F2.2 — the ambient axis KEEPS: live writers, critic C1) ·
  `--glass-blur-dock` chain deletes
  (0.7). Zero aliases anywhere. ✔
- **≥2-consumer (J-inv-10):** `glass-fill` = every lit surface · `.glass-defined` = the whole control
  cohort · `.glass-surface` = ~15 consumers · `sampleBG` = ≥3 named sites (§3.4) · `--goo-*` = 5
  surfaces. No CSS
  scalar minted for 13.2's uniform (dead-knob refusal). ✔
- **Presets-in-consumers:** no consumer hue enters a library token; the floor is `--card`-derived; the
  field triad stays consumer-derived. ✔
- **The `in oklab` vs `in srgb` fence (AW.W26):** the tint seam is oklab; `--glass-floor-fill` is srgb
  BY DESIGN (an alpha-of-card plate leg, the ladder's own idiom — §4.F2.1); `--surface-tint-*` never
  touched. ✔
- **The light-dark() inset-shadow trap (MEMORY):** F2.2's split keeps shadows/insets in `.dark{}`;
  colors only in `light-dark()`; the no-color-feeds-inset bite enforces. ✔
- **The `--glass-key` no-angle fence (COHERENCE F7):** the cel key stays the 4 per-axis sign tokens
  (`glass-fx.css:114-117`); NO wave mints a `--glass-key-direction` azimuth (the banned sign-trap,
  recorded at `glass-fx.css:104-113`). F2.1's rim + 3.10's glint read the 4-token family. ✔
- **The goo/metaball law:** zero goo, zero `backdrop-filter:url()` in the material path (GOLDEN §6);
  13.2's enhancement stays `@supports`-gated Chromium-only, never load-bearing. ✔
- **Overhead floor / gates as family arms:** every clause lands INSIDE `proof:glass` (or the named
  `proof:glass-refract-fence` producer pair) — no singleton scripts; the F8.1 family consolidation is
  honored. The KILLED `proof:retired-token-consumers` is never minted (inv-26). ✔
- **Fable arm + DesignSync per visual wave:** named per wave in §4; non-authoring Fable files each
  PASS; until DesignSync provisions (F8.3 USER-GATED), verdicts record against committed dual-engine
  captures. ✔
- **Foreign-tree fence:** all sibling knowledge flows through MIGRATION rows + `proof:crossrepo-asks`;
  zero sibling probes. ✔

---

## §6 — The gestalt bar (the paint verdict for this hallmark)

On a FRESH capture of `/forms/select`, `/forms/toggle-chip`, `/display/buttons`, a cards page,
`/foundations/intro` — BOTH modes AND both engines (real Chrome + real Safari 26, the `?capture=`
harness):

1. **A colorful warm field is visibly behind every glass surface** — the page is never flat cream/gray.
2. **The glass TRANSMITS the field, tinted warm** — composited C ≥ 0.018 over the field.
3. **Every control reads as a DEFINED SHAPE** — a cut, lit edge + a warm floor + a coherent cast; the
   Select trigger is never a cream smudge; **the 0.0138 near-gray witness is DEAD** (composited chroma
   ≥ 0.02 both modes, even over flat white at tint-strength 0).
4. **NO surface reads gray or muddy — the headline.** One gray plate is a FAIL regardless of any metric
   (`proof:warm-identity` dominant-hue histogram, warm H ∈ [45,85]).
5. **The cel coheres** — rim + cast + glint agree on the ONE 4-token key; objects lift off the field
   with cartoon weight.
6. **Text AA holds** (≥ 4.5:1; plate L unmoved — field, edge, floor are additive layers).
7. **Both modes warm-luminous; dark GLOWS, never charcoal** (the transmission companions carry it).
8. **The deep tier reads DISTINCTLY deeper ONLY where opted in** (Apple Clear gating); the calm content
   default stays calm (the iOS-27 direction); F2.3's verdict number is on disk either way.
9. **Refraction is honest per engine** — Chromium bends the live backdrop; WebKit reads the WebGL2
   Tier-1 floor over the library-owned field OR the flat-blur degrade; NO broken `url()` reference,
   NO copy-bend masquerading as live lensing, NO software-raster wedge.
10. **Liquid-weight un-regressed; F2.2 byte-identical** — the basis transposition shifts ZERO pixels
    (any drift is a finding); Safari-parity on field + rim + cast + transmission is the ★★★ bar,
    closed only by the C18 non-authoring real-device capture.

**The quotable close:** *glass-ui's glass is unmistakable within pure CSS because it refuses both
lies — the gray slab that calls itself glass, and the broken filter that calls itself refraction. One
warm plate, one tint seam, one keyed edge, one honest lens. Over anything.*

---

## REVISION — 2026-07-01 (Fable, post-critique; critic: `critique/GLASS-crit.md`)

All four must-fixes applied; the greenfield loop (§3) and the frozen wave set are untouched.

1. **C1 (CRITICAL) applied — F2.2 §4.4:** the ambient-axis retire is STRUCK. The axis is LIVE on
   disk, re-verified at revision time: writers `bloomUpField.ts:71/76` (ramped `useBloomUp.ts:49`) +
   `useGlassBackdropLuminance.ts:440`; live reads `liquid-morph.css:34-35/:64-69`; `useBloomUp`/
   `bloomUpField` in no dead-cut, carved DONE at row 1.7 (`6daf7ef3`). The "zero writers, zero
   readers, zero residual" sentence is gone; the axis KEEPS with a fold-candidate note to the
   orchestrator (useBloomUp+bloomUpField retirement is a motion-lane decision, out of scope). §5's
   two dependent lines re-reconciled: the P1 "eased, never a hard swap" reading now stands AGAINST
   the live axis (useBloomUp's ramp IS the eased write); the clean-breaks bullet no longer lists the
   ambient retire.
2. **M1 (MAJOR) applied — F2.1 §4.3:** `.glass-defined` now explicitly sets
   `background-color: transparent` (the base `glass-fill` shorthand's plate-as-color zeroed), with
   the layering rationale stated — the final composite is exactly ONE plate over ONE floor; the
   double-plate ambiguity is closed, zero interpretation left to the build agent.
3. **m1 (MINOR) applied — §4.13.2 header:** the `12.7 W-GATE-UNIFORM-BLUR` absorption claim is
   DROPPED (grep 0 in the frozen cursor); the absorb list now cites the cursor row's source column
   verbatim (`13.2+12.8; 13.1/13.4/13.5 fold`, `EXECUTION-PROGRESS.md:68`).
4. **m2 (MINOR) applied — §3.4 / §4.13.2 §4 / §5:** the "five sampleBG sites" restated as ≥3 NAMED
   sites (hero CTA · dock plate · `.glass-deep` Card — the ≥2-consumer bar cleared); the count
   yields to the enumeration, a 4th/5th enrolls only under the honesty clause as a named addition.
