const hooks = require('feathers-hooks-common');
const Console = console;

const info = msg => hook => {
  Console.log({msg, data: hook.data, result: hook.result});
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
