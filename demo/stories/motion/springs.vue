<script setup lang="ts">
// Drive a parametric spring across translateX + hue + rotate between two snapshots.
// Showcases `useSpringOrchestrator` from `@/composables/motion` with four spring
// presets expressed as explicit TimingFunction lambdas (damped-spring closed form).
import { computed, ref, shallowRef } from "vue";
import type { TimingFunction } from "@mkbabb/keyframes.js";
import { useSpringOrchestrator } from "@/composables/motion";
import type { SpringSnapshot } from "@/composables/motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/cn";

// ── Spring presets ────────────────────────────────────────────────────────────
// Closed-form damped spring position over t∈[0,1]. We normalize so f(0)=0, f(1)=1.
function damped(stiffness: number, damping: number): TimingFunction {
    const omega = Math.sqrt(stiffness);
    const zeta = damping / (2 * Math.sqrt(stiffness));
    return (t: number): number => {
        if (t <= 0) return 0;
        if (t >= 1) return 1;
        if (zeta < 1) {
            const omegaD = omega * Math.sqrt(1 - zeta * zeta);
            return (
                1 -
                Math.exp(-zeta * omega * t) *
                    (Math.cos(omegaD * t) +
                        ((zeta * omega) / omegaD) * Math.sin(omegaD * t))
            );
        }
        return 1 - Math.exp(-omega * t) * (1 + omega * t);
    };
}

type PresetId = "smooth" | "snappy" | "bouncy" | "gentle";

const presets: Record<PresetId, { label: string; blurb: string; fn: TimingFunction }> = {
    smooth: {
        label: "smooth",
        blurb: "Critically damped — no overshoot, calm settle.",
        fn: damped(40, 12),
    },
    snappy: {
        label: "snappy",
        blurb: "Stiff, light damping — fast arrival, slight kiss.",
        fn: damped(120, 18),
    },
    bouncy: {
        label: "bouncy",
        blurb: "Low damping — multiple overshoots.",
        fn: damped(90, 8),
    },
    gentle: {
        label: "gentle",
        blurb: "Soft stiffness — slow, eased arrival.",
        fn: damped(20, 10),
    },
};

// ── Animation state ───────────────────────────────────────────────────────────
type Keys = "x" | "rotate" | "hue";
const from: SpringSnapshot<Keys> = { x: 0, rotate: 0, hue: 12 };
const to: SpringSnapshot<Keys> = { x: 360, rotate: 18, hue: 220 };

const card = shallowRef<HTMLElement | null>(null);
const preset = ref<PresetId>("smooth");

// Apply a snapshot directly to the DOM — the orchestrator owns timing only.
function applySnapshot(values: SpringSnapshot<Keys>): void {
    const el = card.value;
    if (!el) return;
    el.style.setProperty("--demo-x", `${values.x}px`);
    el.style.setProperty("--demo-rotate", `${values.rotate}deg`);
    el.style.setProperty("--demo-hue", `${values.hue}`);
}

// Re-create orchestrator on preset change so it picks up the new timing fn.
const orchestrator = computed(() =>
    useSpringOrchestrator<Keys>({
        from,
        to,
        duration: 1100,
        timingFunction: presets[preset.value].fn,
        onFrame: applySnapshot,
    }),
);

function play(): void {
    applySnapshot(from);
    orchestrator.value.start();
}

function reset(): void {
    orchestrator.value.stop();
    applySnapshot(from);
}
</script>

<template>
    <article class="flex flex-col gap-10 p-8 text-foreground">
        <header class="flex flex-col gap-2">
            <span class="text-admin-label text-muted-foreground">
                Motion · Spring orchestrator
            </span>
            <h1 class="text-title">useSpringOrchestrator</h1>
            <p class="text-prose max-w-prose text-muted-foreground">
                Parametric spring driven by
                <code class="font-mono-code">@mkbabb/keyframes.js</code> via
                <code class="font-mono-code">useSpringOrchestrator</code>. We interpolate
                three numeric channels — <code class="font-mono-code">translateX</code>,
                <code class="font-mono-code">rotate</code>, and the hue feeding
                <code class="font-mono-code">backgroundColor</code> — between two
                snapshots. Each preset is a closed-form damped-spring
                <code class="font-mono-code">TimingFunction</code>.
            </p>
        </header>

        <section class="flex flex-col gap-6">
            <!-- Controls -->
            <div class="flex flex-wrap items-end gap-4">
                <div class="flex flex-col gap-2 w-56">
                    <Label for="spring-preset">Preset</Label>
                    <Select v-model="preset">
                        <SelectTrigger id="spring-preset">
                            <SelectValue placeholder="Pick a preset" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="(p, id) in presets"
                                :key="id"
                                :value="id"
                            >
                                {{ p.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button variant="default" @click="play">Play</Button>
                <Button variant="secondary" @click="reset">Reset</Button>

                <p class="text-small text-muted-foreground ml-auto max-w-xs">
                    {{ presets[preset].blurb }}
                </p>
            </div>

            <!-- Stage -->
            <div
                :class="
                    cn(
                        'relative h-48 overflow-hidden rounded-card border border-border/60 bg-background/40',
                        'paper-grain-overlay',
                    )
                "
            >
                <div
                    ref="card"
                    :class="
                        cn(
                            'absolute left-6 top-1/2 h-20 w-28 -translate-y-1/2 rounded-panel',
                            'flex items-center justify-center text-small font-medium text-white',
                            'shadow-cartoon',
                        )
                    "
                    :style="{
                        transform:
                            'translate(var(--demo-x, 0px), -50%) rotate(var(--demo-rotate, 0deg))',
                        backgroundColor: 'hsl(var(--demo-hue, 12) 70% 52%)',
                    }"
                >
                    spring
                </div>
            </div>

            <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div
                    v-for="(label, key) in { x: 'translateX', rotate: 'rotate', hue: 'hue' }"
                    :key="key"
                    :class="
                        cn(
                            'flex flex-col gap-1 rounded-panel border border-border/60 bg-card/60 p-3',
                        )
                    "
                >
                    <span class="text-mono-caption text-muted-foreground">{{ label }}</span>
                    <span class="font-mono-code text-small text-foreground">
                        {{ from[key as Keys] }} &rarr; {{ to[key as Keys] }}
                    </span>
                </div>
            </div>
        </section>
    </article>
</template>
