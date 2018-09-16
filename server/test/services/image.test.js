const assert = require('assert');
const { expect } = require('chai');
const app = require('../../src/app');
// const Console = console;

describe('\'image\' service', function () {
  this.timeout(60000);
  const service = app.service('image');

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it ('finds all images', async () => {
    const images = await service.find({});
    expect(images).to.be.ok;
  });
});
