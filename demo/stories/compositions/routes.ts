import { LayoutDashboard } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "compositions",
    title: "Compositions",
    icon: LayoutDashboard,
    lede: "Whole scenes built from the components.",
    routes: [
        { id: "auth-shell", title: "Auth Shell", lede: "A sign-in screen beside a brand field.", canvas: "card" },
        { id: "settings", title: "Settings", lede: "A settings panel in three tabs." },
        { id: "empty-states", title: "Empty States", lede: "What a view shows before it has anything." },
    ],
};
