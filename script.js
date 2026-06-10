/* ============================================================
   RESGALLA ADVOCACIA — script.js
   ============================================================ */

"use strict";

/* ── Utility: smooth scroll to section ─────────────────────── */
function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ============================================================
   NAVBAR — scroll state + mobile menu
   ============================================================ */
(function initNavbar() {
  const navbar       = document.getElementById("navbar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu   = document.getElementById("mobile-menu");
  const mobileCloseBtn = document.getElementById("mobile-close-btn");

  // Scroll: add/remove is-scrolled class
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load

  // Toggle mobile menu open/close
  function openMenu() {
    mobileMenu.classList.add("is-open");
    hamburgerBtn.classList.add("is-active"); // Adiciona o gatilho da animação do X
    document.body.style.overflow = "hidden";
    hamburgerBtn.setAttribute("aria-expanded", "true");
    hamburgerBtn.setAttribute("aria-label", "Fechar menu");
  }

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    hamburgerBtn.classList.remove("is-active"); // Remove o gatilho da animação do X
    document.body.style.overflow = "";
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Abrir menu");
  }

  hamburgerBtn.addEventListener("click", function () {
    if (mobileMenu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener("click", closeMenu);
  }

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      closeMenu();
    }
  });
})();

/* Mobile nav click — close menu then scroll */
function mobileNavClick(selector) {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  
  mobileMenu.classList.remove("is-open");
  if (hamburgerBtn) hamburgerBtn.classList.remove("is-active"); // Reseta o X ao clicar em um link
  document.body.style.overflow = "";

  setTimeout(function () {
    scrollToSection(selector);
  }, 80);
}

/* ============================================================
   SCROLL REVEAL — IntersectionObserver
   ============================================================ */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const d  = parseFloat(el.dataset.delay || "0");
          el.style.transitionDelay = d + "s";
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    },
    { rootMargin: "-60px 0px", threshold: 0.01 }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ============================================================
   HERO ENTRANCE ANIMATIONS (run after DOMContentLoaded)
   ============================================================ */
(function initHeroAnimations() {
  const heroEls = document.querySelectorAll(".animate-fadein");

  heroEls.forEach(function (el) {
    const d = parseFloat(el.dataset.delay || "0");
    setTimeout(function () {
      el.classList.add("is-visible");
    }, d * 1000);
  });
})();

/* ============================================================
   FOOTER — copyright dinamico - altera com o ano atual
   ============================================================ */
(function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) {
    const year = new Date().getFullYear();
    el.textContent = "© " + year + " Resgala Advocacia. Todos os direitos reservados.";
  }
})();