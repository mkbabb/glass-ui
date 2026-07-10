<script setup lang="ts">
// Paper texture.
//
// The texture register on `<PaperBackdrop>` accepts `frequency="clean"`
// (default 0.65-baseFrequency / 4-octave) or `"aged"` (0.5-baseFrequency
// / 5-octave). Consumers extend the register by re-declaring
// `--paper-*-texture` vars at any ancestor scope — the cascade is the
// canonical way to retint or swap the turbulence without forking the SFC.
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { PaperBackdrop } from "@glass/components/custom/paper-backdrop";

const opacity = ref(0.5);
</script>

<template>
    <StoryPage>
        <StorySection
            label="frequency: clean vs aged"
            blurb="Two SVG turbulence baselines. `clean` is the default fine even grain; `aged` swaps in the coarser higher-octave variant via the `--paper-aged-texture` token."
        >
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ShowcaseFrame pad="none" class="texture-panel paper-grain-host relative h-56 overflow-hidden">
                    <PaperBackdrop frequency="clean" />
                    <div class="relative grid h-full place-items-center">
                        <div class="flex flex-col items-center gap-1">
                            <code class="fira-code text-mono-caption text-foreground">frequency="clean"</code>
                            <span class="text-mono-caption text-muted-foreground">0.65 base / 4 octaves</span>
                        </div>
                    </div>
                </ShowcaseFrame>
                <ShowcaseFrame pad="none" class="texture-panel paper-grain-host relative h-56 overflow-hidden">
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
                <div class="paper-grain-host relative h-44 overflow-hidden rounded-card border border-border scope-warm">
                    <PaperBackdrop frequency="clean" />
                    <div class="relative grid h-full place-items-center">
                        <code class="fira-code text-mono-caption text-foreground">warm</code>
                    </div>
                </div>
                <div class="paper-grain-host relative h-44 overflow-hidden rounded-card border border-border scope-cool">
                    <PaperBackdrop frequency="clean" />
                    <div class="relative grid h-full place-items-center">
                        <code class="fira-code text-mono-caption text-foreground">cool</code>
                    </div>
                </div>
                <div class="paper-grain-host relative h-44 overflow-hidden rounded-card border border-border scope-bone">
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

        <StorySection
            label="opacity knob"
            blurb="Override --glass-grain-opacity per-instance. Useful when the backdrop sits over a busy substrate that needs the grain damped."
        >
            <ShowcaseFrame pad="none" class="paper-grain-host relative h-40 overflow-hidden">
                <PaperBackdrop :opacity="opacity" />
                <div class="relative flex h-full items-center justify-center gap-4">
                    <code class="fira-code text-mono-caption">opacity={{ opacity.toFixed(2) }}</code>
                    <input v-model.number="opacity" type="range" min="0" max="1" step="0.05" />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="layered composition"
            blurb="PaperBackdrop sits behind any content; the surrounding host owns the radius + clip. Pair with Card or ShowcaseFrame to add the grain on demand."
        >
            <div class="paper-grain-host layered-paper relative overflow-hidden rounded-card border border-border">
                <PaperBackdrop frequency="clean" />
                <div class="relative p-10">
                    <h3 class="text-display-3 text-foreground">Paper-tier surface</h3>
                    <p class="text-prose text-muted-foreground">
                        The grain lives behind the content. Hover, focus, and active states paint
                        atop without disturbing the texture.
                    </p>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* D2 / metallic-wash fold — CONTAIN the `<PaperBackdrop>` grain to its panel.
   `paper-underpaint` is `position: fixed; inset: 0` (the app-root fullscreen
   underpaint), so a `<PaperBackdrop>` mounted INSIDE a demo panel escaped its
   `relative`/`overflow-hidden` wrapper (neither establishes a fixed-positioning
   containing block) and painted FULLSCREEN — and 6 instances STACKED into a
   page-wide GRAY/metallic noise wash once BG.W-PAPER-GRAIN-OPTIN retired the warm
   `.paper-field` the grain used to multiply over. `contain: paint` makes each
   wrapper a containing block for the fixed grain, so it stays panel-local over the
   panel's warm base — the clean-vs-aged/warm-vs-cool comparison actually reads
   per-panel (the SFC's own "the surrounding host owns the radius + clip" promise),
   and the page background is no longer washed gray. */
.paper-grain-host {
    contain: paint;
}

/* The cascade-retint panels paint their `--paper-underpaint-color` as the panel
   BASE the grain multiplies over (the retint the section demonstrates — warm/cool/
   bone read as DISTINCT tinted papers, never identical gray noise). */
.scope-warm {
    --paper-underpaint-color: #f4ebd6;
}
.scope-cool {
    --paper-underpaint-color: #e6edf4;
}
.scope-bone {
    --paper-underpaint-color: #f6f1e8;
}
.scope-warm,
.scope-cool,
.scope-bone {
    background-color: var(--paper-underpaint-color);
    /* F2.R1 W-DARK-READABILITY-REPAIR (paint re-open) — these panels paint a FIXED LIGHT
       paper base (mode-invariant), so the `warm`/`cool`/`bone` labels must NOT follow
       --foreground into cream in dark (where the label collapsed to WCAG ~1.05 over the
       light paper). Re-point the ink locally to a fixed warm-dark on the known-light plate
       (the swatch is always light, so dark ink is correct in BOTH modes). */
    --foreground: hsl(24 12% 14%);
    --muted-foreground: hsl(24 8% 34%);
}

/* The layered-composition panel reads warm paper (NOT gray) — a warm-cream base the
   grain multiplies over (mirrors `.texture-panel`). */
.layered-paper {
    background-color: color-mix(in srgb, var(--foreground) 4%, var(--card));
}
.dark .layered-paper {
    background-color: color-mix(in srgb, var(--foreground) 12%, var(--card));
}

/* BA.W-STAGE scope 7 — the texture panels read as PAPER in BOTH modes. The
   frequency comparison sits on a warm paper-toned base so the clean-vs-aged grain
   reads against a paper field, not the generic L16 dark card where the subtle
   turbulence difference flattens. Plain-ancestor `.dark .x` (the global-wrapped
   ancestor scoped form is silently dropped). */
.texture-panel {
    background-color: color-mix(in srgb, var(--foreground) 4%, var(--card));
}
.dark .texture-panel {
    background-color: color-mix(in srgb, var(--foreground) 12%, var(--card));
    /* F2.R2 W-DARK-READABILITY-REPAIR (paint re-open, Class-B) — this dark panel is a
       lifted mid-tone plate ([75,65,57] L≈0.30), so the frequency-card caption's
       --muted-foreground collapsed to WCAG 3.87 on it. Re-point the muted register on
       THIS panel to the shared on-glass -strong rung (clears the floor here, 6.47) —
       the F2.R1 demo-local re-point precedent, no new token, no fork. */
    --muted-foreground: var(--on-glass-muted-strong);
    --muted-foreground-strong: var(--on-glass-muted-strong);
}
</style>
