# Sam And His Friends

[![Build Status](https://travis-ci.com/tningjs/sam-and-his-friends.svg?branch=master)](https://travis-ci.com/tningjs/sam-and-his-friends)
[![codecov](https://codecov.io/gh/tningjs/sam-and-his-friends/branch/master/graph/badge.svg)](https://codecov.io/gh/tningjs/sam-and-his-friends)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- [Set Up In Local Dev](#set-up-in-local-dev)
  - [How To Debug](#how-to-debug)
- [Deploy To Production](#deploy-to-production)
  - [Deploy A New Version To Production](#deploy-a-new-version-to-production)
- [Change log](#change-log)
- [Contributing](#contributing)
- [Authors and license](#authors-and-license)
- [Credits](#credits)

## Set Up In Local Dev

1. Requirements: Node V8.0+, Yarn, Redis V5.0+
2. Checkout source code: `$ git clone git@github.com:tningjs/sam-and-his-friends.git`
3. Install dependency: `$ yarn install`
4. Start server: `$ npm start`
5. Visit http://localhost:3000

### How To Debug

0. `$: npm run debug`
1. Open Chrome, go to `chrome://inspect/#devices`
1. Click "Inspect" in the Remote Target section (**Notice:** Cick the Node debug icon or click "Open dedicated DevTools for Node" not work for [some version](https://github.com/nodejs/node/issues/23693#issuecomment-440623410)). This step should pause the process in the first line of source code, click continue in the debug tool.
1. Open anther tab, go to `localhost:3000`, this step should pause the programm in the `debugger;` statement which you put in the code.

![Chrome Debug](src/public/images/node-debug.png)

## Deploy To Production

Auto deployment(CI) is configured using travis, the following is manual steps which similar to how CI is configured.

0. Requirements: Node V8.0+, Yarn, Redis V5.0+, [Process manager](http://pm2.keymetrics.io/)
1. Checkout source code: `$ git clone git@github.com:tningjs/sam-and-his-friends.git`
1. Install dependency: `$ yarn install`
1. Build: `$ npm run build`
1. Go to repository: `$ cd <repository>`
1. Start server: `$ NODE_ENV=production pm2 start ./server.js`

To check logs, use `$ pm2 logs`.

### Deploy A New Version To Production

1. Find process ID by listing applications currently managed by PM2: `$ pm2 list`
2. Stop an application: `$ pm2 stop <app_name_or_id>`
3. Go to repository and build: `$ cd <repository> && git pull && yarn install && npm run build`
4. Start application again `$ NODE_ENV=production pm2 start ./server.js`

## Change log

The change log can be found on the [Releases page](https://github.com/tningjs/sam-and-his-friends/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [Contributing guidelines](Contributing.md).

## Authors and license

[Tao Ning](https://github.com/tningjs/sam-and-his-friends) and [contributors](https://github.com/tningjs/sam-and-his-friends/graphs/contributors).

MIT License, see the included [MIT-LICENSE.txt](MIT-LICENSE.txt) file.

## Credits

- Layout design: Future Imperfect by [Pixelarity](pixelarity.com)
- 404 page: [Saleh R. Qureshi](http://salehriaz.com/). [Codepen link](https://codepen.io/salehriaz/pen/erJrZM)
- Error page: [@iremlopsum](https://codepen.io/iremlopsum/). [Codepen link](https://codepen.io/iremlopsum/pen/wagMZx)
