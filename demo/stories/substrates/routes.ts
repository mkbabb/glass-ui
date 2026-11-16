import { Droplet } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "substrates",
    title: "Substrates",
    icon: Droplet,
    lede: "Live fields for glass to float over.",
    routes: [
        { id: "aurora", title: "Aurora", lede: "A painted gradient field that drifts slowly." },
        { id: "blob", title: "Blob", lede: "A soft droplet that answers the pointer." },
        { id: "constellation", title: "Constellation", lede: "A drifting lattice of points and links." },
        { id: "fourier-field", title: "Fourier Field", lede: "A curve drawn by summing circles, one term at a time." },
        { id: "glass-material", title: "Glass Material", lede: "Glass plates over a live field." },
        { id: "glass-panel", title: "Glass Panel", lede: "The glass tiers as panels." },
    ],
};
