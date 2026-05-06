<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    type CardTier,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TierExample {
    tier: CardTier;
    title: string;
    blurb: string;
    alpha: string;
}

const tiers: TierExample[] = [
    {
        tier: "wash",
        title: "wash",
        blurb: "Lightest rung. Inline workspace chrome, scroll-pane host.",
        alpha: "~0.30α",
    },
    {
        tier: "quiet",
        title: "quiet",
        blurb: "Ambient panel. Secondary surfaces inside a parent card.",
        alpha: "~0.50α",
    },
    {
        tier: "resting",
        title: "resting (default)",
        blurb: "The canonical plate. The protagonist surface.",
        alpha: "~0.65α",
    },
    {
        tier: "floating",
        title: "floating",
        blurb: "Popover-class surface. Login cards, modal-ish overlays.",
        alpha: "~0.80α",
    },
    {
        tier: "overlay",
        title: "overlay",
        blurb: "Heaviest. Modal-on-modal, dialog over content.",
        alpha: "~0.95α + heaviest blur",
    },
];

const showShadow = ref(true);
const showGrain = ref(true);
</script>

<template>
    <StoryPage>
        <!-- Five-rung tier ladder. -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">tiers — wash → overlay</p>
                <p class="text-sm text-muted-foreground">
                    The R3-spec ladder. Each rung names a class on the
                    <code class="font-mono text-xs">.glass-{tier}</code> surface
                    family; the Card primitive maps the
                    <code class="font-mono text-xs">tier</code> prop straight
                    through to the class. Default is
                    <code class="font-mono text-xs">resting</code>.
                </p>
            </header>

            <div class="flex flex-wrap items-center gap-6">
                <Label class="flex items-center gap-2">
                    <Switch v-model="showShadow" />
                    <span class="text-sm">shadow</span>
                </Label>
                <Label class="flex items-center gap-2">
                    <Switch v-model="showGrain" />
                    <span class="text-sm">grain</span>
                </Label>
            </div>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    v-for="t in tiers"
                    :key="t.tier"
                    :tier="t.tier"
                    :shadow="showShadow"
                    :grain="showGrain"
                >
                    <CardHeader>
                        <CardTitle class="text-lg">{{ t.title }}</CardTitle>
                        <CardDescription>{{ t.blurb }}</CardDescription>
                    </CardHeader>
                    <CardContent class="text-sm text-muted-foreground">
                        Surface alpha {{ t.alpha }}. The tier prop is the only
                        knob the consumer touches; the class merge happens at
                        the single
                        <code class="font-mono text-xs"
                            >cn(`glass-{{ "${tier}" }}`, props.class)</code
                        >
                        seam in Card.vue.
                    </CardContent>
                </Card>
            </div>
        </section>

        <!-- Polymorphic root. -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">polymorphic root via reka-ui Primitive</p>
                <p class="text-sm text-muted-foreground">
                    The <code class="font-mono text-xs">as</code> prop swaps the
                    rendered tag without losing the surface composition. Useful
                    when semantic HTML matters — a results card is a
                    <code class="font-mono text-xs">&lt;section&gt;</code>, a
                    feed item is an
                    <code class="font-mono text-xs">&lt;article&gt;</code>.
                </p>
            </header>

            <Card as="article" tier="resting">
                <CardHeader>
                    <CardTitle class="text-lg">
                        Card rendered as &lt;article&gt;
                    </CardTitle>
                    <CardDescription>
                        Inspect the DOM — the root tag is
                        <code class="font-mono text-xs">article</code>, not the
                        default <code class="font-mono text-xs">div</code>.
                    </CardDescription>
                </CardHeader>
                <CardContent class="text-sm text-muted-foreground">
                    Reka-ui's Primitive forwards every attribute, so semantic
                    HTML composition stays elegant.
                </CardContent>
                <CardFooter class="justify-end gap-2">
                    <Button variant="ghost" size="sm">Dismiss</Button>
                    <Button size="sm">Continue</Button>
                </CardFooter>
            </Card>
        </section>

        <!-- Nested-card pattern (shadow off on the inner card). -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">nested cards — shadow toggle</p>
                <p class="text-sm text-muted-foreground">
                    Pass <code class="font-mono text-xs">:shadow="false"</code>
                    on a nested card to drop the second drop-shadow stacking
                    on the parent's. The grain overlay can also be silenced
                    with <code class="font-mono text-xs">:grain="false"</code>.
                </p>
            </header>

            <Card tier="resting">
                <CardHeader>
                    <CardTitle class="text-lg">Outer plate</CardTitle>
                    <CardDescription>
                        Parent at the resting tier with its full shadow.
                    </CardDescription>
                </CardHeader>
                <CardContent class="grid gap-4">
                    <Card tier="wash" :shadow="false" class="p-4 text-sm">
                        <span
                            class="font-mono text-xs text-muted-foreground"
                        >
                            inner: tier=wash, shadow=false
                        </span>
                        <p class="mt-2 text-muted-foreground">
                            No second drop-shadow stacking; reads as a quiet
                            inset rather than a floating element.
                        </p>
                    </Card>
                </CardContent>
            </Card>
        </section>
    </StoryPage>
</template>
