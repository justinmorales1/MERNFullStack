const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    //Check if user is logged in first with the requireLogin middleware function. We dont invoke require login because we want to run once the request runs in.
    app.post('/api/stripe', requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            source: req.body.id,
            description: "Test Charges"
        });

        req.user.credits += 5;
        //Make this users data persistent in Mongo
        const user = await req.user.save();

        res.send(user);

    });


};