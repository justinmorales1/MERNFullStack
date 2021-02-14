const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const requirelogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
     app.post('/api/surveys', requirelogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;


        const survey = new Survey({
            title,
            body,
            subject,
            recipients : recipients.split(',').map((email) => {
                return { email: email.trim() };
            }),
            _user : req.user.id,
            dateSent: Date.now(),
        })

        //Send the email from here.
        const mailer = new Mailer(survey, surveyTemplate(survey));
        await mailer.send();


    });
};