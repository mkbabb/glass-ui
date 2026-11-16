import { Shapes } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "display",
    title: "Display",
    icon: Shapes,
    lede: "Buttons, cards, badges and the small parts of a page.",
    routes: [
        { id: "buttons", title: "Buttons", lede: "Commands at four emphases, in neutral and destructive tones." },
        { id: "surface", title: "Surface", lede: "The glass panel every component is built on." },
        { id: "card", title: "Card", lede: "A group of related content on one surface." },
        { id: "badge", title: "Badge", lede: "Short labels for status and metadata." },
        { id: "atoms", title: "Atoms", lede: "Separator, status dot, avatar and the theme toggle." },
        { id: "music-staff", title: "Music Staff", lede: "An engraved staff that plays while content loads." },
    ],
};
