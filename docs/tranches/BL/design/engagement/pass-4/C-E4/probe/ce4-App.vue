<script setup lang="ts">
// C-E4 (D5 pass 4, fresh critic of route E): the critic's probe app. A probe, never a scoring read of a witness.
// Scenes for the paths P-E4's own code opened and no seat drove:
//   restale   two sliders under a spacer whose height the probe sets by STYLE (a layout move with no childList
//             mutation), and a ticker the probe appends a node to (a childList mutation that moves nothing):
//             stage.ts `onMutation` glides by `was - now` from the place it last READ (CK-20)
//   scroller  a slider inside a 64 px `overflow: auto` box on a tall page; `ob` sets the box's
//             overscroll-behavior, the box starts at its end with the slider in view (a wheel up can scroll it, a wheel down is at its end) (E-M6: "honours that scroller's
//             overscroll-behavior", the chain at a scroller's end) (CK-22)
//   clip      a slider inside an `overflow: hidden` box that fits it (E-M7's stated clip, read in paint) (CK-22)
//   slider2   P-E4's, for the `!important` consumer anchor and the mode-kept-across-exit read
import { ref, nextTick, onMounted } from "vue";
import { Slider } from "@glass/components/slider";

const qs = new URLSearchParams(location.search);
const scene = qs.get("scene") ?? "restale";
const v = ref([40]);
const v2 = ref([60]);
const spacer = ref(0);
const ticks = ref<number[]>([]);
const ob = qs.get("ob") ?? "auto";

onMounted(async () => {
  await nextTick();
  // the box starts at its end (the slider sits below a 200 px filler, so it is in view there)
  if (scene === "scroller") {
    const b = document.querySelector<HTMLElement>('[data-t="box"]');
    if (b) b.scrollTop = b.scrollHeight;
  }
  (window as any).__e = {
    ready: true, scene,
    // a layout move with no childList mutation: an attribute (style) write only
    grow: (px: number) => { document.querySelector<HTMLElement>('[data-t="spacer"]')!.style.height = `${px}px`; },
    // a childList mutation that moves nothing above the sliders (the ticker sits below them)
    tick: async () => { ticks.value = [...ticks.value, ticks.value.length]; await nextTick(); },
    value: () => v.value[0],
  };
});
</script>

<template>
  <main style="min-height:100vh;padding:48px;box-sizing:border-box;background:var(--background)" :data-scene="scene">
    <button data-sentinel="before">before</button>
    <p style="margin:12px 0;max-width:420px">The world behind the engaged control: a paragraph of text to read the veil against.</p>
    <template v-if="scene === 'restale' || scene === 'slider2'">
      <div data-t="spacer" style="height:0px"></div>
      <div style="width:360px;display:grid;gap:48px;padding:24px 0">
        <div data-t="slider-a"><Slider v-model="v" :min="0" :max="100" aria-label="Probe A" /></div>
        <div data-t="slider-b"><Slider v-model="v2" :min="0" :max="100" aria-label="Probe B" /></div>
      </div>
      <div data-t="ticker" style="height:20px;overflow:hidden"><span v-for="t in ticks" :key="t">·</span></div>
    </template>
    <template v-else-if="scene === 'scroller'">
      <div data-t="box" :style="`width:400px;height:64px;overflow:auto;overscroll-behavior:${ob};border:1px solid var(--border)`">
        <div style="height:200px"></div>
        <div style="padding:12px 20px 8px"><Slider v-model="v" :min="0" :max="100" aria-label="Probe" /></div>
      </div>
      <div style="height:2400px"></div>
    </template>
    <template v-else-if="scene === 'clip'">
      <div data-t="clipbox" style="width:360px;overflow:hidden;padding:0">
        <Slider v-model="v" :min="0" :max="100" aria-label="Probe" />
      </div>
    </template>
    <p style="margin:12px 0;max-width:420px">More of the world below it.</p>
    <button data-sentinel="after">after</button>
  </main>
</template>
