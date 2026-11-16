<script setup lang="ts">
// A pager: previous, the dots, next. As a wizard's step bar: back, the step, and the
// one primary action.
import { ref } from "vue";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import { PagerDots } from "@glass/components/pager-dots";
import DockScene from "./_parts/DockScene.vue";

withDefaults(defineProps<{ form?: "dots" | "steps" }>(), { form: "dots" });

const PAGES = 5;
const page = ref(1);
const STEPS = 4;
const step = ref(2);

const prev = () => (page.value = (page.value + PAGES - 1) % PAGES);
const next = () => (page.value = (page.value + 1) % PAGES);
</script>

<template>
    <DockScene v-slot="{ narrow }" place="bottom">
        <Transition name="fade" mode="out-in">
            <div v-if="form === 'dots'" key="dots" class="scene-swap">
                <GlassDock
                    :collapse="false"
                    fit-content
                    aria-label="Pages"
                >
                    <DockControl aria-label="Previous page" @click="prev">
                        <ChevronLeft aria-hidden="true" />
                    </DockControl>
                    <PagerDots
                        v-model:active="page"
                        :count="PAGES"
                        :ring="false"
                        :window-fit="narrow ? 3 : undefined"
                        aria-label="Pages"
                        class="pager-dots"
                    />
                    <DockControl aria-label="Next page" @click="next">
                        <ChevronRight aria-hidden="true" />
                    </DockControl>
                </GlassDock>
            </div>
            <div v-else key="steps" class="scene-swap">
                <GlassDock :collapse="false" fit-content aria-label="Steps">
                    <DockControl aria-label="Back" :disabled="step === 1" @click="step--">
                        <ChevronLeft aria-hidden="true" />
                    </DockControl>
                    <Transition name="metric-swap" mode="out-in">
                        <span :key="step" class="pager-step text-small tabular-nums">
                            Step {{ step }} of {{ STEPS }}
                        </span>
                    </Transition>
                    <DockSeparator />
                    <DockControl shape="tab" @click="step = step === STEPS ? 1 : step + 1">
                        <Transition name="fade" mode="out-in">
                            <span :key="step === STEPS ? 'finish' : 'continue'">
                                {{ step === STEPS ? "Finish" : "Continue" }}
                            </span>
                        </Transition>
                    </DockControl>
                </GlassDock>
            </div>
        </Transition>
    </DockScene>
</template>

<style scoped>
.pager-dots {
    margin-inline: var(--sp-2);
}

.pager-step {
    padding-inline: var(--sp-2);
}
</style>
