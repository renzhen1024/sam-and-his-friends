#!/bin/bash

echo "start travis ci deploy"
echo "ssh to server..."

ssh -o "StrictHostKeyChecking no" root@68.183.103.112 "cd /home/tningjs/sam-and-his-friends && pm2 stop 0 && git pull && yarn install && npm run build && NODE_ENV=production pm2 start ./server.js"

echo "deploy success"
