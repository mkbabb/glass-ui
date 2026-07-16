<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import { ref } from "vue";
import { Lock, ShieldCheck, Sparkles, Users } from "@lucide/vue";
import { Button } from "@glass/components/button";
import { Checkbox } from "@glass/components/checkbox";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";
import { Separator } from "@glass/components/separator";
import { Aurora } from "@glass/components/aurora";
import { Chip } from "@glass/components/chip";
import { cn } from "@glass/components/_shared/class-names";
import { heroAuroraConfig } from "../../chassis/hero/aurora-hero";

const wonkSettings = '"WONK" 1, "SOFT" 0';

// The brand panel paints the purple→tomato aurora palette — the section-ramp hue
// pair (purple section-1, tomato section-6) FD §9.2.10 designed for exactly this
// panel and that shipped unused until now (the un-orphan). A contained Aurora
// behind the translucent panel — this is the route's ONE live GL context.
//
// BI.W-AUTH-SHELL-BG (PERF-2 / UF-K4) — the page background is a CALM `grid`
// blueprint wash (zero GL); the retired 4.87MP live-fourier page-wash + the
// recessive shell aurora are both gone (the route is enrolled in SELF_STAGES_GL so
// the shell stands down). The one painterly moment is this brand-panel aurora, the
// route's single GL field: the auth-shell drops from 3 GL contexts to ONE.
const brandAurora = heroAuroraConfig("purple-tomato");

// The split-auth shell floats its OWN complete split-panel composition directly
// over the calm grid wash (`:hero-title="false"` → the StoryHero chassis renders no
// card around it). The brand panel (left half) reads translucent so its aurora shows
// through; the form (right half) stays a calmer surface for legibility.

const email = ref("");
const password = ref("");
const remember = ref(true);

const trustBadges = [
    { icon: ShieldCheck, text: "SOC 2 Type II", section: 4 },
    { icon: Lock, text: "End-to-end encrypted", section: 2 },
    { icon: Users, text: "Trusted by 12k teams", section: 7 },
];
</script>

<template>
    <!-- :hero-title="false" — this auth composition hand-authors its own
         display-register brand headline (the split-panel <h1> below), so the
         chassis does not double the page title (AZ.W-SUFFUSE D2-1). -->
    <StoryPage :hero-title="false">
        <div
            :class="
                cn(
                    'overflow-hidden rounded-[var(--radius-dialog)] border-2 border-foreground/10',
                    'grid min-h-[32rem] shadow-[var(--shadow-card)] lg:grid-cols-2',
                )
            "
        >
            <div
                class="auth-brand-panel relative isolate flex flex-col justify-between gap-[calc(2rem_+_var(--density-gap,0rem))] overflow-hidden p-[calc(2.5rem_+_var(--density-pad,0rem))] lg:p-[calc(3.5rem_+_var(--density-pad,0rem))]"
            >
                <!-- The brand panel paints the purple→tomato aurora (the palette
                     FD designed for this panel) behind its translucent content,
                     so the brand side reads as glass-over-painterly. -->
                <Aurora
                    :config="brandAurora"
                    :opacity-ceiling="0.55"
                    class="absolute inset-0 -z-10"
                    aria-hidden="true"
                />
                <div class="relative z-10 flex items-center gap-3">
                    <span
                        class="fourier-f font-display italic text-4xl leading-none"
                        :style="{
                            color: 'var(--viz-fourier, hsl(358 72% 52%))',
                            fontVariationSettings: wonkSettings,
                        }"
                        aria-hidden="true"
                        >f</span
                    >
                    <span class="text-subheading tracking-tight">glass-ui</span>
                </div>

                <div
                    class="flex max-w-md flex-col gap-[calc(1.5rem_+_var(--density-gap,0rem))]"
                >
                    <Sparkles class="size-5 text-muted-foreground" aria-hidden="true" />
                    <h1 class="text-display tracking-tight">
                        Build warm, audacious interfaces. Skip the cold gradient canvas.
                    </h1>
                    <p class="text-prose text-muted-foreground">
                        Paper textures, cartoon shadows, Plus Jakarta Sans display +
                        body. A design system that looks like someone actually cared —
                        because someone did.
                    </p>
                </div>

                <ul class="flex flex-col gap-3">
                    <li
                        v-for="badge in trustBadges"
                        :key="badge.text"
                        class="flex items-center gap-3"
                    >
                        <Chip
                            shape="icon"
                            size="sm"
                            :tone="`var(--section-color-${badge.section})`"
                        >
                            <component :is="badge.icon" class="size-4" aria-hidden="true" />
                        </Chip>
                        <span class="text-small">{{ badge.text }}</span>
                    </li>
                </ul>
            </div>

            <div
                class="flex flex-col justify-center gap-[calc(1.5rem_+_var(--density-gap,0rem))] bg-card/70 p-[calc(var(--card-pad-block,calc(--spacing(6)_*_1.272))_+_var(--density-pad,0rem))] backdrop-blur-sm lg:p-[calc(3.5rem_+_var(--density-pad,0rem))]"
            >
                <div class="flex flex-col gap-2">
                    <span class="section-label">Sign in</span>
                    <h3 class="text-heading">Welcome back</h3>
                    <p class="text-small text-muted-foreground">
                        New here?
                        <a
                            href="#"
                            class="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
                            >Create an account</a
                        >.
                    </p>
                </div>

                <form
                    class="flex flex-col gap-[calc(1.25rem_+_var(--density-gap,0rem))]"
                    @submit.prevent
                >
                    <div class="flex flex-col gap-2">
                        <Label for="auth-email">Email</Label>
                        <Input
                            id="auth-email"
                            v-model="email"
                            type="email"
                            autocomplete="email"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <div class="flex items-center justify-between">
                            <Label for="auth-password">Password</Label>
                            <a
                                href="#"
                                class="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                                >Forgot?</a
                            >
                        </div>
                        <Input
                            id="auth-password"
                            v-model="password"
                            type="password"
                            autocomplete="current-password"
                            placeholder="••••••••"
                        />
                    </div>

                    <label class="flex items-center gap-3 cursor-pointer select-none">
                        <Checkbox
                            :model-value="remember"
                            @update:model-value="
                                (v: boolean | 'indeterminate') =>
                                    (remember = v === true)
                            "
                        />
                        <span class="text-small">Remember me for 30 days</span>
                    </label>

                    <Button type="submit" size="lg" class="w-full">Sign in</Button>

                    <div class="flex items-center gap-3">
                        <Separator class="flex-1" />
                        <span class="text-mono-caption">or</span>
                        <Separator class="flex-1" />
                    </div>

                    <Button type="button" size="lg" class="w-full">
                        Continue with SSO
                    </Button>
                </form>
            </div>
        </div>
    </StoryPage>
</template>

<style scoped>
/* The brand panel ALWAYS paints the bright purple→tomato aurora (the panel is
   light-locked by construction — the aurora reads bright in both themes). So its
   ink must be light-locked DARK too: in dark mode the inherited `--foreground`
   flips to cream (hsl 48 10% 90%) and `--muted-foreground` to a light gray, which
   sink into the bright coral (the FD-R2 #1 defect). Pin the two ink tokens to
   their light-mode values on the panel so the heading + body copy stay legible
   dark ink over the always-bright backdrop — the W55 "light-locked panel needs
   light-locked ink" register, expressed as a local token pin (the panel is not a
   glass rung, so the `--glass-backdrop: light` bucket cannot reach its direct
   text). The section-color trust chips are already light-locked-correct.

   The token pin alone is NOT enough for the HEADING: `color` is an INHERITED
   property and `body { color: var(--foreground) }` already resolves it to cream
   ABOVE the panel, so the `<h2>` inherits that computed cream — re-pointing the
   token here does not re-resolve a `color` that was locked upstream. The body
   `<p>` survives because `text-muted-foreground` emits its own `color:
   var(--muted-foreground)` at the element (which DOES re-resolve the pin). So the
   panel must ALSO re-declare `color: var(--foreground)` to re-bind the inherited
   `color` against the pinned dark ink — that single re-declaration carries the
   heading + any un-utility'd text. */
.auth-brand-panel {
    --foreground: hsl(24 10% 10%);
    /* The muted body copy is darkened from the light-mode `38%` lightness: over
       the BRIGHTEST purple→tomato aurora region (a coral ~rgb(194,154,158)), the
       light-mode muted ink only clears ~2.5:1 — below AA. `20%` lightness lands
       the muted ink at ~5:1 over that brightest sample (π-measured) while staying
       clearly LIGHTER than the `10%` heading ink, so the muted/heading hierarchy
       reads. */
    --muted-foreground: hsl(24 9% 20%);
    --card-foreground: hsl(24 10% 10%);
    color: var(--foreground);
}
</style>
