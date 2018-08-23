const assert = require('assert');
const fs = require('fs-extra');
// const Console = console;
const faker = require('faker');
const app = require('../../src/app');

const HTPASSWD_DIR = './htpasswd';

describe('\'htpasswd\' service', () => {

  const service = app.service('htpasswd');

  const username = faker.internet.userName(),
    password = faker.internet.password(),
    id = `${faker.internet.domainWord()}.${faker.internet.domainName()}`;


  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it(('creates'), async () => {
    await service.create({id, username, password});
    assert(await fs.pathExists(`${HTPASSWD_DIR}/${id}`), 'Creates file');
  });

  it(('reads'), async () => {
    const file = await service.get(id);
    assert(file.indexOf(username) === 0, 'Reads file');
  });

  it(('updates'), async () => {
    const oldFile = await service.get(id);

    assert(oldFile.indexOf(username) === 0, 'Reads file');
    const newHtpass = {id, username: faker.internet.userName(), password: faker.internet.password()};
    await service.update(id, newHtpass);
    const updatedFile = await service.get(id);
    assert((updatedFile !== oldFile), 'Updated file');
    assert(updatedFile.indexOf(newHtpass.username) === 0, 'Updates username');
  });

  it(('removes'), async() => {
    await service.remove(id);
    try {
      await service.get(id);
    } catch (e) {
      assert(e.name === 'NotFound');
    }
  });

});
