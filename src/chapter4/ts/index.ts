import { EventListener } from './EventListener';
import { Task, Status, statusMap } from './Task';
import { TaskCollection } from './TaskCollection';
import { TaskRender } from './TaskRender';

class Application {
    private readonly eventListner = new EventListener();
    private readonly taskCollection = new TaskCollection();
    private readonly taskRender = new TaskRender(
        document.getElementById('todoList') as HTMLElement,
        document.getElementById('doingList') as HTMLElement,
        document.getElementById('doneList') as HTMLElement
    );

    start() {
        const taskItems = this.taskRender.renderAll(this.taskCollection);
        const createForm = document.getElementById('createForm') as HTMLElement;
        const deleteAllDoneTaskButtom = document.getElementById('deleteAllDoneTask') as HTMLElement;

        taskItems.forEach(({ task, deleteButtonEl }) => {
            this.eventListner.add('click', deleteButtonEl, () => this.handleClickDeleteTask(task), task.id)
        })

        this.eventListner.add('submit', createForm, this.handleSubmit);
        this.eventListner.add('click', deleteAllDoneTaskButtom, this.handleClickDeleteAllDoneTask);
        this.taskRender.subscribeDragAndDrop(this.handleDropAndDrop);
    }

    handleSubmit = (e: Event) => {
        e.preventDefault();

        const titleInput = document.getElementById('title') as HTMLInputElement;

        if (!titleInput.value) return;

        const task = new Task({ title: titleInput.value });
        this.taskCollection.add(task);
        const deleteButtonEl = this.taskRender.append(task);

        this.eventListner.add('click', deleteButtonEl, () => this.handleClickDeleteTask(task), task.id);

        titleInput.value = '';

    };

    handleClickDeleteAllDoneTask = () => {
        if (!window.confirm('DONEのタスクを一括削除しますか?')) return;

        const doneTasks = this.taskCollection.filter(statusMap.done);

        doneTasks.forEach((task) => this.executeDeleteTask(task));

    };

    private executeDeleteTask = (task: Task) => {
        this.eventListner.remove(task.id);
        this.taskCollection.delete(task);
        this.taskRender.remove(task);
    }


    private handleClickDeleteTask = (task: Task) => {
        if (!window.confirm(`[${task.title}] を削除しますか?`)) return;

        this.executeDeleteTask(task);
        console.log(this.taskCollection);
    }

    private handleDropAndDrop = (el: Element, sibling: Element | null, newStatus: Status) => {
        const taskId = this.taskRender.getId(el);

        if (!taskId) return;

        const task = this.taskCollection.find(taskId);
        if (!task) return;

        task.update({ status: newStatus });
        this.taskCollection.update(task);

        console.log('sibling is ', sibling);

        if (sibling) {
            const nextTaskId = this.taskRender.getId(sibling);

            if (!nextTaskId) return;

            const nextTask = this.taskCollection.find(nextTaskId);

            if (!nextTask) return;

            this.taskCollection.moveAboveTarget(task, nextTask);
        } else {
            this.taskCollection.moveToLast(task);
        }

    };
}



window.addEventListener('load', () => {
    const app = new Application();
    app.start();
})
