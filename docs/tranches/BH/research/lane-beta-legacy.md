# Lane β — Legacy / Deprecated / Workaround / Fallback / Fall-through Inventory

Repo: `/Users/mkbabb/Programming/glass-ui` · branch `tranche/BG` · for the **BH** cleanup tranche.
Read-only research. Scope: `src/`, `scripts/`, `demo/`, `vite*.ts`, `package.json`.

## HEADLINE

The codebase is **mature and disciplined** on legacy excision. Clean-break / RETIRED /
DEFINITION-ABSENT claims **spot-verify TRUE** (no surviving aliases). The 565 `fallback` +
132 `shim` hits are **overwhelmingly BEFITTING** (WebGL/WebGPU substrate fallbacks,
`@supports` progressive enhancement, PRM carve, SSR no-rAF) or **false positives**
(`shimmer`, `catch-light`, gate-detector strings). Every silent-swallow `try/catch` in
`src/` already carries an explicit `// fail-explicit: befitting` rationale OR re-throws richly.

The genuinely **ILLEGITIMATE** legacy items are **few but real**, and concentrate in two
buckets: (1) a **version straddle** that contradicts the canon's own retirement claim, and
(2) **CONSUME-cadence interim dual-paths** awaiting upstream republish. Plus one
**BH-structural blast radius**: ~18 `proof:*` gates `readFileSync` CLAUDE.md and break on
its planned deletion.

---

## TIER 1 — ILLEGITIMATE: EXCISE / FAIL-EXPLICIT (the core legacy arm)

### β1. value.js version straddle `^0.13.0 || ^1.0.0` — doc-claims-retired-but-code-still-has-it
- **`package.json:1058`** (peerDependencies) — `"@mkbabb/value.js": "^0.13.0 || ^1.0.0"`
- **`package.json:1096`** (devDependencies) — `"@mkbabb/value.js": "^0.13.0 || ^1.0.0"`
- **MISMATCH**: CLAUDE.md §Dependencies states verbatim *"value.js's DECIDED 1.0.0
  stabilization cut has landed … the `^0.13.0` leg retired, no legacy straddle; the
  broken-singleton is an enforced IDENTITY against keyframes' value dep
  (`proof:peer-conformance` clause 1)."* The straddle **is still in the manifest** — the
  prose lies. This is the canonical "X || Y straddle" + "doc-claims-retired-but-code-still-has-it"
  double-hit.
- **9 consumer import sites** (all type/fn imports that resolve under either leg):
  `useGlassBackdropLuminance.ts:49`, `motion/curves.ts:26,246`, `color/index.ts:29`,
  `aurora/presets.ts:26`, `color/useAccentTone.ts:22`, `aurora/color.ts:26`,
  `easing/useEasingPicker.ts:24`, `border-progress/spectrum-walk.ts:22`.
- **VERDICT: EXCISE** → collapse both legs to `^1.0.0` (or whatever the 5.0.0 keyframes-5.x
  spine pins; keyframes 5.x deps value `^1.2.0`/`^1.0.0` per CLAUDE.md, so the `^0.13.0` leg
  is dead). The 5.0.0 major bump is the lever. Re-run `proof:peer-conformance` /
  `proof:constellation-spine` after — they may currently be GREEN-vacuous against the straddle.

### β2. CONSUME-cadence interim dual-paths (consume-and-delete pending upstream republish)
These are documented "interim wires the PUBLISHED surface, book the richer upstream helper"
paths. Legitimate as transitional, but each is a **dual code path** that the user's
no-workaround/no-dual-path directive says must collapse once upstream lands. BH's cross-repo
by-name-ask channel is the disposition vehicle.

- **`src/components/custom/border-progress/composables/useBorderSpectrum.ts:44`** —
  `function interimStops()` is the **SYNCHRONOUS interim** (raw evenly-spaced gradient stops)
  beside the async `import("./spectrum-walk")` OKLCH/shorter-hue UPGRADE. Tied to the
  `// CONSUME(value.js 0.13.0 oklchSpectrum):` marker (`border-progress/index.ts:9`,
  `spectrum-walk.ts:19`, `README.md:37`). When value.js publishes the named `oklchSpectrum`
  helper, the **hand-rolled walk + the interimStops dual-path retire together**.
  - **VERDICT: MIGRATE** (consume-and-delete; re-issue the by-name ask in BH's migration map).
    NB: the sync-interim-then-async-upgrade shape itself is befitting progressive enhancement
    (`spectrumStops` must stay synchronous — SFC `computed` cannot await); the *legacy* part is
    only the value.js-0.13 fallback leg, which dies with β1.
- **`src/composables/motion/useDragMorph.ts:20,281,290,325,366`** — "THE SNAP-RESOLUTION
  INTERIM": kf source `Draggable` carries a `snap` option the **published dist `DragOptions`
  does not yet expose**, so glass-ui hand-projects `decayRest` + `spring.target`.
  `CONSUME(kf snap)` marker at line 281: *"when keyframes.js republishes past 4.3.0"*.
  - **NOTE**: CLAUDE.md now pins keyframes `^5.0.0` (BD adopt) — the "past 4.3.0" condition is
    **already met or stale**; verify whether the published kf 5.x `DragOptions.snap` exists. If
    so this interim is **EXCISE-NOW** (the wait is over). If not, MIGRATE via by-name ask.
- **`src/composables/glass/useVizChoreography.ts:78`** — "the interim idle loop …
  republish-gated by-name cross-repo ask, NO peer-spine widen." Same class.
  - **VERDICT: MIGRATE** (track in migration map; collapse when the gate lands).

### β3. Genuinely silent legacy-ignore (demo, minor)
- **`demo/configurator/preset-editor/persistence.ts:81`** — *"a legacy-persisted `dark` key is
  silently ignored (clean break, no migration shim)"*. This is a SILENT swallow of a legacy
  persisted field. Befitting-ish (demo-private localStorage migration, documented, no shim by
  design), but it is the one literal "silently ignored legacy key" in the tree.
  - **VERDICT: KEEP** (demo-private, documented clean-break; not a contract path). Flag only.

---

## TIER 2 — BH-STRUCTURAL: the CLAUDE.md-parsing gate blast radius (framing decision 1)

CLAUDE.md is being DELETED. **26 `proof:*` gates reference it; ~18 `readFileSync` it from
disk and assert on its content** — all break (ENOENT) on deletion unless re-homed onto the new
modular doc set. Plus 13 historical `wf-*.js` orchestration files mention it (those are
tranche-execution scripts, not live gates — archive with their tranches).

**Gates that READ CLAUDE.md from disk (must re-home or retire):**
`proof-accent-tone`, `proof-claude-structure-sync`, `proof-close-battery-parity`,
`proof-crossrepo-asks`, `proof-doc-consistency`, `proof-doc-override-idiom`,
`proof-dock-rail-realize`, `proof-dock-unify`, `proof-dropdown-fix`, `proof-easing-primitive`,
`proof-expandable-part`, `proof-handmark`, `proof-on-glass-fg`, `proof-page-chassis`(*ref),
`proof-phase-palette`, `proof-readme-meta-clean`, `proof-spa-view`, `proof-split-chars`,
`proof-surface-axis`.

- **`proof-claude-structure-sync.mjs`** — asserts the §Structure `custom/` enumeration ≡
  `ls src/components/custom/`. On CLAUDE.md deletion: **RETIRE** (the enumeration moves to a
  generated index or per-dir READMEs; sync target gone).
- **`proof-doc-override-idiom.mjs`** — asserts the §Consumer-wiring `--glass-blur-*-radius`
  override example matches the live `glass.css` value. **RE-HOME** onto the consumer-wiring doc
  (a `docs/canon/consumer-wiring.md` or the relevant component README).
- The component-bound gates (`proof-handmark`, `proof-surface-axis`, `proof-phase-palette`,
  `proof-dock-unify`, `proof-easing-primitive`, `proof-spa-view`, `proof-expandable-part`,
  `proof-split-chars`, `proof-on-glass-fg`, `proof-dropdown-fix`, `proof-accent-tone`,
  `proof-dock-rail-realize`) read CLAUDE.md sections as the canon-source. **RE-HOME** onto the
  per-component README that BH redistributes the contract into.
- **VERDICT: each gate → RETIRE or RE-HOME** as a band of the BH gate-consolidation arm; this
  is the load-bearing dependency of framing-decision-1's redistribution. (Detail belongs to the
  Lane that owns gate-consolidation; flagged here because it is the largest legacy-coupling in
  the tree.)

---

## TIER 3 — BEFITTING (KEEP — do NOT excise; the user's framing explicitly sanctions these)

### Substrate fallbacks (WebGL2 ⇠ WebGPU; CSS/2D ⇠ WebGL) — KEEP
- **`src/composables/glass/webgpu/webgpuDevice.ts:55,86`**, `useWebGPUCanvas.ts`,
  `useGpuSubstrate.ts:311,332` — `try/catch` falls WebGPU→WebGL2 ("exactly the silent
  W-AURORA-SWRASTER class it must not be" — they fix it, not commit it). The `onInitError`
  contract is preserved for genuine violations; the fall is a recognized substrate decision.
- **`renderMode.ts` `forceWebGLUnderSoftwareRaster`** (default `false`) — the software-raster
  guard forces `css` under SwiftShader/llvmpipe; the single named escape opts in. This is
  fail-safe-by-default + explicit-escape — the **model** of a befitting feature-detect, NOT a
  silent degrade. `auroraFallbackGround.ts` is the luminance-faithful CSS ground (certify-band
  bounded). KEEP.
- **`useWebGLCanvas.ts:69,95`** (`getGLRenderer`/`canvasCanHostWebGL2`) — capability probes
  whose boolean/null return **IS** the surfaced verdict (documented). KEEP.

### Feature-detect progressive enhancement — KEEP (78 CSS `@supports` + 28 JS `supports*()`)
- **`supportsCssTimeline.ts`** — explicitly rejects always-true happy-dom/SSR shims by probing a
  garbage value. Correct.
- **The `DUAL-PATH single-writer` family** (`scroll-driven.css:16`, `FadingScroll.vue:10`,
  `useScrollProgress`, `property-regs.css:531`, `base.css:34`) — native `scroll()`/`view()`
  timeline + JS fallback, **feature-detect-gated so the two NEVER both write**. This is
  textbook befitting; the "dual-path" name is a *single-writer* discipline, not a legacy dual.
  KEEP. (Distinguish from β2's CONSUME dual-paths, which are upstream-wait interims.)

### Silent `try/catch` that are all documented fail-explicit — KEEP
- `sortable/touchGate.ts:46`, `useDockItemDrag.ts:179` — `setPointerCapture` befitting-optional
  (window listeners are the real path; failure surfaced via return).
- `useGlassBackdropLuminance.ts:385` — tainted-canvas `getImageData` → null surfaces the miss;
  falls to declarative bucket (never a silent wrong answer).
- `configurator/useConfiguratorState.ts:104` — `structuredClone` failure **RE-THROWS a rich
  actionable error** (exemplary fail-explicit).
- `darkModeSyncScript.ts:66` — the EMITTED inline `<head>` FOUC script's `catch(_){}` is
  befitting (must not throw in `<head>`; documented).
- `useDeckSpring.ts:62`, `useViewTransition.ts:167`, `useWebGPUCanvas.ts:195,502` —
  `.catch(()=>{})` on lazy-import / VT-ready promises (cosmetic-async, non-contract). KEEP.

### PRM carve / SSR no-rAF — KEEP (befitting per user framing)
- The 16 `graceful` + the PRM brackets across `animations.css`, `a11y-overrides.css`, the
  substrate live-PRM freeze. KEEP wholesale.

---

## VERIFIED-CLEAN (clean-break claims that spot-verify TRUE — no surviving alias)

| Claimed retired | Disk state |
|---|---|
| `useLiquidRail.ts` / `liquid-rail.css` DEFINITION-ABSENT | **absent** (no file) ✓ |
| vaul-vue ABROGATED | only comments in `drawer.css`/`drawer/*.vue`; **no `vaul` dep, no import** ✓ |
| `popover-animate` / `slide-in-from-side` DELETED | only retirement comments; **`@utility` bodies gone** ✓ |
| `GlassUnderline` / `/underline` subpath RETIRED | only api/handmark/README notes; **no export, no subpath** ✓ |
| `--card-spacing` GONE | only a "CLEAN BREAK … GONE, no alias" comment ✓ |
| `--mask-fade-width` retired | only offsets.css/README note ✓ |
| `--panel-padding-roomy` deleted orphan | only deletion note ✓ |

These need **no action** — the clean-break discipline held. (Their *comments* are wave-note
cruft that BH can prune when redistributing contracts, but no code legacy survives.)

---

## KEYWORD CENSUS (src/ raw counts — context for triage)

`fallback` 565 (≈99% befitting substrate/PRM/@supports) · `shim` 132 (≈95% "shimmer"/
"catch-light" false-positive; 2 genuine SSR-shim-rejection probes) · `clean break` 72 ·
`legacy` 66 (mostly retirement comments) · `no alias` 57 · `interim` 28 (β2 + consumer-side
root-fix notes) · `graceful` 16 · `backwards` 8 · `fall-through` 8 · `workaround` 8 (all
referring to RETIRED consumer workarounds the lib now root-fixes) · `back-compat` 22 ·
`polyfill` 4 · `HACK` 2 (substring of words) · `for now` 1 (`profileFor now serves` — false
positive) · **`TODO`/`FIXME`/`XXX`/`@deprecated`/`deprecated` in src = 0** (all hits live in
`scripts/proof-*` as gate *detectors* looking FOR these tokens).

---

## PRIORITIZED LEDGER

| # | Item | Path:Line | Verdict | BH band |
|---|---|---|---|---|
| 1 | value.js `^0.13.0 \|\| ^1.0.0` straddle (doc says retired) | package.json:1058,1096 | **EXCISE** → `^1.0.0` | deps / 5.0.0 reshape (concurrent-safe, no src edit) |
| 2 | useDragMorph snap-resolution interim (kf "past 4.3.0" likely already met @ kf 5.x) | useDragMorph.ts:20,281… | **EXCISE-NOW or MIGRATE** (verify kf 5.x `DragOptions.snap`) | motion / cross-repo ask |
| 3 | border-progress hand-rolled spectrum walk + value.js-0.13 leg | useBorderSpectrum.ts:44, spectrum-walk.ts | **MIGRATE** (consume-and-delete w/ #1) | color / cross-repo ask |
| 4 | useVizChoreography interim idle loop | useVizChoreography.ts:78 | **MIGRATE** (republish-gated) | viz / cross-repo ask |
| 5 | ~18 proof gates `readFileSync` CLAUDE.md | scripts/proof-*.mjs | **RETIRE or RE-HOME** | gate-consolidation (framing dec.1) |
| 6 | demo legacy `dark` key silent-ignore | persistence.ts:81 | **KEEP** (demo-private, documented) | — |
| 7 | substrate fallbacks / @supports / PRM / fail-explicit catches | (Tier 3) | **KEEP** (befitting) | — |

## OPEN QUESTIONS FOR BH PLANNING
- Does published keyframes 5.x expose `DragOptions.snap`? If yes, #2 is EXCISE-NOW not a
  pending ask. (Check `node_modules/@mkbabb/keyframes.js` dist types — out of read scope here.)
- Does the 5.0.0 spine pin value.js `^1.0.0` or `^1.2.0`? keyframes 5.x transitively wants
  `^1.2.0` per CLAUDE.md — the straddle should collapse to match that floor, not bare `^1.0.0`.
- `proof:peer-conformance` clause 1 claims to ENFORCE the broken-singleton identity against the
  straddle — is it currently GREEN-vacuous? Needs a re-run on the de-straddled manifest.
