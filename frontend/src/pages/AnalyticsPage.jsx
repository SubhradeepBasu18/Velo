export const AnalyticsPage = () => {
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  const values = [8200, 11400, 9800, 14200, 16800, 19400, 48200];
  const max = Math.max(...values);
  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 24, fontFamily: "'Manrope', sans-serif" }}>Analytics</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        {[{label:"Total Sent",value:"127,400",color:"#D4A843"},{label:"Delivered",value:"123,600",color:"#4ADE80"},{label:"Failed",value:"3,800",color:"#F87171"},{label:"Delivery Rate",value:"97.1%",color:"#E8C06A"}].map(({label,value,color}) => (
          <div key={label} className="stat-card">
            <div style={{ fontSize: 11, color: "#666666", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color, letterSpacing: "-0.04em", fontFamily: "'Manrope', sans-serif" }}>{value}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: "22px 26px", marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 20, fontFamily: "'Manrope', sans-serif" }}>Monthly Volume</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 150 }}>
          {months.map((m, i) => (
            <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}>
              <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                <div style={{ width: "100%", height: `${(values[i] / max) * 100}%`, background: i === months.length - 1 ? "linear-gradient(180deg, #D4A843, #A07828)" : "#161616", borderRadius: "4px 4px 0 0", border: `1px solid ${i === months.length - 1 ? "#D4A843" : "#222222"}` }} />
              </div>
              <span style={{ fontSize: 11, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>{m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding: "22px 26px" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 18, fontFamily: "'Manrope', sans-serif" }}>Channel Breakdown</h3>
        {[{label:"Email",pct:72,count:"91,700"},{label:"SMS",pct:28,count:"35,700"}].map(({label,pct,count}) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Manrope', sans-serif" }}>{label}</span>
              <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "#D4A843" }}>{count} · {pct}%</span>
            </div>
            <div style={{ height: 6, background: "#222222", borderRadius: 4 }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "#D4A843", borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};