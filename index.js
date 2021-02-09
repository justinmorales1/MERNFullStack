const express = require('express');

const app = express();

//Creating route handler and associating it with a given route

app.get('/', (req, res)=> {
    res.send({bye: 'buddy'});

});

const PORT = process.env.PORT || 5000;
app.listen(PORT);