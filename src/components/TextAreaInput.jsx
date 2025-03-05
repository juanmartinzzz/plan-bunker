import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TextAreaInput = ({ label, placeholder, value, onChange, maxLength, infoText, helpText }) => {
  const [text, setText] = useState(value || '')
  const [charCount, setCharCount] = useState(0)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setText(value || '')
    setCharCount(value ? value.length : 0)
  }, [value])

  const handleChange = (e) => {
    const newText = e.target.value
    if (newText.length <= maxLength) {
      setText(newText)
      setCharCount(newText.length)
      onChange(newText)
    }
  }

  const getCounterClass = () => {
    const percentage = (charCount / maxLength) * 100
    if (percentage >= 90) return 'character-counter danger'
    if (percentage >= 75) return 'character-counter warning'
    return 'character-counter'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <label className="block text-2xl font-display font-bold mb-2 text-white">
        {label}
      </label>
      <p className="text-gray-300 mb-4 leading-tight">
        {infoText}
      </p>
      <div className={`relative ${isFocused ? 'textarea-focused' : ''}`}>
        <textarea
          value={text}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={3}
          className="w-full p-4 bg-dark border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white resize-none transition-all duration-300"
        />
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 -z-10 rounded-lg glow-effect"
          ></motion.div>
        )}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-sm text-gray-400 italic leading-tight">
          {helpText}
        </span>
        <span className={getCounterClass()}>
          {charCount}/{maxLength}
        </span>
      </div>
    </motion.div>
  )
}

export default TextAreaInput