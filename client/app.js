document.addEventListener('DOMContentLoaded', () => {  
    const taskInput = document.getElementById('task-input');  
    const dueDateInput = document.getElementById('due-date');  
    const priorityLevelSelect = document.getElementById('priority-level');  
    const addTaskButton = document.getElementById('add-task-button');  
    const taskList = document.getElementById('task-list');  
    const emptyImage = document.querySelector('.empty-image');  
    const progressBar = document.getElementById('progress-bar').querySelector('.inner-bar');  
    const progressNumbers = document.getElementById('progress-numbers');  
    const searchInput = document.getElementById('search-input');  
    
    // Function to add a new task  
    function addTask() {  
        const taskText = taskInput.value.trim();  
        const dueDate = dueDateInput.value;  
        const priorityLevel = priorityLevelSelect.value;  

        if (taskText === '' || dueDate === '') {  
            alert('Please enter a task and a due date!');  
            return;  
        }  

        const listItem = document.createElement('li');  
        listItem.className = priorityLevel; // Assign class based on priority  

        listItem.innerHTML = `  
            <input type="checkbox">  
            <span class="task-text">${taskText}</span>  
            <span class="due-date">${dueDate}</span>  
            <span class="priority">${priorityLevel.charAt(0).toUpperCase() + priorityLevel.slice(1)}</span>  
            <div class="task-buttons">  
                <button class="edit-btn"><i class="fas fa-edit"></i></button>  
                <button class="delete-btn"><i class="fas fa-trash"></i></button>  
            </div>  
        `;  

        taskList.appendChild(listItem);  
        taskInput.value = '';  
        dueDateInput.value = '';  
        priorityLevelSelect.value = 'low'; // Reset to default  
        emptyImage.style.display = 'none';  
        updateProgress();  
        toggleEmptyState();  
        saveTasksToLocalStorage();  
    }  

    // Function to filter tasks based on search input  
    function filterTasks() {  
        const searchTerm = searchInput.value.toLowerCase();  
        const tasks = taskList.getElementsByTagName('li');  

        for (let task of tasks) {  
            const taskText = task.querySelector('.task-text').innerText.toLowerCase();  
            const isMatching = taskText.includes(searchTerm);  
            task.style.display = isMatching || searchTerm === '' ? 'flex' : 'none';  
        }  

        toggleEmptyState();  
    }  

    // Function to update the empty state  
    function toggleEmptyState() {  
        if (taskList.children.length === 0) {  
            emptyImage.style.display = 'block';  
        } else {  
            emptyImage.style.display = 'none';  
        }  
    }  

    // Function to update progress  
    function updateProgress() {  
        const totalTasks = taskList.children.length;  
        const completedTasks = [...taskList.children].filter(task => task.querySelector('input[type="checkbox"]').checked).length;  

        progressBar.style.width = totalTasks === 0 ? '0' : `${(completedTasks / totalTasks) * 100}%`;  
        progressNumbers.innerText = `${completedTasks}/${totalTasks}`;  
    }  

    // Function to save tasks to local storage  
    function saveTasksToLocalStorage() {  
        const tasks = [];  
        [...taskList.children].forEach(task => {  
            tasks.push({  
                text: task.querySelector('.task-text').innerText,  
                dueDate: task.querySelector('.due-date').innerText,  
                priority: task.className,  
                completed: task.querySelector('input[type="checkbox"]').checked  
            });  
        });  
        localStorage.setItem('tasks', JSON.stringify(tasks));  
    }  

    // Loading tasks from local storage  
    function loadTasksFromLocalStorage() {  
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];  
        tasks.forEach(task => {  
            const listItem = document.createElement('li');  
            listItem.className = task.priority;  
            listItem.innerHTML = `  
                <input type="checkbox" ${task.completed ? 'checked' : ''}>  
                <span class="task-text">${task.text}</span>  
                <span class="due-date">${task.dueDate}</span>  
                <span class="priority">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>  
                <div class="task-buttons">  
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>  
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>  
                </div>  
            `;  

            taskList.appendChild(listItem);  
        });  
        toggleEmptyState();  
        updateProgress();  
    }  

    // Event listeners for tasks  
    taskList.addEventListener('click', (event) => {  
        if (event.target.classList.contains('delete-btn')) {  
            event.target.closest('li').remove();  
            toggleEmptyState();  
            updateProgress();  
            saveTasksToLocalStorage();  
        }  

        if (event.target.classList.contains('edit-btn')) {  
            const listItem = event.target.closest('li');  
            taskInput.value = listItem.querySelector('.task-text').innerText;  
            dueDateInput.value = listItem.querySelector('.due-date').innerText;  
            priorityLevelSelect.value = listItem.className; // Set priority level  
            listItem.remove();  
            toggleEmptyState();  
            updateProgress();  
            saveTasksToLocalStorage();  
        }  

        if (event.target.type === 'checkbox') {  
            updateProgress();  
            saveTasksToLocalStorage();  
        }  
    });  

    addTaskButton.addEventListener('click', addTask);  
    taskInput.addEventListener('keypress', (event) => {  
        if (event.key === 'Enter') {  
            addTask();  
        }  
    });  

    loadTasksFromLocalStorage();  
});