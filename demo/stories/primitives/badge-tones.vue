<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    AlertTriangle,
    Award,
    CheckCircle2,
    Flame,
    Info,
    Rocket,
    ShieldAlert,
    Sparkles,
    XCircle,
    Zap,
} from "lucide-vue-next";
import { Badge, badgeVariants, badgeToneVariants } from "@/components/ui/badge";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { cn } from "@/utils/cn";

interface ToneRow {
    tone: "success" | "warning" | "destructive" | "info";
    label: string;
    defaultIcon: typeof CheckCircle2;
    overrideIcon: typeof CheckCircle2;
    overrideLabel: string;
    cssVar: string;
}

const tones: ToneRow[] = [
    {
        tone: "success",
        label: "Saved",
        defaultIcon: CheckCircle2,
        overrideIcon: Award,
        overrideLabel: "Earned",
        cssVar: "--success",
    },
    {
        tone: "warning",
        label: "Approaching limit",
        defaultIcon: AlertTriangle,
        overrideIcon: Flame,
        overrideLabel: "Hot",
        cssVar: "--warning",
    },
    {
        tone: "destructive",
        label: "Failed",
        defaultIcon: XCircle,
        overrideIcon: ShieldAlert,
        overrideLabel: "Blocked",
        cssVar: "--destructive",
    },
    {
        tone: "info",
        label: "Beta",
        defaultIcon: Info,
        overrideIcon: Sparkles,
        overrideLabel: "New",
        cssVar: "--info",
    },
];
</script>

<template>
    <StoryPage>
        <CreamSurface tone="cool" class="relative overflow-hidden">
            <p class="section-label">badge tones</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-3">
                Four meanings. Four colours.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                <code class="fira-code">tone</code> overlays semantic colour and a
                default Lucide icon. Override the icon with the <code class="fira-code">:icon</code>
                slot — the chassis stays. Absorbs the StatusPill use case.
            </p>
            <FlourishDivider tone="rainbow" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Default icon row -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">default icons · :tone="…"</p>
            <div
                class="grid gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon md:grid-cols-2"
            >
                <div
                    v-for="row in tones"
                    :key="row.tone"
                    class="flex items-center gap-[var(--space-phi-3)]"
                >
                    <span
                        class="block h-12 w-1.5 rounded-full"
                        :style="{ background: `var(${row.cssVar})` }"
                    />
                    <Badge
                        :class="cn(
                            badgeVariants({ variant: 'outline' }),
                            badgeToneVariants({ tone: row.tone }),
                        )"
                    >
                        <component
                            :is="row.defaultIcon"
                            class="h-3.5 w-3.5"
                            :stroke-width="2"
                        />
                        {{ row.label }}
                    </Badge>
                    <span class="text-mono-caption text-muted-foreground">
                        tone="{{ row.tone }}"
                    </span>
                </div>
            </div>
        </section>

        <!-- :icon override row -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">override · &lt;Component&gt; in slot</p>
            <div
                class="grid gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon md:grid-cols-2"
            >
                <div
                    v-for="row in tones"
                    :key="row.tone + 'override'"
                    class="flex items-center gap-[var(--space-phi-3)]"
                >
                    <Badge
                        :class="cn(
                            badgeVariants({ variant: 'outline' }),
                            badgeToneVariants({ tone: row.tone }),
                        )"
                    >
                        <component
                            :is="row.overrideIcon"
                            class="h-3.5 w-3.5"
                            :stroke-width="2"
                        />
                        {{ row.overrideLabel }}
                    </Badge>
                    <span class="text-mono-caption text-muted-foreground">
                        tone="{{ row.tone }}" · custom icon
                    </span>
                </div>
            </div>
        </section>

        <!-- In context — surveys / feed cards -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">in context · status pills on activity feed</p>
            <CreamSurface class="!gap-[var(--space-phi-3)] !p-[var(--space-phi-3)]">
                <div
                    v-for="(row, i) in [
                        { kind: 'success' as const, icon: Rocket, title: 'build #2048 deployed', meta: '12s ago · main' },
                        { kind: 'warning' as const, icon: Zap, title: 'rate-limit at 84%', meta: '7m ago · ingest' },
                        { kind: 'destructive' as const, icon: ShieldAlert, title: 'auth handshake failed', meta: '24m ago · gateway' },
                        { kind: 'info' as const, icon: Sparkles, title: 'new beta feature available', meta: '1h ago · changelog' },
                    ]"
                    :key="i"
                    class="flex items-center gap-3 border-b border-border/30 pb-[var(--space-phi-2)] last:border-b-0 last:pb-0"
                >
                    <Badge
                        :class="cn(
                            badgeVariants({ variant: 'outline' }),
                            badgeToneVariants({ tone: row.kind }),
                        )"
                    >
                        <component :is="row.icon" class="h-3.5 w-3.5" :stroke-width="2" />
                        {{ row.kind }}
                    </Badge>
                    <span class="text-small text-foreground">{{ row.title }}</span>
                    <span class="text-mono-caption ml-auto text-muted-foreground">
                        {{ row.meta }}
                    </span>
                </div>
            </CreamSurface>
        </section>
    </StoryPage>
</template>
