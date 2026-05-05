<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { LiveSnippet } from "@/components/custom/live-snippet";

const sourceIdle = `// Press Run to evaluate.
const φ = (1 + Math.sqrt(5)) / 2;
return φ.toFixed(8);`;

const sourcePending = `// A slow async — 1.5s simulated work.
await new Promise(r => setTimeout(r, 1500));
return "Done after pause.";`;

const sourceError = `// This raises.
throw new Error("missing primitive: blob.shader");`;

async function runIdle() {
    const phi = (1 + Math.sqrt(5)) / 2;
    return { result: phi.toFixed(8) };
}

async function runPending() {
    await new Promise((r) => setTimeout(r, 1500));
    return { result: "Done after pause." };
}

async function runError() {
    return { error: new Error("missing primitive: blob.shader") };
}

const customRunCount = ref(0);

interface CustomResult {
    runs: number;
    ts: number;
}

async function runCustom() {
    customRunCount.value += 1;
    await new Promise((r) => setTimeout(r, 400));
    return { result: { runs: customRunCount.value, ts: Date.now() } satisfies CustomResult };
}

function asCustomResult(value: unknown): CustomResult | null {
    if (value && typeof value === "object" && "runs" in value && "ts" in value) {
        return value as CustomResult;
    }
    return null;
}
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p class="section-label">&lt;LiveSnippet&gt;</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-3">
                BYO engine. Ship the chassis.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                LiveSnippet is the runnable-example chassis: input slot, run controls,
                output slot, four states. Consumers wire <code class="fira-code">:onRun</code>
                to whatever evaluator they own — JS, KaTeX, formal grammar, anything.
            </p>
            <FlourishDivider tone="rainbow" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Idle -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">state · idle</p>
            <LiveSnippet :on-run="runIdle">
                <template #input>
                    <pre class="overflow-x-auto"><code>{{ sourceIdle }}</code></pre>
                </template>
            </LiveSnippet>
        </section>

        <!-- Pending (manual trigger) -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">state · pending</p>
            <LiveSnippet :on-run="runPending" run-label="Wait 1.5s">
                <template #input>
                    <pre class="overflow-x-auto"><code>{{ sourcePending }}</code></pre>
                </template>
            </LiveSnippet>
        </section>

        <!-- Success (auto-run) -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">state · success · auto-run</p>
            <LiveSnippet :on-run="runIdle" auto-run>
                <template #input>
                    <pre class="overflow-x-auto"><code>{{ sourceIdle }}</code></pre>
                </template>
            </LiveSnippet>
        </section>

        <!-- Error -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">state · error</p>
            <LiveSnippet :on-run="runError" auto-run run-label="Throw">
                <template #input>
                    <pre class="overflow-x-auto"><code>{{ sourceError }}</code></pre>
                </template>
            </LiveSnippet>
        </section>

        <!-- BYO output renderer -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">slot · custom :output renderer</p>
            <LiveSnippet :on-run="runCustom" run-label="Run again">
                <template #input>
                    <pre class="overflow-x-auto"><code>// Each press increments. Output slot owns the visual.
return { runs, ts };</code></pre>
                </template>
                <template #output="{ result }">
                    <div
                        class="flex items-center gap-3 rounded-xl bg-cream-warm px-3 py-2"
                    >
                        <span
                            class="text-display-stat !text-[1.6rem]"
                            style="color: var(--gold-dark)"
                        >
                            {{ asCustomResult(result)?.runs ?? 0 }}
                        </span>
                        <span class="text-mono-caption text-muted-foreground">
                            runs · last ts {{ asCustomResult(result)?.ts ?? "—" }}
                        </span>
                    </div>
                </template>
            </LiveSnippet>
        </section>
    </StoryPage>
</template>
