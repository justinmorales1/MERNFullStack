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





const PORT = process.env.PORT || 5000;

app.listen(PORT);