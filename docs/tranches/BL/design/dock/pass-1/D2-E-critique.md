# D2 · pass 1 · D2-E · adversarial critique (the anchored projection)

| field | value |
|---|---|
| seat | D2 pass 1, CRITIC for family D2-E. I did not author it. Read order: PORTFOLIO §0-2 and `harness/HARNESS.md` first (§1 below is written from those alone), then `SPECS.md` §D2-E + shared facts, `D2-E.md`, `D2-E-proto.md`, and the patch |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree cut at `dd979e28`. `D2-E-proto.patch` applied clean (32 paths). HEAD was built from the same worktree with the patch reversed (`git apply -R`, `dirty: false` in `build.json`) |
| engines | Chromium 149.0.7827.55 headless; Playwright WebKit 26.5 headless (+shim), the Playwright 1.61.1 build and **not Safari**. Every WebKit number is **Playwright WebKit**. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-E-crit/`. Runs: `run-head.txt`, `run-proto.txt`. Planted faults: `faults/<fault>.mjs` (fault adapters) and `faults/<fault>-<witness>.txt`. Probes: `probe.mjs` → `probe-{proto,head}-{chromium,webkit}.json`; `hostless.mjs` → `hostless-{proto,head}.json`. Shots in `shots/` |
| verdict | **BANK at 44 %**. The seat-projection half is sound, and it is the cheapest route to W2 of any family. The plate-projection half stalls on W-7 (the faces), and no primitive exists to cure it. A dominating family already turns W3 green. Named re-trigger in §7 |

## 1 · Before reading the family: what a dock design is likely to hide

Written from PORTFOLIO §0-2 and HARNESS.md only.

1. **A dead primary that the witness still passes.** W1 checks that the plate corner is a circle of radius cross/2 *of the plate's own extent*. A plate that collapses to a dot, or anchors to the wrong box, is still a perfect circle. W1 has no check of plate extent against dock box.
2. **A window that is its own clock.** If the morph window is derived from the same token the witness reads as `clockMs`, then the R-4 check ("window ≤ clock + slack") becomes tautological.
3. **Paint moved to where the witness does not look.** W4's latch cell reads only the seat's own computed `scale / transform / translate / box-shadow / background`. W3's `faces` reads the seat's border box. A design that moves state paint to a pseudo, or to another node, escapes both reads.
4. **"Cut 0" when nothing paints.** W2's paint check is clipped-minus-free reach. If the ring paints nowhere, both reads are 0 and the cut is 0.
5. **Hosts the harness never mounts.** Every harness scene puts the dock in a `position: fixed` wrapper. A dock in flow inside a scroller, a seat outside any dock, and consumer roots with positioning utilities are all unexercised.
6. **Velocity walls.** W3 never reverses mid-flight, so a CSS-transition carrier passes W3 and still violates D-1 on every retarget (S-15, S-16).
7. **The elegant reduction.** "The platform's anchor solver is the geometry engine" moves the extent. It says nothing about the *content* (W-7), and the content is the half of problem 3 the owner sees.
8. **Near-budget judgement.** The native `scrollWidth > clientWidth` bit misjudges within 1 px of the budget (S-8). No witness sweeps the budget.
9. **Consumer-less substrate.** A provisional prop (the rim's `progress`) that exists to satisfy a witness rather than a consumer.

## 2 · Reproduction

`node harness/run.mjs` on both builds, run one at a time. Cells passing:

| witness | HEAD (`run-head.txt`) | prototype (`run-proto.txt`) | prototype seat's claim |
|---|---|---|---|
| W1 | 9/32 | 32/32 | 32/32 ✔ |
| W2 | 0/10 | 10/10 | 10/10 ✔ |
| W3 | 0/14 | 6/14 | 6/14 ✔ |
| W4 | 4/16 | 6/16 | 6/16 ✔ |
| W5 | 0/10 | 8/10 | 8/10 ✔ |

- **Chromium and Playwright WebKit agree cell for cell.**
- **W3 faces** read 181.83 / 181.86 px (first expand and warm expand), 77.67 / 77.7 px (content add) and 110.48 / 110.53 px (swap long).
- **Windows** read 206.9-209 ms (Chromium) and 216-217 ms (Playwright WebKit), against the 210 ms clock.
- Every number the prototype reported is reproduced.

## 3 · Planted violations (at least one per witness the prototype claims green)

Each fault is a stylesheet the adapter injects after mount, on build `proto`, with the witness run in both engines.

| fault | CSS planted | witness | result | caught? |
|---|---|---|---|---|
| `lens` | plate `border-radius: 50%` | W1 | **0/32** | yes |
| `cbwill` | `.glass-dock { will-change: transform }`: the family's own named failure mode (C-5, B-4) | W1 | **32/32 PASS.** The plate is a 1.83×1.83 px dot (Chromium) / 2.93×2.93 px (Playwright WebKit), "worst 0.034 px" from a circle | **NO** |
| `runauto` | `.dock-run { overflow-x: auto }` | W2 | **4/10** (routes 2-4 fail: 73/73 container frames, range up to 380 px) | yes |
| `seatrel` | in-dock seats `position: relative` | W2 | **10/10 PASS.** "ring reach clipped 0/0 vs free 0/0": the ring paints nowhere, so the cut is 0 | **NO** |
| `notrans` | plate `transition: none` | W3 | **0/14** | yes |
| `slowclock` | `.glass-dock { --spring-dock-duration: 1200ms }` | W3 | **6/14**, unchanged. The green cells read "window 1192.6 ms (allow 1242.8, clock 1200)": the dock runs 5.7× slower than its spring and passes | **NO** |
| `ungated` | seat `:hover::after` paint outside `(hover: hover)` | W4 | **6/16**, unchanged; `coarse·no-hover-latch` PASS in both engines. My probe confirms the fault is live: after a coarse tap the `::after` reads `scale 1.1`, `rgb(200,0,0)` in both engines (`probe-proto-*.json` `coarseTapUngated`) | **NO** |
| `rimout` | plate `overflow: visible` | W5 | **4/10** (Chromium 3 rungs out, up to 94 device px, 4.47 px deep; Playwright WebKit 1 rung) | yes |

**Four of eight plants go uncaught.** In every one of those four, the gate goes vacuous because this family's mechanism moved the fact the witness reads:
- W1 reads circularity, not plate extent against the dock box.
- W2's cut check has no floor requiring that the ring paints.
- W3's `clockMs` is the CSS token the plate's own transition consumes, not the spring (response 0.30 s, ζ 0.88).
- W4's latch reads the seat, and this family paints on `::after`.

The prototype's W1 32/32, W2 10/10 and W4 latch green are therefore **not evidence that the primary works**. They are evidence that the lens, the scroll-container routes and the transition's existence are fixed. The first three were already true by construction.

## 4 · Counterexamples found on the real prototype

### K-1 · Hostless seats lose all state paint (new, a regression; refutes `D2-E.md` Q3 on real code)

**Cell:** `hostless.mjs`. The fit dock's `t1` (`[data-active]`) and `t2` are moved out of the dock into a white `position: absolute` host. The paint tokens are set to `rgb(200 0 0)`. Red device px are counted:

| cell | HEAD Chromium / Playwright WebKit | prototype Chromium / Playwright WebKit |
|---|---|---|
| hostless selected | 6,981 / 7,047 | **0 / 0** |
| hostless selected, `::after { position-anchor: auto; inset: 0 }` (control) | 6,981 / 7,047 | 6,982 / 7,051 |
| hostless hover | 6,133 / 6,179 | **0 / 0** |
| hostless focus ring (`:focus-visible` true) | 1,245 / 1,257 | **144 / 98**: a ~3 px speck at the seat's top-left corner (`shots/proto-chromium-hostless-focusring.png`) |
| in-dock selected (reference) | 9,516 / 9,513 | 9,353 / 9,521 |

- **Cause.** Outside a dock the seat is `position: relative`, so it is its own `::after`'s containing block. An element is not an acceptable anchor for a box it is the containing block of, so every `anchor()` inset falls back and the projection is a 0×0 box at its static position. Computed style still reads `background: rgb(200,0,0)`, so nothing fails loud.
- **Sites.** value.js's 5 hostless workbench sites and glass-ui's own `DockBackgroundToggle` lose hover, selected and press. They also lose **their focus ring**, which is an accessibility regression.
- **"One recipe, one declaration apart" is false as built.** The cure is a second geometry declaration for hostless seats (`inset: 0`, no anchor). That is cheap, but it makes the family's third place where "one recipe" is two paths (see C-3, the glide against per-seat).
- **The gates missed it.** The patch's `DockControl.a11y` tests pass, and no witness mounts a hostless seat.

### K-2 · W-7: the faces paint on bare page (family-fatal for problem 3, as the family admits)

**Paused mid-expand frames:** `document.getAnimations()` paused at 50 ms. The plate is the only running animation:

| engine | plate width | painting-seat span |
|---|---|---|
| Chromium | 394.1 px | 465.7 px |
| Playwright WebKit | 329.1 px | 465.7 px |

In `shots/proto-webkit-expand50.png`, "H", "1" and "Square ⌄" stand on the page background either side of a pill still catching up; the Chromium shot shows "H" and "Square ⌄" outside.

This is the owner's F-16 complaint ("faces paint outside the glass") in a new geometry, not a cure. `D2-E.md` Q2 shows no primitive reaches it: `clip-path`, `mask-position` and `translate` reject `anchor()` in both engines. The family's own counterexample list calls W3 green unreachable "without importing another family's face mechanism". That sentence is the elegant-reduction trap, stated honestly: the reduction moves the half of the problem the harness measures by extent and leaves the half the eye measures.

### K-3 · The retarget wall on the real dock (D-1)

**Swap scene:** `setFace("long")`, then `setFace("short")` at about 91 ms, measuring painted plate width per frame (`probe-proto-*.json` `reversal`).

| engine | velocity across the reversal |
|---|---|
| Chromium | **+0.98 → −1.76 px/ms in one frame** (then −1.5 … −2.05) |
| Playwright WebKit | +1.73 → 0.00 (a held frame) → −1.10 px/ms |

- This confirms S-16 and the prototype's C-4 on a second transition class (the swap; the prototype measured content add/remove).
- D-1 asks for inertia across a retarget, and a CSS transition cannot give it.
- No harness witness reverses, so W3's 6 greens say nothing here.

### K-4 · The overflow bit misjudges below 1 px (Chromium)

**Fit dock:** `max-inline-size` swept from −2 to +1 px around its content in 0.25 px steps (`nearBudget`).

| engine | seats over by | bit | run |
|---|---|---|---|
| Chromium | 0.25-0.75 px | reads **false** | `overflow: clip`, range 0 |
| Playwright WebKit | the same steps | reads true | `auto`, range 1 |

- **Chromium:** the trailing seat is cut by up to 0.75 px and is unreachable.
- The magnitude is sub-pixel, and the trailing padding probably absorbs it visually.
- It contradicts the spec's claim that, in this family, the native reading "equals 'the seats genuinely exceed'" (E.1 item 6). S-8's layout-sum read (129/129) is the exact alternative.

### K-5 · Dead-plate failure is silent to every gate (C-5/B-4 sharpened)

The family defends the containing-block law as "loud in paint (E-2 satisfied)". It is loud to a human eye. As `cbwill` shows, it is silent to the witnesses: W1 passes a 1.8 px plate 32/32.

The prototype found 8 of the repo's own demo docks painting a 2×2 px plate before migration (B-4). With a law this brittle (any `relative`, `sticky`, `translate-*`, `scale-*`, `will-change-*`, `contain-*` or `@container` utility on the root), a gate is owed, not a claim of loudness.

**Consumer census** (read-only grep of the four consumers' `<GlassDock` mounts and `.glass-dock` rules): no root carries a positioning, transform or containment utility today. The classes are `animation-dock` (width) and `app-dock`; chicago's `.page-dock .dock-run { overflow: visible }` is harmless here. So the break is latent, not live.

### K-6 · C-2 (scroller lag) did not reproduce on the real dock

The fit dock was moved into a non-positioned `overflow: auto` pane (plate containing block = `BODY`). Over 8 scroll steps of 15 px, the plate-to-dock offset read after each frame was **0 px** in both engines.
- Chromium's synchronous read (before a frame) was 15 px behind; Playwright WebKit read 0.
- This is a rect read, not a pixel read. It downgrades C-2 from a risk to an unmeasured-in-paint row; it does not refute it.

### K-7 · The hover register lost its lift, and PRM kills the fades (smaller)

- **Hover:** the glyph no longer scales. The seat reads `scale: none` and the `::after` reads `1.1` (`hover` in `probe-proto-chromium.json`); HEAD scales the glyph. At rest it reads close to HEAD (`shots/{head,proto}-chromium-fithover.png`), but the lift is now a capsule swelling behind still text (C-7).
- **Reduced motion:** `seat.css` sets `transition: none` on the projection, dropping the background and outline **fades**. Canon P6 keeps fades and drops only spatial legs.
- **Card docks:** the prototype's own B-list notes that `--dock-expand-t` became a 0/1 step, so a card dock's radius, padding, veil tier and border colour **step** at the posture flip. That is unmeasured and is a D-1 regression on card docks.

## 5 · The checklist

| item | finding, with evidence |
|---|---|
| **vacuous convergence** | Present. 4 of 8 planted violations go uncaught (§3), and each is a gate this family's mechanism made vacuous: W1 circularity without an extent-coverage check, W2 cut without a paint floor, W3 clock read from the carrier's own token, W4 latch read on the seat not the projection. The headline "W1 32/32, W2 10/10" stands only for the lens and scroll-route fixes, which are real (the `lens` and `runauto` plants are caught) |
| **spec cites itself** | Present, twice. (a) `D2-E.md` Q3 measured the hostless recipe on a scratch page and SPECS E.1 carries it as "[probed]". The real prototype paints 0 px there (K-1). (b) The W3 window "is the plate's own transition" (item 5), and the witness's clock is the same token, so "window 207-218 ms on the 210 ms clock" restates the declaration (`slowclock`: 1192.6 ms on "clock 1200", PASS) |
| **gates that cannot fail** | W4 `coarse·no-hover-latch` cannot fail for any design that paints hover on a pseudo (`ungated`, PASS while the `::after` latches red at 1.1). W2's paint check cannot fail when the ring is absent (`seatrel`) |
| **elegant-reduction trap** | Present and admitted. "The anchor solver is the geometry engine" carries the extent; the content is "and then the hard part", with no primitive (K-2, Q2). The window, continuity and landing greens are all about the plate; the one thing a viewer sees first is the faces on bare page |
| **legacy aliases, shims, dual paths** | (a) `[data-morphing]` is kept by name for click-integrity. That is honest reuse, not an alias. (b) Three geometry paths for "selected": glide, per-seat projection, and (needed, per K-1) a hostless non-anchored arm (C-3). (c) `useDockSpring` survives for the keyboard reach glide (B-6): one spring in script plus the CSS carrier, two motion engines in one dock (canon P7 tension). (d) The provisional `progress` prop breaks the six-member budget (B-3) |
| **masked fallbacks** | No fallback paints over a dead primary. But the dead primary is silent to gates (K-5) and silent in computed style (K-1: `background: rgb(200,0,0)` reported, 0 px painted). E-2's "fails loud" holds only for a human looking at that exact page |
| **unverified gestalt** | Rest frames read clean. The controls story loses HEAD's lens halo, and the collapsed pill is a true circle (prototype shots, `controls-1440-light.png` seen). Motion does not read as one liquid dock: a pill swells under glyphs that already sit at their final layout (K-2 shots), reversals hit a wall (K-3), and there is no face reveal (stagger deleted). That is not iOS-27 grade, where the platter carries its content. Bounce: the landing is "dead, 0 reversals", a ζ 0.88 spring through a truncated `linear()` (S-15), so there is weight but no designed bounce |
| **consumer-less substrate** | The rim's `progress` prop has no consumer: none mounts `ScrollProgressRim` (PORTFOLIO §1.4). It exists to light W5, sits under the plate's `aria-hidden` (the progressbar is hidden from AT) and breaks `G-DOCK-BUDGET`. W5's 8/10 is therefore the rim-as-plate-child *geometry* (sound: `rimout` shows it can fail), not an API |

## 6 · What the family genuinely contributes

- **Seat state on an anchored `::after`, whose containing block sits above the run.** This is the only family mechanism that cures W2's paint half and W-3/W-3t *structurally*, with no gutter arithmetic.
  - The `runauto` plant fails 4/10, so the green is not vacuous.
  - The coarse-tap `::after` reads scale 1, transparent, unplanted (`coarseTap`).
  - It is a **sub-choice** any family can borrow: B, C and F keep their extent mechanisms and paint seats this way.
  - Cost: 307 layouts / 35 ms per 240-move sweep (`D2-E.md` Q4), and the K-1 hostless arm.
- **The glide** (single-select on one anchored element) runs 208 ms with 0 reversals (`D2-E-proto.md` §3). It inherits K-3's wall on retarget.
- **The rim as a plate child** (W5 8/10, can fail).

## 7 · Verdict: BANK

- **Why not ADVANCE.** Problem 3 is half of the owner's brief (F-16, O-56 G-1), and this family cannot turn W-7 green within itself (K-2). D-1 fails on every retarget (K-3). A family that already reports W3 14/14 dominates it on problem 3 (SPECS witness totals: D2-B 14/14).
- **Why not BLOCK.** The stall is at a missing primitive (`anchor()` in `clip-path` or `mask`) as hard as the problem, and that alone would argue BLOCK. But the seat-projection half is independently sound and borrowable, so the family is worth keeping rather than stalling.
- **Why not RETIRE.** Nothing in its center is refuted. K-1 has a one-declaration cure.
- **Re-trigger (named).** Revive D2-E as a whole family when either engine ships `anchor()` / `anchor-size()` in `clip-path` or `mask-*`, *and* the other has it on a public roadmap. Re-probe with `D2-E.md` Q2's `CSS.supports` battery. Until then, bank the per-seat projection as a W2 and W-3t sub-choice for whichever family advances. It is carried with K-1's hostless arm, a paint floor on W2, and a `::after` read on W4.

## 8 · Convergence: 44 %

- **Counted:** the 5 witnesses weighted equally, less the vacuous greens. W1 and W2 are real where the lens and runauto plants are caught, but the dead-plate and missing-ring plants pass.
- **The rest:** W3 is 6/14 with faces unfixable in-family; W4's latch green is vacuous and the rung is absent; W5's geometry is real and its API is provisional.
- **Plus:** K-1 and K-3 open.

**Open gaps (exact):**
1. W-7 faces outside the plate on every growing transition (181.83 / 77.67 / 110.48 px): no in-family primitive.
2. Mid-flight reversal wall: +0.98 → −1.76 px/ms (Chromium), +1.73 → 0 → −1.10 (Playwright WebKit). D-1 unmet, and no witness exists.
3. Hostless seats paint 0 px of hover and selected, and a speck of focus ring (K-1). Needs the non-anchored hostless arm and a witness.
4. The overflow bit misjudges 0.25-0.75 px over the budget in Chromium (K-4).
5. The harness gaps this family exposed:
   - W1 needs plate extent ⊇ the dock box and seats (`cbwill`);
   - W2 needs a floor that the ring paints (`seatrel`);
   - W3's clock must come from the spring (response, ζ), not the carrier's token (`slowclock`);
   - W4's latch must read the seat's paint-bearing pseudos (`ungated`).
6. The containing-block law has no gate (K-5). Consumers are clean today, by grep.
7. PRM drops the fades (canon P6); card docks step radius, padding, veil and border at the flip (unmeasured).
8. `useDockSpring` survives beside the CSS carrier (two motion engines).
9. The rim `progress` prop: provisional, no consumer, under `aria-hidden`, breaks the six-member budget.
10. Canon P5 amendment (layout animation of the plate) is un-ruled by the owner.
11. Compact rung absent (W4 ×4, W5 ×1 per engine); coarse tap-through on the collapsed face (W4 tap-pins).
12. C-2 scroller lag measured by rect only (0 px after a frame); not read in paint.
13. Real Safari 26 / 27, every row: UNMEASURED (owner's safaridriver checkbox).

## 9 · Fences and slips

- **Git:** `worktree add` and `worktree remove --force` only. `git apply` / `git apply -R` were file edits inside my worktree; no index write.
- **Checkout writes:** only this file.
- **Slip:** during my demo builds, the checkout's `node_modules/.vite-temp` (empty before and after) had its mtime moved to 16:12:20. A transient temp file from Vite's config loader through the symlinked `node_modules`, the same slip the prototype seat recorded. Content unchanged.
- **Siblings:** read-only `grep` / `sed` in value.js, keyframes.js, fourier-analysis and chicago; nothing run or built there.
- **Browsers:** headless only, Playwright by absolute path; no MCP.
- **`~/.claude`:** not read.
