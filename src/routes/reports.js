const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

router.get('/export', (req, res) => {
  const format = req.query.format || 'csv';
  const month = req.query.month || new Date().toISOString().slice(0, 7);
  const out = `exports/notes-${req.user.id}-${month}.${format}`;
  exec(`python3 scripts/export_notes.py --user ${req.user.id} --month ${month} --format ${format} --out ${out}`, err => {
    if (err) return res.status(500).json({ error: 'Export failed' });
    res.download(out);
  });
});

module.exports = router;
