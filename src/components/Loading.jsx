import { motion } from 'framer-motion'
import { internationalization } from '../utils/internationalization';

const Loading = () => {
  const translated = internationalization.getTranslated();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 gradient-text">Plan B<span className="text-white">unker</span> <span className="text-secondary">🚨</span></h1>
        <p className="text-gray-300">{translated.makeTheBestOfPlansForTheWorstOfTimes}</p>
        <div className="mt-4 w-16 h-16 border-t-4 border-secondary rounded-full animate-spin mx-auto"></div>
      </motion.div>
    </div>
  )
}

export default Loading;