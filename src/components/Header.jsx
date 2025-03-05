import { motion } from 'framer-motion'
import { internationalization } from '../utils/internationalization';

function Header() {
  const translated = internationalization.getTranslated();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-3 gradient-text"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Plan B<span className="text-white">unker</span> <span className="text-danger">🚨</span>
      </motion.h1>

      <p className="text-lg md:text-xl text-info leading-tight">
        <span className="font-bold text-success">{translated.tellFriendsAndFamily}</span> {translated.whereToFindYou}
      </p>

      {/* <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mt-2">
        Make the best of plans for the worst of times.
      </p> */}
    </motion.header>
  )
}

export default Header