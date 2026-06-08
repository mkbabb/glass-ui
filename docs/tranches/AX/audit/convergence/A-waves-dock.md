# A-waves-dock — dock-band wave coverage (W06 + W01-W04 vs HEAD + D9/D11/D13/D14/D15)

**Lane** A-waves-dock · **Verdict** net-new-wave (the dock-structural capability wave) ·
**id** A-waves-dock

The wave-coverage question: does the dock band (W06 + completed W01-W04) cover
persistent-controls / proportion / dividers / dock-section / mobile against HEAD
(3.8.0) + defects D9, D11, D13, D14, D15 — or need augmenting? Read W06 IN FULL +
cross-referenced the per-defect convergence files (D9, D11, D13, D14, D15) so this
lane is the WAVE-set angle, not a re-derivation of each defect's source analysis.

---

## 1. W06 itself — sufficient for its OWN charter, NOT executed yet

W06 (`AX.W06-dock-storybook-honest-rail-css-split.md`, 533 lines) is a **consolidation +
honesty + CSS-split** wave on FOUR born-RED witnesses, ALL still RED at HEAD (verified):

| W06 RED witness | HEAD state (verified) | W06 covers it? |
|---|---|---|
| token-ladder debris `foundations/dock-active-tokens.vue` | EXISTS + manifest row present | YES — F0 deletes outright |
| dock-primary scatter across 3 categories | `navigation/`+`foundations/`+`compositions/` | YES — F1 one home + retire `dock-with-slider` |
| dishonest `variant="rail"` (inherits inapplicable collapse surface) | compiles `<GlassDock variant="rail" :collapse-delay>` | YES — F2 type-narrow + hoist polish |
| `dock.css` 1227-line CSS god-module | `wc -l` = **1418** at HEAD (grew since the W06 baseline's 1227) | YES — F4 carve into `dock/*.css` partials |

W06's `dock.css` line count drifted **1227 → 1418** between the W06 baseline (`eaba94f`)
and HEAD (3.8.0) — the carve is MORE urgent, the F4 disposition unchanged (carve into
`src/styles/dock/{shell,layers,layer-group,overflow}.css`). No W06 audit JSON exists
(`docs/tranches/AX/audit/W06-*.json` absent) → **W06 is PLANNED, not executed**. PROGRESS.md
confirms `W06 | planned`.

W06 also already carries TWO dock-control-primitive folds inside its FileBounds:
- the **DDR-AS-RC-3 standalone-`DockIconButton` 44px coarse-pointer floor** hoist into
  `dock-controls.css` (verified present at HEAD: `dock-controls.css:483-488`, a WCAG floor,
  default `2.75rem`);
- the **USF-2 `--dock-control-glyph-size`** in-dock optical-size token (closing the
  `--dock-icon-padding` dead-fallback that makes DarkModeToggle render ~2.5× the nav icons).

**Verdict on W06's own scope: SUFFICIENT — leave it as written.** It is a correct,
well-bounded consolidate/honest/carve wave; do not augment its four folds. The W06 line
counts in the plan (1227) want a one-line freshness note (HEAD is 1418), but the
disposition holds.

---

## 2. The defect-to-wave map (the dedup-anchor verification this lane owes)

| Defect | What it asks | Owning wave | W06 covers it? | Verdict |
|---|---|---|---|---|
| **D9** red underline on dock tabs | subtle/no underline | **W40** (demo shell) | NO — out of W06 bounds | already-routed (W40) |
| **D11** specular corner-glow on dock+chassis | tune subtle | **W09** (specular) | NO — not dock-band structural | already-routed (W09) |
| **D13** persistent controls + proportion + dividers | structural dock capability | **NET-NEW** | NO — explicitly out of scope | net-new |
| **D14** dedicated dock showcase section | morph/anim/layers/variants tour | **W06 + W18** (augment) | PARTIAL — consolidates, doesn't author the tour | augment W06+W18 |
| **D15** dock mobile ~1.5× | coordinated scale, bigger glyph | **NET-NEW** (or fold W06) | NO — W06 is the 44px FLOOR, not a scale | net-new |

### D9 — demo-shell, NOT library, NOT W06 (verified at source)

D9's "red underline under dock items (e.g. Dialog)" is the
`.demo-bottom-dock__tab.is-active::after` rule in **`demo/layout/dock-nav.css:117-127`** — a
2px `--demo-nav-accent` (= `--viz-fourier`, NCSU-red) underline + the
`.demo-sidebar-item.is-active::before` left-edge accent. This is **demo-private nav chrome**,
explicitly OUT of W06's bounds (W06 §Disjointness vs W40: "W40 rebuilds the demo NAV SHELL
`SidebarDock`/`BottomDock`"). W40 Scope-3 already owns the active-affordance restyle and is the
correct home — the underline prominence is a W40 tuning, not a W06 or library concern. The
`.dock-tab-button` library control (`dock-controls.css:206-267`) carries NO underline — it uses a
`--surface-tint-10` background swap for active. **D9 is correctly routed to W40; no W06 change.**

### D11 — glass specular, W09, not dock-band structural

D11's "specular radial corner-glow" is the `--glass-specular` / catchlight token family W09
tunes-to-subtle. The dock's only specular reads are the `instrument-strip` engraved bezel
(`dock.css:590-600`) + the secondary-tier hover specular (`dock-controls.css:368-370`), both
consuming the glass tokens W09 owns. **D11 is a W09 regression-tune, not a dock-band wave gap.**
No W06 change.

---

## 3. The REAL gap: D13 + D15 are ONE net-new dock-structural wave

This is the lane's headline finding. D13 (persistent controls + H/V proportion + dividers) and
D15 (mobile 1.5× scale + glyph ownership) are BOTH **library-side structural capability** edits
to the SAME three files — `GlassDock.vue` + `dock.css` (→ the W06-carved `dock/*.css` partials)
+ `dock-controls.css` — that W01/W04/W06 serialize on. The per-defect convergence files reached
`net-new` for each independently; from the WAVE-set angle they should be **ONE dock-structural
wave**, not two, because:

1. **Same FileBounds** — both edit `GlassDock.vue` (region model / template) + the dock CSS
   density cascade + `dock-controls.css`. Two separate waves would race each other for the same
   files inside the dock band (the exact collision the band's "cannot run concurrently — digest
   line 353" contract forbids).

2. **D15's `--dock-scale` density-multiplier and D13's H/V proportion parity are the SAME
   cascade.** D13-b's fix ("make `.glass-dock.vertical` read the density `--dock-padding-*` /
   `--dock-layer-gap` cascade the horizontal dock tunes — delete the hardcoded `gap:0.25rem`,
   `dock.css:463-491`") and D15's fix ("thread ONE `--dock-scale` multiplier through the
   `.glass-dock[data-density]` token cascade so every geometry axis grows in lockstep") operate
   on the IDENTICAL density-token seam (`dock.css:221-326`). Fixing the V-dock to read the
   cascade (D13-b) and adding the coarse-pointer scale multiplier to that cascade (D15) is ONE
   coherent density-cascade reauthor — split across two waves it would be authored twice.

3. **The dock divider component (D13-c) and the glyph-size ownership (D15) are both
   component-over-class / token-first first-principles fixes on the dock-control family.** D13-c
   promotes `.dock-separator` (axis-blind, `dock.css:1174-1180`) to an orientation-aware
   `<DockSeparator>` reading `useOptionalDockContext()`; D15 finally gives the library glyph
   ownership (`.dock-icon-button > svg { width: var(--dock-icon-glyph) }`). Both close
   library-owns-nothing gaps on the dock-control primitive in the same `dock-controls.css` carve.

4. **Both must land in the dock-band ordering and SETTLE BEFORE W06's carve.** D13.md's
   sequencing recommends "W01 → [this] → W04 → W06" so W06 carves the FINAL three-region +
   density-cascade model (carving before this restructure shelves a model it rips out — the exact
   W06 carve-last rationale). D15.md says the same: "D15 should `dependsOn` W06 and land on the
   carved partials, OR fold into W06's `dock-controls.css` touch." The two recommendations
   converge on: **one dock-structural wave sequenced inside the band relative to W06's carve.**

### What the net-new wave delivers (the gestalt restructure — one wave, three folds)

A single **three-region density-cascade dock-structural** wave:

- **Persistent region (D13-a)** — a `#persistent` slot threaded as a THIRD region through the
  W02 morph orchestrator (in-flow in BOTH collapsed+expanded, never `inert`, never crossfaded
  out). Dock becomes `[persistent][divider][morph-region]`; the morph-region stays the existing
  binary `full↔summary` crossfade (`GlassDock.vue:261-263`). Retires the demo's `<Home>`-in-both-
  slots double-authoring (`navigation/dock.vue:85`+`:90-92`). The persistent region registers on
  the SAME spring (W02's one-orchestrator design — no second clock).
- **H/V proportion parity + `--dock-scale` (D13-b + D15)** — re-express the per-density geometry
  as `calc(<base> * var(--dock-scale))` at the token edge so ONE coarse-pointer rule
  (`--dock-scale: var(--dock-mobile-scale, 1.5)`) grows control-box + padding + gap + tab/trigger
  geometry + tile-min + radius in lockstep (subsuming the two existing 44px floors via a
  `max(…, 44px)` clamp that keeps the WCAG guarantee). Route `.glass-dock.vertical` through the
  SAME density cascade (delete the hardcoded `gap:0.25rem`) so `density` paints identically on
  both axes. Own the icon glyph (`.dock-icon-button > svg`, riding `--dock-icon-glyph: calc(1.25rem
  * var(--dock-scale))`) — closing the "library never sizes the dock glyph" gap so the glyph
  scales WITH the box instead of swimming in a 44px target.
- **`<DockSeparator>` component (D13-c)** — promote the axis-blind `.dock-separator` to an
  orientation-aware primitive off `useOptionalDockContext()`; fix the dead `--dock-h` fallback
  (`dock.css:83`, same dead-fallback class as W06's USF-2 `--dock-icon-padding`); export from the
  `/dock` barrel; migrate the 5 demo sites off the raw class.

All three are ONE region-model + density-cascade restructure (gestalt, not three patches),
sequenced `W01 → [this dock-structural wave] → W04 → W06` so W06 carves the SETTLED model.

---

## 4. D14 — augment W06 + W18 (already correctly dispositioned)

D14 (dedicated dock showcase section) is `augment-existing-wave` per D14.md, and that holds from
the wave-set angle: W06 consolidates the SCATTER but its RATIFY-BEFORE-IMPL #1 (W06:506-512)
RECOMMENDS keeping `navigation/dock-layers` + `navigation/rail` as FLAT siblings — which is NOT
the single "ENTIRE section" D14 asks. The augment is two explicit Scope deltas on files the waves
already own:
- **W06** authors the dedicated morph/animation showcase section + the variants/density/
  orientation axis-tour SFC content (the `density` 4-rung, `instrument-strip`, `overflow="scroll"`,
  horizontal-`shape` axes are currently demoed NOWHERE), and resolves RATIFY #1 toward
  category-member rows;
- **W18** places those rows in the first-class `dock` CATEGORY (Scope-5) + re-baselines the three
  IA gates (single `manifest.ts` writer).

This also makes D13's persistent-controls + D15's mobile-scale VISIBLE — the axis-tour is the
live-audit anchor for both. **No net-new wave for D14; the augment is the no-collision path.**

---

## 5. Dedup note — how the net-new wave folds WITHOUT duplicating

- **Distinct from W06** — W06 is consolidate/honest/carve; the net-new wave is structural
  CAPABILITY (persistent region + density-cascade reauthor + divider component). They share
  `GlassDock.vue` + dock CSS but on different axes (W06 narrows the rail prop type + relocates
  rules verbatim; the net-new wave authors the three-region model + the `--dock-scale` cascade).
  **Sequence them: net-new BEFORE W06's carve** (so W06 carves the settled model), exactly the
  W01-before-W06 / W04-before-W06 carve-last pattern the band already uses.
- **Distinct from W40** — W40 is the demo nav SHELL (consumer of the dock); it CONSUMES the new
  persistent region + `--dock-scale` for free and is the dogfood surface that proves the 1.5×
  live. It owns D9 (the underline restyle). Not a capability owner.
- **Distinct from W18** — W18 is the IA category tree (no component-internal edits). It frames
  the D14 dock category over surviving rows; it never authors dock structure.
- **Distinct from W21** — W21's divider work is the CONFIGURATOR machined-groove
  (`ConfiguratorLayer` rows), a different surface; the `<DockSeparator>` is dock-specific.
- **Fold the existing per-defect convergence files** — D13.md (net-new), D15.md (net-new),
  D14.md (augment W06+W18), D9.md (W40), D11.md (W09) already carry the source-grounded
  per-defect analysis. This lane's contribution is the WAVE-SET consolidation: **D13 + D15 unify
  into ONE dock-structural wave** (not two parallel waves racing the same files), D14 augments
  W06+W18, D9/D11 are correctly routed to W40/W09, and W06's own four folds stay UNCHANGED. The
  new wave should be authored as a single `AX.W<NN>-dock-structural-region-and-scale.md`
  dependsOn W01, sequenced before W06's carve, with W40 + the D14 axis-tour as its downstream
  dogfood/showcase consumers.

---

## 6. Verdict

**net-new-wave** — ONE dock-structural wave folding D13 (persistent region + H/V proportion
parity + `<DockSeparator>`) + D15 (`--dock-scale` coarse-pointer multiplier + glyph ownership),
sequenced `W01 → [new] → W04 → W06` so W06 carves the settled model. W06's own four folds are
SUFFICIENT and unchanged (the only edit: a freshness note that `dock.css` is 1418 at HEAD, was
1227 at the W06 baseline). D14 augments W06 (showcase content) + W18 (dock category). D9 → W40,
D11 → W09 (already routed). No wave is duplicated.
