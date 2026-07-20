export type MenuRowIndicator = "none" | "start";

const MENU_ROW_BASE_CLASS = [
    "interactive-item glass-menu-row",
    "relative flex w-full cursor-default select-none items-center py-1.5",
    "text-dropdown outline-none",
    "data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled",
].join(" ");

export function menuRowClass(indicator: MenuRowIndicator = "none"): string {
    return `${MENU_ROW_BASE_CLASS} ${indicator === "start" ? "pl-7 pr-2" : "px-2"}`;
}
