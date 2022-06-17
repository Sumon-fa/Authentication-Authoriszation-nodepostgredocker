const multer = require("multer");
const { v4 } = require("uuid");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

/*const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, v4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});*/
const fileUpload = multer({
  storage: multerS3({
    s3,
    bucket: "car-photo-auto",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: "public-read",
    key: function (req, file, cb) {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, v4() + "." + ext);
    },
  }),
});
module.exports = fileUpload;
