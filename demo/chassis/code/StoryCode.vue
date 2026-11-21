<script setup lang="ts">
// StoryCode: the page's one usage snippet, closed by default under "Code". The
// disclosure opens and closes by the library Collapsible's own tween. The code face and
// the highlighter load when "Code" is first pointed at, focused or pressed, and the
// first open waits for both, so neither lands inside the travel (the face's arrival
// restyles the page in WebKit; the highlighter recolours the code). The frame that
// first lays out, colours and paints the code is long, so each open holds the tween at
// its start until two frames have begun since the content went in.
import { ref } from "vue";
import { ChevronDown } from "@lucide/vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@glass/components/collapsible";
import CodeBlock from "./CodeBlock.vue";
import { loadCodeFace } from "./code-face";
import { loadHljs } from "./useCodeHighlight";

defineProps<{ code: string; lang?: string }>();

const open = ref(false);
const held = ref(false);
const prepare = (): Promise<unknown> => Promise.all([loadCodeFace(), loadHljs().catch(() => undefined)]);
async function setOpen(next: boolean): Promise<void> {
    if (next) await prepare();
    open.value = held.value = next;
    if (next) requestAnimationFrame(() => requestAnimationFrame(() => (held.value = false)));
}
</script>

<template>
    <Collapsible :open="open" class="story-code" data-story-code @update:open="setOpen">
        <CollapsibleTrigger
            class="story-code-trigger focus-ring interactive-item transition-control"
            @pointerenter="prepare"
            @focus="prepare"
        >
            Code
            <span class="story-code-chevron" :data-open="open || undefined" aria-hidden="true">
                <ChevronDown class="h-4 w-4" />
            </span>
        </CollapsibleTrigger>
        <CollapsibleContent :style="held ? { animationPlayState: 'paused' } : undefined">
            <CodeBlock :code="code" :lang="lang ?? 'vue'" />
        </CollapsibleContent>
    </Collapsible>
</template>

<style scoped>
.story-code-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding-block: 0.25rem;
    font-size: var(--text-small, 0.875rem);
    color: var(--foreground);
}
.story-code-chevron {
    display: inline-flex;
    transition: rotate var(--duration-fast) var(--ease-out);
}
.story-code-chevron[data-open] {
    rotate: 180deg;
}
</style>
