import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { constants } from './data/constants.js';

// Get language code from localStorage or query param
const languageCode = localStorage.getItem('languageCode');
const languageCodeFromQueryParam = new URLSearchParams(window.location.search).get('lc');
const validLangaugeCodeFromQueryParam = constants.languages.includes(languageCodeFromQueryParam) ? languageCodeFromQueryParam : null;
const selectedLanguage = languageCode || validLangaugeCodeFromQueryParam || 'en';

// Set language code in localStorage
localStorage.setItem('languageCode', selectedLanguage);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)