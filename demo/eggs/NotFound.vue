<script setup lang="ts">
// The 404 catch-all (E4). A full-bleed constellation lattice + "lost in the
// lattice." Reuses the shipped Constellation's demo-only supernova warp — a 404
// that warps the lattice on entry, then drifts. PRM-gated: the constellation
// substrate freezes to a static lattice under reduce (warpOnClick auto-off).
import { Constellation } from "../../src/components/custom/constellation";
import { Button } from "../../src/components/ui/button";
</script>

<template>
    <div
        class="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden"
    >
        <Constellation
            seed="lost-in-the-lattice"
            :count="72"
            :link="150"
            warp-on-click
            class="absolute inset-0 -z-10"
            aria-hidden="true"
        />
        <div
            class="glass-floating mx-auto max-w-md rounded-panel px-8 py-10 text-center"
        >
            <p class="font-display text-6xl text-viz-fourier">404</p>
            <p class="mt-3 text-heading text-foreground">Lost in the lattice</p>
            <p class="mt-2 text-small text-muted-foreground">
                That route drifted off the graph. Click the field to warp a node,
                or head back to a known star.
            </p>
            <Button as-child variant="default" size="sm" class="mt-6">
                <RouterLink to="/">Back to the storybook</RouterLink>
            </Button>
        </div>
    </div>
</template>
