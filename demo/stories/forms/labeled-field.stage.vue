<script setup lang="ts">
// Labeled Field's stage: the field's whole anatomy. A required email with its
// description and its error, which clears once the address is valid, beside an
// optional name.
import { computed, ref } from "vue";
import { LabeledInput } from "@glass/components/labeled-field";

const email = ref("ada@");
const name = ref("");
const emailInvalid = computed(() => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
</script>

<template>
    <div class="labeled-stage">
        <LabeledInput
            v-model="email"
            label="Email"
            description="Used to sign in."
            requirement="required"
            type="email"
            autocomplete="email"
            :invalid="emailInvalid"
        >
            <template #error>Enter a full email address.</template>
        </LabeledInput>
        <LabeledInput
            v-model="name"
            label="Display name"
            description="Shown beside your comments."
            requirement="optional"
            autocomplete="nickname"
        />
    </div>
</template>

<style scoped>
.labeled-stage {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 18rem));
    align-items: start;
    gap: var(--sp-6, 1.5rem);
    inline-size: min(100cqi, 38rem);
}

@container (inline-size < 34rem) {
    .labeled-stage {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
