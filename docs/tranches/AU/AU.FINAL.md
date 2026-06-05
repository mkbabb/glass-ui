# Tranche AU — FINAL (close record)

AU is the execution of AT's authored-but-unrun mass — the dock-motion overhaul, the blob trio + the
`/color` leaf + the `useWebGLCanvas` substrate, the modern-CSS + encapsulation folds, the W9 supply,
and the polish-tier component splits — driven to **READY-TO-PUBLISH** for the 3.3.0 cut (the
publish hinge that fans the constellation out; `CONSTELLATION-MAP.md §1.2`). The publish itself is
**USER-DOMAIN** (§Publish protocol). This file is the close record cited by `proof:au-final`.

The per-wave evidence basis is `PROGRESS.md` (every W0..W10 row + its gate set + landing SHA) and the
git log; the gate fleet is `waves/AU-gate-fleet-augment.md`; the overfitting verdict is
`audit/W10-overfitting-audit.md`; the deferral record is `audit/proof-webgl-golden-DEFERRED.md`.

## §1 — Per-wave evidence (W0 → W10, incl. W8b)

Each row: the wave headline + its green gate set + the landing commit. Every wave landed its gate
manifest entry + ci.yml step in the SAME commit as the born-green fix (inv-27), so CI was green at
every wave boundary and `gates.mjs --verify-ci` never drifted.

| Wave | Headline | Green gate set | Landing SHA |
|---|---|---|---|
| **AU.W0** | formalize + re-ground (CHARTER → `tranches/AU/`; 3 dock SHAs ancestor-reachable; collision re-lettered; 71/71 dispositioned) | `proof:au-w0-reground` **green** | `fd895e4` |
| **AU.W1** | three design slices (blob · dock · color-gates); the W1c gate-fleet registry enumerates all 19 gates with greening waves | `proof:au-w1-design` **green** | `f504a69` |
| **AU.W2** | dock opacity-lockstep (the slides-F P0 — opacity rides `--dock-motion-resize`, the 100ms desync gone) | `proof:dock-opacity-lockstep` **green** (bite: revert → red) | `89b97ca` |
| **AU.W3** | the strict-templates KEYSTONE + the correctness fold (vueuse-free root, dead peer field, `supportsPostTask` wired, the 3 a11y sites) | `proof:strict-templates` + `proof:peer-optional` + `proof:vueuse-free-root` + `proof:supportsPostTask-wired` all **green**; 633 tests; verify-ci 23 | `5a820c0` |
| **AU.W4** | Fraunces ship (the full variable display face — resolves the dangling `--font-stack-display`; WONK/SOFT were silently inert) | `proof:font-axes` **green** (bite: hide the face → red); build/iter/typecheck green; verify-ci 24 | `048ea88` |
| **AU.W5** | the `/color` leaf (value.js-only: hoisted OKLCh primitives + `oklchToGammaRgb` + `defaultBlobColorResolver` + the `ColorResolver` seam) | `proof:color-acyclic` + `proof:single-color-core` both **green**; 633 tests; verify-ci 26 | `26afd9a` (+ `frostShader` delete `41ff172`) |
| **AU.W6** | gates **green** — the `useWebGLCanvas` substrate (generic context lifecycle + `webglcontextrestored` self-heal + demand rAF; aurora refactored onto it, −110 LOC; `frostShader.ts` DELETED) | `proof:webgl-substrate-single` + `proof:frostShader-deleted` green; `profile:aurora` capture-render passes; 636 tests; verify-ci 28 | `9a06009` (+ `41ff172`) |
| **AU.W7** | gates **green** — the blob trio headline: `/goo-blob` (WebGL2 metaball, OKLCh-linear shader-quality) + `/watercolor-dot` (CSS/SVG); the injected `ColorResolver` replacing the 1×1-canvas probe | `proof:blob-value-free` + `proof:no-value-default` + `proof:blob-space-gamma` + `proof:blob-color-equivalence` (8/8, ~2e-16) all green; 644 tests; verify-ci 32 (`proof:webgl-golden` DEFERRED — §2) | `24c4317` (lift) + `eb3d994` (quality) |
| **AU.W8** | gates **green** — the dock-motion overhaul (one atomic pass): single-frame FLIP sync + `--spring-dock` + the LIGHT `SpringProgress.play()` one-rAF driver + the reka-Tabs rail a11y | `proof:dock-motion-single-source` + `proof:dock-a11y-contract` (8/8) + `proof:dock-vocabulary` + `proof:dock-opacity-lockstep` + `proof:vueuse-free-root` all green; verify-ci 35; 3 bite-checks red-then-reverted | `6dd0d14` |
| **AU.W8b** | modern-CSS + encapsulation folds: the `@supports`/`@starting-style` native arms over the byte-unchanged FLIP fallback + the `dock-controls.css` carve + the 12-site idiom lift + `defineModel` ×8 | `proof:dock-css-split` + `proof:design-idiom-localization` (both bite-verified) **green**; the full no-regression matrix (typecheck · 673 tests · build · motion/css gates); verify-ci 37; §8 anchor BOOKed | `ba87718` + `0b69371` + `2a4a50f` + `56de4f9` |
| **AU.W9** | lean folds + slides-supply (4 lanes): Button `icon-sm` / Select `size` / Dialog `showClose` / `ConfiguratorLayer dividers` + `text-small` titles / `darkModeSyncScript()` / `useGlobalDark({initialValue})` | `proof:au-w9-consumers` born-**green** + bite-verified (drop a consumer → red line); 7 FOLD rows; manifest==ci; verify-ci 38; typecheck 0 | `204f540` + `ce44df3` + `65e857c` + `3a2cf98` + `1de6fd7` |
| **AU.W10** | close + the 3.3.0 changeset (+ the polish-tier component splits): the `ContinuousTimeline` 901-line split + the `useBouncySlider` extract + the aurora `constants/` lift | `proof:au-final` born-**green** (release-only) + the W10 overfitting audit (zero orphans) + `gates.mjs --run release` green; READY-TO-PUBLISH | `ebc0860` + `0a16cbd` (splits) + this close |

Three dock commits land DONE-AT-HEAD (re-verified on AU's own green CI): `e906448` (VT/FLIP
motion-parity), `f0b0ffb` (touch-gate B′), `8e4cb9f` (overflow + token refinements + doc-rot gate).

## §2 — The deferral register (BOOK — each with a named trigger)

The only DEFERRED gate is `proof:webgl-golden`; the remaining rows are BOOK'd folds the AU scope did
not admit, each carried forward with a named trigger (so no item is a silent punt — P-Inv 28).

| Item | Disposition | Named trigger to revisit | Record |
|---|---|---|---|
| `proof:webgl-golden` (blob pixel-golden) | **DEFERRED** (documented, NOT in the manifest) | a stable headless WebGL-live capture runner (a CI/local harness on which the live-rAF WebGL2 path renders deterministically green) | `audit/proof-webgl-golden-DEFERRED.md` — the 8-assert CPU-equivalence + the aurora capture-render already cover GPU correctness; the pixel golden adds only a redundant byte-comparison |
| `useCanvas2D` constellation lift | **BOOK** | the slides constellation gains a 2nd Canvas2D consumer (Canvas2D ≠ the WebGL substrate; single-consumer, slides-local) | `CONSTELLATION-MAP.md §3.3`; `AU-AUGMENT.md §4` |
| `text-box-trim` | **BOOK** | a real SFC consumer (0-consumer at HEAD; no SFC touch) | PROGRESS AU.W4 |
| anchor-positioning (dock popovers) | **BOOK** (§8 of the gate fleet) | reka `PopperContent` yields a per-content positioning seam (today floating-ui inline-transforms — native `anchor()` would double-position) | `audit/W8b-laneA-notes.md` |
| Card `surface="cartoon"` dark arm | **BOOK** | a 2nd repo with genuinely divergent dark cartoon offset/border values (the offset-stamp already rides `--shadow-color: var(--foreground)`, dark-flips automatically) | PROGRESS AU.W9 BOOK; `204f540` |
| `useCountup` / `vReveal` | **BOOK** | a 2nd real count-up/reveal consumer beyond slides `useDeckNav`/`SlideFooter` (a demo-only 2nd consumer is the overfitting class) | PROGRESS AU.W9 BOOK |
| Drawer `:native` / `GlassNativeDrawer` (#32) | **BOOK** (partially discharged by `Drawer mode="live-behind"`) | a 2nd real `GlassNativeDrawer` consumer beyond muster's live-behind | PROGRESS AU.W9 §11.2 |
| the role-typed `<Role>Dock` base component | **BOOK** | a 2nd consumer needing the role-typed base beyond the README vocabulary convention | AU.md §4 BOOK rollup |

## §3 — The §11 archaeology reversals (HEAD-verified; recorded so this FINAL does not re-mint)

1. **`:user-invalid` is KILL-as-shipped — NO W9 edit.** The AU-AUGMENT §6.2 "AU.W3 KILL'd → reinstate"
   premise is STALE. At HEAD the validity rung SHIPS (`src/styles/glass.css:256` — the
   `.input-pill:where(:user-invalid, .user-invalid-fallback)` recipe + `:user-valid` + the destructive
   focus-ring), and the `aria-invalid`↔`:user-invalid` JS bridge ships as
   `src/composables/dom/useUserInvalidAria.ts` (wired into `Input.vue`, exported on `/forms`+`/api`).
   The "reinstatement" the crosswalk describes is the slides DeckGate's own arm (F.W1, OUT per inv-16),
   not a glass-ui fold.
2. **Drawer `:native` (#32) is PARTIALLY DISCHARGED by `Drawer mode="live-behind"` → BOOK.** The
   live-behind detented bottom-sheet (AN.W3 drawer mode) already serves muster
   (`MobileInstrumentSheet.vue:54` + `App.vue:17`). The chronic `:native` ask is for a native
   `<dialog>`-backed drawer — a separate component, NOT the additive prop W9's lean-fold scope admits.
   Speedtest's native-drawer grep at HEAD = 0. BOOKed with its named trigger; not force-folded.

## §4 — Zero orphans

The W10 overfitting audit (`audit/W10-overfitting-audit.md`) runs the standing precept (every `src/`
artefact has ≥2 distinct sites OR is exported OR is a demo-private/test helper) over the 13 AU-landed
artefact groups (W5→W10): the `/color` leaf, the `useWebGLCanvas` substrate, the blob trio, the dock
motion driver + composables, the W8b utilities + `dock-controls.css`, the W9 supply, and the W10
component splits. Verdict: **ZERO orphans** — `library-orphan = 0`, `delete-unused = 0`. The
`proof:au-final` ZERO-ORPHANS clause cites this audit.

## §5 — The E-valuepeer sequencing line (the manifest precondition on the cut)

value.js sits on BOTH sides of the 3.3.0 cut (`CONSTELLATION-MAP.md §4`). At close, value.js is
**`0.10.0` on npm**, and the in-tree `@mkbabb/value.js` peer + devDep stay **`^0.10.0`** so installs
resolve TODAY. The downstream sequence publishes **value.js `0.11.0` FIRST**, then the peer bump
**`^0.10.0 → ^0.11.0` rides the 3.3.0 cut** (the `^0.10.0` range excludes 0.11.0; the bump is the
manifest line the user sequences at publish time). The runtime edge is already settled —
`proof:blob-color-equivalence` 8/8 (~2e-16) proves the blob-color contract bit-identical to value.js's
Ottosson CPU port — so E-valuepeer is a SemVer-range manifest knot, not a code change. This line is
carried in the 3.3.0 changeset.

## §6 — Publish protocol (USER-DOMAIN — confirm-first)

AU.W10 stages to READY-TO-PUBLISH; the publish is the single irreversible leg and is **USER-DOMAIN**
(`CONSTELLATION-MAP.md §2`). What is staged:

1. The full gate matrix green (`gates.mjs --verify-ci` 38; `gates.mjs --run release` green incl.
   `proof:au-final`).
2. The 3.3.0 changeset staged, NOT auto-published (`.changeset/au-dock-motion-overhaul.md`,
   `"@mkbabb/glass-ui": minor`); `package.json` version stays `3.2.0` (the changeset stages the bump).
3. The value.js peer-bump line carried (E-valuepeer, §5).

The user finalizes the cut:

```
changeset version          # bumps package.json 3.2.0 → 3.3.0 + writes CHANGELOG (USER-DOMAIN)
git push origin v3.3.0     # push the v-tag; release.sh asserts package.json.version == the tag
```

`release.yml` does the gated provenance publish on the `v*` tag (glass-ui CI is fully green for
gated provenance publish — push the tag, the workflow does the rest). The cut fans out the
constellation: keyframes D.W5, slides-F deploy, and value.js M.W7 each gate on
`npm view @mkbabb/glass-ui version ≥ 3.3.0` (edge E1) and circle back / heartbeat-poll until it clears
(`CONSTELLATION-MAP.md §2`).

---

**State: READY-TO-PUBLISH.** The 3.3.0 cut is staged; the publish is the user's call.
