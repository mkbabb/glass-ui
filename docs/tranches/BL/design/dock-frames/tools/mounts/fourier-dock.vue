<script setup lang="ts">
// fourier.babb.dev's top dock, seat for seat, from fourier-analysis origin/master 266bd67
// (web/src/components/layout/AppDock.vue, DarkModeToggle.vue, auth/UserSlugBar.vue,
// visualization/WorkspaceTools.vue): the wordmark (compact DockControl as="a"), the
// sections trigger reading "Visualize" (DockTrigger for="dropdown" in a non-modal
// DropdownMenu), a rule, the page's three icon seats (DockControl, each in a glass
// Tooltip as WorkspaceTools wraps them) and their rule, "Log in" (DockTrigger
// for="popover" in a keep-dock-open Popover), the "i" (the same), and the theme seat
// (DockControl class="sun-moon-toggle", aria-pressed, title "Switch to dark mode" /
// "Switch to light mode", a 24 px glyph). collapse="closed"; the seal is an svg.
// The header is fourier's: a flex row, centred, padding --space-body / 1.5rem.
// The page's scroller is <main>, and a 48 px scroll down from where it last stood
// collapses the dock (AppDock's FOLD_PX), as on the site.
// Differences, named: the glyph is a static 24 px svg (fourier's morphs a Fourier
// series between a sun and a moon); the wordmark is in the page serif, not
// fourier's math serif; the menus hold placeholder rows.
import { onMounted, ref, useTemplateRef } from "vue";
import { GlassDock, DockControl, DockSeparator } from "@glass/components/dock";
import { DockTrigger } from "@glass/components/dock/trigger";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@glass/components/menu";
import { Popover, PopoverContent } from "@glass/components/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@glass/components/tooltip";
import { useGlobalDark } from "@glass/composables/dark";
import { ChevronDown, Eye, House, Info, LogIn, Globe, Link, SquareFunction } from "@lucide/vue";

const { isDark, toggleDark } = useGlobalDark();
// Under 40rem fourier draws no page seats in the dock (AppDock PAGE_TOOLS_COMPACT).
const compact = typeof window !== "undefined" && window.matchMedia("(width < 40rem)").matches;
const seats = [
    { label: "Copy link", id: "page-seat-1" },
    { label: "Publish to Gallery", id: "page-seat-2" },
    { label: "Series", id: "page-seat-3" },
];
const dockRef = useTemplateRef<InstanceType<typeof GlassDock>>("dockRef");
const main = ref<HTMLElement | null>(null);
const FOLD_PX = 48;
let foldFrom = 0;
function onScroll() {
    const top = main.value?.scrollTop ?? 0;
    const dock = dockRef.value as unknown as { expanded?: boolean; isHeld?: boolean; collapse?: () => void } | null;
    if (!dock?.expanded || top < foldFrom) foldFrom = top;
    else if (top - foldFrom > FOLD_PX && !dock.isHeld) dock.collapse?.();
}
onMounted(() => {
    foldFrom = main.value?.scrollTop ?? 0;
});
</script>

<template>
    <div class="fd-page" data-testid="fd-page">
        <header class="fd-header">
            <GlassDock ref="dockRef" data-testid="fourier-dock" class="app-dock" orientation="horizontal" shape="pill" collapse="closed">
                <DockControl as="a" compact href="#" class="logo-trigger" aria-label="Home — Fourier analysis" title="Home" @click.prevent>
                    <House class="home-glyph" aria-hidden="true" />
                    <span class="logo-mark">&#x2131;ourier analysis</span>
                </DockControl>
                <DropdownMenu :modal="false">
                    <DockTrigger for="dropdown" class="nav-trigger" aria-label="Navigate — current section Visualize">
                        <Eye class="nav-tab-icon" aria-hidden="true" />
                        <span class="nav-trigger-label">Visualize</span>
                        <ChevronDown class="nav-trigger-chevron" aria-hidden="true" />
                    </DockTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Paper</DropdownMenuItem>
                        <DropdownMenuItem>Visualize</DropdownMenuItem>
                        <DropdownMenuItem>Gallery</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DockSeparator />
                <div v-if="!compact" class="page-seats" role="group" aria-label="Visualize tools">
                    <TooltipProvider :delay-duration="400" :skip-delay-duration="200">
                        <Tooltip v-for="(seat, k) in seats" :key="seat.id">
                            <TooltipTrigger as-child>
                                <DockControl :aria-label="seat.label" :data-testid="seat.id">
                                    <Link v-if="k === 0" /><Globe v-else-if="k === 1" /><SquareFunction v-else />
                                </DockControl>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" :side-offset="6">{{ seat.label }}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DockSeparator />
                </div>
                <div class="contents" role="group" aria-label="Account">
                    <div class="flex items-center">
                        <Popover keep-dock-open>
                            <DockTrigger for="popover" class="account-trigger" aria-label="Log in" data-testid="login-seat">
                                <LogIn class="account-glyph" aria-hidden="true" />
                                <span class="login-label">Log in</span>
                            </DockTrigger>
                            <PopoverContent align="end"><p style="padding: 8px">Your slug</p></PopoverContent>
                        </Popover>
                    </div>
                </div>
                <Popover keep-dock-open>
                    <DockTrigger for="popover" class="about-trigger" aria-label="About Fourier analysis" title="About" data-testid="about-seat">
                        <Info class="about-glyph" aria-hidden="true" />
                    </DockTrigger>
                    <PopoverContent align="end"><p style="padding: 8px">@mbabb</p></PopoverContent>
                </Popover>
                <DockControl
                    class="sun-moon-toggle"
                    data-testid="theme-seat"
                    aria-label="Dark mode"
                    :aria-pressed="isDark"
                    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                    @click="toggleDark()"
                >
                    <svg class="fd-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                        <circle v-if="!isDark" cx="12" cy="12" r="5" />
                        <path v-else d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
                    </svg>
                </DockControl>
                <template #collapsed>
                    <svg class="fourier-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
                        <circle cx="50" cy="50" r="37.92" fill="none" stroke="currentColor" stroke-width="6.16" />
                        <circle cx="58.76" cy="34.04" r="19.72" fill="none" stroke="currentColor" stroke-width="6.16" />
                        <circle cx="53.87" cy="26.37" r="10.62" fill="none" stroke="currentColor" stroke-width="6.16" />
                        <circle cx="45.89" cy="30.89" r="3.82" fill="currentColor" />
                    </svg>
                </template>
            </GlassDock>
        </header>
        <main ref="main" class="fd-main" data-testid="fd-main" @scroll.passive="onScroll">
            <div class="fd-content">
                <p v-for="n in 40" :key="n" class="fd-line">Line {{ n }} of the page.</p>
            </div>
        </main>
    </div>
</template>

<style>
.fd-page {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
}
.fd-header {
    display: flex;
    justify-content: center;
    padding: var(--space-body, 0.75rem) 0.625rem;
    position: relative;
    z-index: 50;
}
@media (min-width: 640px) {
    .fd-header {
        padding-inline: 1.5rem;
    }
}
.fd-main {
    flex: 1;
    overflow: auto;
}
.fd-content {
    padding: 24px;
}
.fd-line {
    margin: 0 0 28px;
    font: 15px/1.5 system-ui, sans-serif;
    opacity: 0.6;
}
.app-dock {
    --dock-trigger-min-height: var(--dock-control-size);
    --dock-icon-glyph: var(--icon-xl);
}
.nav-tab-icon,
.about-glyph,
.home-glyph,
.fd-glyph {
    inline-size: var(--dock-icon-glyph);
    block-size: var(--dock-icon-glyph);
}
.page-seats {
    display: flex;
    align-items: center;
    gap: var(--dock-layer-gap, 0.375rem);
}
.logo-trigger,
.nav-trigger,
.about-trigger {
    min-inline-size: var(--dock-control-size);
}
.logo-trigger {
    min-block-size: var(--dock-control-size);
}
.logo-mark {
    display: none;
    font: 600 1.25rem/1 Georgia, serif;
    letter-spacing: -0.01em;
}
@media (min-width: 640px) {
    .home-glyph {
        display: none;
    }
    .logo-mark {
        display: inline;
    }
}
.login-label {
    display: none;
}
@media (min-width: 640px) {
    .login-label {
        display: inline;
    }
}
.nav-trigger {
    gap: 0.25rem;
}
.nav-trigger-chevron {
    width: 1rem;
    height: 1rem;
    opacity: 0.5;
    flex-shrink: 0;
}
.fourier-mark {
    inline-size: var(--icon-xl, 24px);
    block-size: var(--icon-xl, 24px);
}
</style>
