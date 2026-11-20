<script setup lang="ts">
// StoryCode: the page's one usage snippet, closed by default under "Code". The
// disclosure opens and closes by the library Collapsible's own tween. The code face
// loads when "Code" is first pointed at, focused or pressed. Its arrival restyles the
// page in WebKit, one long frame, and a long frame inside the open lands much of it in
// one step; so the first open waits for the face and two frames after it.
import { ref } from "vue";
import { ChevronDown } from "@lucide/vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@glass/components/collapsible";
import CodeBlock from "./CodeBlock.vue";
import { loadCodeFace } from "./code-face";

defineProps<{ code: string; lang?: string }>();

const open = ref(false);
let ready: Promise<unknown> | undefined;
function prepare(): Promise<unknown> {
    ready ??= loadCodeFace().then(
        () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))),
    );
    return ready;
}
async function setOpen(next: boolean): Promise<void> {
    if (next) await prepare();
    open.value = next;
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
        <CollapsibleContent>
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
