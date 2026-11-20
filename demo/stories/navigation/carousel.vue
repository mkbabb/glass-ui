<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import CarouselStage from "./carousel.stage.vue";

const snippet = `<script setup lang="ts">
import { ref } from "vue";
import { Carousel, CarouselContent, CarouselItem } from "@mkbabb/glass-ui/carousel";
import { PagerDots } from "@mkbabb/glass-ui/pager-dots";
const active = ref(0);
<\/script>

<template>
    <Carousel v-model:active="active" aria-label="Photos">
        <CarouselContent>
            <CarouselItem v-for="(p, i) in photos" :key="p.id" :index="i">…</CarouselItem>
        </CarouselContent>
        <PagerDots v-model:active="active" :count="photos.length" aria-label="Photos" />
    </Carousel>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <CarouselStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
