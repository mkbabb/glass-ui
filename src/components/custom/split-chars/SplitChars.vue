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
        /**
         * Whether to compose the shipped `.char-stagger` host recipe (default
         * `true` → byte-identical to the historical behaviour). Set `false` to
         * DROP `.char-stagger` so the recipe's mount-bound `fade-in` never fires
         * — the load-bearing reason is "no mount-fire-before-reveal": when a
         * caller owns the entrance itself (an IntersectionObserver-gated reveal,
         * a replay harness), the `.char-stagger` `animation: fade-in … backwards`
         * that binds on MOUNT would flash the glyphs in before the caller's
         * reveal claims them. `:stagger=false` yields the bare `.char` spans
         * (still carrying `--char-index`/`--char-total`) so the caller's own CSS
         * owns the per-glyph entrance. The word stays ONE accessible name either
         * way (the a11y contract is on the wrapper, not the recipe class). */
        stagger?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    { by: "char", as: "span", stagger: true },
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

// `.char-stagger` composes the shipped mount-bound `fade-in` recipe; a caller
// that owns the entrance (an IO-gated reveal) drops it via `:stagger=false` so
// the recipe never fires before the reveal claims the glyphs. The `.char` spans
// + `--char-index` are minted by `useCharStagger` regardless — only the recipe
// CLASS is conditional (the split is structural, the animation is opt-out).
const hostClass = computed(() =>
    cn(props.stagger && "char-stagger", props.class),
);

// The wrapper binds `aria-label="{text}"` so the split word keeps ONE accessible
// name (the glyph spans are aria-hidden). But `aria-label` on a role-LESS generic
// element (the default `span`, a `div`, a `p`) is an ARIA-in-HTML violation
// (`aria-prohibited-attr`): a generic element bears no name from author, so AT
// support for the label is undefined. `role="img"` makes the labeled wrapper a
// name-bearing element — the accessible-name-bearing role for a graphic-of-text
// whose visual children are decorative — so the label + the hidden glyphs compose
// ONE spec-valid accessible name. This is the StatusDot conditional-role idiom
// (`role="img"` only when a name is bound), extended to honour `as`: a consumer
// that overrides `as` to an element that ALREADY bears a name from author (a
// heading, a link, a button, an <img>) keeps that native role — the role is not
// force-added and its semantics are not clobbered — and a custom Component `as`
// owns its own accessibility. Only a role-less string host is force-roled, and
// only when an accessible name is actually present.
const NAME_BEARING_HOSTS = new Set([
    "a",
    "button",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "img",
    "label",
    "output",
]);
const hostRole = computed<"img" | undefined>(() => {
    if (!props.text) return undefined; // no accessible name → nothing to make valid
    if (typeof props.as !== "string") return undefined; // a Component owns its own role
    return NAME_BEARING_HOSTS.has(props.as.toLowerCase()) ? undefined : "img";
});
</script>

<template>
    <Primitive
        :ref="setRoot"
        :as="props.as"
        :class="hostClass"
        :role="hostRole"
        :aria-label="props.text"
        >{{ initialText }}</Primitive
    >
</template>
