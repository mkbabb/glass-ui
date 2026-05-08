<script setup lang="ts">
// Toaster — wrap-around <ToastProvider> consumer that the speedtest
// (and any non-glass-ui app) drops into the layout root. Composes
// useToast for the ToastViewport rendering loop.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { Toaster, useToast } from "../../../src/components/ui/toast";

const { toast } = useToast();

function fireToast() {
    toast({
        title: "Toaster fired",
        description: "Lives at the layout root via <Toaster /> drop-in; no manual ToastProvider wiring.",
    });
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="canonical drop-in"
            blurb="The Toaster primitive is the wrap-around <ToastProvider> consumer that consumers (the speedtest, glass-ui demo itself) drop into the layout root. Composes useToast() internally to render the ToastViewport loop."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-4">
                    <Toaster />
                    <Button variant="default" @click="fireToast">
                        Fire a toast
                    </Button>
                    <p class="text-mono-caption text-muted-foreground">
                        The Toaster lives mounted above; clicking the button calls useToast().toast(...) and the
                        viewport paints in the bottom-right (top on small screens).
                    </p>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="usage"
            blurb="Drop a single <Toaster /> at your layout root. Anywhere in the tree, useToast() returns { toast, dismiss, toasts }. The Toaster itself manages the ToastProvider context + viewport."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre class="fira-code text-sm overflow-x-auto"><code>// App.vue
&lt;template&gt;
  &lt;router-view /&gt;
  &lt;Toaster /&gt;
&lt;/template&gt;

// Anywhere downstream
const { toast } = useToast();
toast({ title: "Saved", description: "..." });</code></pre>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
