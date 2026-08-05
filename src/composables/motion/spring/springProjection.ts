import {
    SpringProgress,
    springLinearStops,
    springTimingFunction,
    type TimingFunction,
} from "@mkbabb/keyframes.js";
import type { SpringPresetRow } from "./springPresets";

// LAW 0b — `settleBand` is a row property, so it is an OPTIONAL projection input:
// the table's rows carry their own band, and the Springs lab (which authors
// arbitrary pairs, off-table by design) falls through to the 2% default.
type SpringParameters = Pick<SpringPresetRow, "response" | "dampingFraction"> &
    Partial<Pick<SpringPresetRow, "settleBand">>;

/** Internal projection shared by token generation and the Springs lab. */
export interface SpringProjection {
    readonly settleSeconds: number;
    readonly sampleCount: number;
    readonly stops: string;
    readonly timingFunction: TimingFunction;
    /** The maximum of the timing function across the sampled horizon — the
     *  overshoot the Springs lab must contain within available travel. */
    readonly peak: number;
}

const SPRING_TOKEN_SAMPLE_COUNT = 48;

const DEFAULT_SETTLE_BAND = 0.02;
const SETTLE_TICK_DT = 0.0005;
const SETTLE_MAX_SECONDS = 5;

/** Numeric settle over the row's OWN band, rounded to the token register's nearest 10 ms. */
export function springSettleDurationSeconds(parameters: SpringParameters): number {
    const { settleBand = DEFAULT_SETTLE_BAND, ...pair } = parameters;
    const spring = new SpringProgress(pair);
    spring.target = 1;
    let lastOutOfBand = 0;
    for (let t = SETTLE_TICK_DT; t < SETTLE_MAX_SECONDS; t += SETTLE_TICK_DT) {
        if (Math.abs(1 - spring.tickToTime(t)) >= settleBand) {
            lastOutOfBand = t;
        }
    }
    spring.dispose();
    return (Math.round((lastOutOfBand * 1000) / 10) * 10) / 1000;
}

/** Project one spring through the exact horizon and density used by CSS tokens. */
export function springProjection(parameters: SpringParameters): SpringProjection {
    const settleSeconds = springSettleDurationSeconds(parameters);
    const { settleBand: _band, ...pair } = parameters;
    const options = {
        ...pair,
        sampleCount: SPRING_TOKEN_SAMPLE_COUNT,
        maxDuration: settleSeconds,
    };
    const timingFunction = springTimingFunction(options).fn;
    let peak = timingFunction(0);
    for (let index = 1; index <= SPRING_TOKEN_SAMPLE_COUNT; index++) {
        peak = Math.max(peak, timingFunction(index / SPRING_TOKEN_SAMPLE_COUNT));
    }
    return {
        settleSeconds,
        sampleCount: SPRING_TOKEN_SAMPLE_COUNT,
        stops: springLinearStops(options),
        timingFunction,
        peak,
    };
}
