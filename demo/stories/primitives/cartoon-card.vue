<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { CartoonCard } from "@/components/ui/cartoon-card";
import { Button } from "@/components/ui/button";

interface Accent {
    id: string;
    label: string;
    color: string;
    blurb: string;
}

const accents: Accent[] = [
    {
        id: "rose",
        label: "Rose §0",
        color: "var(--section-color-0)",
        blurb: "Memphis-leaning rose accent, cartoon offset stamp.",
    },
    {
        id: "amber",
        label: "Amber §5",
        color: "var(--section-color-5)",
        blurb: "Warm-spectrum accent against the cartoon shadow.",
    },
    {
        id: "teal",
        label: "Teal §3",
        color: "var(--section-color-3)",
        blurb: "Cool-spectrum accent; same offset, different tint.",
    },
];
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">cartoon card — replaces &lt;Card variant="cartoon"&gt;</p>
                <p class="text-sm text-muted-foreground">
                    Cartoon-register surface that resolves through the
                    <code class="font-mono text-xs">.glass-cartoon</code>
                    utility — 2px border, offset-stamp shadow via
                    <code class="font-mono text-xs">--shadow-cartoon</code>,
                    hover-lift transition. Lives off the wash → overlay
                    ladder by design.
                </p>
            </header>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <CartoonCard
                    v-for="a in accents"
                    :key="a.id"
                    class="p-6"
                    :style="{ borderColor: a.color }"
                >
                    <h3 class="text-lg font-semibold">{{ a.label }}</h3>
                    <p class="mt-2 text-sm text-muted-foreground">
                        {{ a.blurb }}
                    </p>
                    <p class="mt-4 text-xs text-muted-foreground">
                        Hover to confirm the lift transition: shadow swaps from
                        <code class="font-mono">--shadow-cartoon-md</code> to
                        <code class="font-mono">--shadow-cartoon-lg</code>.
                    </p>
                </CartoonCard>
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">interactive composition</p>
                <p class="text-sm text-muted-foreground">
                    The cartoon register pairs with the cartoon-shadow Button
                    family. Both share the same offset-stamp grammar.
                </p>
            </header>

            <CartoonCard class="flex flex-col gap-4 p-6">
                <h3 class="text-lg font-semibold">Set a target</h3>
                <p class="text-sm text-muted-foreground">
                    Cartoon-register host with cartoon-register controls. The
                    surface and the buttons rest in the same shadow grammar.
                </p>
                <div class="flex flex-wrap gap-3">
                    <Button>Save target</Button>
                    <Button variant="outline">Discard</Button>
                </div>
            </CartoonCard>
        </section>

        <section class="flex flex-col gap-4">
            <header class="flex flex-col gap-1">
                <p class="section-label">polymorphic root</p>
                <p class="text-sm text-muted-foreground">
                    Like Card and ScrollPane, CartoonCard accepts an
                    <code class="font-mono text-xs">as</code> prop for semantic
                    HTML. Render as <code class="font-mono text-xs">&lt;article&gt;</code>
                    when the surface holds a self-contained item.
                </p>
            </header>

            <CartoonCard as="article" class="p-6">
                <h3 class="text-lg font-semibold">Article-shaped cartoon</h3>
                <p class="mt-2 text-sm text-muted-foreground">
                    The root tag is
                    <code class="font-mono text-xs">article</code>; the cartoon
                    surface sits unchanged on top.
                </p>
            </CartoonCard>
        </section>
    </StoryPage>
</template>
