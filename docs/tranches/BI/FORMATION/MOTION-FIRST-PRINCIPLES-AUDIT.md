# Motion from first principles and actual demos

**Status:** formation research only; no implementation, native Safari/Chrome π, release, or execution credit
**Bound source:** `26c5ae686fd0f1181083aebda1215b00524555f1`
**Families:** 11
**Exact source witnesses:** 69
**Distinct direct desktop/mobile demo routes:** 18
**Discovered scheduler/engine-bearing source files:** 168 (descriptive; re-discovered at execution)

## Governing decision

“One clock” is retained only as the property-level rule that one animated property or semantic episode has one temporal authority and one writer. It is rejected as a demand for one application-wide callback. Managed spring playback, a continuous procedural frame loop, a native scroll timeline, a one-shot read coalescer, and a cancellable typewriter delay solve different problems. The product invariant is explicit ownership, non-overlap, pause/interruption/settle semantics, and complete teardown—not renderer/scheduler uniformity.

| ID | family | decision | current mechanism | first-principles resolution | actual direct demos | findings | owners |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MOT-000 | Temporal authority and lifecycle | retain-plural-authorities | SpringProgress/SmoothProgress own managed physics playback; useRAFLoop and canvas lifecycle own continuous Glass fields/rendering; native CSS owns compositor timelines; one-shot rAF coalesces reads; cancellable timers express discrete typing. The live tempo specimen shows why ownership must be checked after composition: its panel and trigger scale 0.70→1.30 while its portaled scrim remains fixed at 550 ms. The reveal flagship separately remounts through nested rAF and pairs --spring-bouncy with a local fixed 500 ms horizon. The Springs lab uses another 1100 ms fixed clock for every named preset and its playground self-schedules raw rAF. The retained EasingPicker adds a fixed 1200 ms local rAF preview with restart/unmount cancellation but no reduced-motion or playing-state contract while surrounding prose variably calls playback keyframes-owned or a future seam. | Reject the literal one-clock doctrine. Classify and instrument every scheduler by role, property, stop condition, pause/PRM behavior, and teardown. A keyframes import is not an exemption and a different appropriate mechanism is not a fork. Conversely, a product that advertises one scaling authority across a composed episode must prove the same normalized factor for every named channel; a correctly scaled focal panel cannot launder its fixed-clock scrim, consumer-owned CSS cannot turn a named physical spring into an arbitrary-duration curve, and a demo cannot substitute a universal 1100 ms playback clock for per-row generated horizons. An editor-local normalized one-shot may be proportionate, but it must be named as such, expose restart/final/PRM state, and never masquerade as reusable keyframes playback. | /motion/springs, /motion/tempo, /motion/scroll, /motion/text-motion, /motion/curve-gallery | RDA-018, RDA-019, RDA-020, RDA-024, RDA-025, RDA-026, RDA-030 | BI.W-P023, BI.W-P024, BI.W-P025, BI.W-P031, BI.W-P054, BI.W-P124 |
| MOT-001 | Semantic spring language and tempo | retain-semantic-source-delete-distribution-mirror | SPRING_PRESETS feeds generated CSS linear(), but a consumerless MOTION_CURVES reverse table and suite.ts republish peer catalogues. The green motion-presets command additionally preserves --ease-convergence on a prose future-consumer record although all nine bound sibling product trees have zero reads. The live gallery claims 1:1 upstream parity and displays stale parameters for all five spring rows; Deck's separate 0.5/0.85 fork also claims equality with canonical smooth 0.58/0.8. The tempo story's panel changes 308→572 ms across 0.70→1.30 while the portaled sheet-animate scrim remains 550 ms. The reveal flagship adds a second projection fork: all six rows use the bouncy curve for a fixed 500 ms rather than its 570 ms×tempo generated horizon. The Springs lab says four shipped rows while rendering seven from an eight-row source, and its smooth readout has 24 percentage stops versus 48 in the actual token because it omits the generator's measured-settle maxDuration before playing every row for 1100 ms. EasingPicker's actual authoring math is product-worthy and causal—Bezier and Steps edits changed reparsable literals—but its Bezier handles are pointer-only, copy rejection is silent, its play label collapses to 40×40 px, and its fixed preview clock has no truthful PRM/authority state. | Keep SPRING_PRESETS, trajectory bands, generated horizons/configuration, and global tempo projection, including normalized 0.70/1.30 ratio evidence for every channel explicitly claimed by the product. A consumer-owned CSS composition reads both the named trajectory and duration from that owner and separately declares stagger tempo behavior. The Springs lab derives copy/options, solver maxDuration, sample density, rounding, duration, and managed playback from the same generator contract; custom authoring is not mislabeled as a shipped token. Delete suite.ts, curves.ts, /motion-curves, --ease-convergence, the foreign taxonomy contract, and false/unowned local twins. Glass JavaScript consumers read the semantic preset/upstream callable directly; every displayed value derives from that same owner and managed playback. Preserve the actual /easing editor UI, not the catalogue mirror: it keeps upstream math ownership, semantic pointer/keyboard handle parity, explicit copy failure/recovery, a legible content-width play control, and a declared proportionate preview lifecycle/PRM contract. Vocabulary counts and duplicated taste literals are descriptive archaeology, never verification authority. | /motion/springs, /motion/tempo, /motion/curve-gallery | RDA-018, RDA-019, RDA-021, RDA-024, RDA-025, RDA-026, RDA-027, RDA-028, RDA-029, RDA-030 | BI.W-P000, BI.W-P014, BI.W-P023, BI.W-P024, BI.W-P025, BI.W-P026, BI.W-P059, BI.W-P061, BI.W-P062, BI.W-P121, BI.W-P124, BI.W-P129 |
| MOT-002 | Press and tactile response | collapse-to-one-owner | Button rebuilds useSpringPress plus useLiquidFlex directly, while DockControl uses the declared canonical useLiquidPress wrapper; proof:button-glass forces the duplicate shape and CSS :active can overlap JS scale. | Fold useSpringPress into a private leaf of one public press owner, configure Button/Card/Dock from it, and make the CSS floor exclusive to no-JS/pre-hydration rather than a concurrent writer. | /display/buttons, /forms/toggle, /dock/layers | RDA-007, RDA-020 | BI.W-P025, BI.W-P026, BI.W-P027, BI.W-P035, BI.W-P063 |
| MOT-003 | Spatial morph and FLIP | collapse-to-engine-playback | useElementMorph constructs the upstream ElementMorph math but owns another local rAF/easing loop; useBloomUp and Deck's goo path retain additional playback shapes. | Keep one public spatial-transition runner on declared upstream playback. Fold reveal, Dock CTA receive, bloom, and applicable Deck-private travel into configurations; delete duplicate measuring, timing, and transform writers. | /motion/reveal, /dock/cta-receive, /motion/deck | RDA-012, RDA-019 | BI.W-P025, BI.W-P026, BI.W-P028, BI.W-P041, BI.W-P121 |
| MOT-004 | Enter, exit, reveal, and View Transition continuity | retain-native-where-semantic | A feature-detected View Transition wrapper coexists with CSS reveal and page-local transition recipes; source-shaped checks do not establish modal isolation or composed continuity. A second [data-scroll-reveal-once]/vScrollRevealOnce branch has only definition/capture/test witnesses, while the real demo section owner explicitly calls it public-but-unused and uses a separate private mechanism. In the live tempo Dialog, glass-reveal scales its panel by 13/7 but ModalOverlay's sheet-animate scrim remains 550 ms at both endpoints. In the live v-reveal replay, six rows borrow --spring-bouncy while retaining a fixed 500 ms clock and 80 ms local stagger step. | Use native transitions where they preserve identity on the exact supported build; otherwise update instantly. Consolidate enter/exit recipes and prove focus, final visibility, no flash, one writer, and any advertised tempo factor across panel, scrim, trigger, close/reverse, newly constructed JS motion, and named-spring consumer CSS. A replay mechanism has an explicit cancellation/reset lifecycle rather than being treated as evidence merely because nested rAF remounts the nodes. Delete the consumerless public once directive/CSS branch and its self-test; preserve shared once semantics only through actual owners rather than a future-consumer record. | /motion/reveal, /motion/tempo, /containers/dialog, /motion/deck | RDA-008, RDA-012, RDA-024, RDA-025 | BI.W-P025, BI.W-P028, BI.W-P029, BI.W-P031, BI.W-P106 |
| MOT-005 | Scroll-linked motion and reader ownership | retain-semantic-dual-path | The .scroll-progress demo uses a named native timeline and moved 0→0.669856 at 420/627 px; scrollReader provides one-shot coalescing, while useScrollScene deliberately adds settled physics for felt axes. | Keep native scroll/view timelines primary for direct compositor mappings. Keep one JS reader or spring only for semantic events/felt lag, with explicit scroller/property ownership, exact build probes, bfcache/boundary tests, and no native shadow. | /motion/scroll | no current finding; execution evidence remains pending | BI.W-P025, BI.W-P030, BI.W-P031, BI.W-P061 |
| MOT-006 | Pointer velocity, drag, and direct manipulation | retain-bounded-gesture-authorities | useDragMorph composes upstream Draggable/SpringProgress, while useDragVelocity owns another drag-window rAF bridge and SortableList lacks a keyboard transaction or semantic list. EasingPicker's Bezier SVG has causal pointer capture but its two visible control points are absent from the focus/role tree, while the Steps arm's shared slider proves pointer/Arrow-key parity is already available in the same component. Drawer imperatively binds its aria-hidden 25px grip: a real drag moved explicit state 0.4→0.25 and also moved the story labelled no snap dragging from 1→0.5 because bottom/top omission silently synthesizes a ladder. | Unify normalized sampling and mapping where semantics match, keep event-scoped bridges only when the engine surface cannot express the property, and prove zero idle work, frame-rate independence, capture/cancel, target commitment, and input equivalence. Interactive SVG geometry exposes actual named value-bearing controls whose keyboard and pointer paths converge on the same state owner rather than crediting an image host as operability. Only a declared multi-detent Drawer exposes one named coarse-target slider-equivalent grip: Arrow/Home/End and pointer/touch share activeSnapPoint, focus, announcement, interruption, scrim/stage/paint, and PRM state. Ordinary fixed/content-sized Drawer synthesizes no ladder and renders no handle. | /forms/slider, /navigation/carousel, /data/sortable-list, /motion/curve-gallery, /containers/drawer | RDA-013, RDA-027, RDA-036 | BI.W-P007, BI.W-P025, BI.W-P026, BI.W-P032, BI.W-P059, BI.W-P061, BI.W-P062, BI.W-P107, BI.W-P120, BI.W-P124 |
| MOT-007 | Text motion family | retain-distinct-semantic-mechanisms | Typewriter uses cancellable semantic delays; SplitChars uses structural spans plus CSS; AnimatedDigit uses SmoothProgress; Countup is a numeric runner. Typewriter also defaults interactive=true and binds click-backspace to every glyph, but both current first-party instances disable that pointer-only behavior. Four old routes redirect to one direct family story, while the legacy consumer tally counts the Countup demo plus its unit test as two product consumers by filesystem existence alone. | Keep only distinct mechanisms justified by current runtime ownership and one direct family lab, then clean-break the four compatibility routes. Tests do not create demand, and a hidden default interaction is not a demonstrated product concept. Delete Typewriter's interactive prop and per-glyph click-backspace unless a coherent named editing/rewind control with keyboard/pointer parity is deliberately owned and directly demonstrated. Require grapheme safety, one AT representation, stable numeric geometry, cancellation/reset, declared announcement policy, immediate complete PRM state, and deletion of any public primitive lacking an external receipt or explicit owner decision plus causal first-party use. | /motion/text-motion | RDA-001, RDA-022, RDA-035 | BI.W-P000, BI.W-P014, BI.W-P023, BI.W-P024, BI.W-P025, BI.W-P029, BI.W-P031, BI.W-P056, BI.W-P057, BI.W-P059, BI.W-P062, BI.W-P079, BI.W-P080, BI.W-P129 |
| MOT-008 | Deck motion composition | retain-behavior-delete-inert-motion-export | Live Next navigation correctly updates pager identity, focus, and aria-live. A separate exported installDeckSpring/deckEase/DECK_SPRING facility is numerically contradictory, silently falls back, and is not consumed by that runtime behavior. | Retain Deck behavior and PagerDots composition. Delete the inert motion export and global Goo dependency; localize the sole barbell/filter showcase and run it on declared playback with interruption, unique IDs, rest cleanup, PRM, and attributed failure. | /motion/deck | RDA-015, RDA-019 | BI.W-P025, BI.W-P026, BI.W-P029, BI.W-P031, BI.W-P061, BI.W-P118, BI.W-P121 |
| MOT-009 | Reduced-motion semantics | retain-one-policy-not-one-implementation | CSS, useRAFLoop, keyframes playback, Typewriter, procedural renderers, and component-local probes each interpret prefers-reduced-motion; the current research run did not emulate or prove PRM. EasingPicker's exercised travelling-dot preview has no PRM branch at all and always schedules its fixed 1200 ms rAF after activation. | Define one product policy and reactive state projection across CSS and JS while allowing each mechanism to implement its appropriate snap/static path. Eliminate contradictory local policy, hidden final state, and continuous work under reduce. Authoring previews complete immediately with truthful final state under reduce and keep copy/edit/focus causality intact. | /motion/springs, /motion/reveal, /motion/deck, /motion/scroll, /motion/text-motion, /motion/curve-gallery | RDA-030 | BI.W-P022, BI.W-P025, BI.W-P027, BI.W-P029, BI.W-P030, BI.W-P031, BI.W-P054, BI.W-P061, BI.W-P124 |
| MOT-010 | Animation channel truth and measured experience | replace-name-whitelist-with-sink-and-trace-evidence | proof:no-layout-animation calls a reflow-property-name filter compositor-only, permits paint and all custom properties by construction, and reports LOCKED while carrying four keyframe plus fifteen transition exceptions for layout properties such as width, height, inset, grid, margin, max-width, and left. | Delete the command and allowlists. Discover CSS keyframes/transitions, Vue Transition recipes, native timelines, and JavaScript writers in the whole current src+demo tree; resolve custom-property sinks; classify layout/paint/composite; and bind CLS, main-thread, layer, and frame evidence to exact Safari/Chrome scenarios. Keep a user-initiated layout reclaim only when its owner proves semantic necessity and budget. | /dock/layers, /data/timeline, /feedback/progress, /motion/scroll | RDA-023 | BI.W-P000, BI.W-P014, BI.W-P025, BI.W-P029, BI.W-P030, BI.W-P031, BI.W-P061, BI.W-P130 |

## Scheduler census

This is a frozen-source discovery aid, not a roster gate. Counts describe the bound tree and must change when code is deleted, moved, or reclassified; the current verifier rediscovers paths and rejects an unowned scheduler rather than demanding these numbers.

| mechanism | source occurrences |
| --- | --- |
| raw-raf | 65 |
| raw-raf-cancel | 33 |
| timeout | 47 |
| timeout-clear | 33 |
| interval | 4 |
| interval-clear | 4 |
| native-scroll-view-timeline | 33 |
| view-transition | 5 |
| web-animations | 1 |
| engine-motion | 47 |
| css-keyframes | 69 |
| css-animation | 129 |
| css-transition | 148 |
| vue-transition | 5 |

## MOT-000 — Temporal authority and lifecycle

**Product model:** One temporal authority and one writer per animated property or semantic episode; mechanism choice follows the work rather than a global-callback quota.

**Resolution:** Reject the literal one-clock doctrine. Classify and instrument every scheduler by role, property, stop condition, pause/PRM behavior, and teardown. A keyframes import is not an exemption and a different appropriate mechanism is not a fork. Conversely, a product that advertises one scaling authority across a composed episode must prove the same normalized factor for every named channel; a correctly scaled focal panel cannot launder its fixed-clock scrim, consumer-owned CSS cannot turn a named physical spring into an arbitrary-duration curve, and a demo cannot substitute a universal 1100 ms playback clock for per-row generated horizons. An editor-local normalized one-shot may be proportionate, but it must be named as such, expose restart/final/PRM state, and never masquerade as reusable keyframes playback.

**Required live states:** visible, offscreen, hidden, interrupted, settled, cancelled, PRM, unmounted, native/JS exclusivity, zero orphan work

**Bound source witnesses:**

- `src/composables/motion/useSpring.ts:145` · blob `73092bbc5bd6b12f0c13a37886551e9fc5b8a871` · line sha256 `948d576e6e1249366bc932191ecc19a7be0e9cd3ae813b4533038ec22759eab8` · spring.value.play(noop);
- `src/composables/motion/useRAFLoop.ts:92` · blob `b78fb56ea89699694dcbb65debf3ec2233f2e4a7` · line sha256 `60c594f8eb0e0eb14b6326534b21129e38e232d305df0b4aed8365c236e0cb38` · export function useRAFLoop(
- `src/composables/motion/scrollReader.ts:80` · blob `6efbc1b4b32516b9571c63c59a0ca5694972243b` · line sha256 `b97880e62a18f871ba0428ee92b6c03e352b2f63395781539fa1cd85840a1b18` · export function createScrollReader(
- `src/components/custom/typewriter/utils/timing.ts:35` · blob `c5d0cbbc55a1a500efa72124e73b7ca06017ea29` · line sha256 `a5af0f1c7f1c698d5974478a2aa8d3be21a6c770d9f92d54f458ee6ded557018` · export function sleep(ms: number, token: CancellationToken): Promise<boolean> {
- `demo/stories/motion/tempo.vue:63` · blob `b83267b3e247c1588362d8935b4ed5e4cc8fd96f` · line sha256 `682afc5fa8d0d0fa7f2a25986fc0f75d8215d395f10b696b70a949ca9a8f8fa5` · blurb="ONE registered inheriting scalar co-scales EVERY spring clock — the CSS reader (--spring-*-duration = settle × --motion-tempo) AND the JS response (motionTempo() → response × tempo). Slide it and the dropdown, popover, dialog, and the JS dock morph all tighten or lengthen in proportion (the CSS↔JS one-clock coherence). 1.0 is the shipped identity; ⟂ --motion-weight ⟂ --ui-scale."
- `src/styles/utilities/btn.css:113` · blob `fec2e900e2ede466be467d9c4768067751f00d69` · line sha256 `b9a970a5de08179335d1bb31c531d30b2c1fefc85da3d54475f4d0a126311024` · data-[state=open]:duration-[var(--duration-panel)]
- `demo/stories/motion/reveal.vue:22` · blob `320488b618f973731b8ac350ec44c256baeccaa9` · line sha256 `ae0b7eec2f2fcd44ff4d71aeefa2729b391294e1c045ac2e50895e6364abd25d` · requestAnimationFrame(() => requestAnimationFrame(() => (playing.value = true)));
- `demo/stories/motion/springs.vue:78` · blob `19c32798d794a7d6e5f4c9e90adc740efdcfacb5` · line sha256 `b5738b19c2ab57bdb19e2246abd0f6bbe23ffbe60dcb808d6fc984f24814fc02` · duration: 1100,
- `src/components/custom/easing/composables/useEasingPicker.ts:245` · blob `26e75723ffab332ed67c6b9942deec3ab751b602` · line sha256 `b173984ee73a2406170a8dd2b849a2466d9f0fadc6c5b36bfec7df76bfadfea4` · if (t < 1) rafId = requestAnimationFrame(tick);

**Actual direct-route evidence:**

- `/motion/springs`: desktop screenshot `410cfd43d875402c555ea0f3265a76144176354349e55a69968578d239e1b8c1`, mobile screenshot `68b9144b5c665c09a2b78a9d3cddb555c9ffeef4c86ba7c582047cd4a6aa537c`; visible interactives 46/30.
- `/motion/tempo`: desktop screenshot `5462d97a12279ffa2f04ebd2126a6015f8744f600800f5d2dcd2f329f99a6c6c`, mobile screenshot `491b7b10a0a952ebd7d5f7580065d023027234a8e2354af705fb7d237333531e`; visible interactives 43/28.
- `/motion/scroll`: desktop screenshot `d5307f2f92b2eb856f480372d140b147464ec54472932604a21568a9c5f8b76a`, mobile screenshot `7cf74a1a486efca203dd71b09565621ea68baa3cdeab9d6bd230877b774a2596`; visible interactives 39/23.
- `/motion/text-motion`: desktop screenshot `e23339ed86139771aab02761ee6af1251d2e9359b528eb498b083abbfdce2b8f`, mobile screenshot `dc8bc8b545e58665ba7b7c15f3378def1d0bd8044c7d53fac8821d4b5038d316`; visible interactives 41/22.
- `/motion/curve-gallery`: desktop screenshot `7a9fb3ce4f4da00a4eeb95db9e72df2568a44b67cb717ddb40450f4ec125b4aa`, mobile screenshot `1a9ced244861ddd4c578c9cdb33862af7106412aabec1843fc3d3b7870557f42`; visible interactives 53/25.

**Exercised causal evidence:**

- INT-009: The semantic target moved through a small overshoot and settled at x=360 px, rotate=18 deg, luma=0.56 by approximately 653 ms.
- INT-017: The named --sp native timeline remained running and the progress bar advanced from scaleX 0 to 0.669856, matching 420/627 within rounding without a JS-authored semantic value.
- INT-020: The dialog panel transition changed 308→572 ms and the trigger transition changed 245→455 ms, both exactly tracking the 1.3/0.7 tempo ratio within computed-style rounding. The portaled ModalOverlay remained animationDuration=transitionDuration=550 ms at both settings because sheet-animate reads the fixed --duration-panel clock. The live story's ONE-clock/every-overlay claim is therefore false at the composed episode boundary even though its focal panel is correctly scaled.
- INT-021: Every row resolved the semantic --spring-bouncy timing function but a literal 500 ms duration; delays were a literal 80 ms step from 80 through 480 ms. The canonical bouncy owner publishes a 570 ms settle reader multiplied by --motion-tempo. The live flagship therefore demonstrates a spring-shaped fixed clock rather than the physical/tempo-coupled spring family it names.
- INT-022: The page says four shipped registers while the live menu and seed strip expose seven and SPRING_PRESETS contains eight with dock filtered only in source. More importantly, the displayed smooth readout is 418 characters with 24 percentage stops beginning 4/8/12/16%, while the shipped token is 824 characters with 48 stops beginning 2.041/4.082/6.122/8.163%; they are not byte-equal. The bouncy subject visibly overshot to x≈372.10 before settling at 360, proving movement but not the advertised CSS identity.
- INT-023: The causal authoring core worked: a pointer drag changed cubic-bezier(0.175, 0.885, 0.32, 1.275) to cubic-bezier(0.445, 1.087, 0.32, 1.275); selecting linear produced cubic-bezier(0, 0, 1, 1); the Steps slider changed 4→9 by pointer and 9→10 by ArrowRight; choosing jump-none produced steps(10, jump-none) with data-reparse-ok=true; and playback advanced the dot. The retained product boundary nevertheless exposed zero semantic/focusable Bezier handles, silently ignored Clipboard rejection, crushed its text playback control into 40×40 px through the forbidden btn-pill+glass-btn stack, and ran a fixed local rAF preview with no reduced-motion or playing-state contract.

## MOT-001 — Semantic spring language and tempo

**Product model:** A small behavior-named Glass spring vocabulary whose generated CSS, direct JavaScript consumers, demos, and docs share one parameter source; upstream curve catalogues and CSS alias names do not become a second Glass callable API.

**Resolution:** Keep SPRING_PRESETS, trajectory bands, generated horizons/configuration, and global tempo projection, including normalized 0.70/1.30 ratio evidence for every channel explicitly claimed by the product. A consumer-owned CSS composition reads both the named trajectory and duration from that owner and separately declares stagger tempo behavior. The Springs lab derives copy/options, solver maxDuration, sample density, rounding, duration, and managed playback from the same generator contract; custom authoring is not mislabeled as a shipped token. Delete suite.ts, curves.ts, /motion-curves, --ease-convergence, the foreign taxonomy contract, and false/unowned local twins. Glass JavaScript consumers read the semantic preset/upstream callable directly; every displayed value derives from that same owner and managed playback. Preserve the actual /easing editor UI, not the catalogue mirror: it keeps upstream math ownership, semantic pointer/keyboard handle parity, explicit copy failure/recovery, a legible content-width play control, and a declared proportionate preview lifecycle/PRM contract. Vocabulary counts and duplicated taste literals are descriptive archaeology, never verification authority.

**Required live states:** press, selection, morph, dock, route, fine, coarse, keyboard handle, copy denied, rapid reversal, tempo 0.7/1/1.3, PRM

**Bound source witnesses:**

- `src/composables/motion/springPresets.ts:68` · blob `67c33531dbed67a2b7a172d16bf8213812f0a37c` · line sha256 `52462170bc96e40b2cf264eaeb359be657e5c39e34db618e39c6880043abb567` · export const SPRING_PRESETS: readonly SpringPresetRow[] = [
- `src/composables/motion/curves.ts:210` · blob `d0823817eb3a97512ec410c48f410ab0c580424c` · line sha256 `edd845cc358972dd529529a23b0e57d3684d0ba2e6d7818d587c98bcd9f4e8fd` · export const MOTION_CURVES: Readonly<Record<string, MotionCurve>> = Object.freeze(
- `src/styles/tokens/scheme-spring.css:265` · blob `84e3623560597073922f8e006f8aa6195e4124cb` · line sha256 `f214f2bc29a3964936c69c171f608e2a9f8a7f21134355dc55c77f1afefc22ed` · --ease-convergence: var(--spring-gentle);
- `demo/stories/motion/springs.vue:132` · blob `19c32798d794a7d6e5f4c9e90adc740efdcfacb5` · line sha256 `e2868dabbbc6be8c61c23fd298b3f1604bfaf478a84819678026f30da9e58325` · if (t < 1) playRaf = requestAnimationFrame(tick);
- `src/components/custom/deck/constants.ts:12` · blob `86b9cf3a639ac73d812472a450bec635f4fc8ead` · line sha256 `f4a6ca31dd82878342325bc89bca9ca119ac0bd76ef638089a450084c979a9fe` · export const DECK_SPRING = { response: 0.5, dampingFraction: 0.85 } as const;
- `demo/stories/motion/curve-families.ts:252` · blob `5e4788036e5440186aa8de36d6296992d3e2729b` · line sha256 `6cab74f18d14d20515f4c0584a8f6824e36470e661c74fb6d42d876c7ce43607` · springRow("dock", "--spring-dock", "springTimingFunction(0.32, 0.7)"),
- `src/styles/tokens/scheme-spring.css:157` · blob `84e3623560597073922f8e006f8aa6195e4124cb` · line sha256 `4d324a72aa8aa08c53bb8c89f410108a0d29019020449ed0acf59687540da01b` · --spring-snappy-duration: calc(var(--spring-snappy-settle) * var(--motion-tempo));
- `src/styles/utilities/btn.css:113` · blob `fec2e900e2ede466be467d9c4768067751f00d69` · line sha256 `b9a970a5de08179335d1bb31c531d30b2c1fefc85da3d54475f4d0a126311024` · data-[state=open]:duration-[var(--duration-panel)]
- `demo/stories/motion/reveal.vue:113` · blob `320488b618f973731b8ac350ec44c256baeccaa9` · line sha256 `e715d45964f820d3ef54d2f4e62c6baf700f4c1f7b29287871f01a44ea9aa1f9` · animation: reveal-rise 0.5s var(--spring-bouncy, ease-out) both;
- `demo/stories/motion/springs.vue:169` · blob `19c32798d794a7d6e5f4c9e90adc740efdcfacb5` · line sha256 `ed3726a3cc0fa912352860aa49e6b9bcdb65c2d192de33b38a17bed0eb61e261` · blurb="The four SHIPPED spring registers, driven off the single-source SPRING_PRESETS table — each fires the SAME JS twin the CSS linear() token is solved from. No local spring solver: the demo teaches the canonical curves, so it can never drift from the vocabulary."
- `demo/stories/motion/springs.vue:98` · blob `19c32798d794a7d6e5f4c9e90adc740efdcfacb5` · line sha256 `a7f81bc54422dc226dbaa17207dedcb32845bd56fdf54155174195415dcaf326` · const playStops = computed(() =>
- `demo/stories/motion/springs.vue:78` · blob `19c32798d794a7d6e5f4c9e90adc740efdcfacb5` · line sha256 `b5738b19c2ab57bdb19e2246abd0f6bbe23ffbe60dcb808d6fc984f24814fc02` · duration: 1100,
- `src/components/custom/easing/EasingPicker.vue:225` · blob `4652687fbc95ec34cc0679ab1f69b64f2783e286` · line sha256 `ab2fcc25f7a5c4f9225ce95e48ac52a4d9d2ec1ff755f3b5183a35b645d2d948` · role="img"
- `src/components/custom/easing/EasingPicker.vue:182` · blob `4652687fbc95ec34cc0679ab1f69b64f2783e286` · line sha256 `27cf4574fc12fd0b6d07261818391756fe8082e69d0f9f493e9a956afa6ea23b` · // fail-explicit: a befitting swallow — the Clipboard API is unavailable
- `src/components/custom/easing/EasingPicker.vue:345` · blob `4652687fbc95ec34cc0679ab1f69b64f2783e286` · line sha256 `c6450da0e644d5a6312f85ea904339b5e4c57706c46f6ed1c5f04527478d3763` · class="btn-pill glass-btn rounded-pill px-3 py-2 text-sm text-foreground"
- `src/components/custom/easing/composables/useEasingPicker.ts:243` · blob `26e75723ffab332ed67c6b9942deec3ab751b602` · line sha256 `74cef36a41f031350b6b355c686e04e1cdb7a49bda39fc46519a81e1e3fbe168` · const t = Math.min(1, (now - start) / TRAVEL_DURATION_MS);

**Actual direct-route evidence:**

- `/motion/springs`: desktop screenshot `410cfd43d875402c555ea0f3265a76144176354349e55a69968578d239e1b8c1`, mobile screenshot `68b9144b5c665c09a2b78a9d3cddb555c9ffeef4c86ba7c582047cd4a6aa537c`; visible interactives 46/30.
- `/motion/tempo`: desktop screenshot `5462d97a12279ffa2f04ebd2126a6015f8744f600800f5d2dcd2f329f99a6c6c`, mobile screenshot `491b7b10a0a952ebd7d5f7580065d023027234a8e2354af705fb7d237333531e`; visible interactives 43/28.
- `/motion/curve-gallery`: desktop screenshot `7a9fb3ce4f4da00a4eeb95db9e72df2568a44b67cb717ddb40450f4ec125b4aa`, mobile screenshot `1a9ced244861ddd4c578c9cdb33862af7106412aabec1843fc3d3b7870557f42`; visible interactives 53/25.

**Exercised causal evidence:**

- INT-009: The semantic target moved through a small overshoot and settled at x=360 px, rotate=18 deg, luma=0.56 by approximately 653 ms.
- INT-019: The live page identified itself as @mkbabb/glass-ui/easing while advertising a FULL 1:1 keyframes inventory. Selecting Springs exposed five live rows, and every rendered springTimingFunction parameter label disagreed with the SPRING_PRESETS row whose description and callable it claimed to present; the Dock row simultaneously showed 0.32/0.7 in code and 0.30/0.82 in prose.
- INT-020: The dialog panel transition changed 308→572 ms and the trigger transition changed 245→455 ms, both exactly tracking the 1.3/0.7 tempo ratio within computed-style rounding. The portaled ModalOverlay remained animationDuration=transitionDuration=550 ms at both settings because sheet-animate reads the fixed --duration-panel clock. The live story's ONE-clock/every-overlay claim is therefore false at the composed episode boundary even though its focal panel is correctly scaled.
- INT-021: Every row resolved the semantic --spring-bouncy timing function but a literal 500 ms duration; delays were a literal 80 ms step from 80 through 480 ms. The canonical bouncy owner publishes a 570 ms settle reader multiplied by --motion-tempo. The live flagship therefore demonstrates a spring-shaped fixed clock rather than the physical/tempo-coupled spring family it names.
- INT-022: The page says four shipped registers while the live menu and seed strip expose seven and SPRING_PRESETS contains eight with dock filtered only in source. More importantly, the displayed smooth readout is 418 characters with 24 percentage stops beginning 4/8/12/16%, while the shipped token is 824 characters with 48 stops beginning 2.041/4.082/6.122/8.163%; they are not byte-equal. The bouncy subject visibly overshot to x≈372.10 before settling at 360, proving movement but not the advertised CSS identity.
- INT-023: The causal authoring core worked: a pointer drag changed cubic-bezier(0.175, 0.885, 0.32, 1.275) to cubic-bezier(0.445, 1.087, 0.32, 1.275); selecting linear produced cubic-bezier(0, 0, 1, 1); the Steps slider changed 4→9 by pointer and 9→10 by ArrowRight; choosing jump-none produced steps(10, jump-none) with data-reparse-ok=true; and playback advanced the dot. The retained product boundary nevertheless exposed zero semantic/focusable Bezier handles, silently ignored Clipboard rejection, crushed its text playback control into 40×40 px through the forbidden btn-pill+glass-btn stack, and ran a fixed local rAF preview with no reduced-motion or playing-state contract.

## MOT-002 — Press and tactile response

**Product model:** Pointer, keyboard, and touch press share one interruptible state/physics owner; material and reciprocal geometry are projections of the same semantic scalar.

**Resolution:** Fold useSpringPress into a private leaf of one public press owner, configure Button/Card/Dock from it, and make the CSS floor exclusive to no-JS/pre-hydration rather than a concurrent writer.

**Required live states:** pointer, keyboard, touch, disabled, cancel, leave/re-enter, rapid repress, focus-visible, pre-hydration, PRM

**Bound source witnesses:**

- `src/composables/motion/useSpringPress.ts:22` · blob `a44c23fe34aaa42bbf30f35f882925b501bc05a3` · line sha256 `b4d34b50108fe596d4d62b81002d034c75d163b363f0968bb1443c10397241da` · const PRESS = springPreset("press");
- `src/composables/motion/useLiquidPress.ts:144` · blob `986bc0ac1dbe15a0e2f9c5833c1036fedc797606` · line sha256 `f8c4466542a9a543d5ef28abc48ee80ca10eb9862919ad6b357f349a6318aa55` · export function useLiquidPress(
- `src/components/ui/button/Button.vue:128` · blob `ee0f8139358617f8bdb16ef8225381f4be2777df` · line sha256 `02fe039d17c3cce3d03e6cbc812b52211f981c63e665965c4a8375bd37c24748` · const press = useSpringPress()
- `src/components/custom/dock/DockControl.vue:124` · blob `495ecf7d70ad258d121b8af663e00d715227fe27` · line sha256 `5868aac398390bac378d7ee5c7a7163f79dd63bf3a1816255a5eaaa6b41d253f` · const press = useLiquidPress({

**Actual direct-route evidence:**

- `/display/buttons`: desktop screenshot `485d5ec01dc203f609380a053ebc10b65401346e4d8b6d34bd964042a827364a`, mobile screenshot `fad0a1605169be05ed14af4c23043778e446ce99b18dc42ae2e34b70a18b0ed6`; visible interactives 61/46.
- `/forms/toggle`: desktop screenshot `544bd47659778fd935c46631cab4df6bd92ec2d0d2363ce45fa37c7c7faf5937`, mobile screenshot `ba96492af13d794259dbef15bc21e97bc20420e28855b3987dbbec3ebe6192cc`; visible interactives 56/39.
- `/dock/layers`: desktop screenshot `98c2ae46540fea449aa69f1eadb38fcc72e8552806606be20b7b16f876e55075`, mobile screenshot `0706f0303242978e095739ac2f46c5bb4deb4382071ee86d28abf018085948cd`; visible interactives 72/58.

## MOT-003 — Spatial morph and FLIP

**Product model:** One measurement/identity/transform owner handles source→destination geometry, interruption, resize, source loss, and completion without local clock copies.

**Resolution:** Keep one public spatial-transition runner on declared upstream playback. Fold reveal, Dock CTA receive, bloom, and applicable Deck-private travel into configurations; delete duplicate measuring, timing, and transform writers.

**Required live states:** source/destination, interrupt, reverse, resize, source removed, focus/identity, settle, PRM, teardown

**Bound source witnesses:**

- `src/composables/motion/useElementMorph.ts:202` · blob `cdffcc2fd2fbac8c670eab931f946299adb35463` · line sha256 `25d18b8b340137a96867f454076ad9a366cc5e4b421cbdbadfa1b442a4d1b78a` · export function useElementMorph(
- `src/composables/motion/useElementMorph.ts:339` · blob `cdffcc2fd2fbac8c670eab931f946299adb35463` · line sha256 `cb50abdced672e2c0f8033f8c2ede16fa9ece7225f94da768260b32a62615603` · raf = requestAnimationFrame(step);
- `src/composables/motion/useBloomUp.ts:205` · blob `5b6528d4357819afab30efe397ba7b0d759bde15` · line sha256 `61a20eb015df3aaa38dc1ca37c3e80aedfc3481b80a5089e370e5322ef962cbf` · export function useBloomUp(
- `src/composables/motion/useDockCtaReceive.ts:100` · blob `9ad016d7a426f05133188f346ca18a26f38d1323` · line sha256 `bada3155a83f3f574bb22fdd9d1ecdc7445f046196b0c84334ce52dcbcdae3e3` · export function useDockCtaReceive(

**Actual direct-route evidence:**

- `/motion/reveal`: desktop screenshot `700c2db5562dc9985925643c705961ea9a1aad7d337aee50b7b80def3a2844fb`, mobile screenshot `bd0b7b89d6ca96c18f74db52022141f48dee2e72f7a1d25f07d737d653da4c73`; visible interactives 36/20.
- `/dock/cta-receive`: desktop screenshot `7fed9f6d623dc48c54a4be7653c3f01ea506c9144446bf67037690e7e79d2068`, mobile screenshot `51c6a8c37c43abc0b67b1a4722739a5eb7b5300bbe6fdfabf2c37ade4ea14569`; visible interactives 38/23.
- `/motion/deck`: desktop screenshot `9150f88d08d101930cec2a06bd081f3e9ad5bdcb4755da5074cb8df6212cd7e0`, mobile screenshot `dae4e79b6b7d7759f374f06f160a6be649d2b329ab1636fe832c92120a7b9462`; visible interactives 44/28.

**Exercised causal evidence:**

- INT-006: The handoff completed and Replay appeared after approximately 2009 ms; the current demo supplies no declared settle band against which that latency can pass.
- INT-018: Pager identity advanced to Go to slide 2, the polite region announced Slide 2 of 6: Keyboard-paged, Prev became enabled, and focus remained on Next.

## MOT-004 — Enter, exit, reveal, and View Transition continuity

**Product model:** State changes remain immediate and correct; native View Transitions or CSS effects add continuity only when they have a single owner and preserve identity/focus through interruption.

**Resolution:** Use native transitions where they preserve identity on the exact supported build; otherwise update instantly. Consolidate enter/exit recipes and prove focus, final visibility, no flash, one writer, and any advertised tempo factor across panel, scrim, trigger, close/reverse, newly constructed JS motion, and named-spring consumer CSS. A replay mechanism has an explicit cancellation/reset lifecycle rather than being treated as evidence merely because nested rAF remounts the nodes. Delete the consumerless public once directive/CSS branch and its self-test; preserve shared once semantics only through actual owners rather than a future-consumer record.

**Required live states:** enter, exit, interrupt, native, unsupported, focus, scroll, final visibility, PRM

**Bound source witnesses:**

- `src/composables/motion/useViewTransition.ts:127` · blob `e0dea38a9178c18a1396f946a7fdd04310c098f8` · line sha256 `779037f159c9c7f8328678f5254309436fd4b885ed3c32da4db637051fadad57` · export function startViewTransition(
- `src/composables/motion/useElementMorph.ts:162` · blob `cdffcc2fd2fbac8c670eab931f946299adb35463` · line sha256 `88277fe11931a13cffae8fb25501b838f6ecc2525be34cdd13b82886ed2024e8` · export function lockSpatialTransition(el: HTMLElement): () => void {
- `demo/stories/motion/reveal.vue:22` · blob `320488b618f973731b8ac350ec44c256baeccaa9` · line sha256 `ae0b7eec2f2fcd44ff4d71aeefa2729b391294e1c045ac2e50895e6364abd25d` · requestAnimationFrame(() => requestAnimationFrame(() => (playing.value = true)));
- `src/composables/motion/useStaggerReveal.ts:123` · blob `270369b8d5817855df8c2a6bcb1a0c058ecd84ac` · line sha256 `7bc591001f89837520967306d4fa16196cef184e255e793b903c541620d95e37` · export const vScrollRevealOnce = {
- `demo/chassis/section/useSectionReveal.ts:13` · blob `e86e5240dbce917231278703558733326ffc8259` · line sha256 `dcd1e9031ee3aed7415047171b8666c6b59d9d0f5b9042749d23289f8aea7519` · // the public-but-unused `vScrollRevealOnce`, which stays untouched. Demo-private
- `src/components/ui/_shared/ModalOverlay.vue:93` · blob `369673b98aee28f187b8f9f82f222351c41beb9f` · line sha256 `fb904de689cdf6e8be49368f096afc3a9f9c783d0e9e470f855ca38309706182` · fade: "sheet-animate",
- `src/styles/utilities/btn.css:113` · blob `fec2e900e2ede466be467d9c4768067751f00d69` · line sha256 `b9a970a5de08179335d1bb31c531d30b2c1fefc85da3d54475f4d0a126311024` · data-[state=open]:duration-[var(--duration-panel)]
- `demo/stories/motion/tempo.vue:63` · blob `b83267b3e247c1588362d8935b4ed5e4cc8fd96f` · line sha256 `682afc5fa8d0d0fa7f2a25986fc0f75d8215d395f10b696b70a949ca9a8f8fa5` · blurb="ONE registered inheriting scalar co-scales EVERY spring clock — the CSS reader (--spring-*-duration = settle × --motion-tempo) AND the JS response (motionTempo() → response × tempo). Slide it and the dropdown, popover, dialog, and the JS dock morph all tighten or lengthen in proportion (the CSS↔JS one-clock coherence). 1.0 is the shipped identity; ⟂ --motion-weight ⟂ --ui-scale."
- `demo/stories/motion/reveal.vue:113` · blob `320488b618f973731b8ac350ec44c256baeccaa9` · line sha256 `e715d45964f820d3ef54d2f4e62c6baf700f4c1f7b29287871f01a44ea9aa1f9` · animation: reveal-rise 0.5s var(--spring-bouncy, ease-out) both;

**Actual direct-route evidence:**

- `/motion/reveal`: desktop screenshot `700c2db5562dc9985925643c705961ea9a1aad7d337aee50b7b80def3a2844fb`, mobile screenshot `bd0b7b89d6ca96c18f74db52022141f48dee2e72f7a1d25f07d737d653da4c73`; visible interactives 36/20.
- `/motion/tempo`: desktop screenshot `5462d97a12279ffa2f04ebd2126a6015f8744f600800f5d2dcd2f329f99a6c6c`, mobile screenshot `491b7b10a0a952ebd7d5f7580065d023027234a8e2354af705fb7d237333531e`; visible interactives 43/28.
- `/containers/dialog`: desktop screenshot `b815a0914d14c58106f41e6a61b1084096d40a9778fc95f92e16359002505c5c`, mobile screenshot `d9b8765b5590ecf724d3e5399d21a4f619e40501861dc292cbd3f19dbf9467b8`; visible interactives 46/30.
- `/motion/deck`: desktop screenshot `9150f88d08d101930cec2a06bd081f3e9ad5bdcb4755da5074cb8df6212cd7e0`, mobile screenshot `dae4e79b6b7d7759f374f06f160a6be649d2b329ab1636fe832c92120a7b9462`; visible interactives 44/28.

**Exercised causal evidence:**

- INT-008: Initial focus entered the Slug input and Escape restored focus to Open glass dialog, but the role=dialog host had no aria-modal and #app was neither inert nor aria-hidden; body pointer-events:none was the only background barrier.
- INT-018: Pager identity advanced to Go to slide 2, the polite region announced Slide 2 of 6: Keyboard-paged, Prev became enabled, and focus remained on Next.
- INT-020: The dialog panel transition changed 308→572 ms and the trigger transition changed 245→455 ms, both exactly tracking the 1.3/0.7 tempo ratio within computed-style rounding. The portaled ModalOverlay remained animationDuration=transitionDuration=550 ms at both settings because sheet-animate reads the fixed --duration-panel clock. The live story's ONE-clock/every-overlay claim is therefore false at the composed episode boundary even though its focal panel is correctly scaled.
- INT-021: Every row resolved the semantic --spring-bouncy timing function but a literal 500 ms duration; delays were a literal 80 ms step from 80 through 480 ms. The canonical bouncy owner publishes a 570 ms settle reader multiplied by --motion-tempo. The live flagship therefore demonstrates a spring-shaped fixed clock rather than the physical/tempo-coupled spring family it names.

## MOT-005 — Scroll-linked motion and reader ownership

**Product model:** A property either follows its owning scroller natively or uses one JS reader/physics path because its semantics need behavior CSS cannot express; the two never shadow one another.

**Resolution:** Keep native scroll/view timelines primary for direct compositor mappings. Keep one JS reader or spring only for semantic events/felt lag, with explicit scroller/property ownership, exact build probes, bfcache/boundary tests, and no native shadow.

**Required live states:** 0%, 100%, nested scroller, fast drag, dynamic pause, bfcache, resize, focus reveal, native, JS-only, PRM

**Bound source witnesses:**

- `src/styles/scroll-driven.css:58` · blob `f82bd52fd9e9a1e63880cad6274b2fdb176b06b6` · line sha256 `9770af1061581c749cd9e98f0c4c0b2d567bc089a061b4581102c58a646823ab` · animation-timeline: var(--scroll-progress-timeline, scroll(nearest block));
- `src/composables/motion/useScrollProgress.ts:42` · blob `3e9b7b012db55b46012ad728d943caf900e46a75` · line sha256 `625d02aa74a83709f7a0eb3cc0cb84194ffb1e384242ecd96239bdbca91d8681` · export function useScrollProgress(
- `src/composables/motion/scrollReader.ts:80` · blob `6efbc1b4b32516b9571c63c59a0ca5694972243b` · line sha256 `b97880e62a18f871ba0428ee92b6c03e352b2f63395781539fa1cd85840a1b18` · export function createScrollReader(
- `src/composables/motion/useScrollScene.ts:134` · blob `44a929c513b92f9a030b28c6cc71a7bbff6ff3ee` · line sha256 `7e43ed658d1cba2cb9818269cdf5f576241da351a4c5b28053885bc5f3027da4` · export function useScrollScene(options: UseScrollSceneOptions): UseScrollSceneReturn {

**Actual direct-route evidence:**

- `/motion/scroll`: desktop screenshot `d5307f2f92b2eb856f480372d140b147464ec54472932604a21568a9c5f8b76a`, mobile screenshot `7cf74a1a486efca203dd71b09565621ea68baa3cdeab9d6bd230877b774a2596`; visible interactives 39/23.

**Exercised causal evidence:**

- INT-017: The named --sp native timeline remained running and the progress bar advanced from scaleX 0 to 0.669856, matching 420/627 within rounding without a JS-authored semantic value.

## MOT-006 — Pointer velocity, drag, and direct manipulation

**Product model:** Direct manipulation owns pointer capture, normalized velocity, bounded projection, target identity, cancellation, and an equivalent keyboard/coarse path; decorative hover is separate.

**Resolution:** Unify normalized sampling and mapping where semantics match, keep event-scoped bridges only when the engine surface cannot express the property, and prove zero idle work, frame-rate independence, capture/cancel, target commitment, and input equivalence. Interactive SVG geometry exposes actual named value-bearing controls whose keyboard and pointer paths converge on the same state owner rather than crediting an image host as operability. Only a declared multi-detent Drawer exposes one named coarse-target slider-equivalent grip: Arrow/Home/End and pointer/touch share activeSnapPoint, focus, announcement, interruption, scrim/stage/paint, and PRM state. Ordinary fixed/content-sized Drawer synthesizes no ladder and renders no handle.

**Required live states:** 60Hz, 120Hz, pointer, touch, keyboard, Arrow/Home/End detents, capture, cancel, nearest target, held still, release, fixed/no-handle, PRM, zero idle frames

**Bound source witnesses:**

- `src/composables/motion/useDragMorph.ts:157` · blob `f1e4b1f3c0e570c278d7929f7fc319ba5b72a80f` · line sha256 `2dcd0b24eb99ea784d6b6e93cf1a612e890d7c78ad58b89e5d2e0d45af12c773` · export function useDragMorph<V = string>(
- `src/composables/dom/useDragVelocity.ts:87` · blob `fae0e47276b1f15a8bef19271c829ff93bb98623` · line sha256 `0ca4d01421ca7b3e2dd3d67b2dbb866bc79afbe3f2d0f220c1f36283427907b3` · export function useDragVelocity(
- `src/composables/dom/useDragVelocity.ts:138` · blob `fae0e47276b1f15a8bef19271c829ff93bb98623` · line sha256 `59142f577b7f740dac7774b0ab56012f506a52aeb7400e5979f7f46783e06050` · rafId = requestAnimationFrame(frame);
- `src/composables/sortable/useSortable.ts:139` · blob `6182399edbc2048e72697a9cb6a60aee1d7fd77a` · line sha256 `f04d4d0a4ec9ae8d876d71f2abbdd0bd56fa0da42442941a3698d8604a118ac3` · onPointerdown: (e: PointerEvent) => {
- `src/components/custom/easing/EasingPicker.vue:226` · blob `4652687fbc95ec34cc0679ab1f69b64f2783e286` · line sha256 `c097f38e4e0710283521a522eb79de52d1b7c377c93cf6c7122c61ee5ef8668c` · @pointerdown="onDown"
- `src/components/ui/drawer/composables/useDrawerSnap.ts:330` · blob `0d1b349fd6e78c189e34ca148b549fed4b3740a5` · line sha256 `b2d88b5f0012cfd5f3c43fc75723bc03d43f866b68911de3860cb265c55e8a99` · handle.addEventListener("pointerdown", onPointerDown);

**Actual direct-route evidence:**

- `/forms/slider`: desktop screenshot `41d6f5e5732c3a517636786af8180d6b6a8b9099390b3e56043a9b41e5cafc07`, mobile screenshot `4818b091ad460d5d4d92f964100aca27ca5938a9f520959d8719a9516d7c626d`; visible interactives 36/20.
- `/navigation/carousel`: desktop screenshot `fc34f7b968032332e6ae226e599b464cb9303146c219f195a0c6ab59ca046032`, mobile screenshot `033745fb9b006cb473d2959359f830ad8656548c530577056d04025dd4e0a593`; visible interactives 51/39.
- `/data/sortable-list`: desktop screenshot `f491504836c7a8e03d8856299fe4dca98c24f492af5059fda1bc52f76f83289c`, mobile screenshot `fd55d283557bbf10f7c06d193b37d843a58591edc0f436195bebda845c91afa3`; visible interactives 50/34.
- `/motion/curve-gallery`: desktop screenshot `7a9fb3ce4f4da00a4eeb95db9e72df2568a44b67cb717ddb40450f4ec125b4aa`, mobile screenshot `1a9ced244861ddd4c578c9cdb33862af7106412aabec1843fc3d3b7870557f42`; visible interactives 53/25.
- `/containers/drawer`: desktop screenshot `02f2f7df5cd693108944f214f14d504ad41b3704c68137bad5abceedb103311a`, mobile screenshot `59c94819b04bf3ad36e8f18e5237a23c8161a6829ae7f378e584df94c086e5c8`; visible interactives 50/34.

**Exercised causal evidence:**

- INT-013: The story rendered no ul, ol, role=list, role=listbox, or listitem semantics; its default reorder handles were span[role=button][tabindex=0] rather than native buttons, measured about 14.93×18.18 px, exposed no draggable/aria-grabbed state, and the polite live region was empty at baseline.
- INT-023: The causal authoring core worked: a pointer drag changed cubic-bezier(0.175, 0.885, 0.32, 1.275) to cubic-bezier(0.445, 1.087, 0.32, 1.275); selecting linear produced cubic-bezier(0, 0, 1, 1); the Steps slider changed 4→9 by pointer and 9→10 by ArrowRight; choosing jump-none produced steps(10, jump-none) with data-reparse-ok=true; and playback advanced the dot. The retained product boundary nevertheless exposed zero semantic/focusable Bezier handles, silently ignored Clipboard rejection, crushed its text playback control into 40×40 px through the forbidden btn-pill+glass-btn stack, and ran a fixed local rAF preview with no reduced-motion or playing-state contract.
- INT-028: The explicit Drawer causally changed its painted scalar and public readout from 0.4 to 0.25. Its only gesture surface was a 1278×25 aria-hidden div with no role or tabindex, and focus remained on the modal Close button. The supposedly fixed content-sized Drawer simultaneously rendered data-glass-drawer-snap-points, mounted the same hidden handle, and a pointer drag changed its scalar from 1 to 0.5 despite the visible claim 'no snap dragging'.

## MOT-007 — Text motion family

**Product model:** Typewriter, accessible visual splitting, numeric interpolation, and countup are distinct semantic mechanisms unified by typography, announcement, cancellation, and PRM—not forced onto one clock shape.

**Resolution:** Keep only distinct mechanisms justified by current runtime ownership and one direct family lab, then clean-break the four compatibility routes. Tests do not create demand, and a hidden default interaction is not a demonstrated product concept. Delete Typewriter's interactive prop and per-glyph click-backspace unless a coherent named editing/rewind control with keyboard/pointer parity is deliberately owned and directly demonstrated. Require grapheme safety, one AT representation, stable numeric geometry, cancellation/reset, declared announcement policy, immediate complete PRM state, and deletion of any public primitive lacking an external receipt or explicit owner decision plus causal first-party use.

**Required live states:** type, pause, delete, cancel, reset, rapid text change, grapheme/ZWJ, increment/decrement, locale, announcement, PRM

**Bound source witnesses:**

- `src/components/custom/typewriter/utils/timing.ts:35` · blob `c5d0cbbc55a1a500efa72124e73b7ca06017ea29` · line sha256 `a5af0f1c7f1c698d5974478a2aa8d3be21a6c770d9f92d54f458ee6ded557018` · export function sleep(ms: number, token: CancellationToken): Promise<boolean> {
- `src/components/custom/split-chars/SplitChars.vue:152` · blob `c37b16229260d353c26467cc05529ac8568d7e61` · line sha256 `fbf2979db649da5b3acfb899bad1b11b0cd193cffe4560c1f2598fdb828ab39e` · :aria-label="props.text"
- `src/components/custom/animated-digit/AnimatedDigit.vue:64` · blob `d4cfc7c55ba0c7732474b15b0795a8f5f8de52ff` · line sha256 `150afc1d94a8f6c60a3441f176f72a6295210f727ebb81f10a0c71010fa348ce` · const animated = useAnimatedNumber(() => props.value ?? null, {
- `src/composables/motion/useCountup.ts:74` · blob `8fced7e9e5bf95d85cf2dae69fb748b45baae53e` · line sha256 `8004ac1285bd607d93f5325bdf1a31f811682ef2fd2045d9f7e66f3a7f0cc0b4` · export function useCountup(

**Actual direct-route evidence:**

- `/motion/text-motion`: desktop screenshot `e23339ed86139771aab02761ee6af1251d2e9359b528eb498b083abbfdce2b8f`, mobile screenshot `dc8bc8b545e58665ba7b7c15f3378def1d0bd8044c7d53fac8821d4b5038d316`; visible interactives 41/22.

**Exercised causal evidence:**

- INT-004: All four family tabs selected distinct live subjects; Countup moved 0/0/0→1280/98/4200 and Typewriter advanced Built on warm c|→Built on warm cream|.

**Component/consumer evidence:**

- animated-digit: retain; 2 tracked external import clauses; first-party demos demo/stories/motion/text-motion.vue.
- split-chars: retain; 0 tracked external import clauses; first-party demos demo/stories/motion/text-motion.vue.
- typewriter: retain; 1 tracked external import clauses; first-party demos demo/stories/motion/text-motion.vue.

## MOT-008 — Deck motion composition

**Product model:** Deck is an ordered presentation state machine with progress, direct/keyboard/touch navigation, focus policy, and announcements; visual travel composes shared/private effects without becoming Deck's identity.

**Resolution:** Retain Deck behavior and PagerDots composition. Delete the inert motion export and global Goo dependency; localize the sole barbell/filter showcase and run it on declared playback with interruption, unique IDs, rest cleanup, PRM, and attributed failure.

**Required live states:** start, middle, end, direct, keyboard, focused-control guard, touch, announcement, interrupt/reverse, two instances, Safari filter, PRM, teardown

**Bound source witnesses:**

- `src/components/custom/deck/composables/useDeck.ts:41` · blob `a7bbb2ad8b877e805a5a6f9a060664efb3b67e6c` · line sha256 `676e9c8199025d7b1db747ad3dc3c6ba1dbaddc0a52f146f9800341806f68f94` · export function useDeck(total: number, opts: UseDeckOptions = {}): DeckCore {
- `src/components/custom/deck/composables/useDeckKeyboard.ts:36` · blob `1d2c4f9103675a5d146e7edb14b93a8c765ee558` · line sha256 `d4ad22ffe39ed3870c48c02080f4264d8506e6a0f10a321a615ea7506b51c7ca` · export function handleDeckKey(
- `src/components/custom/deck/composables/useDeckSpring.ts:50` · blob `bc8f82135180a8e241ffadc8b105f8e865ba18a4` · line sha256 `bf01f5f986ca8c3c7f06e79dcdbe786584ff4f509800d629fdd32225e88e214c` · export function installDeckSpring(): void {
- `demo/stories/motion/deck.vue:36` · blob `fb22f067f4c1a720b1383fcaa85af9e8e0a4d8b0` · line sha256 `23c587e06da1608c59e947c2fc2e94a142686fb92b8abb08d0cf868315eb4a1a` · onMounted(() => installDeckSpring());

**Actual direct-route evidence:**

- `/motion/deck`: desktop screenshot `9150f88d08d101930cec2a06bd081f3e9ad5bdcb4755da5074cb8df6212cd7e0`, mobile screenshot `dae4e79b6b7d7759f374f06f160a6be649d2b329ab1636fe832c92120a7b9462`; visible interactives 44/28.

**Exercised causal evidence:**

- INT-018: Pager identity advanced to Go to slide 2, the polite region announced Slide 2 of 6: Keyboard-paged, Prev became enabled, and focus remained on Next.

**Component/consumer evidence:**

- deck: retain; 0 tracked external import clauses; first-party demos demo/stories/motion/deck.vue.

## MOT-009 — Reduced-motion semantics

**Product model:** Reduced motion removes nonessential travel and continuous work while preserving immediate causal state, focus, announcements, and essential direct manipulation.

**Resolution:** Define one product policy and reactive state projection across CSS and JS while allowing each mechanism to implement its appropriate snap/static path. Eliminate contradictory local policy, hidden final state, and continuous work under reduce. Authoring previews complete immediately with truthful final state under reduce and keep copy/edit/focus causality intact.

**Required live states:** route, overlay, press, selection, deck, scroll, typing, procedural, focus causality, zero continuous frames

**Bound source witnesses:**

- `src/composables/motion/useRAFLoop.ts:70` · blob `b78fb56ea89699694dcbb65debf3ec2233f2e4a7` · line sha256 `5632ed8fd95bcfc1556a55fe31c3f4a1065e073407e5e6229d2a113008e48953` · const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
- `src/composables/motion/useSpring.ts:122` · blob `73092bbc5bd6b12f0c13a37886551e9fc5b8a871` · line sha256 `5af78fa451c2c72a31b646b50f83322afef79c1aff133ecea20d0501a55e7ce1` · respectReducedMotion: options.respectReducedMotion !== false,
- `src/components/custom/typewriter/utils/timing.ts:101` · blob `c5d0cbbc55a1a500efa72124e73b7ca06017ea29` · line sha256 `a82311ab83c81adbeb3e4a1f90ca77089de14cd5e85f519671f1127e6f2fb74b` · export function prefersReducedMotion(): boolean {
- `src/styles/tokens/scheme-motion.css:409` · blob `6ecd8522a29347e308e2db8c6ae1810de3d6d84c` · line sha256 `eff6fb6c701155f835117575f18418aa64c5d92222dda89efe8ce2f76f7e6019` · @media (prefers-reduced-motion: reduce) {
- `src/components/custom/easing/composables/useEasingPicker.ts:239` · blob `26e75723ffab332ed67c6b9942deec3ab751b602` · line sha256 `783e4df02a0f6a7d3562fa9d6e0630c7607b4223d526e2643f51b45e58d50827` · function playTravel(): void {

**Actual direct-route evidence:**

- `/motion/springs`: desktop screenshot `410cfd43d875402c555ea0f3265a76144176354349e55a69968578d239e1b8c1`, mobile screenshot `68b9144b5c665c09a2b78a9d3cddb555c9ffeef4c86ba7c582047cd4a6aa537c`; visible interactives 46/30.
- `/motion/reveal`: desktop screenshot `700c2db5562dc9985925643c705961ea9a1aad7d337aee50b7b80def3a2844fb`, mobile screenshot `bd0b7b89d6ca96c18f74db52022141f48dee2e72f7a1d25f07d737d653da4c73`; visible interactives 36/20.
- `/motion/deck`: desktop screenshot `9150f88d08d101930cec2a06bd081f3e9ad5bdcb4755da5074cb8df6212cd7e0`, mobile screenshot `dae4e79b6b7d7759f374f06f160a6be649d2b329ab1636fe832c92120a7b9462`; visible interactives 44/28.
- `/motion/scroll`: desktop screenshot `d5307f2f92b2eb856f480372d140b147464ec54472932604a21568a9c5f8b76a`, mobile screenshot `7cf74a1a486efca203dd71b09565621ea68baa3cdeab9d6bd230877b774a2596`; visible interactives 39/23.
- `/motion/text-motion`: desktop screenshot `e23339ed86139771aab02761ee6af1251d2e9359b528eb498b083abbfdce2b8f`, mobile screenshot `dc8bc8b545e58665ba7b7c15f3378def1d0bd8044c7d53fac8821d4b5038d316`; visible interactives 41/22.
- `/motion/curve-gallery`: desktop screenshot `7a9fb3ce4f4da00a4eeb95db9e72df2568a44b67cb717ddb40450f4ec125b4aa`, mobile screenshot `1a9ced244861ddd4c578c9cdb33862af7106412aabec1843fc3d3b7870557f42`; visible interactives 53/25.

**Exercised causal evidence:**

- INT-023: The causal authoring core worked: a pointer drag changed cubic-bezier(0.175, 0.885, 0.32, 1.275) to cubic-bezier(0.445, 1.087, 0.32, 1.275); selecting linear produced cubic-bezier(0, 0, 1, 1); the Steps slider changed 4→9 by pointer and 9→10 by ArrowRight; choosing jump-none produced steps(10, jump-none) with data-reparse-ok=true; and playback advanced the dot. The retained product boundary nevertheless exposed zero semantic/focusable Bezier handles, silently ignored Clipboard rejection, crushed its text playback control into 40×40 px through the forbidden btn-pill+glass-btn stack, and ran a fixed local rAF preview with no reduced-motion or playing-state contract.

## MOT-010 — Animation channel truth and measured experience

**Product model:** Animation cost belongs to the resolved property sink and actual browser pipeline: layout, paint, and composite are distinct channels, custom properties inherit their consumers, and a necessary layout reclaim is a measured semantic exception rather than a filename privilege.

**Resolution:** Delete the command and allowlists. Discover CSS keyframes/transitions, Vue Transition recipes, native timelines, and JavaScript writers in the whole current src+demo tree; resolve custom-property sinks; classify layout/paint/composite; and bind CLS, main-thread, layer, and frame evidence to exact Safari/Chrome scenarios. Keep a user-initiated layout reclaim only when its owner proves semantic necessity and budget.

**Required live states:** layout, paint, composite, custom-property layout sink, layer promotion, layer demotion, user-initiated reclaim, continuous scroll, rapid update, PRM, wide, narrow, Safari, Chrome

**Bound source witnesses:**

- `scripts/proof-no-layout-animation.mjs:114` · blob `6b0c5eb064c0253de2321a1beda50ab75f7f2705` · line sha256 `64b5ac8e4525d7c8092588fe5ec82e2f87aa58208798c902ffb09d9af9c79283` · const isReflowProp = (prop) => {
- `scripts/proof-no-layout-animation.mjs:159` · blob `6b0c5eb064c0253de2321a1beda50ab75f7f2705` · line sha256 `f58f3f3767b361a9adb5d58e678f9cc3fe8c4af9c87ea42505d5b9ffed154376` · const TRANSITION_ALLOWLIST = [
- `src/styles/dock/layer-group.css:267` · blob `9a74c7d5f58ab2519771ebf8ab6994dbe6327dfd` · line sha256 `135461e8cb6a3136ef1920bfb1e294282d21277f4ec02d83827f55d72db04871` · width var(--duration-fast) var(--spring-snappy),
- `src/components/ui/progress/ProgressSectioned.vue:252` · blob `4209642cb5c723639aa771ed2f26c73054c3b73b` · line sha256 `16d0db29790fa316b16d6dc03bba01f165787f85c44b72cfaaa8f8eda4aee628` · transition: width var(--duration-slow, 0.45s) var(--spring-snappy, ease-out);

**Actual direct-route evidence:**

- `/dock/layers`: desktop screenshot `98c2ae46540fea449aa69f1eadb38fcc72e8552806606be20b7b16f876e55075`, mobile screenshot `0706f0303242978e095739ac2f46c5bb4deb4382071ee86d28abf018085948cd`; visible interactives 72/58.
- `/data/timeline`: desktop screenshot `225fdb0c21baa4128684e5c52fd6fa69bf6302dcfae97fe68ffbaa60483eccfe`, mobile screenshot `8f9de52f815fcc64879a17e37231c4be7c8e368a5d4a8f01bb75d3c51511ea33`; visible interactives 46/30.
- `/feedback/progress`: desktop screenshot `5022d006d9dcc7c8d7018d92c70accc2b0926c1a2b2e8036ab83fe7e986175cb`, mobile screenshot `8d63c9675b82a6a8046d2fe286f8428e87f5797041aafd54858c75d12ea8ba74`; visible interactives 33/18.
- `/motion/scroll`: desktop screenshot `d5307f2f92b2eb856f480372d140b147464ec54472932604a21568a9c5f8b76a`, mobile screenshot `7cf74a1a486efca203dd71b09565621ea68baa3cdeab9d6bd230877b774a2596`; visible interactives 39/23.

**Exercised causal evidence:**

- INT-007: The readout changed to active layer = layers, while inactive crossfade faces remained in the accessibility tree as blank buttons/generics.
- INT-017: The named --sp native timeline remained running and the progress bar advanced from scaleX 0 to 0.669856, matching 420/627 within rounding without a JS-authored semantic value.

## Credit boundary

The in-app browser observations establish current research facts only. They do not substitute for native Safari/Chrome builds, applicable π matrices, PRM emulation, performance/resource instrumentation, implementation, release, publication, or Atlas FINAL.
