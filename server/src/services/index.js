const room = require('./room/room.service.js');
const users = require('./users/users.service.js');
const report = require('./report/report.service.js');
const symptom = require('./symptom/symptom.service.js');
const job = require('./job/job.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(room);
  app.configure(report);
  app.configure(symptom);
  app.configure(job);
};
