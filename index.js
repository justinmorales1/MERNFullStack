const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

// const authRoutes = require('./routes/authRoutes');

const app = express();

mongoose.connect(keys.mongoURI);
// authRoutes(app);
require('./routes/authRoutes')(app);




const PORT = process.env.PORT || 5000;

app.listen(PORT);