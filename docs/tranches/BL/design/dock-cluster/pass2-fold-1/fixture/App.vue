<script setup lang="ts">
/* Pass-2 fixture (O-200, O-202, O-199, F5). Query:
   shape=onedock (default): ONE collapsible GlassDock (a DockLayerGroup of faces "pages" and
     "page", collapse="closed", #collapsed = the page icon) + the theme member beside it.
   shape=swap: value's Tools -> tool view: a DockLayerGroup face swap (narrow "tools", wide
     "tool"), the tool's own control run as a member that arrives with it, + the theme member.
   nocluster=1: the 11.0.0 composition, no DockCluster (onedock: daraksha's live SiteDock,
     the theme in #persistent; swap: value's lone dock).
   mode=design|stripes|flat, dark=1, fused=1. */
import { computed, onMounted, ref, useTemplateRef } from "vue";
import { DockCluster, DockControl, DockLayer, DockLayerGroup, DockSeparator, GlassDock } from "@glass/components/dock";

const q = new URLSearchParams(location.search);
const mode = q.get("mode") ?? "design";
const shape = q.get("shape") ?? "onedock";
const cluster = q.get("nocluster") !== "1";
const startOpen = q.get("open") === "1";
const vec = ref<boolean[]>(q.get("fused") === "1" ? [true, true] : [false, false]);
const layer = ref(shape === "swap" ? "tools" : "pages");
const toolrun = ref(q.get("toolrun") !== "0");
const dark = document.documentElement.classList.contains("dark");
const site = useTemplateRef<InstanceType<typeof GlassDock>>("site");
/* challenge-1: bind=1 is the W-I.8 §5 "after" trigger, fused = !dock.expanded (no __ab.set);
   sitedock=1 puts daraksha's .site-dock placement on the cluster root (the §5 "after" template);
   reader=1 fills the "page" face with daraksha's real reader row (ReaderDock.vue, o1109-dock). */
const bind = q.get("bind") === "1";
const sitedock = q.get("sitedock") === "1";
const reader = q.get("reader") === "1";
/* fold-1: narrowAt=<rem> moves daraksha's reader breakpoint (C5) */
const readerNarrow = matchMedia(`(max-width: ${q.get("narrowAt") ?? "38.2"}rem)`).matches;
const fused = computed(() => (bind ? [!site.value?.expanded] : shape === "swap" && toolrun.value && layer.value === "tool" ? vec.value : vec.value.slice(0, 1)));
const PAGES = ["Name", "Colour", "Motion", "Qur'an"];
const narrow = innerWidth < 500;

onMounted(async () => {
    if (startOpen) site.value?.expand();
    (window as any).__ab = {
        set: (v: boolean | boolean[]) => { vec.value = typeof v === "boolean" ? [v, v] : [...v]; },
        layer: (id: string) => { layer.value = id; },
        toolrun: (v: boolean) => { toolrun.value = v; },
        expand: () => site.value?.expand(),
        collapse: () => site.value?.collapse(),
        expanded: () => !!site.value?.expanded,
        fused: () => JSON.stringify(fused.value),
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
        <div :class="sitedock ? 'stage-sd' : 'stage'">
            <component :is="cluster ? DockCluster : 'div'" :fused="fused" data-testid="cluster" dir="ltr"
                       :class="{ 'naive-row': !cluster, 'site-dock': sitedock }" role="group" aria-label="Site dock">
                <!-- ONE dock -->
                <GlassDock v-if="shape === 'onedock'" ref="site" fit-content collapse="closed" aria-label="Site"
                           collapsed-label="Name: open the dock">
                    <template v-if="!cluster" #persistent>
                        <DockControl :aria-label="dark ? 'Light theme' : 'Dark theme'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 14A8 8 0 1 1 10 4a7 7 0 0 0 10 10z"/></svg></DockControl>
                    </template>
                    <template #collapsed>
                        <svg class="page-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 17c3-6 5-6 6 0s3 6 6 0 4-6 6 0"/></svg>
                    </template>
                    <DockLayerGroup v-model:active="layer" :show-switcher="false">
                        <DockLayer id="pages" label="Pages">
                            <DockControl v-for="(p, i) in PAGES" :key="p" :active="i === 0" :aria-label="p" @click="layer = 'page'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path :d="['M3 17c3-6 5-6 6 0s3 6 6 0 4-6 6 0', 'M12 3a9 9 0 1 0 0 18', 'M4 7l8-4 8 4v10l-8 4-8-4z', 'M4 5h7v14H4zM13 5h7v14h-7z'][i]"/></svg><span v-if="i === 0" class="word">{{ p }}</span></DockControl>
                        </DockLayer>
                        <DockLayer id="page" label="Name controls">
                            <DockControl aria-label="Pages" @click="layer = 'pages'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17c3-6 5-6 6 0s3 6 6 0 4-6 6 0"/></svg></DockControl>
                            <DockSeparator />
                            <template v-if="reader">
                                <DockControl shape="tab" aria-label="Surah"><span lang="ar" dir="rtl">الفاتحة</span><span>1</span></DockControl>
                                <template v-if="!readerNarrow">
                                    <DockControl aria-label="Previous surah"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg></DockControl>
                                    <DockControl aria-label="Next surah"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></DockControl>
                                    <DockSeparator />
                                    <div class="views" role="group" aria-label="View">
                                        <DockControl v-for="(v, vi) in ['Focus', 'Verses', 'Page']" :key="v" shape="tab" :active="vi === 0">{{ v }}</DockControl>
                                    </div>
                                    <DockSeparator />
                                </template>
                                <DockControl shape="tab">{{ readerNarrow ? "More" : "Text" }}</DockControl>
                            </template>
                            <template v-else>
                            <DockControl aria-label="Text size"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 18 9 6l5 12M6 14h6M15 18l3-7 3 7"/></svg></DockControl>
                            <DockControl aria-label="Bookmark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16l-6-4-6 4z"/></svg></DockControl>
                            </template>
                        </DockLayer>
                    </DockLayerGroup>
                </GlassDock>
                <!-- value's Tools -> tool view -->
                <GlassDock v-if="shape === 'swap'" ref="site" fit-content :collapse="false" aria-label="Color">
                    <DockLayerGroup v-model:active="layer" :show-switcher="false">
                        <DockLayer id="tools" label="Home">
                            <DockControl aria-label="Palette"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/></svg></DockControl>
                            <DockControl shape="tab" @click="layer = 'tool'">Tools &rarr;</DockControl>
                        </DockLayer>
                        <DockLayer id="tool" label="Gradient tool">
                            <DockControl aria-label="Back" @click="layer = 'tools'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg></DockControl>
                            <DockSeparator />
                            <DockControl v-for="n in (narrow ? 2 : 5)" :key="n" :aria-label="`Stop ${n}`"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="3"/></svg></DockControl>
                        </DockLayer>
                    </DockLayerGroup>
                </GlassDock>
                <GlassDock v-if="cluster && shape === 'swap' && toolrun && layer === 'tool'" fit-content :collapse="false" aria-label="Tool run">
                    <DockControl aria-label="Undo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3"/></svg></DockControl>
                    <DockControl aria-label="Apply"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5 9-10"/></svg></DockControl>
                </GlassDock>
                <!-- the theme member -->
                <GlassDock v-if="cluster" fit-content :collapse="false" aria-label="Theme">
                    <DockControl :aria-label="dark ? 'Light theme' : 'Dark theme'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 14A8 8 0 1 1 10 4a7 7 0 0 0 10 10z"/></svg></DockControl>
                </GlassDock>
            </component>
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
.naive-row { display: flex; gap: 0.625rem; align-items: center; }
.naive-row > .glass-dock { margin-inline: 0; }
.stage-sd { position: absolute; inset: 0; pointer-events: none; }
/* daraksha o1109-dock src/shell/SiteDock.vue, .site-dock (scoped there; unlayered either way) */
:root { --gutter: max(1rem, env(safe-area-inset-left), env(safe-area-inset-right)); }
.site-dock { position: fixed; inset-inline: var(--gutter); inset-block-end: calc(1rem + env(safe-area-inset-bottom)); z-index: 40; display: flex; justify-content: center; align-items: center; pointer-events: none; }
.site-dock > .glass-dock { pointer-events: auto; }
.views { display: flex; align-items: center; gap: var(--dock-layer-gap, 0.375rem); }
.page-icon { inline-size: 1.125rem; block-size: 1.125rem; }
[data-probe] .glass-dock button, [data-probe] .glass-dock .dock-layer--summary svg { visibility: hidden; }
.sentinel { position: absolute; top: 4px; left: 4px; font-size: 10px; opacity: 0.01; }
.sentinel.after { top: auto; bottom: 4px; }
</style>
