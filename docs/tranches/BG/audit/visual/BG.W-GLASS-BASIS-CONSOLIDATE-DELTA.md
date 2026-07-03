# BG.W-GLASS-BASIS-CONSOLIDATE (F2.2) — dual-engine PAINT verdict: **PASS**

**Wave:** F2.2 · BG.W-GLASS-BASIS-CONSOLIDATE — the elegance transposition, zero-pixel.
**Src SHA:** `d437cf52` (orchestrator-recovered). **Judged:** 2026-07-03, non-authoring paint judge.
**Method:** the C18 `?capture=` harness over BUILT bytes (`demo:dist:build` → `vite preview :5201`),
dual-engine — Chrome (real Chrome.app + CDP, ANGLE Metal / Apple M5 Max) + Safari (off-screen
WKWebView, system WebKit.framework / Apple GPU). In-pixel `#ff00ff` badge = the sole provenance.

## Verdict

**PASS.** The wave is a genuine zero-pixel elegance transposition; the paint is correct across all
5 glass-band routes × 2 engines × 2 modes (20 captures, all resolving on disk at 2880×1800, real GPU
on both legs). The darken/lift reads byte-consistent across engines and modes — no pixel drift finding.

### Why zero-pixel is provable here
The wave's diff in the three touched CSS files is **comment-only** (`git show d437cf52 --
src/styles/{glass/surfaces.css,tokens/dark-arm.css,tokens/light-dark.css}`): every added line is the
idiom-reversal DOCUMENTATION; the actual CSS **values are byte-unchanged**. The load-bearing
deliverable is (a) the recorded idiom (colors → `light-dark()` canonical; shadows/insets → `.dark {}`
plain arms, never `light-dark()` — the MEMORY inset-shadow trap) and (b) the new `proof:glass`
`dark-arm-color-reversal` arm that machine-locks it. So the composited output cannot have drifted from
the parent, and the captures confirm it.

### Device-free gate arm (this wave) — GREEN
`proof:glass` arm `dark-arm-color-reversal (BG.W-GLASS-BASIS-CONSOLIDATE · R16 MN-1)`:
- **DA1 lockstep**: 60 dual-arm color witnesses, **0 divergence** — every `.dark {}` fallback-floor
  color byte-agrees with its `light-dark()` dark arg (the zero-pixel single-source guarantee).
- **DA2 no-color-inset**: 0 shadow-valued `light-dark()` — the inset-shadow-trap fence holds.
- **DA3 canon**: recorded in BOTH `light-dark.css` + `dark-arm.css`.
- **DA4 shadows→.dark**: `surfaces.css .dark … { box-shadow: … }` arm survives (the positive example).
- self-test bites: all teeth ✓.

## The capture evidence (resolves on disk — the anti-evasion floor)

All under `docs/tranches/BG/audit/visual/BG.W-GLASS-BASIS-CONSOLIDATE-paint/`
(`gbc-<route>-<engine>-<mode>.png`, 20 files, each 2880×1800):

| Route | Chrome light | Chrome dark | Safari light | Safari dark |
|---|---|---|---|---|
| `/foundations/paper-glass` | ✓ | ✓ | ✓ | ✓ |
| `/substrates/glass-material` | ✓ | ✓ | ✓ | ✓ |
| `/substrates/glass-panel` | ✓ | ✓ | ✓ | ✓ |
| `/containers/dialog` | ✓ | ✓ | ✓ | ✓ |
| `/dock/overview` | ✓ | ✓ | ✓ | ✓ |

- **Provenance:** Chrome badge → `ENGINE CHROME / GPU ANGLE Metal Renderer: Apple M5 Max` (NOT
  SwiftShader). Safari badge → `ENGINE WEBKIT / GPU Apple GPU`. All `MODE`/`VIEW` badges decode correct.
- **Real content, not blank:** every capture shows its route heading + nav rail + glass surfaces
  (`chrome-results.json`: `mainChildren:3`, correct `<h1>` per route, `data-capture-ready` all true).

### Per-route paint read
- **paper-glass** — the 4-tier ladder (wash→quiet→resting→floating) frosts the paper-grain backdrop
  with progressive opacity; light = warm-cream, dark = warm-brown transmissive. Tier darken correct.
- **glass-material** — the 5-rung ladder (wash→overlay) reads as frosted glass over the recessive
  warm aurora (no conic / no oversaturation); dark = luminous warm-brown (not a dead charcoal slab),
  ink warm-cream. Specular/rim reads. Both engines paint the blur.
- **glass-panel** — rimless 5-rung ladder (0.30α→0.95α) over a LIVE aurora; each rung visibly more
  present than the last; consistent light/dark.
- **dialog** — overlay-band glass buttons + the "Delete workspace" card; the dark card **lifts off the
  page with a visible rim/shadow** (the `.dark {} box-shadow` arm paints — DA4's inset-trap fence
  confirmed in paint, no flattening).
- **dock/overview** — dock glass plates (collapsible / media-transport / nav) darken/lift over the live
  aurora, the field transmitting through the plates. Both modes.

### Programmatic corroboration (all 20)
`pixel-analysis`: all non-blank (content-band sd 12–59), and **light mean > dark mean in every one of
the 10 route/engine pairs** (correct mode split), with Chrome/Safari means close per cell (cross-engine
darken/lift consistent — e.g. glass-material light 189.3/203.5, dark 104.0/81.4).

### Safari backdrop-filter blur — PAINTS (webkit prefix functional)
The 5-route Safari captures show frosted glass on every rung; the built dist carries the
`-webkit-backdrop-filter` pairs (`dist/glass-ui.css` ×9, `dist/styles/drawer.css` ×10, …), including
the exact `safari-blur-var` subject: `dist/styles/animations.css:385`
`-webkit-backdrop-filter: blur(var(--top-layer-backdrop-blur, 8px));` paired with the plain decl at :387.

## NOTED — out-of-scope, does NOT block this wave (cross-tranche gate-path staleness)

`proof:glass` **overall** status is currently FAIL, but the failing arm is `safari-blur-var`
(**BG.W-GLASS-REGISTER-UNIFY** — a DIFFERENT, already-DONE wave), NOT F2.2's arm. Root cause: the HEAD
commit `520a6ab6` (**BH.B5a-deps-currency**) split the 566-line `vite.style-assets.ts` into 3 sub-plugins,
relocating `bdfDeclRe` + `injectWebkitBackdrop` into **`vite.style-fold.ts`**, while the gate hardcodes
`VITE_STYLE_ASSETS = "vite.style-assets.ts"` and greps it for `const bdfDeclRe = …` (finds nothing).
The webkit-backdrop pass **still functions** (proven above — dist carries the pairs, the moved matcher
is the correct nested-paren-balanced form, the live Safari captures paint the blur). This is a one-line
gate-path re-point (`vite.style-fold.ts`, or scan both), owned by W-GLASS-REGISTER-UNIFY / the BH.B5a
reconciliation — a source-side gate concern, **NOT a paint defect and NOT F2.2's arm**. It does not
change the F2.2 zero-pixel paint verdict.

## Reproduce
```
npm run demo:dist:build && npm run demo:dist:serve            # vite preview (:5200/:5201)
clang -framework Cocoa -framework WebKit -fobjc-arc docs/tranches/BG/audit/wkshot-live.m \
  -o docs/tranches/BG/audit/visual/BG.W-GLASS-BASIS-CONSOLIDATE-paint/wkshot-live
# Chrome leg: launch Chrome.app --remote-debugging-port=9477 then
CDP_URL=http://localhost:9477 BASE=http://localhost:5201 node \
  docs/tranches/BG/audit/visual/BG.W-GLASS-BASIS-CONSOLIDATE-paint/chrome-capture.mjs
# Safari leg: <paint>/wkshot-live "http://localhost:5201/?capture=<route>&mode=<m>" out.png <m> 15000
```
