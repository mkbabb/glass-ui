<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref, watch, useTemplateRef } from "vue";
import {
    Home,
    Search,
    Bell,
    Settings,
    Plus,
    Share2,
    Download,
    ChevronDown,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    SlidersHorizontal,
} from "@lucide/vue";
import {
    GlassDock,
    DockControl,
    DockTrigger,
    DockSeparator,
    DockBackgroundToggle,
} from "@glass/components/dock";
import { Slider } from "@glass/components/slider";
// BI.W-OVERLAY-UNION — HoverPopover folded onto <Popover trigger="hover">.
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
} from "@glass/components/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@glass/components/select";
import { Aurora } from "@glass/components/aurora";
import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora";
import DockStage from "./DockStage.vue";

const playing = ref(false);

// The background-toggle section wires the toggle to a real contained Aurora so
// pausing genuinely parks the renderer (not a text readout). `bgAuroraRef` is the
// Aurora instance; the watch drives its exposed pause()/resume().
const bgPaused = ref(false);
const bgAuroraRef = useTemplateRef<{ pause: () => void; resume: () => void }>(
    "bgAuroraRef",
);
watch(bgPaused, (paused) => {
    if (paused) bgAuroraRef.value?.pause();
    else bgAuroraRef.value?.resume();
});
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
        <!-- BI.W-DOCK-SPINE — the REFERENCE SPINE demo. Every dock here rides the
             greenfield three-z-layer plate SPINE (L0 `.dock-plate` clip-path lens off ONE
             `--dock-t` / L1 `.dock-controls` overflow:visible / L2 top-layer). The public
             prop/slot surface is UNCHANGED (MIGRATION: none) — the collapse↔expand,
             always-expanded transport, triggers, slider-hold, wrap, grid, and pause-toggle
             all demonstrate on the new internals; a control hover plate at the dock edge
             now overhangs UN-CLIPPED by construction (UF-C6/C7), and the box no longer
             clips/contains (the triple identity split). -->
        <!-- BA.W-STAGE scope 8/9 (FD-DOCK-1) — the flagship dock demos sit over ONE
             shared, offscreen-paused aurora field (DockStage), replacing the flat
             bg-card/40 panels. Each demo is a transparent `.dock-stage-tile` framed
             slot so the dock floats DIRECTLY over the live field (the BG-2 lesson).
             ONE GL context for the band's decorative staging — the prior per-demo
             collapsible aurora folds INTO the shared field (the pause-toggle keeps
             its OWN functional aurora below, which the toggle genuinely controls). -->
        <!-- BI.W-DOCK-LUMA-SHARE — the 10 per-dock `:background-canvas` bindings COLLAPSE
             onto DockStage's ONE shared per-route backdrop-luminance observer: every staged
             dock inherits `--glass-backdrop-luma` / `--glass-backdrop` / `--glass-ambient-*`
             from the stage scope (the registered inheriting @property cascade) + stands down
             its own getImageData readback (12 → 1). -->
        <DockStage>
        <StorySection heading="Collapsible (hover to expand)" gap="md">
            <p class="text-sm text-muted-foreground">
                The collapsed pill scales up on hover on the same
                <code class="rounded bg-muted px-1">--spring-dock</code> vocabulary the
                expand morph uses, so hover-to-expand reads as one continuous spring.
                The controls cascade in outer-to-inward, reversed on collapse. Under
                <code class="rounded bg-muted px-1">prefers-reduced-motion</code> the
                scale and stagger snap; the state still toggles.
            </p>
            <div
                class="dock-stage-tile flex justify-center rounded-[var(--radius-card)] border border-border/30 p-8"
            >
                <GlassDock class="relative z-10">
                    <!-- Home is a persistent control: it stays visible in both the
                         collapsed and expanded states via the #persistent slot. -->
                    <template #persistent>
                        <DockControl aria-label="Home"><Home /></DockControl>
                    </template>
                    <DockControl aria-label="Search"><Search /></DockControl>
                    <DockSeparator />
                    <DockControl aria-label="Notifications"><Bell /></DockControl>
                    <DockControl aria-label="Settings"><Settings /></DockControl>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection heading="Always expanded — media transport" gap="md">
            <div
                class="dock-stage-tile flex justify-center rounded-[var(--radius-card)] border border-border/30 p-8"
            >
                <GlassDock
                    always-expanded
                >
                    <DockControl aria-label="Previous"><SkipBack /></DockControl>
                    <DockControl
                        :aria-pressed="playing"
                        :aria-label="playing ? 'Pause' : 'Play'"
                        @click="togglePlay"
                    >
                        <Pause v-if="playing" />
                        <Play v-else />
                    </DockControl>
                    <DockControl aria-label="Next"><SkipForward /></DockControl>
                    <DockSeparator />
                    <span
                        class="px-2 text-xs text-muted-foreground tabular-nums max-w-36 truncate"
                    >
                        {{ track }}
                    </span>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection
            heading="Select and dropdown triggers"
            data-testid="dock-trigger-story"
        >
            <div
                class="dock-stage-tile flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-border/30 p-8"
            >
                <GlassDock always-expanded fit-content>
                    <Select v-model="dockView">
                        <DockTrigger for="select"
                            aria-label="Dock view"
                            data-testid="dock-select-trigger"
                        >
                            <span class="text-xs">{{ dockViewLabels[dockView] }}</span>
                            <SelectValue class="sr-only" />
                        </DockTrigger>
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
                        <DockTrigger
                            for="dropdown"
                            data-testid="dock-dropdown-trigger"
                        >
                            <Settings class="h-4 w-4" />
                            <span class="text-xs">{{
                                dockCommandLabels[dockCommand]
                            }}</span>
                            <ChevronDown class="h-3 w-3 opacity-60" />
                        </DockTrigger>
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

                    <DockSeparator />

                    <!-- BD.W-DOCK-CORE (A8 / F-2) — the POPOVER trigger UNIFIED into the
                         dock overlay-trigger family. It composes <DockTrigger for="popover">
                         (the SHARED `.dock-trigger` recipe) so it is byte-identical in
                         geometry/baseline to the Select + Dropdown triggers beside it —
                         the misaligned-popover defect closed by mounting the unified
                         trigger on the SAME surface, not in an unrendered file. -->
                    <Popover>
                        <DockTrigger
                            for="popover"
                            data-testid="dock-popover-trigger"
                            aria-label="Dock info"
                        >
                            <Bell class="h-4 w-4" />
                            <span class="text-xs">Info</span>
                            <ChevronDown class="h-3 w-3 opacity-60" />
                        </DockTrigger>
                        <PopoverContent align="center" class="w-52">
                            <p class="text-xs text-muted-foreground">
                                The popover trigger shares the
                                <code class="rounded bg-muted px-1">.dock-trigger</code>
                                geometry with the select + dropdown — same padding,
                                radius, baseline.
                            </p>
                        </PopoverContent>
                    </Popover>
                </GlassDock>

                <div
                    class="grid gap-1 rounded-lg border border-border/50 bg-background/60 px-3 py-2 text-xs text-muted-foreground sm:grid-cols-2"
                >
                    <p data-testid="dock-select-readout">
                        select =
                        <span class="font-medium text-foreground">{{
                            dockViewLabels[dockView]
                        }}</span>
                    </p>
                    <p data-testid="dock-dropdown-readout">
                        dropdown =
                        <span class="font-medium text-foreground">{{
                            dockCommandLabels[dockCommand]
                        }}</span>
                    </p>
                </div>
            </div>
        </StorySection>

        <StorySection heading="With popover triggers" gap="md">
            <p class="text-sm text-muted-foreground">
                <code class="rounded bg-muted px-1">Popover trigger="hover" keep-dock-open</code>
                pins the parent dock open while the popover is visible. The
                fine-hover branch (reka's HoverCardRoot) handles hover-trigger,
                defer-on-leave, and adaptive side/align collision avoidance.
            </p>
            <div
                class="dock-stage-tile flex justify-center rounded-[var(--radius-card)] border border-border/30 p-8"
            >
                <GlassDock always-expanded>
                    <DockControl aria-label="New"><Plus /></DockControl>

                    <Popover trigger="hover" keep-dock-open>
                        <PopoverTrigger as-child>
                            <DockControl aria-label="Share">
                                <Share2 />
                            </DockControl>
                        </PopoverTrigger>
                        <PopoverContent role="card" side="bottom" align="center" class="w-auto p-1">
                            <div class="flex min-w-44 flex-col gap-1">
                                <p
                                    class="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground"
                                >
                                    Share
                                </p>
                                <button
                                    class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
                                >
                                    Copy link
                                </button>
                                <button
                                    class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
                                >
                                    Email
                                </button>
                                <button
                                    class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
                                >
                                    Embed
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Popover trigger="hover" keep-dock-open>
                        <PopoverTrigger as-child>
                            <DockControl aria-label="Export">
                                <Download />
                            </DockControl>
                        </PopoverTrigger>
                        <PopoverContent role="card" side="bottom" align="end" class="w-auto p-1">
                            <div class="flex min-w-44 flex-col gap-1">
                                <p
                                    class="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground"
                                >
                                    Export
                                </p>
                                <button
                                    class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
                                >
                                    PNG
                                </button>
                                <button
                                    class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
                                >
                                    SVG
                                </button>
                                <button
                                    class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
                                >
                                    PDF
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <DockSeparator />

                    <Popover trigger="hover" keep-dock-open>
                        <PopoverTrigger as-child>
                            <DockControl aria-label="Track">
                                <span class="flex items-center gap-1">
                                    <span class="text-xs">Track</span>
                                    <ChevronDown class="h-3 w-3 opacity-60" />
                                </span>
                            </DockControl>
                        </PopoverTrigger>
                        <PopoverContent role="card" side="bottom" align="center" class="w-auto p-1">
                            <div class="flex min-w-44 flex-col gap-1">
                                <button
                                    v-for="t in tracks"
                                    :key="t"
                                    :class="[
                                        'rounded px-2 py-1.5 text-left text-sm hover:bg-muted',
                                        track === t && 'bg-muted font-medium',
                                    ]"
                                    @click="track = t"
                                >
                                    {{ t }}
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection
            heading="Slider in dock — the keep-dock-open hold"
            data-testid="dock-slider-section"
        >
            <p class="text-sm text-muted-foreground">
                A <code class="rounded bg-muted px-1">&lt;Slider&gt;</code> descendant
                of a dock holds the dock open while the user drags (the
                <code class="rounded bg-muted px-1">dockKeepOpen</code>
                token), and reflects the dock's held state via
                <code class="rounded bg-muted px-1">data-held</code> on its root. Drag a
                knob: the thumb halo intensifies and the dock substrate tier-shades up
                while held; release returns both to default. The contract is
                bidirectional and pointer-anchored — it lives on the API surface, not
                the recipe.
            </p>
            <div
                class="dock-stage-tile flex justify-center rounded-[var(--radius-card)] border border-border/30 p-8"
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
                    <DockControl aria-label="Volume"><Volume2 /></DockControl>
                    <div class="flex w-44 items-center px-2">
                        <Slider
                            v-model="volume"
                            :max="100"
                            :step="1"
                            aria-label="Volume"
                        />
                    </div>
                    <DockSeparator />
                    <DockControl aria-label="Mix"
                        ><SlidersHorizontal
                    /></DockControl>
                    <div class="flex w-44 items-center px-2">
                        <Slider v-model="mix" :max="100" :step="1" aria-label="Mix" />
                    </div>
                    <template #collapsed>
                        <SlidersHorizontal class="h-4 w-4" />
                    </template>
                </GlassDock>
            </div>
            <p class="text-xs text-muted-foreground">
                Hover to expand, then press-and-hold a thumb and move the pointer OFF
                the dock: the dock stays open through the held drag and re-collapses
                only after release. Either drag holds the dock open, and both halos
                intensify when either is dragged since both read the dock's shared held
                state.
            </p>
        </StorySection>

        <StorySection heading="Tap and click land where you aimed" gap="md">
            <p class="text-sm text-muted-foreground">
                A tap on the collapsed pill, or a click during the hover-expand morph,
                must land on the control it was AIMED at — never on whatever the layer
                swap moves under the pointer. The summary control here is a Settings
                gear; on expand a different control occupies its old coordinate. The
                dock scopes the pass-through to the pressed element's identity, so the
                gear tap can never activate the swapped-in control under the same point.
            </p>
            <div
                class="dock-stage-tile flex justify-center rounded-[var(--radius-card)] border border-border/30 p-8"
                data-testid="dock-tap-capture-frame"
            >
                <!-- data-testid="dock-tap-capture" — the deterministic R5-TAP (R5-3)
                     click-integrity capture surface (a demo-private test affordance,
                     same pattern as dock-capture; a plain root data attr, NOT the
                     container-name prop). It mirrors the slides deck's nav-pattern: a
                     collapsed gear-SUMMARY control whose post-expand coordinate hosts a
                     DIFFERENT activatable control (Skip), so the identity-scoped
                     pass-through is genuinely exercised — a tap/click that races the
                     morph and lands on the swapped-in control by coordinate is the
                     defect the guard catches. The short :collapse-delay keeps the
                     collapse baseline fast. No behavioral change. -->
                <GlassDock :collapse-delay="600" data-testid="dock-tap-capture">
                    <DockControl aria-label="Skip back"><SkipBack /></DockControl>
                    <DockControl aria-label="Previous"
                        ><ChevronDown
                    /></DockControl>
                    <DockControl aria-label="Play"><Play /></DockControl>
                    <DockControl aria-label="Skip forward"
                        ><SkipForward
                    /></DockControl>
                    <DockControl aria-label="Share"><Share2 /></DockControl>
                    <template #collapsed>
                        <DockControl aria-label="Settings"
                            ><Settings
                        /></DockControl>
                    </template>
                </GlassDock>
            </div>
            <p class="text-xs text-muted-foreground">
                The settled click (after the morph) reaches the control normally — only
                the racing, identity-mismatched click is swallowed.
            </p>
        </StorySection>

        <StorySection heading="Menus inside a dock teleport out" gap="md">
            <p class="text-sm text-muted-foreground">
                A dropdown or menu mounted inside a dock MUST be wired into the dock's
                <code class="rounded bg-muted px-1">keepOpen</code> +
                <code class="rounded bg-muted px-1">data-glass-dock-portal</code>
                teleport contract — the same contract the
                <code class="rounded bg-muted px-1">DockTrigger</code> /
                <code class="rounded bg-muted px-1">DockTrigger</code> /
                <code class="rounded bg-muted px-1">Popover trigger="hover" keep-dock-open</code>
                sections above already ride. This is Apple's navigation-layer /
                no-glass-on-glass rule made structural: glass floats only in the
                navigation/overlay band and never nests in glass (stacked blur muddies,
                the rim doubles), so a dock-hosted menu TELEPORTS OUT to its own
                sampling region rather than painting a second glass plate inside the
                dock's.
            </p>
            <p class="text-xs text-muted-foreground">
                The canonical mis-wire (the keyframes D9 break): a dropdown mounted
                OUTSIDE the
                <code class="rounded bg-muted px-1">keepOpen</code>+portal contract
                drops out of the dock the instant the trigger fires — it paints its own
                glass plate stacked over the dock's and the dock idle-collapses out from
                under it. Reach for the dock-native trigger primitives (which bundle the
                contract), not a raw
                <code class="rounded bg-muted px-1">&lt;DropdownMenu&gt;</code> child.
            </p>
        </StorySection>

        <StorySection heading="Overflow wrap — content reflows to multiple rows" gap="md">
            <p class="text-xs text-muted-foreground">
                <code class="rounded bg-muted px-1">overflow="wrap"</code> reflows the
                row to multiple rows by INTRINSIC flex-wrap whenever the content's
                natural width exceeds the dock's inline cap (the dock shrink-wraps to
                content and
                <code class="rounded bg-muted px-1"
                    >max-inline-size: var(--dock-max-inline-size)</code
                >
                caps it) — at ANY viewport width, no breakpoint. The wrapped multi-row
                silhouette lifts onto the card/floating shadow tier and a finite
                <code class="rounded bg-muted px-1">--dock-card-radius</code> corner as
                it expands.
            </p>
            <!-- Host caps --dock-max-inline-size at 28rem so the 14-control row overflows the cap
                 and wraps ON-SCREEN at desktop (the consumer-override the cap token exposes). -->
            <div class="flex justify-center py-6">
                <GlassDock
                    overflow="wrap"
                    always-expanded
                    style="--dock-max-inline-size: 28rem"
                >
                    <DockControl aria-label="Home"><Home /></DockControl>
                    <DockControl aria-label="Search"><Search /></DockControl>
                    <DockControl aria-label="Add"><Plus /></DockControl>
                    <DockControl aria-label="Notifications"><Bell /></DockControl>
                    <DockControl aria-label="Share"><Share2 /></DockControl>
                    <DockControl aria-label="Download"><Download /></DockControl>
                    <DockControl aria-label="Settings"><Settings /></DockControl>
                    <DockControl aria-label="Previous"><SkipBack /></DockControl>
                    <DockControl aria-label="Play"><Play /></DockControl>
                    <DockControl aria-label="Next"><SkipForward /></DockControl>
                    <DockControl aria-label="Home (2)"><Home /></DockControl>
                    <DockControl aria-label="Search (2)"><Search /></DockControl>
                    <DockControl aria-label="Add (2)"><Plus /></DockControl>
                    <DockControl aria-label="Settings (2)"
                        ><Settings
                    /></DockControl>
                </GlassDock>
            </div>
            <p class="text-xs text-muted-foreground">
                Collapsible wrap dock — hover to expand. Collapsed it is a single-row
                stadium pill (flat
                <code class="rounded bg-muted px-1">--shadow-dock</code> glow); expanded
                it wraps to rows AND morphs corner + elevation onto the card tier in
                lockstep on the one dock spring (no jump-cut).
            </p>
            <div class="flex justify-center py-6">
                <GlassDock overflow="wrap" style="--dock-max-inline-size: 22rem">
                    <DockControl aria-label="Home"><Home /></DockControl>
                    <DockControl aria-label="Search"><Search /></DockControl>
                    <DockControl aria-label="Add"><Plus /></DockControl>
                    <DockControl aria-label="Notifications"><Bell /></DockControl>
                    <DockControl aria-label="Share"><Share2 /></DockControl>
                    <DockControl aria-label="Download"><Download /></DockControl>
                    <DockControl aria-label="Settings"><Settings /></DockControl>
                    <DockControl aria-label="Previous"><SkipBack /></DockControl>
                    <DockControl aria-label="Play"><Play /></DockControl>
                    <DockControl aria-label="Next"><SkipForward /></DockControl>
                    <DockControl aria-label="Home (2)"><Home /></DockControl>
                    <DockControl aria-label="Search (2)"><Search /></DockControl>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection heading="Big dock — card shell + tile grid" gap="md">
            <p class="text-xs text-muted-foreground">
                <code class="rounded bg-muted px-1">shape="card"</code> gives a finite
                concentric card radius (not a stadium pill);
                <code class="rounded bg-muted px-1">layout="grid"</code> lays children
                out as a self-wrapping 2D tile grid for large multi-row docks (<code
                    class="rounded bg-muted px-1"
                    >alwaysExpanded</code
                >
                by contract — no width morph).
            </p>
            <div class="flex justify-center py-6">
                <GlassDock shape="card" layout="grid" class="w-80">
                    <DockControl aria-label="Home"><Home /></DockControl>
                    <DockControl aria-label="Search"><Search /></DockControl>
                    <DockControl aria-label="Add"><Plus /></DockControl>
                    <DockControl aria-label="Notifications"><Bell /></DockControl>
                    <DockControl aria-label="Previous"><SkipBack /></DockControl>
                    <DockControl aria-label="Next"><SkipForward /></DockControl>
                    <DockControl aria-label="Home (2)"><Home /></DockControl>
                    <DockControl aria-label="Search (2)"><Search /></DockControl>
                    <DockControl aria-label="Settings"><Settings /></DockControl>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection heading="Background pause/play toggle" gap="md">
            <p class="text-xs text-muted-foreground">
                <code class="rounded bg-muted px-1">&lt;DockBackgroundToggle&gt;</code>
                lets the user pause a running Aurora/GooBlob background — wire it to the
                renderer's <code class="rounded bg-muted px-1">pause()</code>/<code
                    class="rounded bg-muted px-1"
                    >resume()</code
                >. It reflects state via
                <code class="rounded bg-muted px-1">aria-pressed</code>
                and a Pause↔Play glyph swap, available to all users.
            </p>
            <!-- The toggle controls a real contained Aurora: pausing genuinely parks
                 the renderer's rAF. The dock is collapsible — the collapsed slot shows
                 the live Pause/Play glyph so the control reads in both states
                 (expanded row + the collapsed circle). -->
            <div
                class="relative flex justify-center overflow-hidden rounded-[var(--radius-card)] border border-border/40 p-8"
            >
                <Aurora
                    ref="bgAuroraRef"
                    :config="DEFAULT_AURORA_CONFIG"
                    :opacity-ceiling="0.4"
                    class="absolute inset-0"
                    aria-hidden="true"
                />
                <GlassDock class="relative z-10">
                    <DockBackgroundToggle v-model:paused="bgPaused" />
                    <DockControl aria-label="Home"><Home /></DockControl>
                    <DockControl aria-label="Settings"><Settings /></DockControl>
                    <!-- The collapsed pill mirrors the toggle's live state — Play when
                         paused (the action it offers), Pause when running. -->
                    <template #collapsed>
                        <Play v-if="bgPaused" class="h-4 w-4" aria-hidden="true" />
                        <Pause v-else class="h-4 w-4" aria-hidden="true" />
                    </template>
                </GlassDock>
            </div>
            <p class="text-center text-xs text-muted-foreground">
                background:
                <code class="rounded bg-muted px-1">{{
                    bgPaused ? "paused (rAF parked)" : "running"
                }}</code>
            </p>
        </StorySection>

        <StorySection heading="Notes" gap="sm" class="text-sm text-muted-foreground">
            <ul class="list-disc pl-5 space-y-1">
                <li>
                    The dock stays open while a popover or held control inside it is
                    active.
                </li>
                <li>
                    Provide collapsed-pill content to choose what the dock shows once
                    it folds.
                </li>
                <li>
                    Use <code class="rounded bg-muted px-1">DockControl</code> for
                    buttons that fit the dock flush.
                </li>
            </ul>
        </StorySection>
        </DockStage>
    </StoryPage>
</template>

<style scoped>
/* BA.W-STAGE scope 9 — the transparent demo tile. NO opaque bg-card plate; the
   dock floats DIRECTLY over the shared DockStage aurora field (the BG-2 lesson),
   framed by a faint hairline only. */
.dock-stage-tile {
    background: transparent;
}
</style>
