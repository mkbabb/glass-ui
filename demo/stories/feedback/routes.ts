import { Bell } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "feedback",
    title: "Feedback",
    icon: Bell,
    lede: "Alerts, toasts, progress and skeletons.",
    routes: [
        { id: "alert", title: "Alert", lede: "A message that needs attention now." },
        { id: "toast", title: "Toast", lede: "A brief message that comes and goes." },
        { id: "progress", title: "Progress", lede: "How far a task has run." },
        { id: "skeleton", title: "Skeleton", lede: "Placeholders shown while content loads." },
    ],
};
