<script setup lang="ts">
// forms/inputs — authored landing-tile vignette.
// A real <Input> pair at REST — the live control the /forms landing (and the
// front-door forms card) curates. Inert + 0-GL by the fenced stage; no own rAF.
import { Input } from "@glass/components/input";
</script>

<template>
    <div class="inputs-tile">
        <Input model-value="Ada Lovelace" tabindex="-1" readonly />
        <Input placeholder="you@example.com" tabindex="-1" readonly />
    </div>
</template>

<style scoped>
.inputs-tile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: clamp(0.4rem, 6cqh, 0.8rem);
    inline-size: 100%;
    padding: clamp(0.6rem, 10cqmin, 1.5rem);
}
</style>
