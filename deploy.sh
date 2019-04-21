#!/bin/bash

echo "start travis ci deploy"
# ssh to sam
echo "ssh to server"
ssh -o "StrictHostKeyChecking no" root@104.248.56.29 "cd sam-and-his-friends && pm2 stop 2 && git pull && NODE_ENV=production pm2 start ./server.js"
