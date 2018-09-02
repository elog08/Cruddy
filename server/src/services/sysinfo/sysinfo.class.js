const si = require('systeminformation');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }
  async get(id) {
    const _id = id;
    const cpu = await si.cpu();
    const mem = await si.mem();
    const load = await si.currentLoad();
    const fsSize = await si.fsSize();
    const data = JSON.parse(JSON.stringify({_id, load, cpu, mem, fsSize}));
    return data;
  }

  async find (params) {
    return { total: 1, limit: 1, skip: 0, data: [await this.get(1)] };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
