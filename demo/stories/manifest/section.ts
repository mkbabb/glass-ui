import type { LucideIcon } from "@lucide/vue";

/** One page of a section: its path segment, its title and its one-sentence lede. */
export interface RouteRow {
    id: string;
    title: string;
    /** One sentence, at most 16 words, saying what the component is for. */
    lede: string;
    /**
     * The page runs a live canvas of its own (a field in its stage, or the substrate it
     * shows), so the shell's field stays a static ground there. `"card"` when the card
     * runs it too: the shell's field then stays static on the section page and, for a
     * section's first page, on `/`.
     */
    canvas?: "page" | "card";
    /**
     * The page's first screen sets figures or code in the code face, so a navigation to
     * it starts the face's load with its chunks and the face is in hand by its first
     * text layout. A section page whose card for this page shows it does the same, and
     * so does `/` for a section's first page. Elsewhere the face loads when code appears.
     */
    codeFace?: true;
}

/** A section: its landing's title and lede (at most 12 words), its icon, its pages. */
export interface SectionRoutes {
    id: string;
    title: string;
    icon: LucideIcon;
    lede: string;
    routes: readonly RouteRow[];
}
