import { motion } from 'framer-motion'

export default function Header({ title, subtitle }) {
  return (
    <motion.header 
      className="text-center mb-10 cursor-pointer"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover="hover"
    >
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold 
                   bg-gradient-to-r from-cyan-400 to-blue-500 
                   bg-clip-text text-transparent drop-shadow-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        variants={{
          hover: { 
            scale: 1.08, 
            textShadow: "0px 0px 12px rgba(56,189,248,0.8)",
          }
        }}
      >
        {title}
      </motion.h1>

      <motion.p 
        className="text-slate-600 max-w-2xl mx-auto mt-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        variants={{
          hover: { 
            y: -3, 
            color: "#38bdf8" // cyan-400
          }
        }}
      >
        {subtitle}
      </motion.p>
    </motion.header>
  )
}
