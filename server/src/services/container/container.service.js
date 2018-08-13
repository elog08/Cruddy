// Initializes the `container` service on path `/container`
const createService = require('./container.class.js');
const hooks = require('./container.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/container', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('container');

  service.hooks(hooks);
};
