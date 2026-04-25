import * as Icon from "../icons";

export const CampaignPage = ({ navigate }) => {
  const analytics = [
    { label: "Sent", value: 2840, icon: <Icon.Send />, color: "#D4A843", pct: 94.7 },
    { label: "Delivered", value: 2690, icon: <Icon.CheckCircle />, color: "#4ADE80", pct: 89.7 },
    { label: "Failed", value: 150, icon: <Icon.XCircle />, color: "#F87171", pct: 5.0 },
    { label: "Pending", value: 160, icon: <Icon.Clock />, color: "#94A3B8", pct: 5.3 },
  ];
  const webhookEvents = [
    { time: "14:32:01", event: "batch_complete", status: "200" },
    { time: "14:31:40", event: "message_failed", status: "200" },
    { time: "14:28:10", event: "message_delivered", status: "200" },
    { time: "14:22:00", event: "batch_started", status: "200" },
  ];
  return (
    <>
      <button onClick={() => navigate("campaigns")} style={{ fontSize: 13, color: "#666666", background: "none", border: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif", marginBottom: 8 }}>← Campaigns</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "'Manrope', sans-serif" }}>March Product Launch</h1>
            <span className="badge badge-active">active</span>
          </div>
          <p style={{ fontSize: 13, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>Marketing · Email · 3,000 recipients · Mar 15, 2026</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="ghost-btn" style={{ padding: "7px 15px", borderRadius: 8, fontSize: 13 }}>Pause</button>
          <button className="ghost-btn" style={{ padding: "7px 15px", borderRadius: 8, fontSize: 13, color: "#F87171", borderColor: "rgba(248,113,113,0.3)" }}>Delete</button>
        </div>
      </div>
      <div className="card" style={{ padding: "18px 22px", marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Overall Progress</span>
          <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "#D4A843" }}>94.7% complete</span>
        </div>
        <div style={{ height: 7, background: "#222222", borderRadius: 4 }}>
          <div style={{ width: "94.7%", height: "100%", background: "linear-gradient(90deg, #A07828, #D4A843)", borderRadius: 4 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7 }}>
          <span style={{ fontSize: 12, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>2,840 / 3,000 sent · 10 msgs/min</span>
          <span style={{ fontSize: 12, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>ETA ~16 min</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginBottom: 20 }}>
        {analytics.map(({ label, value, icon, color, pct }) => (
          <div key={label} className="stat-card" style={{ borderColor: `${color}25` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "#666666", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
              <div style={{ color }}>{icon}</div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color, letterSpacing: "-0.04em", marginBottom: 3, fontFamily: "'Manrope', sans-serif" }}>{value.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>{pct}% of total</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="card" style={{ padding: "20px 22px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, fontFamily: "'Manrope', sans-serif" }}>Campaign Details</h3>
          {[["Group name","Marketing Team Q1"],["Created by","Alex Kumar"],["User ID","usr_9k2x1p"],["Schedule","Mar 15 @ 09:00 IST"],["Channel","Email"],["Rate limit","10 msgs/min"]].map(([k,v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "#666666", fontWeight: 500 }}>{k}</span>
              <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "#F0EDE8" }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: "20px 22px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, fontFamily: "'Manrope', sans-serif" }}>Webhook Events</h3>
          {webhookEvents.map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "#161616", borderRadius: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#666666", minWidth: 58 }}>{e.time}</span>
              <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", flex: 1, color: "#F0EDE8" }}>{e.event}</span>
              <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#4ADE80" }}>{e.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};