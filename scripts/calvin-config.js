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

fs.ensureDirSync(path.join(assetsDir, 'images'))
fs.copySync(path.join(mediaDir, 'images', 'example_words'), path.join(assetsDir, 'images', 'example_words'))

config = yaml.readSync(path.join('..', 'config', 'svgo-vocal-tract.yaml'))
svgOptimizer = new svgo(config)
fs.readFile(path.join(mediaDir, 'images', 'vocal-tract.svg'), function(err, data) {
    if (err) {
        throw err
    }
    svgOptimizer.optimize(data, function(result) {
        fs.outputFileSync(path.join(assetsDir, 'images', 'vocal-tract.svg'), result.data)
    })
})

config = yaml.readSync(path.join('..', 'config', 'svgo-avatars.yaml'))
svgOptimizer = new svgo(config)
talkers = data.talkers.concat('calvin')
talkers.map(function(talker) {
    fs.readFile(path.join(mediaDir, 'images', 'avatars', talker + '.svg'), function(err, data) {
        if (err) {
            throw err
        }
        svgOptimizer.optimize(data, function(result) {
            fs.outputFileSync(path.join(assetsDir, 'images', 'avatars', talker + '.svg'), result.data)
        })
    })
})
