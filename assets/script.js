document.addEventListener("DOMContentLoaded", function () {
  // ===== MENU MOBILE =====
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const visible = nav.style.display === "flex";
      nav.style.display = visible ? "none" : "flex";
    });
  }

  // Fecha menu ao clicar em um link (mobile)
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900 && nav) {
        nav.style.display = "none";
      }
    });
  });

  // ===== ROLAGEM SUAVE =====
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

    // =========================
    //     COOKIE BANNER NOVO
    // =========================
  const cookieBanner = document.getElementById("cookie-banner");
  const btnAccept = document.getElementById("cookie-accept");
  const btnConfig = document.getElementById("cookie-config");

  // Mostrar banner apenas se ainda não aceitou
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.classList.add("active");
    }

// Botão ACEITAR
btnAccept.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "yes");
  cookieBanner.classList.remove("active");
});

// Botão CONFIGURAR (abre aviso)
btnConfig.addEventListener("click", () => {
  alert("Configurações de cookies estarão disponíveis em breve.");
  });

    }
  }
// ===== CLIMA – OPEN-METEO =====
const weatherLoading = document.getElementById("weather-loading");
const weatherContent = document.getElementById("weather-content");
const weatherTemp = document.getElementById("weather-temp");
const weatherDesc = document.getElementById("weather-desc");
const weatherExtra = document.getElementById("weather-extra");
const weatherUpdated = document.getElementById("weather-updated");

if (
  weatherLoading &&
  weatherContent &&
  weatherTemp &&
  weatherDesc &&
  weatherExtra &&
  weatherUpdated
) {
  // Coordenadas de Poços de Caldas
  const latitude = -21.79;
  const longitude = -46.56;

  const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=America%2FSao_Paulo`;

  fetch(urlClima)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }
      return response.json();
    })
    .then((data) => {
      if (!data.current_weather) {
        throw new Error("Dados de clima indisponíveis");
      }

      const temp = data.current_weather.temperature; // ºC
      const vento = data.current_weather.windspeed;  // km/h
      const direcao = data.current_weather.winddirection; // graus

      weatherTemp.innerHTML = `${temp.toFixed(1)}<small>ºC</small>`;
      weatherDesc.textContent = `Vento: ${vento.toFixed(
        0
      )} km/h · Direção: ${direcao.toFixed(0)}º`;

      weatherExtra.textContent = "";

      const agora = new Date();
      weatherUpdated.textContent = `Atualizado em ${agora.toLocaleString(
        "pt-BR"
      )}`;

      weatherLoading.style.display = "none";
      weatherContent.style.display = "block";
    })
    .catch((error) => {
      console.error("Erro ao carregar clima:", error);
      weatherLoading.textContent =
        "Não foi possível carregar as informações de clima no momento. Tente novamente mais tarde.";
    });
}
