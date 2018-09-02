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
      const images = await this.docker.image.list();
      let data = await Promise.all(images.map(c => this.get(c.id)));
      data = data.filter(img => !!img.name);
      return {
        total: data.length,
        data
      };
    }
    catch (e) {
      Console.error(e);
    }
  }

  async get(id, params) {
    try {
      const image = await this.docker.image.get(id);
      const { data: { RepoTags: [name]} } = await image.status();
      return {id, name};
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