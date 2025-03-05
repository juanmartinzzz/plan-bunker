import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';

const ideas = {
  step1: [
    {
      en: 'Vatican city - right under the Pope\'s residence in the bunker he built for himself.',
      es: 'Ciudad del Vaticano - debajo de la residencia del Papa en su bunker personal.',
    },
    {
      en: 'The White House - surely they\'ll know what to do.',
      es: 'La Casa Blanca - seguro que sabrán qué hacer.',
    },
    {
      en: 'The Eiffel Tower - the bunker under the Eiffel Tower is the largest and most secure in the world.',
      es: 'La Torre Eiffel - el bunker bajo la Torre Eiffel es el más grande y seguro del mundo.',
    },
    {
      en: 'Area 51 - They\'ve been hiding aliens for decades, they\'ve got room for an odd specimen like me.',
      es: 'Area 51 - Han escondido extraterrestres por décadas, tienen espacio para un especimen raro como yo.',
    },
    {
      en: 'IKEA Warehouse - meatballs and enough furniture to build a civilization from scratch.',
      es: 'Almacén de IKEA - albóndigas y suficiente mobiliario para construir una civilización desde cero.',
    },
    {
      en: 'Disney World - the "happiest place on earth" must have a contingency plan.',
      es: 'Disney World - el "lugar más feliz de la tierra" debe tener un plan de contingencia.',
    },
    {
      en: 'Mar-a-Lago - all those membership fees must be funding some sort of underground luxury bunker, right?',
      es: 'Mar-a-Lago - todos esos pagos de membresía deben estar financiando algún tipo de bunker subterráneo de lujo, no?',
    },
    {
      en: 'UN Headquarters - they\'ll be too busy arguing about what to call the apocalypse to notice me.',
      es: 'UN Headquarters - van a estar tan ocupados discutiendo cómo llamar al apocalipsis para notar que estoy ahí.',
    },
    {
      en: 'Kremlin - Putin\'s got so much security, I can pretend to be one of them and access the good vodka stash',
      es: 'Kremlin - Putin tiene tanta seguridad, que puedo fingir ser uno de ellos y acceder al mejor vodka',
    },
    {
      en: 'The Last Blockbuster - Nobody\'s been there in years, and they\'ve got plenty of post-apocalyptic movies for research',
      es: 'The Last Blockbuster - Nadie ha estado allí en años, y tienen suficientes películas post-apocalípticas para investigación',
    },
    {
      en: 'Costco - enough bulk toilet paper and rotisserie chickens to last until civilization rises again',
      es: 'Costco - suficiente papel higiénico en rollo y pollos de rotisería para durar hasta que la civilización renazca',
    },
    {
      en: 'Bass Pro Shops Pyramid - literally a pyramid! Those things last thousands of years',
      es: 'Bass Pro Shops Pyramid - literalmente una pirámide! Esas cosas duran miles de años',
    },
    {
      en: 'Elon Musk\'s Private Mars Colony - he definitely has one and isn\'t telling us',
      es: 'La colonia privada de Elon Musk en Marte - definitivamente tiene una y no ha dicho nada',
    },
    {
      en: 'Mark Zuckerberg\'s Secret Lizard People Underground City - my plan is to find the address on his Facebook profile',
      es: 'La ciudad subterránea secreta de Mark Zuckerberg - mi plan es encontrar la dirección en su perfil de Facebook',
    },
    {
      en: 'Bill Gates\' Microchip Control Center - we\'ll be able to control the remaining world\'s population from there',
      es: 'El centro de control de microchips de Bill Gates - podremos controlar la población restante del mundo desde allí',
    },
    {
      en: 'Jeff Bezos\' Amazon Warehouse #427 - robots will protect us while we feast on Prime-delivered survival goods',
      es: 'El almacén de Amazon de Jeff Bezos #427 - los robots nos protegen mientras comemos enlatados entregados por Prime',
    },
    {
      en: 'Abandoned Olive Garden - unlimited breadsticks => infinite survival',
      es: 'Olive Garden abandonado - pan infinito => supervivencia indefinida',
    },
    {
      en: 'The World\'s Largest McDonalds - the food preservatives will protect us',
      es: 'El McDonalds más grande del mundo - los preservativos de la comida nos protegerán',
    },
    {
      en: 'Waffle House - if they\'re still open, has the apocalypse even started yet?',
      es: 'Waffle House - si están abiertos, ha empezado el apocalipsis realmente?',
    },
    {
      en: 'British Museum - they\'ve stolen enough artifacts to know how previous civilizations handled apocalypses',
      es: 'British Museum - han robado suficientes artefactos para saber cómo las civilizaciones anteriores han gestionado apocalipses',
    },
    {
      en: 'The Louvre - the Mona Lisa is actually a map to an underground bunker network',
      es: 'El Louvre - la Mona Lisa es realmente un mapa a una red de bunkers subterráneos',
    },
    {
      en: 'The Library of Congress - all those books must include at least one apocalypse survival guide',
      es: 'La Biblioteca del Congreso - todos esos libros deben incluir al menos un manual de supervivencia para apocalipsis',
    },
    {
      en: 'The Rock and Roll Hall of Fame - Keith Richards has survived everything else, he\'ll know what to do',
      es: 'El salón de la fama del Rock and Roll - Keith Richards ha sobrevivido a todo, él sabrá qué hacer',
    },
    {
      en: 'The Smithsonian - they\'ve got everything, including a secret underground bunker network',
      es: 'El Smithsonian - tienen todo, incluso una red secreta de bunkers subterráneos',
    },
    {
      en: 'The one McDonald\'s with the working ice cream machine - if they can perform that miracle, they can keep me safe',
      es: 'El único McDonald\'s donde funciona la máquina de helado - si pudieron hacer ese milagro, pueden mantenerme a salvo',
    },
    {
      en: 'Inside the Bitcoin Blockchain - safest place ever, no one can afford to get in anymore',
      es: 'Dentro del Blockchain de Bitcoin - el lugar más seguro, nadie puede costear la entrada',
    },
    {
      en: 'Internet Explorer - it\'ll take the apocalypse years to load there',
      es: 'Internet Explorer - le llevará años al apocalipsis cargar en ese navegador',
    },
    {
      en: 'TikTok Headquarters - we\'ll distract the zombies with dance challenges',
      es: 'La oficina principal de TikTok - distraemos a los zombies con desafíos de baile',
    },
    {
      en: 'The Springfield nuclear power plant - it\'s survived countless meltdowns, we should be fine',
      es: 'La planta nuclear de Springfield - ha sobrevivido innumerables derretimientos, deberíamos estar bien',
    },
    {
      en: 'That Island Where They Filmed LOST - if we get hungry, we can eat the polar bears',
      es: 'La isla donde filmaron LOST - si nos quedamos sin comida, podemos comernos a los osos polares',
    },
  ],
  step2: [
    {
      en: 'Learn to walk and moan like the undead. Hide in plain sight among the zombie hordes. Scavenge for Cherry Coke and Twinkies.',
      es: 'Aprender a caminar y gemir como los muertos. Camuflarme entre las hordas zombi. Vivir de Cherry Coke y Twinkies.',
    },
    {
      en: 'Create Tinder-style app to match with others based on survival skills. Knows finance? Swipe left. Has crossbow? Swipe right.',
      es: 'Crear app tipo Tinder para hacer match con otros según habilidad de supervivencia. Sabe sobre finanzas? No. Tiene arco? Sí.',
    },
    {
      en: 'Repurpose thousands of Roombas with solar panels into swarm defensive perimeter - survival of the cleanest.',
      es: 'Reusar miles de Roombas con paneles solares y crear perímetro defensivo - supervivencia del que más limpio.',
    },
    {
      en: 'Rig Alexa devices around my perimeter to randomly shout "NOTHING TO EAT HERE" and "DEFINITELY INFECTED INSIDE."',
      es: 'Poner dispositivos Alexa en mi perímetro a gritar aleatoriamente "NADIE PARA COMER AQUÍ" y "DEFINITIVAMENTE INFECTADOS ACÁ".',
    },
    {
      en: 'Build fake social platform to convince raiders the best loots are in the neighboring town bunkers.',
      es: 'Hacer red social falsa y convencer a los saqueadores de que los mejores botines están en los bunkers del pueblo vecino.',
    },
    {
      en: 'Wear VR goggles 24/7 showing scenes of pre-endtimes life. Can\'t be traumatized if you don\'t acknowledge reality!',
      es: 'Usar gafas VR todo el tiempo con escenas de la vida antes del fin del mundo. No puedes quedar traumatizado si no reconoces la realidad!',
    },
    {
      en: 'Train army of hamsters to run on wheels connected to generators. Sustainable + adorable.',
      es: 'Entrenar ejército de hámsteres que corren en ruedas conectadas a generadores. Sostenible + adorable.',
    },
    {
      en: 'Leave LEGO bricks scattered at all entry points to my perimeter. Done.',
      es: 'Dejar bloques de LEGO esparcidos en todos los puntos de entrada a mi perímetro. Listo.',
    },
    {
      en: 'Start a pyramid scheme selling "zombie repellent". Unsatisfied customers literally can\'t complain.',
      es: 'Empezar un esquema de pirámide vendiendo "repelente zombi". Clientes insatisfechos literalmente no pueden quejarse.',
    },
    {
      en: 'Convince group of former IT professionals I have working WiFi. They\'ll protect me with their lives.',
      es: 'Convencer a grupo de ex técnicos informáticos de que tengo WiFi. Ellos me protegerán con sus vidas.',
    },
    {
      en: 'Form post-apocalyptic boy band. "The Backstreet Bunkers". Tour the wastelands. There\'s no radio, but we\'ll be radioactive.',
      es: 'Formar banda post-apocalíptica. "Los Backstreet Bunkers". Hacer tour por el desierto. No hay radio, pero somos radiactivos.',
    },
    {
      en: 'Convince survivors that my dandelion and fresh worm smoothies are "superfood detox cleansers." Charge premium prices for this "luxury natural medicine."',
      es: 'Convencer a supervivientes de que mis raspados de zanahoria y gusanos frescos son "supercomida desintoxicante natural". Cobra precios premium por este "medicamento naturista de lujo".',
    },
    {
      en: 'Train network of seagulls to steal shiny objects from other camps and bring them to me.',
      es: 'Entrenar red de gaviotas para robar objetos brillantes de otros campings y traerlos a mí.',
    },
    {
      en: 'Set up network of tin cans and string between friendly bunkers. Quantum entanglement technology.',
      es: 'Configurar red de latas y cuerda entre bunkers amigos. Tecnología de Entrelazamiento Cuántico.',
    }
  ],
}

const getIdea = ({currentStep}) => {
  if(currentStep > 2) {
    return null;
  }

  const languageCode = localStorage.getItem('languageCode');

  const stepIdeas = ideas[`step${currentStep}`];
  const idea = stepIdeas[Math.floor(Math.random() * stepIdeas.length)][languageCode];
  return idea;
}

const Ideas = ({ currentStep }) => {
  const ideaChangeIntervalSeconds = 12;
  const [idea, setIdea] = useState(getIdea({currentStep}));

  const refreshIdea = () => {
    setIdea(null);

    setTimeout(() => {
      setIdea(getIdea({currentStep}));
    }, 600);
  }

  useEffect(() => {
    refreshIdea();
    const interval = setInterval(() => {
      refreshIdea();
    }, ideaChangeIntervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [currentStep]);


  if (currentStep > 2) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="p-4 bg-primary/50 rounded-lg"
    >
      <h3 className="text-info font-bold mb-2 flex items-center">
        <span className="w-6 h-6 rounded-full bg-info/20 flex items-center justify-center mr-2">💡</span>
        <span className="text-white">Idea</span>
      </h3>

      {idea ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
          className="text-gray-300 text-sm leading-tight"
        >
          {idea}
        </motion.p>
      ) : (
        <div className="text-white">···</div>
      )}
    </motion.div>
  )
}

export default Ideas;