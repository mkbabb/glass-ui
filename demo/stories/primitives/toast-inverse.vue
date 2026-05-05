<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Check, Clipboard, Save, ThumbsUp } from "lucide-vue-next";
import { toastVariants } from "@/components/ui/toast";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { cn } from "@/utils/cn";

interface Sample {
    icon: typeof Check;
    title: string;
    body: string;
}

const samples: Sample[] = [
    { icon: Clipboard, title: "Copied", body: "phi.toFixed(8) — paste anywhere." },
    { icon: Save, title: "Saved", body: "Changes synced to this workspace." },
    { icon: Check, title: "Done", body: "3 items processed in 142ms." },
    { icon: ThumbsUp, title: "Reaction recorded", body: "Thanks for the feedback." },
];
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p class="section-label">&lt;Toast variant="inverse"&gt;</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-3">
                Inverted, on purpose.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                The inverse variant flips foreground and background — high-contrast
                acknowledgement for "Copied" / "Saved" / "Got it". Quiet weight,
                deliberate moment. This is the second site clearing the gap-22 ≥2 bar.
            </p>
            <FlourishDivider tone="gold" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Static visual proof -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">surface · 4 acknowledgement samples</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-2">
                <div
                    v-for="(s, i) in samples"
                    :key="i"
                    :class="cn(
                        toastVariants({ variant: 'inverse' }),
                        '!relative !w-auto !p-4 !pr-6 !shadow-cartoon-md !flex',
                    )"
                    style="border: none"
                >
                    <component
                        :is="s.icon"
                        class="size-5 shrink-0"
                        :stroke-width="2"
                    />
                    <div class="grid flex-1 gap-0.5">
                        <p class="text-small font-medium">{{ s.title }}</p>
                        <p class="text-mono-caption opacity-80">{{ s.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Side-by-side variant comparison -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">comparison · default / inverse / destructive</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-3">
                <div
                    :class="cn(
                        toastVariants({ variant: 'default' }),
                        '!relative !w-auto !p-4 !pr-6 !shadow-cartoon-sm !flex',
                    )"
                >
                    <Save class="size-5 shrink-0" :stroke-width="2" />
                    <div class="grid flex-1 gap-1">
                        <p class="text-small font-medium">default</p>
                        <p class="text-mono-caption text-muted-foreground">
                            cream-leaning surface, foreground type
                        </p>
                    </div>
                </div>
                <div
                    :class="cn(
                        toastVariants({ variant: 'inverse' }),
                        '!relative !w-auto !p-4 !pr-6 !shadow-cartoon-md !flex',
                    )"
                >
                    <Check class="size-5 shrink-0" :stroke-width="2" />
                    <div class="grid flex-1 gap-1">
                        <p class="text-small font-medium">inverse</p>
                        <p class="text-mono-caption opacity-80">
                            foreground bg, background type
                        </p>
                    </div>
                </div>
                <div
                    :class="cn(
                        toastVariants({ variant: 'destructive' }),
                        '!relative !w-auto !p-4 !pr-6 !shadow-cartoon-sm !flex',
                    )"
                >
                    <Clipboard class="size-5 shrink-0" :stroke-width="2" />
                    <div class="grid flex-1 gap-1">
                        <p class="text-small font-medium">destructive</p>
                        <p class="text-mono-caption opacity-80">
                            destructive surface, paired
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Usage hint -->
        <section
            class="rounded-2xl border border-border bg-cream-warm p-[var(--space-phi-4)] shadow-cartoon-sm"
        >
            <p class="section-label mb-2">usage</p>
            <pre
                class="overflow-x-auto rounded-lg bg-background/40 p-3 text-mono-small"
            ><code>// Render directly via &lt;Toast&gt;:
&lt;Toast variant="inverse"&gt;
    &lt;ToastTitle&gt;Copied&lt;/ToastTitle&gt;
    &lt;ToastDescription&gt;Pasted to clipboard.&lt;/ToastDescription&gt;
&lt;/Toast&gt;

// Or apply the CVA recipe to any surface that should match:
&lt;div :class="toastVariants({ variant: 'inverse' })" /&gt;</code></pre>
        </section>
    </StoryPage>
</template>
