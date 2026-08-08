<script setup lang="ts">
import { computed, useAttrs, type ImgHTMLAttributes } from "vue";
import { AvatarImage as RekaAvatarImage } from "reka-ui";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ name: "AvatarImage", inheritAttrs: false });

interface AvatarImageProps {
    src: string;
    referrerPolicy?: ImgHTMLAttributes["referrerpolicy"];
    crossOrigin?: ImgHTMLAttributes["crossorigin"];
}

// THE LOAD-STATE SURFACE IS DELETED (D20). `data-image-state`, the
// `loadingStatusChange` emit and the `AvatarImageStatus` type published a
// four-state machine with ZERO readers and ZERO listeners across six repos —
// no stylesheet keyed the attribute, no consumer bound the emit. The state was
// tracked, stamped and announced for nobody. reka still owns the real load
// lifecycle internally, which is what swaps image for fallback; this was a
// mirror of it, published.
const props = defineProps<AvatarImageProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <RekaAvatarImage
        v-bind="{ ...forwardedAttrs, ...props, alt: '', 'aria-hidden': true }"
        class="avatar__image"
    />
</template>
