# BK #55 · WATERCOLOR-RELOCATE — the component leaves, the demo rebuilds

**Seat:** scout + implement · **modelId: `claude-opus-5[1m]`** (asserted by prefix `claude-opus-5`)
**Date:** 2026-08-07 · **Base HEAD at selection:** `9bc8d25f` (#46 GF-TIMELINE landed)
**Spec of record:** `TERMINAL-ROSTER.md:205` (TR#55) → `RATIFICATION.md:69` (§2 R-2) +
`DECK-RELOCATION.md` PART II §1. TR wins on divergence.

---

## 0 · THE SELECTION, AND WHY IT IS THIS ROW

Walked TR order forward from the last landing. `#46` LANDED at HEAD (`9bc8d25f`), so the
scout resumes at `#47` and continues until a Φ5 row is UNSTARTED, not IN-FLIGHT, not
ASK-gated, not owner-gated, and DAG-unblocked. Every skip is named with its gate:

| # | Φ | verdict | ground |
|---|---|---|---|
| 47 GF-DOCK | Φ5 | SKIP — **ASK g11** | ~~`ASK.md:42`~~ `docs/tranches/BK/ASK.md:42` (the ℱ-as-Foundations dedup); + deps `#72` hard-precedes, `#7`-fence, `#89` sever (~~`EXECUTION-DAG:57`~~ `EXECUTION-DAG:58`) |
| 48 W-DOCK-FISSION | Φ5 | SKIP — gated | `#47` W7 (~~`EXECUTION-DAG:58`~~ `EXECUTION-DAG:59`); #47 unstarted |
| 49 GF-AURORA | Φ5 | SKIP — **ASK g3 + ASK g7** | ~~`ASK.md:22`~~ `docs/tranches/BK/ASK.md:22` DUSK/DAWN + Kuwahara multipass (~~`EXECUTION-DAG:59`~~ `EXECUTION-DAG:60`) |
| 50 GF-BLOB | Φ5 | SKIP — **ASK g1** | hero cartoon-weight A/B at its FIRST capture (~~`ASK.md:20`~~ `docs/tranches/BK/ASK.md:20`) |
| 51 GF-HANDMARK | Φ5 | SKIP — **ASK g12** + external ACK | perfect-freehand consume; atlas ACK before W2 closes (~~`EXECUTION-DAG:61`~~ `EXECUTION-DAG:62`) |
| 52 W-CONFIG-EXPRESS | Φ5 | SKIP — gated | dep `#35` (C12, ~~`EXECUTION-DAG:62`~~ `EXECUTION-DAG:63`); #35 is UNSTARTED **and** in-flight in this tree |
| 53 GF-FOURIER | Φ5 | SKIP — **ASK g4** + deps | `#54` seam · `#52` before W4 · C-13 (~~`EXECUTION-DAG:63`~~ `EXECUTION-DAG:64`) |
| 54 DUAL-ENGINE BAND | ~~**Φ4**~~ **Φ4/5** | SKIP — ~~not Φ5~~ **UNSTARTED and its completion is gated behind two ASK-gated rows** | the cursor seats it in the Φ4 table as **Φ4/5 UNSTARTED** (~~`EXECUTION-PROGRESS.md:1578`~~ `EXECUTION-PROGRESS.md:1771`), and the DAG puts it *"before/with #50 W0 and #53"* (`EXECUTION-DAG:65`): its completion condition (webgl2 repo-wide 0 **AND** #53 GREEN) rides ASK-g1-gated `#50` W0 and ASK-g4-gated `#53`, so it cannot be carried to completion at this seat |
| **55 WATERCOLOR-RELOCATE** | Φ5 | **SELECTED** | dep **none**. Owner-CONFIRMED, **veto window CLOSED** (TR#55). Its ASK adjacency is **g4, which fires at #53's cut, not here** (~~`ASK.md:35`~~ `docs/tranches/BK/ASK.md:35` — trigger cell reads *"#53's cut (the seat cell) + the #66 fresh census"*). The census it once ordered is **BANKED ⊕⁴** and every output already routed (§2→g4/#53 · §3 STAY · §4→#21 · §5 already-cut · §6→#76), so what remains at this row is the watercolor-dot relocation itself |

[BK #55 CURE-5 · 2026-08-07] Every cite in the table above re-verified on disk at
`ff7451d7` and corrected in place. `EXECUTION-DAG` is
`docs/tranches/BK/EXECUTION-DAG-2026-08-03.md`; its six row cites were each **one line
short** (the draft read the row bodies off a stale offset) and each gains +1. The two
cursor cites were not merely off-by-a-few but pointed into unrelated PROSE — `:1578` is a
`color-radius.css` sentence and `:1621` a provenance clause; the real Φ4 `| 54 |` row is
`:1771` and the `| 55 |` gate cell is `:1811`. `ASK.md` was cited bare **four** times (`:20`
g1 · `:22` g3 · `:35` g4 · `:42` g11) and each is qualified to `docs/tranches/BK/ASK.md`;
all four were re-read on disk and are **CORRECT as to content**. #54's skip ground was
also stated wrongly: it is **not** *"not Φ5"* — the cursor's own row reads **Φ4/5**.

Prior skips carried forward from the #46 seat's own table and re-verified live: `#21`
(`#17` hard, Φ4-UNSTARTED) · `#22` (CURE-CUT, never selectable) · `#25` (its own
rides-clause) · `#32`/`#33`/`#34`/`#35`/`#40`/`#71` (**bytes uncommitted in this tree** —
`src/components/{tabs,alert,slider,deck,carousel,pager-dots}/*`, `morph/eyeglass.ts`,
`tests/gates/{tabs-seam,feedback-tint-seam}.test.ts`) · `#42` (`#47` aperture seam) ·
`#43` (Φ6) · `#44` (behind #43's cut) · `#45` (after #52).

---

## 1 · THE WORK ORDER — TR#55 CELL, VERBATIM

> | 55 | WATERCOLOR-RELOCATE ✦³ | R-2 RULED (RATIFICATION §2) + **round 2 item 10 (SL-4)** | Φ5 | RELOCATE to value.js—**the veto window is closed**; the hero ornament dies; the landing page rebuilds from the library's own primitives. **✦³ CONFIRMED by owner word + WIDENED** (item 10: "as WatercolorSwatch or its native name there … and elements like it"): a **RELOCATION CENSUS is ORDERED** — every component whose consumption concentrates in one consumer with consumer-specific semantics relocates to its dominant consumer. ⊕⁴ **the census BANKED — `DECK-RELOCATION.md` PART II is THE RELOCATION ROSTER** (run CLOSED 7/7): watercolor-dot the archetype (value ×11, sole — the relocation IS the relay, degenerate-REQUIRED) · §2's one new RELOCATE-candidate (fourier-field+math → **ASK g4**, default KEEP in-library) · §3's STAY table (substance overrides concentration — surface/handmark/scroll-progress-rim/search/blob/constellation et al., with A-4's material-primitive incredulity ruling) · §4's delete-candidates routed to #21 · §5's already-cut stale-pin ledger · §6's instrument defects → #76. Dispositions delivered on the chopping-block list (§D) |

Gate cell (cursor ~~`:1621`~~ `:1811` [BK #55 CURE-5 · 2026-08-07]): `G-RELAY (value.js receiving end); veto window closed; ✦³
owner-CONFIRMED + the RELOCATION CENSUS — ⊕⁴ BANKED …`

**Derived order, four duties:** (1) the G-RELAY whole-repo walk, run FRESH; (2) the
glass-ui half of the relocation — the component and every edge that reaches it; (3) the
demo rebuilt from the library's own primitives, the same instruction R-2 gives value.js's
landing page; (4) the relay banked and routed. **Seats +0 — nothing minted.**

---

## 2 · THE WHOLE-REPO WALK (G-RELAY), RUN FRESH THIS SEAT

Universe **generated**, never remembered (#76's law): the 15 named roots. Detector, verbatim:

```
grep -rn "glass-ui/watercolor-dot\|WatercolorDot\|useWatercolorBlob" \
  atlas bbnf-buddy bbnf-lang keyframes.js fourier-analysis latex-paper muster oscilloscope \
  parse-that sci-report slides slides-K speedtest value.js words \
  --include='*.ts' --include='*.tsx' --include='*.vue' --include='*.js' --include='*.jsx' \
  --include='*.css' --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git \
  --exclude-dir=build --exclude-dir=.vite --exclude-dir=coverage --exclude-dir=test-results \
  --exclude-dir=docs --exclude-dir=audit --exclude-dir=audits
```

**value.js is the sole consumer, and the census figure reproduces EXACTLY: 11 distinct
importing files**, all `import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot"`:

`demo/workbenches/mix/MixSourceSelector.vue:7` · `demo/workbenches/mix/MixResultDisplay.vue:6` ·
`demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:96` ·
`demo/workbenches/generate/GenerateControls.vue:15` ·
`demo/picker/controls/ComponentSliders/ConsoleRail.vue:91` ·
`demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:38` · `demo/shell/dock/Dock.vue:6` ·
`demo/shared/ui/EmptyState.vue:70` · `demo/color-session/ColorSpaceSelector.vue:110` ·
`demo/palettes/browser/card/CurrentPaletteEditor.vue:191` ·
`demo/palettes/browser/card/SwatchHoverMenu.vue:62`

**Fourteen other roots: ZERO.** `DECK-RELOCATION.md:199`'s *"value ×11, sole. The archetype
of the class"* is corroborated on disk, not on trust.

### 2.1 · RT-55A — the relay, banked and routed to #76

Destination **value.js**, name `WatercolorSwatch` or its native name there (owner word,
item 10). Payload = the 4 files this cut deletes (512 lines), which are self-contained but
for one import: `useWatercolorBlob.ts:3` + `WatercolorDot.vue:4` read `mulberry32`/
`hashString` from `src/composables/glass/procedural/prng.ts`. Both are 8-line pure
functions; value.js re-homes them or imports them from a published subpath — the receiving
tranche's call, not this one's.

**Two DEAD bindings measured at the receiving end this seat**, banked so value.js's tranche
inherits facts rather than a surprise (consumer-updates ruling — the consumer fixes them in
ITS tranche):

1. **`tag="div"` is not a prop.** HEAD props were exactly `color · variant · animate ·
   cycleDuration · range · seed`. `Dock.vue:136,138,271` · `EmptyState.vue:45,46,47` ·
   `CurrentPaletteEditor.vue:62,64` all bind `tag` — and `defineOptions({ inheritAttrs:
   false })` with only `class`/`style` forwarded means it never reached the DOM either. A
   silent no-op, the exact class the glass-ui binding-verification lesson names.
2. **The default slot is not rendered.** `Dock.vue:271-281` ·
   `MixSourceSelector.vue:164-176` · `CurrentPaletteEditor.vue:95-105` pass children;
   the template has no `<slot/>`, so that content has never painted.

Neither is a defect this row cures — both are the receiver's, and both are worth more to
value.js than the component was to glass-ui.

---

## 3 · WHAT LANDED

### 3.1 · The component, deleted whole
`src/components/watercolor-dot/` — `WatercolorDot.vue` (315) · `useWatercolorBlob.ts` (167)
· `prng.ts` (19) · `index.ts` (11) = **512 lines**. Plus
`tests/components/watercolor-dot.contract.test.ts` (77 lines, 3 cases).

### 3.2 · The published surface
`scripts/lib/subpath-policy.mjs:95` PUBLISH row struck (~~the generator is **fail-closed** —
a dir with no classification is exit 1, so the policy row and the directory must die in the
same cut~~), then `node scripts/regen-exports.mjs --write`: **67 → 66 export keys**, one drop
`./watercolor-dot`, `typesVersions` mirror with it. Re-run read-only: `EXACT REPRODUCTION:
YES`, `EXIT 0`. The 10 other `package.json` deletions in the raw diffstat are the #40 lane's
embla removals, already in the tree before this seat; mine are 7 lines.

[BK #55 CURE-3 · 2026-08-07] **The fail-closed claim ran the wrong way and is corrected.**
`classifyTier` (`scripts/lib/subpath-policy.mjs:213-226`) is fail-closed in ONE direction
only: **dir → row**. A disk dir with no classification entry lands in `unclassified` (the
HARD error). The reverse — a classification row whose dir is absent from disk — lands in
`stale`, which the header itself calls *"a soft, reported drift"*: it is reported and the
run still exits **0**. So deleting `src/components/watercolor-dot/` without striking the
policy row would NOT have failed the generator. Striking the row was **hygiene, not
necessity** — the right act (a row pointing at nothing is the same dead-reference class
this whole row carries out), stated here for the right reason.

[BK #55 CURE-4 · 2026-08-07] **`demo/stories/manifest.ts` attribution, honestly.** At the
time this record was drafted the working tree's manifest diff carried FOUR changed lines,
and the record silently claimed all of them. Two were this row's — the blob story
description at `:443`, which loses the `/watercolor-dot` subpath and the *"lit static
register"* phrase. The other two were **#46 GF-TIMELINE's**, an intended hunk that never
landed: `git show 9bc8d25f -- demo/stories/manifest.ts` is **empty**, while #46's own
`RECORD:351` intended it. Per the DRIVER RESOLUTION and the `f9352875`/`abe006af`
precedent, that hunk lands as its own `#46 completion` commit BEFORE #55's commit — and it
**has**: `ff7451d7` *"docs(demo): BK #46 completion — the manifest's timeline description,
intended by #46 RECORD:351, missed by the 9bc8d25f scoped add"*, now HEAD. Verified after
the fact: `git diff HEAD -- demo/stories/manifest.ts` is now exactly **1 removed + 1 added
line at `:443`**, so #55's diffstat for this file is **2 lines and both are this row's**.

### 3.3 · The demo rebuilt from the library's own primitives

**`demo/stories/foundations/colors.vue` — the 13-stop ramp.** The stop is now its index
PAINTED in its own hue: `<HandMark brush="highlighter" shape="highlight">`. HandMark is the
library's own hand-mark engine and §3 of the census keeps it explicitly (*"domain-free brush
× shape engine"*), so a hand-painted voice is replaced by a hand-painted voice the library
actually owns — not by the flat chip the dot was brought in to retire. **The mark and the
caption FUSE**: the numeral is the label and the swipe behind it is the swatch, so the file
loses an element rather than gaining one. The hand-laid stagger, the size register and the
`.scroll-cascade--columns` entrance all survive untouched.

**Two knobs, both load-bearing, both found by LOOKING — and the first cut shipped neither.**
`pi55-ramp-CUT1-REJECTED.png` is banked as the counter-evidence: it is jsdom-GREEN (13
marks, 13 hues, every assertion passing) and visually a thin dirty smear under each numeral.

- **the slot is `w-24 inline-block`.** HandMark is a TEXT-mark engine: the band thickness is
  `brush.weight` inside a viewBox whose HEIGHT is derived from the box ASPECT
  (`HandMark.vue:80-89`). A bare numeral measures 29×50 → aspect 0.58 → tall viewBox →
  hairline. A ~~96×50 box → aspect 1.9 → **band 25px of a 50px box**~~ **96×53.3 box →
  aspect 1.80 → viewBox `0 0 100 55.501` → band 25.49px**, measured live.
  [BK #55 CURE-1 · 2026-08-07] The struck triple was hand-rounded and inconsistent with the
  engine it describes. `HandMark.vue:80-89` computes `vbH = VB_W / boxAspect` with
  `VB_W = 100` (`constants.ts:9`), so the painted viewBox is the ARITHMETIC witness of the
  box aspect: the measured `0 0 100 55.501` fixes the aspect at 100/55.501 = **1.8018**,
  which over a 96px-wide slot fixes the box height at **53.28px** — never the 50px/1.9 the
  draft asserted (an aspect of 1.9 would have printed `0 0 100 52.632`). The band measures
  **25.49px**, not a flat 25. The neighbouring `29×50 → 0.58` bare-numeral figure is the
  PRE-cut state and was NOT re-measured at cure; it shares the same line box, so its height
  is the same 53.3 and its aspect ≈ 0.54 — flagged here rather than silently rewritten,
  because no second measurement of it was taken.
- **`:overrides="{ opacity: 0.72 }"`** over the shipped 0.38. The ramp IS the content (the
  reference-class one-color-event exemption), so a stop must carry a legible
  `--section-color-N`. 0.38 multiply is tuned for marking a word on a page, not for BEING
  the specimen. `overrides` is HandMark's own third resolution level — a shipped knob, not
  a fork.

**`demo/stories/substrates/blob.vue`.** Two whole StorySections **STRUCK** — *"The static
zero-GL register — WatercolorDot"* and *"The ghost register"*. A section whose specimen has
left the library documents nothing, and the contrast they existed to draw (lit GL sibling vs
cheap static sibling) no longer exists here. The page is about `Blob`. The Configurator
`Stops` row keeps its job as a **readout** — one painted chip per derived stop, no drawing
context: a configurator reports a value, it is not a specimen. `dotColors` and the import
go with them; the file loses 94 lines and gains 11.

### 3.4 · The dangling references ~~, all of them~~ — the library + unit tree

[BK #55 CURE-2 · 2026-08-07] *"all of them"* was **FALSE as written**: the table below is
the library + demo + unit-test tree only, and it silently omitted the `tests-visual/`
workspace, where three more specs name subjects this cut deleted. Its true scope is stated
in the heading and the omitted trio is discharged at **§3.5**, not routed.

| site | what it said | disposition |
|---|---|---|
| `demo/stories/manifest.ts:443` | *"the lit static register … Shipped /blob + /watercolor-dot"* | subpath + phrase struck |
| `src/components/PROCEDURAL-SUITE.md` | **five** retained surfaces; table row; *"WatercolorDot needs no drawing context"*; the §WatercolorDot body | **four**; row cut; the context-free exception restated as departed; body deleted |
| `src/components/blob/README.md:6-9,285-287` | blob's sibling + *"route the static register to `WatercolorDot`"* | blob is now the library's ONE organic-mass surface; the thumbnail-grid advice keeps its real point (painted CSS, never a grid of live contexts) |
| `src/styles/utilities/base-misc.css:263-267` | *"THE FENCE (binding both ways)"* against the ghost dot | a fence needs two sides; `.ghost-slot` is now the library's ONE placeholder register, and a future blob-silhouette slot mints its own |
| `src/composables/glass/procedural/prng.ts:2-5` | seeded *"for the watercolor-dot and goo-blob"* | the four real consumers named (blob · handmark · constellation · fourier-field) |
| `src/composables/glass/procedural/color.glsl.ts:43` | *"the blob/watercolor-dot value.js-free invariant"* | blob's invariant |
| `handmark/texture.ts:30` · `HandMark.vue:59` | *"the glass-ui WatercolorDot idiom"* | a provenance citation may not point at an absent component — restated as the house per-instance SVG-namespace idiom |
| `tests/demo/landing.test.ts:48` | `[data-testid="watercolor-swatch"]` count 0 | **STRUCK.** Its only producer left at this cut, so the assertion became unfalsifiable; **this cut created that deadness and carries it out** (#18's own no-orphan duty) |

**Refused with grounds, one line above the struck one:** `landing.test.ts:47`'s
`.optical-bench-signature` guard has **zero producers at HEAD already** — dead before this
seat touched anything. It is the same overfit class and it is **not this row's**; it belongs
to the gate/overfit lane (#65/#19). Left exactly as found.

### 3.5 · The `tests-visual/` residue — STRUCK, not routed [BK #55 CURE-2 · 2026-08-07]

The three specs §3.4 omitted. **The universe was generated, not remembered:** a repo-wide
grep over `src demo tests tests-visual scripts` for `watercolor-swatch` / `watercolor-ghost`
returns **producers: ZERO** — every remaining hit is a CONSUMER in one of these three files
(plus the already-struck `landing.test.ts:48`). The deadness is unambiguous and this cut
made it, so this cut carries it out, exactly as it did for `landing.test.ts`.

| site | what it stood on | act |
|---|---|---|
| `tests-visual/emission.spec.ts` header arm (d) + the whole `BC.W-VIZ-WATERCOLOR` describe (1 test, ~80 ln) | `[data-testid="watercolor-ghost-pair"]` · `[data-testid="watercolor-swatch"]` · `.watercolor-ghost-stroke` — **0 producers** | **DELETED whole with a dated bracket in place.** No stand-in exists (there is no surviving dashed-silhouette surface) and inventing one would preserve the masking class rather than kill it. `frame()`, `Page` and `expect` all keep other consumers — nothing orphaned |
| `tests-visual/blob-page.spec.ts` arms 1 + 3 (`SWATCH-EDGE-CRISP`, `HERO-FIRST IA`) + header `:6-13`,`:22-23`,`:37-40` | the same `watercolor-swatch` selector, via `largestSwatch`'s 20s `waitFor visible` | **DELETED whole, WITH the four symbols that die with them** — `largestSwatch` · `flingSpecks` · `luma` · the 4 `SPECK_*`/`FLING_SPECK_MAX` tunables · the now-sole-consumer `import type { Locator }`. Each was verified single-consumer before removal; leaving them would have been the same dead-reference class the row exists to cut. `SATELLITES-SEPARATE` survives untouched, so the spec keeps ONE live bite and the header now says ONE |
| `tests-visual/blob-pause-seam.spec.ts` `:17-19`, the CAP test title + `:133-140` + the failure message | prose only — *"the static register routed to WatercolorDot (zero GL)"* as the REASON the bound holds | **PROSE RE-TRUED, the test UNTOUCHED.** This one is not dead: the assertion counts live `goo-blob-canvas` contexts against `CAP = 6` and never referenced the departed component. Only its dead explanation is struck — deleting the test would have been the opposite error |

**Choice and ground:** STRIKE, not RT-55C. The alternative (routing all three to #19) was
declined because (a) the surfaces are named with line ranges and measure ZERO producers —
there is no interpretive call left for a later seat to make; (b) #19 already discharged this
exact class once as RT-18G and the driver's own ruling there governs — *"the masking class
dies with its subject"*, with ⊕²⁵'s *"an unwired gate is ABSENT, never GREEN"*; (c) the
suite being unwired is the argument FOR acting now, not for deferring — nothing reds today
either way, so a route only guarantees the rot outlives the memory of why it is rot. The
one asymmetry — pause-seam's live assertion — is why the three are dispositioned
differently rather than as a block.

`mulberry32` / `hashString` keep 4 internal consumers each, so the EXPORT-REACH arm gains no
offender; `randomRadii` / `radiiToCSS` / `useWatercolorBlob` had zero sites outside the
deleted dir and leave with it.

---

## 4 · VERIFY GATE

```
$ npx vue-tsc --noEmit
(no output)                                    exit 0

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  6 failed | 148 passed (154)
      Tests  11 failed | 1386 passed | 2 expected fail (1399)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
```

**The receipt is BYTE-IDENTICAL pre and post — every field, including `drift:1` and
`violations:1`. Budget exactly 60, `bound:8`, `unbound:50`, nothing minted, nothing bound.**

**The two non-zero fields are NOT this seat's and were captured before it touched the tree:**
`drift:1` is `reka.tags-input.value-binding`, PINNED and REPORTED at #65 ⊕³⁶(b);
`violations:1` is `pager.tabs.panel-linkage: sourcePath missing —
tests/components/pager-dots.contract.test.ts`, a file the **#40 lane deleted in this working
tree** and which exists at HEAD.

**The 11 vitest failures are the SAME ELEVEN, by name, pre and post** (`vitest-pre.txt` ∥
`vitest-final.txt`) — all owned by the in-flight lanes sitting uncommitted in this shared
tree: #40 (`pager-dots` ×4, `carousel` ×1, `stacked-url-filter` born-RED, `gate-register`
×3 via the deleted contract file), #32/#71 (`overfit-structure` EXPORT-REACH on
`useLeadTrail`). **Zero new failures.** The honest delta is `1402 → 1399` cases and
`1389 → 1386` passing: **exactly the 3 cases of the contract test this row deleted.**

One transient RED was raised and cured mid-seat: `boot-graph — build arm` FAILs when sources
are newer than `dist-demo/` (*"a stale build greens a regressed graph"*). `npm run
demo:dist:build` (untracked, `.gitignore:65`) restores it; run again after the final edit.

## 5 · PAINT — measured live, port-guarded

`vite preview` on **5479** (5411 was occupied on a wildcard address and was abandoned rather
than measured through; every probe self-guards on `location.port` and none returned
`GUARD_FAIL`).

| cell | figure |
|---|---|
| `/foundations/colors` light 1280 | 13 `.hm[data-shape="highlight"]`, ~~26 painted paths~~ **13 painted paths**, **13 DISTINCT `oklch()` fills**, `data-behind="true"` ×13, band 92×~~25~~**25.49** in a 96×~~50~~**53.3** box, `fill-opacity 0.72` |
| `/foundations/colors` dark 1280 | 13 marks hold; fills re-resolve to the dark arm (`oklch(0.721 0.145 354)` …) and stay legible against the dark ground |
| `/substrates/blob` light 1280 | 7 → **5** sections; `static zero-GL register` and `ghost register` absent from `innerText`; Stops row = 3 painted chips at 40px carrying the derived palette |
| both pages | `[data-testid="watercolor-swatch"]` → **0** |

Banked: `pi55-ramp-light-1280.png` · `pi55-ramp-dark-1280.png` ·
`pi55-blob-page-light-1280.png` · `pi55-ramp-CUT1-REJECTED.png` (the headless-green,
visually-broken first cut, kept as evidence for why the two knobs exist).

**Not claimed:** Safari. No `safaridriver` session ran this seat, so no WebKit cell is
asserted — HandMark's `blend: multiply` and its SVG filter path are the two places a WebKit
divergence would show, and they join the standing owed-Safari queue rather than being
inferred from Chromium.

---

## 6 · WHAT TRAVELS OUT

- **RT-55A** — the value.js relay (§2.1), including the two measured dead bindings → **#76**,
  ONE marked addendum in value.js's own tranche.
- **RT-55B** — `demo/stories/motion/handmark.vue` is now the demo's second-largest HandMark
  consumer and `colors.vue` its first; the `highlight`-on-a-narrow-box hairline (§3.3) is a
  **latent API trap** for anyone marking a short token, and the aspect-derived viewBox that
  causes it is documented only in a source comment → **#87 W-MARKS** (the display-atoms
  lane), as a doc or a clamp, its call.
- **Refused, with grounds:** `landing.test.ts:47` (§3.4) — pre-existing dead guard, the
  overfit lane's.
- **RT-55C — NOT BANKED.** The `tests-visual/` residue was **struck at cure**, not routed
  (§3.5 states the choice and its ground). Nothing owed to #19 from this row.
- **RT-55E [BK #55 CURE-1 · 2026-08-07] — one OWED driver edit, OUTSIDE this seat's fence.**
  The figures CURE-1 corrects are duplicated in this row's own source comment at
  `demo/stories/foundations/colors.vue:23-24` (*"29×50, aspect 0.58 … A 96×50 box (aspect
  1.9) lands the band at 25px"*) and `:29` (*"13 marks, **26 paths**, 13 distinct oklch
  fills"*). That file is source, not this row's docs, so the cure seat did not touch it —
  but the falsified figures are LIVE at HEAD in a tracked comment and must be corrected to
  `96×53.3 / aspect 1.80 / band 25.49px` and `13 paths` before the row's commit, or CURE-1
  is paid in the record and unpaid in the tree. **Driver act, one file, two comment lines.**

**Φ5 procession: next = re-scout.** #55 unblocks nothing new — no DAG row deps it. The
frontier moves only by its own removal, and the procession still opens on a **re-scout**,
never on an assumed next.

---

## 7 · CURE LEDGER — CURE-ORDER-55.md, adjudicated 2026-08-07

Ruled CURE-REQUIRED at `0c282a6f`; applied at `ff7451d7` (the driver's `#46 completion`
commit, which is itself CURE-4's resolution, landed in between). All six are DOCUMENTARY:
the code substance stands untouched — the selection walk, the 512-line whole-component
delete, the contract test, exports 67→66, the byte-identical receipt, the eleven in-flight
failures, the paint-verified ramp rebuild with its rejected-cut counter-evidence, the
`landing.test.ts` refusal, the `base-misc.css` bracket, the aurora medium-name non-hits,
seats +0 and the Safari owed-queue disclosure.

| cure | sev | act | files |
|---|---|---|---|
| **C1** | high | *"26 painted paths"* → **13**, stated with its detector; §3.3's box math → the measured `96×53.3 / 1.80 / 25.49px`, viewBox `0 0 100 55.501`. Re-verified from source, not accepted on trust: `brush.ts:269` `passes: 1` and `ink.ts:162-229` push **exactly one path per pass**, so 13 marks ⇒ 13 paths; `HandMark.vue:80-89` + `constants.ts:9` (`VB_W = 100`) make the viewBox the arithmetic witness of the aspect. **One residue OUT of fence → RT-55E** | `RECORD.md` §3.3 · §5 · `PASTE-BLOCKS.md` |
| **C2** | high | the `tests-visual/` residue **STRUCK IN PLACE**, choice + ground at §3.5; §3.4's *"all of them"* corrected to its true scope | `RECORD.md` §3.4 · new §3.5 · `emission.spec.ts` · `blob-page.spec.ts` · `blob-pause-seam.spec.ts` |
| **C3** | med | the fail-closed claim corrected: `classifyTier` is fail-closed **dir→row only**; a classified-but-absent dir is `stale`, a soft reported drift at **exit 0** (`subpath-policy.mjs:213-226`, whose header says so in as many words). The row strike was **hygiene, not necessity** | `RECORD.md` §3.2 |
| **C4** | med | `demo/stories/manifest.ts` attributed honestly (2 lines this row's at `:443`; 2 lines #46's unlanded hunk, `git show 9bc8d25f` empty). DRIVER RESOLUTION stated **and confirmed executed** — `ff7451d7` is the `#46 completion` commit and it precedes #55's; the file's diff is now 2 lines, both this row's | `RECORD.md` §3.2 |
| **C5** | med | six `EXECUTION-DAG-2026-08-03.md` cites +1 each (`:58`/`:59`/`:60`/`:62`/`:63`/`:64`, each re-read on disk); two cursor cites repointed off unrelated prose (`:1578`→`:1771`, `:1621`→`:1811`); bare `ASK.md` qualified to `docs/tranches/BK/ASK.md` **×4** (`:20`/`:22`/`:35`/`:42`, all re-read, content CORRECT); #54's ground restated — **Φ4/5 UNSTARTED**, skipped because its completion rides ASK-g1-gated `#50` W0 and ASK-g4-gated `#53`, not because it is *"not Φ5"* | `RECORD.md` §0 · §1 |
| **C6** | low | the `see WatercolorDot.vue` provenance citation **removed, deliberately not re-pointed**. The order's alternative — cite `DockGooFilter`/`GlassGooFilter`/`fission-bridge.css` as *"the live filters"* — was **declined on a measured ground: none of those three exist on disk at HEAD**, so it would have swapped one dead pointer for three. Stated standalone, with the two real surviving `color-interpolation-filters="sRGB"` declarations named. `docs/consumer-evidence/color-swatch.md:43` left as found, per the order | `DESIGN.md:179` |
| **post** | — | `PASTE-BLOCKS.md` re-drafted: every figure re-derived from the cured record, `<SHA>` a literal stated placeholder | `PASTE-BLOCKS.md` |
