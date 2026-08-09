// The windowed-sequence substrate's vocabulary — ONE set of names under both the
// presentation deck and the carousel.
//
// THE ONE `[data-state]` VOCABULARY. A member is `active`, `prev`, or `next`; the
// direction is DERIVED from an index comparison and never stored, so a skin that
// does not need direction simply does not read it. Three vocabularies existed for
// this one contract before the fold — `active|prev|next`, `active|parked`,
// `active|inactive` — and the other two die at their owners.

/** The travel axis a sequence pages along. */
export type DeckAxis = "horizontal" | "vertical";

/** The ONE member-state vocabulary. Direction is derived, never stored. */
export type DeckState = "active" | "prev" | "next";

/**
 * One member of a deck manifest. The dark flag and the accessible name live HERE
 * rather than on the rendered node so a reorder cannot desynchronise them from
 * their slide — the reorder-safety ruling that makes the manifest engine-grade.
 */
export interface SlideEntry {
    /** The routable id (the hash-sync fragment, when hash sync is on). */
    id: string;
    /** The accessible name — the live announcement's "…: <name>" tail. */
    title?: string;
    /** Render this member against the dark arm regardless of the page mode. */
    dark?: boolean;
    /** An explicit `aria-label` override when the title is not the spoken name. */
    ariaLabel?: string;
}

/** A deck manifest: the ordered members plus the deck's own accessible name. */
export interface DeckContent {
    /** The deck's accessible name (the region label). */
    title?: string;
    /** The ordered members. */
    slides: readonly SlideEntry[];
}
