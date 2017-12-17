fs = require('fs-extra')
path = require('path')
svgo = require('svgo')
var ProgressBar = require('progress')

yaml = require('node-yaml')
const appDataDir = path.join('src', 'providers', 'app-data')
const assetsDir = path.join('src', 'assets')
const mediaDir = 'media'

console.log('CALVin config')

var config = yaml.readSync(path.join('..', 'config', 'calvin.yaml'))
fs.writeFileSync(path.join(appDataDir, 'config.json'), JSON.stringify(config, null, 2))


// fs.removeSync(path.join(assetsDir, 'audio'))
// fs.removeSync(path.join(assetsDir, 'video'))
// fs.removeSync(path.join(assetsDir, 'images'))


console.log('Copying example words...')

const exampleWords = config.exampleWords
const talkerIds = exampleWords.talkerIds
let i, j, k, src, srcDir, dest, destDir, bar, talker;
let media = ['audio', 'video']
let ext = ['wav', 'mp4']
for (i = 0; i < exampleWords.talkerIds.length; i ++) {
    talker = exampleWords.talkerIds[i];
    console.log('  Talker: ' + talker)
    for (j = 0; j < media.length; j ++) {
        srcDir = path.join(mediaDir, media[j], 'example_words', talker)
        destDir = path.join(assetsDir, media[j], 'example_words', talker)
        fs.ensureDirSync(destDir)
        bar = new ProgressBar('    Copying ' + media[j] + ' [:bar]',
            { width: 20, total: exampleWords.words.length });
        for (k = 0; k < exampleWords.words.length; k++) {
            bar.tick()
            src = path.join(srcDir, exampleWords.words[k] + '.' + ext[j])
            dest = path.join(destDir, exampleWords.words[k] + '.' + ext[j])
            fs.copySync(src, dest)
        }
    }
}
console.log('  Copying images...')

srcDir = path.join(mediaDir, 'images', 'example_words')
destDir = path.join(assetsDir, 'images', 'example_words')
fs.ensureDirSync(destDir)
bar = new ProgressBar('    Copying images [:bar]',
    { width: 20, total: exampleWords.words.length });
for (k = 0; k < exampleWords.words.length; k++) {
    bar.tick()
    src = path.join(srcDir, exampleWords.words[k] + '.png')
    dest = path.join(destDir, exampleWords.words[k] + '.png')
    fs.copySync(src, dest)
}

console.log('...done')

console.log('Copying keywords...')
media = ['audio', 'images']
for (j = 0; j < media.length; j ++) {
    srcDir = path.join(mediaDir, media[j], 'keywords')
    destDir = path.join(assetsDir, media[j], 'keywords')
    fs.copySync(srcDir, destDir)
}
console.log('...done')

console.log('Copying vowels...')
srcDir = path.join(mediaDir, 'audio', 'vowels')
destDir = path.join(assetsDir, 'audio', 'vowels')
fs.copySync(srcDir, destDir)
console.log('...done')

console.log('Copying svg...')
srcDir = path.join(mediaDir, 'images')
destDir = path.join(assetsDir, 'images')
fs.copySync(path.join(srcDir, 'calvin-mouths.svg'), path.join(destDir, 'calvin-mouths.svg'))
fs.copySync(path.join(srcDir, 'vocal-tract.svg'), path.join(destDir, 'vocal-tract.svg'))
fs.copySync(path.join(srcDir, 'avatars'), path.join(destDir, 'avatars'))
console.log('...done')

console.log('CALVin config complete')
// fs.ensureDirSync(path.join(assetsDir, 'audio', 'keywords'))

// fs.copySync(path.join(mediaDir, 'audio'), path.join(assetsDir, 'audio'))
// fs.copySync(path.join(mediaDir, 'video'), path.join(assetsDir, 'video'))
// fs.copySync(path.join(mediaDir, 'images'), path.join(assetsDir, 'images'))
