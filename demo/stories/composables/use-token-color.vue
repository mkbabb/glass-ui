<script setup lang="ts">
// useTokenColor — reactive read of a CSS custom property.
import { computed, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { useTokenColor } from "../../../src/composables/useTokenColor";
import { useGlobalDark } from "../../../src/composables/useGlobalDark";
import { Button } from "../../../src/components/ui/button";

const tokens = [
    "--color-foreground",
    "--color-background",
    "--color-muted-foreground",
    "--color-accent",
    "--color-border",
    "--color-card",
] as const;

const selected = ref<(typeof tokens)[number]>("--color-foreground");

const resolved = useTokenColor(() => selected.value, { fallback: "transparent" });

const { isDark, toggleDark } = useGlobalDark();

const swatchStyle = computed(() => ({
    backgroundColor: resolved.value.value || "transparent",
}));
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-6">
            <p class="text-prose text-muted-foreground max-w-prose">
                Reads <code class="fira-code">getComputedStyle(html).getPropertyValue(token)</code>
                as a reactive ref. Re-resolves on theme transitions via <code class="fira-code">useGlobalDark</code>.
                Toggle the theme below — the swatch updates without a remount.
            </p>

            <div class="flex flex-wrap items-center gap-3">
                <Button variant="secondary" @click="toggleDark">
                    Theme: {{ isDark ? "dark" : "light" }} (toggle)
                </Button>
                <span class="text-small text-muted-foreground">
                    Resolved: <code class="fira-code">{{ resolved.value || "—" }}</code>
                </span>
            </div>

            <div class="flex flex-wrap gap-2">
                <Button
                    v-for="token in tokens"
                    :key="token"
                    :variant="token === selected ? 'default' : 'outline'"
                    size="sm"
                    @click="selected = token"
                >
                    {{ token }}
                </Button>
            </div>

            <div
                class="rounded-panel border border-border p-6"
                :style="{ background: 'var(--color-card)' }"
            >
                <div class="flex items-center gap-4">
                    <div
                        class="size-16 rounded-full border border-border"
                        :style="swatchStyle"
                    />
                    <div class="flex flex-col gap-1">
                        <span class="text-mono-caption text-muted-foreground">{{ selected }}</span>
                        <code class="fira-code text-body">{{ resolved.value || "(unset)" }}</code>
                    </div>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
