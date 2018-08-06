// const { authenticate } = require('@feathersjs/authentication').hooks;

const Console = console;
async function calculateBMI (hook) {
  Console.info('Creating new entry', hook.data);
  const { weight, height } = hook.data;
  const bmi = Math.floor(( weight / ( height * height ) ) * 703) ;
  Console.info('Creating new entry', hook.data, 'adding BMI', {bmi});
  hook.data.bmi = bmi;
}

module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create: [calculateBMI],
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
