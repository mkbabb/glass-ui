# BA fleet lane — disco-hover (R8-18)

> "Remove the disco effect everywhere. And smooth out the hover animations."

AUDIT-ONLY. Live-probed :5199 (`/display/buttons`, 6 audacious buttons present + firing).
Evidence: `disco-hover-audacious-row.png` (banked beside this report) + the ground capture
`../ground/R8-18-disco-hover.png` (the "Start building" hero CTA at rest).

---

## Part A — the disco census (the RETIREMENT SET, file:line)

The "disco effect" is ONE recipe family: `@utility btn-audacious` + its `btn-audacious-gold`
extension + the dock-tab-button PRIMARY-tier re-implementation. Three composed marks fire on
hover: (1) a **sparkle glyph** (`✦` swept diagonally via the `sparkle-sweep` keyframe), (2) a
**disco-grain** texture overlay (`--paper-clean-texture` blended over a `--primary`/`--phase-color`
radial), (3) a **specular-swap** box-shadow. There is also an always-running **press-ripple**
(`--ripple-radius`) bundled into the same utility.

### A1 — the canonical recipe (the source of all disco)
| site | file:line | what fires |
|---|---|---|
| `@utility btn-audacious` | `src/styles/utilities/btn.css:92-197` | the whole disco: `::after` sparkle glyph (`content:"✦"`, L163-175) animated by `sparkle-sweep` on hover (L177-181); the hover disco-grain `background-image: var(--paper-clean-texture), radial-gradient(...)` (L112-125); the specular-swap box-shadow (L122-124); the `::before` press-ripple (L138-158). |
| `@utility btn-audacious-gold` | `src/styles/utilities/btn.css:218-271` | extends the above with the gold-sweep shimmer (`btn-gold-bg-sweep` infinite keyframe on hover, L266-270) + an at-rest 8%-gold tint (L221-227). |
| `@keyframes sparkle-sweep` | `src/styles/animations.css:151-164` (+ PRM stub L166-170) | the diagonal star sweep keyframe (translate -30%→180% + scale + opacity pulse). |
| `@keyframes btn-gold-bg-sweep` | `src/styles/utilities/btn.css:277-280` | the gold background-position sweep. |
| `--duration-sparkle: 600ms` | `src/styles/tokens/scheme-motion.css:78` | the sparkle timing knob. |
| `--glass-grain-opacity-disco: 0.08` | `src/styles/tokens/glass.css:156` | the disco-grain opacity knob (dock tier). |

### A2 — the dock re-implementation (a SECOND disco surface, not via the utility)
| site | file:line | what fires |
|---|---|---|
| `.dock-tab-button[data-tier="primary"]` | `src/styles/dock-controls/tab-button.css:106-138` | the dock-local disco: hover sets `--glass-grain-opacity: var(--glass-grain-opacity-disco)` + the same `--paper-clean-texture` + `--phase-color` radial grain (L123-138); a `[data-phase]` `::before` rest-halo (L154-173). The base `<DockTabButton>` auto-attaches `btn-audacious` when `data-tier="primary"` (`src/components/custom/dock/DockTabButton.vue:36`), so this surface gets BOTH the utility disco AND the dock-local phase grain. |

### A3 — the variant + consumer footprint (what the retirement touches)
| site | file:line | role |
|---|---|---|
| Button `primary-audacious` variant | `src/components/ui/button/index.ts:44-45` | composes `btn-audacious`. |
| Button `gold-audacious` variant | `src/components/ui/button/index.ts:51-52` | composes `btn-audacious btn-audacious-gold`. |
| hero "Start building" CTA (the R8-18 capture) | `demo/stories/compositions/hero.vue:171` | `variant="primary-audacious"`. |
| gate-pattern CTAs (×2) | `demo/stories/compositions/gate-pattern.vue:100,155` | `variant="primary-audacious"`. |
| aurora "apply"/palette CTAs (×2) | `demo/stories/aurora/sections/AuroraColorSection.vue:217`, `demo/stories/aurora/config/PaletteLayer.vue:150` | `variant="primary-audacious"`. |
| buttons story demo row (×6 live) | `demo/stories/display/buttons.vue:61-63` | the showcase grid — live-confirmed: all 6 carry the `✦` `::after` (`content:"✦"`, `rgba(255,255,255,0.7)`) + the `--ripple-radius` transition. |
| instrument-chassis primary action | `demo/stories/compositions/instrument-chassis.vue:220` | `<DockTabButton data-tier="primary">` (the A2 dock disco). |

**Live readback (binding):** at `/display/buttons`, 6 `[class*=btn-audacious]` elements, every one
with `::after { content: "✦"; color: rgba(255,255,255,0.7) }` and the press-ripple transition leg
`--ripple-radius 0.34s`. The sparkle glyph color is hardcoded white (`btn.css:168`) — mode-invariant,
so the disco reads identically in light and dark.

### A4 — out of scope (NOT disco; do not retire under R8-18)
- `.gold-shimmer` text utility (`src/styles/utilities/base.css:335-345`) — a STATIC brand HEADLINE
  gradient (the "Complete!" lift), background-clip text, not a hover disco. A separate "shimmer"
  family member; flag for scope-disambiguation but it is editorial typography, not the button disco.
- `rainbow-vivid`/`rainbow-pastel` (`btn.css:305-329`) — keyframes.js transport-chrome gradients,
  a different consumer; not the disco grain.
- `.glass-specular-track` / the specular gleam on every dock control — that is the liquid-glass
  catch-light register (the GOOD pop), distinct from the sparkle/grain disco. Do NOT remove.

### What the de-disco'd audacious CTA BECOMES (design diagnosis)
The user's R8 cluster is consistently "more iOS, more glassy, de-red, calmer". The audacious CTA
should collapse onto the EXISTING glass-first button register: drop the sparkle glyph + the disco-grain
texture overlay + the sparkle-sweep/gold-bg-sweep keyframes entirely. What legitimately SURVIVES is the
**specular catch-light backplate** (`--glass-specular` top-edge gleam — the liquid-glass pop the rest
of the library already speaks) and a **restrained gold tint** for the CTA-emphasis register (the
`gold-audacious` warm-glass identity, minus the animated sweep). The press-ripple (`--ripple-radius`)
is a tasteful affordance, not disco — keep or fold into the §6 press-scale, designer's call. Net: the
`primary-audacious`/`gold-audacious` variants reduce to "glass button + optional warm-gold tint +
specular gleam", and `btn-audacious`/`btn-audacious-gold` + the two sparkle keyframes + the
`--duration-sparkle`/`--glass-grain-opacity-disco` knobs RETIRE. The dock-tab PRIMARY-tier grain
(A2) collapses onto the plain dock-control glass hover register.

---

## Part B — the hover-smoothness audit (§6 easing doctrine)

The §6 doctrine (CLAUDE.md + `scheme-motion.css §2`): surface props (bg/border/color/box-shadow/
opacity) → bezier `--ease-standard`; transform (scale/translate) → `--spring-smooth`; ONE coherent
glide, never a fast-color-snap-then-slow-spring desync.

**The good news (live-confirmed):** the CORE registers are §6-disciplined and DO NOT snap/jitter.
- `.dock-icon-button` — `transitionProperty: background-color,border-color,box-shadow,color,opacity,scale`
  all `0.2s`, surface legs on `cubic-bezier(0.4,0,0.2,1)` (the bezier), scale on its own leg. Clean.
- `.btn-pill` / `.tap-squish` / `.glass-btn` / `btn-interactive` — surface→bezier, scale→`--spring-smooth`,
  the AX.W52 cascade-clobber bug already fixed (`surfaces.css:138-145`). Clean.
- NO `transition: all` / `transition-all` anywhere in src or demo (the jitter classic — absent). Clean.

So the user's "smooth out the hover animations" is NOT a global desync — it is localized to two seams:

### B1 — the toggle-chip flat-snap register (mechanical, §6 divergence)
`src/components/custom/toggle-chip/index.ts:19` — the chip base carries
`transition-colors duration-150 ease-out`. THREE divergences from §6: (1) `duration-150` is a
HARDCODED 150ms off the canonical `--duration-fast` (200ms) token — faster than every sibling control,
so a chip in a grid next to a dock control or button hover-flips at a visibly different tempo (the
"jittery/inconsistent" read when chips and controls coexist, e.g. the goo/aurora configurator chip
rows); (2) `transition-colors` only — NO scale leg and NO box-shadow leg, so the chip COLOR-snaps with
no lift while every neighboring interactive atom lifts on `--spring-smooth` (the chip reads dead/flat
by comparison — ties to R8-13 "uninteresting"); (3) the timing-function is a raw `ease-out` literal,
not the `--ease-standard` token. This is the chip register the goo/aurora studios' `<ToggleChip>` grids
use, so it is in the direct blast radius of the R8-7 "hover far too quick and jittery" report.

### B2 — the goo-studio jitter (COORDINATION NOTE — owned by lane goo-studio, not duplicated here)
R8-7 "the hover over effects are far too quick and jittery" on the goo configurator is TWO sources:
(a) the WebGL **blob pointer follow** (`useBlobPointer` critically-damped `response:0.18`,
`src/components/custom/goo-blob/types.ts:170`) + the per-mood `orbitSpeedScale`/`wobbleScale`/`pulseFreq`
energy ramps (`constants.ts:66-70`) — the renderer-side jitter, **lane goo-studio's territory**; and
(b) the configurator CONTROL hovers, which inherit B1's `toggle-chip` 150ms flat-snap + the dock-control
register. The CSS half of (b) is THIS lane's B1 finding; the renderer half (a) and the broken-controls
defect (R8-7 "labels with no controls") belong to lane goo-studio. Flagged for the synthesis to
reconcile the two without double-counting.

### B3 — the audacious hover IS part of the smoothness complaint
Once the disco (Part A) is removed, the audacious hover stops being a multi-layer texture+sparkle+
shadow swap (which is inherently busy/"disco") and becomes a single coherent §6 glass glide. So Part A
and "smooth out the hover" are the SAME fix from the user's lens — the disco IS the un-smooth hover on
the CTA register. Removing it satisfies both halves of R8-18 on the CTA surface.

---

## Remedy direction (gestalt — no implementation)
1. **Retire the disco recipe family** (A1 + A2): delete `btn-audacious`/`btn-audacious-gold` + the
   `sparkle-sweep`/`btn-gold-bg-sweep` keyframes + the `--duration-sparkle`/`--glass-grain-opacity-disco`
   knobs + the dock-tab PRIMARY-tier grain. Collapse `primary-audacious`/`gold-audacious` onto the
   glass-first button register (glass + optional warm-gold tint + `--glass-specular` gleam). Clean break,
   no alias (house no-backwards-compat).
2. **Unify the chip hover register onto §6** (B1): re-point `toggle-chip` off the hardcoded
   `transition-colors duration-150 ease-out` onto the canonical `--duration-fast`/`--ease-standard`
   surface legs + the `--spring-smooth` scale lift the rest of the interactive family already speaks,
   so a chip lifts and times identically to its neighbors. The chip becomes alive instead of a flat snap.
3. **Coordinate B2 with lane goo-studio** — the renderer jitter + the broken goo controls are theirs;
   this lane delivers the CSS chip/hover register fix that the studio configurator inherits.
