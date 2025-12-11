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

  // ===== COOKIE BANNER =====
  const cookieBanner = document.getElementById("cookie-banner");
  const btnAccept = document.getElementById("cookie-accept");
  const btnConfig = document.getElementById("cookie-config");

  if (cookieBanner && btnAccept) {
    const accepted = localStorage.getItem("cookies_accepted_roteiros");

    if (accepted === "yes") {
      cookieBanner.style.display = "none";
    }

    btnAccept.addEventListener("click", () => {
      localStorage.setItem("cookies_accepted_roteiros", "yes");
      cookieBanner.style.display = "none";
    });

    if (btnConfig) {
      btnConfig.addEventListener("click", () => {
        alert(
          "Em breve você poderá configurar suas preferências de cookies por aqui."
        );
      });
    }
  }

  // ===== CLIMA AO VIVO (Open-Meteo) =====
  (function () {
    const latitude = -21.7878;
    const longitude = -46.5608;

    const url =
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&current_weather=true" +
      "&timezone=auto";

    const loadingEl = document.getElementById("weather-loading");
    const contentEl = document.getElementById("weather-content");
    const tempEl = document.getElementById("weather-temp");
    const descEl = document.getElementById("weather-desc");
    const extraEl = document.getElementById("weather-extra");
    const updatedEl = document.getElementById("weather-updated");

    if (!loadingEl || !contentEl) return;

    function weatherCodeToText(code) {
      if (code === 0) return "Céu limpo";
      if (code === 1) return "Poucas nuvens";
      if (code === 2) return "Parcialmente nublado";
      if (code === 3) return "Nublado";
      if (code === 45 || code === 48) return "Nevoeiro";
      if (code === 51 || code === 53 || code === 55) return "Garoa";
      if (code === 56 || code === 57) return "Garoa congelante";
      if (code === 61 || code === 63 || code === 65) return "Chuva";
      if (code === 66 || code === 67) return "Chuva congelante";
      if (code === 71 || code === 73 || code === 75) return "Neve";
      if (code === 77) return "Grãos de neve";
      if (code === 80 || code === 81 || code === 82) return "Pancadas de chuva";
      if (code === 85 || code === 86) return "Pancadas de neve";
      if (code === 95) return "Trovoadas";
      if (code === 96 || code === 99) return "Trovoadas com granizo";
      return "Condição variável";
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data || !data.current_weather) {
          throw new Error("Sem dados de clima");
        }

        const c = data.current_weather;

        loadingEl.style.display = "none";
        contentEl.style.display = "block";

        const temp = Math.round(c.temperature);
        tempEl.innerHTML = temp + "<small>°C</small>";
        descEl.textContent = weatherCodeToText(c.weathercode);

        const wind = Math.round(c.windspeed);
        const dir = c.winddirection;
        const time = new Date(c.time);

        extraEl.innerHTML = "";
        extraEl.insertAdjacentHTML(
          "beforeend",
          "<span>Vento: " + wind + " km/h</span>"
        );
        extraEl.insertAdjacentHTML(
          "beforeend",
          "<span>Direção: " + Math.round(dir) + "°</span>"
        );

        updatedEl.textContent =
          "Última atualização: " +
          time.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }) +
          " · Fonte: Open-Meteo";
      })
      .catch(function () {
        loadingEl.textContent =
          "Não foi possível carregar o clima agora. Tente novamente mais tarde.";
      });
  })();
});
