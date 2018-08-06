// Initializes the `job` service on path `/job`
const createService = require('./job.class.js');
const hooks = require('./job.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/job', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('job');

  service.hooks(hooks);
};
