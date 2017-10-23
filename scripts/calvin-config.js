fs = require('fs-extra')
path = require('path')
svgo = require('svgo')

yaml = require('node-yaml')
var appDataDir = path.join('src', 'providers', 'app-data')
var assetsDir = path.join('src', 'assets')
var mediaDir = 'media'

var data = yaml.readSync(path.join('..', 'config', 'calvin.yaml'))
fs.writeFileSync(path.join(appDataDir, 'config.json'), JSON.stringify(data, null, 2))

fs.removeSync(path.join(assetsDir, 'audio'))
fs.removeSync(path.join(assetsDir, 'video'))
fs.removeSync(path.join(assetsDir, 'images'))

fs.copySync(path.join(mediaDir, 'audio'), path.join(assetsDir, 'audio'))
fs.copySync(path.join(mediaDir, 'video'), path.join(assetsDir, 'video'))
fs.copySync(path.join(mediaDir, 'images'), path.join(assetsDir, 'images'))
