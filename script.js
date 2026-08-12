// Lógica das Abas
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Lógica da Calculadora Espacial
const calcBtn = document.getElementById('calc-btn');
if (calcBtn) {
  calcBtn.addEventListener('click', () => {
    const earthWeight = parseFloat(document.getElementById('earth-weight').value);
    const resultDiv = document.getElementById('weight-result');

    if (isNaN(earthWeight) || earthWeight <= 0) {
      resultDiv.innerHTML = '<p style="color: #ff5555; margin-top: 10px;">Insira um peso válido.</p>';
      return;
    }

    const moonWeight = (earthWeight * 0.166).toFixed(1);
    const marsWeight = (earthWeight * 0.377).toFixed(1);
    const jupiterWeight = (earthWeight * 2.36).toFixed(1);

    resultDiv.innerHTML = `
      <div style="margin-top: 15px; line-height: 1.6;">
        <p>🌕 <strong>Lua:</strong> ${moonWeight} kg</p>
        <p>🔴 <strong>Marte:</strong> ${marsWeight} kg</p>
        <p>🪐 <strong>Júpiter:</strong> ${jupiterWeight} kg</p>
      </div>
    `;
  });
}
