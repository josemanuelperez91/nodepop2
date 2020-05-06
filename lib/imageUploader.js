var createError = require('http-errors');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './public/images/' }).single('image');
const promisify = require('util').promisify;
const deleteFile = promisify(fs.unlink);
const Jimp = require('jimp');

const imageUploader = function () {
  return (req, res, next) => {
    upload(req, res, async () => {
      if (req.file) {
        //only if a file is being send
        const { mimetype, filename, path } = req.file;
        const isImage = mimetype.split('/')[0] === 'image';

        if (isImage) {
          //the image unique file name is passed inside the body

          //llamar aqui al microservicio

          Jimp.read(path, (err, image) => {
            if (err) next(err);
            image
              .scaleToFit(128, 128)
              .quality(80)
              .write(path + '_128');
          });

          req.body.image = filename;
          next();
        } else {
          //delete the file and call the
          //error handler (can be solved with a microservice)
          await deleteFile(path);
          next(createError(422, 'File is not an image'));
        }
      } else {
        next();
      }
    });
  };
};
module.exports = imageUploader;
