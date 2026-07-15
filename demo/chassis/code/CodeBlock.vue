<script setup lang="ts">
// CodeBlock — the multi-line code rung of the ONE demo code register
// (BC.W-CODE-BLOCKS).
//
// A real fenced block for import snippets + multi-line examples: a
// `<pre class="fira-code">` on a GLASS-QUIET plate (the rebuilt W55 tint seam —
// it darkens-over-bright / lifts-over-dark in lockstep via `.glass-quiet`, NOT a
// flat grey slab; the D1 grey-slab regression cannot re-enter through the
// code-block plate). The golden padding ladder (`--card-pad-inline` /
// `--card-pad-block`, declared the <Card> bracket-calc way — NOT a hand-rolled
// `p-4`), a `rounded-card` corner (the rounded-everywhere bar), and a
// copy-to-clipboard affordance (a ghost copy button writing the slot/code text
// via the native `navigator.clipboard` — KISS, no library dep). The
// copy-feedback flash rides the §6 `--ease-standard` opacity (PRM-collapsed;
// otherwise the block is animation-free → PRM-safe by construction). Ligatures
// live (`fira-code` carries liga/calt).
//
// The per-page import subpath (`@mkbabb/glass-ui/<sp>`) + every multi-line
// example renders through this — a real, copy-able, Fira-Code code block, not
// prose. A demo-private chassis primitive — NOT a library export (the
// <StorySection> / <ShowcaseFrame> precedent).
import { computed, ref, toRef, useSlots } from "vue";
import { Check, Copy } from "@lucide/vue";
import { cn } from "@glass/components/_shared/class-names";
import { FadingScroll } from "@glass/components/fading-scroll";
import { useCodeHighlight } from "./useCodeHighlight";
// The warm-crayon highlight.js theme — GLOBAL (unscoped) so it reaches the
// `.hljs-*` spans highlight.js writes into the <pre> innerHTML at runtime.
import "./hljs-house-theme.css";

interface CodeBlockProps {
    /** The literal code string. XOR the default slot (the slot wins when both). */
    code?: string;
    /** A decorative language label chip (top-left). Optional. */
    lang?: string;
    /** Forwarded class string (merged via `cn`). */
    class?: string;
}

const props = defineProps<CodeBlockProps>();
const slots = useSlots();

// The text the copy affordance writes — the explicit `code` prop, else the
// default slot's text content (resolved at copy time off the rendered <pre>).
const preRef = ref<HTMLElement | null>(null);
const copied = ref(false);

const hasSlot = computed(() => Boolean(slots.default));

// Lazy highlight.js swaps in the `.hljs-*` crayon spans once its chunk resolves.
// The raw fira-code text paints from frame 0 (Vue renders it) — highlighting is
// deferred COLOR, never deferred content (a dead chunk leaves legible mono).
useCodeHighlight(preRef, {
    lang: toRef(props, "lang"),
    text: () => props.code ?? preRef.value?.textContent ?? "",
});

async function copy(): Promise<void> {
    const text = props.code ?? preRef.value?.textContent ?? "";
    try {
        await navigator.clipboard.writeText(text.trim());
        copied.value = true;
        setTimeout(() => (copied.value = false), 1400);
    } catch {
        /* clipboard unavailable */
    }
}
</script>

<template>
    <!-- The golden padding ladder is declared the <Card> bracket-calc way — the
         `--card-pad-*` family the golden card register mints, here scoped to the
         code-block (so `--card-pad-inline`/`--card-pad-block` resolve on THIS
         element, NOT a hand-rolled `p-4`). The plate is `.glass-quiet` so it
         reads the W55 tint seam (translucent-warm, darkens-over-bright). -->
    <div
        :class="
            cn(
                'story-code-block',
                'glass-quiet rounded-card',
                '[--card-pad-inline:--spacing(5)] [--card-pad-block:calc(var(--card-pad-inline)*1.272)]',
                props.class,
            )
        "
    >
        <!-- The decorative language label chip (mono-caption register). -->
        <span v-if="lang" class="story-code-block-lang text-mono-caption">{{
            lang
        }}</span>

        <!-- The copy affordance — a ghost button in the top-right (the springs.vue
             demo copy idiom). The feedback flash is the Check glyph swap. -->
        <button
            type="button"
            class="story-code-block-copy"
            :aria-label="copied ? 'Copied' : 'Copy code'"
            @click="copy"
        >
            <Check v-if="copied" class="size-4 text-foreground" />
            <Copy v-else class="size-4" />
        </button>

        <!-- The real fenced block — fira-code, the literal text. The slot wins;
             else the `code` prop string. The <FadingScroll> port owns the
             horizontal overflow + the edge feather cue (a long line scrolls, never
             wraps mid-identifier); the prose-measure cap keeps the block readable. -->
        <FadingScroll axis="x" class="story-code-block-scroll">
            <pre
                ref="preRef"
                class="story-code-block-pre fira-code"
            ><slot v-if="hasSlot" />{{ hasSlot ? "" : code }}</pre>
        </FadingScroll>
    </div>
</template>

<style scoped>
/* The code-block plate. The glass material (translucency, blur, tint seam) is the
   `.glass-quiet` class on the root — this scoped block owns only the LAYOUT (the
   golden padding consumed off the bracket-declared --card-pad-* family, the
   relative positioning for the copy/lang chips, the <pre> reset). No glass fork. */
.story-code-block {
    position: relative;
    padding-inline: var(--card-pad-inline);
    padding-block: var(--card-pad-block);
    overflow: hidden;
}

/* The scroll port (the <FadingScroll> root) owns the horizontal overflow + the
   per-edge feather cue. The prose-measure cap keeps the code column readable —
   a code block is not a full-bleed banner. */
.story-code-block-scroll {
    max-inline-size: 42rem;
}

.story-code-block-pre {
    margin: 0;
    /* The literal text — warm ink, fira-code (the @utility on the element). A long
       line SCROLLS (the <FadingScroll> port), never wraps mid-identifier: `pre`,
       not `pre-wrap` (a wrapped long identifier is worse than a scroll cue). */
    color: var(--foreground);
    font-size: var(--type-small, 0.875rem);
    line-height: var(--type-leading-small, 1.5);
    white-space: pre;
    /* Leave room for the copy button so a long first line never collides at rest. */
    padding-inline-end: 2rem;
    /* The block is the intrinsic content width so the port can scroll it. */
    inline-size: max-content;
}

.story-code-block-lang {
    display: block;
    margin-block-end: 0.5rem;
    color: var(--muted-foreground);
}

/* The ghost copy button — top-right, the springs.vue copy-affordance register. */
.story-code-block-copy {
    position: absolute;
    inset-block-start: var(--card-pad-inline);
    inset-inline-end: var(--card-pad-inline);
    padding: 0.375rem;
    border-radius: var(--radius-pill, 9999px);
    color: var(--muted-foreground);
    /* The feedback flash rides the §6 EFFECTS register (a bezier color/opacity
       cross-fade) — PRM-collapsed by the universal a11y carve. */
    transition:
        color var(--duration-fast, 150ms) var(--ease-standard, ease),
        background-color var(--duration-fast, 150ms) var(--ease-standard, ease);
}

.story-code-block-copy:hover {
    color: var(--foreground);
    background: var(--surface-tint-8);
}
</style>
