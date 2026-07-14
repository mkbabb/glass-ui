import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";

import { SOURCE_BASE } from "./waves.registry.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const REPO = resolve(ROOT, "../../../..");
const sha = (value) => createHash("sha256").update(value).digest("hex");
const json = (name) => JSON.parse(readFileSync(join(ROOT, name), "utf8"));
const git = (...args) => execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
const table = (headers, rows) => [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell).replaceAll("|", "\\|").replaceAll("\n", " ")).join(" | ")} |`),
].join("\n");

const consumer = json("component-consumer-assay.json");
const rendered = json("rendered-demo-audit.json");
const consumerById = new Map(consumer.concepts.map((row) => [row.conceptId, row]));
const findingById = new Map(rendered.findings.map((row) => [row.id, row]));
const interactionById = new Map(rendered.interactions.map((row) => [row.id, row]));
const renderedRows = Object.fromEntries(Object.entries(rendered.runs).map(([run, value]) => [run, new Map(value.rows.map((row) => [row.requestedPath, row]))]));

const sourceCache = new Map();
const source = (path) => {
    if (!sourceCache.has(path)) sourceCache.set(path, git("show", `${SOURCE_BASE}:${path}`));
    return sourceCache.get(path);
};
const witness = ({ path, needle }) => {
    const text = source(path);
    const lines = text.split("\n");
    const indexes = lines.flatMap((line, index) => line.includes(needle) ? [index] : []);
    if (indexes.length === 0) throw new Error(`${path}: missing witness ${JSON.stringify(needle)}`);
    const index = indexes[0];
    return {
        path,
        sourceBaseBlob: git("rev-parse", `${SOURCE_BASE}:${path}`).trim(),
        line: index + 1,
        lineSha256: sha(lines[index]),
        excerpt: lines[index].trim(),
        matchCount: indexes.length,
    };
};

const definitions = [
    {
        id: "MOT-000",
        name: "Temporal authority and lifecycle",
        decision: "retain-plural-authorities",
        model: "One temporal authority and one writer per animated property or semantic episode; mechanism choice follows the work rather than a global-callback quota.",
        currentMechanism: "SpringProgress/SmoothProgress own managed physics playback; useRAFLoop and canvas lifecycle own continuous Glass fields/rendering; native CSS owns compositor timelines; one-shot rAF coalesces reads; cancellable timers express discrete typing. The live tempo specimen shows why ownership must be checked after composition: its panel and trigger scale 0.70→1.30 while its portaled scrim remains fixed at 550 ms. The reveal flagship separately remounts through nested rAF and pairs --spring-bouncy with a local fixed 500 ms horizon. The Springs lab uses another 1100 ms fixed clock for every named preset and its playground self-schedules raw rAF. The retained EasingPicker adds a fixed 1200 ms local rAF preview with restart/unmount cancellation but no reduced-motion or playing-state contract while surrounding prose variably calls playback keyframes-owned or a future seam.",
        productResolution: "Reject the literal one-clock doctrine. Classify and instrument every scheduler by role, property, stop condition, pause/PRM behavior, and teardown. A keyframes import is not an exemption and a different appropriate mechanism is not a fork. Conversely, a product that advertises one scaling authority across a composed episode must prove the same normalized factor for every named channel; a correctly scaled focal panel cannot launder its fixed-clock scrim, consumer-owned CSS cannot turn a named physical spring into an arbitrary-duration curve, and a demo cannot substitute a universal 1100 ms playback clock for per-row generated horizons. An editor-local normalized one-shot may be proportionate, but it must be named as such, expose restart/final/PRM state, and never masquerade as reusable keyframes playback.",
        sourceWitnessSpecs: [
            { path: "src/composables/motion/useSpring.ts", needle: "spring.value.play(noop);" },
            { path: "src/composables/motion/useRAFLoop.ts", needle: "export function useRAFLoop(" },
            { path: "src/composables/motion/scrollReader.ts", needle: "export function createScrollReader(" },
            { path: "src/components/custom/typewriter/utils/timing.ts", needle: "export function sleep(" },
            { path: "demo/stories/motion/tempo.vue", needle: "blurb=\"ONE registered inheriting scalar co-scales EVERY spring clock" },
            { path: "src/styles/utilities/btn.css", needle: "data-[state=open]:duration-[var(--duration-panel)]" },
            { path: "demo/stories/motion/reveal.vue", needle: "requestAnimationFrame(() => requestAnimationFrame" },
            { path: "demo/stories/motion/springs.vue", needle: "duration: 1100," },
            { path: "src/components/custom/easing/composables/useEasingPicker.ts", needle: "rafId = requestAnimationFrame(tick);" },
        ],
        liveRoutes: ["/motion/springs", "/motion/tempo", "/motion/scroll", "/motion/text-motion", "/motion/curve-gallery"],
        findingIds: ["RDA-018", "RDA-019", "RDA-020", "RDA-024", "RDA-025", "RDA-026", "RDA-030"],
        interactionIds: ["INT-009", "INT-017", "INT-020", "INT-021", "INT-022", "INT-023"],
        conceptIds: [],
        canonicalWaves: ["BI.W-P023", "BI.W-P024", "BI.W-P025", "BI.W-P031", "BI.W-P054", "BI.W-P124"],
        requiredStates: ["visible", "offscreen", "hidden", "interrupted", "settled", "cancelled", "PRM", "unmounted", "native/JS exclusivity", "zero orphan work"],
    },
    {
        id: "MOT-001",
        name: "Semantic spring language and tempo",
        decision: "retain-semantic-source-delete-distribution-mirror",
        model: "A small behavior-named Glass spring vocabulary whose generated CSS, direct JavaScript consumers, demos, and docs share one parameter source; upstream curve catalogues and CSS alias names do not become a second Glass callable API.",
        currentMechanism: "SPRING_PRESETS feeds generated CSS linear(), but a consumerless MOTION_CURVES reverse table and suite.ts republish peer catalogues. The green motion-presets command additionally preserves --ease-convergence on a prose future-consumer record although all nine bound sibling product trees have zero reads. The live gallery claims 1:1 upstream parity and displays stale parameters for all five spring rows; Deck's separate 0.5/0.85 fork also claims equality with canonical smooth 0.58/0.8. The tempo story's panel changes 308→572 ms across 0.70→1.30 while the portaled sheet-animate scrim remains 550 ms. The reveal flagship adds a second projection fork: all six rows use the bouncy curve for a fixed 500 ms rather than its 570 ms×tempo generated horizon. The Springs lab says four shipped rows while rendering seven from an eight-row source, and its smooth readout has 24 percentage stops versus 48 in the actual token because it omits the generator's measured-settle maxDuration before playing every row for 1100 ms. EasingPicker's actual authoring math is product-worthy and causal—Bezier and Steps edits changed reparsable literals—but its Bezier handles are pointer-only, copy rejection is silent, its play label collapses to 40×40 px, and its fixed preview clock has no truthful PRM/authority state.",
        productResolution: "Keep SPRING_PRESETS, trajectory bands, generated horizons/configuration, and global tempo projection, including normalized 0.70/1.30 ratio evidence for every channel explicitly claimed by the product. A consumer-owned CSS composition reads both the named trajectory and duration from that owner and separately declares stagger tempo behavior. The Springs lab derives copy/options, solver maxDuration, sample density, rounding, duration, and managed playback from the same generator contract; custom authoring is not mislabeled as a shipped token. Delete suite.ts, curves.ts, /motion-curves, --ease-convergence, the foreign taxonomy contract, and false/unowned local twins. Glass JavaScript consumers read the semantic preset/upstream callable directly; every displayed value derives from that same owner and managed playback. Preserve the actual /easing editor UI, not the catalogue mirror: it keeps upstream math ownership, semantic pointer/keyboard handle parity, explicit copy failure/recovery, a legible content-width play control, and a declared proportionate preview lifecycle/PRM contract. Vocabulary counts and duplicated taste literals are descriptive archaeology, never verification authority.",
        sourceWitnessSpecs: [
            { path: "src/composables/motion/springPresets.ts", needle: "export const SPRING_PRESETS" },
            { path: "src/composables/motion/curves.ts", needle: "export const MOTION_CURVES:" },
            { path: "src/styles/tokens/scheme-spring.css", needle: "--ease-convergence: var(--spring-gentle);" },
            { path: "demo/stories/motion/springs.vue", needle: "playRaf = requestAnimationFrame(tick);" },
            { path: "src/components/custom/deck/constants.ts", needle: "export const DECK_SPRING =" },
            { path: "demo/stories/motion/curve-families.ts", needle: "springRow(\"dock\", \"--spring-dock\", \"springTimingFunction(0.32, 0.7)\")" },
            { path: "src/styles/tokens/scheme-spring.css", needle: "--spring-snappy-duration: calc(var(--spring-snappy-settle) * var(--motion-tempo));" },
            { path: "src/styles/utilities/btn.css", needle: "data-[state=open]:duration-[var(--duration-panel)]" },
            { path: "demo/stories/motion/reveal.vue", needle: "animation: reveal-rise 0.5s var(--spring-bouncy, ease-out) both;" },
            { path: "demo/stories/motion/springs.vue", needle: "blurb=\"The four SHIPPED spring registers" },
            { path: "demo/stories/motion/springs.vue", needle: "const playStops = computed(() =>" },
            { path: "demo/stories/motion/springs.vue", needle: "duration: 1100," },
            { path: "src/components/custom/easing/EasingPicker.vue", needle: "role=\"img\"" },
            { path: "src/components/custom/easing/EasingPicker.vue", needle: "// fail-explicit: a befitting swallow" },
            { path: "src/components/custom/easing/EasingPicker.vue", needle: "class=\"btn-pill glass-btn rounded-pill px-3 py-2 text-sm text-foreground\"" },
            { path: "src/components/custom/easing/composables/useEasingPicker.ts", needle: "const t = Math.min(1, (now - start) / TRAVEL_DURATION_MS);" },
        ],
        liveRoutes: ["/motion/springs", "/motion/tempo", "/motion/curve-gallery"],
        findingIds: ["RDA-018", "RDA-019", "RDA-021", "RDA-024", "RDA-025", "RDA-026", "RDA-027", "RDA-028", "RDA-029", "RDA-030"],
        interactionIds: ["INT-009", "INT-019", "INT-020", "INT-021", "INT-022", "INT-023"],
        conceptIds: [],
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P023", "BI.W-P024", "BI.W-P025", "BI.W-P026", "BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P121", "BI.W-P124", "BI.W-P129"],
        requiredStates: ["press", "selection", "morph", "dock", "route", "fine", "coarse", "keyboard handle", "copy denied", "rapid reversal", "tempo 0.7/1/1.3", "PRM"],
    },
    {
        id: "MOT-002",
        name: "Press and tactile response",
        decision: "collapse-to-one-owner",
        model: "Pointer, keyboard, and touch press share one interruptible state/physics owner; material and reciprocal geometry are projections of the same semantic scalar.",
        currentMechanism: "Button rebuilds useSpringPress plus useLiquidFlex directly, while DockControl uses the declared canonical useLiquidPress wrapper; proof:button-glass forces the duplicate shape and CSS :active can overlap JS scale.",
        productResolution: "Fold useSpringPress into a private leaf of one public press owner, configure Button/Card/Dock from it, and make the CSS floor exclusive to no-JS/pre-hydration rather than a concurrent writer.",
        sourceWitnessSpecs: [
            { path: "src/composables/motion/useSpringPress.ts", needle: "const PRESS = springPreset(\"press\");" },
            { path: "src/composables/motion/useLiquidPress.ts", needle: "export function useLiquidPress(" },
            { path: "src/components/ui/button/Button.vue", needle: "const press = useSpringPress()" },
            { path: "src/components/custom/dock/DockControl.vue", needle: "const press = useLiquidPress({" },
        ],
        liveRoutes: ["/display/buttons", "/forms/toggle", "/dock/layers"],
        findingIds: ["RDA-007", "RDA-020"],
        interactionIds: [],
        conceptIds: [],
        canonicalWaves: ["BI.W-P025", "BI.W-P026", "BI.W-P027", "BI.W-P035", "BI.W-P063"],
        requiredStates: ["pointer", "keyboard", "touch", "disabled", "cancel", "leave/re-enter", "rapid repress", "focus-visible", "pre-hydration", "PRM"],
    },
    {
        id: "MOT-003",
        name: "Spatial morph and FLIP",
        decision: "collapse-to-engine-playback",
        model: "One measurement/identity/transform owner handles source→destination geometry, interruption, resize, source loss, and completion without local clock copies.",
        currentMechanism: "useElementMorph constructs the upstream ElementMorph math but owns another local rAF/easing loop; useBloomUp and Deck's goo path retain additional playback shapes.",
        productResolution: "Keep one public spatial-transition runner on declared upstream playback. Fold reveal, Dock CTA receive, bloom, and applicable Deck-private travel into configurations; delete duplicate measuring, timing, and transform writers.",
        sourceWitnessSpecs: [
            { path: "src/composables/motion/useElementMorph.ts", needle: "export function useElementMorph(" },
            { path: "src/composables/motion/useElementMorph.ts", needle: "raf = requestAnimationFrame(step);" },
            { path: "src/composables/motion/useBloomUp.ts", needle: "export function useBloomUp(" },
            { path: "src/composables/motion/useDockCtaReceive.ts", needle: "export function useDockCtaReceive(" },
        ],
        liveRoutes: ["/motion/reveal", "/dock/cta-receive", "/motion/deck"],
        findingIds: ["RDA-012", "RDA-019"],
        interactionIds: ["INT-006", "INT-018"],
        conceptIds: [],
        canonicalWaves: ["BI.W-P025", "BI.W-P026", "BI.W-P028", "BI.W-P041", "BI.W-P121"],
        requiredStates: ["source/destination", "interrupt", "reverse", "resize", "source removed", "focus/identity", "settle", "PRM", "teardown"],
    },
    {
        id: "MOT-004",
        name: "Enter, exit, reveal, and View Transition continuity",
        decision: "retain-native-where-semantic",
        model: "State changes remain immediate and correct; native View Transitions or CSS effects add continuity only when they have a single owner and preserve identity/focus through interruption.",
        currentMechanism: "A feature-detected View Transition wrapper coexists with CSS reveal and page-local transition recipes; source-shaped checks do not establish modal isolation or composed continuity. A second [data-scroll-reveal-once]/vScrollRevealOnce branch has only definition/capture/test witnesses, while the real demo section owner explicitly calls it public-but-unused and uses a separate private mechanism. In the live tempo Dialog, glass-reveal scales its panel by 13/7 but ModalOverlay's sheet-animate scrim remains 550 ms at both endpoints. In the live v-reveal replay, six rows borrow --spring-bouncy while retaining a fixed 500 ms clock and 80 ms local stagger step.",
        productResolution: "Use native transitions where they preserve identity on the exact supported build; otherwise update instantly. Consolidate enter/exit recipes and prove focus, final visibility, no flash, one writer, and any advertised tempo factor across panel, scrim, trigger, close/reverse, newly constructed JS motion, and named-spring consumer CSS. A replay mechanism has an explicit cancellation/reset lifecycle rather than being treated as evidence merely because nested rAF remounts the nodes. Delete the consumerless public once directive/CSS branch and its self-test; preserve shared once semantics only through actual owners rather than a future-consumer record.",
        sourceWitnessSpecs: [
            { path: "src/composables/motion/useViewTransition.ts", needle: "export function startViewTransition(" },
            { path: "src/composables/motion/useElementMorph.ts", needle: "export function lockSpatialTransition(" },
            { path: "demo/stories/motion/reveal.vue", needle: "requestAnimationFrame(() => requestAnimationFrame" },
            { path: "src/composables/motion/useStaggerReveal.ts", needle: "export const vScrollRevealOnce =" },
            { path: "demo/chassis/section/useSectionReveal.ts", needle: "// the public-but-unused `vScrollRevealOnce`, which stays untouched." },
            { path: "src/components/ui/_shared/ModalOverlay.vue", needle: "fade: \"sheet-animate\"," },
            { path: "src/styles/utilities/btn.css", needle: "data-[state=open]:duration-[var(--duration-panel)]" },
            { path: "demo/stories/motion/tempo.vue", needle: "blurb=\"ONE registered inheriting scalar co-scales EVERY spring clock" },
            { path: "demo/stories/motion/reveal.vue", needle: "animation: reveal-rise 0.5s var(--spring-bouncy, ease-out) both;" },
        ],
        liveRoutes: ["/motion/reveal", "/motion/tempo", "/containers/dialog", "/motion/deck"],
        findingIds: ["RDA-008", "RDA-012", "RDA-024", "RDA-025"],
        interactionIds: ["INT-008", "INT-018", "INT-020", "INT-021"],
        conceptIds: [],
        canonicalWaves: ["BI.W-P025", "BI.W-P028", "BI.W-P029", "BI.W-P031", "BI.W-P106"],
        requiredStates: ["enter", "exit", "interrupt", "native", "unsupported", "focus", "scroll", "final visibility", "PRM"],
    },
    {
        id: "MOT-005",
        name: "Scroll-linked motion and reader ownership",
        decision: "retain-semantic-dual-path",
        model: "A property either follows its owning scroller natively or uses one JS reader/physics path because its semantics need behavior CSS cannot express; the two never shadow one another.",
        currentMechanism: "The .scroll-progress demo uses a named native timeline and moved 0→0.669856 at 420/627 px; scrollReader provides one-shot coalescing, while useScrollScene deliberately adds settled physics for felt axes.",
        productResolution: "Keep native scroll/view timelines primary for direct compositor mappings. Keep one JS reader or spring only for semantic events/felt lag, with explicit scroller/property ownership, exact build probes, bfcache/boundary tests, and no native shadow.",
        sourceWitnessSpecs: [
            { path: "src/styles/scroll-driven.css", needle: "animation-timeline: var(--scroll-progress-timeline" },
            { path: "src/composables/motion/useScrollProgress.ts", needle: "export function useScrollProgress(" },
            { path: "src/composables/motion/scrollReader.ts", needle: "export function createScrollReader(" },
            { path: "src/composables/motion/useScrollScene.ts", needle: "export function useScrollScene(" },
        ],
        liveRoutes: ["/motion/scroll"],
        findingIds: [],
        interactionIds: ["INT-017"],
        conceptIds: [],
        canonicalWaves: ["BI.W-P025", "BI.W-P030", "BI.W-P031", "BI.W-P061"],
        requiredStates: ["0%", "100%", "nested scroller", "fast drag", "dynamic pause", "bfcache", "resize", "focus reveal", "native", "JS-only", "PRM"],
    },
    {
        id: "MOT-006",
        name: "Pointer velocity, drag, and direct manipulation",
        decision: "retain-bounded-gesture-authorities",
        model: "Direct manipulation owns pointer capture, normalized velocity, bounded projection, target identity, cancellation, and an equivalent keyboard/coarse path; decorative hover is separate.",
        currentMechanism: "useDragMorph composes upstream Draggable/SpringProgress, while useDragVelocity owns another drag-window rAF bridge and SortableList lacks a keyboard transaction or semantic list. EasingPicker's Bezier SVG has causal pointer capture but its two visible control points are absent from the focus/role tree, while the Steps arm's shared slider proves pointer/Arrow-key parity is already available in the same component. Drawer imperatively binds its aria-hidden 25px grip: a real drag moved explicit state 0.4→0.25 and also moved the story labelled no snap dragging from 1→0.5 because bottom/top omission silently synthesizes a ladder.",
        productResolution: "Unify normalized sampling and mapping where semantics match, keep event-scoped bridges only when the engine surface cannot express the property, and prove zero idle work, frame-rate independence, capture/cancel, target commitment, and input equivalence. Interactive SVG geometry exposes actual named value-bearing controls whose keyboard and pointer paths converge on the same state owner rather than crediting an image host as operability. Only a declared multi-detent Drawer exposes one named coarse-target slider-equivalent grip: Arrow/Home/End and pointer/touch share activeSnapPoint, focus, announcement, interruption, scrim/stage/paint, and PRM state. Ordinary fixed/content-sized Drawer synthesizes no ladder and renders no handle.",
        sourceWitnessSpecs: [
            { path: "src/composables/motion/useDragMorph.ts", needle: "export function useDragMorph" },
            { path: "src/composables/dom/useDragVelocity.ts", needle: "export function useDragVelocity(" },
            { path: "src/composables/dom/useDragVelocity.ts", needle: "rafId = requestAnimationFrame(frame);" },
            { path: "src/composables/sortable/useSortable.ts", needle: "onPointerdown: (e: PointerEvent) =>" },
            { path: "src/components/custom/easing/EasingPicker.vue", needle: "@pointerdown=\"onDown\"" },
            { path: "src/components/ui/drawer/composables/useDrawerSnap.ts", needle: "handle.addEventListener(\"pointerdown\", onPointerDown);" },
        ],
        liveRoutes: ["/forms/slider", "/navigation/carousel", "/data/sortable-list", "/motion/curve-gallery", "/containers/drawer"],
        findingIds: ["RDA-013", "RDA-027", "RDA-036"],
        interactionIds: ["INT-013", "INT-023", "INT-028"],
        conceptIds: [],
        canonicalWaves: ["BI.W-P007", "BI.W-P025", "BI.W-P026", "BI.W-P032", "BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P107", "BI.W-P120", "BI.W-P124"],
        requiredStates: ["60Hz", "120Hz", "pointer", "touch", "keyboard", "Arrow/Home/End detents", "capture", "cancel", "nearest target", "held still", "release", "fixed/no-handle", "PRM", "zero idle frames"],
    },
    {
        id: "MOT-007",
        name: "Text motion family",
        decision: "retain-distinct-semantic-mechanisms",
        model: "Typewriter, accessible visual splitting, numeric interpolation, and countup are distinct semantic mechanisms unified by typography, announcement, cancellation, and PRM—not forced onto one clock shape.",
        currentMechanism: "Typewriter uses cancellable semantic delays; SplitChars uses structural spans plus CSS; AnimatedDigit uses SmoothProgress; Countup is a numeric runner. Typewriter also defaults interactive=true and binds click-backspace to every glyph, but both current first-party instances disable that pointer-only behavior. Four old routes redirect to one direct family story, while the legacy consumer tally counts the Countup demo plus its unit test as two product consumers by filesystem existence alone.",
        productResolution: "Keep only distinct mechanisms justified by current runtime ownership and one direct family lab, then clean-break the four compatibility routes. Tests do not create demand, and a hidden default interaction is not a demonstrated product concept. Delete Typewriter's interactive prop and per-glyph click-backspace unless a coherent named editing/rewind control with keyboard/pointer parity is deliberately owned and directly demonstrated. Require grapheme safety, one AT representation, stable numeric geometry, cancellation/reset, declared announcement policy, immediate complete PRM state, and deletion of any public primitive lacking an external receipt or explicit owner decision plus causal first-party use.",
        sourceWitnessSpecs: [
            { path: "src/components/custom/typewriter/utils/timing.ts", needle: "export function sleep(" },
            { path: "src/components/custom/split-chars/SplitChars.vue", needle: ":aria-label=\"props.text\"" },
            { path: "src/components/custom/animated-digit/AnimatedDigit.vue", needle: "const animated = useAnimatedNumber" },
            { path: "src/composables/motion/useCountup.ts", needle: "export function useCountup(" },
        ],
        liveRoutes: ["/motion/text-motion"],
        findingIds: ["RDA-001", "RDA-022", "RDA-035"],
        interactionIds: ["INT-004"],
        conceptIds: ["animated-digit", "split-chars", "typewriter"],
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P023", "BI.W-P024", "BI.W-P025", "BI.W-P029", "BI.W-P031", "BI.W-P056", "BI.W-P057", "BI.W-P059", "BI.W-P062", "BI.W-P079", "BI.W-P080", "BI.W-P129"],
        requiredStates: ["type", "pause", "delete", "cancel", "reset", "rapid text change", "grapheme/ZWJ", "increment/decrement", "locale", "announcement", "PRM"],
    },
    {
        id: "MOT-008",
        name: "Deck motion composition",
        decision: "retain-behavior-delete-inert-motion-export",
        model: "Deck is an ordered presentation state machine with progress, direct/keyboard/touch navigation, focus policy, and announcements; visual travel composes shared/private effects without becoming Deck's identity.",
        currentMechanism: "Live Next navigation correctly updates pager identity, focus, and aria-live. A separate exported installDeckSpring/deckEase/DECK_SPRING facility is numerically contradictory, silently falls back, and is not consumed by that runtime behavior.",
        productResolution: "Retain Deck behavior and PagerDots composition. Delete the inert motion export and global Goo dependency; localize the sole barbell/filter showcase and run it on declared playback with interruption, unique IDs, rest cleanup, PRM, and attributed failure.",
        sourceWitnessSpecs: [
            { path: "src/components/custom/deck/composables/useDeck.ts", needle: "export function useDeck(" },
            { path: "src/components/custom/deck/composables/useDeckKeyboard.ts", needle: "export function handleDeckKey(" },
            { path: "src/components/custom/deck/composables/useDeckSpring.ts", needle: "export function installDeckSpring(): void" },
            { path: "demo/stories/motion/deck.vue", needle: "onMounted(() => installDeckSpring());" },
        ],
        liveRoutes: ["/motion/deck"],
        findingIds: ["RDA-015", "RDA-019"],
        interactionIds: ["INT-018"],
        conceptIds: ["deck"],
        canonicalWaves: ["BI.W-P025", "BI.W-P026", "BI.W-P029", "BI.W-P031", "BI.W-P061", "BI.W-P118", "BI.W-P121"],
        requiredStates: ["start", "middle", "end", "direct", "keyboard", "focused-control guard", "touch", "announcement", "interrupt/reverse", "two instances", "Safari filter", "PRM", "teardown"],
    },
    {
        id: "MOT-009",
        name: "Reduced-motion semantics",
        decision: "retain-one-policy-not-one-implementation",
        model: "Reduced motion removes nonessential travel and continuous work while preserving immediate causal state, focus, announcements, and essential direct manipulation.",
        currentMechanism: "CSS, useRAFLoop, keyframes playback, Typewriter, procedural renderers, and component-local probes each interpret prefers-reduced-motion; the current research run did not emulate or prove PRM. EasingPicker's exercised travelling-dot preview has no PRM branch at all and always schedules its fixed 1200 ms rAF after activation.",
        productResolution: "Define one product policy and reactive state projection across CSS and JS while allowing each mechanism to implement its appropriate snap/static path. Eliminate contradictory local policy, hidden final state, and continuous work under reduce. Authoring previews complete immediately with truthful final state under reduce and keep copy/edit/focus causality intact.",
        sourceWitnessSpecs: [
            { path: "src/composables/motion/useRAFLoop.ts", needle: "const REDUCED_MOTION_QUERY" },
            { path: "src/composables/motion/useSpring.ts", needle: "respectReducedMotion: options.respectReducedMotion !== false" },
            { path: "src/components/custom/typewriter/utils/timing.ts", needle: "export function prefersReducedMotion(): boolean" },
            { path: "src/styles/tokens/scheme-motion.css", needle: "@media (prefers-reduced-motion: reduce)" },
            { path: "src/components/custom/easing/composables/useEasingPicker.ts", needle: "function playTravel(): void {" },
        ],
        liveRoutes: ["/motion/springs", "/motion/reveal", "/motion/deck", "/motion/scroll", "/motion/text-motion", "/motion/curve-gallery"],
        findingIds: ["RDA-030"],
        interactionIds: ["INT-023"],
        conceptIds: [],
        canonicalWaves: ["BI.W-P022", "BI.W-P025", "BI.W-P027", "BI.W-P029", "BI.W-P030", "BI.W-P031", "BI.W-P054", "BI.W-P061", "BI.W-P124"],
        requiredStates: ["route", "overlay", "press", "selection", "deck", "scroll", "typing", "procedural", "focus causality", "zero continuous frames"],
    },
    {
        id: "MOT-010",
        name: "Animation channel truth and measured experience",
        decision: "replace-name-whitelist-with-sink-and-trace-evidence",
        model: "Animation cost belongs to the resolved property sink and actual browser pipeline: layout, paint, and composite are distinct channels, custom properties inherit their consumers, and a necessary layout reclaim is a measured semantic exception rather than a filename privilege.",
        currentMechanism: "proof:no-layout-animation calls a reflow-property-name filter compositor-only, permits paint and all custom properties by construction, and reports LOCKED while carrying four keyframe plus fifteen transition exceptions for layout properties such as width, height, inset, grid, margin, max-width, and left.",
        productResolution: "Delete the command and allowlists. Discover CSS keyframes/transitions, Vue Transition recipes, native timelines, and JavaScript writers in the whole current src+demo tree; resolve custom-property sinks; classify layout/paint/composite; and bind CLS, main-thread, layer, and frame evidence to exact Safari/Chrome scenarios. Keep a user-initiated layout reclaim only when its owner proves semantic necessity and budget.",
        sourceWitnessSpecs: [
            { path: "scripts/proof-no-layout-animation.mjs", needle: "const isReflowProp = (prop) => {" },
            { path: "scripts/proof-no-layout-animation.mjs", needle: "const TRANSITION_ALLOWLIST = [" },
            { path: "src/styles/dock/layer-group.css", needle: "width var(--duration-fast) var(--spring-snappy)," },
            { path: "src/components/ui/progress/ProgressSectioned.vue", needle: "transition: width var(--duration-slow, 0.45s) var(--spring-snappy, ease-out);" },
        ],
        liveRoutes: ["/dock/layers", "/data/timeline", "/feedback/progress", "/motion/scroll"],
        findingIds: ["RDA-023"],
        interactionIds: ["INT-007", "INT-017"],
        conceptIds: [],
        canonicalWaves: ["BI.W-P000", "BI.W-P014", "BI.W-P025", "BI.W-P029", "BI.W-P030", "BI.W-P031", "BI.W-P061", "BI.W-P130"],
        requiredStates: ["layout", "paint", "composite", "custom-property layout sink", "layer promotion", "layer demotion", "user-initiated reclaim", "continuous scroll", "rapid update", "PRM", "wide", "narrow", "Safari", "Chrome"],
    },
];

const rows = definitions.map((definition) => {
    const liveEvidence = definition.liveRoutes.map((route) => {
        const desktop = renderedRows.desktop.get(route);
        const mobile = renderedRows.mobile.get(route);
        if (!desktop || !mobile || desktop.redirected || mobile.redirected) throw new Error(`${definition.id}: route ${route} lacks direct desktop/mobile rendered evidence`);
        return {
            route,
            desktop: { sections: desktop.counts.section, visibleInteractives: desktop.counts.visibleInteractives, canvases: desktop.counts.canvases, svgs: desktop.counts.svgs, screenshotSha256: desktop.screenshot.sha256 },
            mobile: { sections: mobile.counts.section, visibleInteractives: mobile.counts.visibleInteractives, canvases: mobile.counts.canvases, svgs: mobile.counts.svgs, screenshotSha256: mobile.screenshot.sha256 },
        };
    });
    const findings = definition.findingIds.map((id) => {
        const row = findingById.get(id);
        if (!row) throw new Error(`${definition.id}: missing finding ${id}`);
        return { id, status: row.status, finding: row.finding };
    });
    const interactions = definition.interactionIds.map((id) => {
        const row = interactionById.get(id);
        if (!row) throw new Error(`${definition.id}: missing interaction ${id}`);
        return { id, route: row.route, mechanism: row.mechanism, observation: row.observation, values: row.values };
    });
    const consumerEvidence = definition.conceptIds.map((id) => {
        const row = consumerById.get(id);
        if (!row) throw new Error(`${definition.id}: missing component-consumer row ${id}`);
        return {
            conceptId: id,
            decision: row.decision,
            externalImportClauseCount: row.externalImportClauseCount,
            externalRepositories: row.externalRepositories,
            currentFirstPartyDemos: row.currentFirstPartyDemos,
            canonicalWaves: row.canonicalWaves,
        };
    });
    return {
        ...definition,
        sourceWitnessSpecs: undefined,
        sourceWitnesses: definition.sourceWitnessSpecs.map(witness),
        liveEvidence,
        findings,
        interactions,
        consumerEvidence,
        evidenceCredit: "FORMATION_RESEARCH_ONLY__NOT_EXECUTION__NOT_NATIVE_PI",
    };
});

const stripComments = (text) => text
    .replace(/<!--([\s\S]*?)-->/g, "")
    .replace(/\/\*([\s\S]*?)\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
const mechanisms = [
    ["raw-raf", /\brequestAnimationFrame\s*\(/g],
    ["raw-raf-cancel", /\bcancelAnimationFrame\s*\(/g],
    ["timeout", /\bsetTimeout\s*\(/g],
    ["timeout-clear", /\bclearTimeout\s*\(/g],
    ["interval", /\bsetInterval\s*\(/g],
    ["interval-clear", /\bclearInterval\s*\(/g],
    ["native-scroll-view-timeline", /(?:animation|scroll|view)-timeline\s*:/g],
    ["view-transition", /\bstartViewTransition\s*\(/g],
    ["web-animations", /\.animate\s*\(/g],
    ["engine-motion", /\b(?:SpringProgress|SmoothProgress|RAFPlayback|NumericAnimation|ElementMorph|Draggable)\b/g],
    ["css-keyframes", /@keyframes\s+[\w-]+/g],
    ["css-animation", /\banimation(?:-name|-timeline)?\s*:/g],
    ["css-transition", /\btransition(?:-property)?\s*:/g],
    ["vue-transition", /<Transition\b/g],
];
const treePaths = git("ls-tree", "-r", "--name-only", SOURCE_BASE, "--", "src", "demo").trim().split("\n").filter((path) => [".ts", ".vue", ".css", ".mjs"].includes(extname(path)));
const classifyOwners = (path) => {
    if (/typewriter|split-chars|animated-digit|useCountup|useAnimatedNumber|text-motion/.test(path)) return ["MOT-007"];
    if (/components\/(?:custom\/)?deck|stories\/motion\/deck/.test(path)) return ["MOT-008"];
    if (/scroll|sidebar|virtual|fading-scroll|infinite-scroll|ScrollChoreography|AppShell\.vue/.test(path)) return ["MOT-005"];
    if (/useElementMorph|useBloomUp|useLiquidReveal|useDockCtaReceive|useViewTransition|stories\/motion\/reveal/.test(path)) return ["MOT-003", "MOT-004"];
    if (/useSpringPress|useLiquidPress|components\/(?:ui|custom)\/(?:button|toggle)|DockControl/.test(path)) return ["MOT-002"];
    if (/useDrag|useLeadTrail|useGooMorph|useDockFisheye|sortable|carousel/.test(path)) return ["MOT-006"];
    if (/springPresets|curves|useSpring|spring|EasingPicker|curve-gallery|tempo/.test(path)) return ["MOT-001"];
    return ["MOT-000"];
};
const schedulerInventory = treePaths.flatMap((path) => {
    const code = stripComments(source(path));
    const hits = mechanisms.flatMap(([id, re]) => {
        re.lastIndex = 0;
        const count = [...code.matchAll(re)].length;
        return count ? [{ id, count }] : [];
    });
    if (hits.length === 0) return [];
    const channelMechanism = hits.some((item) => ["css-keyframes", "css-animation", "css-transition", "vue-transition", "native-scroll-view-timeline", "web-animations"].includes(item.id));
    return [{
        path,
        sourceBaseBlob: git("rev-parse", `${SOURCE_BASE}:${path}`).trim(),
        mechanisms: hits,
        auditOwners: [...new Set([...classifyOwners(path), ...(channelMechanism ? ["MOT-010"] : [])])],
    }];
});
const inventoryMechanismCounts = Object.fromEntries(mechanisms.map(([id]) => [id, schedulerInventory.reduce((sum, row) => sum + (row.mechanisms.find((item) => item.id === id)?.count ?? 0), 0)]));
const inventoryOwnerCounts = Object.fromEntries(Object.entries(Object.groupBy(schedulerInventory.flatMap((row) => row.auditOwners.map((owner) => ({ owner, path: row.path }))), (row) => row.owner)).map(([owner, values]) => [owner, new Set(values.map((row) => row.path)).size]));

const output = {
    schemaVersion: "1.0.0",
    sourceBase: SOURCE_BASE,
    generatedAt: "2026-07-14",
    status: "FORMATION_RESEARCH_ONLY",
    method: "First-principles motion/mechanism decisions reconciled against frozen-source reachability, exact local scheduler/engine discovery, component-consumer evidence, and bound direct desktop/mobile demos plus causal interactions.",
    governingPrinciple: "One temporal authority per property/episode, not one callback for the application.",
    rowCount: rows.length,
    sourceWitnessCount: rows.reduce((sum, row) => sum + row.sourceWitnesses.length, 0),
    directLiveRouteCount: new Set(rows.flatMap((row) => row.liveRoutes)).size,
    schedulerInventory: {
        note: "Descriptive source-base census, never a fixed-count oracle. Every discovered row has at least one audit owner; execution re-discovers the current tree.",
        fileCount: schedulerInventory.length,
        mechanismCounts: inventoryMechanismCounts,
        ownerFileCounts: inventoryOwnerCounts,
        rows: schedulerInventory,
    },
    rows,
};
writeFileSync(join(ROOT, "motion-first-principles-audit.json"), `${JSON.stringify(output, null, 2)}\n`);

const md = `# Motion from first principles and actual demos\n\n` +
    `**Status:** formation research only; no implementation, native Safari/Chrome π, release, or execution credit\n` +
    `**Bound source:** \`${SOURCE_BASE}\`\n` +
    `**Families:** ${output.rowCount}\n` +
    `**Exact source witnesses:** ${output.sourceWitnessCount}\n` +
    `**Distinct direct desktop/mobile demo routes:** ${output.directLiveRouteCount}\n` +
    `**Discovered scheduler/engine-bearing source files:** ${output.schedulerInventory.fileCount} (descriptive; re-discovered at execution)\n\n` +
    `## Governing decision\n\n` +
    `“One clock” is retained only as the property-level rule that one animated property or semantic episode has one temporal authority and one writer. It is rejected as a demand for one application-wide callback. Managed spring playback, a continuous procedural frame loop, a native scroll timeline, a one-shot read coalescer, and a cancellable typewriter delay solve different problems. The product invariant is explicit ownership, non-overlap, pause/interruption/settle semantics, and complete teardown—not renderer/scheduler uniformity.\n\n` +
    table(["ID", "family", "decision", "current mechanism", "first-principles resolution", "actual direct demos", "findings", "owners"], rows.map((row) => [
        row.id,
        row.name,
        row.decision,
        row.currentMechanism,
        row.productResolution,
        row.liveRoutes.join(", "),
        row.findingIds.join(", ") || "no current finding; execution evidence remains pending",
        row.canonicalWaves.join(", "),
    ])) + `\n\n` +
    `## Scheduler census\n\n` +
    `This is a frozen-source discovery aid, not a roster gate. Counts describe the bound tree and must change when code is deleted, moved, or reclassified; the current verifier rediscovers paths and rejects an unowned scheduler rather than demanding these numbers.\n\n` +
    table(["mechanism", "source occurrences"], Object.entries(output.schedulerInventory.mechanismCounts).map(([id, count]) => [id, count])) + `\n\n` +
    rows.map((row) => `## ${row.id} — ${row.name}\n\n` +
        `**Product model:** ${row.model}\n\n` +
        `**Resolution:** ${row.productResolution}\n\n` +
        `**Required live states:** ${row.requiredStates.join(", ")}\n\n` +
        `**Bound source witnesses:**\n\n${row.sourceWitnesses.map((item) => `- \`${item.path}:${item.line}\` · blob \`${item.sourceBaseBlob}\` · line sha256 \`${item.lineSha256}\` · ${item.excerpt}`).join("\n")}\n\n` +
        `**Actual direct-route evidence:**\n\n${row.liveEvidence.map((item) => `- \`${item.route}\`: desktop screenshot \`${item.desktop.screenshotSha256}\`, mobile screenshot \`${item.mobile.screenshotSha256}\`; visible interactives ${item.desktop.visibleInteractives}/${item.mobile.visibleInteractives}.`).join("\n")}\n\n` +
        (row.interactions.length ? `**Exercised causal evidence:**\n\n${row.interactions.map((item) => `- ${item.id}: ${item.observation}`).join("\n")}\n\n` : "") +
        (row.consumerEvidence.length ? `**Component/consumer evidence:**\n\n${row.consumerEvidence.map((item) => `- ${item.conceptId}: ${item.decision}; ${item.externalImportClauseCount} tracked external import clauses; first-party demos ${item.currentFirstPartyDemos.join(", ") || "none"}.`).join("\n")}\n\n` : "")
    ).join("") +
    `## Credit boundary\n\nThe in-app browser observations establish current research facts only. They do not substitute for native Safari/Chrome builds, applicable π matrices, PRM emulation, performance/resource instrumentation, implementation, release, publication, or Atlas FINAL.\n`;
writeFileSync(join(ROOT, "MOTION-FIRST-PRINCIPLES-AUDIT.md"), md);

console.log(JSON.stringify({
    ok: true,
    rows: output.rowCount,
    witnesses: output.sourceWitnessCount,
    directRoutes: output.directLiveRouteCount,
    schedulerFiles: output.schedulerInventory.fileCount,
    mechanismCounts: output.schedulerInventory.mechanismCounts,
}, null, 2));
