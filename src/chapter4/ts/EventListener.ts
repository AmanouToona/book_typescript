import { v4 as uuid } from 'uuid';

type Handler<T> = T extends keyof HTMLElementEventMap ? (e: HTMLElementEventMap[T]) => void : (e: Event) => void;

type Listners = {
    [id: string]: {
        event: string,
        element: HTMLElement,
        handler: Handler<string>
    }
}

export class EventListener {
    private readonly listeners: Listners = {};

    public add<T extends string>(event: T, element: HTMLElement, handler: Handler<T>, listenerId = uuid()) {
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
