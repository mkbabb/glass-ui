<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ScrollPane } from "@/components/ui/scroll-pane";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const longList = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Result row ${i + 1}`,
    blurb: [
        "Sample sequence with timing, throughput, and a short trailing note.",
        "Mid-window row to confirm the scroll affordance picks up.",
        "Trailing item — verify the bottom edge of the scroll mask is clean.",
    ][i % 3],
}));
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">scroll pane — replaces &lt;Card variant="pane"&gt;</p>
                <p class="text-sm text-muted-foreground">
                    A wash-tier surface tuned for
                    <code class="font-mono text-xs">overflow:auto</code> hosts.
                    Grain overlay disabled (it conflicts with scroll repaint),
                    scrollbars hidden by default, height capped by the consumer
                    via a <code class="font-mono text-xs">max-h-*</code> class.
                </p>
            </header>

            <ScrollPane class="max-h-80 p-4">
                <ul class="flex flex-col gap-3">
                    <li
                        v-for="row in longList"
                        :key="row.id"
                        class="flex items-baseline justify-between gap-4 border-b border-border/40 pb-3 last:border-0"
                    >
                        <span class="font-mono text-xs text-muted-foreground">
                            #{{ row.id.toString().padStart(2, "0") }}
                        </span>
                        <span class="flex-1 text-sm">{{ row.title }}</span>
                        <span class="text-xs text-muted-foreground">
                            {{ row.blurb }}
                        </span>
                    </li>
                </ul>
            </ScrollPane>
        </section>

        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">nested inside a Card</p>
                <p class="text-sm text-muted-foreground">
                    Drop the pane's shadow when the host card already carries
                    one. Pass <code class="font-mono text-xs">:shadow="false"</code>
                    to suppress the
                    <code class="font-mono text-xs">--shadow-card</code> stack.
                </p>
            </header>

            <Card tier="resting">
                <CardHeader>
                    <CardTitle class="text-lg">Latest results</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollPane :shadow="false" class="max-h-64 p-4">
                        <div class="flex flex-col gap-2 text-sm">
                            <p
                                v-for="row in longList.slice(0, 12)"
                                :key="row.id"
                                class="flex justify-between"
                            >
                                <span>{{ row.title }}</span>
                                <span class="text-muted-foreground">
                                    {{ (Math.random() * 900).toFixed(1) }} Mbps
                                </span>
                            </p>
                        </div>
                    </ScrollPane>
                </CardContent>
            </Card>
        </section>

        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">polymorphic — render as &lt;aside&gt;</p>
                <p class="text-sm text-muted-foreground">
                    Same polymorphic <code class="font-mono text-xs">as</code>
                    affordance as Card; the surface composition stays put while
                    the rendered tag changes.
                </p>
            </header>

            <ScrollPane as="aside" class="max-h-48 p-4">
                <p class="text-sm text-muted-foreground">
                    A short overflow-auto host rendered as an
                    <code class="font-mono text-xs">&lt;aside&gt;</code>. Inspect
                    the DOM to verify.
                </p>
                <p
                    v-for="i in 8"
                    :key="i"
                    class="mt-3 text-sm text-muted-foreground"
                >
                    Row {{ i }} — placeholder content to push the inner height
                    past the cap so the scroll affordance engages.
                </p>
            </ScrollPane>
        </section>
    </StoryPage>
</template>
