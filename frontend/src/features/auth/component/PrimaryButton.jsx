import { motion } from "framer-motion";

function PrimaryButton({
  children,
  onClick,
  type = "submit",
  disabled = false,
  loading = false,
  fullWidth = true,
  className = "",
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.01 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.99 } : {}}
      className={`inline-flex items-center justify-center rounded-[10px] px-4 py-[11px] text-sm font-semibold tracking-wide transition-all duration-200 outline-none
        ${disabled || loading ? "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed" : "bg-[#1E293B] text-white hover:bg-[#334155] active:bg-[#0F172A] shadow-md hover:shadow-lg"}
        ${fullWidth ? "w-full" : ""} ${className}`}
      aria-busy={loading}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
}

export default PrimaryButton;
