<script setup lang="ts">
/* The ONE AB fixture (measurer). Identical markup for both prototypes: the cluster gets the
   same fused vector through both proposals' props (`fused` for A, `joins` for B); each
   component ignores the other's. Query: mode=design|stripes|flat, fused=0|1, naive=1, dark=1. */
import { onMounted, ref } from "vue";
import { DockCluster, DockControl, GlassDock } from "@glass/components/dock";

const q = new URLSearchParams(location.search);
const mode = q.get("mode") ?? "design";
const naive = q.get("naive") === "1";
const vec = ref<boolean[]>(q.get("fused") === "1" ? [true, true] : [false, false]);
const extra = ref(false);
const narrow = innerWidth < 500;
const PAGES = narrow ? ["Read", "Hear", "Learn"] : ["Read", "Hear", "Learn", "About"];
const dark = document.documentElement.classList.contains("dark");
const page = ref(0);

onMounted(() => {
    (window as any).__ab = {
        set: (v: boolean | boolean[]) => { vec.value = typeof v === "boolean" ? [v, v] : [...v]; },
        extra: (v: boolean) => { extra.value = v; },
        page: (i: number) => { page.value = i; },
        ready: true,
    };
});
</script>

<template>
    <main class="field" :data-mode="mode" :data-probe="mode !== 'design' ? '' : undefined">
        <button id="sentinel-before" class="sentinel">before</button>
        <div class="ctl" aria-hidden="true"><div class="ctl-bd"></div><div class="ctl-f"></div></div>
        <div v-if="mode === 'design'" class="copy" aria-hidden="true">
            <p v-for="i in 9" :key="i">Glass reads what lies under it, line {{ i }}, and the dock sits on the page.</p>
        </div>
        <div v-if="mode === 'stripes'" class="band" aria-hidden="true"></div>
        <div class="stage">
            <div v-if="naive" class="naive-row" data-testid="cluster">
                <GlassDock fit-content :collapse="false" aria-label="Pages"><DockControl v-for="(p, i) in PAGES" :key="p" shape="tab" :active="i === page">{{ p }}</DockControl></GlassDock>
                <GlassDock fit-content :collapse="false" aria-label="Page controls"><DockControl aria-label="Text size"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 18 9 6l5 12M6 14h6M15 18l3-7 3 7"/></svg></DockControl><DockControl v-if="!narrow" aria-label="Bookmark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16l-6-4-6 4z"/></svg></DockControl></GlassDock>
                <GlassDock fit-content :collapse="false" aria-label="Theme"><DockControl :aria-label="dark ? 'Light theme' : 'Dark theme'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 14A8 8 0 1 1 10 4a7 7 0 0 0 10 10z"/></svg></DockControl></GlassDock>
            </div>
            <DockCluster v-else :fused="vec" :joins="vec" data-testid="cluster" dir="ltr" aria-label="Site dock">
                <GlassDock fit-content :collapse="false" aria-label="Pages">
                    <DockControl v-for="(p, i) in PAGES" :key="p" shape="tab" :active="i === page" @click="page = i">{{ p }}</DockControl>
                </GlassDock>
                <GlassDock fit-content :collapse="false" aria-label="Page controls">
                    <DockControl aria-label="Text size"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 18 9 6l5 12M6 14h6M15 18l3-7 3 7"/></svg></DockControl>
                    <DockControl v-if="!narrow" aria-label="Bookmark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16l-6-4-6 4z"/></svg></DockControl>
                    <DockControl v-if="extra" aria-label="Share"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/></svg></DockControl>
                </GlassDock>
                <GlassDock fit-content :collapse="false" aria-label="Theme">
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
/* flat: one uniform colour, so any step at a join is the seam itself */
.field[data-mode="flat"] { background: oklch(0.93 0.02 90); }
.dark .field[data-mode="flat"] { background: oklch(0.24 0.02 260); }
.copy { position: absolute; inset: 0; display: grid; align-content: center; gap: 2px; text-align: center;
  font: 600 20px/1.3 system-ui, sans-serif; color: oklch(0.25 0.02 260 / 0.75); pointer-events: none; }
.dark .copy { color: oklch(0.92 0.01 90 / 0.7); }
.band { position: absolute; inset-inline: 0; top: calc(50% - 40px); height: 80px;
  background: repeating-linear-gradient(90deg, oklch(0.25 0.03 260) 0 6px, oklch(0.97 0.01 90) 6px 12px); }
.stage { position: absolute; inset-inline: 16px; top: calc(50% - 26px); display: flex; justify-content: center; }
.naive-row { display: flex; }
.naive-row > .glass-dock { margin: 0; }
.naive-row > .glass-dock:not(:first-child) { border-start-start-radius: 0; border-end-start-radius: 0; }
.naive-row > .glass-dock:not(:last-child) { border-start-end-radius: 0; border-end-end-radius: 0; }
/* probe modes: control faces hidden (layout kept) so a row through a plate reads only its material */
[data-probe] .glass-dock button { visibility: hidden; }
.sentinel { position: absolute; top: 4px; left: 4px; font-size: 10px; opacity: 0.01; }
.sentinel.after { top: auto; bottom: 4px; }
/* engine control: a bare backdrop-filter div and a filtered div over stripes, top band */
.ctl { position: absolute; top: 24px; left: 0; right: 0; height: 48px;
  background: repeating-linear-gradient(90deg, oklch(0.25 0.03 260) 0 6px, oklch(0.97 0.01 90) 6px 12px); }
.ctl-bd { position: absolute; left: 16px; top: 4px; width: 120px; height: 40px; backdrop-filter: blur(16px); }
.ctl-f { position: absolute; left: 160px; top: 4px; width: 120px; height: 40px; filter: blur(16px);
  background: repeating-linear-gradient(90deg, oklch(0.25 0.03 260) 0 6px, oklch(0.97 0.01 90) 6px 12px); }
</style>
