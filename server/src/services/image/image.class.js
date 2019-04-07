/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
const { Docker } = require('node-docker-api');
const { Throttle } = require('stream-throttle');
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const Console = console;

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  // stream.on('data', (d) => console.log(d.toString()));
  stream.on('end', resolve);
  stream.on('error', reject);
});

class Service {
  constructor(options) {
    this.options = options || {};
    this.docker  = new Docker();
  }

  async find(params) {
    Console.info('image', 'find', {params});
    try {
      
      const images = await this.docker.image.list();
      let data = await Promise.all(images.map(c => this.get(c.id)));
      data = data.filter(img => !!img.name);
      Console.info('image', 'find', 'success', {data});
      return {
        total: data.length,
        data
      };
    }
    catch (e) {
      Console.error('image', 'find', 'error', {e});
    }
  }

  async create(data) {
    try {
      const { image = '', tag = 'latest' } = data;
      Console.info('image', 'create', { image, tag });
      if (!image) {
        throw new errors.BadRequest('You need specify image name');
      }
      await this.docker.image.create({}, { fromImage: image, tag }).then(stream => promisifyStream(stream));
      const latestImage = await this.docker.image.get(image);
      const result = await latestImage.status();
      Console.info('image', 'create', 'success', { result });
      const { id, RepoTags: [name]} = result.data;
      return { id, name };
    }
    catch (e) {
      Console.error('image', 'create', 'error', {e});
      throw new errors.BadRequest('Error pulling image', e);
    }
  }

  async get(id, params) {
    try {
      Console.info('image', 'get', { id });
      const image = await this.docker.image.get(id);
      const { data: { ContainerConfig: { Env }, RepoTags: [name]} } = await image.status();
      return {_id: id,  name, env: Env};
    }
    catch (e) {
      Console.error('image', 'get', 'error', {e});
      if (e.statusCode && e.statusCode === 404)
      {
        throw new errors.NotFound(e.reason);
      }
      else {
        throw new errors.BadRequest('Not found', {e});
      }
    }
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;