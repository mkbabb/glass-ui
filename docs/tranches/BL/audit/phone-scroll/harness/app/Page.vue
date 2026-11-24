<script setup lang="ts">
// The phone-scroll page: one surface per load, a page tall enough to scroll both ways
// behind it. ?s=<surface>&n=<rows>. Copied into <tree>/demo/__phone/ by build-tree.sh.
import { ref } from "vue";
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

const value = ref<string>();
const open = ref(false);
const rung = ref<number | null>(0.7);
const query = ref("");
</script>

<template>
    <div class="ps-page" :data-s="s">
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
</style>
