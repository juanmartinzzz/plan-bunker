import React, { useState } from 'react';
import { constants } from '../data/constants';

const changeLanguage = ({ lang , setSelectedLanguage }) => {
  setSelectedLanguage(lang);
  localStorage.setItem('languageCode', lang);

  // Ideally all re-renders post language change, but it's such a big change it's proly not worth using React for it.
  window.location.reload();
}

const MenuBar = () => {
  const languageCode = localStorage.getItem('languageCode');
  const [selectedLanguage, setSelectedLanguage] = useState(languageCode);

  return (
    <div className="sticky top-0 right-0 z-10">
      <div className="relative m-2">
        <div className="absolute right-0 p-1 pl-2 flex items-center gap-2 text-white text-sm bg-primary/80 rounded-full">
          <span className="text-gray-400">Lang</span>
          {constants.languages.map((lang) => (
            <div key={lang} className={`${selectedLanguage === lang ? 'bg-secondary/66 rounded-full font-bold' : ''} w-6 h-6 p-1 flex items-center justify-center`}>
              <button onClick={() => changeLanguage({ lang, setSelectedLanguage })}>
                {lang}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;