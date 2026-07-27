export const meta = {
  name: 'bk-exemplar-frames',
  description: 'Fable frame-by-frame motion analysis of the Music/ChatGPT/Gemini + Siri + popover exemplars',
  phases: [
    { title: 'Frames A', detail: 'popover transient, siri invocation, music dock', model: 'fable' },
    { title: 'Frames B', detail: 'chatgpt slider+bubbles, gemini menu+dot-matrix, ios27 archive redo', model: 'fable' },
    { title: 'Canon', detail: 'the motion canon synthesis', model: 'fable' },
  ],
}

const SP = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad'

const SPEC = {
  type: 'object',
  required: ['modelId', 'subject', 'observations', 'motionSpecs', 'ourGap'],
  properties: {
    modelId: { type: 'string' },
    subject: { type: 'string' },
    observations: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'what', 'frameEvidence', 'mechanism', 'designPrinciple'],
        properties: {
          id: { type: 'string' },
          what: { type: 'string', description: 'the observed behaviour, precisely' },
          frameEvidence: { type: 'string', description: 'exact frame filenames/indices and the timing in ms derived from them' },
          mechanism: { type: 'string', description: 'how it is almost certainly implemented (layers, transforms, masks, blurs, springs)' },
          designPrinciple: { type: 'string', description: 'the transferable principle, stated so it can be applied to a different design language' },
        },
      },
    },
    motionSpecs: {
      type: 'array',
      description: 'quantified motion specs: durations in ms, overshoot %, stagger, easing shape, what leads what',
      items: {
        type: 'object',
        required: ['name', 'durationMs', 'curveShape', 'leadLag', 'notes'],
        properties: {
          name: { type: 'string' },
          durationMs: { type: 'string' },
          curveShape: { type: 'string', description: 'spring(response,zeta) estimate OR bezier estimate, with the frame-derived reasoning' },
          leadLag: { type: 'string', description: 'which channel starts first and by how many ms' },
          notes: { type: 'string' },
        },
      },
    },
    ourGap: { type: 'string', description: 'where glass-ui at HEAD falls short of this, with src file evidence' },
  },
}

const LAW = `
You are a Fable design seat performing FRAME-BY-FRAME motion analysis of iOS 26/27-era exemplars, for the
glass-ui component library at /Users/mkbabb/Programming/glass-ui.

THE OWNER'S EDICTS (binding):
- BREATH OF LIFE: every component always displays engagement; affordances read as alive.
- MOVEMENT OF MOMENTUM: motion carries inertia, weight, liquid quality; natural origin; current-frame
  retargeting; interruption/reversal truth; crisp foreground; reduced-motion parity.
- SMOOTH, NOT SHARP. "fades in, snappy and tightly, with a spring and effervescent effect."
- We do NOT want a trite or lifeless recreation. We leverage OUR OWN extant design language:
  warm cream paper, deft rounding, our palettes, our glass. The exemplar supplies the MOTION GRAMMAR and
  the PROPORTION, never the skin.
- PERFORMANT PENCHANT: compositor-only where possible (transform/opacity/filter), no layout animation,
  no idle clocks added for spectacle. Safari/WebKit is a first-class target, not an afterthought.

METHOD — this is the part that matters:
Read the frames with the Read tool, IN ORDER, and derive TIMING ARITHMETIC from frame indices and the
stated frame rate. Do not hand-wave. If a transition spans frames 13→24 at 60fps, that is 183ms — say so.
Identify what LEADS and what LAGS (e.g. does the scrim blur start before the content scales?).
Estimate curve shape from the spacing of positions across frames: even spacing = linear; front-loaded =
ease-out; overshoot-and-return = spring, and estimate its damping from the overshoot magnitude.

Then read glass-ui source to state OUR GAP concretely:
- src/styles/tokens/scheme-spring.css and src/composables/motion/spring/springPresets.ts hold our spring table.
- src/styles/glass/ladder.css holds the five-rung glass ladder.
- src/components/dock/ holds the dock (8046 LOC, 45 files).
Name the exact token/preset/file that would have to change.

DO NOT EDIT ANY FILE. Return through StructuredOutput with your exact modelId.
`

phase('Frames A')

const a = await parallel([
  () => agent(`${LAW}

SUBJECT: THE POPOVER / CONTEXT-MENU TRANSIENT — the owner's named reference for our animation language.
"mark the pop-over animation, and its MOVEMENT OF MOMENTUM and BREATH OF LIFE — mark this exactly how it
fades in, snappy and tightly, with a spring and effervescent effect — our own animation curves and language
should aspire and perfect such smoothness — SMOOTH, not sharp."

FRAMES: ${SP}/dense/v3-popover-open/p_001.jpg … p_066.jpg — 66 frames at 60fps (1.10s window), iOS Photos
long-press context menu opening. A second independent sample of the SAME transition is at
${SP}/dense/v3-popover-open2/p_001.jpg … p_066.jpg — use it to CONFIRM your timings, not to average them away.

Read at least 30 frames from the first sample and 15 from the second. Determine precisely:
1. When does the backdrop scrim begin to change, and does blur lead or lag the dim? By how many ms?
2. Does the pressed cell lift as a real snapshot of itself (source-rect), and what is its scale curve?
3. Does the menu slide, or materialise in place? From what scale and opacity? Is there stagger between rows?
4. What is the TOTAL transient, first pixel change to settled?
5. Is the backdrop ever fully occluded, or does it stay legible through the frost? Quantify the residual
   contrast/colour you can still read.
6. Corner radii, shadow, and the menu's material — is it a frosted plate or a solid plate?
Then: what would our --spring-* preset table and our .glass-overlay rung have to become to match this?`,
    { model: 'fable', label: 'ex:popover', phase: 'Frames A', schema: SPEC }),

  () => agent(`${LAW}

SUBJECT: SIRI INVOCATION + WAVEFORM VISUALISER + THE DOWNWARD DOCK EXPANSION.
The owner: "In the second video, mark the siri invocation, and the wave form visualizer, and how the siri
results expands like a dock downwards in an animated fashion."

FRAMES: ${SP}/dense/v2-siri/s_001.jpg … s_569.jpg — 40fps extraction of a 120fps capture (so ~3x slow motion;
each extracted frame is 25ms of REAL time at 1/3 speed — be careful and state your arithmetic).
Sample broadly first (every ~20th frame) to find the invocation moment, then read densely around it.

Determine:
1. The invocation: what happens to the screen edge / a rim / a glow, and in what order. Is it a border
   treatment, a full-screen wash, or a bottom-anchored bloom?
2. The waveform visualiser: how many bars/blobs, what drives amplitude, how is it eased, does it idle or
   only respond to input? Does it have a rest state that still breathes?
3. The results surface "expands like a dock downwards": what is the origin rect, what interpolates
   (height? scale? clip-path? mask?), and does the content inside counter-animate to avoid stretching?
4. Reduced-motion: is there any evidence of a discrete fallback?
Then: we retired useDockFission and useDockOrientationMorph. State what primitive we need to express a
dock that expands into a results surface without animating layout.`,
    { model: 'fable', label: 'ex:siri', phase: 'Frames A', schema: SPEC }),

  () => agent(`${LAW}

SUBJECT: THE APPLE MUSIC DOCK — the double dock, its collapse, its fission, and the album expansion.
This is the owner's single most emphatic reference. Their words:

"Mark how the breath of life is infused into the dock, the search bar, the dock's fission and fusion facilities.
Mark the dock's tabs and the eyeglass effect.
Mark how the album within the music app expands from the dock in one continuous motion and timeline.
Mark how pages expand FROM the album cover, and how that process contextually switches from the next page in a
windowing transition.
Mark the dock's double dock effect, which is a testament to our facilities too — a dock should not be a
monolith, and it should not be limited in orientation, width, height — the music dock has the now playing dock
stacked upon the main dock in the quiescent view — in the scrolling view, these two collapse into one, and then
the dock performs a fission to have the controls gird the left, the search gird the right (both in icons) and
the now playing dock is in the centre — this entire process is choreographed and animated, and it is a testament
to our facilities, and the breath of life edict."

FRAMES: ${SP}/frames/v1/f_0001.jpg … f_0660.jpg — 10fps survey of a 66s capture (so each frame = 100ms).
The Apple Music segment is approximately frames f_0001 … f_0230. Read broadly across that range first to
map the scenes, then densely where the transitions happen.

Deliver, with frame evidence for each:
1. The DOUBLE DOCK at rest: geometry of the now-playing bar stacked on the tab bar. Heights, gaps, corner
   radii, and whether they are one material or two.
2. The COLLAPSE on scroll: what merges into what, over how long, and what happens to the labels.
3. The FISSION: the exact end state (controls left, search right, now-playing centre) and the choreography
   order — what moves first, what fades, what morphs.
4. The ALBUM EXPANSION from the dock in one continuous motion: the origin rect, the path, whether the
   artwork is a shared element, and how the surrounding page assembles around it.
5. The EYEGLASS / selection lens on the tabs: its size relative to the tab, its material, whether it
   translates or morphs between tabs, and its settle behaviour.
Then: name the exact glass-ui primitives that are missing. We deleted useDockFission ("demo-only spectacle")
and useDockOrientationMorph ("the platform cannot continuously interpolate a flex-column→row topology
change"). Assess whether this exemplar refutes that claim, and if so, state the mechanism that makes it
possible without animating layout.`,
    { model: 'fable', label: 'ex:music-dock', phase: 'Frames A', schema: SPEC }),
])

phase('Frames B')

const b = await parallel([
  () => agent(`${LAW}

SUBJECT: THE CHATGPT APP — space, proportion, the slider, its gradient-blur focus, and the chat bubbles.
The owner: "mark the chat GPT app, the usage of space and proportion; mark the slider engagement and
interaction thereof, mark the gradient blurring around that slider element and how it focuses your attention
subtly; mark the chat bubbles and their animation, mark the dock's fission and fusion, mark the dock's tabs
and eyeglass effect, mark the dock's double dock effect, mark the dock's scrolling and collapsing behavior,
mark the dock's orientation and width/height flexibility, mark the dock's choreographed animations and
transitions, mark the breath of life infused into all these elements."

FRAMES: ${SP}/frames/v1/f_0230.jpg … f_0500.jpg (10fps, each frame = 100ms). The ChatGPT segment shows a
conversation with a diff view, and a SLIDER control reading "5.5 Medium" / "5.5 Extra High" with a
pill-shaped track and a distinctly blurred/gradient surround.

Deliver, with frame evidence:
1. THE SLIDER. Its rest geometry, its engaged geometry (does it grow? does it lift out of its shell?), the
   gradient blur around it and exactly how that blur is shaped — is it a radial falloff, a mask, a
   backdrop-filter with a gradient mask? How does it focus attention "subtly"? Quantify the blur radius
   change and the scale change if any.
2. The value readout: where it sits, how it transitions between values, whether it is a shared element.
3. CHAT BUBBLES: entry animation — origin, scale, opacity, stagger, and whether the bubble is born blurred.
4. SPACE AND PROPORTION: margins, the ratio of gutter to content, the vertical rhythm. Give numbers as a
   fraction of the 1206px-wide frame.
5. The bottom input dock: its material, its collapse behaviour, and its relationship to the keyboard.
Then: our Slider is src/components/slider/Slider.vue (649 LOC). Our engagement facility is
BI.W-ENGAGE-AFFORD, spec-only and never implemented. State exactly what the GROW and the gradient-blur
focus would be in our token vocabulary.`,
    { model: 'fable', label: 'ex:chatgpt', phase: 'Frames B', schema: SPEC }),

  () => agent(`${LAW}

SUBJECT: THE GEMINI APP + THE CONTEXTUAL PULL-DOWN MENU + DOT-MATRIX COLOUR.
The owner: "When navigating to gemini, mark the new siri-contextual menu and that breath of life animation:
note the pull down effect, note the partial black-dock of the siri menu, note the recent apps and search
results drawer, how it morphs, expands, has the MOVEMENT OF MOMENTUM. Finally, mark the gemini's app usage of
dot matrix color and transitions thereof."

FRAMES: ${SP}/frames/v1/f_0480.jpg … f_0660.jpg (10fps, each frame = 100ms). This segment shows a home
screen with a pull-down search/assistant panel ("Search or Ask", app icons, New chat / Recents / Link on
Clipboard / Open Link), then the Gemini app itself with a shifting colour field and an "Ask Gemini" input dock.

Deliver, with frame evidence:
1. THE PULL-DOWN: what the gesture reveals, whether the panel translates or scales, whether the home screen
   behind it recedes (scale-down? blur? dim?), and the exact ordering.
2. THE PARTIAL BLACK DOCK: the panel is dark and does not span the full width/height — give its inset,
   radius, and material. Is it opaque or frosted? Can you read the wallpaper through it?
3. THE DRAWER MORPH: recent apps / search results — how the container reshapes as content changes. Does it
   animate height, or does it morph a clip/mask? What carries the momentum?
4. DOT-MATRIX COLOUR: the Gemini field. Is it a dot grid, a gradient mesh, or a blurred noise field? How do
   its colours transition — hue rotation, cross-fade, or a moving gradient? Over how long?
Then: we have Aurora (9205 LOC) and Constellation (2993 LOC) as procedural substrates. State whether this
dot-matrix field is expressible in our existing substrate vocabulary or needs a new mode, and be specific.`,
    { model: 'fable', label: 'ex:gemini', phase: 'Frames B', schema: SPEC }),

  () => agent(`${LAW}

SUBJECT: THE iOS 27 ARCHIVE — REDONE.
The owner: "The ios-27 micro passes are bearing fruit. All of our previous tranches that performed in depth
analysis of '/Users/mkbabb/Downloads/New Folder With Items 4' should be re-done in a similar manner, with our
breath of life edict, and full component set, too."

SOURCE: /Users/mkbabb/Downloads/New Folder With Items 4 — 8 screen recordings and ~17 stills, June 20 – Jul 15.
Also: /Users/mkbabb/Downloads/ios27-micro-frames-2026-07-17/ holds an earlier frame extraction (844 items).
You may run ffmpeg to extract frames into ${SP}/frames/archive/ (create it). Do NOT write anywhere else.
Two specific stills the owner cited: /Users/mkbabb/Downloads/IMG_2287.PNG and IMG_2288.PNG — the OpenAI popup
whose SUBTLE blurring and gradient-blur-behind-the-element the owner wants us to study and experiment with.

Also examine what the prior tranche concluded, so you can CHALLENGE it rather than repeat it:
docs/tranches/IOS27-MICRO/ (96 md files) and docs/tranches/BJ/formation/ios27/.

Deliver, with frame evidence:
1. A component-by-component mapping: for each iOS 27 element visible in the archive, name the glass-ui
   component that is its counterpart, and state the delta.
2. THE GRADIENT BLUR BEHIND AN ELEMENT (IMG_2287/2288). Characterise it exactly: is the blur radius itself
   graded with distance, or is a uniform blur masked by a gradient? Where is it strongest? Does the dim
   co-grade with the blur? This is the owner's F49/F50 ask and we must get the mechanism right.
3. THE NOTIFICATION AFFORDANCE the owner cites: "mark how the notification x on this image is in the top
   left corner, and outside of the element partially, sitting on the corner border." Find it in the archive
   and specify the exact offset, size, and how it composites over the corner.
4. THE VAPORIZING / DISSOLVING DISMISSAL: "The newly begat ios27 and macos27 notification vaporizing and
   dissolving effect is quite good, and should be re-deployed in our own facilities." Characterise it:
   is it a mask-based erosion, a per-particle scatter, a blur-and-fade, or a displacement? Give the timing.
5. Where the PRIOR tranche's conclusions were wrong or thin, say so with the document cite.
Then: state which glass-ui components should receive each effect, by file path.`,
    { model: 'fable', label: 'ex:ios27-redo', phase: 'Frames B', schema: SPEC }),
])

phase('Canon')

const all = [...a, ...b].filter(Boolean)

const canon = await agent(`You are the Fable synthesis seat. Six independent Fable analysts performed
frame-by-frame motion analysis of iOS 26/27-era exemplars (Apple Music, ChatGPT, Gemini, Siri, the Photos
context-menu popover, and the iOS 27 archive) for the glass-ui library at /Users/mkbabb/Programming/glass-ui.

Their structured reports:

${JSON.stringify(all, null, 2)}

Produce THE MOTION CANON — a single, opinionated, implementable specification. Requirements:

1. THE SPRING TABLE. We ship 8 presets in src/composables/motion/spring/springPresets.ts, generated into
   src/styles/tokens/scheme-spring.css. Four of them (smooth, press, dock, orb-drop) currently ship MONOTONE
   — the generated overshoot is +0.0% — while their register text promises weight and rebound. Propose the
   CORRECTED table: for each preset, (response, dampingFraction), the job it owns, and the exemplar evidence
   that sets it. Reduce the count if two presets do the same job.
2. THE LEAD/LAG LAW. State, as a rule, what leads what in a compound transition (scrim vs content, material
   vs geometry, container vs children) with the millisecond offsets the exemplars show.
3. THE ENGAGEMENT LADDER. Rest → hover → press → engaged → modal. For each rung state what changes and by
   how much, so "breath of life" becomes a checkable specification rather than a slogan.
4. THE GRADIENT-BLUR FOCUS primitive. Exact mechanism (masked backdrop-filter vs graded radius), the token
   names it needs, and the components that consume it.
5. THE DOCK PRIMITIVES. Given the Music dock's double-dock → collapse → fission choreography, enumerate the
   minimum primitive set that expresses it WITHOUT animating layout. We retired useDockFission and
   useDockOrientationMorph; rule explicitly on whether those retirements were correct, and if not, what
   replaces them.
6. THE DISSOLVE. The iOS 27 notification vaporize, specified well enough to implement.
7. WHAT WE MUST NOT COPY. Name the places where the exemplar's choice conflicts with our warm-cream,
   deft-rounded, frosted-glass identity, and state our alternative. The owner is explicit: no trite
   recreation; our own design language wins on skin, the exemplar wins on grammar and proportion.
8. SAFARI. Every primitive gets a WebKit verdict: does it paint, does it need a different mechanism, or is
   it forbidden. No masking fallbacks — primary works in paint or fails loud.

Where the analysts disagree, adjudicate explicitly and say which frame evidence decided it.
Be concrete enough that an Opus implementation seat could build from this without asking a question.
Return thorough markdown. Include your exact modelId.`,
  { model: 'fable', label: 'CANON:motion', phase: 'Canon' })

return { exemplars: all, canon }
