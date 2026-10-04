// Copyright (c) 2026 Ali Izzeddin Mohammad Hasan. All rights reserved.
// Language switch (Arabic <-> English, remembered) and a gentle reveal on scroll.
(function () {
  const root = document.documentElement;
  const button = document.getElementById("lang");
  const titles = {
    ar: "علي حسن | مطوّر مواقع ويب وبرمجيات",
    en: "Ali Hasan | Web & Software Developer",
  };

  function setLanguage(lang) {
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-ar]").forEach((el) => {
      el.innerHTML = el.dataset[lang];
    });
    document.title = titles[lang];
    button.textContent = lang === "ar" ? "EN" : "عربي";
    try { localStorage.setItem("lang", lang); } catch (e) { /* private mode */ }
  }

  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) { /* private mode */ }
  if (saved === "en") setLanguage("en");
  button.addEventListener("click", () => setLanguage(root.lang === "ar" ? "en" : "ar"));

  const items = document.querySelectorAll(".card, .project, .skill-group, h2");
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("shown");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => { el.classList.add("reveal"); observer.observe(el); });
})();
