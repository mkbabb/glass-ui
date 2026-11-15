<script setup lang="ts">
import { Blob } from "@glass/components/blob";
import { BLOB_CONFIG_DEFAULTS } from "@glass/components/blob";
import { Card } from "@glass/components/card";

const params = new URLSearchParams(location.search);
const dark = params.get("theme") === "dark";
const still = params.get("still") === "1";
const lag = params.get("lag");
const paused = params.get("paused") === "1";
const tier = (params.get("tier") ?? "quiet") as "quiet" | "resting" | "floating";
const blobParam = params.get("blob");
// ?lap=spec keeps W-B.19's caption geometry (lapping the frame by 1.5rem of its text).
const lapSpec = params.get("lap") === "spec";

// The figure's tone carries the front run's contrast (R-5). The Blob's body paints its
// config's palette stops, not its `color` (which seeds the satellites' PRNG and the
// wrapper's --blob-color), so the tone per theme is written as stops: a light body
// under dark ink, a deep one under light ink. ?blob=default keeps the stock stops.
const STOPS = {
    light: ["oklch(0.84 0.06 250)", "oklch(0.88 0.05 244)", "oklch(0.93 0.035 238)"],
    dark: ["oklch(0.30 0.09 268)", "oklch(0.34 0.10 262)", "oklch(0.38 0.09 256)"],
};
const stops = blobParam === "default" ? BLOB_CONFIG_DEFAULTS.color.paletteStops : STOPS[dark ? "dark" : "light"];
const blobColor = stops[0];
const blobConfig = {
    ...BLOB_CONFIG_DEFAULTS,
    color: { ...BLOB_CONFIG_DEFAULTS.color, paletteStops: stops, satelliteColors: stops.slice(1) },
};
const sceneStyle = lag ? { "--depth-lag": lag } : undefined;

// The stand-in instrument (glass ships none): a ring whose arc is the value.
const mbps = 412;
const sweep = Math.min(mbps / 1000, 1);
const R = 46;
const C = 2 * Math.PI * R;
</script>

<template>
    <main class="page" :class="{ still }">
        <!-- 1. A hero title behind and in front of a Blob. -->
        <header class="depth hero" :style="sceneStyle">
            <h1 class="hero-title">
                <!-- The space is content: Vue condenses whitespace between elements, so
                     it is written out, and the heading's name stays "Liquid glass". -->
                <span data-depth="behind">Liquid</span>{{ " " }}<span data-depth="front">glass</span>
            </h1>
            <Blob
                data-depth="figure"
                data-depth-lag
                class="hero-blob"
                :color="blobColor"
                :config="blobConfig"
                :paused="paused"
            />
        </header>

        <section class="prose">
            <p>
                Body text sits at the page's own rate and takes no depth. A scene is one
                picture: a run of text behind, one figure, a run in front. The eye reads
                which is nearer from which covers which.
            </p>
            <p>
                One layer per scene may trail the page as it scrolls, by an eighth. It is the
                figure or the picture inside the figure's window, and never the words.
            </p>
            <p>
                Under reduced motion the travel stops and the cover stays. Nothing is drawn
                twice and nothing is masked, so each string is read once and selected once.
            </p>
        </section>

        <!-- 2. A figure with its caption in a Card. -->
        <figure class="depth plate-figure" :style="sceneStyle">
            <div data-depth="figure" class="frame">
                <img
                    data-depth-lag="within"
                    src="./picture.jpg"
                    alt="Folds of a satin sheet, slate blue above and sand below."
                    width="1200"
                    height="1200"
                />
            </div>
            <Card as="figcaption" data-depth="front" :tier="tier" class="caption" :class="{ 'lap-spec': lapSpec }">
                The picture trails inside its frame; the frame and this caption hold still.
            </Card>
        </figure>

        <section class="prose">
            <p>
                A figure and its caption are one subject, so the caption may lap the figure's
                edge. The picture shows through the plate, frosted by the plate's own blur.
            </p>
            <p>
                A stage and its readout are one subject too. The value being read is in front
                of everything in its scene, whole, at every moment.
            </p>
        </section>

        <!-- 3. A stage numeral and a dial. -->
        <section class="depth stage" :style="sceneStyle" aria-labelledby="stage-word">
            <h2 id="stage-word" data-depth="behind" class="stage-word">download</h2>
            <svg data-depth="figure" class="dial" viewBox="0 0 100 100" aria-hidden="true">
                <circle class="dial-track" cx="50" cy="50" :r="R" />
                <circle
                    class="dial-arc"
                    cx="50"
                    cy="50"
                    :r="R"
                    :stroke-dasharray="`${C * sweep} ${C}`"
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <output data-depth="front" class="stage-value">{{ mbps }}<small>Mbps</small></output>
        </section>

        <section class="prose">
            <p>
                A stage that fills a fixed view does not scroll, so nothing in it trails. On a
                page that scrolls, the instrument may take the lag; here it does not.
            </p>
            <p>The page ends on body text, so no scene's travel changes its height.</p>
        </section>
    </main>
</template>

<style>
.page {
    color: var(--foreground);
    padding-block-end: 30vh;
}

.prose {
    max-inline-size: 36rem;
    margin: 0 auto;
    padding: 30vh 1rem;
    font-size: 1.0625rem;
    line-height: 1.6;
}
.prose p + p {
    margin-block-start: 1em;
}

/* The still twin: the reduced-motion form, without the system setting. */
.still .depth {
    --depth-lag: 0;
}
.still [data-depth-lag] {
    animation: none !important;
}

/* 1 */
.hero {
    min-block-size: 100svh;
    place-items: center;
}
.hero-title {
    place-self: center;
    margin: 0;
    font-size: 17cqi;
    line-height: 0.9;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-align: center;
}
.hero-title > span {
    display: block;
}
.hero-blob {
    place-self: center;
    inline-size: 34cqi;
}

/* 2 */
.plate-figure {
    max-inline-size: min(44rem, 100% - 2rem);
    margin: 0 auto;
}
.frame {
    aspect-ratio: 4 / 3;
    border-radius: var(--radius-card, 1.25rem);
}
/* The plate laps the frame by its own top padding: the plate is in front of the
   picture's edge and every line of its text stands on the page ground below it.
   W-B.19 drew it lapping by 1.5rem, which puts the text on the frosted picture and
   reads under 4.5:1 at every tier (PROTOTYPE.md, G-READ). */
.caption {
    place-self: end start;
    margin: 0 0 0 1rem;
    translate: 0 calc(100% - 0.625rem);
    max-inline-size: 70%;
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
    line-height: 1.45;
}

.caption.lap-spec {
    margin: 0 0 -1.5rem 1rem;
    translate: none;
}
.plate-figure {
    margin-block-end: 4rem;
}

/* 3 */
.stage {
    max-inline-size: min(36rem, 100% - 2rem);
    margin: 0 auto;
    place-items: center;
}
.stage-word {
    place-self: start center;
    margin: 0;
    font-size: 19cqi;
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--muted-foreground, var(--foreground));
}
.dial {
    place-self: center;
    inline-size: 78cqi;
    margin-block-start: 9cqi;
    overflow: visible;
}
.dial-track,
.dial-arc {
    fill: none;
    stroke-width: 7;
}
.dial-track {
    stroke: var(--border, currentColor);
}
.dial-arc {
    stroke: var(--primary, currentColor);
    stroke-linecap: round;
}
.stage-value {
    place-self: center;
    margin-block-start: 9cqi;
    font-size: 14cqi;
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}
.stage-value small {
    margin-inline-start: 0.2em;
    font-size: 0.32em;
    font-weight: 600;
}
</style>
