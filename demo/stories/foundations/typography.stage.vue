<script lang="ts">
export type TypeFace = "display" | "text" | "mono";
</script>

<script setup lang="ts">
// Typography's stage: the scale set in real text, one register at a time. A change
// cross-fades.
import StageSwap from "../../chassis/variants/StageSwap.vue";

withDefaults(defineProps<{ face?: TypeFace }>(), { face: "display" });

const LINES: Record<TypeFace, readonly { cls: string; text: string }[]> = {
    display: [
        { cls: "text-display-5", text: "Golden" },
        { cls: "text-display-4", text: "Audacious" },
        { cls: "text-display-3", text: "Warm glass" },
        { cls: "text-display-2", text: "Paper and ink" },
    ],
    text: [
        { cls: "text-title", text: "A section title" },
        { cls: "text-heading", text: "A heading under it" },
        { cls: "text-subheading", text: "A card's title" },
        { cls: "text-prose", text: "Long reading sits here, at a golden line height." },
        { cls: "text-body", text: "Body copy for controls and short passages." },
        { cls: "text-small", text: "Metadata and secondary lines." },
        { cls: "text-caption", text: "Captions and hints." },
    ],
    mono: [
        { cls: "fira-code text-mono-prose", text: "const field = aurora({ seed: 7 });" },
        { cls: "fira-code text-mono-small", text: "npm run dev" },
        { cls: "fira-code text-mono-caption", text: "12.4 ms · 98.2 Mb/s" },
        { cls: "text-math", text: "f(x) = Σ aₙ φₙ(x)" },
    ],
};
</script>

<template>
    <StageSwap :swap-key="face" class="type-swap">
        <div class="type-stage" :data-face="face">
            <div v-for="l in LINES[face]" :key="l.cls" :class="l.cls" class="type-line">
                {{ l.text }}
            </div>
        </div>
    </StageSwap>
</template>

<style scoped>
/* At least the stage's width, and wider where a display word is, so a small card can
   measure the whole specimen and scale it down. */
.type-swap {
    inline-size: fit-content;
    min-inline-size: 100%;
}
.type-swap,
.type-swap > :deep(.stage-swap-pane) {
    block-size: 100%;
}

.type-stage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--sp-3);
    block-size: 100%;
    padding: var(--sp-5) var(--sp-6);
    color: var(--foreground);
}

.type-stage[data-face="display"] {
    font-family: var(--font-display);
    gap: var(--sp-2);
}

.type-line {
    margin: 0;
}

/* A display word never breaks; the smaller registers wrap at the stage's edge. */
.type-stage[data-face="display"] .type-line {
    white-space: nowrap;
}

@container (inline-size < 30rem) {
    .type-stage {
        padding: var(--sp-4);
    }
}
</style>
