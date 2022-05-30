const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");
const keys = require("../config/keys");

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
});

module.exports = (app) => {
  app.get("/api/upload", (req, res) => {
    const key = `${req.user.id}/${nanoid()}.jpeg`;

    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "my-blog-name",
        ContentType: "jpeg",
        Key: key,
      },
      (err, url) => res.send({ key, url })
    );
  });
};
