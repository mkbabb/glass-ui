import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import ts from "typescript";

import { SOURCE_BASE } from "./waves.registry.mjs";

const ROOT = dirname(new URL(import.meta.url).pathname);
const REPO = resolve(ROOT, "../../../..");
const sha = (value) => createHash("sha256").update(value).digest("hex");
const git = (...args) => execFileSync("git", ["-C", REPO, ...args], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
});
const source = (path) => git("show", `${SOURCE_BASE}:${path}`);
const sourceBlob = (path) => git("rev-parse", `${SOURCE_BASE}:${path}`).trim();
const uniq = (items) => [...new Set(items)];
const countBy = (items, key) => Object.fromEntries(
    Object.entries(Object.groupBy(items, key))
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, values]) => [name, values.length]),
);
const table = (headers, rows) => [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell).replaceAll("|", "\\|").replaceAll("\n", " ")).join(" | ")} |`),
].join("\n");

const EVENT_NAMES = [
    "click", "dblclick", "pointerdown", "mousedown", "touchstart",
    "keydown", "keyup", "keypress",
];
const EVENT_RE = new RegExp(
    `(?:@|v-on:)(${EVENT_NAMES.join("|")})((?:\\.[\\w-]+)*)(?:\\s*=\\s*(?:"([^"]*)"|'([^']*)'))?`,
    "g",
);
const INTRINSIC_CONTROLS = new Set(["button", "input", "select", "textarea", "summary", "option"]);
const TYPED_CONTROL_COMPONENTS = new Set(["Button", "DockControl", "Card"]);

const mask = (value) => value.replace(/[^\n]/g, " ");

// A regex ending at the first `>` truncates valid Vue bindings such as
// `@keydown="(event) => act(event)"`. This scanner ends only at an unquoted `>`
// and masks script/style/comment regions without changing source offsets.
const scanOpeningTags = (text) => {
    let templateText = text;
    for (const regex of [
        /<script\b[\s\S]*?<\/script\s*>/gi,
        /<style\b[\s\S]*?<\/style\s*>/gi,
        /<!--[\s\S]*?-->/g,
    ]) templateText = templateText.replace(regex, mask);

    const tags = [];
    for (let index = 0; index < templateText.length; index += 1) {
        if (templateText[index] !== "<" || !/[A-Za-z]/.test(templateText[index + 1] ?? "")) continue;
        let cursor = index + 1;
        while (/[\w.-]/.test(templateText[cursor] ?? "")) cursor += 1;
        const tag = templateText.slice(index + 1, cursor);
        let quote = null;
        let end = cursor;
        for (; end < templateText.length; end += 1) {
            const char = templateText[end];
            if (quote) {
                if (char === quote && templateText[end - 1] !== "\\") quote = null;
            } else if (char === "\"" || char === "'") quote = char;
            else if (char === ">") break;
        }
        if (end >= templateText.length) break;
        tags.push({
            offset: index,
            tag,
            attrs: templateText.slice(cursor, end),
            raw: text.slice(index, end + 1),
        });
        index = end;
    }
    return tags;
};

const attributeValue = (attrs, name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = attrs.match(new RegExp(`(?:^|\\s)(?:${escaped}|:${escaped}|v-bind:${escaped})\\s*=\\s*(?:"([^"]*)"|'([^']*)')`));
    return match ? (match[1] ?? match[2]) : null;
};

const vueFiles = git("ls-tree", "-r", "--name-only", SOURCE_BASE, "--", "src", "demo")
    .trim()
    .split("\n")
    .filter((path) => path.endsWith(".vue"));

const rawRows = vueFiles.flatMap((path) => {
    const text = source(path);
    const lines = text.split("\n");
    return scanOpeningTags(text).flatMap((opening) => {
        const events = [...opening.attrs.matchAll(EVENT_RE)].map((match) => ({
            name: match[1],
            modifiers: match[2].split(".").filter(Boolean),
            expression: match[3] ?? match[4] ?? null,
        }));
        if (events.length === 0) return [];
        const line = text.slice(0, opening.offset).split("\n").length;
        const role = attributeValue(opening.attrs, "role");
        const tabindex = attributeValue(opening.attrs, "tabindex");
        const ariaAttributes = uniq([...opening.attrs.matchAll(/(?:^|\s)(?::|v-bind:)?(aria-[\w-]+)(?:\s*=|\s|$)/g)].map((match) => match[1])).sort();
        return [{
            path,
            sourceBaseBlob: sourceBlob(path),
            line,
            lineText: lines[line - 1].trim(),
            lineSha256: sha(lines[line - 1]),
            tag: opening.tag,
            events,
            role,
            tabindex,
            ariaAttributes,
            hasActivation: events.some((event) => ["click", "dblclick"].includes(event.name) && event.expression !== null),
            hasDirectManipulation: events.some((event) => ["pointerdown", "mousedown", "touchstart"].includes(event.name) && event.expression !== null),
            hasKeyboardHandler: events.some((event) => ["keydown", "keyup", "keypress"].includes(event.name) && event.expression !== null),
            propagationOnly: events.every((event) => event.expression === null),
            openingTag: opening.raw.replace(/\s+/g, " ").trim(),
            openingTagSha256: sha(opening.raw),
        }];
    });
}).sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line || a.tag.localeCompare(b.tag));

// Vue template directives are only one authoring surface. Parse every TS/JS
// source unit (including each Vue <script>) to discover literal imperative DOM
// listeners and intrinsic render-function handlers without a file roster. This
// catches multiline addEventListener calls and h("button", { onClick }) alike.
const IMPERATIVE_EVENTS = new Set([
    "click", "dblclick", "pointerdown", "mousedown", "touchstart",
    "keydown", "keyup", "keypress", "contextmenu",
]);
const codeFiles = git("ls-tree", "-r", "--name-only", SOURCE_BASE, "--", "src", "demo")
    .trim()
    .split("\n")
    .filter((path) => /\.(?:[cm]?[jt]sx?|vue)$/.test(path));

const scriptKind = (path) => {
    if (/\.tsx$/.test(path)) return ts.ScriptKind.TSX;
    if (/\.jsx$/.test(path)) return ts.ScriptKind.JSX;
    if (/\.[cm]?js$/.test(path)) return ts.ScriptKind.JS;
    return ts.ScriptKind.TS;
};
const scriptUnits = (path, text) => {
    if (!path.endsWith(".vue")) return [{ text, offset: 0, kind: scriptKind(path) }];
    return [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)].map((match) => ({
        text: match[1],
        offset: match.index + match[0].indexOf(match[1]),
        kind: /\blang\s*=\s*["']tsx["']/.test(match[0]) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    }));
};
const propertyName = (node, sourceFile) => {
    if (!node) return null;
    if (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) return node.text;
    return node.getText(sourceFile);
};

const imperativeRawRows = [];
for (const path of codeFiles) {
    const text = source(path);
    const lines = text.split("\n");
    for (const unit of scriptUnits(path, text)) {
        const sourceFile = ts.createSourceFile(path, unit.text, ts.ScriptTarget.Latest, true, unit.kind);
        const addRow = ({ node, occurrenceNode = node, syntaxKind, target, tag = null, event, handler }) => {
            const start = unit.offset + occurrenceNode.getStart(sourceFile);
            const end = unit.offset + occurrenceNode.end;
            const line = text.slice(0, start).split("\n").length;
            const syntaxText = text.slice(start, end);
            imperativeRawRows.push({
                path,
                sourceBaseBlob: sourceBlob(path),
                line,
                lineText: lines[line - 1].trim(),
                lineSha256: sha(lines[line - 1]),
                syntaxKind,
                target,
                tag,
                event,
                handler,
                syntaxText: syntaxText.replace(/\s+/g, " ").trim(),
                syntaxSha256: sha(syntaxText),
            });
        };
        const visit = (node) => {
            if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "addEventListener") {
                const eventArg = node.arguments[0];
                if (eventArg && ts.isStringLiteralLike(eventArg) && IMPERATIVE_EVENTS.has(eventArg.text)) {
                    addRow({
                        node,
                        syntaxKind: "IMPERATIVE_DOM_LISTENER",
                        target: node.expression.expression.getText(sourceFile),
                        event: eventArg.text,
                        handler: node.arguments[1]?.getText(sourceFile) ?? null,
                    });
                }
            }
            if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "h") {
                const [tagArg, propsArg] = node.arguments;
                if (tagArg && ts.isStringLiteralLike(tagArg) && propsArg && ts.isObjectLiteralExpression(propsArg)) {
                    for (const prop of propsArg.properties) {
                        const name = propertyName(prop.name, sourceFile);
                        if (!name || !/^on[A-Z]/.test(name)) continue;
                        const event = name.slice(2).toLowerCase();
                        if (!IMPERATIVE_EVENTS.has(event)) continue;
                        const handler = ts.isPropertyAssignment(prop) ? prop.initializer.getText(sourceFile) : prop.getText(sourceFile);
                        addRow({
                            node,
                            occurrenceNode: prop,
                            syntaxKind: "INTRINSIC_RENDER_FUNCTION_HANDLER",
                            target: `h(${JSON.stringify(tagArg.text)})`,
                            tag: tagArg.text,
                            event,
                            handler,
                        });
                    }
                }
            }
            ts.forEachChild(node, visit);
        };
        visit(sourceFile);
    }
}
imperativeRawRows.sort((a, b) => a.path.localeCompare(b.path) || a.line - b.line || a.event.localeCompare(b.event));

const imperativeDisposition = ({ path, event, syntaxKind, tag }) => {
    const shared = {
        status: "REVIEWED_ENROLLMENT",
        findingIds: [],
        interactionIds: [],
        ownerWaves: ["BI.W-P062"],
    };
    if (path === "src/components/custom/aurora/composables/useCursorInteraction.ts") return {
        ...shared,
        disposition: "PARALLEL_SEMANTIC_AUTHORING_ALTERNATIVE_ENROLLED",
        ownerWaves: ["BI.W-P046", "BI.W-P059", "BI.W-P062"],
        basis: "The stage gesture supplies nonessential swirl plus add/remove/move shortcuts, while the directly reachable Nuclei layer exposes native Add/Remove commands and semantic X/Y sliders over the same config. The canvas listener receives no independent semantic credit.",
        acceptance: "Every nucleus CRUD/position result remains reachable through named keyboard/touch/pointer controls with identical bounds and state; stage drag/swirl is supplemental, PRM-safe visual response. Removing the Nuclei alternative, diverging its config writer, or making a required operation gesture-only turns RED.",
    };
    if (path === "src/components/custom/constellation/composables/useConstellation.ts") return {
        status: "CURRENT_RED",
        disposition: "INERT_DECORATIVE_POINTER_ACTION_REPAIR_REQUIRED",
        findingIds: ["RDA-016"],
        interactionIds: ["INT-016"],
        ownerWaves: ["BI.W-P048", "BI.W-P059", "BI.W-P061", "BI.W-P062"],
        basis: "The public host is described and aria-hidden as decorative while its story gives it cursor:pointer and instructs click-to-warp. The exercised click produced no focal mark because drawOverlay is inert in the GPU fork; a decorative label cannot excuse an advertised action.",
        acceptance: "Restore one proportionate Canvas2D owner and decide the action honestly: either delete warpOnClick, its pointer affordance, and interactive prose, or expose a causal named keyboard/touch/pointer command with visible and semantic state through the same warp owner. Decorative instances have no activation listener.",
    };
    if (path === "src/components/custom/deck/composables/useDeckKeyboard.ts") return {
        ...shared,
        disposition: "SEMANTIC_REGION_KEYBOARD_DELEGATION_ENROLLED",
        ownerWaves: ["BI.W-P062", "BI.W-P121"],
        basis: "The listener binds the Deck's named focus region and routes declared navigation keys into the same page owner used by native Next/Previous commands; it is not an unnamed document shortcut.",
        acceptance: "The focused Deck region has a contextual name, orientation-correct keys, editable-target exclusions, current page/live announcement, focus stability, and the identical bounded navigation payload as pointer/touch commands.",
    };
    if (path === "src/components/custom/dock/composables/useDockHold.ts") return {
        ...shared,
        disposition: "NATIVE_DESCENDANT_GESTURE_LIFECYCLE_ENROLLED",
        ownerWaves: ["BI.W-P033", "BI.W-P042", "BI.W-P062"],
        basis: "Pointer and touch listeners observe a gesture already owned by the resolved native Dock descendant solely to hold the surrounding Dock open; the acquired guard unifies both inputs and creates no second activation command.",
        acceptance: "Every bound host is independently named and operable, hold acquisition cannot double-count synthesized touch/pointer events, release/cancel/unmount clears exactly once, and the visual held state never substitutes for command activation or keyboard focus.",
    };
    if (["src/components/custom/dock/composables/useDockPopover.ts", "src/components/custom/dock/composables/useDockState.ts"].includes(path)) return {
        ...shared,
        disposition: "DOCUMENT_OUTSIDE_DISMISSAL_OBSERVER_ENROLLED",
        ownerWaves: ["BI.W-P037", "BI.W-P040", "BI.W-P042", "BI.W-P062"],
        basis: "The document capture listener observes outside pointer intent for an already open Dock overlay and performs no local activation. Its semantic contract is dismissal topology, not pointer-control credit.",
        acceptance: "Inside anchors, surfaces, nested portals, and teleported descendants never dismiss; outside pointer and Escape close through one stack owner, restore focus correctly, arm only while open, and remove every listener/frame on close or unmount.",
    };
    if (path === "src/components/ui/drawer/composables/useDrawerSnap.ts") return {
        status: "CURRENT_RED",
        disposition: "ARIA_HIDDEN_POINTER_ONLY_DETENT_REPAIR_REQUIRED",
        findingIds: ["RDA-036"],
        interactionIds: ["INT-028"],
        ownerWaves: ["BI.W-P032", "BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P107"],
        basis: "A real drag changed explicit Drawer state 0.4→0.25 and the supposedly fixed Drawer 1→0.5, but the only detent host is a 25px aria-hidden div without role, value, name, focus, or keyboard path; mode defaulting also contradicts the direct story.",
        acceptance: "Only declared multi-detent Drawers render one coarse-target named slider-equivalent grip. Arrow/Home/End and pointer/touch share activeSnapPoint, paint/stage/scrim, announcement, focus, interruption, and PRM state; ordinary fixed Drawer renders no handle or implicit ladder.",
    };
    if (path === "src/components/ui/slider/Slider.vue") return {
        ...shared,
        disposition: "SEMANTIC_SLIDER_TOUCH_ARBITRATION_ENROLLED",
        ownerWaves: ["BI.W-P032", "BI.W-P062", "BI.W-P093"],
        basis: "The imperative touchstart belongs to the same rendered semantic Slider root and arbitrates native touch gesture ownership; intrinsic role/value/focus/keyboard descendants remain the product controls.",
        acceptance: "Touch arbitration cannot scroll-lock outside the active gesture, pointer/touch/keyboard update the same bounded values, range-thumb identity and focus remain stable, disabled state blocks every input, and cleanup leaves no listener or capture.",
    };
    if (["src/composables/dom/useDragVelocity.ts", "src/composables/motion/useDragMorph.ts"].includes(path)) return {
        ...shared,
        disposition: "CONSUMER_BOUND_DIRECT_MANIPULATION_INFRASTRUCTURE_ENROLLED",
        ownerWaves: ["BI.W-P032", "BI.W-P062"],
        basis: "The composable attaches mechanics to a consumer-supplied host and cannot define that host's product semantics. Runtime reachability must enroll each consumer rather than crediting this shared listener once globally.",
        acceptance: "Every current consumer resolves a named semantic control/composite or an explicitly nonessential visual response, provides input-equivalent state ownership and cancellation, performs zero idle work, and is rediscovered automatically when consumers move or change.",
    };
    if (path === "src/composables/dom/useTouchGate.ts") return {
        ...shared,
        disposition: "GLOBAL_INPUT_MODALITY_OBSERVER_NOT_A_CONTROL",
        ownerWaves: ["BI.W-P032", "BI.W-P062"],
        basis: "The document touchstart listener only records active input modality for arbitration and performs no command, selection, or direct manipulation. It receives no operability credit.",
        acceptance: "The shared observer is singleton, passive, lifecycle-bounded, never suppresses native input, cannot become a touch-only product path, and every actual consumer remains independently enrolled through its composed semantic host.",
    };
    if (path === "src/composables/sidebar/useClickDelegate.ts") return {
        ...shared,
        disposition: "NATIVE_DESCENDANT_CLICK_DELEGATION_ENROLLED",
        ownerWaves: ["BI.W-P030", "BI.W-P059", "BI.W-P062"],
        basis: "The container listener delegates current data-scroll-target actions from native button descendants in the direct ToC story; the container earns no command role and target semantics remain independently discoverable.",
        acceptance: "Every delegated target is a named native link/button with keyboard/pointer parity, current state and focus; missing targets do not suppress defaults, moved descendants stay discovered, and delegation never captures an unrelated nested command.",
    };
    if (path === "src/composables/sidebar/useSidebarFollow.ts") return {
        ...shared,
        disposition: "MANUAL_SCROLL_OVERRIDE_OBSERVER_NOT_A_CONTROL",
        ownerWaves: ["BI.W-P030", "BI.W-P062"],
        basis: "Touch, pointer, and key listeners only suspend automatic sidebar-follow when the user manually scrolls the already semantic navigation region. They do not activate a ToC item or receive control credit.",
        acceptance: "Manual wheel/touch/pointer/keyboard scrolling immediately wins over follow, native button/link activation remains untouched, editable and nested targets are respected, programmatic feedback does not self-cancel, and every listener/rAF tears down.",
    };
    if (syntaxKind === "INTRINSIC_RENDER_FUNCTION_HANDLER" && tag === "button" && path === "demo/stories/containers/spa-view.vue") return {
        ...shared,
        disposition: "NATIVE_RENDER_FUNCTION_CONTROL_ENROLLED",
        ownerWaves: ["BI.W-P059", "BI.W-P062", "BI.W-P113"],
        basis: "The render-function handler is attached directly to an intrinsic button with visible text and a causal counter, proving that template-only discovery would miss a valid current control.",
        acceptance: "The native button retains its contextual name, focus, keyboard/touch/pointer activation, causal count readback, cached-return identity, and PRM-safe view switch after SpaView is re-homed into the demo shell.",
    };
    throw new Error(`${path}:${event}:${syntaxKind}: missing imperative semantic disposition`);
};

const imperativeRows = imperativeRawRows.map((row, index) => ({
    id: `IOH-${String(index + 1).padStart(3, "0")}`,
    ...row,
    ...imperativeDisposition(row),
}));

const disposition = ({ path, tag, events, role, tabindex, propagationOnly }) => {
    const eventExpressions = events.map((event) => event.expression).filter(Boolean).join("\n");
    const shared = {
        status: "REVIEWED_ENROLLMENT",
        findingIds: [],
        interactionIds: [],
        ownerWaves: ["BI.W-P062"],
    };

    if (INTRINSIC_CONTROLS.has(tag)) return {
        ...shared,
        disposition: "NATIVE_CONTROL_ENROLLED",
        basis: "The event host is an intrinsic HTML control. It remains enrolled for rendered name, role/state, focus, target, disabled, and causal behavior; intrinsic markup alone is not blanket PASS.",
        acceptance: "The composed control has the native role and form/command behavior appropriate to its state, a contextual accessible name, visible focus, keyboard/pointer parity, and a causal observable when activated.",
    };
    if (TYPED_CONTROL_COMPONENTS.has(tag)) return {
        ...shared,
        disposition: "TYPED_CONTROL_COMPONENT_ENROLLED",
        basis: `${tag} is a typed control facade in this source tree; current event-bearing Card uses explicitly render as button. Runtime resolution, not the component spelling, decides semantics.`,
        acceptance: "The resolved host is a native button/link/form control or an exact APG composite descendant with correct name/state/focus/keyboard behavior; changing `as`/`asChild` to a generic host without equivalent semantics turns RED.",
    };
    if (propagationOnly) return {
        ...shared,
        disposition: "PROPAGATION_ONLY_NOT_AN_OPERABLE_SURFACE",
        ownerWaves: ["BI.W-P116"],
        basis: "The valueless Vue event directive only stops propagation around a nested row action; it performs no activation and is not credited as a control.",
        acceptance: "The nested row action remains independently semantic and operable, and propagation suppression cannot swallow its name, focus, activation, or error state.",
    };

    if (path === "demo/stories/data/timeline.vue" && tag === "li") return {
        status: "CURRENT_RED",
        disposition: "POINTER_ONLY_ACTIVATION_REPAIR_REQUIRED",
        findingIds: ["RDA-033"], interactionIds: ["INT-026"],
        ownerWaves: ["BI.W-P059", "BI.W-P062", "BI.W-P120"],
        basis: "The rendered event row changed the active callout on click while the six choices had no role, tabindex, keyboard path, focus, or selected/current state.",
        acceptance: "Each chronological choice is a named native button or an exact single-selection composite item with current state, roving/direct focus, Arrow/Home/End plus activation, visible focus, and the same jumpTo owner as pointer input.",
    };
    if ((path === "demo/stories/substrates/blob.vue" && tag === "Blob") || (path === "src/components/custom/blob/Blob.vue" && tag === "div")) return {
        status: "CURRENT_RED",
        disposition: "POINTER_ONLY_ACTIVATION_REPAIR_REQUIRED",
        findingIds: ["RDA-031"], interactionIds: ["INT-024"],
        ownerWaves: ["BI.W-P047", "BI.W-P059", "BI.W-P062"],
        basis: "A real click on the SDF hit surface incremented the visible clicks counter 0→1, but the causal surface has no role, name, tabindex, keyboard behavior, or focus state.",
        acceptance: "An interactive Blob exposes one named semantic press surface whose native/keyboard activation calls the same bounded pulse/click owner as pointer/touch; decorative and aria-hidden Blob instances expose no operable hit surface.",
    };
    if (path === "src/components/custom/controls/DarkModeToggle.vue" && tag === "component") return {
        status: "CURRENT_RED",
        disposition: "FALSE_AFFORDANCE_BRANCH_REPAIR_REQUIRED",
        findingIds: ["RDA-034"], interactionIds: ["INT-027"],
        ownerWaves: ["BI.W-P059", "BI.W-P062", "BI.W-P082"],
        basis: "The live passive branch resolves to a 36px div with cursor:pointer and interactive styling, but it has no role/focus semantics and its click intentionally performs no action.",
        acceptance: "DarkModeToggle remains one native theme command. Delete the consumerless passive/no-op branch; any retained decorative icon is separately static, aria-hidden where appropriate, has no pointer/focus affordance, and owns no click/pointer handler.",
    };
    if (path === "src/components/custom/easing/EasingPicker.vue" && tag === "svg") return {
        status: "CURRENT_RED",
        disposition: "POINTER_ONLY_DESCENDANTS_REPAIR_REQUIRED",
        findingIds: ["RDA-027"], interactionIds: ["INT-023"],
        ownerWaves: ["BI.W-P059", "BI.W-P061", "BI.W-P062", "BI.W-P124"],
        basis: "The image host receives causal pointer drag for two Bezier handles, but neither handle is a named/focusable value-bearing control.",
        acceptance: "The plot description remains noninteractive while each control point is a semantic descendant with name, bounded x/y values, focus, keyboard adjustment, visible focus, and pointer/keyboard parity through one setHandle owner.",
    };
    if (path === "src/components/custom/sortable-list/SortableItem.vue" && tag === "component") return {
        status: "CURRENT_RED",
        disposition: "POINTER_ONLY_REORDER_REPAIR_REQUIRED",
        findingIds: ["RDA-013"], interactionIds: ["INT-013"],
        ownerWaves: ["BI.W-P007", "BI.W-P062"],
        basis: "The public reorder engine currently begins from pointerdown on a polymorphic item and has no equivalent keyboard transaction, native list/item contract, or adequate default handle.",
        acceptance: "Semantic listitems and named native button handles share one lift/move/drop/cancel transaction across keyboard, pointer, and touch, retain item focus identity, announce changes, and meet the coarse target floor.",
    };
    if (path === "src/components/custom/typewriter/TypewriterText.vue" && tag === "span") return {
        status: "CURRENT_RED",
        disposition: "LATENT_POINTER_ONLY_DEFAULT_REPAIR_REQUIRED",
        findingIds: ["RDA-035"], interactionIds: [],
        ownerWaves: ["BI.W-P059", "BI.W-P062", "BI.W-P080"],
        basis: "Interactive character backspace defaults true and every glyph owns click activation, but both first-party Typewriter instances explicitly disable it; the pointer-only public default is hidden rather than demonstrated or justified.",
        acceptance: "Delete per-character click-backspace and the interactive prop unless a current product contract justifies a coherent text-editing interaction. Any retained rewind/edit action is a named semantic control with one focus model and causal keyboard/pointer parity, demonstrated at the direct route.",
    };
    if (path === "src/components/ui/data-table/DataTable.vue" && ["div", "TableHead", "TableRow"].includes(tag)) return {
        status: "CURRENT_RED",
        disposition: "POINTER_ONLY_TABLE_BEHAVIOR_REPAIR_REQUIRED",
        findingIds: ["RDA-032"], interactionIds: ["INT-025"],
        ownerWaves: ["BI.W-P059", "BI.W-P062", "BI.W-P116"],
        basis: "The live sortable header causally changed row order while focus stayed on body and every th lacked aria-sort; card and table rows similarly emit select only from click, while the story binds no visible selection state.",
        acceptance: "Sortable headers expose native button commands within th plus aria-sort and keyboard/focus behavior. Selectable rows/cards have one declared selection/navigation pattern, current state, and keyboard/pointer parity; nonselectable rows have no cursor/click affordance. The story visibly exercises sort and select in wide and card projections.",
    };

    if (path === "src/components/custom/header-ribbon/HeaderRibbon.vue" && tag === "div") return {
        ...shared,
        disposition: "SEMANTIC_DESCENDANT_DELEGATION_ENROLLED",
        ownerWaves: ["BI.W-P062", "BI.W-P114"],
        basis: "The wrapper listens to bubbled activation, while every current first-party anchor slot resolves to a named DockControl button. The wrapper receives no independent control credit.",
        acceptance: "Every reachable anchor slot contains one named native command that toggles the same pinned state by keyboard, touch, and pointer; an empty/generic anchor or hover-only reveal turns RED.",
    };
    if (path === "src/components/custom/dock/GlassDock.vue") return {
        ...shared,
        disposition: "STRUCTURAL_COMPOSITE_EVENT_ENROLLED",
        ownerWaves: ["BI.W-P033", "BI.W-P034", "BI.W-P035", "BI.W-P036", "BI.W-P037", "BI.W-P038", "BI.W-P039", "BI.W-P040", "BI.W-P041", "BI.W-P042", "BI.W-P062"],
        basis: "Root capture/touch listeners protect descendant identity and the summary container delegates expansion to slotted native controls; neither generic div is credited as a standalone command.",
        acceptance: "Every collapsed/expanded action remains a named operable descendant; focus approach, keyboard activation, touch, blank-space capture, inert faces, and morph swaps preserve the same control identity without an unnamed generic command.",
    };
    if (path === "src/components/custom/dock/DockStack.vue" && tag === "div") return {
        ...shared,
        disposition: "STRUCTURAL_ESCAPE_LISTENER_ENROLLED",
        ownerWaves: ["BI.W-P037", "BI.W-P040", "BI.W-P042", "BI.W-P062"],
        basis: "The popover fan div only owns Escape dismissal around semantic descendant DockControls; it is not an activation target.",
        acceptance: "The fan retains named focusable descendants, an explicit composite role/label where applicable, Escape restoration, focus containment, and no pointer-only item path.",
    };
    if (path === "src/components/custom/dock/DockLayerGroup.vue" && tag === "div") return {
        ...shared,
        disposition: "SEMANTIC_COMPOSITE_HOST_ENROLLED",
        ownerWaves: ["BI.W-P035", "BI.W-P037", "BI.W-P042", "BI.W-P062"],
        basis: "The tablist host delegates arrow-key behavior to its selected, named descendant tabs and exposes no independent activation.",
        acceptance: "The resolved tablist and tabs maintain roving focus, selected state, orientation, activation policy, visible focus, and inactive-face exclusion across every Dock layer state.",
    };
    if (path === "src/components/custom/tabs/SegmentedTabs.vue" && tag === "div") return {
        ...shared,
        disposition: "SEMANTIC_COMPOSITE_HOST_ENROLLED",
        ownerWaves: ["BI.W-P062", "BI.W-P092"],
        basis: "The host is a tablist/group coordinator; operability resides in its reachable semantic descendants and shared strip handlers.",
        acceptance: "Every rendered mode resolves the correct group/tablist plus named controls, roving focus/selection, orientation keys, pointer drag only where declared, and no generic-host activation substitution.",
    };
    if (path === "src/components/custom/pager-dots/PagerDots.vue" && tag === "div") return {
        ...shared,
        disposition: "SEMANTIC_COMPOSITE_HOST_ENROLLED",
        ownerWaves: ["BI.W-P062", "BI.W-P118"],
        basis: "The named group/tablist host coordinates current native button dots with roving keyboard behavior.",
        acceptance: "Every dot remains a named native command/tab with current/selected state, orientation-correct travel, visible focus, dynamic-count repair, and touch geometry.",
    };
    if (path === "src/components/custom/timeline/ScrubberTimeline.vue" && tag === "div") return {
        ...shared,
        disposition: "SEMANTIC_DIRECT_MANIPULATION_HOST_ENROLLED",
        ownerWaves: ["BI.W-P062", "BI.W-P120"],
        basis: "The same host declares role=slider, tabindex=0, name/value bounds, pointer capture, and keyboard handling.",
        acceptance: "Pointer and keyboard update the same bounded model value, expose current/min/max/text, preserve focus, and honor disabled/PRM/touch behavior.",
    };
    if (path === "src/components/ui/carousel/Carousel.vue" && tag === "div") return {
        ...shared,
        disposition: "SEMANTIC_COMPOSITE_HOST_ENROLLED",
        ownerWaves: ["BI.W-P062", "BI.W-P119"],
        basis: "The focusable region host owns carousel-level keyboard navigation while descendant controls retain their own native command semantics.",
        acceptance: "The region has a contextual accessible name in every consumer, Arrow behavior follows declared orientation, focus/announcement identity survives travel, and descendant controls remain independently operable.",
    };
    if (path === "src/components/ui/button/Button.vue" && tag === "Primitive") return {
        ...shared,
        disposition: "POLYMORPHIC_NATIVE_CONTROL_INTERNAL_ENROLLED",
        ownerWaves: ["BI.W-P027", "BI.W-P062", "BI.W-P065"],
        basis: "Pointerdown drives only the shared press physics on the polymorphic host; actual activation must still resolve through the native command selected by as/asChild.",
        acceptance: "Default and every reachable polymorphic use resolves a native-equivalent command with disabled/form/link/name/focus/keyboard semantics; press physics never becomes a second activation owner.",
    };
    if (path === "src/components/custom/dock/DockControl.vue" && tag === "Primitive") return {
        ...shared,
        disposition: "POLYMORPHIC_NATIVE_CONTROL_INTERNAL_ENROLLED",
        ownerWaves: ["BI.W-P027", "BI.W-P033", "BI.W-P042", "BI.W-P062"],
        basis: "Pointerdown drives press physics; the resolved Primitive host and selection context own command/tab semantics.",
        acceptance: "Every reachable DockControl resolves a named native button or exact tab, with disabled/pressed/selected/focus/keyboard behavior and one press owner.",
    };
    if (path === "src/components/ui/card/Card.vue" && tag === "Surface") return {
        ...shared,
        disposition: "CONDITIONAL_PRESS_PHYSICS_INTERNAL_ENROLLED",
        ownerWaves: ["BI.W-P027", "BI.W-P062", "BI.W-P109"],
        basis: "The Surface pointer handler is conditional press physics; current activated Card consumers explicitly render as button and the default Card remains static.",
        acceptance: "Static Card owns no pointer cursor/activation. Pressable Card resolves one native button/link host with name/state/focus/keyboard parity; Surface never becomes an implicit generic command.",
    };

    if ([
        "demo/stories/data/TimelineContinuousBody.vue",
        "demo/stories/data/TimelineSegmentedBody.vue",
        "src/components/custom/timeline/ContinuousTimeline.vue",
        "src/components/custom/timeline/GlassTimeline.vue",
    ].includes(path)) return {
        ...shared,
        disposition: "SEMANTIC_DESCENDANT_DELEGATION_ENROLLED",
        ownerWaves: ["BI.W-P062", "BI.W-P120"],
        basis: "The custom-component click event is emitted from named native marker buttons; component-event spelling receives no independent accessibility credit.",
        acceptance: "Every emitted segment action originates from a reachable named native marker with focus, keyboard activation, current/completed state, and the same payload as pointer input.",
    };
    if (path === "demo/stories/dock/dock-search.vue" && tag === "li" && role === "option") return {
        ...shared,
        disposition: "ARIA_COMPOSITE_DESCENDANT_ENROLLED",
        ownerWaves: ["BI.W-P038", "BI.W-P040", "BI.W-P042", "BI.W-P062"],
        basis: "The option belongs to the Dock search listbox/combobox composite; pointer selection is paired with input-owned keyboard navigation.",
        acceptance: "The combobox owns active descendant/focus, every option has name and selected/highlight state, Arrow/Enter/Escape matches pointer payload, and filtered/remounted options preserve identity.",
    };
    if (["demo/stories/dock/controls.vue", "demo/stories/dock/overflow.vue"].includes(path) && tag === "div") return {
        ...shared,
        disposition: "ARIA_COMPOSITE_HOST_ENROLLED",
        ownerWaves: ["BI.W-P033", "BI.W-P042", "BI.W-P062"],
        basis: "The named group/radiogroup host coordinates selection and keyboard travel among native DockControl descendants.",
        acceptance: "The resolved group role, item roles/states, roving focus, orientation keys, names, and pointer payload remain coherent in wide, overflow, and coarse modes.",
    };

    throw new Error(`${path}:${tag}:${events.map((event) => event.name).join(",")}: missing semantic disposition`);
};

const rows = rawRows.map((row, index) => ({
    id: `SOH-${String(index + 1).padStart(3, "0")}`,
    ...row,
    ...disposition(row),
}));

const renderedAudit = JSON.parse(readFileSync(join(ROOT, "rendered-demo-audit.json"), "utf8"));
const renderedFindingIds = new Set(renderedAudit.findings.map((row) => row.id));
const renderedInteractionIds = new Set(renderedAudit.interactions.map((row) => row.id));
for (const row of [...rows, ...imperativeRows]) {
    for (const id of row.findingIds) if (!renderedFindingIds.has(id)) throw new Error(`${row.id}: missing rendered finding ${id}`);
    for (const id of row.interactionIds) if (!renderedInteractionIds.has(id)) throw new Error(`${row.id}: missing rendered interaction ${id}`);
}

const counts = {
    vueSourceFiles: vueFiles.length,
    eventHostRows: rows.length,
    distinctEventHostFiles: new Set(rows.map((row) => row.path)).size,
    intrinsicControlRows: rows.filter((row) => INTRINSIC_CONTROLS.has(row.tag)).length,
    typedControlComponentRows: rows.filter((row) => TYPED_CONTROL_COMPONENTS.has(row.tag)).length,
    currentRedRows: rows.filter((row) => row.status === "CURRENT_RED").length,
    currentRedFindings: new Set(rows.flatMap((row) => row.findingIds)).size,
    propagationOnlyRows: rows.filter((row) => row.propagationOnly).length,
    activationRows: rows.filter((row) => row.hasActivation).length,
    directManipulationRows: rows.filter((row) => row.hasDirectManipulation).length,
    keyboardHandlerRows: rows.filter((row) => row.hasKeyboardHandler).length,
    tagCounts: countBy(rows, (row) => row.tag),
    dispositionCounts: countBy(rows, (row) => row.disposition),
    imperativeEventRows: imperativeRows.length,
    imperativeDistinctFiles: new Set(imperativeRows.map((row) => row.path)).size,
    imperativeCurrentRedRows: imperativeRows.filter((row) => row.status === "CURRENT_RED").length,
    imperativeCurrentRedFindings: new Set(imperativeRows.flatMap((row) => row.findingIds)).size,
    imperativeEventCounts: countBy(imperativeRows, (row) => row.event),
    imperativeSyntaxCounts: countBy(imperativeRows, (row) => row.syntaxKind),
    imperativeDispositionCounts: countBy(imperativeRows, (row) => row.disposition),
    totalReviewedSourceHosts: rows.length + imperativeRows.length,
    totalCurrentRedSourceHosts: [...rows, ...imperativeRows].filter((row) => row.status === "CURRENT_RED").length,
};

const output = {
    schemaVersion: "1.0.0",
    sourceBase: SOURCE_BASE,
    generatedAt: "2026-07-14",
    status: "FORMATION_RESEARCH_ONLY",
    authority: "DESCRIPTIVE_SOURCE_DISCOVERY_AND_REVIEW__NEVER_EXECUTION_PASS__RUNTIME_REACHABILITY_REDISCOVERS_CONTROLS",
    method: "Scan every source-base Vue SFC under src+demo after masking scripts/styles/comments; parse opening tags with a quote-aware scanner; enumerate activation, direct-manipulation, and keyboard directives. Separately parse every TS/JS source unit and Vue script with the TypeScript AST to discover literal imperative DOM listeners and intrinsic render-function handlers, including multiline calls. Assign every row exactly one reviewed semantic disposition. Counts describe the frozen source only. Execution discovers composed controls from the current route/import/render graph and cannot use either list as a roster.",
    governingPrinciple: "Operability belongs to the composed semantic control and causal action, not a source tag, wrapper name, host role, fixed file list, or event-handler count.",
    counts,
    rows,
    imperativeRows,
};
writeFileSync(join(ROOT, "semantic-operability-census.json"), `${JSON.stringify(output, null, 2)}\n`);

const md = `# Semantic operability census — composed controls, not source rosters\n\n` +
    `**Status:** formation research only; not execution PASS and not native-browser π\n` +
    `**Bound source:** \`${SOURCE_BASE}\`\n` +
    `**Vue files scanned:** ${counts.vueSourceFiles}\n` +
    `**Event-host rows:** ${counts.eventHostRows} across ${counts.distinctEventHostFiles} files\n` +
    `**Imperative/render-function rows:** ${counts.imperativeEventRows} across ${counts.imperativeDistinctFiles} files\n` +
    `**Current RED source hosts:** ${counts.totalCurrentRedSourceHosts} (${counts.currentRedRows} template + ${counts.imperativeCurrentRedRows} imperative), representing ${new Set([...rows, ...imperativeRows].flatMap((row) => row.findingIds)).size} distinct findings\n\n` +
    `## First-principles rule\n\n` +
    `An event directive is neither proof of interactivity nor proof of accessibility. A native \`button\` still needs a name, truthful state, causal effect, focus, target geometry, and disabled/error behavior. A generic \`div\` can be a valid slider or composite host when its complete role/value/focus/keyboard contract is real. A custom component can delegate correctly to a native descendant, or conceal a pointer-only \`th\`, \`tr\`, SVG handle, character span, canvas hit layer, or no-op branch. Therefore execution must rediscover composed controls from current route/import/render reachability. This frozen-source census is an audit input, never a file roster or cardinality gate.\n\n` +
    `## What the complete census exposed\n\n` +
    `The quote-aware scan found ${counts.eventHostRows} template rows; the earlier first-\`>\` regex missed handlers whose quoted Vue expressions contained \`=>\`. The AST pass found ${counts.imperativeEventRows} additional imperative/render-function rows, including a multiline Dock outside-dismissal listener and a native render-function button invisible to template scans. ${counts.intrinsicControlRows} template rows are intrinsic controls and ${counts.typedControlComponentRows} use typed Button/DockControl/Card facades, but neither class receives blanket PASS. Current RED hosts expose Blob's click surface, DataTable sort/select, Timeline event choices, EasingPicker handles, SortableList reorder, Typewriter's hidden default, DarkMode's no-op, Constellation's inert decorative click action, and Drawer's aria-hidden detent plus false fixed-mode claim. HeaderRibbon, semantic Timeline markers, PagerDots, Dock composites, Slider touch arbitration, Aurora's parallel Nuclei controls, and the SpaView render-function button are retained as positive delegation/alternative examples whose rendered semantics—not wrapper spellings—must remain operable.\n\n` +
    `## Disposition counts\n\n` +
    table(["disposition", "rows"], Object.entries(counts.dispositionCounts).map(([name, count]) => [name, count])) + `\n\n` +
    `## Complete row ledger\n\n` +
    table(["ID", "source host", "events", "disposition", "finding", "owners"], rows.map((row) => [
        row.id,
        `${row.path}:${row.line} <${row.tag}>`,
        row.events.map((event) => `${event.name}${event.modifiers.length ? `.${event.modifiers.join(".")}` : ""}${event.expression === null ? "(propagation-only)" : ""}`).join(", "),
        row.disposition,
        row.findingIds.join(", ") || "—",
        row.ownerWaves.join(", "),
    ])) + `\n\n` +
    `## Imperative and render-function ledger\n\n` +
    `The TypeScript AST pass covers source units, not a hand-authored call roster. A document listener may be a lifecycle observer, a host listener may delegate to a semantic descendant, and an imperative gesture may reveal a missing control; each receives one explicit disposition rather than being counted uniformly as accessibility evidence.\n\n` +
    table(["ID", "source occurrence", "event", "syntax", "disposition", "finding", "owners"], imperativeRows.map((row) => [
        row.id,
        `${row.path}:${row.line} ${row.target}`,
        row.event,
        row.syntaxKind,
        row.disposition,
        row.findingIds.join(", ") || "—",
        row.ownerWaves.join(", "),
    ])) + `\n\n` +
    `## Runtime transposition\n\n` +
    `The sole verifier does not load this ledger as an allowlist. The current compiler/import/route graph enrolls every rendered operable descendant, then generic semantic checks and owner-specific scenarios apply. Moving a defect to another file, changing a native tag to a polymorphic wrapper, hiding an interactive default from first-party stories, or crediting a host image/group while a descendant remains pointer-only must stay RED without adding a row or command identity.\n`;
writeFileSync(join(ROOT, "SEMANTIC-OPERABILITY-CENSUS.md"), md);

console.log(JSON.stringify({ ok: true, counts }, null, 2));
