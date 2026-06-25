# Archaeology — Chunk 07/9 directive extraction

Source: `scratchpad/archaeology/chunks/chunk-07.txt` — 169 chronological blocks,
2026-06-20T16:35Z → 2026-06-21T17:25Z.

**Triage note.** The overwhelming majority of the 169 blocks are NOT human-authored:
- #70–#75, #79–#81, #86–#93, #98 — `<task-notification>` autonomous-workflow outputs (BD-convergence iterations + the 6-agent sibling-repo forensic).
- #83, #100, #138 — system context-continuation summaries (valuable: they preserve verbatim human quotes from prior compacted turns that appear nowhere else in this chunk).
- #84, #94, #112, #113 — image attachment markers.
- #96 — a Stop-hook GOAL-set echo (embeds the #95 directive verbatim).
- #97, #99, #101–#111, #114–#137, #139–#238 — ~120 repeated **Stop-hook feedback** blocks, ALL re-stating the SAME #95 dock-broken condition (the "burning lucidity" auto-fire loop). No new directive in any of them; they are excluded as process-noise but their progress recaps confirm the dock-rework feature set.

The genuine human directives extracted below are: #76, #77, #78, #82, #85, #95 (+ the #96 GOAL form), plus the verbatim user quotes preserved inside the #100 and #138 summaries (the generalized-framework ask, the RAIL spec, the "creed", the chrome-devtools-validate ask, the "never happens again" safety clause, and the Phase-5 three-message dock feedback).

---

## Directive table

| # | Gist | Quote | Date | Category | Theme | Status-guess |
|---|------|-------|------|----------|-------|--------------|
| D1 | Where are the constellation sibling repos? (loss discovered) | "Where are our constellation repos of keyframes.js, value.js, fourier-analysis, etc?" | 2026-06-20 | cross-repo | sibling-safety | addressed |
| D2 | Pause; explain what was done to the missing repos | "Why are they missing. What did you do. Pause and take a step back." | 2026-06-20 | gates-quality-process | sibling-safety | addressed |
| D3 | Run a deep 6-agent forensic; months of local-only work was at stake | "Deep analysis with 6 agents in parallel. What happened to these files... We had months of local only changes hereof" | 2026-06-20 | cross-repo | sibling-safety | addressed |
| D4 | Recover, and make the repo loss NEVER recur under any circumstances | "Resume, but ensure that this NEVER happens again. Under any circumstances." | 2026-06-20 | gates-quality-process | sibling-safety | addressed |
| D5 | Deeply audit liquid transitions / dock / scrolling / morph / aurora against 2 iOS-27 videos + a Maps card | "deeply audit our liquid transitions (that MUST be safari compatible), dock, scrolling and morphing dock, animations, and aurora facilities" | 2026-06-20 | dock | ios27-fidelity | partial |
| D6 | Liquid transitions MUST be Safari-compatible | "our liquid transitions (that MUST be safari compatible)" | 2026-06-20 | a11y-perf-safari | safari-compat | partial |
| D7 | Dock must morph with full bi-directionality, context-driven form/function, sub-sections, shrunken state, layers, sub-docks | "the dock morphing with full bi-directionality, the dock changing form and function based on context, with multiple sub-sections of the dock, a shrunken state, layers based on context, and sub-docks" | 2026-06-20 | dock | dock-rework | partial |
| D8 | The Apple Music logo goo-SPLITS off the core dock to form the abstract bottom dock | "notice how the apple music logo goo-splits off from the core dock to form the abstract bottom dock" | 2026-06-20 | dock | goo-morph | partial |
| D9 | Match/better the iOS-27 album fade up-and-out album transition | "the album fade up and out" | 2026-06-20 | motion-animation | ios27-fidelity | partial |
| D10 | Match, better, and FULLY implement the Apple aurora generative demos | "a few apple aurora generative demos that we should seek to match, better, and implement fully" | 2026-06-20 | viz-procedural | aurora-everywhere | partial |
| D11 | Adopt the iOS-27 Maps enhanced liquid-glass card/UI | "the new enhanced liquid glass card and UI from the maps app within ios 27" | 2026-06-20 | glass-material | ios27-fidelity | partial |
| D12 | Audit the ENTIRE glass/dock/animation/card/tab/aurora + buttons/icons suite; fully align or BETTER the input | "Our entire glass, dock, animation, card, tab, and aurora suite... must be audited, researched, and FULLY aligned or bettered than the input" | 2026-06-20 | design-principles | ios27-fidelity | partial |
| D13 | Analyze each video frame-by-frame, animation-by-animation | "Fastidiously and deeply analyze each video, frame by frame, animation by animation." | 2026-06-20 | gates-quality-process | real-paint-verify | partial |
| D14 | Deploy waves/fleets, output a % convergence per pass, stop at 100% then develop tranche plans | "each pass will output a percentage of completion and comphrensiveness in planning, whereupon 100% convergence we'll stop" | 2026-06-20 | gates-quality-process | convergence-loop | addressed |
| D15 | Research apple.com, awwwards, latest iOS-27/macOS golden-gate design guidelines for the gaps | "research the apple website, the awwwards website, and any other latest ios 27 and macos golden gate design facilities" | 2026-06-20 | design-principles | ios27-fidelity | partial |
| D16 | Audit with 32 agents in parallel: original plan + all changes herein | "DEEPLY audit with 32 agents in parallel our original plan and waves thereof, alongside all changes made herein." | 2026-06-20 | gates-quality-process | convergence-loop | addressed |
| D17 | NO quick solutions, NO workarounds; idiomatic gestalt approaches; architectural transpositions for elegance/simplicity/performance | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches... architectural transpositions in the sake of elegance, simplicity, and performance above all" | 2026-06-20 | design-principles | gestalt-not-patch | partial |
| D18 | No legacy code | "NO legacy code." | 2026-06-20 | design-principles | no-legacy | partial |
| D19 | Fold every chronically-deferred + deferred item into the new tranche | "Delineate any chronically deferred items and fold them into this new tranche." | 2026-06-20 | gates-quality-process | fold-deferred | addressed |
| D20 | Recap ALL prior prompts/requests and ensure each is addressed | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed." | 2026-06-20 | gates-quality-process | anti-amnesia | partial |
| D21 | This is tranche-development ONLY, not implementation | "This is NOT an implementation phase. Tranche development only." | 2026-06-20 | gates-quality-process | tranche-dev-only | addressed |
| D22 | Use core model for orchestration; defer Opus/Sonnet for fanout; batches of three to dodge rate-walls | "defer to Opus or Sonnet for workflow fanout. Use batches of three agents in parallel to avoid rate limit walls." | 2026-06-20 | gates-quality-process | agent-orchestration | addressed |
| D23 | Abrogate ALL default shadcn + reka styling — those libs are FUNCTION not FORM; re-audit every component | "All elements of default shadcn and reka styling must be abrogated--we use those libraries for function, not form or design. This should be audited again, hereupon--every component." | 2026-06-20 | components-encapsulation | de-shadcn | partial |
| D24 | The dock is entirely broken — the CORE dock itself should MORPH | "the core DOCK should morph. ... Entirely broken" | 2026-06-21 | dock | dock-rework | partial |
| D25 | The expand pane must animate INSIDE the dock — not fly in from the left | "The expand pane does not even animate in the dock, it flys in from the left." | 2026-06-21 | dock | dock-morph-in-place | addressed |
| D26 | Focus on each core feature; use the reference animations/images/movies continuously as guiding light | "Focus on each core feature, audit the animations, images, and movies provided continuously as a reference and guiding light." | 2026-06-21 | dock | ios27-fidelity | partial |
| D27 | Be burning in lucidity and critique at every juncture (perpetual self-critique goal) | "Be burning in your lucidity and critique at every juncture." | 2026-06-21 | gates-quality-process | burning-lucidity | addressed |
| D28 | Build a generalized metaball/liquid morphing framework for an arbitrary card/container | "how might we have a generalized metaballing and liquid framework for this with an arbitrary card or container?" | 2026-06-21 | dock | generalized-morph | partial |
| D29 | Morph from an arbitrary angle/direction of attack — not just top/bottom/left/right | "function in an arbitrary direction and angle of attack (meatball from an arbitrary angle, not just from top/bottom/left/right)" | 2026-06-21 | dock | generalized-morph | partial |
| D30 | The UI must expand and form a card FROM the dock on request; the dock is the primary control interface | "to have the UI expand and form a card FROM the dock if requested--to have this function as the primary control interface" | 2026-06-21 | dock | dock-as-primary | partial |
| D31 | Build a REAL playground prototype with REAL glass-ui primitives; iterate to perfected convergence | "with REAL glass-ui primitives and components, program a playground demo prototype and iterate until perfected convergence" | 2026-06-21 | demo-storybook | real-prototype | partial |
| D32 | Deploy triumvirate waves (research/plan/prototype) in a parallel-agent workflow | "Deploy waves of triumvirates that shall research, plan, and tranche write/prototype in a workflow with parallel agents." | 2026-06-21 | gates-quality-process | agent-orchestration | addressed |
| D33 | The playground should subsume the dock demo set + be congruent with storybook pages (hero, scroll-shrink, design language) | "This playground should plan to subsume our current dock demo set... congruent with our actual story book pages (top title hero, scrolling display and shrink, our design language, etc)" | 2026-06-21 | demo-storybook | storybook-congruence | partial |
| D34 | The RAIL (novel feature): placeable on any edge, golden-2x-above, carousel-WRAP stack, configurable above/below | "fully implement the rail facility (our novel feature)" + IMG_1880 spec (golden 2× above, carousel-wrap, hover-expand, any edge) | 2026-06-21 | dock | rail-feature | partial |
| D35 | Best every dock facility: splitting, morphing, contextual switching, layering | "We should plan to implemnet and best every dock facility, to dock splitting, morphing, contextual switching, layering" | 2026-06-21 | dock | dock-rework | partial |
| D36 | Suffuse animation, fun, and jubilance into the animation/morphing — that's our creed | "Suffuse animation, fun, and jubilance into the animation and morphing. That's our creed." | 2026-06-21 | motion-animation | jubilance | partial |
| D37 | References aren't enough — supplement and augment with additional research agents | "these references are not enough. Supplement and augment your research with other agents, too." | 2026-06-21 | gates-quality-process | deep-research | addressed |
| D38 | Relay the glass + dock audit and the implementation plan; harden with frontend-design + prototype agents | "Relay to me the glass and dock audit, and how we plan to implement this. We must harden and refine this with a series of frontend design plugin agents... REAL prototypes" | 2026-06-21 | gates-quality-process | real-prototype | partial |
| D39 | Use chrome-devtools MCP to open a real Chrome instance and validate | "Use the chrome dev tools mcp to open a chrome instance to validate, too." | 2026-06-21 | gates-quality-process | real-paint-verify | addressed |
| D40 | Animations are not smooth enough; transitions partially overflow and occlude — half-baked | "The animations are not smooth enough, the transitions still partially overflow and occlude. Very half-baked--but better than the last." | 2026-06-21 | motion-animation | liquid-weight | partial |
| D41 | Remove the horizontal line on every storybook page | "what is this horizontal line on each page of the storybook--this needs to be removed." | 2026-06-21 | demo-storybook | chrome-cleanup | addressed |
| D42 | Card border radii read strangely SQUARE | "the border radii on cards is strangely square" | 2026-06-21 | glass-material | radius-fix | partial |
| D43 | The liquid tabs are not properly iOS-27 liquid | "the liquid tabs are not properlu ios 27 liquid" | 2026-06-21 | components-encapsulation | ios27-fidelity | partial |
| D44 | The dock does not split off into an icon facility like in the move demos | "There is not splitting off of the dock into an icon facility like in our various move demos." | 2026-06-21 | dock | goo-morph | partial |
| D45 | Do frame-by-frame analysis AND frame-by-frame validation of ALL prototypes; iterate to perfection | "This warrants more in-depth frame by frame analysis, and frame by frame validation of all prototypes. Iterate on this until perfection. This is not good enough." | 2026-06-21 | gates-quality-process | real-paint-verify | partial |
| D46 | The DOCK buttons themselves must work — no need to click reset/expand | "we should have the DOCK buttons work--you should not need to click reset or expand" | 2026-06-21 | dock | dock-direct-trigger | addressed |
| D47 | Full timeline control of the animation via keyframes.js | "we should have full timeline control of the animation using keyframes.js" | 2026-06-21 | motion-animation | timeline-control | addressed |
| D48 | Split and union are totally broken — they don't properly modify the DOCK itself | "Split and union are totally broken and do not properly modify the DOCK itself." | 2026-06-21 | dock | dock-rework | partial |
| D49 | The rail is totally broken: doesn't scroll, lacks the hairline vertical rail bar | "The rail is totally broken and does not scroll, does not have the vertical rail bar that's a hairline." | 2026-06-21 | dock | rail-feature | partial |
| D50 | NEVER mv/move/rm the user's real sibling repos out of ~/Programming — the foreign-tree fence is literal | "NEVER mv/move/rm the user's real sibling repos... out of ~/Programming — the foreign-tree fence is LITERAL." | 2026-06-21 | cross-repo | sibling-safety | addressed |
| D51 | Do NOT re-publish slides to the web yet (standing constraint) | "Do NOT re-publish slides to the web yet." | 2026-06-20 | cross-repo | slides-hold | addressed |
| D52 | iOS-27 reference is the bar: fully aligned or BETTERED, the DOCK is the hallmark | "iOS-27 reference = 'fully aligned or BETTERED'... the DOCK is the hallmark + suffuse jubilance" | 2026-06-21 | design-principles | ios27-fidelity | partial |

---

## Per-directive detail (notable items)

### D5–D16 — the iOS-27 deep-audit charter (msg #82, 2026-06-20)
The single richest human message in the chunk. It sets the whole BD/BE/BF arc:
deeply audit liquid transitions (Safari-compatible), dock, scrolling, morphing
dock, animations, and aurora against two iOS-27 screen recordings + a Maps card
screenshot; the dock must morph with full bi-directionality, change form/function
by context, carry sub-sections + a shrunken state + context layers + sub-docks,
and goo-split the Apple-Music logo off the core dock to form the abstract bottom
dock; match/better the album fade-up-and-out and the Apple aurora generative
demos; audit the full glass/dock/animation/card/tab/aurora + button/icon suite,
frame-by-frame; emit a %-convergence per pass; research apple.com/awwwards/iOS-27
guidelines; NO workarounds, gestalt only, NO legacy code; fold every deferred +
chronically-deferred item; tranche-development ONLY; batches of three agents.

### D23 — de-shadcn (msg #85, 2026-06-20)
"All elements of default shadcn and reka styling must be abrogated--we use those
libraries for function, not form or design." Re-audit EVERY component. This is a
recurring foundational principle (reka/shadcn = function, never form).

### D24–D27 — the dock-broken GOAL (msg #95/#96, 2026-06-21)
Set as a persistent Stop-hook GOAL that auto-fired ~120 times. Verbatim: "Absolutely
none of the features work properly and the core dock itself does not get modified or
animate at all. Entirely broken--the core DOCK should morph. The expand pane does not
even animate in the dock, it flys in from the left. Focus on each core feature, audit
the animations, images, and movies provided continuously as a reference and guiding
light. Be burning in your lucidity and critique at every juncture." The fly-in-from-left
fix (D25) and direct-dock-trigger (D46) were paint-verified addressed; the broader
fidelity polish stayed in iterate-forever mode.

### D28–D39 — the generalized liquid-morph + RAIL charter (preserved in #100)
The framework asks: a generalized metaball/liquid morphing engine for an arbitrary
card/container, working at an arbitrary angle of attack (not just orthogonal), in
vertical or horizontal state, expanding a card FROM the dock as the primary control
interface; a REAL glass-ui-primitive playground iterated to perfected convergence via
triumvirate (research/plan/prototype) parallel agents; the playground subsumes the dock
demo set and is storybook-congruent (hero + scroll-shrink + design language); the novel
RAIL (IMG_1880) placeable on any edge with golden-2x-above carousel-wrap; supplement the
references with more research; relay the glass/dock audit + plan and harden via
frontend-design plugin agents with REAL prototypes; validate with chrome-devtools MCP.

### D36 — the creed (jubilance)
"Suffuse animation, fun, and jubilance into the animation and morphing. That's our creed."
A standing design-principle: every motion should carry life/jubilance.

### D40–D49 — Phase-5 dock-prototype feedback (preserved verbatim in #138)
Three sequential human feedback messages on the liquid-dock prototype:
1. animations not smooth enough + transitions overflow/occlude (half-baked) + remove the
   horizontal line on every storybook page;
2. card radii read square + liquid tabs not properly iOS-27 + dock doesn't split into an
   icon facility + do frame-by-frame analysis AND validation of ALL prototypes, iterate to
   perfection ("not good enough");
3. the dock buttons must work directly (no reset/expand click) + full keyframes.js timeline
   control + split/union totally broken (don't modify the dock) + rail totally broken (no
   scroll, no hairline rail bar).

### D50/D51 — the absolute safety + slides-hold constraints
The foreign-tree fence (literal: never mv/move/rm sibling repos out of ~/Programming, run
`verify-siblings-intact.mjs` every turn) and the standing "do NOT re-publish slides to the
web yet." Both addressed (sentinel + memory + CLAUDE.md clause; slides held).
