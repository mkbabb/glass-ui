<script setup lang="ts">
import {
    computed,
    effectScope,
    ref,
    useAttrs,
    useTemplateRef,
    watch,
    type HTMLAttributes,
} from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useIntersectionPause } from "../../composables/motion/core/useIntersectionPause";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    class?: HTMLAttributes["class"];
    /**
     * A travelling sheen across the reserved shape in place of the breathe. Ink
     * only (the one-ink ladder, no hue), static under `prefers-reduced-motion`,
     * paused while the tile is off-screen or the document is hidden.
     */
    shimmer?: boolean;
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

// OFF-SCREEN PAUSE. A shimmer is a compositor loop, and a compositor loop on a tile
// nobody can see still ticks. The observer exists only while the shimmer is on, so a
// page of plain tiles pays for none.
const el = useTemplateRef<HTMLElement>("el");
const offscreen = ref(false);
watch(
    () => props.shimmer,
    (on, _was, onCleanup) => {
        if (!on) return;
        const scope = effectScope();
        scope.run(() =>
            useIntersectionPause(el, {
                pause: () => (offscreen.value = true),
                resume: () => (offscreen.value = false),
            }),
        );
        onCleanup(() => {
            scope.stop();
            offscreen.value = false;
        });
    },
    { immediate: true },
);
</script>

<template>
    <div
        ref="el"
        v-bind="hostAttrs"
        data-slot="skeleton"
        aria-hidden="true"
        :data-shimmer="shimmer || undefined"
        :data-offscreen="(shimmer && offscreen) || undefined"
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
   the same plate.

   THE SHIMMER, by OWNER RULING (2026-10-19, BL INBOUND O-102b (3)). The variant
   was declined here on S2's falsifiers; the owner reversed the decline and ruled a
   shimmer variant onto Skeleton, static under `prefers-reduced-motion` and
   identity-neutral. It is the `shimmer` prop, and it is built against each of the
   falsifiers that sank the old band rather than around them (see THE SHIMMER
   below). The tinted-surface variant stays declined: the fill is ink. */
@layer components {
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
@layer components {
    @media (prefers-reduced-motion: no-preference) {
        .skeleton:not([data-shimmer]) {
            animation: skeleton-breathe 1.1s var(--ease-standard) infinite alternate;
        }
    }
}

@keyframes skeleton-breathe {
    to {
        opacity: 0.55;
    }
}

/* ── THE SHIMMER — `shimmer`, the owner-ruled variant ───────────────────────────
   One sheen replaces the breathe on the tile (a tile has one rest carrier, never
   two). Each of the old band's falsifiers has its answer in a declaration:

     · TRAVEL IS WIDTH-INVARIANT. The sheen is a repeating gradient of one fixed
       PERIOD, and the layer that carries it translates by exactly one period per
       cycle. Its speed is period ÷ duration on every tile, a 213px chip and a
       1246px block alike, and the loop has no seam: after one period the pattern
       is where it began.
     · NO STALL AT THE SEAM. A one-way loop runs `linear`, because an ease on a
       one-way loop decelerates to zero at the wrap seam. The weight is in the
       band's profile, a soft rise and fall, not in its clock.
     · ONE SHIMMER CLOCK. It rides `--duration-shimmer-fast`, the clock the
       indeterminate flow band (`glass/track-flow.css`) already runs linear on; the
       register has one shimmer clock, not two.
     · COMPOSITOR-ONLY. `transform` on a pseudo-element; no repaint per frame.
     · INK, NO HUE. The band is the foreground at the SEAM rung over the seam fill,
       so its crest reads at about the EDGE rung of the one-ink ladder, in light and
       in dark alike. No colour, no tint, no glow.
     · STATIC UNDER REDUCE. The animation is gated on `no-preference`; under
       `reduce` the sheen holds still as a static highlight across the shape.
     · OFF-SCREEN IS PAUSED (`data-offscreen`, written by the script's observer). */
@layer components {
    .skeleton[data-shimmer]::after {
        --skeleton-shimmer-period: 36rem;
        content: "";
        position: absolute;
        inset-block: 0;
        inset-inline-start: 0;
        inline-size: calc(100% + var(--skeleton-shimmer-period));
        pointer-events: none;
        background-image: repeating-linear-gradient(
            90deg,
            transparent calc(var(--skeleton-shimmer-period) * 0.3),
            color-mix(in oklab, var(--foreground) calc(var(--ink-seam) * 100%), transparent)
                calc(var(--skeleton-shimmer-period) * 0.5),
            transparent calc(var(--skeleton-shimmer-period) * 0.7),
            transparent var(--skeleton-shimmer-period)
        );
        transform: translateX(calc(-1 * var(--skeleton-shimmer-period)));
    }

    @media (prefers-reduced-motion: no-preference) {
        .skeleton[data-shimmer]::after {
            animation: skeleton-shimmer var(--duration-shimmer-fast) linear infinite;
        }
    }

    .skeleton[data-offscreen]::after {
        animation-play-state: paused;
    }
}

@keyframes skeleton-shimmer {
    to {
        transform: translateX(0);
    }
}

@layer components {
    @media (forced-colors: active) {
        .skeleton {
            animation: none;
            background: CanvasText;
            opacity: 0.18;
        }

        .skeleton[data-shimmer]::after {
            content: none;
        }
    }
}
</style>
