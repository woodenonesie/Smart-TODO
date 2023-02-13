// Client facing scripts here
$(document).ready(() => {

  $("#folder").click(function() {
    $("#myDropdown").slideToggle(400);
  });

  $("#star").click(function() {
    $(this).toggleClass("clicked");
  });

  $("#plusSign").click(function() {
    $("#pushPlus").css('visibility','hidden');
    $(".taskForm").css('visibility', 'visible');
  });

});
