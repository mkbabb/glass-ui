<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import DeckDemo from "./deck.stage.vue";

const snippet = `<script setup lang="ts">
import { DeckSlide, DeckStage, useDeck, useDeckKeyboard } from "@mkbabb/glass-ui/deck";

const slides = [{ id: "one", title: "One" }, { id: "two", title: "Two" }];
const deck = useDeck(slides.length, { label: (i) => slides[i].title });
useDeckKeyboard(deck);
<\/script>

<template>
    <DeckStage :deck="deck" aria-label="Slides">
        <DeckSlide v-for="(s, i) in slides" :key="s.id" :index="i" :entry="s">
            <h2>{{ s.title }}</h2>
        </DeckSlide>
    </DeckStage>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <DeckDemo />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
