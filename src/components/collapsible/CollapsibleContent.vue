<script setup lang="ts">
import {
    computed,
    onMounted,
    ref,
    useAttrs,
    watch,
    type HTMLAttributes,
} from "vue";
import { injectCollapsibleRootContext } from "reka-ui";
import { cn } from "../_shared/class-names";
import { useDisclosureIds } from "../_shared/disclosure/disclosure-context";
import { useReducedMotion } from "../../composables/motion/core/useReducedMotion";

export interface CollapsibleContentProps {
    /** Keep the region mounted while closed, for measurement or external animation. */
    forceMount?: boolean;
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "CollapsibleContent", inheritAttrs: false });

const props = withDefaults(defineProps<CollapsibleContentProps>(), {
    forceMount: false,
});
defineSlots<{ default?: () => unknown }>();

const ids = useDisclosureIds();
const rootContext = injectCollapsibleRootContext();
rootContext.contentId = ids.content;

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const {
        as: _as,
        asChild: _asChild,
        "as-child": _asChildKebab,
        ...forwarded
    } = attrs;
    return forwarded;
});

/* ── THE HEIGHT ENGINE ──────────────────────────────────────────────────────────────
   The region's height is its grid row, `0fr` closed and `1fr` open, transitioned on the
   `present` spring (disclosure.css). Nothing is measured: the row resolves to the
   content's own height, and a transition starts from the current computed value, so a
   press mid-flight turns the motion around where it stands. The content is laid out at
   its final size inside the clip, and only the edge travels; there is no fade.

   The region mounts as it opens and unmounts when its close has finished (`shut`),
   unless `forceMount` keeps it. `data-state` is withheld on the first render of an
   initially open region, so a page never animates what it loads open. */
const open = computed(() => rootContext.open.value);
const shut = ref(!open.value);
const settled = ref(!open.value);
const reduced = useReducedMotion();

onMounted(() => {
    requestAnimationFrame(() => {
        settled.value = true;
    });
});

watch(open, (isOpen) => {
    settled.value = true;
    if (isOpen) shut.value = false;
    else if (reduced.value) shut.value = true;
});

function onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName === "grid-template-rows" && !open.value) shut.value = true;
}

const rendered = computed(() => props.forceMount || !shut.value);
</script>

<template>
    <div
        v-bind="forwardedAttrs"
        :id="ids.content"
        data-slot="collapsible-content"
        data-disclosure="collapsible"
        role="region"
        :aria-labelledby="ids.trigger"
        :data-state="settled ? (open ? 'open' : 'closed') : undefined"
        :data-disabled="rootContext.disabled?.value ? '' : undefined"
        :hidden="!rendered || undefined"
        :inert="!open || undefined"
        :class="cn('disclosure-content', props.class)"
        @transitionend="onTransitionEnd"
    >
        <div class="disclosure-content-clip">
            <slot v-if="rendered" />
        </div>
    </div>
</template>
