<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { Button } from "../../../src/components/ui/button";
import { GlassUnderline } from "../../../src/components/custom/underline";
import type { GlassUnderlineExpose } from "../../../src/components/custom/underline";

// The imperative load clock — a template ref + play().
const loadRef = ref<GlassUnderlineExpose | null>(null);
function replayLoad() {
    void loadRef.value?.play();
}

// The declarative `active` overlay — a single boolean drives the rising/falling edge.
const active = ref(false);
function toggleActive() {
    active.value = !active.value;
}
</script>

<template>
    <StoryPage>
        <!-- Load clock — the imperative play() (the masthead / Sequence register). -->
        <StorySection
            label="load clock · imperative play()"
            blurb="A keyframes.js NumericAnimation sweeps stroke-dashoffset len→0 once. Fire it via a template ref's play() — the awaitable a load Sequence chains."
        >
            <div class="flex flex-col gap-4">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    The <GlassUnderline ref="loadRef">future</GlassUnderline> is here
                </p>
                <div>
                    <Button variant="outline" @click="replayLoad">Replay draw</Button>
                </div>
            </div>
        </StorySection>

        <!-- Load clock — the declarative `active` overlay (DEC-2). -->
        <StorySection
            label="load clock · :active overlay"
            blurb="A thin declarative overlay ON the load clock: rising edge draws, falling edge resets to undrawn so a re-rise REPLAYS. For activation-gated hosts (slides, tab panels) — no template ref needed."
        >
            <div class="flex flex-col gap-4">
                <p class="text-display-3 font-display leading-tight text-foreground">
                    A <GlassUnderline :active="active">bound</GlassUnderline> clock
                </p>
                <div>
                    <Button variant="outline" @click="toggleActive">
                        {{ active ? "Deactivate (reset)" : "Activate (draw)" }}
                    </Button>
                </div>
            </div>
        </StorySection>

        <!-- Scroll clock — native view() keyframes, bidirectional. -->
        <StorySection
            label="scroll clock · native view()"
            blurb="Native CSS @keyframes on the element's own view() timeline — draws as the word enters and un-draws on scroll-up. Zero JS. Scroll the page to see it."
        >
            <p class="text-display-3 font-display leading-tight text-foreground">
                A <GlassUnderline clock="scroll">scrolled</GlassUnderline> underline
            </p>
        </StorySection>

        <!-- Static clock — set drawn, no animation. -->
        <StorySection
            label="static clock · set drawn"
            blurb="No clock — the stroke rests drawn. Also the PRM-collapse state of both clocks (information parity: the emphasis is the colour, present regardless of the draw)."
        >
            <p class="text-display-3 font-display leading-tight text-foreground">
                A <GlassUnderline clock="static">static</GlassUnderline> stroke
            </p>
        </StorySection>

        <!-- The --gu-* bold-register override (DEC-3). -->
        <StorySection
            label="--gu-* bold register"
            blurb="The slides' bolder register is a three-token override (--gu-stroke-width / --gu-ink-height / --gu-ink-offset), not a geometry fork. The ghost width derives from the one knob."
        >
            <p
                class="text-display-3 font-display leading-tight text-foreground"
                style="
                    --gu-stroke-width: 6;
                    --gu-ink-height: 0.3em;
                    --gu-ink-offset: -0.16em;
                "
            >
                A <GlassUnderline clock="static">bolder</GlassUnderline> register
            </p>
        </StorySection>

        <!-- A consumer color prop — the motion family's ONE coherent purple
             event (--motion-accent, the --viz-legendre violet twin; W-SUFFUSE
             D3). Presets-in-consumers: the demo-local accent, never a lib token. -->
        <StorySection
            label="color prop · the motion accent"
            blurb="The default stroke is var(--primary) (re-resolves under .dark via the cascade — no .dark block). An explicit color prop wins both grounds — here the motion family's --motion-accent purple."
        >
            <p class="text-display-3 font-display leading-tight text-foreground">
                A
                <GlassUnderline clock="static" color="var(--motion-accent)"
                    >tinted</GlassUnderline
                >
                stroke
            </p>
        </StorySection>
    </StoryPage>
</template>
