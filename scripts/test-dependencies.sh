#!/bin/bash

# Make sure tests run with a clean node_modules. 
# The purpose is to reduce the chance of forgetting to include dependencies in package.json


cd ../

# Stop PM2
pm2 stop ecosystem.config.js

# Test the client is sane
cd client;
rm -rf node_modules;
rm -rf dist;
npm install;
npm test || exit 1

cd ../

# Test the server is sane
cd server;
rm -rf node_modules;
npm install;
npm test || exit 1
