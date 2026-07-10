<script setup lang="ts">
// BG.W-SIRI-DOCK-CAPABILITY — Siri as a DOCK CAPABILITY (the integration story).
//
// Siri is not a subpath component — it is a capability that lives BESIDE the dock via the
// `.glass-dock-frame`/`#rail` escape (box-inviolate). The "Search or Ask" pill composes the
// EXISTING `useDockSearch` pipeline (ONE fuzzy matcher — never a second engine); tapping it
// blooms the glass island FROM the pill (`useLiquidReveal`) and glides through the four forms
// on ONE `--siri-island-t` scalar (`useDockSpring`). The WebGL2 waveform is DEMO-PRIVATE
// (`SiriWaveform.vue` — no library GL). This story RETIRES the cloned "Dynamic Island Call"
// facsimile: the real capability replaces the hand-rolled prototype.
import { ref, useTemplateRef } from "vue";
import { Search, Sparkles } from "@lucide/vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { GlassDock, SiriDockCapability } from "@glass/components/custom/dock";
import { useDockState } from "@glass/components/custom/dock/composables/useDockState";
import type { UseDockSearchOptions } from "@glass/components/custom/dock/composables/useDockSearch";
import type { SearchableItem } from "@glass/components/custom/search/composables";
import DockStage from "./DockStage.vue";
import SiriWaveform from "./SiriWaveform.vue";

// The Search-or-Ask targets — a small ask set (each with a canned answer). The dock-search
// pipeline fuzzy-matches over these; selecting one drives the island to the responding form.
interface Ask extends SearchableItem {
    answer: string;
}
const ASKS: Ask[] = [
    { id: "weather", label: "What's the weather?", text: "weather forecast today", type: "ask", answer: "72° and clear — a warm, calm afternoon." },
    { id: "timer", label: "Set a 10-minute timer", text: "timer countdown minutes", type: "ask", answer: "Timer set for 10 minutes." },
    { id: "glass", label: "How does liquid glass work?", text: "glass blur refraction material", type: "ask", answer: "Warm-cream translucent plates that darken over light backdrops and glow over dark ones." },
    { id: "play", label: "Play something warm", text: "music playlist warm", type: "ask", answer: "Now playing — a warm amber mix." },
    { id: "define", label: "Define serendipity", text: "define dictionary word", type: "ask", answer: "Serendipity — a happy accident, a fortunate discovery by chance." },
];

// The dock state machine + the Search-or-Ask pipeline options (the capability composes
// `useDockSearch` off these — ONE pipeline). `onResultSelect` drives the island to respond.
const dockEl = useTemplateRef<HTMLElement>("dockEl");
const pillRef = useTemplateRef<HTMLElement>("pillRef");
const dockState = useDockState({ rootEl: dockEl });
const answer = ref<string>("");

const searchOptions: UseDockSearchOptions<Ask> = {
    dockState,
    items: () => ASKS,
    onResultSelect: (result) => {
        answer.value = result.item.answer;
        siriRef.value?.respond();
    },
};

// The exposed Siri capability handle (defineExpose) — the demo drives the forms.
interface SiriHandle {
    engage: () => void;
    think: () => void;
    respond: () => void;
    dismiss: () => void;
    isEngaged: { value: boolean };
    form: { value: string };
}
const siriRef = useTemplateRef<SiriHandle>("siriRef");

function onAsk(): void {
    answer.value = "";
    siriRef.value?.engage();
}
</script>

<template>
    <StoryPage>
        <DockStage #default="{ backgroundCanvas }">
            <StorySection heading="Siri is a dock capability" gap="lg">
                <p class="text-sm text-muted-foreground max-w-prose">
                    Tap <strong>Search or ask</strong> — a glass island BLOOMS from the dock
                    pill (<code class="rounded bg-muted px-1">useLiquidReveal</code>) and morphs
                    through four forms (dormant → listening → thinking → responding) on ONE
                    <code class="rounded bg-muted px-1">--siri-island-t</code> scalar
                    (<code class="rounded bg-muted px-1">useDockSpring</code>, the ONE dock
                    spring). The island lives BESIDE the dock via the
                    <code class="rounded bg-muted px-1">.glass-dock-frame</code>/#rail escape —
                    box-inviolate. Ask a question and the SAME
                    <code class="rounded bg-muted px-1">useDockSearch</code> pipeline ranks the
                    answer. The waveform is a demo-private WebGL2 pass.
                </p>

                <div class="dock-stage-tile siri-demo-stage">
                    <GlassDock
                        ref="dockEl"
                        always-expanded
                        :background-canvas="backgroundCanvas"
                        class="siri-dock"
                    >
                        <div class="siri-dock-row">
                            <button
                                ref="pillRef"
                                type="button"
                                class="siri-ask-pill"
                                aria-label="Search or ask Siri"
                                @click="onAsk"
                            >
                                <Sparkles class="size-4" />
                                <span>Search or ask</span>
                            </button>
                            <button
                                type="button"
                                class="siri-form-btn"
                                @click="siriRef?.think()"
                            >
                                Think
                            </button>
                            <button
                                type="button"
                                class="siri-form-btn"
                                @click="siriRef?.dismiss()"
                            >
                                Reset
                            </button>
                        </div>

                        <!-- Siri island off the #rail escape — box-inviolate beside the dock. -->
                        <template #rail>
                            <SiriDockCapability
                                ref="siriRef"
                                :trigger="pillRef"
                                :search-options="searchOptions"
                                class="siri-island-in-rail"
                            >
                                <!-- the waveform bed (rides the wave-bed; level pushed per form). -->
                                <template #waveform="{ level }">
                                    <SiriWaveform :level="level" />
                                </template>

                                <!-- the listening form — the ask field + the fuzzy results. -->
                                <template #listening="{ search }">
                                    <div v-if="search" class="siri-listen">
                                        <div class="siri-field">
                                            <Search class="size-3.5 shrink-0 text-muted-foreground" />
                                            <input
                                                v-model="search.fuzzy.query.value"
                                                class="siri-field-input"
                                                placeholder="Ask…"
                                                aria-label="Ask Siri"
                                                @keydown="search.fuzzy.onKeydown"
                                            />
                                        </div>
                                        <ul
                                            v-if="search.fuzzy.results.value.length"
                                            class="siri-results"
                                            role="listbox"
                                        >
                                            <li
                                                v-for="(r, i) in search.fuzzy.results.value.slice(0, 3)"
                                                :key="r.item.id"
                                                class="siri-result glass-menu-row"
                                                role="option"
                                                :aria-selected="i === search.fuzzy.selectedIndex.value"
                                                @click="search.fuzzy.selectResult(r)"
                                            >
                                                {{ r.item.label }}
                                            </li>
                                        </ul>
                                    </div>
                                </template>

                                <!-- the responding form — the ranked answer. -->
                                <template #responding>
                                    <p class="siri-answer">{{ answer || "Here's what I found." }}</p>
                                </template>
                            </SiriDockCapability>
                        </template>
                    </GlassDock>
                </div>

                <p class="text-mono-caption text-muted-foreground">
                    ONE dock spring (useDockSpring) · ONE bloom (useLiquidReveal) · ONE search
                    pipeline (useDockSearch) — no second engine. The island is box-inviolate:
                    it reads the dock pill as its bloom source, never touches the dock box.
                </p>
            </StorySection>
        </DockStage>
    </StoryPage>
</template>

<style scoped>
.siri-demo-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    min-block-size: 22rem;
    padding: 2.5rem;
    border-radius: var(--radius-card);
}

/* the dock sits at the bottom; the island blooms ABOVE it via the #rail escape. */
.siri-dock {
    inline-size: min(26rem, 100%);
}

.siri-dock-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.siri-ask-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.9rem;
    border-radius: var(--radius-pill);
    color: var(--foreground);
    font-size: 0.85rem;
    font-weight: 550;
    background: transparent;
    border: 0;
    cursor: pointer;
}

.siri-form-btn {
    padding: 0.35rem 0.7rem;
    border-radius: var(--radius-pill);
    font-size: 0.78rem;
    color: var(--muted-foreground);
    background: transparent;
    border: 0;
    cursor: pointer;
}

/* the island floats ABOVE the dock (the #rail slot anchors it to the non-clipping frame). */
.siri-island-in-rail {
    margin-block-end: 0.75rem;
}

.siri-listen {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    inline-size: 100%;
    padding-inline: 0.6rem;
}

.siri-field {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.siri-field-input {
    flex: 1;
    min-inline-size: 0;
    background: transparent;
    border: 0;
    outline: none;
    color: var(--foreground);
    font-size: 0.85rem;
}

.siri-results {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}

.siri-result {
    padding: 0.3rem 0.5rem;
    border-radius: var(--radius-md);
    font-size: 0.78rem;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.siri-answer {
    font-size: 0.9rem;
    color: var(--foreground);
    text-align: center;
    line-height: 1.3;
}
</style>
