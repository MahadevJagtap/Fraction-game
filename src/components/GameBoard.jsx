import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FractionCard from './FractionCard.jsx'

function valueOf(frac) {
  const [n, d] = frac.split('/').map(Number)
  return n / d
}

export default function GameBoard({ texts, level, onBack, onResult }) {
  const target = useMemo(
    () => [...level.fractions].sort((a, b) => valueOf(b) - valueOf(a)),
    [level]
  )
  const [order, setOrder] = useState(() => [...level.fractions])
  const [statuses, setStatuses] = useState(Array(order.length).fill(null))
  const [isChecking, setIsChecking] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  // HTML5 drag n drop
  const onDragStart = (e, idx) => {
    e.dataTransfer.setData('text/plain', String(idx))
  }
  const onDrop = (e, dropIndex) => {
    e.preventDefault()
    const from = Number(e.dataTransfer.getData('text/plain'))
    if (Number.isNaN(from) || from === dropIndex) return
    
    const arr = [...order]
    const [moved] = arr.splice(from, 1)
    arr.splice(dropIndex, 0, moved)
    setOrder(arr)
    
    // Clear any existing statuses when reordering
    if (statuses.some(s => s !== null)) {
      setStatuses(Array(arr.length).fill(null))
      onResult(null)
    }
  }

  const check = async () => {
    if (isChecking) return // Prevent multiple clicks
    
    setIsChecking(true)
    // Add delay for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const s = order.map((f, i) => (f === target[i] ? 'correct' : 'incorrect'))
    setStatuses(s)
    const correctCount = s.filter((x) => x === 'correct').length
    const perfect = correctCount === order.length
    
    setIsChecking(false)
    onResult({
      perfect,
      correctCount,
      total: order.length,
    })
  }

  const reset = () => {
    if (isChecking) return // Prevent reset during checking
    
    // Reset to original order
    const originalOrder = [...level.fractions]
    setOrder(originalOrder)
    setStatuses(Array(originalOrder.length).fill(null))
    setResetKey(prev => prev + 1) // Increment reset key to force re-animation
    onResult(null) // Clear any existing results
  }

  const handleBack = () => {
    if (isChecking) return // Prevent navigation during checking
    onBack()
  }

  // Check if buttons should be disabled - only during the checking process
  const buttonsDisabled = isChecking

  return (
    <motion.section
      className="mt-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-5"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
              background: `conic-gradient(from ${i * 60}deg, transparent, rgba(56, 189, 248, 0.3), transparent)`
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Success celebration overlay */}
      <AnimatePresence>
        {statuses.every(s => s === 'correct') && statuses.length > 0 && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  y: [0, -50, -100],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title + Back Button */}
      <motion.div
        className="flex items-center justify-between mb-4 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="relative"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <motion.span
            className="inline-block text-xs px-2 py-1 rounded-full bg-white/10 relative overflow-hidden"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.5, 
              type: 'spring', 
              stiffness: 200,
              duration: 0.8
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              {level.difficulty}
            </motion.span>
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["100%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1.5,
                ease: "easeInOut"
              }}
            />
          </motion.span>
          
          <motion.h2
            className="text-xl font-semibold mt-2 relative"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.6, 
              duration: 0.8,
              type: "spring",
              stiffness: 120
            }}
            whileHover={{
              textShadow: "0 0 20px rgba(56, 189, 248, 0.8)",
              scale: 1.02
            }}
          >
            {/* Character-by-character text animation */}
            {level.label.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + index * 0.05,
                  duration: 0.3
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            
            {/* Floating mathematical symbols */}
            <motion.span
              className="absolute -top-2 -right-8 text-sm text-cyan-300/40"
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
              }}
              transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
            >
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                ÷
              </motion.span>
            </motion.span>
          </motion.h2>
          
          <motion.div
            className="text-white/60 relative overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="block"
            >
              {level.desc}
            </motion.span>
            <motion.div
              className="absolute -left-4 top-1/2 w-1 h-1 bg-cyan-400/60 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.3 }}
            >
              <motion.div
                className="w-1 h-1 bg-cyan-400/60 rounded-full"
                animate={{
                  scale: 1.5,
                  opacity: 0.8,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 2
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.button
          className={`rounded-full px-6 py-3 font-medium border border-white/10 relative overflow-hidden group transition-all ${
            buttonsDisabled 
              ? 'bg-black/20 text-white/50 cursor-not-allowed' 
              : 'bg-black/40 text-white hover:bg-black/50'
          }`}
          onClick={handleBack}
          disabled={buttonsDisabled}
          initial={{ x: 100, opacity: 0, rotate: 45, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            type: "spring",
            stiffness: 120
          }}
          whileHover={!buttonsDisabled ? { 
            scale: 1.1, 
            boxShadow: "0 0 15px rgba(56, 189, 248, 0.3)",
            rotate: -2
          } : {}}
          whileTap={!buttonsDisabled ? { scale: 0.9, rotate: 2 } : {}}
        >
          {/* Arrow icon */}
          <motion.span 
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm transition-opacity ${
              buttonsDisabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
            }`}
            initial={{ x: 10 }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            ←
          </motion.span>
          
          <motion.span 
            className={`relative z-10 transition-all duration-300 ${
              buttonsDisabled ? '' : 'group-hover:pl-4'
            }`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            Back
          </motion.span>
          
          {/* Button ripple effect */}
          {!buttonsDisabled && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
          
          {/* Floating particles around button */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-300/40 rounded-full"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + i * 15}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={!buttonsDisabled ? {
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.8, 0],
                  y: [0, -10, -20],
                } : {}}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </div>
        </motion.button>
      </motion.div>

      {/* Drop zone indicator */}
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20"
          animate={{
            background: [
              "rgba(34, 211, 238, 0.1)",
              "rgba(34, 211, 238, 0.2)",
              "rgba(34, 211, 238, 0.1)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.span
            className="text-cyan-300 text-sm"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ← Drag fractions to sort from largest to smallest →
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Fraction Cards with enhanced drop zones */}
      <motion.div
        className="flex gap-6 justify-center flex-wrap py-6 relative"
        key={resetKey}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {/* Connection lines between cards */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {order.map((_, i) => (
            i < order.length - 1 && (
              <motion.line
                key={`line-${i}-${resetKey}`}
                x1={`${((i + 1) * 100) / (order.length + 1)}%`}
                y1="50%"
                x2={`${((i + 2) * 100) / (order.length + 1)}%`}
                y2="50%"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.2 + 1 }}
              />
            )
          ))}
        </svg>

        {order.map((f, i) => (
          <motion.div
            key={`${f}-${i}-${resetKey}`}
            className="relative"
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            {/* Enhanced drop zone */}
            <motion.div
              className="rounded-2xl border-2 border-dashed border-white/10 relative overflow-hidden"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, i)}
              whileHover={{
                borderColor: "rgba(56, 189, 248, 0.4)",
                boxShadow: "0 0 20px rgba(56, 189, 248, 0.2)"
              }}
              animate={{
                borderColor: statuses[i] === 'correct' 
                  ? "rgba(34, 197, 94, 0.6)"
                  : statuses[i] === 'incorrect' 
                  ? "rgba(239, 68, 68, 0.6)"
                  : "rgba(255, 255, 255, 0.1)"
              }}
            >

              <FractionCard
                frac={f}
                idx={i}
                status={statuses[i]}
                resetKey={resetKey}
                dragProps={{
                  draggable: !buttonsDisabled, // Use the consistent disabled state
                  onDragStart: (e) => onDragStart(e, i),
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Buttons with enhanced effects */}
      <motion.div
        className="flex gap-3 justify-center mt-6 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className={`rounded-full px-6 py-3 font-medium relative overflow-hidden group transition-all ${
            buttonsDisabled 
              ? 'bg-gradient-to-r from-cyan-400/50 to-blue-500/50 text-black/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-90'
          }`}
          onClick={check}
          disabled={buttonsDisabled}
          whileHover={!buttonsDisabled ? { 
            scale: 1.1,
            boxShadow: "0 0 25px rgba(56, 189, 248, 0.6)"
          } : {}}
          whileTap={!buttonsDisabled ? { scale: 0.9 } : {}}
          animate={isChecking ? {
            background: [
              "linear-gradient(45deg, #22d3ee, #3b82f6)",
              "linear-gradient(45deg, #3b82f6, #22d3ee)",
              "linear-gradient(45deg, #22d3ee, #3b82f6)"
            ]
          } : {}}
          transition={isChecking ? { duration: 0.8, repeat: Infinity } : {}}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isChecking && (
              <motion.div
                className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
            {isChecking ? 'Checking...' : texts.buttons.check}
          </span>
          
          {/* Button wave effect */}
          {!buttonsDisabled && (
            <motion.div
              className="absolute inset-0 rounded-full"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                hover: { scale: 1, opacity: 0.3 },
              }}
              transition={{ duration: 0.6 }}
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.8), transparent 70%)"
              }}
            />
          )}
        </motion.button>

        <motion.button
          className={`rounded-full px-6 py-3 font-medium border border-white/10 relative overflow-hidden group transition-all ${
            buttonsDisabled 
              ? 'bg-black/20 text-white/50 cursor-not-allowed'
              : 'bg-black/40 text-white hover:bg-black/50'
          }`}
          onClick={reset}
          disabled={buttonsDisabled}
          whileHover={!buttonsDisabled ? { 
            scale: 1.1,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
          } : {}}
          whileTap={!buttonsDisabled ? { scale: 0.9 } : {}}
        >
          <span className="relative z-10">{texts.buttons.retry}</span>
          
          {/* Reset icon animation */}
          {/* {!buttonsDisabled && (
            <motion.div
              className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 border-2 border-white/40 border-t-white rounded-full opacity-0 group-hover:opacity-100"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )} */}
        </motion.button>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex gap-2">
          {statuses.map((status, i) => (
            <motion.div
              key={`progress-${i}-${resetKey}`}
              className="w-3 h-3 rounded-full"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                background: status === 'correct' 
                  ? "linear-gradient(45deg, #22c55e, #16a34a)"
                  : status === 'incorrect'
                  ? "linear-gradient(45deg, #ef4444, #dc2626)"
                  : "rgba(255, 255, 255, 0.2)"
              }}
              transition={{ 
                delay: i * 0.1 + 1.2,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}