const { Forbidden } = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [ context => {
      if(context.params.provider) {
        throw new Forbidden('You are not allowed to access this');
      }
    } ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
