const { authenticate } = require('@feathersjs/authentication').hooks;
const { queryWithCurrentUser, restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');
const errors = require('@feathersjs/errors');

// The field that is used on the report model to refer to the User object
const userBinding = { idField: 'id', as: 'userId' };

const md5 = require("apache-md5");

var encryptedPassword = md5("mypass");

console.log({encryptedPassword});

class SiteContainer {
  static async addPassword(hook) {

  }

  static async createSite(hook) {
    const container = hook.app.service('container');
    const volume = hook.app.service('volume');

    let newVolume = await volume.create({});
    newVolume = await volume.get(newVolume.id);
    let newSite = await container.create({Image: 'elog08/tqfw', env: {
      'VIRTUAL_HOST': hook.data.subdomain,
      'LETSENCRYPT_HOST': hook.data.subdomain,
      'LETSENCRYPT_EMAIL': hook.data.email
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
    let theContainer = await container.patch(theSite.containerId, {}, {query: hook.params.query});
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
            console.log(containerId, hook.result.data);
            if (theContainer) {
              hook.result.data[i].status = theContainer.data.State.Status;
            } else {
              hook.result.data[i].status = 'not found';
            }
          } catch (e) {
            console.error("Missing container", e.message)
          }
        }
      }
      console.info(hook.result);
    }
    return hook;
  }

  static async removeSite(hook) {
    // console.log('Remove site', hook.data, hook.id);
    const theSite = await hook.app.service('site').get(hook.id);
    if(theSite.containerId)
    {
      const container = hook.app.service('container');
      await container.remove(theSite.containerId);
    }
    return hook;
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
