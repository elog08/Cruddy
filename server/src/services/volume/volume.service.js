// Initializes the `volume` service on path `/volume`
const createService = require('./volume.class.js');
const hooks = require('./volume.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/volume', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('volume');

  service.hooks(hooks);
};
