// AW.W28.b — the demo dock-nav STRUCTURAL gate (proof:demo-dock-nav).
//
// The demo's core page navigation is rebuilt as a DOGFOOD of GlassDock: a FIXED
// vertical sidebar rail dock (SidebarDock, replacing CategoryRail) + a
// viewport-anchored bottom-bar dock (BottomDock, replacing StoryPager). This
// gate asserts the STRUCTURAL shape of that rebuild — the two-dock shell + the
// clean delete — over source. The behavioral falsifier (the live route-walk +
// 3-viewport render) is the standalone Playwright probe
// `proof-demo-dock-nav-runtime.mjs`; this gate is the always-present structure
// tier that runs on every runner.
//
// WHAT IT ASSERTS:
//   1. AppShell.vue IMPORTS + RENDERS both SidebarDock AND BottomDock.
//   2. CategoryRail.vue + StoryPager.vue are DELETED from demo/shell/, and grep
//      finds zero residual IMPORT of either anywhere under demo/ (a code comment
//      mentioning the old name by prose is NOT an import and does not count).
//   3. Both new docks render a <GlassDock> and consume useStoryNavigation.
//
// inv ε / bite-check: born-RED on HEAD (CategoryRail/StoryPager exist;
// SidebarDock/BottomDock absent) — verified at wave open. Re-introduce a
// `import … from "./CategoryRail.vue"` anywhere under demo/ → RED (2). Drop the
// <GlassDock> from either dock → RED (3).

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        DEMO: resolve(ROOT, "demo"),
        SHELL: resolve(ROOT, "demo/shell"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DEMO_DOCK_NAV_ARTIFACT",
            "AW-demo-dock-nav",
        ),
    };
    return _cliPaths;
}

/** Recursively collect every .vue/.ts file under a dir. Pure given fs. */
export function collectSources(dir, fs) {
    const files = [];
    const walk = (d) => {
        for (const entry of fs.readdirSync(d)) {
            const full = resolve(d, entry);
            const st = fs.statSync(full);
            if (st.isDirectory()) walk(full);
            else if (entry.endsWith(".vue") || entry.endsWith(".ts")) files.push(full);
        }
    };
    walk(dir);
    return files;
}

/**
 * Detect a residual IMPORT of a deleted component. Matches an `import …
 * from "…/<Name>.vue"` (or a bare `from "…/<Name>"`) statement, NOT a prose
 * mention in a comment. Pure given the source string.
 */
export function importsDeletedComponent(src, name) {
    const re = new RegExp(
        `import\\b[^;\\n]*from\\s+["'][^"']*\\b${name}(?:\\.vue)?["']`,
    );
    return re.test(src);
}

/** The pure detector over the injected file map. Returns {facts, violations}. */
export function detect(fileMap, allSources) {
    const violations = [];
    const facts = {};

    // (2a) The deleted files are GONE from demo/shell/.
    for (const deleted of ["CategoryRail.vue", "StoryPager.vue"]) {
        const present = fileMap[`shell/${deleted}`] !== undefined;
        facts[`deleted_${deleted}`] = !present;
        if (present) {
            violations.push(
                `demo/shell/${deleted} still exists — it must be deleted (clean break, no re-export shim)`,
            );
        }
    }

    // (2b) Zero residual IMPORT of either deleted component anywhere under demo/.
    const residual = [];
    for (const [rel, src] of Object.entries(allSources)) {
        for (const name of ["CategoryRail", "StoryPager"]) {
            if (importsDeletedComponent(src, name)) residual.push(`${rel} → ${name}`);
        }
    }
    facts.residualImports = residual;
    for (const r of residual) {
        violations.push(`residual import of a deleted nav component: ${r}`);
    }

    // (1) AppShell imports + renders both new docks.
    const appShell = fileMap["shell/AppShell.vue"];
    if (!appShell) {
        violations.push("demo/shell/AppShell.vue is missing");
    } else {
        for (const dock of ["SidebarDock", "BottomDock"]) {
            const imported = importsDeletedComponent(appShell, dock); // same import matcher
            const rendered = new RegExp(`<${dock}\\b`).test(appShell);
            facts[`appShell_imports_${dock}`] = imported;
            facts[`appShell_renders_${dock}`] = rendered;
            if (!imported)
                violations.push(`AppShell.vue does not import ${dock}`);
            if (!rendered)
                violations.push(`AppShell.vue does not render <${dock}>`);
        }
    }

    // (3) Both new docks exist, render a <GlassDock>, and consume useStoryNavigation.
    for (const dock of ["SidebarDock", "BottomDock"]) {
        const src = fileMap[`shell/${dock}.vue`];
        if (!src) {
            violations.push(`demo/shell/${dock}.vue is missing`);
            continue;
        }
        const hasGlassDock = /<GlassDock\b/.test(src) && /\bGlassDock\b/.test(src);
        const usesNav = /useStoryNavigation\s*\(/.test(src);
        facts[`${dock}_renders_GlassDock`] = hasGlassDock;
        facts[`${dock}_uses_useStoryNavigation`] = usesNav;
        if (!hasGlassDock)
            violations.push(`${dock}.vue does not render a <GlassDock>`);
        if (!usesNav)
            violations.push(`${dock}.vue does not consume useStoryNavigation`);
    }

    return { facts, violations };
}

function run() {
    const P = cliPaths();
    const fs = { existsSync, readdirSync, readFileSync, statSync };

    // Map of `<reldir>/<file>` → source for the files the gate reasons over.
    const fileMap = {};
    if (fs.existsSync(P.SHELL)) {
        for (const entry of fs.readdirSync(P.SHELL)) {
            const full = resolve(P.SHELL, entry);
            if (fs.statSync(full).isFile())
                fileMap[`shell/${entry}`] = fs.readFileSync(full, "utf8");
        }
    }

    // All demo sources for the residual-import sweep.
    const allSources = {};
    for (const full of collectSources(P.DEMO, fs)) {
        allSources[full.slice(P.ROOT.length + 1)] = fs.readFileSync(full, "utf8");
    }

    const { facts, violations } = detect(fileMap, allSources);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:demo-dock-nav",
        command: "npm run proof:demo-dock-nav",
        facts,
        violations,
    });

    console.log(
        "proof:demo-dock-nav — the two-dock demo nav shell + clean delete (AW.W28.b, structural)",
    );
    console.log(
        `  SidebarDock renders GlassDock : ${facts.SidebarDock_renders_GlassDock ? "YES" : "NO"}`,
    );
    console.log(
        `  BottomDock renders GlassDock  : ${facts.BottomDock_renders_GlassDock ? "YES" : "NO"}`,
    );
    console.log(
        `  CategoryRail / StoryPager     : ${facts["deleted_CategoryRail.vue"] && facts["deleted_StoryPager.vue"] ? "DELETED" : "STILL PRESENT"}`,
    );
    console.log(`  residual imports              : ${facts.residualImports.length}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
