<script setup lang="ts">
/* Challenge fixture (O-195 / W-I.8 challenger). The AB fixture's markup, plus the cells AB.md
   did not measure. Query: mode=design|stripes|flat, fused=0|1, dark=1, orient=vertical, rtl=1,
   router=1 (daraksha's §5 consumer logic, verbatim in shape). */
import { computed, nextTick, onMounted, ref } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { DockCluster, DockControl, GlassDock } from "@glass/components/dock";

const q = new URLSearchParams(location.search);
const mode = q.get("mode") ?? "design";
const vertical = q.get("orient") === "vertical";
const rtl = q.get("rtl") === "1";
const useRouter_ = q.get("router") === "1";
const vec = ref<boolean[]>(q.get("fused") === "1" ? [true, true] : [false, false]);
const extra = ref(false);
const controls = ref(true);
const narrow = innerWidth < 500;
const tabs = ref<string[]>(narrow ? ["Read", "Hear", "Learn"] : ["Read", "Hear", "Learn", "About"]);
const dark = document.documentElement.classList.contains("dark");
const page = ref(0);

/* ---- daraksha §5, transcribed: a router, a `changing` beat, reach, reading ---- */
const A = { template: "<div>a</div>" };
const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/a", component: { render: () => null }, meta: { dockControls: true } },
        { path: "/b", component: { render: () => null }, meta: { dockControls: false } },
        { path: "/c", component: { render: () => null }, meta: { dockControls: true } },
    ],
});
void A;
const changing = ref(false);
const reach = ref(false);
const reading = ref(true);
router.beforeEach(() => { changing.value = true; });
router.afterEach(async () => { await nextTick(); changing.value = false; });
const routeHasControls = computed(() => router.currentRoute.value.meta.dockControls === true);
const routedFused = computed(() => changing.value || (reading.value && !reach.value));
const fusedProp = computed(() => (useRouter_ ? [routedFused.value, routedFused.value] : vec.value));
const showControls = computed(() => (useRouter_ ? routeHasControls.value : controls.value));

onMounted(async () => {
    if (useRouter_) { await router.push("/a"); await router.isReady(); }
    (window as any).__ab = {
        set: (v: boolean | boolean[]) => { vec.value = typeof v === "boolean" ? [v, v] : [...v]; },
        extra: (v: boolean) => { extra.value = v; },
        controls: (v: boolean) => { controls.value = v; },
        tabs: (t: string[]) => { tabs.value = [...t]; },
        page: (i: number) => { page.value = i; },
        reach: (v: boolean) => { reach.value = v; },
        reading: (v: boolean) => { reading.value = v; },
        go: (p: string) => router.push(p),
        state: () => ({ changing: changing.value, reach: reach.value, reading: reading.value, fused: routedFused.value, route: router.currentRoute.value.path }),
        ready: true,
    };
});
</script>

<template>
    <main class="field" :data-mode="mode" :data-probe="mode !== 'design' ? '' : undefined">
        <button id="sentinel-before" class="sentinel">before</button>
        <div v-if="mode === 'design'" class="copy" aria-hidden="true">
            <p v-for="i in 9" :key="i">Glass reads what lies under it, line {{ i }}, and the dock sits on the page.</p>
        </div>
        <div v-if="mode === 'stripes'" class="band" aria-hidden="true"></div>
        <div class="stage" :class="{ vertical }">
            <DockCluster :fused="fusedProp" :joins="fusedProp" data-testid="cluster" :dir="rtl ? 'rtl' : 'ltr'"
                         :class="{ 'cluster-vertical': vertical }" role="group" aria-label="Site dock">
                <GlassDock fit-content :collapse="false" :orientation="vertical ? 'vertical' : 'horizontal'" aria-label="Pages">
                    <DockControl v-for="(p, i) in tabs" :key="p" shape="tab" :active="i === page" @click="page = i">{{ p }}</DockControl>
                </GlassDock>
                <GlassDock v-if="showControls" fit-content :collapse="false" :orientation="vertical ? 'vertical' : 'horizontal'" aria-label="Page controls">
                    <DockControl aria-label="Text size"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 18 9 6l5 12M6 14h6M15 18l3-7 3 7"/></svg></DockControl>
                    <DockControl v-if="!narrow" aria-label="Bookmark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16l-6-4-6 4z"/></svg></DockControl>
                    <DockControl v-if="extra" aria-label="Share"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/></svg></DockControl>
                </GlassDock>
                <GlassDock fit-content :collapse="false" :orientation="vertical ? 'vertical' : 'horizontal'" aria-label="Theme">
                    <DockControl :aria-label="dark ? 'Light theme' : 'Dark theme'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 14A8 8 0 1 1 10 4a7 7 0 0 0 10 10z"/></svg></DockControl>
                </GlassDock>
            </DockCluster>
        </div>
        <button id="sentinel-after" class="sentinel after">after</button>
    </main>
</template>

<style>
.field { position: relative; min-height: 100vh; overflow: hidden;
  background: radial-gradient(40rem 22rem at 20% 30%, oklch(0.78 0.14 40 / 0.9), transparent 70%),
              radial-gradient(36rem 20rem at 80% 70%, oklch(0.72 0.13 250 / 0.9), transparent 70%), oklch(0.95 0.02 90); }
.dark .field { background: radial-gradient(40rem 22rem at 20% 30%, oklch(0.45 0.12 40 / 0.9), transparent 70%),
              radial-gradient(36rem 20rem at 80% 70%, oklch(0.42 0.12 250 / 0.9), transparent 70%), oklch(0.2 0.02 260); }
.field[data-mode="flat"] { background: oklch(0.93 0.02 90); }
.dark .field[data-mode="flat"] { background: oklch(0.24 0.02 260); }
.copy { position: absolute; inset: 0; display: grid; align-content: center; gap: 2px; text-align: center;
  font: 600 20px/1.3 system-ui, sans-serif; color: oklch(0.25 0.02 260 / 0.75); pointer-events: none; }
.dark .copy { color: oklch(0.92 0.01 90 / 0.7); }
.band { position: absolute; inset-inline: 0; top: calc(50% - 40px); height: 80px;
  background: repeating-linear-gradient(90deg, oklch(0.25 0.03 260) 0 6px, oklch(0.97 0.01 90) 6px 12px); }
.stage { position: absolute; inset-inline: 16px; top: calc(50% - 26px); display: flex; justify-content: center; }
.stage.vertical { top: 40px; }
/* a consumer's vertical cluster: the members stack (GlassDock's own vertical orientation) */
.cluster-vertical { flex-direction: column; }
[data-probe] .glass-dock button { visibility: hidden; }
.sentinel { position: absolute; top: 4px; left: 4px; font-size: 10px; opacity: 0.01; }
.sentinel.after { top: auto; bottom: 4px; }
</style>
