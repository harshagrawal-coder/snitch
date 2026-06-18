import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProducts } from "../hook/useProducts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CURRENCY_SYMBOLS = { USD: "$", INR: "₹", EUR: "€", JPY: "¥" };

const FEATURES = [
  { label: "Premium Quality", desc: "Handpicked products for you" },
  { label: "Fast Delivery", desc: "2-5 business days" },
  { label: "Secure Checkout", desc: "100% safe payment" },
  { label: "24/7 Support", desc: "We are here to help" },
];

const CATEGORIES = [
  { label: "Electronics", icon: "⚡" },
  { label: "Fashion", icon: "👕" },
  { label: "Home", icon: "🏠" },
  { label: "Beauty", icon: "✨" },
  { label: "Sports", icon: "🏃" },
  { label: "Books", icon: "📚" },
];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const Home = () => {
  const navigate = useNavigate();
  const getProducts = useSelector((state) => state.product.userProducts);
  const { handlegetAllProductsForuser } = useProducts();

  useEffect(() => {
    handlegetAllProductsForuser();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* ──────── Header ──────── */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#CBD5E1]/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1E293B] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm font-semibold text-[#0F172A]">Snitch</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#64748B] hidden sm:inline">
              Discover
            </span>
            <span className="w-1 h-1 rounded-full bg-[#CBD5E1] hidden sm:inline" />
            <span className="text-[11px] text-[#64748B] hidden sm:inline">
              Products
            </span>
          </div>
        </div>
      </motion.header>

      {/* ──────── Hero ──────── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-br from-[#1E293B] via-[#1E293B] to-[#334155]"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/70 text-[11px] font-medium tracking-wide mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Premium Marketplace
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
              Discover{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                Exceptional
              </span>{" "}
              Products
            </h1>
            <p className="text-white/50 mt-3 text-sm sm:text-base max-w-lg leading-relaxed">
              Curated collections from top sellers. Find everything you need in
              one place.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-[#64748B] to-[#475569] ring-2 ring-[#1E293B] flex items-center justify-center text-[9px] font-semibold text-white"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-white/40">
                Trusted by 12K+ customers
              </span>
            </div>
          </motion.div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-12 bg-gradient-to-t from-[#F8F8F8] to-transparent" />
      </motion.section>

      {/* ──────── Features Bar ──────── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/40 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#CBD5E1]/20 grid grid-cols-2 sm:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.08 }}
              className="px-4 py-3.5 sm:px-5 sm:py-4 text-center sm:text-left"
            >
              <p className="text-[11px] font-semibold text-[#0F172A] tracking-wide uppercase">
                {f.label}
              </p>
              <p className="text-[11px] text-[#64748B] mt-0.5">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ──────── Categories ──────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#0F172A]">Categories</h2>
          <span className="text-[11px] text-[#64748B]">Browse all</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#CBD5E1]/40 shadow-sm hover:border-[#CBD5E1]/60 hover:shadow-md transition-all duration-200 text-[12px] font-medium text-[#0F172A]"
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ──────── Products Grid ──────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-5"
        >
          <div>
            <h2 className="text-sm font-semibold text-[#0F172A]">
              Featured Products
            </h2>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              {getProducts?.length || 0} items available
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-[#64748B]">Latest arrivals</span>
          </div>
        </motion.div>

        {!getProducts || getProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/40 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-[#64748B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
                No products yet
              </h2>
              <p className="text-[13px] text-[#64748B] mb-4 text-center max-w-sm">
                Products will appear here once sellers start listing them.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {getProducts.map((product, index) => {
              const symbol =
                CURRENCY_SYMBOLS[product.price?.currency] ||
                product.price?.currency ||
                "$";
              const imageUrl = product.img?.[0]?.url;
              const altText = product.img?.[0]?.alt || product.title;

              return (
                <motion.div
                  onClick={() => navigate(`/product/${product._id}`)}
                  key={product._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/40 overflow-hidden hover:shadow-md hover:border-[#CBD5E1]/60 transition-all duration-200"
                >
                  <div className="aspect-[4/3] bg-[#F8FAFC] overflow-hidden relative">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={altText}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-[#CBD5E1]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-[#0F172A] truncate">
                      {product.title}
                    </h3>
                    <p className="text-[12px] text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                      {product.description || "No description"}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#CBD5E1]/20">
                      <span className="text-sm font-bold text-[#0F172A]">
                        {symbol}
                        {Number(product.price?.amount || 0).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          },
                        )}
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">
                        {formatDate(product.createdAt)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ──────── Footer ──────── */}
      <footer className="border-t border-[#CBD5E1]/30 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#1E293B] flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">S</span>
            </div>
            <span className="text-[11px] text-[#64748B]">
              © 2025 Snitch. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#94A3B8]">Privacy</span>
            <span className="text-[11px] text-[#94A3B8]">Terms</span>
            <span className="text-[11px] text-[#94A3B8]">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
