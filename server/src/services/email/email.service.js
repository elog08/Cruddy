// Initializes the `email` service on path `/email`
const hooks = require('./email.hooks');
const Mailer = require('feathers-mailer');

module.exports = function () {
  const app = this;

  const emailConfig = app.get('emailConfig');

  const {
    SMTP_HOST = 'localhost',
    SMTP_PORT = 1025,
    SMTP_SECURE = false,
    SMTP_REQUIRE_TLS = true,
    SMTP_USERNAME = '',
    SMTP_PASSWORD = '',
    FROM_EMAIL = 'contact@cruddy.xyz',
    TLS_REJECT_UNAUTHORIZED = false
  } = emailConfig;

  const transportOptions = {
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE, // 487 only
    requireTLS: SMTP_REQUIRE_TLS,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD
    },
    tls:{
      rejectUnauthorized: TLS_REJECT_UNAUTHORIZED
    }
  };

  // Initialize our service with any options it requires
  app.use('/emails', Mailer(
    transportOptions
  ));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('emails');

  service.create({
    from: FROM_EMAIL,
    to: 'test@cruddy.xyz',
    subject: 'Email test',
    html: 'This is the email body'
  });

  service.hooks(hooks);
};