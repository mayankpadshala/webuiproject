const mongoose = require("mongoose");
const isEmpty = require("is-empty");
const validator = require("validator");

module.exports.loginValidator = (loginValidator) = function validateLoginInput(data){
    const errors = {}
    data.email = !(isEmpty(data.email)) ? data.email : "";
    data.password = !(isEmpty(data.password)) ? data.password : "";

    if(validator.isEmpty(data.email)){
        errors.email = "Email is required!!"
    }
    if(validator.isEmpty(data.password)){
        errors.password = "Password is required!!"
    }
    if(!validator.isEmail(data.email)){
        errors.email = "Please provide valid email ID!!"
    }

    return{
        errors:errors,
        isValid: isEmpty(errors)
    }
}