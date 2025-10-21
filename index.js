// Checho Tips - simple client-side rendering, search and theme toggle

const sampleArticles = [
  { 
    id: 1, 
    kicker: 'IA', 
    title: 'GPT-Next: qué esperar de la próxima generación', 
    excerpt: 'Resumen de mejoras, rendimiento y casos de uso para creadores y desarrolladores.', 
    date: '2025-10-10',
    image: 'img/ai-next.jpg',
    color: '#7dd3fc'
  },
  { 
    id: 2, 
    kicker: 'Gadgets', 
    title: 'Los mejores auriculares inalámbricos 2025', 
    excerpt: 'Comparativa breve con pros y contras para cada segmento de precio.', 
    date: '2025-09-28',
    image: 'img/headphones.jpg',
    color: '#a78bfa'
  },
  { 
    id: 3, 
    kicker: 'Seguridad', 
    title: 'Cómo proteger tus cuentas con autenticación moderna', 
    excerpt: 'Guía práctica sobre MFA, llaves de seguridad y buenas prácticas.', 
    date: '2025-09-01',
    image: 'img/security.jpg',
    color: '#34d399'
  },
  { 
    id: 4, 
    kicker: 'Software', 
    title: 'Atajos de productividad con herramientas AI', 
    excerpt: 'Pequeños flujos que te ahorran horas: prompts, macros y automatizaciones.', 
    date: '2025-08-21',
    image: 'img/productivity.jpg',
    color: '#f472b6'
  },
  { 
    id: 5, 
    kicker: 'Móviles', 
    title: 'Android vs iOS: qué cambio importa en 2025', 
    excerpt: 'Nuevas políticas, privacidad y pequeños detalles que influyen en la elección.', 
    date: '2025-07-15',
    image: 'img/mobile.jpg',
    color: '#fbbf24'
  }
];const $ = selector => document.querySelector(selector);

function renderArticles(items) {
  const grid = $('#articles-grid');
  grid.innerHTML = '';
  if (!items.length) {
    $('#empty').hidden = false;
    return;
  }
  $('#empty').hidden = true;
  items.forEach(a => {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.transform = 'translateY(20px)';
    card.style.opacity = '0';
    card.innerHTML = `
      <div class="card-img-container">
        <img class="card-img" 
          src="${a.image}" 
          alt="${escapeHtml(a.title)}" 
          loading="lazy"
          onerror="this.src='img/placeholder.jpg'; this.onerror=null;">
      </div>
      <div class="card-content">
        <div class="kicker" style="color:${a.color}">${escapeHtml(a.kicker)}</div>
        <div class="title">${escapeHtml(a.title)}</div>
        <div class="excerpt">${escapeHtml(a.excerpt)}</div>
        <div class="meta">${a.date}</div>
      </div>
    `;
    grid.appendChild(card);
    // Animate entrance
    requestAnimationFrame(() => {
      card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    });
  });
}function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function initSearch() {
    const input = $('#search');
    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        const filtered = sampleArticles.filter(a => (a.title + ' ' + a.excerpt + ' ' + a.kicker).toLowerCase().includes(q));
        renderArticles(filtered);
    });
}

function initTheme() {
    const btn = $('#theme-toggle');
    const current = localStorage.getItem('chechotips:theme');
    if (current === 'light') document.body.classList.add('light');

    btn.addEventListener('click', () => {
        document.body.classList.toggle('light');
        const next = document.body.classList.contains('light') ? 'light' : 'dark';
        localStorage.setItem('chechotips:theme', next);
    });
}

function mountYear(){
    document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
    renderArticles(sampleArticles);
    initSearch();
    initTheme();
    mountYear();
});