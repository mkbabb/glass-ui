<script setup lang="ts">
// Surface Taxonomy — the full (tier × decoration) matrix on the ONE `<Surface>`
// primitive (BI.W-SURFACE-EXTRACT). `<Surface>` is the extracted bare glass plate
// `<Card>` composes: a base glass-ladder tier (wash…overlay) × a decoration
// (glass · veil · opaque, resolved through the ONE `decorationClass` seam),
// plus the `deep`/`shadow`/`grain` axes. This page renders EVERY tier × EVERY
// decoration so the whole surface grammar reads on ONE consumer surface (discharges
// UF-J3: every card variant + the veil card render correctly on the matrix).
//
// The plates sit over a checkerboard reference field so a translucent decoration
// (glass · veil) reads its alpha against a contrasting backing, while the
// `opaque` escape reads solid over the same field. A demo CONSUMER of the shipped
// `<Surface>` primitive — reached via the `@glass/*` → `src/*` demo alias (the
// published subpath is `@mkbabb/glass-ui/surface`), zero library paint.
import { Surface, type SurfaceProps } from "@glass/components/surface";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";

type Tier = NonNullable<SurfaceProps["tier"]>;
type Deco = NonNullable<SurfaceProps["surface"]>;

const tiers: { tier: Tier; hint: string }[] = [
    { tier: "wash", hint: "~0.30α" },
    { tier: "quiet", hint: "~0.50α" },
    { tier: "resting", hint: "~0.65α" },
    { tier: "floating", hint: "~0.80α" },
    { tier: "overlay", hint: "~0.95α" },
];

const decos: { surface: Deco; hint: string }[] = [
    { surface: "glass", hint: "the plain tier rung" },
    { surface: "veil", hint: "borderless text plate" },
    { surface: "opaque", hint: "--glass-level:0 escape" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="tier × decoration matrix"
            heading="One primitive, every surface"
            blurb="Every content/floating surface in the library is a `<Surface>`: a base glass-ladder tier (rows) × a decoration (columns), resolved through the ONE `decorationClass` seam. The translucent decorations (glass · veil) read their alpha over the checkerboard; the `opaque` escape reads solid. `<Card>` is this plate plus its header/content/footer slots and the golden-φ padding ladder — no component composes its own tier×decoration recipe."
        >
            <div class="surface-matrix scroll-cascade">
                <div class="surface-checker">
                    <div class="surface-grid">
                        <template v-for="row in tiers" :key="row.tier">
                            <Surface
                                v-for="col in decos"
                                :key="`${row.tier}-${col.surface}`"
                                :tier="row.tier"
                                :surface="col.surface"
                                class="surface-cell"
                            >
                                <code
                                    class="fira-code text-mono-caption text-foreground"
                                >
                                    {{ col.surface }}
                                </code>
                                <span class="text-mono-caption text-muted-foreground">
                                    {{ row.tier }}
                                </span>
                            </Surface>
                        </template>
                    </div>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="the deep-glass opt-in"
            blurb="`<Surface deep>` (equivalently `<Card deep>`) opts into the maximal iOS-27 register (Apple saturate-1.5 / blur-16px) — the `.glass-deep` decoration on the `floating` base rung. The calm content tiers stay calm; the deep tier is the opt-in for a hero/dock/CTA surface."
        >
            <div class="surface-checker">
                <div class="surface-row">
                    <Surface
                        :tier="'floating'"
                        class="surface-cell surface-cell-wide"
                    >
                        <code class="fira-code text-mono-caption text-foreground">
                            floating
                        </code>
                        <span class="text-mono-caption text-muted-foreground">
                            calm default
                        </span>
                    </Surface>
                    <Surface deep class="surface-cell surface-cell-wide">
                        <code class="fira-code text-mono-caption text-foreground">
                            deep
                        </code>
                        <span class="text-mono-caption text-muted-foreground">
                            saturate-1.5 / blur-16px
                        </span>
                    </Surface>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="the shadow + grain axes"
            blurb="`shadow` rides the drop shadow (`veil` is shadowless by design); `grain` overlays the `::after` paper-grain (off for scroll panes). Both are orthogonal to the tier × decoration axes."
        >
            <div class="surface-checker">
                <div class="surface-row">
                    <Surface shadow class="surface-cell surface-cell-wide">
                        <code class="fira-code text-mono-caption text-foreground">
                            shadow
                        </code>
                        <span class="text-mono-caption text-muted-foreground">
                            --shadow-card
                        </span>
                    </Surface>
                    <Surface grain class="surface-cell surface-cell-wide">
                        <code class="fira-code text-mono-caption text-foreground">
                            grain
                        </code>
                        <span class="text-mono-caption text-muted-foreground">
                            paper-grain ::after
                        </span>
                    </Surface>
                    <Surface
                        :surface="'veil'"
                        class="surface-cell surface-cell-wide"
                    >
                        <code class="fira-code text-mono-caption text-foreground">
                            veil
                        </code>
                        <span class="text-mono-caption text-muted-foreground">
                            rimless · shadowless
                        </span>
                    </Surface>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* The matrix rides a checkerboard reference field so a translucent decoration
   (glass · veil) reads its alpha against a contrasting backing, while the
   `opaque` escape reads solid (the BA.W-STAGE scope-7 translucency-reference idiom,
   the surface-tints.vue precedent). The checker tone steps with --foreground so it
   reads in BOTH modes. */
.surface-checker {
    --checker: color-mix(in srgb, var(--foreground) 12%, transparent);
    border-radius: var(--radius-lg);
    padding: 1.25rem;
    background-color: var(--card);
    background-image:
        linear-gradient(45deg, var(--checker) 25%, transparent 25%),
        linear-gradient(-45deg, var(--checker) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--checker) 75%),
        linear-gradient(-45deg, transparent 75%, var(--checker) 75%);
    background-size: 18px 18px;
    background-position: 0 0, 0 9px, 9px -9px, -9px 0;
    border: 1px solid var(--border);
}

.surface-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.875rem;
}

.surface-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
}

.surface-cell {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 0.125rem;
    min-height: 5.5rem;
    padding: 0.75rem;
    min-width: 0;
}

.surface-cell-wide {
    flex: 1 1 8rem;
}
</style>
