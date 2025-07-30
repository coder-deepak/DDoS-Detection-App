async function checkDDoS() {
  const entropySpan = document.getElementById('entropy');
  const statusSpan = document.getElementById('status');
  const loader = document.getElementById('loader');

  // Show loader
  loader.classList.remove('hidden');
  entropySpan.textContent = "--";
  statusSpan.textContent = "Checking...";
  statusSpan.style.color = "#555";

  try {
    const res = await fetch('/check-ddos');
    const data = await res.json();

    setTimeout(() => {
      loader.classList.add('hidden');
      entropySpan.textContent = data.entropy;
      statusSpan.textContent = data.message;
      statusSpan.style.color = data.ddosDetected ? 'red' : 'green';
    }, 1000); // 1s delay for smooth UI
  } catch (err) {
    loader.classList.add('hidden');
    entropySpan.textContent = "--";
    statusSpan.textContent = "⚠️ Error fetching data";
    statusSpan.style.color = "orange";
  }
}

checkDDoS(); // Auto run once on page load
