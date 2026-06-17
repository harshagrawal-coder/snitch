function Divider({ text = "OR" }) {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#CBD5E1]/40" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-[11px] font-medium text-[#94A3B8] tracking-widest">
          {text}
        </span>
      </div>
    </div>
  );
}

export default Divider;
