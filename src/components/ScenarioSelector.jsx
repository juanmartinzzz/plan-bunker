import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const peopleDenominations = [
  'your crew',
  'peeps',
  'your posse',
  'the gang',
  'your A team',
  'your dream team',
  'your crewmates',
]

const scenarios = [
  { id: 'nuclear', name: 'Nuclear War', emoji: '☢️', gradient: 'from-yellow-500 to-red-600', description: 'when the world is nuked 💣' },
  { id: 'zombies', name: 'Zombies', emoji: '🧟‍♂️', gradient: 'from-green-500 to-green-900', description: 'while zombies roam the earth 🧟‍♂️' },
  { id: 'aliens', name: 'Aliens', emoji: '👽', gradient: 'from-purple-500 to-blue-600', description: 'if Independence Day lied and aliens win 👾' },
  { id: 'climate', name: 'Climate Change', emoji: '🌊', gradient: 'from-blue-400 to-blue-800', description: 'as the waters rise 🌊' },
  { id: 'ai', name: 'AI Takeover', emoji: '🤖', gradient: 'from-gray-400 to-gray-800', description: 'when AI does what we all know it will do 🤦‍♂️' },
  { id: 'volcano', name: 'Volcanic Eruption', emoji: '🌋', gradient: 'from-orange-500 to-red-800', description: 'hiding from volcanic ash.' },
  { id: 'war', name: 'World War III', emoji: '⚔️', gradient: 'from-red-500 to-orange-700', description: 'as the world map changes forever 🌏💥' },
  { id: 'other', name: 'Other', emoji: '💩', gradient: 'from-pink-500 to-purple-800' },
]

const ScenarioSelector = ({ selectedScenario, customScenario, onSelect }) => {
  const [customValue, setCustomValue] = useState(customScenario || '')

  const handleCustomChange = (e) => {
    setCustomValue(e.target.value)
    if (selectedScenario === 'other') {
      onSelect('other', e.target.value)
    }
  }

  useEffect(() => {
    if (selectedScenario) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [selectedScenario]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div>
      <h2 className="text-2xl font-display font-bold mb-4 text-white text-center">
        What's causing the end-of-times? <span className="text-warning">🔥</span>
      </h2>
      <p className="text-gray-300 mb-6">
        Select the scenario you think will make you hide and wait for your friends and family to find you.
      </p>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {scenarios.map((scenario) => (
          <motion.div
            key={scenario.id}
            variants={item}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`scenario-card glass-card p-4 flex flex-col items-center text-center ${
              selectedScenario === scenario.id ? 'selected' : ''
            }`}
            onClick={() => onSelect(scenario.id, customValue)}
          >
            <div className={`w-16 h-16 rounded-full mb-3 flex items-center justify-center bg-gradient-to-br ${scenario.gradient} shadow-glow`}>
              <span className="text-3xl">{scenario.emoji}</span>
            </div>
            <h3 className="font-bold text-white text-lg">{scenario.name}</h3>
          </motion.div>
        ))}
      </motion.div>

      {selectedScenario === 'other' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <label className="block text-white font-medium mb-2">
            Describe your custom apocalypse scenario:
          </label>

          <input
            type="text"
            value={customValue}
            onChange={handleCustomChange}
            placeholder="Rogue asteroid? Science catastrophe? Giant ants?"
            className="w-full p-3 bg-dark border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white"
          />
          <p className="text-gray-400 text-sm mt-2 italic">
            Get creative! The weirder the apocalypse, the more memorable your survival plan.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default ScenarioSelector