const assert = require('assert');
const app = require('../../src/app');

describe('\'report\' service', () => {
  it('registered the service', () => {
    const service = app.service('report');

    assert.ok(service, 'Registered the service');
  });
});
