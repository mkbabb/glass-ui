<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { MathFormula } from "@/components/custom/math-formula";
import { MathGlyph } from "@/components/custom/math-glyph";
import { MathSurface } from "@/components/custom/math-surface";
</script>

<template>
    <StoryPage>
        <CreamSurface tone="cool" class="paper-grain-overlay max-w-3xl mx-auto">
            <!-- Header — section accent rule via FlourishDivider -->
            <header class="flex flex-col gap-[var(--space-phi-1)]">
                <p
                    class="section-label"
                    :style="{ color: 'var(--section-color-3)' }"
                >
                    § 3 · Convergence
                </p>
                <h2 class="text-display-3" :style="{ color: 'var(--section-color-3)' }">
                    On the pointwise limit of partial sums
                </h2>
            </header>

            <FlourishDivider tone="section-3" class="my-[var(--space-phi-3)]" />

            <div class="flex flex-col gap-[var(--space-phi-3)]">
                <p class="text-prose">
                    Let
                    <MathGlyph char="f" :axes="{ wonk: 1, soft: 50, wdth: 105 }" />
                    be a piecewise-continuous function on
                    <span class="fira-code">[−π, π]</span>, and consider its Fourier series
                    <MathGlyph
                        char="S"
                        :axes="{ wonk: 1, soft: 75, wdth: 110 }"
                        :style="{ color: 'var(--viz-fourier)' }"
                    />ₙ. At every point of continuity, the partial sums converge to the value of
                    the function; at each jump discontinuity, they converge to the average of the
                    one-sided limits.
                </p>

                <!-- Block-quote uses MathFormula in inline-pill mode for the attribution,
                     and a plain blockquote for the body. -->
                <blockquote
                    class="relative my-[var(--space-phi-2)] border-l-[3px] py-2 pl-6 italic"
                    :style="{ borderColor: 'var(--section-color-3)' }"
                >
                    <p class="text-prose">
                        “The series converges, but the convergence is not uniform — and it is
                        precisely in this distinction that the whole theory of Fourier analysis
                        lives and breathes.”
                    </p>
                    <footer class="mt-2 text-small not-italic text-muted-foreground">
                        —
                        <MathGlyph
                            font="serif"
                            :axes="{ wonk: 0, soft: 0, wdth: 100 }"
                            :weight="500"
                        >
                            du Bois-Reymond
                        </MathGlyph>, 1873
                    </footer>
                </blockquote>

                <p class="text-prose">
                    The full statement, sometimes called the Dirichlet–Jordan criterion, can be
                    written compactly. For bounded variation
                    <MathGlyph char="f" :axes="{ wonk: 1, soft: 50, wdth: 105 }" />:
                </p>

                <!-- Primary derivation — MathFormula block with viz-fourier accent -->
                <MathFormula accent="fourier">
                    <div
                        class="fira-code text-center text-[1.15rem] leading-loose tabular-nums"
                    >
                        <div>
                            Sₙ(x) &nbsp;=&nbsp; a₀ &nbsp;+&nbsp;
                            <MathGlyph
                                font="serif"
                                :weight="500"
                                :axes="{ wonk: 0 }"
                                :style="{ color: 'var(--viz-fourier)' }"
                            >∑</MathGlyph>
                            <sub class="text-[0.7em]">k=1</sub
                            ><sup class="text-[0.7em]">n</sup>
                            &nbsp;(aₖ cos kx &nbsp;+&nbsp; bₖ sin kx)
                        </div>
                        <div class="mt-4 text-[0.95em] text-muted-foreground">
                            lim<sub class="text-[0.7em]">n→∞</sub> Sₙ(x) &nbsp;=&nbsp; ½ · &lbrack;
                            f(x⁺) &nbsp;+&nbsp; f(x⁻) &rbrack;
                        </div>
                    </div>
                    <template #caption>
                        for all x ∈ (−π, π), whenever
                        <MathGlyph char="f" :axes="{ wonk: 1, soft: 50 }" />
                        has bounded variation on a neighborhood of x.
                    </template>
                </MathFormula>

                <p class="text-prose">
                    What makes this remarkable is that
                    <span class="italic">no assumption of continuity</span> is required. Bounded
                    variation alone — a geometric condition, not an analytic one — suffices to
                    guarantee convergence almost everywhere, with the integral
                    <MathSurface mode="inline">
                        <MathGlyph char="∫" font="display" :weight="500" :axes="{ wonk: 1 }" />
                        <sub class="text-[0.65em]">−π</sub
                        ><sup class="text-[0.65em]">π</sup>
                    </MathSurface>
                    acting as the weighting on each basis element. The whole apparatus rests on
                    π, orthogonality, and ∞-many cleanly decoupled projections.
                </p>

                <!-- Closing identity in display surface -->
                <MathSurface mode="display">
                    <p class="fira-code text-prose tabular-nums">
                        ⟨φₘ, φₙ⟩ &nbsp;=&nbsp; π · δ<sub>mn</sub>
                    </p>
                </MathSurface>
            </div>

            <FlourishDivider tone="section-3" class="mt-[var(--space-phi-3)]" />

            <p class="text-mono-caption mt-[var(--space-phi-2)] text-muted-foreground">
                CreamSurface · MathFormula · MathGlyph · MathSurface · FlourishDivider
            </p>
        </CreamSurface>
    </StoryPage>
</template>
