// simulateTraffic.js
const axios = require('axios');

const generateRandomIP = () => {
  return Array(4).fill(0).map(() => Math.floor(Math.random() * 255)).join('.');
};

const sendTraffic = async (count, sameIP = false) => {
  for (let i = 0; i < count; i++) {
    const ip = sameIP ? '192.168.1.1' : generateRandomIP();
    await axios.get(`http://localhost:3000/?ip=${ip}`);
  }

  console.log(`Sent ${count} ${sameIP ? 'DDoS' : 'Normal'} requests.`);
};

sendTraffic(100, false); // false = normal, true = DDoS
