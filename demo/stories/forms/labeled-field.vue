<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import {
    LabeledField,
    LabeledInput,
    LabeledSelect,
    LabeledSlider,
    LabeledSwitch,
} from "@glass/components/labeled-field";
import { Textarea } from "@glass/components/textarea";

const name = ref("");
const email = ref("not-an-address");
const bio = ref("");
const choice = ref("Balanced");
const choiceOpen = ref(false);
const intensity = ref(64);
const enabled = ref(true);
const choices = ["Quiet", "Balanced", "Vivid"];
</script>

<template>
    <StoryPage>
        <StorySection
            label="field anatomy"
            blurb="One visible label, optional supporting copy, the control, and an explicit error. Requirement and state stay aligned with the control rather than becoming decoration."
        >
            <ShowcaseFrame pad="lg">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <LabeledInput v-model="name" label="Workspace name" />
                    <LabeledInput
                        v-model="name"
                        label="Display name"
                        description="Shown to collaborators in shared workspaces."
                        requirement="optional"
                    />
                    <LabeledInput
                        v-model="name"
                        label="Release name"
                        description="Names the published revision."
                        requirement="required"
                    />
                    <LabeledInput
                        v-model="email"
                        label="Notification email"
                        description="Used only for release notices."
                        type="email"
                        invalid
                    >
                        <template #error>Enter a valid email address.</template>
                    </LabeledInput>
                    <LabeledInput
                        model-value="Locked by policy"
                        label="Organization"
                        description="Managed by your workspace administrator."
                        disabled
                    />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="control adapters"
            blurb="Thin adapters share the same field anatomy while Input, Select, Slider, and Switch retain their own behavior and paint."
        >
            <ShowcaseFrame pad="lg">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <LabeledSelect
                        v-model="choice"
                        v-model:open="choiceOpen"
                        :items="choices"
                        label="Atmosphere"
                        description="Sets the starting visual intensity."
                    />
                    <LabeledSlider
                        v-model="intensity"
                        :min="0"
                        :max="100"
                        label="Intensity"
                        description="Balances the procedural field against the content."
                    />
                    <LabeledSwitch
                        v-model="enabled"
                        label="Paper grain"
                        description="Adds a quiet material texture above the field."
                    />
                    <LabeledField
                        label="Release notes"
                        description="A direct slot covers controls outside the adapter set."
                    >
                        <template #default="{ controlId, describedBy }">
                            <Textarea
                                :id="controlId"
                                v-model="bio"
                                :aria-describedby="describedBy"
                                resize="content"
                                placeholder="Summarize this revision…"
                            />
                        </template>
                    </LabeledField>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="responsive composition"
            blurb="The horizontal field preserves label-before-control document order and returns to the same stacked anatomy at the narrow viewport."
        >
            <ShowcaseFrame pad="lg">
                <LabeledInput
                    v-model="name"
                    label="Project title"
                    description="Horizontal with room; stacked when the viewport narrows."
                    layout="horizontal"
                />
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
