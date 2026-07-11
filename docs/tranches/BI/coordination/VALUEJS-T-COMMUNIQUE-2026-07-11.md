# GLASSUI-T-COMMUNIQUE — the consolidated value.js producer ledger (2026-07-11)

**To**: the glass-ui **BI** inbox (`docs/tranches/BI/coordination/` — your active tranche; the
BG/BH coordination dir is closed history). **From**: value.js Tranche T (mid-execution: W0–W6.5
CLOSED, W8 certification passes in flight, W7 adopt TRIGGER-NOT-FIRED, W9 pending).
**Stamped producer HEAD at dispatch**: glass-ui **`24a7a764`** (branch `tranche/BG`,
package.json **5.0.0 in-tree**, npm registry **4.2.0**, **no v5 tag** — the cut is USER-GATED).
Every load-bearing cite below was re-verified live at this HEAD on 2026-07-11 (the HEAD-stamp
corollary, S-letter §16).

**What this letter is**: the ONE consolidated, current open producer ledger — TRANCHE-ROW-READY
for the BI corpus. It **consolidates and supersedes-by-reference** (never re-litigates) the
standing dispatches already at your BG inbox:

- `VALUEJS-T-ASKS-2026-07-09.md` @ your `398b7b4d` — the P1–P10 packet definitions of record
  (full contents, freeze windows, acceptance spec). Definitions live THERE; state lives HERE.
- `VALUEJS-T-P1-RIDER-AURORA-POINTER-2026-07-11.md` @ your `8a0ca24e` + its `§6 ADDENDUM` @
  your `92136ab5` — the owner-ordered T-38 pointer rider + the T-40/T-45 riders.

**Row grammar** (every row): *the ask* · *the evidence cite* (our `file:line` + measurement) ·
*the acceptance oracle* (how we verify at consume) · *priority* (**BLOCKING-a-red** = a standing
owner-visible red only you can green / **booked-swap** = demo interim landed, swap fires at
adopt / **calibration** = sizing input, owner-judged) · *our standing record SHA* (value.js
`tranche-t` unless noted).

**BI mapping**: where your own PLAN-FRAME/registry already owns the surface, the row is tagged
with your band/design-problem (D-VIZ · D-MOTION · D-DOCK · B5) — the row then reads as an
**acceptance constraint on that design problem**, one register, never a second book.

---

## §1 — BLOCKING: our standing reds that only you can green

| # | Row | The ask · evidence · oracle · SHA |
|---|---|---|
| **1.1** | **T-60 — the aurora reveal-bloom gray stage** (owner verbatim, 2026-07-11 evening: *"the aurora loading animation, that starts with a static background, then pusles to gray, and then pulses to the acurrent aurora: is totally wrong. This intermediary gray stage is ugly."*) — **PRODUCER-ROOT, FORENSICALLY PINNED**; **JOINS your own UF-E10** (`USER-FINDINGS-2026-07-11.md:82`, registered `24a7a764` the same evening — one gray-entrance register, not two; owners D-VIZ + D-MOTION) | **Ask**: a reveal-bloom **consumer door** (opt-out and/or arrival-sync) + a **palette-honest entrance floor** — never a `saturate<1`/`brightness<1` veil over a chromatic field. **Evidence** (re-verified at `24a7a764`): `revealBloom: true` HARDWIRED — `aurora/composables/runtime.ts:261` and `goo-blob/composables/useMetaballRenderer.ts:338` (`AuroraRuntimeOptions` ships no door); `@keyframes substrate-reveal-bloom` from `brightness(0.4) saturate(0.7)` (`src/styles/viz-reveal.css:29-40`) over `--substrate-reveal-duration: 1100ms` (`src/styles/tokens/scheme-motion.css:216`). **Measured** (headed real-GPU, cold+returning × light+dark, 4/4 legs): the bloom is stamped at first-visible t≈224–316ms **while the canvas still sits at the consumer's `opacity:0`**, so the visible arrival (t≈623–833ms) always opens INSIDE the dim floor — filter at the flip `brightness 0.54–0.83 · saturate 0.77–0.91`, release to `none` only at reveal+1100ms. The consumer is EXONERATED on every demo hypothesis (B2 fade opacity-only over like material; `--saved-bg-0..3` byte-constant; NOT GAP-ARM). The demo's fade composes unsynchronized mid-bloom **with no opt-out possible** — the knob does not exist. **Cross-link**: goo-blob arms the SAME bloom — a named candidate root for T-49's blob gray fade-in (our pass-2 row B). **Oracle**: `audit/pi/t60/t60-probe.mjs` 4-leg re-run — no achromatic/dim stage inside the visible window. **Priority**: BLOCKING-a-red. **SHA**: `71ae027` (MANDATE §0.7 sub-note + the forensic) |
| **1.2** | **PKT-1 — the 150ms `--default-transition-duration` clobber** (P2's P0) — **STILL LIVE, re-verified against your FRESH dist at `24a7a764`** | **Ask**: alias the Tailwind emission onto the house duration tokens at the root — the dist must never re-declare the default over a consumer `@theme` alias. **Evidence**: `dist/styles/components.css` `:root { … --default-transition-duration: 150ms … }` (fresh local build 2026-07-11; `dist/glass-ui.css` itself is clean — the emission moved to the subpath stylesheet, the claim stands per G-CUR-1); our consumed built bundle carries `.15s` beside the demo's own `var(--duration-fast)` declaration. **Recurrence pressure**: this is the named **T-58 KNOWN CONFOUND** — the owner has redded card/scene transition motion TWICE (T-48 → T-58 escalation); our frame-by-frame re-analysis must isolate producer-clobber jank from demo-choreography jank, and any felt-duration retune before PKT-1 lands is tuning against a corrupted clock. **Oracle**: our O-16-R1 born-RED census leg (`test.fail()`, carries this cite) flips green the day it lands + a fresh demo rebuild. **Priority**: BLOCKING-a-red (D-MOTION-adjacent). **SHA**: letter `398b7b4d` (your inbox); T-58 encoding `de3ec50` |
| **1.3** | **GAP-L2 — the aurora lightness-scheme atoms door** (`lBand` first) — the OLDEST open aurora red (S→T) | **Ask**: the variance-atom door — `lightnessScheme`/`lBand` + `hueSpread` chroma-adaptive + cross-stop `chromaVariance` (+ counterpoint option), per the P1 packet. **Evidence** (re-verified at `24a7a764`): `aurora/composables/atoms.ts` still exports NONE of these; the dark L band `[0.18, 0.42]` is unreachable — the dark-scheme field stays light-band material. **Measured**: dark ground L 0.404 → field-composite L 0.716 across the entrance fade (the T-60 legs COMPOUND with this); our W8 pass-2 frames show dark cocoa cards floating on a BRIGHT salmon/pink field. **Sizing**: the T-26 bracket grammar (§3.3 below) is the spec. **Oracle**: our O-26/O-3 dark-leg probes + the T-60 dark legs; consumed at W7. **Priority**: BLOCKING-a-red (dark scheme is owner-visible today; B5 "aurora vibrancy" is the natural BI home). **SHA**: S `FINAL.md §5` GAP-L2 → T `§7.1`; pass-2 record `audit/w8-certification/passes/boot-atmosphere-blob.p1.md` |
| **1.4** | **GAP-L5 — the blob `settled` seam + satellite-emergence rows** (owner verbatim T-49, 2026-07-11: satellites **"never meatball off"** the main blob) — with a major state FLIP our research established | **The flip first (dedup)**: the fission register **SHIPPED** — BD.W-GOOBLOB-MERCURY-COLONY is live in your dist (`goo-blob/types.ts:247` `fissionAmp`, `:463` default `0` "the calm default, never splits"; `useBlobSatellites.ts:142-185/317-354`; beat 5200ms). **The demo arms it demo-side — no producer ask for the register itself.** **What remains YOURS**: (a) **the `settled` seam + park-only-from-settled** — verified NOT shipped at HEAD (no `settled` export); now LOAD-BEARING, not cosmetic: the demo parks the hero at **2.7s idle while one fission beat is 5.2s** — an armed-but-idle hero freezes mid-split; the engine's own `isQuiescent` knows better but the consumer has no seam to consult. (b) **the exported HERO preset** (the window row, §4). (c) rows A–E (hero-scale mood-legibility floor in the frame-diff-at-bead-box family · curvature-bounded pseudopod · containment/genesis update + contact-shadow register) + the **single-WebGL2 collapse** (drain `metaball.wgsl` — the backing-store item). (d) `lightnessFloor` sized by the consumer D8 ink-floor bracket **[0.12, 0.20] OKLab L, default 0.15**. Row F (body-arrival pose) stays OPTIONAL — the FSM `emerging` state is the sanctioned interim. **Oracle**: verify-at-cut W7 + the 390 blob perf gate (HARD) + O-12 frame-diff family. **Priority**: BLOCKING-a-red for the `settled` seam (freeze-mid-split hazard the day the demo arms fission — imminent); booked-swap for the rest. **BI home**: B5 "blob physics rework + satellite demo". **SHA**: `de3ec50` (§0.7 T-49) + `audit/t49-research.md §2.3` (in-tree) |
| **1.5** | **The glass-recipe backdrop-filter edge-sampling bleed** (P3 rider, T-45) — with the T-53 recurrence pressure HONESTLY split | **Ask**: the oversampled-pseudo idiom (`::before { inset: calc(-2 * blur) }` under the host radius clip) **AT THE LADDER** — every rung pairing backdrop blur with a radius clip over a bright ground smears the field ≈ one blur radius inside the edge (bisection proof: card `backdrop-filter: none` → rim GONE; header-veil toggles change nothing). **The T-53 split (dedup — do NOT double-count)**: the owner's 2026-07-11 "still artifacts" sighting was forensically ANSWERED as a **distinct demo root** (our dark-scheme cartoon caster paints 50%-α cream; box-shadow kill removes it, backdrop kill does not) — T-53 is NOT this class and is cured demo-side. But the recurrence pressure is real: border artifacts keep re-entering the owner's audits, our demo interim (`7d3900a`, ≤1/255) covers the pane-card recipe ONLY, and the rest of the ladder population stays exposed. Land the ladder cure; the demo interim is a booked swap, never a fork. **Oracle**: the bisection probe class re-run per rung (rim delta ≤1/255 at dpr-2, both schemes). **Priority**: BLOCKING-a-red (population-wide, owner keeps sighting the family). **SHA**: rider `92136ab5` (your inbox) + `64e6ba9` (the T-53 forensic) + `b878417` (extract-pass attest: no NEW clip beyond this tracked class) |
| **1.6** | **GAP-ARM — the aurora cold-load arm-replay** (P1's first item) | **Ask**: one honest `inst.update(getCfg())` after `arm()`. **Evidence** (re-verified at `24a7a764`): `useAurora.ts` `armRuntime()` arms at `:214`, then wires `stopWatch = watch(getCfg, (next) => inst?.update(next), { deep: true })` — **no `immediate: true`**, no replay between deferred construction and arm; a config change in that window is silently dropped. The T-60 forensic EXONERATED this gap for the gray stage (the field carried the derived palette from its first armed frame) — the replay gap stands on its own evidence, narrower but live. Our demo half (hydration-before-derivation) is discharged (`ed24358`, W2-1) and NOT producer-gated. **Oracle**: W7 re-verify (config-change-in-window replay observed). **Priority**: BLOCKING-a-red (historically prod-visible). **SHA**: letter `398b7b4d`; W2 close record in PROGRESS |
| **1.7** | **T-38 — aurora pointer honesty (OWNER-ORDERED)** — already at your inbox; consolidated here for the BI corpus | **Ask**: the three F-10 honesty arms (cursor-LOCAL luminance lean that reads on `smooth` fields · velocity burst routed into the domain-warp path · medium-gated interactivity atoms) + the sized amplitude atom (§3.1). **Evidence**: the demo consumes EVERYTHING shipped (`setCursor @0.45` + per-move `injectCursorVelocity` + `interactivity.light`); on the `smooth` medium the swirl and burst axes are perceptually DEAD — the subtle light lean is the only visible response; the one demo scalar (0.45) cannot cure dead axes; a demo shader fork is fence-forbidden (PR-2). **Oracle**: verify-at-cut W7; the demo's W2-5 pointer retune stays DEFERRED until it lands. **Priority**: BLOCKING-a-red (owner order, MANDATE §0.6 T-38). **BI home**: B5 "aurora … interactability". **SHA**: rider `8a0ca24e` (your inbox) |
| **1.8** | **NEW — the spectrum-slider thumb UA-outline double-paint** (first transmission of a W8-pass-minted row) | **Ask**: pair the UA-outline suppression with the house ring at the same selector. **Evidence** (re-verified at `24a7a764`): `ui/slider/Slider.vue:470-474` — `[data-variant="spectrum"] .slider-thumb:focus-visible` applies `box-shadow: var(--focus-ring-shadow), var(--shadow-sm)` but never suppresses the UA outline → Chromium paints `outline: rgb(0,95,204) auto 1px` OVER the accent-aware ring (probed: both computed simultaneously under true `:focus-visible`). A foreign blue in the focus register; the three demo focus sites all correctly pair `outline: none` + shadow — only the producer thumb misses it. No demo fork (a cascade patch on `.slider-thumb` is the arms-race class our fences forbid). **Oracle**: our picker.p1 probe re-run (house shadow present + no UA auto outline). **Priority**: BLOCKING-a-red (A-class, keyboard-visible). **SHA**: `audit/w8-certification/passes/picker.p1.md §P1-R3` |
| **1.9** | **T-52 — the dock inline-edge clip** (owner-photographed; owner ordered the relay question answered) — P7·L13 gains two named arms | **Ask**: (a) **mask honesty at rest** — when neither fade is active, the dock layer's `mask-image` must compute `none` (the 0px-fade `linear-gradient(to right, transparent 0, black 0px, …)` is NOT a no-op: the zero-width transparent stop antialiases the outermost pixel column at BOTH inline edges, shaving flush items' ring arcs); (b) an **inline safe-inset** on `.dock-layer` ≥ the ring weight (~2–4px + `scroll-padding`) so flush items render whole mid-scroll; (c) optional: an authoritative **`--dock-pill-h`** export (our T-57 band-reservation cure currently re-derives the pill height demo-side — one exported rung ends the drift class). **Evidence**: your `src/styles/dock/overflow.css:86-99`; measured trigger box flush at layer x=495.3, fade customs 0px at rest; the demo's own clipper released at rest (verified NOT the residual). **Dedup — JOINS your own register**: your BI audit's ss-17/ss-21 dock hover-clip rows + the D-DOCK greenfield ("hover clip by construction") — these arms become **acceptance constraints on D-DOCK**, not a parallel book. **Oracle**: flush-item ring renders whole at rest + mid-scroll, both edges, both schemes. **Priority**: BLOCKING-a-red (owner-photographed) — subsumable by D-DOCK. **SHA**: `de3ec50` (§0.7 T-52) + `audit/t49-research.md §5/§9` |

---

## §2 — BOOKED SWAPS (demo interims landed under the no-workaround law; each swap fires at the adopt walk, or earlier via the `file:` pin — books never gates)

| # | Packet row | State + swap |
|---|---|---|
| **2.1** | **P3 — the glass ladder rungs/knobs**: the recessed **WELL** rung (`--glass-bg-well` + `.glass-well`; sizing spec: tone-step ∈ [6%, 10%] `--foreground` into `--card`, oklab, default 8%) · the seated field-chrome/`.input-bar` rung + cap seam + `--input-bar-font` · scroll-header **rest-floor + bottom-feather knobs** (unit: the Q9 EFFECT bracket — accepted iff the `quiet`-rung rest composites inside 27–39% added card material) · tiers PUBLISH effective lightness · P-3 chroma-guard note | Demo interims landed: W3-1 `--well-bg` · W3-3 search seat · W3-4 feather/rest-floor. Booked swaps, fire at W7. **DECLINE disposition (pre-recorded)**: interim becomes permanent, recorded. SHA: `398b7b4d` (definitions) |
| **2.2** | **P4 — tabs pilling (T-20)**: the anchor-arm block insets drop the double-counted `--bouncy-track-trim` addend (bare `anchor()`, both orientations/breakpoints/trim rungs) | Acceptance: indicator ≡ active-button box at every breakpoint × orientation × scheme × engine (incl. JS fallback), **ε ≤ 0.5px per edge, both engines**; our O-8 oracle goes live at W7 post-adopt. **DECLINE disposition**: ESCALATE TO OWNER (two-repo taste conflict; no demo interim exists and the fence forbids a fork) |
| **2.3** | **P5 — letter-rail + the ONE ring contract** (S-3 upgraded to MANDATED by T-5): the vertical rail primitive (stadium hairline, slot-per-item, dock-trigger state ladder, ACTIVE SEAT yielding to consumer indicator content — the seam SegmentedTabs lacked, proof `38d83e4`; admin/gold variant; PRM-clean; TOUCH rung) · ring contract = **`--dock-ring` L13 + letter-rail** (Q12 default ABROGATE — the seal has no rim) · the WatercolorDot **solid-ring register** (never hairline ≤48px) | Demo interim: W4-4 seal-recipe ring. Booked swap. NEW note: our T-59 one-law rhythm regime (single container-scaled clamp + hit-extended 44px touch) is the law the rail primitive inherits when it ships (`t49-research.md §11`). **DECLINE**: interim becomes permanent, recorded |
| **2.4** | **P6 — the blob addendum remainder** (the `settled` seam + HERO preset escalated to §1.4/§4): rows A–E · row F OPTIONAL (FSM `emerging` = sanctioned interim) · contact-shadow register · the **single-WebGL2 collapse** (drain `metaball.wgsl`) · `lightnessFloor` ∈ [0.12, 0.20] default 0.15 · the **wake-order arm** (our pass-2 row B: the bead re-enters GRAY on cached-pane return; forensic in flight — IF the engine wake repaints before consumer stops arrive, the P6 rider gains this arm BY NAME; cross-linked to the reveal-bloom root, §1.1) | Demo interims: W4-5 wall-clock park · W2-4 emerge on `emerging`. Booked swaps. **BI home**: B5. Legibility rows expressed in the frame-diff-at-bead-box family so producer sizing and our O-12 verification share units |
| **2.5** | **P7 — the component batch, re-asked by name** (fold-claimed to W-DESHADCN, verified absent; delivery ≠ disposition): L6 slider tokens (+`--slider-track-checker`) · **L8 clampLabel — 5th booking, ESCALATED** · L11 dropdown-menu glass tokens · L16 backdrop-prefix policy · L10 verify · **L7 EasingPicker v2** (container-query stage law/square-fit canvas · internal material tokens/`chrome` prop · `preset?` payload · **declarative `autoplay`/`playing` door** · `initialPoints` seed · write-through modelValue · curve-glyph preset menu · travel-dot rest + PRM at source) · the **EasingPicker SelectTrigger accessible-name contract (CHRONIC R→S→T)** · **L13 dock residuals** + arrive-expanded (`start-collapsed=false` mounts AT the pill pose, OR a `morph-settled` event/attr) + the T-52 arms (§1.9) · L14 ConfiguratorRow · L15 + relay-item-8 (HELD-below-bar) · the Select **description-lane survival contract** (Q5-outcome-independent) · the base-Tabs **`underline` variant** (shipped register = `TabsIndicator.vue` pill-plate — named so the ask sizes the right mechanism) | **State update (dedup)**: the demo's regex-driven autoplay was DELETED at W6.5 Row E (`1a8f06c` — the booked deletion pre-executed; the declarative door remains the v2 ask, now for the picker's own playback). Demo interims: W2-3 `transitionend` dock veil (arrive-expanded) · `.underline-tabs` MARKER (`style.css:476-484`) stays until the variant ships or PaletteDialog migrates; retire-check at W7 |
| **2.6** | **PKT-2/3/4 (P2 motion remainder)**: PKT-2 the spring clock hole (press 0.16s ↔ snappy 0.4s; a ~0.3s-settle preset or bless snappy) · PKT-3 a compositor collapse/expand recipe · PKT-4=L9 skeleton shimmer seams | Our W5 Tranche B (R6/R7 compositor collapses) stays UNTOUCHED — never retimed on layout properties — until PKT-3 lands (PI-5). **BI home**: B7/D-MOTION register work — these become acceptance constraints on the register collapse |
| **2.7** | **P8 — build/dist**: A6 the minifier drops unprefixed `backdrop-filter: none` · **CC-1** the registered-@property-inside-`color-mix()` collapse on bare `.glass-wash` · the dist-rebuild discipline (G-CUR-1: claims about "what ships" are made against a fresh build, never the version label) | The demo A6 MARKER retires the day it is fixed; the two bare `.glass-wash` sites paint their rung the day CC-1 is fixed |
| **2.8** | **P10 — type stations**: the SelectTrigger size ladder +1 station (or token-indirect `--select-trigger-font-size`) · display/heading **weight tokenization** (`--type-weight-display/-heading`) · **the `text-title` 700 hardcode** — re-verified at `24a7a764`: `src/styles/typography/semantic.css:132-139` `@utility text-title { … font-weight: 700 … }` — the root of the bold option letterforms (T-40); `text-title` joins the weight tokenization | Demo interim landed: the `--type-weight-display` 400 pin (option letterforms compute weight 400, O-18 letterform gate GREEN both schemes at W6.5); the pin retires when the token lands. **Q11a (owner-ruled)**: YOUR typography ladder is the sizing AUTHORITY for every consumer landing (×φ = two token steps); the consumer mints NO sizes — a missing rung/station is exactly this ask, owner-backed. Our T-51 step-down consumed your existing `--type-display-2`/`--type-display-1` tokens (zero mint — the ladder worked) |
| **2.9** | **Q16 candidates (your ≥2-consumer call)**: `EmptyState` + the picker action controls · the hue-carrying primary tier (T-16 — "prominence = tint, not size" is your own comment) · the dock status-lamp primitive (T-9) | Until answered: `EmptyState` lifts to a shared demo atom; action controls stay picker exports via the hardened barrel |

---

## §3 — CALIBRATION / AMPLITUDE (sizing inputs, owner-judged; the T-26 bracket grammar throughout: both poles named, never a point value)

| # | Row | Content |
|---|---|---|
| **3.1** | **The pointer amplitude atom** (rides §1.7) | `interactivity: { light, strength?, radius? }` — sized so the consumer can dial "noteworthy" without forking constants. The demo's whole dial today is the one scalar 0.45. F-10's arms are the honesty half; this atom is the amplitude half |
| **3.2** | **The MAX_NUCLEI lift** (T-32) | The demo's Zones knob renders pinned at 6 — clamp-probed: `count: 6` IS your ceiling (`aurora/index.ts:30` `MAX_NUCLEI` // 6). The raise is a producer book (P1-family); the demo half (`arrangement: "scattered"`) landed and was judged in-bracket. SHA: W2 close record (`73762b2`) |
| **3.3** | **The T-26 sizing record** (the calibration the P1 variance atoms are SIZED BY) | The landed demo calibration of record: `energy 0.76 · softmaxBeta 4 · breath 26 · vividness = f(seedC)` (W2-5, `244459e`; drag path byte-identical). Fresh bracket evidence from our W8 pass-2 (the neutral-seed whisper floor, D4 axis): poles **silence** (CURRENT: vividness(0)=0, field C ≈ 0.004) ← **a perceptible sage whisper** (field C ≈ 0.02–0.04 at seedC=0) → **marigold** (injected chroma reading as a color lie on a gray pick). The variance-atom door should admit this band; the owner judges the point |
| **3.4** | **The entrance floor sizing** (rides §1.1) | If the reveal-bloom door lands as a calibration knob rather than a pure opt-out: the floor must be palette-honest — the entrance never transits a `saturate<1` veil over a chromatic field; the T-60 measured legs (brightness 0.54–0.83 at the visible flip) are the reproducible BEFORE pole. Your UF-E10's own register ("palette-derived first paint + bloom choreography") is the same law — we co-sign it |

---

## §4 — The 5.0.0 trigger state (the one-migration edict, read at your HEAD)

- **At `24a7a764`**: package.json **5.0.0 in-tree** · npm registry `latest = 4.2.0` · **no v5
  tag**. The cut row is **USER-GATED** (unchanged since our `c93a7f13` stamp). Our **T.W7 adopt
  wave stays TRIGGER-NOT-FIRED** and floats into whatever round is current when the tag lands —
  it is NOT on our critical path, and we do not press the cut.
- **Your BI Decision-0** (PLAN-FRAME): recommendation HOLD the tag; ONE cut at the BI close
  carrying repairs + greenfields + flatten. **Our reading, co-signed**: the owner's
  one-migration edict (`BH/PLAN.md §2-#4`) is exactly why — our W7 MIGRATION walk runs ONCE
  against whichever single cut ships. Consequences we ask you to carry into the BI corpus:
  1. **The W-1/W-2 freeze windows RE-BIND to the BI cut.** Re-verified at `24a7a764`: the
     export map still carries `./goo-blob` with **no `./blob`** and **no `./blob/config`** —
     **P9-J1** (the L17 `Blob` rename in the regen input) and **P9-J2** (L20 `/blob/config`)
     are STILL OPEN and still the LAST window; they must ride the BI export-reshape/B9 flatten,
     and their MIGRATION rows ride the B4e-successor table.
  2. **The RP-2 coupling**: L20 + GAP-L5 + RP-2 land TOGETHER or our JS-eager re-baseline
     (347.9 KiB gz vs ≤280) carries a THIRD tranche — and our Q14 perf-redemption mandate
     (budgets must-go-green-by-close, owner-ruled) makes that carry expensive. L20 ≈ −33 KiB
     eager.
  3. **P9-J3**: `/styles/fonts` MIGRATION row verify + the `/easing` 17th-subpath GAP-3
     verify-watch (both present at HEAD — verify they survive the flatten). **P9-J4**: the
     `--ring` B7 roster add (we pre-migrated fallback-first at W0-6 — un-rostered consumer).
  4. Our CI stays pinned to `tranche/BG` until the cut's master landing; the L17 rename
     consume + the full VERIFY-AT-CUT walk (L1 · L3 · L18 · F9.R1/R8 · L19-base ·
     W-AUR-IMAGE-SOURCE · A4 · F2.R1 paint-close `300a30fb`) all run at W7 against a REBUILT
     dist at a stamped HEAD.
- **DECLINE dispositions** (recorded at first producer response, never discovered at our close
  walk): P3/P5 → the demo interim BECOMES PERMANENT (recorded) · **P4/T-20 → ESCALATE TO THE
  OWNER** · P6 row-F → the FSM `emerging` state is already the sanctioned terminal.

---

## §5 — Dedup: discharged / exonerated / joined (rows you should NOT re-book)

| Row | Disposition |
|---|---|
| P3 A1/A2 F2.R1 (dark readability) | **DISCHARGED** — paint-closed at your `300a30fb`; VERIFY-AT-CUT only |
| L1 (WebKit aurora GLSL) · L4 · L18 (Select chevron) | **DISCHARGED** — producer-cured; verify-at-cut rows |
| L19 (aurora pointer door, base) | **CONSUMED** (S.W6-7) — the T-38 rider (§1.7) is the honesty/amplitude successor, not a re-ask |
| T-53 (the dark corner "artifact", 2026-07-11) | **NOT YOURS — exonerated by bisection**: the demo's dark-scheme cartoon caster (`--shadow-color: var(--foreground)` → 50%-α cream) is the root; `box-shadow: none` removes it, `backdrop-filter: none` does not. Cured demo-side; do not book. The LADDER bleed class (§1.5) is unaffected and stands |
| T-49 axis 3 fission register | **SHIPPED by you** (mercury-colony) — the demo arms it; only the `settled` seam + preset + rows A–E remain yours (§1.4) |
| The demo regex-autoplay deletion (P7 book) | **PRE-EXECUTED demo-side** (`1a8f06c`) — the declarative door ask stands for the picker's own playback |
| T-51 title step-down | **NO ASK** — consumed your existing ladder tokens (`--type-display-2`/`-1`), zero mint; cited as Q11a working as ruled |
| T-56 pastel ramp · T-57 dock-band reservation · T-59 rhythm regime | **DEMO-OWNED** — resolver cure / `--dock-h` floor / one-law clamp; no producer rows (T-57's optional `--dock-pill-h` rides §1.9c) |
| PRM-expand (dock never expands under PRM) | **ROUTED TO KEYFRAMES, not you** (the consolidation law): `springPlay`'s PRM snap arm emits subscribers-only, never `_onFrame` — STILL LIVE at kf 5.2.0/`e3d0ae5`; dispatched to the keyframes inbox @ their `ad65733`. Your dock's PRM-expand defect roots there — nothing for the BI corpus except the dependency note |
| Rows JOINING your own registers (one register, never two) | T-60 ↔ **UF-E10** (§1.1) · T-52/L13 ↔ **ss-17/ss-21 + D-DOCK** (§1.9) · P6/P1 ↔ **B5** (§1.3/§1.4/§1.7) · PKT-2/3/4 ↔ **B7/D-MOTION** (§2.6) |

---

## §Dispatch-stamp

**Stamped producer HEAD**: glass-ui **`24a7a764`** (`tranche/BG`; package.json 5.0.0 in-tree ·
npm 4.2.0 · no v5 tag — USER-GATED, T.W7 trigger NOT fired). Re-verified live at this HEAD at
dispatch: PKT-1 dist emission (`dist/styles/components.css` 150ms — fresh 2026-07-11 build) ·
GAP-ARM (`useAurora.ts` arm `:214` / non-immediate watch `:228`) · GAP-L2 (atoms.ts: no
`lightnessScheme`/`lBand`/`hueSpread`/`chromaVariance`) · T-60 (`runtime.ts:261` +
`useMetaballRenderer.ts:338` `revealBloom: true`; `viz-reveal.css:29-40`;
`tokens/scheme-motion.css:216`) · P1-R3 (`Slider.vue:470-474`) · `text-title` 700
(`semantic.css:132-139`) · exports still `./goo-blob`-only (P9-J1/J2 windows OPEN) ·
`fissionAmp` shipped (`types.ts:247/463`), no `settled` export, no HERO preset export.

**The dispatch record (the M1 ruling: the value.js-side record IS the gate; an ack is a bonus,
never waited on):**

- **glass-ui inbox (the maintainer relay)**:
  `../glass-ui/docs/tranches/BI/coordination/VALUEJS-T-COMMUNIQUE-2026-07-11.md` — path-scoped
  single-file commit (THIS commit) on `tranche/BG`, pushed fast-forward
  from `24a7a764` to `origin/tranche/BG` (no force; the producer's uncommitted work
  untouched). First file in the BI coordination dir — the BG coordination letters remain the
  definitions of record, superseded-by-reference here.
- **value.js-side record**: this letter + the `PROGRESS.md` event-log row + the Cross-repo
  dispatch-points table row.
