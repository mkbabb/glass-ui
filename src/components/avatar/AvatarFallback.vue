<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AvatarFallback as RekaAvatarFallback } from "reka-ui";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ name: "AvatarFallback", inheritAttrs: false });

// `delay-ms` is FORWARDED, not stripped. It was destructured out silently — the
// reka silent-no-op class: a caller writes `<AvatarFallback :delay-ms="600">`,
// gets no type error and no warning, and the delay simply never happens. It is
// reka's own prop, it does a real thing (hold the initials back so a fast image
// never flashes them), and there was no reason on record for the strip.
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <!--
      CONTRACT FENCE (S8). `MIGRATION.md:121` is the published record: "Use the
      single decorative reserved-shape recipe. Put `aria-busy` and the loading
      name on the owning region." The initials are a DUPLICATE of the identity the
      parent already announces, so they are hidden here unconditionally rather
      than left to whatever a caller happens to pass.
    -->
    <RekaAvatarFallback
        v-bind="forwardedAttrs"
        class="avatar__fallback"
        aria-hidden="true"
    >
        <slot />
    </RekaAvatarFallback>
</template>
