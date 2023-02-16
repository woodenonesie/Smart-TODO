let renderTasks = function(tasks) {
  $('#task-container').empty(); //add id to the section
  // loops through tasks
  for (const task of tasks) {
    // calls createTaskElement for each task
    const newTask = createTaskElement(task); //createTaskElement.js
    // takes return value and appends it to the task container
    $('#task-container').append(newTask);
  }
};
