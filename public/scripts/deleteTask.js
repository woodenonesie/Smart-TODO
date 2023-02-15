$(document).ready(function () {
  //listener for click event
  $(".fa-circle-xmark").on("click", function (event) {
    event.preventDefault();

    const taskId = $(this).data("taskId");

    $.ajax({
      url:`http://localhost:8080/api/tasks//delete/${taskId}`,
      method: 'POST'
    })
      .then(loadTasks) //function from client.js
      .fail(handleServerError)
  });
});
