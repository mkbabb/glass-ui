<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { computed, ref, useTemplateRef } from "vue";
import {
    Home,
    Search,
    Layers,
    Package,
    Bell,
    Star,
    Image as ImageIcon,
    Music,
    Video,
    FileText,
    Map as MapIcon,
    Camera,
    Cloud,
    Compass,
    Heart,
    Mail,
    Phone,
    Settings,
} from "@lucide/vue";
import { GlassDock, DockControl } from "@glass/components/dock";
import { useSelectionGroup } from "@glass/composables/motion/core";
import { useDockFisheye } from "@glass/components/dock/composables/useDockFisheye";
import DockStage from "./_frame/DockStage.vue";

// BI.W-DOCK-OVERFLOW — the overflow-feel reference. The native scroll track (the
// UNIVERSAL FLOOR) side-by-side with the pure-CSS Gaussian fisheye (the EXCLUSIVE-mode
// enhancement, iff the row FITS). They are NEVER composed (PASS-4B ruling 1).

// ── Section 1 — the native scroll TRACK + scrollIntoView recenter ──
//
// A narrow-capped dock whose control run exceeds the cap → the active full layer becomes
// the native inline scroll port (overflow-x: auto), the FadingScroll edge mask feathers
// the clipped edges, and `useSelectionGroup`'s select fires scrollIntoView so a control
// past the fold recenters itself (with the scroll-padding-inline gutter).
interface Item {
    value: string;
    label: string;
    icon: typeof Home;
}
const many: readonly Item[] = [
    { value: "home", label: "Home", icon: Home },
    { value: "search", label: "Search", icon: Search },
    { value: "images", label: "Images", icon: ImageIcon },
    { value: "music", label: "Music", icon: Music },
    { value: "video", label: "Video", icon: Video },
    { value: "docs", label: "Docs", icon: FileText },
    { value: "maps", label: "Maps", icon: MapIcon },
    { value: "camera", label: "Camera", icon: Camera },
    { value: "cloud", label: "Cloud", icon: Cloud },
    { value: "mail", label: "Mail", icon: Mail },
    { value: "phone", label: "Phone", icon: Phone },
    { value: "settings", label: "Settings", icon: Settings },
];
const active = ref<string>("home");
const scrollRowRef = ref<HTMLElement | null>(null);
const scrollBtnRefs = ref<HTMLElement[]>([]);
const scrollSel = useSelectionGroup<Item>({
    options: computed(() => [...many]),
    model: active,
    mode: "single",
    role: "radiogroup",
    containerRef: scrollRowRef,
    buttonRefs: scrollBtnRefs,
});

// ── Section 2 — the fits-branch pure-CSS Gaussian FISHEYE ──
//
// A wide dock whose 15 controls FIT the cap → NO scroll. The opt-in `data-dock-fisheye`
// arms the enhancement; `useDockFisheye` writes the ONE `--dock-px` per-frame scalar and
// each item's layout-time `--x`, and the pure-CSS Gaussian (fisheye.css) magnifies the
// controls under the pointer. Transform/scale-ONLY — the hit cell holds its ≥44px floor.
const fifteen = [
    Home, Search, Layers, Package, Bell, Star, ImageIcon, Music,
    Video, FileText, MapIcon, Camera, Cloud, Compass, Heart,
];
const fisheyeComp = useTemplateRef<{ $el: HTMLElement } | null>("fisheyeComp");
const fisheyeDockEl = computed<HTMLElement | null>(
    () => fisheyeComp.value?.$el ?? null,
);
// The enhancement is opt-in + PARKED-until-DEVICE in the core dock (fisheye ships as the
// universal-floor scroll track everywhere; its default-ON adoption rides the visible-Metal
// 60fps verdict, W-DOCK-DEVICE). Here the demo wires it explicitly to exercise the sweep.
useDockFisheye(fisheyeDockEl);
</script>

<template>
    <StoryPage>
        <StorySection heading="Native scroll track — scroll-into-view on select">
            <DockStage>
                <GlassDock
                    always-expanded
                    aria-label="Scrollable app strip"
                    :style="{ '--dock-max-inline-size': '22rem' }"
                >
                    <div
                        ref="scrollRowRef"
                        role="radiogroup"
                        aria-label="Scrollable app strip"
                        class="flex items-center gap-1"
                        @keydown="scrollSel.onKeydown"
                    >
                        <DockControl
                            v-for="(item, idx) in many"
                            :key="item.value"
                            :ref="(el: any) => { if (el?.$el) scrollBtnRefs[idx] = el.$el as HTMLElement }"
                            :active="scrollSel.isSelected(item.value)"
                            :tabindex="scrollSel.rovingTabindex(idx)"
                            v-bind="scrollSel.itemAttrs(item.value)"
                            :aria-label="item.label"
                            @click="scrollSel.select(item.value, idx)"
                        >
                            <component :is="item.icon" />
                        </DockControl>
                    </div>
                </GlassDock>
            </DockStage>
            <p class="text-small text-muted-foreground mt-3">
                Selected: <strong>{{ active }}</strong>. The row exceeds the cap, so the
                active layer is a native scroll port — the edges feather (FadingScroll),
                and clicking a control past the fold recenters it into view
                (scrollIntoView + the scroll-padding-inline gutter). Arrow keys rove;
                Home/End jump. The cross axis is honestly visible, so a flush item's focus
                ring renders whole at both edges.
            </p>
        </StorySection>

        <StorySection heading="Fisheye — the fits-branch magnify (exclusive mode)">
            <DockStage>
                <GlassDock
                    ref="fisheyeComp"
                    always-expanded
                    data-dock-fisheye
                    aria-label="Fisheye dock"
                >
                    <DockControl
                        v-for="(icon, idx) in fifteen"
                        :key="idx"
                        :aria-label="`Item ${idx + 1}`"
                    >
                        <component :is="icon" />
                    </DockControl>
                </GlassDock>
            </DockStage>
            <p class="text-small text-muted-foreground mt-3">
                Fifteen controls that FIT — so there is no scroll, and the pointer-driven
                Gaussian fisheye magnifies the controls under the cursor (the macOS-dock
                loupe). It engages IFF the row fits: a scrollable row runs native scroll
                with fisheye OFF (never composed). The magnify is transform-only, so the
                hit cell keeps its ≥44px touch floor; coarse pointer / reduced-motion →
                flat.
            </p>
        </StorySection>
    </StoryPage>
</template>
