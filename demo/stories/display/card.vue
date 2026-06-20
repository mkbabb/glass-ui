<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import Code from "../Code.vue";
import CodeBlock from "../CodeBlock.vue";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardAction,
    ScrollCard,
    ScrollCardHeader,
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
    { id: "rose", label: "Rose", color: "var(--section-color-0)" },
    { id: "amber", label: "Amber", color: "var(--section-color-5)" },
    { id: "teal", label: "Teal", color: "var(--section-color-3)" },
];

// R5-7 — the veil text plate. `surface="veil"` paints a borderless/rimless
// translucent glass plate over a busy backdrop as a LOCAL text-legibility
// surface. The `--veil-feather` toggle opts the soft radial edge fade in.
const veilFeather = ref(false);

// The Card import snippet — the explicit subpath, rendered as a real, copy-able
// <CodeBlock> (the per-page import idiom; the code is a literal, not prose).
const importSnippet = `import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
} from "@mkbabb/glass-ui/card";`;

// The scroll-pane recipe rendered as a real, copy-able <CodeBlock> — the
// retired <ScrollPane> is field-for-field this Card configuration.
const scrollPaneRecipe = `<Card
  tier="wash"
  :grain="false"
  tabindex="0"
  class="overflow-auto max-h-80"
>
  <!-- scroll content -->
</Card>`;
</script>

<template>
    <StoryPage>
        <!-- Five-rung tier ladder. -->
        <StorySection heading="tiers — wash → overlay" gap="lg"><p class="text-sm text-muted-foreground">
                    The R3-spec ladder. Each rung names a class on the
                    <Code>.glass-{tier}</Code> surface family;
                    the Card primitive maps the
                    <Code>tier</Code> prop straight through to
                    the class. Default is
                    <Code>resting</Code>.
                </p>

            <!-- The explicit import subpath, as a real copy-able code block. -->
            <CodeBlock lang="ts" :code="importSnippet" />

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
                            <CardTitle class="text-lg font-semibold">{{
                                t.title
                            }}</CardTitle>
                            <CardDescription>{{ t.blurb }}</CardDescription>
                        </CardHeader>
                        <CardContent class="text-sm text-muted-foreground">
                            Surface alpha {{ t.alpha }}. The tier prop is the only knob
                            the consumer touches; the class merge happens at the single
                            <Code>cn(`glass-{{ "${tier}" }}`, props.class)</Code>
                            seam in Card.vue.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </StorySection>

        <!-- Polymorphic root. -->
        <StorySection heading="polymorphic root via reka-ui Primitive" gap="lg"><p class="text-sm text-muted-foreground">
                    The <Code>as</Code> prop swaps the
                    rendered tag without losing the surface composition. Useful when
                    semantic HTML matters — a results card is a
                    <Code>&lt;section&gt;</Code>, a feed item
                    is an <Code>&lt;article&gt;</Code>.
                </p>

            <Card as="article" tier="resting">
                <CardHeader>
                    <CardTitle class="text-lg font-semibold">
                        Card rendered as &lt;article&gt;
                    </CardTitle>
                    <CardDescription>
                        Inspect the DOM — the root tag is
                        <Code>article</Code>, not the default
                        <Code>div</Code>.
                    </CardDescription>
                </CardHeader>
                <CardContent class="text-sm text-muted-foreground">
                    Reka-ui's Primitive forwards every attribute, so semantic HTML
                    composition stays elegant.
                </CardContent>
                <CardFooter class="justify-end gap-2">
                    <Button variant="ghost" size="sm">Dismiss</Button>
                    <Button size="sm">Continue</Button>
                </CardFooter>
            </Card>
        </StorySection>

        <!-- Nested-card pattern (shadow off on the inner card). -->
        <StorySection heading="nested cards — shadow toggle" gap="lg"><p class="text-sm text-muted-foreground">
                    Pass <Code>:shadow="false"</Code> on a
                    nested card to drop the second drop-shadow stacking on the parent's.
                    The grain overlay can also be silenced with
                    <Code>:grain="false"</Code>.
                </p>

            <Card tier="resting">
                <CardHeader>
                    <CardTitle class="text-lg font-semibold">Outer plate</CardTitle>
                    <CardDescription>
                        Parent at the resting tier with its full shadow.
                    </CardDescription>
                </CardHeader>
                <CardContent class="grid gap-4">
                    <Card tier="wash" :shadow="false" class="text-sm">
                        <Code>inner: tier=wash, shadow=false</Code>
                        <p class="mt-2 text-muted-foreground">
                            No second drop-shadow stacking; reads as a quiet inset
                            rather than a floating element.
                        </p>
                    </Card>
                </CardContent>
            </Card>
        </StorySection>

        <!-- Cartoon surface — orthogonal `surface` decoration. -->
        <StorySection heading="surface — the cartoon decoration" gap="lg"><p class="text-sm text-muted-foreground">
                    <Code>surface="cartoon"</Code> is
                    orthogonal to <Code>tier</Code> — exactly
                    like <Code>shadow</Code> and
                    <Code>grain</Code>. It layers the
                    <Code>cartoon-surface</Code>
                    decoration utility (2px border, offset-stamp shadow, hover-lift) on
                    top of whatever tier resolved. It replaces the retired standalone
                    <Code>&lt;CartoonCard&gt;</Code>.
                </p>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    v-for="a in cartoonAccents"
                    :key="a.id"
                    tier="quiet"
                    surface="cartoon"
                    class="p-(--card-pad-inline)"
                    :style="{ borderColor: a.color }"
                >
                    <h3 class="text-lg font-semibold">{{ a.label }}</h3>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Hover to confirm the lift transition: shadow swaps from
                        <Code>--shadow-cartoon-md</Code>
                        to
                        <Code>--shadow-cartoon-lg</Code>.
                    </p>
                </Card>
            </div>

            <Card surface="cartoon" class="flex flex-col gap-4 p-(--card-pad-inline)">
                <CardHeader>
                    <CardTitle class="text-lg font-semibold">Set a target</CardTitle>
                    <CardDescription>
                        Default tier (<Code>resting</Code>)
                        with the cartoon decoration — proof that
                        <Code>surface</Code> composes onto any
                        tier, not just <Code>quiet</Code>.
                    </CardDescription>
                </CardHeader>
                <div class="flex flex-wrap gap-3">
                    <Button>Save target</Button>
                    <Button variant="outline">Discard</Button>
                </div>
            </Card>
        </StorySection>

        <!-- Veil surface — the borderless/rimless text-legibility plate. -->
        <StorySection heading="surface — the veil text plate" gap="lg"><p class="text-sm text-muted-foreground">
                    <Code>surface="veil"</Code> is the
                    text-legibility PLATE register — the wash/quiet glass fill + blur
                    with the <Code>border</Code> AND
                    rim/highlight STRIPPED (the boxed look reads as a "dividing line" on
                    a text plate). Conceptually the W55 adaptive-tint applied as a LOCAL
                    plate: it darkens content-on-glass over a busy/bright backdrop so
                    text clears AA, without the box. The optional
                    <Code>--veil-feather</Code> radial fades
                    the plate edges into the page.
                </p>

            <div class="flex flex-wrap items-center gap-6">
                <Label class="flex items-center gap-2">
                    <Switch v-model="veilFeather" />
                    <span class="text-sm">--veil-feather (radial edge fade)</span>
                </Label>
            </div>

            <!-- Both veil consumers stage over the same busy Aurora backdrop —
                 the canonical case the plate exists for: legible text over a
                 high-frequency color field, no box. -->
            <div class="relative overflow-hidden rounded-card">
                <Aurora :config="DEFAULT_AURORA_CONFIG" class="absolute inset-0" />
                <div class="relative z-10 flex flex-col gap-6 p-10 sm:p-16">
                    <!-- Site 1 — the HERO text plate over the busy substrate. -->
                    <Card
                        surface="veil"
                        tier="quiet"
                        :grain="false"
                        class="max-w-2xl p-(--card-pad-block)"
                        :style="
                            veilFeather
                                ? { '--veil-feather': 'var(--veil-feather-radial)' }
                                : undefined
                        "
                    >
                        <p class="section-label">hero plate</p>
                        <h2 class="mt-2 text-3xl font-semibold tracking-tight">
                            Legible over anything.
                        </h2>
                        <p class="mt-3 text-base text-muted-foreground">
                            A veil plate is the local-legibility move: the glass darkens
                            toward ink over the bright aurora behind it so this
                            standfirst clears contrast, but no border or rim boxes the
                            text in. Toggle the feather to fade the plate into the
                            field.
                        </p>
                    </Card>

                    <!-- Site 2 — a befitting closer lede plate (a second
                         consumer context — the deck's closer lede shape). -->
                    <Card
                        surface="veil"
                        tier="wash"
                        :grain="false"
                        class="max-w-md self-end p-(--card-pad-inline) text-right"
                        :style="
                            veilFeather
                                ? { '--veil-feather': 'var(--veil-feather-radial)' }
                                : undefined
                        "
                    >
                        <p class="text-lg font-medium">One knob over the page.</p>
                        <p class="mt-2 text-sm text-muted-foreground">
                            The wash rung reads even quieter — a whisper-plate for a
                            closing lede that must stay readable without pulling focus
                            from the backdrop.
                        </p>
                    </Card>
                </div>
            </div>
        </StorySection>

        <!-- Scroll-pane recipe — wash tier + grain off + overflow + tabindex. -->
        <StorySection heading="recipe — scroll-pane surface" gap="lg"><p class="text-sm text-muted-foreground">
                    The retired
                    <Code>&lt;ScrollPane&gt;</Code>
                    was field-for-field
                    <Code>&lt;Card tier="wash" :grain="false"&gt;</Code>
                    plus <Code>overflow-auto</Code>. No new
                    component — it is a Card configuration. Card already emits
                    <Code>scrollbar-hidden</Code>;
                    <Code>tabindex="0"</Code> makes the
                    hidden-scrollbar region keyboard-scrollable (the standalone
                    component shipped without it — a latent a11y regression this recipe
                    fixes).
                </p>

            <!-- The scroll-pane recipe as a real, copy-able code block. -->
            <CodeBlock lang="vue" :code="scrollPaneRecipe" />

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
                        <span class="text-mono-small tabular-nums text-muted-foreground">
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
                    <CardTitle class="text-lg font-semibold"
                        >Nested scroll region</CardTitle
                    >
                    <CardDescription>
                        A scroll-pane recipe inside a host card drops its own shadow
                        with
                        <Code>:shadow="false"</Code>.
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
        </StorySection>

        <!-- Scroll-shrink choreography — the compositor-safe header collapse. -->
        <StorySection
            heading="recipe — scroll-shrink header"
            gap="lg"
            data-testid="card-shrink-section"
        >
            <p class="text-sm text-muted-foreground">
                    <Code>&lt;CardHeader shrink&gt;</Code>
                    binds the header to the
                    <Code>--card-scroll</Code> named
                    scroll-timeline (emitted by
                    <Code>.card-scroll-host</Code> on the
                    scroll-overflow ancestor) and runs a 3-lane choreography as the host
                    scrolls — the header content compresses, the title shrinks in place,
                    the description retires. The lanes are COMPOSITOR-SAFE
                    (transform/opacity only), so ZERO reflow fires per scroll frame (no
                    layout-shift). Scroll the region to watch the header collapse.
                </p>

            <Card
                tier="resting"
                tabindex="0"
                class="card-scroll-host overflow-auto max-h-72 p-0"
                data-testid="card-shrink-host"
            >
                <CardHeader
                    shrink
                    class="sticky top-0 z-10 backdrop-blur-md px-(--card-pad-inline) pt-(--card-pad-block) pb-0"
                    data-testid="card-shrink-header"
                >
                    <CardTitle
                        class="font-semibold"
                        data-testid="card-shrink-title"
                    >
                        Scroll to compress
                    </CardTitle>
                    <CardDescription data-testid="card-shrink-desc">
                        This description fades + retires across the first 80px of scroll,
                        faster than the header settles.
                    </CardDescription>
                </CardHeader>
                <CardContent class="flex flex-col gap-3 text-sm">
                    <p
                        v-for="row in longList"
                        :key="row.id"
                        class="flex items-baseline justify-between gap-4 border-b border-border/40 pb-3 last:border-0"
                    >
                        <span class="text-mono-small tabular-nums text-muted-foreground">
                            #{{ row.id.toString().padStart(2, "0") }}
                        </span>
                        <span class="flex-1">{{ row.title }}</span>
                    </p>
                </CardContent>
            </Card>
        </StorySection>

        <!-- ScrollCard — the first-class scroll-shrink card family. -->
        <StorySection
            heading="recipe — &lt;ScrollCard&gt; family"
            gap="lg"
            data-testid="scroll-card-section"
        >
            <p class="text-sm text-muted-foreground">
                    <Code>&lt;ScrollCard&gt;</Code> owns the
                    <Code>.card-scroll-host</Code> scroll-port
                    + the <Code>--card-scroll</Code> timeline
                    internally, and
                    <Code>&lt;ScrollCardHeader&gt;</Code> is
                    the LARGER-header-items hero-rung header that shrinks on scroll via
                    the SAME compositor-safe lanes — ZERO consumer rAF/scroll-listener.
                    The header background lifts transparent → painted as it sticks.
                </p>

            <ScrollCard
                max-height="18rem"
                data-testid="scroll-card-host"
            >
                <ScrollCardHeader data-testid="scroll-card-header">
                    <CardTitle
                        class="font-semibold"
                        data-testid="scroll-card-title"
                    >
                        Larger header, shrinks on scroll
                    </CardTitle>
                    <CardDescription data-testid="scroll-card-desc">
                        The hero-rung title shrinks in place as the card scrolls; the
                        description retires faster. First-class, no hand-rolled host.
                    </CardDescription>
                </ScrollCardHeader>
                <CardContent class="flex flex-col gap-3 text-sm">
                    <p
                        v-for="row in longList"
                        :key="row.id"
                        class="flex items-baseline justify-between gap-4 border-b border-border/40 pb-3 last:border-0"
                    >
                        <span class="text-mono-small tabular-nums text-muted-foreground">
                            #{{ row.id.toString().padStart(2, "0") }}
                        </span>
                        <span class="flex-1">{{ row.title }}</span>
                    </p>
                </CardContent>
            </ScrollCard>
        </StorySection>

        <!-- CardAction — the shadcn-2025 top-right header action slot. -->
        <StorySection heading="CardAction — header action slot" gap="lg"><p class="text-sm text-muted-foreground">
                    A <Code>&lt;CardAction&gt;</Code> inside a
                    <Code>&lt;CardHeader&gt;</Code>
                    reflows the header to a two-column grid (title/description +
                    action), self-aligned to the header's top-right via the
                    <Code>has-data-[slot=card-action]</Code>
                    container query.
                </p>

            <Card tier="resting">
                <CardHeader>
                    <CardTitle class="text-lg font-semibold">Monthly report</CardTitle>
                    <CardDescription>
                        Throughput, latency, and loss for the trailing 30 days.
                    </CardDescription>
                    <CardAction>
                        <Button variant="outline" size="sm">Export</Button>
                    </CardAction>
                </CardHeader>
                <CardContent class="text-sm text-muted-foreground">
                    The action column self-aligns to the start of the header's first two
                    rows, justified to the end — no manual grid markup.
                </CardContent>
            </Card>
        </StorySection>
    </StoryPage>
</template>
