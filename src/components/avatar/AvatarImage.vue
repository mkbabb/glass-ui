<script setup lang="ts">
import { computed, ref, useAttrs, type ImgHTMLAttributes } from "vue";
import { AvatarImage as RekaAvatarImage } from "reka-ui";

defineOptions({ name: "AvatarImage", inheritAttrs: false });

interface AvatarImageProps {
    src: string;
    referrerPolicy?: ImgHTMLAttributes["referrerpolicy"];
    crossOrigin?: ImgHTMLAttributes["crossorigin"];
}
type AvatarImageStatus = "idle" | "loading" | "loaded" | "error";

const props = defineProps<AvatarImageProps>();
const attrs = useAttrs();
const emit = defineEmits<{
    loadingStatusChange: [status: AvatarImageStatus];
}>();
const status = ref<AvatarImageStatus>("idle");
const forwardedAttrs = computed(() => {
    const {
        as: _as,
        asChild: _asChild,
        "as-child": _asChildKebab,
        ...forwarded
    } = attrs;
    return forwarded;
});

function updateStatus(next: AvatarImageStatus): void {
    status.value = next;
    emit("loadingStatusChange", next);
}
</script>

<template>
    <RekaAvatarImage
        v-bind="{ ...forwardedAttrs, ...props, alt: '', 'aria-hidden': true }"
        class="glass-avatar__image"
        :data-image-state="status"
        @loading-status-change="updateStatus"
    />
</template>
