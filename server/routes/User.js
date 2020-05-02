const express = require("express");
const UserRoutes = express.Router();
const User = require("../models/user");
const validator = require("../validators/validators");
const bcrypt = require("bcryptjs");

// ====================== GET ========================================
UserRoutes.get("/all", async (req, res, next) => {
    try {
        let allUsers = await User.find({});
        res.status(200).send(allUsers);
    } catch (error) {
        next(error)
    }
})
UserRoutes.get("/id/:id", async (req, res, next) => {
    try {
        let user = await (await User.findById(req.params.id));
        res.status(200).send(user);
    } catch (error) {
        next(error)
    }
})

UserRoutes.get("/username/:username", async (req, res, next) => {
    try {
        let user = await (await User.findOne({"username":req.params.username}));
        res.status(200).send(user);
    } catch (error) {
        next(error)
    }
})
// ====================== POST ========================================
UserRoutes.post("/signup", async (req, res, next) => {
    User.create(req.body).then(function(users){
        res.status(200).send(users);
    }).catch(next);
})

UserRoutes.post("/login", async (req, res, next) => {
    const {errors, isValid} = validator.loginValidator(req.body);
    if(!isValid){
        next(errors);
    }else{
        User.findOne({ email: req.body.email })
        .then((user) => {
            // console.log('user',user);
            if(!user){
                next({email : "email doesn't exist!!"})
            }else{
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch=>{
                        if(!isMatch){
                            next({password : "password doesn't match!!"})
                        }else{
                            res.status(200).send(user);
                        }
                    })
            }
        }).catch(next);
    }
})

// ====================== PUT ========================================

UserRoutes.put("/update", async (req, res, next) => {
    try {
        let updatedUser = await User.findByIdAndUpdate(
            req.body.id
        ,{
            $set:req.body.update
        },{
            new:true
        })
        res.status(200).send(updatedUser);
    } catch (error) {
        next(error)
    }
})

// ====================== DELETE ========================================

UserRoutes.delete("/delete/:id", async (req, res, next) => {
    try {
        await User.remove({_id:req.params.webinarId});
        res.status(200).send("deleted...");
    } catch (error) {
        next(error)
    }
})

module.exports = UserRoutes;