# D-field-aurora — "every page gets an AURORA, not the disgusting metallic paper wash"

> BG forensic audit. Verified against HEAD (4.2.0). Default-broken skepticism applied:
> every claim below is grounded in real source at file:line.

---

## FINDINGS (what is actually true at HEAD)

### F1 — There are THREE competing field systems stacked behind every page

The shipped page has not one background but three overlapping field layers, each authored
by a different wave, none aware of the others:

1. **The global metallic field** — `<PaperBackdrop field :field-hue="fieldHue" class="fixed inset-0 -z-10" />`
   mounted UNCONDITIONALLY at the shell root (`demo/layout/AppShell.vue:360`). It emits a
   `.paper-field` cel plane (z-index `-11`) + a `.paper-underpaint` grain plane
   (`src/components/custom/paper-backdrop/PaperBackdrop.vue:68-81`).
2. **The per-page StoryHero background** — `<Aurora>` / `<Constellation>` / `<FourierField>` /
   `<PaperGrid>` / static `grid` / static `paper`, chosen per-route by `kind` and mounted at
   z-index `-10` (contained) or `-5` (full-bleed) (`StoryHero.vue:267-321`, `story-hero.css:108-122`).
3. **The DockStage shared aurora** — only on flagship dock routes, z-index `-1` inside an
   isolated stacking context (`demo/stories/dock/DockStage.vue:60-93`).

On most routes the user sees layer (1) — the metallic paper field — NOT an aurora, because the
per-category map (F3) routes only `substrates`/`navigation` to live aurora; everything else gets
`paper`/`grid`/`constellation`, so the global `.paper-field` cel + grain is the dominant warm
backdrop on the dense bands.

### F2 — The metallic = the conic cel-sheen + 4 high-chroma radials + the 0.22 grain speckle

The "disgusting metallic" is `.paper-field` (`src/styles/paper.css:138-183`) compositing
**six** background layers in ONE `background:` shorthand:

- **L4 conic over-glaze** (`paper.css:151-157`): `conic-gradient(from -45deg at 78% 22%, …)` — an
  angular sweep around a fixed corner. A conic sweep on a warm chroma reads as an **iridescent
  cel/foil sheen** — this is the "metallic" highlight the user names.
- **L1 amber key + L2 terracotta + L3 sand radials** (`paper.css:159-181`): three radials at
  `oklch(0.87 0.155 …)` / `oklch(0.85 0.145 …)` / `oklch(0.88 0.115 …)` — chroma `0.115–0.155`
  is high enough that, layered, they read as a **brown pigment slab**, not an airy aurora drift.
- **The grain speckle** — `--paper-grain-tooth` (`paper.css:44`) is a `feTurbulence
  baseFrequency='0.04 0.09'` anisotropic grey speckle, contrast-stretched (slope 1.8), painted at
  `--paper-grain-opacity: 0.22` light / `0.16` dark (`tokens/glass-fx.css:27`, `dark-arm.css:246`)
  with `mix-blend-mode: multiply`. A 0.22 anisotropic speckle over a brown slab is the **woven
  metallic cloth** texture the user condemns ("if you squint it FAILS" was the *intended*
  visibility — it is now over-visible and mud).

The `::before` cartoon-drift copy (`paper.css:226-238`) animates `translate/scale/rotate` over
42s — a slow churn of the brown slab, which amplifies the "metallic woven" read.

### F3 — `[data-paper-field]` is referenced everywhere but SET NOWHERE — the opt-in is a phantom gate

`paper.css:113` claims *"the warm stops only render under `[data-paper-field]`"*. **This is false
at HEAD.** The actual `.paper-field` selectors (`paper.css:129`, `:138`, `:188`) are NOT gated on
`[data-paper-field]` — they paint whenever the class is present, and `<PaperBackdrop field>`
applies the class UNCONDITIONALLY (`PaperBackdrop.vue:70-75`). Grep proof:

```
grep -rn 'data-paper-field=' demo src   →   (no live attribute setter anywhere)
```

`cards.css:120` (`:where([data-paper-field]) &`) reads the attr to SWITCH OFF a card's fallback
field — but since the attr is never set, **every glass card also paints its own fallback warm
stops** (`cards.css:70-88`), a redundant FOURTH field layer the architecture intended to suppress.
The phantom gate means the "opt-in for glass routes only" claim in `paper.css:113-117` and
`PaperBackdrop.vue:24-28` is dead — the metallic is universal and un-suppressible by design intent.

### F4 — The aurora substrate is fully capable of being the universal field — it is NOT the problem

`<Aurora>` is WebGPU-first with a WebGL2 fallback (`runtime.ts:26` composes `createGpuSubstrate`)
and inherits the full budget discipline that makes a shell-level mount cheap and safe:

- **Offscreen-park + PRM-freeze** live ONCE in `createCanvasLifecycle` (the `Set<reason>` suspend
  model, `createCanvasLifecycle.ts:16-34`): a parked rAF attaches ZERO frames; reduced-motion
  draws ONE static frame then parks and re-arms on un-reduce.
- **Lazy-arm past first paint** — the WebGL init is deferred to an idle tick gated on first
  viewport intersection (`useAurora.ts:300-345`), with a CSS-gradient placeholder painting
  frame-0 (`Aurora.vue:200-207`).
- **Sub-2× DPR cap** for the decorative wash (`AV_AURORA_DPR_MAX = 1.5`, `budget.ts:36`).
- **Software-raster guard** — SwiftShader/llvmpipe/headless fall to the luminance-faithful static
  `auroraFallbackGround` (`renderMode.ts:129-156`, `Aurora.vue:155-164`), so the page never wedges.
- **`opacityCeiling`** clamps how far it recedes behind content (`Aurora.vue:89-121`).

So the directive is achievable: Aurora is already the right primitive; the metallic `.paper-field`
is a parallel CSS field that should never have been the global default.

### F5 — The per-route GL budget is already honored — and substrate routes already self-stage

The `CATEGORY_DEFAULT_BG` map (`manifest.ts:181-193`) is built to honor "one GL context per route":
live GL clusters on `substrates`/`navigation`/`motion(constellation)`, dense bands ride free
static `grid`/`paper`. Crucially, **substrate demo routes drop their PAGE background to `paper`/
`constellation` specifically to avoid a second GL context** — the blob route note at
`manifest.ts:153-158` says inheriting the `aurora` default *"would stack a SECOND GL"* context, so
it self-stages the demoed substrate as content and takes a calm page bg. The 12 substrate routes
(`demo/stories/substrates/*.vue`) each mount their OWN focal GL context as the page CONTENT. **This
is the coexistence case any universal-aurora wave MUST reconcile** — a shell-level shared aurora
must be SUPPRESSIBLE per-route for routes that own a focal substrate.

### F6 — The PaperBackdrop component carries dead/contradictory surface area

`PaperBackdrop.vue` ships `frequency` (`"clean" | "aged"`) and `opacity` props that reference
`--paper-aged-texture` / `--glass-grain-opacity` (`PaperBackdrop.vue:44-53`) — but the `field`
path overrides all of it, and the `aged` texture var is a vestige of the pre-field grain register.
The component is now two unrelated concerns welded together (a grain-texture register + a warm-cel
field driver), each with its own props, neither cleanly the thing the shell needs (a field).

---

## ROOT CAUSES (gestalt, first-principles)

### RC1 — The library tried to fake an aurora in CSS, and the fake reads as metal

The whole `.paper-field` apparatus exists to give "every page warmth" WITHOUT paying for a GL
context everywhere (BD page-background WAVE-AMENDMENT, §0–§1). But a static conic+radial+grain
slab is a fundamentally different thing from a drifting nuclei field: it has hard angular sheen
(the conic), heavy mid-chroma pigment (the radials), and a high-opacity speckle (the grain). The
result is **brown foil cloth**, the opposite of the airy luminous drift the user wants. You cannot
CSS-gradient your way to aurora; the directive is correct — retire the fake and use the real one.

### RC2 — Three field systems with no single owner — the layering is incoherent

The global `.paper-field`, the per-page StoryHero bg, the DockStage aurora, and the per-card
fallback stops are four independently-authored field layers with overlapping z-indices and no
single resolution point. The `[data-paper-field]` gate that was supposed to coordinate them
(suppress card fallbacks under the global field) was never wired (F3), so they all paint at once.
There must be ONE field owner.

### RC3 — The per-route background is a CATEGORY MAP, not a universal field with per-route accents

`CATEGORY_DEFAULT_BG` makes the field a discrete choice of {paper|grid|aurora|constellation|fourier}
per category. The user's directive collapses this: the field is ALWAYS aurora (warm, calm,
per-route-hued); the variation is the HUE and intensity, not the substrate kind. The map should
become a hue/intensity map over one aurora, not a substrate-kind switch.

### RC4 — The grain is a separate, legitimate register that got conflated with the field

The `paper-underpaint` / `paper-grain-overlay` grain (`paper.css:48-92`) is a real editorial
texture primitive — it belongs ON specific surfaces a designer marks as "paper" (math-paper,
printed-specimen panes), NOT as a global multiply over every route. Conflating "global warmth" with
"global grain" is what produces the woven-metal read. Grain must become opt-in-per-surface only.

---

## PROPOSED WAVES

### BG.W-FIELD-AURORA — retire the metallic `.paper-field`; mount ONE shared shell-level Aurora as the universal page field

**Intent.** Every route's page field is a single calm warm `<Aurora>` mounted ONCE at the shell
root, per-route-hued. The metallic conic/radial/grain `.paper-field` apparatus is deleted (clean
break, no alias).

**Idiomatic gestalt approach.**
- **ONE shared shell field.** Replace the `<PaperBackdrop field>` mount in `AppShell.vue:360` with a
  single `<Aurora>` pinned `fixed inset-0 -z-10`, driven by a per-route calm config. This is the
  *shared shell-level* decision (not per-route remount): the aurora persists across navigations, so
  there is exactly ONE GL context for the whole shell on non-substrate routes, and it never tears
  down/re-arms on every route change (cheaper than per-page mounts, and avoids the per-route
  arm/dispose churn the lazy-arm path pays). The shell aurora is the *page field*; the StoryHero
  per-page bg becomes a focal *accent over* it (see BG.W-FIELD-ACCENT-RECONCILE).
- **Per-route warm hue, reusing the ONE source.** `warmFieldHue(categoryId)` (`warm-field.ts`)
  already derives a warm `[25,95]`-clamped hue per category from the single `categoryHue` source —
  REUSE it to drive the shared aurora's palette rotation (a warm-projected palette per route), so
  the field shifts hue per category without a third color registry. The cool→warm projection
  (`warm-field.ts:62-74`) and the warm-cream identity are preserved; the aurora palette is the
  consumer of the warm hue, not the CSS clamp.
- **Calm by construction.** The shared field config is a low-intensity calm preset
  (`heroAuroraConfig`-style: `breathPeriod` long, low `nucleiDrift`, `opacityCeiling ≈ 0.5–0.6` so
  text-dense pages stay legible). It is the floor behind glass, never a focal viz.
- **Safari + budget.** Aurora is WebGPU-first/WebGL2-fallback (F4); the sub-2× DPR cap, offscreen-
  park, PRM-freeze, and software-raster→`auroraFallbackGround` guard all hold for the shell mount
  unchanged. On Safari the WebGL2 path + the static-ground fallback both apply; no `backdrop-filter:
  url` / SVG-goo is on this path, so it is cross-engine-clean.
- **Legibility floor holds.** The `--glass-backdrop: light` adaptive seam + `opacityCeiling`
  guarantee glass-over-field AA (the existing W55/W-DARK-MATERIAL machinery is untouched — the field
  just becomes a real aurora instead of a brown slab).

**Files touched.** `demo/layout/AppShell.vue` (swap the mount), `src/styles/paper.css` (DELETE
`.paper-field` + `.dark .paper-field` + `field-cel-drift` + the conic/radial stops + the
`--field-h` clamp), `src/components/custom/paper-backdrop/PaperBackdrop.vue` (drop the `field` /
`fieldHue` / `fieldIntensity` props + the `.paper-field` plane — PaperBackdrop returns to a pure
grain register, F6), `demo/stories/warm-field.ts` (re-target `warmFieldHue` to drive the aurora
palette rotation rather than `--field-h-raw`).

**Acceptance / π bar.** Live capture of ≥6 routes across categories (foundations/forms/display/
data/feedback/dock) shows a calm warm AURORA drift behind the glass — NO conic sheen, NO brown
slab, NO visible woven speckle; per-route hue shifts (forms warmer-amber vs feedback coral, etc.);
glass cards clear AA over the field both modes; exactly ONE GL context on a non-substrate route
(the shared shell aurora); the field persists (does not flash/re-arm) across a route change.
Folds in: defect #2 (metallic background everywhere).

### BG.W-FIELD-ACCENT-RECONCILE — collapse the per-page-bg category map onto the shared field; substrate routes opt OUT

**Intent.** Resolve the three-field-system incoherence (RC2) into ONE owner: the shell aurora is
the universal field; the per-page StoryHero bg is either an OPT-OUT (substrate routes that own a
focal GL context) or a FOCAL ACCENT (hero front-doors), never a second redundant page field.

**Idiomatic gestalt approach.**
- **The shared field is the default; routes opt out, not in.** Add a single per-route flag
  (`pageField?: false` or `ownsFocalSubstrate?: true` on the manifest row) that SUPPRESSES the
  shared shell aurora's paint for that route (drop its `opacityCeiling` to 0 / `display:none` the
  shell field) so a substrate demo route (blob, concentric, dot-flow-field, fourier-field, aurora
  studio…) mounts exactly ONE GL context — its OWN focal substrate — with no doubled shell field.
  This generalizes the ad-hoc "drop to paper to avoid a second GL" hack at `manifest.ts:153-158`
  into one honest budget knob.
- **Retire `CATEGORY_DEFAULT_BG` as a substrate-KIND switch.** Replace `{paper|grid|aurora|
  constellation|fourier}` per category (`manifest.ts:181-193`) with a per-category HUE+INTENSITY
  over the ONE shared aurora (the substrate kind is no longer a per-category choice — it is always
  the shell aurora, except where a route owns a focal substrate as content). The `kind` axis
  collapses: `aurora`/`grid`/`paper`/`constellation`/`fourier` as PAGE backgrounds are deleted from
  StoryHero (`StoryHero.vue:267-321`); the only per-page bg that survives is the FOCAL accent on a
  bespoke hero front-door (intro/hero/auth-shell), which is content, not field.
- **DockStage folds onto the shell field.** A dock route no longer needs its own DockStage aurora
  (`DockStage.vue`) — it reads the shared shell aurora as its backdrop (the glass-luminance observer
  threads the shell `<Aurora>`'s `canvasRef` instead of a route-local one). One fewer GL context;
  the dock glass reads against the same universal field.

**Files touched.** `demo/stories/manifest.ts` (replace `CATEGORY_DEFAULT_BG` with a hue/intensity
map + the `ownsFocalSubstrate` flag), `demo/stories/StoryHero.vue` (delete the per-page bg `kind`
branches; keep only the focal-hero accent path), `demo/stories/StoryPage.vue` (read the opt-out
flag), `demo/stories/dock/DockStage.vue` (consume the shared shell field instead of self-mounting),
`demo/stories/aurora-hero.ts` (retire the `StoryBackgroundKind` page-bg union; keep the hero
palette types).

**Acceptance / π bar.** Each substrate route shows EXACTLY its own focal GL viz with the shell field
suppressed (no doubled drift behind the demoed substrate); each dock route shows the shared field
behind the dock glass with no DockStage-local aurora; the per-page-bg `kind` switch is gone from
StoryHero; a route-change does not stack a second page field. Folds in: defect #6 (substrate
previews broken — the doubled/competing fields contribute), the one-GL-per-route budget.

### BG.W-PAPER-GRAIN-OPTIN — demote the global grain to an opt-in editorial register

**Intent.** The grain texture is a per-surface editorial primitive (math-paper, printed specimens),
never a global multiply. Stop painting `.paper-underpaint` over every route.

**Idiomatic gestalt approach.**
- Remove the unconditional `.paper-underpaint` plane from the shell (it rode inside the deleted
  `<PaperBackdrop field>` mount). `PaperBackdrop` (and the `paper-grain-overlay` utility) remain as
  an OPT-IN surface decoration a designer applies to a specific pane that editorially wants paper
  tooth (the existing `kind="paper"` math-paper register, now applied per-surface not per-page).
- Keep the grain TOKENS (`--paper-grain-tooth`, `--paper-grain-opacity`) — they are the library's
  paper identity. Only the GLOBAL application is retired. The blend law (multiply light / screen
  dark, `paper.css:57-92`) is preserved for the opt-in surfaces.
- The over-visible 0.22/0.16 opacity is re-evaluated for the opt-in case (a per-surface grain can be
  subtler than a global wash needed to be; tune to the JND on a real paper pane, not a global slab).

**Files touched.** `src/styles/paper.css` (the `.paper-field` deletion already removes the global
field; ensure `paper-underpaint` is no longer shell-mounted), `src/components/custom/paper-backdrop/
PaperBackdrop.vue` (pure grain register, F6 — drop the field welding), the math-paper / printed-
specimen demo panes (apply `paper-grain-overlay` per-surface where editorially wanted).

**Acceptance / π bar.** No global grain speckle on a default route (the woven texture is gone from
the universal field); the math-paper / printed-specimen panes still carry visible paper tooth where
applied; the grain tokens still resolve for opt-in surfaces both modes. Folds in: the "metallic
woven" half of defect #2; the aberrative top texture contribution to defect #5.

---

## Notes for the synthesis / cross-wave edges

- **Defect #1 (routing freeze) interaction.** The `.scroll-build` page-mount `animation`
  (`StoryPage.vue:72`) colliding with the `<Transition name="fade-slide">` is a SEPARATE audit's
  root cause, but the shared-shell-aurora decision HELPS it: a persistent shell field that never
  re-mounts on navigation removes one source of per-route mount churn. The field wave should NOT
  itself touch the route-transition layer; it just stops adding to the per-route mount cost.
- **Hue source DRY.** `warmFieldHue` / `categoryHue` / `SECTION_HUE_DEG` remain the ONE per-route
  hue source — the aurora palette becomes their consumer; no new color registry (preserves the
  `warm-field.ts:3-21` DRY fence).
- **Presets-in-consumers.** The shared shell aurora's calm config is the demo CHASSIS's preset
  (lives in `demo/`), NOT a library token — the library `<Aurora>` primitive is byte-untouched (the
  directive is a demo-shell field-architecture change + a `src/styles/paper.css` clean-break delete,
  not an aurora-engine change).
