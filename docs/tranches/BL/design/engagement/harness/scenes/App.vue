<script setup lang="ts">
// D5 battery scene app, built against a worktree's library (build.mjs). One scene per ?scene=; ?scene=__index
// serves only the index. The DOM contract the witnesses read (HARNESS.md §1.3) is stamped here, after every
// mount, by selector, as a token list: [data-e~="target" | "body" | "root" | "thumb" | "veil" | "modal"], and the sentinels
// [data-sentinel="before" | "after"]. window.__e carries the index, the programmatic commit, the deferred mount
// (H-8), the declaration and the ladder and envelope tables read from the built library (E-1, E-8).
import { ref, onMounted, nextTick, getCurrentInstance, defineComponent, onErrorCaptured, h } from "vue";
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
import { SheetContent } from "@glass/components/sheet";
import { SortableList, SortableItem, SortableHandle } from "@glass/components/sortable-list";
import { Carousel, CarouselContent, CarouselItem } from "@glass/components/carousel";
import { Input } from "@glass/components/input";
import { Textarea } from "@glass/components/textarea";
import { Card, CardContent } from "@glass/components/card";
import { Alert, AlertTitle, AlertDescription } from "@glass/components/alert";
import { Badge } from "@glass/components/badge";
import { Progress } from "@glass/components/progress";
import { StatusDot } from "@glass/components/status-dot";
import { PagerDots } from "@glass/components/pager-dots";
import { Aurora } from "@glass/components/aurora";
import { ENGAGE_LADDER, ENGAGE_ENVELOPES } from "@glass/composables/motion";
import DIRS from "./dirs";
import DECL from "./decl";
import TYPE_DIR from "./members";

const qs = new URLSearchParams(location.search);
const scene = qs.get("scene") ?? "__index";
const on = qs.get("on") === "1";
const phone = qs.get("phone") === "1";
const mounted = ref(qs.get("defer") !== "1");

const COMMIT = ["E-2", "E-8", "E-9"];
// scene → gates, the keyboard commit key and the selectors the tagger stamps. E-2's exemplars are the interactive
// atoms at hand (round 0); H-2 replaces them with one exemplar per declared class once a family declares classes.
const INDEX: Record<string, Record<string, unknown>> = {
  // CK-02: `face` is the painted face (arm ii's px, arm iii's light); `keys` the keyboard commit (a commit the state
  // precondition must see happen)
  switch: { gates: [...COMMIT, "E-11"], key: "Space", target: '[role="switch"]', body: ".switch__thumb", face: '[role="switch"] .control-bit__face', failLoud: [{ token: "--scale-commit-pop", value: "1", act: "commit", on: '[role="switch"]' }] },
  checkbox: { gates: COMMIT, key: "Space", target: '[role="checkbox"]', face: '[role="checkbox"] .control-bit__face' },
  radio: { gates: COMMIT, key: "ArrowDown", target: '[role="radio"]:nth-of-type(2)', face: '[role="radio"]:nth-of-type(2) .control-bit__face' },
  tabs: { gates: [...COMMIT, "E-5"], key: "ArrowRight", target: ".segmented-tab:nth-of-type(2)", body: ".segmented-indicator", touch: ".segmented-tab:nth-of-type(3)" },
  toggle: { gates: [...COMMIT, "E-5"], key: "ArrowRight", target: '[data-t="item-b"]', pf1: "webkit pointer entry closes the page (D4 PF-1)" },
  chip: { gates: [...COMMIT, "E-5"], key: "Space", target: ".glass-chip" },
  chipaction: { gates: COMMIT, key: "Space", target: ".glass-chip" },
  accordion: { gates: [...COMMIT, "E-5"], key: "Enter", target: ".disclosure-trigger", pf1: "webkit pointer entry closes the page (PORTFOLIO §1.3 item 7)" },
  button: { gates: [...COMMIT, "E-5"], key: "Space", target: ".button" },
  press_switch: { gates: ["E-5"], target: '[role="switch"]' },
  press_checkbox: { gates: ["E-5"], target: '[role="checkbox"]' },
  // CK-05: E-4 reads the slider's VISIBLE value point (the range's leading edge, `point` + `edge: "lead"`), pressed at
  // the reka thumb; CK-20: the slider and the pair; CK-21: C-E's three plants (plant-fallback.mjs)
  slider: { gates: ["E-3", "E-4", "E-7", "E-9", "E-10", "E-11"], key: "ArrowRight", target: ".glass-slider", root: ".glass-slider", thumb: '[role="slider"]', body: ".slider-range", point: ".slider-range", edge: "lead", veil: ".glass-focus-veil",
    failLoud: [{ token: "--space-section", value: "nonsense", act: "kbd" }, { token: "--scale-engage", value: "nonsense", act: "kbd" }, { token: "--spring-dock-settle", value: "nonsense", act: "fling" }] },
  slider2: { gates: ["E-10"], pair: ['[data-t="slider-a"] .glass-slider', '[data-t="slider-b"] .glass-slider'], veil: ".glass-focus-veil" },
  // CK-05's repeat-run detent reads every detented Q-4 (b) surface: the tabs drag lands on a tab, the sortable row on a
  // slot (pass-2/H2.md §2.3, HEAD read only the Sheet and the Carousel)
  tabsdrag: { gates: ["E-4"], detents: true, root: ".segmented-tabs, [role=tablist]", thumb: ".segmented-indicator", target: ".segmented-indicator" },
  // H-7: the Sheet's detents (a bottom sheet dragged up by its grip; UNMEASURED while it paints in flow, §P1-7), the
  // sortable list (row a's handle dragged down; the drag ghost while it flies, then the landed row), one scroll-snap
  // surface (the Carousel, a touch drag)
  sheet: { gates: ["E-4"], axis: "y", dir: -1, detents: true, fixed: '[role="dialog"]', root: "main[data-scene]", thumb: '[data-slot="sheet-detent-handle"]', target: '[data-slot="sheet-detent-handle"]' },
  sortable: { gates: ["E-4"], axis: "y", dir: 1, detents: true, root: ".sortable-list", grip: '[data-sortable-id="a"] [data-sortable-handle]', thumb: ".sortable-ghost", land: '[data-sortable-id="a"]', target: '[data-sortable-id="a"]' },
  carousel: { gates: ["E-4"], input: "touch", dir: -1, detents: true, platform: true, root: '[data-slot="carousel-content"]', thumb: '[data-slot="carousel-item"]', target: '[data-slot="carousel-item"]' },
  modal: { gates: ["E-7"], modal: '[role="dialog"]', veil: ".glass-focus-veil" },
  s6: { gates: ["E-6"], target: '[role="switch"]', subject: "the glass track (W-H.3.md:46 S6): the Switch's control bit" },
  // CK-19: one exemplar per declared class beyond the commit scenes: presented (a Dialog with a target), field (an
  // Input), ambient (a pointer field: the Aurora), static (Separator, Skeleton), and the census gallery (CK-01's latch
  // reads every member some scene renders)
  passive: { gates: [], target: '[data-t="sep"]' },
  presented: { gates: [], target: '[role="dialog"] .button', modal: '[role="dialog"]' },
  field: { gates: [], target: 'input[data-t="field"]' },
  ambient: { gates: [], target: '[data-t="ambient"]' },
  gallery: { gates: [] },
};
// E-1's runtime arm: which harness scene exemplifies a component directory (CK-19)
const SCENE_OF_DIR: Record<string, string> = {
  switch: "switch", checkbox: "checkbox", "radio-group": "radio", tabs: "tabs", "toggle-group": "toggle",
  chip: "chip", accordion: "accordion", button: "button", slider: "slider", separator: "passive", skeleton: "passive", dialog: "presented",
  sheet: "sheet", "sortable-list": "sortable", carousel: "carousel", input: "field", textarea: "gallery", aurora: "ambient",
  card: "gallery", alert: "gallery", badge: "gallery", progress: "gallery", "status-dot": "gallery", "pager-dots": "gallery",
};

const v = ref([40]); const v2 = ref([60]); const extra = ref(false); const txt = ref(""); const sw = ref(on); const cb = ref(on); const rg = ref(on ? "b" : "a"); const tab = ref(on ? "b" : "a");
const acc = ref<string | undefined>(on ? "one" : undefined); const chip = ref(on); const tg = ref(on ? "b" : "a"); const clicks = ref(0);
const open = ref(false); const detent = ref(0.25);
const rows = ref(["a", "b", "c", "d", "e", "f"].map((id) => ({ id, label: id.toUpperCase() }))); const slide = ref(0);
const commit: Record<string, () => void> = {
  switch: () => (sw.value = !sw.value), checkbox: () => (cb.value = !cb.value), radio: () => (rg.value = "b"),
  tabs: () => (tab.value = "b"), accordion: () => (acc.value = acc.value ? undefined : "one"), chip: () => (chip.value = !chip.value),
  button: () => clicks.value++, chipaction: () => clicks.value++, toggle: () => (tg.value = "b"), slider: () => (v.value = [70]),
};
// CK-02's precondition: the model each scene binds, read before and after a commit
const STATE: Record<string, () => unknown> = {
  switch: () => sw.value, checkbox: () => cb.value, radio: () => rg.value, tabs: () => tab.value, tabsdrag: () => tab.value,
  accordion: () => acc.value ?? null, chip: () => chip.value, chipaction: () => clicks.value, button: () => clicks.value, toggle: () => tg.value,
  slider: () => v.value, slider2: () => [v.value, v2.value], sheet: () => detent.value, sortable: () => rows.value.map((r) => r.id).join(""), carousel: () => slide.value,
};
// CK-01: the rendered members. The scene app walks its own component tree and attributes every element to the
// innermost component a directory exports (members.ts maps each export to its directory); a component of the same
// directory nested inside it is the same member instance. An element that is the root of a component whose own root is
// another directory's component (Card over Surface) is the root of both. Handlers are the elements whose vnode
// carries an on* prop.
const self = getCurrentInstance();
type Group = { dir: string; root: Element | null; els: Element[]; handlers: Element[] };
function members(): Group[] {
  const out: Group[] = [];
  const walk = (vn: any, owner: Group | null, pend: Group[]) => {
    if (!vn || typeof vn !== "object") return;
    if (vn.component) {
      const d = (TYPE_DIR as Map<unknown, string>).get(vn.type);
      let o = owner, p = pend;
      if (d && (!owner || owner.dir !== d)) { o = { dir: d, root: null, els: [], handlers: [] }; out.push(o); p = [...pend.filter((g) => !g.root), o]; }
      walk(vn.component.subTree, o, p); return;
    }
    if (vn.suspense) { walk(vn.suspense.activeBranch, owner, pend); return; }
    let next = pend;
    if (typeof vn.type === "string" && vn.el instanceof Element) {
      const live = vn.props && Object.keys(vn.props).some((k) => /^on[A-Z]/.test(k));
      for (const g of new Set([...pend.filter((x) => !x.root), ...(owner ? [owner] : [])])) {
        if (!g.root) g.root = vn.el;
        g.els.push(vn.el); if (live) g.handlers.push(vn.el);
      }
      next = [];
    }
    if (Array.isArray(vn.children)) for (const c of vn.children) walk(c, owner, next);
  };
  walk(self?.subTree, null, []);
  return out;
}
// a gallery member that throws renders nothing and leaves the others standing
const Safe = defineComponent({ setup(_, { slots }) { const bad = ref(""); onErrorCaptured((e) => { bad.value = String(e); return false; }); return () => (bad.value ? h("i", { "data-t": "unrendered", title: bad.value }) : slots.default?.()); } });
const base = scene.replace(/^press_/, "").replace(/^s6$/, "switch");

function tag() {
  const m = INDEX[scene]; if (!m) return;
  for (const k of ["target", "body", "root", "thumb", "grip", "land", "modal", "veil", "face", "point"]) {
    const sel = m[k] as string | undefined; if (!sel) continue;
    const el = document.querySelector(sel); if (!el) continue;
    const have = (el.getAttribute("data-e") ?? "").split(" ").filter(Boolean);
    if (!have.includes(k)) el.setAttribute("data-e", [...have, k].join(" "));
  }
}
const tabs3 = [{ label: "Alpha", value: "a" }, { label: "Beta", value: "b" }, { label: "Gamma", value: "c" }];

onMounted(async () => {
  new MutationObserver(tag).observe(document.body, { childList: true, subtree: true });
  const modalish = scene === "modal" || scene === "sheet" || scene === "presented";
  if (modalish) open.value = true;
  await nextTick(); await new Promise((r) => setTimeout(r, modalish ? 900 : 300)); tag();
  (window as any).__e = {
    ready: true, kind: "build", scene, index: INDEX, sceneOfDir: SCENE_OF_DIR, dirs: DIRS, decl: DECL,
    rungs: ENGAGE_LADDER.map((r) => r.rung), envelopes: ENGAGE_ENVELOPES.map((r) => ({ role: r.role, attackMs: r.attackMs, releaseMs: r.releaseMs })),
    commit: () => commit[base]?.(),
    state: () => (STATE[base] ? JSON.parse(JSON.stringify(STATE[base]())) : null),
    members,
    // CK-20: a parent re-render puts a block before the slider during a hold
    insertSibling: scene === "slider" ? async () => { extra.value = true; await nextTick(); } : undefined,
    mount: async () => { mounted.value = true; await nextTick(); tag(); },
  };
});
</script>

<template>
  <main :style="phone ? 'min-height:100vh;padding:48px 16px;box-sizing:border-box' : 'min-height:100vh;padding:48px;box-sizing:border-box'" :data-scene="scene">
    <button data-sentinel="before" data-t="before">before</button>
    <div v-if="mounted" style="padding:24px 0">
      <template v-if="scene === 'slider'"><div v-if="extra" data-t="inserted" style="height:40px"></div><div :style="phone ? 'width:100%' : 'width:360px'"><Slider v-model="v" :min="0" :max="100" aria-label="Probe" /></div></template>
      <div v-else-if="scene === 'slider2'" style="width:360px;display:grid;gap:48px">
        <div data-t="slider-a"><Slider v-model="v" :min="0" :max="100" aria-label="Probe A" /></div>
        <div data-t="slider-b"><Slider v-model="v2" :min="0" :max="100" aria-label="Probe B" /></div>
      </div>
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
      <Chip v-else-if="scene === 'chipaction'" mode="action" @click="clicks++">Probe</Chip>
      <Button v-else-if="scene === 'button'" @click="clicks++">Probe</Button>
      <ToggleGroup v-else-if="scene === 'toggle'" type="single" v-model="tg" aria-label="Probe">
        <ToggleGroupItem value="a" data-t="item-a">Alpha</ToggleGroupItem><ToggleGroupItem value="b" data-t="item-b">Beta</ToggleGroupItem>
      </ToggleGroup>
      <div v-else-if="scene === 'passive'" style="width:320px;display:grid;gap:16px"><Separator data-t="sep" /><Skeleton data-t="skel" style="height:24px" /></div>
      <Dialog v-else-if="scene === 'presented'" v-model:open="open">
        <DialogContent><DialogTitle>Probe</DialogTitle><p>Body</p><Button @click="clicks++">Act</Button></DialogContent>
      </Dialog>
      <div v-else-if="scene === 'field'" style="width:320px"><Input v-model="txt" aria-label="Probe" data-t="field" /></div>
      <div v-else-if="scene === 'ambient'" data-t="ambient" style="width:420px;height:240px;position:relative;overflow:hidden;border-radius:16px"><Safe><Aurora /></Safe></div>
      <div v-else-if="scene === 'gallery'" style="width:420px;display:grid;gap:12px">
        <Safe><Card><CardContent>Card</CardContent></Card></Safe>
        <Safe><Card :selected="false"><CardContent>Card, selectable</CardContent></Card></Safe>
        <Safe><Alert><AlertTitle>Alert</AlertTitle><AlertDescription>Body</AlertDescription></Alert></Safe>
        <Safe><Badge>Badge</Badge></Safe>
        <Safe><Progress :model-value="40" aria-label="Progress" /></Safe>
        <Safe><StatusDot state="active" /></Safe>
        <Safe><PagerDots :count="4" /></Safe>
        <Safe><Textarea aria-label="Notes" /></Safe>
        <Safe><Chip mode="removable" remove-label="Remove">Removable</Chip></Safe>
        <Safe><Chip>Static chip</Chip></Safe>
      </div>
      <Dialog v-else-if="scene === 'modal'" v-model:open="open">
        <DialogContent><DialogTitle>Probe</DialogTitle><p>Body</p></DialogContent>
      </Dialog>
      <Dialog v-else-if="scene === 'sheet'" v-model:open="open">
        <SheetContent side="bottom" :detents="[0.25, 0.5, 0.75, 1]" v-model:detent="detent"><DialogTitle>Probe</DialogTitle><p>Body</p></SheetContent>
      </Dialog>
      <div v-else-if="scene === 'sortable'" style="width:320px">
        <SortableList :items="rows" :get-id="(r) => r.id" :get-label="(r) => r.label" label="Probe" @reorder="rows = $event">
          <SortableItem v-for="r in rows" :key="r.id" :id="r.id"><SortableHandle />{{ r.label }}</SortableItem>
        </SortableList>
      </div>
      <div v-else-if="scene === 'carousel'" style="width:600px">
        <Carousel v-model:active="slide" aria-label="Probe">
          <CarouselContent>
            <CarouselItem v-for="i in 4" :key="i" :index="i - 1" :label="`Slide ${i}`"><div style="height:160px;display:grid;place-items:center">Slide {{ i }}</div></CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
    <button data-sentinel="after" data-t="after">after</button>
  </main>
</template>
