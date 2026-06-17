import { motion } from "framer-motion";

function AuthCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="bg-white rounded-2xl border border-[#CBD5E1]/50 shadow-[0_1px_15px_rgba(0,0,0,0.04)] px-6 py-6 sm:px-7 sm:py-7 w-full">
        {children}
      </div>
    </motion.div>
  );
}

export default AuthCard;
