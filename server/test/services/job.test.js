const assert = require('assert');
const app = require('../../src/app');

describe('\'job\' service', () => {
  it('registered the service', () => {
    const service = app.service('job');

    assert.ok(service, 'Registered the service');
  });
});
