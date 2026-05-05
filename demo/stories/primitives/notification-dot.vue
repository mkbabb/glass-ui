<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Bell, Inbox, MessageSquare, Settings } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { NotificationDot } from "@/components/custom/notification-dot";
import type { NotificationDotSize } from "@/components/custom/notification-dot";

const sizes: NotificationDotSize[] = ["xs", "sm", "md"];

const colors = [
    { name: "default", color: undefined },
    { name: "fourier", color: "var(--viz-fourier)" },
    { name: "section-5", color: "var(--section-color-5)" },
    { name: "section-2", color: "var(--section-color-2)" },
];
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p class="section-label">&lt;NotificationDot&gt;</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-3">
                A red eye on the rail.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Drop a notification dot on any container — top-right by default. Sized
                xs / sm / md, glow on demand. The pulse honours
                <code class="fira-code">prefers-reduced-motion</code>.
            </p>
            <FlourishDivider tone="rainbow" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Sizes × pulse matrix -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">sizes × pulse</p>
            <div
                class="rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <table class="border-separate border-spacing-x-12 border-spacing-y-6">
                    <thead>
                        <tr>
                            <th class="text-mono-caption text-left text-muted-foreground">
                                size
                            </th>
                            <th class="text-mono-caption text-center text-muted-foreground">
                                pulse off
                            </th>
                            <th class="text-mono-caption text-center text-muted-foreground">
                                pulse on
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="size in sizes" :key="size">
                            <td class="text-small text-foreground">{{ size }}</td>
                            <td class="text-center">
                                <span class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-cream">
                                    <Bell class="h-5 w-5" :stroke-width="1.75" />
                                    <NotificationDot :size="size" />
                                </span>
                            </td>
                            <td class="text-center">
                                <span class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-cream">
                                    <Bell class="h-5 w-5" :stroke-width="1.75" />
                                    <NotificationDot :size="size" pulse />
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Color overrides -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">color overrides</p>
            <div
                class="flex flex-wrap items-center gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <div
                    v-for="c in colors"
                    :key="c.name"
                    class="flex flex-col items-center gap-2"
                >
                    <span class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-cream">
                        <Bell class="h-5 w-5" :stroke-width="1.75" />
                        <NotificationDot :color="c.color" pulse />
                    </span>
                    <span class="text-mono-caption text-muted-foreground">
                        {{ c.name }}
                    </span>
                </div>
            </div>
        </section>

        <!-- Button overlay integration -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">integration · &lt;Button size="icon"&gt; overlay</p>
            <div
                class="flex flex-wrap items-center gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <span class="relative inline-flex">
                    <Button variant="cartoon" size="icon" aria-label="Inbox">
                        <Inbox class="h-5 w-5" :stroke-width="2" />
                    </Button>
                    <NotificationDot
                        size="md"
                        pulse
                        color="var(--viz-fourier)"
                        label="3 unread"
                    />
                </span>
                <span class="relative inline-flex">
                    <Button variant="cartoon" size="icon" aria-label="Messages">
                        <MessageSquare class="h-5 w-5" :stroke-width="2" />
                    </Button>
                    <NotificationDot
                        size="sm"
                        color="var(--section-color-5)"
                    />
                </span>
                <span class="relative inline-flex">
                    <Button variant="ghost" size="icon" aria-label="Settings">
                        <Settings class="h-5 w-5" :stroke-width="2" />
                    </Button>
                    <NotificationDot size="xs" />
                </span>
                <span class="text-mono-caption text-muted-foreground">
                    Wrap any icon button in <code class="fira-code">.relative</code>; drop the dot.
                </span>
            </div>
        </section>
    </StoryPage>
</template>
