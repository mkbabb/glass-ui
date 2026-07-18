// parse-sfc.mjs — extract feature groups 2-9 from one .vue file via @vue/compiler-sfc.
// (Group 1 api_signature lives in resolve-types.mjs; group 10 census in build-graph.mjs.)
import { readFileSync } from "node:fs";
import { parse as parseSfc } from "@vue/compiler-sfc";
import { sha1, usort, csort, scanImportSpecifiers } from "./util.mjs";

// Vue AST node type constants (@vue/compiler-core NodeTypes).
const ROOT = 0;
const ELEMENT = 1;

const SPRING_PRESET_NAMES = [
    "smooth", "snappy", "bouncy", "gentle", "dock", "press", "transient",
];

/** Depth-first collect element nodes into an ordered shape tree. */
function buildShape(node) {
    // returns { tag, children:[...] } for element nodes, skipping non-elements
    const kids = [];
    for (const c of node.children || []) {
        if (c.type === ELEMENT) kids.push(buildShape(c));
        else if (c.children) {
            // descend through non-element containers (e.g. template/slot fragments)
            for (const gc of c.children || []) {
                if (gc.type === ELEMENT) kids.push(buildShape(gc));
            }
        }
    }
    return { tag: node.tag, children: kids };
}

/** Serialize a shape tree to a canonical tag-only pre-order string. */
function serializeShape(shape) {
    const inner = shape.children.map(serializeShape).join(",");
    return shape.children.length ? `${shape.tag}(${inner})` : shape.tag;
}

function countNodes(shape) {
    return 1 + shape.children.reduce((s, c) => s + countNodes(c), 0);
}
function maxDepth(shape) {
    return shape.children.length
        ? 1 + Math.max(...shape.children.map(maxDepth))
        : 1;
}

/** Collect all element nodes (flat) for attr scanning. */
function collectEls(node, out = []) {
    for (const c of node.children || []) {
        if (c.type === ELEMENT) {
            out.push(c);
            collectEls(c, out);
        } else if (c.children) {
            collectEls(c, out);
        }
    }
    return out;
}

/** Read a prop's static string value from a Vue AST element prop. */
function attrName(p) {
    // p.type 6 = ATTRIBUTE (static); p.type 7 = DIRECTIVE
    if (p.type === 6) return p.name;
    if (p.type === 7) {
        if (p.name === "bind" && p.arg?.content) return p.arg.content;
        if (p.name === "on" && p.arg?.content) return `@${p.arg.content}`;
        return `v-${p.name}`;
    }
    return null;
}

export function parseSfcFeatures(filePath) {
    const src = readFileSync(filePath, "utf8");
    const { descriptor } = parseSfc(src, { filename: filePath });
    const scriptContent = [
        descriptor.scriptSetup?.content || "",
        descriptor.script?.content || "",
    ].join("\n");
    const styleContent = (descriptor.styles || [])
        .map((s) => s.content)
        .join("\n");
    const templateSrc = descriptor.template?.source || "";
    const wholeText = src;

    // ── dom_topology ─────────────────────────────────────────────
    let shape = null;
    let shapeString = "";
    let nodeCount = 0;
    let depth = 0;
    const ast = descriptor.template?.ast;
    if (ast) {
        const rootShape = buildShape(ast);
        const roots = rootShape.children;
        if (roots.length === 1) shape = roots[0];
        else if (roots.length > 1) shape = { tag: "#root", children: roots };
        if (shape) {
            shapeString = serializeShape(shape);
            nodeCount = countNodes(shape) - (shape.tag === "#root" ? 1 : 0);
            depth = maxDepth(shape) - (shape.tag === "#root" ? 1 : 0);
        }
    }
    const templateEmpty = nodeCount === 0;
    const shapeHash = templateEmpty ? "" : sha1(shapeString);

    const els = ast ? collectEls(ast) : [];

    // ── style_consumption ────────────────────────────────────────
    const utilityClasses = new Set();
    // static class="..." in template
    for (const el of els) {
        for (const p of el.props || []) {
            if (p.type === 6 && p.name === "class" && p.value?.content) {
                for (const t of p.value.content.split(/\s+/)) if (t) utilityClasses.add(t);
            }
        }
    }
    // string literals inside cn(...) calls anywhere in the SFC
    for (const lit of extractCnStringLiterals(wholeText)) {
        for (const t of lit.split(/\s+/)) if (t && /^-?[a-z][\w-]*$/.test(t)) utilityClasses.add(t);
    }
    // custom properties
    const propsRead = new Set();
    const propsWritten = new Set();
    for (const m of wholeText.matchAll(/var\(\s*(--[\w-]+)/g)) propsRead.add(m[1]);
    for (const m of wholeText.matchAll(/(--[\w-]+)\s*:/g)) propsWritten.add(m[1]);
    // data hooks (data-* attrs in template)
    const dataHooks = new Set();
    for (const el of els) {
        for (const p of el.props || []) {
            const n = attrName(p);
            if (n && /^data-/.test(n)) dataHooks.add(n);
        }
    }
    // scoped selectors
    const scopedSelectors = [];
    for (const s of descriptor.styles || []) {
        if (s.scoped) {
            for (const m of (s.content || "").replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([.#][\w-]+)/g))
                scopedSelectors.push(m[1]);
        }
    }

    // ── animation_register ───────────────────────────────────────
    const springPresets = new Set();
    for (const m of wholeText.matchAll(/springPreset\(\s*["']([^"']+)["']/g)) springPresets.add(m[1]);
    for (const m of wholeText.matchAll(/SPRING_PRESETS\.([a-z]+)/g))
        if (SPRING_PRESET_NAMES.includes(m[1])) springPresets.add(m[1]);
    const specifiers = scanImportSpecifiers(scriptContent);
    const motionComposables = new Set();
    for (const s of specifiers) {
        const mm = s.match(/composables\/(motion\/[\w-]+)/);
        if (mm) motionComposables.add(mm[1]);
        if (/useLiquidPress|useSpring|useSpringMount|useNumericTransition|useAnimatedNumber/.test(s))
            motionComposables.add(s.split("/").pop());
    }
    for (const m of scriptContent.matchAll(/\b(useLiquidPress|useSpring|useSpringMount|useMorph|useReveal|useStaggerReveal|useScrollProgress)\b/g))
        motionComposables.add(m[1]);
    const keyframes = new Set();
    for (const m of styleContent.matchAll(/@keyframes\s+([\w-]+)/g)) keyframes.add(m[1]);
    for (const m of styleContent.matchAll(/animation(?:-name)?\s*:\s*([\w-]+)/g))
        if (!["none", "inherit", "initial", "unset"].includes(m[1])) keyframes.add(m[1]);
    const transitions = new Set();
    for (const m of styleContent.matchAll(/transition(?:-property)?\s*:\s*([^;]+);/g)) {
        for (const prop of m[1].split(",")) {
            const name = prop.trim().split(/\s+/)[0];
            if (name && /^-?[a-z]/.test(name) && name !== "none") transitions.add(name);
        }
    }
    const directives = new Set();
    for (const el of els) {
        for (const p of el.props || []) {
            if (p.type === 7 && !["bind", "on", "slot", "model", "if", "else", "else-if", "for", "show"].includes(p.name))
                directives.add(`v-${p.name}`);
        }
    }

    // ── affordance_register ──────────────────────────────────────
    const handlers = new Set();
    const aria = new Set();
    const dataStateSet = new Set();
    let roleAttr = null;
    let tabindex = null;
    let drag = false;
    for (const el of els) {
        for (const p of el.props || []) {
            const n = attrName(p);
            if (!n) continue;
            if (n.startsWith("@")) {
                handlers.add(n);
                if (/@drag|@pointerdown|@pointermove/.test(n) === false && /drag/i.test(n)) drag = true;
            }
            if (/drag/i.test(n)) drag = true;
            if (n.startsWith("aria-")) aria.add(n);
            if (n === "role" && p.value?.content) roleAttr = p.value.content;
            if (n === "tabindex") tabindex = p.value?.content ?? "bound";
            if (n === "data-state") dataStateSet.add(n);
            if (n === "draggable") drag = true;
        }
    }
    const focusRing = utilityClasses.has("focus-ring");
    const tapSquish = utilityClasses.has("tap-squish");
    // reka primitives = named imports from "reka-ui"
    const rekaPrimitives = extractRekaImports(scriptContent);

    // ── composition (import lists; classified in build-graph) ────
    const importSpecs = usort(scanImportSpecifiers(scriptContent));

    // ── size_metrics ─────────────────────────────────────────────
    const loc = {
        script: (scriptContent.match(/\n/g) || []).length + (scriptContent ? 1 : 0),
        template: templateSrc ? templateSrc.split("\n").length : 0,
        style: styleContent ? styleContent.split("\n").length : 0,
        total: src.split("\n").length,
    };

    return {
        dom_topology: {
            node_count: nodeCount,
            max_depth: depth,
            shape_string: shapeString,
            shape_hash: shapeHash,
            template_empty: templateEmpty,
        },
        style_consumption: {
            utility_classes: usort(utilityClasses),
            custom_props_read: usort(propsRead),
            custom_props_written: usort(propsWritten),
            data_hooks: usort(dataHooks),
            scoped_selectors: usort(scopedSelectors),
        },
        animation_register: {
            spring_presets: usort(springPresets),
            motion_composables: usort(motionComposables),
            keyframes: usort(keyframes),
            transitions: usort(transitions),
            directives: usort(directives),
        },
        affordance_register: {
            handlers: usort(handlers),
            aria: usort(aria),
            role: roleAttr,
            tabindex,
            data_state: dataStateSet.size > 0,
            focus_ring: focusRing,
            tap_squish: tapSquish,
            reka_primitive: usort(rekaPrimitives),
            drag,
        },
        size_metrics: { loc },
        _importSpecs: importSpecs,
        _scriptContent: scriptContent,
        _wholeText: wholeText,
        _descriptor: descriptor,
    };
}

/** Extract string literals that are the arguments of `cn(...)` calls. */
function extractCnStringLiterals(text) {
    const out = [];
    const re = /\bcn\s*\(/g;
    let m;
    while ((m = re.exec(text))) {
        // scan forward to the matching close paren, collecting string literals
        let i = re.lastIndex;
        let depth = 1;
        let buf = "";
        while (i < text.length && depth > 0) {
            const ch = text[i];
            if (ch === "(") depth++;
            else if (ch === ")") depth--;
            if (depth > 0) buf += ch;
            i++;
        }
        for (const sm of buf.matchAll(/["'`]([^"'`]*)["'`]/g)) out.push(sm[1]);
    }
    // also static class binding literals `class="..."` already handled; add :class="'...'"
    return out;
}

/** Named component imports from "reka-ui" (used as the wrapped-primitive signal). */
function extractRekaImports(code) {
    const out = [];
    const re = /import\s+\{([^}]+)\}\s+from\s+["']reka-ui["']/g;
    let m;
    while ((m = re.exec(code))) {
        for (const raw of m[1].split(",")) {
            const name = raw.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim();
            if (name && /^[A-Z]/.test(name)) out.push(name);
        }
    }
    return csort([...new Set(out)]);
}
