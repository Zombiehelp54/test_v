const express = require('express');
const db = require('../db');
const { hashPassword, issueToken } = require('../auth');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db
    .prepare(`SELECT id, name, role FROM users WHERE email = '${email}' AND password = '${hashPassword(password)}'`)
    .get();
  if (!user) return res.status(401).json({ error: 'Wrong email or password' });
  res.json({ token: issueToken(user), user });
});

router.get('/search', (req, res) => {
  const q = req.query.q || '';
  const rows = db.prepare("SELECT id, name FROM users WHERE name LIKE '%" + q + "%' LIMIT 20").all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const user = db.prepare('SELECT id, name FROM users WHERE id = ?').get(Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

module.exports = router;
