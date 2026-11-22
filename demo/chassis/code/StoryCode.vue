<script setup lang="ts">
// StoryCode: the page's one usage snippet, closed by default under "Code". The
// disclosure opens and closes by the library Collapsible's own tween, from the press's
// frame. Pointing at "Code" or focusing it starts the code face's and the highlighter's
// loads, so they are usually in hand by the press. An open shows what had loaded by the
// press: the code face, if it had (WebKit hides text set in a face still loading for up
// to 100 ms, then shows it at once; left out, the face is in place for the next open),
// and the highlighter's colours, which otherwise come in once the open has come to rest
// (WebKit lays the highlighted code out in one long frame, a jump inside the travel).
// The colours come in over a tween (hljs-house-theme.css).
import { ref } from "vue";
import { ChevronDown } from "@lucide/vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@glass/components/collapsible";
import CodeBlock from "./CodeBlock.vue";
import { codeFaceLoaded, loadCodeFace } from "./code-face";
import { hljsLoaded, loadHljs } from "./useCodeHighlight";

defineProps<{ code: string; lang?: string }>();

const open = ref(false);
const faceIn = ref(true);
const colour = ref(true);
const FALLBACK = { "--font-mono": '"Fira Code Fallback", "Fira Mono", monospace' };
const prepare = (): void => void Promise.all([loadCodeFace(), loadHljs().catch(() => undefined)]);
function setOpen(next: boolean): void {
    if (next) {
        faceIn.value = codeFaceLoaded();
        colour.value = hljsLoaded();
    }
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
        <CollapsibleContent :style="faceIn ? undefined : FALLBACK" @animationend.self="colour = true">
            <CodeBlock :code="code" :lang="lang ?? 'vue'" :colour="colour" />
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
