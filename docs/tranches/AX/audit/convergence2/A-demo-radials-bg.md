# A-demo-radials-bg — Pulse radial (P6) + demo hero radials → aurora/constellation (P7)

**Lane** convergence-2 audit · **Severity** major · **HEAD** 5cf2980 (3.8.0+W52)
**Charter** USER-DEFECTS pass-2 P6 (pulse radial too egregious) + P7 (heros should
leverage an Aurora with the page's colors OR a Constellation instead of hand-rolled
radials). Cross-ref W47 (aurora preset roster), W17 (constellation), W18/W40 (demo IA).

---

## Verdict

**net-new-wave** — no existing wave owns P6 or P7. The dedup sweep is conclusive:

- **W47** is aurora PRESET-ROSTER naming only (`demo/stories/aurora/presets.ts`
  label/medium reconcile) — it never touches a demo page's hero `backgroundImage`,
  and explicitly falls between W13/W10/W38 which all EXCLUDE the hero radials.
- **W17** (constellation) shipped the `<Constellation>` component + tokens + the
  `drawOverlay`/warp seam + a `substrates/constellation.vue` demo. Its only named
  consumer-adoption is **slides** (W30). It does NOT adopt constellation as a demo
  hero/page background anywhere.
- **W18** (storybook IA) is tree STRUCTURE only — folds the blob trio to one row,
  mints the first-class `dock` category, surfaces fourier-field. Its FileBounds
  EXCLUDE story-page `<style>`/`backgroundImage` content; it frames the surviving
  set, it does not re-author page heros.
- **W40** (demo-shell dock-nav) is the demo nav SHELL + the coherence gates
  (`animation-coherence`/`design-md-current`/`naming-consistency`). Its "Do NOT
  touch" list bars story-page content; it navigates the IA, never re-authors a hero.
- **W09 / W52** radial-gradient hits are the GLASS specular/curvature radials
  (`glass.css`, `utilities.css` btn-audacious) — a different radial family, not the
  demo hero washes nor the pulse aura.

Both P6 and P7 are unowned. Mint **W53 — demo radial-background reauthor + Pulse
aura calm** (single wave; P6 is a 1-token-default tune on a shipped primitive, P7 is
the demo-side adoption of the two shipped background substrates — same "stop
hand-rolling radials, adopt the shipped substrate" gestalt, same demo author lane).

---

## P6 — the pulse radial (SOURCE)

`src/components/custom/pulse/Pulse.vue:152-171` — the `aura` variant. The radial is:

```css
.pulse-aura {
    background: radial-gradient(
        ellipse at 50% 50%,
        color-mix(in srgb, var(--pulse-aura-color, currentColor) var(--pulse-aura-opacity-pct, 55%), transparent) 0%,
        color-mix(in srgb, var(--pulse-aura-color, currentColor) calc(var(--pulse-aura-opacity-pct-num, 55) * 0.35 * 1%), transparent) 45%,
        transparent 75%
    );
    opacity: var(--pulse-aura-opacity-min, 0.55);   /* :164 */
}
```

**The egregiousness is doubly-stacked and entirely default-driven** (no consumer
ever overrides the knobs — the demo `pulse.vue:71-86` mounts bare `<Pulse
variant="aura">`):

1. **Center stop 55%** color-mix of `currentColor` — at a `text-viz-fourier`
   (saturated red/blue/green) currentColor this is a near-opaque dense disc, not an
   ambient halo. The `0.35`-of-55% mid stop (~19%) at 45% keeps the disc DENSE out
   to nearly half-radius before any falloff.
2. **And THEN multiplied by `opacity: 0.55`** on the element. So the perceived
   center is 55%×0.55 ≈ 30% solid `currentColor` — but over a small surface-scoped
   element this reads as a hard glowing blob, the "far too egregious radial" the
   user flagged. The breath animation (`ambient-pulse`, scale 1→1.15) makes the
   dense disc throb, amplifying the read.

The `--pulse-aura-opacity-pct-num`/`--pulse-aura-opacity-pct` SPLIT is also a
maintenance trap — two tokens (a raw number and a percent) must be hand-kept in
sync for the two color-mix stops; a consumer overriding one and not the other
desyncs the falloff. (Overfitting-adjacent: the duplicated knob.)

**Gestalt fix (token-first, GESTALT not patch):** re-baseline the aura as an
AMBIENT halo, not a glowing disc. Drop the center stop default to ~`22%` and the
falloff start earlier (mid stop ~8% at 35%, transparent by ~70%), and the element
`opacity` to ~`0.4`. Collapse the `--pulse-aura-opacity-pct` / `-pct-num` twin into
ONE `--pulse-aura-strength` scalar the two stops both derive via `calc()` (kill the
desync trap — single source). The result is a quiet breathing wash that reads as
ambient, with the loud `vivid` intensity available as the explicit celebratory opt-in.
The `intensity` prop's `vivid` then becomes the path to the OLD loud read for a
consumer who wants it — opt-in, not default. Zero new tokens net (one collapse).

The default `--animate-ambient-pulse-scale-max` 1.15 breath is fine; the problem is
purely the gradient DENSITY × element opacity, both fixed at the source.

---

## P7 — hand-rolled hero radials (SOURCE inventory + the aurora/constellation map)

Nine demo sites paint hand-rolled multi-stop radial washes. They split into THREE
classes — only one class is the P7 target (replace with a shipped substrate); the
other two are correct-as-is and must NOT be churned.

### Class A — REPLACE with `<Aurora>` (the painterly hero washes; the P7 target)

These are decorative pastel-bloom heros that hand-roll exactly what the shipped
`<Aurora>` paints (a warm multi-nucleus painterly wash). `<Aurora>` is a drop-in
background: it accepts a `config` (palette from the page's own colors), has a
`renderMode="css"` fallback (the `paletteToCssGradient` placeholder — so a no-GL
route still gets the wash, no regression vs the static radial), and an
`opacityCeiling` for quiet content-over-wash routes. The page-color seam already
exists — every hero reads `--section-color-*` (`tokens.css:497-506`, the OKLCh
section ramp); feed those same stops into the Aurora `config.palette` so the wash
keeps the page's identity colors but becomes a LIVE painterly drift.

| Site | Line | Current radial | → Aurora config |
|---|---|---|---|
| `compositions/hero.vue` | `:71-89` | 3 ellipses, `--section-color-0/2/5` | rose/indigo/amber palette, `opacityCeiling:0.6` (text-dense hero) |
| `foundations/intro.vue` | `:25` | 3 ellipses, `--section-color-0/2/5`, `hue-rotate` filter | same palette; the `--hue-shift` filter rides the live canvas |
| `foundations/paper-glass.vue` | `:139` | 3 ellipses, `--section-color-5/2/0` | amber/indigo/rose palette behind the paper-vs-glass tour |
| `substrates/aurora.vue` | `:138-145` | 3-ellipse `--rainbow-pastel-*` bloom BEHIND the aurora frame | **DECISION — see note** |

**`substrates/aurora.vue:138-145` note:** this radial is the decorative bloom
*behind the inline aurora-studio frame* (a `-z-10 blur-2xl` wash). Replacing it with
a second live `<Aurora>` would mount two GL contexts on the same page (the studio
stage + the backdrop) — reject on the WebGL-context budget (the W16/W18 incident
class). KEEP this one as a static radial OR route it to `renderMode="css"` Aurora
(zero GL, the CSS placeholder) so it shares the aurora palette idiom without a second
context. Lean: `renderMode="css"` Aurora for idiom coherence, OR leave as-is (it is
already aurora-themed by `--rainbow-pastel-*`). Orchestrator RATIFY live.

`compositions/auth-shell.vue:36-48` (2-ellipse `--section-color-1/6` split-panel
wash) is a BORDERLINE Class-A: it is a brand-panel hero, a good Aurora candidate
(`opacityCeiling:0.5` — the form panel is text-dense), but it is a SPLIT auth layout
where the right half is the form. A `renderMode="css"` or low-`opacityCeiling`
Aurora on the brand panel is the idiomatic move; RATIFY live whether the live drift
distracts from the form. Default disposition: Aurora with `opacityCeiling:0.5`.

### Class B — REPLACE with `<Constellation>` (the system/index/tooling heros)

Constellation (the geometric proximity-graph lattice) befits the SYSTEM-meta /
index / tooling surfaces where a painterly wash is too soft — the lattice reads as
"structure, network, system map." Candidates (no hand-rolled radial today, but P7's
"some pages/heros should leverage a constellation" intent maps here):

- **`foundations/intro.vue` storybook landing** — the demo's front door. If
  Class-A Aurora is chosen for the bloom, the SECONDARY option is Constellation
  behind the category index (the "system map" read of a component-library index).
  ONE substrate per hero — Aurora OR Constellation, not both. **Recommendation:
  Aurora for intro** (the brand identity is the warm painterly wash, not a tech
  lattice) — but record Constellation as the ratify-time alternative.
- **`tools/command.vue`** (command palette) + any "system/registry" index page —
  Constellation is the befitting substrate (a network/graph read). These have NO
  hand-rolled radial today; this is an ADD, lower priority — gate behind the
  orchestrator's live "does this page want a background at all" call.

**Constellation reuse-bar note:** `<Constellation>` already has demo consumer #1
(`substrates/constellation.vue`) + slides as consumer #2 (W30). Adopting it as a
demo hero is pure consumer-side reuse — no component change, satisfies the ≥2 bar
trivially. It composes `useCanvas2D` (offscreen/hidden/reduced-motion park for free).

### Class C — KEEP (radial is the SUBJECT or a config-preview; do NOT churn)

These radials are NOT hand-rolled heros to replace — they are load-bearing:

- **`compositions/configurator.vue:96-103`** — a DELIBERATE fake-aurora preview
  computed live from the configurator's own `spread`/`bloom`/`medium` config
  (`stageStyle`). It is the pedagogical "the config drives the look" demo WITHOUT a
  GL canvas. Replacing it with a real `<Aurora>` would defeat the lesson (the radial
  IS the visualization of the config math). KEEP.
- **`compositions/instrument-chassis.vue:281`** + `src/components/custom/instrument-chassis/InstrumentChassis.vue`
  — the chassis CURVATURE-OVERLAY radial, a first-class chassis-character token
  (the engraved-bezel look). It is the component's identity, not a hero wash. KEEP
  (out of P7 scope entirely — it is a `src/` component radial, not a demo hero).
- **`foundations/chart-chassis-palette.vue:100`** + `:256` — these are PROSE
  (a `blurb=` string + a comment describing the chassis radial). Not a paint site. KEEP.
- **`aurora/NucleiOverlay.vue:68`** — a `radial-gradient(ellipse, transparent 60%,
  --surface-tint-22 85% …)` RING mask for a nucleus handle in the aurora editor — a
  UI affordance, not a hero. KEEP.
- **`foundations/paper-glass.vue:191`** — a small `linear+radial` swatch INSIDE the
  paper-vs-glass comparison grid (a sample tile), not the page hero. KEEP (only the
  `:139` page hero is Class-A).

---

## The map (which page → which substrate)

| Page | Class | Disposition |
|---|---|---|
| `compositions/hero.vue` | A | **Aurora** (section-0/2/5 palette, `opacityCeiling:0.6`) |
| `foundations/intro.vue` | A | **Aurora** (section ramp; alt: Constellation — ratify) |
| `foundations/paper-glass.vue` (`:139`) | A | **Aurora** (section-5/2/0 palette) |
| `compositions/auth-shell.vue` | A (borderline) | **Aurora** `opacityCeiling:0.5` (ratify live) |
| `substrates/aurora.vue` (`:143`) | A (no 2nd GL) | `renderMode="css"` Aurora OR keep static (ratify) |
| `tools/command.vue` + index/system pages | B | **Constellation** (ADD, low-pri, ratify "wants bg?") |
| `compositions/configurator.vue` (`:97-99`) | C | KEEP — config-driven preview, the radial IS the lesson |
| `compositions/instrument-chassis.vue` / `InstrumentChassis.vue` | C | KEEP — chassis curvature token |
| `foundations/chart-chassis-palette.vue` | C | KEEP — prose, not a paint site |
| `aurora/NucleiOverlay.vue` (`:68`) | C | KEEP — nucleus-handle ring mask |
| `foundations/paper-glass.vue` (`:191`) | C | KEEP — sample tile, not the hero |

**Substrate-choice rule (the gestalt the wave codifies):** Aurora for PAINTERLY /
brand / warm-identity heros (the design-system's own face); Constellation for
SYSTEM / index / network / tooling surfaces (a structural read). One substrate per
hero, never both. Every adopted hero feeds the PAGE'S colors
(`--section-color-*` / the page palette) into the substrate config so the wash keeps
page identity — it gains LIFE (drift) + idiom (one shared substrate) without losing
the section-color brand seam.

---

## Performance / discipline notes

- **WebGL-context budget (binding — the W16/W18 incident class).** Each live
  `<Aurora>` = one GL context. The demo router mounts ONE story page at a time, so
  one Aurora hero per route is fine. The HARD rule: never TWO live Aurora GL
  contexts on the same mounted route (the `substrates/aurora.vue` backdrop case —
  route it to `renderMode="css"` if adopted, never a second WebGL context). Class-B
  Constellation is Canvas2D (not a GL context) so it does not draw against the GL
  budget — but it still parks offscreen via `useCanvas2D`.
- **No-GL fallback parity.** Aurora's `renderMode="auto"` resolves to `"css"` on
  low-power / reduced-motion / save-data — the `paletteToCssGradient` placeholder is
  itself a radial/linear wash, so the replacement is strictly >= the current static
  radial on every device (animated where capable, static where not). No regression.
- **Token-first seam preserved.** The replacement keeps `--section-color-*` as the
  page-color source — the wave threads those tokens into the Aurora `config.palette`
  (via `hexToOklchStop`/`deriveAurora`), so a consumer re-tinting `--section-color-*`
  re-tints the live wash, exactly as it re-tints the static radial today.

---

## Dedup ledger (verified at source)

| Existing wave | Owns P6/P7? | Evidence |
|---|---|---|
| W47 aurora preset roster | NO | scope is `demo/stories/aurora/presets.ts` label/medium only; never a hero `backgroundImage` |
| W17 constellation | NO | shipped the component + slides adoption (W30); no demo-hero adoption |
| W18 storybook IA | NO | tree structure (blob fold, dock category); excludes page `<style>`/bg content |
| W40 demo-shell dock-nav | NO | nav shell + coherence gates; "Do NOT touch" bars story-page content |
| W09 / W52 | NO | their radials are the glass specular/curvature family, not hero washes nor pulse aura |

**Fold into the wave set:** **W53 — demo radial-background reauthor + Pulse aura
calm.** dependsOn W47 (the aurora preset/palette seam landed) + W17 (Constellation
landed) + W18 (the IA tree settled — so the wave authors heros on the FINAL page
set, not mid-churn). Sequence AFTER the Aurora/demo-idiom band (step 3-4 of the
convergence sequencing). P6 (Pulse aura tune) is independent and can land first.
