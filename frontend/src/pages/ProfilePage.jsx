import { useState } from "react";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 24, fontFamily: "'Manrope', sans-serif" }}>Account</h1>
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
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}>Alex Kumar</div>
              <div style={{ fontSize: 13, color: "#666666", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>alex@company.com</div>
            </div>
            <button className="ghost-btn" style={{ padding: "6px 13px", borderRadius: 7, fontSize: 13 }}>Change photo</button>
          </div>
          <div className="card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, fontFamily: "'Manrope', sans-serif" }}>Personal Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label className="form-label">First name</label><input className="input-field" defaultValue="Alex" /></div>
              <div><label className="form-label">Last name</label><input className="input-field" defaultValue="Kumar" /></div>
              <div style={{ gridColumn: "1/-1" }}><label className="form-label">Email</label><input className="input-field" defaultValue="alex@company.com" type="email" /></div>
              <div style={{ gridColumn: "1/-1" }}><label className="form-label">Organization</label><input className="input-field" defaultValue="Acme Inc." /></div>
            </div>
            <button className="gold-btn" style={{ marginTop: 16, padding: "8px 18px", borderRadius: 8, fontSize: 14 }}>Save changes</button>
          </div>
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}>Current Plan</h3>
              <span className="badge badge-active">Pro</span>
            </div>
            {[["Monthly campaigns","Unlimited"],["Recipients per batch","50,000"],["Webhooks","Enabled"],["API access","Full"]].map(([k,v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "#666666", fontWeight: 500 }}>{k}</span>
                <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === "settings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 540 }} className="fade-in">
          {[{title:"Email notifications",desc:"Receive email when a campaign finishes",on:true},{title:"Webhook failures",desc:"Alert when webhook delivery fails",on:true},{title:"Weekly digest",desc:"Weekly summary of campaign performance",on:false},{title:"DLQ alerts",desc:"Notify when messages land in dead letter queue",on:true}].map(({title,desc,on}) => (
            <div key={title} className="card" style={{ padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
              <div><div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, fontFamily: "'Manrope', sans-serif" }}>{title}</div><div style={{ fontSize: 12, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>{desc}</div></div>
              <div style={{ width: 42, height: 22, borderRadius: 11, background: on ? "#D4A843" : "#222222", position: "relative", cursor: "pointer", flexShrink: 0 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.2s" }} />
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "security" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 540 }} className="fade-in">
          <div className="card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, fontFamily: "'Manrope', sans-serif" }}>Change Password</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div><label className="form-label">Current password</label><input className="input-field" type="password" placeholder="••••••••" /></div>
              <div><label className="form-label">New password</label><input className="input-field" type="password" placeholder="••••••••" /></div>
              <div><label className="form-label">Confirm new password</label><input className="input-field" type="password" placeholder="••••••••" /></div>
              <button className="gold-btn" style={{ padding: "8px 18px", borderRadius: 8, fontSize: 14, width: "fit-content" }}>Update password</button>
            </div>
          </div>
          <div className="card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, fontFamily: "'Manrope', sans-serif" }}>API Keys</h3>
            <p style={{ fontSize: 12, color: "#666666", fontFamily: "'JetBrains Mono', monospace", marginBottom: 14 }}>Use these to send campaigns programmatically</p>
            <div style={{ padding: "9px 13px", background: "#161616", borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#666666", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span>vlo_live_9k2x1p••••••••••</span>
              <button style={{ fontSize: 11, color: "#D4A843", background: "none", border: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontWeight: 700 }}>Reveal</button>
            </div>
            <button className="ghost-btn" style={{ padding: "7px 15px", borderRadius: 7, fontSize: 13 }}>Generate new key</button>
          </div>
        </div>
      )}
    </>
  );
};