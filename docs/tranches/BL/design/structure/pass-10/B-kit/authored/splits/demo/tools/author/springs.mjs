#!/usr/bin/env node
// author/springs.mjs — AUTHOR-SIDE (B-S11, zone demo): split demo/stories/motion/springs.vue
// (541 lines) into its two sections and the preview machinery they share:
//   springs/preview.ts          the preset rows, the managed preview (NumericAnimation
//                               playback) and the responsive travel both stages use;
//   springs/NamedRegisters.vue  the "Named registers" section, its state and its stage;
//   springs/CustomAuthoring.vue the "Custom spring authoring" configurator, its state,
//                               its copy feedback.
// Each section's script and template move verbatim (the template dedented one level, since
// it becomes the component's root). The page keeps the masthead and composes the two.
//
//   node author/springs.mjs --root <tree>
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { importsFor, open, rebuild, uses } from "./lib.mjs";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const REL = "demo/stories/motion/springs.vue";
const src = open(root, REL);
const { L, at, next, range } = src;

const sharedA = at("// Dock is deliberately taught in its product-specific morph lab; every shared row");
const sharedB = next("}", at("function setPreviewProgress(element: HTMLElement | null, progress: number): void {"));
const namedA = at("const card = shallowRef<HTMLElement | null>(null);");
const namedB = at("watch(preset, reset);");
const customA = at("// ── Custom authoring, seeded from (but distinct from) shipped tokens ──────────");
const customB = at("watch(playStops, invalidateCopy);");
const scriptEnd = at("</script>");
const headerA = at("// Named and custom previews share managed playback and spring projection;");
if (L[headerA] !== "// this story owns no frame scheduler.") throw new Error("header moved");
if (L[sharedA - 2] !== "" || namedA !== sharedB + 2 || customA !== namedB + 2 || scriptEnd !== customB + 1) throw new Error("springs.vue script blocks are not adjacent");
const namedSecA = next("        <StorySection", at("        </header>"));
const namedSecB = next("        </StorySection>", namedSecA);
const note = at("        <!-- Custom authoring adopts the ONE configurator anatomy (BJ.W-CONFIGURATOR-STD");
const customSecA = next("        <StorySection", note);
const customSecB = next("        </StorySection>", customSecA);
if (L[namedSecB] !== "" || note !== namedSecB + 2 || L[customSecB] !== "    </StoryPage>") throw new Error("springs.vue template sections moved");

const sharedText = range(sharedA, sharedB).map((r) => r.replace(/^(type|const|function) /, "export $1 ")).join("\n");
const dedent = (rows) => rows.map((r) => (r.startsWith("    ") ? r.slice(4) : r));
const DIR = "demo/stories/motion/springs";
mkdirSync(join(root, DIR), { recursive: true });
writeFileSync(
    join(root, DIR, "preview.ts"),
    [
        "// What both spring stages share: the preset rows (every shipped register but the dock's),",
        "// the managed preview that plays a projection through NumericAnimation, and the",
        "// responsive travel that keeps the peak frame inside its stage.",
        ...importsFor(src, sharedText, DIR),
        "",
        sharedText,
        "",
    ].join("\n"),
);

// the shared names each section reads, from preview.ts
const SHARED = [...sharedText.matchAll(/^export (type|const|function) (\w+)/gm)].map((m) => ({ name: m[2], type: m[1] === "type" }));
const sharedImport = (body) => {
    const list = SHARED.filter((s) => uses(body, s.name)).sort((a, b) => a.name.localeCompare(b.name, "en", { caseFirst: "upper" }));
    return `import {\n${list.map((s) => `    ${s.type ? "type " : ""}${s.name},`).join("\n")}\n} from "./preview";`;
};
const section = (file, lead, script, template) => {
    const body = { script: script.join("\n"), template: template.join("\n") };
    writeFileSync(
        join(root, DIR, file),
        ['<script setup lang="ts">', lead, ...importsFor(src, body, DIR), sharedImport(body), "", ...script, "</script>", "", "<template>", ...dedent(template), "</template>", ""].join("\n"),
    );
};
section("NamedRegisters.vue", "// Named registers: pick a shipped spring and play its projected curve.", range(namedA, namedB), range(namedSecA, namedSecB));
section(
    "CustomAuthoring.vue",
    "// Custom authoring: tune response and damping, play the curve, copy its linear() stops.",
    range(customA, customB),
    range(customSecA, customSecB),
);

writeFileSync(
    join(root, REL),
    rebuild(src, {
        cuts: [[headerA, headerA + 1], [sharedA - 1, customB], [namedSecA, namedSecB], [customSecA, customSecB]],
        put: {
            [headerA]: ["// Named and custom previews share managed playback and spring projection", "// (./springs/preview.ts); this story owns no frame scheduler."],
            [namedSecA]: ["        <NamedRegisters />"],
            [customSecA]: ["        <CustomAuthoring />"],
        },
        addImports: ['import NamedRegisters from "./springs/NamedRegisters.vue";', 'import CustomAuthoring from "./springs/CustomAuthoring.vue";'],
        moved: {
            script: range(sharedA, customB).join("\n"),
            template: [...range(namedSecA, namedSecB), ...range(customSecA, customSecB)].join("\n"),
        },
    }),
);
console.log("springs split");
