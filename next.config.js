'use strict';

const config = require('config');

module.exports = {
    assetPrefix: config.get('staticBasePath'),
    distDir: 'dist/client/_next',
    useFileSystemPublicRoutes: false
};
