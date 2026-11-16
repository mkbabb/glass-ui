import { Boxes } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "containers",
    title: "Containers",
    icon: Boxes,
    lede: "Dialogs, sheets, popovers, menus and tooltips.",
    routes: [
        { id: "dialog", title: "Dialog", lede: "A modal plate that asks for a decision." },
        { id: "sheet", title: "Sheet", lede: "A panel that slides in from an edge." },
        { id: "popover", title: "Popover", lede: "A floating panel anchored to its trigger." },
        { id: "dropdown-menu", title: "Menu", lede: "A list of actions, opened from a button or a right press." },
        { id: "tooltip", title: "Tooltip", lede: "A short description of a control." },
        { id: "accordion", title: "Accordion", lede: "Stacked sections that open and close." },
        { id: "expandable-container", title: "Expandable Container", lede: "A panel that grows in place or fills the screen." },
        { id: "command", title: "Command", lede: "Search a list of commands and run one." },
        { id: "configurator", title: "Configurator", lede: "A studio for tuning a live specimen." },
    ],
};
