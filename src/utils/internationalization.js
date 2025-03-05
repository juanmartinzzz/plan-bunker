/*
  receive a JSON object like:

  {
    something: {
      en: 'something',
      es: 'algo',
      fr: 'quelque chose',
    },
    somethingElse: {
      en: 'something else',
      es: 'algo más',
      fr: 'autre chose',
    },
  }

  return object with string values on language code set in Local Storage like:
  {
    something: 'something',
    somethingElse: 'something else',
  }
*/
const inter = ({texts}) => {
  const result = {};

  Object.keys(texts).forEach((key) => {
    result[key] = texts[key][localStorage.getItem('languageCode')];
  });

  return result;
};


/// Copy to Clipboard
const copyToClipboard = {
  okThingsArePrettyDireOfLateButEverythingIsBetterWithAPlan: {
    en: 'Ok everyone, here\'s my "Plan B-unker" in case the world ends',
    es: 'Bueno gente, aquí está mi "Plan B-unker" en caso de que el mundo se acabe',
  },
  whereYallCanFindMe: {
    en: 'Where y\'all can find me',
    es: 'Dónde pueden encontrarme',
  },
  myMasterplan: {
    en: 'My masterplan',
    es: 'Mi plan maestro',
  },
  heresWhatYouNeedToBring: {
    en: 'Here\'s what to bring',
    es: 'Lo que deben llevar',
  },
  ifYoureWonderingWhyWeHaveToDoThisHeresHowIThinkItWillGoDown: {
    en: 'Here\'s how I think 💩 will go down and force us to hide',
    es: 'Esta es la 💩 que creo que va a obligarnos a escondernos',
  },
  disagreeWithMyPlan: {
    en: 'Disagree with my plan? Create a better one!',
    es: 'No te gusta mi plan? Crea uno mejor!',
  },
  showThisQRCodeToAnyoneWhoWantsToCreateTheirOwnSurvivalPlan: {
    en: 'Show this QR code to anyone who wants to create their own survival plan.',
    es: 'Muestra este código QR a cualquier persona que quiera crear su propio plan de supervivencia.',
  },
  yourPlanIsReady: {
    en: 'Your plan is ready!',
    es: '¡Tu plan está listo!',
  },
  rememberToShareThisPlanWithYourTrustedCircleBeforeItIsTooLate: {
    en: 'Remember to share this plan with your trusted circle before it\'s too late!',
    es: 'Recuerda compartir este plan con tu círculo de confianza antes de que sea demasiado tarde!',
  },
  copiedToClipboard: {
    en: 'Copied to clipboard!',
    es: 'El plan fue copiado!',
  },
  hideQRCode: {
    en: 'Hide QR Code',
    es: 'Ocultar QR',
  },
  showQRCode: {
    en: 'Show QR Code',
    es: 'Mostrar QR',
  },
};

/// Header and steps
const headerAndStepTitles = {
  tellFriendsAndFamily: {
    en: 'Tell friends and family',
    es: 'Cuéntale a amigos y familia',
  },
  whereToFindYou: {
    en: 'where to find you when the proverbial 💩 hits the end-of-times fan 😝',
    es: 'dónde encontrarte cuando todo se vaya a la apocalíptica 💩😝',
  },
  step: {
    en: 'Step',
    es: 'Paso',
  },
  locationLocation: {
    en: 'Location, location',
    es: 'Ubicación, ubicación',
  },
  itsAllAboutProcess: {
    en: 'All about process',
    es: 'Cuestión de proceso',
  },
  knowYourPeople: {
    en: 'Know your people',
    es: 'Conoce a tu gente',
  },
  howItCameToThis: {
    en: 'How it came to this',
    es: 'Cómo llegamos a esto',
  },
  shareYourStrategy: {
    en: 'Share your strategy',
    es: 'Comparte tu estrategia',
  },
  makeTheBestOfPlansForTheWorstOfTimes: {
    en: 'Make the best of plans for the worst of times...',
    es: 'Haz el mejor plan para los peores momentos...',
  },
};

/// Interactions
const interactions = {
  clickToCopy: {
    en: 'Click to copy',
    es: 'Haz click para copiar',
  },
  previous: {
    en: 'Previous',
    es: 'Volver',
  },
  next: {
    en: 'Next',
    es: 'Siguiente',
  },
  nextOptional: {
    en: 'Next (Optional)',
    es: 'Siguiente (Opcional)',
  },
  addSomeoneElse: {
    en: 'Add someone else',
    es: 'Agregar a alguien más',
  },
  addAnotherEvent: {
    en: 'Add another event',
    es: 'Agregar otro evento',
  },
  copyFullPlan: {
    en: 'Copy full plan',
    es: 'Copiar plan completo',
  },
};

/// Sections
const sections = {
  whereCanWeFindYou: {
    en: 'Where can we find you? 📍',
    es: '¿Dónde te encontramos? 📍',
  },
  creativelyDescribeWhereYouAndYourPeopleCanHideToEnsureSurvival: {
    en: 'Creatively describe where you\'ll take shelter if the end of times comes, so you and your people can survive.',
    es: 'Describe creativamente dónde vas a refugiarte si llega el fin de los tiempos, para que tú y tus amigos sobrevivan.',
  },
  canBeAPlaceThatsYoursOr: {
    en: 'Can be a place that\'s yours, or where you always wanted to live in when society collapsed.',
    es: 'Puede ser un lugar tuyo, o donde siempre quisiste vivir cuando la sociedad colapsara.',
  },
  dontOverthinkIt: {
    en: 'Don\'t overthink it! The goal is to make it funny or ridiculous and laugh about the end of times.',
    es: 'No lo pienses tanto! La idea es hacerlo gracioso o ridículo y reírse del fin de los tiempos.',
  },
  survivalMasterplan: {
    en: 'Survival Masterplan 🧠',
    es: 'El Plan Maestro 🧠',
  },
  tellYourGroupYourImaginativeSchemeSoTheyKnow: {
    en: 'Tell your group your imaginative scheme so they know how you will beat the odds of societal collapse',
    es: 'Explica a tu grupo tu plan secreto para que sepan cómo van a vencer las probabilidades del colapso social',
  },
  shelterSecurityCommunications: {
    en: 'Shelter, security, communications... what\'s your long-term strategy going to be about?',
    es: 'Refugio, seguridad, comunicaciones... en qué centrarás tu estrategia a largo plazo?',
  },
  tellYourFriendsWhatToBring: {
    en: 'What must others bring? 🎒',
    es: 'Qué deben traer los demás? 🎒',
  },
  forEachPersonYoullShareThisWith: {
    en: 'For each person you\'ll share this with, write something they are likely to bring to save the group.',
    es: 'Por cada persona con la que compartas esto, escribe algo que probablemente traerán para salvar el grupo.',
  },
  tellTheStoryOfHowItAllWentDown: {
    en: 'Tell the story of how it all went down 📜',
    es: 'Cuénta cómo pasó todo 📜',
  },
  describeStepByStepHowYouThinkHumanityWillDoTheGlobalOopsie: {
    en: 'Describe step-by-step how you think humanity will do the global oopsie that will force your group to hide.',
    es: 'Describe paso a paso cómo crees que la humanidad hará la 💩 global que forzará a tu grupo a esconderse.',
  },
  niceYouHaveASolidPlanShareItWithFriendsAndFamilySoTheyKnow: {
    en: 'Nice! You have a solid plan - share it with friends and family so they know where to find you and can survive as well.',
    es: 'Tienes un plan sólido - compártelo con amigos y familia para que sepan dónde encontrarte y puedan sobrevivir también.',
  },
  timeToShareWithYourPeople: {
    en: 'Time to share with your people 🔗',
    es: 'Hora de compartir con tu gente 🔗',
  },
};

const helperTipLists = {
  exampleInstructions: {
    en: 'Example instructions',
    es: 'Instrucciones de ejemplo',
  },
  ashley: {
    en: 'Ashley - yes we know you\'re vegan now, pls bring your own food mate.',
    es: 'María - sí, ya sabemos que te volviste vegana, por favor trae tu propia comida.',
  },
  mum: {
    en: 'Mum - pls bring food for my sister 🙄',
    es: 'Mamá - porfa tráele comida a mi hermana 🙄',
  },
  jake: {
    en: 'Jake - yes u have to come. No u can\'t spend the apocalypse w your friends. I know we\'re the worst. No don\'t bring your guitar.',
    es: 'Ramón - sí, tienes que venir. No, no puedes pasar el apocalipsis con tus amigos. Sí, somos lo peor. No, no traigas la guitarra.',
  },
  peter: {
    en: 'Peter - face it: there are no more software devs, bring an axe.',
    es: 'Pedro - acepta que ya no hay desarrolladores de software, trae un hacha.',
  },
  dad: {
    en: 'Dad - bring your tool box. No, the other one. No, the other bigger one. That one.',
    es: 'Papá - trae tu caja de herramientas. No: la otra. No: la otra más grande. Esa.',
  },
  exampleTimeline: {
    en: 'Example timeline',
    es: 'Línea de tiempo de ejemplo',
  },
}

const sharePlan = {
  yourPlanSharePreview: {
    en: 'Your plan share preview',
    es: 'Vista previa de tu plan para compartir',
  },
}

const allGlobalTexts = {
  ...copyToClipboard,
  ...headerAndStepTitles,
  ...interactions,
  ...sections,
  ...helperTipLists,
  ...sharePlan,
};

// Helper to temporarily import and check property names and then remove
const helperGlobalTexts = allGlobalTexts;

const internationalization = {
  getTranslated: () => inter({texts: allGlobalTexts}),
}

export { internationalization, helperGlobalTexts };