<script setup lang="ts">
// Popover's stage: one popover, opened by a press, by hover, or as a hover card. The
// page opens it on load without taking focus; a card mounts it closed.
import { Settings } from "@lucide/vue";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import { Avatar, AvatarFallback } from "@glass/components/avatar";
import { Button } from "@glass/components/button";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";
import StageSwap from "../../chassis/variants/StageSwap.vue";

type Mode = "press" | "hover" | "card";

withDefaults(defineProps<{ mode?: Mode; openOnLoad?: boolean }>(), {
    mode: "press",
    openOnLoad: false,
});

const keepFocus = (event: Event) => event.preventDefault();
</script>

<template>
    <div class="popover-stage">
        <StageSwap :swap-key="mode">
            <Popover v-if="mode === 'press'" :default-open="openOnLoad">
                <PopoverTrigger as-child>
                    <Button emphasis="primary">Dimensions</Button>
                </PopoverTrigger>
                <PopoverContent class="w-72" @open-auto-focus="keepFocus">
                    <div class="popover-stage-form">
                        <Label for="popover-stage-w">Width</Label>
                        <Input id="popover-stage-w" model-value="8" class="w-20" />
                        <Label for="popover-stage-h">Height</Label>
                        <Input id="popover-stage-h" model-value="4" class="w-20" />
                    </div>
                </PopoverContent>
            </Popover>

            <Popover v-else-if="mode === 'hover'" trigger="hover" :default-open="openOnLoad">
                <PopoverTrigger as-child>
                    <Button emphasis="quiet" icon-only aria-label="Settings">
                        <Settings aria-hidden="true" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent side="top" :side-offset="6" class="w-auto">
                    Settings
                </PopoverContent>
            </Popover>

            <Popover v-else trigger="hover" :default-open="openOnLoad">
                <PopoverTrigger as-child>
                    <Button emphasis="text">@fourier</Button>
                </PopoverTrigger>
                <PopoverContent aria-label="Joseph Fourier" class="w-72">
                    <div class="popover-stage-card">
                        <Avatar label="Joseph Fourier">
                            <AvatarFallback>JF</AvatarFallback>
                        </Avatar>
                        <div class="grid gap-1">
                            <span class="font-display">Joseph Fourier</span>
                            <span class="text-small">Heat, and the series named after him.</span>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </StageSwap>
    </div>
</template>

<style scoped>
.popover-stage {
    display: grid;
    place-items: center;
    block-size: 100%;
    padding: var(--sp-4);
    /* The open panel sits below the trigger, so the trigger rides above centre. */
    padding-block-end: 12rem;
}
.popover-stage-form {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: var(--sp-3);
}
.popover-stage-card {
    display: flex;
    gap: var(--sp-3);
    align-items: flex-start;
}
</style>
