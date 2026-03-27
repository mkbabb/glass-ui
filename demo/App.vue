<script setup lang="ts">
import { ref, computed } from "vue";
import { useCharSplit } from "@/composables/useCharSplit";
import { GlassPanel } from "@/components/custom/glass-panel";

const isDark = ref(false);
const toggleDark = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark", isDark.value);
};

// Kinetic typography: char split
const heroText = "Glassmorphism";
const heroChars = useCharSplit(heroText);

// Spring animation demo
const showDialog = ref(false);
const showDropdown = ref(false);
const showPop = ref(false);

// Stagger demo
const staggerItems = [
    "Spring-smooth entrance",
    "Snappy dropdown feel",
    "Bouncy dialog pop",
    "Gentle panel slide",
    "Progressive blur",
    "Caustic light patterns",
];
const showStagger = ref(true);
const restagger = () => {
    showStagger.value = false;
    requestAnimationFrame(() => {
        showStagger.value = true;
    });
};

// Glass tier info
const tierLabels: Record<string, string> = {
    webgpu: "WebGPU — caustics, real-time refraction",
    webgl: "WebGL — frost, refraction, chromatic aberration",
    css: "CSS — backdrop-filter, grain, specular",
    fallback: "Fallback — solid background",
};
</script>

<template>
    <div
        class="min-h-screen bg-background text-foreground transition-colors duration-500"
        :style="{
            backgroundImage:
                'linear-gradient(135deg, hsl(280 60% 70% / 0.3), hsl(200 80% 60% / 0.2), hsl(340 70% 65% / 0.2))',
        }"
    >
        <!-- Colorful background blobs for glass effect visibility -->
        <div class="fixed inset-0 -z-10 overflow-hidden">
            <div
                class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl"
            />
            <div
                class="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl"
            />
            <div
                class="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl"
            />
            <div
                class="absolute right-1/4 top-2/3 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl"
            />
        </div>

        <div class="mx-auto max-w-5xl px-6 py-12">
            <!-- Header with dark mode toggle -->
            <header class="mb-16 flex items-center justify-between">
                <span class="text-small text-muted-foreground"
                    >glass-ui feature demo</span
                >
                <button
                    class="glass rounded-full px-4 py-2 text-small transition-transform active:scale-95"
                    @click="toggleDark"
                >
                    {{ isDark ? "☀ Light" : "● Dark" }}
                </button>
            </header>

            <!-- ═══════════════════════════════════════════ -->
            <!-- WS3 + WS6: Typography & Kinetic Type       -->
            <!-- ═══════════════════════════════════════════ -->
            <section class="mb-20">
                <p class="text-caption mb-2 uppercase tracking-widest text-muted-foreground">
                    WS3 + WS6 — Typography & Kinetic Type
                </p>

                <!-- Hero display: light weight (350), WONK, fluid sizing -->
                <h1 class="text-display-3 mb-4">
                    The future is translucent
                </h1>

                <p class="text-title mb-8 text-muted-foreground">
                    Swiss confidence, not corporate heaviness
                </p>

                <!-- Per-character stagger animation -->
                <div class="mb-6">
                    <p class="text-caption mb-2 text-muted-foreground">
                        Per-character stagger (useCharSplit + .char-stagger)
                    </p>
                    <h2
                        class="char-stagger text-display-2"
                        v-html="heroChars"
                    />
                </div>

                <!-- Weight breathing -->
                <div class="mb-6">
                    <p class="text-caption mb-2 text-muted-foreground">
                        Weight breathing (.text-breathe)
                    </p>
                    <p class="text-breathe text-display font-[Fraunces]">
                        Ambient motion
                    </p>
                </div>

                <!-- WONK/SOFT hover -->
                <div class="mb-6">
                    <p class="text-caption mb-2 text-muted-foreground">
                        Hover for WONK/SOFT personality shift
                    </p>
                    <p class="text-wonk-hover text-display cursor-pointer font-[Fraunces]">
                        Hover me
                    </p>
                </div>

                <!-- Tabular nums -->
                <div class="mb-6">
                    <p class="text-caption mb-2 text-muted-foreground">
                        .tabular-nums for aligned data
                    </p>
                    <div class="tabular-nums text-heading space-y-1">
                        <div>1,234,567.89</div>
                        <div>9,876,543.21</div>
                        <div>
                            &nbsp;&nbsp;&nbsp;100,000.00
                        </div>
                    </div>
                </div>

                <!-- Letter spacing hover -->
                <div>
                    <p class="text-caption mb-2 text-muted-foreground">
                        .text-hover-spread — letter spacing transition
                    </p>
                    <p class="text-hover-spread text-title cursor-pointer">
                        Hover to spread
                    </p>
                </div>
            </section>

            <!-- ═══════════════════════════════════════════ -->
            <!-- WS2: Glass Depth System                    -->
            <!-- ═══════════════════════════════════════════ -->
            <section class="mb-20">
                <p class="text-caption mb-6 uppercase tracking-widest text-muted-foreground">
                    WS2 — Glass Depth System (grain + specular + enhanced blur)
                </p>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div class="glass rounded-2xl p-6">
                        <h3 class="text-heading mb-2">.glass</h3>
                        <p class="text-small text-muted-foreground">
                            Base tier: blur 16px, saturate 1.6, brightness 1.05.
                            Notice the subtle grain texture and top-edge
                            specular highlight.
                        </p>
                    </div>

                    <div class="glass-medium rounded-2xl p-6">
                        <h3 class="text-heading mb-2">.glass-medium</h3>
                        <p class="text-small text-muted-foreground">
                            Mid tier: blur 20px, saturate 1.7. More
                            prominent grain overlay. Specular catch stronger.
                        </p>
                    </div>

                    <div class="glass-elevated rounded-2xl p-6">
                        <h3 class="text-heading mb-2">.glass-elevated</h3>
                        <p class="text-small text-muted-foreground">
                            Elevated: blur 28px, saturate 1.8. Heaviest
                            frost. Maximum depth perception.
                        </p>
                    </div>
                </div>

                <!-- Glass legibility -->
                <div class="glass-medium mt-6 rounded-2xl p-6">
                    <p class="text-glass-legible text-display">
                        Legible over glass
                    </p>
                    <p class="text-small mt-2 text-muted-foreground">
                        .text-glass-legible — halo text-shadow for guaranteed contrast
                    </p>
                </div>
            </section>

            <!-- ═══════════════════════════════════════════ -->
            <!-- WS5: GPU Glass Panel                       -->
            <!-- ═══════════════════════════════════════════ -->
            <section class="mb-20">
                <p class="text-caption mb-6 uppercase tracking-widest text-muted-foreground">
                    WS5 — GlassPanel Component (tiered renderer)
                </p>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <GlassPanel variant="default" class="rounded-2xl p-6">
                        <h3 class="text-heading mb-2">GlassPanel (auto-tier)</h3>
                        <p class="text-small text-muted-foreground">
                            Automatically detects best available tier:
                            WebGPU → WebGL → CSS → fallback.
                        </p>
                    </GlassPanel>

                    <GlassPanel variant="elevated" class="rounded-2xl p-6">
                        <h3 class="text-heading mb-2">GlassPanel (elevated)</h3>
                        <p class="text-small text-muted-foreground">
                            Elevated variant with maximum frosting depth.
                        </p>
                    </GlassPanel>
                </div>
            </section>

            <!-- ═══════════════════════════════════════════ -->
            <!-- WS1: Spring Animations                     -->
            <!-- ═══════════════════════════════════════════ -->
            <section class="mb-20">
                <p class="text-caption mb-6 uppercase tracking-widest text-muted-foreground">
                    WS1 — Spring Animations (linear() curves)
                </p>

                <div class="flex flex-wrap gap-4">
                    <!-- Dialog spring (bouncy) -->
                    <button
                        class="glass rounded-xl px-5 py-3 text-small active:scale-95"
                        @click="showDialog = !showDialog"
                    >
                        Toggle dialog (bouncy)
                    </button>

                    <!-- Dropdown spring (snappy) -->
                    <div class="relative">
                        <button
                            class="glass rounded-xl px-5 py-3 text-small active:scale-95"
                            @click="showDropdown = !showDropdown"
                        >
                            Toggle dropdown (snappy)
                        </button>
                        <Transition name="dropdown">
                            <div
                                v-if="showDropdown"
                                class="glass-elevated absolute left-0 top-full z-10 mt-2 w-48 rounded-xl p-3"
                            >
                                <div class="space-y-2 text-small">
                                    <div class="rounded-lg px-3 py-2 hover:bg-accent">
                                        Menu item 1
                                    </div>
                                    <div class="rounded-lg px-3 py-2 hover:bg-accent">
                                        Menu item 2
                                    </div>
                                    <div class="rounded-lg px-3 py-2 hover:bg-accent">
                                        Menu item 3
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <!-- Pop spring (bouncy) -->
                    <button
                        class="glass rounded-xl px-5 py-3 text-small active:scale-95"
                        @click="showPop = !showPop"
                    >
                        Toggle pop (bouncy)
                    </button>
                </div>

                <!-- Dialog overlay -->
                <Transition name="fade">
                    <div
                        v-if="showDialog"
                        class="glass-overlay fixed inset-0 z-40"
                        @click="showDialog = false"
                    />
                </Transition>
                <Transition name="dialog-scale">
                    <div
                        v-if="showDialog"
                        class="glass-elevated fixed left-1/2 top-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-8"
                    >
                        <h3 class="text-heading mb-3">Spring Dialog</h3>
                        <p class="text-small mb-4 text-muted-foreground">
                            This dialog enters with --spring-bouncy (20%
                            overshoot, visible bounce-settle). Notice the
                            natural deceleration.
                        </p>
                        <button
                            class="glass rounded-lg px-4 py-2 text-small active:scale-95"
                            @click="showDialog = false"
                        >
                            Close
                        </button>
                    </div>
                </Transition>

                <!-- Pop element -->
                <Transition name="pop">
                    <div
                        v-if="showPop"
                        class="glass mt-4 inline-block rounded-2xl p-6"
                    >
                        <p class="text-heading">Pop!</p>
                        <p class="text-small text-muted-foreground">
                            --spring-bouncy entrance with scale
                        </p>
                    </div>
                </Transition>

                <!-- Fade-slide -->
                <div class="mt-6">
                    <p class="text-caption mb-2 text-muted-foreground">
                        Transition curves reference:
                    </p>
                    <div class="glass rounded-xl p-4">
                        <code class="text-micro block space-y-1">
                            <div>--spring-smooth: no overshoot, smooth settle (fade-slide, tabs)</div>
                            <div>--spring-snappy: 7% overshoot (dropdowns, popovers)</div>
                            <div>--spring-bouncy: 20% overshoot (dialogs, pop, dock)</div>
                            <div>--spring-gentle: ~0.6% overshoot (sheets, panels)</div>
                        </code>
                    </div>
                </div>
            </section>

            <!-- ═══════════════════════════════════════════ -->
            <!-- WS4: Stagger & Entry Utilities             -->
            <!-- ═══════════════════════════════════════════ -->
            <section class="mb-20">
                <p class="text-caption mb-6 uppercase tracking-widest text-muted-foreground">
                    WS4 — Stagger & Entry Utilities
                </p>

                <button
                    class="glass mb-4 rounded-xl px-5 py-3 text-small active:scale-95"
                    @click="restagger"
                >
                    Replay stagger
                </button>

                <div
                    v-if="showStagger"
                    class="stagger-children grid grid-cols-2 gap-4 md:grid-cols-3"
                >
                    <div
                        v-for="(item, i) in staggerItems"
                        :key="i"
                        class="glass rounded-xl p-4"
                    >
                        <p class="text-small">{{ item }}</p>
                    </div>
                </div>

                <!-- Scroll reveal -->
                <div class="mt-12">
                    <p class="text-caption mb-2 text-muted-foreground">
                        .scroll-reveal — scroll down to see fade-in
                        (animation-timeline: view())
                    </p>
                    <div class="space-y-4">
                        <div
                            v-for="i in 4"
                            :key="i"
                            class="scroll-reveal glass rounded-xl p-6"
                        >
                            <p class="text-heading">Scroll-revealed item {{ i }}</p>
                            <p class="text-small text-muted-foreground">
                                Animates on viewport entry with zero JavaScript.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Scroll weight reveal -->
                <div class="mt-12">
                    <p class="text-caption mb-2 text-muted-foreground">
                        .scroll-weight-reveal — font weight increases on scroll
                    </p>
                    <p class="scroll-weight-reveal text-display-2 font-[Fraunces]">
                        Weight reveals on scroll
                    </p>
                </div>
            </section>

            <!-- Footer -->
            <footer class="pb-12 text-center">
                <p class="text-caption text-muted-foreground">
                    glass-ui — glassmorphism, spring motion, kinetic type
                </p>
            </footer>
        </div>
    </div>
</template>
