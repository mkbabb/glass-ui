<script setup lang="ts">
// D5 r0 probe scenes, one per ?scene=. Sentinels before and after every scene; window.__commit() is the programmatic commit.
import { ref, onMounted, nextTick } from "vue";
import { Slider } from "@glass/components/slider";
import { Switch } from "@glass/components/switch";
import { Checkbox } from "@glass/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@glass/components/radio-group";
import { SegmentedTabs } from "@glass/components/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@glass/components/accordion";
import { Chip } from "@glass/components/chip";
import { Button } from "@glass/components/button";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import { Separator } from "@glass/components/separator";
import { Skeleton } from "@glass/components/skeleton";
const scene = new URLSearchParams(location.search).get("scene") ?? "slider";
const v = ref([40]); const sw = ref(false); const cb = ref(false); const rg = ref("a"); const tab = ref("a"); const acc = ref<string | undefined>(undefined);
const chip = ref(false); const tg = ref("a"); const clicks = ref(0);
const commit: Record<string, () => void> = {
  switch: () => (sw.value = !sw.value), checkbox: () => (cb.value = !cb.value), radio: () => (rg.value = "b"),
  tabs: () => (tab.value = "b"), accordion: () => (acc.value = "one"), chip: () => (chip.value = !chip.value),
  button: () => clicks.value++, toggle: () => (tg.value = "b"), slider: () => (v.value = [70]),
};
onMounted(async () => { await nextTick(); await new Promise((r) => setTimeout(r, 300)); (window as any).__commit = () => commit[scene]?.(); (window as any).__ready = true; });
</script>
<template>
  <main style="min-height:100vh;padding:48px;box-sizing:border-box">
    <button data-t="before">before</button>
    <div style="padding:24px 0" data-t="stage">
      <div v-if="scene === 'slider'" style="width:360px"><Slider v-model="v" :min="0" :max="100" aria-label="Probe" data-t="root" /></div>
      <Switch v-else-if="scene === 'switch'" v-model="sw" aria-label="Probe" data-t="root" />
      <Checkbox v-else-if="scene === 'checkbox'" v-model="cb" aria-label="Probe" data-t="root" />
      <RadioGroup v-else-if="scene === 'radio'" v-model="rg" aria-label="Probe" data-t="group">
        <RadioGroupItem value="a" aria-label="A" data-t="item-a" /><RadioGroupItem value="b" aria-label="B" data-t="item-b" />
      </RadioGroup>
      <SegmentedTabs v-else-if="scene === 'tabs'" v-model="tab" :options="[{ label: 'Alpha', value: 'a' }, { label: 'Beta', value: 'b' }, { label: 'Gamma', value: 'c' }]" aria-label="Probe" data-t="group" />
      <Accordion v-else-if="scene === 'accordion'" v-model="acc" type="single" collapsible style="width:320px">
        <AccordionItem value="one"><AccordionTrigger data-t="root">One</AccordionTrigger><AccordionContent>Body one</AccordionContent></AccordionItem>
      </Accordion>
      <Chip v-else-if="scene === 'chip'" mode="selectable" v-model="chip" data-t="root">Probe</Chip>
      <Button v-else-if="scene === 'button'" data-t="root" @click="clicks++">Probe</Button>
      <ToggleGroup v-else-if="scene === 'toggle'" type="single" v-model="tg" aria-label="Probe" data-t="group">
        <ToggleGroupItem value="a" data-t="item-a">Alpha</ToggleGroupItem><ToggleGroupItem value="b" data-t="item-b">Beta</ToggleGroupItem>
      </ToggleGroup>
      <div v-else-if="scene === 'passive'" style="width:320px;display:grid;gap:16px"><Separator data-t="sep" /><Skeleton data-t="skel" style="height:24px" /></div>
    </div>
    <button data-t="after">after</button>
  </main>
</template>
