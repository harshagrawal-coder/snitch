import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hook/useProducts";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const CURRENCY_SYMBOLS = { USD: "$", INR: "₹", EUR: "€", JPY: "¥" };

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const HIGHLIGHTS = [
  {
    label: "Premium Material",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  },
  {
    label: "Authentic Product",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    label: "Free Returns",
    icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
  },
  {
    label: "Secure Delivery",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
];

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-4 w-24 bg-[#CBD5E1] rounded mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-[4/5] bg-[#CBD5E1]/30 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-[#CBD5E1]/30 rounded-lg" />
            <div className="h-4 w-1/3 bg-[#CBD5E1]/30 rounded" />
            <div className="h-14 w-1/4 bg-[#CBD5E1]/30 rounded-xl mt-6" />
            <div className="space-y-2 mt-6">
              <div className="h-3 w-full bg-[#CBD5E1]/30 rounded" />
              <div className="h-3 w-5/6 bg-[#CBD5E1]/30 rounded" />
              <div className="h-3 w-4/6 bg-[#CBD5E1]/30 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Detailproduct = () => {
  const user = useSelector((state) => state.auth.user);
  const { productId } = useParams();
  const { handlegetproductbyId } = useProducts();
  const navigate = useNavigate();
  const [product, setproduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    handlegetproductbyId(productId)
      .then((data) => setproduct(data))
      .catch(() => setproduct(null))
      .finally(() => setLoading(false));
  }, [productId]);
  const addToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
  };
  if (loading) return <LoadingSkeleton />;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center mx-auto mb-4">
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
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">
            Product not found
          </h2>
          <p className="text-[13px] text-[#64748B] mb-6">
            This product may have been removed or doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#1E293B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#334155] transition-all duration-150"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const symbol =
    CURRENCY_SYMBOLS[product.price?.currency] || product.price?.currency || "$";
  const price = Number(product.price?.amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const images = product.img?.length ? product.img : [];
  const mainImage = images[selectedImage] || { url: "", alt: product.title };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#CBD5E1]/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1E293B] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm font-semibold text-[#0F172A]">Snitch</span>
          </div>
          <div className="w-14" />
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="aspect-[4/5] bg-[#F8FAFC] rounded-2xl overflow-hidden border border-[#CBD5E1]/40 shadow-sm group">
                {mainImage.url ? (
                  <img
                    src={mainImage.url}
                    alt={mainImage.alt}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-20 h-20 text-[#CBD5E1]"
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

              {images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        i === selectedImage
                          ? "border-[#1E293B] shadow-sm"
                          : "border-[#CBD5E1]/40 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#1E293B]/5 text-[11px] font-medium text-[#64748B] tracking-wide mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {formatDate(product.createdAt)}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0F172A] tracking-tight leading-tight">
              {product.title}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
                {symbol}
                {price}
              </span>
              <span className="text-[13px] text-[#64748B] line-through">
                {symbol}
                {Number(product.price?.amount * 1.2 || 0).toLocaleString(
                  "en-US",
                  { minimumFractionDigits: 2 },
                )}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-6">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-[#CBD5E1]/30"
                >
                  <svg
                    className="w-4 h-4 text-[#64748B] shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={h.icon}
                    />
                  </svg>
                  <span className="text-[11px] font-medium text-[#0F172A]">
                    {h.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-[#0F172A] mb-2">
                Description
              </h3>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                {product.description || "No description provided."}
              </p>
            </div>

            <div className="my-6 border-t border-[#CBD5E1]/30" />

            <div className="flex items-center gap-3">
              <button
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E293B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#334155] active:bg-[#0F172A] transition-all duration-150 shadow-sm"
                onClick={addToCart}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                Add to Cart
              </button>
              <button className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-[#CBD5E1]/40 bg-white hover:bg-[#F8FAFC] transition-all duration-150 shadow-sm">
                <svg
                  className="w-5 h-5 text-[#64748B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-[#64748B]">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              Free shipping on orders over {symbol}5,000
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-2xl border border-[#CBD5E1]/40 p-5 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-[#1E293B]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-1">
              Authenticity Guaranteed
            </h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Every product is verified for quality and authenticity by our
              team.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#CBD5E1]/40 p-5 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-[#1E293B]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-1">
              Easy 30-Day Returns
            </h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Not satisfied? Return within 30 days for a full refund, no
              questions asked.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#CBD5E1]/40 p-5 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-[#1E293B]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-1">
              Seller Verified
            </h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              This product is sold by a verified seller with proven track
              record.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 pb-10"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-[#0F172A]">
                You might also like
              </h2>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Similar products you may enjoy
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/40 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[#F1F5F9] to-[#F8FAFC] flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#CBD5E1]"
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
                <div className="p-3">
                  <div className="h-3 w-3/4 bg-[#F1F5F9] rounded mb-2" />
                  <div className="h-3 w-1/2 bg-[#F1F5F9] rounded" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

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

export default Detailproduct;
