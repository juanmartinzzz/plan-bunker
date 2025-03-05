import { useState } from 'react';
import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';
import { Copy, QrCode, CheckCircle, Link } from 'lucide-react';
import { internationalization } from '../utils/internationalization';

const SharePlan = ({ plan }) => {
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const translated = internationalization.getTranslated();

  const languageCode = localStorage.getItem('languageCode');

  const planUrl = `${import.meta.env.VITE_VIEW_FULL_PLAN_URL}?lc=${languageCode}`;

  const copyToClipboard = () => {
    const requiredSteps = [
      translated.okThingsArePrettyDireOfLateButEverythingIsBetterWithAPlan,
      '',
      `📌 ${translated.whereYallCanFindMe}: ${plan.meetingPoint}`,
      '',
      `🧠 ${translated.myMasterplan}: ${plan.masterplan}`,
      '',
    ];

    const thingsToBring = plan.items.length > 0 ? [
      `🪓🪚🧻 ${translated.heresWhatYouNeedToBring}:`,
      ...plan.items.filter(item => item.name.trim() !== '').map((item) => `· ${item.friendName}: ${item.name}`),
      '',
    ] : [];

    const timeline = plan.timeline.length > 0 ? [
      `🕒 ${translated.ifYoureWonderingWhyWeHaveToDoThisHeresHowIThinkItWillGoDown}:`,
      ...plan.timeline.filter(event => event.description.trim() !== '').map((event, index) => `${index + 1}) ${event.description}`),
      '',
    ] : [];

    const createYourOwnPlan = [
      `${translated.disagreeWithMyPlan}:`,
      `${planUrl}`
    ];

    const textToCopy = [...requiredSteps, ...thingsToBring, ...timeline, ...createYourOwnPlan].join('\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3 * 1000)
    })
  }

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(planUrl).then(() => {
      setUrlCopied(true)
      setTimeout(() => setUrlCopied(false), 3 * 1000)
    })
  }

  const getScenarioName = () => {
    if (plan.scenario === 'other' && plan.customScenario) {
      return plan.customScenario
    }

    const scenarioMap = {
      'nuclear': 'Nuclear War ☢️',
      'zombies': 'Zombies 🧟‍♂️',
      'aliens': 'Aliens 👽',
      'climate': 'Climate Change 🌊',
      'ai': 'AI Takeover 🤖',
      'volcano': 'Volcanic Eruption 🌋',
      'tsunami': 'Tsunami 🌊',
      'other': 'Other 💩'
    }

    return scenarioMap[plan.scenario] || 'Unknown'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-display font-bold mb-2 text-white">
        {translated.timeToShareWithYourPeople}
      </h2>

      <p className="text-gray-300 mb-6 leading-tight">
        {translated.niceYouHaveASolidPlanShareItWithFriendsAndFamilySoTheyKnow}
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="flex items-center px-6 py-3 rounded-lg gradient-button text-white"
        >
          {copied ? (
            <>
              <CheckCircle size={18} className="mr-2" />
              {translated.copiedToClipboard}
            </>
          ) : (
            <>
              <Copy size={18} className="mr-2" />
              {translated.copyFullPlan}
            </>
          )}
        </motion.button>
      </div>

      {/* Plan preview section */}
      <div className="glass-card p-6 mb-6">
        <div className="mb-6 text-white font-bold text-lg text-center">
          {translated.yourPlanSharePreview}
        </div>

        <div className="mb-5">
          <p className="text-gray-300 mt-2 border-t border-primary/30 pt-2">
            {translated.okThingsArePrettyDireOfLateButEverythingIsBetterWithAPlan}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-white font-bold flex items-center">
            <span className="text-info mr-2">📌</span> {translated.whereYallCanFindMe}
          </h4>
          <p className="text-gray-300 mt-2 border-t border-info pt-2">{plan.meetingPoint}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-white font-bold">
            <span className="text-info mr-2">🧠</span> {translated.myMasterplan}
          </h4>
          <p className="text-gray-300 mt-2 border-t border-info pt-2">{plan.masterplan}</p>
        </div>

        {plan.items && plan.items.some(item => item.name.trim() !== '') && (
          <div className="mb-6">
            <h4 className="text-white font-bold">
              <span className="text-info mr-2">🪓🪚🧻</span> {translated.heresWhatYouNeedToBring}
            </h4>
            <ul className="list-none text-gray-300 mt-2 border-t border-info pt-2">
              {plan.items.filter(item => item.name.trim() !== '').map((item, index) => (
                <li key={index} className="mt-2 flex">
                  <span className="text-info mr-2">·</span>
                  <span>{item.friendName && item.friendName.trim() !== '' ? `${item.friendName}: ` : ''}{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {plan.timeline && plan.timeline.some(event => event.description.trim() !== '') && (
          <div className="mb-6">
            <h4 className="text-white font-bold">
              <span className="text-success mr-2">🕒</span> {translated.ifYoureWonderingWhyWeHaveToDoThisHeresHowIThinkItWillGoDown}
            </h4>
            <ol className="list-none text-gray-300 mt-2 border-t border-success/30 pt-2">
              {plan.timeline
                .filter(event => event.description.trim() !== '')
                .map((event, index) => (
                  <li key={event.id} className="mt-2 flex">
                    <span className="text-success mr-2">{index + 1})</span>
                    <span>{event.description}</span>
                  </li>
                ))}
            </ol>
          </div>
        )}

        <div className="mb-6">
          <h4 className="text-white font-bold">
            <span className="text-info mr-2">🔗</span> {translated.disagreeWithMyPlan}
          </h4>

            <code className="text-info block mt-2 overflow-x-auto p-2 bg-black/30 rounded text-sm">{planUrl}</code>
        </div>

        {/* <div className="mb-6 text-center">
          <p className="text-sm text-gray-400 mb-3">
            This is a preview of what will be copied to clipboard when you click "Copy Full Plan"
          </p>

          <div className="flex items-center justify-center">
            <code className="text-info overflow-x-auto p-2 bg-black/30 rounded text-sm md:text-base max-w-xs truncate">{planUrl}</code>
            <button
              onClick={copyUrlToClipboard}
              className="ml-2 p-2 text-white hover:text-secondary bg-dark/50 rounded-lg transition-colors"
              aria-label="Copy URL"
            >
              {urlCopied ? <CheckCircle size={16} className="text-success" /> : <Link size={16} />}
            </button>
          </div>

          <p className="text-xs text-info italic mt-2">
            Share this URL with your trusted circle so they can see your full survival plan and create their own.
          </p>
        </div> */}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="flex items-center px-6 py-3 rounded-lg gradient-button shadow-glow text-white"
        >
          {copied ? (
            <>
              <CheckCircle size={18} className="mr-2" />
              {translated.copiedToClipboard}
            </>
          ) : (
            <>
              <Copy size={18} className="mr-2" />
              {translated.copyFullPlan}
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowQRCode(!showQRCode)}
          className="flex items-center px-6 py-3 rounded-lg gradient-button shadow-glow text-white"
        >
          <QrCode size={18} className="mr-2" />
          {showQRCode ? translated.hideQRCode : translated.showQRCode}
        </motion.button>
      </div>

      {showQRCode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 flex flex-col items-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-glow">
            <QRCode value={planUrl} size={200} />
          </div>

          <p className="mt-3 text-sm text-gray-400 max-w-xs text-center">
            {translated.showThisQRCodeToAnyoneWhoWantsToCreateTheirOwnSurvivalPlan}
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 border border-success rounded-lg bg-success/10 text-center"
      >
        <h3 className="text-success font-bold mb-1">{translated.yourPlanIsReady}!</h3>
        <p className="text-gray-300">
          {translated.rememberToShareThisPlanWithYourTrustedCircleBeforeItIsTooLate}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default SharePlan