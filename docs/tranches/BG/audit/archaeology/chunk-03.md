# BG Archaeology — Chunk 03 directive extraction

Source: `archaeology/chunks/chunk-03.txt` — 169 chronological blocks (mostly task-notifications; ~45 human-authored), spanning **2026-06-05 → 2026-06-07**. This window covers glass-ui Tranches AU/AV/AW (and the re-formulation to AX), the slides Tranche F/G/H 5-6-slide rework, the aurora/blob "perfect this" push, the anti-AI-writing style edicts, and the "dock broken / specular extreme / goo broken" defect reports.

Process noise excluded: bare "continue" / "re-deploy all agents" cron prompts (#190, #198, #238, #244), pure Stop-hook nags (#224, #225, #240-#243), context-usage dumps (#87), and bare approvals (#223). Directives embedded inside cron/goal-set messages ARE captured.

---

## Directives (chronological)

### #84 / #187 / #248 — The recurring big-feedback block (dock-not-springy, progress de-dock, language, mobile, xray, constellation)
This block recurs near-verbatim three times (2026-06-05, 06-07, 06-07). Each component directive listed once with the earliest date.

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 1 | Dock animations must be properly springy + iOS-like | "The glass-ui dock animations are not properly springy and ios-like." | 2026-06-05 | dock | ios27-fidelity / dock-rework | partial |
| 2 | Dock shrinks BEFORE inner items fade/morph out — fix the lag | "the dock will shrink first, and THEN the items will start shrinking a few ms later" | 2026-06-05 | motion-animation | dock-rework / liquid-weight | partial |
| 3 | Slides progress bar must NOT be baked into the dock — bottom-of-page element | "the slides bottom progress bar should NOT be baked into the dock--it should be an element on the bottom of the page as it was before" | 2026-06-05 | shell-routing-field | de-dock-progress | addressed |
| 4 | "Few dollars" language is shoehorned — tune it | "The 'few dollars' lanugage isn't great--tune our language to not be so shoe-horned" | 2026-06-05 | type-typography | language-tune | addressed |
| 5 | pptx download needs icons + a light/dark popover | "download pptx should have icons, and another popover should appear for the light/dark pptx download" | 2026-06-05 | components-encapsulation | slides-polish | addressed |
| 6 | Access-key modal must be glass-ui styled — it's ugly | "the access key modal should be more glass-ui styled--it's ugly as it stands" | 2026-06-05 | glass-material | glass-standardize | addressed |
| 7 | Locked homepage slides slightly blurred + a lock symbol | "the locked slides, on the homepage, should be slightly blurred out, and have a lock symbol thereon" | 2026-06-05 | components-encapsulation | locked-affordance | addressed |
| 8 | Some mobile slides are squished with icon bullets | "Some of the sldies on mobile are squished with icons like:" | 2026-06-05 | a11y-perf-safari | mobile-reflow | addressed |
| 9 | AI XRAY page must fill height on mobile + remove "Open AI XRAY" button (portal opens it) | "remove the Open AI XRAY button--the portal should do that if need be" | 2026-06-05 | shell-routing-field | mobile-reflow / no-dead-button | addressed |
| 10 | Too much negative space (xray) | "See how there's so much negative space therein?" | 2026-06-05 | demo-storybook | negative-space | addressed |
| 11 | Constellation not visible enough on dark OR light | "The constellation is not visible enough on darkmode, and not quite visible enough on lightmode either." | 2026-06-05 | viz-procedural | constellation-visibility | addressed |
| 12 | A graph aspect ratio is wrong on mobile | "This graph is not right and the aspect ratio is wrong on mobile." | 2026-06-05 | viz-procedural | mobile-reflow | addressed |
| 13 | Constellation should be abstracted into a glass-ui component | "constellation (this should be abstracted into a glass-ui component, if not already)" | 2026-06-05 | components-encapsulation | constellation-primitive | addressed |
| 14 | Converge on a library OPTIMUM — slides consumes glass-ui for every befitting component | "We must properly converge upon a library optimium for glass-ui, which is used by slides for every major component that's BEFITTING" | 2026-06-05 | components-encapsulation | library-optimum | partial |

### #84 (process/principle directives in the big block)

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 15 | NO legacy code | "NO legacy code." | 2026-06-05 | design-principles | no-legacy | addressed |
| 16 | No quick solutions/workarounds; idiomatic gestalt approaches | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches." | 2026-06-05 | design-principles | gestalt-not-patch | addressed |
| 17 | Architectural transpositions for elegance/simplicity/performance are desirable | "architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable" | 2026-06-05 | design-principles | gestalt-not-patch | partial |
| 18 | Recap ALL prior prompts; ensure each addressed; this is the anti-amnesia mandate | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed." | 2026-06-05 | gates-quality-process | anti-amnesia | partial |
| 19 | Fold chronically-deferred + deferred items into the tranche | "Delineate any chronically deferred items and fold them into this new tranche." | 2026-06-05 | gates-quality-process | fold-deferred | partial |
| 20 | This is tranche development only, NOT implementation | "This is NOT an implementation phase. Tranche development only." | 2026-06-05 | gates-quality-process | tranche-dev-only | addressed |
| 21 | Augment the tranches, don't replace them | "augment them, don't replace them" | 2026-06-05 | gates-quality-process | augment-not-replace | addressed |
| 22 | Break large components (>500 lines) into smaller sub-components; colocate; modern Vue | "We should break large components (>500 lines especially) into smaller sub-components when befitting" | 2026-06-05 | components-encapsulation | KISS-encapsulation | addressed |
| 23 | Complex components → sub-component dirs (components/composables/constants/skeletons) | "Complex components should be structured into sub-component dirs with components, composeables, constants, skeletons, thereof, if needed." | 2026-06-05 | components-encapsulation | KISS-encapsulation | addressed |
| 24 | Logical file/dir grouping without contrivance or over-engineering; KISS | "Logical grouping of files, modules, components, into directories without contrivance or over-engineering. KISS." | 2026-06-05 | components-encapsulation | KISS-encapsulation | addressed |
| 25 | Audit for deeply nested or brittle CSS/reactivity selectors | "Audit for deeply nested or brittle selector usage insofar as CSS or reactivity." | 2026-06-05 | components-encapsulation | brittle-selectors | partial |
| 26 | Non-idiomatic Tailwind / monolithic stylesheets / deprecated CSS / fragile calc-chains | "(1) non-idiomatic Tailwind usage (2) monolithic/global stylesheet patterns ... (4) fragile rules (magic numbers, brittle calc()...)" | 2026-06-05 | design-principles | tailwind-idiom | addressed |
| 27 | A localized area defining all design idioms while keeping colocation; design cohesion | "we should have a localized area that defines all of our design idioms—but still leverages proper colocation" | 2026-06-05 | design-principles | design-idiom-home | addressed |
| 28 | Style changes must be perfectly isomorphic unless highly befitting | "Ensure that any style changes are perfectly isomorphic thereto, unless HIGHLY befitting otherwise." | 2026-06-05 | design-principles | isomorphic-restyle | addressed |
| 29 | Full push and publish is the goal; only complete after | "Full push and publish is the goal. Only complete after that." | 2026-06-05 | gates-quality-process | ship-to-prod | partial |

### #88 — Slide rework to 5-6 slides + the data-analysis conceit

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 30 | Re-work slides in language and content; winnow to 5-6 (maybe 5 + nutrition label) | "winnow it down to 5-6 slides in totality, maybe 5 + the nutrition label" | 2026-06-05 | demo-storybook | slides-rework | addressed |
| 31 | Conceit: AI-augmented data analysis; teach-to-fish; provide the fish, teach thereupon | "how we can perform data analysis, augmented by and facilitated by AI, and teach state organizations these practices ... provide the fish, teach thereupon" | 2026-06-05 | type-typography | slides-content | addressed |
| 32 | Headline: anomaly detection via classical + AI; union of human + AI to flag for review | "Headline: anomaly detection via classical data analysis and AI: automations that union human effort and AI-backed analysis" | 2026-06-05 | type-typography | slides-content | addressed |
| 33 | Continuous data monitoring on a cadence (daily/weekly/monthly) across departments | "Continuous data monitoring, peforming the above, on a regular interval" | 2026-06-05 | type-typography | slides-content | addressed |
| 34 | Highlight: the DIT invoice system is broken + needs modernization | "the DIT invoice system is broken, and in dire need of modernization via some process" | 2026-06-05 | type-typography | slides-content | addressed |
| 35 | Most AI workflows are hybrid (AI churns, human at key junctures), not 100% automation | "Most AI workflows are not about 100% automation but a hybrid process that unions AI and human analysis" | 2026-06-05 | type-typography | slides-content | addressed |

### #89 / #382 — modern-web-guidance grounding

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 36 | Audit all items through modern-web-guidance (the npm package), Baseline-dated | "The modern-web-guidance skill gave authoritative, baseline-dated guidance ... use the npm package thereof" | 2026-06-05 | gates-quality-process | baseline-ground | addressed |

### #92 — Verification press

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 37 | Verify all items folded into tranches, pursuant to precepts, fully formed, tasks updated | "Have all items been folded into our tranches? Fully pursuant to precepts/? Fully formed? Tasks updated?" | 2026-06-05 | gates-quality-process | verify-folded | partial |

### #121 — Audit cadence (32 → 16 → 6 agent loop)

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 38 | Maximal audit cadence: 32-agent audit → 16-agent harden/challenge → 6-agent ameliorate | "a scrupulous 32 agent workflow to audit ... then another 16 agent workflow to harden and challenge ... finally a 6 agent task force to ameliorate" | 2026-06-05 | gates-quality-process | audit-harden-cadence | addressed |
| 39 | Finalize glass-ui publishing + fully-pushed slides.friday.institute, then complete | "finalized glass-ui publishing, and finalized, fully-pushed, slides.friday.institute" | 2026-06-05 | cross-repo | ship-to-prod | partial |

### #131 — shadow-cartoon + aurora/blob SOTA

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 40 | shadow-cartoon-lg is to ship | "shadow-cartoon-lg is to ship." | 2026-06-06 | glass-material | cartoon-punch | addressed |
| 41 | Fix aurora + fully audit aurora spec and blob spec (32 agents) | "Fix aurora, too, and fully audit that spec, and the blob spec, with another 32 agents in parallel." | 2026-06-06 | viz-procedural | aurora-fix / blob-fix | partial |
| 42 | Research SOTA for both animations and procedural animations | "Research that sort of SOTA for both animations and procedural animations." | 2026-06-06 | viz-procedural | sota-research | addressed |
| 43 | Start glass-ui + slides locally; validate + fully test each page | "Start both the glass-ui and slides items locally to validate and fully test each page" | 2026-06-06 | gates-quality-process | real-paint-verify | partial |

### #140 — value.js leverage + the de-duplicated constellation union

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 44 | Proper leveraging of value.js; perfected de-duplicated union value/keyframes/glass-ui/slides | "ensure a perfected, de-duplicated union between value.js, keyframes.js, glass-ui, and slides" | 2026-06-06 | cross-repo | dedup-union | partial |
| 45 | value.js owns parsing/colors; keyframes.js owns animations; CORE primitives in glass-ui | "value.js should own parsing, colors ... keyframes.js for animations" | 2026-06-06 | cross-repo | boundary-law | addressed |
| 46 | Slides-specific primitives live in slides; CORE primitives in glass-ui | "Slides should consume glass-ui primitives, and some of the CORE primitives thereof should be extant in glass-ui--the slides specific ones should be within the slides library" | 2026-06-06 | components-encapsulation | library-optimum | addressed |
| 47 | value.js + keyframes.js demos must consume glass-ui components idiomatically | "both value.js's demo and keyframes.js's demo should consume glass-ui components idiomatically" | 2026-06-06 | cross-repo | demo-consume-glass | partial |
| 48 | Align slides language with the Friday Institute Value Proposition doc | "audit the langauge of the slides ... aligned with: Friday Institute Value Proposition.md" | 2026-06-06 | type-typography | slides-content | addressed |

### #140 / #142 / #151 — THE WRITING-STYLE EDICTS (anti-AI-writing)

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 49 | Abrogate unsubstantiated claims, editorializing, "not just X but Y" comparisons | "abrogate any unsubstantiated claims, editorializing, comparison sentiments like 'it's not just x, but y'" | 2026-06-06 | design-principles | no-AI-writing | addressed |
| 50 | Limit em dashes; when used, no space between items | "Limit usage of em dashes, and when including them typically have no space between the items." | 2026-06-06 | type-typography | no-AI-writing | addressed |
| 51 | Do not over-punctuate; no pretense or grandiloquence | "Do not overly. punctuate. messages. like this. No pretense or grandiloquence." | 2026-06-06 | design-principles | no-AI-writing | addressed |
| 52 | Maintain user's levity + verbiage; do not overfit the style guide | "Maintain some aspect of my levity and congruence to my verbiage ... Do not overfit on this" | 2026-06-06 | design-principles | no-AI-writing | addressed |
| 53 | NO use of "engine", "quiet"; read the Wikipedia "Signs of AI writing" (6 agents) | "NO useage of engine, quiet--read over the ...Wikipedia:Signs_of_AI_writing with 6 agents" | 2026-06-06 | design-principles | no-AI-writing | addressed |
| 54 | NO language like "the method", "the x"; no "ledger"/"engine"; generalize + isolate language | "NO langugage like 'the method', 'the x', NO usage of things like ledger, engine, etc. Generalize over this and isolate the langauge" | 2026-06-06 | design-principles | no-AI-writing | partial |
| 55 | Closer reads in user's voice (e.g. "begotten workflow"), not flat phrasing | "'We hand over the findings and the workflow' should be 'We hand over the findings and the begotten workflow'--more my style" | 2026-06-06 | type-typography | no-AI-writing / levity | addressed |

### #151 — Live audit affordance

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 56 | Spawn Chrome instances for both slides + glass-ui demo so the user can audit | "spawn chrome instances for both slides and the glass-ui demo for me to audit" | 2026-06-06 | gates-quality-process | real-paint-verify | addressed |

### #159 / #160 — Tranche-dev-only + iOS-26 storybook goal-set

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 57 | This is pure tranche development, in many waves — not implementation | "This is NOT implementation. This is pure tranche development. In many waves." | 2026-06-06 | gates-quality-process | tranche-dev-only | addressed |
| 58 | Iterate + perfect storybook, primitives, glass-ui SOTA inspired by iOS 26, modern Tailwind | "iterate and perfect our storybook, primitives, glass-ui SOTA inspired by iOS 26, with idiomatic MODERN tailwind" | 2026-06-06 | glass-material | ios27-fidelity / glass-standardize | partial |

### #178 — Deploy gate + dark-mode inverse

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 59 | slides.friday.institute deployment is the final gate of completion | "deployment of slides.friday.institute as the final gate" | 2026-06-06 | cross-repo | ship-to-prod | partial |
| 60 | Fix locked-item modal text contrast color (slides) | "Fix, too, the locked item modal text contrast color for slides" | 2026-06-06 | a11y-perf-safari | contrast-fix | addressed |
| 61 | Every dark-mode slide must have a proper inverse | "ensure that each darkmode slide has a proper inverse, too" | 2026-06-06 | color-identity | dark-inverse | addressed |

### #182 — Publish authority delegated

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 62 | The assistant may handle publish + production deploy | "You can handle publish and production deploy." | 2026-06-06 | cross-repo | ship-to-prod | addressed |

### #187 — THE BIG STORYBOOK + AURORA/BLOB PERFECTION DIRECTIVE (the load-bearing block)

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 63 | Perfect storybook + EVERY component; consistent animation/design/interaction language | "Perfect the glass-ui storybook demo, and EVERY Component therein: focus on the dock animations, layering, rail" | 2026-06-07 | demo-storybook | language-consistency | partial |
| 64 | Each core feature aggressively audited/planned/researched/refined; 30+ waves; research→plan→harden→synthesize loop | "Plan to have 30+ waves for the next tranche. Utilize a multi-orchestrated agent workflow for a loop of reserach, planning, hardening, synthesis and tranche writing, looped until a convergent optimum" | 2026-06-07 | gates-quality-process | convergent-loop | addressed |
| 65 | Research-backed READMEs for core components (dock/constellation/aurora/blob); 32 research agents EACH for aurora + blob | "for the aurora and blob in particular, we should deploy a wave of 32 research agents for EACH ... to research the state of the art" | 2026-06-07 | viz-procedural | research-readme | addressed |
| 66 | Aurora: perfect style + visual detail; simplify the options set | "we must pefect this in terms of style, visual detail, and simplify the options set" | 2026-06-07 | viz-procedural | aurora-perfection | partial |
| 67 | Aurora needs a derive-color variant + FULL OKLAB/OKLCH support + total migration to modern color spaces | "we need a derive color variant, full OKLAB or OKLCH support, FULL and TOTAL migration to modern color spaces" | 2026-06-07 | color-identity | oklch-migration | addressed |
| 68 | Aurora: modern WebGPU rendering techniques | "modern web gpu techniques for rednering" | 2026-06-07 | viz-procedural | webgpu | partial |
| 69 | Oil-pastel mode much more visually interesting + van-Gogh redolent; painterly, less uniform, more depth | "refine our oil-pastel mode to be much more visually interesting and van-goh redolent ... a more painterly and less uniform style, with more visual interest and depth" | 2026-06-07 | viz-procedural | painterly-aurora | partial |
| 70 | Auroras = stunning gradient works of art, procedurally generated from atoms (control elements, zones, noise, color) | "stunningly beautiful, arresting, backdrops that are gradient works of art that are procedurally generated from atoms of different control elements, zones, noise, color" | 2026-06-07 | viz-procedural | painterly-aurora | partial |
| 71 | Look to landscape/skyscape photography + OpenAI gradient backdrops — BETTER them programmatically | "look to landscape and skyscape photography, focus on the OpenAI gradient-like backdrop items, but with the goal to BETTER them programatically" | 2026-06-07 | viz-procedural | painterly-aurora | partial |
| 72 | Van-Gogh variant = proper atomic brush strokes with depth/variation/congruence, no complex subject matter | "proper atomic brush strokes, with depth, varition, and a congruence to actual van gogh works, though without complex subject matter" | 2026-06-07 | viz-procedural | painterly-aurora | partial |
| 73 | ALL aurora: ultra-high-fidelity brush strokes + gradient work + visual interest | "an emphasis should be placed on ultra high-fidelity brush strokes, gradient work, and visual interest" | 2026-06-07 | viz-procedural | painterly-aurora | partial |
| 74 | Aurora + constellation fully dynamic + interactive if requested | "These should be fully dynamic and interactive if requested, too, as should the constellation component." | 2026-06-07 | viz-procedural | interactive-viz | partial |
| 75 | Blob perfected in visual style, animation, interaction; seamless integration; performance | "The blob component also needs to be perfected in terms of its visual style, animation, and interaction design" | 2026-06-07 | viz-procedural | blob-perfection | partial |
| 76 | None of the dock features/animations work correctly | "None of the dock features and animations work correctly." | 2026-06-07 | dock | dock-broken | partial |
| 77 | The dock with a slider is broken | "The dock with a slider is broken." | 2026-06-07 | dock | dock-broken | addressed |
| 78 | Remove all instrument-chassis items (from storybook/dock context) | "The instrument chasis items need to all be removed." | 2026-06-07 | demo-storybook | prune-storybook | partial |
| 79 | None of the fonts are correct | "None of the fonts are correct" | 2026-06-07 | type-typography | font-canon | addressed |
| 80 | The wrapping dock is not correct — better stylized | "The dock when it wraps is not correct and should be better stylyized" | 2026-06-07 | dock | dock-overflow | partial |
| 81 | Remove the header-ribbon story | "header-ribbon needs to be removed" | 2026-06-07 | demo-storybook | prune-storybook | addressed |
| 82 | native-top-layer story is totally broken | "foundations/native-top-layer is totally broken" | 2026-06-07 | demo-storybook | broken-story | addressed |
| 83 | Speedtest primitives should not live in glass-ui — speedtest owns them; audit that repo | "why do we have speedtesting primitives in glass-ui? Those should be owned by speedtest totally" | 2026-06-07 | components-encapsulation | repatriate-primitives | addressed |
| 84 | What is icon-button-token-ladder? (questioning storybook orphans) | "wtf is ...dock/icon-button-token-ladder" | 2026-06-07 | demo-storybook | prune-storybook | addressed |
| 85 | metric-badge vs metric-pill duplication; glyph-face should be removed; disco-glyph questioned | "wtf is ...metric-badge vs ...metric-pill; ...glyph-face it should be removed; ...disco-glyph" | 2026-06-07 | components-encapsulation | prune-orphans | addressed |
| 86 | Why is configurator a "primitive"? | "why tf is ...configurator a primitive?" | 2026-06-07 | demo-storybook | IA-restructure | addressed |
| 87 | All the glass-panels suck | "why do all of the ...glass-panel's suck?" | 2026-06-07 | glass-material | glass-broken | addressed |
| 88 | None of the Card toggles work | "none of these toggles work: ...primitives/card" | 2026-06-07 | components-encapsulation | broken-toggles | addressed |
| 89 | Re-structure all sidebar sections; where are aurora + blob? | "All of the sidebar sections need to be audited and re-structued--where's our aurora and blob items, too?" | 2026-06-07 | demo-storybook | IA-restructure | addressed |
| 90 | Carousel progress bar is broken; where's the slides bottom-bar primitive? | "the progress bar in ...navigation/carousel is broken--where's our slides primitive with our slides bottom bar?" | 2026-06-07 | components-encapsulation | broken-progress | partial |
| 91 | Dock items scattered across many sections — consolidate | "Why do we have dock items in many diff sections, too?" | 2026-06-07 | demo-storybook | IA-restructure | addressed |
| 92 | Collapse slider kinds to standard (glass-scrubber) + spectrum; port ALL consumers | "we should essentially have standard ... and the spectrum--ALL consumers should be updated to port to this" | 2026-06-07 | components-encapsulation | slider-unify | addressed |
| 93 | Slider knob must be FULLY ROUNDED (iOS), not pill-shaped/offset — one continuous track+knob | "this facility should have a ROUNDED, not pillshaped, slider button, like in IOS, fully rounded and not offset to form ONE continuous track item+knob" | 2026-06-07 | glass-material | ios27-fidelity | addressed |
| 94 | navigation/dock animations COMPLETELY broken — fix from first principles with the layering system | "The dock needs to be fixed with our layering system from first principles." | 2026-06-07 | dock | dock-broken / first-principles | partial |
| 95 | Deploy 128 agents to fully re-invent storybook structure + prune legacy | "Deploy 128 agents ... to fully re-invent the story book in structure, and PRUNE legacy and pointed out items" | 2026-06-07 | demo-storybook | prune-storybook | addressed |
| 96 | Excise legacy/deprecated/workaround/fallback code OR fail explicitly — no silent handling | "either excise the code entirely, or fail explicitly therein: no silent or graceful handling unless befitting" | 2026-06-07 | design-principles | no-legacy / fail-explicit | addressed |
| 97 | Better encapsulation, service boundaries, DI patterns, pipeline orchestration | "Divine an approach to achieve better encapsulation, consistency in service boundaries, dependency injection patterns, and pipeline orchestration" | 2026-06-07 | components-encapsulation | KISS-encapsulation | addressed |
| 98 | NO god modules — break files >500 lines | "NO god modules: break large files (>500 lines especially) into smaller, cohesive sub-modules" | 2026-06-07 | components-encapsulation | no-god-module | addressed |
| 99 | NO workarounds/fallbacks/special cases; no effusive dynamism; no nested imports; no test files in src | "NO workarounds, NO fallbacks, NO special cases. No effusive dynamicsim. NO nested imports. NO test files in src files." | 2026-06-07 | design-principles | no-legacy / KISS | addressed |
| 100 | DRY + KISS | "NO duplicated effort: DRY. KISS." | 2026-06-07 | design-principles | KISS-encapsulation | addressed |
| 101 | Run lint + typecheck at every interval | "Run linting and type checking to validate your changes at every interval." | 2026-06-07 | gates-quality-process | lint-typecheck-cadence | addressed |
| 102 | Slide #2: ~$5M cut off at top; reframe Pitt as a generic "County" / hypothetical | "the ~$5M is cutt off at the top; you CANNOT call out Pitt like that ... just say a 'County' and frame it as a what if" | 2026-06-07 | type-typography | slides-content / mobile-reflow | addressed |
| 103 | XRAY slide must be its OWN slide, not chopped into #5 | "The xray slide should be its OWN slide, not chopped up into ...til-briefing#5" | 2026-06-07 | demo-storybook | slides-rework | addressed |
| 104 | Need a proper conclusion slide; re-structure 5 and 6 totally; add one slide if needed | "we should have a proper conclusion slide. Re-structure 5 and 6 totally--if you need to add ONE more slide to accomodate, do it." | 2026-06-07 | demo-storybook | slides-rework | addressed |
| 105 | Accept no defeat; novel approaches; research→plan→harden→synthesize loop; prototype; long horizon | "Accept no capitulation or overly defeatist approach. Devise a series of novel approaches ... loop of research -> plan -> harden -> synthesize until a convergent optimum" | 2026-06-07 | gates-quality-process | convergent-loop / no-defeat | addressed |

### #195 — XRAY restyle scoping

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 106 | XRAY/nutrition-label restyle scoped to ONLY the one xray-portal slide | "XRAY/nutrition-label restyle is ONLY for that ONE slide with the xray portal." | 2026-06-07 | demo-storybook | scope-discipline | addressed |

### #206 — Tranche cogency + storybook nav + lighthouse

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 107 | Ensure total tranche cogency + inter-wave coherence; harden; analyze for overfit/duplication | "Enusre total tranche cogency and inter-wave cogency and coherence. Harden this further. Analyze for overfit or duplicative items" | 2026-06-07 | gates-quality-process | cogency / overfit-audit | addressed |
| 108 | Perfected storybook with EVERY component, new dock-based UI: sidebar dock AND bottom-bar dock for nav | "a brand new dock-based UI with side bar dock AND bottom bar dock for core page nav" | 2026-06-07 | dock | dock-nav-shell | addressed |
| 109 | Re-design the aurora configurator and the carousel | "The configurator of the aurora, and our carousel thereof, needs to be re-designed, too." | 2026-06-07 | components-encapsulation | configurator-redesign | addressed |
| 110 | iOS 26 inspiration; idiomatic usage of glass atoms; consistent naming + verbiage | "Take inspiration from modern ios 26, glass primitives ... Ensure consistent naming and verbiage." | 2026-06-07 | glass-material | ios27-fidelity / glass-standardize | partial |
| 111 | Deep Lighthouse audit for every page + slide | "Ensure a deep lighthouse audit for every page, and slide item." | 2026-06-07 | a11y-perf-safari | lighthouse-perf | partial |
| 112 | Deep animation + DESIGN.md audit | "Ensure a deep animation and design.md audit." | 2026-06-07 | motion-animation | design-audit | addressed |

### #211 — Recap

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 113 | Recap the future tranche + what it does | "recap the future tranche with what it does" | 2026-06-07 | gates-quality-process | recap | addressed |

### #212 — WebGPU abrogation question (siri-new-capability adjacent)

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 114 | Why not totally abrogate WebGL2 for WebGPU on all items? | "Why not totally abrogated WebGL2 in favor of WebGPU for all items?" | 2026-06-07 | viz-procedural | webgpu | partial |

### #213/#214/#215 — Consumer constellation audit

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 115 | Audit the constellation consumers (fourier/value.js/keyframes); bring them up to speed on aurora/glass/dock | "We should have waves herein that touch them and bring them up to speed ... for things like the aurora, glass items, dock" | 2026-06-07 | cross-repo | consumer-modernize | partial |
| 116 | Also speedtest, sudoku (csp-solver), etc. — new waves for each consumer | "What of speedtest, sudoku (csp-solver), etc?" | 2026-06-07 | cross-repo | consumer-modernize | partial |
| 117 | First list consumers (docs likely in fourier-analysis); fully-formed wave spec per consumer, idiomatically integrated | "First, list our consumers ... And then peform the massively-parallelized audit upon each, with a wave spec fully formed for each, idiomatically integrated" | 2026-06-07 | cross-repo | consumer-modernize | partial |

### #216 — Encapsulation challenge (muster/instrument-chassis)

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 118 | "Muster does not count" as a 2nd consumer; instrument-chassis is not general enough | "Muster does not count. And the instrument chasis is not general enough, too." | 2026-06-07 | components-encapsulation | overfit-audit / consumer-bar | addressed |

### #218 — Cross-repo coordination

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 119 | Within AW exec, fully drive slides + whatever value.js/keyframes/speedtest/fourier need | "we should plan to fully drive slides, whatever needs to be furthered with value.js, keyframes.js, speedtest, and fourier-analysis" | 2026-06-07 | cross-repo | drive-constellation | partial |

### #220 — Full execution program

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 120 | FULL execution with full CI/push/publish; slides.friday.institute pushed to completion | "FULL EXECUTION PROGRAM with FULL CI/push/publish, etc. slides.friday.institute must be pushed to completion." | 2026-06-07 | cross-repo | ship-to-prod | partial |

### #221 — Screenshot hygiene

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 121 | Clean up + categorize temp screenshots; full inventory of all touched items/pages per precepts | "clean up and categorize all temp screenshots herein--pursuant to precepts/ we should have a full inventory of screenshots" | 2026-06-07 | gates-quality-process | screenshot-inventory | addressed |
| 122 | Explicate what was done + what remains; clean up the task list | "explicate to me what was done and what remains. Clean up your task list, too." | 2026-06-07 | gates-quality-process | status-report | addressed |

### #246 — Principle restatement

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 123 | No quick solutions/workarounds; architectural transpositions for elegance/simplicity/perf | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance" | 2026-06-07 | design-principles | gestalt-not-patch | addressed |

### #248 — RE-FORMULATE TO AX (specular extreme / goo broken / aurora broken / dock-to-top)

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 124 | The specular hover effect is far too extreme | "The specular hover effect is far too extreme." | 2026-06-07 | glass-material | specular-calm | addressed |
| 125 | Goo (blob) seems totally broken | "Goo seems to be broken totally" | 2026-06-07 | viz-procedural | blob-broken | partial |
| 126 | Aurora core is broken — preset thumbs render but the core aurora does not | "the aurora ... The preset thumbs render, but the core aurora does not." | 2026-06-07 | viz-procedural | aurora-broken | partial |
| 127 | Re-formulate this tranche into AX folding ALL non-completed items | "re-formulate this tranche into AX, which will fold in ALL non-completed items" | 2026-06-07 | gates-quality-process | tranche-reformulate / fold-deferred | addressed |
| 128 | Move the dock to the TOP | "Move the dock to the top, too." | 2026-06-07 | dock | dock-position | addressed |
| 129 | Make the dock overflow case more natural/idiomatic — properly wrapped + shadowed, edge cases handled | "make the dock overflow case more natural, idiomatic, properly wrapped and shadowed whilst handling edge cases" | 2026-06-07 | dock | dock-overflow | addressed |
| 130 | This is good progress but needs many workflows + passes of refinement | "This is good progress. But we need many workflows and passes of refinement." | 2026-06-07 | gates-quality-process | convergent-loop | addressed |
| 131 | What has been done / what remains / what needs refinement — research→prototype→tranche-write→iterate (30+ waves) | "research, prototype, tranche write -> iterate until convergent, loop, writing and perfecting this tranche with 30+ waves" | 2026-06-07 | gates-quality-process | convergent-loop | addressed |

### #250 — RESUME directive (AW + constellation execution program, state-at-halt)

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 132 | Resume AW + constellation execution; integrate preserved worktree band-work first | "integrate these FIRST (review each, cherry-pick the building/green parts ... do the Playwright audits the agents cannot)" | 2026-06-07 | gates-quality-process | resume / real-paint-verify | partial |
| 133 | Cut glass-ui 3.6.0 with green gate-matrix; pre-run profile:budget/consumers/storybook-ia | "Cut glass-ui 3.6.0 (bump, gate-matrix green ... tag, push, monitor release.yml to green)" | 2026-06-07 | gates-quality-process | ship-to-prod | partial |
| 134 | Re-deploy speedtest adoption (bump 3.6.0, E1 wiring); adopt clean consumers | "re-deploy speedtest adoption (bump to 3.6.0, E1 wiring ...); check if muster/fourier/value.js/words are now CLEAN" | 2026-06-07 | cross-repo | consumer-modernize | partial |
| 135 | A prior slides-H agent went OFF-SCRIPT (committed a fourier deck); review with intent, don't blindly revert | "REVIEW those 2 fourier commits with the user's intent in mind ... do NOT blindly revert" | 2026-06-07 | demo-storybook | scope-discipline | partial |
| 136 | Implement the REAL slides H (progress polish, mobile reflow, constellation visibility, LOCK REMOVAL, xray restyle, language tuning, dedup) | "implement the REAL slides H per slides/docs/tranches/H/waves/" | 2026-06-07 | demo-storybook | slides-polish | partial |
| 137 | NEVER touch src/decks/feedback-coder (user WIP — a prior agent violated this) | "NEVER touching src/decks/feedback-coder/ (user WIP--a prior agent violated this)" | 2026-06-07 | gates-quality-process | foreign-tree-fence | addressed |
| 138 | Security: never touch docs/precepts (precepts staged: 0); never the wolfpack-ledger access key in source; agents never commit on main index | "never touch docs/precepts ... never the wolfpack-ledger-2026 access key in source, agents never commit on the main index" | 2026-06-07 | gates-quality-process | security-fence | addressed |
| 139 | Goal: complete AW IN TOTALITY + all constellation tranches + perfected CI/deploy/validation at prod endpoints | "complete AW IN TOTALITY + all constellation tranches + perfected CI/deploy/validation at prod endpoints" | 2026-06-07 | cross-repo | ship-to-prod | partial |

---

## Cron/Stop-hook embedded directives (captured, distinct from bare nags)

| # | Gist | Quote | Date | Category | Theme | Status |
|---|------|-------|------|----------|-------|--------|
| 140 | Long-horizon tranche dev: full augmentation + full wave spec, as many waves as needed, in totality | "Continue through this indefatigably ... FULL augmentation and FULL wave specification, with as many tranche waves as needed" | 2026-06-06 | gates-quality-process | indefatigable | partial |
| 141 | Do not stop until complete AW + all constellation tranche completions; perfected CI/deploy/validation at prod | "Do not stop until complete AW completion, and all constellation tranche completions are done ... perfected CI, perfected deploy, testing, and validation at their prod endpoints" | 2026-06-07 | gates-quality-process | indefatigable / ship-to-prod | partial |
