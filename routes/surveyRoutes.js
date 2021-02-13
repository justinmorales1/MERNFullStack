const requirelogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/surveys', requirelogin, (req, res) => {

    });





};