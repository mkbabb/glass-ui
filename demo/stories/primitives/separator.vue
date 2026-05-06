<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Minus } from "lucide-vue-next";
import { Separator } from "@/components/ui/separator";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";
</script>

<template>
    <StoryPage>
        <!-- Hero — section-12. The rule is the gesture; the hero rules show its scale. -->
        <CreamSurface tone="cool" class="relative overflow-hidden">
            <div
                class="pointer-events-none absolute inset-0 -z-10 opacity-45"
                :style="{
                    backgroundImage: `
                        radial-gradient(ellipse 80% 60% at 8% 12%, color-mix(in srgb, var(--section-color-12) 35%, transparent) 0%, transparent 60%),
                        radial-gradient(ellipse 70% 55% at 92% 90%, var(--rainbow-pastel-red) 0%, transparent 60%)
                    `,
                }"
            />

            <div class="relative flex flex-col gap-[var(--space-phi-2)]">
                <p class="section-label" :style="{ color: 'var(--section-color-12)' }">
                    primitives · separator · § 12
                </p>
                <div class="flex items-start gap-[var(--space-phi-3)]">
                    <IconStamp size="2xl" frame="stamp" accent="section-12" aria-hidden="true">
                        <Minus />
                    </IconStamp>
                    <div class="flex flex-col gap-[var(--space-phi-1)]">
                        <DisplayHero
                            size="display-3"
                            variation="wonk"
                            class="leading-[0.95]"
                            :style="{ color: 'var(--section-color-12)' }"
                        >
                            A line is a decision.
                        </DisplayHero>
                        <p class="text-prose max-w-prose text-foreground/80">
                            The plain rule says <em>before / after</em>; the labelled
                            rule says <em>or</em>; the vertical rule says <em>peer
                            to peer</em>. Three orientations, one primitive — when the
                            rule is decorative, reach for
                            <code class="fira-code">&lt;FlourishDivider&gt;</code>;
                            when the rule is structural, reach for this.
                        </p>
                    </div>
                </div>
                <FlourishDivider tone="section-12" class="mt-[var(--space-phi-2)]" />
            </div>
        </CreamSurface>

        <!-- Plain horizontal. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">horizontal</p>
            <div class="rounded-card border-2 border-border bg-card p-6 shadow-cartoon-sm">
                <p class="text-small text-foreground">
                    Paragraph above the rule.
                </p>
                <Separator class="my-4" />
                <p class="text-small text-foreground">
                    Paragraph below.
                </p>
            </div>
        </section>

        <!-- Horizontal with label. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">horizontal · labelled</p>
            <div class="rounded-card border-2 border-border bg-card p-6 shadow-cartoon-sm">
                <p class="text-small text-foreground">Draft</p>
                <Separator class="my-6" label="or" />
                <p class="text-small text-foreground">Published</p>
            </div>
        </section>

        <!-- Vertical separators in a flex row. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">vertical · flex row</p>
            <div
                class="flex h-12 items-center rounded-card border-2 border-border bg-card px-4 shadow-cartoon-sm"
            >
                <span class="text-small text-foreground">Docs</span>
                <Separator orientation="vertical" class="mx-4" />
                <span class="text-small text-foreground">API</span>
                <Separator orientation="vertical" class="mx-4" />
                <span class="text-small text-foreground">Playground</span>
                <Separator orientation="vertical" class="mx-4" />
                <span class="text-small text-foreground">Changelog</span>
            </div>
        </section>

        <!-- Section-label copy pattern — section-12 accent threaded through eyebrows. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">section-label copy pattern</p>
            <div
                class="flex flex-col gap-6 rounded-card border-2 border-border bg-card p-6 shadow-cartoon-sm"
            >
                <div class="flex flex-col gap-3">
                    <p class="section-label" :style="{ color: 'var(--section-color-12)' }">
                        foundations
                    </p>
                    <p class="text-small text-muted-foreground">
                        colors · type · radii · shadows
                    </p>
                </div>
                <Separator />
                <div class="flex flex-col gap-3">
                    <p class="section-label" :style="{ color: 'var(--section-color-12)' }">
                        primitives
                    </p>
                    <p class="text-small text-muted-foreground">
                        button · input · slider · select
                    </p>
                </div>
                <Separator />
                <div class="flex flex-col gap-3">
                    <p class="section-label" :style="{ color: 'var(--section-color-12)' }">
                        containers
                    </p>
                    <p class="text-small text-muted-foreground">
                        card · dialog · sheet · drawer
                    </p>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
