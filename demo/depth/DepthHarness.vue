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
// The caption's plate. Over a picture it is opaque (the one decoration that reads at
// 4.5:1 there); ?surface=glass|veil show the two that do not.
const surface = (params.get("surface") ?? "opaque") as "glass" | "veil" | "opaque";
// ?shadow=1 keeps the Blob's own grounded shadow; by default it rests flat in a scene.
const shadow = params.get("shadow") === "1";
// ?t1=Glass&t2=UI sets the title's two words.
const t1 = params.get("t1") ?? "Liquid";
const t2 = params.get("t2") ?? "glass";
// ?card=1 adds a glass Card as a title's figure; ?fill=1 a figure that fills its scene
// and trails whole (?fill=bare takes the scene's room away, the bite).
const withCard = params.get("card") === "1";
const fill = params.get("fill");

// The figure's tone carries the front run's contrast (R-5). The Blob's body paints its
// config's palette stops, not its `color` (which seeds the satellites' PRNG and the
// wrapper's --blob-color), so the tone per theme is written as stops: a light body
// under dark ink, a deep one under light ink. ?blob=default keeps the stock stops.
const STOPS = {
    light: ["oklch(0.84 0.06 250)", "oklch(0.88 0.05 244)", "oklch(0.93 0.035 238)"],
    dark: ["oklch(0.24 0.08 268)", "oklch(0.27 0.09 262)", "oklch(0.30 0.08 256)"],
};
const stops = blobParam === "default" ? BLOB_CONFIG_DEFAULTS.color.paletteStops : STOPS[dark ? "dark" : "light"];
const blobColor = stops[0];
const blobConfig = {
    ...BLOB_CONFIG_DEFAULTS,
    color: { ...BLOB_CONFIG_DEFAULTS.color, paletteStops: stops, satelliteColors: stops.slice(1) },
    // In dark the stock highlight and warm rim are light patches on a deep body, which
    // light ink cannot cross at 4.5:1 (3.6 to 4.5 read). Both are quieted there.
    surface: { ...BLOB_CONFIG_DEFAULTS.surface, ...(dark && blobParam !== "default" ? { rimColor: "#2b3350", rimStrength: 0.06, specStrength: 0.04 } : {}) },
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
        <!-- 1. A title behind and in front of a Blob (placement: title). -->
        <header class="depth hero" data-depth-scene="title" :style="sceneStyle">
            <h1 class="hero-title"><span data-depth="behind">{{ t1 }}</span> <span data-depth="front">{{ t2 }}</span></h1>
            <Blob
                data-depth="figure"
                data-depth-lag
                class="hero-blob"
                :class="{ flat: !shadow }"
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
                One layer per scene may trail the page as it scrolls. It is the figure or the
                picture inside the figure's window, and never the words.
            </p>
            <p>
                Under reduced motion the travel stops and the cover stays. Nothing is drawn
                twice and nothing is masked, so each string is read once and selected once.
            </p>
        </section>

        <!-- 2. A figure with its caption on a plate (placement: caption). -->
        <figure class="depth plate-figure" data-depth-scene="caption" :style="sceneStyle">
            <div data-depth="figure" class="frame">
                <img
                    data-depth-lag="within"
                    src="./picture.jpg"
                    alt="Folds of a satin sheet, slate blue above and sand below."
                    width="1200"
                    height="1200"
                />
            </div>
            <Card as="figcaption" data-depth="front" :tier="tier" :surface="surface" class="caption">
                The picture trails inside its frame; the frame and this caption hold still.
            </Card>
        </figure>

        <section class="prose">
            <p>
                A figure and its caption are one subject, so the caption may lap the figure's
                edge. Its plate carries the words; the picture runs on behind it.
            </p>
            <p>
                A stage and its readout are one subject too. The value being read is in front
                of everything in its scene, whole, at every moment.
            </p>
        </section>

        <!-- 3. A stage: its name behind the instrument, its value on it (placement: stage). -->
        <section class="depth stage" data-depth-scene="stage" :style="sceneStyle" aria-labelledby="stage-word">
            <h2 id="stage-word" data-depth="behind" class="stage-word">download</h2>
            <svg data-depth="figure" class="dial" viewBox="0 0 100 100" aria-hidden="true">
                <circle class="dial-face" cx="50" cy="50" :r="R" />
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
            <p data-depth="front" class="stage-value">{{ mbps }} <abbr title="megabits per second">Mbps</abbr></p>
        </section>

        <section class="prose">
            <p>
                A stage holds still: its instrument takes no lag, because the name behind it
                and the value on it are composed against one position.
            </p>
            <p>The page ends on body text.</p>
        </section>

        <!-- ?card=1: a glass Card as a title's figure. Text behind it is frosted by the
             Card's own blur and counts as covered. -->
        <template v-if="withCard">
            <header class="depth card-title" data-depth-scene="title" :style="sceneStyle">
                <h2 class="hero-title"><span data-depth="behind">Frosted</span> <span data-depth="front">plate</span></h2>
                <Card data-depth="figure" tier="resting" class="card-figure" />
            </header>
            <section class="prose"><p>A plate is a figure like any other.</p></section>
        </template>

        <!-- ?fill=1: a figure as tall as its scene's content, trailing whole. -->
        <template v-if="fill">
            <div class="depth fill-scene" :class="{ bare: fill === 'bare' }" :style="sceneStyle">
                <div data-depth="figure" data-depth-lag class="fill-figure" />
            </div>
            <section class="prose"><p>The page ends on body text.</p></section>
        </template>
    </main>
</template>

<style>
/* The page writes where each scene sits, how wide it is, and its type's face. It
   writes no geometry inside a scene: that is the placement's (depth.css). */
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
/* The Blob's box is about twice its body, so the scene is 62.5 % of its width tall.
   The page caps that width to keep the scene inside one viewport. */
.hero {
    max-inline-size: 72rem;
    min-block-size: 100svh;
    margin-inline: auto;
}
.hero-title {
    font-weight: 700;
    letter-spacing: -0.02em;
}
/* The Blob's box is larger than its body, so its size is named. */
.hero-blob {
    --depth-figure: 46cqi;
}
/* The Blob rests flat in a scene: its own grounded shadow would fall on the words. */
.hero-blob.flat {
    --blob-shadow-ambient: 0 0 0 transparent;
    --blob-shadow-contact: 0 0 0 transparent;
    --blob-shadow-hover: 0 0 0 transparent;
    --blob-shadow-contact-hover: 0 0 0 transparent;
}

/* 2 */
.plate-figure {
    max-inline-size: min(44rem, 100% - 2rem);
    margin: 0 auto 4rem;
}
.frame {
    border-radius: var(--radius-card, 1.25rem);
}
.caption {
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
    line-height: 1.45;
}

/* 3 */
.stage {
    max-inline-size: min(36rem, 100% - 2rem);
    margin: 0 auto;
}
.stage-word {
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--muted-foreground, var(--foreground));
}
.dial {
    overflow: visible;
}
.dial-face {
    fill: var(--card);
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
    font-weight: 700;
    font-variant-numeric: tabular-nums;
}
.stage-value abbr {
    font-size: 0.32em;
    font-weight: 600;
    text-decoration: none;
}

/* ?card=1 */
.card-title {
    max-inline-size: 72rem;
    min-block-size: 70svh;
    margin-inline: auto;
}
.card-figure {
    aspect-ratio: 1;
}

/* ?fill=1 */
.fill-scene {
    max-inline-size: min(30rem, 100% - 2rem);
    margin: 0 auto;
}
.fill-scene.bare {
    padding-block: 0;
}
.fill-figure {
    block-size: 22.5rem;
    border-radius: var(--radius-card, 1.25rem);
    background: var(--muted);
}
</style>
