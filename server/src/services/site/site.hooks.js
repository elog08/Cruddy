const { authenticate } = require('@feathersjs/authentication').hooks;
const { queryWithCurrentUser, restrictToOwner, associateCurrentUser } = require('feathers-authentication-hooks');

// The field that is used on the report model to refer to the User object
const userBinding = { idField: 'id', as: 'userId' };

class SiteContainer {
  static async createSite(hook) {
    const container = hook.app.service('container');
    let newSite = await container.create({image: 'yobasystems/alpine-grav', env: {
      'VIRTUAL_HOST': hook.data.subdomain,
      'LETSENCRYPT_HOST': hook.data.subdomain,
      'LETSENCRYPT_EMAIL': hook.data.email
    }});
    hook.data.containerId = newSite.id;
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
          let theContainer = await container.get(containerId);
          hook.result.data[i].status = theContainer.data.State.Status;
        }
      }
    }
    return hook;
  }

  static async removeSite(hook) {
    console.log('Remove site', hook.data, hook.id)
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
    create: [ associateCurrentUser(userBinding), SiteContainer.createSite ],
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
    patch: [],
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
