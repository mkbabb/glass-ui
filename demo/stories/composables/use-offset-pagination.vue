<script setup lang="ts">
// useOffsetPagination — admin-style page-jump pagination over a fetchFn.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { useOffsetPagination } from "../../../src/composables/pagination/useOffsetPagination";

interface Row {
    id: number;
    label: string;
}

const ALL: Row[] = Array.from({ length: 53 }, (_, i) => ({ id: i + 1, label: `Row #${i + 1}` }));

async function fetchFn(limit: number, offset: number) {
    // Simulate latency
    await new Promise((r) => setTimeout(r, 80));
    return { data: ALL.slice(offset, offset + limit), total: ALL.length };
}

const pager = useOffsetPagination<Row>({ fetchFn, pageSize: 10 });
pager.loadPage(1);
</script>

<template>
    <StoryPage>
        <StorySection
            label="page-jump pagination"
            blurb="Stable-position offset pagination — admin views needing jump-to-page. Wraps a fetchFn(limit, offset) and exposes items + page + pageCount + nav controls."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-4">
                    <table class="w-full border-collapse text-sm">
                        <thead>
                            <tr class="border-b border-border text-left">
                                <th class="py-2 pr-4">id</th>
                                <th class="py-2">label</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in pager.items.value" :key="row.id" class="border-b border-border/40">
                                <td class="py-1.5 pr-4"><code class="fira-code">{{ row.id }}</code></td>
                                <td class="py-1.5">{{ row.label }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex items-center gap-3">
                        <Button :disabled="!pager.hasPrev.value" @click="() => pager.prevPage()">prev</Button>
                        <span class="text-sm">
                            page <code class="fira-code">{{ pager.page }}</code> of
                            <code class="fira-code">{{ pager.pageCount }}</code>
                        </span>
                        <Button :disabled="!pager.hasNext.value" @click="() => pager.nextPage()">next</Button>
                        <span class="ml-auto text-mono-caption text-muted-foreground">
                            total: {{ pager.total }} · loading: {{ pager.loading }}
                        </span>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
