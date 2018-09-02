#!/bin/bash

echo "Environment pre-check"

cd ../

# Check Node Version > 8
node -e "process.exit(parseInt(!(parseFloat(process.version.slice(1)) > 8)))" && echo "Node > 8 installed" || exit 1

which pm2 && echo "PM2 Installed" || npm install -g pm2

# Install PM2
which pm2 && echo "PM2 Installed" || npm install -g pm2

# Install Feathers
which feathers && echo "Feathers Installed"  || npm install -g @feathersjs/cli

# Install Vue CLI
which vue && echo "Vue Installed"  || npm install -g @vue/cli

# Check Docker Image
which docker && docker pull yobasystems/alpine-grav

echo "Environment pre-check...done"