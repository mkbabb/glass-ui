// B7c C3-3: a click-only menu bundles no reka ContextMenu.
//
// B7B-PERF measured 39,922 B of reka Menu, DropdownMenu and ContextMenu code in sci's
// entry, pulled by the dock's DropdownMenu. The menu parts dispatched through one table
// that named both families, so every part import referenced every ContextMenu export.
// Each root now provides its own family; this walks the static import graph from the
// click root and every public part and asserts no reka ContextMenu binding is reached.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseSfc } from "@vue/compiler-sfc";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const MENU_DIR = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../../../src/components/menu",
);

function scriptsOf(file: string): string[] {
    const source = readFileSync(file, "utf8");
    if (!file.endsWith(".vue")) return [source];
    const { descriptor } = parseSfc(source, { filename: file });
    return [descriptor.script?.content, descriptor.scriptSetup?.content].filter(
        (block): block is string => typeof block === "string",
    );
}

function resolveLocal(from: string, spec: string): string | null {
    if (!spec.startsWith(".")) return null;
    const base = resolve(dirname(from), spec);
    for (const candidate of [base, `${base}.ts`, `${base}/index.ts`]) {
        try {
            readFileSync(candidate);
            return candidate;
        } catch {
            /* next candidate */
        }
    }
    return null;
}

/** Every value binding imported from `reka-ui` in the static graph rooted at `entry`,
 *  limited to the menu directory (the shared overlay helpers import no menu family). */
function rekaBindings(entry: string): Set<string> {
    const seen = new Set<string>();
    const bindings = new Set<string>();
    const queue = [entry];
    while (queue.length) {
        const file = queue.pop()!;
        if (seen.has(file)) continue;
        seen.add(file);
        for (const script of scriptsOf(file)) {
            const sf = ts.createSourceFile(file, script, ts.ScriptTarget.Latest, true);
            for (const stmt of sf.statements) {
                if (!ts.isImportDeclaration(stmt) || stmt.importClause?.isTypeOnly) continue;
                const spec = (stmt.moduleSpecifier as ts.StringLiteral).text;
                if (spec === "reka-ui") {
                    const named = stmt.importClause?.namedBindings;
                    if (named && ts.isNamedImports(named)) {
                        for (const el of named.elements) {
                            if (!el.isTypeOnly) {
                                bindings.add((el.propertyName ?? el.name).text);
                            }
                        }
                    }
                    continue;
                }
                const local = resolveLocal(file, spec);
                if (local && local.startsWith(MENU_DIR)) queue.push(local);
            }
        }
    }
    return bindings;
}

const CLICK_FILES = [
    "DropdownMenu.vue",
    "DropdownMenuTrigger.vue",
    "DropdownMenuContent.vue",
    "DropdownMenuItem.vue",
    "DropdownMenuCheckboxItem.vue",
    "DropdownMenuRadioGroup.vue",
    "DropdownMenuRadioItem.vue",
    "DropdownMenuGroup.vue",
    "DropdownMenuSeparator.vue",
    "DropdownMenuLabel.vue",
    "DropdownMenuShortcut.vue",
    "DropdownMenuSub.vue",
    "DropdownMenuSubTrigger.vue",
    "DropdownMenuSubContent.vue",
];

describe("menu family graph", () => {
    it.each(CLICK_FILES)("%s reaches no reka ContextMenu binding", (file) => {
        const reached = [...rekaBindings(resolve(MENU_DIR, file))];
        expect(reached.filter((name) => /ContextMenu/.test(name))).toEqual([]);
    });

    it("the context root reaches the ContextMenu family and no DropdownMenu root", () => {
        const reached = [...rekaBindings(resolve(MENU_DIR, "ContextMenu.vue"))];
        expect(reached).toContain("ContextMenuRoot");
        expect(reached).toContain("ContextMenuContent");
        expect(reached).not.toContain("DropdownMenuRoot");
    });
});
