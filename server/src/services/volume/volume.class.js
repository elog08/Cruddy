/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
const { Docker } = require('node-docker-api');
const { Throttle } = require('stream-throttle');
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const Console = console;

class Service {
  constructor(options) {
    this.options = options || {};
    this.docker  = new Docker();
  }

  async find(params) {
    try {
      const volumes = await this.docker.volume.list();
      const ids = volumes.map(c => c.id);
      return {
        total: ids.length,
        data: ids
      };
    }
    catch (e) {
      Console.error(e);
    }
  }

  async get(id, params) {
    try {
      const volume = await this.docker.volume.get(id);
      const { data } = await volume.status();
      return data;
    }
    catch (e) {
      if (e.statusCode && e.statusCode === 404)
        new errors.NotFound(e.reason);
    }
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }
    try {
      const config = { Name: 'volume_' + Date.now(), Driver: "local" }
      const volume = await this.docker.volume.create(config);
      return volume;
    }
    catch (e) {
      Console.error('Error', e);
      if (e.statusCode && e.statusCode === 500)
        new errors.GeneralError(new Error(e.message));
    }
  }

  async remove(id, params) {
    if (!id) {
      Console.info('Batch remove all volumes, pruning');
      await this.docker.volume.prune();
      return;
    }
    try {
      Console.info('Removing volume', id);
      const volume = await this.docker.volume.get(id);
      await volume.remove();
      return {id};
    }
    catch (e) {
      if (e.statusCode && e.statusCode === 404)
        new errors.NotFound(e.reason);
    }
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;