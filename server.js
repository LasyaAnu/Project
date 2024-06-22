const express = require('express');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 8080;

const storage = new Storage();
const bucket = storage.bucket('your-bucket-name');
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.end(req.file.buffer);
    blobStream.on('finish', () => {
      res.status(200).send('File uploaded.');
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(Server running at http://localhost:${port});
});
