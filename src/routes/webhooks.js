const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/test', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.post(url, { event: 'test', user: req.user.id }, { timeout: 5000 });
    res.json({ status: response.status, body: response.data });
  } catch (err) {
    res.status(502).json({ error: 'Webhook did not answer', detail: err.message });
  }
});

module.exports = router;
