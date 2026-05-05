<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Plus, Heart, Bookmark, Trash2, Share2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";

interface SizeRow {
    size: "xs" | "sm" | "default" | "lg" | "icon";
    label: string;
}

// Button CVA exposes xs/sm/default/lg/icon — `default` is the medium rung.
const sizes: SizeRow[] = [
    { size: "xs", label: "xs" },
    { size: "sm", label: "sm" },
    { size: "default", label: "default · md" },
    { size: "lg", label: "lg" },
];

interface AccentCard {
    title: string;
    accent: string;
    section: number;
    body: string;
}

const accentCards: AccentCard[] = [
    {
        title: "Rose carnation",
        accent: "var(--section-color-0)",
        section: 0,
        body: "Cartoon shadow tinted by --cartoon-accent-color. The recipe extends, not replaces, --shadow-cartoon-md.",
    },
    {
        title: "Teal lagoon",
        accent: "var(--section-color-3)",
        section: 3,
        body: "Same chassis, swapped accent — no per-card stylesheet, no @apply forks.",
    },
    {
        title: "Amber meadow",
        accent: "var(--section-color-5)",
        section: 5,
        body: "Tier-aware: cartoon variant lifts on hover by translating -1px and stepping shadow up to -md.",
    },
    {
        title: "Violet eclipse",
        accent: "var(--section-color-7)",
        section: 7,
        body: "The third site clears the gap-29 ≥2 bar — accent-tinted cartoon shadow as a first-class recipe.",
    },
];
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p class="section-label">cartoon controls</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-3">
                Modern skeuo, no bevels.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Cartoon shadow as flourish — a 2px foreground border, cream surface, and
                accent-tinted offset. Press lifts and lowers the shadow rung. No bevel
                vocabulary, no inset/outset twins.
            </p>
            <FlourishDivider tone="gold" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Button cartoon × sizes -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">&lt;Button variant="cartoon"&gt; × sizes</p>
            <div
                class="flex flex-wrap items-end gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <div
                    v-for="row in sizes"
                    :key="row.size"
                    class="flex flex-col items-center gap-2"
                >
                    <Button variant="cartoon" :size="row.size">
                        Save draft
                    </Button>
                    <span class="text-mono-caption text-muted-foreground">
                        {{ row.label }}
                    </span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Button variant="cartoon" size="icon" aria-label="Add">
                        <Plus class="h-5 w-5" :stroke-width="2" />
                    </Button>
                    <span class="text-mono-caption text-muted-foreground">
                        icon
                    </span>
                </div>
            </div>
        </section>

        <!-- Cartoon icon-row, demo accent override -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">accent override · style="--cartoon-accent-color: …"</p>
            <div
                class="flex flex-wrap items-center gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <Button
                    variant="cartoon"
                    size="icon"
                    aria-label="Like"
                    style="--cartoon-accent-color: var(--section-color-0)"
                >
                    <Heart class="h-5 w-5" :stroke-width="2" />
                </Button>
                <Button
                    variant="cartoon"
                    size="icon"
                    aria-label="Bookmark"
                    style="--cartoon-accent-color: var(--section-color-2)"
                >
                    <Bookmark class="h-5 w-5" :stroke-width="2" />
                </Button>
                <Button
                    variant="cartoon"
                    size="icon"
                    aria-label="Share"
                    style="--cartoon-accent-color: var(--section-color-5)"
                >
                    <Share2 class="h-5 w-5" :stroke-width="2" />
                </Button>
                <Button
                    variant="cartoon"
                    size="icon"
                    aria-label="Delete"
                    style="--cartoon-accent-color: var(--section-color-6)"
                >
                    <Trash2 class="h-5 w-5" :stroke-width="2" />
                </Button>
                <span class="text-mono-caption ml-2 text-muted-foreground">
                    Each button overrides <code class="fira-code">--cartoon-accent-color</code> via inline style.
                </span>
            </div>
        </section>

        <!-- Card cartoon, accent-tinted shadow grid -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">&lt;Card variant="cartoon"&gt; · accent-tinted shadow</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-2">
                <Card
                    v-for="c in accentCards"
                    :key="c.title"
                    variant="cartoon"
                    :style="{ '--cartoon-accent-color': c.accent }"
                    class="p-[var(--space-phi-3)] shadow-[var(--shadow-cartoon-accent)] transition-transform hover:-translate-y-px hover:shadow-[var(--shadow-cartoon-md)]"
                >
                    <CardHeader class="flex flex-row items-center gap-3 px-0 pt-0 pb-3">
                        <span
                            class="block h-6 w-6 rounded-full border-2 border-border"
                            :style="{ background: c.accent }"
                        />
                        <CardTitle class="text-display-3">{{ c.title }}</CardTitle>
                    </CardHeader>
                    <CardContent class="px-0">
                        <p class="text-prose text-foreground/80">{{ c.body }}</p>
                        <p class="text-mono-caption mt-3 text-muted-foreground">
                            section-{{ c.section }} · --shadow-cartoon-accent
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>

        <!-- States demo -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">states · standard / hover / active / disabled</p>
            <div
                class="flex flex-wrap gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <div class="flex flex-col items-center gap-2">
                    <Button variant="cartoon">Standard</Button>
                    <span class="text-mono-caption text-muted-foreground">idle</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Button variant="cartoon" class="-translate-y-px shadow-[var(--shadow-cartoon-md)]">
                        Hover
                    </Button>
                    <span class="text-mono-caption text-muted-foreground">hover (forced)</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Button variant="cartoon" class="translate-y-0 shadow-[var(--shadow-cartoon-sm)] scale-[var(--scale-press-btn)]">
                        Pressed
                    </Button>
                    <span class="text-mono-caption text-muted-foreground">active (forced)</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Button variant="cartoon" disabled>Disabled</Button>
                    <span class="text-mono-caption text-muted-foreground">disabled</span>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
