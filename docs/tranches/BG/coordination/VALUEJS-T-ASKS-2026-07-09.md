# VALUEJS-T-ASKS — 2026-07-09 (the value.js Tranche T packet series, relayed into the glass-ui BG/BH inbox)

> **Relay banner.** This is the value.js Tranche T producer packet series (`GLASSUI-T-ASKS.md`),
> relayed VERBATIM into the glass-ui BG/BH coordination inbox at the T ratification (value.js
> W0-1; owner Q7: dispatch immediately). It is **self-contained** — every ask carries its own
> `file:line` in the glass-ui tree; the value.js-internal lane/SYNTHESIS cites are provenance
> only. value.js touches ZERO glass-ui source files (the E-2 foreign-tree fence — this is a
> single docs-inbox note, the S-precedent relay pattern). The **§KF (PRM-expand) ask is NOT a
> glass-ui ask** — it is dispatched separately to the keyframes.js inbox (the consolidation law);
> it appears below only as a trimmed routing pointer. Successor to
> `VALUEJS-S-ASKS-2026-07-05.md` (+ its addendum) in this same inbox.

**To**: the glass-ui BG/BH inbox (`tranche/BG` live → the joint BG/BH **5.0.0**). **From**:
value.js Tranche T.
**Provenance**: `value.js docs/tranches/T/audit/SYNTHESIS.md §4` (the converged spec,
AS-AMENDED pass-2 `2a38c11`), transcribed verbatim; the routing/evidence census is
`audit/lanes/t-request-packets.md` (SHAPE + producer-root/joint/demo-only) on the forensics of
`t-glassui-current.md` (the 14-open-ask ground truth) + `t-glassui-forward.md` (the BG/BH
freeze gates) + the named finding lanes. The S letters this succeeds:
`S/letters/GLASSUI-S-ASKS.md` (L1–L18) + `-ADDENDUM-2026-07-05.md` (A1–A7 / L19 / L20).
**Verified glass-ui HEAD**: `d25ce9c1` (branch `tranche/BG`, npm **4.2.0**; **stamped at dispatch
2026-07-10** — the load-bearing cites re-verified live at this HEAD, see the `## Dispatch stamp`
section below. Authoring stamps: the fleet census cited `file:line` at **`19ddbd71`**; the
corpus-completion observation was **`6605e1dd`** 2026-07-09 — the producer moves daily,
~10-minute cadence on `tranche/BG`: HEAD advanced `f9c2d66a`→`d25ce9c1` DURING this dispatch,
proving the corollary).
**Status**: AUTHORED — **dispatch happens AT the T ratification (W0-1; the Q7 default:
immediately, not held for the BG frontier to quiet)**. [AMENDED-AT-HARDENING — h-packets
H-PKT-1: the precise freeze state] The WS12 `BH.B2.1-swap` export-regen has NOT run — `goo-blob`
is still in the export map (no `./blob`, no `/blob/config`) — so the W-1/W-2 freeze windows are
OPEN but they are the LAST window; NOTE the WS12 CSS-MINIFY + GATE-FAMILY-CONSOLIDATE waves DID
land (`ee382861`/`a900a71f`, 2026-07-05), so P2/PKT-1 and P8/A6 are claims about a POST-minify
dist — re-verified on a fresh `../glass-ui` build at dispatch (G-CUR-1). The W-3 behavior
packets have the widest window and the most value landing early — value.js sees them live via
the `file:` pin, which unblocks T's own consuming waves.

**HEAD-stamp corollary (binding on the dispatcher, the S-letter §16 discipline)**: the
dispatching agent **re-stamps the verified glass-ui HEAD at dispatch** and re-verifies every
load-bearing `file:line` below against the CURRENT tree (the S precedent: the aurora tree moved
under the letter once already — `glass-aurora/shaders/` → `aurora/constants/shaders/`).

**Letter discipline** (SYNTHESIS §4, verbatim): asks only — **T touches ZERO glass-ui files**
(the foreign-tree fence; E-2 speaks in packets); every item cites its evidence lane, which
carries `file:line` in the producer tree; three disposition classes kept distinct — **NEW** /
**RE-ASK-by-name** (the W-DESHADCN fold did NOT deliver — delivery ≠ disposition) /
**VERIFY-AT-CUT**. **Consolidation law (E-3)**: the letter reads as this handful of gestalt
packets, never 30 line items; PRM-expand routes to keyframes (§KF), never the glass-ui packet.

---

## The timing windows (t-glassui-forward §1 — the gates every packet must respect)

A packet that misses its gate becomes a post-5.0.0 minor — a second break event the owner's
one-migration edict forbids (`BH/PLAN.md §2-#4`).

| # | Gate | Freezes | The packets bound |
|---|---|---|---|
| **W-1** | the WS12 `BH.B2.1-swap` export-regen freeze (the regen has NOT run at authoring — verified via the export map, not the workstream label [AMENDED-AT-HARDENING]) | the published subpath/export SET | **P9-J1** (Blob rename in the regen input) · **P9-J2** (L20 `/blob/config`) · **P6's exported HERO preset** |
| **W-2** | B4e MIGRATION authoring freeze | the 203-row MIGRATION table + every rename/token-retire ROW | **P9-J3/J4** · any P3/P10 rung that RENAMES a token |
| **W-3** | the F-family behavior waves (rolling, pre-WS12) | src-level behavior — visible LIVE to value.js via the `file:` pin | **P1–P8, P10** (land early = T's consuming waves unblock sooner) |
| **W-4** | the joint 5.0.0 tag | everything (the npm `^4→^5` event) | the VERIFY-AT-CUT walk = value.js T.W7 (a REBUILT dist against a stamped HEAD) |

---

## The packets (SYNTHESIS §4, transcribed verbatim; evidence in t-request-packets §1 + the named lanes)

| # | Packet | Class · Window | Contents |
|---|---|---|---|
| **P1** | **AURORA BOOT + FIELD QUALITY** (the highest-leverage, worst-covered cluster — the A-addendum was never dispositioned) | NEW · W-3, LAND EARLY | GAP-ARM arm-replay (`useAurora.ts:228/262` — one honest `inst.update(getCfg())` after `arm()`; user-visible on prod) · the L2/A3 variance-atoms DOOR (`hueSpread` chroma-adaptive, cross-stop chroma variance, `lightnessScheme`/`lBand`, counterpoint option) **SIZED BY THE T-26 BRACKET** · pointer-door HONESTY on smooth fields (light = cursor-local luminance lean; burst reaches the domain-warp path; or medium-gated atom types — F-10's dead axes) · MOTION tempo scalar (drift+breath co-varying) · palette-ease (eased seed-replacement walk) · vividness/quietness atom (bless the achromatic ride-down) |
| **P2** | **MOTION** | NEW (B1-B3) + RE-ASK (B4=L9) · W-3 | **PKT-1 [P0]** the dist `components.css` `:root` re-declares `--default-transition-duration:150ms` inside `layer(components)`, clobbering every consumer `@theme` alias — alias the emission onto the house tokens at the root · PKT-2 the spring clock hole (press 0.16s ↔ snappy 0.4s; a ~0.3s-settle preset or bless snappy) · PKT-3 a compositor collapse/expand recipe · PKT-4=L9 skeleton shimmer seams (still unread) |
| **P3** | **THE GLASS LADDER** (one packet, several rungs) | NEW · W-3 (W-2 if any token renames) | the recessed **WELL** rung (`--glass-bg-well` + `.glass-well`; 6 hand-mints prove demand; **sizing spec: tone-step ∈ [6%, 10%] `--foreground` into `--card`, oklab, default 8%** [AMENDED-AT-HARDENING — h-refine-doctrine F-10]) · the `.input-bar`/**seated** field-chrome rung + cap seam + `--input-bar-font` seam (ASK-B/C/D) · P-3 chroma-guard note (tier alphas over full-chroma grounds) · A1/A2 F2.R1 — **VERIFY-AT-CUT [AMENDED-AT-HARDENING — h-packets H-PKT-2]: paint-closed at `300a30fb` (DARK-READABILITY-REPAIR DONE, two days before this letter's obs stamp); re-confirmed on a fresh 5.0.0 rebuild at dispatch** · the scroll-header **rest-floor + bottom-feather knobs** (card-scroll lane 4 rests at 0 with no mask — t-header F4 rows 1-3; **the knob speaks the Q9 EFFECT-bracket unit: accepted iff the `quiet`-rung rest composites inside 27–39% added card material** [F-9]) · tiers PUBLISH effective lightness (the ink-on-tier contract's producer stake) |
| **P4** | **TABS PILLING** (T-20) | NEW · W-3 | the anchor-arm block insets drop the double-counted `--bouncy-track-trim` addend (bare `anchor()`, both orientations/breakpoints/trim rungs); acceptance: indicator ≡ active-button box at every breakpoint × orientation × scheme × engine (incl. the JS fallback), **ε ≤ 0.5px per edge, both engines** [AMENDED-AT-HARDENING — h-refine-doctrine N-3] — mobile numbers supplied (t-mobile F-6) |
| **P5** | **LETTER-RAIL + RING CONTRACT** (S-3 upgraded to MANDATED by T-5) | NEW · W-3 | the vertical rail primitive (stadium hairline, slot-per-item, dock-trigger state ladder, an ACTIVE SEAT that yields to consumer indicator content — the exact seam SegmentedTabs lacked, cite `38d83e4`; admin/gold variant; PRM-clean; a TOUCH-size rung) · the ONE ring contract (**seal-rim leg Q12-CONDITIONAL** [AMENDED-AT-HARDENING — h-refine-console F-9: under Q12's default ABROGATE the seal has no rim; the contract's standing members are `--dock-ring` L13 + letter-rail] + `--dock-ring` L13 + letter-rail) · the WatercolorDot **solid-ring register** (the ghost-stroke mechanism at solid weight, `--watercolor-ring-*`, never hairline ≤48px — T-28's register law) |
| **P6** | **BLOB L5 ADDENDUM** (append to F9.R1 — NOT a re-ask of the shade work) | NEW-append + VERIFY · W-3 (HERO preset = W-1) | rows A–E: hero-scale mood-legibility floor (**expressed/convertible in the frame-diff-at-bead-box family so producer sizing and O-12 verification share units** [h-refine-doctrine N-4]) · curvature-bounded pseudopod · `settled` seam + park-only-from-settled · mood-gated satellite emergence · the containment update to the genesis contract (+ contact-shadow register now WANTED) · the single-WebGL2 collapse (drain `metaball.wgsl`) · the exported **HERO preset** (W-1!) · **row F [AMENDED-AT-HARDENING — M-14]: body-arrival pose (goo-scale emerge from the seat edge, smin-field grammar, PRM = static first frame) — OPTIONAL; the consumer's FSM `emerging` state is the sanctioned interim** · the F9.R1 `lightnessFloor` knob **sized by the consumer's D8 ink-floor bracket [0.12, 0.20] OKLab L (default 0.15)** [M-9] |
| **P7** | **THE COMPONENT BATCH, RE-ASKED BY NAME** (fold-claimed to W-DESHADCN, verified absent) | RE-ASK · W-3 | L6 slider tokens (+`--slider-track-checker`) · **L8 clampLabel — 5th booking, ESCALATE** · L11 dropdown-menu glass tokens · L16 backdrop-prefix policy · L10 verify · L7 **EasingPicker v2** carried + net-new: container-query stage law (square-fit canvas), internal material tokens/`chrome` prop, `preset?` payload field, declarative `autoplay`/`playing` door, curve-glyph preset menu, travel-dot rest + PRM at source · **the EasingPicker SelectTrigger accessible-name contract (CHRONIC R→S→T — h-books-folds SF-1; folded pre-dispatch)** · L13 dock residuals **+ arrive-expanded [AMENDED-AT-HARDENING — M-14: named by the adopted beat sheet's own ownership map, previously dropped]: `start-collapsed=false` mounts AT the pill pose with zero mount morph, OR a `morph-settled` event/attr the consumer can gate a reveal on — T-1's B1 rides it (consumer interim: a `transitionend` veil, recorded as booked-interim)** · L14 ConfiguratorRow · **L15 + relay-item-8 (HELD-below-bar row — h-packets H-PKT-4)** · the Select **description-lane survival contract** (T-17 rides it; Q5-outcome-independent) · the base-Tabs **`underline` variant** (legacy-sweep F6, AMENDED-AT-PASS-2: the `.underline-tabs` MARKER `style.css:476-484` STAYS until this ships or PaletteDialog migrates `<Tabs>`→`<SegmentedTabs>`; retire-check at W7 beside F7; **the shipped register is `TabsIndicator.vue`, a pill-plate — named so the variant ask sizes the right mechanism** [HES-2]) |
| **P8** | **BUILD/DIST** | NEW · W-3 | A6 the minifier drops unprefixed `backdrop-filter:none` (the demo MARKER retires the day it's fixed) · **CC-1** the registered-@property-inside-`color-mix()` collapse on bare `.glass-wash` (the producer's own material.css names the hazard; fix at the compositing path) · the dist-rebuild discipline note (G-CUR-1) |
| **P9** | **THE 5.0.0-CUT PAYLOAD** | VERIFY/NEW · **W-1/W-2 — in the letter FIRST** | J1 Blob rename in the export-regen input (verify) · **J2 L20 `/blob/config`** (the RP-2 anchor — must be named before B2.1-swap freezes) · J3 `/styles/fonts` MIGRATION row verify (+ its twin: the `/easing` 17th-subpath GAP-3 verify-watch, deferred-census A10 — AMENDED-AT-PASS-2) · J4 the `--ring` B7 roster add (value.js is an UN-ROSTERED consumer; the demo pre-migrates fallback-first at W0-6) |
| **P10** | **TYPE STATIONS** | NEW · W-3 (W-2 if token) | the SelectTrigger size ladder +1 station (or token-indirect `--select-trigger-font-size`) · display/heading **weight tokenization** (`--type-weight-display/-heading` — the demo pins 400 at `:root`, the same shape as `--font-stack-display`) — verify-first against BG/BH before authoring (the rung may exist). **[RULED-AT-RATIFICATION 2026-07-09 — Q11a cite (cascade 4): the owner ruled "1.5x bigger, using the steps defined by glass-ui's typography system" — YOUR typography ladder is the sizing AUTHORITY for every consumer landing (the growth = the nearest ladder move to ×1.5 = TWO token steps, ×φ); the consumer mints NO sizes, ever — so a missing rung/station is exactly THIS ask, now owner-backed]** |

### §KF — the keyframes note (a SEPARATE dispatch to the keyframes.js inbox — the consolidation law: never folded into the glass-ui packet)

**ROUTING POINTER (not a glass-ui ask).** The single KF-routed item — **PRM-expand** (the
keyframes `springPlay` PRM arm emits only to `.subscribe()` subscribers, never the `.play(onFrame)`
`_onFrame` channel) — was dispatched SEPARATELY to the keyframes.js inbox
(`../keyframes.js/docs/tranches/T/VALUEJS-KF-PRM-EXPAND-2026-07-09.md`) per the consolidation law.
It is named here ONLY so the producer sees the full T routing map; it requires no glass-ui action.
(Context: glass-ui's own dock PRM-expand defect roots in this keyframes seam.)

---

## The hard-seam map (books never gates — NO T wave is blocked on a packet; every seam is an EXPECTED-RED row or a booked swap, all walked at T.W7)

- **PKT-1 (P2)** → the O-16 computed-cascade census R1 row (bare-utility default) stays
  **EXPECTED-RED carrying this packet's cite** until the fix lands; goes live the day it does.
  NO demo cascade arms-race in the interim.
- **PKT-3 (P2)** → T.W5 Tranche B (the R6/R7 compositor collapses) is left UNTOUCHED — never
  retimed on layout properties — until the recipe lands (PI-5).
- **P1 GAP-ARM** → the demo half (W2-1 hydration-first) is **NOT producer-gated** and cures the
  visible pink alone; the producer replay is re-verified at W7. **P1 pointer honesty (F-10)** →
  the W2-5 pointer retune is DEFERRED until it lands.
- **P3 rungs** → W3-1 (`--well-bg`), W3-3 (search seat), W3-4 (feather/rest-floor knobs) land
  demo interims with **booked swaps** (fire at W7, or earlier via the file:-pin).
- **P5 letter-rail** → W4-4 lands the interim seal-recipe ring; booked swap.
- **P6 `settled` seam / engine pose** → W4-5's park stays wall-clock, W2-4's emerge rides the
  FSM's existing `emerging` state; both booked swaps. The HERO preset is W-1-bound.
- **P7 autoplay door** → W6-3's regex-drive is deleted the day the declarative door lands;
  the `.underline-tabs` MARKER retire-check runs at W7.
- **P8 A6/CC-1** → the demo `backdrop-filter:none` MARKER retires the day A6 is fixed; the two
  bare `.glass-wash` sites paint their rung the day CC-1 is fixed.
- **P4 tabs** → O-8 (indicator ≡ active-button box) goes live at W7, post-adopt.

**Q16 candidates (flagged, producer's call — not resolved here)**: `EmptyState` + the picker
action controls as glass-ui primitives; until answered, `EmptyState` lifts to a shared demo
atom and the action controls stay picker exports via the hardened barrel. [AMENDED-AT-HARDENING
— h-packets H-PKT-3: two more Q16-class riders restored from t-misc-elements F2/F3] **+ the
hue-carrying primary tier** (T-16 — "prominence = tint, not size" is glass-ui's own comment;
the demo must not costume the button locally) **+ the dock status-lamp primitive** (T-9 — the
lamp is candidate dock vocabulary; if glass-ui grows one, the demo consumes it at the root).

## Verify-at-cut rows (recorded, not re-booked — walked at value.js T.W7)

L1 (WebKit aurora GLSL, fixed `d03579a1`) · L3 (zombie rAF → `useRAFLoop`, `b01d0556`) · L18
(Select chevron, `d03579a1`) · F9.R1 (`uSatColor[]` shade set, `5df908ae`) / F9.R8 (affect/
pointer/SDF, `e0320565`) · L19-base (aurora pointer door, consumed S.W6-7) ·
W-AUR-IMAGE-SOURCE · A4-consumed.

**The demo-only register** (primitives EXIST — cited, never re-asked): T-14 liquid tokens ship
· T-28's ghost-stroke mechanism ships · T-17 = Select composition · T-23's `veil-surface`
register ships (the knobs, not the register, are P3) · T-20's `layout:"full"` is orthogonal to
the D1 defect (the packet stands) · T-29 is DEMO-owned (`Dock.vue` is a value.js file; NOT a
portal ask).

---

## Dispatch protocol (binding on the W0-1 dispatcher)

1. **Dispatch AT ratification, not before** (E-6: development-only until the `T.md §12` gate
   rules; then W0-1 fires immediately per Q7). **P9 is named FIRST** in the transmitted letter.
2. **Re-stamp**: replace `<RE-STAMP AT DISPATCH>` with the verified `tranche/BG` HEAD;
   re-verify P1's `useAurora.ts` cites, PKT-1's dist emission, and P3's F2.R1 paint state
   against the CURRENT tree; record the stamp in a `## Dispatch stamp` section (the S-letter
   shape).
3. **Dist-rebuild discipline (G-CUR-1)**: the consumed dist is a gitignored LOCAL build with no
   content-addressed fence — any claim about "what ships" is made against a fresh
   `cd ../glass-ui && npm run build`, never the version label.
4. **Delivery ≠ disposition**: a producer reply that folds an ask onto another workstream is
   not a discharge — P7's rows stay open until source-verified landed at HEAD (that is how L8
   reached its 5th booking).
5. **Record the dispatch** in `PROGRESS.md` (event-log row + producer-inbox cite = the
   value.js-side `## Dispatch stamp` + PROGRESS row — the RULED reading, h-exec-w0 M1), per the
   W0-1 gate: dispatch record + acked-or-recorded.
6. **Re-cut Q-sensitive rows to the RATIFIED outcomes before transmitting** [AMENDED-AT-HARDENING
   — h-refine-console F-9]: P5's ring-contract membership per Q12 (default: `--dock-ring` +
   letter-rail; the seal-rim leg only if the fitted arm ruled); one line noting the P7
   description-lane contract is Q5-outcome-independent (the producer never waits on Q5).
7. **DECLINE dispositions (recorded at first producer response, never discovered at the W9 walk)**
   [AMENDED-AT-HARDENING — h-gaps G-5]: P3/P5 → the demo interim BECOMES PERMANENT (recorded);
   **P4/T-20 → ESCALATE TO THE OWNER** (a two-repo taste conflict is the owner's call — T-20 has
   no demo interim and E-2 forbids a fork); P6 row-F → the FSM `emerging` state is already the
   sanctioned terminal (no loss).

---

## Dispatch stamp (W0-1 — 2026-07-10; the S-letter §16 shape)

**Stamped HEAD**: glass-ui `d25ce9c1` (branch `tranche/BG`, npm **4.2.0**) · keyframes.js
`e3d0ae5` (branch `tranche-u-dev`, npm **5.2.0**). The producer moved DURING dispatch
(`f9c2d66a`→`d25ce9c1`, ~10-min cadence) — the HEAD-stamp corollary held in real time; the
cites below are re-verified at `d25ce9c1`.

**Re-verified load-bearing cites (protocol step 2, against the CURRENT tree):**

- **P1 GAP-ARM — STILL LIVE.** `useAurora.ts` (`src/components/custom/aurora/composables/`):
  `armRuntime()` (`:210`) calls `inst.arm()` (`:214`), then wires `stopWatch = watch(getCfg,
  (next) => inst?.update(next), { deep: true })` at **`:228` — WITHOUT `immediate:true`**;
  deferred construction is `inst = createAurora(canvas, getCfg(), …)` at **`:262`**. No honest
  `inst.update(getCfg())` fires between construct (`:262`) and arm (`:214`), so a config change
  in that window is not replayed onto the armed instance. The `:228/:262` cite in P1 stands
  (arm now explicitly at `:214`); the ask is NOT discharged.
- **PKT-1 (P2) — dist-level, G-CUR-1.** `grep default-transition-duration src/**/*.css` = ZERO
  hits at `d25ce9c1`; the `--default-transition-duration:150ms` re-declaration is a BUILD
  emission (dist `components.css` under `layer(components)`), not a source token — consistent
  with the letter's "claims about a POST-minify dist." Verified against the dist per G-CUR-1 (a
  fresh `cd ../glass-ui && npm run build`, never the version label) at the W7 verify-at-cut walk;
  the ask stands as a dist claim, O-16 R1 carries it EXPECTED-RED.
- **P3 A1/A2 F2.R1 — DISCHARGED (VERIFY-AT-CUT holds).** Paint-closed at glass-ui `300a30fb`
  ("BG paint (BG.W-DARK-READABILITY-REPAIR): dual-engine PASS Chrome+Safari both modes → DONE");
  re-confirm on a fresh 5.0.0 rebuild at dispatch/W7 per the letter.
- **P9 W-1/W-2 freeze windows — OPEN (the LAST window).** The export map at `d25ce9c1` still
  carries `./goo-blob`, with **NO `./blob`** and **NO `./blob/config`** — the WS12
  `BH.B2.1-swap` export-regen has NOT run. P9-J1 (Blob rename in the regen input) and P9-J2 (L20
  `/blob/config`) must land before B2.1-swap freezes. `./easing` + `./styles/fonts` +
  `./configurator` present (P9-J3 twin + P10 rungs verify against BG/BH at authoring).
- **§KF PRM-expand — STILL LIVE, line-refreshed (NOT discharged).** See the §KF row: at
  keyframes 5.2.0 the `springPlay` PRM branch (`managed-play.ts:48`) emits via
  `_snapSettled().emit()` to the `.subscribe()` `subscribers` set ONLY, never the `.play(onFrame)`
  `_onFrame` channel; the non-PRM settled branch (`managed-play.ts:53-55`) emits `onFrame`
  directly — the PRM branch's asymmetric omission is the defect. Routed SEPARATELY (below).

**Q-sensitive rows confirmed at the RATIFIED outcomes (protocol step 6, RATIFICATION-2026-07-09
§1):** P5 ring-contract = **`--dock-ring` L13 + letter-rail**, the seal-rim leg DEAD under Q12's
default ABROGATE (already cut in-letter) · P7 Select description-lane contract is
**Q5-outcome-independent** (the producer never waits on Q5) · P10 size-station cites **Q11a** (the
producer typography ladder is the sizing AUTHORITY; ×φ = two token steps; the consumer mints no
sizes) · Q5's chip arm is DEAD for T-10 (P-row grammar unchanged; survives only where T-17 earns
it). No re-cut owed — the letter was authored post-fold and already carries these.

**The dispatch record (producer-facing).** THIS FILE is the glass-ui-inbox landing of the
value.js Tranche T packet series — the single-file, path-scoped relay committed on `tranche/BG`.
The §KF ask is trimmed to a routing pointer above (the consolidation law). The keyframes half
lands separately at `../keyframes.js/docs/tranches/T/VALUEJS-KF-PRM-EXPAND-2026-07-09.md` on
`tranche-u-dev`. The value.js-side dispatch record (the letter's own `## Dispatch stamp` +
`PROGRESS.md` event row) is the W0-1 gate artefact; an ack here is welcomed but never waited on.
No response is required to any VERIFY-AT-CUT row — those are walked by value.js at its T.W7 adopt
against a stamped 5.0.0 rebuild.
