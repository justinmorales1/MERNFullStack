const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');


const User = mongoose.model('users');
//http://localhost:5000/auth/google
//This code configures passport
passport.use(new GoogleStrategy({
    clientID : keys.googleClientID,
    clientSecret: keys.googleSecretID,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then((existingUser)=> {
       if(existingUser) {
           // There is already a record for the profile id.
            done(null, existingUser);
       } else {
           // No user record for the id exists
           new User({googleId: profile.id }).save().then((user)=> {
               done(null, user);
           });
       }
    });

}));

