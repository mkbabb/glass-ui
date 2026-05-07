<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { StatusDot } from "../../../src/components/custom/status-dot";

type Variant = "active" | "paused" | "idle" | "error" | "custom";
type Size = "xs" | "sm" | "md";

const variants: { variant: Variant; label: string; color?: string }[] = [
    { variant: "active", label: "active" },
    { variant: "paused", label: "paused" },
    { variant: "idle", label: "idle" },
    { variant: "error", label: "error" },
    { variant: "custom", label: "custom", color: "var(--viz-fourier)" },
];

const sizes: Size[] = ["xs", "sm", "md"];
</script>

<template>
    <StoryPage>
        <!-- Matrix: variant × size, pulse off. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">matrix · no pulse</p>
            <div class="overflow-x-auto">
                <table class="min-w-max border-separate border-spacing-x-8 border-spacing-y-4">
                    <thead>
                        <tr>
                            <th class="text-admin-label text-left text-muted-foreground">variant</th>
                            <th
                                v-for="size in sizes"
                                :key="size"
                                class="text-admin-label text-left text-muted-foreground"
                            >
                                {{ size }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="v in variants" :key="v.variant">
                            <td class="text-mono-caption text-foreground">
                                {{ v.label }}
                            </td>
                            <td v-for="size in sizes" :key="size">
                                <StatusDot
                                    :variant="v.variant"
                                    :size="size"
                                    :color="v.color"
                                    :label="v.label"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Matrix: pulse on. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">matrix · with pulse</p>
            <div class="overflow-x-auto">
                <table class="min-w-max border-separate border-spacing-x-8 border-spacing-y-4">
                    <thead>
                        <tr>
                            <th class="text-admin-label text-left text-muted-foreground">variant</th>
                            <th
                                v-for="size in sizes"
                                :key="size"
                                class="text-admin-label text-left text-muted-foreground"
                            >
                                {{ size }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="v in variants" :key="v.variant">
                            <td class="text-mono-caption text-foreground">
                                {{ v.label }}
                            </td>
                            <td v-for="size in sizes" :key="size">
                                <StatusDot
                                    :variant="v.variant"
                                    :size="size"
                                    :color="v.color"
                                    pulse
                                    :label="v.label"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Pulse halo respects <code class="fira-code">prefers-reduced-motion</code>.
            </p>
        </section>
    </StoryPage>
</template>
