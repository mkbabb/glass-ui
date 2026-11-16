import type { LucideIcon } from "@lucide/vue";

/** One page of a section: its path segment, its title and its one-sentence lede. */
export interface RouteRow {
    id: string;
    title: string;
    /** One sentence, at most 16 words, saying what the component is for. */
    lede: string;
}

/** A section: its landing's title and lede (at most 12 words), its icon, its pages. */
export interface SectionRoutes {
    id: string;
    title: string;
    icon: LucideIcon;
    lede: string;
    routes: readonly RouteRow[];
}
