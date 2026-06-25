# Archaeology — chunk 08/9 directive extraction

Source: `chunk-08.txt` — 169 chronological blocks (#239–#407), spanning **2026-06-21 → 2026-06-22**.

The overwhelming majority of blocks in this chunk are **process noise** deliberately excluded per the brief:
- ~120 auto-fired **Stop-hook feedback** blocks (the verbatim "Absolutely none of the features work properly… the core dock should morph… flys in from the left" condition, repeated ~120×; the assistant's rebuttals are NOT human directives).
- ~30 **task-notification** workflow-completion blocks (agent output, not user input).
- 3 **compaction** summaries (#248, #309, #394) — mined for embedded user-message directives.

This left **~15 genuine HUMAN-authored messages** (blocks #247, #264, #324, #377, #384, #385, #388, #389, #390, #400, #401, #403, #406, + two directives surfaced only inside compact #394). They are dense — most carry multiple distinct directives, extracted individually below.

> NOTE on the persistent stop-hook: the verbatim "core DOCK should morph… expand pane… flys in from the left" condition was a **genuine user defect report** the user originally set as a session goal (it names a real bug). It is recorded ONCE as a directive (D1) and thereafter treated as repeated noise. The assistant spent the entire chunk arguing it was "factually false" — a real-paint-verify tension worth flagging.

---

## Directives

| # | Gist | Verbatim quote (≤20w) | Date | Category | Theme | Status |
|---|------|----------------------|------|----------|-------|--------|
| D1 | Core dock must MORPH itself; expand pane must animate IN the dock, not fly in from left | "the core DOCK should morph. The expand pane does not even animate in the dock, it flys in from the left" | 2026-06-21 | dock | dock-rework / ios27-fidelity | partial |
| D2 | Fix aliasing around dock corners | "There's aliasing around the corners" | 2026-06-21 | glass-material | ios27-fidelity | addressed |
| D3 | Union/split demos are broken and useless | "The union and split demos are useless and don't work properly" | 2026-06-21 | dock | dock-rework / real-paint-verify | partial |
| D4 | Need MANY more examples of dock functionality | "We need to have MANY more examples of the dock functionality" | 2026-06-21 | demo-storybook | more-demos | partial |
| D5 | The rail sits WITHIN a dock (not a standalone vertical dock) | "The rail should sit WITHIN a dock" | 2026-06-21 | dock | rail-as-hairline | addressed |
| D6 | Dock scrolling not fluid / not slow enough | "The scrolling is not fluid or slow enough" | 2026-06-21 | dock | liquid-weight | partial |
| D7 | Dock icons not visible enough | "The icons are not visible enough?" | 2026-06-21 | dock | ios27-fidelity | partial |
| D8 | Want examples where the dock splits/morphs into separate elements (Apple Music) | "the dock splits out into, morphs into, separate elements, like in our apple music demo" | 2026-06-21 | dock | goo-split-subdock | partial |
| D9 | Brainstorm and refine dock work | "Brainstorm and refine" | 2026-06-21 | design-principles | iterate-converge | addressed |
| D10 | Split islands "not fully joined" — goo merge incomplete | "Not fully joined." | 2026-06-21 | viz-procedural | goo-merge / metaball | partial |
| D11 | Dock spacing is wrong | "The spacing in this dock is wrong" | 2026-06-21 | dock | dock-rework | partial |
| D12 | Vertical dock is unstyled | "vertical dock is not styled" | 2026-06-21 | dock | vertical-dock-style | addressed |
| D13 | Current state is bugged out | "This is bugged out." | 2026-06-21 | gates-quality-process | real-paint-verify | partial |
| D14 | Rail is a HAIRLINE inside the horizontal or vertical dock, not a vertical dock | "The rail should not be a vertical dock--its a hairline that sits INSIDE the horizontal or vertical dock" | 2026-06-21 | dock | rail-as-hairline | addressed |
| D15 | Deploy several workflows to iterate | "Deploy several workflows to iterate." | 2026-06-21 | gates-quality-process | fleet-fanout | addressed |
| D16 | DEEP 32-agent audit of original plan + waves + all changes, against the iOS-27 movies/screenshots | "DEEPLY audit with 32 agents in parallel our original plan and waves thereof… provided movies, sceenshots of the ios27 interface" | 2026-06-21 | gates-quality-process | 32-agent-audit / ios27-fidelity | addressed |
| D17 | NO quick solutions, NO workarounds — idiomatic gestalt approaches only | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches" | 2026-06-21 | design-principles | gestalt-not-patch | addressed |
| D18 | Architectural transpositions for elegance/simplicity/performance are necessary + desirable | "architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable" | 2026-06-21 | design-principles | architecture-over-patch / KISS | addressed |
| D19 | NO legacy code | "NO legacy code." | 2026-06-21 | design-principles | no-legacy | addressed |
| D20 | Animations improving but still need work | "The current animations are getting better. Needs work." | 2026-06-21 | motion-animation | liquid-weight | partial |
| D21 | Validate ALL morphing works on Safari | "validate that all morphing works on safari" | 2026-06-21 | a11y-perf-safari | safari-compat | partial |
| D22 | Devise a path forward; recapitulate original prompts/plans/precepts | "Devise a path forward… recapitulate our original prompts, plans, and precepts" | 2026-06-22 | gates-quality-process | recap-all-prompts | addressed |
| D23 | Delineate chronically deferred items + fold into the new tranche | "Delineate any chronically deferred items and fold them into this new tranche" | 2026-06-22 | gates-quality-process | fold-deferred | addressed |
| D24 | Recap ALL prompts/requests hitherto + ensure addressed | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed." | 2026-06-22 | gates-quality-process | recap-all-prompts | addressed |
| D25 | This is tranche DEVELOPMENT only — NOT an implementation phase | "This is NOT an implementation phase. Tranche development only." | 2026-06-22 | gates-quality-process | spec-not-build | addressed |
| D26 | Core model orchestrates; defer to Opus/Sonnet for fan-out; batches of 3 to dodge rate walls | "Use your core model for orchestration… defer to Opus or Sonnet for workflow fanout. Use batches of three agents in parallel" | 2026-06-22 | gates-quality-process | opus-fanout / rate-wall | addressed |
| D27 | Focus on liquid-glass + iOS-27 items from last 20 messages incl. video/picture examples | "you must focus on the liquid glass and ios 27 items from the last 20 messages, including video and picture examples" | 2026-06-22 | design-principles | ios27-fidelity | addressed |
| D28 | Build a detailed dock spec: liquid morphing, layering, contextual switching, grow/shrink on events (scroll/touch) | "Create a detailed liquid morphing, dock layering, contextual switching, growing/shrinking on events (scroll, touch, etc)" | 2026-06-22 | dock | dock-rework / contextual-switch | addressed |
| D29 | Ensure extant demo works: splitting, railing, vertical AND horizontal docks | "ensure that our extant demo is working, splitting, railing, vertical AND horizontal docks" | 2026-06-22 | demo-storybook | real-paint-verify | partial |
| D30 | Status on BC/BD/BE/BF tranches; nothing implemented yet | "Status on the BC, BD, BE, and BF tranches. Nothing should be implemented quite yet" | 2026-06-22 | gates-quality-process | spec-not-build | addressed |
| D31 | UNION the BC/BD/BE/BF tranches into one | "we likely need to union these several tranches into one" | 2026-06-22 | gates-quality-process | tranche-union | addressed |
| D32 | Turn off the cron + the goal | "Turn off the cron, turn off the goal." | 2026-06-22 | gates-quality-process | cron-off | addressed |
| D33 | This is now tranche development, hardening, AND de-duplication | "This is now a tranche development, hardening, and de-duplication process." | 2026-06-22 | gates-quality-process | dedup / spec-not-build | addressed |
| D34 | Analyze + synthesize last 100+ sessions; fold ALL process/items into BD | "analyze and synthesize our last 100+ sessions and fold ALL process and mentioned items herein to this new BD tranche" | 2026-06-22 | gates-quality-process | historical-hardening / fold-all | addressed |
| D35 | Validate + challenge the begotten prototype against our "spec" | "validate and challenge the begotten prototype based on our 'spec'" | 2026-06-22 | dock | challenge-prototype | addressed |
| D36 | Per-component spec for the Dock + ALL facilities (rail, V/H, all animation + morphing) | "develop out a per-component spec for the Dock and ALL facilities from the rail, vertical/horizontal, ALL of the animation facilities and morphing" | 2026-06-22 | dock | dock-spec / per-component | addressed |
| D37 | Dock expands to display different contexts, dynamically + contextually switches layers w/ beautiful animations | "a dock that can expand out to display different contexts, dynamically and contextually switches layers with beautiful animations" | 2026-06-22 | dock | contextual-switch | addressed |
| D38 | Splitting insofar as becoming visually-distinct elements | "splitting insofar as becoming visually distinct elements" | 2026-06-22 | dock | goo-split-subdock | addressed |
| D39 | Robust but KISS API for using/scrolling/linking the dock to other elements (dropdowns, other docks) | "a robust, though with all items, KISS, API for using the dock, scrolling the dock, linking the dock to transition to other elements" | 2026-06-22 | components-encapsulation | KISS-encapsulation / dock-link-api | addressed |
| D40 | Prototype, spawn the dev server, validate in Safari AND Chrome | "We should plan to prototype, spawn the dev server thereof, and validate in safari and chrome" | 2026-06-22 | a11y-perf-safari | safari-compat / live-validate | partial |
| D41 | Execute in stages: a research + archaeology phase to uncover session progress + edicts | "Execute the above in stages, a research and aerchology phase to uncover our session progress, edicts" | 2026-06-22 | gates-quality-process | archaeology-phase | addressed |
| D42 | De-duplicate wave specs into ONE coherent set covering dock/aurora/etc — ALL unique changes | "De-duplicate wave specifications, and fold them into a single, coherent wave set covering the dock, aurora, etc: ALL unique changes hereof" | 2026-06-22 | gates-quality-process | dedup / tranche-union | addressed |
| D43 | Aggressively + ruthlessly prototype every listed facility; spawn critique swarm to validate/challenge | "aggressively and ruthlessly prototype every listed facility, thereupon spawning a swarm of critique agents to validate and challenge the prototype" | 2026-06-22 | gates-quality-process | prototype-aggressive / challenge | addressed |
| D44 | Iterative loop until convergence | "this and all things should be done in an iterative loop until convergence" | 2026-06-22 | gates-quality-process | iterate-converge | addressed |
| D45 | Two reference videos: tab animation spec + iOS-27 glass transitions (album fade, bi-directional dock morph, context-switch, sub-sections, shrunken state, layers, sub-docks) | "The first video demonstrates how our baseline tabs must function… the album fade up and out, the dock morphing with full bi-directionality… sub-docks (notice how the apple music logo goo-splits off…)" | 2026-06-22 | dock | ios27-fidelity / goo-split-subdock | partial |
| D46 | Apple Music logo goo-splits off the core dock to form the abstract bottom dock | "the apple music logo goo-splits off from the core dock to form the abstract bottom dock" | 2026-06-22 | dock | goo-split-subdock | partial |
| D47 | Second video: Apple aurora generative demos to match, better, and fully implement | "The second video displays a few apple aurora generative demos that we should seek to match, better, and implement fully" | 2026-06-22 | viz-procedural | aurora-everywhere / ios27-fidelity | partial |
| D48 | Maps screenshot: the new enhanced liquid-glass card + UI from iOS-27 Maps | "a screenshot to demonstrate the new enhanced liquid glass card and UI from the maps app within ios 27" | 2026-06-22 | glass-material | maps-card / ios27-fidelity | partial |
| D49 | Entire glass/dock/animation/card/tab/aurora suite (+ buttons/icons) audited + FULLY aligned or bettered than input | "Our entire glass, dock, animation, card, tab, and aurora suite… must be audited, researched, and FULLY aligned or bettered than the input" | 2026-06-22 | design-principles | match-or-better-apple | addressed |
| D50 | Analyze each video FRAME BY FRAME, animation by animation | "Fastidiously and deeply analyze each video, frame by frame, animation by animation" | 2026-06-22 | gates-quality-process | frame-by-frame | addressed |
| D51 | Each planning pass emits a % completion; converge to 100% before developing the implementation tranche | "each pass will output a percentage of completion… whereupon 100% convergence we'll stop and develop out the tranche plans" | 2026-06-22 | gates-quality-process | percent-convergence | addressed |
| D52 | Research apple.com, awwwards.com, latest iOS-27 + macOS "golden gate" design guidelines to find gaps | "research the apple website, the awwwards website… latest ios 27 and macos golden gate design facilities, guidelines" | 2026-06-22 | design-principles | research-references | addressed |
| D53 | Liquid-tab indicator spec: selected item grows liquid → blob slightly BIGGER than needed (overshoot) → travels → settles → shrinks to proper tab size | "the selected item should grow in a liquid fashion, blob to become slightly bigger than needed and then… transition to the destination tab… settle… then begin to shrink slightly" | 2026-06-22 | motion-animation | liquid-tab / liquid-weight | partial |
| D54 | Triumvirate loop (research → plan → tranche-write → prototype) feature-by-feature, then hardening fleet | "iterative triumvariate research, plan, tranche write, and prototype if need be… deploy a fleet of hardening agents to ruthlessly critique" | 2026-06-22 | gates-quality-process | triumvirate-loop / challenge | addressed |
| D55 | Gestalt-hardening pass for inter-wave consistency/cogency/congruence; identify dissonance; add/prune/rewrite waves | "A gestalt hardening looping pass… identify areas of dissonance, challenge the begotten waves in totality… Add or prune waves as need be" | 2026-06-22 | gates-quality-process | gestalt-hardening / congruence | addressed |
| D56 | Ensure each wave is CONGRUENT to design language, KISS/DRY, encapsulation, default-shadcn abrogation | "each wave is perfected and CONGRUENT to our design language, our KISS and DRY idioms, our component and composable and sub-component encapsulation, our default shadcn abrogation" | 2026-06-22 | components-encapsulation | KISS-encapsulation / shadcn-abrogation / DRY | addressed |
| D57 | Identify + redress development friction in the waves NOW | "What areas of development friction might we have in these waves that we can seek to redress now?" | 2026-06-22 | gates-quality-process | reduce-friction | addressed |
| D58 | Validate dev server is up + use the devtools MCP for Chrome — error-free is NOT enough | "Use your devtools MCP, too, for chrome development: error-free is not enough" | 2026-06-22 | a11y-perf-safari | live-validate / real-paint-verify | partial |
| D59 | Must validate the animations, the morphing, the frames — not just error-free | "We must validate the animations, the morphing, the frames, etc." | 2026-06-22 | gates-quality-process | real-paint-verify | partial |
| D60 | Dev server is down — respawn it | "It's not on http://localhost:5173--spawn it again." | 2026-06-22 | gates-quality-process | live-validate | addressed |
| D61 | "What of our glass dock demo and research hereof" — wants the dock demo + research surfaced | "And what of our glass dock demo and research hereof" | 2026-06-22 | demo-storybook | dock-demo | partial |
| D62 | Glass facilities for EVERY element; analyze birthdaycolor.com + best it; all glass + goo metaballing MUST work in Safari | "We should have glass facilities for every element… all glass and goo meatballing MUST work in safari: https://www.birthdaycolor.com" | 2026-06-22 | glass-material | glass-every-element / safari-compat | partial |
| D63 | Prove the dock + ALL generative-viz APIs; list them all; spawn dev server to audit as you prototype | "Prove to me the dock and our generative visualizations APIs… list them all and spawn the dev server for me to audit" | 2026-06-22 | viz-procedural | viz-suite-audit / live-validate | partial |
| D64 | Rename goo-blob to just "blob" | "goo-blob (which should be renamed to just blob)" | 2026-06-22 | viz-procedural | naming / blob-rename | unaddressed |
| D65 | Paper grid that warps + is subtly perturbed (wave-based math) | "What of our paper grid that warps and is subtly perturbed?" | 2026-06-22 | viz-procedural | paper-grid / wave-perturbation | partial |
| D66 | Dot flow field: dots fade in/out, grow/shrink, tessellate into a dot-matrix to show arbitrary images (blob, wave, cloud washing over naturally) using aurora-like logic | "a series of dots that fade in and out, grow and shrink… tesselate and display to show arbitrary images in a dot-matrix facility… leverage similar aurora logic" | 2026-06-22 | viz-procedural | dot-flow-field / dot-matrix | partial |
| D67 | Concentric ellipsoids: irregular rings of arbitrary count, move together w/ inner variation, like topological gradient level-sets, warp/perturb on same wave math | "irregular rings of an arbitrary count… look like the level set lines of a topological gradient map… warp and perturb… same wave-based math as the grid lines" | 2026-06-22 | viz-procedural | concentric / level-sets / wave-perturbation | partial |
| D68 | Implementation note: draw level sets of a randomly-generated curve, aggregate flows together, each level-set perturbs subtly | "draw these level sets of a randomly generated curve… have the aggregate move together and flow… random, subtle, perturbations for each level set" | 2026-06-22 | viz-procedural | concentric / level-sets | partial |
| D69 | Each visualization needs a robust configurator | "Each visualztion should have a robust configurator" | 2026-06-22 | components-encapsulation | configurator | partial |
| D70 | Each visualization interactable with mouse/keyboard etc; birthdaycolor-like interactivity (aurora supersedes it) | "Each visualzation should have a level of interactiablity with the mouse, keyboard… birthdaycolor-like interactiability" | 2026-06-22 | viz-procedural | viz-interactivity | partial |
| D71 | Re-develop goo blob from first-principles; option for cartoon-shadow style or not | "The goo blob should be re-developed from first-principles and have an option for a cartoon-shadow style, or not" | 2026-06-22 | viz-procedural | blob-redesign / cartoon-shadow | partial |
| D72 | Blob: robust interactivity + FOUR "emotional" states controlling movement tendencies | "four 'emotional' states that control facilities of the blob and its tendencies for movement" | 2026-06-22 | viz-procedural | blob-emotional-states | unaddressed |
| D73 | Each blob has a configurable number of satellite blobs that morph in/out of the core, moving lava-lamp-like + randomized | "configurable number of satelliete blobs that morph in and out of the core blob… move about in a randomized, lava-lamp, like way" | 2026-06-22 | viz-procedural | blob-satellites / lava-lamp | partial |
| D74 | Multiple blobs spawnable together, interacting organically + morphing in/out | "Multiple blobs should be able to be spawed together and interact organically, morphing in and out" | 2026-06-22 | viz-procedural | multi-blob | partial |
| D75 | Fluid + lava-lamp facilities must be robust, smooth, liquid-glass-like | "The fluid and lava-lamp facilities should be robust, smooth, and liquid glass like" | 2026-06-22 | viz-procedural | liquid-weight / lava-lamp | partial |
| D76 | All web visuals use WebGPU or WebGL2 — NO canvas at all; no fallbacks, no legacy | "All web facilities should use either webgpu or webgl2 with no usage of the canvas at all. No fallbacks, no legacy behavior." | 2026-06-22 | viz-procedural | webgpu-webgl2-only / no-canvas / no-legacy | partial |
| D77 | Every viz item ruthlessly researched, planned, prototyped in workflows; critique agents after each iteration, fold feedback forward | "Every item… ruthlessly researched, planned, and prototyepd… A series of crqituing agents should be spawed after every iteration and then that feedback folded into the next" | 2026-06-22 | gates-quality-process | iterate-converge / challenge | addressed |
| D78 | Brainstorm + list ideas for our visualizations | "Brainstorm and list ideas for our visualiztations." | 2026-06-22 | viz-procedural | brainstorm-viz | partial |
| D79 | Use iOS-27 videos/images as the north star for dock; the dock should be our HALLMARK | "Use our ios27 videos and images as a north star for dock facilities, too. The dock should be our hallmark." | 2026-06-22 | dock | dock-hallmark / ios27-fidelity | partial |
| D80 | ALL procedurally-generated vizes analyzed, not just the named ones | "ALL of our proceduerally generated vizes should be analyzed, not just the above" | 2026-06-22 | viz-procedural | viz-suite-audit | partial |
| D81 | Dot flow field: approach but FAR SURPASS a reference background (video provided) | "For the dot flow field, we should seek to approach, but far surpass, the following background." | 2026-06-22 | viz-procedural | dot-flow-field / match-or-better | partial |
| D82 | New METALLIC aurora variant: simulate a metallic gradient flow field redolent of iOS-27 flow backgrounds | "a suffused new aurora variat, metallic, which will simulate a metallic graidient-like flow field… redolent of the ios27 flow field backgrounds" | 2026-06-22 | viz-procedural | metallic-aurora / metallic-cure | partial |
| D83 | Two metallic variants: pure liquid-metal, and a gradient-metallic w/ minor sparkle imperfections + other colors | "two variants, a pure metal version… and a graidient metallic variant, which contains minor sparkle imperfections and other colors therein" | 2026-06-22 | viz-procedural | metallic-aurora | partial |
| D84 | Full workflow fleet: analyze every element, abrogate shadcn styling, suffuse newer iOS-27 design language | "a full workflow fleet should analyze every element, and abrogate shadcn styling, and then suffuse the newer ios27 design language" | 2026-06-22 | components-encapsulation | shadcn-abrogation / ios27-fidelity | partial |
| D85 | Remember the original prompt: historical hardening, glass-ui animation, liquid transition; prototype aggressively | "Remember our original prompt--ensure historical hardening, glass-ui animation, and liquid transition. Prototype aggressively." | 2026-06-22 | gates-quality-process | historical-hardening / prototype-aggressive | addressed |
| D86 | Clarification: we're NOT abrogating GLASS — we're abrogating default reka/shadcn/tailwind styling | "we're not abrogating GLASS we're abrogating default reka/shadcn/tailwind styling" | 2026-06-22 | components-encapsulation | shadcn-abrogation / keep-glass | addressed |
| D87 | Dock must expand into an ARBITRARY facility (not just a card) — generalized, not hardcoded/overfit | "We should be able to expand out from the dock in an abritrary facility--not just into a card, but into anything else" | 2026-06-22 | dock | dock-generalized-api / no-overfit | partial |
| D88 | Generalized API: the dock is a central hub for control + UI (not hardcoded facilities) | "a generalized API for having the dock be a central hub for control and user interface" | 2026-06-22 | dock | dock-link-api / central-hub | partial |

---

## Summary

**Genuine human directives extracted:** 88 (from ~15 real human messages out of 169 blocks; the remaining ~150 blocks are auto-fired stop-hooks, task-notifications, and compaction summaries — process noise excluded per brief).

### Theme histogram (descending)

| Theme cluster | Count |
|---|---|
| viz-procedural (dot-flow-field · concentric · blob-redesign · metallic-aurora · paper-grid · lava-lamp · webgpu-only · viz-interactivity) | 24 |
| dock (rework · rail-as-hairline · goo-split-subdock · contextual-switch · generalized-api · vertical-style · dock-hallmark) | 23 |
| gates-quality-process (32-agent-audit · triumvirate-loop · dedup · recap-all · spec-not-build · real-paint-verify · convergence) | 22 |
| design-principles (no-legacy · gestalt-not-patch · KISS · architecture-over-patch · ios27-fidelity · match-or-better) | 9 |
| ios27-fidelity (as a cross-cutting reference standard) | 9 |
| safari-compat / a11y-perf-safari | 6 |
| components-encapsulation (KISS-encapsulation · shadcn-abrogation · DRY · configurator) | 6 |
| glass-material (maps-card · glass-every-element · aliasing) | 4 |
| motion-animation (liquid-tab · liquid-weight) | 3 |
| demo-storybook (more-demos · dock-demo) | 4 |

### Recurring themes (the demands hammered most)

1. **ios27-fidelity / match-or-better-Apple** — the north star: dock morph, album fade, Maps card, Apple aurora demos, frame-by-frame video analysis, research apple.com/awwwards.
2. **dock-rework** — the chronic: core dock must MORPH itself, rail-as-hairline-in-dock, goo-split into sub-docks, contextual layer-switch, generalized expand-into-anything API, vertical+horizontal styled.
3. **no-legacy / gestalt-not-patch / architecture-over-patch** — repeated verbatim ("NO legacy code", "NO quick solutions, NO workarounds: idiomatic, gestalt approaches", "architectural transpositions").
4. **viz-procedural suite spec** — first-principles blob redesign (4 emotional states + lava-lamp satellites + cartoon-shadow option), metallic aurora (2 variants), dot-flow-field dot-matrix, concentric level-set rings, warping paper grid — all WebGPU/WebGL2-only, no canvas.
5. **real-paint-verify / live-validate** — "error-free is not enough"; validate animations/morphing/frames live in Safari AND Chrome via devtools MCP; the persistent stop-hook defect.
6. **safari-compat (absolute)** — all glass + goo metaballing MUST work in Safari; validate all morphing on Safari.
7. **liquid-weight / liquid-tab** — the 5-phase tab indicator (grow → overshoot blob → travel → settle → shrink); fluid lava-lamp; scrolling not fluid enough.
8. **tranche-process** — union BC/BD/BE/BF into one; archaeology phase; recap ALL prompts; fold deferred/chronic; dedup waves; triumvirate + gestalt-hardening loops; % convergence; Opus/Sonnet fan-out in batches of 3; spec-not-build.
9. **KISS-encapsulation / shadcn-abrogation / DRY** — robust-but-KISS dock API; congruence to design language; abrogate default reka/shadcn/tailwind styling (NOT glass).

### ~18 most notable / unique directives

- **D53** — the liquid-tab 5-phase spec: "grow in a liquid fashion, blob to become slightly bigger than needed and then begin to transition… settle… then shrink slightly to be the appropriate size" (the verbatim overshoot-then-settle tab morphology).
- **D72** — blob FOUR "emotional" states controlling movement tendencies (a genuinely novel, unaddressed capability ask).
- **D71** — re-develop goo blob from FIRST-PRINCIPLES with an optional cartoon-shadow style.
- **D64** — rename goo-blob → just "blob" (terse, concrete, appears unaddressed).
- **D67/D68** — concentric ellipsoids as topological-gradient level-sets of a randomly-generated curve, moving together with per-ring perturbation on the same wave math as the grid.
- **D66** — dot-flow-field as a dot-matrix that tessellates to show arbitrary images (blob/wave/cloud washing over naturally) using aurora logic.
- **D82/D83** — metallic aurora: pure liquid-metal variant + gradient-metallic variant with minor sparkle imperfections.
- **D76** — WebGPU/WebGL2-ONLY, NO canvas at all, no fallbacks, no legacy.
- **D87/D88** — the dock as a generalized central hub: expand into ARBITRARY facility, not hardcoded/overfit into a card.
- **D14** — the rail is a HAIRLINE inside a dock, not a vertical dock (the sharp correction that re-architected the rail).
- **D46** — Apple Music logo GOO-SPLITS off the core dock to form the abstract bottom dock (the headline iOS-27 morph).
- **D48** — match the iOS-27 Maps enhanced liquid-glass card (the screenshot reference).
- **D86** — clean clarification: abrogate default reka/shadcn/tailwind styling, NOT glass.
- **D62** — glass facilities for EVERY element; best birthdaycolor.com; all glass + goo metaballing MUST work in Safari.
- **D31/D32/D33** — union BC/BD/BE/BF into one tranche; turn off the cron + goal; tranche-development + hardening + de-duplication.
- **D58/D59** — "error-free is not enough… validate the animations, the morphing, the frames" via devtools MCP (the real-paint-verify mandate).
- **D26** — orchestration discipline: core model orchestrates, Opus/Sonnet fan-out, batches of 3 to dodge rate walls.
- **D79** — "The dock should be our hallmark" (the elevation of the dock to the signature feature).
