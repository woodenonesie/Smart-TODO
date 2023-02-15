let renderTasks; //used in client.js

// adds all tasks from database to the page
$(document).ready(function() {
  renderTasks = function(tasks) {
    $('#tasks-container').empty(); //add id to the section
    // loops through tasks
    for (const task of tasks) {
      // calls createTaskElement for each task
      const newTask = createTaskElement(task); //createTaskElement.js
      // takes return value and appends it to the task container
      $('#tasks-container').append(newTask);
    }
  };
});
