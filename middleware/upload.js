const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');
    let name = file.mimetype.indexOf('\\');
    cb(null, `${date}-OutUp-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 50
};


module.exports = multer({ storage, fileFilter, limits });