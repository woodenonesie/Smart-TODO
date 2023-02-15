$(document).ready(function () {
  //listener for click event
  $(".fa-folder").on("click", function (event) {
    event.preventDefault();
    $(".dropdown-content").slideToggle("slow");
  });
});
