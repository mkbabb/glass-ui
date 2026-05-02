import { computed, type Ref } from "vue";
import type { AuroraConfig, OklchStop } from "@/components/custom/aurora";
import { MAX_STOPS } from "@/components/custom/aurora";

interface StopRef {
    sid: string;
    stop: OklchStop;
}

export function usePaletteStops(config: Readonly<Ref<AuroraConfig>>) {
    const stopIds = new WeakMap<OklchStop, string>();

    function idFor(stop: OklchStop): string {
        let id = stopIds.get(stop);
        if (!id) {
            id = Math.random().toString(36).slice(2, 10);
            stopIds.set(stop, id);
        }
        return id;
    }

    const stopsWithIds = computed<StopRef[]>(() =>
        config.value.palette.map((stop) => ({ sid: idFor(stop), stop })),
    );

    const canAddStop = computed(() => config.value.palette.length < MAX_STOPS);

    function stopRefId(item: StopRef): string {
        return item.sid;
    }

    function updateStop(i: number, next: OklchStop) {
        config.value.palette[i] = next;
    }

    function removeStop(i: number) {
        if (config.value.palette.length <= 2) return;
        config.value.palette.splice(i, 1);
    }

    function addStop() {
        if (!canAddStop.value) return;
        const last = config.value.palette[config.value.palette.length - 1]!;
        config.value.palette.push({ L: last.L, C: last.C, h: (last.h + 45) % 360 });
    }

    function onPaletteReorder(next: readonly StopRef[]) {
        config.value.palette = next.map((x) => x.stop);
    }

    return {
        canAddStop,
        stopsWithIds,
        stopRefId,
        updateStop,
        removeStop,
        addStop,
        onPaletteReorder,
    };
}
