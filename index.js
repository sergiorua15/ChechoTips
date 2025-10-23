// Checho Tips - renderizado simple del lado del cliente, búsqueda y cambio de tema

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
  },
  {
    id: 6,
    kicker: 'IA',
    title: 'DALL-E 3: La nueva generación de arte IA',
    excerpt: 'Exploramos las capacidades mejoradas y el impacto en el arte digital.',
    date: '2025-10-20',
    image: 'img/Dall_e.jpg',
    color: '#4ade80'
  },
  {
    id: 7,
    kicker: 'Desarrollo',
    title: 'Bun vs. Node.js: ¿El fin de una era?',
    excerpt: 'Analizamos el nuevo runtime de JavaScript y su impacto en el ecosistema Node.js.',
    date: '2025-10-25',
    image: 'img/placeholder.jpg',
    color: '#f59e0b'
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

    const imgContainer = document.createElement('div');
    imgContainer.className = 'card-img-container';

    const img = document.createElement('img');
    img.className = 'card-img';
    img.src = a.image;
    img.alt = a.title;
    img.loading = 'lazy';
    img.onerror = () => {
      img.src = 'img/placeholder.jpg';
      img.onerror = null;
    };

    imgContainer.appendChild(img);

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const kicker = document.createElement('div');
    kicker.className = 'kicker';
    kicker.style.color = a.color;
    kicker.textContent = a.kicker;

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = a.title;

    const excerpt = document.createElement('div');
    excerpt.className = 'excerpt';
    excerpt.textContent = a.excerpt;

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = a.date;

    const readMore = document.createElement('a');
    readMore.className = 'read-more';
    readMore.textContent = 'Leer más →';
    readMore.href = '#';

    cardContent.appendChild(kicker);
    cardContent.appendChild(title);
    cardContent.appendChild(excerpt);
    cardContent.appendChild(meta);
    cardContent.appendChild(readMore);

    card.appendChild(imgContainer);
    card.appendChild(cardContent);

    grid.appendChild(card);
    // Animar la entrada
    requestAnimationFrame(() => {
      card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    });
  });
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