//checks if form is not empty. Returns true if form is empty
const isFormEmpty = function(data) {
  let errorMessage = "";
  if (data.length === 0 || data === null) {
    errorMessage = "Can not submit empty form";
  }

  if (errorMessage) {
    return true;
  }
  return false;
};
