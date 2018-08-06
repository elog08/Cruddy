// Initializes the `symptom` service on path `/symptom`
const createService = require('feathers-nedb');
const createModel = require('../../models/symptom.model');
const hooks = require('./symptom.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/symptom', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('symptom');

  service.hooks(hooks);
};
