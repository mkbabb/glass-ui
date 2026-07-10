<script setup lang="ts">
// Form-validity vocabulary in one place — the `useUserInvalidAria` composable
// drives the `aria-invalid` / error-message wiring across the fields below.
import { onMounted, onUnmounted, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { useUserInvalidAria } from "@glass/composables/dom/useUserInvalidAria";
import { Input } from "@glass/components/ui/input";
import { Textarea } from "@glass/components/ui/textarea";
import { Label } from "@glass/components/ui/label";
import { Button } from "@glass/components/ui/button";
import { LabeledInput } from "@glass/components/custom/labeled-field";

// The bridge: `aria-invalid` tracks the visual `:user-invalid` state.
const { bind } = useUserInvalidAria();
const formEl = ref<HTMLFormElement | null>(null);

onMounted(() => {
    if (formEl.value) {
        const stop = bind(formEl.value);
        onUnmounted(stop);
    }
});

const bio = ref("");
const name = ref("");
</script>

<template>
    <StoryPage>
        
            <StorySection heading="Validity vocabulary" gap="lg">
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">:user-invalid</code> paints
                    the field on field-exit (blur), never on mount;
                    <code class="font-mono text-xs">useUserInvalidAria</code>
                    bridges that visual state to
                    <code class="font-mono text-xs">aria-invalid</code> so a
                    screen reader tracks it. Submit empties to flag every
                    required field at once.
                </p>

                <form
                    ref="formEl"
                    class="glass-card grid max-w-md gap-4 p-6"
                    novalidate
                    @submit.prevent
                >
                    <div class="grid gap-2">
                        <Label for="fv-email" required>Email</Label>
                        <Input
                            id="fv-email"
                            type="email"
                            required
                            autocomplete="email"
                            inputmode="email"
                            enterkeyhint="next"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div class="grid gap-2">
                        <Label for="fv-zip" required>ZIP</Label>
                        <Input
                            id="fv-zip"
                            type="text"
                            required
                            inputmode="numeric"
                            pattern="[0-9]{5}"
                            autocomplete="postal-code"
                            placeholder="27606"
                        />
                    </div>

                    <div class="grid gap-2">
                        <Label for="fv-bio">Bio (autosize)</Label>
                        <Textarea
                            id="fv-bio"
                            v-model="bio"
                            autosize
                            placeholder="Grows with content via field-sizing…"
                        />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </StorySection>

            <StorySection heading="LabeledInput — required + error slot" gap="lg">
                <p class="text-sm text-muted-foreground">
                    The <code class="font-mono text-xs">required</code> prop threads
                    the asterisk onto the label and the native attribute onto the
                    control; the <code class="font-mono text-xs">error</code> slot
                    reveals on <code class="font-mono text-xs">:has(:user-invalid)</code>.
                </p>
                <form class="max-w-md" novalidate @submit.prevent>
                    <LabeledInput
                        v-model="name"
                        label="Workspace name"
                        tooltip="Shown in the sidebar"
                        required
                    >
                        <template #error>A workspace name is required.</template>
                    </LabeledInput>
                </form>
            </StorySection>

            <StorySection heading="Native customizable &lt;select&gt;" gap="lg">
                <p class="text-sm text-muted-foreground">
                    The customizable native <code class="font-mono text-xs">&lt;select&gt;</code>
                    (<code class="font-mono text-xs">appearance: base-select</code>) is
                    Chromium-only for now. glass-ui does not ship it as a primitive; the
                    reka-ui <code class="font-mono text-xs">&lt;Select&gt;</code> stays the
                    default rich path.
                </p>
            </StorySection>
        
    </StoryPage>
</template>
