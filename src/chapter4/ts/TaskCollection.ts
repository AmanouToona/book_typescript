import { Task, Status, TaskObject } from './Task';

const STORAGE_KEY = 'TASKS';

export class TaskCollection {
    private readonly strage;
    private tasks

    constructor() {
        this.strage = localStorage;
        this.tasks = this.getStoredTasks();
    }

    private getStoredTasks(): Task[] {
        const jsonString = this.strage.getItem(STORAGE_KEY);

        if (!jsonString) return [];

        try {
            const storedTasks = JSON.parse(jsonString);

            assertIsTaskObject(storedTasks)  // 型を確認し、データが壊れていない場合は処理を継続。 壊れている場合は記録したタスクを削除する

            const tasks = storedTasks.map((task) => new Task(task));  // strange 保存時にはインスタンスになってしまうので、オブジェクトにする

            return tasks;
        } catch {
            this.strage.removeItems(STORAGE_KEY);
            return []
        }
    };

    moveAboveTarget(task: Task, target: Task) {
        const taskIndex = this.tasks.indexOf(task);
        const targetIndex = this.tasks.indexOf(target);

        this.changeOrder(task, taskIndex, taskIndex < targetIndex ? targetIndex - 1 : targetIndex);
    }

    moveToLast(task: Task) {
        const taskIndex = this.tasks.indexOf(task);
        this.changeOrder(task, taskIndex, this.tasks.length);
    }

    private changeOrder(task: Task, taskIndex: number, targetIndex: number) {
        this.tasks.splice(taskIndex, 1);
        this.tasks.splice(targetIndex, 0, task);
        this.updateStorage();
    };

    add(task: Task) {
        this.tasks.push(task);
        this.updateStorage();
    }

    delete(task: Task) {
        this.tasks = this.tasks.filter(({ id }) => id !== task.id);
        this.updateStorage();
    }

    find(id: string) {
        return this.tasks.find((task) => task.id === id)
    }

    update(task: Task) {
        this.tasks = this.tasks.map((item) => {
            if (item.id === task.id) return task;
            return item;
        })
    }

    filter(filterStatus: Status) {
        return this.tasks.filter(({ status }) => status === filterStatus);

    }

    updateStorage() {
        this.strage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    }
}

function assertIsTaskObject(value: any): asserts value is TaskObject[] {
    if (!Array.isArray(value) || !value.every((item) => Task.validate(item))) {
        throw new Error('引数 value は TaskObject[] 型と一致しません');
    }
}