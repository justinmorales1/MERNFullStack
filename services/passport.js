const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');



const User = mongoose.model('users');

//Seralize the users unique id that's created by mongo. It is not the same as the google id.
passport.serializeUser((user, done)=> {
    //First param would be for handling errors for done. User.id is going
    // to be used to identify users for follow up requests.
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user)=> {
        done(null,user);
    })
});

//http://localhost:5000/auth/google
//This code configures passport
passport.use(new GoogleStrategy({
    clientID : keys.googleClientID,
    clientSecret: keys.googleSecretID,
    callbackURL: '/auth/google/callback',
    proxy: true
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

