import { PanelBottom } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "dock",
    title: "Dock",
    icon: PanelBottom,
    lede: "The dock, as the apps build it.",
    routes: [
        { id: "overview", title: "Overview", lede: "A dock that folds to a pill and opens on demand." },
        { id: "layers", title: "Dock Layers", lede: "A dock that swaps between named sets of controls." },
        { id: "vertical", title: "Vertical Dock", lede: "A dock laid out as a column." },
        { id: "sections", title: "Dock Sections", lede: "Groups of seats parted by separators." },
        { id: "controls", title: "Dock Controls", lede: "The seats a dock holds: icons, tabs and menus." },
        { id: "overflow", title: "Dock Overflow", lede: "A dock whose seats scroll when they outgrow it." },
        { id: "cta-receive", title: "CTA → Dock Morph", lede: "A button that flies into a dock seat." },
        { id: "dock-search", title: "Dock Search", lede: "A dock that opens into a search field." },
    ],
};
