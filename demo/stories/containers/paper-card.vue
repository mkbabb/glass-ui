<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Card } from "@/components/ui/card";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";

interface Tier {
    cls: string;
    label: string;
    eyebrow: string;
    note: string;
    accent: string;
}

const tiers: Tier[] = [
    {
        cls: "paper-1",
        label: "paper-1",
        eyebrow: "§ tier 1",
        note: "softest — drafts, in-progress notes, scratch work",
        accent: "var(--section-color-0)",
    },
    {
        cls: "paper-2",
        label: "paper-2",
        eyebrow: "§ tier 2",
        note: "default — body content, articles, definitions",
        accent: "var(--section-color-3)",
    },
    {
        cls: "paper-3",
        label: "paper-3",
        eyebrow: "§ tier 3",
        note: "elevated — featured callouts, etymology blocks",
        accent: "var(--section-color-6)",
    },
    {
        cls: "paper-4",
        label: "paper-4",
        eyebrow: "§ tier 4",
        note: "hardest — printed plates, formal evidence",
        accent: "var(--section-color-9)",
    },
];
</script>

<template>
    <StoryPage>
        <!-- Card variant="paper" hero -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Card variant="paper"</p>
            <Card variant="paper">
                <DisplayHero
                    size="display-mega"
                    variation="wonk"
                    :style="{ color: 'var(--section-color-2)' }"
                    class="mb-[var(--space-phi-2)]"
                >
                    Paper
                </DisplayHero>
                <p class="text-prose-lettrine text-foreground/80">
                    Paper is the sibling tier to glass — no backdrop-filter, no translucency, just
                    pulped fiber rendered through the same SVG turbulence overlay that already
                    underpaints every glass surface. Where glass borrows from the world behind it,
                    paper says <em>read me here</em>. Body text, etymologies, formula derivations and
                    code listings settle into a paper card and stop competing with the chrome.
                </p>
                <div class="paper-rule" />
                <p class="text-mono-caption text-muted-foreground">
                    <code class="fira-code">.paper-rule</code> · tapered hairline at φ-spacing
                </p>
            </Card>
        </section>

        <!-- Tier ladder — paper-1..4 -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Tier ladder · paper-1 → paper-4</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-2 xl:grid-cols-4">
                <div
                    v-for="tier in tiers"
                    :key="tier.cls"
                    :class="[tier.cls, 'p-[var(--space-phi-3)]']"
                >
                    <p
                        class="text-mono-caption uppercase tracking-wider"
                        :style="{ color: tier.accent }"
                    >
                        {{ tier.eyebrow }}
                    </p>
                    <p
                        class="text-display-2 mt-[var(--space-phi-1)] mb-[var(--space-phi-2)]"
                        :style="{ color: tier.accent }"
                    >
                        {{ tier.label }}
                    </p>
                    <FlourishDivider
                        tone="section-3"
                        class="my-[var(--space-phi-2)]"
                    />
                    <p class="text-small text-foreground/75">{{ tier.note }}</p>
                </div>
            </div>
        </section>

        <!-- Lined-paper variation: .paper-rule between sections -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Card variant="paper" · ruled (paper-rule)</p>
            <Card variant="paper">
                <h3
                    class="text-display-2"
                    :style="{ color: 'var(--section-color-7)' }"
                >
                    Section i — On bounded variation
                </h3>
                <p class="text-prose mt-[var(--space-phi-2)] text-foreground/80">
                    The Dirichlet–Jordan criterion guarantees pointwise convergence of the Fourier
                    partial sums at each point of bounded variation, with the value taken to be the
                    average of the one-sided limits.
                </p>
                <div class="paper-rule" />
                <h3
                    class="text-display-2"
                    :style="{ color: 'var(--section-color-7)' }"
                >
                    Section ii — On the lemma
                </h3>
                <p class="text-prose mt-[var(--space-phi-2)] text-foreground/80">
                    Let <code class="fira-code">f</code> be of bounded variation on a neighborhood of
                    <code class="fira-code">x</code>. Then the Cesàro means of
                    <code class="fira-code">Sₙ(x)</code> converge to the average — uniformly on
                    closed intervals of continuity.
                </p>
                <div class="paper-rule" />
                <h3
                    class="text-display-2"
                    :style="{ color: 'var(--section-color-7)' }"
                >
                    Section iii — On the next page
                </h3>
                <p class="text-prose mt-[var(--space-phi-2)] text-foreground/80">
                    Each <code class="fira-code">.paper-rule</code> tapers gradient-style at the
                    margins, mimicking the way a fountain pen presses harder mid-stroke than at the
                    endpoints. Lined-paper that breathes.
                </p>
            </Card>
        </section>
    </StoryPage>
</template>

<style scoped>
.paper-rule {
    height: 1px;
    background: linear-gradient(
        to right,
        transparent 5%,
        color-mix(in srgb, var(--foreground) 14%, transparent) 18%,
        color-mix(in srgb, var(--foreground) 14%, transparent) 82%,
        transparent 95%
    );
    margin-block: var(--space-phi-2);
}
</style>
