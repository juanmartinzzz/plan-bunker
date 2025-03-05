import Ideas from './components/Ideas'
import { motion } from 'framer-motion'
import Header from './components/Header'
import MenuBar from './components/MenuBar'
import Loading from './components/Loading'
import { useState, useEffect } from 'react'
import Timeline from './components/Timeline'
import SharePlan from './components/SharePlan'
import ItemsList from './components/ItemsList'
import supabase from './integrations/supabase'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import TextAreaInput from './components/TextAreaInput'
import { internationalization } from './utils/internationalization'
// import ScenarioSelector from './components/ScenarioSelector'

const generatePlanId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}

function App() {
  const translated = internationalization.getTranslated();
  const savedPlan = localStorage.getItem('apocalypsePlan');
  const parsedPlan = savedPlan ? JSON.parse(savedPlan) : null;

  const [plan, setPlan] = useState(parsedPlan ? parsedPlan : {
    scenario: '',
    customScenario: '',
    meetingPoint: '',
    masterplan: '',
    items: [{ quantity: 1, name: '', friendName: '' }],
    timeline: [{ id: 1, description: '' }],
    id: generatePlanId(),
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), (import.meta.env.MODE === 'development' ? 0.3 : 3) * 1000) // Add a small delay for smoother loading
  }, [])

  // Save plan to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('apocalypsePlan', JSON.stringify(plan));
  }, [plan])

  // Save plan to Supabase when last step reached
  useEffect(() => {
    if(currentStep === 5) {
      supabase.upsertPlan({plan});
    }
  }, [currentStep])

  const updatePlan = (field, value) => {
    setPlan(prev => ({ ...prev, [field]: value }))
  }

  const handleScenarioSelect = (scenario, customValue = '') => {
    setPlan(prev => ({
      ...prev,
      scenario,
      customScenario: customValue
    }))
  }

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5))
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isStepComplete = ({step}) => {
    switch (step) {
      // case 1:
      //   return !!plan.scenario
      case 1:
        return !!plan.meetingPoint
      case 2:
        return !!plan.masterplan
      case 3:
        return plan.items.length > 0 && plan.items.some(item => item.name.trim() !== '')
      case 4:
        return plan.timeline.length > 0 && plan.timeline.some(event => event.description.trim() !== '')
      default:
        return false
    }
  }

  const getStepTitleProperty = (step) => {
    switch (step) {
      // case 1: return "Choose Apocalypse Scenario"
      case 1: return "locationLocation"
      case 2: return "itsAllAboutProcess"
      case 3: return "knowYourPeople"
      case 4: return "howItCameToThis"
      case 5: return "shareYourStrategy"
      default: return ""
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      // case 1:
      //   return (
      //     <ScenarioSelector
      //       selectedScenario={plan.scenario}
      //       customScenario={plan.customScenario}
      //       onSelect={handleScenarioSelect}
      //     />
      //   )
      case 1:
        return (
          <TextAreaInput
            label={translated.whereCanWeFindYou}
            placeholder={translated.dontOverthinkIt}
            infoText={translated.creativelyDescribeWhereYouAndYourPeopleCanHideToEnsureSurvival}
            helpText={translated.canBeAPlaceThatsYoursOr}
            value={plan.meetingPoint}
            onChange={(value) => updatePlan('meetingPoint', value)}
            maxLength={144}
          />
        )
      case 2:
        return (
          <TextAreaInput
            label={translated.survivalMasterplan}
            placeholder="Detail your brilliant scheme to outlive everyone else!"
            infoText={translated.tellYourGroupYourImaginativeSchemeSoTheyKnow}
            helpText={translated.shelterSecurityCommunications}
            value={plan.masterplan}
            onChange={(value) => updatePlan('masterplan', value)}
            maxLength={255}
          />
        )
      case 3:
        return (
          <ItemsList
            items={plan.items}
            onChange={(items) => updatePlan('items', items)}
          />
        )
      case 4:
        return (
          <Timeline
            events={plan.timeline}
            onChange={(timeline) => updatePlan('timeline', timeline)}
          />
        )
      case 5:
        return (
          <SharePlan plan={plan} />
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <MenuBar />

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Header />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 mt-6 border border-gray-700 hover:border-gray-600 transition-colors"
        >
          <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
            <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{translated.step} {currentStep}</span>
              <span className="text-secondary font-bold">{translated[getStepTitleProperty(currentStep)]}</span>
            </div>
          </div>

          {renderStepContent()}

          <div className="my-6">
            <Ideas currentStep={currentStep} />
          </div>

          <div className="mt-6 flex justify-between gap-2">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg flex items-center ${
                currentStep === 1
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'gradient-button text-white'
              }`}
            >
              <ArrowLeft size={16} className="mr-2" /> {translated.previous}
            </motion.button>

            {currentStep < 5 ? (
              <motion.button
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextStep}
                disabled={!isStepComplete({step: currentStep}) && currentStep < 3}
                className={`px-6 py-2 rounded-lg flex items-center ${
                  !isStepComplete({step: currentStep}) && currentStep < 3
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'gradient-button text-white'
                }`}
              >
                {translated.next} <ArrowRight size={16} className="ml-2" />
              </motion.button>
            ) : <></>}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default App