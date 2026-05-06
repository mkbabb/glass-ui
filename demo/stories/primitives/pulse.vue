<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Activity } from "lucide-vue-next";
import { Pulse } from "@/components/custom/pulse";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";
</script>

<template>
    <StoryPage>
        <!-- Hero — section-10. The pulse is the gesture; the chassis frames it. -->
        <CreamSurface tone="cool" class="relative overflow-hidden">
            <div
                class="pointer-events-none absolute inset-0 -z-10 opacity-50"
                :style="{
                    backgroundImage: `
                        radial-gradient(ellipse 70% 55% at 50% 0%, color-mix(in srgb, var(--section-color-10) 40%, transparent) 0%, transparent 60%),
                        radial-gradient(ellipse 90% 70% at 50% 110%, var(--rainbow-pastel-violet) 0%, transparent 65%)
                    `,
                }"
            />

            <div
                class="relative flex flex-col items-center gap-[var(--space-phi-3)] text-center"
            >
                <p class="section-label" :style="{ color: 'var(--section-color-10)' }">
                    primitives · pulse · § 10
                </p>
                <IconStamp size="2xl" frame="stamp" accent="section-10" aria-hidden="true">
                    <Activity />
                </IconStamp>
                <DisplayHero
                    size="display-mega"
                    variation="wonk"
                    class="leading-[0.92]"
                    :style="{ color: 'var(--section-color-10)' }"
                >
                    Heartbeat.
                </DisplayHero>
                <!-- Live ring at hero scale — the gesture, magnified. -->
                <div
                    class="text-display-mega"
                    :style="{ color: 'var(--section-color-10)' }"
                >
                    <Pulse variant="ring" speed="normal" class="h-16 w-16" />
                </div>
                <p class="text-prose max-w-prose text-foreground/80">
                    Two variants — synchronized dots, single ring — both driven by
                    <code class="fira-code">currentColor</code>, both honoring
                    <code class="fira-code">prefers-reduced-motion</code>. The
                    motion is the message; tint by setting text color.
                </p>
                <FlourishDivider tone="section-10" class="w-full max-w-md" />
            </div>
        </CreamSurface>

        <!-- Dots: vary speed and count. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">dots variant</p>
            <div class="flex flex-wrap items-center gap-8">
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" speed="slow" :count="3" :style="{ color: 'var(--section-color-10)' }" />
                    <span class="text-mono-caption text-muted-foreground">slow · 3</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" speed="normal" :count="3" :style="{ color: 'var(--section-color-10)' }" />
                    <span class="text-mono-caption text-muted-foreground">normal · 3</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" speed="fast" :count="3" :style="{ color: 'var(--section-color-10)' }" />
                    <span class="text-mono-caption text-muted-foreground">fast · 3</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" :count="5" :style="{ color: 'var(--section-color-10)' }" />
                    <span class="text-mono-caption text-muted-foreground">5 dots</span>
                </div>
            </div>
        </section>

        <!-- Ring: speed variants. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">ring variant</p>
            <div class="flex flex-wrap items-center gap-8">
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="ring" speed="slow" :style="{ color: 'var(--section-color-10)' }" />
                    <span class="text-mono-caption text-muted-foreground">slow</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="ring" speed="normal" :style="{ color: 'var(--section-color-10)' }" />
                    <span class="text-mono-caption text-muted-foreground">normal</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="ring" speed="fast" :style="{ color: 'var(--section-color-10)' }" />
                    <span class="text-mono-caption text-muted-foreground">fast</span>
                </div>
            </div>
        </section>

        <!-- currentColor demo — tint by setting text color. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">currentColor tint · viz basis</p>
            <div class="flex flex-wrap items-center gap-8">
                <Pulse variant="dots" class="text-viz-fourier" />
                <Pulse variant="dots" class="text-viz-chebyshev" />
                <Pulse variant="dots" class="text-viz-legendre" />
                <Pulse variant="ring" class="text-viz-fourier" />
            </div>
        </section>

        <!-- Inline in a status line. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">inline usage</p>
            <div
                class="flex items-center gap-3 rounded-card border-2 border-border bg-card px-4 py-3 shadow-cartoon-sm"
                :style="{ borderColor: 'color-mix(in srgb, var(--section-color-10) 35%, var(--border))' }"
            >
                <Pulse variant="dots" :style="{ color: 'var(--section-color-10)' }" />
                <span class="text-small text-foreground">Computing projection…</span>
            </div>
        </section>
    </StoryPage>
</template>
