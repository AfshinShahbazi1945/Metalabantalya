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
      setTimeout(function(){
        target.scrollIntoView({
          behavior:"smooth",
          block:"start"
        });
      },180);
    }
  }
})();


/* 7. WhatsApp hızlı iletişim */
(function () {
  "use strict";

  var button = document.querySelector(".wa-float");
  var greeting = document.querySelector(".wa-greeting");

  if (!button) return;

  var ringTimer = null;

  function ring() {
    button.classList.remove("is-ringing");
    void button.offsetWidth;
    button.classList.add("is-ringing");

    window.setTimeout(function () {
      button.classList.remove("is-ringing");
    }, 1300);
  }

  /* İlk hareket */
  window.setTimeout(ring, 1800);

  /* Daha sonra rahatsız etmeyen aralıklarla */
  ringTimer = window.setInterval(ring, 11000);

  button.addEventListener("mouseenter", function () {
    button.classList.remove("is-ringing");
  });

  button.addEventListener("focus", function () {
    button.classList.remove("is-ringing");
  });

  if (greeting) {
    var key = "metalab-wa-greeting-seen";

    try {
      if (!window.sessionStorage.getItem(key)) {
        window.setTimeout(function () {
          greeting.classList.add("is-visible");

          window.setTimeout(function () {
            greeting.classList.remove("is-visible");
          }, 3600);

          window.sessionStorage.setItem(key, "1");
        }, 2600);
      }
    } catch (error) {
      window.setTimeout(function () {
        greeting.classList.add("is-visible");

        window.setTimeout(function () {
          greeting.classList.remove("is-visible");
        }, 3600);
      }, 2600);
    }
  }
})();

