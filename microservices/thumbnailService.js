const cote = require('cote');
const Jimp = require('jimp');
const path = require('path');

const thumbnailService = new cote.Responder({ name: 'Thumbnail Service' });

thumbnailService.on('generate thumbnail', (req) => {
  try {
    const imagePath = path.join(__dirname, '..', req.imagePath);

    Jimp.read(imagePath, (err, image) => {
      if (err) throw err;

      const thumbnailPath = imagePath + '_128';
      image.scaleToFit(128, 128).quality(80).write(thumbnailPath);
    });
  } catch (err) {
    return;
  }
});
