const assert = require('assert');
const { expect } = require('chai');
const app = require('../../src/app');
const Console = console;

describe('\'image\' service', function () {
  this.timeout(60000);
  const service = app.service('image');
  let image = null;

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it ('finds all images', async () => {
    const images = await service.find({});
    image = images.data[0].id;
    expect(images).to.be.ok;
  })

  it ('gets individual image', async () => {
    const imageDetail = await service.get(image);
    expect(imageDetail).to.be.ok;
  })
});
