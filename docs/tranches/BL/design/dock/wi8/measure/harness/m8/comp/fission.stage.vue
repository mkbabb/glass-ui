<!-- MEASURE-8 H8 (RU-85, C7-4): daraksha's fission held at one instant. daraksha origin/master 919090c,
     src/shell/SiteDock.vue:229-283 (the site dock, the neck `<span class="neck glass-plate">`, the theme dock) and
     :468-548 (.fission, .theme-seat, .neck). The site dock is open and the row is held at --fission-t 0.62, where the neck
     is drawn at full opacity and nearly its full waist ((t - 0.6) * 40 = 0.8, the waist 0.8 * (1 - 0.05)^2); the seat
     dock beside it. The neck's mask (two ellipses and the plate ends cut away) is kept; its tier is the dock's
     (`--glass-veil-tier: var(--glass-veil-dock)`), as daraksha writes it. `&neck=match` adds the README's matching-plate
     recipe as the harness models it until S4 writes it: the neck takes the dock's own --glass-level. -->
<script setup lang="ts">
import { BookOpen, Home, Library, Moon, Search } from "@lucide/vue";
import { DockControl, GlassDock } from "@glass/components/dock";
import DockScene from "./DockScene.vue";
const match = new URLSearchParams(location.search).get("neck") === "match";
</script>

<template>
    <DockScene place="bottom">
        <div class="fx-row" :class="{ 'fx-match': match }" style="--fission-t: 0.62; --open-w: 236px; --rest-w: 56px; --seat-w: 56px; --seat-h: 56px">
            <GlassDock :collapse="false" fit-content class="fx-site" aria-label="Site">
                <DockControl aria-label="Home"><Home /></DockControl>
                <DockControl aria-label="Reader" aria-current="page"><BookOpen /></DockControl>
                <DockControl aria-label="Search"><Search /></DockControl>
                <DockControl aria-label="Library"><Library /></DockControl>
            </GlassDock>
            <span class="neck glass-plate" data-testid="fx-neck" aria-hidden="true"></span>
            <div class="theme-seat">
                <GlassDock :collapse="false" fit-content class="theme-dock" aria-label="Theme">
                    <DockControl aria-label="Theme"><Moon /></DockControl>
                </GlassDock>
            </div>
        </div>
    </DockScene>
</template>

<style scoped>
.fx-row {
    --t: var(--fission-t, 0);
    --seat-gap: 0.5rem;
    --a: clamp(0, var(--t), 1);
    --g: clamp(0, (var(--t) - 0.6) / 0.4, 1);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.theme-seat {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 100%;
    inline-size: max-content;
    translate: calc(var(--seat-gap) * var(--g) + 2px) -50%;
}
.neck {
    --R: calc(var(--seat-h, 3.5rem) / 2);
    --ov: calc(var(--R) * 0.5);
    --nh: calc(var(--seat-h, 3.5rem) * 0.87);
    --nw: calc(var(--seat-gap) * var(--g) + 2 * var(--ov));
    --waist: calc(var(--nh) * 0.8 * (1 - var(--g)) * (1 - var(--g)));
    --ry: calc((var(--nh) - var(--waist)) / 2);
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 100%;
    inline-size: var(--nw);
    block-size: var(--nh);
    translate: calc(-1 * var(--ov)) -50%;
    --glass-veil-tier: var(--glass-veil-dock);
    -webkit-backdrop-filter: var(--glass-blur-resting);
    backdrop-filter: var(--glass-blur-resting);
    pointer-events: none;
    opacity: calc(clamp(0, (var(--t) - 0.6) * 40, 1) * clamp(0, (1 - var(--g)) * 30, 1));
    --cut: #0000 calc(100% - 0.75px), #000 100%;
    -webkit-mask-image:
        radial-gradient(calc(var(--nw) / 2) var(--ry) at 50% 0, var(--cut)),
        radial-gradient(calc(var(--nw) / 2) var(--ry) at 50% 100%, var(--cut)),
        radial-gradient(circle calc(var(--R) - 0.5px) at calc(var(--ov) - var(--R)) 50%, var(--cut)),
        radial-gradient(circle calc(var(--R) - 0.5px) at calc(100% - var(--ov) + var(--R)) 50%, var(--cut));
    -webkit-mask-composite: source-in;
    mask-image:
        radial-gradient(calc(var(--nw) / 2) var(--ry) at 50% 0, var(--cut)),
        radial-gradient(calc(var(--nw) / 2) var(--ry) at 50% 100%, var(--cut)),
        radial-gradient(circle calc(var(--R) - 0.5px) at calc(var(--ov) - var(--R)) 50%, var(--cut)),
        radial-gradient(circle calc(var(--R) - 0.5px) at calc(100% - var(--ov) + var(--R)) 50%, var(--cut));
    mask-composite: intersect;
}
</style>
<style>
/* the recipe, modelled: the neck at the dock's own level (read from a dock on the page by the reader, written here) */
.fx-match .neck { --glass-level: var(--fx-dock-level, 1); }
</style>
