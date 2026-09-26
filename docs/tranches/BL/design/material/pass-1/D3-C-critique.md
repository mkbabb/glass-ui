# D3 · pass 1 · D3-C · critique (the cascade ink)

| field | value |
|---|---|
| seat | D3 pass 1, adversarial CRITIC for family D3-C. I did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the worktree was cut at `488c67bd`. `git diff --stat d4d0a042 488c67bd -- src` is empty, so this measures the prototype's own base |
| patch | `pass-1/D3-C-proto.patch`, sha256 `f58587e0…2d3c4d` (matches the prototype's report). `git apply --check` and `git apply` were clean (4 trailing-whitespace warnings); 50 paths changed |
| instruments | the shared battery (`harness/run.mjs`, `capture.mjs --inject`, each witness script), plus three probes of my own in scratch: `drift.mjs` (the muted ink against a moving field), `opacity.mjs` (effective plate opacity over the field, from `full` against `raw`) and `inertia.mjs` (the registered composite and the muted ink, read per frame across a ceiling step). Headless Chromium 149 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`) and Playwright WebKit 26.5, with Playwright imported from `glass-ui/node_modules/playwright`. No browser MCP was used. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | load averages were 48-107 during the runs. The full battery captured 68 cells and 8 live windows in 683.4 s |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-C-crit/` (below: `…/`). The base capture is `…/out/caps/crit`. Each plant is `…/out/caps/p-<name>`: a copy of the base capture with only the planted cells re-captured, so each planted witness verdict is a full-battery verdict. The plant CSS files are in `…/plants/` |
| fences | Source was built only in my worktree, and every vite cache and build output went under scratch. My worktree was removed with `git worktree remove --force` before this write, and `git worktree list` shows no remaining entry. vitest and typecheck were **not** re-run: vitest's cache would land in the checkout's symlinked `node_modules`. Unit results are therefore cited from `D3-C-proto.md` §2 and are unverified here. The only write to the checkout is this file |

## 1 · Before reading the family: what a material design will try to hide

Written from `PORTFOLIO.md` §0-2 and §7 and `HARNESS.md` alone.

1. **The model under the ink is not what paints under it.** Any "declared" or "published" ground is a mean or a bound. Local patches of a field, a photo or a coarse texture sit outside it, and the battery samples only a few frozen positions.
2. **The undeclared case.** A default that equals the page makes every consumer ground (canvas, photo, gradient, video) silently wrong. That is HEAD's disease with new plumbing, and a direct test of E-2.
3. **Legibility bought with alpha, relabelled.** §2.1 fixes the composite band: L ≥ 0.876 under light muted, and L ≤ 0.41-0.52 under dark ink. Any design that clears the band over the ceiling-1 field has made the plate near-opaque there, whatever it calls the layer ("floor", "room", "lift"). Expect the transmission law and the iOS-27 read to die quietly, with M-1 still green because M-1 reads only over paper.
4. **A dead primary with a plausible fallback.** A relative-colour chain that goes invalid at computed time makes `color: var(--x)` inherit its parent's colour, and the parent's colour is `--foreground`. That fallback clears M-2 by a wide margin, so a pixels-only legibility gate cannot see the primary die.
5. **Portals.** Popover, Menu, Dialog, Select and Tooltip are teleported to `body`. Anything keyed on DOM ancestry misses them.
6. **Theme asymmetry.** The dark field is bright (F-24). A dark design that dims toward the page (§1.2) stays invisible, and one that clears M-6 must thicken.
7. **S-7.** M-1 and M-6 cannot both hold in light. Expect that conflict to be cited as "structural", and the flat light ladder then left unexamined.
8. **Motion.** Any static publication is correct only at t = 0 and at rest. Expect D-1 (inertia on a ground change) to be unaddressed.
9. **State fills.** A state fill that was a darkening over a grey plate becomes a no-op over a cream plate. Expect hover and selection to vanish in light.

Most of these did appear (§3-§5).

## 2 · The battery, re-run independently

`D3_OUT=…/out node harness/run.mjs …/wt --label crit` (Chromium gate). Logs are in `…/out/caps/crit/results/`.

| witness | prototype claim (`D3-C-proto.md` §3) | my run | agreement |
|---|---|---|---|
| M-1 | FAIL 1/11 (the escape) | FAIL 1/11: opaque `#fdf5ec` L 0.974 | exact |
| M-2 | FAIL 124/560 (undeclared stands) | FAIL 124/560. Light black: wash fg **1.00**, dock fg 1.78 | exact |
| M-3 | FAIL 93/266; dark-paper Dialog well 2.53 / 2.83 | FAIL 93/266; perimeter 2.53, ring 2.83 | exact |
| M-4 | PASS 14/14 | PASS 14/14 | exact |
| M-5 | PASS 16/16 | PASS 16/16 | exact |
| M-6 | FAIL 4/19 (light adjacency 0.002) | FAIL 4/19. Dark: wash is 0.051 from the page, **0.001 over the 0.05 line** | exact |
| M-7 | PASS 8/8 | PASS 8/8 (18 / 17 px) | exact |
| M-8 | FAIL 7/8 (undeclared stripes) | FAIL 7/8 | exact |
| W-C | FAIL 122/304 | FAIL 122/304; light c1 wells 6.32-7.05 out of band | exact |
| W-A, W-B, W-D, W-E, W-F | 46 / 16 / 6 / 138 / 66 | 46 / 16 / 6 / 138 / 66 | exact |

**Playwright WebKit** (paint-only, informational): M-2 FAIL 152/532, M-3 89/266, M-6 4/18, M-8 7/8, W-C 107/288; M-7 PASS. On library grounds, light c1 muted reads **4.61** (margin 0.11) and light paper 4.79-4.89. Every dock row is UNMEASURED (Playwright WebKit crashes on GlassDock). Real Safari: UNMEASURED (owner's safaridriver checkbox).

## 3 · Plants: every witness the prototype claims green, made to fail

Each plant is one CSS file injected into the specimen (`capture.mjs --inject`). Only the named cells are re-captured into a copy of the base capture, and each planted witness is then re-run over the full battery.

| plant (`…/plants/`) | witness it attacks | verdict | failing row it prints |
|---|---|---|---|
| `m1.css`: `.glass-floating { --card: #d7d4ce }` (light) | M-1 | FAIL 4/11 | `floating #f2f0ec L 0.955 ΔE 0.030 ✗`, popover and dialog-rung likewise |
| `m2.css`: `--glass-muted-target: 3.4` | M-2, W-C | FAIL 193/560; W-C FAIL 179/304 | light paper muted 3.39-3.43 |
| `m4.css`: `--glass-strong-target: 5` | M-4 | FAIL 4/14 | `dock fg #7c6858 muted #7c6858 ΔL_OK 0.000 ✗` |
| `m6.css`: HEAD's base 0.18 / step 0.04 | M-6 | FAIL 17/19 | dark adjacent 0.004-0.008; wash 0.016 from the page |
| `m7.css`: `contain: paint` on the content rungs | M-7 | FAIL 8/8 | reference 18 px, every host 2 px |
| `pubdead.css`: the Aurora's inline pair overridden by `var(--background) !important` | M-5 (legibility half), M-2 | M-5 FAIL 7/16; M-2 FAIL 195/560 | dark c1 dock fg **2.32**, muted 1.54; light c1 dock fg 2.90 |
| `m8.css`: the declared stands plus `--glass-calm-chrome: 1` | M-8 (declared) | FAIL 3/8 (the declared base passes 8/8) | light stripes floating C 0.0506, overlay 0.0473 |
| `wc.css`: `--glass-muted-target: 6.2` | W-C | FAIL 160/304 | light paper muted 6.18-6.25, 0/18 in band |
| **`dead.css`: `--glass-ink-dir: nonsense`** (the whole solve invalid at computed time) | M-2, M-4, W-C | **M-2 FAIL 124/560, identical to the unplanted run**; M-4 FAIL 4/14; W-C FAIL 186/304 | M-2: light paper muted **16.20-16.63**, dark c1 muted 10.53-13.05, "all ≥ 4.5". M-4: `dock fg #1c1917 muted #1c1917` |

The `wc.css` plant also shows that M-2 cannot tell a mis-tuned ink from a correct one: M-2 counts the same 124/560 as unplanted, with every paper row green.

**What the plants show.** Every green witness can fail. None is vacuous, apart from one leg: **M-5's readback half cannot fail.** The sampler is deleted, and the harness's "fed" dock passes a `background-canvas` that is now an inert attribute, so the fed and default windows are the same dock. The legibility half is live (the `pubdead` plant).

**The `dead` plant is the important one.** With the entire solve dead, every muted glyph paints as `--foreground`, and M-2 reads that as the best legibility in the battery. Only W-C (this family's own witness) and M-4 (the dock only, 4 rows) see it. The shared legibility gate is blind to C's primary dying, and in a consumer app nothing fails loud: the hierarchy just silently collapses to one register (§4, masked fallbacks).

## 4 · The checklist

| item | answer | evidence |
|---|---|---|
| **Vacuous convergence** | Not vacuous on the battery: the re-run reproduces every count exactly, and every green witness fails on its plant (§3). Vacuous in one leg: M-5's readback half (the fed dock is the default dock). | §2, §3 |
| **Spec-cites-itself circularity** | Partly. SPECS C.3's evidence is the family's own c5 probe, and the prototype re-reads the same capture shapes. My independent run breaks that loop on the numbers. The loop that remains is **W-C's green centre**. Over paper, `:root` declares `--glass-ground-lo/-hi: var(--background)`, which is exactly the pixel the harness paints, so "ink follows the composite" is verified against a model that equals the paint by construction (muted 4.96-5.05 against a 5.0 target). The retune leg re-points `--background` and `--card`, which the chain reads directly. W-C's centre shows that the CSS maths is exact, not that the ink follows *the painted composite*. Wherever the declaration and the paint differ (the field, the wells, motion), W-C is out of band. | W-C log; §5 drift |
| **Gates that cannot fail** | M-5's readback leg (above). M-6's dark page separation is met at wash with 0.001 to spare (0.051), with the dark base solved to the witness's own threshold (`D3-C §5` item 7: "α 0.30 gives ΔE 0.048"), so it passes by calibration, not margin. | M-6 log |
| **Elegant-reduction trap** | **Yes, at the centre.** "A consumer declares its own pair on the scope that paints its background" is the load-bearing step, and it reads "and then the consumer does the hard part":<br>(a) chicago's per-photo bounds "need an image statistic it does not compute today" (`D3-C §4`);<br>(b) value.js's `useAurora` arms publish nothing;<br>(c) the declaration seat (`@utility glass-ground`, break 1's cure) cannot reach portalled glass, because it is keyed on DOM ancestry. Measured with `portal.css`, which declares black on `main.hx-page` (the in-flow scope holding every plate) over the black stand in light: every in-flow plate clears, and the **teleported Popover reads fg 1.62, muted 2.02** (M-2 FAIL 100/560). Every Popover, Menu, Select, Tooltip and Dialog opened over a consumer-declared region is in the undeclared case.<br>(d) The Aurora publication is a p10/p90 of the static CPU mirror at t = 0 (S-18: not a live signal). | `…/out/caps/p-portal`; `Aurora.vue` diff |
| **Legacy aliases, shims, dual paths** | Three:<br>(1) **`--glass-plate-*` survives as a second plate path**: 20 declarations in 16 files paint `--card` at a rung α with no floor and no ink (proto break 4). That is two definitions of "the glass colour": the scope composite, and the root token. The menu row's hover fill (`menu.css:10`, `--glass-plate-quiet` = `--card` at α 0.15) over a light popover composite moves it ΔE 0.0014-0.0019 (analytic, `--card` mixed over the painted popover composites `#fef5e5` / an estimated `#faf8f6`; not painted). Hover disappears in every light DropdownMenu, Command and Select row, a D-2 failure of the same kind as the cured break 3. `--dock-layer-switcher-active` and the segmented wake are the same kind (by reading).<br>(2) **`backdropMode: "live"` keeps its name with a new meaning** ("solved against the declared ground"). Nothing is live, so the name no longer describes the behaviour; E-1 asks for the rename.<br>(3) The ground hand-off is a closed selector list (`veil.css`: wash/quiet/resting/card/floating/overlay/dock/field-control). `[data-surface="veil"]`, `.glass-capsule`, `.segmented-indicator`, `.glass-loupe` and the pager chassis all `@apply glass-plate` and are missing from it, so their children solve against the grandparent ground (by reading). | `wt/src` grep; `menu.css`, `surfaces.css`, `surface-axis.css`, `surfaces-pager.css`, `Slider.vue:306` |
| **Masked fallbacks** | Four:<br>(1) **The undeclared ground**: the page's `var(--background)` is the default, and it paints silently wrong: light black wash fg 1.00, dock fg 1.78 (M-2).<br>(2) **The dead solve**: invalid at computed time, it inherits `--foreground`; M-2 is blind to it (§3 `dead`).<br>(3) **The dead publication**: an Aurora that did not publish, or whose pair was clobbered, falls back to the page: dark c1 dock fg 2.32 (§3 `pubdead`). The clobber is reachable in the prototype's own code. Each `Aurora.vue` `watchEffect` cleanup calls `removeProperty("--glass-ground-lo/-hi")` on the shared `documentElement`, so unmounting a second Aurora (the `DockStage` one, break 10) deletes the shell Aurora's publication while the shell field still paints (by reading, not captured).<br>(4) The shipped build lowers each `color-mix()` to a `var(--card)` declaration plus an `@supports` arm (`D3-C` Q5). Both engines take the arm. This is the build target's ladder, inherited rather than C's own, but C multiplies its use. | §3; `Aurora.vue` diff |
| **Unverified gestalt** | Looked at the prototype's `pairs/*` and `shots2/*`, and at my own captures. Read below. | §5 |
| **Consumer-less substrate** | `--glass-backdrop-in` has one consumer (the Dialog). `glass-ground` has one (a demo story). `--glass-composite` is published "for value.js", which is held on 7.0.0 (S-24). `--glass-{muted,strong,perimeter}-target` have no consumer. The ink solve and the floor serve every glass surface. | `wt/src` grep |

## 5 · Gestalt (Chromium; my captures `…/out/caps/crit/png/chromium-*-ladder-base-full.png`, and the prototype's `…/D3-C-proto/pairs/`)

- **Light over paper: a frost, not grey.** Plates are cream-white at L 0.981-0.985 (M-1). The O-62 cure holds in paint. But the five rungs are one colour (adjacent ΔE 0.002), and separation is shadow only. The **opaque escape `#fdf5ec` is visibly the most coloured plate on the page**: a peach card among white frosts. The ladder inverts in chroma at its top.
- **Light over the ceiling-1 aurora: two materials, not a ladder.** Effective opacity toward the white pole (`opacity.mjs`, `full` against `raw` under each sample):
  - content rungs: 0.23-0.30, composites `#fe7254`-`#fea65c` at C 0.14-0.18, reading as a lighter, still-vivid coral (the field lifted, not frosted);
  - chrome rungs, the dock and the popover: 0.85-0.88, composites `#feeae3`-`#fef5e5`, C 0.023-0.026.

  The estimator reads the opaque escape itself at 0.86, so **light chrome over the field is as opaque as the escape**: a cream sticker, with the field gone behind it. The step from card to floating is a switch, not a rung. This is legibility bought with alpha, under the name "floor" (the W-FROST law, `glass.css:10-14`). The prototype's own dock pair (`pair-dock-1440-light-aurora.png`) shows the dock and the collapsible pills as opaque white chips.
- **Dark over the field.** Chrome 0.73-0.81 effective opacity toward black, content 0.63-0.67. The plates read as opaque maroon and brown slabs. They separate, and the ink reads as material, but nothing transmits. The dock's lustre is gone (`shots2/proto2-dock-1440-dark-aurora.png`: flat dark-brown pills). The dark wells paint toward the black pole: the opaque plate's wells are pure black pills (`#000`), which read as holes, not recesses.
- **Dark over the page: the real win.** Plates lift off `#0b0a09` by 0.051-0.100 and read as warm dark glass with ink that sits in it.
- **The Dialog** reads as a warm, legible card (the S-8 cure), no longer glass.
- **iOS-27 grade?** No. Nothing on the light page reads as a lens except the thin content plates over the field. No specular, refraction or lustre survives the one filter recipe, and chrome is opaque.

**Motion (D-1 and the live field).**
- `inertia.mjs` across a ceiling step 1 → 0.5: the wash plate's registered composite and its muted ink change **in one frame** (light ink `oklch(0.301 …)` → `oklch(0.394 …)` at f1, then no further change in 40 frames). The ink snaps: no inertia, weight or bounce (D-1).
- `drift.mjs` over about 100 s of the moving field (60 frames), muted ink against every pixel of its text box, p05:
  - the static bound held ≥ 4.5 on every run (min 4.88, light wash);
  - the margin eroded by up to about 1 ratio (dark card 5.98 frozen → 5.01 moving);
  - the upper edge blew out (light card to 8.25).

  So W-C, and any tight-band claim, fails under motion. Legibility survived in this window, but not with margin enough to assume it for a longer or faster field (S-18: mirror p90 ΔE 0.062).

## 6 · A measured refinement: the fail-safe default

The undeclared case and the portal hole share one root: the library's default declaration is the most optimistic ground there is (the page). Invert it. `:root { --glass-ground-lo: #000; --glass-ground-hi: #fff }` makes every undeclared scope solve against the any-input bound, the same guarantee D3-A proves. An app then opts into thin glass by declaring its page (`--glass-ground-lo/-hi: var(--background)` on `:root`, one line), and each substrate or region declares its own.

Measured (`…/plants/failsafe.css`, Chromium; paper, black, white, checker and stripes, ladder, dialog and halo re-captured; the field cells are the Aurora's inline publication, unchanged):

| witness | base | fail-safe default |
|---|---|---|
| M-2 | FAIL 124/560 | **PASS 560/560** (light black fg 7.20+, dark white fg 8.02+, dock ≥ 6.91) |
| M-3 | FAIL 93/266 | **PASS 266/266**, the dark Dialog well included |
| M-8 | FAIL 7/8 | **PASS 8/8** undeclared (C 0.026-0.035) |
| M-4, M-7 | PASS | PASS |
| M-1 | FAIL 1/11 | FAIL 1/11 (the escape only). Plates L 0.986-0.991, ΔE 0.001-0.006 |
| M-6 | FAIL 4/19 | FAIL 7/19. Light S-7 as before, and the dark wash/quiet drop to 0.029 / 0.045 from the page |
| W-C | FAIL 122/304 | FAIL 169/304. Undeclared, the muted register over paper over-delivers to 11.78 against fg 16.97 |

The trade is honest: undeclared glass fails safe, legible but thick with a compressed hierarchy, instead of silently illegible. This is the E-2 direction. The portal hole closes, because portalled glass reads `:root`. What is left is a thin-glass opt-in (one line per app) and the W-C band, which only a per-rect ground could ever reach.

## 7 · Counterexamples, named

1. **Portalled glass over a declared region.** A consumer declares black on the scope that holds its content, and the teleported Popover over it reads fg 1.62 / muted 2.02 (§4, `p-portal`).
2. **The dead solve passes M-2.** `--glass-ink-dir: nonsense` gives muted = fg everywhere, and M-2 reads 124/560, identical to base (§3).
3. **The dead publication.** Dark c1 dock fg 2.32 / muted 1.54. By reading, it is reachable through the `Aurora.vue` cleanup clobber on a two-Aurora page (break 10).
4. **The undeclared stand.** Light over black: wash fg 1.00, dock fg 1.78 (M-2).
5. **Light chrome over the field is the opaque escape.** Effective opacity 0.85-0.88 against the escape's own 0.86 reading (§5).
6. **The inverted light ladder top.** `.glass-opaque` `#fdf5ec` is the most chromatic plate over paper, while every translucent rung is whiter (§5).
7. **Invisible menu hover.** `--glass-plate-quiet` over a light popover moves it ΔE ≈ 0.002 (analytic). Every menu row loses its engagement (D-2).
8. **Snap on a ground change.** The ink jumps in one frame (§5, D-1).
9. **Motion erodes the bound.** Dark card muted 5.98 → 5.01 in 100 s, and light card to 8.25 (§5).
10. **The dark M-6 margin is 0.001** (wash 0.051), and Playwright WebKit light c1 muted is 4.61 (margin 0.11), under S-11's measured 0.15 engine margin.
11. **No source of record for the solve.** The floor's encoded-luma expression is inlined four times in `--glass-lift` and once in `--glass-floor`. Each solved rung is a 1 kB `calc()`. They are generated by `probes/gen-scope.mjs`, which lives only in scratch (a /tmp wipe already took the round-0 probes, `HARNESS.md` provenance), so the repo carries the output of a generator it does not carry (P-3).

## 8 · Convergence and verdict

**Convergence: 50%.** C answers problem 2 exactly: an exact WCAG solve in shipped CSS, byte-identical across engines, keeping two registers (M-4). It answers problem 3 without a readback (M-5), and problem 1 over paper (no grey, a true frost). Problem 4 is answered in dark (the ladder exists and lifts off the page) and fails in light (flat, S-7). The centre is sound, and with the fail-safe default (§6) the shared battery is green except the owner conflicts (S-6, S-7) and the dark wash margin.

**Open gaps, exactly:**
1. The fail-safe default (§6) is not in the spec. Without it, undeclared grounds and portalled glass over declared regions fail silently (E-2).
2. The dead-solve fallback is invisible to M-2. The primary has no loud failure. It needs a witness row (muted ≠ fg on every surface, not only the dock) or a registered `<color>` whose invalidity paints loud.
3. The Aurora publication is one static, document-global pair, with last-writer-wins and a cleanup that clobbers another instance's pair. It publishes across the whole viewport even when the Aurora is a card. There is no publication from `useAurora` consumers.
4. Light chrome over the field is opaque (0.85-0.88): transmission law broken, not iOS-27 grade. The light ladder over the field is bimodal (content 0.23-0.30 against chrome 0.85-0.88).
5. The light ladder is flat over paper (S-7, owner ruling), and the opaque escape is the most chromatic plate (S-6).
6. The dark ladder is thick (0.32-0.64), with a 0.001 margin at wash, and the dark dock lost its lustre.
7. The dark Dialog well: M-3 2.53 / 2.83 in base (closed by the fail-safe default; the spec's own cure is unprobed).
8. The 20 `--glass-plate-*` sites (a dual path). Menu-row hover, the layer-switcher active state and the segmented wake are near-invisible in light.
9. No inertia on a ground change (D-1): the ink snaps in one frame.
10. Motion erodes the static bound (about 1 ratio in 100 s), and W-C's band is unreachable with any declaration.
11. The hand-off selector enumeration misses five scope kinds, and a direct-child scope reads its grandparent's ground.
12. The token-graph gate needs a ruling (break 5).
13. The solve's generator is outside the repo (P-3), and CSS grows +16-18% raw. Playwright WebKit recalc is about 2.1× (research figure, not re-measured).
14. `backdropMode: "live"` names behaviour that no longer exists (E-1).
15. M-5's readback leg is vacuous for every family that deletes the sampler. Its fed arm needs retiring.
16. Real Safari: UNMEASURED (owner's safaridriver checkbox) for the solve, the four-level Dialog chain, the recalc cost and the whole battery.

**Verdict: ADVANCE**, conditioned on adopting the fail-safe default of §6 and on gaps 2, 3, 8 and 9. The exact cascade solve is the strongest ink mechanism measured in D3. It is also separable, and it could ride on D3-A's bound as well as on C's own declared ground. So if C does not converge, bank its solve as a component, not the family. The re-trigger for downgrading to BANK: if D3-A's critique round shows its bound with a solved ink matches C over paper at equal thinness, C's declaration machinery (the ground pair, the hand-off and the publication) adds cost without a differentiator.
