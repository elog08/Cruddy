const assert = require('assert');
const { expect } = require('chai');
const app = require('../../src/app');
const faker = require('faker');
const Console = console;

describe('site service', () => {

  before (async ()=>{
    // await Container.remove(null);
    // await Volume.remove(null);
  });

  const Site = app.service('site');

  const email = faker.internet.email(),
    userId = faker.random.uuid(),
    title = faker.random.words(),
    subdomain = `${faker.internet.domainWord()}.${faker.internet.domainName()}`;

  let siteConfig = {
    email,
    title,
    userId,
    basic_username: 'test123',
    basic_password: 'test123',
    subdomain
  };
  it('registered the service', () => {
    assert.ok(Site, 'Registered the service');
  });

  it('creates a new site', async () => {
    Console.info('Creating new site', {siteConfig});
    let newSite = await Site.create(siteConfig);
    expect(newSite._id).to.be.ok;
  });

  it('rejects sites with non-unique IDs', async () => {
    try {
      await Site.create(siteConfig);
    } catch (e) {
      expect(e.message).to.be.ok;
    }
  });

  describe('finds', () => {
    it('finds sites belonging to a user', () => {
      expect(1).to.equal(1);
    });
  });

  describe('gets', () => {
    it('site', () => {
      expect(1).to.equal(1);
    });

    it('container status', () => {
      expect(1).to.equal(1);
    });
  });

  describe('patches', () => {
    it('stops containers', () => {
      expect(1).to.equal(1);
    });

    it('restarts containers', () => {
      expect(1).to.equal(1);
    });

  });
});