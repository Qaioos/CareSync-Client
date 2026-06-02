import { motion } from 'framer-motion' 

const BtmToTop = ({children}: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ y:50 }}
      animate={{ y :0 }}
    exit={{ y:50 }}
    >
    {children}
    </motion.div>
  )
}

export default BtmToTop
