const assert = require('assert');
const app = require('../../src/app');

describe('\'site\' service', () => {
  it('registered the service', () => {
    const service = app.service('site');

    assert.ok(service, 'Registered the service');
  });
});
