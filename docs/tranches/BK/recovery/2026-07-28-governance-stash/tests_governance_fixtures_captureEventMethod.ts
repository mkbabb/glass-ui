export const capturedAddEventListener = document.createElement("span").addEventListener;

export function registerWithCapturedMethod(
    target: EventTarget,
    listener: EventListener,
): void {
    Reflect.apply(capturedAddEventListener, target, ["c19-captured", listener, false]);
}
