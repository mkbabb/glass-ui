# API-crit — adversarial critique of KS-API-COLOCATION.md

**Critic: opus · Date 2026-07-01 · HEAD `f6fa1767` (tranche/BG) · every disk claim re-verified.**
**Convergence: 89% · binding-ready with 2 MAJOR + 2 MEDIUM fixes; zero CRITICAL; no protected-set breach.**

---

## Verdict

Strong spec. Precepts-clean, the BINDING corrections are honored (R6′ DOCK_SPRING `{0.68,0.64}`
cited, NOT the stale `{0.32,0.7}`; R1′ applied — 10.5 owns the `useDockContextSilhouette` delete,
4.3 verifies, baseline row 8 = `useDockContextSilhouette` **disk-confirmed**; R4 useDockFission→4.5;
R14 goo-blob→blob at reshape). Wave ids match the frozen plan exactly; no self-inserted rows (§7 folds
are flagged-for-orchestrator, correct); preconds untouched. Greenfield loop is genuine (GQ-1..GQ-4 each
carry ≥3 directions → GOLDEN → self-challenge). Most disk claims verified TRUE. Two disk-false claims and
two structural executability gaps survive.

## Disk re-verification ledger (the hunt — assume nothing)

**VERIFIED TRUE:** `Surface`=glass·veil·opaque·clear (useSurfaceAxis.ts:42) · `CardTier`=SurfaceTier+opaque+deep
(Card.vue:35, the §GQ-1 "STAYS" form exact) · GlassPanel homonym: backend `tier?:GlassTier`@42, `variant?:GlassPanelVariant`@50,
`GlassPanelVariant`≡SurfaceTier · TabsIndicator `surface?:boolean`@17 (path is **`ui/tabs/`**, not custom/) ·
`SkeletonSurface`=glass·opaque@38 · Button `icon-sm`→`--control-h-xs` (index.ts:196) + size union · `ControlSize`=sm·default·lg@34 ·
chip `cell`@64 · `DockDensity`@21 · `ConfiguratorDensity`=mobile·compact·comfortable·spacious@19 · MetricPill `comfortable·spacious`@25 ·
RATCHET_BASELINES = **16 bare-number rows** @138-172 (ladder.css 527, shell.css 510, GlassDock.vue 711, SegmentedTabs.vue 512,
useDockContextSilhouette 551 — all exact) · `--motion-weight` live-read at useLiquidPress.ts:86 / useLiquidFlex.ts:115 / useMorphField.ts:315 (ZERO-new-plumbing TRUE) ·
`data-motion` = **0 readers in src** (clean-mint TRUE) · `--ring` = **7 style readers** · corner-shape-{card,pill}=`round` dead knobs @radius.css:105-6 (0 var() readers) ·
orientation inline = **13** · CURATED = **11** (axes=12th correct) · exports = **96 keys** · selectableChipVariants.ts = pure re-export alias · proof:squircle-language exists (gates.mjs:1045) · the 6 motion SFCs on disk = Card/Slider/DialogContent/SheetContent/SegmentedTabs/DockLayerGroup.

## MUST-FIX

### 1 · MAJOR (disk-false) — `--focus-ring-color` is NOT on disk; W-DESHADCN understated
§4.7(1) + rename-map §4.10 assert "`--focus-ring-color` already present in `src/styles/` — the token-first
`.focus-ring` divergence COMPLETED." **FALSE: `grep -rn focus-ring-color src/` = ZERO matches.** The token that
exists is `--focus-ring-shadow` (scale-paper.css:83, the composed box-shadow) which reads `var(--ring)`; `--ring`
is the raw COLOR token declared 3× (color-radius.css:102, dark-arm.css:100, light-dark.css:118). So the deliverable
is a **MINT-AND-MIGRATE**, not a re-point onto an existing token: create `--focus-ring-color`, move the 3 `--ring:`
declarations onto it, re-point `--focus-ring-shadow`'s `var(--ring)`, then the 7 readers. The "already present /
COMPLETED" framing (inherited verbatim from corpus §1e + SOTA §4) misstates scope and mis-primes the executor.
FIX: reword §4.7(1) + the rename-map note to "mint `--focus-ring-color`; migrate the 3 decls + `--focus-ring-shadow`
+ 7 readers." (This is the KS-A/KS-B disk-false class recurring — the corpus seeded it.)

### 2 · MAJOR (executability) — STALE_PROP_RECIPES cannot carry the §4.3(7) extends as shaped
`STALE_PROP_RECIPES` (useStalePropWarning.ts:37) is a **flat `{propName: recipe}` map** — current keys `variant`,
`flush`. §4.3(7) extends it with "`variant`-on-GlassPanel · `surface`-on-TabsIndicator · …". **Collision:** the
`variant` key is ALREADY taken (the Card pane-API/bbnf-buddy recipe), and `surface` must warn ONE way on TabsIndicator
(→`plate`) while STAYING valid on Card — a name-keyed global map cannot disambiguate per-component. The spec treats
"extend" as trivial; the map's shape forbids it for homonymic names. FIX: F6.1 must reshape the map to component-scoped
(`{Component: {prop: recipe}}`) or route via the call-site `warn(component, name)`, and the spec must say so — else
the dev-WARN (the no-alias law's migration UX, §5) silently gives the wrong recipe or the key collides at authoring.

### 3 · MEDIUM (executability) — the `motion-axis` gate arm will born-RED on legitimate internal composable options
§4.5 gate arm: "no `draggable`/`pressable`/`spring`/`liquidDrag` **prop exports**." Disk grep for those names hits
**8 internal composables** that legitimately own them as OPTION-interface fields (`useDrawerSnap.spring`,
`useDockFission.draggable`, `dockMorphContext`, `useDockItemDrag`, `useDockOrientationMorph`, `useLayerTransition`,
`useTabDragMorph`) — none is a component public prop, none renames to `motion`. If the arm greps loosely it flags them.
FIX: the arm must scope to component `defineProps`/CVA surfaces, explicitly EXCLUDING internal `use*`/`*Context`
option interfaces (name the fence in §4.5, mirroring the "prop exports, not option fields" boundary).

### 4 · MEDIUM (mechanics gap) — `/axes` registration file-path is unspecified vs CURATED shape + B2.3
Every CURATED entry maps a subpath to a **flat `src/*.ts` barrel** (`motion:"src/motion.ts"`); §GQ-2 says `/axes`
maps 1:1 to `src/components/ui/_shared/axes.ts` (a DEEP path), and B2.3 relocates the flat barrels to `src/entries/`.
The spec never states whether F6.1 registers `axes` pointing at the deep `_shared/axes.ts` or mints a flat
`src/entries/axes.ts` re-export. FIX: pin the registration file (a `src/entries/axes.ts` re-export is the shape-consistent
choice) so the regen + B2.3 relocation don't fight.

## MINOR / notes (non-blocking)

- **Badge surface is `{loud, glass}` on disk, NOT `loud·quiet·glass`** (index.ts:67; no `quiet` surface member). §4.3(2)
  "Badge's `loud·quiet` are variant-arm values re-homed" — only `loud` is a surface member to re-home. Corrective fold
  (glass→Surface, loud→variant) is still sound; fix the census wording (corpus §1c also carries the stale triple).
- **TabsIndicator vs SegmentedTabs live in DIFFERENT dirs** (`ui/tabs/` vs `custom/tabs/`); the spec cites bare
  `TabsIndicator.vue`/`SegmentedTabs.vue`. Disambiguate the path in §4.3(2) so the F6.1 homonym-kill and the W-COLOCATE
  512-line carve don't get pointed at the wrong tabs dir.
- **§5 sibling-ask naming drifts from the frozen plan.** §5 lists "muster `/aurora` · speedtest `/timeline`"; plan row
  BH.B6+B7 `>=4` floor lists "muster+speedtest `/api`". Cross-lane (KS-CONSTELLATION owns detail) — but reconcile the
  characterization. The lane's OWN sibling impact (atlas `--ring`) is correctly a BY-NAME ask, not an edit (foreign-tree
  fence HELD; §4.7(1) routes `migrate-ring-to-focus-ring-color` to BH B7). Verify the `>=4` floor still counts after
  the `/api`→per-family reshape reframes the muster/speedtest asks.
- **MetricPill default is `spacious` (=lg), not `md`** (MetricPill.vue:49). §GQ-1's axes.ts comment "default 'md'
  everywhere" is the AXIS default; per-component `defaultVariants` legitimately differ (spec acknowledges this). No
  defect — just don't let a gate assert a universal `md` default.

## Fences + protected set (clean)

Foreign-tree (inv-26) HELD — every sibling change a by-name ask (§5, §4.7). Protected set intact: `useSurfaceAxis`
KEEP-VERBATIM, `--control-h-*`/`--dock-scale`/`--glass-*` cohorts untouched, DOCK_SPRING never touched (structural
lane), per-subpath split preserved, `--glass-level`/`--motion-weight` token model reshapes the TS layer only. Overhead
floor honored (all gates are `proof:encapsulation` arms or in-place `proof:no-god-module` amendments — zero singletons).
Greenfield loop genuine; §7 fold-candidates flagged, not self-inserted.
