<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { computed, ref } from "vue";
import {
    useVirtualSectionWindow,
    type FlatSection,
} from "@glass/composables/virtual";
import { Badge } from "@glass/components/ui/badge";
import { cn } from "@glass/utils/cn";

// A 1000-section synthetic document. The producer (this flattener) lives in the
// consumer; glass-ui owns only the generic FlatSection windowing contract. The
// re-homed windowing engine renders only the ~20 sections near the viewport.
const TOTAL = 1000;
const TONES = ["0", "2", "3", "4", "5", "7", "8", "11"];

interface DemoSection extends FlatSection {
    title: string;
    body: string;
    tone: string;
}

const sections: DemoSection[] = Array.from({ length: TOTAL }, (_, i) => ({
    id: `section-${i}`,
    index: i,
    depth: i % 3,
    parentId: i % 3 === 0 ? null : `section-${i - (i % 3)}`,
    rootId: `section-${i - (i % 3)}`,
    rootIndex: Math.floor(i / 3),
    // Varied estimated heights so spacers + offsets are non-uniform.
    estimatedHeight: 88 + ((i * 13) % 64),
    title: `Section ${i} — ${["Overview", "Method", "Result", "Discussion"][i % 4]}`,
    body: `Synthetic paragraph for section ${i}. Only the sections near the viewport are in the DOM; the spacer divs above and below hold the full scroll height so the scrollbar is honest.`,
    tone: TONES[i % TONES.length]!,
}));

const scrollContainer = ref<HTMLElement | null>(null);

const {
    visibleItems,
    topSpacerPx,
    bottomSpacerPx,
    measureSection,
    ensureTargetWindow,
    getOffsetFor,
    activeId,
} = useVirtualSectionWindow<DemoSection>({
    items: sections,
    scrollContainer,
});

// Readbacks the π / DELTA capture asserts against.
const renderedCount = computed(() => visibleItems.value.length);
const jumpTargetId = ref("section-850");

function scrollToTarget() {
    const id = jumpTargetId.value;
    // Warm the target into the render window a beat before the scroll lands so
    // it is painted-and-measured when the scroll arrives (never a blank target).
    ensureTargetWindow(id);
    requestAnimationFrame(() => {
        const offset = getOffsetFor(id);
        const el = scrollContainer.value;
        if (offset != null && el) el.scrollTo({ top: offset, behavior: "smooth" });
    });
}
</script>

<template>
    <StoryPage>
        <div class="flex flex-wrap items-end justify-between gap-4">
            <StorySection
                label="Virtual section window"
                :heading="`${TOTAL}-section document — only the window renders`"
            />
            <!-- CBA-3: the window readout is a FEATURE caption (the windowing is the
                 story), not a test hook — only ~20 of 1000 sections live in the DOM at
                 once, and the active id is the live scroll-spy. -->
            <div class="flex items-center gap-3">
                <Badge variant="outline" class="fira-code">
                    {{ renderedCount }} of {{ TOTAL }} rendered
                </Badge>
                <Badge variant="outline" class="fira-code">
                    active · {{ activeId ?? "—" }}
                </Badge>
                <button
                    type="button"
                    class="interactive-item rounded-md border border-border bg-background px-3 py-1.5 text-small shadow-cartoon-sm"
                    @click="scrollToTarget"
                >
                    Jump to {{ jumpTargetId }}
                </button>
            </div>
        </div>

        <!-- The scroll container drives the window; the spacer divs hold the
             full height so the scrollbar reflects all 1000 sections. -->
        <div
            ref="scrollContainer"
            :class="
                cn(
                    'relative max-h-[32rem] overflow-y-auto rounded-card border border-border bg-card shadow-cartoon',
                )
            "
        >
            <!-- top spacer -->
            <div :style="{ height: `${topSpacerPx}px` }" aria-hidden="true" />

            <div class="flex flex-col divide-y divide-border">
                <article
                    v-for="item in visibleItems"
                    :key="item.id"
                    :ref="(el) => measureSection(item.id, el as HTMLElement | null)"
                    :data-section-id="item.id"
                    class="virtual-section interactive-item flex gap-4 px-4 py-4"
                    :style="{ paddingLeft: `${1 + item.depth * 1.25}rem` }"
                >
                    <span
                        class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                        :style="{ background: `var(--section-color-${item.tone})` }"
                    />
                    <div class="flex min-w-0 flex-1 flex-col gap-1">
                        <span class="text-small font-medium">{{ item.title }}</span>
                        <span class="text-muted-foreground text-caption">
                            {{ item.body }}
                        </span>
                        <span class="text-mono-caption text-muted-foreground">
                            #{{ item.index }} · depth {{ item.depth }}
                        </span>
                    </div>
                </article>
            </div>

            <!-- bottom spacer -->
            <div :style="{ height: `${bottomSpacerPx}px` }" aria-hidden="true" />
        </div>
    </StoryPage>
</template>
