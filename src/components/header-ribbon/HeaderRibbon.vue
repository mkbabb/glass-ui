<script setup lang="ts">
import { computed, ref, useAttrs, useId, watch } from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { Surface } from "../surface";
import type {
    HeaderRibbonAnchorSlotProps,
    HeaderRibbonCollapsibleProps,
    HeaderRibbonPersistentProps,
} from "./types";

defineOptions({ inheritAttrs: false });

const props = defineProps<
    HeaderRibbonPersistentProps | HeaderRibbonCollapsibleProps
>();
defineSlots<{
    anchor?(props: HeaderRibbonAnchorSlotProps): unknown;
    items?(): unknown;
}>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
const actionsId = `${useId()}-actions`;
const anchor = ref<HTMLButtonElement | null>(null);
const isPinned = ref(false);
const isPointerWithin = ref(false);
const isFocusWithin = ref(false);
const placement = computed(() => props.placement ?? "left");
const ariaLabel = computed(() => props.ariaLabel?.trim() || "Header actions");
const anchorLabel = computed(() => props.anchorLabel?.trim());
const isCollapsible = computed(
    () => props.mode === "collapsible" && Boolean(anchorLabel.value),
);
const isVisible = computed(
    () =>
        !isCollapsible.value ||
        isPinned.value ||
        isPointerWithin.value ||
        isFocusWithin.value,
);

watch(
    [() => props.mode, () => Boolean(props.anchorLabel?.trim())] as const,
    ([mode, hasLabel], previous) => {
        const wasCollapsible =
            previous?.[0] === "collapsible" && previous[1] === true;
        const willBeCollapsible = mode === "collapsible" && hasLabel;

        if (
            wasCollapsible &&
            !willBeCollapsible &&
            typeof document !== "undefined" &&
            anchor.value?.contains(document.activeElement)
        ) {
            isFocusWithin.value = false;
        }
        isPinned.value = false;

        if (import.meta.env.DEV && mode === "collapsible" && !hasLabel) {
            console.warn(
                "[HeaderRibbon] `mode=\"collapsible\"` requires a non-empty `anchorLabel`; rendering persistent actions.",
            );
        }
    },
    { flush: "pre", immediate: true },
);

function onPointerEnter(event: PointerEvent): void {
    if (event.pointerType !== "touch") isPointerWithin.value = true;
}

function onPointerLeave(): void {
    isPointerWithin.value = false;
}

function onFocusIn(): void {
    isFocusWithin.value = true;
}

function onFocusOut(event: FocusEvent): void {
    const root = event.currentTarget as HTMLElement;
    if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget))
        return;
    isFocusWithin.value = false;
}

function togglePinned(): void {
    if (!isCollapsible.value) return;
    isPinned.value = !isPinned.value;
}

function closeAndReturnFocus(event: KeyboardEvent): void {
    if (!isCollapsible.value) return;
    event.stopPropagation();
    event.preventDefault();
    isPinned.value = false;
    isPointerWithin.value = false;
    anchor.value?.focus();
}
</script>

<template>
    <div
        v-bind="forwardedAttrs"
        :class="cn('header-ribbon', props.class)"
        :data-placement="placement"
        :data-expanded="isVisible || undefined"
        :data-pinned="isPinned || undefined"
        data-slot="header-ribbon"
        role="toolbar"
        :aria-label="ariaLabel"
        @pointerenter="onPointerEnter"
        @pointerleave="onPointerLeave"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @keydown.esc="closeAndReturnFocus"
    >
        <Surface
            class="header-ribbon__band"
            material="functional"
            surface="glass"
            specular="subtle"
        >
            <button
                v-if="isCollapsible"
                ref="anchor"
                type="button"
                class="header-ribbon__anchor"
                data-slot="header-ribbon-anchor"
                :aria-label="anchorLabel"
                :aria-controls="actionsId"
                :aria-expanded="isVisible"
                :aria-pressed="isPinned"
                @click="togglePinned"
            >
                <slot name="anchor" :pinned="isPinned" />
            </button>

            <div
                :id="actionsId"
                class="header-ribbon__actions"
                data-slot="header-ribbon-actions"
                :inert="!isVisible || undefined"
                :aria-hidden="!isVisible"
            >
                <slot name="items" />
            </div>
        </Surface>
    </div>
</template>
