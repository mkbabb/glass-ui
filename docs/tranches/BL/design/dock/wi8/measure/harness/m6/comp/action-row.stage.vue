<script setup lang="ts">
// An inline action row in a pane's header. It never folds.
import { ref } from "vue";
import { DockControl, GlassDock } from "@glass/components/dock";
import { Card, CardContent, CardTitle } from "@glass/components/card";
import DockScene from "./DockScene.vue";

const COMPACT = ".card{padding:1rem;border-radius:1.5rem}\n.card:hover{translate:0 -2px}";
const FORMATTED = ".card {\n    padding: 1rem;\n    border-radius: 1.5rem;\n}\n\n.card:hover {\n    translate: 0 -2px;\n}";

const formatted = ref(true);
</script>

<template>
    <DockScene place="center">
        <Card size="sm" class="pane">
            <div class="pane-head">
                <CardTitle as="h3" class="text-body">card.css</CardTitle>
                <div class="pane-dock">
                    <GlassDock :collapse="false" fit-content aria-label="Stylesheet actions">
                        <DockControl shape="tab">Apply</DockControl>
                        <DockControl shape="tab">Copy</DockControl>
                        <DockControl shape="tab" :aria-pressed="formatted" @click="formatted = !formatted">
                            Format
                        </DockControl>
                    </GlassDock>
                </div>
            </div>
            <CardContent>
                <Transition name="fade" mode="out-in">
                    <pre :key="String(formatted)" class="pane-code text-small">{{ formatted ? FORMATTED : COMPACT }}</pre>
                </Transition>
            </CardContent>
        </Card>
    </DockScene>
</template>

<style scoped>
.pane {
    inline-size: min(100%, 34rem);
    min-inline-size: 20rem;
}

.pane-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3);
    padding: var(--sp-3) var(--sp-3) 0 var(--sp-4);
}

.pane-code {
    margin: 0;
    padding-inline: var(--sp-3);
    min-block-size: 9rem;
    font-family: var(--font-mono);
    white-space: pre-wrap;
    color: var(--foreground);
}

/* The dock centres itself in its own box; a box sized to it holds it at the end. */
.pane-dock {
    display: flex;
    flex: none;
}
</style>
