"use client"
import { motion } from "framer-motion"

export default function LevelSelector({ texts, onPick }) {
  // Alternative icon options - you can choose which one to use
  const IconOption1 = () => (
    // Water drop with gradient
    <motion.div
      className="w-5 h-5 relative"
      variants={{
        hidden: { rotate: 0, scale: 1 },
        hover: { rotate: [0, -10, 10, 0], scale: 1.2 },
      }}
      transition={{ duration: 0.6, ease: "backOut" }}
    >
      <div className="w-full h-full bg-gradient-to-b from-cyan-300 to-blue-500 rounded-full relative">
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
      </div>
    </motion.div>
  )

  const IconOption2 = () => (
    // Gem/Crystal
    <motion.div
      className="w-5 h-5 relative"
      variants={{
        hidden: { rotate: 0, scale: 1 },
        hover: { rotate: 180, scale: 1.3 },
      }}
      transition={{ duration: 0.8, ease: "backOut" }}
    >
      <div 
        className="w-full h-full bg-gradient-to-br from-cyan-200 via-blue-400 to-indigo-600"
        style={{
          clipPath: "polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)"
        }}
      ></div>
    </motion.div>
  )

  const IconOption3 = () => (
    // Wave/Tide icon
    <motion.div
      className="w-6 h-4 relative overflow-hidden"
      variants={{
        hidden: { scale: 1 },
        hover: { scale: 1.2 },
      }}
      transition={{ duration: 0.4, ease: "backOut" }}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { x: 0 },
          hover: { x: 2 },
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg viewBox="0 0 24 16" fill="none" className="w-full h-full">
          <path 
            d="M0 8C4 4, 8 4, 12 8C16 12, 20 12, 24 8" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
            className="text-cyan-300"
          />
          <path 
            d="M0 12C4 8, 8 8, 12 12C16 16, 20 16, 24 12" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            fill="none"
            className="text-blue-400 opacity-70"
          />
        </svg>
      </motion.div>
    </motion.div>
  )

  const IconOption4 = () => (
    // Hexagon with inner pattern
    <motion.div
      className="w-5 h-5 relative"
      variants={{
        hidden: { rotate: 0, scale: 1 },
        hover: { rotate: 60, scale: 1.2 },
      }}
      transition={{ duration: 0.5, ease: "backOut" }}
    >
      <div 
        className="w-full h-full bg-gradient-to-br from-cyan-300 to-blue-500 relative"
        style={{
          clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)"
        }}
      >
        <div 
          className="absolute inset-1 bg-gradient-to-tl from-white/30 to-transparent"
          style={{
            clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)"
          }}
        ></div>
      </div>
    </motion.div>
  )

  return (
    <motion.section 
      className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {texts.levels.map((lvl, idx) => (
        <motion.article
          key={lvl.id}
          className="relative overflow-hidden p-6 rounded-2xl shadow-lg border border-white/10 
                     bg-gradient-to-br from-slate-800/80 to-slate-700/70 
                     backdrop-blur-sm cursor-pointer group"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover="hover"
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Animated water fill effect */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-0 rounded-2xl"
            variants={{
              hidden: { height: 0, opacity: 0.7 },
              hover: { height: "100%", opacity: 0.9 },
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: "linear-gradient(180deg, rgba(56,189,248,0.7), rgba(59,130,246,0.6))",
            }}
          />

          {/* Water bubbles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-300/40 rounded-full"
                style={{
                  left: `${20 + i * 12}%`,
                  bottom: `${10 + (i % 3) * 15}%`,
                }}
                variants={{
                  hidden: { opacity: 0, scale: 0, y: 0 },
                  hover: { 
                    opacity: [0, 1, 0], 
                    scale: [0, 1.2, 0], 
                    y: [-20, -40, -60],
                  },
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 -translate-x-full"
            variants={{
              hidden: { x: "-100%" },
              hover: { x: "100%" },
            }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              width: "50%",
            }}
          />

          {/* Content (above water) */}
          <div className="relative z-10">
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <motion.span 
                className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-medium"
                variants={{
                  hidden: { scale: 1 },
                  hover: { scale: 1.1, backgroundColor: "rgba(34, 211, 238, 0.4)" },
                }}
                transition={{ duration: 0.3 }}
              >
                {lvl.difficulty}
              </motion.span>
              
              {/* Replace this with any of the icon options above */}
              <div className="text-cyan-300 drop-shadow-sm">
                <IconOption1 />
              </div>
            </div>

            {/* Title + Desc */}
            <motion.h3 
              className="text-lg font-semibold mb-1 text-white"
              variants={{
                hidden: { y: 0 },
                hover: { y: -2 },
              }}
              transition={{ duration: 0.3 }}
            >
              {lvl.label}
            </motion.h3>
            <motion.p 
              className="text-slate-300 mb-4 text-sm leading-relaxed group-hover:text-white transition-colors duration-300"
              variants={{
                hidden: { y: 0 },
                hover: { y: -1 },
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {lvl.desc}
            </motion.p>

            {/* Fractions with stagger animation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {lvl.fractions.map((f, i) => (
                <motion.span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-slate-600/40 text-slate-200 border border-slate-500/40"
                  variants={{
                    hidden: { y: 0, scale: 1 },
                    hover: { y: -3, scale: 1.05 },
                  }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  {f}
                </motion.span>
              ))}
            </div>

            {/* Enhanced CTA button */}
            <motion.button
              className="rounded-full px-6 py-2.5 font-medium 
                         bg-gradient-to-r from-cyan-400 to-blue-500 
                         text-slate-900 shadow-md hover:shadow-lg 
                         transition focus:outline-none relative overflow-hidden"
              whileHover={{ 
                scale: 1.08, 
                boxShadow: "0 0 20px rgba(56, 189, 248, 0.8)",
                background: "linear-gradient(45deg, #22d3ee, #3b82f6, #06b6d4)"
              }}
              whileTap={{ scale: 0.92 }}
              onClick={() => onPick(lvl)}
            >
              {/* Button ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  hover: { scale: 1, opacity: 0.3 },
                }}
                transition={{ duration: 0.6 }}
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)"
                }}
              />
              <span className="relative z-10">{texts.buttons.startLevel}</span>
            </motion.button>
          </div>

          {/* Corner wave accent */}
          <motion.div
            className="absolute top-0 right-0 w-16 h-16 opacity-20"
            variants={{
              hidden: { rotate: 0, scale: 0 },
              hover: { rotate: 180, scale: 1.2 },
            }}
            transition={{ duration: 0.8, ease: "backOut" }}
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(56,189,248,0.8), transparent)",
              borderRadius: "0 1rem 0 50%",
            }}
          />
        </motion.article>
        )
      )}
    </motion.section>
  )
}