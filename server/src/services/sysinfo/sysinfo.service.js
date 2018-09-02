// Initializes the `sysinfo` service on path `/sysinfo`
const createService = require('./sysinfo.class.js');
const hooks = require('./sysinfo.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sysinfo', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sysinfo');

  service.hooks(hooks);
};
