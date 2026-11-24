<script setup lang="ts">
// A collapsed seal in a glass Tooltip, as keyframes' chrome dock authors it
// (`demo/app/dock/ChromeDock.vue`, `#collapsed`), with no opening delay so the
// tooltip opens on the first pointer move over the seal, before the hover open.
import { GlassDock, DockControl } from "@glass/components/dock";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@glass/components/tooltip";
import { Home, Search, Bell, Settings, Star } from "@lucide/vue";
</script>

<template>
    <div class="td-page">
        <TooltipProvider :delay-duration="0">
            <GlassDock data-testid="tip-dock" aria-label="tip" collapse="closed">
                <DockControl aria-label="Home"><Home /></DockControl>
                <DockControl aria-label="Search"><Search /></DockControl>
                <DockControl aria-label="Notifications"><Bell /></DockControl>
                <DockControl aria-label="Favourite"><Star /></DockControl>
                <DockControl aria-label="Settings"><Settings /></DockControl>
                <template #collapsed>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <DockControl aria-label="Scene" data-testid="tip-seal"><Star /></DockControl>
                        </TooltipTrigger>
                        <TooltipContent data-testid="tip-content">Scene</TooltipContent>
                    </Tooltip>
                </template>
            </GlassDock>
        </TooltipProvider>
    </div>
</template>

<style scoped>
.td-page {
    display: flex;
    justify-content: center;
    padding-top: 96px;
}
</style>
