# E1-idiom-adopt — evidence ground (READ-ONLY audit, 2026-06-10)

## Source-of-truth: which iOS/keyframes/sci-report idioms ALREADY ship in glass-ui

| idiom | source | glass-ui status | evidence |
|---|---|---|---|
| iOS 26/27 Clear/Tinted glass modes | iOS | ADOPTED — `--glass-level` typed @property (W54) | src/styles/glass/ladder.css; tokens/glass.css |
| iOS 27 dynamic material darkening over light | iOS | ADOPTED — `@container style(--glass-backdrop: light)` + `contrast-color()` (W55) | src/styles/glass/ladder.css:134,185 |
| keyframes.js spring vocabulary (response,ζ) | kf | ADOPTED — SPRING_PRESETS single-source | src/composables/motion/springPresets.ts |
| keyframes.js curve table (CSS↔JS twin) | kf | ADOPTED — MOTION_CURVES | src/composables/motion/curves.ts:76-152 |
| keyframes.js full static suite | kf | ADOPTED — /motion re-export | src/composables/motion/suite.ts |
| ppmycota purple brand color | kf | NOT adopted (deliberately — consumer brand, MEMORY presets-in-consumer) | kf demo/@/styles/style.css:200 |
| keyframes count-up (NumericAnimation) | kf | ADOPTED — useCountup | src/composables/motion/useCountup.ts |
| sci-report HandUnderline / InkMark | sci | ADOPTED — GlassUnderline /underline | src/components/custom/underline/GlassUnderline.vue |
| sci-report SectionDivider (drawn rule) | sci | thin consumer of glass-ui handmark/underline — NOT a new idiom | sci SectionDivider.vue header |
| sci-report scroll-reveal | sci | ADOPTED (flows glass-ui→sci) | src/styles/scroll-driven.css |
| sci-report .text-gilt gold one-shot | sci | cites glass-ui 3.10 but ABSENT in tree | grep: 0 hits src/; only demo .gold-shimmer + btn-audacious-gold |

## The genuine ADOPT candidates (NOT yet in glass-ui at HEAD)

### A. figure-slug — the CONTAINED audacious-numeric primitive (≥2 consumers, FOLD: typography.css)
sci-report recipes.css:59-87 `@utility figure-slug` — the four laws over glass-ui's existing
`--type-display-audacious`: L1 line-box = cap-height (`line-height: var(--slug-cap)` + `padding-block-end: --slug-lead`),
L2 container-relative (cqw on the TRACK not the slug — D1.3 root-fix), L3 `contain: layout` + `overflow: clip`,
L4 `tabular-nums slashed-zero ss03`. glass-ui's `.text-hero` (typography.css:171-187) has tnum/lnum + `text-wrap: nowrap`
but NO containment/clip backstop and NO cap-box line-height → a counted figure can reflow/overflow its box mid-count.
- 2-consumer bar: speedtest (the fast.com peg already cited), any metric-cell/metric-badge counted figure, slides hero. PASS.
- kind: UTILITY (+ 2 tokens --slug-cap/--slug-lead). fold: src/styles/typography.css beside text-hero.

### B. easing GALLERY data — surface the FULL value.js easing catalogue into MOTION_CURVES (R3-11)
value.js dist/index.d.ts:24 exports the full set: easeIn/Out/InOut × {Quad,Cubic,Sine,Circ,Expo}, bounce family
(easeInBounce/bounceInEase/…), steps (jumpTerms/steppedEase/stepStart/stepEnd), bezierPresets, timingFunctions,
timingFunctionDescriptions. glass-ui MOTION_CURVES (curves.ts:94-152) surfaces only 5 cubics + 5 springs.
keyframes demo easingGroups.ts enumerates the full family (Sine/Quad/Cubic/Expo/Circ/Back/Bounce/Steps/Custom).
- The library DATA is already a peer dep; the gap is the curated TABLE row-set, not new code.
- kind: DATA (MOTION_CURVES extension) — feeds the R3-11 demo curve-gallery. fold: src/composables/motion/curves.ts.

### C. timingFunctionDescriptions + easingGroups family-grouping (R3-11 presentation data)
keyframes demo easingGroups.ts (CurveGroup[] family taxonomy) + value.js timingFunctionDescriptions.
glass-ui has no family-grouped curve taxonomy for a gallery presentation.
- kind: DATA. fold: src/composables/motion/curves.ts (a CURVE_FAMILIES export) — demo-facing.
