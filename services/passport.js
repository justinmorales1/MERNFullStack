const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');


const User = mongoose.model('users');

//This code configures passport
passport.use(new GoogleStrategy({
    clientID : keys.googleClientID,
    clientSecret: keys.googleSecretID,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    new User({googleId: profile.id }).save();
}));

// mongodb+srv://jmora260:<password>@surveyme.dsyiu.mongodb.net/<dbname>?retryWrites=true&w=majority

// mongodb+srv://jmora260:<password>@surveyme.dsyiu.mongodb.net/<dbname>?retryWrites=true&w=majority