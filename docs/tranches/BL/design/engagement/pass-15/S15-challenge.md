# D5 pass 15 · S15 challenge (§P14-8.2 wave 1b): 11 findings against S15, 3 S15 claims confirmed, 1 hypothesis of this seat refuted

| field | value |
|---|---|
| seat | S15 challenge (wave 1b): attacks `P-E15.md` part S (S15 and its FOLD) statically and with library-free engine reads in both engines. **Scores no row** |
| model | `claude-opus-5-5`, asserted from own system identity. Authored no D5 seat and was no critic in passes 3-14 |
| status | **COMPLETE.** Every stage this report cites ran to its end: Chromium ×3, WebKit ×1. `guarded` refused nothing; the zone warning printed on every call |
| base | HEAD `eb845639f`. **cand14 = HEAD + `pass-14/P-E14.patch` `5989adedb3271e5a23db9290cc250682afc3131e`** (this seat's `shasum`), applied in `.claude/worktrees/bl/D5/p15/S15ch/wt` for the static read only (no build; no cell loads library bytes). The worktree was removed at close |
| rulings | `../../audit/INBOUND.md` re-read at start: last row **O-185** (the dock grain's `url()` LCP; no D5 cell or CK row). `../../FORMATION-PROGRESS.md` re-read at start: last line 2026-11-08 23:55, "**Q-14 is with the owner**". Q-14 is unanswered, so this report reads S15-d4 in both branches. In force: O-103d (1)-(4), O-103f (1)-(4) ((3) as written), Q-1 (c), Q-4 (b), O-118 (3), O-87; E-1, E-2, D-1..D-3, P-1, P-3. The checklist is CK-01..CK-27, unchanged |
| read | REGISTRY.md in chunks: "D5 · pass 14 · REGISTRY" (3774-3965, the spec of record), "D5 · pass 14 · completion" (3968-4119), §P13c-8.1 (3607-3633). `pass-15/P-E15.md` in full (S15-0..S15-j, S15-facts, S15-FOLD). cand14's `stage.ts` 1-824 in full, `settle.ts` `dockClockMs`/`easingOf`, `utilities/engage.css` (the declared reads, `engage-held`), `glass/engage-stage.css` (`@property --stage-reach`), `tokens/scheme-spring.css` 103-116, `Slider.vue` 225-262 and `slider/styles.css` 440-520 (the loupe). `pass-13/C-E13.md` D8-D9, `C-E13-complete.md` 25, 104-105, `C-E13c/ce13c-probe.mjs` 253-286 (D8's scene). `S15-records/facts15.mjs` (the harness form) |
| left unread, stated | REGISTRY.md's passes 1-12 and the pass-13 parts beyond §P13c-8.1. §P1-6 is unread: S15 cites it, and no finding below rests on it. `P-E14.md` and `H14.md` beyond what S15 and §P14 quote. Every C-A14 and C-E14 stage log; the B1 figures are cited from REGISTRY §P14c-3 |
| instruments | `S15ch-records/ch15.mjs`: 10 library-free cell groups, 46 cells (X1-X10). One browser per run, a fresh context per cell, every page, context and the browser closed in a `finally`. Pages are served by `page.route` on a fake origin, and no glass-ui byte is loaded. WebKit restarts at 60 page loads (H3-1); this run made 46. Logs: `logs/ch15-chromium.log` (r1), `logs/ch15-chromium-r2.log`, `logs/ch15-chromium-r3.log`, `logs/ch15-webkit.log`, `logs/wk-queue.log` |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5 (playwright 1.61.1), headless shell, no GPU arguments. **Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox)** on every cell |
| loads | Chromium r1 26.2-23.8 (06:36); **r2 6.9-8.8, r3 8.8-9.7** (06:57). WebKit **4.1-5.2** (queued 06:37:32, exit 0 at 06:56:49, about 19 min on the lock). **The three Chromium runs print identical lines on every geometric cell** (`diff` with the load stripped). The only difference is X10's ordering read, which is a timing read (§3). WebKit ran below load 8 in one acquisition. No finding rests on a read seen only under load |
| fences | No edit to tracked source and no git write in the checkout. Writes are this file and `pass-15/S15ch-records/` only. No sibling repo read or run. Nothing under `~/.claude` was read; the guard was only executed. No `find`/`fd`/`rg`/`du`/`tree` walk over `/`, `~` or `/Users`. Disk 196 GiB free at each check |

Short citations: `Xn` are this seat's cells; `Kn` are S15's (§S15-facts); `F-n` are the findings below; `stage.ts:n` is cand14's tree `971802d6034f`.

## 0 · In brief

| # | S15 section | finding | evidence (both engines unless stated) | severity |
|---|---|---|---|---|
| **F-1** | S15-e (CK-21, D8) | **S15-e moves the gutter read into the context cand13 failed in.** D8's consumer of record is the page gutter (a `main` div with `padding-inline: var(--space-section)`, `ce13c-probe.mjs:261`), not the held host. K5 compared against the host's own padding. The host's `::before` reads **28 px against the page's 33.20 (−5.20)** and **16 px against 32.00 (−16.00)** on D8's two rows; cand14's `:root::before` reads −1.20 and 0.00 | X1 | **high**: regresses D8 to cand13's reading and reopens the `4cqi` cell that cand14 passes |
| **F-2** | S15-h A1 (CK-20) | **The flat-tree walk sees nothing through a closed shadow root.** `assignedSlot` is `null`, the walk runs `parentNode>parentNode>parentNode` past the card, and `composedPath()` hides the internals. S15's range ("open and closed") and c5's A1 cells include the closed mode | X2 (depth 1 and 2) | **high**: the treatment of record fails half its own range |
| **F-3** | S15-a rule 1, rule 2's trigger; S15-g rule 1 (`fx`) | **Π of per-link flattened linear parts ≠ the painted map inside a `transform-style: preserve-3d` context**, and m14/m24/m34 are 0 there, so rule 2 does not route it to paint. A 40 px step compensated by rule 1 is off **36.52 px** and **14.53 px** on the act's frame; `rotateY(60deg)·rotateY(-60deg)` reads J = diag(0.25, 1) against the engine's identity | X3 (the flat controls equal K2, 0.00000) | **high** |
| **F-4** | S15-b's WebKit limit (CK-20) | **In WebKit an ordinary insert step under nested zoom misreads ΔQ by up to 15.41 px**, with no zoom change on that frame, so the nested-zoom route (which fires only "on a frame where a link's `currentCSSZoom` changed") never fires. Host-zoom misreads reach **400.41 px** inside S15's range (each level 0.5-2), against K3's ~19 px. Chromium: up to 3.95 px (host zoom) and 1.41 px (insert), each above the 0.5 px act bound at the range's extremal cell | X8, K3c delivered | **high** (WebKit) |
| **F-5** | S15-a ("its acceleration cannot reach the glide") (CK-22; CK-20/D-1) | **A step at or above the transformed link is compensated once, in the host's frame, and the glide's later frames paint under the carrier's current map.** The act's frame is exact (0.00 px). After it, a 40 px step paints a glide of up to **53.33 px** (card `scale` 0.25 → 1) and **110.00 px** (0.1 → 1, a scale-in), or a **15.31 px** sideways arc (rotate 0 → 90°). The control step inside the card departs 0.00 px | X9 | **medium-high** |
| **F-6** | S15-h A3 (CK-20) | **The alignment table says the block axis is always start for a block in flow; a block container's `align-content: center` or `end` keeps the centre or the end** (Δ start 20.00 / 40.00 px). Under the table the host's own shrink glides as a step: the A3/B3 class. S14's least-moved rule gets both right. Column-reverse, grid `align-content: end`, table-cell `middle`, abspos auto margins and abspos `bottom` are named by no row | X5 | **medium** |
| **F-7** | S15-a rule 3, S15-h A2 | **While a transform list interpolates through a matrix (mismatched function lists), Typed OM returns a `CSSMatrixComponent` with no percentage** in both engines, and **Chromium also drops its translation** (`matrix(…, 0, 0)` against `getComputedStyle`'s `-50, -25`). S15's fallback covers only "Typed OM absent" | X4 row 1 (the matched-list, `none →`, WAAPI and `translate` rows keep the percentage) | **medium** |
| **F-8** | S15-b, nested-zoom route (CK-20) | **The paint route has no b.5.** On paint, `s` is the centre's painted displacement (`stage.ts:503-508`); b.5 is applied only to the chain's `dq` (`:482-487`). So the host's own zoom under a zoomed offsetParent glides its own size change, which is `B3`'s regression returning under nested zoom | static; X8's WebKit cells are this scene | **medium** |
| **F-9** | S15-g rules 1-3 (CK-04's D9; CK-23) | **Rule 2 reads carriers' computed values on step frames only, yet a card scaling about the held control during the hold (D9) is a carrier-only frame.** J and `fx` would then go stale, which is the D9 regression CK-04 closed on cand14 (`sizeOf` re-ask, `stage.ts:599-601`). Rule 1's projective re-ask fires "on a frame … a carrier's computed value changed", which rule 2 cannot observe and which rule 3 bounds at 0 | static | **medium** |
| **F-10** | S14 a.3/b.6's every-frame-train limit, carried by S15 (CK-20, D-1; invited by §P14c-3 item 3) | **The carried velocity has no ceiling.** A train of 40 px steps on consecutive frames is carried after its onset and paints as 40 px cuts: **116.2-117.5 px off the superposition**, both engines, both critics, against **cand12 ≤ 0.07 and cand13 ≤ 0.09 px** (REGISTRY §P14c-3, S15-FOLD row B1). S15-a bounds M28's ramp at 0.2-4 px a frame; above a ceiling of that order a "velocity" is a run of steps | records of record; static | **medium** |
| **F-11** | S15-d4, both branches | `hide()` removes `--stage-reach` (registered `<number>`, initial **0**) at the exit bound `--spring-dock-duration`, while the x-grow `calc(1 + (var(--stage-reach) − 1) · var(--rung-grow))` returns on `--spring-dock-exit-duration` = clamp(0.12 s, settle·0.6, 0.25 s)·tempo. For a consumer settle under 0.12 s the bound lands before the grow returns, and the x-scale snaps from 1 + (r−1)·g to 1 − g | static (`engage-stage.css:18-22`, `engage.css:290-302`, `scheme-spring.css:110, 116`); not measured | low |
| X6 | S15-h A12 | Not a counterexample, a P-1 note: `getComputedStyle().top` already carries the relative shift in every form (`top: auto; bottom: 20px` → −20px; over-constrained → 10px; `10%` → 30px). Typed OM gives the specified value (`auto`, `10%`). The parenthetical "(bottom/right where those are `auto`)" is dead under `getComputedStyle` and wrong under Typed OM | X6 | note |

**Confirmed (no finding):** K2's flat cells (X3 controls, 0.00000 both engines); S15-c's ordering (X10: 0 frames where the stage-form read differs from an after-step read for a font swap, a timed `insertRule` and a viewport media flip, both engines; the M25 control differs on 1 frame; and Chromium r2 caught the film's posted-message read seeing the media flip **one frame before** any stage read, the class-7 mechanism S15-c names); K7's open-mode retargeting (X2 open: the walk finds every carrier at depth 1 and 2).

**Refuted (this seat's own hypothesis): the lens does not leave its subject when the loop stops.** I suspected that, under either branch of S15-d4, the loupe (a top-layer popover anchored to the track) would detach during its 120 ms exit fade, because `placeLens` stops at release. X7 reads the anchored box laid on the anchor's *painted* top-centre at **0.00 px in both engines** under the host's composite glide, an ancestor's `scale: 0.8`, an ancestor's `translate`, and the host's own grow. Anchor positioning follows these transforms in both engines, so CK-25's lens clause is not at risk from S15-d4 on position. Its scale (`--lens-sx/-sy`, frozen at release) was not read.

## 1 · The findings, each with its ask of the FOLD

### F-1 · S15-e reads the gutter where cand13 read it (CK-21)

**What S15 claims.** "The host's `::before` takes the consumer's expression exactly in every context D8 names, and `:root` does not." K5's "consumer" column is `padding-inline-start: var(--space-section)` **on the host**.

**What D8 is.** CE13c's cell (`pass-13/C-E13c/ce13c-probe.mjs:253-261`) appends a div to **`main`** with `padding-inline: var(--space-section)` and reads its padding as the gutter. The host's font is 14 px. C-E13-complete line 104 rules the cause on cand13: "the host's `shape-margin` resolves the token in the host's context, the page padding in its own". The library's own consumer is the page padding through `--spacing-section` (`theme/bridges.css:307`), applied by page containers, not by the held control. cand14 moved the read to `:root` and halved the error.

**X1, identical in both engines and all three Chromium runs.**

| `--space-section` | page consumer (D8's) | host's own padding (K5's "consumer") | host `::before` (S15-e) | `:root::before` (cand14) |
|---|---|---|---|---|
| `2em` on `:root`, `main` 16.6 px, host 14 px (D8 row 1) | 33.20 | 28.00 | **28 (−5.20)** | 32 (−1.20) |
| `4cqi` on `:root`, host in a 400 px container (D8 row 2) | 32.00 | 16.00 | **16 (−16.00)** | 32 (0.00) |
| `2rem` (the library default) | 32.00 | 32.00 | 32 (0.00) | 32 (0.00) |
| `2rem` on `:root`, `2em` on `main` | 33.20 | 28.00 | **28 (−5.20)** | 32 (−1.20) |
| `clamp(1rem, 3vw, 3rem)` | 24.00 | 24.00 | 24 (0.00) | 24 (0.00) |

**So S15-e is cand13's D8 failure (−5.22 px of record), and it reopens the `4cqi` cell that C-E14 read passing on cand14.** No read on the host, on `:root`, or on any element the stage reaches without knowing the gutter's consumer passes both D8 rows. The gutter's element is the page's, and the stage is not told which one.

**Ask.** S15-e is withdrawn as written. Either (a) the consumer declares where the gutter is laid, which is a declared read on an element the consumer names (new API, priced against E-1 and P-1), or (b) cand14's `:root` read stays with MIGRATION row 7, and the agglomeration rules whether §P13c-8.1 (e)'s "that consumer's context" can be met by a read that cannot know the consumer. §P14-4's ruling ("a stated limit does not discharge (e) for D8") assumed a read that can. **This is a question for the agglomeration, not a build item.** Range for H15: D8's two rows, the nearer `main` override, and the controls above, each against the **page** consumer. Plant `rootgutter` cannot be red on D8 if the root read is the better build; H15 grades the read against the page consumer, not the host's.

### F-2 · The flat-tree walk and closed shadow roots (CK-20, A1)

X2, both engines: in **closed** mode, `H.assignedSlot` is `null`, so S15's walk takes `parentNode` straight to the shadow host and finds **no carrier** at depth 1 (`card` `scale: .8`) or depth 2 (`c1` `rotate: 10deg` and `card` `scale: .8`). `composedPath()` from a document listener reads `div>div>body>html` (the internals hidden). Paint shows the carrier: the host paints 64.00 px wide against `offsetWidth` 80 (65.81 at depth 2). In **open** mode the walk finds every carrier.

**Ask.** For a closed root, the only signal the stage has is geometry. S15 states that detector, or states the limit with its read. A detector in S15's own terms: at the hold and on a link-set change, compare J from computed values (rule 1) with the probe map the hold already asks (`checkOwned`'s task, `stage.ts:632-655`). A mismatch above 1e-3 marks an unseen carrier, and every level above the shadow host is then measured on paint (rule 2). That costs one map per hold and link-set change. Range: closed, depth 1-2, `scale` 0.5-1.5 and rotate 0-90° (S15-h's own). The plant is `noflat`, extended to the closed cells.

### F-3 · Rule 1 inside a 3D rendering context (CK-20; CK-04's `fx`)

X3, both engines, identical to 5 decimals:

| scene | S15 J (Π flattened links) | engine probe map | max \|diff\| | a 40 px step by rule 1: act's-frame residual |
|---|---|---|---|---|
| `rotateX(50deg)` alone (K2's control) | [1, 0, 0, 0.64279] | equal | 0.00000 | 0.00 |
| P `rotateY(50deg)` flat, C `rotateX(50deg)` (control) | diag(0.64279) | equal | 0.00000 | 0.00 |
| **P `rotateY(50deg)` `preserve-3d`, C `rotateX(50deg)`** | diag(0.64279) | [0.64279 0.58683; 0 0.64278] | **0.58683** | **36.52 px** |
| **P `rotateY(60deg)` `preserve-3d`, C `rotateY(-60deg)`** | diag(0.25, 1) | **identity** | **0.75000** | 0.00 (an inline step would be off) |
| **P `rotateZ(30deg) rotateX(60deg)` `preserve-3d`, C `rotateY(40deg)`** | [0.66341 −0.25; 0.38302 0.43301] | [0.38508 −0.25; 0.86511 0.43301] | **0.48209** | **14.53 px** |
| P `rotate: x 55deg` `preserve-3d`, C `rotate: y 35deg` | diag(0.81915, 0.57358) | [0.81915 0; 0.46985 0.57358] | **0.46985** | 0.00 (a horizontal step would be off) |

Every link prints m14 = m24 = m34 = 0, so rule 2's projective test ("the resolved matrix's `m14`, `m24` or `m34` non-zero") classifies each as affine. K2's 14 kinds have no 3D rendering context, so K2 cannot see this. Inside such a context the 4 × 4 matrices compose before the flattening, and the product of the flattened 2 × 2 parts is not the map. `fx` (S15-g rule 1, "the axis length of J") inherits the same error, and with it the reach.

**Ask.** Rule 2 gains a fourth route: a step on a level with a link that participates in a 3D rendering context (its own or its parent's computed `transform-style: preserve-3d`) is measured on paint. The alternative is rule 1 composing the 4 × 4 matrices across the context and flattening once at its root, with K2's comparison re-read on these cells. M28's and M1's ranges gain the cells above.

### F-4 · WebKit's ΔQ under nested zoom: every step, not only a zoom change (CK-20)

X8 sweeps the host's zoom (1 → zH) and a 7.3 px insert before the host's offsetParent's content, with fractional margins, borders and padding, over zA ∈ {1, 1.25, 2} × zP and zH ∈ {0.5, 0.75, 1, 1.25, 1.5, 1.875, 2}: 147 configurations per engine. It prints |ΔQ − Δpaint| for S15's root-px Q. **This is the K3c fact S15 owed.**

| row (effective offsetParent zoom) | WebKit: host zoom 1 → zH, max | WebKit: insert, max | Chromium: host zoom, max | Chromium: insert, max |
|---|---|---|---|---|
| zA 1, zP 1 (1) | 1.09 | 0.30 | 1.00 | 0.30 |
| zA 2, zP 0.5 (1) | 1.09 | 0.41 | 0.91 | 0.41 |
| zA 1.25, zP 0.5 (0.625) | 12.44 | **2.13** | 0.56 | 0.25 |
| zA 1, zP 2 (2) | 82.20 | 1.30 | 1.98 | 0.70 |
| zA 2, zP 0.75 (1.5) | 22.58 | **15.41** | 2.30 | 0.41 |
| zA 2, zP 1.875 (3.75) | 337.88 | **15.41** | 3.70 | 0.41 |
| zA 2, zP 2 (4) | **400.41** | 13.41 | **3.95** | **1.41** |

(Full rows in `logs/ch15-webkit.log` and `logs/ch15-chromium*.log`.) The rows with an effective offsetParent zoom of 1 read alike in both engines (rounding only). Every other WebKit row misreads.

- **The route's trigger is too narrow.** S15-b routes a link to paint "on a frame where a link's `currentCSSZoom` changed and its offsetParent's zoom ≠ 1". An insert frame changes no zoom, yet WebKit misreads it by up to 15.41 px. Under rule 1 that frame glides a move that did not paint.
- **The magnitude.** S15 states "about 19 px at 1.25 / 1.875". Inside S15's own range (each level 0.5-2) the host-zoom misread reaches 400.41 px, so the limit's figure is about 20 times too small.
- **Chromium.** Per-link rounding of a Δ is up to one own unit per link, which is twice S15's "≤ 0.5·zᵢ per link" for a single offset. That puts the act's frame 1.41-3.95 px off at the extremal cell S15 names (z = 2 at three levels), over the 0.5 px bound.

**Ask.** In WebKit (or in every engine, if P-1 prefers one route), **every** step on a level whose link sits under an offsetParent of effective zoom ≠ 1 is measured on paint, not only a zoom-change frame. S15-b states the Chromium figure as the chain's resolution under zoom (Δ ≤ Σ zᵢ px), with its cell. M22's range lists the insert cells above. The plant `nestzoomq` must redden the insert cells, not only the zoom-change cells. No closed form for WebKit's unit is attempted here: the table is the read S15 asked for.

### F-5 · The glide after the act's frame under a changing carrier (CK-22; D-1)

**S15-a's sentence.** "A carrier written every frame, by any writer, enters only as its current linear map, so its acceleration cannot reach the glide."

**X9, identical in both engines** (deterministic: the card's animation and the glide are paused and seeked to τ). A 40 px insert above the card (the card's own step, L₍>i₎ = I) is compensated by rule 1 at the act's frame, t = −J₀⁻¹·Δ, written once as the `dock` glide on the host. The card's map then changes over the 210 ms glide:

| card during the glide | act's frame | the glide's largest painted excursion | largest departure from the step's own path −Δ·(1 − p) |
|---|---|---|---|
| `scale` 0.5 → 1 | 0.00 px | 40.00 | 10.00 |
| `scale` 0.25 → 1 | 0.00 | **53.33** | 30.00 |
| `scale` 0.1 → 1 (a scale-in) | 0.00 | **110.00** | 90.00 |
| `rotate` 0 → 90° | 0.00 | 40.00 | **15.31** (sideways, 14.14 px at τ 105) |
| **control:** the step inside the card (flow-root), `scale` 0.25 → 1 | 0.00 | 13.33 | **0.00** |

Below the transformed link the step and its compensation sit under the same map, so the control is exact on every frame. At or above the link they sit under different maps, and the host's frame turns J(τ)·J₀⁻¹ into the painted glide. **The act's frame is exact, so the classification holds. The glide's later frames carry the carrier's change, and the sentence is false.** The excursion grows without bound as the card's scale at the act goes to 0. A host flung 110 px from its card for a 40 px step is a D-1 defect even though no frame cuts.

**Ask.** Either (a) for a step at or above the transformed link, the glide's remaining offset is re-derived on each frame the carrier's computed map changes, until the glide ends (one style read per frame, no forced layout under rule 1; priced in S15-g), or (b) the sentence is rewritten and the limit stated with its bound, |(J(τ)·J₀⁻¹·L₀ − L(τ))·Δ|·(1 − p(τ)), with a cell. Range: the card's `scale` 0.1-1.25 and `rotate` 0-90° during the glide, and steps of 20-200 px. M28's three placements gain this cell.

### F-6 · The alignment table against the engine (CK-20, A3)

X5, identical in both engines; the host shrinks 80 → 40 px in one frame:

| the host's container | the engine keeps | S15-h A3's table | S14's least-moved |
|---|---|---|---|
| block, in flow (control) | start | start ✓ | start |
| **block, `align-content: center`** | **centre** | **start ✗** ("block axis always") | centre |
| **block, `align-content: end`** | **end** | **start ✗** | end |
| flex `column-reverse` | end | no row (falls back) | end |
| grid `align-content: end` | end | "end … forms": names no property | end |
| table-cell `vertical-align: middle` | centre | no row | centre |
| abspos `inset: 0; margin: auto` | centre | no row (names `margin-inline: auto` only) | centre |
| abspos `bottom: 10px` | end | no row | end |

Block-container `align-content` ships in both engines (X5 reads it working). Under the table, the first two red rows glide a 20 px and a 40 px move that is the host's own size change: the A3/B3 class S15-h exists to cure.

**Ask.** The table reads the parent's computed `align-content` for block containers, `flex-direction` (reverse), `vertical-align` for a table cell, and the inset pair and block-axis auto margins for an abspos host, each under the writing mode. The unnamed forms stay the stated fallback. Range: each row above, with inserts of 0-200 px in the same frame (A3's). The plant `leastmoved` must not be the only build that passes these rows: as an insert-free control it does.

### F-7 · Typed OM through a matrix interpolation (A2, rule 3)

X4: during a transition between mismatched function lists (`translate(-50%, -50%) rotate(10deg)` → `scale(1.2)`, at 50 %), `computedStyleMap().get("transform")` is a single **`CSSMatrixComponent`** in both engines. There is no percentage, so the size-resolved share reads as 0. **Chromium** returns `matrix(1.09581, 0.0958713, -0.0958713, 1.09581, 0, 0)`, dropping the translation that `getComputedStyle` reports as `-50, -25`. WebKit keeps `-50, -25`. Matched lists, `none →`, the WAAPI case and the `translate` property keep their percentages in both engines.

**Ask.** Rule 3's fallback names the observed case: a link whose computed transform list holds a `CSSMatrixComponent` (with no `CSSTranslate` to carry its percentage) has its share measured on paint (rule 2). Range: A2's, with mismatched-list transitions and animations on the card. The plant `inlinepct` stays as is.

### F-8 · The nested-zoom route skips b.5 (CK-20)

Static, by the bytes. S15-b's one zoom route measures "that link's level … on paint (§S15-a rule 2)". On paint the step is `s = P°₋₁ − P°₀` of the host's **centre** (`stage.ts:503-508`). b.5's reference point is applied only to the chain's `dq` (`:482-487`, gated on `sized`), never to `s`. So the host's own zoom change under a zoomed offsetParent glides the centre's displacement, which includes the size change. That is `B3`'s regression (cand14 −5.30 / 2.65 px) returning under nested zoom, in every engine, since the route is taken in every engine.

**Ask.** S15 states b.5 on the paint route: the reference point (A3's alignment point) is read on paint, and a size change that moves no reference point glides nothing. Cell: `B3` with the host's offsetParent at zoom 1.25 and 2, both engines. The plant is cand14.

### F-9 · S15-g's rules against D9 (CK-04) and against each other

- Rule 2: "carriers' computed values are read on step frames only".
- Rule 3: "a carrier-only frame 0" forced updates.
- Rule 1: on a projective map `fx` is re-asked "only on a frame the layout key **or a carrier's computed value changed**".

A card that scales about the held control during the hold (CE13c D9, CK-04, range 0.8-1.25) is a carrier-only frame. Under rule 2 neither J nor `fx` is re-read there, so the reach is written in a stale frame: the D9 defect that cand14 cured by re-asking `fx` on `sizeOf` (`stage.ts:599-601`), and on which CK-04 closed on both critics. Rule 1's projective trigger cannot be observed under rule 2. Where it fires, it costs 3 probes, which rule 3's 0 does not admit.

**Ask.** Rule 2 reads carriers' computed values on any frame whose painted box changed. That read is style only, with no forced layout, so it fits rule 3's 0 under an affine map. Rule 3's carrier-only bound under a projective map becomes ≤ 3 (one map) per frame the painted size changed. CK-04's D9 cell is named as S15-g's regression cell.

### F-10 · The every-frame train under D-1

§P14c-3 item 3 left this open to the challenge. S14 a.3 and b.6 carry a constant per-frame displacement after its onset at **any** magnitude. On `B1`'s every-frame train (40 px every frame, 4 steps) both critics read cand14 at **116.2-117.5 px** off the superposition, in both engines. cand12 and cand13 superpose it at ≤ 0.07 and ≤ 0.09 px (REGISTRY §P14c-3; S15-FOLD row B1). Carried, the train paints three 40 px jumps on consecutive frames. Those are cuts, not inertial motion, under D-1 and under the row's own words ("a move of the place … glided from where it was painted"). S15 itself bounds a layout *ramp* at 0.2-4 px a frame (S15-a, M28's range, "brackets the chain's resolution").

**Ask.** S15 states a ceiling on the carried velocity: a per-frame displacement above it is a step, glided and superposed, with cand12 and cand13 as the passing references. S15-a's own 4 px a frame is the figure already in the statement (P-1: no new figure). H15 grades `B1`'s every-frame train against the superposition, with plant cand14, and keeps a 2 px-a-frame ramp as the carried control.

### F-11 · The exit bound and the grow's own clock (CK-16, both branches)

Static. Under both branches `hide()` runs at the exit bound and removes `--stage-reach` (`stage.ts:727-737`). It is registered with **initial-value 0** (`glass/engage-stage.css:18-22`). `engage-held`'s x-scale is `calc(1 + (var(--stage-reach) − 1) · var(--rung-grow))` (`utilities/engage.css:292`), and `--rung-grow` returns on `--spring-dock-exit-duration` = clamp(0.12 s, settle × 0.6, 0.25 s) × tempo (`scheme-spring.css:116`). The bound is `--stage-read-clock` = `--spring-dock-duration` = settle × tempo (`:110`, `engage.css:184`). With the library's settle (0.21 s) the grow returns at 126 ms, before the 210 ms bound. With a consumer settle under 0.12 s the bound lands first, and the x-scale steps from 1 + (r − 1)·g to 1 − g on that frame.

**Ask.** Branch (i)'s timer (and branch (ii)'s loop bound) is the later of the dock clock and the grow's exit clock. Cell: a settle of 0.08 s, both engines. Low; not measured here.

## 2 · Q-14

Unanswered (INBOUND O-185 last; FORMATION-PROGRESS 23:55). Read in both branches:
- **Branch (i)** (O-103f (3) as written, the build default): F-11 applies to its timer. This seat's lens hypothesis against it is refuted (X7). No other finding depends on the branch.
- **Branch (ii)** (amended): F-11 applies to its loop bound. Its "no lens on a released host" is safe on position by X7.

## 3 · Process

- **Ran, in order, each under `~/.claude/guard/guarded`, never `--light`:** Chromium r1 `--timeout 20` (06:36, load 26.2-23.8, exit 0); WebKit `--exclusive webkit --timeout 30`, **one acquisition** (queued 06:37:32, "waiting for the 'webkit' lock", exit 0 at 06:56:49, load 4.1-5.2); Chromium r2 and r3 `--timeout 20` (06:57, load 6.9-9.7, exit 0 each). One heavy run at a time. 46 cells per run, 0 errors in every run.
- **Re-reads.** r1 ran at load 23.8-26.2. r2 and r3 reproduce every geometric line of r1 exactly. The one difference is X10's media-flip ordering in r2 (the posted-message read saw the move one frame before the stage read). That is a timing read, and it supports S15-c, not a defect.
- **The guard** printed the zone warning on every call and refused nothing.
- **Fences.** The worktree `.claude/worktrees/bl/D5/p15/S15ch/wt` (cand14 applied, node_modules symlinked, no build) was removed with `git worktree remove --force`, and its empty parents with it. Nothing is left running.
- **What P-E15's FOLD owes.** F-1 goes to the agglomeration as a question (§1, F-1 ask). F-2 to F-10 are amendments with ranges and cells for H15. F-11 is a timer clause. No CK row is added.
