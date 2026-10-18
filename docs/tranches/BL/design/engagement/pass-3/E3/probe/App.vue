<script setup lang="ts">
// P-E3's PROBE app, P-E2's (pass-2/E2/probe/App.vue) with one addition: `value()` and `open()` unchanged, plus a
// consumer's elements that name `--engage-footprint` (pass 2's shared name) and `--engage-footprint-1` as their own
// anchors, after the sliders in tree order (`?consumerAnchor=1`, CK-22's anchor-name row).
// Not a grading scene: the battery runs on the harness's own scenes/App.vue. The paths the harness has no scene for: the NumberField scrub (CK-27's second client), a keyed re-render that inserts a node between the
// footprint and the promoted host (CK-20, P-E/rerender-probe.md), a slider inside an open Dialog (CK-22's Escape), a
// printable key whose handler focuses the slider by script (CK-04), and the two-slider hand-off for frames (Q-3).
import { ref, h, defineComponent, nextTick, onMounted } from "vue";
import { Slider } from "@glass/components/slider";
import { NumberField, NumberFieldInput, NumberFieldStep } from "@glass/components/number-field";
import { Dialog, DialogContent, DialogTitle } from "@glass/components/dialog";

const qs = new URLSearchParams(location.search);
const scene = qs.get("scene") ?? "numfield";
const v = ref([40]);
const v2 = ref([60]);
const n = ref(50);
const open = ref(true);
const extra = ref(false);
const consumerAnchor = qs.get("consumerAnchor") === "1";

// keyed children: Vue anchors a keyed insert on the next keyed node's element, the promoted host itself
const Between = defineComponent({
  setup: () => () => h("div", { class: "between", style: "width:360px;display:flow-root" }, [
    extra.value ? h("div", { key: "x", "data-t": "inserted", style: "height:40px" }) : null,
    h(Slider, { key: "s", modelValue: v.value, "onUpdate:modelValue": (x: number[]) => (v.value = x), "aria-label": "Probe" }),
    h("div", { key: "b", style: "height:20px" }),
  ]),
});

onMounted(async () => {
  await nextTick();
  if (scene === "keyfocus") {
    // an app shortcut: "k" focuses the slider's thumb by script inside the key's own handler
    window.addEventListener("keydown", (e) => { if (e.key === "k") document.querySelector<HTMLElement>('[role="slider"]')?.focus(); });
  }
  (window as any).__e = {
    ready: true, scene,
    insert: async () => { extra.value = true; await nextTick(); },
    value: () => (scene === "numfield" ? n.value : v.value[0]),
    open: () => open.value,
  };
});
</script>

<template>
  <main style="min-height:100vh;padding:48px;box-sizing:border-box;background:var(--background)" :data-scene="scene">
    <button data-sentinel="before">before</button>
    <p style="margin:12px 0;max-width:420px">The world behind the engaged control: a paragraph of text to read the veil against.</p>
    <div style="padding:24px 0">
      <div v-if="scene === 'numfield'" style="width:220px">
        <NumberField v-model="n" :min="0" :max="200" :step="1" aria-label="Probe count">
          <NumberFieldStep direction="decrement" />
          <NumberFieldInput />
          <NumberFieldStep direction="increment" />
        </NumberField>
      </div>
      <Between v-else-if="scene === 'between'" />
      <Dialog v-else-if="scene === 'dialog'" v-model:open="open">
        <DialogContent><DialogTitle>Probe</DialogTitle><div style="width:300px"><Slider v-model="v" :min="0" :max="100" aria-label="Probe" /></div></DialogContent>
      </Dialog>
      <div v-else-if="scene === 'keyfocus'" style="width:360px"><Slider v-model="v" :min="0" :max="100" aria-label="Probe" /></div>
      <div v-else-if="scene === 'slider2'" style="width:360px;display:grid;gap:48px">
        <div data-t="slider-a"><Slider v-model="v" :min="0" :max="100" aria-label="Probe A" /></div>
        <div data-t="slider-b"><Slider v-model="v2" :min="0" :max="100" aria-label="Probe B" /></div>
      </div>
    </div>
    <p style="margin:12px 0;max-width:420px">More of the world below it, so the veil's pool reads on both sides.</p>
    <div v-if="consumerAnchor" style="display:flex;gap:8px;margin-left:420px">
      <div data-t="consumer-anchor" style="anchor-name:--engage-footprint;width:40px;height:40px"></div>
      <div data-t="consumer-anchor-1" style="anchor-name:--engage-footprint-1;width:40px;height:40px"></div>
    </div>
    <button data-sentinel="after">after</button>
  </main>
</template>
