/**
 * Authority for the perfected-BI durable invariant taxonomy — DESCRIPTIVE CANON.
 *
 * This is formation data, not an executable roster: a human-read reference canon,
 * never a runner or engine. Verification itself is typecheck + build + unit tests +
 * the pre-tag lane + the one-time differentials quoted in wave commits (see the
 * addenda VERIFICATION declaration). No invariant below receives a command,
 * package-script alias, table file, or independently runnable "gate" identity.
 * Every row names a behavioral property and realistic mutations that must make its
 * evidence RED. The generated `invariants.json` is this canon serialized and carries
 * the same DESCRIPTIVE CANON status.
 */

const device = (id, domain, invariant, oracle, bites, modes = ["local", "ci", "release"]) => ({
    id,
    domain,
    kind: "device-free",
    modes,
    invariant,
    oracle,
    bites,
});

const browser = (id, domain, invariant, oracle, bites, scenarios, modes = ["local", "release"]) => ({
    id,
    domain,
    kind: "browser",
    modes,
    invariant,
    oracle,
    bites,
    scenarios,
});

export const INVARIANTS = Object.freeze([
    device(
        "integrity.types",
        "governance",
        "Library, tests, and declaration-build TypeScript programs agree without suppressions or generated declaration holes.",
        "Run the three project graphs and verify every public entry resolves to emitted declarations built from the same entry authority.",
        ["Remove one public return member from its declaration.", "Insert an expect-error that no longer suppresses a real error."],
    ),
    device(
        "integrity.build-package",
        "governance",
        "A clean build emits a self-contained package whose files, CSS URLs, maps, and declaration imports all resolve inside the packed artifact.",
        "Build in a clean output directory, npm-pack it, unpack elsewhere, parse every CSS URL and declaration import, and import every entry.",
        ["Delete one packed CSS asset.", "Point one emitted declaration at a source-only path."],
    ),
    device(
        "integrity.entry-graph",
        "governance",
        "One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists.",
        "Generate each projection in memory and compare semantic maps, then resolve every key from the packed artifact.",
        ["Add a package export absent from the authority.", "Restore one src/subpaths mirror barrel."],
    ),
    device(
        "integrity.dependencies",
        "governance",
        "Runtime, peer, optional, and development dependencies match actual import boundaries and the supported package contract.",
        "Parse import graphs and package metadata; reject undeclared runtime imports, unused peer surfaces, source file links in release, and duplicate semantic engines.",
        ["Move a runtime dependency to devDependencies.", "Add a second spring engine for an existing motion concept."],
    ),
    device(
        "integrity.lineage",
        "governance",
        "The execution branch, ROOT canon commit, source-base commit, and wave commits form one declared lineage with no retrospective or duplicate wave attribution.",
        "Walk first-parent Git subjects and committed receipts; require exactly one terminal commit for every DONE or evidence-backed DEAD wave, forbid either outcome from sharing a commit, and require pre-implementation plan timestamps. A DEAD receipt never unlocks a dependent, and P002 DEAD withdraws the entire execution lineage.",
        ["Assign one commit to two waves.", "Move the ROOT canon pointer without renewing conformance."],
    ),
    device(
        "integrity.cursor",
        "governance",
        "Disk cursor and git make wave execution exactly-once across restart; only terminal waves unlock dependents.",
        "Replay state reconstruction from fixtures covering RUNNING crash, integrated-before-cursor crash, no-op, DEAD, and stale worktree.",
        ["Make a RUNNING wave runnable after restart.", "Let a no-op remain without DONE/DEAD disposition."],
    ),
    device(
        "integrity.dag",
        "governance",
        "The active graph is acyclic, subject-complete, transitively reduced, resource-lock schedulable, and contains no ceremony-only tail.",
        "Validate schema, compute transitive reduction, simulate locks, identify proof-only leaves, and require every accepted obligation to map exactly once.",
        ["Add a transitive edge.", "Add a LAST wave whose only subject is rerunning already-owned evidence."],
    ),
    device(
        "integrity.release",
        "governance",
        "FINAL, version, changelog, migration, tarball, verifier evidence, π evidence, and tag all describe the exact same terminal source tree.",
        "Generate release projection from cursor; compare hashes and reject missing/nonterminal/older evidence before tag creation.",
        ["Change package version without projection regeneration.", "Use a π artifact from the parent commit."],
    ),

    device(
        "architecture.component-topology",
        "architecture",
        "Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent.",
        "Build an AST component/export graph, classify concept IDs, and enforce one home plus explicit private parts.",
        ["Restore src/components/ui.", "Export IconTooltip beside Tooltip."],
    ),
    device(
        "architecture.import-boundaries",
        "architecture",
        "Imports flow through declared public family or private owner boundaries without nested source entrypoints, cycles, or alias-dependent package behavior.",
        "Parse the TS/Vue/CSS graph, compute SCCs, and resolve package-vs-source boundaries.",
        ["Import a sibling family's internal file.", "Create an SCC between motion and glass."],
    ),
    device(
        "architecture.clean-break",
        "architecture",
        "No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives.",
        "AST and semantic registries enumerate aliases/props/tokens/exports; allow only classified capability, accessibility, SSR, or initial-value paths.",
        ["Re-export Countup as an alias.", "Read both variant and morphT for the same blob state."],
    ),
    device(
        "architecture.present-tense-source",
        "architecture",
        "Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology.",
        "Comment-aware scanner permits API rationale and external standards, rejects historical wave/tranche narratives and compatibility promises.",
        ["Add a BI.W identifier to src.", "Describe a retired implementation as current rationale."],
    ),

    device(
        "design.token-graph",
        "design",
        "Every semantic token has one definition, typed domain, live consumer, valid dark/contrast resolution, and no alias cycle or dead rung.",
        "Parse CSS custom-property definitions/reads and typed token manifests as a graph; resolve computed values in representative roots.",
        ["Create a token alias cycle.", "Add a defined token with no computed consumer."],
    ),
    browser(
        "design.material-hierarchy",
        "design",
        "Content field, elevated content surface, functional glass, and transient overlay remain perceptually ordered in light/dark and simple/complex backdrops.",
        "Measure luminance separation, edge contrast, blur/lensing response, and occlusion across enrolled composited scenes; compare ordering, not a screenshot hash.",
        ["Give a content card the same translucency as navigation glass.", "Remove overlay edge separation on a complex backdrop."],
        ["material-simple-light", "material-complex-light", "material-simple-dark", "material-complex-dark"],
    ),
    browser(
        "design.contrast",
        "accessibility",
        "Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state.",
        "Compute foreground/background through composited scenes and run accessibility assertions across light/dark and interactive states.",
        ["Lower selected-control icon contrast below its required band.", "Remove the noncolor focus boundary."],
        ["contrast-light", "contrast-dark", "contrast-complex-backdrop"],
    ),
    browser(
        "design.adaptive-accessibility",
        "accessibility",
        "Reduced transparency, increased contrast, forced colors, and reduced motion remain complete product states with visible hierarchy and semantics.",
        "Run the rendered story matrix under each media/emulation mode and assert state visibility, focus, and material replacement behavior.",
        ["Leave text on transparent glass under reduced transparency.", "Use color alone for forced-colors selection."],
        ["reduced-transparency", "contrast-more", "forced-colors", "reduced-motion"],
    ),
    browser(
        "design.typography",
        "design",
        "Display, heading, body, label, code, and numeric rungs are optically distinct, geometrically stable during font load, and never arbitrarily re-minted by a component.",
        "Measure computed type roles, line wrapping, font-swap geometry, hierarchy inversions, and overflow at narrow/wide widths.",
        ["Set a label larger than its section heading.", "Remove size-adjust from the loading fallback and induce layout shift."],
        ["type-wide", "type-narrow", "type-font-swap"],
    ),
    browser(
        "design.affordance",
        "design",
        "Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone.",
        "Exercise state transitions and compare cursor/focus/geometry/label/material signals across the rendered component roster.",
        ["Make a static Badge visually identical to a Button.", "Remove the noncolor selected indicator."],
        ["affordance-keyboard", "affordance-pointer", "affordance-touch"],
    ),
    browser(
        "design.responsive-touch",
        "accessibility",
        "Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs.",
        "Sweep semantic breakpoints and input modes; measure reachable targets, scroll containers, overlap, and focus order.",
        ["Reduce a primary coarse target below the product floor.", "Hide a control at narrow width without an equivalent path."],
        ["narrow-coarse", "narrow-keyboard", "wide-fine"],
    ),

    device(
        "motion.single-clock",
        "motion",
        "Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work.",
        "AST plus runtime instrumentation classifies ownership by mechanism and property, then proves pause, settle, interruption, offscreen behavior, and teardown; raw callback counts, one global scheduler, and a keyframes import are never success evidence.",
        ["Add a component-local rAF writer for a transform already controlled by engine playback.", "Keep a native/CSS timeline and JS shadow writer active on the same property.", "Let a discrete typing timer or one-shot coalescer survive cancellation/teardown."],
    ),
    browser(
        "motion.spring-language",
        "motion",
        "Press, selection, morph, dock, and route motion draw from one named spring vocabulary and settle without overshoot/magnitude anomalies.",
        "Record temporal geometry samples and fit them to declared families with behavior bands, not exact frame snapshots.",
        ["Use an arbitrary cubic-bezier for a spring-owned press.", "Double dock overshoot beyond its family band."],
        ["spring-pointer", "spring-touch", "spring-keyboard"],
    ),
    browser(
        "motion.transition-continuity",
        "motion",
        "Enter, exit, reorder, route, and shared-element transitions preserve identity, focus, and spatial continuity without layout flashing.",
        "Capture geometry/focus/state trajectories through named transitions and assert continuity and final ownership.",
        ["Unmount the source before the shared destination is measurable.", "Lose focus during a dialog-to-page transition."],
        ["route-transition", "overlay-transition", "reorder-transition"],
    ),
    browser(
        "motion.scroll",
        "motion",
        "Scroll-linked effects are bounded to the owning scroller, preserve input responsiveness, and use native timelines where supported without a shadow writer.",
        "Instrument scroll timelines/writers and sample progress monotonicity, scroller ownership, main-thread work, and unsupported-path behavior.",
        ["Attach a document listener for a component scroller.", "Run JS progress writes while a native timeline is active."],
        ["scroll-native-safari", "scroll-native-chrome", "scroll-coarse"],
    ),
    browser(
        "motion.reduced",
        "accessibility",
        "Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality.",
        "Exercise every enrolled transition under PRM and assert final state, latency, and absence of continuous animation/travel.",
        ["Keep a breathing loop active under PRM.", "Suppress the selected-state change along with its animation."],
        ["prm-navigation", "prm-overlay", "prm-procedural"],
    ),

    browser(
        "behavior.overlay-apg",
        "behavior",
        "Dialog, drawer, popover, menu, tooltip, and toast honor their distinct APG roles, focus, dismissal, modality, and announcement contracts over shared infrastructure.",
        "Keyboard/pointer/touch scenarios assert role/state/focus stack/escape/outside-click and announcement semantics per concept.",
        ["Give a tooltip dialog semantics.", "Let Escape close the wrong stacked overlay."],
        ["overlay-keyboard", "overlay-pointer", "overlay-touch", "overlay-stack"],
    ),
    browser(
        "behavior.forms",
        "behavior",
        "Form controls preserve labels, descriptions, errors, required/invalid state, keyboard editing, and native submission semantics.",
        "Render every form family in valid/invalid/disabled/read-only states and exercise keyboard, pointer, touch, and form submission.",
        ["Detach a Select error from aria-describedby.", "Prevent NumberField native form value submission."],
        ["forms-keyboard", "forms-touch", "forms-invalid"],
    ),
    browser(
        "behavior.selection",
        "behavior",
        "Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus.",
        "Exercise selection models, orientation, Home/End/arrows, form state, and selected visual signals.",
        ["Expose aria-pressed on a tab.", "Allow an exclusive group to hold two values."],
        ["selection-keyboard", "selection-touch"],
    ),
    browser(
        "behavior.dock",
        "behavior",
        "Dock layers, selection, overflow, morph, escape, focus, context, and reserved layout form one deterministic state machine across rail and bottom modes.",
        "Drive the public state machine through keyboard/pointer/touch, verify geometry, focus, and layer ownership, and detect duplicated engines.",
        ["Open two exclusive dock layers.", "Let a rail selection push a route during hydration."],
        ["dock-rail-keyboard", "dock-bottom-touch", "dock-overflow", "dock-layer-stack"],
    ),
    browser(
        "behavior.data",
        "behavior",
        "Tables, data tables, metrics, progress, timeline, and virtual lists preserve semantic structure, stable identity, readable density, and truthful loading/empty/error state.",
        "Exercise sort/select/virtualize/update states and inspect semantic tables/rows/metrics plus painted alignment.",
        ["Use array index as a row identity.", "Announce indeterminate progress as a false percentage."],
        ["data-keyboard", "data-density", "data-virtual"],
    ),
    browser(
        "behavior.feedback",
        "behavior",
        "Alert, notification, toast, badge, status, pulse, skeleton, and progress communicate distinct urgency/liveness without color-only or perpetual-motion ambiguity.",
        "Run state and announcement scenarios; compare semantic roles, lifetime, motion, labels, and visual hierarchy.",
        ["Give a decorative Pulse assertive live-region semantics.", "Make error and success badges differ only by hue."],
        ["feedback-static", "feedback-live", "feedback-prm"],
    ),
    browser(
        "behavior.focus-escape",
        "behavior",
        "Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition.",
        "Traverse rendered routes and nested overlays using keyboard-only scenarios; assert the central focus/escape stack.",
        ["Restore focus to a removed trigger.", "Hide the focus ring on glass."],
        ["focus-route", "focus-overlay-stack", "focus-narrow"],
    ),

    device(
        "procedural.lifecycle",
        "procedural",
        "Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically.",
        "Instrument adapters and lifecycle events in fake/device contexts; reject private observer/resize/rAF forks and leaked handles.",
        ["Create a scene-local ResizeObserver lifecycle.", "Leave a GPU buffer alive after unmount."],
    ),
    browser(
        "procedural.renderer-parity",
        "procedural",
        "WebGPU-preferred and supported WebGL2 paths express the same scene identity, configuration semantics, color space, and interaction within declared perceptual bands.",
        "Render seeded configurations on both engines, compare geometry/color/statistics and behavior; expose engine identity and hard failure.",
        ["Interpret a config scalar differently in GLSL and WGSL.", "Silently render an unrelated Canvas2D scene after both GPU engines fail."],
        ["renderer-parity-safari", "renderer-parity-chrome"],
    ),
    browser(
        "procedural.color",
        "procedural",
        "Procedural scenes resolve CSS/OKLCh inputs through one linear-light pipeline with bounded gamut handling and no duplicate OETF or premultiplication error.",
        "Run analytic color vectors and painted readbacks across engines, themes, and alpha composites.",
        ["Apply sRGB encoding twice.", "Interpolate OKLCh hue through the long arc unintentionally."],
        ["procedural-color-light", "procedural-color-dark", "procedural-color-alpha"],
    ),
    browser(
        "procedural.interaction",
        "procedural",
        "Pointer/touch/keyboard/config interaction changes a scene deliberately, remains bounded, and preserves a calm default plus PRM behavior.",
        "Drive seeded scenes and compare response magnitude, containment, settle, touch equivalence, and PRM freeze/state.",
        ["Let pointer velocity eject a blob satellite from containment.", "Keep autonomous turbulence moving under PRM."],
        ["procedural-pointer", "procedural-touch", "procedural-prm"],
    ),
    browser(
        "performance.experience",
        "performance",
        "Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work.",
        "Collect traces and distributions over named scenarios; compare against product budgets and prior accepted distributions, not one magic snapshot.",
        ["Eager-load every procedural renderer on the landing route.", "Move work into an unmeasured post-load timer."],
        ["perf-cold-wide", "perf-warm-wide", "perf-narrow-coarse", "perf-procedural"],
    ),
    device(
        "performance.resource-ownership",
        "performance",
        "A route owns only the observers, contexts, event listeners, and timers required by rendered concepts, and teardown returns to baseline.",
        "Instrument creation/teardown and correlate handles with rendered owners across navigation cycles.",
        ["Leak a window listener across route exit.", "Create two WebGL contexts for one rendered scene."],
    ),

    browser(
        "demo.scenario-contract",
        "demo",
        "Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis.",
        "Discover scenario metadata and execute state controls; reject decorative controls that do not alter the claimed property.",
        ["Add a dark-mode control that changes no rendered subtree.", "Omit invalid state from a form story."],
        ["stories-wide", "stories-narrow", "stories-accessibility"],
    ),
    browser(
        "demo.gestalt",
        "demo",
        "The demo reads as one intentional product: warm field, functional glass, audacious typographic hierarchy, restrained color, and concept-driven motion without page-local design forks.",
        "Evaluate composited whole-route properties and cross-route consistency using structural metrics plus fresh human design review; never screenshot equality.",
        ["Restore a generic teal-gradient hero on one route.", "Give every card an independent glow and pill title."],
        ["gestalt-home-light", "gestalt-home-dark", "gestalt-representative-routes"],
    ),
    device(
        "constellation.handshake",
        "constellation",
        "Every in-scope sibling acceptance names the exact package tarball, owner commit, import scan, build/test evidence, and required π evidence; no retired import remains and no foreign write originates here.",
        "Compare owner packets/cursor receipts with read-only tracked-source scans, tarball digest, and before/after sibling status snapshots.",
        ["Accept a consumer against a different tarball digest.", "Count an uncommitted foreign patch as adoption."],
        ["local", "release"],
    ),
]);

const invariantIds = new Set(INVARIANTS.map((row) => row.id));
if (invariantIds.size !== INVARIANTS.length) {
    throw new Error("durable invariant IDs must be unique");
}
