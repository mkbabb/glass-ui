<script setup lang="ts">
// BB.W-DEMO-DESIGN — the radii token tour gains ONE chassis lever: the calm wash
// read-through (StorySection over the StoryHero `wash` card drop the `foundations→
// paper` manifest default declares) + the PRM-safe scroll-cascade rung stagger (the
// W-SCROLL-MOTION `.scroll-cascade` register, no GL field — a static-wash route by
// design). The token-tour boxes float over a designed substrate; no per-pane
// bespoke craft.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { cn } from "@glass/utils/cn";

const scale: { cls: string; label: string; hint: string }[] = [
    { cls: "rounded-xs", label: "xs", hint: "2px" },
    { cls: "rounded-sm", label: "sm", hint: "4px" },
    { cls: "rounded-md", label: "md", hint: "6px" },
    { cls: "rounded-lg", label: "lg", hint: "var(--radius)" },
    { cls: "rounded-xl", label: "xl", hint: "12px" },
    { cls: "rounded-2xl", label: "2xl", hint: "16px" },
    { cls: "rounded-pill", label: "pill", hint: "9999px" },
];

const semantic: { cls: string; label: string; role: string }[] = [
    { cls: "rounded-card", label: "card", role: "cards, elevated surfaces" },
    { cls: "rounded-panel", label: "panel", role: "floating panels" },
    { cls: "rounded-dialog", label: "dialog", role: "modals, sheets" },
    { cls: "rounded-input", label: "input", role: "form fields" },
    { cls: "rounded-button", label: "button", role: "buttons" },
    { cls: "rounded-badge", label: "badge", role: "chips, badges" },
    { cls: "rounded-dock", label: "dock", role: "glass pill dock" },
];
</script>

<template>
    <StoryPage>
        <StorySection heading="Scale">
            <div class="scroll-cascade flex flex-wrap gap-4">
                <div
                    v-for="r in scale"
                    :key="r.label"
                    class="flex flex-col items-center gap-2"
                >
                    <div
                        :class="
                            cn(
                                'h-20 w-20 border border-border bg-card shadow-cartoon',
                                r.cls
                            )
                        "
                    />
                    <div class="flex flex-col items-center">
                        <span class="text-small text-foreground">{{ r.label }}</span>
                        <span class="text-mono-caption text-muted-foreground">{{
                            r.hint
                        }}</span>
                    </div>
                </div>
            </div>
        </StorySection>

        <StorySection heading="Semantic aliases">
            <div class="scroll-cascade grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                <div
                    v-for="r in semantic"
                    :key="r.label"
                    class="flex flex-col items-center gap-2"
                >
                    <div
                        :class="
                            cn(
                                'h-20 w-20 border border-border bg-card shadow-cartoon',
                                r.cls
                            )
                        "
                    />
                    <div class="flex flex-col items-center text-center">
                        <span class="text-small text-foreground">{{ r.label }}</span>
                        <span class="text-mono-caption text-muted-foreground">{{
                            r.role
                        }}</span>
                    </div>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
