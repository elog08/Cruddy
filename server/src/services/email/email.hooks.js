const hooks = require('feathers-hooks-common');
const info = msg => hook => {
  console.log({msg, hook});
  console.info(msg, hook.result, hook.data) && hook
};

module.exports = {
  before: {
    all: [hooks.disallow('external')],
    find: [],
    get: [],
    create: [info('Send email before')],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [info('Send email after')],
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
