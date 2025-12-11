// MENU MOBILE
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const visible = nav.style.display === "flex";
      nav.style.display = visible ? "none" : "flex";
    });
  }

  // ROLAGEM SUAVE PARA LINKS DO MENU
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

        // Fecha menu no mobile
        if (window.innerWidth <= 900 && nav) {
          nav.style.display = "none";
        }
      }
    });
  });

  // COOKIE BANNER
  const cookieBanner = document.getElementById("cookie-banner");
  const btnAccept = document.getElementById("cookie-accept");
  const btnConfig = document.getElementById("cookie-config");

  if (cookieBanner && btnAccept) {
    const accepted = localStorage.getItem("cookies_accepted");

    if (accepted === "yes") {
      cookieBanner.style.display = "none";
    }

    btnAccept.addEventListener("click", () => {
      localStorage.setItem("cookies_accepted", "yes");
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
});
