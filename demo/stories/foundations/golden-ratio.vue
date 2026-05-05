<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { MathFormula } from "@/components/custom/math-formula";
import { MathGlyph } from "@/components/custom/math-glyph";
import { cn } from "@/utils/cn";

const PHI = 1.618033988749895;
const SQRT_PHI = Math.sqrt(PHI);

interface Constant {
    glyph: string;
    label: string;
    value: number;
    note: string;
}

const constants: Constant[] = [
    { glyph: "1", label: "unity", value: 1, note: "the rung" },
    { glyph: "√φ", label: "sqrt phi", value: SQRT_PHI, note: "type-step" },
    { glyph: "φ", label: "phi", value: PHI, note: "spacing-step" },
    { glyph: "φ²", label: "phi squared", value: PHI * PHI, note: "leading apex" },
    { glyph: "1/φ", label: "phi reciprocal", value: 1 / PHI, note: "breath cadence" },
];

interface SpacingRung {
    name: string;
    cssVar: string;
    rem: string;
    formula: string;
}

const spacing: SpacingRung[] = [
    { name: "phi-1", cssVar: "--space-phi-1", rem: "0.618rem", formula: "1/φ" },
    { name: "phi-2", cssVar: "--space-phi-2", rem: "1rem", formula: "1" },
    { name: "phi-3", cssVar: "--space-phi-3", rem: "1.618rem", formula: "φ" },
    { name: "phi-4", cssVar: "--space-phi-4", rem: "2.618rem", formula: "φ²" },
];

interface DisplayRung {
    cls: string;
    name: string;
    sample: string;
    formula: string;
}

const display: DisplayRung[] = [
    { cls: "text-display", name: "display", sample: "Aa φ², √φ", formula: "φ²" },
    { cls: "text-display-2", name: "display-2", sample: "Aa φ²·⁵", formula: "φ²·⁵" },
    { cls: "text-display-3", name: "display-3", sample: "Aa φ³", formula: "φ³" },
    { cls: "text-display-4", name: "display-4", sample: "Aa φ³·⁵", formula: "φ³·⁵" },
    { cls: "text-display-5", name: "display-5", sample: "Aa φ⁴", formula: "φ⁴" },
    { cls: "text-display-mega", name: "display-mega", sample: "φ⁵", formula: "φ⁵" },
    { cls: "text-display-ultra", name: "display-ultra", sample: "φ⁶", formula: "φ⁶" },
];

interface RadiusRung {
    name: string;
    cssVar: string;
}

const radii: RadiusRung[] = [
    { name: "xs", cssVar: "--radius-xs" },
    { name: "sm", cssVar: "--radius-sm" },
    { name: "md", cssVar: "--radius-md" },
    { name: "lg", cssVar: "--radius-lg" },
    { name: "xl", cssVar: "--radius-xl" },
    { name: "2xl", cssVar: "--radius-2xl" },
    { name: "3xl", cssVar: "--radius-3xl" },
    { name: "pill", cssVar: "--radius-pill" },
];
</script>

<template>
    <StoryPage>
        <!-- Hero glyph reveal -->
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <div
                class="pointer-events-none absolute -right-[12%] top-1/2 -translate-y-1/2 select-none opacity-15"
            >
                <MathGlyph
                    char="φ"
                    font="display"
                    :weight="500"
                    :axes="{ wonk: 1, soft: 100, wdth: 125 }"
                    class="!text-[28rem] !leading-none"
                    style="color: var(--gold)"
                />
            </div>
            <p class="section-label">the system's secret</p>
            <DisplayHero size="display-mega" variation="stretch" class="mt-2 mb-3">
                One number runs everything.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Type stepping uses <strong class="font-display italic">√φ</strong> ≈
                1.272, spacing uses <strong class="font-display italic">φ</strong> ≈
                1.618, and breath cadence runs at
                <strong class="font-display italic">1/φ²</strong>. Nothing here is
                "round-up to 16px" — the rungs are deliberate.
            </p>
            <FlourishDivider tone="gold" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Constants -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">constants</p>
            <div class="grid gap-[var(--space-phi-2)] md:grid-cols-5">
                <div
                    v-for="c in constants"
                    :key="c.label"
                    class="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
                >
                    <MathGlyph
                        :char="c.glyph"
                        font="display"
                        :weight="500"
                        class="!text-[3.5rem] !leading-none"
                        style="color: var(--gold-dark)"
                    />
                    <span class="text-mono-caption text-muted-foreground">
                        {{ c.label }}
                    </span>
                    <span class="text-display-stat text-foreground !text-[1.4rem]">
                        {{ c.value.toFixed(4) }}
                    </span>
                    <span class="text-mono-caption text-muted-foreground italic">
                        {{ c.note }}
                    </span>
                </div>
            </div>
        </section>

        <!-- Definition formula -->
        <MathFormula accent="amber">
            <span class="text-display-3 italic" style="font-family: var(--font-display)">
                <MathGlyph char="φ" :axes="{ wonk: 1, soft: 100, wdth: 110 }" />
                = (1 + √5) / 2 ≈ 1.6180
            </span>
            <template #caption>
                The unique positive root of x² − x − 1 = 0 — diagonal-of-pentagon /
                edge-of-pentagon, leaf phyllotaxis, the type rung between
                <code class="fira-code">--type-display-1</code> and
                <code class="fira-code">--type-display-2</code>.
            </template>
        </MathFormula>

        <!-- Type-scale ladder, descending -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">type · descending φ-scale</p>
            <div class="flex flex-col gap-[var(--space-phi-2)]">
                <div
                    v-for="row in display"
                    :key="row.name"
                    class="grid grid-cols-[10rem_1fr_5rem] items-baseline gap-[var(--space-phi-3)] border-b border-border/30 pb-3"
                >
                    <span class="text-mono-caption text-muted-foreground">
                        {{ row.name }}
                    </span>
                    <span :class="cn(row.cls, 'text-foreground')">{{ row.sample }}</span>
                    <span
                        class="text-mono-caption text-right italic"
                        style="color: var(--gold-dark)"
                    >
                        {{ row.formula }}
                    </span>
                </div>
            </div>
        </section>

        <!-- Spacing rungs visualised -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">spacing · phi rungs</p>
            <div
                class="flex flex-col gap-[var(--space-phi-2)] rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
            >
                <div
                    v-for="s in spacing"
                    :key="s.name"
                    class="flex items-center gap-[var(--space-phi-3)]"
                >
                    <span
                        class="text-mono-caption w-20 text-right text-muted-foreground"
                    >
                        {{ s.name }}
                    </span>
                    <span
                        class="block h-3 rounded-full"
                        :style="{
                            width: `var(${s.cssVar})`,
                            background: `linear-gradient(90deg, var(--rainbow-pastel-yellow), var(--gold))`,
                        }"
                    />
                    <span class="text-small text-foreground/80">
                        <code class="fira-code">{{ s.rem }}</code>
                    </span>
                    <span
                        class="text-mono-caption italic"
                        style="color: var(--gold-dark)"
                    >
                        {{ s.formula }}
                    </span>
                </div>
            </div>
        </section>

        <!-- Radius family -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">radius · the body's edges</p>
            <div class="grid gap-[var(--space-phi-2)] sm:grid-cols-4 md:grid-cols-8">
                <div
                    v-for="r in radii"
                    :key="r.name"
                    class="flex flex-col items-center gap-2"
                >
                    <span
                        class="block h-20 w-20 border-2 border-border bg-cream-warm shadow-cartoon-sm"
                        :style="{ borderRadius: `var(${r.cssVar})` }"
                    />
                    <span class="text-mono-caption text-muted-foreground">
                        {{ r.name }}
                    </span>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
