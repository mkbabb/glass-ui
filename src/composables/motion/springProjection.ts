import {
    SpringProgress,
    springLinearStops,
    springTimingFunction,
    type TimingFunction,
} from "@mkbabb/keyframes.js";
import type { SpringPresetRow } from "./springPresets";

type SpringParameters = Pick<SpringPresetRow, "response" | "dampingFraction">;

/** Internal projection shared by token generation and the Springs lab. */
export interface SpringProjection {
    readonly settleSeconds: number;
    readonly sampleCount: number;
    readonly stops: string;
    readonly timingFunction: TimingFunction;
}

export const SPRING_TOKEN_SAMPLE_COUNT = 48;

const SETTLE_BAND = 0.02;
const SETTLE_TICK_DT = 0.0005;
const SETTLE_MAX_SECONDS = 5;

/** Numeric 2%-band settle, rounded to the token register's nearest 10 ms. */
export function springSettleDurationSeconds(parameters: SpringParameters): number {
    const spring = new SpringProgress(parameters);
    spring.target = 1;
    let lastOutOfBand = 0;
    for (let t = SETTLE_TICK_DT; t < SETTLE_MAX_SECONDS; t += SETTLE_TICK_DT) {
        if (Math.abs(1 - spring.tickToTime(t)) >= SETTLE_BAND) {
            lastOutOfBand = t;
        }
    }
    spring.dispose();
    return (Math.round((lastOutOfBand * 1000) / 10) * 10) / 1000;
}

/** Project one spring through the exact horizon and density used by CSS tokens. */
export function springProjection(parameters: SpringParameters): SpringProjection {
    const settleSeconds = springSettleDurationSeconds(parameters);
    const options = {
        ...parameters,
        sampleCount: SPRING_TOKEN_SAMPLE_COUNT,
        maxDuration: settleSeconds,
    };
    return {
        settleSeconds,
        sampleCount: SPRING_TOKEN_SAMPLE_COUNT,
        stops: springLinearStops(options),
        timingFunction: springTimingFunction(options).fn,
    };
}
