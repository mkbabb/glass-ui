<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Textarea } from "../../../src/components/ui/textarea";
import { Label } from "../../../src/components/ui/label";

const plain = ref("");
const resizable = ref(
    "This one has the native resize handle enabled — grab the bottom-right corner.",
);
const fixed = ref(
    "Resize is pinned off so the shell layout stays predictable.",
);
const locked = ref("This content is read-only and visually muted.");
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">With label</h2>
            <p class="text-small text-muted-foreground">
                The baseline pairing — <code class="fira-code">Label</code> above, field below.
            </p>
            <div class="flex flex-col gap-2 max-w-md">
                <Label for="story-bio">Bio</Label>
                <Textarea
                    id="story-bio"
                    v-model="plain"
                    placeholder="A short sentence or three…"
                />
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Resizable</h2>
            <p class="text-small text-muted-foreground">
                Native <code class="fira-code">resize: vertical</code>.
            </p>
            <div class="flex flex-col gap-2 max-w-md">
                <Label for="story-resize">Notes</Label>
                <Textarea
                    id="story-resize"
                    v-model="resizable"
                    class="resize-y"
                />
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Resize off</h2>
            <p class="text-small text-muted-foreground">
                Forced <code class="fira-code">resize: none</code> — height stays where you put it.
            </p>
            <div class="flex flex-col gap-2 max-w-md">
                <Label for="story-fixed">Caption</Label>
                <Textarea
                    id="story-fixed"
                    v-model="fixed"
                    class="resize-none"
                />
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Disabled</h2>
            <p class="text-small text-muted-foreground">
                <code class="fira-code">disabled</code> drops opacity and blocks interaction.
            </p>
            <div class="flex flex-col gap-2 max-w-md">
                <Label for="story-locked" class="opacity-60">Release notes</Label>
                <Textarea id="story-locked" v-model="locked" disabled />
            </div>
        </section>
    </StoryPage>
</template>
