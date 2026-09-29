const express = require('express');
const { requireUser } = require('./auth');

const app = express();
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/notes', requireUser, require('./routes/notes'));
app.use('/files', requireUser, require('./routes/files'));
app.use('/reports', requireUser, require('./routes/reports'));
app.use('/webhooks', requireUser, require('./routes/webhooks'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`notes-api listening on ${port}`));
