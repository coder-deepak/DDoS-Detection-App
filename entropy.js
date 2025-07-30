// entropy.js
function calculateEntropy(ipArray) {
  const total = ipArray.length;
  const freqMap = {};

  ipArray.forEach(ip => {
    freqMap[ip] = (freqMap[ip] || 0) + 1;
  });

  let entropy = 0;
  for (let ip in freqMap) {
    const p = freqMap[ip] / total;
    entropy -= p * Math.log2(p);
  }

  return entropy;
}

module.exports = { calculateEntropy };
