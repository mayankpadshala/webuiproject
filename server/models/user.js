const mongoose = require('mongoose');
var validate = require("mongoose-validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

var validateEmail = function(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const AppUserSchema = new Schema({
    fname: {
		type: String,
		required: [true, "First Name is required"]
	},
	lname: {
		type: String,
		required: [true, "Last Name is required"]
	},
    username: {
		type: String,
		required: [true, "Username is required"],
		trim: true,
		lowercase: true,
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Email address is required"],
		trim: true,
		lowercase: true,
		unique: true,
		validate: [validateEmail, "Please fill a valid email address"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
});
AppUserSchema.pre("save", function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});

const User = mongoose.model("appuser", AppUserSchema);

module.exports = User;
