import { useState } from "react";
import * as Icon from "../icons";
import { useNavigate } from "react-router-dom";

export const CampaignsPage = () => {
    const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const campaigns = [
    { id: 1, title: "March Product Launch", group: "Marketing", status: "active", sent: 2840, total: 3000, channel: "Email", date: "Mar 15" },
    { id: 2, title: "Newsletter – Week 12", group: "Content", status: "done", sent: 1200, total: 1200, channel: "Email", date: "Mar 10" },
    { id: 3, title: "Onboarding Drip #3", group: "Product", status: "draft", sent: 0, total: 850, channel: "SMS", date: "Mar 20" },
    { id: 4, title: "Churn Recovery Blast", group: "Growth", status: "failed", sent: 340, total: 500, channel: "SMS", date: "Mar 8" },
    { id: 5, title: "Feature Announcement", group: "Product", status: "active", sent: 1100, total: 4500, channel: "Email", date: "Apr 1" },
    { id: 6, title: "April Newsletter", group: "Content", status: "draft", sent: 0, total: 2200, channel: "Email", date: "Apr 20" },
  ];
  const filtered = filter === "all" ? campaigns : campaigns.filter(c => c.status === filter);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 4, fontFamily: "'Manrope', sans-serif" }}>Campaigns</h1>
          <p style={{ fontSize: 13, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>{campaigns.length} total</p>
        </div>
        <button className="gold-btn" onClick={() => navigate("/createCampaign")} style={{ padding: "9px 18px", borderRadius: 9, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon.Plus /> New Campaign
        </button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {["all", "active", "draft", "done", "failed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "5px 13px", borderRadius: 6, fontSize: 13, fontFamily: "'Manrope', sans-serif", fontWeight: 600,
            border: `1px solid ${filter === f ? "#D4A843" : "#222222"}`,
            background: filter === f ? "rgba(212,168,67,0.1)" : "transparent",
            color: filter === f ? "#D4A843" : "#666666", cursor: "pointer", textTransform: "capitalize",
          }}>{f}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(c => (
          <div key={c.id} className="card" onClick={() => navigate("/campaign")}
            style={{ padding: "16px 22px", cursor: "pointer", transition: "border-color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#A07828"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#222222"}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, fontFamily: "'Manrope', sans-serif" }}>{c.title}</div>
                <div style={{ fontSize: 12, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>{c.group} · {c.channel} · {c.date}</div>
              </div>
              <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{c.sent.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>sent</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{c.total.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>total</div>
                </div>
                <span className={`badge badge-${c.status}`}>{c.status}</span>
                <div style={{ color: "#666666" }}><Icon.ChevronRight /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};