# D3 · the glass material battery (harness), H2

| field | value |
|---|---|
| seat | D3 pass 2, H2. Lands the harness revision of `REGISTRY.md` §3.3 (H-1..H-15) in place over the pass-1 battery |
| model | `claude-opus-5-5`, asserted from own system identity |
| engines | Chromium 149 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, WebGPU adapter present) and Playwright WebKit 26.5, both headless, Playwright imported from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| records | the self-test result per check and engine, and the HEAD baseline per witness, engine and theme: `../pass-2/H2.md` (the one source of record for those numbers; this file describes the instrument) |

## 1 · What is here

| file | role |
|---|---|
| `lib.mjs` | Paths, engines, the scene table (`SCENE_GROUNDS`), the H2 contracts (`BOUND_PROP`, `FLAT_ATTR`, `WEBKIT_SHIM`), OKLab/OKLCh and WCAG maths, the sRGB gamut chroma, PNG reads, the painted-pixel metrics (`composite`, `glyphRing` = `glyphCoverage` + `ringRead`, `edgeContrast`, `calm`, `paintedAlpha`), the static server (SPA fallback for the demo), the reporter, `--cells` |
| `specimens.mjs` | The specimen app: a Vue page that imports the **real** library through `@glass` from any worktree's `src`, lays out every scene, and stamps the DOM contract |
| `build.mjs` | `node build.mjs <worktree> [--label x] [--demo]`: the specimen app into `$D3_OUT/builds/<label>/dist`; `--demo` also the worktree's demo into `…/demo` (the story half of the owner glance). Nothing is written into the worktree's `src` |
| `capture.mjs` | Renders a build or fixture in every cell, the live windows, the motion windows and the unshimmed-WebKit probe. The only script that drives a browser for the battery |
| `rows.mjs` | Shared row generators: required cells (`need`), ink rows at R 1 and R 3, indicator rows, the behavioural signal leg (`signalLeg`) |
| `raw-clean.mjs` | RAW (H-1): the raw capture shows the bare ground under every surface |
| `m1-…` … `m9-…`, `m2-motion.mjs` | M-1..M-9 and M-2m, one script each |
| `wa-…` … `wg-…` | W-A (A′), W-B..W-F (banked or retired families, unchanged), W-G (D3-G) |
| `t-transmission.mjs` | T (H-12): T = 1 − α and T_c1 per rung; reported, not gated |
| `glance.mjs` | The owner-glance pair (H-13): base against route, dock, Dialog, floating and the glass-material story, both themes |
| `run.mjs` | `node run.mjs <worktree> [--label x] [--demo]`: build, capture everything, run every check. Logs in `<capdir>/results/<id>.log` |
| `baseline.mjs` | `node baseline.mjs <capdir> [--out f.json] [--only ids]`: every check once per gate engine × theme (`--gate <engine> --cells '^<engine> <theme> '`), printed as one Markdown table. Results go to a mirror `<capdir>-baseline/`, so the run's own `results/` stay as `run.mjs` wrote them. It is how `../pass-2/H2.md` §3 was made, and how a route's run is laid beside it |
| `fixtures.mjs` | Hand-made pages that honour the same contract: `green` (the M battery), `A`, `B`, `C`, `E`, `F`, `G`, each laying out every H2 scene |
| `selftest.mjs` | Every check PASS on its fixture and FAIL on a planted violation, gated once per engine |
| `v700-veil.css` | The pass-1 7.0.0 veil overlay, usable as `glance.mjs --overlay` |

**Running it.**

```sh
git worktree add --detach <scratch>/wt <rev>
ln -s <checkout>/node_modules <scratch>/wt/node_modules
export D3_OUT=<scratch>/out
H=docs/tranches/BL/design/material/harness
node $H/run.mjs <scratch>/wt --label <route> --demo                 # 19 min 49 s at load 10-16 (H2's HEAD run)
node $H/baseline.mjs $D3_OUT/caps/<route> --out <file.json>          # the per-engine, per-theme table; about 2 min, no browser
node $H/m2-text-contrast.mjs $D3_OUT/caps/<route> [--gate chromium|webkit] [--verbose] [--cells <regex>]
node $H/glance.mjs --base $D3_OUT/builds/head/dist --route $D3_OUT/builds/<route>/dist --out <dir> --name <route> \
    --story-base $D3_OUT/builds/head/demo --story-route $D3_OUT/builds/<route>/demo [--engine webkit]
node $H/selftest.mjs --fields $D3_OUT/caps/head [--only M-2,W-G]    # 1 h 5 min at load 7-70 (100 expectations)
```

Every check exits 0 on PASS and 1 on FAIL; its last line is the verdict and the lines above it are the measured rows. `--gate` names the gate engines (default Chromium); rows of any other captured engine print as information. `--cells <regex>` restricts a check to the cells whose `engine theme ground scene` matches; only the self-test's planted captures use it.

## 2 · The instrument

### 2.1 · Scenes and cells

A cell is engine × theme × ground × scene. Grounds: paper, the default `<Aurora>` at `opacity-ceiling` 1 (`aurora`, c1) and 0.5 (`aurora50`), black, white, a 16 px checker, 24 px violet/yellow stripes, and (W-G) UIA-V-198's red `#761617`. Each scene is captured only on the grounds `lib.mjs SCENE_GROUNDS` lists for it:

| scene | grounds | contents |
|---|---|---|
| `ladder` | the seven + red | the eight plates (wash, quiet, resting, card, floating, overlay, the dialog rung, the opaque escape), each with fg and muted text and two real `Input` wells; a live `GlassDock` (active tab = fg run, inactive tab = `muted-tab`, label = muted); an open `Popover` |
| `dialog` | the seven | the real `Dialog` (title, description, caption, a well, Close), scrim included |
| `halo` | paper | `.glass-capsule` 2 px inside wash, quiet, resting, card, and a reference on the open page |
| `empty` | c1, c0.5 | the field with nothing mounted (W-F) |
| `held` (H-5) | black, white, c1 | `wash-held` and `floating-held`: plates carrying the consumer grasp contract (`[data-held]` + a `.glass-grasp-carrier[data-grasp=grasp]` child, `glass/grasp.css`); `dock-held`: a dock held by a real press-and-hold on a `Slider` inside it (the only library path that takes the dock's grasp, `useDockHold`); `dock-collapsed`: `:collapse="true"`, its `#collapsed` summary a single fg glyph run |
| `hostile` (H-10) | c1, c0.5 | the ladder, plus an opaque band (light `#0b1020`, dark `#f4f1ea`) under the first plate row (y 36-88) and under the dock's text row (y 474-522), and a declared region (`.hx-declared[data-hx-declared]`, black in light, white in dark) under the teleported Popover. The band and region are ground: `raw` keeps them |
| `state` (H-6) | paper, c1 | a resting plate with a checked `Checkbox` and a `SegmentedTabs` (selected indicator); a dock with its active tab and a hovered inactive tab; an engaged `.glass-focus-veil` centred on an empty page region |
| `isolated` (H-15) | c1, red | the ladder's plates and dock inside `isolation: isolate` |

Each cell is a fresh context at 1280×900, DPR 1, `reducedMotion: reduce` (the aurora parks after one frame). Captures: `full`, `noink`, `maskA`/`maskB` (glyph coverage), `raw`, one clip per focused `[data-ring]`, and `on`/`off` for halo. The pointer rests on `[data-press]` (pressed and held through every capture; the cell records whether the held register was still engaged after them), else on `[data-hover]`, else in the far corner.

### 2.2 · The DOM contract (fixtures honour it)

`[data-spec]` a surface (`data-band` content, chrome, escape) · `[data-ink]` a text run (an id containing `muted` is the muted register) · `[data-edge]` a border perimeter · `[data-ring]` a focusable ring · `[data-sample]` an empty surface region · `[data-bare]` an empty page region · `[data-raw-hide]` hidden in `raw` besides surfaces (the scrim, the focus veil) · `[data-fill]` a state fill (active, hover, checked, selected) · `[data-veil-probe]` a region under an engaged focus veil · `[data-hover]`, `[data-press]` the pointer's rest · `[data-hx-band]`, `[data-hx-declared]` the H-10 grounds · `window.__harness.setCeiling(v)` steps the field.

Two contracts a route implements, read from the cascade and the DOM:
- **`--glass-bound`** (`BOUND_PROP`, H-4): the floor patch (FL-5) exposes each band's computed any-input bound as a number on every plate. W-A reads it; its absence is a FAIL row.
- **`data-glass-flat`** (`FLAT_ATTR`, H-15): a plate that knows its luminosity pole went flat carries it, on itself or an ancestor. W-G reads it.

### 2.3 · The live and motion windows

- **Live windows** (`--live`; both engines, WebKit `+shim`; c1 and c0.5; both themes; one default dock; the pass-1 fed window is retired, H-3). After a 1.5 s settle the tallies reset; over 9 s the page counts main-thread readbacks (`getImageData`, WebGL `readPixels`, `toDataURL`, by wrapping the prototypes) and **custom-property writes per animation frame, by name, from any source**: `CSSStyleDeclaration`/`CSSStyleProperties.setProperty`, Typed-OM `StylePropertyMap.set`, a `style`-attribute rewrite (a MutationObserver that compares each `--` declaration's value), a `<style>` text rewrite, `CSSStyleSheet.insertRule`/`replace`/`replaceSync`. The ceiling step for W-B follows.
- **Motion windows** (`--motion`, H-11; both engines; the ladder over c1 and c0.5; both themes; motion on). Whole frames are saved: 12 `motion` frames spread over 3 s of the moving field, then `step` frames from 200 ms before a ceiling step (1 → 0.5, 0.5 → 1) to 1.5 s after. Chromium frames are the compositor's own (CDP `Page.startScreencast`, PNG, every frame; 138-168 step frames per window at load 10-16); Playwright WebKit frames are a `page.screenshot` loop (about 10-14 per second), which opens 200 ms before the step as Chromium's window does.
- **The unshimmed probe** (`--probe-unshimmed`): each theme loads the ladder in Playwright WebKit without the shim and records whether the page crashes, so the shim never hides the crash.

No canvas context is ever requested; the live WebGPU field is observed only by screenshot.

### 2.4 · Metrics (pixels only, except the two contracts above)

- **Composite**: mean sRGB of a surface's `[data-sample]` in `full`.
- **Glyph ring** (H-8): coverage from `maskA − maskB`; ink = median `full` colour of the glyph cores (coverage ≥ 0.9·max); ring = pixels within Chebyshev R of the glyph with coverage < 0.25, read in `noink`; WCAG ratio per ring pixel, p05. Read at **R 1 and R 3**; M-2 gates both, other witnesses read R 1.
- **Frame-locked ring** (H-11): the same, with ink and ring read from one motion frame, coverage from the frozen cell's masks, and ring pixels restricted to coverage ≤ 0.02 so no antialiased ink fringe enters.
- **Indicator**, **chrome calm**, **painted α** (α = 1 − mean(C_white − C_black)/255, pole = C_black/α): as pass 1.
- **State fill** (M-9): mean `noink` colour inside the fill (inset 25% per side, text and icons removed) against the ring 3-6 px outside it, inside its surface, outside other fills.
- **T_c1** (T): the least-squares slope of (composite − pole) on (raw field − pole) over the sample mean colour on c1.
- **Hue through** (W-G): OKLCh of the mean composite against the mean raw ground under the same sample; the gamut's largest chroma at the composite's L and hue by bisection on OKLCh → linear sRGB.

### 2.5 · Engines

- **Chromium** is the gate engine.
- **Playwright WebKit** paints no `backdrop-filter`, exposes no `navigator.gpu` (the aurora runs its GL arm), and crashes on any page that mounts `GlassDock`. **H-14**: every WebKit context now carries D2's crash shim (`WEBKIT_SHIM`, from `dock/harness/adapter-head.mjs:45`: the plate border's nested translucent `color-mix()` pinned to one arm, colours only), so WebKit dock rows exist and print `webkit+shim`. The unshimmed probe records the crash beside them. `--gate webkit` gates on WebKit.
- **Real Safari** prints UNMEASURED (owner's safaridriver checkbox) in every check.

## 3 · The checks

| id | reads | PASS when | H2 row |
|---|---|---|---|
| RAW | ladder, dialog over black, white | raw under every surface rect (inset 2 px) within 3/255 of the bare ground on ≥ 99.9% of pixels | H-1 (`raw` hides `[data-spec], [data-spec] *`) |
| M-1 | light paper ladder, dialog | L ≥ L_paper − 0.01, ΔE_OK ≤ 0.02 | — |
| M-2 | ladder, dialog × 7 grounds; held × black, white, c1; hostile × c1, c0.5 | every ink p05 ≥ 4.5 at R 1 **and** R 3; a held surface whose register is not engaged is a FAIL row | H-5, H-8, H-10 |
| M-2m | motion windows | every ink p05 ≥ 4.5 in every motion frame and every step frame (Q-8 c: never dips); ≥ 6 motion and ≥ 10 (Chromium) / ≥ 5 (WebKit) step frames | H-11 |
| M-3 | ladder, dialog × 7; held; hostile | perimeter and ring ≥ 3.0 | H-5, H-10 |
| M-4 | ladder, dialog × 7 | on **every** plate ΔL_OK(fg, muted) ≥ 0.08; the dock's fg is its active tab; neither dock ink is `#000`/`#fff` within 4/255 (Playwright WebKit paints a `#000` ink's cores at `#010102`-`#030303`) | H-2, H-7 |
| M-5 | live windows; ladder over c1, c0.5 | 0 readbacks and no custom property written in ≥ 3 frames; dock inks ≥ 4.5 | H-3 |
| M-6 | paper ladder, dialog | adjacent ΔE ≥ 0.01; every dark plate ΔE ≥ 0.05 from the page **and** L ≥ L_page | H-9 |
| M-7, M-8 | as pass 1 | as pass 1 | — |
| M-9 | state × paper, c1 | active, hover, checked, selected fills ΔE_OK ≥ 0.02 from their surround; light focus veil ΔL ≤ −0.02 (dims; brightening is a FAIL); dark prints ΔL | H-6 |
| W-A | live; ladder, dialog × paper, c1, c0.5, black, white | leg 1 = M-5's behavioural leg; legs 2-3 as pass 1; leg 4: the thinnest rung of each band has painted α ∈ [bound − 0.005, bound + 0.03], bound = computed `--glass-bound` on that plate (0.005 is paint-read noise); the analytic bound prints as information | H-3, H-4 |
| W-G | ladder, isolated × c1, red | content rungs and the dock: Δh ≤ 10°, C ≥ 0.5 × gamut max, M-2 (R 1 and R 3) on the same surface; in `isolated`, that or `data-glass-flat` | H-15 |
| T | black, white, c1 | reported (exit 0); with `--expect`, measured α within 0.01 of expected | H-12 |
| GLANCE | specimen builds (+ demo builds) | `--require-delta`: every pair's halves differ on ≥ 0.1% of the crop | H-13 |
| W-B, W-C, W-D, W-E, W-F | as pass 1 | as pass 1 | written only when their families' re-triggers fire (REGISTRY §3.3) |

M-2m, RAW and the new cells carry the raw fix (H-1) through every `raw` read: W-B, W-F leg 1, W-A's analytic bound, M-1 and M-6's page, T_c1 and W-G's raw ground.

## 4 · Known limits

- **Motion frames in Playwright WebKit** are a screenshot loop, about 10-14 per second, so a dip shorter than about 100 ms can fall between frames there. Chromium's screencast frames are every composited frame.
- **The frame-locked ring** uses the frozen cell's glyph coverage. The witness first checks that every surface and ink box sits within 1 px of where the frozen cell measured it, and FAILs the window otherwise.
- **The held dock** is held through a `Slider` (the only dock grasp path in the library). The press lifts the slider's thumb above the dock; that is the real held paint.
- **The declared region (H-10)** carries a class and attribute a route hooks. At HEAD nothing reads it, so the cell measures a teleported Popover over black (light) or white (dark).
- **T_c1** is a mean-colour slope; saturate and any non-affine step make it differ from 1 − α.
- **W-G's chroma floor** at the luminosity blend: the fixture's composites land on the gamut edge (C = C_max), because the blend's clip step pushes the colour there. Whether that reads as glass is the owner glance's to say.
- **The readback counter and the aurora's poster.** Under `reducedMotion: reduce` the aurora rasters its fallback ground on the CPU and encodes it once per mount with `canvas.toDataURL` (`src/components/aurora/composables/auroraFallbackGround.ts:360`). The counter records it (one per frozen field cell at HEAD), but it reads no field pixels, and no check reads the frozen cells' tally: M-5 and W-A read the live windows, where motion is on and the count is 0.
- **`baseline.mjs` and the banked witnesses.** W-B and W-D do not partition by `--cells` (W-B reads Chromium's live windows, W-D a worktree and the whole battery), so their four columns repeat one verdict.
- **The story pair's noise floor at HEAD.** HEAD against itself reads 0.02% (Chromium light), 2.06% (Chromium dark) and 0.05% (Playwright WebKit dark): the story's "live canvas sample" card prints the sample's age and tones itself from it. `--require-delta`'s 0.1% is therefore meaningful for the dock, Dialog and floating crops (0.00% against themselves) and not for the story until FL-1 deletes that card; read the story pair by eye.
- **The owner glance's story half** is exercised on real demo builds only: the self-test's GLANCE pair covers the dock, Dialog and floating crops, and `../pass-2/H2.md` §2.3 records the story capture on HEAD in both engines.
- **Machine load.** H2's HEAD run sat at load 10-16 and its self-test at 7-70. A defect seen only under load is NOT-REPRODUCED until it repeats twice.
