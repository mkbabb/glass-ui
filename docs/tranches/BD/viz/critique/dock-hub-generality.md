# Critique — D9: the dock as a GENERALIZED central HUB (ruthless / adversarial)

**Lane** BD viz / dock-hub-generality · **Branch** `prototype/liquid-dock` · **Method** read VIZ-BAND-PLAN D9 + VIZ-DAG + `dock/{api-prove,spec-consolidate,hallmark-northstar}` + `fleet2/{dock-sequence-hallmark,maps-card-expand}` + `audit/dock-hallmark-gap` + the HEAD codebase (`src/components/custom/dock/composables/`, `src/composables/motion/useLiquidReveal.ts`). PLANNING audit — zero `src/` edits.

**One-line verdict.** D9's claim is HALF TRUE and HALF FALSE: `toSurface` is genuinely surface-agnostic, but the OTHER THREE verbs (`split`/`silhouette`/`receive`) delegate to engines with HARDCODED domain enums (`"search"|"media"|"nav"`, `"bar"|"bar+pill"|"split"|"search"`), the two headline "consumer" waves (W-CARD-SHEET-EXPAND, W-DOCK-SUBDOCK) are NOT consumers of the hub API at all, and the ≥3-distinct-surface bar is unmet. The overfit is REAL — it's just one level down from where D9 looked.

---

## 1 · What's actually GENERALIZED (the half that holds)

`useLiquidReveal(surface: Ref<HTMLElement | null>, options)` at HEAD (`src/composables/motion/useLiquidReveal.ts:120`) is genuinely shape-blind: it takes ANY element ref + `{ trigger, preset, blur }` and blooms the surface from the trigger rect via `ElementMorph`/`springTimingFunction`. It does NOT inspect what the surface IS (card/sheet/dropdown/panel/another-dock are identical to it). So:

- **`toSurface(controlRef, surfaceRef)` → `useLiquidReveal` IS surface-agnostic.** ✓ The surface owns its own content; the verb only needs two rects. This leg of D9's claim is TRUE.
- **The DockSelect/DropdownTrigger bloom-from-rect (C2) IS agnostic** — same `useLiquidReveal` composition over the reka content ref. ✓
- **`GlassDock` itself hardcodes NO surface TYPE in its props/shell.** The `:silhouettes`/`:context` pass-through is DATA (`DockSilhouetteDescriptor[]`), default-OFF, byte-identical resting (`W-DOCK-LINK-API` C3/C4). The `#persistent`/`#collapsed`/`#rail` slots are content-blind. ✓

So far D9 reads correct: the SHELL and the bloom-out verb are agnostic.

---

## 2 · THE OVERFIT — the hardcoded domain enums baked into the engines (FOUND)

D9 says "no surface-type hardcoded in the dock." This is FALSE at the engine layer the other three verbs delegate to. The HEAD codebase carries TWO frozen domain-semantic enums:

### 2a · `useDockFission` hardcodes `DockSplitContext = "search" | "media" | "nav"`

`src/components/custom/dock/composables/useDockFission.ts:56` + the frozen `DOCK_SPLIT_SIGNATURES` map (`:91-135`) key the GENERIC motion families (`vector: "radial" | "lateral" | "inward-merge"`, `neckHold`, `staggerRank`, `squishPeak`) under APP-DOMAIN names. The motion data is generic; the KEYS are overfit:

```ts
export type DockSplitContext = "search" | "media" | "nav";   // ← app-feature enum
export const DOCK_SPLIT_SIGNATURES: Record<DockSplitContext, DockSplitSignature> = {
    search: { vector: "radial",        neckHold: 0.55, squishPeak: "late" },
    media:  { vector: "lateral",       neckHold: 0.4,  squishPeak: "long" },
    nav:    { vector: "inward-merge",  neckHold: 0.35, squishPeak: "coalesce" },
};
```

This is the EXACT D7/D9 violation one abstraction-level down. `"media"`/`"search"`/`"nav"` are the same class of overfit as `maps`/`album` — a consumer who wants a RADIAL burst that is NOT "search", or a LATERAL peel that is NOT "media", must either lie (pass `"search"` for a non-search radial) or the enum must grow a 4th app-name. **The generality bar demands the public verb take a `vector`/`signature` SHAPE, not a domain NAME.** The clean form: `split(signature: DockSplitSignature)` where `DOCK_SPLIT_SIGNATURES.media` is a PRESET-IN-CONSUMER convenience, not the type's identity. As-is, `useDockLink.split(signature?)` is parameterized over an app-feature enum, NOT surface-agnostic.

### 2b · `useDockContextSilhouette` hardcodes `DockSilhouetteKind = "bar" | "bar+pill" | "split" | "search"`

`src/components/custom/dock/composables/useDockContextSilhouette.ts:68`. `"bar+pill"` (now-playing-media-specific) and `"search"` are app-shape names. `audit/dock-hallmark-gap.md:42` even admits the `"search"` member is "typed in the silhouette union but never built" — a DEAD overfit enum arm. The descriptor `slots[]` are DATA, but the KIND union is a closed app-shape vocabulary. `silhouette(toId: string)` reads as agnostic at the verb signature but the descriptors a consumer can author are gated by this union → not arbitrary.

### 2c · `useDockSearch` is a hardcoded per-surface MECHANISM, not a `toSurface` consumer

`src/components/custom/dock/composables/useDockSearch.ts` is a DEDICATED dock→search-field engine (fuzzy + ghost-completion + keyboard-nav). `spec-consolidate.md §0.2` lists it as a SEPARATE engine in the "ONE of each" stack. D9 claims the search bloom is "an instance of `toSurface`," but at HEAD `useDockSearch` is its OWN composable with its OWN morph trigger (`armSearch`/`disarmSearch`), NOT a `useDockLink.toSurface` call. `fleet2/dock-sequence-hallmark.md:120` tries to reconcile this (the field "HOSTS" `useDockSearch` after a `toSurface` bloom) — but that's a PLANNED fold, not the shipped reality, and even the plan keeps `useDockSearch` as a distinct surface-typed engine the dock hardcodes. **Search is a hardcoded surface facility, exactly the D9 anti-pattern.**

---

## 3 · The "consumers" are NOT consumers of the ONE API (the load-bearing falsification)

D9: "`W-CARD-SHEET-EXPAND` (expand to a card), `W-DOCK-SUBDOCK` (split to a sub-dock) … are INSTANCES" of `useDockLink`. Reading the actual wave specs falsifies this:

- **W-MAPS-CARD / W-CARD-SHEET-EXPAND is NOT a `useDockLink` consumer.** `BD.W-MAPS-CARD.md:27` composes `<ExpandableContainer>` + `useLiquidMorph.expand` over a RESERVED footprint — a SEPARATE expand mechanism (`useLiquidMorph`, not `useLiquidReveal`/`toSurface`). It never imports `useDockLink`. It is a CARD-expand wave that happens to bloom; it is not "an instance of the dock-hub expand." The VIZ-BAND-PLAN D9 prose asserting it IS one is unverified by its own wave spec. **Two different bloom engines (`useLiquidMorph` vs `useLiquidReveal`) is itself a DRY violation the hub charter should have caught.**

- **W-DOCK-SUBDOCK is NOT a `split` verb consumer — it's an additive `persistent` flag on the `media` signature.** `BD.W-DOCK-SUBDOCK.md:15` adds `persistent?: boolean` to `DockFissionPieceRegistration` and fires `onPersist` keyed off "the `media` signature's natural terminus" (`:15`). It is hardcoded to the `media` app-context, not a generic `split` invocation. The sub-dock re-seat is a NEW law (`subdock.css`), not a hub verb. So "split to a sub-dock" is a bespoke per-context mechanism wearing the hub's name.

- **The layer-switch is `useLayerTransition` (a 4th distinct engine), not a hub verb.** `spec-consolidate.md §4.2` — `DockLayerGroup` drives crossfade+FLIP via `useLayerTransition`, entirely outside `useDockLink`. D9 lists it as a hub instance; it isn't.

**Net: of D9's four named "instances," ZERO are genuine `useDockLink` call-sites.** Each is a distinct shipped engine (`useLiquidMorph`, `useDockFission.persistent`, `useLayerTransition`, `useDockSearch`). The hub is a verb FACADE over `toSurface`/`receive` (the two agnostic blooms) PLUS thin `split`/`silhouette` delegations to shape-locked engines — it is NOT the universal expand/transition spine D9 paints.

---

## 4 · The ≥3-distinct-surface-consumer generality bar is UNMET

D9 demands "≥3 distinct surface consumers prove the generality." `W-DOCK-LINK-API` C6 only requires **≥2** and accepts the demo exerciser as one. Worse, the two real consumers it names (`<DockNowPlaying>`'s `toSurface`/`split`/`silhouette` wiring + the demo) are NOT three DISTINCT SURFACE TYPES bloomed by the agnostic verb — they conflate the agnostic `toSurface` with the shape-locked `split`/`silhouette`. To actually prove `toSurface` is surface-agnostic you need ≥3 DISTINCT surface KINDS bloomed by the SAME verb with zero per-kind branch: e.g. (1) a `<Card>` bloomed, (2) a `<Drawer>`/sheet bloomed, (3) a `<Popover>`/dropdown bloomed, (4) a viz `<VizStudio>` configurator bloomed — all via `link.toSurface(ctrl, ref)` with NO surface-type switch inside the verb. The current plan has the dropdown bloom (C2) + ONE `<DockNowPlaying>` `toSurface` — that's TWO, both gated behind the trigger/now-playing surfaces, not a proven N-kind agnostic spine.

---

## 5 · proof:dock-hub — the gate D9 names but never specifies (proposed)

`scripts/proof-dock-hub.mjs`, `["local","ci"]` (source-structure; the binding paint is the π). The detector comment-strips first; exports a pure detector for self-test bites.

- **H1 — `toSurface` is surface-TYPE-blind (the agnostic-verb assert).** `useDockLink.toSurface` and the `useLiquidReveal` it composes carry NO surface-type branch — no `if (surface instanceof …)`, no `kind: "card" | "sheet" | …` discriminant, no per-surface code path. The verb takes `(controlRef, surfaceRef, opts?)` where `surfaceRef: Ref<HTMLElement | null>` and nothing else. A `toSurface` that switches on a surface KIND REDs.
- **H2 — NO app-domain/surface-type enum gates the public verbs.** The hub verbs do not require a `"search" | "media" | "nav"` / `"bar" | "bar+pill" | "card" | "sheet"` domain name. The `split` verb takes a `DockSplitSignature` SHAPE (`{vector, neckHold, staggerRank, squishPeak}`), the `silhouette` verb takes a descriptor whose KIND is OPEN (not a closed app-shape union). `DOCK_SPLIT_SIGNATURES.media`/`.search`/`.nav` survive ONLY as PRESET-IN-CONSUMER convenience constants, NEVER as the verb's required type. A public verb whose parameter type is a closed app-feature enum REDs. (This is the load-bearing fix — it forces the 2a/2b refactor: rename `DockSplitContext`→a `vector`-keyed shape, demote the named signatures to presets.)
- **H3 — ≥3 DISTINCT surface KINDS bloomed by the ONE `toSurface` verb, call-sites not keywords.** ≥3 genuinely-different surface types (card · sheet/drawer · dropdown · panel · viz-configurator · another-dock — pick ≥3) each open via `link.toSurface(ctrl, ref)` with ZERO per-kind branch, asserted by a call-expression scan across `src/`+`demo/`. A markdown-keyword grep does NOT count (the SEED §10 phantom-evidence fix). This is STRICTLY stronger than `W-DOCK-LINK-API` C6's ≥2.
- **H4 — the named "instances" genuinely COMPOSE the hub, or are honestly EXEMPTED.** Either W-CARD-SHEET-EXPAND/W-DOCK-SUBDOCK/the layer-switch route through `useDockLink` (and the duplicate `useLiquidMorph` bloom engine folds onto `useLiquidReveal`/`toSurface` — the DRY close), OR each is recorded as a DISTINCT-mechanism EXEMPTION with its rationale in a `dock-hub-census.md` (a card-expand-over-reserved-footprint is genuinely `useLiquidMorph`-shaped, not a source-rect bloom — that's a legitimate distinct verb, but D9's prose claiming it's a `toSurface` instance must then be CORRECTED). No silent "it's an instance" claim that the wave spec contradicts.
- **H5 — one bloom engine, not two.** `useLiquidReveal` (source-rect bloom, `toSurface`) and `useLiquidMorph` (reserved-footprint expand, the card) are audited: either unified or each carries a recorded distinct-mechanism rationale. A THIRD bloom rAF runner anywhere REDs (the FLIP-SPINE one-runner fence).
- **Self-test bites:** (a) a `toSurface` switching on a surface kind → H1 RED; (b) a `split(context: "search"|"media"|"nav")` public signature → H2 RED; (c) only 2 surface-kind consumers → H3 RED; (d) W-DOCK-SUBDOCK claimed a `toSurface` instance while importing `useDockFission.persistent` only → H4 RED; (e) a 3rd bloom runner → H5 RED.

---

## VERDICT (5-7 lines)

D9 is HALF-RIGHT and the unexamined half hides the overfit. `toSurface`→`useLiquidReveal` IS genuinely surface-agnostic (any `Ref<HTMLElement>`+trigger+preset, no surface-type inspection), and `GlassDock`'s shell/slots/`:silhouettes` pass-through hardcode no surface type — that half holds. BUT the other three verbs delegate to engines carrying HARDCODED domain enums: `useDockFission`'s `DockSplitContext = "search"|"media"|"nav"` and `useDockContextSilhouette`'s `DockSilhouetteKind = "bar"|"bar+pill"|"split"|"search"` are exactly the D7/D9 app-feature overfit one level down (the generic `radial/lateral/inward-merge` motion is buried under app-names; the `"search"` silhouette is a DEAD un-built arm). `useDockSearch` is a dedicated hardcoded search MECHANISM, not a `toSurface` instance. The two headline "consumer" waves FALSIFY the claim: W-CARD-SHEET-EXPAND composes a DIFFERENT engine (`useLiquidMorph`, never imports `useDockLink`) and W-DOCK-SUBDOCK is an additive `persistent` flag keyed to the `media` signature, not a generic `split` — ZERO of D9's four named instances are real `useDockLink` call-sites, and the ≥3-distinct-surface bar is unmet (C6 ships ≥2, both behind the now-playing/trigger surfaces). FIX: `proof:dock-hub` must (H2) demote the app-name enums to PRESETS-IN-CONSUMERS and re-type `split` over a `vector`-keyed SHAPE, (H3) prove ≥3 genuinely-distinct surface KINDS through the ONE `toSurface` with no per-kind branch, and (H4/H5) either fold W-CARD-SHEET-EXPAND's `useLiquidMorph` onto the hub or honestly EXEMPT it (and correct the false "it's an instance" prose) — plus fold the two bloom engines toward one. Until then the dock is a verb FACADE over two agnostic blooms plus two shape-locked delegations, NOT the generalized central hub the charter asserts.
