<script setup lang="ts">
// Toaster — wrap-around <ToastProvider> consumer that the speedtest
// (and any non-glass-ui app) drops into the layout root. Composes
// useToast for the ToastViewport rendering loop.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import CodeBlock from "../../chassis/code/CodeBlock.vue";
import ToasterExample from "../../examples/ToasterExample.vue";
import toasterExampleSource from "../../examples/ToasterExample.vue?raw";
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Saved notification"
            blurb="Trigger a transient saved message from an ordinary command while the mounted Toaster owns announcement and dismissal."
        >
            <ShowcaseFrame pad="lg">
                <ToasterExample />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Usage"
            blurb="Mount one Toaster near the application root, then publish and dismiss notifications from descendant commands."
        >
            <CodeBlock lang="vue" :code="toasterExampleSource" />
        </StorySection>
    </StoryPage>
</template>
