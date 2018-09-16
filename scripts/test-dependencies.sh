#!/bin/bash

# Make sure tests run with a clean node_modules. 
# The purpose is to reduce the chance of forgetting to include dependencies in package.json


cd ../

# Stop PM2
pm2 stop ecosystem.config.js

# Pull the latest grav image
docker pull yobasystems/alpine-grav:latest

# Test the client is sane
cd client;
rm -rf node_modules;
rm -rf dist;
npm install;

cd ../

# Test the server is sane
cd server;
rm -rf node_modules;
npm install || npm install;
[[ $NODE_ENV = "SKIP_TEST" ]] || npm test || exit 1

