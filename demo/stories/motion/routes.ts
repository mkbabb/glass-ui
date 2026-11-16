import { Sparkles } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "motion",
    title: "Motion",
    icon: Sparkles,
    lede: "Springs, scrolling, decks and moving text.",
    routes: [
        { id: "springs", title: "Springs", lede: "Tune a curve and watch it move." },
        { id: "scroll", title: "Scroll Progress", lede: "Progress and reveals that follow a scrolling column." },
        { id: "deck", title: "Deck", lede: "A presentation you page through by key, dot or arrow." },
        { id: "handmark", title: "Hand Mark", lede: "A pen that underlines, strikes, circles and highlights." },
        { id: "text-motion", title: "Text Motion", lede: "Text that types itself and numbers that count." },
    ],
};
