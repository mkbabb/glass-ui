Spec banked at `/Users/mkbabb/Programming/glass-ui/docs/tranches/BK/execution/2026-08-03-row22-design/ROW22-DESIGN.arm-fable.md`. Full spec text:

modelId: `claude-fable-5`

# ROW #22 · W-FROST — THE MATERIAL APEX · terminal design spec (Fable arm)

**Seat:** independent design author, 2026-08-03 parallel-prototyping wave (doc-side only; zero src/tests bytes). One of two arms under the ⊕¹⁵ tri-fold law; adjudication is the apotheosis seat's. **DesignSync consulted:** read pass 2026-08-03 — no glass-ui design-system project exists remotely (sole project "CSP Solver — Pencil UI", unrelated); nothing to reconcile, the corpus grounds entirely in-repo.

**Spec-of-record chain (cited, never restated):** TR#22 (`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:172`) → WAVES:450 W-FROST + FROST-TABS-REAUDIT §2 F-1..F-11/Q-1..Q-4 + CWT-3 §6 constraints + EXPERIMENTS Row 38 with its CAPTURE ADDENDUM **senior** + TR §0.S (the one minted ruling) + EXEMPLARS-CODEX LAW 10/row #22 (`:163`, `:181`) + BG-CLOSE-RECONCILE (13 inherited cells) + cursor ⊕¹⁶(3)/⊕²⁰(b) (ambient channel). Every anchor below re-verified on disk this seat at current HEAD.

---

## §1 · THESIS

The library's glass is not glass at HEAD: the two owner-named surfaces carry **no backdrop-filter at all** — a ~50% cream veil plus white inset specular is the whole of "trite, shiny, and bright" (WAVES:485-506, measured live). The cure is a **material inversion, one physics for every plate**:

> **Near-zero ink veil · heavy blur · strong saturate — in that order of causation (Q-1, settled). Glass is a tone compressor: `L_out = floor + g·L_in`, hue preserved; the gain is the rung (LAW 10). The warm-cream read arrives by transmission of the warm field, never by painted cream (F-4). Content is never frosted; chrome is never solid; frost is plate-local (WAVES:459).**

The wave lands four movements: **(i)** the blanket un-killed and the veil ladder re-derived from ink (F-1/F-4/F-8), **(ii)** the specular/brightness strike (F-3/F-5), **(iii)** the `glass/grasp` engage rung pair with the §0.S sequenced-floor cross-cover as its release law — the register through which the material *answers the hand* (breath-of-life: engagement is material response, not ornament), **(iv)** the subtraction round — the ambient dead channel end-to-end, the duplicate rim, the white highlight, the five dark brightness lifts, the engine-proxy wrapper. The deletions below out-weigh the additions (~+1 file / ~+40 declarations added vs ~5 files / ~170 lines deleted).

**Closing law (F-2, absolute):** the wave may not close on F-1 alone. `G-FROST-TRANSMISSION` is the closing gate; a green `G-GLASS-HAS-FROST` with F-3/F-4/F-6 unlanded is a laundered verdict.

---

## §2 · DEFECT INVENTORY — disk-verified this seat (file:line at HEAD)

| # | defect | evidence at HEAD |
|---|---|---|
| D-1 | The cell blanket kills all descendant frost | `src/styles/glass/material.css:66` `--glass-cell-backdrop-filter: none` under the `:where(.glass-*) > *` selector; consumed at `surfaces.css:62` `backdrop-filter: var(--glass-cell-backdrop-filter, var(--glass-blur-quiet))` |
| D-2 | The veil is additive cream, not ink | `tokens/glass.css:312-316` `--glass-bg-*: color-mix(in srgb, var(--card) …)`; α ladder `:53-57` = 0.30/0.50/0.65/0.80/0.95 — F-8: σ_kept ≤ (1−α), so **no shipped rung can keep 80% structure** (lowest α 0.30) |
| D-3 | White inset specular, both modes | light `tokens/glass-fx.css:143-145` rim-top 0.30/0.18 + `--glass-highlight` `:40` (0.25, composed into all five `--glass-shadow-*` at `:346-355`); dark `tokens/dark-arm.css:355-357` **0.40/0.24 — dark BRIGHTER than light**, inverting F-3's dark ≤ light |
| D-4 | Six brightness lifts — the medium lifts | `tokens/dark-arm-glass.css:30-34` 1.18/1.16/1.14/1.10/1.06 (all five dark rungs) + light quiet `tokens/glass.css:211` brightness(1.02). F-5: a rung that lifts mean L fails |
| D-5 | The two named controls have no frost | `.segmented-tabs` backdrop-filter **none** + white insets; `.glass-track-well` (`glass/track-well.css:35-41`, re-verified: `background: var(--muted-medium)`, 0 backdrop-filter) — the slider's *fill* is frosted one element from the unfrosted track (WAVES:500) |
| D-6 | `--glass-material-rim` has two live definitions with different shapes | `tokens/shadow.css:38` (outer 0.5px hairline) vs `glass/rim.css:90-96` (three-leg inset composite; rim.css:10 declares itself SOLE writer). F-3 unverifiable until one dies (F-11) |
| D-7 | Ambient specular channel: writers with zero paint readers | `useGlassBackdropLuminance.ts:256-257` carries the DEAD-PENDING-#22∥#68 marker; writers `:262-268`/`:301-302`; `@property` pair `tokens/glass.css:469-482`; dock zeroing `dock/styles/adaptive-legibility.css:120-121`; **`ambientHueHistogram.ts` (111 L) exists solely to feed it** via `backdropLuminanceSample.ts:24-27,186-211,295-299` |
| D-8 | Engine-class proxy wrapper | `src/styles/paper.css:93` `@supports (backdrop-filter: blur(1px))` gating `feTurbulence` relief (F-10; G-NO-ENGINE-BRANCH (b)) |
| D-9 | GM-L2/L3: 6 plates on 5 rungs; grey-mud ladder | `glass-card` byte-identical to `glass-quiet`; saturation falls as tier rises (the inverse of glass) — the D-2 cure re-derives both |
| D-10 | Grasp register absent | `grep -rl grasp src` → 0 files; #27 (two-plus engage consumers) and #47 (dock-grab) blocked on it |

---

## §3 · THE DESIGN

### 3.1 · The transmission model — one law, per-rung gain

Every plate is the same three-layer construction, top to bottom:

1. **RIM** — the ONE `--glass-material-rim` (rim.css's composed inset form survives, D-6 cure); one static specular leg per mode, ink-alpha **0.10 light / 0.08 dark** (F-3: dark ≤ light; plain per-mode arms; no `light-dark()` inside any shadow — the standing trap). The cast and rim ride the same `--glass-key-direction` sign spine (O-6 cast/rim lockstep; the spine is live at `glass-fx.css:131` — unchanged, now the sole light-direction authority).
2. **VEIL** — ONE ink-derived layer (F-4): `--glass-bg-<tier>` re-authored **in place** (names and consumers keep; physics changes) from `color-mix(--card …)` cream to `color-mix(in srgb, var(--glass-veil-ink) calc(var(--glass-opacity-<tier>) * 100%), transparent)` with `--glass-veil-ink` a plain per-mode arm: light = the warm foreground ink (dims); dark = the separation veil, F-5-signed — the veil moves AWAY from the plate, |ΔL*| ∈ [8,12] (measured +10.89 dark, W-CHIP §9 amendment). The α ladder (`--glass-opacity-*`, same slots `glass.css:53-57`) re-derives under F-8's arithmetic (σ_kept ≤ 1−α): **wash .06 · quiet .10 · resting .14 · floating .18 · overlay .20** (dark arms +.02, the grasp-pair pattern .30/.34). Ceiling .20 ⇒ every rung can keep ≥80% structure. Ratified defaults, capture-tunable within the band at the paired π (acceptance arithmetic, Seventh Ecoute (d)) — never re-opened as design.
3. **FILTER** — `backdrop-filter: blur(R) saturate(S) brightness(B)` per rung, with **B ≤ 1.0 everywhere** (0.96 canonical from the grasp pair; D-4's six lifts struck). Radii per F-6's band (calm rungs 10-22px; 7px keeps 59.3% hf vs the ≤20% target): **wash 10 · quiet 14 · resting 16 · floating 20 · overlay 22 px** — monotone, grasp's 26px the apex above the ladder. Saturate: content tiers (wash/quiet/resting) **1.50**, chrome tiers (floating/overlay) **1.60** light; dark arms ≤ light (current 1.35-1.22 shape kept, re-based on the light cut). Any saturate move adjudicates **on the Safari arm first** (CWT-3 §3.2: Safari resolves `saturate(1.3) brightness(1.14)` where Chromium reads 1.4 on the same class). Radii/saturate are capture-tunable within their stated bands; the bands are not.

**The area×radius blur budget is #69's** — owed there, never asserted here (F-6 tail). The resting-rung cost arithmetic (+33 µs/rung) is likewise #69's; this wave's engage-only mount (§3.3 clause 5) makes it zero at rest.

**Aristotelian proportion:** the ladder is one ratio walked — α steps ×~1.4-1.6 per tier, radius steps +4/+2px alternating, exactly one saturate break at the content/chrome boundary. Six plates, six distinguishable rungs (GM-L2 cured by construction: `glass-card` binds `resting`, no longer `quiet`'s byte-twin — the card's own file edits ride #79/#86 per §B.7; this wave changes only the tokens both read).

### 3.2 · G-FROST-TRANSMISSION, re-specced (the closing gate; zero seats minted)

Per LAW 10 / codex row #22: the gate measures a **behavior, not a recipe** — on a σ≈50 structured substrate (Q-2 admissibility; same-pixels plate-toggle, never adjacency crops; manifest names its substrate σ; P0 mode-assertion on every cell):

- **fixed point + gain:** regress `L_out = floor + g·L_in` over the same-pixels pair; content tiers **g ≈ 0.8**, chrome tiers **g ≈ 0.45-0.5**; the fixed point on our cream sits within −10%..0 of substrate mean (F-5 signed: dims-within-10% passes, ANY lift fails).
- **structure:** σ-kept ≥ 80% at content tiers (F-8 arithmetic honored by the α ceiling); hf-kept ≤ 20% (the blur doing its job).
- **chroma:** monotone-dilution law — `C_composite ≥ max(0.020, C_ground)`; saturation delta positive, bounded by the **+40% ceiling** (`S × C_ground` arithmetic; the iOS +62% REFUSED on arithmetic — gating it would gate an impossibility, CWT-3 S-7); hue ∈ [45°, 88°], both modes, both engines, `getImageData` only.
- **receiver matrix rides the same gate:** sortable G-14 · search plateless-frost · tags P10 (CWT-2:1536) — receipts, not new seats.

`G-GLASS-HAS-FROST` (RED at HEAD) goes green as a *consequence* of D-1/D-5's cure; its prefix arm (every dist `backdrop-filter` carries the unprefixed leg, born-RED at 5) is BUILD-stage at #5 — cited, not re-owned. `G-RUNG-ONLY` carries the GM-L2/L3, NO-WHITE-SPECULAR, and F-7/F-11 token arms. Gate seats moved: **0**.

### 3.3 · `glass/grasp` — the engage rung pair + the §0.S release law (verbatim-constrained)

**New file: `src/styles/glass/grasp.css`** (@layer components; @import-ed from `styles/glass.css` after track-well.css). The one structural ADD of the wave. Constants are the CAPTURE ADDENDUM's, senior, not tunable:

| register | value |
|---|---|
| rest rung | `blur(16px) saturate(1.50) brightness(0.96)` |
| grasp rung | `blur(26px) saturate(1.75) brightness(0.96)` |
| veil ink (decoupled layer) | rest **.30 light / .34 dark** · grasp **.18 light / .20 dark** |
| rim | ONE static leg, **0.10 light / 0.08 dark**, never animated |
| entry | **true 0 ms discrete step** — no crossfade, nothing to cover; the hand closes, the glass answers *now* |
| release | **180 ms envelope**, linear on the opacity channel (an EFFECTS channel — the scheme-spring register table forbids springs on exits/effects; the liquid weight lives in the paired SPATIAL move: the consumer's grab-scale rides `--spring-press`, its settle `--spring-smooth`, **by name** from `scheme-spring.css`) |

**The release law is §0.S, all six clauses, structural:**

1. **Decoupled veil** — the ink lives on ONE always-opaque, never-filtering layer whose ink lerps grasp→rest across the envelope (monotone by construction; the measured stacking α 0.472/0.426 = `1−(1−α_r)(1−α_g)` is only reachable when two layers each carry veil — the single-layer folded cure is **BLOCKED AS WRITTEN**, S-7, and may not re-enter).
2. **Never both below one** — the rungs are **filter-only** carriers; at release the rest rung steps to opacity 1 FIRST, then the grasp rung fades 1→0 over the envelope. Un-frosted leak `(1−o_g)(1−o_r) ≡ 0` at every frame (vs the measured 25% raw substrate at o=0.5).
3. **Forcing falsifier on record** — any floor α<1 leaks (1−α)²; a ≡0 floor on veil-carrying rungs stacks to .426 mid-release (darker than rest — the MOTION-CANON §7 exit-overshoot class). Clauses 1+2 stand or fall together.
4. **Bounded over-frost, and the bound is the gate** — quadrature peak `√(16²+26²) = 30.5px = 1.17×` the grasp rung, decaying monotone; **gate clause: peak effective radius ≤ 1.25×**, measured on the release trace. Legal under monotone-dilution (over-frost never thins).
5. **Engage-only mount** — both rungs mount on engage; rest cost exactly 0 (`will-change` engage-only; #69 owns the many-surface arithmetic).
6. **Armed falsifiers:** leak > 0 → clause 2 failed · peak > 1.25× → clause 4 failed and the sequencing inverts (the strictly-worse under-frost branch, one word away) · veil α outside the monotone band [.18,.30]/[.20,.34] at any sampled f → clause 1 failed · 60fps-during-drag stays armed at **#67's device cell** · owner-reversible in one word to the LAW-9 confinement branch (#47 W7).

Consumers bind AFTER this lands: **#27** (engage ladder, two-plus) and **#47** (dock-grab). The G-1 release-dip arithmetic is **STRUCK** (S-6, refuted in pixels) — it may not be cited.

### 3.4 · The two named controls (the owner's sentence, closed)

- `.segmented-tabs` — adopts the **quiet** rung through the control REST register (`glass/control-surfaces.css` — already the ONE control material seam); its white insets die with D-3. **No local material mint.** #32's π cells re-run AFTER F-1/F-3/F-4 land (T-C sequencing); #71 executes inside #32's cut.
- `.glass-track-well` (`glass/track-well.css:35-41`) — **this wave authors the frost rung here** (FROST S-B split): the well adds the quiet-rung `backdrop-filter` and its `--muted-medium` flat wash re-derives to the ink-veil form; **#35 owns the veil value at the slider recipe layer** (`--muted-medium` as rung reference at its on-disk value, SE-4's ratified default) — neither wave double-edits the other's file.

### 3.5 · Chrome shadow indirection (⊕⁷ o19 A-14)

The rung table gains **`--glass-shadow-capsule`** — a pure indirection defaulting to `var(--glass-shadow-floating)` beside the tier shadows at `glass-fx.css:346-355`. The chrome context (dock shell) re-points it to the chrome rung; a consumer in chrome resolves chrome, **never a variant**. Floating-by-default was the convicted defect, not the consumer usage. Witnesses: DockControl/DockTrigger at #47. All five `--glass-shadow-*` compositions drop `var(--glass-highlight)` (D-3/F-7); `--glass-shadow-floating` keeps its 0.5px shadow-color ring (a shadow, not a specular). `--glass-capsule-warm` gains its dark-arm peer (F-9; assertion: dark fill ΔmeanL vs field ≤ the light delta), and `--glass-capsule-warm-floor` rides the same row.

### 3.6 · The ambient channel — end-to-end subtraction (⊕¹⁶(3)/⊕²⁰(b), the DEAD-PENDING discharge)

Zero paint readers exist after the one-pair specular collapse (`cfc4dffa`). Delete **end-to-end, 5 files** (the census at this seat found the ⊕¹⁶ "~20-line/4-file" figure under-counted — the histogram module exists solely for this channel):

1. `src/composables/glass/ambientHueHistogram.ts` — **whole file, 111 lines** (sole importer is the sample module, sole purpose is ambientHue).
2. `src/composables/glass/backdropLuminanceSample.ts` — the `ambientHue` result field + hist plumbing (`:24-27`, `:186`, `:203`, `:211`, `:295-299`); `luma` computation unchanged.
3. `src/composables/glass/useGlassBackdropLuminance.ts` — the DEAD-PENDING marker block + writers + removals + `AMBIENT_STRENGTH_ENGAGED` (`:101`, `:132`, `:251`, `:256-268`, `:301-302`).
4. `src/styles/tokens/glass.css:469-482` — both `@property` registrations + prose.
5. `src/components/dock/styles/adaptive-legibility.css:120-121` — the zeroing pair.

The **luma half of the observer stays whole** — `--glass-backdrop-luma`, the bucket, the `data-backdrop-sampled` stamps, and GM-L1's staleness-advertising duty are live consumers of `backgroundCanvas`. No masking fallback: the channel dies loudly and completely, not behind a zero-strength default.

### 3.7 · Material-law text for the #86 fold (§3.3 of BG-CLOSE-RECONCILE — authored here, executed there)

**THE ONE-PAIR CHROMATIC LAW:** a plate owns exactly **one chromatic writer pair — plate tint + rim ink**. `--glass-fill-tint` (26 hits) is un-folded residue of `W-GLASS-TINT-UNIFY`, a second chromatic writer; it folds onto the pair at **#86 W-SURFACE-MATERIAL** (the joint C-1 cut with #88). Tint is **sampled instantly and locally — no easing curve on the tint channel, ever** (LAW 10), recomputed during transform; two glasses per screen: toward-content lightens, away darkens (the two-glasses roles). This paragraph is the law of record for that fold; #22 edits no `--glass-fill-tint` byte.

---

## §4 · STRIKE / ADD

**STRIKE (the subtraction round — every line cited in §2/§3):**

| unit | files | lines (≈) |
|---|---|---|
| ambient channel end-to-end (§3.6) | 5 | ~150 |
| `material.css:66` → `initial` + the dead comment block `:51-65` | 1 | ~16 |
| `--glass-highlight` definition + its five shadow compositions' legs | glass-fx.css | 6 |
| dark rim 0.40/0.24 → one leg ≤0.12 (F-3) | dark-arm.css:355-357 | 3 re-authored |
| six brightness lifts (five dark + light quiet 1.02) → 0.96 canonical ≤1 | dark-arm-glass.css:30-34 · glass.css:211 | 6 re-authored |
| duplicate `--glass-material-rim` (keep rim.css's composed SOLE-writer form) | shadow.css:38 | 1 |
| `paper.css:93` `@supports` wrapper (unwrap; the relief block stays) | 1 | 2 |
| the banked G-1 α(f) arithmetic + the single-layer cure | doc-record | struck, may not re-enter |

**ADD:** `src/styles/glass/grasp.css` (the rung pair + §0.S law; ~60 lines incl. the falsifier comments) · `--glass-shadow-capsule` indirection (1 decl) · `--glass-capsule-warm` dark peer (1 decl) · `--glass-veil-ink` per-mode pair (2 decls) · re-authored ladder values in place (0 new tokens). **Net: bytes down; token count +4 / −3 (highlight, one rim def, two ambient regs die).**

**RULED DISPOSITIONS (named-but-open cells, closed here with ratified defaults — owner-reversible in one word):**

- **U-18(b) veil-lever: DECLINED.** No consumer names it at this cut (E-3's naming duty); the grasp register is the ONE sanctioned veil-mover. (#79's U-18(a) half already defaulted DECLINE, SE-4.)
- **U-30 `--glass-edge-dispersion`: RE-CONSUMED — KEPT.** The retire condition ("unless the rung system re-consumes it") is met at HEAD: `glass/surfaces-pager.css:75` composes it beside the material rim. Consumer named; fringe magnitude adjudicates at #32's row-42 paired capture (both arms, moving AND rest).
- **W-PAPER-SUFFUSE inversion: RATIFIED AS LANDED.** Disk truth (clean ×7 hits/4 consumers, aged 0) is the better outcome — reversing would churn 4 live consumers for a name. The atlas `aged` contract re-keys on `clean` via a marked addendum in ATLAS's tranche (#76 relay; consumer-updates ruling). Owner-reversible.
- **Grain (EXPERIMENTS row 31): decided at this wave's first two-mode paired capture** — if cream reads plastic without tooth, grain returns (per-surface layer inside each glass element, never a page-level blend); else RANK-2's delete stands. Not prototypable against the dead frost; one capture, not a re-guess.
- **`.cartoon-cast` global rules (BG cell, #22∥#87): KEPT — the deletion candidate died at census.** A live demo emitter exists (`demo/stories/motion/scroll/ScrollChoreographyBody.vue:161`) and the cel-stamp idiom is π-STAMP-PEER's subject (blur-stamp-beside-cel-ladder peering, with the GF-BLOB W3-props-collapse contingency). The material-law half (cast rides `--glass-key-direction`, O-6 lockstep) is asserted at the π; the display-atom family half is #87's.

---

## §5 · THE 13 INHERITED BG CELLS — each discharged, routed, or asserted (BG-CLOSE-RECONCILE, cited by name)

| cell | disposition at this wave |
|---|---|
| `W-GLASS-BACKDROP-SAMPLE` (B4) | DISCHARGED BY GATE — the transmission question IS `G-FROST-TRANSMISSION` (§3.2); the render-target keystone stays unbuilt, correctly |
| `W-GLASS-SUFFUSE-UNIVERSAL` | the bevel floor lands as §3.1's rim law (`useSpecularPointer` stays dead — the static keyed rim is the bevel; no pointer-tracked specular revives) |
| `W-GLASS-TINT-UNIFY` | law authored §3.7; fold executes at #86 |
| `W-GLASS-BLUR-ENGAGE` | DISCHARGED BY the grasp register (§3.3) — the engage-coupled frost move exists with real physics; the `--siri-island-t` token never lands (its surface is #47's island) |
| `W-GLASS-PAPER-CONGRUENCE` | the Regular/Clear tier map IS §3.1's content/chrome gain split (g≈0.8 / g≈0.45-0.5) on the live `--glass-key-*` spine |
| `W-GLASS-CLIP-DISCIPLINE` | shape-landed; the Safari-26 Job-B sign-off rides this wave's Safari π cell (#10 protocol) |
| `W-PAPER-GRAIN-OPTIN` | grain is per-surface opt-in by the row-31 construction (§4); the PaperBackdrop demotion half is #59's |
| `W-PAPER-GRAIN-REAL` | the lit-tooth (`feDiffuseLighting`) upgrade is DEFERRED-WITH-TRIGGER to the row-31 capture verdict: if grain returns, it returns lit; if RANK-2 stands, the 22 `feTurbulence` hits are #68's token-wall sweep |
| `W-PAPER-SUFFUSE` | ratified-as-landed (§4); atlas relay #76 |
| `W-PAPER-GRAIN-WARM-SUBSTRATE` (D-2) | the library-side warm substrate is PROVEN OR FAILS at this wave's π (the fixed-point/warm-hue-window arms are exactly the gray/metallic-wash detector); π at #10 |
| `W-DOCK-CAST-RETIRE` | global-class half ruled §4 (kept, census-cited); #87 owns the family question |
| `W-AMBIENT-HISTOGRAM-LEAF` | superseded by §3.6's full subtraction (the leaf-carve is moot when the organ dies) |
| `W-GATE-UNIFORM-BLUR` | MOOT-GATE, gone; its substance is the per-rung radius ladder (§3.1) under `G-RUNG-ONLY` |

---

## §6 · π / DELTA — the paint verdicts (no gate minted; #10's protocol binds)

All cells: port 5400 · build freshness in the receipt · P0 mode-assertion (no material π adjudicates a mode-unverified capture) · substrate σ ≈ 50 named in the manifest · same-pixels plate-toggle only · Chrome AND real `safari-app` as **separate cells, never cross-inferred** (Playwright-WebKit under a Safari label FORBIDDEN; the browser seat serialized).

1. **The ladder π** — five rungs × both modes × both engines: fixed-point/gain regression, σ-kept, hf-kept, chroma non-dilution, hue window (§3.2). This cell also adjudicates: the grain row-31 verdict · D-2's warm-substrate proof · the radii/saturate/α in-band tuning · the RANK-2-vs-grain tension and OWED-6's saturate contradiction (a low-gain veil cannot be rescued by saturation — the codex closes it analytically; the capture confirms).
2. **The grasp release trace** — **the first motion π, #3's named first consumer** (mode=motion, declared series from release t₀: 0 · 60 · 90 · 120 · 180 · 300 ms): leak ≡ 0 at every frame · peak effective radius ≤ 1.25× · veil α monotone in-band · entry step verified discrete · monotone luminance (no exit overshoot). Owner: this wave's land seat; trigger: the first grasp π (§0.S clause 6).
3. **π-STAMP-PEER** — the cel-stamp idiom beside the frosted ladder (one frame, both idioms in shot; the W3-props-collapse contingency recorded).
4. **Corner-AA** — #10 holds the detection cell; **this wave is the named cure owner at its first RED** (U-38).
5. **OWED onward, named:** Safari-app cells for grasp (per-wave π, the serialized seat) · 60fps-during-drag + device fps at **#67's device matrix** · row-42 fringe magnitude at **#32**.

**Completion pair:** GOAL = WAVES:450's thesis (blurred-and-frosted, measured against the in-repo target); COMPLETION = `G-FROST-TRANSMISSION` green on cells 1-2 with F-3/F-4/F-6 landed — **never F-1 alone** (F-2).

---

## §7 · SEQUENCING · COLLISIONS · ROUTED

- After **#6** (build colormix); Φ5 spine head. #27/#47 bind after; #32/#33 (hard fence: G-FROST-TRANSMISSION green first)/#35 re-run or land after.
- **§B.7 keys honored:** `track-well.css` frost rung = #22, slider veil `:302` = #35 · `field-control.css` = #82 (this wave edits no field file; #25's well law rides #82's cut) · `material.css:66` = #22 sole owner (#88's route unreachable; #84's P9 a beneficiary receipt).
- **Routed, never edited here:** `--glass-fill-tint` fold → #86 (law §3.7) · prose residue (blur-dock comments etc.) → #17/#61 · feTurbulence sweep half → #68 · atlas texture contract → #76 · perf ceilings → #69 · a11y contrast arms → #31 · the engage-rung consumer wiring (⊕²¹: ENGAGED rung zero consumers at HEAD) → #26/#47.
- **Struck and closed to re-entry:** the G-1 dip arithmetic (S-6) · the single-layer cure as written (S-7) · "the blur radius is not the problem" (F-6; WAVES:481-483 struck) · the §CONTRADICTION stale row (Q-1; WAVES:513-526 struck) · the +62% saturation target (refused on arithmetic) · `--glass-bg-dock`-era chrome variants (the capsule indirection replaces the variant instinct, §3.5).

*Fable arm ends. Adjudication seat: reproduce the α-ladder arithmetic (F-8), the quadrature bound, and the ambient census before ruling; the constants tables (§3.3) are the addendum's and are not adjudicable.*