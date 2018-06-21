const assert = require('assert');
const rp = require('request-promise');
const axios = require('axios');
const faker = require('faker');

const url = require('url');
const app = require('../src/app');

const Console = console;

const port = app.get('port') || 3030;
const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

const client = axios.create({
  baseURL: getUrl(''),
  timeout: 1000
});

describe('Feathers application tests', () => {
  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('starts and shows the index page', () => {
    return rp(getUrl()).then(body =>
      assert.ok(body.indexOf('<html>') !== -1)
    );
  });

  describe('Authentication', function() {
    let newUser, accessToken;
    
    newUser = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    Console.info('Testing with random credentials', newUser);
    
    it('shows a 401 for an unauthenticated user', () => {
      return client.get('/room')
        .catch(err => {
          assert.equal(err.response.status, 401);
        });
    });
    
    it('creates a new user', () => {
      return client.post('/users', newUser)
        .then(res => {
          assert.equal(res.status, 201);
        });
    });
    
    it('authenticates the new user', () => {
      const payload = {
        'strategy': 'local',
        'email': newUser.email,
        'password': newUser.password
      };
      
      return client.post('/authentication', payload)
        .then(res => {
          accessToken = res.data.accessToken;
          assert.equal(res.status, 201);
        });
    });
    
    it('authenticates the new token', () => {
      return client.get('/room', {headers: {'Authorization': 'bearer ' + accessToken} })
        .then(res => {
          assert.equal(res.status, 200);
        });
    });
    
    it('logs out', () => {
      return client.delete('/authentication', {headers: {'Authorization': 'bearer ' + accessToken} })
        .then(res => {
          assert.equal(res.status, 200);
        });
    });
    
    it('does not authenticate the new token', () => {
      return client.get('/room', {headers: {'Authorization': 'bearer ' + accessToken} })
        .then(res => {
          assert.equal(res.status, 200);
        });
    });

  });
});
