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
    { id: "rose", label: "Rose §0", color: "var(--section-color-0)" },
    { id: "amber", label: "Amber §5", color: "var(--section-color-5)" },
    { id: "teal", label: "Teal §3", color: "var(--section-color-3)" },
];

// R5-7 — the veil text plate. `surface="veil"` paints a borderless/rimless
// translucent glass plate over a busy backdrop as a LOCAL text-legibility
// surface. The `--veil-feather` toggle opts the soft radial edge fade in.
const veilFeather = ref(false);
</script>

<template>
    <StoryPage>
        <!-- Five-rung tier ladder. -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <h2 class="text-subheading">tiers — wash → overlay</h2>
                <p class="text-sm text-muted-foreground">
                    The R3-spec ladder. Each rung names a class on the
                    <code class="font-mono text-xs">.glass-{tier}</code> surface family;
                    the Card primitive maps the
                    <code class="font-mono text-xs">tier</code> prop straight through to
                    the class. Default is
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
                            <CardTitle class="text-lg font-semibold">{{
                                t.title
                            }}</CardTitle>
                            <CardDescription>{{ t.blurb }}</CardDescription>
                        </CardHeader>
                        <CardContent class="text-sm text-muted-foreground">
                            Surface alpha {{ t.alpha }}. The tier prop is the only knob
                            the consumer touches; the class merge happens at the single
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
                <h2 class="text-subheading">polymorphic root via reka-ui Primitive</h2>
                <p class="text-sm text-muted-foreground">
                    The <code class="font-mono text-xs">as</code> prop swaps the
                    rendered tag without losing the surface composition. Useful when
                    semantic HTML matters — a results card is a
                    <code class="font-mono text-xs">&lt;section&gt;</code>, a feed item
                    is an <code class="font-mono text-xs">&lt;article&gt;</code>.
                </p>
            </header>

            <Card as="article" tier="resting">
                <CardHeader>
                    <CardTitle class="text-lg font-semibold">
                        Card rendered as &lt;article&gt;
                    </CardTitle>
                    <CardDescription>
                        Inspect the DOM — the root tag is
                        <code class="font-mono text-xs">article</code>, not the default
                        <code class="font-mono text-xs">div</code>.
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
        </section>

        <!-- Nested-card pattern (shadow off on the inner card). -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <h2 class="text-subheading">nested cards — shadow toggle</h2>
                <p class="text-sm text-muted-foreground">
                    Pass <code class="font-mono text-xs">:shadow="false"</code> on a
                    nested card to drop the second drop-shadow stacking on the parent's.
                    The grain overlay can also be silenced with
                    <code class="font-mono text-xs">:grain="false"</code>.
                </p>
            </header>

            <Card tier="resting">
                <CardHeader>
                    <CardTitle class="text-lg font-semibold">Outer plate</CardTitle>
                    <CardDescription>
                        Parent at the resting tier with its full shadow.
                    </CardDescription>
                </CardHeader>
                <CardContent class="grid gap-4">
                    <Card tier="wash" :shadow="false" class="text-sm">
                        <span class="font-mono text-xs text-muted-foreground">
                            inner: tier=wash, shadow=false
                        </span>
                        <p class="mt-2 text-muted-foreground">
                            No second drop-shadow stacking; reads as a quiet inset
                            rather than a floating element.
                        </p>
                    </Card>
                </CardContent>
            </Card>
        </section>

        <!-- Cartoon surface — orthogonal `surface` decoration. -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <h2 class="text-subheading">surface — the cartoon decoration</h2>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">surface="cartoon"</code> is
                    orthogonal to <code class="font-mono text-xs">tier</code> — exactly
                    like <code class="font-mono text-xs">shadow</code> and
                    <code class="font-mono text-xs">grain</code>. It layers the
                    <code class="font-mono text-xs">cartoon-surface</code>
                    decoration utility (2px border, offset-stamp shadow, hover-lift) on
                    top of whatever tier resolved. It replaces the retired standalone
                    <code class="font-mono text-xs">&lt;CartoonCard&gt;</code>.
                </p>
            </header>

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
                        <code class="font-mono text-xs">--shadow-cartoon-md</code>
                        to
                        <code class="font-mono text-xs">--shadow-cartoon-lg</code>.
                    </p>
                </Card>
            </div>

            <Card surface="cartoon" class="flex flex-col gap-4 p-(--card-pad-inline)">
                <CardHeader>
                    <CardTitle class="text-lg font-semibold">Set a target</CardTitle>
                    <CardDescription>
                        Default tier (<code class="font-mono text-xs">resting</code>)
                        with the cartoon decoration — proof that
                        <code class="font-mono text-xs">surface</code> composes onto any
                        tier, not just <code class="font-mono text-xs">quiet</code>.
                    </CardDescription>
                </CardHeader>
                <div class="flex flex-wrap gap-3">
                    <Button>Save target</Button>
                    <Button variant="outline">Discard</Button>
                </div>
            </Card>
        </section>

        <!-- Veil surface — the borderless/rimless text-legibility plate. -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <h2 class="text-subheading">surface — the veil text plate</h2>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">surface="veil"</code> is the
                    text-legibility PLATE register — the wash/quiet glass fill + blur
                    with the <code class="font-mono text-xs">border</code> AND
                    rim/highlight STRIPPED (the boxed look reads as a "dividing line" on
                    a text plate). Conceptually the W55 adaptive-tint applied as a LOCAL
                    plate: it darkens content-on-glass over a busy/bright backdrop so
                    text clears AA, without the box. The optional
                    <code class="font-mono text-xs">--veil-feather</code> radial fades
                    the plate edges into the page.
                </p>
            </header>

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
        </section>

        <!-- Scroll-pane recipe — wash tier + grain off + overflow + tabindex. -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <h2 class="text-subheading">recipe — scroll-pane surface</h2>
                <p class="text-sm text-muted-foreground">
                    The retired
                    <code class="font-mono text-xs">&lt;ScrollPane&gt;</code>
                    was field-for-field
                    <code class="font-mono text-xs"
                        >&lt;Card tier="wash" :grain="false"&gt;</code
                    >
                    plus <code class="font-mono text-xs">overflow-auto</code>. No new
                    component — it is a Card configuration. Card already emits
                    <code class="font-mono text-xs">scrollbar-hidden</code>;
                    <code class="font-mono text-xs">tabindex="0"</code> makes the
                    hidden-scrollbar region keyboard-scrollable (the standalone
                    component shipped without it — a latent a11y regression this recipe
                    fixes).
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
                    <CardTitle class="text-lg font-semibold"
                        >Nested scroll region</CardTitle
                    >
                    <CardDescription>
                        A scroll-pane recipe inside a host card drops its own shadow
                        with
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

        <!-- Scroll-shrink choreography — the compositor-safe header collapse. -->
        <section class="flex flex-col gap-4" data-testid="card-shrink-section">
            <header class="flex flex-col gap-1">
                <h2 class="text-subheading">recipe — scroll-shrink header</h2>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">&lt;CardHeader shrink&gt;</code>
                    binds the header to the
                    <code class="font-mono text-xs">--card-scroll</code> named
                    scroll-timeline (emitted by
                    <code class="font-mono text-xs">.card-scroll-host</code> on the
                    scroll-overflow ancestor) and runs a 3-lane choreography as the host
                    scrolls — the header content compresses, the title shrinks in place,
                    the description retires. The lanes are COMPOSITOR-SAFE
                    (transform/opacity only — BB.W-CARD-COMPOSITE), so ZERO reflow fires
                    per scroll frame (the A'-3 layout-animation CLS killed). Scroll the
                    region to watch the header collapse.
                </p>
            </header>

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
                        <span class="font-mono text-xs text-muted-foreground">
                            #{{ row.id.toString().padStart(2, "0") }}
                        </span>
                        <span class="flex-1">{{ row.title }}</span>
                    </p>
                </CardContent>
            </Card>
        </section>

        <!-- ScrollCard — the first-class scroll-shrink card family. -->
        <section class="flex flex-col gap-4" data-testid="scroll-card-section">
            <header class="flex flex-col gap-1">
                <h2 class="text-subheading">recipe — &lt;ScrollCard&gt; family</h2>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">&lt;ScrollCard&gt;</code> owns the
                    <code class="font-mono text-xs">.card-scroll-host</code> scroll-port
                    + the <code class="font-mono text-xs">--card-scroll</code> timeline
                    internally, and
                    <code class="font-mono text-xs">&lt;ScrollCardHeader&gt;</code> is
                    the LARGER-header-items hero-rung header that shrinks on scroll via
                    the SAME compositor-safe lanes — ZERO consumer rAF/scroll-listener.
                    The header background lifts transparent → painted as it sticks.
                </p>
            </header>

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
                        <span class="font-mono text-xs text-muted-foreground">
                            #{{ row.id.toString().padStart(2, "0") }}
                        </span>
                        <span class="flex-1">{{ row.title }}</span>
                    </p>
                </CardContent>
            </ScrollCard>
        </section>

        <!-- CardAction — the shadcn-2025 top-right header action slot. -->
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <h2 class="text-subheading">CardAction — header action slot</h2>
                <p class="text-sm text-muted-foreground">
                    A <code class="font-mono text-xs">&lt;CardAction&gt;</code> inside a
                    <code class="font-mono text-xs">&lt;CardHeader&gt;</code>
                    reflows the header to a two-column grid (title/description +
                    action), self-aligned to the header's top-right via the
                    <code class="font-mono text-xs">has-data-[slot=card-action]</code>
                    container query.
                </p>
            </header>

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
        </section>
    </StoryPage>
</template>
