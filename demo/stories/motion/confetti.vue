<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { Button } from "@/components/ui/button";
import { CreamSurface } from "@/components/custom/cream-surface";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { useRAFLoop } from "@/composables/motion";
import { PartyPopper, Sparkles } from "lucide-vue-next";

interface Piece {
    id: number;
    cx: number;
    cy: number;
    color: string;
    size: number;
    duration: number;
    rotate: number;
    drift: number;
}

const RAINBOW = [
    "var(--rainbow-red)",
    "var(--rainbow-orange)",
    "var(--rainbow-yellow)",
    "var(--rainbow-green)",
    "var(--rainbow-blue)",
    "var(--rainbow-indigo)",
    "var(--rainbow-violet)",
];

let nextId = 0;
const reducedMotion = ref(false);

if (typeof window !== "undefined") {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.value = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
        reducedMotion.value = e.matches;
    };
    mq.addEventListener("change", onChange);
    onUnmounted(() => mq.removeEventListener("change", onChange));
}

interface PieceWithBirth extends Piece {
    cx_at: number;
}

const livePieces = ref<PieceWithBirth[]>([]);

// rAF-driven cleanup pass — purges expired pieces.
const raf = useRAFLoop(({ now }) => {
    if (livePieces.value.length === 0) return;
    livePieces.value = livePieces.value.filter(
        (p) => now - p.cx_at < p.duration * 1000 + 200,
    );
});

onUnmounted(() => raf.dispose());

function fireBurst(originX: number, originY: number, count = 36) {
    if (reducedMotion.value) return;
    const now = performance.now();
    const fresh: PieceWithBirth[] = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 12 + Math.random() * 36;
        fresh.push({
            id: ++nextId,
            cx: originX + Math.cos(angle) * radius,
            cy: originY + Math.sin(angle) * radius,
            color: RAINBOW[i % RAINBOW.length]!,
            size: 6 + Math.random() * 8,
            duration: 0.9 + Math.random() * 1.4,
            rotate: Math.random() * 720 - 360,
            drift: (Math.random() - 0.5) * 220,
            cx_at: now,
        });
    }
    livePieces.value = [...livePieces.value, ...fresh];
    raf.start();
}

function celebrate(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const host = (target.closest(".confetti-stage") as HTMLElement) ?? target;
    const hostRect = host.getBoundingClientRect();
    const cx = rect.left + rect.width / 2 - hostRect.left;
    const cy = rect.top + rect.height / 2 - hostRect.top;
    fireBurst(cx, cy, 40);
}

function celebrateWell(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    fireBurst(rect.width / 2, rect.height / 2, 32);
}
</script>

<template>
    <StoryPage>
        <!-- Site 1: button burst with rainbow palette -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Confetti burst · rainbow palette</p>
            <CreamSurface tone="warm" class="confetti-stage relative overflow-hidden">
                <div class="flex flex-col items-center gap-[var(--space-phi-3)] py-[var(--space-phi-3)]">
                    <h3 class="text-display-3 text-center">
                        Click to celebrate.
                    </h3>
                    <p class="text-prose max-w-prose text-center text-foreground/70">
                        Each press spawns 40+ <code class="fira-code">.confetti-piece</code> elements
                        from the button center, with randomized
                        <code class="fira-code">--confetti-color</code> and
                        <code class="fira-code">--confetti-duration</code>. The keyframe is paused
                        under <code class="fira-code">prefers-reduced-motion: reduce</code>.
                    </p>
                    <Button
                        variant="rainbow"
                        size="lg"
                        class="gap-2"
                        @click="celebrate"
                    >
                        <PartyPopper class="size-5" aria-hidden="true" />
                        Fire confetti
                    </Button>
                </div>
                <FlourishDivider tone="rainbow" />
                <p class="text-mono-caption text-center text-muted-foreground">
                    {{
                        reducedMotion
                            ? "reduced-motion is on — bursts disabled"
                            : "rainbow vivid · 7-stop palette"
                    }}
                </p>

                <!-- Burst layer — absolute, pointer-none, scoped to this stage -->
                <div class="pointer-events-none absolute inset-0 overflow-hidden">
                    <span
                        v-for="p in livePieces"
                        :key="p.id"
                        class="confetti-piece"
                        :style="{
                            left: `${p.cx}px`,
                            top: `${p.cy}px`,
                            '--confetti-color': p.color,
                            '--confetti-duration': `${p.duration}s`,
                            '--confetti-size': `${p.size}px`,
                            '--confetti-rotate': `${p.rotate}deg`,
                            '--confetti-drift': `${p.drift}px`,
                        }"
                    />
                </div>
            </CreamSurface>
        </section>

        <!-- Site 2: well-dashed completion state — second site clearing gap-32 ≥2 bar -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Second site · achievement well</p>
            <button
                type="button"
                class="well-dashed confetti-stage relative cursor-pointer overflow-hidden text-left transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[var(--shadow-cartoon-md)]"
                @click="celebrateWell"
            >
                <div class="flex items-center gap-[var(--space-phi-3)]">
                    <div
                        class="grid size-16 place-items-center rounded-full"
                        :style="{
                            background: 'var(--cream-warm)',
                            border: '2px solid var(--border)',
                            boxShadow: 'var(--shadow-cartoon-sm)',
                        }"
                    >
                        <Sparkles
                            class="size-8"
                            :style="{ color: 'var(--section-color-5)' }"
                            aria-hidden="true"
                        />
                    </div>
                    <div class="flex-1">
                        <h3 class="text-heading">Streak complete</h3>
                        <p class="text-prose text-foreground/70">
                            Click to mark and celebrate. The well becomes the burst origin —
                            <code class="fira-code">.confetti-piece</code> works against any host.
                        </p>
                    </div>
                </div>
            </button>
        </section>
    </StoryPage>
</template>

<style scoped>
.confetti-stage {
    /* Burst pieces are absolutely positioned to this stage. */
    position: relative;
}

.confetti-stage .confetti-piece {
    position: absolute;
    width: var(--confetti-size, 0.5rem);
    height: var(--confetti-size, 0.5rem);
    background: var(--confetti-color, var(--rainbow-yellow));
    border-radius: 0;
    pointer-events: none;
    /* Parameterized burst that consumes per-piece CSS custom properties.
       --confetti-color + --confetti-duration are story-level; the story extends
       with --confetti-rotate + --confetti-drift for deterministic dispersal. */
    animation: story-confetti-burst var(--confetti-duration, 1.2s)
        cubic-bezier(0.35, 0.65, 0.5, 1) forwards;
    transform-origin: center;
}

@keyframes story-confetti-burst {
    0% {
        transform: translate(-50%, -50%) translate(0, 0) rotate(0);
        opacity: 1;
    }
    20% {
        opacity: 1;
    }
    100% {
        transform:
            translate(-50%, -50%)
            translate(var(--confetti-drift, 0), 280px)
            rotate(var(--confetti-rotate, 540deg));
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .confetti-stage .confetti-piece {
        animation: none;
        opacity: 0;
    }
}
</style>
