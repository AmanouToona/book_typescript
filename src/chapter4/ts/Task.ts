import { v4 as uuid } from 'uuid'

export const statusMap = {
    Todo: 'TODO',
    Doing: 'DOING',
    Done: 'DONE',
};

export type Status = typeof statusMap[keyof typeof statusMap];

export class Task {
    readonly id
    title: string
    status

    constructor(properties: { title: string }) {
        this.id = uuid();
        this.title = properties.title;
        this.status = statusMap.Todo;
    }
};