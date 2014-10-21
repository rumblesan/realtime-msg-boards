
// onready function
declare function $(
    callback: Function
): void;

// CSS selector
declare function $<E>(cssSelector: string): KiContainer<E>;

interface KiContainer<E> {
    [index: number]: E;
    on(eventName: string, callback: (e: Event) => void): void;
    off(eventName: string, callback: (e: Event) => void): void;
    each<R>(func: Function): KiContainer<R>;
}

