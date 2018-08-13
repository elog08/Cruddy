// Initializes the `site` service on path `/site`
const createService = require('feathers-nedb');
const createModel = require('../../models/site.model');
const hooks = require('./site.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/site', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('site');

  service.hooks(hooks);
};
