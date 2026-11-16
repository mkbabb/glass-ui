<script setup lang="ts">
// MEASURE-6 (RU-44, G-15): the ten dock compositions of the demo's dock section (bl/demo,
// demo/stories/dock/<id>.stage.vue, copied read-only into m6/comp/ with StoryStage and DockScene),
// each on the stage's field (StoryStage's one Aurora, `ground=field`) or a flat ground
// (`ground=flat`, the page's background), built against this worktree's library.
// ?c=dock-comp&page=<id>&ground=field|flat[&scheme=dark][&open=1]
import { computed, defineAsyncComponent } from "vue";
import StoryStage from "./comp/StoryStage.vue";
const q = new URLSearchParams(location.search);
const page = q.get("page") ?? "nav";
const ground = q.get("ground") ?? "field";
const loaders = import.meta.glob("./comp/*.stage.vue");
const Stage = computed(() => defineAsyncComponent(loaders[`./comp/${page}.stage.vue`] as never));
</script>

<template>
    <main class="comp-main" data-testid="comp-main">
        <StoryStage size="tall" :field="ground === 'field'" class="comp-stage" :data-ground="ground" data-testid="comp-stage">
            <component :is="Stage" />
        </StoryStage>
    </main>
</template>

<style>
.comp-main { padding: 24px; box-sizing: border-box; min-block-size: 100vh; background: var(--background); color: var(--foreground); }
.comp-stage { position: relative; inline-size: 100%; block-size: min(560px, 70vh); border-radius: 16px; overflow: hidden; container-type: inline-size; }
.comp-stage[data-ground="flat"] { background: var(--background); }
</style>
