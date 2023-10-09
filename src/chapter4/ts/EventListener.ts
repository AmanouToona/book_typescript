type Listners = {
    [id: string]: {
        event: string,
        element: HTMLElement,
        handler: (e: Event) => void
    }
}

export class EventListener {
    private readonly listeners: Listners = {};

    public add(listenerId: string, event: string, element: HTMLElement, handler: (e: Event) => void) {
        this.listeners[listenerId] = {
            event,
            element,
            handler
        }
        element.addEventListener(event, handler);
    };

    public remove(listenerId: string) {
        const listner = this.listeners[listenerId];

        if (!listner) return;

        listner.element.removeEventListener(listner.event, listner.handler)

        delete this.listeners[listenerId]
    }
}
