// E-7 fixture tree (clean): the register's owner is the one writer of each engagement attribute (CK-08):
// data-engaged, data-held, data-press and the commit attribute.
export function stampEngaged(el: HTMLElement, held: boolean): void {
    if (held) el.dataset.engaged = "";
    else delete el.dataset.engaged;
}
export function stampHeld(el: HTMLElement, hand: string | null): void {
    if (hand) el.dataset.held = hand;
    else delete el.dataset.held;
}
export function stampPress(el: HTMLElement, on: boolean): void {
    el.toggleAttribute("data-press", on);
}
export function stampCommit(el: HTMLElement): void {
    el.dataset.commit = el.dataset.commit === "a" ? "b" : "a";
}
