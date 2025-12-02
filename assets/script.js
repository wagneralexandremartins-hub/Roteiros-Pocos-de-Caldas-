// Ano automático no rodapé
const anoSpan = document.getElementById("ano-atual");
if (anoSpan) {
  anoSpan.textContent = new Date().getFullYear();
}

// Cookies
function aceitarCookies() {
  localStorage.setItem("cookies_roteiros_pocos", "aceito");
  const banner = document.getElementById("cookieBanner");
  if (banner) banner.style.display = "none";
}

// Ocultar banner se já aceitou
(function () {
  const aceito = localStorage.getItem("cookies_roteiros_pocos");
  if (aceito === "aceito") {
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.style.display = "none";
  }
})();
