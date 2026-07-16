<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Textarea } from "@glass/components/textarea";
import { Button } from "@glass/components/button";
import { LabeledField, LabeledInput } from "@glass/components/labeled-field";

const formEl = ref<HTMLFormElement | null>(null);
const hasErrors = ref(false);
const invalid = reactive({ email: false, name: false, zip: false });

const bio = ref("");
const email = ref("");
const zip = ref("");
const name = ref("");

function syncValidity(): void {
    const form = formEl.value;
    if (!form) return;

    for (const field of Object.keys(invalid) as (keyof typeof invalid)[]) {
        invalid[field] = !(form.elements.namedItem(field) as HTMLInputElement).checkValidity();
    }
    hasErrors.value = Object.values(invalid).some(Boolean);
}

async function submit(): Promise<void> {
    const form = formEl.value;
    if (!form) return;

    syncValidity();
    await nextTick();
    form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
}

function clearSummaryWhenValid(): void {
    if (hasErrors.value) syncValidity();
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
                        :invalid="invalid.email"
                        label="Email"
                        name="email"
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
                        :invalid="invalid.zip"
                        label="ZIP"
                        name="zip"
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
                        :invalid="invalid.name"
                        label="Workspace name"
                        name="name"
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
                            resize="content"
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
