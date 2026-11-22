# mkpage9.py: MEASURE-9 part H (RULINGS-8's ninth-pass order). Writes m9/dock-wi8.vue from the harness root's
# dock-wi8.vue, mechanically, and prints what it changed:
#   - RU-104 (H2): the w-scope cell leaves the page (its template block, its header line and its two styles); its
#     follower read `[data-dock-scope]`, which RU-78 removed.
#   - RU-105 (H7): every folded glyph that is its face's direct child drops `class="h-4 w-4"`, so the face shows the
#     glyph at the share (a glyph inside a wrapper keeps its class).
#   - new cells, each named by a ruling:
#       w-tall     RU-91 (H3): the tall pill (w-layers' composition, two rows open) the outline clause is read on
#       w-tallrow  RU-91 as amended for C8-M20 (H3): a one-row dock of tab seats with `--dock-tab-h: 48px`, above the
#                  control size
#       w-segpair  RU-95 (H5): a ControlsDock with a two-segment SegmentedTabs in #persistent and two run seats
#       w-ctlm     RU-114 (H1): a ControlsDock whose seats include a menu, for G-8's menu hold on the preset
#       w-persist  RU-104 (H2): a pill with #persistent and #persistent-end beside its run, so two lanes meet inside
#                  the plate on each side
#       w-docks    RU-103 as amended for C8-M13 (H9): &n= pills on one page (default 18, gregg's count), for the
#                  first frame's forced layouts
#       w-tiers    RU-104 as amended for R8-12 (H2): a pill with slides's two tiers (parkway-lab theme.css:42-43,
#                  0.86 and 0.9), where the progress paints the veil as well as the edge
import os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "dock-wi8.vue")).read()
log = []

# w-scope out
a = src.index("        <div v-if=\"cell === 'w-scope'\"")
b = src.index("</div>", src.index("data-testid=\"w-scope-follower\"")) + len("</div>")
b = src.index("</div>", b) + len("</div>")
cut = src[a:b]
assert "w-scope-host" in cut and cut.count("<div") == 2, cut
src = src[:a] + src[b:].lstrip("\n").rjust(len(src[b:].lstrip("\n")))
src = src.replace("//   w-scope   a pill under [data-dock-scope] with a follower at var(--dock-expand-t) * 100px\n", "")
for sty in (".wi8-scope {", ".wi8-follower {"):
    i = src.index(sty); j = src.index("}\n", i) + 2
    src = src[:i] + src[j:]
log.append("w-scope removed (cell, header line, .wi8-scope and .wi8-follower)")

# folded glyphs that are their face's direct child: drop h-4 w-4
pat = re.compile(r"(<template #collapsed>\n\s*)<([A-Z][A-Za-z0-9]*) class=\"h-4 w-4\" aria-hidden=\"true\" />")
n = len(pat.findall(src))
src = pat.sub(r'\1<\2 aria-hidden="true" />', src)
left = len(re.findall(r"<template #collapsed>\n\s*<[A-Z][A-Za-z0-9]* class=\"h-4 w-4\"", src))
log.append(f"folded direct glyphs unsized: {n} (left sized: {left})")

CELLS = r'''
        <!-- MEASURE-9 part H cells (m9/mkpage9.py) -->
        <GlassDock v-if="cell === 'w-tall'" data-testid="w-tall" aria-label="tall" fit-content collapse="closed" v-bind="flags">
            <DockLayerGroup v-model:active="groupLayer" motion="full" data-testid="w-tall-group">
                <DockLayer v-for="l in layers" :id="l.id" :key="l.id" :label="l.label" :icon="l.icon">
                    <component :is="l.icon" class="h-4 w-4" />
                    <span class="px-1 text-small font-medium">{{ l.label }}</span>
                    <span class="text-micro text-muted-foreground">{{ l.blurb }}</span>
                </DockLayer>
            </DockLayerGroup>
            <template #collapsed>
                <Layers aria-hidden="true" />
            </template>
        </GlassDock>
        <GlassDock v-if="cell === 'w-tallrow'" data-testid="w-tallrow" aria-label="tabs" collapse="closed" style="--dock-tab-h: 48px">
            <DockControl shape="tab" aria-current="page"><Home /><span class="dock-word">Home</span></DockControl>
            <DockControl shape="tab"><Search /><span class="dock-word">Search</span></DockControl>
            <DockControl shape="tab"><Library /><span class="dock-word">Library</span></DockControl>
            <template #collapsed>
                <Home aria-hidden="true" />
            </template>
        </GlassDock>
        <component :is="ControlsDock" v-if="ControlsDock && cell === 'w-segpair'" data-testid="w-segpair" label="Canvas controls" :corner="corner">
            <template #persistent>
                <SegmentedTabs v-model="segPair" aria-label="Panel" :options="[{ value: 'controls', label: 'Controls' }, { value: 'canvas', label: 'Canvas' }]" data-testid="w-segpair-seg" />
            </template>
            <DockControl aria-label="Grid" data-testid="w-segpair-grid"><Table2 /></DockControl>
            <DockControl aria-label="Palette" data-testid="w-segpair-palette"><Palette /></DockControl>
            <template #collapsed>
                <SlidersHorizontal aria-hidden="true" />
            </template>
        </component>
        <component :is="ControlsDock" v-if="ControlsDock && cell === 'w-ctlm'" data-testid="w-ctlm" label="Figure controls" :corner="corner">
            <DockControl aria-label="Table" data-testid="w-ctlm-table"><Table2 /></DockControl>
            <DockControl aria-label="Filter"><Filter /></DockControl>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <DockControl aria-label="Menu" data-testid="w-ctlm-menu"><Layers /></DockControl>
                </DropdownMenuTrigger>
                <DropdownMenuContent data-testid="w-ctlm-menu-content">
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <template #collapsed>
                <SlidersHorizontal aria-hidden="true" />
            </template>
        </component>
        <GlassDock v-if="cell === 'w-persist'" data-testid="w-persist" aria-label="site" collapse="closed">
            <template #persistent>
                <DockControl aria-label="Home" data-testid="w-persist-home"><Home /></DockControl>
            </template>
            <DockControl v-for="p in pages" :key="p.id" :aria-label="p.label"><component :is="p.icon" /></DockControl>
            <template #persistent-end>
                <DockControl aria-label="Settings" data-testid="w-persist-settings"><Settings /></DockControl>
            </template>
            <template #collapsed>
                <BookOpen aria-hidden="true" />
            </template>
        </GlassDock>
        <div v-if="cell === 'w-docks'" class="wi8-docks" data-testid="w-docks">
            <GlassDock v-for="k in manyDocks" :key="k" :data-testid="`w-docks-${k}`" :aria-label="`dock ${k}`" collapse="closed">
                <DockControl v-for="p in pages" :key="p.id" :aria-label="p.label"><component :is="p.icon" /></DockControl>
                <template #collapsed>
                    <BookOpen aria-hidden="true" />
                </template>
            </GlassDock>
        </div>
        <GlassDock v-if="cell === 'w-tiers'" data-testid="w-tiers" aria-label="tiers" collapse="closed" style="--dock-plate-collapsed-tier: 0.86; --dock-plate-expanded-tier: 0.9">
            <DockControl v-for="p in pages" :key="p.id" :aria-label="p.label"><component :is="p.icon" /></DockControl>
            <template #collapsed>
                <BookOpen aria-hidden="true" />
            </template>
        </GlassDock>
'''
anchor = "        <!-- PROTOTYPE-2 cells -->\n"
assert src.count(anchor) == 1
src = src.replace(anchor, CELLS.lstrip("\n") + anchor)
# script: the imports and refs the new cells read
src = src.replace('import { ScrollProgressRim } from "@glass/components/scroll-progress-rim";\n',
                  'import { ScrollProgressRim } from "@glass/components/scroll-progress-rim";\nimport { SegmentedTabs } from "@glass/components/tabs";\n', 1)
src = src.replace('const wordsC = ref("all");\n', 'const wordsC = ref("all");\n// MEASURE-9 part H\nconst segPair = ref("controls");\nconst manyDocks = Array.from({ length: Math.max(1, Number(q.get("n") ?? 18)) }, (_, k) => k);\n', 1)
src = src.replace("/* MEASURE-8 cells */\n", "/* MEASURE-9 part H cells */\n.wi8-docks { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-inline-size: 1400px; }\n/* MEASURE-8 cells */\n", 1)
assert "SegmentedTabs }" in src and "manyDocks" in src and ".wi8-docks" in src
log.append("cells added: w-tall, w-tallrow, w-segpair, w-ctlm, w-persist, w-docks, w-tiers")
src = src.replace("<script setup lang=\"ts\">\n", "<script setup lang=\"ts\">\n// MEASURE-9 part H: generated by m9/mkpage9.py from the harness root's dock-wi8.vue (w-scope out, folded direct glyphs\n// unsized, seven cells added); edit the root page and run it again, never this file.\n", 1)
open(os.path.join(HERE, "dock-wi8.vue"), "w").write(src)
print("\n".join(log))
