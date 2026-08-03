# Dock structural critic 1 — topology, ownership, KISS, and colocation (C33)

**Date:** 2026-07-22

**Mode:** formation-only, failure-assuming independent critic 1

**Scope:** systems/topology/KISS/colocation; no product or source edits; no test, gate, package, lock, repin, or browser execution

**Disposition:** **REJECT the present Dock topology as the target architecture.** Retain it only as evidence for invariants and failure cases. Compare a one-box semantic topology first; admit a reserve shell only if the already-owned zero-CLS/safe-frame contract proves that second box necessary.

## 1. Evidence identity

All paths are repository-relative. The three controlling packets were read in full:

| Evidence | SHA-256 |
|---|---|
| `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/DOCK-STRUCTURAL-SIMPLIFICATION-WORKFLOW-C30.md` | `44726bb749bb703cefb461bf86ba0a15c699dec771b90675992d88ed57efb2ba` |
| `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/DOCK-STRUCTURAL-ANATOMY-C31.md` | `03855f128b8ef9aa3fa21de154725c68b21c3b2e40b937d28d25363943acb8e1` |
| `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/DOCK-DUAL-BROWSER-ASSAY-B-C32.md` | `effce7e7b6f1662b06dc5dbaf5ef90c9a7e727e24374dd54271c8caea7303121` |

Assay-A's living record was also traced as context, not treated as a substitute for manual image inspection:

| Evidence | SHA-256 |
|---|---|
| `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/BROWSER-ASSAY-A-LIVING-FINDINGS-C29.md` | `bb77dae502b7c75d600898dec70c90f9f5994e7c46f8751af70c11487488b010` |

### 1.1 Manually inspected PNG evidence

These files were inspected as images, at original detail. No browser was run for this critique.

| Assay | Exact evidence path | SHA-256 | Manual structural observation |
|---|---|---|---|
| A | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-a/dock-overview-mobile-rest.png` | `aa4d4f15119924e7729cc015cf10e18289386dfc82261b78b57c2b0540bf4f75` | Compact and expanded specimens coexist with a separate global bottom Dock, exposing three independent chassis/posture owners in one scene. |
| A | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-a/dock-mobile-first-press-onset.png` | `c45aeb702e608b430027ec6253f1ba4e72970f74d3097f23cc6baa124d56d53d` | The first transition is visibly oversized, softened, and clipped; this is not merely a paint polish defect. |
| A | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-a/dock-mobile-first-press-settle.png` | `81b88341aac61ac50b1f71afaf5503e28abc0e74232634c99379b82ade628cab` | The two specimens have cross-coupled posture after settle, making story ownership itself suspect. |
| A | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-a/dock-sections-mobile.png` | `c0ace03d19d3281bc727c85b556efca2f909199074938bb2cf975cf743f7b366` | The trailing control is clipped by the row/chassis relationship. |
| A | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-a/dock-cta-morph-mid-mobile.png` | `4fedeae17ced921a2a883082b88f2403bc5993d14bf000e60a86f9eb2d0c0166` | The nominal CTA mid-state communicates little action while its state machine remains active. |
| A | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-a/mobile-compositions-story-chassis-rest.png` | `20700cc047885fdb50e9c14b66bfda080d1c728ca7add15c31345fbd37da4594` | The global Dock overlays Grid content; page-slot ownership is unresolved. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/desktop-dock-overview-click-0040ms.png` | `07aa8042d07d8741a6f2b1e04a05c0e207152fca7a9a2e8c8c33e3a5cd598b52` | Early click posture already couples shell geometry and face treatment. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/desktop-dock-overview-click-0220ms.png` | `eec61a8a4ca839a5bf68c5d2989482123452a2129c6a51e552500d5e68506341` | A second geometry result is visible after the nominal morph flag clears: the settle/rebase is architectural. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/desktop-dock-layers-switch-0000ms.png` | `37f54014edaaf33d1282283fc6cf8f230637c663183c08d242d3ad02114ac6d6` | Layer-switch start is visually indistinguishable from the later sample. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/desktop-dock-layers-switch-0220ms.png` | `16ffeb8981579670b2c5f36fc38ee5188da5779be6f288ad031e98262a0f2f31` | The crossfade owner outlives its useful visual signal. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/mobile-dock-sections-rest.png` | `1eb3e51e673d13e75dcdb40511d41f8f620684c4956d36286e59ea9f6fa1c9b7` | Ordinary section content is internally clipped on the narrow target. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/mobile-dock-search-rest.png` | `9830dc624e188083637089f8913dbc10f04b3eafd88da3e20fe758ba04fa41c8` | Search is clipped while the story bypasses the collapsed-to-search path that would test the real ownership seam. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/mobile-dock-overflow-rest.png` | `de06d7619f8dff33b53199373b9a65274d893557c7d2a0a543ab7f4dc3c1c507` | Native horizontal overflow is present and usable. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/mobile-dock-overflow-end-key.png` | `6db74323514e16a20834a28c807e741be1b8469796d88274c30397e109dc0a69` | End moves selection/focus from Home to Settings and recenters the native scroller. This is **GREEN and non-negotiable**. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/mobile-dock-cta-run-0900ms.png` | `0a98cda00327d1484a6fbea5c510d2df310b464cdd8b8572c40f456fc1b4bbb6` | Geometry has substantially arrived but the action remains in an ambiguous dim/void interval. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/mobile-dock-cta-run-2300ms.png` | `af05ea69517174ffbedde99c3e7230c377cb02cc21111ff18cfbccbb12d3da38` | Terminal CTA presentation waits roughly two seconds beyond useful geometric arrival. |
| B | `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/evidence/browser-assay-b/mobile-dock-overview-first-0250ms.png` | `19b58b54d8e89f6947696ad056d47ec47d5dcb687e0083397deb08bee5a25d3c` | The post-flag width has rebased on mobile as well, so the desktop finding is not target-specific noise. |

### 1.2 Targeted source identity

The following source owners were manually inspected. Hashes pin the exact reviewed state.

| Source | SHA-256 |
|---|---|
| `src/components/dock/GlassDock.vue` | `5c9be8abf9aaa06ddb70b3e564d6962416c56aa9af08f0ecedd7915a06121a5a` |
| `src/components/dock/DockCrossfade.vue` | `8492640cde5f970a974bdb6f8d3bd8625e1f06714827f46449791039cd56f2eb` |
| `src/components/dock/DockLayerGroup.vue` | `d23b1c281e70d262198024ebe4311cb0d81aa913890a098930b754943941b998` |
| `src/components/dock/DockLayer.vue` | `a66676b345418e6ae67b7cc0273c4a03877bde936fbdb19b0c93f9e4086f013f` |
| `src/components/dock/DockControl.vue` | `6e99c6d17edd964674530e770cec8fd631d80fc50f99ce47cd428d3c32a0e810` |
| `src/components/dock/DockTrigger.vue` | `5f6232598bd8bcae5ea5d37731ae22ed28789d56ab1ad45839dd51646be98f34` |
| `src/components/dock/DockSeparator.vue` | `7ebecc6a769a57837a641be882bd37d84c50721c746c80daaaddf8e5eb702129` |
| `src/components/dock/DockBackgroundToggle.vue` | `05fd4c50c8d7937f37e4311bfc58ab5e1136fe021feea625bc1ddd8243ddaca4` |
| `src/components/dock/composables/useDockState.ts` | `a1784c945279075f14a7eefc7b7b01f3262d720501a9517ecca1fd7d614d662e` |
| `src/components/dock/composables/useDockMorph.ts` | `e50b67d42635778a179f4ffaa2f4506bb7b6a5a2730c2d0a4ba8deda118fe099` |
| `src/components/dock/composables/dockMorphMeasure.ts` | `cd729a8bb276749f5ecc707c60358f59aa6369f2200e6fc1856f68a071a5d3a7` |
| `src/components/dock/composables/useDockSpring.ts` | `68e9ce27c2932826a8c1e61b02a86a51c8d960853cad239ce6a61925a581482f` |
| `src/components/dock/composables/useDockClickIntegrity.ts` | `a7254ec249d491746f22fb884eee03ea13fd2ebeedd9bc2a34753aae5a9f3edf` |
| `src/components/dock/composables/useDockTouchGate.ts` | `ce44243fcb64dbd30ae1bd91b34a44daa172769ab434ad8e462f8ee803427323` |
| `src/components/dock/composables/useDockOverflowFit.ts` | `ef65f2e2a272b52c44780354ba8ff884f4d5820e619ea84c7478788e4d2d79d2` |
| `src/components/dock/composables/useDockSearch.ts` | `1ce6ffe83d8886c3dd25cdb0caeecb7a44ede5853fd073d62d81ee91d33161e8` |
| `src/components/dock/composables/dockContext.ts` | `2906aeee7e55b186e8831782c141011a7d5a048c424b05ca14948871ff1e05aa` |
| `src/components/dock/composables/dockCrossfadeContext.ts` | `bb9472eeb29b9d40eac9a69ba931f03518188cd75bb7d812300877663e71d22e` |
| `src/components/dock/composables/dockRailContext.ts` | `b0e04b5e89a7d0396b40067c0d5bdd645e9c33ba79d07e243f0e9632fb621cdd` |
| `src/components/dock/composables/isTeleportedTarget.ts` | `761170490bad629e0cdbcf547dd46cb3e7d1ded2183dcee232a47e3dfeac6ff0` |
| `src/composables/motion/morph/useDockCtaReceive.ts` | `ce89fdcfcc2cbeb05488601c91b56acf0a3d6a5a0a37614db06c09ca778a1cdd` |
| `src/components/dock/styles/dock.css` | `84f5d7bba9405da56262e90bcbce0c485e6c82a4fbe7088825b35761f7d996af` |
| `src/components/dock/styles/shell.css` | `6d62d2b2408548e54d562fb4a13663aea846e609adf317870ac4bb1688153280` |
| `src/components/dock/styles/layers.css` | `b38ad95acced92ffe614dd6c8eacbdaa9800f77a6ea28b5eb729d9379810de4d` |
| `src/components/dock/styles/morph.css` | `d6196bb4dd2c11408d30f22a094f901b68880dc1306168a2aefea8e282099b4c` |
| `src/components/dock/index.ts` | `7cde9de3de51b027f7728f984150b1e30cb583572daf23818b7b51810ba2587b` |
| `src/components/dock/README.md` | `cfa2848783a7d2e255278ce7f5a686871bb620bc7dac39dbf6489b770d88c7d8` |
| `tests/public-surface.spec.ts` | `41b3ab1f302731960c8c0cde5d19a2bbca99524c31ea19d25196cc1e4ef5a73f` |
| `package.json` | `44de86637c98b7b6310cd6614fa77f59b2517b42097945295806b00f88a5b914` |

## 2. Verdict

The Dock has one real semantic object but implements it as several partially overlapping machines:

1. a logical collapsed/expanded machine;
2. an endpoint-measured root size transform;
3. inverse child transforms that compensate for the root transform;
4. a separate face registry/crossfade spring;
5. a native overflow rail plus fit-mode observer;
6. a touch gate and a click-integrity transaction that can both affect collapse;
7. a click-away/portal-membership system;
8. independent search, selection, backdrop-sampling, and CTA machines;
9. story/page chassis that can impose another posture or slot owner.

Several of those machines protect real invariants. Their current *topological realization* is not itself an invariant. The B1 two-step settle, the B2 invisible crossfade tail, the B3 CTA wait, B4 page overlap, B5 clipping, and the Assay-A first-press distortion are predictable consequences of duplicate geometry, time, aperture, and state ownership. They should not be repaired by tuning another duration, scale, observer, clip, or z-index.

The KISS burden is therefore reversed: the current topology must prove each extra box, scalar, observer, context, and public symbol. It presently cannot.

## 3. Necessary invariants versus compensations

### 3.1 Necessary invariants

- One logical posture/interaction owner decides collapsed, expanded, held, pinned/manual, and close eligibility.
- The collapsed semantic control layer remains stable and usable until activation is safely committed; expansion must not create a dead or ambiguous target interval.
- A press begun on one control must not be retargeted to a different control while geometry moves. Same-control activation must still succeed at rest or at the bounded transaction deadline.
- Pointer-down-open controls must participate in that same transaction. A later click guard is insufficient when a dropdown can already open on `pointerdown`.
- Touch scroll intent must not become tap activation, and tap-to-reach must remain possible.
- The active/focused item remains reachable through native keyboard navigation. In particular, the Assay-B End-key GREEN result—Settings selected/focused and the native rail recentered—must survive.
- Teleported content that is logically inside one Dock must not trigger that Dock's click-away close, and must not become logically inside a different Dock.
- Selection, focus, and ARIA relationships remain coherent across a face/posture change.
- The owned zero-CLS and safe-frame/page-slot contracts remain testable. They do not authorize a permanent bottom overlay or a reserve layer by default.
- A visual motion has one authoritative progress generation and one logical origin/terminal transition. Multiple derived values are permissible only when they are pure functions of that progress.
- Backdrop luminance, search disclosure, overflow correction, selection, and CTA receipt may remain distinct domains only where they do not also write Dock posture, geometry, or animation completion.

### 3.2 Current compensations, not invariants

- Scaling the root to measured collapsed/expanded endpoint sizes.
- Inverse-scaling direct children so controls appear not to scale with the root.
- Re-measuring both endpoints with observers and rebasing after the morph attribute clears.
- A negative-z plate element that is documented as decorative and `aria-hidden` but also has pointer events and is described in CSS as the hit surface.
- A `display: contents` controls node carrying `overflow` and pointer-event declarations despite having no principal box.
- Root blur during morph, reveal blur, and a separate crossfade opacity spring.
- A running maximum crossfade peak that can increase but not contract with current content.
- Root and plate clip/aperture machinery, including a collapse inset whose default makes it a no-op.
- Direct DOM `inert` mutation on sibling branches as the way click integrity is expressed.
- A fit attribute observer as the owner of overflow semantics. Native scrolling and End-key behavior are the invariants; this attribute is only a presentation/mask switch.
- Public context keys/providers and registration records as proof of a public component boundary.
- A separate public background-toggle component when ordinary consumer composition may be sufficient.
- Long CTA horizon/judge timing after the geometry has already communicated arrival.
- Unscoped `[data-reserve]` rules in Dock CSS when no Dock source emits the attribute.

## 4. DOM-layer challenge

| Present layer | Claimed/current job | Failure-assuming challenge | Smallest accountable disposition |
|---|---|---|---|
| `.glass-dock` root | State attributes, transform, clip, filter, context, event boundary | It is simultaneously semantic owner, measuring target, transformed visual shell, clipping aperture, and event surface. The role collision forces descendants to compensate. | Keep one semantic/hit/layout root, but do not scale or blur it. It owns posture attributes and the actual interactive boundary. |
| `.dock-plate[aria-hidden]` | Optical plate, negative-z surface, pointer hit surface | `aria-hidden` decoration and pointer-enabled hit ownership contradict each other. Negative z also makes hit behavior dependent on stacking details. | Paint from the real root or a non-interactive pseudo-element. No independent event owner. |
| `.dock-controls` with `display: contents` | Selector grouping and counter-scale conduit | `overflow: visible` and `pointer-events: auto` cannot make this a meaningful structural box. Its persistence is evidence that selectors/scales, not semantics, own the tree. | Either flatten it or make it the single conventional content/scroll box. Do not keep a boxless behavior layer. |
| leading `.dock-persistent` | Always-present content and inverse transform | Persistence is real; a separate inverse-transform wrapper is not. | Keep content grouping only if it provides layout/ARIA value. No counter-scale. |
| `.dock-layers` | Selected face stack, rail, inverse transform | It combines layer selection, clipping, grid overlap, rail, and transformed geometry. | One content/rail box; faces use ordinary presence/visibility semantics derived from the one posture/selection owner. |
| `.dock-layer` | Full/summary face host | Full and summary DOM can be necessary for continuity, but both need not be independent geometry owners. | Keep the minimum semantic faces proven by focus/ARIA continuity; do not grant each a motion scalar. |
| `.dock-crossfade` / `.dock-face` / `.dock-face-content` | Separate face registry, measurement, focus transfer, spring, clipping | A second spring and measurement registry produces an invisible tail and exposes element registration as architecture. | Fold focus/ARIA handoff into the selection/posture owner; derive any dissolve from the single progress or use a discrete handoff. |
| trailing `.dock-persistent` | Always-present trailing controls and inverse transform | Assay clipping shows that persistence does not guarantee reachability. | Place in the same native layout/scroll system; persistent does not mean outside overflow accounting. |
| `.dock-search-field` | Search surface appended beside layer system | It is a parallel branch while its composable needs a state object the public Dock does not expose. | Search must either be an owned face of the same posture machine or an external consumer with a real public construction seam—not both. |
| Dock reserve selectors | Safe-frame/reserved footprint | Dock CSS globally targets `[data-reserve]`, yet Dock does not emit it; `InstrumentChassis` does. This is orphaned, cross-component policy leakage. | Reserve belongs to the actual host/page-slot owner. Scope there or delete from Dock CSS. |

The minimum justified DOM is therefore not “root + plate + boxless controls + persistent wrappers + layer grid + face-content wrappers + search sibling.” The burden starts at **one semantic shell plus one conventional content/native-scroll box**. A stable reserve wrapper is a conditional host concern, not part of the default component anatomy.

## 5. State-owner challenge

| Owner | Writes/decides today | Contradiction or duplication | Required boundary |
|---|---|---|---|
| `useDockState` | collapsed, hover dwell, pinned/manual posture, collapse timer, outside click, holds, portal membership | This is closest to the legitimate logical owner, but its transitions can also be initiated or suppressed by touch, click-integrity, portal, search, and story owners. | Retain one reducer-like authority for posture and close eligibility. Other domains send facts/events; they do not independently settle posture. |
| `useDockMorph` + spring | root progress, morphing flag, origin, end transition, CSS scalars | It treats geometric interpolation as a separate truth from logical posture. The flag clears before the remeasured layout settles. | One motion progress derived from the posture transition; terminal state includes actual stable geometry, not merely spring completion. |
| endpoint measurement | collapsed/expanded dimensions, current scale | Measurement is feeding a transform whose descendants then inverse-transform. B1 proves the feedback/handoff is visible. | Prefer ordinary layout. If measurement survives, it may observe for proof or a single stable reserve—not drive competing endpoints every transition. |
| `DockCrossfade` + registry/context | leaving face, per-face opacity, peak measurement, focus transfer, separate spring | A second active spring means “one spring factory” is not one timeline. Its running peak and morph flag can outlive visible benefit. | Focus/ARIA handoff remains; independent time and geometry ownership do not. |
| `DockLayerGroup` | selection, drag morph geometry, ARIA IDs, registry, rail, indicator, focus hold | This is an orchestration bundle, not a minimal component boundary. It makes selection, layout, motion, and accessibility inseparable. | Separate semantic selection/ARIA facts from optional drag/visual treatment; only one writer for selected posture and lens/indicator geometry. |
| click-integrity owner | pointer identity, deadline, live morph, keepalive, sibling `inert` | It protects a real race, but mutates interactivity beside the logical state owner and cannot undo a dropdown already opened on pointerdown. | Preserve the transaction contract and cross-target safety; move all activation phases, including pointerdown-open, behind it. |
| touch gate | tap/scroll discrimination and collapse reaction | It can become another collapse writer. | It reports gesture intent to the posture/activation owner. |
| overflow-fit owner | observes content and stamps fit mode | It conflates mask/presentation mode with the native rail's semantics. | Native overflow remains the semantic/a11y owner; fit/detent treatment is a derived presentation policy. |
| search composable | armed/open state, fuzzy results, optional chrome scroll | It requires a `UseDockStateReturn`, but the public subpath exports only state types, not the runtime constructor. The story deep-imports a second state while `GlassDock` owns a private always-expanded state. | Either consume the Dock's actual state through a supported seam or remain wholly external. No shadow posture owner. |
| backdrop luminance owner | luma sampling and visual signal | It is independent only while it does not drive posture or composited geometry. Current behavior is already RED elsewhere. | Route behavior to the existing composited-signal owner; do not use structural simplification to bless it. |
| CTA receipt owner | pending, playing, progress, phase, terminal judgment | Its ~1.92s horizon/judge can keep a semantically empty interval alive after geometry arrives; the story adds another `received` state. | One receipt lifecycle; visual geometry and semantic terminal event must agree within the existing CTA owner. |

## 6. Scalar and measurement challenge

The present scalar graph includes root `--dock-morph-t`, derived expand progress, overloaded `--dock-t`, live size scale, inverse child scale, child reveal, reveal blur, crossfade peak, optional chrome-collapse progress, and CTA progress. Registration/inheritance differences do not make these independent truths safe.

| Scalar/measurement | Why it exists | Critic finding |
|---|---|---|
| root morph progress | outer geometry interpolation | Candidate for the sole authoritative visual progress, but only if geometry actually settles with its terminal state. |
| expand alias/derived progress | direction-normalized consumers | Acceptable only as a pure derivation; not another writable transition. |
| overloaded `--dock-t` | plate alias and per-face opacity | Same name represents unrelated meanings at different scopes. This obstructs ownership audit and should not survive topology comparison. |
| live size scale | maps measured endpoints onto the root | Compensation. It is the source of descendant counter-scale and the B1 rebase. |
| inverse child scale | cancels root scaling for content | Definitive compensation: if the parent transform were semantically right, every direct content branch would not need to undo it. |
| child reveal / reveal blur | conceal transformed content during handoff | Paint compensation for topology/timing mismatch; root blur is already born-RED in the parent packet. |
| crossfade progress and peak | separate face dissolve/peak height | Duplicate time and geometry; B2 shows it can remain active after useful opacity. Running maximum also preserves stale geometry. |
| collapse inset / root and plate clip | aperture shaping | Default no-op plus duplicate clip surfaces. Keep at most one aperture derived from the one progress, and only if comparison evidence proves it necessary. |
| ResizeObserver endpoint pair | collapsed/expanded dimensions | Feedback source for the two-step settle. Ordinary layout is the baseline, not an optimization left untried. |
| MutationObserver fit tracking | toggles fit mode | May be justified for masks, not for native reachability. Its removal must not remove native scrolling or End-key recentering. |

The hard rule for comparison is: **one writable posture transition, one writable visual progress, zero counter-scales, zero motion blur, and no measurement-to-transform-to-remeasurement loop.** Derived opacity, aperture, or indicator coordinates must be pure and must end when the authoritative progress ends.

## 7. Context and portal-marker challenge

| Mechanism | What is actually necessary | What is not yet justified |
|---|---|---|
| Dock context | Orientation/layout facts, hold/release, and one Dock identity can legitimately cross descendants. | Public exposure of the context key/provider as an extension API without a proven external custom-chassis consumer. |
| crossfade context | Today it registers face elements and measurements. | A public-ish registration topology whose only reason is the duplicate crossfade/measurement machine. Delete with that machine unless a semantic focus/ARIA need survives. |
| rail context | Carries ARIA relationships. | A separate context object if the reduced semantic tree can express the same IDs locally. ARIA is invariant; this exact transport is not. |
| `data-glass-dock-portal` | Teleport provenance is necessary while document-level click-away exists. | The exact attribute spelling or DOM-marker implementation is not sacred. |
| `data-glass-dock-owner` | Owner specificity is necessary: without it, a portal for Dock A can be mistaken as inside Dock B. | Stamping two markers on every supported overlay if logical containment can be conveyed through a smaller, tested membership mechanism. |
| hold/release through overlay components | A genuinely interactive teleported surface may need to keep one Dock open. | Inconsistent opt-in semantics among dropdown/select/popover and public policy that leaks Dock internals into otherwise generic overlays. |

Do **not** delete owner-specific teleported membership as “simplification.” Its removal must be born-RED in a two-Dock portal case. Conversely, do not use the markers to justify the rest of the context graph.

## 8. Public-surface and colocation challenge

The reviewed public subpath exposes runtime components/composables/context machinery and separately exposes state *types*. That does not prove each symbol is a durable public boundary.

| Surface | Failure-assuming question | Formation disposition |
|---|---|---|
| main Dock component | Can it own one semantic shell without hiding a second state machine consumers must reconstruct? | Keep concept; radically reduce internal topology. |
| control primitive | It has no Dock-context requirement and is also used outside Dock. Is it actually a Dock primitive or a generic control style? | Consumer census before deciding home. Do not retain location because of its name. |
| trigger primitive | Does it transactionally gate pointerdown-open as well as click? | Semantic role may survive, current activation boundary does not pass. |
| separator primitive | Does its `anchor` input affect Dock behavior? Reviewed source only emits `data-rail-anchor`; no Dock reader was found. | Treat the anchor seam as dead until a real consumer is shown. Orientation/a11y may still justify a separator. |
| layer group | Why must selection, drag geometry, ARIA IDs, registry, rail, indicator, and focus hold share a public component? | No justification. Compare against internal/local composition. |
| layer component | Is public element registration/measurement a consumer need or an implementation leak? | Assume implementation leak pending external consumer proof. |
| crossfade component | A direct demo/test consumer is not proof that a second spring/registry is a product primitive. | Remove from the baseline comparison; earn it back only with semantic evidence. |
| background toggle | Is a thin preset more valuable than ordinary composition? | Re-open with actual consumer census; do not mint a new reduction row. |
| search composable | How can a public caller provide required runtime Dock state when the Dock keeps its state private and the public subpath exports no constructor? | Current boundary is hollow. The always-expanded story is not proof of collapsed search integration. |
| CTA composable | Does Dock own the receipt lifecycle, or is this a generic motion utility with a Dock name? | Existing reduction/colocation owner already says keep and rehome; this critique only re-opens behavior/ownership coherence there. |
| public context key/provider | Which external custom chassis depends on constructing Dock context? | No proof in the inspected evidence. Public internals need a census, not presumption. |

Additional surface contradictions found during source inspection:

- README collapse timing says `2000ms`; the reviewed state owner resolves `3600ms`.
- Shell comments refer to a `containerName` property not present in the reviewed Dock props.
- The separator's anchor marker has no reviewed Dock reader.
- Dock CSS owns global `[data-reserve]` behavior while another component emits that attribute.
- The package surface exports the runtime search composable and state return types but not the runtime state constructor the composable requires for external construction.

These are boundary/ownership failures, not documentation nits.

## 9. Smallest comparison topologies

No speculative API names are selected here. These are structural comparison candidates only.

### Topology 0 — one semantic shell

```text
semantic hit/layout root
└── conventional content + native-scroll box
    ├── persistent/summary controls (only if semantically persistent)
    ├── selected face/content
    └── trailing controls in the same reachability model
```

- The real root owns hit-testing, posture attributes, shape, and focus boundary.
- Optical plate paint is a non-interactive pseudo-element or root background.
- Ordinary layout changes size. No endpoint transform, counter-scale, root blur, or post-flag rebase.
- One state owner accepts pointer, touch, hover, hold, outside-click, and portal-membership facts.
- One progress generation may derive opacity/aperture. A discrete face handoff is preferred unless a dissolve demonstrates material benefit.
- Native scrolling remains. Keyboard Home/End and programmatic recentering operate on the real scroller.
- The collapsed semantic layer remains present/targetable until its activation transaction commits.

This is the baseline. Any missing capability must be demonstrated, not imagined.

### Topology 1 — host-owned stable reserve plus one semantic shell

```text
host/page-slot reserve (non-interactive, stable footprint)
└── semantic hit/layout root
    └── conventional content + native-scroll box
```

- Add only if the zero-CLS/safe-frame owner proves Topology 0 cannot satisfy adjacent-content layout.
- The reserve belongs to the host/page slot, not a generic global Dock CSS selector.
- The inner shell still uses ordinary layout and one progress generation; reserve geometry is stable rather than another animated endpoint.
- This topology must compare the actual selected placement. The current Atlas evidence has a vertical adjacent side slot; bottom overlay is not the default answer and requires owner authorization.

Topology 1 is not permission for `root scale + inverse children` inside a reserve. It is a narrow comparison for stable page allocation.

### Required comparison matrix

Both candidates must be compared under the same scenarios:

1. first press on desktop and mobile, sampled through onset, logical completion, and true stable geometry;
2. same-control activation during movement and different-target press/release races;
3. pointerdown-open dropdown activation during movement;
4. touch tap versus horizontal scroll intent;
5. native overflow with Home/End, especially Settings reach/recenter on the 290px-class mobile viewport;
6. face/layer switch with focus and ARIA continuity;
7. search from collapsed state, not an always-expanded bypass;
8. teleported overlay membership with two Docks;
9. adjacent-content safe frame and zero CLS;
10. RTL and vertical posture owned by existing Greenfield work;
11. CTA geometry arrival versus semantic terminal time;
12. reduced motion.

Do not select a posture or public name from this critic. W7 fission remains parked, and final exposure stays with the existing W3/W9 owner.

## 10. Mutation ledger

### 10.1 Born-RED mutations for necessary invariants

Each mutation below must fail before a replacement topology can claim equivalence.

| ID | Mutation | Required RED observation | Owner protected |
|---|---|---|---|
| C33-M01 | Replace the native overflow box with a transform-only visual strip. | End no longer moves to/focuses Settings, or the active item cannot be natively recentered/reached. | Native overflow/keyboard reachability. |
| C33-M02 | During a moving Dock, begin on control A and release over control B with no transaction guard. | B activates or A's valid bounded activation is lost. | Cross-target and same-target click integrity. |
| C33-M03 | Allow a dropdown-like trigger to open on pointerdown before transaction acceptance. | Overlay opens even though the later click would be rejected after geometry retargets. | `Q-G6` pointerdown correction. |
| C33-M04 | Treat any `data-glass-dock-portal` as inside every Dock by removing owner specificity. | A portal belonging to Dock A suppresses outside-close for Dock B. | Per-Dock logical containment. |
| C33-M05 | Collapse while an owned teleported interactive surface is active. | Focus is displaced or the Dock closes underneath its logical child. | Hold/release and close integrity. |
| C33-M06 | Switch faces without transferring/retaining the semantic active relation. | Focus lands in hidden content, ARIA ownership breaks, or selection and visible face disagree. | Focus/ARIA continuity. |
| C33-M07 | Let touch movement pass through the tap activation path. | Horizontal scroll intent activates a control or collapses the Dock as a tap. | Touch intent gate. |
| C33-M08 | Remove the host safe frame where adjacent content depends on it. | Dock overlaps content or causes non-zero layout shift. | Existing safe-frame/zero-CLS contract. |
| C33-M09 | Expose the collapsed interaction layer only after visual expansion completes. | First tap becomes a reveal-only/dead activation or the target changes identity mid-press. | Tap-to-reach semantic continuity. |
| C33-M10 | Permit two owners to write selected lens/indicator geometry. | Selected state and visual indicator diverge during drag/switch. | Single selection/geometry writer. |

### 10.2 Expected-GREEN deletion trials for suspected compensations

These removals should remain behaviorally GREEN in a reduced candidate. If one turns RED, the failure must identify a user invariant—not a dependency on the compensation itself.

| ID | Delete/disable | Required result |
|---|---|---|
| C33-G01 | Root morph blur and reveal blur. | No loss of semantics, click safety, focus, or final geometry; transition should become clearer. |
| C33-G02 | Root endpoint scaling and every inverse child scale. | Ordinary layout supplies one stable terminal geometry with no 118→221ms / 138→252ms rebase. |
| C33-G03 | Endpoint measurement as an animation driver. | No two-phase settle; any surviving observation is proof-only or reserve-only. |
| C33-G04 | The plate DOM node and its pointer events. | Root retains the hit boundary; non-interactive paint remains visually sufficient. |
| C33-G05 | The boxless controls wrapper. | Flattened or conventional content box preserves layout and event behavior. |
| C33-G06 | Independent crossfade spring, registry peak, and face measurement. | Focus/ARIA handoff survives; no invisible morphing tail; face change is discrete or derived from the one progress. |
| C33-G07 | Duplicate root/plate clip and default no-op collapse inset. | One shape/aperture owner remains. |
| C33-G08 | Running-maximum face peak. | Current content can contract; no stale height is retained. |
| C33-G09 | Dock-global `[data-reserve]` selectors. | No Dock regression when reserve is correctly scoped to its emitting host. |
| C33-G10 | Separator anchor marker/prop with no reader. | No behavior changes; if a consumer appears, route it through the public census before restoring. |
| C33-G11 | Fit-mode observer while preserving the real native scroll box. | End-key, focus, and recenter remain GREEN; only optional mask/presentation treatment may differ. |
| C33-G12 | Direct sibling `inert` mutation. | Equivalent transaction-owned activation suppression preserves M02/M03 without parallel DOM state. |
| C33-G13 | CTA time after useful geometry arrival. | Semantic receipt reaches its terminal state without the ~1.95s empty wait. |

The deletion trial is not complete if it removes the invariant with the compensation. In particular, G11 may not be implemented by removing overflow, and G12 may not be implemented by weakening cross-target protection.

## 11. Contradictions that formation must resolve

1. **Decoration versus hit surface:** the plate is `aria-hidden` and described in template commentary as non-interactive decoration, yet CSS gives it pointer events and calls it a hit surface.
2. **One spring versus two timelines:** a shared spring factory does not prevent `useDockMorph` and `DockCrossfade` from running independent spring handles at once.
3. **Logical completion versus geometric completion:** the morph flag clears before measured geometry visibly settles on both desktop and mobile.
4. **Stable content versus inverse-transformed content:** direct children must undo the parent scale every frame, proving the root transform does not represent the content's semantic geometry.
5. **Single aperture versus duplicate clips:** root and plate both carry clip/shape roles, including transitional/default-no-op paths.
6. **Public search versus private state:** the public search composable requires runtime state that the public Dock subpath does not let a caller construct or access; the story deep-imports a shadow state and pins the actual Dock open.
7. **Native overflow versus fit-mode ownership:** End-key success belongs to the native scroll rail, not to the observer-stamped fit attribute.
8. **Click safety versus pointerdown activation:** later click rejection cannot retract a dropdown already opened during pointerdown.
9. **Reserved space versus global overlay:** current composition evidence overlays content while Dock CSS also claims reserve behavior it does not emit.
10. **Current DAG truth versus older colocation rationale:** `BAND-COLOCATION` describes a Dock/dropdown cycle, while the senior convergent registry says there is no actual runtime Dock↔dropdown cycle. The senior registry wins; a nonexistent cycle cannot justify public/context topology.
11. **CTA geometry versus receipt completion:** geometry arrives materially earlier than the receipt owner's terminal judgment.
12. **Public boundary versus consumer proof:** direct tests/demos of `DockCrossfade` and public context plumbing are not evidence of an external product consumer.

## 12. Existing-owner routing; no new rows

The convergent inventory remains the authority. This critic creates **no new requirement, wave, or ownership row**.

| Finding / proof | Existing owner route |
|---|---|
| Contract, evidence census, shape, posture continuity, consumer proof, final gate | `docs/tranches/BJ/formation/greenfields/GF-DOCK-PASS3.md` W0/W1/W5/W8/W9. |
| Native hybrid overflow, detent correction, tap-to-reach, toolbar keyboard | `GF-DOCK-PASS3.md` W2/W3; native scrolling remains the input/a11y substrate even if programmatic detents are added. |
| Compact hit floor and same-/cross-target activation | Existing G6/A11Y ownership and `REGISTRY.md` row `R-COMPACT-HIT-FLOOR`. |
| Pointerdown-open defect | `Q-G6-CLICK-INTEGRITY-CORRECTION-C2.md` and `R-COMPACT-HIT-FLOOR`; no new row. |
| Adjacent page slot, no overlap, zero CLS, no premature posture choice | `REGISTRY.md` row `R-DOCK-SAFE-FRAME` and `GF-DOCK-PASS3.md` W9. |
| Luminance/composited backdrop behavior | `REGISTRY.md` row `R-COMPOSITED-SIGNAL`; current behavior stays RED pending that owner. |
| Close/focus semantics | `REGISTRY.md` row `R-A11Y-35A-CLOSE` plus `BAND-A11Y.md`. |
| Momentum/scroll continuity | `REGISTRY.md` row `R-MOMENTUM-CONTINUITY` and its existing iOS/GF routes. |
| Public Dock exposure and consumer evidence | `REGISTRY.md` row `R-DOCK-EXPOSURE`; `GF-DOCK-PASS3.md` W3/W9. |
| Context/DAG truth | `REGISTRY.md` row `R-DAG-TRUEUP`; senior registry overrides stale cycle language. |
| Backdrop trio and CTA colocation | Existing `BAND-REDUCTION.md` A05 and `BAND-COLOCATION.md`: keep/rehome decisions remain with those owners; C33 only supplies new structural evidence. |
| Root blur, settle rebase, inverse-child pivots, zero Dock CLS | `GLASS-UX-APOTHEOSIS-ABSORPTION-C2.md`; those defects remain born-RED. |

Exact owner identities:

| Owner evidence | SHA-256 |
|---|---|
| `docs/tranches/BJ/formation/greenfields/GF-DOCK-PASS3.md` | `9b1a5cecac32c73412ac65ddc0a0bfc5154348531af04c8dccfd541c46618a3c` |
| `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REGISTRY.md` | `90daaea70c934834a3082f6f029380bd0dc59efcec58b14e5169e7170cc2acb6` |
| `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/INVENTORY.md` | `73c7ec3bf0ce6d975d68ee1777e41ddae53ebd80ecbdecbfe81f2207bca2aa14` |
| `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GLASS-UX-APOTHEOSIS-ABSORPTION-C2.md` | `6108125069749c445012558fcd51d48f8c8ee13a23af86b848d4e2d24a042a9e` |
| `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/Q-G6-CLICK-INTEGRITY-CORRECTION-C2.md` | `0da059c4508b37df553b7c36c33071d458474816e0844d8d4cec90244155986b` |
| `docs/tranches/BJ/waves/BAND-COLOCATION.md` | `96212367a04ccbb03d9149e904c1b287163932a216b656ca46f3c4260f1341a4` |
| `docs/tranches/BJ/waves/BAND-A11Y.md` | `77e3de850816663cdcc496bb7ee72d97475a3d3da3e20fc28315609ed4a10f5c` |
| `docs/tranches/BJ/waves/BAND-REDUCTION.md` | `f0c47c2ae3a1dcfba6d3639e364d48fb7a05f2a08a4fd3729a5312f8f9b824d7` |

`INVENTORY.md` remains `93` rows (`30` GREEN / `62` RED / `1` PARKED) at the reviewed identity. C33 does not change those counts. W7 fission remains the parked decision.

## 13. Remaining missing proof

This critic does not confer acceptance. The following proof is still missing:

- A source-backed external consumer census for every exported Dock runtime symbol, especially crossfade/layer/context/background-toggle/search surfaces.
- A real collapsed-to-search assay using the same state owner as the rendered Dock.
- A two-Dock teleported-overlay assay proving owner-specific containment and close behavior.
- A pointerdown-open race assay that fails before activation is transactionally gated.
- Same-target and cross-target press/release evidence on both target classes after simplification.
- A Topology-0 ordinary-layout prototype sampled beyond its declared terminal point to prove no late rebase.
- A Topology-1 comparison only if zero-CLS/adjacent-slot evidence demonstrates the reserve is necessary.
- Layout-shift evidence for the actual selected Atlas placement; no assumption that the bottom overlay is authorized.
- Native Home/End, focus, selection, scroll reach, RTL, and vertical evidence after any detent work.
- Reduced-motion proof with the same semantic transaction behavior.
- A face-switch assay where opacity, morphing flag, focus transfer, and actual geometry share one terminal event.
- A first-press assay with no root blur, no counter-scale, and no reveal-only tap.
- CTA evidence that the semantic terminal state follows useful geometric arrival without the current long void.
- Evidence that removing Dock-global reserve selectors does not change an owned Dock contract, or identification of the true emitting host that must own them.
- Evidence for any surviving endpoint observer, crossfade registry, clip layer, context, portal marker, or public component. “Already present” is not proof.

## 14. Formation disposition

Advance **Topology 0** as the mandatory comparison baseline and **Topology 1** only as the zero-CLS/safe-frame comparison. Do not carry forward root scaling, counter-scaling, root blur, duplicate clip surfaces, independent crossfade time, running peak measurement, boxless behavior wrappers, or shadow search state by default.

At the same time, do not confuse deletion with simplification: native overflow/End-key reachability, touch intent, same-/cross-target click integrity, pointerdown transaction safety, owner-specific teleported containment, focus/ARIA continuity, and host safe-frame obligations must become born-RED when mutated. A smaller topology wins only when those invariants remain GREEN and the compensations can be deleted GREEN.
