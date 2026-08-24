<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { computed, ref } from "vue";
import {
    Home,
    Search,
    Image as ImageIcon,
    Music,
    Video,
    FileText,
    Map as MapIcon,
    Camera,
    Cloud,
    Mail,
    Phone,
    Settings,
} from "@lucide/vue";
import { GlassDock, DockControl } from "@glass/components/dock";
import { useSelectionGroup } from "@glass/composables/motion/core";
import DockStage from "./_frame/DockStage.vue";

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

</script>

<template>
    <StoryPage>
        <StorySection heading="Native scroll track — scroll-into-view on select">
            <DockStage>
                <GlassDock
                    :collapse="false"
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
    </StoryPage>
</template>
