// pm/appgrep.mjs (part M: m8/appgrep8.mjs, its log logs/pm-appgrep.txt). appgrep8.mjs: MEASURE-8 H12 (RU-86's witness). Each line of RU-86's table printed at its ref, read-only (`git show
// <ref>:<file>`, no checkout, no fetch), with a check that the line still carries what the table cites it for; a line
// that no longer does is reported, and its name is ruled again before the tag. m7/appgrep.mjs's removals are run
// beside it (logs/m8-appgrep-removals.txt). The refs: daraksha and fourier-analysis `origin/master`, atlas-rc and
// lt-integ-atlas `HEAD`, glass this branch's `HEAD`, each printed with its hash. Log: logs/m8-appgrep.txt.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const P = "/Users/mkbabb/Programming";
const TREES = {
    daraksha: ["daraksha", "origin/master"],
    fourier: ["fourier-analysis", "origin/master"],
    "atlas-rc": [".u-build/atlas-rc", "HEAD"],
    "lt-integ": [".u-build/lt-integ-atlas", "HEAD"],
    glass: ["glass-ui/.claude/worktrees/bl/dock/wi8", "HEAD"],
};
const git = (dir, args) => { try { return execFileSync("git", ["-C", `${P}/${dir}`, ...args], { encoding: "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] }); } catch (e) { return e.stdout ?? ""; } };
const lsCache = {};
const find = (tree, base) => {
    const [dir, ref] = TREES[tree];
    lsCache[tree] ??= git(dir, ["ls-tree", "-r", "--name-only", ref]).split("\n").filter(Boolean);
    const hits = lsCache[tree].filter((f) => f.endsWith(`/${base}`) || f === base);
    return hits;
};
// [name, regex the cited lines must carry, [tree, file, from, to]...]
const ROWS = [
    ["ControlsDock", /GlassDock|ControlsDock|REPLACE THIS FILE|11\.2\.0|named piece|gives way/, ["daraksha", "src/shell/ControlsSeat.vue", 98, 113], ["daraksha", "src/shell/ControlsSeat.vue", 6, 7], ["fourier", "StageDock.vue", 88, 110], ["fourier", "StageDock.vue", 17, 18], ["fourier", "EditorControlsDock.vue", 88, 88]],
    ["label", /label/i, ["daraksha", "src/shell/ControlsSeat.vue", 46, 46], ["daraksha", "ColourPage.vue", 213, 213], ["daraksha", "MotionPage.vue", 116, 116], ["daraksha", "NamePage.vue", 45, 45], ["daraksha", "PortraitsPage.vue", 508, 508], ["daraksha", "ReaderDock.vue", 145, 145], ["fourier", "StageDock.vue", 25, 25], ["fourier", "StageDock.vue", 98, 99]],
    ["corner", /top|right|inset|corner/i, ["daraksha", "src/shell/ControlsSeat.vue", 126, 128], ["fourier", "StageDock.vue", 115, 117]],
    ["within", /fixed|absolute|position|parent|stage|float|inset/i, ["daraksha", "src/shell/ControlsSeat.vue", 126, 128], ["fourier", "StageDock.vue", 115, 117], ["fourier", "PlotToolsDock.vue", 43, 46]],
    ["#default (ControlsDock)", /slot|<template|GlassDock|Dock/, ["fourier", "StageDock.vue", 89, 89], ["fourier", "StageDock.vue", 104, 104]],
    ["#collapsed (ControlsDock)", /collapsed/, ["daraksha", "src/shell/ControlsSeat.vue", 109, 109], ["fourier", "StageDock.vue", 101, 103], ["fourier", "CanvasControlsDock.vue", 63, 68], ["fourier", "PlotToolsDock.vue", 48, 53], ["fourier", "EditorControlsDock.vue", 157, 157], ["atlas-rc", "PlateDock.vue", 171, 171], ["lt-integ", "PlateDock.vue", 359, 359]],
    ["#persistent (ControlsDock)", /persistent/, ["fourier", "EditorControlsDock.vue", 124, 124], ["atlas-rc", "PlateDock.vue", 157, 157], ["lt-integ", "PlateDock.vue", 312, 312]],
    ["#persistent-end (ControlsDock)", /persistent-end|persistentEnd/, ["fourier", "StageDock.vue", 107, 109], ["fourier", "CanvasControlsDock.vue", 104, 114]],
    ["DockOutlet", /Teleport|dock-page|dock-persistent|id=/, ["daraksha", "NameDock.vue", 67, 67], ["daraksha", "PortraitsDock.vue", 61, 61], ["daraksha", "ReaderDock.vue", 117, 117], ["daraksha", "MotionPage.vue", 95, 95], ["daraksha", "SiteDock.vue", 233, 233], ["daraksha", "SiteDock.vue", 270, 270]],
    ["to", /\bto=|dockRegistry\.set/, ["daraksha", "NameDock.vue", 67, 67], ["daraksha", "PortraitsDock.vue", 61, 61], ["daraksha", "ReaderDock.vue", 117, 117], ["daraksha", "MotionPage.vue", 95, 95], ["glass", "src/components/dock/GlassDock.vue", 222, 222]],
    ["region", /persistent-end/, ["daraksha", "MotionPage.vue", 95, 95]],
    ["#default (DockOutlet)", /Teleport/, ["daraksha", "NameDock.vue", 67, 67], ["daraksha", "PortraitsDock.vue", 61, 61], ["daraksha", "ReaderDock.vue", 117, 117], ["daraksha", "MotionPage.vue", 95, 95]],
    ["run", /run=/, ["lt-integ", "PlateDock.vue", 298, 298]],
    ["#rim", /Rim|Teleport|rim/, ["fourier", "web/src/components/layout/AppDock.vue", 371, 373]],
    ["controlCount (exposed)", /controlCount/, ["glass", "src/components/dock/ControlsDock.vue", 53, 53], ["glass", "src/components/dock/ControlsDock.vue", 59, 59]],
];
const out = [];
const head = Object.entries(TREES).map(([k, [dir, ref]]) => `${k} ${ref} ${git(dir, ["rev-parse", "--short=9", ref]).trim()}`);
out.push("# RU-86's table at its refs", ...head.map((h) => `#   ${h}`), "");
let moved = 0;
for (const [name, re, ...sites] of ROWS) {
    out.push(`## ${name}`);
    for (const [tree, file, a, b] of sites) {
        const [dir, ref] = TREES[tree];
        const paths = file.includes("/") ? [file] : find(tree, file);
        if (!paths.length) { out.push(`  ${tree} ${file}:${a}-${b}  NOT FOUND at ${ref}`); moved++; continue; }
        for (const f of paths.slice(0, 2)) {
            const src = git(dir, ["show", `${ref}:${f}`]).split("\n");
            let lines = src.slice(a - 1, b);
            let ok = lines.some((l) => re.test(l)), tag = "";
            // a cited line that opens a component's tag is read through the tag's close
            if (!ok && /<[A-Z][\w]*\s*$/.test(lines[lines.length - 1])) {
                let z = b; while (z < src.length && !/>\s*$/.test(src[z - 1])) z++;
                const t = src.slice(b, z);
                if (t.some((l) => re.test(l))) { ok = true; tag = ` (in the tag its line opens, to :${z})`; lines = [...lines, ...t]; }
            }
            if (!ok) moved++;
            out.push(`  ${tree} ${f}:${a}${b > a ? "-" + b : ""}  ${ok ? "at its ref" + tag : "NOT AT ITS REF (no " + re + " on these lines)"}`);
            for (let i = 0; i < lines.length; i++) out.push(`    ${String(a + i).padStart(4)}| ${lines[i].slice(0, 150)}`);
            if (!ok) {
                const near = src.map((l, i) => [i + 1, l]).filter(([, l]) => re.test(l)).map(([n]) => n).slice(0, 8);
                out.push(`    nearest lines carrying it: ${near.join(", ") || "none in the file"}`);
            }
        }
    }
    out.push("");
}
out.push(`# ${moved} cited line(s) not at their ref`);
writeFileSync(new URL("../../logs/pm-appgrep.txt", import.meta.url), out.join("\n") + "\n");
console.log(`appgrep8: ${ROWS.length} rows, ${moved} cited line(s) not at their ref`);
