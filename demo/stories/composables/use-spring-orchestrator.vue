<script setup lang="ts">
// useSpringOrchestrator — keyed numeric snapshots between two states.
// Live visual demo: motion/springs.vue. This entry cross-links + documents API.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="parametric spring between snapshots"
            blurb="Wraps keyframes.js NumericAnimation. Drives numeric interpolation between two named snapshots over a duration; per-frame onFrame consumer writes the resulting record to the DOM (CSS variables, transforms, etc.). The composable never touches the DOM directly."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre v-pre class="fira-code text-sm overflow-x-auto"><code>const orchestrator = useSpringOrchestrator&lt;"x" | "y" | "scale"&gt;({
  from:     { x: 0,   y: 0,   scale: 1 },
  to:       { x: 100, y: 50,  scale: 1.2 },
  duration: 400,
  timingFunction: "easeOutCubic",
  onFrame:  (values) =&gt; {
    el.style.setProperty("--x", `${values.x}px`);
    el.style.setProperty("--y", `${values.y}px`);
    el.style.setProperty("--scale", String(values.scale));
  },
});

orchestrator.play();
orchestrator.reverse();
orchestrator.snap();</code></pre>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="visual demo"
            blurb="Live spring playback lives at Motion / Spring Orchestrator (the dedicated motion-page demo)."
        />
    </StoryPage>
</template>
