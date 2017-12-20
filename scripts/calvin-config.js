fs = require('fs-extra');
path = require('path');
svgo = require('svgo');
var ProgressBar = require('progress');

yaml = require('node-yaml');

function main() {

  const appDataDir = path.join('src', 'providers', 'app-data');
  const assetsDir = path.join('src', 'assets');
  const mediaDir = 'media';

  console.log('CALVin config');

  var config = yaml.readSync(path.join('..', 'config', 'calvin.yaml'));


  const talkers = config.words.talkers
  const words = config.words.items

  let bar = new ProgressBar('Checking words       [:bar]', {
    width: 20,
    total: talkers.length * words.length
  });
  talkers.map(talker => words.map(word => {
    const filePath = path.join(mediaDir, 'audio', 'words', talker, `${word}.wav`)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file: no audio file '${word}.wav' for talker '${talker}`)
    }
    bar.tick()
  }))

  bar = new ProgressBar('Checking video files [:bar]', {
    width: 20,
    total: talkers.length * words.length
  });
  talkers.map(talker => words.map(word => {
    const filePath = path.join(mediaDir, 'video', 'words', talker, `${word}.mp4`)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file: no video file '${word}.mp4' for talker '${talker}`)
    }
    bar.tick()
  }))

  bar = new ProgressBar('Checking image files [:bar]', {
    width: 20,
    total: words.length
  });
  words.map(word => {
    const filePath = path.join(mediaDir, 'images', 'words', `${word}.png`)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file: no image file '${word}.png'`)
    }
    bar.tick()
  })

  bar = new ProgressBar('Checking vowels      [:bar]', {
    width: 20,
    total: config.vowels.items.length * config.vowels.talkers.length
  });
  config.vowels.talkers.map(talker => config.vowels.items.map(word => {
    const filePath = path.join(mediaDir, 'audio', 'vowels', talker, `${word}.wav`)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file: no audio file '${word}.wav' for talker '${talker}`)
    }
    bar.tick()
  }))





  fs.writeFileSync(
    path.join(appDataDir, 'config.json'),
    JSON.stringify(config, null, 2)
  );

  // fs.removeSync(path.join(assetsDir, 'audio'))
  // fs.removeSync(path.join(assetsDir, 'video'))
  // fs.removeSync(path.join(assetsDir, 'images'))

  console.log('Copying audio');
  fs.copySync(path.join(mediaDir, 'audio'), path.join(assetsDir, 'audio'))
  console.log('Copying video');
  fs.copySync(path.join(mediaDir, 'video'), path.join(assetsDir, 'video'))
  console.log('Copying images');
  fs.copySync(path.join(mediaDir, 'images'), path.join(assetsDir, 'images'))

  console.log('CALVin config complete');
  // fs.ensureDirSync(path.join(assetsDir, 'audio', 'keywords'))

  // fs.copySync(path.join(mediaDir, 'audio'), path.join(assetsDir, 'audio'))
  // fs.copySync(path.join(mediaDir, 'video'), path.join(assetsDir, 'video'))
  // fs.copySync(path.join(mediaDir, 'images'), path.join(assetsDir, 'images'))
}

main();
