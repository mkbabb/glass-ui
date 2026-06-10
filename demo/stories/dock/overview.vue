<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import {
    Home, Search, Bell, Settings, Plus, Share2, Download,
    ChevronDown, Play, Pause, SkipBack, SkipForward,
    Volume2, SlidersHorizontal,
} from "@lucide/vue";
import {
    GlassDock,
    DockIconButton,
    DockDropdownTrigger,
    DockSelectTrigger,
    DockSeparator,
    DockBackgroundToggle,
} from "../../../src/components/custom/dock";
import { Slider } from "../../../src/components/ui/slider";
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
import { Aurora } from "../../../src/components/custom/aurora";
import { DEFAULT_AURORA_CONFIG } from "../../../src/components/custom/aurora";

const playing = ref(false);
const bgPaused = ref(false);
const volume = ref<number[]>([42]);
const mix = ref<number[]>([55]);
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
                The collapsed pill scales up on hover on the same
                <code class="rounded bg-muted px-1">--spring-dock</code> vocabulary the expand morph uses, so
                hover-to-expand reads as one continuous spring. The controls cascade in outer-to-inward,
                reversed on collapse. Under
                <code class="rounded bg-muted px-1">prefers-reduced-motion</code> the scale and stagger snap;
                the state still toggles.
            </p>
            <!-- The dock IS the headline glass primitive — stage a low-intensity
                 contained Aurora wash INSIDE the specimen frame (the display/card
                 MODEL pattern) so the glass dock has something to be glass against
                 (W-SB-STAGE §2.2, FD §6 the #1 placement). ONE Aurora context per
                 page — within the WebGL budget. -->
            <div class="relative flex justify-center overflow-hidden rounded-[var(--radius-card)] border border-border/40 p-8">
                <Aurora
                    :config="DEFAULT_AURORA_CONFIG"
                    :opacity-ceiling="0.4"
                    class="absolute inset-0"
                    aria-hidden="true"
                />
                <GlassDock class="relative z-10">
                    <!-- Home is a persistent control: it stays visible in both the
                         collapsed and expanded states via the #persistent slot. -->
                    <template #persistent>
                        <DockIconButton aria-label="Home"><Home /></DockIconButton>
                    </template>
                    <DockIconButton aria-label="Search"><Search /></DockIconButton>
                    <DockSeparator />
                    <DockIconButton aria-label="Notifications"><Bell /></DockIconButton>
                    <DockIconButton aria-label="Settings"><Settings /></DockIconButton>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Always expanded — media transport</h2>
            <div class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <GlassDock always-expanded>
                    <DockIconButton aria-label="Previous"><SkipBack /></DockIconButton>
                    <DockIconButton
                        :aria-pressed="playing"
                        :aria-label="playing ? 'Pause' : 'Play'"
                        @click="togglePlay"
                    >
                        <Pause v-if="playing" />
                        <Play v-else />
                    </DockIconButton>
                    <DockIconButton aria-label="Next"><SkipForward /></DockIconButton>
                    <DockSeparator />
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

                    <DockSeparator />

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
                    <DockIconButton aria-label="New"><Plus /></DockIconButton>

                    <HoverPopover side="bottom" align="center" keep-dock-open>
                        <template #trigger>
                            <DockIconButton aria-label="Share">
                                <Share2 />
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
                                <Download />
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

                    <DockSeparator />

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

        <section class="flex flex-col gap-3" data-testid="dock-slider-section">
            <h2 class="text-sm font-semibold text-muted-foreground">Slider in dock — the keep-dock-open hold</h2>
            <p class="text-sm text-muted-foreground">
                A <code class="rounded bg-muted px-1">&lt;Slider&gt;</code> descendant of a dock holds the
                dock open while the user drags (the <code class="rounded bg-muted px-1">dockKeepOpen</code>
                token), and reflects the dock's held state via
                <code class="rounded bg-muted px-1">data-held</code> on its root. Drag a knob: the thumb halo
                intensifies and the dock substrate tier-shades up while held; release returns both to default.
                The contract is bidirectional and pointer-anchored — it lives on the API surface, not the recipe.
            </p>
            <div
                class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8"
                data-testid="dock-slider-hold"
            >
                <!-- data-testid="dock-capture" is the deterministic AY.W-DOCK1 capture
                     selector — a plain root-forwarded data attr (NOT the GlassDock
                     `container-name` prop, which co-applies `container-type: inline-size`
                     and breaks the collapse↔expand morph — the
                     dock-collapse-vs-container-type interaction). The items-lag harness holds THIS single
                     collapsible dock: it morphs RELIABLY (collapsed→expanded ~490px on the
                     --dock-morph-t spring) and its trailing .dock-layer--full child rides
                     the deliberate per-child reveal stagger, so it is the faithful surface
                     for measuring the entering-child onset the chronic owes. The short
                     :collapse-delay="600" keeps the capture's collapse-baseline fast.
                     Demo-private test-affordance only; no behavioral change. -->
                <GlassDock :collapse-delay="600" data-testid="dock-capture">
                    <DockIconButton aria-label="Volume"><Volume2 /></DockIconButton>
                    <div class="flex w-44 items-center px-2">
                        <Slider v-model="volume" :max="100" :step="1" aria-label="Volume" />
                    </div>
                    <DockSeparator />
                    <DockIconButton aria-label="Mix"><SlidersHorizontal /></DockIconButton>
                    <div class="flex w-44 items-center px-2">
                        <Slider v-model="mix" :max="100" :step="1" aria-label="Mix" />
                    </div>
                    <template #collapsed>
                        <SlidersHorizontal class="h-4 w-4" />
                    </template>
                </GlassDock>
            </div>
            <p class="text-xs text-muted-foreground">
                Hover to expand, then press-and-hold a thumb and move the pointer OFF the dock: the dock stays
                open through the held drag and re-collapses only after release. Either drag holds the dock open,
                and both halos intensify when either is dragged since both read the dock's shared held state.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-foreground">
                Dock as a portal host — the navigation-layer / no-glass-on-glass contract
            </h2>
            <p class="text-sm text-muted-foreground">
                A dropdown or menu mounted inside a dock MUST be wired into the dock's
                <code class="rounded bg-muted px-1">keepOpen</code> +
                <code class="rounded bg-muted px-1">data-glass-dock-portal</code> teleport contract — the
                same contract the
                <code class="rounded bg-muted px-1">DockSelectTrigger</code> /
                <code class="rounded bg-muted px-1">DockDropdownTrigger</code> /
                <code class="rounded bg-muted px-1">HoverPopover keep-dock-open</code> sections above already
                ride. This is Apple's navigation-layer / no-glass-on-glass rule made structural: glass floats
                only in the navigation/overlay band and never nests in glass (stacked blur muddies, the rim
                doubles), so a dock-hosted menu TELEPORTS OUT to its own sampling region rather than painting a
                second glass plate inside the dock's.
            </p>
            <p class="text-xs text-muted-foreground">
                The canonical mis-wire (the keyframes D9 break): a dropdown mounted OUTSIDE the
                <code class="rounded bg-muted px-1">keepOpen</code>+portal contract drops out of the dock the
                instant the trigger fires — it paints its own glass plate stacked over the dock's and the dock
                idle-collapses out from under it. Reach for the dock-native trigger primitives (which bundle
                the contract), not a raw
                <code class="rounded bg-muted px-1">&lt;DropdownMenu&gt;</code> child.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-foreground">
                Overflow wrap — content-driven multi-row reflow (W04)
            </h2>
            <p class="text-xs text-muted-foreground">
                <code class="rounded bg-muted px-1">overflow="wrap"</code> reflows the row to
                multiple rows by INTRINSIC flex-wrap whenever the content's natural width exceeds
                the dock's inline cap (the dock shrink-wraps to content and
                <code class="rounded bg-muted px-1">max-inline-size: var(--dock-max-inline-size)</code>
                caps it) — at ANY viewport width, no breakpoint. The wrapped
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
                    <DockIconButton aria-label="Home"><Home /></DockIconButton>
                    <DockIconButton aria-label="Search"><Search /></DockIconButton>
                    <DockIconButton aria-label="Add"><Plus /></DockIconButton>
                    <DockIconButton aria-label="Notifications"><Bell /></DockIconButton>
                    <DockIconButton aria-label="Share"><Share2 /></DockIconButton>
                    <DockIconButton aria-label="Download"><Download /></DockIconButton>
                    <DockIconButton aria-label="Settings"><Settings /></DockIconButton>
                    <DockIconButton aria-label="Previous"><SkipBack /></DockIconButton>
                    <DockIconButton aria-label="Play"><Play /></DockIconButton>
                    <DockIconButton aria-label="Next"><SkipForward /></DockIconButton>
                    <DockIconButton aria-label="Home (2)"><Home /></DockIconButton>
                    <DockIconButton aria-label="Search (2)"><Search /></DockIconButton>
                    <DockIconButton aria-label="Add (2)"><Plus /></DockIconButton>
                    <DockIconButton aria-label="Settings (2)"><Settings /></DockIconButton>
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
                    <DockIconButton aria-label="Home"><Home /></DockIconButton>
                    <DockIconButton aria-label="Search"><Search /></DockIconButton>
                    <DockIconButton aria-label="Add"><Plus /></DockIconButton>
                    <DockIconButton aria-label="Notifications"><Bell /></DockIconButton>
                    <DockIconButton aria-label="Share"><Share2 /></DockIconButton>
                    <DockIconButton aria-label="Download"><Download /></DockIconButton>
                    <DockIconButton aria-label="Settings"><Settings /></DockIconButton>
                    <DockIconButton aria-label="Previous"><SkipBack /></DockIconButton>
                    <DockIconButton aria-label="Play"><Play /></DockIconButton>
                    <DockIconButton aria-label="Next"><SkipForward /></DockIconButton>
                    <DockIconButton aria-label="Home (2)"><Home /></DockIconButton>
                    <DockIconButton aria-label="Search (2)"><Search /></DockIconButton>
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
                    <DockIconButton aria-label="Home"><Home /></DockIconButton>
                    <DockIconButton aria-label="Search"><Search /></DockIconButton>
                    <DockIconButton aria-label="Add"><Plus /></DockIconButton>
                    <DockIconButton aria-label="Notifications"><Bell /></DockIconButton>
                    <DockIconButton aria-label="Previous"><SkipBack /></DockIconButton>
                    <DockIconButton aria-label="Next"><SkipForward /></DockIconButton>
                    <DockIconButton aria-label="Home (2)"><Home /></DockIconButton>
                    <DockIconButton aria-label="Search (2)"><Search /></DockIconButton>
                    <DockIconButton aria-label="Settings"><Settings /></DockIconButton>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-foreground">
                Background pause/play toggle
            </h2>
            <p class="text-xs text-muted-foreground">
                <code class="rounded bg-muted px-1">&lt;DockBackgroundToggle&gt;</code>
                lets the user pause a running Aurora/GooBlob background — wire it to the
                renderer's <code class="rounded bg-muted px-1">pause()</code>/<code
                    class="rounded bg-muted px-1"
                    >resume()</code
                >. It reflects state via <code class="rounded bg-muted px-1">aria-pressed</code>
                and a Pause↔Play glyph swap, available to all users.
            </p>
            <div class="flex justify-center py-6">
                <GlassDock>
                    <DockBackgroundToggle v-model:paused="bgPaused" />
                    <DockIconButton aria-label="Home"><Home /></DockIconButton>
                    <DockIconButton aria-label="Settings"><Settings /></DockIconButton>
                </GlassDock>
            </div>
            <p class="text-center text-xs text-muted-foreground">
                background: <code class="rounded bg-muted px-1">{{ bgPaused ? "paused" : "running" }}</code>
            </p>
        </section>

        <section class="flex flex-col gap-2 text-sm text-muted-foreground">
            <h2 class="text-sm font-semibold text-foreground">Notes</h2>
            <ul class="list-disc pl-5 space-y-1">
                <li>The dock stays open while a popover or held control inside it is active.</li>
                <li>Pass a <code class="rounded bg-muted px-1">#collapsed</code> slot to choose what the collapsed pill shows.</li>
                <li>Use <code class="rounded bg-muted px-1">DockIconButton</code> for buttons that fit the dock flush.</li>
            </ul>
        </section>
    </StoryPage>
</template>
