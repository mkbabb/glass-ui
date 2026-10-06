<script setup lang="ts">
// D5 battery scene app, built against a worktree's library (build.mjs). One scene per ?scene=; ?scene=__index
// serves only the index. The DOM contract the witnesses read (HARNESS.md §1.3) is stamped here, after every
// mount, by selector, as a token list: [data-e~="target" | "body" | "root" | "thumb" | "veil" | "modal"], and the sentinels
// [data-sentinel="before" | "after"]. window.__e carries the index, the programmatic commit, the deferred mount
// (H-8), the declaration and the ladder and envelope tables read from the built library (E-1, E-8).
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
import { Dialog, DialogContent, DialogTitle } from "@glass/components/dialog";
import { ENGAGE_LADDER, ENGAGE_ENVELOPES } from "@glass/composables/motion";
import DIRS from "./dirs";
import DECL from "./decl";

const qs = new URLSearchParams(location.search);
const scene = qs.get("scene") ?? "__index";
const on = qs.get("on") === "1";
const phone = qs.get("phone") === "1";
const mounted = ref(qs.get("defer") !== "1");

const COMMIT = ["E-2", "E-8", "E-9"];
// scene → gates, the keyboard commit key and the selectors the tagger stamps. E-2's exemplars are the interactive
// atoms at hand (round 0); H-2 replaces them with one exemplar per declared class once a family declares classes.
const INDEX: Record<string, Record<string, unknown>> = {
  switch: { gates: COMMIT, key: "Space", target: '[role="switch"]', body: ".switch__thumb" },
  checkbox: { gates: COMMIT, key: "Space", target: '[role="checkbox"]' },
  radio: { gates: COMMIT, key: "ArrowDown", target: '[role="radio"]:nth-of-type(2)' },
  tabs: { gates: [...COMMIT, "E-5"], key: "ArrowRight", target: ".segmented-tab:nth-of-type(2)", body: ".segmented-indicator", touch: ".segmented-tab:nth-of-type(3)" },
  toggle: { gates: [...COMMIT, "E-5"], key: "ArrowRight", target: '[data-t="item-b"]', pf1: "webkit pointer entry closes the page (D4 PF-1)" },
  chip: { gates: [...COMMIT, "E-5"], key: "Space", target: ".glass-chip" },
  accordion: { gates: [...COMMIT, "E-5"], key: "Enter", target: ".disclosure-trigger", pf1: "webkit pointer entry closes the page (PORTFOLIO §1.3 item 7)" },
  button: { gates: [...COMMIT, "E-5"], key: "Space", target: ".button" },
  press_switch: { gates: ["E-5"], target: '[role="switch"]' },
  press_checkbox: { gates: ["E-5"], target: '[role="checkbox"]' },
  slider: { gates: ["E-3", "E-4", "E-7", "E-9"], key: "ArrowRight", target: ".glass-slider", root: ".glass-slider", thumb: '[role="slider"]', body: '[role="slider"]' },
  tabsdrag: { gates: ["E-4"], root: ".segmented-tabs, [role=tablist]", thumb: ".segmented-indicator", target: ".segmented-indicator" },
  modal: { gates: ["E-7"], modal: '[role="dialog"]', veil: ".glass-focus-veil" },
  s6: { gates: ["E-6"], target: '[role="switch"]', subject: "the glass track (W-H.3.md:46 S6): the Switch's control bit" },
  passive: { gates: [], target: '[data-t="sep"]' },
};
// E-1's runtime arm: which harness scene exemplifies a component directory (H-2 grows this with the declared classes)
const SCENE_OF_DIR: Record<string, string> = {
  switch: "switch", checkbox: "checkbox", "radio-group": "radio", tabs: "tabs", "toggle-group": "toggle",
  chip: "chip", accordion: "accordion", button: "button", slider: "slider", separator: "passive", skeleton: "passive", dialog: "modal",
};

const v = ref([40]); const sw = ref(on); const cb = ref(on); const rg = ref(on ? "b" : "a"); const tab = ref(on ? "b" : "a");
const acc = ref<string | undefined>(on ? "one" : undefined); const chip = ref(on); const tg = ref(on ? "b" : "a"); const clicks = ref(0);
const open = ref(false);
const commit: Record<string, () => void> = {
  switch: () => (sw.value = !sw.value), checkbox: () => (cb.value = !cb.value), radio: () => (rg.value = "b"),
  tabs: () => (tab.value = "b"), accordion: () => (acc.value = acc.value ? undefined : "one"), chip: () => (chip.value = !chip.value),
  button: () => clicks.value++, toggle: () => (tg.value = "b"), slider: () => (v.value = [70]),
};
const base = scene.replace(/^press_/, "").replace(/^s6$/, "switch");

function tag() {
  const m = INDEX[scene]; if (!m) return;
  for (const k of ["target", "body", "root", "thumb", "modal", "veil"]) {
    const sel = m[k] as string | undefined; if (!sel) continue;
    const el = document.querySelector(sel); if (!el) continue;
    const have = (el.getAttribute("data-e") ?? "").split(" ").filter(Boolean);
    if (!have.includes(k)) el.setAttribute("data-e", [...have, k].join(" "));
  }
}
const tabs3 = [{ label: "Alpha", value: "a" }, { label: "Beta", value: "b" }, { label: "Gamma", value: "c" }];

onMounted(async () => {
  new MutationObserver(tag).observe(document.body, { childList: true, subtree: true });
  if (scene === "modal") open.value = true;
  await nextTick(); await new Promise((r) => setTimeout(r, scene === "modal" ? 700 : 300)); tag();
  (window as any).__e = {
    ready: true, kind: "build", scene, index: INDEX, sceneOfDir: SCENE_OF_DIR, dirs: DIRS, decl: DECL,
    rungs: ENGAGE_LADDER.map((r) => r.rung), envelopes: ENGAGE_ENVELOPES.map((r) => ({ role: r.role, attackMs: r.attackMs, releaseMs: r.releaseMs })),
    commit: () => commit[base]?.(),
    mount: async () => { mounted.value = true; await nextTick(); tag(); },
  };
});
</script>

<template>
  <main :style="phone ? 'min-height:100vh;padding:48px 16px;box-sizing:border-box' : 'min-height:100vh;padding:48px;box-sizing:border-box'" :data-scene="scene">
    <button data-sentinel="before" data-t="before">before</button>
    <div v-if="mounted" style="padding:24px 0">
      <div v-if="scene === 'slider'" :style="phone ? 'width:100%' : 'width:360px'"><Slider v-model="v" :min="0" :max="100" aria-label="Probe" /></div>
      <Switch v-else-if="base === 'switch'" v-model="sw" aria-label="Probe" />
      <Checkbox v-else-if="base === 'checkbox'" v-model="cb" aria-label="Probe" />
      <RadioGroup v-else-if="scene === 'radio'" v-model="rg" aria-label="Probe">
        <RadioGroupItem value="a" aria-label="A" /><RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
      <SegmentedTabs v-else-if="scene === 'tabs' || scene === 'tabsdrag'" v-model="tab" :options="tabs3" aria-label="Probe" />
      <Accordion v-else-if="scene === 'accordion'" v-model="acc" type="single" collapsible style="width:320px">
        <AccordionItem value="one"><AccordionTrigger>One</AccordionTrigger><AccordionContent>Body one</AccordionContent></AccordionItem>
      </Accordion>
      <Chip v-else-if="scene === 'chip'" mode="selectable" v-model="chip">Probe</Chip>
      <Button v-else-if="scene === 'button'" @click="clicks++">Probe</Button>
      <ToggleGroup v-else-if="scene === 'toggle'" type="single" v-model="tg" aria-label="Probe">
        <ToggleGroupItem value="a" data-t="item-a">Alpha</ToggleGroupItem><ToggleGroupItem value="b" data-t="item-b">Beta</ToggleGroupItem>
      </ToggleGroup>
      <div v-else-if="scene === 'passive'" style="width:320px;display:grid;gap:16px"><Separator data-t="sep" /><Skeleton data-t="skel" style="height:24px" /></div>
      <Dialog v-else-if="scene === 'modal'" v-model:open="open">
        <DialogContent><DialogTitle>Probe</DialogTitle><p>Body</p></DialogContent>
      </Dialog>
    </div>
    <button data-sentinel="after" data-t="after">after</button>
  </main>
</template>
