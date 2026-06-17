# BB.W-GLASS-ACCENT — DELTA (the per-INSTANCE chromatic-rim axis: `--glass-accent` + `--glass-accent-strength`)

**Wave**: BB.W-GLASS-ACCENT (Batch L) · **Branch**: tranche/BB · **Date**: 2026-06-17
**HEAD**: `d02b153a` (the wave's RE-GROUND base — the spec's defect-table cite `6c8eb429` had advanced across the Batch-L siblings; drift table below)
**Dev-box**: darwin 25.4.0 (arm64) · **Chromium**: Playwright 1.60.0 (chromium-headless-new + coarse-touch) · **Node**: v26.0.0
**Gate**: `proof:glass-accent` born-RED → GREEN (W1 rim+catch-light OKLab mix · W2 @property no-op floor · W3 ≥2 per-instance consumers + distinct-axis fence) + `--self-test` bite GREEN. No-regress: `proof:glass-cohesion`, `proof:glass-level`, `proof:glass-cal`, `proof:adaptive-glass`, `proof:dark-material` all GREEN after the rim/material edits (the additive-over-the-axes proof). `proof:visual-runner` enrollment GREEN (the new spec auto-enrolled: disk-non-private 99 | enrolled 95 | orphans 0).

## §0 RE-GROUND — drift at HEAD (recorded, never re-diagnosed)

The spec cited HEAD `6c8eb429`; the wave executed against `d02b153a` (the Batch-L siblings — incl. W-LENSING, the critical coordination — landed first). Every §0 cite re-grepped at `d02b153a`; the MECHANISMS held, the line numbers drifted:

| cite (spec) | HEAD `d02b153a` | note |
|---|---|---|
| ACCENT-NET-NEW `grep -rn 'glass-accent' src/` → ZERO | ZERO across ladder/material/property-regs + the consumer | EXACT — the net-new mint confirmed empty |
| RIM-SEAM `ladder.css:367-372` (`--glass-material-rim`/`--glass-edge-light` group) | the unified rim group at `ladder.css:412-432` (`--glass-material-rim: var(--glass-edge-light)` at :431) | drifted +~60 lines (Batch-L W-LIQUIDHOVER grain-engage block inserted above) |
| RIM-SEAM per-rung border `ladder.css:40-111` | the five rungs at :41-118 (`border: 1px solid var(--glass-border-RUNG)`) | EXACT region, +~7 |
| SPECULAR-CORE `material.css:120-124` (warm-cream `hsl(40 35% 92%)` `::before` core) | **W-LENSING LANDED** — the `::before` `background` is now a TWO-layer compose (conic edge-glint + radial disc) at `material.css:120-133`, BOTH on warm-cream `hsl(40 35% 92%)` (the conic 4 stops + radial 3 stops); `.glass-lens` + `--glass-refract` swell + `--specular-angle` reg all present | the W-LENSING coordination — the accent composes the ONE warm-cream core, NOT a second layer (recorded below) |
| W55-DISTINCT `ladder.css:38-109,142-143,201-202` | the W55 `color-mix(in oklab, …, --glass-tint-source --glass-tint-strength)` background at the rungs (:43/63/74/100/114) + the bright-bucket `@container` (:139-157) + the overlay self-engage (:205-209) | EXACT mechanism — the accent NEVER touches this cohort (the distinct-axis fence) |
| PROPERTY-REGS `property-regs.css:76-92` (specular cohort) + `:108-115` (`--glass-level`) | the specular cohort at :76-105 (incl. the new W-LENSING `--specular-angle` :101 + `--glass-refract` :119), `--glass-level` at :142 | drifted; the accent regs land before `--glass-level` |

## The W-LENSING coordination (the §Dependencies `::before`-ownership point)

W-LENSING's `::before` mint landed FIRST (this wave's `.2` sequenced after it, per the DAG). The resolved catch-light at `material.css:120-133` is the TWO-layer `background`: a `conic-gradient(from var(--specular-angle) …)` edge-glint (the angle-keyed rim sweep) over a `radial-gradient(circle var(--glass-specular-size) at var(--specular-x) var(--specular-y) …)` centered disc, BOTH painted in warm-cream `hsl(40 35% 92%)`, masked to the rim band + the disc clip, composited `plus-lighter`.

**The accent composes the ONE core color — NOT a second layer (the §4.3 fork avoided).** This wave introduces `--glass-specular-core: color-mix(in oklab, hsl(40 35% 92%), var(--glass-accent) var(--glass-accent-strength))` at the head of the `::before` block and re-points EVERY gradient stop to read `var(--glass-specular-core)` (reproducing each stop's original alpha via `color-mix(in srgb, var(--glass-specular-core) N%, transparent)` ≡ the prior `hsl(40 35% 92% / 0.NN)`). The COLOR is the accent's; the GEOMETRY (the conic angle, the radial position/size, the masks, the blend) is W-LENSING's, byte-untouched. Tinting the ONE core tints BOTH the centered disc AND the rim glint — so the data hue reads at the glint where the pointer grazes (the data-keyed colored catch-light). No collision with W-LENSING's edge-glint geometry; the two are file-LINE-disjoint (the core-var declaration is a NEW line at the block head; the geometry lines are unchanged but for the per-stop color token re-point). The §Triumvirate catch-light-ownership trigger did NOT fire — a clean core-color composite held in ONE iteration.

## The byte-identical-at-0% floor (the W2 neutral-fallback bite)

The provable no-op holds by construction — the §Triumvirate neutral-fallback trigger did NOT fire:

- `--glass-accent` `@property` `initial-value: transparent` (the NEUTRAL identity). `color-mix(in oklab, X, transparent 0%)` resolves byte-identical to `X` — the engine evaluates a 0%-weight mix as the first color verbatim. The chosen `transparent` identity is the cleanest provable no-op (the spec's recommended path).
- `--glass-accent-strength` `@property` `initial-value: 0%`. The mix weight is the strength, so at the default an UNSET surface paints exactly today's rim + catch-light.
- **The rim ring**: `--glass-material-rim` rebuilds `inset 0 0 0 0.75px color-mix(in oklab, var(--glass-rim-ink), var(--glass-accent) 0%)` ≡ `inset 0 0 0 0.75px var(--glass-rim-ink)`. `--glass-rim-ink` resolves to the SAME stop the `--glass-edge-light` token carries (`hsl(0 0% 100% / 0.18)` light, re-pointed to `0.22` in the `.dark` arm to match `--glass-edge-light-dark`) — byte-identical to `var(--glass-edge-light)` at rest.
- **The rim border**: each rung sets `--glass-border-rung: var(--glass-border-RUNG)` and reads `border: 1px solid var(--glass-border-accent)` where `--glass-border-accent: color-mix(in oklab, var(--glass-border-rung), var(--glass-accent) 0%)` ≡ the un-mixed rung ink.
- **The catch-light core**: `--glass-specular-core: color-mix(in oklab, hsl(40 35% 92%), var(--glass-accent) 0%)` ≡ `hsl(40 35% 92%)` — the warm-cream identity preserved (the W5 PRESERVE row).

No `@supports`/strength-gate fallback was needed — the `transparent` identity is the pure-CSS no-op.

## The distinct-axis fence (the W55 not-a-fork)

Three disjoint glass axes after this wave: **LEVEL** (opacity+blur, AX.W54) · **TINT** (whole-plate legibility darken toward `--glass-tint-ink`, W55) · **ACCENT** (per-instance chromatic rim+glint toward a consumer DATA hue, this wave). The accent NEVER writes the `--glass-tint-source`/`--glass-tint-strength` cohort and NEVER tints the plate BACKGROUND (`proof:glass-accent` W3 `w55Fork`/`bgAccent` asserts both `none ✓`). The mix is `in oklab` (the perceptual glass-tint family); the in-srgb fence is the `--surface-tint-*` brand-overlay family, untouched. The §Triumvirate W55-collision trigger did NOT fire.

The bounded strength: the demo specimens engage `48%` — a rim WHISPER (the rim/glint reads the hue while the warm-cream core + the AA legibility survive). The knob is unbounded by `@property` type (`<percentage>`) but the consumer-set ceiling is a whisper by demo convention (the `--glass-tint-strength-aa` ≤24% bounding precedent, lifted here because the accent rides the THIN rim/glint, not the whole plate). The §Triumvirate flooded-plate trigger did NOT fire.

## π readback (clause 4 — the BINDING visual truth, LOCAL-ONLY real-GPU/CDP)

The local `--run pi` arm is born-RED to the W-REFLECT3 (Batch 7) close, per the AY W-LIVE1 split (the device-free W1-W3 source clauses carry `ci`; the OKLab rim/catch-light readback + the byte-identical paired diff need a real Chromium GPU). `tests-visual/glass-accent.spec.ts` (the enrolled π) asserts, at ≥2 viewports × both modes, over a busy backdrop, off the LIVE painted DOM:

- **(a) ACCENT ON** — a `.glass-floating` plate with `--glass-accent: oklch(0.62 0.2 295); --glass-accent-strength: 48%` reads the consumer hue at the RIM (the resolved `border-top-color` OKLab chroma clears `> OFF + 0.02`) AND at the `::before` catch-light CORE (the resolved `::before` background differs from the unset core — the hue entered the mix).
- **(b) ACCENT OFF** — the SAME plate UNSET reads the achromatic warm-ink rim (chroma `< 0.05` — the byte-identical neutral fallback; a paired diff shows ZERO chromatic delta).
- **(c) PER-INSTANCE** — two sibling plates (violet vs teal) resolve DISTINCT rim colors, each chromatic (`> 0.02`) — the per-instance proof.
- **The demo witness** — the `/substrates/glass-material` story renders ≥2 `[data-accent-swatch]` per-instance specimens (the W3 consumer bar).

Capture (to be attached at the local run / W-REFLECT3): `glass-accent-on-off-{light,dark}.png` (the accent ON/OFF on/off contrast device + the swatch grid, full ShowcaseFrame over the live aurora).

## Clause 5 — the `proof:ba-gestalt` glass-band verdict

The glass band (the accented data-hue swatch grid + the unset neutral plate beside them + the on/off accent device) is captured whole-page, BOTH modes, over the live aurora substrate, judged as a designed gestalt: "does the accented surface read as a glass plate whose rim + catch-light carry the datum's color — a coherent data-keyed glow — while the unset surface beside it reads exactly as today's warm-cream glass, as a page?" Per-mechanism W1-W3 greens do NOT close this visual wave alone. The verdict is recorded on the `docs/tranches/BB/audit/reflect/ba-gestalt-roster.md` glass surface at W-REFLECT2 (Batch 7 — the single authorized verdict-flipper); this wave leaves the source GREEN + the π enrolled, the gestalt verdict owed to the reflection.

## The consumer fold (the §F1 one-line seam)

The §F1 data-keyed colored hover is now a ONE-LINE seam: `--glass-accent: <datum-hue>; --glass-accent-strength: <N%>` on the instance, instead of a hand-threaded `border-color` + inline catch-light per consumer (the N-pastes-of-one-recipe anti-pattern `<IconChip>` collapsed for the section-color POP). The Atlas's hand-rolled accent threading collapses onto this seam on its `^4.1.0` pin bump (the by-name W-CONSUMER-MODERNIZE fold, Batch 3 — NOT this wave; the live binary consumer at HEAD is the demo witness). The axis is ADDITIVE — no public-surface retirement.

## The rim-seam sequence (W-METAL-SHIMMER blocks ON this)

This wave is sequenced FIRST of the Batch-L rim-seam owners: it mints the `--glass-accent` rim seam (the `--glass-material-rim` ring + the `--glass-border-accent` border). W-METAL-SHIMMER's `.metal-rainbow-rim` variant COMPOSES this seam (the EXECUTION-DAG rim-ownership order). The rim seam left CLEAN: `--glass-material-rim` is a single `inset 0 0 0 0.75px <accent-composed-ink>` declaration on the material group; `--glass-border-accent` is the single accent-composed border token; both are ready for a metallic-rim consumer to ride.
