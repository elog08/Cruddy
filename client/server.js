// This is a thin layer Express app that serves the production-grade Vue build and proxies `/api` to the Feathers server.
// I recommend using something more Robust like Nginx for Production

// Serves Production build from dist and proxies /api to localhost:8081
const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');

const feathersProxy = proxy({
  target: 'http://localhost:8081',
  logLevel: 'debug',
  ws: true, 
  pathRewrite: {
      '^/api' : '/' 
  }
});

app.use('/api', feathersProxy);
app.use(express.static('dist'));

app.listen(process.env.PORT);