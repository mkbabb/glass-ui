<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { useUserInvalidAria } from "@glass/composables/dom/useUserInvalidAria";
import { Textarea } from "@glass/components/textarea";
import { Button } from "@glass/components/button";
import { LabeledField, LabeledInput } from "@glass/components/labeled-field";

// The bridge: `aria-invalid` tracks the visual `:user-invalid` state.
const { bind } = useUserInvalidAria();
const formEl = ref<HTMLFormElement | null>(null);
const hasErrors = ref(false);

onMounted(() => {
    if (formEl.value) {
        const stop = bind(formEl.value);
        onUnmounted(stop);
    }
});

const bio = ref("");
const email = ref("");
const zip = ref("");
const name = ref("");

async function submit(): Promise<void> {
    const form = formEl.value;
    if (!form) return;

    const firstInvalid = form.querySelector<HTMLElement>(":invalid");
    hasErrors.value = Boolean(firstInvalid);
    await nextTick();
    firstInvalid?.focus();
}

function clearSummaryWhenValid(): void {
    if (hasErrors.value && formEl.value?.checkValidity()) hasErrors.value = false;
}
</script>

<template>
    <StoryPage>
        <StorySection heading="Form validation" gap="lg">
            <p class="max-w-xl text-sm text-muted-foreground">
                Errors wait for field exit or submit, then clear as each native value becomes valid.
                Submit moves focus to the first invalid field.
            </p>

            <form
                ref="formEl"
                class="glass-card grid max-w-lg gap-5 p-6 sm:p-7"
                novalidate
                @input="clearSummaryWhenValid"
                @submit.prevent="submit"
            >
                <div role="status" aria-atomic="true">
                    <p
                        v-if="hasErrors"
                        class="border-s-2 border-destructive ps-3 text-sm text-destructive"
                    >
                        Some details need attention. Complete the highlighted fields.
                    </p>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                    <LabeledInput
                        v-model="email"
                        label="Email"
                        type="email"
                        required
                        error-live="off"
                        autocomplete="email"
                        inputmode="email"
                        enterkeyhint="next"
                        placeholder="you@example.com"
                    >
                        <template #error>Enter a valid email address.</template>
                    </LabeledInput>

                    <LabeledInput
                        v-model="zip"
                        label="ZIP"
                        type="text"
                        required
                        error-live="off"
                        inputmode="numeric"
                        pattern="[0-9]{5}"
                        autocomplete="postal-code"
                        enterkeyhint="next"
                        placeholder="27606"
                    >
                        <template #error>Enter a five-digit ZIP code.</template>
                    </LabeledInput>

                    <LabeledInput
                        v-model="name"
                        label="Workspace name"
                        required
                        error-live="off"
                        autocomplete="organization"
                        enterkeyhint="next"
                        placeholder="Studio"
                        class="sm:col-span-2"
                    >
                        <template #error>A workspace name is required.</template>
                    </LabeledInput>
                </div>

                <LabeledField label="Bio">
                    <template #default="{ controlId }">
                        <Textarea
                            :id="controlId"
                            v-model="bio"
                            autosize
                            placeholder="A short introduction…"
                        />
                    </template>
                </LabeledField>

                <div class="flex justify-end border-t border-border/50 pt-4">
                    <Button type="submit">Review details</Button>
                </div>
            </form>
        </StorySection>
    </StoryPage>
</template>
