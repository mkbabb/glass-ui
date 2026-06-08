# A-dock-rail — Rail bg + vertical-dock vs rail differentiation (DK8/DK9)

**Lane** A-dock-rail · **Severity** major · **HEAD** 5cf2980 (3.8.0+W52)
**Scope** DockLayerGroup switcher rail (`.dock-layer-rail`) + `dock.css` rail rules + the `variant="rail"` whole-dock.
**Verdict** augment-existing-wave (W06 for DK9, W45 for DK8) — NO net-new wave.

---

## 0. The conflation the user is seeing — TWO unrelated "rails"

DK8 and DK9 read as one defect ("rail") but at source they are **two architecturally-distinct
surfaces that share the noun**:

| Surface | What it is | Class / variant | Story |
|---|---|---|---|
| **Layer-switcher rail** | the Figma-style tab strip INSIDE a `DockLayerGroup` that switches panes | `.dock-layer-rail` + `.dock-layer-tab` + `.dock-layer-tab-indicator` (a reka `Tabs`) | `/navigation/dock-layers` (the "Switcher rail" section) |
| **Vertical-dock rail variant** | a WHOLE `<GlassDock variant="rail">` configured as a vertical icon column | `.glass-dock.variant-rail` | `/navigation/rail` ("Dock Rail") |

DK8 ("rail bg's not right + mis-aligned") is about the **layer-switcher rail** (`.dock-layer-rail`).
DK9 ("differentiate the VERTICAL dock vs the RAIL for the horizontal dock /navigation/rail") is
about the **`variant="rail"` whole-dock** — the user's own phrasing names the `/navigation/rail`
route. These do NOT fold into one fix; they touch different covering waves.

A THIRD "rail" exists and must NOT be conflated with either: W45's `[persistent][divider][morph-region]`
**persistent-controls strip** (the iOS Now-Playing idiom) and the separate `<InstrumentRail>`
cockpit-ratio chassis (`/compositions/instrument-rail`). W06 already flags the InstrumentRail-vs-DockRail
disambiguation as an IA signpost.

---

## 1. DK8 — the layer-switcher rail: backgrounds wrong + indicator mis-aligned

### 1a. ROOT CAUSE of the mis-alignment (the headline DK8 bug)

`DockLayerGroup.vue:178-208` mounts the switcher as a reka `<Tabs orientation="horizontal">`
(orientation HARDCODED, `:181`). The travelling active affordance is the reka `<TabsIndicator>`
(`.dock-layer-tab-indicator`), positioned in `dock.css:1292-1305`:

```css
.dock-layer-rail .dock-layer-tab-indicator {
    position: absolute; left: 0; top: 0;
    height: var(--dock-layer-tab-size, …);
    width: var(--reka-tabs-indicator-size);
    transform: translateX(var(--reka-tabs-indicator-position));   /* ← INLINE-AXIS ONLY */
}
```

The indicator ALWAYS travels the inline axis (`translateX` + `top:0` + fixed `height`). But the
DEFAULT (horizontal) layer-group renders the rail as a **vertical COLUMN of tabs** —
`.dock-layer-rail { flex-direction: column }` (`dock.css:1211-1213`). So in the most common rail
layout the tabs stack DOWN while the indicator can only slide ACROSS — it pins at the top tab and
**never reaches the active tab below it**. reka's `orientation="horizontal"` only computes
`--reka-tabs-indicator-position`/`-size` for the inline axis, so even the size var is wrong for a
column. The inline comment at `dock.css:1307-1309` ("reka's position var resolves to the active tab
offset regardless") is FALSE for a column rail — that's the mis-alignment the user screenshotted.

Only in a `.dock-layer-group.vertical` (where `dock.css:1220-1221` flips the rail to
`flex-direction: row`) does the `translateX` indicator coincidentally line up — i.e. the indicator
is correct ONLY for the non-default axis. The default-axis case is broken.

The gestalt fix is **axis-aware indicator + axis-coupled reka orientation**: thread the
layer-group `axis` (already computed, `DockLayerGroup.vue:56`) into the `<Tabs :orientation>` AND
make `.dock-layer-tab-indicator` translate on the axis the rail flexes — a column rail uses
`translateY(var(--reka-tabs-indicator-position))` with `width: 100%; height: var(--reka-tabs-indicator-size)`.
One `[data-rail-axis]` (or the existing `.vertical`/horizontal group class) switches the translate
axis + the cross/main sizing. NOT a patch — the rail's indicator must be axis-aware exactly as
`useLayerTransition` and `useDockTransition` already are (the dock is axis-aware everywhere EXCEPT
this one indicator, which is the regression).

### 1b. ROOT CAUSE of the "bg's not right"

The `.dock-layer-rail` switcher has **NO background plate of its own** — only a hairline
`border-right` (`dock.css:1217`). There is no `--dock-layer-rail-bg` token (confirmed: zero
matches across `src/styles/`). The active tab affordance is a `color-mix(in srgb, var(--primary) 15%, transparent)`
indicator backplate (`:1300`); hover is `color-mix(… var(--accent) 40% …)` (`:1266`). So the rail
reads as a bare bordered gutter with no surface — and against the dock's OWN glass plate (the rail
sits INSIDE `.glass-dock`), the hairline-only rail looks unfinished and the `--primary 15%`
indicator is the only fill. That's "the bg's not right": there is no rail surface token, and the
indicator/hover mixes are tuned against an absent plate.

The token-first fix is a `--dock-layer-rail-bg` rung (default a quiet `--surface-tint-*` or
`transparent` if the design wants the bare-gutter read) + reconcile the hover/indicator α against
it — so a consumer (and the library default) controls the rail surface from ONE token, matching the
`--dock-*` cascade discipline. The indicator's `--primary 15%` and the hover `--accent 40%` should
be `--dock-layer-rail-*` tokens too, not raw mixes, so the rail's whole affordance ladder is tunable.

### 1c. The vertical-rail border-direction is also stale under the vertical group

`.dock-layer-group.vertical .dock-layer-rail` (`:1220`) flips to `border-bottom` (a horizontal-rail
divider) — correct for the axis. But combined with the indicator bug (1a), the vertical group is the
ONLY case where the indicator lines up while the border is also correct — masking how broken the
default-axis case is.

### DK8 covering wave: **W45** (augment)

W45 (`dock region-model + DockSeparator + mobile --dock-scale`) is the dock-geometry/density-cascade
+ separator-primitive wave and **already owns `dock.css` + `tokens.css` + `dock-controls.css`** with
the §10 dock-token block. It is the natural home for:
- the `--dock-layer-rail-bg` + `--dock-layer-rail-{hover,active}` token rungs (token-first, §10 dock block, alongside its `--dock-scale`/`--dock-icon-glyph` additions);
- the axis-aware `.dock-layer-tab-indicator` rule (W45 is already re-authoring the layer-group/rail region of `dock.css`).

W45 does NOT currently mention `.dock-layer-rail` or the indicator axis — its "rail" is the
persistent-controls region, a DIFFERENT surface (see §0). So this is a genuine **scope ADD to W45**,
not a duplicate: extend W45's "route the layer-group through the cascade" §3.2 to ALSO fix the
switcher-rail indicator axis + mint the rail-bg token ladder. The `DockLayerGroup.vue` `:orientation`
thread on the `<Tabs>` is a small companion edit (W45 already touches `GlassDock.vue` + can take the
sibling `DockLayerGroup.vue` hunk; if the band wants strict file-disjointness, W06 — which already
edits the demo + dock CSS partitions — can carry the `.vue` hunk, see §3).

---

## 2. DK9 — differentiate the vertical dock vs the `variant="rail"`

### 2a. The conflation at source

`GlassDock.vue:168-172` force-derives `orientation="vertical"` whenever `variant === "rail"` (or
`instrument-strip`), and `:191-197` force-`always-expanded`. So `variant="rail"` IS just "a vertical
always-expanded GlassDock" — there is no independent rail identity. The CSS contribution of
`variant-rail` is ~6 rules (`dock.css:493-505`): a different padding token, `--glass-bg-dock`
background, `--glass-border-dock` border, and pill/rounded radius. Everything else — the entire
collapsible prop surface (`collapseDelay`, `startCollapsed`, the `#collapsed` slot, the dual-layer
grid) — is INHERITED but INAPPLICABLE to a rail (a rail is always-expanded; it has no collapse, no
collapsed slot, no two-layer crossfade). This is W06's RED witness 3 verbatim.

So the user's DK9 ("differentiate the vertical dock vs the rail") is the live read of a real
architectural smell: `variant="rail"` and `<GlassDock orientation="vertical">` render nearly
IDENTICALLY (both vertical, both — for the rail — always-expanded), differing only by ~6 surface
rules, while the rail carries a whole inapplicable horizontal prop surface. The two are conflated
because the rail is NOT a distinct thing — it is a thin surface-skin over the vertical dock plus a
force-vertical+force-expanded coupling.

### 2b. The gestalt differentiation (the design call)

There are two coherent ways to differentiate, and this is partly a **user design decision**:

- **Option A — make the rail a HONEST distinct variant** (W06's existing plan). Type-narrow
  `variant="rail"` so the collapse/collapsed-slot/dual-layer surface is inapplicable (discriminated
  prop union or fail-loud), give the rail its OWN refined chrome (hoist the polished
  active-item-accent / tap-squish / tooltip treatment that `demo/layout/SidebarDock.vue` already
  dogfoods into `dock-controls.css`), so the rail reads as a purpose-built navigation column —
  distinct from a generic `orientation="vertical"` dock by its refined nav-item affordance, not just
  6 surface rules. This is exactly W06 §Scope(3) "Honest rail + hoisted polish."

- **Option B — retire `variant="rail"` as a distinct variant** and make a vertical nav-dock just
  `<GlassDock orientation="vertical" always-expanded shape="rounded">` + the hoisted nav chrome,
  deleting the force-coupling. This is the cleaner clean-break (no half-inapplicable variant flag),
  but it removes a named ergonomic the demo + `SidebarDock` rely on.

The user's DK9 ask ("differentiate ... they are conflated") leans toward Option A — they want the
rail to BE a distinct, recognizable thing, not a leaky alias of the vertical dock. W06 already plans
Option A. The **design call to surface to the user**: does the rail stay a first-class named variant
with its own nav chrome (A), or collapse into orientation-vertical + a documented recipe (B)?
Given the AX squircle/glass-first pivot and the user wanting a "dedicated VERTICAL dock SECTION"
(DK10), Option A — a distinct, refined, well-sectioned rail — is the better read.

### 2c. The `/navigation/rail` demo re-derives a WORSE rail

`demo/stories/navigation/rail.vue` does NOT use any refined rail chrome — it hand-rolls a bespoke
icon-button list with inline `cn('text-muted-foreground', active === e.id && 'bg-foreground/10 text-foreground')`
active styling (`:53-57`), re-deriving a worse active affordance than `SidebarDock.vue` ships live.
So even the DEMO conflates: the rail story shows a hand-rolled list, not the canonical refined rail,
making the rail look indistinguishable from "any vertical dock with some buttons." W06 §Scope(3)
already plans to retire this bespoke list for the canonical refined recipe (demo == shipped contract).

### DK9 covering wave: **W06** (augment — already substantially planned)

W06 (`dock storybook honest rail + css split`) **already owns DK9's core**: RED witness 3 is exactly
the rail-conflation, and W06 §Scope(3) plans the type-narrow + the hoist + the demo de-derivation +
the InstrumentRail-vs-DockRail IA disambiguation. The **augment to W06**:
1. Make the Option-A-vs-B decision an explicit RATIFY-with-user gate (the design call is the user's per DK9's framing) — W06 currently assumes Option A; surface it.
2. Add a "VERTICAL dock section" deliverable (DK10 overlaps here) — W06's consolidated `navigation/dock` home should carry an explicit vertical/rail section that VISUALLY contrasts a plain `orientation="vertical"` dock against `variant="rail"` so the differentiation is teachable (this also discharges DK10's "dedicated vertical dock section" against the dock home).
3. Confirm the hoisted rail chrome reads DISTINCT from a generic vertical dock — the differentiation is the refined nav-item affordance + the rail surface tokens (§1b), so the W06 hoist and the W45 rail-bg token ladder COMPOSE to make the rail a recognizable thing.

W06's FileBounds already include `navigation/rail.vue`, `GlassDock.vue` (rail-prop typing),
`dock-controls.css` (rail-polish hoist) — DK9 is fully inside W06's existing surface. No net-new wave.

---

## 3. Dedup + sequencing (no duplicate prescriptions)

- **DK8 → W45** (the rail-bg token ladder + the axis-aware switcher-rail indicator). W45 already
  re-authors the `dock.css` layer-group/rail region + the §10 dock-token block; this is a scope ADD,
  not a new wave. The `DockLayerGroup.vue` `<Tabs :orientation>` thread is a companion hunk — assign
  to whichever of W45/W06 the band schedules to touch `DockLayerGroup.vue` (W45 already edits the
  sibling `GlassDock.vue`; cleanest to keep the dock-component hunks together in W45).
- **DK9 → W06** (honest rail + hoisted nav chrome + demo de-derivation + the vertical/rail section).
  Already ~90% planned in W06 RED-witness-3 + §Scope(3); the augment is (a) surface the Option-A/B
  design call as a user RATIFY, (b) add the explicit vertical-vs-rail contrast section (DK10 overlap).
- **NOT W45's persistent-rail region** — that is a different "rail" (the `[persistent][divider]`
  morph region), not the switcher rail or the variant. No overlap; the §0 table prevents the merge.
- **Sequencing** stays the band order **W01 → W02 → W45 → W04 → W06**: W45 mints the rail-bg tokens +
  fixes the indicator axis in `dock.css`; W06 then carves the SETTLED rail rules into `src/styles/dock/`
  partials AND lands the rail-honesty + demo. So DK8's CSS lands in W45 BEFORE W06's carve — no
  re-author across the carve boundary.

## 4. Falsifiable witnesses (for the augmented gates)

- DK8-1 (indicator axis): `getComputedStyle(.dock-layer-tab-indicator).transform` on the DEFAULT
  (horizontal-group) rail must encode a Y-translation to the active tab; at HEAD it is X-only and
  pins at the top tab (RED).
- DK8-2 (rail bg): `--dock-layer-rail-bg` exists in `tokens.css` §10 + the rail/hover/active mixes
  read `--dock-layer-rail-*` tokens, not raw `--primary`/`--accent` (RED at HEAD: zero matches).
- DK9-1 (honest rail): a `<GlassDock variant="rail" :collapse-delay="2000">` must NOT type-check
  (the inapplicable prop is narrowed away); `navigation/rail.vue` must NOT inline-derive active
  styling — it uses the canonical refined recipe (both RED at HEAD).
