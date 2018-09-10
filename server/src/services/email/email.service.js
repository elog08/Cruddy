// Initializes the `email` service on path `/email`
const hooks = require('./email.hooks');
const Mailer = require('feathers-mailer');
const mailgun = require('nodemailer-mailgun-transport');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const domain = app.get('MAILGUN_DOMAIN');
  const api_key = app.get('MAILGUN_API_KEY');

  // Initialize our service with any options it requires
  app.use('/emails', Mailer(mailgun({
    service: 'mailgun',
    auth: {
      api_key,
      domain
    }
  })));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('emails');

    // Use the service
  const email = {
    from: 'test@cruddy.xyz',
    to: 'test@cruddy.xyz',
    subject: 'Sendgrid test',
    html: 'This is the email body'
  };

  app.service('emails').create(email).then(function (result) {
    console.log('Sent email', result);
  }).catch(err => {
    console.log(err);
  });

  service.hooks(hooks);
};