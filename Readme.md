# sam-and-his-friends

## How to run in production

1. `$ sudo npm install -g pm2`
2. `$ cd sam-and-his-friends`
3. `$ NODE_ENV=production PORT=80 pm2 start ./bin/www`

## How to deploy a new version production

1. The list of applications currently managed by PM2 can also be looked up with the list subcommand:

`$ pm2 list`

2. Stop an application with this command (specify the PM2 App name or id):

`$ pm2 stop app_name_or_id`

3. Update dependency

`$ cd sam-and-his-friends && git pull && yarn install`

4. Start application again

`$ NODE_ENV=production PORT=80 pm2 start ./bin/www`

## Change log

The change log can be found on the [Releases page](https://github.com/tningjs/sam-and-his-friends/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Authors and license

[Tao Ning](https://github.com/tningjs/sam-and-his-friends) and [contributors](https://github.com/tningjs/sam-and-his-friends/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
