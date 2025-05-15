document.addEventListener('DOMContentLoaded', () => {  
  const taskInput = document.getElementById('task-input');  
  const dueDateInput = document.getElementById('due-date');  
  const priorityLevelSelect = document.getElementById('priority-level');  
  const addTaskButton = document.getElementById('add-task-button');  
  const taskList = document.getElementById('task-list');  
  const progressBar = document.getElementById('progress-bar').querySelector('.inner-bar');  
  const progressNumbers = document.getElementById('progress-numbers');  
  const searchInput = document.getElementById('search-input');  
  const logoutButton = document.getElementById('logout-button');  

  // Add a new task  
  function addTask() {  
    const taskText = taskInput.value.trim();  
    const dueDate = dueDateInput.value;  
    const priorityLevel = priorityLevelSelect.value;  

    if (taskText === '' || dueDate === '') {  
      alert('Please enter a task and a due date!');  
      return;  
    }  

    const listItem = document.createElement('li');  
    listItem.className = priorityLevel;  

    listItem.innerHTML = `  
      <input type="checkbox" />  
      <span class="task-text">${taskText}</span>  
      <span class="due-date">${dueDate}</span>  
      <span class="priority">${priorityLevel.charAt(0).toUpperCase() + priorityLevel.slice(1)}</span>  
      <div class="task-buttons">  
        <button class="edit-btn" aria-label="Edit this task"><i class="fas fa-edit"></i> Edit</button>  
        <button class="delete-btn" aria-label="Delete this task"><i class="fas fa-trash"></i> Delete</button>  
      </div>  
    `;  

    taskList.appendChild(listItem);  
    taskInput.value = '';  
    dueDateInput.value = '';  
    priorityLevelSelect.value = 'low';  
    updateProgress();  
  }  

  // Filter tasks by search input  
  function filterTasks() {  
    const searchTerm = searchInput.value.toLowerCase();  
    const tasks = taskList.getElementsByTagName('li');  

    for (let task of tasks) {  
      const taskText = task.querySelector('.task-text').innerText.toLowerCase();  
      task.style.display = taskText.includes(searchTerm) || searchTerm === '' ? 'flex' : 'none';  
    }  
  }  

  // Update progress bar  
  function updateProgress() {  
    const totalTasks = taskList.children.length;  
    const completedTasks = [...taskList.children].filter(t => t.querySelector('input[type="checkbox"]').checked).length;  

    progressBar.style.width = totalTasks === 0 ? '0' : `${(completedTasks / totalTasks) * 100}%`;  
    progressNumbers.innerText = `${completedTasks}/${totalTasks}`;  
  }  

  // Handle task buttons and checkbox events  
  taskList.addEventListener('click', (event) => {  
    if (event.target.classList.contains('delete-btn')) {  
      event.target.closest('li').remove();  
      updateProgress();  
    } else if (event.target.classList.contains('edit-btn')) {  
      const listItem = event.target.closest('li');  
      taskInput.value = listItem.querySelector('.task-text').innerText;  
      dueDateInput.value = listItem.querySelector('.due-date').innerText;  
      priorityLevelSelect.value = listItem.className;  
      listItem.remove();  
      updateProgress();  
    } else if (event.target.type === 'checkbox') {  
      updateProgress();  
    }  
  });  

  addTaskButton.addEventListener('click', addTask);  

  taskInput.addEventListener('keypress', (event) => {  
    if (event.key === 'Enter') addTask();  
  });  

  searchInput.addEventListener('input', filterTasks);  

  logoutButton?.addEventListener('click', () => {  
    alert('Logging out...');  
    window.location.href = "index.html";  
  });  
});