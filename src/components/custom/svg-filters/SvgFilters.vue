<!-- @mkbabb/glass-ui — see docs/tranches/G/blob/SPEC.md -->
<script setup lang="ts">
// SvgFilters — single-mount filter pack. Mount once at app root or wherever
// the consumer surfaces composing watercolor/grain effects exist.
//
// Filter pack:
//   #watercolor      — feTurbulence + feDisplacementMap; subtle organic
//                      edge wobble for blob/swatch surfaces.
//   #paper-grain     — fine displacement for paper-textured surfaces.
//   #pencil-wobble   — finer displacement for hand-drawn icon edges.
//   #canvas-grain    — coarser grain for canvas-backed compositions.
</script>

<template>
    <svg
        class="svg-filters"
        aria-hidden="true"
        focusable="false"
        style="position: absolute; width: 0; height: 0; overflow: hidden"
    >
        <defs>
            <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.02"
                    numOctaves="2"
                    seed="1"
                    result="noise"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
            </filter>
            <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="4"
                    stitchTiles="stitch"
                    result="noise"
                />
                <feColorMatrix in="noise" type="saturate" values="0" />
                <feBlend mode="multiply" in2="SourceGraphic" />
            </filter>
            <filter id="pencil-wobble" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.05"
                    numOctaves="3"
                    seed="2"
                    result="noise"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            </filter>
            <filter id="canvas-grain" x="0" y="0" width="100%" height="100%">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.4"
                    numOctaves="3"
                    stitchTiles="stitch"
                    result="noise"
                />
                <feColorMatrix in="noise" type="saturate" values="0" />
                <feBlend mode="multiply" in2="SourceGraphic" />
            </filter>
        </defs>
    </svg>
</template>
