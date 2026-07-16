<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import CodeBlock from "../../chassis/code/CodeBlock.vue";
import CardExample from "../../examples/CardExample.vue";
import cardExampleSource from "../../examples/CardExample.vue?raw";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@glass/components/card";
import { Button } from "@glass/components/button";

const rows = Array.from({ length: 8 }, (_, index) => `Timeline entry ${index + 1}`);
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Card states"
            blurb="Card supplies proportion and anatomy. Surface supplies material; Button supplies command behavior."
        >
            <div class="card-board">
                <Card material="content" :shadow="false">
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
                        >Shadow and grain are explicit Surface facilities.</CardContent
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

                <Card variant="selection" selected data-hue="oklch(0.72 0.14 78)">
                    <CardHeader>
                        <CardTitle>Selected</CardTitle>
                        <CardDescription
                            >State reads at the rim, without flooding the
                            plate.</CardDescription
                        >
                    </CardHeader>
                    <CardContent
                        >Gold is earned only by the selected state.</CardContent
                    >
                </Card>

                <Card size="sm" cartoon>
                    <CardHeader>
                        <CardTitle>Dense</CardTitle>
                        <CardDescription
                            >One smaller proportional spacing rung.</CardDescription
                        >
                    </CardHeader>
                    <CardContent
                        >Cartoon is a static Card decoration, not a material
                        axis.</CardContent
                    >
                </Card>

                <Card class="card-board__narrow">
                    <CardHeader>
                        <CardTitle
                            >A deliberately long heading that wraps without displacing
                            its action</CardTitle
                        >
                        <CardDescription
                            >Descriptions retain their column and remain readable at
                            narrow widths.</CardDescription
                        >
                        <CardAction
                            ><Button emphasis="quiet" size="sm">More</Button></CardAction
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
            heading="Shrinkable header"
            blurb="Scroll the activity card to compact its heading while the content remains readable and reachable."
        >
            <Card class="card-scroll-host card-scroll-example" tabindex="0">
                <CardHeader shrink class="card-scroll-example__header">
                    <CardTitle>Recent activity</CardTitle>
                    <CardDescription
                        >Scroll this region to collapse the heading.</CardDescription
                    >
                </CardHeader>
                <CardContent class="card-scroll-example__rows">
                    <p v-for="row in rows" :key="row">{{ row }}</p>
                </CardContent>
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

.card-scroll-example {
    max-block-size: 20rem;
    overflow-y: auto;
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
