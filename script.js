let taskIdCounter = 1;

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskContainer = document.querySelector('.task-container.active');

    if (taskInput.value.trim() !== '' && taskContainer) {
        const taskId = `task-${taskIdCounter++}`;
        const taskElement = createTaskElement(taskId, taskInput.value);
        taskContainer.appendChild(taskElement);

        // Update task position in the container
        updateTaskPositions(taskContainer);
        taskInput.value = '';
    }
}

function createTaskElement(id, content) {
    const taskElement = document.createElement('div');
    taskElement.id = id;
    taskElement.className = 'task';
    taskElement.draggable = true;
    taskElement.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        editTask(taskElement);
    });

    taskElement.appendChild(editButton);

    const contentElement = document.createElement('div');
    contentElement.className = 'task-content';
    contentElement.textContent = content;

    taskElement.appendChild(contentElement);

    return taskElement;
}

function editTask(taskElement) {
    const contentElement = taskElement.querySelector('.task-content');
    const newContent = prompt('Edit task:', contentElement.textContent);

    if (newContent !== null) {
        contentElement.textContent = newContent;
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(taskId);
    const taskContainer = event.target.closest('.task-container');

    // Prevent dropping inside the task container itself
    if (taskContainer && !taskContainer.contains(draggedElement)) {
        taskContainer.appendChild(draggedElement);

        // Update task position in the container
        updateTaskPositions(taskContainer);
    }
}

function updateTaskPositions(container) {
    const tasks = container.querySelectorAll('.task');
    tasks.forEach((task, index) => {
        task.querySelector('.task-content').textContent = `Task ${index + 1}`;
    });
}

// Toggle active class for task containers
document.querySelectorAll('.task-container').forEach(container => {
    container.addEventListener('click', () => {
        document.querySelectorAll('.task-container').forEach(c => c.classList.remove('active'));
        container.classList.add('active');
    });
});

// Set default active container
document.querySelector('.task-container').classList.add('active');
window.onbeforeunload = function() {
    return "Are you sure you want to leave?";
};
