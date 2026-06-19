<script setup lang="ts">
/**
 * SplitChars — the component face of the per-glyph split. It renders the `text`
 * prop into per-glyph `.char` spans (each carrying `--char-index`), wraps them in
 * the shipped `.char-stagger` host (so the library CSS staggers them into a
 * kinetic entrance on the per-spring `--spring-smooth` clock), and — by
 * construction — keeps the word as ONE accessible name: the wrapper carries
 * `aria-label="{text}"`, every glyph span is `aria-hidden`. AT hears "Fourier",
 * never the spell-out.
 *
 * Usage:
 *   <SplitChars text="Fourier" />
 *   <SplitChars text="Hello World" by="word" as="h1" />
 *
 * The `text` PROP is the single source for BOTH the split AND the label — there
 * is NO default slot (a slot would split arbitrary markup, so the accessible name
 * would be ambiguous). The split re-runs on a `text` change (the watcher →
 * `split()`). Engine-free: it composes `useCharStagger` (vue-only) + the shipped
 * CSS; it adds NO animation engine and NO PRM logic (it inherits the recipe's
 * carve — the split is structural, only the CSS `fade-in` is PRM-gated).
 */
import {
    computed,
    ref,
    watch,
    type Component,
    type ComponentPublicInstance,
    type HTMLAttributes,
} from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../../utils";
import {
    useCharStagger,
    type UseCharStaggerOptions,
} from "../../../composables/motion/useCharStagger";

const props = withDefaults(
    defineProps<{
        /** The word to split — REQUIRED. It is the single source for both the
         *  per-glyph split AND the accessible label (the load-bearing a11y fact). */
        text: string;
        /** The split unit. Default `"char"`. */
        by?: UseCharStaggerOptions["by"];
        /** Host tag/component (reka-ui Primitive `as`; default `"span"`) — set
         *  `as="h1"` to render the kinetic word as a heading. */
        as?: string | Component;
        class?: HTMLAttributes["class"];
    }>(),
    { by: "char", as: "span" },
);

// The DOM host. `<Primitive>` is a component, so a plain `ref` captures its
// public instance — a function ref unwraps the rendered element (`$el`) so the
// composable mutates the real node (the reka `Primitive` forwards its host el).
const root = ref<HTMLElement | null>(null);
function setRoot(el: Element | ComponentPublicInstance | null): void {
    root.value =
        el == null
            ? null
            : (((el as ComponentPublicInstance).$el ?? el) as HTMLElement);
}

// A live-`by` option bag — the composable reads `opts.by` at split time, so this
// getter keeps the split unit tracking the prop across a `by` flip.
const { split } = useCharStagger(root, {
    get by() {
        return props.by;
    },
});

// The host text is OWNED by the composable (it `replaceChildren`s the node with
// the glyph spans), so the template must NOT reactively interpolate `text` — a
// reactive text node would fight the manual DOM mutation on every change. The
// initial text is seeded ONCE (the captured value); every later change flows
// through the watcher → set host text → re-split (the single writer).
const initialText = props.text;

// Re-split on a `text` (or `by`) change — restore the word onto the host before
// re-minting, so the spans never accrete (the composable's idempotent re-split).
watch(
    () => [props.text, props.by],
    ([text]) => {
        if (root.value) {
            root.value.textContent = text;
            split();
        }
    },
);

const hostClass = computed(() => cn("char-stagger", props.class));
</script>

<template>
    <Primitive
        :ref="setRoot"
        :as="props.as"
        :class="hostClass"
        :aria-label="props.text"
        >{{ initialText }}</Primitive
    >
</template>
