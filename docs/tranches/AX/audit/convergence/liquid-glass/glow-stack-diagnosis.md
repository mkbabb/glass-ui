# Liquid-glass overhaul (D19) — lane: glow-stack-diagnosis

Read-only source diagnosis of EVERY radial/specular/glow/vignette layer in the glass
material stack at HEAD (3.8.0), with magnitude + fire-condition (REST vs hover/active) for
each, the ranked culprit for the egregious central REST bloom, and the gestalt reduce/remove
recommendation. No browser; the LIVE checks for the orchestrator are at the end.

---

## 0. The headline finding (read this first)

**The "large diffuse central radial bloom" the user reports on a default card/speedtest card
is NOT the moving specular `::before`.** Source-proven:

- The default `<Card>` ships `specular: "off"` (`Card.vue:74`). With `off`, the
  `glass-specular-track` class is NOT emitted (`Card.vue:140` `specularArmed && 'glass-specular-track'`),
  and the `::before` rest intensity is `--glass-specular-intensity-rest: 0` (`tokens.css:1825`)
  → `opacity: var(--specular-intensity, 0)` = 0 (`glass.css:124`). The `::before` paints NOTHING
  at rest.
- `MetricCell` (the speedtest metric tile) composes `.glass-wash` (`MetricCell.vue:94,98`). The
  `.glass-wash::before` is in the same comma-group → same rest intensity 0 → no rest bloom.
- `grep` proves NO `specular="full"` / `specular="subtle"` exists anywhere in `src/` or `demo/`.
  So the brighter `full` ladder (`rest 0.08`, `Card.vue:94`) is never armed in-repo. The moving
  specular is dormant on every shipped surface at rest.

So the central wash is coming from the **always-on, fixed-anchor layers** — chiefly the
**chassis curvature overlay** and (on the dock primary CTA) the **`ellipse at 30% 30%` corner
radials**, both of which the D11 convergence note already isolated. D19 escalates D11: the
bloom is the *fixed-anchor radial family*, not the pointer-tracked one. The moving-specular
machinery is correct-and-dormant; the gestalt is to (a) keep it dormant/subtle, and (b)
neutralise the fixed-anchor pure-white radials that DO paint at rest.

There is one important nuance for the LIVE pass: the **`screen`/`overlay` blend-mode hover
lift** on the moving `::before` (hover 0.22 / active 0.32) is the "egregious specular HOVER"
the user calls out — that one DOES fire, on hover, on every glass surface (the comma-group at
`glass.css:164-185`), including the dock controls. See layer L1.

---

## 1. The full layer ledger

Magnitude column: the inner-stop alpha (× the blend mode) — the perceptual punch. "Fires"
column: REST = paints with no interaction; HOVER/ACTIVE = only on pointer state.

| # | Layer | File:line | Anchor / shape | Magnitude (inner α) | Blend | Fires | Painted on |
|---|-------|-----------|----------------|---------------------|-------|-------|------------|
| **L1** | Moving specular `::before` (the catch-light) | `glass.css:80-141` | `circle at --mouse-x/--mouse-y` (centred fallback 50% 50%) | warm-cream `hsl(40 30% 96% / 0.22)` × `opacity: --specular-intensity` | **screen** | rest **0** (dormant) → hover **0.22** → active **0.32** (`tokens.css:1825-1827`; dark 0.18/0.26 `:1833`) | every `.glass-*` rung + `.glass-card` + `.dock-icon-button` + `.glass-specular-track` |
| **L2** | **Chassis curvature overlay** | token `tokens.css:789-793`; consumed `instrument-chassis.css:38, :83` | `ellipse at 50% -20%` (top-edge-anchored) | **pure white `hsl(0 0% 100% / 0.06)`** | normal (background layer, multiply-free) | **REST — always on, "persists at all phases"** | `.instrument-chassis` background stack |
| **L3** | Spine vignette | token `tokens.css:870-874`; consumed `instrument-chassis.css:135` | `ellipse at 50% 0%` (top-centre) | `color-mix(in oklab, --phase-color 8%, transparent)` (idle → `--surface-tint-8`) | normal | **REST** (spine variant only) | `.instrument-chassis[data-variant="spine"]` background |
| **L4** | Dock primary-tier hover radial | `dock-controls.css:303-311` | `ellipse at 30% 30%` (top-left corner) | `color-mix(in srgb, --phase-color 18%, transparent)` | normal (over paper-grain, `background-blend-mode: overlay,normal`) | **HOVER** | `.dock-tab-button[data-tier="primary"]:hover` |
| **L5** | Dock primary-tier phase halo `::before` | `dock-controls.css:324-343` | `ellipse at 30% 30%` (top-left corner) | `color-mix(in srgb, --phase-color 18%, transparent)`, `opacity: 1` | normal, `z-index:-1` | **REST** (any active `[data-phase]`, i.e. during a speedtest run) | `.dock-tab-button[data-tier="primary"][data-phase]::before` |
| **L6** | `btn-audacious` hover radial (the source recipe L4/L5 mirror) | `utilities.css:782-786` | `ellipse at 30% 30%` (top-left corner) | `color-mix(in srgb, --primary 18%, transparent)` | normal (over paper-grain) | **HOVER** | `.btn-audacious:hover` (= `primary-audacious` Button, the gold CTA) |
| **L7** | `btn-audacious` press ripple `::before` | `utilities.css:805-818` | `circle at center`, radius = `--ripple-radius` | `--primary-foreground 35%→18%`, radius 0→12rem | normal | **ACTIVE** (press) | `.btn-audacious::before` |
| **L8** | The uniform rim `--glass-edge-light` | token `tokens.css:757-758`; consumed `glass.css:340-350` | full-perimeter `inset 0 0 0 0.75px` ring (NOT radial) | `hsl(0 0% 100% / 0.18)` light / `0.10` dark | normal | **REST** | every material surface (`::after` box-shadow) |
| **L9** | `--glass-highlight` top-edge catch-light | token `tokens.css:727`; consumed in every `--glass-shadow-*` | `inset 0 0.5px 0 0` top-edge line (NOT radial) | `hsl(0 0% 100% / 0.25)` light / `0.08` dark | normal | **REST** | every glass tier's box-shadow |
| **L10** | `--glass-specular` interactive top-edge | token `tokens.css:742-743`; consumed `utilities.css:790` (btn-audacious hover), dock | `inset 0 1.5px 0 0` top-edge line (NOT radial) | `hsl(0 0% 100% / 0.45)` light / `0.30` dark | normal | **HOVER** (btn-audacious) | btn-audacious, dock primary |
| **L11** | Chromatic edge dispersion (`.glass-chromatic` opt-in) | token `tokens.css:780-784`; consumed `glass.css:586-590` | two directional `inset ±0.75px` rings (NOT radial) | `oklch(.92 .06 40 / .22)` warm + `oklch(.90 .05 230 / .16)` cool | normal | **REST** (opt-in class only) | `.glass-chromatic` |
| **L12** | Paper grain `::after` | `glass.css:313-328` | tiled SVG noise, full-bleed | `--glass-grain-opacity: 0.025` light / `0.045` dark | **overlay** (light) / **soft-light** (dark) | **REST** | every glass rung |
| **L13** | Dock shadow glow `--shadow-dock` | `tokens.css:574`; consumed `dock.css:142` | `0 0 20px` ambient (NOT radial fill — a drop glow) | `color-mix(srgb, --shadow-color 14%, transparent)` | normal | **REST** | `.glass-dock` shell |

### Notes per layer

- **L1 (moving specular).** Correct architecture, correctly dormant at rest (the W09 fix
  landed). Two live concerns remain: (1) the **`mix-blend-mode: screen`** lift on HOVER (0.22)
  is the "egregious specular hover" — `screen` over a light cream card is mathematically a
  brightening toward white that reads as a flash, especially because the warm-cream inner
  stop is `hsl(40 30% 96%)` (L=96%, nearly white) so `screen` pushes it to ~white. (2) the
  `circle at 50% 50%` *fallback* (when `--mouse-x/--mouse-y` are unset) is a **dead-centre**
  glow — any surface that carries the track class but is NOT pointer-wired blooms centrally
  the instant intensity > 0. Safari note: `screen`/`overlay` blend on a pseudo over a
  `backdrop-filter` host is a known Safari compositing-cost + occasional dark-fringe quirk;
  the hover lift is the place that bites.
- **L2 (curvature overlay) — the prime REST culprit on the chassis.** Pure white
  `hsl(0 0% 100% / 0.06)`, anchored `ellipse at 50% -20%` (centre, just above the top edge),
  fades to transparent at 60%. On a wide chassis this is a broad top-centre wash that reads as
  a diffuse central bloom — exactly the user's "muddy, not glassy." **Its dark arm is
  byte-identical** (`tokens.css:1698-1702` == light), so under `.dark` it reads HARDER over the
  deep canvas (the same unsoftened-dark defect W09 fixed for L1). This is the single most
  likely source of the "washes out the whole surface" on any chassis-bearing surface.
- **L3 (spine vignette).** Lower magnitude (8% phase-color, not pure white) and only on the
  `variant="spine"` chassis. A secondary contributor — phase-tinted, so during a speedtest run
  it carries the chart hue at the top-centre. Tone but do not necessarily remove; it is the
  one *correct* perceptual radial (low-α, perceptual oklab mix). Note: D12 flags the whole
  chassis for a possible retire — if the chassis goes, L2+L3 are mooted on that surface.
- **L4/L5 (dock primary corner radials) — the "corner-glow" of D11.** `30% 30%` is a hard
  top-left corner bias. At 18% mix of a saturated `--phase-color` (chart hues, C≈0.20) this is
  a loud corner hotspot on the dock's most prominent control. **L5 fires at REST whenever a
  phase is active** (during a speedtest run the primary dock pill carries `[data-phase]`), so
  this is a persistent corner bloom, not just a hover artefact. L4 is the hover twin.
- **L6 (btn-audacious).** The canonical source recipe L4/L5 mirror. Same `30% 30%` corner,
  same 18%, bound to `--primary`. The `primary-audacious` + the gold CTA buttons carry it on
  hover. Tone this ONE recipe and the dock primary inherits the discipline.
- **L8/L9/L10 (the edge lines + rim).** These are NOT radials — they are perimeter/top-edge
  inset lines. They are NOT the central bloom and the D11 note explicitly ratifies the rim
  (`--glass-edge-light`) as SOTA-correct. They DO contribute to overall white-load: L9
  (`--glass-highlight` at 0.25 light) is a fairly hot top-edge line and rides EVERY tier's
  `--glass-shadow-*`. For the "increase morphism, reduce wash" goal a modest trim of L9's α and
  a perceptual recolour (warm-cream over pure-white) is congruent, but it is secondary to L2/L4.
- **L12 (grain).** `overlay` blend at 0.025 is sub-perceptual at rest; not a bloom source, but
  the `overlay` blend over a light card slightly lifts mid-tones. Leave as is.
- **L13 (`--shadow-dock`).** A `0 0 20px` ambient drop-glow around the dock pill, not a
  surface-fill radial. Not the central bloom. Leave (or see the morphism note).

---

## 2. Ranked culprit list for the egregious central REST bloom

1. **L2 — chassis curvature overlay (`--glass-curvature-overlay`).** Pure-white, broad,
   top-centre-anchored, fires at REST on every chassis, byte-identical (unsoftened) dark arm.
   **#1 cause of "washes out the whole surface, muddy."** This is the layer to neutralise first.
2. **L5 — dock primary phase-halo `::before` (`30% 30%`, REST during a phase).** Saturated
   corner bloom that persists through a speedtest run on the most prominent dock control.
3. **L4/L6 — the `30% 30%` hover radials** (dock primary + btn-audacious). The hover-state
   corner-glow; L6 is the source recipe to tone once.
4. **L1 hover lift (the `screen`-blend moving specular at 0.22).** The "egregious specular
   HOVER" — fires on hover on every glass surface; the `screen` blend over near-white inner
   stop is the flash. (At rest it is correctly dormant — not a rest-bloom contributor.)
5. **L9 — `--glass-highlight` 0.25 top-edge line** (secondary white-load; not a bloom but
   part of the over-bright reading). Tune only as part of the morphism re-tune.
6. **L3 — spine vignette** (low-α, phase-tinted, spine-only). Tone, do not remove.

Everything else (L7 ripple, L8 rim, L10/L11 edge lines, L12 grain, L13 dock glow) is NOT a
central-bloom contributor and should be LEFT or only lightly re-tuned for the morphism pass.

---

## 3. Gestalt reduce/remove recommendation (token-first, no patch, no legacy)

The deepest gestalt: **the four fixed-and-moving radials (L1, L2, L4/L5/L6) are four
independent declarations of one "soft inner glow" idea.** W09 tokenised L1 into
`--glass-specular-intensity-*`. D19 should fold L2 and the L4/L5/L6 corner radials onto the
SAME token-first, warm-cream, dark-adaptive axis, then DRAMATICALLY reduce the magnitudes.
Concretely, ranked by impact:

### R1 — Neutralise the chassis curvature overlay (L2). [highest impact]
- Re-derive `--glass-curvature-overlay` (`tokens.css:789`) OFF pure white onto the warm-cream
  identity (`hsl(40 30% 96% / …)` — L<100% so the warm hue survives, mirroring the L1 core W09
  authored at `glass.css:120`), and **drop the inner alpha hard** (0.06 → ~0.02, or to 0 — the
  curvature illusion is decorative and is the prime bloom source). Consider replacing the broad
  `ellipse at 50% -20%, …, transparent 60%` with a tighter, lower top-edge sheen (e.g.
  `transparent 35-40%`) so it reads as an edge lift, not a central wash.
- **Soften the dark arm** (`tokens.css:1698`) to a genuinely LOWER α than light (today
  byte-identical — the unsoftened-dark defect). Under `screen`-adjacent compositing the dark
  arm must run softer.
- Route the strength through a **`--glass-curvature-intensity` token** so it joins the same
  overridable-magnitude axis (one knob, override on `:root`, never a buried literal). Default it
  near-zero; the chassis can opt up if D12 keeps the chassis.
- **If D12 retires the chassis**, L2+L3 are mooted on that surface — but the TOKEN re-tune
  still stands (any future consumer reads it).

### R2 — Demote the `30% 30%` corner radials (L4/L5/L6) to subtle. [high impact]
- Tone the 18% mix down (→ ~6-10%) AND **re-centre the anchor off the hard top-left corner**
  toward a softer near-edge or centre-biased ellipse, so it reads as a surface lift rather than
  a corner hotspot. The disco-CTA identity (a phase/primary-tinted hover lift) survives; the
  egregious corner glow does not.
- Bind the strength to the existing specular-intensity cohort (or a sibling token) so
  `btn-audacious` (L6) + dock-primary (L4/L5) share ONE overridable magnitude rather than two
  hardcoded `18%` literals. Tone L6 once → L4/L5 inherit the discipline.
- For L5 specifically (the REST phase-halo): drop its `opacity: 1` to a token-driven low value,
  or gate it so it does not bloom the corner for the whole run.

### R3 — Tame the moving-specular HOVER (L1). [the "egregious hover" fix]
- The hover intensity 0.22 over a `mix-blend-mode: screen` near-white inner stop is the flash.
  Two coherent options, both token-first:
  - Drop `--glass-specular-intensity-hover` (`tokens.css:1826`) to ~0.12-0.14 (and active
    ~0.18-0.20), keeping rest at 0. This halves the hover lift.
  - AND/OR lower the inner-stop lightness of the warm-cream core (`glass.css:120`,
    `hsl(40 30% 96%)` → `hsl(40 35% 90-92%)`) so `screen` does not push it to white. A
    less-than-96%-L core under `screen` reads as a warm lens, not a white flash.
- **Safari note:** keep `screen` (it is the correct illuminate-from-within blend) but the lower
  magnitudes reduce the Safari compositing cost + the dark-fringe risk on the pseudo. Verify the
  `-webkit-` prefixing is intact (it is single-sourced via the build pipeline per the glass.css
  comment) and that the `mask-image` has its no-support fallback (it does — `inset:0` + radius).

### R4 — Morphism re-tune (the "increase liquid-glass morphism throughout" ask). [coherent fold]
- Reducing the white-bloom layers (R1-R3) ALREADY reads as "more glassy, less muddy" because the
  backdrop-filter refraction is what the bloom was washing out. To push morphism further without
  re-introducing bloom:
  - Modestly trim L9 `--glass-highlight` α (0.25 → ~0.16-0.18 light) and optionally warm-cream
    it, so the top-edge line stops over-brightening the surface.
  - The blur ladder (`--glass-blur-*` + `saturate()` at `tokens.css:667-670`) is the morphism
    knob — the refraction/saturation is what reads as liquid glass. Verify it is not being
    eaten by the opaque-bloom; once the bloom is reduced the existing blur reads stronger. No
    new mechanism needed.
- The button HOVER smoothing + animation tuning are out of this lane's scope (glass-material),
  but the source for the orchestrator: button scale-hover transition rides
  `var(--spring-snappy)` (`glass.css:412`, button base `tap-squish` at `index.ts:22`); the
  "not smooth enough" is a spring/duration question (`--spring-snappy` overshoots to 1.068 —
  `--spring-smooth` or `--spring-gentle` is the calmer register), handled by the
  motion/animation lane. Cross-ref only.

### R5 — One radial-glow magnitude axis (the deepest gestalt).
- Fold L1 + L2 + L4/L5/L6 onto ONE token family: the existing `--glass-specular-intensity-*`
  cohort + a `--glass-curvature-intensity` sibling + a `--glass-corner-glow-intensity` sibling
  (or reuse the cohort). The whole radial-glow family becomes one overridable, dark-adaptive,
  warm-cream ladder — never N buried pure-white/saturated literals at N anchors. This is the
  W09 "one specular owner per surface" precept applied library-wide.

**House-rule compliance:** all re-tunes are token-routed (`color-mix in srgb` for alpha per the
in-srgb house decision; warm-cream `hsl(40 30% 96%)` per the W09 precedent; a `.dark` arm that
actually softens). No `hsl(var(--token))` double-wrap. No new magic literal, no per-component
patch. The radials that stay (rim L8, edge lines, ripple) are untouched.

---

## 4. Exact LIVE checks for the orchestrator (chrome-devtools-mcp @ localhost:5173)

The diagnosis predicts: at REST on a default card the bloom is the CHASSIS curvature (L2) and,
during a run, the dock corner radials (L4/L5). The moving specular is dormant at rest and only
bites on HOVER. Verify:

1. **Confirm L1 is dormant at rest.** On a default `<Card>` / a MetricCell (`/data/metric-cell`),
   `getComputedStyle(el::before).opacity` should be `0` and the element should NOT have class
   `glass-specular-track`. If it IS armed/painting, a consumer override of
   `--glass-specular-intensity-rest` is the culprit — grep the live computed value.
2. **Isolate L2 (chassis curvature).** On a surface that shows the bloom, check whether it is an
   `.instrument-chassis`. Temporarily set `--glass-curvature-overlay: none` via devtools and
   confirm the central wash disappears. If it does → L2 is THE rest-bloom source (expected).
3. **Isolate L4/L5 (dock corner).** Trigger a phase (`[data-phase]` on the dock primary pill, or
   hover it) and confirm a top-LEFT corner hotspot appears (`30% 30%`). Set the
   `radial-gradient` mix % to 6% and confirm it reads subtle.
4. **Reproduce the egregious HOVER (L1).** Hover a glass surface that carries the moving specular
   (a Button `variant="glass"`, the dock `.dock-icon-button`) and observe the `screen`-blend
   white flash at `--glass-specular-intensity-hover: 0.22`. Drop it to 0.12 live and confirm the
   flash calms.
5. **Dark-mode L2.** Toggle `.dark` and confirm the curvature overlay reads HARDER (the
   byte-identical dark arm) — this validates the unsoftened-dark fix is needed.
6. **Safari parity (manual / WebKit run if available).** Verify the `screen`/`overlay`
   blend-mode pseudos do not dark-fringe over the `backdrop-filter` host, and the
   `-webkit-backdrop-filter` is present in the computed style. The `@property`-var-in-hsl-alpha
   trap is already avoided (L1 drives `opacity`, not a nested-var alpha) — confirm it stays so.

---

## 5. Verification trail (file:line)

- `Card.vue:74` — default `specular: "off"`; `:140` — `glass-specular-track` emitted only when armed; `:94-96` — the `full` ladder (rest 0.08), never used in-repo.
- `MetricCell.vue:94,98` — `.glass-wash` (speedtest tile surface).
- `glass.css:80-141` — moving specular `::before` (L1); `:118-123` warm-cream radial; `:124` `opacity: --specular-intensity`; `:134` `mix-blend-mode: screen`; `:164-185` hover/active lift.
- `tokens.css:1825-1827` — specular intensity cohort (rest 0 / hover 0.22 / active 0.32); `:1833-1834` dark arm.
- `tokens.css:789-793` — `--glass-curvature-overlay` PURE WHITE (L2); `:1698-1702` byte-identical dark arm.
- `instrument-chassis.css:38, :83` — curvature overlay composed at REST, "persists at all phases" (`:4-6`).
- `tokens.css:870-874` — spine vignette (L3); `instrument-chassis.css:135` — consumed (spine variant).
- `dock-controls.css:303-311` — dock primary hover radial `30% 30%` 18% (L4); `:324-343` — REST phase-halo `::before` `30% 30%` 18% `opacity:1` (L5).
- `utilities.css:782-786` — `btn-audacious` hover radial `30% 30%` 18% (L6, source recipe); `:805-818` — press ripple (L7).
- `tokens.css:757-758` — `--glass-edge-light` rim (L8, NOT radial, SOTA-correct); `:727` `--glass-highlight` 0.25 (L9); `:742-743` `--glass-specular` 0.45 (L10); `:780-784` chromatic dispersion (L11).
- `glass.css:313-328` — grain `::after` (L12); `tokens.css:574` `--shadow-dock` (L13); `dock.css:136,142` — dock shell flat bg + edge rim (NO always-on radial).
- `glass-specular-track.css` — thin alias, NO duplicate `::before` body (a11y brackets only).
- D11 convergence note (`docs/tranches/AX/audit/convergence/D11.md`) — the corner-glow family isolation D19 escalates.
