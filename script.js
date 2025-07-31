
AOS.init();

function changeColor(color) {
  document.documentElement.style.setProperty('--theme-color', color);
  localStorage.setItem('themeColor', color);
}

function setLanguage(lang) {
  i18next.changeLanguage(lang, () => {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
      const key = elem.getAttribute('data-i18n');
      elem.textContent = i18next.t(key);
    });
  });
  localStorage.setItem('language', lang);
}

function startIntro() {
  introJs().setOptions({
    steps: [
      { intro: "👋 Welcome to Arduinome!" },
      { element: document.querySelector('.hero h1'), intro: "Your dashboard for free Arduino tools!" },
      { element: document.querySelector('.customizer'), intro: "You can customize your theme color here!" },
      { element: document.querySelector('.language-switcher'), intro: "Switch languages easily!" }
    ]
  }).start();
}

window.onload = () => {
  const savedColor = localStorage.getItem('themeColor');
  if (savedColor) changeColor(savedColor);

  const lang = localStorage.getItem('language') || 'en';
  i18next.init({
    lng: lang,
    resources: {
      en: { translation: { welcome: "Welcome to Arduinome", desc: "Free Arduino projects, tools, libraries, and multilingual support.", tour: "Take a Tour", customize: "Choose Your Theme", projects: "Projects", tools: "Tools", about: "About", contact: "Contact" } },
      ar: { translation: { welcome: "مرحبًا بك في أردوينومي", desc: "مشاريع أردوينو وأدوات ومكتبات ودعم لغات متعدد.", tour: "ابدأ الجولة", customize: "اختر اللون", projects: "المشاريع", tools: "الأدوات", about: "حول", contact: "تواصل معنا" } },
      fr: { translation: { welcome: "Bienvenue à Arduinome", desc: "Projets, outils et bibliothèques Arduino avec multilingue.", tour: "Commencer la visite", customize: "Choisissez votre thème", projects: "Projets", tools: "Outils", about: "À propos", contact: "Contact" } }
    }
  }, () => setLanguage(lang));
};
