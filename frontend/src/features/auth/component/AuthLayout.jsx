import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BADGES = [
  {
    label: "12K+ Customers",
    top: "15%",
    right: "10%",
    delay: 0.4,
    driftX: 6,
    driftY: -8,
  },
  {
    label: "4.8 ★★★★★",
    top: "45%",
    left: "8%",
    delay: 0.8,
    driftX: -5,
    driftY: 7,
  },
  {
    label: "New Collection",
    top: "72%",
    right: "12%",
    delay: 1.2,
    driftX: 7,
    driftY: 5,
  },
];

function AuthLayout({ children }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      imgRef.current.style.transform = `scale(1.08) translate(${x * -12}px, ${y * -8}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1EC] lg:flex relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #F7F4EF 0%, #F0ECE4 40%, #EDE8DF 100%)'
      }}
    >
      {/* Grain noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.01] mix-blend-multiply z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }}
      />

      {/* Light grid */}
      <div className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(203,213,225,0.25) 39px, rgba(203,213,225,0.25) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(203,213,225,0.25) 39px, rgba(203,213,225,0.25) 40px)
          `
        }}
      />

      {/* Left: Brand showcase */}
      <div className="hidden lg:flex lg:w-[40%] relative overflow-hidden">
        <div ref={imgRef} className="absolute inset-0 transition-transform duration-[100ms] ease-out will-change-transform">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=85"
            alt=""
            className="w-full h-full object-cover brightness-[1.05]"
          />
        </div>
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/20 via-transparent to-[#1E293B]/60" />
        {/* Soft depth */}
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 120px rgba(0,0,0,0.3)' }} />
        {/* White dot pattern */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='white' fill-opacity='0.06'/%3E%3C/svg%3E")`,
            backgroundSize: '36px 36px'
          }}
        />
        {/* Floating badges */}
        {BADGES.map((badge) => (
          <motion.div
            key={badge.label}
            className="absolute z-20"
            style={{ top: badge.top, left: badge.left, right: badge.right }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: badge.delay }}
          >
            <motion.div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg text-[11px] font-semibold text-[#1E293B] tracking-wide"
              animate={{ x: [0, badge.driftX, 0], y: [0, badge.driftY, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
            >
              {badge.label === "4.8 ★★★★★" ? (
                <>
                  <span className="text-amber-500 mr-0.5">★</span>
                  {badge.label}
                </>
              ) : badge.label === "New Collection" ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                  {badge.label}
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 text-[#1E293B]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6.75V1.5a.75.75 0 011.5 0v5.25a.75.75 0 01-1.5 0zM9 12.75V18a.75.75 0 001.5 0v-5.25a.75.75 0 00-1.5 0z" opacity={0.5} />
                    <path fillRule="evenodd" d="M2.25 10a.75.75 0 01.75-.75h14a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z" />
                  </svg>
                  {badge.label}
                </>
              )}
            </motion.div>
          </motion.div>
        ))}
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12 w-full">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-lg ring-1 ring-white/15">
              <span className="text-white font-bold text-lg tracking-tight">S</span>
            </div>
          </div>
          <div className="pb-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/50 text-[10px] font-medium uppercase tracking-[0.25em] mb-3"
            >
              Est. 2024
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl font-semibold text-white tracking-tight"
            >
              Snitch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/50 mt-2 text-sm leading-relaxed max-w-xs"
            >
              Premium e-commerce for the modern lifestyle.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-4 mt-6"
            >
              <span className="inline-block w-8 h-px rounded-full bg-white/30" />
              <span className="inline-block w-4 h-px rounded-full bg-white/15" />
              <span className="inline-block w-2 h-px rounded-full bg-white/10" />
            </motion.div>
          </div>
          <div className="absolute bottom-12 right-12 opacity-15">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right: Auth experience */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
        {/* Mobile header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-10 px-4 py-3 flex items-center gap-2.5 border-b border-[#CBD5E1]/50">
          <div className="w-7 h-7 rounded-lg bg-[#1E293B] flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="text-sm font-semibold text-[#0F172A]">Snitch</span>
        </div>
        {/* Mobile hero */}
        <div className="lg:hidden w-full h-32 rounded-2xl overflow-hidden mb-5 mt-14 relative">
          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80" alt="" className="w-full h-full object-cover brightness-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/30 to-transparent" />
        </div>
        <div className="w-full max-w-[520px] pt-1 lg:pt-0 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
