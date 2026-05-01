import React from "react";
import { Logo } from "./Logo";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { logoutUser } from "../configAPI/user.api";

export const LandingNavbar = () => {
  const navigate = useNavigate();
  
  // 1. Grab what we need from both worlds
  const { isAuthenticated, logout: auth0Logout } = useAuth0(); 
  const { user, logout: logoutFromStore } = useAuthStore();

  const handleCustomLogout = async () => {
      return await logoutUser();
    }

  const handleLogout = () => {
    // 2. Clear the Zustand store (removes user from localStorage)
    logoutFromStore();

    // 3. Handle the redirection
    if (isAuthenticated) {
      // If they logged in via Google/Auth0, trigger their logout redirect
      auth0Logout({ 
        logoutParams: { returnTo: window.location.origin } 
      });
    } else {
      // If it was a custom login, just send them to the landing page
      const response = handleCustomLogout();
      if (response.success) {
        navigate("/");
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md px-[5%]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[62px]">
        <Logo onClick={() => navigate("/")} />
        
        {/* ... Nav Items ... */}

        <div className="flex gap-2.5">
          {!user ? (
            <>
              <button className="ghost-btn py-2 px-[18px] rounded-lg text-sm" onClick={() => navigate("/login")}>
                Sign in
              </button>
              <button className="gold-btn py-2 px-[18px] rounded-lg text-sm" onClick={() => navigate("/login")}>
                Get started
              </button>
            </>
          ) : (
            <button
              className="ghost-btn py-2 px-[18px] rounded-lg text-sm"
              onClick={handleLogout} // 4. Use the new handler
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};