<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Card, CardContent } from "../../../src/components/ui/card";
import { Separator } from "../../../src/components/ui/separator";
import {
    LabeledInput,
    LabeledSelect,
    LabeledSlider,
    LabeledSwitch,
} from "../../../src/components/custom/labeled-field";
import { cn } from "../../../src/utils/cn";

const displayName = ref("Mike Babb");
const email = ref("mbabb@ncsu.edu");

const themeOptions = ["Auto (system)", "Warm cream (default)", "Neutral"] as const;
const theme = ref<(typeof themeOptions)[number]>("Warm cream (default)");
const themeOpen = ref(false);

const densityOptions = ["Cozy", "Comfortable", "Compact"] as const;
const density = ref<(typeof densityOptions)[number]>("Comfortable");
const densityOpen = ref(false);

const fontOptions = ["Computer Modern", "Fraunces", "General Sans", "System"] as const;
const bodyFont = ref<(typeof fontOptions)[number]>("Computer Modern");
const bodyFontOpen = ref(false);

const baseSize = ref(16);
const radius = ref(10);
const grain = ref(3.5);

const emailAlerts = ref(true);
const desktopNotifs = ref(false);
const weeklyDigest = ref(true);
const cartoonShadow = ref(true);
const paperGrain = ref(true);
const reducedMotion = ref(false);

interface Group {
    label: string;
    blurb: string;
    section: number;
}

const groups: Record<string, Group> = {
    account: {
        label: "Account",
        blurb: "Identity, contact, and sign-in preferences.",
        section: 2,
    },
    appearance: {
        label: "Appearance",
        blurb: "Theme, type, and density controls affecting every surface.",
        section: 5,
    },
    notifications: {
        label: "Notifications",
        blurb: "Where, when, and how often we reach out.",
        section: 8,
    },
    accessibility: {
        label: "Accessibility",
        blurb: "Motion, contrast, and ornamentation toggles.",
        section: 11,
    },
};
</script>

<template>
    <StoryPage>
        <div class="flex flex-col gap-10 max-w-3xl">
            <!-- Account -->
            <section class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <span
                        class="section-label text-admin-label"
                        :style="{ color: `var(--section-color-${groups.account.section}, inherit)` }"
                    >
                        {{ groups.account.label }}
                    </span>
                    <p class="text-small text-muted-foreground">{{ groups.account.blurb }}</p>
                </div>
                <Card class="border-2 border-foreground/10">
                    <CardContent class="grid grid-cols-[minmax(10rem,14rem)_1fr] items-center gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))] p-[calc(1.5rem_+_var(--density-pad,0rem))]">
                        <LabeledInput
                            v-model="displayName"
                            label="Display name"
                            tooltip="Shown on your profile and in comments."
                        />
                        <LabeledInput
                            v-model="email"
                            label="Email"
                            type="email"
                            tooltip="Used for sign-in and account recovery."
                        />
                    </CardContent>
                </Card>
            </section>

            <Separator />

            <!-- Appearance -->
            <section class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <span
                        class="section-label text-admin-label"
                        :style="{
                            color: `var(--section-color-${groups.appearance.section}, inherit)`,
                        }"
                    >
                        {{ groups.appearance.label }}
                    </span>
                    <p class="text-small text-muted-foreground">{{ groups.appearance.blurb }}</p>
                </div>
                <Card class="border-2 border-foreground/10">
                    <CardContent
                        :class="cn(
                            'grid grid-cols-[minmax(10rem,14rem)_1fr] items-center',
                            'gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))] p-[calc(1.5rem_+_var(--density-pad,0rem))]',
                        )"
                    >
                        <LabeledSelect
                            :model-value="theme"
                            :is-open="themeOpen"
                            :items="themeOptions"
                            label="Theme"
                            tooltip="Controls the overall colour and contrast."
                            @update:model-value="(v: string) => (theme = v as typeof themeOptions[number])"
                            @update:open="(v: boolean) => (themeOpen = v)"
                        />
                        <LabeledSelect
                            :model-value="bodyFont"
                            :is-open="bodyFontOpen"
                            :items="fontOptions"
                            label="Body font"
                            tooltip="Typeface used for long-form reading."
                            @update:model-value="(v: string) => (bodyFont = v as typeof fontOptions[number])"
                            @update:open="(v: boolean) => (bodyFontOpen = v)"
                        />
                        <LabeledSelect
                            :model-value="density"
                            :is-open="densityOpen"
                            :items="densityOptions"
                            label="Density"
                            tooltip="Padding scale for every container."
                            @update:model-value="(v: string) => (density = v as typeof densityOptions[number])"
                            @update:open="(v: boolean) => (densityOpen = v)"
                        />
                        <LabeledSlider
                            v-model="baseSize"
                            label="Base size"
                            tooltip="Root font size in pixels."
                            :min="12"
                            :max="20"
                            :step="1"
                        />
                        <LabeledSlider
                            v-model="radius"
                            label="Radius"
                            tooltip="Corner rounding in pixels."
                            :min="0"
                            :max="16"
                            :step="1"
                        />
                        <LabeledSlider
                            v-model="grain"
                            label="Grain"
                            tooltip="Paper-texture opacity × 100."
                            :min="0"
                            :max="10"
                            :step="0.5"
                        />
                        <LabeledSwitch
                            :checked="cartoonShadow"
                            label="Cartoon shadows"
                            tooltip="3px offset card shadow signature."
                            @update:checked="(v: boolean) => (cartoonShadow = v)"
                        />
                        <LabeledSwitch
                            :checked="paperGrain"
                            label="Paper underpaint"
                            tooltip="SVG turbulence layer fixed behind content."
                            @update:checked="(v: boolean) => (paperGrain = v)"
                        />
                    </CardContent>
                </Card>
            </section>

            <Separator />

            <!-- Notifications -->
            <section class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <span
                        class="section-label text-admin-label"
                        :style="{
                            color: `var(--section-color-${groups.notifications.section}, inherit)`,
                        }"
                    >
                        {{ groups.notifications.label }}
                    </span>
                    <p class="text-small text-muted-foreground">{{ groups.notifications.blurb }}</p>
                </div>
                <Card class="border-2 border-foreground/10">
                    <CardContent class="grid grid-cols-[minmax(10rem,14rem)_1fr] items-center gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))] p-[calc(1.5rem_+_var(--density-pad,0rem))]">
                        <LabeledSwitch
                            :checked="emailAlerts"
                            label="Email alerts"
                            tooltip="Deploys, incidents, and security events."
                            @update:checked="(v: boolean) => (emailAlerts = v)"
                        />
                        <LabeledSwitch
                            :checked="desktopNotifs"
                            label="Desktop notifications"
                            tooltip="Native OS notifications while the app is open."
                            @update:checked="(v: boolean) => (desktopNotifs = v)"
                        />
                        <LabeledSwitch
                            :checked="weeklyDigest"
                            label="Weekly digest"
                            tooltip="Friday morning summary of the week's activity."
                            @update:checked="(v: boolean) => (weeklyDigest = v)"
                        />
                    </CardContent>
                </Card>
            </section>

            <Separator />

            <!-- Accessibility -->
            <section class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <span
                        class="section-label text-admin-label"
                        :style="{
                            color: `var(--section-color-${groups.accessibility.section}, inherit)`,
                        }"
                    >
                        {{ groups.accessibility.label }}
                    </span>
                    <p class="text-small text-muted-foreground">{{ groups.accessibility.blurb }}</p>
                </div>
                <Card class="border-2 border-foreground/10">
                    <CardContent class="grid grid-cols-[minmax(10rem,14rem)_1fr] items-center gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))] p-[calc(1.5rem_+_var(--density-pad,0rem))]">
                        <LabeledSwitch
                            :checked="reducedMotion"
                            label="Reduce motion"
                            tooltip="Override prefers-reduced-motion for this session."
                            @update:checked="(v: boolean) => (reducedMotion = v)"
                        />
                    </CardContent>
                </Card>
            </section>
        </div>
    </StoryPage>
</template>
