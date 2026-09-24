# D2 · pass 1 · D2-D · PROTOTYPE: the drawn silhouette on the real dock

| field | value |
|---|---|
| seat | D2 pass 1, PROTOTYPE seat for family D2-D. It test-implements `SPECS.md` §D2-D on the real dock source, as far as it goes |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | brief named `5804d8cc`. The worktree was cut at `85340cdd`, and the checkout read `37eef6e5` at the end. `git diff --quiet v10.0.1 37eef6e5 -- src` holds, so the base is the v10.0.1 dock |
| read | `SPECS.md` (§0, §D2-D, witness totals, shared facts; no other family's spec), `D2-D.md`, `harness/HARNESS.md` and the harness sources. From `D2-A-critique.md` I grepped only the harness-vacuity lines, to avoid repeating the vacuous-cell problem |
| engines | headless Chromium 149.0.7827.55 and **Playwright WebKit** (Playwright 1.61.1), from node. Playwright was imported by absolute path from `glass-ui/node_modules`. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every row |
| scratch | `S = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-D-proto/`. It holds the adapter `S/adapter-d.mjs`, the probes `S/probe-d.mjs`, `S/c4.mjs`, `S/c4/*.mjs`, `S/rimfill.mjs`, `S/layers-k.mjs` and `S/smoke.mjs`, the harness runs `S/out/runs/W*-d/`, the final run log `S/run-final.txt`, the captures `S/shots/{head,d,cmp}/` and `S/probe/`, and the test logs `S/unit-*.txt` and `S/typecheck.txt` |
| writes | this file, and `D2-D-proto.patch` beside it. The patch was copied byte-exact from `S/D2-D-proto.patch` with `cp`, not the Write tool, because hand-copying a 1,473-line diff risks whitespace drift that would break `git apply`. It is the only other file touched. The worktree was removed with `git worktree remove --force`, and I made no other git write. New files went into the patch through `git diff --no-index`, so `git add -N` was not needed |
| verdict | **RUNS.** Typecheck exits 0. The library build exits 0. The demo and scene build and mount in both engines, and Playwright WebKit mounts **without the crash shim** |

## 0 · Results in one table

The HEAD column is `HARNESS.md`, whose `src/` is byte-identical. The research column is `D2-D.md` §7.2. The prototype column is `node harness/run.mjs --build S/out/builds/d --adapter S/adapter-d.mjs` (`S/run-final.txt`), split per engine.

| witness | HEAD | D research probe | **D prototype** | Chromium | Playwright WebKit (no shim) |
|---|---|---|---|---|---|
| W1 corner | 9/32 | 12/32 (28 with κ off) | **26/32** | 13/16 | 13/16 |
| W2 run | 0/10 | 0/10 | 0/10 | 0/5 | 0/5 |
| W3 morph | 0/14 | 0/14 | 0/14 | 0/7 | 0/7 |
| W4 state | 4/16 | 4/16 | 4/16 | 2/8 | 2/8 |
| W5 rim | 0/10 | 8/10 | 8/10 | 4/5 | 4/5 |

**Family witness (hit region), both engines: GREEN.** Presses land as follows (`S/probe-d.mjs`, `S/probe/probe-d.json`):
- the rest corner at +1.5 px and at +4 px: the page;
- a seat: the seat;
- the glass between seats: the plate;
- the reserved footprint mid-collapse: the page;
- inside the silhouette mid-collapse: the dock.

Every W1, W3 and W5 WebKit number above ran with `webkitShim = ""`. The prototype paints no nested translucent `color-mix()`, and the harness no longer needs the shim to mount GlassDock in Playwright WebKit.

## 1 · What was built

Relative to the research probe (`D2-D.md` §7.1), the patch closes these spec items and counterexamples:
- the anchor (item 3, K-11);
- the κ-aware rim (items 1 and 7);
- the σ elevation token (item 6);
- a layout rule for the morph (item 4, C-1), including persistent regions that ride the silhouette's edges;
- C-2 on docks that fit;
- C-4, which is found, reproduced statically and cured;
- the WebKit crash signature;
- the probe's leftover residue: empty rules, dead comments and a dead `@property`-registration claim.

The patch touches 14 files: 12 modified, with +136 / −427 lines, and 2 new, `useDockRim.ts` (173 lines) and `silhouette.css` (393 lines).

| area | mechanism as built | where |
|---|---|---|
| **The shape** | S is written once in `silhouette.css` over the inputs e, a, cross, κs and κe. S's fill is `inset(y0 (100%−x1) (100%−y1) x0 round tl tr br bl)`, and its complement is an `evenodd` `shape()` over the same `--x0 … --bl`. The plate, the shadow fill and the face aperture use the fill; the edge and the shadow's own clip use the complement. **Why the fill is not `shape()`:** see §3 (C-4) | `styles/silhouette.css` |
| **Radii** | r = clamp(0, rest, cross/2). The cut = min(`--dock-sil-cut`, r). The per-shape rest and cut both live in `silhouette.css`. `--dock-cap-rest` and `--dock-cap-cut` are struck with no alias, and so are the four `gl-dock-cap-*` keyframes. `--dock-sil-rs` and `--dock-sil-re` are registered as `<length>` with `inherits: false`, so the rim reads resolved pixels | `silhouette.css`, `run.css` |
| **κ** | Registered `<number>` with `inherits: false`, on `.dock-frame` from the `--dock-run` timeline. The range is `0 P` / `100%−P 100%` (HEAD's range, not the probe's `min(P, 50%)`), so a cut is proportional to what an end hides and saturates at one pitch: a 2 px hover overflow cuts 2/P of the drop. κ is `animation: none` while `[data-morphing]`, because an overflow seen mid-morph comes from an endpoint layout and is transient | `silhouette.css` |
| **Anchor** | New prop `anchor?: "start" \| "center" \| "end"` becomes `data-anchor`, which sets `--dock-a` ∈ {0, ½, 1} and `--dock-align`. x0 = (100% − e)·a | `useDockShellProps.ts`, `GlassDock.vue`, `silhouette.css` |
| **Layout rule (C-1)** | (i) Every inactive face is out of flow at `max-content`, aligned on the anchor (`justify-self`/`align-self: var(--dock-align)`). (ii) While morphing, the controls justify on the anchor and `.dock-layers` is `flex: 0 1 auto`, so the incoming face sits where the settled box will put it. (iii) The persistent regions translate by (e_target − e)·a (start) and (e_target − e)·(a − 1) (end), so they ride the silhouette's live edges and reach their settled spot at settle | `silhouette.css` |
| **Endpoint side effect** | (i) gives the full face its own extent from mount (S-19: 420 px intrinsic, against HEAD's 44 px containing block). `dockMorphMeasure`'s flip arm now measures chrome against the posture the root is still laid out in, instead of against the one it is flipping to. That was a second poisoning path, exposed by (i), which sent the first expand to 420 and then snapped it by 69.66 px | `dockMorphMeasure.ts` |
| **Edge** | `.dock-edge` is the complement of S inset by 1.5 px. Its paint is two pseudo layers, collapsed and expanded border, at opacities 1 − t and t, instead of a nested translucent `color-mix()` (the WebKit crash signature, S-2). At ≤ 8 % alpha the pair departs from a lerp by under 0.1 of a percentage point mid-morph (computed, not measured) and is exact at both rests | `silhouette.css` |
| **Elevation** | New tokens: `--shadow-dock-sigma` 10px, `-sigma-collapsed` 6px, `-ink` 14%, `-ink-collapsed` 12%. `--shadow-dock` derives from them (blur = 2σ), and `--shadow-dock-collapsed` is struck. `.dock-shadow` is `drop-shadow(σ(t) ink(t))` with t = `--dock-lift` = expand-t. A hovered collapsed pill lifts to t = 1 under `@media (hover: hover)`, which restores HEAD's collapsed-hover shadow lift that the probe had dropped. The successor to `--shadow-dock-override` is setting those four tokens on the dock | `tokens/shadow.css`, `silhouette.css` |
| **Rim** | `useDockRim.ts` draws the leading half of S from the same inputs: box, e (`--dock-live`), a (`--dock-a`) and the frame's resolved `--dock-sil-rs`/`-re`, with four radii and inset 4.5. Triggers: ResizeObserver on the root and the run; run `scroll` and seat mutations, read on the next frame, when the scroll timeline has caught up; and a rAF loop only while `[data-morphing]`. Geometry is written as attributes on the two paths, so no component re-renders | `composables/useDockRim.ts` |
| **Hit region** | The root is `pointer-events: none`. The plate is `auto`. The active layer and the persistent groups are `none`, with their descendants back to `auto` | `silhouette.css` |
| **Box** | The root carries no padding. `.dock-controls` is a flex box with `padding: var(--dock-pad-b) var(--dock-pad-i)`, and its border box is the dock box | `shell.css`, `morph.css`, `silhouette.css` |
| **Struck** | The box `scale` morph, the counter-scaled faces and `--dock-size-scale`; the plate's `inset()` extent clip, `--dock-t` alias, `border` and PRM pin; `[data-reserve]`; the box `box-shadow` (three sites); the root padding (three declarations). `@property --dock-t` **stays**: DockCrossfade writes it per face, which the research probe's diff would not have shown | `dock.css`, `shape.css`, `layers.css`, `morph.css`, `shell.css`, `run.css`, `index.css` |

The DOM is `.glass-dock[data-anchor] > (.dock-frame > (.dock-shadow > i, .dock-plate > (.dock-edge, svg.dock-rim?, grasp carriers)), .dock-controls, .dock-run-status)`.

## 2 · Witness readings (final build, `S/w-final.txt`)

### W1 · 26/32 (Chromium 13/16, Playwright WebKit 13/16)

- **Green, both engines:**
  - `fit` rest and hovered rest: 0.178 px Chromium, 0.129 px WebKit. The hovered rest was WebKit's route-4 lens in the probe (4.59 px); proportional κ fixes it.
  - the demo SidebarDock at 1440×900;
  - every `morph` and `vmorph` rest;
  - every sampled morph frame: first expand, warm collapse and warm expand, 6-31 samples and 3-16 distinct extents per cell. Chromium's worst is 0.178 px (horizontal) and 0.156 px (vertical); WebKit's worst is 0.127 px.
- **Red, both engines, 6 cells:** the demo SidebarDock at 1440×600 (5.831 / 5.836 px, mean r 34.33 against 32), and the `rail` at rest and at its scrolled end (3.228 / 3.108 px). These are the cut cap by design: W1 requires cross/2 at every rest, scrolled ends included (S-13). The proportional law makes the rail's cut partial (κe 0.5, r_e 24 against 32; `S/smoke.mjs`), not zero. **An owner ruling on the cap is still owed.**
- **Vacuity check.** The A critique found WebKit morph cells vacuous because the screenshot completes a transition. Here the extent rides rAF writes, and the WebKit morph cells sampled 10-16 distinct extents each (`W1.json`), so they are not single-extent cells.

### W2 · 0/10, unchanged in kind (D owns no run)

- Route 1: the ring cut is 2.5 / 2.5 px on both long runs.
- Route 3: `.dock-run` is statically `overflow-x: auto`.
- Route 4: range max 2 px, ring cut 1.5 px.
- **Route 2 moved:** the collapsed layer's scroll range is 0 px in every frame, against HEAD's 318 px. The inactive face is now at `max-content`, so the hidden layer no longer arms κ on a collapsed dock. It still fails, because the run is a scroll container.

### W3 · 0/14, but D's rows are now green

| row | Chromium | Playwright WebKit |
|---|---|---|
| first expand, continuity | **×0.64** (32.9 px against 51.13). HEAD: one 387.66 px step at ×9.95 | **×0.64** |
| warm collapse / expand, continuity | ×0.66 / ×0.66 | ×0.65 / ×0.65 |
| faces out, all 14 cells | **0 px** (HEAD 147-158) | **0 px** |
| landing | dead, except the warm expand's 0.34 px ring (R-3) | dead, except the 0.28 px ring |
| window | 541.6-550.8 ms against 253-269 allowed (R-4) | 549-556 ms against 263-292 |
| content add / remove, swap | one step of 179.33 / 244.98 px, no window (R-2) | 179.39 / 245.06 px |
| owners | 0 frames | 0 frames |

What still fails belongs to the carrier and content sub-choices D borrows (R-2, R-3, R-4). The first expand still lands 7.66 px short of the settled endpoint, 482 against 489.66 px (`S/smoke.mjs`: `--dock-expanded-px` 482 at collapsed rest). It snaps at settle, inside W3's continuity bound, because `dockMorphMeasure` assumes the chrome is equal in both postures, and the padding morphs. Vertical overshoots by 8 px (281 against 273).

### W4 · 4/16, unchanged

The reduced-motion posture morph and the menu hold pass in both engines. The compact rung is absent. Floor row 3 is not built:
- hover latch: `scale` 1 → 1.1 still latched after a coarse tap;
- tap-pins: 1 click fires on the collapsed face's "Play".

### W5 · 8/10

- Every rung, horizontal and vertical, expanded and collapsed, both engines: 0 outside pixels, and 888-2,158 device px of ink.
- The two compact cells fail: there is no compact rung.

**Not a dead fill** (`S/rimfill.mjs`, `S/rimfill.txt`). Strong-ink pixels (the fill) grow linearly with page progress:

| progress | 0 | 0.25 | 0.5 | 0.75 | 1 |
|---|---|---|---|---|---|
| Chromium | 36 | 572 | 1,104 | 1,634 | 2,177 |
| Playwright WebKit | 0 | 568 | 1,100 | 1,634 | 2,168 |

The vertical rim reads 0 → 2,122 (Chromium) and 0 → 2,124 (WebKit).

## 3 · Family probes (`S/probe-d.mjs` → `S/probe/probe-d.json`, `S/probe/summary.txt`)

| probe | Chromium | Playwright WebKit |
|---|---|---|
| **C-1, warm collapse (centred):** incoming summary fully inside the silhouette | **64 / 64** morph frames | **31 / 31** |
| C-1, persistent Home fully inside, collapse and expand | every frame; its largest per-frame step equals the silhouette edge's (16.66 / 16.66 px) | every frame (27.2 / 27.2) |
| C-1, expand: incoming full face | laid out at its final place (largest step 3.83 px, which is the 7.66 px endpoint residue split by the centring) and revealed centre-out by the aperture (min 34 % inside at the first logged frame) | 3.86 px, 39 % |
| **K-11, `data-anchor="end"` on a right-pinned box:** silhouette end edge across expand and collapse | **1320.0 constant**, start edge 830 → 1218 | **1320.0 constant** |
| **κ-aware rim** (overflowing run, rim radii against the frame's resolved radii; `radiiMatch`) | scroll 0: rim arcs 23.5 / 11.5, want 23.5 / 11.5. Mid: 11.5 / 11.5. **Match** | **Match** at both |
| rim with the plate clip **lifted** | 0 px outside S | 0 px |

- **Measurement limit.** Each log starts at the first frame the morph flag is seen, one to two frames in. So the persistent region's "jump at start" readings, 17-74 px, are between 0.7 and 1.4 of the largest per-frame silhouette step. They do not resolve a one-frame discontinuity from motion. A frame-exact read from the input event is owed.
- **The rim needed two corrections to measure green.** Reading κ inside the `scroll` event read the previous frame's timeline in WebKit (rim 17.5 against 11.5). A seat mutation with no scroll or resize left Chromium's rim stale (23.5 against 11.5). Both now read on the frame after.

**C-4, isolated.** Scripts: `S/c4.mjs` and `S/c4/{min,bis,bis2,bis3,bis5,bis6}.mjs`.
- A mid-morph state is posed by hand: `[data-morphing]`, `--dock-morph-t: 0.3`, no spring running. Under the plate probe (no backdrop-filter), Chromium paints the plate's `shape()` clip as **its bounding rectangle**: square corners, 6.265 px error (6.975 px vertical). WebKit reads 0.01-0.03 px.
- The defect holds with:
  - the clip given inline as a literal px `shape()` on the plate (6.265);
  - no border-radius;
  - no `.dock-edge`;
  - `filter: blur(0)`;
  - `opacity: .999`;
  - a `div.dock-plate` newly created inside `.dock-frame`.
- It disappears when:
  - the plate is moved to `body` (0.084);
  - a class-less `div` with the same literal clip sits in the same frame (0.084);
  - the plate carries `backdrop-filter: blur(1px)` (0.084);
  - the clip is `inset(… round 28px)` (0.084).
- A minimal page does not reproduce it (`S/c4/min.mjs`: 0.083 in every variant). **The trigger is the `.dock-plate` class's rules in this DOM.** I did not isolate it further.
- The shipped plate always carries a backdrop filter, so the defect shows only where the filter is absent: a `static` backdrop, reduced transparency, or a consumer override.
- **Cure as built:** S's fill is `inset(round)`. `S/c4/d2/res.json` reads 0.084-0.178 px (Chromium) and 0.01-0.03 px (WebKit) with and without a backdrop filter. That is what took W1's Chromium morph cells from 0/10 to 10/10.
- The cost is two syntaxes for S (fill and complement) over one set of inputs. The command list survives only in the complement.

## 4 · Gestalt (Chromium, `S/shots/{head,d}/`, 8 dock stories × {1440, 430} × {light, dark}; composites in `S/shots/cmp/`)

Every dock box on every page is identical before and after. The 32-page `docks.json` diff shows 0 differing boxes and 0 page errors. Pixel differences above 24/255 sit only on dock edges and plates: 0-1,169 px per page, and 0 on most dark pages.

What changed, read from the zoomed composites:
- **Collapsed single-control pills** (`/dock/overview`, `zoom-overview-1440-{light,dark}.png`): HEAD paints a rounded square, round on the left and cut on the right, because the hidden layer arms the cut (route 2). The prototype paints a circle. The glow reads the same, and the edge is a hairline heavier in Chromium (C-8: 1.5 px drawn against Chromium's 1 px `border`).
- **Overflowing and labelled docks** (`/dock/controls` at 430 and `/dock/layers` at 1440, `zoom-controls-430-light.png`, `zoom-layers-1440-{light,dark}.png`): HEAD's plate is a **lens**, an ellipse with pointed ends inside the pill. The prototype's is a stadium with a small end cut where the run genuinely overflows. For the 313×56 layers dock, `S/layers-k.mjs` reads run 377 against 289 and κe = 1. This is the largest visible change.
- **Vertical docks** (`/dock/vertical`, `zoom-vertical-1440-light.png`): the collapsed-first vertical dock loses HEAD's stray bright corner highlight and reads as a clean stadium. The rails match.
- **Mid-collapse** (`S/probe/{chromium,webkit}-midcollapse.png`): the incoming "H" (persistent, riding the left edge) and "P" (summary) sit fully inside the shrinking stadium. The leaving "Play" and "Settings" fade and are clipped by the aperture.
- **Rim at κ mid** (`S/probe/chromium-rim-kappa-mid.png`): both ends are cut to 16, the rim follows the cut arcs, and the fill is at 50 %.

## 5 · Checks

| check | result |
|---|---|
| `npm run typecheck` (worktree) | exit 0, both projects (`S/typecheck.txt`). Before the first library build, the test project reported 2 × TS2307 on `@mkbabb/glass-ui/fourier-math`: a fresh worktree has no `dist/`, so this is environmental |
| library build (`S/libbuild.mjs`, the worktree's `vite.config.ts`) | exit 0, 14.7 s (`S/libbuild.txt`). The glass build plugin writes `dist/` inside the worktree regardless of `outDir` |
| dock unit tests (`vitest run tests/components/custom/dock`, cache in scratch) | **121 pass, 6 fail, 1 expected fail** (`S/unit-dock.txt`). The 6 are all source gates in `g-dock-lattice.test.ts`: "DockProps is at most six members" (now 8: `anchor`, `progressSource`); "exactly one member flexes" (`.dock-controls` is now `flex: 1 1 auto`); "the cap rides a named scoped timeline" (the animation moved to `silhouette.css`); "the cap keyframes only through the rest/cut token pair" and "the cut cap is the band's only animated radius" (the `gl-dock-cap-*` keyframes are struck); "the ring reserve is stated in the box model" (a second `box-sizing` in `silhouette.css`). `GlassDock.stagger` timed out in its `afterAll` browser close on 1 of 4 runs |
| wider suites (`tests/styles tests/gates tests/design tests/demo tests/composables/motion`) | 783 pass, 7 fail, 8 expected fail on the first run (`S/unit-wider.txt`). Two were mine and are fixed: `rimPathD` exported and unused (G-OVERFIT), and a template comment naming `.dock-plate`, which the grasp-mount regex matched; 51/51 after the fix (`S/unit-fix.txt`). **Remaining:** `stacked-url-filter` (the `.dock-shadow` `drop-shadow` filter is outside the dock's filter allowlist, a real gate conflict); `emitted-utility-vars` ("0ms"; my scratch build emits unminified CSS, and the checkout's `dist` has `0s`, a cause I did not verify); `boot-graph` × 3 (no `dist-demo` in a fresh worktree, environmental) |
| harness run order | builds `d` rebuilt at each source change. The final witness build predates two non-behavioural edits: `export` dropped from an internal function, and a template comment reworded |

## 6 · Breaks and open gaps (every one recorded)

1. **Real Safari:** every cell UNMEASURED (owner's safaridriver checkbox). That includes the C-4 cure, the edge crossfade in place of the nested `color-mix()`, and whether a registered length, `--dock-live`, changes Safari's morph cost.
2. **The cut cap fails W1 by design** on the rails and the short-viewport sidebar: 6 cells, S-13. Owner ruling owed.
3. **Endpoint residue:**
   - The first expand lands 7.66 px short (horizontal) or 8 px long (vertical), then snaps at settle. `dockMorphMeasure` assumes constant chrome, and the padding interpolates between postures. This belongs to the endpoint sub-choice. D's layout rule shrank this error from 387.66 px; it did not remove it.
   - For a budget-capped collapsible dock, the `max-content` inactive face is uncapped, so its first-expand endpoint would overshoot the budget. No scene covers this, so it is unmeasured.
4. **κ is gated off during the morph.** An overflowing, collapsible dock's cut snaps to 0 at morph start and back at settle. No scene covers this; unmeasured.
5. **Residual κ on a collapsed dock.** On `/dock/layers`, a collapsed 56 px dock's `max-content` inactive run still reports 241 against 236 (5 px of seat paint overflow), so κe = 0.104 and r_e = 26.75 against 28 (`S/layers-k.mjs`). This is under W1's 1 px bound, but it is not zero. The same 5 px shows on the 260×108 layers dock.
6. **C-4's root cause** inside `.dock-plate` is not isolated. The cure avoids it: S's fill is `inset(round)`, and only the complement is `shape()`, which read correctly on `.dock-edge` (0.084 px).
7. **Two syntaxes for S** (fill `inset`, complement `shape`) plus a third derivation in TypeScript for the rim, because CSS `d` takes no `shape()` in either engine. All three read one set of inputs, but P-3 is met on the inputs only, not on the text.
8. **C-6 (grasp) is open.** While held, the plate drops its clip and paints its whole box with the rest radii. That is right at rest and wrong mid-morph. The `dock.css` comment now says so.
9. **Chromium rim at p = 0** paints a 3 px round-cap dot (36 device px). WebKit paints nothing.
10. **The rim track's contrast** (18 %) is untuned and judged only by eye (C-10). The rim follows a morph only through a per-frame `getComputedStyle` rAF loop, and its cost is unmeasured.
11. **Main-thread cost (C-3) was not re-measured.** New per-frame work while morphing: the persistent `translate` resolved from custom properties, and the rim loop when a rim is present.
12. **Gate conflicts:**
    - `g-dock-lattice` (6 source gates, above);
    - `stacked-url-filter` (the dock's `drop-shadow` filter).
    - DockProps goes from 6 to 8 members. It breaks the "surface is six" law, and the owner has to rule on it.
13. **Consumer migration:**
    - `--dock-cap-rest`/`--dock-cap-cut` (chicago X-1) and `--shadow-dock-collapsed` die with no alias.
    - `--shadow-dock-override` is replaced by the four σ/ink tokens.
    - Consumer `padding` on `.glass-dock` now stacks on the controls' padding.
    - `.dock-controls` is no longer `display: contents`.
    - The root is `pointer-events: none`: a consumer element placed as a direct root child, outside any seat, is not hit.
    - fourier's right-anchored dock (K-11) takes `anchor="end"`, and its own width override (X-4) remains a second extent owner.
    - chicago's X-2 run override still binds.
    - The 21 test and demo files that name the morph and cap internals re-point. Beyond the six gates above, I did not audit them.
14. **Anchor limits.** The anchor is physical: `start` is left in RTL, and RTL is untested. The prop wiring itself is covered only by typecheck; the probes set `data-anchor` directly.
15. **P-3 debt:** `shell.css`'s root `border-radius` shape rules now paint nothing and duplicate the per-shape rest. The card `corner-shape` squircle (Chrome-only) reaches no paint. Both are unstruck.
16. **Unbuilt:**
    - floor row 3 (the `(hover: hover)` gate on seat paint; W4 coarse cells red);
    - the compact rung (W4 and W5 compact cells);
    - the run mechanism (W2);
    - R-2, R-3 and R-4 (content morph, sub-pixel ring, window). These are borrowed sub-choices, as the spec states.
17. **The persistent-region start** is not resolved to one frame; see §3.
