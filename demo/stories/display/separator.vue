<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Separator } from "@glass/components/ui/separator";
import { Card, CardContent } from "@glass/components/ui/card";
</script>

<template>
    <StoryPage>
        <!-- Plain horizontal. -->
        <StorySection label="horizontal">
            <Card>
                <CardContent>
                    <p class="text-small text-foreground">
                        Paragraph above the rule.
                    </p>
                    <Separator class="my-4" />
                    <p class="text-small text-foreground">
                        Paragraph below.
                    </p>
                </CardContent>
            </Card>
        </StorySection>

        <!-- Horizontal with label — the fixed split-rule centering witness. -->
        <StorySection label="horizontal · labelled">
            <Card>
                <CardContent>
                    <p class="text-small text-foreground">Draft</p>
                    <Separator class="my-6" label="or" />
                    <p class="text-small text-foreground">Published</p>
                </CardContent>
            </Card>
        </StorySection>

        <!-- Vertical separators in a flex row. -->
        <StorySection label="vertical · flex row">
            <Card>
                <CardContent class="flex h-12 items-center">
                    <span class="text-small text-foreground">Docs</span>
                    <Separator orientation="vertical" class="mx-4" />
                    <span class="text-small text-foreground">API</span>
                    <Separator orientation="vertical" class="mx-4" />
                    <span class="text-small text-foreground">Playground</span>
                    <Separator orientation="vertical" class="mx-4" />
                    <span class="text-small text-foreground">Changelog</span>
                </CardContent>
            </Card>
        </StorySection>

        <!-- Section-label copy pattern. -->
        <StorySection label="section-label copy pattern">
            <Card>
                <CardContent class="flex flex-col gap-6">
                    <div class="flex flex-col gap-3">
                        <p class="section-label">foundations</p>
                        <p class="text-small text-muted-foreground">
                            colors · type · radii · shadows
                        </p>
                    </div>
                    <Separator />
                    <div class="flex flex-col gap-3">
                        <p class="section-label">primitives</p>
                        <p class="text-small text-muted-foreground">
                            button · input · slider · select
                        </p>
                    </div>
                    <Separator />
                    <div class="flex flex-col gap-3">
                        <p class="section-label">containers</p>
                        <p class="text-small text-muted-foreground">
                            card · dialog · sheet · drawer
                        </p>
                    </div>
                </CardContent>
            </Card>
        </StorySection>
    </StoryPage>
</template>
