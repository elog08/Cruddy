/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
const { Docker } = require('node-docker-api');
const { Throttle } = require('stream-throttle');
const getPort = require('get-port');
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const Console = console;

const SHM_SIZE = 536870912;

const promisifyStream = stream => new Promise((resolve, reject) => {
  let allData = '';
  stream.on('data', data => {
    allData += data.toString();
    // Console.log("Data", {allData})
  });
  stream.on('end', () => resolve(allData));
  stream.on('error', reject);
});


class Service {
  constructor(options) {
    this.options = options || {};
    this.docker  = new Docker();
    this.stats = new Map();
  }

  async find(params) {
    try {
      const containers = await this.docker.container.list();
      const ids = containers.map(c => c.id);
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
      const container = await this.docker.container.get(id);
      const details = await container.status();
      // const inspect = await container.stats();
      // const pStats = (() => {
      //   return new Promise((resolve, reject) => {
      //     const statsHandler = stat => {
      //       let json = JSON.parse(stat.toString(), null, ' ');
      //       inspect.removeListener('data', statsHandler);
      //       resolve(json);
      //     };
      //     inspect.once('data', statsHandler);
      //   });
      // })();
      
      // const [ stats ] = await Promise.all([pStats]);
      
      return { data: details.data }; //, stats };
    }
    catch (e) {
      Console.error(e);
      if (e.statusCode && e.statusCode === 404)
        new errors.NotFound(e.reason);
    }
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }
    try {
      const port = await getPort();
      const HostPort = port + '';
      const { Image = 'hello-world', env = {}, binds = {}, extrahosts = [] } = data;
      const Env = Object.keys(env).map(k => `${k}=${(env[k])}`);
      const Binds= Object.keys(binds).map(k => `${k}:${(binds[k])}`);
      const ExtraHosts = extrahosts;

      const HostConfig = {
        ShmSize: SHM_SIZE,
        ExtraHosts,
        Binds
      };
      
      const config = {
        Image,
        name: 'test_' + Date.now(),
        Env,
        HostConfig
      };

      // Console.dir({config});
    
      const container = await this.docker.container.create(config);
      const result = await container.start();
      return { id: result.data.Id, HostPort };
    }
    catch (e) {
      Console.error('Error', e);
      if (e.statusCode && e.statusCode === 500)
        new errors.GeneralError(new Error(e.message));
    }
  }

  // async update (id, data, params) {
  //   return data;
  // }
  
  async executeCommand(container, cmd) {
    Console.info('Executing', {cmd});
    const Cmd = cmd.split(' ');
    const result = await container.exec.create({AttachStdout: true,
      AttachStderr: true,Cmd})
      .then(exec => {
        return exec.start();
      })
      .then(stream => promisifyStream(stream));
    return result;
  }

  async patch(id, data, params) {
    const { query: { action } } = params;
    const container = await this.docker.container.get(id);
    let result = data;
    switch (action) {
    case 'start':
      result = (await container.start()).data;
      break;
    case 'stop':
      result = (await container.stop()).data;
      break;
    case 'restart':
      result = (await container.restart()).data;
      break;
    case 'kill':
      result = (await container.kill()).data;
      break;
    case 'ipreset':
      result = await this.executeCommand(container, 'iptables -F');
      break;
    case 'ipallow':
      if (data.ip && validator.isIP(data.ip))
      {
        const cmd = `iptables -I INPUT -p tcp --dport 8080 --source ${data.ip} -j ACCEPT`;
        result = await this.executeCommand(container, cmd);
      }
      break;        
    case 'iplist':
      result = await this.executeCommand(container, 'iptables -L');
      break;    
    case 'iprestrict':
      result = await this.executeCommand(container, 'iptables -A INPUT -p tcp --dport 8080 -j DROP');
      break;   
    case 'iprevoke':
      if (data.ip && validator.isIP(data.ip))
      {
        const cmd = `iptables -D INPUT -p tcp --dport 8080 --source ${data.ip} -j ACCEPT`;
        result = await this.executeCommand(container, cmd);
      }
      break;    
    }
    Console.info('Action', action, result);
    return this.get(id);
  }

  async remove(id, params) {
    if (!id) {
      Console.info('Batch remove all containers');
      const allContainers = await this.docker.container.list();
      return Promise.all(allContainers.map( container => this.remove(container.id)));
    }
    try {
      Console.info('Removing Container', id);
      const container = await this.docker.container.get(id);
      await container.stop();
      await container.delete();
      return { id };
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