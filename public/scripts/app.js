// Client facing scripts here
$(document).ready(() => {
  $('form').hide()
})
  $('.sig').click(function() {
    $('.sig-form').slideDown(600)
    $('.reg-form').hide()
  })
  $('.reg').click(function() {
    $('.reg-form').slideDown(600)
    $('.sig-form').hide()
  })

