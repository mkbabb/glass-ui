<script setup lang="ts">
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

interface Accent {
    id: string;
    label: string;
    color: string;
}

const accents: Accent[] = [
    { id: "rose", label: "Rose", color: "hsl(8 72% 56%)" },
    { id: "amber", label: "Amber", color: "hsl(38 78% 54%)" },
    { id: "teal", label: "Teal", color: "hsl(178 58% 40%)" },
    { id: "indigo", label: "Indigo", color: "hsl(238 62% 58%)" },
];
</script>

<template>
    <section class="mx-auto max-w-5xl px-8 py-16">
        <header class="mb-12 grid gap-3">
            <p class="font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground">
                Containers · Card
            </p>
            <h1 class="font-display text-5xl leading-tight">Card</h1>
            <p class="max-w-2xl text-lg text-muted-foreground">
                Surface primitive with header, content, and footer slots. Ships four
                flavors — default cartoon, section-accented, flush pane, and a raw
                glass-card utility — all composing the same six subcomponents.
            </p>
        </header>

        <div class="grid gap-12">
            <div class="grid gap-4">
                <h2 class="font-display text-xl">Default</h2>
                <p class="text-sm text-muted-foreground">
                    Cartoon shadow, hover-lift through <code class="font-mono text-xs">transition-shadow</code>.
                </p>
                <div class="grid gap-6 sm:grid-cols-2">
                    <Card class="transition-transform hover:-translate-x-px hover:-translate-y-px">
                        <CardHeader>
                            <CardTitle>Fourier kernel</CardTitle>
                            <CardDescription>
                                Orthonormal basis on the circle.
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="text-sm text-muted-foreground">
                            Every square-integrable function on the circle decomposes
                            into a countable sum of complex exponentials.
                        </CardContent>
                        <CardFooter class="justify-end gap-2">
                            <Button variant="ghost" size="sm">Dismiss</Button>
                            <Button size="sm">Continue</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Chebyshev nodes</CardTitle>
                            <CardDescription>
                                Minimax interpolation points.
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="text-sm text-muted-foreground">
                            Cosine-spaced sample locations that minimize the Runge
                            phenomenon on bounded intervals.
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div class="grid gap-4">
                <h2 class="font-display text-xl">Section-accented</h2>
                <p class="text-sm text-muted-foreground">
                    Left-border colored from a section palette variable. Same default
                    card underneath.
                </p>
                <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card
                        v-for="a in accents"
                        :key="a.id"
                        :style="{ borderLeft: `4px solid ${a.color}` }"
                        :class="cn('pl-4')"
                    >
                        <CardHeader class="pb-2">
                            <CardTitle class="text-base">{{ a.label }}</CardTitle>
                        </CardHeader>
                        <CardContent class="text-xs text-muted-foreground">
                            Section accent rail. Swap the border color via
                            <code class="font-mono">--section-color-N</code>.
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div class="grid gap-4">
                <h2 class="font-display text-xl">Flush pane</h2>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">variant="pane"</code> for inline
                    workspace chrome; <code class="font-mono text-xs">flush</code>
                    drops the surface shadow when nested inside another card.
                </p>
                <Card>
                    <CardHeader>
                        <CardTitle>Host surface</CardTitle>
                    </CardHeader>
                    <CardContent class="grid gap-4">
                        <Card variant="pane" flush class="p-4 text-sm">
                            <span class="font-mono text-xs text-muted-foreground">
                                flush pane — no second shadow
                            </span>
                            <p class="mt-2 text-muted-foreground">
                                Translucent glass background with a subtle border,
                                no double drop-shadow stacking.
                            </p>
                        </Card>
                        <Card variant="pane" class="p-4 text-sm">
                            <span class="font-mono text-xs text-muted-foreground">
                                standard pane — keeps its shadow
                            </span>
                        </Card>
                    </CardContent>
                </Card>
            </div>

            <div class="grid gap-4">
                <h2 class="font-display text-xl">Glass-card utility</h2>
                <p class="text-sm text-muted-foreground">
                    Raw <code class="font-mono text-xs">.glass-card</code> utility —
                    tier-blur + grain overlay without the Vue component scaffold.
                </p>
                <div class="glass-card rounded-2xl p-6">
                    <h3 class="font-display text-lg">Unstructured glass-card</h3>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Use when the six-slot card contract is too rigid — e.g. a
                        hero callout or a free-form composition.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
