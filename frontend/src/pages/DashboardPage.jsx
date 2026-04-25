import React from "react";
import { Plus } from "../icons";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
    const navigate = useNavigate();
  const campaigns = [
    { id: 1, title: "March Product Launch", group: "Marketing", status: "active", sent: 2840, total: 3000, date: "Mar 15" },
    { id: 2, title: "Newsletter – Week 12", group: "Content", status: "done", sent: 1200, total: 1200, date: "Mar 10" },
    { id: 3, title: "Onboarding Drip #3", group: "Product", status: "draft", sent: 0, total: 850, date: "Mar 20" },
    { id: 4, title: "Churn Recovery Blast", group: "Growth", status: "failed", sent: 340, total: 500, date: "Mar 8" },
  ];
  const stats = [
    { label: "Total Sent", value: "48,200", sub: "+12% this month", color: "#D4A843" },
    { label: "Delivered", value: "46,800", sub: "97.1% rate", color: "#4ADE80" },
    { label: "Failed", value: "1,400", sub: "2.9% rate", color: "#F87171" },
    { label: "Active Now", value: "3", sub: "campaigns running", color: "#E8C06A" },
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 4, fontFamily: "'Manrope', sans-serif" }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>Saturday, April 25, 2026</p>
        </div>
        <button className="gold-btn" onClick={() => navigate("/createCampaign")} style={{ padding: "9px 18px", borderRadius: 9, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <Plus /> New Campaign
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14, marginBottom: 28 }}>
        {stats.map(({ label, value, sub, color }) => (
          <div key={label} className="stat-card">
            <div style={{ fontSize: 11, color: "#666666", fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: "-0.04em", marginBottom: 4, fontFamily: "'Manrope', sans-serif" }}>{value}</div>
            <div style={{ fontSize: 12, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>{sub}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #222222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "'Manrope', sans-serif" }}>Recent Campaigns</h2>
          <button onClick={() => navigate("campaigns")} style={{ fontSize: 13, color: "#D4A843", background: "none", border: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontWeight: 700 }}>View all →</button>
        </div>
        {campaigns.map((c, i) => (
          <div key={c.id} onClick={() => navigate("campaign")}
            style={{ padding: "15px 22px", borderBottom: i < campaigns.length - 1 ? "1px solid #222222" : "none", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#161616"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, fontFamily: "'Manrope', sans-serif" }}>{c.title}</div>
              <div style={{ fontSize: 12, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>{c.group} · {c.date}</div>
            </div>
            <div style={{ textAlign: "right", marginRight: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{c.sent.toLocaleString()} / {c.total.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: "#666666", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>sent / total</div>
            </div>
            <div style={{ width: 72 }}>
              <div style={{ height: 4, background: "#222222", borderRadius: 4, marginBottom: 3 }}>
                <div style={{ width: `${Math.round((c.sent / c.total) * 100)}%`, height: "100%", background: "#D4A843", borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 11, color: "#666666", fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>{Math.round((c.sent / c.total) * 100)}%</div>
            </div>
            <span className={`badge badge-${c.status}`}>{c.status}</span>
          </div>
        ))}
      </div>
    </>
  );
};