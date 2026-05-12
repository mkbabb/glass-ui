<script setup lang="ts">
// useKeyboardShortcuts — registerShortcut + useRegisteredShortcuts pair.
import { ref, onScopeDispose } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    registerShortcut,
    useRegisteredShortcuts,
} from "../../../src/composables/keyboard";

const lastTrigger = ref<string>("(none yet)");

const disposers = [
    registerShortcut("g+s", () => {
        lastTrigger.value = "g s — go to settings";
    }, { label: "Go to settings", group: "navigation" }),
    registerShortcut("?", () => {
        lastTrigger.value = "? — show help";
    }, { label: "Show help", group: "global" }),
    registerShortcut("k", () => {
        lastTrigger.value = "k — command palette";
    }, { label: "Open command palette", group: "global" }),
];

onScopeDispose(() => disposers.forEach((d) => d()));

const shortcuts = useRegisteredShortcuts();
</script>

<template>
    <StoryPage>
        <StorySection
            label="register + read-back"
            blurb="registerShortcut returns a disposer. useRegisteredShortcuts returns a ComputedRef<RegisteredShortcut[]> for surfacing in a help/cheatsheet modal."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-4">
                    <p class="text-prose">
                        Try the shortcuts below — the readout updates on each match.
                    </p>
                    <div class="rounded-md border border-border bg-card p-3">
                        <code class="fira-code text-sm">last: {{ lastTrigger }}</code>
                    </div>
                    <table class="w-full border-collapse text-sm">
                        <thead>
                            <tr class="border-b border-border text-left">
                                <th class="py-2 pr-4">combo (raw)</th>
                                <th class="py-2 pr-4">label</th>
                                <th class="py-2">group</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="s in shortcuts" :key="s.raw" class="border-b border-border/40">
                                <td class="py-1.5 pr-4"><code class="fira-code">{{ s.raw }}</code></td>
                                <td class="py-1.5 pr-4">{{ s.options.label ?? "—" }}</td>
                                <td class="py-1.5 text-muted-foreground">{{ s.options.group ?? "—" }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
