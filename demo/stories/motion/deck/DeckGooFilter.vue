<script setup lang="ts">
defineProps<{ filterId: string; clipId: string }>();
</script>

<template>
    <svg class="deck-goo-defs" width="1" height="1" aria-hidden="true" focusable="false">
        <defs>
            <filter
                :id="filterId"
                color-interpolation-filters="sRGB"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
            >
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7"
                    result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
            <clipPath :id="clipId" clipPathUnits="objectBoundingBox">
                <path d="M0,0 C0.25,0 0.36,0.34 0.5,0.34 C0.64,0.34 0.75,0 1,0 L1,1 C0.75,1 0.64,0.66 0.5,0.66 C0.36,0.66 0.25,1 0,1 Z" />
            </clipPath>
        </defs>
    </svg>
</template>

<style scoped>
.deck-goo-defs {
    position: absolute;
    inset: -9999px auto auto -9999px;
    overflow: hidden;
    pointer-events: none;
}
</style>
