import { motion } from "framer-motion";

function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  autoComplete,
}) {
  const inputId = `field-${name}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mb-3"
    >
      {label && (
        <label htmlFor={inputId} className="block text-[13px] font-medium text-[#0F172A] mb-1.5 tracking-wide">
          {label}
          {required && <span className="text-[#94A3B8] ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={`block w-full rounded-[10px] border px-3.5 py-[10px] text-sm text-[#0F172A] placeholder:text-[#94A3B8]/70 bg-white transition-all duration-200 outline-none
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                : "border-[#CBD5E1] focus:border-[#1E293B] focus:ring-[3px] focus:ring-[#1E293B]/10 hover:border-[#94A3B8]"
            }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        {value && !error && (
          <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${inputId}-error`}
          className="mt-1.5 text-[11px] text-red-500 font-medium"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

export default InputField;
