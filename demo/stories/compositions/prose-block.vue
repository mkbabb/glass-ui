<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Card } from "@/components/ui/card";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { MathFormula } from "@/components/custom/math-formula";
</script>

<template>
    <StoryPage>
        <!-- Header strip -->
        <Card variant="paper">
            <header class="flex flex-col gap-[var(--space-phi-2)]">
                <p class="section-label">entry · ephemeris</p>
                <DisplayHero
                    size="display-mega"
                    variation="wonk"
                    :style="{ color: 'var(--section-color-2)' }"
                >
                    ephemeris
                </DisplayHero>
                <p
                    class="text-mono-small"
                    :style="{ color: 'var(--section-color-2)' }"
                >
                    /əˈfɛm.ə.ɹɪs/ · noun · plural ephemerides
                </p>
            </header>
            <FlourishDivider tone="section-2" class="my-[var(--space-phi-3)]" />

            <!-- Two-column body -->
            <div class="grid gap-[var(--space-phi-4)] md:grid-cols-2">
                <!-- LEFT: Etymology with mandatory lettrine -->
                <section class="flex flex-col gap-[var(--space-phi-2)]">
                    <p class="section-label">Etymology</p>
                    <p class="text-prose-lettrine text-foreground/85">
                        From the Greek <span class="font-display italic">ἐφημερίς</span>
                        (<em>ephēmerís</em>), <em>diary</em> or <em>journal</em>, derived from
                        <span class="font-display italic">ἐπί</span> (<em>upon</em>) +
                        <span class="font-display italic">ἡμέρα</span> (<em>day</em>) — literally,
                        <em>that which belongs to a day</em>. The astronomical sense — a tabulated
                        record of celestial positions — emerged in late Latin as the genre of
                        almanacs that mariners and astrologers carried bound between cardstock
                        covers, day by lettered day.
                    </p>
                    <p class="text-prose text-foreground/85">
                        By the 17th century, the word had drifted to mean <em>any</em> diurnal
                        ledger: the
                        <span class="code-badge">stardate</span>
                        of a craft, the
                        <span class="code-badge">manifest</span>
                        of an inventory at noon, the
                        <span class="code-badge">tide-table</span>
                        of a port. Its modern use in orbital mechanics is a return to first
                        principles — a record of where each object was, hour by hour, on a given
                        day.
                    </p>
                </section>

                <!-- RIGHT: Definition + Latin etymology accent box -->
                <section class="flex flex-col gap-[var(--space-phi-3)]">
                    <div class="flex flex-col gap-[var(--space-phi-2)]">
                        <p class="section-label">Definition</p>
                        <ol class="flex flex-col gap-[var(--space-phi-2)]">
                            <li class="grid grid-cols-[auto_1fr] items-baseline gap-[var(--space-phi-2)]">
                                <span class="text-mono-caption text-muted-foreground tabular-nums">
                                    01.
                                </span>
                                <p class="text-prose text-foreground/90">
                                    A table or data file giving the calculated positions of a
                                    celestial object at regular intervals throughout a period.
                                </p>
                            </li>
                            <li class="grid grid-cols-[auto_1fr] items-baseline gap-[var(--space-phi-2)]">
                                <span class="text-mono-caption text-muted-foreground tabular-nums">
                                    02.
                                </span>
                                <p class="text-prose text-foreground/90">
                                    Archaic — a diary, journal, or daily account of events.
                                </p>
                            </li>
                        </ol>
                    </div>

                    <!-- Latin quote in math-formula-style accent box -->
                    <MathFormula accent="legendre">
                        <p
                            class="text-prose italic"
                            :style="{
                                fontFamily: 'var(--font-serif)',
                                color: 'var(--foreground)',
                            }"
                        >
                            ephēmerís — quod ad unum diem pertinet
                        </p>
                        <template #caption>
                            “that which belongs to a single day” —
                            <span class="font-display italic">Isidori Hispalensis</span>,
                            Etymologiae, c. 615
                        </template>
                    </MathFormula>
                </section>
            </div>
        </Card>

        <!-- Lettrine-only paper card · second proof site -->
        <Card variant="paper">
            <p class="section-label">Body recipe · paper-card + lettrine</p>
            <p class="text-prose-lettrine mt-[var(--space-phi-2)] text-foreground/85">
                Long-form prose on glass-ui ships with a wonky display capital that drops three
                lines deep, set in Fraunces WONK 1 SOFT 100, and tinted with the parent
                <code class="fira-code">--cartoon-accent-color</code> when one is present. The
                lettrine isn't ornament for its own sake — it's a typographic anchor that signals
                <em>read carefully here</em>. In a paper card, against a tapered horizontal rule,
                the effect is unmistakably editorial: this is content, not chrome.
            </p>
            <FlourishDivider tone="rainbow" class="mt-[var(--space-phi-3)]" />
        </Card>

        <!-- Third site: cream surface with prose-lettrine -->
        <CreamSurface tone="warm">
            <p class="section-label">Cream substrate · same recipe</p>
            <p class="text-prose-lettrine mt-[var(--space-phi-2)] text-foreground/85">
                The lettrine recipe is substrate-agnostic. On warm-cream cardstock the wonky
                capital reads as a stamped initial; on paper-2 it reads as printer's ink; on
                glass-default it reads as inset specular. The pattern stays — only the substrate
                changes.
            </p>
        </CreamSurface>
    </StoryPage>
</template>
