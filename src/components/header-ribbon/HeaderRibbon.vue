<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { Surface } from "../surface";
import type { HeaderRibbonProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = defineProps<HeaderRibbonProps>();
defineSlots<{ items?(): unknown }>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
const placement = computed(() => props.placement ?? "left");
const ariaLabel = computed(() => props.ariaLabel?.trim() || "Header actions");
</script>

<template>
    <div
        v-bind="forwardedAttrs"
        :class="cn('header-ribbon', props.class)"
        :data-placement="placement"
        data-slot="header-ribbon"
        role="toolbar"
        :aria-label="ariaLabel"
    >
        <Surface
            class="header-ribbon__band"
            material="functional"
            surface="glass"
            specular="subtle"
        >
            <div class="header-ribbon__actions" data-slot="header-ribbon-actions">
                <slot name="items" />
            </div>
        </Surface>
    </div>
</template>
