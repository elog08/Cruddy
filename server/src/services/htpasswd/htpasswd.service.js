// Initializes the `htpasswd` service on path `/htpasswd`
const createService = require('./htpasswd.class.js');
const hooks = require('./htpasswd.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/htpasswd', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('htpasswd');

  service.hooks(hooks);
};
