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

  const configFile = path.join('..', 'config', 'calvin.yaml');
  let config = null;
  try {
    config = yaml.readSync(configFile);
  } catch (err) {
    console.log(`Invalid config file: '${configFile}'`);
    return;
  }

  let talkers = config.words.talkers;
  const words = config.words.items;

  let bar = new ProgressBar('Checking words       [:bar]', {
    width: 20,
    total: talkers.length * words.length
  });
  talkers.map(talker =>
    words.map(word => {
      const filePath = path.join(
        mediaDir,
        'audio',
        'words',
        talker,
        `${word}.wav`
      );
      if (!fs.existsSync(filePath)) {
        throw new Error(
          `Missing file: no audio file '${word}.wav' for talker '${talker}`
        );
      }
      bar.tick();
    })
  );

  talkers.map(talker => {
    const filePath = path.join(
      mediaDir,
      'video',
      'words',
      talker,
      `_poster.jpg`
    );
    if (!fs.existsSync(filePath)) {
      throw new Error(
        `Missing file: no thumbnail file '_poster.jpg' for talker '${talker}`
      );
    }
  });

  bar = new ProgressBar('Checking video files [:bar]', {
    width: 20,
    total: talkers.length * words.length
  });
  talkers.map(talker =>
    words.map(word => {
      const filePath = path.join(
        mediaDir,
        'video',
        'words',
        talker,
        `${word}.mp4`
      );
      if (!fs.existsSync(filePath)) {
        throw new Error(
          `Missing file: no video file '${word}.mp4' for talker '${talker}`
        );
      }
      bar.tick();
    })
  );

  bar = new ProgressBar('Checking image files [:bar]', {
    width: 20,
    total: words.length
  });
  words.map(word => {
    const filePath = path.join(mediaDir, 'images', 'words', `${word}.png`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file: no image file '${word}.png'`);
    }
    bar.tick();
  });

  bar = new ProgressBar('Checking vowels      [:bar]', {
    width: 20,
    total: config.vowels.items.length * config.vowels.talkers.length
  });
  config.vowels.talkers.map(talker =>
    config.vowels.items.map(word => {
      const filePath = path.join(
        mediaDir,
        'audio',
        'vowels',
        talker,
        `${word}.wav`
      );
      if (!fs.existsSync(filePath)) {
        throw new Error(
          `Missing file: no audio file '${word}.wav' for talker '${talker}`
        );
      }
      bar.tick();
    })
  );

  fs.writeFileSync(
    path.join(appDataDir, 'config.json'),
    JSON.stringify(config, null, 2)
  );

  talkers = config.words.talkers;
  items = config.words.items;
  bar = new ProgressBar('Copying words (audio)  [:bar]', {
    width: 20,
    total: talkers.length * items.length
  });
  fs.ensureDirSync(path.join(assetsDir, 'audio', 'words'));
  talkers.map(talker => {
    fs.ensureDirSync(path.join(assetsDir, 'audio', 'words', talker));
    items.map(item => {
      fs.copySync(
        path.join(mediaDir, 'audio', 'words', talker, `${item}.wav`),
        path.join(assetsDir, 'audio', 'words', talker, `${item}.wav`)
      );
      bar.tick();
    });
  });
  bar = new ProgressBar('Copying words (video)  [:bar]', {
    width: 20,
    total: talkers.length * items.length
  });
  fs.ensureDirSync(path.join(assetsDir, 'video', 'words'));
  talkers.map(talker => {
    fs.ensureDirSync(path.join(assetsDir, 'video', 'words', talker));
    items.map(item => {
      fs.copySync(
        path.join(mediaDir, 'video', 'words', talker, `${item}.mp4`),
        path.join(assetsDir, 'video', 'words', talker, `${item}.mp4`)
      );
      bar.tick();
    });
  });

  bar = new ProgressBar('Copying thumbnails (video)  [:bar]', {
    width: 20,
    total: talkers.length
  });
  talkers.map(talker => {
    fs.ensureDirSync(path.join(assetsDir, 'video', 'words', talker));
    fs.copySync(
      path.join(mediaDir, 'video', 'words', talker, '_poster.jpg'),
      path.join(assetsDir, 'video', 'words', talker, '_poster.jpg')
    );
    bar.tick();
  });

  bar = new ProgressBar('Copying words (images) [:bar]', {
    width: 20,
    total: items.length
  });
  fs.ensureDirSync(path.join(assetsDir, 'images', 'words'));
  items.map(item => {
    fs.copySync(
      path.join(mediaDir, 'images', 'words', `${item}.png`),
      path.join(assetsDir, 'images', 'words', `${item}.png`)
    );
    bar.tick();
  });

  talkers = config.vowels.talkers;
  items = config.vowels.items;
  bar = new ProgressBar('Copying vowels         [:bar]', {
    width: 20,
    total: items.length
  });
  talkers.map(talker => {
    fs.ensureDirSync(path.join(assetsDir, 'audio', 'vowels', talker));
    items.map(item => {
      fs.copySync(
        path.join(mediaDir, 'audio', 'vowels', talker, `${item}.wav`),
        path.join(assetsDir, 'audio', 'vowels', talker, `${item}.wav`)
      );
      bar.tick();
    });
  });

  console.log('Copying avatars')
  fs.copySync(
    path.join(mediaDir, 'images', 'avatars'),
    path.join(assetsDir, 'images', 'avatars')
  );
  console.log('Copying vocal tract')
  fs.copySync(
    path.join(mediaDir, 'images', 'vocal-tract.svg'),
    path.join(assetsDir, 'images', 'vocal-tract.svg')
  );
  console.log('Done')
}

main();
