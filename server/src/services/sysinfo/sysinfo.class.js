const si = require('systeminformation');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const cpu = await si.cpu();
    const mem = await si.mem();
    const fsSize = await si.fsSize();

    return { data: [{cpu, mem, fsSize}]};
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
