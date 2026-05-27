<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { cn } from "../../../src/utils/cn";

// Ladder order: display → body → admin rail.
const ladder: { cls: string; label: string; sample: string }[] = [
    { cls: "text-display-5", label: "display-5", sample: "Golden" },
    { cls: "text-display-4", label: "display-4", sample: "Audacious" },
    { cls: "text-display-3", label: "display-3", sample: "Ornament" },
    { cls: "text-display-2", label: "display-2", sample: "Plus Jakarta" },
    { cls: "text-display", label: "display", sample: "Display" },
    { cls: "text-title", label: "title", sample: "Section title" },
    { cls: "text-heading", label: "heading", sample: "Subsection head" },
    { cls: "text-subheading", label: "subheading", sample: "Card title" },
    { cls: "text-prose", label: "prose", sample: "Long-form reading sits at prose — φ line-height, Plus Jakarta Sans." },
    { cls: "text-body", label: "body", sample: "Body copy uses Plus Jakarta Sans at 1rem, 1.5 leading." },
    { cls: "text-small", label: "small", sample: "Metadata and secondary body copy." },
    { cls: "text-caption", label: "caption", sample: "Caption · labels · hints" },
    { cls: "text-micro", label: "micro", sample: "Micro: badges, fine print" },
    { cls: "text-admin-label", label: "admin-label", sample: "ADMIN · UPPERCASE · MONO" },
    { cls: "text-math", label: "math", sample: "f(x) = ∑ aₙ φₙ(x)" },
    { cls: "text-math-body", label: "math-body", sample: "KaTeX-adjacent body math" },
    { cls: "text-mono-small", label: "mono-small", sample: "npm run dev" },
    { cls: "text-mono-caption", label: "mono-caption", sample: "mono · caption · caps" },
];
</script>

<template>
    <StoryPage>
        <div class="flex flex-col gap-4">
            <div
                v-for="row in ladder"
                :key="row.label"
                :class="
                    cn(
                        'grid grid-cols-[10rem_1fr] items-baseline gap-6 border-b border-border/40 pb-4'
                    )
                "
            >
                <span class="text-mono-caption text-muted-foreground">{{
                    row.label
                }}</span>
                <span :class="cn(row.cls, 'text-foreground')">{{ row.sample }}</span>
            </div>
        </div>

        <!-- Bonus: ℱourier glyph showcase. -->
        <div
            class="mt-8 flex flex-col items-center gap-4 rounded-card border border-border bg-card p-10 shadow-cartoon"
        >
            <p class="text-admin-label text-muted-foreground">Signature glyph</p>
            <div class="fourier-f text-display-5 leading-none italic">ℱ</div>
            <p class="text-small text-muted-foreground">
                <code class="fira-code">.fourier-f</code> — Plus Jakarta Sans display italic, viz-fourier red.
            </p>
        </div>
    </StoryPage>
</template>
