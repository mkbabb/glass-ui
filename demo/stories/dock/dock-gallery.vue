<script setup lang="ts">
// BE.W-LIQUID-MORPH — the DOCK GALLERY (audit §W10, RE-HOSTED). The companion to the
// liquid-playground LAB: where the lab is ONE configurable dock with the live spring
// engine, the gallery is the BREADTH — many distinct, recognizable iOS surfaces the dock
// MORPHS into, each a self-contained interactive tile.
//
// THE RE-HOST (the W10 fix). Every tile used to be a CSS-transition FACSIMILE that used
// NONE of the engine + re-pasted the tile chassis + glass plate + an `--ex-spring` bezier
// 5-10×. Now:
//   • ONE <DockExampleTile> demo chassis factors the bg slot + caption + the SHIPPED
//     --spring-* register (no bespoke overshoot bezier re-minted) + the PRM block ONCE.
//   • Every example COMPOSES a real library engine — useBloomUp (Apple Music · Notification
//     · Tab-bar compose · Volume HUD · Spotlight · App-switcher) / useDockFission (the
//     Dynamic Island Call — an ACTUAL split, not a downward grow) — so it DEMONSTRATES the
//     vocabulary instead of re-forking it, and proof:no-layout-animation holds by
//     construction (no max-block-size/line-clamp layout animation survives).
//   • ONE shared <DockStage> aurora is hoisted for the route (the one-GL-per-route budget;
//     the old "2 live Aurora contexts" comment was false — the tiles rode STATIC gradients
//     and the route had no live field at all). The tiles keep their own static gradient
//     backdrops; the shared field reads behind the column.
//   • ONE <DockGooFilter> goo <filter> mount (the fission Call tile references it by id).
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import DockStage from "./DockStage.vue";
import { DockGooFilter } from "../../../src/components/custom/dock";
import AppleMusic from "./examples/AppleMusic.vue";
import DynamicIslandCall from "./examples/DynamicIslandCall.vue";
import Notification from "./examples/Notification.vue";
import TabBar from "./examples/TabBar.vue";
import VolumeHUD from "./examples/VolumeHUD.vue";
import Spotlight from "./examples/Spotlight.vue";
import AppSwitcher from "./examples/AppSwitcher.vue";
</script>

<template>
    <StoryPage>
        <!-- the ONE library goo <filter> mount — the fission Call tile's bridge references
             it by id (var(--dock-fission-goo-filter) → url(#dock-fission-goo)). Mounted
             ONCE for the whole route. -->
        <DockGooFilter />

        <StorySection
            heading="Dock morphs — the shape-shifting protagonist"
            gap="md"
        >
            <p class="text-small text-muted-foreground">
                The companion to the <strong>liquid playground</strong> lab — the BREADTH
                of shapes the dock morphs into. Each tile is a distinct iOS surface
                COMPOSING a real library engine
                (<code class="rounded bg-muted px-1">useBloomUp</code> /
                <code class="rounded bg-muted px-1">useDockFission</code>);
                <strong>tap the dock</strong> to morph it. (The lab proves the live spring
                engine + aurora; this proves the vocabulary.)
            </p>

            <!-- ONE shared aurora field behind the whole gallery column (the one-GL-per-
                 route budget; offscreen-paused by construction). The tiles flow over it. -->
            <DockStage>
                <div class="dock-ex-grid">
                    <AppleMusic />
                    <DynamicIslandCall />
                    <Notification />
                    <TabBar />
                    <VolumeHUD />
                    <Spotlight />
                    <AppSwitcher />
                </div>
            </DockStage>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* the gallery grid — the only chassis the gallery itself owns; the tile chassis is
   <DockExampleTile> (the duplication is dead). */
.dock-ex-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
    gap: 1.25rem;
}
</style>
