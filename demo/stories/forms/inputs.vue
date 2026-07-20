<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import FamilyTabs, { type FamilyMember } from "../../chassis/family/FamilyTabs.vue";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";

const familyMembers: FamilyMember[] = [
    {
        id: "textarea",
        label: "Textarea",
        component: defineAsyncComponent(() => import("./textarea.vue")),
    },
    {
        id: "select",
        label: "Select",
        component: defineAsyncComponent(() => import("./select.vue")),
    },
    {
        id: "label",
        label: "Label",
        component: defineAsyncComponent(() => import("./label.vue")),
    },
];

const plain = ref("");
const filled = ref("Ada Lovelace");
const required = ref("");
const invalid = ref("not-an-email");
const email = ref("");
const password = ref("");
const search = ref("");
const telephone = ref("");
const website = ref("");
</script>

<template>
    <StoryPage>
        <StorySection
            label="editing states"
            blurb="One native input owns editing, form submission, autocomplete, and keyboard behavior; the component owns only its field material and semantic size/state attributes."
        >
            <div class="grid gap-4 md:grid-cols-2">
                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="input-placeholder">Default · placeholder</Label>
                    <Input
                        id="input-placeholder"
                        v-model="plain"
                        autocomplete="off"
                        placeholder="Type a project name"
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="input-filled">Filled</Label>
                    <Input
                        id="input-filled"
                        v-model="filled"
                        autocomplete="name"
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="input-required" requirement="required">
                        Required workspace
                    </Label>
                    <Input
                        id="input-required"
                        v-model="required"
                        name="workspace"
                        required
                        autocomplete="organization"
                        placeholder="Studio"
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="input-invalid">Invalid email</Label>
                    <Input
                        id="input-invalid"
                        v-model="invalid"
                        type="email"
                        invalid
                        aria-describedby="input-invalid-message"
                    />
                    <p id="input-invalid-message" class="text-small text-destructive">
                        Enter an address such as name@example.com.
                    </p>
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="input-readonly">Read only</Label>
                    <Input
                        id="input-readonly"
                        model-value="report-2026-07"
                        readonly
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="input-disabled" disabled>Disabled</Label>
                    <Input
                        id="input-disabled"
                        model-value="Archived workspace"
                        disabled
                    />
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            label="native input types"
            blurb="Type, inputmode, autocomplete, and enter-key hints pass directly to the single-line native control."
        >
            <div class="grid gap-4 md:grid-cols-2">
                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="input-email">Email</Label>
                    <Input
                        id="input-email"
                        v-model="email"
                        type="email"
                        inputmode="email"
                        autocomplete="email"
                        enterkeyhint="next"
                        placeholder="you@example.com"
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="input-password">Password</Label>
                    <Input
                        id="input-password"
                        v-model="password"
                        type="password"
                        autocomplete="current-password"
                        placeholder="Eight or more characters"
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="input-search">Search</Label>
                    <Input
                        id="input-search"
                        v-model="search"
                        type="search"
                        enterkeyhint="search"
                        placeholder="Search the catalogue"
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="input-tel">Telephone</Label>
                    <Input
                        id="input-tel"
                        v-model="telephone"
                        type="tel"
                        inputmode="tel"
                        autocomplete="tel"
                        placeholder="+1 919 555 0142"
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3 md:col-span-2">
                    <Label for="input-url">Website</Label>
                    <Input
                        id="input-url"
                        v-model="website"
                        type="url"
                        inputmode="url"
                        autocomplete="url"
                        placeholder="https://example.com"
                    />
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection label="size contract">
            <div class="grid items-end gap-4 md:grid-cols-3">
                <ShowcaseFrame
                    v-for="size in ['sm', 'md', 'lg'] as const"
                    :key="size"
                    class="flex flex-col gap-3"
                >
                    <Label :for="`input-${size}`">{{ size }}</Label>
                    <Input
                        :id="`input-${size}`"
                        :size="size"
                        :placeholder="`${size} field`"
                    />
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection label="input family">
            <FamilyTabs :members="familyMembers" aria-label="Input family" />
        </StorySection>
    </StoryPage>
</template>
