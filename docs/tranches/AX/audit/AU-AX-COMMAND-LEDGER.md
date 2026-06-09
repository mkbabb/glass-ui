# AU-AX command ledger — the faithful record

Purpose: a faithful, de-duplicated record of EVERY substantive user command across the
AU→AX glass-ui engagement, so nothing the user asked for is dropped in future AX waves.
Verbatim quotes are the point (typos fixed only). Synthesized from the 11-chunk corpus
extraction (`/tmp/ax-corpus/extract-*.md`) — the user's own backstop directive:
"deploy an agent fleet to scan these and synthesize their items into a cogent document
with direct quotations (typos fixed) … to ensure nothing's dropped in the future AX waves."

Sessions + span:
- **S1 (may19 transcript)** — 2026-05-04 → 2026-05-19. The G/J/K/L/O/Q tranche era +
  the consumer-breakage forensics. (chunks S1-1, S1-2, S1-3)
- **S2 (jun05 transcript)** — 2026-05-26 → 2026-06-04. The dine-vote consumer side-project
  + the AQ/AR/AS/AT modern-web/lighthouse/constellation era + the 3.2.0 publish.
  (chunks S2-1, S2-2, S2-3)
- **S3 (jun09 transcript)** — 2026-06-01 → 2026-06-09. The slides/deck genesis +
  the AU→AV→AW→AX re-formulation arc (dock-to-top, headless-green/visually-broken pivot).
  (chunks S3-1 … S3-5)

Counts: ~190 distinct substantive commands distilled from 11 extraction files; the
recurring orchestration/precept macros are collapsed to one canonical entry each with a
fire-count. Status tags (ADDRESSED / IN-FLIGHT / OPEN) in §3-§4 are read against
`docs/tranches/AX/PROGRESS.md` (HEAD) + `audit/inventory/MASTER-PLAN.md` (the 10-batch DAG)
+ `audit/USER-DEFECTS-2026-06-08-pass3.md` (the Q/D/DK/P/G/T defect provenance).

---

## §1 — Standing precepts & working-style (the cross-cutting governance)

How to work. These ride EVERY tranche and are non-negotiable. Each fired many times across
all three sessions.

- **Gestalt / no-quick-fixes / no-workarounds / no-legacy** (the master precept). [2026-05-05 →
  2026-06-09, ~25× verbatim] "NO quick solutions, NO workarounds: idiomatic, gestalt
  approaches. This is a development product, architectural transpositions in the sake of
  elegance, simplicity, and performance above all are both necessary and desirable. NO
  legacy code."

- **No backwards-compat / clean breaks.** [2026-05-15] "No more deferrals. No carry-forward."
  + the standing "NO legacy code" / "no legacy or deprecated codepaths: this is a development
  product." Excise or fail-explicit: [2026-05-14, re-fired 2026-06-07] "Analyze the extant
  backend codebase for any legacy code, deprecated code, temporary workarounds, fallback or
  fall-through behavior: in all instances, either excise the code entirely, or fail explicitly
  therein: no silent or graceful handling unless befitting."

- **Token-first / KISS / DRY / no-god-modules.** [2026-05-14, re-fired 2026-06-07] "NO god
  modules: break large files (>500 lines especially) into smaller, cohesive sub-modules…NO
  workarounds, NO fallbacks, NO special cases. No effusive dynamicism. NO nested imports. NO
  test files in src files. NO duplicated effort: DRY. KISS. Run linting and type checking to
  validate your changes at every interval."

- **Workflows + batches-of-4 + maximal parallelism.** [2026-06-08] "This is a long horizon
  task: use workflows of 32 agents in parallel, batched with 4 agents each, to refine and
  iterate until a convergent optimum is reached." + [2026-06-07] "Utilize a multi-orchestrated
  agent workflow for a loop of research, planning, hardening, synthesis and tranche writing,
  looped until a convergent optimum is reached." + [2026-06-07] "Execute with maximal
  parallelism and workflow usage." Team-lead, no direct edits: [2026-05-09 → 2026-06-08, ~12×]
  "Do not edit items directly unless befitting and fully orchestrate the processes as team lead.
  Continue through this indefatigably: do not relinquish control back to me until you have
  completed the plan IN TOTALITY."

- **Leverage the dev-tools / MCP.** [2026-06-08] "Further, for all debugging and chrome tasks,
  leverage the chrome-devtools-mcp." + [2026-06-08] "Leverage the modern web guidance and dev
  tools mcps in a workflow, too." + the recurring "validate and harden with playwright."

- **Live-verify / the cardinal lesson.** The AX-defining discipline born of the
  headless-green/visually-broken gap. [2026-06-04] "Continue through this indefatigably…Only
  when a perfected glass-ui and slides.friday.institute—PLAYWRIGHT validated—deployment are
  you to complete." + [2026-06-06] "Start both the glass-ui and slides items locally to
  validate and fully test each page, inventory all changes made." Every wave closes on a
  captured LIVE chrome-devtools-mcp DELTA; "complete" never collapses to headless-green.

- **The throttle cadence (one big workflow at a time).** [2026-06-09] "Continue. Re-deploy all
  workflows and agents thereof—no exceptions. The limit has been fully reset." (~14× in S3-5
  alone; ~30× across the corpus) + [2026-06-08] "Do one research SOTA at a time, though." +
  the master-plan constraint: concurrent 32-agent workflows trip the transient server throttle.

- **Tranche-format (dev-only, fold-everything, recap-all).** [2026-05-05 → 2026-06-09, ~15×]
  "This is NOT an implementation phase. Tranche development only. Delineate any chronically
  deferred items and fold them into this new tranche. Delineate any deferred items and fold
  them into this new tranche. Recap ALL of our prompts and requests hitherto and ensure they've
  been addressed." + [2026-05-26] "No new E. These are hardening refinements to the extant
  tranches." (no-new-letter for hardening) + [2026-06-07] "augment them, don't replace them."

- **Overfitting bar / prune.** [2026-05-13] "Audit for any components, classes, items that have
  ONE consumer or use case. We want to prune any overfitting…We should be conservative with
  additions and removals, only folding in new genuinely useful primitives." + [2026-06-07]
  "Muster does not count." (a sole non-counting consumer fails the ≥2-consumer bar) + [2026-06-02]
  "No overfitting. No dead consumers. No contrivances. KISS. If an extant component in glass-ui
  would befit, don't create a new one."

- **Writing-style (the prose precept).** [2026-06-02 → 2026-06-08, ~5×] "With all documents,
  abrogate any unsubstantiated claims, editorializing, comparison sentiments like 'it's not
  just x, but y'. Limit usage of em dashes, and when including them typically have no space
  between the items. Do not overly. punctuate. messages. like this. No pretense or
  grandiloquence. Maintain some aspect of my levity and congruence to my verbiage." +
  [2026-06-08] "Abrogate ALL language like 'It's not just X, it's Y' or 'quietly driving' or
  'And that's what matters.'" + [2026-06-06] "NO language like 'the method', 'the x', NO usage
  of things like ledger, engine, etc." + "read over the Wikipedia:Signs_of_AI_writing."

- **No-meta / greenfield.** [2026-05-26] "Ensure NO meta language—this is an entirely greenfield
  project. There is no past. There is no updating. Audit all begotten documents once completed."

---

## §2 — Chronological command record (the spine)

### Era AU-precursor — S1 (G/J/K/L/O/Q tranches), 2026-05-04 → 2026-05-19

- [2026-05-04 · glass] "Using the frontend design skill, look at our storybook, and design
  facilities, alongside several prototypical consumers of: speedtest, fourier-analysis' web,
  words, keyframes, and value.js … Develop and refine our glass-ui design language herein…:
  glass morphic, paper, cream, colorful flourishes, mathematical, modern skeumorphic with
  shadowing, bold, audacious, large typography, large and audacious icononography."
- [2026-05-04 · glass] "Do not re-design or refine with superfluity."
- [2026-05-04 · blob] "Call it Blob, and absorb that, alongside the deep configruation options
  within value.js, and for the swatches. Deep assay and fold herein." + "Can this be done in
  webgl? What other greenfield blob changes might you make for performance, elegance, stability,
  ux?" + "split in two" / "absorb" / "public" / "size."
- [2026-05-04 · workflow] "The connection was lost for a period of time. Redeploy all agents with
  renewed/befitting context in their worktrees."
- [2026-05-06 · dock] "With docks that exceed a maximum width or height, the inner container
  should scroll. Also, for our top dock, we should have a proper collapsed state that animates
  in and out."
- [2026-05-06 · blob] "The blob section should become fleshed out into its own proper section
  with configurator, like aurora--that configurator, too, needs refinement and proper scroll
  wrapping within docks/tabs headers."
- [2026-05-06 · dock] "The dock blurs, glass blur, needs to be reduced."
- [2026-05-06 · slider] "/primitives/slider--needs to be refined, the padding standardized" +
  "Slider · Glass Track needs to be greatly enhanced and refined."
- [2026-05-06 · slider] "Drag a slider. The dock holds--this section needs to be refined … this
  vertical rail overflows--remove the dev text therein"
- [2026-05-06 · defect] "Number Field needs to be refined and rounded"
- [2026-05-06 · dock] "The dock collapsible animation does not animate in/out properly and
  jerks/instantly transitions--this is a corner stone and must be refined."
- [2026-05-06 · dock] "I feel like DockPopover should not be a special component? Or at the very
  least, if it is, it DRY reusues our other components properly, and we better support many other
  types of components nested within the dock, animated, idiomatically."
- [2026-05-06 · defect] "Basic horizontal pager item is weak and needs to be greatly refined;
  Glass carousel — story pager is better, for example."
- [2026-05-06 · defect] "Table items, like the status field badge, needs to have their text,
  idiomatically, vertically and horizontally aligned."
- [2026-05-06 · defect] "DATA · FUZZY SEARCH Fuzzy Search item needs to be refined, the controls
  and design thereof" + "clearSearchCache should be renamed, and the button is not visible with
  contrast--why is this not using our proper button design language?"
- [2026-05-06 · aurora] "The auoroa configruator, at the sides, has shadows and clips" +
  "Auoroa items should not have a top black padding bar" + "We should have a preset for our
  speedtest aurora, too--look to that project's colors, config options."
- [2026-05-12 · prune] "Check for likely needs to be better modularized into sub-modules, and
  ensure cohesion with our other modules, potentially having an api dir, etc"
- [2026-05-13 · demo-IA] "We need to refine our storybook presentation to be perfected on mobile,
  too, with deep configuration options, and have configurators for key items like the blobs,
  aurora, etc--deeply analyze those configurators for spacing/padding expressiveness issues."
- [2026-05-13 · dock] "Our top dock blur is a bit much, and generally our dock blurs need to be
  resolved to be more subtle."
- [2026-05-13 · dock] "We should have first class facilities for collapsing the dock into both an
  icon, but also into mobile-friendly arrows that are beautifully animated in and out, springy and
  squish, blob and glass like."
- [2026-05-13 · glass] "Our glass panels by default should be translucent and frosted."
- [2026-05-13 · prune] "useTouchGate is used, or it should be, within items like in keyframes.js's
  input sliders, dropdowns, etc?…Meatballs, paper-backdrop, and typewriter should be used elsewhere."
- [2026-05-18 · cross-repo] "Some items in our consumers are totally broken, like in value.js,
  keyframes.js, etc. Dock items, animations, dropdowns, glass-cards. Audit our core features,
  styles, ensure proper co-location, cohesion, and consistency."
- [2026-05-18 · keyframes] "the new keyframes-js demo UI is needs a great deal of refinement--many
  items are broken; the timeline is not correct, the play button is no longer rainbow…" + "the
  hero text should not be bold for keyframes" + "the bezier selector is far too small and clipped…
  the t-value scrubber doesn't even work…rotations/etc dropdown not having proper progress
  circles/colors…leverage our glass-ui system, yes, but a PROPER and IDIOMATIC upgrade with no
  loss of feature or functionality."
- [2026-05-18 · demo-IA] "CartoonCard should likely just be a variant, too, no?" + "those
  speedtest items should be migrated to scroll pane--but is it truly befitting to have an entire
  component, rather than a card variant?"

### Era AS/AT — S2 (dine-vote + modern-web/constellation/publish), 2026-05-26 → 2026-06-04

- [2026-05-26 · demo-IA] (dine-vote seed) "Create a lean agentic implementation plan and working
  prototype for a restaurant group-decision optimizer…ranks restaurants using modular constraints
  and optimization strategies." (later generalized: [2026-05-27] "This likely should be generalized
  to more than just restaurants--could we not just leverage and support any place, or google map
  link item?")
- [2026-05-26 · glass] "Here's the design document, which needs to be greatly refined to not be so
  storybook/demo like. More of an audacious typography, glass-ui first, ios-like app."
- [2026-05-26 · glass] "We should have a primary control bar that floats at the top of the screen,
  which shrinks on scroll and hover/grow. Abrogate tabular-focused UI. Novel approaches to design.
  Audacious, large, General sans typography, fira code for technical values."
- [2026-05-27 · glass] "I think the UI sucks in totality and needs to be entirely re-designed [from
  the] ground up…the current dock is near useless. Look to our design language within value.js and
  fourier-analysis…and words and then other apple applications as of ios26 for inspiration. Create
  proper design hierarchies, affordances, use the principles of animation."
- [2026-05-27 · aurora] "Aurora should NOT be retired, ever. All gaps should be addressed."
- [2026-05-27 · cross-repo] "Any gaps that exist within glass-ui we should plan to fill and redress
  at the root, too." + "We all are using, or should be, modern Vite 8."
- [2026-05-28 · publish] "Is our main issue here NPM publishing? Analyze our consumers of glass-ui—
  are we essentially trying to workaround publishing with symlinking, file: .. …Should we get NPM
  publishing working?" + [2026-05-28] "Here's my new NPM token, configure this correctly…Modify all
  glass-ui consumers to properly leverage the newly published NPM variant, get those builds working."
- [2026-06-01 · cross-repo] "download and read, and use the following tool…to analyze our repo, with
  a lighthouse audit, too, alongside glass-ui…https://developer.chrome.com/docs/modern-web-guidance"
- [2026-06-02 · cross-repo] "audit the speedtest and fourier-analysis tranches and perform a deep
  analysis: de-duplicate items and reconcile ordering such that we can execute them either in full
  parallel, or serially (e.g., glass-ui, fourier…speedtest, muster, etc)."
- [2026-06-02 · publish] "No, you can run the pushes and npm publishes…This will be a long-horizon
  task to drive ALL of the above tranches to completion."
- [2026-06-03 · publish] "Execute AS in full per docs/tranches/AS/…Publish 3.2.0 first (+
  --provenance/changesets; keep proof:* per DEC-6). Gate on the AS gate fleet."
- [2026-06-03 · demo-IA] "Every tranche, pursuant to precepts, should be accompanied by screenshots
  of every affected page before and after to ensure goal completion. Assay our current screenshot
  set, clean them up and categorize, then assay and inventory our application with page screenshots."
- [2026-06-04 · defect] (the punch-list, each tied to a screenshot/URL) "What of the errored
  background of this page?" / "What of the overflowing dock?" / [hero] "Does not scroll properly" /
  [dock] "Dark mode toggle dock is too large--the dock tab is useless as it stands, too" /
  [configurator] "Configurator tab sucks and is not designed…And should be merged with
  /primitives/configurator-mobile" + "The configurator is not expressive or well-designed" /
  [aurora] "The aurora cards in the preview are not right: there's a noticeable black bar at the
  top, and the left shadow is visible in the default state when scrolling" / "Our pill list needs
  to be properly scrollable and re-designed" / "The golden ring on drag when dragging items doesn't
  preserve the border radius" / [aurora] "Aurora needs a massive first-principles overhaul:
  speedtest doesn't even animate slowly over time. And derive aurora is not implemented in the
  configurator and is broken" / [blob] "There's no blob configurator or demo tab, it should be on
  the sidebar" / "The sidebar should not be so long and should properly scroll" / "The main hero
  card is broken"
- [2026-06-04 · defect] "outer only--change in fourier." (Configurator rounding: glass-ui owns OUTER
  only; inner-rounding belongs in the fourier consumer)
- [2026-06-04 · blob] "create a proper wave spec for the goo-blob and watercolor-dot--"
- [2026-06-04 · dock] "Another wave for 6 agents…to perfect our dock system, layer system, dock
  horizontal and vertical system, our dock slide system, our dock icon system, our dock animation
  system, our dock rail system: use three frontend design agents and research of SOTA"
- [2026-06-04 · cross-repo] "What of color usage from value.js? Can we employ them for all color
  facilities and avoid circularity?"

### Era AU/AV/AW — S3 (slides genesis + glass-ui convergence), 2026-06-01 → 2026-06-07

- [2026-06-01 · slides] "Using the following notes, let's create a slide deck set. A maximum of 10
  slides…the target audience is for Darryl's boss…targeted at policymakers and auditor-types…to
  demonstrate the need for AI modernization and its role in anomaly detection, identifying waste,
  fraud, and abuse." + "Our design aesthetic should be redolent of the glass-ui design system and
  NCSU—use the NCSU branding color red."
- [2026-06-02 · slides] "The dots on the hero and last page should be animated and instead be a
  constellation, web, that animates SLOWLY and geometrically, like a web constellation."
- [2026-06-02 · keyframes] "Each page should have its visualizations animated with keyframes.js--our
  lib and repo…or use a native facility."
- [2026-06-02 · cross-repo] "create a small repo within ~/Programming, called slides, which will CI
  to publish to that above domain in CF…The end result should be a slide system that we can
  modularize and re-use, backed by glass-ui, keyframes.js, value.js…We should have slides that have
  optional, token-based auth, too for some slides…slides.friday.institute/{something}."
- [2026-06-02 · publish] "We should have a facility to export slides to powerpoint, too." +
  "This should be a modular and re-usable component/library system for slides. We should have a
  proper pptx export facility, too, if possible."
- [2026-06-02 · dock] "There should be a proper home button and darkmode toggle, too, using a
  glass-ui dock--ensure proper and idiomatic glass-ui usage…use the darkmode toggle from glass-ui."
- [2026-06-02 · dock] "What of the bottom slides progress bar--can that be generalized and folded
  into a glass-ui dock? What of the progress bar at the top, too? What of mobile support?" +
  "We should have proper slides facilities within glass-ui, too--what gaps exist herein and therein?"
- [2026-06-02 · slides] "Each slide should have back and front arrows that appear when you enter the
  side zones." + "Clicking a slide should not advance it--if you try to select text from a slide it
  automatically advances/regresses the position--only the arrows should advance." + "the transitions
  between slides flash twice, that should be fixed."
- [2026-06-02 · slides] "The background hero constellation item should be abstracted into a glass-ui
  component that's re-usable and configurable--further, it should subtly respond to click/touch/mouse
  events."
- [2026-06-02 · dock] "The dock contrast on dark slides is not correct and completely invisible." +
  [2026-06-02 · glass] "Darkmode support is lacking and does not properly suffuse into every slide."
- [2026-06-02 · glass] "The glass-ui components should be glasser. For example, the '10 years dozens
  of researchers' is great--our components should be more suffused with that."
- [2026-06-02 · slides] "the slides name should not be 'TIL Slides' it should just be 'slides' with
  the name of the current deck, too." + "Slides.babb.dev is to be removed, not deferred." +
  "the repo should be built out to handle multiple domains."
- [2026-06-03 · slides] "the 11th page, somewhere folded neatly therein, is a proper portal to:
  https://xray.friday.institute/ — Be it through an iframe, or something more idiomatic."
- [2026-06-03 · slides] "For the numbers, always use things like 'on the order of millions'--use
  purposefully oblique language." + "these slides are for Darryl's agency, which is exempt from
  public records requests…We don't want to exactly incriminate any agency or person or school."
- [2026-06-04 · slides] "the nutrition label page is far too verbose: remove the QR code--focus more
  on the portal."
- [2026-06-04 · glass] "The double blur is a bit gratuitous. Ensure no contrivance, no grandiloquence."
- [2026-06-04 · slides] "for the current slides, we need it to be gated behind a long token--which
  should be a feature first within this slides repo. It should be saved to local storage with
  idiomatic vue facilities, such that you only have to enter this token once."
- [2026-06-04 · glass] "All changes should be folded herein or within glass-ui itself for dock/glass
  blur items: take inspiration from apple. Have a deep and golden sense of aristotelian proportion."
- [2026-06-04 · cross-repo] "this is a union between glass-ui and slides, abstracting out the slides
  components into glass-ui, and then importing glass-ui components INTO slides, like our dock." +
  "Slides doesn't necessarily get folded into glass-ui, we idiomatically AUGMENT glass-ui and
  leverage glass-ui facilities, like the dock…CORE primitives should be abstracted into glass-ui
  where gaps remain."
- [2026-06-04 · dock] "the dock should contain a gear icon, like speedtest, which displays a popover
  with the darkmode and then a powerpoint download button. The TIL slides should be locked behind an
  access key modal that you divine."
- [2026-06-04 · dock] "this is using the glass-ui dock, so this dock can have a collapse state,
  too…we should plan to have a value.js-like collapsed state for the dock, a summarized dock view."
- [2026-06-05 · dock] "The dock animation is not smooth and IOS like--the items do not properly
  fade/morph in and out--there's a noticeable lag of the inner items instantly transitioning insofar
  as, the dock will shrink first, and THEN the items will start shrinking a few ms later."
- [2026-06-05 · dock] "the slides bottom progress bar should NOT be baked into the dock--it should be
  an element on the bottom of the page as it was before, as it was on mobile."
- [2026-06-05 · slides] "The constellation is not visible enough on darkmode, and not quite visible
  enough on lightmode either." + "The AI XRAY page needs to properly take up the height on mobile,
  and remove the Open AI XRAY button--the portal should do that if need be."
- [2026-06-05 · slides] "Let's entirely re-work the slides…winnow it down to 5-6 slides in totality,
  maybe 5 + the nutrition label." + the conceit: "anomaly detection via classical data analysis and
  AI: automations that union human effort and AI-backed analysis…Continuous data monitoring…the DIT
  invoice system is broken, and in dire need of modernization."
- [2026-06-05 · glass] "the access key modal should be more glass-ui styled--it's ugly as it stands.
  And the locked slides, on the homepage, should be slightly blurred out, and have a lock symbol
  thereon."
- [2026-06-06 · aurora/blob] "Fix aurora, too, and fully audit that spec, and the blob spec…Research
  that sort of SOTA for both animations and procedural animations." + "shadow-cartoon-lg is to ship."
- [2026-06-06 · cross-repo] "Ensure a perfected, de-duplicated union between value.js, keyframes.js,
  glass-ui, and slides. Slides should consume glass-ui primitives, and some of the CORE primitives
  thereof should be extant in glass-ui…value.js should own parsing, colors, etc--keyframes.js for
  animations."
- [2026-06-07 · demo-IA] "Perfect the glass-ui storybook demo, and EVERY Component therein: focus on
  the dock animations, layering, rail, focus on a consistent animation language, design language, and
  interaction language…Create a cohesive animation language…Follow the core tenants of design and
  animation to create a polished and professional demo." + "Plan to have 30+ waves for the next
  tranche."
- [2026-06-07 · aurora] "we need a derive color variant, full OKLAB or OKLCH support, FULL and TOTAL
  migration to modern color spaces, modern web gpu techniques for rendering. We need to refine our
  oil-pastel mode to be much more visually interesting and van-goh redolent…The vangogh variant
  should represent proper atomic brush strokes, with depth, variation…ultra high-fidelity brush
  strokes…fully dynamic and interactive if requested, too, as should the constellation component."
- [2026-06-07 · blob] "The blob component also needs to be perfected in terms of its visual style,
  animation, and interaction design…integrates seamlessly with the rest of the glass-ui components…
  leveraging modern web technologies to ensure smooth animations…without sacrificing visual quality."
- [2026-06-07 · dock] "None of the dock features and animations work correctly. The dock with a
  slider is broken." + "The dock when it wraps is not correct and should be better stylized."
- [2026-06-07 · prune] "The instrument chasis items need to all be removed." + "/custom/header-ribbon
  needs to be removed" + "/primitives/glyph-face it should be removed" + "/primitives/disco-glyph"
  + "wtf is /dock/icon-button-token-ladder"
- [2026-06-07 · prune] "why do we have speedtesting primitives in glass-ui? Those should be owned by
  speedtest totally--audit that repo and devise that"
- [2026-06-07 · demo-IA] "Wtf is /primitives/metric-badge vs /primitives/metric-pill" +
  "why tf is /primitives/configurator a primitive?" + "All of the sidebar sections need to be
  audited and re-structured--where's our aurora and blob items, too?" + "Why do we have dock items
  in many diff sections, too?"
- [2026-06-07 · defect] "/foundations/native-top-layer is totally broken" + "why do all of the
  /primitives/glass-panel's suck?" + "none of these toggles work: /primitives/card" + "None of the
  fonts are correct"
- [2026-06-07 · slider] "why do we have so many kinds--we should essentially have standard (now called
  glass-scrubber, and this facility should have a ROUNDED, not pillshaped, slider button, like in
  IOS, fully rounded and not offset to form ONE continuous track item+knob) and the spectrum--ALL
  consumers should be updated to port to this."
- [2026-06-07 · dock] "/navigation/dock--the animations are COMPLETELY broken totally. These were
  once perfected MANY commits ago within keyframes.js's first dock implementation…The dock needs to
  be fixed with our layering system from first principles."
- [2026-06-07 · slides] "the ~$5M is cut off at the top; you CANNOT call out Pitt like that, too--just
  say a 'County' and frame it as a what if, or hypothetical." + "The xray slide should be its OWN
  slide, not chopped up." + "we should have a proper conclusion slide. Re-structure 5 and 6 totally."
- [2026-06-07 · dock-pivot] (THE AX PIVOT) "Let's take a step back and instead re-formulate this
  tranche into AX, which will fold in ALL non-completed items. Move the dock to the top, too. And
  make the dock overflow case more natural, idiomatic, properly wrapped and shadowed whilst handling
  edge cases."
- [2026-06-07 · defect] "The specular hover effect is far too extreme. Goo seems to be broken totally,
  as is the aurora. The preset thumbs render, but the core aurora does not."
- [2026-06-07 · aurora] "Why not totally abrogated WebGL2 in favor of WebGPU for all items?"
- [2026-06-07 · cross-repo] "First, list our consumers…then perform the massively-parallelized audit
  upon each…value.js and keyframes.js in particular, for aurora and blob, and speedtest." +
  "Muster does not count. And the instrument chassis is not general enough, too."

### Era AX — S3 (execution + folds), 2026-06-08 → 2026-06-09

- [2026-06-08 · dock] "our dock should animate smoothly and capable of morphing dynamically like the
  ios 26 dock primitives found in swift. All of our UI elements should have this morphing/springy/
  liquid and dynamic facility."
- [2026-06-08 · dock] "The dock animations, layering, and all facilities thereof (big dock, vertical,
  rail, carousel, slide dock, useIdle, click events, shrinking, morphing into arbitrary shapes,
  shrinking, expanding) need to all be prototyped, too, and hardened."
- [2026-06-08 · cross-repo] (G-folds from other sessions) Item 1/G-1 static specular blowout
  (rest-floor→0, Card `specular="off|subtle|full"`); Item 2 DarkModeToggle-in-dock oversize (route
  through `--dock-control-glyph-size`); G-3 LabeledField `orientation="horizontal"` settings-row;
  G-4 `{types}` directional View-Transition helper; G-5 `<DrawerContent spring>`; G-6 optional
  `surface="cartoon" tier="quiet"` preset.
- [2026-06-08 · slides] "Ensure, too, the xray slide is properly a two column layout on desktop--the
  xray portal should be on the right." + "Why are there two slides that reference 'See the live
  portal at xray.friday.institute' 5 and 6 mention it." + "Slides 5, 6, 7 need to be completely
  re-designed, as 5 reads like the final slide."
- [2026-06-08 · cross-repo] "fourier-field is to be considered a first-class glass-ui component, too"
  + "defer fourier-field's SOTA research to be done mid-tranche and folded using an orchestrator…
  that SOTA research must consider webgpu, our optimized gpu primitives, and our fourier-analysis
  visualization suite." (later REVERSED — see W43 pull-up below)
- [2026-06-08 · publish] "we need to publish and move off of this feature branch, too, to properly
  commit and push what we have now…Merge into master. Publish to NPM, check CI, etc."
- [2026-06-08 · cross-repo] "the /compositions/math-paper and our math facilities should properly
  leverage our latex-paper lib, too."
- [2026-06-08 · sizing] "On both mobile and desktop, too, we need to increase touch target size, and
  font-size, generally, for our components. In an idiomatic and non contrived, modern way."
- [2026-06-08 · glass] "That specular/radial effect needs to be DRAMATICALLY reduced or removed
  entirely…look at this speedtest card…such that our components remain and are optimally glassy--more
  of realistic, natural, though performant and safari compatible, glass…increase liquid glass
  morphism throughout. The specular hover, too, is/was egregious. And our general button hover effect
  is not smooth enough." (becomes D19/W52)
- [2026-06-08 · glass] "Should this glass not be first class in our other components, like the dock,
  cards, etc--why is our default not glass? Deploy a workflow with 32 agents in parallel to audit and
  harden our glass-character." + "all glass items should be defaults and the standard default
  abrogated, or at least we can have a variant that tunes the level of glass, such as a variant that's
  opaque?" (becomes G1/W54)
- [2026-06-08 · prune] "the /composables/use-token-color--this should likely be removed. And that
  icon should be made a darkmode toggle."
- [2026-06-08 · aurora] "the radial items within this page need to be refined--why not use an aurora
  for this with those colors--some pages and heros should leverage a constellation, too."
- [2026-06-08 · defect] "The radial bg in /primitives/pulse is far too egregious."
- [2026-06-08 · glass] "Each page should, when befitting, use our speedtest grid idiom, to be more
  paper and glass-like, too."
- [2026-06-08 · prune] "/primitives/disco-glyph should be removed." + "/primitives/glyph-face should
  likely too."
- [2026-06-08 · tabs] "Default tabs should be the pill variant…is broken." + "Bouncy (custom
  spring-slider variant) should be the default tabs, actually--with the tabs and pill variants." +
  "BouncyToggle should be replaced in favor of bouncy tabs--it should either be removed or leverage
  the exact same animation scheme as the tabs--the 'Bouncy' prefix should be removed and all
  consumers updated." (becomes T1-T4/W53)
- [2026-06-08 · dock] "there's a moment when the shrunken icon does not appear for a while--the
  animations and timings need to be tuned such that the shrunken icon appears naturally with no
  additional delay." + "The hover/select state for these dock icons/dropdowns is not right at all."
  + "collapsible dock should not modify the flow of the page perhaps, and the icon is missing." +
  "Big dock icons are not aligned." + "Dock items should be properly demarcated with separators when
  befitting to effuse design and affordance hierarchy."
- [2026-06-08 · dock] "the collapse animation for the internal items still needs to be refined…The
  dock layers and switching layers should be animated and first class." + "Dock layers is not
  smoothly animated and far too laggy/delayed." + "The rail bg's are not right and mis-aligned." +
  "We should properly differentiate between the vertical dock and the rail for the horizontal dock."
- [2026-06-08 · tabs/prune] "/navigation/responsive-tabs should be subsumed by the underline tabs--and
  all be within one component."
- [2026-06-08 · prune] "/navigation/glass-carousel should be removed."
- [2026-06-08 · glass] "/navigation/carousel should be made more apple like and leverage a more glass
  like aesthetic…audit apple's actual website and animation styles, notice their liquid and squishy
  effects--we want to mirror that. Research the SOTA: https://www.apple.com/os/"
- [2026-06-08 · dock] "We should have an entire vertical dock section dedicated to the dock, our
  glass, etc."
- [2026-06-08 · glass] "The glass dock when over very light materials is un-readable--we should
  dynamically adjust and darken the glass effect if possible--what's the SOTA solution to this, as of
  iOS27?" (becomes G2/W55)
- [2026-06-08 · defect] "/substrates/glass-material is broken, yes." + [2026-06-08 · aurora]
  "/substrates/aurora totally crashes."
- [2026-06-08 · squircle] "We should pivot to using squircles for most of our design language, though
  rounded for cards and so forth, rounded for docks--though big docks and the like should be
  squircles." (becomes G3/W56)
- [2026-06-08 · demo-IA] "Ensure each story page has interspersed pieces of text explaining items,
  but with NO superfluity. Most of the extant text now is duplicative or code that needs to be
  removed." + "Audit, too, for our language in the storybook, like internal meta language like
  '(WCAG 2.2.2)'. These notes are largely useless/superfluous--we should plan to remove these." (P10/P11)
- [2026-06-08 · slider] "We should have two slider types, default, which is a glass slider that has
  its thumb integrated fully into the slider: the slider should essentially be like pulling left or
  right a continuous rounded cylinder with no visible demarcation between thumb and filled track; and
  the spectrum slider, which is the variant currently employed in value.js…the track is a rounded
  squircle, not a circle." (becomes W59)
- [2026-06-09 · dock] "Many dock issues still remain--like the shrunken size of this item in the demo
  not being the proper size." (Q1)
- [2026-06-09 · aurora] "Some of the aurora previews have a noticeable black bar in the top preview."
  (Q2)
- [2026-06-09 · dock] "The hover effect for the dock and buttons is not right or noticeable, only on
  click is it." (Q3 — contradicts W52 live-verified mark)
- [2026-06-09 · glass] "/foundations/intro and other hero items should have the aurora or constellation
  or fourier-field--each hero should use a unique one--in the true background of the whole page--the
  hero item should be glassy to demonstrate the glass card." (P7/Q9)
- [2026-06-09 · glass] "Pages like /primitives/buttons and others should be better structured and be
  within a glass container, and better leverage our paper, and grid backgrounds." (Q4) +
  "All pages should be re-designed to have proper containers and design hierarchy, like our
  /primitives/badge, /primitives/label--essentially, contain them in glass cards, etc." (Q7)
- [2026-06-09 · workflow] "The fourier-field SOTA research phase should be executed now, not
  mid-tranche--pull that section up and execute the SOTA research now." (reverses the 06-08 defer)
- [2026-06-09 · demo-IA] "/motion/transitions should be properly unioned with /foundations/motion--
  deduplicate." (Q5) + "None of these items work--to demonstrate glass…we need an interesting or
  somewhat more involved background to display against--paper, constellation, fourier, aurora with
  different types." (Q6)
- [2026-06-09 · defect] "The configurator/settings should animate much faster, smoother, springy." (D1)
- [2026-06-09 · dock] "Only some docks have proper persistent elements for nav--all of them should
  leverage the same root component, with a home button on the left, navs, etc, and dividing lines." (DK)
- [2026-06-09 · dock/glass] "The keyframes dock is quite good for selected elements--ensure that we're
  GLASS FIRST for buttons and items everywhere, but also in the dock."
- [2026-06-09 · cross-repo] "/compositions/math-paper should leverage real katex and latex-paper
  items--leverage and display our latex-paper search, virtualization system for windowing, etc." (D16)
- [2026-06-09 · prune] "/compositions/instrument-chassis should be removed, yes." (D12 confirm) +
  "What is the purpose of /composables/use-token-color--it should be replaced in the vertical dock
  with just a darkmode toggle." (P1 bump)
- [2026-06-09 · defect] "/compositions/gate-pattern literally gates you from the page when on click."
  (Q8 blocker)
- [2026-06-09 · glass] "Should leverage glass cards--the default for all items is their glass
  variants--fix that at the root." (G1/W54 TOP precedence)
- [2026-06-09 · workflow] "Do not execute the tranche thereupon. We must run a compaction first." +
  "run a 32 agent hardening hand challenge process to each extant wave, and our prior tranches--what's
  been chronically deferred, what keeps getting missed?…such that this golden tranche, when completed,
  perfects our component library."
- [2026-06-09 · workflow] (THE LEDGER ASK) "literally deploy an agent fleet to scan these and
  synthesize their items into a cogent document with direct quotations (typos fixed). This should
  cover all of our commands for the creation of essentially AU-AX. This can be to ensure nothing's
  dropped in the future AX waves."

---

## §3 — Thematic cross-index (status against AX HEAD)

Status read against PROGRESS.md + MASTER-PLAN.md + USER-DEFECTS pass-3.

### Glass-first / glass-character
- "why is our default not glass?…all glass items should be defaults" / "the default for all items is
  their glass variants--fix that at the root" / "GLASS FIRST for buttons and items everywhere, but
  also in the dock." → **IN-FLIGHT.** G1/W54 glass-first-class (the `--glass-level` scalar + opaque
  escape) — `planned`, ratified MAXIMAL (R3 USER-DECIDED), TOP precedence (Batch 1). The ROOT that
  blocks the page-redesign.
- "a variant that tunes the level of glass, such as a variant that's opaque" → **IN-FLIGHT** (W54
  opaque escape).
- "components should be glasser…more suffused" / "increase liquid glass morphism throughout" →
  **ADDRESSED** (W52 liquid-glass overhaul live-verified) + ongoing W54.
- "The double blur is a bit gratuitous" / "dock blurs need to be more subtle" → **ADDRESSED**
  (dock blur reduced across W01-W05 band) — verify under W54.

### Dock
- AX pivot "Move the dock to the top" + "overflow case more natural, idiomatic, properly wrapped and
  shadowed" → **ADDRESSED** (W04 dock overflow wrap complete + live-verified).
- "single-scalar morph" / "one morph-orchestrator" / iOS-26-Swift morphing → **ADDRESSED** (W01/W02/W05).
- "dock with a slider is broken" / keepDockOpen → **ADDRESSED** (W03 complete).
- "shrunken icon does not appear for a while" / "shrunken size…not being the proper size" (Q1) →
  **IN-FLIGHT** (W45-TUNE, Batch 3).
- "hover/select state for dock icons/dropdowns not right" (Q3/DK2) → **OPEN** (Q3 contradicts W52
  live-verified; Batch 3 re-verify candidate).
- "Big dock icons not aligned" / "dock items demarcated with separators" / region-model →
  **ADDRESSED** (W45 + DockSeparator live-verified).
- "Dock layers not smoothly animated, laggy/delayed" / "rail bg's not right and mis-aligned" /
  "differentiate vertical dock and rail" → **IN-FLIGHT** (W45 layer-anim + W06 rail, Batch 3).
- "all docks leverage the SAME root component, home button on the left, navs, dividing lines" (DK) →
  **OPEN→IN-FLIGHT** (dock-unify-root, W45 extension, Batch 3; net-new spec to author per Batch 0).
- "entire vertical dock section dedicated to the dock" → **IN-FLIGHT** (W06/W18 dock showcase).
- "DarkModeToggle-in-dock oversize, route through --dock-control-glyph-size" (G-fold Item 2) →
  **IN-FLIGHT** (AX.W06 fold target).
- "collapsible dock should not modify the flow of the page, icon is missing" → **OPEN** (W45-TUNE/W06).
- "DockPopover should not be a special component" / "support many components nested in the dock" →
  **OPEN** (S1-era; verify against current dock-layer system).

### Aurora
- "/substrates/aurora totally crashes" / "core aurora does not render" (WebGPU black) → **ADDRESSED**
  (W07 aurora core unblock complete + live-verified).
- "derive color variant, full OKLAB/OKLCH, modern color spaces, webgpu" → **ADDRESSED** (W10/W11/W12).
- "oil-pastel van-gogh, atomic brush strokes, ultra high-fidelity" → **ADDRESSED** (W13 mediums
  live-verified) + preset roster naming **IN-FLIGHT** (W47 van-Gogh/oil-pastel/crayon names, D2, Batch 6).
- "noticeable black bar in the top preview" (Q2/aurora previews) → **OPEN** (W47/usePresetThumbnails, Batch 6).
- "aurora configurator faster/springier" (D1) / "configurator not expressive" → **OPEN** (W38, Batch 6).
- "WebGPU painterly parity or excise" → **IN-FLIGHT** (W14 planned, Batch 6).
- "fully dynamic and interactive if requested, as should the constellation" → **PARTIAL** (constellation
  W17 done; aurora interactivity verify under W38).
- "speedtest aurora preset" → **IN-FLIGHT** (W28 speedtest native-first receive).

### Blob
- "Goo seems broken totally" / blob flood → **ADDRESSED** (W08 blob core unblock + W15/W16 complete).
- "blob live-truth tune — floors→bands, lighting/hover down, mood latch" (D4/D5/D7) → **OPEN**
  (W46, a live BLOCKER, Batch 2).
- "blob configurator/demo tab on the sidebar" → **IN-FLIGHT** (W18 IA + W16 integration).
- "watercolor-dot wave spec" → **ADDRESSED** (folded into the blob band).

### Tabs
- "Default tabs should be the pill variant" → superseded by "Bouncy should be the default…with tabs
  and pill variants." + "BouncyToggle replaced…'Bouncy' prefix removed, all consumers updated" (T1-T4) →
  **ADDRESSED** (W53 tabs-unify live-verified; SegmentedTabs subsumes Bouncy/Underline/Responsive).
- "/navigation/responsive-tabs subsumed by underline tabs, one component" → **ADDRESSED** (W53).

### Slider
- "standard (glass-scrubber) ROUNDED continuous track+knob, iOS, + spectrum; port ALL consumers" →
  **ADDRESSED** (W59 slider redesign live-verified — integrated-cylinder default + squircle-thumb
  spectrum; consumer port verify under W34/W28).
- S1 "slider padding standardized / Glass Track refined" → **ADDRESSED** (W59 + the spring vocab).

### Squircle
- "pivot to squircles for most of our design language, rounded for cards/docks, big docks squircles"
  (G3) → **ADDRESSED** (W56 squircle-language live-verified; R1 USER-DECIDED — dialogs/sheets/panels/
  hero cards get superellipse, cards+pills stay rounded).

### Demo-IA + page-redesign
- "pages structured within a glass container, leverage paper + grid backgrounds" (Q4) /
  "all pages re-designed with proper containers + design hierarchy, contain in glass cards" (Q7) →
  **OPEN→IN-FLIGHT** (page-redesign umbrella W60, net-new, PR USER-DECIDED thin container-layer; Batch 4,
  blocked on W54).
- "hero items glassy over full-page aurora/constellation/fourier, each unique" (P7/Q9) → **IN-FLIGHT**
  (W57 demo-radial reauthor + heros live-verified; extend per pass-3 bump).
- "/motion/transitions unioned with /foundations/motion" (Q5) → **OPEN** (Batch 5).
- "None of these items work" broken motion section (Q6) → **OPEN** (Batch 5).
- "storybook IA reinvention, sidebar restructure, dock items in many sections" → **IN-FLIGHT**
  (W18 planned, Batch 5).
- "metric-badge vs metric-pill" / "configurator not a primitive" recategorize → **IN-FLIGHT** (W21).
- "interspersed text with NO superfluity, remove duplicative text" / "kill WCAG citations + impl-note
  comments" (P10/P11) → **ADDRESSED** (W58 dev-complete, proof:story-language GREEN, 49 SFCs swept).
- "increase touch target size + font-size, library-wide --ui-scale" (D18) → **IN-FLIGHT**
  (W51 --ui-scale umbrella, planned, Batch 6; spec to author per Batch 0).
- "uniform dropdown/select/menu type-scale" (D17) → **IN-FLIGHT** (W50, Batch 6).
- "speedtest grid idiom on pages, more paper/glass-like" → **OPEN** (folds into page-redesign W60).
- "Number Field refined and rounded" (S1) → **OPEN** (verify).
- "pill list scrollable and re-designed" (S2) → **OPEN** (verify under W18).

### Prunes
- instrument-chassis "all removed" / "not general enough" (D12) → **IN-FLIGHT** (W28/W29 chassis
  RETIRE confirmed, Batch 7).
- header-ribbon / glyph-face / disco-glyph removed → **ADDRESSED** (W19 primitive prune A live-verified).
- glass-carousel removed → **IN-FLIGHT** (W23/W29; glass-carousel already retired per CLAUDE.md AX.W19).
- "speedtest primitives owned by speedtest, repatriate" → **IN-FLIGHT** (W28/W29, Batch 7).
- use-token-color demo removed, vertical-dock icon → DarkModeToggle (P1) → **IN-FLIGHT** (W18/W21;
  P1 USER-DECIDED — composable stays for constellation.vue, demo+icon fixed).
- icon-button-token-ladder / drawer-live-behind orphan demos → **IN-FLIGHT** (W18/W29 orphan prune).
- glass-panel "suck"/retire → **IN-FLIGHT** (W20 glass-panel retire, planned).

### Cross-repo + slides + keyframes
- glass-ui↔slides union "AUGMENT + LEVERAGE, abstract CORE primitives up only where gaps remain" →
  **IN-FLIGHT** (W17 constellation adopt done; W30-W32 slides re-ground, Batch 7).
- slides 5/6/7 redesign + xray two-column + ordering + constellation translucency → **OPEN**
  (W31 content reframe; the Tranche K re-seed flagged orphaned on a stale branch — Batch 7).
- slides token-gate / access-key modal glass-styled / locked-slide blur+lock → **PARTIAL** (slides
  Tranche E shipped per memory; modal restyle folds into W31).
- pptx export (light/dark) + gear popover → **PARTIAL** (slides-side; deck-progress W24 done).
- slides bottom progress bar NOT baked into dock, page-bottom element → **OPEN** (W24/W30-W32).
- math-paper × latex-paper (real katex + search + virtualization) (D16) → **IN-FLIGHT** (W49, Batch 7).
- "de-duplicated union value.js/keyframes.js/glass-ui/slides; value.js owns color, keyframes
  animation" → **IN-FLIGHT** (W34 cross-constellation idiom + W35 keyframes prune, Batch 7).
- fourier-field first-class glass-ui component + SOTA pulled-up NOW → **IN-FLIGHT** (W43 fourier-field,
  SOTA pull-up per Batch 1; W43-fourier-field-SOTA.md exists in inventory).
- keyframes consume-edge / peer-bump coordination (^3.8.0) → **IN-FLIGHT** (W34 consumer-adoption ledger).
- speedtest reader-only (inv-16) R-CONSUME protocol → **IN-FLIGHT** (W28, Batch 7).

### Publish
- "merge off feature branch, publish to NPM, check CI" + "3.8.0/3.9.0 provenance-clean master-merged"
  → **PARTIAL/IN-FLIGHT.** 3.8.0 published (from branch-tip, master since FF'd); the merge+re-tag +
  3.9.0 provenance-clean publish is a Batch 9 close item, hard predecessor of the slides close.
- consumer bumps (speedtest/slides/words/fourier) + slides deploy + prod-validate → **OPEN** (Batch 9).

### Defect-pass families (provenance)
- **P1/P2/P3 (USER-DEFECTS passes 1/2/3, 2026-06-08)** — 17 live-truth defects the headless gates
  missed → mapped into W44-W50 + augments + 2 cardinal re-opens. Mostly **IN-FLIGHT/OPEN**.
- **Q1-Q9 (pass-3 NEW, 2026-06-08 ~19:46)** — Q1 dock collapsed size (IN-FLIGHT W45-TUNE), Q2 aurora
  black bar (OPEN W47), Q3 hover (OPEN, W52 re-verify), Q4/Q7/Q9 page-redesign (IN-FLIGHT W60),
  Q5 motion union (OPEN), Q6 broken motion+background (OPEN), Q8 gate-pattern-locks-out (OPEN, Batch 2
  BLOCKER). → mostly **OPEN**.
- **D1-D19 (convergence defect set)** — D1 configurator springy (OPEN W38), D2 aurora preset names
  (IN-FLIGHT W47), D3 BouncyTabs double-spring (re-open W05), D4/D5/D7 blob (OPEN W46), D8 glass-material
  demo (OPEN W48, BLOCKER), D9 dock underline (IN-FLIGHT W40), D10 dark-contrast AA (IN-FLIGHT W44),
  D11 specular radials (W09 re-open, absorbed by W52), D12 chassis retire (IN-FLIGHT W28/29), D13/D15
  dock region+mobile-scale (ADDRESSED W45), D14 dock category (IN-FLIGHT W18/W06), D16 math-paper
  (IN-FLIGHT W49), D17 dropdown type-scale (IN-FLIGHT W50), D18 --ui-scale (IN-FLIGHT W51), D19
  liquid-glass overhaul (ADDRESSED W52). → mixed.
- **G1-G3 (the three foundational hinges, USER-DECIDED)** — G1 glass-first (W54, IN-FLIGHT ROOT),
  G2 adaptive-glass iOS27 (W55, OPEN), G3 squircle (W56, ADDRESSED). 
- **DK1-DK10 (dock-band defects)** — DK1/2/4/5/7/8 → **ADDRESSED** (W45 region-model live-verified;
  DK7 second clock deleted per one-clock re-open); DK2/DK3 hover/ratify → **OPEN** (Batch 3, ties Q3).
- **T1-T4 (tabs-unify)** → **ADDRESSED** (W53 live-verified).
- **G-folds (cross-session hand-offs, AV/keyframes)** — G-1 specular (ADDRESSED W52/W09), G-2 dock-icon
  specular (IN-FLIGHT), G-3 LabeledField horizontal (OPEN), G-4 View-Transition helper (OPEN), G-5
  DrawerContent spring (OPEN, book/LOW), G-6 cartoon×quiet preset (OPEN, LOW).
- **P6/P7/P8/P10/P11 (page/story defects)** — P6/P7 demo-radial+heros (ADDRESSED W57), P8 page-hierarchy
  (IN-FLIGHT W60), P10/P11 storybook-language (ADDRESSED W58).

---

## §4 — The drop-risk list (OPEN/UNADDRESSED — the "nothing dropped" backstop)

Commands that are OPEN or only loosely owned and most at risk of being dropped. Each must surface in
a named AX wave before close.

**Blockers (broken-on-live, must clear early — Batch 2):**
1. Q8 — "/compositions/gate-pattern literally gates you from the page when on click" (locks you out). OPEN.
2. D8/W48 — "/substrates/glass-material is broken" — glass-material demo reauthor (bind shipped specular
   seams). OPEN.
3. D4/D5/D7/W46 — blob live-truth tune (floors→bands, lighting/hover down, mood latch). OPEN.

**Hover/interaction soundness (cardinal re-verify — Batch 3):**
4. Q3/DK2 — "hover effect for the dock and buttons…only on click is it" — CONTRADICTS W52's
   live-verified mark. A cardinal re-verify; do not let the W52 GREEN mask it.

**Page-redesign umbrella (un-owned until W60 minted — Batch 4, blocked on W54):**
5. Q4 — "/primitives/buttons within a glass container + paper/grid backgrounds." OPEN.
6. Q7 — "ALL pages re-designed, proper containers + design hierarchy, contain in glass cards." OPEN.
7. "speedtest grid idiom on pages, more paper/glass-like." OPEN (folds into W60).
8. S2 "pill list scrollable and re-designed" + S1 "Number Field refined and rounded" — small,
   easily-dropped page fixes. OPEN/verify.

**Demo-IA dedup (Batch 5):**
9. Q5 — "/motion/transitions unioned with /foundations/motion, deduplicate." OPEN.
10. Q6 — "None of these items work" broken motion section + interesting background. OPEN.
11. Q2 — aurora "noticeable black bar in the top preview." OPEN (W47/usePresetThumbnails).

**Dock-unify-root (net-new spec, author in Batch 0; finish Batch 3):**
12. DK — "all docks leverage the SAME root component, home button on the left, navs, dividing lines."
    OPEN — net-new, easily lost between W45 and W06.
13. "collapsible dock should not modify the flow of the page, icon missing." OPEN.
14. S1 "DockPopover should not be a special component / support nested components" — oldest dock ask,
    verify it survived the dock rebuild. OPEN.

**Cross-session G-folds (low-precedence, classic drop candidates):**
15. G-3 — LabeledField `orientation="horizontal"` settings-row + label-action slot. OPEN.
16. G-4 — `{types}` directional View-Transition helper. OPEN.
17. G-5 — `<DrawerContent spring>` prop (LOW/book). OPEN.
18. G-6 — optional `surface="cartoon" tier="quiet"` preset (LOW). OPEN.
19. G-2 — dock-icon specular tune (MED). IN-FLIGHT but loosely owned.

**Aurora/sizing (Batch 6):**
20. D1/W38 — "configurator/settings animate much faster, smoother, springy." OPEN.
21. G2/W55 — "glass dock over light materials un-readable, dynamically darken (iOS27 SOTA)." OPEN.
22. D18/W51 — library-wide `--ui-scale` (touch target + font-size up) — spec un-authored. OPEN.

**Slides + cross-repo (Batch 7 — the Tranche K re-seed risk):**
23. Slides 5/6/7 redesign + xray two-column + ordering + constellation translucency — flagged
    ORPHANED on a stale branch; must re-seed onto deployed main or it is silently dropped. OPEN.
24. "slides bottom progress bar NOT baked into the dock, page-bottom element." OPEN.
25. D16/W49 — math-paper × real katex + latex-paper search/virtualization. IN-FLIGHT (extend per bump).

**Publish/close (Batch 9):**
26. 3.9.0 provenance-clean master-merged publish + consumer bumps (speedtest/slides/words/fourier) +
    slides deploy + prod-validate — the terminal gate; the whole engagement's "done." OPEN.

**Standing discipline at risk:**
27. "No audit/visual/ captures" — the screenshot DELTA discipline the inventory flags as missing;
    every live close owes a captured before/after. Institute it (Batch 0) or the cardinal lesson
    erodes. OPEN.
