/* Roteiros Poços de Caldas – script.js */

/* ============================================================
   MOBILE MENU
   ============================================================ */
const navToggle = document.getElementById('nav-toggle');
const mainNav   = document.getElementById('main-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================================
   STICKY HEADER
   ============================================================ */
const siteHeader = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  siteHeader?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ============================================================
   NAV ACTIVE STATE ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ============================================================
   GALLERY TABS
   ============================================================ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById('tab-' + target)?.classList.add('active');
  });
});

/* ============================================================
   WEATHER – Open-Meteo API
   Coords: Poços de Caldas, MG (-21.787, -46.561)
   ============================================================ */
const WMO = {
  0: 'Céu limpo', 1: 'Predominantemente limpo',
  2: 'Parcialmente nublado', 3: 'Nublado',
  45: 'Neblina', 48: 'Neblina com geada',
  51: 'Garoa leve', 53: 'Garoa moderada', 55: 'Garoa intensa',
  61: 'Chuva leve', 63: 'Chuva moderada', 65: 'Chuva forte',
  71: 'Neve leve', 73: 'Neve moderada', 75: 'Neve forte',
  80: 'Pancadas de chuva', 81: 'Pancadas moderadas', 82: 'Pancadas intensas',
  95: 'Tempestade', 96: 'Tempestade c/ granizo', 99: 'Tempestade intensa',
};

async function loadWeather() {
  const loading = document.getElementById('weather-loading');
  const content = document.getElementById('weather-content');
  if (!loading || !content) return;

  try {
    const url = 'https://api.open-meteo.com/v1/forecast' +
      '?latitude=-21.787&longitude=-46.561' +
      '&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m' +
      '&timezone=America%2FSao_Paulo';

    const res  = await fetch(url);
    const data = await res.json();
    const c    = data.current;

    document.getElementById('weather-temp').textContent =
      Math.round(c.temperature_2m) + '°C';
    document.getElementById('weather-desc').textContent =
      WMO[c.weathercode] || 'Condição variável';

    document.getElementById('weather-details').innerHTML =
      '<div class="weather-detail-item">💨 Vento: ' + Math.round(c.windspeed_10m) + ' km/h</div>' +
      '<div class="weather-detail-item">💧 Umidade: ' + c.relativehumidity_2m + '%</div>';

    const now = new Date(c.time);
    document.getElementById('weather-updated').textContent =
      'Atualizado: ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    loading.style.display = 'none';
    content.style.display = 'block';
  } catch (_) {
    if (loading) loading.textContent = 'Não foi possível carregar as condições climáticas.';
  }
}

loadWeather();

/* ============================================================
   CONTACT FORM → WHATSAPP
   ============================================================ */
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome     = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const roteiro  = document.getElementById('roteiro').value;
  const pessoas  = document.getElementById('pessoas').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !telefone || !mensagem) {
    alert('Por favor, preencha Nome, Telefone e Mensagem.');
    return;
  }

  let text = 'Olá! Meu nome é *' + nome + '*.';
  if (roteiro)  text += '\n\nRoteiro de interesse: *' + roteiro + '*';
  if (pessoas)  text += '\nNúmero de pessoas: *' + pessoas + '*';
  text += '\nMeu contato: *' + telefone + '*';
  if (mensagem) text += '\n\nMensagem:\n' + mensagem;

  window.open(
    'https://wa.me/5535988951441?text=' + encodeURIComponent(text),
    '_blank', 'noopener,noreferrer'
  );
});

/* ============================================================
   COOKIE BANNER
   ============================================================ */
const cookieBanner = document.getElementById('cookie-banner');
const COOKIE_KEY   = 'rpc_cookies_v1';

if (cookieBanner && !localStorage.getItem(COOKIE_KEY)) {
  setTimeout(() => cookieBanner.classList.add('show'), 1400);
}

document.getElementById('cookie-accept')?.addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'accepted');
  cookieBanner?.classList.remove('show');
});

document.getElementById('cookie-decline')?.addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'declined');
  cookieBanner?.classList.remove('show');
});
