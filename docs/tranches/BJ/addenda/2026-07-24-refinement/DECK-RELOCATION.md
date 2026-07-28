# DECK-RELOCATION — the banked adjudications (owner sitting items 8-12)

Run `wf_8ea3a20f-669` (`wf/deck-relocation-sweep.wf.js`), CLOSED 7/7 seats 0 errors, 2026-07-28.
Authority: EXEC-STATE §THE OWNER SITTING items 8-12. Two Fable adjudications over five Opus
evidence seats (slides/atlas/glass-ui deck inventories · concentration/zero-residue censuses).

**OWNER-GLANCE ROWS (need a word):** fourier-field(+fourier-math) → slides relocation (facts favor
it, item 11 current runs against it) · tags-input (demote struck yet zero consumers anywhere) ·
number-field (W-FIELD lane assumes it ships; zero consumers ex-muster).

---

## PART I · THE DECK ADJUDICATION

modelId: claude-fable-5

# DECK ADJUDICATION — the three-way split, the shared-substrate ruling, the widened #40 amendment

Authority: EXEC-STATE §THE OWNER SITTING items 11–12 (`docs/tranches/BJ/addenda/2026-07-24-refinement/EXEC-STATE.md:450-457`). Roster seat: row 40 W-PAGER (`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:135`). All contested files re-read at this seat; corrections to the inventorying seats are recorded in §0 before anything downstream relies on them.

---

## §0 · INCREDULITY FINDINGS — where the seats were wrong, verified on disk

**0.1 — The spring "drift" is misdiagnosed by D1; the true defect is the clock's ownership, not a stale comment.** D1 claimed `deck.css:271-278`'s "sub-percent identical" assertion was stale and the live deck rides three different springs. Wrong in tense. The installed truth: slides pins glass-ui **3.13.0** (`/Users/mkbabb/Programming/slides/package.json:30`), and 3.13.0's shipped preset table reads `smooth: response .5, dampingFraction .86` (verbatim in `/Users/mkbabb/Programming/slides/node_modules/@mkbabb/glass-ui/dist/springPresets--YdWTHtm.js` — `name: "smooth", response: .5, dampingFraction: .86`). So today, live: the CSS turn rides 0.5/ζ0.86 and the JS count-up rides 0.5/ζ0.85 (`slides/src/deck/deckSpring.ts:28`) — genuinely sub-percent, exactly as the comment claims. The drift **materializes at the 8.0.0 adopt**, because HEAD retuned `smooth` to 0.58/ζ0.80 (`glass-ui/src/composables/motion/spring/springPresets.ts:75-77`) — and the token contract explicitly licenses that: "the names MUST stay stable across retunes — only the `(response, ζ)` pair and the emitted curves change" (installed `dist/composables/motion/springPresets.d.ts:17-18`). The CSS half tracks the retune by construction; the JS literal does not. **Cure (seated in the amendment): the substrate owns ONE clock authority and the JS easing reads the governed preset, never a literal** — the same defect class as #40's existing "rogue ζ0.64 → governed preset" clause (`TERMINAL-ROSTER.md:135`).

**0.2 — D3's EXEMPLARS line cites for LAWs 13/14 are swapped.** LAW 13 ANCHOR HONESTY is `EXEMPLARS-CODEX.md:169`; LAW 14 THE HOUSING CARRIES THE MATERIAL is `:171`. D3 cited them inverted. All other law cites verified as given (LAW 1 `:145`, LAW 2 `:147`, LAW 3 `:149`, LAW 7 `:157`, LAW 9 `:161`, LAW 11 `:165`, LAW 12 `:167`; A6 `:61`, E4 `:101`, I1 `:128`, I4b `:132`, routed #29 `:188`, routed #40 `:195`).

**0.3 — D3's `useCarousel.ts` cites drifted ~4 lines.** `CAROUSEL_WEIGHTY_DURATION` is `:11`; the embla instantiation is `:19-23` (verified). The substance stands.

**0.4 — The colour-mode boot is NOT a duplicate (D1 deferred the byte-compare; I ran it).** glass-ui's `darkModeSyncScript` resolves a **missing key to the OS preference** (`glass-ui/src/composables/dark/darkModeSyncScript.ts:66-70` — `(m===null||m==="auto") && matchMedia(...)`). Slides resolves a missing key to **deterministic light** ("a briefing shouldn't flip with the projector's OS theme," `slides/src/main.ts:7-11,54`), adds `?light`/`?dark` capture forcing (`:42-45`), and **normalizes** the stored value to a concrete literal (`:36-39`). Three policy deltas over identical stamp mechanics (same key, same class, same `colorScheme` write). Verdict: **extend, don't lift** — `darkModeSyncScript` gains `{ defaultDark?: boolean | "os", queryOverride?: boolean, normalize?: boolean }`; slides' block collapses to a config call at adopt.

**0.5 — The `pagerWindow` "export gap" is a declared fence, not an accident.** D1 flagged that glass-ui doesn't re-export the oracle (`glass-ui/src/components/pager-dots/index.ts:1-2`). True — but deliberately: "the deck consumes it THROUGH PagerDots directly … so there is NO second copy. The deck-wave binding fence: the boundary verdict rides the pure math with the dots, never a deck engine" (`pagerWindow.ts:1-7`). The slides copy (`slides/src/deck/pagerWindow.ts`) is algorithm-identical (diffed: doc comments and a param name only) because slides predates the lift. The fence dissolves under this amendment: when the oracle graduates from indicator-window to **member**-window (§2 U5), it exports from the substrate, and the fence comment is retruthed.

**0.6 — A three-way `[data-state]` vocabulary schism no seat named.** Slides: `"active" | "prev" | "next"` (`slides/src/deck/DeckView.vue:91-92`, `DeckSlide.vue:16`). Atlas detent: `"active" | "parked"` (`atlas/src/stage/useDeckDetent.ts:~233`). glass-ui's own README usage example and demo story: `"active" | "inactive"` (`glass-ui/src/components/deck/README.md:48`, `demo/stories/motion/deck.vue:171-176`). Three vocabularies for one contract, in one family. The amendment mints ONE (§3.2).

**0.7 — D3's embla delete silently kills `loop`, and no seat named the loss.** Native scroll-snap has no circular scrolling; the deck core clamps and never wraps (`glass-ui/src/components/deck/composables/useDeck.ts:42`; slides likewise, D1's "wrap — ABSENT" row confirmed at `slides/src/deck/useDeck.ts:25`). Today loop exists only inside embla, with the wrap-seam handled at `glass-ui/src/components/carousel/arrival.ts:25-27`. Deleting embla (D3's D1 row) is legal — "consolidation into an apotheosis stays legal; deletion does not" (`TERMINAL-ROSTER.md:113`) — but it must be a **named clean break**: loop dies with it (no-backwards-compat + consumer-updates ruling), and the words repo rides the relay (`ImageCarousel.vue:89-90`, `^3.0.0` pin, `TERMINAL-ROSTER.md:41` S-11) with a loop-usage grep as the first act of its addendum. Seated in §3.6.

**0.8 — Atlas's detent seam and LAW 9 are in genuine tension, and the resolution is an optional channel, not a forced opening.** `useDeckDetent`'s contract is explicit: "CSS owns geometry; Glass owns the settled index, and **no continuous scroll scalar crosses this seam**" (`atlas/src/stage/useDeckDetent.ts:~100-103`). LAW 9 + I4b demand a continuous position for the expansion/arrival projection. Resolution: the substrate core publishes `position`/`velocity` as an **optional producer-fed channel** — the detent driver remains a legal discrete producer (atlas's seam stays closed unless atlas opts in); the member-projection arm simply doesn't run without a producer. glass-ui offers; consumers choose.

---

## §1 · THE THREE-WAY SPLIT TABLE

Verdict key: **G** = migrates INTO glass-ui (owner item 11) · **A** = styling migrates to atlas (owner item 11) · **S** = stays in slides · **DEL** = deleted at the slides 8.0.0 adopt (already shipped in glass-ui). Where a facility splits, both halves are rowed. Every DEL/adopt executes in the slides tranche via the marked addendum (#76, `TERMINAL-ROSTER.md:171` — "the slides 3.13.0→8.0.0 adopt hinge"; publish, not commit, closes the row).

| # | Facility | slides file:line | Verdict | Grounds |
|---|---|---|---|---|
| 1 | Headless state core `useDeck` | `src/deck/useDeck.ts:21-47` | **DEL** | Strict subset of shipped `glass-ui/src/components/deck/composables/useDeck.ts:41-71` (verified line-by-line; glass adds `liveMessage` `:46-50`). Slides' own header predicted the lift (`useDeck.ts:4-8`) |
| 2 | Key contract `deckKeys` | `src/deck/deckKeys.ts:21,35-75` | **DEL** | `CONTROL_SELECTOR` byte-identical to `glass-ui/src/components/deck/constants.ts:6-7`; handler shipped at `useDeckKeyboard.ts:36-75` + the binding composable slides hand-rolls (`useDeckNav.ts:62,96,103`) |
| 3 | `pagerWindow` oracle | `src/deck/pagerWindow.ts:15-25` | **DEL** | Algorithm-identical to `glass-ui/src/components/pager-dots/pagerWindow.ts:18-35` (diffed §0.5); consumed through PagerDots until the member-window graduation exports it from the substrate |
| 4 | `DeckPager` dot register | `src/deck/DeckPager.vue:16-86` | **DEL** | Superseded by `<PagerDots pattern="group">` — the deck is its named consumer #2 (`glass-ui/src/components/deck/README.md:21-27`, `PagerDots.vue:8-11`) |
| 5 | `v-reveal` directive | `src/deck/reveal.ts:10-15` | **DEL** | Functionally identical to `glass-ui/src/composables/motion/reveal/vReveal.ts:20-28` (same attr, same `--d`, same mounted/updated — verified) |
| 6 | Hand-rolled live region text | `DeckView.vue:31-35` | **DEL** | `liveMessage` shipped (`useDeck.ts:46-50`); the DOM host moves to the substrate rendering half (§2) |
| 7 | `deckSpring` local clock | `src/deck/deckSpring.ts:28-61` | **DEL** | §0.1 — the substrate owns the clock; JS easing reads the governed preset via `springPreset("smooth")`, never a literal |
| 8 | Direction/state contract `stateFor` | `DeckView.vue:91-92` | **G** | The `[data-state]` triple is the whole CSS transition contract; unshipped (glass `/deck` is renderless, `deck/index.ts:16-19`). Minted as THE one vocabulary (§0.6, §3.2) |
| 9 | `DeckSlide` host | `src/deck/DeckSlide.vue:12-35` | **G** | Attribute fall-through host, zero DOM reach; self-declared "local consumer #1 of the eventual glass-ui `<DeckSlide>`" (`:5-11`) |
| 10 | Per-slide context | `src/deck/slideContext.ts:7-24` | **G** | provide/inject `{index,total,active}` with out-of-deck fallback; zero glass-ui analogue (grep confirmed by D1, spot-checked) |
| 11 | Hash sync | `DeckView.vue:22-26,28-36,43-47` | **G** | Opt-in `useDeckHashSync` composable (initial-from-hash, replaceState write, hashchange listen; the no-loop property documented). Inside the old README fence — fence amended (§3.7) |
| 12 | Manifest contract `SlideEntry`/`DeckContent` | `src/deck/types.ts:32-56` | **G** (types) / **S** (`DeckMeta.protected`/`softGated` `:17-25`) | The dark-flag/aria-in-manifest reorder-safety ruling is engine-grade; the gating dimension is app policy |
| 13 | Wrap | absent (`useDeck.ts:25` clamps) | **named decision** | No wrap anywhere; loop dies with embla (§0.7). The substrate is clamped, period — wrap is refused, not deferred |
| 14 | `--turn-*` tuning contract | `src/styles/deck.css:289-355` | **G** | Ten content-free axes, documented as a consumer override surface (verified in full); the strongest single candidate — glass-ui ships no paged turn |
| 15 | Composite turn + visibility join | `deck.css:605-656` | **G** | ONE composite transform on the spring clock; the `visibility 0s linear var(--turn-dur)` hold + the entering-slide delay-0 override (verified `:633-636`, `:648-655`) is hard-won and content-free |
| 16 | Cast gutter + dip scrim mechanism | `deck.css:665-701` | **G** mechanism / **A** dark-arm hue values (`:927-928` cream flip) | Direction-free symmetric dual-edge cast; the alias-freeze trap doc (`:345-360`) travels with it |
| 17 | Mobile flat-push arm | `deck.css:820-857` | **G** | iOS WebKit cannot composite `preserve-3d` on an `overflow-y:auto` scroll container (blank-flash, frame-sampled — verified `:823-838`). Omitting this arm reproduces the bug; it ships WITH the turn, non-optional |
| 18 | PRM arm | `deck.css:1128-1149` | **G** | Ships with the turn |
| 19 | 16:9 letterboxed stage | `deck.css:419-434` | **G** | fixed-inset+margin:auto aspect stage + `container-type`; glass-ui has no stage container (D1's grep, spot-confirmed) |
| 20 | `--cqx` authoring anchor | `deck.css:436-443` | **G** | The resolution-independence-with-pixel-fidelity invariant the export path rides (verified) |
| 21 | Slide stack + visibility base | `deck.css:577-619` | **G** structure / **A** padding+shadow values (`:614`, `:640`) | grid-area stack, opacity/visibility/pointer-events base contract |
| 22 | One crossfading ground | `deck.css:533-574` | **G** pattern / **A** ink radials (`:570-573`) | The per-slide-grounds collision frame ruling (`:538-544`) is engine knowledge |
| 23 | Mobile reflow arm + landscape-phone OR | `deck.css:747-819,858-862` | **G** | The `(max-aspect-ratio: 1/1), (max-height: 480px)` lesson travels with the stage |
| 24 | Safe-area tokens | `deck.css:760-762,807-814` | **G** | Canonical names, padding-inside ruling |
| 25 | Dock clearance token | `deck.css:505,751` | **G** token / **A** sized values | The expanded-dock-sized, never-state-reactive ruling (`:501-503`) |
| 26 | Z-stratum register | `deck.css:382-390` | **G** | As the documented chrome contract |
| 27 | Portrait MIN-bump type technique | `deck.css:764-791` | **G** technique doc / **A** values | Bump the clamp MIN, never the cqi mid-term — export-frame-preserving |
| 28 | Paper grain | `deck.css:884-893` | **DEL** | The retired primary; glass-ui `paper.css` demoted exactly this feTurbulence + ships `PaperBackdrop` (D1's cite, uncontested) |
| 29 | Responsive `fit` rung | `DeckPager.vue:31-41` (JS) + `:104-108` (ladder) | **G** | The one residual PagerDots lacks: `windowFit="auto"` resolved from a CSS token via the one-way `getComputedStyle` read (the circularity ruling `:31-33` travels). Verified |
| 30 | Root progress bar | `DeckView.vue:~121` + `deck.css:526-530` | **G** mechanism / **A** NCSU fill/glow values | Nav-driven fixed rail, 1-based `--p` percentage contract (the `*100%` bug doc), safe-area offset |
| 31 | `.sr-only` local recipe | `deck.css:1250-1253` | **S** housekeeping | Tailwind ships it; slides drops the redeclaration at adopt (D1's row, uncontested) |
| 32 | Dock chrome composition | `DeckView.vue:146-198,216-277` | **A** | Chrome over a library dock; the two interim arms already retired into glass-ui 3.13.0 (`density.css:88-94`, `useDockClickIntegrity`) — record rows only |
| 33 | Swipe driver | `useDeckNav.ts:64-70` | **G** | 44px threshold + `|dx|>|dy|` dominance (verified). Needed by the transform-turn register (which never scrolls); the scroll-snap register gets swipe free. Fence amended (§3.7) |
| 34 | Edge hover zones | `src/deck/useEdgeZones.ts:3,8-37` | **G** | Content-free fine-pointer edge arming (verified); zero glass-ui analogue. Fence amended |
| 35 | Edge-arrow reveal CSS | `DeckView.vue:369-401` | **G** mechanism / **S** Button composition | The fixed-px-because-outside-cqi-scope note travels |
| 36 | Selection discipline | `DeckView.vue:210-214` | **G** | One-line ruling: chrome opts out of select, prose stays selectable, click never navigates |
| 37 | `captureMode` one-reader | `src/deck/captureMode.ts:13-17` | **G** | Verified. The engine must be capturable — the settle contract (rows 38, 40-43) is engine surface, so its mode reader is too. Fence amended |
| 38 | Mode dispatch (print/export/freeze/live) | `useDeckNav.ts:72-100` | **G** | The settle machine: body-class + settle per mode, full cleanup (verified) |
| 39 | Deck resolve machine + unlock memo + gate/HMAC | `DeckPage.vue:21-54`, `useDeckUnlock.ts`, `functions/_middleware.ts` | **S** | Access-key orchestration; self-declared "not a deck-engine primitive" |
| 40 | Export frame forcing | `deck.css:865-881` | **G** | Rides `--cqx` |
| 41 | Still settling (export/freeze split) | `deck.css:1195-1226` | **G** | The freeze-settles-without-frame-forcing distinction is real engine surface |
| 42 | Print stacking + per-slide re-grounding | `deck.css:1175-1193` | **G** | The N-stacked-pages ground ruling |
| 43 | `@media print` block (719px underrun, `#app` collapse) | `deck.css:1228-1247,1257-1260` | **G** | The class of fix every consumer rediscovers |
| 44 | `useCountup` | `src/deck/useCountup.ts:24-69` | **S**, retiring onto `AnimatedDigit`/`useAnimatedNumber` at adopt | Self-ruled editorial (`:6-7`); the one live-DOM reach — its settle hook joins the capture contract |
| 45 | Reveal stylesheet | `deck.css:1107-1120` | **G** | glass-ui's `vReveal` deliberately leaves the CSS to the consumer (`vReveal.ts:14-17`, verified); the active-gated stagger + the `both`-fill lesson ship as the substrate's optional reveal sheet, the `0.09s` literal re-pointed at `--motion-stagger-default` (80ms canon, `useStagger.ts:27-36`, verified) |
| 46 | Colour-mode boot | `src/main.ts:29-55` | **G** as `darkModeSyncScript` options / **S** policy choice | §0.4 — extend, don't lift |
| 47 | Registry/discovery, CLI, PPTX + shoot tooling, xray content, gallery | `src/decks/registry.ts`, `scripts/*`, `SlideXray.vue`, `HomeView.vue` | **S** (gallery styling **A**) | Build-tool-shaped or org content; no overview/presenter/notes mode exists anywhere — D1's plain statement stands |
| 48 | Deck identity tokens + `deck-theme.css` | `deck.css:22-120,1042-1102,1363-1453`; all of `deck-theme.css` | **A** | Atlas is the pre-declared landing zone: `recipes.css:1-2` already mirrors `deck-theme.css` §2-4; the new overlay sheet `src/design/overlays/deck.css` targets the substrate's data-attrs (D2's receive plan adopted, incl. the load-bearing import order and the `@layer atlas` re-skin guarantee) |
| 49 | `light-dark()` inset-shadow trap | `deck.css:101-111,916-919` | **G** as a gate candidate | A standing lesson held as a comment in a consumer; routed to BAND-GATES as a lintable invariant |
| 50 | Dialog close-X hide hack | `deck.css:1170` | **G** gap, routed to **#38 W-DIALOG** | The real fix is `DialogContent showClose` — not a deck facility |
| 51 | CM font corpus | slides `public/fonts/cm/` | **A** (deferred receive already declared at `atlas/src/design/fonts/fonts.css:16-20`) | D2's row adopted |

**Atlas prior art (owner item 11's third leg) — dispositions:** `useStageDeck` (`atlas/src/stage/useStageDeck.ts:22-61`, verified: adjacent-step arbiter over `useDeck`, settle-gated) — the **pattern** (an in-flight/settle gate + adjacent-step conversion) is absorbed into the substrate as an optional navigation policy; atlas's published `./stage` (`atlas/package.json:76-79`) is a consumer surface and is NOT broken — any convergence executes in atlas's tranche per the consumer-updates ruling. `useDeckDetent` (`:~104-244`) is the **already-built LAW 11 inertial travel arm**: native `scrollsnapchange` + one shared IO fallback + `useDeck` as settled-index authority — E4 ratifies exactly this shape ("native mandatory snap gives free in both engines," `EXEMPLARS-CODEX.md:101`). The substrate's scroll-snap register mirrors its mechanics; its `data-deck`/`data-slide` attr seam informs the substrate's attrs; its zero-consumer/zero-CSS status in atlas (D2's grep) makes it the natural first skin target for the atlas deck overlay. The "detent" name does NOT travel — atlas already runs three unrelated detent registers (D2's collision row) and the substrate must not mint a fourth.

---

## §2 · THE SHARED-SUBSTRATE RULING MATERIAL — deck + carousel, one windowed-sequence engine

Owner item 12 (`EXEC-STATE.md:455-457`): carousel STAYS and shares the deck's substrate — "one windowed-sequence motion engine under both." The owner's phrasing seats the substrate at the **deck**: `./deck` (PUBLISH, `subpath-policy.mjs:76`) is the substrate home; `/carousel` (INTERNAL, `:63`) becomes a component register over it. No `./sequence` mint — KISS, and atlas's two live imports (`useStageDeck.ts:2`, `useDeckDetent.ts:1`) keep resolving.

**What the substrate IS** (the shape the laws force):

1. **One core** — `useDeck` extended: integer `index` (authority, one writer `go()`, `useDeck.ts:52-58`) + **optional continuous `position` + `velocity`** (producer-fed channel, §0.8) + `axis` + derived `canNext`/`canPrev` (closing the hand-rolled gap at `demo/stories/motion/deck.vue:72,84-86`, verified) + `progress` re-derived + `liveMessage` (`:46-50`).
2. **Two clocks, never mixed — LAW 11 (`EXEMPLARS-CODEX.md:165`).** The TRAVEL arm is inertial: native scroll-snap where the strip scrolls (the detent-driver mechanics; E4 `:101`); the authored spring-clock turn where the stage transforms (the slides turn, whose CSS spring token tracks retunes by design, §0.1). The EXPANSION arm is fired: governed springs, ≤1 rebound. Both current halves fail LAW 11 from opposite sides today — embla's `duration: 30` tween is a third vocabulary (`useCarousel.ts:11,19-23`), and the demo deck's only motion is a fired spring on a paged strip (`demo/stories/motion/deck.vue:166-170`).
3. **One window oracle** — `pagerWindow` (`pager-dots/pagerWindow.ts:18-35`) graduates from indicator-window to member-window; exported from the substrate; the `:1-7` fence comment retruthed (§0.5).
4. **One keyboard contract** — `handleDeckKey` (`useDeckKeyboard.ts:36-75`) gains an axis (it is horizontal-only today: ArrowRight/ArrowLeft, `:45,50` — verified); union with `Carousel.vue:64-79`'s axis derivation and PagerDots' roving-tabindex wrap + disabled-skip (`PagerDots.vue:220-244`). Two bindings: global-window (presentation) and roving-tabindex (rail). Deleting `Carousel.vue`'s `onKeyDown` deletes the reason for the `stopPropagation` at `PagerDots.vue:267-272` — the comment there names the embla double-advance explicitly (verified; the split already pays rent).
5. **One `[data-state]` vocabulary** — `"active" | "prev" | "next"` (§0.6). Direction is derived from index comparison, never stored (`DeckView.vue:91-92`); a snap-scroll skin that doesn't need direction simply doesn't read it. Atlas's `"parked"` and the demo/README's `"inactive"` both die at their owners' adopts (relay rows).
6. **One member-projection channel** — `arrivalDistance` (`carousel/arrival.ts:19-28`, already pure and engine-agnostic — the best-shaped lift) drives a per-member projection split across ≥2 clocks per **LAW 1** (`:145` — falsified today at `CarouselContent.vue:76-77`, where scale and opacity ride the identical `t`; verified), with an interior content-lag channel per **LAW 3** (`:149` — the arrival writes a parent transform on the slide node, `CarouselContent.vue:76`), and a **participation flag** per **I4b/#29** (`:132`, `:188` — "the neighbours do not move"; "window-not-carousel; only the tapped cell participates"): the expansion mode is a window, never a track translation, which is precisely why the expansion arm cannot be built on embla (embla moves the track).
7. **One rendering pair (minimal)** — `<DeckStage>`/`<DeckSlide>`: the stage (16:9 letterbox + `--cqx` + perspective + ground layer host) and the slide host (attribute fall-through, `[data-state]`, dark/aria from manifest, slide context provide). This is where the mis-homed `liveMessage` finally gets a DOM host (D1 called it a duplicate to delete, D3 called it homeless — both true; the substrate rendering half resolves it). PagerDots stays the ONE indicator; **LAW 14** (`:171`) is already satisfied by its bed/worm/interaction split (`PagerDots.vue:21-34`, verified) — inherited, never re-invented. **I1** (`:128`) fences the worm: travel and absorption only, never payload swaps.
8. **Optional stylesheets, tokens-first** — the turn (`--turn-*` + mobile flat-push + PRM), the stage/reflow/safe-area/clearance, the settle/print/export block, the reveal sheet. Identity values (NCSU red, ink radials, cream flip hues, type values) go to atlas's overlay/tokens per D2's receive plan.

**Binding laws roster** (gate-checkable, for the wave's close battery): LAW 11 `:165` (two vocabularies — the partition), LAW 9 `:161` (continuous timeline, window expansion, fixed-anchor growth), A6 `:61` (the tail is the weight — 80% in ~250ms + 330ms creep; flanks dim in place; radius near-invariant), I4b `:132` + #29 `:188` (only the tapped cell participates; 1:8 parallax), LAW 1 `:145` (no two channels share a clock — the standing falsifier is `CarouselContent.vue:76-77`), LAW 2 `:147` (forward and backward scores; both halves symmetric today), LAW 3 `:149` (content-lag is a spring, never a parent transform), LAW 7 `:157` (radius is a role through the card→page arm), LAW 12 `:167` (idle reports state), LAW 13 `:169` (anchor honesty on the return path), LAW 14 `:171` (housing carries the material), I1 `:128` (the payload-swap fence), E4 `:101` (native snap ratified).

**What DELETES** (adopting D3's table with my corrections):
- Embla + its tween: `useCarousel.ts:11` (constant), `:19-23` (instantiation), peer/meta/dev/external cascade (`package.json:532-548,575-576`, `vite.library.ts:37`) — **with the named loop clean break + words relay, §0.7**.
- The two-authority reconciliation class: `Carousel.vue:25-32` (delta guard), `:34-44`, `:48-52` (watchers) — one authority deletes the whole class.
- `Carousel.vue:64-79` `onKeyDown` (→ axis-bearing `handleDeckKey`), and with it the `PagerDots.vue:267-272` stopPropagation rationale.
- `CarouselPager.vue:22-43`'s third index/count mirror (chrome remains).
- Embla type leaks from the public surface (`carousel/interface.ts`, `carousel/index.ts`) — clean break, no alias.
- `demo/stories/motion/deck.vue:166-179`'s demo-local motion (substrate-owned after the cut) and its `data-state="inactive"` vocabulary.
- Doc-truth: the three "DISTINCT from `/carousel`'s embla item-scroller" assertions (`deck/index.ts:1-4`, `deck/README.md:3-6`, `useDeck.ts:3-7`) — false at the cut.

**What UNIFIES**: D3's U1-U8 adopted as corrected above (U1 arrival lift, U2 split-clock projection, U3 core extension, U4 keyboard union, U5 oracle graduation + export, U6 the indicator arm's fired clock stays declared-separate, U7 can-flags into the core, U8 one axis+gutter token replacing the `-ml-4`/`pl-4` Tailwind literals split across `CarouselContent.vue:124`/`CarouselItem.vue`).

**Tests that move**: `tests/components/carousel.contract.test.ts`, `carousel.arrival.test.ts`, `tests/components/custom/deck/Deck.contract.test.ts`, `pager-dots.contract.test.ts` + `pager-dots.morph.test.ts`, `tests/public-surface.spec.ts:7`, `a11y/decorative-icon-sweep.test.ts:77-82` (D3's roster, uncontested).

---

## §3 · THE WIDENED #40 WAVE-AMENDMENT DRAFT — body for the perfection fold to seat verbatim

> ### #40 W-PAGER ⊕³ — widened to THE DECK APOTHEOSIS (owner sitting items 11-12, `EXEC-STATE.md:450-457`)
>
> **The RE-HEAR is RULED: deck LIVES, widened.** The tier-2 DELETE is dead. `/deck` is the substrate home of ONE windowed-sequence motion engine under both the presentation deck and the carousel (carousel KEEP by owner word, A-2; consolidation-into-apotheosis exercised here). Atlas's `useStageDeck`/`useDeckDetent` stand as prior art consumed by pattern, never broken as surface.
>
> **3.1 The substrate.** Extend `useDeck` (`src/components/deck/composables/useDeck.ts`): optional continuous `position`+`velocity` channel (producer-fed; discrete producers stay legal — the atlas detent seam is not forced open), `axis`, derived `canNext`/`canPrev`. TWO clocks by law (LAW 11): inertial travel (native scroll-snap register mirroring the atlas detent mechanics — `scrollsnapchange` + IO fallback; and the authored spring-clock turn register for transform stages) · fired expansion (governed presets only). The JS easing authority is `springPreset(...)`, **never a literal** — this clause and the extant rogue-ζ0.64 strike (`useLeadTrail.ts`) are one defect class; the slides `DECK_SPRING = {0.5, 0.85}` literal is its third instance, dying at the slides adopt.
> **3.2 One `[data-state]` vocabulary:** `active | prev | next`, direction derived. Deaths: atlas `parked` (relay, atlas tranche), demo/README `inactive` (this wave), slides' copy becomes the shipped contract.
> **3.3 The rendering pair.** `<DeckStage>` (16:9 fixed-inset letterbox, `--cqx` anchor, perspective host, ONE crossfading ground layer, safe-area + dock-clearance tokens, mobile reflow arm) + `<DeckSlide>` (attribute fall-through, manifest dark/aria, slide-context provide) + the substrate-hosted `aria-live` region consuming `liveMessage`. PagerDots remains the ONE indicator (LAW 14 inherited; I1 payload-swap fence standing); it gains `windowFit="auto"` — the CSS-token-published, `getComputedStyle`-read responsive fit rung (the one-way ruling travels).
> **3.4 The stylesheets** (optional, tokens-first, identity-free): the `--turn-*` composite turn WITH the visibility-join, the iOS-WebKit flat-push arm (non-optional wherever the turn ships — preserve-3d over a scroll container is the blank-flash seam), the PRM arm, the gutter/scrim mechanism, the settle/print/export block (export frame forcing, freeze-vs-export split, print stacking + per-slide re-grounding, the 719px + `#app` fixes), the reveal sheet on the `--motion-stagger-*` canon. Every identity value (NCSU, ink radials, cream flip, padding/shadow/type values) routes to the atlas overlay (`atlas/src/design/overlays/deck.css`, new; import after `scroll-driven.css`; `@layer atlas`; no fourth "detent" register minted).
> **3.5 New composables:** `useDeckHashSync` (opt-in), the swipe driver (44px, axis-dominance), `useEdgeZones`, the capture/settle contract (`captureMode` one-reader + mode dispatch: print/export/freeze body classes, settle hooks — `AnimatedDigit` settle included). `darkModeSyncScript` gains `{defaultDark, queryOverride, normalize}` (§0.4).
> **3.6 The carousel fold:** embla DELETES (peer/meta/dev/external cascade) as CONSOLIDATION under the owner's KEEP — the surface stays, the engine is the substrate. **Named clean break: `loop` dies** (native snap cannot wrap; no-backwards-compat); the words relay row (#76) opens with a loop-usage grep at `ImageCarousel.vue`. The two-authority reconciliation class, the second keyboard handler, the third index mirror, and the embla type leaks all delete; `arrivalDistance` lifts as the member projection, split across two clocks (LAW 1) + interior lag (LAW 3) + participation flag (I4b/#29).
> **3.7 Doc-truth + fences:** the `deck/README.md:65-71` lift boundary is AMENDED — hash-sync, swipe, edge-hover, and capture modes are substrate surface; the settings panel and app shell remain consumer-local (the over-lift fence survives, redrawn). The three "DISTINCT from /carousel" headers retruth. `pagerWindow.ts:1-7` retruths at the member-window export. Subpath policy: `deck` PUBLISH (unchanged), `carousel` re-classed to match its externally-imported reality (words, S-11) — fold rules the class.
> **3.8 Retained #40 payload (unchanged):** the filter-free worm cure-by-subtraction (Arm B clip-path sole primary; `filter:url()` + `@supports` die; engage-only `will-change`), the I1 rigid-vessel/hollow-beat payload-swap amendment, the bead-ring fission/fusion token, inactive tick white@0.24, the 5 born-RED close-battery rows.
> **3.9 Gates + close:** the LAW-1 two-clock gate (no component runs opacity and transform on one duration — standing falsifier `CarouselContent.vue:76-77` must go GREEN by fix), the LAW-11 vocabulary gate (no tween third-vocabulary on a paged strip), the capture-settle determinism gate, the `light-dark()` inset-shadow lint (from `deck.css:101-111` — a consumer comment becomes a library gate). Captured DELTA artifacts per the live-verify rule for: the turn (desktop 3D + mobile flat-push, both engines), the carousel on the substrate, the pager worm filter-free. Relay rows owed: slides 3.13.0→8.0.0 adopt (#76 hinge — deletes rows 1-7 of the split table, adopts the substrate, retires `useCountup` onto AnimatedDigit, drops `.sr-only` + paper grain), atlas (deck overlay receive + `parked` retirement + optional `useStageDeck` convergence, ITS tranche), words (carousel loop grep + migration evidence).

---

## §4 · CROSS-SEAT CONFLICT FLAGS (facilities classified differently — all adjudicated above)

| Facility | D1 (slides) | D2/D3 ground | Ruling |
|---|---|---|---|
| Hash-sync, swipe, edge zones, capture modes | ABSTRACT-GENERAL → glass-ui | `deck/README.md:65-71` names them consumer-local | Owner item 11 outranks the README; fence AMENDED, four migrate; settings panel + app shell stay (§3.7) |
| `[data-state]` vocabulary | active/prev/next (unflagged) | atlas active/parked; glass demo/README active/inactive (unflagged) | Three-way schism no seat named; ONE vocabulary minted (§0.6, §3.2) |
| `liveMessage` | DUPLICATE, delete slides copy | D3: mis-homed, no DOM host in the rendering half | Both true; substrate rendering pair hosts it (§2.7) |
| Spring pin | D1: live three-spring drift | — | Misdiagnosed; drift is adopt-time, cure is clock ownership (§0.1) |
| `pagerWindow` export | D1: library export gap | `pagerWindow.ts:1-7`: declared fence | Fence, not gap; dissolves at member-window graduation (§0.5) |
| Colour-mode boot | D1: "likely duplicate, needs byte compare" | — | Compared: NOT a duplicate; extend `darkModeSyncScript` (§0.4) |
| Embla delete | — | D3: delete; owner word: carousel KEEP | Legal as consolidation; the unnamed loop loss becomes a named clean break + words relay (§0.7) |
| Continuous position | — | D3: core must publish it; atlas detent: "no continuous scalar crosses this seam" | Optional producer-fed channel; atlas's seam stays closed unless it opts in (§0.8) |

Key files for the fold: `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:135` (the row this amends), `EXEC-STATE.md:450-457` (authority), `EXEMPLARS-CODEX.md:145-171` (laws), `/Users/mkbabb/Programming/glass-ui/src/components/deck/README.md:65-71` (the fence to amend), `/Users/mkbabb/Programming/slides/src/styles/deck.css` (the largest migration corpus), `/Users/mkbabb/Programming/atlas/src/stage/useDeckDetent.ts` (the prior-art travel arm).

---

## PART II · THE RELOCATION ROSTER

All contested files re-read, all cited rulings verified on disk. Composing the roster.

---

modelId: `claude-fable-5`

# THE RELOCATION ROSTER — adjudicated

## §0 · Adjudication method + corrections to the seats

Both seat reports consumed in full. Every verdict below rests on a re-read of the contested file, not on either seat's count. Corrections adopted: E1's C-1/C-2/C-3 (mirror de-dup, atlas+sci = one family via `sci-report/dashboards/package.json` declaring `@mkbabb/atlas`, the bbnf-lang `docs/`-segment false-negative) and E2's C-1 through C-7 (table transitive, pager-ring CSS, re-export-barrel invisibility, `/forms` aggregation, pin-conditioned zeros, deck evidence, consumer-demo scope). Four corrections of my own:

- **A-1 · E1's fourier-analysis zero-check is confirmed but was fragile** — that repo roots at `web/src`, not `src`. Verified under the correct root: zero `fourier-field`/`fourier-math` hits in `/Users/mkbabb/Programming/fourier-analysis/web/src` and `web/e2e`. The claim stands.
- **A-2 · E1's completion-seal "FLAG RELOCATE" ignores that the row is already ruled** — GESTALT RULING 6 deletes it with a relay addendum (`docs/tranches/BJ/addenda/2026-07-24-refinement/GESTALT.md` §RULING 6: "62 − … − completion-seal … with relay addenda naming the consumers"). The census refines the destination, it does not mint a new verdict.
- **A-3 · E1's instrument-chassis "re-measure when muster leaves prototype" advisory is STRUCK** — the owner already ruled DELETE with the proof rejected and the prototype rule minted in the same breath (`EXEC-STATE.md:442-445`, item 9). There is no re-measure.
- **A-4 · E1's `surface` flag is a concentration artifact.** Substance read: `src/components/surface/index.ts:1-9` exports `Surface, SurfaceProps, SurfaceDecoration, SurfaceMaterial, SurfaceSpecular` + `SurfaceTier` from `../_shared/axes` — this is the library's material primitive, named in the shadcn-abrogation family ledger as family 7 "Card+Surface" (`TERMINAL-ROSTER.md:159`, row #64). A material primitive cannot relocate to its earliest adopter. The incredulity rule exists for exactly this row.

Standing rules applied throughout: muster is a PROTOTYPE — its counts bind nothing (`EXEC-STATE.md:443-444`); no deletion is minted here — zero-consumption rows route to the perfection fold under G-RELAY (`TERMINAL-ROSTER.md:276`); the governing consumer-bar precedent is `src/index.ts:142-146` (scrolling-text, ≥2-binary-consumer).

## §1 · ALREADY-RULED (cite the row; the census only annotates)

| component | ruling of record | census annotation |
|---|---|---|
| **watercolor-dot** | RELOCATE → value.js CONFIRMED — `EXEC-STATE.md:446-449` item 10 | value ×11, sole. The archetype of the class |
| **instrument-chassis** | DELETE, proof REJECTED — `EXEC-STATE.md:442-445` item 9; relay: speedtest migrates at its own bump | speedtest ×4 is the only live binding; muster ×6 void under the prototype rule |
| **carousel** | KEEP — owner word `EXEC-STATE.md:426-428` item 5; shares the deck substrate `EXEC-STATE.md:455-457` item 12 | words ×2; also style-coupled to pager-dots (`CarouselPager.vue:83` applies `.glass-pager-ring`, E2 C-2) |
| **deck** | KEEP + WIDEN into the deck apotheosis — `EXEC-STATE.md:450-454` item 11 (abstract slides mechanics migrate INTO glass-ui; slides styling → atlas) | E2 C-6 folded: atlas is the sole live consumer (`useStageDeck.ts:2` + `DashboardEssay.vue:51`; `useDeckDetent.ts` mirror-only). Slides' local fork names glass-ui as intended home in 4 files (`slides/src/deck/useDeck.ts:4` et al.) — consumer #2 is adopt-pending |
| **metric family** (metric-badge/cell/stack — all CUT subpaths at HEAD) | CONSOLIDATE to one family — `EXEC-STATE.md:439-441` item 8 | the stale speedtest/fourier/sci pins discharge through the R-1 relay |
| **completion-seal** | DELETE with relay addendum — GESTALT RULING 6 | destination resolved by this census: **atlas** — it already re-exports the component (`atlas/src/design/recipes/completion.ts:1-7`) and wraps it in `resolveCompletionSeal` (`:16-19`); sci's direct imports (`CategoryHomeView.vue:4`, `GalleryView.vue:19`) re-point to `@mkbabb/atlas`. The delete-with-relay and the relocation reading converge; fold executes |
| **header-ribbon** | DELETE with relay addendum — GESTALT RULING 6 | relay destination: keyframes (its ×1 sole consumer). Fold executes; E1's "decide on weight" entry superseded |
| **animated-digit** · **paper-backdrop** | DELETE — GESTALT RULING 6 | zero census flags; consistent |
| **drawer** | MERGE-INTO dialog — GESTALT RULING 6 (W-DIALOG-DETENT) | — |
| **data-table + table** | SPLIT ruled, row #64 (`TERMINAL-ROSTER.md:159`) | `table` is transitively consumed via `DataTable.vue:20` (E2 C-1) — its disposition is data-table's, never its own; not vacant |
| **tags-input** | demote STRUCK — row #21 (`TERMINAL-ROSTER.md:116`) | but **zero consumption anywhere** (no subpath, no root-barrel import in any repo). Struck-demote + zero-consumers is a live tension → owner-glance |
| **pager-dots** | lane-owned W-PAGER row #40 (`TERMINAL-ROSTER.md:135`) + born-RED gate row #7 (`:105`) | zero API consumption, but `.glass-pager-ring` is load-bearing for carousel (E2 C-2) and the goo-morph worm is edict-backed. STAY in lane |
| **number-field** | lane-owned W-FIELD row #82 (`TERMINAL-ROSTER.md:177`) | the row's own "2 real" correction is now overstated: **zero ex-muster**. G-RELAY owes muster an addendum if cut → owner-glance |
| **command** · **select-family shape** | consolidation owned by row #64 family 6 | consumption verdict below (STAY); shape already ruled |

## §2 · RELOCATE (new verdict this roster)

**`fourier-field` (+ its `/fourier-math` half) → slides — RELOCATE-CANDIDATE, owner word required.** The full case, all verified this sitting:
- Sole consumer is a slide deck: `slides/src/decks/feedback-coder/slides/Slide01.vue:10`, `Slide05.vue:23` — slides ×2, 100%.
- The domain repo declines it: zero hits under `fourier-analysis/web/src` + `web/e2e` (A-1), against 22 other glass-ui subpaths that repo does consume.
- `/fourier-math` has zero consumers in the constellation; its only importer is glass-ui's own smoke test (`tests/components/custom/fourier-field/FourierField.smoke.test.ts:23`).
- The sole consumer's bindings are partly dead: props at HEAD are `config/spectrum/getPalette/color/colorResolver/seed/freeze` (`src/components/fourier-field/FourierField.vue:41-58`, verified) — no `variant`. Slides binds `variant="hero"` (`Slide01.vue:33`) and `variant="final"` (`Slide05.vue:43`); both silently no-op.

Why owner and not fold: this is a WebGPU procedural substrate, sibling-in-kind to blob/aurora, and the owner's item 11 direction runs the other way — "the abstract, generalized slide facilities migrate INTO glass-ui" (`EXEC-STATE.md:451-453`). A substrate leaving the library against that current is an owner call, not a fold seat. The `variant` defect routes to slides' own tranche regardless (consumer-updates ruling).

## §3 · STAY (general vocabulary — substance overrides concentration)

| component | conc | grounds, cited |
|---|---|---|
| **surface** | 100% atlas-family (×7) | material primitive (A-4); `src/components/surface/index.ts:1-9`; shape owned by row #64 family 7 |
| **handmark** | 100% atlas (×3) | barrel is domain-free brush×shape engine — "framework-free, directly usable in slides decks, D3 charts … even canvas" (`src/components/handmark/index.ts:4-8`, verified); every atlas semantic already lives atlas-side (`atlas/src/motion/useMarkMorphology.ts:8-30`); atlas states "NO glass-ui change is needed" (`atlas/src/charts/glyph/HandMark.vue:15`). Seam already correct |
| **scroll-progress-rim** | 100% atlas (×1) | E1's hesitation OVERRULED: props are generic `value/max/segments/orientation/stops` (`ScrollProgressRim.vue:23-38`); its spectrum tokens are library-minted (`src/styles/tokens/color-radius.css:250-255`, verified — atlas is the borrower); and GESTALT §1 names it in the already-excellent exemplar roster ("`scroll-progress-rim` (the small component done fully)"). An exemplar is not eviction material |
| **search** | 80% value | structurally unrelocatable: `src/components/dock/composables/useDockSearch.ts:49-54` (verified) imports `useFuzzySearch/FuzzySearchState/SearchableItem/SearchResult` from `../../search/composables` — dock, the most-consumed component, owns the engine. Surface-shape ask (engine internal vs exported `SearchBar` chrome) routes to fold |
| **blob** | 100% value (×5) | flagship substrate; GESTALT §2 substrate ruling (blob WebGPU-only) treats it as library identity. Consumption is not ownership |
| **constellation** | 67% | two independent engine consumers; slides filed a five-item upstream-generalization list (`slides/src/decks/til-briefing/constellation.ts:21-27`) — the anti-relocation signal |
| **keyboard** | 75% | `registerShortcut` across 4 unrelated surfaces + internal consumer (`ExpandableContainer.vue:99,189`) |
| **easing** | 71% | two binary consumers, domain-neutral curve authoring |
| **status-dot** | 40% | 3→4 repos once the pulse fold lands (`src/components/status-dot/feedback.ts:4-5`) |
| **reactive** | 100% speedtest (×3) | verified: all three edges are `useTimer` (`speedtest/src/composables/useGeolocation.ts:1` et al.) — a generic timer composable, pure library vocabulary |
| **configurator** | 80% fourier | verified two-family use: `ConfiguratorLayer/ConfiguratorRow` in fourier (`web/src/components/visualization/BasisSelector.vue:5`, `ContourSettings.vue:19`) + value (`demo/scenes/ConfigSliderPane.vue:21`); generic labeled-control chassis |
| **sortable-list** | 100% bbnf-buddy (×3) | general drag-reorder vocabulary; nothing bbnf-shaped in it; the dropResolver defect row is a fix, not a disposition |
| **timeline** | 100% speedtest (×1) | timeline itself is general vocabulary — STAY; but the `scrubber`+`segmented` variants (~705 LOC) have zero binary consumers anywhere (sole consumer binds `variant="continuous"`, `speedtest/.../PhaseTimeline.vue:36-37`, verified). Variant trim → fold |
| **command · progress · tokens · label · motion · separator · toggle-group · motion-core · styles.css** | various ≤100% | all domain-neutral primitives or the library's own token/style surface; toggle-group holds toeholds in 3 repos beyond the family; `./styles.css`→`component-styles.css` vs `./styles`→`styles/index.css` is an alias-naming note for the fold, not a relocation |
| **alert · radio-group · input · textarea** | apparent zeros | NOT zero — E2 C-3/C-4: value's re-export barrels (`value.js/demo/ui/alert/index.ts:10`, `radio-group/index.ts:1`) and the `/forms` aggregate (`src/forms.ts:13-14`; speedtest ×10, words ×3, keyframes ×5). STAY; input/textarea lane = row #82 |

## §4 · DELETE-CANDIDATE (routed to the perfection fold — nothing minted here)

All are **subpath** cuts, not component deletions; G-RELAY's whole-repo walk applies to each (`TERMINAL-ROSTER.md:276`):

- **`axes`** — root-barrel-redundant (`src/index.ts:265` re-exports it); the `_shared/axes` module itself is load-bearing internally and stays.
- **`blob-config`** — strict subset of `/blob`.
- **`canvas`** — zero external consumers; the `canvas2d` machinery stays internal.
- **`fourier-math`** — zero everywhere; disposition contingent on §2's fourier-field ruling (travels with it either way).
- **`styles/theme` · `fonts/*`** — import-edge zero, **but the census instrument cannot see CSS `url()`/`@import` references** — the fold must run a text-reference sweep before cutting. Incredulity applied; no silent drop.

Not delete-candidates despite zero consumption: tags-input (demote struck — §1), number-field (lane — §1), pager-dots (lane + style-load-bearing — §1).

## §5 · ALREADY-CUT (stale-pin edges, out of census scope)

`icon-tooltip` · `scrolling-text` · `context-menu` · `pulse` · `hover-card` · `hover-popover` · `metric-badge/cell/stack` · `confirm-dialog` · `sheet` · `toggle-chip` · `controls` · `api` — absent from `package.json` exports at HEAD; every consumer edge is a stale pin (speedtest `^4.0.1`, muster `^3.1.0`). Fold destinations per E1 §3.11 stand verified in kind (`pulse`→status-dot per `feedback.ts:4-5`; `context-menu`→dropdown-menu per `useMenuTrigger.ts:11-14`; `scrolling-text` precedent on record at `src/index.ts:142-146`).

## §6 · Defects surfaced, actionable independent of any disposition

1. **Census instrument false-negative class** — `build-consumer-ledger.mjs:52-63` `ignoredPathParts` is a path-segment filter including `"docs"`; it dropped the live `bbnf-lang/playground/src/components/docs/DocsSidebar.vue:4` edge. Root-anchor the exclusions. (Corollary: it also cannot see re-export barrels, `/forms`-style aggregates, or CSS references — three E2-proven blind spots; the fold's zero-checks must not trust it alone.)
2. **Slides dead bindings** — `Slide01.vue:33` + `Slide05.vue:43` bind a nonexistent `variant` prop on `FourierField` (verified against `FourierField.vue:41-58`); also `speedtest/.../PhaseTimeline.vue:52` types through the dead `/api` subpath. Both route to the consumers' own tranches as marked addenda (consumer-updates ruling).

## §7 · OWNER-GLANCE LIST

**Needs an owner word:**
1. **fourier-field (+fourier-math) → slides** — relocation of a WebGPU substrate cuts against item 11's "abstract facilities migrate INTO glass-ui" (`EXEC-STATE.md:451-453`); every fact favors relocation, the direction of current favors keeping. One word decides.
2. **tags-input** — demote struck (`TERMINAL-ROSTER.md:116`) yet zero consumers in the entire constellation; STAY-as-governed vs cut needs the owner.
3. **number-field** — W-FIELD lane assumes it ships; its real consumer count is zero ex-muster. Keep in lane or cut with the muster relay addendum.

**The fold can seat without an owner word:**
- completion-seal relay-to-atlas execution (Ruling 6 + the extant atlas relay converge) · header-ribbon relay-to-keyframes (Ruling 6) · timeline scrubber/segmented variant trim (~705 LOC, zero consumers, G-RELAY walk) · the §4 subpath cuts (styles/theme + fonts/* only after the text-reference sweep) · the search surface-shape recomposition · the `./styles.css` alias note · both §6 defects (instrument fix here; consumer fixes as marked addenda in their tranches).
