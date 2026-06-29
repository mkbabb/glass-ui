<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { Section } from "@glass/components/ui/section";

const tones = ["heading", "title", "subheading", "label"] as const;
const gaps = ["tight", "regular", "loose"] as const;
</script>

<template>
    <StoryPage>
        <!-- Default: heading + description + content. -->
        <StorySection label="default · title + description + body">
            <Section
                title="Connection summary"
                description="Recently observed transit characteristics for the active session."
            >
                <p class="text-prose text-muted-foreground max-w-prose">
                    Body content slot — composes any flow element underneath the heading
                    and lede.
                </p>
            </Section>
        </StorySection>

        <!-- Tone matrix. -->
        <StorySection label="tone matrix · heading · title · subheading · label">
            <div
                class="flex flex-col gap-6 rounded-card border border-border bg-card p-6"
            >
                <Section
                    v-for="t in tones"
                    :key="t"
                    :tone="t"
                    :title="`tone=&quot;${t}&quot;`"
                    description="The title rung resolves against the canonical typography ladder; label tone collapses onto the .section-label utility."
                >
                    <p class="text-small text-muted-foreground">
                        Body for tone <code class="fira-code">{{ t }}</code
                        >.
                    </p>
                </Section>
            </div>
        </StorySection>

        <!-- Gap matrix. -->
        <StorySection label="gap matrix · tight · regular · loose">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div
                    v-for="g in gaps"
                    :key="g"
                    class="rounded-card border border-border bg-card p-4"
                >
                    <Section
                        :gap="g"
                        :title="`gap=&quot;${g}&quot;`"
                        description="Stacking gap between header and body."
                    >
                        <div
                            class="ghost-slot px-3 py-2 text-mono-caption"
                        >
                            slot body
                        </div>
                    </Section>
                </div>
            </div>
        </StorySection>

        <!-- Header-slot override (non-string heading). -->
        <StorySection label="custom header slot">
            <Section
                description="Compose richer headers — icons, badges, action buttons — through the named header slot."
            >
                <template #header>
                    <div class="flex items-center gap-3">
                        <span class="size-2 rounded-full bg-viz-fourier" />
                        <span class="text-subheading">Live · session</span>
                        <span class="text-mono-caption text-muted-foreground">
                            updated 3s ago
                        </span>
                    </div>
                </template>
                <p class="text-prose text-muted-foreground max-w-prose">
                    The header slot fully replaces the default
                    <code class="fira-code">&lt;h2&gt;</code> when present.
                </p>
            </Section>
        </StorySection>

        <!-- Paper backdrop. -->
        <StorySection
            label='backdrop="paper" · scoped paper-grain substrate'
            blurb="When backdrop=&quot;paper&quot;, the Section becomes a relative-positioned stacking context with PaperBackdrop pinned absolute behind header + content. Default is backdrop=&quot;none&quot; (purely additive)."
        >
            <div class="rounded-card border border-border overflow-hidden">
                <Section
                    backdrop="paper"
                    title="Paper-grain section"
                    description="The grain texture sits behind the typography ladder; header, lede, and body content all paint above the substrate."
                    class="p-6"
                >
                    <p class="text-prose text-muted-foreground max-w-prose">
                        Body content slot — composes any flow element underneath the
                        heading and lede, layered above the paper grain.
                    </p>
                </Section>
            </div>
        </StorySection>
    </StoryPage>
</template>
