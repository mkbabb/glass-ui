<script setup lang="ts">
// MEASURE-8 (RULINGS-7 H6, H7, H8): m6/dock-comp.vue with three more grounds.
// ?c=dock-comp&page=<id>&ground=field|flat|grid|daraksha[&scheme=dark]
//   field     the stage's one Aurora (StoryStage, the warm field every ladder log reads)
//   flat      the page's background
//   grid      RU-67 as amended (C7-M1): a 2 px grid at f8's 32 px pitch on a near-black page, (11,10,9), with a line of
//             card text under where a bottom dock rests; in light its twin, the same grid in ink on a near-white page
//   daraksha  RU-85: daraksha's Colour ground (daraksha origin/master 919090c, src/pages/ColourPage.vue:210
//             `<HerGround :light="0.09" :dark="0.056" />`; src/palette/HerGround.vue: glass's Aurora under that opacity
//             ceiling, the dark one in dark; src/palette/aurora.ts:18-23 herAurora: DEFAULT_AURORA_CONFIG with her five
//             gradient stops, huePath "shorter", vividness 0; src/palette/daraksha.ts:11-16, :30 the stops) over the page
import { computed, defineAsyncComponent } from "vue";
import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora";
import StoryStage from "./comp/StoryStage.vue";
const q = new URLSearchParams(location.search);
const page = q.get("page") ?? "nav";
const ground = q.get("ground") ?? "field";
const dark = q.get("scheme") === "dark";
const loaders = import.meta.glob("./comp/*.stage.vue");
const Stage = computed(() => defineAsyncComponent(loaders[`./comp/${page}.stage.vue`] as never));
const ok = (css: string) => { const m = /^oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)$/.exec(css)!; return { L: Number(m[1]) / 100, C: Number(m[2]), h: Number(m[3]) }; };
const HER = ["oklch(73% 0.185 2)", "oklch(90% 0.055 18)", "oklch(82% 0.145 76)", "oklch(72% 0.12 88)", "oklch(72% 0.055 145)"];
const herConfig = { ...DEFAULT_AURORA_CONFIG, palette: HER.map(ok), huePath: "shorter", vividness: 0 } as never;
const field = ground === "field" || ground === "daraksha";
const card = "The quarterly report for the north-east region, with its figures and its notes, reads under the dock here.";
</script>

<template>
    <main class="comp-main" data-testid="comp-main">
        <StoryStage
            size="tall"
            :field="field"
            :field-config="ground === 'daraksha' ? herConfig : undefined"
            :ceiling="ground === 'daraksha' ? (dark ? 0.056 : 0.09) : 0.55"
            class="comp-stage"
            :data-ground="ground"
            data-testid="comp-stage"
        >
            <p v-if="ground === 'grid'" class="comp-card-text" data-testid="comp-card-text" aria-hidden="true">{{ card }} {{ card }}</p>
            <component :is="Stage" />
        </StoryStage>
    </main>
</template>

<style>
.comp-main { padding: 24px; box-sizing: border-box; min-block-size: 100vh; background: var(--background); color: var(--foreground); }
.comp-stage { position: relative; inline-size: 100%; block-size: min(560px, 70vh); border-radius: 16px; overflow: hidden; container-type: inline-size; }
.comp-stage[data-ground="flat"] { background: var(--background); }
.comp-stage[data-ground="grid"] {
    --grid-page: #f6f5f3;
    --grid-line: rgba(20, 18, 16, 0.22);
    background-color: var(--grid-page);
    background-image:
        linear-gradient(90deg, var(--grid-line) 0 2px, transparent 2px),
        linear-gradient(180deg, var(--grid-line) 0 2px, transparent 2px);
    background-size: 32px 32px;
    background-position: 0 0;
}
.dark .comp-stage[data-ground="grid"] { --grid-page: rgb(11, 10, 9); --grid-line: rgba(235, 230, 222, 0.2); }
.comp-stage[data-ground="daraksha"] { background: var(--background); }
.comp-card-text {
    position: absolute;
    inset-inline: 0;
    inset-block-end: 40px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    font: 500 15px/20px system-ui, sans-serif;
    color: var(--card-foreground, var(--foreground));
    pointer-events: none;
}
</style>
