<script setup lang="ts">
import { computed, ref } from "vue";
import {
    Surface,
    type SurfaceProps,
    type SurfaceTier,
} from "@glass/components/surface";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";

type Decoration = NonNullable<SurfaceProps["surface"]>;

/* The prominence LADDER, read off the one axis. The prose column used to be
   hand-typed against a second `material` axis this wave deleted; every cell now
   states the resolved value it actually mounts. */
const tiers: { value: SurfaceTier; use: string }[] = [
    { value: "wash", use: "the thinnest medium" },
    { value: "quiet", use: "nested content" },
    { value: "resting", use: "primary plate" },
    { value: "floating", use: "working control" },
    { value: "overlay", use: "transient layer" },
];
const decorations: { value: Decoration; use: string }[] = [
    { value: "glass", use: "transmissive default" },
    { value: "veil", use: "quiet separation" },
    { value: "opaque", use: "solid shelter" },
];

/* THE TIER SCRUBBER — the route's one affordance, and the whole answer to a
   specimen page that shipped with zero interactive elements. ONE live plate
   travels the five rungs continuously over the shell field, so the ladder is
   read as a CONTINUUM instead of five stills. It settles on the dock spring
   through the token mirror (`--spring-dock` / `--spring-dock-duration`, the CSS
   half of `springPreset("dock")` — {response 0.30, ζ 0.88} on disk this seat,
   never a remembered literal), and it is a real `role="slider"`:
   keyboard-driven, 44px floor, `aria-valuetext` naming the rung rather than
   announcing an index. */
const rungIndex = ref(2);
const scrubTier = computed<SurfaceTier>(() => tiers[rungIndex.value].value);
const scrubLabel = computed(() => tiers[rungIndex.value].use);

/* The depth matrix, flattened: `<template v-for>` cannot carry its key on the
   child, and the pair reads better as data than as a nested loop anyway. */
const depthPairs = (["quiet", "floating", "overlay"] as const).flatMap((tier) => [
    { key: `${tier}-calm`, tier, deep: false, label: tier, note: "calm" },
    {
        key: `${tier}-deep`,
        tier,
        deep: true,
        label: `${tier} deep`,
        note: "graded thickness",
    },
]);

function step(delta: number): void {
    rungIndex.value = Math.min(tiers.length - 1, Math.max(0, rungIndex.value + delta));
}
function onKey(event: KeyboardEvent): void {
    const moves: Record<string, number> = {
        ArrowRight: 1,
        ArrowUp: 1,
        ArrowLeft: -1,
        ArrowDown: -1,
    };
    if (event.key in moves) {
        event.preventDefault();
        step(moves[event.key]);
        return;
    }
    if (event.key === "Home") {
        event.preventDefault();
        rungIndex.value = 0;
    }
    if (event.key === "End") {
        event.preventDefault();
        rungIndex.value = tiers.length - 1;
    }
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="the prominence ladder"
            heading="One axis for every plate"
            blurb="A surface has ONE prominence axis — five rungs of the same medium at different thicknesses — and decoration is orthogonal to it."
        >
            <ul class="surface-field surface-grid">
                <Surface
                    v-for="tier in tiers"
                    :key="tier.value"
                    as="li"
                    :tier="tier.value"
                    class="surface-cell"
                >
                    <code>{{ tier.value }}</code>
                    <span>{{ tier.use }}</span>
                </Surface>
            </ul>
        </StorySection>

        <StorySection
            label="the scrubber"
            blurb="The same plate, moved continuously through the five rungs. Material at rest, engagement on interaction — the ladder settles on the dock spring, it never pulses idle."
        >
            <div class="surface-field scrub-field">
                <Surface :tier="scrubTier" class="surface-cell scrub-plate">
                    <code>{{ scrubTier }}</code>
                    <span>{{ scrubLabel }}</span>
                </Surface>

                <div
                    class="scrub-rail"
                    role="slider"
                    tabindex="0"
                    aria-label="Surface prominence"
                    :aria-valuemin="0"
                    :aria-valuemax="tiers.length - 1"
                    :aria-valuenow="rungIndex"
                    :aria-valuetext="`${scrubTier} — ${scrubLabel}`"
                    @keydown="onKey"
                >
                    <button
                        v-for="(tier, index) in tiers"
                        :key="tier.value"
                        type="button"
                        class="scrub-stop"
                        :data-active="index === rungIndex || undefined"
                        :aria-label="`Move to ${tier.value}`"
                        @click="rungIndex = index"
                    >
                        <span class="scrub-dot" aria-hidden="true" />
                        <span class="scrub-name">{{ tier.value }}</span>
                    </button>
                </div>
            </div>
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
                    tier="resting"
                    :surface="decoration.value"
                    class="surface-cell"
                >
                    <code>{{ decoration.value }}</code>
                    <span>{{ decoration.use }}</span>
                </Surface>
            </ul>
        </StorySection>

        <StorySection
            label="depth is orthogonal"
            blurb="`deep` thickens the resolved tier; it never jumps to another one. Each pair below is the same rung with the depth grade off and on."
        >
            <ul class="surface-field surface-grid">
                <Surface
                    v-for="cell in depthPairs"
                    :key="cell.key"
                    as="li"
                    :tier="cell.tier"
                    :deep="cell.deep"
                    class="surface-cell"
                >
                    <code>{{ cell.label }}</code><span>{{ cell.note }}</span>
                </Surface>
            </ul>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.surface-field {
    margin: 0;
    list-style: none;
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
    font-size: var(--type-caption);
}

.scrub-field {
    display: grid;
    gap: 1rem;
}

/* The plate travels between rungs on the dock spring — one settle, no overshoot
   past the rung it lands on. The rung's own clock (glass/ladder.css) carries the
   material legs; this carries the box. */
.scrub-plate {
    transition:
        translate var(--spring-dock-duration) var(--spring-dock),
        backdrop-filter var(--spring-dock-duration) var(--spring-dock);
}

.scrub-rail {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    border-radius: var(--radius-pill);
}

.scrub-rail:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 4px;
}

.scrub-stop {
    display: flex;
    min-block-size: 44px;
    min-inline-size: 44px;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    border-radius: var(--radius-md);
    background: none;
    color: var(--muted-foreground);
    cursor: pointer;
    transition: color var(--spring-press-duration) var(--spring-press);
}

.scrub-stop[data-active] {
    color: var(--foreground);
}

.scrub-dot {
    inline-size: 0.5rem;
    block-size: 0.5rem;
    border-radius: var(--radius-pill);
    background: currentcolor;
    transition: scale var(--spring-dock-duration) var(--spring-dock);
}

.scrub-stop[data-active] .scrub-dot {
    scale: 1.6;
}

.scrub-name {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
}

@media (prefers-reduced-motion: reduce) {
    .scrub-plate,
    .scrub-dot,
    .scrub-stop {
        transition: none;
    }
}
</style>
