<script setup lang="ts">
import { reactive, ref, watch, computed } from "vue";
import { Video, Folder, Spool, Pin, ArrowRight, ChevronDown, Play, Pause, Check, Pencil, Save, Sun } from "@lucide/vue";
import { Presence, follow } from "@glass/composables/motion/presence";
import { breathe } from "./breathe-candidate";
import LabeledField from "@glass/components/labeled-field/LabeledField.vue";

const q = new URLSearchParams(location.search);
const page = q.get("page") ?? "main";

const s = reactive({
    on: false,
    expanded: false,
    busy: false,
    idle: false,
    note: false,
    playing: false,
    bare: false,
    stay: false,
    mark: false,
    error: false,
    pair: false,
    lferr: false,
    query: "",
    value: "Linear",
    hits: 0,
});
(window as unknown as { __h: typeof s }).__h = s;
let stopBreath: (() => void) | null = null;
Object.assign(window, {
    __breathe: () => { stopBreath = breathe(document.querySelector<HTMLElement>("#idle2")); },
    __breatheStop: () => stopBreath?.(),
});

const cmd = ref<HTMLElement | null>(null);
const sel = ref<HTMLElement | null>(null);
const rows = Array.from({ length: 50 }, (_, i) => `Command ${i + 1}`);
const shown = computed(() => rows.filter((r) => r.toLowerCase().includes(s.query.toLowerCase())));
watch(() => s.query, () => follow(cmd.value), { flush: "pre" });
</script>

<template>
    <main v-if="page === 'main'" class="wrap">
        <!-- The owner's frame, rebuilt: four icons on two grey plates. -->
        <section id="cell-bar" class="cell">
            <div class="bar">
                <div class="bar-l">
                    <button id="b-video" class="seat plate" aria-label="Video" style="--plate-tone: oklch(0.6 0.13 250)"><Video :size="20" /></button>
                </div>
                <div class="bar-r">
                    <button id="b-folder" class="seat plate" aria-label="Shared" style="--plate-tone: oklch(0.55 0.2 300)"><Folder :size="20" /></button>
                    <button id="b-spool" class="seat plate" aria-label="Thread" style="--plate-tone: oklch(0.6 0.13 230)"><Spool :size="20" /></button>
                    <button id="b-pin" class="seat plate" aria-label="Board" style="--plate-tone: oklch(0.65 0.16 55)"><Pin :size="20" /></button>
                </div>
            </div>
        </section>

        <section id="cell-seat" class="cell">
            <button id="seat44" class="seat seat44 plate" aria-label="Folder"><Folder id="seat44-g" :size="24" /></button>
            <button id="g16" class="seat plate" aria-label="Folder 16"><Folder id="g16-g" :size="16" /></button>
            <button id="g24" class="seat seat44 plate" aria-label="Folder 24"><Folder id="g24-g" :size="24" /></button>
        </section>

        <section id="cell-row" class="cell">
            <button id="row" class="row plate" style="--plate-from: 1"><Pin :size="16" /><span>Open board</span></button>
        </section>

        <section id="cell-verbs" class="cell">
            <button id="nudge" class="seat plate" aria-label="Next"><ArrowRight id="nudge-g" :size="20" data-glyph="nudge" /></button>
            <button id="turn" class="seat plate" aria-label="Theme"><Sun id="turn-g" :size="20" data-glyph="turn" /></button>
            <button id="chev" class="seat plate" aria-label="More" :aria-expanded="s.expanded" style="--glyph-dx: 0px; --glyph-dy: 2px; --glyph-flip: 0.5turn" @click="s.expanded = !s.expanded"><ChevronDown id="chev-g" :size="20" data-glyph="nudge" /></button>
            <button id="draw" class="seat plate" aria-label="Easing">
                <svg id="draw-g" data-glyph="draw" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path id="draw-p" pathLength="1" d="M3 20 C 10 20, 12 4, 21 4" />
                </svg>
            </button>
            <!-- Item 5: an inner group turns about its own box (no plate: the button resets the numbers). -->
            <button id="sun" class="seat" aria-label="Sun group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <circle cx="12" cy="12" r="4" />
                    <g id="sun-g" data-glyph="turn" style="--glyph-turn: 45deg">
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </g>
                </svg>
            </button>
        </section>

        <section id="cell-state" class="cell">
            <button id="focus" class="seat plate focus-ring" aria-label="Focus"><Folder :size="20" /></button>
            <button id="press" class="seat plate" aria-label="Press"><Folder :size="20" /></button>
            <button id="on" class="seat plate" aria-label="On" :aria-pressed="s.on" @click="s.on = !s.on"><Pin :size="20" /></button>
            <button id="busy" class="textbtn plate" :aria-busy="s.busy || undefined"><Save :size="16" /><span>Save</span></button>
        </section>

        <section id="cell-idle" class="cell">
            <div id="idle" class="card plate" :data-idle="s.idle || undefined">Start</div>
        </section>

        <section id="cell-presence" class="cell">
            <div class="stack" id="pres-host">
                <Presence><p v-if="s.note" id="pres-p" class="note">Saved to drafts</p></Presence>
            </div>
            <button id="swap" class="seat plate" aria-label="Play" @click="s.playing = !s.playing">
                <Presence swap><Pause v-if="s.playing" id="sw-pause" key="pause" :size="20" /><Play v-else id="sw-play" key="play" :size="20" /></Presence>
            </button>
            <button id="bare" class="seat plate" aria-label="Bare" @click="s.bare = !s.bare">
                <Pause v-if="s.bare" id="bare-pause" :size="20" /><Play v-else id="bare-play" :size="20" />
            </button>
            <span class="stayseat"><Check id="stay-mark" :size="18" data-presence="swap" :data-absent="!s.mark || undefined" /></span>
            <span id="stay-line" class="note" data-presence :data-absent="!s.stay || undefined">Copied</span>
        </section>

        <section id="cell-form" class="cell">
            <form class="form" @submit.prevent>
                <label v-for="n in 12" :key="n" :id="`f${n}`" class="field">
                    <span>Field {{ n }}</span>
                    <input class="input" />
                    <Presence v-if="n === 6"><p v-if="s.error" id="err" class="err">This field needs a value</p></Presence>
                </label>
            </form>
        </section>

        <section id="cell-cmd" class="cell bg">
            <div id="cmd" ref="cmd" class="cmd glass-floating">
                <input id="cmd-q" class="input" :value="s.query" @input="s.query = ($event.target as HTMLInputElement).value" />
                <ul class="list"><li v-for="r in shown" :key="r" class="li">{{ r }}</li></ul>
            </div>
        </section>

        <section id="cell-sel" class="cell">
            <button id="sel" ref="sel" class="textbtn plate" style="--plate-from: 1">
                <Presence swap><span :key="s.value" id="sel-t">{{ s.value }}</span></Presence>
                <ChevronDown :size="16" />
            </button>
            <span id="sel-next" class="note">after</span>
        </section>

        <section id="cell-blur" class="cell bg">
            <div id="blur-host" class="glass-floating blurhost">
                <button v-for="n in 12" :key="n" :id="`bl${n}`" class="seat plate" :aria-label="`b${n}`"><Folder :size="20" /></button>
            </div>
        </section>

        <section id="cell-nest" class="cell">
            <div id="nest-outer" class="row plate" role="button" tabindex="0" style="--plate-from: 1">
                <ChevronDown id="nest-outer-g" :size="16" data-glyph="nudge" style="--glyph-dx: 0px; --glyph-dy: 2px" />
                <span>Ease out</span>
                <button id="nest-inner" class="seat small plate" aria-label="Edit"><Pencil id="nest-inner-g" :size="14" /></button>
            </div>
        </section>

        <!-- Fold: the owner image variants. b: the selected strength, the seat's tone, the glyph in it. c: a static shape. -->
        <section id="cell-bar-b" class="cell">
            <div class="bar">
                <div class="bar-l"><button class="seat plate tone" aria-label="Video" style="--plate-tone: oklch(0.6 0.13 250)"><Video :size="20" /></button></div>
                <div class="bar-r">
                    <button class="seat plate tone" aria-label="Shared" style="--plate-tone: oklch(0.55 0.2 300)"><Folder :size="20" /></button>
                    <button class="seat plate tone" aria-label="Thread" style="--plate-tone: oklch(0.6 0.13 230)"><Spool :size="20" /></button>
                    <button id="b-pin-b" class="seat plate tone" aria-label="Board" style="--plate-tone: oklch(0.65 0.16 55)"><Pin :size="20" /></button>
                </div>
            </div>
        </section>
        <section id="cell-bar-c" class="cell">
            <div class="bar">
                <div class="bar-l"><button class="seat plate tone shaped" aria-label="Video" style="--plate-tone: oklch(0.6 0.13 250)"><Video :size="20" /></button></div>
                <div class="bar-r">
                    <button class="seat plate tone shaped" aria-label="Shared" style="--plate-tone: oklch(0.55 0.2 300)"><Folder :size="20" /></button>
                    <button class="seat plate tone shaped" aria-label="Thread" style="--plate-tone: oklch(0.6 0.13 230)"><Spool :size="20" /></button>
                    <button id="b-pin-c" class="seat plate tone shaped" aria-label="Board" style="--plate-tone: oklch(0.65 0.16 55)"><Pin :size="20" /></button>
                </div>
            </div>
        </section>

        <!-- Fold: a glyph that grows by name; the draw at two gaps; a click on an open trigger. -->
        <section id="cell-fold-glyph" class="cell">
            <button id="grow" class="seat plate" aria-label="Grow"><Folder id="grow-g" :size="20" data-glyph="grow" /></button>
            <button id="draw30" class="seat plate" aria-label="Easing 0.3" style="--glyph-gap: 0.3">
                <svg data-glyph="draw" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path id="draw30-p" pathLength="1" d="M3 20 C 10 20, 12 4, 21 4" /></svg>
            </button>
            <button id="drawx" class="seat plate" aria-label="Easing menu" aria-haspopup="menu" :aria-expanded="s.expanded" @click="s.expanded = !s.expanded">
                <svg data-glyph="draw" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path id="drawx-p" pathLength="1" d="M3 20 C 10 20, 12 4, 21 4" /></svg>
            </button>
        </section>

        <!-- Fold: a control with its own transition list (C-6); a bordered control (C-16). -->
        <section id="cell-own" class="cell">
            <button id="own" class="textbtn plate ownt"><span>Own list</span></button>
            <button id="own2" class="textbtn plate ownt2"><span>Own list with scale</span></button>
            <button id="bord" class="seat plate bord" aria-label="Bordered" aria-pressed="true"><Folder :size="20" /></button>
            <button id="bord2" class="seat plate bord bord-in" aria-label="Bordered, inset" aria-pressed="true"><Folder :size="20" /></button>
        </section>

        <!-- Fold: a pair of marks that both stay, stacked in one seat (C-7). -->
        <section id="cell-pair" class="cell">
            <button id="pair" class="seat plate" aria-label="Play pair" @click="s.pair = !s.pair">
                <Pause id="pair-pause" :size="20" data-presence="swap" :data-absent="!s.pair || undefined" />
                <Play id="pair-play" :size="20" data-presence="swap" :data-absent="s.pair || undefined" />
            </button>
        </section>

        <!-- Fold: the breath as one added Web Animation (C-1). -->
        <section id="cell-idle2" class="cell">
            <div id="idle2" class="card plate" style="--plate-from: 1">Start</div>
        </section>

        <!-- Fold: the real LabeledField, twelve of them, on a blurred surface; the error line stays (C-3, C-19). -->
        <section id="cell-lf" class="cell bg">
            <div id="lf-host" class="glass-floating lfhost">
                <LabeledField v-for="n in 12" :key="n" :id="`lf${n}`" :label="`Field ${n}`" :invalid="n === 6 && s.lferr">
                    <template #default="{ controlId }"><input :id="controlId" class="input" /></template>
                    <template #error>This field needs a value</template>
                </LabeledField>
            </div>
        </section>

        <section id="cell-hit" class="cell">
            <button id="hit40" class="seat plate" aria-label="Hit 40" @click="s.hits++"><Check :size="20" /></button>
            <button id="hit24" class="seat small plate" aria-label="Hit 24" @click="s.hits++"><Check :size="14" /></button>
        </section>
        <div class="tail" aria-hidden="true"></div>
    </main>

    <main v-else class="wrap rest">
        <button v-for="n in 40" :key="'p' + n" class="seat plate" :aria-label="`p${n}`"><Folder :size="20" /></button>
        <button v-for="n in 40" :key="'g' + n" class="seat" :aria-label="`g${n}`"><ArrowRight :size="20" data-glyph="nudge" /></button>
        <span v-for="n in 10" :key="'s' + n" class="note" data-presence>Kept {{ n }}</span>
    </main>
</template>

<style>
.wrap { display: flex; flex-direction: column; gap: 20px; padding: 16px; max-width: 760px; }
.cell { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 12px; border-radius: 16px; }
.cell.bg { background: linear-gradient(120deg, oklch(0.75 0.15 30), oklch(0.75 0.15 200)); }
.seat { display: inline-grid; place-items: center; inline-size: 40px; block-size: 40px; border: 0; border-radius: 12px; background: transparent; color: var(--foreground); padding: 0; cursor: pointer; }
.seat44 { inline-size: 44px; block-size: 44px; border-radius: 14px; }
.small { inline-size: 24px; block-size: 24px; border-radius: 8px; }
.bar { display: flex; gap: 2px; }
.bar-l, .bar-r { display: flex; gap: 4px; padding: 4px; background: color-mix(in oklab, var(--foreground) 6%, transparent); }
.bar-l { border-radius: 16px 4px 4px 16px; }
.bar-r { border-radius: 4px 16px 16px 4px; }
.row { display: inline-flex; align-items: center; gap: 10px; inline-size: 240px; block-size: 36px; padding: 0 12px; border: 0; border-radius: 10px; background: transparent; color: var(--foreground); font: inherit; cursor: pointer; }
.textbtn { display: inline-flex; align-items: center; gap: 8px; block-size: 36px; padding: 0 14px; border: 0; border-radius: 12px; background: transparent; color: var(--foreground); font: inherit; cursor: pointer; white-space: nowrap; }
.card { display: grid; place-items: center; inline-size: 280px; block-size: 120px; border-radius: 20px; font-size: 20px; }
.stack { display: flex; flex-direction: column; min-block-size: 24px; inline-size: 200px; }
.note { margin: 0; font-size: 14px; }
.stayseat { display: inline-grid; place-items: center; inline-size: 24px; block-size: 24px; }
.form { display: flex; flex-direction: column; row-gap: 10px; inline-size: 300px; }
.field { display: flex; flex-direction: column; row-gap: 4px; font-size: 13px; }
.input { block-size: 28px; border: 1px solid color-mix(in oklab, var(--foreground) 20%, transparent); border-radius: 8px; background: transparent; color: inherit; padding: 0 8px; }
.err { margin: 0; font-size: 12px; color: oklch(0.55 0.2 25); }
.cmd { display: flex; flex-direction: column; gap: 6px; inline-size: 300px; padding: 8px; }
.list { list-style: none; margin: 0; padding: 0; max-block-size: 320px; overflow: auto; }
.li { block-size: 32px; line-height: 32px; padding: 0 8px; font-size: 14px; }
.blurhost { display: grid; grid-template-columns: repeat(6, 40px); gap: 6px; padding: 10px; }
.tone.plate:hover::before { opacity: 1; }
.tone svg { transition: color var(--duration-control) var(--ease-standard); }
.tone:hover svg { color: var(--plate-tone); }
.shaped.plate::before { clip-path: path("M14.35 5.63 Q20 1.5 25.65 5.63 L32.85 10.87 Q38.5 15 36.46 21.70 L33.54 31.30 Q31.5 38 24.50 38.00 L15.50 38.00 Q8.5 38 6.46 31.30 L3.54 21.70 Q1.5 15 7.15 10.87 Z"); }
.ownt { transition: color var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard); }
.ownt2 { transition: color var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard), scale var(--spring-press-duration) var(--spring-press); }
.bord { border: 2px solid color-mix(in oklab, var(--foreground) 45%, transparent); border-radius: 12px; }
.bord-in { --plate-edge: 2px; }
.lfhost { display: grid; gap: 10px; inline-size: 320px; padding: 14px; }
.rest { flex-direction: row; flex-wrap: wrap; }
.tail { block-size: 100vh; }
</style>
