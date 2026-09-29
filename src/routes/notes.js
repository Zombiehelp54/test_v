const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/:id', (req, res) => {
  const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(Number(req.params.id));
  if (!note) return res.status(404).json({ error: 'Not found' });
  res.json(note);
});

router.get('/:id/preview', (req, res) => {
  const note = db
    .prepare('SELECT * FROM notes WHERE id = ? AND owner_id = ?')
    .get(Number(req.params.id), req.user.id);
  if (!note) return res.status(404).send('Not found');
  const theme = req.query.theme || 'light';
  res.send(`<html><body class="${theme}"><h1>${note.title}</h1><div>${note.body}</div></body></html>`);
});

module.exports = router;
