import { useState, useRef } from "react";
import * as Icon from "../icons";
import { useNavigate } from "react-router-dom";

export const CreateCampaignPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [channel, setChannel] = useState("email");
    const [entryMode, setEntryMode] = useState("csv");
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [scheduleType, setScheduleType] = useState("now");
    const [template, setTemplate] = useState("Hi {{name}}, here's a quick update from us at {{company}}.");
    const fileRef = useRef();
    const steps = ["Details", "Recipients", "Message", "Schedule", "Review"];

  return (
    <>
      <button onClick={() => navigate("/dashboard")} style={{ fontSize: 13, color: "#666666", background: "none", border: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif", marginBottom: 8 }}>← Dashboard</button>
      <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 24, fontFamily: "'Manrope', sans-serif" }}>Create Campaign</h1>
      <div style={{ display: "flex", gap: 0, marginBottom: 28, position: "relative" }}>
        {steps.map((label, i) => {
          const num = i + 1; const done = step > num; const active = step === num;
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={() => setStep(num)}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: done ? "#D4A843" : active ? "rgba(212,168,67,0.15)" : "#111111", border: `2px solid ${done || active ? "#D4A843" : "#222222"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: done ? "#000" : active ? "#D4A843" : "#666666", transition: "all 0.2s" }}>
                  {done ? "✓" : num}
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: active ? "#D4A843" : "#666666", whiteSpace: "nowrap", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Manrope', sans-serif" }}>{label}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: step > num ? "#D4A843" : "#222222", margin: "0 6px", marginBottom: 20, transition: "background 0.3s" }} />}
            </div>
          );
        })}
      </div>
      <div className="card" style={{ padding: 26, maxWidth: 680 }}>
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="fade-in">
            <div><label className="form-label">Campaign Title</label><input className="input-field" type="text" placeholder="e.g. April Newsletter" /></div>
            <div><label className="form-label">Short Description</label><textarea className="input-field" placeholder="What's this campaign about?" style={{ height: 80 }} /></div>
            <div>
              <label className="form-label">Channel</label>
              <div style={{ display: "flex", gap: 10 }}>
                {["email", "sms", "both"].map(ch => (
                  <button key={ch} onClick={() => setChannel(ch)} style={{ flex: 1, padding: "10px", borderRadius: 8, fontSize: 13, fontFamily: "'Manrope', sans-serif", fontWeight: 600, textTransform: "capitalize", border: `1px solid ${channel === ch ? "#D4A843" : "#222222"}`, background: channel === ch ? "rgba(212,168,67,0.1)" : "#161616", color: channel === ch ? "#D4A843" : "#666666", cursor: "pointer" }}>
                    {ch === "both" ? "Email + SMS" : ch.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div><label className="form-label">Group Name</label><input className="input-field" type="text" placeholder="e.g. Marketing Q2" /></div>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="fade-in">
            <div style={{ display: "flex", gap: 10 }}>
              {["csv", "manual"].map(m => (
                <button key={m} onClick={() => setEntryMode(m)} style={{ padding: "7px 18px", borderRadius: 7, fontSize: 13, fontFamily: "'Manrope', sans-serif", fontWeight: 600, border: `1px solid ${entryMode === m ? "#D4A843" : "#222222"}`, background: entryMode === m ? "rgba(212,168,67,0.1)" : "transparent", color: entryMode === m ? "#D4A843" : "#666666", cursor: "pointer" }}>
                  {m === "csv" ? "CSV Upload" : "Manual Entry"}
                </button>
              ))}
            </div>
            {entryMode === "csv" ? (
              <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) setFileName(f.name); }} onClick={() => fileRef.current.click()}
                style={{ border: `2px dashed ${dragging ? "#D4A843" : "#222222"}`, borderRadius: 12, padding: "40px 24px", textAlign: "center", cursor: "pointer", background: dragging ? "rgba(212,168,67,0.04)" : "transparent", transition: "all 0.2s" }}>
                <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={e => setFileName(e.target.files[0]?.name)} />
                <div style={{ color: "#D4A843", marginBottom: 10, display: "flex", justifyContent: "center" }}><Icon.Upload /></div>
                {fileName ? <div style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: "#D4A843" }}>{fileName}</div> : <>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5, fontFamily: "'Manrope', sans-serif" }}>Drop your CSV here</div>
                  <div style={{ fontSize: 12, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>or click to browse · .csv files</div>
                  <div style={{ fontSize: 12, color: "#666666", fontFamily: "'JetBrains Mono', monospace", marginTop: 6 }}>Columns: email/phone, name, custom fields</div>
                </>}
              </div>
            ) : (
              <div><label className="form-label">Emails / Phone numbers</label><textarea className="input-field" placeholder={"alex@company.com\nbob@company.com, +919876543211"} style={{ height: 130 }} /></div>
            )}
          </div>
        )}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="fade-in">
            <div><label className="form-label">Subject Line</label><input className="input-field" type="text" placeholder="Here's what's new at {{company}}" /></div>
            <div>
              <label className="form-label">Message Template</label>
              <textarea className="input-field" value={template} onChange={e => setTemplate(e.target.value)} style={{ height: 150 }} />
              <div style={{ fontSize: 12, color: "#666666", marginTop: 5, fontFamily: "'JetBrains Mono', monospace" }}>Use {"{{variable}}"} for personalisation. Available: name, email, company, phone, + CSV columns.</div>
            </div>
            <div>
              <label className="form-label">Customization Options</label>
              {[["{{name}}","Recipient full name"],["{{company}}","Recipient company"],["{{custom_1}}","Custom field 1 from CSV"]].map(([key, desc]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "#161616", borderRadius: 8, border: "1px solid #222222", marginBottom: 8 }}>
                  <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#D4A843", minWidth: 90 }}>{key}</code>
                  <span style={{ fontSize: 13, color: "#666666", flex: 1, fontWeight: 400 }}>{desc}</span>
                  <button onClick={() => setTemplate(t => t + " " + key)} style={{ fontSize: 11, color: "#D4A843", background: "rgba(212,168,67,0.1)", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontWeight: 700 }}>Insert</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }} className="fade-in">
            {[{id:"now",label:"Send immediately",desc:"Campaign starts as soon as you confirm"},{id:"scheduled",label:"Schedule for later",desc:"Pick a specific date and time"}].map(({id,label,desc}) => (
              <div key={id} onClick={() => setScheduleType(id)} style={{ padding: "15px 16px", borderRadius: 10, border: `1px solid ${scheduleType === id ? "#D4A843" : "#222222"}`, background: scheduleType === id ? "rgba(212,168,67,0.06)" : "#161616", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${scheduleType === id ? "#D4A843" : "#222222"}`, background: scheduleType === id ? "#D4A843" : "transparent", flexShrink: 0, marginTop: 1 }} />
                <div><div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, fontFamily: "'Manrope', sans-serif" }}>{label}</div><div style={{ fontSize: 12, color: "#666666", fontFamily: "'JetBrains Mono', monospace" }}>{desc}</div></div>
              </div>
            ))}
            {scheduleType === "scheduled" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="form-label">Date</label><input className="input-field" type="date" /></div>
                <div><label className="form-label">Time</label><input className="input-field" type="time" /></div>
                <div style={{ gridColumn: "1/-1" }}><label className="form-label">Timezone</label><select className="input-field"><option>Asia/Kolkata (IST)</option><option>America/New_York (EST)</option><option>Europe/London (GMT)</option></select></div>
              </div>
            )}
            <div><label className="form-label">Rate Limit</label><select className="input-field"><option>10 messages / minute (default)</option><option>25 messages / minute</option><option>50 messages / minute</option></select></div>
            <div><label className="form-label">Webhook URL (optional)</label><input className="input-field" type="url" placeholder="https://yoursite.com/webhook/velo" /><div style={{ fontSize: 12, color: "#666666", marginTop: 5, fontFamily: "'JetBrains Mono', monospace" }}>We'll POST batch results here when finished</div></div>
          </div>
        )}
        {step === 5 && (
          <div className="fade-in">
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, fontFamily: "'Manrope', sans-serif" }}>Review & Launch</h3>
            {[["Title","April Newsletter"],["Channel",channel.toUpperCase()],["Recipients",fileName||"Manual entry"],["Schedule",scheduleType==="now"?"Immediately":"Scheduled"],["Rate limit","10 msgs/min"]].map(([k,v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "11px 13px", background: "#161616", borderRadius: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#666666", fontWeight: 500 }}>{k}</span>
                <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{v}</span>
              </div>
            ))}
            <button className="gold-btn" onClick={() => navigate("/campaign")} style={{ width: "100%", padding: "13px", borderRadius: 9, fontSize: 15, marginTop: 16 }}>Launch Campaign →</button>
          </div>
        )}
        {step < 5 && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 18, borderTop: "1px solid #222222" }}>
            <button className="ghost-btn" onClick={() => step > 1 && setStep(s => s - 1)} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 14, opacity: step === 1 ? 0.4 : 1 }} disabled={step === 1}>Back</button>
            <button className="gold-btn" onClick={() => setStep(s => s + 1)} style={{ padding: "8px 22px", borderRadius: 8, fontSize: 14 }}>Continue →</button>
          </div>
        )}
      </div>
    </>
  );
};