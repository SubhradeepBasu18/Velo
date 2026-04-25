import React from "react";
import { Sidebar } from "./Sidebar";

export const AppShell = ({ page, navigate, children }) => (
  <div className="flex">
    <Sidebar page={page} navigate={navigate} />
    <div className="ml-[210px] flex-1 min-h-screen py-8 px-10">
      <div className="animate-fade-in">{children}</div>
    </div>
  </div>
);