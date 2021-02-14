const sendgrid = require('sendgrid');
const keys = require('../config/keys');
const helper = sendgrid.mail;

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();
        console.log("The key is ", keys.sendGridKey)
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('jm.em0210@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        //This function is extended from helper.Mail
        this.addContent(this.body);
        //Enable click tracking inside the email
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map( ({ email }) => {
            return new helper.Email(email);
        })
    }

    //Look at sendgrid api for more information on whats going on here.
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings)
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipients => {
            personalize.addTo(recipients)
        });
        this.addPersonalization(personalize)
    }


    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response =  await this.sgApi.API(request);
        return response;

    }


}


module.exports = Mailer;