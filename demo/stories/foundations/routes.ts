import { Compass } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "foundations",
    title: "Foundations",
    icon: Compass,
    lede: "The colours, type, corners and glass every component is built from.",
    routes: [
        { id: "colors", title: "Colors", lede: "The warm palette every component reads its colours from." },
        { id: "typography", title: "Typography", lede: "The type scale, set in the two brand faces." },
        { id: "radii", title: "Radii", lede: "The corner rungs, from a slight round to a full pill." },
        { id: "shadows", title: "Shadows", lede: "The three elevations a surface can sit at." },
        { id: "motion", title: "Motion", lede: "The easings and springs that time every change." },
        { id: "paper-glass", title: "Paper & Glass", lede: "The glass tiers, laid over paper and over colour." },
        { id: "icons", title: "Icons", lede: "The icon set at its sizes." },
        { id: "surface-tints", title: "Surface Tints", lede: "The tint scale that colours glass surfaces." },
        { id: "overlays-scrims", title: "Overlays & Scrims", lede: "The scrims that dim a page behind a dialog." },
        { id: "chart-palette", title: "Chart Palette", lede: "The colours charts and plots draw with." },
        { id: "css-utilities", title: "CSS Utilities", lede: "The hover scale utility and how a page overrides it." },
    ],
};
