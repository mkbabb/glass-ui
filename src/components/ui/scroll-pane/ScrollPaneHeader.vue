<script setup lang="ts">
defineProps<{
    description?: string;
}>();
</script>

<template>
    <div class="pane-header sticky top-0 z-[1] px-4 sm:px-6 pt-4 pb-2 backdrop-blur-md bg-card/60">
        <h3 class="pane-header-title text-pane-title"><slot /></h3>
        <div v-if="description" class="pane-header-desc-wrap">
            <p class="text-pane-description">{{ description }}</p>
        </div>
    </div>
</template>

<style scoped>
.pane-header {
    animation: pane-header-shrink linear both;
    animation-timeline: --pane-scroll;
    animation-range: 0px 120px;
}

.pane-header-title {
    animation: pane-title-shrink linear both;
    animation-timeline: --pane-scroll;
    animation-range: 0px 120px;
}

.pane-header-desc-wrap {
    display: grid;
    grid-template-rows: 1fr;
    overflow: hidden;
    margin-top: 0.125rem;
    animation: pane-desc-shrink linear both;
    animation-timeline: --pane-scroll;
    animation-range: 0px 80px;
}

.pane-header-desc-wrap > p {
    min-height: 0;
}

@keyframes pane-header-shrink {
    from {
        padding-top: 1rem;
        padding-bottom: 0.5rem;
    }
    to {
        padding-top: 0.5rem;
        padding-bottom: 0.25rem;
    }
}

@keyframes pane-title-shrink {
    from {
        font-size: var(--type-display-2, 3.33rem);
    }
    to {
        font-size: var(--type-subheading, 1.272rem);
    }
}

@keyframes pane-desc-shrink {
    from {
        grid-template-rows: 1fr;
        opacity: 1;
        margin-top: 0.125rem;
    }
    to {
        grid-template-rows: 0fr;
        opacity: 0;
        margin-top: 0;
    }
}
</style>
