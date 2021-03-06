const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const commonHooks = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');

const { iff, isProvider, discard } = commonHooks;
const Console = console;

const handleDuplicateUserError = hook => {
  if (hook.error && hook.error.errorType === 'uniqueViolated')
  {
    Console.error(hook.error);
    throw new errors.GeneralError(new Error('Username or email already exists'));
  }
};

const validateInviteCodes = hook => {
  const { invite_codes } = hook.app.settings.application;
  if (invite_codes && invite_codes.length > 0) {
    const invite_code = hook.data.invite_code || ''; // Empty invite code
    if ( invite_codes.indexOf(invite_code) < 0 ) {
      throw new errors.BadRequest('Invalid invite code '+invite_code, {
        invite_code
      }); 
    }
  }
  return hook;
};


module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ 
      commonHooks.lowerCase('email'), 
      hashPassword(),
      iff(isProvider('external'), 
        discard('confirm')), 
      validateInviteCodes, 
    ],
    update: [ authenticate('jwt') ],
    patch: [ iff(isProvider('external'), hashPassword()), authenticate('jwt'),
      commonHooks.iff(
        commonHooks.isProvider('external'),    
        commonHooks.preventChanges(
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        ))
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        protect('password')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [handleDuplicateUserError],
    update: [],
    patch: [],
    remove: []
  }
};