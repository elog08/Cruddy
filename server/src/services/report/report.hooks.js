const { authenticate } = require('@feathersjs/authentication').hooks;
const { queryWithCurrentUser, restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');

// The field that is used on the report model to refer to the User object
const userBinding = { idField: 'id', as: 'userId' };

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ queryWithCurrentUser(userBinding) ],
    get: [ restrictToOwner(userBinding) ],
    create: [ associateCurrentUser(userBinding) ],
    update: [ restrictToOwner(userBinding) ],
    patch: [ restrictToOwner(userBinding) ],
    remove: [ restrictToOwner(userBinding) ]
  },

  after: {
    all: [],
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
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
