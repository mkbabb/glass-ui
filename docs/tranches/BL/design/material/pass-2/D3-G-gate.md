# D3 · pass 2 · D3-G gate: isolation and the light arm

| field | value |
|---|---|
| seat | D3 pass 2, D3-G GATE. Answers REGISTRY §6 D3-G questions 1 (isolation census) and 2 (light under M-1), in order. A BLOCK is declared at the first named failure (§6, §7.2 item 2) |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **BLOCK at question 1.** Missing primitive: **a blend that reads through an isolated group**, i.e. a luminosity composite against the backdrop root's image (what `backdrop-filter` sees), not against the enclosing isolated group's backdrop. Question 2 was measured anyway: the light arm is dominated within ΔC 0.01 on every measured ground (§3) |
| HEAD | the task names `020f6586`; the checkout is at `12c5a3e9`. `git diff --stat 020f6586 HEAD -- src` is empty. The worktree was cut at `020f6586` |
| floor | `floor.patch` (sha256 `d599ab8265ab5976…`) applied clean in the worktree (`git apply --check`, then 70 files, +619 / −2016) |
| build | `harness/build.mjs <wt> --label floor`: the specimen app against the patched `src`, built in 13 s (load 373-380), output and vite cache in scratch |
| tools | `D3-G-gate-probe.mjs` (sha256 `6bcfffac…`), the probe, arms `census`, `lib`, `tiles`, `extra`; `D3-G-gate-read.mjs` (sha256 `ec2253a5…`), which prints every table below from the records. This seat changed the probe in two ways: a 120 s screenshot timeout (the 30 s default timed out at load 289-350 in a WebKit popover cell and a Chromium tiles cell), and `tiles`/`extra` write their records after every cell |
| records (source of record) | `D3-G-gate-records/`: `census.json` (both engines), `lib.json`, `tiles.json`, `extra.json` (Chromium), `tiles-wk.json`, `extra-wk.json` (Playwright WebKit). `prior/` holds a hung earlier seat's run of the same probe on the same build inputs. With the `load` and `errs` fields stripped, `census`, `lib`, `tiles` and `extra` are **byte-identical** to it. So every Chromium cell and both engines' census were taken twice, at different load, with identical results. The WebKit tiles and extra cells were taken once |
| engines | Chromium 149 headless (`CHROMIUM_ARGS`). **Playwright WebKit** 26.5 headless with H-14's `+shim`. Playwright WebKit is not Safari, and its `page.screenshot()` paints no `backdrop-filter` (S-3), so its blur legs read the unblurred field. **Real Safari: UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load average beside every cell in the records: census 299-489, lib 408-485, Chromium tiles 207-274, Chromium extra 180-204, WebKit tiles 91-189, WebKit extra 87-214. No cell is a timing; every result is paint, and every repeated cell agreed exactly. For about 30 s a duplicate probe launched by this seat by mistake ran beside the Chromium dark-aurora tiles cell. It was killed before it wrote any record, and that cell is byte-identical to the earlier run |
| worktree | `…/scratchpad/D3/p2/g-gate/wt`, `node_modules` symlinked, removed with `git worktree remove --force` |
| fences | no source edit in the checkout; the only writes are this file, `D3-G-gate-read.mjs`, the probe edits above, and the records |

---

## 0 · In brief

- **Every glass surface with an isolated group between plate and field paints the pole's own colour.** In Chromium the composite is byte-identical to the plant with blending removed (`mix-blend-mode: normal`). Light card pole: L 0.980, C 0.011, h 63.4. Light neutral poles: C 0.000. Dark card pole: L 0.295, C 0.022, h 57.8. That holds at the tile level for `isolation: isolate`, `transform`, `position: fixed` + `z-index`, and the pole as a child of the `backdrop-filter` element; and on the real library dock and the real portalled popover, in both themes and over c1, c0.5 and `#761617`.
- **A `backdrop-filter` sibling inside the group does not import the field.** The pole blends against the group's own backdrop, never the backdrop root's image. "Blur sibling + pole sibling inside the isolated tile" (`G-iso`) is identical to the same tile with no blur (`P-iso-noblur`). Both engines agree.
- **The pole cannot sit as a sibling of `.dock-plate`** without an isolated group. `.dock-plate`'s parent `.glass-dock` is a stacking context at HEAD+floor (`z-index: 0` and `contain: layout style`, `dock/styles/shell.css:86`, `:100`). It needs that context to hold the plate's `z-index: -1` (`dock/styles/dock.css:52-61`). D2-B′ keeps the structure, and D2-G adds two translating `overflow: clip` doors and their counters between the plate and the root (D2-G-spec §3). The real dock reads flat on every cell. So do D2-G's doors, measured in both engines.
- **The pole cannot sit as a sibling of portalled overlay content.** The floating wrapper is `position: fixed; z-index: 130; transform: matrix(…)`, and the Dialog content is itself `position: fixed; z-index: 140`. A pole placed as the popover content's sibling inside its wrapper reads flat in both engines.
- **Where nothing isolates, the blend works.** The content rungs (wash, quiet, resting, card, floating, overlay in the ladder scene) have no stacking context between them and the field. With the pole inside them, dark composites keep the field's hue (Δh 0.2-3.9°, C 0.078-0.169). Even there, though, the pole is a child of the rung, so the rung must drop its own `backdrop-filter` (a filter makes the pole a child of a backdrop root, the flat `G-child` case) and carry the blur on a sibling layer.
- **Question 2: the light arm is dominated.** At pole L ≥ 0.975 the composite sits on the sRGB gamut ceiling (C/Cmax 1.000): C 0.012-0.026 at the neutral 0.975 pole, 0.010-0.021 at the card pole, 0.004-0.010 at 0.99. A′'s bound rung (wash) carries more chroma than G on every tile (ΔC ≤ +0.005). Only A′'s thickest content rung (resting) is beaten, by at most +0.011 (n975, 24 of 80 tiles over c0.5) or +0.007 (card pole). Playwright WebKit agrees to 0.002.

---

## 1 · The probe

All pixels come from screenshots (Chromium) or Playwright WebKit screenshots. No canvas context is requested. The field is the live default `<Aurora>` at ceiling 1 (`aurora`, c1) or 0.5 (`aurora50`), or a flat `#761617` (`red`, UIA-V-198). `rootred` paints `#761617` on `<body>`, root-propagated (value.js's case). Each colour is the mean of a sampled rect, converted to OKLab/OKLCh by `harness/lib.mjs`. `Cmax` is the sRGB gamut chroma at the composite's own L and h. Δh is reported where raw C > 0.02 and composite C > 0.004.

Poles: light `n975` = `oklch(0.975 0 0)`, `card` = FL-3's `#fef7f1` (L 0.980), `n990` = `oklch(0.99 0 0)`; dark `dcard` = FL-3's dark card `#352a22` (L 0.295). Blur: the floor's computed wash filter, `blur(6px) saturate(1.5)` (tiles); each surface's own computed filter (lib).

| arm | what it places |
|---|---|
| `census` | every element with a `backdrop-filter`, every `[data-spec]`, every `.dock-plate`, in the ladder, dialog, held, state, hostile and halo scenes. For each: its own stacking-context causes, every stacking-context ancestor to `<html>`, and which of those do not contain the field (an isolated group between plate and field) |
| `lib` | the real library surfaces in the ladder scene. `raw` (surfaces hidden); `A` (A′ as built on the floor); `G`: on content rungs and the popover, the surface's own filter and fill are removed and a blur child plus a pole child are added; on the dock, the plate's fill is removed and the pole is the next sibling of `.dock-plate` (z −1). `Pnoblur` is G without the blur layer; `Pnormal` is G with `mix-blend-mode: normal` (mechanism removed) |
| `tiles` | 80 tiles (10 × 8) over the bare field (empty scene). `raw`; `A-wash` and `A-resting` (the floor's real classes); G in five placements: `G-open` (absolute, no stacking context; a blur child and a pole child), `G-iso` (`isolation: isolate`), `G-xf` (`transform: translate(0,0)`), `G-fixedz` (`position: fixed; z-index: 50`), `G-child` (the pole as a child of the `backdrop-filter` element); plants `P-open-noblur`, `P-iso-noblur`, `P-normal` |
| `extra` | D2's and the consumers' placements: `G-doors` (D2-G's aperture, D2-G-block §1: two nested `overflow: clip; border-radius: 28px` doors on `translateX`, each with its counter; blur and pole inside the inner counter, the plate's slot), `G-anc` (an ancestor `scale(1.03) rotate(0.4deg)`, value.js K-15), each with a no-blur plant; and the popover's pole as a sibling of the popover content inside its floating wrapper (`sib`, `sib-nb`) |

`rawDrift` (raw before and after all variants) is 0.0000 on every tile and surface in both engines. The raw capture is stable.

---

## 2 · Question 1 · the isolation census

### 2.1 · Which surfaces have an isolated group between plate and field (HEAD + floor)

Both engines, both themes; `census.json`. "Between" lists stacking-context ancestors that do not contain the field.

| surface (scenes) | own causes besides `backdrop-filter` | isolated group between it and the field |
|---|---|---|
| `.glass-wash`, `.glass-quiet`, `.glass-resting`, `.glass-card`, `.glass-floating`, `.glass-overlay`, `.glass-opaque` (ladder, held, hostile, halo, state) | none | **none** |
| `.glass-capsule` on the open page (halo) | none | none |
| `.glass-dock` root (ladder, held, state, hostile) | `z-index: 0`, `contain: layout style` | none (the root is itself the group) |
| `.dock-plate`, expanded and collapsed | `z-index: -1`, `clip-path: inset(0px)` | **`.glass-dock {z-index: 0, contain: layout style}`** |
| the held dock's grasp carriers | `opacity: 0` (one arm) | `.dock-plate {z-index: −1}` and `.glass-dock`; inside the held `Slider` also `.glass-slider {z-index: 50}`, `.slider-range {transform: scaleY(0.97)}` |
| Popover content `[slot=popover-content]` (ladder, hostile) | `z-index: 130`, `translate`, `scale`, `filter: blur(0px)` | **the floating wrapper `{position: fixed, z-index: 130, transform: matrix(1,0,0,1,936,510)}`**, portalled out of `#app` |
| Dialog content `[slot=dialog-content]` (dialog) | `position: fixed`, `z-index: 140`, `translate: −50% −50%` | none above it; any pole inside it is inside this group |
| `.glass-focus-veil` (dialog, held, state) | `position: fixed`, `z-index: 49`, `mask-image` | in the dialog: the scrim `{position: fixed, z-index: 50}` |
| `.segmented-indicator.glass-capsule` (state) | `z-index: 0`, `translate`, `scale` | none isolating (its ancestors are `backdrop-filter` rungs, each a backdrop root: a pole there reads only the rung's paint, S-2) |

Library surfaces the specimen does not mount, read from the patched source (static, not painted). Each is portalled to `<body>` and carries its own fixed or floating positioning plus a z token, so a pole inside it sits in an isolated group in the same way as the Popover and Dialog:
- `SelectContent.vue:84` (`z-popover`), the `DropdownMenu`/`ContextMenu` contents (`menu/context.ts`, Portal), `TooltipContent.vue:50,62` (`z-tooltip`), `Toaster.vue:72` (`z-toast`);
- `sheet/styles.css:30-31` (`fixed`, `--z-modal`), `expandable-container/styles.css:7-9` (`fixed`, `--z-modal`);
- `card/scroll.css:58-60` (`.card-header--shrink { isolation: isolate }`) isolates anything inside a shrinking card header.

### 2.2 · What the pole paints in each placement

Composite **L / C / h** (OKLab L, OKLCh C and h). Real library surfaces, Chromium, `lib.json`. A′ is the floor as built. G is the pole beside a blur layer. The plant is `Pnormal`, the same with blending removed.

| theme · ground | surface | raw | A′ | **G** | Δh (G) | plant (normal) | load |
|---|---|---|---|---|---:|---|---:|
| light · c1 | wash | 0.620 / 0.181 / 32.8 | 0.935 / 0.032 / 39.3 | 0.980 / 0.010 / 32.5 | 0.3 | 0.980 / 0.011 / 63.4 | 485.2 |
| light · c1 | card | 0.715 / 0.154 / 52.6 | 0.968 / 0.019 / 63.8 | 0.980 / 0.013 / 64.4 | 11.9 | 0.980 / 0.011 / 63.4 | 485.2 |
| light · c1 | **dock** | 0.716 / 0.154 / 52.8 | 0.947 / 0.032 / 62.7 | **0.980 / 0.011 / 63.4** | 10.5 | 0.980 / 0.011 / 63.4 | 485.2 |
| light · c1 | **popover** | 0.828 / 0.128 / 82.3 | 0.963 / 0.031 / 79.9 | **0.980 / 0.011 / 63.5** | 18.8 | 0.980 / 0.011 / 63.4 | 485.2 |
| light · c0.5 | dock | 0.842 / 0.080 / 57.8 | 0.964 / 0.021 / 62.8 | 0.980 / 0.011 / 63.4 | 5.6 | 0.980 / 0.011 / 63.4 | 480.3 |
| light · c0.5 | popover | 0.904 / 0.070 / 84.7 | 0.972 / 0.020 / 74.7 | 0.980 / 0.011 / 63.5 | 21.2 | 0.980 / 0.011 / 63.4 | 480.3 |
| light · red | wash | 0.371 / 0.130 / 25.9 | 0.914 / 0.025 / 32.9 | 0.980 / 0.010 / 17.3 | 8.6 | 0.980 / 0.011 / 63.4 | 459.8 |
| light · red | dock | 0.371 / 0.130 / 25.9 | 0.914 / 0.025 / 32.1 | 0.980 / 0.011 / 63.4 | 37.5 | 0.980 / 0.011 / 63.4 | 459.8 |
| light · red | popover | 0.371 / 0.130 / 25.9 | 0.914 / 0.025 / 32.9 | 0.980 / 0.011 / 63.5 | 37.6 | 0.980 / 0.011 / 63.4 | 459.8 |
| dark · c1 | wash | 0.620 / 0.181 / 32.8 | 0.336 / 0.053 / 40.7 | 0.350 / **0.127** / 33.6 | 0.8 | 0.295 / 0.022 / 57.8 | 431 |
| dark · c1 | quiet | 0.634 / 0.177 / 35.2 | 0.324 / 0.044 / 44.2 | 0.340 / 0.117 / 35.8 | 0.5 | 0.295 / 0.022 / 57.8 | 431 |
| dark · c1 | resting | 0.670 / 0.166 / 42.1 | 0.312 / 0.032 / 50.8 | 0.323 / 0.096 / 43.0 | 0.9 | 0.295 / 0.022 / 57.8 | 431 |
| dark · c1 | card | 0.715 / 0.154 / 52.6 | 0.314 / 0.032 / 56.3 | 0.312 / 0.078 / 54.0 | 1.4 | 0.295 / 0.022 / 57.8 | 431 |
| dark · c1 | floating | 0.633 / 0.177 / 35.1 | 0.339 / 0.052 / 43.8 | 0.342 / 0.119 / 35.3 | 0.2 | 0.295 / 0.022 / 57.8 | 431 |
| dark · c1 | overlay | 0.692 / 0.160 / 47.0 | 0.331 / 0.043 / 54.1 | 0.317 / 0.086 / 47.9 | 0.9 | 0.295 / 0.022 / 57.8 | 431 |
| dark · c1 | **dock** | 0.716 / 0.154 / 52.8 | 0.351 / 0.049 / 59.1 | **0.295 / 0.022 / 57.8** | 5.0 | 0.295 / 0.022 / 57.8 | 431 |
| dark · c1 | **popover** | 0.828 / 0.128 / 82.3 | 0.372 / 0.045 / 76.3 | **0.295 / 0.022 / 58.0** | 24.3 | 0.295 / 0.022 / 57.8 | 431 |
| dark · c0.5 | wash / resting / overlay | 0.398 / 0.103 / 32.8 · 0.428 / 0.095 / 43.0 · 0.440 / 0.092 / 48.1 | 0.309 / 0.037 · 0.300 / 0.026 · 0.309 / 0.034 | 0.353 / 0.130 / 33.3 · 0.326 / 0.101 / 40.8 · 0.320 / 0.091 / 45.0 | 0.4 · 2.2 · 3.0 | 0.295 / 0.022 / 57.8 | 422.7 |
| dark · c0.5 | dock / popover | 0.454 / 0.089 / 54.1 · 0.519 / 0.074 / 82.4 | 0.317 / 0.036 · 0.327 / 0.034 | **0.295 / 0.022 / 57.8 · 0.295 / 0.022 / 58.0** | 3.7 · 24.5 | 0.295 / 0.022 / 57.8 | 422.7 |
| dark · red | every content rung | 0.371 / 0.130 / 25.9 | 0.299-0.305 / 0.029-0.043 / 35.3-43.4 | 0.412-0.413 / 0.168-0.169 / 28.9-29.0 | 3.0 | 0.295 / 0.022 / 57.8 | 408.1 |
| dark · red | dock / popover | 0.371 / 0.130 / 25.9 | 0.305 / 0.043 / 35.4 | **0.295 / 0.022 / 57.8 · 0.295 / 0.022 / 58.0** | 31.9 · 32.1 | 0.295 / 0.022 / 57.8 | 408.1 |

In light, every G composite reads ≈ the plant because the L 0.980 gamut leaves C ≤ 0.013 at these hues (question 2). Light isolation is therefore read on the tiles with a neutral pole (§2.3), where flat is C 0.000 exactly and live is C 0.012-0.026.

### 2.3 · Placements on the bare field (tiles, 80 per cell)

C span over the 80 tiles; `tiles.json` (Chromium), `tiles-wk.json` (Playwright WebKit). The neutral `n975` light pole separates live from flat: live carries the field's hue, flat is C 0.000.

| engine · theme · ground | G-open | G-iso | G-xf | G-fixedz | G-child | P-open-noblur | P-iso-noblur | P-normal (plant) | load |
|---|---|---|---|---|---|---|---|---|---:|
| Cr · light n975 · c1 | 0.012-0.026 (Δh p95 10.8) | 0.000 | 0.000 | 0.000 | 0.000 | 0.012-0.024 | 0.000 | 0.000 | 235 |
| Cr · light n975 · c0.5 | 0.012-0.026 | 0.000 | 0.000 | 0.000 | 0.000 | 0.012-0.025 | 0.000 | 0.000 | 226.5 |
| Cr · light n975 · red | 0.012 | 0.000 | 0.000 | 0.000 | 0.000 | 0.012 | 0.000 | 0.000 | 209.7 |
| Cr · light n975 · rootred | 0.012 | 0.000 | 0.000 | 0.000 | 0.000 | 0.012 | 0.000 | 0.000 | 212.7 |
| Cr · dark dcard · c1 | **0.063-0.129** (Δh p95 2.2) | 0.022 | 0.022 | 0.022 | 0.022 | 0.064-0.132 | 0.022 | 0.022 | 208.9 |
| Cr · dark dcard · c0.5 | 0.064-0.131 (5.7) | 0.022 | 0.022 | 0.022 | 0.022 | 0.064-0.105 | 0.022 | 0.022 | 233.7 |
| Cr · dark dcard · red | **0.169** (3.0) | 0.022 | 0.022 | 0.022 | 0.022 | 0.129 | 0.022 | 0.022 | 244.1 |
| Cr · dark dcard · rootred | 0.169 (3.0) | 0.022 | 0.022 | 0.022 | 0.022 | 0.129 | 0.022 | 0.022 | 228.4 |
| WK · light n975 · c1 | 0.012-0.024 | 0.000 | 0.000 | 0.000 | 0.000 | 0.012-0.024 | 0.000 | 0.000 | 188.8 |
| WK · light n975 · c0.5 | 0.012-0.025 | 0.000 | 0.000 | 0.000 | 0.000 | 0.012-0.025 | 0.000 | 0.000 | 165.8 |
| WK · light n975 · red / rootred | 0.012 | 0.000 | 0.000 | 0.000 | 0.000 | 0.012 | 0.000 | 0.000 | 141.2 / 110.3 |
| WK · dark dcard · c1 | 0.063-0.132 | 0.022 | 0.022 | 0.022 | 0.022 | 0.063-0.132 | 0.022 | 0.022 | 96.1 |
| WK · dark dcard · c0.5 | 0.063-0.105 | 0.022 | 0.022 | 0.022 | 0.022 | 0.063-0.105 | 0.022 | 0.022 | 99 |
| WK · dark dcard · red / rootred | 0.129 | 0.022 | 0.022 | 0.022 | 0.022 | 0.129 | 0.022 | 0.022 | 96.4 / 91.3 |

The card and neutral 0.99 light poles read the same pattern (`D3-G-gate-read.mjs … tiles`). The isolated placements equal the plant: card C 0.011 at h 63.4, n990 C 0.000.

Readings:
- **Every isolated placement is flat, and identical to the mechanism-removed plant**, in both engines and on every ground. The blur sibling inside the group (`G-iso`) changes nothing against no blur (`P-iso-noblur`).
- **Where the tile is open, the blend reads the page directly**, blur or not (`P-open-noblur` carries hue). So the blur layer is not what carries the field. The blend's backdrop is whatever the enclosing group has painted, and in an isolated group that excludes the field.
- **The root-propagated ground is not flat here** (`rootred` = `red` in both engines). In this specimen the canvas background reaches the root group, which the open tile blends against. W §9.2's root-propagation failure did not reproduce at the tile level. It is not needed for the verdict, and value.js's real structure is out of this seat's fence (read-only sibling).
- Playwright WebKit's G-open equals its no-blur plant because its screenshots paint no `backdrop-filter`. The isolation results are blend results and do not depend on the blur.

### 2.4 · D2's advancing routes and the consumers' ancestors (`extra.json`, `extra-wk.json`)

C span over 80 tiles; the dark pole flat is 0.022, the light card pole flat is 0.011.

| engine | theme · ground | G-doors (D2-G aperture) | G-doors no blur | G-anc (ancestor scale + rotate) | G-anc no blur | load |
|---|---|---|---|---|---|---:|
| Cr | light · c1 | 0.011 (flat) | 0.011 | 0.011 (flat) | 0.011 | 201.6 |
| Cr | light · red | 0.011 | 0.011 | 0.011 | 0.011 | 204.4 |
| Cr | dark · c1 | **0.022 (flat)** | 0.022 | **0.022 (flat)** | 0.022 | 204.1 |
| Cr | dark · red | 0.022 | 0.022 | 0.022 | 0.022 | 203.4 |
| WK | light · c1 | 0.011 (flat) | 0.011 | 0.010-0.021 (live) | 0.010-0.021 | 93.5 |
| WK | light · red | 0.011 | 0.011 | 0.011 | 0.011 | 87 |
| WK | dark · c1 | **0.022 (flat)** | 0.022 | 0.063-0.132 (live) | 0.063-0.132 | 142 |
| WK | dark · red | 0.022 | 0.022 | 0.129 (live) | 0.129 | 169.5 |

The popover pole as a **sibling** of the popover content inside its floating wrapper (composite L / C / h):

| engine | theme · ground | raw | A′ | sib (blur sibling + pole) | sib, no blur | load |
|---|---|---|---|---|---|---:|
| Cr | light · c1 | 0.828 / 0.128 / 82.3 | 0.963 / 0.031 / 79.9 | 0.980 / 0.011 / 63.4 (flat) | 0.980 / 0.011 / 63.4 | 192.9 |
| Cr | light · red | 0.371 / 0.130 / 25.9 | 0.914 / 0.025 / 32.9 | 0.980 / 0.011 / 63.4 (flat) | same | 179.7 |
| Cr | dark · c1 | 0.828 / 0.128 / 82.3 | 0.372 / 0.045 / 76.3 | **0.295 / 0.022 / 57.8 (flat)** | same | 184.7 |
| Cr | dark · red | 0.371 / 0.130 / 25.9 | 0.305 / 0.043 / 35.3 | 0.295 / 0.022 / 57.8 (flat) | same | 192.2 |
| WK | light · c1 / red | raw C 0.128 / 0.130 | 0.963 / 0.024 · 0.913 / 0.020 | 0.980 / 0.011 / 63.4 (flat) | same | 214.2 |
| WK | dark · c1 / red | raw C 0.128 / 0.130 | 0.371 / 0.037 · 0.300 / 0.034 | 0.295 / 0.022 / 57.8 (flat) | same | 194.7 / 189.9 |

- **D2-G's aperture flattens the pole in both engines.** The doors and counters on `translateX` are stacking contexts between the plate's slot and the field. D2-G-block §2.1 found that the lens (`backdrop-filter`) lives through them; a blend does not.
- **D2-B′** keeps the floor's structure (`.glass-dock > .dock-plate`, the plate a leaf written by insets; D2-Bp-spec §2.5, §2.8). Its plate's siblings are inside `.glass-dock`'s group, which is the `lib` dock cell above: flat.
- **An ancestor scale + rotate** (value.js K-15, D2-Bp-spec P-8) flattens the pole in Chromium, the gate. Playwright WebKit painted it live in this probe (single run). This is an engine divergence, recorded as an instrument fact. It does not reach the verdict, because the gate engine flattens it and the dock and overlays are flat in both engines regardless.
- **The popover sibling is flat in both engines.** The wrapper's `fixed + z-index + transform` is the group, so moving the pole out of the content and into the wrapper does not escape it.

### 2.5 · Answer to question 1

| surface | can the pole sit beside the plate with no isolated group? | why (measured) |
|---|---|---|
| content rungs (wash … overlay, card) | **yes**, if the rung gives its `backdrop-filter` to a sibling layer (a pole that is a child of the filter element is flat, `G-child`) | no stacking context between rung and field (census); dark composites carry hue, Δh 0.2-3.9°, C 0.078-0.169 (§2.2) |
| `.glass-capsule` on the page | yes | no group (census) |
| **the dock, at HEAD + floor and under D2-B′** | **no** | `.glass-dock` is the group (`z-index: 0`, `contain: layout style`), and it must be: the plate's `z-index: −1` needs it. Dock G = the plant in every cell, both themes, three grounds (§2.2) |
| **the dock under D2-G** | **no** | the doors and counters are groups; `G-doors` flat in both engines (§2.4) |
| the held dock | no | as the dock, plus `.glass-slider {z-index: 50}` and the liquid fill's transform (census) |
| **portalled overlays** (Popover, Select, menus, Tooltip, Toast) | **no** | the floating wrapper (`fixed`, z, transform) is the group; the sibling pole is flat in both engines (§2.4) |
| Dialog, Sheet, ExpandableContainer | no, and moot | `fixed` + z; the rooms stay at the bound by charter (§6, FL-8) |

A pole placed outside these groups as a sibling of the dock root, or as a portalled layer under each overlay, is not the charter's sibling of `.dock-plate`. It would have to track the plate's moving silhouette (B′'s per-frame insets, G's doors, floating-ui's transform) from a second element. That makes it a second plate geometry (P-3), the paint-blind registry M-4 banked for lack of a claim rule. It would also still sit under any consumer group (fourier's `isolate` root, a transformed band) and could never reach top-layer content. So it is not a route around the BLOCK. It is D3-BF's missing piece in another form.

**BLOCK.** The dock and every portalled overlay, which are the surfaces §6 assigns the pole (Q-3 b, "the content rungs and the dock take the pole"), cannot host a sibling pole without an isolated group. In both engines a pole inside the group paints the plant, the pole's own colour.

**The missing primitive** is a blend that reads through an isolated group: a luminosity (or any separable/non-separable) composite whose backdrop is the backdrop root's image, the image `backdrop-filter` already reads, rather than the enclosing group's. Neither engine ships one: no `backdrop-filter` blend function, and `mix-blend-mode` is specified against the group backdrop (Compositing 1). The lens survives these groups (D2-G-block §2.1); the blend does not.

The failure is silent but legible. Flat is the card pole at α 1, which is FL-4's look at full opacity, and dark flat is L 0.295, the dark card. That bears on question 5 and Q-7. No library code stamps it today: `grep glass-flat` finds nothing in `src` at HEAD or in `floor.patch`.

---

## 3 · Question 2 · the light arm under M-1

Measured although question 1 BLOCKs, because the task asks for it and it scopes any future re-trigger.

### 3.1 · The gamut at L ≥ 0.975 (analytic, `harness/lib.mjs gamutMaxC`)

| L | h 0 | 30 | 60 | 90 | 120 | 150 | 180 | 210 | 240 | 270 | 300 | 330 | max (h) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 0.975 | 0.013 | 0.012 | 0.015 | 0.032 | 0.074 | 0.040 | 0.035 | 0.022 | 0.013 | 0.012 | 0.014 | 0.020 | 0.147 (109°) |
| 0.980 | 0.011 | 0.010 | 0.012 | 0.025 | 0.058 | 0.032 | 0.028 | 0.018 | 0.011 | 0.009 | 0.011 | 0.016 | 0.107 (108°) |
| 0.990 | 0.005 | 0.005 | 0.006 | 0.013 | 0.028 | 0.016 | 0.014 | 0.009 | 0.005 | 0.005 | 0.006 | 0.008 | 0.049 (107°) |

The library's aurora sits at h 30-85 and UIA-V-198's red at h 26. There the ceiling is 0.010-0.026.

### 3.2 · G against A′ on the same tiles

G-open per pole against A′'s bound rung (`A-wash`: wash, floating and dock all sit at the bound on the floor) and its thickest content rung (`A-resting`), tile by tile. ΔC = C(G) − C(A′). "> 0.01" counts tiles where G carries more than 0.01 over A′.

**Chromium** (`tiles.json`; loads per cell in §2.3)

| ground | pole | G L | G C (C/Cmax) | A′ wash L / C | ΔC vs wash (max) | A′ resting L / C | ΔC vs resting (max) | > 0.01 |
|---|---|---|---|---|---|---|---|---:|
| c1 | n975 | 0.974-0.976 | 0.012-0.026 (1.000) | 0.935-0.963 / 0.031-0.033 | −0.020 … **−0.005** | 0.964-0.974 / 0.018-0.019 | −0.006 … **+0.008** | 0 |
| c1 | card | 0.979-0.981 | 0.010-0.021 (1.000) | same | −0.022 … −0.010 | same | −0.008 … +0.004 | 0 |
| c1 | n990 | 0.990-0.992 | 0.004-0.010 (1.000) | same | −0.028 … −0.021 | same | −0.013 … −0.008 | 0 |
| c0.5 | n975 | 0.974-0.976 | 0.012-0.026 (1.000) | 0.958-0.972 / 0.020-0.021 | −0.009 … +0.005 | 0.973-0.977 / 0.014-0.015 | −0.002 … **+0.011** | **24** (resting) |
| c0.5 | card | 0.979-0.981 | 0.010-0.021 (1.000) | same | −0.011 … +0.001 | same | −0.004 … +0.006 | 0 |
| c0.5 | n990 | 0.990-0.992 | 0.004-0.010 (1.000) | same | −0.016 … −0.010 | same | −0.010 … −0.005 | 0 |
| red, rootred | n975 / card / n990 | 0.976 / 0.980 / 0.991 | 0.012 / 0.010 / 0.004 | 0.914 / 0.025 | −0.013 / −0.016 / −0.021 | 0.958 / 0.016 | −0.004 / −0.007 / −0.012 | 0 |
| paper | n975 / card / n990 | 0.976 / 0.979 / 0.991 | 0.004 (neutral) | 0.980 / 0.010 | −0.006 | 0.980 / 0.011 | −0.007 | 0 |

Per hue bin, card pole against A′ wash: h 0-30 (red) G C 0.010 against 0.025; h 30-60 (aurora orange) G C 0.010-0.014 against 0.020-0.033; h 60-90 (ochre) G C 0.014-0.021 against 0.020-0.032. The largest gain anywhere is +0.001.

**Playwright WebKit** (`tiles-wk.json`; A′ here is unblurred, S-3)

| ground | pole | ΔC vs A′ wash | ΔC vs A′ resting | > 0.01 |
|---|---|---|---|---:|
| c1 | n975 / card / n990 | −0.014 … 0.000 · −0.016 … −0.003 · −0.022 … −0.014 | −0.004 … +0.009 · −0.006 … +0.005 · −0.011 … −0.006 | 0 |
| c0.5 | n975 / card / n990 | −0.005 … +0.008 · −0.008 … +0.005 · −0.013 … −0.007 | −0.001 … **+0.011** · −0.004 … +0.007 · −0.009 … −0.004 | **25** (n975 vs resting) |
| red, rootred | n975 / card / n990 | −0.008 · −0.009 · −0.015 | −0.002 · −0.003 · −0.009 | 0 |
| paper | all | −0.007 | −0.008 | 0 |

### 3.3 · Answer to question 2

**The light arm is dominated within ΔC 0.01.** At L ≥ 0.975 the luminosity composite is gamut-clipped: C/Cmax is 1.000 on every hued tile, so G carries exactly the ceiling and no more.
- Against A′'s bound rung, the rung G would replace on chrome and on the thinnest content, G carries **less** chroma on every tile in both engines (max ΔC +0.005, c0.5, n975).
- Against A′'s thickest content rung it gains at most +0.011, and only on the darkest permissible pole (n975), only over c0.5 ochre, on 24-25 of 80 tiles. On FL-3's card pole the gain is ≤ +0.007.
- Over paper, every pole reads C 0.004 against A′'s 0.010-0.011. So the light G plate over paper is a more neutral near-white than the card (n975: L 0.976, the grey O-62 forbids at the 0.975 edge).

Under §6's rule G is scoped to dark and the dock. That would have meant **PROCEED-DARK-DOCK** if question 1 had passed.

**Caveat (analytic, unmeasured in paint).** The ceiling rises steeply at h 90-180: at L 0.975 it is 0.074 at 120° (yellow-green) and 0.147 at 109°. Over a green or yellow-green field (blob, constellation, consumer fields), a light G pole could carry up to about 0.05 more than A′'s 0.02-0.03. No library field painted here reaches those hues, so this does not move the answer for the library's own grounds.

---

## 4 · What the dark arm showed in passing (question 3, not gated here)

Recorded because the cells exist. Question 3 is not run.
- Over UIA-V-198's `#761617`, open dark G keeps the red: L 0.413, C 0.169, h 29.0, Δh 3.0°, C/Cmax 0.996. A′ reads L 0.299-0.305, C 0.029-0.043, h 35-43 (the brown Q-4 names).
- The pinned lightness is not pinned in OKLab: the dark card pole (L 0.295) composites at L 0.305-0.356 over the aurora and **0.413 over the red**, the Lum-formula risk §6 item 4 named (encoded `0.3R + 0.59G + 0.11B` is not OKLab L). A dark G route would owe a margin for it against dark ink (≤ 0.41).

---

## 5 · Verdict

**BLOCK at question 1.** The dock (at HEAD + floor, under D2-B′ and under D2-G) and every portalled overlay put an isolated group between the plate and the field. A luminosity pole beside the plate in that group paints the pole's own colour, byte-identical to the plant that removes the blend, in Chromium and Playwright WebKit, in both themes, over c1, c0.5 and `#761617`. The content rungs could host the pole, but G's charter differentiators are the dock that follows the field and the dark plate that keeps red red (§6). The first is unbuildable and the second holds only on rungs.

**Missing primitive:** a blend that reads through an isolated group, i.e. a composite against the backdrop root's image (a `backdrop-filter`-class blend, or `mix-blend-mode` with a backdrop-root reference). Neither engine ships it. Re-trigger: either engine ships such a primitive, **or** the owner rules that G may run on content rungs only (dark), which is a different family than §6 charters and would need its own pass.

Question 2, for the record: dominated within ΔC 0.01 (§3.3); G's light arm adds nothing over A′ on the library's grounds.

Real Safari: **UNMEASURED (owner's safaridriver checkbox)** for every placement, including G's blend beside a sibling `backdrop-filter` (§5 owner actions).
