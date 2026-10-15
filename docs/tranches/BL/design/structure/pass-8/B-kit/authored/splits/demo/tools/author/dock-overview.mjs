#!/usr/bin/env node
// author/dock-overview.mjs — AUTHOR-SIDE (B-S11, zone demo): split
// demo/stories/dock/overview.vue (674 lines). Its two largest sections leave with their
// state for `dock/overview/`:
//   TriggerSection.vue  "Select and dropdown triggers": the view/command selections, their
//                       label tables, the three overlay triggers and the readout;
//   PopoverSection.vue  "With popover triggers": the share/export/track panels; the track
//                       it picks is the page's (the transport section prints it), bound
//                       through `v-model:track`.
// Each section's template moves verbatim, dedented one level (it becomes the component's
// root). The page's one tile rule reaches the sections' tiles through `:deep()`, at the
// specificity it had (one class plus the scope attribute), so no rule is copied.
//
//   node author/dock-overview.mjs --root <tree>
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { importsFor, open, rebuild } from "./lib.mjs";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const REL = "demo/stories/dock/overview.vue";
const src = open(root, REL);
const { L, at, next, range } = src;

const tracks = at('const tracks = ["The Garden", "Morning Weft", "Carmine Drift", "Salt & Slate"];');
const stateA = at('type DockView = "preview" | "inspect" | "timeline";');
const stateB = next("};", at("const dockCommandLabels: Record<DockCommand, string> = {"));
if (stateA !== tracks + 2 || L[tracks] !== "" || L[stateB] !== "") throw new Error("overview.vue: the trigger state is not where it was");
const hover = at('// HoverPopover folded onto <Popover trigger="hover">.');
const trigA = at('            heading="Select and dropdown triggers"') - 1;
const trigB = next("        </StorySection>", trigA);
const popA = at('        <StorySection heading="With popover triggers" gap="md">');
const popB = next("        </StorySection>", popA);
if (L[trigA - 1] !== "        <StorySection" || popA !== trigB + 2) throw new Error("overview.vue: the two sections are not adjacent");
const tileNote = at("   framed by a faint hairline only. */");
const tileRule = at(".dock-stage-tile {");

const dedent = (rows) => rows.map((r) => (r.startsWith("    ") ? r.slice(4) : r));
const DIR = "demo/stories/dock/overview";
mkdirSync(join(root, DIR), { recursive: true });
const trigState = range(stateA, stateB);
const trigTpl = range(trigA, trigB);
writeFileSync(
    join(root, DIR, "TriggerSection.vue"),
    [
        '<script setup lang="ts">',
        "// Select, dropdown and popover triggers on one dock, each read back below it.",
        ...importsFor(src, { script: trigState.join("\n"), template: trigTpl.join("\n") }, DIR),
        "",
        ...trigState,
        "</script>",
        "",
        "<template>",
        ...dedent(trigTpl),
        "</template>",
        "",
    ].join("\n"),
);
const popTpl = range(popA, popB);
const popImports = importsFor(src, { script: L[tracks - 1], template: popTpl.join("\n") }, DIR);
const pi = popImports.findIndex((r) => r.startsWith("import { Popover"));
if (pi < 0) throw new Error("PopoverSection reads no Popover");
popImports.splice(pi, 0, L[hover - 1]); // the note travels with the popover import it annotates
writeFileSync(
    join(root, DIR, "PopoverSection.vue"),
    [
        '<script setup lang="ts">',
        "// Command panels behind popover triggers that pin the dock open.",
        ...popImports,
        "",
        "// The page's track: the transport section prints it, this picker writes it.",
        'const track = defineModel<string>("track", { required: true });',
        L[tracks - 1],
        "</script>",
        "",
        "<template>",
        ...dedent(popTpl),
        "</template>",
        "",
    ].join("\n"),
);

writeFileSync(
    join(root, REL),
    rebuild(src, {
        cuts: [[hover, hover], [tracks, stateB], [trigA, trigB], [popA, popB], [tileNote, tileNote], [tileRule, tileRule]],
        put: {
            [trigA]: ["        <TriggerSection />"],
            [popA]: ['        <PopoverSection v-model:track="track" />'],
            [tileNote]: ["   framed by a faint hairline only. `:deep()` so the tiles of the", "   ./overview/ sections read the same rule. */"],
            [tileRule]: [":deep(.dock-stage-tile) {"],
        },
        addImports: ['import TriggerSection from "./overview/TriggerSection.vue";', 'import PopoverSection from "./overview/PopoverSection.vue";'],
        moved: { script: [L[tracks - 1], ...trigState].join("\n"), template: [...trigTpl, ...popTpl].join("\n") },
    }),
);
console.log("dock overview split");
