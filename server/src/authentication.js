const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const authManagement = require('feathers-authentication-management');
const Console = console;

module.exports = function (app) {
  const config = app.get('authentication');
  const from = app.get('FROM_EMAIL');
  // Set up authentication with the secret
  app.configure(authentication(config));

  const { publicURL } = app.get('urls');
  const hashLink = token => `<a href="${publicURL}/${token}">click here></a>`;

  const notifier = function(type, user, notifierOptions) {
    let subject, html;

    Console.info('Notify',{type, user, notifierOptions});
  
    switch (type) {
    case 'resendVerifySignup':
    case 'verifySignup':
      subject = 'Email verification';
      html = 'Verify your email: '+hashLink(user.verifyToken);
      break;
    case 'sendResetPwd':
      subject = 'Password reset email';
      html = 'Reset your password: '+hashLink(user.resetShortToken);
      break;
    case 'resetPwd':
      subject = 'Password reset';
      html = 'Reset your password: '+hashLink(user.verifyToken);
      break;
    case 'passwordChange':
      subject = 'Password changed';
      html = 'Your password was successfully changed.';
      break;
    case 'identityChange':
      subject = 'Your identity was changed';
      html = 'Verify changes:'+hashLink(user.verifyToken);
      break;
    }

    const message = {
      from,
      to: user.email,
      subject,
      html
    };

    Console.info('Emailing', {message});

    return app.service('emails').create(message);
  };

  const options = {
    notifier
  };
  app.configure(authManagement({ options }));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });

  // app.service('authManagement').notifier = notifier;
  // const isAction = (...args) => hook => args.includes(hook.data.action);
  //   app.service('authManagement').before({
  //     create: [
  //       hooks.iff(isAction('passwordChange', 'identityChange'), authentication.hooks.authenticate('jwt')),
  //     ],
  //   });
};
