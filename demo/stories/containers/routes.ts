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
        { id: "dropdown-menu", title: "Dropdown Menu", lede: "A list of actions opened from a button." },
        { id: "context-menu", title: "Context Menu", lede: "The same menu, opened by a right press." },
        { id: "hover-card", title: "Hover Card", lede: "A preview that opens on hover or focus." },
        { id: "tooltip", title: "Tooltip", lede: "A short description of a control." },
        { id: "accordion", title: "Accordion", lede: "Stacked sections that open and close." },
        { id: "collapsible", title: "Collapsible", lede: "One section that opens and closes." },
        { id: "hover-popover", title: "Hover Popover", lede: "A floating label that opens on hover." },
        { id: "expandable-container", title: "Expandable Container", lede: "A panel that grows in place or fills the screen." },
        { id: "command", title: "Command Palette", lede: "Search a list of commands and run one." },
        { id: "configurator", title: "Configurator", lede: "A studio for tuning a live specimen." },
    ],
};
