import { Navigation } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "navigation",
    title: "Navigation",
    icon: Navigation,
    lede: "Tabs, carousels, pager dots and a contents list.",
    routes: [
        { id: "tabs", title: "Tabs", lede: "Switch between views in one place." },
        { id: "carousel", title: "Carousel", lede: "Slides you drag or step through." },
        { id: "pager-dots", title: "Pager Dots", lede: "Dots that show and set the current page." },
        { id: "toc-tracking", title: "ToC Tracking", lede: "A contents list that follows the section you are reading." },
    ],
};
