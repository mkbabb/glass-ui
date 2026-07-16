<script setup lang="ts">
// display/card — authored landing-tile vignette.
// A real glass <Card> (the floating tier) with a title bar + two rule bars — the
// live surface the /display landing curates. Inert + 0-GL by the fenced stage; the
// glass composites the warm §3 field behind it (the library's headline material).
import { Card, CardContent } from "@glass/components/card";
</script>

<template>
    <div class="card-tile-wrap">
        <Card tier="floating" size="sm" class="card-tile">
            <CardContent class="card-tile-content">
                <span class="card-tile-head" />
                <span class="card-tile-bar" />
                <span class="card-tile-bar card-tile-bar--short" />
            </CardContent>
        </Card>
    </div>
</template>

<style scoped>
.card-tile-wrap {
    display: grid;
    place-items: center;
    padding: clamp(0.6rem, 10cqmin, 1.5rem);
}
.card-tile {
    inline-size: clamp(6rem, 70cqw, 12rem);
}
.card-tile-content {
    display: flex;
    flex-direction: column;
    gap: clamp(0.4rem, 7cqh, 0.8rem);
}
.card-tile-head {
    block-size: clamp(0.5rem, 9cqh, 0.9rem);
    inline-size: 55%;
    border-radius: var(--radius-pill);
    background: color-mix(in oklab, var(--foreground) 24%, transparent);
}
.card-tile-bar {
    block-size: clamp(0.35rem, 6cqh, 0.6rem);
    inline-size: 100%;
    border-radius: var(--radius-pill);
    background: color-mix(in oklab, var(--foreground) 12%, transparent);
}
.card-tile-bar--short {
    inline-size: 68%;
}
</style>
