import React, { useEffect } from "react";
import { LandingNavbar } from "../components/LandingNavbar";
import { Ticker } from "../components/Ticker";
import { HeroBranding } from "../components/HeroBranding";
import { Logo } from "../components/Logo";
import { Zap, Mail, Clock, BarChart, Shield, Users, ArrowRight } from "../icons";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const LandingPage = () => {
  const navigate = useNavigate();
  const features = [
    { icon: <Zap />, title: "Rate‑limited queue", desc: "10–50 msgs/min protects your sender reputation and keeps your infrastructure stable." },
    { icon: <Mail />, title: "Email + SMS in one", desc: "Unified campaigns across channels. Upload a CSV or enter contacts manually." },
    { icon: <Clock />, title: "Dead‑letter queue (DLQ)", desc: "Failed messages go to DLQ with automatic retries. Never lose a critical notification." },
    { icon: <BarChart />, title: "Real‑time analytics", desc: "Track delivered, failed, and pending messages as they flow through the pipeline." },
    { icon: <Shield />, title: "Webhook callbacks", desc: "Receive batch results at your endpoint the moment a campaign finishes." },
    { icon: <Users />, title: "Team collaboration", desc: "Organise campaigns by group, assign ownership, and collaborate across your team." },
  ];


  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      getAccessTokenSilently().then((token) => {
        console.log(token);
        console.log(user);
      });
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <LandingNavbar navigate={navigate} />
      <Ticker />

      {/* Hero section – professional message queuing branding */}
      <section className="max-w-[1200px] mx-auto px-[5%] py-20 md:py-28 flex flex-wrap items-center gap-[60px]">
        <div className="flex-1 min-w-[460px]">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-gold border border-border-gold py-1.5 px-3.5 rounded-full mb-7 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse-dot" />
            Enterprise‑grade message queuing
          </div>
          <h1 className="text-[clamp(44px,5.5vw,76px)] font-extrabold tracking-[-0.05em] leading-[1.02] text-text mb-2 font-sans">
            Reliable delivery for
          </h1>
          <h1 className="text-[clamp(44px,5.5vw,76px)] font-extrabold tracking-[-0.05em] leading-[1.02] mb-2 font-sans bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
            every message.
          </h1>
          <p className="text-[17px] text-muted max-w-[480px] leading-relaxed my-5 font-normal">
            Velo is a message queuing system purpose‑built for bulk email and SMS campaigns.
            Rate‑limited queues, automatic retries, dead‑letter handling, and webhook callbacks – 
            so your critical notifications always get through.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <button className="gold-btn py-3 px-7 rounded-xl text-[15px] flex items-center gap-2" onClick={() => navigate("/login")}>
              Start queuing → <ArrowRight />
            </button>
            <button className="ghost-btn py-3 px-7 rounded-xl text-[15px]" onClick={() => navigate("/dashboard")}>
              See the queue in action
            </button>
          </div>
          <div className="flex flex-wrap gap-9">
            {[["99.97%", "Delivery success"], ["< 80ms", "Queue latency"], ["50k/hr", "Throughput"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-[26px] font-extrabold text-gold tracking-tighter font-sans">{num}</div>
                <div className="text-xs text-muted mt-0.5 font-mono">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-0 flex justify-center relative">
          <div className="absolute inset-[-40px] opacity-5 bg-[repeating-linear-gradient(#D4A843_0px,#D4A843_1px,transparent_1px,transparent_40px),repeating-linear-gradient(90deg,#D4A843_0px,#D4A843_1px,transparent_1px,transparent_40px)] rounded-2xl" />
          <HeroBranding />
        </div>
      </section>

      {/* Features section */}
      <section className="max-w-[1200px] mx-auto px-[5%] pb-24">
        <div className="text-center mb-10">
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-tighter mb-2 font-sans">
            Built for reliability, not just speed
          </h2>
          <p className="text-muted text-base font-normal">Every feature designed around queuing best practices.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="card p-[26px_26px_22px]">
              <div className="w-[38px] h-[38px] rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4">
                {icon}
              </div>
              <h3 className="font-bold text-[15px] mb-2 tracking-tight font-sans">{title}</h3>
              <p className="text-sm text-muted leading-relaxed font-normal">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="border-y border-border bg-surface py-20 px-[5%] text-center">
        <h2 className="text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tighter mb-3.5 font-sans">
          Put your messages in the queue.
        </h2>
        <p className="text-muted mb-8 text-[15px] font-normal">Start with a free plan – no credit card required.</p>
        <button className="gold-btn py-3.5 px-9 rounded-xl text-[15px]" onClick={() => navigate("/login")}>
          Create free account
        </button>
      </section>

      {/* Footer */}
      <footer className="max-w-[1200px] mx-auto px-[5%] py-9 flex flex-wrap justify-between items-center gap-4">
        <Logo onClick={() => navigate("/")} />
        <p className="text-[13px] text-muted font-mono">© 2026 Velo. Message queuing for modern teams.</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Status"].map(l => (
            <span key={l} className="text-[13px] text-muted cursor-pointer font-medium">{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
};