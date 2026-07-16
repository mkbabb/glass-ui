import { SpringProgress } from "@mkbabb/keyframes.js";
import { onScopeDispose, type Ref } from "vue";
import { springPreset } from "@glass/composables/motion/spring/springPresets";
import {
    bodyDiameter,
    bodyTransform,
    neckTransform,
    projectDeckBarbell,
} from "./gooBarbellGeometry";

interface DeckGooRefs {
    host: Ref<HTMLElement | null>;
    bodyA: Ref<HTMLElement | null>;
    bodyB: Ref<HTMLElement | null>;
    neck: Ref<HTMLElement | null>;
}

export function useDeckGoo({ host, bodyA, bodyB, neck }: DeckGooRefs) {
    const preset = springPreset("smooth");
    const spring = new SpringProgress({
        response: preset.response,
        dampingFraction: preset.dampingFraction,
        initial: 1,
        respectReducedMotion: true,
    });
    let direction: 1 | -1 = 1;
    let traveling = false;

    const center = (slot: number): number => {
        const width = host.value?.clientWidth || 1;
        return width / 2 + slot * width * 0.5;
    };
    const step = (): number => Math.max(8, (host.value?.clientWidth || 1) * 0.97);

    function setSize(): void {
        host.value?.style.setProperty("--deck-body-d", `${bodyDiameter(step()).toFixed(2)}px`);
    }

    function placeStatic(): void {
        const at = center(0);
        const transform = bodyTransform(at, 0, 1);
        if (bodyA.value) bodyA.value.style.transform = transform;
        if (bodyB.value) bodyB.value.style.transform = transform;
        if (neck.value) {
            neck.value.style.opacity = "0";
            neck.value.style.transform = neckTransform(at, 0.0001, 0.0001);
        }
    }

    function paint(progress: number): void {
        if (!bodyA.value || !bodyB.value || !neck.value) return;
        const rawWeight = Number.parseFloat(
            host.value ? getComputedStyle(host.value).getPropertyValue("--goo-weight") : "",
        );
        const geometry = projectDeckBarbell(
            center(direction),
            center(0),
            progress,
            step(),
            Number.isFinite(rawWeight) ? Math.min(1, Math.max(0, rawWeight)) : 0,
        );
        bodyA.value.style.transform = bodyTransform(geometry.bodyA, geometry.arc, geometry.stretch);
        bodyB.value.style.transform = bodyTransform(geometry.bodyB, geometry.arc, geometry.stretch);
        neck.value.style.transform = neckTransform(
            geometry.midpoint,
            geometry.neckSpan,
            geometry.neckGirth,
        );
        neck.value.style.opacity = geometry.neckGirth.toFixed(4);
    }

    const unsubscribe = spring.subscribe((value) => {
        if (!traveling) return;
        paint(value);
        if (spring.settled) {
            traveling = false;
            placeStatic();
            host.value?.removeAttribute("data-traveling");
        }
    });
    spring.play(() => {});

    function snap(): void {
        traveling = false;
        spring.reset(1, 0);
        setSize();
        placeStatic();
        host.value?.removeAttribute("data-traveling");
    }

    function travel(nextDirection: 1 | -1): void {
        const element = host.value;
        if (!element) return;
        setSize();
        const progress = spring.settled
            ? 0
            : Math.min(0.95, Math.max(0, spring.value));
        const velocity = spring.settled ? 0 : Math.max(0, spring.velocity);
        direction = nextDirection;
        traveling = false;
        spring.reset(progress, velocity);
        traveling = true;
        element.setAttribute("data-traveling", "");
        spring.target = 1;
    }

    function dispose(): void {
        unsubscribe();
        spring.dispose();
    }

    onScopeDispose(dispose);
    return { snap, travel, dispose };
}
