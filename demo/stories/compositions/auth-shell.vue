<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Lock, ShieldCheck, Sparkles, Users } from "@lucide/vue";
import { Button } from "../../../src/components/ui/button";
import { Checkbox } from "../../../src/components/ui/checkbox";
import { Input } from "../../../src/components/ui/input";
import { Label } from "../../../src/components/ui/label";
import { Separator } from "../../../src/components/ui/separator";
import { cn } from "../../../src/utils/cn";

const wonkSettings = '"WONK" 1, "SOFT" 0';

// The split-auth shell declares a reconstructing Fourier field on its manifest
// row; the page chassis renders it behind a glassy hero card. The brand panel
// (left half) reads translucent so the field shows through; the form (right
// half) stays a calmer surface for legibility.

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
    <StoryPage>
        <div
            :class="cn(
                'overflow-hidden rounded-[var(--radius-dialog)] border-2 border-foreground/10',
                'grid min-h-[32rem] shadow-[var(--shadow-card)] lg:grid-cols-2',
            )"
        >
            <div
                class="relative isolate flex flex-col justify-between gap-[calc(2rem_+_var(--density-gap,0rem))] overflow-hidden p-[calc(2.5rem_+_var(--density-pad,0rem))] lg:p-[calc(3.5rem_+_var(--density-pad,0rem))]"
            >
                <!-- The brand panel reads translucent so the Fourier field the
                     chassis renders behind this card shows through. -->
                <div class="relative z-10 flex items-center gap-3">
                    <span
                        class="fourier-f font-display italic text-4xl leading-none"
                        :style="{
                            color: 'var(--viz-fourier, hsl(358 72% 52%))',
                            fontVariationSettings: wonkSettings,
                        }"
                        aria-hidden="true"
                    >f</span>
                    <span class="font-display text-xl tracking-tight">glass-ui</span>
                </div>

                <div class="flex max-w-md flex-col gap-[calc(1.5rem_+_var(--density-gap,0rem))]">
                    <Sparkles class="size-5 text-muted-foreground" aria-hidden="true" />
                    <h2 class="text-display tracking-tight">
                        Build warm, audacious interfaces. Skip the cold gradient canvas.
                    </h2>
                    <p class="text-prose text-muted-foreground">
                        Paper textures, cartoon shadows, Plus Jakarta Sans display + body. A
                        design system that looks like someone actually cared — because someone did.
                    </p>
                </div>

                <ul class="flex flex-col gap-3">
                    <li
                        v-for="badge in trustBadges"
                        :key="badge.text"
                        class="flex items-center gap-3"
                    >
                        <span
                            class="flex size-8 items-center justify-center rounded-full"
                            :style="{
                                backgroundColor: `color-mix(in srgb, var(--section-color-${badge.section}, var(--muted)) 25%, transparent)`,
                                color: `var(--section-color-${badge.section}, var(--muted-foreground))`,
                            }"
                        >
                            <component :is="badge.icon" class="size-4" aria-hidden="true" />
                        </span>
                        <span class="text-small">{{ badge.text }}</span>
                    </li>
                </ul>
            </div>

            <div class="flex flex-col justify-center gap-[calc(1.5rem_+_var(--density-gap,0rem))] bg-card/70 p-[calc(2.5rem_+_var(--density-pad,0rem))] backdrop-blur-sm lg:p-[calc(3.5rem_+_var(--density-pad,0rem))]">
                <div class="flex flex-col gap-2">
                    <span class="text-admin-label section-label">Sign in</span>
                    <h3 class="text-heading">Welcome back</h3>
                    <p class="text-small text-muted-foreground">
                        New here?
                        <a
                            href="#"
                            class="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
                        >Create an account</a>.
                    </p>
                </div>

                <form class="flex flex-col gap-[calc(1.25rem_+_var(--density-gap,0rem))]" @submit.prevent>
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
                            >Forgot?</a>
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
                        <Checkbox :model-value="remember" @update:model-value="(v: boolean | 'indeterminate') => (remember = v === true)" />
                        <span class="text-small">Remember me for 30 days</span>
                    </label>

                    <Button type="submit" size="lg" class="w-full">Sign in</Button>

                    <div class="flex items-center gap-3">
                        <Separator class="flex-1" />
                        <span class="text-mono-caption">or</span>
                        <Separator class="flex-1" />
                    </div>

                    <Button type="button" variant="outline" size="lg" class="w-full">
                        Continue with SSO
                    </Button>
                </form>
            </div>
        </div>
    </StoryPage>
</template>
