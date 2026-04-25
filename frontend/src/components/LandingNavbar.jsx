import React from "react";
import { Logo } from "./Logo";

export const LandingNavbar = ({ navigate }) => (
  <nav className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md px-[5%]">
    <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[62px]">
      <Logo onClick={() => navigate("landing")} />
      <div className="flex gap-8 items-center">
        {["Features", "Pricing", "Docs"].map(item => (
          <span
            key={item}
            className="text-sm font-medium text-muted cursor-pointer transition-colors duration-150 hover:text-text tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="flex gap-2.5">
        <button className="ghost-btn py-2 px-[18px] rounded-lg text-sm" onClick={() => navigate("login")}>
          Sign in
        </button>
        <button className="gold-btn py-2 px-[18px] rounded-lg text-sm" onClick={() => navigate("login")}>
          Get started
        </button>
      </div>
    </div>
  </nav>
);