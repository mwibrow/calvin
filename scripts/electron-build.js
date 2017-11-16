'use strict';

const pkg = require('../package.json');
const argv = require('minimist')(process.argv.slice(1));
const args = Object.keys(argv)
    .filter(key => key !== '_')
    .reduce((obj, key) => Object.assign(obj, {[key]: argv[key]}), {});

const config = Object.assign(Object.assign({}, pkg.build || {}), args)
/**
 * Windows doesn't like executing `node_modules/.bin/build`
 * so we do it programatically.
 */
const builder = require('electron-builder');
builder.build({ config });
