<script setup lang="ts">
// Inputs' stage: two labelled fields. Email is checked when you leave it and clears as
// soon as its value is valid; it starts wrong so the invalid state is seen on load.
import { ref } from "vue";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";

const name = ref("Ada Lovelace");
const email = ref("ada.lovelace");
const emailInvalid = ref(true);

function check(event: Event): void {
    emailInvalid.value = !(event.target as HTMLInputElement).checkValidity();
}

function clearWhenValid(event: Event): void {
    if (emailInvalid.value) check(event);
}
</script>

<template>
    <form class="inputs-stage" novalidate @submit.prevent>
        <div class="inputs-stage-field">
            <Label for="inputs-name">Name</Label>
            <Input id="inputs-name" v-model="name" size="lg" autocomplete="name" />
        </div>
        <div class="inputs-stage-field">
            <Label for="inputs-email" requirement="required">Email</Label>
            <Input
                id="inputs-email"
                v-model="email"
                size="lg"
                type="email"
                required
                autocomplete="email"
                inputmode="email"
                placeholder="you@example.com"
                :invalid="emailInvalid"
                @change="check"
                @input="clearWhenValid"
            />
        </div>
    </form>
</template>

<style scoped>
.inputs-stage {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 18rem));
    gap: var(--sp-5);
    inline-size: min(100cqi, 38rem);
}

.inputs-stage-field {
    display: grid;
    gap: var(--sp-2);
}

@container (inline-size < 34rem) {
    .inputs-stage {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
