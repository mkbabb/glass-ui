<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { InfiniteScroll } from "../../../src/components/custom/infinite-scroll";
import { Badge } from "../../../src/components/ui/badge";
import { cn } from "../../../src/utils/cn";

interface Event {
    id: number;
    title: string;
    page: number;
    tone: string;
}

const PAGE_SIZE = 8;
const TOTAL_PAGES = 6;
const TONES = ["0", "2", "3", "4", "5", "7", "8", "11"];

const events = ref<Event[]>([]);
const page = ref(0);
const isLoading = ref(false);
const hasMore = ref(true);

function makePage(p: number): Event[] {
    return Array.from({ length: PAGE_SIZE }, (_, i) => {
        const n = p * PAGE_SIZE + i + 1;
        return {
            id: n,
            title: `Signal #${String(n).padStart(3, "0")} — ${verb()} ${noun()}`,
            page: p + 1,
            tone: TONES[n % TONES.length]!,
        };
    });
}

function verb(): string {
    const vs = ["resolved", "escalated", "queued", "dispatched", "archived", "flagged"];
    return vs[Math.floor(Math.random() * vs.length)]!;
}
function noun(): string {
    const ns = ["payload", "channel", "glyph", "index", "beacon", "token", "manifold"];
    return ns[Math.floor(Math.random() * ns.length)]!;
}

async function loadMore() {
    if (isLoading.value || !hasMore.value) return;
    isLoading.value = true;
    // Simulate a network round-trip so the spinner is actually visible.
    await new Promise((r) => setTimeout(r, 480));
    events.value.push(...makePage(page.value));
    page.value += 1;
    if (page.value >= TOTAL_PAGES) hasMore.value = false;
    isLoading.value = false;
}

// Kick off the first page.
void loadMore();

function reset() {
    events.value = [];
    page.value = 0;
    hasMore.value = true;
    void loadMore();
}
</script>

<template>
    <StoryPage>
        <div class="flex items-end justify-between gap-4">
            <div>
                <p class="text-admin-label text-muted-foreground">Infinite scroll</p>
                <h2 class="text-heading">Event feed</h2>
            </div>
            <button
                type="button"
                class="interactive-item rounded-md border border-border bg-background px-3 py-1.5 text-small shadow-cartoon-sm"
                @click="reset"
            >
                Reset
            </button>
        </div>

        <!-- The component sets the scroll container internally; we give it a
             fixed max-height so the sentinel actually intersects on scroll. -->
        <InfiniteScroll
            :has-more="hasMore"
            :is-loading="isLoading"
            :threshold="160"
            :class="
                cn(
                    'max-h-[28rem] overflow-y-auto rounded-card border border-border bg-card shadow-cartoon',
                )
            "
            @load-more="loadMore"
        >
            <ul class="flex flex-col divide-y divide-border">
                <li
                    v-for="e in events"
                    :key="e.id"
                    class="interactive-item flex items-center gap-4 px-4 py-3"
                >
                    <span
                        class="h-2.5 w-2.5 shrink-0 rounded-full"
                        :style="{ background: `var(--section-color-${e.tone})` }"
                    />
                    <div class="flex min-w-0 flex-1 flex-col">
                        <span class="truncate text-small">{{ e.title }}</span>
                        <span class="text-mono-caption text-muted-foreground">
                            #{{ e.id }} · page {{ e.page }}
                        </span>
                    </div>
                    <Badge variant="outline" class="fira-code">
                        {{ e.id }}
                    </Badge>
                </li>
            </ul>

            <template #end>
                <span class="fira-code">— end of feed ({{ events.length }} events) —</span>
            </template>
        </InfiniteScroll>
    </StoryPage>
</template>
