<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ScrollingText } from "@glass/components/custom/scrolling-text";

const samples = [
    { label: "short — no overflow", text: "10.0.0.1" },
    {
        label: "long IPv6 — overflows in narrow hosts",
        text: "[fe80::1ff:fe23:4567:890a%eth0]:443",
    },
    {
        label: "org name — long string",
        text: "Some Lengthy Internet Service Provider, LLC. dba A Brand Name",
    },
    {
        label: "entity ID — monospace",
        text: "ENTITY-2026-NORTH-CAROLINA-FRIDAY-INSTITUTE-0000000042-IPV6",
    },
];

const widths = [80, 160, 240];
</script>

<template>
    <StoryPage>
        <!-- Width × text matrix to demonstrate the overflow threshold. -->
        <StorySection label="overflow threshold · narrow → wide hosts">
            <p class="text-prose text-muted-foreground max-w-prose">
                The component sets <code class="fira-code">data-overflows</code>
                when content exceeds the host by more than 1 px. Mask edges fade the
                clip; hover pauses the marquee; reduced-motion drops the animation in
                favour of a thin native horizontal scroll.
            </p>

            <div class="overflow-x-auto">
                <table
                    class="min-w-max border-separate border-spacing-x-6 border-spacing-y-3"
                >
                    <thead>
                        <tr>
                            <th
                                class="text-admin-label text-left text-muted-foreground"
                            >
                                sample
                            </th>
                            <th
                                v-for="w in widths"
                                :key="w"
                                class="text-admin-label text-left text-muted-foreground"
                            >
                                {{ w }} px host
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="s in samples" :key="s.label">
                            <td
                                class="text-mono-caption text-muted-foreground align-top"
                            >
                                {{ s.label }}
                            </td>
                            <td v-for="w in widths" :key="w">
                                <div
                                    class="rounded-md border border-border bg-card px-2 py-1"
                                    :style="{ width: `${w}px` }"
                                >
                                    <ScrollingText
                                        :text="s.text"
                                        class="font-mono text-prose"
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </StorySection>

        <!-- Slot pattern: richer markup. -->
        <StorySection label="slot pattern · richer inline markup">
            <p class="text-prose text-muted-foreground max-w-prose">
                The default slot accepts arbitrary inline content. Use it when you need
                icons, badges, or tinted spans inside the marquee.
            </p>
            <div
                class="rounded-md border border-border bg-card px-3 py-2"
                style="width: 200px"
            >
                <ScrollingText class="text-prose">
                    <span class="text-th-accent font-medium">Live</span>
                    <span class="text-muted-foreground"> · </span>
                    <span class="font-mono">[fe80::1ff:fe23:4567:890a%eth0]:443</span>
                </ScrollingText>
            </div>
        </StorySection>

        <!-- Pause-on-hover hint. -->
        <StorySection label="hover · marquee pauses for readers">
            <div
                class="rounded-md border border-border bg-card px-3 py-2"
                style="width: 180px"
            >
                <ScrollingText
                    text="Hover this row to pause the marquee — release to resume."
                    class="text-prose"
                />
            </div>
        </StorySection>
    </StoryPage>
</template>
