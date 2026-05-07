<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { cn } from "../../../src/utils/cn";

const sectionAccent = "var(--section-color-3, hsl(265 65% 62%))";
const fourierAccent = "var(--viz-fourier, hsl(358 72% 52%))";
</script>

<template>
    <StoryPage>
        <article
            :class="cn(
                'max-w-3xl rounded-[var(--radius-card)] border border-border/40 bg-card/60',
                'px-8 py-10 md:px-12 md:py-14 backdrop-blur-sm',
                'paper-grain-overlay',
            )"
        >
            <header
                class="flex flex-col gap-2 border-l-[3px] pl-6 mb-10"
                :style="{ borderColor: sectionAccent }"
            >
                <span
                    class="text-admin-label section-label font-mono"
                    :style="{ color: sectionAccent }"
                >
                    § 3 · Convergence
                </span>
                <h2 class="text-title">On the pointwise limit of partial sums</h2>
            </header>

            <div class="flex flex-col gap-6">
                <p class="text-prose">
                    Let <span class="fira-code text-[1.05em]">f</span> be a piecewise-continuous
                    function on
                    <span class="fira-code text-[1.05em]">[−π, π]</span>, and consider its
                    Fourier series
                    <span
                        class="font-display italic align-baseline"
                        :style="{ color: fourierAccent, fontSize: '1.15em' }"
                    >S</span
                    >ₙ. At every point of continuity, the partial sums converge to the value of the
                    function; at each jump discontinuity, they converge to the average of the
                    one-sided limits.
                </p>

                <blockquote
                    class="relative my-4 border-l-[3px] pl-6 pr-4 py-2 italic"
                    :style="{
                        borderColor: sectionAccent,
                        color: 'var(--foreground)',
                    }"
                >
                    <p class="text-prose">
                        &ldquo;The series converges, but the convergence is not uniform — and it is
                        precisely in this distinction that the whole theory of Fourier analysis lives
                        and breathes.&rdquo;
                    </p>
                    <footer class="not-italic text-small text-muted-foreground mt-2">
                        — <span class="font-display">du Bois-Reymond</span>, 1873
                    </footer>
                </blockquote>

                <p class="text-prose">
                    The full statement, sometimes called the Dirichlet–Jordan criterion, can be
                    written compactly. For bounded variation
                    <span class="fira-code text-[1.05em]">f</span>:
                </p>

                <div
                    class="my-2 rounded-[var(--radius-input)] border-l-[3px] bg-muted/30 px-6 py-6"
                    :style="{ borderColor: fourierAccent }"
                >
                    <div
                        class="fira-code text-[1.15rem] leading-loose tabular-nums text-center"
                    >
                        <div>
                            Sₙ(x) &nbsp;=&nbsp; a₀ &nbsp;+&nbsp;
                            <span
                                class="inline-block align-middle"
                                :style="{ color: fourierAccent }"
                                >∑</span
                            >
                            <sub class="text-[0.7em]">k=1</sub><sup class="text-[0.7em]">n</sup>
                            &nbsp;(aₖ cos kx &nbsp;+&nbsp; bₖ sin kx)
                        </div>
                        <div class="mt-4 text-muted-foreground text-[0.95em]">
                            lim<sub class="text-[0.7em]">n→∞</sub> Sₙ(x) &nbsp;=&nbsp;
                            ½ · &lbrack; f(x⁺) &nbsp;+&nbsp; f(x⁻) &rbrack;
                        </div>
                        <div class="mt-4 text-muted-foreground text-[0.85em]">
                            for all x ∈ (−π, π), whenever f has bounded variation on a neighborhood
                            of x.
                        </div>
                    </div>
                </div>

                <p class="text-prose">
                    What makes this remarkable is that
                    <span class="italic">no assumption of continuity</span> is required. Bounded
                    variation alone — a geometric condition, not an analytic one — is enough to
                    guarantee convergence almost everywhere, with the integral
                    <span class="fira-code">∫</span>
                    <sub class="text-[0.65em]">−π</sub><sup class="text-[0.65em]">π</sup>
                    acting as the weighting on each basis element. The whole apparatus rests on π,
                    orthogonality, and ∞-many cleanly decoupled projections.
                </p>
            </div>
        </article>
    </StoryPage>
</template>
