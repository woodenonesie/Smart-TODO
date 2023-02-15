$(document).ready(function () {
  //listener for click event
  $(".dropdown-element").on("click", function (event) {
    event.preventDefault();

    const newCategory = $(this).text();
    const taskId = $(this).data("taskId");

    $.ajax({
      url:`http://localhost:8080/api/tasks/change/${taskId}`,
      method: 'POST',
      data: JSON.stringify({newCategory}),
      dataType: 'json',
      contentType: 'application/json',
    })
      .then(loadTasks) //function from client.js
      .fail(handleServerError)
  });
});
