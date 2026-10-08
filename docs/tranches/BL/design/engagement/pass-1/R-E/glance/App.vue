<script setup lang="ts">
// R-E owner-glance page: the trio (Slider, Switch, Accordion trigger) and the passive atoms (Separator, Skeleton)
// on one page over body copy, so the engaged rung's veil has a world to recede. Two sliders for Q-5 (two held at once).
import { ref } from "vue";
import { Slider } from "@glass/components/slider";
import { Switch } from "@glass/components/switch";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@glass/components/accordion";
import { Separator } from "@glass/components/separator";
import { Skeleton } from "@glass/components/skeleton";
const phone = new URLSearchParams(location.search).get("phone") === "1";
const a = ref([40]); const b = ref([65]); const sw = ref(false); const acc = ref<string | undefined>(undefined);
(window as any).__e = { ready: true };
const copy = "Glass carries state, depth and motion. A held control is promoted where it stands; the world recedes behind it and returns when the hand lifts. ";
</script>
<template>
  <main :style="phone ? 'padding:24px 16px;box-sizing:border-box' : 'padding:32px 48px;box-sizing:border-box'" style="min-height:100vh;font:15px/1.5 system-ui;color:var(--foreground);background:var(--background)">
    <p style="margin:0 0 16px;max-width:600px;opacity:.85">{{ copy.repeat(2) }}</p>
    <div :style="phone ? 'width:100%' : 'width:360px'" style="padding:12px 0"><Slider data-g="slider-a" v-model="a" aria-label="Volume" /></div>
    <div :style="phone ? 'width:100%' : 'width:360px'" style="padding:12px 0"><Slider data-g="slider-b" v-model="b" aria-label="Brightness" /></div>
    <div style="display:flex;align-items:center;gap:12px;padding:12px 0"><Switch data-g="switch" v-model="sw" aria-label="Wi-Fi" /><span>Wi-Fi</span></div>
    <Accordion v-model="acc" type="single" collapsible :style="phone ? 'width:100%' : 'width:360px'">
      <AccordionItem value="one"><AccordionTrigger data-g="accordion">Details</AccordionTrigger><AccordionContent>{{ copy }}</AccordionContent></AccordionItem>
    </Accordion>
    <div :style="phone ? 'width:100%' : 'width:360px'" style="display:grid;gap:12px;padding:16px 0"><Separator data-g="sep" /><Skeleton data-g="skel" style="height:20px" /></div>
    <p style="margin:0;max-width:600px;opacity:.85">{{ copy.repeat(3) }}</p>
  </main>
</template>
