//checks if form is not empty. Returns true if form is empty
const isFormEmpty = function(data) {
  let errorMessage = "";
  if (data.length === 0 || data === null) {
    errorMessage = "Can not submit empty form";
  }
  //error message appearing as a placeholder
  $('<input>').attr("placeholder", "Form can not be empty")

  if (errorMessage) {
    return true;
  }
  return false;
};
