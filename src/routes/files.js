const express = require('express');
const path = require('path');

const router = express.Router();
const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || 'uploads');

router.get('/:name', (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.name);
  res.sendFile(filePath, err => {
    if (err) res.status(404).json({ error: 'No such file' });
  });
});

module.exports = router;
