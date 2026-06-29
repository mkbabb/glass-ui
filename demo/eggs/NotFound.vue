<script setup lang="ts">
// The 404 catch-all (E4). A full-bleed constellation lattice + "lost in the
// lattice." Reuses the shipped Constellation's demo-only supernova warp — a 404
// that warps the lattice on entry, then drifts. PRM-gated: the constellation
// substrate freezes to a static lattice under reduce (warpOnClick auto-off).
import { Constellation } from "@glass/components/custom/constellation";
import { Button } from "@glass/components/ui/button";
</script>

<template>
    <div
        class="relative flex h-[70vh] min-h-[28rem] w-full items-center justify-center overflow-hidden"
    >
        <!-- The lattice fills the field. The `<Constellation>` scoped root is
             unlayered `position: relative; block-size: 100%`, which a consumer
             `absolute inset-0` utility cannot override (Tailwind utilities live
             in `@layer utilities`, and an unlayered rule beats a layered one
             regardless of specificity — the `:where()` zero-specificity fix is
             defeated by the layer mechanism). So the host fills its parent via
             the `100%` extents, which needs a CONCRETE parent height (`h-[70vh]`,
             not `min-h-` — an in-flow relative child collapses to content height
             under flex centering). A sized `absolute inset-0` wrapper gives the
             host that concrete box without depending on the utility winning. -->
        <div class="absolute inset-0 -z-10">
            <Constellation
                seed="lost-in-the-lattice"
                :count="72"
                :link="150"
                warp-on-click
                aria-hidden="true"
            />
        </div>
        <div
            class="glass-floating max-w-md rounded-panel px-8 py-10 text-center"
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
