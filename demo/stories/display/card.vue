<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import CodeBlock from "../../chassis/code/CodeBlock.vue";
import CardExample from "../../examples/CardExample.vue";
import cardExampleSource from "../../examples/CardExample.vue?raw";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@glass/components/card";
import { Button } from "@glass/components/button";

const rows = Array.from({ length: 8 }, (_, index) => `Timeline entry ${index + 1}`);
const chosen = ref("balanced");
const plans = [
    { id: "balanced", title: "Balanced", blurb: "The fill carries the state." },
    { id: "vivid", title: "Vivid", blurb: "The rim is a locator, not the state." },
];
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Card states"
            blurb="Card supplies proportion and anatomy. Surface supplies material; Button supplies command behavior."
        >
            <div class="card-board">
                <Card tier="quiet" :shadow="false">
                    <CardHeader>
                        <CardTitle>Content</CardTitle>
                        <CardDescription
                            >A quiet nested group without added
                            elevation.</CardDescription
                        >
                    </CardHeader>
                    <CardContent
                        >One clear reading order, with no ornamental
                        divider.</CardContent
                    >
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Elevated</CardTitle>
                        <CardDescription
                            >The default elevated, medium-density
                            group.</CardDescription
                        >
                    </CardHeader>
                    <CardContent
                        >The cast composes with the rung it sits on; it never
                        replaces it.</CardContent
                    >
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Explicit action</CardTitle>
                        <CardDescription
                            >The plate stays static; the control owns
                            activation.</CardDescription
                        >
                    </CardHeader>
                    <CardFooter><Button size="sm">Open report</Button></CardFooter>
                </Card>

                <Card size="sm" class="cartoon-surface">
                    <CardHeader>
                        <CardTitle>Dense</CardTitle>
                        <CardDescription
                            >One smaller proportional spacing rung.</CardDescription
                        >
                    </CardHeader>
                    <CardContent
                        >Cartoon is a public utility class, not a Card prop — the
                        cast belongs to the plate that wants it.</CardContent
                    >
                </Card>

                <Card tier="quiet" class="paper-grid">
                    <CardHeader>
                        <CardTitle>Ruled</CardTitle>
                        <CardDescription
                            >The engineering grid is a paper utility.</CardDescription
                        >
                    </CardHeader>
                    <CardContent
                        >`paper-grid` lives beside the paper tooth in
                        `styles/paper.css`, not behind a Card prop.</CardContent
                    >
                </Card>

                <Card class="card-board__narrow">
                    <CardHeader>
                        <CardTitle
                            >A deliberately long heading that wraps without displacing
                            its footer</CardTitle
                        >
                        <CardDescription
                            >Descriptions retain their column and remain readable at
                            narrow widths.</CardDescription
                        >
                    </CardHeader>
                    <CardFooter>
                        <Button emphasis="quiet" size="sm">Cancel</Button>
                        <Button size="sm">Continue with review</Button>
                    </CardFooter>
                </Card>
            </div>
        </StorySection>

        <StorySection
            heading="Selectable cards"
            blurb="`selected` present makes the card an option: role, tab stop, aria-selected, pointer, and the fill that carries the state. Absent, the card stays inert prose."
        >
            <div class="card-board" role="listbox" aria-label="Plan">
                <Card
                    v-for="plan in plans"
                    :key="plan.id"
                    :selected="chosen === plan.id"
                    @click="chosen = plan.id"
                    @keydown.enter.prevent="chosen = plan.id"
                    @keydown.space.prevent="chosen = plan.id"
                >
                    <CardHeader>
                        <CardTitle>{{ plan.title }}</CardTitle>
                        <CardDescription>{{ plan.blurb }}</CardDescription>
                    </CardHeader>
                    <CardContent>Hover, tab to it, and press it.</CardContent>
                </Card>
            </div>
        </StorySection>

        <StorySection
            heading="Shrinkable header"
            blurb="Scroll the activity card to compact its heading while the content remains readable and reachable."
        >
            <Card>
                <!-- The scroll host is an element INSIDE the plate, never the
                     plate itself: it wears `overflow-y` and the trailing feather
                     mask, and a mask on the <Card> would dissolve the plate's own
                     bottom edge and clip the cast away with it. -->
                <div class="card-scroll-host card-scroll-example" tabindex="0">
                    <CardHeader shrink class="card-scroll-example__header">
                        <CardTitle>Recent activity</CardTitle>
                        <CardDescription
                            >Scroll this region to collapse the
                            heading.</CardDescription
                        >
                    </CardHeader>
                    <CardContent class="card-scroll-example__rows">
                        <p v-for="row in rows" :key="row">{{ row }}</p>
                    </CardContent>
                </div>
            </Card>
        </StorySection>

        <StorySection
            heading="Public Card anatomy"
            blurb="The rendered specimen and displayed source are the same imported Vue module."
        >
            <CardExample />
            <CodeBlock lang="vue" :code="cardExampleSource" />
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.card-board {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
    gap: 1rem;
    align-items: start;
}

.card-board__narrow {
    max-inline-size: 20rem;
}

/* `overflow-y` comes with `.card-scroll-host` — a scroll owner that does not
   scroll is not one. Only the ceiling is the story's, and it sits on the
   VIEWPORT inside the plate, not on the plate. */
.card-scroll-example {
    max-block-size: 20rem;
}

.card-scroll-example__header {
    position: sticky;
    inset-block-start: 0;
    z-index: 1;
}

.card-scroll-example__rows {
    display: grid;
    gap: 1rem;
}
</style>
