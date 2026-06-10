# AZ.W-KF-CONSUMER — the cross-repo consumer-side fixes: keyframes' phantom-subpath re-pin, fourier's pending phantom-class patch, bbnf's hard dist alias

**Track:** X (cross-repo) · **Type:** refactor (consumer-side) + the two documented-expected red closures · **Repos of effect:** keyframes.js (`/Users/mkbabb/Programming/keyframes.js`), fourier-analysis/web (`/Users/mkbabb/Programming/fourier-analysis/web`), bbnf-lang/playground (`/Users/mkbabb/Programming/bbnf-lang`) · **Spec authored in:** glass-ui (`docs/tranches/AZ/waves/AZ.W-KF-CONSUMER.md`)
**Depends on:** the glass-ui `3.10.1` cut (LIVE — the retired subpaths + the deleted glass-classes are settled at HEAD; this wave fixes the CONSUMERS, not the library). NO AZ dependency — each arm runs against the published `3.10.1` immediately on greenlight. Independent of AZ.W-ADOPT/W-DEPLOY (those are the SLIDES arm; this is the keyframes/fourier/bbnf arm), so it parks at Batch 5 in the DAG only for orchestration, not for a data edge.
**STATUS: SPEC**

This wave discharges the THREE cross-repo consumer reds the AY close carried forward as documented-expected (`B4-5` S1 + `B4-6`/`B4-10` S2 + `B1-proof-resolution-bbnf-fix`): each is a CONSUMER repo holding a stale binding against the now-settled `3.10.1` library surface. Per **invariant 16** (the consumer owns its own migration; glass-ui-side is CLEAN), glass-ui has no source edit owed — the fix is three per-repo edit sets, enumerated exactly below. The headline is the keyframes **phantom-SUBPATH** trap (the invariant-32 phantom-class trap recurring one level up): keyframes' demo imports two subpaths glass-ui RETIRED, so a re-pin to `3.10.1` fails to resolve and breaks its demo build. The fourier arm applies the long-pending phantom-CLASS patch (8 dead `.glass-{subtle,medium}` refs). The bbnf arm removes the contract-v2-violating hard `dist/` alias — the single `proof:resolution` consumer red.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD in EACH consumer repo before any edit)

The fleet evidence below is from `FLEET-DIGEST.md` findings **B4-5** (keyframes phantom-subpath, S1 OPEN-DEFECT), **B4-6**/**B4-10** (fourier phantom-class, S2), **B1-proof-resolution-bbnf-fix**/**B2-SIBLING-RESOLUTION** (the bbnf hard alias). It was re-verified live across the three consumer repos while authoring this spec, but a digest compresses and each consumer is on its own moving branch. RE-GREP all of the following at each repo's HEAD before editing — if any cite has drifted, STOP and report a scope-reveal (do not blind-edit):

1. **keyframes imports the TWO retired subpaths.** `grep -rn 'glass-ui/header-ribbon\|glass-ui/glass-panel' /Users/mkbabb/Programming/keyframes.js/demo /Users/mkbabb/Programming/keyframes.js/src` → expect EXACTLY two sites: `demo/@/components/custom/EasingCurveCanvas.vue:107` (`import { GlassPanel } from "@mkbabb/glass-ui/glass-panel"`) and `demo/@/components/custom/editor-shell/EditorShell.vue:100` (`import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon"`). The keyframes pin is `~3.9.0` (`package.json:175`), installed `3.9.0` — where both subpaths still SHIP (the trap is dormant until the re-pin).
2. **The two subpaths are GONE from glass-ui `3.10.1`.** `node -e "const p=require('/Users/mkbabb/Programming/glass-ui/package.json'); console.log(p.exports['./header-ribbon'], p.exports['./glass-panel'])"` → expect `undefined undefined` (verified: 74 export keys, neither present); `ls /Users/mkbabb/Programming/glass-ui/dist/header-ribbon.js /Users/mkbabb/Programming/glass-ui/dist/glass-panel.js` → both ENOENT; `ls /Users/mkbabb/Programming/glass-ui/src/components/custom/ | grep -i 'ribbon\|panel'` → none. The retirement is real and settled (`CHANGELOG.md:17` "the ruthless prune"; `MIGRATION.md:5` "each had 0 production consumers" — the claim keyframes violates).
3. **fourier carries 8 phantom-class refs.** `grep -rn 'glass-subtle\|glass-medium' /Users/mkbabb/Programming/fourier-analysis/web/src` → expect 8 refs across 6 files: `paper/MobileFloatingToc.vue:110,117,133`, `paper/PaperView.vue:393`, `visualization/gallery/GallerySearchBar.vue:80`, `visualization/EquationPanel.vue:70`, `equation/EquationModeToggle.vue:9`, `equation/convergence/ConvergenceLegend.vue:17`. `grep -rn 'glass-subtle\|glass-medium' /Users/mkbabb/Programming/glass-ui/src/styles` → ZERO (glass-ui DELETED these classes; the current ladder is `.glass-{wash,quiet,resting,floating,overlay}` per `CLAUDE.md:157`). fourier pin is `^3.1.0`, installed `3.1.0` (badly stale).
4. **bbnf carries the hard dist alias.** `npm run proof:resolution` (in glass-ui) reports the single consumer violation: `bbnf-lang/playground/vite.config.ts:24` — a hard `dist/` alias for `@mkbabb/keyframes.js` (`"@mkbabb/keyframes.js": fileURLToPath(new URL("../node_modules/@mkbabb/keyframes.js/dist/keyframes.js", …))`). Re-confirm at `vite.config.ts:22-34` (the `resolve.alias` block). The contract-v2 fix: remove the hard `dist/` alias so the bare specifier resolves through the exports map (glass-ui CLAUDE.md invariant 30). bbnf's glass-ui pin is `^3.0.0` (`playground/package.json:13`).
5. **glass-ui-side is CLEAN (no library edit owed).** `npm run proof:resolution` → `0 publisher violation(s)`; `PROOF_PHANTOM_ALLOW_PENDING=1 npm run proof:phantom-classes` → "glass-ui src/+demo/ and the non-pending consumers are CLEAN". Confirm both before touching any consumer — if a glass-ui-side violation has appeared, that is a DIFFERENT defect (a library regression), STOP and report.

## §1 — Goal criterion

The three consumer repos resolve cleanly against `@mkbabb/glass-ui@3.10.1` with no phantom binding: keyframes' demo imports survive a re-pin (the two retired-subpath imports re-expressed onto surviving primitives), fourier's 8 dead `.glass-{subtle,medium}` refs re-pointed to the live 5-rung ladder (the surfaces paint, no longer silent-unstyled), and bbnf's hard `dist/` alias removed so the bare specifier resolves through the exports map. The two documented-expected glass-ui local reds (`proof:resolution` — the bbnf alias; `proof:phantom-classes` — the fourier patch) CLOSE: re-running each gate with the consumer checked out is GREEN, not skip-passed. glass-ui ships ZERO source edits — every fix is consumer-side per invariant 16.

## §2 — Completion criterion

The hard gate (§5) verifies, on artefacts, per arm:
- **keyframes:** the two phantom-subpath imports are GONE (`grep` → 0); the demo `vite build` is GREEN against a `3.10.1` re-pin; `EasingCurveCanvas.vue` + `EditorShell.vue` render their surfaces (a DOM/visual readback that the wash panel + the header chrome paint, not a broken/unstyled frame).
- **fourier:** the 8 `.glass-{subtle,medium}` refs are GONE (`grep` → 0); each is re-pointed to a live ladder rung; the 6 surfaces paint (a captured before/after on the affected views — the silent-unstyled → styled DELTA).
- **bbnf:** the hard `dist/` alias is GONE from `vite.config.ts` (`grep` → 0 for the `dist/keyframes.js` URL alias); glass-ui's `proof:resolution` re-run WITH bbnf checked out reports `0 consumer violation(s)` (the red CLOSED, not skip-passed); the bbnf playground `vite build` is GREEN (the bare specifier resolves through the exports map).
- **glass-ui:** `git status` in glass-ui shows NO source/demo/script/package.json change attributable to this wave (the inv-16 cleanliness proof).

---

## §3 — The defect (file:line, re-grepped at each consumer HEAD)

### D1 — keyframes' phantom-SUBPATH debt (B4-5, S1; BLOCKS its re-pin)

keyframes' demo imports TWO glass-ui subpaths that were RETIRED between `3.9.0` (keyframes' installed version) and `3.10.1`:

| import site | retired subpath | the symbol |
|---|---|---|
| `demo/@/components/custom/EasingCurveCanvas.vue:107` | `@mkbabb/glass-ui/glass-panel` | `GlassPanel` |
| `demo/@/components/custom/editor-shell/EditorShell.vue:100` | `@mkbabb/glass-ui/header-ribbon` | `HeaderRibbon` |

Both shipped as dist chunks + exports keys in `3.9.0` (confirmed in keyframes' `node_modules/@mkbabb/glass-ui/dist/{header-ribbon,glass-panel}.js`), but are GONE from `3.10.1` (no dist chunk, no `src/components/custom/` dir, not in `src/subpaths/`, not among the 74 `package.json` export keys). On a re-pin to `3.10.1` these imports FAIL TO RESOLVE — the demo build breaks. This is the phantom-class trap (LESSONS-LEARNED invariant 32) recurring as a phantom-SUBPATH. The migration targets:

- **`GlassPanel variant="wash"`** (`EasingCurveCanvas.vue:2-5`, a glass-surface wrapper carrying its own `--glass-border-wash` 1px border, dropped to `border:none` by the component's own `:276` comment — so it is purely the wash background + blur tier) → the surviving `.glass-wash` ladder class on a `<div>` (the rung lives in glass-ui `src/styles/glass/ladder.css`, `CLAUDE.md:157`), OR `<Card>` if a framed surface is wanted. The wrapper already drops its border, so a bare `<div class="easing-curve-canvas-wrapper w-full overflow-hidden rounded-card p-2 glass-wash">` is the minimal faithful swap — the `variant="wash"` prop becomes the `.glass-wash` class verbatim.
- **`HeaderRibbon position="right"`** (`EditorShell.vue:10-44`, a pin/toggle ribbon with `#items` + `#anchor` slots and a `position` prop, exposing `{ pinned, toggled }` via the anchor slot and a `headerRibbonRef` instance) → has NO direct survivor (the retirement deleted the component, not renamed it). The keyframes-side re-expresses the ribbon's chrome with surviving primitives — a positioned flex container holding the `#items` content (the `SharePopover` + the shortcuts `Button` + `DarkModeToggle`), with the pin/toggle state owned LOCALLY in keyframes (a `ref` pair + a class binding) rather than inherited from the deleted component's `defineExpose`. This is real consumer re-architecture, not a class swap — `EditorShell.vue` already destructures `{ pinned, toggled }` from the anchor slot, so the local re-implementation must reproduce that contract for its own template (or simplify if the toggled state is unused at HEAD — re-grep `EditorShell.vue` for the `pinned`/`toggled` consumers to size the port).

The verdict on whether glass-ui should RE-PUBLISH either primitive: NO. Both were retired at "0 production consumers" — keyframes IS a (demo-only) consumer, but a single DEMO consumer does not clear the ≥2-consumer bar (L invariant 8). The library surface is correct; the consumer owns the re-expression (inv-16). If a SECOND repo wants a header-ribbon/glass-panel facility, that re-opens the substrate question in a future glass-ui wave — recorded as a named successor (§7), not forced here.

### D2 — fourier's pending phantom-CLASS patch (B4-6/B4-10, S2)

fourier-analysis/web has 8 extant references to `.glass-subtle` / `.glass-medium` across 6 files — class names glass-ui DELETED (the current ladder is `.glass-{wash,quiet,resting,floating,overlay}`). These surfaces render SILENTLY UN-STYLED today (the class matches no rule). The 8 sites + the route per the 5-rung ladder:

| file:line | dead class | re-point (per the current ladder) |
|---|---|---|
| `paper/MobileFloatingToc.vue:110` (search bar) | `glass-medium` | `glass-resting` (an interactive floating control reads at the resting rung) |
| `paper/MobileFloatingToc.vue:117` (toc trigger button) | `glass-medium` | `glass-resting` |
| `paper/MobileFloatingToc.vue:133` (toc dropdown) | `glass-medium` | `glass-floating` (a dropdown floats above — the floating rung) |
| `paper/PaperView.vue:393` (overlay page) | `glass-subtle` | `glass-quiet` (a quiet underlay) |
| `visualization/gallery/GallerySearchBar.vue:80` (filter panel) | `glass-medium` | `glass-resting` |
| `visualization/EquationPanel.vue:70` (eq panel) | `glass-subtle` | `glass-quiet` |
| `equation/EquationModeToggle.vue:9` (toggle) | `glass-subtle` | `glass-quiet` |
| `equation/convergence/ConvergenceLegend.vue:17` (legend overlay) | `glass-subtle` | `glass-quiet` |

The mapping rule (the consumer applies, not glass-ui): `.glass-subtle` → `.glass-quiet` (the quiet/underlay register), `.glass-medium` → `.glass-resting` for interactive controls / `.glass-floating` for floated overlays (a dropdown). The per-site choice above is the recommended landing; the fourier agent confirms each by reading the surface's z-context (a floated/dropdown overlay → `floating`, a flat panel → `quiet`/`resting`). This is the documented invariant-32 phantom-class fleet (LESSONS-LEARNED:581, "a 13-site phantom `.glass-{subtle,medium}` fleet across fourier (9) + words (4) + keyframes (3)"); keyframes is now CLEAN (0 refs), words is its own repo's debt (not this wave), fourier carries the surviving 8. **NOTE:** fourier is also badly pin-stale (`^3.1.0`, installed `3.1.0`); this wave's MINIMAL scope is the 8-class re-point (the surfaces paint) — a full re-pin to `3.10.1` would surface MORE retired-class/retired-component breakage and is NOT in this wave's bounds (recorded as a named successor: fourier's own re-pin wave).

### D3 — bbnf's hard dist alias (B1-proof-resolution-bbnf-fix; the single proof:resolution consumer red)

`bbnf-lang/playground/vite.config.ts:24` carries a hard `dist/` alias for `@mkbabb/keyframes.js`:
```ts
"@mkbabb/keyframes.js": fileURLToPath(
    new URL("../node_modules/@mkbabb/keyframes.js/dist/keyframes.js", import.meta.url),
),
```
This violates the cross-repo dev-resolution contract-v2 (§2.4): a consumer must NOT hard-alias a `@mkbabb/*` package to its `dist/` build — the bare specifier resolves through the exports map to `dist/` via the `file:` symlink. The hard alias pins a specific built file, defeating the exports-map resolution + the `build:watch` freshness model. glass-ui's `proof:resolution` flags this as the lone consumer violation (`0 publisher violation(s), 1 consumer violation(s)`), born-RED with bbnf checked out, skip-passed on a clean CI runner (no sibling present). The fix: DELETE the alias entry (lines 23-25) — the bare `@mkbabb/keyframes.js` specifier then resolves through keyframes' own exports map. NOTE: the alias is for `keyframes.js`, NOT glass-ui (bbnf's glass-ui pin is `^3.0.0`, resolving bare through the exports map already — the glass-ui side is clean); the contract-v2 violation is the keyframes hard-alias, and removing it closes the gate.

---

## §4 — The per-repo edit sets (exact)

### Arm A — keyframes.js (the phantom-subpath re-pin)

| # | File | Edit |
|---|---|---|
| A1 | `keyframes.js/package.json:175` | `"@mkbabb/glass-ui": "~3.9.0"` → `"@mkbabb/glass-ui": "3.10.1"` (exact; the orchestrator regenerates `package-lock`/`node_modules` against the published `3.10.1`) |
| A2 | `keyframes.js/demo/@/components/custom/EasingCurveCanvas.vue:107` | DELETE `import { GlassPanel } from "@mkbabb/glass-ui/glass-panel"` |
| A3 | `keyframes.js/demo/@/components/custom/EasingCurveCanvas.vue:2-5,102` | replace the `<GlassPanel variant="wash" class="…">…</GlassPanel>` wrapper with `<div class="easing-curve-canvas-wrapper … glass-wash">…</div>` (the `variant="wash"` → the `.glass-wash` ladder class; the existing `:276` `border:none` override is preserved on the `.easing-curve-canvas-wrapper` class) |
| A4 | `keyframes.js/demo/@/components/custom/editor-shell/EditorShell.vue:100` | DELETE `import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon"` + the `:144` `useTemplateRef<InstanceType<typeof HeaderRibbon>>` (re-type or drop the ref per the re-expression) |
| A5 | `keyframes.js/demo/@/components/custom/editor-shell/EditorShell.vue:10-44` | re-express the `<HeaderRibbon position="right">` ribbon as a keyframes-local positioned flex container holding the `#items` slot content + a local pin/toggle state (re-grep the `pinned`/`toggled` anchor-slot consumers to size the port — if unused at HEAD, simplify to a static positioned header) |

The two import-site swaps are the load-bearing edits; A1 (the re-pin) is what surfaces the trap, so A2-A5 must land in the same change set (a re-pin without the swaps breaks the build — born-RED is the failing `vite build`, GREEN is the swap landed).

### Arm B — fourier-analysis/web (the phantom-class re-point)

8 mechanical class re-points per the D2 table — `.glass-subtle` → `.glass-quiet`, `.glass-medium` → `.glass-resting` (flat control) / `.glass-floating` (floated overlay). No import change, no re-pin (fourier stays at `^3.1.0` this wave — the minimal scope is the surfaces paint):

| # | File:line | from → to |
|---|---|---|
| B1 | `paper/MobileFloatingToc.vue:110` | `glass-medium` → `glass-resting` |
| B2 | `paper/MobileFloatingToc.vue:117` | `glass-medium` → `glass-resting` |
| B3 | `paper/MobileFloatingToc.vue:133` | `glass-medium` → `glass-floating` |
| B4 | `paper/PaperView.vue:393` | `glass-subtle` → `glass-quiet` |
| B5 | `visualization/gallery/GallerySearchBar.vue:80` | `glass-medium` → `glass-resting` |
| B6 | `visualization/EquationPanel.vue:70` | `glass-subtle` → `glass-quiet` |
| B7 | `equation/EquationModeToggle.vue:9` | `glass-subtle` → `glass-quiet` |
| B8 | `equation/convergence/ConvergenceLegend.vue:17` | `glass-subtle` → `glass-quiet` |

### Arm C — bbnf-lang/playground (the hard dist alias removal)

| # | File:line | Edit |
|---|---|---|
| C1 | `bbnf-lang/playground/vite.config.ts:23-25` | DELETE the `"@mkbabb/keyframes.js": fileURLToPath(new URL("../node_modules/@mkbabb/keyframes.js/dist/keyframes.js", …))` alias entry — the bare specifier then resolves through keyframes' exports map per contract-v2 §2.4 |

---

## §5 — HARD GATE

This wave closes when ALL of the following verify on artefacts, per arm:

### Arm A — keyframes
1. **The phantom-subpath imports are GONE.** `grep -rn 'glass-ui/header-ribbon\|glass-ui/glass-panel' keyframes.js/demo keyframes.js/src` → 0 hits.
2. **The pin is `3.10.1` exact.** `grep '"@mkbabb/glass-ui"' keyframes.js/package.json` → `"3.10.1"` (no caret/tilde); `package-lock` resolves `3.10.1`.
3. **The demo BUILD is GREEN against `3.10.1`.** `npm --prefix /Users/mkbabb/Programming/keyframes.js run build` (the demo build, the arm that consumes the two import sites) exits 0 — the import resolution succeeds (this is the born-RED→GREEN: at HEAD a `3.10.1` re-pin without the swaps fails this build).
4. **The two surfaces PAINT (a runtime readback, not a build-only check).** A Chrome DevTools MCP load of the keyframes demo easing-curve view + the editor-shell header confirms the wash panel renders its glass surface (a `.glass-wash` backdrop, not an unstyled box) and the re-expressed header chrome renders its `#items` controls (the `SharePopover` + shortcuts `Button` + `DarkModeToggle` present and positioned). A captured before/after frame is the paired DELTA.

### Arm B — fourier
5. **The phantom-class refs are GONE.** `grep -rn 'glass-subtle\|glass-medium' fourier-analysis/web/src` → 0 hits.
6. **The 6 surfaces PAINT (the silent-unstyled → styled DELTA).** A captured before/after on the affected views (the MobileFloatingToc search bar + dropdown, the PaperView overlay page, the GallerySearchBar filter panel, the EquationPanel, the EquationModeToggle, the ConvergenceLegend) shows each surface now carries its glass-rung paint (a backdrop/blur/border where the dead class painted nothing). The before frame (unstyled) + the after frame (the live rung) are the paired DELTA — the cardinal-lesson capture, not a grep-only claim.

### Arm C — bbnf + the glass-ui red closures
7. **The hard dist alias is GONE.** `grep -n 'dist/keyframes.js' bbnf-lang/playground/vite.config.ts` → 0 hits; the `resolve.alias` block no longer carries the `@mkbabb/keyframes.js` → `dist/` entry.
8. **`proof:resolution` CLOSES with bbnf checked out.** Run from glass-ui WITH the bbnf sibling present: `npm run proof:resolution` → `0 publisher violation(s), 0 consumer violation(s)` (the documented-expected red CLOSED — GREEN with the consumer present, not skip-passed on an absent runner).
9. **`proof:phantom-classes` CLOSES with fourier checked out.** Run from glass-ui WITH the fourier sibling present: `npm run proof:phantom-classes` → CLEAN (the 8 fourier sites gone; the documented-pending red CLOSED). The `PROOF_PHANTOM_ALLOW_PENDING=1` downgrade is no longer needed — the gate is GREEN without it.
10. **bbnf playground BUILD is GREEN.** `npm --prefix /Users/mkbabb/Programming/bbnf-lang/playground run build` (or the repo's build entry) exits 0 — the bare `@mkbabb/keyframes.js` specifier resolves through the exports map.

### Cross-arm — the inv-16 cleanliness proof
11. **glass-ui ships ZERO source edits.** `git -C /Users/mkbabb/Programming/glass-ui status --porcelain` shows NO `src/`, `demo/`, `scripts/`, or `package.json` change attributable to this wave — the fix is entirely consumer-side (the only glass-ui artefact this wave touches is THIS spec doc + the AZ PROGRESS row). Every gate above runs against the UNCHANGED published `3.10.1` library.

The gates are grep+build+the captured runtime DELTAs; the BEHAVIOUR proof for arms A and B is the captured before/after frame (a surface that was broken/unstyled now paints), NOT the grep — grep-only is insufficient for a runtime feature.

## §6 — Scope fence + HARD BOUNDARIES

- **glass-ui is READ-ONLY for source.** No library edit is owed (inv-16); the retired subpaths + the deleted classes are CORRECT and settled at `3.10.1`. If a fix seems to want a glass-ui edit, that is a scope-reveal — STOP and report; do NOT re-publish `header-ribbon`/`glass-panel` or re-add `.glass-{subtle,medium}` to "fix" a consumer (that would be a backwards-compat alias, banned by the no-legacy invariant).
- **Each consumer repo's git index is USER-DOMAIN** — the agent edits the working tree, the orchestrator/user owns the stage/commit/push in each repo. The `package-lock`/`node_modules` regeneration (Arm A re-pin) is the orchestrator's install run; the agent edits `package.json` + verifies resolution.
- **The three arms are DISJOINT repos** — they may run in parallel (A ‖ B ‖ C); no two share a file. Arm A is the only one with a re-pin (so the only one whose build is born-RED at HEAD).
- **fourier does NOT re-pin this wave** — the minimal scope is the 8-class re-point (the surfaces paint at the current `^3.1.0`); a full `3.10.1` re-pin surfaces more breakage and is a named successor.
- **bbnf does NOT re-pin glass-ui** — its glass-ui `^3.0.0` resolves bare already (clean); the only edit is the keyframes hard-alias removal.

## §7 — Named successors (for anything deferred)

- **A header-ribbon/glass-panel substrate re-open** — if a SECOND repo (beyond keyframes' demo) wants a shared header-ribbon or glass-panel facility, the ≥2-consumer bar is met and a future glass-ui wave re-introduces the primitive properly (not as a backwards-compat alias). Recorded here; NOT forced by this single-demo-consumer wave.
- **fourier's full `3.10.1` re-pin** — fourier is badly pin-stale (`^3.1.0`); a full re-pin surfaces additional retired-class/retired-component breakage beyond the 8 phantom classes. Owed by fourier's own next re-pin wave (the named successor), NOT this minimal-scope class-re-point wave.
- **words/frontend's phantom-class debt** — the LESSONS-LEARNED:581 fleet named words (×4) alongside fourier; words is its own repo's migration (the consumer-staleness-tabs-5deferred cohort), NOT this wave.

## §8 — Cross-references

- FLEET-DIGEST findings **B4-5** (keyframes phantom-subpath, S1 OPEN-DEFECT, the headline), **B4-6** (fourier 8 phantom-class refs, S2), **B4-10** (the fourier patch DISAMBIGUATED — the pending work IS the 8 refs, not a staged code patch), **B1-proof-resolution-bbnf-fix** + **B2-SIBLING-RESOLUTION** (the bbnf hard alias), **B4-7** (the full pin-staleness census), **B4-4** (the ppmycota purple + the keyframes demo chassis — the W-MOTION-SUITE port source, not this wave).
- glass-ui `CLAUDE.md` invariant 30 (cross-repo dev-resolution contract-v2 — the no-hard-dist-alias rationale, §2.4) + the `.glass-{wash,quiet,resting,floating,overlay}` 5-rung ladder (`CLAUDE.md:157`).
- glass-ui `MIGRATION.md:5` + `CHANGELOG.md:17` (the retirement of `/header-ribbon` + `/glass-panel` at "0 production consumers" — the claim keyframes' demo violated).
- LESSONS-LEARNED invariant 32 (the phantom-class trap, recurring here as a phantom-SUBPATH) + LESSONS-LEARNED:581 (the 13-site phantom fleet).
- The MEMORY `glass-ui binding verification` note (stale consumer bindings silently no-op; only e2e/build catches them) — the structural reason arms A and B carry a captured runtime DELTA, not a grep-only close.
- AZ.md invariant 5 (no legacy code / no aliases — the reason the fix is consumer re-expression, never a library backwards-compat alias) + the band-X roster row (`AZ.md:125`).
