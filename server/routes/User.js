const express = require("express");
const UserRoutes = express.Router();
const User = require("../models/user");
const KEYS = require("../config/keys");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const validator = require("../validators/validators");
// const { singleFileUpload } = require("../helper/singleFileUpload");
const mongoose = require("mongoose");

// ====================== GET ========================================
UserRoutes.get("/all", async (req, res, next) => {
	try {
		let allUsers = await User.find({});
		res.status(200).send(allUsers);
	} catch (error) {
		next(error);
	}
});
UserRoutes.get("/id/:id", async (req, res, next) => {
	try {
		let user = await User.findById(req.params.id);
		let data = {
			email: user.email,
			id: user.id,
			name: user.name,
		}
		res.status(200).send(data);
	} catch (error) {
		next(error);
	}
});

UserRoutes.get("/loggedInUser", async (req, res, next) => {
	try {
		passport.authenticate("jwt", { session: false }, (err, user, info) => {
			if (err) {
				next(err);
			} else if (info != undefined) {
				next(info.message);
			} else {
				let data = {
					email: user.email,
					id: user.id,
					name: user.name,
				}
				res.status(200).send(data);
			}
		})(req, res, next);
	} catch (error) {
		next(error);
	}
});
// ====================== POST ========================================
UserRoutes.post("/signup", async (req, res, next) => {
	try {
		let user = await User.create(req.body);
		const payload = {
			id: user.id,
		};
		jwt.sign(
			payload,
			KEYS.SECRET_OR_KEY,
			{
				expiresIn: 2155926
			},
			(err, token) => {
				if (err) {
					next(err);
				} else {
					res.json({
						email: user.email,
						id: user.id,
						name: user.name,
						token: token
					});
				}
			}
		);
		// res.status(200).send(newUser);
	} catch (error) {
		next(error);
	}
});

UserRoutes.post("/login", async (req, res, next) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (!user) {
			next("email doesn't exist!!");
		} else {
			bcrypt
				.compare(req.body.password, user.password)
				.then(isMatch => {
					if (!isMatch) {
						next("password doesn't match!!");
					} else {
						const payload = {
							id: user.id,
						};
						jwt.sign(
							payload,
							KEYS.SECRET_OR_KEY,
							{
								expiresIn: 2155926
							},
							(err, token) => {
								res.json({
									email: user.email,
									id: user.id,
									name: user.name,
									token: token
								});
							}
						);
					}
				});
		}
	} catch (error) {
		next(error);
	}
});

// ====================== PUT ========================================

UserRoutes.put("/update", (req, res, next) => {
	passport.authenticate(
		"jwt",
		{ session: false },
		async (err, user, info) => {
			if (err) {
				next(err);
			} else if (info != undefined) {
				next(info.message);
			} else {
				let updatedUser = await User.findByIdAndUpdate(
					user.id,
					{
						$set: req.body
					},
					{
						new: true
					}
				);
				let data = {
					email: updatedUser.email,
					id: updatedUser.id,
					name: updatedUser.name,
				}
				res.status(200).send(data);
			}
		}
	)(req, res, next);
});
UserRoutes.put("/updatePassword", async (req, res, next) => {
	try {
		passport.authenticate(
			"jwt",
			{ session: false },
			async (err, user, info) => {
				if (err) {
					next(err);
				} else if (info != undefined) {
					next(info.message);
				} else {
					let isMatch = await bcrypt.compare(
						req.body.currentPassword,
						user.password
					);
					if (isMatch) {
						bcrypt.hash(
							req.body.newPassword,
							10,
							async (err, hash) => {
								if (err) {
									return next(err);
								}
								// user.password = hash;
								let updatedUser = await User.findByIdAndUpdate(
									user.id,
									{
										$set: { password: hash }
									},
									{
										new: true
									}
								);
								res.status(200).send(updatedUser);
							}
						);
					} else {
						next("Password do not match");
					}
				}
			}
		)(req, res, next);
	} catch (error) {
		next(error);
	}
});
// ====================== DELETE ========================================

module.exports = UserRoutes;
