const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const commonHooks  = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');
const verifyHooks = require('feathers-authentication-management').hooks;
const { iff, isProvider, discard } = commonHooks;

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

const sendVerificationEmail = options => hook => {
  if (!hook.params.provider) { return hook; }
  const user = hook.result
  if(hook.data && hook.data.email && user) {
    hook.app.service('authManagement').notifier('resendVerifySignup', user)
    return hook
  }
  return hook
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ iff(isProvider('external'), discard('confirm')), verifyHooks.addVerification(), validateInviteCodes, hashPassword() ],
    update: [ authenticate('jwt') ],
    patch: [ hashPassword(), authenticate('jwt') ],
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
    create: [ sendVerificationEmail() ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};