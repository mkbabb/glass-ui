<script setup lang="ts">
import { h } from "vue";
import { Archive } from "@lucide/vue";
import { Button } from "@glass/components/button";
import { ToastAction, Toaster, useToast } from "@glass/components/toast";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ToastStage from "./toast.stage.vue";

const { toast } = useToast();

function archive(): void {
    toast({
        title: "Message archived",
        description: "You can restore it at any time.",
        action: h(ToastAction, { altText: "Undo archive" }, () => "Undo"),
    });
}

const snippet = `<script setup lang="ts">
import { Button } from "@mkbabb/glass-ui/button";
import { Toaster, useToast } from "@mkbabb/glass-ui/toast";

const { toast } = useToast();
<\/script>

<template>
    <Toaster />
    <Button @click="toast({ tone: 'success', title: 'Published' })">Publish</Button>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <ToastStage />
            </StoryStage>
            <Toaster position="top-right" />
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="With an action">
                    <Button emphasis="secondary" @click="archive">
                        <Archive aria-hidden="true" />
                        Archive
                    </Button>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
