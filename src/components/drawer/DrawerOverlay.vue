<script lang="ts" setup>
// The scrim on the HOUSE reka `DialogOverlay` (off vaul's).
// The scrim utility classes are PRESERVED byte-for-byte; only the underlying
// component identity changes (vaul → reka). The `showOverlay:false` live-behind
// opt-out is the content's `v-if` over this overlay (no paint, page-interactive).
import { DialogOverlay as RekaDialogOverlay } from "reka-ui";
import { type HtmlHTMLAttributes, onBeforeUnmount, ref, watch } from "vue";
import { cn } from "../_shared/class-names";
import { useOptionalDrawerSnapContext } from "./composables/drawerSnapContext";

export interface DrawerOverlayProps {
    forceMount?: boolean;
    class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<DrawerOverlayProps>();

const snapContext = useOptionalDrawerSnapContext();
const overlayAnchorEl = ref<HTMLElement | null>(null);
let registeredScrim: HTMLElement | null = null;
watch(
    overlayAnchorEl,
    (anchor) => {
        if (!snapContext) return;
        registeredScrim = anchor?.parentElement ?? null;
        snapContext.scrimEl.value = registeredScrim;
    },
    { immediate: true, flush: "post" },
);
onBeforeUnmount(() => {
    if (snapContext?.scrimEl.value === registeredScrim)
        snapContext.scrimEl.value = null;
});
</script>

<template>
    <!-- The scrim DEEPENS with the detent (coupling B). The
       `data-stage-scrim` attr routes the α onto the `--stage-t`-tracked recipe
       (drawer.css) off the fixed `bg-overlay-scrim-strong` — a peek drawer barely
       dims, a full drawer commits hard. The warm `--overlay-scrim-ink` hue is kept
       (warm, never flat black); only the α is now t-coupled. The wash blur stays the
       resting floor; `immersive` (coupling D) selects one fixed deeper blur when
       `data-stage-immersive` is gated on (Drawer.vue). Its radius never ramps with
       the detent scalar. -->
    <RekaDialogOverlay
        v-bind="{
            forceMount: props.forceMount,
            inert: snapContext && !snapContext.open.value ? '' : undefined,
        }"
        data-stage-scrim
        :class="
            cn(
                'fixed inset-0 z-overlay [backdrop-filter:var(--glass-blur-wash)]',
                props.class,
            )
        "
    >
        <span ref="overlayAnchorEl" hidden />
    </RekaDialogOverlay>
</template>
