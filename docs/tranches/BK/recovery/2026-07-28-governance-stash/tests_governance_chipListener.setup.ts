import { afterAll } from "vitest";

export interface ChipListenerLedger {
    installedBeforeImport: true;
    sentinel: Element;
    verification: Element;
    positiveTrace: readonly [0, 1, 0];
    activeCount(target: EventTarget, type: string): number;
    addTraversalCount(): number;
    removeTraversalCount(): number;
    runFixedDecoyMutation(): {
        decoyTraversals: readonly [0, 0];
        activeTrace: readonly [0, 0, 0];
        positivePredicate: false;
        chainsUnchanged: true;
    };
    restore(): void;
}

declare global {
    var __glassChipListenerLedger: ChipListenerLedger | undefined;
}

type Listener = EventListenerOrEventListenerObject;
interface Registration {
    target: EventTarget;
    type: string;
    listener: Listener;
    capture: boolean;
}

const sentinel = document.createElement("div");
const verification = document.createElement("span");

const chain = (value: object): object[] => {
    const values: object[] = [];
    let current: object | null = value;
    while (current) {
        values.push(current);
        current = Object.getPrototypeOf(current) as object | null;
    }
    return values;
};

const ownerOf = (value: object, key: PropertyKey): object => {
    const owner = chain(value).find((candidate) =>
        Object.prototype.hasOwnProperty.call(candidate, key),
    );
    if (!owner) throw new Error(`C19 listener owner missing for ${String(key)}`);
    return owner;
};

const addOwner = ownerOf(sentinel, "addEventListener");
const removeOwner = ownerOf(sentinel, "removeEventListener");
const addDescriptor = Object.getOwnPropertyDescriptor(addOwner, "addEventListener");
const removeDescriptor = Object.getOwnPropertyDescriptor(removeOwner, "removeEventListener");
if (typeof addDescriptor?.value !== "function" || typeof removeDescriptor?.value !== "function") {
    throw new Error("C19 listener owners must expose callable data descriptors");
}

const registrations: Registration[] = [];
let addTraversals = 0;
let removeTraversals = 0;
let installed = false;

const captureOf = (options?: boolean | AddEventListenerOptions): boolean =>
    typeof options === "boolean" ? options : Boolean(options?.capture);

const sameRegistration = (
    entry: Registration,
    target: EventTarget,
    type: string,
    listener: Listener,
    capture: boolean,
): boolean =>
    entry.target === target &&
    entry.type === type &&
    entry.listener === listener &&
    entry.capture === capture;

const wrappedAdd = function (
    this: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
): void {
    addTraversals += 1;
    if (listener) {
        const capture = captureOf(options);
        if (!registrations.some((entry) => sameRegistration(entry, this, type, listener, capture))) {
            registrations.push({ target: this, type, listener, capture });
        }
    }
    Reflect.apply(addDescriptor.value, this, [type, listener, options]);
};

const wrappedRemove = function (
    this: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions,
): void {
    removeTraversals += 1;
    if (listener) {
        const capture = captureOf(options);
        const index = registrations.findIndex((entry) =>
            sameRegistration(entry, this, type, listener, capture),
        );
        if (index >= 0) registrations.splice(index, 1);
    }
    Reflect.apply(removeDescriptor.value, this, [type, listener, options]);
};

const install = (): void => {
    if (installed) return;
    Object.defineProperty(addOwner, "addEventListener", {
        ...addDescriptor,
        value: wrappedAdd,
    });
    Object.defineProperty(removeOwner, "removeEventListener", {
        ...removeDescriptor,
        value: wrappedRemove,
    });
    installed = true;
};

const restore = (): void => {
    if (!installed) return;
    Object.defineProperty(addOwner, "addEventListener", addDescriptor);
    Object.defineProperty(removeOwner, "removeEventListener", removeDescriptor);
    installed = false;
};

const count = (target: EventTarget, type: string): number =>
    registrations.filter((entry) => entry.target === target && entry.type === type).length;

install();
const probe = (): void => undefined;
const before = count(verification, "c19-interposition");
verification.addEventListener("c19-interposition", probe, {
    capture: false,
    passive: true,
});
const during = count(verification, "c19-interposition");
verification.removeEventListener("c19-interposition", probe, false);
const after = count(verification, "c19-interposition");
if (before !== 0 || during !== 1 || after !== 0) {
    restore();
    throw new Error(`C19 listener interposition failed: ${before}→${during}→${after}`);
}

const ledger: ChipListenerLedger = {
    installedBeforeImport: true,
    sentinel,
    verification,
    positiveTrace: [0, 1, 0],
    activeCount: count,
    addTraversalCount: () => addTraversals,
    removeTraversalCount: () => removeTraversals,
    runFixedDecoyMutation: () => {
        const fixedDecoy = Object.create(null) as Record<PropertyKey, unknown>;
        let decoyAdds = 0;
        let decoyRemoves = 0;
        Object.defineProperties(fixedDecoy, {
            addEventListener: {
                configurable: true,
                value: () => {
                    decoyAdds += 1;
                },
            },
            removeEventListener: {
                configurable: true,
                value: () => {
                    decoyRemoves += 1;
                },
            },
        });
        const sentinelBefore = chain(sentinel);
        const verificationBefore = chain(verification);
        if (sentinelBefore.includes(fixedDecoy) || verificationBefore.includes(fixedDecoy)) {
            throw new Error("C19 fixed decoy unexpectedly appears in a retained live chain");
        }

        restore();
        const wrongProbe = (): void => undefined;
        const traceBefore = count(verification, "c19-wrong-owner");
        verification.addEventListener("c19-wrong-owner", wrongProbe, {
            capture: false,
            passive: true,
        });
        const traceDuring = count(verification, "c19-wrong-owner");
        verification.removeEventListener("c19-wrong-owner", wrongProbe, false);
        const traceAfter = count(verification, "c19-wrong-owner");
        const sentinelAfter = chain(sentinel);
        const verificationAfter = chain(verification);
        const unchanged =
            sentinelBefore.length === sentinelAfter.length &&
            verificationBefore.length === verificationAfter.length &&
            sentinelBefore.every((entry, index) => entry === sentinelAfter[index]) &&
            verificationBefore.every((entry, index) => entry === verificationAfter[index]);
        install();
        if (!unchanged || sentinel !== ledger.sentinel || verification !== ledger.verification) {
            throw new Error("C19 fixed-decoy mutation rewrote a retained chain or element");
        }
        return {
            decoyTraversals: [decoyAdds, decoyRemoves] as const,
            activeTrace: [traceBefore, traceDuring, traceAfter] as const,
            positivePredicate: false as const,
            chainsUnchanged: true as const,
        };
    },
    restore,
};

globalThis.__glassChipListenerLedger = ledger;

afterAll(() => {
    restore();
    registrations.splice(0);
    delete globalThis.__glassChipListenerLedger;
});
