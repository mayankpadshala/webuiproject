const KEYS = require("./keys");
// const mongoose = require("mongoose");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const opts = {}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = KEYS.SECRET_OR_KEY;

module.exports = passport => {
    passport.use(
        'jwt',
        new jwtStrategy(opts,(jwtPayload, done) => {
            User.findById(jwtPayload.id)
            .then((user) => {
                if(user){
                    // console.log('user found in db in passport file');
                    return done(null, user)
                }
                console.log('user NOT found in db in passport file');
                return done(null, false)
            })
            .catch((err) => {
                console.log("passport err",err);
                done(err);
            })
        })
    )
}