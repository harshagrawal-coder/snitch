import React, { useEffect } from "react";
import { useProducts } from "../hook/useProducts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CURRENCY_SYMBOLS = { USD: "$", INR: "₹", EUR: "€", JPY: "¥" };

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function Dashboard() {
  const { handleGetAllProducts } = useProducts();
  const sellerproducts = useSelector((state) => state.product.sellerProducts);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const totalProducts = sellerproducts?.length || 0;

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E293B] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-[#0F172A]">Snitch</span>
              <p className="text-[11px] text-[#64748B] -mt-0.5">Product Manager</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/40 overflow-hidden mb-6"
        >
          <div className="px-6 py-5 border-b border-[#CBD5E1]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold text-[#0F172A] tracking-tight">My Products</h1>
              <p className="text-[13px] text-[#64748B] mt-0.5">Manage and view all your listed products</p>
            </div>
            <button
              onClick={() => navigate("/seller/create-product")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1E293B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#334155] active:bg-[#0F172A] transition-all duration-150 outline-none focus:ring-2 focus:ring-[#1E293B]/30 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Product
            </button>
          </div>

          {totalProducts > 0 && (
            <div className="px-6 py-4 bg-[#FAFBFC] border-b border-[#CBD5E1]/20">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">Total</span>
                  <span className="font-semibold text-[#0F172A]">{totalProducts}</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {totalProducts === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/40 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#64748B]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[#0F172A] mb-1">No products yet</h2>
              <p className="text-[13px] text-[#64748B] mb-6 text-center max-w-sm">Your products will appear here once you create them. Get started by listing your first product.</p>
              <button
                onClick={() => navigate("/seller/create-product")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1E293B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#334155] active:bg-[#0F172A] transition-all duration-150 outline-none focus:ring-2 focus:ring-[#1E293B]/30 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Create Your First Product
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sellerproducts.map((product, index) => {
              const symbol = CURRENCY_SYMBOLS[product.price?.currency] || product.price?.currency || "$";
              const imageUrl = product.img?.[0]?.url;
              const altText = product.img?.[0]?.alt || product.title;

              return (
                <motion.div
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
                        <svg className="w-10 h-10 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-[#0F172A] truncate">{product.title}</h3>
                    <p className="text-[12px] text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                      {product.description || "No description"}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#CBD5E1]/20">
                      <span className="text-sm font-bold text-[#0F172A]">
                        {symbol}{Number(product.price?.amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">{formatDate(product.createdAt)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
