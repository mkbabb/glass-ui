/**
 * THE QUIET RETURN (U/B7b L · O-11, O-19). reka's modal content answers its
 * close-auto-focus with a bare `triggerElement.focus()`. In WebKit a clicked button
 * takes no focus, so reka records the nearest focusable ancestor as the trigger (a
 * figure plate, a section), and the bare focus scrolls the page to it on every close.
 * Glass owns the return instead: the same element, with `preventScroll`. A consumer
 * that cancels the event (its own `@close-auto-focus` runs first) keeps its say.
 */
export function returnFocusQuietly(trigger: () => HTMLElement | null | undefined) {
    return (event: Event): void => {
        if (event.defaultPrevented) return;
        event.preventDefault();
        trigger()?.focus({ preventScroll: true });
    };
}
