<script setup lang="ts">
// PaperBackdrop texture-system — P.W3 Lane C substrate promotion.
//
// The texture register on `<PaperBackdrop>` accepts `frequency="clean"`
// (default 0.65-baseFrequency / 4-octave) or `"aged"` (0.5-baseFrequency
// / 5-octave). Consumers extend the register by re-declaring
// `--paper-*-texture` vars at any ancestor scope — the canonical
// texture-system cascade per DESIGN.md.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { PaperBackdrop } from "../../../src/components/custom/paper-backdrop";
</script>

<template>
    <StoryPage>
        <StorySection
            label="frequency: clean vs aged"
            blurb="Two SVG turbulence baselines. `clean` is the default fine even grain; `aged` swaps in the coarser higher-octave variant via the `--paper-aged-texture` token."
        >
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ShowcaseFrame pad="none" class="relative h-56 overflow-hidden">
                    <PaperBackdrop frequency="clean" />
                    <div class="relative grid h-full place-items-center">
                        <div class="flex flex-col items-center gap-1">
                            <code class="fira-code text-mono-caption text-foreground">frequency="clean"</code>
                            <span class="text-mono-caption text-muted-foreground">0.65 base / 4 octaves</span>
                        </div>
                    </div>
                </ShowcaseFrame>
                <ShowcaseFrame pad="none" class="relative h-56 overflow-hidden">
                    <PaperBackdrop frequency="aged" />
                    <div class="relative grid h-full place-items-center">
                        <div class="flex flex-col items-center gap-1">
                            <code class="fira-code text-mono-caption text-foreground">frequency="aged"</code>
                            <span class="text-mono-caption text-muted-foreground">0.5 base / 5 octaves</span>
                        </div>
                    </div>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            label="--paper-* cascade retint"
            blurb="Override the underpaint hue at any ancestor scope. The backdrop re-reads on every layout pass — no per-instance class fork."
        >
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="relative h-44 overflow-hidden rounded-card border border-border scope-warm">
                    <PaperBackdrop frequency="clean" />
                    <div class="relative grid h-full place-items-center">
                        <code class="fira-code text-mono-caption text-foreground">warm</code>
                    </div>
                </div>
                <div class="relative h-44 overflow-hidden rounded-card border border-border scope-cool">
                    <PaperBackdrop frequency="clean" />
                    <div class="relative grid h-full place-items-center">
                        <code class="fira-code text-mono-caption text-foreground">cool</code>
                    </div>
                </div>
                <div class="relative h-44 overflow-hidden rounded-card border border-border scope-bone">
                    <PaperBackdrop frequency="clean" />
                    <div class="relative grid h-full place-items-center">
                        <code class="fira-code text-mono-caption text-foreground">bone</code>
                    </div>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="texture-system cascade"
            blurb="The promotion canonicalises the texture-system at the library tier — consumers retint or swap the turbulence without forking the SFC."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <ul class="text-prose text-muted-foreground list-disc pl-5 space-y-1">
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">frequency?: "clean" | "aged"</code>
                        — register knob; swaps the texture image var.
                    </li>
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">opacity?: number | string</code>
                        — per-instance opacity override.
                    </li>
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">--paper-underpaint-color</code>,
                        <code class="fira-code bg-muted px-1 rounded">--paper-aged-texture</code>
                        — cascade-overridable tokens. Define a new
                        <code class="fira-code">--paper-*-texture</code> at <code class="fira-code">:root</code>
                        to extend the register beyond clean/aged.
                    </li>
                    <li>
                        Reachable via the <code class="fira-code">@mkbabb/glass-ui/paper-backdrop</code> subpath
                        and the <code class="fira-code">@mkbabb/glass-ui/api</code> type discovery layer.
                    </li>
                </ul>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.scope-warm {
    --paper-underpaint-color: #f4ebd6;
}
.scope-cool {
    --paper-underpaint-color: #e6edf4;
}
.scope-bone {
    --paper-underpaint-color: #f6f1e8;
}
</style>
