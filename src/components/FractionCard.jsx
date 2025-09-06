import { useMemo } from 'react'
import { motion } from 'framer-motion'

function waterHeight(fraction) {
  const [num, den] = fraction.split('/').map(Number)
  return Math.max(0, Math.min(1, num / den))
}

export default function FractionCard({ frac, dragProps, status, resetKey = 0 }) {
  const h = useMemo(() => waterHeight(frac), [frac])

  let borderClass = 'border border-white/10'
  if (status === 'correct')
    borderClass = 'border-2 border-green-400/40 bg-green-500/20'
  if (status === 'incorrect')
    borderClass = 'border-2 border-red-400/40 bg-red-500/10'

  return (
    <motion.div
      key={`card-${frac}-${resetKey}`}
      className={`p-4 flex flex-col items-center rounded-2xl shadow-md transition-colors ${borderClass}`}
      {...dragProps}
      initial={{ opacity: 0, y: 60, rotate: -10, scale: 0.8 }}
      animate={
        status === 'correct'
          ? { 
              opacity: 1, 
              y: 0, 
              rotate: 0, 
              scale: 1.15,
              boxShadow: '0 0 25px rgba(34,197,94,0.6)' 
            }
          : status === 'incorrect'
          ? { 
              opacity: 1, 
              y: 0, 
              rotate: 0, 
              scale: 1, 
              x: 0
            }
          : { opacity: 1, y: 0, rotate: 0, scale: 1 }
      }
      transition={{ 
        duration: status === 'correct' ? 0.8 : 0.6, 
        type: status === 'correct' ? 'spring' : 'tween',
        stiffness: 80 
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Shake animation for incorrect answers */}
      {status === 'incorrect' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            x: [0, -8, 8, -8, 0]
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Beaker */}
      <div className="relative w-48 h-56 rounded-2xl bg-[#1b2735] overflow-hidden border border-white/10 shadow-inner">
        <motion.div
          key={`water-${frac}-${resetKey}`}
          className="absolute left-0 right-0 bottom-0"
          initial={{ height: 0 }}
          animate={{ height: `${Math.round(h * 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(180deg,#6cd5ff,#2bb2ff)',
          }}
        />
        {/* horizontal ticks */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={`tick-${i}-${resetKey}`}
              className="absolute left-3 right-3 h-[2px] bg-white/60"
              style={{ top: `${(i + 1) * 10}%` }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.2, scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        {/* highlight strip */}
        <motion.div 
          className="absolute left-[10%] right-[10%] top-[10%] h-[8%] rounded-[14px] bg-white/15"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Fraction Display */}
      <motion.div
        key={`fraction-display-${frac}-${resetKey}`}
        className="text-center mt-3 text-yellow-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-3xl font-semibold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          {frac.split('/')[0]}
        </motion.div>
        <motion.span 
          className="block w-10 h-[2px] mx-auto my-1 bg-yellow-300/80 rounded"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="text-2xl opacity-80"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          {frac.split('/')[1]}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
