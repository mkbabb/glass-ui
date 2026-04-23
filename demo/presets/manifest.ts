// demo/presets/manifest.ts — authoritative list of available demo presets.
// The library's own tokens are the "default" preset. "neutral" is a single
// contrasting preset whose CSS lives at `demo/presets/neutral.css` (added by
// W1-D). At runtime the configurator toggles a <link rel="stylesheet"> that
// points at `cssHref` — null means the library defaults apply unchanged.

export interface PresetDef {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly cssHref: string | null;
}

export const PRESETS: readonly PresetDef[] = [
    {
        id: "default",
        label: "Glass-UI default",
        description: "Warm cream, Computer Modern, cartoon shadows.",
        cssHref: null,
    },
    {
        id: "neutral",
        label: "Neutral",
        description: "Muted, sans-serif, no cartoon shadows.",
        cssHref: new URL("./neutral.css", import.meta.url).href,
    },
] as const;

export type PresetId = (typeof PRESETS)[number]["id"];
