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

// the appearance controls drive REAL inherited surface tokens on
// the settings surface, so every knob visibly changes the page it configures. All
// four live tokens
// ride ONE inherited `:style` object off the page root; `paperGrain` toggles the
// grain overlay via `:class`. No new CSS — every token/utility already ships.
const DENSITY_SPACING: Record<(typeof densityOptions)[number], string> = {
    Cozy: "0.5rem",
    Comfortable: "0rem",
    Compact: "-0.5rem",
};
const cardSize = computed(() => (density.value === "Compact" ? "sm" : "md"));

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
        // Density select → local field rhythm; Card owns its own typed padding.
        "--density-gap": spacing,
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

// Section headers stay calm grey; the page's ONE accent identity is carried by
// the violet left rail on each group (`.settings-group`), not by a tinted
// eyebrow — one coherent accent, never a four-hue rainbow.
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
                    <span class="text-small font-medium text-muted-foreground">
                        {{ groups.account.label }}
                    </span>
                    <p class="text-small text-muted-foreground">
                        {{ groups.account.blurb }}
                    </p>
                </div>
                <Card material="content" :size="cardSize">
                    <CardContent
                        class="grid grid-cols-[minmax(10rem,14rem)_1fr] items-center gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))]"
                    >
                        <LabeledInput
                            v-model="displayName"
                            label="Display name"
                            description="Shown on your profile and in comments."
                        />
                        <LabeledInput
                            v-model="email"
                            label="Email"
                            type="email"
                            description="Used for sign-in and account recovery."
                        />
                    </CardContent>
                </Card>
            </section>

            <Separator />

            <!-- Appearance -->
            <section class="flex flex-col gap-4">
                <div class="settings-group flex flex-col gap-1">
                    <span class="text-small font-medium text-muted-foreground">
                        {{ groups.appearance.label }}
                    </span>
                    <p class="text-small text-muted-foreground">
                        {{ groups.appearance.blurb }}
                    </p>
                </div>
                <Card material="content" :size="cardSize">
                    <CardContent
                        :class="
                            cn(
                                'grid grid-cols-[minmax(10rem,14rem)_1fr] items-center',
                                'gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))]',
                            )
                        "
                    >
                        <LabeledSelect
                            :model-value="theme"
                            :open="themeOpen"
                            :items="themeOptions"
                            label="Theme"
                            description="Controls the overall colour and contrast."
                            @update:model-value="
                                (v: string) =>
                                    (theme = v as (typeof themeOptions)[number])
                            "
                            @update:open="(v: boolean) => (themeOpen = v)"
                        />
                        <LabeledSelect
                            :model-value="bodyFont"
                            :open="bodyFontOpen"
                            :items="fontOptions"
                            label="Body font"
                            description="Typeface used for long-form reading."
                            @update:model-value="
                                (v: string) =>
                                    (bodyFont = v as (typeof fontOptions)[number])
                            "
                            @update:open="(v: boolean) => (bodyFontOpen = v)"
                        />
                        <LabeledSelect
                            :model-value="density"
                            :open="densityOpen"
                            :items="densityOptions"
                            label="Density"
                            description="Padding scale for every container."
                            @update:model-value="
                                (v: string) =>
                                    (density = v as (typeof densityOptions)[number])
                            "
                            @update:open="(v: boolean) => (densityOpen = v)"
                        />
                        <LabeledSlider
                            v-model="baseSize"
                            label="Base size"
                            description="Root font size in pixels."
                            :min="12"
                            :max="20"
                            :step="1"
                        />
                        <LabeledSlider
                            v-model="radius"
                            label="Radius"
                            description="Corner rounding in pixels."
                            :min="0"
                            :max="16"
                            :step="1"
                        />
                        <LabeledSlider
                            v-model="grain"
                            label="Grain"
                            description="Paper-texture opacity × 100."
                            :min="0"
                            :max="10"
                            :step="0.5"
                        />
                        <LabeledSwitch
                            :model-value="cartoonShadow"
                            label="Cartoon shadows"
                            description="3px offset card shadow signature."
                            @update:model-value="(v: boolean) => (cartoonShadow = v)"
                        />
                        <LabeledSwitch
                            :model-value="paperGrain"
                            label="Paper underpaint"
                            description="SVG turbulence layer fixed behind content."
                            @update:model-value="(v: boolean) => (paperGrain = v)"
                        />
                    </CardContent>
                </Card>
            </section>

            <Separator />

            <!-- Notifications -->
            <section class="flex flex-col gap-4">
                <div class="settings-group flex flex-col gap-1">
                    <span class="text-small font-medium text-muted-foreground">
                        {{ groups.notifications.label }}
                    </span>
                    <p class="text-small text-muted-foreground">
                        {{ groups.notifications.blurb }}
                    </p>
                </div>
                <Card material="content" :size="cardSize">
                    <CardContent
                        class="grid grid-cols-[minmax(10rem,14rem)_1fr] items-center gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))]"
                    >
                        <LabeledSwitch
                            :model-value="emailAlerts"
                            label="Email alerts"
                            description="Deploys, incidents, and security events."
                            @update:model-value="(v: boolean) => (emailAlerts = v)"
                        />
                        <LabeledSwitch
                            :model-value="desktopNotifs"
                            label="Desktop notifications"
                            description="Native OS notifications while the app is open."
                            @update:model-value="(v: boolean) => (desktopNotifs = v)"
                        />
                        <LabeledSwitch
                            :model-value="weeklyDigest"
                            label="Weekly digest"
                            description="Friday morning summary of the week's activity."
                            @update:model-value="(v: boolean) => (weeklyDigest = v)"
                        />
                    </CardContent>
                </Card>
            </section>

            <Separator />

            <!-- Accessibility -->
            <section class="flex flex-col gap-4">
                <div class="settings-group flex flex-col gap-1">
                    <span class="text-small font-medium text-muted-foreground">
                        {{ groups.accessibility.label }}
                    </span>
                    <p class="text-small text-muted-foreground">
                        {{ groups.accessibility.blurb }}
                    </p>
                </div>
                <Card material="content" :size="cardSize">
                    <CardContent
                        class="grid grid-cols-[minmax(10rem,14rem)_1fr] items-center gap-x-[calc(1.5rem_+_var(--density-gap,0rem))] gap-y-[calc(1.25rem_+_var(--density-gap,0rem))]"
                    >
                        <LabeledSwitch
                            :model-value="reducedMotion"
                            label="Reduce motion"
                            description="Override prefers-reduced-motion for this session."
                            @update:model-value="(v: boolean) => (reducedMotion = v)"
                        />
                    </CardContent>
                </Card>
            </section>
        </div>
    </StoryPage>
</template>

<style scoped>
/* Calm content suffusion on the settings page
   (a page literally ABOUT grain / paper / type rendered flat white-on-white —
   a deliberately quiet surface). No live substrate;
   the suffusion lives in CONTENT COMPOSITION (the math-paper.vue gold-standard
   idiom: the section-accent rail plus one coherent eyebrow accent. The
   page declares `background: "grid"` on its manifest row (the blueprint-grid
   underlay); StoryHero drops the card to the calm `wash` tier so the grid reads. */

/* One coherent section-accent register for the whole page (the violet
   brand anchor, --section-color-7) so the four groups read as one system, not
   a four-hue rainbow. */
.settings-group {
    /* The math-paper section-accent rail: a thin
       left rail keyed off the page's ONE accent. The eyebrow + blurb indent off
       the rail so the section reads as an intentional, organized block. */
    border-inline-start: 3px solid
        color-mix(in srgb, var(--section-color-7) 55%, transparent);
    padding-inline-start: 1rem;
}

/* The three Base size, Radius, and Grain
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
