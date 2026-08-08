<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import type { StatusDotSize, StatusDotState } from "./states";

defineOptions({
    name: "StatusDot",
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        state?: StatusDotState;
        size?: StatusDotSize;
        /**
         * Liveness axis. `"full"` runs the breathing pulse ring on the live
         * `active` state (liquid-weight universal — the default); `"off"` opts
         * down to a static mark. Reduced-motion always wins regardless.
         */
        motion?: "full" | "off";
        /** Accessible identity. Omit when adjacent text already names the state. */
        label?: string;
        class?: HTMLAttributes["class"];
    }>(),
    {
        state: "online",
        size: "sm",
        motion: "full",
    },
);
</script>

<template>
    <span
        v-bind="$attrs"
        :class="cn('status-dot', props.class)"
        :data-state="state"
        :data-size="size"
        :data-identity="label ? 'labelled' : 'decorative'"
        :role="label ? 'img' : undefined"
        :aria-label="label"
        :aria-hidden="label ? undefined : 'true'"
    >
        <span
            class="feedback-mark"
            :data-state="state"
            :data-motion="motion === 'full' && state === 'active' ? '' : undefined"
            aria-hidden="true"
        />
    </span>
</template>

<style scoped>
/* THE MARK RIDES THE LINE IT SITS IN (BK #87 W-MARKS §3.2). The rungs are `em`,
   not `rem`: a status dot annotates a line of text, so it must scale with that
   text — including inside the Avatar status slot, where the slot sets ONE
   `font-size` and this mark derives avatar/4 from it (S15's seam; a `rem` rung
   could not, and the `--feedback-mark-size` route both design arms proposed was a
   no-op because this element's OWN declaration below beats any inherited value).
   At root 16 the three rungs are byte-identical to the rem values they replace —
   8/10/14px — so nothing moves on a default page and K17 (a caption out-sizing its
   own specimen) cannot recur silently. */
.status-dot {
    --feedback-mark-size: 0.5em;
    display: inline-grid;
    inline-size: var(--feedback-mark-size);
    block-size: var(--feedback-mark-size);
    place-items: center;
    vertical-align: 0.05em;
}

.status-dot[data-size="md"] {
    --feedback-mark-size: 0.625em;
}

.status-dot[data-size="lg"] {
    --feedback-mark-size: 0.875em;
}

/* THE UNHANDLED DEFAULT IS `unknown`, NOT A LIVE STATE. The base used to paint the
   `--info` blue that `active` means, so ANY state without an explicit rule shipped
   looking live — which is how `active` itself went two majors with no rule of its
   own and nobody noticed (D9). An 8th state added tomorrow now arrives as the grey
   dashed unknown mark, which is the honest thing for a state the component has
   never been taught. */
.feedback-mark {
    --feedback-state-color: var(--muted-foreground);
    --feedback-state-ink: var(--background);
    position: relative;
    display: inline-grid;
    inline-size: var(--feedback-mark-size, 0.625em);
    block-size: var(--feedback-mark-size, 0.625em);
    place-items: center;
    color: var(--feedback-mark-color, var(--feedback-state-color));
}

.feedback-mark::before,
.feedback-mark::after {
    content: "";
    position: absolute;
    box-sizing: border-box;
}

/* The base pseudos ARE the `unknown` silhouette — a dashed ring around a small
   centre. That is the whole point: an unhandled state renders as the mark that
   says "this component has not been taught this state", and it can never again
   render as one that says "this thing is alive". Every explicit state below
   overrides both pseudos. */
.feedback-mark::before {
    inset: 0;
    border: 1px dashed currentColor;
    border-radius: var(--mark-stadium, var(--radius-pill));
    background: transparent;
}

.feedback-mark::after {
    inline-size: 22%;
    block-size: 22%;
    border-radius: var(--mark-stadium, var(--radius-pill));
    background: currentColor;
}

/* ── The seven explicit states — seven distinct silhouettes ──────────────────── */

.feedback-mark[data-state="unknown"] {
    --feedback-state-color: var(--muted-foreground);
}

.feedback-mark[data-state="idle"] {
    --feedback-state-color: var(--muted-foreground);
}

.feedback-mark[data-state="idle"]::before {
    border-style: solid;
}

.feedback-mark[data-state="idle"]::after {
    display: none;
}

.feedback-mark[data-state="success"] {
    --feedback-state-color: var(--success);
    --feedback-state-ink: var(--success-foreground);
}

.feedback-mark[data-state="success"]::before {
    border-style: solid;
    background: currentColor;
}

.feedback-mark[data-state="success"]::after {
    inline-size: 45%;
    block-size: 25%;
    border-radius: 0;
    border-block-end: 1px solid var(--feedback-state-ink);
    border-inline-start: 1px solid var(--feedback-state-ink);
    background: transparent;
    rotate: -45deg;
}

.feedback-mark[data-state="warning"] {
    --feedback-state-color: var(--warning);
    --feedback-state-ink: var(--warning-foreground);
}

/* The 18% / 22% shape radii below are SILHOUETTE GEOMETRY, not corner tokens: they
   are what make a rotated square read as a warning lozenge and a square read as an
   error tile. They are the enumerated exemptions to the one-stadium law — every
   OTHER corner in this file is `--radius-pill` now, where four hand-spelled `50%`
   literals used to sit in a file that already read the token correctly elsewhere. */
.feedback-mark[data-state="warning"]::before {
    inset: 8%;
    border-style: solid;
    border-radius: 18%;
    background: currentColor;
    rotate: 45deg;
}

.feedback-mark[data-state="warning"]::after {
    inline-size: 1px;
    block-size: 45%;
    border-radius: var(--mark-stadium, var(--radius-pill));
    background: var(--feedback-state-ink);
}

.feedback-mark[data-state="error"] {
    --feedback-state-color: var(--destructive);
    --feedback-state-ink: var(--destructive-foreground);
}

.feedback-mark[data-state="error"]::before {
    border-style: solid;
    border-radius: 22%;
    background: currentColor;
}

.feedback-mark[data-state="error"]::after {
    inset: 21%;
    inline-size: auto;
    block-size: auto;
    border-radius: 0;
    background:
        linear-gradient(45deg, transparent 42%, var(--feedback-state-ink) 42% 58%, transparent 58%),
        linear-gradient(-45deg, transparent 42%, var(--feedback-state-ink) 42% 58%, transparent 58%);
}

.feedback-mark[data-state="online"] {
    --feedback-state-color: var(--success);
    --feedback-state-ink: var(--success-foreground);
}

.feedback-mark[data-state="online"]::before {
    border-style: solid;
    background: currentColor;
}

.feedback-mark[data-state="online"]::after {
    inset: 29%;
    inline-size: auto;
    block-size: auto;
    border: 1px solid var(--feedback-state-ink);
    border-radius: var(--mark-stadium, var(--radius-pill));
    background: transparent;
}

/* ── `active` — the state whose NAME is liveness (D9 + S3) ───────────────────── */

/* It had NO RULE. The component's own README headlined it, seven states were
   enumerated in the union, and `active` fell through to the unhandled default for
   two majors — which is exactly why the default now paints `unknown`. */
.feedback-mark[data-state="active"] {
    --feedback-state-color: var(--info);
    --feedback-state-ink: var(--info-foreground);
}

.feedback-mark[data-state="active"]::before {
    border-style: solid;
    background: currentColor;
}

/* THE ORBIT IS THE RESTING SILHOUETTE, AT EVERY MOTION VALUE — and this is the
   cure for D10 BY IDENTITY rather than by adding a layer. The shipped file
   painted the orbit ONLY under `[data-motion]`, so at `motion="off"` the LIVE
   state was a bare disc: the most inert-looking mark in a set of seven, for the
   one state whose entire meaning is liveness. The breath-of-life edict forbids
   that inversion, and state identity must be motion-POLICY-invariant for the same
   reason it must survive forced-colors — a user who opts out of motion does not
   opt out of knowing which state they are looking at.

   So the silhouette ships unconditionally, and the pulse is that same silhouette
   ANIMATED — one `::after`, one painting layer, no competition between a static
   ring and a moving one. D10 survives as a finding: it is WHY identity is the only
   implementable cure. */
.feedback-mark[data-state="active"]::after {
    inset: -30%;
    inline-size: auto;
    block-size: auto;
    border: 1px solid currentColor;
    border-radius: var(--mark-stadium, var(--radius-pill));
    background: transparent;
    opacity: 0.28;
    scale: 1;
}

.feedback-mark[data-state="active"][data-motion]::after {
    /* A BREATH, not a traverse — 1.8s on `ease-out`, decaying outward from a
       compressed start. It is compositor-only (`scale` + `opacity`), which is why
       it is one of the register's two permitted rest carriers. */
    animation: feedback-mark-pulse 1.8s var(--ease-out) infinite;
}

@keyframes feedback-mark-pulse {
    0% {
        scale: 0.72;
        opacity: 0.5;
    }
    55%,
    100% {
        scale: 1.08;
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    /* The animation stops; the silhouette does NOT — it is already the resting
       form, so this arm collapses to one declaration instead of restoring a
       geometry the base rule now owns. */
    .feedback-mark[data-state="active"][data-motion]::after {
        animation: none;
    }
}

@media (forced-colors: active) {
    .feedback-mark {
        --feedback-state-color: CanvasText;
        --feedback-state-ink: Canvas;
        forced-color-adjust: none;
        color: CanvasText;
    }

    /* The hollow silhouettes keep their hole; every filled one keeps its fill (the
       state rules above are (0,2,0) and set `currentColor`, which forced-colors
       resolves to CanvasText, so they out-rank this (0,1,0) floor). Seven distinct
       marks survive the monochrome pass — which is the whole reason this component
       paints shapes and not only colours. */
    .feedback-mark::before {
        background: Canvas;
    }

    .feedback-mark[data-state="unknown"]::after {
        background: CanvasText;
    }

    .feedback-mark[data-state="active"]::after,
    .feedback-mark[data-state="online"]::after {
        border-color: CanvasText;
        background: transparent;
    }
}
</style>
