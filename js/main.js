/* METALAB — Ortak etkileşimler (main.js) */
(function () {
  "use strict";

  /* 1. Scroll reveal — bölümler görünür oldukça belirir */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");
  if (targets.length && "IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add("in"); });
  }

  /* 2. Mobil menü aç/kapa */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  }

  /* 3. Güncel yıl */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* 4. İletişim formu → e-posta uygulamasında hazırlar (mailto) */
  var form = document.querySelector("[data-mailto]");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var to = form.getAttribute("data-mailto");
      var lab = form.getAttribute("data-lab-name") || "METALAB";
      var ad = (form.querySelector("[name=ad]") || {}).value || "";
      var mail = (form.querySelector("[name=eposta]") || {}).value || "";
      var tel = (form.querySelector("[name=telefon]") || {}).value || "";
      var msg = (form.querySelector("[name=mesaj]") || {}).value || "";
      var subject = lab + " — Teklif / Numune Talebi (" + ad + ")";
      var body =
        "Ad Soyad / Firma: " + ad + "\n" +
        "E-posta: " + mail + "\n" +
        "Telefon: " + tel + "\n\n" +
        "Mesaj:\n" + msg + "\n";
      window.location.href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();

/* 5. Analiz akordeonları: URL ile gelen grubu aç */
(function(){
  var id = window.location.hash ? window.location.hash.slice(1) : "";
  if(id){
    var target=document.getElementById(id);
    if(target && target.tagName.toLowerCase()==="details"){
      target.open=true;
      setTimeout(function(){target.scrollIntoView({behavior:"smooth",block:"start"});},180);
    }
  }
})();

/* 6. Hakkımızda — uzun metinleri aç/kapat */
(function () {
  "use strict";

  var aboutButton = document.querySelector(".about-toggle");

  if (aboutButton) {
    aboutButton.addEventListener("click", function () {
      var targetId = aboutButton.getAttribute("aria-controls");
      var target = document.getElementById(targetId);

      if (!target) return;

      var isOpen =
        aboutButton.getAttribute("aria-expanded") === "true";

      aboutButton.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      target.classList.toggle("is-open", !isOpen);

      var text =
        aboutButton.querySelector(".about-toggle__text");

      if (text) {
        text.textContent =
          isOpen ? "Devamını Oku" : "Daha Az Göster";
      }
    });
  }

  document
    .querySelectorAll(".value__toggle")
    .forEach(function (button) {

      button.addEventListener("click", function () {
        var card = button.closest(".value");
        var textArea = card
          ? card.querySelector(".value__text")
          : null;

        if (!textArea) return;

        var isOpen =
          button.getAttribute("aria-expanded") === "true";

        button.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );

        textArea.classList.toggle("is-open", !isOpen);

        var label =
          button.querySelector(".value__toggle-text");

        if (label) {
          label.textContent =
            isOpen ? "Devamını Oku" : "Daha Az Göster";
        }
      });
    });
})();
