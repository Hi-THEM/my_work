import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to FitTrack",
      "login": "Login",
      "register": "Register",
      "email": "Email Address",
      "password": "Password",
      // We will add more translations as needed
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue sur FitTrack",
      "login": "Connexion",
      "register": "S'inscrire",
      "email": "Adresse Email",
      "password": "Mot de passe",
    }
  }
};

const savedLanguage = localStorage.getItem('fittrack_language') || 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
