const room = require('./room/room.service.js');
const users = require('./users/users.service.js');
const container = require('./container/container.service.js');
const report = require('./report/report.service.js');
const job = require('./job/job.service.js');
const site = require('./site/site.service.js');
const volume = require('./volume/volume.service.js');
const htpasswd = require('./htpasswd/htpasswd.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(room);
  app.configure(report);
  app.configure(job);
  app.configure(container);
  app.configure(site);
  app.configure(volume);
  app.configure(htpasswd);
};
