import { EventListener } from './EventListener';
import { Task } from './Task';
import { TaskCollection } from './TaskCollection';
import { TaskRender } from './TaskRender';

class Application {
    private readonly eventListner = new EventListener();
    private readonly taskCollection = new TaskCollection();
    private readonly taskRender = new TaskRender(document.getElementById('todoList') as HTMLElement);

    start() {
        const createForm = document.getElementById('createForm') as HTMLElement;
        this.eventListner.add('submit-handler', 'submit', createForm, this.handleSubmit);
    }

    handleSubmit = (e: Event) => {
        e.preventDefault();

        const titleInput = document.getElementById('title') as HTMLInputElement;

        if (!titleInput.value) return;

        const task = new Task({ title: titleInput.value });
        this.taskCollection.add(task);
        this.taskRender.append(task);

        titleInput.value = '';

    };
}



window.addEventListener('load', () => {
    const app = new Application();
    app.start();
})
