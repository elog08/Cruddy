const assert = require('assert');
const app = require('../../src/app');

describe('\'emails\' service', () => {
  it('registered the service', () => {
    const service = app.service('emails');

    assert.ok(service, 'Registered the service');
  });
});
