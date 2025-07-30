// app.js
const express = require('express');
const app = express();
const port = 3000;
const { calculateEntropy } = require('./entropy');

let trafficData = [];

app.use(express.static('public'));

// Middleware to track IPs
app.use((req, res, next) => {
  let ip = req.query.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Normalize IP
  if (ip === '::1' || ip.startsWith('::ffff:')) {
    ip = ip.split(':').pop();
  }

  trafficData.push(ip);
  console.log("Incoming IP:", ip);
  next();
});

// Base route
app.get('/', (req, res) => {
  res.send("Traffic logged. Use /check-ddos to check status.");
});

// DDoS Detection route
app.get('/check-ddos', (req, res) => {
  const entropy = calculateEntropy(trafficData);
  const isDDoS = entropy < 2.5;

  res.json({
    entropy: entropy.toFixed(4),
    ddosDetected: isDDoS,
    message: isDDoS ? '⚠️ Potential DDoS Attack Detected!' : '✅ Normal Traffic'
  });
});

// Optional: Debug route to inspect data
app.get('/log', (req, res) => {
  res.json({
    totalIPs: trafficData.length,
    uniqueIPs: [...new Set(trafficData)].length,
    sample: trafficData.slice(0, 10)
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
