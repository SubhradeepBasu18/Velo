import React from "react";
import { Logo } from "./Logo";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const LandingNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth0();  // Use Auth0 hook

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md px-[5%]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[62px]">
        <Logo onClick={() => navigate("/")} />
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
          {!isAuthenticated ? (
            // Render Sign in and Get started if user is not authenticated
            <>
              <button className="ghost-btn py-2 px-[18px] rounded-lg text-sm" onClick={() => navigate("/login")}>
                Sign in
              </button>
              <button className="gold-btn py-2 px-[18px] rounded-lg text-sm" onClick={() => navigate("/login")}>
                Get started
              </button>
            </>
          ) : (
            // Render Logout button if user is authenticated
            <button
              className="ghost-btn py-2 px-[18px] rounded-lg text-sm"
              onClick={() => {
                logout({ returnTo: window.location.origin }); // Log the user out and redirect to home
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};