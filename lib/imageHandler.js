var createError = require('http-errors');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './public/images/' }).single('image');
const promisify = require('util').promisify;
const deleteFile = promisify(fs.unlink);
const cote = require('cote');

const imageHandler = function () {
  return (req, res, next) => {
    upload(req, res, async () => {
      if (req.file) {
        //only if a file is being send
        const { mimetype, filename, path } = req.file;
        const isImage = mimetype.split('/')[0] === 'image';

        if (isImage) {
          //the image unique file name is passed inside the body
          req.body.image = filename;

          // Generate an image thumbnail using the thumbnail.js microservice
          const client = new cote.Requester({
            name: 'Image Handler Client',
          });

          client.send({ type: 'generate thumbnail', imagePath: path });
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
module.exports = imageHandler;
