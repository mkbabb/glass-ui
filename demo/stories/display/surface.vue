<script setup lang="ts">
import {
    Surface,
    type SurfaceMaterial,
    type SurfaceProps,
} from "@glass/components/surface";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";

type Decoration = NonNullable<SurfaceProps["surface"]>;

const materials: { value: SurfaceMaterial; tier: string; use: string }[] = [
    { value: "content", tier: "quiet", use: "nested content" },
    { value: "elevated", tier: "resting", use: "primary plate" },
    { value: "functional", tier: "floating", use: "working control" },
    { value: "overlay", tier: "overlay", use: "transient layer" },
];
const decorations: { value: Decoration; use: string }[] = [
    { value: "glass", use: "transmissive default" },
    { value: "veil", use: "quiet separation" },
    { value: "opaque", use: "solid shelter" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="material hierarchy"
            heading="One authority for every plate"
            blurb="Material says what a surface does; Surface resolves its default glass tier while decoration remains orthogonal."
        >
            <ul class="surface-field surface-grid">
                <Surface
                    v-for="material in materials"
                    :key="material.value"
                    as="li"
                    :material="material.value"
                    class="surface-cell"
                >
                    <code>{{ material.value }}</code>
                    <span>{{ material.tier }} · {{ material.use }}</span>
                </Surface>
            </ul>
        </StorySection>

        <StorySection
            label="surface decoration"
            blurb="One resting plate isolates the decoration axis: transmissive glass, quiet veil, or an opaque shelter."
        >
            <ul class="surface-field surface-grid">
                <Surface
                    v-for="decoration in decorations"
                    :key="decoration.value"
                    as="li"
                    material="elevated"
                    :surface="decoration.value"
                    class="surface-cell"
                >
                    <code>{{ decoration.value }}</code>
                    <span>{{ decoration.use }}</span>
                </Surface>
            </ul>
        </StorySection>

        <StorySection
            label="earned facilities"
            blurb="Depth, a tracked highlight, and material grain are independent facilities. Each appears only where it earns its place."
        >
            <ul class="surface-field surface-grid">
                <Surface as="li" deep class="surface-cell">
                    <code>deep</code><span>floating depth</span>
                </Surface>
                <Surface as="li" specular="full" class="surface-cell">
                    <code>specular</code><span>tracked highlight</span>
                </Surface>
                <Surface as="li" grain class="surface-cell">
                    <code>grain</code><span>material texture</span>
                </Surface>
            </ul>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.surface-field {
    margin: 0;
    list-style: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1rem;
    background: radial-gradient(
        ellipse 85% 130% at 48% 44%,
        color-mix(in oklab, var(--section-color-0) 11%, var(--card)),
        color-mix(in oklab, var(--section-color-2) 14%, var(--card)) 52%,
        color-mix(in oklab, var(--section-color-5) 9%, var(--card)) 78%,
        var(--card)
    );
}

.surface-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 0.75rem;
}

.surface-cell span {
    color: var(--muted-foreground);
    font-size: var(--text-caption);
}

.surface-cell {
    display: flex;
    min-height: 6rem;
    min-width: 0;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.2rem;
    padding: 0.75rem;
}

.surface-cell code {
    font-family: var(--font-mono);
    font-size: var(--text-mono-caption);
}
</style>
