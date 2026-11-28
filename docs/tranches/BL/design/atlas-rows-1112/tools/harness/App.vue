<script setup lang="ts">
// One witness cell per load: ?cell=<name>. The probe (../witness.mjs) reads each cell
// from outside; this page only mounts glass surfaces as a consumer would.
import { onMounted, ref } from "vue";
import { Button } from "@glass/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@glass/components/card";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import { DataTable } from "@glass/components/data-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog";
import { GlassDock } from "@glass/components/dock";
import { ExpandableContainer } from "@glass/components/expandable-container";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@glass/components/select";
import { SheetContent } from "@glass/components/sheet";
import { SegmentedTabs } from "@glass/components/tabs";
import { Toaster, toast } from "@glass/components/toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@glass/components/tooltip";

const params = new URLSearchParams(location.search);
const cell = params.get("cell") ?? "";
const modal = params.get("modal") !== "0";
const activation = params.get("act") === "manual" ? "manual" : "automatic";

const lowerOpen = ref(false);
const topOpen = ref(false);
const expOpen = ref(false);
const popOpen = ref(params.get("open") === "1");
const fullOpen = ref(false);
const fullRung = ref<number | null>(1);
const sel = ref("a");
const tab = ref("t0");
const tabs = Array.from({ length: 9 }, (_, i) => ({ label: `Option ${i}`, value: `t${i}` }));
const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "state", label: "State", sortable: true },
    { key: "total", label: "Total", sortable: true, align: "right" as const },
];
const rows = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    name: `District ${i + 1}`,
    state: ["NC", "VA", "SC"][i % 3],
    total: 1000 + i * 37,
}));
const lines = Array.from({ length: 60 }, (_, i) => i + 1);

onMounted(() => {
    if (cell === "print") toast({ title: "Saved", description: "The view was saved.", duration: 600000 });
});
</script>

<template>
    <main :class="{ tall: ['dlg-scroll', 'dlg-pos', 'select', 'selgroup', 'stack-dialog', 'stack-sheet', 'stack-drawer', 'stack-expand', 'stack-sibling'].includes(cell) }">
        <!-- GL-6: the page as atlas prints it, with every floating surface up. -->
        <section v-if="cell === 'print'" class="cell">
            <Card data-t="card">
                <CardHeader><CardTitle>Reading</CardTitle></CardHeader>
                <CardContent>Body text on a card.</CardContent>
            </Card>
            <Button data-t="button">Act</Button>
            <Popover :default-open="true">
                <PopoverTrigger data-t="pop-trigger">Note</PopoverTrigger>
                <PopoverContent aria-label="Note" data-t="popover">A note on the figure.</PopoverContent>
            </Popover>
            <TooltipProvider>
                <Tooltip :default-open="true">
                    <TooltipTrigger as-child><Button size="sm" data-t="tip-trigger">Tip</Button></TooltipTrigger>
                    <TooltipContent data-t="tooltip">A hint.</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Toaster />
            <div class="foot">
                <GlassDock :collapse="false" aria-label="Tools" data-t="dock">
                    <Button size="sm">Seat</Button>
                </GlassDock>
            </div>
        </section>

        <section v-if="cell === 'print-dialog'" class="cell">
            <Dialog :default-open="true">
                <DialogContent data-t="dialog">
                    <DialogHeader>
                        <DialogTitle>Data</DialogTitle>
                        <DialogDescription>The rows of this figure.</DialogDescription>
                    </DialogHeader>
                    <p>Row one. Row two.</p>
                </DialogContent>
            </Dialog>
        </section>

        <section v-if="cell === 'print-sheet'" class="cell">
            <Dialog :default-open="true">
                <SheetContent side="right" data-t="sheet">
                    <DialogHeader>
                        <DialogTitle>Glossary</DialogTitle>
                        <DialogDescription>Terms used here.</DialogDescription>
                    </DialogHeader>
                    <p>A term and its meaning.</p>
                </SheetContent>
            </Dialog>
        </section>

        <!-- GL-7 -->
        <section v-if="cell === 'toggle'" class="cell">
            <DarkModeToggle data-t="toggle" />
        </section>

        <!-- GL-8 -->
        <section v-if="cell === 'popover'" class="cell">
            <Popover v-model:open="popOpen">
                <PopoverTrigger data-t="trigger">Note</PopoverTrigger>
                <PopoverContent aria-label="Note" data-t="content">A note.</PopoverContent>
            </Popover>
        </section>

        <!-- GL-8, the as-child arm: the trigger is the consumer's own Button. -->
        <section v-if="cell === 'popover-child'" class="cell">
            <Popover v-model:open="popOpen">
                <PopoverTrigger as-child>
                    <Button size="sm" data-t="trigger">Note</Button>
                </PopoverTrigger>
                <PopoverContent aria-label="Note" data-t="content">A note.</PopoverContent>
            </Popover>
        </section>

        <!-- GL-11: a scrolling Dialog body over a page that can scroll. -->
        <section v-if="cell === 'dlg-scroll' || cell === 'dlg-pos'" class="cell">
            <div class="spacer" />
            <Dialog v-model:open="lowerOpen" :modal="modal">
                <DialogTrigger as-child><Button data-t="trigger">Open</Button></DialogTrigger>
                <DialogContent :scroll="cell === 'dlg-scroll'" data-t="dialog">
                    <DialogHeader>
                        <DialogTitle>Rows</DialogTitle>
                        <DialogDescription>A long body.</DialogDescription>
                    </DialogHeader>
                    <template v-if="cell === 'dlg-scroll'">
                        <p v-for="i in lines" :key="i">Line {{ i }} of the body.</p>
                    </template>
                </DialogContent>
            </Dialog>
            <p data-t="marker">Below the trigger.</p>
        </section>

        <!-- GL-12: a Dialog opened from inside each lower surface. -->
        <section v-if="cell === 'stack-dialog' || cell === 'stack-sheet' || cell === 'stack-drawer'" class="cell">
            <Dialog v-model:open="lowerOpen" :modal="cell !== 'stack-drawer'">
                <DialogTrigger as-child><Button data-t="lower-trigger">Open lower</Button></DialogTrigger>
                <component
                    :is="cell === 'stack-dialog' ? DialogContent : SheetContent"
                    v-bind="cell === 'stack-dialog' ? {} : { side: 'right' }"
                    data-t="lower"
                >
                    <DialogHeader>
                        <DialogTitle>Lower</DialogTitle>
                        <DialogDescription>The surface below.</DialogDescription>
                    </DialogHeader>
                    <Dialog v-model:open="topOpen">
                        <DialogTrigger as-child><Button data-t="top-trigger">Open top</Button></DialogTrigger>
                        <DialogContent data-t="top">
                            <DialogHeader>
                                <DialogTitle>Top</DialogTitle>
                                <DialogDescription>The surface above.</DialogDescription>
                            </DialogHeader>
                            <Button data-t="top-action">Act</Button>
                        </DialogContent>
                    </Dialog>
                </component>
            </Dialog>
        </section>

        <!-- atlas's own pairing: the two Dialogs are declared side by side (the top one
             first), and the lower one opens the top one. -->
        <section v-if="cell === 'stack-sibling'" class="cell">
            <Dialog v-model:open="topOpen">
                <DialogContent data-t="top">
                    <DialogHeader>
                        <DialogTitle>Top</DialogTitle>
                        <DialogDescription>The surface above.</DialogDescription>
                    </DialogHeader>
                    <Button data-t="top-action">Act</Button>
                </DialogContent>
            </Dialog>
            <Dialog v-model:open="lowerOpen">
                <DialogTrigger as-child><Button data-t="lower-trigger">Open lower</Button></DialogTrigger>
                <DialogContent data-t="lower">
                    <DialogHeader>
                        <DialogTitle>Lower</DialogTitle>
                        <DialogDescription>The surface below.</DialogDescription>
                    </DialogHeader>
                    <Button data-t="top-trigger" @click="topOpen = true">Open top</Button>
                </DialogContent>
            </Dialog>
        </section>

        <section v-if="cell === 'stack-expand'" class="cell">
            <ExpandableContainer v-model:open="expOpen" data-t="lower">
                <div class="cell">
                    <p>An enlarged figure.</p>
                    <Dialog v-model:open="topOpen">
                        <DialogTrigger as-child><Button data-t="top-trigger">Open top</Button></DialogTrigger>
                        <DialogContent data-t="top">
                            <DialogHeader>
                                <DialogTitle>Top</DialogTitle>
                                <DialogDescription>The surface above.</DialogDescription>
                            </DialogHeader>
                            <Button data-t="top-action">Act</Button>
                        </DialogContent>
                    </Dialog>
                </div>
            </ExpandableContainer>
        </section>

        <!-- GL-14 and the sort buttons' pointer reading. -->
        <section v-if="cell === 'button'" class="cell">
            <Button size="sm" data-t="sm">Small</Button>
            <Button size="md" data-t="md">Medium</Button>
        </section>

        <!-- GL-17: a Select low on a page that can scroll. -->
        <section v-if="cell === 'select'" class="cell">
            <div class="spacer" />
            <Select v-model="sel">
                <SelectTrigger data-t="trigger" aria-label="Section"><SelectValue /></SelectTrigger>
                <SelectContent data-t="content">
                    <SelectItem v-for="k in ['a', 'b', 'c', 'd', 'e', 'f']" :key="k" :value="k" :data-t="'item-' + k">
                        Section {{ k.toUpperCase() }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </section>

        <!-- GL-18: a strip in its own run, inside an outer scroller, half below the page fold. -->
        <section v-if="cell === 'selgroup'" class="cell">
            <div class="pre" />
            <div class="outer" data-t="outer">
                <div class="outer-pad" />
                <div class="run" data-t="run">
                    <SegmentedTabs v-model="tab" :options="tabs" :activation="activation" aria-label="Views" data-t="strip" />
                </div>
                <div class="outer-pad" />
            </div>
        </section>

        <!-- GL-5 (e) and the sort buttons. -->
        <section v-if="cell === 'table'" class="cell">
            <DataTable :columns="columns" :rows="rows" row-key="id" aria-label="Districts" data-t="table" />
        </section>

        <!-- GL-13: a full-height Sheet on a phone. -->
        <section v-if="cell === 'sheet-full'" class="cell">
            <Dialog v-model:open="fullOpen">
                <DialogTrigger as-child><Button data-t="trigger">Open</Button></DialogTrigger>
                <SheetContent side="bottom" :detents="[1]" v-model:detent="fullRung" data-t="sheet">
                    <DialogHeader>
                        <DialogTitle>Glossary</DialogTitle>
                        <DialogDescription>Every term.</DialogDescription>
                    </DialogHeader>
                    <p>A term.</p>
                </SheetContent>
            </Dialog>
        </section>
    </main>
</template>
