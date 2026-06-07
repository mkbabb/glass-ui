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
    CardAction,
    type CardTier,
} from "../../../src/components/ui/card";
import { Button } from "../../../src/components/ui/button";
import { Switch } from "../../../src/components/ui/switch";
import { Label } from "../../../src/components/ui/label";
// W12 — stage the tier matrix + shadow/grain toggles over a shipped
// high-frequency backdrop (Aurora) so the tier-alpha steps (0.30→0.95) and the
// shadow-on/off differential become perceptible against busy color.
import { Aurora, DEFAULT_AURORA_CONFIG } from "../../../src/subpaths/aurora";

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

// Scroll-pane recipe — the retired <ScrollPane> was field-for-field
// `<Card tier="wash" :grain="false">` + `overflow-auto`. `tabindex="0"` makes
// the scrollbar-hidden overflow region keyboard-scrollable (ScrollPane shipped
// without it — a latent a11y regression the recipe fixes).
const longList = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Result row ${i + 1}`,
    blurb: [
        "Sample sequence with timing, throughput, and a short trailing note.",
        "Mid-window row to confirm the scroll affordance picks up.",
        "Trailing item — verify the bottom edge of the scroll region is clean.",
    ][i % 3],
}));

// Cartoon surface — the retired <CartoonCard> was `tier="quiet"` carrying the
// cartoon decoration. `surface="cartoon"` reattaches the 2px border, the
// offset-stamp shadow, and the hover-lift; it is orthogonal to tier/shadow/grain.
const cartoonAccents = [
    { id: "rose", label: "Rose §0", color: "var(--section-color-0)" },
    { id: "amber", label: "Amber §5", color: "var(--section-color-5)" },
    { id: "teal", label: "Teal §3", color: "var(--section-color-3)" },
];
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

            <!-- W12 — the tier matrix stages over a shipped Aurora backdrop so
                 the 0.30→0.95 tier-alpha steps + the shadow on/off differential
                 read against busy color (the toggles already function; this
                 closes the perception gap). -->
            <div class="relative overflow-hidden rounded-card">
                <Aurora :config="DEFAULT_AURORA_CONFIG" class="absolute inset-0" />
                <div class="relative z-10 grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
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

        <!-- Cartoon surface — orthogonal `surface` decoration. -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">surface — the cartoon decoration</p>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">surface="cartoon"</code> is
                    orthogonal to <code class="font-mono text-xs">tier</code> —
                    exactly like <code class="font-mono text-xs">shadow</code>
                    and <code class="font-mono text-xs">grain</code>. It layers
                    the <code class="font-mono text-xs">cartoon-surface</code>
                    decoration utility (2px border, offset-stamp shadow,
                    hover-lift) on top of whatever tier resolved. It replaces
                    the retired standalone
                    <code class="font-mono text-xs">&lt;CartoonCard&gt;</code>.
                </p>
            </header>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    v-for="a in cartoonAccents"
                    :key="a.id"
                    tier="quiet"
                    surface="cartoon"
                    class="p-6"
                    :style="{ borderColor: a.color }"
                >
                    <h3 class="text-lg font-semibold">{{ a.label }}</h3>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Hover to confirm the lift transition: shadow swaps from
                        <code class="font-mono text-xs">--shadow-cartoon-md</code>
                        to
                        <code class="font-mono text-xs">--shadow-cartoon-lg</code>.
                    </p>
                </Card>
            </div>

            <Card surface="cartoon" class="flex flex-col gap-4 p-6">
                <CardHeader class="p-0">
                    <CardTitle class="text-lg">Set a target</CardTitle>
                    <CardDescription>
                        Default tier (<code class="font-mono text-xs"
                            >resting</code
                        >) with the cartoon decoration — proof that
                        <code class="font-mono text-xs">surface</code> composes
                        onto any tier, not just <code class="font-mono text-xs">quiet</code>.
                    </CardDescription>
                </CardHeader>
                <div class="flex flex-wrap gap-3">
                    <Button>Save target</Button>
                    <Button variant="outline">Discard</Button>
                </div>
            </Card>
        </section>

        <!-- Scroll-pane recipe — wash tier + grain off + overflow + tabindex. -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">recipe — scroll-pane surface</p>
                <p class="text-sm text-muted-foreground">
                    The retired <code class="font-mono text-xs"
                        >&lt;ScrollPane&gt;</code
                    >
                    was field-for-field
                    <code class="font-mono text-xs"
                        >&lt;Card tier="wash" :grain="false"&gt;</code
                    >
                    plus <code class="font-mono text-xs">overflow-auto</code>.
                    No new component — it is a Card configuration. Card already
                    emits <code class="font-mono text-xs">scrollbar-hidden</code>;
                    <code class="font-mono text-xs">tabindex="0"</code> makes the
                    hidden-scrollbar region keyboard-scrollable (the standalone
                    component shipped without it — a latent a11y regression this
                    recipe fixes).
                </p>
            </header>

            <Card
                tier="wash"
                :grain="false"
                tabindex="0"
                class="overflow-auto max-h-80 p-4"
            >
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
            </Card>

            <Card tier="resting">
                <CardHeader>
                    <CardTitle class="text-lg">Nested scroll region</CardTitle>
                    <CardDescription>
                        A scroll-pane recipe inside a host card drops its own
                        shadow with
                        <code class="font-mono text-xs">:shadow="false"</code>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Card
                        tier="wash"
                        :grain="false"
                        :shadow="false"
                        tabindex="0"
                        class="overflow-auto max-h-64 p-4"
                    >
                        <div class="flex flex-col gap-2 text-sm">
                            <p
                                v-for="row in longList.slice(0, 12)"
                                :key="row.id"
                                class="flex justify-between"
                            >
                                <span>{{ row.title }}</span>
                                <span class="text-muted-foreground">
                                    {{ (row.id * 37.4).toFixed(1) }} Mbps
                                </span>
                            </p>
                        </div>
                    </Card>
                </CardContent>
            </Card>
        </section>

        <!-- CardAction — the shadcn-2025 top-right header action slot. -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">CardAction — header action slot</p>
                <p class="text-sm text-muted-foreground">
                    A <code class="font-mono text-xs">&lt;CardAction&gt;</code>
                    inside a <code class="font-mono text-xs">&lt;CardHeader&gt;</code>
                    reflows the header to a two-column grid (title/description +
                    action), self-aligned to the header's top-right via the
                    <code class="font-mono text-xs">has-data-[slot=card-action]</code>
                    container query.
                </p>
            </header>

            <Card tier="resting">
                <CardHeader>
                    <CardTitle class="text-lg">Monthly report</CardTitle>
                    <CardDescription>
                        Throughput, latency, and loss for the trailing 30 days.
                    </CardDescription>
                    <CardAction>
                        <Button variant="outline" size="sm">Export</Button>
                    </CardAction>
                </CardHeader>
                <CardContent class="text-sm text-muted-foreground">
                    The action column self-aligns to the start of the header's
                    first two rows, justified to the end — no manual grid markup.
                </CardContent>
            </Card>
        </section>
    </StoryPage>
</template>
