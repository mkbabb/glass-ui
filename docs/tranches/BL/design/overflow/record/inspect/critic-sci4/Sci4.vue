<script setup lang="ts">
// The fifth critic's witness page (2026-11-27, on v8). Cells: ConfiguratorLayers whose bodies
// hold content that shrinks to the layer at 11.1.1 (a ConfiguratorRow with a long token name,
// a truncated label, a break-word value, a SegmentedTabs strip) and one that cannot (a 300 px
// box); a strip set inline in a block box; a strip the reader pans before a tab's label changes;
// a right-to-left strip; a vertical strip in a 100 px box; a strip whose box width animates;
// a three-seat dock.
import { ref } from "vue";
import { SegmentedTabs } from "@glass/components/tabs";
import { ConfiguratorLayer, ConfiguratorRow } from "@glass/components/configurator";
import { DockControl, GlassDock } from "@glass/components/dock";

const LABELS = ["Enrollment", "Expenditure", "Attendance", "Graduation", "Teachers", "Transportation", "Nutrition", "Facilities"];
const TABS8 = LABELS.map((l) => ({ value: l.toLowerCase(), label: l }));
const PAN8 = ref(LABELS.map((l) => ({ value: l.toLowerCase(), label: l })));
const t = ref<Record<string, string>>({
    cfg: "enrollment",
    inl: "facilities",
    pan: "enrollment",
    rtl: "facilities",
    vert: "enrollment",
    anim: "facilities",
});
const w = window as unknown as Record<string, unknown>;
w.__relabel = (i: number, s: string) => {
    PAN8.value = PAN8.value.map((o, j) => (j === i ? { ...o, label: s } : o));
};
type Frame = { t: number; sl: number; share: number };
w.__frames = (sel: string, n: number) =>
    new Promise<Frame[]>((done) => {
        const out: Frame[] = [];
        const strip = document.querySelector<HTMLElement>(sel + " .segmented-tabs")!;
        const tick = () => {
            const s = strip.getBoundingClientRect();
            const a = strip.querySelector<HTMLElement>(".segmented-tab[data-active]")!.getBoundingClientRect();
            const inside = Math.max(0, Math.min(a.right, s.right) - Math.max(a.left, s.left));
            out.push({ t: Math.round(performance.now()), sl: Math.round(strip.scrollLeft * 10) / 10, share: Math.round((inside / a.width) * 100) });
            if (out.length < n) requestAnimationFrame(tick);
            else done(out);
        };
        requestAnimationFrame(tick);
    });
</script>

<template>
    <main class="s4-page">
        <section class="s4-col" data-testid="cfg-row">
            <ConfiguratorLayer label="Glass" :default-open="true">
                <ConfiguratorRow label="Specular intensity" sub="the catch-light" name="--glass-specular-intensity-hover">
                    <div style="block-size: 8px" />
                </ConfiguratorRow>
            </ConfiguratorLayer>
        </section>
        <section class="s4-col" data-testid="cfg-trunc">
            <ConfiguratorLayer label="Groups" :default-open="true">
                <div style="display: flex; gap: 8px; align-items: center">
                    <span data-probe="trunc" style="min-inline-size: 0; flex: 1 1 0%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">Students with disabilities, by district and school year</span>
                    <button type="button">Edit</button>
                </div>
            </ConfiguratorLayer>
        </section>
        <section class="s4-col" data-testid="cfg-break">
            <ConfiguratorLayer label="Stop" :default-open="true">
                <dl style="margin: 0">
                    <div style="display: flex; gap: 8px; overflow-wrap: break-word">
                        <dt style="flex-shrink: 0">background</dt>
                        <dd data-probe="dd" style="min-inline-size: 0; margin: 0">linear-gradient(90deg,#ffffff,#000000,#ff0000)</dd>
                    </div>
                </dl>
            </ConfiguratorLayer>
        </section>
        <section class="s4-col" data-testid="cfg-tabs">
            <ConfiguratorLayer label="Family" :default-open="true">
                <SegmentedTabs v-model="t.cfg" :options="TABS8" aria-label="Family, in a layer" />
            </ConfiguratorLayer>
        </section>
        <section class="s4-col" data-testid="cfg-wide">
            <ConfiguratorLayer label="Wide" :default-open="true">
                <div style="inline-size: 300px; block-size: 36px; border: 1px solid currentColor">300 px</div>
            </ConfiguratorLayer>
        </section>

        <section style="inline-size: 267px" data-testid="inl">
            <SegmentedTabs v-model="t.inl" :options="TABS8" aria-label="Family, inline in a block" />
        </section>
        <div data-testid="inl-after">after</div>

        <section style="inline-size: 267px" data-testid="pan">
            <SegmentedTabs v-model="t.pan" :options="PAN8" aria-label="Family, panned" />
        </section>

        <section dir="rtl" style="inline-size: 267px" data-testid="rtl">
            <SegmentedTabs v-model="t.rtl" :options="TABS8" aria-label="Family, right to left" />
        </section>

        <section style="inline-size: 100px" data-testid="vert">
            <SegmentedTabs v-model="t.vert" :options="TABS8" orientation="vertical" aria-label="Family, vertical" />
        </section>

        <section class="s4-anim" style="inline-size: 267px" data-testid="anim">
            <SegmentedTabs v-model="t.anim" :options="TABS8" aria-label="Family, animated box" />
        </section>

        <section style="inline-size: 358px" data-testid="d-fit">
            <GlassDock :collapse="false" aria-label="Three seats">
                <DockControl v-for="d in ['Map', 'Table', 'Chart']" :key="d" shape="tab">{{ d }}</DockControl>
            </GlassDock>
        </section>

        <div class="s4-tail" aria-hidden="true" />
    </main>
</template>

<style>
.s4-page {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 32px;
    padding: 16px;
    overflow-x: clip;
}
.s4-col {
    inline-size: 200px;
    max-block-size: 320px;
    overflow-y: auto;
}
.s4-anim {
    transition: inline-size 400ms linear;
}
.s4-tail {
    block-size: 120vh;
}
</style>
