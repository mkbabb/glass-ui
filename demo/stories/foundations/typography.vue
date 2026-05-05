<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { cn } from "@/utils/cn";

// Standard ladder rows.
const ladder: { cls: string; label: string; sample: string }[] = [
    { cls: "text-display-5", label: "display-5", sample: "Golden" },
    { cls: "text-display-4", label: "display-4", sample: "Audacious" },
    { cls: "text-display-3", label: "display-3", sample: "Ornament" },
    { cls: "text-display-2", label: "display-2", sample: "Fraunces WONK" },
    { cls: "text-display", label: "display", sample: "Display" },
    { cls: "text-title", label: "title", sample: "Section title" },
    { cls: "text-heading", label: "heading", sample: "Subsection head" },
    { cls: "text-subheading", label: "subheading", sample: "Card title" },
    {
        cls: "text-prose",
        label: "prose",
        sample: "Long-form reading sits at prose — φ line-height, CM serif.",
    },
    {
        cls: "text-body",
        label: "body",
        sample: "Body copy uses Computer Modern at 1rem, 1.5 leading.",
    },
    { cls: "text-small", label: "small", sample: "Metadata and secondary body copy." },
    { cls: "text-caption", label: "caption", sample: "Caption · labels · hints" },
    { cls: "text-micro", label: "micro", sample: "Micro: badges, fine print" },
    { cls: "text-admin-label", label: "admin-label", sample: "ADMIN · UPPERCASE · MONO" },
    { cls: "text-math", label: "math", sample: "f(x) = ∑ aₙ φₙ(x)" },
    { cls: "text-math-body", label: "math-body", sample: "KaTeX-adjacent body math" },
    { cls: "text-mono-small", label: "mono-small", sample: "npm run dev" },
    { cls: "text-mono-caption", label: "mono-caption", sample: "mono · caption · caps" },
];

// Per-rung Fraunces axis baselines from src/styles/typography.css.
interface RungAxes {
    rung: string;
    cls: string;
    sample: string;
    wonk: number;
    soft: number;
    wdth: number;
}

const rungAxes: RungAxes[] = [
    { rung: "display-1", cls: "text-display", sample: "Aa", wonk: 1, soft: 0, wdth: 100 },
    { rung: "display-2", cls: "text-display-2", sample: "Aa", wonk: 1, soft: 25, wdth: 102 },
    { rung: "display-3", cls: "text-display-3", sample: "Aa", wonk: 1, soft: 50, wdth: 105 },
    { rung: "display-4", cls: "text-display-4", sample: "Aa", wonk: 1, soft: 75, wdth: 108 },
    { rung: "display-5", cls: "text-display-5", sample: "Aa", wonk: 1, soft: 100, wdth: 110 },
    { rung: "display-mega", cls: "text-display-mega", sample: "Aa", wonk: 1, soft: 100, wdth: 112 },
    { rung: "display-ultra", cls: "text-display-ultra", sample: "Aa", wonk: 1, soft: 100, wdth: 115 },
];

// Live playground.
const wonk = ref<0 | 1>(1);
const soft = ref(50);
const wdth = ref(105);
</script>

<template>
    <StoryPage>
        <!-- Hero — display-mega in the wild -->
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p class="section-label">typography</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-2">
                Fraunces, Aa.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Three families: Fraunces for display, Computer Modern for prose, Fira
                Code for mono. The display rungs wear per-rung WONK / SOFT / wdth axes
                so big sizes feel softer and slightly wider — never pinched.
            </p>
            <FlourishDivider tone="gold" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- DisplayHero showcase: mega + ultra -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">&lt;DisplayHero&gt; · mega + ultra</p>
            <div class="rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon">
                <p class="text-mono-caption text-muted-foreground">
                    size="display-mega" · variation="wonk"
                </p>
                <DisplayHero size="display-mega" variation="wonk" class="mt-2">
                    Display Mega
                </DisplayHero>
                <p class="text-mono-caption mt-[var(--space-phi-3)] text-muted-foreground">
                    size="display-ultra" · variation="stretch"
                </p>
                <DisplayHero size="display-ultra" variation="stretch" class="mt-2 leading-none">
                    Ultra
                </DisplayHero>
                <p class="text-mono-caption mt-[var(--space-phi-3)] text-muted-foreground">
                    size="display-3" · variation="depth"
                </p>
                <DisplayHero size="display-3" variation="depth" class="mt-2">
                    Layered.
                </DisplayHero>
            </div>
        </section>

        <!-- Per-rung Fraunces axis evidence -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">per-rung Fraunces axes · WONK / SOFT / wdth</p>
            <div class="rounded-2xl border border-border bg-card shadow-cartoon">
                <div
                    v-for="r in rungAxes"
                    :key="r.rung"
                    class="grid grid-cols-[8rem_1fr_14rem] items-baseline gap-[var(--space-phi-3)] border-b border-border/30 px-[var(--space-phi-3)] py-3 last:border-b-0"
                >
                    <span class="text-mono-caption text-muted-foreground">
                        {{ r.rung }}
                    </span>
                    <span :class="cn(r.cls, 'text-foreground')">{{ r.sample }}</span>
                    <span class="text-mono-caption text-foreground/70">
                        WONK {{ r.wonk }} · SOFT {{ r.soft }} · wdth {{ r.wdth }}
                    </span>
                </div>
            </div>
            <p class="text-small text-muted-foreground italic">
                Each display rung carries its own variation-settings tuple. Bigger sizes
                soften (SOFT 100) and widen (wdth 112-115) so the eye doesn't see the
                same letterforms scaled — it sees a fluid family.
            </p>
        </section>

        <!-- Live axis playground -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">axis playground · live</p>
            <div
                class="rounded-2xl border border-border bg-cream-warm p-[var(--space-phi-4)] shadow-cartoon"
            >
                <p
                    class="text-display-mega leading-none"
                    style="font-family: var(--font-display)"
                    :style="{
                        fontVariationSettings: `'WONK' ${wonk}, 'SOFT' ${soft}, 'wdth' ${wdth}`,
                    }"
                >
                    Aa Quil
                </p>
                <div
                    class="mt-[var(--space-phi-3)] grid gap-[var(--space-phi-2)] md:grid-cols-3"
                >
                    <label class="flex flex-col gap-1">
                        <span class="text-mono-caption text-muted-foreground">
                            WONK · {{ wonk }}
                        </span>
                        <button
                            type="button"
                            class="rounded-md border-2 border-border bg-cream px-3 py-1 text-left text-small transition hover:bg-cream-warm"
                            @click="wonk = wonk === 0 ? 1 : 0"
                        >
                            {{ wonk === 1 ? "ON · italic flair" : "OFF · neutral roman" }}
                        </button>
                    </label>
                    <label class="flex flex-col gap-1">
                        <span class="text-mono-caption text-muted-foreground">
                            SOFT · {{ soft }}
                        </span>
                        <input
                            v-model.number="soft"
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                        />
                    </label>
                    <label class="flex flex-col gap-1">
                        <span class="text-mono-caption text-muted-foreground">
                            wdth · {{ wdth }}
                        </span>
                        <input
                            v-model.number="wdth"
                            type="range"
                            min="100"
                            max="125"
                            step="1"
                        />
                    </label>
                </div>
            </div>
        </section>

        <!-- text-display-stat — hero metric -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">.text-display-stat · hero metric</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-3">
                <div
                    class="rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
                >
                    <p class="text-mono-caption text-muted-foreground">downloads</p>
                    <p class="text-display-stat" style="color: var(--viz-fourier)">
                        12,840
                    </p>
                    <p class="text-small text-foreground/70">+18% week over week</p>
                </div>
                <div
                    class="rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
                >
                    <p class="text-mono-caption text-muted-foreground">latency p95</p>
                    <p class="text-display-stat" style="color: var(--viz-chebyshev)">
                        47ms
                    </p>
                    <p class="text-small text-foreground/70">−9ms vs baseline</p>
                </div>
                <div
                    class="rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
                >
                    <p class="text-mono-caption text-muted-foreground">retention</p>
                    <p class="text-display-stat" style="color: var(--viz-legendre)">
                        91.4%
                    </p>
                    <p class="text-small text-foreground/70">cohort 2026-Q1</p>
                </div>
            </div>
        </section>

        <!-- text-prose-lettrine — long-form proof -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">.text-prose-lettrine · drop-cap recipe</p>
            <CreamSurface tone="cool" class="max-w-prose">
                <p class="text-prose text-prose-lettrine text-foreground">
                    Fraunces was drawn after Phototype-era Morris Fuller Benton specimens
                    — broad, soft, slightly wonky letterforms made for billboard sizes.
                    The lettrine recipe pulls a single capital out of the body copy at
                    3.5em with WONK 1, SOFT 100, and wdth 105, tinted by the
                    surrounding section accent. It closes the gap between editorial
                    typography and the rest of the system.
                </p>
            </CreamSurface>
        </section>

        <!-- Standard ladder -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">ladder · all rungs</p>
            <div class="flex flex-col gap-3">
                <div
                    v-for="row in ladder"
                    :key="row.label"
                    class="grid grid-cols-[10rem_1fr] items-baseline gap-6 border-b border-border/40 pb-4"
                >
                    <span class="text-mono-caption text-muted-foreground">
                        {{ row.label }}
                    </span>
                    <span :class="cn(row.cls, 'text-foreground')">{{ row.sample }}</span>
                </div>
            </div>
        </section>

        <!-- Signature glyph — kept from the original story -->
        <div
            class="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
        >
            <p class="text-admin-label text-muted-foreground">Signature glyph</p>
            <div class="fourier-f text-display-5 leading-none italic">ℱ</div>
            <p class="text-small text-muted-foreground">
                <code class="fira-code">.fourier-f</code> — Fraunces WONK italic,
                viz-fourier red.
            </p>
        </div>
    </StoryPage>
</template>
