<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import {
    Home, Search, Bell, Settings, Plus, Share2, Download,
    ChevronDown, Play, Pause, SkipBack, SkipForward,
} from "@lucide/vue";
import {
    GlassDock,
    DockIconButton,
    DockDropdownTrigger,
    DockSelectTrigger,
    DockBackgroundToggle,
} from "../../../src/components/custom/dock";
import { HoverPopover } from "../../../src/components/custom/hover-popover";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
} from "../../../src/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
} from "../../../src/components/ui/select";

const playing = ref(false);
const bgPaused = ref(false);
const track = ref("The Garden");
const tracks = ["The Garden", "Morning Weft", "Carmine Drift", "Salt & Slate"];

type DockView = "preview" | "inspect" | "timeline";
type DockCommand = "focus" | "share" | "archive";

const dockView = ref<DockView>("preview");
const dockCommand = ref<DockCommand>("focus");

const dockViews: { value: DockView; label: string }[] = [
    { value: "preview", label: "Preview" },
    { value: "inspect", label: "Inspect" },
    { value: "timeline", label: "Timeline" },
];

const dockCommands: { value: DockCommand; label: string }[] = [
    { value: "focus", label: "Focus canvas" },
    { value: "share", label: "Share workspace" },
    { value: "archive", label: "Archive scene" },
];

const dockViewLabels: Record<DockView, string> = {
    preview: "Preview",
    inspect: "Inspect",
    timeline: "Timeline",
};

const dockCommandLabels: Record<DockCommand, string> = {
    focus: "Focus canvas",
    share: "Share workspace",
    archive: "Archive scene",
};

function togglePlay() {
    playing.value = !playing.value;
}
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Collapsible (hover to expand)</h2>
            <p class="text-sm text-muted-foreground">
                AW.W3 — the collapsed pill scales up on hover riding the SAME
                <code class="rounded bg-muted px-1">--spring-dock</code> vocabulary the expand morph uses, so
                hover→expand reads as one continuous spring. The controls cascade in on the size spring's
                progress (outer→in), reversed on collapse. Under
                <code class="rounded bg-muted px-1">prefers-reduced-motion</code> the scale + stagger snap; the
                state still toggles.
            </p>
            <div class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <GlassDock>
                    <DockIconButton aria-label="Home"><Home class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Search"><Search class="h-4 w-4" /></DockIconButton>
                    <div class="dock-separator" />
                    <DockIconButton aria-label="Notifications"><Bell class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Settings"><Settings class="h-4 w-4" /></DockIconButton>
                    <template #collapsed>
                        <Home class="h-4 w-4" />
                    </template>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Always expanded — media transport</h2>
            <div class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <GlassDock always-expanded>
                    <DockIconButton aria-label="Previous"><SkipBack class="h-4 w-4" /></DockIconButton>
                    <DockIconButton
                        :aria-pressed="playing"
                        :aria-label="playing ? 'Pause' : 'Play'"
                        @click="togglePlay"
                    >
                        <Pause v-if="playing" class="h-4 w-4" />
                        <Play v-else class="h-4 w-4" />
                    </DockIconButton>
                    <DockIconButton aria-label="Next"><SkipForward class="h-4 w-4" /></DockIconButton>
                    <div class="dock-separator" />
                    <span class="px-2 text-xs text-muted-foreground tabular-nums max-w-36 truncate">
                        {{ track }}
                    </span>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3" data-testid="dock-trigger-story">
            <h2 class="text-sm font-semibold text-muted-foreground">Select and dropdown triggers</h2>
            <div class="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <!-- import { DockSelectTrigger, DockDropdownTrigger } from "../../../src/components/custom/dock"; -->
                <GlassDock always-expanded fit-content>
                    <Select v-model="dockView">
                        <DockSelectTrigger
                            aria-label="Dock view"
                            data-testid="dock-select-trigger"
                        >
                            <span class="text-xs">{{ dockViewLabels[dockView] }}</span>
                            <SelectValue class="sr-only" />
                        </DockSelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="view in dockViews"
                                :key="view.value"
                                :value="view.value"
                            >
                                {{ view.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <div class="dock-separator" />

                    <DropdownMenu>
                        <DockDropdownTrigger
                            type="button"
                            data-testid="dock-dropdown-trigger"
                        >
                            <Settings class="h-4 w-4" />
                            <span class="text-xs">{{ dockCommandLabels[dockCommand] }}</span>
                            <ChevronDown class="h-3 w-3 opacity-60" />
                        </DockDropdownTrigger>
                        <DropdownMenuContent align="center" class="w-52">
                            <DropdownMenuLabel>Dock command</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup v-model="dockCommand">
                                <DropdownMenuRadioItem
                                    v-for="command in dockCommands"
                                    :key="command.value"
                                    :value="command.value"
                                >
                                    {{ command.label }}
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </GlassDock>

                <div class="grid gap-1 rounded-lg border border-border/50 bg-background/60 px-3 py-2 text-xs text-muted-foreground sm:grid-cols-2">
                    <p data-testid="dock-select-readout">
                        select = <span class="font-medium text-foreground">{{ dockViewLabels[dockView] }}</span>
                    </p>
                    <p data-testid="dock-dropdown-readout">
                        dropdown = <span class="font-medium text-foreground">{{ dockCommandLabels[dockCommand] }}</span>
                    </p>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">With popover triggers</h2>
            <p class="text-sm text-muted-foreground">
                <code class="rounded bg-muted px-1">HoverPopover keep-dock-open</code> pins the parent
                dock open while the popover is visible. reka-ui's HoverCard primitives handle
                hover-trigger, defer-on-leave, and adaptive side/align collision avoidance.
            </p>
            <div class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <GlassDock always-expanded>
                    <DockIconButton aria-label="New"><Plus class="h-4 w-4" /></DockIconButton>

                    <HoverPopover side="bottom" align="center" keep-dock-open>
                        <template #trigger>
                            <DockIconButton aria-label="Share">
                                <Share2 class="h-4 w-4" />
                            </DockIconButton>
                        </template>
                        <template #content>
                            <div class="flex min-w-44 flex-col gap-1 p-1">
                                <p class="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">Share</p>
                                <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">Copy link</button>
                                <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">Email</button>
                                <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">Embed</button>
                            </div>
                        </template>
                    </HoverPopover>

                    <HoverPopover side="bottom" align="end" keep-dock-open>
                        <template #trigger>
                            <DockIconButton aria-label="Export">
                                <Download class="h-4 w-4" />
                            </DockIconButton>
                        </template>
                        <template #content>
                            <div class="flex min-w-44 flex-col gap-1 p-1">
                                <p class="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">Export</p>
                                <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">PNG</button>
                                <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">SVG</button>
                                <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">PDF</button>
                            </div>
                        </template>
                    </HoverPopover>

                    <div class="dock-separator" />

                    <HoverPopover side="bottom" align="center" keep-dock-open>
                        <template #trigger>
                            <DockIconButton aria-label="Track">
                                <span class="flex items-center gap-1">
                                    <span class="text-xs">Track</span>
                                    <ChevronDown class="h-3 w-3 opacity-60" />
                                </span>
                            </DockIconButton>
                        </template>
                        <template #content>
                            <div class="flex min-w-44 flex-col gap-1 p-1">
                                <button
                                    v-for="t in tracks"
                                    :key="t"
                                    :class="['rounded px-2 py-1.5 text-left text-sm hover:bg-muted', track === t && 'bg-muted font-medium']"
                                    @click="track = t"
                                >
                                    {{ t }}
                                </button>
                            </div>
                        </template>
                    </HoverPopover>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-foreground">
                Overflow wrap — content-driven multi-row reflow (W04)
            </h2>
            <p class="text-xs text-muted-foreground">
                <code class="rounded bg-muted px-1">overflow="wrap"</code> reflows the row to
                multiple rows by INTRINSIC flex-wrap whenever the content's natural width exceeds
                the dock's inline cap (<code class="rounded bg-muted px-1">min(max-content,
                --dock-max-inline-size)</code>) — at ANY viewport width, no breakpoint. The wrapped
                multi-row silhouette lifts onto the card/floating shadow tier and a finite
                <code class="rounded bg-muted px-1">--dock-card-radius</code> corner as it expands.
            </p>
            <!-- Host caps --dock-max-inline-size at 28rem so the 14-control row overflows the cap
                 and wraps ON-SCREEN at desktop (the consumer-override the cap token exposes). -->
            <div class="flex justify-center py-6">
                <GlassDock
                    overflow="wrap"
                    always-expanded
                    style="--dock-max-inline-size: 28rem"
                >
                    <DockIconButton aria-label="Home"><Home class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Search"><Search class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Add"><Plus class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Notifications"><Bell class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Share"><Share2 class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Download"><Download class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Settings"><Settings class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Previous"><SkipBack class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Play"><Play class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Next"><SkipForward class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Home (2)"><Home class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Search (2)"><Search class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Add (2)"><Plus class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Settings (2)"><Settings class="h-4 w-4" /></DockIconButton>
                </GlassDock>
            </div>
            <p class="text-xs text-muted-foreground">
                Collapsible wrap dock — hover to expand. Collapsed it is a single-row stadium pill
                (flat <code class="rounded bg-muted px-1">--shadow-dock</code> glow); expanded it
                wraps to rows AND morphs corner + elevation onto the card tier in lockstep on the
                one dock spring (no jump-cut).
            </p>
            <div class="flex justify-center py-6">
                <GlassDock overflow="wrap" style="--dock-max-inline-size: 22rem">
                    <DockIconButton aria-label="Home"><Home class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Search"><Search class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Add"><Plus class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Notifications"><Bell class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Share"><Share2 class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Download"><Download class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Settings"><Settings class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Previous"><SkipBack class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Play"><Play class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Next"><SkipForward class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Home (2)"><Home class="h-4 w-4" /></DockIconButton>
                    <DockIconButton aria-label="Search (2)"><Search class="h-4 w-4" /></DockIconButton>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-foreground">Big dock — card shell + tile grid (W3b)</h2>
            <p class="text-xs text-muted-foreground">
                <code class="rounded bg-muted px-1">shape="card"</code> gives a finite concentric
                card radius (not a stadium pill); <code class="rounded bg-muted px-1">layout="grid"</code>
                lays children out as a self-wrapping 2D tile grid for large multi-row docks
                (<code class="rounded bg-muted px-1">alwaysExpanded</code> by contract — no width morph).
            </p>
            <div class="flex justify-center py-6">
                <GlassDock shape="card" layout="grid" class="w-80">
                    <DockIconButton aria-label="Home"><Home class="h-5 w-5" /></DockIconButton>
                    <DockIconButton aria-label="Search"><Search class="h-5 w-5" /></DockIconButton>
                    <DockIconButton aria-label="Add"><Plus class="h-5 w-5" /></DockIconButton>
                    <DockIconButton aria-label="Notifications"><Bell class="h-5 w-5" /></DockIconButton>
                    <DockIconButton aria-label="Previous"><SkipBack class="h-5 w-5" /></DockIconButton>
                    <DockIconButton aria-label="Next"><SkipForward class="h-5 w-5" /></DockIconButton>
                    <DockIconButton aria-label="Home (2)"><Home class="h-5 w-5" /></DockIconButton>
                    <DockIconButton aria-label="Search (2)"><Search class="h-5 w-5" /></DockIconButton>
                    <DockIconButton aria-label="Settings"><Settings class="h-5 w-5" /></DockIconButton>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-foreground">
                Background pause/play toggle (WCAG 2.2.2)
            </h2>
            <p class="text-xs text-muted-foreground">
                <code class="rounded bg-muted px-1">&lt;DockBackgroundToggle&gt;</code>
                is the Level-A pause/play control a consumer wires to a running
                Aurora/GooBlob renderer's <code class="rounded bg-muted px-1">pause()</code>/<code
                    class="rounded bg-muted px-1"
                    >resume()</code
                >. It reflects state via <code class="rounded bg-muted px-1">aria-pressed</code>
                and a Pause↔Play glyph swap, available to all users.
            </p>
            <div class="flex justify-center py-6">
                <GlassDock>
                    <DockBackgroundToggle v-model:paused="bgPaused" />
                    <DockIconButton aria-label="Home"><Home class="h-5 w-5" /></DockIconButton>
                    <DockIconButton aria-label="Settings"><Settings class="h-5 w-5" /></DockIconButton>
                </GlassDock>
            </div>
            <p class="text-center text-xs text-muted-foreground">
                background: <code class="rounded bg-muted px-1">{{ bgPaused ? "paused" : "running" }}</code>
            </p>
        </section>

        <section class="flex flex-col gap-2 text-sm text-muted-foreground">
            <h2 class="text-sm font-semibold text-foreground">Notes</h2>
            <ul class="list-disc pl-5 space-y-1">
                <li>Collapse delay is ref-counted — any popover or nested keep-open source pins it.</li>
                <li>The collapsed pill renders via the named <code class="rounded bg-muted px-1">#collapsed</code> slot.</li>
                <li>Use <code class="rounded bg-muted px-1">DockIconButton</code> for flush-fit buttons inside.</li>
            </ul>
        </section>
    </StoryPage>
</template>
