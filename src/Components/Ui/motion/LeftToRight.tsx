import { motion } from 'framer-motion' 

const LeftToRight = ({children}: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ x:50 }}
      animate={{ x:0 }}
    exit={{ x:50 }}
    >
    {children}
    </motion.div>
  )
}

export default LeftToRight
