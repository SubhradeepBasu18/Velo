import React from "react";
import { Logo } from "./Logo";
import { Home, Send, BarChart, User, Settings, LogOut } from "../icons";

const links = [
  { id: "/dashboard", label: "Dashboard", Icon: Home },
  { id: "/campaigns", label: "Campaigns", Icon: Send },
  { id: "/analytics", label: "Analytics", Icon: BarChart },
  { id: "/profile", label: "Profile", Icon: User },
  { id: "/settings", label: "Settings", Icon: Settings },
];

export const Sidebar = ({ page, navigate }) => (
  <div className="w-[210px] min-h-screen bg-surface border-r border-border flex flex-col p-[18px_10px] fixed top-0 left-0 z-40">
    <div className="pb-[22px] px-1.5"><Logo onClick={() => navigate("/dashboard")} /></div>
    <div className="flex-1 flex flex-col gap-0.5">
      {links.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`nav-link ${page === id ? "active" : ""}`}
          onClick={() => navigate(id)}
        >
          <Icon />{label}
        </button>
      ))}
    </div>
    <div className="pt-3.5 mt-auto border-t border-border">
      <div className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg mb-1">
        <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-bold text-black text-[13px]">A</div>
        <div>
          <div className="text-[13px] font-bold text-text font-sans">Alex Kumar</div>
          <div className="text-[11px] text-muted font-mono">Pro Plan</div>
        </div>
      </div>
      <button className="nav-link text-red-400" onClick={() => navigate("/")}>
        <LogOut />Sign out
      </button>
    </div>
  </div>
);