import { useState } from "react";
import { motion } from "framer-motion";

function PasswordInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  autoComplete,
}) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
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
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={`block w-full rounded-[10px] border px-3.5 py-[10px] text-sm text-[#0F172A] placeholder:text-[#94A3B8]/70 bg-white transition-all duration-200 outline-none pr-11
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                : "border-[#CBD5E1] focus:border-[#1E293B] focus:ring-[3px] focus:ring-[#1E293B]/10 hover:border-[#94A3B8]"
            }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150 ${focused ? 'text-[#64748B]' : 'text-[#94A3B8]'} hover:text-[#64748B]`}
          aria-label={show ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {show ? (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </>
            ) : (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </>
            )}
          </svg>
        </button>
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

export default PasswordInput;
