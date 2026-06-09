<script setup lang="ts">
// useTokenColor — reactive read of a CSS custom property's resolved value.
import StoryPage from "../StoryPage.vue";
import { useTokenColor } from "../../../src/composables/dom/useTokenColor";
import { useGlobalDark } from "../../../src/composables/dark";
import { DarkModeToggle } from "../../../src/components/custom/controls";

// A representative spread of theme tokens. Each is read as its own reactive ref;
// the whole set re-resolves the moment the theme flips — no remount, no manual
// refresh. The dark-mode toggle below is the only control: flip it and watch
// every swatch + value track the cascade live.
const swatches = [
    { token: "--color-foreground", label: "Foreground" },
    { token: "--color-background", label: "Background" },
    { token: "--color-muted-foreground", label: "Muted" },
    { token: "--color-accent", label: "Accent" },
    { token: "--color-border", label: "Border" },
    { token: "--color-card", label: "Card" },
].map((s) => ({
    ...s,
    resolved: useTokenColor(s.token, { fallback: "transparent" }),
}));

const { isDark } = useGlobalDark();
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-6">
            <p class="text-prose text-muted-foreground max-w-prose">
                Reads <code class="fira-code">getComputedStyle(html).getPropertyValue(token)</code>
                as a reactive ref. Toggle the theme — every value re-resolves on the
                transition without a remount.
            </p>

            <div class="flex flex-wrap items-center gap-3">
                <DarkModeToggle aria-label="Toggle theme" />
                <span class="text-small text-muted-foreground">
                    Theme: {{ isDark ? "dark" : "light" }}
                </span>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="s in swatches"
                    :key="s.token"
                    class="flex items-center gap-3 rounded-panel border border-border p-4"
                    :style="{ background: 'var(--color-card)' }"
                >
                    <div
                        class="size-12 shrink-0 rounded-full border border-border"
                        :style="{ backgroundColor: s.resolved.value.value || 'transparent' }"
                    />
                    <div class="flex min-w-0 flex-col gap-1">
                        <span class="text-small font-medium text-foreground">{{ s.label }}</span>
                        <code class="fira-code text-mono-caption text-muted-foreground">{{ s.token }}</code>
                        <code class="fira-code text-mono-caption truncate">{{ s.resolved.value.value || "(unset)" }}</code>
                    </div>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
