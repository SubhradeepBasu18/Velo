import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { authSyncUser } from "../configAPI/user.api";
import { useAuthStore } from "../store/authStore";

export const Auth0Callback = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, getAccessTokenSilently, isLoading, error } = useAuth0();
  const setAuth = useAuthStore((state) => state.login);

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (isLoading) return;
      
      if (error) {
        console.error("Auth0 error:", error);
        navigate("/login");
        return;
      }

      if (!isAuthenticated || !user) {
        console.log("Not authenticated, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        const token = await getAccessTokenSilently();
        console.log("Got access token, syncing user...");
        
        // Set the access token as a cookie
        // setCookie('accessToken', token, { path: '/', secure: true, sameSite: 'none', httpOnly: true });

        const response = await authSyncUser(token);
        console.log("User sync response:", response);

        // Login with the synced user data from backend
        setAuth(response.data.user);


        // Route based on whether user is new (needs onboarding)
        if (response.data.isNewUser) {
          console.log("New user, routing to profile");
          navigate("/profile");
        } else {
          console.log("Existing user, routing to dashboard");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error during auth callback:", error);
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [isAuthenticated, user, getAccessTokenSilently, isLoading, error, navigate]);

  return (
    <div className="min-h-screen bg-bg text-text font-sans flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted">Completing authentication...</p>
      </div>
    </div>
  );
};
