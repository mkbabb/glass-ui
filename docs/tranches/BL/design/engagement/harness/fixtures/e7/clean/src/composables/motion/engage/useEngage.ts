// E-7 fixture tree (clean): the register's owner is the one writer of data-engaged.
export function stampEngaged(el: HTMLElement, held: boolean): void {
    if (held) el.dataset.engaged = "";
    else delete el.dataset.engaged;
}
