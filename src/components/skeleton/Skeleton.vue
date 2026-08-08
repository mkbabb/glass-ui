<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();

// CONTRACT FENCE, not a convenience strip (S8). `MIGRATION.md:121` is the
// published record: "Use the single decorative reserved-shape recipe. Put
// `aria-busy` and the loading name on the owning REGION." A skeleton is one tile
// of a reserved shape; N of them in a loading card must announce ONCE, from the
// region, not N times from the tiles. Letting a caller's `role`/`aria-*` land
// here silently re-opens that record.
const attrs = useAttrs();
const hostAttrs = computed(() =>
    Object.fromEntries(
        Object.entries(fixedHostAttrs(attrs)).filter(
            ([name]) => name !== "role" && !name.startsWith("aria-"),
        ),
    ),
);
</script>

<template>
    <div
        v-bind="hostAttrs"
        data-slot="skeleton"
        aria-hidden="true"
        :class="cn('skeleton', props.class)"
    />
</template>

<style scoped>
/* A-9 — THE FILL RESOLVES THROUGH THE ONE-INK LAW. `--muted` is a SURFACE token
   (a plate you put content on); a skeleton is a MARK standing in for content,
   and the register's law is that a mark's ink comes off the
   `--ink-{seam,edge,perimeter}` ladder. The reserved shape is an in-content
   stand-in, so it reads the in-content rung, `--ink-seam` — the same figure the
   separator paints, which is correct: they are the same kind of quiet mark on
   the same plate. The shimmer/tinted-surface variant stays DECLINED (S2's four
   falsifiers). */
.skeleton {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    background: color-mix(
        in oklab,
        var(--foreground) calc(var(--ink-seam) * 100%),
        transparent
    );
}

/* The DEFAULT tile radius lives on @layer components so a caller's public shape
   utility (rounded-full for an avatar specimen, rounded-card for a card specimen —
   merged onto this element by `cn('skeleton', props.class)`) wins from the later
   utilities layer. An unlayered radius here would outrank those utilities and defeat
   the public shape seam. --radius-media is the media/tile default, not a hard owner. */
@layer components {
    .skeleton {
        border-radius: var(--radius-media);
    }
}

/* ── THE BREATH — F24 closed at its MECHANISM, not at its clock (S2) ───────────
   The travelling band is gone entirely: the `::after` gradient, the
   `skeleton-scan` keyframes, the `will-change`, and the no-op
   `prefers-reduced-transparency` branch (whose body was byte-identical to the
   base rule it "overrode").

   WHY THE BAND COULD NOT BE TUNED. Two independent defects, and each one alone
   is fatal to the mechanism:

     · `ease-in-out` on an INFINITE ONE-WAY loop. The band spends 71.3% of every
       cycle parked off the box, and it decelerates to zero velocity right at the
       wrap seam — so the eye sees a stall, a jump, and a long dead pause. Easing
       a one-way loop is exactly the shipped defect; only an `alternate` cycle can
       carry an ease honestly.
     · TRAVEL SCALES WITH OWN WIDTH. The band crosses 220% of its own inline-size
       in a FIXED clock, so a 213px chip ran at 157 px/s and a 1246px block at 914
       px/s — 5.8× apart, on the same route, in the same loading state. Retuning
       the clock moves both numbers and keeps the ratio; pinning the band's width
       mints a token on no series. Both mutations are named in G4 and both stay
       RED.

   WHAT REPLACES IT. An opacity breathe: compositor-only, width-INVARIANT by
   type (opacity has no geometry to scale), on an `alternate` cycle so the canon
   ease reads as weight in both directions, and moving through 100% of its cycle
   instead of 71% dead. Five declarations, zero tokens minted. It pairs with the
   status-dot pulse as the register's two — and only two — rest carriers. */
@media (prefers-reduced-motion: no-preference) {
    .skeleton {
        animation: skeleton-breathe 1.1s var(--ease-standard) infinite alternate;
    }
}

@keyframes skeleton-breathe {
    to {
        opacity: 0.55;
    }
}

@media (forced-colors: active) {
    .skeleton {
        animation: none;
        background: CanvasText;
        opacity: 0.18;
    }
}
</style>
