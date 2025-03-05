import { motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { internationalization } from '../utils/internationalization'

const ItemsList = ({ items, onChange }) => {
  const translated = internationalization.getTranslated();
  // const [showTips, setShowTips] = useState(false);

  const addItem = () => {
    onChange([...items, { quantity: 1, friendName: '', name: '' }])
  }

  const removeItem = (index) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    onChange(newItems.length ? newItems : [{ quantity: 1, friendName: '', name: '' }])
  }

  const updateItem = (index, field, value) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    onChange(newItems)
  }

  const essentialItems = [
    translated.ashley,
    translated.mum,
    translated.peter,
    translated.dad,
    translated.jake,
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-2">
        <h2 className="text-2xl font-display font-bold text-white">
          {translated.tellYourFriendsWhatToBring}
        </h2>

        {/* <button
          onClick={() => setShowTips(!showTips)}
          className="flex items-center text-warning transition-colors"
        >
          <Info size={18} className="mr-1" /> Tips
        </button> */}
      </div>
      <p className="text-gray-300 mb-4 leading-tight">
        {translated.forEachPersonYoullShareThisWith}
      </p>

      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center mb-3 gap-2"
        >
          {/* <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={({target}) => updateItem(index, 'quantity', parseInt(target.value) || 1)}
            className="w-20 p-2 bg-dark border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white"
          /> */}
          <input
            type="text"
            value={item.friendName}
            onChange={({target}) => updateItem(index, 'friendName', target.value)}
            placeholder="Friend"
            className="w-[40%] sm:w-[20%] text-sm sm:text-base p-2 bg-dark border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white tracking-tighter"
          />
          <input
            type="text"
            value={item.name}
            onChange={({target}) => updateItem(index, 'name', target.value)}
            placeholder="Item(s) they should bring over to save us"
            className="w-[60%] sm:w-[80%] text-sm sm:text-base p-2 bg-dark border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white tracking-tighter"
          />
          <button
            onClick={() => removeItem(index)}
            className="p-2 text-danger hover:bg-danger/20 rounded-lg transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={addItem}
        className="mt-4 flex items-center px-4 py-2 bg-dark border border-gray-700 rounded-lg hover:border-secondary transition-colors text-white"
      >
        <Plus size={18} className="mr-2" /> {translated.addSomeoneElse}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="my-6"
      >
        <h3 className="text-info font-bold mb-2">{translated.exampleInstructions}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {essentialItems.map((item, i) => (
            <div key={i} className="flex items-start">
              <span className="min-w-4 min-h-4 w-4 h-4 bg-secondary/66 rounded-full mt-1 mr-2"></span>
              <span className="text-sm text-gray-300 leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ItemsList