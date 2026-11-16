<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import InfiniteScrollStage from "./infinite-scroll.stage.vue";

const snippet = `<InfiniteScroll
    class="max-h-96 overflow-y-auto"
    :has-more="hasMore"
    :is-loading="loading"
    @load-more="loadMore"
>
    <FeedRow v-for="entry in entries" :key="entry.id" :entry="entry" />
    <template #end>That is everything.</template>
</InfiniteScroll>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <InfiniteScrollStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
