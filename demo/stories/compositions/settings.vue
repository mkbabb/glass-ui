<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import { computed, ref } from "vue";
import { Card, CardContent } from "@glass/components/card";
import { Separator } from "@glass/components/separator";
import {
    LabeledInput,
    LabeledSelect,
    LabeledSlider,
    LabeledSwitch,
} from "@glass/components/labeled-field";
import { cn } from "@glass/components/_shared/class-names";

const displayName = ref("Mike Babb");
const email = ref("mbabb@ncsu.edu");

const themeOptions = ["Auto (system)", "Warm cream (default)", "Neutral"] as const;
const theme = ref<(typeof themeOptions)[number]>("Warm cream (default)");
const themeOpen = ref(false);

const densityOptions = ["Cozy", "Comfortable", "Compact"] as const;
const density = ref<(typeof densityOptions)[number]>("Comfortable");
const densityOpen = ref(false);

const fontOptions = ["Plus Jakarta Sans", "Fira Code", "System"] as const;
const bodyFont = ref<(typeof fontOptions)[number]>("Plus Jakarta Sans");
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

// BI.W-GRAIN-WIRE — the appearance controls drive REAL inherited surface tokens on
// the settings surface, so every knob visibly changes the page it configures (the
// UF-J2 fix: a control that promises an effect delivers one). All four live tokens
// ride ONE inherited `:style` object off the page root; `paperGrain` toggles the
// grain overlay via `:class`. No new CSS — every token/utility already ships.
const DENSITY_SPACING: Record<(typeof densityOptions)[number], string> = {
    Cozy: "0.5rem",
    Comfortable: "0rem",
    Compact: "-0.5rem",
};

const surfaceStyle = computed<Record<string, string>>(() => {
    const grainAlpha = (grain.value / 100).toFixed(4);
    const spacing = DENSITY_SPACING[density.value];
    const style: Record<string, string> = {
        // Grain slider → the live grain density on BOTH grain channels: the
        // `--glass-grain-opacity` tier-root the glass-material grain reads, and the
        // `--paper-grain-opacity` the `.paper-grain-overlay::after` tooth reads
        // (the latter shadows the glass fallback, so the overlay is driven direct).
        "--glass-grain-opacity": grainAlpha,
        "--paper-grain-opacity": grainAlpha,
        // Density select → the card gap/pad the CardContent grids already read.
        "--density-gap": spacing,
        "--density-pad": spacing,
    };
    // Reduce-motion switch → zero the `--motion-weight` scalar the cartoon-caster
    // (cards.css) multiplies every travel/squash term by.
    if (reducedMotion.value) style["--motion-weight"] = "0";
    // Cartoon-shadows switch → drop the card cartoon-shadow tokens to `none` when
    // off (the `.card` box-shadow reads the token, so the cards flatten).
    if (!cartoonShadow.value) {
        style["--shadow-cartoon-md"] = "none";
        style["--shadow-cartoon-lg"] = "none";
    }
    return style;
});

interface Group {
    label: string;
    blurb: string;
}

// AZ.W-SUFFUSE D1-8 — the section eyebrows read ONE coherent section-accent
// register (`.section-label--tinted`), NOT a four-hue rainbow (the prior
// per-group `section: 2/5/8/11` indigo/amber/red/teal cycle that read as
// arbitrary noise). The page-scope one-color-event rule: settings gets ONE
// eyebrow-accent identity.
const groups: Record<string, Group> = {
    account: {
        label: "Account",
        blurb: "Identity, contact, and sign-in preferences.",
    },
    appearance: {
        label: "Appearance",
        blurb: "Theme, type, and density controls affecting every surface.",
    },
    notifications: {
        label: "Notifications",
        blurb: "Where, when, and how often we reach out.",
    },
    accessibility: {
        label: "Accessibility",
        blurb: "Motion, contrast, and ornamentation toggles.",
    },
};
</script>

<template>
    <StoryPage>
        <div
            class="settings-page flex flex-col gap-10 max-w-3xl"
            :class="{ 'paper-grain-overlay': paperGrain }"
            :style="surfaceStyle"
        >
            <!-- Account -->
            <section class="flex flex-col gap-4">
                <div class="settings-group flex flex-col gap-1">
                    <span class="section-label--tinted text-admin-label">
                        {{ groups.account.label }}
                    </span>
                    <p class="text-small text-muted-foreground">
                        {{ groups.account.blurb }}
                    </p>
                </div>
                <Card class="border-2 border-foreground/10">
                    <CardContent
                        class="grid grid-cols-[minmax(10rem,14rem)_1fr] items-center gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))] p-[calc(var(--card-pad-inline)_+_var(--density-pad,0rem))]"
                    >
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
                <div class="settings-group flex flex-col gap-1">
                    <span class="section-label--tinted text-admin-label">
                        {{ groups.appearance.label }}
                    </span>
                    <p class="text-small text-muted-foreground">
                        {{ groups.appearance.blurb }}
                    </p>
                </div>
                <Card class="border-2 border-foreground/10">
                    <CardContent
                        :class="
                            cn(
                                'grid grid-cols-[minmax(10rem,14rem)_1fr] items-center',
                                'gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))] p-[calc(var(--card-pad-inline)_+_var(--density-pad,0rem))]',
                            )
                        "
                    >
                        <LabeledSelect
                            :model-value="theme"
                            :is-open="themeOpen"
                            :items="themeOptions"
                            label="Theme"
                            tooltip="Controls the overall colour and contrast."
                            @update:model-value="
                                (v: string) =>
                                    (theme = v as (typeof themeOptions)[number])
                            "
                            @update:open="(v: boolean) => (themeOpen = v)"
                        />
                        <LabeledSelect
                            :model-value="bodyFont"
                            :is-open="bodyFontOpen"
                            :items="fontOptions"
                            label="Body font"
                            tooltip="Typeface used for long-form reading."
                            @update:model-value="
                                (v: string) =>
                                    (bodyFont = v as (typeof fontOptions)[number])
                            "
                            @update:open="(v: boolean) => (bodyFontOpen = v)"
                        />
                        <LabeledSelect
                            :model-value="density"
                            :is-open="densityOpen"
                            :items="densityOptions"
                            label="Density"
                            tooltip="Padding scale for every container."
                            @update:model-value="
                                (v: string) =>
                                    (density = v as (typeof densityOptions)[number])
                            "
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
                <div class="settings-group flex flex-col gap-1">
                    <span class="section-label--tinted text-admin-label">
                        {{ groups.notifications.label }}
                    </span>
                    <p class="text-small text-muted-foreground">
                        {{ groups.notifications.blurb }}
                    </p>
                </div>
                <Card class="border-2 border-foreground/10">
                    <CardContent
                        class="grid grid-cols-[minmax(10rem,14rem)_1fr] items-center gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))] p-[calc(var(--card-pad-inline)_+_var(--density-pad,0rem))]"
                    >
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
                <div class="settings-group flex flex-col gap-1">
                    <span class="section-label--tinted text-admin-label">
                        {{ groups.accessibility.label }}
                    </span>
                    <p class="text-small text-muted-foreground">
                        {{ groups.accessibility.blurb }}
                    </p>
                </div>
                <Card class="border-2 border-foreground/10">
                    <CardContent
                        class="grid grid-cols-[minmax(10rem,14rem)_1fr] items-center gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))] p-[calc(var(--card-pad-inline)_+_var(--density-pad,0rem))]"
                    >
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

<style scoped>
/* AZ.W-SUFFUSE Arm D4 — the calm content-suffusion idiom on the settings page
   (a page literally ABOUT grain / paper / type rendered flat white-on-white —
   the canonical thin offender, D4-1). NO live substrate (the over-spend fence);
   the suffusion lives in CONTENT COMPOSITION (the math-paper.vue gold-standard
   idiom — D4-5): the section-accent rail + the ONE coherent eyebrow accent. The
   page declares `background: "grid"` on its manifest row (the blueprint-grid
   underlay); StoryHero drops the card to the calm `wash` tier so the grid reads. */

/* D1-8 — ONE coherent section-accent register for the whole page (the violet
   brand anchor, --section-color-7) so the four eyebrows read as one system, not
   the prior four-hue rainbow. */
.settings-group {
    --section-label-accent: var(--section-color-7);
    /* The math-paper section-accent rail (the D4-5 gold-standard idiom): a thin
       left rail keyed off the page's ONE accent. The eyebrow + blurb indent off
       the rail so the section reads as an intentional, organized block. */
    border-inline-start: 3px solid
        color-mix(in srgb, var(--section-color-7) 55%, transparent);
    padding-inline-start: 1rem;
}

/* D1-7 — the censor-bar slider fix. The three Base size / Radius / Grain
   sliders paint a near-opaque dark `.slider-range` cylinder (the §B3
   pull-the-track default reading `--primary` near-black warm ink) that reads as
   the page's darkest, heaviest focal block on the calm warm-cream settings page
   (the redaction-bar effect that pulls the eye OFF content). The library
   ALREADY exposes the `--slider-range-bg` override seam (Slider.vue) — a
   settings-LOCAL re-point to the page's ONE calm accent register drops the fill
   off the page-darkest-block so the slider reads as a control, not a focal
   block. NOT a library default re-tune (the pull-the-track intent is sound
   elsewhere — presets-in-consumers). Scoped to the whole settings page so it
   reaches the sliders inside the Card (siblings of the eyebrow group). */
.settings-page {
    --slider-range-bg: var(--section-color-7);
}
</style>
