<script setup lang="ts">
// StoryCode: the page's one usage snippet, closed by default under "Code". The
// disclosure opens and closes by the library Collapsible's own tween.
import { ChevronDown } from "@lucide/vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@glass/components/collapsible";
import CodeBlock from "./CodeBlock.vue";

defineProps<{ code: string; lang?: string }>();
</script>

<template>
    <Collapsible v-slot="{ open }" class="story-code" data-story-code>
        <CollapsibleTrigger
            class="story-code-trigger focus-ring interactive-item transition-control"
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
