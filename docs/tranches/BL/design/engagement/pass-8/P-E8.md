# D5 · pass 8 · P-E8: E's part on P-A7, one arm, built to the invariant (REGISTRY §P7-8.1), and the `inplace-loupe` probe

| field | value |
|---|---|
| seat | P-E8, the prototype seat of D5 pass 8 (`§P7-8.3` wave 2), after H8's self-test |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | `master`. Seat start `47a2832e3`; at return `0e61efac7`. `git diff --stat 47a2832e3 HEAD -- src tests` is empty (docs only). `release/10.1.1`, `10.1.2`, `10.1.3` are not ancestors of HEAD, so F5‴ carries (§P7-8.2); no P-A8 (D3's lane has not reached the base) |
| rulings | INBOUND re-read at seat start and at return (mtime 2026-10-29 08:01, last row O-112, W-G's; the last D5 row is still O-103d). FORMATION-PROGRESS read to "D5 pass 8 launched". Nothing arrived mid-pass |
| engines | Chromium 149 and Playwright WebKit 26.5 (playwright 1.61.1), headless shell, from `glass-ui/node_modules/playwright`, no GPU arguments. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**, read against this seat's guarded WebKit run (O-103d (3)) |
| harness | H8's, unedited (hash `fb6f3cda`), the harness's own scene app (`310d45686fce`), builds from this seat's worktree. My own cells are one file, `E8/probe/e8-probe.mjs` (the loupe tip), on the harness's lib |
| worktree | `.claude/worktrees/bl/D5/p8/E8/wt`, detached at `47a2832e3`, `node_modules` symlinked; removed with `git worktree remove --force` at return. The empty directory `.claude/worktrees/bl/D5/p8/E8/` is left: its `rmdir` was refused by the permission system |
| records | `E8/`: runners (`builds.sh`, `gates.sh`, `stages.sh`, `stages-loop.sh`, `chain-chromium.sh`, `chain-webkit.sh`, `run.sh`, `mkpatch.sh`, `plants.py`, `static.sh`, `ck22-greps.sh`, `sum.sh`), `probe/e8-probe.mjs`, `logs/` (every stage log opens and closes with the 1/5/15-minute load), `json/`, `glance/`, `numstat*.txt`, `E8-own.diff.txt`, `probe-loop-variant.patch` (a record, §4.3) |

## 0 · In brief

1. **The candidate meets the invariant on every H8 cell, in both engines, and the pass-7 construction fails them.** A promoted body is no longer pinned by anchor. Each frame the stage reads the footprint where it stands and writes, together, the host's place (the footprint's painted centre, its layout size, its ancestors' scale as `transform`), its clip (`inset(… round …)` from the clipping ancestors' padding boxes and corner radii, in the painted frame) and its masks (each masking ancestor's computed `mask-image` over that ancestor's box). E-10 on the candidate: **58/0 Chromium, 58/0 WebKit**, the 14 H8 clip cells included. On the pass-7 construction (`plant-cand7`): **7 of 14 fail in Chromium, 6 of 14 in WebKit** (feather, radius and scale on keyboard and touch; the wheel film in Chromium only).
2. **The loupe alone leaves its place, and paints whole.** It is its own `popover="manual"`, hung by anchor from its own track, carrying the host's grow through one published figure (`--held-scale-x/-y`). E-13 `loupe whole` edge and mid, fine and coarse: **81 of 81 rows, 4/4 per engine**; the pass-7 construction 3-5 of 81 at the edge and 48 of 81 mid-box (4/4 FAIL per engine). The fill now ends square at the window's centre (`e8-probe tip`: spread 0.00 px, 4/4 per engine; pass-7's pill cap 3.60-3.87 px, 4/4 FAIL per engine); the housing draws its own hairline (`--glass-border-floating`). No lighting layer, no blur token touched.
3. **One reading under the invariant is not exact, in WebKit only.** The keyboard feather cell passes its bound in WebKit, but the ratio of ratios reads **×0.58** where an in-place body reads ×1 (Chromium ×1.02; WebKit touch ×0.98). The promoted body paints less than its place under the feather on the keyboard path. The cause is unmeasured; the one difference between the paths is the focus ring, which paints outside the host's border box, and the mask is written with `mask-clip: no-clip` so the ring is kept. That the engine drops `no-clip` is a hypothesis, not a reading (§7 gap 1). The probe reads ×0.99 there.
4. **The deletions.** `position-visibility: always` leaves, with the anchor pin it answered (P-1). `@property --veil-x/--veil-y` leave, and their one reader now reads the viewport's centre (E-1). `static.sh`: candidate 0 hits on every name, the pass-7 candidate 2 / 2 / 16 / 11 (PRESENT).
5. **CK-22: one MIGRATION table** (§6), 28 rows that supersede every per-pass row, with 19 source rows retired by name, M-24 restated as the bytes hold, M-20 restated on the `<Aurora>` mounts. The greps were re-run at this HEAD.
6. **The probe `inplace-loupe`** (a measured probe, not a candidate): the body grows in place under every modality, with no top layer, no footprint, no clip write and no anchor, and the loupe is the same popover. It reads the whole clip family green in both engines by construction (feather ×1.00/×0.99, radius 0 px², scale 0.0 px, film 0 px²), the loupe cells green, E-3 22/0, hand-off and singleton green, 3 files +59/−481 over the candidate. **Its cost is the stale-place cells: 16 of 58 E-10 cells fail in both engines without the per-frame read** (a re-render glides from a place a layout move left stale, up to 127.2 px). With the per-frame read kept (`probe-loop-variant.patch`) E-10 is 58/0 in both engines, at the candidate's idle loop. So the loop is the price of the re-render glide, not of the promotion.

## 1 · The patches

| file | sha1 (`shasum`) | applies (`E8/logs/apply-check.txt`) |
|---|---|---|
| `pass-8/P-E8.patch` (the candidate) | `5dc4d9308191275113ffff375f886a91b441b45b` | `git apply --check` clean on a `git archive` of HEAD `0e61efac7` |
| `pass-8/P-E8-inplace-loupe.patch` (the probe, over the candidate) | `fdccd7f4c6c76189f17f814a88f28f0a227d26e2` | clean on HEAD + `P-E8.patch` |
| `pass-8/E8/probe-loop-variant.patch` (a record: the probe with the per-frame read kept) | `a6060049ff084c79057f9cdd1adf21a5fecd04fc` | clean on HEAD + `P-E8.patch` + the probe |
| contains `pass-7/P-A7.patch` | `e6e42ba3cf37c47a67811aa7dec1fc1216448816` | the candidate was cut from a worktree at HEAD + `pass-7/P-E7.patch` (`a6c82db1…` = F5‴ + P-A6 + A7 + E7), plus E8's own change. E8 changes no A byte with a function: of the files P-A7 touched it edits a comment in `ModalOverlay.vue` and the veil centre in `focus-veil.css` |

The builds: `cand8` (the candidate), `probe`, `plant-cand7` (HEAD + `P-E7.patch`, the pass-7 construction), `plant-loupe6` (the candidate + `E8/plants.py loupe6`, the 2 px mark), `probe-loop` (`E8/logs/builds.log`, `build-probe-loop.log`). After every apply-build-revert the tree read back as the candidate's (`5dc4d930…`).

### What E8 changes over the pass-7 candidate

`E8/E8-own.diff.txt`, `E8/numstat-E8-own.txt`: **10 files, +372/−223; src 8 files, +294/−194.**

1. **`stage.ts`, the body to the invariant (CK-20).**
   - **No anchor.** The footprint name, the host's `position-anchor`, the consumer anchor set aside and written back, and `anchor()`/`anchor-size()` in `engage-stage.css` are deleted. The host is `position: fixed; inset: auto; box-sizing: border-box`. The stage writes `left`, `top`, `inline-size`, `block-size` and, under a scaled ancestor, `transform: scale(sx, sy)`: the footprint's layout size, centred on its painted centre. The grow (`scale`, about the centre) composes with it.
   - **`worldOf(footprint)`** walks the footprint's ancestors once. A clipping ancestor (an `overflow` other than `visible` on an axis, or paint containment) gives its padding box in the painted frame (border and client sizes scaled by its painted scale, which C-E7 found mixed), and its padding-box corner radii (border radius less border, px or %). A masking ancestor gives its computed `mask-image` and its painted box.
   - **`writePaint(h)`** writes the place, then maps the clip and the masks through the host's painted box into its own frame: `clip-path: inset(t r b l round …/…)`, where a corner is rounded only when one ancestor set both of its edges, and `mask-image`/`-position`/`-size` per layer, `no-repeat`, `border-box` origin, `no-clip`, `intersect` over the layers below. It writes only when the place, clip or masks changed.
   - The frame loop is unchanged: the resize step re-reads the rest box every frame while anything is on the stage, and now calls `writePaint`. A re-render's mutation calls it too.
   - The footprint is sized from the host's layout box (`offsetWidth/Height`), not its painted box: under `scale: 0.8` the painted size made a footprint 0.8 of the control, laid out and then scaled again.
2. **`engage-stage.css`.** The pin and `position-visibility: always` are deleted; the header says what the stage writes.
3. **The loupe (`Slider.vue`, `slider/styles.css`, `utilities/engage.css`).**
   - `.glass-loupe` is a `popover="manual"`, shown after the host's own promotion (so it stands above it), `position: fixed`, `left: anchor(center)`, `bottom: anchor(top)` against this slider's own track (`anchor-name: --glass-slider-track-<useId>` inline on `.slider-track`, `position-anchor` inline on the lens). The popover's UA box is neutralized in the rule. It stays the host's DOM child: it inherits the velocity term and the grow.
   - The grow is published once on `engage-held`: `--held-scale-x`, `--held-scale-y` (unregistered, so a child inherits the resolved value frame by frame), and the host scales by them. The lens carries `transform: scale(var(--held-scale-x), var(--held-scale-y))` (none under reduce), so it still magnifies the track as painted (band ×1.600 = k max).
   - The magnified fill has no radius of its own: it ends square at the window's centre. The clone's own pill clips its start.
   - The housing draws `1px solid var(--glass-border-floating)`, the floating rung's own hairline; the window keeps its ring of housing glass and its dissolving ends. No light, no blur token.
4. **The veil centre (`property-regs.css`, `focus-veil.css`).** `@property --veil-x/--veil-y` and their 16 `var()` reads are deleted; the mask's stops read `50%`. The Dialog overlay, the one reader, paints the same mask.
5. **Tests.** `engage-stage.test.ts`: the anchor test becomes "each control on its own footprint, pinned by no anchor" (no anchor name anywhere, the stylesheet names no `anchor()` or `position-visibility`, every written property removed on leave); the consumer-anchor test becomes "never touched"; new: a rounded card (the clip's `round` radii mapped through ×1.06), a masking card (the mask over the card's box in the host's frame, removed on leave) and its plant (no mask, none written). `focus-veil.test.ts`: the registration test becomes "no registered `--veil-x/--veil-y`, no reader".

### The probe, over the candidate (`P-E8-inplace-loupe.patch`, 3 files, +59/−481)

`stage.ts` keeps the holder, the singleton and its exit clock, the reach, the re-render glide and the loud read-back, in place under every modality. It deletes the promotion, the footprint, `writePaint`/`worldOf`, the wheel chain, and the per-frame read: the reach is re-read on the engagement, a scroll, a viewport resize and a re-render. `useEngage.ts` drops the promote predicate (and the scrub's touch flag it fed); `engage-stage.css` keeps only the reach. The loupe is the candidate's, unchanged: it is promoted wherever it shows (fine and touch holds; a keyboard engagement shows no loupe), so E-13's fine cells read the same construction in both builds. §P7-8.1 words the probe's loupe as "promoted on touch and keyboard"; a fine hold's loupe left inside its scroller would fail E-13's fine `loupe whole` cells, so it is promoted there too, as in the candidate.

## 2 · Cost (CK-23) and gates

| scope | files | lines | src | record |
|---|---:|---|---|---|
| whole candidate (F5‴ + P-A6 + A7 + E) | 198 | +5375/−1644 | 153 files, +3380/−1355 | `E8/numstat.txt` |
| the pass-7 candidate, for comparison | 198 | +5180/−1598 | 153 files, +3243/−1318 | same |
| E8's own change over P-E7 | 10 | +372/−223 | 8 files, +294/−194 | `E8/numstat-E8-own.txt` |
| the probe over the candidate | 3 | +59/−481 | 3 files, +59/−481 | `E8/numstat.txt` |

The candidate's src grows by 137 lines over pass 7 (`writePaint`, `worldOf`, the radii and masks). The probe would make E's src 422 lines smaller than the candidate's (481 − 59).

Gates, in the worktree, through `guarded`, one heavy run at a time:

| gate | candidate | probe | load at end |
|---|---|---|---|
| build (`logs/gate-build-*.log`) | exit 0 | exit 0 | 8.5 / 10.5 |
| typecheck, vue-tsc ×2 (`--light`) | exit 0 | exit 0 | 8.3 / 10.7 |
| `demo:dist:build` | exit 0 | not run | 8.2 |
| vitest `--maxWorkers=2` | **247 files; 2428 passed, 10 expected fail, 1 skipped; exit 0** | 243 files pass, 4 fail: 18 tests, 17 of them the promotion's own (`engage-stage.test.ts` 13, `focus-veil.test.ts` 2, `release-carry.test.ts` 1, its touch-promoted carry), and `boot-graph` (the dist-demo older than the probe's sources: `demo:dist:build` was not re-run for the probe) | 10.1 / 10.6 |

## 3 · E's must-prove list (§P7-8.1): each witness green, its plant red, both engines

Every figure is from a stage log under `E8/logs/` (Chromium `*-chromium-*.log`, WebKit `*-webkit-*.log`). Load is the 1-minute load at the stage's start; every cell line in the logs carries its own.

| item | witness | candidate · Chromium | candidate · WebKit | plant | plant · Chromium | plant · WebKit |
|---|---|---|---|---|---|---|
| CK-20 overflow box, both bounds | E-10 `clip-vanish · keyboard\|touch` | PASS / PASS, 0 px² outside, every step (12.0) | PASS / PASS, 0 px² (13.8) | `clipOnly`'s class, H8 §3.1 (library plant, read by H8 on cand7) | H8: FAIL / FAIL | H8: FAIL / FAIL |
| CK-20 feather | E-10 `clip feather · keyboard\|touch` | PASS / PASS, ratio of ratios **1.02 / 0.95** (≤ 1.10) | PASS / PASS, **0.58 / 0.98** (§0 item 3) | `plant-cand7` | **FAIL / FAIL**, 1.38 / 1.16 (7.0) | **FAIL / FAIL**, 1.39 / 1.16 (11.2) |
| CK-20 radius | E-10 `clip radius · keyboard\|touch` | PASS / PASS, 0 / 0 px² (≤ 16) | PASS / PASS, 0 / 0 px² | `plant-cand7` | **FAIL / FAIL**, 221 / 200 px² | **FAIL / FAIL**, 201 / 184 px² |
| CK-20 scaled ancestor | E-10 `clip place · scale · keyboard\|touch` | PASS / PASS, 0.0 px, ×1.060 | PASS / PASS, 0.0 px, ×1.060 | `plant-cand7` | **FAIL / FAIL**, 52.2 / 48.9 px, ×0.848 | **FAIL / FAIL**, 28.7 / 28.7 px, ×0.848 |
| CK-20 translated ancestor, untransformed | E-10 `clip place · translate\|none` (each modality) | PASS ×4, 0.0 px, ×1.060 | PASS ×4 | `plant-cand7` | PASS (the pass-7 construction is no defect there) | PASS |
| CK-20 the scroll film | E-10 `clip film · wheel\|smooth · engaged` | PASS / PASS, 0 px² in every frame of 3 films each | PASS / PASS, 0 px² | `plant-cand7` | **FAIL** (wheel: 366 px², over the bound) / PASS | PASS / PASS: the pass-7 lag does not show in WebKit's 25 fps video (H8 §5). H8's fixture plant `e10-rectclip-film` is the film cell's red in both engines (H8 §2) |
| CK-25 the loupe whole at the scroller's edge and mid-box | E-13 `loupe whole · edge\|mid · fine\|coarse` | **4/4 PASS**, 81 of 81 rows (reference 81/81) (6.6) | **4/4 PASS**, 81 of 81 (reference 81/81) (11.3) | `plant-cand7` | **4/4 FAIL**: edge 3 / 5 of 81, mid 48 of 81 | **4/4 FAIL**: the same rows (reference 80/81) |
| CK-25 the lens at k max | E-13 `slider loupe k max fine\|coarse light\|dark` | **4/4 PASS**: band ×1.600, tip 0.00 px, seam 0.0, line 0.0, runs on 0.07-0.11 | **4/4 PASS**, the same figures | `plant-loupe6` (the 2 px mark) | **4/4 FAIL** | **4/4 FAIL**: seam 37.4-44.2, line 46.7-52.9 levels |
| CK-25 no pill cap at the window's centre | `e8-probe tip` (mine; H8 §5 gap 1) | **4/4 PASS**, spread 0.00 px (≤ 1.5) | **4/4 PASS**, 0.00 px | `plant-cand7` (the fill's own cap) | **4/4 FAIL**, 3.73-3.87 px | **4/4 FAIL**, 3.60-3.64 px |
| P-1 `position-visibility`; the anchor pin | `E8/static.sh` (`logs/static-deletion.txt`) | **DELETED**: 0 declarations, 0 anchor names, 0 `anchor()` in the stage | — | the pass-7 candidate | **PRESENT**: 2 declarations, 11 pin lines | — |
| E-1 `@property --veil-x/--veil-y` | `static.sh`; unit `focus-veil.test.ts` | **DELETED**: 0 registrations, 0 readers; unit PASS | — | the pass-7 candidate | **PRESENT**: 2 registrations, 16 readers | — |
| the pass-7 deletion holds | `static.sh` (E7's five names) | 0 | — | — | — | — |

`position-visibility` has no path to show: nothing is anchored, so the property has nothing to answer, and it leaves rather than gets a cell (P-1). The film's WebKit plant is H8's fixture plant, not the library's; that is the one CK-20 cell whose library plant is red in one engine only.

## 4 · The battery on the candidate, both engines (harness `fb6f3cda`, build `cand8`, the harness's own app)

Chromium ran stage by stage, one `guarded` call each, 10:05-10:46 (`logs/chain-chromium.log`). **WebKit ran in one `guarded --exclusive webkit --timeout 90` acquisition**: queued 10:50:52, admitted 10:51:30, released 11:39:54, exit 0 (`logs/chain-webkit-w1.log`). No WebKit stage was skipped. The browser was retired at 60 navigations and relaunched three times (E-10, E-11, E-12; the AppSSO wall, tile H3-1); no page closed outside that.

| witness | Chromium P/F/U · load | WebKit P/F/U · load | every fail, whose |
|---|---|---|---|
| E-1 | 93/1/2 · 10.3 | 93/3/0 · 10.9 | `dock` latch 54/55 (D2). Ambient: Chromium UNMEASURED (the `css` substrate, engine limit); WebKit 1.74 levels against 1.27 at rest (D3's amplitude) and the reduce leg 0.00 (A's, gated on D3's lane) |
| E-2 `--commit-arms i,ii` | **164/0/0** · 9.8 | **164/0/0** · 12.9 | — |
| E-3 | **22/0/0** · 8.1 | **22/0/0** · 9.2 | — |
| E-4 | **18/0/0** · 7.3 | 15/0/4 · 8.8 | WebKit's 4: the Carousel's engine fact (O-103d (4)). Slider carry: Chromium 12.06-12.58 px at 1003-1088 px/s, WebKit 12.77-13.59 px at 1290-1333 px/s; sortable 20.82 px at 923 px/s / 32.98 px at 1429 px/s |
| E-5 | **56/0/0** · 9.4 | **56/0/0** · 11.9 | — |
| E-6 | 4/2/8 · 7.0 | 2/2/8 · 7.8 | `s6 present`: S6 RETIRED (O-103d (2)) |
| E-7 | 6/1/0 · 6.8 | 6/1/0 · 7.8 | `data-held` in `GlassDock.vue` (D2) |
| E-8 | **19/0/0** · 7.3 | **19/0/0** · 7.6 | — |
| E-9 | **85/0/0** · 7.7 | **85/0/0** · 9.9 | — |
| E-9 `--prm-plant` | 40/32 · 7.1 | 40/32 · 16.7 | H7's plant, red as it must be |
| E-10 | **58/0/0** · 12.0 | **58/0/0** · 13.8 | — |
| E-11 | 11/0/5 · 8.3 | 11/0/5 · 13.6 | the five UNMEASURED are tokens not read on that control's commit path (H8 §5; the Switch's `--scale-commit-pop` among them), A's shape |
| E-12 | **102/0/0** · 8.0 | 101/0/1 · 4.7 | WebKit `rest layouts`: the engine fact. The slider's wheel and consumer-anchor cells pass |
| E-13 | **8/0/0** · 6.6 | **8/0/0** · 11.3 | — |
| CAP | 18/0 · 8.2 | 18/0 · 6.7 | the glance set, §5 |
| `e8-probe tip` | **4/0** · 7.1 | **4/0** · 10.2 | — |
| `ca6-probe idle` | REPORT: engaged idle 133.0 rAF and RO callbacks/s, off-screen 133.3/s, **0.0 layouts/s, 0.0 style recalcs/s**; 0 at rest and after Escape (9.1) | REPORT: 98.3/s on- and off-screen, 0 at rest and after Escape, no layout counter (10.3) | stated, not bounded (§P6-7 item 11) |

### 4.1 Per CK row, the candidate (each engine, with load)

| CK | Chromium | WebKit | reading |
|---|---|---|---|
| **20** | E-10 58/0 (12.0): the 14 clip cells (§3), hand-off drop 0.0070 / rev 0.0066 against own release 0.0072; singleton fwd 121 frames and rev 120 frames, max 1 engaged; Escape 0.0066 against 0.0072 + 0.002; re-render landing 1.2 px; the 12 clipped stale-place cells PASS | E-10 58/0 (13.8) | **Built to the invariant on every ancestor kind H8 reads**, the pass-7 construction red on each (§3). One reading is not exact: the WebKit keyboard feather ×0.58 (§0 item 3, §7 gap 1). Not read by any cell: an ancestor `clip-path`, `opacity` or `filter`, a rotated ancestor, a scroll the compositor runs on a page with no wheel over the control (§7 gaps 2-4) |
| **25** | E-13 8/0, tip 4/0; glance set (§5) | E-13 8/0, tip 4/0 | **The loupe leaves its place and paints whole; the centre is not a cap; the housing has its own edge.** The lens read is the critics' (CK-25, from frames: `E8/glance/loupe/`, `E8/glance/cand8/`) |
| **05** | E-4 slider 5/5 at 12.06-12.58 px, sortable PASS, velocity printed (7.3) | E-4 slider 5/5 at 12.77-13.59 px (8.8) | no regression; the carry rides the body (E7) |
| **16** | rest 0; engaged idle 133/s, 0 layouts, 0 recalcs | rest 0; 98/s | holds by its letter; the idle cost is the pass-7 figure |
| **22** | §6 | — | one table |
| **23** | §2 | — | measured |
| **26** | the loupe's change is a deletion (the fill radius), a hairline of an existing token, a popover; no light layer, no blur token | same | holds |
| **27** | every item of §3 has a plant red in both engines, the film's (WebKit) being H8's fixture plant | same | holds |
| **04, 14, 15** | E-3 22/0; E-12 coarse cells; E-10 singletons | same | no regression |
| **01, 17, 19** | D2's latch and `:active`, D3's amplitude and lane, A's reduce leg | same | not E's; unchanged |
| others | E-2, E-5, E-8, E-9, E-11, E-12, CAP as pass 7 | same | no regression in either engine |

Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.

## 5 · The owner-glance set (CK-25)

`capture.mjs` on the harness's own app, for the candidate and the probe, both engines: nine class exemplars × rest, pressed, held, engaged, committed, released × light and dark × fine and coarse = **216 frames per build and engine** (864 frames), CAP 18/0 on each of the four runs.

| what | path (under `pass-8/E8/glance/`) |
|---|---|
| candidate frames, sheets | `cand8/frames/cand8-{chromium,webkit}-{fine,coarse}-{light,dark}-<scene>-<state>.png`; sheets `cand8/cand8-{chromium,webkit}-{fine,coarse}.png` |
| probe frames, sheets | `probe/frames/probe-…`; sheets `probe/probe-{chromium,webkit}-{fine,coarse}.png` |
| the loupe at k max, sustained | `loupe/cand8/e13-{chromium,webkit}-slider-{fine,coarse}-{light,dark}-loupe.png`; the probe's in `loupe/probe/` |
| the loupe at the scroller's edge and mid-box, against the pass-7 construction | `loupe/cand8/e13-*-clipstale-{edge,mid}-{fine,coarse}-loupe-whole.png` against `loupe/plant-cand7/e13-*-clipstale-…` |
| the tip, against the pass-7 cap | `loupe/cand8/e8-*-tip.png` against `loupe/plant-cand7/e8-*-tip.png` |

My reading of the frames (the gestalt is the critics'): the lens now ends its fill on a straight cut at the centre, so the value reads as a point on a ruler seen through glass rather than a knob; the hairline gives the housing an edge at the floating rung's whisper; the dark housing is still the near-black plate (the 10.2.0 token wave's). At the scroller's top edge the lens sits whole over the card's line where pass 7 showed a sliver.

## 6 · CK-22 · THE MIGRATION table for the candidate (one table, P-3)

This table is the candidate's one MIGRATION record. It supersedes every per-pass row: `pass-2/P-A2.md` §4, `pass-2/P-E2.md` §4 rows 1-9, `pass-3/P-A3.md` §4 (M-1..M-7), `pass-3/P-E3.md` §4 (E-M1..E-M5), `pass-4/P-A4.md` §4 (M-8..M-11), `pass-4/P-E4.md` §4 (E-M1 restated, E-M6, E-M7), `pass-5/P-A5.md` (rows 1-4), `pass-5/P-E5.md` §4.1 (E-M8..E-M10), `pass-7/P-A7.md` §5 (M-12..M-22) and `pass-7/P-E7.md` §6 (M-23..M-26). Each source row is carried into one row below (the "from" column) or retired by name in §6.2. Consumer counts: `E8/ck22-greps.sh` → `E8/logs/ck22-greps.txt`, re-run at this seat (glass-ui HEAD `bf2c9491b`, sibling HEADs printed), read-only, value.js by grep only, nothing built or run in any sibling. The material-class census (C-19) and the Dialog/Sheet counts (C-17) are P-A7's (`pass-7/A7/logs/`): A's bytes are unchanged, so they were not re-run.

### 6.1 The rows

| # | consumer-visible change | from | consumer sites at the pass-8 HEAD | row (for `MIGRATION.md` at the cut) |
|---|---|---|---|---|
| C-1 | `.tap-squish` and `.interactive-item` are deleted | P-A2 §4 | `tap-squish`: chicago 3 (`TempApp.vue:298,310,336`, on `DockControl`), speedtest 4 live (`PhaseTimeline.vue:34`, `AdminDataSourceToggle.vue:110`, `SurveyResultDock.vue:113`, `AddressAutocomplete.vue:74`) and 1 comment (`AdminDashboardLayout.vue:72`), keyframes.js 1 (`EasingField.vue:40`); `interactive-item`: keyframes.js 1 (a comment, `MbabbMenu.vue:45`), fourier-analysis 1 (a test, `f-w14v-c3.spec.ts:156`) | "`.tap-squish` and `.interactive-item` are gone. Use the member's own engage class, or `glass-menu-row focus-ring` on a menu row." (chicago's three are on D2's dock; `EasingField.vue:40` waits on D2's `glass-capsule-hover` retirement) |
| C-2 | An engaged Slider or scrubbing NumberField: a **fine pointer's hold grows it in place**; **a touch's hold and a keyboard engagement promote it** into the top layer (Q-3 (c)). Promoted, the host carries `popover="manual"`, `data-engage-stage`, an `.engage-footprint` previous sibling, and, inline and only while promoted, `left`, `top`, `inline-size`, `block-size`, `transform` (its ancestors' scale), `clip-path` and `mask-*`. It paints what its place paints: its scrollers' and cards' clips (rounded corners included), their masks (a `FadingScroll` feather), their translation and scale | P-E2 rows 1, 5; E-M7's `"coarse"` clause; M-24; replaces E-M1 | `<Slider>`: atlas 2, bbnf-buddy 1, keyframes.js 4, speedtest 2, value.js 6, fourier-analysis 5, sci-report 5. `<NumberField>`: keyframes.js 1, speedtest 6, value.js 1, fourier-analysis 1. `position-anchor`/`clip-path`/`mask-image`/`transform` on a slider or number-field rule: 0. `.engage-footprint`/`data-engage-stage`/`data-engaged`: 0 | "A Slider or NumberField engaged by a touch or the keyboard rises over its neighbours and keeps the look of its place: a scroller or card that clips, rounds, fades or scales it at rest does the same while it is engaged. While engaged it is a `popover`, an `.engage-footprint` stands before it (a `:first-child`, `+` or `~` rule around it can change for the duration), and the library writes `left`, `top`, `inline-size`, `block-size`, `transform`, `clip-path` and `mask-*` on it inline: do not set those on a slider or number-field root. A fine pointer's hold grows the control where it stands, in its own stacking context, so a later positioned sibling can paint over it." |
| C-3 | A consumer's own inline `position-anchor` on the host is never touched: the stage names no anchor | replaces E-M1 (restated) | 0 | "The stage writes no anchor name; a `position-anchor` of yours on a Slider or NumberField host stays as you set it." |
| C-4 | No engagement veils the world. `.glass-focus-veil` is a public class whose one library reader is the Dialog's overlay (`[data-state="open"] > .glass-focus-veil`), centred on the viewport | P-E2 row 2's `noveil` arm, E-M4's veil clause, E-M8's `false` arm, M-23 | `glass-focus-veil`: 0 | "An engaged control never frosts the page. A `.glass-focus-veil` of yours rises under an open `data-state` parent, at the viewport's centre." |
| C-5 | `@property --veil-x` and `--veil-y` are deleted; the veil reads the viewport's centre (50 %) | new (P-1, E-1) | atlas 2 writes (`useAuroraVeil.ts:116-117`, on its own stage host); no `var(--veil-x\|y)` reader in atlas source | "glass-ui no longer registers `--veil-x`/`--veil-y`. A value you write under those names is your own custom property (it inherits, is not type-checked, does not interpolate). atlas writes both and reads neither, so nothing paints differently." |
| C-6 | `data-engaged` is written by the stage alone, on the control; the door's `engagedOn` option is deleted, with no alias | P-E2 row 4's control clause | 0 | "`data-engaged` marks an engaged control; the library writes it, only on the control." |
| C-7 | Keyboard engagement (Tab into a slider, or an acting key on it) promotes and grows ×1.06; a script `focus()` and a printable key's script focus engage nothing | P-E2 row 2's keyboard clause | — | "Tab, or an arrow, Page, Home or End key, engages a slider; a script focus does not." |
| C-8 | Escape inside a Dialog: the first Escape on an engaged slider releases it and is spent (`preventDefault`); the Dialog closes on the next | P-E2 row 3 | Dialog sites as C-17 | "The first Escape on an engaged control releases it; a `window` Escape listener sees `defaultPrevented` on that one." |
| C-9 | The loupe is the Slider host's DOM child and its own top-layer `popover="manual"`, hung by anchor from its own track (an inline `anchor-name: --glass-slider-track-<id>` on `.slider-track`, an inline `position-anchor` on the lens). It paints whole above any scroller or card. The magnified fill ends square at the window's centre; the housing draws its own hairline; there is no value mark; the window's ends dissolve the band; the clone sits inside `.glass-loupe-window` | P-E2 row 5's loupe clause, E-M10, M-25 | `glass-loupe`: 0 | "The loupe floats over its slider wherever the slider sits, a popover of its own; there is no mark element, and `.glass-loupe > .glass-loupe-clone` does not match (the clone is in `.glass-loupe-window`). Do not set `anchor-name` on `.slider-track`." |
| C-10 | `engage-held` hosts publish their grow as `--held-scale-x`/`--held-scale-y` (unregistered, inherited) and scale by them | new | `--held-scale-*`, `--stage-reach`, `--stage-room`, `--stage-w`: 0 | "An engaged held control's grow is `--held-scale-x`/`--held-scale-y`; read them, do not write them." |
| C-11 | NumberField scrub: a press that starts on the input and travels scrubs one step per `--scrub-pitch` (`1ch`), loud on an unreadable pitch; a press on a step button is the button's; the input sets `touch-action: pan-y`; dragging inside the field no longer selects text (a clean break) | P-E2 row 6 (as superseded by E-M3), E-M2, E-M3, E-M4's touch clause | `<NumberField>` as C-2 | E-M2 and E-M3 as written; E-M4: "The input sets `touch-action: pan-y`: a horizontal touch drag scrubs, a vertical one scrolls; a consumer `touch-action` on the input overrides it." |
| C-12 | `ACTIVATION_SLOP_PX` is `HOLD_SLOP_PX` | P-E2 row 7 | 0 (internal) | none needed |
| C-13 | `--scale-engage` mirrors the ladder's engaged row | P-E2 row 8 | 0 | "Override `--scale-engage` together with the ladder's engaged row." |
| C-14 | A wheel over a promoted control scrolls the nearest scroller its footprint sits in, honouring its `overscroll-behavior`; a pinch and a line- or page-mode delta go to the platform | E-M6 | — | E-M6 as written |
| C-15 | The Slider's press reads `[data-held]`, not `:active` | E-M9 | `.glass-slider…:active`: 0 | E-M9 as written |
| C-16 | The release carry rides the range on and off the stage | M-26 | `flingStage`/`useEngageStage`/`STAGE_VEIL`/`POINTER_STAGE`: 0 | M-26 as written |
| C-17 | DialogContent's presented plate fades under reduced motion (opacity only) | M-18 | (P-A7's count) atlas 7, chicago 2, keyframes.js 12, slides 2, speedtest 13, value.js 23, fourier-analysis 14 | M-18 as written |
| C-18 | A committing member's press keys on `data-press`, not `:active`; Enter presses a disclosure trigger as Space does | M-8 | `:active` on a member: 0 | M-8 as written |
| C-19 | The material classes, the sortable row and handle, and the dialog and sheet close buttons press on `[data-press]::before`; `usePressMark`/`UsePressMarkOptions` are exported on `/motion-core` | M-12, M-19, M-21 | (P-A7's census) one pressable material site, slides `DeckSettings.vue:149` | M-12 as written |
| C-20 | `--glass-btn-press-t` is `--press-t`, no alias | M-3, M-13 | 0 in source | M-13 as written |
| C-21 | The commit pop on eight members, on the root's `transform`; under reduce an instant state change | M-14 | 0 | M-14 as written |
| C-22 | The crest rows (`--scale-commit-pop = 2 − --scale-press`; `--scale-commit-pop-bit` deleted; a command and the bit pop on `--scale-engage`) | M-15 | 0 | M-15 as written |
| C-23 | The commit light is retired | M-16 | 0 | M-16 as written |
| C-24 | `ConfiguratorPresetChip`, a `chosen` member, is the default preset chip | M-17 | `<Configurator>`: fourier-analysis 2 | M-17 as written |
| C-25 | The Switch thumb's press ink is the both rung | M-22 | 0 | M-22 as written |
| C-26 | Disclosure triggers: hover is a foreground wash (`--fill-hover`), press its ink ×2; the selectable Card and the Button's quiet and text emphases press on `data-press` | P-A5 rows 1-3, M-10 | `disclosure-trigger`: value.js 1 (a comment) | P-A5 rows 1-3 as written |
| C-27 | `PopoverTrigger as-child` gives the child `engage-disclosed`; state members arm one frame after mount (`data-engage-arming`); Timeline's root is `static`, its marks `pressed`; the engage recipes own their host's `transition` list | M-2, M-4, M-5, M-6 | as P-A3 §4 (A's bytes unchanged) | M-2, M-4, M-5, M-6 as written |
| C-28 | **The Aurora root's pointer leg**: the root writes the cursor from a pointer over it until a consumer calls `setCursor`/`clearCursor`, which owns it for the mount's life | M-20, **restated on the `<Aurora>` mounts** | `<Aurora>` mounts: atlas `Aurora.vue:150` (`<GlassAurora>`, mounted from `Atmosphere.vue:137`; `pointer-events: none` at `Aurora.vue:170`, `Atmosphere.vue:166,179,188`), speedtest `App.vue:48` (`pointer-events-none`, `:51`), keyframes.js `HeroAurora.vue:25` (`pointer-events-none`, `:27`). sci-report's hit (`DashboardView.vue:196`) is a comment; value.js mounts none (`useAurora` with its own window listener). `setCursor`/`clearCursor` callers: keyframes.js `HeroAurora.vue:223,227`, value.js `useAtmosphere.ts:315,320` | "An `<Aurora>` answers a pointer over its root by itself; `setCursor`/`clearCursor` takes the cursor over. Every `<Aurora>` mount in the siblings is `pointer-events: none`, so the root's own leg never fires there, and nothing changes for any of them." |

### 6.2 Retired by name

| source row | why |
|---|---|
| **P-E2 §4 row 1** ("escapes ancestor clipping, stacking and `overflow`"; "covers the hand, Tab, and an acting key"; "pinned to the footprint (`anchor-size`)") | false on the candidate: a promoted control paints what its place paints, a fine pointer does not promote, nothing is pinned by anchor. C-2 replaces it |
| **P-E2 §4 row 2**, its `veil` arm ("the world frosts") | the veil arm is deleted (O-103d (5)). The keyboard clause is C-7, the `noveil` arm C-4 |
| **P-E2 §4 row 4**, its veil clause ("and on the stage's one veil (a `<body>` child popover)") | the stage makes no veil. The control clause is C-6 |
| P-E2 §4 row 5's loupe clause ("the loupe is the host's child") | half true now: C-9 |
| P-E2 §4 row 6 ("one step per 8 px") | superseded by E-M3 (C-11) |
| P-E2 §4 row 9 (the orphan-CSS gate's exception) | a repository gate, no consumer surface |
| **E-M1** and its pass-4 restatement (`--engage-footprint-<page>-<n>`; a consumer `position-anchor` set aside and written back) | the stage names no anchor (C-3) |
| E-M4's "(the Slider's hold still does)" | no engagement veils (C-4) |
| **E-M5** (the veil rests at `visibility: hidden`) | the visibility arm left in pass 7: `focus-veil.css` declares no `visibility` |
| **E-M7's `"every"` clause** ("E-M1 as written, for every pointer") and its `"coarse"` clause's "an `overflow: hidden` ancestor clips … the Slider's loupe" | the arm is deleted; the loupe now leaves its place (C-9). The rest of the `"coarse"` clause is C-2 |
| **E-M8's `true` arm** ("a hand's promotion and a keyboard engagement raise the stage's one veil") | the veil arm is deleted. The `false` arm is C-4 |
| **M-24** ("clipped to the box that clips its place … never dropped whole by the UA (`position-visibility: always`)"; "stays inside the scroller or card … as it does at rest") | it described the pass-7 bytes: an overflow rectangle only, and a declaration with no path. C-2 states what the bytes hold now |
| M-23, M-25 | C-4, C-9 |
| **M-1** (the member root's `::after` seat, `position: relative`, `isolation: isolate`) | the seat left with the commit light (M-16): `utilities/engage.css` declares no member `::after` seat and no `isolation` |
| M-7 | a pointer to E's rows; this table is that record |
| M-9, P-A5 row 4 | retired by P-A7 (M-16); named again so no reader finds them live |
| **M-11** (the bit's commit light starts +120 ms after the fill) | the commit light is retired (C-23) |
| M-20 as P-A7 wrote it (a census of `setCursor` callers) | it counted the wrong population; C-28 states it on the `<Aurora>` mounts |

## 7 · The probe `inplace-loupe`, read beside the candidate (for Q-3′; not scored)

| cell | probe · Chromium | probe · WebKit | candidate · Chromium / WebKit |
|---|---|---|---|
| E-10 clip family (14 cells: vanish, feather, radius, place ×3, film ×2; keyboard and touch) | **14/14 PASS**: feather 1.00 / 1.00, radius 0 / 0 px², scale 0.0 px ×1.050, film 0 px² (6.0) | **14/14 PASS**: feather 0.99 / 1.00, radius 0 / 0, scale 0.0 px ×1.050, film 0 px² (7.9) | 14/14 / 14/14 (feather 1.02, 0.95 / **0.58**, 0.98) |
| E-10 hand-off drop, rev, singleton fwd and rev; Escape; re-render landing | PASS ×7 (drop 0.0070, rev 0.0068 against own 0.0079; singleton 120 / 117 frames, max 1 engaged) | PASS ×7 | PASS ×7 / PASS ×7 |
| E-10 stale place (restale ×6, clipstale ×12) | **16 FAIL**: a style-write move, then a mutation, glides from the stale place (up to 127.2 px in one frame) | **16 FAIL**, the same cells | PASS / PASS |
| E-10 whole | 42/16/0 | 42/16/0 | 58/0 / 58/0 |
| E-13 (k max ×4, loupe whole ×4) | **8/0** (13.0) | **8/0** (8.1) | 8/0 / 8/0 |
| `e8-probe tip` | 4/0 | 4/0 | 4/0 / 4/0 |
| E-3 (CK-04: desk and phone, keyboard and touch-held, PRM) | **22/0** (10.4): keyboard-focused ×1.060, phone touch-held inline ×1.000 within the 16 px gutter | **22/0** (8.3) | 22/0 / 22/0 |
| E-3's four plants | fixture faults (`e3-tabhand`, `e3-latch`, `e3-modifier`, `e3-charkey`): H8's self-test of record, E-3 22/22 on the clean fixture in both engines; they do not read a library build, so they were not re-run here | — | — |
| idle loop (`ca6-probe idle`) | **0.0 rAF and RO callbacks/s** engaged, on- and off-screen; 0 layouts | **0.0/s** | 133 / 98 per s |
| CAP (glance set) | 18/0 | 18/0 | 18/0 / 18/0 |
| CK-23 | E's src −422 lines against the candidate (3 files, +59/−481) | — | — |
| vitest | 18 tests fail: 17 promotion tests, 1 stale `dist-demo` gate (§2) | — | 0 |

### 7.1 The loop is the re-render glide's price, not the promotion's

The probe's 16 stale-place failures are its deleted per-frame read, not its in-place body: a re-render's glide starts from "the place last painted", and without the frame read a layout move (a style write, a centred shrink, a move inside a clipping scroller) leaves that place stale, so the next mutation glides across the whole move. `probe-loop-variant.patch` keeps the frame read (re-observe the in-place host each frame, re-read its flow box in the resize step), nothing else:

| build | E-10 Chromium | E-10 WebKit | idle engaged Chromium | idle engaged WebKit |
|---|---|---|---|---|
| probe + the frame read | **58/0/0** (10.3) | **58/0/0** (10.1) | 129.0 rAF and RO/s, 127.0 off-screen, 0 layouts, 0 recalcs (14.6) | 98.0/s (8.6) |

So the in-place body with the frame read is green on the whole of E-10 in both engines and costs the candidate's idle loop. Without the frame read it costs nothing at idle and fails the 16 stale-place cells. The choice between those two is independent of Q-3′: Q-3′ is whether the body promotes at all.

### 7.2 What the two constructions differ by, measured

- **Paint.** Both meet the invariant on every H8 cell in both engines. The candidate reproduces its place's paint by script and reads ×0.58 on the WebKit keyboard feather; the probe is its place and reads ×0.99-1.00 everywhere.
- **Cost.** The candidate's E src is 422 lines larger than the probe's. The candidate writes six to thirteen inline properties per promoted frame that moves; the probe writes none.
- **Stacking.** Only the candidate rises over a later positioned sibling of its place; no H8 cell reads that, and both read E-3 and E-12 green.
- **Known paths neither reads.** An ancestor `clip-path`, `opacity` or `filter`, a rotated ancestor: the probe takes them by construction; the candidate does not carry them (§8 gap 2).

## 8 · Open gaps

1. **The WebKit keyboard feather reads ×0.58** (`cand8-webkit-E-10.log`, load 15.2), inside the cell's bound (≤ 1.10) and outside the invariant's "exactly" (an in-place body reads ×1; the probe ×0.99 in the same engine; the candidate's WebKit touch ×0.98, Chromium keyboard ×1.02). Cause unmeasured. The keyboard path alone paints a focus ring outside the host's border box, and the mask is written `mask-clip: no-clip` to keep it; whether Playwright WebKit 26.5 honours `no-clip` was not read. A second WebKit acquisition for it was not forced by the 90-minute cap, so it was not taken. This is the one ancestor kind on which the candidate's paint is not shown exact in both engines.
2. **Ancestor kinds the candidate does not carry, and no cell reads:** a `clip-path` or `opacity` or `filter` on an ancestor, a rotated or skewed ancestor (the place maps scale and translation only), a mask with its own size, position or repeat (the mask is laid over the ancestor's border box). The library's own masks over a scroller are `FadingScroll`'s, which fill their box.
3. **A scroll the compositor runs without the wheel over the control** (a scrollbar drag, a touch pan elsewhere in the scroller, a page scroll) moves the place one frame before the main thread re-reads it in Chromium. Place, clip and masks are written together, so nothing paints outside the clip, but the body can trail its place by a frame. The film cell drives the wheel over the box (main thread through the stage's wheel listener) and reads 0 px²; no cell films the other scrolls.
4. **The idle frame loop** is unchanged (133 / 98 per s engaged, 0 layouts): stated, not bounded. §7.1 measures what removing it costs.
5. **The lens edge and the knob are frame reads.** `e8-probe tip` gates the square end; nothing gates "the housing's own edge" beyond the frames (H8 §5 gap 1).
6. **CK-20's film has no library plant red in WebKit** (the pass-7 construction passes WebKit's film); H8's fixture plant `e10-rectclip-film` is its red cell in both engines.
7. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** on every row.

## 9 · Process

- **Machine law.** Every build, test and browser run went through `~/.claude/guard/guarded`; `--light` only on the typecheck and focused unit runs. Chromium ran one stage per guarded call (10:05-10:46, then the loop variant 10:47-10:50). WebKit ran in **one** `--exclusive webkit --timeout 90` acquisition after the Chromium phases: queued 10:50:52, admitted 10:51:30 (38 s wait), released 11:39:54 (48 min), exit 0. One heavy run at a time; vitest `--maxWorkers=2`; one browser per run with a context per cell (the harness's own); no GPU arguments. No guard refusal; the kernel zone never gated a run. Loads 4.7-16.7 across the seat; no cell failed under load that passed on a re-read, or the reverse, so no NOT-REPRODUCED reading is needed.
- **Fences.** No tracked file in the checkout was edited, and no git write in the checkout beyond `git worktree add`/`remove`. Checkout writes are only `pass-8/P-E8.patch`, `pass-8/P-E8-inplace-loupe.patch`, `pass-8/P-E8.md` and `pass-8/E8/`. Siblings were read by grep only. Nothing under `~/.claude` was read; `guarded` was executed.
- **Slips, mine.**
  - Two shell commands of mine waited on standard input (a `cat >` with no input, and a `git apply --check --reverse` with no patch argument) and were stopped with TaskStop; neither wrote a file in the checkout.
  - The first loupe build removed the housing's ring (the window as the whole housing). E-13's `runs on` cell failed in light (0.69, bound 0.35), because its glass sample then fell outside the pill's end; the ring was restored before any battery of record (`logs/dev2-e13-chromium.log` is the passing re-read; `dev1-*` are superseded).
  - The first static run applied the patches to a `src`-only archive and printed `patch` rejects (its `Oops.rej` files were in the removed scratch tree); re-run on a full archive (`logs/static-deletion.txt` is of record).
  - Reverting the probe-loop build left the worktree's three probe files in an unclear state; I restored them from my saved copies of the candidate's and re-read the tree hash as the candidate's (`5dc4d930…`) before any stage that reads the tree (the WebKit acquisition).
- **Cleanup.** The worktree was removed (`git worktree remove --force`, exit 0, absent from `git worktree list`). The empty directory `.claude/worktrees/bl/D5/p8/E8/` remains: its `rmdir` was refused by the permission system. No P-E8 process is left running (`pgrep` on the seat's runners: none).
