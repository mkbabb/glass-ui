# D3 · pass 1 · D3-F critique · the yielding field

| field | value |
|---|---|
| seat | pass-1 adversarial CRITIC for family D3-F. I did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktrees cut at `3abe84e2` (the battery) and `d41040e4` (the readback plant). `git diff --stat 3abe84e2 d41040e4 -- src` is empty, and `git diff --stat 9aa2b7f9 HEAD -- src` touches only `components/configurator/*` and `src/index.ts`, so the tasked material bytes hold. `pass-1/D3-F-proto.patch` applies cleanly (`git apply --check`) and dirties 60 paths plus the new `src/composables/glass/fieldWell/` |
| engines | headless Chromium 149 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, WebGPU adapter present) and Playwright WebKit 26.5, Playwright imported from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | load averages 24-67 during the runs (the battery printed 66.8 at capture end) |
| scratch | `C = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-F-crit/`. Worktrees `C/wt` (the prototype) and `C/wt-plant` (the readback plant) were both removed with `git worktree remove --force` before this write. Battery: `C/out/caps/crit/results/*.log`, run log `C/run.log`. Plants: `C/plants/*.css`, `C/plants/*.log`, captures `C/out/caps/p{a,b,c,d}`. Probes: `C/ce.mjs` → `C/ce/` (with `ce.json`), `C/ce2.mjs` → `C/ce2/` |
| verdict | **BANK.** Sound in paint where it applies, but dominated as a material answer. Re-trigger in §7. Convergence **40%** |

## 0 · Step 1: the failures I expected a material design to hide (written before reading the spec or prototype)

I read `PORTFOLIO.md` §0-§2 and §7 and `harness/HARNESS.md` first. From those alone, I expected a design, and a yielding-field design in particular, to hide these failures:

1. **Scope.** The cure holds only over grounds the library paints: the four hostile grounds, prose, photos and consumer canvases stay RED, and the witness set lets that read as "out of scope" rather than as a failure.
2. **Registration coverage.** The witness measures the rects it was told about, so glass the registry does not know about goes unmeasured.
3. **Paint is not geometry.** A rect registry knows boxes, not paint. Invisible, fading or ancestor-clipped glass would still carve the field, leaving a lit rectangle with no glass on it.
4. **Motion.** The carve trails a moving plate, and it appears or disappears in one step, with no inertia (D-1).
5. **Parked substrates.** Under reduced motion the field paints once, so any mover the registry does not observe leaves a stale well behind.
6. **A bound.** A uniform-sized rect cap either drops wells silently (E-2) or fails in a way that costs more than the defect.
7. **Other arms.** The CSS, placeholder and frame-0 arms paint no shader, so they have no well and fail silently.
8. **The scrim.** It sits between the field and the Dialog plate, so the Dialog cannot be cured at the field.
9. **Dark gestalt.** A dark well cut into a theme-blind bright aurora reads as a hole, not as glass.
10. **The M-1 cure.** Whatever cures M-1 over paper cannot be the well, because paper is not a substrate. So the grey cure is some other change riding along.
11. **Gate blind spots.** W-F reads only the field 4 px inside and exactly 24 px outside each rect, so an edge seam, or a halo narrower than 24 px on an isolated surface, passes.

Every item except 8 turned up measurable below. Item 8 is conceded in the spec (S-8).

## 1 · Reproduction (my own run)

`node harness/run.mjs C/wt --label crit`: 68 cells and 8 live windows in 646 s, plus 8 retune cells in 54 s. The verdicts equal the prototype's `f3` capture row for row.

| witness | verdict (Chromium gate) | rows I read |
|---|---|---|
| **W-F** | **PASS 152** | light c1 wash 0.895, quiet 0.895, resting 0.896 …; the range over all rows is L 0.219 (dark p95) to 0.962 (light p05); 24 px out ΔE p95 0.0000 on every surface |
| **M-5** | **PASS 16** | `getImageData 0, readPixels 0` in all 8 live windows (9 s each). Dock: light c1 fg 4.83 / muted 4.86, c0.5 5.54 / 5.57; dark c1 5.52 / 5.39, c0.5 7.42 / 7.26 |
| **M-7** | **PASS 8** | reference and every host reach 18 px (light) and 17 px (dark). Playwright WebKit (info): 14 px everywhere |
| M-1 | FAIL 2/11 | dialog-rung `#fcf9f4` L 0.983 ΔE 0.005; the real Dialog `#aba7a0` L 0.729 ΔE 0.256 ✗; opaque `#fdf5ec` ✗ (S-6) |
| M-2 | FAIL 110/560 | as the prototype reports |
| M-3 | FAIL 230/266 | rung untouched |
| M-4 | FAIL 14/14 | S-9 |
| M-6 | FAIL 4/19 | light adjacency (S-7) |
| M-8 | FAIL 8/8 | stripes chroma |
| W-A/B/C/D/E | FAIL 47/197, 16/24, 288/304, 7/9, 196/360 | other families' centres |

**Real Safari: UNMEASURED (owner's safaridriver checkbox)** in every row.

## 2 · Every claimed-green witness catches a planted violation

Plants A-C are CSS injected through `capture.mjs --inject` onto the unchanged prototype build. Plant D is a source edit in `C/wt-plant`: `fieldWellsFor` calls `getImageData(0, 0, 1, 1)` on a private 2D canvas every substrate frame. Each plant targets one witness's own invariant.

| plant | witness | exit · verdict | a failing row it prints |
|---|---|---|---|
| A · the well is dead (`--field-well-gain: 1`, the identity map) | W-F | 1 · FAIL 35/80 | light c1 `wash L p05 0.616 ✗`, `card 0.634 ✗`; 24 px out still 0.0000 |
| A (same capture) | M-5 | 1 · FAIL 8/16 | dock light c1 fg 2.13 / muted 2.20 ✗; dark c1 fg 1.89 / muted 1.71 ✗; light c0.5 3.60 / 3.66 ✗ |
| A · `contain: paint` back on wash, quiet, resting and card | M-7 | 1 · FAIL 8/8 | light reference 18 px, every host 2 px ✗; dark 17 px against 2 px ✗ |
| B · spill (`--field-well-outset: 30px`) | W-F | 1 · FAIL 40/80 | `wash … 24 px out ΔE p95 0.3083 ✗` |
| C · halo (`outset 18px`, `feather 16px`) | W-F | 1 · FAIL 32/80 | but only on the ladder plates, via a neighbour (below) |
| D · a main-thread readback per substrate frame | M-5 | 1 · FAIL 8/16 | `getImageData 356 … mean alpha max 0.000 ✗` in 3 s |

**Plant C shows a hole in the gate.** Each ladder plate fails because the 24 px ring around it falls inside a neighbouring plate's 18 px halo; the specimen grid's gutters are 24 px. On the two isolated surfaces the same halo passes cleanly:
- `dock L p05 0.895 · 24 px out ΔE p95 0.0000 (1114 px)`;
- `popover L p05 0.936 · 24 px out ΔE p95 0.0000 (941 px)`;
- the same in all four field cells.

So W-F's leg 2 cannot see a pale halo narrower than about 22 px around an isolated surface. That is exactly the failure C-F4 predicts for Safari, where the outset must grow to about 2σ. The witness's sensitivity to a halo depends on how dense the specimen page is, not on the halo itself.

The green is real on all three witnesses: a dead well, a readback and a clipped halo are each caught.

## 3 · The checklist

### 3.1 Vacuous convergence: CONFIRMED, partly

The battery matches the research probe "to the reported digit" (proto §4). The prototype reads this as its additions working without harm. It is also a sign that the battery exercises none of them (proto §6 item 3).

The **image pipeline, the blob, the clip-path extent, the nesting cull, the z-order rule and the fail-loud bound** have no witness row. The dock's collapse insets are 0 px at HEAD, so the clip read is a no-op in the only place it would fire.

The M-1 move from 11 fails to 2 is not the family's mechanism. Paper is not a substrate, so the well does nothing there. The M-1 cure is the pole swap `--glass-veil-pole: var(--card)` (`tokens/glass.css`), which is D3-A's move. The same holds for dark M-6: the lift comes from the pole `oklch(0.45 0.03 60)` at base 0.24, not from the well.

What the well itself earns is:
- M-2 over the two aurora grounds (light c1 muted 1.47 → 4.64);
- W-F;
- the legibility half of M-5.

### 3.2 Spec-cites-itself circularity: MINOR

The band values (pole 0.965 / gain 0.2 light, 0.18 / 0.28 dark) come from S-5's ink table, which is independent. But W-F is a mechanism witness: "the field's L under the rect is in band". It was minted for this family, and it passes whenever the mechanism runs, whether or not the ink over that field is legible. M-2 is the outcome witness, and M-2 is RED at 110/560.

The spec also scores M-2 "GREEN on every library-substrate and paper cell" by partitioning the ground set after the fact. The battery lists black, white, checker and stripes as gate grounds, and the family's own Q6 admits it cannot reach them.

### 3.3 Gates that cannot fail: CONFIRMED on one leg

- **W-F leg 2** is blind to a halo on an isolated surface (§2, plant C).
- **W-F leg 1** skips the outer 4 px of every rect, so a rim seam up to 4 px wide is invisible. The research's "in" variant, a 16 px ramp, was caught only because it reached past 4 px.
- **W-F depends on a defect.** Its `raw` capture hides the plates by `visibility: hidden` and relies on hidden glass still being welled (proto §6 item 4). The spec's own "only glass painted" rule would turn W-F red as written. The witness therefore certifies the behaviour that §4's CE-2 shows to be a visible fault.
- **M-5's legibility half** is read on the frozen field. With motion on, the leading edge's unwelled sliver (C-F3, 7.5 px at 900 px/s) is never measured.

### 3.4 The elegant-reduction trap: CONFIRMED, four times

Each of these load-bearing steps reads as "and then the hard part":
1. **"One library frame clock"** (SPEC-ONLY). It moves the dock morph, sheet detents and springs onto one write-then-paint clock. That is a cross-cutting motion re-architecture, and D-1 makes fast motion the norm.
2. **"A CSS carve over a lightened copy of the ground"** for the placeholder, `"css"` mode and frame 0 (SPEC-ONLY). The spec itself calls it "a second implementation of the same law".
3. **"Either the scrim yields under the dialog rect, or the dialog plate is solved against the scrim's colour"** (C-F2). Both are outside the mechanism.
4. **"Glass over a ground F does not own needs its legibility from somewhere F does not reach"** (Q6). This is half the problem, and it goes to another family.

### 3.5 Legacy aliases, shims or dual paths: CONFIRMED, three

1. **A second ink writer.** The ladder's bright bucket survives: `@container style(--glass-backdrop: light)` with `--foreground`/`--muted-foreground: contrast-color(var(--card))` (`glass/ladder.css:182-191`, `:269-277`). `.glass-floating`, `.glass-overlay` (`ladder.css:131,150`) and the dock root (`dock/styles/shell.css:136`) self-declare `--glass-backdrop: light`. So glass nested inside a popover or the dock still gets the S-3 black or white poles, which is F-23's R2-01-07 disease. A second ink writer sits beside the static ink the spec claims.
2. **Stale prose that the rename made false.** `ladder.css:166-172` now reads "It mixed every rung toward `--glass-veil-pole` — the warm near-black `--foreground`". It also still describes "the observer-driven refinement … the clamp in `@utility glass-plate`" and "the declarative darken is the AA floor", and the clamp is deleted. More stale references: `tokens/glass-fx.css:2` ("backdrop-luma bucket") and `dock/styles/index.css:22` ("continuous backdrop-luma tint clamp"). The prototype's claim that "every comment naming the observer, the luma, or the earned darken" was cleaned does not hold.
3. **The old well token survives.** `--input-on-glass` is still on 7 src lines (floor row 5 not done). The opaque field well lives on beside the new rung.

### 3.6 Masked fallbacks: CONFIRMED

- **The overflow falls to a placeholder and stays there.** `C/ce.mjs` CE-4, Chromium, both themes: at 17 `[data-field-well]` boxes, `data-aurora-settled` drops and the console logs `[Aurora] 17 glass surfaces lie over this field; the field well holds 16`. I then removed two boxes and waited 4 s. `data-aurora-settled` stayed absent, and the screenshot (`C/ce/light-4-back15.png`) is still the static placeholder gradient. The live field never comes back in that session.
  - The failure is loud only in the console. In paint, the viewer sees a plausible field with no well under any glass, which is the masking E-2 forbids.
  - A registry that counts rects intersecting the canvas makes this path easy to reach: a scrolling card list over a fixed aurora crosses 16 on a scroll and kills the substrate for good.
- **The unwelled arms fail silently.** `"css"` mode, the placeholder, frame 0, constellation and fourier-field paint the unwelled field with no status and no error. value.js resolves to `"css"` on low-power GL (C-F6). There the guarantee is absent and nothing says so.

### 3.7 Unverified gestalt: I looked, and it fails in dark, on light paper and in motion

I looked at the prototype's `gestalt/pairs/` (glass-material, dock, dialog and popover at 1440) and at my own probe captures.

- **Light over the aurora.** This passes as a light frost, not grey. The plates read cream, and labels and captions are clean. But the well cuts chroma to about 0.05, so a plate reads as an opaque milk card with a crisp edge, and the field's colour does not carry through the glass. An iOS-27 regular material keeps more of the wallpaper's hue under the frost. This is legible, but it is paper more than glass.
- **Dark over the aurora.** This fails. Every plate is a dark brown pocket in a bright rose field, and the bare "field only" box is a dark hole: cut-outs, not glass. `--field-well-ambient` is the named lever, handed to the aurora owner.
- **Light over paper.** The glass structure disappears into the page. The Popover story's showcase panel is gone, and the active dock pill ("Overview", "Popover", "Glass Material") loses its fill. This regresses D-2 (engagement) at the one place a user looks for state.
- **The ink** reads as ink on material, not as a sticker, in light. In dark, glyphs sit on a dark slab.
- **What the witnesses cannot see** (§4 CE-2, CE-5, CE-6). The field carves lit (light) or dark (dark) rectangles under glass that is not painted, and it does so at full depth with no easing. A popover fading out keeps its full well until unmount, then the field snaps back in one frame. That breaks D-1.

### 3.8 Consumer-less substrate: PARTLY CONFIRMED

Per the spec's own consumer table (F.2):
- **chicago:** nothing.
- **fourier:** the grey rows close, which is the pole's work (§3.1); prose and canvases stay RED.
- **keyframes:** the well is near-inert at a 0.1 ceiling.
- **value.js:** gets the well on its GPU atmosphere only.

The substrate machinery (the registry, both shading arms, the blob, the bound) serves the library's own demo and one consumer path.

## 4 · Named counterexamples (measured)

All in Chromium, reduced motion, the default aurora at ceiling 1, on the prototype build (`C/out/builds/crit/dist`), empty scene with elements injected. L is OKLab. The band needs L ≥ 0.876 (light) and ≤ 0.408-0.45 (dark).

| id | case | light | dark | what it breaks |
|---|---|---|---|---|
| CE-1 | **Unregistered glass.** A `.glass-capsule` beside a registered `.glass-quiet`, both `visibility: hidden` | quiet L p05 0.896; capsule p05 0.680 / p50 0.716, ΔE vs the empty field 0.0000 | quiet p95 0.315; capsule p50 0.716 | The registry's selector omits `.glass-capsule`, `.control-surface`, `.configurator-shell` and `.input-bar`, all of which carry `backdrop-filter` (`glass/glass-capsule.css`, `glass/control-surfaces.css`, `configurator/styles.css`, `utilities/components.css`). A capsule button over the field keeps an unwelled ground: dark light-ink fails at L 0.716 (S-5: needs ≤ 0.515 for fg) |
| CE-2 | **Invisible glass wells.** A `.glass-floating` at `opacity: 0` | L p50 0.910 where the field is 0.695; ΔE p50 0.242 / p95 0.293 | L p50 0.325; ΔE p50 0.378 / p95 0.401 | A pale (light) or dark (dark) rounded rectangle with no glass on it: exit animations, force-mounted closed panels |
| CE-3 | **A stale well on a parked field.** A registered `.glass-resting` moved 250 px by the Web Animations API | the old spot keeps its well (p50 0.930); the new spot is unwelled (p50 0.828 = the empty field's 0.828) | old spot p50 0.352; new spot 0.828 | WAAPI fires no mutation and no CSS event, so the registry's poll never wakes and the reduced-motion field never repaints |
| CE-4 | **The bound kills the aurora for the session.** 17 wells, then 15 | settled drops at 17 and never returns at 15; the placeholder paints | same | §3.6 |
| CE-5 | **Ancestor clip ignored.** A 300×400 `.glass-card` inside a 300×200 `overflow: hidden` scroller (`C/ce2.mjs`) | the clipped-away 180 px below the scroller: L p50 0.914 against 0.712; ΔE p50 0.228 / p95 0.287 | L p50 0.329; ΔE p50 0.389 / p95 0.409 | The registry reads `getBoundingClientRect`, which ignores ancestor clipping. The screenshot (`C/ce2/light-clip-fade.png`) shows the well extending a card that is not there |
| CE-6 | **The well ignores opacity.** A `.glass-floating` at `opacity: .3` | composite L p50 0.919 where the field is 0.731 | L p50 0.349 | A fade-in or fade-out plate carves at full depth from frame 1: no inertia (D-1) |

The research and prototype already name, and I did not re-measure, the one-frame trail on JS movers registered after the substrate (C-F3), the z-order approximation (a glass under a nested `isolation: isolate` stage is still welled), and the Safari backdrop edge (C-F4).

## 5 · Open gaps (the exact list)

1. **Non-substrate grounds** (black, white, checker, stripes, prose, photos, consumer canvases). M-2 is RED by construction and needs a second mechanism (the family's own Q6). chicago and fourier are uncured.
2. **The light Dialog transmits its scrim** (S-8): muted 2.33-2.74, M-1 L 0.729.
3. **The bound** (CE-4). 16 uniform slots, and overflow kills the substrate for the session, falling to an unwelled placeholder. There is no storage-buffer or data-texture path.
4. **Registration coverage** (CE-1). Surfaces that carry `backdrop-filter` but are outside the selector are unwelled, and no witness notices.
5. **Paint-blind geometry** (CE-2, CE-5, CE-6). `opacity`, `visibility` and ancestor `overflow` are ignored, so the field carves under glass that is not painted.
6. **The well has no motion of its own** (CE-6, C-F3). Its depth is binary per rect, it trails JS movers by one frame, and the frame clock and the `v_max / f` margin are SPEC-ONLY. This violates D-1.
7. **A stale well on parked substrates** (CE-3). WAAPI and any unobserved mover.
8. **The unwelled arms fail silently.** `"css"` mode, the placeholder, frame 0, constellation and fourier-field have no well and no failure attribution (E-2).
9. **Gestalt.** Dark plates read as holes, the light-paper structure vanishes, and light active pills are lost (D-2).
10. **Dual paths and stale prose** (§3.5): the bright bucket's `contrast-color()` ink, the false prose in `ladder.css:166-172`, `glass-fx.css:2`, `dock/styles/index.css:22`, and `--input-on-glass`.
11. **Untouched rows.** M-3 (the perimeter rung and the Dialog Close literal S-12), M-4 (the inactive tab S-9, D2's call), M-8 (stripes chroma), floor row 5.
12. **Witness gaps** (§3.3). W-F is blind to a halo narrower than 22 px on isolated surfaces and skips the 4 px rim. It depends on hidden glass being welled. Nothing covers the image pipeline, the blob, the clip extent, the nesting cull or z-order.
13. **Real Safari: UNMEASURED (owner's safaridriver checkbox).** The backdrop edge (C-F4), which, if Safari's blur reads past the box, forces a 20-44 px halo that W-F would pass on isolated surfaces; WebGPU `fieldWell` on Safari 26; and the dock.

Not counted against F: S-7, the M-1/M-6 light conflict, which is the battery's.

**Convergence: 40%.** Of the family's claims, these hold:
- W-F, M-5 and M-7 are green, and genuinely so (§2);
- the sampler is deleted cleanly with no alias;
- the well works on both GPU arms of the aurora;
- the band arithmetic is sound.

The 13 open gaps above include two masking violations (items 3 and 8), one D-1 violation (item 6) and one D-2 regression (item 9).

## 6 · Hardening the battery (for the owner, not this family)

- **W-F leg 2 should read a gradient, not a single ring.** Take ΔE at 2, 4, 8, 12 and 16 px out on isolated surfaces only (dock, popover), with the ladder grid's gutters widened past the largest outset tested.
- **W-F's `raw` capture should hide the plates' paint, not the plates.** Use `background: none; backdrop-filter: none; box-shadow: none` over `[data-spec] *`, so that the "only painted glass wells" rule is testable.
- **Add a CE row to the specimen.** A registered plate at `opacity: 0`, and a plate clipped by an `overflow: hidden` ancestor: the field under the unpainted region must equal the empty field.
- **Add a coverage row.** Every selector in `src` that declares a non-`none` `backdrop-filter` must be in the registry, or must be named as out of scope.

## 7 · Verdict: BANK

**Why not ADVANCE.** The mechanism is real in paint on its own scope, but as the material answer it:
- leaves every non-substrate ground to a second mechanism (its own Q6);
- cannot reach the Dialog;
- cures M-1 only through a pole swap that is D3-A's move;
- ships two masking paths and a motion-less carve;
- and in dark reads as holes, not glass.

**Why not BLOCK.** The missing piece (legibility over grounds the library does not paint) is not a primitive F failed to find; it is outside F's charter, and another family's plate answer supplies it. The gaps inside F's scope all have known, buildable cures:
- storage for unbounded rects;
- a paint-visibility weight (opacity times the ancestor clip) per rect;
- a registry keyed to "declares `backdrop-filter`";
- a depth that eases on mount and unmount.

**Why not RETIRE.** Nothing measured refutes the centre. The field yields under glass in both GPU arms, and 24 px out is untouched.

**Named re-trigger.** Reopen D3-F as a **substrate-side complement** to whichever plate family wins, not as a standalone material, when either of these happens:
- the chosen family's plate α over the library's own aurora costs transmission the owner rejects (the well buys back a thin veil there);
- or the F-24/F-75 aurora wave opens its dark re-tone (`--field-well-ambient` is the same function).

The entry conditions are gaps 3-8 closed, and W-F hardened per §6.

**What to harvest now, independent of the verdict.**
- The sampler deletion (746 lines, `backgroundCanvas`, the clamp) is clean and E-1-correct. It serves every family (S-13).
- The `fieldWell/shader.ts` chunk, one OKLab function in both languages with gamut-safe chroma, is reusable for the ambient re-tone.

## 8 · Commands

```sh
C=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-F-crit
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/material/harness
git worktree add --detach $C/wt HEAD            # 3abe84e2; node_modules symlinked
git -C $C/wt apply docs/tranches/BL/design/material/pass-1/D3-F-proto.patch
D3_OUT=$C/out node $H/run.mjs $C/wt --label crit                    # §1
bash $C/plants/run-plants.sh                                         # §2, plants A-D (D built from $C/wt-plant)
node $C/ce.mjs  $C/out/builds/crit/dist $C/ce                        # §4 CE-1..CE-4
node $C/ce2.mjs $C/out/builds/crit/dist $C/ce2                       # §4 CE-5, CE-6
git worktree remove --force $C/wt; git worktree remove --force $C/wt-plant
```
