const assert = require('assert');
const { expect } = require('chai');
const app = require('../../src/app');
// const Console = console;

describe('\'container\' service', function () {
  this.timeout(60000);
  const service = app.service('container');
  let container = null;
  let containerId = null;

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('starts a container', async () => {
    container = await service.create({image: 'yobasystems/alpine-grav'});
    expect(container.id).to.be.ok;
    containerId = container.id;
    await service.remove(container.id);
  });

  it('passes environment a container', async () => {
    container = await service.create({image: 'yobasystems/alpine-grav', env: {
      'VIRTUAL_HOST': 'sub.domain.com',
      'LETSENCRYPT_HOST': 'sub.domain.com',
      'LETSENCRYPT_EMAIL': 'email@sub.domain.com'
    }});
    containerId = container.id;
    let createdContainer = await service.get(containerId);
    expect(createdContainer.data.Id).to.be.ok;
  });


  it('gets the status', async() => {
    let container = await service.get(containerId);
    expect(container.data.State.Status).to.equal('running');
  });

  it('stops the container', async() => {
    let container = await service.get(containerId);
    expect(container.data.State.Status).to.equal('running');
    await service.patch(containerId, {}, { query: { action: 'stop' } });
    container = await service.get(containerId);
    expect(container.data.State.Status).to.equal('exited');
  });

  after(async () => {
    await service.remove(containerId);
  });
});
