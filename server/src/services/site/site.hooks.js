const { authenticate } = require('@feathersjs/authentication').hooks;
const { queryWithCurrentUser, restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');
const errors = require('@feathersjs/errors');
const Console = console;

// The field that is used on the report model to refer to the User object
const userBinding = { idField: 'id', as: 'userId' };


class SiteContainer {
  static async setPassword(hook) {
    const Htpasswd = hook.app.service('htpasswd');
    const { basic_username = 'admin', basic_password, subdomain } = hook.data;
    
    await Htpasswd.create({id: subdomain, username: basic_username, basic_password: basic_password});

    // We don't want to store this in the DB
    delete hook.data.basic_username;
    delete hook.data.basic_password;
  }

  // Helper to convert KEY=VAL arrs to objects
  static arrKeyValToObjj(arr = []) {
    const obj = {};
    arr.forEach(keyval => {
      if (keyval.indexOf('=') > 0) {
        const [key, val] = keyval.split('=');
        obj[key] = val;
      }
    });
    return obj;
  }

  static async createSite(hook) {
    const container = hook.app.service('container');
    const volume = hook.app.service('volume');

    const { image = 'elog08/tqfw'} = hook.data;

    if (hook.data.basic_username || hook.data.basic_password) {
      await SiteContainer.setPassword(hook);
    }

    let newVolume = await volume.create({});
    newVolume = await volume.get(newVolume.id);
    let newSite = await container.create({Image: image, env: {
      ...SiteContainer.arrKeyValToObjj(hook.data.env),
      'VIRTUAL_HOST': hook.data.subdomain,
      'LETSENCRYPT_HOST': hook.data.subdomain,
      'LETSENCRYPT_EMAIL': hook.data.email,
    }, binds: {
      [newVolume.Name]:'/app/api/data'
    }});
    hook.data.volumeId = newVolume.Name;
    hook.data.containerId = newSite.id;
    return hook;
  }

  static async patchSite(hook) {
    const theSite = await hook.app.service('site').get(hook.id);
    const container = hook.app.service('container');
    await container.patch(theSite.containerId, {}, {query: hook.params.query});
    return hook;
  }

  static async getSite(hook) {
    const container = hook.app.service('container');
    let theContainer = await container.get(hook.result.containerId);
    hook.result.status = theContainer;
    return hook;
  }

  static async findSite(hook) {
    const container = hook.app.service('container');

    if (Array.isArray(hook.result.data)) {
      for (let i=0; i<hook.result.data.length; i++) {
        let containerId = hook.result.data[i].containerId;
        if (containerId) {
          try {
            let theContainer = await container.get(containerId);
            Console.log(containerId, hook.result.data);
            if (theContainer) {
              hook.result.data[i].status = theContainer.data.State.Status;
            } else {
              hook.result.data[i].status = 'not found';
            }
          } catch (e) {
            Console.error('Missing container', e.message);
          }
        }
      }
      Console.info(hook.result);
    }
    return hook;
  }

  static async removeSite(hook) {
    // Console.log('Remove site', hook.data, hook.id);
    const theSite = await hook.app.service('site').get(hook.id);
    if(theSite.containerId)
    {
      const container = hook.app.service('container');
      await container.remove(theSite.containerId);
    }
    return hook;
  }
}

async function checkIfExists(hook) {
  if (hook.data.subdomain) {
    const result = await hook.app.service('site').find({query: {subdomain: hook.data.subdomain}});
    if (result.data.length > 0) {
      throw new errors.GeneralError(new Error('Subdomain Exists'));
    }
  }
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ queryWithCurrentUser(userBinding) ],
    get: [ restrictToOwner(userBinding) ],
    create: [ associateCurrentUser(userBinding), checkIfExists, SiteContainer.createSite ],
    update: [ restrictToOwner(userBinding) ],
    patch: [ restrictToOwner(userBinding) ],
    remove: [ restrictToOwner(userBinding), SiteContainer.removeSite ]
  },

  after: {
    all: [],
    find: [SiteContainer.findSite],
    get: [SiteContainer.getSite],
    create: [],
    update: [],
    patch: [SiteContainer.patchSite],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
