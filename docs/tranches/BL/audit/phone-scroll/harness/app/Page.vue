<script setup lang="ts">
// The phone-scroll page: one surface per load, a page tall enough to scroll both ways
// behind it. ?s=<surface>&n=<rows>. Copied into <tree>/demo/__phone/ by build-tree.sh.
// The third round adds the nested cells (dlg-menu, dlg-pop, fsheet-menu, pop-menu,
// pop-pop), the chip-row cells (det-chips, pdrawer-chips) and the Select inside a Dialog
// (dlg-sel, ndlg-sel); the fourth adds dlg-field (a modal Dialog with a text field);
// harness/nested.mjs reads them.
import { ref, watch } from "vue";
import { Button } from "@glass/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@glass/components/select";
import { GlassDock } from "@glass/components/dock";
import { DockTrigger } from "@glass/components/dock/trigger";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog";
import { SheetContent } from "@glass/components/sheet";
import { CommandDialog, CommandInput, CommandItem, CommandList } from "@glass/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@glass/components/menu";

const params = new URLSearchParams(window.location.search);
const s = params.get("s") ?? "page";
const n = Number(params.get("n") ?? "4");
const rows = Array.from({ length: n }, (_, i) => i + 1);
// `free=1`: the phone drawer without atlas's `@interact-outside.prevent`.
const free = params.get("free") === "1";
// `dismiss=locked|free`: the dlg-field cell's Dialog.
const dismiss = params.get("dismiss") === "locked" ? "locked" : "free";

const value = ref<string>();
const value2 = ref<string>();
const open = ref(false);
const rung = ref<number | null>(0.7);
// atlas seats its phone drawer at 0.9 on every open (FilterPanel.vue).
const drawerRung = ref<number | null>(0.9);
watch(open, (v) => v && (drawerRung.value = 0.9));
const query = ref("");
const chipRung = ref<number | null>(params.get("s") === "det-chips" ? 0.7 : 0.9);

// A pressable control on the page, under the outside tap: it counts its clicks.
window.__psPressed = 0;
function press(): void {
    window.__psPressed = (window.__psPressed ?? 0) + 1;
}
function outsidePrevent(event: Event): void {
    if (!free) event.preventDefault();
}
</script>

<template>
    <div class="ps-page" :data-s="s">
        <button type="button" class="ps-press" data-testid="press" @click="press">Press</button>
        <div v-for="i in 10" :key="'a' + i" class="ps-block">Above {{ i }}</div>

        <div class="ps-stage" data-testid="stage">
            <template v-if="s === 'select'">
                <Select v-model="value">
                    <SelectTrigger data-testid="trigger" aria-label="Region">
                        <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="i in rows" :key="i" :value="'v' + i">Option {{ i }}</SelectItem>
                    </SelectContent>
                </Select>
            </template>

            <template v-else-if="s === 'nselect'">
                <!-- atlas's year select: a trigger 134 px wide whose list opens as the
                     358 px phone sheet. -->
                <Select v-model="value">
                    <SelectTrigger data-testid="trigger" aria-label="Year" class="ps-narrow">
                        <SelectValue placeholder="2025" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="i in rows" :key="i" :value="'v' + i">Year {{ i }}</SelectItem>
                    </SelectContent>
                </Select>
            </template>

            <template v-else-if="s === 'pdrawer'">
                <!-- atlas's phone filter drawer as atlas production mounts it
                     (o18-atlas 62405c0, FilterPanel.vue:470-552 and its phone CSS): a
                     non-modal bottom sheet with detents 0.9 and 1, opaque, glass's
                     header as its drag handle, its own scrolling body. `sel=1` puts a
                     Select at the top of the body (atlas /ecf). -->
                <Dialog v-model:open="open" :modal="false">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Filters</Button>
                    </DialogTrigger>
                    <SheetContent
                        v-model:detent="drawerRung"
                        side="bottom"
                        :detents="[0.9, 1]"
                        surface="opaque"
                        class="ps-pdrawer"
                        aria-label="Filters"
                        @interact-outside="outsidePrevent"
                    >
                        <div class="ps-pdrawer-sheet">
                            <DialogHeader class="ps-pdrawer-head">
                                <DialogTitle>Filters</DialogTitle>
                            </DialogHeader>
                            <DialogDescription class="sr-only">Filter the page.</DialogDescription>
                            <div class="ps-pdrawer-body">
                                <Select v-if="params.get('sel') === '1'" v-model="value2">
                                    <SelectTrigger data-testid="trigger2" aria-label="Filing window">
                                        <SelectValue placeholder="Filing window" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem v-for="i in 6" :key="i" :value="'w' + i">Window {{ i }}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div v-for="i in rows" :key="i" class="ps-row">Filter {{ i }}</div>
                            </div>
                        </div>
                    </SheetContent>
                </Dialog>
            </template>

            <template v-else-if="s === 'command'">
                <Button data-testid="trigger" @click="open = true">Search</Button>
                <CommandDialog v-model:open="open">
                    <DialogTitle class="sr-only">Commands</DialogTitle>
                    <DialogDescription class="sr-only">Search and run a command.</DialogDescription>
                    <CommandInput v-model="query" placeholder="Type a command" aria-label="Search" />
                    <CommandList>
                        <CommandItem
                            v-for="i in rows"
                            :key="i"
                            :value="'c' + i"
                            @select="open = false"
                        >Command {{ i }}</CommandItem>
                    </CommandList>
                </CommandDialog>
            </template>

            <template v-else-if="s === 'sheet'">
                <Dialog v-model:open="open">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Filters</Button>
                    </DialogTrigger>
                    <SheetContent side="bottom" scroll>
                        <DialogHeader>
                            <DialogTitle>Filters</DialogTitle>
                            <DialogDescription>Choose what the page shows.</DialogDescription>
                        </DialogHeader>
                        <div class="ps-rows">
                            <div v-for="i in rows" :key="i" class="ps-row">Filter {{ i }}</div>
                        </div>
                        <DialogFooter><Button>Apply</Button></DialogFooter>
                    </SheetContent>
                </Dialog>
            </template>

            <template v-else-if="s === 'drawer'">
                <!-- atlas's filter drawer, as atlas mounts it (FilterPanel.vue): a right,
                     non-modal sheet whose body is the consumer's own scroller. -->
                <Dialog v-model:open="open" :modal="false">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Filters</Button>
                    </DialogTrigger>
                    <SheetContent side="right" aria-label="Filters" @interact-outside.prevent>
                        <DialogTitle class="ps-drawer-title">Filters</DialogTitle>
                        <DialogDescription class="sr-only">Filter the page.</DialogDescription>
                        <div class="ps-drawer-body">
                            <div v-for="i in rows" :key="i" class="ps-row">Filter {{ i }}</div>
                        </div>
                        <div class="ps-drawer-foot"><Button>Save view</Button></div>
                    </SheetContent>
                </Dialog>
            </template>

            <template v-else-if="s === 'detents'">
                <Dialog v-model:open="open">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Details</Button>
                    </DialogTrigger>
                    <SheetContent side="bottom" :detents="[0.4, 0.7, 1]" v-model:detent="rung">
                        <DialogHeader>
                            <DialogTitle>Details</DialogTitle>
                            <DialogDescription>A sheet with three rungs.</DialogDescription>
                        </DialogHeader>
                        <div class="ps-rows">
                            <div v-for="i in rows" :key="i" class="ps-row">Row {{ i }}</div>
                        </div>
                        <DialogFooter><Button>Done</Button></DialogFooter>
                    </SheetContent>
                </Dialog>
            </template>

            <template v-else-if="s === 'dialog'">
                <Dialog v-model:open="open">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Terms</Button>
                    </DialogTrigger>
                    <DialogContent scroll>
                        <DialogHeader>
                            <DialogTitle>Terms</DialogTitle>
                            <DialogDescription>Read before you continue.</DialogDescription>
                        </DialogHeader>
                        <p v-for="i in rows" :key="i" class="ps-para">
                            Paragraph {{ i }}. The quick brown fox jumps over the lazy dog, and
                            the dog does not mind.
                        </p>
                    </DialogContent>
                </Dialog>
            </template>

            <template v-else-if="s === 'popover'">
                <Popover>
                    <PopoverTrigger as-child>
                        <Button data-testid="trigger">Info</Button>
                    </PopoverTrigger>
                    <PopoverContent aria-label="Info">
                        <p v-for="i in rows" :key="i" class="ps-para">Note {{ i }}: a line of detail.</p>
                    </PopoverContent>
                </Popover>
            </template>

            <template v-else-if="s === 'dropdown'">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button data-testid="trigger">Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem v-for="i in rows" :key="i">Action {{ i }}</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </template>

            <template v-else-if="s === 'dlg-menu'">
                <Dialog v-model:open="open">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit</DialogTitle>
                            <DialogDescription>A dialog with a menu in it.</DialogDescription>
                        </DialogHeader>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button data-testid="trigger2">More</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem v-for="i in 3" :key="i">Action {{ i }}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <p v-for="i in 4" :key="i" class="ps-para" :data-testid="'far' + i">Line {{ i }} of the dialog body.</p>
                    </DialogContent>
                </Dialog>
            </template>

            <template v-else-if="s === 'dlg-pop'">
                <Dialog v-model:open="open">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit</DialogTitle>
                            <DialogDescription>A dialog with a popover in it.</DialogDescription>
                        </DialogHeader>
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button data-testid="trigger2">Info</Button>
                            </PopoverTrigger>
                            <PopoverContent aria-label="Info">
                                <p class="ps-para">A line of detail.</p>
                            </PopoverContent>
                        </Popover>
                        <p v-for="i in 4" :key="i" class="ps-para" :data-testid="'far' + i">Line {{ i }} of the dialog body.</p>
                    </DialogContent>
                </Dialog>
            </template>

            <template v-else-if="s === 'fsheet-menu'">
                <Dialog v-model:open="open" :modal="false">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Filters</Button>
                    </DialogTrigger>
                    <SheetContent side="bottom" aria-label="Filters">
                        <DialogTitle>Filters</DialogTitle>
                        <DialogDescription class="sr-only">Filter the page.</DialogDescription>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button data-testid="trigger2">Sort</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem v-for="i in 3" :key="i">Sort {{ i }}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div v-for="i in 6" :key="i" class="ps-row" :data-testid="'far' + i">Filter {{ i }}</div>
                    </SheetContent>
                </Dialog>
            </template>

            <template v-else-if="s === 'pop-menu'">
                <Popover>
                    <PopoverTrigger as-child>
                        <Button data-testid="trigger">View</Button>
                    </PopoverTrigger>
                    <PopoverContent aria-label="View">
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button data-testid="trigger2">Scale</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem v-for="i in 3" :key="i">Scale {{ i }}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <p v-for="i in 5" :key="i" class="ps-para" :data-testid="'far' + i">Option line {{ i }}.</p>
                    </PopoverContent>
                </Popover>
            </template>

            <template v-else-if="s === 'pop-pop'">
                <Popover>
                    <PopoverTrigger as-child>
                        <Button data-testid="trigger">View</Button>
                    </PopoverTrigger>
                    <PopoverContent aria-label="View">
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button data-testid="trigger2">Scale</Button>
                            </PopoverTrigger>
                            <PopoverContent aria-label="Scale">
                                <p class="ps-para">A line of detail.</p>
                            </PopoverContent>
                        </Popover>
                        <p v-for="i in 5" :key="i" class="ps-para" :data-testid="'far' + i">Option line {{ i }}.</p>
                    </PopoverContent>
                </Popover>
            </template>

            <template v-else-if="s === 'det-chips' || s === 'pdrawer-chips'">
                <Dialog v-model:open="open" :modal="s === 'det-chips'">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Details</Button>
                    </DialogTrigger>
                    <SheetContent
                        side="bottom"
                        :detents="s === 'det-chips' ? [0.4, 0.7, 1] : [0.9, 1]"
                        v-model:detent="chipRung"
                        aria-label="Details"
                    >
                        <DialogHeader>
                            <DialogTitle>Details</DialogTitle>
                            <DialogDescription>A sheet with a chip row.</DialogDescription>
                        </DialogHeader>
                        <div class="ps-rows">
                            <div class="ps-chips" data-testid="chips">
                                <span v-for="i in 24" :key="i" class="ps-chip">Chip {{ i }}</span>
                            </div>
                            <div v-for="i in rows" :key="i" class="ps-row">Row {{ i }}</div>
                        </div>
                    </SheetContent>
                </Dialog>
            </template>
            <template v-else-if="s === 'ndlg-sel' || s === 'dlg-sel'">
                <Dialog v-model:open="open" :modal="s === 'dlg-sel'">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit</DialogTitle>
                            <DialogDescription>A dialog with a select in it.</DialogDescription>
                        </DialogHeader>
                        <Select v-model="value2">
                            <SelectTrigger data-testid="trigger2" aria-label="Window">
                                <SelectValue placeholder="Window" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="i in 6" :key="i" :value="'w' + i">Window {{ i }}</SelectItem>
                            </SelectContent>
                        </Select>
                        <p class="ps-para" data-testid="far4">Picked: <span data-testid="picked">{{ value2 ?? "none" }}</span></p>
                    </DialogContent>
                </Dialog>
            </template>
            <template v-else-if="s === 'dlg-field'">
                <!-- A modal Dialog with a text field; `dismiss` is `locked` or `free`. -->
                <Dialog v-model:open="open">
                    <DialogTrigger as-child>
                        <Button data-testid="trigger">Rename</Button>
                    </DialogTrigger>
                    <DialogContent :dismiss="dismiss">
                        <DialogHeader>
                            <DialogTitle>Rename</DialogTitle>
                            <DialogDescription>A dialog with a text field.</DialogDescription>
                        </DialogHeader>
                        <input id="field" data-testid="field" type="text" aria-label="Name" class="ps-field" />
                    </DialogContent>
                </Dialog>
            </template>
            <template v-else-if="s === 'ob-control'">
                <!-- The engine control: a fixed box that is a scroll container with no
                     scrollable overflow and `overscroll-behavior: contain`. -->
                <div class="ps-ob" data-testid="ob">A box that fits, contain</div>
            </template>

            <template v-else-if="s !== 'dock-select'">
                <span data-testid="trigger" class="ps-plain">No surface</span>
            </template>
        </div>

        <div v-for="i in 30" :key="'b' + i" class="ps-block">Below {{ i }}</div>

        <div v-if="s === 'dock-select'" class="ps-foot">
            <GlassDock :collapse="false" aria-label="Tools">
                <Select v-model="value">
                    <DockTrigger for="select" aria-label="Region" data-testid="trigger">
                        <SelectValue placeholder="Region" />
                    </DockTrigger>
                    <SelectContent>
                        <SelectItem v-for="i in rows" :key="i" :value="'v' + i">Option {{ i }}</SelectItem>
                    </SelectContent>
                </Select>
            </GlassDock>
        </div>
    </div>
</template>

<style>
.ps-page {
    padding: 16px;
}
.ps-block {
    block-size: 120px;
    margin-block-end: 8px;
    border-radius: 12px;
    background: color-mix(in oklab, var(--foreground) 6%, transparent);
    padding: 12px;
}
.ps-stage {
    display: flex;
    gap: 12px;
    align-items: center;
    min-block-size: 120px;
    padding: 12px;
}
.ps-row {
    padding: 12px 4px;
    border-block-end: 1px solid color-mix(in oklab, var(--foreground) 8%, transparent);
}
.ps-para {
    margin-block: 8px;
}
.ps-drawer-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding: 0 1rem 0.5rem;
}
.ps-drawer-title {
    padding: 1rem;
}
.ps-drawer-foot {
    padding: 1rem;
}
.ps-foot {
    position: fixed;
    inset-inline: 0;
    inset-block-end: 16px;
    display: flex;
    justify-content: center;
    z-index: 40;
}
.ps-press {
    position: fixed;
    inset-block-start: 8px;
    inset-inline-end: 8px;
    inline-size: 80px;
    block-size: 44px;
    z-index: 30;
}
.ps-narrow {
    inline-size: 134px;
}
[data-slot="sheet-content"].ps-pdrawer {
    max-block-size: 90dvh;
    display: flex;
    flex-direction: column;
}
[data-slot="sheet-content"].ps-pdrawer > [data-slot="sheet-content-region"] {
    display: flex;
    flex-direction: column;
    min-block-size: 0;
    gap: 0;
}
.ps-pdrawer-sheet {
    display: flex;
    flex-direction: column;
    min-block-size: 0;
    max-block-size: 100%;
}
.ps-pdrawer-head {
    display: flex;
    flex: none;
    flex-direction: row;
    align-items: center;
    min-block-size: 44px;
}
.ps-pdrawer-body {
    flex: 0 1 auto;
    min-block-size: 0;
    margin-block-start: 0.75rem;
    padding-block-end: 1rem;
    overflow-y: auto;
    overscroll-behavior: contain;
}
.ps-ob {
    position: fixed;
    inset-inline: 16px;
    inset-block-end: 16px;
    block-size: 200px;
    overflow-y: auto;
    overscroll-behavior: contain;
    border-radius: 16px;
    background: color-mix(in oklab, var(--foreground) 12%, var(--background));
    padding: 16px;
    z-index: 60;
}
.ps-field {
    inline-size: 100%;
    padding: 8px;
    border: 1px solid color-mix(in oklab, var(--foreground) 30%, transparent);
    border-radius: 8px;
}
.ps-chips {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-block: 8px;
}
.ps-chip {
    flex: none;
    padding: 8px 14px;
    border-radius: 999px;
    background: color-mix(in oklab, var(--foreground) 10%, transparent);
}
</style>
