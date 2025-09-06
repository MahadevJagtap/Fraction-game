import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header.jsx'
import LevelSelector from './components/LevelSelector.jsx'
import GameBoard from './components/GameBoard.jsx'
import Feedback from './components/Feedback.jsx'

export default function App() {
  const [texts, setTexts] = useState(null)
  const [level, setLevel] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    fetch('/text.json')
      .then(r => r.json())
      .then(setTexts)
      .catch(err => console.error('text load failed', err))
  }, [])

  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel)
    setResult(null)
  }

  const handleBack = () => {
    setLevel(null)
    setResult(null)
  }

  const handleResult = (gameResult) => {
    setResult(gameResult)
  }

  if (!texts) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading…</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <Header title={texts.title} subtitle={texts.subtitle} />
      
      <AnimatePresence mode="wait">
        {!level ? (
          <motion.div
            key="level-selector"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <LevelSelector texts={texts} onPick={handleLevelSelect} />
          </motion.div>
        ) : (
          <motion.div
            key="game-board"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <GameBoard 
              texts={texts} 
              level={level} 
              onBack={handleBack} 
              onResult={handleResult} 
            />
            <Feedback texts={texts} result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}