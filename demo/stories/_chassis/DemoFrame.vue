<script setup lang="ts">
// DemoFrame — the ONE demo sub-type chassis (W-STORY-PAGE-STANDARD).
//
// THE BOX-MODEL INVERSION. The storybook body is NO LONGER one monolith gray
// card with flat sections inside. It is a stack of FREE glassy cels floating
// directly over the ONE shared warm field ([data-paper-field], mounted globally
// behind every page in AppShell). Each sub-section is its OWN glass cel that
// transmits the field and SLAMS into place on the cartoon punch arc with a
// lagging cast.
//
// ONE chassis, FIVE variants — the sub-types are PRESETS, not five SFCs:
//   stage       — the φ²-dominant protagonist (HOISTED out of the prose measure,
//                 fixed-width, no cqw); for substrate / dock overview demos.
//   specimen    — a state row in one glassy plate; display · forms · feedback.
//   interaction — a live control + readout driving the real API; containers.
//   matrix      — a grid of concentric-radius glassy cells; buttons · badges.
//   composition — a glassy stage composing a SERIES of components; navigation.
//
// CONFORMITY BY CONSTRUCTION: a page CANNOT render a flat opaque box off the
// allowlist — it composes a <DemoFrame variant> (the field-aware translucent
// glass register + the cel-slam entrance + the caption band) and only fills the
// FREE body slot. Pages write `<DemoFrame variant="…">` DIRECTLY (no `index.ts`
// re-export indirection — the broken slot-dropping `(p)=>h(...)` pattern is
// EXCISED: a bare functional re-export passes NO slots and silently DROPS the
// demo).
//
// THE COMPOSED REGISTERS (read-only, never re-forked):
//   - [data-paper-field] — the warm field, the universal -z floor (AppShell).
//   - <Card tier surface="cartoon"> — the glass register + the inert
//     `.cartoon-cast` child (BD.W-CARTOON-CASTER) the Card emits for free; the
//     cast LAGS the body for the late ink recoil. NO hand-rolled `::after`.
//   - `.scroll-build` mount-clock + `--i` stagger — the alive entrance.
//   - `--motion-weight` / `--ease-cartoon-punch` — the cel-slam arc, consumed.
//   - <StorySection heading> — the ONE in-body <h2> (the page <h1> is the
//     chassis's; this never renders a 2nd <h1> or in-card eyebrow — the
//     double-header dies by construction, consuming BD.W-PAGE-CHASSIS).
import { computed } from "vue";
import { Card } from "@glass/components/ui/card";
import StorySection from "../StorySection.vue";

export type DemoVariant =
    | "stage"
    | "specimen"
    | "interaction"
    | "matrix"
    | "composition";

const props = withDefaults(
    defineProps<{
        /** The layout preset — the ONLY thing that differs per sub-type. */
        variant?: DemoVariant;
        /** The in-body section <h2> (the page <h1> is the chassis's — ONE title). */
        heading?: string;
        /** The mono eyebrow caption ABOVE the heading. */
        label?: string;
        /** The supporting blurb under the heading. */
        blurb?: string;
        /** The mono footer caption band (reuses the --showcase-caption-gap rhythm). */
        caption?: string;
        /**
         * The φ² protagonist breaks OUT of the prose measure to the wide stage
         * width (HOISTED, no cqw — a direct article child at `--story-stage-w`).
         * Defaults true on `stage`, false otherwise.
         */
        bleed?: boolean;
        /** The beat index for the mount-clock stagger (`--i`); pages set it per cel. */
        i?: number;
    }>(),
    { variant: "specimen" },
);

// The glass TIER is field-aware: every variant reads a TRANSLUCENT rung over the
// universal field — NEVER a flat opaque `bg-card` slab. The stage reads `quiet`
// (a deeper plate behind the protagonist); the prose cels read `wash` (the
// thinnest glass so the field reads richly through them).
const tier = computed(() => (props.variant === "stage" ? "quiet" : "wash"));

// The HOISTED bleed — a `stage` cel is a wide direct article child; prose cels
// stay measure-bound. The bleed is a layout switch, NOT a cqw container escape.
const doBleed = computed(() => props.bleed ?? props.variant === "stage");
</script>

<template>
    <!-- The glassy cel: ONE box on the shared register. `story-cel` hooks the
         cel-slam entrance; `demo-frame` + `data-variant` carry the φ ladder + the
         per-variant internal layout (demo-frame.css). The `--glass-backdrop:
         light` bucket keeps prose AA over the warm field. The `--i` mount-clock
         beat threads the overlapping stagger. -->
    <StorySection
        :heading="heading"
        :label="label"
        :blurb="blurb"
        class="demo-frame story-cel"
        :data-variant="variant"
        :data-bleed="doBleed ? '' : null"
        :style="{ '--glass-backdrop': 'light', '--i': i }"
    >
        <!-- The glass cel + the auto `.cartoon-cast` child (surface=cartoon). The
             field reads THROUGH the translucent tier (glass samples the field's
             composited output — the -z floor is a sibling BEHIND all glass, so
             glass never samples glass). ONE box, ONE backdrop-filter, ONE shadow
             source — the redundant ShowcaseFrame→Card nest is collapsed. -->
        <Card :tier="tier" surface="cartoon" class="demo-frame-card">
            <slot />
        </Card>

        <!-- The mono caption band — reuses the ShowcaseFrame --showcase-caption-gap
             rhythm VALUE (not the component). Renders only when a caption is set. -->
        <div v-if="caption || $slots.caption" class="demo-frame-caption">
            <slot name="caption">{{ caption }}</slot>
        </div>
    </StorySection>
</template>
