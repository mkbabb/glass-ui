#!/usr/bin/env node
// surface.mjs — anti-vacuity (F-9): the door/surface pin. A built dist's public surface
// (export keys, typesVersions keys, and per entry the runtime names and declaration
// names) against records/surface-pin.json. Any growth or loss is a diff to review, so a
// route cannot converge by widening its doors.
//   node surface.mjs check [--root R] [--dist D]     exit 1 on any difference
//   node surface.mjs pin   [--root R] [--dist D]     re-pin (a reviewed change)
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { DEFAULT_ROOT } from "./lib/tree.mjs";

export const PIN_PATH = "docs/tranches/BL/design/structure/floor/records/surface-pin.json";

export async function readSurface(root, dist) {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    const ts = createRequire(join(root, "package.json"))("typescript");
    const entries = {};
    const jsKeys = Object.entries(pkg.exports).filter(([, v]) => typeof v === "object" && v.import);
    const dtsFiles = jsKeys.map(([, v]) => resolve(dist, v.types.replace(/^\.\/dist\//, "")));
    const program = ts.createProgram(dtsFiles, { noEmit: true, skipLibCheck: true, moduleResolution: ts.ModuleResolutionKind.Bundler, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext, types: [] });
    const checker = program.getTypeChecker();
    for (const [key, v] of jsKeys) {
        const js = resolve(dist, v.import.replace(/^\.\/dist\//, ""));
        const dts = resolve(dist, v.types.replace(/^\.\/dist\//, ""));
        if (!existsSync(js) || !existsSync(dts)) throw new Error(`surface: ${key} missing ${existsSync(js) ? dts : js}`);
        let runtime;
        try { runtime = Object.keys(await import(pathToFileURL(js).href)).sort(); } catch (e) { throw new Error(`surface: ${key} does not import (${String(e.message).slice(0, 160)}); read a dist inside the repo so its dependencies resolve`); }
        const sf = program.getSourceFile(dts);
        const sym = sf && checker.getSymbolAtLocation(sf);
        const types = sym ? checker.getExportsOfModule(sym).map((s) => s.name).sort() : ["<no module symbol>"];
        entries[key] = { runtime, types };
    }
    return {
        exportKeys: Object.keys(pkg.exports),
        typesVersionsKeys: Object.keys(pkg.typesVersions?.["*"] ?? {}),
        entries,
        totals: {
            exportKeys: Object.keys(pkg.exports).length,
            typesVersions: Object.keys(pkg.typesVersions?.["*"] ?? {}).length,
            jsEntries: jsKeys.length,
            runtimeNames: Object.values(entries).reduce((n, e) => n + e.runtime.length, 0),
            typeNames: Object.values(entries).reduce((n, e) => n + e.types.length, 0),
        },
    };
}

export function diffSurface(pin, now) {
    const d = [];
    const list = (name, a, b) => {
        const A = new Set(a), B = new Set(b);
        for (const x of a) if (!B.has(x)) d.push(`${name}: - ${x}`);
        for (const x of b) if (!A.has(x)) d.push(`${name}: + ${x}`);
        if (!d.length && JSON.stringify(a) !== JSON.stringify(b)) d.push(`${name}: order changed`);
    };
    list("exports", pin.exportKeys, now.exportKeys);
    list("typesVersions", pin.typesVersionsKeys, now.typesVersionsKeys);
    for (const k of new Set([...Object.keys(pin.entries), ...Object.keys(now.entries)])) {
        const a = pin.entries[k], b = now.entries[k];
        if (!a || !b) { d.push(`entry ${k}: ${a ? "removed" : "added"}`); continue; }
        list(`${k} runtime`, a.runtime, b.runtime);
        list(`${k} types`, a.types, b.types);
    }
    return d;
}

const isMain = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
    const args = process.argv.slice(2);
    const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
    const cmd = args[0] ?? "check";
    const root = resolve(opt("--root") ?? DEFAULT_ROOT);
    const dist = resolve(opt("--dist") ?? join(root, "dist"));
    const now = await readSurface(root, dist);
    if (cmd === "pin") {
        writeFileSync(join(root, PIN_PATH), `${JSON.stringify({ $schema: "surface-pin/1", ...now }, null, 1)}\n`);
        console.log(`surface pin written: ${JSON.stringify(now.totals)}`);
        process.exit(0);
    }
    const pin = JSON.parse(readFileSync(join(root, PIN_PATH), "utf8"));
    const diff = diffSurface(pin, now);
    console.log(JSON.stringify({ pinned: pin.totals, now: now.totals, differences: diff.length }));
    for (const x of diff.slice(0, 80)) console.log(`  ${x}`);
    process.exit(diff.length ? 1 : 0);
}
