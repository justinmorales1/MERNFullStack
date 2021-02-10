const passport = require('passport');


module.exports = (app) => {

    // Make a request to Google to get authorized.
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));


    // Call back route for when user grants or declines permissions.
    app.get('/auth/google/callback', passport.authenticate('google'))

}