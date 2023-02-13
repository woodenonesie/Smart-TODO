// Client facing scripts here
$(document).ready(() => {
////WELCOME PAGE
// HIDE REGISTER AND LOGIN FORMS
  $('.sig-form').hide()
  $('.reg-form').hide()
});

// SLIDE TOGGLES FOR REGISTER AND LOGIN
$('.sig').click(function() {
  $('.sig-form').slideDown(600)
  $('.reg-form').hide()
});
$('.reg').click(function() {
  $('.reg-form').slideDown(600)
  $('.sig-form').hide()
});

////HOME PAGE
// SLIDE TOGGLE FOR NEW TASK INPUT
$('#new-task-plus').click(function() {
  $('.taskForm').slideToggle(400)
})

// SLIDE TOGGLE FOR CHANGING CATEGORY (ON FOLDER ICON)
$("#folder").click(function () {
  $("#myDropdown").slideToggle(400);
});

// IF CLICKED ON STAR ICON, CHANGE COLOR
$("#star").click(function () {
  $(this).toggleClass("clicked");
});



