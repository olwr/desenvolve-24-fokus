// Selectors
const newTaskButton = document.querySelector('.app__button--add-task');
const newTaskForm = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTasks = document.querySelector('.app__section-task-list');
const cancelBtn = document.querySelector('.app__form-footer__button--cancel');
const pDescTask = document.querySelector('.app__section-active-task-description');
const removeCompletedBtn = document.querySelector('#btn-remover-concluidas');
const removeAllBtn = document.querySelector('#btn-remover-todas');

// Tasks List
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTask = null;
let liSelectedTask = null;


// Functions
function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask() {
    textArea.value = '';
    newTaskForm.classList.add('hidden');
}

function createElementTask(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `

    const p = document.createElement('p');
    p.classList.add('app__section-task-list-item-description');
    p.textContent = task.desc;

    const button = document.createElement('button');
    button.classList.add('app_button-edit');

    button.onclick = () => {
        const newDesc = prompt('Qual é o novo nome da tarefa?');
        if (newDesc) {
            p.textContent = newDesc;
            task.desc = newDesc;
            updateTasks();
        }

    }

    const btnImg = document.createElement('img');
    btnImg.setAttribute('src', '/imagens/edit.png');

    button.append(btnImg);
    li.append(svg, p, button);

    if (task.complete) {
        li.classList.add('app__section-task-list-item-complete');
        button.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(element => {
                    element.classList.remove('app__section-task-list-item-active');
                });
    
            if (selectedTask == task) {
                pDescTask.textContent = '';
                selectedTask = null;
                liSelectedTask = null;
                return;
            }
    
            selectedTask = task;
            liSelectedTask = li;
            pDescTask.textContent = task.desc;
            li.classList.add('app__section-task-list-item-active');
        };
    }

    return li;
}

// Events
newTaskButton.addEventListener('click', () => {
    newTaskForm.classList.toggle('hidden');
});

newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
        desc: textArea.value
    }

    tasks.push(task);
    const taskElement = createElementTask(task);

    ulTasks.append(taskElement);
    updateTasks();

    clearTask();
});

cancelBtn.addEventListener('click', () => {
    clearTask();
});

tasks.forEach(task => {
    const taskElement = createElementTask(task);
    ulTasks.append(taskElement);
});

document.addEventListener('finishedFocus', () => {
    if (selectedTask && liSelectedTask) {
        liSelectedTask.classList.remove('app__section-task-list-item-active');
        liSelectedTask.classList.add('app__section-task-list-item-complete');
        liSelectedTask.querySelector('button').setAttribute('disabled', 'disabled');

        selectedTask.complete = true;
        updateTasks();
    }
});

const removeTasks = (onlyCompleted) => {
    const selector = onlyCompleted ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
    document.querySelectorAll(selector).forEach( element => {
        element.remove();
    });

    tasks = onlyCompleted ? tasks.filter(task => !task.complete) : [];
    updateTasks();
}

removeCompletedBtn.onclick = () => removeTasks(true);
removeAllBtn.onclick = () => removeTasks(false);