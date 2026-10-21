<script setup lang="ts">
// C-E5 (D5 pass 5, fresh critic of the composition A+E): the critic's probe app. A probe, never a scoring read of a
// witness. One scene, built for the path P-E5's own cure opened and no seat drove:
//   clipstale  a slider inside a 120 px `overflow: auto` box (`overflow-anchor: none`, so a layout move above the
//              slider is not compensated by the scroller), under a spacer whose height the probe sets by STYLE (a
//              layout move with no childList mutation), and a ticker below the box the probe appends to (a childList
//              mutation that moves nothing). The probe scrolls the box so the engaged control's rest box is partly
//              clipped by the box's edge, then moves it. stage.ts `watchPlace` re-arms its IntersectionObserver at the
//              clipped ratio, so a move that keeps that ratio (toward the visible side) reports nothing (CK-20)
import { ref, nextTick, onMounted } from "vue";
import { Slider } from "@glass/components/slider";

const qs = new URLSearchParams(location.search);
const scene = qs.get("scene") ?? "clipstale";
const v = ref([40]);
const ticks = ref<number[]>([]);

onMounted(async () => {
  await nextTick();
  (window as any).__e = {
    ready: true, scene,
    grow: (px: number) => { document.querySelector<HTMLElement>('[data-t="spacer"]')!.style.height = `${px}px`; },
    tick: async () => { ticks.value = [...ticks.value, ticks.value.length]; await nextTick(); },
  };
});
</script>

<template>
  <main style="min-height:100vh;padding:48px;box-sizing:border-box;background:var(--background)" :data-scene="scene">
    <button data-sentinel="before">before</button>
    <p style="margin:12px 0;max-width:420px">A scrolling card holds the control; the card's edge clips it.</p>
    <div data-t="box" style="width:400px;height:120px;overflow:auto;overflow-anchor:none;border:1px solid var(--border)">
      <div style="height:200px"></div>
      <div data-t="spacer" style="height:60px"></div>
      <div data-t="slider-a" style="padding:0 20px"><Slider v-model="v" :min="0" :max="100" aria-label="Probe A" /></div>
      <div style="height:400px"></div>
    </div>
    <div data-t="ticker" style="height:20px;overflow:hidden"><span v-for="t in ticks" :key="t">·</span></div>
    <button data-sentinel="after">after</button>
  </main>
</template>
