function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = true,
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150 outline-none";

  const variants = {
    primary:
      disabled || loading
        ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
        : "bg-[#1F2937] text-white hover:bg-[#374151] active:bg-[#111827] focus:ring-2 focus:ring-[#1F2937]/30",
    outline:
      disabled || loading
        ? "border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
        : "border border-[#E5E7EB] text-[#1F2937] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] focus:ring-2 focus:ring-[#E5E7EB]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant] || variants.primary} ${fullWidth ? "w-full" : ""} ${className}`}
      aria-busy={loading}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

export default Button;
