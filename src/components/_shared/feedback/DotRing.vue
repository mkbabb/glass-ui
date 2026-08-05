<script setup lang="ts">
// THE DOT-RING — the library's ONE work-in-flight affordance.
//
// BK #28 W-FEEDBACK-MOTION; spec of record TERMINAL-ROSTER #28 → EXEMPLARS-CODEX §B3.
// The whole of the design is in `dot-ring.css` beside this file: seven beads on a
// circle whose UNEQUAL sizes rotate, conserving total area at every instant. This
// component is the seven nodes and nothing else.
//
// NO PROPS, AND THAT IS THE DESIGN. Presence is the state machine — a dot-ring exists
// exactly while work is in flight, so mounting IS the fission (`@starting-style`) and
// unmounting IS the re-fusion. The re-fusion has one requirement, and it is the host's:
// the ring must leave under a `<Transition name="glass-dot-ring">`, whose ROOT the
// register gives the clock Vue measures — an unwrapped `v-if` removes the node on the
// frame the work ends and the mass never draws home. An `active` prop would be a second
// authority over the same fact, free to disagree with the `v-if` that put the element
// on the page.
//
// ALWAYS `aria-hidden`, AND THAT IS ALSO THE DESIGN. Every real host of a loading mark
// already reports the state in text — InfiniteScroll owns a polite live region,
// EasingPicker owns both a `role="status"` line and the trigger's own `aria-label`.
// An indicator that announces by default makes every one of those hosts say it twice,
// so the rule is stated once, here, rather than left to a prop each caller must
// remember to suppress.
//
// AN INTERNAL SHARED RECIPE, DELIBERATELY. Not exported, no seat in the public barrel:
// both consumers are library-internal, and both already expose a `loading` slot or an
// explicit trigger for a caller who wants their own mark. Growing the public surface
// for an indicator nobody asked for is the overfit class #19 spent a row cutting.

const BEAD_SEATS = [0, 1, 2, 3, 4, 5, 6] as const;
</script>

<template>
    <span class="glass-dot-ring" data-slot="dot-ring" aria-hidden="true">
        <!-- The spoke is not decoration. `rotate` and `translate` compose in a fixed
             order on one element (translate first), so a bead carrying both lands on
             the unrotated axis and merely spins in place — all seven stacked on one
             radius. The rotation has to sit on a PARENT to get outside the travel. -->
        <span
            v-for="k in BEAD_SEATS"
            :key="k"
            class="glass-dot-ring-spoke"
            :style="{ '--dot-ring-k': k }"
        >
            <span class="glass-dot-ring-bead" />
        </span>
    </span>
</template>
