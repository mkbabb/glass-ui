<script setup lang="ts">
// The overflow study's stress page: each glass part with long labels, long unbroken
// tokens and narrow parents, opened by a button with a test id (ovf-open-<case>).
// The first case is the shape of atlas's Filters view: a non-modal right Sheet whose
// body scrolls on the block axis (atlas's `.cp-drawer__body { overflow-y: auto }`) and
// holds dock rows, a segmented switch, a toggle strip, chips, a select and a field.
import { ref } from "vue";
import { Dialog, DialogDescription, DialogTitle, DialogTrigger } from "@glass/components/dialog";
import { SheetContent } from "@glass/components/sheet";
import { DockControl, GlassDock } from "@glass/components/dock";
import { SegmentedTabs } from "@glass/components/tabs";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import { Chip } from "@glass/components/chip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@glass/components/select";
import { Input } from "@glass/components/input";
import { Button } from "@glass/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@glass/components/menu";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@glass/components/command";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@glass/components/tooltip";
import { Toaster, toast } from "@glass/components/toast";
import { NumberField, NumberFieldInput, NumberFieldStep } from "@glass/components/number-field";
import { PagerDots } from "@glass/components/pager-dots";
import { Slider } from "@glass/components/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@glass/components/accordion";
// The fold's cells (/ovf.html?fold): the critique's compositions, read on both builds.
import { Switch } from "@glass/components/switch";
import { LabeledField } from "@glass/components/labeled-field";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@glass/components/table";
import { EasingPicker } from "@glass/components/easing";
import { Carousel, CarouselContent, CarouselItem, CarouselPager } from "@glass/components/carousel";
import { DockLayer, DockLayerGroup } from "@glass/components/dock";
// Round 2 (/ovf.html?fold): value.js's four items.
import { DialogContent, DialogHeader, DialogFooter } from "@glass/components/dialog";
import { Card } from "@glass/components/card";
import { FadingScroll } from "@glass/components/fading-scroll";
import { DeckSlide, DeckStage, useDeck } from "@glass/components/deck";

const LONG = "Quarterly enrollment by district and program, all years";
const TOKEN = "district_enrollment_by_program_quarterly_2019-2026.csv";

const filtersOpen = ref(false);
const detentOpen = ref(false);
const rung = ref<number | null>(0.4);
const scope = ref("district");
const SCOPES = [
    { value: "district", label: "Every district in the state" },
    { value: "region", label: "Economic development region" },
    { value: "school", label: "Individual schools" },
];
const years = ref<string[]>(["2024"]);
const YEARS = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
const chips = ref<Record<string, boolean>>({ a: true, b: false, c: true, d: false });
const CHIPS = { a: "Economically disadvantaged", b: "English learners", c: "Students with disabilities", d: TOKEN };
const measure = ref("Average daily membership (ADM), final");
const MEASURES = ["Average daily membership (ADM), final", "Per-pupil expenditure, local and state combined", TOKEN];
const DOCK = ["Enrollment", "Expenditure", "Attendance", "Graduation", "Teachers", "Transportation", "Nutrition", "Facilities"];
const pick = ref("a");
const PICKS = [
    { value: "a", label: LONG },
    { value: "b", label: TOKEN },
];
const num = ref(123456789);
const page = ref(0);
const vol = ref(40);

// ── the fold page: /ovf.html?fold renders only these cells ──
const fold = typeof location !== "undefined" && new URLSearchParams(location.search).has("fold");
const TABS8 = DOCK.map((d) => ({ value: d.toLowerCase(), label: d }));
const tab8 = ref("enrollment");
const ROWS = [
    { name: "Wake County Schools", status: "Active" },
    { name: "Durham Public Schools", status: "Pending" },
];
const chipOn = ref(true);
const atlasOpen = ref(false);
const VIZ = [
    { value: "source", label: "Per-pupil expenditure by source" },
    { value: "share", label: "Share of statewide enrollment" },
    { value: "change", label: "Change from the year before" },
];
const vizOpt = ref("source");
const vizMeasure = ref(MEASURES[0]);
const vizShow = ref(true);
const layer = ref("assets");
const easing = ref();
// round 2: value.js's items
const gType = ref("linear");
const gSpace = ref("oklch");
const gHue = ref("shorter");
const kfDir = ref("alternate-reverse");
const easing2 = ref();
const scrollDialogOpen = ref(false);
const scrollSheetOpen = ref(false);
const bodySheetOpen = ref(false);
const bodyRung = ref<number | null>(0.7);
const deckV = useDeck(3, { axis: "vertical" });
const ROWS8 = Array.from({ length: 8 }, (_, i) => `Row ${i + 1}: ${LONG}`);
</script>

<template>
    <TooltipProvider :delay-duration="0">
        <main v-if="fold" class="ovf-page" data-testid="fold">
            <h1 class="ovf-h">Overflow fold cells</h1>

            <!-- eight SegmentedTabs options in a 267 px drawer-like box -->
            <div class="fold-box fold-scroll" style="inline-size: 267px" data-testid="fold-tabs8">
                <SegmentedTabs v-model="tab8" :options="TABS8" aria-label="Measure family, eight" />
            </div>

            <!-- a glass Table with Chip and small Button cells in a 300 px box -->
            <div class="fold-box" style="inline-size: 300px" data-testid="fold-table">
                <Table>
                    <TableHeader>
                        <TableRow><TableHead>District</TableHead><TableHead>Status</TableHead><TableHead>File</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="r in ROWS" :key="r.name">
                            <TableCell>{{ r.name }}</TableCell>
                            <TableCell><Chip size="sm">{{ r.status }}</Chip></TableCell>
                            <TableCell><Button size="sm">Download</Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <!-- four Buttons in a 240 px flex row -->
            <div class="fold-row" style="inline-size: 240px" data-testid="fold-buttons">
                <Button>Download</Button>
                <Button>Save as draft</Button>
                <Button>Cancel</Button>
                <Button>Publish</Button>
            </div>

            <!-- a full-width selected Chip in a 300 px block-axis scroller, bare and padded -->
            <div class="fold-box fold-scroll" style="inline-size: 300px" data-testid="fold-chip-bare">
                <Chip v-model="chipOn" mode="selectable" class="fold-full">Students with disabilities</Chip>
            </div>
            <div class="fold-box fold-scroll" style="inline-size: 300px; padding-inline: 16px" data-testid="fold-chip-pad">
                <Chip v-model="chipOn" mode="selectable" class="fold-full">Students with disabilities</Chip>
            </div>

            <!-- a three-seat dock whose seats all show -->
            <div class="fold-box" style="inline-size: 300px" data-testid="fold-dock3">
                <GlassDock :collapse="false" aria-label="Three seats">
                    <DockControl v-for="d in ['Map', 'Table', 'Chart']" :key="d" shape="tab">{{ d }}</DockControl>
                </GlassDock>
            </div>

            <!-- atlas's Filters drawer: atlas's body CSS, three LabeledField rows -->
            <Dialog v-model:open="atlasOpen" :modal="false">
                <DialogTrigger as-child>
                    <Button data-testid="fold-open-atlas">Atlas filters</Button>
                </DialogTrigger>
                <SheetContent side="right" class="cp-drawer" data-testid="fold-atlas" @interact-outside.prevent>
                    <DialogTitle class="cp-drawer__title">Filters</DialogTitle>
                    <DialogDescription class="sr-only">Filter the dashboard.</DialogDescription>
                    <div class="cp-drawer__body" data-testid="fold-atlas-body">
                        <div class="viz-options-band">
                            <p class="viz-options-band__crest">Options</p>
                            <div class="viz-options-band__rows">
                                <LabeledField label="Measure view" class="viz-options-band__row" v-slot="{ controlId, labelledBy }">
                                    <ToggleGroup :id="controlId" v-model="vizOpt" type="single" :aria-labelledby="labelledBy" class="flex flex-wrap gap-1" data-testid="fold-atlas-toggle">
                                        <ToggleGroupItem v-for="ch in VIZ" :key="ch.value" :value="ch.value" :aria-label="ch.label" class="min-h-[44px] text-(length:--type-caption)">{{ ch.label }}</ToggleGroupItem>
                                    </ToggleGroup>
                                </LabeledField>
                                <LabeledField label="Measure" class="viz-options-band__row" v-slot="{ controlId, labelledBy }">
                                    <Select v-model="vizMeasure">
                                        <SelectTrigger :id="controlId" :aria-labelledby="labelledBy" class="viz-options-band__select min-h-[44px] text-(length:--type-caption)"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem v-for="m in MEASURES" :key="m" :value="m">{{ m }}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </LabeledField>
                                <LabeledField label="Show the state average" class="viz-options-band__row" v-slot="{ controlId, labelledBy }">
                                    <Switch :id="controlId" v-model="vizShow" :aria-labelledby="labelledBy" />
                                </LabeledField>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Dialog>

            <!-- three interactive parts no demo page mounts -->
            <div class="fold-box" style="inline-size: 300px" data-testid="fold-m4">
                <EasingPicker v-model="easing" :initial="{ mode: 'steps' }" />
                <Carousel aria-label="Pages">
                    <CarouselContent>
                        <CarouselItem v-for="(n, i) in 5" :key="n" :index="i" :label="`Page ${n}`">
                            <div class="fold-slide">Page {{ n }}</div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPager />
                </Carousel>
                <GlassDock :collapse="false" aria-label="Layers">
                    <DockLayerGroup v-model:active="layer">
                        <DockLayer id="assets" label="Assets">
                            <DockControl shape="tab">Images</DockControl>
                            <DockControl shape="tab">Fonts</DockControl>
                        </DockLayer>
                        <DockLayer id="layers" label="Layers">
                            <DockControl shape="tab">Frame</DockControl>
                        </DockLayer>
                        <DockLayer id="history" label="History">
                            <DockControl shape="tab">Today</DockControl>
                        </DockLayer>
                    </DockLayerGroup>
                </GlassDock>
            </div>

            <!-- round 2, value.js's item 1: a three-seat dock in a host narrower than it asks -->
            <div class="fold-box" style="inline-size: 300px" data-testid="fold-dock-tight">
                <GlassDock :collapse="false" aria-label="Three seats, tight">
                    <DockControl v-for="d in ['Map', 'Table', 'Chart']" :key="d" shape="tab">{{ d }}</DockControl>
                </GlassDock>
            </div>

            <!-- item 2: value.js's Gradient band, three LabeledFields in 73 px columns -->
            <div class="fold-grid3" style="inline-size: 243px" data-testid="fold-lf3">
                <LabeledField class="min-w-0" label="Type" :control-labelable="false" v-slot="{ labelledBy }">
                    <Select v-model="gType">
                        <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="linear">Linear</SelectItem>
                            <SelectItem value="radial">Radial</SelectItem>
                        </SelectContent>
                    </Select>
                </LabeledField>
                <LabeledField class="min-w-0" label="Color space" :control-labelable="false" v-slot="{ labelledBy }">
                    <Select v-model="gSpace">
                        <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="oklch">OKLCh</SelectItem>
                            <SelectItem value="oklab">OKLab</SelectItem>
                        </SelectContent>
                    </Select>
                </LabeledField>
                <LabeledField class="min-w-0" label="Hue method" :control-labelable="false" v-slot="{ labelledBy }">
                    <Select v-model="gHue">
                        <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="shorter">Shorter</SelectItem>
                            <SelectItem value="increasing">Increasing</SelectItem>
                        </SelectContent>
                    </Select>
                </LabeledField>
            </div>

            <!-- item 2: keyframes' Controls column, a 120 px column -->
            <div class="fold-box" style="inline-size: 120px" data-testid="fold-lf-kf">
                <LabeledField label="Direction" v-slot="{ controlId, labelledBy }">
                    <Select v-model="kfDir">
                        <SelectTrigger :id="controlId" class="gap-1.5 pe-10" :aria-labelledby="labelledBy">
                            <span class="fold-glyph" aria-hidden="true" />
                            <SelectValue class="min-w-0 flex-1 text-start" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="normal">normal</SelectItem>
                            <SelectItem value="alternate-reverse">alternate-reverse</SelectItem>
                        </SelectContent>
                    </Select>
                </LabeledField>
            </div>

            <!-- item 3: EasingPicker in steps mode; the plan sets the column's width -->
            <div class="fold-box" style="inline-size: 200px" data-testid="fold-easing">
                <EasingPicker v-model="easing2" :initial="{ mode: 'steps' }" />
            </div>

            <!-- item 4: glass's vertical scrollers, each in a 300 px column -->
            <div class="fold-box" style="inline-size: 300px" data-testid="fold-v4">
                <FadingScroll axis="y" style="max-block-size: 120px" data-testid="v4-fading">
                    <p v-for="r in ROWS8" :key="r" class="fold-p">{{ r }}</p>
                </FadingScroll>
                <Card>
                    <div class="card-scroll-host" style="max-block-size: 120px" data-testid="v4-card">
                        <p v-for="r in ROWS8" :key="r" class="fold-p">{{ r }}</p>
                    </div>
                </Card>
                <Carousel orientation="vertical" aria-label="Pages, vertical" class="fold-vcarousel" data-testid="v4-carousel">
                    <CarouselContent>
                        <CarouselItem v-for="(n, i) in 3" :key="n" :index="i" :label="`Page ${n}`">
                            <div class="fold-slide">Page {{ n }}</div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
                <div class="fold-deck" data-testid="v4-deck">
                    <DeckStage :deck="deckV" register="snap" :ratio="null" aria-label="Slides, vertical">
                        <DeckSlide v-for="(n, i) in 3" :key="n" :index="i">
                            <p v-for="r in ROWS8" :key="r" class="fold-p">{{ r }}</p>
                        </DeckSlide>
                    </DeckStage>
                </div>
                <Dialog v-model:open="scrollDialogOpen">
                    <DialogTrigger as-child>
                        <Button data-testid="fold-open-dialog-scroll">Dialog that scrolls</Button>
                    </DialogTrigger>
                    <DialogContent :scroll="true" data-testid="v4-dialog">
                        <DialogTitle>Rows</DialogTitle>
                        <DialogDescription>Every row of the table.</DialogDescription>
                        <p v-for="n in 30" :key="n" class="fold-p">Row {{ n }}: {{ LONG }}</p>
                    </DialogContent>
                </Dialog>
                <Dialog v-model:open="scrollSheetOpen" :modal="false">
                    <DialogTrigger as-child>
                        <Button data-testid="fold-open-sheet-scroll">Sheet that scrolls</Button>
                    </DialogTrigger>
                    <SheetContent side="right" :scroll="true" data-testid="v4-sheet" @interact-outside.prevent>
                        <DialogTitle>Rows</DialogTitle>
                        <DialogDescription>Every row of the table.</DialogDescription>
                        <p v-for="n in 30" :key="n" class="fold-p">Row {{ n }}: {{ LONG }}</p>
                    </SheetContent>
                </Dialog>
                <Dialog v-model:open="bodySheetOpen">
                    <DialogTrigger as-child>
                        <Button data-testid="fold-open-sheet-body">Detented sheet</Button>
                    </DialogTrigger>
                    <SheetContent side="bottom" :detents="[0.4, 0.7, 1]" v-model:detent="bodyRung" data-testid="v4-detents">
                        <DialogHeader>
                            <DialogTitle>Rows</DialogTitle>
                            <DialogDescription>Every row of the table.</DialogDescription>
                        </DialogHeader>
                        <div data-testid="v4-detents-body">
                            <p v-for="n in 30" :key="n" class="fold-p">Row {{ n }}: {{ LONG }}</p>
                        </div>
                        <DialogFooter><Button>Done</Button></DialogFooter>
                    </SheetContent>
                </Dialog>
            </div>
        </main>
        <main v-else class="ovf-page">
            <h1 class="ovf-h">Overflow stress</h1>

            <!-- 1. atlas's Filters view: non-modal right sheet, a block-axis body scroller -->
            <Dialog v-model:open="filtersOpen" :modal="false">
                <DialogTrigger as-child>
                    <Button data-testid="ovf-open-filters">Filters</Button>
                </DialogTrigger>
                <SheetContent side="right" class="ovf-drawer" data-testid="ovf-filters" @interact-outside.prevent>
                    <DialogTitle class="ovf-drawer__title">Filters</DialogTitle>
                    <DialogDescription class="sr-only">Filter the dashboard.</DialogDescription>
                    <div class="ovf-drawer__body" data-testid="ovf-filters-body">
                        <section class="ovf-row">
                            <span class="ovf-label">Measure family</span>
                            <GlassDock :collapse="false" aria-label="Measure family">
                                <DockControl v-for="d in DOCK" :key="d" shape="tab">{{ d }}</DockControl>
                            </GlassDock>
                        </section>
                        <section class="ovf-row">
                            <span class="ovf-label">Scope</span>
                            <SegmentedTabs v-model="scope" :options="SCOPES" aria-label="Scope" />
                        </section>
                        <section class="ovf-row">
                            <span class="ovf-label">Years</span>
                            <ToggleGroup v-model="years" type="multiple" aria-label="Years">
                                <ToggleGroupItem v-for="y in YEARS" :key="y" :value="y">{{ y }}</ToggleGroupItem>
                            </ToggleGroup>
                        </section>
                        <section class="ovf-row ovf-chips">
                            <Chip v-for="(label, k) in CHIPS" :key="k" v-model="chips[k]" mode="selectable">{{ label }}</Chip>
                        </section>
                        <section class="ovf-row">
                            <span class="ovf-label">Measure</span>
                            <Select v-model="measure">
                                <SelectTrigger data-testid="ovf-filters-select"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="m in MEASURES" :key="m" :value="m">{{ m }}</SelectItem>
                                </SelectContent>
                            </Select>
                        </section>
                        <section class="ovf-row">
                            <span class="ovf-label">Saved view name</span>
                            <Input :model-value="`${LONG} ${TOKEN}`" aria-label="Saved view name" />
                        </section>
                    </div>
                </SheetContent>
            </Dialog>

            <!-- 2. a detented bottom sheet with the same rows -->
            <Dialog v-model:open="detentOpen">
                <DialogTrigger as-child>
                    <Button data-testid="ovf-open-detents">Detented sheet</Button>
                </DialogTrigger>
                <SheetContent side="bottom" :detents="[0.4, 0.7, 1]" v-model:detent="rung" data-testid="ovf-detents">
                    <DialogTitle>{{ LONG }}</DialogTitle>
                    <DialogDescription>{{ TOKEN }}</DialogDescription>
                    <div class="ovf-rows">
                        <GlassDock :collapse="false" aria-label="Measure family, detented">
                            <DockControl v-for="d in DOCK" :key="d" shape="tab">{{ d }}</DockControl>
                        </GlassDock>
                        <SegmentedTabs v-model="scope" :options="SCOPES" aria-label="Scope, detented" />
                        <ToggleGroup v-model="years" type="multiple" aria-label="Years, detented">
                            <ToggleGroupItem v-for="y in YEARS" :key="y" :value="y">{{ y }}</ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </SheetContent>
            </Dialog>

            <!-- 3. a menu with long rows and a submenu -->
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button data-testid="ovf-open-menu">Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>{{ LONG }}<DropdownMenuShortcut>⌘⇧E</DropdownMenuShortcut></DropdownMenuItem>
                    <DropdownMenuItem>{{ TOKEN }}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger data-testid="ovf-sub">Export as {{ TOKEN }}</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>{{ LONG }}</DropdownMenuItem>
                            <DropdownMenuItem>{{ TOKEN }}</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>

            <!-- 4. a select with long options -->
            <div class="ovf-narrow">
                <Select v-model="pick">
                    <SelectTrigger data-testid="ovf-open-select"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="p in PICKS" :key="p.value" :value="p.value">{{ p.label }}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <!-- 5. a popover with a long token -->
            <Popover>
                <PopoverTrigger as-child>
                    <Button data-testid="ovf-open-popover">Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <p>{{ LONG }}</p>
                    <p>{{ TOKEN }}{{ TOKEN }}</p>
                </PopoverContent>
            </Popover>

            <!-- 6. a tooltip with a long token -->
            <Tooltip>
                <TooltipTrigger as-child>
                    <Button data-testid="ovf-open-tooltip">Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>{{ TOKEN }}{{ TOKEN }}</TooltipContent>
            </Tooltip>

            <!-- 7. a toast with long words -->
            <Button data-testid="ovf-open-toast" @click="toast({ title: TOKEN + TOKEN, description: LONG })">Toast</Button>

            <!-- 8. a narrow column of parts -->
            <div class="ovf-narrow" data-testid="ovf-narrow">
                <Command class="glass-floating">
                    <CommandInput :model-value="TOKEN" placeholder="Type a command" aria-label="Search" />
                    <CommandList>
                        <CommandGroup heading="Recent">
                            <CommandItem :value="LONG">{{ LONG }}</CommandItem>
                            <CommandItem :value="TOKEN">{{ TOKEN }}</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
                <SegmentedTabs v-model="scope" :options="SCOPES" aria-label="Scope, narrow" />
                <ToggleGroup v-model="years" type="multiple" aria-label="Years, narrow">
                    <ToggleGroupItem v-for="y in YEARS" :key="y" :value="y">{{ y }}</ToggleGroupItem>
                </ToggleGroup>
                <GlassDock :collapse="false" aria-label="Measure family, narrow">
                    <DockControl v-for="d in DOCK" :key="d" shape="tab">{{ d }}</DockControl>
                </GlassDock>
                <NumberField v-model="num" aria-label="Number">
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput />
                    <NumberFieldStep direction="increment" />
                </NumberField>
                <PagerDots v-model:active="page" :count="7" aria-label="Pages" />
                <Slider v-model="vol" :max="100" aria-label="Volume" />
                <Accordion type="single" collapsible default-value="x">
                    <AccordionItem value="x">
                        <AccordionTrigger>{{ TOKEN }}</AccordionTrigger>
                        <AccordionContent>{{ TOKEN }} {{ LONG }}</AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Chip v-for="(label, k) in CHIPS" :key="'n' + k" v-model="chips[k]" mode="selectable">{{ label }}</Chip>
            </div>
        </main>
        <Toaster />
    </TooltipProvider>
</template>

<style scoped>
.ovf-page {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-3);
    padding: var(--sp-4);
    align-items: flex-start;
}
.ovf-h {
    inline-size: 100%;
    font-size: 1rem;
}
.ovf-narrow {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    inline-size: 200px;
}
.ovf-rows {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
}
/* atlas's drawer shell (FilterPanel.vue), verbatim in the parts that bound the body */
.ovf-drawer__title {
    margin: 0;
    padding: 0.95rem 1rem 0.6rem;
}
.ovf-drawer__body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding: 0 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
}
.ovf-row {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
}
.ovf-chips {
    flex-direction: row;
    flex-wrap: wrap;
}
.ovf-label {
    font-size: var(--text-small, 0.875rem);
}
/* the fold's cells */
.fold-box {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
}
.fold-scroll {
    overflow-y: auto;
}
.fold-row {
    display: flex;
    gap: 8px;
}
.fold-full {
    inline-size: 100%;
}
.fold-grid3 {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
}
.fold-glyph {
    display: inline-block;
    inline-size: 1.5em;
    block-size: 1em;
    flex: none;
    border: 1.5px solid currentColor;
    border-radius: 3px;
}
.fold-p {
    margin: 0 0 0.5rem;
}
.fold-vcarousel :deep(.carousel-strip) {
    block-size: 160px;
}
.fold-deck {
    block-size: 200px;
}
.fold-deck :deep(.deck-stage) {
    block-size: 100%;
}
.fold-slide {
    block-size: 120px;
    display: grid;
    place-items: center;
}
/* atlas's drawer shell and options band (FilterPanel.vue, VizOptionsBand.vue), verbatim */
.cp-drawer__title {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin: 0;
    padding: 0.95rem 1rem 0.6rem;
    border-bottom: 1px solid var(--border);
    font-family: var(--font-display);
    font-size: 1rem;
    color: var(--foreground);
}
.cp-drawer__body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding: 0 1rem 0.5rem;
}
.viz-options-band {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.viz-options-band__crest {
    margin: 0;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted-foreground);
}
.viz-options-band__rows {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
}
.viz-options-band__rows :deep(.viz-options-band__row) {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
.viz-options-band__rows :deep(.viz-options-band__row [data-slot="label"]) {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--foreground);
}
.viz-options-band__select {
    inline-size: 100%;
}
</style>
