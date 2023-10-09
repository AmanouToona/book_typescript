import { EventListener } from './EventListener';

class Application {
    start() {
        const eventlistener = new EventListener();
        const button = document.getElementById('deleteAllDoneTask');

        if (!button) return;

        eventlistener.add(
            'sample',
            'click',
            button,
            () => alert('clicked')
        )

        eventlistener.remove('sample');
    }
}



window.addEventListener('load', () => {
    const app = new Application();
    app.start();
})