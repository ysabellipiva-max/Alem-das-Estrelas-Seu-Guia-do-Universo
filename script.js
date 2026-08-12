/**
 * OrbitDev Studio - Scripts Principais
 * Recursos: Gerenciamento de abas, alternância de tema escuro/claro,
 * cópia para área de transferência e simulação de dados interativos.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initThemeToggle();
  initCopyCode();
  initDemoInteractivity();
});

/* ==========================================================================
   1. GERENCIADOR DE ABAS (TAB SYSTEM)
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Desativa todas as abas e botões
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });

      tabContents.forEach(content => {
        content.classList.remove('active');
      });

      // Ativa a aba clicada
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      
      const activePanel = document.getElementById(`panel-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. ALTERNADOR DE TEMA (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = themeBtn?.querySelector('.theme-icon');
  
  // Recupera tema do LocalStorage ou define escuro por padrão
  const savedTheme = localStorage.getItem('orbit_theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  themeBtn?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('orbit_theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });
}

function updateThemeIcon(theme, iconElement) {
  if (iconElement) {
    iconElement.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
}

/* ==========================================================================
   3. COPIAR CÓDIGO DA ABA ATIVA
   ========================================================================== */
function initCopyCode() {
  const copyBtn = document.getElementById('copy-code-btn');

  copyBtn?.addEventListener('click', async () => {
    const activeContent = document.querySelector('.tab-content.active pre code');
    if (!activeContent) return;

    try {
      await navigator.clipboard.writeText(activeContent.innerText);
      
      // Feedback visual ao usuário
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span>Copiado!</span> ✅';
      copyBtn.style.color = '#10b981';

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.color = '';
      }, 2000);
    } catch (err) {
      console.error('Falha ao copiar código:', err);
    }
  });
}

/* ==========================================================================
   4. DEMONSTRAÇÃO INTERATIVA DO WIDGET
   ========================================================================== */
function initDemoInteractivity() {
  const pingBtn = document.getElementById('btn-ping-demo');
  const fetchBtn = document.getElementById('btn-fetch-data');
  const pingsCounter = document.getElementById('pings-count');
  const latencyVal = document.getElementById('latency-val');
  const consoleOutput = document.getElementById('api-output');

  let pingCount = 0;

  // Botão de Enviar Ping
  pingBtn?.addEventListener('click', () => {
    pingCount++;
    if (pingsCounter) pingsCounter.textContent = pingCount;

    // Latência aleatória entre 10ms e 40ms
    const randomLatency = Math.floor(Math.random() * 30) + 10;
    if (latencyVal) latencyVal.textContent = `${randomLatency} ms`;

    const timestamp = new Date().toLocaleTimeString();
    if (consoleOutput) {
      consoleOutput.innerHTML = `<span style="color:#10b981;">[${timestamp}]</span> Sinal enviado com sucesso! Reforçando conexão orbital...`;
    }
  });

  // Botão de Simulação de API pública
  fetchBtn?.addEventListener('click', async () => {
    if (!consoleOutput) return;
    
    consoleOutput.textContent = 'Buscando dados da API pública (SpaceX Telemetry)...';

    try {
      // Consumo de API real simples (Último lançamento da SpaceX)
      const res = await fetch('https://api.spacexdata.com/v4/launches/latest');
      const data = await res.json();

      consoleOutput.innerHTML = `
        <strong style="color: #6366f1;">Missão Recebida:</strong> ${data.name}<br>
        <strong>Número de Voo:</strong> #${data.flight_number}<br>
        <strong>Data do Lançamento:</strong> ${new Date(data.date_utc).toLocaleDateString('pt-BR')}
      `;
    } catch (err) {
      // Fallback em caso de falha de rede
      consoleOutput.textContent = 'Erro ao carregar dados externos. Verifique sua conexão.';
    }
  });
}
