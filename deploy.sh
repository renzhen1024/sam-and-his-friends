#!/bin/bash

echo "start travis ci deploy"
echo "ssh to server..."

ssh -o "StrictHostKeyChecking no" root@68.183.103.112 "cd /usr/share/nginx/sam-and-his-friends && pm2 stop 1 && git pull && yarn install && npm run build && NODE_ENV=production pm2 start ./server.js"

echo "deploy success"
