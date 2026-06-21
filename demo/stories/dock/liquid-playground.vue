<script setup lang="ts">
// BE.W-LIQUID-MORPH (WAVE-1) — the liquid-morph PLAYGROUND.
//
// The dock as the PRIMARY control interface: a glass DOCK pill that (1) EXPANDS into
// a CONTAINER card (the iOS-27 V3 search-pill -> Places-sheet bloom) and (2) n-ary
// SPLITS into free-floating glass pieces at a CONFIGURABLE angle of attack (the
// macOS Music goo-split, generalized to ANY theta). It SUBSUMES the dock demo set
// onto ONE engine (`useLiquidMorph`), composing the REAL substrate (no re-fork) and
// reading as glass-ui (glass tiers, warm-cream, the dock spring clock).
import { computed, ref, watch } from "vue";
import { Layers, Maximize2, Split, Sparkles } from "@lucide/vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { GlassDock, DockIconButton } from "../../../src/components/custom/dock";
import { Button } from "../../../src/components/ui/button";
import { Slider } from "../../../src/components/ui/slider";
import { SegmentedTabs } from "../../../src/components/custom/tabs";
import {
    useLiquidMorph,
    DIRECTED_SPLIT,
    type LiquidMorphMode,
} from "../../../src/composables/motion/useLiquidMorph";

// ── controls ──────────────────────────────────────────────────────────────────
const mode = ref<LiquidMorphMode>("split");
const modeTabs = [
    { value: "split", label: "Split" },
    { value: "expand", label: "Expand" },
    { value: "union", label: "Union" },
];
const angleDeg = ref(30); // the configurable angle of attack (degrees)
const splitCount = ref(4); // 2..6 free-floating pieces
const angleRad = computed(() => (angleDeg.value * Math.PI) / 180);

// ── the morph host (a card-or-dock root carrying --liquid-morph-t) ─────────────
const stageRoot = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);
const pillRef = ref<HTMLElement | null>(null);

// the free-floating shard refs — re-collected as splitCount changes
const pieceEls = ref<(HTMLElement | null)[]>([]);
const pieceIndices = computed(() =>
    Array.from({ length: splitCount.value }, (_, i) => i),
);
function setPieceEl(i: number, el: Element | null): void {
    pieceEls.value[i] = (el as HTMLElement | null) ?? null;
}

// The ONE engine — DIRECTED signature so the angle slider drives the travel axis.
// The spring defaults to the `dock` register (response 0.32 / zeta 0.7 — the iOS
// interruptible-control clock); the bloom is the bouncy iOS-27 overshoot.
const morph = useLiquidMorph({
    rootEl: stageRoot,
    signature: DIRECTED_SPLIT,
    spring: "dock",
    revealPreset: "bouncy",
});

const expanded = ref(false);
const splitOpen = ref(false);

// Register the pieces whenever the count (and thus the ref set) changes.
let registered: ReturnType<typeof morph.registerPiece>[] = [];
function registerPieces(): void {
    for (const r of registered) r.release();
    registered = [];
    pieceIndices.value.forEach((i) => {
        const elRef = computed(() => pieceEls.value[i] ?? null);
        registered.push(
            morph.registerPiece({
                el: elRef,
                angle: angleRad.value,
                rank: i,
                distance: 120,
            }),
        );
    });
}
watch(splitCount, () => {
    // let the new shard nodes mount, then re-register
    requestAnimationFrame(registerPieces);
});
watch(angleRad, () => {
    // re-register so each piece picks up the new explicit angle
    registerPieces();
});

// ── the actions ────────────────────────────────────────────────────────────────
function play(): void {
    if (mode.value === "expand") {
        expanded.value = true;
        // bloom the card FROM the dock pill rect (the dock -> card materialize)
        requestAnimationFrame(() =>
            morph.expand({ card: cardRef, trigger: pillRef }),
        );
    } else if (mode.value === "split") {
        if (registered.length === 0) registerPieces();
        splitOpen.value = true;
        morph.split();
    } else {
        // union — pull the pieces back in (the reverse of the same scalar)
        splitOpen.value = false;
        morph.union();
    }
}
function reset(): void {
    expanded.value = false;
    splitOpen.value = false;
    morph.collapse();
    morph.union();
}

// register the initial set after mount
requestAnimationFrame(registerPieces);
</script>

<template>
    <StoryPage>
        <StorySection heading="Liquid playground — the dock is the control interface" gap="md">
            <p class="text-small text-muted-foreground">
                ONE engine —
                <code class="rounded bg-muted px-1">useLiquidMorph</code> — drives the whole
                liquid framework. A glass dock pill <strong>EXPANDS</strong> into a container
                card (the iOS-27 search-pill <span aria-hidden="true">→</span> sheet bloom)
                and n-ary <strong>SPLITS</strong> into free-floating glass pieces at an
                <strong>arbitrary angle of attack</strong> — a metaball from any
                <code class="rounded bg-muted px-1">θ</code>, not just the four cardinals.
                It composes the real substrate (the dock
                <code class="rounded bg-muted px-1">SpringProgress</code> loop shape,
                <code class="rounded bg-muted px-1">useLiquidReveal</code>'s FLIP bloom,
                <code class="rounded bg-muted px-1">useLiquidFlex</code>'s squish) — never a re-fork.
            </p>

            <!-- The controls row — real reactive inputs over the glass register. -->
            <div class="flex flex-wrap items-end gap-6 rounded-[var(--radius-card)] glass-resting p-5">
                <div class="flex min-w-[12rem] flex-col gap-2">
                    <label class="text-mono-caption text-muted-foreground">Mode</label>
                    <SegmentedTabs v-model="mode" :options="modeTabs" />
                </div>
                <div class="flex min-w-[14rem] flex-1 flex-col gap-2">
                    <label class="text-mono-caption text-muted-foreground">
                        Angle of attack — {{ angleDeg }}°
                    </label>
                    <Slider
                        :model-value="[angleDeg]"
                        :min="0"
                        :max="360"
                        :step="1"
                        @update:model-value="(v) => (angleDeg = v?.[0] ?? 0)"
                    />
                </div>
                <div class="flex min-w-[12rem] flex-1 flex-col gap-2">
                    <label class="text-mono-caption text-muted-foreground">
                        Pieces — {{ splitCount }}
                    </label>
                    <Slider
                        :model-value="[splitCount]"
                        :min="2"
                        :max="6"
                        :step="1"
                        @update:model-value="(v) => (splitCount = v?.[0] ?? 2)"
                    />
                </div>
                <div class="flex gap-2">
                    <Button variant="primary-audacious" @click="play">
                        <Sparkles class="size-4" />
                        Play
                    </Button>
                    <Button variant="outline" @click="reset">Reset</Button>
                </div>
            </div>

            <!-- The stage — the morph host. A non-clipping overlay frame paints the
                 pieces + the goo group OVER the dock pill so the host box is never
                 re-laid-out (box-inviolate). The hidden <svg><filter> is mounted
                 ONCE here (the library goo filter the CSS references). -->
            <div
                ref="stageRoot"
                class="relative flex min-h-[26rem] items-center justify-center overflow-visible rounded-[var(--radius-card)] glass-wash p-10"
                data-testid="liquid-stage"
            >
                <!-- the library goo <filter> — feGaussianBlur + feColorMatrix
                     threshold (the classic metaball). Mounted once; referenced by
                     liquid-morph.css via filter: url(#liquid-morph-goo). LOCAL inline
                     SVG (the Safari fence — never backdrop-filter: url()). -->
                <svg
                    aria-hidden="true"
                    width="0"
                    height="0"
                    style="position: absolute"
                >
                    <defs>
                        <filter id="liquid-morph-goo">
                            <feGaussianBlur
                                in="SourceGraphic"
                                stdDeviation="7"
                                result="blur"
                            />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0
                                        0 1 0 0 0
                                        0 0 1 0 0
                                        0 0 0 19 -9"
                                result="goo"
                            />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>

                <!-- The DOCK pill — the primary control interface + the bloom source
                     rect. When NOT expanded it shows the dock; the card blooms FROM
                     its rect. -->
                <div
                    v-show="!expanded"
                    ref="pillRef"
                    class="relative z-[2]"
                >
                    <GlassDock always-expanded aria-label="Liquid morph dock">
                        <DockIconButton type="button" aria-label="Layers">
                            <Layers />
                        </DockIconButton>
                        <DockIconButton type="button" aria-label="Split">
                            <Split />
                        </DockIconButton>
                        <DockIconButton
                            type="button"
                            aria-label="Expand into a card"
                            @click="
                                mode = 'expand';
                                play();
                            "
                        >
                            <Maximize2 />
                        </DockIconButton>
                    </GlassDock>
                </div>

                <!-- The CONTAINER card the dock expands into (the V3 bloom target).
                     useLiquidReveal drives the FLIP transform on its inline style;
                     the .liquid-morph-card + glass-floating classes carry the glass
                     tier so it reads as the Places sheet. -->
                <div
                    v-show="expanded"
                    ref="cardRef"
                    class="liquid-morph-card glass-floating relative z-[2] w-[22rem] max-w-full p-6"
                    data-testid="liquid-card"
                >
                    <div class="flex items-center gap-3">
                        <span class="flex size-10 items-center justify-center rounded-full glass-resting">
                            <Layers class="size-5" />
                        </span>
                        <div>
                            <h3 class="text-subheading">Container</h3>
                            <p class="text-mono-caption text-muted-foreground">
                                bloomed from the dock pill
                            </p>
                        </div>
                    </div>
                    <div class="mt-4 flex flex-wrap gap-2">
                        <span
                            v-for="chip in ['Recents', 'Shared', 'Favorites', 'Tags']"
                            :key="chip"
                            class="rounded-pill glass-resting px-3 py-1 text-small"
                        >
                            {{ chip }}
                        </span>
                    </div>
                </div>

                <!-- The n-ary goo group — the free-floating glass pieces. They bud off
                     through the metaball neck along the configurable angle. Only the
                     pieces inside .liquid-morph-goo merge (the filtered group). -->
                <div class="liquid-morph-frame" aria-hidden="true">
                    <div class="liquid-morph-goo">
                        <!-- the source disc at the host center (the body the pieces
                             detach from — kept full so the goo always has a core). -->
                        <span class="liquid-morph-piece" style="--liquid-morph-t: 0" />
                        <span
                            v-for="i in pieceIndices"
                            :key="i"
                            :ref="(el) => setPieceEl(i, el as Element | null)"
                            class="liquid-morph-piece"
                            data-testid="liquid-piece"
                        />
                    </div>
                </div>
            </div>

            <p class="text-mono-caption text-muted-foreground" data-testid="liquid-readout">
                mode = {{ mode }} · θ = {{ angleDeg }}° · pieces = {{ splitCount }} ·
                t = {{ morph.t.value.toFixed(2) }} ·
                {{ morph.morphing.value ? "morphing" : "settled" }}
            </p>
        </StorySection>
    </StoryPage>
</template>
