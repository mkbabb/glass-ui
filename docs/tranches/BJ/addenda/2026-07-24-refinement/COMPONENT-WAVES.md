# COMPONENT WAVE SPECS — tier 1

Eight components, each put through a triumvirate: three hostile challenger benches (design flawed /
library mis-structured / implementation wrong), three jurors, one foreman authoring the terminal spec.

**Read the provenance note before the specs.** The Fable 5 quota was exhausted mid-run: 48 of 57 seats
died, taking every challenger and juror bench with them. The eight foreman seats ran on Opus and
survived. Each foreman states plainly that it received no bench verdict and re-derived every row
against HEAD itself — they are honest about it rather than dressing an empty jury as a consensus.
Treat these as **single-seat specs with self-declared provenance**, not as adjudicated triumvirate
output. The challenge/jury passes are owed and are re-deployed on Opus.


---

## W-TIMELINE — close the four residual defects the BD greenfield left behind; no restructure

**Disposition:** KEEP
**Jury:** All three benches returned empty (no juror produced a verdict). Foreman ruled on first-hand source evidence at HEAD rather than carry an unadjudicated wave: the BD greenfield landed (warm `.timeline-rail`, sprung `translateX` head, always-visible bead — all verified present), so the structural verdicts are already spent. What survives is four localized defects, three of which are *silent* (green demo, broken consumer path). No bench disagreement to break because no bench spoke; nothing below is asserted on juror authority, only on file:line.

**LOC now → expected:** 2270 (`src/components/timeline/`) → ~2260

### Defects this wave closes

| id | defect | evidence | sev |
|---|---|---|---|
| T-1 | `celAccentFor()` returns the literal string `"var(--cel-accent)"`, written as an inline custom property onto the same element `.timeline-cel` reads it from → self-referential custom property → CSS cycle → guaranteed-invalid → `background: color-mix(…var(--cel-accent)…)` is invalid at computed-value time → `unset` → **the cel paints no fill at all**, only its inset hairline. Fires for every segment with `gradient` omitted or `gradient` given as a raw CSS string (both are documented `TimelineSegment` shapes, `types.ts:37-45`). Invisible in the demo because all three demo segments pass `{from,to}`. | `SegmentedTimeline.vue:43` returns `"var(--cel-accent)"`; bound at `SegmentedTimeline.vue:80`; consumed at `GlassTimeline.vue:222-226` | high |
| T-2 | The scrubber's advertised WCAG-2.5.5 44px hit halo is inert. `.glass-thumb-seat` sets `pointer-events: none`; the halo lives on `.glass-thumb::before`, a descendant, and never re-enables. The real pointer target is `.glass-track` at `--timeline-h-scrubber` = 0.75rem×1.272 ≈ **15.3px** block-axis. The code comment claims the floor is met. | `ScrubberTimeline.vue:360` (`pointer-events: none`), `:394-399` (halo, no `pointer-events: auto`), height at `:283`, ladder at `GlassTimeline.vue:155-161` | high |
| T-3 | The `label` caret is (a) anchored in the wrong coordinate space — `left: %` resolves against `.timeline-row`'s padding box while the bead travels `cqw` of `.glass-track`, which is inset `0 0.25rem` → up to 4px lateral disagreement at each terminus; and (b) `opacity: 0` unless `.timeline-row:hover` or `:has(.glass-track:active)`, so a **keyboard scrubber never sees the value readout** — the exact opacity-until-hover pattern this component retired for the bead. Compounded by (c) the caret reading raw `modelValue` while the bead reads `headSpring`, so during a drag the two disagree by the full 0.34s spring lag. | `ScrubberTimeline.vue:203` (`left`), `:236-243` (row padding), `:250` (`opacity:0`), `:257-260` (reveal selectors), `:185` (bead channel) | med |
| T-4 | Fill progress is a per-frame **layout** channel, and `will-change` is ungated on two of three variants. `.glass-fill` width is written from a spring every frame (`fillStyle`); `.segmented-band` and `.continuous-region-fill` both carry unconditional `will-change: width` — one per segment, permanently, on a property that is not compositable. The scrubber gated its own `will-change` to `[data-scrubbing]`; the other two variants were not brought along. | `ScrubberTimeline.vue:193-195`, `:365-371` (the correct gating), vs `SegmentedTimeline.vue:168`, `ContinuousRail.vue:132` (ungated) | med |

**Overruled** — closed at HEAD, may not be re-raised:
- "Gray `--surface-tint-6` / `--glass-blur-wash` substrate, three copies" — retired; one `.timeline-rail` at `GlassTimeline.vue:179-196`, composed by all three variants.
- "Head travels on `style.left`" — retired; `translateX(calc(N cqw - 50%))` at `ScrubberTimeline.vue:185`.
- "Thumb is `opacity: 0` until hover" — retired; `.glass-thumb` has no opacity gate.
- "Phantom `--sqrt-phi` / `.glass-opaque`" — `--sqrt-phi` minted at `GlassTimeline.vue:153`; `--glass-level: 0` is the PRT path at `:209-213`.
- "Three variant SFCs are sprawl, collapse them" — overruled: `role="slider"`, `role="group"`, and `role="progressbar" ⊥ list` are three different accessibility contracts, not three skins. Only `GlassTimeline` is exported (`index.ts`), so the shared non-scoped register always ships.
- "The shared `.timeline-rail` register can be missed by direct-variant imports" — overruled: the variants are private; there is no such import path.

### The change

**T-1.** `SegmentedTimeline.vue` — delete `celAccentFor()` entirely. In the template, set `--cel-accent` **only** when a `{from,to}` pair is present:
`:style="{ ...(seg.gradient && typeof seg.gradient === 'object' ? { '--cel-accent': seg.gradient.to } : {}), width: … }"`.
With the property absent, `.timeline-cel` inherits `--cel-accent` from `.timeline-row` (`GlassTimeline.vue:169`) as designed. No fallback chain, no self-reference. Raw-string gradients contribute no cel hue — document that on the `gradient` field in `types.ts` (it is already unparseable to a single stop).

**T-2.** `ScrubberTimeline.vue` — delete `.glass-thumb::before` (lines 391-399). Move the target expansion onto the gesture owner: add to the scoped block
`.glass-track::before { content: ""; position: absolute; inset-inline: 0; inset-block: calc((var(--timeline-touch-target, 44px) - 100%) / -2); }`
`.glass-track` is already `position: relative` (via `.timeline-rail`) and already carries the pointer handlers, so the pseudo extends *its* hit region with no `pointer-events` juggling. Leave `.glass-thumb-seat { pointer-events: none }` as-is. Strike the false 44px claim from the comment at `:391-393`.

**T-3.** `ScrubberTimeline.vue` — move `.timeline-caret` inside `.glass-track` (sibling of `.glass-fill`) so it shares the bead's coordinate space and container, and drive it off the same channel: `:style="{ transform: 'translateX(calc(' + (headSpring.value * 100).toFixed(3) + 'cqw - 50%))' }"`; drop the `left` binding and the `transform: translateX(-50%)` at `:248`. Keep `bottom: calc(100% + 6px)`. Replace the reveal rule at `:257-260` with
`.glass-track:hover .timeline-caret, .glass-track[data-scrubbing] .timeline-caret, .glass-track:focus-visible .timeline-caret { opacity: 1 }`
— `[data-scrubbing]` is already stamped at `:211`, and `:focus-visible` is what makes the keyboard path visible.

**T-4.** Convert the three fill channels from `width` to a compositor channel and gate promotion:
- `ScrubberTimeline.vue` — `.glass-fill` becomes `inset: 0; width: 100%; transform-origin: left center;` with the per-frame style `transform: scaleX(<fillSpring>)`. The `.is-flooding ::after` keeps its own untransformed geometry by counter-scaling (`scaleX(calc(1 / var(--fill-sx)))`) off a `--fill-sx` custom property written alongside.
- `SegmentedTimeline.vue:163-169` — `.segmented-band`: `width: 100%; transform: scaleX(var(--cel-fill, 0)); transform-origin: left center; transition: transform …`; bind `--cel-fill: fillFor(seg)`; **delete** `will-change: width`.
- `ContinuousRail.vue:118-133` — `.continuous-region-fill` keeps its background-windowing math but clips via `clip-path: inset(0 calc(100% - var(--continuous-fill-width, 0%)) 0 0)` instead of `width`; **delete** `will-change: width`. (`scaleX` is wrong here — it would squash the windowed gradient.)
- Add, once, in the `GlassTimeline.vue` non-scoped block: `.timeline-rail[data-scrubbing] .glass-fill, .timeline-rail[data-animating] .segmented-band { will-change: transform; }` — promotion exists only during the gesture.

### Born-RED gates

**G-TL-1 — a timeline cel never writes a self-referential custom property.**
Assertion: mount `<GlassTimeline variant="segmented" :segments="[{key:'a',label:'A',state:'active'}]" />`; the rendered `.timeline-cel` element's inline `style` attribute must not contain a `--cel-accent` declaration whose value references `var(--cel-accent)`.
RED at HEAD: `SegmentedTimeline.vue:43` returns the literal `"var(--cel-accent)"` for any segment lacking an object gradient, and `:80` binds it — the emitted attribute is exactly `--cel-accent: var(--cel-accent)`. Runs in jsdom; no layout, no browser.
Mutation proving it can fail: restore the `return "var(--cel-accent)";` branch → RED.

**G-TL-2 — the scrubber's pointer target meets the 44px block-axis floor.**
Assertion (Chromium, existing Playwright/π harness, `/data/timeline`): with the track's border-box centre at `(cx, cy)`, `document.elementFromPoint(cx, cy - 20)` and `(cx, cy + 20)` must both resolve to `.glass-track` or a descendant.
RED at HEAD: the track computes `height ≈ 15.3px` (`--timeline-h` 0.75rem × `--sqrt-phi` 1.272, `GlassTimeline.vue:155/158`, applied at `ScrubberTimeline.vue:283`) and the only extension is `.glass-thumb::before` under an ancestor `pointer-events: none` (`:360`) — both probes hit the page container today.
Mutation proving it can fail: delete `.glass-track::before` → RED.

No third gate. T-3 and T-4 are adjudicated by the π captures below, not by new gate rows — the library budget does not admit a caret-visibility gate.

### π / DELTA obligations

Route `/data/timeline` (category `data`, storyId `timeline` — `demo/stories/manifest.ts:845`), all three variants on one page, viewport 1280×800 and 390×844, light **and** dark.

| claim | paired capture |
|---|---|
| T-1 cel now paints | before/after PNG, Chromium, 1280×800 light, of a segmented timeline **seeded with a gradient-less segment** (the demo must gain one — today every demo segment carries `{from,to}` and the defect cannot be photographed). Before = hairline-only ghost cel; after = tinted chip. |
| T-3 caret tracks the bead | before/after frame-series, Chromium 1280×800 light, mid-drag at t≈0.5 and at t=1.0 — the before pair shows the caret leading the bead; the after pair shows co-location. Plus a keyboard-only frame (focus + `ArrowRight`) where before = no caret, after = caret. |
| T-4 no layout on the fill channel | before/after DevTools performance trace over a 1s drag, Chromium 1280×800; the claim is "zero forced layouts attributable to `.glass-fill`", measured, not asserted. |
| dark-mode rail composite unchanged | before/after PNG, Chromium 1280×800 dark — this wave touches the fill/cel channels, not the rail; the capture is a **no-regression** witness. |

**WebKit cells are owed and NOT delivered.** The `transform: scaleX` and `clip-path: inset` swaps in T-4, and the `cqw`-in-`translateX` caret in T-3, are exactly the paths where WebKit diverges. The WebKit arm of this component's π has never been run — no `*.png`/`*.json` artifact exists for it in any tranche directory. Do not write "both engines" into any receipt for this wave.

### Breakage

- **`--cel-accent` no longer set inline for raw-string gradients.** A consumer who passed `gradient: "linear-gradient(...)"` to the segmented variant and expected a hue got an invisible cel (T-1); they now get the inherited `--cel-accent`. Migration: pass `{from, to}` for a per-phase cel hue, or set `--cel-accent` yourself on the `<GlassTimeline>` element.
- **`.timeline-caret` moves inside `.glass-track` in the DOM.** Anyone selecting `.timeline-row > .timeline-caret` breaks. Migration: select `.timeline-caret` unqualified.
- **`.glass-fill` / `.segmented-band` no longer animate `width`.** A consumer overriding `transition: width …` on either gets a dead override. Migration: target `transform`.
- Public prop, event, and slot surface is untouched. `GlassTimeline` remains the only export.

### Open

- Whether `clip-path: inset()` on `.continuous-region-fill` preserves the stitched-gradient window under WebKit's background-position-x rounding. Decided by: the WebKit π cell above, once a WebKit runner exists — a single 1280×800 light capture of `/data/timeline` continuous at 40% active-region progress, compared stop-for-stop against the Chromium cell.
---

## W-HANDMARK — thin the hand voice to the six shapes that actually paint; kill the two crashing/inert escape hatches

**Disposition:** KEEP-THIN
**Jury:** All three benches returned failed — no juror text to weigh. Verdict is foreman-only, decided on re-run source evidence in this session (probe mount + grep census, both reproduced below). Where a bench would plausibly have split — DELETE (0 external consumers) vs KEEP — I broke it for KEEP-THIN: `docs/consumer-evidence/handmark.md` books a dated re-audit (2026-09-01) with an explicit RETIRE branch, and today is 2026-07-24; retiring now front-runs a decision the repo already scheduled. The thinning is what the evidence *does* support.
**LOC now → expected:** 2231 (src/components/handmark/**, .ts + .vue) → ~2203

### Defects this wave closes

| id | defect | evidence | sev |
|---|---|---|---|
| HM-1 | `shape="path"` — a declared member of the public `HandShape` union — throws and kills the whole subtree render. With **or without** the `path` prop set. | `src/components/handmark/geometry.ts:176-178` returns `{ lines: [] }` → `src/components/handmark/composables/useHandMark.ts:246` substitutes `[[]]` → `src/components/handmark/ink.ts:167-168` reads `centerline[0]` → `a[0]`. Probe: `mount(HandMark, { props: { shape: "path", path: "M 0 30 L 100 30" } })` → `TypeError: Cannot read properties of undefined (reading '0')` at `ink.ts:168:13`. | HIGH |
| HM-2 | `points?: [number, number][]` is a phantom public prop — declared and documented ("arbitrary point stream → brush ink"), never read. | `src/components/handmark/types.ts:91` is the only occurrence in the component; absent from `UseHandMarkInput` (`useHandMark.ts:53-87`) and from `normalizeProps` (`useHandMark.ts:100-121`). Probe: rendered `d` with `:points="[[0,10],[50,20],[100,10]]"` is byte-identical to the default mount (both `M3.8428246573391838,32 C…`). | MED |
| HM-3 | `pathD` on the published headless core is unread by the SFC **and** disagrees with it: it serializes raw centerlines, while the component renders `ink()` bodies (hull fill for boil/crayon/marker/highlighter). A headless skin binding it gets a different mark than `<HandMark>`. | declared `useHandMark.ts:131`, computed `:218-227`, returned `:269`; the SFC binds `fragment.paths` (`HandMark.vue:284-302`). Zero non-self readers: `grep -rn "pathD" src/ demo/ tests/` hits only those three lines. | LOW |

Both HM-1 and HM-2 survived to HEAD because `demo/stories/motion/handmark.vue` exercises pen/boil/pencil/crayon/marker/highlighter/ring + underline/highlight/circle/box/bracket + draw-on/amplitude/color — and neither `shape="path"` nor `points`.

§Overruled
- **"0 external consumers ⇒ DELETE the subpath."** Overruled: the dated re-audit in `docs/consumer-evidence/handmark.md` owns that call on 2026-09-01. Cannot be re-raised before that date.
- **"`.hm` lacks `isolation: isolate` ⇒ the highlighter's `multiply` leaks."** Overruled: deliberate and reasoned at `HandMark.vue:312-316`; one mark per word, no observed leak. Re-raising requires a paint capture of two adjacent marks bleeding.
- **"the vendored `freehand.ts` (379 LOC) is dead weight."** Overruled: it is the L2 body for `ribbon:'hull'` — boil, crayon, marker, highlighter — all four mounted in the story.

### The change

Delete both escape hatches rather than repair them. Neither has ever rendered once (HM-1 proves `path` never painted; HM-2 proves `points` never did anything), so there is no behaviour to preserve and no alias to leave behind.

1. `src/components/handmark/types.ts` — drop `| "path"` and its trailing comment from `HandShape` (line 27; `HandShape` becomes the six members underline · strikethrough · highlight · circle · box · bracket). Delete `path?: string` and `points?: [number, number][]` with their doc comments (lines 88-91). `box?: MarkBox` stays — positioned mode is live in the story.
2. `src/components/handmark/geometry.ts` — delete `case "path"` (lines 176-178). Post-change invariant: every `shapeGeom` branch, including `default:`, returns at least one non-empty centerline.
3. `src/components/handmark/composables/useHandMark.ts` — delete the `path: string | null` field from `UseHandMarkInput` (line 70), the `path: props.path ?? null` line in `normalizeProps` (116), the `if (input.value.path)` guards in `pathD` (219) and `liveLines` (232), the entire `pathD` computed (218-227), its `HandMarkCore` declaration (131), and the `pathD` key in the returned object (269). **Keep `baseGeom`** — it is the L1 datum a future React/web-component skin genuinely needs, and it does not diverge from what paints.
4. `src/components/handmark/HandMark.vue` — delete the `escapePath` computed (98-99) and bind `:d="p.d"` at line 289.
5. `src/components/handmark/ink.ts` — make the exported pure function total: immediately after the `b.stamp` branch (after line 154) insert `if (centerline.length < 2) return { paths: [], filterId: null, defs: [] };`. This is a domain guard on an exported pure function, not a fallback masking a dead primary — the in-repo caller can no longer reach it once (2) lands.
6. Docs: `src/components/handmark/README.md:5` — strike "or an arbitrary path" from the shape list. `docs/consumer-evidence/handmark.md` — strike "arbitrary path" from the §Artefact-path shape list; the dated re-audit paragraph is untouched.

No barrel change: `index.ts` exports `HandMarkProps`/`HandShape` as types, and the removed members ride those types.

### Born-RED gates

**G-HM-SURFACE** — *the declared surface is the painting surface.* One gate, two arms, in `tests/components/custom/handmark/HandMark.test.ts`.

- **Arm A (shapes):** for every member of `HandShape`, `mount(HandMark, { props: { shape }, slots: { default: "hi" } })` neither throws nor emits a `<path>` with an empty `d`.
  RED at HEAD: `shape: "path"` throws `TypeError: Cannot read properties of undefined (reading '0')` at `src/components/handmark/ink.ts:168:13` (verified this session).
  Mutation proving it can fail: reintroduce any `shapeGeom` case returning `{ lines: [], closed: false }` — the gate throws again.
- **Arm B (props):** each declared `HandMarkProps` key that claims a geometry effect (`seed`, `amplitude`, `natural`, `jagged`, `roughness`, `segments`, `box`) changes the rendered `d` versus the default mount.
  RED at HEAD via `points`: `:points="[[0,10],[50,20],[100,10]]"` yields a `d` byte-identical to the default (`M3.8428246573391838,32 C…`), so the key is in the declared set and fails the delta (verified this session).
  Mutation proving it can fail: declare any new `HandMarkProps` key and skip wiring it through `normalizeProps` — its delta assertion fails.

That is the component's entire gate allocation. One gate against the 40-60 library budget.

### π / DELTA obligations

One visual claim only: **no mark that paints today changes.** The wave deletes only never-rendered code paths, so the story must be pixel-stable.

- Owed: paired before/after full-page capture of the demo story slug `motion/handmark`, Chromium, 1440×900, light and dark. Compare the five brush rows, the circle/box/bracket row, the highlight band, and the `amplitude` pair; expected delta = none.
- Owed: same route, 390×844 Chromium (the short-word aspect path through `boxAspect`/`vbH`), expected delta = none.
- **WebKit cells are owed and currently blocked** — not captured, not claimed. Record them as outstanding rather than green.
- No new-behaviour capture is owed: nothing is added.

### Breakage

- `shape="path"` — removed from the type union. **Migration:** none possible and none needed; it threw at render for every consumer that ever tried it. Callers wanting an arbitrary `d` compose `ink()` (exported) with their own point stream and bind the fragment themselves.
- `path` prop — removed. **Migration:** as above.
- `points` prop — removed. **Migration:** the prop was inert; deleting the attribute is behaviour-identical. Callers wanting a point stream call `ink(points, resolveBrush(name), seed, color, filterId)` directly (both exported from `@mkbabb/glass-ui/handmark`).
- `useHandMark(...).pathD` — removed from `HandMarkCore`. **Migration:** read `fragment.paths[i].d`, which is what the component actually renders; `serialize(baseGeom.value.lines)` reproduces the old value for anyone who wanted centerlines.

All four are compile-time breaks under `vue-tsc`, not silent runtime drift. Zero in-repo call sites: `demo/stories/motion/handmark.vue` uses none of them; `tests/public-surface.spec.ts` tracks runtime members only (`handmark` appears at lines 276 and 350; neither is affected).

### Open

- **Does the pen underline's weight need to track font-size?** `HandMark.vue:291-294` binds `vector-effect="non-scaling-stroke"` with `stroke-width = brush.weight`, so a `pen` mark is ~6 device px at 14px body copy and ~6 device px at 72px display type. Two existing assertions pin this deliberately (`tests/components/custom/handmark/HandMark.test.ts:113-115`), and dropping non-scaling-stroke would tie weight to *word width* (scale = hostWidth/100), which is worse. Not sustained as a defect — no paint evidence either way. **The exact fact that decides it:** one Chromium capture of the same word rendered at `font-size: 14px` and `font-size: 72px` on the `motion/handmark` route, measuring the mark's painted thickness as a fraction of cap-height in each. If the ratio is not roughly constant, the correct fix is an em-proportional weight, and it is its own wave.
---

## W-AURORA — dedicated medium bodies on both backends, an honest 11-slot register

**Disposition:** GREENFIELD
**Jury:** All three benches returned empty (design, architecture, evidence — no verdicts emitted). Foreman adjudicated directly on disk at HEAD `0371836d`; every row below is re-verified this session against source, not inherited from `docs/tranches/BJ/formation/greenfields/GF-AURORA-PASS3.md`. Where PASS3 and disk disagreed (the `substrate-paints-color` roster pin; the V-A95 black slab) disk wins and the row is Overruled.
**LOC now → expected:** `src/components/aurora` 8,968 → ~9,350 · `demo/stories/substrates/aurora` + `demo/chassis/hero/aurora-hero.ts` 3,122 → ~2,880. The library grows: four real bodies cost more than the retired 4-layer oil monolith saves. The win is architectural, not byte-count — do not sell it as a reduction.

### Defects this wave closes

| id | defect | evidence | sev |
|----|--------|----------|-----|
| A1 | The WGSL primary — the backend the runtime *prefers* — collapses four selectable mediums into one body. `medium:"oil"`, `"vangogh"`, `"oil-pastel"` and `"kuwahara"` are the same pixels. | `src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts:398-401` — `if (medium == 3 \|\| medium == 5 \|\| medium == 6 \|\| medium == 7) { return mediumKuwahara(col, p, t); }`. Preference: `src/components/aurora/composables/useAurora.ts:25` ("the runtime itself prefers WebGPU"). | CRITICAL — masking fallback per the no-masking-fallback edict; this *is* the F08 "every mode looks the same" complaint |
| A2 | `oil-pastel` is a constant-profile skin of the oil cascade on **both** backends, not a body. | `mediums.glsl.ts:493-496` — `mediumOilPastel` = `profileFor(MEDIUM_OILPASTEL, 0)` + `paintStrokeMedium(...)`, the identical call `mediumOil` makes at `:376`. Only the profile constants differ. | HIGH |
| A3 | `crayon` is a uniform full-field tooth-multiply — a texture, not a drawn hand. No discrete marks, no per-zone direction, no lift-off. | `mediums.glsl.ts:152-206` (`mediumCrayon`) | MED |
| A4 | The register carries vendor-meta names and six slots that are knob-variants of a neighbour. | `demo/stories/substrates/aurora/presets.ts:724-726` — `OPENAI_SKY` / `OPENAI_DAWN` / `OPENAI_MEADOW`; `:723` `VIVID_SETTING_SUN` (SETTING_SUN + the chroma knob); `:730` `OIL_GESTURAL` (`strokeMode` click); `:733-734` `OILPASTEL_RAINBOW` / `_OCEAN`; `:728` `DAY9_YELLOW`; `:737` `SPEEDTEST` (a foreign consumer's fixture). 17 keys on disk. | MED — greenfield-no-meta + presets-in-consumers |
| A5 | Three shipped headers assert things the code contradicts. | `src/components/aurora/constants/presets.ts:4-6` names an 11-preset register ("Sky, Dawn, Meadow, Deliberative, Day9, Oil Impasto, Oil Gestural, Oil Van Gogh, Crayon Sunset, Crayon Rainbow, Crayon Ocean") — not one of those key names exists at `demo/.../presets.ts:721-737`. `vangogh-medium.glsl.ts:8` — "The dedicated body is shared by both renderer paths", falsified by A1. `uniformBridge.ts:76-79` books the collapse as settled truth. | MED |
| A6 | Two shipped axes are unreachable from the studio. | `demo/stories/substrates/aurora/config/options.ts:48-54` `flowPatternOptions` omits `"tensor"` (type at `presets.ts:110-116`); `:56-60` `warpModeOptions` omits `"curl"` (type at `presets.ts:134`). | LOW |

**§Overruled** — closed, may not be re-raised:
- *Roster-pin staleness in `tests-visual/substrate-paints-color.spec.ts`* — already cured at BJ.W-PIXEL-FLOOR-CI; `:333-338` pins 17, matching disk. Re-pinning at the cut is a rider of A4, not a defect.
- *V-A95 reverse-drag black slab* — not sustained. The only black state ever observed was produced by the probe's own `getContext()` on a live WebGPU canvas (context-steal). Carried as a rider, not a defect.
- *"Delete the oil medium"* — overruled. A lean dedicated body is the thesis-consistent arm; KILL fires only on a measured module-budget miss (see §Open).
- *"Demote Aurora to a demo component"* — overruled. It is a public export (`tests/public-surface.spec.ts:272-273`) and the shell's page substrate (`demo/shell/AppShell.vue:11`).

### The change

**1 — WGSL paint substrate, then van-Gogh on the primary.** Port to `aurora-mediums.wgsl.ts`: `StrokeHit` (struct, `brush.glsl.ts:21`), `paintOverOklab` (`:175`), `paintOver` (`:201`), `relightImpasto` (`:269`). `relightImpasto` uses `dFdx/dFdy` — this is the first screen-space derivative in any `.wgsl.ts` in the repo (`grep -c 'dpdx\|dpdy\|fwidth' src/**/*.wgsl.ts` = 0), so it must be *called from the uniform medium branch only* or the module will not compile under WGSL uniformity. Then port `vangoghDab` + `mediumVangogh` (derivative-free analytic crescent SDF). Delete `medium == 5` from the `applyMedium` disjunction. Rewrite `vangogh-medium.glsl.ts:8`.

**2 — oil-pastel gets a real body, dual-ported.** Delete `mediumOilPastel` (`mediums.glsl.ts:493-496`) and the `MEDIUM_OILPASTEL` branch of `profileFor`. Author, in GLSL and WGSL, four derivative-free terms: even-width **capsules with rounded ends** (stubby stick, never a tapered bristle); **buttery overlap-blend** — where deposits overlap, drag the *accumulated* colour along the stroke direction (bounded directional smear, never a fresh `sampleBase`); **analytic burnish sheen** `pow(dot(N, H), s)` with `N` built from tensor orientation + capsule half-width profile, gated on the coverage scalar — no `dFdx/dFdy`; **additive tooth-skip** (bright pigment on ridges, the inverse of crayon's multiply-into-pits). Delete `6` from the collapse.

**3 — crayon becomes a hand.** Rework `mediumCrayon` on both backends: discrete scribble marks with pressure-varying width and lift-off; **per-zone quantized direction** seeded off the nuclei field (continuous tensor-following is exactly what reads machine-made); **boundary overshoot/underfill** with a jittered margin. DRY law — no impasto crown, no sheen, ever. Sheen belongs to oil-pastel. The graphite/ink sub-mode is CUT.

**4 — oil, REAUTHOR-LEAN (default arm).** Author a lean dedicated oil body for both backends: two stroke layers not four, analytic AA (the `vangoghDab` construction generalized to tapered/knife shapes) replacing the data-dependent `fwidth` at `brush.glsl.ts:118-140`, `strokeMode` knife/chunky preserved as profile constants. Retire `curvedStroke` (`brush.glsl.ts:84-174`), `bestOil` (`:302-385`), `paintStrokeLayers` (`mediums.glsl.ts:251-343`), `paintStrokeMedium` (`:344-375`), the `StrokeProfile` machinery (`:207-250`), and `oil-modes.glsl.ts` entire. Keep `StrokeHit`/`rotateDir`/`safeDir`/`strokeShape`/`paintOver*`/`relightImpasto` — shared substrate. Delete `3` from the collapse and rewrite `uniformBridge.ts:76-79` to the post-cut dispatch. Terminal selectable-collapse set is `{}` — `{3,7}` is not an arm. `kuwahara` keeps id 7 and its own honest body.

**5 — the register: 17 → 11, clean break, no aliases.** Renames in `demo/stories/substrates/aurora/presets.ts`: `SETTING_SUN→SUNSET`, `OPENAI_SKY→SKY`, `OPENAI_DAWN→DAWN`, `OPENAI_MEADOW→MEADOW`, `DELIBERATIVE→PASTEL`, `OIL_IMPASTO→OIL`, `OILPASTEL_SUNSET→OIL_PASTEL`. Delete `VIVID_SETTING_SUN`, `DAY9_YELLOW`, `OIL_GESTURAL`, `OILPASTEL_RAINBOW`, `OILPASTEL_OCEAN`; relocate `SPEEDTEST` to the speedtest repo via a marked addendum in its tranche. Survivors = 4 solar (SUNSET, DUSK, SKY, DAWN) + 7 medium heroes (MEADOW, PASTEL, OIL, VANGOGH, OIL_PASTEL, CRAYON, METAL). **DUSK is re-founded, not tuned**: today it is SUNSET wearing a lilac whisper (same L range, same drift ladder); the replacement is low-L indigo/violet base (L≈0.35-0.45, h 280-300, C 0.10-0.12), the coral compressed to a narrow dying-ember horizon band, lilac veil above. **DAWN is hardened before it is judged**: high-L cool lavender-grey base, pink blush high and diffuse, **no sun-band** — the band is SUNSET's signature alone. Each of the four gets its **own** drift-phase ladder (the A/B/C trio literally shares one) and a drift signature that visibly migrates over tens of seconds — `driftRadius` 0.015-0.02 at `breathPeriod` 40+ reads static and does not clear the law-11 ambient floor.
Dead axes: `OIL_PASTEL` takes `huePath:"increasing"` with fewer stops (it becomes the hue-arc exerciser, absorbing RAINBOW/OCEAN by construction); `METAL` declares `interactivity:{ light:true, swirl:true }` — cursor-as-light *is* the metal identity. `vividness` and `source:"image"` stay register-invariant by design and are documented as such, not exercised.
Add `{ label:"Tensor", value:"tensor" }` to `flowPatternOptions` and `{ label:"Curl", value:"curl" }` to `warpModeOptions` in `config/options.ts`. Kill the name list at `presets.ts:4-6` — point at the demo register by path only; a name list in the library is a staleness engine. Re-pin `substrate-paints-color.spec.ts:338` to 11 as a deliberate literal witness. `tests-visual/aurora-vibrancy.spec.ts:33` `CANDIDATES → ["SUNSET","DUSK"]`. `tests/demo/aurora-stage-affordance.test.ts` takes the renames, second oil config inlines `{...PRESETS.OIL, strokeMode:"chunky"}`. `demo/stories/substrates/aurora.vue` default fallback → `"SUNSET"`.

**6 — V-A95 rider.** One confirm on the real in-app Chrome arm, observed via screenshot and `getComputedStyle` **only** — never `getContext()` on a live canvas. On a clean pass, retire the defect record and audit `src/components/aurora/Aurora.vue:293` `isolation: isolate` for cargo (it was added as an unconfirmed cure). Sequence after arms 1-4: the new derivative/relight cost changes present timing.

### Born-RED gates

**G-AURORA-1BODY** — vitest, CI-executable, one gate for this component.
*Assertion:* over both shipped shader sources, the map `medium id → body function` is **injective within each backend and identical across backends**. A body whose entire GLSL/WGSL definition delegates to another medium's cascade with only a constant profile argument counts as an alias of that cascade, not a body.
*RED at HEAD, five ways:* `aurora-mediums.wgsl.ts:398-401` maps ids `{3,5,6,7}` → `mediumKuwahara` (four ids, one body — three injectivity violations); `mediums.glsl.ts:493-496` `mediumOilPastel` is `profileFor(MEDIUM_OILPASTEL,0)` + `paintStrokeMedium`, the same body `mediumOil` calls at `:376` (one alias violation); ids 3/5/6 have GLSL bodies with no WGSL twin (cross-backend map mismatch).
*Mutation proving it can fail after the wave:* restore `|| medium == 5` to the WGSL dispatch disjunction, or re-express any one body as a `profileFor(...)` delegate → gate RED. Both mutations are single-line and reversible.

No second gate. The paint-distinctness measurement belongs in π below, not in the gate budget: `tests-visual/` executes in **no** npm script (`package.json` scripts contain no visual or playwright runner) so a gate placed there is born rotten. Promotion of π-DISTINCT to a gate is blocked on a visual CI runner existing.

### π / DELTA obligations

All paired before/after, route `/substrates/aurora`, and the capture harness `?capture=/substrates/aurora&mode=<medium>` (`demo/stories/substrates/aurora.vue:69`).

| id | claim it pays for | capture |
|----|-------------------|---------|
| π-PARITY | van-Gogh renders its own body on the primary | `/substrates/aurora?capture&mode=vangogh`, Chromium/WebGPU **and** Chromium `mode:"webgl"` forced, 1440×900 — the pair must read as the same medium |
| π-VANGOGH-PRIMARY | A1 closed for id 5 | same route, Chromium/WebGPU, 1440×900, before/after |
| π-OILPASTEL / π-CRAYON / π-OIL | A2/A3 and the lean oil | one before/after pair each, Chromium/WebGPU, 1440×900 |
| π-DISTINCT | the F08 discharge | one canonical config, identical except `medium`, all 10 ids, Chromium/WebGPU, 1440×900. Descriptor distance `D` over ΔĒ (mean perceptual colour distance), ΔA (structure-tensor anisotropy), Δβ (radial power-spectrum slope), Δρ_hf (high-frequency energy / gap fraction); τ pinned against the captured baseline at the wave's first arm, before any body lands |
| π-QUARTET | the DUSK re-founding and DAWN hardening | SUNSET/DUSK/SKY/DAWN, one frame each, Chromium, 1440×900 and 390×844, before/after |
| π-REVERSE-DRAG | the V-A95 rider | in-app Chrome, screenshot + computed-style only |

**WebKit cells are OWED and currently BLOCKED.** The WGSL uniformity claim for `relightImpasto` in arm 1 needs a real WebKit paint to be true; no WebKit capture arm is available. Every WebKit row is recorded as owed. Do not write "dual-ported, verified" anywhere until that cell is filled — "compiles under Chromium's WGSL front end" is the only claim the evidence supports.

Paint-arm note: `getComputedStyle` returns `oklab()` for oklab tokens; the paint-arm parser handles it. Grey separates by L, not chroma. Run live π per band.

### Breakage

- **Preset renames** (`SETTING_SUN→SUNSET`, the three `OPENAI_*`, `DELIBERATIVE→PASTEL`, `OIL_IMPASTO→OIL`, `OILPASTEL_SUNSET→OIL_PASTEL`) — clean break, no aliases. *Migration:* consumers rename the key; there is no compatibility map and none will be added.
- **Six deleted presets.** *Migration:* `VIVID_SETTING_SUN` → `SUNSET` + the chroma knob; `OIL_GESTURAL` → `{...PRESETS.OIL, strokeMode:"chunky"}`; `OILPASTEL_RAINBOW`/`_OCEAN` → `OIL_PASTEL` + `huePath`/stops; `DAY9_YELLOW` → `MEADOW`; `SPEEDTEST` → lives in the speedtest repo.
- **`medium:"oil"` and `"oil-pastel"` change appearance on both backends** — oil becomes a lean two-layer body, oil-pastel stops being smeared oil. *Migration:* none available; this is the point of the wave. Consumers pinning a look re-capture.
- **`medium:"oil"/"vangogh"/"oil-pastel"` change appearance on WebGPU specifically** (they stop being Kuwahara). *Migration:* none; A1 is the defect.
- **`strokeMode` knife/chunky are now profile constants over the lean cascade**, not the 4-layer one. Prop name and type unchanged; output differs.
- Internal-only removals (`curvedStroke`, `bestOil`, `paintStrokeLayers`, `paintStrokeMedium`, `StrokeProfile`, `oil-modes.glsl.ts`) — not exported from `src/components/aurora/index.ts`; no consumer line.

### Open

1. **Does the lean oil body clear the `@fragment` module-size budget on the WGSL primary?** Single-source dispatch forbids a lazy split, so the whole medium ladder is one module. *Decided by:* the compiled `aurora.wgsl` module byte size against the budget declared before arm 1 lands, plus a real compile. If it misses, the KILL arm fires: delete enum 3 from `MEDIUM_ID`/`mediumOptions`, re-express the OIL slot as `kuwahara` + palette, register floor 11 → 10.
2. **Do DAWN and SUNSET still confound after the value-structure split?** *Decided by:* the π-QUARTET before/after pair, routed to the user via Q-AURORA-QUARTET. Default if silent: harden-not-delete, slot retained. Same clause governs DUSK. **A capture judgment never deletes a slot the user named good** — the register floor under both clauses is 9, and 8 only in the compound corner with a KILL oil.
---

## W-TABS — One indicator engine, one selected-state seam

**Disposition:** KEEP-THIN
**Jury:** No bench returned a verdict — design, architecture, and evidence all failed. Nothing below rests on a bench assertion; every row is foreman-adjudicated from source at HEAD `0371836d` with a file:line. Rows that would have needed a live paint measurement to sustain are marked as owed, not claimed.
**LOC now → expected:** 1419 → ~1335 (`SegmentedTabs.vue` 468, composables 514, styles 406, `constants.ts`+`index.ts` 31)

### Defects this wave closes

| id | defect | evidence | sev |
|---|---|---|---|
| T-1 | The drag grab-bootstrap is keyed on `aria-pressed`, so a `pill` strip with `semantics="tabs"` never forwards the press to the indicator and the liquid tab is dead. | `src/components/tabs/styles/drag.css:68-73` selects `.segmented-tab[aria-pressed="true"]`; `src/components/tabs/SegmentedTabs.vue:450-457` emits `aria-selected` only when `isTabsSemantic`. No other rule sets `pointer-events` on `.segmented-tab` (only `segmented.css:201` `is-disabled`). Three live mounts hit it: `demo/stories/navigation/tabs.vue:235`, `:263`, `:283` (pill + `semantics="tabs"` + default `motion:full` → `dragEnabled` true). | high |
| T-2 | Two indicator engines, not one. The pill rides the JS writer; the underline rides CSS anchor positioning plus an `@supports not` arm that silently substitutes a static `border-bottom` — a fallback that hides a dead primary. | `segmented.css:246-260` (`position-anchor: --gl-tab-active`, `inset: anchor(...)`) vs `SegmentedTabs.vue:370-386` (JS-measured node); the masking arm at `segmented.css:285-297`. The file header at `segmented.css:3` and `useSelectionIndicator.ts:26-27` both assert exactly one writer. | high |
| T-3 | The underline indicator tethers to `[aria-selected="true"]`, so the documented-legal `variant="underline" semantics="toggle"` emits `aria-pressed`, no `anchor-name` is minted, `anchor()` is invalid at computed-value time, and the rule collapses to a 0-width static-position box — no indicator at all. | `segmented.css:238-240`; `SegmentedTabs.vue:411-415`; the combination is documented independent at `src/components/tabs/README.md:26-28`. Paint consequence derived from spec, not measured — see §π. | med |
| T-4 | Dead squish plumbing on the underline arm: `--stretch` is never written there, so three shipped declarations are unreachable. | `SegmentedTabs.vue:371` gives `indicatorRef = null` for underline → `useSelectionIndicator.ts:226-229` early-returns; `useTabDragMorph.ts:68,123` gate on `dragEnabled = !isUnderline`. Unreachable: `segmented.css:259`, `:272`, and the `scale` clause of `:280`. | low-med |
| T-5 | The tooltip and non-tooltip button branches duplicate 12 bound attributes verbatim; every binding change must land twice or the two paths diverge. | `SegmentedTabs.vue:393-431` vs `:439-465`. | low |

#### Overruled
- **Vertical stadium radius balloon** — already redressed at `segmented.css:81` (`--radius-strip` rebind). Closed; not re-raisable.
- **Component should call `armGlassRefract()`** — deliberate and documented at `SegmentedTabs.vue:30-37`; arming the document root is an app-root concern.
- **Underline label size (`--type-subheading`) too large for a control** — a ruled design axis (the two-voice fence, `segmented.css:299-310`), not a defect.
- **`activeValues` array is vestigial single-select** — it is the shared seam `useSelectionIndicator` consumes (`useSelectionIndicator.ts:93`); collapsing it forks the one writer's API.
- **Missing `aria-controls`** — already supported via `SegmentedTabOption.controls` (`SegmentedTabs.vue:56-62`).

### The change

**1. `src/components/tabs/SegmentedTabs.vue`**
- Add `:data-active="isActive(option.value) ? 'true' : 'false'"` to the button. ARIA is untouched — the `v-bind` semantics ternary stays exactly as-is; `data-active` is the styling seam, ARIA is the semantic one.
- Collapse the two button branches into one. Wrap the `v-for` in a single `<TooltipProvider :delay-duration="200">` placed *inside* the strip `<div>`; render one `<button>` inside `<Tooltip><TooltipTrigger as-child>`, with `<TooltipContent v-if="option.tooltip" side="bottom" :side-offset="8">`. `TooltipProvider`, `Tooltip`, and `TooltipTrigger as-child` emit no elements, so `role="tab"` children stay direct children of the tablist. Delete `:439-465`.
- Indicator: drop `v-if="!isUnderline"` at `:371`. Class list becomes `['segmented-indicator', 'segmented-indicator--js', isUnderline ? 'segmented-indicator--ink' : 'glass-capsule glass-lens', dragEnabled && 'glass-drag-grabbable', dragEnabled && drag.dragging.value && 'glass-drag-lift']`. Drag classes need no new guard — `dragEnabled` is already `!isUnderline`.

**2. `src/components/tabs/styles/segmented.css`**
- `:193-196` → single selector `.segmented-tab[data-active="true"] { color: var(--foreground); }`.
- Delete `:236-297` entirely: the `anchor-name` rule, both `::before` blocks, the PRM `::before` transition, and the `@supports not (position-anchor: --x)` arm.
- Add the ink arm **after** `:100` so it wins the equal-specificity vertical radius rule:
  ```css
  .segmented-tabs--underline .segmented-indicator {
      background: none;
      border-radius: 0;
      border-block-end: var(--paper-ink-mark-weight) solid var(--paper-ink-mark-color);
      scale: 1; /* a hairline does not deform */
  }
  .segmented-tabs--underline.segmented-tabs--vertical .segmented-indicator {
      border-block-end: none;
      border-inline-start: var(--paper-ink-mark-weight) solid var(--paper-ink-mark-color);
      border-radius: 0;
      scale: 1;
  }
  ```
  `--paper-ink-mark-weight` / `--paper-ink-mark-color` are already declared on the host at `:226-227`; consume, do not re-declare. The glide comes free from `.segmented-indicator--js` (`:142-149`) — `translate`/`width`/`height` on the one calibrated clock, identical on every engine.

**3. `src/components/tabs/styles/drag.css`** — `:71` → `.segmented-tab[data-active="true"]`.

**4. `tests-visual/tabs-std.spec.ts` W1** — the hairline probe reads `getComputedStyle(strip, "::before").blockSize`; with the pseudo gone it resolves to `auto` → `0` and the assertion goes vacuous-green. Re-point it at `.segmented-indicator` `borderBottomWidth` (horizontal) / `borderInlineStartWidth` (vertical), same `≤ 4px` bar. The plate-offender scan needs no change — the ink node has `background: none`.

**5. `src/components/tabs/README.md`** — one line under "The indicator mechanism": both materials ride the single measured node; the pill fills it, the underline draws its edge.

### Born-RED gates

**G-TABS-1 — one selected-state seam, semantics-independent.**
Assertion (a): for all four `variant × semantics` combinations the selected button carries `data-active="true"` and non-selected carry `"false"`. (b): no file under `src/components/tabs/styles/` contains `.segmented-tab[aria-pressed` or `.segmented-tab[aria-selected` as a state selector.
RED at HEAD: (a) the attribute is not emitted anywhere — `SegmentedTabs.vue:403-416` and `:450-457` bind only `aria-*`; (b) `drag.css:71` and `segmented.css:193-194,238` all match.
Mutation proving it can fail: bind `data-active` only under `!isTabsSemantic` → (a) RED on the two `tabs` combinations. Restore `drag.css:71` to `[aria-pressed="true"]` → (b) RED.

**G-TABS-2 — one indicator engine.**
Assertion (a): every variant renders exactly one `.segmented-indicator` element node. (b): no file under `src/components/tabs/styles/` contains `position-anchor`, `anchor-name`, `anchor(`, or `@supports not (position-anchor`.
RED at HEAD: (a) `variant="underline"` renders **zero** — `SegmentedTabs.vue:371` `v-if="!isUnderline"`; (b) `segmented.css:239,249,252-254,268-270,285` all match.
Mutation: restore the `v-if` → (a) RED; re-add any anchor declaration → (b) RED.

No third gate. The drag-forwarding paint consequence is a π obligation, not a gate.

### π / DELTA obligations

Route `/navigation/tabs`, Chromium, both cells before and after:
1. **Underline glide, 1440×900** — story at `demo/stories/navigation/tabs.vue:195` (horizontal) and `:216` (vertical). Capture mid-travel (t ≈ 150ms after click) to show the anchor `inset` interpolation replaced by the measured `translate` glide, same clock.
2. **Underline + `semantics="toggle"`, 1440×900** — a temporary mount, not a shipped story. BEFORE must show no mark painted (T-3); AFTER, the ink rule under the active label. This is the only capture that converts T-3 from spec-derived to measured; T-3 stays derived until it lands.
3. **Pill + `semantics="tabs"` drag, 1440×900** — story at `:235`. BEFORE: `getComputedStyle(activeBtn).pointerEvents === "auto"` plus a drag trace showing the indicator does not follow. AFTER: `"none"` and the indicator following (T-1).
4. **Responsive collapse, 390×844** — story at `:302` (underline + responsive) to confirm the Select branch is untouched by the indicator unification.

WebKit cells are owed for all four — the underline arm has never had an engine-independent paint path and Safari is the whole point of T-2 — but there is no WebKit runner seat in this tranche. They are **blocked, not claimed**; do not mark the wave visually complete on Chromium alone.

### Breakage

- `.segmented-tabs--underline::before` no longer exists. Consumers overriding it (weight, colour, offset) retarget `.segmented-tabs--underline .segmented-indicator` and set `border-block-end` / `border-inline-start`, or set the `--paper-ink-mark-weight` / `--paper-ink-mark-color` host vars, which is the supported knob.
- `anchor-name: --gl-tab-active` is gone. A consumer anchoring their own element to the active tab must mint their own `anchor-name` in their sheet.
- `.segmented-tab[aria-pressed="true"]` / `[aria-selected="true"]` are no longer styling hooks in this library. Consumers keying custom CSS off them switch to `[data-active="true"]`, which is stable across both semantics. The ARIA attributes themselves are unchanged — assistive-tech behaviour and existing test assertions on `aria-selected`/`aria-pressed` (`tests/components/custom/tabs/segmented-tabs.test.ts:131-382`) hold.
- The `@supports not (position-anchor: --x)` static-underline fallback is removed. On an engine without anchor positioning the underline previously degraded to a static border; it now paints the measured glide, which needs no engine feature at all. Nothing to migrate.
- No prop added or removed. No export change in `src/components/tabs/index.ts`.

### Open

Whether the vertical underline rail sits **inside** the measured box (border-box, flush with the label's leading edge) or **2px outside** it, as the anchor form did (`segmented.css:268`, `calc(anchor(left) - weight)`). Deciding fact: the 1440×900 and 390×844 π cells of the vertical underline story (`demo/stories/navigation/tabs.vue:216-223`) over `paper-grain-overlay` — if the flush rail reads as an inset rule rather than a margin rail against the card edge, restore the 2px outset with a negative `margin-inline-start` on `.segmented-tabs--underline.segmented-tabs--vertical .segmented-indicator`. Everything else in this wave is decided by the evidence above.
---

## W-ALERT — Alert joins the card-role glass rung (radius, blur, rim, adaptive-legibility membership)

**Disposition:** KEEP-THIN
**Jury:** All three benches returned failed — no design, architecture, or evidence verdict exists. Foreman adjudicated directly on disk at HEAD `0371836d` plus the retained live witness in `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/BREADTH-COHORT-TABS-SLIDER-ALERT-C35.md` §"Alert compared with Card". Nothing below rests on a bench opinion; every row has a file:line or a computed value. Where the record was silent (motion, title truncation) I overruled rather than invent a bench.
**LOC now → expected:** 111 (`Alert.vue` 43 · `AlertTitle.vue` 17 · `AlertDescription.vue` 17 · `index.ts` 34) → ~107

### Defects this wave closes

| id | defect | evidence | severity |
|----|--------|----------|----------|
| A-1 | Alert is outside the adaptive-legibility rung set. It composes no `.glass-*` rung class, so `ladder.css:316` (`:where(.glass-card,.glass-resting,.glass-quiet,.glass-wash)` → `--glass-tint-source`, the observer-driven darken-over-bright clamp) never reaches it. Over a bright backdrop the plate cannot darken and the body ink loses AA. | `src/components/alert/index.ts:8-19` — BASE + all five tone arms are raw utilities (`bg-(--glass-bg-wash)`, `[backdrop-filter:…]`); zero rung class. `src/styles/glass/ladder.css:316` | high |
| A-2 | Wrong blur rung — "glass in name only". All five arms bind `--glass-blur-wash` = `blur(1px)`; the card role rides `--glass-blur-quiet` = `blur(7px)` (`surfaces.css:66`, Card). | `src/components/alert/index.ts:11,13,15,17,18`; `src/styles/tokens/glass.css:149-150` (`--glass-blur-wash-radius: 1px`, `--glass-blur-quiet-radius: 7px`) | high |
| A-3 | Radius under the card role. `rounded-lg` → `--radius-lg: var(--radius)` = 0.625rem = **10px**; `[data-slot=card]` computes **16px** (`--radius-card: var(--radius-2xl)`). | `src/components/alert/index.ts:8`; `src/styles/theme/radius.css:61,77-78`; live witness C35 §Alert-vs-Card (every inspected Alert 10px, every Card 16px) | high |
| A-4 | No rim, no elevation. Alert matches none of the rim group (`rim.css:64-73`, `.glass-material,.glass-wash,.glass-quiet,…`), so `--glass-material-rim` is unset and BASE declares no `box-shadow` at all — the law-3 directional top catch-light is absent and the plate reads as a flat slab. | `src/components/alert/index.ts:8` (no shadow utility); `src/styles/glass/rim.css:64-73`; capture `evidence/browser-assay-b/feedback-alert-desktop-rest-b.png` (SHA-256 `66e15729…c300a869`) — no edge catch-light on any of the five specimens | med |
| A-5 | The neutral arm additionally misses the on-glass muted re-point: `:where(.feedback-tone,.glass-capsule)` (`ladder.css:374`) covers the four toned arms only, and the neutral arm is neither a `.feedback-tone` nor a rung member, so `AlertDescription`'s `text-muted-foreground` composites at raw page-muted over a translucent plate. | `src/components/alert/index.ts:10-11` (neutral arm has no `feedback-tone`); `src/components/alert/AlertDescription.vue:13`; `src/styles/glass/ladder.css:374` | med |

§Overruled — not re-raisable without the named fact.
- **`AlertTitle` `line-clamp-1` truncates author content** (`AlertTitle.vue:13`). Overruled: no captured clip. Both retained mobile (390×844 DPR3) and desktop frames show every title fitting on one line. Decides on: a capture at ≤390px CSS width showing an ellipsised title.
- **Alert has no entrance/idle motion or dismiss affordance.** Overruled as fenced, not as unmeritorious: the idle-engagement axis is hard-blocked corpus-wide on the OPEN-FM-3 / ASK-27 user ruling (`docs/tranches/BJ/PLAN.md:159`; `waves/BAND-FEEDBACK-MOTION.md` W5 "THE HARD PRECONDITION"). No wave may pre-decide it, this one included.
- **Tone-tint presence itself** (neutral glass + status ink vs status-tinted material). Overruled here: ASK-25 / OPEN-FM-2 is an explicit USER ruling (`docs/tranches/BJ/ASK.md:251-263`). This wave changes only which rung the tint mixes *over*, never whether it exists.

### The change

One file: `src/components/alert/index.ts`. No `.vue` edits, no new CSS partial, no new token.

**BASE (`:8`)** — remove `relative`, `border`, `rounded-lg`; add `glass-quiet rounded-card`. `.glass-quiet` (`ladder.css`, `@layer components`) already declares `position: relative`, `--glass-bg-rung: var(--glass-bg-quiet)`, `background: var(--glass-plate-tinted)`, `backdrop-filter: var(--glass-blur-quiet)`, `border: 1px solid var(--glass-border-accent)`, and `box-shadow: var(--glass-material-rim), var(--glass-under-shadow-quiet), var(--glass-shadow-quiet)`. Everything else in BASE (the `has-[>svg]` grid, `px-4 py-3`, `text-[length:var(--control-text)]`, the `[&>svg]` sizing) is unchanged.

**TONE map (`:9-19`)** — hoist the shared toned suffix to a const so the calibration lives once, and keep every class a source literal (no template interpolation — the Tailwind scanner must see each utility verbatim):

```ts
const TONED =
    "feedback-tone [--feedback-tone-rung:var(--glass-bg-quiet)] text-card-foreground [&>svg]:text-(--tone) *:data-[slot=alert-description]:text-card-foreground/90";
const TONE = {
    neutral: "text-card-foreground",
    destructive: `feedback-tone-destructive ${TONED}`,
    success: `feedback-tone-success ${TONED}`,
    warning: `feedback-tone-warning ${TONED}`,
    info: `feedback-tone-info ${TONED}`,
} as const;
```

Three deletions carried by that: the per-arm `[backdrop-filter:var(--glass-blur-wash)]` (five sites), the neutral arm's `bg-(--glass-bg-wash)`, and the `[--feedback-tone-rung:var(--glass-bg-wash)]` re-point — which becomes `var(--glass-bg-quiet)`, matching the rung the plate now actually rides.

**Cascade is already correct, do not reorder anything.** `glass.css` imports at `src/styles/index.css:177`, `feedback-tone.css` at `:186` — same `@layer components`, equal specificity (0,1,0), so `.feedback-tone`'s `background: color-mix(…)` and `border-color` win over `.glass-quiet`'s plate and border ink by source order, while the rung's `backdrop-filter`, `box-shadow`, and rim survive untouched. The neutral arm carries no `.feedback-tone`, so it paints the bare quiet plate. Both arms are now members of `ladder.css:316` and `rim.css:64-73`, which is what closes A-1, A-4, and A-5.

### Born-RED gates

**G-ALERT-ROLE** (one new slot) — *Alert's surface is a member of the adaptive-legibility rung set.*
Assertion: the string returned by `alertVariants({ tone })`, for every `tone` in `{neutral, destructive, success, warning, info}` plus the default, contains exactly one token from `{glass-card, glass-resting, glass-quiet, glass-wash}` — the selector set `src/styles/glass/ladder.css:316` re-points `--glass-tint-source` on and `src/styles/glass/rim.css:64-73` publishes `--glass-material-rim` on. Membership is the product invariant: a feedback surface that is not a rung member cannot darken over a bright backdrop and has no rim.
RED at HEAD: `alertVariants()` at `src/components/alert/index.ts:27-34` composes BASE (`:8`) + TONE (`:10-18`); neither contains any `glass-*` token — the intersection is empty for all six cases, so the gate fails 6/6 at HEAD.
Mutation proving it can fail: delete `glass-quiet` from BASE (or replace it with a non-rung class such as `glass-fill`) — the gate returns to 6/6 RED while the component still renders.

**Row into the existing radius suite** (`tests/styles/radius-dialog-bind.test.ts` — not a new gate slot): assert Alert's radius utility resolves `--radius-card`, byte-identical to `[data-slot=card]`. RED at HEAD: `src/components/alert/index.ts:8` binds `rounded-lg` → `--radius-lg: var(--radius)` = 10px against Card's 16px (`src/styles/theme/radius.css:77-78`), the exact 10-vs-16 split the C35 live witness recorded. Mutation: revert `rounded-card` → `rounded-lg`.

No third gate. The blur-rung delta (A-2) is proven by the computed-value readback in the π obligation below, not by a gate slot.

### π / DELTA obligations

Route `/feedback/alert` in every cell. Engine: Chromium.

| cell | viewport | before | after |
|---|---|---|---|
| dark desktop | 1440×900 | **retained**, `…/evidence/browser-assay-b/feedback-alert-desktop-rest-b.png`, SHA-256 `66e15729fb50b451152d42eb1ae9a9de85622a8f638a6434333114bcb300a869` | owed at the wave SHA |
| dark mobile | 390×844 DPR 3 | **retained**, `…/evidence/browser-assay-b/feedback-alert-mobile-rest-b.png`, SHA-256 `68d0a329e6218e1f31c483136ffcc06398216dd18a43f93683831a05ab9b37ae` | owed at the wave SHA |
| light desktop | 1440×900 | **no retained frame** — the assay-b pair is dark-only. Capture at the pre-change SHA before landing. | owed |
| light mobile | 390×844 DPR 3 | **no retained frame** — same. Capture at the pre-change SHA before landing. | owed |

Computed-value DELTA, filed as JSON beside the frames, read off the first `[data-slot=alert]` and the first `[data-slot=card]` on the page: `border-radius` 10px → 16px and equal to Card's; `backdrop-filter` blur radius 1px → 7px; `box-shadow` `none` → non-empty and containing the `--glass-material-rim` inset ring. The rim-asymmetry claim (law 3: top catch-light brighter than the sides) is carried by that readback plus the paired capture — the rim is inherited from the rung group, not authored here, so no separate rim probe is minted.

WebKit cells are owed and currently **blocked** — no Safari/WebKit lane is available in this environment. Claiming them would be fabrication; they carry forward unpaid and are named as such.

### Breakage

- **Corner radius 10px → 16px.** Every consumer Alert visibly rounds. Migration: `<Alert class="rounded-lg">` — `cn`'s conflict table buckets `rounded-*` together and last-write-wins, so the consumer class replaces the rung radius.
- **Backdrop blur 1px → 7px.** Content behind an Alert is now genuinely obscured. This is the fix, not a regression; a consumer needing the near-transparent read overrides `--glass-blur-quiet` at its own scope or re-points `--glass-cell-backdrop-filter` on the element (the rung reads `var(--glass-cell-backdrop-filter, var(--glass-blur-quiet))`).
- **New elevation.** Alert gains `--glass-under-shadow-quiet` + `--glass-shadow-quiet`. Migration: `class="shadow-none"`.
- **Neutral-arm ink shifts.** The neutral Alert enters the calm-tier re-point, so `AlertDescription` moves from raw page-muted to `--on-glass-muted`. No migration — this is the AA fix; a consumer pinning the old ink sets `--muted-foreground` locally.
- **No API change.** `tone`, `announce`, `class`, all three exports, and the `AlertVariants` type are untouched; `tests/components/ui/alert/Alert.test.ts` (all four cases) and `tests/public-surface.spec.ts:46,116-117` pass unmodified.

### Open

- **ASK-25 / OPEN-FM-2 residue.** If the user rules neutral-glass-plus-status-ink, the delta on top of this wave is one declaration on BASE: `[--feedback-tone-strength:0%]`, which nulls the wash while the tone-keyed rim and the full-chroma glyph survive. Nothing in this wave forecloses either answer. The fact that decides it: the user's ruling on `docs/tranches/BJ/ASK.md:251-263`.
- **`contain: paint` on `.glass-quiet`.** The narrowed clip register in `material.css` names `.glass-card` in its included set; whether `.glass-quiet` is also included was not read to the byte. If it is, an Alert with an intentionally overflowing child would clip. The fact that decides it: the literal selector list of the clip register in `src/styles/glass/material.css`. Read it during implementation; if `.glass-quiet` is included and the demo shows no overflowing child, this closes as a non-issue with no code change.
---

## W-DOCK — the strip cure: dead cross axis, evidence instead of erasure, tap-to-reach; dead shape parameterization struck

**Disposition:** GREENFIELD (strip + overflow affordance + reach rebuilt; the posture FSM, crossfade, layers, search and control chrome are KEPT untouched)
**Jury:** No bench returned a verdict — design, architecture and evidence all failed to seat, and the challenge list was empty. Nothing below rests on a juror; every row was re-verified against HEAD `0371836d` this seat, and stale GF-DOCK claims that did not survive that check are in §Overruled so they cannot come back. Two calls are mine alone: (1) the detent/physics engine and the drag lens do NOT land here — they are design derivations from the codex, not user-sustained defects, and every constant is π-unverified (§Open); (2) no collateral edit to `useSelectionGroup` — see The change §1.
**LOC now → expected:** 8,046 (`src/components/dock`, all files) → ~8,080. Net flat by intent: −208 dead parameterization, +240 the F47 cure. The family's mass reduction is REDUCTION/COLOCATION's, not this wave's; claiming it here would be inflation.

### Defects this wave closes

| id | defect | evidence | sev |
|----|--------|----------|-----|
| D1 | The horizontal dock port is a block-axis scroll container — the user can drag the dock vertically (F27) | `src/components/dock/styles/overflow.css:64` `overflow-x: auto` + `:74` `overflow-y: visible`; CSS Overflow 3 coerces the `visible` cross axis to `auto` (the file's own `:65-73` comment concedes it). Screenshot `docs/tranches/BJ/feedback/F27-dock-vertical-scroll.png` | high |
| D2 | Overflow evidence is ERASED, not shown: the FadingScroll edge mask fades the edge item to transparent and clips mid-glyph (F47a) | `overflow.css:92-101` `mask-image: linear-gradient(… transparent 0 …)` + `:102-105` the two `gl-fade-*` `scroll(self inline)` animations | high |
| D3 | No tap-to-reach: activating an edge-occluded item never brings it into port (F47b) | `demo/shell/BottomDock.vue:65` `goToStory()` navigates with no recenter; strip at `:183-196` is a bare `<FadingScroll>`; the library's only recenter is `src/composables/motion/morph/useSelectionGroup.ts:184-185`, which the strip does not use | high |
| D4 | Dead arbitrary-shape parameterization: 4 tokens with ZERO setters — the clip rule always resolves `none`, the corner lerp is a constant | `shape.css:93-110` (clip register) + `:61-71` (corner lerp); declarations `density.css:53-54,61-62`. Census: repo + constellation grep returns definition sites only (the `sci-report/scratch/bidsheet/*.html` hits are inlined dist bundles, not setters) | med |
| D5 | The `shape` axis carries a third register, `rounded` — F04's screenshot referent | `useDockShellProps.ts:58,164` (3-value union), only render site `demo/stories/dock/rail.vue:108-140`, CSS `shell.css:398-400` + `:423-431` | med |

**Overruled** (do not re-raise)
- **F06 route flash/slowness on dock pages** — not dock chrome. Owned by `BJ.W-STORY-TRANSITIONS` (`demo/chassis/routeTransition.ts` + the route section of `view-transition.css`).
- **GF-DOCK §5 "decorative per-item outline-ring circles"** — absent at HEAD: `styles/controls/icon-button.css:46` is `border: none`; the only ring is the focus-visible one (`:67`, `:199`). Struck.
- **GF-DOCK §4.1 "`useDockOverflowFit.ts:38-40` measures block overflow"** — false for horizontal docks: `:37-41` measures the inline axis unless `.vertical`. The cause is the computed coercion (D1); the composable is correct.
- **BAND-DOC-TRUTH T18 (backwards coercion comment)** — already fixed on disk: `overflow.css:65-68` reads "computes to `auto`". Closed.
- **The prev/next chevrons as "F47 redundancy"** — KEPT. They are `[`/`]`-bound story navigation with a documented persistent four-state contract (`BottomDock.vue:154-175`); removing them removes function, not chrome. No feedback row asks for it.
- **Drag lens, detent engine, posture choreography** (GF-DOCK §4.2/§7) — not defects; see §Open.

### The change

1. **Dead cross axis (D1).** `overflow.css:74`: `overflow-y: visible` → `overflow-y: clip`. Keep the `--dock-scroll-safe-inset` padding + equal negative margin (`:75-76`) — the clip edge is the padding box, so all four focus-ring arcs still paint. Rewrite the `:65-73` comment to the new mechanism (a declared clip, no coercion). Vertical docks are untouched: their block axis is the *layout* axis, capped in `shell.css`. **Do not touch `useSelectionGroup.ts:184-185`** — `block:'nearest'` is provably inert against a clipped axis, and that composable is shared with `useTabRovingFocus`.
2. **Evidence stack replaces the mask (D2).** Delete `overflow.css:88-105` (mask + both scroll-timeline animations) and the `<FadingScroll axis="x">` wrapper at `BottomDock.vue:183-196` (`FadingScroll` itself stays for its other consumers). Add `src/components/dock/styles/evidence.css`, imported from `styles/index.css`, painting **only** under `[data-dock-overflow]` and **only** on the side that hides content:
   - *lip* — an inset under-rim occlusion gradient ~10px deep on the port edge, driven by two newly `@property`-registered scalars `--dock-edge-start` / `--dock-edge-end` written by the same `scroll(self inline)` timeline and `animation-range` the deleted fades used;
   - *condensation* — per-item `animation-timeline: view(inline)` scaling the passing item to 0.66 and dimming it toward `--on-glass-muted`, anchored at the port edge. The glyph stays whole: never clipped mid-glyph, never faded to transparent;
   - PRM: `@media (prefers-reduced-motion: reduce)` keeps the lip and the condensed end state (position-mapped legibility, not motion) and drops nothing.
3. **Tap-to-reach (D3).** New `src/components/dock/composables/useDockItemCensus.ts` — a `useDockOverflowFit`-shaped RO+MO census publishing cell rects and `visibleFraction(el)`. `dockContext.ts` gains one member, `seat(el: HTMLElement): void`; `GlassDock.vue` provides it: when `visibleFraction(el) < 0.95`, run one inline `scrollTo` glide on `useDockSpring` at `DOCK_SPRING` landing the item plus `--dock-scroll-gutter` fully in port. `DockControl.vue` calls `seat($el)` from its click and `focusin` handlers **after** emitting activation — the commit is never gated on travel. The glide takes a `keepOpen()` reference on `railHolds` at start and releases at settle. No new props on any component.
4. **Strike the dead shape knobs (D4).** Delete `shape.css:73-110` (comment + the `--dock-shape-clip` rule + both `[data-morphing]` overrides) and collapse `:61-71` to `border-radius: var(--radius-dock)`. Delete `density.css:53-54` and `:61-62` and truth the `:39-41` comment. **Leave the size-morph block (`--dock-size-scale`, `shape.css:112-130`) alone — it is live.**
5. **Collapse the `shape` axis (D5).** `useDockShellProps.ts:58,164` → `"pill" | "card"`; drop the `rounded` JSDoc arms at `:43,:55-56`. Delete `shell.css:398-400` and `:423-431`. Re-point `demo/stories/dock/rail.vue:117` to `shape="card"` and retitle that section. `--radius-dock` remains the pill authority; BAND-MATERIAL owns values.

### Born-RED gates

**G-DOCK-CROSS-AXIS-DEAD** — home `tests/styles/dock-cross-axis.test.ts`.
*Assertion:* in `src/components/dock/styles/overflow.css`, every rule that declares `overflow-x: auto|scroll` on a `.glass-dock … .dock-layer--full` selector declares a cross axis in `{clip, hidden}`; paired live assert `scrollHeight === clientHeight` on `.dock-layer--full` (π-F27).
*RED at HEAD:* `overflow.css:74` declares `overflow-y: visible` inside the rule opened at `:62` whose `:64` is `overflow-x: auto`. The assertion fails on parse today.
*Mutation:* set that declaration back to `visible` (or `auto`) → RED. Proves the gate reads the declaration, not the file's existence.

**G-DOCK-REACH** — home `tests/components/custom/dock/GlassDock.reach.test.ts` (jsdom has no layout: stub `getBoundingClientRect` per cell, spy `scrollTo`).
*Assertion:* activating or focusing a dock item whose stubbed visible fraction is 0.4 invokes the seat glide, and the activation emit is observed **before** the glide starts; an item at fraction 1.0 invokes no glide.
*RED at HEAD:* the symbol does not exist — `find src -name 'useDockItemCensus*'` returns 0 hits, and `dockContext.ts` (56 lines) exposes no `seat` member; the test cannot resolve its subject.
*Mutation:* make `DockControl` await glide settle before emitting → the ordering assert flips RED. Proves it is not a tautology on "seat was called".

No third gate. The mask deletion, the lip and the condensation are π-adjudicated, not gated — a source-shape assert on "no `mask-image`" would be exactly the contrived gate class the abrogation mandate strikes.

### π / DELTA obligations

Paired before/after, browser-seat serialized (singleton), captured per band.

| id | route | engine / viewport | before → after |
|----|-------|-------------------|----------------|
| π-F27 | `/dock/overflow` | Chromium, 1280×800 + 390×844 | drag the port vertically: `scrollTop > 0` + screenshot → `scrollHeight === clientHeight`, computed `overflow-y: clip`, no travel |
| π-EVIDENCE | `/dock/overflow` | Chromium, 390×844 | three rest offsets (start/mid/end): mid-glyph clip + transparent erasure → whole condensed glyph under the lip; flush sides show nothing |
| π-REACH | `/dock/overflow` (h) and `/dock/rail` (v) | Chromium, 390×844 | tap an edge-occluded item: no travel → seated in port, commit timestamp ≤1 frame from pointerup |
| π-SHAPE | `/dock/rail` §"Rounded shape" | Chromium, 1280×800 | the `rounded` silhouette → the `card` register |

**WebKit cells for all four are OWED and currently BLOCKED** — there is no WebKit capture seat in this tranche (the same block MATERIAL's `W-REFRACT-LATCH` records). Do not mark any WebKit cell green; the `overflow-y: clip` + `view(inline)` pair is precisely where Safari divergence is plausible, so this is a real gap, not a formality.

### Breakage

- `--dock-shape-from` / `--dock-shape-to` / `--dock-shape-clip-from` / `--dock-shape-clip-to` deleted. Migration: none — zero setters in repo and constellation. If an arbitrary silhouette is ever wanted it returns as a designed facility, not a resurrected knob (no-backwards-compat).
- `shape="rounded"` removed from `DockProps` → build-time type error. Migration: `shape="rounded"` → `shape="card"`. One in-repo site, `demo/stories/dock/rail.vue:117`.
- The dock no longer renders a `FadingScroll` edge mask; any consumer overriding `.dock-layer--full`'s `mask-image` or the `--fade-*` vars becomes a no-op. Migration: delete the override — the evidence stack is not consumer-tunable in this wave.
- `dockContext` gains `seat`; injectors that construct the context by hand must supply it. In-repo: `GlassDock.vue` only.
- `useDockItemCensus` is family-private (consumed by `GlassDock` + `DockControl`), not added to `src/index.ts` — public surface unchanged.

### Open

- **Detent engine or native port.** This wave ships the native scroll port. Deciding fact: the IOS27-MICRO **F2 NATIVE-SCROLL** probe — whether Safari 2026 holds a programmatic scroll pin against a concurrent fling. The contract above (dead cross axis, evidence, reach) survives either answer.
- **The drag lens (GF-DOCK §7.1) and the posture choreography (§7.2).** Deciding fact: nothing on disk decides them — every constant comes from measured timelines with zero π captured here, and the lens's load-bearing 6-10px protrusion requires the lens layer to sit outside the plate clip, which no HEAD file expresses. They need their own wave and their own π, not a rider on this one.
- **The condensation ratio (0.66) and lip depth (10px) are picks, not measurements.** Deciding fact: a π A/B at 390×844 against the measured carousel inset (21pt, `sr-0620-1848`).
- ASK-16 (collapsed "+N" tray) stays user-gated and is untouched by this wave.
---

## W-TOAST — anchor-true dismissal: swipe direction, viewport gutter, touch-visible close, dead-selector strike

**Disposition:** KEEP-THIN
**Jury:** All three benches failed to return; there is no split to break. Every row below is foreman-sourced at HEAD from `src/components/toast/*` plus reka-ui's shipped implementation, and each carries a file:line so a later round re-verifies rather than re-argues. The already-closed items are pinned in §Overruled so the wave cannot re-litigate the register or the queue.
**LOC now → expected:** 560 → 572 (`src/components/toast/**` only; demo nets +18/−12)

### Defects this wave closes

| id | defect | evidence | sev |
|---|---|---|---|
| T1 | Swipe-to-dismiss direction ignores `position`: every anchor dismisses rightward, so a left- or centre-anchored toast must be dragged across the viewport, away from its own edge | `src/components/toast/Toaster.vue:92` mounts a bare `<ToastProvider>`; `node_modules/reka-ui/dist/Toast/ToastProvider.js:25-28` defaults `swipeDirection: "right"`; `ToastRootImpl.js:150` stamps `data-swipe-direction="right"` on the root for all six positions; `ToastRootImpl.js:167-170` then zeroes the off-axis delta, so a left-anchor drag toward the edge produces `clampedX = Math.max(0, x) = 0` — no movement at all | high |
| T2 | Four dead utilities on the action button: `group-[.destructive]:*` never matches, so a destructive toast's action gets zero tone treatment and the rules ship as bundle dead weight | `src/components/toast/ToastAction.vue:22` (`group-[.destructive]:border-muted/40`, `:hover:border-destructive/30`, `:hover:bg-destructive`, `:hover:text-destructive-foreground`); the root emits `feedback-tone-destructive` + `data-tone="destructive"`, never `.destructive` — `src/components/toast/Toast.vue:112-117` | med |
| T3 | Zero gutter between stacked toasts: two glass rungs abut and composite into one fused plate | `src/components/toast/Toaster.vue:58` — `VIEWPORT_BASE = "fixed top-0 z-toast flex max-h-screen w-full"` carries no `gap`; computed `row-gap` on the viewport resolves `normal` (0px) with N>1 queued | med |
| T4 | Dismiss glyph is invisible on coarse pointers for the toast's whole life | `src/components/toast/ToastClose.vue:37` — `opacity-0 … focus:opacity-100 group-hover:opacity-100`; touch fires neither, so computed opacity stays `0` on exactly the mobile top anchor the story advertises (`demo/stories/feedback/toast.vue:110`) | med |
| T5 | The documented app-wide default duration is unreachable | `src/components/toast/use-toast.ts:33-36` says "Omit to inherit the `ToastProvider` default", but `Toaster` exposes only `position` (`Toaster.vue:22-24`) and passes the provider nothing (`Toaster.vue:92`) | low |
| T6 | The story page's own triggers depend on a nested family member owning the only renderer | `demo/stories/feedback/toast.vue:24-95` calls `toast()`; the sole `<Toaster />` lives at `demo/examples/ToasterExample.vue:14`, mounted only while the `toaster` family member is active (`demo/chassis/family/FamilyTabs.vue:70`). Adding a page-level `<Toaster/>` today would double-render every toast against the module-singleton queue | low |

### Overruled
- **transient → overlay register divergence** — closed at HEAD: `Toast.vue:80` is `data-reveal="overlay"`, min x-scale 0.9964 byte-equal to the dialog (`docs/tranches/BJ/evidence/W-TOAST-DIALOG-PARITY/paired-pi.json`). Not reopenable.
- **`TOAST_REMOVE_DELAY` slot squat** — closed; regression standing at `tests/components/toast.queue.test.ts`.
- **iOS-27 stacked-pile / hover-collapse** — no capture in hand shows a failure beyond T3's 0px gutter; a pile system is a band-level greenfield, not a toast repair. T3 removes the fused-rung symptom that motivated it.
- **`Toaster` double-mount dev-warning** — speculative guard, no observed double mount once T6 lands. LOC without a second site.
- **Viewport `aria-live` announce** — already shipped, `Toaster.vue:133-134`.

### The change

**`src/components/toast/Toaster.vue`** — widen `VIEWPORT_ANCHOR`'s value from `[direction, edge]` to `[direction, edge, swipe]`, with `swipe` typed `"left" | "right" | "up" | "down"`: `bottom-right`/`top-right` → `"right"`, `bottom-left`/`top-left` → `"left"`, `bottom-center` → `"down"`, `top-center` → `"up"`. Add `const swipeDirection = computed(() => VIEWPORT_ANCHOR[props.position][2])` and bind `<ToastProvider :swipe-direction="swipeDirection" :duration="duration">`. Add `duration?: number` to the props (no default — passing `undefined` lets reka's own 5000 stand; do not restate the number in our source). Append `gap-3` to `VIEWPORT_BASE`.

**`src/components/toast/Toast.vue`** — the swipe binding is X-only; add the Y arms beside them in the same utility string (reka always writes both vars and zeroes the off-axis, `ToastRoot.js:86-87,109-110`): `data-[swipe=cancel]:translate-y-0 data-[swipe=end]:translate-y-(--reka-toast-swipe-end-y) data-[swipe=move]:translate-y-(--reka-toast-swipe-move-y)`.

**`src/components/toast/ToastAction.vue`** — delete the four `group-[.destructive]:*` utilities from line 22, nothing replaces them. The destructive action reads the tone from the surface it sits on, same as the body ink (the ToastClose discipline already recorded at `ToastClose.vue:31-36`).

**`src/components/toast/ToastClose.vue`** — line 37, add `pointer-coarse:opacity-100` after `opacity-0`. Hover/focus arms stay untouched; fine-pointer behaviour is unchanged.

**`demo/stories/feedback/toast.vue`** — mount the page's one `<Toaster :position="position" />` and add a six-option `SegmentedTabs` (`responsive`) bound to `position` in the existing "viewport" section, so the T1 map is exercisable by hand. **`demo/stories/feedback/toaster.vue`** — drop the live `<ToasterExample />` mount and its `ShowcaseFrame`; keep the `?raw` CodeBlock usage section. One renderer per page, enforced structurally.

### Born-RED gates

**G-TOAST-SWIPE-ANCHOR** — in `tests/components/toast.contract.test.ts`, one table-driven `it` over all six `ToasterPosition` values.
*Assertion:* the rendered `[data-slot="toast"]`'s `data-swipe-direction` names the nearest viewport edge — `{bottom,top}-right → "right"`, `{bottom,top}-left → "left"`, `bottom-center → "down"`, `top-center → "up"`.
*RED at HEAD:* `Toaster.vue:92` passes the provider nothing, so reka's default (`ToastProvider.js:25-28`) wins. `mount(Toaster, { props: { position: "bottom-left" }, attachTo: document.body })` + `toast({ title: "x", duration: Number.POSITIVE_INFINITY })` yields `document.querySelector('[data-slot="toast"]').dataset.swipeDirection === "right"`. Four of six rows fail today (both left anchors, both centres); the two right anchors pass by coincidence of the default.
*Mutation proving it can fail:* hardcode `:swipe-direction="'right'"` — the same four rows go red; transpose the map's `left`/`right` entries — the two right rows go red instead. Neither mutation can be made green by any other file.

No second gate. T3/T4 are paint claims and are discharged by capture, not by asserting on class strings.

### π / DELTA obligations
All Chromium, live dev server `localhost:5199`, computed-style + screenshot only — never `getContext` on a live canvas (the context-steal trap).
- **Gutter (T3)** — route `/feedback/toast`, 1440×900, fire Default + Success + Destructive. Paired PNG + computed `row-gap` of the portalled viewport: before `normal`, after `12px`.
- **Touch close (T4)** — route `/feedback/toast`, 390×844 with coarse-pointer emulation (top anchor), no hover, no focus. Paired PNG + computed `opacity` of `[data-slot="toast"] button[aria-label="Dismiss"]`: before `0`, after `1`.
- **Swipe (T1)** — route `/feedback/toast` with the new position control on `bottom-left`. Pointer-drag 80px toward the left edge; record `data-swipe-direction` and `--reka-toast-swipe-move-x` before (`"right"`, var unset, root never moves) and after (`"left"`, `-80px`, root tracks the pointer). Repeat on `bottom-center` for the `--reka-toast-swipe-move-y` arm.
- **WebKit** — owed for all three cells, and specifically for the vertical `-y` arm on the centre anchors. The WebKit Playwright cell is blocked in this environment; these cells are **not** claimed and must not be marked green from the Chromium run.

### Breakage
- **Swipe gesture changes for 4 of 6 positions.** Consumers on `bottom-right`/`top-right` see nothing. Migration line: none required — anyone who wrote CSS or a `swipeEnd` handler keyed on `[data-swipe-direction="right"]` for a left/centre toaster updates the selector to the anchor's real direction.
- **`group-[.destructive]` utilities deleted from `ToastAction`.** Only reachable by manually setting `class="destructive"` on a `<Toast>`; that never worked with the shipped tone register. Migration line: use `tone="destructive"`, the supported path since the feedback-tone collapse.
- **12px gutter** shifts stacked toasts down/up by 12px each. Visual only.
- **Close glyph now visible at rest on coarse pointers.** Visual only; fine pointers unchanged.
- **`Toaster` gains `duration`.** Additive, no default change.
- **`demo/stories/feedback/toaster.vue` loses its live example block.** Demo-only; the page's own triggers are the live demo.

### Open
- WebKit swipe behaviour on the vertical (`up`/`down`) centre anchors. Deciding fact: a WebKit pointer-drag trace on `/feedback/toast` at `bottom-center` showing `--reka-toast-swipe-move-y` written and the root tracking the pointer. Blocked until a WebKit cell is available; do not infer it from Chromium.
---

## W-SLIDER — inscribe the spectrum thumb, strike the inert touch arm, paint the affordance that cannot paint

**Disposition:** KEEP-THIN
**Jury:** No bench returned a verdict (design/architecture/evidence all failed). Foreman adjudicated de novo against source at HEAD `0371836d` plus a live Chromium readback of `/forms/slider` (dist-demo, playwright-core). Standing BJ rows re-adjudicated: BAND-A11Y **(F)** "44px coarse-floor restore" is **reduced** — the floor is already met (`data-control-target` → `responsive.css:4-8`; measured root 44×44 at coarse), so only the false comment survives; BAND-A11Y **(E)** "focus-visible nit" is **overruled** on measurement.
**LOC now → expected:** 621 → ≈405 (`Slider.vue`); `types.ts` 26 → 26; one new visual spec (~45).

### Defects this wave closes

| id | defect | evidence | sev |
|---|---|---|---|
| S1 | Spectrum thumb overhangs its own capsule on every touch device. `height: 100%` resolves against the **root** (reka gives the thumb `position:absolute`, `offsetParent === .glass-slider`, sibling of the track), and `@media (pointer: coarse) [data-control-target] { min-block-size: 2.75rem }` inflates that root. | `Slider.vue:520` (`height:100%`) + `:612` (vertical `width:100%`) + `:198` (`data-control-target`) + `responsive.css:4-8`. Measured 390×844 hasTouch: root `y 1010.30→1054.30` (44), track `1020.30→1044.30` (24), thumb `1010.30→1054.30` (44) — **10px overhang top and bottom**. Coarse sm 44 over a 12px track; md 44/24; lg 44/36. Fine pointer md is correct (24/24). Contradicts the file's own inscription law, `Slider.vue:44-50`. | HIGH |
| S2 | The standard variant has **no visible hover and no visible held state**. Both are outer (non-inset) box-shadow rings on `.slider-range`, which is a child of `.glass-track-well { overflow:hidden; border-radius:9999px }` and is exactly flush with it — every ring is clipped. | `Slider.vue:384-389`, `:475-480`; `track-well.css:35-40`. Measured on hover: `trackOverflow "hidden"`, `trackRadius "9999px"`, `rangeH 20 === trackH 20`, rangeShadow = three spread rings all outer. The dock `data-held` path exists to light a ring that cannot reach a pixel. | MED |
| S3 | The whole `useTouchGate` arm is inert, and costs a document-level listener + a 3s timer per mounted Slider. (a) the root sets `touch-action: none` so no touch on it can scroll — there is nothing to arbitrate; (b) the swallow cannot work: reka binds `pointerdown` (`SliderImpl`), dispatched **before** `touchstart`, so `preventDefault`/`stopPropagation` arrive after the drag has started. | `Slider.vue:109-165, :247`; `useTouchGate.ts:120-135` (registry + shared `document` touchstart + 3000ms timer). Empirical: first touch tap on `/forms/slider` at 390×844 moves `aria-valuenow` 42 → 80 — the "swallowed" tap is not swallowed. | MED |
| S4 | `data-touch-active` is written and never read. | `Slider.vue:204` is the only occurrence in `src/` (grep: 1 hit). | MED |
| S5 | `glass-specular-track` on the thumb buys nothing. Standard: thumb is `width:0; opacity:0`, so the `::before` catch-light has zero paint area. Spectrum: it paints but is frozen — the pointer anchor needs `--mouse-x/--mouse-y`, written only by `v-specular`, which the Slider never applies, so `--specular-x/y` sit at the 50%/50% fallback forever. | `Slider.vue:235` (class), `:359-361` (collapse), `material.css:141-160` (`--specular-x: var(--mouse-x, 50%)`), `vSpecular.ts:31`; grep `v-specular` in `src/components/slider/` = 0. | MED |
| S6 | Doc-truth: two comment blocks describe a `.slider-thumb.touch-hit-area::before` 44px halo and an override rule that **do not exist** — and `a11y-overrides.css` repeats the claim, naming Slider-thumb as a composer of the utility. | `Slider.vue:356-358`, `:372-380`; `a11y-overrides.css:127` (six-atom list), `:175-177`. `grep -r touch-hit-area src/components/slider/` = 0 matches. | MED |
| S7 | Dead CSS: `.glass-slider:active .slider-range`'s `transform`/`transform-origin` are overridden by an identical-specificity later rule; only its `transition` survives. | `Slider.vue:412-417` vs `:425-433`. | LOW |
| S8 | Nine consumer knobs with zero setters anywhere in `src/`, `demo/`, `docs/`. | `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-shadow`, `--slider-thumb-border-w`, `--slider-thumb-hover-ring-w`, `--slider-thumb-hover-ring-color` (0 setters each; census run over `src/ demo/ docs/`). `--slider-range-bg` (4) and `--slider-thumb-spring` (1) are live and stay. | LOW |
| S9 | Greenfield-no-meta: the majority of 621 lines is tranche archaeology — "the retired `--slider-track-bg` knob" (`:290`), "NOT a DEAD arbitrary-property CVA … that compiled only into a `dist/*.js` chunk" (`:262-266`), "challenge #3 R3" (`:423`), "P1-R3 (value.js §1.8)" (`:562`), "the §F headline binding bug" (`useTouchGate` prose), "the device-proven fix" (`:60`). | `Slider.vue` — comment lines outnumber declarations. | MED |

§Overruled
- **BAND-A11Y (E), "Slider focus-visible nit"** — measured, not argued. After a real mouse click on `/forms/slider` (Chromium 1440×900), `root.matches(':has(:focus-visible)')` is **true**, identical to `:focus-within`; both paint the same 2px ring. Chromium grants `:focus-visible` to `role="slider"` on pointer focus, so the swap has no observable delta. Do not re-raise without a *different engine's* readback showing a split.
- **BAND-A11Y (F), "re-apply `touch-hit-area` on the thumb"** — the coarse floor is already satisfied by `data-control-target` on the root (measured root 44×44 at coarse, both orientations). Re-applying the utility would add a `pointer-events:none` pseudo that enlarges a *readback*, not a target — and would install a second, contradictory owner of the same floor. Reduced to the comment strike (S6).

### The change

All in `src/components/slider/Slider.vue` unless stated.

**Inscription (S1).** Add `--slider-spectrum-track: calc(var(--slider-thumb-size, 1rem) * 1.5)` to the `.glass-slider[data-variant="spectrum"]` block and consume it in four places: the horizontal track `height`, the horizontal thumb `height` (replacing `height: 100%` at `:520`), the vertical root `width` (`:602`), the vertical spectrum track `width` (replacing `width: 100%` at `:606`), and the vertical thumb `width` (replacing `width: 100%` at `:612`). Invariant to hold in the file: **no track or thumb declaration may use a percentage on the cross axis** — the thumb's containing block is the root, and the root's cross axis is owned by the coarse floor. `.slider-range { height: 100% }` stays: its containing block is the track.

**Affordance (S2).** Convert both rings to `inset`. `:384-389` hover → `box-shadow: var(--glass-material-rim), inset 0 0 0 1px var(--surface-tint-8)`. `:475-480` held → `box-shadow: var(--glass-material-rim), inset 0 0 0 2px var(--surface-tint-15)`. Drop the `--slider-range-shadow` leg from both (S8).

**Touch arm (S3, S4).** Delete `:109-165` entire (the `useTouchGate` import at `:10`, `const touchGate`, `onTouchStart`/`onTouchMove`/`onTouchEnd`, the `onMounted` listener install and the `onBeforeUnmount` teardown), `const isTouchActive` at `:165`, and `:data-touch-active` at `:204`. `useDockHold` keeps its own native `pointerdown`/`touchstart` — it is untouched. `useTouchGate` stays exported and stays the dock's (`GlassDock.vue`, `useDockTouchGate.ts`); this is a Slider-only removal. `onMounted`/`onBeforeUnmount` imports drop with it; the DEV name-warning `onMounted` at `:176` stays.

**Specular (S5).** Remove `glass-specular-track` from the thumb class at `:235` — thumb becomes `class="slider-thumb"`. No `v-specular` is added: a 12px handle is not a catch-light surface.

**Dead rule (S7).** Delete `transform` + `transform-origin` from `:412-417`, keeping only its `transition`; or fold that transition into `:425-433`. Prefer the fold — one `:active` range rule, not two.

**Knobs (S8).** Strike `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-shadow`, `--slider-thumb-border-w`, `--slider-thumb-hover-ring-w`, `--slider-thumb-hover-ring-color`; inline their defaults (`var(--glass-blur-quiet)`, `var(--glass-under-shadow-quiet)`, `var(--shadow-sm)`, `2px`, `4px`, `var(--surface-tint-8)`). Keep `--slider-range-bg`, `--slider-thumb-bg`, `--slider-thumb-border-color`, `--slider-thumb-spring`, `--slider-vertical-size`, `--glass-slider-track-background`. The liquid-fill bridge collapses to one line: `--liquid-fill-tint: var(--slider-range-bg, var(--glass-capsule-warm))`.

**Prose (S6, S9).** Every comment states what the rule does now, in one or two lines. No retired-knob history, no wave/challenge/round citations, no "device-proven", no dist-chunk forensics, no cross-repo `value.js §` references. Keep exactly four explanatory comments, because each encodes a non-obvious constraint an implementer would otherwise undo: (1) why the thumb resolves percentages against the root; (2) why `useDockHold` attaches natively instead of via `@pointerdown` (reka forwarding drops it); (3) why the standard thumb is invisible and the fill edge is the handle; (4) why the `@supports` gate tests the literal `superellipse(2)` rather than the var. In `src/styles/utilities/a11y-overrides.css`: strike `Slider-thumb` from the composer list at `:127` (five atoms, not six) and delete the Slider sentence at `:175-177`.

### Born-RED gates

**G-SLIDER-INSCRIBE** — new `tests-visual/slider-inscription.spec.ts`, one test, coarse-pointer context (`hasTouch: true`), route `/forms/slider`.

- *Assertion:* for every `.glass-slider[data-variant="spectrum"]` on the route, `thumbRect.height ≤ trackRect.height + 0.5` and `thumbRect.width ≤ trackRect.width + 0.5`, and the thumb's block-extent is contained in the track's (`thumb.top ≥ track.top - 0.5 && thumb.bottom ≤ track.bottom + 0.5`).
- *RED at HEAD:* measured Chromium 390×844 `hasTouch:true` — track `top 1020.30 / bottom 1044.30 / height 24`, thumb `top 1010.30 / bottom 1054.30 / height 44`. Fails by 10px on each block edge. Also RED at 1440×900 `hasTouch:true` for all three sizes: 44 vs 12 (sm), 44 vs 24 (md), 44 vs 36 (lg). Source cause at `Slider.vue:520`.
- *Mutation proving it can fail:* restore `height: 100%` on `.glass-slider[data-variant="spectrum"] .slider-thumb` (or drop `data-control-target` from `:198`, which also flips it by removing the root inflation) → RED.
- *Not asserted:* the fine-pointer case, which already passes (24/24) and would make the gate born-GREEN.

One gate only. S2–S9 are proven by the DELTA captures and by grep-verifiable absence; none of them earns a slot against a 40–60 library budget.

### π / DELTA obligations

| claim | route | engine | viewport | pair |
|---|---|---|---|---|
| S1 spectrum thumb inscribed | `/forms/slider` (variant×size matrix) | Chromium, `hasTouch:true` | 390×844 | before/after, plus the numeric rects from G-SLIDER-INSCRIBE |
| S1 no fine-pointer regression | `/forms/slider` | Chromium | 1440×900 | before/after must be **pixel-identical** |
| S1 aurora consumer | `/substrates/aurora` (`OklchStopRow` ×3 spectrum) | Chromium, `hasTouch:true` | 390×844 | before/after |
| S2 hover + held now paint | `/forms/slider` standard row, hover then `data-held` forced | Chromium | 1440×900 | before/after; the before frame must show the ring absent |
| S5 no paint loss from dropping the specular class | `/forms/slider` spectrum row, thumb hovered | Chromium | 1440×900 | before/after, expected identical |

WebKit cells are **owed and currently blocked** — no Safari arm is claimed for any row above. The `corner-shape` superellipse tier is Chromium-only by construction and its round fallback is the cross-engine base; that fallback is unverified on WebKit here and stays unverified.

### Breakage

- `data-touch-active` disappears from the root. No reader exists in this repo; a consumer styling `[data-touch-active]` migrates to `[data-held]` (inside a `GlassDock`) or `:active`.
- `glass-specular-track` disappears from the thumb. A consumer selecting `.glass-slider .glass-specular-track` migrates to `.glass-slider .slider-thumb`.
- Six CSS knobs are removed with no alias (clean break). A consumer setting any of `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-shadow`, `--slider-thumb-border-w`, `--slider-thumb-hover-ring-w`, `--slider-thumb-hover-ring-color` overrides the composed rule directly (`.my-slider .slider-thumb { … }`) or files an addendum in its own tranche. Zero setters exist in this repo; the aurora `OklchStopRow` and the demo story set only `--glass-slider-track-background`, which is untouched.
- The spectrum thumb's rendered height on touch changes from 44px to the track height. That is the fix, not a regression, but any consumer screenshot baseline covering a spectrum slider at coarse pointer must be re-taken.
- No prop, event, slot, or export changes. `SliderProps` is byte-identical.

### Open

- Whether the WebKit round-radius fallback for the spectrum thumb reads as squircle-adjacent at the new inscribed height. Decided by: a WebKit capture of `/forms/slider` spectrum row at 1440×900 once the WebKit lane unblocks.
- Whether any out-of-repo consumer (value.js color picker) sets one of the six struck knobs. Decided by: `grep -rn 'slider-thumb-\(shadow\|border-w\|hover-ring\)' ` over the constellation checkouts at ship-time. If a hit lands, the migration line above becomes an addendum in that repo's tranche rather than a breakage note here.