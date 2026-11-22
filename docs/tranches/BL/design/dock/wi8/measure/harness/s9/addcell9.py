# addcell9.py: S5's cell on m9/dock-wi8.vue (idempotent), for RU-99's witness: w-trigr, a trigger in every region and both
# axes. A horizontal dock (collapse off) with a worded Select trigger in #persistent, a glyph-only dropdown trigger in the
# run and a worded Select trigger in #persistent-end, beside icon seats; a vertical dock (collapse off) with a worded
# Select trigger and a glyph-only dropdown trigger in its run and a glyph-only trigger in #persistent. The glyph-only
# triggers are narrower than a seat on their own, so the inline clause can bite.
import os
F = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "m9", "dock-wi8.vue")
s = open(F).read()
if "cell === 'w-trigr'" in s:
    print("w-trigr already present"); raise SystemExit
anchor = "        <template v-if=\"cell === 'w-group'\">"
assert s.count(anchor) == 1
cell = """        <!-- S5 (RU-99): w-trigr, a trigger in every region and both axes (s9/addcell9.py). -->
        <template v-if="cell === 'w-trigr'">
            <GlassDock data-testid="w-trigr-h" aria-label="row" :collapse="false">
                <template #persistent>
                    <Select v-model="wordsA">
                        <DockTrigger for="select" aria-label="Range" data-testid="w-trigr-h-start"><SelectValue /></DockTrigger>
                        <SelectContent><SelectItem value="day">Day</SelectItem><SelectItem value="week">Week</SelectItem></SelectContent>
                    </Select>
                </template>
                <DockControl aria-label="Home"><Home /></DockControl>
                <DropdownMenu>
                    <DockTrigger for="dropdown" aria-label="More" data-testid="w-trigr-h-run"><Layers class="size-4" /></DockTrigger>
                    <DropdownMenuContent><DropdownMenuItem>One</DropdownMenuItem></DropdownMenuContent>
                </DropdownMenu>
                <DockControl aria-label="Library"><Library /></DockControl>
                <template #persistent-end>
                    <Select v-model="wordsB">
                        <DockTrigger for="select" aria-label="Width" data-testid="w-trigr-h-end"><SelectValue /></DockTrigger>
                        <SelectContent><SelectItem value="bw">BW</SelectItem><SelectItem value="c">C</SelectItem></SelectContent>
                    </Select>
                </template>
            </GlassDock>
            <GlassDock data-testid="w-trigr-v" aria-label="column" orientation="vertical" :collapse="false" style="position: fixed; inset-inline-start: 24px; inset-block-start: 120px">
                <template #persistent>
                    <DropdownMenu>
                        <DockTrigger for="dropdown" aria-label="Menu" data-testid="w-trigr-v-start"><Layers class="size-4" /></DockTrigger>
                        <DropdownMenuContent><DropdownMenuItem>One</DropdownMenuItem></DropdownMenuContent>
                    </DropdownMenu>
                </template>
                <DockControl aria-label="Home"><Home /></DockControl>
                <Select v-model="wordsA">
                    <DockTrigger for="select" aria-label="Range" data-testid="w-trigr-v-run"><SelectValue /></DockTrigger>
                    <SelectContent><SelectItem value="day">Day</SelectItem><SelectItem value="week">Week</SelectItem></SelectContent>
                </Select>
                <DropdownMenu>
                    <DockTrigger for="dropdown" aria-label="Pick" data-testid="w-trigr-v-run2"><Layers class="size-4" /></DockTrigger>
                    <DropdownMenuContent><DropdownMenuItem>One</DropdownMenuItem></DropdownMenuContent>
                </DropdownMenu>
            </GlassDock>
        </template>
"""
s = s.replace(anchor, cell + anchor)
open(F, "w").write(s)
print("w-trigr added")
