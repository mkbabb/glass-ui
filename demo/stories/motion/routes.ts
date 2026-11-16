import { Sparkles } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "motion",
    title: "Motion",
    icon: Sparkles,
    lede: "Springs, scrolling, decks and moving text.",
    routes: [
        { id: "springs", title: "Spring Orchestrator", lede: "Tune a spring and watch its response." },
        { id: "curve-gallery", title: "Motion Lab", lede: "Compare springs and easing curves side by side." },
        { id: "scroll", title: "Scroll Register", lede: "Progress and reveals that follow the page's scroll." },
        { id: "deck", title: "Deck", lede: "A full-screen presentation you page through." },
        { id: "handmark", title: "Hand Mark", lede: "A pen that underlines, strikes, circles and highlights." },
        { id: "text-motion", title: "Text Motion", lede: "Text that types itself and numbers that count." },
    ],
};
