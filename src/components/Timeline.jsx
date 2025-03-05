import { motion } from 'framer-motion'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { internationalization } from '../utils/internationalization'

const Timeline = ({ events, onChange }) => {
  const translated = internationalization.getTranslated();
  // const [showHelp, setShowHelp] = useState(false)

  const addEvent = () => {
    const newId = events.length > 0
      ? Math.max(...events.map(e => e.id)) + 1
      : 1
    onChange([...events, { id: newId, description: '' }])
  }

  const removeEvent = (id) => {
    const newEvents = events.filter(event => event.id !== id)
    onChange(newEvents.length ? newEvents : [{ id: 1, description: '' }])
  }

  const updateEvent = (id, description) => {
    const newEvents = events.map(event =>
      event.id === id ? { ...event, description } : event
    )
    onChange(newEvents)
  }

  const moveEvent = (id, direction) => {
    // Find the current index of the event
    const index = events.findIndex(event => event.id === id)
    if ((direction === 'up' && index === 0) ||
        (direction === 'down' && index === events.length - 1)) {
      return // Can't move further
    }

    const newEvents = [...events]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    // Swap the events
    const temp = newEvents[index]
    newEvents[index] = newEvents[targetIndex]
    newEvents[targetIndex] = temp

    onChange(newEvents)
  }

  const timelineExamples = [
    "Day 1: President Kanye assumed power after the 'thing' happened 🤦‍♂️",
    "Day 33: We lost the internet, GPS and for some reason half the cows.",
    "Day 83: Heard they had the amazing idea to fire a nuke at Belgium of all places 🇧🇪",
    "Day 107: To the bunkers - it wasn't going that great anyway.",
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-2">
        <h2 className="text-2xl font-display font-bold text-white">
          {translated.tellTheStoryOfHowItAllWentDown}
        </h2>

        {/* <button
          onClick={() => setShowHelp(!showHelp)}
          className="flex items-center text-warning transition-colors"
        >
          <HelpCircle size={18} className="mr-1" /> Tips
        </button> */}
      </div>

      <p className="text-gray-300 mb-4 leading-tight">
        {translated.describeStepByStepHowYouThinkHumanityWillDoTheGlobalOopsie}
      </p>

      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center mb-2 gap-2 group"
        >
          <div className="flex flex-col items-center mr-1">
            <button
              onClick={() => moveEvent(event.id, 'up')}
              disabled={index === 0}
              className={`${index === 0 ? 'text-gray-600' : 'text-gray-300 hover:text-white'}`}
              aria-label="Move up"
            >
              <ChevronUp size={26} />
            </button>

            <button
              onClick={() => moveEvent(event.id, 'down')}
              disabled={index === events.length - 1}
              className={`${index === events.length - 1 ? 'text-gray-600' : 'text-gray-300 hover:text-white'}`}
              aria-label="Move down"
            >
              <ChevronDown size={26} />
            </button>
          </div>

          <input
            type="text"
            value={event.description}
            onChange={(e) => updateEvent(event.id, e.target.value)}
            placeholder="What happened?"
            maxLength={144}
            className="flex-1 p-3 bg-dark border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white group-hover:border-gray-500 transition-colors"
          />
          <button
            onClick={() => removeEvent(event.id)}
            className="p-2 text-danger hover:bg-danger/20 rounded-lg transition-colors"
            aria-label="Remove event"
          >
            <Trash2 size={18} />
          </button>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={addEvent}
        className="mt-2 flex items-center px-4 py-2 bg-dark border border-gray-700 rounded-lg hover:border-secondary transition-colors text-white"
      >
        <Plus size={18} className="mr-2" /> {translated.addAnotherEvent}
      </motion.button>

      {/* {showHelp && ( */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="my-6"
        >
          <h3 className="text-info font-bold mb-2">{translated.exampleTimeline}</h3>
          <ul className="space-y-2">
            {timelineExamples.map((example, i) => (
              <li key={i} className="flex items-start">
                <span className="mt-1 w-4 h-4 min-w-4 min-h-4 rounded-full bg-secondary/66 mr-2"></span>

                <span className="text-sm text-gray-300">{example}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      {/* )} */}
    </motion.div>
  )
}

export default Timeline