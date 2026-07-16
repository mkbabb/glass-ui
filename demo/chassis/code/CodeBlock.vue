<script setup lang="ts">
// Demo-private, copyable code block. Card owns the plate and spacing; Button owns
// the copy command; FadingScroll owns overflow.
import { computed, onMounted, onUpdated, ref, toRef, useSlots } from "vue";
import { Check, Copy } from "@lucide/vue";
import { cn } from "@glass/components/_shared/class-names";
import { Button } from "@glass/components/button";
import { Card, CardContent } from "@glass/components/card";
import { FadingScroll } from "@glass/components/fading-scroll";
import { useClipboard } from "@glass/composables/dom/useClipboard";
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
const { status: copyStatus, copy, invalidate: invalidateCopy } = useClipboard({
    resetMs: 1400,
});

const hasSlot = computed(() => Boolean(slots.default));

// Lazy highlight.js swaps in the `.hljs-*` crayon spans once its chunk resolves.
// The raw fira-code text paints from frame 0 (Vue renders it) — highlighting is
// deferred COLOR, never deferred content (a dead chunk leaves legible mono).
useCodeHighlight(preRef, {
    lang: toRef(props, "lang"),
    text: () => props.code ?? preRef.value?.textContent ?? "",
});

function copyText(): string {
    return (props.code ?? preRef.value?.textContent ?? "").trim();
}

function copyCode(): void {
    if (copyStatus.value === "pending") return;
    void copy(copyText());
}

const copyMessage = computed(() => {
    if (copyStatus.value === "pending") return "Copying code…";
    if (copyStatus.value === "success") return "Code copied.";
    if (copyStatus.value === "failure")
        return "Copy failed. Select the code and copy manually.";
    return "";
});

let currentPayload = "";
onMounted(() => {
    currentPayload = copyText();
});
onUpdated(() => {
    const nextPayload = copyText();
    if (nextPayload === currentPayload) return;
    currentPayload = nextPayload;
    invalidateCopy();
});
</script>

<template>
    <Card
        material="content"
        :shadow="false"
        :class="cn('story-code-block', props.class)"
    >
        <CardContent class="story-code-block-content">
            <div class="story-code-block-toolbar">
                <span v-if="lang" class="text-mono-caption">{{ lang }}</span>
                <span
                    class="story-code-block-status text-mono-caption"
                    :class="copyStatus === 'failure' ? 'text-destructive' : ''"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    >{{ copyMessage }}</span
                >
                <Button
                    emphasis="quiet"
                    size="sm"
                    icon-only
                    class="story-code-block-copy"
                    :aria-label="
                        copyStatus === 'pending'
                            ? 'Copying code'
                            : copyStatus === 'success'
                            ? 'Code copied'
                            : copyStatus === 'failure'
                              ? 'Retry copy code'
                              : 'Copy code'
                    "
                    :aria-disabled="copyStatus === 'pending' ? 'true' : undefined"
                    data-testid="code-block-copy"
                    @click="copyCode"
                >
                    <Check
                        v-if="copyStatus === 'success'"
                        class="size-4 text-foreground"
                    />
                    <Copy v-else class="size-4" />
                </Button>
            </div>

            <FadingScroll axis="x" class="story-code-block-scroll">
                <pre
                    ref="preRef"
                    class="story-code-block-pre fira-code"
                ><slot v-if="hasSlot" />{{ hasSlot ? "" : code }}</pre>
            </FadingScroll>
        </CardContent>
    </Card>
</template>

<style scoped>
.story-code-block {
    overflow: hidden;
}

.story-code-block-content {
    display: grid;
    gap: calc(var(--spacing) * 3);
}

.story-code-block-toolbar {
    display: flex;
    flex-wrap: wrap;
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    gap: calc(var(--spacing) * 2);
    color: var(--muted-foreground);
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
    /* The block is the intrinsic content width so the port can scroll it. */
    inline-size: max-content;
}

.story-code-block-copy {
    flex: none;
}

.story-code-block-status {
    margin-inline-start: auto;
    min-block-size: 1lh;
    color: var(--muted-foreground);
}
</style>
