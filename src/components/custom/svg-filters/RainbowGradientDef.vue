<!-- @mkbabb/glass-ui — see docs/tranches/G/blob/SPEC.md -->
<script setup lang="ts">
// RainbowGradientDef — single-mount linearGradient companion for the
// .rainbow-stroke utility (W2 utilities.css). Stops reference canon
// --rainbow-{red..violet} tokens.
</script>

<template>
    <svg
        class="rainbow-gradient-def"
        aria-hidden="true"
        focusable="false"
        style="position: absolute; width: 0; height: 0; overflow: hidden"
    >
        <defs>
            <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="var(--rainbow-red)" />
                <stop offset="16%" stop-color="var(--rainbow-orange)" />
                <stop offset="33%" stop-color="var(--rainbow-yellow)" />
                <stop offset="50%" stop-color="var(--rainbow-green)" />
                <stop offset="66%" stop-color="var(--rainbow-blue)" />
                <stop offset="83%" stop-color="var(--rainbow-indigo)" />
                <stop offset="100%" stop-color="var(--rainbow-violet)" />
            </linearGradient>
        </defs>
    </svg>
</template>
