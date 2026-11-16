import { LayoutDashboard } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "compositions",
    title: "Compositions",
    icon: LayoutDashboard,
    lede: "Whole scenes built from the components.",
    routes: [
        { id: "auth-shell", title: "Auth Shell", lede: "A sign-in screen." },
        { id: "settings", title: "Settings", lede: "A settings page." },
        { id: "empty-states", title: "Empty States", lede: "What a page shows before it has anything." },
        { id: "form-validation", title: "Form Validation", lede: "A form that checks its fields as you go." },
        { id: "chassis", title: "Story Chassis", lede: "How this site's pages are built." },
    ],
};
