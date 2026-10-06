// E-7 fixture tree (two-writers): the owner writes the attribute ...
export function stampEngaged(el: HTMLElement, held: boolean): void {
    if (held) el.dataset.engaged = "";
    else delete el.dataset.engaged;
}
