import { PanelBottom } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "dock",
    title: "Dock",
    icon: PanelBottom,
    lede: "The dock, as the apps build it.",
    routes: [
        { id: "nav", title: "Navigation", lede: "Page tabs with a few tools at the end, fixed to an edge." },
        { id: "chrome", title: "App Chrome", lede: "The app's top bar, folded to a seal when idle." },
        { id: "rail", title: "Section Rail", lede: "Sections in a column at the start edge, folding to its crest and foot." },
        { id: "figure-tools", title: "Figure Tools", lede: "Each figure's tools open on a press, so a passing pointer opens none." },
        { id: "dials", title: "Dial Bar", lede: "A figure's filters in one capsule: two dials and a period stepper." },
        { id: "canvas-tools", title: "Canvas Tools", lede: "Tools floating over a canvas, the primary one in reach when folded." },
        { id: "transport", title: "Transport", lede: "Play stays in reach; speed and reset open beside it." },
        { id: "pager", title: "Pager", lede: "Previous, position and next, or a wizard's steps and its next action." },
        { id: "corner-controls", title: "Corner Controls", lede: "A page's own actions, kept in one corner." },
        { id: "action-row", title: "Action Row", lede: "A short row of actions in a pane's header that never folds." },
    ],
};
