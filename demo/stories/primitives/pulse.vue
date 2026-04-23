<script setup lang="ts">
import { Pulse } from "@/components/custom/pulse";
</script>

<template>
    <article class="flex flex-col gap-14">
        <header class="flex flex-col gap-3">
            <p class="text-admin-label text-muted-foreground">primitives · pulse</p>
            <h1 class="text-title text-foreground">Pulse</h1>
            <p class="text-prose max-w-2xl text-muted-foreground">
                Lightweight loading indicator. <code class="font-mono-code">dots</code>
                variant bounces a row of discs; <code class="font-mono-code">ring</code>
                spins a partial border. Color follows <code class="font-mono-code">currentColor</code>,
                so tinting happens via the surrounding text color.
            </p>
        </header>

        <!-- Dots: vary speed and count. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">dots variant</p>
            <div class="flex flex-wrap items-center gap-8">
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" speed="slow" :count="3" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">slow · 3</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" speed="normal" :count="3" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">normal · 3</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" speed="fast" :count="3" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">fast · 3</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="dots" :count="5" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">5 dots</span>
                </div>
            </div>
        </section>

        <!-- Ring: speed variants. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">ring variant</p>
            <div class="flex flex-wrap items-center gap-8">
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="ring" speed="slow" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">slow</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="ring" speed="normal" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">normal</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Pulse variant="ring" speed="fast" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground">fast</span>
                </div>
            </div>
        </section>

        <!-- currentColor demo — tint by setting text color. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">currentColor tint</p>
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
                class="flex items-center gap-3 rounded-card border border-border bg-card px-4 py-3"
            >
                <Pulse variant="dots" class="text-viz-chebyshev" />
                <span class="text-small text-foreground">Computing projection…</span>
            </div>
        </section>
    </article>
</template>
