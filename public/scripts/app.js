// Client facing scripts here
$(document).ready(() => {
////WELCOME PAGE
// HIDE REGISTER AND LOGIN FORMS
  $('.sig-form').hide();
  $('.reg-form').hide();
  $(".taskForm").hide();
  $('#myDropdown').hide();
  $('.update').hide();
});

// SLIDE TOGGLES FOR REGISTER AND LOGIN
$('.sig').on('click', () => {
  $('.sig-form').slideDown(600)
  $('.reg-form').hide()
});
$('.reg').on('click', () => {
  $('.reg-form').slideDown(600)
  $('.sig-form').hide()
});

////HOME PAGE
// SLIDE TOGGLE FOR NEW TASK INPUT
$('#new-task-plus').on('click', () => {
  $('.taskForm').slideToggle(400)
})

// SLIDE TOGGLE FOR CHANGING CATEGORY (ON FOLDER ICON)
$("#folder").on('click', () => {
  $("#myDropdown").slideToggle(400);
});

// IF CLICKED ON STAR ICON, CHANGE COLOR
$("#star").on('click', () => {
  $("#star").toggleClass("clicked");
});

// SLIDE TOGGLE FOR NEW TASK FORM
$("#plusSign").on('click', () => {
  if ($('.update').is(':hidden')) {
    $(".taskForm").slideToggle();
  }
  $("#pushPlus").slideToggle(400);
  $('.update').hide();

});

// SLIDE TOGGLE FOR UPDATE PROFILE
$('#updateBt').on('click', () => {
  if ($('.update').is(':hidden')) {
    $("#pushPlus").slideUp();
    $(".taskForm").slideUp();
    $('.update').slideDown(400);
  }
})

// RESET NEW TASK FORM WHEN UPDATED PROFILE
$('.sub').on('submit', () => {
  $('.update').hide();
})

