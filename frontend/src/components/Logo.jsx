import React from "react";

export const Logo = ({ onClick }) => (
  <div onClick={onClick} className="cursor-pointer flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center font-sans font-extrabold text-[15px] text-black tracking-tighter">
      V
    </div>
    <span className="font-extrabold text-[19px] tracking-tighter text-text font-sans">
      velo
    </span>
  </div>
);