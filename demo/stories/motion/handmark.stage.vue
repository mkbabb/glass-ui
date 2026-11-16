<script setup lang="ts">
// Hand Mark's stage: the four gestures, each on a line of real text. The first line
// sits two type rungs up and the rest one, so the mark is seen holding its proportion.
import { HandMark } from "@glass/components/handmark";
</script>

<template>
    <div class="handmark-stage">
        <p class="handmark-line handmark-line-lg">
            Who <HandMark>pays in</HandMark> gets connected
        </p>
        <p class="handmark-line">
            The deadline is <HandMark shape="strike">Friday</HandMark> Monday
        </p>
        <p class="handmark-line">
            Up <HandMark shape="circle">threefold</HandMark> since spring
        </p>
        <p class="handmark-line">
            The part that <HandMark shape="highlight">really matters</HandMark>
        </p>
    </div>
</template>

<style scoped>
.handmark-stage {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    font-family: var(--font-display);
    color: var(--foreground);
}

.handmark-line {
    font-size: calc(var(--type-body) * 1.618);
    line-height: 1.2;
}

.handmark-line-lg {
    font-size: calc(var(--type-body) * 2.618);
    line-height: 1.05;
}

@container (inline-size < 34rem) {
    .handmark-line {
        font-size: calc(var(--type-body) * 1.272);
    }
    .handmark-line-lg {
        font-size: calc(var(--type-body) * 1.618);
    }
}
</style>
