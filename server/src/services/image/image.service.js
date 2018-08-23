// Initializes the `image` service on path `/image`
const createService = require('./image.class.js');
const hooks = require('./image.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/image', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('image');

  service.hooks(hooks);
};
