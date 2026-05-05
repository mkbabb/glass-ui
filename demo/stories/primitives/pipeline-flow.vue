<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { PipelineFlow } from "@/components/custom/pipeline-flow";
import type { PipelineFlowProps, PipelineNode } from "@/components/custom/pipeline-flow";

const ingestNodes: PipelineNode[] = [
    { label: "Upload", detail: "drag-drop · 1 of 4", color: "var(--section-color-0)" },
    { label: "Validate", detail: "schema match · 2 of 4", color: "var(--section-color-3)" },
    { label: "Transform", detail: "reshape · 3 of 4", color: "var(--section-color-5)" },
    { label: "Publish", detail: "ship · 4 of 4", color: "var(--section-color-7)" },
];

const buildNodes: PipelineNode[] = [
    { label: "Lint", color: "var(--viz-amber)" },
    { label: "Typecheck", color: "var(--viz-chebyshev)" },
    { label: "Bundle", color: "var(--viz-legendre)" },
    { label: "Deploy", color: "var(--viz-green)" },
];

const connectorVariants: Array<NonNullable<PipelineFlowProps["connector"]>> = [
    "arrow",
    "line",
    "none",
];
</script>

<template>
    <StoryPage>
        <CreamSurface tone="cool" class="relative overflow-hidden">
            <p class="section-label">&lt;PipelineFlow&gt;</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-3">
                A chain, not a list.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Glass-pill nodes joined by arrow / line / none connectors. Each node
                tints from its own
                <code class="fira-code">--pipeline-node-accent</code>; layouts swap from
                vertical to horizontal with one prop.
            </p>
            <FlourishDivider tone="gold" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Vertical chain · arrow connector · 4 nodes -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">vertical · arrow · accent-tinted nodes</p>
            <div
                class="rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <PipelineFlow
                    :nodes="ingestNodes"
                    orientation="vertical"
                    connector="arrow"
                />
            </div>
        </section>

        <!-- Connector variants -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">connectors · arrow / line / none</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-3">
                <div
                    v-for="cnx in connectorVariants"
                    :key="cnx"
                    class="rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
                >
                    <p class="text-mono-caption mb-3 text-muted-foreground">
                        connector="{{ cnx }}"
                    </p>
                    <PipelineFlow
                        :nodes="buildNodes"
                        orientation="vertical"
                        :connector="cnx"
                    />
                </div>
            </div>
        </section>

        <!-- Horizontal -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">horizontal · arrow</p>
            <div
                class="rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <PipelineFlow
                    :nodes="buildNodes"
                    orientation="horizontal"
                    connector="arrow"
                />
            </div>
        </section>
    </StoryPage>
</template>
