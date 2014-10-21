
// onready function
declare function $(
    callback: Function
): void;

// CSS selector
declare function $(cssSelector: string): KiContainer;

interface KiContainer {
    on(eventName: string, callback: (e: Event) => void)
    off(eventName: string, callback: (e: Event) => void)
    each(element: HTMLScriptElement, i: number)
}

