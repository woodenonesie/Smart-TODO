$('.reg-form').on('submit', function(e) {
  e.preventDefault();
  console.log("I am here");
  // Send a POST request to the backend
  $.ajax({
    url: '/register',
    method: 'POST',
    data: $(this).serialize(),
    success: function(response) {

      alert(response.message);
    },
    error: function(error) {

      alert(error.responseJSON.message);
    }
  });
});
