# KS-API-COLOCATION — ONE grammar every component speaks; colocation as the module LAW

**Keystone spec (KS-C · structure + world). Author: Fable. Date: 2026-07-01. HEAD `f6fa1767` (tranche/BG).**
**Binding for the frozen plan waves (`docs/tranches/BG/execution/EXECUTION-PROGRESS.md:91-97,129-130`):**
`W-DEAD-SWEEP` (BG.W-DEAD-SWEEP) · F6.5 `BG.W-GOD-MODULE-STRUCTURAL` · F6.1 `BH.W-AXIS-GRAMMAR` ·
F6.2 `BH.W-SIZE-UNIFY` · F6.3 `BH.W-MOTION-AXIS` · `W-COLOCATE` (BG.W-COLOCATE) · `W-DESHADCN`
(BG.W-DESHADCN) · `BH.B2-leaf-verify` · `BH.B2-export-reshape` (+ the `/axes` subpath F6.1 mints).
**Research inputs (read in full, cited):** `research/API-sota.md` + `research/API-corpus.md`.
**Settled substrate (built on, never re-derived):** DEV-C F6.1–F6.3 (`pass-2/DEV-C-new-wave-specs.md:495-545`)
· BH PLAN §B2/B2.1-grammar (`docs/tranches/BH/PLAN.md:92-108`) · `useSurfaceAxis.ts` (the grammar model,
KEEP VERBATIM) · the landed B2.1-mech regen machinery (`subpath-policy.mjs`/`regen-exports.mjs`).
**The wave SET is frozen. The protected set (`SYNTHESIS-PASS1.md §4`) is inviolable:** the per-subpath JS
split + 1-GL-per-route budget · `useSurfaceAxis` · `createCanvasLifecycle` · the token model
(`--glass-level`/`--motion-weight` @property composition) · warm identity values · DOCK_SPRING
(R6′: `springPreset("dock")` = {0.68, 0.64}, byte-fenced as DERIVATION + current value — this lane never
touches it). RULINGS-PASS2 §CORRECTIONS are BINDING (R1: 10.5 owns the `useDockContextSilhouette` delete;
4.3 verifies — baseline row 8 names 10.5 only).

---

## §0 — The sequencing spine (stated once; every wave back-points)

```
W-DEAD-SWEEP ──────────────────────────────┐            (first; net-negative; after F8.5 TOKEN-MANIFEST)
F6.5 GOD-MODULE-STRUCTURAL ──┐             │
   (coordinates 4.4 dock)    │             │
B2.1-mech (LANDED c98ac8c8) ─┼─ F6.1 AXIS-GRAMMAR ── F6.2 SIZE-UNIFY
                             │        └───────────── F6.3 MOTION-AXIS   (⟂ F6.2; pairs with F5.2)
WS5 (viz) ─── W-COLOCATE                                     │
WS4-W0 + 3.5 ─ W-DESHADCN                                    │
WS2·WS4·WS5 ── BH.B2-leaf-verify                             │
WS12 (full BG close) ─ BH.B2-export-reshape  ◄── EVERYTHING ABOVE lands BEFORE the regen
```

The load-bearing edges, verbatim from the frozen plan + BH PLAN §B2.1-grammar (`PLAN.md:96-98`):
- **All three grammar waves land AFTER B2.1-mech (landed) and BEFORE B2.1-swap's regen** — so `/axes` is in
  the regen'd entry-set and B2.2's `/api` fold never re-publishes the pre-grammar fragments.
- **F6.5 BEFORE F6.2** — decompose the dock ONCE, then rename `density`→`size` ONCE in the carved leaves
  (never a double-touch of the `--dock-scale` neighborhood; coordinate with row 4.4 `W-DOCK-DECOMPOSE`).
- **BH.B2-export-reshape is the FINAL `package.json` writer** (WS12) and the SOLE peer-bump site. Every
  rename this lane mints (axis/size/motion/`goo-blob→blob`) must be ON DISK before its regen runs.

---

## §1 — The hallmark delineated

> **A world-class material behind ONE legible grammar, in a repo where the module IS the feature.** A
> stranger recognizes glass-ui structurally by three facts: (1) every visual behaviour is a CSS custom
> property retunable from `:root` with zero library edit — token-first, the identity axis; (2) every
> component speaks the SAME four orthogonal axis words — `variant` (look) · `size` (scale) · `surface`
> (material decoration) · `motion` (weight) — learned once, obeyed everywhere, zero homonyms, zero private
> dialects; (3) every feature is ONE colocated directory (components + `composables/` + `constants.ts` +
> `shaders/` + README) shipping as ONE independently tree-shaken chunk, with no file over the 500-line
> module law and no export that lies. The RESPEC verdict (`SYNTHESIS-PASS1.md §1`) named the disease
> precisely: the MATERIAL is excellent, the SKELETON over-articulated — a `surface` prop meaning two
> things, a `default` size rung hiding its own scale behind a non-answer, three names for one compactness
> axis, a 4-boolean motion scatter, a 711-line god-SFC, 96 export entries carrying dead and mis-named keys,
> and a shadcn starter idiom never owned. KS-API-COLOCATION's verb is **COLLAPSE**: mint the grammar ONCE
> (`_shared/axes.ts`), decompose the god-modules ONCE against a hardened ratchet CONTRACT, sweep the dead,
> own the idiom, and reshape the export surface at the free 5.0.0 break — with the token model, the
> per-subpath split, and `useSurfaceAxis` byte-untouched.

**The bar:** a consumer learns four axis words once and every component obeys them · a bundler pulls exactly
one family's chunk and nothing else · the 5.0.0 break is a complete mechanical rename map, never a wall of
surprises · `wc -l` finds no src file over 500 outside the strictly-bounded exemptions · every export
resolves to something alive.

---

## §2 — SOTA grounding (the research, compressed to verdicts)

Full findings + links: `research/API-sota.md §2` (read in full; the adopt/reject calls below are binding).

| Verdict | Finding | Consequence here |
|---|---|---|
| ADOPT | `variant`/`size`/`orientation` + cva is the converged 2026 vocabulary | F6.1 makes the axis SET explicit + homonym-free; never re-invents names |
| ADOPT | The field's two most-punished API sins: homonyms, and renames without a migration map | Every F6 rename = MIGRATION row + machine-readable rename-map line (§4.10) |
| ADOPT | `size="default"` is the shadcn anti-pattern — a non-answer on an ordinal scale | `md` is the middle rung NAME; default-ness stays a `defaultVariants` concern |
| ADOPT | Tokens-as-CSS-vars is the SOTA theming layer; theme objects forfeit runtime retune | The grammar reshapes the TS PROP surface ONLY; axis enums WRITE CSS vars/attrs (§3.4) |
| REJECT | JS theme object / `<ThemeProvider>` | The cascade is the identity; `/axes` is types+vocabulary, never a provider |
| ADOPT | The barrel trap is real; the per-subpath split is the cure glass-ui already made | BH.B2's win = net-indirection LOC DOWN + zero dead/homonym keys, NOT fewer subpaths |
| ADOPT | Rolldown/Vite-8 trusts `sideEffects` strictly — a wrong `false` drops a stylesheet | Export-reshape re-verifies `sideEffects`; CSS/font entries allowlisted, never blanket-`false` |
| ADOPT | Feature-slice colocation + fitness-function enforcement (`tsarch`-class) | `proof:colocation` + `proof:no-god-module` ARE the fitness contract; carve along ENGINE seams |
| ADOPT | Shader/manifest exemptions must be strictly bounded or they get abused | `*.{wgsl,glsl,frag,vert}.ts` glob + `property-regs.css` declaration-list-only shape check |
| REJECT | Hand-writing a jscodeshift codemod now | No consumer demand; the rename map COULD back one — successor seed (§7) |

---

## §3 — First-principles design (the greenfield loop on the four contested questions)

### GQ-1 · The final `axes.ts` — types, defaults, the sub-range law, the two conflation splits

**Directions brainstormed.**
- **(a) Types-only module.** Pure `export type` lines; the unions hand-spelled. Zero JS. But the legal rung
  ORDER then exists only in prose — the `size-grammar` gate arm, the demo axis matrices, and the π specs
  each re-spell it (the drift seam this whole keystone exists to kill).
- **(b) Const-tuple-derived types.** `export const SIZES = [...] as const; export type Size = (typeof
  SIZES)[number]` — the tuple is the SINGLE authority, the type is derived, gates/stories/π iterate the
  same frozen vocabulary at runtime. ~15 lines of JS, zero behavior.
- **(c) Zod/valibot runtime schema.** Validated axes. A dependency + runtime cost for a compile-time
  problem; the library's fail-explicit posture is `useStalePropWarning` (dev-WARN) + vue-tsc — sufficient.

**GOLDEN: (b).** One authority per union (the tuple), the type derived — drift between the type, the gate,
and the story matrix becomes structurally impossible. **Self-challenge:** (i) does the tuple violate the
plan's "types-only `/axes`"? It bends it — ~0.1KB of frozen const arrays, no functions, no component code;
recorded as a spec-perfection delta, flagged in §7 (the alternative, direction (a), forces a `TYPES_ONLY`
special case through `subpath-policy.mjs` AND a skip-lane in `verify-export-types`'s runtime-import probe —
MORE machinery to ship LESS). (ii) Do the tuples clear ≥2 consumers? Yes by construction: the
`proof:encapsulation` arms read them (the legal-rung source), the demo axis-matrix stories iterate them,
and the π specs enumerate them — and each union's TYPE is itself derived from its tuple (consumer #0).
(iii) Is `xl` contrived? No — the dock's `audacious` is a real fourth ordinal above `lg` (a shipped hero
register); refusing `xl` would force a parallel adjective union, the exact disease.

**The final form (F6.1 writes exactly this file):**

```ts
// src/components/ui/_shared/axes.ts — the ONE grammar home (BH.W-AXIS-GRAMMAR).
// Every axis union in the library derives from a tuple here or in useSurfaceAxis.ts.
// A private surface/tier/size/orientation/motion union anywhere else in src/ is
// forbidden by construction (proof:encapsulation · axis-grammar).

export type { Surface, SurfaceTier } from "./useSurfaceAxis"; // KEEP-VERBATIM leaf; re-exported, never moved

/** The scale axis — one honest ordinal, rung names ≡ the `--control-h-*` token cohort. */
export const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export type Size = (typeof SIZES)[number]; // default "md" everywhere (a defaultVariants concern, not a rung name)

/** The layout axis — the 13 inline copies factor onto this, zero value change. */
export const ORIENTATIONS = ["horizontal", "vertical"] as const;
export type Orientation = (typeof ORIENTATIONS)[number]; // default "horizontal"

/** The motion-weight axis — opt-DOWN, not opt-in (liquid-weight universal). */
export const MOTIONS = ["full", "reduced", "off"] as const;
export type Motion = (typeof MOTIONS)[number]; // default "full"; PRM > prop > default (§3.4)

export const SURFACES = ["glass", "veil", "opaque", "clear"] as const; // mirrors useSurfaceAxis (gate-asserted ≡)
```

**The sub-range LAW (binding on every component):** a component never mints a size/orientation/motion/surface
string union — it declares `Extract<Size, "sm" | "md" | "lg">` (a RESTRICTION of the one union). Adjective
rungs (`default`, `comfortable`, `spacious`, `audacious`, `mobile`, `compact`) are BANNED in any size-shaped
union — the `size-grammar` arm greps for them. `xl` is legal only where a physical register genuinely
exceeds `lg` and maps to a real token rung (the dock is the sole HEAD consumer).

**The dock edge — `audacious → xl`, RATIFIED.** `DockDensity` (`compact·comfortable·spacious·audacious`,
`useDockShellProps.ts:21`) folds `compact→sm · comfortable→md · spacious→lg · audacious→xl`; the dock's
prop becomes `size?: Extract<Size, "sm" | "md" | "lg" | "xl">` (default `md`). `xs` is NOT offered (no dock
register below compact exists — a sub-range, not a padded union). The `data-density` attr + the
`dock/density.css` rung selectors rename to `data-size` in lockstep (see F6.2 §4.4).

**The two conflation splits, RATIFIED (shape ≠ size):**
- **Button `icon`/`icon-sm` → `iconOnly?: boolean` (default `false`), orthogonal to `size`.** Mapping:
  `size="icon"` → `iconOnly size="md"`; `size="icon-sm"` → `iconOnly size="xs"` (the old rung read
  `--control-h-xs` — verified `button/index.ts:196`). Button's size becomes
  `Extract<Size, "xs" | "sm" | "md" | "lg">`; `iconOnly` swaps the pad recipe to the square `p-0
  w-(--control-h-<rung>)` form at ANY rung (an `iconOnly lg` becomes expressible — a natural extension, not
  a new register; it reads the same cohort tokens).
- **Chip `cell` → `shape?: ChipShape` (chip-LOCAL: `"pill" | "cell"`, default `"pill"`).** A 72px icon+label
  tile is a SILHOUETTE, not a scale rung (`chipVariants.ts:54-64` already admits it — "a card, not a
  pill"). `ChipShape` lives in the chip family (NOT `axes.ts`): shape vocabularies are legitimately
  per-family (the dock's `shape="card"` is a different silhouette set), so the axis law here is SEMANTIC,
  recorded in `axes.ts`'s header canon: *a silhouette word never appears in a `size` union* — the gate arm
  enforces the negative, not a forced shared `Shape` union with one consumer per member (that would be the
  inverse over-unification smell).
- **The tier homonym resolution rides Surface's neighborhood:** `GlassPanelVariant` (`GlassPanel.vue:25-30`)
  is value-identical to `SurfaceTier` — GlassPanel `variant` → `tier: SurfaceTier` (DELETE
  `GlassPanelVariant`), and its render-backend `tier` → `renderTier: GlassTier` (the F1 homonym killed both
  directions). `CardTier` (`Card.vue:35-43`) STAYS a documented Card-local EXTENSION —
  `SurfaceTier | "opaque" | "deep"` re-expressed literally as that union type (the two extra rungs are
  decoration COMPOSITES mapping to class pairs; folding them away is a bigger break than 5.0.0 owes and
  `surface="opaque"` overlap is recorded as a KNOWN redundancy, not silently cut).

### GQ-2 · The `/axes` discovery posture vs types-on-family-subpaths

**Directions.** (a) No `/axes` — grammar types on the root barrel + each family subpath re-exports what it
uses. (b) A generated `/axes` subpath mapping 1:1 to `axes.ts` (types + the four tuples), REGISTERED in
`subpath-policy.mjs` so it rides the regen — never hand-listed. (c) Keep a slimmed `/api` (reduced
aggregator).

**GOLDEN: (b), AND family colocation — they are complements, not rivals.** The division of labor: a
component's OWN prop types live on its family subpath (`import type { CardTier } from
"@mkbabb/glass-ui/card"` — colocated, no aggregator to drift); the four CROSS-CUTTING grammar unions live
on `/axes` (a payload-tier consumer importing only `/dock` + `/forms` reaches `Size`/`Motion` without the
root barrel). `/axes` cannot become `/api`-redux because it maps 1:1 to ONE source file with a gate-fenced
membership: exactly the grammar tuples/types + the `useSurfaceAxis` re-exports — the `axis-grammar` arm REDs
any export from `axes.ts` that is not an axis union/tuple (the anti-grab-bag fence). **Self-challenge:**
(i) is `/axes` a 97th entry when the reshape's whole point is collapse? The reshape's measure is
net-indirection LOC and dead/homonym keys, not raw key count (research §2.3) — `/axes` replaces the
854-line `/api` aggregator with a ~40-line leaf; the trade is the collapse. (ii) Does `/api`'s death strand
its 203 symbols? No — B2.2's re-home map covers all 203; F6.1/F6.2 AMEND three of its rows (§4.9).
(iii) Chunk shape: `dist/axes.js` emits the four tuples (~0.1KB gz) through the normal entry machinery —
no `TYPES_ONLY` special case in the regen, no skip-lane in `verify-export-types` (both probes run
uniformly). Simplicity won twice. (iv) **The registration file, PINNED** (the CURATED shape maps a subpath
to a flat `src/*.ts` barrel, never a deep path): F6.1 mints `src/axes.ts` — a one-line
`export * from "./components/ui/_shared/axes"` re-export — and registers `axes: "src/axes.ts"` in the
CURATED bucket (shape-identical to the 11 existing entries); the grammar SOURCE stays colocated at
`_shared/axes.ts`. B2.3 then relocates `src/axes.ts` to `src/entries/axes.ts` WITH the other flat barrels
in its one uniform move — the regen and B2.3 never fight, no special case either side.

### GQ-3 · The god-module RATCHET CONTRACT — how a new baseline is structurally forced to drain

**Directions.** (a) **Numeric entry cap** — `RATCHET_BASELINES.length ≤ N`, N ratcheting down. Arbitrary:
N encodes no knowledge; a legitimate mid-feature regrow (the BB.W-CARVE5 precedent — three files re-grew
and were re-drained) either busts the cap spuriously or the cap is slack enough to be decorative.
(b) **Companion carve wave-id** — every baseline row carries an `owner` that must resolve to a REAL wave
row; booking the debt is the price of incurring it (the `proof:disposition-live` decided-destination
precedent — a phantom destination REDs). (c) **Both** — owner + cap.

**GOLDEN: (b) + the ∅-at-cut condition — the cap is the CUT, not a number.** The redesigned contract
(F6.5 amends `proof-no-god-module.mjs` in place — its OWN true-positive gate, per the frozen row):

```js
// The hardened row shape (F6.5). A bare number row is a SHAPE violation (born-RED migration).
RATCHET_BASELINES = {
  "styles/glass/liquid-morph.css": { lines: 850, owner: "BG.WS8" },   // every row: lines + a REAL wave-id
  ...
};
RATCHET_EXEMPT = {
  shaders: "src/**/*.{wgsl,glsl,frag,vert}.ts",                        // indivisible program literals
  manifests: ["styles/tokens/property-regs.css"],                      // css-registration-manifest class
};
```

Five arms: **R-A** zero violations outside baselines (existing) · **R-B** the monotonic drain — a row whose
file shrank ≤500 must be DELETED in the same diff; a row whose file shrank below baseline but stayed >500
re-pins DOWN only (existing stale-row guard, kept) · **R-C** every row's `owner` resolves to a live wave id
(EXECUTION-PROGRESS row or `docs/tranches/<X>/waves/<id>.md`) — a NEW baseline without a resolving owner is
structurally impossible (the gate REDs the diff that adds it); a self-test bite plants a phantom
`"BG.W-DOES-NOT-EXIST"` owner · **R-D** the exemptions are strictly bounded: the shader glob, plus
`property-regs.css` LIVE-parsed each run for the declaration-list-only shape (any selector-block/logic
disqualifies it back into the ratchet — CRIT-3 WATCH-2, R16) · **R-E** the VISIBLE drain: `violations == []
AND RATCHET_BASELINES == {}` (exempt set aside) is a `proof:build` cut-battery arm (R3 taxonomy) —
`BG.W-CUT`'s close-state precondition, so the 16-row drain chain is a tag-blocking gate, not prose.
**Self-challenge:** does R-C just make agents book junk waves? A junk owner must be a REAL row in the
frozen plan — inserting one is an orchestrator act, which is exactly where that pressure belongs. Rejected
(c)'s numeric cap as decorative given R-E.

### GQ-4 · The Motion axis default × F5.2's CSS weight-default — one inversion at two layers

**The two layers, named so they never fight.** F5.2 `BG.W-LIQUID-WEIGHT-DEFAULT` inverts the **CSS
transition default**: base interactive spatial legs ride the spring-derived `linear()` (generated by
`regen-spring-tokens.mjs`); `.motion-calm` is the explicit opt-out class. F6.3 `BH.W-MOTION-AXIS` inverts
the **JS/prop gesture default**: the optional physics enrichments arm at `motion="full"` (the default);
`reduced`/`off` opt DOWN. Same inversion, two layers — the SYNTHESIS ruling #6 sentence made mechanism.

**Directions for the coupling.** (a) The prop mints its own calm recipe (a `motion-reduced` class with its
own transition overrides) — a SECOND register; forbidden on its face. (b) The prop writes a `data-motion`
attr and F5.2's calm register matches BOTH doors — `:where(.motion-calm, [data-motion="reduced"],
[data-motion="off"])` — ONE recipe, two entry points (class for non-component/consumer markup, prop for
components). (c) The prop toggles `.motion-calm` directly via class binding — couples the component to a
demo-adjacent class name and collides with consumer-authored `class` merging.

**GOLDEN: (b).** The binding contract:
- `motion="full"` (default) — writes NOTHING (the token/CSS defaults are the full register; zero-delta at
  default, the no-op floor). Gesture enrichments armed.
- `motion="reduced"` — binds `data-motion="reduced"`; F5.2's calm selector (one rule, two doors) drops the
  spring legs to the calm bezier register; JS gesture physics degrade to their CSS floor (press = the
  `.tap-squish` `:active` carve; drag = discrete snap, no squish — exactly the PRM degrade paths every
  primitive already ships). The prop and PRM produce the SAME visual state by construction (no second
  degrade path to verify).
- `motion="off"` — binds `data-motion="off"` AND writes `--motion-weight: 0` inline on the component root
  (the existing live scalar `useLiquidPress.ts:86`/`useMorphField.ts:315`/`useLiquidFlex.ts:115` already
  read — ZERO new plumbing; a weight→0 zeroes the cartoon channels). Gesture enrichments unbound; the
  functional interaction (click selects, drag-handle still dismisses if `dragDismiss`) stays — motion off,
  meaning never off.
- **Precedence: PRM > prop-down > default.** PRM forces `full→reduced` at the CSS layer regardless of the
  prop (the OS setting is involuntary; a11y absolute — the `[data-allow-motion]` carve remains the ONLY
  PRM-visible escape and the `motion` prop is NOT one). The prop may go below PRM (`off`), never above.
- **The Card question (the settled DEV-C reading, RATIFIED here):** `pressable` dies as a boolean, and the
  press CAPABILITY derives from interactivity — a Card presses iff it renders interactive (`as="button"`/
  `as="a"`/`href`/`role="button"` on the root) and `motion !== "off"`; a bare static `<Card>` never presses
  because it has no interaction to enrich (`DEV-C:524-526` — "a static plate is a non-interactive Card,
  not `pressable=false`"). The "static content plate never presses" fence holds by DERIVATION, not by a
  default. The detection is explicit-signal-only (the `as`/`href`/`role` props) — never listener-sniffing
  (an analytics `@click` on a static card must not make it press).
- **The kept contracts (the inverse-smell fence, verbatim from DEV-C):** `keepDockOpen` · `dragDismiss` ·
  `responsive` stay distinct props — they are gesture CONTRACTS (role/behavior), not motion intensity.

**Self-challenge:** does default-ON drag on SegmentedTabs/DockLayerGroup surprise consumers? It is the
liquid-weight-universal law applied (physics is the default; the strip was always click-selectable — the
pull is an enrichment on the same model write), it lands at the 5.0.0 free break with a MIGRATION row, and
the F5.2 Fable storybook sweep judges the resulting gestalt across the whole demo (§4.5). Does
`data-motion` collide with anything? Grep at HEAD: no `data-motion` reader in src/ — clean mint.

---

## §4 — Wave binding (the nine rows, perfected; ids frozen)

### 4.1 · `BG.W-DEAD-SWEEP` (runs FIRST — net-negative) — **posture H (mechanical)**

- **Deliverables.** DELETE `--corner-shape-card`/`--corner-shape-pill` (`styles/theme/radius.css:105-106`,
  both resolve `round` = the initial value — dead knobs) + any `var()` reader lines; DELETE
  `selectable-chip/selectableChipVariants.ts` (the alias file beside the live `chipVariants.ts` — verified
  both on disk); one MIGRATION row per symbol.
- **Gates.** `proof:encapsulation` · `dead-sweep` arm (the deleted names DEFINITION-ABSENT src-wide) +
  `proof:squircle-language` gains the negative-guard clause (a re-minted `--corner-shape-{card,pill}` REDs
  — the dead-knob-witness PROTECT class, R8). Born-RED via a planted re-mint self-test bite.
- **Fable arm:** none (zero paint — the tokens resolved their initial values). **Preconds:** F8.5
  TOKEN-MANIFEST (the manifest names what is dead before the sweep cuts it).

### 4.2 · F6.5 `BG.W-GOD-MODULE-STRUCTURAL` (decompose ONCE; harden the ratchet) — **posture H**

- **Deliverables.** (1) Carve the **2 live-RED un-baselined CSS** files <500 — `styles/glass/ladder.css`
  (527) + `styles/dock/shell.css` (510) — along single-writer rung-group seams, dist BYTE-IDENTICAL (the
  AX.W06/W-CARVE3 cascade-position-preserving discipline; `read-css-monoliths` order re-pointed; reader
  gates FOLLOW into the leaves). (2) Coordinate the `GlassDock.vue` (711) drain with row 4.4
  `W-DOCK-DECOMPOSE` (4.4 owns the dock engine-seam carve — measure/spring/hit/reserve single-writer
  boundaries; F6.5 owns the ratchet-row accounting so the drain is booked ONCE). (3) Land the GQ-3 contract:
  the `{lines, owner}` row shape + R-A…R-E arms + the phantom-owner and shape-violation self-test bites +
  the strict exemption checks. (4) The drain-chain table (each of the 16 rows → owner wave → band) lands IN
  the gate file header — the VISIBLE cut gate.
- **NOT F6.5's (owner routing, R1-corrected):** `api/index.ts` 505 → B2.2 (deleted whole) ·
  `useDockContextSilhouette.ts` 551 → **row 10.5 DELETES** (4.3 verifies DEFINITION-ABSENT; baseline row 8
  names 10.5 only) · `liquid-morph.css` 850 → WS8 · canvas/webgpu/luma/tabs leaves → W-COLOCATE ·
  `useDockFission.ts` 604 → 4.5 (R4).
- **Gates.** `proof:no-god-module` amended IN PLACE (its own true-positive gate; never a singleton fork).
- **Fable arm:** none (byte-identical dist; the π floor is the existing suite green + `diff` on built CSS).
- **Preconds:** BEFORE F6.2; coordinates 4.4.

### 4.3 · F6.1 `BH.W-AXIS-GRAMMAR` (mint the vocabulary; kill the homonyms) — **posture H**

- **Deliverables.** (1) NEW `src/components/ui/_shared/axes.ts` — the §GQ-1 final form VERBATIM. (2)
  Homonym kills: `GlassPanel variant`→`tier: SurfaceTier` + backend `tier`→`renderTier: GlassTier`
  (`GlassPanel.vue:42,50`); `TabsIndicator surface`→`plate` (`ui/tabs/TabsIndicator.vue:17` — the reka
  `ui/tabs/` dir, NOT `custom/tabs/` where SegmentedTabs lives; the path disambiguated so the homonym-kill
  and W-COLOCATE's 512-line carve never point at the wrong tabs dir); fold
  `CardSurface`/`SkeletonSurface`/`BadgeVariants['surface']` onto `Surface` sub-ranges (`Extract<Surface,…>`
  — Badge's surface CVA is `{loud, glass}` on disk (`badge/index.ts:67`; NO `quiet` member — the corpus
  §1c `loud·quiet·glass` triple is stale, corrected here): `glass` folds onto `Surface`, and `loud` — the
  sole non-Surface member — re-homes onto Badge's `variant` axis; `cartoon` moves off the union to a
  Card-local decoration boolean-adjacent member exactly as `useSurfaceAxis.ts:12-18` already documents). (3) Factor the 13 inline `"horizontal"|"vertical"` copies
  onto `Orientation` (zero value change). (4) Publish the 4 types + tuples on the root barrel; mint the flat
  `src/axes.ts` re-export and register `axes: "src/axes.ts"` in `subpath-policy.mjs` (CURATED bucket, 12th
  entry — the §GQ-2(iv) pin: flat-barrel shape now, relocated to `src/entries/axes.ts` by B2.3 with the
  rest) so `/axes` is GENERATED — amends B2.2's map (§4.9). (5) CLAUDE.md-lineage doc fix: the `Surface` "three-rung"→"four-rung" drift (the prose, not
  the leaf — `API-corpus.md §1b`). (6) Fold the a11y-role canon line (role DERIVED from variant/type, never
  a `role` prop) + publish `ExpandableContainerPart` (B3-FC3). (7) **RESHAPE, then extend,
  `STALE_PROP_RECIPES`** (`useStalePropWarning.ts:37`): the HEAD map is a flat name-keyed
  `{propName: recipe}` (keys `variant`, `flush`) — it CANNOT carry this lane's extends (`variant` is
  already taken by the Card pane-API recipe, and `surface` must warn `→plate` on TabsIndicator while
  STAYING a valid prop on Card — a global name-keyed map cannot disambiguate homonymic per-component
  recipes). F6.1 reshapes it component-scoped — `{Component: {prop: recipe}}` — with the lookup routed
  through the component name `useStalePropWarning` already receives at every call site (a shape change,
  zero new plumbing; `StalePropName` re-derives per component). THEN it extends with every retired name
  this lane cuts (`variant`-on-GlassPanel, `surface`-on-TabsIndicator, `density`, `pressable`,
  `draggable`, `spring`, `liquidDrag`, size `default`/`icon`/`icon-sm`/`cell`) — the dev-WARN is the
  no-alias law's migration UX: a stale prop warns with the canonical recipe FOR ITS component, never
  silently no-ops, never the wrong component's recipe.
- **Type signatures (binding):** as §GQ-1. `Surface`/`SurfaceTier` re-exported from `useSurfaceAxis.ts`
  (the leaf KEEP-VERBATIM; `axes.ts` is the grammar's front door, not a re-home).
- **Gates.** `proof:encapsulation` · `axis-grammar` arm, born-RED on HEAD: (a) no private
  surface/tier/size/orientation/motion-shaped union outside `axes.ts`+`useSurfaceAxis.ts` (sub-range
  `Extract<>` forms pass); (b) `Surface` 4-member ≡ `SURFACES`; (c) zero prop homonyms (the named pairs
  asserted); (d) `axes.ts` membership fence — only axis unions/tuples export (the anti-grab-bag clause);
  (e) self-test bites: a planted private union + a planted grab-bag export both flag.
- **Fable arm:** none — renames, byte-identical π (say it honestly: this wave moves zero pixels).
- **Preconds:** B2.1-mech (LANDED); BEFORE B2.1-swap. **MIGRATION:** one row per rename + rename-map lines.

### 4.4 · F6.2 `BH.W-SIZE-UNIFY` (clean-break density/size → `Size`) — **posture H**

- **Deliverables (the full disk census, `API-corpus.md §1c`):**

| Component(s) | HEAD | 5.0.0 | Notes |
|---|---|---|---|
| Button | `size: default·xs·sm·lg·icon·icon-sm` | `size: Extract<Size,"xs"\|"sm"\|"md"\|"lg">` + `iconOnly` | `default→md`; `icon→iconOnly md`; `icon-sm→iconOnly xs` |
| Input/Switch/Textarea/NumberFieldInput | `ControlSize = sm·default·lg` | `Extract<Size,"sm"\|"md"\|"lg">` | `ControlSize` type DELETED → `Size` sub-range; `controlSizeClass("md")` = the no-op rung (byte-identical) |
| Slider | `sm·md·lg` ✓ | type re-points to `Extract<Size,…>` | already honest — the model row |
| SelectableChip/ToggleChip | `sm·md·lg·cell` | `Extract<Size,"sm"\|"md"\|"lg">` + `shape: ChipShape` | `cell→shape="cell"` |
| GlassDock | `density: compact·comfortable·spacious·audacious` | `size: Extract<Size,"sm"\|"md"\|"lg"\|"xl">` | `DockDensity` DELETED; `data-density`→`data-size` + `dock/density.css`/`overflow.css` selector renames in lockstep; `[data-preset="cockpit"]` composes unchanged |
| Configurator/ConfiguratorRow | `density: mobile·compact·comfortable·spacious` | `size: Extract<Size,"sm"\|"md"\|"lg">` | `ConfiguratorDensity` DELETED; `mobile` DROPPED (a `pointer:coarse` responsive token state, never a chosen rung); the `data-density` attr + `@container style(--density:)` companion rename to `data-size` + `style(--configurator-size:)` (component-scoped — never a bare inherited `--size`) |
| MetricPill | `density: comfortable·spacious` | `size: Extract<Size,"md"\|"lg">` | the 2-member sub-range, honest |

- **The token fence:** the `--control-h-*`/`--dock-scale` cohorts are KEEP-VERBATIM — the prop selects a
  rung, the token holds the magnitude (`useControlSize.ts:1-19`); F6.2 renames the SELECTOR layer only,
  which is why the migration is small.
- **Gates.** `proof:encapsulation` · `size-grammar` arm, born-RED on HEAD (6 divergent unions): no `density`
  prop exports; no size-shaped union carries an adjective rung (`default`/`comfortable`/`spacious`/
  `audacious`/`mobile`/`compact`); every rung ∈ `SIZES`; the `data-density` attr DEFINITION-ABSENT;
  self-test bite plants a `size: "default"` union.
- **Fable arm:** none (renames + attr/selector re-keys; byte-identical π — the dock rung geometry values do
  not change, only their names). **Preconds:** F6.1 + F6.5 (dock decomposed first — the renames land in the
  carved leaves ONCE). **MIGRATION:** rows per the table above.

### 4.5 · F6.3 `BH.W-MOTION-AXIS` (the 4-boolean scatter → `Motion`) — **posture H + ONE visual clause**

- **Deliverables.** The §GQ-4 contract VERBATIM: `motion?: Motion` on the six carriers (`Card.vue` ·
  `Slider.vue` · `DialogContent.vue` · `SheetContent.vue` · `SegmentedTabs.vue` · `DockLayerGroup.vue` —
  the disk grep; the plan's "7-boolean" counts prop INSTANCES, the disk truth is 4 names across 6 SFCs);
  the boolean names die; `data-motion` + the `--motion-weight: 0` off-write; the two-door calm selector
  handshake with F5.2; Card press derived-from-interactivity; kept contracts untouched.
- **Gates.** `proof:encapsulation` · `motion-axis` arm, born-RED: no `draggable`/`pressable`/`spring`/
  `liquidDrag` prop exports — **scoped to component `defineProps`/CVA prop surfaces ONLY** (the
  props-not-option-fields fence, named here so the arm cannot born-RED on legitimate holders: 8 internal
  composables own those words as OPTION-interface fields at HEAD — `useDrawerSnap.spring` ·
  `useDockFission.draggable` · `dockMorphContext` · `useDockItemDrag` · `useDockOrientationMorph` ·
  `useLayerTransition` · `useTabDragMorph` — none is a public prop, NONE renames; internal `use*`/`*Context`
  option interfaces are explicitly EXCLUDED from the grep surface); every `motion` prop types to `Motion`;
  the `data-motion` write present on each carrier; the PRM-precedence clause (no code path lets the prop
  escalate past PRM); self-test bites plant a re-minted `pressable` prop (must flag) AND a `spring` option
  field on a synthetic composable (must PASS — the fence proven both directions).
- **The honest posture split (reconciling the plan-table `H` with DEV-C's `VISUAL`):** the prop COLLAPSE is
  mechanical (H — renames resolve to the same physics the booleans did). The ONE behavioral delta — gesture
  enrichments flip default-ON — is visual, and it carries `tests-visual/motion-axis.spec.ts` (press/drag
  gestalt across Card/Tab/Slider/Dialog under `full` vs `reduced`, both modes, Chromium + WebKit) **+ the
  F5.2 Fable storybook sweep as its gestalt judge** — F5.2's sweep runs the full storybook AFTER the
  default inversion lands at both layers, so the Fable verdict covers the joint state (one sweep, two
  layers; no second card set unless the orchestrator flips the row to P — flagged §7). DesignSync surface:
  the interactive-gesture card set (DEV-C's naming, reused by the sweep).
- **Preconds:** F6.1; ⟂ F6.2 (disjoint props — may run concurrent); PAIRS with F5.2 (the two-door selector
  is authored once, in F5.2's calm register file; F6.3 binds the attr).
  **MIGRATION:** `draggable`/`pressable`/`spring`/`liquidDrag` → `motion` — one row.

### 4.6 · `BG.W-COLOCATE` (the WS4 carve fold — feature-slice as LAW) — **posture H**

- **Deliverables.** The 3 dir moves + the oversize-leaf carves, per the frozen row: `createCanvasLifecycle.ts`
  (695) + `useWebGPUCanvas.ts` (606) → row 10.12's carve shapes; `useGlassBackdropLuminance.ts` (534) → its
  SOLE owner home (10.13); `SegmentedTabs.vue` (512), timeline, Slider partials, the std140-builder — each
  along ENGINE seams (single-writer-of-a-scalar is the boundary; never an arbitrary line split). Every carve
  DELETES its ratchet row in the same diff (R-B) and reader gates FOLLOW into the leaf (the
  `proof:webgl-substrate-single` follow-the-composition precedent). `[data-size]` inline styles KEPT (the
  structural-arbitrary precompile — a colocation NON-target, stated so no agent "fixes" it).
- **The module LAW (this wave's canon line, recorded in `design-idioms`-adjacent docs):** a feature is ONE
  dir — components at root, `composables/`, `constants.ts`, `shaders/`, `skeleton/`, README (the AY.W-COLOCATE
  shape); the dir's barrel is its public interface; carved leaves import each other by SOURCE path;
  `proof:colocation` + `proof:no-god-module` are the standing fitness functions.
- **Gates.** `proof:encapsulation` · colocation arm (dir-shape + the moved files' new homes) +
  `proof:no-god-module` rows drain. **Fable arm:** none (byte-identical render π). **Preconds:** AFTER WS5.
  The BH-side confirmation of these exact leaf shapes is `BH.B2-leaf-verify`'s (§4.8) — this wave carves,
  that row verifies; no double-ownership.

### 4.7 · `BG.W-DESHADCN` (own the idiom — ONE concern) — **posture P (VISUAL — the lane's one Fable arm)**

- **Deliverables.** (1) The `--ring`→`--focus-ring-color` clean break is **MINT-AND-MIGRATE**, not a
  re-point: `--focus-ring-color` is NOT on disk at HEAD (`grep -rn focus-ring-color src/` = 0 — the corpus
  §1e / SOTA §4 "already present / divergence COMPLETED" claim was disk-false; corrected here). The real
  chain: `--focus-ring-shadow` (`scale-paper.css:83`) reads `var(--ring)`, and `--ring` is the raw color
  declared 3× (`color-radius.css:102` · `dark-arm.css:100` · `light-dark.css:118`). The wave MINTS
  `--focus-ring-color`, moves the 3 declarations onto it (all three arms — the light-dark() arm included),
  re-points `--focus-ring-shadow`'s `var(--ring)` read, then migrates the 7 style readers; `--ring` dies
  (the shadcn remnant; atlas by-name ask row `migrate-ring-to-focus-ring-color` rides BH B7). (2) The
  no-shadcn-default 233-file sweep — every vendored shadcn recipe re-read against the glass-first canon:
  the form-control register (Input/Textarea/Select/Combobox/TagsInput/NumberField) re-grounded on the
  `--control-surface-*` material, no orphan shadcn utility chains. (3) tailwind-v4-idiom pass (`@theme`/
  `@utility` expression, never pasted raw — the Tailwind-first law). (4) The binding-sweep: stale reka-ui
  prop/emit bindings (`:pressed`, `v-model:search-term`, `tag=` — the silent-no-op class from memory) audited
  across the swept files.
- **Gates.** `proof:encapsulation` · deshadcn arm (zero `--ring` readers; the sweep census; the
  binding-sweep table) — born-RED on the 7 readers.
- **Fable arm (NAMED — this wave moves pixels):** Fable reviews the **form-control material six-state
  matrix** (rest · hover · focus-visible · active · aria-invalid · disabled) across the forms band, both
  modes, over a busy backdrop. **designSyncSurface:** `/forms` six-state matrix. π:
  `tests-visual/deshadcn-forms.spec.ts` (the focus ring resolves off `--focus-ring-color` on every control;
  the six states read as ONE glass material family).
- **Preconds:** AFTER WS4-W0 + WS3-M5 (3.5 — the glass register the forms material composes must be landed).

### 4.8 · `BH.B2-leaf-verify` (ONE row, 3 preconds) — **posture H (pure verify, zero carve)**

- **Deliverables.** Verify the BG-landed leaf shapes — `GlassDock`/`useDockFission` (WS2's carve) ·
  `createCanvasLifecycle`/`useWebGPUCanvas`/`useGlassBackdropLuminance`/`SegmentedTabs` (W-COLOCATE) ·
  `useBlobSatellites`/`useGooDotMatrix` (WS5) — against the BH reader-gate expectations; re-point a reader
  gate IFF BG's landed leaf diverged from the specced shape; `useDockContextSilhouette` DEFINITION-ABSENT
  confirm (10.5's delete, R1) + the stale `AppSwitcher.vue:3` comment reconcile. **Gates:** the re-pointed
  readers GREEN; no new assertion minted. **Fable arm:** none. **Preconds:** WS2 · WS4 · WS5.

### 4.9 · `BH.B2-export-reshape` (the FINAL `package.json` writer) — **posture H**

- **Deliverables (B2.1-swap + B2.2 + B2.3 + B2.6, per BH PLAN §B2 — perfected deltas only):**
  1. **B2.1-swap:** delete `src/subpaths/` (79 mirrors); regen `exports`+`typesVersions` against the LANDED
     post-WS12 surface (WS6 `/siri-island` in; WS5 viz deletes/renames in; `/axes` in — F6.1 registered it,
     so the regen emits it, never a hand key); re-author `flatten-subpath-types.mjs`; Stage-B
     `tests/public-surface.spec.ts` rewrite. **The `goo-blob → blob` rename rides THIS regen** (R14):
     `src/components/custom/goo-blob/` → `blob/`, the generated set emits `dist/blob.js`, ONE MIGRATION row.
  2. **B2.2 (`/api` fold) — AMENDED by this lane's grammar waves:** drop `./api` + delete `src/api/` (854L);
     the 203-row map re-homes every symbol — with THREE rows superseded: `Surface` → **`/axes`** (not the
     `/card` orphan re-home — F6.1 published it); `ControlSize` → **`Size` from `/axes`** (a RENAME row, not
     a re-home — F6.2 deleted the type); `MenuItemVariants` → `/command` (stands). The map arm asserts the
     amended rows byte-complete against the export diff.
  3. **B2.3:** flat barrels → `src/entries/` (keys + chunk names UNCHANGED); `html-attributes.d.ts` → `src/`.
  4. **B2.6:** the 9 SAFE style sheets colocate via the proven GATHER + @import-rewrite; `diff -r
     dist/styles_before _after` EMPTY.
  5. **The SOLE peer-bump block:** kf `^5.0.0 → ^5.1.0` (discharges the B1-W3 `DragOptions.snap`
     pairing-debt) + value.js `^1.0.0 → ^1.1.1` (**NEVER `^1.2.0`** — it would exclude npm-latest 1.1.1;
     the gate-literal reconcile is BG-owned, row 12.5). Closes the WS7→WS12 `proof:peer-conformance`
     born-RED window (expected/by-design mid-window RED).
  6. **`sideEffects` re-verify (the Rolldown clause, research §2.3):** the `/styles` + font CSS entries are
     TRUE side effects — allowlisted explicitly, never blanket-`false`; a consumer smoke-build proves the
     stylesheet survives tree-shaking.
- **Gates (`proof:build` family, R3):** `verify-export-types` GREEN post-build · `proof:subpath-enumeration`
  re-pinned (includes `blob` + `/axes`) · the 203-row map arm GREEN (amended rows) · `diff -r dist/styles`
  EMPTY · **the net-indirection measure: total export-wiring LOC + indirection depth MUST DROP** (79
  mirrors + 854L `/api` + flat-barrel scatter → one generated entry-set + one 40-line `axes.ts`; "files
  deleted" is not the measure, the de-indirection is PROVEN). **Fable arm:** none. **Preconds:** full BG
  close (WS12); every §4.1-4.7 rename ON DISK before the regen runs.

### 4.10 · The rename map (the migration-map artifact — MIGRATION.md's machine source)

One `{from, to, kind}` line per break, emitted beside MIGRATION.md at the cut (the D4 8-component audit
extended to the full ~20-surface disk census). The complete 5.0.0 break-set this lane owns:

| from | to | kind | wave |
|---|---|---|---|
| `--corner-shape-card` / `--corner-shape-pill` | DELETED (dead knobs) | token | DEAD-SWEEP |
| `selectableChipVariants.ts` | `chipVariants.ts` | alias-kill | DEAD-SWEEP |
| GlassPanel `variant` | `tier: SurfaceTier` | prop | F6.1 |
| GlassPanel `tier` (backend) | `renderTier: GlassTier` | prop | F6.1 |
| TabsIndicator `surface: boolean` | `plate: boolean` | prop | F6.1 |
| `CardSurface`/`SkeletonSurface`/Badge `surface` | `Extract<Surface,…>` sub-ranges | type | F6.1 |
| size `default` (Button/inputs) | `md` | value | F6.2 |
| Button `size="icon"` / `"icon-sm"` | `iconOnly` (+ `md`/`xs`) | prop | F6.2 |
| chip `size="cell"` | `shape="cell"` | prop | F6.2 |
| `density` (Dock/Configurator/MetricPill) | `size` (dock `audacious→xl`; config `mobile` DROPPED) | prop | F6.2 |
| `ControlSize`/`DockDensity`/`ConfiguratorDensity` | `Size` sub-ranges | type | F6.2 |
| `data-density` / `@container style(--density:)` | `data-size` / `style(--configurator-size:)` | attr | F6.2 |
| `draggable`/`pressable`/`spring`/`liquidDrag` | `motion` (`full` default; Card press derives from interactivity) | prop | F6.3 |
| `--ring` | `--focus-ring-color` (MINTED at DESHADCN — not on disk at HEAD; 3 decls + `--focus-ring-shadow` + 7 readers migrate) | token | DESHADCN |
| `@mkbabb/glass-ui/goo-blob` | `/blob` | subpath | B2-reshape |
| `@mkbabb/glass-ui/api` | per-family types + `/axes` | subpath | B2-reshape |

Every row also lands in `STALE_PROP_RECIPES` where prop-shaped (the dev-WARN names the recipe — the
no-alias law honored by diagnosis, never by silence). A codemod backed by this map is a successor seed (§7).

---

## §5 — Precepts conformance

- **Token-first (J-inv):** the grammar reshapes the TS prop layer ONLY; every axis write lands as a CSS
  var/attr the cascade reads (`data-motion`, `--motion-weight: 0`, `data-size`); the `--control-h-*`/
  `--dock-scale`/`--glass-*` cohorts byte-untouched. No theme object, no provider.
- **Clean breaks, no legacy (the no-backwards-compat law):** zero aliases anywhere in this lane; every
  break = MIGRATION row + rename-map line + dev-WARN recipe. 5.0.0 is the free break.
- **≥2-consumer (J-inv-10):** the `/axes` tuples carry the gate arms + demo matrices + π enumerations + the
  derived types; `ChipShape` stays chip-local (one family — no shared Shape union minted); the dead sweep
  IS this invariant's enforcement arm.
- **Compositor-only + PRM (motion-canon P5/P6):** F6.3 adds NO motion mechanism — it re-keys entry to the
  existing PRM-safe registers; PRM > prop precedence is gate-asserted; the `[data-allow-motion]` carve
  remains the only PRM-visible escape.
- **Overhead floor / gates-as-family-arms:** every gate here is an ARM of `proof:encapsulation` or an
  in-place amendment of `proof:no-god-module`/`proof:build` — zero new singleton scripts; net gate count
  direction honored (R12).
- **Foreign-tree fence (inv-26):** the 4 sibling asks (muster `/aurora` · speedtest `/timeline` · atlas
  `--ring` · bbnf-buddy `--glass-blur-dock`) are BY-NAME rows on the BH B7 relay — zero sibling edits.
- **Fable routing (the series directive):** the one visual wave (DESHADCN) carries a named Fable arm +
  DesignSync surface; the mechanical waves say so honestly rather than minting ceremonial arms.

---

## §6 — The gestalt bar (acceptance language)

- **One grammar:** open any five components' prop docs — the same four words, the same rungs, the same
  defaults; no prop name means two things anywhere in src/; `axes.ts` + `useSurfaceAxis.ts` are the only
  axis authorities and the gate proves it.
- **The module law reads at a glance:** `ls src/components/custom/<feature>/` tells the whole story;
  `wc -l` finds nothing over 500 outside the two strictly-shaped exemptions; `RATCHET_BASELINES == {}` at
  the tag — visible, gate-enforced, not prose.
- **Tree-shaking honesty:** one family import pulls one chunk; the root barrel drags no heavy leaf; the
  stylesheet survives a Rolldown production build.
- **A mechanical migration:** a 4.2.0 consumer upgrades by walking one table top to bottom; every stale
  prop name warns with its recipe in dev; nothing silently no-ops.
- **The material unowned by shadcn:** the forms band reads as glass-ui's own six-state glass material
  (warm, no-gray, both modes) — the Fable verdict on the `/forms` matrix is the binding judgment.

---

## §7 — Fold-candidate notes + open questions (for the orchestrator; never self-inserted)

1. **`W-DEMO-DOGFOODS-SURFACE` (B3-F5/B3-FC2):** the 156-page demo imports zero `@mkbabb/glass-ui/*` (all
   `@glass` raw-src) — the reshape's consumer-coherence is gate-only. A representative demo slice
   re-pointed onto published subpaths is the honest dogfood. NEW-wave fold candidate.
2. **Codemod successor seed:** the §4.10 rename map could back a jscodeshift codemod IFF a consumer asks
   (the ≥2-consumer discipline applies to tooling).
3. **`/axes` delta vs plan language:** the plan says "types-only"; this spec ships types + the four frozen
   const tuples (~0.1KB, tuple-derived types, no `TYPES_ONLY` regen special case). Ratify or revert to
   pure-types (which then owes a `verify-export-types` skip-lane).
4. **F6.3 row flag:** the plan table marks F6.3 `H`; DEV-C names it VISUAL. This spec resolves it as
   H-with-one-visual-clause judged by F5.2's Fable sweep — flip the row to `P` only if a dedicated card set
   is wanted.
5. **CardTier `opaque`/`deep` redundancy with `surface="opaque"`/deep decoration:** recorded as KNOWN, not
   cut (bigger than the 5.0.0 break owes). A successor-tranche seed if the tier/surface matrix ever confuses
   a real consumer.

---

## REVISION — 2026-07-01 (post-critique, `critique/API-crit.md`; all disk facts re-verified at HEAD)

Five must-fixes applied, surgical; the greenfield loop (§3 GQ-1..GQ-4) untouched:

1. **§4.7(1) + §4.10 row — `--focus-ring-color` re-scoped MINT-AND-MIGRATE** (disk-false claim killed:
   the token does not exist at HEAD; the real chain is `--focus-ring-shadow` → `var(--ring)` → 3 `--ring:`
   decls; mint + move 3 decls + re-point the shadow + 7 readers). The corpus §1e / SOTA §4 seeded claim is
   named false in-spec so no executor inherits it.
2. **§4.3(7) — `STALE_PROP_RECIPES` reshape mandated** before the extends: flat `{propName: recipe}` →
   component-scoped `{Component: {prop: recipe}}` (the `variant` key collision + the `surface`
   homonym made the flat extend impossible as specced).
3. **§4.5 — the `motion-axis` arm scoped** to component `defineProps`/CVA prop surfaces; the 8 internal
   `use*`/`*Context` option-field holders named + excluded; a must-PASS option-field self-test bite added.
4. **§GQ-2(iv) + §4.3(4) — the `/axes` registration file PINNED**: F6.1 mints flat `src/axes.ts`
   (CURATED-shape-consistent), B2.3 relocates it to `src/entries/axes.ts` uniformly — regen and B2.3
   cannot fight.
5. **§4.3(2) — Badge census corrected** to the disk truth `{loud, glass}` (no `quiet` surface member;
   only `loud` re-homes to `variant`); TabsIndicator path disambiguated to `ui/tabs/` in the same clause
   (the critic's non-blocking note, folded since it touches the same sentence).

Non-blocking notes acknowledged, not folded: the §5 sibling-ask naming characterization (KS-CONSTELLATION
owns the `>=4` floor detail) and the MetricPill `spacious` default (already covered — per-component
`defaultVariants` legitimately differ; no gate asserts a universal `md`).
