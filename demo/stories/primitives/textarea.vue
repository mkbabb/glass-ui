<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Pen } from "lucide-vue-next";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";

const plain = ref("");
const resizable = ref(
    "This one has the native resize handle enabled — grab the bottom-right corner.",
);
const fixed = ref(
    "Resize is pinned off so the shell layout stays predictable.",
);
const locked = ref("This content is read-only and visually muted.");
</script>

<template>
    <StoryPage>
        <!-- Hero — section-1. Multi-line input is room to breathe. -->
        <CreamSurface tone="warm" class="paper-grain-overlay relative overflow-hidden">
            <div
                class="pointer-events-none absolute inset-0 -z-10 opacity-40"
                :style="{
                    backgroundImage: `
                        radial-gradient(ellipse 65% 55% at 14% 22%, color-mix(in srgb, var(--section-color-1) 40%, transparent) 0%, transparent 60%),
                        radial-gradient(ellipse 80% 65% at 90% 78%, var(--rainbow-pastel-orange) 0%, transparent 60%)
                    `,
                }"
            />

            <div class="relative flex flex-col gap-[var(--space-phi-2)]">
                <p class="section-label" :style="{ color: 'var(--section-color-1)' }">
                    primitives · textarea · § 1
                </p>
                <div class="flex items-start gap-[var(--space-phi-3)]">
                    <IconStamp size="2xl" frame="stamp" accent="section-1" aria-hidden="true">
                        <Pen />
                    </IconStamp>
                    <div class="flex flex-col gap-[var(--space-phi-1)]">
                        <DisplayHero
                            size="display-3"
                            variation="wonk"
                            class="leading-[0.95]"
                            :style="{ color: 'var(--section-color-1)' }"
                        >
                            Room to write.
                        </DisplayHero>
                        <p class="text-prose max-w-prose text-foreground/80">
                            Textarea is the long-form input — single field, many
                            lines. Resize horizontal, vertical, or pinned; the disabled
                            state honors the same opacity contract as every other
                            primitive. Pair with
                            <code class="fira-code">&lt;Label&gt;</code> for the
                            standard form rhythm.
                        </p>
                    </div>
                </div>
                <FlourishDivider tone="section-1" class="mt-[var(--space-phi-2)]" />
            </div>
        </CreamSurface>

        <section class="grid grid-cols-1 gap-[var(--space-phi-4)] md:grid-cols-2">
            <div class="flex flex-col gap-3">
                <p
                    class="section-label"
                    :style="{ color: 'var(--section-color-1)' }"
                >
                    with label
                </p>
                <p class="text-small text-muted-foreground">
                    Baseline pairing — <code class="fira-code">Label</code> above, field below.
                </p>
                <Label for="story-bio">Bio</Label>
                <Textarea
                    id="story-bio"
                    v-model="plain"
                    placeholder="A short sentence or three…"
                />
            </div>

            <div class="flex flex-col gap-3">
                <p
                    class="section-label"
                    :style="{ color: 'var(--section-color-1)' }"
                >
                    resizable
                </p>
                <p class="text-small text-muted-foreground">
                    Native <code class="fira-code">resize: vertical</code>.
                </p>
                <Label for="story-resize">Notes</Label>
                <Textarea id="story-resize" v-model="resizable" class="resize-y" />
            </div>

            <div class="flex flex-col gap-3">
                <p
                    class="section-label"
                    :style="{ color: 'var(--section-color-1)' }"
                >
                    resize off
                </p>
                <p class="text-small text-muted-foreground">
                    Forced <code class="fira-code">resize: none</code> — height stays put.
                </p>
                <Label for="story-fixed">Caption</Label>
                <Textarea id="story-fixed" v-model="fixed" class="resize-none" />
            </div>

            <div class="flex flex-col gap-3">
                <p
                    class="section-label"
                    :style="{ color: 'var(--section-color-1)' }"
                >
                    disabled
                </p>
                <p class="text-small text-muted-foreground">
                    <code class="fira-code">disabled</code> drops opacity, blocks input.
                </p>
                <Label for="story-locked" class="opacity-60">Release notes</Label>
                <Textarea id="story-locked" v-model="locked" disabled />
            </div>
        </section>
    </StoryPage>
</template>
