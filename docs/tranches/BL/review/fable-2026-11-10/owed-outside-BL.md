# Edits owed outside BL's records

The three spec seats of 2026-11-10 (W-I.8, W-R.1 and the blob run) listed these edits for files the records seat may not touch. Each is written here with its target and place, so the seat that may edit the file makes it as written. The W-I.8 seat asked for one sentence each in P5 and P6 and named what each states (D2's Q-6 (a), and W-I.8 §1.6); the records seat wrote the sentences from those two texts. The P2 sentence follows W-R.1 §2.2's correction.

## 1. `docs/precepts/motion-canon.md`, P5 (with W-I.8's landing, 11.2.0)

Place: a new paragraph after P5's second paragraph, the one that begins "A SIZE/MORPH animation is a `transform: scale()` over a RESERVED settled footprint".

> One exception is ruled, for a leaf box: a box whose geometry nothing reads may animate its insets and its px geometry per frame, as the dock's plate does, an out-of-flow child whose four insets and radius the dock's one body writes each frame while nothing is scaled (D2 Q-6 (a); glass-ui `docs/tranches/BL/waves/W-I.8.md` §1.2).

## 2. `docs/precepts/motion-canon.md`, P6 (with W-I.8's landing, 11.2.0)

Place: a new paragraph after P6's first paragraph, the one that ends "the gesture works (the PRM-safe-by-construction principle)."

> The dock keeps one reduced-motion law: every lane of its one body seats in the frame of the change, so the plate, the regions, the beside seat and the clip take at most two values across a change, and only opacity animates, for 144 ms or less (glass-ui `docs/tranches/BL/waves/W-I.8.md` §1.6, O-198).

## 3. `docs/precepts/motion-canon.md`, P2 (with W-R.1's deletion commit, 12.0.0)

Place: P2's paragraph. Replace this sentence:

> The `dialog-scale`, `pop` and `dropdown` enters in `transitions.css` move off `--spring-bouncy` and `--spring-snappy` onto the eased register.

with:

> The `dialog-scale`, `pop` and `dropdown` enters in `transitions.css` already ride `--spring-present`; the overlay reveal's `--enter-overlay-spring: var(--spring-panel)` (`src/styles/tokens/motion-registers.css:69`, damping 0.71) is the one enter that still overshoots, and it moves onto `--spring-present`.

## 4. Notices, not edits (the blob run, 13.0.0)

atlas and speedtest are told of Aurora's `renderMode` change when the blob run is booked and again at its publish: `"webgl" | "css" | "auto"` becomes `"gpu" | "css"`, default `"gpu"`, and `resolveRenderMode` and its siblings leave `./aurora` (`waves/W-G.1.md` §7). atlas pins `renderMode = shader ? "webgl" : "css"` (`atlas/src/platform/chrome/background/Aurora.vue:85`) and speedtest pins it at `App.vue:53`. atlas is also told that a host without WebGPU paints no constellation after W-B.9 (`waves/W-B.9.md` §0).

## 5. `src`

None of the three lists names an edit in `src` for anyone but the wave that builds it.
