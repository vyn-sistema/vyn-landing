document.addEventListener('DOMContentLoaded', () => {
  // 1. Simulación de Terminal
  const lines = [
    { text: 'vyn init --cluster=production', delay: 40 },
    { text: '[OK] Hostinger VPS connected (76.13.172.95)', delay: 20 },
    { text: '[OK] Cloudflare Edge Routing active', delay: 20 },
    { text: 'vyn run pipeline:financial-reconciliation', delay: 40 },
    { text: '[STATUS] Processing BYMA clearing settlement...', delay: 20 },
    { text: '[DONE] Automated pipeline executed in 142ms.', delay: 20 },
    { text: 'system idle. ready for input.', delay: 20 }
  ];

  const terminalBody = document.getElementById('terminal-content');
  let currentLine = 0;

  function typeLine() {
    if (currentLine >= lines.length) return;
    const item = lines[currentLine];
    const lineEl = document.createElement('div');
    lineEl.className = 'terminal-line';

    if (item.text.startsWith('vyn')) {
      lineEl.innerHTML = '<span class=\"terminal-prompt\">vyn@root:~$</span> <span class=\"cmd-text\"></span>';
      terminalBody.appendChild(lineEl);
      const targetSpan = lineEl.querySelector('.cmd-text');
      let charIndex = 0;

      const charInterval = setInterval(() => {
        targetSpan.textContent += item.text[charIndex];
        charIndex++;
        if (charIndex >= item.text.length) {
          clearInterval(charInterval);
          currentLine++;
          setTimeout(typeLine, 400);
        }
      }, item.delay);
    } else {
      lineEl.innerHTML = '<span class=\"terminal-output\">' + item.text + '</span>';
      terminalBody.appendChild(lineEl);
      currentLine++;
      setTimeout(typeLine, 300);
    }
  }

  setTimeout(typeLine, 600);

  // 2. Copiado rápido de Email
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const email = 'vyn.automatizacion@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(email).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      });
    });
  }
});
