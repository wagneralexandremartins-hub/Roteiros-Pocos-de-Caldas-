// Ano automático no rodapé
const anoSpan = document.getElementById("ano-atual");
if (anoSpan) {
  anoSpan.textContent = new Date().getFullYear();
}

// Banner de cookies
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".cookie-banner");
  const botaoAceitar = document.querySelector("[data-cookie-accept]");
  const botaoConfig = document.querySelector("[data-cookie-config]");
  const STORAGE_KEY = "cookies_roteiros_pocos";

  if (!banner) return;

  // Se já aceitou antes, não mostra o banner
  const jaAceitou = localStorage.getItem(STORAGE_KEY);
  if (jaAceitou === "aceito") {
    banner.style.display = "none";
    return;
  }

  // Clique em "Aceitar"
  if (botaoAceitar) {
    botaoAceitar.addEventListener("click", function () {
      localStorage.setItem(STORAGE_KEY, "aceito");
      banner.style.display = "none";
    });
  }

  // Clique em "Configurar"
  if (botaoConfig) {
    botaoConfig.addEventListener("click", function () {
      alert("Em breve: painel de configuração de cookies.");
    });
  }
});
