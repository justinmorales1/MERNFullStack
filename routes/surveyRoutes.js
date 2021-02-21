const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');
//URL is a default library in node so you dont have to download it to the project dependencies.
const { URL } = require('url');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const requirelogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requirelogin, async (req, res) => {
       const surveys = await Survey.find({ _user: req.user.id})
           .select({ recipients: false});

       res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req,res) => {
        res.send("Thanks for voting");
    });

    // app.post('/api/surveys/webhooks', (req, res) => {
    //     const parser = new Path('/api/surveys/:surveyId/:choice');
    //     const events = _.map(req.body, ({email, url}) => {
    //
    //
    //        //We cant deconstruct matchedURL because it can return an object or null.
    //        const matchedURL = parser.test(new URL(url).pathname);
    //
    //        if( matchedURL) {
    //            return { email , surveyId: matchedURL.surveyId, choice: matchedURL.choice}
    //        }
    //     });
    //
    //     const compactEvent = _.compact(events);
    //     const uniqueEvents = _.uniqBy(compactEvent, 'email', 'surveyId');
    //
    //     console.log(uniqueEvents)
    //
    //     res.send({});
    //
    // });

    app.post('/api/surveys/webhooks', (req, res) => {
        const parser = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({email, url}) => {
                //We cant deconstruct matchedURL because it can return an object or null.
                const matchedURL = parser.test(new URL(url).pathname);

                if( matchedURL) {
                    return { email , surveyId: matchedURL.surveyId, choice: matchedURL.choice}
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        //You need the _ in _id or any other property to find the id or property in mongo.
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date()
                    }
                ).exec();
            })
            .value();


        res.send({});

    });


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
        });

        //Send the email from here.
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();

            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (error) {
            res.status(422).send(error);
        }


    });
};