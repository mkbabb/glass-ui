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
        { id: "radii", title: "Radii", lede: "The corner sizes, from a slight round to a full pill." },
        { id: "shadows", title: "Shadows", lede: "The three elevations a surface can sit at." },
        { id: "paper-glass", title: "Paper & Glass", lede: "The glass tiers, laid over paper and over colour.", canvas: "page" },
        { id: "icons", title: "Icons", lede: "The icon set at its sizes." },
    ],
};
