<script setup lang="ts">
// v8's witness page: the critic's page of 2026-11-27 (record/inspect/critic-sci3/Sci.vue)
// with five cells added for M1 and M2: a vertical strip beside a paragraph in a flex row,
// a strip whose choice changes from code (window.__prog), a header strip whose last tab
// is chosen at open, and a per-frame reading of the last-selected strip from mount
// (window.__loadFrames) and of any strip on request (window.__frames).
import { ref } from "vue";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger } from "@glass/components/dialog";
import { SheetContent } from "@glass/components/sheet";
import { DockControl, GlassDock } from "@glass/components/dock";
import { SegmentedTabs } from "@glass/components/tabs";
import { Chip } from "@glass/components/chip";
import { Button } from "@glass/components/button";
import { ConfiguratorLayer } from "@glass/components/configurator";

const TABS3 = [
    { value: "map", label: "Map" },
    { value: "table", label: "Table" },
    { value: "chart", label: "Chart" },
];
const DOCK = ["Enrollment", "Expenditure", "Attendance", "Graduation", "Teachers", "Transportation", "Nutrition", "Facilities"];
const TABS8 = DOCK.map((d) => ({ value: d.toLowerCase(), label: d }));
const t = ref<Record<string, string>>({ hf: "map", ho: "enrollment", hl: "facilities", nfit: "map", nover: "enrollment", plain: "enrollment", vert: "enrollment", vrow: "map", last: "facilities", prog: "enrollment" });

type Frame = { t: number; sl: number | null; flag: boolean | null };
const readStrip = (sel: string): Frame => {
    const strip = document.querySelector<HTMLElement>(sel + " .segmented-tabs");
    return { t: Math.round(performance.now()), sl: strip ? Math.round(strip.scrollLeft * 10) / 10 : null, flag: strip ? strip.hasAttribute("data-overflow") : null };
};
// Each animation frame's reading of a strip, for `n` frames.
const frames = (sel: string, n: number) =>
    new Promise<Frame[]>((done) => {
        const out: Frame[] = [];
        const tick = () => {
            out.push(readStrip(sel));
            if (out.length < n) requestAnimationFrame(tick);
            else done(out);
        };
        requestAnimationFrame(tick);
    });
const w = window as unknown as Record<string, unknown>;
w.__loadFrames = frames('[data-testid="sel-last"]', 40);
w.__frames = frames;
w.__prog = (v: string) => {
    t.value.prog = v;
};
const sheetOpen = ref(false);
const rung = ref<number | null>(0.4);
const chipOn = ref(true);
const CODE = "transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);";
</script>

<template>
    <main class="sci-page">
        <section class="sci-box" data-testid="d-fit">
            <GlassDock :collapse="false" aria-label="Three seats">
                <DockControl v-for="d in ['Map', 'Table', 'Chart']" :key="d" shape="tab">{{ d }}</DockControl>
            </GlassDock>
        </section>
        <section class="sci-box" data-testid="d-sq">
            <GlassDock :collapse="false" aria-label="Three seats, squeezed">
                <DockControl v-for="d in ['Map', 'Table', 'Chart']" :key="d" shape="tab">{{ d }}</DockControl>
            </GlassDock>
        </section>
        <section class="sci-box" data-testid="d-8">
            <GlassDock :collapse="false" aria-label="Eight seats">
                <DockControl v-for="d in DOCK" :key="d" shape="tab">{{ d }}</DockControl>
            </GlassDock>
        </section>

        <section class="sci-col" data-testid="cfg-chip">
            <ConfiguratorLayer label="Groups" :default-open="true">
                <Chip v-model="chipOn" mode="selectable" class="w-full">Students with disabilities</Chip>
            </ConfiguratorLayer>
        </section>
        <section class="sci-col" data-testid="cfg-code">
            <ConfiguratorLayer label="Code" :default-open="true">
                <div class="sci-nowrap">{{ CODE }}</div>
            </ConfiguratorLayer>
        </section>
        <section class="sci-col" data-testid="cfg-closed">
            <ConfiguratorLayer label="Closed" :default-open="false">
                <div class="sci-wide">300 px</div>
            </ConfiguratorLayer>
        </section>

        <section class="sci-box" style="touch-action: none" data-testid="none-fit">
            <SegmentedTabs v-model="t.nfit" :options="TABS3" aria-label="View, none box" />
        </section>
        <section class="sci-box" style="touch-action: none; inline-size: 267px" data-testid="none-over">
            <SegmentedTabs v-model="t.nover" :options="TABS8" aria-label="Family, none box" />
        </section>
        <section class="sci-box" style="inline-size: 267px" data-testid="plain-over">
            <SegmentedTabs v-model="t.plain" :options="TABS8" aria-label="Family, plain box" />
        </section>

        <section class="sci-box" style="inline-size: 100px" data-testid="vert-narrow">
            <SegmentedTabs v-model="t.vert" :options="TABS8" orientation="vertical" aria-label="Family, vertical, narrow" />
        </section>
        <section class="sci-box" style="inline-size: 267px" data-testid="sel-last">
            <SegmentedTabs v-model="t.last" :options="TABS8" aria-label="Family, last selected" />
        </section>
        <section class="sci-box" style="inline-size: 267px" data-testid="sel-prog">
            <SegmentedTabs v-model="t.prog" :options="TABS8" aria-label="Family, chosen from code" />
        </section>
        <section class="sci-box sci-row" data-testid="vert-row">
            <SegmentedTabs v-model="t.vrow" :options="TABS3" orientation="vertical" aria-label="View, vertical, in a row" />
            <p>Enrollment by district and program, with the counts for each school year since 2015.</p>
        </section>

        <Dialog v-model:open="sheetOpen">
            <DialogTrigger as-child>
                <Button data-testid="open-sheet">Detented sheet</Button>
            </DialogTrigger>
            <SheetContent side="bottom" :detents="[0.4, 0.7, 1]" v-model:detent="rung" data-testid="sheet">
                <DialogHeader>
                    <DialogTitle>Measures</DialogTitle>
                    <div data-testid="hdr-fit"><SegmentedTabs v-model="t.hf" :options="TABS3" aria-label="View, header" /></div>
                    <div data-testid="hdr-over"><SegmentedTabs v-model="t.ho" :options="TABS8" aria-label="Family, header" /></div>
                    <div data-testid="hdr-last"><SegmentedTabs v-model="t.hl" :options="TABS8" aria-label="Family, header, last chosen" /></div>
                </DialogHeader>
                <div>
                    <p v-for="n in 12" :key="n">Row {{ n }}: enrollment by district and program.</p>
                </div>
            </SheetContent>
        </Dialog>

        <div class="sci-tail" aria-hidden="true" />
    </main>
</template>

<style>
.sci-page {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 16px;
    padding-block-start: 360px;
    /* A cell that runs past its box must not widen the document. */
    overflow-x: clip;
}
.sci-box {
    inline-size: 358px;
}
.sci-col {
    inline-size: 200px;
    max-block-size: 320px;
    overflow-y: auto;
}
.sci-row {
    display: flex;
    gap: 12px;
    align-items: start;
}
.sci-nowrap {
    white-space: nowrap;
}
.sci-wide {
    inline-size: 300px;
    block-size: 36px;
    border: 1px solid currentColor;
}
.sci-tail {
    block-size: 200vh;
}
</style>
