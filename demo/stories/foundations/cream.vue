<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { cn } from "@/utils/cn";

interface CreamToken {
    name: string;
    cssVar: string;
    note: string;
}

const tokens: CreamToken[] = [
    { name: "cream", cssVar: "--cream", note: "default surface" },
    { name: "cream-warm", cssVar: "--cream-warm", note: "hue 40 — cardstock" },
    { name: "cream-cool", cssVar: "--cream-cool", note: "hue 54 — paper" },
    { name: "cream-edge", cssVar: "--cream-edge", note: "hairline · neutral-3" },
    {
        name: "cream-foreground",
        cssVar: "--cream-foreground",
        note: "warm charcoal type",
    },
];

const palette = ref<Record<string, string>>({});
const paletteDark = ref<Record<string, string>>({});

function readTokens(target: HTMLElement): Record<string, string> {
    const styles = window.getComputedStyle(target);
    const out: Record<string, string> = {};
    for (const t of tokens) out[t.cssVar] = styles.getPropertyValue(t.cssVar).trim();
    return out;
}

const lightSurface = ref<HTMLElement | null>(null);
const darkSurface = ref<HTMLElement | null>(null);

onMounted(() => {
    if (lightSurface.value) palette.value = readTokens(lightSurface.value);
    if (darkSurface.value) paletteDark.value = readTokens(darkSurface.value);
});

const samples = computed(() => [
    { mode: "light", scope: lightSurface, values: palette.value },
    { mode: "dark", scope: darkSurface, values: paletteDark.value },
]);
</script>

<template>
    <StoryPage>
        <!-- Hero — proves cream IS the substrate, not the demo. -->
        <CreamSurface class="relative overflow-hidden">
            <div
                class="absolute inset-0 -z-10 opacity-[0.18]"
                style="background-image: radial-gradient(circle at 18% 24%, var(--gold-light) 0%, transparent 42%), radial-gradient(circle at 82% 78%, var(--rainbow-pastel-blue) 0%, transparent 50%)"
            />
            <p class="section-label">cream identity</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-4">
                Warm cream
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Hue 48, value 96. Glass-ui's substrate is not generic neutral grey — it's
                cardstock with a warm charcoal counterpart, paired and named so consumers
                stop reaching for <code class="fira-code">bg-white</code>.
            </p>
            <FlourishDivider tone="gold" class="mt-[var(--space-phi-3)]" />
            <p class="text-mono-caption mt-[var(--space-phi-2)] text-muted-foreground">
                ⟶ <code class="fira-code">CreamSurface</code> ·
                <code class="fira-code">.cream-surface</code> ·
                <code class="fira-code">var(--cream)</code>
            </p>
        </CreamSurface>

        <!-- Light + dark contrast pair -->
        <div class="grid gap-[var(--space-phi-3)] lg:grid-cols-2">
            <!-- LIGHT -->
            <div ref="lightSurface" class="relative">
                <CreamSurface>
                    <p class="section-label">light · default tone</p>
                    <h2 class="text-display-3 mt-2 mb-[var(--space-phi-2)]">
                        It reads as paper.
                    </h2>
                    <p class="text-prose text-foreground/80">
                        Cream is canon's identity. The surface ships a paper-grain
                        overlay, a hairline cream-edge border, and a cartoon-sm shadow —
                        no per-consumer recipe.
                    </p>
                </CreamSurface>
            </div>

            <!-- DARK (locally scoped via .dark) -->
            <div ref="darkSurface" class="dark relative">
                <CreamSurface>
                    <p class="section-label">dark · same noun</p>
                    <h2 class="text-display-3 mt-2 mb-[var(--space-phi-2)]">
                        Same name, deep night.
                    </h2>
                    <p class="text-prose text-foreground/80">
                        Token names persist; values flip. Cream-warm becomes a rich
                        charcoal at hue 28. Consumers don't branch on
                        <code class="fira-code">isDark</code>.
                    </p>
                </CreamSurface>
            </div>
        </div>

        <!-- Tonal triptych -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">tones · default · warm · cool</p>
            <div class="grid gap-[var(--space-phi-2)] md:grid-cols-3">
                <CreamSurface>
                    <p class="text-mono-caption text-muted-foreground">data-tone=∅</p>
                    <p class="text-display-3 mt-1">Aa</p>
                    <p class="text-small text-foreground/70 mt-2">
                        baseline — <code class="fira-code">--cream</code>
                    </p>
                </CreamSurface>
                <CreamSurface tone="warm">
                    <p class="text-mono-caption text-muted-foreground">tone="warm"</p>
                    <p class="text-display-3 mt-1">Aa</p>
                    <p class="text-small text-foreground/70 mt-2">
                        cardstock — hue 40, gold-leaning
                    </p>
                </CreamSurface>
                <CreamSurface tone="cool">
                    <p class="text-mono-caption text-muted-foreground">tone="cool"</p>
                    <p class="text-display-3 mt-1">Aa</p>
                    <p class="text-small text-foreground/70 mt-2">
                        airier — hue 54, paper-leaning
                    </p>
                </CreamSurface>
            </div>
        </section>

        <!-- Token table — the values themselves -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">tokens · resolved values</p>
            <CreamSurface tone="warm">
                <table class="w-full border-separate border-spacing-y-2">
                    <thead>
                        <tr class="text-left">
                            <th class="text-mono-caption text-muted-foreground">token</th>
                            <th class="text-mono-caption text-muted-foreground">light</th>
                            <th class="text-mono-caption text-muted-foreground">dark</th>
                            <th class="text-mono-caption text-muted-foreground">role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in tokens" :key="t.name">
                            <td class="pr-4">
                                <span
                                    class="inline-flex items-center gap-2 rounded-md border border-border/40 px-2 py-1"
                                >
                                    <span
                                        class="h-4 w-4 rounded-sm border border-border/60"
                                        :style="{ background: `var(${t.cssVar})` }"
                                    />
                                    <code class="fira-code text-small">{{ t.name }}</code>
                                </span>
                            </td>
                            <td class="text-mono-caption pr-4 text-foreground/80">
                                {{ samples[0]!.values[t.cssVar] || "—" }}
                            </td>
                            <td class="text-mono-caption pr-4 text-foreground/80">
                                {{ samples[1]!.values[t.cssVar] || "—" }}
                            </td>
                            <td class="text-small text-foreground/70">{{ t.note }}</td>
                        </tr>
                    </tbody>
                </table>
            </CreamSurface>
        </section>
    </StoryPage>
</template>
