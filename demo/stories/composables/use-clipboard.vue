<script setup lang="ts">
// useClipboard — reactive clipboard with auto-resetting `copied` flag.
//
// The composable wraps `navigator.clipboard.writeText` with an
// `execCommand("copy")` legacy fallback, then flips a Vue ref that auto-
// resets after `resetMs`. Demo shows the canonical "copy → confirm → reset"
// loop plus a `resetMs` ladder so consumers see the timing knob.
import { ref } from "vue";
import { Check, Copy } from "@lucide/vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { useClipboard } from "../../../src/composables/dom/useClipboard";

// Canonical (default 1500ms reset).
const { copied: copiedDefault, copy: copyDefault } = useClipboard();

// Slow-reset variant for paired toast feedback.
const { copied: copiedSlow, copy: copySlow } = useClipboard({ resetMs: 2500 });

// Snappy-reset variant for dense inline-copy lists.
const { copied: copiedFast, copy: copyFast } = useClipboard({ resetMs: 600 });

const sample = ref("hsl(var(--primary) / 0.85)");
</script>

<template>
    <StoryPage>
        <StorySection
            label="canonical copy / confirm / reset"
            blurb="Click the button to copy. The `copied` ref flips true for 1500ms (default), then auto-resets. The cleanup timer is scope-aware — unmounting mid-window leaks nothing."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-3">
                    <code class="fira-code text-mono-caption text-foreground bg-muted px-2 py-1 rounded w-fit">
                        {{ sample }}
                    </code>
                    <div class="flex items-center gap-2">
                        <Button @click="copyDefault(sample)">
                            <Check v-if="copiedDefault" class="h-4 w-4" />
                            <Copy v-else class="h-4 w-4" />
                            {{ copiedDefault ? "Copied" : "Copy" }}
                        </Button>
                        <span class="text-mono-caption text-muted-foreground">
                            copied = {{ copiedDefault }}
                        </span>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="resetMs ladder"
            blurb="Two timing knobs side-by-side. 600ms snappy reset reads as 'flash'; 2500ms slow reset pairs with a sibling toast that wants to outlast the confirmation chip."
        >
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ShowcaseFrame pad="md">
                    <div class="flex flex-col gap-2">
                        <p class="text-mono-caption text-muted-foreground">resetMs = 600 (snappy)</p>
                        <Button variant="outline" @click="copyFast('snappy-token')">
                            <Check v-if="copiedFast" class="h-4 w-4" />
                            <Copy v-else class="h-4 w-4" />
                            {{ copiedFast ? "Copied" : "Copy fast" }}
                        </Button>
                    </div>
                </ShowcaseFrame>
                <ShowcaseFrame pad="md">
                    <div class="flex flex-col gap-2">
                        <p class="text-mono-caption text-muted-foreground">resetMs = 2500 (slow)</p>
                        <Button variant="outline" @click="copySlow('slow-token')">
                            <Check v-if="copiedSlow" class="h-4 w-4" />
                            <Copy v-else class="h-4 w-4" />
                            {{ copiedSlow ? "Copied" : "Copy slow" }}
                        </Button>
                    </div>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            label="API surface"
            blurb="Single options bag plus a returned `{ copied, copy }` pair."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <ul class="text-prose text-muted-foreground list-disc pl-5 space-y-1">
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">copied: Ref&lt;boolean&gt;</code>
                        — flips on successful copy, auto-resets after <code class="fira-code">resetMs</code>.
                    </li>
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">copy(text): Promise&lt;boolean&gt;</code>
                        — returns the success boolean (false on SSR or denied permission).
                    </li>
                    <li>
                        Uses <code class="fira-code bg-muted px-1 rounded">navigator.clipboard.writeText</code>
                        with <code class="fira-code">execCommand("copy")</code> fallback.
                    </li>
                </ul>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
