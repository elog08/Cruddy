const assert = require('assert');
const app = require('../../src/app');

describe('\'sysinfo\' service', () => {
  it('registered the service', () => {
    const service = app.service('sysinfo');

    assert.ok(service, 'Registered the service');
  });
});
