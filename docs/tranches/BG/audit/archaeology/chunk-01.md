# BG Archaeology — chunk 01/9 (directive extraction)

Source: `archaeology/chunks/chunk-01.txt` — 169 chronological blocks (mostly agent task-notifications; **69 human-authored blocks**, the directive carriers). Window **2026-05-26 → 2026-06-02**. This chunk is the **dine-vote → muster → @mkbabb-constellation** arc: a PizzaVoter-like group-decision optimizer built on glass-ui, evolving into a multi-repo modern-web modernization + npm-publishing execution program. The glass-ui-relevant signal is the *design language, materiality, dock, process discipline, and cross-repo* directives the user keeps re-asserting.

Process noise excluded per brief: bare "continue"/"status"/"hey"/"what model is this", the AskUserQuestion bare echoes, the repeated autonomous-loop cron prompts (#134, #147 — pure heartbeat), the npm-token literals. Directives embedded inside the long compaction summaries (#57/#91/#99/#108/#127/#129/#151/#164) and the cron/goal-set blocks ARE captured (deduped against their first utterance).

---

## Directive table

| # | gist | verbatim quote (≤20w) | date | category | theme | status-guess |
|---|------|----------------------|------|----------|-------|--------------|
| D1 | No overfitting; minimal/legible architecture; small composable functions over class hierarchies | "Do not overfit… Keep the architecture minimal, extensible, and legible." | 2026-05-26 | design-principles | KISS-encapsulation | addressed |
| D2 | No heavy schema machinery / dataclass-heavy modeling | "Do not introduce heavy schema machinery. Do not use dataclass-heavy modeling." | 2026-05-26 | components-encapsulation | KISS-encapsulation | addressed |
| D3 | Keep optimization machinery visible, not occult | "the optimization machinery visible rather than occult" | 2026-05-26 | design-principles | KISS-encapsulation | addressed |
| D4 | glass-ui frontend; keep the design glassy | "Keep the design glassy, the code plain" | 2026-05-26 | glass-material | glass-standardize | addressed |
| D5 | No contrivance; KISS — repeated as a standing law | "No contrivance. KISS." | 2026-05-26 | design-principles | KISS-encapsulation | addressed |
| D6 | Leverage local Programming/ libs (csp-solver, googleapiutils2, glass-ui) | "leverage our various libs hereof, like csp-solver (mkbabb's)… Leverage libs within this Programming dir." | 2026-05-26 | cross-repo | reuse-local-libs | addressed |
| D7 | Employ mathematical formalism + several optimization metrics | "Employ and leverage mathematical formalism, alongside several metrics to optimize" | 2026-05-26 | design-principles | math-formalism | addressed |
| D8 | Deploy agents in parallel (4) to develop plan/repo/spec | "Deploy 4 agents in parallel to develop a plan, repo, spec." | 2026-05-26 | gates-quality-process | parallel-orchestration | addressed |
| D9 | UI elegant, sparse, practical — avoid dashboard sprawl | "Keep the UI elegant, sparse, and practical. Avoid dashboard sprawl." | 2026-05-26 | demo-storybook | calm-proportion | addressed |
| D10 | Code lean, optimization-focused, generalized to constraints; defer to APIs | "Our code should be very much lean, optimization focused, generalized to constraints, and defer… to APIs" | 2026-05-26 | design-principles | KISS-encapsulation | addressed |
| D11 | Lean on Google APIs for resolution/rating/travel where free | "lean on the google APIs for map url resolution, rating fetching, travel time estimation… when possible and free" | 2026-05-26 | cross-repo | defer-to-apis | addressed |
| D12 | Abrogate Rust; Rust+WASM only for CSP; rest in TS | "Abrogate rust--we should only plan to use rust and WASM for the CSP functionality." | 2026-05-26 | components-encapsulation | stack-discipline | addressed |
| D13 | MVP with full design spec, pursuant to glass-ui; hand off to Claude Design then back | "MVP with full design spec, pursuant to glass-ui--include a design spec to be handed off to Claude Design" | 2026-05-26 | design-principles | design-handoff | addressed |
| D14 | NO meta language — entirely greenfield, no past/updating; audit all docs | "Ensure NO meta langauge--this is an entirely greenfield project. There is no past." | 2026-05-26 | gates-quality-process | greenfield-no-meta | addressed |
| D15 | Always use latest dep versions; surface lib gaps (csp-solver) | "Ensure the latest variant of deps for all items. What gaps exist within csp-solver" | 2026-05-26 | gates-quality-process | latest-deps | addressed |
| D16 | Recap the plan in totality (recurring meta-ask) | "Finally, recap the plan in totality." | 2026-05-26 | gates-quality-process | recap-everything | addressed |
| D17 | Design must be LESS storybook/demo-like — audacious typography, glass-ui-first, iOS-like app | "needs to be greatly refined to not be so storybook/demo like. More of an audacious typography, glass-ui first, ios-like app." | 2026-05-26 | type-typography | ios27-fidelity / aristotelian-type | partial |
| D18 | Develop FULL wave + tranche specs per precepts/, several passes, 4 agents each | "develop three tranches, pursuant to precepts/ with FULL wave specification and tranche specification… several passes" | 2026-05-26 | gates-quality-process | tranche-format | addressed |
| D19 | Floating primary control bar at top that shrinks on scroll, grows on hover | "primary control bar that floats at the top of the screen, which shrinks on scroll and hover/grow" | 2026-05-26 | dock | dock-rework / scroll-shrink | partial |
| D20 | Abrogate tabular-focused UI; novel design approaches | "Abrogate tabular-focused UI. Novel approaches to design." | 2026-05-26 | demo-storybook | no-tables / gestalt-not-patch | partial |
| D21 | Audacious large General-Sans typography; Fira Code for technical/numeric values | "Audacious, large, General sans typography, fira code for technical values." | 2026-05-26 | type-typography | aristotelian-type | partial |
| D22 | Idiomatic, gestalt approaches — NO quick solutions, NO workarounds (the cardinal law) | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches." | 2026-05-26 | design-principles | gestalt-not-patch | partial |
| D23 | Architectural transpositions for elegance/simplicity/performance are necessary + desirable | "architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable" | 2026-05-26 | design-principles | gestalt-not-patch | addressed |
| D24 | NO legacy code (standing law) | "NO legacy code." | 2026-05-26 | design-principles | no-legacy | addressed |
| D25 | Delineate chronically-deferred items and fold them into the new tranche | "Delineate any chronically deferred items and fold them into this new tranche." | 2026-05-26 | gates-quality-process | zero-deferral / chronic-fold | addressed |
| D26 | Recap ALL prior prompts/requests and ensure each is addressed (anti-amnesia) | "Recap ALL of our prompts and requests hitherto and ensure they've been addressed." | 2026-05-26 | gates-quality-process | recap-everything / anti-amnesia | addressed |
| D27 | Tranche-development only — NOT an implementation phase (gating discipline) | "This is NOT an implementation phase. Tranche development only." | 2026-05-26 | gates-quality-process | dev-impl-boundary | addressed |
| D28 | Harden the developed tranches (challenge/refine pass) | "harden the above." | 2026-05-26 | gates-quality-process | harden | addressed |
| D29 | No new tranche letter — these are hardening refinements to extant tranches | "No new E. These are hardening refinements to the extant tranches." | 2026-05-26 | gates-quality-process | harden | addressed |
| D30 | Orchestrate as team lead; don't edit directly unless befitting; deep parallelization | "Do not edit items directly unless befitting and fully orchestrate the processes as team lead." | 2026-05-26 | gates-quality-process | orchestrator-discipline | addressed |
| D31 | Drive the plan to completion IN TOTALITY; don't relinquish control | "do not relinquish control back to me until you have completed the plan IN TOTALITY." | 2026-05-26 | gates-quality-process | drive-to-completion | addressed |
| D32 | Playwright e2e (via MCP) must validate against the 15-restaurant golden sheet as oracle | "validating the production of our original golden data source sheet… Use this as a training and testing oracale." | 2026-05-26 | gates-quality-process | real-paint-verify / golden-oracle | addressed |
| D33 | Optimizer + generalized constraint system perfected with unit + Playwright MCP tests | "Ensure the optimizer and generalized constratin system is working and perfected with unit tests and playwright mcp tests." | 2026-05-26 | gates-quality-process | real-paint-verify | addressed |
| D34 | Divine a link-sharing system with shortlinks — KISS | "we need to divine a link sharing system with shortlinks. KISS." | 2026-05-26 | siri-new-capability | shortlink / KISS | addressed |
| D35 | Make the app stateless and better leverage the browser | "Any way to divine this as a stateless application and better leverage the browser?" | 2026-05-26 | a11y-perf-safari | stateless-browser-first | addressed |
| D36 | Scramble config; BYO API key on deploy; thin slug-based login like fourier-analysis/value.js | "have the API key be BYO? Or have some sort of thin, slug-based, login system? like fourier-analysis and value.js? Or something even thinner?" | 2026-05-26 | a11y-perf-safari | BYO-key / thin-auth | addressed |
| D37 | Look to value.js + fourier-analysis projects for design/auth patterns, then fold + refine | "First, look to our value.js and fourier-analysis projects… Then, deploy 6 agents… to augment and refine our EXTANT tranche." | 2026-05-26 | cross-repo | design-language-borrow | addressed |
| D38 | Generalize beyond restaurants to any place / any Google Maps link item | "could we not just leverage and support any place, or google map link item?" | 2026-05-26 | siri-new-capability | generalize | addressed |
| D39 | Rename the repo to something succinct + update name across all docs | "Rename the folder and repo, too, something more befitting and succinct. Update that name within all appurtenant documentation." | 2026-05-26 | gates-quality-process | rename-clean | addressed |
| D40 | Abrogate cliché + ugly table-based data layout; feasible skeuomorphism; iOS 26; glass-ui | "abrogate the cliche, abrogate any ugly table-based data layout. Think simple skeaumorphism… Think ios 26. Think glass-ui." | 2026-05-26 | glass-material | ios27-fidelity / no-tables | partial |
| D41 | Pursuant perfectly to precepts/ — process compliance is absolute | "Pursuant perfectly to precepts/" | 2026-05-26 | gates-quality-process | precept-compliance | addressed |
| D42 | Any glass-ui gaps should be filled + redressed AT THE ROOT (not worked around in consumer) | "Any gaps that exist within glass-ui we should plan to fill and redress at the root, too." | 2026-05-26 | cross-repo | redress-at-root | addressed |
| D43 | Aurora must NEVER be retired (binding, repeated) | "Aurora should NOT be retired, ever." | 2026-05-26 | viz-procedural | aurora-everywhere | addressed |
| D44 | All glass-ui gaps addressed; dispatch then fold into waves | "All gaps should be addressed. Dispatch, and then fold these items into waves herein." | 2026-05-26 | cross-repo | redress-at-root | addressed |
| D45 | We are all on (or should be on) modern Vite 8 | "We all are using, or should be, modern Vite 8." | 2026-05-26 | a11y-perf-safari | modern-tooling | addressed |
| D46 | UI is a complete mess — everything wrong/broken; do 3 passes ×6 agents (2 frontend-design each) + Playwright | "App looks like it's a complete and total mess. Everything is wrong, broken." | 2026-05-27 | demo-storybook | defect-report / gestalt-not-patch | partial |
| D47 | Font must NOT be literally bold (defect) | "Font is not supposed to be literally bold." | 2026-05-27 | type-typography | type-weight-defect | partial |
| D48 | Aurora must occupy the (full) background | "The auorora should occupy the background." | 2026-05-27 | viz-procedural | aurora-everywhere / full-bleed | partial |
| D49 | The glass-ui dock is wrong (defect) | "The glass-ui dock is wrong." | 2026-05-27 | dock | dock-rework / defect-report | partial |
| D50 | UI sucks in totality — redesign ground-up; 4 design agents brainstorm 4 orthogonal approaches then union | "the UI sucks in totality and needs to be entirely re-desiground up. Deploy 4 frontend design agents… brainstorm 4 entirely orthogonal approaches… union into one cohesive… variant." | 2026-05-27 | demo-storybook | gestalt-not-patch / orthogonal-then-union | partial |
| D51 | The current dock is near useless — rethink it | "the current dock is near useless." | 2026-05-27 | dock | dock-rework / defect-report | partial |
| D52 | Borrow design language from value.js, fourier-analysis, words + Apple apps as of iOS 26 | "Look to our design language within value.js and fourier-analysis… and words and then other apple appliactions as of ios26 for inspiration." | 2026-05-27 | design-principles | ios27-fidelity / design-language-borrow | partial |
| D53 | Create proper design hierarchies, affordances; use the principles of animation | "Create proper design hierachrives, affordances, use the principles of animation, etc." | 2026-05-27 | motion-animation | hierarchy / animation-principles | partial |
| D54 | Multi-wave design pipeline: 4 research → 4 design → 4 hardening/challenge → 1 synth → 4 formulate | "the first wave is 4 research agents… then 4 frontend design agents, then 4 hardening… a synthesizer agent, and then 4 agents to formulate" | 2026-05-27 | gates-quality-process | challenge-harden-synthesize | addressed |
| D55 | The 4 design-attention areas: glass materiality+depth, Aurora presence, hero+composition, metrics+color/vibrancy | "Glass materiality + depth, Aurora presence, Hero + composition, Metrics + color/vibrancy" | 2026-05-27 | glass-material | glass-depth / color-identity | partial |
| D56 | "Iterate further" — incremental UI was not acceptable (correction, not approval) | "Iterate further" | 2026-05-27 | demo-storybook | gestalt-not-patch | partial |
| D57 | Recap the new tranche + full design spec | "Recap the new tranche and full design spec." | 2026-05-27 | gates-quality-process | recap-everything | addressed |
| D58 | Is npm publishing the root issue? Stop working around it with symlink/file: — get publishing working | "are we essentially trying to workaround publishing with symlinking, file: .. ? … Should we get NPM publishing working?" | 2026-05-28 | cross-repo | npm-publish-root-cause | addressed |
| D59 | Configure npm token; migrate ALL glass-ui consumers to the published variant; get builds working | "Modify all glass-ui consumers to properly levearge the newly published NPM variant, get those builds working." | 2026-05-28 | cross-repo | consumer-migration | addressed |
| D60 | There are MORE consumers than scoped — sweep wider across all real apps | "We have more consumers than that." | 2026-05-28 | cross-repo | consumer-completeness | addressed |
| D61 | Fold latex-paper pub + all migrated/compiling consumers into the new tranche(s) | "fold the various above items (latex paper pub, etc--all consumers migrated and properly compiling) into the new tranche(s)." | 2026-05-28 | cross-repo | chronic-fold | addressed |
| D62 | CSC411 homework is part of the mkbabb suite; normalize csp-solver-wasm + ...-morph? | "CSC411 homework is part of the mkbabb suite. What of the csp-solver-wasm + csp-solver-wasm-morph projects--should be normalize this to one?" | 2026-05-28 | cross-repo | constellation-normalize | addressed |
| D63 | Rename csp-solver-wasm-morph to just @mkbabb/morph; fold crates.io publish into G.W5 | "how about just morph" + "Fold into G.W5 too" | 2026-05-28 | cross-repo | rename-clean / publish-fold | addressed |
| D64 | Execute BOTH muster AND glass-ui's tranches | "Execute both muster AND glass-ui's tranches hereof." | 2026-05-28 | gates-quality-process | drive-to-completion | addressed |
| D65 | Cards look wrong + not glassy; font looks off; dock overflowing (screenshot defect) | "Cards look wrong and not glassy--font looks off; dock is overflowing." | 2026-05-29 | glass-material | defect-report / glass-standardize | partial |
| D66 | Deploy another 6 agents to refine the glass-ui tranche; same discipline | "Deploy another 6 agents in parallel to refine the glass-ui tranche hereof. Same discipline." | 2026-05-29 | gates-quality-process | refine / parallel-orchestration | addressed |
| D67 | Audit muster's process + tranche set with the same edict set | "What of muster as well? Audit that process and tranche set with a similar edict set." | 2026-05-31 | gates-quality-process | audit-symmetry | addressed |
| D68 | Drive BOTH glass-ui (AP) AND muster (I) tranches from W1 through close | "BOTH tranches." | 2026-06-01 | gates-quality-process | drive-to-completion | addressed |
| D69 | Use the Chrome modern-web-guidance corpus + a Lighthouse audit to expand/optimize the tranche set | "analyze our repo, with a lighthouse audit, too, alongside glass-ui, using the following guidance… expand and optimize this current tranche set with more waves." | 2026-06-01 | a11y-perf-safari | modern-web / perf-lighthouse | addressed |
| D70 | Browser-support policy: Newly-Available + ≤20-LOC feature-detected fallback (no runtime-dep polyfills) | "Newly-Available + fallback (default)" | 2026-06-01 | a11y-perf-safari | baseline-policy | addressed |
| D71 | Audit speedtest + fourier-analysis tranches; de-duplicate; reconcile ordering for parallel/serial exec | "de-duplicate items and reoncile ordering such that we can execute them either in full parallel, or serially" | 2026-06-02 | cross-repo | constellation-dedup / dependency-order | addressed |
| D72 | Orchestrator MAY now run pushes + npm publishes; drive ALL tranches to completion | "No, you can run the pushes and npm publishes… drive ALL of the above tranches to completion." | 2026-06-02 | cross-repo | publish-authorized | addressed |
| D73 | Use /commit for commits + push; drive every tranche to PERFECTED completion incl. npm publish | "ALL tranches should be driven to perfected completion, including NPM publishing, git commiting using /commit and pushing thereof. Master workflow." | 2026-06-02 | gates-quality-process | drive-to-completion / master-workflow | addressed |

---

## Standing-law cluster (re-asserted ≥3× across the chunk)

These are not single directives — they are the user's **constant constraints**, re-stamped at nearly every turn (#0, #44, #58, #60, #96, #100, #109, #122, #130, #165). Recorded once as laws, not re-counted per utterance:

- **NO quick solutions / NO workarounds — idiomatic, gestalt approaches** (D22) — the cardinal law.
- **NO legacy code / no backwards-compat aliases — clean breaks** (D24).
- **KISS / no contrivance** (D5, D10).
- **Tranche-development-only until explicitly authorized; dev/impl boundary at W1|W2** (D27).
- **Recap ALL prior prompts + fold every chronic deferral — anti-amnesia** (D25, D26).
- **Redress glass-ui gaps AT THE ROOT, never work around in a consumer** (D42, D44).
- **Greenfield voice — no "ported from"/"previously"/version history** (D14).
- **Orchestrator owns the git index; agents are read-only on git** (D30, plus security context).
- **Real-paint verification — Playwright/MCP/golden-oracle, not commit-message claims** (D32, D33); reinforced by the live ToggleChip `:pressed` binding-bug lesson (vue-tsc + vitest miss reactive-contract bugs; only running e2e catches them).

---

## Notes for the BG synthesizer

- This chunk predates the BA→BF glass-ui liquid-glass band; it is the **dine-vote/muster genesis + constellation-publishing arc**. The glass-ui-relevant directives here are foundational *posture* (glass-first, aurora-never-retired, dock-must-work, audacious-type, redress-at-root, modern-web/Baseline policy) rather than the later pixel-level liquid-glass asks.
- "iOS 26" / "iOS 27" / "ios26" are the same evolving fidelity target the later tranches call `ios27-fidelity`.
- The dock has been flagged "wrong"/"near useless"/"overflowing" THREE times (D49, D51, D65) — the dock-rework chronic begins here.
- Aurora-never-retired (D43) and aurora-full-bleed-background (D48) are first asserted here and held through every later tranche.
- Many UI directives are marked **partial/regressed** because they were design-developed (specced) but the dine-vote/muster *implementation* satisfying them is a sibling repo, not glass-ui itself; the glass-ui-root half (gap redress, dock, glass material, aurora) carried forward into the later library tranches.
