import { EventListener } from './EventListener';
import { Task, Status } from './Task';
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
        const createForm = document.getElementById('createForm') as HTMLElement;
        this.eventListner.add('submit-handler', 'submit', createForm, this.handleSubmit);
        this.taskRender.subscribeDragAndDrop(this.handleDropAndDrop);
    }

    handleSubmit = (e: Event) => {
        e.preventDefault();

        const titleInput = document.getElementById('title') as HTMLInputElement;

        if (!titleInput.value) return;

        const task = new Task({ title: titleInput.value });
        this.taskCollection.add(task);
        const deleteButtonEl = this.taskRender.append(task);

        this.eventListner.add(task.id, 'click', deleteButtonEl, () => this.handleClickDeleteTask(task));

        titleInput.value = '';

    };

    private handleClickDeleteTask = (task: Task) => {
        if (!window.confirm(`[${task.title}] を削除しますか?`)) return;

        this.eventListner.remove(task.id);
        this.taskCollection.delete(task);
        this.taskRender.remove(task);

        console.log(this.taskCollection);
    }

    private handleDropAndDrop = (el: Element, sibling: Element | null, newStatus: Status) => {
        const taskId = this.taskRender.getId(el);

        if (!taskId) return;

        const task = this.taskCollection.find(taskId);
        if (!task) return;

        task.update({ status: newStatus });
        this.taskCollection.update(task);

        console.log(sibling);

    };
}



window.addEventListener('load', () => {
    const app = new Application();
    app.start();
})
