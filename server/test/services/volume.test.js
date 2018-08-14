const assert = require('assert');
const { expect } = require('chai');
const app = require('../../src/app');
const Console = console;

describe('\'volume\' service', function () {
  this.timeout(60000);
  const service = app.service('volume');
  let volume = null;
  let volumeId = null;

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('creates a volume', async () => {
    volume = await service.create({});
    expect(volume.id).to.be.ok;
    volumeId = volume.id;
  });

  it('gets the status', async() => {
    let volume = await service.get(volumeId);
    Console.dir({volume});
  });

  it('removes the volume', async() => {
    await service.remove(volumeId);
    try {
      const volume = await service.get(volumeId);
      expect(volume).to.be.undefined;
    } catch (e) {
      console.error(e);
    }
  });
});
