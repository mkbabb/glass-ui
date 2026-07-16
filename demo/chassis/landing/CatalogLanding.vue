<script setup lang="ts">
import { WatercolorDot } from "@glass/components/watercolor-dot";
import StoryHero from "../hero/StoryHero.vue";
import SectionPreviewCard from "./SectionPreviewCard.vue";
import { CATEGORIES, type Category } from "../../stories/manifest";

function identityTile(category: Category) {
    return { kind: "identity" as const, title: category.title };
}
</script>

<template>
    <article class="optical-bench mx-auto w-full max-w-6xl">
        <StoryHero
            background="paper"
            title="Glass UI"
            blurb="A chromatic component bench: inspect the real specimen, then open its story."
            hero-scale="4"
            depth="D0"
        >
            <div class="optical-bench-signature" inert aria-hidden="true">
                <span class="optical-bench-meniscus" />
                <WatercolorDot
                    class="optical-bench-dot"
                    color="var(--section-color-5)"
                    seed="optical-bench"
                />
            </div>

            <section
                aria-label="Component categories"
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            >
                <SectionPreviewCard
                    v-for="category in CATEGORIES"
                    :key="category.id"
                    :to="`/${category.id}`"
                    :title="category.title"
                    :blurb="category.landing?.blurb"
                    :tile="identityTile(category)"
                />
            </section>
        </StoryHero>
    </article>
</template>

<style scoped>
.optical-bench-signature {
    position: relative;
    display: flex;
    align-items: center;
    pointer-events: none;
    min-block-size: clamp(6rem, 14vw, 9rem);
    margin-block-end: clamp(1.5rem, 3vw, 2.5rem);
}

.optical-bench-meniscus {
    position: relative;
    display: block;
    inline-size: min(90%, 46rem);
    block-size: clamp(2.75rem, 6vw, 4.25rem);
    border-radius: 42% 58% 54% 46% / 62% 48% 52% 38%;
    background: linear-gradient(
        102deg,
        var(--section-color-2),
        var(--section-color-4) 24%,
        var(--section-color-7) 48%,
        var(--section-color-9) 72%,
        var(--section-color-11)
    );
    box-shadow:
        inset 0 1px 0 color-mix(in srgb, white 70%, transparent),
        inset 0 -10px 18px color-mix(in srgb, var(--foreground) 14%, transparent),
        0 12px 28px color-mix(in srgb, var(--section-color-7) 20%, transparent);
}

.optical-bench-meniscus::after {
    content: "";
    position: absolute;
    inset: 12% 6% 52%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgb(255 255 255 / 0.5), transparent 75%);
}

.optical-bench-dot {
    position: absolute;
    inset-inline-end: clamp(0.25rem, 6vw, 4rem);
    inline-size: clamp(3.75rem, 8vw, 5.5rem);
    block-size: clamp(3.75rem, 8vw, 5.5rem);
}
</style>
