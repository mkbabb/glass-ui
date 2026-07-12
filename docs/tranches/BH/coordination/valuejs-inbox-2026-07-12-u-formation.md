# value.js → glass-ui — the U-formation coordination communiqué (2026-07-12)

**Supplements (does NOT supersede)** `../BI/coordination/VALUEJS-T-COMMUNIQUE-2026-07-11.md`
(SHA **`f3f3c097`** — the consolidated T producer ledger; BI is now closed history, so its §1
blocking reds are carried FORWARD here for BH visibility, never re-litigated). The owner's relay
edict, 2026-07-12 verbatim: ***"All component level and glass-ui level changes must be
communicated to them directly, at the root, a fond."*** value.js is **mid-formulation of its
tranche U** via a multi-pass convergence loop (8 audit rounds folded; the convergent design-loop
formation opens on T.W8's terminal state) — this file carries the **glass-relevant deltas** that
loop has surfaced. Expect further dated appendices as passes fold.

**Stamped producer HEAD at dispatch**: glass-ui **`051e6957`** (branch `tranche/BG`,
package.json **5.0.0 in-tree**, npm `4.2.0`, **no v5 tag** — the cut is USER-GATED). Every cite
below was re-verified live at this HEAD on 2026-07-12 (the HEAD-stamp corollary).

**Row grammar**: *component* · *the ask* · *evidence* (our `file:line` + your `file:line`) ·
*our acceptance oracle* · *the coordination* (co-migrate / hold / cut-order). Rows are lifted
directly into your wave docs. Where a row JOINS one of your own registers, it reads as an
**acceptance constraint on that register**, one book, never a second.

---

## §1 · THE `mixColors` CONVENTION COUPLING — component: `border-progress/spectrum-walk` (freshest, most urgent)

value.js's forthcoming **U-F30** library-correctness fix MAY change the **raw output channel
convention** of `mixColors` / `sampleColorRamp` / `color2` — the exact functions your
`border-progress` spectrum walk reads directly, BYPASSING `parseCSSColor` and the
`toString`/serialize layer. This is the one glass-relevant delta that a value.js version cut
could shift **with no born-RED on your surface** — so we relay it first, at the component root.

**The defect (value.js side)** — U-F30, owner-ruled AMELIORATE: colors from the CSS Color 4/5
paths (`color-mix()`, relative-color) carry internal normalized `[0,1]` channels, and the mix /
ramp emitters return them verbatim. `parseCSSColor('color-mix(in srgb, red 30%, blue)')`
serializes `rgb(0.3 0 0.7)` (near-black) vs the direct-parse `rgb(76.5 0 178.5)` — the same
`parseCSSColor` yields two incompatible numeric conventions by input path. The correctness fix
touches how `mixColors` (`src/units/color/mix.ts:108`) / `sampleColorRamp`
(`src/units/color/mix.ts:403`, wraps `mixColors`) / `color2` (`src/units/color/dispatch.ts:183`)
emit — and today they emit the **CURRENT** normalized-in / hue-in-turns convention.

**Why it's material to you** — your spectrum-walk reads that raw output:

| Component | The coupling (your tree, verified `051e6957`) |
|---|---|
| **`border-progress`** — `src/components/custom/border-progress/composables/spectrum-walk.ts` | `:22` `import { mixColors, OKLCHColor, sampleColorRamp } from "@mkbabb/value.js"` · reads RAW `OKLCHColor` channels via `oklchToStop` (`:36-39` — `Number(c.l)`, `Number(c.c)`, `Number(c.h)*360`) · calls `mixColors(...)` `:58` + `sampleColorRamp(...)` `:90` · your own `:30` comment attests it is tuned to value.js's CURRENT "degree hue is normalized in; the read-back un-normalizes it" convention · ships live in dist (`spectrum-walk-*.js`). **`boot-smoke` catches export drift, NOT a semantic-convention shift** — a value.js cut that changed the raw channel scale would silently shift your border-progress spectrum with zero signal. |

**The ask**: **be aware now + hold / co-migrate at your cut.** No action is owed until the
value.js library-correctness cut is on the table.

**Our commitment** (the design loop's standing preference, so your raw read is the safe default):
value.js's U-F30 design loop **PREFERS the invariant-PRESERVING fix** — fixing ONLY the
`toString` / serialization layer (the actual U-F30 symptom, `base.ts:202`), so the raw
`mixColors`/`sampleColorRamp`/`color2` channel convention is **held unchanged** and NO
direct-channel reader (yours included) is affected regardless of count. The greenfield candidate
the PROTOTYPE phase weighs: a per-instance normalization-state brand on `Color`/`ValueUnit` so
`toString` disambiguates without touching the channel convention. **IF** a convention change is
instead chosen (normalize-on-construct at the mix/relative locus), it **CO-LANDS with your
spectrum-walk migration** under the U-F77 co-land ordering (§3) — never silently shipped.

**Acceptance oracle** (ours, at the cut): the value.js library-correctness born-RED
**re-enumerates the constellation's raw-channel readers** of the changed functions at cut time
and gates the chosen invariant against ALL of them — so the exact consumer count is a BUILD
concern, never a formation gate. On YOUR surface specifically: **the `border-progress` spectrum
renders byte-identical before/after the value.js cut**, OR `spectrum-walk.ts` co-migrates in the
same window. (Sibling note, for completeness, not your action: keyframes.js has the analogous
direct reader at `backward-color.ts` — coordinated through keyframes' own channel + the U-F77
pin-widen.)

---

## §2 · THE COMPONENT-LEVEL PRODUCER DEFECTS

### §2a — U-F4: the desktop-PRM dock-collapse (NEW this formation — the sharpest a11y break found)

| Component | The ask · evidence · oracle |
|---|---|
| **dock** (`GlassDock` morph engine) | **Ask**: under `prefers-reduced-motion: reduce`, the expanded/always-expanded dock must resolve to its **EXPANDED geometry statically** (the reduced-motion cure is snap-to-end-state, not freeze-at-start) — e.g. PRM sets `--dock-expand-t: 1` for `.expanded`/`.always-expanded` rather than deriving it from the frozen morph clock. **Evidence** (your tree, verified `051e6957`): `src/styles/dock/morph.css:70-73` — `.glass-dock.expanded[data-morphing]:not([data-pane-swap])` and `.always-expanded[...]` set `--dock-expand-t: var(--dock-morph-t)`. Under PRM the morph animation is frozen, so `--dock-morph-t` holds at **0** while the `.expanded` class is set → `--dock-expand-t = 0` → the dock renders at the collapsed 44px pill on EVERY view; **19/20 nav+action controls visually clipped away, with NO hover/click/keyboard recovery** (probes: width stays 44px through all interactions). **DESKTOP-viewport-specific** (`always-expanded=false`; mobile degrades to 244px, not empty). WCAG 2.4.3 / 2.4.7 / 1.4.13-class app-level nav failure. **Demo EXONERATED**: the earlier-suspected demo `overture.css:179` is a RED HERRING (never applied under PRM); the root is PRODUCER-ONLY, and a consumer CSS override would breach the glass-ui-first precept — **the demo has no cure to make.** **Oracle**: under emulated PRM, the expanded dock renders full-width with every nav+action control reachable, desktop viewport, both schemes — born-RED against a **real-GPU / owner-attested** frame (this formation logged 2 headless false-reds — the overture red herring + a PRM confound — so §2 gates never trust a headless assertion). **Priority**: BLOCKING-a-red (A-class a11y). **JOINS** your own U-F2 / W-adopt BI-acceptance-constraint list (fold, not a parallel book). |

### §2b — the STILL-OPEN T producer reds, carried FORWARD by name (BI closed; BH must see them)

Definitions of record live in the BI letter `f3f3c097` §1; **state lives there**; this table is
the BH visibility carry-forward — each row still LIVE at `051e6957`. Do NOT re-book; lift as
acceptance constraints on the register named.

| # | Component | The ask · your `file:line` · our oracle · joins |
|---|---|---|
| **T-60** | aurora runtime + goo-blob | Reveal-bloom **consumer door** (opt-out / arrival-sync) + a palette-honest entrance floor (never a `saturate<1`/`brightness<1` veil over a chromatic field). `revealBloom:true` HARDWIRED — `aurora/composables/runtime.ts:261` + `goo-blob/composables/useMetaballRenderer.ts:338`; `@keyframes substrate-reveal-bloom` `src/styles/viz-reveal.css:29-40` over `--substrate-reveal-duration:1100ms` (`tokens/scheme-motion.css:216`). **Oracle**: `t60-probe.mjs` 4-leg — no achromatic/dim stage inside the visible window. **JOINS your UF-E10.** BLOCKING-a-red. |
| **T-52** | dock overflow | (a) mask honesty at rest — when neither fade is active, `mask-image` must compute `none` (the 0px-fade transparent stop antialiases the outermost pixel column at BOTH inline edges, shaving flush items' ring arcs); (b) an inline safe-inset on `.dock-layer` ≥ ring weight (~2–4px + `scroll-padding`); (c) optional `--dock-pill-h` export. `src/styles/dock/overflow.css:86-99`. **Oracle**: flush-item ring renders whole at rest + mid-scroll, both edges/schemes. **JOINS your ss-17/ss-21 + D-DOCK.** BLOCKING-a-red. |
| **GAP-L2** | aurora atoms | The lightness-scheme variance-atom door — `lightnessScheme`/`lBand` + `hueSpread` chroma-adaptive + cross-stop `chromaVariance`. `aurora/composables/atoms.ts` exports NONE; the dark L band `[0.18, 0.42]` is unreachable (dark ground L 0.404 → field-composite L 0.716 — dark cocoa cards float on a bright salmon field). **Oracle**: O-26/O-3 dark-leg + the T-60 dark legs. **JOINS your B5.** BLOCKING-a-red (dark scheme owner-visible). |
| **GAP-L5** | goo-blob | The `settled` seam + park-only-from-settled (LOAD-BEARING: the demo parks the hero at 2.7s idle while one fission beat is 5.2s → an armed-but-idle hero freezes mid-split; the engine's own `isQuiescent` knows better but the consumer has no seam) + exported HERO preset + rows A–E + the single-WebGL2 collapse (drain `metaball.wgsl`) + `lightnessFloor ∈ [0.12, 0.20]` default 0.15. `fissionAmp` SHIPPED (`goo-blob/types.ts:247/463`) but no `settled` export at HEAD. **Oracle**: verify-at-cut + the 390 blob perf gate (HARD) + O-12 frame-diff. **JOINS your B5.** BLOCKING-a-red for the `settled` seam (freeze-mid-split hazard the day the demo arms fission — imminent). |
| **PKT-1** | styles/tokens (dist emission) | Alias the Tailwind emission onto the house duration tokens at the root — the dist must never re-declare the default over a consumer `@theme` alias. `dist/styles/components.css` `:root{ … --default-transition-duration:150ms … }` (fresh build). Named T-58 KNOWN CONFOUND — any felt-duration retune before this lands tunes against a corrupted clock. **Oracle**: our O-16-R1 born-RED census leg flips green the day it lands + a fresh demo rebuild. BLOCKING-a-red (D-MOTION-adjacent). |
| **T-38** | aurora | The three F-10 honesty arms (cursor-LOCAL luminance lean that reads on `smooth` fields · velocity burst routed into the domain-warp path · medium-gated interactivity atoms) + the sized amplitude atom `interactivity:{light,strength?,radius?}`. On the `smooth` medium the swirl + burst axes are perceptually DEAD; the one demo scalar (0.45) cannot cure dead axes, and a demo shader fork is fence-forbidden. **Oracle**: verify-at-cut W7. **OWNER-ORDERED (MANDATE §0.6). JOINS your B5.** BLOCKING-a-red. |
| **T-45** | glass ladder recipes | The oversampled-pseudo idiom (`::before { inset: calc(-2 * blur) }` under the host radius clip) **AT THE LADDER** — every rung pairing backdrop blur with a radius clip over a bright ground smears the field ≈ one blur radius inside the edge (bisection proof: card `backdrop-filter:none` → rim GONE). Our demo interim (`7d3900a`, ≤1/255) covers the pane-card recipe ONLY; the rest of the ladder population stays exposed. NB: T-53 (the dark-corner "artifact") is a DISTINCT demo root (50%-α cream caster, box-shadow-killed), cured demo-side — do NOT double-count. **Oracle**: the bisection probe per rung (rim delta ≤1/255 at dpr-2, both schemes). BLOCKING-a-red (population-wide). |
| **P1-R3** | ui/slider | Pair the UA-outline suppression with the house ring at the same selector. `ui/slider/Slider.vue:470-474` — `[data-variant="spectrum"] .slider-thumb:focus-visible` applies `box-shadow: var(--focus-ring-shadow), var(--shadow-sm)` but never suppresses the UA outline → Chromium paints `outline: rgb(0,95,204) auto 1px` OVER the accent-aware ring. The three demo focus sites all correctly pair `outline:none` + shadow; only the producer thumb misses it. **Oracle**: our picker.p1 probe (house shadow present + no UA auto outline). BLOCKING-a-red (A-class, keyboard-visible). |
| **GAP-ARM** | aurora | One honest `inst.update(getCfg())` after `arm()`. `useAurora.ts` `armRuntime()` arms at `:214` then wires a NON-immediate `watch(getCfg, …)` — a config change between deferred construction and arm is silently dropped. **Oracle**: W7 re-verify (config-change-in-window replay observed). BLOCKING-a-red (historically prod-visible). |

---

## §3 · THE 5.0.0 ADOPT + THE VERSION CO-LAND (U-F2 · U-F68 · U-F77)

- **value.js consumes glass-ui 5.0.0 at the cut** — this satisfies your `@mkbabb/value.js` peer
  floor: `package.json:1109` (peers) + `:1147` (devDeps), both **`^3.1.0`**, and value.js ships
  `3.1.0` on npm. Note (U-F68): your `package-lock` records `file:glass-ui @ 4.2.0` but the disk
  symlink is `5.0.0` — the adopt gap is **already live locally**; the lock refreshes at the cut.
  Our T.W7 adopt wave stays **TRIGGER-NOT-FIRED** and floats to whatever round is current when
  the v5 tag lands — we do NOT press the cut.

- **value.js's own U-F29 library cut may be semver-MAJOR** and **will CO-LAND** so your `^3.1.0`
  peer floor is not stranded. U-F29 (owner-ruled AMELIORATE): the headline, README-usage `parseCSSValue`
  (`src/parsing/index.ts:494`, a `tryParse(ValuesValue)`) silently drops every token after the
  first sub-value (`'1px solid red'`→`'1px'`); the full-list `parseCSSSubValue` exists
  (`:542`). The amelioration (loud-fail on unconsumed input, or a full-value default) is the
  design loop's call; a loud-fail shape is **minor-safe**, a reshape is major.

- **The reshape breaks NO consumed glass-ui API** — glass-ui consumes only `parseCSSColor`
  (~1–2 real sites: `src/components/custom/composables/color/index.ts:24,119`) + the **direct
  `mixColors`/`sampleColorRamp` path** (spectrum-walk, §1). glass-ui imports **ZERO**
  `parseCSSValue`. So:
  - the `parseCSSValue` reshape → **no glass-ui action** (unconsumed);
  - the **U-F30 serialization change** reaches you via the `parseCSSColor → colorUnit2` path
    (auto-adopted on the `^3.1.0` minor) AND the direct raw-channel path (§1 — the one to watch).

- **U-F77 co-land ordering** (owner-held publish decision, §13.5 of our registry): the
  library-correctness cut's version decision sequences against the U-F2 adopt so **BOTH `^3.1.0`
  peer floors** (glass-ui + keyframes.js — keyframes also pins `^3.1.0` and DIRECTLY consumes
  `parseCSSValue` ×3, so it co-migrates via its own channel + a pin-widen) land coherently. We
  present the version decision to the owner **with the landed fix**, never unilaterally.

- **Cut-order ask on you**: at the value.js cut, either your peer floor widens to accept the new
  major, OR (our preferred path) the fix lands minor-safe and your floor is untouched — decided
  with the landed fix in hand. Nothing here blocks your v5 tag.

---

## §4 · DEDUP — what we already sent · what YOU already track

- **What we already sent** — `../BI/coordination/VALUEJS-T-COMMUNIQUE-2026-07-11.md` @
  **`f3f3c097`** (the consolidated T producer ledger: §1 blocking reds · §2 booked swaps · §3
  calibration · §4 the 5.0.0 trigger). BI is now closed (round 17), so this BH letter **carries
  the §1 reds FORWARD by name** (§2b above) for BH visibility and **adds the U-formation deltas**
  (§1 mixColors coupling · §2a U-F4 PRM dock). We do NOT re-litigate the BI rows — their
  definitions and state live in that letter; §2b is a visibility pointer, one register.

- **What YOU already track** — your `asks-and-consumes.md` **4-row by-name 5.0.0-BH-B7 roster**
  (muster `/api`→`/aurora` · speedtest `/api`→`/timeline` · atlas `--ring`→`--focus-ring-color`
  · bbnf-buddy `--glass-blur-dock` retune). **value.js is NOT in that roster — correctly.** That
  roster is your **export-break migration list** (`/api` drop + two token vectors); our asks are
  a different register: **design-reds** on the producer surfaces we consume (aurora / blob / dock
  / glass-ladder / slider) plus the **`mixColors` convention coupling** — none of which is a
  `/api` break value.js must migrate around. Both registers are live at the same 5.0.0 cut; they
  do not overlap. (Your `asks-and-consumes.md:36` B1c CONSUME note — value.js `oklchSpectrum` met
  at `1.1.1` — is a resolved historical consume, untouched here.)

---

## §Dispatch-stamp

**Stamped producer HEAD**: glass-ui **`051e6957`** (`tranche/BG`; package.json 5.0.0 in-tree ·
npm 4.2.0 · no v5 tag — USER-GATED, T.W7 trigger NOT fired). Re-verified live at this HEAD at
dispatch: spectrum-walk raw read (`spectrum-walk.ts:22` import / `:36-39` `c.l/c.c/c.h*360` /
`:58` mixColors / `:90` sampleColorRamp) · PRM dock latch (`dock/morph.css:70-73`
`--dock-expand-t: var(--dock-morph-t)` for `.expanded` + `.always-expanded`) · value.js peer
`^3.1.0` (`package.json:1109` peer / `:1147` dev) · keyframes peer `^5.2.0` (`:1107`/`:1145`).
value.js-side loci: `mixColors` `src/units/color/mix.ts:108` · `sampleColorRamp` `mix.ts:403` ·
`color2` `src/units/color/dispatch.ts:183` · `createColorValueUnit`
`src/parsing/color/color-unit.ts:32` · `toString` `src/units/color/base.ts:202` ·
`parseCSSValue` `src/parsing/index.ts:494` / `parseCSSSubValue` `:542`.

**The dispatch record** (the M1 ruling — the value.js-side record IS the gate; an ack is a
bonus, never waited on): this letter, path-scoped single-file commit into
`../glass-ui/docs/tranches/BH/coordination/` at their HEAD (local, no force, not pushed — left
for their session), supplementing (never superseding) the BI letter `f3f3c097`.
