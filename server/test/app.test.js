const assert = require('assert');
const rp = require('request-promise');
const axios = require('axios');
const faker = require('faker');
const jwtDecode = require('jwt-decode');
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
  timeout: 5000
});


// Helper for generating dummy data for testing
const fakeUser = () => ({
  email: faker.internet.email(),
  username: faker.internet.userName().toLowerCase(),
  password: faker.internet.password()
});
    
const fakeReport = () => ({
  date: Date.now(),
  title: faker.lorem.text(),
  message: faker.lorem.sentence(),
});

describe('Feathers application tests', function() {
  this.timeout(5000);

  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('starts and shows the index page', () => {
    return rp(getUrl()).then(body => {
      assert.ok(body.indexOf('<html>') !== -1);
      assert.ok(body.indexOf('<title>Cruddy API</title>') !== -1);
    }
    );
  });

  describe('Authentication', function() {
    let newUser, accessToken, lastUserId;
    
    newUser = fakeUser();

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
          lastUserId = (jwtDecode(accessToken)).userId;
          assert.equal(res.status, 201);
        });
    });
    
    it('gets the user profile', () => {
      return client.get(`/users/${lastUserId}`, {headers: {'Authorization': 'bearer ' + accessToken} })
        .then(res => {
          assert.equal(res.data.username, newUser.username);
          assert.equal(res.status, 200);
        });
    });
    
    it('authenticates the new token', () => {
      return client.get('/room', {headers: {'Authorization': 'bearer ' + accessToken} })
        .then(res => {
          assert.equal(res.status, 200);
        });
    });

    describe('Reports', () => {
      const report = fakeReport();
      
      let lastReportId = null;
      
      it('creates a new report', async () => {
        await client.post('/report', report)
          .catch(({response}) => {
            assert.equal(response.status, 401);
          });
        return client.post('/report', report, {headers: {'Authorization': 'bearer ' + accessToken} })
          .then(res => {
            lastReportId = res.data._id;
            assert.equal(res.status, 201);
          });
      });
      
      it('reads a report', async () => {
        await client.get(`/report/${lastReportId}`, report)
          .catch(({response}) => {
            assert.equal(response.status, 401);
          });
        return client.get(`/report/${lastReportId}`, {headers: {'Authorization': 'bearer ' + accessToken}, data: report })
          .then(res => {
            assert.equal(res.status, 200);
            assert.equal(res.data._id, lastReportId);
          });
      });
      
      it('batch creates reports', () => {
        const reports = [];
        for (let i=0; i<5; i++) {
          reports.push(fakeReport());
        }
        return client.post('/report', reports, {headers: {'Authorization': 'bearer ' + accessToken} })
          .then(res => {
            assert.equal(res.status, 201);
          });
      });
      
      it ('finds reports only for user', async () => {
        await client.get('/report')
          .catch(({response}) => {
            assert.equal(response.status, 401);
          });
        return client.get('/report', {headers: {'Authorization': 'bearer ' + accessToken} })
          .then(res => {
            assert.equal(res.status, 200);
            const isAllOwned = res.data.data.every((report) => report.userId === lastUserId);
            assert(isAllOwned, 'All returned reports owned by current user');
          });
      });
      
      it('updates a report', async () => {
        const { data } = await client.get(`/report/${lastReportId}`, {headers: {'Authorization': 'bearer ' + accessToken}});
        const modified = {...data, ...{title: 'Modified Title'}};
        await client.delete(`/report/${lastReportId}`, modified)
          .catch(({response}) => {
            assert.equal(response.status, 401);
          });
          
        return client.put(`/report/${lastReportId}`, modified, {headers: {'Authorization': 'bearer ' + accessToken} })
          .then(res => {
            assert.equal(res.status, 200);
            assert.equal(res.data._id, lastReportId);
          });
      });
      
      it('deletes a report', async () => {
        await client.delete(`/report/${lastReportId}`)
          .catch(({response}) => {
            assert.equal(response.status, 401);
          });
        return client.delete(`/report/${lastReportId}`, {headers: {'Authorization': 'bearer ' + accessToken}})
          .then(res => {
            assert.equal(res.status, 200);
            assert.equal(res.data._id, lastReportId);
          });
      });
      
    });
    
    it('logs out', () => {
      return client.delete('/authentication', {headers: {'Authorization': 'bearer ' + accessToken} })
        .then(res => {
          assert.equal(res.status, 200);
        });
    });
    
  });
});
