export function useLeaveTimer(delay = 250) {
    let timer: ReturnType<typeof setTimeout> | null = null;

    function schedule(callback: () => void) {
        cancel();
        timer = setTimeout(callback, delay);
    }

    function cancel() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    return { schedule, cancel };
}
