//after pressing submit, valid task adds to the page
$(document).ready(function () {
  //listener for submit event
  $("form").on("submit", function (event) {
    //prevents default behevior
    event.preventDefault();
    //serializing data so we can pass it to the server
    const data = $(this).serialize();
    //
    const task = $("textarea").val();
    //checking if task is not empty. Returns true if error occurs
    const isFormEmpty = isFormEmpty(task); //scripts/isFormEmpty.js
    //posts data from form to /api/tasks/create
    if (!invalidTweet) {
      $.ajax('http://localhost:8080/api/tasks/create', {
        method: 'POST',
        data
      })
        .then(loadTasks) //function from client.js
        .done(clearForm)
        .fail(handleServerError) //handleServerError.js
    }
  });
});
