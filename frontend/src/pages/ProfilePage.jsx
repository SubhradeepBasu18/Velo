import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { completeUserProfile, getUserProfile } from "../configAPI/user.api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [updateFormData, setUpdateFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    organization: ""
  });
  const [user, setUser] = useState("");
  const { isAuthenticated } = useAuth0();
  const { user: authUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fetchUserProfile = async () => {
    const response = await getUserProfile();
    
    if (response.status === 200) {
      setUser(response.data);
      setUpdateFormData({
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
        password: "",
        confirmPassword: "",
        organization: response.data.organization || ""
      });
    }
  };

  useEffect(() => {
    if (authUser) {
      fetchUserProfile();
    }
  }, [authUser]);

  const handleSubmitUpdateForm = async () => {
    if (updateFormData.password !== updateFormData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await completeUserProfile(
      updateFormData.firstName,
      updateFormData.lastName,
      updateFormData.password,
      updateFormData.organization
    );

    if (response.status === 200) {
      alert("Profile updated successfully");
      navigate("/dashboard");
    } else {
      alert("Failed to update profile");
    }
  };

  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 24, fontFamily: "'Manrope', sans-serif" }}>
        Account
      </h1>
      <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid #222222" }}>
        {["profile", "settings", "security"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "9px 18px", fontSize: 14, fontFamily: "'Manrope', sans-serif", fontWeight: 600, background: "none", border: "none", borderBottom: `2px solid ${activeTab === tab ? "#D4A843" : "transparent"}`, color: activeTab === tab ? "#D4A843" : "#666666", cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s", marginBottom: -1 }}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 540 }} className="fade-in">
          <div className="card" style={{ padding: "22px", display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 58, height: 58, borderRadius: "50%", background: "linear-gradient(135deg, #D4A843, #A07828)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#000", fontFamily: "'Manrope', sans-serif" }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}>{user?.firstName || "Alex Kumar"}</div>
              <div style={{ fontSize: 13, color: "#666666", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{user?.email || "alex@company.com"}</div>
            </div>
            <button className="ghost-btn" style={{ padding: "6px 13px", borderRadius: 7, fontSize: 13 }}>Change photo</button>
          </div>
          
          <div className="card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, fontFamily: "'Manrope', sans-serif" }}>Personal Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {/* First name input */}
              <div>
                <label className="form-label">First name</label>
                <input 
                  className="input-field" 
                  value={updateFormData.firstName}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, firstName: e.target.value })}
                />
              </div>

              {/* Last name input */}
              <div>
                <label className="form-label">Last name</label>
                <input 
                  className="input-field" 
                  value={updateFormData.lastName}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, lastName: e.target.value })}
                />
              </div>

              {/* Email input */}
              <div style={{ gridColumn: "1/-1" }}>
                <label className="form-label">Email</label>
                <p className="text-white">{user?.email || "Not available"}</p>
              </div>

              {/* Password input */}
              <div style={{ gridColumn: "1/-1" }}>
                <label className="form-label">Password</label>
                <div style={{ position: "relative" }}>
                  <input 
                    className="input-field" 
                    type={showPassword ? "text" : "password"}
                    value={updateFormData.password}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, password: e.target.value })}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password input */}
              <div style={{ gridColumn: "1/-1" }}>
                <label className="form-label">Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <input 
                    className="input-field" 
                    type={showConfirmPassword ? "text" : "password"}
                    value={updateFormData.confirmPassword}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, confirmPassword: e.target.value })}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Organization input */}
              <div style={{ gridColumn: "1/-1" }}>
                <label className="form-label">Organization</label>
                <input 
                  className="input-field" 
                  value={updateFormData.organization}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, organization: e.target.value })}
                />
              </div>
            </div>

            <button 
              className="gold-btn"
              style={{ marginTop: 16, padding: "8px 18px", borderRadius: 8, fontSize: 14 }}
              onClick={handleSubmitUpdateForm}
            >
              Save changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};