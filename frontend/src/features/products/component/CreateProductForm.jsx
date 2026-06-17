import { motion } from "framer-motion";
import Button from "../../../components/Button";

const CURRENCIES = ["USD", "INR", "EUR", "JPY"];

function CreateProductForm({
  formData,
  onChange,
  onImageChange,
  onSubmit,
  imagePreview,
  loading,
  errors,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-[#CBD5E1]/30">
          <h2 className="text-lg font-semibold text-[#0F172A] tracking-tight">Create Product</h2>
          <p className="text-[13px] text-[#64748B] mt-0.5">Fill in the details to list a new product</p>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="product-title" className="block text-[13px] font-medium text-[#0F172A] mb-1.5 tracking-wide">
              Title <span className="text-[#94A3B8]">*</span>
            </label>
            <input
              id="product-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={onChange}
              placeholder="e.g. Premium Cotton T-Shirt"
              className={`block w-full rounded-[10px] border px-3.5 py-[10px] text-sm text-[#0F172A] placeholder:text-[#94A3B8]/70 bg-white transition-all duration-200 outline-none
                ${errors?.title ? "border-red-400 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12" : "border-[#CBD5E1] focus:border-[#1E293B] focus:ring-[3px] focus:ring-[#1E293B]/10 hover:border-[#94A3B8]"}`}
            />
            {errors?.title && (
              <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="product-description" className="block text-[13px] font-medium text-[#0F172A] mb-1.5 tracking-wide">
              Description <span className="text-[#94A3B8]">*</span>
            </label>
            <textarea
              id="product-description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={onChange}
              placeholder="Describe your product in detail..."
              className={`block w-full rounded-[10px] border px-3.5 py-[10px] text-sm text-[#0F172A] placeholder:text-[#94A3B8]/70 bg-white transition-all duration-200 outline-none resize-vertical min-h-[100px]
                ${errors?.description ? "border-red-400 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12" : "border-[#CBD5E1] focus:border-[#1E293B] focus:ring-[3px] focus:ring-[#1E293B]/10 hover:border-[#94A3B8]"}`}
            />
            {errors?.description && (
              <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#0F172A] mb-1.5 tracking-wide">
              Image <span className="text-[#94A3B8]">*</span>
            </label>
            <label
              htmlFor="product-image"
              className={`relative flex flex-col items-center justify-center w-full rounded-[10px] border-2 border-dashed transition-all duration-200 cursor-pointer
                ${imagePreview ? "border-[#1E293B]/30 bg-[#F8FAFC]" : "border-[#CBD5E1] hover:border-[#94A3B8] bg-[#FAFBFC]"}
                ${errors?.image ? "border-red-400" : ""}`}
              style={{ minHeight: "160px" }}
            >
              {imagePreview ? (
                <div className="relative w-full flex items-center justify-center p-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-36 rounded-lg object-cover shadow-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/40 rounded-[10px]">
                    <span className="text-white text-xs font-medium">Click to change</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-8">
                  <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#64748B]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#0F172A]">Upload product image</p>
                    <p className="text-[11px] text-[#94A3B8] mt-0.5">PNG, JPG or WEBP (max 5MB)</p>
                  </div>
                </div>
              )}
              <input
                id="product-image"
                name="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={onImageChange}
                className="sr-only"
              />
            </label>
            {errors?.image && (
              <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.image}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="product-price" className="block text-[13px] font-medium text-[#0F172A] mb-1.5 tracking-wide">
                Price <span className="text-[#94A3B8]">*</span>
              </label>
              <input
                id="product-price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={onChange}
                placeholder="0.00"
                className={`block w-full rounded-[10px] border px-3.5 py-[10px] text-sm text-[#0F172A] placeholder:text-[#94A3B8]/70 bg-white transition-all duration-200 outline-none
                  ${errors?.price ? "border-red-400 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12" : "border-[#CBD5E1] focus:border-[#1E293B] focus:ring-[3px] focus:ring-[#1E293B]/10 hover:border-[#94A3B8]"}`}
              />
              {errors?.price && (
                <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.price}</p>
              )}
            </div>

            <div>
              <label htmlFor="product-currency" className="block text-[13px] font-medium text-[#0F172A] mb-1.5 tracking-wide">
                Currency <span className="text-[#94A3B8]">*</span>
              </label>
              <div className="relative">
                <select
                  id="product-currency"
                  name="currency"
                  value={formData.currency}
                  onChange={onChange}
                  className={`block w-full rounded-[10px] border px-3.5 py-[10px] text-sm text-[#0F172A] bg-white transition-all duration-200 outline-none appearance-none cursor-pointer
                    ${errors?.currency ? "border-red-400 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12" : "border-[#CBD5E1] focus:border-[#1E293B] focus:ring-[3px] focus:ring-[#1E293B]/10 hover:border-[#94A3B8]"}`}
                >
                  {CURRENCIES.map((cur) => (
                    <option key={cur} value={cur}>{cur}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              {errors?.currency && (
                <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.currency}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" loading={loading} fullWidth>
              {loading ? "Creating Product..." : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default CreateProductForm;
