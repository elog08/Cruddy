# Cruddy
A Simple CRUD App Starter, built with FeathersJS and VueJS

## Requirements

- Node 8+

## Development Stack

Install the following global tools:

```
npm install -g @feathersjs/cli @vue/cli pm2
```

### Running Locally

#### In Development Mode

```
pm2 start ecosystem.config.js 
```

This will start:
- A Webpack Dev Server on Port 8080 by default
- A FeatherJS instance on Port 8081

The WebPack server will proxy `/api` to `http://localhost:8081`
