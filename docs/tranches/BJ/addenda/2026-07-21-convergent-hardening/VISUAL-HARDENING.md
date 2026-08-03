# Visual hardening riders

This file turns the retained visual findings into the smallest amendments to existing owners.

## 1. Optical Bench — one authored signature, not another surface

The existing catalog already names and renders an Optical Bench meniscus. The defect is that it is
inert and disconnected from the category decisions below it. “Refractive Focus” is the interaction
treatment, not a required product rename:

- CatalogLanding owns optional category-intent state emitted equally by card hover and focus. It
  writes the active hue/caustic variables on the article so they cascade into the earlier sibling
  signature; a card cannot write variables upward or sideways.
- Coarse touch receives the same immediate category-intent witness on `pointerdown`/`:active`; it
  cannot delay or steal the link navigation. The 390 proof includes press onset and release/cancel.
- The existing meniscus/dot is reused. No second card, signature block, live component miniature,
  canvas, WebGL context, or idle animation is added.
- The category tile remains the preview→destination shared element. The bench is orientation feedback,
  not a second transition protagonist.
- The focused/hovered card also receives the same restrained local aperture response. That local
  witness is mandatory at 390px, where the earlier bench can be offscreen; remote feedback alone is
  non-probative. PRM commits the selected state instantly with no travel.
- One signature is allowed to be bold. The other category tiles stay quieter so the landing has a
  focal beat rather than simultaneous ambient motion.

This rides STORY W5. It is rejected as a new greenfield or motion primitive.

## 2. One card, one media aperture

`SectionPreviewCard` is shared by CatalogLanding, SectionLanding, and
`demo/stories/foundations/intro.vue`. Today its outer link is a glass card while
`.section-preview-card-preview` adds its own rounded background and inset border. The cure therefore
applies to all three receiver families:

- The outer link is the sole card/surface.
- The preview is an unbordered media aperture with clipping only where authored content requires it.
- Authored/still/identity fallbacks preserve one stable aspect ratio and intrinsic-size reservation.
- The change must not erase necessary paper-canvas boundaries inside a Handmark specimen or transparent
  hairline trays inside DockStage; those were refuted as the same defect.

## 3. Hierarchy is a corpus adoption problem

The parsed Vue template AST finds 269 real `StorySection` elements but only four `level` bindings,
across `curve-gallery`, `springs`, and `configurator`. The capability exists; adoption does not.

- STORY W1 defines the visual default by page type and section role.
- STORY W4 applies it systematically and proves one representative of every page type at both widths.
- `level` remains a visual axis. Heading semantics are checked separately; every section cannot become
  a lower semantic level merely to look smaller.
- Do not reopen STORY W3 wholesale and do not perform a blind 269-site codemod.

## 4. Responsive reach, not viewport containment

The prior W6 sweep measured document overflow and right-edge crossings. It could not see a zero-height
controls row or a 36px internal tab port because both remain inside the viewport.

### Aurora Configurator

`/substrates/aurora` uniquely combines a fixed studio height with `scroll-mode="never"`. At 390px the
Configurator mobile grid can allocate the controls row no usable height while an `overflow-hidden`
ancestor clips the entire remaining control stack. PASS-1 observed 57 clipped controls; that is RED
discovery from a moving tree and must be recaptured on a clean candidate.

GF-AURORA W7 owns the consumer repoint/cure. STORY W6 owns the audit correction. V-A95 is separate:
GF-AURORA W6 performs one screenshot/computed-style-only reverse-drag confirm, then retires the old
black-slab artifact and audits `isolation:isolate` for cargo.

### BottomDock

The current tab port can shrink to an unusable sliver without page overflow. It remains manually
scrollable, so “unreachable” is too strong; the defect is current-item exposure and usable width.

- GF-DOCK W3 owns selection/reach mechanics.
- GF-DOCK W9 owns the real BottomDock adoption.
- Click, focus, direct URL, history, programmatic navigation, and category changes all seat the current
  item synchronously if it would remain clipped beneath an edge.
- Structural peek/lip appears only while content is hidden. PRM seats immediately.

## 5. Motion has one director per event

STORY W7 supplies route semantics; PERF W4 follows with wait feel. GF-DOCK W6 consumes the selected
grammar and owns only persistent-shell/no-blank/CLS continuity:

- descend: outgoing selected preview → incoming story header is the one shared moving object;
- ascend: outgoing story header → incoming category preview reverses that pair;
- lateral/jump: a restrained root transition, no competing shared element;
- in-app links, dock actions, and programmatic navigation use one initiation service; browser history
  and direct initial load remain explicitly instant unless they gain a reliable pre-navigation wrapper;
- busy semantics arm immediately;
- a visible pending affordance waits past the fast-route flash threshold and clears on actual readiness,
  never a fixed timeout;
- one navigation episode/generation owns busy, pending and focus. A newer accepted intent skips the
  older visual transition; only the current generation may clear state or move focus; update errors
  remain observable through `updateCallbackDone`-equivalent plumbing;
- PRM is an instant state swap with focus, scroll restoration, and announcement parity.
- GF-DOCK W6 may use slide/parallax only when the director selects that lateral/jump class; it cannot
  layer an unconditional third transition over STORY W7. This supersedes the free-standing
  slide/parallax prescription in GF-DOCK PASS3 §6.

The current `pushRoute()`-only `types:["route"]` 8px rise/fade plus unclassified dock/history/direct
programmatic paths is the born-RED structural proof. No JS animation fallback is added.

## 6. Scroll story becomes an authored progression

`/motion/scroll` has 13 StorySections, 9 headings, and four nested vertical scrollports. REDUCTION W9
already owns the family collapse and is the only implementation owner:

- one documented scroll-animation register;
- one content-named narrative progression derived from the surviving story; generic quartiles are
  rejected because they encode scroll percentages instead of authored meaning;
- at most one independently scrolling port visible at a time;
- focus reveal and deep links land in the same scroll root;
- CSS timelines remain the preferred path and animated properties stay compositor-safe. The current
  coalesced `--pin-t` reader proves that “compositor-only” cannot mean zero main-thread work; any
  unavoidable reader gets an explicit bounded budget. Unsupported/PRM is readable without travel.

If ASK-4 declines consolidation, STORY W7 is the existing fallback for remaining narrative/transition
debt. No new directorial wave is minted.

## 7. Breath without an attention tax

Interaction affordance is mandatory. At-rest light remains undecided while ASK-27 pends, so a static
material presence is valid and no wave may infer idle animation from “breath of life.” Separately,
PRM is not a pause/stop/hide control. Nonessential automatic motion presented beside content must end
in **five seconds or less** or expose a discoverable pause/stop/hide mechanism on the consuming route,
backed by a producer opt-down/shared axis; auto-updating information has no five-second exception.
This applies to the dock sweep, Aurora drift, Blob always-alive register, and IOS W6. Formed
Toast/Handmark opacity-led exits remain allowed when reverse travel would mislead or prolong removal.

## 8. Evidence floor

For every changed visual component, capture both the component and its enclosing real route at 390×844
and 1440 in these states: rest, pointer hover, keyboard focus, interaction onset, representative
mid-flight, settled, and PRM interaction/settle. Route work includes one descend/ascend pair and one
lateral/jump pair.

Acceptance asserts visible focus, no text/control/card clipping, zero layout shift caused by the
motion, one director and one dominant semantic transformation, and PRM state/affordance parity
without travel. Every subordinate moving carrier names its source/parent and shared event scalar; no
competing peer director is present. Mid/settle samples are driven by readiness or transition hooks,
never arbitrary sleeps. All release evidence records commit, clean/dirty status, and worktree digest.

Route evidence covers link, dock, programmatic, history, and direct-load initiation. Preview evidence
covers CatalogLanding, SectionLanding, and foundations/intro; the catalog also proves that keyboard
focus produces a locally visible response at 390px when the Optical Bench is outside the viewport.

## 9. Exemplar material reconciliation

F1 remains the comparative frost referent. F4's improved tabs geometry does not excuse its bright,
shiny plate; F5's tabs-toggle and the comparable Slider do not excuse an opaque white active slab. The
shared target is contextual warm frost: transmitted but defocused substrate structure, quiet warm body,
bounded rim, and specular expenditure only on engagement. “Warm + blurred” is not acceptance. On one
pinned structured substrate, direct and real-card-nested fixtures must preserve resolved low-frequency
region/boundary identity, attenuate high-frequency edge energy, retain the existing text/value contrast
floor, and show exactly one sampling plate per visual body. An opaque pale mutation must collapse
substrate differentiation and fail; a nested second sample/doubled rim must also fail. Safari may drop a
refraction arm only through the runtime latch and must fall to honest blur; no engine receives a different aesthetic.

MATERIAL W2 selects blur magnitude live by role, not by a blanket 7px or 22/26px prescription: the
parent plate owns contextual defocus; a nested control preserves that already-resolved context with
tint/rim and no second backdrop sample.

IOS FINAL W3/W4/W5 and MATERIAL W1/W2/W7/W8 own the implementation and substrate repair. The proof
uses one substrate and one state script across production tabs plus production Slider, including coarse
press onset, drag and PRM, in both direct and nested cases. It depends on the existing A11Y W2-E/W2-F
focus/touch/hit-floor work; the tabs specular writer must have a local reader and Slider touch-active
must have an authored state reader. The photographed effort selector contributes only its attention
field: it is a discrete four-step control, not Slider drag proof. A screenshot of a pale fill is
non-probative because opacity can imitate frost without transmission.

## 10. Source continuity and dock constellation

Music's strongest lesson is identity conservation, not imitation of its dock. The film proves two
separate pairs—library cell↔album window and mini artwork↔player—not one cover→mini-player→page chain;
STORY W7 separately owns preview↔story-header pairing. Each event has one director and one dominant
semantic transformation. Named subordinate carriers may move concurrently when each retains a
source/parent and the shared event scalar. Reversal/interruption must preserve painted position **and
incoming velocity**, with slow arrivals dead and fast releases allowed one bounded excursion.

This merges into `V-TIMELINE`, `V-CONST`, `V-MORPHDOCK`, `R-MOMENTUM`, STORY W7 and the existing
GF-DOCK waves. One monotonic clock governs wall-time holds; velocity uses a windowed/coalesced estimate,
unknown velocity seeds zero, and per-frame registered scalars publish on the smallest component root,
never `:root`. Replay at 30/60/120/240-Hz event cadences must land within a pinned tolerance. GF-DOCK
W7 remains ASK-14-parked; this does not revive the retired spectacle slot or choose Atlas's phone posture.

## 11. Overlay birth and exhale

Overlay choreography has named arms, not one global geometry-first order: Search tracked-medium then
commit-furniture; Search veil→condense→grow results; Siri fired 2D panel then text/data/rim; Photos
source charge then preview/menu/content with content finishing before scrim before geometry; and the
perch→vapor design adoption. Routing Search and Siri through the same preset/order must fail. A truthful
dismissal may remove content quickly, shrink mildly toward its source and let medium relax last—opacity
exit is not categorically forbidden when reverse travel would lie.

Owner-confirmed G-CLOSE authority remains intact: `V-PERCH-PRIMITIVE` is the one root close-affordance
contract across its named dismissible-surface family. Only the **vapor handoff** is adoption-specific;
the pinned notification still proves the perch, not vapor motion. At open commit, accessible state,
names, modal/inert state and focus establish once. At close commit the subtree becomes inert/leaves the
accessibility tree and focus returns to the live source independently of the medium tail; re-open/cancel
invalidates stale completion callbacks. PRM keeps this semantic order without travel.

## 12. Listening and state relay

Siri's listening organ remains an aurora-like surface field, not a bar rack. Gemini's dot/color field
must relay from the currently painted palette on re-press, but its observed static period does not
justify an endless corrective loop. Input-driven movement parks with input; idle ends within five
seconds or exposes the pause/stop/hide contract already required by §7. PRM carries state without
travel.

## 13. External lab receipt

The Sol formation lab lives outside product source at `glass-momentum-lab.html`, SHA-256
`a88fb76f121fe955b36f186ef6021a1b612d31703c02a85c7f9aa4161bd29f7e`. After the three critics found
the first `614e…` build host-dependent and semantically false, the revised fragment became
self-contained, replaced no-op/hidden-focus controls with operable inert-managed states, made the
attention field interaction-bound, gave tabs real selection, applied material arms to dock/tabs/range,
used separate stack/trio bodies, and made PRM commit without timers. Chromium 149.0.7827.55 records
root/field `scrollWidth===clientWidth` and no visible target below 44px at 320 and 736 across stack,
trio and player; six pinned PNGs live beside the lab under `prototype-evidence/`. These are prototype
receipts only. The lab still does not GREEN production material, momentum/velocity, source pairing,
route cancellation, Safari parity, authorized dock posture or paint budget.

## 14. Typography role integrity — Sol ruling for W6/GATES W4

The scoped `--text-sm/--text-xs` reset is rejected as the final design contract. Glass already has a
distinctive three-voice system—Plus Jakarta for reading/control hierarchy, Fira Code for code/data, and
an editorial italic caption. Retaining generic Tailwind `text-base/lg/xl/…`, arbitrary leading, and
unruled tracking beside those roles preserves two competing vocabularies and makes later hierarchy
dependent on utility folklore. The original full reset therefore stands: clear the default
`--text-*`, `--leading-*`, and `--tracking-*` namespaces first, then reintroduce only explicit
token-backed Glass entries. Existing token-backed names such as `tracking-tight/wide/wider/caps` may
survive because their values come from the Glass register. Every other live generic consumer receives
an authored role mapping in the same coupled cut; no wildcard clear lands ahead of its migration.

One missing role is admitted, and only one: `text-meta`, a neutral Plus Jakarta supporting-information
register using fluid `--type-caption`, `--type-leading-caption`, normal style, and regular weight.
It exists because `text-caption` is deliberately editorial/italic while fixed 11px `text-micro` is a
terse sub-control instrumentation rung. Former `text-xs` is not mapped uniformly:

- readable hints, secondary sentences, compact metadata, and small control labels use `text-meta` or
  the component's control-size token;
- editorial captions may use `text-caption` and remain italic;
- terse single-token status, coordinates, and nonessential instrumentation may use `text-micro`;
- readable code labels use `text-mono-small`; genuinely tertiary code may use `text-mono-micro`;
- uppercase structural labels use `text-admin-label` or `text-mono-caption`;
- ordinary supporting prose uses `text-small` or `text-body`.

No sentence, core action label, or required explanatory text is reduced mechanically to 11px. No code
label composes a full text-family recipe such as `text-small` with `fira-code`; the six expandable
labels become a mono role (`text-mono-small`, retaining the Fira feature overlay only if it remains
non-conflicting). The Badge size specimen describes user-visible roles—compact, standard, prominent—
not implementation class names. Existing uses that expose the same mismatch, including an italic
`text-caption` on a non-editorial compact Chip, join the role census rather than being grandfathered.

GREEN is a role ledger plus exact source cut, not a blind replace. It accounts for the currently noted
17 other built-in size uses, 27 generic leading uses, three generic tracking uses, arbitrary/raw
channels, comments/specimen-copy false hits, and packaged emission. Production evidence compares
390×844 and 1440×900 in current Chromium and Safari on springs, Slider, glass-material, expandable
code labels, Badge/Chip size axes, and at least one dense metadata surface. Inspect family, style,
size/leading, wrap, baseline, truncation, overflow, target geometry, and surrounding material. Theme
and PRM do not alter the token math, but their state/contrast parity remains part of the enclosing-route
visual proof. A restored generic utility, 11px paragraph/action label, italic compact control by
accident, Plus-Jakarta code label, or missing packaged role must fail.

## 15. Immersive scrim — depth without a second glass invention

ASK-26 resolves DECLINE. The centered graded-backdrop/FORM 2/halo experiment is removed, including
the proposed measured focus apron. Breath of Life here comes from the already-seated relationship
between a stable ordinary surface and a full-field stage scrim—not from an observer-driven halo or a
second opacity axis. DialogContent and Drawer consume W2's private fixed-radius 14px×level effect;
PRM becomes dim, reduced transparency becomes a nonzero barrier/solid body, and forced colors remains
semantic. The exact side-sheet edge sampler survives internally because it resolves a different
geometry problem and stays a direct stationary pointer-none child. Acceptance records the honest
two-body center composition and rejects the fiction that every center pixel has one filter.

## 16. Aristotle proportion review — judgment before mechanics

MATERIAL W5 introduces no universal formula. Its JOB/FIT/ROUTE review asks what a visible space or
cue does, whether current paint performs that job, and which existing owner receives an evidenced
defect. Six bounded groups cover F03, Configurator, F31, matched Card states, SectionPreviewCard, and
representative hierarchy; divider observations ride those images only. The review must find one
honest removal and one honest need-for-more or remain incomplete. The Configurator size comparison is
blinded 25.9px versus 20.4px, not a preordained downscale. Historical stills inform attention but
cannot classify current paint. Semantic-mass, occupied-body, phi, universal reach, and duplicate
motion grammars are rejected because they would make the design language feel administered rather
than alive.
