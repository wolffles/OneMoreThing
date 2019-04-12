const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";

  if(Validator.isEmpty(data.title)) {
    errors.title = "title can't be blank";
  }
  if (Validator.isEmpty(data.body)) {
    errors.body = "body can't be blank";
  }
  return {
    errors, //errors: errors
    isValid: isEmpty(errors)
  };
}
