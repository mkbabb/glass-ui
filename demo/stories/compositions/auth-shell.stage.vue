<script setup lang="ts">
// Auth Shell's stage: a brand field beside the sign-in form. The field carries no
// text; every word sits on the form's own surface.
import { ref, useId } from "vue";
import { Aurora } from "@glass/components/aurora";
import { Button } from "@glass/components/button";
import { LabeledInput } from "@glass/components/labeled-field";
import { heroAuroraConfig } from "../../chassis/hero/aurora-hero";

const brand = heroAuroraConfig("purple-tomato");
const email = ref("");
const password = ref("");
const titleId = useId();
</script>

<template>
    <div class="auth-stage">
        <div class="auth-stage-field" aria-hidden="true">
            <Aurora :config="brand" :opacity-ceiling="0.7" class="auth-stage-aurora" />
        </div>

        <form class="auth-stage-form" :aria-labelledby="titleId" @submit.prevent>
            <h2 :id="titleId" class="text-heading">Welcome back</h2>
            <LabeledInput
                v-model="email"
                label="Email"
                type="email"
                autocomplete="email"
                placeholder="you@example.com"
            />
            <LabeledInput
                v-model="password"
                label="Password"
                type="password"
                autocomplete="current-password"
            />
            <Button type="submit" emphasis="primary" class="w-full">Sign in</Button>
            <div class="auth-stage-links">
                <Button type="button" emphasis="text" size="sm">Forgot password</Button>
                <Button type="button" emphasis="text" size="sm">Create an account</Button>
            </div>
        </form>
    </div>
</template>

<style scoped>
/* Field and form side by side; under 40rem of stage width the field is a band above
   the form. */
.auth-stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 26rem);
    block-size: 100%;
    inline-size: 100%;
}

.auth-stage-field {
    position: relative;
    overflow: clip;
}

.auth-stage-aurora {
    position: absolute;
    inset: 0;
}

.auth-stage-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--sp-4);
    padding: var(--sp-5);
    background-color: var(--card);
    color: var(--foreground);
}

.auth-stage-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--sp-2);
}

@container (inline-size < 40rem) {
    .auth-stage {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: 4rem minmax(0, 1fr);
    }
    .auth-stage-form {
        gap: var(--sp-3);
        padding: var(--sp-4);
    }
}
</style>
