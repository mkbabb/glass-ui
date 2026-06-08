<script setup lang="ts">
import { computed, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import {
    InstrumentChassis,
    ChassisDivider,
    type InstrumentChassisPhase,
} from "../../../src/components/custom/instrument-chassis";
import { MetricBadge } from "../../../src/components/custom/metric-badge";
import { DockIconButton, DockTabButton } from "../../../src/components/custom/dock";
import {
    ArrowLeft,
    RotateCcw,
    Play,
    Settings,
    type LucideIcon,
} from "@lucide/vue";

type PhaseOption = { value: InstrumentChassisPhase; label: string };

const phaseOptions: PhaseOption[] = [
    { value: "ready", label: "READY" },
    { value: "ping", label: "PING" },
    { value: "download", label: "DOWNLOAD" },
    { value: "upload", label: "UPLOAD" },
    { value: "complete", label: "COMPLETE" },
];

const phase = ref<InstrumentChassisPhase>("ready");

interface PillSpec {
    key: string;
    label: string;
    amount: string | number | null;
    unit: string;
    cssVar: string;
}

const pills = computed<PillSpec[]>(() => {
    const isLive = phase.value !== "ready";
    return [
        {
            key: "ping",
            label: "PING",
            amount: isLive ? 18 : null,
            unit: "ms",
            cssVar: "var(--chart-ping)",
        },
        {
            key: "jitter",
            label: "JITTER",
            amount: isLive ? "1.4" : null,
            unit: "ms",
            cssVar: "var(--chart-jitter)",
        },
        {
            key: "download",
            label: "DOWN",
            amount: phase.value === "download" || phase.value === "upload" || phase.value === "complete" ? 482 : null,
            unit: "Mbps",
            cssVar: "var(--chart-download)",
        },
        {
            key: "upload",
            label: "UP",
            amount: phase.value === "upload" || phase.value === "complete" ? 64 : null,
            unit: "Mbps",
            cssVar: "var(--chart-upload)",
        },
    ];
});

const heroValue = computed(() => {
    switch (phase.value) {
        case "ping": return "18";
        case "download": return "482";
        case "upload": return "64";
        case "complete": return "482";
        default: return "0";
    }
});

const heroUnit = computed(() => {
    switch (phase.value) {
        case "ping": return "ms";
        case "download":
        case "upload":
        case "complete": return "Mbps";
        default: return "Mbps";
    }
});

const phaseLabel = computed(() => {
    switch (phase.value) {
        case "ping": return "PINGING";
        case "download": return "DOWNLOADING";
        case "upload": return "UPLOADING";
        case "complete": return "COMPLETE";
        default: return "READY";
    }
});

const isIdle = computed(() => phase.value === "ready");

function needleAngle(p: InstrumentChassisPhase): number {
    switch (p) {
        case "ping":     return -100;
        case "download": return -10;
        case "upload":   return -45;
        case "complete": return -10;
        default:         return -135;
    }
}

const primaryGlyph = computed<{ icon: LucideIcon; label: string }>(() => {
    switch (phase.value) {
        case "complete":
            return { icon: RotateCcw, label: "Again" };
        default:
            return { icon: Play, label: "Start" };
    }
});
</script>

<template>
    <StoryPage>
        <!-- Phase controls — drives `--phase-color` cascade. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">phase</p>
            <div class="flex flex-wrap gap-2">
                <button
                    v-for="opt in phaseOptions"
                    :key="opt.value"
                    type="button"
                    class="rounded-pill border border-border px-3 py-1 text-mono-caption transition-colors"
                    :class="phase === opt.value
                        ? 'bg-foreground text-background'
                        : 'bg-card text-muted-foreground hover:bg-accent'"
                    @click="phase = opt.value"
                >
                    {{ opt.label }}
                </button>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                The chassis carries one `--phase-color` cascade via `data-phase`.
                Phase label, hero number, and primary-action disco-grain all retint
                from a single mutation.
            </p>
        </section>

        <!-- Live chassis. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">composed chassis</p>
            <InstrumentChassis :phase="phase" class="instrument-chassis-demo">
                <template #strip>
                    <div class="flex flex-1 flex-wrap items-center gap-3">
                        <div
                            v-for="pill in pills"
                            :key="pill.key"
                            class="flex flex-col gap-0.5"
                        >
                            <span class="text-admin-label text-muted-foreground">
                                {{ pill.label }}
                            </span>
                            <MetricBadge
                                :amount="pill.amount"
                                :unit="pill.unit"
                                :color="pill.cssVar"
                            />
                        </div>
                    </div>
                    <DockIconButton aria-label="Settings">
                        <Settings :stroke-width="2" class="size-5 text-muted-foreground" />
                    </DockIconButton>
                </template>

                <template #dial>
                    <div class="dial-canvas-placeholder">
                        <div class="dial-ring" />
                        <div class="dial-ring dial-ring--mid" />
                        <div class="dial-ring dial-ring--inner" />
                        <div
                            class="dial-needle"
                            :style="{ '--needle-rotate': `${needleAngle(phase)}deg` }"
                        />
                        <div class="dial-center" />
                    </div>
                    <ChassisDivider orientation="vertical" class="dial-divider" />
                    <div class="readout-column">
                        <span
                            class="text-admin-label transition-colors"
                            :style="{ color: 'var(--phase-color)' }"
                        >
                            {{ phaseLabel }}
                        </span>
                        <div class="flex items-baseline gap-2">
                            <span
                                :class="['text-display-3 tabular-nums tracking-tight transition-colors', isIdle && 'text-engraved']"
                                :style="!isIdle ? { color: 'var(--phase-color)' } : undefined"
                            >
                                {{ heroValue }}
                            </span>
                            <span class="text-mono-caption text-muted-foreground">
                                {{ heroUnit }}
                            </span>
                        </div>
                    </div>
                </template>

                <template #control>
                    <div class="flex items-center gap-2">
                        <DockIconButton aria-label="Back">
                            <ArrowLeft :stroke-width="2.5" class="size-5" />
                        </DockIconButton>
                        <DockIconButton aria-label="Retake">
                            <RotateCcw :stroke-width="2.5" class="size-5" />
                        </DockIconButton>
                    </div>
                    <div class="dock-spacer" />
                    <DockTabButton data-tier="primary" class="primary-action-demo">
                        <component :is="primaryGlyph.icon" :stroke-width="2.5" class="size-5 text-foreground" />
                        <span class="text-heading font-medium">{{ primaryGlyph.label }}</span>
                    </DockTabButton>
                </template>
            </InstrumentChassis>
            <p class="text-mono-caption text-muted-foreground">
                Hover the primary action to see specular swap + sparkle sweep + phase-tinted
                disco grain — three rules layered on `:hover` only. At rest the button reads
                Vignelli-restrained.
            </p>
        </section>

        <!-- Empty-slot variant — just the chassis chrome. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">chrome alone (slots empty)</p>
            <InstrumentChassis phase="ready" class="instrument-chassis-demo instrument-chassis-demo--mini">
                <template #strip><span class="text-mono-caption text-muted-foreground">strip</span></template>
                <template #dial><span class="text-mono-caption text-muted-foreground">dial</span></template>
                <template #control><span class="text-mono-caption text-muted-foreground">control</span></template>
            </InstrumentChassis>
            <p class="text-mono-caption text-muted-foreground">
                Engraved-bezel `::before` stroke, twin-line region dividers, and the
                radial-gradient curvature overlay all read at rest with no slot content.
            </p>
        </section>
    </StoryPage>
</template>

<style scoped>
.instrument-chassis-demo {
    margin-inline: auto;
    width: 100%;
    max-width: 56rem;
}

.instrument-chassis-demo--mini :deep(.instrument-strip),
.instrument-chassis-demo--mini :deep(.instrument-dial),
.instrument-chassis-demo--mini :deep(.instrument-control) {
    min-height: 3rem;
    justify-content: center;
}

.dial-canvas-placeholder {
    position: relative;
    aspect-ratio: 1.6 / 1;
    width: 100%;
    border-radius: 50% / 30%;
    background: radial-gradient(
        ellipse at 50% 30%,
        color-mix(in srgb, var(--card) 60%, transparent) 0%,
        transparent 70%
    );
    overflow: hidden;
}

.dial-ring {
    position: absolute;
    inset: 10%;
    border: 1px solid color-mix(in srgb, var(--phase-color) 22%, transparent);
    border-radius: 50% / 60%;
    pointer-events: none;
    transition: border-color 0.45s var(--spring-smooth);
}

.dial-ring--mid {
    inset: 20%;
    border-color: color-mix(in srgb, var(--phase-color) 16%, transparent);
}

.dial-ring--inner {
    inset: 30%;
    border-color: color-mix(in srgb, var(--phase-color) 12%, transparent);
}

.dial-needle {
    position: absolute;
    bottom: 20%;
    left: 50%;
    width: 2px;
    height: 38%;
    transform-origin: bottom center;
    background: var(--phase-color);
    border-radius: 1px;
    transform: translateX(-50%) rotate(var(--needle-rotate, -135deg));
    transition: transform 0.45s var(--spring-snappy), background 0.45s var(--spring-smooth);
    box-shadow: 0 0 6px color-mix(in srgb, var(--phase-color) 40%, transparent);
}

.dial-center {
    position: absolute;
    bottom: 18%;
    left: 50%;
    width: 8px;
    height: 8px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: var(--phase-color);
    box-shadow: 0 0 12px color-mix(in srgb, var(--phase-color) 50%, transparent);
    transition: background 0.45s var(--spring-smooth), box-shadow 0.45s var(--spring-smooth);
}

.readout-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-inline: 0.5rem;
}

.primary-action-demo {
    gap: 0.5rem;
}
</style>
