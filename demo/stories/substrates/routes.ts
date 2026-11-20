import { Droplet } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "substrates",
    title: "Substrates",
    icon: Droplet,
    lede: "Live fields for glass to float over.",
    routes: [
        { id: "aurora", title: "Aurora", lede: "A painted gradient field that drifts slowly.", canvas: "card" },
        { id: "blob", title: "Blob", lede: "A soft droplet that answers the pointer.", canvas: "card" },
        { id: "constellation", title: "Constellation", lede: "A drifting lattice of points and links.", canvas: "card" },
        { id: "fourier-field", title: "Fourier Field", lede: "Draws a curve by summing rotating circles.", canvas: "card" },
    ],
};
