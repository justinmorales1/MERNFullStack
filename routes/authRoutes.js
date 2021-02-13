const passport = require('passport');


module.exports = (app) => {

    // Make a request to Google to get authorized.
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));


    // Call back route for when user grants or declines permissions.
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys')
        }
    );


    app.get('/api/logout',(req, res)=> {
        req.logout();
        res.redirect('/')
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};