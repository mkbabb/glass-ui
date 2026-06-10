# AZ.W-DOCK-TAXONOMY — the dock taxonomy disambiguated from first principles: one orientation axis, the `variant`×`orientation` redundancy collapsed, the "rail" noun de-overloaded

**Tranche** AZ (glass-ui) · **Batch** 2 (the taxonomy rename runs FIRST in its batch — W-RAIL-EXTEND ‖ W-DOCK-NORMALIZE ‖ W-DOCK-CONTEXT all consume the renamed surface) · **Type** taxonomy redesign + clean-break rename + MIGRATION table · **Status** SPEC · **Depends** W-DOCK-RAIL (Batch 1 — the in-dock switcher rail is rebuilt to the hairline register before the taxonomy edit moves the surface; coordinate per §6) · **Repo** glass-ui · **Base** tranche/AY @ v3.10.1 · **HEAD** tranche/AZ

This wave answers R3-2's redesign mandate at the NAMING layer: *"properly have a dock that's horizontal and vertical and disambiguate the names."* The fleet root-caused the confusion as TWO concrete defects — the `variant`×`orientation` props are partially-redundant axes (a "vertical dock" is expressible two ways, and the demo shows both side-by-side as distinct surfaces), and the "rail" noun is overloaded across FOUR unrelated constructs. This wave resolves the taxonomy [H2 fork — BOTH arms specced below], frees the "rail" noun for the W-RAIL-EXTEND net-new facility, and gives BOTH orientations the layering system + the collapse/morph/shrink machinery the mandate names. It is a clean break: no aliases, MIGRATION.md carries the rename table, consumers re-pin.

It does NOT rebuild the dock substrate. The axis-aware machinery already exists and is correct (`useDockShellProps` resolves orientation; `dockMorphContext` is `dim`-keyed width/height; `useLayerTransition` FLIPs on a computed axis). This is a NAMING/taxonomy redesign over that substrate, not new compositing — the gestalt failure the lane exists to catch would be re-deriving solved axis machinery.

---

## §0 — RE-GROUND (step-0 re-grep mandate)

Before any edit, the implementation agent re-greps EVERY cite below at HEAD and confirms it still reads as recorded — the digest may compress, and a moved line invalidates the edit-site table. Grounding finding ids: **C1-R3-2-taxonomy-overload** (FLEET-DIGEST.md:434), **E2-3** (FLEET-DIGEST.md:787-788), **E3G-2** (FLEET-DIGEST.md:804-805), and the dock API baseline **C1-dock-api-inventory** (FLEET-DIGEST.md:444-445). User item: **R3-2** (USER-AUDIT-2026-06-10-R3.md:23).

Re-grounded at authoring (HEAD = tranche/AZ, the AY close machinery):

- **The single component on a discriminated union.** `src/components/custom/dock/composables/useDockShellProps.ts:150` — `export type DockProps = DockVariantProps | DockRailProps`. `DockVariantProps` (`:102-123`) carries `variant?: "dock"` + the collapse surface (`collapseDelay`/`startCollapsed`/`layout`). `DockRailProps` (`:146-148`) carries `variant: "rail" | "instrument-strip"` and is VERTICAL-ALWAYS-EXPANDED by construction (no collapse surface — those props are type-narrowed away, a COMPILE error under the rail branch per the `:125-129` comment).
- **The redundancy is real and load-bearing.** `useDockShellProps.ts:226-230` — `orientation` resolves to `"vertical"` WHEN `variant === "rail" || variant === "instrument-strip"`, ELSE `props.orientation ?? "horizontal"`. So `<GlassDock variant="rail">` and `<GlassDock orientation="vertical">` BOTH produce a vertical dock — the two expressions the demo shows side-by-side (`demo/stories/dock/rail.vue:176-194`, the "Naming — three rails, three things" section that ACKNOWLEDGES but does not resolve the overload). `fitContent` (`:252-256`) and `alwaysExpanded` (`:246-251`) ALSO branch on `variant === "rail"` — the variant carries behavior the orientation axis cannot express.
- **The "rail" overload (4 constructs).** (1) `GlassDock variant="rail"` — a vertical nav column (`useDockShellProps.ts:130-136`). (2) `.dock-layer-rail` — the in-`DockLayerGroup` switcher tab strip (`src/styles/dock/layer-group.css:97`; `DockLayerGroup.vue` mounts it). (3) `InstrumentRail` — RETIRED at AY W-IC1 (FLEET-DIGEST.md:58 — the component dir + demo composition deleted; the overload is now 3 live constructs, but the noun is STILL claimed by `variant="rail"`). (4) `ContinuousRail` — the timeline marker rail (`src/components/custom/timeline/ContinuousRail.vue`), unrelated. The W-RAIL-EXTEND net-new "hairline-rail-beyond-dock" wants the noun; this wave frees it.
- **Both branches share the morph substrate.** `dockMorphContext.ts:155-159` — `dimOf(axis)` maps `vertical→height`, `horizontal→width`; the ONE `--dock-morph-t` scalar drives whichever axis. The vertical-rail branch is NOT wired to collapse (`useDockShellProps.ts:217-218` resolves `startCollapsed` to `false` for a non-`dock` branch), so a vertical dock today CANNOT morph/shrink — the gap the mandate ("both dock styles properly morph, shrink, animate") names.

If any of the above has shifted at HEAD, STOP and reconcile the edit-site table (§3) before editing — do not re-diagnose the taxonomy from scratch (invariant 3).

---

## §H2 — THE HINGE FORK (both arms specced; the user/orchestrator selects before this batch)

R3-2's disambiguation has two faithful shapes. This wave SPECS BOTH; the orchestrator picks one at the H2 hinge (AZ.md §USER HINGES). The shared substrate (the axis machinery, the collapse-on-both-orientations fix, the de-overloaded noun) is IDENTICAL across arms — only the public surface differs.

### Arm (a) — ONE `GlassDock`, ONE `orientation` axis (the AZ.md recommendation)

The redundant `variant=rail` expression COLLAPSES. "Rail-ness" becomes `orientation: "vertical"` + a density/shape choice — there is no `variant="rail"` value anymore. The `variant` discriminant is REMOVED entirely (it carried only `"dock" | "rail" | "instrument-strip"`; `instrument-strip` retired with InstrumentRail, `rail` folds into orientation, `dock` is the only survivor and becomes implicit). `GlassDock` is then ONE prop-shaped component:

```ts
interface DockProps {
    orientation?: "horizontal" | "vertical";   // the ONE layout axis
    collapsible?: boolean;                       // default true; vertical docks now opt in
    // … shape, density, overflow, layout, collapseDelay, startCollapsed, containerName (unchanged)
}
```

- The collapse surface (`collapseDelay`/`startCollapsed`/`layout`) is no longer branch-gated — it applies on BOTH orientations (the mandate: a vertical dock morphs/shrinks too). A vertical dock animates `height`, a horizontal dock animates `width` — `dockMorphContext.ts:155-159` already keys off `dim`, so the collapse machinery flows to vertical FOR FREE once the `startCollapsed`/`alwaysExpanded` resolution stops force-pinning vertical to always-expanded (`useDockShellProps.ts:246-251`).
- `instrument-strip`'s chassis surface vocabulary (the `<InstrumentChassis>` `--glass-bg-chassis` plate, the engraved bezel `::before`) is preserved as a `shape="chassis"` or a `surface` token choice — NOT a `variant` — so the speedtest cockpit consumer keeps its look without the discriminant. (If no live consumer remains post-W-IC1 retire, the chassis surface RETIRES with rationale per the ≥2-consumer bar — verify at re-ground.)
- **Pro:** the "vertical dock = orientation, not variant" mental model is singular; the noun "rail" is fully free; one component, one axis. **Con:** the rename touches every `variant="rail"` consumer call-site (the MIGRATION table is larger).

### Arm (b) — the named pair (`DockBar` horizontal / `DockRail` vertical), shared core

Two thin named SFC wrappers over the ONE shared shell. `DockBar` defaults `orientation="horizontal"`; `DockRail` defaults `orientation="vertical"`. Both forward to a single internal `<DockShell>` (the renamed `GlassDock` core). The discriminated union is REPLACED by the two named surfaces; `variant` is gone.

```vue
<DockBar collapsible>…</DockBar>      <!-- horizontal, was <GlassDock> / variant="dock" -->
<DockRail>…</DockRail>                 <!-- vertical, was <GlassDock variant="rail"> -->
```

- Both wrappers expose the SAME prop surface minus the orientation prop (the wrapper fixes it); both carry the collapse surface (the mandate's "both morph/shrink/animate" — `DockRail` gains the collapse machinery the old `variant="rail"` was denied).
- The core `<DockShell>` is internal (not exported standalone — the two named surfaces ARE the public API). `instrument-strip` becomes a `DockRail surface="chassis"` prop (same preservation as arm a).
- **Pro:** the names ARE the disambiguation ("a DockRail is vertical" reads at the call-site with zero prop); maps cleanly to the user's "a VERTICAL dock + a HORIZONTAL dock" phrasing. **Con:** two component surfaces + the internal `<DockShell>` is a 3-name structure where arm (a) is 1; the `/dock` barrel grows.

**The shared (arm-invariant) deliverables — land regardless of arm:**
1. The `variant` discriminant is GONE (no `"rail" | "instrument-strip"` value survives as a variant).
2. The collapse/morph machinery applies on BOTH orientations (vertical docks morph height; the `startCollapsed`/`alwaysExpanded` force-pin on vertical is removed).
3. The "rail" noun is de-overloaded — `.dock-layer-rail` is the ONLY surviving "rail" in the dock band (it is the in-dock switcher, addressed by W-DOCK-RAIL), and the noun is FREE for W-RAIL-EXTEND's `<DockRail>` beyond-dock facility (arm-b's `DockRail` and W-RAIL-EXTEND's facility must NOT both claim the name — see §6 coordination).
4. MIGRATION.md carries the rename table; no aliases (invariant 5).

---

## Goal criterion

A fresh consumer reads ONE unambiguous dock taxonomy: a horizontal dock and a vertical dock, named so the orientation is evident at the call-site, BOTH carrying the layering system AND the collapse/morph/shrink machinery, with NO second way to express "vertical" and NO "rail" noun overloaded across unrelated constructs. The demo's "three rails, three things" disambiguation paragraph is no longer needed because the taxonomy itself is unambiguous.

## Completion criterion

The hard-gate set (§4) verifies on captured artefacts: **HG1** — the `variant` discriminant is removed (deletion proof; `grep -rn 'variant="rail"\|variant="instrument-strip"' src/ demo/` returns zero live call-sites); the chosen arm's public surface (arm-a single component OR arm-b named pair) exists and typechecks. **HG2** — a vertical dock morphs/shrinks (a captured before/after: a `collapsible` vertical dock collapses→expands its `height` on `--dock-morph-t`, the machinery the old `variant="rail"` denied). **HG3** — `proof:dock-taxonomy` (born-RED) asserts the de-overload: exactly ONE "rail" noun survives in the dock band (`.dock-layer-rail`), the `variant` union is gone, and the redundant orientation-expression is gone. **HG4** — MIGRATION.md carries the rename table; `proof:no-legacy-alias` (or the existing alias gate) confirms zero compat shims. **HG5** — `proof:dock-unify` (the nav-pattern census) stays GREEN across the rename (the renamed surface still composes the home-left + nav + DockSeparator pattern).

---

## §1 — The verified defects (file:line, source-grounded)

**D1 — the `variant`×`orientation` redundancy: "vertical dock" is expressible two ways.** `useDockShellProps.ts:226-230` resolves `orientation` to `"vertical"` for `variant === "rail" | "instrument-strip"` OR for `props.orientation === "vertical"`. The demo proves the confusion live: `demo/stories/dock/rail.vue` renders `<GlassDock variant="rail">` and `<GlassDock orientation="vertical">` side-by-side as DISTINCT surfaces (E2-3, FLEET-DIGEST.md:787-788), and the story's own "three rails, three things" section (`rail.vue:176-194`) acknowledges the overload without resolving it. Two prop axes encode one concept.

**D2 — the "rail" noun is overloaded.** `GlassDock variant="rail"` (a vertical nav DOCK, `useDockShellProps.ts:130-136`), `.dock-layer-rail` (the embedded layer-SWITCHER, `layer-group.css:97`), and `ContinuousRail` (the timeline marker rail, unrelated) all claim "rail"; the W-RAIL-EXTEND net-new "hairline-rail-beyond-dock" wants the noun too (E3G-1, FLEET-DIGEST.md:802). `InstrumentRail` retired at W-IC1 (FLEET-DIGEST.md:58) but the `variant="instrument-strip"` value still carries its vocabulary. Four claims on one noun; the redesign frees it.

**D3 — the vertical dock cannot morph/shrink/collapse; the mandate says it must.** `useDockShellProps.ts:217-218` resolves `startCollapsed` to `false` on a non-`dock` branch, and `:246-251` force-pins `alwaysExpanded` to `true` when `orientation === "vertical"`. So a vertical (`rail`) dock is always-expanded by construction — it has NO collapse machinery (`DockLayerGroup.vue` booking note confirms "a vertical rail dock has no collapse machinery at all"). R3-2 / R3-13 want BOTH dock styles to "properly morph, shrink, animate." The substrate CAN (`dockMorphContext.ts:155-159` keys off `dim`); the prop resolution force-disables it for vertical.

**D4 — `instrument-strip` carries a retired component's vocabulary as a live variant value.** `useDockShellProps.ts:137-145` documents `instrument-strip` as the speedtest `SurveyResultDock` cockpit surface, but InstrumentRail RETIRED at W-IC1 (the ≥2-consumer bar; speedtest deleted its branch — FLEET-DIGEST.md:58). The variant value is a candidate for the same retirement OR a re-home as a `surface`/`shape` choice (it is a paint vocabulary, not an orientation) — RE-GROUND must confirm whether any live consumer remains.

---

## §2 — Objective

Resolve the taxonomy at the chosen H2 arm; land the arm-invariant deliverables. Five moves:

1. **Remove the `variant` discriminant (both arms).** Collapse `DockProps = DockVariantProps | DockRailProps` to a single prop shape (arm a) or two named wrappers over a single `<DockShell>` core (arm b). The `"rail" | "instrument-strip"` variant values are deleted; `instrument-strip`'s chassis paint re-homes to a `surface`/`shape` choice OR retires with rationale (per the re-grounded consumer count). No `variant` prop survives.

2. **Apply the collapse/morph machinery on BOTH orientations (D3).** Remove the `orientation === "vertical"` force-pin in `alwaysExpanded` (`useDockShellProps.ts:248-250`) and the non-`dock`-branch `false` in `startCollapsed` (`:217-218`); thread `collapsible`/`startCollapsed` so a vertical dock opts into the collapse path. The morph substrate is unchanged — `dockMorphContext.ts` already animates `height` for the vertical axis; only the prop resolution gating changes. Capture the vertical-collapse DELTA (HG2).

3. **De-overload the "rail" noun (D2).** After move 1, the ONLY "rail" in the dock band is `.dock-layer-rail` (the in-dock switcher, W-DOCK-RAIL's surface). Coordinate with W-RAIL-EXTEND so its beyond-dock facility's component name does NOT collide with arm-b's `DockRail` (§6): if arm (b) is chosen, the W-RAIL-EXTEND facility takes a NON-"rail" name (e.g. `<DockHairline>` / `<DockContextRail>` with the noun reserved) OR arm-b's vertical wrapper takes a different name — the orchestrator resolves the collision at the H2 pick.

4. **Author `proof:dock-taxonomy` (the born-RED de-overload gate).** A new structural gate (§3) that REDs if (a) a `variant="rail"`/`variant="instrument-strip"` value survives in `src/` or `demo/`, (b) any "rail"-substring dock construct exists OUTSIDE the chosen-arm ALLOWLIST (the closed set of legitimate "rail"-named constructs for that arm — see §3, T2), (c) the vertical-collapse force-pin reappears. The allowlist (not a fuzzy "exactly one" count) is what lets arm-b's legitimate `DockRail` vertical-dock wrapper coexist with `.dock-layer-rail` while still RED-ing a NEW unlisted `*Rail*` construct (a renamed-to-evade facility does NOT slip through).

5. **Write the MIGRATION table + retire the demo's disambiguation paragraph (D1).** MIGRATION.md gets the `variant="rail"` → (arm a: `orientation="vertical"`; arm b: `<DockRail>`) rename row; `demo/stories/dock/rail.vue` loses the "three rails, three things" section (`:176-194`) and the side-by-side two-expression demo — replaced by ONE canonical vertical-dock example.

This honors gestalt (the axis substrate is KEPT — only the naming/gating changes), no-legacy (clean break, MIGRATION table, no aliases — invariant 5), and root-not-consumer (the library taxonomy is fixed; the demo re-points to the renamed surface).

---

## §3 — Files + exact edit-sites (re-grep at HEAD before editing)

| file | edit |
|---|---|
| `src/components/custom/dock/composables/useDockShellProps.ts` | **Arm a:** collapse `DockVariantProps \| DockRailProps` (`:102-150`) to ONE `DockProps` interface; delete the `variant` field + the `dockBranch` guard (`:156-158`); remove the `variant`-branching in `orientation` (`:226-230`), `alwaysExpanded` (`:246-251` — drop the `orientation === "vertical"` force-pin), `fitContent` (`:252-256`), `startCollapsed` (`:217-218`). **Arm b:** rename the core to a `<DockShell>`-internal prop shape, same union-collapse, the two named wrappers forward to it. |
| `src/components/custom/dock/GlassDock.vue` | **Arm a:** keep `GlassDock` as the single component name; remove `variant`-conditional bindings. **Arm b:** `GlassDock` becomes the internal `<DockShell>` (or stays as a deprecated-removed name per MIGRATION); add `DockBar.vue` + `DockRail.vue` thin wrappers. The `outerLayerAxis` hardcode (`GlassDock.vue:109` — `() => "horizontal"`) is re-pointed to the resolved `orientation` so the vertical dock's outer pair morphs the BLOCK axis (the move-2 vertical-collapse path). |
| `src/components/custom/dock/index.ts` | **Arm a:** unchanged exports (single `GlassDock`). **Arm b:** add `DockBar`/`DockRail` exports; drop `GlassDock` or re-home as internal. The `/dock` subpath barrel reflects the chosen surface. |
| `demo/stories/dock/rail.vue` | retire the "three rails, three things" disambiguation section (`:176-194`) + the side-by-side `variant="rail"` vs `orientation="vertical"` two-expression demo; replace with ONE canonical vertical-dock example using the renamed surface (arm a: `orientation="vertical"`; arm b: `<DockRail>`). |
| `demo/layout/SidebarDock.vue` | the shell's vertical nav dock re-points off `variant="rail"` to the renamed surface (re-grep: confirm the current `<GlassDock>` invocation — it composes the `#persistent` home + nav + `#collapsed` dark-toggle pattern, which must survive the rename for `proof:dock-unify`). |
| `demo/layout/BottomDock.vue` | the horizontal shell dock re-points (arm a: unchanged if it used no `variant`; arm b: `<DockBar>`). Re-grep its current `<GlassDock>` props. |
| any other `variant="rail"`/`variant="instrument-strip"` call-site | re-grep `grep -rn 'variant="rail"\|variant="instrument-strip"\|variant: *"rail"' src/ demo/` and re-point each. The speedtest `instrument-strip` consumer is cross-repo (NOT edited here — booked to its own re-pin in the consumer; recorded in MIGRATION). |
| NEW `scripts/proof-dock-taxonomy.mjs` | the born-RED de-overload gate (§2 move 4): clause T1 — no `variant="rail"`/`instrument-strip"` survives; T2 — the "rail"-noun ALLOWLIST is exact + closed (NOT a fuzzy substring count): the gate carries an explicit allowlist of the LEGITIMATE "rail"-named constructs for the chosen arm — **arm (a): `{ .dock-layer-rail` (in-dock switcher CSS class), `DockRail` (the W-RAIL-EXTEND beyond-dock facility — the freed noun) `}`; arm (b): `{ .dock-layer-rail`, `DockRail` (the VERTICAL-dock wrapper), `DockHairline`/`DockContextRail` (the W-RAIL-EXTEND facility under its non-colliding name) `}`** — and REDs if ANY "rail"-substring dock construct exists OUTSIDE the arm's allowlist (a NEW unlisted `*Rail*` dock component), so arm-b's `DockRail` wrapper does NOT false-trip the ceiling AND a renamed-to-evade facility (`DockRailExtended`) still REDs because it is unlisted. The chosen-arm allowlist is the parameter the orchestrator sets at the H2 pick (the §6 reservation, made literal). T3 — no `orientation === "vertical"` force-pin on `alwaysExpanded`; T4 — the chosen arm's surface exists (arm a: one `GlassDock` with no `variant`; arm b: `DockBar` + `DockRail`). |
| `package.json` + `scripts/gates.mjs` | the gate-script-parity TRIO: add `"proof:dock-taxonomy": "node scripts/proof-dock-taxonomy.mjs"` (beside the other dock proofs ~`:556`); ADD the `gates.mjs` GATES row `{ id: "proof:dock-taxonomy", cmd: "proof:dock-taxonomy", tags: ["local","ci","release"] }` (device-free static src-scan → carries `ci`, NOT a `JUSTIFIED_LOCAL_ONLY` keep); run `proof:gen-ci-fresh` to re-lock `ci.yml` (it DOES join CI — a static gate, no device gate). `proof:gate-script-parity` (file↔key bijection) + `proof:tag-parity` (the static-gate-carries-`ci` assert) both GREEN post-registration. |
| `MIGRATION.md` | the rename table: `variant="rail"` → (arm a) `orientation="vertical"`; (arm b) `<DockRail>`. `variant="instrument-strip"` → `surface="chassis"` (or RETIRED row). No aliases. |
| `CLAUDE.md` (dock section) | reconcile the dock taxonomy prose (the `## Component architecture` / dock orientation section) to the chosen arm; remove the `variant: dock\|rail\|instrument-strip` language. |
| NEW `docs/tranches/AZ/audit/visual/W-DOCK-TAXONOMY-DELTA.md` | the write-up: the chosen arm + rationale, the vertical-collapse before/after capture (HG2), the `proof:dock-taxonomy` born-RED/GREEN stdout, the MIGRATION table, the consumer re-point census. |

---

## §4 — HARD GATE (evidence-backed, born-RED)

The named born-RED gate is **`proof:dock-taxonomy`**. The gate is a SET of structural + captured conditions, each backed by an artefact (a deletion proof, a born-RED structural diff, a captured vertical-collapse DELTA) — never a grep-only "API exists" check for the runtime claim.

**HG1 — the `variant` discriminant is removed; the chosen arm's surface exists.** Deletion proof: `git show --stat` shows `DockProps` no longer carries `variant: "rail" | "instrument-strip"`; `grep -rn 'variant="rail"\|variant="instrument-strip"' src/ demo/` returns zero live call-sites. Arm a: one `GlassDock` typechecks with no `variant` prop. Arm b: `DockBar` + `DockRail` exist on the `/dock` barrel and typecheck. `vue-tsc --noEmit` GREEN. Captured: the deletion stat + typecheck output in the DELTA.

**HG2 — a vertical dock morphs/shrinks (the mandate).** A captured before/after: a `collapsible` vertical dock collapses→expands its `block-size`/`height` on `--dock-morph-t` (the machinery the old `variant="rail"` force-pin denied). Born-RED witness: at HEAD a vertical dock cannot collapse (`startCollapsed` resolves `false`, `alwaysExpanded` resolves `true`); after move 2, a vertical dock with `collapsible` morphs its height with the scalar onset tracking the box (the same lockstep the W-DOCK-RAIL / AY W-DOCK2 gate witnesses, on the vertical axis). Captured: the light+dark frame-series of the vertical collapse in the DELTA.

**HG3 — the de-overload is structurally asserted.** `proof:dock-taxonomy` REDs on a synthetic re-add of any of: a `variant="rail"` value, a second "rail"-named dock construct, the vertical force-pin. Born-RED proof: hand-add `variant="rail"` to a demo dock → the gate exits 1; revert → exit 0. Captured: the born-RED diff + the two gate stdouts.

**HG4 — MIGRATION + no aliases.** `MIGRATION.md` carries the rename table; the existing no-legacy-alias gate (or a `proof:dock-taxonomy` clause) confirms zero compat shims for the old names. Captured: the MIGRATION diff + the alias-gate GREEN.

**HG5 — `proof:dock-unify` stays GREEN across the rename.** The renamed shell docks (SidebarDock vertical + BottomDock horizontal) still compose the home-left `#persistent` + nav + `<DockSeparator>` nav-pattern the W61 census asserts (`proof:dock-unify` F4). Captured: the `proof:dock-unify` GREEN stdout post-rename.

**The single binding condition:** the `variant` discriminant is gone (HG1), a vertical dock now morphs/shrinks (HG2, captured), the "rail" noun is de-overloaded and `proof:dock-taxonomy` REDs on any regression (HG3), the MIGRATION table carries the clean break (HG4), and the nav-pattern census survives the rename (HG5).

**Runner-truth disposition (the AY W-LIVE1 lesson, IN the spec — not retrofitted).** `proof:dock-taxonomy` is a pure DEVICE-FREE static src-scan gate (deletion proofs, an allowlist diff over `src/`+`demo/`, the force-pin absence — no browser spawn, no GPU/device dependency). It therefore runs on EVERY runner and MUST carry `ci` (clause T1–T4 are all source-scan witnesses). The captured arms are NOT gate clauses: HG2's vertical-collapse frame-series + HG1's deletion stat live in `W-DOCK-TAXONOMY-DELTA.md` and close under `proof:live-verified-ledger` (the CI-side static proof that the live-verification HAPPENED, the AY runner-truth backstop). So the gate is `tags: ["local","ci","release"]` (a device-free structural gate is NOT in `JUSTIFIED_LOCAL_ONLY` and is NOT a `LIVE_VERIFIED_LOCAL_ONLY` Playwright detect — `proof:tag-parity` REDs a static src-scan gate that omits `ci`). The gate-script-parity trio is named at the §3 `package.json`/`gates.mjs` rows: the `package.json` key + the `gates.mjs` row tagged `["local","ci","release"]` + the `proof:tag-parity` pass (no `JUSTIFIED_LOCAL_ONLY` entry needed — it carries `ci`). HG2/HG3 are EXECUTED born-RED (hand-add `variant="rail"` → exit 1), never grep-only.

---

## §5 — Scope fence

- ONLY the dock taxonomy NAMING + the vertical-collapse gating + the de-overload gate. The dock morph SUBSTRATE (`dockMorphContext.ts` single-scalar engine), the in-dock switcher rail VISUALS (the hairline rebuild), and the nav-pattern itself are NOT re-architected here (W-DOCK-RAIL owns the rail visuals; AY W-DOCK2's single-scalar engine is KEPT).
- The cross-repo speedtest `instrument-strip` consumer is NOT edited in this wave — its re-pin is booked to the consumer's own migration, recorded in MIGRATION.md.
- The W-RAIL-EXTEND beyond-dock facility is NOT built here — only the noun is RESERVED for it (the collision resolution at §6).
- ppmycota purple, the `in srgb` surface-tint family, `cn()`, `.focus-ring` remain deliberate keeps (AZ.md scope fences).

## §6 — Coordination

- **W-DOCK-RAIL (Batch 1, predecessor).** The in-dock switcher rail is rebuilt to the hairline register BEFORE this taxonomy edit, so this wave moves a CORRECT `.dock-layer-rail` surface, not the broken one. Re-ground confirms W-DOCK-RAIL landed before editing the layer-group surface.
- **W-RAIL-EXTEND (Batch 2, successor — the "rail" noun collision).** If H2 selects arm (b), `DockRail` (the vertical wrapper) and W-RAIL-EXTEND's beyond-dock facility CANNOT both be `<DockRail>`. The orchestrator resolves at the H2 pick: either arm-b's vertical wrapper takes the name and W-RAIL-EXTEND's facility is `<DockHairline>`/`<DockContextRail>`, or vice-versa. This wave RESERVES the chosen name; W-RAIL-EXTEND consumes the reservation. The `proof:dock-taxonomy` T2 clause encodes the agreed reservation AS THE CLOSED ALLOWLIST (§3): the arm-a allowlist frees `DockRail` for the facility; the arm-b allowlist admits `DockRail` (wrapper) + `DockHairline`/`DockContextRail` (facility) and NOTHING else. The reservation is the literal allowlist parameter, identical in both specs' framing — W-RAIL-EXTEND §6 names the SAME set. **Ordering note:** T2 is born in THIS wave (runs first in Batch 2), at which point the facility has ZERO mounts — T2 is a CEILING/allowlist check (no construct OUTSIDE the set), satisfiable at zero facility mounts; the ≥2-mount floor is W-RAIL-EXTEND's `proof:rail-extend-consumers`, not T2.
- **W-DOCK-NORMALIZE ‖ W-DOCK-CONTEXT (Batch 2, siblings).** Both consume the renamed surface; they run AFTER this rename lands (the taxonomy renames first in the batch per the AZ.md DAG). Their nav-pattern + contextual-layer edits target the renamed component.

## §7 — Named successors (for any deferral)

- If the chosen arm cannot land the vertical-collapse machinery cleanly within bounds (the `outerLayerAxis` hardcode re-point at `GlassDock.vue:109` touches the morph orchestrator's first-mount FLIP, which AY W-DOCK2 §F2 booked to W-GOD1), the vertical-collapse half BOOKS to **W-DOCK-NORMALIZE** (it edits the same shell docks) with the captured vertical-morph reproduction; the rename half still lands this wave.
- If `instrument-strip`'s chassis surface has a live consumer the re-ground surfaces, the `surface="chassis"` re-home lands here; if zero consumers, it RETIRES with rationale recorded in `W-DOCK-TAXONOMY-DELTA.md` (the ≥2-consumer bar).
