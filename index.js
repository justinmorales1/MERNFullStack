const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');


// const authRoutes = require('./routes/authRoutes');

const app = express();

//Used to parse incoming request bodies in a middleware before the handlers.
app.use(
    bodyParser.json()
);

mongoose.connect(keys.mongoURI);
// authRoutes(app);

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


//These are returning a function thats why we can immediately return require.
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// VERY IMPORTANT - Handle production data for the assets and index.html
if (process.env.NODE_ENV === 'production') {
    //Express will serve up the productions assets likes main.js or main.css
    app.use(express.static('client/build'));

    //Express will serve index.html file if express doesnt understand the route.
    const path = require('path');
    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}





const PORT = process.env.PORT || 5000;

app.listen(PORT);