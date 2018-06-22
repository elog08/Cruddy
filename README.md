[![Build Status](https://travis-ci.org/elog08/Cruddy.svg?branch=master)](https://travis-ci.org/elog08/Cruddy)
# Cruddy
A Simple CRUD App Starter, built with FeathersJS and VueJS

## Requirements

- Node 8+

## Development Stack

Run the pre-check script
```
cd scripts && sh pre-check.sh
```

or

Install the following global tools:

```
npm install -g @feathersjs/cli @vue/cli pm2
```

### Test Dependencies

To make sure you have all the right libs to run the stack, run the following script:

```
cd scripts && sh test-dependencies.sh

```

### Running Locally

#### In Development Mode

```
pm2 start ecosystem.config.js 
```

This will start:
- A Webpack Dev Server with Hot Reload on Port 8080 (proxies `/api` to FeathersJS)
- A FeatherJS instance on Port 8081 that is agnostic of the `/api` base


#### In Pseudo-Production Mode

For testing the prod environment in a low-traffic setting

```
pm2 start ecosystem.config.js --env=production
```

This will start:
- A Simple Express Static File Server on Port 8080 and an API Proxy to Feathers
- A FeatherJS instance on Port 8081

#### In the real-world

Use Nginx to serve the static files and Proxy-pass `/api` to a PM2 cluster running the server.

- TODO: Nginx.conf example
- TODO: Dockerize
