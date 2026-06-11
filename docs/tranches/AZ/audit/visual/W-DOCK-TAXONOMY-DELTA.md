# AZ.W-DOCK-TAXONOMY — the dock taxonomy disambiguated (arm a: ONE GlassDock, ONE orientation axis) · DELTA

<!-- surface-paths: src/components/custom/dock/GlassDock.vue,src/components/custom/dock/composables/useDockShellProps.ts,src/styles/dock/layers.css,src/styles/dock/shell.css,src/styles/dock/morph.css,demo/stories/dock/rail.vue -->
<!-- surface-hash: 62026a920a28afac30c410980c3a4d5b896c40eae4fa72093dfb53799264a870 -->
<!-- AZ.W-GATES (D6) content-hash freshness model: fresh IFF the six surface-paths'
     bytes are byte-identical to capture time (sha256 of the ","-joined bytes,
     computed via proof-live-verified-ledger.mjs::surfaceHash). Stamped at the
     own-surface capture against the current AZ-tree bytes — the live collapsible
     vertical dock was shot on :5199 with the wave's source edits in place. -->

The H2 hinge selected **arm (a)** (the user-ratified default + the AZ.md recommendation): ONE `GlassDock` on ONE `orientation` axis. The `variant` discriminant is removed, "rail-ness" folds into `orientation="vertical"` + a shape/density choice, the "rail" noun is de-overloaded, and the collapse/morph/shrink machinery applies on BOTH orientations. Clean break, no alias; the MIGRATION rename table carries the path.

## The chosen arm + rationale

R3-2's disambiguation ("properly have a dock that's horizontal and vertical and disambiguate the names") had two faithful shapes. Arm (a) — collapse the redundant `variant=rail` expression so there is ONE way to say "vertical" — was the recommendation: the mental model is singular ("vertical dock = orientation"), the noun "rail" is fully freed, and the surface stays ONE component (arm b's named pair + internal `<DockShell>` is a 3-name structure where arm a is 1). The substrate (the axis machinery) was already correct and is KEPT — this is a naming/taxonomy redesign over it, not new compositing.

## The five moves (all landed)

1. **The `variant` discriminant is GONE.** `useDockShellProps.ts` collapses `DockProps = DockVariantProps | DockRailProps` to ONE `DockProps` interface. The `variant` field, the `dockBranch()` guard, the `variant` computed, and the `variant`-branching in `orientation`/`alwaysExpanded`/`fitContent`/`scrollClass`/`startCollapsed`/`collapseDelay`/`layoutValue` are all deleted. `GlassDock.vue` drops the `variant-${variant}` class binding.
2. **The collapse/morph machinery applies on BOTH orientations.** The `orientation === "vertical"` force-pin on `alwaysExpanded` is removed; the non-`dock`-branch `false` on `startCollapsed` is gone. `GlassDock.vue`'s `outerLayerAxis` is re-pointed from a hardcoded `"horizontal"` to the resolved `orientation`, and the template body is unified — BOTH orientations now render the SAME `.dock-layers` full/summary morph pair (the prior static `.dock-layer--vertical-body` single-stack is retired). `layers.css` gains the block-axis morph rule (`.glass-dock.vertical[data-morphing] .dock-layers { block-size: var(--dock-morph-size) }`) so a vertical dock's outer collapse morphs `height`.
3. **The "rail" noun is de-overloaded.** After move 1 the ONLY "rail" in the dock band is `.dock-layer-rail` (the in-`DockLayerGroup` switcher tab strip). `DockRail` is RESERVED for the W-RAIL-EXTEND beyond-dock facility (the closed allowlist, made literal in the gate).
4. **`proof:dock-taxonomy` (the born-RED de-overload gate) authored.** Four device-free static clauses (T1–T4); see HG3 below.
5. **MIGRATION table + the demo disambiguation retired.** The MIGRATION rename rows are reported in sharedFileDeltas. `demo/stories/dock/rail.vue` lost the "Naming — three rails, three things" section + the side-by-side `variant="rail"` vs `orientation="vertical"` two-expression demo; it now shows ONE canonical vertical-dock example, a rounded-shape example, a NEW collapsible-vertical-dock example (the HG2 capture surface), and a "One dock taxonomy" prose block.

## `instrument-strip` — RETIRED (the ≥2-consumer bar)

The re-ground confirmed ZERO live `variant="instrument-strip"` call-sites in `src/` or `demo/` (InstrumentRail retired at AY W-IC1). Per the substrate-without-consumer-binary invariant, the chassis-strip paint (`.variant-instrument-strip` + its engraved-bezel `::before` in `shell.css`) is RETIRED with rationale — NOT re-homed to a `surface="chassis"` prop (a re-home needs ≥2 consumers; there are zero). The cross-repo speedtest `SurveyResultDock` cockpit re-pins in its own migration (recorded in MIGRATION.md); a consumer needing the chassis surface composes `<InstrumentChassis>` directly. The `material.css` cohesion comment (which named the instrument-strip `::before` as the dock shell's only `::before`) is reconciled — the dock shell now has no `::before`.

## HG1 — the `variant` discriminant is removed; the arm-a surface exists

- **Deletion proof.** `grep -rn 'variant="rail"\|variant="instrument-strip"' src/ demo/` returns ZERO live `<GlassDock variant=...>` bindings (only prose comments documenting the retirement remain — the gate comment-strips them).
- **The single surface.** `DockProps` is ONE interface (no `variant` field, no `DockVariantProps | DockRailProps` union). `vue-tsc --noEmit` GREEN.
- **Typecheck.** The only TS errors after the source edit were the six demo `variant="rail"` call-sites (the EXPECTED clean-break witness — the discriminant is gone); all re-pointed to `orientation="vertical"`, typecheck GREEN.

## HG2 — a vertical dock morphs/shrinks (the mandate, captured)

The own-surface capture (`scripts/wf-az-capture-dock-taxonomy.mjs`, the `/dock/rail` story's `data-testid="dock-vertical-collapsible"` dock) drives a collapsible vertical dock collapsed→expanded and MEASURES the block-axis (height) morph the old `variant="rail"` force-pin denied:

| mode | collapsed height | expanded height | block delta | height morphed |
|---|---|---|---|---|
| light | 104px | 338px | **+234px** | YES |
| dark | 104px | 334px | **+230px** | YES |

Frames (1× device scale, swiftshader software-WebGL — the headless GPU path crashes the staged Aurora; WebGL is stubbed off via an init-script so `useWebGLCanvas` no-ops cleanly and the dock geometry — the HG2 subject — paints crash-free):

- `W-DOCK-TAXONOMY-vcollapse-collapsed-light.png` (58×105) / `-dark.png` (58×105) — the resting circle (the dock shrunk to its collapsed floor on the BLOCK axis).
- `W-DOCK-TAXONOMY-vcollapse-expanded-light.png` (58×314) / `-dark.png` (58×314) — the dock grown open on its block axis on hover.
- `W-DOCK-TAXONOMY-vcollapse-readback.json` — the measured deltas + `"pass": true`.

**Born-RED witness:** at HEAD a vertical dock could NOT collapse (`startCollapsed` resolved `false`, `alwaysExpanded` resolved `true` for `orientation === "vertical"`). After move 2 it morphs its height with the `--dock-morph-t` scalar. The executed device-free witness `tests/components/custom/dock/GlassDock.vertical-collapse.test.ts` (3 tests, GREEN) binds the wiring: a vertical dock is collapsible by default (NOT `always-expanded`), starts collapsed, `expand()`/`collapse()` drive the aperture, and `always-expanded` opts out.

**The §7 deferral was NOT needed** — the `outerLayerAxis` re-point + the block-axis morph CSS landed cleanly within bounds; the vertical-collapse half ships THIS wave, not booked to W-DOCK-NORMALIZE.

## HG3 — the de-overload is structurally asserted (`proof:dock-taxonomy`, born-RED)

GREEN stdout:

```
proof:dock-taxonomy — the dock taxonomy de-overload gate (AZ.W-DOCK-TAXONOMY, arm a)
  T1 dead-variant sites      : 0 OK
  T2 rail-noun allowlist     : components=[] css=[dock-layer-rail] unlisted=0 OK
  T3 vertical force-pin gone : OK
  T4 single DockProps shape  : noVariant=true noUnion=true noVariantClass=true OK
  status: PASS
```

Born-RED bite (EXECUTED, not grep-only):
- **T1** — inject `variant="rail"` as a real attribute on a demo dock → `T1 dead-variant sites: 1 RED`, exit 1; revert → exit 0. A `<code>variant="rail"</code>` doc-span does NOT trip it (the stripper blanks `<code>` display text — the false-witness discipline).
- **T2** — add a `DockRailExtended` type to a dock-band file → `unlisted=1 RED`, exit 1 (a renamed-to-evade `*Rail*` dock construct outside the closed allowlist `{dock-layer-rail, DockLayerRail, DockRail}` does NOT slip through); revert → exit 0.

The gate is a PURE device-free static src-scan (deletion proofs + the allowlist diff + the force-pin absence) → it carries `ci` (the AY W-LIVE1 runner-truth disposition: a static src-scan gate is NOT in `JUSTIFIED_LOCAL_ONLY`). The captured HG2 frames close under `proof:live-verified-ledger`.

## HG4 — MIGRATION + no aliases

The MIGRATION rename rows are reported in sharedFileDeltas.migrationRows (`variant="rail"` → `orientation="vertical"`; `variant="instrument-strip"` → RETIRED / compose `<InstrumentChassis>`). No compat shims: there is no `variant` prop, no alias, no legacy value. The clean break is enforced by `proof:dock-taxonomy` T4 (a re-added `variant` field REDs).

## HG5 — `proof:dock-unify` stays GREEN across the rename

The renamed shell docks (SidebarDock vertical `orientation="vertical" always-expanded`, BottomDock horizontal — unchanged, it used no variant) still compose the home-left `#persistent` + nav + `<DockSeparator>` nav-pattern. `proof:dock-unify` PASS post-rename.

## Consumer re-point census (src + demo)

| site | before | after |
|---|---|---|
| `demo/layout/SidebarDock.vue` | `variant="rail"` | `orientation="vertical" always-expanded` |
| `demo/stories/dock/rail.vue` (×3) | `variant="rail"` (+`shape="rounded"`) | `orientation="vertical" always-expanded` (+shape) + ONE new collapsible example |
| `demo/stories/dock/layers.vue` (×2) | `variant="rail" shape="rounded"` | `orientation="vertical" always-expanded shape="rounded"` |
| `demo/layout/BottomDock.vue` | `orientation="horizontal"` (no variant) | unchanged |
| cross-repo speedtest `SurveyResultDock` | `variant="instrument-strip"` | booked to the consumer's own migration (MIGRATION.md) |

## Test fallout (clean break)

- `tests/components/custom/dock/GlassDock.instrument-strip.test.ts` — DELETED (the retired variant's entire suite).
- `tests/components/custom/dock/GlassDock.scroll-overflow.test.ts` — the two `variant: "rail"` tests re-pointed to `orientation: "vertical"`.
- `tests/components.smoke.spec.ts` — the three `variant="rail"` usages re-pointed to `orientation="vertical"`.
- `tests/scripts/demo-dock-nav.detect.test.ts` — the `variant="rail"` fixture re-pointed.
- NEW `tests/components/custom/dock/GlassDock.vertical-collapse.test.ts` — the HG2 executed witness.

## The Vue boolean-prop note (a deliberate keep)

A positive `collapsible?: boolean` prop (the spec's arm-a interface) was considered and REJECTED: Vue coerces an absent boolean prop to `false`, so a `collapsible` defaulting to `true` would need a `withDefaults` second default-path (the union-erasure trap the original `defineProps<DockProps>()` avoided). The existing `alwaysExpanded` opt-out — which correctly defaults `false` — is the ONE collapse-opt-out knob, no Vue boolean-trap. (Recorded in the `useDockShellProps.ts` `alwaysExpanded` doc-block. The same trap is why a vertical dock that omits `start-collapsed` renders expanded — Vue reads the absent boolean as `false`; a dock that wants the collapsed-start passes `:start-collapsed="true"`, as the HG2 capture surface does. This is pre-existing GlassDock behavior, not introduced here.)

## Gate-script-parity TRIO (reported, not applied)

`proof:dock-taxonomy` is born and GREEN; its `package.json` script row + `gates.mjs` GATES row (`tags: ["local","ci","release"]`) + the `ci.yml` relock are reported in sharedFileDeltas (the orchestrator owns those shared files). `proof:gate-script-parity` + `proof:tag-parity` pass once the rows land (a static src-scan gate carries `ci`, no `JUSTIFIED_LOCAL_ONLY` entry needed).
