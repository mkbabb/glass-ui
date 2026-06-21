<script setup lang="ts">
// BE.W-LIQUID-MORPH (WAVE-2 integration) — the liquid-dock PLAYGROUND, re-wired onto
// the SHIPPED BE library primitives (commit 5b7c4530). The wave-1 box-scale-crush +
// orphan-magnifier + island-waist + vertical-amputation defects are fixed at the
// ROOT by composing the real engines, not by tuning the throwaway spike:
//
//   • EXPAND (Search → Places sheet) + PLAYER (now-playing pill → player) use
//     `useBloomUp(pillRef, sheetRef)`: the dock box STAYS PILL-SIZED; the sheet/player
//     is a SEPARATE overlay that lays out at its FULL settled rect ONCE and BLOOMs from
//     the pill's rect (transform/opacity/filter — NEVER a box-scale that crushes
//     content). The pill's magnifier and the sheet's search field are ONE FLIPping
//     element, so the orphan magnifier is gone. The 4th color channel warms the stage
//     FIELD toward the album hue (the sheet's --glass-ambient-hue).
//   • ISLAND (Split → islands) uses `useDockFission`: at REST the island is ONE crisp
//     `.glass-floating` pill (goo OFF); the two activity halves register as fission
//     PIECES with opposite vectors. On split the goo NECK stretches-thins-snaps between
//     them (the `.dock-fission-bridge` host + the library `<DockGooFilter>` mount). No
//     two-abutting-blob waist.
//   • VERTICAL is a CONTENT REFLOW per mode (album → title → transport stacked), never
//     a `display:none` amputation to a bare square.
import { computed, onMounted, ref, watch } from "vue";
import {
    Search,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Mic,
    Briefcase,
    Home,
    Bookmark,
    Plus,
    MapPin,
    Building2,
    Scissors,
    Timer,
    Music,
    // ── the rail section (BE.W-DOCK-RAIL-REALIZE scope — untouched here) ──
    Folder,
    Image,
    Film,
    Star,
    Heart,
    Tag,
    Clock,
} from "@lucide/vue";
import { IconChip } from "../../../src/components/custom/icon-chip";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { Button } from "../../../src/components/ui/button";
import { Slider } from "../../../src/components/ui/slider";
import { SegmentedTabs } from "../../../src/components/custom/tabs";
import { Aurora, DEFAULT_AURORA_CONFIG } from "../../../src/components/custom/aurora";
import { useBloomUp } from "../../../src/composables/motion/useBloomUp";
import {
    useDockFission,
    DOCK_SPLIT_SIGNATURES,
} from "../../../src/components/custom/dock/composables";
import {
    DockGooFilter,
    DockIconButton,
    DockSeparator,
    DockStack,
    GlassDock,
} from "../../../src/components/custom/dock";
import type { DockStackItem } from "../../../src/components/custom/dock/constants";

// ── controls ──────────────────────────────────────────────────────────────────
// THREE registers, all driven by REAL primitives:
//   • "expand" → a Maps SEARCH PILL that BLOOMS into a Places sheet (useBloomUp).
//   • "island" → a Dynamic-Island SPLIT — ONE crisp pill FISSIONS into a timer + a
//     now-playing island, goo-necked as they part (useDockFission).
//   • "player" → a now-playing PILL that BLOOMS into the full Apple Music player.
type PlaygroundMode = "expand" | "island" | "player";
const mode = ref<PlaygroundMode>("expand");
const modeTabs = [
    { value: "expand", label: "Search → sheet" },
    { value: "island", label: "Split → islands" },
    { value: "player", label: "Now Playing" },
];
const track = {
    title: "You Are (Not) Alone",
    artist: "Shiro Sagisu",
    album: "Evangelion: 1.0",
};
// the album's dominant hue — the 4th color channel the bloom warms the FIELD toward
// (the iOS "the whole world takes on the album's color"). A complete <color>, demo-local
// (presets-in-consumers — never a library token).
const albumHue = "oklch(0.62 0.19 18)";

// the dock's resting axis — horizontal pill (row) or vertical pill (column). EVERY mode
// works on BOTH; vertical is a content REFLOW (a column layout), never a display:none.
const orientation = ref<"horizontal" | "vertical">("horizontal");
function toggleOrientation(): void {
    orientation.value = orientation.value === "horizontal" ? "vertical" : "horizontal";
    // a mid-flight orientation flip while a bloom is open closes it cleanly (the sheet
    // re-blooms from the re-oriented pill on the next open).
    if (open.value && mode.value !== "island") close();
}

// the expand pane content — the iOS-27 Maps "Places" sheet.
const places = [
    { icon: Briefcase, label: "Work", section: 8 },
    { icon: Home, label: "Home", section: 10 },
    { icon: Bookmark, label: "Saved", section: 2 },
    { icon: Plus, label: "Add", section: 6 },
];
const recents = [
    { icon: MapPin, name: "Winston-Salem", sub: "North Carolina" },
    { icon: Building2, name: "Costco Wholesale", sub: "1305 Hanes Mall Blvd" },
    { icon: Scissors, name: "A Better Man's Barber", sub: "Reynolda Road" },
];

// ── refs: the pill (the bloom SOURCE) + the bloom DESTINATIONS ───────────────────
const stageRef = ref<HTMLElement | null>(null); // the [data-glass-field] the 4th channel warms
const dockRef = ref<HTMLElement | null>(null); // the PILL (stays pill-sized; the bloom source)
const sheetRef = ref<HTMLElement | null>(null); // the Places sheet (expand) — full-size dest
const playerRef = ref<HTMLElement | null>(null); // the player card (player) — full-size dest

// the open state for the BLOOM modes (expand/player). The sheet/player overlay is
// rendered only while open || blooming so it never occludes the pill at rest.
const open = ref(false);

// ── EXPAND / PLAYER — the shared-element BLOOM ──────────────────────────────────
// the active destination ref (the sheet for expand, the player for player). The bloom
// FLIPs the dest FROM the pill's rect — the dest lays out at its full settled size and
// the pill becomes its visual origin (the search field / now-playing row is the SAME
// FLIPping element, so no orphan magnifier).
const destRef = computed(() =>
    mode.value === "player" ? playerRef.value : sheetRef.value,
);
const destRefBox = computed({
    get: () => destRef.value,
    set: () => {},
});

const bloom = useBloomUp(dockRef, destRefBox, {
    preset: "bouncy", // the emphatic large-surface bloom (iOS-27 sheet register)
    blur: 5,
    // NO static fieldHue — the leaf reads `--glass-ambient-hue` off the SOURCE pill (the
    // AMBIENT-TINT convergence), which we set per-mode below: the PLAYER pill carries the
    // album hue (the field warms to the album's color — the iOS "the whole world takes on
    // the album's color"); the Places pill carries no hue (the field stays warm-cream).
    field: stageRef, // write --glass-ambient-hue/-strength HERE, never on the surface
    fieldStrength: 8, // the bounded sub-perceptual ceiling
});

function openBloom(): void {
    open.value = true;
    // mark the SOURCE pill's dominant hue so the bloom's 4th color channel reads it: the
    // PLAYER warms the field to the album hue; EXPAND leaves it neutral (warm-cream).
    const pill = dockRef.value;
    if (pill) {
        if (mode.value === "player") pill.style.setProperty("--glass-ambient-hue", albumHue);
        else pill.style.removeProperty("--glass-ambient-hue");
    }
    // the overlay must be in the DOM + laid out at its full rect before we measure it,
    // so we bloom on the next frame (after v-if mounts the dest).
    requestAnimationFrame(() => {
        bloom.bloom();
    });
}
function close(): void {
    bloom.reset(); // restore the dest to identity + release the field hue
    open.value = false;
}
function toggleBloom(): void {
    if (open.value) close();
    else openBloom();
}

// ── ISLAND — the fission SPLIT ──────────────────────────────────────────────────
// the rest state is ONE crisp glass pill (the .dock-fission-bridge host, goo OFF). The
// two activity halves register as fission PIECES; split CARVES the pill — the goo neck
// stretches-thins-snaps between them. The media signature = LATERAL PEEL (the now-playing
// anchor stays, the timer peels — descriptor-driven, the DOCK_SPLIT_SIGNATURES map).
const islandHostRef = ref<HTMLElement | null>(null);
const timerPieceRef = ref<HTMLElement | null>(null);
const musicPieceRef = ref<HTMLElement | null>(null);
const islandSignature = ref(DOCK_SPLIT_SIGNATURES.media);

const fission = useDockFission({
    rootEl: islandHostRef,
    signature: islandSignature,
});

// register the two halves as fission pieces with OPPOSITE vectors along the dock's
// VISUAL axis (horizontal → the timer peels left, the music right; vertical → the timer
// peels up, the music down — the vectors track the orientation so the carve always runs
// along the layout axis). rank orders the stagger so the necks break in sequence.
let islandHandles: { release(): void }[] = [];
function registerIslandPieces(): void {
    for (const h of islandHandles) h.release();
    const vertical = orientation.value === "vertical";
    islandHandles = [
        fission.registerPiece({
            el: timerPieceRef,
            vector: vertical ? { dx: 0, dy: -1 } : { dx: -1, dy: 0 }, // peel LEFT / UP
            rank: 0,
        }),
        fission.registerPiece({
            el: musicPieceRef,
            vector: vertical ? { dx: 0, dy: 1 } : { dx: 1, dy: 0 }, // peel RIGHT / DOWN
            rank: 1,
        }),
    ];
}
const islandSplit = ref(false);
function toggleIsland(): void {
    // a click hands the host back to the ENGINE spring — clear any frozen scrub overrides
    // first so the spring is the sole driver (no engine-vs-scrub double-write), then
    // toggle from the engine's own state. The scrubber re-seats to 0 (rest) on hand-off.
    clearScrubOverrides();
    islandSplit.value = !islandSplit.value;
    fission.toggle();
}

// ── the SPLIT SCRUBBER — a demo affordance to make the BRIEF goo neck VISIBLE ──────
// The goo neck stretches→snaps in ~150ms at the fast DOCK_SPRING — too quick to SEE
// frame-by-frame. The scrubber drives `--dock-split-t` DIRECTLY (scrub 0→1) onto the
// island host + pieces, so the neck stretch/snap is showcasable at any frozen frame. It
// writes the SAME CSS vars the engine writes (the demo replicates the engine's per-piece
// vector writes from the registered halves — timer peels -1, music +1), NEVER a second
// engine. The dock still TOGGLES on click; scrubbing is the inspect affordance beside it.
const scrubT = ref<number[]>([0]);
// the goo `filter:url()` engages only past the engine's carve threshold (the
// `[data-fissioning]` gate); mirror it so a scrubbed frame > threshold shows the goo neck.
const SPLIT_THRESHOLD = 0.02;
function scrub(value: number[] | number | undefined): void {
    const t = Math.min(
        1,
        Math.max(0, Array.isArray(value) ? (value[0] ?? 0) : (value ?? 0)),
    );
    const host = islandHostRef.value;
    if (!host) return;
    const vertical = orientation.value === "vertical";
    // write the host scalar + the fissioning gate (the goo-OR-glass swap reads BOTH).
    host.style.setProperty("--dock-split-t", String(t));
    if (t > SPLIT_THRESHOLD) host.setAttribute("data-fissioning", "");
    else host.removeAttribute("data-fissioning");
    // write each piece's vector + neck-t (the same shape useDockFission writes; the
    // demo knows the two halves' vectors). neck-t == the host scalar (no phase shift in
    // the frozen-frame inspect; the spring's per-piece neck phase is a motion nicety).
    const pieces: Array<{ el: HTMLElement | null; dx: number; dy: number; rank: number }> = [
        {
            el: timerPieceRef.value,
            dx: vertical ? 0 : -1,
            dy: vertical ? -1 : 0,
            rank: 0,
        },
        {
            el: musicPieceRef.value,
            dx: vertical ? 0 : 1,
            dy: vertical ? 1 : 0,
            rank: 1,
        },
    ];
    for (const p of pieces) {
        if (!p.el) continue;
        p.el.style.setProperty("--split-dx", String(p.dx));
        p.el.style.setProperty("--split-dy", String(p.dy));
        p.el.style.setProperty("--neck-t", String(t));
        p.el.style.setProperty("--i", String(p.rank));
        p.el.style.setProperty("--stretch", "1");
    }
    // keep the readout state honest with the scrubbed position.
    islandSplit.value = t >= SPLIT_THRESHOLD;
}
// when the user leaves island mode (or merges via click), clear the scrub overrides so
// the engine's spring re-owns the host on the next toggle (no stale inline --dock-split-t).
function clearScrubOverrides(): void {
    const host = islandHostRef.value;
    if (host) {
        host.style.removeProperty("--dock-split-t");
        host.removeAttribute("data-fissioning");
    }
    for (const el of [timerPieceRef.value, musicPieceRef.value]) {
        if (!el) continue;
        el.style.removeProperty("--split-dx");
        el.style.removeProperty("--split-dy");
        el.style.removeProperty("--neck-t");
        el.style.removeProperty("--i");
        el.style.removeProperty("--stretch");
    }
    scrubT.value = [0];
}

// ── the unified Play/Close action — the timeline button drives the active mode ───
function play(): void {
    if (mode.value === "island") toggleIsland();
    else toggleBloom();
}
function reset(): void {
    // close every register to rest.
    if (open.value) close();
    clearScrubOverrides();
    if (islandSplit.value) {
        islandSplit.value = false;
        fission.merge();
    }
}

// re-seat on a mode change — close any open bloom + un-split the island so each mode
// starts at rest (so a switch never strands an open overlay or a split island).
watch(mode, () => {
    if (open.value) close();
    clearScrubOverrides();
    if (islandSplit.value) {
        islandSplit.value = false;
        fission.merge();
    }
    if (mode.value === "island") requestAnimationFrame(registerIslandPieces);
});
onMounted(() => {
    if (mode.value === "island") requestAnimationFrame(registerIslandPieces);
});
// re-register the island pieces when the orientation flips (the vectors are axis-aware).
watch(orientation, () => {
    if (mode.value === "island") requestAnimationFrame(registerIslandPieces);
});

// the readout state (mirrors the active register's live progress for the caption).
const readoutT = computed(() =>
    mode.value === "island"
        ? fission.t.value
        : bloom.blooming.value
          ? 0.5
          : open.value
            ? 1
            : 0,
);
const readoutState = computed(() => {
    if (mode.value === "island")
        return fission.fissioned.value ? "split" : "merged";
    if (bloom.blooming.value) return "blooming";
    return open.value ? "open" : "rest";
});

// ═══════════════════════════════════════════════════════════════════════════════
// THE RAIL — the re-instated AZ context FACET CAROUSEL (BE.W-DOCK-RAIL-REALIZE).
// The rail is NOT a standalone vertical dock — it is a HAIRLINE strip of accent-tinted
// facet chips that fans in a REAL dock's gutter (the `#rail` slot over the kept
// `.glass-dock-frame` non-clipping escape), box-INVIOLATE. It is a RENDER MODE on the
// shipped <DockStack> (`mode="facets"`), shown in BOTH a horizontal AND a vertical dock.
// ═══════════════════════════════════════════════════════════════════════════════

// the context facets — each a context/category, each carrying its OWN accent hue (the
// per-instance `--glass-accent` axis). The hues are the library `--section-color-N` ramp
// (a library identity, NOT a demo-local invented hue), so the strip reads as a row of
// DISTINCT accent-tinted contexts (the AZ context-carousel identity).
const facets: DockStackItem[] = [
    { id: "files", label: "Files", icon: Folder, accent: "var(--section-color-2)" },
    { id: "photos", label: "Photos", icon: Image, accent: "var(--section-color-3)" },
    { id: "music", label: "Music", icon: Music, accent: "var(--section-color-7)" },
    { id: "video", label: "Video", icon: Film, accent: "var(--section-color-6)" },
    { id: "starred", label: "Starred", icon: Star, accent: "var(--section-color-5)" },
    { id: "loved", label: "Loved", icon: Heart, accent: "var(--section-color-0)" },
    { id: "tags", label: "Tags", icon: Tag, accent: "var(--section-color-10)" },
    { id: "recent", label: "Recent", icon: Clock, accent: "var(--section-color-11)" },
];
// the ONE registry — the active context (the chip click + the layer context write the
// SAME ref; the rail keeps NO internal selection shadow). DockStack writes this model.
const railContext = ref<string>("music");

function onAuroraInitError(err: Error): void {
    console.warn("[liquid-playground] aurora backdrop init failed:", err.message);
}
</script>

<template>
    <StoryPage>
        <!-- the ONE library goo <filter> mount — the fission bridge references it by id
             (var(--dock-fission-goo-filter) → url(#dock-fission-goo)). Mounted ONCE.
             color-interpolation-filters=sRGB + a generous region + a non-zero host (the
             Safari floor + the fix for the island waist). -->
        <DockGooFilter />

        <StorySection
            heading="Liquid playground — the dock is the control interface"
            gap="md"
        >
            <p class="text-small text-muted-foreground">
                The dock morphs into real iOS surfaces, composing the SHIPPED BE
                primitives. <strong>SEARCH</strong> blooms the pill into a Maps Places
                sheet via
                <code class="rounded bg-muted px-1">useBloomUp</code> (the pill stays
                pill-sized; the sheet FLIPs from its rect — no content crush, no orphan
                magnifier). <strong>SPLIT</strong> fissions ONE crisp glass pill into two
                activity islands via
                <code class="rounded bg-muted px-1">useDockFission</code> — the goo neck
                stretches then snaps. <strong>NOW PLAYING</strong> blooms it into the full
                Apple Music player, the whole field warming to the album's color.
            </p>

            <!-- controls -->
            <div
                class="liquid-controls relative flex flex-wrap items-end gap-6 overflow-hidden rounded-[var(--radius-card)] glass-resting p-5"
            >
                <div class="flex min-w-[14rem] flex-col gap-2">
                    <label class="text-mono-caption text-muted-foreground">Mode</label>
                    <SegmentedTabs v-model="mode" :options="modeTabs" />
                </div>
                <div class="flex min-w-[12rem] flex-1 flex-col gap-2">
                    <label class="text-mono-caption text-muted-foreground">
                        {{
                            mode === "island"
                                ? islandSplit
                                    ? "Split open"
                                    : "Merged"
                                : open
                                  ? "Open"
                                  : "Rest"
                        }}
                    </label>
                    <div class="flex items-center gap-3">
                        <Button
                            variant="primary-audacious"
                            size="sm"
                            @click="play"
                        >
                            {{
                                mode === "island"
                                    ? islandSplit
                                        ? "Merge"
                                        : "Split ▶"
                                    : open
                                      ? "Close"
                                      : "Open ▶"
                            }}
                        </Button>
                        <Button variant="outline" size="sm" @click="reset">
                            Reset
                        </Button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Button variant="outline" @click="toggleOrientation">
                        {{ orientation === "horizontal" ? "↕ Vertical" : "↔ Horizontal" }}
                    </Button>
                </div>

                <!-- THE SPLIT SCRUBBER — only in island mode. The goo neck stretches→snaps
                     in ~150ms at the fast DOCK_SPRING (too quick to SEE); scrub --dock-split-t
                     directly (0→1) to inspect the neck stretch/snap frame-by-frame. A demo
                     affordance beside the click toggle — the engine still drives the click. -->
                <div
                    v-if="mode === 'island'"
                    class="flex min-w-[16rem] flex-1 flex-col gap-2"
                >
                    <label class="text-mono-caption text-muted-foreground">
                        Scrub the goo neck · split-t = {{ (scrubT[0] ?? 0).toFixed(2) }}
                    </label>
                    <Slider
                        v-model="scrubT"
                        :min="0"
                        :max="1"
                        :step="0.01"
                        :keep-dock-open="false"
                        aria-label="Scrub the fission split"
                        data-testid="liquid-island-scrubber"
                        @update:model-value="scrub"
                    />
                </div>
            </div>

            <!-- the stage — the [data-glass-field] the bloom's 4th color channel warms.
                 The pill sits centred; the sheet/player BLOOMS over it; the island
                 fissions in place. -->
            <div
                ref="stageRef"
                data-glass-field
                class="liquid-stage relative flex min-h-[28rem] items-center justify-center overflow-hidden rounded-[var(--radius-card)] p-4 sm:p-10"
                data-testid="liquid-stage"
            >
                <!-- the live aurora field — the dock's glass reads AGAINST it. Offscreen-
                     paused by construction; ONE GL context for this route. -->
                <Aurora
                    :config="DEFAULT_AURORA_CONFIG"
                    :on-init-error="onAuroraInitError"
                    class="pointer-events-none absolute inset-0 size-full"
                    aria-hidden="true"
                />

                <!-- ════════════════════════════════════════════════════════════════
                     EXPAND / PLAYER — the dock is a small PILL (stays pill-sized); the
                     sheet/player BLOOMS from its rect. The pill is the bloom SOURCE.
                     ════════════════════════════════════════════════════════════════ -->
                <div
                    v-if="mode !== 'island'"
                    ref="dockRef"
                    class="liquid-pill"
                    :class="{ 'liquid-pill--hidden': open }"
                    role="button"
                    tabindex="0"
                    :aria-expanded="open"
                    :aria-label="
                        mode === 'expand' ? 'Open search' : 'Open now playing'
                    "
                    @click="toggleBloom"
                    @keydown.enter.prevent="toggleBloom"
                    @keydown.space.prevent="toggleBloom"
                    :data-mode="mode"
                    :data-orientation="orientation"
                    data-testid="liquid-pill"
                >
                    <!-- EXPAND — the Maps SEARCH PILL (the search field that the sheet's
                         own field FLIPs from — one element, no orphan magnifier). -->
                    <template v-if="mode === 'expand'">
                        <Search class="liquid-pill-icon" />
                        <span class="liquid-pill-hint">Search places</span>
                        <Mic class="liquid-pill-trail" />
                    </template>
                    <!-- PLAYER — the now-playing PILL (album → title → play). -->
                    <template v-else>
                        <span class="liquid-pill-album" />
                        <span class="liquid-pill-meta">
                            <span class="liquid-pill-title">{{ track.title }}</span>
                            <span class="liquid-pill-artist">{{ track.artist }}</span>
                        </span>
                        <span class="liquid-pill-play"><Play class="size-4" /></span>
                    </template>
                </div>

                <!-- the EXPAND sheet — the Maps "Places" overlay. Rendered only while
                     open||blooming; lays out at its FULL settled rect (the bloom FLIPs it
                     FROM the pill — never a box-scale crush). The persistent search field
                     at the bottom is the SAME element the pill's magnifier flips into. -->
                <div
                    v-if="mode === 'expand' && open"
                    ref="sheetRef"
                    class="liquid-sheet"
                    :data-orientation="orientation"
                    role="dialog"
                    aria-label="Places"
                    data-testid="liquid-sheet"
                >
                    <span class="liquid-sheet-grabber" aria-hidden="true" />
                    <div class="liquid-sheet-body">
                        <div class="liquid-sheet-places">
                            <span
                                v-for="p in places"
                                :key="p.label"
                                class="liquid-sheet-place"
                            >
                                <IconChip
                                    :icon="p.icon"
                                    :section="p.section"
                                    :size="42"
                                />
                                <span class="liquid-sheet-place-label">{{
                                    p.label
                                }}</span>
                            </span>
                        </div>
                        <div class="liquid-sheet-recents">
                            <p class="liquid-sheet-recents-label">Recents</p>
                            <button
                                v-for="r in recents"
                                :key="r.name"
                                type="button"
                                class="liquid-sheet-recent"
                            >
                                <span class="liquid-sheet-recent-icon">
                                    <component :is="r.icon" class="size-4" />
                                </span>
                                <span class="liquid-sheet-recent-text">
                                    <span class="liquid-sheet-recent-name">{{
                                        r.name
                                    }}</span>
                                    <span class="liquid-sheet-recent-sub">{{
                                        r.sub
                                    }}</span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <!-- the persistent search field — the pill's magnifier FLIPs into
                         THIS (one coherent element, no orphan). -->
                    <button
                        type="button"
                        class="liquid-sheet-search"
                        @click="close"
                    >
                        <Search class="liquid-pill-icon" />
                        <span class="liquid-pill-hint">Search places</span>
                        <Mic class="liquid-pill-trail" />
                    </button>
                </div>

                <!-- the PLAYER card — the full Apple Music player. Blooms from the pill;
                     the field warms to the album hue (the 4th color channel). -->
                <div
                    v-if="mode === 'player' && open"
                    ref="playerRef"
                    class="liquid-player"
                    :data-orientation="orientation"
                    role="dialog"
                    aria-label="Now playing"
                    data-testid="liquid-player"
                >
                    <span class="liquid-sheet-grabber" aria-hidden="true" />
                    <span class="liquid-player-album" />
                    <span class="liquid-player-title">{{ track.title }}</span>
                    <span class="liquid-player-artist">{{ track.artist }}</span>
                    <span class="liquid-player-scrubber">
                        <span class="liquid-player-scrubber-fill" />
                    </span>
                    <span class="liquid-player-times">
                        <span>1:59</span>
                        <span>-3:14</span>
                    </span>
                    <span class="liquid-player-transport">
                        <button type="button" aria-label="Previous">
                            <SkipBack class="size-5" />
                        </button>
                        <button
                            type="button"
                            class="liquid-player-transport-play"
                            aria-label="Pause"
                            @click="close"
                        >
                            <Pause class="size-6" />
                        </button>
                        <button type="button" aria-label="Next">
                            <SkipForward class="size-5" />
                        </button>
                    </span>
                </div>

                <!-- ════════════════════════════════════════════════════════════════
                     ISLAND — ONE crisp glass pill that FISSIONS. TWO co-moving layers
                     (the morph-showcase goo-blob discipline): a goo BLOB layer (solid
                     metaball plates, filter:url merges them into ONE body that necks +
                     snaps) + a crisp CONTENT layer on top (un-filtered, so the ring/text/
                     eq stay sharp — a translucent content layer would be thresholded away
                     by the goo's feColorMatrix). Both read the SAME inheriting
                     --dock-split-t scalar the fission spring writes, so they track in
                     lockstep. The BLOB plates are the registered fission PIECES (they
                     carry the translate/squish/neck); the content mirrors the same
                     per-half vector off the host's scalar.
                     ════════════════════════════════════════════════════════════════ -->
                <div
                    v-if="mode === 'island'"
                    ref="islandHostRef"
                    class="liquid-island-host"
                    :data-orientation="orientation"
                    role="button"
                    tabindex="0"
                    :aria-expanded="islandSplit"
                    aria-label="Split the activity islands"
                    @click="toggleIsland"
                    @keydown.enter.prevent="toggleIsland"
                    @keydown.space.prevent="toggleIsland"
                    @pointermove="fission.onPointerMove"
                    data-testid="liquid-island-host"
                >
                    <!-- the goo BLOB layer — the library `.dock-fission-bridge` recipe.
                         It holds the two SOLID blob pieces + their goo necks and applies
                         the library goo `filter: url()` ONLY while [data-fissioning] (the
                         goo-OR-glass swap; crisp glass at rest). The metaball fuses the
                         two solid blob plates + their necks into ONE body that necks
                         apart. The blobs carry NO text (the goo threshold would mangle
                         it) — the content rides the un-filtered layer below. -->
                    <div class="dock-fission-bridge liquid-island-bridge" aria-hidden="true">
                        <div
                            ref="timerPieceRef"
                            class="dock-fission-piece liquid-island-blob liquid-island-blob--timer"
                            data-testid="liquid-island-timer"
                        />
                        <div
                            ref="musicPieceRef"
                            class="dock-fission-piece liquid-island-blob liquid-island-blob--music"
                            data-testid="liquid-island-music"
                        />
                    </div>
                    <!-- the crisp CONTENT layer — un-filtered, tracking the blobs via the
                         SAME inheriting --dock-split-t scalar + per-half CSS vectors. -->
                    <div class="liquid-island-content" aria-hidden="true">
                        <div class="liquid-island liquid-island--timer">
                            <span class="liquid-island-ring">
                                <Timer class="size-4" aria-hidden="true" />
                            </span>
                            <span class="liquid-island-meta">
                                <span class="liquid-island-title">Timer</span>
                                <span class="liquid-island-sub">Laundry · 8:24</span>
                            </span>
                        </div>
                        <div class="liquid-island liquid-island--music">
                            <span class="liquid-island-album" />
                            <span class="liquid-island-meta">
                                <span class="liquid-island-title">{{ track.title }}</span>
                                <span class="liquid-island-sub">{{ track.artist }}</span>
                            </span>
                            <span class="liquid-island-eq" aria-hidden="true">
                                <i /><i /><i /><i />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <p
                class="text-mono-caption text-muted-foreground"
                data-testid="liquid-readout"
            >
                mode = {{ mode }} · orientation = {{ orientation }} · t =
                {{ readoutT.toFixed(2) }} · {{ readoutState }}
            </p>
        </StorySection>

        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <!-- THE RAIL — the accent-facet CONTEXT CAROUSEL inside a real dock.     -->
        <!-- A HAIRLINE strip of accent-tinted chips that fans in the dock's      -->
        <!-- gutter, box-INVIOLATE. NOT a standalone vertical dock — a RENDER     -->
        <!-- MODE on the shipped <DockStack> (mode="facets"), shown in BOTH a     -->
        <!-- horizontal AND a vertical dock.                                      -->
        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <StorySection
            heading="The rail — a context FACET carousel INSIDE a real dock"
            gap="md"
        >
            <p class="text-small text-muted-foreground">
                The rail is NOT a vertical dock — it is a
                <strong>hairline strip of accent-tinted facet chips</strong> that fans in
                a real dock's GUTTER, each chip one context/category carrying its OWN
                <code class="rounded bg-muted px-1">--glass-accent</code> hue (the
                per-instance chromatic-rim axis), the active facet reading the
                selected-as-glass tier. It is a render MODE on the shipped
                <code class="rounded bg-muted px-1">&lt;DockStack mode="facets"&gt;</code>
                — fanning in the
                <code class="rounded bg-muted px-1">#rail</code> slot over the kept
                <code class="rounded bg-muted px-1">.glass-dock-frame</code> non-clipping
                escape, so the dock's OWN box never grows (box-INVIOLATE,
                <code class="rounded bg-muted px-1">deltaW = deltaH = 0</code>). Hover the
                core chip to fan the contexts; click a facet to switch context. Shown in
                BOTH orientations below — the strip fans along the gutter hairline either
                way.
            </p>

            <p
                class="text-mono-caption text-muted-foreground"
                data-testid="liquid-rail-readout"
            >
                active context = {{ railContext }} · the SAME ref the chip click writes
                (one registry, no shadow)
            </p>

            <!-- ── A HORIZONTAL dock — the facet strip fans up off the top edge ── -->
            <div
                class="relative flex min-h-[20rem] items-center justify-center overflow-hidden rounded-[var(--radius-card)] p-4 sm:p-10"
                data-testid="liquid-rail-stage-horizontal"
            >
                <Aurora
                    :config="DEFAULT_AURORA_CONFIG"
                    :on-init-error="onAuroraInitError"
                    class="pointer-events-none absolute inset-0 size-full"
                    aria-hidden="true"
                />

                <!-- a real horizontal <GlassDock> with in-flow nav controls; the facet
                     carousel rides its #rail gutter (box-inviolate). -->
                <GlassDock
                    orientation="horizontal"
                    always-expanded
                    position="inline"
                    data-testid="liquid-rail-dock-horizontal"
                >
                    <DockIconButton aria-label="Home" title="Home">
                        <Home class="size-4" aria-hidden="true" />
                    </DockIconButton>
                    <DockIconButton aria-label="Search" title="Search">
                        <Search class="size-4" aria-hidden="true" />
                    </DockIconButton>
                    <DockSeparator />
                    <DockIconButton aria-label="Bookmarks" title="Bookmarks">
                        <Bookmark class="size-4" aria-hidden="true" />
                    </DockIconButton>

                    <!-- THE FACET CAROUSEL — fans in the gutter above the row. -->
                    <template #rail>
                        <DockStack
                            v-model:selected="railContext"
                            mode="facets"
                            :items="facets"
                            :core="Folder"
                            core-label="Switch context"
                            :visible-count="4"
                            position="end"
                            data-testid="liquid-rail-facets-horizontal"
                        />
                    </template>
                </GlassDock>
            </div>

            <!-- ── A VERTICAL dock — the facet strip fans out off the trailing edge ── -->
            <div
                class="relative flex min-h-[24rem] items-center justify-center overflow-hidden rounded-[var(--radius-card)] p-4 sm:p-10"
                data-testid="liquid-rail-stage-vertical"
            >
                <Aurora
                    :config="DEFAULT_AURORA_CONFIG"
                    :on-init-error="onAuroraInitError"
                    class="pointer-events-none absolute inset-0 size-full"
                    aria-hidden="true"
                />

                <!-- a real vertical <GlassDock> column with in-flow nav controls; the
                     facet carousel rides its #rail gutter (box-inviolate). -->
                <GlassDock
                    orientation="vertical"
                    always-expanded
                    position="inline"
                    data-testid="liquid-rail-dock-vertical"
                >
                    <DockIconButton aria-label="Home" title="Home">
                        <Home class="size-4" aria-hidden="true" />
                    </DockIconButton>
                    <DockIconButton aria-label="Search" title="Search">
                        <Search class="size-4" aria-hidden="true" />
                    </DockIconButton>
                    <DockSeparator />
                    <DockIconButton aria-label="Bookmarks" title="Bookmarks">
                        <Bookmark class="size-4" aria-hidden="true" />
                    </DockIconButton>

                    <!-- THE FACET CAROUSEL — fans in the gutter beside the column. -->
                    <template #rail>
                        <DockStack
                            v-model:selected="railContext"
                            mode="facets"
                            :items="facets"
                            :core="Folder"
                            core-label="Switch context"
                            :visible-count="4"
                            position="end"
                            data-testid="liquid-rail-facets-vertical"
                        />
                    </template>
                </GlassDock>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* the facet carousel rides the SHIPPED <DockStack mode="facets"> over the kept
   .glass-dock-frame escape (src/styles/dock/stack-rail.css, loaded via /styles) — no
   demo-local rail capsule, no demo-scoped rail override (the standalone capsule fork is
   DELETED). */

/* the controls panel — a subtle warm gradient behind the glass so the tabs/controls
   have something RICH to refract. A whisper, not a wall — the controls stay legible. */
.liquid-controls::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
        radial-gradient(
            ellipse 75% 140% at 14% 20%,
            color-mix(in oklab, var(--section-color-8), transparent 68%),
            transparent 64%
        ),
        radial-gradient(
            ellipse 65% 120% at 90% 88%,
            color-mix(in oklab, var(--section-color-2), transparent 72%),
            transparent 60%
        ),
        radial-gradient(
            ellipse 50% 90% at 60% 50%,
            color-mix(in oklab, var(--section-color-10), transparent 82%),
            transparent 55%
        );
    pointer-events: none;
}

:deep(.segmented-indicator) {
    background:
        linear-gradient(
            to bottom,
            color-mix(in oklab, white, transparent 52%),
            transparent 46%
        ),
        var(--glass-bg-floating-tinted);
    box-shadow:
        inset 0 1px 0 0 color-mix(in oklab, white, transparent 30%),
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.4)),
        var(--glass-rim-bottom),
        var(--glass-shadow-floating);
}
</style>
