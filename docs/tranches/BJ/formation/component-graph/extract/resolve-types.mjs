// resolve-types.mjs — api_signature (feature group 1) via the TypeScript compiler.
// Resolves defineProps<T>() type args, follows `extends` chains into _shared +
// sibling type files, and reads withDefaults() literals. Deterministic.
import ts from "typescript";
import { readFileSync } from "node:fs";
import { parse as parseSfc } from "@vue/compiler-sfc";
import { csort, resolveImport } from "./util.mjs";

/**
 * Build a global index of interface/type-literal declarations across a file set.
 * Returns Map<name, {members, extends, file}>. On name collision the first file in
 * canonical order wins, but per-SFC resolution prefers the import-declared source.
 */
export function buildTypeIndex(files) {
    const index = new Map(); // name -> [{members, extends, file}]
    for (const f of files) {
        const { code } = getScript(f);
        if (!code) continue;
        const sf = ts.createSourceFile(f, code, ts.ScriptTarget.Latest, true);
        collectDecls(sf, f, index);
    }
    return index;
}

function getScript(f) {
    const raw = readFileSync(f, "utf8");
    if (f.endsWith(".vue")) {
        const { descriptor } = parseSfc(raw, { filename: f });
        const code = [
            descriptor.scriptSetup?.content || "",
            descriptor.script?.content || "",
        ].join("\n");
        return { code, raw };
    }
    return { code: raw, raw };
}

function collectDecls(sf, file, index) {
    sf.forEachChild((node) => {
        if (ts.isInterfaceDeclaration(node)) {
            const name = node.name.text;
            const rec = {
                members: readMembers(node.members),
                extends: readHeritage(node),
                file,
            };
            (index.has(name) ? index.get(name) : index.set(name, []).get(name)).push(rec);
        } else if (ts.isTypeAliasDeclaration(node)) {
            const name = node.name.text;
            if (ts.isTypeLiteralNode(node.type)) {
                const rec = { members: readMembers(node.type.members), extends: [], file };
                (index.has(name) ? index.get(name) : index.set(name, []).get(name)).push(rec);
            }
        }
    });
}

function readMembers(members) {
    const out = [];
    for (const m of members) {
        if (ts.isPropertySignature(m) && m.name) {
            const name = m.name.getText();
            out.push({
                name: name.replace(/["']/g, ""),
                type: m.type ? m.type.getText().replace(/\s+/g, " ").trim() : "any",
                required: !m.questionToken,
            });
        }
    }
    return out;
}

function readHeritage(node) {
    const out = [];
    for (const h of node.heritageClauses || []) {
        for (const t of h.types) {
            const name = t.expression.getText();
            out.push(name);
        }
    }
    return out;
}

/** Build a name→sourceFile import map for a single SFC's script. */
function importMap(code) {
    const map = new Map();
    const re = /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+["']([^"']+)["']/g;
    let m;
    while ((m = re.exec(code))) {
        const from = m[2];
        for (const raw of m[1].split(",")) {
            const name = raw.trim().replace(/^type\s+/, "").split(/\s+as\s+/).pop().trim();
            if (name) map.set(name, from);
        }
    }
    // default imports: import X from "..."
    const re2 = /import\s+(?:type\s+)?([A-Za-z_]\w*)\s*,?\s*(?:\{[^}]*\})?\s+from\s+["']([^"']+)["']/g;
    while ((m = re2.exec(code))) map.set(m[1], m[2]);
    return map;
}

/** Resolve a type name to its declaration, preferring the import-declared file. */
function resolveDecl(name, sfcFile, imports, index) {
    const spec = imports.get(name);
    const recs = index.get(name);
    if (!recs) return null;
    if (spec && spec.startsWith(".")) {
        const abs = resolveImport(sfcFile, spec);
        if (abs) {
            const match = recs.find((r) => r.file === abs);
            if (match) return match;
        }
    }
    // prefer a declaration in the same file
    const same = recs.find((r) => r.file === sfcFile);
    if (same) return same;
    // else canonical-first
    return [...recs].sort((a, b) => (a.file < b.file ? -1 : 1))[0];
}

/** Accumulate members through the extends chain (base first, own overrides). */
function collectProps(typeName, sfcFile, imports, index, seen = new Set()) {
    if (seen.has(typeName)) return [];
    seen.add(typeName);
    const decl = resolveDecl(typeName, sfcFile, imports, index);
    if (!decl) return [];
    const inherited = [];
    for (const ext of decl.extends) {
        // strip generic args e.g. Foo<Bar> -> Foo
        const base = ext.replace(/<.*$/, "").trim();
        inherited.push(...collectProps(base, decl.file, importMap(getScript(decl.file).code), index, seen));
    }
    const byName = new Map();
    for (const p of inherited) byName.set(p.name, p);
    for (const p of decl.members) byName.set(p.name, p); // own overrides base
    return [...byName.values()];
}

/**
 * Extract the api_signature for one SFC. Needs the SFC's descriptor (for template
 * slot/data-slot) plus the global type index. Returns { props, emits, slots, model,
 * exposes } with props carrying { name, type, default, required }.
 */
export function resolveApi(sfcFile, descriptor, index, templateSlotNames = []) {
    const code = [
        descriptor.scriptSetup?.content || "",
        descriptor.script?.content || "",
    ].join("\n");
    const imports = importMap(code);

    // ── props ────────────────────────────────────────────────────
    let props = [];
    const defaults = readWithDefaults(code);
    const dpTypeArg = matchDefinePropsTypeArg(code);
    if (dpTypeArg) {
        if (dpTypeArg.kind === "ref") {
            props = collectProps(dpTypeArg.name, sfcFile, imports, index);
        } else if (dpTypeArg.kind === "literal") {
            props = readInlineLiteralMembers(dpTypeArg.text);
        }
    } else {
        // runtime form defineProps({...}) — none in this repo, but handle gracefully
        props = readRuntimeProps(code);
    }
    // CLONE — type-index member objects are shared across every SFC that references
    // the same interface; mutating `default` in place would leak across components.
    props = props.map((p) => ({ ...p }));
    // attach defaults
    for (const p of props) {
        if (Object.prototype.hasOwnProperty.call(defaults, p.name)) p.default = defaults[p.name];
        else p.default = null;
    }
    props.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

    // ── emits ────────────────────────────────────────────────────
    const emits = extractEmits(code, imports, sfcFile, index);

    // ── model ────────────────────────────────────────────────────
    const model = extractModels(code);

    // ── slots ────────────────────────────────────────────────────
    const slots = new Set(templateSlotNames);
    for (const s of extractDefineSlots(code)) slots.add(s);

    // ── exposes ──────────────────────────────────────────────────
    const exposes = extractExposes(code);

    return {
        props,
        emits: csort(emits),
        slots: csort([...slots]),
        model: csort(model),
        exposes: csort(exposes),
    };
}

function matchDefinePropsTypeArg(code) {
    // defineProps<TypeRef>() or withDefaults(defineProps<...>(), {...})
    const m = code.match(/defineProps\s*<\s*([\s\S]*?)>\s*\(\s*\)/);
    if (!m) return null;
    const inner = m[1].trim();
    if (/^\{/.test(inner)) return { kind: "literal", text: inner };
    // a bare identifier (optionally with generic args)
    const idm = inner.match(/^([A-Za-z_]\w*)/);
    if (idm) return { kind: "ref", name: idm[1] };
    return null;
}

function readInlineLiteralMembers(literalText) {
    // wrap into a type alias and parse
    const src = `type __T = ${literalText};`;
    const sf = ts.createSourceFile("inline.ts", src, ts.ScriptTarget.Latest, true);
    let out = [];
    sf.forEachChild((n) => {
        if (ts.isTypeAliasDeclaration(n) && ts.isTypeLiteralNode(n.type))
            out = readMembers(n.type.members);
    });
    return out;
}

function readWithDefaults(code) {
    const out = {};
    const m = code.match(/withDefaults\s*\(\s*defineProps[\s\S]*?\(\s*\)\s*,\s*(\{[\s\S]*?\})\s*\)\s*;?/);
    if (!m) return out;
    const src = `const __d = ${m[1]};`;
    let sf;
    try {
        // setParentNodes=true is required or getText() misfires on keyword tokens.
        sf = ts.createSourceFile("d.ts", src, ts.ScriptTarget.Latest, true);
    } catch {
        return out;
    }
    sf.forEachChild((n) => {
        if (ts.isVariableStatement(n)) {
            for (const d of n.declarationList.declarations) {
                if (d.initializer && ts.isObjectLiteralExpression(d.initializer)) {
                    for (const p of d.initializer.properties) {
                        if (ts.isPropertyAssignment(p) && p.name) {
                            const key = p.name.getText(sf).replace(/["']/g, "");
                            out[key] = readInitializer(p.initializer, sf);
                        }
                    }
                }
            }
        }
    });
    return out;
}

/** Read a default initializer's canonical string form (keyword-safe). */
function readInitializer(node, sf) {
    if (node.kind === ts.SyntaxKind.TrueKeyword) return "true";
    if (node.kind === ts.SyntaxKind.FalseKeyword) return "false";
    if (node.kind === ts.SyntaxKind.NullKeyword) return "null";
    if (ts.isStringLiteral(node)) return `"${node.text}"`;
    if (ts.isNumericLiteral(node)) return node.text;
    if (ts.isIdentifier(node)) return node.text;
    let val = node.getText(sf).replace(/\s+/g, " ").trim();
    if (val.length > 48) val = val.slice(0, 45) + "...";
    return val;
}

function readRuntimeProps(code) {
    const out = [];
    const m = code.match(/defineProps\s*\(\s*(\{[\s\S]*?\})\s*\)/);
    if (!m) return out;
    for (const km of m[1].matchAll(/([A-Za-z_]\w*)\s*:/g)) out.push({ name: km[1], type: "unknown", required: false });
    return out;
}

function extractEmits(code, imports, sfcFile, index) {
    const out = new Set();
    // defineEmits<{ ... }>()
    const tm = code.match(/defineEmits\s*<\s*([\s\S]*?)>\s*\(\s*\)/);
    if (tm) {
        const inner = tm[1].trim();
        // type-literal form: "(e:'update:open', v:boolean):void" or "'update:open':[...]"
        for (const em of inner.matchAll(/["']([\w:.-]+)["']\s*:/g)) out.add(em[1]);
        for (const em of inner.matchAll(/\(\s*e\s*:\s*["']([\w:.-]+)["']/g)) out.add(em[1]);
        // named type reference: defineEmits<SomeEmits>()
        const idm = inner.match(/^([A-Za-z_]\w*)$/);
        if (idm && out.size === 0) {
            const decl = resolveDecl(idm[1], sfcFile, imports, index);
            if (decl) for (const mem of decl.members) out.add(mem.name);
        }
    }
    // array form defineEmits(['click'])
    const am = code.match(/defineEmits\s*\(\s*\[([^\]]*)\]/);
    if (am) for (const em of am[1].matchAll(/["']([\w:.-]+)["']/g)) out.add(em[1]);
    return [...out];
}

function extractModels(code) {
    const out = [];
    for (const m of code.matchAll(/defineModel\s*(?:<[^>]*>)?\s*\(\s*(?:["']([^"']+)["'])?/g)) {
        out.push(m[1] || "modelValue");
    }
    return [...new Set(out)];
}

function extractDefineSlots(code) {
    const out = [];
    const m = code.match(/defineSlots\s*<\s*\{([\s\S]*?)\}\s*>\s*\(\s*\)/);
    if (m) for (const sm of m[1].matchAll(/([\w"'-]+)\s*(?:\?)?\s*:/g)) out.push(sm[1].replace(/["']/g, ""));
    return out;
}

function extractExposes(code) {
    const out = [];
    const m = code.match(/defineExpose\s*\(\s*\{([\s\S]*?)\}\s*\)/);
    if (m) for (const em of m[1].matchAll(/([A-Za-z_]\w*)\s*[,:}]/g)) out.push(em[1]);
    return [...new Set(out)];
}

export { getScript };
