<script setup lang="ts">
// C-A5 (D5 pass 5, fresh critic of the candidate A+E): the critic's probe app. A probe, never a scoring read of a
// witness. One scene:
//   capsule   the Configurator's preset strip (Configurator.vue:414-434): each preset chip is a toggle button
//             (aria-pressed) that composes `.glass-capsule-hover`, whose `:hover` lift (scale 1.015) and `:active`
//             press snap (`--scale-press-sm`) live in glass/glass-capsule.css:124-131 (CK-11, CK-14)
import { ref, nextTick, onMounted } from "vue";
import { Configurator } from "@glass/components/configurator";

const qs = new URLSearchParams(location.search);
const scene = qs.get("scene") ?? "capsule";
const presets = [{ key: "a", label: "Alpha" }, { key: "b", label: "Beta" }, { key: "c", label: "Gamma" }];
const active = ref("a");
onMounted(async () => {
  await nextTick();
  (window as any).__e = { ready: true, scene, state: () => active.value };
});
</script>

<template>
  <main style="min-height:100vh;padding:48px;box-sizing:border-box;background:var(--background)" :data-scene="scene">
    <button data-sentinel="before">before</button>
    <div style="width:420px;padding:24px 0">
      <Configurator :presets="presets" :active-preset="active" @select-preset="(k: string) => (active = k)" />
    </div>
    <button data-sentinel="after">after</button>
  </main>
</template>
