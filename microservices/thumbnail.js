const cote = require('cote');
const Jimp = require('jimp');
const path = require('path');

const responder = new cote.Responder({ name: 'Thumbnail Generator' });

responder.on('generate thumbnail', (thumbPath, done) => {
  Jimp.read(thumbPath, (err, image) => {
    if (err) throw err;

    const thumbnailURL = path.join(__dirname, '..', thumbPath);
    image.scaleToFit(128, 128).quality(80).write(thumbnailURL);
  });
  done(thumbnailURL);
});
