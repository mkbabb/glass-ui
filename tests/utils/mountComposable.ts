import { createApp, defineComponent, h } from "vue";

export function mountComposable<T>(factory: () => T): {
    result: T;
    unmount: () => void;
} {
    let result: T | undefined;
    const host = document.createElement("div");
    document.body.appendChild(host);

    const app = createApp(
        defineComponent({
            setup() {
                result = factory();
                return () => h("div");
            },
        }),
    );

    app.mount(host);

    return {
        result: result as T,
        unmount: () => {
            app.unmount();
            host.remove();
        },
    };
}
