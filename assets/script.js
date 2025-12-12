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

  // Apenas executa se os elementos do banner existirem
  if (cookieBanner && btnAccept && btnConfig) {
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

  // ===== CLIMA – OPEN-METEO =====
  (function () {
    const loadingEl = document.getElementById("weather-loading");
    const contentEl = document.getElementById("weather-content");
    const tempEl = document.getElementById("weather-temp");
    const descEl = document.getElementById("weather-desc");
    const extraEl = document.getElementById("weather-extra");
    const updatedEl = document.getElementById("weather-updated");

    // Se não achar os elementos, não faz nada (evita erro)
    if (!loadingEl || !contentEl || !tempEl || !descEl || !extraEl || !updatedEl) {
      console.warn("Bloco de clima não encontrado no DOM.");
      return;
    }

    // Coordenadas de Poços de Caldas
    const latitude = -21.79;
    const longitude = -46.56;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

    fetch(url )
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

        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        const dir = data.current_weather.winddirection;

        // Esconde o "Carregando..." e mostra os dados
        loadingEl.style.display = "none";
        contentEl.style.display = "block";

        tempEl.innerHTML = `${temp.toFixed(1)}<small>°C</small>`;
        descEl.textContent = `Vento: ${wind.toFixed(0)} km/h · Direção: ${dir.toFixed(0)}°`;
        extraEl.textContent = `Fonte: Open-Meteo · Código do tempo: ${data.current_weather.weathercode}`;
        updatedEl.textContent = `Última atualização: ${new Date().toLocaleString("pt-BR")}`;
      })
      .catch((error) => {
        console.error("Erro ao carregar clima:", error);
        loadingEl.textContent =
          "Não foi possível carregar as informações de clima no momento. Tente novamente mais tarde.";
      });
  })();
}); // <-- Certifique-se de que esta é a chave de fechamento final do DOMContentLoaded
