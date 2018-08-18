const md5 = require('apache-md5');
const fs = require('fs-extra');
const errors = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
    this.HTPASSWD_DIR = './htpasswd';
  }

  generateHtpasswd(data) {
    const { username = 'admin', password = 'password' } = data;
    const htpasswd = `${username}:${md5(password)}`;
    return htpasswd;
  }
  
  async get (id, params) {
    const file = `${this.HTPASSWD_DIR}/${id}`;
    if (!await fs.pathExists(file)) {
      throw new errors.NotFound('File does not exist'); 
    }
    const contents = fs.readFileSync(file, 'utf8');
    return contents;
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    const { username = 'admin', password = 'password', id = 'test.cruddy.xyz' } = data;
    const file = `${this.HTPASSWD_DIR}/${id}`;

    if (await fs.pathExists(file)) {
      throw new errors.GeneralError('File exists: ' + file); 
    }

    const htpasswd = this.generateHtpasswd({username, password});
    await fs.outputFile(file, htpasswd);
    return data;
  }

  async update (id, data, params) {
    const { username = 'admin', password = 'password' } = data;
    const file = `${this.HTPASSWD_DIR}/${id}`;
    if (!await fs.pathExists(file)) {
      throw new errors.NotFound('File does not exist'); 
    }
    const htpasswd = this.generateHtpasswd({username, password});
    await fs.outputFile(file, htpasswd);
    return data;
  }

  async remove (id, params) {
    const file = `${this.HTPASSWD_DIR}/${id}`;
    if (!await fs.pathExists(file)) {
      throw new errors.NotFound('File does not exist'); 
    }
    await fs.remove(file);
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
